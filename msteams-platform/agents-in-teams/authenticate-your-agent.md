---
title: Authenticate Your Agent with Microsoft Entra ID
description: Configure your Teams SDK agent to authenticate with Microsoft Entra ID using a client secret, a user-assigned managed identity, or federated identity credentials.
ms.topic: how-to
zone_pivot_groups: teams-sdk-languages
ms.date: 10/07/2026
---

# Authenticate your agent with Microsoft Entra ID

Your agent must authenticate with Microsoft Entra ID to send messages to Teams. This authentication proves to the Bot Connector service that your app service is allowed to send messages as your registered agent.

This article covers how your agent proves *its own* identity. It doesn't cover signing a user in to your agent. For user sign-in, see [Authentication in Teams agents](../bots/how-to/authentication/add-authentication.md).

> [!NOTE]
> Before you configure your app, create the corresponding resources in Microsoft Entra ID and Azure. The credential you configure here must match the credential registered on your agent's Bot Connector registration.

## Authentication methods

Teams SDK supports three ways for an agent to authenticate:

| Method | Description | When to use it |
| --- | --- | --- |
| Client secret | Password-based authentication using a client secret. | Local development and simple deployments. Secrets expire and must be rotated. |
| User-assigned managed identity | Passwordless authentication using an Azure managed identity. | Production workloads running on Azure compute. No secrets to store or rotate. |
| Federated identity credentials | Identity federation that assigns a managed identity directly to your app registration. | Production workloads that need app registration features, such as resource-specific consent, alongside passwordless authentication. |

Prefer a passwordless method for production. A client secret is a long-lived credential that has to be stored, distributed, and rotated, and it's the most common cause of agent outages when it silently expires.

## Configuration reference

::: zone pivot="teams-sdk-csharp"

The C# SDK uses the Microsoft Authentication Library (MSAL) with standard ASP.NET Core configuration. You can authenticate your agent with any supported Microsoft Entra authentication solution by configuring the app according to the [`Microsoft.Identity.Web` credential format](/entra/msidweb/authentication/credentials-overview#configure-credentials-in-appsettingsjson).

For SDK 2.1, use the `AzureAd` configuration section. The C# examples below show `appsettings.json`; use user secrets or another secure ASP.NET Core configuration provider for actual credentials.

::: zone-end

::: zone pivot="teams-sdk-typescript"

The SDK detects which authentication method to use from the environment variables you set:

| `CLIENT_ID` | `CLIENT_SECRET` | `MANAGED_IDENTITY_CLIENT_ID` | Authentication method |
| --- | --- | --- | --- |
| Not set | | | No authentication. Local development only. |
| Set | Set | | Client secret |
| Set | Not set | | User-assigned managed identity |
| Set | Not set | Set, same as `CLIENT_ID` | User-assigned managed identity |
| Set | Not set | Set, different from `CLIENT_ID` | Federated identity credentials, user-assigned managed identity |
| Set | Not set | `system` | Federated identity credentials, system-assigned identity |

Set `TENANT_ID` to the tenant where your agent is registered when using these variables.

::: zone-end

::: zone pivot="teams-sdk-python"

The SDK detects which authentication method to use from the environment variables you set:

| `CLIENT_ID` | `CLIENT_SECRET` | `MANAGED_IDENTITY_CLIENT_ID` | Authentication method |
| --- | --- | --- | --- |
| Not set | | | No authentication. Local development only. |
| Set | Set | | Client secret |
| Set | Not set | | User-assigned managed identity |
| Set | Not set | Set, same as `CLIENT_ID` | User-assigned managed identity |
| Set | Not set | Set, different from `CLIENT_ID` | Federated identity credentials, user-assigned managed identity |
| Set | Not set | `system` | Federated identity credentials, system-assigned identity |

Set `TENANT_ID` to the tenant where your agent is registered when using these variables.

::: zone-end

> [!WARNING]
> Running without authentication is for local development only. Never deploy an agent without a configured credential and without securing its messaging endpoint.

## Client secret

::: zone pivot="teams-sdk-csharp"

For SDK 2.1, set the `AzureAd` section:

```json
{
  "AzureAd": {
    "ClientId": "your-client-id-here",
    "TenantId": "your-tenant-id",
    "ClientCredentials": [
      {
        "SourceType": "ClientSecret",
        "ClientSecret": "your-client-secret-here"
      }
    ]
  }
}
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

Set the following environment variables:

* `CLIENT_ID`: your agent's application (client) ID.
* `CLIENT_SECRET`: the client secret value you created.
* `TENANT_ID`: the tenant where your agent is registered.

```env
CLIENT_ID=your-client-id-here
CLIENT_SECRET=your-client-secret-here
TENANT_ID=your-tenant-id
```

The SDK uses client secret authentication when both `CLIENT_ID` and `CLIENT_SECRET` are present.

::: zone-end

::: zone pivot="teams-sdk-python"

Set the following environment variables:

* `CLIENT_ID`: your agent's application (client) ID.
* `CLIENT_SECRET`: the client secret value you created.
* `TENANT_ID`: the tenant where your agent is registered.

```env
CLIENT_ID=your-client-id-here
CLIENT_SECRET=your-client-secret-here
TENANT_ID=your-tenant-id
```

The SDK uses client secret authentication when both `CLIENT_ID` and `CLIENT_SECRET` are present.

::: zone-end

Store the secret in a secret store such as Azure Key Vault rather than in source control or a checked-in configuration file, and track its expiry so that you rotate it before it lapses.

## User-assigned managed identity

A user-assigned managed identity removes the secret entirely. Azure issues and rotates the credential for you, and your code never handles it.

::: zone pivot="teams-sdk-csharp"

For SDK 2.1, provide the client and tenant IDs without a client secret in the `AzureAd` section:

```json
{
  "AzureAd": {
    "ClientId": "your-client-id-here",
    "TenantId": "your-tenant-id"
  }
}
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

