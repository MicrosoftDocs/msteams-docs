---
title: Activity Handlers and Agent Logic
description: Learn how Teams agent scopes, activity handlers, and conversational logic work together. Explore examples in C#, TypeScript, and Python.
ms.topic: article
zone_pivot_groups: teams-sdk-languages
ms.date: 11/23/2026
ai-usage: ai-assisted
---

# Understand agent concepts

An agent's interactions can be using text, speech, images, or video. It processes the user's input to understand their request and evaluates the input to perform relevant tasks. An agent may request information or enable access to services, and responds to the user.

## Agent scopes

Agents in Microsoft Teams can be part of a one-to-one conversation, a group chat, or a channel in a team. Each scope provides unique opportunities and challenges for your conversational agent.

| In a channel | In a group chat | In a one-to-one chat |
| :-- | :-- | :-- |
| Massive reach | Fewer members | Traditional way |
| Concise individual interactions | @mention to agent | Q&A agents |
| @mention to agent | Similar to channel | Agents that tell jokes and take notes |

### In a channel

Channels contain threaded conversations between multiple people, even up to 2000. This potentially gives your agent massive reach, but individual interactions must be concise. Traditional multi-turn interactions don't work. Instead, you must look to use interactive cards or dialogs (referred as task modules in TeamsJS v1.x), or move the conversation to a one-to-one conversation to collect lots of information. Your agent only has access to messages where it's `@mentioned`. You can retrieve additional messages from the conversation using Microsoft Graph and organization-level permissions.

Agents work better in a channel in the following cases:

- Notifications, where you provide an interactive card for users to take additional information.
- Feedback scenarios, such as polls and surveys.
- Single request or response cycle resolves interactions and the results are useful for multiple members of the conversation.
- Social or fun agents, where you get an awesome cat image, randomly pick a winner, and so on.

### In a group chat

Group chats are non-threaded conversations between three or more people. They tend to have fewer members than a channel and are more transient. Similar to a channel, your agent only has access to messages where it's `@mentioned` directly.

Agents that work better in a channel also work better in a group chat.

### In a one-to-one chat

One-to-one chat is a traditional way for a conversational agent to interact with a user. A few examples of one-to-one conversational agents are:

- Q&A agents
- agents that initiate workflows in other systems.
- agents that tell jokes.
- agents that take notes.
Before creating one-to-one agents, consider whether a conversation-based interface is the best way to present your functionality.

## Activities and handlers

Activity handlers are the core of an agent's functionality. Register handlers for the activities your agent needs to process, such as messages, member changes, and channel lifecycle events.

> [!NOTE]
> If an agent activity takes more than 15 seconds to process, Teams sends a retry request to the agent endpoint, so you might see duplicate requests.

::: zone pivot="teams-sdk-csharp"

Register handlers with `OnMessage()`. Handlers receive a typed context and a cancellation token.

The following example registers a message handler that echoes the user's message:

