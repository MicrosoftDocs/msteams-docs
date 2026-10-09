---
title: Host Web Content and Manage Your Agent's HTTP Server
description: Serve a tab app or other static web content from your Teams SDK agent, and take over the HTTP server lifecycle to add Teams to an existing app or use a different web framework.
ms.topic: how-to
zone_pivot_groups: teams-sdk-languages
ms.date: 10/07/2026
---

# Host web content and manage your agent's HTTP server

A Teams SDK agent is an HTTP server. By default, the SDK creates that server for you, registers the `/api/messages` endpoint, and manages its lifecycle. You can go further and use the same server to host web content, or take the server over entirely.

## Host static web content

The `App` class can host a web app alongside your agent. Doing so gives you an efficient inner loop, because you can build, deploy, and sideload both an agent and a tab app in a single step. It's also useful in production for simple experiences such as an agent configuration page or a dialog.

Host a folder that contains an `index.html` file; use the SDK's tab helper in TypeScript and Python, or ASP.NET Core static-file middleware in C#.

::: zone pivot="teams-sdk-csharp"

In SDK 2.1, use ASP.NET Core static-file middleware to serve files from the web build directory under the tab route:

```csharp
using Microsoft.Extensions.FileProviders;

string tabDirectory = Path.Combine(Directory.GetCurrentDirectory(), "Web", "bin");
app.UseStaticFiles(new StaticFileOptions
{
  FileProvider = new PhysicalFileProvider(tabDirectory),
  RequestPath = "/tabs/myApp"
});

app.MapGet("/tabs/myApp", () =>
{
  return Results.File(Path.Combine(tabDirectory, "index.html"), "text/html");
});
```

Create the `Web/bin` directory and its `index.html` before starting the server. Static-file middleware serves only files within that directory; don't build a file path directly from an untrusted URL segment. The route is hosted at `http://localhost:PORT/tabs/myApp` during local development, and at `https://BOT_DOMAIN/tabs/myApp` once deployed.

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript
import path from 'path';

app.tab('myApp', path.resolve('dist/client'));
```

This registers a route hosted at `http://localhost:PORT/tabs/myApp` during local development, and at `https://BOT_DOMAIN/tabs/myApp` once deployed.

::: zone-end

::: zone pivot="teams-sdk-python"

```python
import os

app.tab("my_app", os.path.abspath("dist/client"))
```

This registers a route hosted at `http://localhost:PORT/tabs/my_app` during local development, and at `https://BOT_DOMAIN/tabs/my_app` once deployed.

::: zone-end

Add the host domain to the `validDomains` array in your app manifest, and reference the route from the tab definition, the same way you would for a tab hosted anywhere else. For more information, see [Build tabs for Teams](../tabs/what-are-tabs.md).

## Manage the HTTP server yourself

In TypeScript and Python, calling `app.start()` spins up an HTTP server and manages its lifecycle. In C#, ASP.NET Core owns the server and you call `webApp.Run()`. Control the server yourself when you need to:

* Add Teams support to an app that already has its own server and routes.
* Control server configuration such as TLS, worker processes, or framework middleware.
* Use an HTTP framework other than the SDK's built-in default.

TypeScript and Python support custom HTTP server adapters; C# uses ASP.NET Core directly.

### How it works

In TypeScript and Python, the SDK splits HTTP handling into two layers:

* The **HTTP server** handles Teams protocol concerns: JSON Web Token (JWT) authentication, activity parsing, and routing to your handlers.
* The **HTTP server adapter** handles framework concerns: translating between your HTTP framework's request and response model and the SDK's handler pattern.

An inbound request from Teams passes through the adapter, into the HTTP server for authentication and parsing, and then into your handlers. The response travels back along the same path.

::: zone pivot="teams-sdk-csharp"

The SDK is hosted by ASP.NET Core, so you already own the `WebApplication` and its lifecycle. Register the agent with dependency injection, map its endpoints onto your own `WebApplication`, and run the app yourself.

::: zone-end

::: zone pivot="teams-sdk-typescript"

