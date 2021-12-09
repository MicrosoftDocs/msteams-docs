---
title: Build apps with the Teams Toolkit and Visual Studio
description: Get started building great custom apps directly within Visual Studio with the Microsoft Teams Toolkit. Learn to configure your app in Visual Studio, validate your app, and publish it from Visual Studio and Developer Portal. 
keywords: teams visual studio toolkit
ms.localizationpriority: medium
ms.topic: overview
ms.author: johmil
---

# Teams Toolkit for Visual Studio

Build, test, and develop for Teams inside your IDE.

Teams Toolkit's extension for Visual Studio makes it easy to create new projects for Teams, automatically setup apps in Teams Developer Portal, run and debug in Teams, configure cloud hosting, and use TeamsFx in your IDE.

## Install Teams Toolkit for Visual Studio

>[!NOTE]
> As a prerequisite, ensure you have the [TeamsFx CLI](/TeamsFx-CLI#get-started) installed.

1. If you already have Visual Studio 2022 installed, skip to the next step. Otherwise, [install Visual Studio 2022](https://docs.microsoft.com/visualstudio/install/install-visual-studio?view=vs-2022&preserve-view=true).
1. Open the Visual Studio Installer.
1. Select **Modify** for your existing VS 2022 installation.
1. Select the **ASP.NET and web development** workload.
1. On the right, expand the **ASP.NET and web development** section and select **Microsoft Teams development tools** in the Optional list of components.
1. Select **Install** or **Modify** in the Visual Studio Installer to complete the installation process.

## Get started quickly with a new project

Teams Toolkit project templates provide all code, files, and configuration you need to get started with a Teams app project.

The Microsoft Teams App project template allows you to specify a Microsoft 365 account that is required to automatically register and configure your new Teams app.

> [!NOTE]
> If you do not have a Microsoft 365 account, you can sign up for a [Microsoft 365 Developer Program](https://developer.microsoft.com/microsoft-365/dev-program) subscription. It's free for 90 days and renews as long as you are using it for development activity. If you have a Visual Studio Enterprise or Professional subscription, both programs include a free Microsoft 365 [developer subscription](https://aka.ms/MyVisualStudioBenefits), active for the life of your Visual Studio subscription. For more information, see [set up a Microsoft 365 developer subscription](/office/developer-program/office-365-developer-program-get-started).

1. Launch Visual Studio 2022.
1. In the start window, choose **Create a new project**.
1. In the **Search for templates** box, enter Microsoft Teams App.
1. Select the **Microsoft Teams App** template and select **Next**.
1. In the **Configure your new project** window, type or enter _HelloTeams_ in the **Project name** box. Then, select **Create**.
1. In the **Create a new Teams application** window, choose or add a Microsoft 365 account using the **Choose an account** selector. Then, select **Create**.

Visual Studio will open up your new project and Teams Toolkit will setup you new project in Teams Developer Portal. The project will be added for the Teams organization linked to the Microsoft 365 account you chose in the steps above.

## Run and debug your app in Teams

You can launch your app project running locally in Visual Studio and debug using all the tools and techniques available for other ASP.NET Core web apps.

1. Open or [create a Teams app project](#get-started-quickly-with-a-new-project).
1. Press **F5** or select **Debug > Start Debugging** in Visual Studio.

Visual Studio will launch your Teams app project in a browser and start debugging.

## Host your Teams app in the cloud and preview it

You can create and automatically configure cloud resources for hosting your app in Azure using Teams Toolkit. We'll continue adding support for different hosting scenarios and options.

1. Select the **Project > Teams Toolkit > Provision** menu.
1. In the Select your subscription window, choose the Azure subscription you want to use to create resources with.

Teams Toolkit will create Azure resources in this subscription but no code is deployed during this step. To deploy your project to these new resources:

1. Select the **Project > Teams Toolkit > Deploy** menu.

## Preview your app running from cloud resources

You can run your app in a browser using the remote resources to verify that everything works. It's not possible to debug during in this scenario yet.

1. Select the **Project > Teams Toolkit > Preview Teams app** menu.

Your app will open in a browser and use the resources created by the Provision and Deploy steps.

## Publish your app to Teams

In the [Teams Developer Portal](https://dev.teams.microsoft.com/home), you can upload your app to a team, submit your app to your company custom app store for users in your organization, or submit your app to App Source for all Teams users.

- Your IT admin will review these submissions.
- You can return to the **Publish** page to check on your submission status and learn if your app was approved or rejected by your IT admin. This is also where you can submit updates to your app or cancel any currently active submissions.
