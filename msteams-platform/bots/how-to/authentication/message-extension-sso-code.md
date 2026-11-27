---
title: Enable message extension SSO with Teams SDK
description: Add single sign-on to a bot-based message extension with Teams SDK. Learn how the SSO flow works, configure your app, handle search and link-unfurling invokes, validate tokens, and sign users out in TypeScript, C#, and Python.
ms.topic: how-to
ms.localizationpriority: high
ms.date: 11/26/2026
zone_pivot_groups: teams-sdk-languages
---

# Enable SSO in your message extension with Teams SDK

Single sign-on (SSO) lets your bot-based message extension call protected resources, such as Microsoft Graph or your own API, on behalf of the signed-in Teams user. Users can search a protected system or unfurl a link without signing in again.

For API-based message extensions, see [Enable SSO for API-based message extensions](../../../messaging-extensions/api-based-microsoft-entra.md).

## Supported scenarios

| Scenario | SSO support | Teams SDK route (TypeScript) |
| --- | --- | --- |
| Search commands | Documented for message-extension SSO | `message.ext.query` |
| Link unfurling | Documented for message-extension SSO | `message.ext.query-link` |
| Action commands | Not supported by the message-extension SSO guidance | Not applicable |

The existing SSO guidance documents search and link-unfurling scenarios. These rows don't mean that the Teams SDK examples in this article are a verified end-to-end implementation. If an action command needs the user's identity, don't assume that a token obtained through a search command makes SSO supported for the action invoke.

## How message-extension SSO works

:::image type="content" source="../../../assets/images/authentication/teams-sso-mex/sequence-diagram.png" alt-text="Image shows the sequence diagram for enabling SSO for message extension app." lightbox="../../../assets/images/authentication/teams-sso-mex/sequence-diagram.png":::

1. The user runs a search command or pastes a link from a registered domain. Teams sends a `composeExtension/query` or `composeExtension/queryLink` invoke to your bot.
1. Your handler checks the token store for the user's token. If a token is available, continue to step 6.
1. If no token is available, your handler returns a `silentAuth` response with a sign-in link.
1. Teams obtains an SSO token for the user, requests consent if needed, and resends the original invoke with the token in `value.authentication.token`.
1. Your handler exchanges the SSO token through the OAuth connection. The token service stores the resulting access token for the user.<br>
   If the exchange requires interactive sign-in, your handler returns HTTP `412`. Teams opens the sign-in experience using the link from step 3. After sign-in, Teams resends the query with a magic code in `value.state`. Your handler passes this code to the token service to complete authentication. <br>
   Return HTTP `412` only for the SDK-confirmed nonexchangeable-token result. Handle network and service errors separately.<br>
1. Your handler uses the access token to retrieve the requested data and returns a `result` response to Teams.

When an administrator grants tenant-wide consent, users don't see the consent prompt. Admin consent doesn't bypass authentication or tenant policy.

## Prerequisites and configuration checklist

Complete the following configuration before you add code. For step-by-step instructions, see [Configure your app in Microsoft Entra ID](bot-sso-register-aad.md), [Update app manifest for SSO](bot-sso-manifest.md), and [Review or update agent runtime authentication configuration](../../../agents-in-teams/configure-agent-runtime-authentication.md).

| Component | Requirement |
| --- | --- |
| Teams app | A Teams SDK app with a bot-based message extension and a reachable HTTPS messaging endpoint. |
| Azure Bot | An Azure-managed bot. Teams-managed bots don't support OAuth connections. |
| Microsoft Entra app: Expose an API | Application ID URI in the format `api://botid-{bot-app-id}` and a delegated scope named `access_as_user`. |
| Microsoft Entra app: Authorized client applications | Pre-authorize the Teams clients for the `access_as_user` scope: `1fec8e78-bce4-4aaf-ab1b-5451cc387264` (Teams desktop and mobile) and `5e3ce6c0-2b1f-4285-8d4b-75ee78787346` (Teams web). |
| Microsoft Entra app: Authentication | Web redirect URI `https://token.botframework.com/.auth/web/redirect`. |
| Microsoft Entra app: API permissions | The delegated permissions your resource requires, such as `User.Read` for Microsoft Graph. |
| Azure Bot OAuth connection | A named connection whose **Token Exchange URL** is your Application ID URI. You use the connection name in code. |
| App manifest | `webApplicationInfo.id` set to the Microsoft Entra app client ID, `webApplicationInfo.resource` set to the Application ID URI, `token.botframework.com` in `validDomains`, and your search commands or link-unfurling domains in `composeExtensions`. |
| Credentials | Client secrets and connection settings in environment configuration or a secret store, never in source code. |

