---
title: Prepare to build apps with Teams Toolkit
author: surbhigupta
description: Learn about build environments such as SPFx of Teams Toolkit in Visual Studio Code. Toolkit integrates Azure Functions capabilities for building apps.
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# Prepare to build apps using Teams Toolkit

Microsoft Teams Toolkit supports different build environments for creating apps. It helps to integrate Azure Functions capabilities and cloud services in the Microsoft Teams app that you've built.

:::image type="content" source="../assets/images/buildapps-TTK_1.png" alt-text="Illustration shows the steps to prepare to build apps using Teams Toolkit." lightbox="../assets/images/buildapps-TTK_1.png":::

## Build environments

Teams Toolkit in Microsoft Visual Studio Code offers a set of environments to build your Teams app. You can choose any of the following environments:

* JavaScript or TypeScript
* SharePoint Framework (SPFx)

### Create your Teams app using JavaScript or TypeScript

The apps built with JavaScript or TypeScript have the following advantages:

* App comes with its own UI and UX capabilities that are rich and user friendly.
* Provides quick upgrades to the existing apps.
* Distributes apps on multiple platforms, such as Android and iOS.
* Compatible for creating an app with the existing APIs.
* An app created in Teams Toolkit also supports React.

Teams Toolkit in Visual Studio Code supports building the following apps using JavaScript or TypeScript:

* Tab app: Your tab app can have web-based content. You can have a custom tab for your web content in Teams or add Teams-specific functionality to your web content.
* Bot app: A bot can be chatbot or conversational bot that allows you to do simple and repetitive tasks, such as customer service or support staff.
* Notification bot: You can send messages in Teams channel or group or personal chat by notification bots with HTTP request.
* Command bot: You can automate repetitive tasks using a command bot. Command bot helps you to respond simple queries or commands sent in chats.
* Workflow bot: You can interact with an Adaptive Card enabled by the Adaptive Card action handler feature in the workflow bot app.
* Message extension: You can interact with your web service through buttons and forms in the Teams client.

### Create your Teams app using SPFx

Teams Toolkit in Visual Studio Code allows you to create tab apps using SPFx. These apps have the following advantages:

* Provides easy integration with data residing in SPFx to your Teams.
* Integrates your SPFx solution with your business APIs secured with Microsoft Entra ID.
* Gives access to various open-source tools.
* Creates powerful applications that can deliver a great UX.
* Integrates with other Microsoft 365 workloads easily.
* Delivers flexibility to host applications wherever needed.

## Support for Azure Functions

You can use Teams Toolkit to integrate [Azure Functions](/azure/azure-functions/functions-overview) capabilities while building apps. You can focus on the pieces of code that matter, and Azure Functions handles the rest.
Azure Functions provides "compute on-demand" in two significant ways:

1. Allows implementing system's logic into your readily available blocks of code. These blocks are called functions.
1. Meets the requirement with as many resources and function instances as necessary as the requests increase.

Azure Functions integrates with an array of [cloud services](add-resource.md) to provide feature-rich implementations. The following are the common scenarios for Azure Functions:

* Building a web API
* Processing to database changes
* Processing IoT data streams
* Managing message queues

## Node.js version compatibility table for project type

|Teams Toolkit Version | Project Type | Supported Node.js Versions  |
|---|---|---|
| 5.0.0 | Notify with http or timer trigger <br> Azure functions <br> SPFx <br> Non-SPFx | 16, 18 <br> 16, 18 <br> 16 <br> 16, 18 |
| 4.2.2 | Notify with http or timer trigger <br> Azure functions <br> SPFx | 14, 16, 18 (Preview) <br> 14, 16, 18 (Preview) <br> 16 <br> 14, 16, 18 |
| 4.2.0 | SPFx | 16 |
| 4.0.3 | SPFx | 14, 16 |
| 4.0.0 | Non-SPFx | 14, 16 |
| 3.7.0 | SPFx | 12, 14 |
| <3.7.0 | SPFx <br> Azure functions <br> Other | 10, 12, 14 <br> 10, 12, 14 <br> 10, 12, 14, 16 |

## See also

* [Teams Toolkit Overview](~/toolkit/teams-toolkit-fundamentals.md)
* [Developer Portal for Teams](../concepts/build-and-test/teams-developer-portal.md)
* [Create a new Teams project](create-new-project.md)
