---
title: Agent Tenancy (Single-Tenant and Multi-Tenant Agents)
description: Agent tenancy determines whether your Teams agent works in one organization or many. Learn how to verify signInAudience settings and configure tenancy correctly.
author: nickwalkmsft
ms.author: nickwalk
ms.reviewer: nickwalk
ms.date: 09/21/2026
ms.topic: article
---


# Agent tenancy (single-tenant and multi-tenant agents)

Most workflows for creating and registering an agent, including `teams app create`, result in a *multi-tenant agent*: an agent that can be installed and used in any organization (Entra tenant). This article explains configuration, guidance and best practices related to agent tenancy.

The configuration model that determines agent tenancy has evolved over time. This article reflects the current model and supersedes any descriptions in older documentation and other online resources.

## Verify and configure agent tenant settings

The bot ID of a Teams agent's Bot Connector registration uniquely and permanently references an Entra ID app registration that resides in a tenant controlled by the developer. The `signInAudience` property of this app registration, displayed in some contexts as its **Supported account types**, determines whether the agent can only be used in that tenant.

To determine whether an agent is single-tenant or multi-tenant, sign in to the [Microsoft Entra admin center](https://entra.microsoft.com/) and examine the app registration's **Supported account types**/`signInAudience`.

| Agent tenancy | `signInAudience` | Supported account types display |
| --- | --- | --- |
| Single-tenant | `AzureADMyOrg` | **My organization only** or **Single tenant only** |
| Multi-tenant | `AzureADMultipleOrgs` | **Multiple Entra ID tenants** or **Multiple organizations** |

`signInAudience` can be changed after the app registration is created, but should be confirmed by the time development is complete, and should remain unchanged once the agent is published.

## Considerations for implementation and distribution

All usage of an agent in Teams, across any tenant, is powered by the single runtime endpoint configured with the agent's Bot Connector registration. Developers are responsible for enforcing data boundaries between tenants within their agent runtime implementations. Data stored by an agent should be strongly associated with a tenant, and users in one tenant should not be able to access data associated with another.

Agents intended for use only in a single tenant, or a known set of tenants, should always validate the tenant ID of incoming activity payloads in their application code. Setting `signInAudience = AzureADMyOrg` or configuring [sign in audience restrictions](/graph/api/resources/allowedtenantsaudience) to restrict its use are valid security measures, but are not substitutes for performing tenant validation in code.

## Azure AI Bot Service resource bot type

Developers with agents that use an Azure AI Bot Service resource instead of a standalone Bot Connector registration might observe that its `msaAppType`, **Bot type** or **Type of app** property indicates that it is configured as "Single Tenant". This value's name is based on a legacy configuration model and is retained for compatibility reasons, and **does not** indicate whether an agent can be used in multiple tenants.

Additionally, Azure AI Bot Service offers a legacy bot type option, **User-Assigned Managed Identity**, that links it directly with an Azure user-assigned managed identity instead of an Entra ID app registration. New agent development that uses a Bot Service resource should specify the **Single Tenant** bot type, and use Entra ID federated identity credentials if runtime authentication using a user-assigned managed identity is desired. For more information, see TODO.

## See also

- Microsoft identity platform documentation:  [Tenancy in Microsoft Entra ID](/entra/identity-platform/single-and-multi-tenant-apps) and [Convert single-tenant app to multitenant on Microsoft Entra ID](/entra/identity-platform/howto-convert-app-to-be-multi-tenant)
