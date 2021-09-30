---
title: Create your first Teams app with Blazor
author: adrianhall
description: Create a Microsoft Teams app that displays a "Hello, World!" message using the Microsoft Teams Toolkit and .NET Blazor.
ms.author: adhal
ms.date: 04/27/2021
ms.topic: quickstart
ms.localizationpriority: none
---

# Create your first Microsoft Teams app with Blazor

This tutorial walks you through the steps to create, run, and deploy your first Teams app using .NET/Blazor. The app that is built displays basic user information for the current user. When permission is granted, the app connects to the Microsoft Graph. It gets the complete profile of the current user.

:::image type="content" source="../assets/images/get-started/app-roadmap/roadmap-p2.png" alt-text="Image showing phase 2 of building an app." border="false":::

## Create your project

Use the Teams Toolkit to create your first project:

1. Open Visual Studio 2019.

1. Select **Create a new project**.

1. Select **Microsoft Teams App**, then select **Next**.  To help find the template, use the project type **Microsoft Teams**.

1. Enter a name and select **Next**.

1. Enter the application name and company name.

1. Select **Create**. The application name and company name are displayed to your end users. Your Teams app is created in a few seconds.


## Take a tour of the source code

After project creation, you have the components to build a basic personal app. You can view the project directories and files in the Explorer area of Visual Studio Code 2019.

:::image type="content" source="../assets/images/teams-toolkit-v2/blazor-file-layout.png" alt-text="Screenshot showing app project files for a personal app in Visual Studio 2019.":::

The Teams Toolkit creates a scaffolding for your project based on the capabilities you selected.

- The app icons are stored as PNG files in `color.png` and `outline.png`.
- The app manifest for publishing through the Developer Portal for Teams is stored in `Properties/manifest.json`.
- A backend controller is provided in `Controllers/BackendController.cs` for assisting with authentication.

As you created a tab app during project creation, the Teams Toolkit scaffolds all the necessary code for a basic tab as a [Blazor Server](/aspnet/core/blazor).

- `Pages/Tab.razor` is the front-end application's entry point.
- `TeamsFx.cs` and `JS/src/index.js` is used for initializing communications with the Teams host.

You can add backend functionality by adding other ASP.NET Core controllers to your application.

| **<<** | **>>** |
|:--- | ---:|
| **Back** : [Blazor App Prerequisites](blazor-app-prerequisites.md) | [2. Build your first Teams Blazor app](build-blazor-teams-app.md) : **Next**|
|



## See also

* [Tutorials Overview](code-samples.md)
* [Code Samples](https://github.com/OfficeDev/Microsoft-Teams-Samples)
