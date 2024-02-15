---
title: Event-driven conversations with activity handlers
author: surbhigupta
description: Learn about Microsoft Teams events and activity handlers for bot messages, channels, teams, members, mentions, auth, card actions using Microsoft Bot Framework SDK.
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: v-npaladugu
ms.date: 01/22/2023
---
# Event-driven conversations with activity handlers

When building your conversational bots for Microsoft Teams, you can work with conversation events. Teams sends notifications to your bot for conversation events that happen in scopes where your bot is active. You can capture these events in your code and take the following actions:

Trigger a welcome message when your bot is added to a team.
Trigger a welcome message when a new team member is added or removed.
Trigger a notification when a channel is created, renamed, or deleted.
Trigger a notification when a bot message is liked by a user.
Identify the default channel for your bot from user input (selection) during installation.

## Activity handler

An activity handler is an event-driven approach to organize the conversational logic for your bot. Each activity type, or subtype, signifies a unique conversational event. Internally, the bot's turn handler, which is responsible for managing the flow of conversation, triggers the specific activity handler based on the received activity type.

An activity handler processes activities in two ways, through Teams-specific activity handlers for Teams-specific events and interactions, and through the bot object for general conversational logic. The Teams bot is derived from `TeamsActivityHandler` class, which is derived from the Bot Framework's `ActivityHandler` class.

`example`

## Bot logic

The bot object contains the conversational reasoning or logic for a turn and exposes a turn handler, which is the method that can accept incoming activities from the bot adapter. The bot logic processes incoming activities from one or more of your bots channels and generates outgoing activities in response. This is still true of bot derived from the Teams activity handler class, which first checks for Teams activities, then passes all other activities to the Bot Framework's activity handler.

`{Sequence or flow chart}`

Following are the different types of events for bot conversations:

* Conversation events
* Channel events
* Members events
* Team events
* Reaction events
* Installation events

## Conversation update events

You can use conversation update events to provide better notifications and effective bot actions.

> [!IMPORTANT]
>
> * You can add new events any time and your bot begins to receive them.
> * You must design your bot to receive unexpected events.
> * If you are using the Bot Framework SDK, your bot automatically responds with a `200 - OK` to any events you choose not to handle.

A bot receives a `conversationUpdate` event in either of the following cases:

* When bot has been added to a conversation.
* Other members are added to or removed from a conversation.
* Conversation metadata has changed.

The `conversationUpdate` event is sent to your bot when it receives information on membership updates for teams where it has been added. It also receives an update when it has been added for the first time for personal conversations.

## Channel events

### Channel created

The `channelCreated` event is sent to your bot whenever a new channel is created in a team where your bot is installed.

<details><summary><b>The code shows an example of channel created event:</b></summary>

# [C#](#tab/dotnet)

* [SDK reference](/dotnet/api/microsoft.bot.builder.teams.teamsactivityhandler.onteamschannelcreatedasync?view=botbuilder-dotnet-stable&preserve-view=true)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/csharp/Bots/TeamsConversationBot.cs#L335)

```csharp
protected override async Task OnTeamsChannelCreatedAsync(ChannelInfo channelInfo, TeamInfo teamInfo, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
{
    var heroCard = new HeroCard(text: $"{channelInfo.Name} is the Channel created");
    // Sends an activity to the sender of the incoming activity.
    await turnContext.SendActivityAsync(MessageFactory.Attachment(heroCard.ToAttachment()), cancellationToken);
}

```

# [TypeScript](#tab/typescript)

<!-- From sample: botbuilder-js\libraries\botbuilder\tests\teams\conversationUpdate\src\conversationUpdateBot.ts -->

