---
title: Observe Agent Activity with Middleware and Logging
description: Add turn middleware to run cross-cutting logic on every activity your agent receives, and configure the Teams SDK logger to control log level, destination, and verbosity.
ms.topic: how-to
zone_pivot_groups: teams-sdk-languages
ms.date: 10/07/2026
---

# Observe agent activity with middleware and logging

Teams SDK gives you two complementary tools for understanding what your agent is doing at runtime:

* **Middleware** runs on every inbound activity, before your activity handlers. Use it for cross-cutting concerns such as request logging, metrics, validation, and enriching the turn with extra context.
* **Logging** gives each handler a logger that you can configure for level, destination, and verbosity.

## Middleware

Middleware runs on every incoming activity, in registration order, before your activity handlers. Each middleware does its work, then passes control down the pipeline to the next middleware or to the matching handler.

::: zone pivot="teams-sdk-csharp"

Implement `ITurnMiddleware` and register it with `teams.UseMiddleware()`. Call `nextTurn` to pass control down the pipeline.

The following middleware logs the type of each inbound activity:

```csharp
using Microsoft.Teams.Apps;
using Microsoft.Teams.Core;
using Microsoft.Teams.Core.Schema;

internal class ActivityLoggingMiddleware : ITurnMiddleware
{
  public async Task OnTurnAsync(
    BotApplication botApplication,
    CoreActivity activity,
    NextTurn nextTurn,
    CancellationToken cancellationToken = default)
  {
    Console.WriteLine(activity.Type);
    await nextTurn(cancellationToken);
  }
}
```

Register the middleware during startup:

```csharp
teams.UseMiddleware(new ActivityLoggingMiddleware());
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

Register middleware with `app.use()`. Call `next()` to pass control down the pipeline.

The following middleware records how long every handler that runs after it takes to complete:

```typescript
app.use(async ({ log, next }) => {
  const startedAt = new Date();
  await next();
  log.debug(new Date().getTime() - startedAt.getTime());
});
```

::: zone-end

::: zone pivot="teams-sdk-python"

Register middleware with the `@app.use` decorator. Call `ctx.next()` to pass control down the pipeline.

The following middleware records how long every handler that runs after it takes to complete:

```python
@app.use
async def log_activity(ctx: ActivityContext[MessageActivity]):
    started_at = datetime.now()
    await ctx.next()
    ctx.logger.debug(f"{datetime.now() - started_at}")
```

::: zone-end

Middleware that doesn't pass control down the pipeline stops the turn. Use this behavior deliberately, for example to drop activities that fail a validation check, and make sure every other path calls through.

## Logging

Each SDK exposes a logger for activity handling. The logging backend and configuration vary by language; these examples cover the agent server, rather than the client-side logger for [Teams SDK tab apps](../tabs/teams-sdk/tab-app-options.md#logger).

::: zone pivot="teams-sdk-csharp"

The C# SDK uses the standard ASP.NET Core logging stack, so configure providers, levels, and filters the same way you would in any ASP.NET Core app:

```csharp
WebApplicationBuilder builder = WebApplication.CreateSlimBuilder(args);

builder.Logging.AddConsole();
builder.Logging.SetMinimumLevel(LogLevel.Debug);

builder.Services.AddTeamsBotApplication();
```

Inside an activity handler, use `context.Log` to emit diagnostics scoped to the current turn:

```csharp
teams.OnMessage(async (context, cancellationToken) =>
{
    context.Log.Debug("Handling message activity.");
    await context.SendAsync($"you said \"{context.Activity.Text}\"", cancellationToken);
});
```

For app-wide error handling, use standard ASP.NET Core exception-handling middleware. Failures during activity processing surface as a `BotHandlerException` that wraps the original exception and the activity that caused it.

::: zone-end

::: zone pivot="teams-sdk-typescript"

The default logger is a `ConsoleLogger` from the `@microsoft/teams.common` package, named `@teams/app`. To control its level or destination, pass your own instance as the `logger` app option:

```typescript
import { App } from '@microsoft/teams.apps';
import { ConsoleLogger } from '@microsoft/teams.common';

