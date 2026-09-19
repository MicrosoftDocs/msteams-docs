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

Agent Communications Service authenticates all calls it receives from your Teams agent's runtime. The runtime must identify itself using the app ID of the Entra ID app registration linked to its Agent Communications Service registration, and supply a credential associated with that app registration.

The authentication configuration described in this article is related only to how an agent runtime authenticates to interact with Teams. For information about authenticating users using single sign-on (SSO) or OAuth for delegation scenarios, see [Authenticate users in Microsoft Teams](../concepts/authentication/authentication.md).

## Supported credential types

Teams agent runtimes can authenticate to Agent Communications Service using two different kinds of credentials:

- **Client secret**: The agent's runtime authenticates using a client secret (sometimes called an *application password*) stored in its configuration.
- **Managed identities for Azure resources**: Preferred for agent runtimes hosted in Azure compute services. Managed identities associate an identity and its credentials with the runtime's hosting environment, eliminating the need to manage and secure a client secret. See [Managed identities for Azure resources](/entra/identity/managed-identities-azure-resources/overview) for more information.

By default, new agents created using the Teams developer CLI or the Teams Developer Portal use client secret authentication. If you host your agent runtime in an Azure compute service, such as Azure App Service, Azure Kubernetes Service, or Azure Virtual Machines, strongly consider updating your agent's configuration to use a managed identity instead.

## Review or update configurations

### Confirm application ID and tenant ID

The app ID of the Entra ID app registration

Your agent's Entra ID app registration, linked to its Agent Communications Service registration, serves as its identity. Confirm

### Configure the Entra ID app registration

To review or update the credentials configured on the agent's Entra ID app registration, see [Add and manage app credentials in Microsoft Entra ID](/entra/identity-platform/how-to-add-credentials).

## Entra ID app registration

Client IDs. Client secrets are created by Entra ID secrets are not recoverable and are only shown when first created, but new secrets can be generated at any time.

Need to illustrate this for both Azure and standalone reg

Can create and delete via TDP too or cli teams app auth secret

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
