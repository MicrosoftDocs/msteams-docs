---
title: Review or Update Agent Runtime Authentication Configuration
description: Agent runtime authentication for Teams agents uses client secrets or managed identities. Learn how to review and update credentials for Bot Connector.
ms.date: 10/14/2026
ms.topic: feature-guide
zone_pivot_groups: teams-sdk-languages
---

# Review or update agent runtime authentication configuration

To interact with Teams, an agent's runtime must authenticate to Bot Connector. The agent authenticates using credentials associated with the Entra ID app registration that is linked to the agent's Bot Connector registration.

The configuration described in this article is related only to agent runtime authentication that is required of all Teams agents. For information about configuring and implementing single sign-on (SSO) or OAuth to authenticate users of an agent and allow them to delegate permissions, see [Authenticate users in Microsoft Teams](../concepts/authentication/authentication.md).

The project creation workflow supported by Teams CLI creates all of the configuration covered here. This article can help you to inspect or modify it as needed.

## Supported credential types

Teams agent runtimes can authenticate to Bot Connector using two different kinds of credentials:

- **Client secret**: A client secret (sometimes called an application password) is configured in the environment variables of the runtime's hosting environment, or in the runtime's deployed configuration file.
- **Managed identities for Azure resources**: Requires the agent runtime to be hosted in Azure. The runtime authenticates using a credential securely associated with its Azure hosting environment. Managed identity eliminates the need to handle and secure a client secret. See [Managed identities for Azure resources](/entra/identity/managed-identities-azure-resources/overview) for general information.

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
| Client secret                                                               | CLIENT_ID=\<app ID\><br>CLIENT_SECRET=\<client secret\><br>TENANT_ID=\<Entra tenant ID\>                          |
| System-assigned Azure managed identity (via federated identity credentials) | CLIENT_ID=\<app ID\><br>MANAGED_IDENTITY_CLIENT_ID=system<br>TENANT_ID=<Entra tenant ID\>                         |
| User-assigned Azure managed identity (via federated identity credentials)   | CLIENT_ID=\<app ID\><br>MANAGED_IDENTITY_CLIENT_ID=\<managed identity client ID\><br>TENANT_ID=<Entra tenant ID\> |

::: zone-end

::: zone pivot="teams-sdk-csharp"

Beginning with version 2.1, Teams SDK for .NET authenticates to Bot Connector using the [Microsoft Authentication Library](/entra/identity-platform/msal-overview). Configure credentials in your agent's appsettings.json file using the [standard Microsoft.Identity.Web configuration structure.](/entra/msidweb/authentication/credentials-overview).

Examples:

# [Client secret](#tab/client-secret)

```json
{
  "AzureAd": {
    "ClientId": <app id>,
    "TenantId": <tenant id>,
    "ClientCredentials": [
      {
        "SourceType": "ClientSecret",
        "ClientSecret": <client secret>>
      }
    ]
  }
}
```

# [System-assigned managed identity](#tab/sami)

```json
{
  "AzureAd": {
    "ClientId": <app id>,
    "TenantId": <tenant id>,
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
    "ClientId": "your-app-client-id-here",
    "TenantId": "your-tenant-id",
    "ClientCredentials": [
      {
        "SourceType": "SignedAssertionFromManagedIdentity",
        "ManagedIdentityClientId": <managed identity client id>
      }
    ]
  }P
}
```

---

::: zone-end

## Legacy user-assigned managed identity configuration

For agents that use an Azure AI Bot Service resource to register with Bot Connector, Bot Service offers a legacy bot type option, **User-Assigned Managed Identity**, that links it directly with an Azure user-assigned managed identity instead of an Entra ID app registration. New agent development that uses a Bot Service resource should specify the **Single Tenant** bot type, and use Entra ID federated identity credentials if runtime authentication using a user-assigned managed identity is desired.

::: zone pivot="teams-sdk-typescript,teams-sdk-python"

To configure an agent for use with a Bot Service resource that uses the legacy User-Assigned Managed Identity bot type, set only

::: zone-end

::: zone pivot="teams-sdk-csharp"

::: zone-end

## Bot Connector authentication troubleshooting

TODO copy from <https://microsoft.github.io/teams-sdk/teams/app-authentication/troubleshooting#error-examples>

## See also

For more information about how Teams SDK authenticates inbound communications from Bot Connector, see [Teams SDK incoming request authentication](incoming-request-authentication.md).
