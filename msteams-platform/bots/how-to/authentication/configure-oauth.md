---
title: Configure OAuth authentication for Teams bots and agents
description: Learn to configure user-delegated OAuth access for Teams bots and Teams SDK agents with an identity provider, Azure Bot connection, and runtime flow.
ms.topic: how-to
ms.localizationpriority: high
ms.date: 10/30/2026
---

<a name="configure-oauth-authentication-for-a-teams-bot"></a>

# Configure OAuth authentication for Teams bots and agents

OAuth 2.0 lets your bot or conversational agent access an API, such as Microsoft Graph, on behalf of a user without collecting the user's password. For example, an agent can retrieve the signed-in user's profile as part of a task. With the Azure Bot Token Service, you configure an identity provider connection, and the service handles token acquisition, storage, and refresh.

Use this article to configure user-delegated OAuth sign-in for an existing bot or Teams SDK conversational agent. It uses Microsoft Entra ID and the public-cloud OAuth endpoints. For a walkthrough that also creates resources, deploys a sample, and tests it in Teams, see [Tutorial: Add OAuth authentication to a Teams bot](add-authentication.md).

> [!IMPORTANT]
> The Azure Bot Token Service flow requires an **Azure Bot resource**, even if your bot runs locally or is hosted outside Azure. An Azure Bot registration and Azure App Service hosting are separate requirements: you don't need an App Service plan to configure OAuth. A bot created only in Developer Portal doesn't provide the Azure Bot OAuth connection settings used here.

For a Teams SDK agent, the Azure Bot resource and bot identity are the registration and service credentials used by the agent's Teams messaging endpoint. This article uses **bot identity** for that service identity, not an identity acting autonomously as an agent. The OAuth connection provides access on behalf of a signed-in user; it doesn't grant app-only permissions or configure Microsoft Entra agent identities.

## Prerequisites

- An existing bot or Teams SDK conversational agent and access to its Azure Bot resource. If you don't have a resource, follow [Create Azure Bot resource registration](add-authentication.md#create-azure-bot-resource-registration).
- Permission to register an application in Microsoft Entra ID and configure its credentials and delegated API permissions.
- Access to your app's configuration and handlers so you can register the OAuth flow and handle sign-in completion. The runtime guidance below targets Teams SDK 2.1.
- A test account that can consent to the required permissions, or help from a tenant administrator when admin consent is required.

## User experience

When a user requests an operation that needs access to their data, your app checks for a token. If sign-in is required, the bot or agent sends an OAuth card or link and explains which operation requires access. The user opens the sign-in experience, authenticates with the identity provider, and grants the requested permissions if permitted by tenant policy.

After sign-in, the SDK notifies your app on a later turn. Your completion handler can resume an agent's pending task if you stored it before starting sign-in; the SDK doesn't automatically resume the agent's task or tool call. Subsequent requests can use a cached token until authentication is required again. Signing out clears the connection's cached user token; it doesn't sign the user out of Teams.

Teams SSO can avoid the explicit sign-in experience when token exchange succeeds. Consent or another interaction can still be required. Choose the experience before configuring the connection.

## Developer experience

