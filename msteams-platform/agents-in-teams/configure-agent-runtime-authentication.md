---
title: Review or Update Agent Runtime Authentication Configuration
description: Agent runtime authentication for Teams agents uses client secrets or managed identities. Learn how to review and update credentials for Bot Connector.
ms.date: 10/18/2026
ms.topic: feature-guide
zone_pivot_groups: teams-sdk-languages
---

# Review or update agent runtime authentication configuration

To interact with Teams, an agent's runtime must authenticate to Bot Connector. The agent authenticates using credentials configured on the Entra ID app registration that is linked to its Bot Connector registration.

The configuration described in this article is related only to agent runtime authentication that is required of all Teams agents. For information about configuring and implementing single sign-on (SSO) or OAuth to authenticate users of an agent and allow them to delegate permissions, see [Authenticate users in Microsoft Teams](../concepts/authentication/authentication.md).

The project creation workflow supported by the Teams developer CLI creates all of the configuration covered here. This article can help you to inspect or modify it as needed.

## Supported credential types

::: zone pivot="teams-sdk-typescript,teams-sdk-python"

Teams agent runtimes can authenticate to Bot Connector using two different kinds of credentials:

- **Client secret**: A client secret (sometimes called an application password) is configured in the environment variables of the runtime's hosting environment, or in the runtime's deployed configuration file.
- **Managed identities for Azure resources**: Requires the agent runtime to be hosted in Azure. The runtime authenticates using a credential securely associated with its Azure hosting environment. Managed identity eliminates the need to handle and secure a client secret. See [Managed identities for Azure resources](/entra/identity/managed-identities-azure-resources/overview) for general information.

::: zone-end

::: zone pivot="teams-sdk-csharp"

Beginning with version 2.1, Teams SDK for .NET authenticates to Bot Connector using the [Microsoft Authentication Library](/entra/identity-platform/msal-overview) (MSAL) and can use any of its supported credential types. See [Supported credential types](/entra/msidweb/authentication/credentials-overview) for more information.

::: zone-end

By default, new agents created using the Teams developer CLI or the Teams Developer Portal are configured for client secret authentication. For agent runtimes hosted on an Azure compute service, such as Azure App Service, Azure Kubernetes Service, or Azure Virtual Machines, updating your configuration to use a managed identity instead is strongly recommended.

## Review or update configuration

### Configure the Entra ID app registration

To review or update the credentials configured on the agent's Entra ID app registration, see [Add and manage app credentials in Microsoft Entra ID](/entra/identity-platform/how-to-add-credentials).

To use a managed identity for authentication, follow the linked instructions to configure it as a federated credential.

Client secrets for an app registration can also be created in Teams Developer Portal or via `teams app auth secret create`.

### Runtime configuration

::: zone pivot="teams-sdk-typescript,teams-sdk-python"

Teams SDK reads runtime configuration information from environment variables. By default, the Teams developer CLI creates projects that will load these values from a `.env` file on startup.

Set environment variables as follows, depending on the type of authentication credential used:

| Authentication type                                                         | Variables                                                                                                         |
|-----------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------|
| Client secret                                                               | `CLIENT_ID=<app registration client ID>`<br>`CLIENT_SECRET=<client secret>`<br>`TENANT_ID=<Entra tenant ID>`                          |
| System-assigned Azure managed identity (via federated identity credentials) | `CLIENT_ID=<app registration client ID>`<br>`MANAGED_IDENTITY_CLIENT_ID=system`<br>`TENANT_ID=<Entra tenant ID>`                         |
| User-assigned Azure managed identity (via federated identity credentials)   | `CLIENT_ID=<app registration client ID>`<br>`MANAGED_IDENTITY_CLIENT_ID=<managed identity client ID>`<br>`TENANT_ID=<Entra tenant ID>` |

::: zone-end

::: zone pivot="teams-sdk-csharp"

Beginning with version 2.1, Teams SDK for .NET uses the [standard Microsoft.Identity.Web configuration structure](/entra/msidweb/authentication/credentials-overview) in an appsettings.json file for credential configuration.

Examples:

# [Client secret](#tab/client-secret)

```json
{
  "AzureAd": {
    "ClientId": <app registration client ID>,
    "TenantId": <tenant ID>,
    "ClientCredentials": [
      {
        "SourceType": "ClientSecret",
        "ClientSecret": <client secret>
      }
    ]
  }
}
```

# [System-assigned managed identity](#tab/sami)

```json
{
  "AzureAd": {
    "ClientId": <app registration client ID>,
    "TenantId": <tenant ID>,
    "ClientCredentials": [
      {
        "SourceType": "SignedAssertionFromManagedIdentity"
      }
    }
  }
}
```

# [User-assigned managed identity](#tab/uami)

```json
{
  "AzureAd": {
    "ClientId": <app registration client ID>,
    "TenantId": <tenant ID>,
    "ClientCredentials": [
      {
        "SourceType": "SignedAssertionFromManagedIdentity",
        "ManagedIdentityClientId": <managed identity client ID>
      }
    ]
  }
}
```

---

::: zone-end

## Legacy user-assigned managed identity configuration

::: zone pivot="teams-sdk-typescript,teams-sdk-python"

Agents that use an Azure AI Bot Service resource configured with the legacy **User-Assigned Managed Identity** bot type require the following environment variables:

```text
CLIENT_ID=<app registration client ID>
TENANT_ID=<Entra tenant ID>
```

::: zone-end

::: zone pivot="teams-sdk-csharp"

Agents that use an Azure AI Bot Service resource configured with the legacy **User-Assigned Managed Identity** bot type require the following configuration:

```json
{
  "AzureAd": {
    "ClientId": "your-client-id-here",
    "TenantId": "your-tenant-id"
  }
}
```

::: zone-end

For more information about Bot Service bot type, see [About Azure AI Bot Service bot type](choose-agent-registration-type.md#about-azure-ai-bot-service-bot-type).

## Bot Connector authentication troubleshooting

### Missing service principal in tenant

This error occurs when the application has a single-tenant Azure Bot Service (`msaAppType: 'SingleTenant'`) instance, but your app registration has not yet been linked to a Service Principal in the tenant.

::: zone pivot="teams-sdk-csharp"

```console
[ERROR] Echobot Failed to get bot token on app startup.
[ERROR] Echobot {
[ERROR] Echobot   "error": "invalid_client",
[ERROR] Echobot   "error_description": "AADSTS7000229: The client application 00001111-aaaa-2222-bbbb-3333cccc4444 is missing service principal in the tenant aaaabbbb-0000-cccc-1111-dddd2222eeee. See instructions here: https://go.microsoft.com/fwlink/?linkid=2225119 Trace ID: 0000aaaa-11bb-cccc-dd22-eeeeee333333 Correlation ID: aaaa0000-bb11-2222-33cc-444444dddddd Timestamp: 2025-09-18 02:26:20Z",
[ERROR] Echobot   "error_codes": [
[ERROR] Echobot     7000229
[ERROR] Echobot   ],
[ERROR] Echobot   "timestamp": "2025-09-18 02:26:20Z",
[ERROR] Echobot   "trace_id": "0000aaaa-11bb-cccc-dd22-eeeeee333333",
[ERROR] Echobot   "correlation_id": "aaaa0000-bb11-2222-33cc-444444dddddd",
[ERROR] Echobot   "error_uri": "https://login.microsoftonline.com/error?code=7000229"
[ERROR] Echobot }
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

```console
[ERROR] @teams/app Request failed with status code 401
[ERROR] @teams/app /aaaabbbb-0000-cccc-1111-dddd2222eeee/oauth2/v2.0/token
[ERROR] @teams/app {
[ERROR] @teams/app   "error": "invalid_client",
[ERROR] @teams/app   "error_description": "AADSTS7000229: The client application 00001111-aaaa-2222-bbbb-3333cccc4444 is missing service principal in the tenant aaaabbbb-0000-cccc-1111-dddd2222eeee. See instructions here: https://go.microsoft.com/fwlink/?linkid=2225119 Trace ID: 0000aaaa-11bb-cccc-dd22-eeeeee333333 Correlation ID: aaaa0000-bb11-2222-33cc-444444dddddd Timestamp: 2025-09-18 01:17:37Z",
[ERROR] @teams/app   "error_codes": [
[ERROR] @teams/app     7000229
[ERROR] @teams/app   ],
[ERROR] @teams/app   "timestamp": "2025-09-18 01:17:37Z",
[ERROR] @teams/app   "trace_id": "0000aaaa-11bb-cccc-dd22-eeeeee333333",
[ERROR] @teams/app   "correlation_id": "aaaa0000-bb11-2222-33cc-444444dddddd",
[ERROR] @teams/app   "error_uri": "https://login.microsoftonline.com/error?code=7000229"
[ERROR] @teams/app }
```

::: zone-end

::: zone pivot="teams-sdk-python"

```console
[ERROR] @teams/app Failed to refresh bot token: Client error '401 Unauthorized' for url 'https://login.microsoftonline.com/aaaabbbb-0000-cccc-1111-dddd2222eeee/oauth2/v2.0/token'
[ERROR] @teams/app For more information check: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401
```

::: zone-end

To solve this problem, create a service principal:

1. **Sign in to Azure Portal**
   Go to [https://portal.azure.com](https://portal.azure.com) and log in with your Azure account.

2. **Navigate to App Registrations**
   In the top search bar, search for **App registrations** and select it.

3. **Search for your application**
   Use the **BOT_ID** from your environment file:
   - Local development → `env/.env.local`
   - Azure deployment → `env/.env.dev`

4. **Check if a Service Principal exists**
   Open the app registration and verify if a Service Principal is created. If it exists already, you should see an entry for a **Managed Application in your local directory**.

   ![Screenshot of App Registrations pane in Azure Portal showing value of 'Graphlocal' under the 'Managed application in local directory' field.](/screenshots/existing-service-principal.png)

5. **Create a Service Principal if missing**
   If it doesn't exist, click **Create Service Principal**. Wait for the page to finish loading.

   ![Screenshot of App Registrations pane in Azure Portal showing value of 'Create Service Principal' under the 'Managed application in local directory' field.](/screenshots/create-service-principal.png)

6. **Restart your app**
   Once the Service Principal is created, restart your application.

## See also

For more information about how Teams SDK authenticates inbound communications from Bot Connector, see [Teams SDK incoming request authentication](incoming-request-authentication.md).
