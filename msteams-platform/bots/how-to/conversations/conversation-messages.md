---
title: Messages in bot conversations
description: Learn to send, receive, edit, undelete, soft delete a message with suggested actions, notification, attachments, images, Adaptive Card, status error code responses.
ms.topic: overview
ms.author: anclear
ms.localizationpriority: medium
---

# Messages in bot conversations

Each message in a conversation is an `Activity` object of type `messageType: message`. When a user sends a message, Microsoft Teams posts the message activity to your bot. Teams sends a JSON object to your bot's messaging endpoint and Teams allows only one endpoint for messaging. Your bot examines the message to determine its type and responds accordingly.

Basic conversations are handled through the Bot Framework connector, a single REST API. This API enables your bot to communicate with Teams and other channels. The Bot Builder SDK provides the following features:

* Easy access to the Bot Framework connector.
* Functionality to manage conversation flow and state.
* Simple ways to incorporate cognitive services, such as natural language processing (NLP).

Your bot receives messages from Teams using the `Text` property and it sends single or multiple message responses to the users.

For more information, see [user attribution for bot messages](/microsoftteams/platform/messaging-extensions/how-to/action-commands/respond-to-task-module-submit?tabs=dotnet%2Cdotnet-1#user-attribution-for-bots-messages).

The following table lists the activity that your bot can receive and take action on:

| Type | Payload object | Scope |
| ---- | ---------| ------ |
| [Receive a message activity](#receive-a-message-activity) | Message activity | All |
| [Receive edit message activity](#get-edit-message-activity) | Message edit activity | All |
| [Receive undelete message activity](#get-undelete-message-activity) | Message undelete activity | All |
| [Receive soft delete message activity](#get-soft-delete-message-activity) | Message soft delete activity | All |

## Receive a message activity

To receive a text message, use the `Text` property of an `Activity` object. In the bot's activity handler, use the turn context object's `Activity` to read a single message request.

The following code shows an example of receiving a message activity:

# [C#](#tab/dotnet1)

* [SDK reference](/dotnet/api/microsoft.bot.builder.activityhandler.onmessageactivityasync?view=botbuilder-dotnet-stable&preserve-view=true)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/meetings-token-app/csharp/Bots/TokenBot.cs#L52)

```csharp

protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
{
  // Sends an activity to the sender of the incoming activity.
  await turnContext.SendActivityAsync(MessageFactory.Text($"Echo: {turnContext.Activity.Text}"), cancellationToken);
}

```

# [TypeScript](#tab/typescript1)

* [SDK reference](/javascript/api/botbuilder/teamsactivityhandler?view=botbuilder-ts-latest#botbuilder-teamsactivityhandler-onmessage&preserve-view=true)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/app-localization/nodejs/server/bot/botActivityHandler.js#L25)

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

* [SDK reference](/python/api/botbuilder-core/botbuilder.core.activityhandler?view=botbuilder-py-latest#botbuilder-core-activityhandler-on-message-activity&preserve-view=true)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/python/bots/teams_conversation_bot.py#L103)

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

## Receive a read receipt

The **Read receipts** setting in Teams allow the sender of a chat message to be notified when their message was read by the recipient in one-on-one and group chats. After the recipient reads the message, the **Seen** :::image type="icon" source="../../../assets/icons/read_receipt_seen.png" border="false"::: appears next to the message. You also have the option to configure your bot to receive read receipt events through the **Read receipts** setting. The read receipt event helps you enhance user experience in the following ways:

* You can configure your bot to send a follow-up message if your app user hasn't read the message in the personal chat.

* You can create a feedback loop using read receipts to tune your bot’s experience.

> [!NOTE]
>
> * Read receipts are supported only in user to bot chat scenarios.
> * Read receipts for bots doesn’t support team, channel, and group chat scopes.
> * If a tenant admin or user disables the **Read receipts** setting, the bot doesn't receive the read receipt event.

To receive read receipts events for your bot, ensure the following:

* Add the [RSC](~/graph-api/rsc/resource-specific-consent.md#rsc-permissions-for-a-chat-or-meeting) `ChatMessageReadReceipt.Read.Chat` permission in the [app manifest](~/resources/schema/manifest-schema.md), as follows:

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

* Override the method `OnTeamsReadReceiptAsync` with `IsMessageRead` handler.

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

* Read receipt [admin setting](/microsoftteams/messaging-policies-in-teams#messaging-policy-settings) or [user setting](https://support.microsoft.com/office/use-read-receipts-for-messages-in-microsoft-teams-533f2334-32ef-424b-8d56-ed30e019f856) is turned on for the tenant for the bot to receive the read receipt events. The tenant admin or the user must enable or disable the read receipt setting.

After the bot is enabled in a user to bot chat scenario, the bot promptly receives a read receipt event when the user reads the bot's message. You can track the user engagement by counting the number of events and you can also send a context aware message.

## Send a message

To send a text message, specify the string you want to send as an activity. In the bot's activity handler, use the turn context object's `SendActivityAsync` method to send a single message response. Use the object's `SendActivitiesAsync` method to send multiple responses.

The following code shows an example of sending a message when a user is added to a conversation:

# [C#](#tab/dotnet2)

* [SDK reference](/dotnet/api/microsoft.bot.builder.turncontext.sendactivityasync?view=botbuilder-dotnet-stable#microsoft-bot-builder-turncontext-sendactivityasync(microsoft-bot-schema-iactivity-system-threading-cancellationtoken)&preserve-view=true)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-teams-authentication/csharp/Bots/TeamsBot.cs#L29)

```csharp

protected override async Task OnMembersAddedAsync(IList<ChannelAccount> membersAdded, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
{
  // Sends an activity to the sender of the incoming activity.
  await turnContext.SendActivityAsync(MessageFactory.Text($"Hello and welcome!"), cancellationToken);
}

```

# [TypeScript](#tab/typescript2)

* [SDK reference](/javascript/api/botbuilder-core/turncontext?view=botbuilder-ts-latest#botbuilder-core-turncontext-sendactivity&preserve-view=true)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/nodejs/bots/teamsConversationBot.js#L46)

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

* [SDK reference](/python/api/botbuilder-core/botbuilder.core.turncontext?view=botbuilder-py-latest#botbuilder-core-turncontext-send-activity&preserve-view=true)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-teams-authentication/python/bots/auth_bot.py#L33)

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
>* Message splitting occurs when a text message and an attachment are sent in the same activity payload. Teams splits this activity into two separate activities, one with a text message and the other with an attachment. As the activity is split, you do not receive the message ID in response, which is used to [update or delete](~/bots/how-to/update-and-delete-bot-messages.md) the message proactively. It is recommended to send separate activities instead of depending on message splitting.
>* Messages sent can be localized to provide personalization. For more information, see [localize your app](../../../concepts/build-and-test/apps-localization.md).

Messages sent between users and bots include internal channel data within the message. This data allows the bot to communicate properly on that channel. The Bot Builder SDK allows you to modify the message structure.

## Get edit message activity

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

## Get soft delete message activity

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
> * `SuggestedActions` are only supported for one-on-one chat bots with both text based messages and Adaptive Cards.
> * `SuggestedActions` aren't supported for chat bots with attachments for any conversation type.
> * `imBack` is the only supported action type and Teams display up to six suggested actions.

## Teams channel data

The `channelData` object contains Teams-specific information and is a definitive source for team and channel IDs. Optionally, you can cache and use these IDs as keys for local storage. The `TeamsActivityHandler` in the SDK pulls out important information from the `channelData` object to make it accessible. However, you can always access the original data from the `turnContext` object.

The `channelData` object isn't included in messages in personal conversations, as these take place outside of a channel.

A typical `channelData` object in an activity sent to your bot contains the following information:

* `eventType`: Teams event type passed only in cases of [channel modification events](~/bots/how-to/conversations/subscribe-to-conversation-events.md).
* `tenant.id`: Microsoft Entra tenant ID passed in all contexts.
* `team`: Passed only in channel contexts, not in personal chat.
  * `id`: GUID for the channel.
  * `name`: Name of the team passed only in cases of [team rename events](subscribe-to-conversation-events.md#team-renamed).
* `channel`: Passed only in channel contexts, when the bot is mentioned or for events in channels in teams, where the bot is added.
  * `id`: GUID for the channel.
  * `name`: Channel name passed only in cases of [channel modification events](~/bots/how-to/conversations/subscribe-to-conversation-events.md).
* `channelData.teamsTeamId`: Deprecated. This property is only included for backward compatibility.
* `channelData.teamsChannelId`: Deprecated. This property is only included for backward compatibility.

### Example channelData object

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

## Message content

Messages received from or sent to your bot can include different types of message content.

| Format    | From user to bot | From bot to user | Notes                                                                                   |
|-----------|------------------|------------------|-----------------------------------------------------------------------------------------|
| Rich text | ✔️                | ✔️                | Your bot can send rich text, pictures, and cards. Users can send rich text and pictures to your bot.                                                                                        |
| Pictures  | ✔️                | ✔️                | Maximum 1024 × 1024 pixels and 1 MB in PNG, JPEG, or GIF format. Doesn't support the animated GIF. |
| Cards     | ❌                | ✔️                | See [Teams card reference](~/task-modules-and-cards/cards/cards-reference.md) for supported cards. |
| Emojis    | ✔️                | ✔️                | Teams currently supports emojis through UTF-16, such as U+1F600 for grinning face. |

### Picture messages

To enhance your message, you can include pictures as attachments to that message. For more information on attachments, see [add media attachments to messages](/azure/bot-service/dotnet/bot-builder-dotnet-add-media-attachments).

Pictures can be at most 1024 × 1024 pixels and 1 MB in PNG, JPEG, or GIF format. Animated GIF isn't supported.

Specify the height and width of each image by using XML. In Markdown, the image size defaults to 256×256. For example:

* Use: `<img src="http://aka.ms/Fo983c" alt="Duck on a rock" height="150" width="223"></img>`.
* Don't use: `![Duck on a rock](http://aka.ms/Fo983c)`.

A conversational bot can include Adaptive Cards that simplify business workflows. Adaptive Cards offer rich customizable text, speech, images, buttons, and input fields.

### Adaptive Cards

Adaptive Cards can be authored in a bot and shown in multiple apps such as Teams, your website, and so on. For more information, see [Adaptive Cards](~/task-modules-and-cards/cards/cards-reference.md#adaptive-card).

The following code shows an example of sending a simple Adaptive Card:

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

## Add notifications to your message

There are two ways to send a notification from your application:

* By setting the `Notification.Alert` property on bot message.
* By sending an activity feed notification using the Graph API.

You can add notifications to your message using the `Notification.Alert` property. Notifications alert users to an event in your application such as new tasks, mentions, or comments. These alerts are related to what users are working on or what they must look at by inserting a notice into their activity feed. For notifications to trigger from your bot message, set the `TeamsChannelData` objects `Notification.Alert` property to *true*. If a notification is raised depends on the individual user's Teams settings, and you can't override these settings.

If you want to generate an arbitrary notification without sending a message to the user, then you can use the Graph API. For more information, see [how to send activity feed notifications using Graph API](/graph/teams-send-activityfeednotifications) along with the [best practices](/graph/teams-activity-feed-notifications-best-practices).

> [!NOTE]
> The **Summary** field displays any text from the user as a notification message in the feed.

The following code shows an example of adding notifications to your message:

# [C#](#tab/dotnet)

* [SDK reference](/dotnet/api/microsoft.bot.builder.teams.teamsactivityextensions.teamsnotifyuser?view=botbuilder-dotnet-stable#microsoft-bot-builder-teams-teamsactivityextensions-teamsnotifyuser(microsoft-bot-schema-iactivity)&preserve-view=true)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-proactive-messaging/csharp/proactive-cmd/Program.cs#L178)

```csharp
protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
{
  // Returns a simple text message.
  var message = MessageFactory.Text("You'll get a notification, if you've turned them on.");
  message.TeamsNotifyUser();

  // Sends an activity to the sender of the incoming activity.
  await turnContext.SendActivityAsync(message);
}

```

# [TypeScript](#tab/typescript)

* [SDK reference](/javascript/api/botbuilder-core/turncontext?view=botbuilder-ts-latest#botbuilder-core-turncontext-sendactivity&preserve-view=true)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/app-localization/nodejs/server/bot/botActivityHandler.js#L36)

```typescript

this.onMessage(async (turnContext, next) => {
    let message = MessageFactory.text("You'll get a notification, if you've turned them on.");
    teamsNotifyUser(message);
    // Sends an activity to the sender of the incoming activity.
    await turnContext.sendActivity(message);

    // By calling next() you ensure that the next BotHandler is run.
    await next();
});

```

# [Python](#tab/python)

[SDK reference](/python/api/botbuilder-core/botbuilder.core.teams?view=botbuilder-py-latest#botbuilder-core-teams-teams-notify-user&preserve-view=true)

```python

async def on_message_activity(self, turn_context: TurnContext):
    message = MessageFactory.text("You'll get a notification, if you've turned them on.")
    teams_notify_user(message)
    // Sends an activity to the sender of the incoming activity.
    await turn_context.send_activity(message)

```

# [JSON](#tab/json)

```json
{
  "type": "message",
  "timestamp": "2017-04-24T21:46:00.9663655Z",
  "localTimestamp": "2017-04-24T14:46:00.9663655-07:00",
  "serviceUrl": "https://callback.com",
  "channelId": "msteams",
  "from": {
    "id": "28:e4fda94a-4b80-40eb-9bf0-6314491bc793",
    "name": "The bot"
  },
  "conversation": {
    "id": "a:1pL6i0oY3C0K8oAj8"
  },
  "recipient": {
    "id": "29:1rsVJmSSFMScF0YFyCXpvNWlo",
    "name": "User"
  },
  "text": "John Phillips assigned you a weekly todo",
  "summary": "Don't forget to meet with Marketing next week",
  "channelData": {
    "notification": {
      "alert": true
    }
  },
  "replyToId": "1493070356924"
}
```

---

## Status codes from bot conversational APIs

Ensure to handle these errors appropriately in your Teams app. The following table lists the error codes and the descriptions under which the errors are generated:

| Status code | Error code and message values | Description | Retry request | Developer action |
|----------------|-----------------|-----------------|----------------|----------------|
| 400 | **Code**: `Bad Argument` <br/> **Message**: *scenario specific | Invalid request payload provided by the bot. See error message for specific details. | No | Reevaluate request payload for errors. Check returned error message for details. |
| 401 | **Code**: `BotNotRegistered` <br/> **Message**: No registration found for this bot. | The registration for this bot wasn't found. | No | Verify the bot ID and password. Ensure the bot ID (Microsoft Entra ID) is registered in the Teams Developer Portal or via Azure bot channel registration in Azure with 'Teams' channel enabled.|
| 403 | **Code**: `BotDisabledByAdmin` <br/> **Message**: The tenant admin disabled this bot | Tenant admin blocked interactions between user and the bot app. Tenant admin needs to allow the app for the user inside of app policies. For more information, see [app policies](/microsoftteams/app-policies). | No | Stop posting to conversation until interaction with bot is explicitly initiated by a user in the conversation indicating that the bot is no longer blocked. |
| 403 | **Code**: `BotNotInConversationRoster` <br/> **Message**: The bot isn't part of the conversation roster. | The bot isn't part of the conversation. App needs to be reinstalled in conversation. | No | Before attempting to send another conversation request, wait for an [`installationUpdate`](~/bots/how-to/conversations/subscribe-to-conversation-events.md#install-update-event) event, which indicates that the bot is added again.|
| 403 | **Code**: `ConversationBlockedByUser` <br/> **Message**: User blocked the conversation with the bot. | User blocked the bot in personal chat or a channel through moderation settings. | No | Delete the conversation from cache. Stop attempting to post to conversations until interaction with bot is explicitly initiated by a user in the conversation, indicating that the bot is no longer blocked. |
| 403 |**Code**: `ForbiddenOperationException` <br/> **Message**: Bot isn't installed in user's personal scope | Proactive message is sent by a bot, which isn't installed in a personal scope. | No | Before attempting to send another conversation request, install the app in personal scope. |
| 403 |**Code**: `InvalidBotApiHost` <br/> **Message**: Invalid bot api host. For GCC tenants, call `https://smba.infra.gcc.teams.microsoft.com`.|The bot called the public API endpoint for a conversation that belongs to a GCC tenant.| No | Update the service URL for the conversation to `https://smba.infra.gcc.teams.microsoft.com` and retry the request.|
| 403 | **Code**: `NotEnoughPermissions` <br/> **Message**: *scenario specific | Bot doesn't have required permissions to perform the requested action. | No | Determine the required action from the error message. |
| 404 | **Code**: `ActivityNotFoundInConversation` <br/> **Message**: Conversation not found. | The message ID provided couldn't be found in the conversation. Message doesn't exist or it is deleted. | No | Check if message ID sent is an expected value. Remove the ID if it was cached. |
| 404 | **Code**: `ConversationNotFound` <br/> **Message**: Conversation not found. | Conversation wasn't found as it doesn't exist or is deleted. | No | Check if conversation ID sent is an expected value. Remove the ID if it was cached. |
| 412 | **Code**: `PreconditionFailed` <br/> **Message**: Precondition failed, please try again. | A precondition failed on one of our dependencies due to multiple concurrent operations on the same conversation. | Yes | Retry with exponential backoff. |
| 413 | **Code**: `MessageSizeTooBig` <br/> **Message**: Message size too large. | The size of the incoming request was too large. For more information, see [format your bot messages](/microsoftteams/platform/bots/how-to/format-your-bot-messages). | No | Reduce the payload size. |
| 429 | **Code**: `Throttled` <br/> **Message**: Too many requests. Also returns when to retry after. | Too many requests sent by the bot. For more information, see [rate limit](/microsoftteams/platform/bots/how-to/rate-limit). | Yes | Retry using `Retry-After` header to determine backoff time. |
| 500 | **Code**: `ServiceError` <br/> **Message**: *various | Internal server error. | No | Report the issue in [developer community](~/feedback.md#developer-community-help). |
| 502 | **Code**: `ServiceError` <br/> **Message**: *various | Service dependency issue. | Yes | Retry with exponential backoff. If the issue persists, report the issue in [developer community](~/feedback.md#developer-community-help). |
| 503 | | Service is unavailable. | Yes | Retry with exponential backoff. If the issue persists, report the issue in [developer community](~/feedback.md#developer-community-help). |
| 504 | | Gateway Timeout. | Yes | Retry with exponential backoff. If the issue persists, report the issue in [developer community](~/feedback.md#developer-community-help). |

### Status codes retry guidance

The general retry guidance for each status code is listed in the following table, bot must avoid retrying status codes that aren't specified:

|Status code | Retry strategy |
|----------------|-----------------|
| 403 | Retry by calling the GCC API `https://smba.infra.gcc.teams.microsoft.com` for `InvalidBotApiHost`.|
| 412 | Retry using exponential backoff. |
| 429 | Retry using `Retry-After` header to determine the wait time in seconds and in between requests, if available. Otherwise, retry using exponential backoff with thread ID, if possible. |
| 502 | Retry using exponential backoff. |
| 503 | Retry using exponential backoff. |
| 504 | Retry using exponential backoff. |

## Code sample

| Sample name | Description | Node.js | .NETCore | Python | .NET | Manifest
|----------------|-----------------|--------------|----------------|-----------|-----|-----|
| Teams conversation bot | This sample app shows how to use different bot conversation events available in Bot Framework v4. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/python) | NA |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/csharp/demo-manifest/bot-conversation.zip) |
| Teams app localization | This sample shows Teams app localization using bot and tab. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-localization/nodejs) | NA | NA | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-localization/csharp) | NA |

## Next step

> [!div class="nextstepaction"]
> [Bot command menus](~/bots/how-to/create-a-bot-commands-menu.md)

## See also

* [Send proactive messages](~/bots/how-to/conversations/send-proactive-messages.md)
* [Subscribe to conversation events](~/bots/how-to/conversations/subscribe-to-conversation-events.md)
* [Send and receive files through the bot](~/bots/how-to/bots-filesv4.md)
* [Send tenant ID and conversation ID to the request headers of the bot](~/bots/how-to/conversations/request-headers-of-the-bot.md)
* [Localize your app](../../../concepts/build-and-test/apps-localization.md)
* [Bot activity handlers](../../bot-basics.md)
