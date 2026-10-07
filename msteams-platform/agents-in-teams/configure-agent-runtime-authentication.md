---
title: Review or Update Agent Runtime Authentication Configuration
description: TODO
author: nickwalkmsft
ms.author: nickwalk
ms.reviewer: nickwalk
ms.date: 09/02/2026
ms.topic: feature-guide
zone_pivot_groups: teams-sdk-languages
---

# Review or update agent runtime authentication configuration

To interact with Teams, an agent's runtime must authenticate to Bot Connector. The agent authenticates using credentials associated with the Entra ID app registration that is linked to the agent's Bot Connector registration.

The configuration described in this article is related only to agent runtime authentication that is required of all Teams agents. For information about configuring and implementing single sign-on (SSO) or OAuth to authenticate users of an agent and allow them to delegate permissions, see [Authenticate users in Microsoft Teams](../concepts/authentication/authentication.md).

## Supported credential types

Teams agent runtimes can authenticate to Bot Connector using two different kinds of credentials:

- **Client secret**: A client secret (sometimes called an application password) is configured in the environment variables of the runtime's hosting environment, or in the runtime's deployed configuration file.
- **Managed identities for Azure resources**: Requires the agent runtime to be hosted in Azure. The runtime authenticates using a credential securely associated with its hosting environment. Managed identity eliminates the need to handle and secure a client secret. See [Managed identities for Azure resources](/entra/identity/managed-identities-azure-resources/overview) for general information.

By default, new agents created using the Teams developer CLI or the Teams Developer Portal use client secret authentication. For agent runtimes hosted on an Azure compute service, such as Azure App Service, Azure Kubernetes Service, or Azure Virtual Machines, updating your configuration to use a managed identity instead is strongly recommended.

## Review or update configuration

### Confirm application ID and tenant ID

For

The app ID of the Entra ID app registration

Your agent's Entra ID app registration, linked to its Bot Connector registration, serves as its identity. Confirm

### Configure the Entra ID app registration

To review or update the credentials configured on the agent's Entra ID app registration, see [Add and manage app credentials in Microsoft Entra ID](/entra/identity-platform/how-to-add-credentials).

To use a managed identity for authentication, configure it as a federated credential.

Client secrets can also be created in Teams Developer Portal or via `teams app auth secret create`.

Client secrets should occasionally be rotated and kept secure.

### Runtime configuration

::: zone pivot="teams-sdk-typescript"

::: zone-end

::: zone pivot="teams-sdk-csharp"

::: zone-end

::: zone pivot="teams-sdk-python"

::: zone-end

## Managed identity for Azure resources

Must be on Azure

Use Entra ID's federated identity feature to associate a managed identity with the agent's app registration

Works with standalone registrations but you can't configure it via TDP or developer CLI, must use Azure management tools

Show for both Azure and standalone reg

Note about UAMI bot type goes here. This option is specifically for Azure-hosted agents using an Azure AI Bot Service resource with the "User-Assigned Managed Identity" bot type. This configuration is provided for legacy compatibility only;

## Bot Connector authentication troubleshooting

TODO copy from <https://microsoft.github.io/teams-sdk/teams/app-authentication/troubleshooting#error-examples>

## See also

<https://learn.microsoft.com/en-us/entra/identity-platform/how-to-add-credentials>

For more information about how Teams SDK authenticates inbound communications from Bot Connector, see [Teams SDK incoming request authentication](incoming-request-authentication.md).
