---
title: Format your AI bot messages
description: Learn how to format your AI-based bot with AI labels, citations, feedback buttons, and sensitivity labels.
ms.topic: conceptual
ms.localizationpriority: medium
---

# Format your AI bot messages

As we make our bots intelligent and more conversational, there's an emerging need for user experiences that are designed for AI and promote user trust and transparency.

Enhance the user experience of your AI-powered bot to make the most of its AI abilities by adding features like citations, an AI-label, feedback buttons, and a sensitivity label. These elements create a seamless user experience for common AI scenarios like citing data sources for RAG, identifying AI-generated responses, and collecting feedback. Moreover, through these elements you can elevate the user experience of your bot to match industry-leading AI experiences such as Microsoft Copilot.

Even bots that don’t use AI might want to add citations or feedback buttons to their response and can benefit from these UI elements.

This guide covers how to add the following elements to your bot message:

* **AI label**: Add an AI label to indicate that the message’s content was creating using AI
* **Citations**: Add In-text citations and a list of references to your responses
* **Feedback buttons**: Add feedback buttons and a feedback form to your message
* **Sensitivity label**: Add a sensitivity label to your message that conveys the confidentiality of the message

## Add AI label to bot message

It's important to communicate to users that your bot is using AI to generate its messages. While Large Language Models (LLMs) are mostly reliable, there can be scenarios where its response is incorrect or misleading.

Adding a label to your AI-generated message increases transparency and helps users practice reasonable caution when consuming the message.

Here's how you add the AI-Label to your bot's message:

```javascript
{ 
    "type": "message", 
    "from": { 
        "id": "28:48b2e1fd-b6b8-46ce-8074-8e918304fcb2" 
    }, 
    "conversation": { 
        "isGroup": true, 
        "id": "19:88b15596-2dd4-440b-98c6-a19cf49455a1@thread.tacv2" 
    }, 
    "recipient": { 
        "id": "8:orgid:f20c2a2c-1b43-416a-b5e8-fbcc69387c5e" 
    }, 
    "text": "2fd50566-ad63-4237-b240-f1942f7bdeb6", 
    "attachments": [], 
    "entities": [ 
        { 
            "@type": "Message", 
            "@context": "https://schema.org", 
            "@id": "", 
            "additionalType": [ 
                "AIGeneratedContent" 
            ] 
        } 
    ] 
}
```

After you enable the AI label, your bot’s message has an AI label next to the bot’s name. The label has a pop-up that states **AI-generated content may be incorrect**:

*image placeholder*

## Add citations to bot message

If your bot is responding to users based on information in data sources such as files, messages, emails, work items, and others – it's important to cite these sources in the message itself. Citations greatly boost the confidence and trust users have in your bot. Moreover, it gives users helpful references that they can use for asking follow-up questions or doing their own research.

Adding citations is important for bots using techniques like retrieval-augmented generation (RAG).

Adding citations to your message consists of two key parts: in-text citations and a list of references.

The following code snippet provides the format in which Teams is expecting your in-text citations:

*placeholder - code snippet*

Next is the list of references. The indexing on this list should match the corresponding in-text citations. Use this list to provide key details like the title of the citation, the link to the resource, and a relevant quote from the document. Here's how you can add a list of references to your message:

```JavaScript
{
    "type": "message", 
    "from": { 
        "id": "28:48b2e1fd-b6b8-46ce-8074-8e918304fcb2" 
    }, 
    "conversation": { 
        "isGroup": true, 
        "id": "19:136c757a-88d8-48c1-829d-3007c9f684b0@thread.tacv2" 
    }, 
    "recipient": { 
        "id": "8:orgid:7e425333-960e-4d3e-b136-0e98701ff5cc" 
    }, 
    "textFormat": "plain", 
    "text": "c53a7514-4abb-4592-b882-c2d0fac6f5bb[1];", 
    "attachments": [], 
    "entities": [ 
        { 
            "@type": "Message", 
            "@context": "https://schema.org", 
            "@id": "", 
            "citation": [ 
                { 
                    "@type": "Claim", 
                    "position": 1, 
                    "appearance": { 
                        "@type": "DigitalDocument", 
                        "name": "Name 1", 
                        "url": "https://example.com/claim-1", 
                        "abstract": "Abstract 1", 
                        "keywords": [ 
                            "Keyword1 - 1", 
                            "Keyword1 - 2", 
                            "Keyword1 - 3" 
                        ], 
                        "usageInfo": { 
                            "@type": "CreativeWork", 
                            "description": "UsageInfo 1 description", 
                            "name": "UsageInfo 1" 
                        } 
                    } 
                } 
            ] 
        } 
    ] 
}
```

After you enable citations, your bot message automatically has in-text citations and a list of references in the footer of the message. The in-text citations show users details when they hover upon the citations as shown in the following image:

*image placeholder*

## Feedback buttons

