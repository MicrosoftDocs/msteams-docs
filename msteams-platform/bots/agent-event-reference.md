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

The examples show handler declarations only, not event-processing logic. For handler basics, see [Activities and handlers](bot-concepts.md#activities-and-handlers). Register the handlers you need before starting the app. Some events share a handler; inspect the activity payload to distinguish them rather than registering duplicate handlers.

The language-independent [conversation update](#conversation-update-event-details), [message reaction](#message-reaction-event-details), and [installation update](#installation-update-event-details) sections describe event scopes and payload fields. [Event payload examples](#event-payload-examples) apply to all SDK languages.

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

### Reactions added to agent message

A user added a reaction to an agent message. Read `context.Activity.ReactionsAdded` and `context.Activity.ReplyToId`.

```csharp
teams.OnMessageReactionAdded(async (context, cancellationToken) =>
{

});
```

### Reactions removed from agent message

A user removed a reaction from an agent message. Read `context.Activity.ReactionsRemoved` and `context.Activity.ReplyToId`.

```csharp
teams.OnMessageReactionRemoved(async (context, cancellationToken) =>
{

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

### Reactions added to agent message

A user added a reaction to an agent message. Read `context.activity.reactionsAdded` and `context.activity.replyToId`.

```typescript
app.on('reactionsAdded', async (context) => {

});
```

### Reactions removed from agent message

A user removed a reaction from an agent message. Read `context.activity.reactionsRemoved` and `context.activity.replyToId`.

```typescript
app.on('reactionsRemoved', async (context) => {

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

### Reactions added to agent message

A user added a reaction to an agent message. Read `ctx.activity.reactions_added` and `ctx.activity.reply_to_id`.

```python
@app.on_reactions_added
async def handle_reactions_added(ctx: ActivityContext):
    pass
```

### Reactions removed from agent message

A user removed a reaction from an agent message. Read `ctx.activity.reactions_removed` and `ctx.activity.reply_to_id`.

```python
@app.on_reactions_removed
async def handle_reactions_removed(ctx: ActivityContext):
    pass
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

Member-added events occur when the agent is installed or a user joins a conversation where the agent is installed. Member-removed events occur when the agent is uninstalled, a user leaves, or a user is permanently deleted from the tenant. Compare member IDs with `recipient.id` to distinguish agent changes from user changes. See [Member changes](bot-concepts.md#member-changes) for caching and installation behavior.

## Message reaction event details

Message reaction activities have `type` of `messageReaction` and apply to all scopes.

| Event | Payload field | Scope | Payload example |
| --- | --- | --- | --- |
| Reactions added to agent message | `reactionsAdded` | All | [Reactions added](#reactions-added-payload) |
| Reactions removed from agent message | `reactionsRemoved` | All | [Reactions removed](#reactions-removed-payload) |

Each reaction has a `type` value. `replyToId` identifies the agent message that received the reaction; the payload doesn't include the message contents. Payloads can also include the older identifier in `legacy.replyToId`. See [Message reaction events](bot-concepts.md#message-reaction-events) for message storage guidance.

## Installation update event details

Installation update activities have `type` of `installationUpdate`. Inspect `action` to determine the change.

| Action | Meaning |
| --- | --- |
| `add` | The agent was installed in a conversation thread. |
| `remove` | The agent was uninstalled from a conversation thread. |
| `add-upgrade` | An app upgrade added the agent to the manifest. |
| `remove-upgrade` | An app upgrade removed the agent from the manifest. |

For a team installation, `conversation.id` identifies the channel selected by the user or the channel where installation occurred. The [installation payload](#installation-update-payload) also shows `channelData.settings.selectedChannel.id`, `channelData.channel`, `channelData.team`, tenant information, and the installation source. See [Install update event](bot-concepts.md#install-update-event) for welcome-message routing and selected-channel limitations.

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
