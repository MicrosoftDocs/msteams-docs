---
title: Channel/Group Conversation Chat Bot
description: Learn how to work with user mentions, send messages, and handle bot installation in channel and group chats using the Teams SDK.
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: nickwalk
ms.owner: angovil
ms.date: 06/19/2026
---
# Channel and group chat conversations with a bot

<!-- [!INCLUDE [pre-release-label](~/includes/v4-to-v3-pointer-bots.md)] -->

This article focuses on bot conversations in teams and group chats, not in personal (1:1) chats.

## Install your bot in teams and group chats

To install the Microsoft Teams bot in a team or group chat, add the `teams` or `groupchat` scope to your bot. This allows all members of the conversation to interact with your bot. After the bot is installed, it has access to metadata about the conversation, such as the list of conversation members. Also, when it's installed in a team, the bot has access to details about that team and the full list of channels.

By default, bots in group chats and channels only receive messages when they're directly @mentioned. They don't receive other messages sent to the conversation. For example, your bot doesn't receive a message when the team or channel is mentioned, or when someone replies to a message from your bot without @mentioning it. The Teams SDK provides a dedicated `mention` activity route to handle @mention events.

> [!NOTE]
>
> * Using resource-specific consent (RSC), a bot can receive all channel and group chat messages in conversations where it's installed without being @mentioned. For more information, see [receive all messages for bots and agents](channel-messages-for-bots-and-agents.md).
> * Private channel support for bot apps is limited. You can add bot-enabled apps in private channels where private channel app support is enabled, but bots can't post messages or Adaptive Cards in private channel conversations. For private and shared channel app support details, see [apps for shared and private channels](~/build-apps-for-shared-private-channels.md).

See the following video to learn about channel and group chat conversations with a bot:
<br>

> [!VIDEO a22d3980-2cf0-45fe-89a2-02a13cf8640e]
<br>

## Design guidelines

In group chats and channels, design your bot for collaborative conversations with clear value, concise responses, and minimal noise. For more information on how to design bots in Teams, see [how to design bot conversations in channels and chats](~/bots/design/bots.md).

## Send a message on installation

When your bot is first added to a group or team, you can send an introduction message by using the `install.add` lifecycle route. For more information, see [proactive messaging](/microsoftteams/platform/teams-sdk/essentials/sending-messages/proactive-messaging).

If you send an introduction message, include a brief description of the bot's features and how to use them.

You can also store the `conversationId` during installation to enable [proactive messaging](/microsoftteams/platform/teams-sdk/essentials/sending-messages/proactive-messaging) later.

The following code shows an example of sending welcome messages on installation:

# [C#](#tab/dotnet2)

```csharp
app.OnInstall(async context => 
{ 
    await context.Send("Hello! I'm your bot. Here's what I can do..."); 
}); 

```

# [TypeScript](#tab/typescript2)

```typescript
app.on('install.add', async ({ send }) => 
{ 
    await send('Hello! I\'m your bot. Here\'s what I can do...'); 
}); 

```

# [Python](#tab/python2)

```python
@app.on_install_add 
async def handle_install_add(ctx: ActivityContext[InstalledActivity]): 
    await ctx.send("Hello! I'm your bot. Here's what I can do...") 

```

* * *

Don't send proactive welcome messages to users individually when the bot is installed in a team or group chat. If you send a welcome message, post it in the installed conversation and mention the person who added the bot.

>[!NOTE]
> Ensure that the message sent by the bot is relevant and adds value to the initial message and doesn't spam the users.

Don't send a message in the following cases:

* When the team is large, for example, larger than 100 members. Your bot can be seen as spam and the person who added it can get complaints. You must clearly communicate your bot's value proposition to everyone who sees the welcome message.
* Your bot is first mentioned in a group or channel instead of being first added to a team.
* A group or channel is renamed.
* A team member is added to a group or channel.

[!INCLUDE [sample](~/includes/bots/teams-bot-samples.md)]

## Work with mentions

In group chats and channels, messages that @mention your bot include a mention entity in the message text. If your bot is configured to receive all messages, such as with RSC, some incoming messages might not include an @mention. Your bot can retrieve other users mentioned in a message and add mentions to messages it sends. Bots in group chats enable user mentions using `@mention`; however, they don’t support `@everyone` for mentions.

For messages that include @mentions, the message text contains mention markup such as `<at>@botname</at>`.

### Retrieve mentions

Mentions are returned in the `entities` object in the activity payload and contain both the unique ID of the user and the name of the user mentioned. The text of the message also includes the mention, such as `<at>@John Smith<at>`. However, don't rely on the text in the message to retrieve any information about the user. It's possible for the person sending the message to alter it. Therefore, use the `entities` object.

You can retrieve all mentions in the message by filtering the `entities` array in the activity for entries with `type` set to `mention`.

The following code shows an example of retrieving mentions:

# [C#](#tab/dotnet)

