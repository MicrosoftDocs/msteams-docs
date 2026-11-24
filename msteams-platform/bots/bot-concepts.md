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

For event descriptions, handler registration syntax, payload examples, and event-handling guidance, see the [agent event reference](agent-event-reference.md).

## Code sample

| Sample name | Description | TypeScript | C# | Python |
| --- | --- | --- | --- | --- |
| Teams conversation agent | This app demonstrates conversation events, Adaptive Cards, read receipts, and message updates. It includes immersive reader support for accessibility. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-quickstart/nodejs/bot-quickstart) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-quickstart/dotnet/bot-quickstart) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-quickstart/python/bot-quickstart) |

## Next step

> [!div class="nextstepaction"]
> [Send proactive messages](how-to/conversations/send-proactive-messages.md)
