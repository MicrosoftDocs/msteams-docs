---
title: Teams Agent Activities and Handlers
description: Learn how to register Teams agent activity handlers for messages and events. Explore message handler examples in C#, TypeScript, and Python.
ms.topic: article
zone_pivot_groups: teams-sdk-languages
ms.date: 11/24/2026
ai-usage: ai-assisted
---

# Activities and handlers

An **Activity** is the Teams‑specific payload that flows between the user and your bot.

Activity handlers are the core of an agent's functionality. Register handlers for the activities your agent needs to process, such as messages, member changes, and channel lifecycle events. These activities occur in the [conversation scopes](agent-scopes.md) where your agent is active.



## Register an activity handler

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

If your agent takes more than 15 seconds to process an activity, Teams sends a retry request to the agent endpoint, so you might see duplicate requests.

For event descriptions, handler registration syntax, payload examples, and event-handling guidance, see the [agent event reference](agent-event-reference.md).

## Activity handler chaining

::: zone pivot="teams-sdk-csharp"
In Teams SDK for .NET, activity handlers do not form a next()-style processing chain. Instead, every handler that matches an activity is invoked in the order it was registered, and one handler cannot prevent subsequent matching handlers from running. If you need to intercept, short-circuit, or wrap request processing (for example, to stop execution when a condition is met), implement `ITurnMiddleware` and control whether to call `nextTurn(...)`.

::: zone-end

::: zone pivot="teams-sdk-python"
The `event` activity handlers (and attributes) follow a [middleware](https://www.patterns.dev/vanilla/mediator-pattern/) pattern similar to how `python` middlewares work. This means that for each activity handler, a `next` function is passed in which can be called to pass control to the next handler. This allows you to build a chain of handlers that can process the same activity in different ways.

```python
@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    """Handle message activities using the new generated handler system."""
    print(f"[GENERATED onMessage] Message received: {ctx.activity.text}")
    await ctx.next()
```

```python
@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    """Handle message activities using the new generated handler system."""
    if ctx.activity.text == "/help":
        await ctx.send("Here are all the ways I can help you...")
    await ctx.next()
```

```python
@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    await ctx.send(f"You said '{ctx.activity.text}'")
```

::: zone-end

::: zone pivot="teams-sdk-typescript"
The `on` activity handlers follow a [middleware](https://www.patterns.dev/vanilla/mediator-pattern/) pattern similar to how `express` middlewares work. This means that for each activity handler, a `next` function is passed in which can be called to pass control to the next handler. This allows you to build a chain of handlers that can process the same activity in different ways.

```typescript
app.on('message', async ({ next }) => {
  console.log('global logger');
  next(); // pass control onward
});
```

```typescript
app.on('message', async ({ activity, next }) => {
  if (activity.text === '/help') {
    await send('Here are all the ways I can help you...');
    return;
  }

  // Conditionally pass control to the next handler
  next();
});
```

```typescript
app.on('message', async ({ activity }) => {
  // Fallthrough to the final handler
  await send(`Hello! you said ${activity.text}`);
});
```

::: zone-end

## Code sample

| Sample name | Description | TypeScript | C# | Python |
| --- | --- | --- | --- | --- |
| Teams conversation agent | This app demonstrates conversation events, Adaptive Cards, read receipts, and message updates. It includes immersive reader support for accessibility. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-quickstart/nodejs/bot-quickstart) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-quickstart/dotnet/bot-quickstart) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-quickstart/python/bot-quickstart) |

## Next step

> [!div class="nextstepaction"]
> [Send proactive messages](how-to/conversations/send-proactive-messages.md)