> [!IMPORTANT]
>
> - The **Application ID URI**, the OAuth connection's **Token Exchange URL**, and the manifest's **`webApplicationInfo.resource`** must match exactly. If they don't, the token exchange fails and users see the sign-in prompt every time.
> - The protocol outline in this section follows the existing message-extension SSO guidance. The Teams SDK snippets below are not a verified end-to-end implementation of that protocol. In particular, do not publish them as a working SSO flow until the incoming token, silent-auth response, exchange-failure handling, and retry are validated in Teams.

## Register the OAuth flow

Register the OAuth connection with the named-flow APIs in Teams SDK 2.1. The name you register must match the OAuth connection name on your Azure Bot resource.

::: zone pivot="teams-sdk-typescript"

```typescript
import { App } from '@microsoft/teams.apps';

const app = new App();
const graph = app.addOAuthFlow('graph');
```

* Replace `graph` with your Azure Bot OAuth connection name.
* To get the flow from another module, call `app.getOAuthFlow('graph')`.
* Registered flows replace `oauth.defaultConnectionName`; you can't use both. Registering a flow also turns on per-turn state, which the SDK uses to track pending sign-ins.

::: zone-end

::: zone pivot="teams-sdk-csharp"

```csharp
using Microsoft.Teams.Apps;
using Microsoft.Teams.Apps.MessageExtensions;
using Microsoft.Teams.Apps.OAuth;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddTeamsBotApplication(options =>
{
    options.AddOAuthFlow("graph");
});

var app = builder.Build();
var teams = app.UseTeamsBotApplication();
OAuthFlow graph = teams.GetOAuthFlow("graph");

// Register message-extension handlers here, before app.Run().

app.Run();
```

* Replace `"graph"` with your Azure Bot OAuth connection name.

::: zone-end

::: zone pivot="teams-sdk-python"

```python
from microsoft_teams.apps import App

app = App()
graph = app.add_oauth_flow("graph")
```

* Replace `"graph"` with your Azure Bot OAuth connection name.

::: zone-end

> [!NOTE]
> If you run more than one instance of your app, configure shared state storage. The default in-process storage doesn't share pending sign-in and token-exchange state across instances, which causes intermittent sign-in failures.

## Handle search and link-unfurling invokes

Search and link-unfurling requests arrive as invokes, not messages. Every protected handler follows the same pattern:

1. If the invoke contains `value.authentication.token`, exchange it. Return `412` only for the platform-defined nonexchangeable-token case; let unrelated service and network errors surface.
1. Otherwise, look up a cached token, passing the magic code from `value.state` if present.
1. If there's still no token, return a `silentAuth` response.
1. Use the token to get the data and return a `result` response.

Don't use the conversational `signIn`, `SignInAsync`, or `sign_in` helpers in a message-extension handler. They send an OAuth card to a conversation and don't complete the extension request.

### Sign-in response

When no token is available, return a `silentAuth` response. The sign-in link comes from the token service for your OAuth connection and is used only if silent SSO fails.

:::image type="content" source="../../../assets/images/authentication/teams-sso-mex/me-sso-profile-select.png" alt-text="Image shows message extension app sign-in prompt for the user.":::

Teams uses the response to present the sign-in action in your message extension when interactive sign-in is required. You don't need to create a separate sign-in button or send an OAuth card to a bot conversation.

```json
{
  "composeExtension": {
    "type": "silentAuth",
    "suggestedActions": {
      "actions": [
        {
          "type": "openUrl",
          "title": "Sign in",
          "value": "<sign-in link from the token service>"
        }
      ]
    }
  }
}
```

