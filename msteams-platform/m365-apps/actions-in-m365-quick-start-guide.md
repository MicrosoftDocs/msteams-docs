---
title: Actions in Microsoft 365 quick start guide
description: In this article, learn how to create Actions in Microsoft 365, function of Actions and its use cases.
ms.date: 12/8/2023
ms.author: mosdevdocs
author: v-preethah
ms.topic: Conceptual
ms.subservice: m365apps
---
# Actions in Microsoft 365 quick start guide

> [!NOTE]
>
> * Actions for Microsoft 365 is available in [public developer preview](../resources/dev-preview/developer-preview-intro.md).
>
> * Actions is supported for Microsoft 365 (Office) app for web and desktop.

This quick start guide helps you to build Actions in Microsoft 365.

## Prerequisites

Before you get started, ensure that you install the following tools:

| &nbsp; | Install | For using... |
| --- | --- | --- |
| &nbsp; | [Node.js](https://nodejs.org/en/download/) | A JavaScript runtime environment. For more information, see [Node.js version compatibility table for project type](~/toolkit/build-environments.md#nodejs-version-compatibility-table-for-project-type).|
| &nbsp; | [Microsoft Edge](https://www.microsoft.com/edge) (recommended) or [Google Chrome](https://www.google.com/chrome/) | A browser with developer tools. |
| &nbsp; | [Visual Studio Code](https://code.visualstudio.com/download) | Visual Studio Code is a lightweight but powerful source code editor. Which comes with built-in support for JavaScript, TypeScript, Node.js, and SharePoint Framework (SPFx) build environments. Use the latest version. |
| &nbsp; | [Teams Toolkit](../toolkit/install-Teams-Toolkit.md) | A Microsoft Visual Studio Code extension that creates a project scaffolding for your app. Use the latest version. |

### Build and run the sample app

1. Go to the [sample](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/m365-actions-preview/nodejs).

1. Select **Code**.

1. From the dropdown menu, select **Open with GitHub Desktop**.

   :::image type="content" source="~/assets/images/include-files/clone-repository.png" alt-text="Screenshot show the option to clone repository in local.":::

1. Select **Clone**.

1. Go to Visual Studio Code.

1. Select **File** > **Open Folder...**.

1. Select the folder where your app is created.

1. Select **Select Folder**.

1. From the left pane, select **Run and Debug (Ctrl+Shift+D)**.

1. From the debug dropdown menu, select **Debug in the Microsoft 365 app (Edge) without backend**.

   :::image type="content" source="images/actions-debug.png" alt-text="The screenshot shows actions in debug.":::

1. Select **Yes** if you receive the following security warning:

   :::image type="content" source="~/assets/images/teams-toolkit-v2/first-tab/hw-warning.png" alt-text="Screenshot shows the microsoft warning.":::

A browser window opens with Microsoft 365 home page and your app is available under **Apps**.

You can now preview your Actions in Microsoft 365 app, right-click a file that is supported by your Actions. Actions appear in the context menu, for example **Add todo task**.

:::image type="content" source="images/actions-context-menu.png" alt-text="The screenshot shows the actions in context menu.":::

## See also

* [Actions in Microsoft 365](actions-in-m365.md)
* [Build Actions in Microsoft 365](build-actions-in-m365.md)
