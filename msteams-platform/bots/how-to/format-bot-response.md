---
title: Format your bot response
description: Learn how to format and style your AI-based bot and the responses it generates for users.
ms.topic: conceptual
---

# Format your bot response

While Large Language Models (LLMs) significantly enhance your bot’s conversational capabilities, they can sometimes be inconsistent and require careful adjustments to behave as intended. User feedback is invaluable to evaluate your bot’s performance in real-world scenarios and enables you to make effective and targeted improvements.

Microsoft Teams allows you to enable feedback buttons in the messages sent by your bot. Users can interact with these buttons to indicate that they either like or dislike the message. After the user select a button, a dialog (referred as a task module in TeamsJS v1.x) appears that allows them to provide detailed feedback about the message.

> [!NOTE]
>
> * Feedback buttons are available in public developer preview.
> * Feeback buttons are only available in Teams web and desktop clients.
> * You can collect feedback on your bot’s responses from personal chats, group chats, and channels.
> * Feedback buttons are not available for message extensions.

## Enable feedback buttons

To enable feedback buttons in your bot, add a new `channelData` object in your bot's message and set `feedbackLoopEnabled` to true.

```json
       await context.sendActivity({
         type: ActivityTypes.Message,
         text: `Hey I'm a friendly AI bot. This mesasge is generated via AI - ${txt}`,
         channelData: {
           feedbackLoopEnabled: true // Enable feedback buttons
         },
       });
```

The following code snippet shows how to enable feedback buttons in a bot for a message in a group chat:

```json
    {
        "type": "message",
        "from": {
            "id": "28:48b2e1fd-b6b8-46ce-8074-8e918304fcb2"
        },
        "conversation": {
            "isGroup": true,
            "id": "19:21e795db-9804-4bb8-9a6a-f85b9e8e9602@thread.tacv2"
        },
        "recipient": {
            "id": "8:orgid:67cc58d0-4a80-496a-a019-437b70bc6529"
        },
        "text": "93001cd5-45f4-4a9a-b694-0f44eecfd004",
        "attachments": [],
        "entities": [],
        "channelData": {
            "feedbackLoopEnabled": true
        }
    }
```

The following code snippet shows how to enable feedback buttons in a bot built using Teams AI library:

```json
    import { OpenAIModel, PromptManager, ActionPlanner, Application, TurnState, TeamsAdapter } from '@microsoft/teams-ai';
    import { ConfigurationServiceClientCredentialFactory, MemoryStorage, TurnContext } from 'botbuilder';
    import path from 'path';
    import debug from 'debug';
    
    const error = debug('azureopenai:app:error');
    error.log = console.log.bind(console);
    
    interface ConversationState {}
    type ApplicationTurnState = TurnState<ConversationState>;
    
    if (
        !process.env.AZURE_OPENAI_KEY ||
        !process.env.AZURE_OPENAI_ENDPOINT ||
        !process.env.AZURE_SEARCH_ENDPOINT ||
        !process.env.AZURE_SEARCH_KEY
    ) {
        throw new Error(
            'Missing environment variables - please check that AZURE_OPENAI_KEY, AZURE_OPENAI_ENDPOINT, AZURE_SEARCH_KEY, AZURE_SEARCH_ENDPOINT are all set.'
        );
    }
    
    // Create AI components
    const model = new OpenAIModel({
        // Azure OpenAI Support
        azureApiKey: process.env.AZURE_OPENAI_KEY!,
        azureDefaultDeployment: 'gpt-35-turbo',
        azureEndpoint: process.env.AZURE_OPENAI_ENDPOINT!,
        azureApiVersion: '2024-02-15-preview',
    
        // Request logging
        logRequests: true
    });
    
    const prompts = new PromptManager({
        promptsFolder: path.join(__dirname, '../src/prompts')
    });
    
    const planner = new ActionPlanner({
        model,
        prompts,
        defaultPrompt: 'chat'
    });
    
    // Define storage and application
    const storage = new MemoryStorage();
    export const app = new Application<ApplicationTurnState>({
        ai: {
            planner: planner,
            enable_feedback_loop: true
        },
        storage: storage,
        adapter: new TeamsAdapter(
            {},
            new ConfigurationServiceClientCredentialFactory({
                MicrosoftAppId: process.env.BOT_ID, // Set to "" if using the Teams Test Tool
                MicrosoftAppPassword: process.env.BOT_PASSWORD, // Set to "" if using the Teams Test Tool
                MicrosoftAppType: 'MultiTenant'
            })
        )
    });
    
    app.error(async (context: TurnContext, err: any) => {
        // This check writes out errors to console log .vs. app insights.
        // NOTE: In production environment, you should consider logging this to Azure
        //       application insights.
        error(`[onTurnError] unhandled error: ${err}`);
        error(err);
    
        // Send a trace activity, which will be displayed in Bot Framework Emulator
        await context.sendTraceActivity(
            'OnTurnError Trace',
            `${err}`,
            'https://www.botframework.com/schemas/error',
            'TurnError'
        );
    
        // Send a message to the user
        await context.sendActivity('The bot encountered an error or bug.');
        await context.sendActivity('To continue to run this bot, please fix the bot source code.');
    });
    
    app.feedbackLoop(async (context, state, feedbackLoopData) => {
        if (feedbackLoopData.actionValue.reaction === 'like') {
            console.log('👍');
        } else {
            console.log('👎');
        }
    });
