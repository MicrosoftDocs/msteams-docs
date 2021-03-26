---
title: Conversation basics
description: describes ways to have a conversation with a Microsoft Teams bot
ms.topic: overview
ms.author: anclear
keyword: conversations basics receive message send message picture message channel data adaptive cards
---

# Conversation basics

[!INCLUDE [pre-release-label](~/includes/v4-to-v3-pointer-bots.md)]

A conversation is a series of messages sent between your Microsoft Teams bot and one or more users. There are three types of conversations, also called scopes in Teams:

| Conversation type | Description |
| ------- | ----------- |
| `teams` | This conversation type is also called channel conversations, visible to all members of the channel. |
| `personal` | This conversation type includes conversations between bots and a single user. |
| `groupChat` | This conversation type includes chat between a bot and two or more users. It also enables your bot in meeting chats. |

A bot behaves differently depending on the conversation it is involved in:

* Bots in channel and group chat conversations require the user to @ mention the bot to invoke it in a channel.
* Bots in a one-to-one conversation do not require an @ mention. All messages sent by the user routes to your bot.

For the bot to work in a particular conversation or scope, add support to that scope in the [app manifest](~/resources/schema/manifest-schema.md).

## Messages in bot conversations

Each message in a conversation is an `Activity` object of type `messageType: message`. When a user sends a message, Teams posts the message to your bot. Teams sends a JSON object to your bot's messaging endpoint. Your bot examines the message to determine its type and responds accordingly.

Basic conversations are handled through the Bot Framework connector, a single REST API. This API enables your bot to communicate with Teams and other channels. The Bot Builder SDK provides the following:

* Easy access to the Bot Framework connector.
* Additional functionality to manage conversation flow and state.
* Simple ways to incorporate cognitive services such as Natural Language Processing (NLP).

Your bot receives messages from Teams using the `Text` property and it sends single or multiple message responses to the users.

## Receive a message

To receive a text message, use the `Text` property of the `Activity` object. In the bot's activity handler, use the turn context object's `Activity` to read a single message request.

The following code shows an example of receiving a message:

# [C#](#tab/dotnet)

```csharp
protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
{
  await turnContext.SendActivityAsync(MessageFactory.Text($"Echo: {turnContext.Activity.Text}"), cancellationToken);
}

```

# [TypeScript](#tab/typescript)

```typescript

export class MyBot extends TeamsActivityHandler {
    constructor() {
        super();
        this.onMessage(async (context, next) => {
            await context.sendActivity(`Echo: '${context.activity.text}'`);
            await next();
        });
    }
}

```

# [Python](#tab/python)

<!-- Verify -->
```python

async def on_message_activity(self, turn_context: TurnContext):
    return await turn_context.send_activity(MessageFactory.text(f"Echo: {turn_context.activity.text}"))

```

# [JSON](#tab/json)

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
    "text": "Hello Teams TestBot",
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

## Send a message

To send a text message, specify the string you want to send as the activity. In the bot's activity handler, use the turn context object's `SendActivityAsync` method to send a single message response. Use the object's `SendActivitiesAsync` method to send multiple responses at once. The following code shows an example of sending a message when a user is added to a conversation:

The following code shows an example of sending a message:

# [C#](#tab/dotnet)

```csharp
protected override async Task OnMembersAddedAsync(IList<ChannelAccount> membersAdded, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
{
  await turnContext.SendActivityAsync(MessageFactory.Text($"Hello and welcome!"), cancellationToken);
}

```

# [TypeScript](#tab/typescript)

```typescript

export class MyBot extends TeamsActivityHandler {
    constructor() {
        super();
        this.onMessage(async (context, next) => {
            await context.sendActivity('Hello and welcome!');
            await next();
        });
    }
}
```

# [Python](#tab/python)

<!-- Verify -->

```python

async def on_members_added_activity(
    self, members_added: [ChannelAccount], turn_context: TurnContext
):
    for member in teams_members_added:
        await turn_context.send_activity(f"Welcome your new team member {member.id}")
    return

```

# [JSON](#tab/json)

