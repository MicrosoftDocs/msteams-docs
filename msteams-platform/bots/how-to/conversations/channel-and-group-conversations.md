---
title: Channel and group conversations with a bot
author: clearab
description: How to send, receive, and handle messages for a bot in a channel or group chat.
ms.topic: conceptual
localization_priority: Normal
ms.author: anclear
---
# Channel and group chat conversations with a bot

[!INCLUDE [pre-release-label](~/includes/v4-to-v3-pointer-bots.md)]

To install the Microsoft Teams bot in a team or group chat, add the `teams` or `groupchat` scope to your bot. This allows all members of the conversation to interact with your bot. After the bot is installed, it has access to metadata about the conversation, such as the list of conversation members. Also, when it is installed in a team, the bot has access to details about that team and the full list of channels.

Bots in a group or channel only receive messages when they are mentioned `@botname`. They do not receive any other messages sent to the conversation.

> [!NOTE]
> The bot must be `@mentioned` directly. Your bot does not receive a message when the team or channel is mentioned, or when someone replies to a message from your bot without @mentioning it.

## Design guidelines

Unlike personal chats, in group chats and channels, your bot must provide a quick introduction. You must follow these and more bot design guidelines. For more information on how to design bots in Teams, see [how to design bot conversations in channels and chats](~/bots/design/bots.md).

Now, you can create new conversation threads and easily manage different conversations in channels.

## Create new conversation threads

When your bot is installed in a team, you must create a new conversation thread rather than reply to an existing one. At times it is difficult to differentiate between two conversations. If the conversation is threaded, it is easier to organize and manage different conversations in channels. This is a form of [proactive messaging](~/bots/how-to/conversations/send-proactive-messages.md).

Next, you can retrieve mentions using the `entities` object and add mentions to your messages using the `Mention` object.

## Work with mentions

Every message to your bot from a group or channel contains an @mention with its name in the message text. Ensure that your message parsing handles @mention. Your bot can also retrieve other users mentioned in a message and add mentions to any messages it sends.

You must also strip out the @mentions from the content of the message your bot receives.

### Retrieve mentions

Mentions are returned in the `entities` object in payload and contain both the unique ID of the user and the name of the user mentioned. The text of the message also includes the mention, such as `<at>@John Smith<at>`. However, do not rely on the text in the message to retrieve any information about the user. It is possible for the person sending the message to alter it. Therefore, use the `entities` object.

You can retrieve all mentions in the message by calling the `GetMentions` function in the Bot Builder SDK, which returns an array of `Mention` objects.

The following code shows an example of retrieving mentions:

# [C#](#tab/dotnet)

```csharp
protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
{
    Mention[] mentions = turnContext.Activity.GetMentions();
    if(mentions != null)
    {
        ChannelAccount firstMention = mentions[0].Mentioned;
        await turnContext.SendActivityAsync($"Hello {firstMention.Name}");
    }
    else
    {
        await turnContext.SendActivityAsync("Aw, no one was mentioned.");
    }
}
```

# [TypeScript](#tab/typescript)

```typescript
this.onMessage(async (turnContext, next) => {
    const mentions = TurnContext.getMentions(turnContext.activity);
    if (mentions){
        const firstMention = mentions[0].mentioned;
        await turnContext.sendActivity(`Hello ${firstMention.name}.`);
    } else {
        await turnContext.sendActivity(`Aw, no one was mentioned.`);
    }

    await next();
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
@staticmethod
def get_mentions(activity: Activity) -> List[Mention]:
    result: List[Mention] = []
    if activity.entities is not None:
        for entity in activity.entities:
            if entity.type.lower() == "mention":
                    result.append(entity)
     return result
```

* * *

### Add mentions to your messages

Your bot can mention other users in messages posted into channels.

The `Mention` object has two properties that you must set using the following:

* Include <at>@username</at> in the message text.
* Include the mention object inside the entities collection.

The Bot Framework SDK provides helper methods and objects to create mentions.

The following code shows an example of adding mentions to your messages:

# [C#](#tab/dotnet)

```csharp
protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
{
    var mention = new Mention
    {
        Mentioned = turnContext.Activity.From,
        Text = $"<at>{XmlConvert.EncodeName(turnContext.Activity.From.Name)}</at>",
    };

    var replyActivity = MessageFactory.Text($"Hello {mention.Text}.");
    replyActivity.Entities = new List<Entity> { mention };

    await turnContext.SendActivityAsync(replyActivity, cancellationToken);
}
```

# [TypeScript](#tab/typescript)

```typescript
this.onMessage(async (turnContext, next) => {
    const mention = {
        mentioned: turnContext.activity.from,
        text: `<at>${ new TextEncoder().encode(turnContext.activity.from.name) }</at>`,
    } as Mention;

    const replyActivity = MessageFactory.text(`Hello ${mention.text}`);
    replyActivity.entities = [mention];

    await turnContext.sendActivity(replyActivity);

    // By calling next() you ensure that the next BotHandler is run.
    await next();
});
```

# [JSON](#tab/json)

The `text` field in the object in the `entities` array must match a portion of the message `text` field. If it does not, the mention is ignored.

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
async def _mention_activity(self, turn_context: TurnContext):
        mention = Mention(
            mentioned=turn_context.activity.from_property,
            text=f"<at>{turn_context.activity.from_property.name}</at>",
            type="mention"
        )

        reply_activity = MessageFactory.text(f"Hello {mention.text}")
        reply_activity.entities = [Mention().deserialize(mention.serialize())]
        await turn_context.send_activity(reply_activity)
```

* * *

Now you can send an introduction message when your bot is first installed or added to a group or team.

## Send a message on installation

When your bot is first added to the group or team, an introduction message must be sent. The message must provide a brief description of the bot's features and how to use them. You must subscribe to the `conversationUpdate` event with the `teamMemberAdded` eventType.  The event is sent when any new team member is added. Check if the new member added is the bot. For more information, see [sending a welcome message to a new team member](~/bots/how-to/conversations/send-proactive-messages.md).

Send a personal message to each team member when the bot is added. To do this, get the team roster and send each user a direct message.

Do not send a message in the following cases:

* The team is large, for example, larger than 100 members. Your bot can be seen as spam and the person who added it can get complaints. You must clearly communicate your bot's value proposition to everyone who sees the welcome message.
* Your bot is first mentioned in a group or channel instead of being first added to a team.
* A group or channel is renamed.
* A team member is added to a group or channel.

[!INCLUDE [sample](~/includes/bots/teams-bot-samples.md)]

## See also

[Get Teams context](~/bots/how-to/get-teams-context.md)

## Next step

> [!div class="nextstepaction"]
> [Subscribe to conversation events](~/bots/how-to/conversations/subscribe-to-conversation-events.md)
