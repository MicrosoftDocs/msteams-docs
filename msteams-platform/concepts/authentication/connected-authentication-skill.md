---
title: Connect agent and tab authentication
description: Learn how connected authentication coordinates OAuth provider or Microsoft Entra ID authentication for an agent and an associated tab.
ms.topic: how-to
ms.localizationpriority: medium
ms.date: 09/22/2026
---

# Connect agent and tab authentication

Connected authentication provides one coordinated authentication experience for a Teams app that includes an agent and a tab. For example, in a customer-support app, a representative signs in to an agent to find a case and then opens the associated case-management tab without signing in again. Connected authentication supports either a Microsoft Entra identity or an OAuth provider account linked to a Microsoft identity.

> [!IMPORTANT]
> Connected authentication is a one-way flow from the agent to the tab. Signing in to the agent can authenticate the associated tab after the connected authentication flow completes. Signing in to the tab doesn't sign the user in to the agent. Connected authentication supports AAD and OAuth scenarios.

## User experience

To use the connected experience, the user starts sign-in from the agent first with Microsoft Entra ID or an OAuth provider. For Microsoft Entra ID authentication, the app uses their Microsoft identity directly. For OAuth provider authentication, users can link that account to their Microsoft identity.

Opening or signing in to the tab first doesn’t establish authentication for the agent. After the connected authentication flow completes, the associated tab can authenticate the user through their active Microsoft session, reducing repeated sign-in prompts.

[Placeholder: Screenshots of the connected authentication dialog.]

**Key highlights for users**:

- **Unified user experience**: Users sign in to the agent and can access the associated tab with fewer repeated sign-in prompts.
- **Consistent Onboarding**: Connected authentication flow ensures that all users meet minimum setup requirements before accessing app features. Following onboarding, the user experiences increased reliability and lesser support issues.
- **Fewer sign-in prompts**: Microsoft Entra Nested app authentication (NAA) allows the associated tab to reuse the user's active Microsoft session when authentication requirements are satisfied.
- **Seamless access**: Connected authentication provides smoother interactions as the agent and associated tab recognize the same authenticated user.

## Connected authentication at runtime

Connected authentication coordinates authentication between an agent and an associated tab so both capabilities can recognize the same user without sharing tokens or authentication sessions using account linking. It supports both **OAuth provider authentication** and **Microsoft Entra ID authentication**.

**Account linking** establishes a trusted association between the identity used by the agent or bot and the identity used by the tab. The exact operation depends on the authentication path:

- **Microsoft Entra ID authentication:** Both capabilities authenticate through Microsoft Entra ID. The application correlates the verified Microsoft identity across the agent and tab. A separate external-provider linking operation might not be necessary.
- **OAuth provider authentication:** The agent authenticates the user through an OAuth provider, while the tab authenticates the user through Microsoft Entra ID. The application associates the provider-managed identity with the user’s Microsoft identity.

In either path, connected authentication doesn’t merge authentication sessions or copy tokens between capabilities. The agent and tab acquire and use their own tokens for their respective resources. The application relies on verified identity information to determine that both authentication results represent the same user. After the agent authentication flow succeeds, the tab can authenticate the same user. Authentication initiated by the tab isn’t propagated back to the agent.

The connected authentication flow works as follows for the OAuth scenario:

:::image type="content" source="../../assets/images/authentication/connected-authentication/authentication-flow.png" alt-text="This image shows the authentication flow for connected authentication.":::

1. The user opens the agent and is prompted to sign in with an OAuth provider or Microsoft Entra ID.
1. For OAuth provider authentication, the user chooses whether to link that account to their Microsoft identity. For Microsoft Entra ID authentication, the app continues with the user's Microsoft identity.
1. The user reviews and accepts any required Microsoft identity permissions.
1. After connected authentication succeeds, the user can open the associated tab without another sign-in prompt.

For OAuth provider authentication, if the user skips account linking or later revokes it, the agent remains independently authenticated, while the tab uses its existing sign-in flow or the app restarts account linking from the agent or bot. For either authentication path, if consent, Conditional Access, or reauthentication is required later, the app displays a Microsoft identity prompt.

