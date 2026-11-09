---
title: Choose an Agent Communication Service Registration Type for an Agent
description: Learn the differences between Teams-managed and Azure-managed registrations and how to choose a registration type.
ms.date: 11/09/2026
ms.topic: how-to
---

# Choose an Agent Communication Service registration type for an agent

Agent Communication Service (ACS) is the service that agents use to interact with Teams. Before your agent's runtime can authenticate to the service and perform actions in Teams, you need to register it with the service.

ACS supports two different kinds of registration: *Teams-managed* and *Azure-managed*. When you begin agent development using the Teams developer CLI, as in the [quickstart](quickstart-create-agent-teams-sdk.md), `teams app create` creates a Teams-managed registration by default.

## Recommended workflow

**The recommended approach to agent development is to use a Teams-managed ACS registration and migrate to an Azure-managed registration only if needed.** In most cases, migration to an Azure-managed registration is motivated by a requirement for the agent to implement [user single sign-on (SSO) or OAuth](../concepts/authentication/authentication.md) for delegation scenarios, which are not supported with a Teams-managed registration.

## Compare registration options

Both kinds of ACS registration are equally appropriate for development, testing, and production scenarios, but differ in the following ways:

- **Agents that perform SSO or participate in OAuth flows must use an Azure-managed registration.** Teams-managed registrations do not support the configuration needed to enable SSO and OAuth.
- **Azure-managed registrations are Azure resources and require an active Azure subscription to create and retain**:
  - An Azure-managed registration is an instance of an Azure AI Bot Services resource. Azure resources are part of the sophisticated [Azure resource management ecosystem](/azure/azure-resource-manager/management/overview) for purposes of administration, governance, and lifecycle management. They can be created and managed with the full range of Azure management tools, including the Azure portal, Azure CLI, Azure PowerShell, and ARM and Bicep templates.
  - Teams-managed registrations do not require an Azure subscription and are created and managed in the Teams Developer Portal or using the Teams developer CLI. A Teams-managed registration can be configured and managed only by the Microsoft 365 account used to create it.

The Teams developer CLI can create both kinds of ACS registration, and can migrate from one kind of registration to the other.

|                                              | Teams-managed registration                                                                                       | Azure-managed registration                                                                                                                                                                 |
|----------------------------------------------|---------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Creation and management                      | Teams Developer Portal or Teams developer CLI                                                                 | Teams developer CLI + Azure CLI, or Azure management tools: Azure portal, Azure CLI, ARM or Bicep templates                                                                                    |
| Governance                                   | Owned by the creating user                                                                                    | An Azure AI Bot Services resource is an Azure resource within the Azure resource management ecosystem, enabling shared administration, governance, access control and lifecycle management |
| Dependencies                                 | None                                                                                                          | Active Azure subscription; management via Teams developer CLI requires a logged-in Azure CLI                                                                                                   |
| SSO and OAuth                                | Does not support SSO or OAuth flows                                                                           | Full support for SSO and OAuth                                                                                                                                                                 |

## About Azure AI Bot Service bot type

Creating an Azure AI Bot Service resource requires selecting its *bot type*, which affects the way the resource is associated with an Entra ID identity. The choice of bot type is permanent and is displayed as the Bot Service resource's `msaAppType`, **Bot type** or **Type of app** depending on the interface.

**Bot Service resources used by Teams agents should be of *Single Tenant* bot type regardless of agent tenancy and runtime authentication needs.** The names of these bot type choices do not indicate their functionality; they are based on a legacy configuration model and are retained for compatibility reasons.

The "Single Tenant" bot type fully supports agents operating in multiple tenants. An agent's tenancy is determined by its Entra ID app registration configuration. See [Agent tenancy (single-tenant and multi-tenant agents)](agent-tenancy.md) for more information about tenancy considerations for agents.

### Legacy Bot Service bot types

The following legacy bot types might be found on existing Bot Service resources, but should not be used in new development:

- **User-Assigned Managed Identity**: Do not use in new development - if runtime authentication with a user-assigned managed identity is desired, use "Single Tenant" bot type and configure the identity on the linked Entra ID app registration as a federated identity credential. See [Review or update agent runtime authentication configuration](configure-agent-runtime-authentication.md). Teams SDK provides [legacy configuration support](configure-agent-runtime-authentication.md#legacy-user-assigned-managed-identity-configuration) for this bot type.
- **Multi Tenant**: This bot type configuration is deprecated and should not be used. The "Single Tenant" bot type supports multi-tenant operation and should be used for new development of all Teams agents that require a Bot Service resource.

## See also

- [Registering an agent on the Teams platform](registering-agent-teams-platform.md)

## Next steps

- Try the [quickstart](quickstart-create-agent-teams-sdk.md), in which you'll create an agent with a Teams-managed registration using `teams app create`.
