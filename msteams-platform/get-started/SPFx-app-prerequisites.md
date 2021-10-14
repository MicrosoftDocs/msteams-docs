---
title: Teams app with SPFx - Prerequisites
author: adrianhall
description: Prerequisites for building a Teams app that displays a "Hello, World!" message using the Microsoft Teams Toolkit and SPFx.
ms.author: adhal
ms.date: 04/27/2021
ms.topic: quickstart
ms.localizationpriority: none
---

# Your first Hello World app with SPFx

Start Microsoft Teams development by building your first app - "Hello World" with a tab capability.

## The app road-map

Building an app using Teams Toolkit follows a four-step process:

:::image type="content" source="../assets/images/get-started/app-roadmap/roadmap-p1.png" alt-text="Image showing phase 1 of building an app." border="false":::

Before you begin creating your first Teams app, install the tools and set up your development environment. This is the first phase - Plan and Prepare. As you proceed through this step-by-step guide, this road-map highlights the phase you're on.

In this tutorial, you'll learn:

- how to set up a new project with Teams Toolkit.
- how to build an app with a tab capability.
- the structure of the app and how to build the tab capability with SPFx.
- how to deploy the app to SharePoint.

> [!NOTE]
> Currently, Visual Studio Code offers only the Tab capability in a Teams app with SharePoint Framework. The Bot and Message Extension capabilities are not available.

## Install tools

The following tools are required for building an app:

| Install   | For using... |
| --- | --- |
| [Node.js](https://nodejs.org/en/download/) | Back-end JavaScript runtime environment. Use the latest v14 LTS release. It's a required tool. |
| [Microsoft Edge](https://www.microsoft.com/edge) (recommended) or [Google Chrome](https://www.google.com/chrome/) | A browser with developer tools. It's a required tool. |
| [Visual Studio Code](https://code.visualstudio.com/download) | JavaScript, TypeScript, or SharePoint Framework (SPFx) build environments. Use version 1.55 or later. It's a required tool. |
| [Azure Tools for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack) and [Azure CLI](/en-us/cli/azure/install-azure-cli) | Azure tools to access stored data, or deploy a cloud-based backend for your Teams app in Azure. It's an optional tool. |
| [React Developer Tools for Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) OR [React Developer Tools for Edge](https://microsoftedge.microsoft.com/addons/detail/react-developer-tools/gpphkfbcpidddadnkolkpfckpihlkkil) | Browser tools for tabs development with JavaScript. It's an optional tool. |
| [Microsoft Graph Explorer](https://developer.microsoft.com/graph/graph-explorer) | Microsoft Graph Explorer, the browser-based tool that allows you to query Microsoft Graph data. It's an optional tool. |
| [Developer Portal for Teams](https://dev.teams.microsoft.com/) | Web-based portal to configure, manage, and distribute your Teams app including to your organization or the Teams store. It's an optional tool. |

> [!WARNING]
> There are known issues with `npm@7`, packaged with Node v15 and later. If you have problems running `npm install`, ensure you're using Node v14 (LTS)

> [!TIP]
> If you work with Microsoft Graph data, you should learn about and bookmark the Microsoft Graph Explorer. This browser-based tool allows you to query Microsoft Graph outside of an app.

## Prepare development environment

After you've installed the required tools, set up the development environment.

### Install the Teams Toolkit

The Teams Toolkit helps simplify the development process with tools to provision and deploy cloud resources for your app, publish to the Teams store, and more. You can use the toolkit with Visual Studio Code, Visual Studio, or as a CLI (called `teamsfx`). For more information, see [Teams Toolkit for Visual Studio Code](../toolkit/visual-studio-code-overview.md), [Teams Toolkit for Visual Studio](../toolkit/visual-studio-overview.md) and [Teamsfx CLI Tool](https://github.com/OfficeDev/TeamsFx/tree/dev/packages/cli).

# [Visual Studio Code](#tab/vscode)

1. Open Visual Studio Code and select the **Extensions** view (**Ctrl+Shift+X** / **⌘⇧-X** or **View > Extensions**).
1. In the search box, enter **Teams Toolkit**.
1. Select **Install** next to the Teams Toolkit.

    :::image type="content" source="~/assets/images/teams-toolkit-v2/prerequisites/install-toolkit-vscode.png" alt-text="Illustration shows the Teams Toolkit extension installation.":::

    The Teams Toolkit icon appears in the Visual Studio Code sidebar after it's installed.

     :::image type="content" source="~/assets/images/teams-toolkit-v2/prerequisites/hw-teams-toolkit-sidebar-icon.png" alt-text="Illustration shows the Teams Toolkit icon in Visual Studio Code sidebar.":::

You also can find the Teams Toolkit on the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension).

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

## SharePoint Collection Site Administrator account

Ensure that you have an Administrator account for a SharePoint Site Collection. You'll need this account at deployment for hosting. If you're using a Microsoft 365 developer program tenant, you can use the administrator account you created at the time.

Now you’ve got all tools and set up your account. Next, let's set up your development environment and start building!

| &nbsp; | &nbsp; |
|:--- | ---:|
|[:::image type="icon" source="../assets/images/get-started/app-roadmap/back-overview.png":::](code-samples.md) | [:::image type="icon" source="../assets/images/get-started/app-roadmap/next-create-tab.png":::](first-app-spfx.md)|
|