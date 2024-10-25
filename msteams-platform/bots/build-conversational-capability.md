---
title: Conversations with a Bot
description: Learn about sending and receiving messages using a bot app
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: surbhigupta
ms.date: 10/03/2024
---

# Send and receive messages

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

- Send and receive messages.
  - [Receive a message activity](#receive-a-message-activity).
  - [Receive a read receipt](#receive-a-read-receipt).
  - [Receive edit message activity](#receive-edit-message-activity).
  - [Receive undelete message activity](#receive-undelete-message-activity).
  - [Receive soft delete message activity](#receive-soft-delete-message-activity).
  - [Send a message](#send-a-message).
  - [Update and delete bot messages](#update-and-delete-messages-sent-from-bot).
- [Send suggested actions](#send-suggested-actions).
- [Send messages in Teams channel data](#send-messages-in-teams-channel-data)

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

### Send a message

To send a text message, specify the string you want to send as an activity. In the bot's activity handler, use the turn context object's `SendActivityAsync` method to send a single message response. Use the object's `SendActivitiesAsync` method to send multiple responses.

The following code shows an example of sending a message when a user is added to a conversation:

# [C#](#tab/dotnet2)

- [SDK reference](/dotnet/api/microsoft.bot.builder.turncontext.sendactivityasync?view=botbuilder-dotnet-stable&preserve-view=true#microsoft-bot-builder-turncontext-sendactivityasync(microsoft-bot-schema-iactivity-system-threading-cancellationtoken))

- [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-teams-authentication/csharp/Bots/TeamsBot.cs#L29)

```csharp

protected override async Task OnMembersAddedAsync(IList<ChannelAccount> membersAdded, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
{
  // Sends an activity to the sender of the incoming activity.
  await turnContext.SendActivityAsync(MessageFactory.Text($"Hello and welcome!"), cancellationToken);
}

```

# [TypeScript](#tab/typescript2)

- [SDK reference](/javascript/api/botbuilder-core/turncontext?view=botbuilder-ts-latest&preserve-view=true#botbuilder-core-turncontext-sendactivity)
- [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/nodejs/bots/teamsConversationBot.js#L46)

```typescript

    this.onMembersAddedActivity(async (context, next) => {
        await Promise.all((context.activity.membersAdded || []).map(async (member) => {
            if (member.id !== context.activity.recipient.id) {
              
                // Sends an activity to the sender of the incoming activity.
                await context.sendActivity(
                    `Welcome to the team ${member.givenName} ${member.surname}`
                );
            }
        }));

        await next();
    });

```

# [Python](#tab/python2)

- [SDK reference](/python/api/botbuilder-core/botbuilder.core.turncontext?view=botbuilder-py-latest&preserve-view=true#botbuilder-core-turncontext-send-activity)
- [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-teams-authentication/python/bots/auth_bot.py#L33)

```python

async def on_members_added_activity(
    self, members_added: [ChannelAccount], turn_context: TurnContext
):
    for member in teams_members_added:
        // Sends a message activity to the sender of the incoming activity.
        await turn_context.send_activity(f"Welcome your new team member {member.id}")
    return

```

# [JSON](#tab/json2)

```json

{
    "type": "message",
    "from": {
        "id": "28:c9e8c047-2a34-40a1-b28a-b162d5f5327c",
        "name": "Teams TestBot"
    },
    "conversation": {
        "id": "a:17I0kl8EkpE1O9PH5TWrzrLNwnWWcfrU7QZjKR0WSfOpzbfcAg2IaydGElSo10tVr4C7Fc6GtieTJX663WuJCc1uA83n4CSrHSgGBj5XNYLcVlJAs2ZX8DbYBPck201w-",
        "name": "Convo1"
   },
   "recipient": {
        "id": "29:1XJKJMvc5GBtc2JwZq0oj8tHZmzrQgFmB25ATiQWA85gQtHieVkKilBZ9XHoq9j7Zaqt7CZ-NJWi7me2kHTL3Bw",
        "name": "Megan Bowen"
    },
    "text": "My bot's reply",
    "replyToId": "1632474074231"
}

```

# [HTTP](#tab/http)

```http
HTTP Request: {Service URL of your bot}/v3/conversations/{conversationId}/activities
```

```json
{
    "type": "message",
    "from": {
        "id": "28:c9e8c047-2a34-40a1-b28a-b162d5f5327c",
        "name": "Teams TestBot"
    },
    "conversation": {
        "id":"a:17I0kl8EkpE1O9PH5TWrzrLNwnWWcfrU7QZjKR0WSfOpzbfcAg2IaydGElSo10tVr4C7Fc6GtieTJX663WuJCc1uA83n4CSrHSgGBj5XNYLcVlJAs2ZX8DbYBPck201w-",
        "name": "Convo1"
    },
    "recipient": {
        "id": "29:1XJKJMvc5GBtc2JwZq0oj8tHZmzrQgFmB25ATiQWA85gQtHieVkKilBZ9XHoq9j7Zaqt7CZ-NJWi7me2kHTL3Bw",
        "name": "Megan Bowen"
    },
    "text": "My bot's reply"
}
```

---

> [!NOTE]
>
>- Message splitting occurs when a text message and an attachment are sent in the same activity payload. Teams splits this activity into two separate activities, one with a text message and the other with an attachment. As the activity is split, you do not receive the message ID in response, which is used to [update or delete](~/bots/how-to/update-and-delete-bot-messages.md) the message proactively. It is recommended to send separate activities instead of depending on message splitting.
>- Messages sent can be localized to provide personalization. For more information, see [localize your app](../../../concepts/build-and-test/apps-localization.md).

Messages sent between users and bots include internal channel data within the message. This data allows the bot to communicate properly on that channel. The Bot Builder SDK allows you to modify the message structure.

### Get edit message activity

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

## Get undelete message activity

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

### Receive soft delete message activity

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

### Update and delete messages sent from bot

[!INCLUDE [pre-release-label](~/includes/v4-to-v3-pointer-bots.md)]

Your bot can dynamically update messages after sending them instead of having them as static snapshots of data. Messages can also be deleted using the Bot Framework's `DeleteActivity` method.

> [!NOTE]
> A bot can't update or delete messages sent by the user in Microsoft Teams.

#### Update messages

You can use dynamic message updates for scenarios, such as poll updates, modifying available actions after a button press, or any other asynchronous state change.

It is not necessary for the new message to match the original in type. For example, if the original message contains an attachment, the new message can be a simple text message.

# [C#](#tab/dotnet)

- [SDK reference](/dotnet/api/microsoft.bot.builder.turncontext.updateactivityasync)
- [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/csharp/Bots/TeamsConversationBot.cs#L266)

To update an existing message, pass a new `Activity` object with the existing activity ID to the `UpdateActivityAsync` method of the `TurnContext` class.

```csharp
// Send initial message
var response = await turnContext.SendActivityAsync(MessageFactory.Attachment(card.ToAttachment()), cancellationToken);
var activityId = response.Id; // Fetch activity id.

// MessageFactory.Text(): Specifies the type of text data in a message attachment.
var newActivity = MessageFactory.Text("The new text for the activity");
newActivity.Id = activityId;

// UpdateActivityAsync(): A method that can participate in update activity events for the current turn.
await turnContext.UpdateActivityAsync(newActivity, cancellationToken);
```

# [TypeScript](#tab/typescript)

- [SDK reference](/javascript/api/botbuilder-core/turncontext#botbuilder-core-turncontext-updateactivity)
- [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/nodejs/bots/teamsConversationBot.js#L162)

To update an existing message, pass a new `Activity` object with the existing activity ID to the `updateActivity` method of the `TurnContext` object.

```typescript
// Send initial message
var message = await context.sendActivity("<Your Message>");
var activityId = message.id; // Fetch activity id.

// MessageFactory.Text(): Specifies the type of text data in a message attachment.
const newActivity = MessageFactory.text('The new text for the activity');
newActivity.id = activityId;

// A method that can participate in update activity events for the current turn.
await turnContext.updateActivity(newActivity);
```

# [Python](#tab/python)

- [SDK reference](/python/api/botbuilder-core/botbuilder.core.turncontext#botbuilder-core-turncontext-update-activity)
- [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/python/bots/teams_conversation_bot.py#L156)

To update an existing message, pass a new `Activity` object with the existing activity ID to the `update_activity` method of the `TurnContext` class.

```python
# Send initial message
message = await turn_context.send_activity("<Your Message>")
activityId = message.id # Fetch activity id.

# MessageFactory.Text(): Specifies the type of text data in a message attachment.
new_activity = MessageFactory.text("The new text for the activity")
new_activity.id = activity_id

# A method that can participate in update activity events for the current turn.
update_result = await context.update_activity(new_activity)
```

# [REST API](#tab/rest)

> [!NOTE]
> You can develop Teams apps in any web-programming technology and directly call the [Bot Connector service REST APIs](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference?view=azure-bot-service-4.0&preserve-view=true). To do so, you need to implement [Authentication](/azure/bot-service/rest-api/bot-framework-rest-connector-authentication?view=azure-bot-service-4.0&preserve-view=true) security procedures with your API requests.

To update an existing activity within a conversation, include the `conversationId` and `activityId` in the request endpoint. To complete this scenario, you must cache the activity ID returned by the original post call.

```http
PUT /v3/conversations/{conversationId}/activities/{activityId}
```

|Request |Response |
|----|----|
| An [Activity](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference?view=azure-bot-service-4.0&preserve-view=true#activity-object) object. | A [ResourceResponse](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference?view=azure-bot-service-4.0&preserve-view=true#resourceresponse-object) object. |

---
---

Now that you have updated messages, update the existing card on button selection for incoming activities.

#### Update cards

To update the existing card on button selection, you can use `ReplyToId` of incoming activity.

# [C#](#tab/dotnet)

- [SDK reference](/dotnet/api/microsoft.bot.builder.turncontext.updateactivityasync#microsoft-bot-builder-turncontext-updateactivityasync(microsoft-bot-schema-iactivity-system-threading-cancellationtoken))
- [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/csharp/Bots/TeamsConversationBot.cs#L266)

To update existing card on a button selection, pass a new `Activity` object with updated card and `ReplyToId` as activity ID to the `UpdateActivityAsync` method of the `TurnContext` class.

```csharp
// Returns a message activity that contains an attachment.
var activity = MessageFactory.Attachment(card.ToAttachment());
activity.Id = turnContext.Activity.ReplyToId;

// A method that can participate in update activity events for the current turn.
await turnContext.UpdateActivityAsync(activity, cancellationToken);
```

# [TypeScript](#tab/typescript)

- [SDK reference](/javascript/api/botbuilder-core/turncontext#botbuilder-core-turncontext-updateactivity)
- [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/nodejs/bots/teamsConversationBot.js#L162)

To update existing card on a button selection, pass a new `Activity` object with updated card and `replyToId` as activity ID to the `updateActivity` method of the `TurnContext` object.

```typescript
// MessageFactory.attachment(): Returns a message activity that contains an attachment.
const message = MessageFactory.attachment(card);
message.id = context.activity.replyToId;

// updateActivity(): A method that can participate in update activity events for the current turn.
await context.updateActivity(message);
```

# [Python](#tab/python)

- [SDK reference](/python/api/botbuilder-core/botbuilder.core.turncontext?view=botbuilder-py-latest&preserve-view=true#botbuilder-core-turncontext-update-activity)
- [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/python/bots/teams_conversation_bot.py#L156)

To update existing card on a button click, pass a new `Activity` object with updated card and `reply_to_id` as activity ID to the `update_activity` method of the `TurnContext` class.

```python
# MessageFactory.attachment(): Returns a message activity that contains an attachment.
updated_activity = MessageFactory.attachment(CardFactory.hero_card(card))
updated_activity.id = turn_context.activity.reply_to_id

# update_activity(): A method that can participate in update activity events for the current turn.
await turn_context.update_activity(updated_activity)
```

# [REST API](#tab/rest)

> [!NOTE]
> You can develop Teams apps in any web programming technology and directly call the [bot connector service REST APIs](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference?view=azure-bot-service-4.0&preserve-view=true). To do this, you must implement [authentication](/azure/bot-service/rest-api/bot-framework-rest-connector-authentication?view=azure-bot-service-4.0&preserve-view=true) security procedures with your API requests.

To update an existing activity within a conversation, include the `conversationId` and `activityId` in the request endpoint. To complete this scenario, you must cache the activity ID returned by the original post call.

```http
PUT /v3/conversations/{conversationId}/activities/{activityId}
```

|Request |Response |
|----|----|
| An [activity](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference?view=azure-bot-service-4.0&preserve-view=true#activity-object) object. | A [ResourceResponse](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference?view=azure-bot-service-4.0&preserve-view=true#resourceresponse-object) object. |

---

Now that you have updated cards, you can delete messages using the Bot Framework.

#### Delete messages

In the Bot Framework, every message has its unique activity identifier. Messages can be deleted using the Bot Framework's `DeleteActivity` method.

# [C#](#tab/dotnet)

- [SDK reference](/dotnet/api/microsoft.bot.builder.botadapter.deleteactivityasync#microsoft-bot-builder-botadapter-deleteactivityasync(microsoft-bot-builder-iturncontext-microsoft-bot-schema-conversationreference-system-threading-cancellationtoken)&preserve-view=true)
- [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/csharp/Bots/TeamsConversationBot.cs#L165)

To delete a message, pass that activity's ID to the `DeleteActivityAsync` method of the `TurnContext` class.

```csharp
foreach (var activityId in _list)
{
    // When overridden in a derived class, deletes an existing activity in the conversation.
    await turnContext.DeleteActivityAsync(activityId, cancellationToken);
}
```

# [TypeScript](#tab/typescript)

- [SDK reference](/javascript/api/botbuilder-core/turncontext#botbuilder-core-turncontext-deleteactivity)
- [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/nodejs/bots/teamsConversationBot.js#L255)

To delete a message, pass that activity's ID to the `deleteActivity` method of the `TurnContext` object.

```typescript
for (let i = 0; i < activityIds.length; i++) {
    // deleteActivity(): deletes an existing activity in the conversation.
    await turnContext.deleteActivity(activityIds[i]);
}
```

# [Python](#tab/python)

- [SDK reference](/python/api/botbuilder-core/botbuilder.core.turncontext#botbuilder-core-turncontext-delete-activity)
- [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/python/bots/teams_conversation_bot.py#L227)

To delete that message, pass that activity's ID to the `delete_activity` method of the `TurnContext` object.

```python
for each activity_id in _list:
    # delete_activity(): deletes an existing activity in the conversation.
    await TurnContext.delete_activity(activity_id)
```

# [REST API](#tab/rest)

To delete an existing activity within a conversation, include the `conversationId` and `activityId` in the request endpoint.

```http
DELETE /v3/conversations/{conversationId}/activities/{activityId}
```

| **Request and response** | **Description** |
|----|----|
| N/A | An HTTP status code indicating the outcome of the operation. Nothing is specified in the body of the response. |

---

## Send suggested actions

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
  - `name`: Name of the team passed only in cases of [team rename events](how-to/conversations/subscribe-to-conversation-events.md#team-renamed).
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

## Receive conversation messages with RSC

With the resource-specific consent (RSC) permissions model, conversation owners can allow a bot to receive all user messages in standard channels and chats without needing to be @mentioned. They can give consent during the app installation or upgrade process after the app updates are published. Originally made for Microsoft Teams Graph APIs, the RSC model is now expanded to include bot scenarios. You can enable this by adding the `ChannelMessage.Read.Group` or `ChatMessage.Read.Chat` permission strings in your app manifest (formerly known as the Teams app manifest).

> [!NOTE]
> Bots that receive all conversation messages with RSC are supported in [Government Community Cloud (GCC), GCC-High, and Department of Defense (DOD)](~/concepts/app-fundamentals-overview.md#government-community-cloud) environments.

Ensure that the services needing access to all Teams message data use the Graph APIs to get access to archived data in channels and chats. A bot must use the `ChannelMessage.Read.Group` and `ChatMessage.Read.Chat` RSC permission appropriately to create engaging experience for users so it can get approved by the Microsoft Teams Store. Additionally, the app description must explain how the bot uses the data it reads. Here are some tips to help you use the RSC permissions correctly for your bot:

- A bot mustn't use the `ChannelMessage.Read.Group` and `ChatMessage.Read.Chat` RSC permissions to pull a a large amount of customer data.
- A bot must be able to get all chat messages using `ChatMessage.Read.Chat` only after they've been re-installed or newly installed into a chat.
- If your app uses the `ChatMessage.Read.Chat` RSC permission for Graph scenarios, ensure that you test the app using the steps in [upload a custom app in a conversation](#upload-a-custom-app-in-a-conversation) and adjust it before the feature is [generally available](https://www.microsoft.com/microsoft-365/roadmap?filters=&searchterms=receive%2Call%2Cgroup%2Cchat%2Cmessages).

If your app uses RSC permissions to receive all channel or chat message, you can:

- [Receive all channel or chat messages](#receive-all-channel-or-chat-messages).
- [Receive only at-mentioned messages](#receive-only-at-mentioned-messages).

### Receive all channel or chat messages

The `ChannelMessage.Read.Group` and `ChatMessage.Read.Chat` RSC permissions are available for bots. With user consent and app installation, these permissions:

- Enable a specified graph application access all messages in channels and chats.
- Enable a bot to get all messages without needing to be @mentioned by defining in its app manifest to receive all conversation messages in the relevant contexts where these permissions apply.

If these RSC permissions are defined for a bot in its app manifest, it is able to receive all messages from a channel or a chat where it's installed. To receive all channel or chat messages, you must:

- [Update app manifest](#update-app-manifest).
- [Upload a custom app in a conversation](#upload-a-custom-app-in-a-conversation).

#### Update app manifest

For your bot to receive all conversation messages, the relevant RSC permission strings must be specified in the `authorization.permissions.resourceSpecific` property of your app manifest. For more information, see [app manifest](../resources/schema/manifest-schema.md).

:::image type="content" source="../assets/images/bots/RSC/appmanifest_2.png" alt-text="Screenshot shows the changes to be made in the app manifest.":::

The following code provides an example of the app manifest:

- **webApplicationInfo.id**: Your Microsoft Entra app ID. The app ID can be the same as your bot ID.
- **webApplicationInfo.resource**: Any string. The resource field has no operation in RSC, but must be added with a value to avoid error response.
- **authorization.permissions.resourceSpecific**: RSC permissions for your app with either or both `ChannelMessage.Read.Group` and `ChatMessage.Read.Chat` specified. For more information, see [resource-specific permissions](/microsoftteams/platform/graph-api/rsc/resource-specific-consent#resource-specific-permissions).

The following code provides an example of the app manifest version 1.12 or later:

```json
{
    "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.12/MicrosoftTeams.schema.json",
    "manifestVersion": "1.12",
    "version": "1.0.0",
    "id": "8239c8f3-ed78-4512-933e-babfd28856f1",
    "packageName": "com.contoso.rscechobot",
    "developer": {
        "name": "Contoso",
        "websiteUrl": "https://www.contoso.com",
        "privacyUrl": "https://www.contoso.com/privacy",
        "termsOfUseUrl": "https://www.contoso.com/tos"
    },
    "icons": {
        "color": "color.png",
        "outline": "outline.png"
    },
    "name": {
        "short": "RscEchoBot",
        "full": "Echo bot with RSC configured for all conversation messages"
    },
    "description": {
        "short": "Echo bot with RSC configured for all channel and chat messages",
        "full": "Echo bot configured with all channel and chat messages RSC permission in manifest"
    },
    "accentColor": "#FFFFFF",
    "staticTabs": [
        {
            "entityId": "conversations",
            "scopes": [
                "personal"
            ]
        },
        {
            "entityId": "about",
            "scopes": [
                "personal"
            ]
        }
    ],
    "webApplicationInfo": {
        "id": "07338883-af76-47b3-86e4-2603c50be638",
        "resource": "https://AnyString"
    },
    "authorization": {
        "permissions": {
            "resourceSpecific": [
                {
                    "type": "Application",
                    "name": "ChannelMessage.Read.Group"
                },
                {
                    "type": "Application",
                    "name": "ChatMessage.Read.Chat"
                }
            ]
        }
    },
    "bots": [
        {
            "botId": "07338883-af76-47b3-86e4-2603c50be638",
            "scopes": [
                "personal",
                "team",
                "groupchat"
            ],
            "supportsFiles": false,
            "isNotificationOnly": false
        }
    ],
    "permissions": [
        "identity",
        "messageTeamMembers"
    ],
    "validDomains": []
}
```

---

#### Upload a custom app in a conversation

# [Channel messages](#tab/channel)

The following steps guide you to upload and validate bot that receives all channel messages in a Team without being @mentioned:

1. Select or create a team.
1. Select &#x25CF;&#x25CF;&#x25CF; from the left pane. The dropdown menu appears.
1. Select **Manage team** from the dropdown menu.

   :::image type="content" source="how-to/conversations/Media/managing-team.png" alt-text="Screenshot shows the managing team option in Teams application.":::

1. Select **Apps**. Multiple apps appear.

1. Select **Upload a custom app** from the lower right corner.

      :::image type="content" source="how-to/conversations/Media/uploading-custom-app.png" alt-text="Screenshot shows the upload a custom app option.":::
  
1. Select **Open**.

      :::image type="content" source="how-to/conversations/Media/select-apppackage.png" alt-text="Screenshot shows the open dialog box to select the app package." lightbox="how-to/conversations/Media/select-apppackage.png":::

1. Select **Add** from the app details pop-up, to add the bot to your selected team.

      :::image type="content" source="how-to/conversations/Media/adding-bot.png" alt-text="Screenshot shows the add button to add a bot to a team." lightbox="how-to/conversations/Media/adding-bot.png":::

1. Select a channel and enter a message in the channel for your bot.

    The bot receives the message without being @mentioned.

      :::image type="content" source="how-to/conversations/Media/bot-receiving-message.png" alt-text="Screenshot shows a bot receiving message in a channel." lightbox="how-to/conversations/Media/bot-receiving-message.png":::

# [Chat messages](#tab/chat)

The following steps guide you to upload and validate bot that receives all chat messages in a chat without being @mentioned:

1. Select or create a group chat.
1. Select the ellipses &#x25CF;&#x25CF;&#x25CF; from the group chat. The dropdown menu appears.
1. Select **Manage apps** from the dropdown menu.

   :::image type="content" source="../assets/images/bots/chats-manage-apps-entry.png" alt-text="Screenshot shows the manage apps option from the dropdown menu of a Teams chat."  lightbox="../assets/images/bots/chats-manage-apps-entry.png":::

1. Select **Upload a custom app** from the lower right corner of **Manage apps**.

   :::image type="content" source="../assets/images/bots/Chats_Manage_Apps_Page.png" alt-text="Screenshot shows the upload an app option." lightbox="../assets/images/bots/Chats_Manage_Apps_Page.png":::

1. Select the app package from the **Open** dialog box.
1. Select **Open**.

   :::image type="content" source="../assets/images/bots/Chats_Sideload_App_FilePicker.png" alt-text= "Screenshot shows the window where the app package is selected.":::

1. Select **Add** from the app details pop-up, to add the bot to your selected group chat.

   :::image type="content" source="../assets/images/bots/Chats_Install_Dialog.png" alt-text="Screenshot shows the addition of the bot to the group chat.":::

1. Enter a message in the group chat for your bot.

   :::image type="content" source="../assets/images/bots/Bot_ReceiveMessage.png" alt-text="Screenshot shows the bot replying to a message.":::

   The bot receives the message without being @mentioned.

   :::image type="content" source="../assets/images/bots/Bot_NoMention.png" alt-text="Screenshot shows the bot replying to a message without a mention.":::

---

### Receive only at-mentioned messages

To enable you bots to get only those channel or chat messages where your bot is @mentioned, you must filter the messages. Use the following code snippet to enable your bot to receive only those message where it's @mentioned:

```csharp
    // When ChannelMessage.Read.Group or ChatMessage.Read.Chat RSC is in the app manifest, this method is called even when bot is not @mentioned.
    // This code snippet allows the bot to ignore all messages that do not @mention the bot.
    protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
    {
            // Ignore the message if bot was not mentioned. 
            // Remove this if block to process all messages received by the bot.
            if (!turnContext.Activity.GetMentions().Any(mention => mention.Mentioned.Id.Equals(turnContext.Activity.Recipient.Id, StringComparison.OrdinalIgnoreCase)))
            {
                return;
            }
            // Sends an activity to the sender of the incoming activity.
            await turnContext.SendActivityAsync(MessageFactory.Text("Using RSC the bot can receive messages across channels or chats in team without being @mentioned."));
    }
```

If you want your bot to receive all messages, then you don't need to filter the @mention messages.

### Step-by-step guide

Follow the [step-by-step](../sbs-teams-conversation-bot.yml) guide to create a Teams conversation bot.

## Next step

[Channel and group chat conversations with a bot](how-to/conversations/channel-and-group-conversations.md)

## See also

[Conversation events in your Teams bot](how-to/conversations/subscribe-to-conversation-events.md)
