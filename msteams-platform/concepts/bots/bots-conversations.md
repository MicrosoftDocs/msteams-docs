---
title: Send and receive messages with a bot
description: Describes how to send and receive messages with bots in Microsoft Teams
keywords: teams bots messages
---

# Have a conversation with a Microsoft Teams bot

A conversation is a series of messages sent between your bot and one or more users. Bots in Microsoft Teams allow sending messages in either personal conversations with a single user (also known as one-on-one or 1:1 chats) or a group conversation in a Teams channel.

> [!NOTE]
> Bots in private group chats are currently not supported.

## Conversation basics

Each message is an `Activity` object. When a user sends a message, the channel on which she or he is communicating posts the message to your bot (web service). Your bot examines the message to determine its type and responds accordingly.

Most content sent between a user and your bot uses `messageType: message`. (For event-style messages, see [Handle bot events in Microsoft Teams](~/concepts/bots/bots-notifications). Speech is currently not supported.)

Basic conversation is handled through the Bot Framework Connector, a single REST API to enable your bot to communicate with Teams and other channels. The Bot Builder SDK provides easy access to this API, additional functionality to manage conversation flow and state, and simple ways to incorporate cognitive services such as natural language processing (NLP).

Your bot can send rich text, pictures, and cards. Users can send rich text and pictures to your bot. You can specify the type of content your bot can handle in the Microsoft Teams settings page for your bot.

| Format | From user to bot  | From bot to user |  Notes |
| --- | :---: | :---: | --- |
| Rich text | ✔ | ✔ |  |
| Pictures | ✔ | ✔ | Maximum 1024×1024 and 1 MB in PNG, JPEG, or GIF format; animated GIF not officially supported |
| Cards | ✖ | ✔ | Teams currently supports hero, thumbnail, and Office 365 Connector cards |
| Emojis | ✖ | ✔ | Teams currently supports emojis via UTF-16 (such as U+1F600 for grinning face) |

