---
title: Deploy Teams app to the cloud using Visual Studio
author: surbhigupta
description:  In this module, learn how to deploy app to the cloud, Azure, or SharePoint and deploy Teams apps using Teams Toolkit in Visual Studio
ms.author: v-amprasad
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# Deploy Teams app to the cloud using Visual Studio

Teams Toolkit helps you to deploy or upload your application's front-end and back-end code to the provisioned cloud resources in your Azure subscription. After deploying, you can preview the app in Teams client or the web browser before you can start using. The following apps can be deployed in Visual Studio:

* The tab app, such as frontend applications are deployed to Azure storage, configured for static web hosting.
* The notification bot app with Azure function triggers can be deployed to Azure functions.
* The bot app or message extension can be deployed to Azure app services.

## Prerequisite

Here's a list of tools you need for building and deploying your apps.

| &nbsp; | Install | For using... |
| --- | --- | --- |
| &nbsp; | **Required** | &nbsp; |
| &nbsp; | Visual Studio 2022 version 17.3 | You can install the enterprise edition of Visual Studio, and install the "ASP.NET "workload and Microsoft Teams Development Tools. |
| &nbsp; | Teams Toolkit | A Visual Studio extension that creates a project scaffolding for your app. Use latest version. |
| &nbsp; | [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Microsoft Teams to collaborate with everyone you work with through apps for chat, meetings, call - all in one place. |
| &nbsp; | Azure Tools and [Microsoft Azure CLI](/cli/azure/install-azure-cli) | Azure tools to access stored data or to deploy a cloud-based backend for your Teams app in Azure. |

  > [!NOTE]
  > Before you deploy project code to cloud, [Provision cloud resources for TTK Visual Studio](provision VS.md).

## Deploy Teams app using Teams Toolkit

1. Launch Visual Studio.
1. Select **Create a new project** or open an existing project from the list.
1. Right-click on your project **MyTeamsApp1**.
1. Select **Teams Toolkit**.
1. Select **Deploy to the cloud…**

   :::image type="content" source="../assets/images/deploy-teams-app-cloud-vs/vs-deploy-cloud.png" alt-text="deploy to cloud":::

   > [!NOTE]
   > In this scenario the project name is MyTeamsApp1.

1. Select **Deploy** in the confirmation dialog.

   :::image type="content" source="../assets/images/deploy-teams-app-cloud-vs/vs-deploy-confirmation.png" alt-text="Deploy to cloud confirmation dialog":::

1. After the Deploy process is triggered and completed, you can see a pop-up with the confirmation that it has been successfully deployed. You can also check the status in the output window.

   :::image type="content" source="../assets/images/deploy-teams-app-cloud-vs/VS-deploy-popup.png" alt-text="deploy to cloud popup":::

After your project is successfully deployed to Azure, there are different ways to preview your app in Teams Toolkit:

1. Select **Project** > **Teams Toolkit** > **Zip App Package** to generate Teams app package.
1. Select option **For Local** or **For Azure** and upload to Teams client.

   :::image type="content" source="../assets/images/deploy-teams-app-cloud-vs/vs-deploy-ZipApp-package.png" alt-text="Generate teams app package":::

  **To preview your app in Teams client**

3. Select **Project**.
4. Select **Teams Toolkit**.
5. Select **Preview in Teams**.

   :::image type="content" source="../assets/images/deploy-teams-app-cloud-vs/vs-deploy-preview-teams1.png" alt-text="Preview Teams app in teams client":::

The other way to preview your app:

1. Right-click on your project **MyTeamsApp1** under the Solution Explorer panel.
1. Select **Teams Toolkit**.
1. Select **Preview in Teams** to launch the Teams app in web browser.

   :::image type="content" source="../assets/images/deploy-teams-app-cloud-vs/vs-deploy-preview-teams.png" alt-text="Preview teams app in web browser":::

   > [!NOTE]
   > The same menu options are available in Project menu.

## See also

* [Create new Teams app in Visual Studio](create-new-teams-app-for-Visual-Studio.md)
* [Provision cloud resources using Visual Studio](provision-cloud-resources.md)
* [Edit Teams app manifest using Visual Studio](VS-TeamsFx-preview-and-customize-app-manifest.md)
* [Debug your Teams app locally using Visual Studio](debug-teams-app-visual-studio.md)
