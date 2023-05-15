---
title: Create a new Teams app using Teams Toolkit v4
author: zyxiaoyuer
description: In this module, learn how to create a new Teams app using Teams Toolkit v4.
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/14/2022
zone_pivot_groups: teams-app-platform
---
# Create a new Teams project using Teams Toolkit v4

> [!IMPORTANT]
>
> We've introduced the Teams Toolkit v5 extension within Visual Studio Code. This version comes to you with many new app development features. We recommend that you use Teams Toolkit v5 for building your Teams app.
>
> [Teams Toolkit v4](~/toolkit/toolkit-v4/teams-toolkit-fundamentals-v4.md) extension will soon be deprecated.

In this section, you can learn how to create a new Teams project using Microsoft Visual Studio Code and Visual Studio.

::: zone pivot="visual-studio-code"

## Create a new Teams project for Visual Studio Code

You can build a new Teams project by selecting **Create a new Teams app** in Teams Toolkit. You can create the following types of apps in Teams Toolkit:

| App Types | Definition |
| --- | --- |
| **Basic Teams apps** | Basic Teams apps are tab, bot, or message extension that you can create and customize based on your requirement. |
| **Scenario-based Teams apps** | Scenario-based Teams apps are notification bot, command bot, workflow bot, SSO-enabled tab, or SPFx tab app and these are suitable for one particular scenario. For example, a notification bot is suitable to send notifications and not used for chat. |

## Create a new Teams app

The process to create a new Teams app is similar for all types of apps except SPFx tab app, workflow bot, and notification bot.

**To create a basic Teams app**:

1. Open **Visual Studio Code**.

1. Select the **Teams Toolkit** > **Create a new Teams app**.

    :::image type="content" source="images/create-project-v4.png" alt-text="screenshot shows the Create New Project button in the Teams Toolkit sidebar.":::

1. Select **Start with a Teams capability**.

    :::image type="content" source="images/select-app-type-v4.png" alt-text="Screenshot shows the option to select app type." lightbox="images/select-app-type-v4.png":::

1. Ensure that **Tab** is selected as app capability.

    :::image type="content" source="images/select-capabilities-tabapp_1-v4.png" alt-text="Select App Capability":::

1. Select **JavaScript** as the programming language.

    :::image type="content" source="images/select-language-tab_1-v4.png" alt-text="Screenshot showing how to select the programming language.":::

1. Select **Default folder** to store your project root folder in the default location.

    :::image type="content" source="images/select-default-location-v4.png" alt-text="Select default location":::

    <details>
    <summary>Learn to change the default folder:</summary>

    1. Select **Browse**.

        :::image type="content" source="images/select-browse_1-v4.png" alt-text="Select browse for storage":::

    1. Select the location for project workspace.

        :::image type="content" source="images/select-folder_1-v4.png" alt-text="select-folder for storage":::

    The folder you select is the location for your project workspace.
    </details>

1. Enter a suitable name for your app, such as helloworld, as the application name. Ensure that you use only alphanumeric characters. Press **Enter**.

    :::image type="content" source="images/enter-name-tab1-v4.png" alt-text="Screenshot showing where to enter the app name.":::

    By default, your app project opens in a new window . You can open your app project in the current window as well.

    :::image type="content" source="images/new-window-notification-v4.png" alt-text="New window notification":::

   The Teams tab app is created in a few seconds.

    :::image type="content" source="images/tab-app-created-v4.png" alt-text="Screenshot showing the app created." lightbox="images/tab-app-created-v4.png":::

### Directory structure for different app types

Teams Toolkit provides all components for building an app. After creating the project, you can view the project folders and files under **EXPLORER** section.

<br>
<details>
<summary><b>Directory structure for basic Teams app</b></summary>

The following example shows a basic Teams tab app directory structure:

| Folder name | Contents |
| --- | --- |
| `.fx\configs` | Configuration files that you can customize for the Teams app. |
| - `.fx\configs\azure.parameters.<envName>.json` | Parameters file for Azure bicep provision for every environment. |
| - `.fx\configs\config.<envName>.json` | Configuration file for every environment. |
| - `.fx\configs\projectSettings.json` | Global project settings that apply to all environments. |
| `tabs` | Code for the Tab capability needed at runtime, such as the privacy notice, terms of use, and configuration tabs. |
| - `tabs\src\index.jsx` | Entry point for the front-end app, where the main app component is rendered with `ReactDOM.render()`. |
| - `tabs\src\components\App.jsx` | Code for handling URL routing in the app. It calls the [Microsoft Teams JavaScript client library](~/tabs/how-to/using-teams-client-library.md) to establish communication between your app and Teams. |
| - `tabs\src\components\Tab.jsx` | Code to implement the UI of your app. |
| - `tabs\src\components\TabConfig.jsx` | Code to implement the UI that configures your app. |
| `templates\appPackage` | App manifest template files, and the app icons: color.png and outline.png. |
| - `templates\appPackage\manifest.template.json` | App manifest for running the app in local or remote environment.  |
| `templates\azure` | `bicep` template files. |

