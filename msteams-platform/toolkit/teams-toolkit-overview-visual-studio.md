---
title: Teams Toolkit overview for Visual Studio
author: zyxiaoyuer
description: In this module, learn Teams Toolkit Overview for Visual Studio
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 05/24/2022
---

# Teams Toolkit overview for Visual Studio

Teams Toolkit for Microsoft Visual Studio Code helps you to create and deploy Microsoft Teams apps with integrated identity, access to cloud storage, data from Microsoft Graph, and other services in Azure and Microsoft 365 with zero-configuration approach. For Teams app development, you can also use [CLI tool](https://github.com/OfficeDev/TeamsFx/blob/dev/docs/cli/user-manual.md), similar to Teams Toolkit for Visual Studio that includes Toolkit `teamsfx`. Teams Toolkit lets you create, debug, and deploy your Teams app right from Visual Studio Code. App development with Teams Toolkit has the advantages of:

* Integrated identity.
* Access to cloud storage.
* Data from Microsoft Graph.
* Azure and Microsoft 365 services with zero-configuration approach.

Teams Toolkit brings all the tools needed to build a Teams app in one place.

## User Journey of Teams Toolkit

Teams Toolkit automates manual work and provides you with great integration of Teams and Azure resources. The following image shows Teams Toolkit user journey:

:::image type="content" source="../assets/images/teams-toolkit-overview/teams-toolkit-user-journey.png" alt-text="Teams toolkit user journey":::

The main milestones of this journey are:

1. You can start by creating a new project or try building a sample Teams app.
1. You can then edit code or the manifest file as needed.
1. For building and debugging the Teams app you can use your Microsoft 365 account.
1. For provisioning and deploying your app to cloud you can use your Azure account.
1. You can now publish your app to Teams.

## Install Teams Toolkit for Visual Studio

1. You can download the latest Visual Studio installer from the [Visual Studio download page](https://visualstudio.microsoft.com/vs/preview/). You need to first install the Visual Studio installer before installing Visual Studio.

   > [!IMPORTANT]
   > You are recommended to download Visual Studio 2022 17.3.0 version, since Teams Toolkit for Visual Studio is GA in this version. And this doc is written for Visual Studio 2022 17.3.0 version. Teams Toolkit version 17.3.*.

2. After you open the Visual Studio installer, in the pop-up Workloads window, ensure that you select checkboxes against the **ASP.NET and web development** workload. You also need to select the **Microsoft Teams development tools** in the installation details panel. Select **Install**.

   :::image type="content" source="../assets/images/teams-toolkit-overview/visual-studio-install1.png" alt-text="Visual studio-installation":::

3. Select **Launch** to open Visual Studio.

    :::image type="content" source="../assets/images/teams-toolkit-overview/visual-studio-launch.png" alt-text="Launch visual studio":::

## Take a tour of Teams Toolkit

You have to first install Teams Toolkit, then select **Project > Teams Toolkit** to access the **Teams Toolkit menu**:

:::image type="content" source="../assets/images/teams-toolkit-overview/teams-toolkit-operations-menu.png" alt-text="Teams toolkit operations menu":::

You can also access Teams Toolkit menu from solution explorer by right clicking on your project then select **Teams Toolkit**:

:::image type="content" source="../assets/images/teams-toolkit-overview/teams-toolkit-operations-menu1.png" alt-text="Teams toolkit operations from Project":::

> [!NOTE]
> In this scenario the project name is **MyTeamsApp1**.

You can do the following operations on Teams Toolkit for Visual Studio:

|Operation  |Description  |
|---------|---------|
|Create Teams Project     |Create Teams project using Teams template in Visual Studio         |
|Prepare Teams App Dependencies     |Before you do a local debug perform this step, it helps you to set up the local debug dependencies and register Teams app in Teams platform. You need a Microsoft 365 account. For more information, see [Debug your Teams app locally](<http://{placeholder_url_to_doc_page_?zone=vs>})         |
|Open Manifest File     |To open Teams manifest file, you can hover by the parameters to preview value. For more information, see [Edit Teams manifest file](<http://{placeholder_url_to_doc_page_?zone=vs>})         |
|Update Manifest in Teams Developer Portal     |When you update the manifest file, only then you can redeploy the manifest file to Azure without deploying the whole project again. Use this command to update your changes to remote. For more information, see [Edit Teams manifest file](<http://{placeholder_url_to_doc_page_?zone=vs>})         |
|Provision to the Cloud     |This option helps you to create Azure resources that host your Teams app. For more information, see [Provision cloud resources](<http://{placeholder_url_to_doc_page_?zone=vs>})         |
|Deploy to the Cloud     |This option helps you to copy your code to the Azure resources created when you did “Provision to the Cloud”. For more information, see [Deploy Teams app to the cloud](http://{placeholder_url_to_doc_page_?zone=vs})         |
|Preview in Teams     |This option launches the Teams web client and lets you preview Teams app in their browser.         |
|Zip App Package     |This option generates a Teams app package in the `Build` folder under the project. You can upload the package to Teams client and run the Teams app.         |

The following operations aren't supported yet in Teams Toolkit for Visual Studio (compared to Teams Toolkit for VS Code), however they're planned in the future product road map.

|Operation  |Description  |
|---------|---------|
|Add another Teams capabilities to your Teams app     |        |
|Add more Azure resources to your Teams app     |         |
|Add single sign-on to your Teams app     |      |
|Add API connection to your Teams app     |        |
|Customize Azure AD manifest     |         |
|Add CI/CD pipelines     |       |
|Manage multiple cloud environments     |         |
|Collaborate on Teams projects     |         |
|Publish Teams app     |         |

## See Also
