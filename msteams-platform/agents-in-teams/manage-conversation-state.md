---
title: Manage Conversation State
description: Manage conversation state in Teams SDK apps to store user and conversation data across turns. Learn how to enable, read, write, clear, and scale state.
ms.topic: how-to
zone_pivot_groups: teams-sdk-languages
ms.date: 09/27/2026
---

# Manage conversation state

::: zone pivot="teams-sdk-typescript"

Teams SDK provides built-in, per-turn state for storing conversation and user data across activities. State is loaded before each activity handler runs, saved automatically after the turn, and exposed through <LanguageInclude content={{"typescript": "`ctx.state`", "python": "`ctx.state`", "csharp": "`context.State`"}} />.

## Setup

State is disabled by default. Enable it with <LanguageInclude content={{"typescript": "the `state: true` app option", "python": "the `state=True` app option", "csharp": "`UseState()`"}} />:

```typescript
import { App } from '@microsoft/teams.apps';

const app = new App({
  state: true,
});
```

Without a dedicated provider, state uses <LanguageInclude content={{"typescript": "the Teams SDK's process-local, in-memory `LocalStorage` implementation", "python": "the Teams SDK's process-local, in-memory `LocalStorage` implementation", "csharp": "the in-memory `IDistributedCache` implementation"}} />. This is useful for local development, but values are lost when the process restarts and aren't shared across instances.

Registering an OAuth flow with `addOAuthFlow()` automatically enables state so pending sign-ins can be associated with the correct flow. Set `state: false` explicitly to fall back to process-local in-memory maps.

## Reading and writing state

Use <LanguageInclude content={{"typescript": "`ctx.state.conversation` and `ctx.state.user`", "python": "`ctx.state.conversation` and `ctx.state.user`", "csharp": "`context.State.ConversationState` and `context.State.UserState`"}} /> in an activity handler. Values must be JSON-serializable.

```typescript
app.on('message', async (ctx) => {
  if (!ctx.state) {
    throw new Error('Turn state is not enabled.');
  }

  const count = (ctx.state.conversation.get<number>('messageCount') ?? 0) + 1;
  ctx.state.conversation.set('messageCount', count);

  if (ctx.state.user && ctx.activity.text?.startsWith('my name is ')) {
    ctx.state.user.set(
      'name',
      ctx.activity.text.slice('my name is '.length).trim()
    );
  }

  const name = ctx.state.user?.get<string>('name') ?? 'there';
  await ctx.reply(`Hello, ${name}. Message #${count}.`);
});
```

Use `has()` to check for a value, `delete()` to remove one, and `clear()` to remove all values. If you mutate an object or array returned by `get()`, call `set()` with the updated value so the scope is marked for persistence.

Conversation state is shared by everyone in the current conversation. User state is scoped to the current sender **within that conversation** and is unavailable when an activity has no usable sender ID.

The SDK writes a scope to storage only when it changes during the current activity. After all handlers for that activity finish, the SDK saves those changes and closes the turn state. Read or update state only while handling the activity. Don't capture it for timers or background tasks because accessing it after the turn ends throws <LanguageInclude content={{"typescript": "`TurnStateSealedError`", "python": "`TurnStateSealedError`", "csharp": "`InvalidOperationException`"}} />.

## Clearing state

Remove a value with <LanguageInclude content={{"typescript": "`delete()`", "python": "`del scope[key]`", "csharp": "`Remove()`"}} />, or clear a scope with <LanguageInclude content={{"typescript": "`clear()`", "python": "`clear()`", "csharp": "`Clear()`"}} />. To remove both scopes from the backing store:

```typescript
await ctx.state.delete();
```

Values written after <LanguageInclude content={{"typescript": "`delete()`", "python": "`delete()`", "csharp": "`DeleteAsync()`"}} /> are saved normally at the end of the current turn.

## Scaling to distributed state

For production or multi-instance deployments, implement the Teams SDK's `IStorage<string, string>` contract with a shared, durable backend and pass it through `state.storage`. The state API used by handlers doesn't change:

```typescript
import type { IStorage } from '@microsoft/teams.common';
import { App } from '@microsoft/teams.apps';

