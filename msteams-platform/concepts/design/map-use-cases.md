---
title: Map your use cases to Teams app capabilities
author: surbhigupta
description: Identify how your app's use cases can work within the Teams experience.
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: anclear
---
# Map your use cases to Teams app capabilities

After you have identified *who* the user is and *what* problem you will solve, it is time to decide *how* to solve the problem. The *who*, *what*, and *how* completes the process of understanding and mapping your use cases to Teams app capabilities. You need to define the scope of the app based on the responses you have received from the user to your queries, and then decide which capability is best suited to build your app.

## Use Cases and Teams capabilities

The Microsoft Teams platform offers a large variety of capabilities and UI elements your app can take advantage of. Each feature is a way of interacting with your users in a way that makes the Teams app capability relevant to the user need.

:::image type="content" source="../../assets/images/overview/teams-apps-capabilities.png" alt-text="Image showing Teams capabilities" border="true":::

Each method of interacting with your users has its strengths and weaknesses.

### User needs vs. Teams capabilities  

The following scenarios will guide you in understanding the selection of entry points and UI elements that work well with Teams app capabilities:

> [!NOTE]
> It isn't an exhaustive list, but will help you think through some of the possibilities available to you.

- **Create, share, and collaborate on items in an external system**

    Apps to interact with your data

    | **If you want to...** | **Try ...** |
    | --- | --- |
    | Search external systems and share the results as an interactive card. | Messaging extensions with search commands |
    | Collect information to insert into a data store or perform advanced searches. | Messaging extensions with action commands |
    | Create embedded web experiences to view, work with and share data. | Tabs |
    | Push data and send data out of the Teams client. | Connectors and webhooks|
    | Interactive modal forms from wherever you need them to collect or display information. | Task modules |
    |

- **Initiate workflows and processes**

    A quick way to initiate a process or workflow in an external system.

    | **If you want to...** | **Try ...** |
    | --- | --- |
    | Trigger from messages, allowing your users to quickly send the contents of a message to your web services. | Messaging extensions action commands |
    | Open them from a tab, a bot, or a messaging extension to collect information before initiating a workflow. | Task modules |
    | Interact with your users through text and rich cards. | Conversational bots |
    | A good choice for a simple back-and-forth interaction when you don't need to build an entire conversational bot. |  Outgoing webhooks |
    |

- **Send notifications and alerts**

    Send asynchronous notifications and alerts to your users in Teams.
    
    | **If you want to...** | **Try ...** |
    | --- | --- |
    | Send proactive messages to groups, channels, or individual users. | Conversational bots |
    | Permit a channel to subscribe to receive messages. A connector lets users tailor the subscription with a configuration page. | Connectors and incoming webhooks |
    |

- **Ask questions and get answers**

    Connect with your users and resolve their queries
    
    | **If you want to...** | **Try ...** |
    | --- | --- |
    | Natural language processing, AI, machine learning, and all the buzzwords. Use a bot powered by the intelligent cloud to connect your users to the answers they need. | Conversational bots |
    | Embed your existing web portal in Teams or create a Teams-specific version for added functionality. | Tabs |
    |

## See also

[Build your first Microsoft Teams app](../../get-started/get-started-overview.md)