OAuth provider authentication links identity records, while Microsoft Entra ID authentication uses the user's Microsoft identity directly. Neither path combines or shares access tokens between the agent and the tab.

## Implement connected authentication

Coordinate the app manifest, Teams SDK agent sign-in, NAA token acquisition, and any required backend identity linking so the tab can authenticate the same user.

> [!NOTE]
> The code snippets in this implementation walkthrough show the OAuth provider authentication with account linking path and use Auth0 as the example provider. Connected authentication supports Microsoft Entra ID authentication equally; use the Teams SDK Microsoft Entra ID authentication configuration for that path and omit external-provider account-linking operations that don't apply.

### Prerequisites

Before you implement connected authentication, you need:

- A Teams app with a personal agent and a tab.
- A Teams SDK agent using `@microsoft/teams.apps`, `@microsoft/teams.api`, and related Teams SDK packages.
- An Azure bot resource configured for OAuth provider or Microsoft Entra ID authentication.
- One of the following:
  - A Microsoft Entra app registration configured for NAA.
  - For OAuth provider authentication, an identity provider that supports account linking and Authorization Code flow with PKCE.
- A public HTTPS origin that hosts your agent endpoint, connected authentication page, and any required OAuth bridge endpoints.
- A connected authentication URL, such as `https://app.contoso.com/authTab`.
- Nested app authentication (NAA) for the agent and tab authentication.

#### How NAA relates to connected authentication

Connected authentication requires NAA so the associated tab, which is a single-page application (SPA), can acquire a Microsoft Entra token within Teams. Before you implement the connected flow, understand the NAA concepts for registering the SPA, configuring the trusted broker redirect, initializing TeamsJS before MSAL, and attempting silent token acquisition before requesting user interaction. For more information, see [Nested app authentication](nested-authentication.md). NAA provides the Microsoft Entra authentication required by the tab:

- For Microsoft Entra ID authentication, NAA allows the tab to authenticate the same Microsoft identity used by the agent.
- For OAuth provider authentication, the app uses the Microsoft identity acquired through NAA when linking it to the OAuth identity.

NAA doesn’t link identities or share the agent’s authentication session with the tab. The app remains responsible for validating and correlating the identities. NAA provides Microsoft Entra authentication for the tab. It doesn’t authenticate the agent or use a tab authentication session for the agent.

### Configure the app manifest

Use app manifest version 1.22 or later to add `nestedAppAuthInfo`. The following example uses version 1.23:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/teams/v1.23/MicrosoftTeams.schema.json",
  "manifestVersion": "1.23",
  "bots": [
    {
      "botId": "${{ENTRA_APP_ID}}",
      "scopes": ["personal"],
      "isNotificationOnly": false
    }
  ],
  "validDomains": [
    "app.contoso.com"
  ],
  "webApplicationInfo": {
    "id": "${{ENTRA_APP_ID}}",
    "resource": "api://botid-${{ENTRA_APP_ID}}",
    "nestedAppAuthInfo": [
      {
        "redirectUri": "brk-multihub://app.contoso.com",
        "scopes": ["User.Read"]
      }
    ]
  }
}
```

- `bots[0].botId`: Identifies the agent registration. Set it to the Microsoft Entra application client ID to route Teams activities to the registered agent or bot.
- `validDomains`: Allows Teams to load the account-linking dialog. Add the host name from `ACCOUNT_LINKING_URL`, such as `app.contoso.com`, so the dialog can open in Teams.
- `webApplicationInfo.id`: Identifies the app requesting Microsoft tokens. Set it to the same Microsoft Entra application client ID used at runtime to connect the app manifest to the NAA token request.
- `webApplicationInfo.resource`: Identifies the agent API resource. Set the application ID URI, such as `api://botid-${{ENTRA_APP_ID}}`, to associate the Teams app with its protected API.
- `nestedAppAuthInfo.redirectUri`: Registers the trusted NAA broker redirect. Set the SPA redirect to `brk-multihub://<app-host-name>` without a path so Microsoft 365 hosts can broker NAA authentication.
- `nestedAppAuthInfo.scopes`: Declares permissions requested during NAA authentication. Add the exact runtime scopes, such as `User.Read`, to enable token prefetch and Microsoft Entra consent validation.