```csharp
teams.OnMessage(async (context, cancellationToken) =>
{
    await context.SendAsync($"You said: {context.Activity.Text}", cancellationToken);
});
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

Register handlers with `app.on(eventName, handler)`. The SDK infers the activity type from the event name. The handler context exposes the incoming `activity` and functions such as `send()` and `reply()` to respond.

The following example registers a message handler that echoes the user's message:

```typescript
app.on('message', async ({ activity, send }) => {
    await send(`You said: ${activity.text}`);
});
```

::: zone-end

::: zone pivot="teams-sdk-python"

Register an asynchronous function with one of the dedicated event-handler decorators like `@app.on_message`. The handler receives an `ActivityContext[TActivity]` object. Use `ctx.send()` or `ctx.reply()` to respond.

The following example registers a message handler that echoes the user's message:

```python
@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    await ctx.send(f"You said: {ctx.activity.text}")
```

::: zone-end

For event descriptions and handler registration syntax, see the [agent event reference](agent-event-reference.md).

### Conversation update events

Teams sends `conversationUpdate` activities when an agent is added to a conversation, other members join or leave, or conversation metadata changes. An agent receives membership updates for teams where it's installed and an initial update when it's first added to a personal conversation.

Use conversation events to:

- Welcome users when your agent is added to a team or a new member joins.
- Notify users about membership changes or channel creation, renaming, and deletion.
- Identify the channel a user selected during installation.

Channel and team lifecycle events apply to the team scope. Membership events apply to personal chats, group chats, and teams. For event names, payload fields, and handler declarations, see [Conversation update event details](agent-event-reference.md#conversation-update-event-details).

> [!NOTE]
> When an Azure Communication Services (ACS) client joins or leaves a Teams meeting, no conversation update events are triggered.

#### Member changes

Member-added and member-removed events can describe either the agent itself or another user. Compare each member's `id` in `membersAdded` or `membersRemoved` with `recipient.id` to determine whether the event concerns the agent. The agent's ID has the format `28:<MicrosoftAppId>`.

In a team context, the member-added event uses `channelData.eventType` of `teamMemberAdded`, and the member-removed event uses `teamMemberRemoved`. A member-removed event is also triggered when a user is permanently deleted from the tenant.

User IDs in these payloads are unique to the agent. Cache them when needed for future interactions, such as directly messaging a user. When the agent is removed, clear cached data for the team as appropriate for your app's data-retention requirements.

When the agent is installed in a team, `conversation.id` identifies the channel selected by the user during installation or the channel from which installation was initiated. It isn't necessarily the General channel. For agent installation and removal workflows, prefer the [installation update event](#installation-update-event).

### Message reaction events

Teams sends a `messageReaction` activity when a user adds or removes a reaction to a message sent by your agent. These events apply to all conversation scopes. Use them, for example, to respond when a user likes an agent message.

The activity's `replyToId` identifies the original message. Each entry in `reactionsAdded` or `reactionsRemoved` has a `type` value describing the reaction, such as `angry`, `heart`, `laugh`, `like`, `sad`, or `surprised`.

Reaction events don't contain the original message's contents. If your agent needs those contents to process reactions, store the message when you send it. See [Message reactions](agent-event-reference.md#message-reactions) for handler syntax and payload examples.

### Installation update event

Teams sends an `installationUpdate` activity when an agent is installed in or uninstalled from a conversation thread. The activity's `action` is `add` for installation and `remove` for uninstallation.

When an app is upgraded, Teams sends this event only if the upgrade adds or removes an agent from the manifest. The action is `add-upgrade` or `remove-upgrade`, respectively. Other app upgrades don't trigger an installation update event.

Use installation updates to send an introductory message when your agent is installed and to clean up user or conversation-thread data when it's uninstalled. This helps your app meet privacy and data-retention requirements. See [Installation update event details](agent-event-reference.md#installation-update-event-details) for action values, handler declarations, and a payload example.

#### Install update event

When an agent is installed in a team, `conversation.id` in both the conversation update and installation update activities identifies the channel selected during installation or the channel where installation occurred. Send your welcome message to this channel, where the user intends the agent to operate. If you explicitly need the General channel ID, use `channelData.team.id`.

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

### Handling errors in conversation events

Don't send error messages that lack meaningful context to the conversation. The following screenshot shows an unhelpful error response:

:::image type="content" source="../assets/images/handling-error.png" alt-text="Screenshot showing an error message without meaningful context in an agent conversation.":::

During development, meaningful diagnostic messages can help explain a specific error. In production, log errors and events to Azure Application Insights instead of posting debugging details to the conversation. For more information, see [Add telemetry to your bot](/azure/bot-service/bot-builder-telemetry?view=azure-bot-service-4.0&tabs=csharp&preserve-view=true).

## Code sample

| Sample name | Description | TypeScript | C# | Python |
| --- | --- | --- | --- | --- |
| Teams conversation agent | This app demonstrates conversation events, Adaptive Cards, read receipts, and message updates. It includes immersive reader support for accessibility. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-quickstart/nodejs/bot-quickstart) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-quickstart/dotnet/bot-quickstart) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-quickstart/python/bot-quickstart) |

## Next step

> [!div class="nextstepaction"]
> [Send proactive messages](how-to/conversations/send-proactive-messages.md)
