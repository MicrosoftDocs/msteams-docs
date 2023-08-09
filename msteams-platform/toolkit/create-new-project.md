---
title: Create a new Teams app
author: zyxiaoyuer
description: In this module, learn how to create a new Teams app using Teams Toolkit.
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/14/2022
zone_pivot_groups: teams-app-platform
---
# Create a new Teams project

In this article, learn how to create a new Teams project using Teams Toolkit.

::: zone pivot="visual-studio-code"

## Create a new Teams project using Visual Studio Code

You can build a new Teams project by selecting **Create a New App** in Teams Toolkit. You can start from built-in Teams app templates or start from official Teams app samples in Teams Toolkit. What's more, Teams Toolkit v5 supports to start with Outlook Add-in templates to build your own Outlook Add-ins.

:::image type="content" source="../assets/images/teams-toolkit-v2/teams-toolkit-v5/select-new-project.png" alt-text="Screenshot shows the selection of new project from the list of options.":::

To start with Teams capabilities, you can create the following types of Teams app:

| App Types | Definition |
| --- | --- |
| **Scenario-based Teams apps** | This group of templates are designed for particular abstracted business scenarios that your teams app can serve for. For example notification bot, command bot, SSO-enabled tab, or Dashboard tab app. |
| **Basic Teams apps** | Basic Teams apps are just hello world Teams tab, bot, or message extension that you can create and customize based on your requirement. |
| **Extend Teams App across Microsoft 365** | This group of Teams app can be installed and run on Outlook and Office.com. |

## Create a new Teams app

The process to create a new Teams app is similar for all types of apps.

To create a basic Teams app:

1. Open **Visual Studio Code**.

1. Select the **Teams Toolkit** > **Create a New App**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/teams-toolkit-v5/create-new-app.png" alt-text="Screenshot shows the selection of Create a New App in the Teams Toolkit sidebar.":::

1. In this example, select **Tab** as new project.

    :::image type="content" source="../assets/images/teams-toolkit-v2/teams-toolkit-v5/select-new-project.png" alt-text="Screenshot shows the selection of new project from the list of options.":::

1. Select **Basic Tab** as app features using a tab.

    :::image type="content" source="../assets/images/teams-toolkit-v2/teams-toolkit-v5/select-basic-tab.png" alt-text="Screenshot shows the selection of App Feature using a Tab as Basic Tab.":::

1. Select **JavaScript** as the programming language.

    :::image type="content" source="../assets/images/teams-toolkit-v2/teams-toolkit-v5/select-programming-language.png" alt-text="Screenshot shows the programming language to select.":::

1. Select **Default folder** to store your project root folder in the default location.

    :::image type="content" source="../assets/images/teams-toolkit-v2/teams-toolkit-v5/select-default-location.png" alt-text="Screenshot shows the default location option to select.":::

    <details>
    <summary>Learn to change the default folder:</summary>

    1. Select **Browse**.

        :::image type="content" source="../assets/images/teams-toolkit-v2/teams-toolkit-v5/select-browse.png" alt-text="Screenshot shows the Browse option highlighted to browse for storage.":::

    1. Select the location for project workspace.

        :::image type="content" source="../assets/images/teams-toolkit-v2/teams-toolkit-v5/select-folder.png" alt-text="Screenshot shows the Select Folder option highlighted.":::

    The folder you select is the location for your project workspace.
    </details>

    1. Enter a suitable name for your app, such as helloworld, as the application name. Ensure that you use only alphanumeric characters. Press **Enter**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/teams-toolkit-v5/enter-application-name-tab.png" alt-text="Screenshot shows where to enter the app name.":::

   The Teams tab app is created in a few seconds.

    :::image type="content" source="../assets/images/teams-toolkit-v2/teams-toolkit-v5/tab-app-created.png" alt-text="Screenshot shows the app created." lightbox="../assets/images/teams-toolkit-v2/teams-toolkit-v5/tab-app-created.png":::

### Directory structure for different app types

Teams Toolkit provides all components for building an app. After creating the project, you can view the project folders and files under **EXPLORER** section.

<br>
<details>
<summary><b>Directory structure for basic Teams app</b></summary>

The following example shows a basic Teams tab app directory structure:

