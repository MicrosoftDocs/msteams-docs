---
title: Prepare to build apps with Teams Toolkit in Visual Studio
author: surbhigupta
description: Learn about build environments such as C# and blazor of Teams Toolkit in Visual Studio. Toolkit integrates Azure Functions capabilities for building apps.
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# Prepare to build apps using Teams Toolkit in Visual Studio

Teams Toolkit supports different build environments for creating apps. It helps to integrate Azure Functions capabilities and cloud services in the Teams app that you've built.

:::image type="content" source="images/buildapps-ttk-vs.png" alt-text="Prepare to build apps using Teams Toolkit in visual studio." lightbox="images/buildapps-ttk-vs.png":::

## Build environments

Teams Toolkit in Visual Studio offers a set of environments to build your Teams app in C# using Blazor framework.

### Create your Teams app using C# and Blazor

Teams Toolkit in Visual Studio allows you to create a Teams app using C# using the Blazor framework. You can create tab app, bot app, and message extension app in a C# build environment.

## Support for Azure Functions

You can use Teams Toolkit to integrate [Azure Functions](/azure/azure-functions/functions-overview) capabilities while building apps. You can focus on the pieces of code that matter, and Azure Functions handles the rest.
Azure Functions provides "compute on-demand" in two significant ways:

1. Allows implementing system's logic into your readily available blocks of code. These blocks are called functions.
1. Meets the requirement with as many resources and function instances as necessary as the requests increase.

Azure Functions integrates with an array of [cloud services](add-resource-v4.md#types-of-cloud-resources) to provide feature-rich implementations. The following are the common scenarios for Azure Functions:

* Building a web API
* Processing to database changes
* Processing IoT data streams
* Managing message queues

## Node.js version compatibility table for project type

|Teams Toolkit Version | Project Type | Supported Node.js Versions  |
|---|---|---|
| 4.2.2 | Notify with http or timer trigger <br> Azure functions <br> SPFx <br> Other | 14, 16, 18 (Preview) <br> 14, 16, 18 (Preview) <br> 16 <br> 14, 16, 18 |
| 4.2.0 | SPFx | 16 |
| 4.0.3 | SPFx | 14, 16 |
| 4.0.0 | Non-SPFx | 14, 16 |
| 3.7.0 | SPFx | 12, 14 |
| <3.7.0 | SPFx <br> Azure functions <br> Other | 10, 12, 14 <br> 10, 12, 14 <br> 10, 12, 14, 16 |

## See also

* [Teams Toolkit Overview](../teams-toolkit-fundamentals.md)
* [Developer Portal for Teams](~/concepts/build-and-test/teams-developer-portal.md)
* [Create a new Teams project](../create-new-project.md)
* [Build your first Teams app](~/get-started/get-started-overview.md#build-your-first-teams-app)