### Configure Teams SDK authentication

Set the external provider's OAuth connection as the default connection for your agent:

```typescript
import { App, ExpressAdapter } from '@microsoft/teams.apps';

const connectionName = process.env.CONNECTION_NAME || 'Auth0';
const httpServerAdapter = new ExpressAdapter();

const app = new App({
  applicationIdUri: process.env.RESOURCE_URI,
  httpServerAdapter,
  oauth: {
    defaultConnectionName: connectionName,
  },
});
```

- `connectionName`: Identifies the external OAuth connection. Set `CONNECTION_NAME` to the exact name of the OAuth connection configured for the Azure Bot resource; the example uses `Auth0` when the environment variable isn't set.
- `applicationIdUri`: Identifies the protected agent resource. Set `RESOURCE_URI` to the application ID URI configured in Microsoft Entra ID.
- `httpServerAdapter`: Connects the Teams SDK app to the web server. Create an `ExpressAdapter` instance so the app can receive activities and register the account-linking routes on the same server.
- `oauth.defaultConnectionName`: Selects the connection used by `signin()` and token retrieval. Set it to `connectionName` so both operations use the same external identity provider.

Start sign-in when the user sends a message and handle the successful sign-in event:

```typescript
app.on('message', async ({ send, signin, isSignedIn }) => {
  if (!isSignedIn) {
    await send(`Sign in with ${connectionName} to continue.`);
    await signin();
    return;
  }

  await send('You are signed in.');
});

app.event('signin', async ({ send }) => {
  await send('Sign-in succeeded. Complete account linking to use the tab.');
});
```

- `isSignedIn`: Indicates whether the agent user authenticated. Use the value supplied by Teams SDK for the current activity to avoid starting another sign-in for an authenticated user.
- `signin()`: Starts the configured external OAuth sign-in. Call it without a connection name to use `oauth.defaultConnectionName` and authenticate the primary account before account linking.
- `app.event('signin', ...)`: Handles successful external-provider authentication. Register the event handler to notify the user that sign-in succeeded and account linking can continue.

### Return the account-linking URL

You should coordinate independently verified authentication results as follows:

1. Authenticate the user in the agent through the configured Microsoft Entra ID or OAuth connection. Handle `signin.verify-state` to verify the sign-in by exchanging its state code through the configured connection.
1. Create a short-lived, single-use linking session bound to the verified Teams user and channel. Return its app-hosted URL in the invoke response so Teams can open the connected authentication dialog. Include only the session ID in the URL, but not access or ID tokens.
1. In the dialog, use NAA to acquire the user’s Microsoft Entra token and send it with the linking-session ID to the backend over HTTPS.
1. Validate the Microsoft token, linking session, and agent identity.
    - For **Microsoft Entra ID** authentication, confirm that the identities correspond.
    - For **OAuth** authentication, associate the verified OAuth identity with the Microsoft identity.
1. Persist only the identity association or application data required to recognize the user.
1. Consume the linking session once and delete all temporary tokens, codes, and correlation data.

The backend should validate token signatures, issuers, audiences, tenants, expiration, nonces, and scopes as applicable. The example uses an app-defined `createLinkingSession()` helper. The helper should generate a session ID, persist its association with the verified channel and user, set a short expiration, and allow the session to be consumed only once.

