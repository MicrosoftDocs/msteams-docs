---
title: Listening To Events
description: Understanding how to listen to and handle events in Teams SDK applications, including user actions and application server events.
ms.topic: how-to
zone_pivot_groups: teams-sdk-languages-typescript-python
ms.date: 11/11/2026
---
# Listening To Events

An **event** is a foundational concept in building agents — it represents something noteworthy happening either on Microsoft Teams or within your application. These events can originate from the user (e.g. installing or uninstalling your app, sending a message, submitting a form), or from your application server (e.g. startup, error in a handler).

:::image type="content" source="~/assets/essentials-on-event-1.png" alt-text="Flowchart showing Teams activities and sign-in events reaching the app server, which sends incoming and outgoing events to an event handler registered with app.event()." lightbox="~/assets/essentials-on-event-1.png" :::

The Teams SDK makes it easy to subscribe to these events and respond appropriately. You can register event handlers to take custom actions when specific events occur — such as logging errors, triggering workflows, or sending follow-up messages.

Here are the events that you can start building handlers for:

::: zone pivot="python"

| **Event Name**      | **Description**                                                                |
| ------------------- | ------------------------------------------------------------------------------ |
| `start`             | Triggered when your application starts. Useful for setup or boot-time logging. |
| `sign_in`           | Triggered during a sign-in flow via Teams.                                     |
| `error`             | Triggered when an unhandled error occurs in your app. Great for diagnostics.   |
| `activity`          | Triggered for all incoming Teams activities (messages, commands, etc.).        |
| `activity_response` | Triggered when your app sends a response to an activity. Useful for logging.   |
| `activity_sent`     | Triggered when an activity is sent (not necessarily in response).              |

<br/>

> [!NOTE]
> Event handler registration uses `@app.event("<event_name>")` with an async function that receives an event object specific to the event type (e.g., `ErrorEvent`, `ActivityEvent`).

::: zone-end

::: zone pivot="typescript"

| **Event Name**      | **Description**                                                                |
| ------------------- | ------------------------------------------------------------------------------ |
| `start`             | Triggered when your application starts. Useful for setup or boot-time logging. |
| `signin`            | Triggered during a sign-in flow via Teams.                                     |
| `error`             | Triggered when an unhandled error occurs in your app. Great for diagnostics.   |
| `activity`          | A catch-all for incoming Teams activities (messages, commands, etc.).          |
| `activity.response` | Triggered when your app sends a response to an activity. Useful for logging.   |
| `activity.sent`     | Triggered when an activity is sent (not necessarily in response).              |
::: zone-end

### Example 1

We can subscribe to errors that occur in the app.

::: zone pivot="python"

```python
@app.event("error")
async def handle_error(event: ErrorEvent):
    print(f"Error occurred: {event.error}")
    # Or alternatively, send it to an observability platform
```

::: zone-end

::: zone pivot="typescript"

```typescript
app.event('error', ({ error }) => {
  app.log.error(error);
  // Or Alternatively, send it to an observability platform
});
```

::: zone-end

### Example 2

::: zone pivot="python"

When a user signs in using `OAuth` or `SSO`, use the Graph API to fetch their profile and say hello.

```python
from microsoft_teams.graph import get_graph_client

graph = app.add_oauth_flow("graph")

@graph.on_signin
async def handle_signin(event: SignInEvent):
    client = get_graph_client(event.token_response.token)
    me = await client.me.get()
    await event.activity_ctx.send(f"👋 Hello {me.display_name}")
```

> [!TIP]
> The app-wide `sign_in` event fires for every connection. To react to just one, use its flow's `@flow.on_signin` handler as shown above. See the [auth guide](../in-depth-guides/user-authentication.md).

::: zone-end

::: zone pivot="typescript"

When a user signs in using `OAuth` or `SSO`, use the graph api to fetch their profile and say hello.

```typescript
import { Client as GraphClient } from '@microsoft/teams.graph';
import * as endpoints from '@microsoft/teams.graph-endpoints';

const graph = app.addOAuthFlow('graph');

graph.onSignInComplete(async (ctx, token) => {
  const client = new GraphClient({ token: () => token.token }, { baseUrlRoot: app.graphBaseUrl });
  const me = await client.call(endpoints.me.get);
  await ctx.send(`👋 Hello ${me.displayName}`);
});
```

> [!TIP]
> The app-wide `signin` event fires for every connection. To react to just one, use its flow's `onSignInComplete` callback as shown above. See the [auth guide](../in-depth-guides/user-authentication.md).

::: zone-end
