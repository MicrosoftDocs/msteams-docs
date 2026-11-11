---
title: Teams SDK App Basics
description: Comprehensive guide to the App class, the main entry point for Teams SDK agents that handles server hosting, request routing, authentication, and extensibility.
ms.topic: how-to
zone_pivot_groups: teams-sdk-languages
ms.date: 11/11/2026
---

# Teams SDK App Basics

::: zone pivot="teams-sdk-csharp"

The app is the main entry point for your agent. It is a `TeamsBotApplication`, built on top of a standard ASP.NET Core web application. You register it at startup with `builder.Services.AddTeamsBotApplication()` and expose it as your bot's HTTP endpoint with `app.UseTeamsBotApplication()` — see the [quickstart](../agents-in-teams/quickstart-create-agent-teams-sdk.md) or [Teams SDK Code Basics](sdk-code-basics.md) for the full setup.

It is responsible for:

1. Hosting and running the server (via ASP.NET Core / Kestrel)
2. Serving incoming requests on `/api/messages` and routing them to your handlers
3. Handling authentication for your agent to the Teams backend (via your `AzureAd` configuration)
4. Providing helpful utilities which simplify interacting with the Teams platform (`context.SendAsync`, `context.ReplyAsync`, the API client, etc.)
5. Letting you extend behavior with standard ASP.NET Core **middleware** and **dependency injection**

:::image type="content" source="~/assets/essentials-app-basics-1.png" alt-text="Flowchart showing Teams sending requests to the /api/messages endpoint of an ASP.NET Core app, through turn middleware and activity routing to your handlers, with auth and utilities also feeding the handlers." lightbox="~/assets/essentials-app-basics-1.png" :::

## Definitions

- Activity: The Teams-specific payload that flows between the user and your app. Activities include things like messages, reactions, adaptive card actions, and installs.
- InvokeActivity: A specific kind of activity triggered by user interaction (like submitting a form), which may or may not require a response.
- Handler: The logic in your application that reacts to an activity. You register handlers (`OnMessage`, `OnMessageReaction`, `OnEvent`, …) that decide what to do, when, and how to respond.

:::image type="content" source="~/assets/essentials-overview-1.png" alt-text="Flowchart showing Teams activities, sign-in events, and other incoming events reaching an ASP.NET Core app server, then passing through turn middleware and the activity router to activity handlers for message, card, installation, and other activities." lightbox="~/assets/essentials-overview-1.png" :::

## Core Components

**Hosting (ASP.NET Core)**

- Runs the web server (Kestrel) and exposes your bot at `/api/messages`
- Managed with the standard host lifecycle (`IHostApplicationLifetime` for start/stop)

**Activity Routing**

- Routes incoming activities to the appropriate typed handler (`OnMessage`, `OnEvent`, `OnMembersAdded`, `OnInstall`, …)

**Turn Middleware**

- Cross-cutting logic that runs on every turn (logging, metrics, etc.)
- Implement `ITurnMiddleware` and register it with `teams.UseMiddleware(...)`

**Utilities**

- Convenience methods for interacting with Teams (`context.SendAsync`, `context.ReplyAsync`, `context.TypingAsync`, the `context.Api` client, and streaming)

**Auth**

- Handles authenticating your agent with the Teams backend using your `AzureAd` configuration
- Validates inbound tokens before any handler runs (see [Teams SDK incoming request authentication](../agents-in-teams/incoming-request-authentication.md)).

**Dependency Injection**

- Register your own services in `builder.Services` and inject them into handlers and middleware, just like any ASP.NET Core app

::: zone-end

::: zone pivot="teams-sdk-python,teams-sdk-typescript"

The `App` class is the main entry point for your agent.

It is responsible for:

1. Hosting and running the server (via plugins)
2. Serving incoming requests and routing them to your handlers
3. Handling authentication for your agent to the Teams backend
4. Providing helpful utilities which simplify the ability for your application to interact with the Teams platform
5. Managing plugins which can extend the functionality of your agent

:::image type="content" source="~/assets/essentials-app-basics-2.png" alt-text="Flowchart showing Teams passing through core plugins, events, activity routing, and secondary plugins to application logic, with auth and utilities also feeding the application logic." lightbox="~/assets/essentials-app-basics-2.png" :::

## Definitions

- Event: Anything interesting that happens on Teams — or within your application as a result of handling an earlier event.
- Activity: A special type of Teams-specific event. Activities include things like messages, reactions, and adaptive card actions.
- InvokeActivity: A specific kind of activity triggered by user interaction (like submitting a form), which may or may not require a response.
- Handler: The logic in your application that reacts to events or activities. Handlers decide what to do, when, and how to respond.

## Core Components by Language

**Plugins**

- Can be used to set up the server
- Can listen to messages or send messages out

**Events**

- Listens to events from core plugins
- Emit interesting events to the application

**Activity Routing**

- Routes activities to appropriate handlers

**Utilities**

- Provides utility functions for convenience (like sending replies or proactive messages)

**Auth**

- Handles authenticating your agent with Teams, Graph, etc.
- Simplifies the process of authenticating your app or user for your app

**Plugins (Secondary)**

- Can hook into activity handlers or proactive scenarios
- Can modify or update agent activity events

## Plugins

You'll notice that plugins are present in the front, which exposes your application as a server, and also in the back after the app does some processing to the incoming message. The plugin architecture allows the application to be built in an extremely modular way. Each plugin can be swapped out to change or augment the functionality of the application. The plugins can listen to various events that happen (e.g. the server starting or ending, an error occurring, etc), activities being sent to or from the application and more. This allows the application to be extremely flexible and extensible.

::: zone-end

::: zone pivot="teams-sdk-python"
:::image type="content" source="~/assets/essentials-overview-3.png" alt-text="Flowchart showing Teams activities, sign-in events, and other incoming events reaching the app server, which sends activity events to the activity router and incoming and outgoing events to an event handler decorator, with the router dispatching to activity handler decorators." lightbox="~/assets/essentials-overview-3.png" :::
::: zone-end

::: zone pivot="teams-sdk-typescript"
:::image type="content" source="~/assets/essentials-overview-4.png" alt-text="Flowchart showing Teams activities, sign-in events, and other incoming events reaching the app server, which sends activity events to the activity router and incoming and outgoing events to an app.event() handler, with the router dispatching to app.on() activity handlers." lightbox="~/assets/essentials-overview-4.png" :::
::: zone-end