### Retried request with the SSO token

Teams resends the original invoke with an `authentication` object:

```json
{
  "type": "invoke",
  "name": "composeExtension/query",
  "value": {
    "commandId": "searchQuery",
    "parameters": [{ "name": "searchQuery", "value": "contoso" }],
    "authentication": {
      "token": "<SSO token>"
    }
  }
}
```

### Handler code

<!-- The token-service examples below are primitives only; they don't establish a complete message-extension SSO flow. -->

::: zone pivot="teams-sdk-typescript"

Create a helper that returns either a token or the response your handler must send:

```typescript
import type { IActivityContext } from '@microsoft/teams.apps';

const CONNECTION_NAME = 'graph';

type AuthResult =
  | { token: string; response?: undefined }
  | { token?: undefined; response: unknown };

export async function getTokenOrAuthResponse(
  ctx: IActivityContext<any>
): Promise<AuthResult> {
  const { activity, api } = ctx;
  const userId = activity.from.id;
  const channelId = activity.channelId;

  // 1. Teams resent the query with an SSO token: exchange it.
  const ssoToken = activity.value?.authentication?.token;
  if (ssoToken) {
    const exchanged = await api.users.token.exchange({
      userId,
      connectionName: CONNECTION_NAME,
      channelId,
      exchangeRequest: { token: ssoToken },
    });
    if (exchanged?.token) {
      return { token: exchanged.token };
    }
    // Return 412 only for the SDK-confirmed nonexchangeable-token result.
    return { response: { status: 412 } };
  }

  // 2. Cached token, or completion of the interactive fallback (magic code).
  const magicCode = activity.value?.state;
  let cachedToken: string | undefined;
  try {
    const cached = await api.users.token.get({
      userId,
      connectionName: CONNECTION_NAME,
      channelId,
      code: magicCode,
    });
    cachedToken = cached?.token;
  } catch (error) {
    if (!isHttpStatus(error, 404)) {
      throw error;
    }
  }
  if (cachedToken) {
    return { token: cachedToken };
  }

  // 3. No token: ask Teams to run silent SSO.
  const { signInLink } = await api.bots.signIn.getResource({
    state: buildTokenExchangeState(ctx, CONNECTION_NAME),
  });

  return {
    response: {
      composeExtension: {
        type: 'silentAuth',
        suggestedActions: {
          actions: [{ type: 'openUrl', title: 'Sign in', value: signInLink }],
        },
      },
    },
  };
}

function isHttpStatus(error: unknown, status: number): boolean {
  if (typeof error !== 'object' || error === null) {
    return false;
  }
  const candidate = error as { status?: unknown; response?: unknown };
  if (candidate.status === status) {
    return true;
  }
  if (typeof candidate.response !== 'object' || candidate.response === null) {
    return false;
  }
  return (candidate.response as { status?: unknown }).status === status;
}
```

The 404 check handles only the token-service "no cached token" response. Other token-service and network errors propagate. Confirm the HTTP error shape used by the Teams SDK package version in your app. Map an exchange failure to `412` only after confirming the SDK's specific nonexchangeable-token result; don't treat every thrown error as a consent failure.

Use the helper in your search handler:

```typescript
import { cardAttachment } from '@microsoft/teams.api';

app.on('message.ext.query', async (ctx) => {
  const auth = await getTokenOrAuthResponse(ctx);
  if (auth.response) {
    return auth.response;
  }

  const query = ctx.activity.value.parameters?.[0]?.value ?? '';
  const items = await searchProtectedSystem(auth.token, query);

  return {
    composeExtension: {
      type: 'result',
      attachmentLayout: 'list',
      attachments: items.map((item) => ({
        ...cardAttachment('thumbnail', { title: item.title, text: item.summary }),
        preview: cardAttachment('thumbnail', { title: item.title }),
      })),
    },
  };
});
```

Link unfurling uses the same helper:

```typescript
app.on('message.ext.query-link', async (ctx) => {
  const auth = await getTokenOrAuthResponse(ctx);
  if (auth.response) {
    return auth.response;
  }

  const preview = await getLinkPreview(auth.token, ctx.activity.value.url);

  return {
    composeExtension: {
      type: 'result',
      attachmentLayout: 'list',
      attachments: [
        {
          ...cardAttachment('thumbnail', { title: preview.title, text: preview.summary }),
          preview: cardAttachment('thumbnail', { title: preview.title }),
        },
      ],
    },
  };
});
```

* `searchProtectedSystem`, `getLinkPreview`, and `buildTokenExchangeState` are placeholders for your own code.
* `auth.token` is issued for the resource configured on the OAuth connection. Use it only with that resource.

::: zone-end

::: zone pivot="teams-sdk-csharp"

```csharp
using Microsoft.Teams.Apps.Clients;

public static class MessageExtensionTokenOperations
{
    private const string ConnectionName = "graph";

    public static async Task<string?> GetCachedTokenAsync(
        UserTokenApiClient userToken,
        string userId,
        string channelId,
        string? magicCode,
        CancellationToken cancellationToken)
    {
        var result = await userToken.GetAsync(
            userId, ConnectionName, channelId, magicCode, cancellationToken);
        return result?.Token;
    }

    public static async Task<string?> ExchangeTokenAsync(
        UserTokenApiClient userToken,
        string userId,
        string channelId,
        string ssoToken,
        CancellationToken cancellationToken)
    {
        var result = await userToken.ExchangeAsync(
            userId, ConnectionName, channelId, ssoToken, cancellationToken);
        return result?.Token;
    }
}
```

These are token-service operations, not a complete handler. The SDK 2.1 C# query models expose `State`, but the documented typed query model doesn't expose `value.authentication.token`. Don't infer the token from `State` or cast the typed query value to a JSON object; obtain an engineering-verified way to read the incoming token before implementing exchange. Let service errors propagate unless the SDK documents a specific nonexchangeable-token result that should become HTTP `412`.

The message-extension route methods are extension methods in `Microsoft.Teams.Apps.MessageExtensions`. However, compiling a route registration alone doesn't validate its authentication behavior or response contract.

::: zone-end

::: zone pivot="teams-sdk-python"

```python
from typing import Any
from httpx import HTTPStatusError

from microsoft_teams.apps import ActivityContext
from microsoft_teams.api.clients.bot.params import GetBotSignInResourceParams
from microsoft_teams.api.clients.user.params import (
    ExchangeUserTokenParams,
    GetUserTokenParams,
)
from microsoft_teams.api.models import TokenExchangeRequest

CONNECTION_NAME = "graph"


async def get_token_or_auth_response(
    ctx: ActivityContext[Any],
) -> tuple[str | None, dict | None]:
    """Return (token, None) when authenticated, or (None, response) to return to Teams."""
    activity = ctx.activity
    value = activity.value or {}
    user_id = activity.from_.id
    channel_id = activity.channel_id

    # 1. Teams resent the query with an SSO token: exchange it.
    authentication = getattr(value, "authentication", None) or {}
    sso_token = authentication.get("token") if isinstance(authentication, dict) else None
    if sso_token:
        exchanged = await ctx.api.users.exchange_token(
            ExchangeUserTokenParams(
                user_id=user_id,
                connection_name=CONNECTION_NAME,
                channel_id=channel_id,
                exchange_request=TokenExchangeRequest(token=sso_token),
            )
        )
        if exchanged.token:
            return exchanged.token, None

        # Return 412 only for the SDK-confirmed nonexchangeable-token result.
        return None, {"status": 412}

    # 2. Cached token, or completion of the interactive fallback (magic code).
    magic_code = getattr(value, "state", None)
    try:
        cached = await ctx.api.users.get_token(
            GetUserTokenParams(
                user_id=user_id,
                connection_name=CONNECTION_NAME,
                channel_id=channel_id,
                code=magic_code,
            )
        )
    except HTTPStatusError as error:
        if error.response.status_code != 404:
            raise
        cached = None
    if cached and cached.token:
        return cached.token, None

    # 3. No token: ask Teams to run silent SSO.
    sign_in = await ctx.api.bots.sign_in.get_resource(
        GetBotSignInResourceParams(
            state=build_token_exchange_state(ctx, CONNECTION_NAME)
        )
    )
    return None, {
        "composeExtension": {
            "type": "silentAuth",
            "suggestedActions": {
                "actions": [
                    {"type": "openUrl", "title": "Sign in", "value": sign_in.sign_in_link}
                ]
            },
        }
    }
```

