---
title: Teams Agent Events and Activity Handlers
description: Teams agent events include messages, member changes, channel updates, meetings, and card actions. Find handler registration syntax for each SDK language.
ms.topic: reference
ms.localizationpriority: medium
ms.owner: nickwalk
ms.date: 11/23/2026
zone_pivot_groups: teams-sdk-languages
ai-usage: ai-assisted
---

<!-- markdownlint-disable MD024 -->

# Teams agent event reference

Use this reference to find the handler registration syntax for Teams agent activities. For an introduction to activity handlers and agent logic, see [Understand agent concepts](bot-concepts.md).

The examples show handler declarations only, not event-processing logic. Initialize your agent as shown in [Teams activity handler](bot-concepts.md#teams-activity-handler), then register the handlers you need before starting the app. Some events share a handler; inspect the activity payload to distinguish them rather than registering duplicate handlers.

> [!NOTE]
> This reference includes all events listed in the agent concepts article, not every activity supported by the SDK. Handler examples marked as pending verification need to be completed before publishing. A missing example doesn't mean the event is unsupported.

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
teams.OnMessage((context, cancellationToken) => Task.CompletedTask);
```

### Conversation update received

Handle a raw conversation update activity.

```csharp
teams.OnConversationUpdate((context, cancellationToken) => Task.CompletedTask);
```

### Members added

One or more members joined the conversation. Read `context.Activity.MembersAdded`.

```csharp
teams.OnMembersAdded((context, cancellationToken) => Task.CompletedTask);
```

### Members removed

One or more members left the conversation. Read `context.Activity.MembersRemoved`.

```csharp
teams.OnMembersRemoved((context, cancellationToken) => Task.CompletedTask);
```

### Installation added

The agent was installed. Inspect `context.Activity.Action` to distinguish installation from removal.

```csharp
teams.OnInstall((context, cancellationToken) => Task.CompletedTask);
```

### Installation removed

The agent was uninstalled. Installation changes use the same handler; inspect `context.Activity.Action` for `remove`.

```csharp
teams.OnInstall((context, cancellationToken) => Task.CompletedTask);
```

### Message edited

A message was edited. Inspect `context.Activity.ChannelData?.EventType` to distinguish edits from restored messages.

```csharp
teams.OnMessageUpdate((context, cancellationToken) => Task.CompletedTask);
```

### Message soft deleted

A message was soft deleted.

```csharp
teams.OnMessageDelete((context, cancellationToken) => Task.CompletedTask);
```

### Message undeleted

A deleted message was restored. Use the message update handler and check for `context.Activity.ChannelData?.EventType == "undeleteMessage"`.

```csharp
teams.OnMessageUpdate((context, cancellationToken) => Task.CompletedTask);
```

### Read receipt received

A user read a message. The event name is `application/vnd.microsoft.readReceipt`.

```csharp
teams.OnReadReceipt((context, cancellationToken) => Task.CompletedTask);
```

## Teams-specific activity handlers

### Channel created

A Teams channel was created.

```csharp
teams.OnChannelCreated((context, cancellationToken) => Task.CompletedTask);
```

### Channel deleted

A Teams channel was deleted.

```csharp
teams.OnChannelDeleted((context, cancellationToken) => Task.CompletedTask);
```

### Channel renamed

A Teams channel was renamed.

```csharp
teams.OnChannelRenamed((context, cancellationToken) => Task.CompletedTask);
```

### Channel restored

A deleted channel was restored.

```csharp
teams.OnChannelRestored((context, cancellationToken) => Task.CompletedTask);
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
teams.OnTeamRenamed((context, cancellationToken) => Task.CompletedTask);
```

### Team archived

The team was archived.

```csharp
teams.OnTeamArchived((context, cancellationToken) => Task.CompletedTask);
```

### Team deleted

The team was deleted.

```csharp
teams.OnTeamDeleted((context, cancellationToken) => Task.CompletedTask);
```

### Team restored

A deleted team was restored.

```csharp
teams.OnTeamRestored((context, cancellationToken) => Task.CompletedTask);
```

### Meeting started

A meeting started. The event name is `application/vnd.microsoft.meetingStart`.

```csharp
teams.OnMeetingStart((context, cancellationToken) => Task.CompletedTask);
```

### Meeting ended

A meeting ended. The event name is `application/vnd.microsoft.meetingEnd`.

```csharp
teams.OnMeetingEnd((context, cancellationToken) => Task.CompletedTask);
```

### Meeting participant joined

A participant joined a meeting. The event name is `application/vnd.microsoft.meetingParticipantJoin`.

```csharp
teams.OnMeetingJoin((context, cancellationToken) => Task.CompletedTask);
```

### Meeting participant left

A participant left a meeting. The event name is `application/vnd.microsoft.meetingParticipantLeave`.

```csharp
teams.OnMeetingLeave((context, cancellationToken) => Task.CompletedTask);
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
app.on('activity', async (context) => {});
```

### Message received

Handle incoming text messages. For regex matching, use `app.message(pattern, handler)`.

```typescript
app.on('message', async (context) => {});
```

### Conversation update received

Handle a raw conversation update activity.

```typescript
app.on('conversationUpdate', async (context) => {});
```

### Members added

One or more members joined the conversation. Read `context.activity.membersAdded`.

```typescript
app.on('membersAdded', async (context) => {});
```

### Members removed

One or more members left the conversation. Read `context.activity.membersRemoved`.

```typescript
app.on('membersRemoved', async (context) => {});
```

### Installation added

The agent was installed.

```typescript
app.on('install.add', async (context) => {});
```

### Installation removed

The agent was uninstalled.

```typescript
app.on('install.remove', async (context) => {});
```

### Message edited

A message was edited.

```typescript
app.on('messageUpdate', async (context) => {});
```

### Message soft deleted

A message was soft deleted. `context.activity.channelData.eventType` is `softDeleteMessage`.

```typescript
app.on('messageDelete', async (context) => {});
```

### Message undeleted

A deleted message was restored.

```typescript
app.on('messageUndelete', async (context) => {});
```

### Read receipt received

A user read a message. The event name is `application/vnd.microsoft.readReceipt`.

```typescript
app.on('readReceipt', async (context) => {});
```

## Teams-specific activity handlers

### Channel created

A Teams channel was created.

```typescript
app.on('channelCreated', async (context) => {});
```

### Channel deleted

A Teams channel was deleted.

```typescript
app.on('channelDeleted', async (context) => {});
```

### Channel renamed

A Teams channel was renamed.

```typescript
app.on('channelRenamed', async (context) => {});
```

### Channel restored

A deleted channel was restored.

```typescript
app.on('channelRestored', async (context) => {});
```

### Channel member added

A member was added to a channel.

```typescript
app.on('channelMemberAdded', async (context) => {});
```

### Channel member removed

A member was removed from a channel.

```typescript
app.on('channelMemberRemoved', async (context) => {});
```

### Team renamed

The team was renamed.

```typescript
app.on('teamRenamed', async (context) => {});
```

### Team archived

The team was archived.

```typescript
app.on('teamArchived', async (context) => {});
```

### Team deleted

The team was deleted.

```typescript
app.on('teamDeleted', async (context) => {});
```

### Team restored

A deleted team was restored.

```typescript
app.on('teamRestored', async (context) => {});
```

### Meeting started

A meeting started. The event name is `application/vnd.microsoft.meetingStart`.

```typescript
app.on('meetingStart', async (context) => {});
```

### Meeting ended

A meeting ended. The event name is `application/vnd.microsoft.meetingEnd`.

```typescript
app.on('meetingEnd', async (context) => {});
```

### Meeting participant joined

A participant joined a meeting. The event name is `application/vnd.microsoft.meetingParticipantJoin`.

```typescript
app.on('meetingParticipantJoin', async (context) => {});
```

### Meeting participant left

A participant left a meeting. The event name is `application/vnd.microsoft.meetingParticipantLeave`.

```typescript
app.on('meetingParticipantLeave', async (context) => {});
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
