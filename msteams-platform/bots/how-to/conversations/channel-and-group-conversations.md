---
title: Channel/Group Conversation Chat Bot
description: Learn how to create new conversation threads, user and tag mentions, and send message on installation. Explore Teams file upload sample (.NET, JavaScript, Python).
ms.topic: article
ms.localizationpriority: medium
ms.author: nickwalk
ms.date: 06/23/2026
zone_pivot_groups: teams-sdk-languages
---

# Channel and group chat conversations with a bot

[!INCLUDE [pre-release-label](~/includes/v4-to-v3-pointer-bots.md)]

To install the Microsoft Teams bot in a team or group chat, add the `teams` or `groupchat` scope to your bot. This allows all members of the conversation to interact with your bot. After the bot is installed, it has access to metadata about the conversation, such as the list of conversation members. Also, when it's installed in a team, the bot has access to details about that team and the full list of channels.

Bots in a group or channel only receive messages when they're mentioned @botname. They don't receive any other messages sent to the conversation. The bot must be @mentioned directly. Your bot doesn't receive a message when the team or channel is mentioned, or when someone replies to a message from your bot without @mentioning it.

> [!NOTE]
>
> * Using resource-specific consent (RSC), a bot can receive all channel and group chat messages in conversations where it's installed without being @mentioned. For more information, see [receive all messages for bots and agents](channel-messages-for-bots-and-agents.md).
> * Private channel support for bot apps is limited. You can add bot-enabled apps in private channels where private channel app support is enabled, but bots can't post messages or Adaptive Cards in private channel conversations. For private and shared channel app support details, see [apps for shared and private channels](~/build-apps-for-shared-private-channels.md).

## Design guidelines

In group chats and channels, design your bot for collaborative conversations with clear value, concise responses, and minimal noise. For more information on how to design bots in Teams, see [how to design bot conversations in channels and chats](~/bots/design/bots.md).

## Threaded conversations

::: zone pivot="teams-sdk-csharp"

In Teams channels, messages can be organized into threads. When your agent receives a message in a thread, the conversation context already carries the thread ID. Use `Send()` to send a message in the same thread without quoting, or `Reply()` to send with a visual quote of the inbound message.

```csharp
app.OnMessage(async (context, cancellationToken) =>
{
    // Send in the same thread, no quote
    await context.Send("Acknowledged", cancellationToken);

    // Send in the same thread with a visual quote of the inbound message
    await context.Reply("Got it!", cancellationToken);
});
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

When your agent receives a message in a thread, the conversation context already carries the thread ID. Use `send()` to send a message in the same thread without quoting, or `reply()` to send with a visual quote of the inbound message.

```typescript
app.on('message', async ({ send, reply }) => {
  // Send in the same thread, no quote
  await send('Acknowledged');

  // Send in the same thread with a visual quote of the inbound message
  await reply('Got it!');
});
```

::: zone-end

::: zone pivot="teams-sdk-python"

When your agent receives a message in a thread, the conversation context already carries the thread ID. Use `send()` to send a message in the same thread without quoting, or `reply()` to send with a visual quote of the inbound message.

```python
@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    # Send in the same thread, no quote
    await ctx.send("Acknowledged")

    # Send in the same thread with a visual quote of the inbound message
    await ctx.reply("Got it!")
```

::: zone-end

For sending messages into a thread proactively, see [Proactive messages](send-proactive-messages.md).

## Send a message on installation

When your bot is first added to a group or team, you can send an introduction message by using the `install.add` lifecycle route. For more information, see [proactive messaging](/microsoftteams/platform/teams-sdk/essentials/sending-messages/proactive-messaging).

If you send an introduction message, include a brief description of the bot's features and how to use them.

See the following video to learn about channel and group chat conversations with a bot:
<br>

The following code shows an example of sending welcome messages on installation:

::: zone pivot="teams-sdk-csharp"

```csharp
app.OnInstall(async context => 
{ 
    await context.Send("Hello! I'm your bot. Here's what I can do..."); 
}); 
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript
app.on('install.add', async ({ send }) => 
{ 
    await send('Hello! I\'m your bot. Here\'s what I can do...'); 
}); 
```

::: zone-end

::: zone pivot="teams-sdk-python"

```python
@app.on_install_add 
async def handle_install_add(ctx: ActivityContext[InstalledActivity]): 
    await ctx.send("Hello! I'm your bot. Here's what I can do...") 
