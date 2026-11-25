---
title: Enable message extension SSO with Teams SDK
description: Configure Teams SDK OAuth flows for message extension SSO, understand token exchange, and handle authentication in TypeScript, C#, and Python.
ms.topic: how-to
ms.localizationpriority: high
ms.date: 11/25/2026
zone_pivot_groups: teams-sdk-languages
---

# Enable SSO in your message extension with Teams SDK

Single sign-on (SSO) lets your bot-based message extension access protected resources on behalf of the signed-in Teams user. For example, users can search a protected business system and insert its results into a message without repeatedly signing in. Microsoft Entra ID provides the user identity, and an OAuth connection provides access to the resources the user authorizes.

> [!IMPORTANT]
> This draft describes the required message-extension SSO flow and provides Teams SDK OAuth registration, existing-token lookup, and sign-out helpers for TypeScript, C#, and Python. It doesn't provide a complete message-extension SSO implementation. Authentication response construction, invoke authentication payload handling, token exchange, and request completion require engineering-approved examples before publication. Don't deploy the helpers alone as an SSO implementation.

This article covers bot-based message extensions. For API-based message extensions, see [Enable SSO for API-based message extensions](../../../messaging-extensions/api-based-microsoft-entra.md).

## Prerequisites

* A Teams SDK app with a bot-based message extension and a configured search command or link-unfurling capability.
* An Azure-managed bot resource with an OAuth connection. Teams-managed bots don't support OAuth connections.
* A Microsoft Entra app registration with an exposed API scope and authorized Teams clients.
* The delegated permissions required by the downstream API and user or administrator consent where required.
* A reachable HTTPS messaging endpoint and a test tenant where you can install the app in Teams.
* A language-specific Teams SDK project configured for app authentication.

