---
title: Subscribe to conversation events
author: WashingtonKayaker
description: How to subscribe to conversation events from your Microsoft Teams bot.
ms.topic: overview
ms.author: anclear
---
# Subscribe to conversation events

[!INCLUDE [pre-release-label](~/includes/v4-to-v3-pointer-bots.md)]

Microsoft Teams sends notifications to your bot for events that happen in scopes where your bot is active. You can capture these events in your code and take action on them, such as the following:

* Trigger a welcome message when your bot is added to a team
* Trigger a welcome message when a new team member is added or removed
* Trigger a notification when a channel is created, renamed or deleted
* When a bot message is liked by a user

## Conversation update events

A bot receives a `conversationUpdate` event when it has been added to a conversation, other members have been added to or removed from a conversation, or conversation metadata has changed.

The `conversationUpdate` event is sent to your bot when it receives information on membership updates for teams where it has been added. It also receives an update when it has been added for the first time specifically for personal conversations.

The following table shows a list of Teams conversation update events, with links to more details.

| Action Taken        | EventType         | Method Called              | Description                | Scope |
| ------------------- | ----------------- | -------------------------- | -------------------------- | ----- |
| channel created     | channelCreated    | OnTeamsChannelCreatedAsync | [A channel was created](#channel-created) | Team |
| channel renamed     | channelRenamed    | OnTeamsChannelRenamedAsync | [A channel was renamed](#channel-renamed) | Team |
| channel deleted     | channelDeleted    | OnTeamsChannelDeletedAsync | [A channel was deleted](#channel-deleted) | Team |
| team member added   | teamMemberAdded   | OnTeamsMembersAddedAsync   | [A Member added to team](#Team-Member-Added)   | All |
| team member removed | teamMemberRemoved | OnTeamsMembersRemovedAsync | [A Member was removed from team](#Team-Member-Removed) | groupChat & team |
| team renamed        | teamRenamed       | OnTeamsTeamRenamedAsync    | [A Team was renamed](#team-renamed)       | Team |

### Channel created

The channel created event is sent to your bot whenever a new channel is created in a team your bot is installed in.

# [C#/.NET](#tab/dotnet)

```csharp
protected override async Task OnTeamsChannelCreatedAsync(ChannelInfo channelInfo, TeamInfo teamInfo, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
{
    var heroCard = new HeroCard(text: $"{channelInfo.Name} is the Channel created");
    await turnContext.SendActivityAsync(MessageFactory.Attachment(heroCard.ToAttachment()), cancellationToken);
}
```

# [TypeScript/Node.js](#tab/typescript)

<!-- From sample: botbuilder-js\libraries\botbuilder\src\teamsActivityHandler.ts-->

```typescript
protected async onTeamsChannelCreated(context): Promise<void> {
    await this.handle(context, 'TeamsChannelCreated', this.defaultNextEvent(context));
}
```

# [JSON](#tab/json)

```json
{
    "type": "conversationUpdate",
    "timestamp": "2017-02-23T19:34:07.478Z",
    "localTimestamp": "2017-02-23T12:34:07.478-07:00",
    "id": "f:dd6ec311",
    "channelId": "msteams",
    "serviceUrl": "https://smba.trafficmanager.net/amer-client-ss.msg/",
    "from": {
        "id": "29:1wR7IdIRIoerMIWbewMi75JA3scaMuxvFon9eRQW2Nix5loMDo0362st2IaRVRirPZBv1WdXT8TIFWWmlQCizZQ"
    },
    "conversation": {
        "isGroup": true,
        "conversationType": "channel",
        "id": "19:efa9296d959346209fea44151c742e73@thread.skype"
    },
    "recipient": {
        "id": "28:f5d48856-5b42-41a0-8c3a-c5f944b679b0",
        "name": "SongsuggesterBot"
    },
    "channelData": {
        "channel": {
            "id": "19:6d97d816470f481dbcda38244b98689a@thread.skype",
            "name": "FunDiscussions"
        },
        "team": {
            "id": "19:efa9296d959346209fea44151c742e73@thread.skype"
        },
        "eventType": "channelCreated",
        "tenant": {
            "id": "72f988bf-86f1-41af-91ab-2d7cd011db47"
        }
    }
}
```

* * *

### Channel renamed

The channel renamed event is sent to your bot whenever a channel is renamed in a team your bot is installed in.

# [C#/.NET](#tab/dotnet)

```csharp
protected override async Task OnTeamsChannelRenamedAsync(ChannelInfo channelInfo, TeamInfo teamInfo, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
{
    var heroCard = new HeroCard(text: $"{channelInfo.Name} is the new Channel name");
    await turnContext.SendActivityAsync(MessageFactory.Attachment(heroCard.ToAttachment()), cancellationToken);
}
```

# [TypeScript/Node.js](#tab/typescript)

<!-- From sample: botbuilder-js\libraries\botbuilder\src\teamsActivityHandler.ts-->

```typescript
protected async onTeamsChannelRenamed(context): Promise<void> {
    await this.handle(context, 'TeamsChannelRenamed', this.defaultNextEvent(context));
}
```

# [JSON](#tab/json)

```json
{
    "type": "conversationUpdate",
    "timestamp": "2017-02-23T19:34:07.478Z",
    "localTimestamp": "2017-02-23T12:34:07.478-07:00",
    "id": "f:dd6ec311",
    "channelId": "msteams",
    "serviceUrl": "https://smba.trafficmanager.net/amer-client-ss.msg/",
    "from": {
        "id": "29:1wR7IdIRIoerMIWbewMi75JA3scaMuxvFon9eRQW2Nix5loMDo0362st2IaRVRirPZBv1WdXT8TIFWWmlQCizZQ"
    },
    "conversation": {
        "isGroup": true,
        "conversationType": "channel",
        "id": "19:efa9296d959346209fea44151c742e73@thread.skype"
    },
    "recipient": {
        "id": "28:f5d48856-5b42-41a0-8c3a-c5f944b679b0",
        "name": "SongsuggesterBot"
    },
    "channelData": {
        "channel": {
            "id": "19:6d97d816470f481dbcda38244b98689a@thread.skype",
            "name": "PhotographyUpdates"
        },
        "team": {
            "id": "19:efa9296d959346209fea44151c742e73@thread.skype"
        },
        "eventType": "channelRenamed",
        "tenant": {
            "id": "72f988bf-86f1-41af-91ab-2d7cd011db47"
        }
    }
}
```

* * *

### Channel Deleted

The channel deleted event is sent to your bot whenever a channel is deleted in a team your bot is installed in.

# [C#/.NET](#tab/dotnet)

```csharp
protected override async Task OnTeamsChannelDeletedAsync(ChannelInfo channelInfo, TeamInfo teamInfo, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
{
    var heroCard = new HeroCard(text: $"{channelInfo.Name} is the Channel deleted");
    await turnContext.SendActivityAsync(MessageFactory.Attachment(heroCard.ToAttachment()), cancellationToken);
}
```

# [TypeScript/Node.js](#tab/typescript)

<!-- From sample: botbuilder-js\libraries\botbuilder\src\teamsActivityHandler.ts-->

```typescript
protected async onTeamsChannelDeleted(context): Promise<void> {
    await this.handle(context, 'TeamsChannelDeleted', this.defaultNextEvent(context));
}
```

# [JSON](#tab/json)

```json
{
    "type": "conversationUpdate",
    "timestamp": "2017-02-23T19:34:07.478Z",
    "localTimestamp": "2017-02-23T12:34:07.478-07:00",
    "id": "f:dd6ec311",
    "channelId": "msteams",
    "serviceUrl": "https://smba.trafficmanager.net/amer-client-ss.msg/",
    "from": {
        "id": "29:1wR7IdIRIoerMIWbewMi75JA3scaMuxvFon9eRQW2Nix5loMDo0362st2IaRVRirPZBv1WdXT8TIFWWmlQCizZQ"
    },
    "conversation": {
        "isGroup": true,
        "conversationType": "channel",
        "id": "19:efa9296d959346209fea44151c742e73@thread.skype"
    },
    "recipient": {
        "id": "28:f5d48856-5b42-41a0-8c3a-c5f944b679b0",
        "name": "SongsuggesterBot"
    },
    "channelData": {
        "channel": {
            "id": "19:6d97d816470f481dbcda38244b98689a@thread.skype",
            "name": "PhotographyUpdates"
        },
        "team": {
            "id": "19:efa9296d959346209fea44151c742e73@thread.skype"
        },
        "eventType": "channelDeleted",
        "tenant": {
            "id": "72f988bf-86f1-41af-91ab-2d7cd011db47"
        }
    }
}
```

* * *

### Team member added

The `teamMemberAdded` event is sent to your bot the first time it is added to a conversation and every time a new user is added to a team or group chat that your bot is installed in. The user information (ID) is unique for your bot and can be cached for future use by your service (such as sending a message to a specific user).

# [C#/.NET](#tab/dotnet)

```csharp
protected override async Task OnTeamsMembersAddedAsync(IList<ChannelAccount> membersAdded, TeamInfo teamInfo, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
{
    foreach (TeamsChannelAccount member in membersAdded)
    {
        if (member.Id == turnContext.Activity.Recipient.Id)
        {
            // Send a message to introduce the bot to the team
            var heroCard = new HeroCard(text: $"The {member.Name} bot has joined {teamInfo.Name}");
            await turnContext.SendActivityAsync(MessageFactory.Attachment(heroCard.ToAttachment()), cancellationToken);
        }
        else
        {
            var heroCard = new HeroCard(text: $"{member.Name} joined {teamInfo.Name}");
            await turnContext.SendActivityAsync(MessageFactory.Attachment(heroCard.ToAttachment()), cancellationToken);
        }
    }
}
```

# [TypeScript/Node.js](#tab/typescript)

<!-- From sample: botbuilder-js\libraries\botbuilder\src\teamsActivityHandler.ts-->

```typescript
protected async onTeamsMembersAdded(context: TurnContext): Promise<void> {
    if ('TeamsMembersAdded' in this.handlers && this.handlers['TeamsMembersAdded'].length > 0) {

    let teamsChannelAccountLookup = null;

    for (let i=0; i<context.activity.membersAdded.length; i++) {
        const channelAccount = context.activity.membersAdded[i];

        // check whether we have a TeamChannelAccount
        if ('givenName' in channelAccount ||
            'surname' in channelAccount ||
            'email' in channelAccount ||
            'userPrincipalName' in channelAccount) {

            // we must have a TeamsChannelAccount so skip to teh next one
            continue;
        }

        // (lazily) build a lookup table of TeamsChannelAccounts
        if (teamsChannelAccountLookup === null) {
            const teamsChannelAccounts = await TeamsInfo.getMembers(context);
            teamsChannelAccountLookup = {};
            teamsChannelAccounts.forEach((teamChannelAccount) => teamsChannelAccountLookup[teamChannelAccount.id] = teamChannelAccount);
        }

        // if we have the TeamsChannelAccount in our lookup table then overwrite the ChannelAccount with it
        const teamsChannelAccount = teamsChannelAccountLookup[channelAccount.id];
        if (teamsChannelAccount !== undefined) {
            context.activity.membersAdded[i] = teamsChannelAccount;
        }
    }

    await this.handle(context, 'TeamsMembersAdded', this.defaultNextEvent(context));
    } else {
    await this.handle(context, 'MembersAdded', this.defaultNextEvent(context));
    }
}
```

# [JSON](#tab/json)

This is the message your bot will receive when the bot is added **to a team**.

```json
{
    "membersAdded": [
        {
            "id": "28:f5d48856-5b42-41a0-8c3a-c5f944b679b0"
        }
    ],
    "type": "conversationUpdate",
    "timestamp": "2017-02-23T19:38:35.312Z",
    "localTimestamp": "2017-02-23T12:38:35.312-07:00",
    "id": "f:5f85c2ad",
    "channelId": "msteams",
    "serviceUrl": "https://smba.trafficmanager.net/amer-client-ss.msg/",
    "from": {
        "id": "29:1I9Is_Sx0OIy2rQ7Xz1lcaPKlO9eqmBRTBuW6XzkFtcjqxTjPaCMij8BVMdBcL9L_RwWNJyAHFQb0TRzXgyQvA"
    },
    "conversation": {
        "isGroup": true,
        "conversationType": "channel",
        "id": "19:efa9296d959346209fea44151c742e73@thread.skype"
    },
    "recipient": {
        "id": "28:f5d48856-5b42-41a0-8c3a-c5f944b679b0",
        "name": "SongsuggesterBot"
    },
    "channelData": {
        "team": {
            "id": "19:efa9296d959346209fea44151c742e73@thread.skype"
        },
        "eventType": "teamMemberAdded",
        "tenant": {
            "id": "72f988bf-86f1-41af-91ab-2d7cd011db47"
        }
    }
}
```

This is the message your bot will receive when the bot is added **to a one-to-one chat*.

```json
{
  "membersAdded": [{
      "id": "28:f5d48856-5b42-41a0-8c3a-c5f944b679b0"
    },
    {
      "id": "29:<userID>",
      "aadObjectId": "***"
    }
  ],
  "type": "conversationUpdate",
  "timestamp": "2019-04-23T10:17:44.349Z",
  "id": "f:5f85c2ad",
  "channelId": "msteams",
  "serviceUrl": "https://smba.trafficmanager.net/amer-client-ss.msg/",
  "from": {
    "id": "29:<USERID>",
    "aadObjectId": "***"
  },
  "conversation": {
    "conversationType": "personal",
    "id": "***"
  },
  "recipient": {
    "id": "28:<BOT ID>",
    "name": "<BOT NAME>"
  },
  "channelData": {
    "tenant": {
      "id": "<TENANT ID>"
    }
  }
}
```


* * *

### Team member removed

The `teamMemberRemoved` event is sent to your bot if it is removed from a team and every time any user is removed from a team that your bot is a member of. You can determine if the new member removed was the bot itself or a user by looking at the `Activity` object of the `turnContext`.  If the `Id` field of the `MembersRemoved` object is the same as the `Id` field of the `Recipient` object, then the member removed is the bot, otherwise it is a user.  The bot's `Id` will generally be: `28:<MicrosoftAppId>`

# [C#/.NET](#tab/dotnet)

```csharp
protected override async Task OnTeamsMembersRemovedAsync(IList<ChannelAccount> membersRemoved, TeamInfo teamInfo, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
{
    foreach (TeamsChannelAccount member in membersRemoved)
    {
        if (member.Id == turnContext.Activity.Recipient.Id)
        {
            // The bot was removed
            // You should clear any cached data you have for this team
        }
        else
        {
            var heroCard = new HeroCard(text: $"{member.Name} was removed from {teamInfo.Name}");
            await turnContext.SendActivityAsync(MessageFactory.Attachment(heroCard.ToAttachment()), cancellationToken);
        }
    }
}
```

# [TypeScript/Node.js](#tab/typescript)

<!-- From sample: botbuilder-js\libraries\botbuilder\src\teamsActivityHandler.ts-->

```typescript
protected async onTeamsMembersRemoved(context: TurnContext): Promise<void> {
    if ('TeamsMembersRemoved' in this.handlers && this.handlers['TeamsMembersRemoved'].length > 0) {
        await this.handle(context, 'TeamsMembersRemoved', this.defaultNextEvent(context));
    } else {
        await this.handle(context, 'MembersRemoved', this.defaultNextEvent(context));
    }
}
```

# [JSON](#tab/json)

```json
{
    "membersRemoved": [
        {
            "id": "29:1_LCi5Up14pAy65yZuaJzG1uIT7ujYhjjSTsUNqjORsZHjLHKiQIBJa4cX2XsAsRoaY7va2w6ZymA9-1VtSY_g"
        }
    ],
    "type": "conversationUpdate",
    "timestamp": "2017-02-23T19:37:06.96Z",
    "localTimestamp": "2017-02-23T12:37:06.96-07:00",
    "id": "f:d8a6a4aa",
    "channelId": "msteams",
    "serviceUrl": "https://smba.trafficmanager.net/amer-client-ss.msg/",
    "from": {
        "id": "29:1I9Is_Sx0OIy2rQ7Xz1lcaPKlO9eqmBRTBuW6XzkFtcjqxTjPaCMij8BVMdBcL9L_RwWNJyAHFQb0TRzXgyQvA"
    },
    "conversation": {
        "isGroup": true,
        "conversationType": "channel",
        "id": "19:efa9296d959346209fea44151c742e73@thread.skype"
    },
    "recipient":
    {
        "id": "28:f5d48856-5b42-41a0-8c3a-c5f944b679b0",
        "name": "SongsuggesterBot"
    },
    "channelData": {
        "team": {
            "id": "19:efa9296d959346209fea44151c742e73@thread.skype"
        },
        "eventType": "teamMemberRemoved",
        "tenant": {
            "id": "72f988bf-86f1-41af-91ab-2d7cd011db47"
        }
    }
}
```

* * *

### Team renamed

Your bot is notified when the team it is in has been renamed. It receives a `conversationUpdate` event with `eventType.teamRenamed` in the `channelData` object.

# [C#/.NET](#tab/dotnet)

```csharp
protected override async Task OnTeamsTeamRenamedAsync(TeamInfo teamInfo, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
{
    var heroCard = new HeroCard(text: $"{teamInfo.Name} is the new Team name");
    await turnContext.SendActivityAsync(MessageFactory.Attachment(heroCard.ToAttachment()), cancellationToken);
}
```

# [TypeScript/Node.js](#tab/typescript)

<!-- From sample: botbuilder-js\libraries\botbuilder\src\teamsActivityHandler.ts-->

```typescript
protected async onTeamsTeamRenamed(context): Promise<void> {
    await this.handle(context, 'TeamsTeamRenamed', this.defaultNextEvent(context));
}
```

# [JSON](#tab/json)

```json
{ 
    "type": "conversationUpdate",
    "timestamp": "2017-02-23T19:35:56.825Z",
    "localTimestamp": "2017-02-23T12:35:56.825-07:00",
    "id": "f:1406033e",
    "channelId": "msteams",
    "serviceUrl": "https://smba.trafficmanager.net/amer-client-ss.msg/", 
    "from": { 
        "id": "29:1I9Is_Sx0O-Iy2rQ7Xz1lcaPKlO9eqmBRTBuW6XzkFtcjqxTjPaCMij8BVMdBcL9L_RwWNJyAHFQb0TRzXgyQvA"
    }, 
    "conversation": {
        "isGroup": true,
        "conversationType": "channel",
        "id": "19:efa9296d959346209fea44151c742e73@thread.skype"
    },
    "recipient": { 
        "id": "28:f5d48856-5b42-41a0-8c3a-c5f944b679b0",
        "name": "SongsuggesterLocal"
    },
    "channelData": {
        "team": {
            "id": "19:efa9296d959346209fea44151c742e73@thread.skype",
            "name": "New Team Name"
        },
        "eventType": "teamRenamed",
        "tenant": { 
           "id": "72f988bf-86f1-41af-91ab-2d7cd011db47"
        }
    }
}
```

* * *

## Message reaction events

The `messageReaction` event is sent when a user adds or removes reactions to a message which was sent by your bot. The `replyToId` contains the ID of the specific message, and the `Type` is the type of reaction in text format.  The types of reactions include: "angry", "heart", "laugh", "like", "Sad", "surprised". This event does not contain the contents of the original message, so if processing reactions to your messages is important for your bot you'll need to store the messages when you send them.

| EventType       | Payload object   | Description                                                             | Scope |
| --------------- | ---------------- | ----------------------------------------------------------------------- | ----- |
| messageReaction | reactionsAdded   | [Reaction to bot message](#Reaction-to-a-bot-message)                   | All   |
| messageReaction | reactionsRemoved | [Reaction removed from bot message](#Reactions-removed-from-bot-message) | All   |

### Reactions to a bot message

# [C#/.NET](#tab/dotnet)

```csharp
protected override async Task OnReactionsAddedAsync(IList<MessageReaction> messageReactions, ITurnContext<IMessageReactionActivity> turnContext, CancellationToken cancellationToken)
{
    foreach (var reaction in messageReactions)
    {
      var newReaction = $"You reacted with '{reaction.Type}' to the following message: '{turnContext.Activity.ReplyToId}'";
      var replyActivity = MessageFactory.Text(newReaction);
      var resourceResponse = await turnContext.SendActivityAsync(replyActivity, cancellationToken);
    }
}
```

# [TypeScript/Node.js](#tab/typescript)

<!-- From sample: libraries\botbuilder-core\src\activityHandlerBase.ts -->

```typescript
protected async onMessageReactionActivity(context: TurnContext): Promise<void> {
    if (context.activity.reactionsAdded && context.activity.reactionsAdded.length > 0) {
        await this.onReactionsAddedActivity(context.activity.reactionsAdded, context);
    } else if (context.activity.reactionsRemoved && context.activity.reactionsRemoved.length > 0) {
        await this.onReactionsRemovedActivity(context.activity.reactionsRemoved, context);
    }
}
```

# [JSON](#tab/json)

```json
{
    "reactionsAdded": [
        {
            "type": "like"
        }
    ],
    "type": "messageReaction",
    "timestamp": "2017-10-16T18:45:41.943Z",
    "id": "f:9f78d1f3",
    "channelId": "msteams",
    "serviceUrl": "https://smba.trafficmanager.net/amer-client-ss.msg/",
    "from": {
        "id": "29:1I9Is_Sx0O-Iy2rQ7Xz1lcaPKlO9eqmBRTBuW6XzkFtcjqxTjPaCMij8BVMdBcL9L_RwWNJyAHFQb0TRzXgyQvA",
        "aadObjectId": "c33aafc4-646d-4543-9d4c-abd28e4d2110"
    },
    "conversation": {
        "isGroup": true,
        "conversationType": "channel",
        "id": "19:3629591d4b774aa08cb0887902eee7c1@thread.skype"
    },
    "recipient": {
        "id": "28:f5d48856-5b42-41a0-8c3a-c5f944b679b0",
        "name": "SongsuggesterLocal"
    },
    "channelData": {
        "channel": {
            "id": "19:3629591d4b774aa08cb0887902eee7c1@thread.skype"
        },
        "team": {
            "id": "19:efa9296d959346209fea44151c742e73@thread.skype"
        },
        "tenant": {
            "id": "72f988bf-86f1-41af-91ab-2d7cd011db47"
        }
    },
    "replyToId": "1:19uJ8TZA1cZcms7-2HLOW3pWRF4nSWEoVnRqc0DPa_kY"
}
```

* * *

### Reactions removed from bot message

# [C#/.NET](#tab/dotnet)

```csharp
protected override async Task OnReactionsRemovedAsync(IList<MessageReaction> messageReactions, ITurnContext<IMessageReactionActivity> turnContext, CancellationToken cancellationToken)
{
    foreach (var reaction in messageReactions)
    {
      var newReaction = $"You removed the reaction '{reaction.Type}' from the following message: '{turnContext.Activity.ReplyToId}'";
      var replyActivity = MessageFactory.Text(newReaction);
      var resourceResponse = await turnContext.SendActivityAsync(replyActivity, cancellationToken);
    }
}
```

# [TypeScript/Node.js](#tab/typescript)

<!-- From sample: libraries\botbuilder-core\src\activityHandlerBase.ts -->

```typescript
protected async onMessageReactionActivity(context: TurnContext): Promise<void> {
    if (context.activity.reactionsAdded && context.activity.reactionsAdded.length > 0) {
        await this.onReactionsAddedActivity(context.activity.reactionsAdded, context);
    } else if (context.activity.reactionsRemoved && context.activity.reactionsRemoved.length > 0) {
        await this.onReactionsRemovedActivity(context.activity.reactionsRemoved, context);
    }
}
```

# [JSON](#tab/json)

```json
{
    "reactionsRemoved": [
        {
            "type": "like"
        }
    ],
    "type": "messageReaction",
    "timestamp": "2017-10-16T18:45:41.943Z",
    "id": "f:9f78d1f3",
    "channelId": "msteams",
    "serviceUrl": "https://smba.trafficmanager.net/amer-client-ss.msg/",
    "from": {
        "id": "29:1I9Is_Sx0O-Iy2rQ7Xz1lcaPKlO9eqmBRTBuW6XzkFtcjqxTjPaCMij8BVMdBcL9L_RwWNJyAHFQb0TRzXgyQvA",
        "aadObjectId": "c33aafc4-646d-4543-9d4c-abd28e4d2110"
    },
    "conversation": {
        "isGroup": true,
        "conversationType": "channel",
        "id": "19:3629591d4b774aa08cb0887902eee7c1@thread.skype"
    },
    "recipient": {
        "id": "28:f5d48856-5b42-41a0-8c3a-c5f944b679b0",
        "name": "SongsuggesterLocal"
    },
    "channelData": {
        "channel": {
            "id": "19:3629591d4b774aa08cb0887902eee7c1@thread.skype"
        },
        "team": {
            "id": "19:efa9296d959346209fea44151c742e73@thread.skype"
        },
        "tenant": {
            "id": "72f988bf-86f1-41af-91ab-2d7cd011db47"
        }
    },
    "replyToId": "1:19uJ8TZA1cZcms7-2HLOW3pWRF4nSWEoVnRqc0DPa_kY"
}
```

* * *
