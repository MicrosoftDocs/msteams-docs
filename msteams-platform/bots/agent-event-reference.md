---
title: Teams Agent Events and Activity Handlers
description: Teams agent events include messages, member changes, channel updates, meetings, and card actions. Find handler registration syntax for each SDK language.
ms.topic: reference
ms.date: 11/23/2026
zone_pivot_groups: teams-sdk-languages
ai-usage: ai-assisted
---

# Teams agent event reference

Use this reference to find the handler registration syntax for Teams agent activities. For an introduction to activity handlers and agent logic, see [Understand agent concepts](bot-concepts.md).

The handler listings show declarations, and the [message reaction examples](#message-reactions) also show how to process event payloads. For handler basics, see [Activities and handlers](bot-concepts.md#activities-and-handlers). Register the handlers you need before starting the app. Some events share a handler; inspect the activity payload to distinguish them rather than registering duplicate handlers.

The language-independent [conversation update](#conversation-update-event-details) and [installation update](#installation-update-event-details) sections describe event scopes and payload fields. [Event payload examples](#event-payload-examples) apply to all SDK languages.

Invoke handlers can require a response to Teams. The invoke examples throw a not-implemented exception instead of returning a success response without an implementation. Replace the exception with the appropriate response before using these handlers.

::: zone pivot="teams-sdk-csharp"

Register handlers on the `TeamsBotApplication` instance named `teams`. These examples use the current `Microsoft.Teams.Apps` APIs. Activity handlers receive a typed context and a cancellation token.

## Core activity handlers

### Any activity received

A catch-all handler observes incoming activities.

Handler example pending verification.

<!-- TODO: Verify the current TeamsBotApplication catch-all registration API. The source article's OnActivity example uses the older App API. -->

### Message received

Handle incoming text messages. For pattern matching, pass a regex string before the handler.

```csharp
teams.OnMessage(async (context, cancellationToken) =>
{

});
```

### Conversation update received

Handle a raw conversation update activity.

```csharp
teams.OnConversationUpdate(async (context, cancellationToken) =>
{

});
```

### Members added

One or more members joined the conversation. Read `context.Activity.MembersAdded`.

```csharp
teams.OnMembersAdded(async (context, cancellationToken) =>
{

});
```

### Members removed

One or more members left the conversation. Read `context.Activity.MembersRemoved`.

```csharp
teams.OnMembersRemoved(async (context, cancellationToken) =>
{

});
```

### Installation added

The agent was installed. Inspect `context.Activity.Action` to distinguish installation from removal.

```csharp
teams.OnInstall(async (context, cancellationToken) =>
{

});
```

You can also handle the raw installation update activity with `OnInstallUpdate` and inspect `context.Activity.Action`. Choose the handler appropriate to your workflow rather than registering both for the same action.

```csharp
teams.OnInstallUpdate(async (context, cancellationToken) =>
{

});
```

### Installation removed

The agent was uninstalled. Installation changes use the same handler; inspect `context.Activity.Action` for `remove`.

```csharp
teams.OnInstall(async (context, cancellationToken) =>
{

});
```

### Message edited

A message was edited. Inspect `context.Activity.ChannelData?.EventType` to distinguish edits from restored messages.

```csharp
teams.OnMessageUpdate(async (context, cancellationToken) =>
{

});
```

### Message soft deleted

A message was soft deleted.

```csharp
teams.OnMessageDelete(async (context, cancellationToken) =>
{

});
```

### Message undeleted

A deleted message was restored. Use the message update handler and check for `context.Activity.ChannelData?.EventType == "undeleteMessage"`.

```csharp
teams.OnMessageUpdate(async (context, cancellationToken) =>
{

});
```

### Read receipt received

A user read a message. The event name is `application/vnd.microsoft.readReceipt`.

```csharp
teams.OnReadReceipt(async (context, cancellationToken) =>
{

});
```

### Message reactions

A user added or removed a reaction to an agent message. Use `OnMessageReaction` to handle both changes. Read `context.Activity.ReactionsAdded` and `context.Activity.ReactionsRemoved` for the reactions, and `context.Activity.ReplyToId` for the message ID.

Agents can listen for reaction activity in conversations they're part of, for example, to respond when a user likes an agent message. These activities have `type` of `messageReaction` and apply to all scopes. Each reaction has a `type` value, such as `angry`, `heart`, `laugh`, `like`, `sad`, or `surprised`. The payload doesn't include the original message contents, so store the message when you send it if your agent needs those contents to process reactions. Payloads can also include the older message identifier in `legacy.replyToId`. See the [added](#reactions-added-payload) and [removed](#reactions-removed-payload) reaction payload examples.

```csharp
teams.OnMessageReaction(async (context, cancellationToken) =>
{

});
```

C# also provides `OnMessageReactionAdded` and `OnMessageReactionRemoved` if you prefer separate handlers for additions and removals:

```csharp
teams.OnMessageReactionAdded(async (context, cancellationToken) =>
{

});

teams.OnMessageReactionRemoved(async (context, cancellationToken) =>
{

});
```

Use either the general handler or the specific handlers, rather than processing the same reaction twice. The following example uses the specific handlers to log each added or removed reaction's type:

```csharp
teams.OnMessageReactionAdded(async (context, cancellationToken) =>
{
    foreach (var reaction in context.Activity.ReactionsAdded ?? [])
    {
        Console.WriteLine($"User added reaction: {reaction.Type}");
    }
});

teams.OnMessageReactionRemoved(async (context, cancellationToken) =>
{
    foreach (var reaction in context.Activity.ReactionsRemoved ?? [])
    {
        Console.WriteLine($"User removed reaction: {reaction.Type}");
    }
});
```

## Teams-specific activity handlers

### Channel created

A Teams channel was created.

```csharp
teams.OnChannelCreated(async (context, cancellationToken) =>
{

});
```

### Channel deleted

A Teams channel was deleted.

```csharp
teams.OnChannelDeleted(async (context, cancellationToken) =>
{

});
```

### Channel renamed

A Teams channel was renamed.

```csharp
teams.OnChannelRenamed(async (context, cancellationToken) =>
{

});
```

### Channel restored

A deleted channel was restored.

```csharp
teams.OnChannelRestored(async (context, cancellationToken) =>
{

});
```

### Channel member added

A member was added to a channel.

Handler example pending verification.

<!-- TODO: Verify the current C# registration API for channelMemberAdded. -->

### Channel member removed

A member was removed from a channel.

Handler example pending verification.

<!-- TODO: Verify the current C# registration API for channelMemberRemoved. -->

### Team renamed

The team was renamed.

```csharp
teams.OnTeamRenamed(async (context, cancellationToken) =>
{

});
```

### Team archived

The team was archived.

```csharp
teams.OnTeamArchived(async (context, cancellationToken) =>
{

});
```

### Team unarchived

A team where the agent is installed was unarchived.

```csharp
teams.OnTeamUnarchived(async (context, cancellationToken) =>
{

});
```

### Team deleted

The team was deleted.

```csharp
teams.OnTeamDeleted(async (context, cancellationToken) =>
{

});
```

### Team restored

A deleted team was restored.

```csharp
teams.OnTeamRestored(async (context, cancellationToken) =>
{

});
```

### Meeting started

A meeting started. The event name is `application/vnd.microsoft.meetingStart`.

```csharp
teams.OnMeetingStart(async (context, cancellationToken) =>
{

});
```

### Meeting ended

A meeting ended. The event name is `application/vnd.microsoft.meetingEnd`.

```csharp
teams.OnMeetingEnd(async (context, cancellationToken) =>
{

});
```

### Meeting participant joined

A participant joined a meeting. The event name is `application/vnd.microsoft.meetingParticipantJoin`.

```csharp
teams.OnMeetingJoin(async (context, cancellationToken) =>
{

});
```

### Meeting participant left

A participant left a meeting. The event name is `application/vnd.microsoft.meetingParticipantLeave`.

```csharp
teams.OnMeetingLeave(async (context, cancellationToken) =>
{

});
```

## Teams invoke activities

### Adaptive Card action

An Adaptive Card action was invoked (`adaptiveCard/action`).

```csharp
teams.OnAdaptiveCardAction((context, cancellationToken) =>
{
    throw new NotImplementedException();
});
```

### Dialog fetched

A dialog (task module) was fetched (`task/fetch`).

```csharp
teams.OnTaskFetch((context, cancellationToken) =>
{
    throw new NotImplementedException();
});
```

### Dialog submitted

A dialog (task module) was submitted (`task/submit`).

```csharp
teams.OnTaskSubmit((context, cancellationToken) =>
{
    throw new NotImplementedException();
});
```

### File consent

A file consent card was accepted or declined (`fileConsent/invoke`).

Handler example pending verification.

<!-- TODO: Verify the current C# file consent registration API. The source article lists OnFileConsent, but a current TeamsBotApplication example is needed. -->

### Sign-in state verified

The SDK handles `signin/verifyState` automatically as part of the OAuth flow. Don't register a handler solely to implement this flow.

::: zone-end

::: zone pivot="teams-sdk-typescript"

Register handlers with `app.on(eventName, handler)` on an `App` instance named `app`, imported from `@microsoft/teams.apps`. The SDK infers the activity context type from the event name.

## Core activity handlers

### Any activity received

A catch-all handler observes incoming activities.

```typescript
app.on('activity', async (context) => {

});
```

### Message received

Handle incoming text messages. For regex matching, use `app.message(pattern, handler)`.

```typescript
app.on('message', async (context) => {

});
```

### Conversation update received

Handle a raw conversation update activity.

```typescript
app.on('conversationUpdate', async (context) => {

});
```

### Members added

One or more members joined the conversation. Read `context.activity.membersAdded`.

```typescript
app.on('membersAdded', async (context) => {

});
```

### Members removed

One or more members left the conversation. Read `context.activity.membersRemoved`.

```typescript
app.on('membersRemoved', async (context) => {

});
```

### Installation added

The agent was installed.

```typescript
app.on('install.add', async (context) => {

});
```

### Installation removed

The agent was uninstalled.

```typescript
app.on('install.remove', async (context) => {

});
```

### Message edited

A message was edited.

```typescript
app.on('messageUpdate', async (context) => {

});
```

### Message soft deleted

A message was soft deleted. `context.activity.channelData.eventType` is `softDeleteMessage`.

```typescript
app.on('messageDelete', async (context) => {

});
```

### Message undeleted

A deleted message was restored.

```typescript
app.on('messageUndelete', async (context) => {

});
```

### Read receipt received

A user read a message. The event name is `application/vnd.microsoft.readReceipt`.

```typescript
app.on('readReceipt', async (context) => {

});
```

### Message reactions

A user added or removed a reaction to an agent message. Handle both changes with the `messageReaction` event. Read `context.activity.reactionsAdded` and `context.activity.reactionsRemoved` for the reactions, and `context.activity.replyToId` for the message ID.

Agents can listen for reaction activity in conversations they're part of, for example, to respond when a user likes an agent message. These activities have `type` of `messageReaction` and apply to all scopes. Each reaction has a `type` value, such as `angry`, `heart`, `laugh`, `like`, `sad`, or `surprised`. The payload doesn't include the original message contents, so store the message when you send it if your agent needs those contents to process reactions. Payloads can also include the older message identifier in `legacy.replyToId`. See the [added](#reactions-added-payload) and [removed](#reactions-removed-payload) reaction payload examples.

```typescript
app.on('messageReaction', async (context) => {

});
```

The following example processes both added and removed reactions in one handler and logs each reaction's type:

```typescript
app.on('messageReaction', async ({ activity }) => {
  for (const reaction of activity.reactionsAdded ?? []) {
    console.log(`User added reaction: ${reaction.type}`);
  }

  for (const reaction of activity.reactionsRemoved ?? []) {
    console.log(`User removed reaction: ${reaction.type}`);
  }
});
```

## Teams-specific activity handlers

### Channel created

A Teams channel was created.

```typescript
app.on('channelCreated', async (context) => {

});
```

### Channel deleted

A Teams channel was deleted.

```typescript
app.on('channelDeleted', async (context) => {

});
```

### Channel renamed

A Teams channel was renamed.

```typescript
app.on('channelRenamed', async (context) => {

});
```

### Channel restored

A deleted channel was restored.

```typescript
app.on('channelRestored', async (context) => {

});
```

### Channel member added

A member was added to a channel.

```typescript
app.on('channelMemberAdded', async (context) => {

});
```

### Channel member removed

A member was removed from a channel.

```typescript
app.on('channelMemberRemoved', async (context) => {

});
```

### Team renamed

The team was renamed.

```typescript
app.on('teamRenamed', async (context) => {

});
```

### Team archived

The team was archived.

```typescript
app.on('teamArchived', async (context) => {

});
```

### Team unarchived

A team where the agent is installed was unarchived.

```typescript
app.on('teamUnarchived', async (context) => {

});
```

### Team deleted

The team was deleted.

```typescript
app.on('teamDeleted', async (context) => {

});
```

### Team restored

A deleted team was restored.

```typescript
app.on('teamRestored', async (context) => {

});
```

### Meeting started

A meeting started. The event name is `application/vnd.microsoft.meetingStart`.

```typescript
app.on('meetingStart', async (context) => {

});
```

### Meeting ended

A meeting ended. The event name is `application/vnd.microsoft.meetingEnd`.

```typescript
app.on('meetingEnd', async (context) => {

});
```

### Meeting participant joined

A participant joined a meeting. The event name is `application/vnd.microsoft.meetingParticipantJoin`.

```typescript
app.on('meetingParticipantJoin', async (context) => {

});
```

### Meeting participant left

A participant left a meeting. The event name is `application/vnd.microsoft.meetingParticipantLeave`.

```typescript
app.on('meetingParticipantLeave', async (context) => {

});
```

## Teams invoke activities

### Adaptive Card action

An Adaptive Card action was invoked (`adaptiveCard/action`).

```typescript
app.on('card.action', async (context) => {
    throw new Error('Not implemented');
});
```

### Dialog fetched

A dialog (task module) was fetched (`task/fetch`).

```typescript
app.on('dialog.open', async (context) => {
    throw new Error('Not implemented');
});
```

### Dialog submitted

A dialog (task module) was submitted (`task/submit`).

```typescript
app.on('dialog.submit', async (context) => {
    throw new Error('Not implemented');
});
```

### File consent

A file consent card was accepted or declined (`fileConsent/invoke`).

```typescript
app.on('file.consent', async (context) => {
    throw new Error('Not implemented');
});
```

### Sign-in state verified

The SDK handles `signin/verifyState` automatically as part of the OAuth flow. Don't register a handler solely to implement this flow.

::: zone-end

::: zone pivot="teams-sdk-python"

Register asynchronous functions with decorators on an `App` instance named `app`. Import `App` and `ActivityContext` from `microsoft_teams.apps`. The examples use `ActivityContext` without an activity type parameter; add the specific activity type when implementing each handler.

## Core activity handlers

### Any activity received

A catch-all handler observes incoming activities.

```python
@app.on_activity
async def handle_activity(ctx: ActivityContext):
    pass
```

### Message received

Handle incoming text messages. For regex matching, use `@app.on_message_pattern(re.compile(...))`.

```python
@app.on_message
async def handle_message(ctx: ActivityContext):
    pass
```

### Conversation update received

Handle a raw conversation update activity.

```python
@app.on_conversation_update
async def handle_conversation_update(ctx: ActivityContext):
    pass
```

### Members added

One or more members joined the conversation. Use the conversation update handler and inspect `ctx.activity.members_added`.

```python
@app.on_conversation_update
async def handle_members_added(ctx: ActivityContext):
    pass
```

### Members removed

One or more members left the conversation. Use the conversation update handler and inspect `ctx.activity.members_removed`.

```python
@app.on_conversation_update
async def handle_members_removed(ctx: ActivityContext):
    pass
```

### Installation added

The agent was installed.

```python
@app.on_install_add
async def handle_install_add(ctx: ActivityContext):
    pass
```

### Installation removed

The agent was uninstalled.

```python
@app.on_install_remove
async def handle_install_remove(ctx: ActivityContext):
    pass
```

### Message edited

A message was edited.

```python
@app.on_edit_message
async def handle_edit_message(ctx: ActivityContext):
    pass
```

### Message soft deleted

A message was soft deleted.

```python
@app.on_soft_delete_message
async def handle_soft_delete_message(ctx: ActivityContext):
    pass
```

### Message undeleted

A deleted message was restored.

```python
@app.on_undelete_message
async def handle_undelete_message(ctx: ActivityContext):
    pass
```

### Read receipt received

A user read a message. The event name is `application/vnd.microsoft.readReceipt`.

Handler example pending verification.

<!-- TODO: Verify the Python handler registration API for read receipts. -->

### Message reactions

A user added or removed a reaction to an agent message. Handle both changes with `@app.on_message_reaction`. Read `ctx.activity.reactions_added` and `ctx.activity.reactions_removed` for the reactions, and `ctx.activity.reply_to_id` for the message ID.

Agents can listen for reaction activity in conversations they're part of, for example, to respond when a user likes an agent message. These activities have `type` of `messageReaction` and apply to all scopes. Each reaction has a `type` value, such as `angry`, `heart`, `laugh`, `like`, `sad`, or `surprised`. The payload doesn't include the original message contents, so store the message when you send it if your agent needs those contents to process reactions. Payloads can also include the older message identifier in `legacy.replyToId`. See the [added](#reactions-added-payload) and [removed](#reactions-removed-payload) reaction payload examples.

```python
@app.on_message_reaction
async def handle_reaction(ctx: ActivityContext):
    pass
```

The following example processes both added and removed reactions in one handler and logs each reaction's type:

```python
@app.on_message_reaction
async def handle_reaction(ctx: ActivityContext[MessageReactionActivity]):
    for reaction in ctx.activity.reactions_added or []:
        print(f"User added reaction: {reaction.type}")

    for reaction in ctx.activity.reactions_removed or []:
        print(f"User removed reaction: {reaction.type}")
```

## Teams-specific activity handlers

### Channel created

A Teams channel was created.

```python
@app.on_channel_created
async def handle_channel_created(ctx: ActivityContext):
    pass
```

### Channel deleted

A Teams channel was deleted.

```python
@app.on_channel_deleted
async def handle_channel_deleted(ctx: ActivityContext):
    pass
```

### Channel renamed

A Teams channel was renamed.

```python
@app.on_channel_renamed
async def handle_channel_renamed(ctx: ActivityContext):
    pass
```

### Channel restored

A deleted channel was restored.

```python
@app.on_channel_restored
async def handle_channel_restored(ctx: ActivityContext):
    pass
```

### Channel member added

A member was added to a channel.

Handler example pending verification.

<!-- TODO: Verify the Python handler registration API for channelMemberAdded. -->

### Channel member removed

A member was removed from a channel.

Handler example pending verification.

<!-- TODO: Verify the Python handler registration API for channelMemberRemoved. -->

### Team renamed

The team was renamed.

```python
@app.on_team_renamed
async def handle_team_renamed(ctx: ActivityContext):
    pass
```

### Team archived

The team was archived.

```python
@app.on_team_archived
async def handle_team_archived(ctx: ActivityContext):
    pass
```

### Team unarchived

A team where the agent is installed was unarchived.

```python
@app.on_team_unarchived
async def handle_team_unarchived(ctx: ActivityContext):
    pass
```

### Team deleted

The team was deleted.

```python
@app.on_team_deleted
async def handle_team_deleted(ctx: ActivityContext):
    pass
```

### Team restored

A deleted team was restored.

```python
@app.on_team_restored
async def handle_team_restored(ctx: ActivityContext):
    pass
```

### Meeting started

A meeting started. The event name is `application/vnd.microsoft.meetingStart`.

```python
@app.on_meeting_start
async def handle_meeting_start(ctx: ActivityContext):
    pass
```

### Meeting ended

A meeting ended. The event name is `application/vnd.microsoft.meetingEnd`.

```python
@app.on_meeting_end
async def handle_meeting_end(ctx: ActivityContext):
    pass
```

### Meeting participant joined

A participant joined a meeting. The event name is `application/vnd.microsoft.meetingParticipantJoin`.

```python
@app.on_meeting_participant_join
async def handle_meeting_participant_join(ctx: ActivityContext):
    pass
```

### Meeting participant left

A participant left a meeting. The event name is `application/vnd.microsoft.meetingParticipantLeave`.

```python
@app.on_meeting_participant_leave
async def handle_meeting_participant_leave(ctx: ActivityContext):
    pass
```

## Teams invoke activities

### Adaptive Card action

An Adaptive Card action was invoked (`adaptiveCard/action`).

```python
@app.on_card_action
async def handle_card_action(ctx: ActivityContext):
    raise NotImplementedError
```

### Dialog fetched

A dialog (task module) was fetched (`task/fetch`).

```python
@app.on_dialog_open
async def handle_dialog_open(ctx: ActivityContext):
    raise NotImplementedError
```

### Dialog submitted

A dialog (task module) was submitted (`task/submit`).

```python
@app.on_dialog_submit
async def handle_dialog_submit(ctx: ActivityContext):
    raise NotImplementedError
```

### File consent

A file consent card was accepted or declined (`fileConsent/invoke`).

```python
@app.on_file_consent
async def handle_file_consent(ctx: ActivityContext):
    raise NotImplementedError
```

### Sign-in state verified

The SDK handles `signin/verifyState` automatically as part of the OAuth flow. Don't register a handler solely to implement this flow.

::: zone-end

## Conversation update event details

Teams sends `conversationUpdate` activities when an agent is added to a conversation, other members join or leave, or conversation metadata changes. An agent receives membership updates for teams where it's installed and an initial update when it's first added to a personal conversation.

Use conversation events to:

- Welcome users when your agent is added to a team or a new member joins.
- Notify users about membership changes or channel creation, renaming, and deletion.
- Identify the channel a user selected during installation.

Channel and team lifecycle events apply to the team scope. Membership events apply to personal chats, group chats, and teams.

> [!NOTE]
> When an Azure Communication Services (ACS) client joins or leaves a Teams meeting, no conversation update events are triggered.

Conversation update activities have `type` of `conversationUpdate`. Channel and team lifecycle events identify the change in `channelData.eventType`. Membership changes also populate `membersAdded` or `membersRemoved`.

| Event | Payload event type or field | Scope | Payload example |
| --- | --- | --- | --- |
| Channel created | `channelData.eventType`: `channelCreated` | Team | [Channel created](#channel-created-payload) |
| Channel renamed | `channelData.eventType`: `channelRenamed` | Team | [Channel renamed](#channel-renamed-payload) |
| Channel deleted | `channelData.eventType`: `channelDeleted` | Team | [Channel deleted](#channel-deleted-payload) |
| Channel restored | `channelData.eventType`: `channelRestored` | Team | [Channel restored](#channel-restored-payload) |
| Members added | `membersAdded`; in a team, `channelData.eventType`: `teamMemberAdded` | All | [Team installation](#members-added-team-installation-payload), [personal installation](#members-added-personal-installation-payload) |
| Members removed | `membersRemoved`; in a team, `channelData.eventType`: `teamMemberRemoved` | All | [Members removed](#members-removed-payload) |
| Team renamed | `channelData.eventType`: `teamRenamed` | Team | [Team renamed](#team-renamed-payload) |
| Team deleted | `channelData.eventType`: `teamDeleted` | Team | [Team deleted](#team-deleted-payload) |
| Team archived | `channelData.eventType`: `teamArchived` | Team | [Team archived](#team-archived-payload) |
| Team unarchived | `channelData.eventType`: `teamUnarchived` | Team | [Team unarchived](#team-unarchived-payload) |
| Team restored | `channelData.eventType`: `teamRestored` | Team | [Team restored](#team-restored-payload) |

Channel lifecycle payloads include the channel's ID and name in `channelData.channel` and the team ID in `channelData.team`. Team lifecycle payloads include the team's ID and name in `channelData.team`. Use these fields to identify the affected channel or team and, when appropriate, notify users about the change.

### Member changes

Member-added events occur when the agent is installed or a user joins a conversation where the agent is installed. Member-removed events occur when the agent is uninstalled, a user leaves, or a user is permanently deleted from the tenant.

These events can describe either the agent itself or another user. Compare each member's `id` in `membersAdded` or `membersRemoved` with `recipient.id` to determine whether the event concerns the agent. The agent's ID has the format `28:<MicrosoftAppId>`.

In a team context, the member-added event uses `channelData.eventType` of `teamMemberAdded`, and the member-removed event uses `teamMemberRemoved`.

User IDs in these payloads are unique to the agent. Cache them when needed for future interactions, such as directly messaging a user. When the agent is removed, clear cached data for the team as appropriate for your app's data-retention requirements.

When the agent is installed in a team, `conversation.id` identifies the channel selected by the user during installation or the channel from which installation was initiated. It isn't necessarily the General channel. For agent installation and removal workflows, prefer the [installation update event](#installation-update-event-details).

## Installation update event details

Teams sends an activity with `type` of `installationUpdate` when an agent is installed in or uninstalled from a conversation thread. Use installation updates to send an introductory message when your agent is installed and to clean up user or conversation-thread data when it's uninstalled. This helps your app meet privacy and data-retention requirements.

Inspect `action` to determine the change.

| Action | Meaning |
| --- | --- |
| `add` | The agent was installed in a conversation thread. |
| `remove` | The agent was uninstalled from a conversation thread. |
| `add-upgrade` | An app upgrade added the agent to the manifest. |
| `remove-upgrade` | An app upgrade removed the agent from the manifest. |

When an app is upgraded, Teams sends this event only if the upgrade adds or removes an agent from the manifest. Other app upgrades don't trigger an installation update event.

### Install update event

When an agent is installed in a team, `conversation.id` in both the conversation update and installation update activities identifies the channel selected during installation or the channel where installation occurred. Send your welcome message to this channel, where the user intends the agent to operate. If you explicitly need the General channel ID, use `channelData.team.id`.

The [installation payload](#installation-update-payload) also shows `channelData.settings.selectedChannel.id`, `channelData.channel`, `channelData.team`, tenant information, and the installation source.

The following example shows installation in the Response channel of the Daves Demo team. Both activities identify the Response channel:

:::image type="content" source="~/assets/videos/addteam.gif" alt-text="Animation showing installation of an agent in the selected Response channel.":::

> [!NOTE]
> The selected channel ID is only set on `installationUpdate` `add` events when an app is installed into a team. In the associated team-installation conversation update payload, `conversation.id` and `channelData.settings.selectedChannel.id` identify the selected channel.

### Uninstall behavior for personal app with agent

When an app is uninstalled, its agent is also uninstalled. Users receive a `403` response if they attempt to send a message to the app, and the agent receives a `403` response when it attempts to post new messages.

Personal scope follows the same post-uninstall behavior as team and group chat scopes: the agent can't send or receive messages after the app is uninstalled.

:::image type="content" source="../assets/images/bots/uninstallbot.png" alt-text="Screenshot showing a forbidden response after an agent is uninstalled." lightbox="../assets/images/bots/uninstallbot.png" border="true":::

### Event handling for install and uninstall events

Teams can add new events at any time, so design your agent to accept events it doesn't recognize. By default, Teams SDK responds with `200 OK` to events for which you haven't registered a handler.

If you build an agent without Teams SDK or customize the SDK's default event handling, preserve this behavior for unexpected events. Otherwise, new installation, uninstallation, or other events can cause exceptions in your agent.

## Handling errors in conversation events

Don't send error messages that lack meaningful context to the conversation. The following screenshot shows an unhelpful error response:

:::image type="content" source="../assets/images/handling-error.png" alt-text="Screenshot showing an error message without meaningful context in an agent conversation.":::

During development, meaningful diagnostic messages can help explain a specific error. In production, log errors and events to Azure Application Insights instead of posting debugging details to the conversation. For more information, see [Add telemetry to your bot](/azure/bot-service/bot-builder-telemetry?view=azure-bot-service-4.0&tabs=csharp&preserve-view=true).

## Event payload examples

The following JSON examples show incoming activities independently of the SDK language. Sample IDs and timestamps are illustrative.

### Channel created payload

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

### Channel renamed payload

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

### Channel deleted payload

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

### Channel restored payload

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

### Members added team installation payload

This example shows the activity received when the agent is added to a team. `conversation.id` and `channelData.settings.selectedChannel.id` identify the channel selected during installation or the channel from which installation was triggered.

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
        "name": "Test Agent"
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

### Members added personal installation payload

This example shows the activity received when the agent is added to a one-to-one chat.

```json
{
    "membersAdded": [
        {
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

### Members removed payload

This example's `channelData` describes a team membership change, not a group chat or a new one-to-one conversation.

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
    "recipient": {
        "id": "28:f5d48856-5b42-41a0-8c3a-c5f944b679b0",
        "name": "SongsuggesterAgent"
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

### Team renamed payload

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

### Team deleted payload

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

### Team restored payload

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
        "eventType": "teamRestored",
        "tenant": {
            "id": "72f988bf-86f1-41af-91ab-2d7cd011db47"
        }
    }
}
```

### Team archived payload

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

### Team unarchived payload

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

### Reactions added payload

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

### Reactions removed payload

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

### Installation update payload

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
        "name": "Test Agent"
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
