---
title: Botbuilder Compatibility
description: How to integrate existing BotBuilder adapters/handlers with Teams SDK during migration.
ms.topic: how-to
zone_pivot_groups: teams-sdk-languages
ms.date: 10/09/2026
---

# Botbuilder Compatibility

::: zone pivot="teams-sdk-csharp"

## Migrating to SDK 2.1

In **SDK 2.1**, the BotBuilder plugin is replaced by the `Microsoft.Teams.Apps.BotBuilder` NuGet package, which wires your existing `ActivityHandler` and `CloudAdapter` directly into ASP.NET Core without any additional plugin layer.

**1. Replace packages**

Remove the old SDK 2.0 plugin:

```xml
<!-- remove -->
<PackageReference Include="Microsoft.Teams.Plugins.AspNetCore.BotBuilder" Version="..." />
```

Add the SDK 2.1 compatibility package:

```xml
<!-- add -->
<PackageReference Include="Microsoft.Teams.Apps.BotBuilder" Version="..." />
```

**2. Update `Program.cs`**

Replace manual BotFramework registration with a single call:

```csharp
// before (SDK 2.0 or raw BotBuilder)
builder.Services.AddSingleton<IBotFrameworkHttpAdapter, AdapterWithErrorHandler>();
builder.Services.AddTransient<IBot, Bot>();

// after (SDK 2.1)
builder.AddTeamsBotFrameworkHttpAdapter();
builder.Services.AddTransient<IBot, Bot>();
```

Then map the messages endpoint:

```csharp
app.MapPost("/api/messages", async (IBotFrameworkHttpAdapter adapter, IBot bot,
    HttpRequest request, HttpResponse response, CancellationToken ct)
    => await adapter.ProcessAsync(request, response, bot, ct));
```

**3. Keep your existing handlers**

Your `ActivityHandler` (`Bot.cs`) and `CloudAdapter` implementations require no changes — they continue to work as-is.

<!-- Not applicable -->
::: zone-end

::: zone pivot="teams-sdk-python"

## Adapters

A BotBuilder `CloudAdapter` is responsible for managing communication between a bot and its users.
It serves as the entry point for incoming activities and forwards them to the registered `ActivityHandler` for processing.
You can customize the adapter to add middleware for logging, authentication, and define error handling.

The BotBuilder integration layer in Teams SDK connects the SDK with BotBuilder components.
It lets you keep an existing `CloudAdapter` and `ActivityHandler` while migrating hosting/runtime integration into Teams SDK.

## Activity Handlers

The BotBuilder `ActivityHandler` contains the actual bot logic for processing messages or events,
similar to how the Teams SDK `App` routes messages and events. You can override any number of methods,
such as `on_members_added_activity` or `on_message_activity`, to handle different activity types.

## Turn Context

Each incoming activity is wrapped in a `TurnContext`, which represents the context of a single turn in the conversation.
TurnContext provides access to:

- The incoming activity (message, event).
- Services for sending responses back to the user.
- Conversation, user, and channel metadata.

Teams SDK has `ActivityContext` for the same purpose.

## How it all comes together

The `CloudAdapter` creates the `TurnContext`, and the `ActivityHandler` uses it to read the activity and send responses.

With the `BotBuilderPlugin`, when a message or activity is received:

1. The BotBuilder ActivityHandler runs first, handling the activity according to standard Bot Framework logic.
2. The Teams SDK app based activity handlers execute afterward, allowing Teams SDK logic to execute.

# [app.py](#tab/apppy)

```python
    import asyncio
    from adapter import adapter
    from activity_handler import MyActivityHandler
    from microsoft_teams.api import MessageActivity
    from microsoft_teams.apps import ActivityContext, App
    from microsoft_teams.botbuilder import BotBuilderPlugin

    # highlight-next-line
    app = App(plugins=[BotBuilderPlugin(adapter=adapter, handler=MyActivityHandler())])

    @app.on_message
    async def handle_message(ctx: ActivityContext[MessageActivity]):
        print("Handling message in app...")
        await ctx.send("hi from teams...")

    if __name__ == "__main__":
        asyncio.run(app.start())
```

# [adapter.py](#tab/adapterpy)

```python
    from botbuilder.core import TurnContext
    from botbuilder.integration.aiohttp import (
        CloudAdapter,
        ConfigurationBotFrameworkAuthentication,
    )
    from botbuilder.schema import Activity, ActivityTypes
    from types import SimpleNamespace

    config = SimpleNamespace(
        APP_TYPE="SingleTenant" if tenant_id else "MultiTenant",
        APP_ID=client_id,
        APP_PASSWORD=client_secret,
        APP_TENANTID=tenant_id,
    )

    # replace with your Adapter
    # highlight-start
    adapter = CloudAdapter(ConfigurationBotFrameworkAuthentication(config))

    async def on_error(context: TurnContext, error: Exception):
        await context.send_activity("The bot encountered an error or bug.")

    adapter.on_turn_error = on_error
    # highlight-end
```

