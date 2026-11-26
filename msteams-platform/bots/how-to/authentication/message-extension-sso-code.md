---
title: Enable message extension SSO with Teams SDK
description: Set up message extension SSO with Teams SDK and learn about sign-in, token storage, invoke handling, validation, and sign-out in three languages.
ms.topic: how-to
ms.localizationpriority: high
ms.date: 11/26/2026
zone_pivot_groups: teams-sdk-languages
---

# Enable SSO in your message extension with Teams SDK

Single sign-on (SSO) lets your bot-based message extension access protected resources on behalf of the signed-in Teams user. Users can search a protected system or preview a link without repeatedly signing in.

The message extension uses the bot's authentication backend, but users sign in through the extension rather than a bot conversation. This article focuses on app setup, sign-in and token storage, extension invokes, token validation, and sign-out.

> [!IMPORTANT]
> This draft provides Teams SDK setup and token-operation snippets, not a complete message-extension SSO implementation. The extension sign-in and invoke examples still require engineering confirmation before publication.

For API-based extensions, see [Enable SSO for API-based message extensions](../../../messaging-extensions/api-based-microsoft-entra.md).

## Message-extension sign-in experience

When users open your extension, an existing token can allow them to see the available options and retrieve protected results without another prompt. If no usable token is available, users sign in within the message extension. They might also need to grant consent for the requested permissions.

After authentication, the extension returns the requested search results or link preview. Administrator-granted consent can remove the user consent prompt, but doesn't bypass authentication or tenant policy.

<!-- TODO: Replace legacy UI examples with a current Teams screenshot after Ajay provides the reference. Confirm the visual with the author and review privacy and alt text before adding an asset. -->

## App setup

Before adding authentication code, you need:

* A Teams SDK app with a bot-based message extension and a reachable HTTPS messaging endpoint.
* An Azure-managed bot resource with an OAuth connection.
* A Microsoft Entra app registration configured for SSO and the delegated permissions your resource requires.
* An app manifest with the extension commands or link domains and `webApplicationInfo`.

For setup instructions, see [Configure your app in Microsoft Entra ID](bot-sso-register-aad.md), [Update app manifest for SSO](bot-sso-manifest.md), and [Review or update agent runtime authentication configuration](../../../agents-in-teams/configure-agent-runtime-authentication.md).

The application ID URI, OAuth connection's token exchange URL, and `webApplicationInfo.resource` must match. Keep credentials in environment configuration or a secret store.

Register the OAuth connection using the named-flow APIs documented for Teams SDK 2.1:

::: zone pivot="teams-sdk-typescript"

```typescript
import { App } from '@microsoft/teams.apps';

const app = new App();
const graph = app.addOAuthFlow('graph');
```

* `graph` is your Azure Bot OAuth connection name. Replace it with your configured name so token operations use the intended connection.

Don't combine registered flows with `oauth.defaultConnectionName`.

::: zone-end

::: zone pivot="teams-sdk-csharp"

```csharp
using Microsoft.Teams.Apps;
using Microsoft.Teams.Apps.OAuth;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddTeamsBotApplication(options =>
{
    options.AddOAuthFlow("graph");
});

var app = builder.Build();
var teams = app.UseTeamsBotApplication();
OAuthFlow graph = teams.GetOAuthFlow("graph");
```

* `"graph"` is your Azure Bot OAuth connection name. Replace it with your configured name so token operations use the intended connection.

Add your extension handlers before calling `app.Run()` in your ASP.NET Core project.

::: zone-end

::: zone pivot="teams-sdk-python"

```python
from microsoft_teams.apps import App

app = App()
graph = app.add_oauth_flow("graph")
```

* `"graph"` is your Azure Bot OAuth connection name. Replace it with your configured name so token operations use the intended connection.

::: zone-end

<!-- TODO: Confirm tested SDK package versions and supported extension scenarios for all three languages. -->

## Handle sign-in and token storage

The OAuth connection and token service provide the backend for user authentication and token storage. Your Teams code checks for an existing token and uses it to access the authorized resource. You don't need to reproduce adapter setup or token-storage internals in your extension.

The following helpers retrieve an existing token for the invoking user. Call them from your extension handler with its context and the registered flow. They don't initiate sign-in or return an extension response.

::: zone pivot="teams-sdk-typescript"

```typescript
import type { IActivityContext, OAuthFlow } from '@microsoft/teams.apps';

export async function getUserToken(
  flow: OAuthFlow,
  ctx: IActivityContext
): Promise<string | undefined> {
  return flow.getToken(ctx);
}
```

* `flow` selects the user's configured OAuth connection. Pass `graph` from app setup and the invoking user's `ctx`.

::: zone-end

::: zone pivot="teams-sdk-csharp"

```csharp
using Microsoft.Teams.Apps;
using Microsoft.Teams.Apps.OAuth;
using Microsoft.Teams.Apps.Schema;

public static class MessageExtensionTokenLookup
{
    public static Task<string?> GetTokenAsync<TActivity>(
        OAuthFlow flow,
        Context<TActivity> context,
        CancellationToken cancellationToken)
        where TActivity : TeamsActivity
    {
        return flow.GetTokenAsync(context, cancellationToken);
    }
}
```

* `flow` selects the user's configured OAuth connection. Pass `graph`, the invoke's `context`, and its `cancellationToken`.

::: zone-end

::: zone pivot="teams-sdk-python"

