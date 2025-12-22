---
title: Build your first bot app - Hello World
author: surbhigupta
description: With this learning module, you learn how to build Hello World app with JavaScript by setting up a new project with Agents Toolkit, build and deploy a bot app.
ms.topic: article
ms.author: surbhigupta
ms.localizationpriority: high
ms.date: 12/22/2025
---

<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD024 -->
<!-- markdownlint-disable MD001 -->

# Build your first bot app

Start Microsoft Teams app development with your first Teams app. You can create a bot app with Teams using Javascript.

Your app has a capability, which comes with its own UI and UX:

:::image type="content" source="../assets/images/toolkit-v2/prerequisites/your-helloworld-app.png" alt-text="Diagram shows that this app has three features.":::

In this tutorial, you'll learn:

- How to set up a new project with Microsoft 365 Agents Toolkit (previously known as Teams Toolkit).
- How to build a bot app.
- How to deploy your app.

## Prerequisites

Ensure you install the following tools for building and deploying your apps.

| &nbsp; | Install | For using... |
| --- | --- | --- |
| **Required** | &nbsp; | &nbsp; |
| &nbsp; | [Microsoft 365 Agents Toolkit](#install-microsoft-365-agents-toolkit) | A Microsoft Visual Studio Code extension that creates a project scaffolding for your app. Use the latest version. |
| &nbsp; | [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Microsoft Teams to collaborate with everyone you work with through apps for chat, meetings, and call all in one place.|
| &nbsp; | [Node.js](https://nodejs.org/en/download/) | Back-end JavaScript runtime environment. For more information, see [Node.js version compatibility table for project type](~/toolkit/build-environments.md#nodejs-version-compatibility-table-for-project-type).|
| &nbsp; | [Microsoft Edge](https://www.microsoft.com/edge) (recommended) or [Google Chrome](https://www.google.com/chrome/) | A browser with developer tools. |
| &nbsp; | [Visual Studio Code](https://code.visualstudio.com/download) | JavaScript, TypeScript, or SharePoint Framework (SPFx) build environments. Use the latest version. |
| **Optional** | &nbsp; | &nbsp; |
| &nbsp; | [Azure Tools for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack) and [Azure CLI](/cli/azure/install-azure-cli) | Azure tools to access stored data or to deploy a cloud-based backend for your Teams app in Azure. |
| &nbsp; | [React Developer Tools for Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) OR [React Developer Tools for Microsoft&nbsp;Edge](https://microsoftedge.microsoft.com/addons/detail/react-developer-tools/gpphkfbcpidddadnkolkpfckpihlkkil) | A browser DevTools extension for the open-source React JavaScript library. |
| &nbsp; | [Microsoft Graph Explorer](https://developer.microsoft.com/graph/graph-explorer) | Microsoft Graph Explorer, a browser-based tool that lets you run a query from Microsoft Graph data. |
| &nbsp; | [Developer Portal for Teams](https://dev.teams.microsoft.com/) | Web-based portal to configure, manage, and publish your Teams app including to your organization or the Microsoft Teams Store. |

> [!TIP]
> If you work with Microsoft Graph data, you should learn about and bookmark the Microsoft Graph Explorer. This browser-based tool allows you to query Microsoft Graph outside of an app.

### Set up prerequisites

After you install the required tools, set up the development environment.

### Install Microsoft 365 Agents Toolkit

Microsoft 365 Agents Toolkit (previously known as Teams Toolkit) helps simplify the development process with tools to provision and deploy cloud resources for your app and publish to the Teams Store.

You can use Agents Toolkit with Visual Studio Code or a command-line interface called Microsoft 365 Agents Toolkit CLI (previously known as TeamsFx CLI).

# [Visual Studio Code](#tab/vscode)

1. Open Visual Studio Code and select **Extensions** (**Ctrl+Shift+X** or **View** > **Extensions**).
2. In the search box, enter **Microsoft 365 Agents Toolkit**.
3. Select **Install**.

   :::image type="content" source="../assets/images/include-files/install-toolkit-vs.png" alt-text="Screenshot shows the Agents Toolkit extension installation.":::

   The Microsoft 365 Agents Toolkit :::image type="icon" source="../assets/images/include-files/toolkit-sidebar-icon.PNG"::: icon appears in the Visual Studio Code Activity Bar.

You can also install Agents Toolkit from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension).

# [Command Line](#tab/cli)

To install Agents Toolkit CLI, use the `npm` package manager and enter the following command in Command prompt:

```dotnetcli
npm install -g @microsoft/m365agentstoolkit-cli
```

Depending on your configuration, you might need to use `sudo` to install the CLI:

```dotnetcli
sudo npm install -g --unsafe-perm @microsoft/m365agentstoolkit-cli
```

This condition is more common on Linux and macOS systems.

Ensure you add the npm global cache to your PATH. This step is normally done as part of the Node.js installer.

You can use the CLI with the `atk` command. Verify that the command is working by running`atk -h`.

> [!CAUTION]
> Before you can run TeamsFx in PowerShell terminals, you must enable the **remote signed** execution policy for PowerShell.

---

## Set up your Teams development tenant

A tenant is a space or a container for your organization in Teams, where you chat, share files, and run meetings. This space is also where you upload and test your app. Let's verify if you're ready to develop with the tenant.

### Check for upload an app option

After creating your custom app, you must upload your app to Teams with the **Upload a custom app** option. Sign in to your Microsoft 365 account to check if this option is enabled.

The following steps help you verify if you can upload apps in Teams:

1. In the Teams client, select the **Apps** icon.
2. Select **Manage your apps**.
3. Select **Upload an app**.
4. Look for the option to **Upload a custom app**. If the option is visible, you can upload custom apps.

   :::image type="content" source="../assets/images/toolkit-v2/prerequisites/upload-custom-app.png" alt-text="Screenshot shows the option to upload a custom app in Teams." :::

> [!NOTE]
> If you don't find the option to upload a custom app, contact your Teams administrator.

### Create a free Teams developer tenant

If you don't have a Teams developer account, join the Microsoft 365 developer program. This is an optional step.

1. Go to the [Microsoft 365 developer program](https://developer.microsoft.com/microsoft-365/dev-program).
1. Select **Join Now** and follow the onscreen instructions.
1. In the welcome screen, select **Set up E5 subscription**.
1. Set up your administrator account. After you finish, the following screen appears:

   :::image type="content" source="../assets/images/include-files/microsoft-365.png" alt-text="Screenshot shows the Microsoft 365 Developer Program.":::

1. Sign in to Teams using the administrator account you just set up. Verify that you have the **Upload a custom app** option in Teams.

### Get a free Azure account

If you want to host your app or access resources in Azure, you must have an Azure subscription. [Create a free account](https://azure.microsoft.com/free/) before you begin.

Now you've got all the tools to set up your account. Next, let's set up your development environment and start building! Select the app you want to create first.
