---
title: Conversations with a Bot
description: Learn about sending and receiving messages using a bot app
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: surbhigupta
ms.date: 10/03/2024
---

# Build conversational capability

Conversational bots communicate with users through messaging, enabling seamless interactions.

## Message content

Messages interaction between your bot and user can include different types of message content that:

| Content type | From user to bot | From bot to user |
| --- |:---:|:---:|
| [Rich text and emojis](#use-rich-text-message-and-emojis) | ✔️ | ✔️ |
| [Pictures](#use-picture-messages) | ✔️ | ✔️ |
| [Adaptive Cards](#use-adaptive-cards) | ❌ | ✔️ |

### Use rich text message and emojis

Your Teams bot can send rich text and emojis. Teams supports emojis through UTF-16, like U+1F600 for a grinning face.

### Use picture messages

To make bot message pop, the user can add pictures as attachments:

- Pictures can be up to 1024 × 1024 pixels and 1 MB in PNG, JPEG, or GIF format. Animated GIFs aren't supported.
- You can specify the height and width of each image using XML. In Markdown, the image size defaults to 256×256. For example:

  - ✔️: `<img src="http://aka.ms/Fo983c" alt="Duck on a rock" height="150" width="223"></img>`.
  - ❌: `![Duck on a rock](http://aka.ms/Fo983c)`.

For more information on attachments, see [add media attachments to messages](/azure/bot-service/dotnet/bot-builder-dotnet-add-media-attachments).

### Use Adaptive Cards

A conversational bot can include Adaptive Cards that simplify business workflows. Adaptive Cards offer rich customizable text, speech, images, buttons, and input fields. You can author Adaptive Cards in a bot and shown in multiple apps such as Teams, your website, and so on.

For more information, see:

- [Adaptive Cards](~/task-modules-and-cards/cards/cards-reference.md#adaptive-card) for.
- [Teams card reference](~/task-modules-and-cards/cards/cards-reference.md) for supported cards.

The following code shows an example of sending a simple Adaptive Card:

<details>
<summary>Example: Send a simple Adaptive Card</summary>

```json
{
    "type": "AdaptiveCard",
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "version": "1.5",
    "body": [
    {
        "items": [
        {
            "size": "large",
            "text": " Simple Adaptivecard Example with a Textbox",
            "type": "TextBlock",
            "weight": "bolder",
            "wrap": true
        },
        ],
        "spacing": "extraLarge",
        "type": "Container",
        "verticalContentAlignment": "center"
    }
    ]
}
```

</details>

## Send and receive messages

Sending and receiving messages is the core functionality of a bot. It enables a bot to:

[TBD: master procedure:]

- Send and receive messages
  - Receive a message activity
  - Receive a read receipt
  - Receive edit message activity
  - Receive undelete message activity
  - Receive soft delete message activity
  - Send a message
- Send suggested actions
- Update and delete bot messages

In a chat, each message is an `Activity` object of type `messageType: message`. When someone sends a message, Microsoft Teams posts it to your bot. Teams sends a JSON object to your bot's messaging endpoint, and it allows only one endpoint for messaging. Your bot then checks the message to figure out its type and responds accordingly.

Basic conversations are managed through the Bot Framework connector, which is a single REST API. This API enables your bot talk to Teams and other channels. The Bot Builder SDK offers the following features:

- Easy access to the Bot Framework connector.
- Tools to manage conversation flow and state.
- Simple ways to add cognitive services, like natural language processing (NLP).

Your bot gets messages from Teams using the `Text` property and can send back single or multiple responses to users.

For more information, see [user attribution for bot messages](/microsoftteams/platform/messaging-extensions/how-to/action-commands/respond-to-task-module-submit?tabs=dotnet%2Cdotnet-1#user-attribution-for-bots-messages).

The following table lists the activity that your bot can receive and take action on:

| Message type | Payload object | Scope |
| --- | --- | --- |
| [Receive a message activity](#receive-a-message-activity) | Message activity | All |
| [Receive edit message activity](#receive-edit-message-activity) | Message edit activity | All |
| [Receive undelete message activity](#receive-undelete-message-activity) | Message undelete activity | All |
| [Receive soft delete message activity](#get-soft-delete-message-activity) | Message soft delete activity | All |

### Receive a message activity

To receive a text message, use the `Text` property of an `Activity` object. In the bot's activity handler, use the turn context object's `Activity` to read a single message request.

The following code shows an example of receiving a message activity:

# [C#](#tab/dotnet1)

- [SDK reference](/dotnet/api/microsoft.bot.builder.activityhandler.onmessageactivityasync?view=botbuilder-dotnet-stable&preserve-view=true)

- [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/meetings-token-app/csharp/Bots/TokenBot.cs#L52)

```csharp

protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
{
  // Sends an activity to the sender of the incoming activity.
  await turnContext.SendActivityAsync(MessageFactory.Text($"Echo: {turnContext.Activity.Text}"), cancellationToken);
}

```

# [TypeScript](#tab/typescript1)

- [SDK reference](/javascript/api/botbuilder/teamsactivityhandler?view=botbuilder-ts-latest&preserve-view=true#botbuilder-teamsactivityhandler-onmessage)
- [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/app-localization/nodejs/server/bot/botActivityHandler.js#L25)

```typescript

export class MyBot extends TeamsActivityHandler {
    constructor() {
        super();
        this.onMessage(async (context, next) => {
            // Sends a message activity to the sender of the incoming activity.
            await context.sendActivity(`Echo: '${context.activity.text}'`);
            await next();
        });
    }
}

```

# [Python](#tab/python1)

- [SDK reference](/python/api/botbuilder-core/botbuilder.core.activityhandler?view=botbuilder-py-latest&preserve-view=true#botbuilder-core-activityhandler-on-message-activity)
- [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/python/bots/teams_conversation_bot.py#L103)

```python

async def on_message_activity(self, turn_context: TurnContext):
    // Sends a message activity to the sender of the incoming activity.
    return await turn_context.send_activity(MessageFactory.text(f"Echo: {turn_context.activity.text}"))

```

# [JSON](#tab/json1)

```json

{
    "type": "message",
    "id": "1485983408511",
    "timestamp": "2017-02-01T21:10:07.437Z",
    "localTimestamp": "2017-02-01T14:10:07.437-07:00",
    "serviceUrl": "https://smba.trafficmanager.net/amer/",
    "channelId": "msteams",
    "from": {
        "id": "29:1XJKJMvc5GBtc2JwZq0oj8tHZmzrQgFmB39ATiQWA85gQtHieVkKilBZ9XHoq9j7Zaqt7CZ-NJWi7me2kHTL3Bw",
        "name": "Megan Bowen",
        "aadObjectId": "7faf8ab2-3d56-4244-b585-20c8a42ed2b8"
    },
    "conversation": {
        "conversationType": "personal",
        "id": "a:17I0kl9EkpE1O9PH5TWrzrLNwnWWcfrU7QZjKR0WSfOpzbfcAg2IaydGElSo10tVr4C7Fc6GtieTJX663WuJCc1uA83n4CSrHSgGBj5XNYLcVlJAs2ZX8DbYBPck201w-"
    },
    "recipient": {
        "id": "28:c9e8c047-2a74-40a2-b28a-b162d5f5327c",
        "name": "Teams TestBot"
    },
    "textFormat": "plain",
    "text": "Hello Teams TestBot.Sending bold-italic rich text",
    "attachments": [
      {
            "contentType": "text/html",
            "content": "<div><div>Hello Teams TestBot. Sending <strong>bold</strong>-<em>italic</em> rich text.</div>\n</div>"
      } 
    ],
    "entities": [
      { 
        "locale": "en-US",
        "country": "US",
        "platform": "Windows",
        "timezone": "America/Los_Angeles",
        "type": "clientInfo"
      }
    ],
    "channelData": {
        "tenant": {
            "id": "72f988bf-86f1-41af-91ab-2d7cd011db47"
        }
    },
    "locale": "en-US"
}

```

---

### Receive a read receipt

The **Read receipts** setting in Teams allow the sender of a chat message to be notified when their message was read by the recipient in one-on-one and group chats. After the recipient reads the message, the **Seen** :::image type="icon" source="../assets/icons/read_receipt_seen.png" border="false"::: appears next to the message. You also have the option to configure your bot to receive read receipt events through the **Read receipts** setting. The read receipt event helps you enhance user experience in the following ways:

- You can configure your bot to send a follow-up message if your app user hasn't read the message in the personal chat.

- You can create a feedback loop using read receipts to tune your bot’s experience.

> [!NOTE]
>
> - Read receipts are supported only in user to bot chat scenarios.
> - Read receipts for bots doesn’t support team, channel, and group chat scopes.
> - If a tenant admin or user disables the **Read receipts** setting, the bot doesn't receive the read receipt event.

To receive read receipts events for your bot, ensure the following:

- Add the [RSC](~/graph-api/rsc/resource-specific-consent.md#rsc-permissions-for-a-chat-or-meeting) `ChatMessageReadReceipt.Read.Chat` permission in the [app manifest](~/resources/schema/manifest-schema.md), as follows:

# [App manifest v1.12 or later](#tab/app-manifest-v112-or-later)

```json
    
"webApplicationInfo": {
    
     "id": "38f0ca43-1c38-4c39-8097e-47f62c686500",
     "resource": ""
},
"authorization": {
    "permissions": {
    "orgwide": [],
     "resourceSpecific": [
        {
        "name": "ChatMessageReadReceipt.Read.Chat",
        "type": "Application"
        }
        ]
     }
 }
    
```

# [App manifest v1.11 or earlier](#tab/app-manifest-v111-or-earlier)

```json
    
 “webApplicationInfo”: {

     "id": "123456c8-67d2-4f54-b74e-408b195c4cbc",
     "resource": "https: //AnyString",
     "applicationPermissions": [
     "ChatMessageReadReceipt.Read.Chat"
     ]
 }
    
```

---

You can also add RSC permissions through Graph API. For more information, see [`consentedPermissionSet`](/graph/api/userteamwork-teamsappinstallation-upgrade#http-request).

- Override the method `OnTeamsReadReceiptAsync` with `IsMessageRead` handler.

  The `IsMessageRead` helper method is useful to determine if the message is read by the recipients. If the `compareMessageId` is less than or equal to the `LastReadMessageId`, then the message has been read. Override the `OnTeamsReadReceiptAsync` method to receive read receipts with [`IsMessageRead`](/dotnet/api/microsoft.bot.schema.teams.readreceiptinfo.ismessageread#microsoft-bot-schema-teams-readreceiptinfo-ismessageread(system-string)) helper method:

    ```csharp
    
    protected override async Task OnTeamsReadReceiptAsync(ReadReceiptInfo readReceiptInfo, ITurnContext<IEventActivity> turnContext, CancellationToken cancellationToken) 
    {
        var lastReadMessageId = readReceiptInfo.LastReadMessageId;
       if (IsMessageRead("{id of the message that you care}", LastReadMessageId))
       {
            await turnContext.SendActivityAsync(MessageFactory.Text("User read the bot's message"), cancellationToken);    
        }
    }
    ```

    Following is an example of read receipts event request that a bot receives:

    ```json
    {
        "name": "application/vnd.microsoft.readReceipt",
        "type": "event",
        "timestamp": "2023-08-16T17:23:11.1366686Z",
        "id": "f:b4783e72-9d7b-2ed9-ccef-ab446c873007",
        "channelId": "msteams",
        "serviceUrl": "https://smba.trafficmanager.net/amer/",
        "from": {
            "id": "29:1-8Iuh70W9pRqV8tQK8o2nVjxz33RRGDKLf4Bh7gKnrzN8s7e4vCyrFwjkPbTCX_Co8c4aXwWvq3RBLr-WkkVMw",
            "aadObjectId": "5b649834-7412-4cce-9e69-176e95a394f5"
        },
        "conversation": {
            "conversationType": "personal",
            "tenantId": "6babcaad-604b-40ac-a9d7-9fd97c0b779f",
            "id": "a:1xlimp68NSUxEqK0ap2rXuwC9ITauHgV2M4RaDPkeRhV8qMaFn-RyilMZ62YiVdqs8pp43yQaRKvv_U2S2gOS5nM-y_pOxVe4BW1qMGPtqD0Bv3pw-nJXF0zhDlZHMZ1Z"
        },
        "recipient": {
            "id": "28:9901a8b6-4fef-428b-80b1-ddb59361adeb",
            "name": "Test Bot"
        },
        "channelData": {
            "tenant": {
                "id": "6babcaad-604b-40ac-a9d7-9fd97c0b779f"
            }
        },
        "value": {
            "lastReadMessageId": "1692206589131"
        }
    }
    
    ```

- Read receipt [admin setting](/microsoftteams/messaging-policies-in-teams#messaging-policy-settings) or [user setting](https://support.microsoft.com/office/use-read-receipts-for-messages-in-microsoft-teams-533f2334-32ef-424b-8d56-ed30e019f856) is turned on for the tenant for the bot to receive the read receipt events. The tenant admin or the user must enable or disable the read receipt setting.

After the bot is enabled in a user to bot chat scenario, the bot promptly receives a read receipt event when the user reads the bot's message. You can track the user engagement by counting the number of events and you can also send a context aware message.

### Receive edit message activity

When you edit a message, the bot gets a notification of the edit message activity.

To get an edit message activity notification in a bot, you can override `OnTeamsMessageEditAsync` handler.

Following is an example of an edit message activity notification using `OnTeamsMessageEditAsync` when a sent message is edited:

# [C#](#tab/dotnet3)

```csharp

protected override async Task OnTeamsMessageEditAsync(ITurnContext<IMessageUpdateActivity> turnContext, CancellationToken cancellationToken) 
{ 
var replyActivity = MessageFactory.Text("message is updated"); 
await turnContext.SendActivityAsync(replyActivity, cancellationToken); 
} 

```

# [JSON](#tab/json3)

```json

{
"type":"messageUpdate",
"timestamp":"2022-10-28T17:19:39.4615413Z",
"localTimestamp":"2022-10-28T10:19:39.4615413-07:00",
"id":"1666977568748",
"channelId":"msteams",
"serviceUrl":"https://canary.botapi.skype.com/amer/",
"from": {
    "id":"29:1BLjP9j3_PM4mubmQZsYPx7jDyLeLf_YVA9sVPV08KMAFMjJWB_EUGveb9EVDh9TslNp9qjnzEBy3kgw01Jf1Kg",
    "name":"Mike Wilber",
    "aadObjectId":"520e4d1e-2108-43ee-a092-46a9507c6200"caching
},
"conversation":{
    "conversationType":"personal",
    "tenantId":"528dbe3f-15e0-4e37-84a1-00cc305847dd","id":"a:1pweuGJ44RkB90tiJNQ_I6g3vyuP4CYA_f-v6f0Vd-Bs3Ce85C73Ah1y8TvyjESsTHWjjgw-gnsuIuCUOWkfOCq6qaUYsk2_-fj93XXXHUMAUzhFFvTnaCU7V4WiMqRPB"
},
"recipient":{
    "id":"28:0d569679-gb4j-479a-b0d8-238b6e6b1149",
    "name":"TestBot"
},
"entities":[
    {
        "locale":"en-US",
        "country":"US",
        "platform":"Web",
        "timezone":"America/Los_Angeles",
        "type":"clientInfo"
    }
],
"channelData":{
    "eventType":"editMessage",
    "tenant":{"id":"528dbe3f-15e0-4e37-84a1-00cc305847dd"}
},
"locale":"en-US",
"localTimezone":"America/Los_Angeles"
}  

```

# [JavaScript](#tab/javascript3)

You can either use **​event function registration** or **​method override** method to get activity notifications to handle the message updates using the Bot SDK:

**​Event function registration**:

```javascript

this.onTeamsMessageEditEvent(async (context, next) => {
  let editedMessage = context.activity.text;
  await context.sendActivity(`The edited message is ${editedMessage}"`);
  next();
})

```

**​Method override**:

```javascript

async onTeamsMessageEdit(context) {
    let editedMessage = context.activity.text;
    await context.sendActivity(`The edited message is ${editedMessage}"`);
}

```

# [HTTP](#tab/http1)

```http
PUT {Service URL of your bot}/v3/conversations/{conversationId}/activities/{activityId}
```

```json
{
    "type": "message",
    "text": "This message has been updated"
}
```

---

### Receive undelete message activity

When you undelete a message, the bot gets a notification of the undelete message activity.

To get an undelete message activity notification in a bot, you can override `OnTeamsMessageUndeleteAsync` handler.

The following is an example of an undelete message activity notification using `OnTeamsMessageUndeleteAsync` when a deleted message is restored:

# [C#](#tab/dotnet4)

```csharp

protected override async Task OnTeamsMessageUndeleteAsync(ITurnContext<IMessageUpdateActivity> turnContext, CancellationToken cancellationToken)
{ 
var replyActivity = MessageFactory.Text("message is undeleted"); 
await turnContext.SendActivityAsync(replyActivity, cancellationToken); 
} 

```

# [JSON](#tab/json4)

```json

{
"type":"messageUpdate",
"timestamp":"2022-10-28T17:19:39.4615413Z",
"localTimestamp":"2022-10-28T10:19:39.4615413-07:00",
"id":"1666977568748",
"channelId":"msteams",
"serviceUrl":"https://canary.botapi.skype.com/amer/",
"from": {
    "id":"29:1BLjP9j3_TM4mubmQZsYEo7jDyLeLf_YVA9sVPVO7KMAFMjJWB_EUGveb9EVDh9LgoNp9qjnzEBy4kgw83Jf1Kg",
    "name":"Alex Wilber",
    "aadObjectId":"976e4d1e-2108-43ee-a092-46a9507c5606"
},
"conversation":{
    "conversationType":"personal",
    "tenantId":"528dbe3f-15e0-4e37-84a1-00cc305847dd","id":"a:1tewuGJ44RkB90tiJNQ_I4q8vyuN5CYA_f-v6f0Vd-Bs3Ce85C73Ah1y8TvyjESsTHWjjgw-gnsuIuCUOWkfOCq6qaUYsk2_-fj93XXXHUMAUzhFFvTnaCU7V4WiMqXQL"
},
"recipient":{
    "id":"28:0d469698-ab9d-479a-b0d8-758b6e6b1234",
    "name":"Testbot"
},
"entities":[
    {
           "locale":"en-US",
        "country":"US",
        "platform":"Web",
        "timezone":"America/Los_Angeles",
        "type":"clientInfo"
    }
],
"channelData":{
    "eventType":"undeleteMessage",
    "tenant":{"id":"528dbe3f-15e0-4e37-84a1-00cc305847dd"}
},
"locale":"en-US",
"localTimezone":"America/Los_Angeles"
}  

```

# [JavaScript](#tab/javascript4)

You can either use **​event function registration** or **​method override** method to get activity notifications to handle the message updates using the Bot SDK:

**​Event function registration**:

```javascript

this.onTeamsMessageUndeleteEvent(async (context, next) => {
    let undeletedMessage = context.activity.text;
    let messageId = context.activity.id;
    await context.sendActivity(`Previously the message was deleted. After undeleting, the message is now: "${undeletedMessage}"`);
next();
})

```

**​Method override**:

```javascript

async onTeamsMessageUndelete(context) {
    let undeletedMessage = context.activity.text;
    let messageId = context.activity.id;
    await context.sendActivity(`Previously the message was deleted. After undeleting, the message is now: "${undeletedMessage}"`);
}

```

# [HTTP](#tab/http2)

```http
PUT {Service URL of your bot}/v3/conversations/{conversationId}/activities/{activityId}
```

```json
{
    "type": "message",
    "text": "This message has been updated"
}
```

---

### Get soft delete message activity

When you soft delete a message, the bot gets a notification of the soft delete message activity.

To get a soft delete message activity notification in a bot, you can override `OnTeamsMessageSoftDeleteAsync` handler.

Following is an example of a soft delete message activity notification using `OnTeamsMessageSoftDeleteAsync` when a message is soft deleted:

# [C#](#tab/dotnet5)

```csharp

protected override async Task OnTeamsMessageSoftDeleteAsync(ITurnContext<IMessageDeleteActivity> turnContext, CancellationToken cancellationToken) 
{ 
var replyActivity = MessageFactory.Text("message is soft deleted"); 
await turnContext.SendActivityAsync(replyActivity, cancellationToken); 
} 

```

# [JSON](#tab/json5)

```json

{
"type":"messageDelete",
"timestamp":"2022-10-28T17:19:43.1612052Z",
"localTimestamp":"2022-10-28T10:19:43.1612052-07:00",
"id":"1666977568748",
"channelId":"msteams",
"serviceUrl":"https://canary.botapi.skype.com/amer/",
"from": {
    "id":"29:1BLjP9j3_TM4mubmQZsYEo7jDyLeLf_YVA9sVPVO7KMAFMjJWB_EUGveb9EVDh9LgoNp9qjnzEBy4kgw83Jf1Kg",
    "name":"Alex Wilber",
    "aadObjectId":"976e4d1e-2108-43ee-a092-46a9507c5606"
},
"conversation":{
    "conversationType":"personal",
    "tenantId":"528dbe3f-15e0-4e37-84a1-00cc305847dd","id":"a:1tewuGJ44RkB90tiJNQ_I4q8vyuN5CYA_f-v6f0Vd-Bs3Ce85C73Ah1y8TvyjESsTHWjjgw-gnsuIuCUOWkfOCq6qaUYsk2_-fj93XXXHUMAUzhFFvTnaCU7V4WiMqXQL"
},
"recipient":{
    "id":"28:0d469698-ab9d-479a-b0d8-758b6e6b1235",
    "name":"Testbot"
},
"entities":[
    {
        "locale":"en-US",
        "country":"US",
        "platform":"Web",
        "timezone":"America/Los_Angeles",
        "type":"clientInfo"
    }
],
"channelData":{
    "eventType":"softDeleteMessage",
    "tenant":{"id":"528dbe3f-15e0-4e37-84a1-00cc305847dd"}
},
"locale":"en-US",
"localTimezone":"America/Los_Angeles"
}  

```

# [JavaScript](#tab/javascript5)

You can either use **​event function registration** or **​method override** method to get activity notifications to handle the message updates using the Bot SDK:

**​Event function registration**:

```javascript

this.onTeamsMessageSoftDeleteEvent(async (context, next) => {
    let messageId = context.activity.id;
      await context.sendActivity(`The deleted message id is ${messageId}`);
    next();
})

```

**​Method override**:

```javascript

async onTeamsMessageSoftDelete(context) {
    let messageId = context.activity.id;
    await context.sendActivity(`The deleted message id is ${messageId}`);
}

```

---

### Send suggested actions

The suggested actions enable your bot to present buttons that the user can select to provide input. Suggested actions enhance user experience by enabling the user to answer a question or make a choice with selection of a button, rather than typing a response with a keyboard.
When the user selects a button, it remains visible and accessible in the rich cards, but not for the suggested actions. This prevents the user from selection of stale buttons within a conversation.

To add suggested actions to a message, set the `suggestedActions` property of an [activity](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference) object to specify the list of [card action](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference) objects that represent the buttons to be presented to the user. For more information, see [`sugestedActions`](/dotnet/api/microsoft.bot.builder.messagefactory.suggestedactions).

The following is an example for implementation and experience of suggested actions:

``` json
"suggestedActions": {
    "actions": [
      {
        "type": "imBack",
        "title": "Action 1",
        "value": "Action 1"
      },
      {
        "type": "imBack",
        "title": "Action 2",
        "value": "Action 2"
      }
    ],
    "to": [<list of recepientIds>]
  }
```

The following illustrates an example of suggested actions:

:::image type="content" source="~/assets/images/Cards/suggested-actions.png" alt-text="Bot suggested actions" border="true":::

> [!NOTE]
>
> - `SuggestedActions` are only supported for one-on-one chat bots with both text based messages and Adaptive Cards.
> - `SuggestedActions` aren't supported for chat bots with attachments for any conversation type.
> - `imBack` is the only supported action type and Teams display up to six suggested actions.

## Send messages in Teams channel data

The `channelData` object contains Teams-specific information and is a definitive source for team and channel IDs. Optionally, you can cache and use these IDs as keys for local storage. The `TeamsActivityHandler` in the SDK pulls out important information from the `channelData` object to make it accessible. However, you can always access the original data from the `turnContext` object.

The `channelData` object isn't included in messages in personal conversations, as these take place outside of a channel.

A typical `channelData` object in an activity sent to your bot contains the following information:

- `eventType`: Teams event type passed only in cases of [conversation events in your Teams bot](how-to/conversations/subscribe-to-conversation-events.md).
- `tenant.id`: Microsoft Entra tenant ID passed in all contexts.
- `team`: Passed only in channel contexts, not in personal chat.
  - `id`: GUID for the channel.
  - `name`: Name of the team passed only in cases of [team rename events](subscribe-to-conversation-events.md#team-renamed).
- `channel`: Passed only in channel contexts, when the bot is mentioned or for events in channels in teams, where the bot is added.
  - `id`: GUID for the channel.
  - `name`: Channel name passed only in cases of [channel modification events](~/bots/how-to/conversations/subscribe-to-conversation-events.md).
- `channelData.teamsTeamId`: Deprecated. This property is only included for backward compatibility.
- `channelData.teamsChannelId`: Deprecated. This property is only included for backward compatibility.

The following code shows an example of channelData object (channelCreated event):

```json
"channelData": {
    "eventType": "channelCreated",
    "tenant": {
        "id": "72f988bf-86f1-41af-91ab-2d7cd011db47"
    },
    "channel": {
        "id": "19:693ecdb923ac4458a5c23661b505fc84@thread.skype",
        "name": "My New Channel"
    },
    "team": {
        "id": "19:693ecdb923ac4458a5c23661b505fc84@thread.skype"
    }
}
```

## Next step

## See also