```json
{
    "text": "hi",
    "textFormat": "plain",
    "type": "message",
    "timestamp": "2019-10-31T20:57:27.2347285Z",
    "localTimestamp": "2019-10-31T13:57:27.2347285-07:00",
    "id": "1572555447214",
    "channelId": "msteams",
    "serviceUrl": "https://smba.trafficmanager.net/amer/",
    "from": {
        "id": "29:1Xv-kvy4dKirR0rZfSF_kAVUzotoT1SXuEzkC9XGkuZng8YBw8qyu5uh4128fQRjlGgvEiRLx-0XP4KYMwcgdZw",
        "name": "Jane Doe",
        "aadObjectId": "df486eae-88fd-42a5-b45e-c581588186db"
    },
    "conversation": {
        "conversationType": "personal",
        "tenantId": "72f988bf-86f1-41af-91ab-2d7cd011db47",
        "id": "a:1oAmWTVBBe9E0JrpGxauqNyx4CCE_iQf2ZuWon9D42722Fon3wYIpbhgbRChE3wgVS1Gwl9zS1pZy4FSu6-x1vGEq5KBQK-EbBgyPyeP_C-lbLBY3vxnGk9m9D_282jbg"
    },
    "recipient": {
        "id": "28:5baea8d1-d4ea-43a1-b101-882f4c8d9cb4",
        "name": "Imported Bot"
    },
    "entities": [
        {
            "locale": "en-US",
            "country": "US",
            "platform": "Windows",
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
> Message splitting occurs when a text message and an attachment are sent in the same activity payload. This activity is split into separate activities by Microsoft Teams, one with just a text message and the other with an attachment. As the activity is split, you do not receive the message ID in response, which is used to [update or delete](~/bots/how-to/update-and-delete-bot-messages.md) the message proactively. It is recommended to send separate activities instead of depending on message splitting.

Messages sent between users and bots include internal channel data within the message. This data allows the bot to communicate properly on that channel. The Bot Builder SDK allows you to modify the message structure.

## Teams channel data

The `channelData` object contains Teams-specific information and is a definitive source for team and channel IDs. You must cache and use these IDs as keys for local storage. The `TeamsActivityHandler` in the SDK typically pulls out important information from the `channelData` object to make it easily accessible. However, you can always access the original data from the `turnContext` object.

The `channelData` object is not included in messages in personal conversations, as these take place outside of a channel.

A typical `channelData` object in an activity sent to your bot contains the following information:

* `eventType`: Teams event type passed only in cases of [channel modification events](~/bots/how-to/conversations/subscribe-to-conversation-events.md).
* `tenant.id`: Azure Active Directory tenant ID passed in all contexts.
* `team`: Passed only in channel contexts, not in personal chat.
  * `id`: GUID for the channel.
  * `name`: Name of the team passed only in cases of [team rename events](~/bots/how-to/conversations/subscribe-to-conversation-events.md).
* `channel`: Passed only in channel contexts when the bot is mentioned or for events in channels in teams where the bot has been added.
  * `id`: GUID for the channel.
  * `name`: Channel name passed only in cases of [channel modification events](~/bots/how-to/conversations/subscribe-to-conversation-events.md).
* `channelData.teamsTeamId`: Deprecated. This property is only included for backward compatibility.
* `channelData.teamsChannelId`: Deprecated. This property is only included for backward compatibility.

### Example channelData object (channelCreated event)

The following code shows an example of channelData object:

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

Messages received from or sent to your bot can include different types of message content.

## Message content

Your bot can send rich text, pictures, and cards. Users can send rich text and pictures to your bot.

| Format    | From user to bot | From bot to user | Notes                                                                                   |
|-----------|------------------|------------------|-----------------------------------------------------------------------------------------|
| Rich text | ✔                | ✔                |                                                                                         |
| Pictures  | ✔                | ✔                | Maximum 1024×1024 and 1 MB in PNG, JPEG, or GIF format. Animated GIF is not supported.  |
| Cards     | ✖                | ✔                | See the [Teams card reference](~/task-modules-and-cards/cards/cards-reference.md) for supported cards. |
| Emojis    | ✖                | ✔                | Teams currently supports emojis through UTF-16, such as U+1F600 for grinning face. |

You can also add notifications to your message using the `Notification.Alert` property.

## Notifications to your message

Notifications alert users about new tasks, mentions, and comments. These alerts are related to what users are working on or what they must look at by inserting a notice into their activity feed. For notifications to trigger from your bot message, set the `TeamsChannelData` objects `Notification.Alert` property to true. Whether or not a notification is raised depends on the individual user's Teams settings and you cannot override these settings. The notification type is either a banner or both a banner and an email.

The following code shows an example of adding notifications to your message:

# [C#](#tab/dotnet)

```csharp
protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
{
  var message = MessageFactory.Text("You'll get a notification, if you've turned them on.");
  message.TeamsNotifyUser();

  await turnContext.SendActivityAsync(message);
}
```

# [TypeScript](#tab/typescript)

```typescript
this.onMessage(async (turnContext, next) => {
    let message = MessageFactory.text("You'll get a notification, if you've turned them on.");
    teamsNotifyUser(message);

    await turnContext.sendActivity(message);

    // By calling next() you ensure that the next BotHandler is run.
    await next();
});
```

# [Python](#tab/python)

```python