```typescript
import { InvokeResponse } from '@microsoft/teams.api';

const accountLinkingUrl = process.env.ACCOUNT_LINKING_URL;

app.on('signin.verify-state', async (context) => {
  const state = context.activity.value.state;
  if (!state) {
    return { status: 404 };
  }

  if (!accountLinkingUrl) {
    context.log.error('ACCOUNT_LINKING_URL is not configured.');
    return { status: 503 };
  }

  try {
    await context.api.users.getToken({
      channelId: context.activity.channelId,
      userId: context.activity.from.id,
      connectionName,
      code: state,
    });
  } catch {
    context.log.error('Failed to verify the sign-in state.');
    return { status: 412 };
  }

  // Bind the linking request to the verified user and conversation.
  const sessionId = createLinkingSession(
    context.activity.channelId,
    context.activity.from.id
  );
  const url = new URL(accountLinkingUrl);
  url.searchParams.set('session', sessionId);

  const response: InvokeResponse<'signin/verifyState'> = { status: 200 };
  Object.assign(response, {
    body: {
      composeExtension: {
        text: url.toString(),
        channelData: { accountLinkingUrl: url.toString() },
      },
    },
  });
  return response;
});
```

- `state`: Supplies the one-time sign-in verification code. Read it from `context.activity.value.state`. Return `404` when it isn't present so the request doesn't continue without a verifiable sign-in state.
- `ACCOUNT_LINKING_URL`: Identifies the app-hosted linking experience. Set it to an HTTPS URL whose host is included in `validDomains`, such as `https://app.contoso.com/authTab`. The example returns `503` when this required server configuration is missing.
- `context.api.users.getToken`: Verifies the completed external-provider sign-in. Set `channelId` and `userId` from the activity, use the configured `connectionName`, and pass `state` as `code`. The example returns `412` when the exchange fails.
- `createLinkingSession`: Correlates linking with the verified user. Pass the activity's channel and user IDs to create the session used by the remaining linking operations.
- `session`: Binds the account-linking dialog to the verified request. Add the generated session ID as a query parameter without placing access tokens or identity tokens in the URL.
- `channelData.accountLinkingUrl`: Opens the connected-authentication dialog in Teams. Set it to the session-specific URL and return it with HTTP `200` in the invoke response.

> [!NOTE]
> The Teams SDK TypeScript definitions currently declare the `signin/verifyState` response body as `void`. The example assigns the connected-authentication response payload after creating a typed invoke response.

### Acquire the Microsoft identity with NAA

Initialize MSAL for NAA for linking accounts. Attempt silent token acquisition first and use an interactive prompt only when required:

```typescript
import { app as teamsApp } from '@microsoft/teams-js';
import {
  InteractionRequiredAuthError,
  createNestablePublicClientApplication,
} from '@azure/msal-browser';

await teamsApp.initialize();

const client = await createNestablePublicClientApplication({
  auth: {
    clientId: naaClientId,
    authority: `https://login.microsoftonline.com/${naaTenantId}`,
    redirectUri: 'brk-multihub://app.contoso.com',
    supportsNestedAppAuth: true,
  },
});