```

::: zone-end

When your bot is installed in a team, you must create a new conversation thread rather than reply to an existing one. At times, it's difficult to differentiate between two conversations. If the conversation is threaded, it's easier to organize and manage different conversations in channels. This is a form of [proactive messaging](~/bots/how-to/conversations/send-proactive-messages.md).

Next, you can retrieve mentions using the `entities` object and add mentions to your messages using the `Mention` object.

## Work with mentions

Every message to your bot from a group or channel contains an @mention with its name in the message text. Your bot can also retrieve other users mentioned in a message and add mentions to any messages it sends. Bots in group chats enable user mentions using `@mention`; however, they don’t support `@everyone` for mentions.

You must also strip out the @mentions from the content of the message your bot receives.

### Retrieve mentions

Mentions are returned in the `entities` object in payload and contain both the unique ID of the user and the name of the user mentioned. The text of the message also includes the mention, such as `<at>@John Smith<at>`. However, don't rely on the text in the message to retrieve any information about the user. It's possible for the person sending the message to alter it. Therefore, use the `entities` object.

You can retrieve all mentions in the message by calling the `GetMentions` function in the Bot Builder SDK, which returns an array of `Mention` objects.

The following code shows an example of retrieving mentions:

::: zone pivot="teams-sdk-csharp"

* [SDK reference](/dotnet/api/microsoft.bot.schema.activity.getmentions?view=botbuilder-dotnet-stable&preserve-view=true)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-archive-groupchat-messages/csharp/FetchGroupChatMessages/Bots/ActivityBot.cs#L182)

```csharp
protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
{
    // Resolves the mentions from the entities activity.
    Mention[] mentions = turnContext.Activity.GetMentions();
    if(mentions != null)
    {
        ChannelAccount firstMention = mentions[0].Mentioned;

        // Sends a message activity to the sender of the incoming activity.
        await turnContext.SendActivityAsync($"Hello {firstMention.Name}");
    }
    else
    {
        // Sends a message activity to the sender of the incoming activity.
        await turnContext.SendActivityAsync("Aw, no one was mentioned.");
    }
});
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