```csharp
app.OnMessage(async context =>
{
    var mentions = context.Activity.Entities?
        .Where(e => e.Type == "mention")
        .ToList();

    if (mentions != null && mentions.Any())
    {
        var firstMention = mentions[0].Properties["mentioned"]?["name"]?.ToString();
        await context.Send($"Hello {firstMention}");
    }
    else
    {
        await context.Send("Aw, no one was mentioned.");
    }
});

```

# [TypeScript](#tab/typescript)

```typescript
app.on('message', async ({ activity, send }) => {
    const mentions = activity.entities?.filter(e => e.type === 'mention');

    if (mentions && mentions.length > 0) {
        const firstMention = mentions[0].mentioned;
        await send(`Hello ${firstMention.name}.`);
    } else {
        await send('Aw, no one was mentioned.');
    }
});

```

# [JSON](#tab/json)

```json
{
    "type": "message",
    "text": "Hey <at>Pranav Smith</at> check out this message",
    "timestamp": "2017-10-29T00:51:05.9908157Z",
    "localTimestamp": "2017-10-28T17:51:05.9908157-07:00",
    "serviceUrl": "https://skype.botframework.com",
    "channelId": "msteams",
    "from": {
        "id": "29:9e52142b-5e5e-4d7b-bb3e-e82dcf620000",
        "name": "Jane Smith"
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

# [Python](#tab/python)

```python
@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    mentions = [e for e in (ctx.activity.entities or []) if e.type == "mention"]

    if mentions:
        first_mention = mentions[0].mentioned
        await ctx.send(f"Hello {first_mention.name}")
    else:
        await ctx.send("Aw, no one was mentioned.")

```

* * *

### Add mentions to your messages

Your bot can mention other users in messages posted in channels. The Teams SDK provides the `AddMention` method on `MessageActivity` to include user mentions in your messages.

The following code shows an example of adding mentions to your messages:

# [C#](#tab/dotnet1)

```csharp
app.OnMessage(async context =>
{
    await context.Send(new MessageActivity($"Hello!").AddMention(context.Activity.From));
});

```

# [TypeScript](#tab/typescript1)

```typescript
app.on('message', async ({ send, activity }) => {
    await send(new MessageActivity('Hello!').addMention(activity.from));
});

