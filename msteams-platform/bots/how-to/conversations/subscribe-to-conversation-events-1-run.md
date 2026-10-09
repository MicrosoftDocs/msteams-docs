---
title: Conversation events
description: Learn how to handle conversation updates, message reactions, and app installation events for Microsoft Teams agents.
ms.topic: article
ms.localizationpriority: medium
ms.author: nickwalk
ms.date: 10/09/2026
zone_pivot_groups: teams-sdk-languages
---

# Manage conversation events for agents

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

| Change | `channelData.eventType` | Teams SDK handler | Scope |
| --- | --- | --- | --- |
| Channel created | `channelCreated` | `OnChannelCreated`, `channelCreated`, or `on_channel_created` | Team |
| Channel renamed | `channelRenamed` | `OnChannelRenamed`, `channelRenamed`, or `on_channel_renamed` | Team |
| Channel deleted | `channelDeleted` | `OnChannelDeleted`, `channelDeleted`, or `on_channel_deleted` | Team |
| Channel restored | `channelRestored` | `OnChannelRestored`, `channelRestored`, or `on_channel_restored` | Team |
| Members added | `teamMemberAdded` in a team | `OnMembersAdded`, `membersAdded`, or `on_conversation_update` | All |
| Members removed | `teamMemberRemoved` in a team | `OnMembersRemoved`, `membersRemoved`, or `on_conversation_update` | All |
| Team renamed | `teamRenamed` | `OnTeamRenamed`, `teamRenamed`, or `on_team_renamed` | Team |
| Team deleted | `teamDeleted` | `OnTeamDeleted`, `teamDeleted`, or `on_team_deleted` | Team |
| Team restored | `teamRestored` | `OnTeamRestored`, `teamRestored`, or `on_team_restored` | Team |
| Team archived | `teamArchived` | `OnTeamArchived`, `teamArchived`, or `on_team_archived` | Team |
| Team unarchived | `teamUnarchived` | `OnTeamUnarchived`, `teamUnarchived`, or `on_team_unarchived` | Team |

The handler names in the table are listed in C#, TypeScript, and Python order.

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

When a member is added or removed, compare each member's `id` with `recipient.id`:

* If the IDs match, the agent was added or removed.
* If the IDs don't match, another member was added or removed.

In a team, member IDs received in the activity are unique to your agent. You can cache them when you need to send a proactive message to that member later.

> [!NOTE]
> When a user is permanently deleted from a tenant, Teams sends a `conversationUpdate` activity with a `membersRemoved` collection.

#### Register conversation event handlers

The following examples show the overall registration pattern. Add another handler with the event name from the preceding table instead of duplicating the complete activity-processing flow for each event.

::: zone pivot="teams-sdk-csharp"

```csharp
app.OnChannelCreated(async context =>
{
    var channel = context.Activity.ChannelData.Channel;
    await context.Send($"The {channel.Name} channel was created.");
});

app.OnMembersAdded(async context =>
{
    foreach (var member in context.Activity.MembersAdded)
    {
        if (member.Id != context.Activity.Recipient.Id)
        {
            await context.Send($"Welcome, {member.Name}.");
        }
    }
});
```

* `OnChannelCreated` registers the channel event handler. Use the corresponding `On...` method for another event.
* `ChannelData.Channel` contains the channel that changed.
* `MembersAdded` contains every member included in the update.

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript
app.on('channelCreated', async ({ activity, send }) => {
    const channel = activity.channelData.channel;
    await send(`The ${channel.name} channel was created.`);
});

app.on('membersAdded', async ({ activity, send }) => {
    for (const member of activity.membersAdded) {
        if (member.id !== activity.recipient.id) {
            await send(`Welcome, ${member.name ?? member.id}.`);
        }
    }
});
```

* `channelCreated` selects the channel event to handle. Use another event name from the table for a different change.
* `activity.channelData.channel` contains the channel that changed.
* `activity.recipient.id` identifies the agent in membership updates.

::: zone-end

::: zone pivot="teams-sdk-python"

```python
@app.on_channel_created
async def handle_channel_created(ctx: ActivityContext[ConversationUpdateActivity]):
    channel = ctx.activity.channel_data.channel
    await ctx.send(f"The {channel.name} channel was created.")


@app.on_conversation_update
async def handle_members_added(ctx: ActivityContext[ConversationUpdateActivity]):
    if ctx.activity.members_added:
        for member in ctx.activity.members_added:
            if member.id != ctx.activity.recipient.id:
                await ctx.send(f"Welcome, {member.name or member.id}.")
```

* `@app.on_channel_created` registers the channel event handler. Use the corresponding decorator for another event.
* `ctx.activity.channel_data.channel` contains the channel that changed.
* `ctx.activity.members_added` contains members included in the update.

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

Register `OnReactionsAdded` and `OnReactionsRemoved` in C#, `reactionsAdded` and `reactionsRemoved` in TypeScript, or `@app.on_reactions_added` and `@app.on_reactions_removed` in Python. In each handler, iterate through the corresponding reaction collection and use `replyToId` to correlate the reaction with the original agent message.

### Installation update event

Teams sends an `installationUpdate` activity when an agent is installed in or uninstalled from a conversation. Use this event to send an introduction, initialize conversation data, or delete retained user and thread data.

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

When a user uninstalls an app, Teams also uninstalls its agent. The user receives an HTTP 403 response if they try to message the uninstalled app, and the agent receives an HTTP 403 response if it tries to send a new message. This behavior is consistent in personal, team, and group chat scopes.

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
| Conversation bot | Demonstrates conversation events, Adaptive Cards, read receipts, and message update events. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-quickstart/dotnet/bot-quickstart) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-quickstart/nodejs/bot-quickstart) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-quickstart/python/bot-quickstart) |

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
