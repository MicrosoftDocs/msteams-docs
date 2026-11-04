---
title: Conversation events
description: Learn how to handle conversation updates, message reactions, and app installation events for Microsoft Teams agents.
ms.topic: article
ms.localizationpriority: medium
ms.author: nickwalk
ms.date: 10/09/2026
zone_pivot_groups: teams-sdk-languages
---

# Conversation events for agents

Conversation events are activities that Teams sends to your agent when a conversation changes. Handle these events to welcome members, respond to team and channel changes, track reactions to agent messages, and manage data when your app is installed or uninstalled.

## User experience

Conversation events help your agent respond at the right point in the user journey. For example, your agent can:

* Introduce itself in the channel that a user selects during installation.
* Welcome a member who joins a conversation.
* Adjust its behavior when a team or channel changes.
* Acknowledge a reaction to an agent message.
* Clean up conversation data when the app is uninstalled.

Avoid sending a message for every event. Send a message only when it gives users useful context or a clear next action.

## Developer experience

To implement conversation events:

1. [Handle conversation update events](#handle-conversation-update-events) for membership, team, and channel changes.
1. [Handle message reaction events](#handle-message-reaction-events) for reactions to messages sent by your agent.
1. [Handle installation update events](#installation-update-event) to initialize or clean up conversation data.
1. [Plan for uninstall behavior](#plan-for-uninstall-behavior) and unexpected event types.

## Implement conversation events

Teams delivers each event as an activity to your agent's messaging endpoint. Register only the handlers that your scenario requires, and use the activity fields described in each section.

> [!IMPORTANT]
>
> * Teams can add event types. Your agent must accept events that it doesn't handle.
> * Teams SDK automatically returns `200 OK` for events that have no registered handler. If you override the base event handler or don't use Teams SDK, make sure unexpected events don't cause an exception.
> * Azure Communication Services clients joining or leaving a Teams meeting don't trigger conversation update events.

### Handle conversation update events

Teams sends a `conversationUpdate` activity when:

* Your agent is added to a conversation.
* A member is added to or removed from a conversation.
* Team or channel metadata changes.

The following table lists the supported conversation update events:

| Event type | Description | Scope |
| --- | --- | --- |
| [`channelCreated`](#register-conversation-event-handlers) | A channel is created. | Team |
| [`channelRenamed`](#register-conversation-event-handlers) | A channel is renamed. | Team |
| [`channelDeleted`](#register-conversation-event-handlers) | A channel is deleted. | Team |
| [`channelRestored`](#register-conversation-event-handlers) | A deleted channel is restored. | Team |
| [`channelShared`](#register-conversation-event-handlers) | A shared channel is shared with a team. | Shared channel |
| [`channelUnshared`](#register-conversation-event-handlers) | A shared channel is unshared from a team. | Shared channel |
| [`channelMemberAdded`](#handle-membership-updates-by-scope) | A member is added to a shared channel. | Shared channel |
| [`channelMemberRemoved`](#handle-membership-updates-by-scope) | A member is removed from a shared channel. | Shared channel |
| [`teamMemberAdded`](#handle-membership-updates-by-scope) | A member is added to a team. | Team |
| [`teamMemberRemoved`](#handle-membership-updates-by-scope) | A member is removed from a team. | Team |
| [`teamRenamed`](#register-conversation-event-handlers) | A team is renamed. | Team |
| [`teamDeleted`](#register-conversation-event-handlers) | A team is deleted. | Team |
| [`teamHardDeleted`](#register-conversation-event-handlers) | A team is permanently deleted. | Team |
| [`teamRestored`](#register-conversation-event-handlers) | A deleted team is restored. | Team |
| [`teamArchived`](#register-conversation-event-handlers) | A team is archived. | Team |
| [`teamUnarchived`](#register-conversation-event-handlers) | An archived team is restored. | Team |

#### Read conversation update data

Use these activity properties to determine what changed:

| Property | Use |
| --- | --- |
| `channelData.eventType` | Identifies the team or channel change. |
| `channelData.team` | Contains the team ID and, for rename events, the team name. |
| `channelData.channel` | Contains the channel ID and, for channel events, the channel name. |
| `membersAdded` | Contains the members added to the conversation. |
| `membersRemoved` | Contains the members removed from the conversation. |
| `recipient.id` | Identifies your agent. Compare this value with a member ID to determine whether the event is about the agent. |

#### Handle membership updates by scope

The general membership handlers route activities that contain `membersAdded` or `membersRemoved`. The activity payload varies by scope. Team and shared-channel membership activities also set `channelData.eventType`, which allows you to use a Teams-specific handler.

| Scope | General routing and payload | `channelData.eventType` |
| --- | --- | --- |
| Personal chat | Use the general added-members handler. `conversation.conversationType` is `personal`, `membersAdded` identifies the members, and `channelData.team` isn't present. | Not set to a team or channel membership event. |
| Group chat | Use the general added-members or removed-members handler and inspect `membersAdded` or `membersRemoved`. Team and channel data isn't present. | Not set to a team or channel membership event. |
| Team membership | The activity includes `membersAdded` or `membersRemoved` and team information in `channelData`. You can use either the general membership handler or the matching team-specific handler. | `teamMemberAdded` or `teamMemberRemoved`. |
| Shared-channel membership | The activity identifies the shared channel in `channelData` and includes the affected members. Use the matching channel-specific handler when the SDK provides one. | `channelMemberAdded` or `channelMemberRemoved`. |

Don't treat a shared-channel membership activity as a team membership activity. Shared-channel changes use `channelMemberAdded` or `channelMemberRemoved`, not `teamMemberAdded` or `teamMemberRemoved`.

For any membership collection, compare each member's `id` with `recipient.id`:

* If the IDs match, the agent was added or removed.
* If the IDs don't match, another member was added or removed.

Member IDs received in the activity are unique to your agent. You can cache them when you need to send a proactive message to that member later.

> [!TIP]
> Use the [`installationUpdate` event](#installation-update-event) rather than a membership event to determine when your agent is installed in or uninstalled from a conversation.

> [!NOTE]
> When a user is permanently deleted from a tenant, Teams sends a `conversationUpdate` activity with a `membersRemoved` collection.

#### Register conversation event handlers

Handler syntax and availability vary by SDK language. Select a language to view the handler for each event and the overall registration pattern.

::: zone pivot="teams-sdk-csharp"

| Event | Handler syntax |
| --- | --- |
| Channel created | `app.OnChannelCreated(handler)` |
| Channel renamed | `app.OnChannelRenamed(handler)` |
| Channel deleted | `app.OnChannelDeleted(handler)` |
| Channel restored | `app.OnChannelRestored(handler)` |
| Channel shared | `app.OnChannelShared(handler)` |
| Channel unshared | `app.OnChannelUnshared(handler)` |
| Channel member added | `app.OnChannelMemberAdded(handler)` |
| Channel member removed | `app.OnChannelMemberRemoved(handler)` |
| General members added | `app.OnMembersAdded(handler)` |
| General members removed | `app.OnMembersRemoved(handler)` |
| Team member added | `app.OnTeamMemberAdded(handler)` |
| Team member removed | `app.OnTeamMemberRemoved(handler)` |
| Team renamed | `app.OnTeamRenamed(handler)` |
| Team deleted | `app.OnTeamDeleted(handler)` |
| Team permanently deleted | `app.OnConversationUpdate(handler)` and check `ChannelData.EventType` |
| Team restored | `app.OnTeamRestored(handler)` |
| Team archived | `app.OnTeamArchived(handler)` |
| Team unarchived | `app.OnTeamUnarchived(handler)` |

```csharp
app.OnChannelCreated(async (context, cancellationToken) =>
{
    var channelName = context.Activity.ChannelData?.Channel?.Name ?? "unknown";
    await context.SendAsync(
        $"The {channelName} channel was created.",
        cancellationToken
    );
});

app.OnMembersAdded(async (context, cancellationToken) =>
{
    var membersAdded = context.Activity.MembersAdded;
    var agentId = context.Activity.Recipient?.Id;

    if (membersAdded is null || agentId is null)
    {
        return;
    }

    foreach (var member in membersAdded)
    {
        if (member.Id != agentId)
        {
            await context.SendAsync(
                $"Welcome, {member.Name ?? member.Id}.",
                cancellationToken
            );
        }
    }
});
```

* The handler receives both `context` and `cancellationToken` in Teams SDK 2.1.
* `ChannelData?.Channel?.Name` safely reads the channel that changed.
* `MembersAdded` contains every member included in the update.
* `SendAsync` sends the response and propagates the handler's cancellation token.

::: zone-end

::: zone pivot="teams-sdk-typescript"

| Event | Handler syntax |
| --- | --- |
| Channel created | `app.on('channelCreated', handler)` |
| Channel renamed | `app.on('channelRenamed', handler)` |
| Channel deleted | `app.on('channelDeleted', handler)` |
| Channel restored | `app.on('channelRestored', handler)` |
| Channel shared | `app.on('channelShared', handler)` |
| Channel unshared | `app.on('channelUnshared', handler)` |
| Channel member added | `app.on('channelMemberAdded', handler)` |
| Channel member removed | `app.on('channelMemberRemoved', handler)` |
| General members added | `app.on('membersAdded', handler)` |
| General members removed | `app.on('membersRemoved', handler)` |
| Team member added | `app.on('teamMemberAdded', handler)` |
| Team member removed | `app.on('teamMemberRemoved', handler)` |
| Team renamed | `app.on('teamRenamed', handler)` |
| Team deleted | `app.on('teamDeleted', handler)` |
| Team permanently deleted | `app.on('teamHardDeleted', handler)` |
| Team restored | `app.on('teamRestored', handler)` |
| Team archived | `app.on('teamArchived', handler)` |
| Team unarchived | `app.on('teamUnarchived', handler)` |

```typescript
app.on('channelCreated', async ({ activity, send }) => {
    const channel = activity.channelData.channel;

    if (!channel) {
        return;
    }

    await send(`The ${channel.name} channel was created.`);
});

app.on('membersAdded', async ({ activity, send }) => {
    const membersAdded = activity.membersAdded ?? [];
    const agentId = activity.recipient?.id;

    if (!agentId) {
        return;
    }

    for (const member of membersAdded) {
        if (member.id === agentId) {
            // Use installationUpdate to handle the agent installation lifecycle.
            continue;
        }

        await send(`Welcome, ${member.name ?? member.id}.`);
    }
});
```

* `channelCreated` selects the channel event to handle. Use another event name from the table for a different change.
* The `channel` guard handles an activity without channel details.
* `activity.membersAdded ?? []` handles an activity without an added-members collection.
* `activity.recipient?.id` identifies the agent when recipient data is available.
* A matching member ID identifies the agent rather than a human member. Ignore it here and use `installationUpdate` for installation lifecycle work.

::: zone-end

::: zone pivot="teams-sdk-python"

| Event | Handler syntax |
| --- | --- |
| Channel created | `@app.on_channel_created` |
| Channel renamed | `@app.on_channel_renamed` |
| Channel deleted | `@app.on_channel_deleted` |
| Channel restored | `@app.on_channel_restored` |
| Channel shared | `@app.on_conversation_update` and check `channel_data.event_type` |
| Channel unshared | `@app.on_conversation_update` and check `channel_data.event_type` |
| Channel member added | `@app.on_conversation_update` and check `channel_data.event_type` |
| Channel member removed | `@app.on_conversation_update` and check `channel_data.event_type` |
| General members added | `@app.on_conversation_update` and check `members_added` |
| General members removed | `@app.on_conversation_update` and check `members_removed` |
| Team member added | `@app.on_conversation_update` and check `channel_data.event_type` |
| Team member removed | `@app.on_conversation_update` and check `channel_data.event_type` |
| Team renamed | `@app.on_team_renamed` |
| Team deleted | `@app.on_team_deleted` |
| Team permanently deleted | `@app.on_team_hard_deleted` |
| Team restored | `@app.on_team_restored` |
| Team archived | `@app.on_team_archived` |
| Team unarchived | `@app.on_team_unarchived` |

```python
@app.on_channel_created
async def handle_channel_created(ctx: ActivityContext[ConversationUpdateActivity]):
    channel_data = ctx.activity.channel_data
    channel = channel_data.channel if channel_data else None

    if not channel:
        return

    await ctx.send(f"The {channel.name} channel was created.")


@app.on_conversation_update
async def handle_members_added(ctx: ActivityContext[ConversationUpdateActivity]):
    members_added = ctx.activity.members_added or []
    recipient = ctx.activity.recipient

    if not recipient:
        return

    for member in members_added:
        if member.id != recipient.id:
            await ctx.send(f"Welcome, {member.name or member.id}.")
```

* `@app.on_channel_created` registers the channel event handler. Use a dedicated decorator when the SDK provides one. Otherwise, use `@app.on_conversation_update` and check `channel_data.event_type`.
* The `channel_data` and `channel` checks handle an activity without channel details.
* `ctx.activity.members_added or []` handles an activity without an added-members collection.
* The `recipient` check ensures that the agent ID is available before comparing member IDs.

::: zone-end

### Handle message reaction events

Teams sends a `messageReaction` activity when a user adds or removes a reaction from a message sent by your agent.

| Activity property | Description |
| --- | --- |
| `reactionsAdded` | Contains the reactions added to the message. |
| `reactionsRemoved` | Contains the reactions removed from the message. |
| `replyToId` | Identifies the agent message that received the reaction. |
| `type` on each reaction | Identifies the reaction, such as `angry`, `heart`, `laugh`, `like`, `sad`, or `surprised`. |

The activity doesn't contain the original message. If your scenario depends on the message content, store the message with its ID when your agent sends it.

::: zone pivot="teams-sdk-csharp"

Register `OnMessageReaction` to handle both added and removed reactions. Inspect `context.Activity.ReactionsAdded` and `context.Activity.ReactionsRemoved`, and use `context.Activity.ReplyToId` to correlate the activity with the original agent message. You can instead register `OnMessageReactionAdded` or `OnMessageReactionRemoved` when you only need one type of change.

::: zone-end

::: zone pivot="teams-sdk-typescript"

Register `app.on('messageReaction', handler)` and inspect `activity.reactionsAdded` and `activity.reactionsRemoved`. Use `activity.replyToId` to correlate the activity with the original agent message.

::: zone-end

::: zone pivot="teams-sdk-python"

Register `@app.on_message_reaction` and inspect `ctx.activity.reactions_added` and `ctx.activity.reactions_removed`. Use `ctx.activity.reply_to_id` to correlate the activity with the original agent message.

::: zone-end

### Installation update event

Teams sends an `installationUpdate` activity when an agent is installed in or uninstalled from a conversation. Use this event to send an introduction, initialize conversation data, or delete retained user and conversation data.

| `action` value | Meaning |
| --- | --- |
| `add` | The agent was installed. |
| `remove` | The agent was uninstalled. |
| `add-upgrade` | An app upgrade added the agent to the app manifest. |
| `remove-upgrade` | An app upgrade removed the agent from the app manifest. |

For other app upgrades, Teams doesn't send an `installationUpdate` activity.

#### Install update event

For an `add` event in a team, `conversation.id` identifies the channel that the user selected during installation or the channel where installation started. Use this ID to send a welcome message to the intended channel. If your scenario specifically requires the General channel ID, use `channelData.team.id`.

:::image type="content" source="~/assets/videos/addteam.gif" alt-text="Animation showing a channel selected during app installation.":::

> [!NOTE]
> The selected channel ID is available only on `installationUpdate` activities with the `add` action when an app is installed in a team.

Register `OnInstall` in C#, `install.add` and `install.remove` in TypeScript, or `@app.on_install_add` and `@app.on_install_remove` in Python. Branch on the action when you use a combined handler, and don't send an uninstall confirmation because the agent can no longer send messages after removal.

### Plan for uninstall behavior

When a user uninstalls an app, Teams also uninstalls its agent. Messages to or from the uninstalled agent fail. Teams shows a failed-send experience when a user tries to message the agent, and an outbound request from the agent returns HTTP 403 with the `BotNotInConversationRoster` error. This behavior is consistent in personal, team, and group chat scopes.

:::image type="content" source="../../../assets/images/bots/uninstallbot.png" alt-text="Screenshot of the response after a user messages an uninstalled agent." lightbox="../../../assets/images/bots/uninstallbot.png" border="true":::

Use the `remove` installation event to delete cached conversation references and retained data that you no longer need.

## Handle errors

| Status code | Error code | Description | Developer action |
| --- | --- | --- | --- |
| HTTP 403 | `BotNotInConversationRoster` | The agent was uninstalled and is no longer part of the conversation. | Stop sending messages, remove the cached conversation reference, and wait for a new `installationUpdate` activity with the `add` action. |

During development, return meaningful diagnostic information without posting irrelevant error messages into the conversation. In production, log event-processing failures to Azure Application Insights. For more information, see [Add telemetry to your bot](/azure/bot-service/bot-builder-telemetry?view=azure-bot-service-4.0&tabs=csharp&preserve-view=true).

## Code sample

| Sample name | Description | C# | TypeScript | Python |
| --- | --- | --- | --- | --- |
| Bot quickstart | Provides a basic Teams bot project and setup instructions. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-quickstart/dotnet/bot-quickstart) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-quickstart/nodejs/bot-quickstart) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-quickstart/python/bot-quickstart) |

## Design guidelines and best practices

* Register only the event handlers that support a user scenario.
* Don't post a chat message for background changes that don't require user attention.
* Store the minimum conversation and message data required for your scenario.
* Remove cached data when the agent or a member is removed.
* Log production failures instead of exposing implementation details to users.

## Limitations and known issues

* Teams can introduce events that your agent doesn't explicitly handle.
* Azure Communication Services clients joining or leaving a Teams meeting don't trigger conversation update events.
* A message reaction activity identifies the message but doesn't include its content.
* The selected channel ID is available only for an installation `add` event in a team.
* After uninstallation, the agent can't send or receive messages until it's installed again.

## Next step

> [!div class="nextstepaction"]
> [Send proactive messages](send-proactive-messages.md)

## See also

* [Agent basics](../../bot-concepts.md)
* [Get Teams-specific context](../get-teams-context.md)
* [Teams emoji reactions reference](../../../agents-in-teams/teams-reactions-reference.md)