* [SDK reference](/javascript/api/botbuilder/teamsactivityhandler?view=botbuilder-ts-latest#botbuilder-teamsactivityhandler-onteamschannelcreatedevent&preserve-view=true)

```typescript
export class MyBot extends TeamsActivityHandler {
    constructor() {
        super();
        this.onTeamsChannelCreatedEvent(async (channelInfo: ChannelInfo, teamInfo: TeamInfo, turnContext: TurnContext, next: () => Promise<void>): Promise<void> => {
            const card = CardFactory.heroCard('Channel Created', `${channelInfo.name} is the Channel created`);
            const message = MessageFactory.attachment(card);
            // Sends a message activity to the sender of the incoming activity.
            await turnContext.sendActivity(message);
            await next();
        });
    }
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

# [Python](#tab/python)

* [SDK reference](/python/api/botbuilder-core/botbuilder.core.teams.teamsactivityhandler?view=botbuilder-py-latest#botbuilder-core-teams-teamsactivityhandler-on-teams-channel-created&preserve-view=true)

```python
async def on_teams_channel_created(
 self, channel_info: ChannelInfo, team_info: TeamInfo, turn_context: TurnContext
):
 # Sends a message activity to the sender of the incoming activity.
 return await turn_context.send_activity(
  MessageFactory.text(
   f"The new channel is {channel_info.name}. The channel id is {channel_info.id}"
  )
 )
```

---

</details>

### Channel renamed

The `channelRenamed` event is sent to your bot whenever a channel is renamed in a team where your bot is installed.

<details><summary><b>The following code shows an example of channel renamed event:</b></summary>

# [C#](#tab/dotnet)

* [SDK reference](/dotnet/api/microsoft.bot.builder.teams.teamsactivityhandler.onteamschannelrenamedasync?view=botbuilder-dotnet-stable&preserve-view=true)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/csharp/Bots/TeamsConversationBot.cs#L341)

```csharp
protected override async Task OnTeamsChannelRenamedAsync(ChannelInfo channelInfo, TeamInfo teamInfo, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
{
    var heroCard = new HeroCard(text: $"{channelInfo.Name} is the new Channel name");
    // Sends an activity to the sender of the incoming activity.
    await turnContext.SendActivityAsync(MessageFactory.Attachment(heroCard.ToAttachment()), cancellationToken);
}

```

# [TypeScript](#tab/typescript)

* [SDK reference](/javascript/api/botbuilder/teamsactivityhandler?view=botbuilder-ts-latest#botbuilder-teamsactivityhandler-onteamschannelrenamedevent&preserve-view=true)

```typescript
export class MyBot extends TeamsActivityHandler {
    constructor() {
        super();
        this.onTeamsChannelRenamedEvent(async (channelInfo: ChannelInfo, teamInfo: TeamInfo, turnContext: TurnContext, next: () => Promise<void>): Promise<void> => {
            const card = CardFactory.heroCard('Channel Renamed', `${channelInfo.name} is the new Channel name`);
            const message = MessageFactory.attachment(card);
            // Sends a message activity to the sender of the incoming activity.
            await turnContext.sendActivity(message);
            await next();
        });
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

# [Python](#tab/python)

* [SDK reference](/python/api/botbuilder-core/botbuilder.core.teams.teamsactivityhandler?view=botbuilder-py-latest#botbuilder-core-teams-teamsactivityhandler-on-teams-channel-renamed&preserve-view=true)

```python
async def on_teams_channel_renamed(
 self, channel_info: ChannelInfo, team_info: TeamInfo, turn_context: TurnContext
):
 return await turn_context.send_activity(
  MessageFactory.text(f"The new channel name is {channel_info.name}")
 )
```

---

</details>

### Channel deleted

The `channelDeleted` event is sent to your bot, whenever a channel is deleted in a team where your bot is installed.

<details><summary><b>The following code shows an example of channel deleted event:</b></summary>

# [C#](#tab/dotnet)

* [SDK reference](/dotnet/api/microsoft.bot.builder.teams.teamsactivityhandler.onteamschanneldeletedasync?view=botbuilder-dotnet-stable&preserve-view=true)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/csharp/Bots/TeamsConversationBot.cs#L347)

```csharp
protected override async Task OnTeamsChannelDeletedAsync(ChannelInfo channelInfo, TeamInfo teamInfo, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
{
    var heroCard = new HeroCard(text: $"{channelInfo.Name} is the Channel deleted");
    await turnContext.SendActivityAsync(MessageFactory.Attachment(heroCard.ToAttachment()), cancellationToken);
}

```

# [TypeScript](#tab/typescript)

* [SDK reference](/javascript/api/botbuilder/teamsactivityhandler?view=botbuilder-ts-latest#botbuilder-teamsactivityhandler-onteamschanneldeletedevent&preserve-view=true)

```typescript
export class MyBot extends TeamsActivityHandler {
    constructor() {
        super();
        this.onTeamsChannelDeletedEvent(async (channelInfo: ChannelInfo, teamInfo: TeamInfo, turnContext: TurnContext, next: () => Promise<void>): Promise<void> => {
            const card = CardFactory.heroCard('Channel Deleted', `${channelInfo.name} is the Channel deleted`);
            const message = MessageFactory.attachment(card);
            // Sends a message activity to the sender of the incoming activity.
            await turnContext.sendActivity(message);
            await next();
        });
    }
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

# [Python](#tab/python)

* [SDK reference](/python/api/botbuilder-core/botbuilder.core.teams.teamsactivityhandler?view=botbuilder-py-latest#botbuilder-core-teams-teamsactivityhandler-on-teams-channel-deleted&preserve-view=true)

* [SDK reference](/python/api/botbuilder-core/botbuilder.core.teams.teamsactivityhandler?&preserve-view=true)

```python
async def on_teams_channel_deleted(
 self, channel_info: ChannelInfo, team_info: TeamInfo, turn_context: TurnContext
):
 # Sends a message activity to the sender of the incoming activity.
 return await turn_context.send_activity(
  MessageFactory.text(f"The deleted channel is {channel_info.name}")
 )
```

---

</details>

### Channel restored

The `channelRestored` event is sent to your bot, whenever a channel that was previously deleted is restored in a team where your bot is already installed.

<details><summary><b>The following code shows an example of channel restored event:</b></summary>

# [C#](#tab/dotnet)

* [SDK refernce](/dotnet/api/microsoft.bot.builder.teams.teamsactivityhandler.onteamschannelrestoredasync?view=botbuilder-dotnet-stable&preserve-view=true)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/msteams-application-qbot/Source/Microsoft.Teams.Apps.QBot.Web/Bot/BotActivityHandler.cs#L395)

```csharp
protected override async Task OnTeamsChannelRestoredAsync(ChannelInfo channelInfo, TeamInfo teamInfo, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
{
    var heroCard = new HeroCard(text: $"{channelInfo.Name} is the Channel restored.");
    await turnContext.SendActivityAsync(MessageFactory.Attachment(heroCard.ToAttachment()), cancellationToken);
}

```

# [TypeScript](#tab/typescript)

* [SDK reference](/javascript/api/botbuilder/teamsactivityhandler?view=botbuilder-ts-latest#botbuilder-teamsactivityhandler-onteamschannelrestoredevent&preserve-view=true)

```typescript

export class MyBot extends TeamsActivityHandler {
    constructor() {
        super();
        this.onTeamsChannelRestoredEvent(async (channelInfo: ChannelInfo, teamInfo: TeamInfo, turnContext: TurnContext, next: () => Promise<void>): Promise<void> => {
            const card = CardFactory.heroCard('Channel Restored', `${channelInfo.name} is the Channel restored`);
            const message = MessageFactory.attachment(card);
            // Sends a message activity to the sender of the incoming activity.
            await turnContext.sendActivity(message);
            await next();
        });
    }
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
        "eventType": "channelRestored",
        "tenant": {
            "id": "72f988bf-86f1-41af-91ab-2d7cd011db47"
        }
    }
}
```

# [Python](#tab/python)

* [SDK reference](/python/api/botbuilder-core/botbuilder.core.teams.teamsactivityhandler?view=botbuilder-py-latest#botbuilder-core-teams-teamsactivityhandler-on-teams-channel-restored&preserve-view=true)

```python
async def on_teams_channel_restored(
 self, channel_info: ChannelInfo, team_info: TeamInfo, turn_context: TurnContext
):
 # Sends a message activity to the sender of the incoming activity.
 return await turn_context.send_activity(
  MessageFactory.text(
   f"The restored channel is {channel_info.name}. The channel id is {channel_info.id}"
  )
 )
```

---

</details>








