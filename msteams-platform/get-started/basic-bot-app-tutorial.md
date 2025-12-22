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
<!-- markdownlint-disable MD051 -->

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

## Create project workspace for your bot app

Let's create your first bot app.

The bot capability of a Teams app creates a chatbot or a conversational bot. You use it to run simple and automated tasks, like providing customer service. A bot talks with a web service and helps you use its offerings. You can get weather forecast, make reservations, or any other service offered using a conversational bot.

:::image type="content" source="../assets/images/toolkit-v2/first-bot/your-helloworld-app-bot.png" alt-text="Diagram showing this app has three features. Bot is highlighted.":::

As you've already prepared for creating these apps, you can set up a new Teams project for creating the bot app.

In this tutorial, you learn:

1. [How to set up a new bot project with Agents Toolkit.](#create-your-bot-project-workspace)
1. [About the directory structure of your app project.](#take-a-tour-of-the-bot-app-source-code)

> [!IMPORTANT]
> Bots are available in [Government Community Cloud (GCC), GCC High, Department of Defense (DoD)](concepts/cloud-overview.md#teams-app-capabilities), and [Teams operated by 21Vianet](~/concepts/sovereign-cloud.md) environments.

## Create your bot project workspace

If the prerequisites are in place, let's begin!

> [!NOTE]
> The Visual Studio Code UI shown is from Mac. It may differ depending on your operating system, Agents Toolkit version, and environment.

# [Visual Studio Code](#tab/vscode)

1. Open Visual Studio Code.
1. Select the Microsoft 365 Agents Toolkit :::image type="icon" source="../msteams-platform/assets/images/toolkit-v2/toolkit-sidebar-icon.png"::: icon in the Visual Studio Code **Activity Bar**.

1. Select **Create a New Agent/App** > **Teams App**.

    :::image type="content" source="../msteams-platform/assets/images/toolkit-v2/first-bot/create-project.png" alt-text="Screenshot shows the location of the Create New Project link in the Agents Toolkit sidebar.":::

1. Select **Bot** to create a new bot project.

    :::image type="content" source="../msteams-platform/assets/images/toolkit-v2/first-bot/create-new-app1.png" alt-text="Screenshot shows the wizard to Create New Project.":::

1. Ensure that **Basic Bot** is selected as the app feature that you want to build in your app.

    :::image type="content" source="../msteams-platform/assets/images/toolkit-v2/first-bot/select-bot.png" alt-text="Screenshot shows the app feature to add to your new app.":::

1. Select **JavaScript** as the programming language.

    :::image type="content" source="../msteams-platform/assets/images/toolkit-v2/first-bot/select-language-tab.png" alt-text="Screenshot shows the option to select the programming language.":::

1. Select **Default folder** to store your project root folder in default location.

    :::image type="content" source="../msteams-platform/assets/images/toolkit-v2/first-bot/select-default-location.png" alt-text="Screenshot shows the selection of default location.":::

    You can also change the default location by the following steps:

    1. Select **Browse**.

       :::image type="content" source="../msteams-platform/assets/images/toolkit-v2/first-bot/select-browse.png" alt-text="Screenshot shows the selection of browse location option.":::

    1. Select the location for project workspace.
    1. Select the **Select Folder**.

       :::image type="content" source="../msteams-platform/assets/images/toolkit-v2/select-folder.png" alt-text="Screenshot shows the folder to select.":::

1. Enter a suitable name for your app and then select **Enter**.

:::image type="content" source="../msteams-platform/assets/images/toolkit-v2/first-bot/hello-bot.png" alt-text="Screenshot shows where to enter the app name.":::

A dialog appears, where you would be required to choose yes or no to trust the authors of the files in this folder.

:::image type="content" source="../msteams-platform/assets/images/toolkit-v2/first-bot/vsc-trust-authors.png" alt-text="Screenshot shows the dialog to trust or not the authors of the files in this folder.":::

Your Teams app with a bot capability is created in few seconds.

:::image type="content" source="../msteams-platform/assets/images/toolkit-v2/first-bot/app-created-bot.png" alt-text="Screenshot shows the app created.":::

After your app is created, Agents Toolkit displays the following message:

:::image type="content" source="../msteams-platform/assets/images/toolkit-v2/preview-project.png" alt-text="Screenshot shows the message that the feature is successfully created.":::

Select **Local debug** to preview your project.

<details>
<summary>A quick recap of creating a Teams app.</summary>
Watch this short recap for creating a Teams app.

![Create a Teams app](~/assets/videos/javascript-bot-app1.gif)
</details>

# [Command line](#tab/cli)

Use the `atk' CLI to create your first project.  Start from the folder where you want to create the project folder.

```dotnetcli
atk new
```

You can use the CLI to create a new Teams app. The CLI leads you through a series of questions. Every question includes an instruction on answering it.

For example, use arrow keys to select an option. After you make the choice, select **Enter** to confirm it.

1. Select **Create a new Teams app**.
1. Select **Bot** and deselect **Tab**.
1. Select **JavaScript** as the programming language.
1. Select **Enter** to select the default workspace folder.
1. Enter a suitable name for your app, like `HelloBot`. The name of the app must consist only of alphanumeric characters.

After you've answered all questions, your project is created.

---
