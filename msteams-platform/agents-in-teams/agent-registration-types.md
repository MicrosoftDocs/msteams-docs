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

Teams agents must be registered with the Bot Connector service to perform actions in Teams and receive activity events. Bot Connector supports two kinds of agent registration: Teams Developer Portal and Azure AI Bot Service.

**The recommended approach to agent development is to begin with a Teams Developer Portal registration and migrate to an Azure AI Bot Service registration later if needed.** Teams Developer Portal registrations can be used to get going quickly with no dependencies, but an Azure AI Bot Service registration is required to enable SSO and OAuth flows, as well as runtime authentication options other than client secret. Otherwise, both kinds of registration are equally appropriate for testing, development and production. The Teams developer CLI can be used to create and manage both kinds of registration and migrate between them.

|                                              | Teams Developer Portal                                                                                                 | Azure AI Bot Services                                                                                                                                                                          |
|----------------------------------------------|---------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Creation and management                      | Teams Developer Portal or Teams developer CLI, using the single M365 work or school account used to create it | An Azure AI Bot Services registration is an Azure resource within the Azure resource management ecosystem, enabling shared administration, governance, access control and lifecycle management |
| Dependencies                                 | None                                                                                                          | Active Azure subscription; management via Teams developer CLI requires a logged-in Azure CLI                                                                                                   |
| SSO and OAuth                                | Does not support SSO or OAuth flows                                                                           | Full support for SSO and OAuth                                                                                                                                                                 |
| Supported Bot Connector authentication modes | Client secret only                                                                                            | Client secret; user-assigned managed identity; federated identity credentials                                                                                                                  |

## Next steps

- quickstart
- configure
