---
title: Listening To Activities
description: Guide to handling Teams-specific activities like chat messages, card actions, and installs using the fluent router API.
ms.topic: how-to
zone_pivot_groups: teams-sdk-languages
ms.date: 11/11/2026
---

# Listening To Activities

An **Activity** is the Teams‑specific payload that flows between the user and your bot.
Where _events_ describe high‑level happenings inside your app, _activities_ are the raw Teams messages such as chat text, card actions, installs, or invoke calls.

::: zone pivot="teams-sdk-csharp"
The Teams SDK exposes a fluent router so you can subscribe to these activities with dedicated handler methods using minimal APIs.
::: zone-end

::: zone pivot="teams-sdk-python"
The Teams SDK exposes a fluent router so you can subscribe to these activities with `@app.event("activity")`.
::: zone-end

::: zone pivot="teams-sdk-typescript"
The Teams SDK exposes a fluent router so you can subscribe to these activities with `app.on('<route>', …)`.
::: zone-end

:::image type="content" source="~/assets/essentials-on-activity-overview-1.png" alt-text="Flowchart showing Teams events reaching the app server, which sends an activity event to the activity router (app.on()) that invokes your activity handlers." lightbox="~/assets/essentials-on-activity-overview-1.png" :::

Here is an example of a basic message handler:

::: zone pivot="teams-sdk-csharp"

```csharp
teams.OnMessage(async (context, cancellationToken) =>
{
    await context.SendAsync($"you said: {context.Activity.Text}", cancellationToken);
});
```

::: zone-end

::: zone pivot="teams-sdk-python"

```python
@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    await ctx.send(f"You said '{ctx.activity.text}'")
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript
app.on('message', async ({ activity, send }) => {
  await send(`You said: ${activity.text}`);
});
```

::: zone-end

::: zone pivot="teams-sdk-csharp"
In the above example, the `context.Activity` property is of type `MessageActivity`, which has a `Text` property. You'll notice that the handler here does not return anything, but instead handles the activity by `Send`ing a message back. For message activities, Teams does not expect your application to return anything (though it's usually a good idea to send some sort of friendly acknowledgment!).
::: zone-end

::: zone pivot="teams-sdk-python"
In the above example, the `ctx.activity` parameter is of type `MessageActivity`, which has a `text` property. You'll notice that the handler here does not return anything, but instead handles it by `send`ing a message back. For message activities, Teams does not expect your application to return anything (though it's usually a good idea to send some sort of friendly acknowledgment!).
::: zone-end

::: zone pivot="teams-sdk-typescript"
In the above example, the `activity` parameter is of type `MessageActivity`, which has a `text` property. You'll notice that the handler here does not return anything, but instead handles it by `send`ing a message back. For message activities, Teams does not expect your application to return anything (though it's usually a good idea to send some sort of friendly acknowledgment!).

Other activity types have different properties and different required results. For a given handler, the SDK will automatically determine the type of `activity` and also enforce the correct return type.
::: zone-end

## Slash Commands

Slash commands are manifest-declared commands users run from the compose box. To enable slash commands, set `supportsTargetedMessages: true` in your app manifest under the `bots` section. You can opt in with an explicit command list by declaring specific commands using `commandLists` with `triggers: ["slash"]`, which Teams shows in the slash menu when a user types `/`. Without a command list, users can still invoke your agent via `/agent-name` and provide free-form input.

```json
{
  "bots": [
    {
      "botId": "{{BOT_ID}}",
      "scopes": ["personal", "team", "groupChat"],
      "supportsTargetedMessages": true,
      "commandLists": [
        {
          "scopes": ["team", "groupChat"],
          "triggers": ["slash"],
          "commands": [
            { "title": "Review", "description": "Review a document" }
          ]
        }
      ]
    }
  ]
}
```

When a user sends a slash command, it appears as a private message visible only to them. Your agent can reply privately or, when appropriate, share a response with the broader group or channel.

Slash commands arrive as normal message activities with the targeted flag set on the activity's recipient object.

::: zone pivot="teams-sdk-csharp"

Slash commands arrive as targeted messages. Check `Recipient.IsTargeted` and handle them explicitly:

