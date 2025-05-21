---
title: App Development with Agents Toolkit
description: Learn how to integrate your app from Developer Portal to Microsoft 365 Agents Toolkit in Microsoft Visual Studio Code and Visual Studio.
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
ms.date: 04/24/2023
---

# Develop your apps with Agents Toolkit

After you create your app in Developer Portal for Teams, you can:

* [Open your app in Visual Studio Code](#open-your-app-in-visual-studio-code).
* [Open your app in Visual Studio](#open-your-app-in-visual-studio).

Microsoft 365 Agents Toolkit (previously known as Teams Toolkit) scaffolds the necessary files based on the feature and configurations you set in Developer Portal. This makes a seamless transition between Developer Portal and Agents Toolkit in Visual Studio Code and Visual Studio.

## Open your app in Visual Studio Code

In Developer Portal, you can open and launch your project (React app) in Visual Studio Code.

    > [!NOTE]
    > To enable your app to open, install the latest version of [Agents Toolkit for Visual Studio Code](../../toolkit/install-Teams-Toolkit.md).

Following are the steps to open your app in Visual Studio Code:

1. Select **Develop** > **Open in Microsoft 365 Agents Toolkit** > **Open in Visual Studio Code (JS/TS)**.

    :::image type="content" source="../../assets/images/tdp/open-in-toolkit.png" alt-text="Screenshot shows the Developer Portal with Open in Agents Toolkit highlighted in red." lightbox="../../assets/images/tdp/open-in-toolkit.png":::

    A dialog opens in a browser window.

1. Select **Open**.

    :::image type="content" source="../../assets/images/tdp/select-open.png" alt-text="Screenshot of browser with Open option highlighted in red.":::

    A dialog opens in Visual Studio Code.

1. Select **Open**.

    :::image type="content" source="../../assets/images/tdp/open-link.png" alt-text="Screenshot shows Developer Preview page with Open option highlighted in red.":::

   If necessary, sign in to your Microsoft 365 account.

1. Select your app and select **OK**.

   Agents Toolkit converts the URL you configured in Developer Portal to a localhost address to work with the debugging process.

    :::image type="content" source="../../assets/images/tdp/select-ok.png" alt-text="Screenshot shows Agents Toolkit with OK option highlighted in red.":::

1. Select your preferred programming language.

    :::image type="content" source="../../assets/images/tdp/select-programmimg-language.png" alt-text="Screenshot shows Agents Toolkit with Select a programming language highlighted in red.":::

1. Select your workspace folder.

    :::image type="content" source="../../assets/images/tdp/workspace-folder.png" alt-text="Screenshot shows the Agents Toolkit with workspace folder highlighted in red":::

1. Enter an app name.

    :::image type="content" source="../../assets/images/tdp/select-application-name.png" alt-text="Screenshot of Agents Toolkit with Application name highlighted in red.":::

   Agents Toolkit scaffolds your project with all the necessary config and code files, now you're ready to start development.

    :::image type="content" source="../../assets/images/tdp/scaffold.png" alt-text="Screenshot shows you the scaffolding of your project in Visual Studio Code. ":::

## Open your app in Visual Studio

You can open your project in Visual Studio and scaffold your project in Visual Studio with Agents Toolkit. Ensure that you installed [Visual Studio 2022 version 17.6 Preview 2](/visualstudio/releases/2022/release-notes-preview#17.6.0-pre.2.0).

Following are the steps to open your app in Visual Studio:

1. Select **Develop** > **Open in Microsoft 365 Agents Toolkit** > **Open in Visual Studio (.NET)**.

    :::image type="content" source="../../assets/images/tdp/tdp-toolkit-vs.png" alt-text="Screenshot shows the Developer Portal with Open in Agents Toolkit." lightbox="../../assets/images/tdp/tdp-toolkit-vs.png":::

1. Select **Open** to scaffold your project.

    :::image type="content" source="../../assets/images/tdp/tdp-vs-open.png" alt-text="Screenshot of browser with Open option in visual studio.":::

   If necessary, sign in to your Microsoft 365 account.

1. Enter your project name, location, and solution name. Select **Create**.

    :::image type="content" source="../../assets/images/tdp/tdp-vs-open-file.png" alt-text="Screenshot shows you the details tab to set the app name.":::

1. Select the application type and select **Create**.

   Agents Toolkit converts the app you configured in Developer Portal to a localhost address to work with the debugging process.

    :::image type="content" source="../../assets/images/tdp/tdp-vs-bot.png" alt-text="Screenshot shows you the type of app in visual studio.":::

   Agents Toolkit scaffolds your project with all the necessary config and code files, now you're ready to start development.

    :::image type="content" source="../../assets/images/tdp/vs-scaffold.png" alt-text="Screenshot shows you the scaffolding of your project in visual studio. ":::

After you open your app in Agents Toolkit, you can now [develop](/microsoftteams/platform/toolkit/teamsfx-multi-env) and [debug](../../toolkit/debug-overview.md) your Teams app in Agents Toolkit.

  > [!NOTE]
  > You can work in Agents Toolkit through Developer Portal in preview version only.

## See also

[Publish your Teams apps using Developer Portal](../../toolkit/publish-your-teams-apps-using-developer-portal.md)