function createApp(durableStorage: IStorage<string, string>): App {
  return new App({
    state: {
      storage: durableStorage,
      keyPrefix: 'my-app',
    },
  });
}
```

The SDK serializes each scope as a JSON string and replaces the complete scope on save, so concurrent turns use last-writer-wins semantics. Configure expiry, retries, and other storage-specific behavior on your storage implementation.

::: zone-end

::: zone pivot="teams-sdk-python"

Teams SDK provides built-in, per-turn state for storing conversation and user data across activities. State is loaded before each activity handler runs, saved automatically after the turn, and exposed through <LanguageInclude content={{"typescript": "`ctx.state`", "python": "`ctx.state`", "csharp": "`context.State`"}} />.

## Setup

State is disabled by default. Enable it with <LanguageInclude content={{"typescript": "the `state: true` app option", "python": "the `state=True` app option", "csharp": "`UseState()`"}} />:

```python
from microsoft_teams.apps import App

app = App(state=True)
```

Without a dedicated provider, state uses <LanguageInclude content={{"typescript": "the Teams SDK's process-local, in-memory `LocalStorage` implementation", "python": "the Teams SDK's process-local, in-memory `LocalStorage` implementation", "csharp": "the in-memory `IDistributedCache` implementation"}} />. This is useful for local development, but values are lost when the process restarts and aren't shared across instances.

Registering an OAuth flow with `add_oauth_flow()` automatically enables state so pending sign-ins can be associated with the correct flow. Set `state=False` explicitly to fall back to process-local in-memory maps.

## Reading and writing state

Use <LanguageInclude content={{"typescript": "`ctx.state.conversation` and `ctx.state.user`", "python": "`ctx.state.conversation` and `ctx.state.user`", "csharp": "`context.State.ConversationState` and `context.State.UserState`"}} /> in an activity handler. Values must be JSON-serializable.

```python
from microsoft_teams.api import MessageActivity
from microsoft_teams.apps import ActivityContext


@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]) -> None:
    assert ctx.state is not None

    count = ctx.state.conversation.get("message_count", 0) + 1
    ctx.state.conversation["message_count"] = count

    if ctx.state.user is not None and ctx.activity.text.startswith("my name is "):
        ctx.state.user["name"] = ctx.activity.text[len("my name is "):].strip()

    name = ctx.state.user.get("name", "there") if ctx.state.user is not None else "there"
    await ctx.send(f"Hello, {name}. Message #{count}.")
```

Use `key in scope` to check for a value, `del scope[key]` to remove one, and `clear()` to remove all values. Changes inside stored lists and dictionaries are detected automatically when the turn is saved.

Conversation state is shared by everyone in the current conversation. User state is scoped to the current sender **within that conversation** and is unavailable when an activity has no usable sender ID.

The SDK writes a scope to storage only when it changes during the current activity. After all handlers for that activity finish, the SDK saves those changes and closes the turn state. Read or update state only while handling the activity. Don't capture it for timers or background tasks because accessing it after the turn ends throws <LanguageInclude content={{"typescript": "`TurnStateSealedError`", "python": "`TurnStateSealedError`", "csharp": "`InvalidOperationException`"}} />.

## Clearing state

Remove a value with <LanguageInclude content={{"typescript": "`delete()`", "python": "`del scope[key]`", "csharp": "`Remove()`"}} />, or clear a scope with <LanguageInclude content={{"typescript": "`clear()`", "python": "`clear()`", "csharp": "`Clear()`"}} />. To remove both scopes from the backing store:

```python
await ctx.state.delete()
```

Values written after <LanguageInclude content={{"typescript": "`delete()`", "python": "`delete()`", "csharp": "`DeleteAsync()`"}} /> are saved normally at the end of the current turn.

## Scaling to distributed state

For production or multi-instance deployments, implement the Teams SDK's `Storage[str, Any]` contract with a shared, durable backend and pass it through `StateOptions`. The state API used by handlers doesn't change:

```python
from typing import Any

from microsoft_teams.apps import App, StateOptions
from microsoft_teams.common import Storage


def create_app(durable_storage: Storage[str, Any]) -> App:
    return App(
        state=StateOptions(
            storage=durable_storage,
            key_prefix="my-app",
        )
    )
