---
title: Create a new Teams app
author: zyxiaoyuer
description: In this module, learn how to create a new Teams app using Teams Toolkit
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/14/2022
---

# Create a new Teams app using Teams Toolkit

You can built a new Teams app by using **Create a new Teams app** in Teams Toolkit. You can create following types of app in Teams Toolkit:

| App Type | Definition |
| --- | --- |
| Basic Teams app | Basic Teams app are tab, bot, or message extension app that you can create and customize based on your needs. |
| Scenario based Teams app | Scenario based Teams app are notification bot, command bot, SSO-enabled tab, or SPFx tab app and it is suitable for one particular scenario. For example, notification bot is suitable only to send notification and not used for chat. |

## Create a new Teams app

The steps to create a new Teams app is similar for all types of app except SPFx, and notification bot. The following steps help you to built a new tab app:

To create an app,

1. Open Visual Studio Code.
1. Select the Teams Toolkit :::image type="icon" source="../assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.PNG"::: icon.
1. Select **Create a new Teams app**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-new-teams-app.png" alt-text="Teams toolkit sidebar":::

1. Select **Create a new Teams app** to create an app using Teams Toolkit.

   :::image type="content" source="../assets/images/teams-toolkit-v2/select-create-app.png" alt-text="Create an app":::

1. For this tutorial, select **Tab** as the capability that you want to build in your app.

   :::image type="content" source="../assets/images/teams-toolkit-v2/select-tabapp1.png" alt-text="Select App Capability":::

   > [!NOTE]
   > You can select any type of capability based on your app requirement.

1. Select **JavaScript** as the programming language.

    :::image type="content" source="../assets/images/teams-toolkit-v2/select-language-tab.png" alt-text="Screenshot showing how to select the programming language":::

1. Select the location for project workspace and select the **Select Folder**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/select-folder1.png" alt-text="select-folder":::

1. For this tutorial, enter `helloworld` as the application name. Select **Enter**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/enter-name-tab.png" alt-text="Screenshot showing where to enter the app name":::

   > [!NOTE]
   > You can enter your own application name for other capabilities and ensure that you use only alphanumeric characters.

   The Teams tab app is created in a few seconds.

    :::image type="content" source="../assets/images/teams-toolkit-v2/tap-app-created1.png" alt-text="Screenshot showing the app created":::

### Directory structure for different app types

Teams Toolkit provides all components for building an app. After creating the project, you can view the project folders and files under **Explorer**.

Directory structure for basic Teams app:

You have three different types of basic Teams app and directory structure looks similar for all types of apps. The following example shows you one basic Teams app directory structure:

> [!NOTE]
> If you have a bot or message extension app, relevant folders is added to the directory structure.

<details>
<summary><b>Tab app</b></summary>

| Folder name | Contents |
| --- | --- |
| `.fx/configs` | Configuration files that user can customize for the Teams app. |
| - `.fx/configs/config.<envName>.json` | Configuration file for every environment. |
| - `.fx/configs/azure.parameters.<envName>.json` | Parameters file for Azure BICEP provision for every environment. |
| - `.fx/configs/projectSettings.json` | Global project settings that apply to all environments. |
| `tabs` | Code for the Tab capability needed at runtime, such as the privacy notice, terms of use, and configuration tabs. |
| - `tabs/src/index.jsx` | Entry point for the front-end app, where the main App component is rendered with `ReactDOM.render()` |
| - `tabs/src/components/App.jsx` | Code for handling URL routing in the app. It calls the [Microsoft Teams JavaScript client SDK](../tabs/how-to/using-teams-client-sdk.md) to establish communication between your app and Teams. |
| - `tabs/src/components/Tab.jsx` | Code to implement the UI of your app. |
| - `tabs/src/components/TabConfig.jsx` | Code to implement the UI that configures your app. |
| `templates/appPackage` | App manifest template files, and the app icons: color.png and outline.png. |
| - `templates/appPackage/manifest.template.json` | App manifest for running the app in local or remote environment.  |
| `templates/azure` | BICEP template files |
</details>

To learn more about the directory structure of different types of basic Teams app, see the following table:

| App Type | Links |
| --- | --- |
| For tab app | [Build your first tab app using JavaScript](../sbs-gs-javascript.yml) |
| For bot app | [Build your first bot app using JavaScript](../sbs-gs-bot.yml) |
| For message extension app | [Build your first message extension app using JavaScript](../sbs-gs-msgext.yml) |

Directory structure for scenario based Teams app:

You have four different types of scenario based Teams app and directory structure looks similar for all types of apps. The following example shows you one scenario based Teams app directory structure:

> [!NOTE]
> If you have a command bot, SSO-enabled tab, or SPFx tab app, relevant folders is added to the directory structure.

<details>
<summary><b>Notification bot app</b></summary>

The new project folder contains following content:

| Folder name | Contents |
| --- | --- |
| `.fx` | Project level settings, configuration, and environment information |
| `.vscode` | VS code files for local debug |
| `bot` | The bot source code |
| `templates` | Templates for Teams app manifest and corresponding Azure resources |

The core notification implementation in **bot** folder and it contains:

| File name | Contents |
| --- | --- |
| `src/adaptiveCards/` | Templates for Adaptive card  |
| `src/internal/` | Generated initialize code for notification functionality |
| `src/index.*s` | The entrypoint to handle bot messages and send notifications |
| `.gitignore` | File to exclude local files from bot project |
| `package.json` | The NPM package file for bot project |
</details>

To learn more about the directory structure of different types of basic Teams app, see the following table:

| App Type | Links |
| --- | --- |
| For notification bot app | [Send notification to Teams](../sbs-gs-notificationbot.yml) |
| For command bot app | [Build command bot](../sbs-gs-commandbot.yml) |
| For SPFx tab app | [Build a Teams app with SPFx](../sbs-gs-spfx.yml) |

### Directory structure for multi-capability app

You can add additional features to your existing Teams app by using add features. For example, if you add bot app to the existing tab app, Teams Toolkit adds the bot folder with relevant files and code.

The following image shows the directory structure of tab app:

   :::image type="content" source="../assets/images/teams-toolkit-v2/tabapp-directory.png" alt-text="Tab app directory structure":::

The following image shows the directory structure of tab app with bot feature:

   :::image type="content" source="../assets/images/teams-toolkit-v2/tab-app-with-bot-app.png" alt-text="Tab app with bot app directory structure":::

## See also

* [Build a Teams app with Blazor](../sbs-gs-blazorupdate.yml)
* [Build a Teams app with C# or .NET](../sbs-gs-csharp.yml)
* [Prerequisites for all types of environment and create your Teams app](tools-prerequisites.md)
* [Support for app types and Azure function](app-types-and-azure-function.md)
* [Add capabilities to Teams apps](add-capability.md)
* [Add cloud resources to Teams app](add-resource.md)