# [activity_handlerp.y](#tab/activityhandlerpy)

```python
    from botbuilder.core import ActivityHandler, TurnContext

    # replace with your ActivityHandler
    # highlight-start
    class MyActivityHandler(ActivityHandler):
        async def on_message_activity(self, turn_context: TurnContext):
            await turn_context.send_activity("hi from botbuilder...")
    # highlight-end
```

---

In this example:

- `adapter.py` defines a `CloudAdapter` to handle incoming activities, and can include middleware support or error handling.
- `activity_handler.py` defines the `ActivityHandler` and contains the core bot logic.
- `app.py` sets up a Teams SDK `app` and registers the `BotBuilderPlugin` with your adapter and activity handler.

This strategy can be used to incrementally migrate from BotBuilder to the Teams SDK.

::: zone-end

::: zone pivot="teams-sdk-typescript"

## Adapters

A BotBuilder `CloudAdapter` is responsible for managing communication between a bot and its users.
It serves as the entry point for incoming activities and forwards them to the registered `ActivityHandler` for processing.
You can customize the adapter to add middleware for logging, authentication, and define error handling.

The BotBuilder integration layer in Teams SDK connects the SDK with BotBuilder components.
It lets you keep an existing `CloudAdapter` and `ActivityHandler` while migrating hosting/runtime integration into Teams SDK.

## Activity Handlers

The BotBuilder `ActivityHandler` contains the actual bot logic for processing messages or events,
similar to how the Teams SDK `App` routes messages and events. You can override any number of methods,
such as `OnMembersAdded` or `onMessage`, to handle different activity types.

## Turn Context

Each incoming activity is wrapped in a `TurnContext`, which represents the context of a single turn in the conversation.
TurnContext provides access to:

- The incoming activity (message, event).
- Services for sending responses back to the user.
- Conversation, user, and channel metadata.

Teams SDK has `IActivityContext` for the same purpose.

## How it all comes together

The `CloudAdapter` creates the `TurnContext`, and the `ActivityHandler` uses it to read the activity and send responses.

With the `BotBuilderPlugin`, when a message or activity is received:

1. The BotBuilder ActivityHandler runs first, handling the activity according to standard Bot Framework logic.
2. The Teams SDK app based activity handlers execute afterward, allowing Teams SDK logic to execute.

# [indexts](#tab/indexts)

```typescript
    import { App } from '@microsoft/teams.apps';
    import { BotBuilderPlugin } from '@microsoft/teams.botbuilder';

    import adapter from './adapter';
    import handler from './activity-handler';

    const app = new App({
      // highlight-next-line
      plugins: [new BotBuilderPlugin({ adapter, handler })],
    });

    app.on('message', async ({ send }) => {
      await send('hi from teams...');
    });

    (async () => {
      await app.start();
    })();
```

# [adapter.ts](#tab/adapterts)

```typescript
    import { CloudAdapter } from 'botbuilder';

    // replace with your BotAdapter
    // highlight-start
    const adapter = new CloudAdapter(
      new ConfigurationBotFrameworkAuthentication(
        {},
        new ConfigurationServiceClientCredentialFactory({
          MicrosoftAppType: tenantId ? 'SingleTenant' : 'MultiTenant',
          MicrosoftAppId: clientId,
          MicrosoftAppPassword: clientSecret,
          MicrosoftAppTenantId: tenantId,
        })
      )
    );
    // highlight-end

    export default adapter;
```

# [activity_handler.ts](#tab/activityhandlerts)

```typescript
    import { TeamsActivityHandler } from 'botbuilder';

    // replace with your TeamsActivityHandler
    // highlight-start
    export class ActivityHandler extends TeamsActivityHandler {
      constructor() {
        super();
        this.onMessage(async (ctx, next) => {
          await ctx.sendActivity('hi from botbuilder...');
          await next();
        });
      }
    }
    // highlight-end

    const handler = new ActivityHandler();
    export default handler;
```

---

In this example:

- `adapter.ts` defines a `CloudAdapter` to handle incoming activities, and can include middleware support or error handling.
- `activity-handler.ts` defines the `ActivityHandler` and contains the core bot logic.
- `index.ts` sets up a Teams SDK `app` and registers the `BotBuilderPlugin` with your adapter and activity handler.

This strategy can be used to incrementally migrate from BotBuilder to the Teams SDK.

::: zone-end
