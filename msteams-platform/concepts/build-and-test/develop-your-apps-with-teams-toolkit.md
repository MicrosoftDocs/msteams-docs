---
title: Develop your apps with Teams Toolkit
description: Learn how to integrate your app from Teams Developer Portal to Teams Toolkit in Visual Studio Code and Visual Studio.
ms.localizationpriority: medium
ms.topic: overview
ms.author: v-sdhakshina
ms.date: 04/24/2023
---

# Develop your apps with Teams Toolkit

After you create your app in Teams Developer Portal, you can:

* [Open your app in Visual Studio Code](#open-your-app-in-visual-studio-code).
* [Open your app in Visual Studio](#open-your-app-in-visual-studio).

Teams Toolkit scaffolds the necessary files based on the feature and configurations you set in Teams Developer Portal. This makes a seamless transition between Teams Developer Portal and Teams Toolkit in Visual Studio Code and Visual Studio.

## Open your app in Visual Studio Code

In Teams Developer Portal, you can open and launch your project in Visual Studio Code.

Following are the steps to open your app in Visual Studio Code:

1. Select **Develop (Preview)** > **Open in Teams Toolkit** > **Open in Visual Studio Code (JS/TS)**.

    :::image type="content" source="../../assets/images/tdp/open-in-teams-toolkit.png" alt-text="Screenshot shows the Developer Portal with Open in Teams Toolkit highlighted in red." lightbox="../../assets/images/tdp/open-in-teams-toolkit.png":::

    A dialog is displayed.

1. Select **Open**.

    :::image type="content" source="../../assets/images/tdp/select-open.png" alt-text="Screenshot of browser with Open option highlighted in red.":::

    A dialog is displayed.

1. Select **Open**.

    :::image type="content" source="../../assets/images/tdp/open-link.png" alt-text="Screenshot shows Developer Preview page with Open option highlighted in red.":::

   If necessary, sign in to your Microsoft 365 account.

1. Select your preferred programming language.

    :::image type="content" source="../../assets/images/tdp/select-programmimg-language.png" alt-text="Screenshot shows Teams Toolkit with Select a programming language highlighted in red.":::

1. Select your workspace folder.

    :::image type="content" source="../../assets/images/tdp/workspace-folder.png" alt-text="Screenshot shows the Teams Toolkit with workspace folder highlighted in red":::

1. Enter an app name.

    :::image type="content" source="../../assets/images/tdp/select-application-name.png" alt-text="Screenshot of Teams Toolkit with Application name highlighted in red.":::

1. Select your app and select **OK**.

   Teams Toolkit converts the URL you configured in Teams Developer Portal to a localhost address to work with the debugging process.

    :::image type="content" source="../../assets/images/tdp/select-ok.png" alt-text="Screenshot shows Teams Toolkit with OK option highlighted in red.":::

   Teams Toolkit scaffolds your project with all the necessary config and code files, now you're ready to start development.

    :::image type="content" source="../../assets/images/tdp/scaffold.png" alt-text="Screenshot shows you the scaffolding of your project in Visual Studio Code. ":::

## Open your app in Visual Studio

You can open your project in Visual Studio and scaffold your project in Visual Studio with Teams Toolkit. Ensure that you installed [Visual Studio 2022 version 17.6 Preview 2](/visualstudio/releases/2022/release-notes-preview#17.6.0-pre.2.0).

Following are the steps to open your app in Visual Studio:

1. Select **Develop (Preview)** > **Open in Teams Toolkit** > **Open in Visual Studio (.NET)**.

    :::image type="content" source="../../assets/images/tdp/tdp-teams-toolkit-vs.png" alt-text="Screenshot shows the Developer Portal with Open in Teams Toolkit." lightbox="../../assets/images/tdp/tdp-teams-toolkit-vs.png":::

1. Select **Open** to scaffold your project.

    :::image type="content" source="../../assets/images/tdp/tdp-vs-open.png" alt-text="Screenshot of browser with Open option in visual studio.":::

   If necessary, sign in to your Microsoft 365 account.

1. Enter your project name, location, and solution name. Select **Create**.

    :::image type="content" source="../../assets/images/tdp/tdp-vs-open-file.png" alt-text="Screenshot shows you the details tab to set the app name.":::

1. Select the application type and select **Next**.

   Teams Toolkit converts the app you configured in Teams Developer Portal to a localhost address to work with the debugging process.

    :::image type="content" source="../../assets/images/tdp/tdp-vs-bot.png" alt-text="Screenshot shows you the type of app in visual studio.":::

   Teams Toolkit scaffolds your project with all the necessary config and code files, now you're ready to start development.

    :::image type="content" source="../../assets/images/tdp/vs-scaffold.png" alt-text="Screenshot shows you the scaffolding of your project in visual studio. ":::

After you open your app in Teams Toolkit, you can now [develop](/microsoftteams/platform/toolkit/teamsfx-multi-env) and [debug](../../toolkit/debug-overview.md) your Teams app in Teams Toolkit.

## See also

[Publish your Teams apps using Developer Portal](../../toolkit/publish-your-teams-apps-using-developer-portal.md)