Use the helper in your search and link-unfurling handlers:

```python
from microsoft_teams.api import (
    MessageExtensionQueryInvokeActivity,
    MessageExtensionQueryLinkInvokeActivity,
)


@app.on_message_ext_query
async def handle_search(ctx: ActivityContext[MessageExtensionQueryInvokeActivity]):
    token, auth_response = await get_token_or_auth_response(ctx)
    if auth_response:
        return auth_response

    query = ctx.activity.value.parameters[0].value if ctx.activity.value.parameters else ""
    items = await search_protected_system(token, query)
    return build_result_response(items)


@app.on_message_ext_query_link
async def handle_link(ctx: ActivityContext[MessageExtensionQueryLinkInvokeActivity]):
    token, auth_response = await get_token_or_auth_response(ctx)
    if auth_response:
        return auth_response

    preview = await get_link_preview(token, ctx.activity.value.url)
    return build_result_response([preview])
```

* `search_protected_system`, `get_link_preview`, `build_result_response`, and `build_token_exchange_state` are placeholders for your own code.
* The token-service calls use the Teams SDK 2.1 parameter-object signatures. A token lookup returns a cache miss only for HTTP `404`; other errors propagate. The exchange call intentionally doesn't catch broad errors. Confirm which SDK error specifically represents a nonexchangeable token before mapping it to HTTP `412`.
* The `silentAuth` response, token exchange, and retry are not validated end to end in Teams. Don't publish this as a complete SSO implementation until those steps are tested.

::: zone-end

For more about building search results and link previews, see [Respond to search commands](../../../messaging-extensions/how-to/search-commands/respond-to-search.md) and [Add link unfurling](../../../messaging-extensions/how-to/link-unfurling.md).

If you use a third-party identity provider instead of Microsoft Entra ID, return an `auth` response instead of `silentAuth` and follow that provider's sign-in and token-management contract. Don't assume it supports Microsoft Entra SSO. For more information, see [Add authentication to your message extension](add-authentication.md).

## Handle sign-out

Give users an explicit way to sign out, such as a dedicated search command.

1. Add a sign-out command to `composeExtensions` in your app manifest:

    ```json
    {
      "id": "signOut",
      "type": "query",
      "title": "Sign out",
      "description": "Sign out of Contoso",
      "initialRun": true,
      "parameters": [
        { "name": "signOut", "title": "Sign out", "inputType": "text" }
      ]
    }
    ```

1. In your search handler, check for the command before you look up a token, sign the user out, and return a confirmation:

::: zone pivot="teams-sdk-typescript"

```typescript
app.on('message.ext.query', async (ctx) => {
  if (ctx.activity.value.commandId === 'signOut') {
    await graph.signOut(ctx);
    return {
      composeExtension: {
        type: 'message',
        text: 'You have been signed out.',
      },
    };
  }

  // ...search handling from the previous section
});
```

::: zone-end

::: zone pivot="teams-sdk-csharp"

```csharp
using Microsoft.Teams.Apps;
using Microsoft.Teams.Apps.MessageExtensions;

public static class MessageExtensionSignOut
{
    public static async Task<InvokeResponse<MessageExtensionResponse>> SignOutAsync(
        Context<InvokeActivity<MessageExtensionQuery>> context,
        CancellationToken cancellationToken)
    {
        var userId = context.Activity.From?.Id;
        var channelId = context.Activity.ChannelId;
        if (string.IsNullOrWhiteSpace(userId) || string.IsNullOrWhiteSpace(channelId))
        {
            throw new InvalidOperationException("The invoke is missing its user or channel ID.");
        }

        await context.Api.UserToken.SignOutAsync(
            userId, "graph", channelId, cancellationToken);

        return MessageExtensionResponse.CreateBuilder()
            .WithType(MessageExtensionResponseTypes.Message)
            .WithText("You have been signed out.")
            .Build();
    }
}
```

