---
title: Activity Handlers and Bot Logic
description: Learn about bot events and activity handlers for messages, channels, teams, members, mentions, auth, and card actions.
ms.topic: article
ms.localizationpriority: medium
ms.owner: angovil
ms.date: 04/09/2026
---

# Understand bot concepts

A bot's interactions can be using text, speech, images, or video. It processes the user's input to understand their request and evaluates the input to perform relevant tasks. A bot may request information or enable access to services, and responds to the user.

> **SDK Version**: This article uses the [Teams SDK v2](https://microsoft.github.io/teams-sdk). For installation, run:

> - **TypeScript**: `npm install @microsoft/teams.apps`
> - **C#**: `dotnet add package Microsoft.Teams.Apps`
> - **Python**: `pip install microsoft-teams-apps`

## Bot scopes

Bots in Microsoft Teams can be part of a one-to-one conversation, a group chat, or a channel in a team. Each scope provides unique opportunities and challenges for your conversational bot.

| In a channel | In a group chat | In a one-to-one chat |
| :-- | :-- | :-- |
| Massive reach | Fewer members | Traditional way |
| Concise individual interactions | @mention to bot | Q&A bots |
| @mention to bot | Similar to channel | Bots that tell jokes and take notes |

### In a channel

Channels contain threaded conversations between multiple people, even up to 2000. This potentially gives your bot massive reach, but individual interactions must be concise. Traditional multi-turn interactions don't work. Instead, you must look to use interactive cards or dialogs (referred as task modules in TeamsJS v1.x), or move the conversation to a one-to-one conversation to collect lots of information. Your bot only has access to messages where it's `@mentioned`. You can retrieve additional messages from the conversation using Microsoft Graph and organization-level permissions.

Bots work better in a channel in the following cases:

- Notifications, where you provide an interactive card for users to take additional information.
- Feedback scenarios, such as polls and surveys.
- Single request or response cycle resolves interactions and the results are useful for multiple members of the conversation.
- Social or fun bots, where you get an awesome cat image, randomly pick a winner, and so on.

### In a group chat

Group chats are non-threaded conversations between three or more people. They tend to have fewer members than a channel and are more transient. Similar to a channel, your bot only has access to messages where it's `@mentioned` directly.

Bots that work better in a channel also work better in a group chat.

### In a one-to-one chat

One-to-one chat is a traditional way for a conversational bot to interact with a user. A few examples of one-to-one conversational bots are:

- Q&A bots
- bots that initiate workflows in other systems.
- bots that tell jokes.
- bots that take notes.
Before creating one-to-one chatbots, consider whether a conversation-based interface is the best way to present your functionality.

## Activity handler and bot logic

To create a bot app that meets your needs, understanding Microsoft Teams activity handler and bot logic is essential. These two key components work together to organize conversational logic.

- [Teams activity handler](#teams-activity-handler):
  Processes Teams-specific events and interactions such as channel creation, team member additions, and other actions unique to the Teams environment. In the Teams SDK v2, handlers are registered directly on an `App` instance rather than via class inheritance.

- [Bot logic](#bot-logic):
  The `App` object houses the bot's conversational logic and is responsible for making decisions based on user input. Incoming activities are routed to the appropriate handler based on activity type and optional pattern matching.

### Teams activity handler

The activity handler is the core of a bot's functionality, managing and processing user interactions. In the Teams SDK v2:

- You instantiate an `App` object and register handlers on it.
- Handlers receive a typed context object (`IActivityContext` in TypeScript, `IContext<TActivity>` in C#, `ActivityContext[TActivity]` in Python).
- Replies and proactive messages are sent via `ctx.reply()` or `ctx.send()`.

When a Teams bot receives an activity, the SDK routes it through the registered handler. Teams-specific events (channel lifecycle, member changes, etc.) are surfaced as distinct named events, so you do not need to inspect `channelData.eventType` manually.

> [!NOTE]
> If a bot activity takes more than 15 seconds to process, Teams sends a retry request to the bot endpoint, so you might see duplicate requests.

#### Activity handler code snippets

The following snippets show Teams activity handlers for channel and team lifecycle events.

# [TypeScript](#tab/typescript)

Bots are built using the `@microsoft/teams.apps` package. You instantiate an `App` and register handlers with `app.on(eventName, handler)`. The SDK routes activities to the correct handler based on the event name string.

`channelCreated`

```typescript
import { App } from '@microsoft/teams.apps';

const app = new App();

app.on('channelCreated', async ({ activity }) => {
  const channel = activity.channelData.channel; // { id, name }
  const team    = activity.channelData.team;    // { id, name }
  // Code logic here
});
```

`channelDeleted`

```typescript
app.on('channelDeleted', async ({ activity }) => {
  // Code logic here
});
```

`channelRenamed`

```typescript
app.on('channelRenamed', async ({ activity }) => {
  // Code logic here
});
```

`teamRenamed`

```typescript
app.on('teamRenamed', async ({ activity }) => {
  // Code logic here
});
```

`membersAdded` / `membersRemoved`

```typescript
app.on('membersAdded', async ({ activity, send }) => {
  for (const member of activity.membersAdded) {
    await send(`Welcome, ${member.name}!`);
  }
});

app.on('membersRemoved', async ({ activity }) => {
  // Code logic here
});
```

`messageUpdate` / `messageDelete`

Message edits are surfaced as `messageUpdate`. Soft deletes are surfaced as `messageDelete` — the `activity.channelData.eventType` will be `'softDeleteMessage'`.

```typescript
app.on('messageUpdate', async ({ activity }) => {
  // Code logic here
});

app.on('messageDelete', async ({ activity }) => {
  // activity.channelData.eventType === 'softDeleteMessage' for soft deletes
  // Code logic here
});
```

# [C#](#tab/csharp)

Bots are built using the `Microsoft.Teams.Apps` package. You instantiate an `App` and chain handler registrations using extension methods such as `OnMessage()`, `OnChannelCreated()`, etc. All handlers receive an `IContext<TActivity>` object.

`OnChannelCreated`

```csharp
using Microsoft.Teams.Apps;

var app = new App();

app.OnChannelCreated(async context => {
    var channel = context.Activity.ChannelData.Channel;
    var team    = context.Activity.ChannelData.Team;
    // Code logic here
});
```

`OnChannelDeleted`

```csharp
app.OnChannelDeleted(async context => {
    // Code logic here
});
```

`OnChannelRenamed`

```csharp
app.OnChannelRenamed(async context => {
    // Code logic here
});
```

`OnTeamRenamed`

```csharp
app.OnTeamRenamed(async context => {
    // Code logic here
});
```

`OnMembersAdded`

```csharp
app.OnMembersAdded(async context => {
    foreach (var member in context.Activity.MembersAdded) {
        // Code logic here
    }
});
```

`OnMembersRemoved`

```csharp
app.OnMembersRemoved(async context => {
    foreach (var member in context.Activity.MembersRemoved) {
        // Code logic here
    }
});
```

`OnMessageUpdate` / `OnMessageDelete`

Message edits are handled via `OnMessageUpdate`. Soft deletes are handled via `OnMessageDelete`.

```csharp
app.OnMessageUpdate(async context => {
    // Code logic here
});

app.OnMessageDelete(async context => {
    // Code logic here
});
```

# [Python](#tab/python)

Bots are built using the `microsoft-teams-apps` package. Handlers are registered using decorators on an `App` instance. Each handler is an `async` function that receives an `ActivityContext[TActivity]` object.

`on_channel_created`

```python
from microsoft_teams.apps import App, ActivityContext
from microsoft_teams.api.activities import ConversationUpdateActivity

app = App()

@app.on_channel_created
async def handle_channel_created(ctx: ActivityContext[ConversationUpdateActivity]):
    channel = ctx.activity.channel_data.channel
    team    = ctx.activity.channel_data.team
    # Code logic here
```

`on_channel_deleted`

```python
@app.on_channel_deleted
async def handle_channel_deleted(ctx: ActivityContext[ConversationUpdateActivity]):
    # Code logic here
```

`on_channel_renamed`

```python
@app.on_channel_renamed
async def handle_channel_renamed(ctx: ActivityContext[ConversationUpdateActivity]):
    # Code logic here
```

`on_team_renamed`

```python
@app.on_team_renamed
async def handle_team_renamed(ctx: ActivityContext[ConversationUpdateActivity]):
    # Code logic here
```

`on_conversation_update` (members added / removed)

Members added and removed events are handled via `on_conversation_update`. Inspect `ctx.activity.members_added` and `ctx.activity.members_removed`:

```python
@app.on_conversation_update
async def handle_conversation_update(ctx: ActivityContext[ConversationUpdateActivity]):
    if ctx.activity.members_added:
        for member in ctx.activity.members_added:
            await ctx.send(f"Welcome, {member.name}!")
    if ctx.activity.members_removed:
        # Code logic here
```

`on_edit_message` / `on_soft_delete_message` / `on_undelete_message`

```python
@app.on_edit_message
async def handle_edit_message(ctx: ActivityContext):
    # Code logic here

@app.on_soft_delete_message
async def handle_soft_delete_message(ctx: ActivityContext):
    # Code logic here

@app.on_undelete_message
async def handle_undelete_message(ctx: ActivityContext):
    # Code logic here
```

---

#### Example of bot activity handler

The following code provides an example of a bot activity:

# [TypeScript](#tab/typescript)

```typescript
import { App } from '@microsoft/teams.apps';

const app = new App();

app.on('message', async ({ activity, reply }) => {
  const senderName = activity.from.name;
  await send(`Hello <at>${senderName}</at>.`);
});

app.start().catch(console.error);
```

# [C#](#tab/csharp)

```csharp
using Microsoft.Teams.Apps.Activities;
using Microsoft.Teams.Apps.Extensions;
using Microsoft.Teams.Plugins.AspNetCore.DevTools.Extensions;
using Microsoft.Teams.Plugins.AspNetCore.Extensions;

var builder = WebApplication.CreateBuilder(args);
builder.AddTeams().AddTeamsDevTools();
var app = builder.Build();
var teams = app.UseTeams();

teams.OnMessage(async (context, cancellationToken) =>
{
    var senderName = context.Activity.From.Name;
    await context.Send($"Hello <at>{senderName}</at>.", cancellationToken);
});

app.Run();
```

# [Python](#tab/python)

```python
import asyncio
from microsoft_teams.apps import App, ActivityContext
from microsoft_teams.api import MessageActivity

app = App()

@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    sender_name = ctx.activity.from_property.name
    await ctx.send(f"Hello <at>{sender_name}</at>.")

if __name__ == "__main__":
    asyncio.run(app.start())
```

---

### Bot logic

Bot logic incorporates the fundamental rules and decision-making frameworks that dictate a bot's actions and interactions. It outlines how the bot interprets user input, formulates responses, and participates in conversations.

In Teams SDK v2, the bot logic processes incoming activities from one or more bot channels and generates outgoing activities. All activity routing is handled by the `App` instance — you register the handlers, and the SDK dispatches activities to them automatically.

# [TypeScript](#tab/typescript)

#### Core activity handlers

The list of event names supported by `app.on()` includes the following:

| Event | Event name string | Description |
| --- | --- | --- |
| Any activity type received | `'activity'` | Catch-all handler called for every activity. |
| Message activity received | `'message'` | Handle incoming text messages. Use `app.message(pattern, handler)` for regex matching. |
| Conversation update received | `'conversationUpdate'` | Raw conversation update activity. |
| Installation added | `'install.add'` | Bot was installed. |
| Installation removed | `'install.remove'` | Bot was uninstalled. |
| Members added | `'membersAdded'` | One or more members joined the conversation. |
| Members removed | `'membersRemoved'` | One or more members left the conversation. |
| Message edited | `'messageUpdate'` | A message in the conversation was edited. |
| Message soft deleted | `'messageDelete'` | A message was soft-deleted (`activity.channelData.eventType === 'softDeleteMessage'`). |
| Read receipt received | `'readReceipt'` | A read receipt was received. |

#### Teams-specific event handlers

`app.on()` supports the following Teams-specific event name strings:

| Event | Event name string | Description |
| --- | --- | --- |
| `channelCreated` | `'channelCreated'` | A Teams channel was created. |
| `channelDeleted` | `'channelDeleted'` | A Teams channel was deleted. |
| `channelRenamed` | `'channelRenamed'` | A Teams channel was renamed. |
| `channelRestored` | `'channelRestored'` | A Teams channel was restored. |
| `channelMemberAdded` | `'channelMemberAdded'` | A member was added to a channel. |
| `channelMemberRemoved` | `'channelMemberRemoved'` | A member was removed from a channel. |
| `teamRenamed` | `'teamRenamed'` | The team was renamed. |
| `teamArchived` | `'teamArchived'` | The team was archived. |
| `teamDeleted` | `'teamDeleted'` | The team was deleted. |
| `teamRestored` | `'teamRestored'` | The team was restored. |
| Meeting started | `'meetingStart'` | A meeting has started. |
| Meeting ended | `'meetingEnd'` | A meeting has ended. |
| Participant joined | `'meetingParticipantJoin'` | A participant joined a meeting. |
| Participant left | `'meetingParticipantLeave'` | A participant left a meeting. |

#### Teams invoke activities

The following table lists invoke activity handlers available via `app.on()`:

| Invoke type | Event name string | Description |
| --- | --- | --- |
| `CardAction.Invoke` | `'card.action'` | A card action invoke activity was received (`adaptiveCard/action`). |
| `signin/verifyState` | Handled automatically by the SDK (OAuth flow) | Sign-in verify state activity. |
| `task/fetch` | `'dialog.open'` | A dialog (task module) was fetched. |
| `task/submit` | `'dialog.submit'` | A dialog (task module) was submitted. |

# [C#](#tab/csharp)

#### Core activity handlers

The `App` class exposes extension methods for registering handlers. Methods return `App` for fluent chaining.

| Event | Extension method | Description |
| --- | --- | --- |
| Any activity type received | `OnActivity(handler)` | Catch-all handler called for every activity. |
| Message activity received | `OnMessage(handler)` | Handle incoming text messages. Pass a regex string as the first argument for pattern matching. |
| Conversation update received | `OnConversationUpdate(handler)` | Raw conversation update activity. |
| Non-bot members joined | `OnMembersAdded(handler)` | Fires when `MembersAdded.Length > 0`. |
| Non-bot members left | `OnMembersRemoved(handler)` | Fires when `MembersRemoved.Length > 0`. |
| Installation added | `OnInstall(handler)` | Bot was installed. |

#### Teams-specific activity handlers

| Event | Extension method | Description |
| --- | --- | --- |
| Channel created | `OnChannelCreated(handler)` | A Teams channel was created. |
| Channel deleted | `OnChannelDeleted(handler)` | A Teams channel was deleted. |
| Channel renamed | `OnChannelRenamed(handler)` | A Teams channel was renamed. |
| Team renamed | `OnTeamRenamed(handler)` | The team was renamed. |
| Message edited | `OnMessageUpdate(handler)` | A message was edited. |
| Message soft deleted | `OnMessageDelete(handler)` | A message was soft-deleted. |

#### Teams invoke activities

| Invoke type | Extension method | Description |
| --- | --- | --- |
| `CardAction.Invoke` | `OnExecuteAction(handler)` | A card action invoke activity was received. |
| `task/fetch` | `OnTaskFetch(handler)` | A dialog (task module) was fetched. |
| `task/submit` | `OnTaskSubmit(handler)` | A dialog (task module) was submitted. |
| `fileConsent/invoke` | `OnFileConsent(handler)` | A file consent card activity was received. |
| `signin/verifyState` | Handled automatically by the SDK (OAuth flow) | Sign-in verify state activity. |

# [Python](#tab/python)

#### Core activity handlers

The `App` class exposes decorator-style handler registration.

| Event | Decorator | Description |
| --- | --- | --- |
| Any activity received | `@app.on_activity` | Catch-all handler for every activity. |
| Message received | `@app.on_message` | Handle incoming text messages. |
| Message with pattern | `@app.on_message_pattern(re.compile(...))` | Handle messages matching a regex pattern. |
| Conversation update | `@app.on_conversation_update` | Raw conversation update; check `members_added` / `members_removed`. |
| Installation added | `@app.on_install_add` | Bot was installed. |
| Installation removed | `@app.on_install_remove` | Bot was uninstalled. |

#### Teams-specific activity handlers

| Event | Decorator | Description |
| --- | --- | --- |
| Channel created | `@app.on_channel_created` | A Teams channel was created. |
| Channel deleted | `@app.on_channel_deleted` | A Teams channel was deleted. |
| Channel renamed | `@app.on_channel_renamed` | A Teams channel was renamed. |
| Team renamed | `@app.on_team_renamed` | The team was renamed. |
| Message edited | `@app.on_edit_message` | A message was edited. |
| Message soft deleted | `@app.on_soft_delete_message` | A message was soft-deleted. |
| Message undeleted | `@app.on_undelete_message` | A deleted message was restored. |
| Meeting started | `@app.on_meeting_start` | A meeting has started. |
| Meeting ended | `@app.on_meeting_end` | A meeting has ended. |
| Participant joined | `@app.on_meeting_participant_join` | A participant joined a meeting. |
| Participant left | `@app.on_meeting_participant_leave` | A participant left a meeting. |

#### Teams invoke activities

| Invoke type | Decorator | Description |
| --- | --- | --- |
| `CardAction.Invoke` | `@app.on_card_action` | A card action invoke activity was received. |
| `task/fetch` | `@app.on_dialog_open` | A dialog (task module) was fetched. |
| `task/submit` | `@app.on_dialog_submit` | A dialog (task module) was submitted. |
| `fileConsent/invoke` | `@app.on_file_consent` | A file consent card activity was received. |
| `signin/verifyState` | Handled automatically by the SDK (OAuth flow) | Sign-in verify state activity. |

---

Now that you've familiarized yourself with bot activity handlers, let us see how bots behave differently depending on the conversation and the messages it receives or sends.

## Recommendations

An extensive dialog between your bot and the user is a slow and complex way to get a task completed. A bot that supports excessive commands, especially a broad range of commands, isn't successful or viewed positively by users.

- **Avoid multi-turn experiences in chat** An extensive dialog requires the developer to maintain state. To exit this state, a user must either time out or select **Cancel**. Also, the process is tedious. For example, see the following conversation scenario:

    USER: Schedule a meeting with Megan.

    BOT: I've found 200 results, include a first and last name.

    USER: Schedule a meeting with Megan Bowen.

    BOT: OK, what time would you like to meet with Megan Bowen?

    USER: 1:00 pm.

    BOT: On which day?

- **Support six or less frequent commands** As there are only six visible commands in the current bot menu, anything more is unlikely to be used with any frequency. Bots that go deep into a specific area rather than trying to be a broad assistant work and fare better.
- **Optimize size of knowledgebase for quicker interaction** One of the disadvantages of bots is that it's difficult to maintain a large retrieval knowledge base with unranked responses. Bots are best suited for short, quick interactions, and not sifting through long lists looking for an answer.

> **Note**: Teams platform only supports Transport Layer Security (TLS) version 1.2. Ensure you configure your bot environment accordingly.

## Explore other bot features

In addition to conventional bot features, you can also explore advanced features available in a Teams bot app:

- [Get Teams specific context for your bot](how-to/get-teams-context.md).
- [Calls and online meetings bots](calls-and-meetings/calls-meetings-bots-overview.md).
- [Enable SSO for your app](how-to/authentication/bot-sso-overview.md).

## Code sample

| Sample name | Description | TypeScript | C# | Python |
| --- | --- | --- | --- | --- |
| Teams conversation bot | This app demonstrates basic bot events. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-quickstart/nodejs/bot-quickstart) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-quickstart/dotnet/bot-quickstart) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-quickstart/python/bot-quickstart) |