The snippets use the named OAuth flow APIs documented for Teams SDK 2.1. For configuration, see [Configure your app in Microsoft Entra ID](https://learn.microsoft.com/microsoftteams/platform/bots/how-to/authentication/bot-sso-register-aad).

<!-- TODO: Engineering must confirm tested package versions for all three languages and the supported message-extension scenarios, clients, accounts, and tenants. -->

## User experience

Users invoke your extension by searching from Teams or pasting a supported link. If a usable user token is available, the extension accesses the protected resource and returns a card without another sign-in prompt.

If authentication is required, Teams attempts the SSO flow. Users might need to grant consent or complete interactive sign-in before the extension returns results. Administrator-granted consent can remove the need for a user consent prompt, but doesn't remove other authentication requirements.

SSO doesn't bypass permissions, tenant policy, or administrator approval. Don't require users to send a sign-in message to a conversational bot as a substitute for authenticating the extension request.

## Developer experience

The intended runtime flow is:

1. Teams sends a message-extension invoke.
1. Your app checks the user token and any authentication data supplied with the invoke.
1. If Teams supplies an SSO token, your app exchanges it for a token for the configured resource.
1. If authentication is still required, your app returns the extension's authentication response.
1. Teams completes authentication and sends the follow-up request.
1. Your app obtains the downstream access token, processes the request, and returns a message-extension result.

The implementation sections follow this order:

1. [Configure Microsoft Entra ID and the OAuth connection](#configure-microsoft-entra-id-and-the-oauth-connection).
1. [Configure the app manifest](#configure-the-app-manifest).
1. [Configure app authentication and register the OAuth flow](#configure-app-authentication-and-register-the-oauth-flow).
1. [Handle the message-extension invoke](#handle-the-message-extension-invoke).
1. [Obtain or exchange the user token](#obtain-or-exchange-the-user-token).
1. [Return the extension authentication response](#return-the-extension-authentication-response).
1. [Handle authentication completion and process the request](#handle-authentication-completion-and-process-the-request).
1. [Access the resource and return results](#access-the-resource-and-return-results).
1. [Handle sign-out](#handle-sign-out).

## Implement message-extension SSO

### Configure Microsoft Entra ID and the OAuth connection

Expose the API scope, authorize the Teams clients, and configure the delegated permissions your extension requires. Create an OAuth connection on the Azure Bot resource for the identity provider and downstream resource.

The following values must match:

* The application ID URI exposed by the authentication app registration.
* The OAuth connection's token exchange URL.
* The app manifest's `webApplicationInfo.resource`.

Use the OAuth connection name consistently in your code. This article uses `graph` as an example name; registration doesn't itself grant Microsoft Graph permissions.

If the bot uses a user-assigned managed identity, the bot identity and authentication app registration have different roles. Follow the ID mapping in [webApplicationInfo property](https://learn.microsoft.com/microsoftteams/platform/bots/how-to/authentication/bot-sso-manifest#webapplicationinfo-property).

### Configure the app manifest

Configure `webApplicationInfo` with the authentication app ID and the matching application ID URI. Add the required token-service domains to `validDomains`, and configure the relevant commands or link domains in `composeExtensions`.

For more information, see [Update app manifest for SSO](bot-sso-manifest.md) and [Configure your app in Microsoft Entra ID](https://learn.microsoft.com/microsoftteams/platform/bots/how-to/authentication/bot-sso-register-aad).

Use the token-service endpoints appropriate for your deployment. For regional endpoints, see [OAuth URL support for Azure Bot Service](/azure/bot-service/ref-oauth-redirect-urls?view=azure-bot-service-4.0&preserve-view=true). A service domain containing `botframework.com` is still a service requirement; it isn't an SDK dependency.

### Configure app authentication and register the OAuth flow

Configure the bot identity, tenant, and credential using [Review or update agent runtime authentication configuration](https://learn.microsoft.com/microsoftteams/platform/agents-in-teams/configure-agent-runtime-authentication) and your language's application configuration. Keep credentials in environment configuration or a secret store, not in source code.

The following snippets register one OAuth connection. They don't register extension handlers or complete SSO. Add the missing handlers before starting or deploying the app.

::: zone pivot="teams-sdk-typescript"

```typescript
import { App } from '@microsoft/teams.apps';

const app = new App();
const graph = app.addOAuthFlow('graph');
```

* `graph` identifies the OAuth connection used by this flow. Set it to your Azure Bot OAuth connection name so token operations use the intended connection.

Registered OAuth flows can't be combined with `oauth.defaultConnectionName`. For related conversational-bot guidance, see [Add code to enable SSO in a bot (TypeScript)](https://learn.microsoft.com/microsoftteams/platform/bots/how-to/authentication/bot-sso-code?tabs=ts1).

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

* `"graph"` identifies the OAuth connection registered with your application. Set it to your Azure Bot OAuth connection name so the retrieved flow owns the intended token operations.

This snippet assumes an ASP.NET Core Teams SDK project. Register your handlers before calling `app.Run()`. For related conversational-bot guidance, see [Add code to enable SSO in a bot (C#)](https://learn.microsoft.com/microsoftteams/platform/bots/how-to/authentication/bot-sso-code?tabs=cs1).

::: zone-end

::: zone pivot="teams-sdk-python"

```python
from microsoft_teams.apps import App

app = App()
graph = app.add_oauth_flow("graph")
```

* `"graph"` identifies the OAuth connection used by this flow. Set it to your Azure Bot OAuth connection name so token operations use the intended connection.

For related conversational-bot guidance, see [Add code to enable SSO in a bot (Python)](https://learn.microsoft.com/microsoftteams/platform/bots/how-to/authentication/bot-sso-code?tabs=py1).

::: zone-end

### Handle the message-extension invoke

Handle search requests and link-unfurling requests separately. Read the command, query parameters or URL, and authentication state before accessing protected resources. Reject unsupported commands using the response expected by that invoke.

In TypeScript, the Teams SDK routes are `message.ext.query` and `message.ext.query-link`. For request and response examples, see [Respond to a search command](../../../messaging-extensions/how-to/search-commands/respond-to-search.md) and the language-specific SDK guides in [See also](#see-also).

The extension can receive `value.authentication` on an invoke. Registering an OAuth flow's conversational sign-in handlers doesn't demonstrate that this extension payload is processed automatically.

<!-- TODO: Add engineering-approved search and link-unfurling handlers in all three language pivots. Include authentication payload parsing, returned state handling, validation, and the exact response types for each supported scenario. -->

### Obtain or exchange the user token

Use your registered flow to check for an existing user token. The helpers below accept the flow and the current search-invoke context. They return the token or indicate that no token is available; they don't initiate authentication, exchange an incoming SSO token, or return an extension response.

::: zone pivot="teams-sdk-typescript"

```typescript
import type { IMessageExtensionQueryInvokeActivity } from '@microsoft/teams.api';
import type { IActivityContext, OAuthFlow } from '@microsoft/teams.apps';

export async function getSearchToken(
  flow: OAuthFlow,
  ctx: IActivityContext<IMessageExtensionQueryInvokeActivity>
): Promise<string | undefined> {
  return flow.getToken(ctx);
}
```

* `flow` selects the connection used to look up the user's token. Pass the registered `graph` flow so lookup uses the same connection as authentication.
* `ctx` supplies the current search invoke and user identity. Pass the handler's activity context so lookup is scoped to the invoking user.

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

* `flow` selects the connection used to look up the user's token. Pass the registered `graph` flow so lookup uses the same connection as authentication.
* `context` supplies the current invoke and user identity. Pass the extension handler's context so lookup is scoped to the invoking user.
* `cancellationToken` propagates cancellation from the current invoke request. Pass the handler's cancellation token so the lookup respects request cancellation.

::: zone-end

::: zone pivot="teams-sdk-python"

```python
from microsoft_teams.api import MessageExtensionQueryInvokeActivity
from microsoft_teams.apps import ActivityContext, OAuthFlow


async def get_search_token(
    flow: OAuthFlow,
    ctx: ActivityContext[MessageExtensionQueryInvokeActivity],
) -> str | None:
    return await flow.get_token(ctx)
```

* `flow` selects the connection used to look up the user's token. Pass the registered `graph` flow so lookup uses the same connection as authentication.
* `ctx` supplies the current search invoke and user identity. Pass the handler's activity context so lookup is scoped to the invoking user.

::: zone-end

If Teams supplies `value.authentication.token`, use the Teams SDK token-service client to exchange it through the configured OAuth connection. Don't send the incoming SSO token directly to Microsoft Graph: use the access token issued for the intended downstream resource and delegated permissions.

Treat an expected authentication failure differently from a token-service outage. Don't swallow every exception or turn every failure into a request for consent.

<!-- TODO: Add verified Teams SDK token-exchange snippets in all three language pivots, including payload types, identity and connection binding, expected failure handling, and retry behavior. Existing-token lookup doesn't implement this step. -->

### Return the extension authentication response

If no usable token is available, return the authentication response expected by the message extension. Include the sign-in action and any token-exchange information required by the supported flow.

Don't call `signIn`, `SignInAsync`, or `sign_in` as a substitute for this response. Those helpers send a conversational OAuth card when no token exists. A conversational message isn't a complete extension invoke response.

An HTTP `412` response can indicate that the message-extension token exchange couldn't complete and interactive authentication is required. The implementation must distinguish that condition from unrelated service and authorization failures.

<!-- TODO: Add engineering-approved authentication response builders and HTTP 412 behavior for each language and scenario. The current C# MessageExtensionResponse builder doesn't expose an auth branch. Confirm a supported API and package version rather than inventing a helper or serialization workaround. -->

### Handle authentication completion and process the request

Process the follow-up extension request using its authentication data or returned state. Obtain the downstream token before executing the original search or link query.

A conversational sign-in completion callback runs on a separate turn and doesn't automatically resume an extension request. If your implementation stores a pending request, bind it to the user, tenant, connection, and request; expire it and prevent duplicate processing.

<!-- TODO: Add verified completion and state-redemption snippets for all three languages. Demonstrate how Teams sends the follow-up invoke and how the original query is processed without duplicate operations. -->

### Access the resource and return results

Use the downstream access token only with the API for which it was issued. For a Microsoft Graph example, configure the delegated permission required by the chosen endpoint, such as `User.Read` for reading the signed-in user's profile.

Return the result through the message-extension response, including the required attachments and preview cards. Don't send a "signed in" bot message in place of search results or a link preview.

The [Teams SDK message-extension sample](https://github.com/microsoft/teams.ts/tree/main/examples/message-extensions) demonstrates routing and card responses, not SSO.

<!-- TODO: Add a protected-resource request and complete extension result in all three language pivots. Include required permissions, Graph or business-API failure handling, and the preview card for the selected scenario. -->

### Handle sign-out

Sign the user out of the same OAuth connection used for authentication. These helpers remove the cached connection token; they don't define an extension sign-out command or its response.

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

* `flow` identifies the connection whose cached token is removed. Pass the registered `graph` flow so another connection isn't signed out unintentionally.
* `ctx` supplies the invoking user's identity for the operation. Pass the extension handler's context so sign-out targets that user.

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

* `flow` identifies the connection whose cached token is removed. Pass the registered `graph` flow so another connection isn't signed out unintentionally.
* `context` supplies the invoking user's identity for the operation. Pass the extension handler's context so sign-out targets that user.
* `cancellationToken` propagates cancellation from the current invoke request. Pass the handler's cancellation token so sign-out respects request cancellation.

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

* `flow` identifies the connection whose cached token is removed. Pass the registered `graph` flow so another connection isn't signed out unintentionally.
* `ctx` supplies the invoking user's identity for the operation. Pass the extension handler's context so sign-out targets that user.

::: zone-end

Sign-out doesn't necessarily sign the user out of Teams or revoke previously granted consent. Discard any pending request associated with the signed-out connection.

<!-- TODO: Confirm the supported extension sign-out command and response, then add complete handlers in all three language pivots. The Python helper above accepts a search invoke; a different command requires its matching activity type. -->

## Validate tokens and protect credentials

Distinguish the bearer token used to authenticate an incoming Teams activity from the user access token used to access a resource. The Teams SDK validates the inbound bearer token for its activity endpoint. This doesn't automatically validate arbitrary user tokens received by custom endpoints.

If your API receives an access token intended for that API, validate it with a supported identity library. Validation includes the signature, trusted issuer and tenant, audience, lifetime, and scopes or roles required by your API. Check `aud` against the expected audience and require the appropriate delegated scope in `scp`, such as `access_as_user` when applicable.

Don't rely on decoding a token or checking an issuer prefix alone. Don't log access tokens, credentials, or full authentication payloads, and don't include tokens in cards or diagnostic responses.

For more information, see [Validate tokens](/entra/identity-platform/access-tokens#validate-tokens) and [Teams SDK incoming request authentication](https://learn.microsoft.com/microsoftteams/platform/agents-in-teams/incoming-request-authentication).

## Handle errors

Use the invoke response contract for the supported extension scenario. The following row describes the token-exchange fallback condition, not every authentication failure.

| Status code | Error code | Description | Developer action |
| --- | --- | --- | --- |
| HTTP 412 | N/A | A message-extension SSO token exchange can't complete and interactive authentication is required. | Return the supported fallback response and let the user complete authentication; don't process the protected request until a usable token is available. |

<!-- TODO: Engineering must verify the exact message-extension error contract for all three languages, including HTTP 400, 401, 403, expected exchange failures, denied consent, and operational failures. Don't copy conversational signin/failure codes into this table without validating their applicability. -->

Log failures without credentials or tokens. Surface actionable errors to the user through the extension response, and retain operational diagnostics instead of silently treating outages as missing consent.

## Design guidelines and best practices

* Request the least-privileged delegated permissions that support your scenario.
* Use the token service through the Teams SDK instead of implementing a separate raw-token cache.
* Configure shared state before running multiple instances. Don't assume local storage provides cross-instance request correlation or deduplication.
* Bind pending requests to the correct identity and connection, and apply expiration and cleanup.
* Make retries idempotent so repeated authentication or extension invokes don't duplicate operations.
* Keep sign-in prompts tied to the extension request instead of introducing an unrelated bot conversation.

## Limitations and known issues

* The registration, lookup, and sign-out helpers don't implement the complete SSO flow.
* Search and link unfurling require separate scenario validation. Don't assume action commands or other extension scenarios support the same flow.
* Conversational sign-in APIs and callbacks don't supply the extension's required authentication response.
* The current C# response builder's documented branches don't include `auth`; a supported construction path and package version require engineering confirmation.
* User authentication must be tested in Teams, not only in local developer tools.

<!-- TODO: Confirm the supported SDK package versions, clients, account types, tenant configurations, extension scenarios, and any preview or publishing restrictions before publication. Don't transfer conversational bot scope restrictions to message extensions without verification. -->

## Test authentication in Teams

Run these tests against a complete extension implementation, not just the helpers in this article. Test search and link unfurling separately where your app supports them.

1. Install the app in Teams with a user who hasn't consented. Complete authentication and verify that the original query returns the expected extension result.
1. Repeat the query and verify that an existing token is reused without an unnecessary prompt.
1. Test administrator-granted consent and interactive authentication fallback.
1. Test denied consent, expired tokens, failed exchange, missing tokens, and downstream permission failures.
1. Sign out of the connection and verify that protected results aren't returned using the removed token.
1. Test repeated invokes, multiple Teams clients, and multiple app instances. Verify that retries don't duplicate operations or responses.
1. Verify that diagnostics and cards don't expose tokens, credentials, or authentication payloads.

Use a test tenant. A successful conversational "signed in" message isn't evidence that the extension request completed.

## Code sample

A complete Teams SDK message-extension SSO sample isn't verified for this draft. Add a language link only after its sample demonstrates the full extension authentication and result flow.

| Sample name | Description | TypeScript |
| --- | --- | --- |
| Teams SDK message extensions | Demonstrates search, action commands, and link-unfurling responses without SSO. | [View](https://github.com/microsoft/teams.ts/tree/main/examples/message-extensions) |

<!-- TODO: Add engineering-approved end-to-end message-extension SSO samples. Add C# and Python columns when those samples are available; don't substitute conversational bot authentication samples. -->

## Next step

> [!div class="nextstepaction"]
> [Update app manifest for SSO](bot-sso-manifest.md)

## See also

* [Authenticating app users](https://learn.microsoft.com/microsoftteams/platform/concepts/authentication/authentication)
* [Configure your app in Microsoft Entra ID](https://learn.microsoft.com/microsoftteams/platform/bots/how-to/authentication/bot-sso-register-aad)
* [Respond to search commands (TypeScript)](https://learn.microsoft.com/microsoftteams/platform/messaging-extensions/how-to/search-commands/respond-to-search?tabs=typescript)
* [Respond to search commands (C#)](https://learn.microsoft.com/microsoftteams/platform/messaging-extensions/how-to/search-commands/respond-to-search?tabs=dotnet1)
* [Respond to search commands (Python)](https://learn.microsoft.com/microsoftteams/platform/messaging-extensions/how-to/search-commands/respond-to-search?tabs=python)
