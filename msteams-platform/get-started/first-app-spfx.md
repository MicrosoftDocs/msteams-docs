---
title: Get started - Create your first Teams app with SPFx
author: zhenyasav
description: Learn how to create a Teams tab with the SharePoint Framework
ms.author: zhenyasa
ms.date: 05/19/2021
ms.topic: quickstart
ms.localizationpriority: none
---

# Create your first Teams app with SharePoint Framework (SPFx)

This tutorial walks you through the steps to create, build, and deploy a Teams app using SharePoint Framework SPFx. This app will have a tab capability.  

:::image type="content" source="../assets/images/get-started/app-roadmap/roadmap-p2.png" alt-text="Image showing phase 2 of building an app." border="false":::

In this tutorial, you'll learn:
- [How to set up a new project with Teams Toolkit](#create-your-project)
- [About the directory structure of your app](#take-a-tour-of-the-source-code)

## Create your project

If the prerequisites are in place, let's begin!

# [Visual Studio Code](#tab/vscode)

1. Open Visual Studio code.
1. Select the Teams Toolkit :::image type="icon" source="../assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.png"::: icon in the Visual Studio Code sidebar.

1. Select **Create New Project**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-project.png" alt-text="Location of the Create New Project link in the Teams Toolkit sidebar.":::

1. Select **Create a new Teams app**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-new-project-intro.png" alt-text="Wizard start for Create New Project":::

1. Select **Tab** and select **OK**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-project-capabilities.png" alt-text="Screenshot showing how to add capabilities to your new app.":::

1. Select **SharePoint Framework (SPFx)** as the Frontend hosting type.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-project-hosting.png" alt-text="Screenshot showing how to select hosting for your new app.":::

1. Select **React** in the **Framework** section.

   :::image type="content" source="../assets/images/teams-toolkit-v2/spfx-which-framework.png" alt-text="Select Framework":::

1. Select **Enter** to accept the default **Webpart Name**.
    
    :::image type="content" source="../assets/images/teams-toolkit-v2/webpart-name.png" alt-text="Enter Webpart name":::

1. Select **Enter** to accept the default **Webpart Description**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/webpart-description.png" alt-text="Enter Webpart description":::

1. Select a workspace folder. The Toolkit creates a folder in the workspace folder for the project.

1. Enter a suitable name for your app, like `HelloWorld`. Ensure that the name of the app is alphanumeric.  Select **Enter** to continue.

    :::image type="content" source="../assets/images/teams-toolkit-v2/spfx-app-name.png" alt-text="Enter SPFx app name":::

   Your Teams app is created within a few seconds.

    :::image type="content" source="../assets/images/teams-toolkit-v2/spfx-app-created.png" alt-text="SPFx app created":::

# [Command line](#tab/cli)

Use the `teamsfx` CLI to create your first project.  Start from the folder where you want to create the project folder.

``` bash
teamsfx new
```

The CLI walks through some questions to create the project. Every question includes an instruction on answering it, for example, Use arrow keys to select an option. When you've answered the question, select **Enter** to confirm it.

1. Select **Create a new Teams app**.
1. Select **Tab**.
1. Select **SharePoint Framework (SPFx)** frontend hosting.
1. Select **React** framework.
1. Press **Enter** for the **Webpart Name**.
1. Press **Enter** for the **Webpart Description**.
1. Press **Enter** to select the default workspace folder.
1. Enter a suitable name for your app, like `helloworld`.  The name of the app must consist only of alphanumeric characters.

   After all the questions have been answered, your project will be created.

---

- [Learn more about developing for SharePoint Framework](/sharepoint/dev/spfx/sharepoint-framework-overview)

## Take a tour of the source code

After project creation, you have the components to build a basic personal app. You can view the project directories and files in the Explorer area of Visual Studio Code.

:::image type="content" source="../assets/images/teams-toolkit-v2/app-project-files-spfx.png" alt-text="Screenshot showing app project files for a personal app in Visual Studio Code.":::

The Toolkit creates scaffolding for you in the project directory for the tab capability. 

Among other items in this directory, the Teams Toolkit contains:

- `fx`: App's state in the `.fx` directory.  
- appPackage: contains the app icons, `color.png` and `outline.png`.
- `manifest.source.json`: contains the app manifest for publishing to Developer Portal for Teams.
- `settings.json`: the settings you chose when creating the project.

As you selected an SPFx Webpart project, the following files are relevant to your UI:

- `SPFx/src/webparts/{webpart}`: contains your SPFx webpart.
- `.vscode/launch.json`: describes the debugging configurations available in the debug palette.

For more information about SharePoint Webparts for Teams, [see the SharePoint documentation](/sharepoint/dev/spfx/build-for-teams-overview).

| &nbsp; | &nbsp; |
|:--- | ---:|
| **Back** : [Prepare to build your app](spfx-app-prerequisites.md) | [Build your first tab app](build-spfx-app.md) : **Next**|
|