The SDK uses [Express](https://expressjs.com/) as its built-in HTTP framework. The adapter interface is small:

```typescript
interface IHttpServerAdapter {
  registerRoute(method: HttpMethod, path: string, handler: HttpRouteHandler): void;
  serveStatic?(path: string, directory: string): void;
  start?(port: number): Promise<void>;
  stop?(): Promise<void>;
}

type HttpRouteHandler = (request: { body: unknown; headers: Record<string, string | string[]> })
  => Promise<{ status: number; body?: unknown }>;
```

::: zone-end

::: zone pivot="teams-sdk-python"

The SDK uses [FastAPI](https://fastapi.tiangolo.com/) as its built-in HTTP framework. The adapter interface is small:

```python
class HttpServerAdapter(Protocol):
    def register_route(self, method: HttpMethod, path: str, handler: HttpRouteHandler) -> None: ...
    def serve_static(self, path: str, directory: str) -> None: ...
    async def start(self, port: int) -> None: ...
    async def stop(self) -> None: ...

class HttpRouteHandler(Protocol):
    async def __call__(self, request: HttpRequest) -> HttpResponse: ...
```

::: zone-end

For a TypeScript or Python custom adapter, only route registration is required:

* **Register route** is required. The SDK registers routes dynamically, such as `/api/messages` and `/api/functions/{name}`.
* **Serve static** is optional. It's needed only if you serve tabs or static pages.
* **Start** and **stop** are optional. Omit them when you manage the server lifecycle yourself.

### Add Teams to an existing server

To add Teams to a server you already own:

1. Create your server with your own routes and middleware.
1. Wrap it in an adapter.
1. In TypeScript or Python, call the app's `initialize()` method to register Teams routes. In C#, register Teams on your ASP.NET Core app with `UseTeamsBotApplication()`.
1. Start the server yourself.

::: zone pivot="teams-sdk-csharp"

```csharp
using Microsoft.Teams.Apps;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

// 1. Register the agent alongside your own services.
builder.Services.AddTeamsBotApplication();

WebApplication webApp = builder.Build();

// 2. Map the Teams endpoints onto your own WebApplication.
TeamsBotApplication teams = webApp.UseTeamsBotApplication();

teams.OnMessage(async (context, cancellationToken) =>
{
  await context.SendAsync($"Echo: {context.Activity.Text}", cancellationToken);
});

// 3. Add your own routes and middleware.
webApp.MapGet("/health", () => Results.Json(new { status = "healthy" }));

// 4. Run the server yourself.
webApp.Run();
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript
import express from 'express';
import http from 'http';
import { App, ExpressAdapter } from '@microsoft/teams.apps';

// 1. Create your Express app with your own routes.
const expressApp = express();
const httpServer = http.createServer(expressApp);

expressApp.get('/health', (_req, res) => {
  res.json({ status: 'healthy' });
});

// 2. Wrap it in the ExpressAdapter.
const adapter = new ExpressAdapter(httpServer);

// 3. Create the Teams app with the adapter.
const app = new App({ httpServerAdapter: adapter });

app.on('message', async ({ send, activity }) => {
  await send(`Echo: ${activity.text}`);
});

// 4. Initialize. This registers /api/messages on your Express app, but doesn't start a server.
await app.initialize();

// 5. Start the server yourself.
httpServer.listen(3978, () => console.log('Server ready on http://localhost:3978'));
```

> [!NOTE]
> `app.initialize()` runs each plugin's `onInit` hook, but not its `onStart` hook. `onStart` fires only from `app.start()`. If you use a plugin that does its setup in `onStart`, either call `app.start()` and let it manage the server, or invoke that plugin's `onStart` yourself after `app.initialize()`:
>
> ```typescript
> await app.initialize();
> await myPlugin.onStart({ port: 3978 });
> ```

::: zone-end

::: zone pivot="teams-sdk-python"

```python
import asyncio

import uvicorn
from fastapi import FastAPI
from microsoft_teams.apps import App, FastAPIAdapter

# 1. Create your FastAPI app with your own routes.
my_fastapi = FastAPI(title="My App + Teams agent")

@my_fastapi.get("/health")
async def health():
    return {"status": "healthy"}

# 2. Wrap it in the FastAPIAdapter.
adapter = FastAPIAdapter(app=my_fastapi)

# 3. Create the Teams app with the adapter.
app = App(http_server_adapter=adapter)

@app.on_message
async def handle_message(ctx):
    await ctx.send(f"Echo: {ctx.activity.text}")

async def main():
    # 4. Initialize. This registers /api/messages on your FastAPI app, but doesn't start a server.
    await app.initialize()

    # 5. Start the server yourself.
    config = uvicorn.Config(app=my_fastapi, host="0.0.0.0", port=3978)
    server = uvicorn.Server(config)
    await server.serve()

asyncio.run(main())
```

::: zone-end

### Use a different framework

::: zone pivot="teams-sdk-csharp"

The C# SDK is hosted by ASP.NET Core and doesn't provide a pluggable HTTP framework adapter. To host the agent in a different stack, place an ASP.NET Core app in front of it, or forward requests to the `/api/messages` endpoint that `UseTeamsBotApplication()` registers.

::: zone-end

::: zone pivot="teams-sdk-typescript"

To use a framework other than the built-in default, implement the adapter interface for that framework. Most of the work is in route registration: translate the incoming request into a body and headers pair, call the handler, and write the response back.

Because you manage the server lifecycle yourself, you don't need the start and stop methods. Implement the serve static method only if you serve tabs or static pages.

The following Restify adapter implements only route registration:

```typescript
import assert from 'node:assert/strict';
import restify from 'restify';
import { HttpMethod, IHttpServerAdapter, HttpRouteHandler } from '@microsoft/teams.apps';

class RestifyAdapter implements IHttpServerAdapter {
  constructor(private server: restify.Server) {
    this.server.use(restify.plugins.bodyParser());
  }

  registerRoute(method: HttpMethod, path: string, handler: HttpRouteHandler): void {
    // Teams sends only POST requests to your agent endpoint.
    assert(method === 'POST', `Unsupported method: ${method}`);
    this.server.post(path, async (req: restify.Request, res: restify.Response) => {
      const response = await handler({
        body: req.body,
        headers: req.headers as Record<string, string | string[]>,
      });
      res.send(response.status, response.body);
    });
  }
}
```

To use it:

```typescript
const server = restify.createServer();
const adapter = new RestifyAdapter(server);
const app = new App({ httpServerAdapter: adapter });
await app.initialize();
server.listen(3978);
```

::: zone-end

::: zone pivot="teams-sdk-python"

To use a framework other than the built-in default, implement the adapter protocol for that framework. Most of the work is in `register_route`: translate the incoming request into an `HttpRequest`, call the handler, and write the `HttpResponse` back.

Because you manage the server lifecycle yourself, you don't need `start` and `stop`. Implement `serve_static` only if you serve tabs or static pages.

The following Starlette adapter implements only `register_route`:

```python
from starlette.applications import Starlette
from starlette.requests import Request
from starlette.responses import JSONResponse, Response
from starlette.routing import Route
from microsoft_teams.apps.http.adapter import HttpMethod, HttpRequest, HttpResponse, HttpRouteHandler

class StarletteAdapter:
    def __init__(self, app: Starlette):
        self._app = app

    def register_route(self, method: HttpMethod, path: str, handler: HttpRouteHandler) -> None:
        # Teams sends only POST requests to your agent endpoint.
        async def starlette_handler(request: Request) -> Response:
            body = await request.json()
            headers = dict(request.headers)
            result: HttpResponse = await handler(HttpRequest(body=body, headers=headers))
            if result.get("body") is not None:
                return JSONResponse(content=result["body"], status_code=result["status"])
            return Response(status_code=result["status"])

        route = Route(path, starlette_handler, methods=[method])
        self._app.routes.insert(0, route)
```

To use it:

```python
starlette_app = Starlette()
adapter = StarletteAdapter(starlette_app)
app = App(http_server_adapter=adapter)
await app.initialize()
# Start Starlette with uvicorn yourself.
```

::: zone-end

> [!IMPORTANT]
> The SDK authenticates requests to the routes it registers. Any route you add yourself is unauthenticated unless you add authentication to it. For more information, see [Agent trust model](agent-trust-model.md).

## See also

* [Agent trust model](agent-trust-model.md)
* [Observe agent activity with middleware and logging](agent-observability.md)
* [Build tabs for Teams](../tabs/what-are-tabs.md)
* [Getting started with tab apps in Teams SDK](../tabs/teams-sdk/getting-started.md)
