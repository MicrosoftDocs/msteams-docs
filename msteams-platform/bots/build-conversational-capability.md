---
title: Conversations with a Bot
description: Learn about sending and receiving messages using a bot app
ms.topic: article
ms.localizationpriority: medium
ms.author: vikasalmal
ms.owner: angovil
ms.date: 05/11/2026
zone_pivot_groups: teams-sdk-languages
---

# Send and receive messages

Conversational bots communicate with users through messaging, enabling seamless interactions. It can simulate real life conversations with users through text or voice interactions. You must ensure that bot conversations are interactive, dynamic, adaptive, and user friendly.

You can also send [targeted messages](../agents-in-teams/targeted-messages.md) using your agent or bot app.

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

- [Adaptive Cards](~/task-modules-and-cards/cards/cards-reference.md#adaptive-card).
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
            "text": "Simple Adaptive Card example with a Textbox",
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

Sending and receiving messages is the core functionality of a bot.

In a chat, each message is an `Activity` object of type `messageType: message`. When someone sends a message, Microsoft Teams posts it to your bot. Teams sends a JSON object to your bot's messaging endpoint, and it allows only one endpoint for messaging. Your bot then checks the message to figure out its type and responds accordingly.

Basic conversations are managed through the Teams SDK Framework connector, which is a single REST API. This API enables your bot talk to Teams and other channels. The Bot Builder SDK offers the following features:

- Easy access to the Teams SDK Framework connector.
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
| [Receive soft delete message activity](#receive-soft-delete-message-activity) | Message soft delete activity | All |

### Receive a message activity

To receive a text message, use the `Text` property of an `Activity` object. In the bot's activity handler, use the turn context object's `Activity` to read a single message request.

The following code shows an example of receiving a message activity:

::: zone pivot="teams-sdk-csharp"

- [SDK reference](/dotnet/api/microsoft.bot.builder.activityhandler.onmessageactivityasync?view=botbuilder-dotnet-stable&preserve-view=true)

- [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/TeamsJS/meetings-token-app/csharp/Bots/TokenBot.cs#L52)

```csharp
app.OnMessage(async context =>
{
    await context.Send($"Echo: {context.Activity.Text}");
});
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

- [SDK reference](/javascript/api/botbuilder/teamsactivityhandler?view=botbuilder-ts-latest&preserve-view=true#botbuilder-teamsactivityhandler-onmessage)
- [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/app-localization/nodejs/server/bot/botActivityHandler.js#L25)

```typescript

app.on('message', async ({ activity, send }) => {
    await send(`Echo: '${activity.text}'`);
});
```

::: zone-end

::: zone pivot="teams-sdk-python"

- [SDK reference](/python/api/botbuilder-core/botbuilder.core.activityhandler?view=botbuilder-py-latest&preserve-view=true#botbuilder-core-activityhandler-on-message-activity)
- [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/python/bots/teams_conversation_bot.py#L103)

```python

@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    await ctx.send(f"Echo: {ctx.activity.text}")
```

::: zone-end

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

> [!NOTE]
> If your bot supports sessions, the `conversation.id` in the activity payload is session-scoped. Each session has a unique conversation ID. For details on how to handle session-scoped conversation IDs, see [Structure conversations with sessions](how-to/conversations/agent-sessions.md).

### Receive a read receipt

The **Read receipts** setting in Teams allow the sender of a chat message to be notified when their message was read by the recipient in one-on-one and group chats. After the recipient reads the message, the **Seen** :::image type="icon" source="../assets/icons/read_receipt_seen.png" border="false"::: appears next to the message. You also have the option to configure your bot to receive read receipt events through the **Read receipts** setting. The read receipt event helps you enhance user experience in the following ways:

- You can configure your bot to send a follow-up message if your app user hasn't read the message in the personal chat.

- You can create a feedback loop using read receipts to tune your bot’s experience.

> [!NOTE]
>
> - Read receipts are supported only in user to bot chat scenarios.
> - Read receipts for bots doesn’t support team, channel, and group chat scopes.
> - If an admin or user disables the **Read receipts** setting, the bot doesn't receive the read receipt event.

To receive read receipts events for your bot, ensure the following:

- Add the [RSC](~/graph-api/rsc/resource-specific-consent.md#rsc-permissions-for-a-chat-or-meeting) `ChatMessageReadReceipt.Read.Chat` permission in the [app manifest](/microsoft-365/extensibility/schema/root-authorization-permissions-resource-specific#rsc-delegated-permissionsd), as follows:

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

- Override the method `OnReadReceipt` with `context.Activity.Value.LastReadMessageId`.

  The `context.Activity.Value.LastReadMessageId`method is useful to determine if the message is read by the recipients. If the `compareMessageId` is less than or equal to the `LastReadMessageId`, then the message has been read. Override the `OnReadReceipt` method to receive read receipts with `context.Activity.Value.LastReadMessageId` method:

    ```csharp
    app.OnReadReceipt(async context =>

    {
        var lastReadMessageId = context.Activity.Value.LastReadMessageId;
        await context.Send("User read the bot's message");
    });
    ```

The following example shows a read receipts event request that a bot receives:

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

- Read receipt [admin setting](/microsoftteams/messaging-policies-in-teams#messaging-policy-settings) or [user setting](https://support.microsoft.com/office/use-read-receipts-for-messages-in-microsoft-teams-533f2334-32ef-424b-8d56-ed30e019f856) is turned on for the tenant for the bot to receive the read receipt events. The admin or the user must enable or disable the read receipt setting.

After the bot is enabled in a user to bot chat scenario, the bot promptly receives a read receipt event when the user reads the bot's message. You can track the user engagement by counting the number of events and you can also send a context aware message.

### Receive edit message activity

When you edit a message, the bot gets a notification of the edit message activity.

To get an edit message activity notification in a bot, you can override `OnMessageEdit` handler.

The following is an example of an edit message activity notification using `OnMessageEdit` when a sent message is edited:

::: zone pivot="teams-sdk-csharp"

```csharp
app.OnMessageEdit(async context =>
{
    await context.Send("message is updated");
}); 
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript
app.on('messageEdit', async ({ activity, send }) => {
    const editedMessage = activity.text;
    await send(`The edited message is ${editedMessage}`);
});
```

::: zone-end

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

```http
PUT {Service URL of your bot}/v3/conversations/{conversationId}/activities/{activityId}
```

```json
{
    "type": "message",
    "text": "This message has been updated"
}
```

### Send a message

To send a text message, specify the string you want to send as an activity. In the bot's activity handler, use the turn context object's `context.Send(...)` method to send a single message response. Use the object's `multiple context.Send(...) calls` method to send multiple responses.

The following code shows an example of sending a message when a user is added to a conversation:

::: zone pivot="teams-sdk-csharp"

- [SDK reference](https://microsoft.github.io/teams-sdk/csharp/essentials/sending-messages/)

- [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-teams-authentication/csharp/Bots/TeamsBot.cs#L29)

```csharp
app.OnMembersAdded(async context =>
{
    foreach (var member in context.Activity.MembersAdded)
    {
        if (member.Id != context.Activity.Recipient.Id)
        {
            await context.Send("Hello and welcome!");
        }
    }
});
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

- [SDK reference](https://microsoft.github.io/teams-sdk/typescript/essentials/sending-messages/)
- [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/nodejs/bots/teamsConversationBot.js#L46)

```typescript
   app.on('membersAdded', async ({ activity, send }) => {
    for (const member of activity.membersAdded ?? []) {
        if (member.id !== activity.recipient.id) {
            await send(`Welcome to the team ${member.name}`);
        }
    }
});
```

::: zone-end

::: zone pivot="teams-sdk-python"

- [SDK reference](https://microsoft.github.io/teams-sdk/python/essentials/sending-messages/)
- [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-teams-authentication/python/bots/auth_bot.py#L33)

```python
@app.on_members_added
async def handle_members_added(ctx: ActivityContext):
    for member in ctx.activity.members_added:
        if member.id != ctx.activity.recipient.id:
            await ctx.send(f"Welcome your new team member {member.id}")
```

::: zone-end

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

> [!NOTE]
>
>- Message splitting occurs when a text message and an attachment are sent in the same activity payload. Teams splits this activity into two separate activities, one with a text message and the other with an attachment. As the activity is split, you do not receive the message ID in response, which is used to [update or delete](~/bots/how-to/update-and-delete-bot-messages.md) the message proactively. It is recommended to send separate activities instead of depending on message splitting.
>- Messages sent can be localized to provide personalization. For more information, see [localize your app](../concepts/build-and-test/apps-localization.md).

Messages sent between users and bots include internal channel data within the message. This data allows the bot to communicate properly on that channel. The Bot Builder SDK allows you to modify the message structure.

### Receive undelete message activity

When you undelete a message, the bot gets a notification of the undelete message activity.

To get an undelete message activity notification in a bot, you can override `OnMessageUndelete` handler.

The following is an example of an undelete message activity notification using `OnMessageUndelete` when a deleted message is restored:

::: zone pivot="teams-sdk-csharp"

```csharp
app.OnMessageUndelete(async context =>
{
    await context.Send("message is undeleted");
});
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript
app.on('messageUndelete', async ({ activity, send }) => {
    const undeletedMessage = activity.text;
    await send(`Previously the message was deleted. After undeleting, the message is now: "${undeletedMessage}"`);
});
```

::: zone-end

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

```http
PUT {Service URL of your bot}/v3/conversations/{conversationId}/activities/{activityId}
```

```json
{
    "type": "message",
    "text": "This message has been updated"
}
```

### Receive soft delete message activity

When you soft delete a message, the bot gets a notification of the soft delete message activity.

To get a soft delete message activity notification in a bot, you can override `OnMessageSoftDelete` handler.

The following example shows a soft delete message activity notification using `OnMessageSoftDelete` when a message is soft deleted:

::: zone pivot="teams-sdk-csharp"

```csharp
app.OnMessageSoftDelete(async context =>
{
    await context.Send("message is soft deleted");
}); 
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript
app.on('messageSoftDelete', async ({ activity, send }) => {
    const messageId = activity.id;
    await send(`The deleted message id is ${messageId}`);
});
```

::: zone-end

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

### Update and delete messages sent from bot

[!INCLUDE [pre-release-label](~/includes/v4-to-v3-pointer-bots.md)]

Your bot can dynamically update messages after sending them instead of having them as static snapshots of data. Messages can also be deleted using the Teams SDK Framework's `context.Api.Conversations.Activities.DeleteAsync(...)` method.

> [!NOTE]
> A bot can't update or delete messages sent by the user in Microsoft Teams.

#### Update messages

You can use dynamic message updates for scenarios, such as poll updates, modifying available actions after a button press, or any other asynchronous state change.

It is not necessary for the new message to match the original in type. For example, if the original message contains an attachment, the new message can be a simple text message.

::: zone pivot="teams-sdk-csharp"

[Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/csharp/Bots/TeamsConversationBot.cs#L266)

To update an existing message, pass a new `Activity` object with the existing activity ID to the context.Api.Conversations.Activities.UpdateAsync(...)` method of the `TurnContext` class.

```csharp
app.OnMessage(async context =>
{
    // Send initial message
    var response = await context.Send("Your Message");
    var conversationId = context.Activity.Conversation.Id;
    var activityId = response.Id;

    var updatedActivity = new MessageActivity("The new text for the activity");

    await context.Api.Conversations.Activities.UpdateAsync(conversationId, activityId, updatedActivity);
});
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

- [SDK reference](/javascript/api/botbuilder-core/turncontext#botbuilder-core-turncontext-updateactivity)
- [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/nodejs/bots/teamsConversationBot.js#L162)

To update an existing message, pass a new `Activity` object with the existing activity ID to the `updateActivity` method of the `TurnContext` object.

```typescript
app.on('message', async ({ activity, api, send }) => {
    // Send initial message
    const response = await send('Your Message');
    const conversationId = activity.conversation.id;
    const activityId = response.id;

    await api.conversations.activities(conversationId).update(activityId, {
        type: 'message',
        text: 'The new text for the activity'
    });
});
```

::: zone-end

::: zone pivot="teams-sdk-python"

- [SDK reference](/python/api/botbuilder-core/botbuilder.core.turncontext#botbuilder-core-turncontext-update-activity)
- [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/python/bots/teams_conversation_bot.py#L156)

To update an existing message, pass a new `Activity` object with the existing activity ID to the `context.Api.Conversations.Activities.UpdateAsync(...)` method of the `TurnContext` class.

```python
@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    # Send initial message
    response = await ctx.send("Your Message")
    conversation_id = ctx.activity.conversation.id
    activity_id = response.id

    await ctx.api.conversations.activities(conversation_id).update(
        activity_id, MessageActivityInput(text="The new text for the activity")
    )
```

::: zone-end

> [!NOTE]
> You can develop Teams apps in any web-programming technology and directly call the [Bot Connector service REST APIs](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference?view=azure-bot-service-4.0&preserve-view=true). To do so, you need to implement [Authentication](/azure/bot-service/rest-api/bot-framework-rest-connector-authentication?view=azure-bot-service-4.0&preserve-view=true) security procedures with your API requests.

To update an existing activity within a conversation, include the `conversationId` and `activityId` in the request endpoint. To complete this scenario, you must cache the activity ID returned by the original post call.

```http
PUT /v3/conversations/{conversationId}/activities/{activityId}
```

|Request |Response |
|----|----|
| An [Activity](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference?view=azure-bot-service-4.0&preserve-view=true#activity-object) object. | A [ResourceResponse](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference?view=azure-bot-service-4.0&preserve-view=true#resourceresponse-object) object. |

Now that you have updated messages, update the existing card on button selection for incoming activities.

#### Update cards

To update the existing card on button selection, you can use `ReplyToId` of incoming activity.

::: zone pivot="teams-sdk-csharp"

[Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/csharp/Bots/TeamsConversationBot.cs#L266)

To update existing card on a button selection, pass a new `Activity` object with updated card and `ReplyToId` as activity ID to the `context.Api.Conversations.Activities.UpdateAsync(...)` method of the `TurnContext` class.

```csharp
app.OnMessage(async context =>
{
    var conversationId = context.Activity.Conversation.Id;
    var activityId = context.Activity.ReplyToId;

    var updatedActivity = new MessageActivity();
    updatedActivity.Attachments.Add(card.ToAttachment());

    await context.Api.Conversations.Activities.UpdateAsync(conversationId, activityId, updatedActivity);
});
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

- [SDK reference](/javascript/api/botbuilder-core/turncontext#botbuilder-core-turncontext-updateactivity)
- [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/nodejs/bots/teamsConversationBot.js#L162)

To update existing card on a button selection, pass a new `Activity` object with updated card and `replyToId` as activity ID to the `updateActivity` method of the `TurnContext` object.

```typescript
app.on('message', async ({ activity, api }) => {
    const conversationId = activity.conversation.id;
    const activityId = activity.replyToId;

    await api.conversations.activities(conversationId).update(activityId, {
        type: 'message',
        attachments: [card]
    });
});
```

::: zone-end

::: zone pivot="teams-sdk-python"

- [SDK reference](/python/api/botbuilder-core/botbuilder.core.turncontext?view=botbuilder-py-latest&preserve-view=true#botbuilder-core-turncontext-update-activity)
- [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/python/bots/teams_conversation_bot.py#L156)

To update existing card on a button click, pass a new `Activity` object with updated card and `reply_to_id` as activity ID to the `ctx.api.conversations.activities(conversation_id).update(...)` method of the `TurnContext` class.

```python
@app.on_message
async def handle_update_card(ctx: ActivityContext[MessageActivity]):
    conversation_id = ctx.activity.conversation.id
    activity_id = ctx.activity.reply_to_id

    await ctx.api.conversations.activities(conversation_id).update(
        activity_id, MessageActivityInput().add_card(card)
    )
```

::: zone-end

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

Now that you have updated cards, you can delete messages using the Teams SDK Framework.

#### Delete messages

In Teams SDK Framework, every message has its unique activity identifier. Messages can be deleted using the Teams SDK Framework's `context.Api.Conversations.Activities.DeleteAsync(...)` method.

::: zone pivot="teams-sdk-csharp"

[Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/csharp/Bots/TeamsConversationBot.cs#L165)

To delete a message, pass that activity's ID to the `context.Api.Conversations.Activities.DeleteAsync(...)` method of the `TurnContext` class.

```csharp
app.OnMessage(async context =>
{
    var conversationId = context.Activity.Conversation.Id;

    foreach (var activityId in _list)
    {
        await context.Api.Conversations.Activities.DeleteAsync(conversationId, activityId);
    }
});
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

[Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/nodejs/bots/teamsConversationBot.js#L255)

To delete a message, pass that activity's ID to the `context.Api.Conversations.Activities.DeleteAsync(...)` method of the `TurnContext` object.

```typescript
app.on('message', async ({ activity, api }) => {
    const conversationId = activity.conversation.id;

    for (const activityId of activityIds) {
        await api.conversations.activities(conversationId).delete(activityId);
    }
});
```

::: zone-end

::: zone pivot="teams-sdk-python"

- [SDK reference](/python/api/botbuilder-core/botbuilder.core.turncontext#botbuilder-core-turncontext-delete-activity)
- [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/python/bots/teams_conversation_bot.py#L227)

To delete that message, pass that activity's ID to the `delete_activity` method of the `TurnContext` object.

```python
@app.on_message
async def handle_delete(ctx: ActivityContext[MessageActivity]):
    conversation_id = ctx.activity.conversation.id

    for activity_id in _list:
        await ctx.api.conversations.activities(conversation_id).delete(activity_id)
```

::: zone-end

To delete an existing activity within a conversation, include the `conversationId` and `activityId` in the request endpoint.

```http
DELETE /v3/conversations/{conversationId}/activities/{activityId}
```

| **Request and response** | **Description** |
|----|----|
| N/A | An HTTP status code indicating the outcome of the operation. Nothing is specified in the body of the response. |

## Quoted replies

Quoted replies let your agent reference a previous message in the conversation. When a user sends a message that quotes another message, your agent receives structured metadata about the quoted content. Your agent can also send messages that quote previous messages.

### Receive quoted replies

::: zone pivot="teams-sdk-csharp"

When a user quotes a message and sends it to your agent, the quoted reply metadata is available on the inbound activity. Use the `GetQuotedMessages` method to access all quoted reply entities.

```csharp
app.OnMessage(async context =>
{
    var quotes = context.Activity.GetQuotedMessages();

    if (quotes.Count > 0)
    {
        var quote = quotes[0].QuotedReply;
        await context.Reply(
            $"You quoted message {quote.MessageId} from {quote.SenderName}: \"{quote.Preview}\"");
    }
});
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

When a user quotes a message and sends it to your agent, the quoted reply metadata is available on the inbound activity. Use the `getQuotedMessages` method to access all quoted reply entities.

```typescript
app.on('message', async ({ activity, reply }) => {
  const quotes = activity.getQuotedMessages();

  if (quotes.length > 0) {
    const quote = quotes[0].quotedReply;
    await reply(
      `You quoted message ${quote.messageId} from ${quote.senderName}: "${quote.preview}"`
    );
  }
});
```

::: zone-end

::: zone pivot="teams-sdk-python"

When a user quotes a message and sends it to your agent, the quoted reply metadata is available on the inbound activity. Use the `get_quoted_messages` method to access all quoted reply entities.

```python
@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    quotes = ctx.activity.get_quoted_messages()

    if quotes:
        quote = quotes[0].quoted_reply
        await ctx.reply(
            f"You quoted message {quote.message_id} from {quote.sender_name}: \"{quote.preview}\""
        )
```

::: zone-end

### Send quoted replies

::: zone pivot="teams-sdk-csharp"

When your agent calls `Reply()`, the SDK automatically stamps a quoted reply entity referencing the inbound message. The reply will appear as a quoted reply in Teams.

```csharp
app.OnMessage(async context =>
{
    // Reply() automatically quotes the inbound message
    await context.Reply("Got it!");
});
```

To quote a different message in the same conversation (not the inbound message), use the `Quote()` method with the message ID you want to quote.

```csharp
app.OnMessage(async context =>
{
    // Quote a specific message by its ID
    var parentMessageId = "1772050244572";
    await context.Quote(parentMessageId, "Referencing an earlier message");
});
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

When your agent calls `reply()`, the SDK automatically stamps a quoted reply entity referencing the inbound message. The reply will appear as a quoted reply in Teams.

```typescript
app.on('message', async ({ reply }) => {
  // reply() automatically quotes the inbound message
  await reply('Got it!');
});
```

To quote a different message in the same conversation (not the inbound message), use the `quote()` method with the message ID you want to quote.

```typescript
app.on('message', async ({ quote }) => {
  // Quote a specific message by its ID
  const parentMessageId = '1772050244572';
  await quote(parentMessageId, 'Referencing an earlier message');
});
```

::: zone-end

::: zone pivot="teams-sdk-python"

When your agent calls `reply()`, the SDK automatically stamps a quoted reply entity referencing the inbound message. The reply will appear as a quoted reply in Teams.

```python
@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    # reply() automatically quotes the inbound message
    await ctx.reply("Got it!")
```

To quote a different message in the same conversation (not the inbound message), use the `quote()` method with the message ID you want to quote.

```python
@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    # Quote a specific message by its ID
    parent_message_id = "1772050244572"
    await ctx.quote(parent_message_id, "Referencing an earlier message")
```

::: zone-end

### Build quoted replies for proactively sending messages

::: zone pivot="teams-sdk-csharp"

For proactive scenarios (using `app.Send()`) or when quoting multiple messages, use the `AddQuote()` method on a message activity. Pass the message ID and an optional response text.

```csharp
var parentMessageId = "1772050244572";
var firstMessageId = "1772050244573";
var secondMessageId = "1772050244574";

// Single quote with response below it
var msg = new MessageActivity()
    .AddQuote(parentMessageId, "Here is my response");
await app.Send(conversationId, msg);

// Multiple quotes with interleaved responses
msg = new MessageActivity()
    .AddQuote(firstMessageId, "response to first")
    .AddQuote(secondMessageId, "response to second");
await app.Send(conversationId, msg);

// Grouped quotes — omit response to group quotes together
msg = new MessageActivity("see below for previous messages")
    .AddQuote(firstMessageId)
    .AddQuote(secondMessageId, "response to both");
await app.Send(conversationId, msg);
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

For proactive scenarios (using `app.send()`) or when quoting multiple messages, use the `addQuote()` method on a message activity. Pass the message ID and an optional response text.

```typescript
import { MessageActivity } from '@microsoft/teams.api';

const parentMessageId = '1772050244572';
const firstMessageId = '1772050244573';
const secondMessageId = '1772050244574';

// Single quote with response below it
let msg = new MessageActivity()
  .addQuote(parentMessageId, 'Here is my response');
await app.send(conversationId, msg);

// Multiple quotes with interleaved responses
msg = new MessageActivity()
  .addQuote(firstMessageId, 'response to first')
  .addQuote(secondMessageId, 'response to second');
await app.send(conversationId, msg);

// Grouped quotes — omit response to group quotes together
msg = new MessageActivity('see below for previous messages')
  .addQuote(firstMessageId)
  .addQuote(secondMessageId, 'response to both');
await app.send(conversationId, msg);
```

::: zone-end

::: zone pivot="teams-sdk-python"

For proactive scenarios (using `app.send()`) or when quoting multiple messages, use the `add_quote()` method on a message activity. Pass the message ID and an optional response text.

```python
from microsoft_teams.api.activities.message import MessageActivityInput

parent_message_id = "1772050244572"
first_message_id = "1772050244573"
second_message_id = "1772050244574"

# Single quote with response below it
msg = (MessageActivityInput()
    .add_quote(parent_message_id, "Here is my response"))
await app.send(conversation_id, msg)

# Multiple quotes with interleaved responses
msg = (MessageActivityInput()
    .add_quote(first_message_id, "response to first")
    .add_quote(second_message_id, "response to second"))
await app.send(conversation_id, msg)

# Grouped quotes — omit response to group quotes together
msg = (MessageActivityInput(text="see below for previous messages")
    .add_quote(first_message_id)
    .add_quote(second_message_id, "response to both"))
await app.send(conversation_id, msg)
```

::: zone-end

## Send messages in Teams channel data

The `channelData` object contains Teams-specific information and is a definitive source for team and channel IDs. Optionally, you can cache and use these IDs as keys for local storage. The `App` in the SDK pulls out important information from the `channelData` object to make it accessible. However, you can always access the original data from the `turnContext` object.

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

## Teams channel data

The `channelData` object contains Teams-specific information and is a definitive source for team and channel IDs. Optionally, you can cache and use these IDs as keys for local storage. The `App` in the SDK pulls out important information from the `channelData` object to make it accessible. However, you can always access the original data from the `turnContext` object.

The `channelData` object isn't included in messages in personal conversations, as these take place outside of a channel.

A typical `channelData` object in an activity sent to your bot contains the following information:

- `eventType`: Teams event type passed only in cases of [channel modification events](~/bots/how-to/conversations/subscribe-to-conversation-events.md).
- `tenant.id`: Microsoft Entra tenant ID passed in all contexts.
- `team`: Passed only in channel contexts, not in personal chat.
  - `id`: GUID for the channel.
  - `name`: Name of the team passed only in cases of (how-to/conversations/subscribe-to-conversation-events.md#team-renamed).
- `channel`: Passed only in channel contexts, when the bot is mentioned or for events in channels in teams, where the bot is added.
  - `id`: GUID for the channel.
  - `name`: Channel name passed only in cases of [channel modification events](~/bots/how-to/conversations/subscribe-to-conversation-events.md).
- `channelData.teamsTeamId`: Deprecated. This property is only included for backward compatibility.
- `channelData.teamsChannelId`: Deprecated. This property is only included for backward compatibility.

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

## Status codes from bot conversational APIs

Ensure to handle these errors appropriately in your Teams app. The following table lists the error codes and the descriptions under which the errors are generated:

| Status code | Error code and message values | Description | Retry request | Developer action |
|----------------|-----------------|-----------------|----------------|----------------|
| 400 | **Code**: `Bad Argument` <br/> **Message**: *scenario specific | Invalid request payload provided by the bot. See error message for specific details. | No | Reevaluate request payload for errors. Check returned error message for details. |
| 401 | **Code**: `BotNotRegistered` <br/> **Message**: No registration found for this bot. | The registration for this bot wasn't found. | No | Verify the bot ID and password. Ensure the bot ID (Microsoft Entra ID) is registered in the Teams Developer Portal or via Azure bot channel registration in Azure with 'Teams' channel enabled.|
| 403 | **Code**: `BotDisabledByAdmin` <br/> **Message**: The tenant admin disabled this bot | Admin blocked interactions between user and the bot app. Admin needs to allow the app for the user inside of app policies. For more information, see [app policies](/microsoftteams/app-policies). | No | Stop posting to conversation until interaction with bot is explicitly initiated by a user in the conversation indicating that the bot is no longer blocked. |
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
| 500 | **Code**: `ServiceError` <br/> **Message**: *various | Internal server error. | No | Report the issue in [developer community](../feedback.md#report-issues). |
[developer community forums](../feedback.md#developer-community-forums). |
| 502 | **Code**: `ServiceError` <br/> **Message**: *various | Service dependency issue. | Yes | Retry with exponential backoff. If the issue persists, report the issue in [developer community forums](../feedback.md#developer-community-forums).. |
| 503 | | Service is unavailable. | Yes | Retry with exponential backoff. If the issue persists, report the issue in [developer community](../feedback.md#report-issues). |
| 504 | | Gateway Timeout. | Yes | Retry with exponential backoff. If the issue persists, report the issue in [developer community](../feedback.md#report-issues). |

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

## Request headers of the bot

The current outgoing requests to the bot don't contain in the header or URL any information that helps bots route the traffic without unpacking the entire payload. The activities are sent to the bot through a URL similar to https://<your_domain>/api/messages. Requests are received to show the conversation ID and tenant ID in the headers.

### Request header fields

Two non-standard request header fields are added to all the requests sent to bots, for both asynchronous flow and synchronous flow. The following table provides the request header fields and their values:

| Field key | Value |
|----------------|-----------------|
| x-ms-conversation-id | The conversation ID corresponding to the request activity if applicable and confirmed or verified. |
| x-ms-tenant-id | The tenant ID corresponding to the conversation in the request activity. |

If the tenant or conversation ID isn't present in the activity or wasn't validated on the service side, the value is empty.

:::image type="content" source="../assets/images/bots/requestheaderfields.png" alt-text="Image shows header fields.":::

### Receive only at-mentioned messages

To enable your bots to get only those channel or chat messages where your bot is @mentioned, you must filter the messages. Use the following code snippet to enable your bot to receive only those messages where it's @mentioned:

```csharp
  app.OnMessage(async context =>
{
    if (!context.Activity.GetMentions().Any(mention => mention.Mentioned.Id.Equals(context.Activity.Recipient.Id, StringComparison.OrdinalIgnoreCase)))
    {
        return;
    }

    await context.Send("Using RSC the bot can receive messages across channels or chats in team without being @mentioned.");
});
```

If you want your bot to receive all messages, then you don't need to filter the @mention messages.

## Next step

[Channel and group chat conversations with a bot](how-to/conversations/channel-and-group-conversations.md)

## See also

- [Conversation events in your Teams bot](how-to/conversations/subscribe-to-conversation-events.md)
- [Structure conversations with sessions](how-to/conversations/agent-sessions.md)
