---
title: Agent Tenancy (Single-Tenant and Multi-Tenant Agents)
description: Agent tenancy determines whether your Teams agent works in one organization or many. Learn how to verify signInAudience settings and configure tenancy correctly.
ms.date: 10/14/2026
ms.topic: article
---

# Agent tenancy (single-tenant and multi-tenant agents)

Most workflows for creating and registering an agent, including `teams app create` and the [Teams Developer Portal](../concepts/build-and-test/teams-developer-portal.md)'s bot creation dialog, result in a *multi-tenant agent*: an agent that can be made available for installation and use in any organization (Entra tenant). This article explains configuration, guidance and best practices related to agent tenancy.

## Verify and configure agent tenant settings

An agent's primary Entra ID app registration, linked to its Bot Connector registration, resides in a a tenant controlled by its developer. Its `signInAudience` property (displayed in some contexts as its **Supported account types**) determines whether the agent is limited to installation and use in that tenant, or can be installed and used in any tenant.

To check whether an agent is single-tenant or multi-tenant, sign in to the [Microsoft Entra admin center](https://entra.microsoft.com/) and examine the app registration's **Supported account types**.

| Tenant availability | `signInAudience` | Supported account types display |
| --- | --- | --- |
| Single-tenant | `AzureADMyOrg` | **My organization only** or **Single tenant only** |
| Multi-tenant | `AzureADMultipleOrgs` | **Multiple Entra ID tenants** or **Multiple organizations** |

`signInAudience` can be changed after an app registration is created, but should be confirmed during development and remain unchanged once the agent is published.

## Considerations for implementation and distribution

All activity data received by any installation of an agent in Teams, across any tenant, is powered by the single runtime endpoint configured in the agent's Bot Connector registration. Developers are responsible for enforcing tenant boundaries within their agent runtime implementations. All user data stored by an agent should be strongly associated with a tenant, and users in one tenant should not be able to access data associated with another.

Agents intended for use only in a single tenant, or a known set of tenants, should always validate the tenant ID of incoming activity payloads in their application code. Configuring an agent to be single-tenant or configuring [sign in audience restrictions](/graph/api/resources/allowedtenantsaudience) are not substitutes for performing tenant validation in code.

## Azure AI Bot Service bot type

Developers with agents that use an Azure AI Bot Service resource instead of a standalone Bot Connector registration might observe that its `msaAppType`, **Bot type** or **Type of app** property indicates that it is "Single Tenant". Despite its name, the "Single Tenant" bot type is the correct choice for Teams agents and **does not** control whether an agent can be installed and used in multiple tenants. See [About Azure AI Bot Service bot type](choose-agent-registration-type.md#about-azure-ai-bot-service-bot-type) for more information.

## See also

- Microsoft identity platform documentation:  [Tenancy in Microsoft Entra ID](/entra/identity-platform/single-and-multi-tenant-apps) and [Convert single-tenant app to multitenant on Microsoft Entra ID](/entra/identity-platform/howto-convert-app-to-be-multi-tenant)
