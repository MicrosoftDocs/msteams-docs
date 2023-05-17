---
title: Channel and Group chat conversations with bots
description: In this module, learn end-to-end scenario of having a conversation with a bot in a channel in Microsoft Teams
ms.localizationpriority: medium
ms.topic: conceptual
ms.date: 04/02/2023
---
# Channel and Group chat conversations with a Microsoft Teams bot

[!include[v3-to-v4-SDK-pointer](~/includes/v3-to-v4-pointer-bots.md)]

Microsoft Teams allows users to bring bots into their channel or group chat conversations. By adding a bot to a team or chat, all users of the conversation can take advantage of the bot functionality right in the conversation. You can also access Teams-specific functionality within your bot like querying team information and @mentioning users.

Chat in channels and group chats differs from personal chat in that the user needs to @mention the bot. If a bot is used in multiple scopes such as personal, group chat, or channel, you need to detect what scope the bot messages came from, and process them accordingly.

## Designing a great bot for channels or groups

Bots added to a team become another team member and can be @mentioned as part of the conversation. In fact, bots only receive messages when they're @mentioned, so other conversations on the channel aren't sent to the bot.

A bot in a group or channel should provide information relevant and appropriate for all members. While your bot can certainly provide any information relevant to the experience, keep in mind conversations with it are visible to everyone. Therefore, a great bot in a group or channel should add value to all users, and certainly not inadvertently share information more appropriate to a one-to-one conversation.

Your bot, just as it is, may be entirely relevant in all scopes without requiring more work. In Teams, there's no expectation that your bot function in all scopes, but you should ensure that your bot provides user value in whichever scope(s) you choose to support. For more information on scopes, see [Apps in Microsoft Teams](~/concepts/build-and-test/teams-developer-portal.md).

Developing a bot that works in groups or channels uses much of the same functionality as personal conversations. Additional events and data in the payload provide Teams group and channel information. Those differences, as well as key differences in common functionality are described in the following sections.

### Creating messages

