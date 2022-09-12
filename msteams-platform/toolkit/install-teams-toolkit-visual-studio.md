---
title: Install Teams Toolkit for Visual Studio
author: surbhigupta
description: In this module, learn Install Teams Toolkit for Visual Studio
ms.author: v-amprasad
ms.localizationpriority: medium
ms.topic: overview
ms.date: 05/24/2022
---

# Install Teams Toolkit for Visual Studio

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
   > You're recommended to download Visual Studio 2022 version 17.3.0, since Teams Toolkit for Visual Studio is GA in this version. This article is written for Visual Studio 2022 version 17.3.0. Teams Toolkit version 17.3.* or higher.

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
|Provision to the Cloud     |This option helps you to create Azure resources that host your Teams app. For more information, see [Provision cloud resources using Visual Studio](provision-cloud-resources.md)        |
|Deploy to the Cloud     |This option helps you to copy your code to the Azure resources created when you did “Provision to the Cloud”. For more information, see [Deploy Teams app to the cloud using Visual Studio](deploy-teams-app.md)        |
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

* [Microsoft.Extensions.DependencyInjection Namespace](/../dotnet/api/Microsoft.Extensions.DependencyInjection)
* [Microsoft.TeamsFx Namespace](/../dotnet/api/Microsoft.TeamsFx)
* [Microsoft.TeamsFx.Configuration Namespace](/../dotnet/api/Microsoft.TeamsFx.Configuration)
* [Microsoft.TeamsFx.Conversation Namespace](/../dotnet/api/Microsoft.TeamsFx.Conversation)
* [Microsoft.TeamsFx.Helper Namespace](/../dotnet/api/Microsoft.TeamsFx.Helper)

## See also

* [Create new Teams app in Visual Studio](create-new-teams-app-for-Visual-Studio.md)
* [Provision cloud resources using Visual Studio](provision-cloud-resources.md)
* [Deploy Teams app to the cloud using Visual Studio](deploy-teams-app.md)
