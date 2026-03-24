---
title: Update App Manifest to Enable SSO
description: Learn how to add code configuration, handle an access token, receive token, and handle app user sign out for enabling SSO in Teams bots.
ms.topic: how-to
ms.localizationpriority: high
zone_pivot_groups: enable-sso
ms.date: 03/20/2026
ms.owner: ryanbliss
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
1. [Configure OAuth and error handling](#configure-oauth-and-error-handling)
1. [Handle authentication and sign-in](#handle-authentication-and-sign-in)
1. [Handle sign out](#handle-sign-out)

## Update development environment variables

You've configured client secret and OAuth connection setting for the app in Microsoft Entra ID. You must configure the code with these values.

To update the development environment variables:

1. Open the bot app project.
1. Open the environment file for your project.
1. Update the following variables:

    - For `ClientId`, update the bot ID from Microsoft Entra ID.
    - For `ClientSecret`, update the client secret.
    - For `ConnectionName`, update the name of the OAuth connection you configured in Microsoft Entra ID.
    - For `TenantId`, update the tenant ID.

    > [!NOTE]
    > You can customize the OAuth redirect URL for your bot and identity provider based on your data residency requirements, irrespective of whether your bot is in the public cloud, Microsoft Azure Government cloud, or Microsoft Azure operated by 21Vianet. For OAuth URLs and data residency list, see [OAuth URL support in Azure AI Bot Service](/azure/bot-service/ref-oauth-redirect-urls?view=azure-bot-service-4.0&preserve-view=true).

1. Save the file.

You've now configured the required environment variables for your bot app and SSO. Next, add the code for handling bot tokens.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+development+environment+variables&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fbot-sso-code%3Ftabs%3Dcs1%252Ccs2%252Ccs3%252Ccs4%252Ccs5%26pivots%3Dbot-app%23update-development-environment-variables&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fbot-sso-code.md&documentVersionIndependentId=039ff5cc-7243-ce4b-527e-c152755eeb72&platformId=915789b2-9617-01bb-fb21-d6789a634ed8&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Configure OAuth and error handling

Teams SDK simplifies authentication setup with built-in OAuth support and error handling.

# [C#](#tab/cs1)

```csharp
var builder = WebApplication.CreateBuilder(args);
var connectionName = builder.Configuration["Teams:ConnectionName"];

// Configure Teams app with OAuth builder.AddTeams(App.Builder().AddOAuth(connectionName));

var app = builder.Build();
var teams = app.UseTeams();

var logger = app.Services.GetRequiredService()
    .CreateLogger("BotAuthQuickstart");

// Handle error events teams.OnError(async (_, @event) => { logger.LogError(@event.Exception, "Error occurred"); });

app.Run();
```

# [JavaScript](#tab/js1)

```JavaScript
import { App } from "@microsoft/teams.apps";
 
const app = new App({
  oauth: {
    defaultConnectionName: process.env.CONNECTION_NAME || 'graph'
  }
});
 
// Teams SDK handles errors automatically
// Optional: Add custom error logging in message handlers
app.on('message', async (context) =&gt; {
  try {
    // Your bot logic
  } catch (error) {
    context.logger?.error(`Error: ${error}`);
    await context.send("An error occurred.");
  }
});
```

# [Python](#tab/py1)

```Python
import os
import logging

from microsoft_teams.apps import App, AppOptions, ErrorEvent


logger = logging.getLogger(__name__)


# Configure Teams app with OAuth
app_options = AppOptions(
    default_connection_name=os.getenv("CONNECTION_NAME", "graph")
)
app = App(**app_options)


# Handle error events
@app.event("error")
async def handle_error_event(event: ErrorEvent):
    """Handle error events."""
    logger.error(f"Error occurred: {event.error}")

    if event.context:
        logger.error(f"Context: {event.context}")
---

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Add+code+to+handle+an+access+token&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fbot-sso-code%3Ftabs%3Dcs1%252Ccs2%252Ccs3%252Ccs4%252Ccs5%26pivots%3Dbot-app%23add-code-to-handle-an-access-token&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fbot-sso-code.md&documentVersionIndependentId=039ff5cc-7243-ce4b-527e-c152755eeb72&platformId=915789b2-9617-01bb-fb21-d6789a634ed8&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

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

## Handle authentication and sign-in

Teams SDK simplifies authentication with automatic token handling. No manual token management or dialogs are needed.

### Check authentication status and trigger sign-in

# [C#](#tab/cs2)

```csharp
// Helper function to handle authentication
async Task&lt;Microsoft.Graph.GraphServiceClient?&gt; GetAuthenticatedGraphClient(IContext context)
{
  if (!context.IsSignedIn)
  {
    await context.Send("🔐 Please sign in first to access Microsoft Graph.");
    await context.SignIn();
    return null;
  }

  try
  {
    return context.GetUserGraphClient();
  }
  catch (Exception ex)
  {
    logger.LogError(ex, "Failed to create Graph client");
    await context.Send("🔐 Failed to create authenticated client. Trying to sign in again.");
    await context.SignIn();
    return null;
  }
}

// Handle sign-in command
async Task HandleSignInCommand(IContext context)
{
  if (context.IsSignedIn)
  {
    await context.Send("✅ You are already signed in!");
  }
  else
  {
    await context.Send("🔐 Signing you in to access Microsoft Graph...");
    await context.SignIn();
  }
}

// Register command handler
teams.OnMessage("signin", async context =&gt; await HandleSignInCommand(context));
```

# [JavaScript](#tab/js2)

```JavaScript
// Helper function to handle authentication
async function getAuthenticatedGraphClient(context: any): Promise&lt;any | null&gt; {
  if (!context.isSignedIn) {
    await context.send("🔐 Please sign in first to access Microsoft Graph.");
    await context.signin();
    return null;
  }
 
  try {
    return context.userGraph;
  } catch (error: any) {
    context.logger?.error(`Failed to create Graph client: ${error}`);
    await context.send("🔐 Failed to create authenticated client. Trying to sign in again.");
    await context.signin();
    return null;
  }
}
 
// Handler for signin command
async function handleSignin(context: any): Promise&lt;void&gt; {
  if (context.isSignedIn) {
    await context.send("✅ You are already signed in!");
  } else {
    await context.send("🔐 Signing you in to access Microsoft Graph...");
    await context.signin();
  }
}
 
// Dispatch incoming messages
app.on('message', async (context) =&gt; {
  const text = context.activity.text?.toLowerCase().trim() || '';
  
  if (text === 'signin') {
    await handleSignin(context);
  }
});
```

# [Python](#tab/py2)

```Python
# Helper function to handle authentication
async def get_authenticated_graph_client(ctx: ActivityContext[MessageActivity]):
    """
    Helper function to handle authentication and create Graph client using Token pattern.
    """
    if not ctx.is_signed_in:
        await ctx.send("🔐 Please sign in first to access Microsoft Graph.")
        await ctx.sign_in()
        return None

    try:
        return get_graph_client(ctx.user_token)

    except Exception as e:
        ctx.logger.error(f"Failed to create Graph client: {e}")
        await ctx.send("🔐 Failed to create authenticated client. Trying to sign in again.")
        await ctx.sign_in()
        return None


# Handle sign-in command
async def handle_signin_command(ctx: ActivityContext[MessageActivity]):
    """Handle sign-in command."""
    if ctx.is_signed_in:
        await ctx.send("✅ You are already signed in!")
    else:
        await ctx.send("🔐 Signing you in to access Microsoft Graph...")
        await ctx.sign_in()


# Register command handler
@app.on_message_pattern("signin")
async def signin_handler(ctx: ActivityContext[MessageActivity]):
    await handle_signin_command(ctx)

---

### Handle successful sign-in events

# [C#](#tab/cs3)

```csharp
teams.OnSignIn(async (_, @event) =>
{
  var context = @event.Context;

  await context.Send(
    "✅ **Successfully signed in!**\n\n" +
    "You can now use these commands:\n\n" +
    "• profile - View your profile\n\n" +
    "• signout - Sign out when done"
  );
});
```

# [JavaScript](#tab/js3)

```JavaScript
app.event('signin', async (context) =&gt; {
  await context.send(
    "✅ **Successfully signed in!**\n\n" +
    "You can now use these commands:\n\n" +
    "• profile - View your profile\n\n" +
    "• signout - Sign out when done"
  );
});
```

# [Python](#tab/py3)

```Python
@app.event("sign_in")
async def handle_sign_in_event(event: SignInEvent):
    """Handle successful sign-in events."""
    await event.activity_ctx.send(
        "✅ **Successfully signed in!**\n\n"
        "You can now use these commands:\n\n"
        "• **profile** - View your profile\n\n"
        "• **signout** - Sign out when done"
    )
---

> [!NOTE]
> The code snippets use the Waterfall Dialog. For more information, see [About component and waterfall dialogs](/azure/bot-service/bot-builder-concept-waterfall-dialogs?view=azure-bot-service-4.0&preserve-view=true).

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Add+code+to+receive+the+token&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fbot-sso-code%3Ftabs%3Dcs1%252Ccs2%252Ccs3%252Ccs4%252Ccs5%26pivots%3Dbot-app%23add-code-to-receive-the-token&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fbot-sso-code.md&documentVersionIndependentId=039ff5cc-7243-ce4b-527e-c152755eeb72&platformId=915789b2-9617-01bb-fb21-d6789a634ed8&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Validate the access token

Web APIs on your server must decode the access token and verify if it's sent from the client.

> [!NOTE]
> If you use Teams SDK, it handles the access token validation. If you don't use Teams SDK, follow the guidelines given in this section.

For more information about validating access token, see [Validate tokens](/azure/active-directory/develop/access-tokens#validate-tokens).

There are many libraries available that can handle JWT validation. Basic validation includes:

- Checking that the token is well-formed.
- Checking that the token was issued by the intended authority.
- Checking that the token is targeted to the web API.
Keep in mind the following guidelines when validating the token:

- Valid SSO tokens are issued by Microsoft Entra ID. The `iss` claim in the token must start with this value.
- The token's `aud1` parameter is set to the app ID generated during Microsoft Entra app registration.
- The token's `scp` parameter is set to `access_as_user`.

### Example access token

The following code snippet is a typical decoded payload of an access token:

```javascript
{
    aud: "2c3caa80-93f9-425e-8b85-0745f50c0d24",
    iss: "https://login.microsoftonline.com/fec4f964-8bc9-4fac-b972-1c1da35adbcd/v2.0",
    iat: 1521143967,
    nbf: 1521143967,
    exp: 1521147867,
    aio: "ATQAy/8GAAAA0agfnU4DTJUlEqGLisMtBk5q6z+6DB+sgiRjB/Ni73q83y0B86yBHU/WFJnlMQJ8",
    azp: "e4590ed6-62b3-5102-beff-bad2292ab01c",
    azpacr: "0",
    e_exp: 262800,
    name: "Mila Nikolova",
    oid: "6467882c-fdfd-4354-a1ed-4e13f064be25",
    preferred_username: "milan@contoso.com",
    scp: "access_as_user",
    sub: "XkjgWjdmaZ-_xDmhgN1BMP2vL2YOfeVxfPT_o8GRWaw",
    tid: "fec4f964-8bc9-4fac-b972-1c1da35adbcd",
    uti: "MICAQyhrH02ov54bCtIDAA",
    ver: "2.0"
}
```

## Handle sign out

Teams SDK provides a simple sign-out method to clear the user's authentication session.

# [C#](#tab/cs4)

```csharp
async Task HandleSignOutCommand(IContext context)
{
  if (!context.IsSignedIn)
  {
    await context.Send("ℹ️ You are not currently signed in.");
  }
  else
  {
    await context.SignOut();
    await context.Send("👋 You have been signed out successfully!");
  }
}

// Register command handler
teams.OnMessage("signout", async context =&gt; await HandleSignOutCommand(context));
```

# [JavaScript](#tab/js4)

```JavaScript
async function handleSignout(context: any): Promise&lt;void&gt; {
  if (!context.isSignedIn) {
    await context.send("ℹ️ You are not currently signed in.");
  } else {
    await context.signout();
    await context.send("👋 You have been signed out successfully!");
  }
}
 
// Dispatch incoming messages
app.on('message', async (context) =&gt; {
  const text = context.activity.text?.toLowerCase().trim() || '';
  
  if (text === 'signout' || text === 'logout') {
    await handleSignout(context);
  }
});
```

# [Python](#tab/py4)

```Python
async def handle_signout_command(ctx: ActivityContext[MessageActivity]):
    """Handle sign-out command."""
    if not ctx.is_signed_in:
        await ctx.send("ℹ️ You are not currently signed in.")
    else:
        await ctx.sign_out()
        await ctx.send("👋 You have been signed out successfully!")


# Register command handler
@app.on_message_pattern("signout")
async def signout_handler(ctx: ActivityContext[MessageActivity]):
    await handle_signout_command(ctx)

---

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Handle+app+user+sign+out&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fbot-sso-code%3Ftabs%3Dcs1%252Ccs2%252Ccs3%252Ccs4%252Ccs5%26pivots%3Dmex-app%23handle-app-user-sign-out&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fbot-sso-code.md&documentVersionIndependentId=039ff5cc-7243-ce4b-527e-c152755eeb72&platformId=915789b2-9617-01bb-fb21-d6789a634ed8&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Code sample

| **Sample name** | **Description** | **C#** | **Node.js** |
| --- | --- | --- | --- |
| Bot Auth Quickstart | This sample demonstrates how to implement Single Sign-On (SSO) authentication for Microsoft Teams bots using Azure Active Directory | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-auth-quickstart/dotnet/bot-auth-quickstart) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-auth-quickstart/nodejs/bot-auth-quickstart)  |

::: zone-end

::: zone pivot="mex-app"

[!INCLUDE [msgex-sso-code](../../../includes/messaging-extensions/msgex-sso-code.md)]

::: zone-end

## Next step

> [!div class="nextstepaction"]
> [Update manifest for SSO and preview app](bot-sso-manifest.md)
