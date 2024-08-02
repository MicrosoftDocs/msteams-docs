---
title: Get Started - Actions in Microsoft 365
description: In this article, learn how to build and run the sample app for Actions in Microsoft 365 using Teams Toolkit in Visual Studio Code, its functions and use cases.
ms.date: 12/8/2023
ms.author: mosdevdocs
author: v-preethah
ms.topic: quickstart
ms.subservice: m365apps
---
# Actions in Microsoft 365 Quick start guide

> [!NOTE]
>
> * Actions are available in [public developer preview](../resources/dev-preview/developer-preview-intro.md).
> * Actions are supported for Microsoft 365 (Office) app for web and desktop.

Get started with Actions in Microsoft 365, which helps integrate an app into the user's workflow by enabling easy discoverability and seamless interaction with their content.

## Prerequisites

Before you get started, ensure that you install the following tools:

| &nbsp; | Install | For using... |
| --- | --- | --- |
| &nbsp; | [Node.js](https://nodejs.org/en/download/) | A JavaScript runtime environment. For more information, see [Node.js version compatibility table for project type](~/toolkit/build-environments.md#nodejs-version-compatibility-table-for-project-type).|
| &nbsp; | [Microsoft Edge](https://www.microsoft.com/edge/) (recommended) or [Google Chrome](https://www.google.com/chrome/) | A browser with developer tools. |
| &nbsp; | [Visual Studio Code](https://code.visualstudio.com/download) | Visual Studio Code is a lightweight but powerful source code editor, which comes with built-in support for JavaScript, TypeScript, Node.js, and SharePoint Framework (SPFx) build environments. Use the latest version. |
| &nbsp; | [Teams Toolkit](../toolkit/install-Teams-Toolkit.md) | A Microsoft Visual Studio Code extension that creates a project scaffolding for your app. Use the latest version. |

### Build and run the sample app

Let's learn how to build and run a sample app in your local environment. You'll use Teams Toolkit for Visual Studio Code to setup and sideload the application to your tenant. Let’s get started!

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

1. Select the **F5** key to start debugging.

   :::image type="content" source="images/actions-debug.png" alt-text="The screenshot shows actions in debug.":::

A browser window opens with Microsoft 365 home page and your app is available under **Apps**.

You can try your Actions in the Microsoft 365 home page, right-click a Word, Excel, or PPT file. You can see **Related tasks** in the context menu. Hover over **Add to** to view the **Add todo task** action.

:::image type="content" source="images/actions-context-menu.png" alt-text="The screenshot shows the actions in context menu.":::

If you want to run Actions in the Microsoft 365 on Azure, see [sample.](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/m365-actions-preview/nodejs/README.md#optional-deploy-the-app-to-azure)
