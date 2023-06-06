---
title: Conversation events
author: WashingtonKayaker
description: Work with conversation events from your Microsoft Teams bot, channel event updates, team member events, and message reaction events with samples (.NET,Node.js,Python).
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: anclear
keywords: events bot channel message reaction conversation
---

# Conversation events in your Teams bot

[!INCLUDE [pre-release-label](~/includes/v4-to-v3-pointer-bots.md)]

When building your conversational bots for Microsoft Teams, you can work with conversation events. Teams sends notifications to your bot for conversation events that happen in scopes where your bot is active. You can capture these events in your code and take the following actions:

* Trigger a welcome message when your bot is added to a team.
* Trigger a welcome message when a new team member is added or removed.
* Trigger a notification when a channel is created, renamed, or deleted.
* Trigger a notification when a bot message is liked by a user.
* Identify the default channel for your bot from user input (selection) during installation.

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

The following table shows a list of Teams conversation update events with more details:

| Action taken        | EventType         | Method called              | Description                | Scope |
| ------------------- | ----------------- | -------------------------- | -------------------------- | ----- |
| Channel created     | channelCreated    | OnTeamsChannelCreatedAsync | [A channel is created](#channel-created). | Team |
| Channel renamed     | channelRenamed    | OnTeamsChannelRenamedAsync | [A channel is renamed](#channel-renamed). | Team |
| Channel deleted     | channelDeleted    | OnTeamsChannelDeletedAsync | [A channel is deleted](#channel-deleted). | Team |
| Channel restored    | channelRestored    | OnTeamsChannelRestoredAsync | [A channel is restored](#channel-deleted). | Team |
| Members added   | membersAdded   | OnTeamsMembersAddedAsync   | [A member is added](#members-added). | All |
| Members removed | membersRemoved | OnTeamsMembersRemovedAsync | [A member is removed](#members-removed). | All |
| Team renamed        | teamRenamed       | OnTeamsTeamRenamedAsync    | [A team is renamed](#team-renamed).       | Team |
| Team deleted        | teamDeleted       | OnTeamsTeamDeletedAsync    | [A team is deleted](#team-deleted).       | Team |
| Team archived        | teamArchived       | OnTeamsTeamArchivedAsync    | [A team is archived](#team-archived).       | Team |
| Team unarchived        | teamUnarchived       | OnTeamsTeamUnarchivedAsync    | [A team is unarchived](#team-unarchived).       | Team |
| Team restored        | teamRestored      | OnTeamsTeamRestoredAsync    | [A team is restored](#team-restored)       | Team |

### Channel created

The `channelCreated` event is sent to your bot whenever a new channel is created in a team where your bot is installed.

The following code shows an example of channel created event:

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

[SDK reference](/microsoftteams/platform/bots/how-to/conversations/subscribe-to-conversation-events?tabs=json#channel-created)

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

### Channel renamed

The `channelRenamed` event is sent to your bot whenever a channel is renamed in a team where your bot is installed.

The following code shows an example of channel renamed event:

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

[SDK reference](/microsoftteams/platform/bots/how-to/conversations/subscribe-to-conversation-events?tabs=json#channel-renamed)

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

### Channel deleted

The `channelDeleted` event is sent to your bot, whenever a channel is deleted in a team where your bot is installed.

The following code shows an example of channel deleted event:

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

[SDK reference](/microsoftteams/platform/bots/how-to/conversations/subscribe-to-conversation-events?tabs=json#channel-deleted)

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

### Channel restored

The `channelRestored` event is sent to your bot, whenever a channel that was previously deleted is restored in a team where your bot is already installed.

The following code shows an example of channel restored event:

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

[SDK reference](/microsoftteams/platform/bots/how-to/conversations/subscribe-to-conversation-events?tabs=json#channel-restored)

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

### Members added

A member added event is sent to your bot in the following scenarios:

1. When the bot, itself, is installed and added to a conversation

   > In team context, the activity's conversation.id is set to the `id` of the channel selected by the user during app installation or the channel where the bot was installed.

2. When a user is added to a conversation where the bot is installed

   > User ids received in the event payload are unique to the bot and can be cached for future use, such as directly messaging a user.

The member added activity `eventType` is set to `teamMemberAdded` when the event is sent from a team context. To determine if the new member added was the bot itself or a user, check the `Activity` object of the `turnContext`. If the `MembersAdded` list contains an object where `id` is the same as the `id` field of the `Recipient` object, then the member added is the bot, else it's a user. The bot's `id` is formatted as `28:<MicrosoftAppId>`.

> [!TIP]
> Use the [`InstallationUpdate` event](#installation-update-event) to determine when when your bot is added or removed from a conversation.

The following code shows an example of team members added event:

# [C#](#tab/dotnet)

* [SDK reference](/dotnet/api/microsoft.bot.builder.teams.teamsactivityhandler.onteamsmembersaddedasync?view=botbuilder-dotnet-stable&preserve-view=true)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/msteams-application-qbot/Source/Microsoft.Teams.Apps.QBot.Web/Bot/BotActivityHandler.cs#L133)

```csharp
protected override async Task OnTeamsMembersAddedAsync(IList<TeamsChannelAccount> teamsMembersAdded , TeamInfo teamInfo, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
{
    foreach (TeamsChannelAccount member in teamsMembersAdded)
    {
        if (member.Id == turnContext.Activity.Recipient.Id)
        {
            // Send a message to introduce the bot to the team.
            var heroCard = new HeroCard(text: $"The {member.Name} bot has joined {teamInfo.Name}");
            // Sends an activity to the sender of the incoming activity.
            await turnContext.SendActivityAsync(MessageFactory.Attachment(heroCard.ToAttachment()), cancellationToken);
        }
        else
        {
            var heroCard = new HeroCard(text: $"{member.Name} joined {teamInfo.Name}");
            // Sends an activity to the sender of the incoming activity.
            await turnContext.SendActivityAsync(MessageFactory.Attachment(heroCard.ToAttachment()), cancellationToken);
        }
    }
}

```

# [TypeScript](#tab/typescript)

* [SDK reference](/javascript/api/botbuilder/teamsactivityhandler?view=botbuilder-ts-latest#botbuilder-teamsactivityhandler-onteamsmembersaddedevent&preserve-view=true)

```typescript
export class MyBot extends TeamsActivityHandler {
    constructor() {
        super();
        this.onTeamsMembersAddedEvent(async (membersAdded: ChannelAccount[], teamInfo: TeamInfo, turnContext: TurnContext, next: () => Promise<void>): Promise<void> => {
                let newMembers: string = '';
                console.log(JSON.stringify(membersAdded));
                membersAdded.forEach((account) => {
                    newMembers += account.id + ' ';
                });
                const name = !teamInfo ? 'not in team' : teamInfo.name;
                const card = CardFactory.heroCard('Account Added', `${newMembers} joined ${name}.`);
                const message = MessageFactory.attachment(card);
                // Sends a message activity to the sender of the incoming activity.
                await turnContext.sendActivity(message);
                await next();
        });
    }
}

```

# [JSON](#tab/json)

[SDK reference](/microsoftteams/platform/bots/how-to/conversations/subscribe-to-conversation-events?tabs=json#members-added)

The message your bot receives when the bot is added to a team.

> [!NOTE]
> In this payload, `conversation.id` and `channelData.settings.selectedChannel.id` will be the id of the channel that the user selected during app installation or where installation was triggered from.

```json
{
    "type": "conversationUpdate",
    "membersAdded": [
        {
            "id": "28:608cacfd-1cea-40c9-b678-4b93e69bb72b"
        }
    ],
    "timestamp": "2021-12-07T22:34:56.534Z",
    "id": "f:0b9079f4-d4d3-3d8e-b883-798298053c7e",
    "channelId": "msteams",
    "serviceUrl": "https://smba.trafficmanager.net/amer/",
    "from": {
        "id": "29:1ljv6N86roXr5pjPrCJVIz6xHh5QxjI....",
        "aadObjectId": "eddfa9d4-346e-4cce-a18f-fa6261ad776b"
    },
    "conversation": {
        "isGroup": true,
        "conversationType": "channel",
        "tenantId": "b28fdbfd-2b78-4f93-b0f8-8881793f0f8f",
        "id": "19:0b7f32667e064dd9b25d7969801541f4@thread.tacv2",
        "name": "2021 Test Channel"
    },
    "recipient": {
        "id": "28:608cacfd-1cea-40c9-b678-4b93e69bb72b",
        "name": "Test Bot"
    },
    "channelData": {
        "settings": {
            "selectedChannel": {
                "id": "19:0b7f32667e064dd9b25d7969801541f4@thread.tacv2"
            }
        },
        "team": {
            "aadGroupId": "f3ec8cd2-e704-4344-8c47-9a3a21d683c0",
            "name": "TestTeam2022",
            "id": "19:zFLSDFWsesfzcmKArqKJ-65aOXJz@sgf462H2wz41@thread.tacv2"
        },
        "eventType": "teamMemberAdded",
        "tenant": {
            "id": "b28fdbfd-2b78-4f93-b0f8-8881793f0f8f"
        }
    }
}
```

The message your bot receives when the bot is added to a one-to-one chat.

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

# [Python](#tab/python)

* [SDK reference](/python/api/botbuilder-core/botbuilder.core.teams.teamsactivityhandler?view=botbuilder-py-latest#botbuilder-core-teams-teamsactivityhandler-on-teams-members-added&preserve-view=true)

```python
async def on_teams_members_added(
 self, teams_members_added: [TeamsChannelAccount], turn_context: TurnContext
):
 for member in teams_members_added:
.. # Sends a message activity to the sender of the incoming activity.
  await turn_context.send_activity(
   MessageFactory.text(f"Welcome your new team member {member.id}")
  )
 return
```

---

### Members removed

A member removed event is sent to your bot in the following scenarios:

1. When the bot, itself, is uninstalled and removed from a conversation.
2. When a user is removed from a conversation where the bot is installed.

The member removed activity `eventType` is set to `teamMemberRemoved` when the event is sent from a team context. To determine if the new member removed was the bot itself or a user, check the `Activity` object of the `turnContext`. If the `MembersRemoved` list contains an object where `id` is the same as the `id` field of the `Recipient` object, then the member added is the bot, else it's a user. The bot's id is formatted as `28:<MicrosoftAppId>`.

> [!NOTE]
> When a user is permanently deleted from a tenant, `membersRemoved conversationUpdate` event is triggered.

The following code shows an example of team members removed event:

# [C#](#tab/dotnet)

* [SDK reference](/dotnet/api/microsoft.bot.builder.teams.teamsactivityhandler.onteamsmembersremovedasync?view=botbuilder-dotnet-stable&preserve-view=true)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/msteams-application-qbot/Source/Microsoft.Teams.Apps.QBot.Web/Bot/BotActivityHandler.cs#L157)

```csharp
protected override async Task OnTeamsMembersRemovedAsync(IList<ChannelAccount> membersRemoved, TeamInfo teamInfo, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
{
    foreach (TeamsChannelAccount member in membersRemoved)
    {
        if (member.Id == turnContext.Activity.Recipient.Id)
        {
            // The bot was removed.
            // You should clear any cached data you have for this team.
        }
        else
        {
            var heroCard = new HeroCard(text: $"{member.Name} was removed from {teamInfo.Name}");
            // Sends an activity to the sender of the incoming activity.
            await turnContext.SendActivityAsync(MessageFactory.Attachment(heroCard.ToAttachment()), cancellationToken);
        }
    }
}

```

# [TypeScript](#tab/typescript)

[SDK reference](/javascript/api/botbuilder/teamsactivityhandler?view=botbuilder-ts-latest#botbuilder-teamsactivityhandler-onteamsmembersremovedevent&preserve-view=true)

```typescript
export class MyBot extends TeamsActivityHandler {
    constructor() {
        super();
        this.onTeamsMembersRemovedEvent(async (membersRemoved: ChannelAccount[], teamInfo: TeamInfo, turnContext: TurnContext, next: () => Promise<void>): Promise<void> => {
            let removedMembers: string = '';
            console.log(JSON.stringify(membersRemoved));
            membersRemoved.forEach((account) => {
                removedMembers += account.id + ' ';
            });
            const name = !teamInfo ? 'not in team' : teamInfo.name;
            const card = CardFactory.heroCard('Account Removed', `${removedMembers} removed from ${teamInfo.name}.`);
            const message = MessageFactory.attachment(card);
            // Sends a message activity to the sender of the incoming activity.
            await turnContext.sendActivity(message);
            await next();
        });
    }
}

```

# [JSON](#tab/json)

[SDK reference](/microsoftteams/platform/bots/how-to/conversations/subscribe-to-conversation-events?tabs=json#members-removed)

The `channelData` object in the following payload example is based on adding a member to a team rather than a group chat, or initiating a new one-to-one conversation:

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

# [Python](#tab/python)

* [SDK  reference](/python/api/botbuilder-core/botbuilder.core.teams.teamsactivityhandler?view=botbuilder-py-latest#botbuilder-core-teams-teamsactivityhandler-on-teams-members-removed&preserve-view=true)

```python
async def on_teams_members_removed(
 self, teams_members_removed: [TeamsChannelAccount], turn_context: TurnContext
):
 for member in teams_members_removed:
..# Sends a message activity to the sender of the incoming activity.
  await turn_context.send_activity(
   MessageFactory.text(f"Say goodbye to {member.id}")
  )
 return
```

---

### Team renamed

Your bot is notified when the team is renamed. It receives a `conversationUpdate` event with `eventType.teamRenamed` in the `channelData` object.

The following code shows an example of team renamed event:

# [C#](#tab/dotnet)

* [SDK reference](/dotnet/api/microsoft.bot.builder.teams.teamsactivityhandler.onteamsteamrenamedasync?view=botbuilder-dotnet-stable#definition&preserve-view=true)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/csharp/Bots/TeamsConversationBot.cs#L370)

```csharp
protected override async Task OnTeamsTeamRenamedAsync(TeamInfo teamInfo, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
{
    var heroCard = new HeroCard(text: $"{teamInfo.Name} is the new Team name");
    // Sends an activity to the sender of the incoming activity.
    await turnContext.SendActivityAsync(MessageFactory.Attachment(heroCard.ToAttachment()), cancellationToken);
}
```

# [TypeScript](#tab/typescript)

* [SDK reference](/javascript/api/botbuilder/teamsactivityhandler?view=botbuilder-ts-latest#botbuilder-teamsactivityhandler-onteamsteamrenamedevent&preserve-view=true)

```typescript
export class MyBot extends TeamsActivityHandler {
    constructor() {
        super();
        // Bot is notified when the team is renamed.
        this.onTeamsTeamRenamedEvent(async (teamInfo: TeamInfo, turnContext: TurnContext, next: () => Promise<void>): Promise<void> => {
            const card = CardFactory.heroCard('Team Renamed', `${teamInfo.name} is the new Team name`);
            const message = MessageFactory.attachment(card);

            // Sends an activity to the sender of the incoming activity.
            await turnContext.sendActivity(message);
            await next();
        });
    }
}
```

# [JSON](#tab/json)

* [SDK reference](/microsoftteams/platform/bots/how-to/conversations/subscribe-to-conversation-events?tabs=json#team-renamed)

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

# [Python](#tab/python)

* [SDK reference](/python/api/botbuilder-core/botbuilder.core.teams.teamsactivityhandler?view=botbuilder-py-latest#botbuilder-core-teams-teamsactivityhandler-on-teams-team-renamed&preserve-view=true)

```python
# Bot is notified when the team is renamed.
async def on_teams_team_renamed(
 self, team_info: TeamInfo, turn_context: TurnContext
):
 # Sends an activity to the sender of the incoming activity.
 return await turn_context.send_activity(
  MessageFactory.text(f"The new team name is {team_info.name}")
 )
```

---

### Team deleted

The bot receives a notification when the team is deleted. It receives a `conversationUpdate` event with `eventType.teamDeleted` in the `channelData` object.

The following code shows an example of team deleted event:

# [C#](#tab/dotnet)

* [SDK reference](/dotnet/api/microsoft.bot.builder.teams.teamsactivityhandler.onteamsteamdeletedasync?view=botbuilder-dotnet-stable#definition&preserve-view=true)

```csharp
protected override async Task OnTeamsTeamDeletedAsync(TeamInfo teamInfo, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
{
    // Handle delete event.
}
```

# [TypeScript](#tab/typescript)

* [SDK reference](/javascript/api/botbuilder/teamsactivityhandler?view=botbuilder-ts-latest#botbuilder-teamsactivityhandler-onteamsteamdeletedevent&preserve-view=true)

```typescript
export class MyBot extends TeamsActivityHandler {
    constructor() {
        super();
        // Invoked when a Team Deleted event activity is received from the connector. Team Deleted corresponds to the user deleting a team.
        this.onTeamsTeamDeletedEvent(async (teamInfo: TeamInfo, turnContext: TurnContext, next: () => Promise<void>): Promise<void> => {
            // Handle delete event.
            await next();
        });
    }
}
```

# [JSON](#tab/json)

* [SDK reference](/microsoftteams/platform/bots/how-to/conversations/subscribe-to-conversation-events?tabs=json#team-deleted)

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
            "name": "Team Name"
        },
        "eventType": "teamDeleted",
        "tenant": { 
           "id": "72f988bf-86f1-41af-91ab-2d7cd011db47"
        }
    }
}
```

# [Python](#tab/python)

* [SDK reference](/python/api/botbuilder-core/botbuilder.core.teams.teamsactivityhandler?view=botbuilder-py-latest#botbuilder-core-teams-teamsactivityhandler-on-teams-team-deleted&preserve-view=true)

```python
# Invoked when a Team Deleted event activity is received from the connector. Team Deleted corresponds to the user deleting a team.
async def on_teams_team_deleted(
 self, team_info: TeamInfo, turn_context: TurnContext
):
 # Handle delete event.
 )
```

---

### Team restored

The bot receives a notification when a team is restored after being deleted. It receives a `conversationUpdate` event with `eventType.teamrestored` in the `channelData` object.

The following code shows an example of team restored event:

# [C#](#tab/dotnet)

* [SDK reference](/dotnet/api/microsoft.bot.builder.teams.teamsactivityhandler.onteamsteamrestoredasync?view=botbuilder-dotnet-stable#definition&preserve-view=true)

```csharp
protected override async Task OnTeamsTeamrestoredAsync(TeamInfo teamInfo, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
{
    var heroCard = new HeroCard(text: $"{teamInfo.Name} is the team name");
    // Sends an activity to the sender of the incoming activity.
    await turnContext.SendActivityAsync(MessageFactory.Attachment(heroCard.ToAttachment()), cancellationToken);
}
```

# [TypeScript](#tab/typescript)

* [SDK reference](/javascript/api/botbuilder/teamsactivityhandler?view=botbuilder-ts-latest#botbuilder-teamsactivityhandler-onteamsteamrestoredevent&preserve-view=true)

```typescript
export class MyBot extends TeamsActivityHandler {
    constructor() {
        super();
        // Invoked when a Team Restored event activity is received from the connector. Team Restored corresponds to the user restoring a team.
        this.onTeamsTeamrestoredEvent(async (teamInfo: TeamInfo, turnContext: TurnContext, next: () => Promise<void>): Promise<void> => {
            const card = CardFactory.heroCard('Team restored', `${teamInfo.name} is the team name`);
            const message = MessageFactory.attachment(card);
            // Sends an activity to the sender of the incoming activity.
            await turnContext.sendActivity(message);
            await next();
        });
    }
}
```

# [JSON](#tab/json)

* [SDK reference](/microsoftteams/platform/bots/how-to/conversations/subscribe-to-conversation-events?tabs=json#team-restored)

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
            "name": "Team Name"
        },
        "eventType": "teamrestored",
        "tenant": { 
           "id": "72f988bf-86f1-41af-91ab-2d7cd011db47"
        }
    }
}
```

# [Python](#tab/python)

* [SDK reference](/python/api/botbuilder-core/botbuilder.core.teams.teamsactivityhandler?view=botbuilder-py-latest#botbuilder-core-teams-teamsactivityhandler-on-teams-team-restored&preserve-view=true)

```python
# Invoked when a Team Restored event activity is received from the connector. Team Restored corresponds to the user restoring a team.
async def on_teams_team_restored(
 self, team_info: TeamInfo, turn_context: TurnContext
):
 # Sends an activity to the sender of the incoming activity.
 return await turn_context.send_activity(
  MessageFactory.text(f"The team name is {team_info.name}")
 )
```

---

### Team archived

The bot receives a notification when the team is installed and archived. It receives a `conversationUpdate` event with `eventType.teamarchived` in the `channelData` object.

The following code shows an example of team archived event:

# [C#](#tab/dotnet)

* [SDK reference](/dotnet/api/microsoft.bot.builder.teams.teamsactivityhandler.onteamsteamarchivedasync?view=botbuilder-dotnet-stable#definition&preserve-view=true)

```csharp
protected override async Task OnTeamsTeamArchivedAsync(TeamInfo teamInfo, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
{
    var heroCard = new HeroCard(text: $"{teamInfo.Name} is the team name");
     // Sends an activity to the sender of the incoming activity.
    await turnContext.SendActivityAsync(MessageFactory.Attachment(heroCard.ToAttachment()), cancellationToken);
}
```

# [TypeScript](#tab/typescript)

* [SDK reference](/javascript/api/botbuilder/teamsactivityhandler?view=botbuilder-ts-latest#botbuilder-teamsactivityhandler-onteamsteamarchivedevent&preserve-view=true)

```typescript
export class MyBot extends TeamsActivityHandler {
    constructor() {
        super();
        // Invoked when a Team Archived event activity is received from the connector. Team Archived.
        this.onTeamsTeamArchivedEvent(async (teamInfo: TeamInfo, turnContext: TurnContext, next: () => Promise<void>): Promise<void> => {
            const card = CardFactory.heroCard('Team archived', `${teamInfo.name} is the team name`);
            const message = MessageFactory.attachment(card);
             // Sends an activity to the sender of the incoming activity.
            await turnContext.sendActivity(message);
            await next();
        });
    }
}
```

# [JSON](#tab/json)

* [SDK reference](/microsoftteams/platform/bots/how-to/conversations/subscribe-to-conversation-events?tabs=json#team-archived)

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
            "name": "Team Name"
        },
        "eventType": "teamArchived",
        "tenant": { 
           "id": "72f988bf-86f1-41af-91ab-2d7cd011db47"
        }
    }
}
```

# [Python](#tab/python)

* [SDK reference](/python/api/botbuilder-core/botbuilder.core.teams.teamsactivityhandler?view=botbuilder-py-latest#botbuilder-core-teams-teamsactivityhandler-on-teams-team-archived&preserve-view=true)

```python
# Invoked when a Team Archived event activity is received from the connector. Team Archived correspond to the user archiving a team.
async def on_teams_team_archived(
 self, team_info: TeamInfo, turn_context: TurnContext
):
 # Sends an activity to the sender of the incoming activity.
 return await turn_context.send_activity(
  MessageFactory.text(f"The team name is {team_info.name}")
 )
```

---

### Team unarchived

The bot receives a notification when the team is installed and unarchived. It receives a `conversationUpdate` event with `eventType.teamUnarchived` in the `channelData` object.

The following code shows an example of team unarchived event:

# [C#](#tab/dotnet)

* [SDK reference](/dotnet/api/microsoft.bot.builder.teams.teamsactivityhandler.onteamsteamunarchivedasync?view=botbuilder-dotnet-stable#definition&preserve-view=true)

```csharp
protected override async Task OnTeamsTeamUnarchivedAsync(TeamInfo teamInfo, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
{
    var heroCard = new HeroCard(text: $"{teamInfo.Name} is the team name");
    // Sends an activity to the sender of the incoming activity.
    await turnContext.SendActivityAsync(MessageFactory.Attachment(heroCard.ToAttachment()), cancellationToken);
}
```

# [TypeScript](#tab/typescript)

* [SDK reference](/javascript/api/botbuilder/teamsactivityhandler?view=botbuilder-ts-latest#botbuilder-teamsactivityhandler-onteamsteamunarchivedevent&preserve-view=true)

```typescript
export class MyBot extends TeamsActivityHandler {
    constructor() {
        super();
        // Invoked when a Team Unarchived event activity is received from the connector. Team.
        this.onTeamsTeamUnarchivedEvent(async (teamInfo: TeamInfo, turnContext: TurnContext, next: () => Promise<void>): Promise<void> => {
            const card = CardFactory.heroCard('Team archived', `${teamInfo.name} is the team name`);
            const message = MessageFactory.attachment(card);
            // Sends an activity to the sender of the incoming activity.
            await turnContext.sendActivity(message);
            await next();
        });
    }
}
```

# [JSON](#tab/json)

* [SDK reference](/microsoftteams/platform/bots/how-to/conversations/subscribe-to-conversation-events?tabs=json#team-unarchived)

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
            "name": "Team Name"
        },
        "eventType": "teamUnarchived",
        "tenant": { 
           "id": "72f988bf-86f1-41af-91ab-2d7cd011db47"
        }
    }
}
```

# [Python](#tab/python)

* [SDK reference](/python/api/botbuilder-core/botbuilder.core.teams.teamsactivityhandler?view=botbuilder-py-latest#botbuilder-core-teams-teamsactivityhandler-on-teams-team-unarchived&preserve-view=true)

```python
# Invoked when a Team Unarchived event activity is received from the connector. Team Unarchived correspond to the user unarchiving a team.
async def on_teams_team_unarchived(
 self, team_info: TeamInfo, turn_context: TurnContext
):
# Sends an activity to the sender of the incoming activity.
 return await turn_context.send_activity(
  MessageFactory.text(f"The team name is {team_info.name}")
 )
```

---

Now that you've worked with the conversation update events, you can understand the message reaction events that occur for different reactions to a message.

## Message reaction events

The `messageReaction` event is sent when a user adds or removes reactions to a message, which was sent by your bot. The `replyToId` contains the ID of the message, and the `Type` is the type of reaction in text format. The types of reactions include angry, heart, laugh, like, sad, and surprised. This event doesn't contain the contents of the original message. If processing reactions to your messages is important for your bot, you must store the messages when you send them. The following table provides more information about the event type and payload objects:

| EventType       | Payload object   | Description                                                             | Scope |
| --------------- | ---------------- | ----------------------------------------------------------------------- | ----- |
| messageReaction | reactionsAdded   | [Reactions added to bot message](#reactions-added-to-bot-message).           | All   |
| messageReaction | reactionsRemoved | [Reactions removed from bot message](#reactions-removed-from-bot-message). | All |

### Reactions added to bot message

The following code shows an example of reactions to a bot message:

# [C#](#tab/dotnet)

* [SDK reference](/dotnet/api/microsoft.bot.builder.activityhandler.onreactionsaddedasync?view=botbuilder-dotnet-stable#definition&preserve-view=true)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-message-reaction/csharp/Bots/MessageReactionBot.cs#L26)

```csharp
protected override async Task OnReactionsAddedAsync(IList<MessageReaction> messageReactions, ITurnContext<IMessageReactionActivity> turnContext, CancellationToken cancellationToken)
{
    foreach (var reaction in messageReactions)
    {
      var newReaction = $"You reacted with '{reaction.Type}' to the following message: '{turnContext.Activity.ReplyToId}'";
      var replyActivity = MessageFactory.Text(newReaction);
      // Sends an activity to the sender of the incoming activity.
      var resourceResponse = await turnContext.SendActivityAsync(replyActivity, cancellationToken);
    }
}
```

# [TypeScript](#tab/typescript)

* [SDK reference](/javascript/api/botbuilder-core/activityhandler?view=botbuilder-ts-latest#botbuilder-core-activityhandler-onreactionsadded&preserve-view=true)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/nodejs/bots/teamsConversationBot.js#L55)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/nodejs/bots/teamsConversationBot.js#L55)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/nodejs/bots/teamsConversationBot.js#L55)

<!-- Verify -->

```typescript

export class MyBot extends TeamsActivityHandler {
    constructor() {
        super();
         // Override this in a derived class to provide logic for when reactions to a previous activity.
        this.onReactionsAdded(async (context, next) => {
           const reactionsAdded = context.activity.reactionsAdded;
            if (reactionsAdded && reactionsAdded.length > 0) {
                for (let i = 0; i < reactionsAdded.length; i++) {
                    const reaction = reactionsAdded[i];
                    const newReaction = `You reacted with '${reaction.type}' to the following message: '${context.activity.replyToId}'`;
                    // Sends an activity to the sender of the incoming activity.
                    const resourceResponse = context.sendActivity(newReaction);
                    // Save information about the sent message and its ID (resourceResponse.id).
                }
            }
        });
    }
}
```

# [JSON](#tab/json)

* [SDK reference](/microsoftteams/platform/bots/how-to/conversations/subscribe-to-conversation-events?tabs=json#reactions-added-to-bot-message)

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
    "replyToId": "1575667808184",
    "legacy": {
      "replyToId": "1:19uJ8TZA1cZcms7-2HLOW3pWRF4nSWEoVnRqc0DPa_kY"
    }
}
```

# [Python](#tab/python)

* [SDK reference](/python/api/botbuilder-core/botbuilder.core.activityhandler?view=botbuilder-py-latest#botbuilder-core-activityhandler-on-reactions-added&preserve-view=true)

```python
# Override this in a derived class to provide logic for when reactions to a previous activity are added to the conversation.
async def on_reactions_added(
 self, message_reactions: List[MessageReaction], turn_context: TurnContext
):
 for reaction in message_reactions:
  activity = await self._log.find(turn_context.activity.reply_to_id)
  if not activity:
    # Sends an activity to the sender of the incoming activity.
   await self._send_message_and_log_activity_id(
    turn_context,
    f"Activity {turn_context.activity.reply_to_id} not found in log",
   )
  else:
    # Sends an activity to the sender of the incoming activity.
   await self._send_message_and_log_activity_id(
    turn_context,
    f"You added '{reaction.type}' regarding '{activity.text}'",
   )
 return
```

---

### Reactions removed from bot message

The following code shows an example of reactions removed from bot message:

# [C#](#tab/dotnet)

* [SDK reference](/dotnet/api/microsoft.bot.builder.activityhandler.onreactionsremovedasync?view=botbuilder-dotnet-stable#definition&preserve-view=true)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-message-reaction/csharp/Bots/MessageReactionBot.cs#L44)

```csharp
protected override async Task OnReactionsRemovedAsync(IList<MessageReaction> messageReactions, ITurnContext<IMessageReactionActivity> turnContext, CancellationToken cancellationToken)
{
    foreach (var reaction in messageReactions)
    {
      var newReaction = $"You removed the reaction '{reaction.Type}' from the following message: '{turnContext.Activity.ReplyToId}'";

      var replyActivity = MessageFactory.Text(newReaction);
      // Sends an activity to the sender of the incoming activity.
      var resourceResponse = await turnContext.SendActivityAsync(replyActivity, cancellationToken);
    }
}
```

# [TypeScript](#tab/typescript)

* [SDK reference](/javascript/api/botbuilder-core/activityhandler?view=botbuilder-ts-latest#botbuilder-core-activityhandler-onreactionsremoved&preserve-view=true)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/nodejs/bots/teamsConversationBot.js#L63)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/nodejs/bots/teamsConversationBot.js#L63)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/nodejs/bots/teamsConversationBot.js#L63)

<!-- Verify -->

```typescript
export class MyBot extends TeamsActivityHandler {
    constructor() {
        super();
         // Override this in a derived class to provide logic for when reactions to a previous activity.
        this.onReactionsRemoved(async(context,next)=>{
            const reactionsRemoved = context.activity.reactionsRemoved;
            if (reactionsRemoved && reactionsRemoved.length > 0) {
                for (let i = 0; i < reactionsRemoved.length; i++) {
                    const reaction = reactionsRemoved[i];
                    const newReaction = `You removed the reaction '${reaction.type}' from the message: '${context.activity.replyToId}'`;
                     // Sends an activity to the sender of the incoming activity.
                    const resourceResponse = context.sendActivity(newReaction);
                    // Save information about the sent message and its ID (resourceResponse.id).
                }
            }
        });
    }
}
```

# [JSON](#tab/json)

* [SDK reference](/microsoftteams/platform/bots/how-to/conversations/subscribe-to-conversation-events?tabs=json#reactions-removed-from-bot-message)

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
    "replyToId": "1575667808184",
    "legacy": {
      "replyToId": "1:19uJ8TZA1cZcms7-2HLOW3pWRF4nSWEoVnRqc0DPa_kY"
    }
}
```

# [Python](#tab/python)

* [SDK reference](/python/api/botbuilder-core/botbuilder.core.activityhandler?view=botbuilder-py-latest#botbuilder-core-activityhandler-on-reactions-removed&preserve-view=true)

```python
# Override this in a derived class to provide logic specific to removed activities.
async def on_reactions_removed(
 self, message_reactions: List[MessageReaction], turn_context: TurnContext
):
 for reaction in message_reactions:
  activity = await self._log.find(turn_context.activity.reply_to_id)
  if not activity:
    # Sends an activity to the sender of the incoming activity.
   await self._send_message_and_log_activity_id(
    turn_context,
    f"Activity {turn_context.activity.reply_to_id} not found in log",
   )
  else:
    # Sends an activity to the sender of the incoming activity.
   await self._send_message_and_log_activity_id(
    turn_context,
    f"You removed '{reaction.type}' regarding '{activity.text}'",
   )
 return
```

---

## Installation update event

The bot receives an `installationUpdate` event when you install a bot to a conversation thread. Uninstallation of the bot from the thread also triggers the event. On installing a bot, the **action** field in the event is set to *add*, and when the bot is uninstalled the **action** field is set to *remove*.

> [!NOTE]
> When you upgrade an application, the bot receives the `installationUpdate` event only to add or remove a bot from the manifest. For all other cases, the `installationUpdate` event isn't triggered. The **action** field is set to *add-upgrade* if you add a bot or *remove-upgrade* if you remove a bot.

### Install update event

Use the `installationUpdate` event to send an introductory message from your bot on installation. This event helps you to meet your privacy and data retention requirements. You can also clean up and delete user or thread data when the bot is uninstalled.

Similar to the `conversationUpdate` event that's sent when bot is added to a team, the conversation.id of the `installationUpdate` event is set to the id of the channel selected by a user during app installation or the channel where the installation occurred. The id represents the channel where the user intends for the bot to operate and must be used by the bot when sending a welcome message. For scenarios where the ID of the General channel is explicitly required, you can get it from `team.id` in `channelData`.

In this example, the `conversation.id` of the `conversationUpdate` and `installationUpdate` activities will be set to the ID of the Response channel in the Daves Demo team.

![Create a selected channel](~/assets/videos/addteam.gif)

> [!NOTE]
> The selected channel id is only set on `installationUpdate` *add* events that are sent when an app is installed into a team.

# [C#](#tab/dotnet)

* [SDK reference](/dotnet/api/microsoft.bot.builder.activityhandler.oninstallationupdateactivityasync?view=botbuilder-dotnet-stable#microsoft-bot-builder-activityhandler-oninstallationupdateactivityasync(microsoft-bot-builder-iturncontext((microsoft-bot-schema-iinstallationupdateactivity))-system-threading-cancellationtoken)&preserve-view=true)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/csharp/Bots/TeamsConversationBot.cs#L73)

```csharp
protected override async Task OnInstallationUpdateActivityAsync(ITurnContext<IInstallationUpdateActivity> turnContext, CancellationToken cancellationToken)
{
    var activity = turnContext.Activity;
    if (string.Equals(activity.Action, "Add", StringComparison.InvariantCultureIgnoreCase))
    {
        // TO:DO Installation workflow.
    }
    else
    {
        // TO:DO Uninstallation workflow.
    }
    return;
}
```

You can also use a dedicated handler for *add* or *remove* scenarios as an alternative method to capture an event.

```csharp
protected override async Task OnInstallationUpdateAddAsync(ITurnContext<IInstallationUpdateActivity> turnContext, CancellationToken cancellationToken)
{
    // TO:DO Installation workflow return;
}
```

# [TypeScript](#tab/typescript)

* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/nodejs/bots/teamsConversationBot.js#L72-L78)

```typescript
async onInstallationUpdateActivity(context: TurnContext) {
        var activity = context.activity.action;
        if(activity == "Add") {
            // Sends an activity to the sender of the incoming activity to add.
            await context.sendActivity(MessageFactory.text("Added"));
        }
        else {
            // Sends an activity to the sender of the incoming activity to uninstalled.
            await context.sendActivity(MessageFactory.text("Uninstalled"));
        }
    }
```

# [JSON](#tab/json)

* [SDK reference](/microsoftteams/platform/bots/how-to/conversations/subscribe-to-conversation-events?tabs=json#install-update-event)

```json
{
    {
    "type": "installationUpdate",
    "id": "f:816eb23d-bfa1-afa3-dfeb-d2aa338e9541",
    "timestamp": "2021-11-09T04:47:30.91Z",
    "serviceUrl": "https://smba.trafficmanager.net/amer/",
    "channelId": "msteams",
    "from": {
        "id": "29:1ljv6N86roXr5pjPrCJVIz6xHh5QxjI....",
        "aadObjectId": "eddfa9d4-346e-4cce-a18f-fa6261ad776b"
    },
    "recipient": {
        "id": "28:608cacfd-1cea-40c9-b678-4b93e69bb72b",
        "name": "Test Bot"
    },
    "locale": "en-US",
    "entities": [
        {
            "type": "clientInfo",
            "locale": "en-US"
        }
    ],
    "conversation": {
        "isGroup": true,
        "id": "19:0b7f32667e064dd9b25d7969801541f4@thread.tacv2",
        "name": "2021 Test Channel",
        "conversationType": "channel",
        "tenantId": "b28fdbfd-2b78-4f93-b0f8-8881793f0f8f"
    },
    "channelData": {
        "settings": {
            "selectedChannel": {
                "id": "19:0b7f32667e064dd9b25d7969801541f4@thread.tacv2"
            }
        },
        "channel": {
            "id": "19:0b7f32667e064dd9b25d7969801541f4@thread.tacv2"
        },
        "team": {
            "aadGroupId": "da849743-4259-475f-ae7a-4f4b0fb49943",
            "name": "TestTeam2022",
            "id": "19:zFLSDFWsesfzcmKArqKJ-65aOXJz@sgf462H2wz41@thread.tacv2"
        },
        "tenant": {
            "id": "b28fdbfd-2b78-4f93-b0f8-8881793f0f8f"
        },
        "source": {
            "name": "message"
        }
    },
    "action": "add"
    }
```

# [Python](#tab/python)

* [SDK reference](/python/api/botbuilder-core/botbuilder.core.activityhandler?view=botbuilder-py-latest#botbuilder-core-activityhandler-on-installation-update&preserve-view=true)

```python
# Override this in a derived class to provide logic specific to InstallationUpdate activities.
async def on_installation_update(self, turn_context: TurnContext):
   if turn_context.activity.action == "add": 
        # Sends an activity to the sender of the incoming activity to add.
       await turn_context.send_activity(MessageFactory.text("Added"))
   else:
        # Sends an activity to the sender of the incoming activity to uninstalled.
       await turn_context.send_activity(MessageFactory.text("Uninstalled"))
```

---

## Uninstall behavior for personal app with bot

When you uninstall an app, the bot is also uninstalled. When a user sends a message to your app, they receive a 403 response code. Your bot receives a 403 response code for new messages posted by your bot. The post uninstall behavior for bots in the personal scope with the Teams and groupChat scopes are now aligned. You can't send or receive messages after an app has been uninstalled.

:::image type="content" source="../../../assets/images/bots/uninstallbot.png" alt-text="Uninstall response code"lightbox="../../../assets/images/bots/uninstallbot.png"border="true":::

## Event handling for install and uninstall events

When you use these install and uninstall events, there are some instances where bots give exceptions on receiving unexpected events from Teams, which occurs in the following cases:

* You build your bot without the Microsoft Bot Framework SDK, and as a result the bot gives an exception on receiving an unexpected event.
* You build your bot with the Microsoft Bot Framework SDK, and you select to alter the default event behavior by overriding the base event handle.

It's important to know that new events can be added anytime in the future and your bot begins to receive them. So you must design for the possibility of receiving unexpected events. If you're using the Bot Framework SDK, your bot automatically responds with a 200 – OK to any events you don't choose to handle.

## Handling errors in conversation events

When a bot encounters an error while handling different events or activities, don't send messages that have no meaningful context to the conversation as shown in the following screenshot:

:::image type="content" source="../../../assets/images/handling-error.png" alt-text="Screenshot shows you the error message response in bot conversation.":::

In the development phase, it's always helpful to send meaningful messages in conversations, which provide additional details about a specific error for better debugging. However, in the production environment, you must log the errors or events to Azure Application Insights. For more information, see [Add telemetry to your bot](https://aka.ms/bottelemetry).

## Code sample

| **Sample Name** | **Description** | **.NET** | **Node.js** | **Python** | **Manifest**
|---------------|--------------|--------|-------------|--------|--------|
| Conversation bot | This sample shows how to use different bot conversation events available in Bot Framework v4 for personal and teams scope. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/csharp)  | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/python) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/csharp/demo-manifest/bot-conversation.zip)

## Next step

> [!div class="nextstepaction"]
> [Send proactive messages](~/bots/how-to/conversations/send-proactive-messages.md)

## See also

* [Build bots for Teams](../../what-are-bots.md)
* [API reference for the Bot Framework Connector service](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference)
* [Channel and group chat conversations with a bot](channel-and-group-conversations.md)
* [Receive all conversation messages with RSC](channel-messages-with-rsc.md)
* [Create Teams conversation bot](../../../sbs-teams-conversation-bot.yml)
* [Triggers in Bot Framework Composer](/composer/concept-events-and-triggers)