Call `MessageExtensionSignOut.SignOutAsync` from the `signOut` command branch in your `OnQuery` handler. `OnQuery` is an extension method in `Microsoft.Teams.Apps.MessageExtensions`. This sign-out helper is compiled against `Microsoft.Teams.Apps` 2.1.0; it doesn't demonstrate the message-extension SSO token-exchange flow.

::: zone-end

::: zone pivot="teams-sdk-python"

```python
@app.on_message_ext_query
async def handle_search(ctx: ActivityContext[MessageExtensionQueryInvokeActivity]):
    if ctx.activity.value.command_id == "signOut":
        await graph.sign_out(ctx)
        return {"composeExtension": {"type": "message", "text": "You have been signed out."}}

    # ...search handling from the previous section
```

::: zone-end

Sign-out removes the user's token for this connection from the token service. It doesn't sign the user out of Teams or revoke consent. If you use a third-party identity provider, use its supported sign-out behavior.

## Validate tokens

When you use the OAuth connection, Teams SDK validates the bearer token on incoming requests to your messaging endpoint, and the token service handles the SSO token exchange. You don't need to validate the SSO token yourself in this flow.

Validate tokens yourself only when your own API receives an access token. In that case:

* Use a supported identity library to check the signature, issuer and tenant, audience (`aud`), lifetime, and required scopes (`scp`, such as `access_as_user`) or roles.
* Don't rely on decoding the token alone.
* Use each token only with the resource it was issued for. An SSO token isn't a Microsoft Graph access token.
* Never log tokens or credentials.

For more information, see [Validate tokens](/entra/identity-platform/access-tokens#validate-tokens) and [Teams SDK incoming request authentication](../../../agents-in-teams/incoming-request-authentication.md).

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Users see the sign-in prompt every time, or sign-in fails with `resourcematchfailed`. | The Application ID URI, Token Exchange URL, and `webApplicationInfo.resource` don't match. | Make all three values identical, then reupload the app package. |
| The consent prompt appears repeatedly, or every exchange returns `412`. | Teams clients aren't pre-authorized, or the required delegated permissions aren't consented. | Pre-authorize the Teams client IDs for `access_as_user`, or have an administrator grant tenant-wide consent. |
| The sign-in window is blank or doesn't open. | `token.botframework.com` is missing from `validDomains`. | Add it to the manifest and reupload the app package. |
| In a protocol-validated implementation, the handler keeps returning `silentAuth` after sign-in. | The handler might not be reading `value.authentication.token` or `value.state`. | Verify the raw invoke payload, exchange the SSO token, and pass the magic code when you look up the token. |
| Sign-in fails intermittently. | The app runs on several instances with in-process state. | Configure shared state storage. |
| SSO works for search but not for an action command. | Action commands don't support SSO. | See [Supported scenarios](#supported-scenarios). |

## Code samples

| Sample name | Description | Node.js | C# | Python |
| --- | --- | --- | --- | --- |
| Teams SDK message extensions | Search, action commands, and link unfurling with Teams SDK, without SSO. | [View](https://github.com/microsoft/teams.ts/tree/main/examples/message-extensions) | NA | NA |
| Message extension search with SSO (Bot Framework SDK) | Search command that signs the user in with SSO and returns results. Uses Bot Framework SDK, not Teams SDK. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search-sso-config/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search-auth-config/csharp) | NA |

## See also

* [Add code to enable SSO in a bot](bot-sso-code.md)
* [Configure your app in Microsoft Entra ID](bot-sso-register-aad.md)
* [Update app manifest for SSO](bot-sso-manifest.md)
* [Respond to search commands](../../../messaging-extensions/how-to/search-commands/respond-to-search.md)
* [Add link unfurling](../../../messaging-extensions/how-to/link-unfurling.md)
* [Add authentication to your message extension](add-authentication.md)
* [Enable SSO for API-based message extensions](../../../messaging-extensions/api-based-microsoft-entra.md)
