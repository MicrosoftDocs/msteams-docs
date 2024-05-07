---
title: Format AI bot messages
description: Learn how to format your AI-based bot with AI labels, citations, feedback buttons, and sensitivity labels.
ms.topic: conceptual
ms.localizationpriority: medium
---

# Format AI bot messages

As you enhance your bot’s conversational capabilities to improve the user experience, it’s important to refine your bot’s messages to align with AI experiences, such as those provided by Microsoft Copilot.

If you're building an AI-based bot, your bot messages can leverage features like citations, an AI label, feedback buttons, and a sensitivity label to improve adaptability. These features streamline the user experience for common AI scenarios, such as:

* Citing data sources for retrieval-augmented generation (RAG)
* Identifying AI-generated responses
* Collecting feedback

<!--
As we enhance our bots intelligence and conversational capabilities, it’s essential to craft user experiences that are specifically designed for AI and to promote user trust and transparency.

They can also promote user trust and transparency and elevate your bot’s user experience to align with AI experiences, like Microsoft Copilot.

To enhance your bots intelligence and conversational capabilities, you can improve the user experience. These are primarily focused AI powered bots, however, you can use some of these features in your regular bots.-->

> [!NOTE]
> Even if your bot isn't AI-powered, you can still add citations or feedback buttons to your bot response.

The features that you can add to your bot message are:

* [AI label](#add-ai-label-to-bot-message): Enables user to identify that the message was generated using AI.
* [Citations](#add-citations-to-bot-message): Enables user to refer to the source of bot message through in-text citations and a list of references.
* [Feedback buttons](#feedback-buttons): Enables user to provide positive or negative feedback based on their experience.
* [Sensitivity label](#add-sensitivity-label-to-bot-message): Enables user to understand the confidentiality of the AI-generated bot message.

    :::image type="content" source="../../assets/images/bots/ai-bot-message.png" alt-text="Screenshot shows the AI-generated bot message with the respective AI bot message features.":::

## AI label

AI-based bot use large language models (LLMs) that are reliable, but there can be instances where their responses might be incorrect or potentially misleading. So it's crucial to indicate that your bot response is AI-generated.

When your bot is sending a message, modify the message to include an entity object with `additionalType` field.

Here's the code snippet to add the AI label to your bot's message:

# [JavaScript](#tab/js)

Sample code reference (link)

*placeholder code snippet*

# [JSON](#tab/json)

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

# [.NET](#tab/dotnet)

Sample code reference (link)

*placeholder code snippet*

# [Python](#tab/python)

Sample code reference (link)

*placeholder code snippet*

# [Teams AI library](#tab/ailibrary)

```javascript
await context.sendActivity({
         type: ActivityTypes.Message,
         text: `Hey I'm a friendly AI bot. This mesasge is generated via AI - ${txt}`,
        entities: [
          {
            type: "https://schema.org/Message",
            "@type": "Message",
            "@context": "https://schema.org",
            additionalType: ["AIGeneratedContent"], // AI Generated label
          }
        ]
       });
```

---

After you enable the AI label, your bot’s message automatically displays an AI label that reads **AI generated** next to the bot’s name. The label has a hover tooltip that displays the AI disclaimer stating **AI-generated content may be incorrect**.

:::image type="content" source="../../assets/images/bots/ai-bot-label.png" alt-text="AI bot label.":::

## Citations

When a bot generates responses from data sources like files, messages, emails, and work items, citing these sources in the message is important. These citations offer valuable references for asking follow-up questions or conducting independent research.

> [!NOTE]
> Citations are particularly important for bots using techniques like RAG.

Adding citations to your message consists of two key parts:

* [In-text citations](#in-text-citations): Cite your text with [X] format at any place of text.
* [Citation reference list](#citation-reference): Modify the message to include citation array in the entities object.

### Add in-text citations

In-text citations appear as numbers with the corresponding reference that can include the title, keywords, excerpt (abstract), hyperlink, and sensitivity information. References appear as inline citations in pop-ups and as expandable citation footers. You can insert a citation anywhere within the text.

:::image type="content" source="../../assets/images/bots/ai-bot-inline-citation.png" alt-text="Screenshot shows an AI bot response with inline citation.":::

The following code snippet provides the format expected by Microsoft Teams for your in-text citations:

# [JavaScript](#tab/js)

Sample code reference (link)

*placeholder code snippet*

# [JSON](#tab/json)

```json
{
    "type": "message",
    "text": "Hey I'm a friendly AI bot. This message is generated via AI [1]"
}
```

# [.NET](#tab/dotnet)

Sample code reference (link)

*placeholder code snippet*

# [Python](#tab/python)

Sample code reference (link)

*placeholder code snippet*

# [Teams AI library](#tab/ailibrary)

```javascript
await context.sendActivity({
    type: ActivityTypes.Message,
    text: 'Hey I'm a friendly AI bot. This message is generated via AI - $(txt) [1]', // cite with [1]
});
```

---

### Add citation reference

The indexing on this list should match the corresponding in-text citations. Use this list to provide key details such as title of the citation, the link to the resource, and a relevant quote from the document. Here's how you can add a list of references to your message and modify the message to include an entity object, when your bot is sending a message back:

# [JavaScript](#tab/js)

Sample code reference (link)

*placeholder code snippet*

# [JSON](#tab/json)

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

# [.NET](#tab/dotnet)

Sample code reference (link)

*placeholder code snippet*

# [Python](#tab/python)

Sample code reference (link)

*placeholder code snippet*

# [Teams AI library](#tab/ailibrary)

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

---

After you enable the citations, the bot message automatically includes in-text citations and a reference list in the footer. The in-text citations display details to users when they hover over them, as shown in the following image:

:::image type="content" source="../../assets/images/bots/ai-bot-ref-cite-list.png" alt-text="AI bot reference citation list.":::

| Error code | Response |
| --- | --- |
| 400 | Multiple root message entities found in the bot activity. |
| 400 | Error parsing message entity from activity object. |
| 400 | Bot message contains X citations. Max count is 10. |
| 400 | Provided claim has empty appearance. |
| 400 | Error while parsing citation entity with id: X. |

## Feedback buttons

Collecting feedback is critical to assess your bot’s performance and improve its conversational capabilities. Enabling feedback buttons allows users to like or dislike the bot message and provide detailed feedback about the message.

:::image type="content" source="../../assets/images/bots/bot-feedback-buttons.png" alt-text="Screenshot shows the feedback buttons in a bot." lightbox="../../assets/images/bots/bot-feedback-buttons.png":::

When the user selects a feedback button, a respective feedback form appears based on the user's selection.

# [Positive feedback](#tab/pos)

:::image type="content" source="../../assets/images/bots/bot-feedback-form.png" alt-text="Screenshot shows the feedback form in a bot.":::

# [Negative feedback](#tab/neg)

*Image placeholder*

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

# [JavaScript](#tab/js)

Sample code reference (link)

*placeholder code snippet*

# [JSON](#tab/json)

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

# [.NET](#tab/dotnet)

Sample code reference (link)

*placeholder code snippet*

# [Python](#tab/python)

Sample code reference (link)

*placeholder code snippet*

# [Teams AI library](#tab/ailibrary)

[Sample code reference](https://github.com/microsoft/teams-ai/blob/main/js/samples/04.ai-apps/h.datasource-azureOpenAI/src/app.ts)

For a bot built using Teams AI library, Teams enables feedback buttons to all messages when `enable_feedback_loop` is set to true. To customize this behavior, you need to extend the SAY command. The following code snippet shows how to enable feedback buttons in a bot built with Teams AI library:

```javascript
await context.sendActivity({
  type: ActivityTypes.Message,
  text: `Hey I'm a friendly AI bot. This message is generated via AI - ${txt}`,
  channelData: {
    feedbackLoopEnabled: true // Enable feedback buttons
  },
});
```

---

The bot sends the user's input, received in the feedback form, through a bot invoke. The following code snippet is an example of a bot invoke containing positive feedback from a user:

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

---

### Handle feedback

When your bot receives the invoke, you need to have an `onInvokeActivity` handler to process the invoke correctly. Ensure that you return a `status:200` with no body.

> [!NOTE]
> You mustn't send a message or notification to the user upon receiving feedback. Teams automatically notifies the user that their feedback was submitted successfully.

The following code snippet returns a response with a status code of 200 when the bot receives an invoke containing feedback:

***<placeholder_code snippet>***

It’s important to store feedback after you receive it. Teams doesn’t store or process feedback, nor does it provide an API or a storage mechanism for you to do so. Hence, ensure that you store the message IDs and the content of the messages that your bot sends and receives. When your bot receives an invoke containing feedback, match the message ID of the bot’s message with the corresponding feedback.

> [!NOTE]
> If a user uninstalls your bot but still has access to the bot chat, Teams removes the feedback buttons from the bot's messages to prevent the user from providing feedback to the bot.

### Error handling

| Error code | Response |
| --- | --- |
| 400 | When the `submit/messageAction` invoke response isn't empty. |

## Sensitivity label

Bot responses might include information that's confidential or accessible only to certain individuals within the organization. You must add sensitivity label to help users identify the confidentiality of a message so that they can exercise caution when sharing the message.

> [!NOTE]
> Add this label to your bot's messages only if it contains sensitive information.

Here's how you can add a sensitivity label to your bot message:

# [JavaScript](#tab/js)

Sample code reference (link)

*placeholder code snippet*

# [JSON](#tab/json)

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

# [.NET](#tab/dotnet)

Sample code reference (link)

*placeholder code snippet*

# [Python](#tab/python)

Sample code reference (link)

*placeholder code snippet*

# [Teams AI library](#tab/ailibrary)

Sample code reference (link)

```javascript
await context.sendActivity({
         type: ActivityTypes.Message,
         text: `Hey I'm a friendly AI bot. This mesasge is generated via AI - ${txt}`,
        entities: [
          {
            type: "https://schema.org/Message",
            "@type": "Message",
            "@context": "https://schema.org",
            usageInfo: {
              "@type": "CreativeWork",
              description: "Please be mindful of sharing outside of your team", // Sensitivity description
              name: "Confidential \\ Contoso FTE", // Sensitivity title
            },
          },
        ],
```

---

Here's the code snippet to reference the sensitivity label from citation:

# [JavaScript](#tab/js)

Sample code reference (link)

*placeholder code snippet*

# [JSON](#tab/json)

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

# [.NET](#tab/dotnet)

Sample code reference (link)

*placeholder code snippet*

# [Python](#tab/python)

Sample code reference (link)

*placeholder code snippet*

# [Teams AI library](#tab/ailibrary)

Sample code reference (link)

*placeholder code snippet*

---

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
* [Teams AI library](Teams%20conversational%20AI/how-conversation-ai-get-started.md)
