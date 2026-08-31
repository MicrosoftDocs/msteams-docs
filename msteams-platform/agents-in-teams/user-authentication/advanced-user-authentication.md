---
title: Advanced User Authentication
description: API guide to implement User Authentication with SSO in Teams Apps.
ms.topic: how-to
zone_pivot_groups: dev-lang
ms.date: 07/27/2026
---

# Advanced User Authentication

At times agents must access secured online resources on behalf of the user, such as checking email, checking on flight status, or placing an order. To enable this, the user must authenticate their identity and grant consent for the application to access these resources. This process results in the application receiving a token, which the application can then use to access the permitted resources on the user's behalf.

:::info
This is an advanced guide. It is highly recommended that you are familiar with [Teams Core Concepts](../teams/core-concepts.md) before attempting this guide.
:::

> [!WARNING]
>
> User authentication does not work with the developer tools setup. You have to run the app in Teams. Follow [Quickstart: Register your app](../get-started/quickstart-register.md) to register and sideload your bot.

:::info
It is possible to authenticate the user into [other auth providers](/azure/bot-service/bot-builder-concept-identity-providers/#other-identity-providers) like Facebook, Github, Google, Dropbox, and so on.
:::

Once you have configured your Azure Bot resource OAuth settings, as described in the [official documentation](/azure/bot-service/bot-builder-concept-authentication/), add the following code to your `App`:

## Project Setup

### Create an app with the `graph` template

> [!TIP]
>
> Skip this step if you want to add the auth configurations to an existing app.

::: zone pivot="csharp"
The Teams Developer CLI doesn't ship a `graph` template for C# yet (tracked in [microsoft/teams-sdk#2736](https://github.com/microsoft/teams-sdk/issues/2736)). Scaffold the `echo` template and add the OAuth wiring shown below by hand:

```text
s

teams project new csharp oauth-app

```

::: zone-end
::: zone pivot="python"
Use your terminal to run the following command:

```text
s

teams project new python oauth-app --template graph

```

This command:

1. Creates a new directory called `oauth-app`.
2. Bootstraps the graph agent template files into it under `oauth-app/src`.
::: zone-end

::: zone pivot="typescript"
Use your terminal to run the following command:

```text
s

teams project new typescript oauth-app --template graph

```

This command:

1. Creates a new directory called `oauth-app`.
2. Bootstraps the graph agent template files into it under `oauth-app/src`.
::: zone-end

### Set up the OAuth connection

User authentication requires an **Azure-managed bot** (Teams-managed bots don't support OAuth connections). If you registered with `--teams-managed`, migrate first:

```text
s

teams app bot migrate <appId> --subscription <id> --resource-group <your-resource-group>

```

Then follow the [User Authentication Setup guide](../teams/user-authentication/sso-setup.md) to configure the AAD app, create the Azure Bot OAuth connection, and update the manifest. The guide covers both SSO (silent token exchange) and generic OAuth.

> [!TIP]
>
> If you'd rather have an AI coding assistant run the setup, install the [`teams-dev` skill](../developer-tools/agent-skills.md) and ask it to "set up SSO for my Teams bot".

## Configure the OAuth connection

::: zone pivot="csharp"

```csharp

var builder = WebApplication.CreateBuilder(args);

var appBuilder = App.Builder()
    .AddOAuth("graph");

builder.AddTeams(appBuilder);
var app = builder.Build();
var teams = app.UseTeams();

```

::: zone-end
::: zone pivot="python"

```python

from teams import App
from teams.api import MessageActivity, SignInEvent
from teams.apps import ActivityContext
from teams.logger import ConsoleLogger, ConsoleLoggerOptions

app = App(
    # The name of the auth connection to use.
    # It should be the same as the Oauth connection name defined in the Azure Bot configuration.
    default_connection_name="graph",
    logger=ConsoleLogger().create_logger("auth", options=ConsoleLoggerOptions(level="debug")))

```

::: zone-end
::: zone pivot="typescript"

```ts

import { App } from '@microsoft/teams.apps';
import * as endpoints from '@microsoft/teams.graph-endpoints';

const app = new App({
  oauth: {
    defaultConnectionName: 'graph',
  },
});

```

::: zone-end
> [!TIP]
>
> Make sure you use the same name you used when creating the OAuth connection in the Azure Bot Service resource.

> [!NOTE]
>
> In many templates, `graph` is the default name of the OAuth connection, but you can change that by supplying a different connection name in your app configuration.

## Signing In

> [!NOTE]
>
> This uses the Single Sign-On (SSO) authentication flow. To learn more about all the available flows and their differences see the [official documentation](/azure/bot-service/bot-builder-concept-authentication/).

You must call the `signin` method inside your route handler, for example: to signin when receiving the `/signin` message:

::: zone pivot="csharp"

```csharp

teams.OnMessage("/signin", async (context, cancellationToken) =>
{
    if (context.IsSignedIn)
    {
        await context.Send("you are already signed in!", cancellationToken);
        return;
    }
    else
    {
        await context.SignIn(cancellationToken);
    }
});

```

::: zone-end
::: zone pivot="python"

```python

@app.on_message
async def handle_signin_message(ctx: ActivityContext[MessageActivity]):
    """Handle message activities for signing in."""
    ctx.logger.info("User requested sign-in.")
    if ctx.is_signed_in:
        await ctx.send("You are already signed in.")
    else:
        await ctx.sign_in()

```

::: zone-end
::: zone pivot="typescript"

```ts

app.message('/signin', async ({ signin, send }) => {
  if (await signin()) {
    await send('you are already signed in!');
  }
});

```

::: zone-end

## Subscribe to the SignIn event

You can subscribe to the `signin` event, that will be triggered once the OAuth flow completes.

::: zone pivot="csharp"

```csharp

teams.OnSignIn(async (_, teamsEvent, cancellationToken) =>
{
    var context = teamsEvent.Context;
    await context.Send($"Signed in using OAuth connection {context.ConnectionName}. Please type **/whoami** to see your profile or **/signout** to sign out.", cancellationToken);
});

```

::: zone-end
::: zone pivot="python"

```python

@app.event("sign_in")
async def handle_sign_in(event: SignInEvent):
    """Handle sign-in events."""
    await event.activity_ctx.send("You are now signed in!")

```

::: zone-end
::: zone pivot="typescript"

```ts

app.event('signin', async ({ send, token }) => {
  await send(
    `Signed in using OAuth connection ${token.connectionName}. Please type **/whoami** to see your profile or **/signout** to sign out.`
  );
});

```

::: zone-end

## Start using the graph client

From this point, you can use the `IsSignedIn` flag and the `userGraph` client to query graph, for example to reply to the `/whoami` message, or in any other route.

> [!NOTE]
>
> The default OAuth configuration requests the `User.ReadBasic.All` permission. It is possible to request other permissions by modifying the App Registration for the bot on Azure.

::: zone pivot="csharp"

```csharp

teams.OnMessage("/whoami", async (context, cancellationToken) =>
{
    if (!context.IsSignedIn)
    {
        await context.Send("you are not signed in!. Please type **/signin** to sign in", cancellationToken);
        return;
    }
    var me = await context.GetUserGraphClient().Me.GetAsync();
    await context.Send($"user \"{me!.DisplayName}\" signed in.", cancellationToken);
});

teams.OnMessage(async (context, cancellationToken) =>
{
    if (context.IsSignedIn)
    {
        await context.Send($"You said : {context.Activity.Text}.  Please type **/whoami** to see your profile or **/signout** to sign out.", cancellationToken);
    }
    else
    {
        await context.Send($"You said : {context.Activity.Text}.  Please type **/signin** to sign in.", cancellationToken);
    }
});

```

::: zone-end
::: zone pivot="python"

```python

@app.on_message
async def handle_whoami_message(ctx: ActivityContext[MessageActivity]):
    """Handle messages to show user information from Microsoft Graph."""
    if not ctx.is_signed_in:
        await ctx.send("You are not signed in! Please sign in to continue.")
        return

    # Access user's Microsoft Graph data
    me = await ctx.user_graph.me.get()
    await ctx.send(f"Hello {me.display_name}! Your email is {me.mail or me.user_principal_name}")

@app.on_message
async def handle_all_messages(ctx: ActivityContext[MessageActivity]):
    """Handle all other messages."""
    if ctx.is_signed_in:
        await ctx.send(f'You said: "{ctx.activity.text}". Please type **/whoami** to see your profile or **/signout** to sign out.')
    else:
        await ctx.send(f'You said: "{ctx.activity.text}". Please type **/signin** to sign in.')

```

::: zone-end
::: zone pivot="typescript"

```ts

import * as endpoints from '@microsoft/teams.graph-endpoints';

app.message('/whoami', async ({ send, userGraph, signin }) => {
  if (!await signin()) {
    return;
  }
  const me = await userGraph.call(endpoints.me.get);
  await send(
    `you are signed in as "${me.displayName}" and your email is "${me.mail || me.userPrincipalName}"`
  );
});

app.on('message', async ({ send, activity, signin }) => {
  if (await signin()) {
    await send(
      `You said: "${activity.text}". Please type **/whoami** to see your profile or **/signout** to sign out.`
    );
  } else {
    await send(`You said: "${activity.text}". Please type **/signin** to sign in.`);
  }
});

```

::: zone-end

## Signing Out

You can signout by calling the `signout` method, this will remove the token from the User Token service cache

::: zone pivot="csharp"

```csharp

teams.OnMessage("/signout", async (context, cancellationToken) =>
{
    if (!context.IsSignedIn)
    {
        await context.Send("you are not signed in!", cancellationToken);
        return;
    }

    await context.SignOut(cancellationToken);
    await context.Send("you have been signed out!", cancellationToken);
});

```

::: zone-end
::: zone pivot="python"

```python

@app.on_message
async def handle_signout_message(ctx: ActivityContext[MessageActivity]):
    """Handle sign out requests."""
    if not ctx.is_signed_in:
        await ctx.send("You are not signed in!")
        return

    await ctx.sign_out()
    await ctx.send("You have been signed out!")

```

::: zone-end
::: zone pivot="typescript"

```ts

app.message('/signout', async ({ send, signout, isSignedIn }) => {
  if (!isSignedIn) return;
  await signout();
  await send('you have been signed out!');
});

```

::: zone-end

## Resuming Pending Messages After Sign-In

When a user isn't signed in and your message handler calls the sign-in method, an OAuth card is sent and the current turn ends. The sign-in completes on a *separate turn* a meaning the original message text is not available in the sign-in success context.

To avoid ignoring what the user originally asked, store the pending message before initiating sign-in, then retrieve and process it once sign-in succeeds:

::: zone pivot="csharp"
> [!NOTE]
>
> The C# OAuth APIs shown below (`OAuthFlow`, `SignInAsync`, `OnSignInComplete`) are available in the [`Microsoft.Teams.Apps`](https://www.nuget.org/packages/Microsoft.Teams.Apps) core package (2.1+ preview).

```csharp

using System.Collections.Concurrent;

var pendingMessages = new ConcurrentDictionary<string, (string Text, object Activity)>();

// Get the pre-registered OAuth flow
OAuthFlow auth = teams.GetOAuthFlow("graph");

teams.OnMessage(async (context, cancellationToken) =>
{
    // SignInAsync returns null if SSO was initiated (result arrives via OnSignInComplete)
    string? token = await auth.SignInAsync(context, cancellationToken);

    if (token is null)
    {
        // Sign-in initiated — store the original message
        var userId = context.Activity.From?.Id ?? string.Empty;
        pendingMessages[userId] = (context.Activity.Text ?? string.Empty, context.Activity);
        return;
    }

    // User is already signed in — process normally
    await ProcessMessage(context.Activity.Text, context, cancellationToken);
});

auth.OnSignInComplete(async (context, tokenResponse, cancellationToken) =>
{
    var userId = context.Activity.From?.Id ?? string.Empty;

    if (pendingMessages.TryRemove(userId, out var pending))
    {
        await context.SendActivityAsync("Successfully signed in! Processing your original request...", cancellationToken);
        await ProcessMessage(pending.Text, context, cancellationToken);
    }
    else
    {
        await context.SendActivityAsync("You are now signed in!", cancellationToken);
    }
});

```

::: zone-end
::: zone pivot="python"

```python

from microsoft_teams.apps import App, ActivityContext, SignInEvent
from microsoft_teams.apps.routing.activity_context import SignInOptions
from microsoft_teams.api import MessageActivity

app = App()

pending_messages: dict[str, dict] = {}

@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    # sign_in() returns the token if already signed in, or None if OAuth card was sent
    token = await ctx.sign_in(SignInOptions(
        oauth_card_text="To help with that, I need to sign you in first."
    ))

    if token is None:
        # OAuth card sent — store the original message for later
        pending_messages[ctx.activity.from_.id] = {
            "text": ctx.activity.text,
            "activity": ctx.activity,
        }
        return

    # User is already signed in — process normally
    await process_message(ctx.activity.text, ctx)

@app.event("sign_in")
async def handle_sign_in(event: SignInEvent):
    user_id = event.activity_ctx.activity.from_.id
    pending = pending_messages.pop(user_id, None)

    if pending:
        await event.activity_ctx.send("Successfully signed in! Processing your original request...")
        await process_message(pending["text"], event.activity_ctx)
    else:
        await event.activity_ctx.send("You are now signed in!")

```

::: zone-end
::: zone pivot="typescript"

```ts

const pendingMessages = new Map<string, { text: string; activity: any }>();

app.on('message', async ({ signin, activity, send }) => {
  // signin() returns the token if already signed in, or undefined if OAuth card was sent
  const token = await signin({
    oauthCardText: 'To help with that, I need to sign you in first.',
  });

  if (!token) {
    // OAuth card sent — store the original message for later
    pendingMessages.set(activity.from.id, {
      text: activity.text,
      activity,
    });
    return;
  }

  // User is already signed in — process normally
  await processMessage(activity.text, { send });
});

app.event('signin', async ({ send, userGraph, activity }) => {
  const userId = activity.from.id;
  const pending = pendingMessages.get(userId);

  if (pending) {
    pendingMessages.delete(userId);
    await send('Successfully signed in! Processing your original request...');
    await processMessage(pending.text, { send, userGraph });
  } else {
    await send('You are now signed in!');
  }
});

```

::: zone-end
> [!TIP]
>
> For production apps, consider using a persistent store (database, Redis, etc.) instead of an in-memory map so pending messages survive restarts. You should also implement expiration or cleanup logic (e.g., a TTL) to discard stale entries when sign-in is cancelled, times out, or fails.

## Handling Sign-In Failures

When using SSO, if the token exchange fails Teams sends a `signin/failure` invoke activity to your app. The SDK includes a built-in default handler that logs a warning with actionable troubleshooting guidance. You can optionally register your own handler to customize the behavior:

::: zone pivot="csharp"

```csharp

teams.OnSignInFailure(async (context, cancellationToken) =>
{
    var failure = context.Activity.Value;
    Console.WriteLine($"Sign-in failed: {failure?.Code} - {failure?.Message}");
    await context.Send("Sign-in failed.", cancellationToken);
});

```

::: zone-end
::: zone pivot="python"

```python

@app.on_signin_failure()
async def handle_signin_failure(ctx):
    failure = ctx.activity.value
    print(f"Sign-in failed: {failure.code} - {failure.message}")
    await ctx.send("Sign-in failed.")

```

> [!NOTE]
>
> In Python, registering a custom handler does **not** replace the built-in default handler. Both will run as part of the middleware chain.
::: zone-end

::: zone pivot="typescript"

```ts

app.on('signin.failure', async ({ activity, send }) => {
  const { code, message } = activity.value;
  console.log(`Sign-in failed: ${code} - ${message}`);
  await send('Sign-in failed.');
});

```

::: zone-end
> [!TIP]
>
> The most common failure codes are `installedappnotfound` (bot app not installed for the user) and `resourcematchfailed` (Token Exchange URL doesn't match the Application ID URI). See [SSO Setup - Troubleshooting](../teams/user-authentication/sso-setup.md#troubleshooting) for a full list of failure codes and troubleshooting steps.

::: zone pivot="csharp"
<!-- Not applicable -->
::: zone-end

::: zone pivot="python"

## Regional Configs

You may be building a regional bot that is deployed in a specific Azure region (such as West Europe, East US, etc.) rather than global. This is important for organizations that have data residency requirements or want to reduce latency by keeping data and authentication flows within a specific area.

These examples use West Europe, but follow the equivalent for other regions.

To configure a new regional bot in Azure, you must setup your resoures in the desired region. Your resource group must also be in the same region.

1. Deploy a new App Registration in `westeurope`.
2. Deploy and link a new Enterprise Application (Service Principal) on Microsoft Entra in `westeurope`.
3. Deploy and link a new Azure Bot in `westeurope`.
4. In your App Registration, in the `Authentication (Preview)` tab, add a `Redirect URI` for the Platform Type `Web` to your regional endpoint (e.g., `https://europe.token.botframework.com/.auth/web/redirect`)

:::image type="content" source="~/assets/screenshots/regional-auth.png" alt-text="Authentication Tab" lightbox="~/assets/screenshots/regional-auth.png" :::

1. In your `.env` file (or wherever you set your environment variables), add your `OAUTH_URL`. For example:
`OAUTH_URL=https://europe.token.botframework.com`

---

To configure a new regional bot with ATK, you will need to make a few updates. Note that this assumes you have not yet deployed the bot previously.

1. In `azurebot.bicep`, replace all `global` occurrences to `westeurope`
2. In `manifest.json`, in `validDomains`, `*.botframework.com` should be replaced by `europe.token.botframework.com`
3. In `aad.manifest.json`, replace `https://token.botframework.com/.auth/web/redirect` with `https://europe.token.botframework.com/.auth/web/redirect`
4. In your `.env` file, add your `OAUTH_URL`. For example:
`OAUTH_URL=https://europe.token.botframework.com`.
::: zone-end

::: zone pivot="typescript"

## Regional Configs (JavaScript)

You may be building a regional bot that is deployed in a specific Azure region (such as West Europe, East US, etc.) rather than global. This is important for organizations that have data residency requirements or want to reduce latency by keeping data and authentication flows within a specific area.

These examples use West Europe, but follow the equivalent for other regions.

To configure a new regional bot in Azure, you must setup your resoures in the desired region. Your resource group must also be in the same region.

1. Deploy a new App Registration in `westeurope`.
2. Deploy and link a new Enterprise Application (Service Principal) on Microsoft Entra in `westeurope`.
3. Deploy and link a new Azure Bot in `westeurope`.
4. In your App Registration, in the `Authentication (Preview)` tab, add a `Redirect URI` for the Platform Type `Web` to your regional endpoint (e.g., `https://europe.token.botframework.com/.auth/web/redirect`)

:::image type="content" source="~/assets/screenshots/regional-auth.png" alt-text="Authentication Tab" lightbox="~/assets/screenshots/regional-auth.png" :::

1. In your `.env` file (or wherever you set your environment variables), add your `OAUTH_URL`. For example:
`OAUTH_URL=https://europe.token.botframework.com`

---

To configure a new regional bot with ATK, you will need to make a few updates. Note that this assumes you have not yet deployed the bot previously.

1. In `azurebot.bicep`, replace all `global` occurrences to `westeurope`
2. In `manifest.json`, in `validDomains`, `*.botframework.com` should be replaced by `europe.token.botframework.com`
3. In `aad.manifest.json`, replace `https://token.botframework.com/.auth/web/redirect` with `https://europe.token.botframework.com/.auth/web/redirect`
4. In your `.env` file, add your `OAUTH_URL`. For example:
`OAUTH_URL=https://europe.token.botframework.com`
::: zone-end

## Resources

[User Authentication Basics](/azure/bot-service/bot-builder-concept-authentication/)
