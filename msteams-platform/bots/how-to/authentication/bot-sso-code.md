---
title: Update App Manifest to Enable SSO
description: Learn how to add code configuration, handle an access token, receive token, and handle app user sign out for enabling SSO in Teams bots.
ms.topic: how-to
ms.localizationpriority: high
zone_pivot_groups: enable-sso
ms.date: 05/26/2026
---
# Add code to enable SSO in your bot app

Before you add code to enable single sign-on (SSO), ensure to configure your app and bot resource in Microsoft Entra admin center.

> [!div class="nextstepaction"]
> [Configure bot app in Microsoft Entra ID](bot-sso-register-aad.md)

You need to configure your app's code to obtain an access token from Microsoft Entra ID. The access token is issued on behalf of the bot app.

> [!NOTE]
> If you've built your Teams app using Microsoft Teams Toolkit, you can enable SSO for your app using the instructions in the Tools and SDKs module. For more information, see [add single sign-on to Teams app](../../../toolkit/add-single-sign-on.md). Teams Toolkit supports SSO for JavaScript, TypeScript, and C# apps in Visual Studio Code.

::: zone pivot="bot-app"

This section covers:

1. [Update development environment variables](#update-development-environment-variables)
1. [Initialize the app with OAuth](#initialize-the-app-with-oauth)
1. [Handle sign-in and token receipt](#handle-sign-in-and-token-receipt)
1. [Handle sign-in failures](#handle-sign-in-failures)
1. [Handle app user sign out](#handle-app-user-sign-out)

## Update development environment variables

You've configured client secret and OAuth connection setting for the app in Microsoft Entra ID. You must configure the code with these values.

To update the development environment variables:

1. Open the bot app project.
1. Open the environment file (`.env`) for your project.
1. Update the following variables:

    - For `CLIENT_ID`, update the bot ID from Microsoft Entra ID.
    - For `CLIENT_SECRET`, update the client secret.
    - For `CONNECTION_NAME`, update the name of the OAuth connection you configured in Microsoft Entra ID.
    - For `TENANT_ID`, update the tenant ID.

    > [!NOTE]
    > You can customize the OAuth redirect URL for your bot and identity provider based on your data residency requirements, irrespective of whether your bot is in the public cloud, Microsoft Azure Government cloud, or Microsoft Azure operated by 21Vianet. For OAuth URLs and data residency list, see [OAuth URL support in Azure AI Bot Service](/azure/bot-service/ref-oauth-redirect-urls?view=azure-bot-service-4.0&preserve-view=true).

1. Save the file.

You've now configured the required environment variables for your bot app and SSO. Next, initialize the app with OAuth.

## Initialize the app with OAuth

The Teams SDK simplifies app initialization with a single `App` class that handles server lifecycle, authentication, and token exchange internally.

# [C#](#tab/cs1)

```csharp
using Microsoft.Teams.Apps.Extensions;
using Microsoft.Teams.Plugins.AspNetCore.Extensions;

var builder = WebApplication.CreateBuilder(args);

var connectionName = builder.Configuration["CONNECTION_NAME"]
    ?? throw new InvalidOperationException("Missing required configuration value: CONNECTION_NAME");

var appBuilder = App.Builder()
    .AddOAuth(connectionName);

builder.AddTeams(appBuilder);
var app = builder.Build();
var teams = app.UseTeams();
```

# [TypeScript](#tab/ts1)

```typescript
import { App } from '@microsoft/teams.apps';

const connectionName = process.env.CONNECTION_NAME ?? 'graph';

const app = new App({
  oauth: {
    defaultConnectionName: connectionName,
  },
});
```

# [Python](#tab/py1)

```python
import os
from microsoft_teams.apps import App

app = App(default_connection_name=os.getenv("CONNECTION_NAME", "graph"))
```

---

> [!NOTE]
> The `App` class handles all adapter configuration, middleware, error handling, and server setup internally.

## Consent dialog for getting access token

The user needs to consent to the permissions requested by the bot app to get the access token. The consent dialog appears based on the scope of the app.

### One-on-one chats

When the app user is using the application for the first time and user consent is required, the following dialog box appears:

:::image type="content" source="../../../assets/images/authentication/teams-sso-bots/bot-consent-in-personal-scope.png" alt-text="The infographic shows the interaction of a bot with an user in personal scope" border="false":::

When the user selects **Continue**, one of the following events occurs:

- If the bot UI has a sign-in button, the sign-in flow for bots is activated. You can determine the permissions that require app user's consent. Use this approach if your app requires Graph permissions other than `openid`.

- If the bot doesn't have a sign-in button on the OAuth card, app user consent is required for a minimal set of permissions. This token is useful for basic authentication and to get the app user's email address.

The consent dialog that appears is for open-id scopes defined in Microsoft Entra ID. The app user must give consent only once. After consenting, the app user can access and use your bot app for the granted permissions and scopes.

### Group chats

Here are the two scenarios for authentication in group scope:

- [Microsoft Entra ID consent is required](#microsoft-entra-id-consent-is-required)
- [Microsoft Entra ID consent is not required](#microsoft-entra-id-consent-is-not-required)

#### Microsoft Entra ID consent is required

When a bot is added to a group chat for the first time and consent is required for a particular user, a consent dialog box appears only to the user who @mentions the bot. The user must give one-time consent to the permissions requested by the bot app to get the access token.

# [Desktop](#tab/desktop)

The user @mentions the bot. An Adaptive Card appears to request the user's consent.

:::image type="content" source="../../../assets/images/authentication/teams-sso-bots/user-mentions-bot-desktop.png" alt-text="The image shows a consent dialog box for desktop" border="false":::

- If the user selects **Add**, a permissions dialog box appears.

  :::image type="content" source="../../../assets/images/authentication/teams-sso-bots/permissions-requested-desktop-small.png" alt-text="The image shows permissions requested pop-up on desktop" lightbox="../../../assets/images/authentication/teams-sso-bots/permissions-requested-desktop.png" border="false":::

  The user must select **Accept** to give consent.

- If the user declines, or the request times out, the user must @mention the bot again to grant permission for token acquisition. The group is able to see a bot message that the authentication wasn't successful.

  :::image type="content" source="../../../assets/images/authentication/teams-sso-bots/request-times-out-desktop.png" alt-text="The image shows the bot interaction when user consent is denied or request times out" lightbox="../../../assets/images/authentication/teams-sso-bots/request-times-out-desktop.png" border="false":::
  
# [Mobile](#tab/mobile)

The user @mentions the bot. An Adaptive Card appears to request the user's consent.

:::image type="content" source="../../../assets/images/authentication/teams-sso-bots/user-mentions-bot-small.png" alt-text="The image shows the bot interaction when user @mentions bot on mobile" lightbox="../../../assets/images/authentication/teams-sso-bots/user-mentions-bot-mobile.png" border="false":::

- If the user selects **Add**, a permissions dialog box appears.
  
  :::image type="content" source="../../../assets/images/authentication/teams-sso-bots/permissions-requested-small.png" alt-text="The image shows the permissions requested pop-up on mobile" lightbox="../../../assets/images/authentication/teams-sso-bots/permissions-requested-mobile.png" border="false":::

  The user must select **Accept** to give consent.

- If the user declines, or the request times out, the user must @mention the bot again to grant permission for token acquisition. The group is able to see a bot message that the authentication wasn't succesful.

  :::image type="content" source="../../../assets/images/authentication/teams-sso-bots/request-times-out-small.png" alt-text="The image shows the bot interaction when user denies access or request times out" lightbox="../../../assets/images/authentication/teams-sso-bots/request-times-out-mobile.png" border="false":::

---

#### Microsoft Entra ID consent is not required

If the user permissions are granted by default or for trusted apps, the user who @mentions the bot can directly interact with the bot without needing to give consent.

> [!NOTE]
> After the app user consents, they're not required to consent again for any other permissions. If the permissions defined in Microsoft Entra scope are modified, then the app user might need to consent again. If, however, the consent prompt fails to let the app user access, the bot app falls back to sign-in card.

> [!IMPORTANT]
> Scenarios where consent dialogs aren't needed:
>
> - If the admin grants consent on behalf of the tenant, app users don't need to be prompted for consent at all. This means that the app users don't see the consent dialogs and can access the app seamlessly.
> - If your Microsoft Entra app is registered in the same tenant from which you're requesting an authentication in Teams, the app user can't be asked to consent, and is granted an access token right away. App users consent to these permissions only if the Microsoft Entra app is registered in a different tenant.

If you encounter any errors, see [Troubleshoot SSO authentication in Teams](../../../tabs/how-to/authentication/tab-sso-troubleshooting.md).

## Handle sign-in and token receipt

The Teams SDK uses simple event-driven handlers for authentication. Use `IsSignedIn` to check authentication status, `SignIn()` to trigger the SSO flow, and subscribe to the `signin` event to handle successful authentication.

# [C#](#tab/cs3)

```csharp
teams.OnMessage(async (context, cancellationToken) =>
{
    if (!context.IsSignedIn)
    {
        await context.SignIn(cancellationToken);
        return;
    }

    var token = context.UserToken;
    await context.Send($"You are signed in. Token length: {token?.Length}", cancellationToken);
});

teams.OnSignIn(async (_, teamsEvent, cancellationToken) =>
{
    var context = teamsEvent.Context;
    await context.Send("Successfully signed in! You can now use the bot.", cancellationToken);
});
```

# [TypeScript](#tab/ts3)

```typescript
app.on('message', async ({ isSignedIn, signin, userToken, send }) => {
  if (!isSignedIn) {
    await signin();
    return;
  }

  await send(`You are signed in. Token length: ${userToken?.length}`);
});

app.event('signin', async ({ send, token }) => {
  await send(`Successfully signed in! Token length: ${token.token.length}`);
});
```

# [Python](#tab/py3)

```python
from teams.api import MessageActivity, SignInEvent
from teams.apps import ActivityContext

@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    if not ctx.is_signed_in:
        await ctx.sign_in()
        return

    token = ctx.user_token
    await ctx.send(f"You are signed in. Token length: {len(token)}")

@app.event("sign_in")
async def handle_sign_in(event: SignInEvent):
    await event.activity_ctx.send("Successfully signed in! You can now use the bot.")
```

---

> [!NOTE]
> The SDK handles the token exchange and validation internally. You no longer need to manually manage `OAuthPrompt`, `WaterfallDialog`, or `MainDialog` classes.

## Handle sign-in failures

When using SSO, if the token exchange fails, Teams sends a `signin/failure` invoke activity to your app. The SDK includes a built-in default handler that logs a warning with actionable troubleshooting guidance. You can optionally register your own handler to customize the behavior:

# [C#](#tab/cs5)

```csharp
teams.OnSignInFailure(async (context, cancellationToken) =>
{
    var failure = context.Activity.Value;
    Console.WriteLine($"Sign-in failed: {failure?.Code} - {failure?.Message}");
    await context.Send("Sign-in failed. Please try again.", cancellationToken);
});
```

# [TypeScript](#tab/ts5)

```typescript
app.on('signin.failure', async ({ activity, send }) => {
  const { code, message } = activity.value;
  console.log(`Sign-in failed: ${code} - ${message}`);
  await send('Sign-in failed. Please try again.');
});
```

# [Python](#tab/py5)

```python
@app.on_signin_failure()
async def handle_signin_failure(ctx):
    failure = ctx.activity.value
    print(f"Sign-in failed: {failure.code} - {failure.message}")
    await ctx.send("Sign-in failed. Please try again.")
```

---

## Handle app user sign out

Call the `signout` method to remove the user's authentication token from the User Token service cache, effectively signing them out. The Teams SDK replaces the previous pattern of using `DialogContext`, `UserTokenClient`, and `CancelAllDialogsAsync` with a simple method call.

# [C#](#tab/cs4)

```csharp
teams.OnMessage("/signout", async (context, cancellationToken) =>
{
    if (!context.IsSignedIn)
    {
        await context.Send("You are not signed in.", cancellationToken);
        return;
    }

    await context.SignOut(cancellationToken);
    await context.Send("You have been signed out.", cancellationToken);
});
```

# [TypeScript](#tab/ts4)

```typescript
app.message('/signout', async ({ signout, send, isSignedIn }) => {
  if (!isSignedIn) return;
  await signout();
  await send('You have been signed out.');
});
```

# [Python](#tab/py4)

```python
@app.on_message
async def handle_signout(ctx: ActivityContext[MessageActivity]):
    if "/signout" in ctx.activity.text.lower():
        if not ctx.is_signed_in:
            await ctx.send("You are not signed in.")
            return

        await ctx.sign_out()
        await ctx.send("You have been signed out.")
```

---

## Code sample

| **Sample name** | **Description** | **C#** | **Node.js** |
| --- | --- | --- | --- |
| Bot conversation SSO quick start | Quickly set up Teams bot with SSO for seamless user authentication for one-on-one and group chats. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/Archived/bot-conversation-sso-quickstart/csharp_dotnetcore/BotConversationSsoQuickstart) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/Archived/bot-conversation-sso-quickstart/js)  |

::: zone-end

::: zone pivot="mex-app"

[!INCLUDE [msgex-sso-code](../../../includes/messaging-extensions/msgex-sso-code.md)]

::: zone-end

## Next step

> [!div class="nextstepaction"]
> [Update manifest for SSO and preview app](bot-sso-manifest.md)