While Large Language Models (LLMs) significantly enhance your bot’s conversational capabilities, they can sometimes be inconsistent and require careful adjustments to behave as intended. User feedback is invaluable to evaluate your bot’s performance in real-world scenarios and enables you to make effective and targeted improvements.

Feedback buttons enable users to indicate whether they like or dislike the messages your bot sends. After the user select a button, a dialog (referred as a task module in TeamsJS v1.x) appears that allows them to provide detailed feedback about the message.

> [!NOTE]
>
> * Feedback buttons are available in public developer preview.
> * Feeback buttons are only available in Teams web and desktop clients.
> * You can collect feedback on your bot’s responses from personal chats, group chats, and channels.
> * Feedback buttons are not available for message extensions.

### Enable feedback buttons

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

The following code snippet shows how to enable feedback buttons in a bot built with Teams AI library:

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

After you enable feedback buttons, the footer of your bot's message contains a like and dislike button for the user to select. You can also enable feedback buttons for specific messages that your bot sends.

:::image type="content" source="../../assets/images/bots/bot-feedback-buttons.png" alt-text="Screenshots shows the feedback buttons in a bot." lightbox="../../assets/images/bots/bot-feedback-buttons.png":::

When the user selects one of the feedback buttons, the dialog that appears contains a feedback form depending on the user's selection. A positive feedback form appears if the user likes a message and a negative feedback form appears if the user dislikes a message.

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

### Handle feedback

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

### Error handling

Teams returns a 400 Bad Request error if the `submit/messageAction` invoke response isn't empty. To learn more about handling common errors in bot conversations, see [Status codes from bot conversational APIs](conversations/conversation-messages.md#status-codes-from-bot-conversational-apis).

## Add sensitivity label to bot message

The last element you might want to add to your message is a sensitivity label. In some scenarios, your bot might respond with or use information that is confidential or only available to select people in the organization. It's important to help users identify the confidentiality of a message so that they can practice the appropriate caution when sharing the message's contents.

We recommend adding this property only if your bot’s message contains sensitive information.

Here's how you can add a sensitivity label to your bot message:

```JavaScript
{ 
    "type": "message", 
    "from": { 
        "id": "28:48b2e1fd-b6b8-46ce-8074-8e918304fcb2" 
    }, 
    "conversation": { 
        "isGroup": true, 
        "id": "19:751e0de5-9729-4182-882c-1cf98c5ea3d4@thread.tacv2" 
    }, 
    "recipient": { 
        "id": "8:orgid:db0778ad-ed6c-4e21-b98c-896ec6ad7ed0" 
    }, 
    "text": "ea2492cd-f768-41ad-a1ae-8f356c7cca28", 
    "attachments": [], 
    "entities": [ 
        { 
            "@type": "Message", 
            "@context": "https://schema.org", 
            "@id": "", 
            "usageInfo": { 
                "@type": "CreativeWork", 
                "description": "Sensitivity description", 
                "name": "Sensitivity name" 
            } 
        } 
    ] 
}
```

Reference the sensitivity label from citation

```javascript
{ 
    "type": "message", 
    "from": { 
        "id": "28:48b2e1fd-b6b8-46ce-8074-8e918304fcb2" 
    }, 
    "conversation": { 
        "isGroup": true, 
        "id": "19:5a5faeb2-8967-4469-b306-9a319072f96f@thread.tacv2" 
    }, 
    "recipient": { 
        "id": "8:orgid:209f94ff-7f34-42a2-883e-5dafc6a7d2f8" 
    }, 
    "textFormat": "plain", 
    "text": "1721a2f9-c79e-4502-b62e-ae31189ba17e[1];", 
    "attachments": [], 
    "entities": [ 
        { 
            "@type": "Message", 
            "@context": "https://schema.org", 
            "@id": "", 
            "citation": [ 
                { 
                    "@type": "Claim", 
                    "position": 1, 
                    "appearance": { 
                        "@type": "DigitalDocument", 
                        "name": "Name 1", 
                        "usageInfo": { 
                            "@type": "CreativeWork", 
                            "@id": "usage-info-1", 
                            "description": "UsageInfo 1 description", 
                            "name": "UsageInfo 1" 
                        } 
                    } 
                } 
            ], 
            "usageInfo": { 
                "@type": "CreativeWork", 
                "@id": "usage-info-1" 
            } 
        } 
    ] 
}
```

Once added, your bot message contains a shield icon that the user can hover upon to find details on the sensitivity of the message:

*image placeholder*

## Code samples

| S.No. | Description | .NET | Node.js | Manifest |
|:--|:--|:--|---|---|
| 1 | This sample app provides a bot with an AI label, feedback buttons, sensitivity label, and citations in messages. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples) |

## See also

* [Bot activity handlers](../bot-basics.md)
* [Format your bot messages](format-your-bot-messages.md)
* [Update and delete messages sent from bot](update-and-delete-bot-messages.md)
