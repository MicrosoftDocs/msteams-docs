---
title: Configure delivery method for an agent
description: Learn how to configure the delivery method for your agents.
ms.localizationpriority: high
ms.date: 11/06/2026
ms.topic: article
zone_pivot_groups: teams-sdk-languages
---

# Configure delivery method for an agent

> [!Note]
> Socket mode is in public preview. It's recommended for developing and testing agents. For agents in production, use an HTTPS endpoint. Preview features can change before general availability.

The delivery method (see [Choose how your agent receives activity data from Teams](agent-connectivity.md)) is configured in two places:

- The agent's **bot registration**, configured in Teams Developer Portal or with the Teams CLI.
- The agent's **runtime code**.

You can update both at any time. Change both together: the registration controls how Agent Communication Service (ACS) delivers activities, and the code controls how your agent receives them.

You can choose the delivery method when you create an agent with `teams app create`, and change it later with `teams app update` or in Teams Developer Portal, and make the corresponding change in your agent's code:

```bash
# Setup 
npm install -g @microsoft/teams.cli@3.1.0
teams login
teams --version # Expected output 3.1.0

# Create an agent that uses socket mode
teams app create --name "My agent" --messaging-mode socket

# Switch an existing agent to socket mode
teams app update <app-id> --messaging-mode socket

# Switch an existing agent back to HTTP (will use previously saved endpoint)
teams app update <app-id> --messaging-mode http

```

Socket mode requires a minimum of **Version 3.1.0** of the CLI.

## Configure the agent's bot registration

**In Teams Developer Portal:**

1. Go to **Tools** > **Bot management** and select your bot.
2. Select **Configure**.
3. Under **Delivery method**, select **Socket mode**, and then select **Save**.

To switch back, select **HTTP endpoint** and enter your agent's endpoint URL. It must be an `https://` URL.

:::image type="content" source="../assets/images/agents-in-teams/socket-mode/configure-socket-status.png" alt-text="Image shows the screenshot for configuring socket status in Developer Portal.":::

When **Socket Mode is on** appears, start your bot to establish the outbound WebSocket connection. A public HTTPS endpoint or development tunnel isn't required. Bots published to the Teams Store must use an HTTPS endpoint.

Using an Azure Bot? See [Manage Azure bots in Developer Portal for Teams](../concepts/build-and-test/manage-azure-bots.md) for guidance on managing your Azure bot in Teams Developer Portal.

**What changes when you switch.** ACS picks up a change to the registration within about a minute.

- **Turning socket mode on.** ACS delivers activities only over sockets, not to the messaging endpoint. Until your agent connects, activities aren't delivered.
- **Turning socket mode off.** ACS closes the agent's open sockets, and each gets a `SocketClosing` notice first (see [Handle disconnects](connect-agent-without-sdk.md#6-handle-disconnects)) and delivers to the messaging endpoint again. New connect requests are refused with `403`.

## Configure the agent's runtime

### Teams SDK

In your agent's code, turn on socket mode when you create the app. The SDK then connects in every region, handles activities exactly as it does for an HTTPS endpoint, replaces sockets before their tokens expire, and reconnects when a socket closes.

If you change the socket mode setting at any time, you will need to restart your app so it reflects the changes.

