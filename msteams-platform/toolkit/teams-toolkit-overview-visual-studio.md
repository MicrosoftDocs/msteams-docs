---
title: Teams Toolkit overview for Visual Studio
author: surbhigupta
description: In this module, learn Teams Toolkit Overview for Visual Studio
ms.author: v-amprasad
ms.localizationpriority: medium
ms.topic: overview
ms.date: 05/24/2022
---

# Teams Toolkit overview for Visual Studio

Teams Toolkit for Visual Studio helps you to create, debug and deploy Microsoft Teams apps. Teams Toolkit for Visual Studio is GA in Visual Studio 2022 version 17.3. App development with Teams Toolkit has the advantages of:

* Integrated identity.
* Access to cloud storage.
* Data from Microsoft Graph.
* Azure and Microsoft 365 services with zero-configuration approach.

For Teams app development, you can also use [CLI tool](https://github.com/OfficeDev/TeamsFx/blob/dev/docs/cli/user-manual.md), similar to Teams Toolkit for Microsoft Visual Studio code that includes Toolkit `teamsfx`.

Teams Toolkit brings all the tools needed to build a Teams app in one place.

> [!NOTE]
> Teams Toolkit is not available in other versions.

## User Journey of Teams Toolkit

Teams Toolkit automates manual work and provides you with great integration of Teams and Azure resources. The following image shows the user journey:

:::image type="content" source="../assets/images/teams-toolkit-overview/teams-toolkit-user-journey.png" alt-text="Teams toolkit user journey":::

The main milestones of this journey are:

1. You can start by creating a new project or try building a sample Teams app.
1. You can then edit code or the manifest file as required.
1. For building and debugging the Teams app you can use your Microsoft 365 account.
1. For provisioning and deploying your app to cloud you can use your Azure account.
1. You can finally publish your app to Teams.

## Install Teams Toolkit for Visual Studio

You can download the latest Visual Studio installer from the [Visual Studio download page](https://visualstudio.microsoft.com/vs/preview/).

> [!NOTE]
> You'll need to first install the Visual Studio installer before installing Visual Studio.

After you open the Visual Studio installer, in the pop-up Workloads window.

1. Select the box **ASP.NET and web development** workload.
1. Select the box **Microsoft Teams development tools** in the installation details panel.
1. Select **Install**.

   :::image type="content" source="../assets/images/teams-toolkit-overview/visual-studio-install1.png" alt-text="Visual studio-installation":::

1. Select **Launch** to open Visual Studio.

    :::image type="content" source="../assets/images/teams-toolkit-overview/visual-studio-launch.png" alt-text="Launch visual studio":::

   > [!IMPORTANT]
   > You're recommended to download Visual Studio 2022 version 17.3.0, since Teams Toolkit for Visual Studio is GA in this version. This article is written for Visual Studio 2022 version 17.3.0. Teams Toolkit version 17.3.*.

## Take a tour of Teams Toolkit

After you install Teams Toolkit, you can take a brief look at the different menu options of Teams Toolkit:

1. Select **Project**.
1. Select **Teams Toolkit**.
1. You can now access the **Teams Toolkit menu** options.

   :::image type="content" source="../assets/images/teams-toolkit-overview/teams-toolkit-operations-menu.png" alt-text="Teams toolkit operations menu":::

You can also access Teams Toolkit menu from Solution Explorer.

4. Right-click on your **Project**.
5. Select **Teams Toolkit** > **Teams Toolkit menu** options.

   :::image type="content" source="../assets/images/teams-toolkit-overview/teams-toolkit-operations-menu1.png" alt-text="Teams toolkit operations from Project":::

   > [!NOTE]
   > In this scenario the project name is **MyTeamsApp1**.

You can perform the following functions on Teams Toolkit for Visual Studio:

|Function  |Description  |
|---------|---------|
|Create Teams Project     |Create Teams project using Teams template in Visual Studio         |
|Prepare Teams App Dependencies     |Before you do a local debug perform this step, it helps you to set up the local debug dependencies and register Teams app in Teams platform. You need a Microsoft 365 account. For more information, see [Debug your Teams app locally using Visual Studio](debug-teams-app-visual-studio.md)         |
|Open Manifest File     |To open Teams manifest file, you can hover over the parameters to preview the values. For more information, see [Edit Teams app manifest using Visual Studio](VS-TeamsFx-preview-and-customize-app-manifest.md)         |
|Update Manifest in Teams Developer Portal     |When you update the manifest file, only then you can redeploy the manifest file to Azure without deploying the whole project again. Use this command to update your changes to remote. For more information, see [Edit Teams app manifest using Visual Studio](VS-TeamsFx-preview-and-customize-app-manifest.md)       |
|Provision to the Cloud     |This option helps you to create Azure resources that host your Teams app. For more information, see [Provision cloud resources using Visual Studio](provision-cloud-resources-using-Visual-Studio.md)         |
|Deploy to the Cloud     |This option helps you to copy your code to the Azure resources created when you did “Provision to the Cloud”. For more information, see [Deploy Teams app to the cloud using Visual Studio](deploy-Teams-app-to-the-cloud-using-Visual-Studio.md)         |
|Preview in Teams     |This option launches the Teams web client and lets you preview Teams app in their browser.         |
|Zip App Package     |This option generates a Teams app package in the `Build` folder under the project. You can upload the package to Teams client and run the Teams app.         |

The following operations aren't supported in Teams Toolkit for Visual Studio yet compared to Teams Toolkit for Visual Studio Code, however they're planned in the future product road map.

* Add another Teams capabilities to your Teams app.
* Add more Azure resources to your Teams app
* Add single sign-on to your Teams app.
* Add API connection to your Teams app.
* Customize Azure AD manifest.
* Add CI/CD pipelines.
* Manage multiple cloud environments.
* Collaborate on Teams projects.
* Publish Teams app.

### TeamsFx .NET SDK Reference docs

* [Microsoft.Extensions.DependencyInjection Namespace](https://docs.microsoft.com/dotnet/api/Microsoft.Extensions.DependencyInjection)
* [Microsoft.TeamsFx Namespace](https://docs.microsoft.com/dotnet/api/Microsoft.TeamsFx)
* [Microsoft.TeamsFx.Configuration Namespace](https://docs.microsoft.com/dotnet/api/Microsoft.TeamsFx.Configuration)
* [Microsoft.TeamsFx.Conversation Namespace](https://docs.microsoft.com/dotnet/api/Microsoft.TeamsFx.Conversation)
* [Microsoft.TeamsFx.Helper Namespace](https://docs.microsoft.com/dotnet/api/Microsoft.TeamsFx.Helper)

## See also

* [Create new Teams app in Visual Studio](create-new-teams-app-for-Visual-Studio.md)
* [Provision cloud resources using Visual Studio](provision-cloud-resources-using-Visual-Studio.md)
* [Deploy Teams app to the cloud using Visual Studio](deploy-Teams-app-to-the-cloud-using-Visual-Studio.md)
