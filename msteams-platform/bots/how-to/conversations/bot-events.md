---
title: Event-driven conversations with activity handlers
author: surbhigupta
description: Learn about Microsoft Teams events, activity handlers and invoke activities for bot messages, channels, teams, members, mentions, auth, card actions using Microsoft Bot Framework SDK.
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: v-npaladugu
ms.date: 03/04/2024
---

# Event-driven conversations with activity handlers

Events and handlers are two related concepts in a bot workflow. A bot receives event notifications from handlers, allowing users to communicate with the bot through the activity handler.

* **Event**: Event in bot workflow depicts an activity that triggers the bot to perform a certain action or task.

* **Activity handlers**: Activity handlers are functions or methods that contain the bot logic for how the bot handles different types of events.

When an event occurs, activity handlers can identify the activity and forward it to the bot logic for processing.

:::image type="content" source="~/assets/images/bots/bot-event-activity-flowchart.png" alt-text="Diagram that shows the flow of the event flow from activity handlers to bot logic." lightbox="~/assets/images/bots/bot-event-activity-flowchart.png":::

`{Image is a place holder will share it for development as per design standards post SME approval}`

The following table outlines which communication concept to use in different scenarios:

|Comunication flow| Concept| Description |
|---|---| --- |
| User **->** Bot| [Event activity handler](#event-activity-handlers) |Event activity handlers are used when you want your bot to be notified when a user performs an event.|
| User **<->** Bot| [Invoke activity handler + Invoke activities](~/bots/how-to/conversations/bot-invoke-activity.md)| Invoke activity handlers are used when you want your bot to be notified when a user performs an event and respond back to the user based on the event through invoke activities.|

To create event-driven conversations, you must define the associated handlers that the bot will use with the event.

## Event activity handlers

Each activity type, or subtype, signifies a unique conversational event. The bots turn handler, which is responsible for managing the flow of conversation, triggers the specific activity handler based on the activity type. For example, when the bot receives a message activity, the turn handler identifies the activity and forwards it to the `onMessageActivity` handler. You can use the `onMessageActivity` handler to place your logic for managing and responding to messages.

```csharp
protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
{
  // Sends an activity to the sender of the incoming activity.
  await turnContext.SendActivityAsync(MessageFactory.Text($"Echo: {turnContext.Activity.Text}"), cancellationToken);
}
```

Teams activity handler is derived from [Bot Framework's activity handler](#bot-framework-activity-handler). The two primary Teams activity handlers are as follows:

* `OnConversationUpdateActivityAsync`: Routes all the conversation update activities.
* `OnInvokeActivityAsync`: Routes all Teams [invoke activities](~/bots/how-to/conversations/bot-invoke-activity.md).

## Conversation update events

You can use conversation update events to provide better notifications and effective bot actions. You can add new events any time and your bot begins to receive them. You must design your bot to receive unexpected events. If you're using the Bot Framework SDK without specifying any activity handlers in your bot code, your bot automatically responds with a `200 - OK` to any events you choose not to handle.

A bot receives a `conversationUpdate` event in any of the following scenarios:

* When bot is added to a conversation.
* Other members are added or removed in a conversation or channel.
* Conversation metadata is changed.

> [!NOTE]
> When an Azure Communication Services (ACS) client joins or leaves the Teams meeting, no conversation update events are triggered.

The following are different type of events associated with `conversationUpdate`:

| Events| Description| Scope |
|----| ------|----|
| [Installation events](#installation-events)| A bot is installed or uninstalled.| All |
| [Message events](~/bots/how-to/conversations/conversation-messages.md)| A message is sent, edited, deleted, restored, or reacted.| All |
| [Channel events](#channel-events)| A channel is created, renamed, deleted, or restored.| Team |
| [Members events](#member-events)| A member is added or removed.| All |
| [Team events](#team-events)| A team is renamed, deleted, archived, unarchived, or restored.| Team |

## Installation events

The bot receives an `installationUpdate` event when you install or uninstall a bot in a conversation. On installing a bot, the `action` field in the event is set to `add`, and when the bot is uninstalled the `action` field is set to `remove`.

> [!NOTE]
> When you upgrade an application, the bot receives the `installationUpdate` event only to add or remove a bot from the manifest. For all other scenarios, the `installationUpdate` event isn't triggered. The **action** field is set to `add-upgrade` if you add a bot or `remove-upgrade` if you remove a bot.

When the bot receives an `installationUpdate` event, you can send an introductory message from your bot. This event helps you to meet your privacy and data retention requirements.

Similar to the `conversationUpdate` event that's sent when bot is added to a team, the conversation ID of the `installationUpdate` event is set to the ID of the channel selected by a user during app installation or the channel where the bot is installed. The conversation ID must be used by the bot when sending a welcome message. For scenarios where the ID of the default channel is explicitly required, you can get it from `team.id` in the `channelData` object.

In the following example, bot app is added to the **Response** channel in the **Daves Demo** team.
When the bot is added to the channel, `conversation.id` of the `conversationUpdate` and the `installationUpdate` activities are set to the ID of the **Response** channel in the **Daves Demo** team.

![Create a selected channel](~/assets/videos/addteam.gif)

`{WIP place holder}`

> [!NOTE]
> The selected channel ID is only set on `installationUpdate.add` events that are sent when an app is installed in a team.

# [C#](#tab/dotnet14)

* [SDK reference](/dotnet/api/microsoft.bot.builder.activityhandler.oninstallationupdateactivityasync?view=botbuilder-dotnet-stable#microsoft-bot-builder-activityhandler-oninstallationupdateactivityasync(microsoft-bot-builder-iturncontext((microsoft-bot-schema-iinstallationupdateactivity))-system-threading-cancellationtoken)&preserve-view=true)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/csharp/Bots/TeamsConversationBot.cs#L73)

```csharp
protected override async Task OnInstallationUpdateActivityAsync(ITurnContext<IInstallationUpdateActivity> turnContext, CancellationToken cancellationToken)
{
var activity = turnContext.Activity;
if (string.Equals(activity.Action, "Add", StringComparison.InvariantCultureIgnoreCase))
{
    //Installation workflow.
}
else
{
    // Uninstallation workflow.
}
return;
}
```

You can also use a dedicated handler for `add` or `remove` scenarios as an alternative method to capture an event.

```csharp
protected override async Task OnInstallationUpdateAddAsync(ITurnContext<IInstallationUpdateActivity> turnContext, CancellationToken cancellationToken)
{
    // Installation workflow return;
}
```

# [TypeScript](#tab/typescript14)

[Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/nodejs/bots/teamsConversationBot.js#L72-L78)

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

# [JSON](#tab/json14)

```json
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

# [Python](#tab/python14)

[SDK reference](/python/api/botbuilder-core/botbuilder.core.activityhandler?view=botbuilder-py-latest#botbuilder-core-activityhandler-on-installation-update&preserve-view=true)

```python
     # Override this in a derived class to provide logic specific to InstallationUpdate  activities.
     async def on_installation_update(self, turn_context: TurnContext):
     if turn_context.activity.action == "add": 
            # Sends an activity to the sender of the incoming activity to add.
        await turn_context.send_activity(MessageFactory.text("Added"))
     else:
            # Sends an activity to the sender of the incoming activity to uninstalled.
        await turn_context.send_activity(MessageFactory.text("Uninstalled"))
```

---

### Uninstall behavior for bot app

When you uninstall an app, the bot is also uninstalled. When a user sends a message to your app after the bot is uninstalled, the bot receives a `403` response code. You can also clean up and delete user or thread data when the bot is uninstalled. You can't send or receive messages after an app is uninstalled.

:::image type="content" source="~/assets/images/bots/uninstallbot.png" alt-text="Uninstall response code"lightbox="~/assets/images/bots/uninstallbot.png":::

`{WIP place holder}`

When you use the install and uninstall events, there are some instances where bots give exceptions on receiving unexpected events from Teams, which occurs in the following scenarios:

* If you build your bot without the Microsoft Bot Framework SDK, the bot gives an exception on receiving an unexpected event.

* You build your bot with the Microsoft Bot Framework SDK, and you alter the default event behavior by overriding the base event handler.

It's important to know that new events can be added anytime in the future and your bot begins to receive them. So you must design your bot for the possibility of receiving unexpected events.


## Channel events

Channel events are triggered for the following events:

* Channel created
* Channel renamed
* Channel deleted
* Channel restored

**Channel created**: The `channelCreated` event is sent to your bot whenever a new channel is created.

# [C#](#tab/dotnet1)

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

# [TypeScript](#tab/typescript1)

<!-- From sample: botbuilder-js\libraries\botbuilder\tests\teams\conversationUpdate\src\conversationUpdateBot.ts -->

[SDK reference](/javascript/api/botbuilder/teamsactivityhandler?view=botbuilder-ts-latest#botbuilder-teamsactivityhandler-onteamschannelcreatedevent&preserve-view=true)

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

# [JSON](#tab/json1)

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

# [Python](#tab/python1)

[SDK reference](/python/api/botbuilder-core/botbuilder.core.teams.teamsactivityhandler?view=botbuilder-py-latest#botbuilder-core-teams-teamsactivityhandler-on-teams-channel-created&preserve-view=true)

```python
async def on_teams_channel_created(
self, channel_info: ChannelInfo, team_info: TeamInfo, turn_context: TurnContext
):
# Sends a message activity to the sender of the incoming activity.
return await turn_context.send_activity(
MessageFactory.text(
"The new channel is {channel_info.name}. The channel id is {channel_info.id}"
)
)
```
---

**Channel renamed**: The `channelRenamed` event is sent to your bot whenever a channel is renamed.

# [C#](#tab/dotnet2)

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

# [TypeScript](#tab/typescript2)

[SDK reference](/javascript/api/botbuilder/teamsactivityhandler?view=botbuilder-ts-latest#botbuilder-teamsactivityhandler-onteamschannelrenamedevent&preserve-view=true)

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

# [JSON](#tab/json2)

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

# [Python](#tab/python2)

[SDK reference](/python/api/botbuilder-core/botbuilder.core.teams.teamsactivityhandler?view=botbuilder-py-latest#botbuilder-core-teams-teamsactivityhandler-on-teams-channel-renamed&preserve-view=true)

```python
async def on_teams_channel_renamed(
self, channel_info: ChannelInfo, team_info: TeamInfo, turn_context: TurnContext
):
return await turn_context.send_activity(
MessageFactory.text(f"The new channel name is {channel_info.name}")
)
```

---

**Channel deleted**: The `channelDeleted` event is sent to your bot, whenever a channel is deleted.

# [C#](#tab/dotnet3)

* [SDK reference](/dotnet/api/microsoft.bot.builder.teams.teamsactivityhandler.onteamschanneldeletedasync?view=botbuilder-dotnet-stable&preserve-view=true)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/csharp/Bots/TeamsConversationBot.cs#L347)

```csharp
protected override async Task OnTeamsChannelDeletedAsync(ChannelInfo channelInfo, TeamInfo teamInfo, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
{
var heroCard = new HeroCard(text: $"{channelInfo.Name} is the Channel deleted");
await turnContext.SendActivityAsync(MessageFactory.Attachment(heroCard.ToAttachment()), cancellationToken);
}

```

# [TypeScript](#tab/typescript3)

[SDK reference](/javascript/api/botbuilder/teamsactivityhandler?view=botbuilder-ts-latest#botbuilder-teamsactivityhandler-onteamschanneldeletedevent&preserve-view=true)

```typescript
export class MyBot extends TeamsActivityHandler {
constructor() {
super();
this.onTeamsChannelDeletedEvent(async (channelInfo: ChannelInfo, teamInfo:  TeamInfo, turnContext: TurnContext, next: () => Promise<void>): Promise<void> => {
const card = CardFactory.heroCard('Channel Deleted', `${channelInfo.name} is the Channel deleted`);
const message = MessageFactory.attachment(card);
// Sends a message activity to the sender of the incoming activity.
await turnContext.sendActivity(message);
await next();
});
}
}

```

# [JSON](#tab/json3)

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

# [Python](#tab/python3)

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

**Channel restored**: The `channelRestored` event is sent to your bot, whenever a channel that was previously deleted is restored.

# [C#](#tab/dotnet4)

* [SDK reference](/dotnet/api/microsoft.bot.builder.teams.teamsactivityhandler.onteamschannelrestoredasync?view=botbuilder-dotnet-stable&preserve-view=true)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/msteams-application-qbot/Source/Microsoft.Teams.Apps.QBot.Web/Bot/BotActivityHandler.cs#L395)

```csharp
protected override async Task OnTeamsChannelRestoredAsync(ChannelInfo channelInfo, TeamInfo teamInfo, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
{
var heroCard = new HeroCard(text: $"{channelInfo.Name} is the Channel restored.");
await turnContext.SendActivityAsync(MessageFactory.Attachment(heroCard.ToAttachment()), cancellationToken);
}

```

# [TypeScript](#tab/typescript4)

[SDK reference](/javascript/api/botbuilder/teamsactivityhandler?view=botbuilder-ts-latest#botbuilder-teamsactivityhandler-onteamschannelrestoredevent&preserve-view=true)

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

# [JSON](#tab/json4)

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

# [Python](#tab/python4)

[SDK reference](/python/api/botbuilder-core/botbuilder.core.teams.teamsactivityhandler?view=botbuilder-py-latest#botbuilder-core-teams-teamsactivityhandler-on-teams-channel-restored&preserve-view=true)

```python
async def on_teams_channel_restored(
self, channel_info: ChannelInfo, team_info: TeamInfo, turn_context: TurnContext
):
# Sends a message activity to the sender of the incoming activity.
return await turn_context.send_activity(
MessageFactory.text(
"The restored channel is {channel_info.name}. The channel id is {channel_info.id}"
)
)
```

---

## Member events

Member events are triggered for the following events:

* Members added
* Members removed

**Members added**: The `membersAdded` event is sent to your bot whenever a new user or bot is added to a conversation.

A member added event is sent to your bot in the following scenarios:

* When the bot is installed and added to a conversation.
* When a user is added to a conversation where the bot is installed.

The `membersAdded` event activity type is set to `teamMemberAdded` when the event is sent from a team context. To determine if the new member added is a bot or a user, check the `Activity` object of the `turnContext` for `MembersAdded`. If the `MembersAdded` list contains an object where `id` is the same as the `Recipient.id`, then the member added is the bot, else it's a user. The bot `id` is formatted as `28:<MicrosoftAppId>`.

# [C#](#tab/dotnet5)

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

# [TypeScript](#tab/typescript5)

[SDK reference](/javascript/api/botbuilder/teamsactivityhandler?view=botbuilder-ts-latest#botbuilder-teamsactivityhandler-onteamsmembersaddedevent&preserve-view=true)

```typescript
export class MyBot extends TeamsActivityHandler {
constructor() {
super();
this.onTeamsMembersAddedEvent(async (membersAdded: ChannelAccount[], teamInfo:  TeamInfo, turnContext: TurnContext, next: () => Promise<void>): Promise<void> => {
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

# [JSON](#tab/json5)

* When a bot is added to a team, the bot code is updated as follows:

  > [!NOTE]
  > In this payload, `conversation.id` and `channelData.settings.selectedChannel.id` is the ID of the channel that the user selected during app installation or the team from where the installation triggered.

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

* When a bot is added to a one-to-one chat, the bot code is updated as follows:

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

# [Python](#tab/python6)

[SDK reference](/python/api/botbuilder-core/botbuilder.core.teams.teamsactivityhandler?view=botbuilder-py-latest#botbuilder-core-teams-teamsactivityhandler-on-teams-members-added&preserve-view=true)

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

**Members removed**: The `membersRemoved` event is sent to your bot whenever a user or bot is removed from a conversation.

A member removed event is sent to your bot in the following scenarios:

1. When the bot is uninstalled and removed from a conversation.
1. When a user is removed from a conversation where the bot is installed.

The `MembersRemoved` event activity type is set to `teamMemberRemoved` when the event is sent from a team context. To determine if the new member removed is the bot or a user, check the `Activity` object of the `turnContext` for `MembersRemoved`. If the `MembersRemoved` list contains an object where `id` is the same as the `Recipient.id` then the member added is the bot, else it's a user. The bot ID is formatted as `28:<MicrosoftAppId>`.

> [!NOTE]
> When a user is permanently removed from a tenant, `membersRemoved conversationUpdate` event is triggered.

# [C#](#tab/dotnet7)

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
                // You must clear any cached data you have for this team.
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

# [TypeScript](#tab/typescript7)

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

# [JSON](#tab/json7)

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

# [Python](#tab/python7)

[SDK  reference](/python/api/botbuilder-core/botbuilder.core.teams.teamsactivityhandler?view=botbuilder-py-latest#botbuilder-core-teams-teamsactivityhandler-on-teams-members-removed&preserve-view=true)

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

You can also use the [`InstallationUpdate`](#installation-events) event to determine when your bot is added or removed from a conversation.

## Team events

Team events are triggered for the following events:

* Team renamed
* Team deleted
* Team archived
* Team unarchived
* Team restored

**Team renamed**: The bot is notified when the team is renamed. It receives a `conversationUpdate` event with `eventType.teamRenamed` in the `channelData` object in the `Team` scope.

# [C#](#tab/dotnet8)

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

# [TypeScript](#tab/typescript8)

[SDK reference](/javascript/api/botbuilder/teamsactivityhandler?view=botbuilder-ts-latest#botbuilder-teamsactivityhandler-onteamsteamrenamedevent&preserve-view=true)

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

# [JSON](#tab/json8)

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

# [Python](#tab/python8)

[SDK reference](/python/api/botbuilder-core/botbuilder.core.teams.teamsactivityhandler?view=botbuilder-py-latest#botbuilder-core-teams-teamsactivityhandler-on-teams-team-renamed&preserve-view=true)

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

**Team deleted**: The bot receives a notification when the team is deleted. It receives a `conversationUpdate` event with `eventType.teamDeleted` in the `channelData` object the `Team` scope.

# [C#](#tab/dotnet9)

[SDK reference](/dotnet/api/microsoft.bot.builder.teams.teamsactivityhandler.onteamsteamdeletedasync?view=botbuilder-dotnet-stable#definition&preserve-view=true)

```csharp
       protected override async Task OnTeamsTeamDeletedAsync(TeamInfo teamInfo, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
      {
        // Handle delete event.
      }
```

# [TypeScript](#tab/typescript9)

[SDK reference](/javascript/api/botbuilder/teamsactivityhandler?view=botbuilder-ts-latest#botbuilder-teamsactivityhandler-onteamsteamdeletedevent&preserve-view=true)

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

# [JSON](#tab/json9)

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

# [Python](#tab/python9)

[SDK reference](/python/api/botbuilder-core/botbuilder.core.teams.teamsactivityhandler?view=botbuilder-py-latest#botbuilder-core-teams-teamsactivityhandler-on-teams-team-deleted&preserve-view=true)

```python
     # Invoked when a Team Deleted event activity is received from the connector. 
      Team Deleted corresponds to the user deleting a team.
      async def on_teams_team_deleted(self, team_info: TeamInfo, turn_context: TurnContext):
     # Handle delete event.
```
---

**Team restored**: The bot receives a notification when a team is restored. It receives a `conversationUpdate` event with `eventType.teamrestored` in the `channelData` object in the `Team` scope.

# [C#](#tab/dotnet10)

[SDK reference](/dotnet/api/microsoft.bot.builder.teams.teamsactivityhandler.onteamsteamrestoredasync?view=botbuilder-dotnet-stable#definition&preserve-view=true)

```csharp
     protected override async Task OnTeamsTeamrestoredAsync(TeamInfo teamInfo, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
     {
        var heroCard = new HeroCard(text: $"{teamInfo.Name} is the team name");
        // Sends an activity to the sender of the incoming activity.
        await turnContext.SendActivityAsync(MessageFactory.Attachment(heroCard.ToAttachment()), cancellationToken);
     }
```

# [TypeScript](#tab/typescript10)

[SDK reference](/javascript/api/botbuilder/teamsactivityhandler?view=botbuilder-ts-latest#botbuilder-teamsactivityhandler-onteamsteamrestoredevent&preserve-view=true)

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

# [JSON](#tab/json10)

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

# [Python](#tab/python10)

[SDK reference](/python/api/botbuilder-core/botbuilder.core.teams.teamsactivityhandler?view=botbuilder-py-latest#botbuilder-core-teams-teamsactivityhandler-on-teams-team-restored&preserve-view=true)

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

**Team archived**: The bot receives a notification when the team is installed and archived. It receives a `conversationUpdate` event with `eventType.teamarchived` in the `channelData` object in the `Team` scope.

# [C#](#tab/dotnet11)

[SDK reference](/dotnet/api/microsoft.bot.builder.teams.teamsactivityhandler.onteamsteamarchivedasync?view=botbuilder-dotnet-stable#definition&preserve-view=true)

```csharp
      protected override async Task OnTeamsTeamArchivedAsync(TeamInfo teamInfo, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
     {
        var heroCard = new HeroCard(text: $"{teamInfo.Name} is the team name");
        // Sends an activity to the sender of the incoming activity.
        await turnContext.SendActivityAsync(MessageFactory.Attachment(heroCard.ToAttachment()), cancellationToken);
     }
```

# [TypeScript](#tab/typescript11)

[SDK reference](/javascript/api/botbuilder/teamsactivityhandler?view=botbuilder-ts-latest#botbuilder-teamsactivityhandler-onteamsteamarchivedevent&preserve-view=true)

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

# [JSON](#tab/json11)

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

# [Python](#tab/python11)

[SDK reference](/python/api/botbuilder-core/botbuilder.core.teams.teamsactivityhandler?view=botbuilder-py-latest#botbuilder-core-teams-teamsactivityhandler-on-teams-team-archived&preserve-view=true)

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

**Team unarchived**: The bot receives a notification when the team is installed and unarchived. It receives a `conversationUpdate` event with `eventType.teamUnarchived` in the `channelData` object in the `Team` scope.

# [C#](#tab/dotnet11)

[SDK reference](/dotnet/api/microsoft.bot.builder.teams.teamsactivityhandler.onteamsteamunarchivedasync?view=botbuilder-dotnet-stable#definition&preserve-view=true)

```csharp
      protected override async Task OnTeamsTeamUnarchivedAsync(TeamInfo teamInfo, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
     {
        var heroCard = new HeroCard(text: $"{teamInfo.Name} is the team name");
        // Sends an activity to the sender of the incoming activity.
        await turnContext.SendActivityAsync(MessageFactory.Attachment(heroCard.ToAttachment()), cancellationToken);
     }
```

# [TypeScript](#tab/typescript11)

[SDK reference](/javascript/api/botbuilder/teamsactivityhandler?view=botbuilder-ts-latest#botbuilder-teamsactivityhandler-onteamsteamunarchivedevent&preserve-view=true)

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

# [JSON](#tab/json11)

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

# [Python](#tab/python11)

[SDK reference](/python/api/botbuilder-core/botbuilder.core.teams.teamsactivityhandler?view=botbuilder-py-latest#botbuilder-core-teams-teamsactivityhandler-on-teams-team-unarchived&preserve-view=true)

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

## Handling errors in events

When a bot encounters an error while handling different events or activities, don't send messages that have no meaningful context to the conversation as shown in the following screenshot:

:::image type="content" source="~/assets/images/handling-error.png" alt-text="Screenshot shows you the error message response in bot conversation.":::

In the development phase, it's always helpful to send meaningful messages in conversations, which provide additional details about a specific error for better debugging. However, in the production environment, you must log the errors or events to Azure Application Insights. For more information, see [add telemetry to your bot](https://aka.ms/bottelemetry).

### Bot Framework activity handler

Bots derived from the Teams activity handler class, first checks for Teams activities. After checking for Teams activities, it passes all other activities to the Bot Framework's activity handler.

# [C#](#tab/csharp15)

>[!NOTE]
>
>* Except for the **added** and **removed** members' activities, all the activity handlers described in this section continue to work as they do with a non-Teams bot.
>* `onInstallationUpdateActivityAsync()` method is used to get Teams Locale while adding the bot to Teams.

Activity handlers are different in context of a team, where a new member is added to the team instead of a message thread.

The list of handlers defined in `ActivityHandler` includes the following events:

| Event | Handler | Description |
| :-- | :-- | :-- |
| Any activity type received | `OnTurnAsync` | This method calls one of the other handlers, based on the type of activity received. |
| Message activity received | `OnMessageActivityAsync` | You can override this method to handle a `Message` activity. |
| Message update activity received | `OnMessageUpdateActivityAsync` | You can override this method to handle a message update activity. |
| Message delete activity received | `OnMessageDeleteActivityAsync` | You can override this method to handle a message delete activity. |
| Conversation update activity received | `OnConversationUpdateActivityAsync` | This method calls a handler if members other than the bot joined or left the conversation, on a `ConversationUpdate` activity. |
| Non-bot members joined the conversation | `OnMembersAddedAsync` | This method can be overridden to handle members joining a conversation. |
| Non-bot members left the conversation | `OnMembersRemovedAsync` | This method can be overridden to handle members leaving a conversation. |
| Event activity received | `OnEventActivityAsync` | This method calls a handler specific to the event type, on an `Event` activity. |
| Token-response event activity received | `OnTokenResponseEventAsync` | This method can be overridden to handle token response events. |
| Non-token-response event activity received | `OnEventAsync` | This method can be overridden to handle other types of events. |
| Other activity type received | `OnUnrecognizedActivityTypeAsync` | This method can be overridden to handle any activity type otherwise unhandled. |

# [JavaScript](#tab/javascript15)

>[!NOTE]
> Except for the **added** and **removed** members' activities, all the activity handlers described in this section continue to work as they do with a non-Teams bot.

Activity handlers are different in context of a team, where the new member is added to the team instead of a message thread.

The list of handlers defined in `ActivityHandler` includes the following events:

| Event | Handler | Description |
| :-- | :-- | :-- |
| Any activity type received | `onTurn` | This method calls one of the other handlers, based on the type of activity received. |
| Message activity received | `onMessage` | This method helps to handle a `Message` activity. |
| Message update activity received  | `onMessageUpdate` | This method calls a handler if a message is updated. |
| Message delete activity received | `onMessageDelete` | This method calls a handler if a message is deleted. |
| Conversation update activity received | `onConversationUpdate` | This method calls a handler if members other than the bot joined or left the conversation, on a `ConversationUpdate` activity. |
| Non-bot members joined the conversation | `onMembersAdded` | This method helps to handle members joining a conversation. |
| Non-bot members left the conversation | `onMembersRemoved` | This method helps to handle members leaving a conversation. |
| Event activity received | `onEvent` | This method calls a handler specific to the event type, on an `Event` activity. |
| Token-response event activity received | `onTokenResponseEvent` | This method helps to handle token response events. |
| Other activity type received | `onUnrecognizedActivityType` | This method helps to handle any activity type otherwise unhandled. |
| message edit | `onTeamsMessageEditEvent` | You can override this method to handle when a message in a conversation is edited. |
| Message undelete | `onTeamsMessageUndeleteEvent` | You can override this method to handle when a deleted message in a conversation is undeleted. For example, when the user decides to undo a deleted message. |
| Message soft delete | `onTeamsMessageSoftDeleteEvent` | You can override this method to handle when a message in a conversation is soft deleted. |

# [Python](#tab/python15)

>[!NOTE]
> Except for the **added** and **removed** members' activities, all the activity handlers described in this section continue to work as they do with a non-Teams bot.

Activity handlers are different in context of a team, where the new member is added to the team instead of a message thread.

The list of handlers defined in `ActivityHandler` includes the following events:

| Event | Handler | Description |
| :-- | :-- | :-- |
| Any activity type received | `on_turn` | This method calls one of the other handlers, based on the type of activity received. |
| Message activity received | `on_message_activity` | This method can be overridden to handle a `Message` activity. |
| Conversation update activity received | `on_conversation_update_activity` | This method calls a handler if members other than the bot join or leave the conversation. |
| Non-bot members joined the conversation | `on_members_added_activity` | This method can be overridden to handle members joining a conversation. |
| Non-bot members left the conversation | `on_members_removed_activity` | This method can be overridden to handle members leaving a conversation. |
| Event activity received | `on_event_activity` | This method calls a handler specific to the type of event. |
| Token-response event activity received | `on_token_response_event` | This method can be overridden to handle token response events. |
| Non-token-response event activity received | `on_event` | This method can be overridden to handle other types of events. |
| Other activity types received | `on_unrecognized_activity_type` | This method can be overridden to handle any type of activity that isn't handled. |

---

The following is an implementation example with the Bot Framework's activity handler:

# [C#](#tab/pcsharp16)

```csharp
public class EchoBot : ActivityHandler
{
    protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
    {
        var replyText = $"Echo: {turnContext.Activity.Text}";
        await turnContext.SendActivityAsync(MessageFactory.Text(replyText, replyText), cancellationToken);
    }

    protected override async Task OnMembersAddedAsync(IList<ChannelAccount> membersAdded, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
    {
        var welcomeText = "Hello and welcome!";
        foreach (var member in membersAdded)
        {
            if (member.Id != turnContext.Activity.Recipient.Id)
            {
                await turnContext.SendActivityAsync(MessageFactory.Text(welcomeText, welcomeText), cancellationToken);
            }
        }
    }
}
```

# [JavaScript](#tab/javascript16)

```javascript
class EchoBot extends ActivityHandler {
    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            const replyText = `Echo: ${ context.activity.text }`;
            await context.sendActivity(MessageFactory.text(replyText, replyText));
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            const welcomeText = 'Hello and welcome!';
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity(MessageFactory.text(welcomeText, welcomeText));
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}
```

# [Java](#tab/java15)

```java
public class EchoBot extends ActivityHandler {

    @Override
    protected CompletableFuture<Void> onMessageActivity(TurnContext turnContext) {
        return turnContext.sendActivity(
            MessageFactory.text("Echo: " + turnContext.getActivity().getText())
        ).thenApply(sendResult -> null);
    }

    @Override
    protected CompletableFuture<Void> onMembersAdded(
        List<ChannelAccount> membersAdded,
        TurnContext turnContext
    ) {
        String welcomeText = "Hello and welcome!";
        return membersAdded.stream()
            .filter(
                member -> !StringUtils
                    .equals(member.getId(), turnContext.getActivity().getRecipient().getId())
            ).map(channel -> turnContext.sendActivity(MessageFactory.text(welcomeText, welcomeText, null)))
            .collect(CompletableFutures.toFutureList()).thenApply(resourceResponses -> null);
    }
}
```

# [Python](#tab/python16)

```python
class EchoBot(ActivityHandler):
    async def on_members_added_activity(
        self, members_added: [ChannelAccount], turn_context: TurnContext
    ):
        for member in members_added:
            if member.id != turn_context.activity.recipient.id:
                await turn_context.send_activity("Hello and welcome!")

    async def on_message_activity(self, turn_context: TurnContext):
        return await turn_context.send_activity(
            MessageFactory.text(f"Echo: {turn_context.activity.text}")
        )
```

---

For more information, see the [Bot Framework handlers.](/azure/bot-service/bot-activity-handler-concept)

## Code sample

|Sample name | Description | .NET | Node.js | Python|
|----------------|-----------------|--------------|----------------|-------|
| Teams conversation bot | This sample app shows how to use different bot conversation events available in Bot Framework. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/nodejs)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/python)|
| Bot samples | Set of Bot Framework samples. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples#bots-samples-using-the-v4-sdk) |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples#bots-samples-using-the-v4-sdk)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples#bots-samples-using-the-v4-sdk)|

## Next step

> [!div class="nextstepaction"]
> [Invoke activity handler](~/bots/how-to/conversations/bot-invoke-activity.md)

## See also

* [Build bots for Teams](~/bots/what-are-bots.md)
* [Teams JavaScript client SDK](~/tabs/how-to/using-teams-client-sdk.md)
* [App manifest schema for Teams](~/resources/schema/manifest-schema.md)
* [API reference for the Bot Framework Connector service](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference)
* [Get Teams specific context for your bot](~/bots/how-to/get-teams-context.md)
* [Messages in bot conversations](~/bots/how-to/conversations/conversation-messages.md)
* [Component and waterfall dialogs](/azure/bot-service/bot-builder-concept-waterfall-dialogs)