1. [Choose OAuth sign-in or Teams SSO](#choose-oauth-sign-in-or-teams-sso) to determine whether token-exchange configuration is required.
1. [Register the identity-provider application](#register-the-identity-provider-application) with the token-service redirect URI, credentials, and delegated permissions.
1. [Add an OAuth connection to the Azure Bot resource](#add-an-oauth-connection-to-the-azure-bot-resource) using the identity-provider app's settings.
1. [Test the connection](#test-the-connection) to verify sign-in and consent with the provider.
1. [Use the connection in your bot or agent](#use-the-connection-in-your-bot-or-agent) to register a runtime flow, handle sign-in completion, call the API, and sign out.

## Implement OAuth authentication

The core setup consists of an identity-provider app, an OAuth connection on your Azure Bot resource, and a runtime flow that uses that connection. Use your existing hosting environment; no App Service plan is required. Apply runtime changes through your app's existing build and deployment process.

### Choose OAuth sign-in or Teams SSO

Teams single sign-on (SSO) builds on OAuth; it isn't a separate authorization protocol.

| Experience | Configuration |
| --- | --- |
| Explicit sign-in through an OAuth card or link | Follow this article. Leave **Token Exchange URL** blank. The user signs in to the identity provider and grants the requested permissions. |
| Teams SSO, with a sign-in prompt when needed | Follow [Configure your app in Microsoft Entra ID](bot-sso-register-aad.md). SSO also requires an exposed API scope, authorized Teams clients, an application ID URI for **Token Exchange URL**, and app manifest configuration. |

The [Bot Auth Quickstart sample](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-auth-quickstart) includes SSO. Complete its SSO configuration if you use that sample; a successful OAuth connection test alone doesn't verify Teams SSO.

### Register the identity-provider application

The bot identity authenticates communication between the bot and the bot service. The identity-provider application authorizes access to an API on behalf of the user. Keep track of which application's credentials each setting requires.

For the steps below, register a separate identity-provider app and leave the existing bot identity unchanged. If you already have an app configured for this purpose, verify its redirect URI, credentials, account audience, and permissions instead of creating another registration.

1. Open [Microsoft Entra ID in the Azure portal](https://portal.azure.com).
1. Select **App registrations** > **New registration**.
1. Enter a name and select the **Supported account types** for the users you want to support.
1. For **Redirect URI**, select **Web** and enter `https://token.botframework.com/.auth/web/redirect`.
1. Select **Register**.
1. On **Overview**, record the **Application (client) ID** and **Directory (tenant) ID**.
1. Select **Certificates & secrets** > **Client secrets** > **New client secret**.
1. Enter a description, choose an expiration, and select **Add**.
1. Copy the secret **Value**, not the secret ID, and store it securely. The value isn't displayed again after you leave the page.
1. Select **API permissions** > **Add a permission** > **Microsoft Graph** > **Delegated permissions**.
1. Add only the permissions your bot needs. For example, use `User.Read` to read the signed-in user's profile. Arrange admin consent if the permission or tenant policy requires it.

> [!NOTE]
> Regional and sovereign-cloud bots can require different redirect and OAuth URLs. Use the matching endpoints in [Supported OAuth URLs](/azure/bot-service/ref-oauth-redirect-urls). The redirect URI belongs to the token service, not your bot's messaging endpoint.

### Add an OAuth connection to the Azure Bot resource

1. Open your **Azure Bot resource** in the [Azure portal](https://portal.azure.com), not the Microsoft Entra app registration.
1. Select **Settings** > **Configuration** > **Add OAuth Connection Settings**.
1. Configure the connection:

    | Field | Value |
    | --- | --- |
    | **Name** | A connection name, such as `BotTeamsOAuth`. Use this exact name in your bot configuration. |
    | **Service Provider** | **Azure Active Directory v2**, the Microsoft Entra ID v2 provider. |
    | **Client id** | The application (client) ID of the identity-provider application you registered. |
    | **Client secret** | The secret **Value** from that application. Don't enter the secret ID or credentials from a different application. |
    | **Token Exchange URL** | Leave blank for explicit OAuth sign-in. For Teams SSO, use the application ID URI as described in the [SSO configuration guidance](bot-sso-register-aad.md#configure-oauth-connection). |
    | **Tenant ID** | For a single-tenant identity-provider app, use its directory (tenant) ID. For a multitenant identity-provider app, use `common` to support its configured account audience. This field is separate from the bot runtime's tenant ID. |
    | **Scopes** | A case-sensitive, space-separated list of required delegated permissions, such as `User.Read`. Match the permissions configured for the identity-provider app. |

1. Select **Save**.

For other identity providers, select the appropriate **Service Provider** and supply its required fields. The Microsoft Entra-specific fields in this procedure don't apply to every provider.

> [!CAUTION]
> Keep secrets and access tokens out of source control, screenshots, chat messages, and logs. Replace expiring credentials before they expire, and update the OAuth connection when you replace its client secret.

### Test the connection

1. Open the connection you saved.
1. Select **Test Connection**.
1. Sign in with a test account supported by the identity-provider application.
1. Review the requested permissions and grant consent if allowed.
1. Confirm that **Test Connection to \<your-connection-name> Succeeded** appears.

This test verifies the identity-provider connection. It doesn't verify your bot's messaging endpoint, app installation, or Teams SSO token exchange.

<a name="use-the-connection-in-your-bot"></a>

### Use the connection in your bot or agent

Use the exact **Name** saved on the Azure Bot resource when registering the connection in your runtime. The following configuration names are conventions used by the Bot Auth Quickstart sample, not settings that automatically register a flow in every Teams SDK app:

| Bot Auth Quickstart implementation | Connection-name setting |
| --- | --- |
| .NET | `OAuth:ConnectionName` in `BotAuthQuickstart/appsettings.json`. |
| TypeScript (Node.js) | `CONNECTION_NAME` in the sample's environment configuration. |
| Python | `CONNECTION_NAME` in the sample's environment configuration. |

Keep the bot runtime's client ID, credential, and tenant ID associated with the **bot identity**. The identity-provider application's client ID and secret belong in the OAuth connection. Some SSO configurations reuse an app registration; don't assume the two identities are always the same.

#### Integrate with Teams SDK 2.1

For an existing bot or conversational agent built with **Teams SDK 2.1**, follow the linked runtime examples below. In each section, select your language and the **SDK 2.1 (current)** tab. Replace the example connection name, such as `graph`, with your saved connection name, such as `BotTeamsOAuth`.

1. [Register the OAuth flow](/microsoftteams/platform/teams-sdk/in-depth-guides/user-authentication#configure-the-oauth-connection) during app initialization. Use `AddOAuthFlow` with `AddTeamsBotApplication` in .NET, `app.addOAuthFlow` in TypeScript, or `app.add_oauth_flow` in Python. Retain or retrieve that flow object for the handlers below. Read any sample-specific connection-name setting in your code and pass its value to the registration API.
1. [Start sign-in](/microsoftteams/platform/teams-sdk/in-depth-guides/user-authentication#signing-in) from a message handler using the flow's `SignInAsync` (.NET), `signIn` (TypeScript), or `sign_in` (Python). If a token is returned, continue the protected operation. Otherwise, the SDK sends an OAuth card; return from the handler instead of calling the protected API without a token.
1. [Handle sign-in completion](/microsoftteams/platform/teams-sdk/in-depth-guides/user-authentication#handling-sign-in-completion) on that flow using `OnSignInComplete` (.NET), `onSignInComplete` (TypeScript), or `@flow.on_signin` (Python). Interactive sign-in completes on a **later turn**, not by waiting inside the original message handler. Use the completion callback to continue with the authenticated user.
1. [Use the token with the API client](/microsoftteams/platform/teams-sdk/in-depth-guides/user-authentication#start-using-the-client). Build the Graph client or authorized HTTP request from the token returned by the selected flow or its completion callback. Use a token for its intended API and granted delegated permissions; don't reuse another connection's token. Never send access tokens to chat or logs.
1. [Implement sign-out](/microsoftteams/platform/teams-sdk/in-depth-guides/user-authentication#signing-out) using the flow's `SignOutAsync` (.NET), `signOut` (TypeScript), or `sign_out` (Python). Sign-out clears the user's cached token for that connection; it doesn't sign the user out of Teams or every identity provider.

If sign-in interrupts an agent's task, preserve it before starting sign-in and resume it in the completion callback. See [Design guidelines and best practices](#design-guidelines-and-best-practices) for state scoping and cleanup.

For an agent, keep the authenticated API call in application code, such as a tool handler, rather than passing the access token to the language model. Select the OAuth flow for the intended API and current user before executing that call. If no token is available, pause the protected operation and start sign-in; don't substitute another user's token or continue with unauthenticated access.

For a Teams app using the default public-cloud OAuth endpoint, include `token.botframework.com` in the app manifest's `validDomains`. Test sign-in, a protected API call, and sign-out from a personal chat in Teams with the bot's authenticated HTTPS messaging endpoint configured. A successful portal connection test or local Playground message test doesn't validate this runtime integration. If you also enable Teams SSO, [verify its token exchange in Teams](add-authentication.md#verify-teams-sso-token-exchange).

For an agent adaptation, also verify the following behaviors in Teams:

- While signed out, request a task that needs delegated access. Complete sign-in and confirm that the task resumes for the correct user, conversation, and OAuth connection.
- Cancel or fail sign-in and confirm that no protected API call runs, the user receives feedback, and abandoned pending work is cleared or expires.
- Test with two users and confirm that tokens and pending tasks aren't shared between them. After sign-out, request another protected operation and confirm that the app obtains a valid token through the configured flow before proceeding.

<a name="troubleshoot-oauth-setup"></a>

## Handle errors

The identity provider can report errors during connection testing or user sign-in. The following codes are documented in the [Microsoft identity platform authorization code flow](/entra/identity-platform/v2-oauth2-auth-code-flow#error-codes-for-token-endpoint-errors). They aren't Teams SDK error codes, and the portal or SDK might wrap the provider's response. No fixed HTTP status is asserted here because the visible response depends on the failing endpoint and how it is surfaced.

| Status code | Error code | Description | Developer action |
| --- | --- | --- | --- |
| Provider-dependent | `invalid_client` | Client authentication failed. | Verify the OAuth connection's identity-provider client ID and secret value. Replace invalid or expired credentials and test again. |
| Provider-dependent | `invalid_scope` | The requested scope is invalid. | Correct the OAuth connection's scopes to match the provider's supported delegated permissions. |
| Provider-dependent | `consent_required` | The requested permissions require consent. | Start interactive sign-in with the intended permissions and arrange administrator consent when required. |
| Provider-dependent | `interaction_required` | Authentication requires user interaction. | Start the SDK's interactive sign-in flow and handle completion on a later turn instead of repeatedly retrying silently. |

Use the following checks when a provider code isn't available or the failure occurs elsewhere in the flow.

| Symptom | What to check |
| --- | --- |
| The redirect URI is rejected. | Verify that the identity-provider application's **Web** redirect URI exactly matches the token-service redirect URI for your cloud and region. |
| **Test Connection** fails. | Verify the identity-provider client ID, secret value, secret expiration, tenant setting, and configured scopes. Use the error displayed by the provider to identify the failing setting, then test again. |
| The user can't grant consent. | Verify the app's supported account types and delegated permissions. Ask a tenant administrator to grant consent when required. |
| The connection test succeeds, but the bot can't get a user token. | Verify that the bot uses the exact connection name from its own Azure Bot resource and that its runtime credentials identify that bot. |
| Sign-in succeeds, but the agent's task doesn't resume. | Verify that pending work was saved before sign-in and retrieved by the completion callback for the same user, conversation, and connection. Don't wait for interactive sign-in inside the original handler. |
| OAuth works, but Teams SSO doesn't. | Verify the exposed API scope, authorized Teams clients, **Token Exchange URL**, and `webApplicationInfo` using the [SSO configuration guidance](bot-sso-register-aad.md). |
| Teams can't reach the bot. | Verify the bot's public HTTPS messaging endpoint and Teams channel configuration. A successful connection test doesn't test message delivery. |

Handle cancellation and [sign-in failures](/microsoftteams/platform/teams-sdk/in-depth-guides/user-authentication#handling-sign-in-failures) with a user-facing explanation and a way to retry. Don't continue a protected operation without a token or record secrets in diagnostic output.

## Code sample

The Bot Auth Quickstart demonstrates sign-in, Microsoft Graph profile retrieval, and sign-out. It includes Teams SSO configuration beyond the explicit OAuth setup in this article. Use its authentication flow as a foundation for a Teams SDK agent; the command-based sample doesn't demonstrate agent orchestration or automatic task resumption.

| Sample name | Description | .NET | TypeScript | Python |
| --- | --- | --- | --- | --- |
| Bot Auth Quickstart | Authenticate a user and retrieve their profile from Microsoft Graph. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-auth-quickstart/dotnet/bot-auth-quickstart) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-auth-quickstart/nodejs/bot-auth-quickstart) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-auth-quickstart/python/bot-auth-quickstart) |

The .NET sample uses Teams SDK 2.1. The TypeScript and Python implementations use legacy SDK 2.0 authentication patterns; Python pins SDK 2.0.15. Don't mix their default-connection configuration with SDK 2.1 flow registration. For version-specific configuration and startup instructions, see [Prepare the bot sample code](add-authentication.md#prepare-the-bot-sample-code). Use the linked SDK 2.1 runtime examples for a current implementation in your existing app.

## Design guidelines and best practices

- Request only the delegated permissions needed for the user's operation. Explain why sign-in is needed before starting the flow, and handle tenant policies that require administrator consent.
- Keep bot identity credentials in the bot runtime and identity-provider credentials in the OAuth connection. Use the exact saved connection name when registering the SDK flow.
- Use a token only for its intended API and granted permissions. Let the token service manage acquisition, storage, and refresh rather than exposing tokens to users or adding a separate refresh-token store.
- If an agent must [resume a pending request](/microsoftteams/platform/teams-sdk/in-depth-guides/user-authentication#resuming-pending-messages-after-sign-in), store the pending work before starting sign-in. Scope it to the user, conversation, and connection because the original message isn't available on the completion turn. Retrieve and clear it after success, and expire or clear abandoned work after cancellation or failure.
- Keep access tokens and credentials out of model prompts, conversation history, and tool results. Return only the API data needed for the user's task, subject to your app's data-handling rules. Authentication establishes access; it doesn't replace application authorization or confirmation for consequential actions.
- Provide clear sign-out feedback. Explain that signing out of a connection doesn't sign the user out of Teams or revoke all consent at the identity provider.

## Limitations and known issues

- This guide covers user-delegated access through the Azure Bot Token Service, not app-only access or agent identity authentication. The runtime APIs apply to Teams SDK, not Microsoft 365 Agents SDK or declarative agents.
- An Azure Bot resource is required for this connection flow, regardless of hosting location. Core OAuth configuration doesn't require Azure App Service hosting.
- The procedure uses Microsoft Entra ID and public-cloud endpoints. Other providers have different fields; regional and sovereign-cloud deployments require their supported OAuth endpoints.
- A successful portal connection test doesn't validate runtime integration, Teams installation, or SSO. Profile retrieval through interactive OAuth fallback isn't proof of successful Teams SSO token exchange.
- Teams SSO requires additional API, client preauthorization, token-exchange, and manifest configuration. When using separate bot and authentication registrations, follow [Configure SSO with a separate authentication app](bot-sso-register-aad.md#configure-sso-with-a-separate-authentication-app).

## Next step

> [!div class="nextstepaction"]
> [Implement user authentication with Teams SDK](/microsoftteams/platform/teams-sdk/in-depth-guides/user-authentication#configure-the-oauth-connection)

## See also

- [Authenticate users in Microsoft Teams](../../../concepts/authentication/authentication.md)
- [Enable SSO for your app](bot-sso-overview.md)
- [Agentic identity with Teams SDK](/microsoftteams/platform/teams-sdk/in-depth-guides/agentic-identity)
- [Supported OAuth URLs](/azure/bot-service/ref-oauth-redirect-urls)
- [Get access on behalf of a user](/graph/auth-v2-user)
