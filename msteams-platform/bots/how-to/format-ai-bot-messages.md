---
title: Format your AI bot messages
description: Learn how to format your AI-based bot with AI labels, citations, feedback buttons, and sensitivity labels.
ms.topic: conceptual
ms.localizationpriority: medium
---

# Format your AI bot messages

As we enhance our bots intelligence and conversational capabilities, it’s essential to craft user experiences that are specifically designed for AI and to promote user trust and transparency.

Improve the user experience of your AI-powered bot by fully leveraging its AI capabilities. Incorporate features such as citations, an AI-label, feedback buttons, and a sensitivity label. These features streamline the user experience for common AI scenarios, such as:

* Citing data sources for retrieval-augmented generation (RAG).
* Identifying AI-generated responses.
* Collecting feedback.

By incorporating these elements, you can elevate your bot’s user experience to align with industry-leading AI experiences, like Microsoft Copilot.

> [!NOTE]
> Even bots that don’t use AI might find it beneficial to add citations or feedback buttons to their responses, as these UI elements can enhance their functionality.

Learn how to add the following elements to your AI bot message:

* [AI label](#add-ai-label-to-bot-message): Add an AI label to indicate that the message’s content was created using AI.
* [Citations](#add-citations-to-bot-message): Add in-text citations and a list of references to your responses.
* [Feedback buttons](#feedback-buttons): Add feedback buttons and a feedback form to your message.
* [Sensitivity label](#add-sensitivity-label-to-bot-message): Add a sensitivity label to your message to convey the confidentiality of the message.

## Add AI label to bot message

It's important to communicate to users that your bot is using AI to generate messages. Although large language models (LLMs) are reliable, there might be scenarios where their responses could be incorrect or potentially misleading.

Adding a label to your AI-generated message enhances transparency and encourages users to exercise caution when consuming the message. When your bot is sending a message, modify the message to include an entity object with `additionalType` field.

Here's the code snippet to add the AI label to your bot's message:

# [JavaScript](#tab/js1)

Sample code reference (link)

*placeholder code snippet*

# [JSON](#tab/json1)

```json
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

# [.NET](#tab/dotnet1)

Sample code reference (link)

*placeholder code snippet*

# [Python](#tab/python1)

Sample code reference (link)

*placeholder code snippet*

---

After you enable the AI label, your bot’s message automatically displays an AI label that reads **AI generated** next to the bot’s name. The label has a hover tooltip that displays the AI disclaimer stating **AI-generated content may be incorrect**.

:::image type="content" source="../../assets/images/bots/ai-bot-label.png" alt-text="AI bot label.":::

## Add citations to bot message

If your bot responds to users based on information from data sources such as files, messages, emails, and work items, it’s important to cite these sources in the message. Citations significantly enhance the user's confidence and trust on your bot. They provide users with useful references to ask follow-up questions or conduct their own research.

> [!NOTE]
> Citations are particularly important for bots using techniques like RAG.

Adding citations to your message consists of two key parts:

* [In-text citations](#in-text-citations): Cite your text with [X] format at any place of text.
* [Citation reference list](#citation-reference): Modify the message to include citation array in the entities object.

### In-text citations

Bots have the capability to embed text content with references. You can insert a citation anywhere within the text. The corresponding reference can include the title, keywords, excerpt (abstract), hyperlink, and sensitivity information. References appear as inline citations in pop-ups and as expandable citation footers.

:::image type="content" source="../../assets/images/bots/ai-bot-inline-citation.png" alt-text="AI bot inline citation.":::

The following code snippet provides the format expected by Teams for your in-text citations:

# [JavaScript](#tab/js2)

```javascript
await context.sendActivity({
    type: ActivityTypes.Message,
    text: 'Hey I'm a friendly AI bot. This message is generated via AI - $(txt) [1]', // cite with [1]
});
```

# [JSON](#tab/json2)

```json
{
    "type": "message",
    "text": "Hey I'm a friendly AI bot. This message is generated via AI [1]"
}
```

# [.NET](#tab/dotnet2)

Sample code reference (link)

*placeholder code snippet*

# [Python](#tab/python2)

Sample code reference (link)

*placeholder code snippet*

---

### Citation reference

The indexing on this list should match the corresponding in-text citations. Use this list to provide key details such as title of the citation, the link to the resource, and a relevant quote from the document. Here's how you can add a list of references to your message:

# [JavaScript](#tab/js3)

# [JSON](#tab/json3)

```json
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

# [.NET](#tab/dotnet3)

Sample code reference (link)

*placeholder code snippet*

# [Python](#tab/python3)

Sample code reference (link)

*placeholder code snippet*

---

When your bot is sending a message back, modify the message to include an entity object:

```javascript
 await context.sendActivity({
         type: ActivityTypes.Message,
        text: `Hey I'm a friendly AI bot. This message is generated via AI - $(txt) [1]`, // cite with [1]
        entities: [
          {
            type: "https://schema.org/Message",
            "@type": "Message",
            "@context": "https://schema.org",
            "@id": "",
            citation: [
              {
                "@type": "Claim",
                position: 1, // Required. Should match the [1] in the text above
                appearance: {
                  "@type": "DigitalDocument",
                  name: "Some secret citation", // Title
                  url: "https://example.com/claim-1", // Hyperlink on the title
                  abstract: "Excerpt", // Excerpt (abstract)
                  encodingFormat: "text/html", // for now ignored, later used for icon
                  image:
                    "https://botapiint.blob.core.windows.net/tests/Bender_Rodriguez.png", //Currently, we do not support icon rendering because of some
                  keywords: ["Keyword1 - 1", "Keyword1 - 2", "Keyword1 - 3"], // Keywords
                  usageInfo: {
                    "@type": "CreativeWork",
                    name: "Confidential \\ Contoso FTE", // Sensitivity title
                    description: "Only accessible to Contoso FTE", // Sensitivity description
                  },
                },
              },
            ],
          },
        ],
}
```

After enabling citations, your bot message automatically includes in-text citations and a reference list in the footer. The in-text citations display details to users when they hover over them, as shown in the following image:

:::image type="content" source="../../assets/images/bots/ai-bot-ref-cite-list.png" alt-text="AI bot reference citation list.":::

| Error code | Response |
| --- | --- |
| 400 | Multiple root message entities found in the bot activity. |
| 400 | Error parsing message entity from activity object. |
| 400 | Bot message contains X citations. Max count is 10. |
| 400 | Provided claim has empty appearance. |
| 400 | Error while parsing citation entity with id: X. |

## Feedback buttons

Collecting feedback is critical to assess your bot’s performance in real-world scenarios and improve its conversational capabilities with effective and targeted improvements. Feedback buttons enable users to indicate whether they like or dislike the messages your bot sends. After the user select a button, a dialog (referred as a task module in TeamsJS v1.x) appears that allows them to provide detailed feedback about the message.

:::image type="content" source="../../assets/images/bots/bot-feedback-buttons.png" alt-text="Screenshots shows the feedback buttons in a bot." lightbox="../../assets/images/bots/bot-feedback-buttons.png":::

When the user selects one of the feedback buttons, a dialog that appears contains a feedback form depending on the user's selection. A positive feedback form appears if the user likes a message and a negative feedback form appears if the user dislikes a message.

# [Positive feedback](#tab/pos)

:::image type="content" source="../../assets/images/bots/bot-feedback-form.png" alt-text="Screenshot shows the feedback form in a bot.":::

# [Negative feedback](#tab/neg)

:::image type="content" source="../../assets/images/bots/bot-feedback-form.png" alt-text="Screenshot shows the feedback form in a bot.":::

---

> [!NOTE]
>
> * Feedback buttons are available in public developer preview and only in Teams web and desktop clients.
> * Feedback buttons are not available for message extensions.

### Enable feedback buttons

To enable feedback buttons in your bot, add a new `channelData` object in your bot's message and set `feedbackLoopEnabled` to true.
After you enable feedback buttons, the footer of your bot's message contains a like and dislike button for the user to select. You can collect feedback on your bot’s responses from personal chats, group chats, and channels.

The following code snippets show how to enable feedback buttons in a bot:

# [JavaScript](#tab/js4)

```javascript
await context.sendActivity({
  type: ActivityTypes.Message,
  text: `Hey I'm a friendly AI bot. This mesasge is generated via AI - ${txt}`,
  channelData: {
    feedbackLoopEnabled: true // Enable feedback buttons
  },
});
```

# [JSON](#tab/json4)

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

# [.NET](#tab/dotnet4)

*placeholder code snippet*

# [Python](#tab/python4)

*placeholder code snippet*

---

For a bot built using Teams AI library, Teams enables feedback buttons to all messages when `enable_feedback_loop` is set to true. To customize this behavior, you need to extend the SAY command. The following code snippet shows how to enable feedback buttons in a bot built with Teams AI library:

<br>
<details>
<summary><b>Code snippet</b></summary>

```javascript
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

</details>

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

***<placeholder_code snippet>***

It’s important to store feedback after you receive it. Teams doesn’t store or process feedback, nor does it provide an API or a storage mechanism for you to do so. Hence, ensure that you store the message IDs and the content of the messages that your bot sends and receives. When your bot receives an invoke containing feedback, match the message ID of the bot’s message with the corresponding feedback.

> [!NOTE]
> If a user uninstalls your bot but still has access to the bot chat, Teams removes the feedback buttons from the bot's messages to prevent the user from providing feedback to the bot.

### Error handling

| Error code | Response |
| --- | --- |
| 400 | `submit/messageAction` invoke response isn't empty. |

## Add sensitivity label to bot message

The final element you might want to add to your message is a sensitivity label. In some scenarios, your bot might respond with or use information that's confidential or only available to selected people in the organization. It's crucial to help users identify the confidentiality of a message so that they can exercise appropriate caution when sharing the message's contents.

> [!NOTE]
> Add this label to your bot's messages only if it contains sensitive information.

Here's how you can add a sensitivity label to your bot message:

# [JavaScript](#tab/js5)

Sample code reference (link)

*placeholder code snippet*

# [JSON](#tab/json5)

```json
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

# [.NET](#tab/dotnet5)

Sample code reference (link)

*placeholder code snippet*

# [Python](#tab/python5)

Sample code reference (link)

*placeholder code snippet*

---

Here's the code snippet to reference the sensitivity label from citation:

```json
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

Once added, your bot message contains a shield icon. Users can hover over the icon to find disclaimer message about the sensitivity of the message.

:::image type="content" source="../../assets/images/bots/ai-bot-sensitivity-label.png" alt-text="AI bot sensitivity label.":::

| Error code | Response |
| --- | --- |
| 400 | Multiple root message entities found in the bot activity. |
| 400 | Error parsing message entity from activity object. |
| 400 | No usage info to link for a message level usage info. |
| 400 | Multiple usage info to link for a message level usage info. |

## Code samples

| S.No. | Description | .NET | Node.js | Manifest |
|:--|:--|:--|---|---|
| 1 | This sample app provides a bot with an AI label, feedback buttons, sensitivity label, and citations in messages. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples) |

## See also

* [Bot activity handlers](../bot-basics.md)
* [Format your bot messages](format-your-bot-messages.md)
* [Update and delete messages sent from bot](update-and-delete-bot-messages.md)
