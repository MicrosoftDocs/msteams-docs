---
title: Configure OAuth authentication for an agent
description: Learn how to configure an identity provider and Azure Bot OAuth connection for an existing Teams bot without deploying it to Azure App Service.
ms.topic: how-to
ms.localizationpriority: high
ms.date: 10/27/2026
---

# Configure OAuth authentication for an agent

OAuth 2.0 lets your bot access an API, such as Microsoft Graph, on behalf of a user without collecting the user's password. With the Azure Bot Token Service, you configure an identity provider connection, and the service handles token acquisition, storage, and refresh.

Use this article to configure OAuth sign-in for an existing bot. It uses Microsoft Entra ID and the public-cloud OAuth endpoints. For a walkthrough that also creates resources, deploys a sample, and tests it in Teams, see [Tutorial: Add OAuth authentication to a Teams bot](add-authentication.md).

> [!IMPORTANT]
> The Azure Bot Token Service flow requires an **Azure Bot resource**, even if your bot runs locally or is hosted outside Azure. An Azure Bot registration and Azure App Service hosting are separate requirements: you don't need an App Service plan to configure OAuth. A bot created only in Developer Portal doesn't provide the Azure Bot OAuth connection settings used here.

## Prerequisites

- An existing bot and access to its Azure Bot resource. If you don't have a resource, follow [Create Azure Bot resource registration](add-authentication.md#create-azure-bot-resource-registration).
- Permission to register an application in Microsoft Entra ID and configure its credentials and delegated API permissions.
- Access to your bot's configuration so you can set the OAuth connection name.
- A test account that can consent to the required permissions, or help from a tenant administrator when admin consent is required.

## Choose OAuth sign-in or Teams SSO

Teams single sign-on (SSO) builds on OAuth; it isn't a separate authorization protocol.

| Experience | Configuration |
| --- | --- |
| Explicit sign-in through an OAuth card or link | Follow this article. Leave **Token Exchange URL** blank. The user signs in to the identity provider and grants the requested permissions. |
| Teams SSO, with a sign-in prompt when needed | Follow [Configure your app in Microsoft Entra ID](bot-sso-register-aad.md). SSO also requires an exposed API scope, authorized Teams clients, an application ID URI for **Token Exchange URL**, and app manifest configuration. |

The [Bot Auth Quickstart sample](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-auth-quickstart) includes SSO. Complete its SSO configuration if you use that sample; a successful OAuth connection test alone doesn't verify Teams SSO.

## Register the identity-provider application

The bot identity authenticates communication between the bot and the bot service. The identity-provider application authorizes access to an API on behalf of the user. Keep track of which application's credentials each setting requires.

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

## Add an OAuth connection to the Azure Bot resource

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

## Test the connection

1. Open the connection you saved.
1. Select **Test Connection**.
1. Sign in with a test account supported by the identity-provider application.
1. Review the requested permissions and grant consent if allowed.
1. Confirm that **Test Connection to \<your-connection-name> Succeeded** appears.

This test verifies the identity-provider connection. It doesn't verify your bot's messaging endpoint, app installation, or Teams SSO token exchange.

## Use the connection in your bot

Use the exact **Name** saved on the Azure Bot resource when registering the connection in your runtime. The following configuration names are conventions used by the Bot Auth Quickstart sample, not settings that automatically register a flow in every Teams SDK app:

| Bot Auth Quickstart implementation | Connection-name setting |
| --- | --- |
| .NET | `OAuth:ConnectionName` in `BotAuthQuickstart/appsettings.json`. |
| TypeScript (Node.js) | `CONNECTION_NAME` in the sample's environment configuration. |
| Python | `CONNECTION_NAME` in the sample's environment configuration. |

Keep the bot runtime's client ID, credential, and tenant ID associated with the **bot identity**. The identity-provider application's client ID and secret belong in the OAuth connection. Some SSO configurations reuse an app registration; don't assume the two identities are always the same.

### Integrate with Teams SDK 2.1

For an existing bot or Teams agent built with **Teams SDK 2.1**, follow the linked runtime examples below. In each section, select your language and the **SDK 2.1 (current)** tab. Replace the example connection name, such as `graph`, with your saved connection name, such as `BotTeamsOAuth`.