```

# [JSON](#tab/json1)

The `text` field in the object in the `entities` array must match a portion of the message `text` field. If it doesn't, the mention is ignored.

```json
{
    "type": "message",
    "text": "Hey <at>Pranav Smith</at> check out this message",
    "timestamp": "2017-10-29T00:51:05.9908157Z",
    "localTimestamp": "2017-10-28T17:51:05.9908157-07:00",
    "serviceUrl": "https://skype.botframework.com",
    "channelId": "msteams",
    "from": {
        "id": "29:9e52142b-5e5e-4d7b-bb3e-e82dcf620000",
        "name": "Jane Smith"
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

# [Python](#tab/python1)

```python
@app.on_message 
async def handle_message(ctx: ActivityContext[MessageActivity]): 
    await ctx.send(MessageActivityInput(text="Hello!").add_mention(account=ctx.activity.from_))

```

* * *

You can also mention users by their Microsoft Entra Object ID or User Principal Name (UPN), and mention tags in channel messages.

##### Support for Microsoft Entra Object ID and UPN in user mention

[!INCLUDE [<User Mention>](../../../includes/bots/user-mention.md)]

The following code snippet shows an example of mentioning users with Entra Object ID and UPN using the Teams SDK:

# [C#](#tab/dotnet3)

```csharp
app.OnMessage(async context =>
{
    // Mention a user by their User Principal Name (UPN)
    var user = new Account { Id = "Adele@microsoft.com", Name = "Adele" };
    await context.Send(new MessageActivity("Hello!").AddMention(user));
});

```

# [TypeScript](#tab/typescript3)

```typescript
app.on('message', async ({ send }) => {
    // Mention a user by their User Principal Name (UPN)
    const user = { id: 'Adele@microsoft.com', name: 'Adele' };
    await send(new MessageActivity('Hello!').addMention(user));
});

```

# [JSON](#tab/json3)

```json
{
    "type": "mention",
    "text": "<at>Adele</at>",
    "mentioned": {
            "id": "Adele@microsoft.com",
            "name": "Adele"
    }
}
```

# [Python](#tab/python3)

```python
from microsoft_teams.api import Account, MessageActivityInput

@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    # Mention a user by their User Principal Name (UPN)
    user = Account(id="Adele@microsoft.com", name="Adele")
    await ctx.send(MessageActivityInput(text="Hello!").add_mention(account=user))

```

* * *

#### Tag mention

Your bot can mention tags in text messages and Adaptive Cards posted in channels. When the bot @mentions the tag in a channel, the tag is highlighted and the people associated with the tag get notified. When a user hovers over the tag, a pop-up appears with the tag details.

> [!NOTE]
> Tag mentions aren't supported in [Teams operated by 21Vianet](../../../concepts/sovereign-cloud.md).

##### Mention tags in a text message

To mention a tag, include a mention entity with `"type": "tag"` in your message. The `id` field must be the base64-encoded tag ID from the [List teamworkTags](/graph/api/teamworktag-list?view=graph-rest-1.0&tabs=http&preserve-view=true) API.

# [C#](#tab/dotnet4)

```csharp
app.OnMessage(async context =>
{
    // Mention a tag using the tag's Graph API ID
    var tag = new Account { Id = "<base64-encoded-tag-id>", Name = "Test Tag" };
    await context.Send(new MessageActivity("Hello!").AddMention(tag));
});

```

# [TypeScript](#tab/typescript4)

```typescript
app.on('message', async ({ send }) => {
    // Mention a tag using the tag's Graph API ID
    const tag = { id: '<base64-encoded-tag-id>', name: 'Test Tag' };
    await send(new MessageActivity('Hello!').addMention(tag));
});

```

# [Python](#tab/python4)

```python
@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    # Mention a tag using the tag's Graph API ID
    tag = Account(id="<base64-encoded-tag-id>", name="Test Tag")
    await ctx.send(MessageActivityInput(text="Hello!").add_mention(account=tag))

```

* * *

> [!NOTE]
> When mentioning tags, the underlying wire format requires the `"type": "tag"` property in the `mentioned` object of the entity. If the `"type": "tag"` property isn't included, the bot treats the mention as a user mention.

##### Mention tags in an Adaptive Card

In the Adaptive Card schema, under the `mentioned` object, add the `"type": "tag"` property. If the `"type": "tag"` property isn't added, the bot treats the mention as a user mention.

You can get the list of the tags available in the channel using the [List teamworkTags](/graph/api/teamworktag-list?view=graph-rest-1.0&tabs=http&preserve-view=true) API.

Example:

```json
{
    "type": "mention",
    "text": "<at>Test Tag</at>",
    "mentioned": {
            "id": "base64 encoded id",
            "name": "Test Tag",
            "type": "tag"
    }
}
```

###### Query Parameters

|Name |Description |
|---------|----------------|
|`type`| The type of mention. The supported type is `tag`.|
|`id`|The unique identifier for the tag. For more information, see [teamworkTag](/graph/api/resources/teamworktag?view=graph-rest-1.0&preserve-view=true).|

###### Error code

| Status code | Error code | Message values | Retry request | Developer action|
|----------------|-----------------|-----------------|----------------|----------------|
| 400 | **Code**: `Bad Request` | Mentioned tag with ID {id string} doesn't exist in current team<br/>Tag can only be mentioned in channel<br/>Invalid mentioned tag because no tag exists in the team| No | Reevaluate request payload for errors. Check returned error message for details. |
| 502 | **Code**: `Bad Gateway` | Invalid team group ID<br/>Malformed tenant ID for the tag<br/>Mention ID can't be resolved | No |Retry manually.|

##### Throttling limits

Any request can be evaluated against multiple limits, depending on the scope, the window type (short and long), number of tags per message, and other factors. The first limit to be reached triggers throttling behavior.

Ensure that you don't exceed the throttling limits to avoid failed message delivery. For example, a bot can send only two messages with tag mention in a five-second window and each message can have only up to 10 tags.

The following table lists the throttling limits for tag mentions in a bot:

| Scope   | Window Type  | Number of tags per message  | Time windows (sec)  | Maximum number of messages per time window  |
|------------------------|------------|-----------|----------|----------|
|Per bot per thread     |   Short     |    10     |     5    |     2    |
| &nbsp;                |   Long      |    10     |     60   |     5    |
|All bots per thread    |   Short     |    10     |     5    |     4    |
| &nbsp;                |   Long      |    10     |     60   |     5    |

##### Limitations

* Tag mentions are supported only in bot to client message flow with text and Adaptive Card.
* Tag mentions aren't supported in shared and private channels.
* Tag mentions aren't supported in connectors.
* Tag mentions don't support the invoke flow in a bot.

## Next step

> [!div class="nextstepaction"]
> [Subscribe to conversation events](~/bots/how-to/conversations/subscribe-to-conversation-events.md)

## See also

* [Teams SDK - API Client](/microsoftteams/platform/teams-sdk/essentials/api)
* [Teams SDK - Microsoft Graph Integration](/microsoftteams/platform/teams-sdk/essentials/graph)
* [Send and receive targeted messages in group conversations](~/agents-in-teams/targeted-messages.md)
* [Expose slash commands from agents and apps](~/agents-in-teams/agent-slash-commands.md)
* [Create private channel on behalf of user](/graph/api/channel-post#example-2-create-private-channel-on-behalf-of-user)
* [Teams SDK - Teams Integration Overview](/microsoftteams/platform/teams-sdk/teams/overview)