[SDK reference](/javascript/api/botbuilder-core/turncontext?view=botbuilder-ts-latest&preserve-view=true#botbuilder-core-turncontext-getmentions)

```typescript
this.onMessage(async (turnContext, next) => {
    
    // Resolves the mentions from the entities activity.
    const mentions = TurnContext.getMentions(turnContext.activity);
    if (mentions){
        const firstMention = mentions[0].mentioned;

        // Sends a message activity to the sender of the incoming activity.
        await turnContext.sendActivity(`Hello ${firstMention.name}.`);
    } else {
        // Sends a message activity to the sender of the incoming activity.
        await turnContext.sendActivity(`Aw, no one was mentioned.`);
    }

    await next();
});
```

::: zone-end

::: zone pivot="teams-sdk-python"

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

::: zone-end

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

### Add mentions to your messages

There are two types of mentions:

* [User mention](#user-mention)
* [Tag mention](#tag-mention)

> [!NOTE]
> User mention and tag mention is supported for both text message and Adaptive Card.

#### User mention

Your bot can mention other users in messages posted in channels.

The `Mention` object has two properties that you must set using the following:

* Include *@username* in the message text.
* Include the mention object inside the entities collection.

The Bot Framework SDK provides helper methods and objects to create mentions.

The following code shows an example of adding mentions to your messages:

::: zone pivot="teams-sdk-csharp"

```csharp
protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
{
    var user = context.Activity.From;
    var message = new MessageActivity($"Hello <at>{user.Name}</at>!").AddMention(user);
    await context.Send(message);
});
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript
this.onMessage(async (turnContext, next) => {
    const mention = {
        mentioned: turnContext.activity.from,
        text: `<at>${ new TextEncoder().encode(turnContext.activity.from.name) }</at>`,
        type: "mention",
    } as Mention;

    // Returns a simple text message.
    const replyActivity = MessageFactory.text(`Hello ${mention.text}`);
    replyActivity.entities = [mention];

    // Sends a message activity to the sender of the incoming activity.
    await turnContext.sendActivity(replyActivity);

    // By calling next() you ensure that the next BotHandler is run.
    await next();
});
```

::: zone-end

::: zone pivot="teams-sdk-python"

```python
@app.on_message 
async def handle_message(ctx: ActivityContext[MessageActivity]): 
    await ctx.send(MessageActivityInput(text="Hello!").add_mention(account=ctx.activity.from_))
```

::: zone-end

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

You can also mention users by their Microsoft Entra Object ID or User Principal Name (UPN), and mention tags in channel messages.

##### Support for Microsoft Entra Object ID and UPN in user mention

[!INCLUDE [<User Mention>](../../../includes/bots/user-mention.md)]

The following code snippet shows an example of mentioning users with Entra Object Id and UPN in a text message:

::: zone pivot="teams-sdk-csharp"

```csharp
app.OnMessage(async context =>
{
    // Mention a user by their User Principal Name (UPN)
    var user = new Account { Id = "Adele@microsoft.com", Name = "Adele" };
    await context.Send(new MessageActivity("Hello!").AddMention(user));
});
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript
app.on('message', async ({ send }) => {
    // Mention a user by their User Principal Name (UPN)
    const user = { id: 'Adele@microsoft.com', name: 'Adele' };
    await send(new MessageActivity('Hello!').addMention(user));
});
```

::: zone-end

::: zone pivot="teams-sdk-python"

```python
from microsoft_teams.api import Account, MessageActivityInput

@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    # Mention a user by their User Principal Name (UPN)
    user = Account(id="Adele@microsoft.com", name="Adele")
    await ctx.send(MessageActivityInput(text="Hello!").add_mention(account=user))
```

::: zone-end

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

#### Tag mention

Your bot can mention tags in text messages and Adaptive Cards posted in channels. When the bot @mentions the tag in a channel, the tag is highlighted and the people associated with the tag get notified. When a user hovers over the tag, a pop-up appears with the tag details.

> [!NOTE]
> Tag mentions aren't supported in [Teams operated by 21Vianet](../../../concepts/sovereign-cloud.md).

##### Mention tags in a text message

To mention a tag, include a mention entity with `"type": "tag"` in your message. The `id` field must be the base64-encoded tag ID from the [List teamworkTags](/graph/api/teamworktag-list?view=graph-rest-1.0&tabs=http&preserve-view=true) API.

::: zone pivot="teams-sdk-csharp"

```csharp
app.OnMessage(async context =>
{
    // Mention a tag using the tag's Graph API ID
    var tag = new Account { Id = "<base64-encoded-tag-id>", Name = "Test Tag" };
    await context.Send(new MessageActivity("Hello!").AddMention(tag));
});
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript
app.on('message', async ({ send }) => {
    // Mention a tag using the tag's Graph API ID
    const tag = { id: '<base64-encoded-tag-id>', name: 'Test Tag' };
    await send(new MessageActivity('Hello!').addMention(tag));
});
```

::: zone-end

::: zone pivot="teams-sdk-python"

```python
@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    # Mention a tag using the tag's Graph API ID
    tag = Account(id="<base64-encoded-tag-id>", name="Test Tag")
    await ctx.send(MessageActivityInput(text="Hello!").add_mention(account=tag))
```

::: zone-end

> [!NOTE]
> When mentioning tags, the underlying wire format requires the `"type": "tag"` property in the `mentioned` object of the entity. If the `"type": "tag"` property isn't included, the bot treats the mention as a user mention.

##### Mention tags in an Adaptive Card

In the Adaptive Card schema,  under the `mentioned` object, add the `"type": "tag"` property.  If the  `"type": "tag"` property isn't added, the bot treats the mention as a user mention.

You can get the list of the tags available in the channel using the [List teamworkTags](/graph/api/teamworktag-list?view=graph-rest-1.0&tabs=http&preserve-view=true) API.

Example:

```json
​{ 
​    "type": "mention", 
    ​"text": "<at>Test Tag</at>", 
​    "mentioned": { 
            ​"id": "base64 encoded id" ,// tag graph 64 base ID
​            "name": "Test Tag", 
            ​"type": "tag" 
​    } 
​} 
```

###### Query Parameters

|Name |Description |
|---------|----------------|
|`type`| The type of mention. The supported type is `tag`.|
|`id`|The unique identifier for the tag. For more information, see [teamworkTag](/graph/api/resources/teamworktag?view=graph-rest-1.0&preserve-view=true).|

###### Error code

| Status code | Error code | Message values | Retry request | Developer action|
|----------------|-----------------|-----------------|----------------|----------------|
| 400 | **Code**: `Bad Request` | ​Mentioned tag with ID {id string} doesn't exist in current team<br/>​Tag can only be mentioned in channel<br/>Invalid mentioned tag because no tag exists in the team| No | Reevaluate request payload for errors. Check returned error message for details. |
| 502 | **Code**: `Bad Gateway` | Invalid team group ID<br/> ​Malformed tenant ID for the tag<br/> ​Mention ID can't be resolved | No |Retry manually.|

##### Throttling limits

Any request can be evaluated against multiple limits, depending on the scope, the window type (short and long), number of tags per message, and other factors. The first limit to be reached triggers throttling behavior.

Ensure that you don't exceed the throttling limits to avoid failed message delivery. For example, a bot can send only two messages with tag mention in a five-second window and each message can have only up to 10 tags.

The following table lists the throttling limits for tag mentions in a bot:

| ​Scope   | ​Window Type  | Number of tags per message  | ​Time windows (sec)  | ​Maximum number of messages per time window  |
|------------------------|------------|-----------|----------|----------|
|​Per bot per thread     |   ​Short     |    10     |     5    |     2    |
| &nbsp;                |   ​Long      |    10     |     60   |     5    |
|​All bots per thread    |   ​Short     |    10     |     5    |     4    |
| &nbsp;                |   Long      |    10     |     60   |     5    |

##### Limitations

* Tag mentions are supported only in bot to client message flow with text and Adaptive Card.
* Tag mentions aren't supported in shared and private channels.
* Tag mentions aren't supported in connectors.
* Tag mentions don't support the invoke flow in a bot.

## Send a message on installation

When your bot is first added to the group or team, an introduction message must be sent. The message must provide a brief description of the bot's features and how to use them. You must subscribe to the `conversationUpdate` event with the `teamMemberAdded` eventType.  The event is sent when any new team member is added. Check if the new member added is the bot. For more information, see [sending a welcome message to a new team member](~/bots/how-to/conversations/send-proactive-messages.md).

You can send a personal message to each member of the team when the bot is added. To do this, [fetch the team roster](../../../resources/bot-v3/bots-context.md#fetch-the-team-roster) and send each user a [direct message](../../../resources/bot-v3/bot-conversations/bots-conv-proactive.md).

>[!NOTE]
> Ensure that the message sent by the bot is relevant and adds value to the initial message and doesn't spam the users.

Don't send a message in the following cases:

* When the team is large, for example, larger than 100 members. Your bot can be seen as spam and the person who added it can get complaints. You must clearly communicate your bot's value proposition to everyone who sees the welcome message.
* Your bot is first mentioned in a group or channel instead of being first added to a team.
* A group or channel is renamed.
* A team member is added to a group or channel.

[!INCLUDE [sample](~/includes/bots/teams-bot-samples.md)]

## Next step

> [!div class="nextstepaction"]
> [Subscribe to conversation events](~/bots/how-to/conversations/subscribe-to-conversation-events.md)

## See also

* [Get Teams context](~/bots/how-to/get-teams-context.md)
* [Create private channel on behalf of user](/graph/api/channel-post#example-2-create-private-channel-on-behalf-of-user)
* [Connect a bot to Web Chat channel](/azure/bot-service/bot-service-channel-connect-webchat)