For more information on bots creating messages in channels, see [Proactive messaging for bots](~/resources/bot-v3/bot-conversations/bots-conv-proactive.md), and specifically [Creating a channel conversation](~/resources/bot-v3/bot-conversations/bots-conv-proactive.md#creating-a-channel-conversation).

### Receiving messages

For a bot in a group or channel, in addition to the [regular message schema](https://docs.botframework.com/core-concepts/reference/#activity), your bot also receives the following properties:

* `channelData` See [Teams channel data](~/resources/bot-v3/bot-conversations/bots-conversations.md#teams-channel-data). In a group chat, contains information specific to that chat.
* `conversation.id` The reply chain ID, consisting of channel ID plus the ID of the first message in the reply chain.
* `conversation.isGroup` Is `true` for bot messages in channels or group chats.
* `conversation.conversationType` Either `groupChat` or `channel`.
* `entities` Can contain one or more mentions. For more information, see [Mentions](#-mentions).

### Replying to messages

To reply to an existing message, call [`ReplyToActivity`](/bot-framework/dotnet/bot-builder-dotnet-connector#send-a-reply) in .NET or [`session.send`](/bot-framework/nodejs/bot-builder-nodejs-use-default-message-handler) in Node.js. The Bot Builder SDK handles all the details.

If you choose to use the REST API, you can also call the [`/conversations/{conversationId}/activities/{activityId}`](/bot-framework/rest-api/bot-framework-rest-connector-send-and-receive-messages#send-the-reply) endpoint.

In a channel, replying to a message shows as a reply to the initiating reply chain. The `conversation.id` contains the channel and the top level message ID. Although the Bot Framework takes care of the details, you can cache that `conversation.id` for future replies to that conversation thread as needed.

### Best practice: Welcome messages in Teams

When your bot is first added to the group or team, it's useful to send a welcome message introducing the bot to all users. The welcome message should provide a description of the bot’s functionality and user benefits. Ideally the message should also include commands for the user to interact with the app. To do this, ensure that your bot responds to the `conversationUpdate` message, with the `teamsAddMembers` eventType in the `channelData` object. Be sure that the `memberAdded` ID is the bot's App ID itself, because the same event is sent when a user is added to a team. For more information, see [Team member or bot addition](~/resources/bot-v3/bots-notifications.md#team-member-or-bot-addition).

You might also want to send a personal message to each member of the team when the bot is added. To do this, you could [fetch the team roster](~/resources/bot-v3/bots-context.md#fetch-the-team-roster) and send each user a [direct message](~/resources/bot-v3/bot-conversations/bots-conv-proactive.md).

We recommend that your bot *not* send a welcome message in the following situations:

* The team is large (obviously subjective, for example, more than 100 members). Your bot may be seen as 'spammy' and the person who added it may get complaints unless you clearly communicate your bot's value proposition to everyone who sees the welcome message.
* Your bot is first mentioned in a group or channel, versus being first added to a team.
* A group or channel is renamed.
* A team member is added to a group or channel.

## @ Mentions

Because bots in a group or channel respond only when they're mentioned ("@*botname*") in a message, every message received by a bot in a group channel contains its own name, and you must ensure your message parsing handles that. In addition, bots can parse out other users mentioned and mention users as part of their messages.

### Retrieving mentions

Mentions are returned in the `entities` object in payload and contain both the unique ID of the user and, in most cases, the name of user mentioned. You can retrieve all mentions in the message by calling the `GetMentions` function in the Bot Builder SDK for .NET, which returns an array of `Mentioned` objects.

#### .NET example code: Check for and strip @bot mention

```csharp
Mention[] m = sourceMessage.GetMentions();
var messageText = sourceMessage.Text;

for (int i = 0;i < m.Length;i++)
{
    if (m[i].Mentioned.Id == sourceMessage.Recipient.Id)
    {
        //Bot is in the @mention list.
        //The below example will strip the bot name out of the message, so you can parse it as if it wasn't included. Note that the Text object will contain the full bot name, if applicable.
        if (m[i].Text != null)
            messageText = messageText.Replace(m[i].Text, "");
    }
}
```

> [!NOTE]
> You can also use the Teams extension function `GetTextWithoutMentions`, which strips out all mentions, including the bot.

#### Node.js example code: Check for and strip @bot mention

```javascript
var text = message.text;
if (message.entities) {
    message.entities
        .filter(entity => ((entity.type === "mention") && (entity.mentioned.id.toLowerCase() === botId)))
        .forEach(entity => {
            text = text.replace(entity.text, "");
        });
    text = text.trim();
}
```

You can also use the Teams extension function `getTextWithoutMentions`, which strips out all mentions, including the bot.

### Constructing mentions

#### User mention

Your bot can mention other users in messages posted into channels. To do this, your message must do the following:

* Include `<at>@username</at>` in the message text.
* Include the `mention` object inside the entities collection.

# [.NET](#tab/dotnet)

This example uses the [Microsoft.Bot.Connector.Teams](https://www.nuget.org/packages/Microsoft.Bot.Connector.Teams) NuGet package.

```csharp
// Create reply activity
Activity replyActivity = activity.CreateReply();

// Construct text of the form @sender Hello
replyActivity.Text = "Hello ";
replyActivity.AddMentionToText(activity.From, MentionTextLocation.AppendText);

// Send the reply activity
await client.Conversations.ReplyToActivityAsync(replyActivity);
```

# [Node.js](#tab/nodejs)

```javascript
// User to mention
var toMention: builder.IIdentity = {
    name: 'John Doe',
    id: userId
};

// Create a message and add mention to it
var msg = new teams.TeamsMessage(session).text(teams.TeamsMessage.getTenantId(session.message));
var mentionedMsg = msg.addMentionToText(toMention);

// Post the message
var generalMessage = mentionedMsg.routeReplyToGeneralChannel();
session.send(generalMessage);
```

---

**Example: Outgoing message with user mentioned**

```json
{
    "type": "message", 
    "text": "Hey <at>Pranav Smith</at> check out this message",
    "timestamp": "2017-10-29T00:51:05.9908157Z",
    "localTimestamp": "2017-10-28T17:51:05.9908157-07:00",
    "serviceUrl": "https://skype.botframework.com",
    "channelId": "msteams",
    "from": {
        "id": "28:9e52142b-5e5e-4d7b-bb3e- e82dcf620000",
        "name": "SchemaTestBot"
    },
    "conversation": {
        "id": "19:aebd0ad4d6ab42c8b9ed19c251c2fc37@thread.skype;messageid=1481567603816"
    },
    "recipient": {
        "id": "8:orgid:6aebbad0-e5a5-424a-834a-20fb051f3c1a",
        "name": "stlrgload100"
    },
    "attachments": [
        {
            "contentType": "image/png",
            "contentUrl": "https://upload.wikimedia.org/wikipedia/en/a/a6/Bender_Rodriguez.png",
            "name": "Bender_Rodriguez.png"
        }
    ],
    "entities": [
        {
            "type":"mention",
            "mentioned":{
                "id":"29:08q2j2o3jc09au90eucae",
                "name":"Pranav Smith"
            },
            "text": "<at>@Pranav Smith</at>"
        }
    ],
    "replyToId": "3UP4UTkzUk1zzeyW"
}
```

#### Tag mention

Your bot can mention tags in messages posted into channels. When the bot @mentions the tag in a channel, the tag is highlighted and the people associated with the tag get notified. When a user hovers over the tag, a pop-up appears with the tag details.

> [!NOTE]
>
> * Tag mentions are supported in Teams desktop and web clients.
> * Tag mentions aren't supported in shared and private channels.
> * Tag mentions are supported only in text messages and Adaptive Cards.

##### Pre-requisite

Get a list of the tags available in the channel using the [List teamworkTags](/graph/api/teamworktag-list?view=graph-rest-1.0&tabs=http&preserve-view=true) API.

##### Mention tags in a text message

In the `mention.properties` object, add the property `'type': 'tag'`. If the property `'type': 'tag'` isn't added, the bot treats the mention as a user mention.

Example:

```javascript
​var mention = new ChannelAccount(tagId, "Test Tag"); 
​mention.Properties = JObject.Parse("{'type': 'tag'}"); 
​var mentionObj = new Mention 
​{ 
​    Mentioned = mention, 
​    Text = "<at>Test Tag</at>" 
​}; 

​var replyActivity = MessageFactory.Text("Hello " + mentionObj.Text); 
​replyActivity.Entities = new List<Microsoft.Bot.Schema.Entity> { mentionObj }; 
​await turnContext.SendActivityAsync(replyActivity, cancellationToken); 
```

##### Mention tags in an Adaptive Card

In the `mentioned` object, add the property `"type": "tag"` in the Adaptive Card schema.  If the property `"type": "tag"` isn't added, the bot treats the mention as a user mention.

Example:

```json
​{ 
​    "type": "mention", 
    ​"text": "<at>my tag</at>", 
​    "mentioned": { 
            ​"id": "base64 encoded id" ,// tag graph 64 base id
​            "name": "my tag", 
            ​"type": "tag" 
​    } 
​} 
```

###### Query Parameters

|Name |Description |
|---------|----------------|
|`type`| The type of mention. The supported type is `tag`. The tag format is  base 64 encoded id​. For example, `NTI4ZGJlM2YtMTVlMC00ZTM3LTg0YTEtMDBjYzMwNTg0N2RkIyNlYzgwMTVmMC1iMmYxLTQxZTItODA0OC1hMGE2OTcwNmM5ZGIjI3RxRE04YndyVQ==​`.

###### Error code

| Status code | Error code | Message values | Retry request | Developer action|
|----------------|-----------------|-----------------|----------------|----------------|
| 400 | **Code**: `Bad Request` | ​Mentioned Tag with id {id string} does not exist in current Team<br/>​Tag can only be mentioned in Channel<br/>Invalid mentioned tag because no tag exists in the team| No | Reevaluate request payload for errors. Check returned error message for details. |
| 502 | **Code**: `Bad Gateway` | Invalid team group Id<br/> ​Malformed tenant id for the tag<br/> ​Mention Id cannot be resolved | Yes |Retry with exponential backoff.|

##### Throttling limits

Any request can be evaluated against multiple limits, depending on the scope, the window type (short and long), number of tags per message and other factors. The first limit to be reached triggers throttling behavior.

Ensure that you don't exceed the throttling limits to avoid heavy traffic to the notification service and  the IC3 service. For example, A bot can send only two messages with tags mention in a five second window and each message can have only up to 10 tags.

The following table lists the throttling limits for tag mentions in a bot:

|​Scope   |​Window Type  |Number of Tags per message  |​Time windows (sec)  |​Maximum number of messages per time window  |
|------------------------|------------|-----------|----------|----------|
|​Per bot per thread     |   ​Short     |    10     |     5    |     2    |
|&nspb                  |   ​Long      |    10     |     60   |     5    |
|​All bots per thread    |   ​Short     |    10     |     5    |     4    |
|&nspb                  |  Long       |    10     |     60   |     5    |

## Accessing groupChat or channel scope

Your bot can do more than send and receive messages in groups and teams. For instance, it can also fetch the list of members, including their profile information, and the list of channels. For more information, see [Get context for your Microsoft Teams bot](~/resources/bot-v3/bots-context.md).

## See also

[Bot Framework samples](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/README.md).