```python
from microsoft_teams.api import MessageExtensionQueryInvokeActivity
from microsoft_teams.apps import ActivityContext, OAuthFlow


async def get_user_token(
    flow: OAuthFlow,
    ctx: ActivityContext[MessageExtensionQueryInvokeActivity],
) -> str | None:
    return await flow.get_token(ctx)
```

* `flow` selects the user's configured OAuth connection. Pass `graph` from app setup and the search handler's `ctx`.

::: zone-end

If no token is available, your extension must use its sign-in experience before accessing protected resources. Conversational `signIn`, `SignInAsync`, and `sign_in` helpers send an OAuth card; they aren't substitutes for the extension's authentication response.

For related bot authentication guidance, see [Add code to enable SSO in a bot](bot-sso-code.md). The backend concepts are shared; the extension invokes and user interaction differ.

If you use a third-party authentication service, follow its sign-in and token-management contract. Don't assume it supports Microsoft Entra SSO or the same OAuth connection flow. For more information, see [Add authentication to your message extension](add-authentication.md).

## Handle message-extension invokes

Search and link-unfurling requests arrive as invokes, not bot messages. Handle them using the Teams SDK routes for the corresponding scenario. In TypeScript, these are `message.ext.query` and `message.ext.query-link`.

Use the authenticated user's token to retrieve the requested data and return a message-extension result. If authentication is required, return the extension's supported sign-in response. A conversational "signed in" message doesn't complete the extension request.

For the language-specific request and response examples, see [Respond to search commands](../../../messaging-extensions/how-to/search-commands/respond-to-search.md) and [Add link unfurling](../../../messaging-extensions/how-to/link-unfurling.md).

<!-- TODO: Add engineering-approved shortened extension sign-in and invoke examples for TypeScript, C#, and Python. Confirm authentication payload handling and the supported response APIs, including C#, rather than implying conversational callbacks complete an extension request. -->

## Validate access tokens

The Teams SDK validates the bearer token on the incoming activity endpoint. This is different from validating a user access token received by a custom API.

If your API receives an access token intended for that API, use a supported identity library to validate its signature, trusted issuer and tenant, audience, lifetime, and required scopes or roles. Check `aud` against your API's expected audience and require the appropriate delegated scope in `scp`, such as `access_as_user` where applicable.

Use downstream tokens only with the resources for which they're issued. Don't treat an incoming SSO token as a Microsoft Graph access token, rely on decoding alone, or log credentials and tokens.

These requirements also apply when your custom API uses a third-party authentication service: validate tokens against that service's trusted issuer and your API's authorization requirements.

For more information, see [Validate tokens](/entra/identity-platform/access-tokens#validate-tokens) and [Teams SDK incoming request authentication](../../../agents-in-teams/incoming-request-authentication.md).

## Handle sign-out

Use the same OAuth flow to remove the user's cached connection token. These helpers perform sign-out only; your extension handler must also return the appropriate confirmation response.

::: zone pivot="teams-sdk-typescript"

```typescript
import type { IActivityContext, OAuthFlow } from '@microsoft/teams.apps';

export async function signOutUser(
  flow: OAuthFlow,
  ctx: IActivityContext
): Promise<void> {
  await flow.signOut(ctx);
}
```

* `flow` identifies the connection to sign out. Pass `graph` and the invoking user's `ctx`.

::: zone-end

::: zone pivot="teams-sdk-csharp"

```csharp
using Microsoft.Teams.Apps;
using Microsoft.Teams.Apps.OAuth;
using Microsoft.Teams.Apps.Schema;

public static class MessageExtensionSignOut
{
    public static Task SignOutAsync<TActivity>(
        OAuthFlow flow,
        Context<TActivity> context,
        CancellationToken cancellationToken)
        where TActivity : TeamsActivity
    {
        return flow.SignOutAsync(context, cancellationToken);
    }
}
```

* `flow` identifies the connection to sign out. Pass `graph`, the invoke's `context`, and its `cancellationToken`.

::: zone-end

::: zone pivot="teams-sdk-python"

```python
from microsoft_teams.api import MessageExtensionQueryInvokeActivity
from microsoft_teams.apps import ActivityContext, OAuthFlow


async def sign_out_user(
    flow: OAuthFlow,
    ctx: ActivityContext[MessageExtensionQueryInvokeActivity],
) -> None:
    await flow.sign_out(ctx)
```

* `flow` identifies the connection to sign out. Pass `graph` and the search handler's `ctx`; use the matching activity type for a different command.

::: zone-end

Sign-out doesn't necessarily sign the user out of Teams or revoke consent. For a third-party authentication service, use its supported sign-out behavior.

<!-- TODO: Confirm extension sign-out commands and confirmation responses for all three languages. -->

## Code samples

| Sample name | Description | TypeScript |
| --- | --- | --- |
| Teams SDK message extensions | Demonstrates search, action commands, and link unfurling without SSO. | [View](https://github.com/microsoft/teams.ts/tree/main/examples/message-extensions) |

<!-- TODO: Add verified message-extension SSO samples and C# and Python columns when available. Verify first-use sign-in, existing-token reuse, consent fallback, token expiry, and sign-out in Teams before publication. -->

## See also

* [Add code to enable SSO in a bot](bot-sso-code.md)
* [Configure your app in Microsoft Entra ID](bot-sso-register-aad.md)
* [Respond to search commands](../../../messaging-extensions/how-to/search-commands/respond-to-search.md)
* [Add authentication to your message extension](add-authentication.md)