```

After you enable feedback buttons, the footer of your bot's message contains a like and dislike button for the user to select. You have the option to enable feedback buttons for specific messages that your bot sends.

:::image type="content" source="../../assets/images/bots/bot-feedback-buttons.png" alt-text="Screenshots shows the feedback buttons in a bot.":::

When the user selects one of the feedback buttons, the dialog that appears contains a feedback form depending on the user's selection. A positive feedback form appears if the user likes a message and a negative feedback form appears if the user dislike a message.

# [Positive feedback](#tab/pos)

:::image type="content" source="../../assets/images/bots/bot-feedback-form.png" alt-text="Screenshot shows the feedback form in a bot.":::

# [Negative feedback](#tab/neg)

:::image type="content" source="../../assets/images/bots/bot-feedback-form.png" alt-text="Screenshot shows the feedback form in a bot.":::

---

The bot sends the user's input, received in the feedback form, to you through a bot invoke. The following code snippet is an example of a bot invoke containing positive feedback from a user:

```json
    {
      "name": "message/submitAction",
      "conversation": {
        "id": "19:144de878089f94d7db699d10a4672bc040@thread.v2"
      },
      "value": {
        "actionName": "feedback",
        "actionValue": {
          "reaction": "like",
          "feedback": "test feedback"
        }
      }
    }
```

## Handle feedback

When your bot receives the invoke, you need to have an `onInvokeActivity` handler to process the invoke correctly. Ensure that you return a `status:200` with no body.

> [!NOTE]
> Don't send a message or notification to the user upon receiving feedback. Teams automatically notifies the user that their feedback was submitted successfully.

The following code snippet returns a response with a status code of 200 when the bot receives an invoke containing feedback:

```json
      public async onInvokeActivity(context: TurnContext): Promise<InvokeResponse> {
        try {
          switch (context.activity.name) {
            case "message/submitAction":
                return CreateInvokeResponse(200);
            default:
              return {
                status: 200,
                body: `Unknown invoke activity handled as default- ${context.activity.name}`,
              };
          }
        } catch (err) {
          console.log(`Error in onInvokeActivity: ${err}`);
          return {
            status: 500,
            body: `Invoke activity received- ${context.activity.name}`,
          };
        }
      }
      export const CreateInvokeResponse = (
       status: number,
       body?: unknown
      ): InvokeResponse => {
         return { status, body };
      };
```

It’s important to store feedback after you receive it. Teams doesn’t store or process feedback, nor does it provide an API or a storage mechanism for you to do so. Hence, ensure that you store the message IDs and the content of the messages that your bot sends and receives. When your bot receives an invoke containing feedback, match the message ID of the bot’s message with the corresponding feedback.

> [!NOTE]
> If a user uninstalls your bot but still has access to the bot chat, Teams removes the feedback buttons from the bot's messages to prevent the user from providing feedback to the bot.

## Error handling

Teams returns a  400 Bad Request error if the `submit/messageAction` invoke response isn't empty. To learn more about handling common errors in bot conversations, see [Status codes from bot conversational APIs](conversations/conversation-messages.md#status-codes-from-bot-conversational-apis).

## Code samples

| S.No. | Description | .NET | Node.js | Manifest |
|:--|:--|:--|---|---|
| 1 | This sample app provides an LLM-based bot with feedback buttons. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples) |

## See also

* [Bot activity handlers](../bot-basics.md)
* [Format your bot messages](format-your-bot-messages.md)
* [Update and delete messages sent from bot](update-and-delete-bot-messages.md)