```csharp
teams.OnMessage(async (context, cancellationToken) =>
{
    if (context.Activity.Recipient?.IsTargeted == true)
    {
        await context.SendAsync($"Received slash command: {context.Activity.Text}", cancellationToken);
    }
});
```

::: zone-end

::: zone pivot="teams-sdk-python"

```python
@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    if ctx.activity.recipient and ctx.activity.recipient.is_targeted:
        await ctx.send(f"Received slash command: {ctx.activity.text}")
        return

    await ctx.next()
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript
app.on('message', async ({ activity, send, next }) => {
  if (activity.recipient?.isTargeted) {
    await send(`Received slash command: ${activity.text}`);
    return;
  }

  await next();
});
```

::: zone-end

## Activity handler chaining

::: zone pivot="teams-sdk-csharp"
In SDK 2.1, activity handlers no longer form a next()-style processing chain. Instead, every handler that matches an activity is invoked in the order it was registered, and one handler cannot prevent subsequent matching handlers from running. If you need to intercept, short-circuit, or wrap request processing (for example, to stop execution when a condition is met), implement `ITurnMiddleware` and control whether to call `nextTurn(...)`.

> [!NOTE]
> SDK 2.0 (Legacy). In SDK 2.0, activity handlers are chained. Call `context.Next()` to continue to the next matching handler; return without it to stop the chain. Registration order determines handler execution order.
>
> ```csharp
> app.OnMessage(async (context, cancellationToken) =>
> {
>     if (context.Activity.Text == "/help")
>     {
>         await context.Send("Here are all the ways I can help you...", cancellationToken);
>         return; // stop chain
>     }
>
>     await context.Next(); // continue chain
> });
>
> app.OnMessage(async (context, cancellationToken) =>
> {
>     await context.Send($"Hello! you said {context.Activity.Text}", cancellationToken);
> });
> ```

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

::: zone pivot="teams-sdk-typescript"

## Activity Reference

The application supports a number of activity types:

### Core Activity Routes

| Route            | Responsibility                                                                                  |
| ---------------- | ----------------------------------------------------------------------------------------------- |
| `message`        | User messages the app                                                                           |
| `typing`         | Sends a typing indicator to indicate the app got the user's message and is computing a response |
| `deleteUserData` | Triggered when a user requests their data to be deleted according to privacy regulations        |
| `mention`        | Triggered when the bot is @mentioned in a conversation                                          |

### Configuration Routes

| Route           | Invoke Path     | Responsibility                                                |
| --------------- | --------------- | ------------------------------------------------------------- |
| `config.open`   | `config/fetch`  | When app is installed, the user may configure it via a dialog |
| `config.submit` | `config/submit` | Configuration dialog submission                               |
| `tab.open`      | `tab/fetch`     | Initializes tab configuration experiences                     |
| `tab.submit`    | `tab/submit`    | Processes tab configuration submissions                       |

### Dialog Routes

| Route           | Invoke Path   | Responsibility               |
| --------------- | ------------- | ---------------------------- |
| `dialog.open`   | `task/fetch`  | Opens a dialog               |
| `dialog.submit` | `task/submit` | Processes dialog submissions |

### Authentication Routes

| Route                   | Invoke Path            | Responsibility                                |
| ----------------------- | ---------------------- | --------------------------------------------- |
| `signin.token-exchange` | `signin/tokenExchange` | When a token exchange happens during SSO Auth |
| `signin.verify-state`   | `signin/verifyState`   | When a verification passes after OAuth        |

### Message Interaction Routes

| Route             | Invoke Path                       | Responsibility                                                          |
| ----------------- | --------------------------------- | ----------------------------------------------------------------------- |
| `message.execute` | `actionableMessage/executeAction` | An action was executed on a message                                     |
| `message.submit`  | `message/submitAction`            | Handles message action submissions                                      |
| `card.action`     | `adaptiveCard/action`             | Triggered when a user interacts with an Adaptive Card button or control |

### File Handling Routes

