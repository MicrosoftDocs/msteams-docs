---
title: Debug apps in Teams Desktop Client
author: surbhigupta
description: Learn about Debug apps in Teams Desktop Client.
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: high
---

# Debug apps in Teams Desktop Client

Microsoft Teams Toolkit helps you to debug and preview your Microsoft Teams app in desktop client. During the debug process, Teams Toolkit automatically starts app services, launches debuggers, and uploads Teams app. You can preview your Teams app in Teams desktop client after debugging.

The following are the advantages of Teams desktop client:

* Improves performance.
* Reduces time-to-F5.
* Improves coverage of debug targets.

## Capabilities

The Teams desktop client incorporates debugging capabilities in the appl templates scaffolded by the Teams Toolkit:

* Bot
* Copilot Plugin
* Custom Copilot
* Message Extension

## Prerequisites

Ensure you install the following tools for building and deploying your app in Teams desktop client:

| &nbsp; | Install | For using... |
| --- | --- | --- |
| &nbsp; | [Teams Toolkit](install-Teams-Toolkit.md) | A Microsoft Visual Studio Code extension that creates a project scaffolding for your app. Use the latest prerelease version. |
| &nbsp; | [Node.js](https://nodejs.org/en/download/) | Back-end JavaScript runtime environment. For more information, see [Node.js version compatibility table for project type](~/toolkit/build-environments.md#nodejs-version-compatibility-table-for-project-type). |
| &nbsp; | [Visual Studio Code](https://code.visualstudio.com/download) | JavaScript, TypeScript, or SharePoint Framework (SPFx) build environments. Use the latest version. |
| &nbsp; | [Microsoft 365 developer account](../concepts/build-and-test/prepare-your-o365-tenant.md)| Access to Teams account with the appropriate permissions to install an app. |

## Debug in Teams desktop client experience in Teams Toolkit for Visual Studio Code

Ensure you are logged into your Microsoft 365 account through Teams Toolkit.

1. Open Visual Studio Code (VS Code).

1. Select the Teams Toolkit :::image type="icon" source="../assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.PNG" border="false"::: icon in the Visual Studio Code **Activity Bar**.

1. Select **Create a New App**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/create-project.png" alt-text="Screenshot shows the location of the Create New Project link in the Teams Toolkit sidebar.":::

1. Select **Custom Engine Copilot**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/debug-apps-in-teams-desktop-client/custom-engine-copilot.png" alt-text="Screenshot shows the Teams Toolkit app templates.":::

1. Select **Basic AI Chatbot**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/debug-apps-in-teams-desktop-client/app-feature.png" alt-text="Screenshot shows the app feature to add to your new app.":::

1. Select **JavaScript**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/select-language-tab.png" alt-text="Screenshot shows the option to select the programming language.":::

1. Select **OpenAI**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/debug-apps-in-teams-desktop-client/service-for-large-language-model.png" alt-text="Screenshot shows LLM in visual studio code.":::

1. Enter the values for the OpenAI.

1. Select **Default folder**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/select-default-location.png" alt-text="Screenshot shows the selection of default location.":::

    To change the default location, follow these steps:

    1. Select **Browse**.

        :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/select-browse.png" alt-text="Screenshot shows the selection of browse location option.":::

    1. Select the location for the project workspace.
    1. Select **Select Folder**.

        :::image type="content" source="../assets/images/teams-toolkit-v2/select-folder.png" alt-text="Screenshot shows the folder to select.":::

1. Enter a suitable name for your app and then select the **Enter** key.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/hello-bot.png" alt-text="Screenshot shows where to enter the app name.":::

1. From the left pane, select **Run and Debug** (`Ctrl+Shift+D`) and select **Debug in Teams (Desktop)** in dropdown list.

    :::image type="content" source="../assets/images/teams-toolkit-v2/debug-apps-in-teams-desktop-client/debug-in-teams-desktop.png" alt-text="Screenshot shows the option to select debug in Teams (Desktop).":::

1. Ensure your Teams desktop login matches your Microsoft 365 account used in Teams Toolkit and then select **Continue**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/debug-apps-in-teams-desktop-client/desktop-login-matches.png" alt-text="Screenshot shows the desktop login.":::

   Teams desktop client requests to add your app.

1. Select **Add**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/debug-apps-in-teams-desktop-client/add-app.png" alt-text="Screenshot shows the add app to desktop client.":::

    A chat window opens.

1. In the message compose area, send a message to invoke the bot.

    :::image type="content" source="../assets/images/teams-toolkit-v2/debug-apps-in-teams-desktop-client/desktop-client.png" alt-text="Screenshot shows an example of the app to desktop client.":::

> [!NOTE]
> The system level notification for account matching appears only once per project. In subsequent debug sessions, the Teams Toolkit sends reminders about the account through VS Code notifications.
> :::image type="content" source="../assets/images/teams-toolkit-v2/debug-apps-in-teams-desktop-client/subsequent-desktop-login.png" alt-text="Screenshot shows the subsequent desktop login notification in vs code.":::

1. You can add breakpoints and hot reload your changes.

    :::image type="content" source="../assets/images/teams-toolkit-v2/debug-apps-in-teams-desktop-client/hot-reload.png" alt-text="Screenshot shows an example of the breakpoints in app.":::

    :::image type="content" source="../assets/images/teams-toolkit-v2/debug-apps-in-teams-desktop-client/after-hot-reload.png" alt-text="Screenshot shows an example after hot reload of an app.":::

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals.md)
* [Debug background process](debug-background-process.md)