Set the following environment variables:

* `CLIENT_ID`: your agent's application (client) ID.
* `TENANT_ID`: the tenant where your agent is registered.
* Don't set `CLIENT_SECRET`.

```env
CLIENT_ID=your-client-id-here
TENANT_ID=your-tenant-id
```

The SDK uses user-assigned managed identity authentication when `CLIENT_ID` is present and `CLIENT_SECRET` is absent.

::: zone-end

::: zone pivot="teams-sdk-python"

Set the following environment variables:

* `CLIENT_ID`: your agent's application (client) ID.
* `TENANT_ID`: the tenant where your agent is registered.
* Don't set `CLIENT_SECRET`.

```env
CLIENT_ID=your-client-id-here
TENANT_ID=your-tenant-id
```

The SDK uses user-assigned managed identity authentication when `CLIENT_ID` is present and `CLIENT_SECRET` is absent.

::: zone-end

Managed identities require a workload configured with that identity on Azure compute, such as Azure App Service, Azure Container Apps, or Azure Kubernetes Service. For local development, use a development credential instead.

## Federated identity credentials

Federated identity credentials let you assign a managed identity directly to your app registration. This gives you passwordless authentication while keeping the app registration, which some Teams capabilities require.

### Use a user-assigned managed identity

::: zone pivot="teams-sdk-csharp"

For SDK 2.1, configure the managed identity as a signed assertion credential:

```json
{
  "AzureAd": {
    "ClientId": "your-app-client-id-here",
    "TenantId": "your-tenant-id",
    "ClientCredentials": [
      {
        "SourceType": "SignedAssertionFromManagedIdentity",
        "ManagedIdentityClientId": "your-managed-identity-client-id-here"
      }
    ]
  }
}
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

Set the following environment variables:

* `CLIENT_ID`: your agent's application (client) ID.
* `MANAGED_IDENTITY_CLIENT_ID`: the client ID of the user-assigned managed identity resource.
* `TENANT_ID`: the tenant where your agent is registered.
* Don't set `CLIENT_SECRET`.

```env
CLIENT_ID=your-app-client-id-here
MANAGED_IDENTITY_CLIENT_ID=your-managed-identity-client-id-here
TENANT_ID=your-tenant-id
```

::: zone-end

::: zone pivot="teams-sdk-python"

Set the following environment variables:

* `CLIENT_ID`: your agent's application (client) ID.
* `MANAGED_IDENTITY_CLIENT_ID`: the client ID of the user-assigned managed identity resource.
* `TENANT_ID`: the tenant where your agent is registered.
* Don't set `CLIENT_SECRET`.

```env
CLIENT_ID=your-app-client-id-here
MANAGED_IDENTITY_CLIENT_ID=your-managed-identity-client-id-here
TENANT_ID=your-tenant-id
```

::: zone-end

### Use a system-assigned identity

::: zone pivot="teams-sdk-csharp"

For SDK 2.1, omit `ManagedIdentityClientId` from the signed assertion credential:

```json
{
  "AzureAd": {
    "ClientId": "your-app-client-id-here",
    "TenantId": "your-tenant-id",
    "ClientCredentials": [
      {
        "SourceType": "SignedAssertionFromManagedIdentity"
      }
    ]
  }
}
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

Set the following environment variables:

* `CLIENT_ID`: your agent's application (client) ID.
* `MANAGED_IDENTITY_CLIENT_ID`: `system`.
* `TENANT_ID`: the tenant where your agent is registered.
* Don't set `CLIENT_SECRET`.

```env
CLIENT_ID=your-app-client-id-here
MANAGED_IDENTITY_CLIENT_ID=system
TENANT_ID=your-tenant-id
```

::: zone-end

::: zone pivot="teams-sdk-python"

Set the following environment variables:

* `CLIENT_ID`: your agent's application (client) ID.
* `MANAGED_IDENTITY_CLIENT_ID`: `system`.
* `TENANT_ID`: the tenant where your agent is registered.
* Don't set `CLIENT_SECRET`.

```env
CLIENT_ID=your-app-client-id-here
MANAGED_IDENTITY_CLIENT_ID=system
TENANT_ID=your-tenant-id
```

::: zone-end

## Troubleshoot

If your agent starts but Teams never receives a reply, the credential is usually the cause. Check the following:

* The credential configured in your app matches the one registered on your agent's Bot Connector registration.
* The tenant ID (`TENANT_ID` or `AzureAd:TenantId`) is where the agent is registered, not the tenant of the signed-in user.
* The client secret hasn't expired (if you're using one).
* For managed identity, the identity is assigned to the compute resource that runs your app, and the app registration trusts it.
* For federated identity credentials, the managed identity client ID (`MANAGED_IDENTITY_CLIENT_ID` or `AzureAd:ClientCredentials:0:ManagedIdentityClientId`) isn't the app registration's client ID.

Turn on debug logging to see the authentication method the SDK selected and the errors it receives. For more information, see [Observe agent activity with middleware and logging](agent-observability.md).

## See also

* [Agent trust model](agent-trust-model.md)
* [Authentication in Teams agents](../bots/how-to/authentication/add-authentication.md)
* [Use certificate or managed identity for app authentication](../toolkit/update-bot-me-app-to-use-certificate-or-msi-for-authentication.md)
* [Observe agent activity with middleware and logging](agent-observability.md)
