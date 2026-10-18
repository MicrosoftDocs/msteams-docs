---
title: Choose a Bot Connector Registration Type for an Agent
description: Learn the differences between standalone registrations and Azure AI Bot Service resources and how to choose a registration type.
ms.date: 10/14/2026
ms.topic: how-to
---

# Choose a Bot Connector registration type for an agent

Bot Connector is the service that agents use to interact with Teams. Before your agent's runtime can authenticate to the service and perform actions in Teams, you need to register it with the service.

Bot Connector supports two different kinds of registration: *standalone* and *Azure AI Bot Service resource*. When you begin agent development using the Teams developer CLI, as in the [quickstart](quickstart-create-agent-teams-sdk.md), `teams app create` creates a standalone registration by default.

**The recommended approach to agent development is to continue using this standalone registration, only migrating to an Azure AI Bot Service resource if and when it is needed.** In most cases, migration to a Bot Service resource is motivated by a requirement for the agent to implement [user single sign-on (SSO) or OAuth](../concepts/authentication/authentication.md) for delegation scenarios, which is not supported with a standalone registration.

Both kinds of Bot Connector registration are equally appropriate for development, testing, and production scenarios, but differ in the following ways:

- **Agents that perform SSO or participate in OAuth flows must use an Azure AI Bot Service resource.** Standalone registrations do not support the configuration needed to enable agent SSO and OAuth.
- Unlike a standalone registration, **creating and retaining an Azure AI Bot Service resource requires an active Azure subscription**. However, using a Bot Service resource does not require the agent's runtime to be hosted on Azure, nor does it require any other usage of Azure.
- **A Bot Service resource is an Azure resource**, part of the sophisticated [Azure resource management ecosystem](/azure/azure-resource-manager/management/overview) for purposes of administration, governance, and lifecycle management. Bot Service resources can be created and managed with the full range of Azure management tools, including the Azure portal, Azure CLI, Azure PowerShell, and ARM and Bicep templates. Standalone registrations are created in the Teams Developer Portal or with the Teams developer CLI, and each one can be configured and managed only by the Microsoft 365 account used to create it.

The Teams developer CLI can create both kinds of Bot Connector registration, and can migrate from one kind of registration to the other.

|                                              | Standalone registration                                                                                       | Azure AI Bot Services resource                                                                                                                                                                 |
|----------------------------------------------|---------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Creation and management                      | Teams Developer Portal or Teams developer CLI                                                                 | Teams developer CLI + Azure CLI, or Azure management tools: Azure portal, Azure CLI, ARM or Bicep templates                                                                                    |
| Governance                                   | Owned by the creating user                                                                                    | An Azure AI Bot Services registration is an Azure resource within the Azure resource management ecosystem, enabling shared administration, governance, access control and lifecycle management |
| Dependencies                                 | None                                                                                                          | Active Azure subscription; management via Teams developer CLI requires a logged-in Azure CLI                                                                                                   |
| SSO and OAuth                                | Does not support SSO or OAuth flows                                                                           | Full support for SSO and OAuth                                                                                                                                                                 |

## About Azure AI Bot Service bot type

Creating an Azure AI Bot Service resource requires setting its *bot type*, for which there are two options: **Single Tenant** and **User-Assigned Managed Identity**. The choice of bot type is permanent and is displayed as the resource's `msaAppType`, **Bot type** or **Type of app** in different interfaces.

**Bot Service resources used by Teams agents should be configured with the *Single Tenant* bot type, which *does not* prevent the agent from being installed and used in multiple tenants.** The name of this choice is based on a legacy configuration model and is retained for compatibility reasons. An agent's ability to be used in multiple tenants is dictated by separate configuration in Entra ID; see [Agent tenancy (single-tenant and multi-tenant agents)](agent-tenancy.md) for more information about tenancy considerations for agents.

Existing Bot Service resources may be configured with one of the following legacy bot types:

- **User-Assigned Managed Identity**: This bot type configuration links the Bot Service resource directly with an Azure user-assigned managed identity instead of an Entra ID app registration. Teams SDK provides legacy configuration support for this configuration, but it should not be used in new development. If runtime authentication using a user-assigned managed identity is desired, use the **Single Tenant** bot type and use Entra ID federated identity credentials to associate the managed identity with the agent's Entra ID app registration.
- **Multi Tenant**: This bot type configuration is deprecated and is no longer supported.

## See also

- [Registering an agent on the Teams platform](registering-agent-teams-platform.md)

## Next steps

- Try the [quickstart](quickstart-create-agent-teams-sdk.md), in which you'll create an agent with a standalone registration using `teams app create`.
