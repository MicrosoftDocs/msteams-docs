---
title: Configure Agent Runtime Authentication to Bot Connector
description: TODO
author: nickwalkmsft
ms.author: nickwalk
ms.reviewer: nickwalk
ms.date: 09/02/2026
ms.topic: feature-guide
zone_pivot_groups: teams-sdk-languages
---

# Configure agent runtime authentication to Bot Connector

All communications between an agent runtime and Bot Connector are authenticated. Teams SDK supports three types of agent runtime authentication to the Bot Connector service:

- **Client secret**: The runtime authenticates using a client secret (password) stored in its configuration. New agents created using the Teams developer CLI or the Teams Developer Portal are configured for client secret authentication by default.
- **Managed identity via federated identity credentials** (for Azure-hosted runtimes): The runtime authenticates using a [managed identity for Azure resources](/entra/identity/managed-identities-azure-resources/overview). Available only to agent runtimes hosted in Azure, this option eliminates the need to handle and configure a sensitive client secret.
- **User assigned managed identity bot type**: This option is specifically for Azure-hosted agents using an Azure AI Bot Service resource with the "User-Assigned Managed Identity" bot type. See [Azure AI Bot Service resource bot type](choose-agent-registration-type.md#azure-ai-bot-service-resource-bot-type) for more information.

This guide explains how to manually configure and verify each of these options.

## Client secret

For all apps

The client secret is associated with the Entra ID app registration connected to the agent's Bot Connector registration.

Client secrets are not recoverable and are only shown when first created, but new secrets can be generated at any time.

Need to illustrate this for both Azure and standalone reg

Single Tenant

Can create and delete via TDP too or cli teams app auth secret

### Runtime configuration

::: zone pivot="teams-sdk-typescript"

::: zone-end

::: zone pivot="teams-sdk-csharp"

::: zone-end

::: zone pivot="teams-sdk-python"

::: zone-end

## Federated identity credentials

Must be on Azure

Use Entra ID's federated identity feature to associate a managed identity with the agent's app registration

Works with standalone registrations but you can't configure it via TDP or developer CLI, must use Azure management tools

Show for both Azure and standalone reg

## User assigned managed identity (legacy)

> [!IMPORTANT]
> This section is specifically for agents using an Azure AI Bot Service resource configured with the legacy "User-Assigned Managed Identity" *bot type". For agents using Entra ID federated identity to authenticate with any kind of managed identity, see the [Federated identity credentials](#federated-identity-credentials) section.

## Bot Connector authentication troubleshooting

TODO copy from <https://microsoft.github.io/teams-sdk/teams/app-authentication/troubleshooting#error-examples>

## See also

For more information about how Teams SDK authenticates inbound communications from Bot Connector, see [Teams SDK incoming request authentication](incoming-request-authentication.md).