> [!NOTE]
> If you have a bot or message extension app, relevant folders are added to the directory structure.

To learn more about the directory structure of different types of basic Teams apps, see the following table:

| App Type | Links |
| --- | --- |
| For tab app | [Build your first tab app using JavaScript](~/sbs-gs-javascript.yml) |
| For bot app | [Build your first bot app using JavaScript](~/sbs-gs-bot.yml) |
| For message extension app | [Build your first message extension app using JavaScript](~/sbs-gs-msgext.yml) |

</details>
<br>
<details>
<summary><b>Directory structure for scenario-based Teams app</b></summary>

The following example shows a scenario-based notification bot Teams app directory structure:

The new project folder contains the following content:

| Folder name | Contents |
| --- | --- |
| `.fx` | Project level settings, configuration, and environment information. |
| `.vscode` | VS code files for local debug. |
| `bot` | The bot source code. |
| `templates` | Templates for Teams app manifest and corresponding Azure resources. |

The core notification implementation is stored in the **bot** folder and it contains:

| File name | Contents |
| --- | --- |
| `src\adaptiveCards\` | Templates for Adaptive Card.  |
| `src\internal\` | Generated initialize code for notification functionality. |
| `src\index.ts` | The entry point to handle bot messages and send notifications. |
| `.gitignore` | File to exclude local files from the bot project. |
| `package.json` | The npm package file for the bot project. |

> [!NOTE]
> If you have a command bot, workflow bot, SSO-enabled tab, or SPFx tab app, relevant folders are added to the directory structure.

To learn more about the directory structure of different types of scenario-based Teams apps, see the following table:

| App Type | Links |
| --- | --- |
| For notification bot app | [Send notification to Teams](~/sbs-gs-notificationbot.yml) |
| For command bot app | [Build command bot](~/sbs-gs-commandbot.yml) |
| For workflow bot app | [Create Teams workflow bot](~/sbs-gs-workflow-bot.yml) |
| For SPFx tab app | [Build a Teams app with SPFx](~/sbs-gs-spfx.yml) |

</details>
<br>
<details>
<summary><b>Directory structure for multi-capability app</b></summary>

You can add more features to your existing Teams app by using **Add features**. For example, if you add a bot app to the existing tab app, Teams Toolkit adds the bot folder with relevant files and code.

The following image shows the directory structure of a tab app:

   :::image type="content" source="images/tabapp-directory-v4.png" alt-text="Tab app directory structure":::

The following image shows the directory structure of tab app with bot feature:

   :::image type="content" source="images/tab-app-with-bot-app-v4.png" alt-text="Tab app with bot app directory structure":::

</details>

::: zone-end

::: zone pivot="visual-studio"

## Create new Teams app in Visual Studio

Teams Toolkit provides Microsoft Teams app templates in Visual Studio to create Teams apps.  You can search and select the Teams app template that you require when you create a new project. Teams Toolkit for Visual Studio provides Teams app templates for creating:

* Tab app
* Command bot
* Notification bot
* Message Extension app

## Prerequisites

| &nbsp; | Install | For using... |
| --- | --- | --- |
| &nbsp; | **Required** | &nbsp; |
| &nbsp; | Visual Studio latest version | You can install the enterprise edition of Visual Studio, and then select the **ASP.NET and web development** workload and **Microsoft Teams Development Tools** for installing.|
| &nbsp; | Teams Toolkit | A Visual Studio workload that creates a project scaffolding for your app. Use latest version. |
| &nbsp; | [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Microsoft Teams to sideload your Teams app into local Teams environment for testing app behavior. |
 | &nbsp; | [Prepare your Microsoft 365 tenant](~/concepts/build-and-test/prepare-your-o365-tenant.md) | Access to Microsoft 365 account with the appropriate permissions to install an app. |

## Create a new Teams app

The steps to create a new Teams app are similar for all types of apps except notification bot. The following steps help you to create a new tab app:

1. Open Visual Studio.
1. Create a new project by using one of the following two options:

    * Select **Create a new project** under **Get started** to select a project template.
    * Select **Continue without Code** to open Visual Studio without selecting a Teams Toolkit template.

      :::image type="content" source="images/vs-create-new-project1_1_2-v4.png" alt-text="Create new project with code from get started":::

    * If your open Visual Studio code without selecting a Teams Toolkit template, select **File > New > Project** in Visual Studio to create a Teams app.

       :::image type="content" source="images/vs-create-new-project2_1_2-v4.png" alt-text="Create new project from file menu":::

    * The **Create a new project** window appears.  

1. Enter **teams** in the search box and then list, select **Microsoft Teams App** from the search results.

   :::image type="content" source="images/visual-studio-v4.png" alt-text="Search and choose microsoft teams app":::

1. Select **Next**.

   The **Configure your new project** window appears.

     :::image type="content" source="images/vs-ms-teams-app-project-name_1_2-v4.png" alt-text="Name your application":::

    1. Enter a suitable name for your project.

         > [!NOTE]
         > The project name you are entering is automatically filled in the **Solution name**. If you want, you can change the solution name with no effect on the project name.

    1. Select the folder location where you want to create the project workspace.
    1. Enter a different solution name, if you want.
    1. If required, select the checkbox to save the project and solution in the same folder. For this tutorial, you don't need this option.
    1. Select **Create**.

   The **Create a new Teams application** window appears.

1. Ensure **Tab** is selected, then select **Create**.

   > [!NOTE]
   > If you want to add single sign-on capability to your Teams app, select the Configure with single sign-on checkbox. For more information on single sign-in in Teams app created using Teams Toolkit, see [Add single sign-on to your Teams apps](/microsoftteams/platform/toolkit/add-single-sign-on?pivots=visual-studio).

   :::image type="content" source="images/vs-ms-teams-app-type_3_1-v4.png" alt-text="Select the teams app type":::

You can select any type of Teams app for your project.

   The **GettingStarted .txt** window appears.

   :::image type="content" source="images/vs-getting-started-page_1-v4.png" alt-text="Select the Getting Started teams toolkit":::

You have created the app project scaffolding for your Teams app using Teams Toolkit template.

### Directory Structure

Teams Toolkit provides all components for building an app. After creating the project, you can view the project folders and files under **Solution Explorer**.

* **Directory structure for basic Teams apps**

  :::image type="content" source="images/vs-create-new-project-solution-explorer_1_3-v4.png" alt-text="Select the tab Solution Explorer teams toolkit":::

* **Directory structure for scenario-based Teams apps**

  :::image type="content" source="images/vs-create-new-project-solution-explorer_2-v4.png" alt-text="Select the Solution Explorer teams toolkit":::

## Teams app templates in Teams Toolkit for Visual Studio

You can see Teams app templates already populated in Teams Toolkit for various Teams app types. The following table lists all the templates available:

|Teams app templates  |Description  |
|---------|---------|
|**Notification Bot**     |Notification bot app can send notifications to your Teams client. There are multiple ways to trigger the notification. For example, trigger the notification by HTTP request, or by time. You can select triggered notification based on your business scenario.         |
|**Command Bot**     |You can type a command to interact with the bot using the command bot app.         |
|**Tab**     |Tab app shows a webpage inside Teams, and it enables single sign-on (SSO) using Teams account.         |
|**Message Extension**     |Message extension app implements simple features like creating an Adaptive Card, searching Nugget packages, unfurling links for the `dev.botframework.com` domain.         |

After the project is created, Teams Toolkit automatically opens **GettingStarted** window. You can see the instructions in **GettingStarted** window and check out the different features in Teams Toolkit.

::: zone-end

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals-v4.md)
* [Build a Teams app with Blazor](~/sbs-gs-blazorupdate.yml)
* [Build a Teams app with C# or .NET](~/sbs-gs-csharp.yml)
* [Prerequisites for all types of environment and create your Teams app](tools-prerequisites-v4.md)
* [Prepare to build apps using Microsoft Teams Toolkit](build-environments-v4.md)
* [Provision cloud resources using Visual Studio](provision-v4.md)
* [Deploy Teams app to the cloud using Visual Studio](deploy-v4.md#deploy-teams-app-to-the-cloud-using-visual-studio)
