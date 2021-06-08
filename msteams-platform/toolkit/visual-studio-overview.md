---
title: Build apps with the Teams Toolkit and Visual Studio
description: Get started building great custom apps directly within Visual Studio with the Microsoft Teams Toolkit
keywords: teams visual studio toolkit
localization_priority: Normal
ms.topic: overview
ms.author: lajanuar
---

# Build apps with the Teams Toolkit and Visual Studio

The Microsoft Teams Toolkit enables you to create custom Teams apps directly within the Visual Studio integrated development environment (IDE). The Microsoft Teams toolkit guides you through the process and provides everything you need to build, debug, and launch your Teams app.

## Prerequisites

1. [Enable developer preview](../resources/dev-preview/developer-preview-intro.md#enable-developer-preview).

1. Make sure that the **<span>ASP.NE</span>T and web development module** has been added to your Visual Studio instance. You can check by following the steps in the [modify Visual Studio by adding or removing workloads and component](/visualstudio/install/modify-visual-studio?view=vs-2019&preserve-view=true) documentation.

![Visual studio asp.net module](../assets/images/visual-studio-web-dev-module.png)

3. If you want to test your app by deploying it from Visual Studio, you must have Internet Information Services (IIS)) installed in your development environment. Visual Studio does not include IIS and it is not included in the default Windows 10, Windows 8, or Windows 7 configuration; however, you can download the latest version from the [Microsoft download center](https://www.microsoft.com/download/details.aspx?id=48264).

![IIS download page view](../assets/images/iis.png)

## Install the Teams Toolkit

The Microsoft Teams Toolkit for Visual Studio is available for download from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.vsteamstemplate) or directly from the **Extensions** menu within Visual Studio. From the Visual Studio Marketplace also download [Teams Toolkit for Visual Studio 2019](https://marketplace.visualstudio.com/items?itemName=msft-vsteamstoolkit.vsteamstoolkit).

## Using the toolkit

- [Set up a new project](#set-up-a-new-teams-project)
- [Configure your app](#configure-your-app)
- [Package your app](#package-your-app)
- [Install and run your app in Teams](#install-and-run-your-app-locally)
- [Validate your app](#validate-your-app)
- [Publish your app](#publish-your-app-to-teams)

## Set up a new Teams project

![Teams toolkit installed](../assets/images/teamstoolkiticon.png)

1. Select **Create New Project**.

    ![Create new project](../assets/images/createnewproject.png)

1. Choose the quickstart tool for **Microsoft Teams App** and select **Next**.
1. In the **Configure your new project** page, enter the **Project name**, **Location**, and **Solution name**.
1. Select the **Place solution and project in the same directory** checkbox.
1. In the **Add Capabilities** pop-up window, choose one or more capabilities for your project setup.
1. Select the **Next** button to complete the configuration process.
1. In the **Add Capabilities** pop-up window, choose the properties for each selected capability.
1. Select **Finish**. The **Microsoft Teams Toolkit** landing page is shown.

    ![Teams toolkit landing page](../assets/images/Teamstoolkitpage.png)

## Configure your app

At its core, the Teams app embraces three components:

  1. The Microsoft Teams client including web, desktop, or mobile, where users interact with your app.
  1. A server that responds to requests for content that is displayed in Teams, for example, HTML tab content or a bot adaptive card.
  1. A Teams app package consists of three files:

      - The manifest.json
      - A [color icon](../resources/schema/manifest-schema.md#icons) for your app to display in the public or organization app catalog.
      - An [outline icon](../resources/schema/manifest-schema.md#icons) for display on the Teams activity bar.

When an app is installed, the Teams client parses the manifest file to determine needed information like the name of your app and the URL where the services are located.

> [!NOTE]
>If you have not done so already, you must sign in to your Microsoft 365 account to continue with the development process.
>
> If you do not have a Microsoft 365 account, you can sign up for a [Microsoft 365 Developer Program](https://developer.microsoft.com/microsoft-365/dev-program) subscription. It's free for 90 days and renews as long as you are using it for development activity. If you have a Visual Studio Enterprise or Professional subscription, both programs include a free Microsoft 365 [developer subscription](https://aka.ms/MyVisualStudioBenefits), active for the life of your Visual Studio subscription. For more information, see [set up a Microsoft 365 developer subscription](/office/developer-program/office-365-developer-program-get-started).

### Configuration steps

1. To configure your app, on the **Microsoft Teams Toolkit** landing page, select **Edit app package**.
1. From the **My Environments** drop-down menu, select **development**.
1. In the **App details** page, edit your app's property fields.
    
    Editing the fields in the App details page updates the contents of the manifest.json file that will ship as part of the app package. For more information, see [Teams Toolkit manifest](https://aka.ms/teams-toolkit-manifest).

## Package your app

Modifying the **app details** page or updating the **manifest**, or **.env** files in your app's  **.publish** folder will automatically generate your **Development.zip** file. The Development.zip file includes three required files, the **manifest.json** and [two icons](../concepts/build-and-test/apps-package.md#app-icons).

## Install and run your app locally

1. From the **Solution Configurations** dropdown menu, select **Deploy** as shown in the following image:

    ![Solution configurations menu](../assets/images/solution-configurations.png)

1. Select the **IIS Express + Teams** button.

    The app installation dialog box appears in the Teams client.

## Validate your app

The **Validate** page allows you to check your app package before submitting your app to AppSource. Simply upload the manifest package and the validation tool will check your app against all manifest related test cases. For each failed tests, the description provides a documentation link to help you fix the error. For the tests that are hard to automate, the **Preliminary checklist** details 7 of the most common failed test cases as well as link to a complete submission checklist.

## Publish your app to Teams

* On your project home page, you can upload your app to a team, submit your app to your company custom app store for users in your organization, or submit your app to App Source for all Teams users.

* Your IT admin will review these submissions.

* You can return to the **Publish** page to check on your submission status and learn if your app was approved or rejected by your IT admin. This is also where you can submit updates to your app or cancel any currently active submissions.

## Next step

> [!div class="nextstepaction"]
> [Maintaining and supporting your published app](../concepts/deploy-and-publish/appsource/post-publish/overview.md)
>
