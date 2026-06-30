The Teams SDK handles the SSO token exchange and OAuth flow automatically. You configure an OAuth connection name on the `App` object, then call `signin()` inside your message extension handlers. The SDK manages the underlying `signin/verifyState` and `signin/tokenExchange` invoke activities for you.

This section covers:

1. [Update development environment variables](#update-development-environment-variables)
1. [Configure the OAuth connection](#configure-the-oauth-connection)
1. [Implement message extension handlers with authentication](#implement-message-extension-handlers-with-authentication)
1. [Handle sign-in events and failures](#handle-sign-in-events-and-failures)
1. [Handle sign out](#handle-sign-out)

## Update development environment variables

You've configured client secret and OAuth connection setting for the app in Microsoft Entra ID. You must configure your app code with these variables.

To update the development environment variables:

1. Open the app project.
1. Open the configuration file for your project.
1. Update the environment variables as shown in the following tabs.
1. Save the file.

# [C#](#tab/cs1)

Update `appsettings.json` (or use environment variables in `launchSettings.json`):

- `Teams:ClientID` &ndash; The Application (client) ID from your Microsoft Entra app registration.
- `Teams:ClientSecret` &ndash; The client secret you created.
- `Teams:TenantId` &ndash; Your Directory (tenant) ID.
- `Teams:ConnectionName` &ndash; The name of the OAuth connection you configured in Azure Bot Service.

# [TypeScript](#tab/ts1)

Update the `.env` file:

- `CLIENT_ID` &ndash; The Application (client) ID from your Microsoft Entra app registration.
- `CLIENT_SECRET` &ndash; The client secret you created.
- `TENANT_ID` &ndash; Your Directory (tenant) ID.
- `CONNECTION_NAME` &ndash; The name of the OAuth connection you configured in Azure Bot Service.

# [Python](#tab/py1)

Update the `.env` file:

- `CLIENT_ID` &ndash; The Application (client) ID from your Microsoft Entra app registration.
- `CLIENT_SECRET` &ndash; The client secret you created.
- `TENANT_ID` &ndash; Your Directory (tenant) ID.
- `CONNECTION_NAME` &ndash; The name of the OAuth connection you configured in Azure Bot Service.

---

You've now configured the required environment variables for your message extension app and SSO. Next, configure the OAuth connection in your app code.

## Configure the OAuth connection

The Teams SDK provides built-in OAuth support. You configure the OAuth connection name when creating the `App` object, and the SDK automatically handles token exchange and SSO for all handler routes.

# [C#](#tab/cs2)

```csharp
var builder = WebApplication.CreateBuilder(args);

var connectionName = builder.Configuration["Teams:ConnectionName"];

builder.AddTeams(App.Builder().AddOAuth(connectionName));

var app = builder.Build();
var teams = app.UseTeams();
```

# [TypeScript](#tab/ts2)

```typescript
import { App } from '@microsoft/teams.apps';

const app = new App({
  oauth: {
    defaultConnectionName: process.env.CONNECTION_NAME || 'graph', // Use the same name as your Azure Bot OAuth connection
  },
});
```

# [Python](#tab/py2)

```python
import os
from microsoft_teams.apps import App, AppOptions

app = App(
    **AppOptions(
        default_connection_name=os.getenv("CONNECTION_NAME", "graph"), # Use the same name as your Azure Bot OAuth connection
    )
)
```

---

### Consent dialog for getting access token

If the app user is using your app for the first time, they're required to consent for SSO authentication.

:::image type="content" source="~/assets/images/authentication/teams-sso-mex/me-sso-profile-select.png" alt-text="SSO authentication for message extension app":::

When the app user selects the user name, the permission is granted and they can use the app.

:::image type="content" source="~/assets/images/authentication/teams-sso-mex/me-sso-completed.png" alt-text="SSO authentication completed for message extension app":::

The consent dialog that appears is for open-id scopes defined in Microsoft Entra ID. The app user must give consent only once. After consenting, the app user can access and use your message extension app for the granted permissions and scopes.

> [!IMPORTANT]
> Scenarios where consent dialogs are not needed:
>
> - If the admin has granted consent on behalf of the tenant, app users don't need to be prompted for consent at all. This means that the app users don't see the consent dialogs and can access the app seamlessly.

If you encounter any errors, see [Troubleshoot SSO authentication in Teams](~/tabs/how-to/authentication/tab-sso-troubleshooting.md).

## Implement message extension handlers with authentication

With the Teams SDK, you implement message extension handlers using event-driven patterns. The SDK provides the auth context (such as `signin`, `isSignedIn`, and `userGraph`) directly in the handler, so there's no need for manual token exchange or middleware.

### Search command handler

The following code shows how to handle a search query in a message extension, with SSO authentication to access Microsoft Graph on behalf of the user:

# [C#](#tab/cs3)

In C#, register an inline handler on the `teams` pipeline using `teams.OnQuery(...)`. The context provides the activity and cancellation token:

```csharp
using Microsoft.Teams.Api.MessageExtensions;
using Microsoft.Teams.Cards;
using Microsoft.Teams.Api.Cards;

// ...

teams.OnQuery(async (ctx) =>
{
    var commandId = ctx.Activity.Value.CommandId;
    var query = ctx.Activity.Value.Parameters?
        .FirstOrDefault()?.Value?.ToString() ?? "";

    Console.WriteLine($"Query: command={commandId}, query={query}");

    if (commandId == "searchQuery")
    {
        return CreateSearchResults(query);
    }

    return new Response
    {
        ComposeExtension = new Result
        {
            Type = ResultType.Result,
            AttachmentLayout = Microsoft.Teams.Api.Attachment.Layout.List,
            Attachments = new List<Microsoft.Teams.Api.MessageExtensions.Attachment>()
        }
    };
});
```

# [TypeScript](#tab/ts3)

```typescript
import { cardAttachment } from '@microsoft/teams.api';
import { App } from '@microsoft/teams.apps';
import { AdaptiveCard, TextBlock } from '@microsoft/teams.cards';

app.on('message.ext.query', async ({ activity, signin, isSignedIn }) => {
  // Trigger sign-in if user is not authenticated
  if (!isSignedIn) {
    await signin();
    return { status: 200 };
  }

  const { commandId } = activity.value;
  const searchQuery = activity.value.parameters?.[0]?.value ?? '';

  if (commandId === 'searchQuery') {
    const cards = await createSearchResults(searchQuery);
    const attachments = cards.map(({ card, thumbnail }) => ({
      ...cardAttachment('adaptive', card),
      preview: cardAttachment('thumbnail', thumbnail),
    }));

    return {
      composeExtension: {
        type: 'result',
        attachmentLayout: 'list',
        attachments,
      },
    };
  }

  return { status: 400 };
});
```

# [Python](#tab/py3)

```python
from microsoft_teams.api import (
    AdaptiveCardAttachment,
    MessageExtensionQueryInvokeActivity,
    ThumbnailCardAttachment,
    card_attachment,
    AttachmentLayout,
    MessagingExtensionAttachment,
    MessagingExtensionInvokeResponse,
    MessagingExtensionResult,
    MessagingExtensionResultType,
    InvokeResponse,
)
from microsoft_teams.apps import ActivityContext

@app.on_message_ext_query
async def handle_message_ext_query(
    ctx: ActivityContext[MessageExtensionQueryInvokeActivity],
):
    # Trigger sign-in if user is not authenticated
    if not ctx.is_signed_in:
        await ctx.sign_in()
        return InvokeResponse[MessagingExtensionInvokeResponse](status=200)

    command_id = ctx.activity.value.command_id
    search_query = ""
    if ctx.activity.value.parameters and len(ctx.activity.value.parameters) > 0:
        search_query = ctx.activity.value.parameters[0].value or ""

    if command_id == "searchQuery":
        cards = await create_search_results(search_query)
        attachments = []
        for card_data in cards:
            main = card_attachment(AdaptiveCardAttachment(content=card_data["card"]))
            preview = card_attachment(ThumbnailCardAttachment(content=card_data["thumbnail"]))
            attachments.append(
                MessagingExtensionAttachment(
                    content_type=main.content_type, content=main.content, preview=preview
                )
            )

        result = MessagingExtensionResult(
            type=MessagingExtensionResultType.RESULT,
            attachment_layout=AttachmentLayout.LIST,
            attachments=attachments,
        )
        return MessagingExtensionInvokeResponse(compose_extension=result)

    return InvokeResponse[MessagingExtensionInvokeResponse](status=400)
```

---

## Handle sign-in events and failures

The Teams SDK lets you subscribe to sign-in events that fire when the OAuth flow completes successfully, as well as sign-in failures when the SSO token exchange fails.

### Subscribe to the sign-in event

# [C#](#tab/cs5)

```csharp
teams.OnSignIn(async (_, @event) =>
{
    var context = @event.Context;
    await context.Send(
        "Successfully signed in!");
});
```

# [TypeScript](#tab/ts5)

```typescript
app.event('signin', async ({ send }) => {
  await send('Successfully signed in!');
});
```

# [Python](#tab/py5)

```python
from microsoft_teams.apps import SignInEvent

@app.event("sign_in")
async def handle_sign_in(event: SignInEvent):
    await event.activity_ctx.send("Successfully signed in!")
```

---

### Handle sign-in failures

When using SSO, if the token exchange fails, Teams sends a `signin/failure` invoke activity to your app. The SDK includes a built-in default handler that logs a warning. You can optionally register your own handler to customize the behavior:

# [C#](#tab/cs6)

```csharp
teams.OnSignInFailure(async (_, @event) =>
{
    Console.WriteLine($"Sign-in failed: {@event.Error.Code} - {@event.Error.Message}");
    await @event.Context.Send("Sign-in failed.");
});
```

# [TypeScript](#tab/ts6)

```typescript
app.on('signin.failure', async ({ activity, send }) => {
  const { code, message } = activity.value;
  console.log(`Sign-in failed: ${code} - ${message}`);
  await send('Sign-in failed.');
});
```

# [Python](#tab/py6)

```python
@app.on_signin_failure()
async def handle_signin_failure(ctx):
    failure = ctx.activity.value
    print(f"Sign-in failed: {failure.code} - {failure.message}")
    await ctx.send("Sign-in failed.")
```

---

## Handle sign out

Use the following code to sign out the user and clear the token from the User Token Service cache:

# [C#](#tab/cs7)

```csharp
teams.OnMessage("signout", async context =>
{
    if (!context.IsSignedIn)
    {
        await context.Send("You are not signed in.");
        return;
    }

    await context.SignOut();
    await context.Send("You have been signed out.");
});
```

# [TypeScript](#tab/ts7)

```typescript
app.message('/signout', async ({ send, signout, isSignedIn }) => {
  if (!isSignedIn) {
    await send('You are not signed in.');
    return;
  }

  await signout();
  await send('You have been signed out.');
});
```

# [Python](#tab/py7)

```python
from microsoft_teams.api import MessageActivity
from microsoft_teams.apps import ActivityContext

@app.on_message_pattern("signout")
async def handle_signout(ctx: ActivityContext[MessageActivity]):
    if not ctx.is_signed_in:
        await ctx.send("You are not signed in.")
        return

    await ctx.sign_out()
    await ctx.send("You have been signed out.")
```

---

## Code sample

| **Sample name** | **Description** | **.NET** | **Node.js** | **Python** |
|---|---|---|---|---|
| Bot auth quickstart | Demonstrates SSO authentication for Teams bots using the Teams SDK. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-auth-quickstart/dotnet/bot-auth-quickstart) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-auth-quickstart/nodejs/bot-auth-quickstart) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-auth-quickstart/python/bot-auth-quickstart) |
| Bot message extensions | Demonstrates search-based messaging extensions with the Teams SDK. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-message-extensions/dotnet/bot-message-extensions) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-message-extensions/nodejs/bot-message-extensions) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-message-extensions/python/bot-message-extensions) |