For more information on the types of bot interaction supported by the Bot Framework and therefore Microsoft Teams, see the Bot Framework documentation on [conversation flow](https://docs.microsoft.com/en-us/bot-framework/dotnet/bot-builder-dotnet-manage-conversation-flow) and related concepts in the documentation for [the Bot Builder SDK for .NET](https://docs.microsoft.com/en-us/bot-framework/dotnet/bot-builder-dotnet-concepts) and [the Bot Builder SDK for Node.js](https://docs.microsoft.com/en-us/bot-framework/nodejs/bot-builder-nodejs-concepts).

## Message format

You can set the optional [`TextFormat`](https://docs.microsoft.com/en-us/bot-framework/dotnet/bot-builder-dotnet-create-messages#customizing-a-message) property to control how your message's text content is rendered.

Microsoft Teams supports the following formatting options:

| TextFormat value | Description |
| --- | --- |
| plain | The text should be treated as raw text with no formatting applied at all |
| markdown | The text should be treated as Markdown formatting and rendered on the channel as appropriate; see [Formatting text content](#formatting-text-content) for supported styles |
| xml | The text is simple XML markup; see [Formatting text content](#formatting-text-content) for supported styles |

## Formatting text content

Microsoft Teams supports a subset of Markdown and XML (HTML) formatting tags.

Currently, the following limitations apply:

* Text-only messages do not support table formatting
* Rich cards support formatting in the text property only, not in the title or subtitle properties
* Rich cards do not support Markdown or table formatting

### Cross-platform support

To ensure that your formatting works across all platforms supported by Microsoft Teams, be aware that some styles are not currently supported across all platforms.

| Style                     | Text-only messages | Rich cards (XML only) |
| ---                       | :---: | :---: |
| bold                      | ✔ | ✖ |
| italic                    | ✔ | ✔ |
| header (levels 1&ndash;3) | ✖ | ✔ |
| strikethrough             | ✖ | ✔ |
| horizontal rule           | ✖ | ✖ |
| unordered list            | ✖ | ✔ |
| ordered list              | ✖ | ✔ |
| preformatted text         | ✔ | ✔ |
| blockquote                | ✔ | ✔ |
| hyperlink                 | ✔ | ✔ |
| image link                | ✔ | ✖ |

> [!NOTE]
> Currently, Connector cards support no formatting across all platforms. See [Cards](~/concepts/bots/bots-conversations#cards) in the next section for more detail.

### Support by individual platform

Support for text formatting varies by type of message and by platform.

#### Text-only messages

| Style                     | Desktop | iOS | Android | 
| ---                       | :---: | :---: | :---: |
| bold                      | ✔ | ✔ | ✔ |
| italic                    | ✔ | ✔ | ✔ |
| header (levels 1&ndash;3) | ✖ | ✖ | ✖ |
| strikethrough             | ✔ | ✔ | ✖ |
| horizontal rule           | ✖ | ✖ | ✖ |
| unordered list            | ✔ | ✖ | ✖ |
| ordered list              | ✔ | ✖ | ✖ |
| preformatted text         | ✔ | ✔ | ✔ |
| blockquote                | ✔ | ✔ | ✔ |
| hyperlink                 | ✔ | ✔ | ✔ |
| image link                | ✔ | ✔ | ✔ |

#### Cards

[!include[Formatting text content in cards](~/includes/bots/message-format-cards.html)]

\*Renders as bold

### Examples of text formatting

| Style | Example | Markdown | XML (HTML) |
| --- | --- | --- | --- |
| bold | **text** | `**text**` | `<strong>text</strong>` |
| italic | *text* | `*text*` | `<em>text</em>` |
| header (levels 1&ndash;3) | **Text** | `### Text` | `<h3>Text</h3>` |
| strikethrough | ~~text~~ | `~~text~~` | `<strike>text</strike>` |
| unordered list | <ul><li>text</li><li>text</li></ul> | `* text`<br>`* text` | `<ul><li>text</li><li>text</li></ul>` |
| ordered list | <ol><li>text</li><li>text</li></ol> | `1. text`<br>`2. text` | `<ol><li>text</li><li>text</li></ol>` |
| preformatted text | `text` | `` `text` `` | `<pre>text</pre>` |
| blockquote | <blockquote>text</blockquote> | `>text` | `<blockquote>text</blockquote>` |
| hyperlink | [Bing](https://www.bing.com/) | `[Bing](https://www.bing.com/)` | `<a href="https://www.bing.com/">Bing</a>` |
| image link | <img src="http://aka.ms/Fo983c" alt="Duck on a rock"></img> | `![Duck on a rock](http://aka.ms/Fo983c)` | `<img src="http://aka.ms/Fo983c" alt="Duck on a rock"></img>` |

## Picture messages

Pictures are sent by adding attachments to a message. You can find more information on attachments in the [Bot Framework documentation](https://docs.botframework.com/en-us/core-concepts/attachments/).

Pictures can be at most 1024×1024 and 1 MB in PNG, JPEG, or GIF format; animated GIF is not officially supported.

We recommend that you specify the height and width of each image by using XML. If you use Markdown, the image size defaults to 256×256. For example:

* Use `<img src="http://aka.ms/Fo983c" alt="Duck on a rock" height="150" width="223"></img>`
* Don't use `![Duck on a rock](http://aka.ms/Fo983c)`

## Receiving messages

Depending on which scopes are declared, your bot can receive messages in the following contexts:

* **1:1 chat**&emsp;Users can interact in a private conversation with a bot by simply selecting the added bot in the chat history, or typing its name or app ID in the To: box on a new chat.
* **Channels**&emsp;A bot can be mentioned ("@_botname_") in a channel if it has been added to the team. Note that additional replies to a bot in a channel require mentioning the bot&mdash;it will not respond to replies where it is not mentioned.

For incoming messages, your bot receives an [`Activity`](https://docs.microsoft.com/en-us/bot-framework/rest-api/bot-framework-rest-connector-activities) object of type `message`. Altough the `Activity` object can contain other types of information, like [channel updates](~/concepts/bots/bots-notifications#channel-updates) sent to your bot, the `message` type represents communication between bot and user.

Your bot receives a payload that contains the user message `Text` as well as other information about the user, the source of the message, and Teams information. Of note:

* `timestamp`&emsp;The date and time of the message in Coordinated Universal Time (UTC)
* `localTimestamp`&emsp;The date and time of the message in the time zone of the sender
* `channelId`&emsp;Always "msteams"
* `from.id`&emsp;A unique and encrypted ID for that user for your bot; suitable as a key if your app needs to store user data
* `channelData.tenant.id`&emsp;The tenant ID for the user.

> [!NOTE]
> `from.id` is unique for your bot and cannot be directly used outside your bot instance in any meaningful way to identify that user.

#### Full inbound schema example

```json
{
    "type": "message",
    "id": "1485983408511",
    "timestamp": "2017-02-01T21:10:07.437Z",
    "localTimestamp": "2017-02-01T14:10:07.437-07:00",
    "serviceUrl": "https://smba.trafficmanager.net/amer-client-ss.msg/",
    "channelId": "msteams",
    "from": {
        "id": "29:1XJKJMvc5GBtc2JwZq0oj8tHZmzrQgFmB39ATiQWA85gQtHieVkKilBZ9XHoq9j7Zaqt7CZ-NJWi7me2kHTL3Bw",
        "name": "Richard Moe"
    },
    "conversation": {
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
            "type": "clientInfo",
            "locale": "en-US",
            "country": "US",
            "platform": "Windows"
        }
    ],
    "channelData": {
        "tenant": {
            "id": "72f988bf-86f1-41af-91ab-2d7cd011db47"
        }
    }
}
```

> [!NOTE]
> The text field for inbound messages sometimes contains mentions. Be sure to properly check and strip those. For more information, see [Mentions](~/scenarios/bots-channel-conversations#mentions).

## Teams channel data

Teams-specific information is sent and received in the `channelData` object. A typical channelData in an activity sent to your bot contains the following information:

* `eventType`&emsp;Teams event type; passed only in cases of [channel modification events](~/concepts/bots/bots-notifications#channel-updates)
* `tenant.id`&emsp;Azure Active Directory tenant ID; passed in all contexts
* `team`&emsp;Passed only in channel contexts, not 1:1
    - `id`&emsp;GUID for the channel
    - `name`&emsp;Name of the team; passed only in cases of [team rename events](~/concepts/bots/bots-notifications#team-name-updates)
* `channel`&emsp;Passed only in channel contexts when the bot is mentioned or for events in channels in teams where the bot has been added
    - `id`&emsp;GUID for the channel
    - `name`&emsp;Channel name; passed only in cases of [channel modification events](~/concepts/bots/bots-notifications#channel-updates). 

> [!NOTE]
> The payload also contains `channelData.teamsTeamId` and `channelData.teamsChannelId` properties for backward compatibility. These properties are deprecated.

Please note that `channelData` should be used as the definitive source for team and channel IDs, which you can cache and use as keys for local storage.

#### Example channelData object (channelCreated event)

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

#### .NET example

The [Microsoft.Bot.Connector.Teams](https://www.nuget.org/packages/Microsoft.Bot.Connector.Teams) NuGet package provides a specialized `TeamsChannelData` object, which exposes properties to access Teams-specific information.

```csharp
TeamsChannelData channelData = activity.GetChannelData<TeamsChannelData>();
string tenantId = channelData.Tenant.Id;
```

## Replying to messages

To reply to an existing message, call [`ReplyToActivity`](https://docs.microsoft.com/en-us/bot-framework/dotnet/bot-builder-dotnet-connector#send-a-reply) in .NET or [`session.send`](https://docs.microsoft.com/en-us/bot-framework/nodejs/bot-builder-nodejs-use-default-message-handler) in Node.js. The Bot Builder SDK handles all the details.

If you choose to use the REST API, you can also call the [`/conversations/{conversationId}/activities/{activityId}`](https://docs.microsoft.com/en-us/bot-framework/rest-api/bot-framework-rest-connector-send-and-receive-messages#send-the-reply) endpoint.  

The message content itself can contain simple text or some of the Bot Framework&ndash;supplied [cards and card actions](~/concepts/cards-actions).

Please note that in your outbound schema you should always use the same `serviceUrl` as the one you received. Be aware that the value of `serviceUrl` tends to be stable but can change. When a new message arrives, your bot should verify its stored value of `serviceUrl`.

## Updating messages 

Rather than have your messages be static snapshots of data, your bot can now dynamically update messages inline after sending them to users. You can use dynamic message updates for scenarios such as poll updates, modifying available actions after a button press, or any other asynchronous state change.

The new message need not match the original in type. For instance, if the original message contained an attachment, the new message can be a simple text message.

> [!NOTE]
> Currently, you can update only content sent in single-attachment messages and carousel layouts. Posting updates to messages with multiple attachments in list layout will be supported soon.

### REST API

To issue a message update, simply perform a PUT request against the `/v3/conversations/<conversationId>/activities/<activityId>/` endpoint using a given activity ID. To complete this scenario, you should cache the activity ID returned by the original POST call.

```json
PUT /v3/conversations/19%3Aja0cu120i1jod12j%40skype.net/activities/012ujdo0128
{
    "type": "message",
    "text": "This message has been updated"
}
```

### .NET example

You can use the `UpdateActivityAsync` method in the Bot Builder SDK to update an existing message.

```csharp
public async Task<HttpResponseMessage> Post([FromBody]Activity activity)
{
  if (activity.Type == ActivityTypes.Message)
  {
    ConnectorClient connector = new ConnectorClient(new Uri(activity.ServiceUrl));
    Activity reply = activity.CreateReply($"You sent {activity.Text} which was {activity.Text.Length} characters");
    var msgToUpdate = await connector.Conversations.ReplyToActivityAsync(reply);
    Activity updatedReply = activity.CreateReply($"This is an updated message");
    await connector.Conversations.UpdateActivityAsync(reply.Conversation.Id, msgToUpdate.Id, updatedReply);
  }
}
```

### Node.js example

You can use the `session.connector.update` method in the Bot Builder SDK to update an existing message.

```js
function sendCardUpdate(bot, session, originalMessage, address) {
	
	var origAttachment = originalMessage.data.attachments[0];
	origAttachment.content.subtitle = 'Assigned to Larry Jin';

	var updatedMsg = new builder.Message()
		.address(address)
		.textFormat(builder.TextFormat.markdown)
		.addAttachment(origAttachment)
		.toMessage();

	session.connector.update(updatedMsg, function(err, addresses) {
		if (err) {
			console.log(`Could not update the message`);
		}
	});
}
```

## Creating a conversation

You can create a 1:1 conversation with a user or start a new reply chain in a channel for your team bot. This lets you to message your user or users without having them first initiate contact with your bot. For more information, see the following topics:

* [Starting a 1:1 conversation](~/scenarios/bots-personal-conversations#starting-a-11-conversation)
* [Creating a channel conversation](~/scenarios/bots-channel-conversations#creating-a-channel-conversation)

## Deleting messages

At this point, there is no way for you to delete messages via your bot. You can update content in your message (see [Updating messages](#updating-messages) earlier in this topic), but there is no platform support to delete messages from users or your bot.
