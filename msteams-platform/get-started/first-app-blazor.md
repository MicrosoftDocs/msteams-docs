---
title: Create your first Teams app with Blazor
author: adrianhall
description: Create a Microsoft Teams app that displays a "Hello, World!" message using the Microsoft Teams Toolkit and .NET Blazor.
ms.author: adhal
ms.date: 04/27/2021
ms.topic: quickstart
ms.localizationpriority: none
---

# Create your first Teams app with Blazor

This tutorial walks you through the steps to create, run, and deploy your first Teams app using .NET/Blazor.

:::image type="content" source="../assets/images/get-started/app-roadmap/roadmap-p2.png" alt-text="Image showing phase 2 of building an app." border="false":::

In this tutorial, you'll learn:
- [How to set up a new tab project with Teams Toolkit](#create-your-project)
- [About the directory structure of your app](#take-a-tour-of-the-source-code)

## Create your project

Use the Teams Toolkit to create your first project:

1. Open Visual Studio 2019.
1. Select **Create a new project**.

    :::image type="content" source="~/assets/images/teams-toolkit-v2/blazor/vs-create-project.png" alt-text="Illustration shows the option to create a new project.":::

1. Select **Microsoft Teams** from **All project types** dropdown list.  
    
    :::image type="content" source="~/assets/images/teams-toolkit-v2/blazor/create-new-project.png" alt-text="Illustration shows the option to select a template.":::

1. Select **Microsoft Teams App** as the template, and select **Next**.
    
    :::image type="content" source="~/assets/images/teams-toolkit-v2/blazor/configure-new-project.png" alt-text="Illustration shows the options to configure new project.":::
    
    The **Configure your new project** screen appears.

1. Enter a suitable name for your project.

1. Select the folder path where you want to create the project workspace.

1. Select the name for the solution you're creating, and select **Next**.
    
    :::image type="content" source="~/assets/images/teams-toolkit-v2/blazor/additional-information.png" alt-text="Illustration shows the option to provide additional information.":::

    The **Additional information** screen appears.

1. Enter the application name.

1. Enter the company name.
   The application name and company name are displayed to your end users.

1. Select **Create**. 
    
    Your Teams app is created in a few seconds.
    
    :::image type="content" source="~/assets/images/teams-toolkit-v2/blazor/hwb-app-created.png" alt-text="Illustration shows the app project created in Visual Studio 2019.":::

## Take a tour of the source code

After project creation, you have the components to build a basic personal app. You can view the project directory structure in the **Solution Explorer** area of Visual Studio 2019.

:::image type="content" source="../assets/images/teams-toolkit-v2/blazor/blazor-solution-explorer.png" alt-text="Screenshot showing app project files for a personal app in Visual Studio 2019.":::

The Teams Toolkit creates a scaffolding for your project based on the capabilities you selected. Among other files, the Teams Toolkit maintains:

- App icons: The app icons are stored as PNG files in `color.png` and `outline.png`.
- `manifest.json`: The app manifest for publishing through the Developer Portal for Teams is stored in `Properties/manifest.json`.
- `BackendController.cs`: A backend controller is provided in `Controllers/BackendController.cs` for assisting with authentication.

The Teams Toolkit scaffolds all the necessary code for a basic tab as a [Blazor Server](/aspnet/core/blazor).

- `Pages/Tab.razor`: is the front-end application's entry point.
- `TeamsFx.cs` and `JS/src/index.js`: is used for initializing communications with the Teams host.

You can add backend functionality by adding other ASP.NET Core controllers to your application.

| &nbsp; | &nbsp; |
|:--- | ---:|
|[:::image type="icon" source="../assets/images/get-started/app-roadmap/back-plan.png":::](blazor-app-prerequisites.md) | [:::image type="icon" source="../assets/images/get-started/app-roadmap/next-build.png":::](build-blazor-teams-app.md)|
|