Socket mode requires a minimum of **Version 2.2.1** of the SDK. Pick whichever language suits you best:

  - [TypeScript Release v2.2.1](https://github.com/microsoft/teams.ts/releases/tag/v2.2.1)
  - [Python Release v2.2.1](https://github.com/microsoft/teams.py/releases/tag/v2.2.1)
  - [.NET Release v2.2.1](https://github.com/microsoft/teams.net/releases/tag/v2.2.1)

**For options, you can specify the following value:**

1. `geos` - Geographies to connect to, with one independent socket each. Every socket must connect for `start()` to succeed, after which each is supervised on its own.

::: zone pivot="teams-sdk-typescript"

```TypeScript

import { App } from '@microsoft/teams.apps';
import { ConsoleLogger } from '@microsoft/teams.common';


const app = new App({
  logger: new ConsoleLogger('@examples/socket', { level: 'debug' }),
  socketMode: {
    geos: ['amer', 'emea', 'apac'], // the default
  },
});

// --- Socket lifecycle events -------------------------------------------------
// `app.socketMode` is the inbound transport; subscribe to its events to observe
// each geo's connection independently. These are purely observational — inbound
// delivery keeps working across reconnects without any handler changes.

app.socketMode?.events.on('ready', ({ geo, frame }) => {
  app.log.info(`[socket] geo '${geo}' ready (connectionId=${frame.connectionId ?? 'n/a'})`);
  app.log.info(`[socket] aggregate status: ${app.socketMode?.status}`);
});

app.socketMode?.events.on('disconnected', ({ geo, error, terminal }) => {
  if (terminal) {
    // Negotiate rejected the bot with HTTP 401/403 (a `NegotiateError`). This geo
    // will not reconnect until the credentials or Socket Mode access are fixed
    // and the app is restarted.
    app.log.error(`[socket] geo '${geo}' stopped: ${error?.message}`);
    return;
  }
  // Inbound delivery for this geo is paused while it reconnects; the other geos
  // keep serving. No action needed — the supervisor reconnects automatically.
  app.log.warn(`[socket] geo '${geo}' disconnected${error ? `: ${error.message}` : ''}; reconnecting…`);
});

app.socketMode?.events.on('reconnected', ({ geo }) => {
  app.log.info(`[socket] geo '${geo}' reconnected; inbound delivery resumed`);
});

// --- Bot logic ---------------------------------------------------------------
// Handlers are transport-agnostic: the exact same code works over HTTP or
// Socket Mode.
app.on('message', async ({ reply, activity }) => {
  await reply({ type: 'typing' });
  await reply(`you said "${activity.text}"`);
});

(async () => {
  await app.start();

  // Snapshot the per-geo status once we're up.
  app.log.info(`[socket] connected geos: ${app.socketMode?.geoList.join(', ')}`);
  for (const { geo, status } of app.socketMode?.geoStatuses ?? []) {
    app.log.info(`[socket]   ${geo}: ${status}`);
  }
})();

```

::: zone-end

::: zone pivot="teams-sdk-python"

```python

import asyncio
import logging

from dotenv import find_dotenv, load_dotenv
from microsoft_teams.api import MessageActivity
from microsoft_teams.api.activities.typing import TypingActivityInput
from microsoft_teams.apps import (
    ActivityContext,
    App,
    SocketModeDisconnectedEvent,
    SocketModeOptions,
    SocketModeReadyEvent,
    SocketModeReconnectedEvent,
)

load_dotenv(find_dotenv(usecwd=True))

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)-7s %(name)s: %(message)s")
# Negotiate, handshake, readiness, and per-geo lifecycle all log under this namespace.
logging.getLogger("microsoft_teams.apps.socket_mode").setLevel(logging.DEBUG)
logger = logging.getLogger(__name__)

app = App(
    socket_mode=SocketModeOptions(
        # Socket Mode is only available on the Canary and Pilot1 rings for now.
        # Pilot1 (https://pilot1.botapi.skype.com) is supported as well.
        negotiate_base_url="https://canary.botapi.skype.com",
    )
)


# Handlers are transport-agnostic: the exact same code works over HTTP or Socket Mode.
@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]) -> None:
    await ctx.send(TypingActivityInput())
    await ctx.send(f'you said "{ctx.activity.text}"')


# `app.socket_mode` is the inbound transport; subscribe to its events to observe each
# geo's connection independently. These are purely observational — inbound delivery
# keeps working across reconnects without any handler changes.


def on_ready(event: SocketModeReadyEvent) -> None:
    logger.info("[socket] geo '%s' ready (connection_id=%s)", event.geo, event.frame.connection_id)

    # `app.start()` blocks until shutdown, so the per-geo snapshot is taken here rather
    # than after the call.
    if app.socket_mode:
        logger.info("[socket] aggregate status: %s", app.socket_mode.status)
        for geo, status in app.socket_mode.geo_statuses:
            logger.info("[socket]   %s: %s", geo, status)


def on_disconnected(event: SocketModeDisconnectedEvent) -> None:
    if event.terminal:
        logger.error(
            "[socket] geo '%s' stopped: %s; check bot credentials or Socket Mode access, then restart the app",
            event.geo,
            event.error,
        )
        return
    logger.warning("[socket] geo '%s' disconnected: %s; reconnecting...", event.geo, event.error)


def on_reconnected(event: SocketModeReconnectedEvent) -> None:
    logger.info("[socket] geo '%s' reconnected; inbound delivery resumed", event.geo)


if app.socket_mode:
    app.socket_mode.events.on("ready", on_ready)
    app.socket_mode.events.on("disconnected", on_disconnected)
    app.socket_mode.events.on("reconnected", on_reconnected)


if __name__ == "__main__":
    asyncio.run(app.start())


```

::: zone-end

::: zone pivot="teams-sdk-csharp"

```csharp
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Teams.Apps;
using Microsoft.Teams.Apps.SocketMode;

// Socket Mode receives activities over an outbound WebSocket, so the bot runs on a
// generic host with no web server and no public messaging endpoint.
HostApplicationBuilder builder = Host.CreateApplicationBuilder(new HostApplicationBuilderSettings
{
    Args = args,
    ContentRootPath = AppContext.BaseDirectory,
});
builder.Services.AddTeamsBotApplication();
using IHost host = builder.Build();

TeamsBotApplication teamsApp = host.UseTeamsBotApplication();
ILogger logger = host.Services.GetRequiredService<ILoggerFactory>().CreateLogger("SocketModeBot");

if (teamsApp.SocketMode is { } socketMode)
{
    socketMode.Events.Ready += (_, e) =>
    {
        logger.LogInformation("[socket] Geo {Geo} ready (connectionId={ConnectionId}).", e.Geo, e.Frame.ConnectionId);
        logger.LogInformation("[socket] Aggregate status: {Status}.", socketMode.Status);
    };

    socketMode.Events.Disconnected += (_, e) =>
    {
        if (e.Terminal)
        {
            logger.LogError(
                "[socket] Geo {Geo} stopped: {Error}; check bot credentials or Socket Mode access, then restart the app.",
                e.Geo, e.Error?.Message);
        }
        else
        {
            logger.LogWarning("[socket] Geo {Geo} disconnected: {Error}; reconnecting.", e.Geo, e.Error?.Message);
        }

        logger.LogInformation("[socket] Aggregate status: {Status}.", socketMode.Status);
    };

    socketMode.Events.Reconnected += (_, e) =>
        logger.LogInformation("[socket] Geo {Geo} reconnected; inbound delivery resumed.", e.Geo);
}

teamsApp.OnMessage(async (context, cancellationToken) =>
{
    // ReplyAsync quotes the user's message above the reply.
    await context.ReplyAsync($"You said: {context.Activity.Text}", cancellationToken);
});

await host.StartAsync();

if (teamsApp.SocketMode is { } startedSocketMode)
{
    logger.LogInformation("[socket] Connected geos: {Geos}.", string.Join(", ", startedSocketMode.GeoList));
    foreach ((string geo, SocketModeStatus status) in startedSocketMode.GeoStatuses)
    {
        logger.LogInformation("[socket] Geo {Geo}: {Status}.", geo, status);
    }
}

await host.WaitForShutdownAsync();

```

::: zone-end

### Without an SDK

To implement socket mode yourself, see [Connect an agent to Teams without an SDK](connect-agent-without-sdk.md).

## Error codes

When socket mode works, your agent connects in every region: with the Teams SDK, the app finishes starting only after it connects; without an SDK, each socket receives a `SocketReady` message. Send your agent a message in Teams to confirm that it receives activities.

If your agent can't connect, check the status code that the connect request returns.

| Status | Error message | Cause and fix |
| --- | --- | --- |
| `401` | Unauthenticated request | The request has no token, or the token is invalid or expired. Get a token for the scope `https://api.botframework.com/.default` with the agent's own app registration. |
| `403` | `WebSocket connect requires an authenticated bot.` | The token isn't the agent's own bot token, for example, because it was issued to another app or to an agentic user. Use the credentials of the agent's own app registration. |
| `403` | `Socket mode is not enabled for this bot.` | Socket mode isn't turned on in the agent's bot registration, or isn't available for your tenant yet. Turn it on, and allow about a minute for the change to take effect. The Teams SDK stops retrying after a `403`; restart your agent after you fix the cause. |
| `429` | `This bot already has ... socket connections open ...` | The agent already has the maximum number of sockets in this region. Wait for the number of seconds in the `Retry-After` header, then retry. The Teams SDK retries automatically. Check for instances that open more sockets than they need. |
| `503` | `Socket mode is not available for this bot.` or `Unable to allocate WebSocket session.` | A temporary problem in ACS. Retry with backoff. The Teams SDK retries automatically. |

## Troubleshooting

If your agent connects but doesn't receive activities:

| Symptom | Cause and fix |
| --- | --- |
| Activities still go to the messaging endpoint. | The change to the bot registration hasn't taken effect everywhere yet. Wait about a minute. |
| Some conversations reach the agent and others don't. | The agent isn't connected in every region. Connect in `amer`, `emea`, and `apac`. |
| Activities arrive but the user sees an error, or the activity is reported as failed. | The agent's reply was late (more than 25 seconds) or invalid. See [Step 4, Handle activities and reply](connect-agent-without-sdk.md#4-handle-activities-and-reply) in [Connect an agent to Teams without an SDK](connect-agent-without-sdk.md). |
| The socket connects but never gets `SocketReady`. | Another socket already used the same access token. Call connect again for every socket. |

## Code sample

| Sample name | Description | TypeScript | Python | .NET |
| --- | --- | --- | --- | --- |
| Teams SDK socket mode sample | This sample shows how to receive activities from ACS using socket mode. | [View](https://github.com/microsoft/teams.ts/tree/main/examples/socket) | [View](https://github.com/microsoft/teams.py/tree/main/examples/socket) | [View](https://github.com/microsoft/teams.net/tree/main/samples/SocketModeBot) |

---
