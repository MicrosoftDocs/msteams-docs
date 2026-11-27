---
title: Teams Agent Events and Activity Handlers
description: Teams agent events include messages, member changes, channel updates, meetings, and card actions. Find handler registration syntax for each SDK language.
ms.topic: reference
ms.date: 11/27/2026
zone_pivot_groups: teams-sdk-languages
ai-usage: ai-assisted
---

# Teams agent event reference

Use this reference to find the handler registration syntax for Teams agent activities. For an introduction, see [Activities and handlers](activities-handlers.md).

The language-independent [conversation update](#conversationupdate-activities) and [installation update](#installation-update-event-details) sections describe event scopes and payload fields. [Event payload examples](#event-payload-examples) apply to all SDK languages.

Invoke handlers can require a response to Teams. The invoke examples throw a not-implemented exception instead of returning a success response without an implementation. Replace the exception with the appropriate response before using these handlers.

## Event reference

::: zone pivot="teams-sdk-csharp"

#### Core activity handlers

The `App` class exposes extension methods for registering handlers. Methods return `App` for fluent chaining.

| Event | Extension method | Description |
| --- | --- | --- |
| Any activity type received | `OnActivity(handler)` | Catch-all handler called for every activity. |
| Message activity received | `OnMessage(handler)` | Handle incoming text messages. Pass a regex string as the first argument for pattern matching. |
| Conversation update received | `OnConversationUpdate(handler)` | Raw conversation update activity. |
| Non-agent members joined | `OnMembersAdded(handler)` | Fires when `MembersAdded.Length > 0`. |
| Non-agent members left | `OnMembersRemoved(handler)` | Fires when `MembersRemoved.Length > 0`. |
| Installation added | `OnInstall(handler)` | Agent was installed. |

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

::: zone-end

::: zone pivot="teams-sdk-typescript"

#### Core activity handlers

The list of event names supported by `app.on()` includes the following:

| Event | Event name string | Description |
| --- | --- | --- |
| Any activity type received | `'activity'` | Catch-all handler called for every activity. |
| Message activity received | `'message'` | Handle incoming text messages. Use `app.message(pattern, handler)` for regex matching. |
| Conversation update received | `'conversationUpdate'` | Raw conversation update activity. |
| Installation added | `'install.add'` | Agent was installed. |
| Installation removed | `'install.remove'` | Agent was uninstalled. |
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
| `channelMemberAdded` | `'channelMemberAdded'` | A member was added to a channel. Inspect the [conversion fields](#handle-group-chat-to-channel-conversion-events) before responding. |
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

::: zone-end

::: zone pivot="teams-sdk-python"

#### Core activity handlers

The `App` class exposes decorator-style handler registration.

| Event | Decorator | Description |
| --- | --- | --- |
| Any activity received | `@app.on_activity` | Catch-all handler for every activity. |
| Message received | `@app.on_message` | Handle incoming text messages. |
| Message with pattern | `@app.on_message_pattern(re.compile(...))` | Handle messages matching a regex pattern. |
| Conversation update | `@app.on_conversation_update` | Raw conversation update; check `members_added` / `members_removed`. |
| Installation added | `@app.on_install_add` | Agent was installed. |
| Installation removed | `@app.on_install_remove` | Agent was uninstalled. |

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

::: zone-end

## Message reaction activities

Each reaction has a `type` value, such as `angry`, `heart`, `laugh`, `like`, `sad`, or `surprised`. The payload doesn't include the original message contents, so store the message when you send it if your agent needs those contents to process reactions. Payloads can also include the older message identifier in `legacy.replyToId`. See the [added](#reactions-added-payload) and [removed](#reactions-removed-payload) reaction payload examples.

::: zone pivot="teams-sdk-csharp"

Use `OnMessageReaction` to handle both changes. Read `context.Activity.ReactionsAdded` and `context.Activity.ReactionsRemoved` for the reactions, and `context.Activity.ReplyToId` for the message ID.

```csharp
teams.OnMessageReaction(async (context, cancellationToken) =>
{

});
```

Teams SDK also provides separate handlers specifically for `OnMessageReactionAdded` and `OnMessageReactionRemoved`. Implement either the general handler or the specific handlers, not both. The following example illustrated using the specific handlers to log each added or removed reaction's type.

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

::: zone-end

::: zone pivot="teams-sdk-typescript"

Handle both changes with the `messageReaction` event. Read `context.activity.reactionsAdded` and `context.activity.reactionsRemoved` for the reactions, and `context.activity.replyToId` for the message ID.

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

::: zone-end

::: zone pivot="teams-sdk-python"

Handle both changes with `@app.on_message_reaction`. Read `ctx.activity.reactions_added` and `ctx.activity.reactions_removed` for the reactions, and `ctx.activity.reply_to_id` for the message ID.

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

::: zone-end

## conversationUpdate activities

`conversationUpdate` activities are used to represent multiple kinds of events in Teams. Different `conversationUpdate` events can be distinguished by examining their `channelData` properties. In most cases, this is not necessary, as Teams SDK provided dedicated activity handler subscriptions for each kind.

Conversation update activity payloads have `type` of `conversationUpdate`. Channel and team lifecycle events identify the change in `channelData.eventType`. Membership changes also populate `membersAdded` or `membersRemoved`.

| Event | Payload event type or field | Scope | Payload example |
| --- | --- | --- | --- |
| Channel created | `channelData.eventType`: `channelCreated` | Team | [Channel created](#channel-created-payload) |
| Channel renamed | `channelData.eventType`: `channelRenamed` | Team | [Channel renamed](#channel-renamed-payload) |
| Channel deleted | `channelData.eventType`: `channelDeleted` | Team | [Channel deleted](#channel-deleted-payload) |
| Channel restored | `channelData.eventType`: `channelRestored` | Team | [Channel restored](#channel-restored-payload) |
| Channel members added | `channelData.eventType`: `channelMemberAdded`; `membersAdded` | Channel | For conversion-specific fields, see [Handle group-chat-to-channel conversion events](#handle-group-chat-to-channel-conversion-events). |
| Members added | `membersAdded`; in a team, `channelData.eventType`: `teamMemberAdded` | All | [Team installation](#members-added-team-installation-payload), [personal installation](#members-added-personal-installation-payload) |
| Members removed | `membersRemoved`; in a team, `channelData.eventType`: `teamMemberRemoved` | All | [Members removed](#members-removed-payload) |
| Team renamed | `channelData.eventType`: `teamRenamed` | Team | [Team renamed](#team-renamed-payload) |
| Team deleted | `channelData.eventType`: `teamDeleted` | Team | [Team deleted](#team-deleted-payload) |
| Team archived | `channelData.eventType`: `teamArchived` | Team | [Team archived](#team-archived-payload) |
| Team unarchived | `channelData.eventType`: `teamUnarchived` | Team | [Team unarchived](#team-unarchived-payload) |
| Team restored | `channelData.eventType`: `teamRestored` | Team | [Team restored](#team-restored-payload) |

Channel lifecycle payloads include the channel's ID and name in `channelData.channel` and the team ID in `channelData.team`. Team lifecycle payloads include the team's ID and name in `channelData.team`. Use these fields to identify the affected channel or team and, when appropriate, notify users about the change.

Azure Communication Services clients joining or leaving Teams meetings do not trigger conversation update activities.

### Handle group-chat-to-channel conversion events

When a group chat is converted into a private channel, agents added to the destination channel receive conversation events. These events also occur outside conversion, so inspect the activity payload before deciding how to respond. For conversion behavior and agent eligibility, see [Preserve conversation state during conversion](build-conversational-capability.md#preserve-conversation-state-during-conversion).

| Event | Received after conversion? | Guidance |
| --- | --- | --- |
| `conversationUpdate/channelMemberAdded` | All agents added to the destination channel. | Use only this handler for state reassociation and other required post-conversion behavior. The presence of `channelData.convertedFromConversation.id` indicates conversion. Use its value as the original group chat ID and `conversation.id` as the destination conversation ID. Suppress welcome messages and repeated onboarding. |
| `installationUpdate/add` | Agents added to the destination channel that weren't already members of its team. | Usually doesn't require conversion-specific logic. If you handle it for other reasons, check `channelData.settings.backgroundInstall`. When it's `true`, suppress welcome messages and other behavior that's inappropriate for automatic installation. Don't reassociate state in this handler. |
| `conversationUpdate/teamMemberAdded` | Agents added to the destination channel that weren't already members of its team. | Don't use this event for conversion-related logic. Its payload doesn't distinguish conversion from other scenarios. |

> [!NOTE]
> `channelData.convertedFromConversation.id` identifies the original group chat in a conversion-related `channelMemberAdded` activity. `channelData.settings.backgroundInstall` is a Boolean flag for automatic installation, which can occur during conversion or in other scenarios. Don't use the installation flag alone to identify conversion.

> [!IMPORTANT]
> These activities can arrive in any order. Perform state reassociation only in the `channelMemberAdded` handler, without waiting for installation or team membership events. Moved messages don't generate message activities.

The following TypeScript example illustrates conversion detection in an existing Teams SDK app. Replace the comments with your agent's state storage logic. The local type extension describes the source-conversation field for SDK versions that don't declare it.

::: zone pivot="teams-sdk-typescript"

```typescript
import type { ChannelData } from '@microsoft/teams.api';

app.on('channelMemberAdded', async ({ activity }) => {
  const channelData: ChannelData & {
    convertedFromConversation?: { id?: string };
  } = activity.channelData ?? {};
  const originalConversationId = channelData.convertedFromConversation?.id;

  if (originalConversationId) {
    // Reassociate state from originalConversationId with activity.conversation.id.
    // Don't send a welcome message for the continuing conversation.
  } else {
    // Handle ordinary channel membership additions as appropriate.
  }
});
```

* `channelData.convertedFromConversation.id` identifies the group chat before conversion. Use the received ID to locate existing state.
* `activity.conversation.id` identifies the destination conversation. Associate the existing state with this received ID.

::: zone-end

For automatic-install onboarding suppression, see the installation handlers in [Proactive messages](how-to/conversations/send-proactive-messages.md#samples).

### Member changes

Member-added events occur when the agent is installed or a user joins a conversation where the agent is installed. Member-removed events occur when the agent is uninstalled, a user leaves, or a user is permanently deleted from the tenant.

These events can describe either the agent itself or another user. Compare each member's `id` in `membersAdded` or `membersRemoved` with `recipient.id` to determine whether the event concerns the agent. The agent's ID has the format `28:<MicrosoftAppId>`.

In a team context, the member-added event uses `channelData.eventType` of `teamMemberAdded`, and the member-removed event uses `teamMemberRemoved`.

During group-chat-to-channel conversion, agents added to the destination channel also receive `teamMemberAdded` if they weren't already members of its team. This event can't identify conversion. Use the [conversion-related `channelMemberAdded` activity](#handle-group-chat-to-channel-conversion-events) for state reassociation instead.

User IDs in these payloads are unique to the agent. Cache them when needed for future interactions, such as directly messaging a user. When the agent is removed, clear cached data for the team as appropriate for your app's data-retention requirements.

When the agent is installed in a team, `conversation.id` identifies the channel selected by the user during installation or the channel from which installation was initiated. It isn't necessarily the General channel. For agent installation and removal workflows, prefer the [installation update event](#installation-update-event-details).

## Installation update event details

Teams sends an activity with `type` of `installationUpdate` when an agent is installed in or uninstalled from a conversation thread. Use installation updates to send an introductory message when appropriate and to clean up user or conversation-thread data when it's uninstalled. This helps your app meet privacy and data-retention requirements.

Inspect `action` to determine the change.

| Action | Meaning |
| --- | --- |
| `add` | The agent was installed in a conversation thread. |
| `remove` | The agent was uninstalled from a conversation thread. |
| `add-upgrade` | An app upgrade added the agent to the manifest. |
| `remove-upgrade` | An app upgrade removed the agent from the manifest. |

When an app is upgraded, Teams sends this event only if the upgrade adds or removes an agent from the manifest. Other app upgrades don't trigger an installation update event.

### Install update event

When an agent is installed in a team, `conversation.id` in both the conversation update and installation update activities identifies the channel selected during installation or the channel where installation occurred. If a welcome message is appropriate, send it to this channel, where the user intends the agent to operate. If you explicitly need the General channel ID, use `channelData.team.id`.

Before sending an introductory message for an `installationUpdate/add` activity, check `channelData.settings.backgroundInstall`. When it's `true`, Teams performed the installation automatically, including some installations during group-chat-to-channel conversion. Suppress welcome messages and other onboarding behavior that's inappropriate for automatic installation. For guidance and examples, see [Welcome messages](how-to/conversations/send-proactive-messages.md#welcome-messages).

> [!NOTE]
> `backgroundInstall: true` doesn't establish that conversion occurred. Use the [conversion-related `channelMemberAdded` activity](#handle-group-chat-to-channel-conversion-events) for conversion detection and state reassociation.

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