| Folder name | Contents |
| --- | --- |
| `.vscode` | Settings for VS Code to build and debug your Teams app. |
| `appPackage` | Teams manifest file and icon files that Teams used to recognize your Teams app. |
| `env` | Stores different environment parameters. |
| `infra` | Azure `bicep` template files. Used for deploy your Teams app to Azure. |
| `src` | Source code for the Tab capability, including your front-end app, UI components and the privacy notice, terms of use, |
| `src\components\` | The main app, which handles the initialization and routing. |
| `src\index.jsx` | Entry point for the front-end app. |
| `teamsapp.yml` | This configuration file defines the Teams Toolkit behavior for provision, deploy, and publish lifecycle. You can customize this file to change the behavior of Teams Toolkit in each lifecycle. |
| `teamsapp.local.yml` | This overrides teamsapp.yml with actions that enable local execution and debugging. |

> [!NOTE]
> If you have a bot or message extension app, relevant folders are added to the directory structure.

To learn more about the directory structure of different types of basic Teams apps, see the following table:

| App Type | Links |
| --- | --- |
| For tab app | [Build your first tab app using JavaScript](../sbs-gs-javascript.yml) |
| For bot app | [Build your first bot app using JavaScript](../sbs-gs-bot.yml) |
| For message extension app | [Build your first message extension app using JavaScript](../sbs-gs-msgext.yml) |

</details>
<br>
<details>
<summary><b>Directory structure for scenario-based Teams app</b></summary>

The following example shows a scenario-based notification bot Teams app directory structure:

The new project folder contains the following content:

| Folder name | Contents |
| --- | --- |
| `.vscode` | Settings for VS Code to build and debug your Teams app. |
| `appPackage` | Teams manifest file and icon files that Teams used to recognized your Teams app. |
| `env` | Stores different environment parameters. |
| `infra` | Azure `bicep` template files. Used for deploy your Teams app to Azure. |
| `teamsapp.yml` | This configuration file defines the Teams Toolkit behavior for provision, deploy, and publish lifecycle. You can customize this file to change the behavior of Teams Toolkit in each lifecycle. |
| `teamsapp.local.yml` | This overrides teamsapp.yml with actions that enable local execution and debugging. |

The core notification implementation is stored in the **src** folder and it contains:

| File name | Contents |
| --- | --- |
| `src\adaptiveCards\` | Templates for Adaptive Card. |
| `src\internal\` | Generated initialize code for notification functionality. |
| `src\index.ts` | The entry point to handle bot messages and send notifications. |
| `.gitignore` | File to exclude local files from the bot project. |
| `package.json` | The npm package file for the bot project. |

> [!NOTE]
> If you have a command bot, workflow bot, SSO-enabled tab, or SPFx tab app, relevant folders are added to the directory structure.

To learn more about the directory structure of different types of scenario-based Teams apps, see the following table:

| App Type | Links |
| --- | --- |
| For notification bot app | [Send notification to Teams](../sbs-gs-notificationbot.yml) |
| For command bot app | [Build command bot](../sbs-gs-commandbot.yml) |
| For workflow bot app | [Create Teams workflow bot](../sbs-gs-workflow-bot.yml) |
| For SPFx tab app | [Build a Teams app with SPFx](../sbs-gs-spfx.yml) |

</details>
<br>

::: zone-end

::: zone pivot="visual-studio"

## Create new Teams app in Visual Studio

You can create Teams apps in Visual Studio using the app templates. You can search and select any of the following Teams template to create a new app.

* Notification Bot
* Command Bot
* Workflow Bot
* Tab
* Message Extension

## Prerequisites

| &nbsp; | Install | For using... |
| --- | --- | --- |
| &nbsp; | Visual Studio latest version | Install the latest enterprise edition of Visual Studio, and select the **ASP.NET and web development** workload and **Microsoft Teams Development Tools** for installation.|
| &nbsp; | Teams Toolkit | A Visual Studio workload that creates a project scaffolding for your app. Use the latest version. |
| &nbsp; | [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Microsoft Teams to sideload your Teams app into local Teams environment for testing app behavior. |
 | &nbsp; | [Prepare your Microsoft 365 tenant](~/concepts/build-and-test/prepare-your-o365-tenant.md) | Access to Microsoft 365 account with the appropriate permissions to install an app. |

## Create a new Teams app

To Create a new Teams app, follow the steps:  

1. Open **Visual Studio**.
1. Create a new app by using one of the following two options:

    * Select **New project** under **Quick actions** to select a project template.
    
      :::image type="content" source="../assets/images/teams-toolkit-v2/teams-toolkit-v5/new-project-vs.png" alt-text="Screenshot shows the selection of new project from quick actions.":::

    * Select **File > New > Project**.

       :::image type="content" source="../assets/images/teams-toolkit-v2/teams-toolkit-v5/file-new-project.png" alt-text="Screenshot shows the selection of new project from file menu.":::

      The **Create a new project** window appears.  

1. Enter **Teams** in the search box and from search results, select **Microsoft Teams App**.

1. Select **Next**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams-toolkit-v5/new-project-template-vs.png" alt-text="Screenshot shows the search and select Microsoft Teams app.":::

   The **Configure your new project** window appears.

    1. Enter a suitable name for your project.

         > [!NOTE]
         > The project name you enter is updated in the **Solution name** field. If you want, you can change the solution name with no effect on the project name.

    1. Select the folder location where you want to create the project workspace.
    1. Enter a different solution name, if you want.
    1. If necessary, select the checkbox to save the project and solution in the same folder. For this tutorial, you don't need this option.
    1. Select **Create**.
    
     :::image type="content" source="../assets/images/teams-toolkit-v2/teams-toolkit-v5/teams-app-project-name.png" alt-text="Screenshot shows the configure the project name of your application":::

   The **Create a new Teams application** window appears.

1. Ensure **Tab** is selected, then select **Create**.

   > [!NOTE]
   > If you want to add single sign-on capability to your Teams app, select the Configure with single sign-on checkbox. For more information on single sign-in in Teams app created using Teams Toolkit, see [Add single sign-on to your Teams apps](/microsoftteams/platform/toolkit/add-single-sign-on?pivots=visual-studio).

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams-toolkit-v5/create-new-app-vs.png" alt-text="Screenshot shows the selection of teams app type." lightbox="../assets/images/teams-toolkit-v2/teams-toolkit-v5/create-new-app-vs.png":::

You can select any type of Teams app for your project.

   The **GettingStarted .txt** window appears.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams-toolkit-v5/get-started-tab-vs.png" alt-text="Screenshot shows the Getting Started teams toolkit page." lightbox="../assets/images/teams-toolkit-v2/teams-toolkit-v5/get-started-tab-vs.png":::

You have created the app project scaffolding for your Teams app using Teams Toolkit template.

The steps to create the other apps are similarlar except notification bot. 

### Directory Structure

Teams Toolkit provides all components for building an app. After creating the project, you can view the project folders and files under **Solution Explorer**.

* **Directory structure for basic Teams apps**

  :::image type="content" source="../assets/images/teams-toolkit-v2/teams-toolkit-v5/basic-app-directory.png" alt-text="Screenshot shows the tab Solution Explorer teams toolkit for basic tab.":::

* **Directory structure for scenario-based Teams apps**

  :::image type="content" source="../assets/images/teams-toolkit-v2/teams-toolkit-v5/scenario-based-directory.png" alt-text="Screenshot shows the scenario based Solution Explorer teams toolkit.":::

## Teams app templates in Teams Toolkit for Visual Studio

You can see Teams app templates already populated in Teams Toolkit for various Teams app types. The following table lists all the templates available:

|Teams app templates  |Description  |
|---------|---------|
|**Notification Bot**     |The Notification bot app can send notifications to your Teams client. There are multiple ways to trigger the notification. For example, trigger the notification by HTTP request, or by time. You can select triggered notification based on your business scenario.         |
|**Command Bot**     |You can type a command to interact with the bot using the command bot app.         |
|**Workflow Bot**     |You can interact with the bot using automate repetitive workflow action.         |
|**Tab**     |Tab app shows a webpage inside Teams, and it enables single sign-on (SSO) using Teams account.         |
|**Message Extension**     |Message extension app implements simple features like creating an Adaptive Card, searching Nugget packages, unfurling links for the `dev.botframework.com` domain.         |

After the project is created, Teams Toolkit automatically opens **GettingStarted** window. You can see the instructions in **GettingStarted** window and check out the different features in Teams Toolkit.

::: zone-end

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals.md)
* [Build a Teams app with Blazor](../sbs-gs-blazorupdate.yml)
* [Build a Teams app with C# or .NET](../sbs-gs-csharp.yml)
* [Prerequisites for all types of environment and create your Teams app](tools-prerequisites.md)
* [Prepare to build apps using Microsoft Teams Toolkit](build-environments.md)
* [Provision cloud resources](provision.md)
* [Deploy Teams app to the cloud](deploy.md)