1. [Register the OAuth flow](/microsoftteams/platform/teams-sdk/in-depth-guides/user-authentication#configure-the-oauth-connection) during app initialization. Use `AddOAuthFlow` with `AddTeamsBotApplication` in .NET, `app.addOAuthFlow` in TypeScript, or `app.add_oauth_flow` in Python. Retain or retrieve that flow object for the handlers below. Read any sample-specific connection-name setting in your code and pass its value to the registration API.
1. [Start sign-in](/microsoftteams/platform/teams-sdk/in-depth-guides/user-authentication#signing-in) from a message handler using the flow's `SignInAsync` (.NET), `signIn` (TypeScript), or `sign_in` (Python). If a token is returned, continue the protected operation. Otherwise, the SDK sends an OAuth card; return from the handler instead of calling the protected API without a token.
1. [Handle sign-in completion](/microsoftteams/platform/teams-sdk/in-depth-guides/user-authentication#handling-sign-in-completion) on that flow using `OnSignInComplete` (.NET), `onSignInComplete` (TypeScript), or `@flow.on_signin` (Python). Interactive sign-in completes on a **later turn**, not by waiting inside the original message handler. Use the completion callback to continue with the authenticated user.
1. [Use the token with the API client](/microsoftteams/platform/teams-sdk/in-depth-guides/user-authentication#start-using-the-client). Build the Graph client or authorized HTTP request from the token returned by the selected flow or its completion callback. Use a token for its intended API and granted delegated permissions; don't reuse another connection's token. Never send access tokens to chat or logs.
1. [Implement sign-out](/microsoftteams/platform/teams-sdk/in-depth-guides/user-authentication#signing-out) using the flow's `SignOutAsync` (.NET), `signOut` (TypeScript), or `sign_out` (Python). Sign-out clears the user's cached token for that connection; it doesn't sign the user out of Teams or every identity provider.

If sign-in interrupts an agent's task, [preserve and resume the pending request](/microsoftteams/platform/teams-sdk/in-depth-guides/user-authentication#resuming-pending-messages-after-sign-in). The original message isn't available in the completion turn. Before starting sign-in, store the pending work in application state scoped to the user, conversation, and connection, then retrieve and clear it after successful sign-in. Expire abandoned requests and [handle sign-in failures](/microsoftteams/platform/teams-sdk/in-depth-guides/user-authentication#handling-sign-in-failures) with user-facing feedback.

> [!NOTE]
> The linked Bot Auth Quickstart TypeScript and Python implementations still use legacy SDK 2.0 authentication patterns; Python pins SDK 2.0.15. Don't mix their default-connection configuration with SDK 2.1 flow registration. For sample-specific version details, see [Prepare the bot sample code](add-authentication.md#prepare-the-bot-sample-code). These APIs apply to Teams SDK, not Microsoft 365 Agents SDK or declarative agents.

For a Teams app using the default public-cloud OAuth endpoint, include `token.botframework.com` in the app manifest's `validDomains`. Test sign-in, a protected API call, and sign-out from a personal chat in Teams with the bot's authenticated HTTPS messaging endpoint configured. A successful portal connection test or local Playground message test doesn't validate this runtime integration. If you also enable Teams SSO, verify its token exchange in Teams.

## Troubleshoot OAuth setup

| Symptom | What to check |
| --- | --- |
| The redirect URI is rejected. | Verify that the identity-provider application's **Web** redirect URI exactly matches the token-service redirect URI for your cloud and region. |
| **Test Connection** fails. | Verify the identity-provider client ID, secret value, secret expiration, tenant setting, and configured scopes. Use the error displayed by the provider to identify the failing setting, then test again. |
| The user can't grant consent. | Verify the app's supported account types and delegated permissions. Ask a tenant administrator to grant consent when required. |
| The connection test succeeds, but the bot can't get a user token. | Verify that the bot uses the exact connection name from its own Azure Bot resource and that its runtime credentials identify that bot. |
| OAuth works, but Teams SSO doesn't. | Verify the exposed API scope, authorized Teams clients, **Token Exchange URL**, and `webApplicationInfo` using the [SSO configuration guidance](bot-sso-register-aad.md). |
| Teams can't reach the bot. | Verify the bot's public HTTPS messaging endpoint and Teams channel configuration. A successful connection test doesn't test message delivery. |

## Next step

> [!div class="nextstepaction"]
> [Implement user authentication with Teams SDK](/microsoftteams/platform/teams-sdk/in-depth-guides/user-authentication#configure-the-oauth-connection)

## See also

- [Authenticate users in Microsoft Teams](../../../concepts/authentication/authentication.md)
- [Enable SSO for your app](bot-sso-overview.md)
- [Supported OAuth URLs](/azure/bot-service/ref-oauth-redirect-urls)
- [Get access on behalf of a user](/graph/auth-v2-user)