| Route                  | Responsibility                                               |
| ---------------------- | ------------------------------------------------------------ |
| `file.consent`         | Manages file sharing permission workflows in Teams           |
| `file.consent.accept`  | Triggered when user accepts a file consent card for sharing  |
| `file.consent.decline` | Triggered when user declines a file consent card for sharing |

### Message Extension Routes

| Route                             | Invoke Path                            | Responsibility                                        |
| --------------------------------- | -------------------------------------- | ----------------------------------------------------- |
| `message.ext.query-link`          | `composeExtension/queryLink`           | A link unfurling request for an installed application |
| `message.ext.anon-query-link`     | `composeExtension/anonymousQueryLink`  | An anonymous link unfurling request                   |
| `message.ext.query`               | `composeExtension/query`               | Message extension search query                        |
| `message.ext.select-item`         | `composeExtension/selectItem`          | Message extension item selection                      |
| `message.ext.submit`              | `composeExtension/submitAction`        | Message extension action submission                   |
| `message.ext.open`                | `composeExtension/fetchTask`           | Message extension task fetching for an action         |
| `message.ext.query-settings-url`  | `composeExtension/querySettingUrl`     | Retrieves configuration URLs for message extensions   |
| `message.ext.setting`             | `composeExtension/setting`             | Processes message extension settings changes          |
| `message.ext.card-button-clicked` | `composeExtension/onCardButtonClicked` | Card button click handling in message extensions      |
| `message.ext.edit`                | N/A                                    | Processes edits to message extension previews         |
| `message.ext.send`                | N/A                                    | Handles sending of message extension content          |

### Lifecycle Routes

| Route            | Responsibility                                              |
| ---------------- | ----------------------------------------------------------- |
| `install.add`    | Triggered when the app is newly installed to a team or chat |
| `install.remove` | Triggered when the app is uninstalled from a team or chat   |
| `install.update` | Triggered when the app is updated in a team or chat         |
| `handoff.action` | Manages handoffs from a different agent to your application |

### Conversation Update Routes

| Route             | Responsibility                                                                       |
| ----------------- | ------------------------------------------------------------------------------------ |
| `membersAdded`    | Triggered when new users join a team or are added to a chat where the bot is active  |
| `membersRemoved`  | Triggered when users leave a team or are removed from a chat where the bot is active |
| `channelCreated`  | Triggered when a new channel is created in a team where the bot is installed         |
| `channelRenamed`  | Triggered when a channel is renamed in a team where the bot is installed             |
| `channelDeleted`  | Triggered when a channel is deleted from a team where the bot is installed           |
| `channelRestored` | Triggered when a previously deleted channel is restored                              |
| `teamArchived`    | Triggered when a team is archived                                                    |
| `teamDeleted`     | Triggered when a team is deleted where the bot is installed                          |
| `teamHardDeleted` | Triggered when a team is permanently deleted (beyond recovery)                       |
| `teamRenamed`     | Triggered when a team is renamed where the bot is installed                          |
| `teamRestored`    | Triggered when a previously deleted team is restored                                 |
| `teamUnarchived`  | Triggered when a team is unarchived                                                  |
| `messageUpdate`   | Triggered when a message is edited in a conversation with the bot                    |
| `messageDelete`   | Triggered when a message is deleted in a conversation with the bot                   |

### Meeting Routes

| Route                     | Invoke Path                                         | Responsibility                                                             |
| ------------------------- | --------------------------------------------------- | -------------------------------------------------------------------------- |
| `meetingStart`            | `application/vnd.microsoft.meetingStart`            | Triggered at the beginning of a Teams meeting where the bot is present     |
| `meetingEnd`              | `application/vnd.microsoft.meetingEnd`              | Triggered at the end of a Teams meeting where the bot is present           |
| `meetingParticipantJoin`  | `application/vnd.microsoft.meetingParticipantJoin`  | Triggered when participants join a Teams meeting where the bot is present  |
| `meetingParticipantLeave` | `application/vnd.microsoft.meetingParticipantLeave` | Triggered when participants leave a Teams meeting where the bot is present |
| `readReceipt`             | `application/vnd.microsoft.readReceipt`             | Tracks when messages are read by users                                     |

::: zone-end