```

The SDK serializes each scope as a JSON string and replaces the complete scope on save, so concurrent turns use last-writer-wins semantics. Configure expiry, retries, and other storage-specific behavior on your storage implementation.

::: zone-end

::: zone pivot="teams-sdk-csharp"

Teams SDK provides built-in, per-turn state for storing conversation and user data across activities. State is loaded before each activity handler runs, saved automatically after the turn, and exposed through <LanguageInclude content={{"typescript": "`ctx.state`", "python": "`ctx.state`", "csharp": "`context.State`"}} />.

## Setup

State is disabled by default. Enable it with <LanguageInclude content={{"typescript": "the `state: true` app option", "python": "the `state=True` app option", "csharp": "`UseState()`"}} />:

```csharp title="Program.cs"
using Microsoft.Teams.Apps;

WebApplicationBuilder builder = WebApplication.CreateSlimBuilder(args);
builder.Services.AddTeamsBotApplication(options =>
{
    options.UseState();
});

WebApplication app = builder.Build();
TeamsBotApplication teams = app.UseTeamsBotApplication();
```

Without a dedicated provider, state uses <LanguageInclude content={{"typescript": "the Teams SDK's process-local, in-memory `LocalStorage` implementation", "python": "the Teams SDK's process-local, in-memory `LocalStorage` implementation", "csharp": "the in-memory `IDistributedCache` implementation"}} />. This is useful for local development, but values are lost when the process restarts and aren't shared across instances.

Registering an OAuth flow with `AddOAuthFlow()` automatically enables state so pending sign-ins can be associated with the correct flow.

## Reading and writing state

Use <LanguageInclude content={{"typescript": "`ctx.state.conversation` and `ctx.state.user`", "python": "`ctx.state.conversation` and `ctx.state.user`", "csharp": "`context.State.ConversationState` and `context.State.UserState`"}} /> in an activity handler. Values must be JSON-serializable.

```csharp
teams.OnMessage(async (context, cancellationToken) =>
{
    // Write
    context.State.ConversationState.Set("lastMessage", context.Activity.Text ?? string.Empty);
    context.State.UserState.Set("messageCount",
        (context.State.UserState.Get<int>("messageCount")) + 1);

    // Read
    string? last = context.State.ConversationState.Get<string>("lastMessage");
    int count = context.State.UserState.Get<int>("messageCount");

    await context.SendAsync(
        $"Message #{count}. Last message was: {last}",
        cancellationToken);
});
```

Use `ContainsKey()` to check for a value, `Remove()` to remove one, and `Clear()` to remove all values. If you mutate an object or collection returned by `Get<T>(string)`, call `Set()` with the updated value so the scope is marked for persistence.

Conversation state is shared by everyone in the current conversation. User state is scoped to the current sender **within that conversation** and is unavailable when an activity has no usable sender ID.

The SDK writes a scope to storage only when it changes during the current activity. After all handlers for that activity finish, the SDK saves those changes and closes the turn state. Read or update state only while handling the activity. Don't capture it for timers or background tasks because accessing it after the turn ends throws <LanguageInclude content={{"typescript": "`TurnStateSealedError`", "python": "`TurnStateSealedError`", "csharp": "`InvalidOperationException`"}} />.

## Clearing state

Remove a value with <LanguageInclude content={{"typescript": "`delete()`", "python": "`del scope[key]`", "csharp": "`Remove()`"}} />, or clear a scope with <LanguageInclude content={{"typescript": "`clear()`", "python": "`clear()`", "csharp": "`Clear()`"}} />. To remove both scopes from the backing store:

```csharp
await context.State.DeleteAsync(cancellationToken);
```

Values written after <LanguageInclude content={{"typescript": "`delete()`", "python": "`delete()`", "csharp": "`DeleteAsync()`"}} /> are saved normally at the end of the current turn.

## Scaling to distributed state

For production or multi-instance deployments, register a shared, durable `IDistributedCache` provider, such as Redis, SQL Server, or Azure Cache for Redis, before calling `UseState()`. The state API used by handlers doesn't change:

```csharp title="Program.cs"
using Microsoft.Teams.Apps;
using StackExchange.Redis;

WebApplicationBuilder builder = WebApplication.CreateSlimBuilder(args);

// Register Redis — UseState() picks this up automatically
builder.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = builder.Configuration["Redis:ConnectionString"];
});

builder.Services.AddTeamsBotApplication(options =>
{
    options.UseState();
});
```

The SDK serializes each scope as UTF-8 JSON bytes and replaces the complete scope on save, so concurrent turns use last-writer-wins semantics. Configure cache entry expiration and the key prefix through `UseState()`. Configure any provider-specific options when registering the `IDistributedCache` implementation.

::: zone-end
