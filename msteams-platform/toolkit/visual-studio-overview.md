---
title: Build apps with the Teams Toolkit and Visual Studio
description: Build apps with the Teams Toolkit and Visual Studio
keywords: teams visual studio toolkit
ms.localizationpriority: medium
ms.topic: overview
ms.date: 1/13/2022
ms.author: surbhigupta
---

# Teams Toolkit for Visual Studio

You can build, test, and develop Teams app using Visual Studio Code in the integrated development environment (IDE). The Teams Toolkit's extension for Visual Studio allows you to do the following:

* Create new projects for Teams
* Set up apps in the Teams developer portal
* Run and debug in Teams
* Configure cloud hosting, and use [TeamsFx](https://github.com/OfficeDev/teamsfx) from your Integrated Development Environment (IDE).

## Install Teams Toolkit for Visual Studio

> [!NOTE]
> As a prerequisite, ensure you install Visual Studio 2022 17.1 Preview 2 or latest version to follow the instructions.

1. Install Visual Studio 2022 17.1 Preview 2. For more information see, [Install Visual Studio 2022 Preview](https://visualstudio.microsoft.com/vs/preview/).
2. Open the Visual Studio Installer.
3. Select **Modify** for your existing VS 2022 Preview installation.
4. Select the **ASP.NET and web development** workload.
5. On the right, expand the **ASP.NET and web development** section and select **Microsoft Teams development tools** in the Optional list of components.
6. Select **Install** or **Modify** in the Visual Studio Installer to complete the installation process.

![Selecting the Microsoft Teams development tools in the Visual Studio installer.) installed.](images/teams-development-tools-vs-installer.png)

## Create a new project using Visual Studio

Teams Toolkit project templates provide all code, files, and configuration you need to get started with a Teams app project.

The Microsoft Teams App project template allows you to specify a Microsoft 365 account that is required to automatically register and configure your new Teams app.

> [!NOTE]
> If you do not have a Microsoft 365 account, you can sign up for a [Microsoft 365 Developer Program](https://developer.microsoft.com/microsoft-365/dev-program) subscription. It's free for 90 days and renews as long as you are using it for development activity. If you have a Visual Studio Enterprise or Professional subscription, both programs include a free Microsoft 365 [developer subscription](https://aka.ms/MyVisualStudioBenefits), active for the life of your Visual Studio subscription. For more information, see [set up a Microsoft 365 developer subscription](/office/developer-program/office-365-developer-program-get-started).

1. Launch Visual Studio 2022.
1. In the start window, choose **Create a new project**.
1. In the **Search for templates** box, enter Microsoft Teams App.
1. Select the **Microsoft Teams App** template and select **Next**.
1. In the **Configure your new project** window, type or enter _HelloTeams_ in the **Project name** box. Then, select **Create**.
1. In the **Create a new Teams application** window, choose or sign in to a Microsoft 365 account using the **Choose an account** selector. Then, select **Create**.

![Creating a new Microsoft Teams App project in Visual Studio.](images/teams-toolkit-vs-new-project.png)

Visual Studio will open up your new project and Teams Toolkit will setup you new project in Teams Developer Portal. The project will be added for the Teams organization linked to the Microsoft 365 account you chose in the steps above and create a new Azure Active Directory registration. This is required for the app to run in Teams.

## Run and debug your app

You can launch your app project running locally from Visual Studio.

1. Open or [create a Teams app project](#get-started-quickly-with-a-new-project).
2. Press **F5** or select **Debug > Start Debugging** in Visual Studio.

Visual Studio will launch your Teams app project in a browser and start debugging.

## Host your app in cloud

You can create and automatically configure cloud resources for hosting your app in Azure using Teams Toolkit.

1. Select the **Project > Teams Toolkit > Provision in the Cloud**.
2. Select Azure subscription from the you want to use to create resources with.

Teams Toolkit creates Azure resources in this subscription but no code is deployed during this step. To deploy your project to these new resources:

1. Select the **Project > Teams Toolkit > Deploy in the Cloud** menu.

## Preview your app running from cloud resources

You can run your app in a browser using the remote resources to verify that everything works. It's not possible to debug during in this scenario yet.

1. Select the **Project > Teams Toolkit > Preview Teams app** menu.

Your app will open in a browser and use the resources created by the Provision and Deploy steps.

## Publish your app to Teams

In the [Teams Developer Portal](https://dev.teams.microsoft.com/home), you can upload your app to a team, submit your app to your company custom app store for users in your organization, or submit your app to App Source for all Teams users.

* Your IT admin will review these submissions.
* You can return to the **Publish** page to check on your submission status and learn if your app was approved or rejected by your IT admin. This is also where you can submit updates to your app or cancel any currently active submissions.