const request = { scopes: ['User.Read'] };
const { accessToken } = await client.acquireTokenSilent(request).catch(
  (error: unknown) => {
    if (error instanceof InteractionRequiredAuthError) {
      return client.acquireTokenPopup(request);
    }

    throw error;
  }
);
```

- `teamsApp.initialize()`: Initializes the account-linking page in the Teams host. Call it before creating the MSAL client so NAA can use the host authentication broker.
- `authority`: Selects the Microsoft Entra tenant for authentication. Replace `naaTenantId` with the tenant ID supported by the app's account configuration.
- `supportsNestedAppAuth`: Enables brokered authentication in Microsoft 365 hosts. Set it to `true` when creating the nestable public client application.
- `acquireTokenSilent`: Attempts authentication without prompting the user. Call it first to reuse the active Microsoft session and cached consent.
- `acquireTokenPopup`: Handles authentication that requires user interaction. Use it when silent acquisition can't satisfy consent, Conditional Access, or reauthentication.

Set the runtime client ID, redirect URI, and scopes to exactly the same values as `webApplicationInfo.id` and `nestedAppAuthInfo` in the App manifest. Any mismatch prevents Teams from serving a prefetched token.

### Complete account linking

Account-linking should complete these operations:

1. Post the NAA token to your backend over HTTPS with the short-lived linking-session ID.
1. Start the identity provider's Authorization Code flow with PKCE for the secondary Microsoft connection.
1. Correlate the authorization request with the linking session using an integrity-protected, single-use value.
1. Exchange the one-time authorization code at the token endpoint.
1. Retrieve the primary identity-provider token with Teams SDK:

   ```typescript
   const primaryToken = await app.api.users.getToken({
     channelId: session.channelId,
     userId: session.userId,
     connectionName,
   });
   ```

   - `channelId`: Selects the channel for the primary token. Use the channel ID stored in the linking session to retrieve the token for the verified conversation.
   - `userId`: Selects the user for the primary token. Use the user ID stored in the linking session to prevent linking another user's token.
   - `connectionName`: Selects the identity-provider token to retrieve. Use the same OAuth connection as the agent sign-in to supply the primary identity for linking.

1. Validate both identities immediately before linking.
1. Call the identity provider's account-linking API.
1. Delete the linking session, temporary token, and authorization code.
1. Return success for linking accounts and close the Teams dialog.

The following table shows example app-hosted endpoints for completing the connected authentication flow:

| Endpoint | Purpose |
| --- | --- |
| `GET /authTab` | Renders the account-linking page for a valid linking session. |
| `POST /api/setAuthToken` | Accepts the NAA token over HTTPS and binds it to the linking session. |
| `GET /api/authorize` | Validates the identity-provider callback and issues a short-lived, single-use authorization code. |
| `POST /api/token` | Exchanges the one-time code for the NAA access token used by the identity provider's custom connection. |
| `POST /api/linkAccounts` | Verifies the primary and secondary identities and links them in the identity provider. |

### Test connected authentication

Test at least the following scenarios:

| Scenario | Expected result |
| --- | --- |
| First agent sign-in | The identity provider authenticates the user and Teams opens the account-linking dialog. |
| Account-linking consent | NAA obtains the requested Microsoft token and the backend links the verified identities. |
| Tab open after linking | The tab authenticates silently with the linked Microsoft identity. |
| Different device with an active Teams session | The linked Microsoft identity authenticates the user even when the original identity-provider session isn't available. |
| User skips linking | The agent remains signed in, but the tab can require its existing sign-in flow. |
| Expired linking session | The backend rejects the request and asks the user to start sign-in again. |
| Concurrent linking attempts | Each attempt remains bound to the correct user, conversation, and one-time correlation value. |
| Revoked consent or Conditional Access | The app requests interaction and handles denial without exposing tokens. |
| Tab sign-in before agent sign-in | The tab authentication should not allow for agent authentication for the user. |

### Troubleshoot connected authentication

| Problem | Resolution |
| --- | --- |
| Teams rejects the account-linking URL | Add the exact host name to `validDomains`, regenerate the app package, and upload the updated package. |
| NAA can't find the application | Ensure that `webApplicationInfo.id`, the runtime client ID, and the Microsoft Entra app registration are the same. |
| NAA doesn't use a prefetched token | Ensure that the client ID, broker redirect, scopes, and optional claims exactly match the runtime request. |
| The identity provider rejects the callback | Register the exact HTTPS account-linking callback and its origin in the provider's application settings. |
| The tab prompts again after successful linking | Verify that the secondary Microsoft identity is linked to the primary account and that the tab uses the NAA connection. |
| Agent remains signed out after tab sign-in | This is expected behavior as tab authentication shouldn;t sign in the agent. |

## Design guidelines and best practices

Follow these guidelines when you design and deploy connected authentication:

- **Keep authentication states independent**: Don't infer the authentication state of the agent from the tab's state.
- **Preserve token boundaries**: Use each token only for its intended resource and audience, and never pass tokens between app capabilities or expose them in URLs.
- **Make account linking clear and optional**: Explain why the Microsoft account is requested and how linking affects the tab. Allow the user to continue or skip linking, and handle cancellation and failure.
- **Isolate account-linking attempts**: Prevent concurrent or replayed requests from linking identities that belong to different users or conversations.
- **Require verified identities**: Don't link accounts based only on identifiers supplied by the client. Require recent authentication for both accounts and validate token issuer, audience, signature, tenant, expiration, nonce, and scopes.
- **Protect authentication endpoints**: Validate the OAuth client at the token endpoint and add cross-site request forgery, replay, rate-limit, and abuse protections.
- **Protect authentication data**: Store linking sessions and one-time codes in an encrypted, durable store with expiration and atomic consumption. Never log access tokens, ID tokens, authorization codes, cookies, or client secrets.
- **Plan for account recovery**: Provide secure account unlinking and recovery, and handle revoked consent without treating the conversational and tab capabilities as sharing one authentication session.
- **Use production infrastructure**: Keep secrets in a managed secret store, rotate them regularly, and use a permanent app-owned HTTPS origin instead of a development tunnel.
- **Complete security review**: Complete threat modeling, privacy review, consent review, and penetration testing before deployment.
- **Keep the agent as the flow entry point**: Start connected authentication from the agent. Don’t treat a successful tab sign-in as proof that the agent is authenticated.

> [!CAUTION]
> The sample implementation used for the code snippets stores linking data in memory and includes a single-pending-session fallback for local testing. Don't use either approach in a concurrent or multi-user deployment.

## Error codes

[Note: Connected authentication doesn't define a standardized set of error codes. The following status and error codes are application-defined responses used in the code sample or responses returned by the configured identity provider.]

Handle these errors appropriately in your agent or app:

**Application responses**

| Status code | Error code | Description | Developer action |
| --- | --- | --- | --- |
| HTTP `400` | Invalid token or request | The token submission, authorization request, authorization code, or account-linking request is invalid. | Validate required values, reject malformed input, and ask the user to restart sign-in when the request can't be recovered. |
| HTTP `404` | Missing sign-in state | The `signin/verifyState` activity doesn't contain the state value required to complete sign-in. | Confirm that the agent starts sign-in through its configured OAuth connection and that the activity includes `value.state`. Ask the user to restart sign-in instead of continuing without state. |
| HTTP `410` | Expired linking session | The account-linking session expired or no longer exists. | Ask the user to restart sign-in from the agent. |
| HTTP `412` | Sign-in state verification failed | Teams SDK couldn't exchange the sign-in state for the identity-provider token. | Verify the OAuth connection name and provider configuration. Treat the state as expired or invalid and ask the user to start a new sign-in attempt. |
| HTTP `500` | Account linking failed | An unexpected error prevented the backend from linking the accounts. | Log a correlation identifier without logging tokens, return a generic failure message, and investigate identity validation, storage, and provider communication before retrying. |
| HTTP `502` | Upstream identity provider rejected request | The backend received an unsuccessful response from the identity provider while processing the account-linking request. | Inspect the upstream status, verify the provider endpoint and request, and retry only if the failure is transient. Don't return provider tokens or sensitive response details to the client. |
| HTTP `503` | Account linking not configured | The backend doesn't have the account-linking URL or external-provider configuration required to link accounts. | Configure `ACCOUNT_LINKING_URL`, the provider domain, OAuth connection, credentials, and account-linking permissions before enabling the flow. |

**Identity-provider responses**

| Status code | Error code | Description | Developer action |
| --- | --- | --- | --- |
| HTTP `401` or `403` | Identity provider authorization failed | The primary identity-provider token has the wrong audience or lacks permission to link identities. | Configure the OAuth connection to request the provider's account-management API audience and identity-linking scopes, then have the user sign in again to obtain a new token. |

## Code sample

<!-- Add the TypeScript sample link when the sample is published. -->

| Sample name | Description | TypeScript |
| --- | --- | --- |
| Connected authentication with Auth0 | This sample shows how to link an agent's Auth0 identity to a Microsoft identity for seamless tab authentication. | Coming soon |

## See also

- [Authenticate users in Microsoft Teams](authentication.md)
- [Add authentication to a Teams agent](../../bots/how-to/authentication/add-authentication.md)
- [Nested app authentication](nested-authentication.md)
- [App manifest schema](/microsoftteams/platform/resources/schema/manifest-schema)
- [Teams SDK documentation](https://microsoft.github.io/teams-sdk/)
- [Auth0 user account linking](https://auth0.com/docs/manage-users/user-accounts/user-account-linking/link-user-accounts)
