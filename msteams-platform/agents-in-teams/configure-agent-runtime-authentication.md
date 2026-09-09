---
title: Configure Agent Runtime Authentication to Agent Communications Service
description: TODO
author: nickwalkmsft
ms.author: nickwalk
ms.reviewer: nickwalk
ms.date: 09/02/2026
ms.topic: feature-guide
zone_pivot_groups: teams-sdk-languages
---

# Configure agent runtime authentication to Agent Communications Service

All calls made by a Teams agent runtime to Agent Communications Service must be authenticated using an application credential. This credential is configured in two places:

1. The Entra ID app registration linked with the agent's Agent Communications Service registration
1. The agent runtime's local configuration

The service supports two kinds of credential: client secret and managed identity for Azure resources.

## Configure credentials in Entra ID

See [Add and manage app credentials in Microsoft Entra ID](/entra/identity-platform/how-to-add-credentials)

Client secret authentication is the simplest and most widely-supported runtime authentication method. With this method, the runtime authenticates using a client secret (sometimes called an *application password*) stored in its configuration. New agents created using the Teams developer CLI or the Teams Developer Portal are configured to use client secret authentication by default.

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

The runtime authenticates using a [managed identity for Azure resources](/entra/identity/managed-identities-azure-resources/overview). Available only to agent runtimes hosted on Azure compute resources, this option eliminates the need to handle and configure a sensitive client secret.

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
