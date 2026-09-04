---
title: Choose a Bot Connector Registration Type for an Agent
description: Learn the differences between standalone registrations and Azure Ai Bot Service resources, how to choose a registration type, and how to migrate a Teams-managed bot to Azure.
ms.date: 08/24/2026
author: nickwalkmsft
ms.author: nickwalk
ms.reviewer: nickwalk
ms.topic: how-to
---

# Choose a Bot Connector registration type for an agent

Bot Connector is the service that agents use to interact with Teams. Before your agent can authenticate to Bot Connector and perform actions in Teams, you need to register it with the service.

Bot Connector supports two different kinds of registration: *standalone* and *Azure AI Bot Service resource*. When you begin agent development using the Teams developer CLI, as in the [quickstart](quickstart-create-agent-teams-sdk.md), `teams app create` creates a standalone registration by default. **The recommended approach to agent development is to continue using this standalone registration, migrating to an Azure AI Bot Service registration only if needed.**

Unlike a standalone registration, creating and retaining an Azure AI Bot Service resource requires an active Azure subscription. Both kinds of registration are equally appropriate for development, testing, and production scenarios, but an Azure AI Bot Service resource is required for the following capabilities:

- **Single sign-on (SSO) and OAuth**: Agents that perform SSO or participate in OAuth flows must use an Azure AI Bot Service resource. Standalone registrations do not support the configuration needed to enable agent SSO and OAuth.
- **Azure resource manager governance**: Bot Service resources are part of the sophisticated [Azure resource management ecosystem](/azure/azure-resource-manager/management/overview) for purposes of administration, governance, and lifecycle management. They can be created and managed with the full range of Azure management tools, including the Azure portal, Azure CLI, Azure PowerShell, and ARM and Bicep templates. Standalone registrations are created in the Teams Developer Portal or with the Teams developer CLI and can be configured and managed only by the Microsoft 365 account used to create it.

The Teams developer CLI can create both kinds of Bot Connector registration, and can migrate from one kind of registration to the other.

|                                              | Standalone registration                                                                                       | Azure AI Bot Services resource                                                                                                                                                                 |
|----------------------------------------------|---------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Creation and management                      | Teams Developer Portal or Teams developer CLI                                                                 | Teams developer CLI + Azure CLI, or Azure management tools: Azure portal, Azure CLI, ARM or Bicep templates                                                                                    |
| Governance                                   | Owned by the creating user                                                                                    | An Azure AI Bot Services registration is an Azure resource within the Azure resource management ecosystem, enabling shared administration, governance, access control and lifecycle management |
| Dependencies                                 | None                                                                                                          | Active Azure subscription; management via Teams developer CLI requires a logged-in Azure CLI                                                                                                   |
| SSO and OAuth                                | Does not support SSO or OAuth flows                                                                           | Full support for SSO and OAuth                                                                                                                                                                 |

## See also

- [Registering an agent on the Teams platform](../concepts/registering-agent-teams-platform.md)

## Next steps

- Try the [quickstart](quickstart-create-agent-teams-sdk.md), in which you'll create an agent with a standalone registration using `teams app create`.