async def on_message_activity(self, turn_context: TurnContext):
    message = MessageFactory.text("You'll get a notification, if you've turned them on.")
    teams_notify_user(message)

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

To enhance your message, you can include pictures as attachments to that message.

## Picture messages

Pictures are sent by adding attachments to a message. For more information on attachments, see [Bot Framework documentation](/azure/bot-service/dotnet/bot-builder-dotnet-add-media-attachments).

Pictures can be at most 1024×1024 and 1 MB in PNG, JPEG, or GIF format. Animated GIF is not supported.

Specify the height and width of each image by using XML. In markdown, the image size defaults to 256×256. For example:

* Use - `<img src="http://aka.ms/Fo983c" alt="Duck on a rock" height="150" width="223"></img>`
* Don't use - `![Duck on a rock](http://aka.ms/Fo983c)`

A conversational bot can include adaptive cards that simplify business workflows. Adaptive cards offer rich customizable text, speech, images, buttons, and input fields.

## Adaptive cards

Adaptive cards can be authored in a bot and shown in multiple apps such as Teams, your website, and so on. For more information, see [adaptive cards](~/task-modules-and-cards/cards/cards-reference.md#adaptive-card).

The following code shows an example of sending a simple adaptive card:

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

To know more about cards and cards in bots, see [cards documentation](~/task-modules-and-cards/what-are-cards.md).

The next section provides status code responses for errors generated from Bot APIs.

## Status code responses

The following image shows a sample 403 status code response:

![Sample 403 response](~/assets/images/sample403response.png)

Following are the status codes and their error code and message values:

| Status code | Error code and message values | Description |
|----------------|-----------------|-----------------|
| 403 | **Code**: `ConversationBlockedByUser` <br/> **Message**: User blocked the conversation with the bot. | User blocked the bot in 1:1 chat or a channel through moderation settings. |
| 403 | **Code**: `BotNotInConversationRoster` <br/> **Message**: The bot is not part of the conversation roster. | The bot is not part of the conversation. |
| 403 | **Code**: `BotDisabledByAdmin` <br/> **Message**: The tenant admin disabled this bot. | Tenant blocked the bot. |
| 401 | **Code**: `BotNotRegistered` <br/> **Message**: “No registration found for this bot” | The registration for this bot was not found. |
| 412 | **Code**: `PreconditionFailed` <br/> **Message**: “Precondition failed, please try again.” | A precondition failed on one of our dependencies due to multiple concurrent operations on the same conversation. |
| 404 | **Code**: `ConversationNotFound` <br/> **Message**: “Conversation not found.” | The conversation was not found. |
| 413 | **Code**: `MessageSizeTooBig` <br/> **Message**: “Message size too large.” | The size on the incoming request was too large. |
| 429 | **Code**: `Throttled` <br/> **Message**: “Too many requests.” Also returns when to retry after. | Too many requests were sent by the bot. |

The next section illustrates a simple code sample that incorporates basic conversational flow into a Teams application.

## Code sample

Following are the code samples for Teams conversation bot:

|Sample name | Description | .NETCore | Node.js | Python |
|----------------|-----------------|--------------|----------------|-----------|
| Teams conversation bot | Messaging and conversation event handling. |[View](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/csharp_dotnetcore/57.teams-conversation-bot)|[View](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/javascript_nodejs/57.teams-conversation-bot)| [View](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/python/57.teams-conversation-bot) |

## Next steps

* [Sending proactive messages](~/bots/how-to/conversations/send-proactive-messages.md)
* [Subscribe to conversation events](~/bots/how-to/conversations/subscribe-to-conversation-events.md)
