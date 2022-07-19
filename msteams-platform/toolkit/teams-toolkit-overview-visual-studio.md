---
title: Teams Toolkit Overview for Visual Studio
author: zyxiaoyuer
description: In this module, learn Teams Toolkit Overview for Visual Studio
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 05/24/2022
---

# Teams Toolkit overview for Visual Studio

Teams Toolkit for Microsoft Visual Studio Code helps you to create and deploy Teams apps with integrated identity, access to cloud storage, data from Microsoft Graph, and other services in Azure and Microsoft 365 with zero-configuration approach. For Teams app development, you can also use CLI tool, similar to Teams Toolkit for Visual Studio which includes Toolkit teamsfx. Teams Toolkit lets you create, debug, and deploy your Teams app right from Visual Studio Code. App development with the toolkit has the advantages of:

* Integrated identity.
* Access to cloud storage.
* Data from Microsoft Graph.
* Azure and Microsoft 365 services with zero-configuration approach.

Teams Toolkit brings all tools needed for building a Teams app in one place.

## User Journey of Teams Toolkit

Teams Toolkit automates manual work and provides you with great integration of Teams and Azure resources. The following image shows Teams Toolkit user journey:

:::image type="content" source="../assets/images/teams-toolkit-overview/teams-toolkit-user-journey.png" alt-text="Teams toolkit user journey":::

The main milestones of this journey are:

1. Start by creating a new project or trying a sample Teams app.
1. Edit code or manifest file as needed.
1. Use Microsoft 365 account to build and debug your Teams app.
1. Use Azure account to provision and deploy your app to cloud.
1. Publish your app to Teams.

## Install Teams Toolkit for Visual Studio

1. You can download the latest VS installer from the [VS download page](https://visualstudio.microsoft.com/vs/preview/). You need to first install the VS installer before installing VS.

    > [!IMPORTANT]
    > We recommend you to download VS 2022 17.3.0 version, since Teams Toolkit for Visual Studio is GA in this version. And this doc is written for VS 2022 17.3.0 version. Teams Toolkit version 17.3.*.

2. After you open the VS installer, in the pop-up Workloads window, ensure that you select checkboxes against the **ASP.NET and web development** workload. You also need to select the **Microsoft Teams development tools** in the installation details panel. Select **Install**.

    :::image type="content" source="../assets/images/teams-toolkit-overview/visual-studio-install.png" alt-text="Visual studio-installation":::

3. Select **Launch** to open Visual Studio.

    :::image type="content" source="../assets/images/teams-toolkit-overview/visual-studio-launch.png" alt-text="Launch visual studio":::

## Take a tour of Teams Toolkit

You need to install Teams Toolkit, and then you can access the **Teams Toolkit menu** when you select **Project > Teams Toolkit**:

:::image type="content" source="../assets/images/teams-toolkit-overview/teams-toolkit-operations-menu.png" alt-text="Teams toolkit operations menu":::

Teams Toolkit operations are also available in the menu by right select on your project:

:::image type="content" source="../assets/images/teams-toolkit-overview/teams-toolkit-operations-menu1.png" alt-text="Teams toolkit operations from Project":::

Available operations on Teams Toolkit for Visual Studio:

|Operation  |Description  |
|---------|---------|
|Create Teams Project     |Create Teams project using Teams template in VS         |
|Prepare Teams App Dependencies     |This step is a required step before local debug, it helps to set up the local debug dependencies and register Teams app in Teams platform, hence it requires Microsoft 365 account to in this step. For more information, see [Debug your Teams app locally] (<http://{placeholder_url_to_doc_page_?zone=vs>})         |
|Open Manifest File     |To open Teams manifest file, and user can hover by the parameters to preview value. For more information, see [Edit Teams manifest file] (<http://{placeholder_url_to_doc_page_?zone=vs>})         |
|Update Manifest in Teams Developer Portal     |When there are updates to manifest file, user would like to only redeploy the manifest file to Azure without deploy the whole project again, use this command to update your changes to remote. For more information, refer to [Edit Teams manifest file] (<http://{placeholder_url_to_doc_page_?zone=vs>})         |
|Provision to the Cloud     |This option helps users to create Azure resources which host your Teams app. For more information, see [Provision cloud resources] (<http://{placeholder_url_to_doc_page_?zone=vs>})         |
|Deploy to the Cloud     |This option helps users to copy their code to the Azure resources created when “Provision to the Cloud”. For more information, see [Deploy Teams app to the cloud](http://{placeholder_url_to_doc_page_?zone=vs})         |
|Preview in Teams     |This option will launch the Teams web client and let user preview Teams app in their browser.         |
|Zip App Package     |This option will generate a Teams app package in the `Build` folder under the project. User can upload the package to Teams client in order to run the Teams app.         |

The following operations aren't supported yet in Teams Toolkit for Visual Studio (compared to Teams Toolkit for VS Code), however they're planned in our product road map, which comes in short future.

|Operation  |Description  |
|---------|---------|
|Add another Teams capabilities to your Teams app     |        |
|Add more Azure resources to your Teams app     |         |
|Add single sign-on to your Teams app     |      |
|Add API connection to your Teams app     |        |
|Customize Azure AD manifest     |         |
|Add CICD pipelines     |       |
|Manage multiple cloud environments     |         |
|Collaborate on Teams projects     |         |
|Publish Teams app     |         |
