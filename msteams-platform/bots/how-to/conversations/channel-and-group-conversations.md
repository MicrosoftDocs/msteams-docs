---
title: Channel and group conversations
author: clearab
description: How to send, receive, and handle messages for a bot in a channel or group chat.
ms.topic: overview
ms.author: anclear
---

# Channel and Group chat conversations with a Microsoft Teams bot

[!INCLUDE [pre-release-label](~/includes/v4-to-v3-pointer-bots.md)]

By adding the `teams` or `groupchat` scope to your bot, it can be available to be installed in a team or group chat. This allows all members of the conversation to interact with your bot. Once installed, it will also have access to metadata about the conversation like the list of conversation members, and when installed in a team details about that team and the full list of channels.

Bots in a group or channel only receive messages when they are mentioned ("@botname"), they do not receive any other messages sent to the conversation.

> [!NOTE]
> The bot must be @mentioned directly. Your bot will not receive a message when the team or channel is mentioned, or when someone replies to a message from your bot without @mentioning it.

## Design considerations

A bot should provide information that is both appropriate and relevant to all members in a group or channel. Conversations with it are visible to everyone that is a part of the group or channel. A well designed bot can add value to all users while not inadvertently sharing information that is more appropriate in a one-to-one conversation. Multi-turn conversations like dialogs should be avoided - use cards and/or task modules to collect information instead.

## Creating new conversation threads

When your bot is installed in a team, it can sometimes be necessary to create a new conversation thread rather than replying to an existing one. This is a form of [proactive messaging](~/bots/how-to/conversations/send-proactive-messages.md).

## Working with mentions

Every message to your bot from a group or channel will contain an @mention with its own name in the message text, so you'll need to ensure your message parsing handles that. Your bot can also retrieve other users mentioned in a message, and add mentions to any messages it sends.

### Stripping mentions from message text

You may find it necessary to strip out the @mentions from the text of the message your bot receives.

### Retrieving mentions

Mentions are returned in the `entities` object in payload and contain both the unique ID of the user and, in most cases, the name of user mentioned. The text of the message will also include the mention like `<at>@John Smith<at>`. However, you should not rely on the text in the message to retrieve any information about the user; it is possible for the person sending the message to alter it. Instead, use the `entities` object.

You can retrieve all mentions in the message by calling the `GetMentions` function in the Bot Builder SDK which returns an array of `Mention` objects.

# [C#/.NET](#tab/dotnet)

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

# [TypeScript/Node.js](#tab/typescript)

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

### Adding mentions to your messages

Your bot can mention other users in messages posted into channels. To do this, your message must do the following:

The `Mention` object has two properties that you will need to set:

* Include <at>@username</at> in the message text
* Include the mention object inside the entities collection

The Bot Framework SDK provides helper methods and objects to make constructing the mention easier.

# [C#/.NET](#tab/dotnet)

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

# [TypeScript/Node.js](#tab/typescript)

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

The `text` field in the object in the `entities` array must *exactly* match a portion of the message `text` field. If it does not, the mention will be ignored.

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

## Sending a message on installation

When your bot is first added to the group or team, it may be useful to send a message introducing it. The message should provide a brief description of the bot's features, and how to use them. You'll want to subscribe to the `conversationUpdate` event, with the `teamMemberAdded` eventType.  Since the event is sent when any new team member is added, you need to check to determine if the new member added is the bot. See [Sending a welcome message to a new team member](~/bots/how-to/conversations/send-proactive-messages.md) for more details.

You might also want to send a personal message to each member of the team when the bot is added. To do this, you could get the team roster and send each user a direct message.

It is not recommended to send a message in the following situations:

* The team is large (obviously subjective, but for example larger than 100 members). Your bot may be seen as 'spammy' and the person who added it may get complaints unless you clearly communicate your bot's value proposition to everyone who sees the welcome message.
* Your bot is first mentioned in a group or channel (versus being first added to a team)
* A group or channel is renamed
* A team member is added to a group or channel

## Learn more

Your bot has access to additional information about the group chat or team it is installed in. See [get teams context](~/bots/how-to/get-teams-context.md) for additional APIs available for your bot.

There are also additional events that your bot can subscribe and respond to. See [subscribe to conversation events](~/bots/how-to/conversations/subscribe-to-conversation-events.md) to learn how.

[!INCLUDE [sample](~/includes/bots/teams-bot-samples.md)]
