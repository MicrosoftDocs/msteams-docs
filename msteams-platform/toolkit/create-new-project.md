---
title: Create New Teams App in Teams Toolkit
author: zyxiaoyuer
description: Learn how to create basic and scenario-based Teams app in Visual Studio Code, its directory structure, and Teams app template available in Teams Toolkit.
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/14/2022
---

# Create a new Teams app

In this section, you can learn how to create a new Microsoft Teams project using Microsoft Visual Studio Code.

## Create a new Teams project using Visual Studio Code

You can build a new Teams project by selecting **Create a New App** in Microsoft Teams Toolkit. You can start from built-in Teams app templates or start from official Teams app samples in Teams Toolkit. What's more, Teams Toolkit  supports to start with Outlook Add-in templates to build your own Outlook Add-ins.

:::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/select-capabilities-tabapp_1.png" alt-text="Screenshot shows the App Capability options.":::

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

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/create-project.png" alt-text="Screenshot shows the Create New Project button in the Teams Toolkit sidebar.":::

1. In this example, select **Tab** as app capability.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/select-capabilities-tabapp_1.png" alt-text="Screenshot shows the App Capability to select.":::

1. Select **Basic Tab** as app capability.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/select-basic-tab.png" alt-text="Screenshot shows the option to select App Feature using a Tab as Basic Tab.":::

1. Select **JavaScript** as the programming language.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/select-language-tab_1.png" alt-text="Screenshot shows the programming language to select.":::

1. Select **Default folder** to store your project root folder in the default location.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/select-default-location.png" alt-text="Screenshot shows the default location option to select.":::

    <details>
    <summary>Learn to change the default folder:</summary>

    1. Select **Browse**.

        :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/select-browse_1.png" alt-text="Screenshot shows the Browse option highlighted to browse for storage.":::

    1. Select the location for project workspace.

        :::image type="content" source="../assets/images/teams-toolkit-v2/select-folder_1.png" alt-text="Screenshot shows the Select Folder option highlighted.":::

    The folder you select is the location for your project workspace.
    </details>

    1. Enter a suitable name for your app, such as helloworld, as the application name. Ensure that you use only alphanumeric characters. Press **Enter**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/enter-name-tab1.png" alt-text="Screenshot shows where to enter the app name.":::

   The Teams tab app is created in a few seconds.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/tab-app-created.png" alt-text="Screenshot shows the app created." lightbox="../assets/images/teams-toolkit-v2/first-tab/tab-app-created.png":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI%20ran%20into%20an%20issue%5D%20Create%20a%20new%20Teams%20app&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftoolkit%2Fcreate-new-project&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftoolkit%2Fcreate-new-project.md&documentVersionIndependentId=13410ab8-6255-e478-9a1d-4b3b348f1d16&author=surbhigupta&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Directory structure for different app types

Teams Toolkit provides all components for building an app. After creating the project, you can view the project folders and files under **EXPLORER** section.

<br>
<details>
<summary><b>Directory structure for basic Teams app</b></summary>

The following example shows a basic Teams tab app directory structure:

| Folder name | Contents |
| --- | --- |
| `.vscode` | Settings for VS Code to build and debug your Teams app. |
| `appPackage` | App manifest (previously called Teams app manifest) file and icon files that Teams used to recognize your Teams app. |
| `env` | Stores different environment parameters. |
| `infra` | Azure `bicep` template files. Used for deploy your Teams app to Azure. |
| `src` | Source code for the Tab capability, including your front-end app, UI components and the privacy notice, terms of use, |
| `src/app.js` | Application entry point and `express` handlers for website. |
| `src/views/hello.html`| An HTML template that is bind to the tab endpoint. |
| `src/static` | The web server can serve static assets such as CSS and JavaScript files. |
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
| `appPackage` | The app manifest file and icon files that Teams used to recognize your Teams app. |
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

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals.md)
* [Build a Teams app with Blazor](../sbs-gs-blazorupdate.yml)
* [Build a Teams app with C# or .NET](../sbs-gs-csharp.yml)
* [Prerequisites for all types of environment and create your Teams app](tools-prerequisites.md)
* [Prepare to build apps using Microsoft Teams Toolkit](build-environments.md)
