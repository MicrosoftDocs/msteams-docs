---
title: Choose an Agent Registration Type
description: Learn the differences between Teams-managed and Azure bot registrations, how to choose a registration type, and how to migrate a Teams-managed bot to Azure.
ms.date: 08/24/2026
author: nickwalkmsft
ms.author: nickwalk
ms.reviewer: nickwalk
ms.topic: how-to
---

# Choose an agent registration type

Bot Connector is the service that agents use to interact with Teams. Before an agent runtime can interact with Bot Connector, its developer must register it with the service. Bot Connector supports two different kinds of agent registration: standalone and Azure AI Bot Service resource. **The recommended approach to agent development is to begin with a standalone registration and migrate to an Azure AI Bot Service registration later if needed.**

Both kinds of registration are equally appropriate for development, testing, and production scenarios, but **agents that participate in single sign-on (SSO) or OAuth flows must use an Azure AI Bot Service resource to register with Bot Connector**. An Azure AI Bot Service resource requires an active Azure subscription and exists within the [Azure resource management ecosystem](/azure/azure-resource-manager/management/overview) for purposes of administration, governance, access control and lifecycle management.

Creating a standalone registration does not require an Azure subscription, but standalone registration do not support the configuration needed to enable agent SSO and OAuth. Management and governance of a standalone registration are scoped to to the single Microsoft 365 account that created it.

Developers can use the Teams developer CLI to create and manage both kinds of registration and migrate from one to the other.

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
