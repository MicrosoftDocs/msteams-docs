---
title: Teams app with Blazor- Prerequisites
author: adrianhall
description: Prerequisites for building a Teams app that displays a "Hello, World!" message using the Microsoft Teams Toolkit and .NET Blazor.
ms.author: adhal
ms.date: 04/27/2021
ms.topic: quickstart
ms.localizationpriority: none
---

# Your first Hello World app with Blazor

Start Microsoft Teams development by building your first app - "Hello, world!" with a tab capability. You'll build this app with Blazor and Visual Studio 2019.

> [!NOTE]
> Currently, Visual Studio offers a template only for the Tab capability in a Teams app. The Bot and Message Extension capabilities are not available.

## The app road-map

Building an app using Teams Toolkit follows a four-step process:

:::image type="content" source="../assets/images/get-started/app-roadmap/roadmap-p1.png" alt-text="Image showing phase 1 of building an app." border="false":::

Before you begin creating your first Teams app, install the tools and set up your development environment. This is the first phase - Plan and Prepare. As you proceed through this step-by-step guide, this road-map highlights the phase you're on.

In this tutorial, you'll learn:

- how to set up a new project with Teams Toolkit.
- how to build an app with a tab capability.
- the structure of the app and the tab capability.
- how to deploy the app

## Install tools

The following tools are required for building an app:

- A browser with developer tools, such as, [Microsoft Edge](https://www.microsoft.com/edge) (recommended) or [Google Chrome](https://www.google.com/chrome/).
- [Visual Studio 2019](https://visualstudio.com/download), **ASP.NET and web development**, or **.NET Core cross-platform development** workload for .NET.

### Optional tools

The following Visual Studio Code extensions and tools not required, but helpful during development.

Azure tools to access stored data, or deploy a cloud-based backend for your Teams app in Azure:

- [Azure Tools for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack)
- [Azure CLI](/en-us/cli/azure/install-azure-cli)

Microsoft Graph Explorer, the browser-based tool that allows you to query Microsoft Graph data:

- [Microsoft Graph Explorer](https://developer.microsoft.com/graph/graph-explorer)

> [!TIP]
> If you work with Microsoft Graph data, you should learn about and bookmark the Microsoft Graph Explorer. This browser-based tool allows you to query Microsoft Graph outside of an app.
</details>

Web-based portal to configure, manage, and distribute your Teams app including to your organization or the Teams store:

- [Developer Portal for Teams](https://dev.teams.microsoft.com/)

## Prepare development environment

After you've installed the required tools, set up the development environment.

### Install the Teams Toolkit

The Teams Toolkit helps simplify the development process with tools to provision and deploy cloud resources for your app, publish to the Teams store, and more. You can use the toolkit with Visual Studio Code, Visual Studio, or as a CLI (called `teamsfx`). For more information, see [Teams Toolkit for Visual Studio Code](../toolkit/visual-studio-code-overview.md), [Teams Toolkit for Visual Studio](../toolkit/visual-studio-overview.md) and [Teamsfx CLI Tool](https://github.com/OfficeDev/TeamsFx/tree/dev/packages/cli).

# [Visual Studio 2019](#tab/vs)

You can use Visual Studio 2019 to develop Teams apps with Blazor Server in .NET.

To install the Teams Toolkit extension:

1. Open Visual Studio 2019.
1. Select **Extensions** > **Manage Extensions**.
1. In the search box, enter **Teams Toolkit**.
1. Select the Teams Toolkit extension and select **Download**. The extension is downloaded.
1. Close Visual Studio 2019 to install the extension.

# [Command line](#tab/cli)

To install the TeamsFx CLI, use the `npm` package manager:

``` bash
npm install -g @microsoft/teamsfx-cli
```

Depending on your configuration, you may need to use `sudo` to install the CLI:

``` bash
sudo npm install -g --unsafe-perm @microsoft/teamsfx-cli
```

This condition is more common on Linux and macOS systems.

Ensure you add the npm global cache to your PATH. This step is normally done as part of the Node.js installer.  

You can use the CLI with the `teamsfx` command. Verify that the command is working by running `teamsfx -h`.

> [!CAUTION]
> Before you can run TeamsFx in PowerShell terminals, you must enable the "remote signed" execution policy for PowerShell. For more information about it, see the [PowerShell documentation](/powershell/module/microsoft.powershell.core/about/about_signing).

---

## Set up your Teams development tenant

A **tenant** is like a space, or a container for your organization in Teams, where you chat, share files, and run meetings. This space is also where you sideload and test your app. Let's verify if you're ready to develop with the tenant.

### Enable sideloading option

After creating the app, you must load your app in Teams without distributing it. This process is known as sideloading. Sign in to your Microsoft 365 account to view this option.
  
Do you already have a tenant, and do you have the admin access? Let's check if you really do!

Verify if you can sideload apps in Teams:

1. In the Teams client, select **Store** icon.
1. Select **Manage your apps**.
1. Look for the option to **Upload a custom app**. If you see the option, sideloading apps is enabled.

 :::image type="content" source="~/assets/images/teams-toolkit-v2/prerequisites/upload-custom-app.png" alt-text="Illustration shows the option to upload a custom app in Teams.":::

> [!NOTE]
> If you don't have the option to upload a custom app, talk to your Teams administrator. For more information, see [enable custom Teams apps and turn on custom app uploading](~/concepts/build-and-test/prepare-your-o365-tenant.md#enable-custom-teams-apps-and-turn-on-custom-app-uploading).

### Create a free Teams developer tenant (optional)

If you can't see the option to **Upload a custom app**, or you don't have a Teams account, you can get a free Teams developer account. Join the Microsoft 365 developer program!

1. Go to the [Microsoft 365 developer program](https://developer.microsoft.com/microsoft-365/dev-program).
1. Select **Join Now** and follow the onscreen instructions.
1. In the welcome screen, select **Set up E5 subscription**.
1. Set up your administrator account. After you finish, the following screen appears.

    :::image type="content" source="~/assets/images/build-your-first-app/dev-program-subscription.png" alt-text="Example of what you see after signing up for the Microsoft 365 developer program.":::

1. Sign in to Teams using the administrator account you just set up. Verify that you have the **Upload a custom app** option in Teams.

## Get a free Azure account

If you wish to host your app or access resources in Azure, you must have an Azure subscription. [Create a free account](https://azure.microsoft.com/free/) before you begin.

Now you’ve got all tools and set up your accounts. Next, let's set up your development environment and start building!

| &nbsp; | &nbsp; |
|:--- | ---:|
| **Back** : [Overview](code-samples.md) | [Create your first Blazor app](first-app-blazor.md) : **Next**|
|