const app = new App({
  logger: new ConsoleLogger('echo', { level: 'debug' }),
});

app.on('message', async ({ send, activity, log }) => {
  log.debug(activity.type);
  await send({ type: 'typing' });
  await send(`you said "${activity.text}"`);
});

await app.start();
```

### TypeScript log levels

Levels, from most to least severe, are `error`, `warn`, `info`, `debug`, and `trace`. The default is `info`. Each level includes the levels more severe than it, so `level: 'debug'` emits `error`, `warn`, `info`, and `debug` messages, but not `trace`.

### Filter TypeScript logs by logger name

Every logger has a name. The `pattern` option controls which loggers emit output, using `*` as a wildcard. Prefix a pattern with `-` to exclude it, and separate multiple patterns with commas:

```typescript
new ConsoleLogger('my-app', { pattern: '@teams*' });        // Only SDK loggers.
new ConsoleLogger('my-app', { pattern: '*,-@teams/http*' }); // Everything except HTTP.
```

### TypeScript logging environment variables

`ConsoleLogger` reads the following environment variables when it's constructed. These values override the options passed to the constructor.

| Variable | Purpose | Example |
| --- | --- | --- |
| `LOG_LEVEL` | Minimum severity to emit. | `LOG_LEVEL=debug` |
| `LOG` | Logger name pattern, with wildcards. | `LOG=@teams*` |

If you don't pass a logger to `App`, setting `LOG_LEVEL=debug` alone is enough to turn on debug output for the default logger.

> [!CAUTION]
> `LOG` is a name filter, not an on/off switch. Setting `LOG` to a pattern that doesn't match the default `@teams/app` logger, such as `LOG=my-app*`, silences the default logger. If you aren't sure, leave `LOG` unset so that all logger names match.

### Child loggers

Call `log.child()` on an existing logger to get a scoped logger. Its name is `parent/scope`, and it inherits the parent's level and pattern:

```typescript
app.on('message', async ({ log }) => {
  const msgLog = log.child('message-handler');
  msgLog.debug('processing'); // Logged as "@teams/app/message-handler".
});
```

::: zone-end

::: zone pivot="teams-sdk-python"

The Python SDK uses the standard `logging` module, so there's no custom logger to inject into `App`. To see SDK log output, attach a handler to the `microsoft_teams` logger hierarchy. The `microsoft-teams-common` package ships a `ConsoleFormatter` with color-coded output:

```python
import logging
import os

from microsoft_teams.common import ConsoleFormatter

handler = logging.StreamHandler()
handler.setFormatter(ConsoleFormatter())
logging.getLogger("microsoft_teams").addHandler(handler)
logging.getLogger("microsoft_teams").setLevel(os.getenv("LOG_LEVEL", "INFO").upper())
```

### Python log levels

The standard Python levels apply: `DEBUG`, `INFO`, `WARNING`, `ERROR`, and `CRITICAL`.

### Filter Python logs by logger name

Use `ConsoleFilter` to limit which loggers emit output, matched by name with `*` as a wildcard:

```python
import logging

from microsoft_teams.common import ConsoleFilter, ConsoleFormatter

handler = logging.StreamHandler()
handler.setFormatter(ConsoleFormatter())
handler.addFilter(ConsoleFilter("microsoft_teams*"))  # Only SDK loggers.
logging.getLogger().addHandler(handler)
```

### Python logging environment variables

The Python SDK doesn't read logging environment variables on its own. If you want an environment variable such as `LOG_LEVEL` to control verbosity, read it yourself at startup:

```python
logging.getLogger().setLevel(os.getenv("LOG_LEVEL", "INFO").upper())
```

::: zone-end

> [!IMPORTANT]
> Activity payloads can contain message text, file names, and user identifiers. Make sure that any middleware or logger you add handles this data in line with your organization's privacy and retention requirements, and avoid writing full activity payloads to logs in production.

## See also

* [Agent basics](../bots/bot-concepts.md)
* [Agent trust model](agent-trust-model.md)
* [Host web content and manage your agent's HTTP server](host-agent-server.md)
