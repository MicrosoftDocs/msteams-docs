---
title: Build apps with the Teams Toolkit and Visual Studio
description: Get started building great custom apps directly within Visual Studio with the Microsoft Teams Toolkit. Learn to configure your app in Visual Studio, validate your app, and publish it from Visual Studio and Developer Portal. 
keywords: teams visual studio toolkit
ms.localizationpriority: medium
ms.topic: overview
ms.author: johmil
---

# Build apps with the Teams Toolkit and Microsoft Visual Studio

The Microsoft Teams Toolkit enables you to create custom Teams apps directly within the Visual Studio integrated development environment (IDE). The Microsoft Teams toolkit guides you through the process and provides everything you need to build, debug, and launch your Teams app.

## Prerequisites

1. [Enable developer preview](../resources/dev-preview/developer-preview-intro.md#enable-developer-preview).

2. Make sure that the **<span>ASP.NET</span> and web development module** has been added to your Visual Studio instance. For more information, see [Modify Visual Studio by adding or removing workloads and components](/visualstudio/install/modify-visual-studio?view=vs-2019&preserve-view=true).

![Visual studio asp.net module](../assets/images/visual-studio-web-dev-module.png)

## Install the Teams Toolkit

The Microsoft Teams Toolkit for Visual Studio is available for download from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=msft-vsteamstoolkit.vsteamstoolkit) or directly from the **Extensions** menu within Visual Studio.

## Use the toolkit

- [Set up a new project](#set-up-a-new-teams-project)
- [Configure your app](#configure-your-app)
- [Run your app in Teams](#install-and-run-your-app-locally)
- [Validate your app](#validate-your-app)
- [Publish your app](#publish-your-app-to-teams)

## Set up a new Teams project

1. Launch Visual Studio 2019.
2. Select **Create a new project**.
3. Search for **Microsoft Teams App** and select **Next**.
4. In the **Configure your new project**, enter the **Project name**, **Location**, and **Solution name**.
5. Select **Next** to enter a name for the app.
6. In the Additional Information screen, enter an **Application Name** and **Developer or Company name** for your Teams app.

## Configure your app

At its core, the Teams app embraces three components:

- The Microsoft Teams client (web, desktop or mobile) where users interact with your app.
- A server that responds to requests for content displayed in Teams. For example, HTML tab content or a bot adaptive card.
- A Teams app package consists of three files:

    > [!div class="checklist"]
    >
    > - The manifest.json
    > - A [color icon](../resources/schema/manifest-schema.md#icons) for your app to display in the public or organization app catalog.
    > - An [outline icon](../resources/schema/manifest-schema.md#icons) for display on the Teams activity bar.

When an app is installed, the Teams client parses the manifest file to determine needed information like the name of your app and the URL where the services are located.

> [!NOTE]
>If you have not done so already, you must sign in to your Microsoft 365 account to continue with the development process.
>
> If you do not have a Microsoft 365 account, you can sign up for a [Microsoft 365 Developer Program](https://developer.microsoft.com/microsoft-365/dev-program) subscription. It's free for 90 days and renews as long as you are using it for development activity. If you have a Visual Studio Enterprise or Professional subscription, both programs include a free Microsoft 365 [developer subscription](https://aka.ms/MyVisualStudioBenefits), active for the life of your Visual Studio subscription. For more information, see [set up a Microsoft 365 developer subscription](/office/developer-program/office-365-developer-program-get-started).

### Configuration steps

1. To configure your app, select the **Project > TeamsFx > Configure for SSO...** menu.

When prompted, sign in to your Microsoft account that has an M365 tenant.

## Install and run your app locally

Press F5 to start debugging. The app installation dialog box appears in the Teams client.

## Validate your app

The **Project > TeamsFx Validate > Teams Manifest** menu allows you to check that your app package is valid.

## Publish your app to Teams

In the [Teams Developer Portal](https://dev.teams.microsoft.com/home), you can upload your app to a team, submit your app to your company custom app store for users in your organization, or submit your app to App Source for all Teams users.

- Your IT admin will review these submissions.
- You can return to the **Publish** page to check on your submission status and learn if your app was approved or rejected by your IT admin. This is also where you can submit updates to your app or cancel any currently active submissions.
