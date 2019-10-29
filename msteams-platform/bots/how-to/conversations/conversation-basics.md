---
title: Conversation basics
author: clearab
description: How to have a conversation with a Microsoft Teams bot
ms.topic: overview
ms.author: anclear
---
# Conversation basics

[!INCLUDE [pre-release-label](~/includes/v4-to-v3-pointer-bots.md)]

A conversation is a series of messages sent between your bot and one or more users. There are three kinds of conversations (also called scopes) in Teams:

* `teams` Also called channel conversations, visible to all members of the channel.
* `personal` Conversations between bots and a single user.
* `groupChat` Chat between a bot and two or more users. Also enables your bot in meeting chats.

A bot behaves slightly differently depending on what kind of conversation it is involved in:

* [Bots in channel and group chat conversations](~/bots/how-to/conversations/channel-and-group-conversations.md) require the user to @ mention the bot to invoke it in a channel.
* Bots in a one-to-one conversation do not require an @ mention. All messages sent by the user will be routed to your bot.

To enable your bot in a particular scope, add that scope to your app manifest. Scopes are defined and discussed further in the [manifest reference](~/resources/schema/manifest-schema.md).

## Activities

Each message is an `Activity` object of type `messageType: message`. When a user sends a message, Teams posts the message to your bot; specifically, it sends a JSON object to your bot's messaging endpoint. Your bot examines the message to determine its type and responds accordingly.

Bots also support event-style messages. See [subscribe to conversation events](~/bots/how-to/conversations/subscribe-to-conversation-events.md) for more details.

Basic conversation is handled through the Bot Framework Connector, a single REST API to enable your bot to communicate with Teams and other channels. The Bot Builder SDK provides easy access to this API, additional functionality to manage conversation flow and state, and simple ways to incorporate cognitive services such as natural language processing (NLP).

## Message content

Your bot can send rich text, pictures, and cards. Users can send rich text and pictures to your bot.

| Format    | From user to bot | From bot to user | Notes                                                                                   |
|-----------|------------------|------------------|-----------------------------------------------------------------------------------------|
| Rich text | ✔                | ✔                |                                                                                         |
| Pictures  | ✔                | ✔                | Maximum 1024×1024 and 1 MB in PNG, JPEG, or GIF format; animated GIF are not supported  |
| Cards     | ✖                | ✔                | See the [Teams Card Reference](~/concepts/cards/cards-reference.md) for supported cards |
| Emojis    | ✖                | ✔                | Teams currently supports emojis via UTF-16 (such as U+1F600 for grinning face)          |

## Picture messages

Pictures are sent by adding attachments to a message. You can find more information on attachments in the [Bot Framework documentation](/azure/bot-service/dotnet/bot-builder-dotnet-add-media-attachments?view=azure-bot-service-3.0).

Pictures can be at most 1024×1024 and 1 MB in PNG, JPEG, or GIF format; animated GIF is not supported.

We recommend that you specify the height and width of each image by using XML. If you use Markdown, the image size defaults to 256×256. For example:

* Use - `<img src="http://aka.ms/Fo983c" alt="Duck on a rock" height="150" width="223"></img>`
* Don't use - `![Duck on a rock](http://aka.ms/Fo983c)`

## Receive a message

To receive a text message, use the `Text` property of the `Activity` object. In the bot's activity handler, use the turn context object's `Activity` to read a single message request.

The code below shows an example.

# [C#/.NET](#tab/dotnet)

```csharp
protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
{
  await turnContext.SendActivityAsync(MessageFactory.Text($"Echo: {turnContext.Activity.Text}"), cancellationToken);
}

```

# [TypeScript/Node.js](#tab/typescript)

```typescript
protected async onMessageActivity(context: TurnContext): Promise<void> {
    await context.sendActivity(`Echo: "${ context.activity.text }"`);
    await next();
}

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

* * *

## Send a message

To send a text message, specify the string you want to send as the activity. In the bot's activity handlers, use the turn context object's `SendActivityAsync` method to send a single message response. You can also use the object's `SendActivitiesAsync` method to send multiple responses at once. The code below shows an example of sending a message when someone is added to a conversation  

# [C#/.NET](#tab/dotnet)

```csharp
protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
{
  await turnContext.SendActivityAsync(MessageFactory.Text($"Hello and welcome!"), cancellationToken);
}
```

# [TypeScript/Node.js](#tab/typescript)

```typescript
protected async onMessageActivity(context: TurnContext): Promise<void> {
    await context.sendActivity('Hello and welcome!');
}

```

# [JSON](#tab/json)
```json

```
* * *

## Teams channel data

The `channelData` object contains Teams-specific information and is the definitive source for team and channel IDs. You may need to cache and use these ids as keys for local storage. The `TeamsActivityHandler` in the SDK will typically pull out important information from the `channelData` object to make it more easily accessible, however you can always access the original information from the `turnContext` object.

The `channelData` object is not included in messages in personal conversations since these take place outside of any channel.

A typical channelData object in an activity sent to your bot contains the following information:

* `eventType` Teams event type; passed only in cases of [channel modification events](~/bots/bots-notifications.md#channel-updates)
* `tenant.id` Azure Active Directory tenant ID; passed in all contexts
* `team` Passed only in channel contexts, not in personal chat.
  * `id` GUID for the channel
  * `name` Name of the team; passed only in cases of [team rename events](~/concepts/bots/bots-notifications.md#team-name-updates)
* `channel` Passed only in channel contexts when the bot is mentioned or for events in channels in teams where the bot has been added
  * `id` GUID for the channel
  * `name` Channel name; passed only in cases of [channel modification events](~/concepts/bots/bots-notifications.md#channel-updates).
* `channelData.teamsTeamId` Deprecated. This property is included only for backwards compatibility.
* `channelData.teamsChannelId` Deprecated. This property is included only for backwards compatibility.

### Example channelData object (channelCreated event)

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

## Additional resources

* Inside the bots - [How bots work](https://docs.microsoft.com/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0&tabs=csharp)
* Conversations and messages in Teams - [Have a conversation with a Microsoft Teams bot](../../../_old/concepts/bots/bot-conversations/bots-conversations.md)
* Activity processing in general - [activity processing](https://docs.microsoft.com/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0&tabs=csharp#the-activity-processing-stack)
* Formatting - [message activity section](https://aka.ms/botSpecs-activitySchema#message-activity)

## Next steps

* [Sending proactive messages](send-proactive-messages.md)
* [Subscribe to conversation events](subscribe-to-conversation-events.md)