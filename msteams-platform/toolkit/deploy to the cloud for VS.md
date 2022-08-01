---
title: Deploy Teams app to the cloud for Visual Studio
author: MuyangAmigo
description:  In this module, learn how to deploy app to the cloud, Azure, or SharePoint and deploy Teams apps using Teams Toolkit in Visual Studio
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# Deploy Teams app to the cloud for Visual Studio

Microsoft Teams Toolkit helps you to deploy or upload your applications front-end and back-end code to the provisioned cloud resources in your Azure subscription.

* The tab, such as frontend applications are deployed to Azure storage and configured for static web hosting.
* The Notification Bot with Azure function triggers is deployed to Azure functions.
* The bot or message extension is deployed to Azure app service.

## Prerequisite

* Install Visual Studio.
* Install Teams Toolkit.
* Create the Azure cloud resources to host your Teams app from your project in Visual Studio.

> [!NOTE]
> Before you deploy project code to cloud, [provision the cloud resources](provision.md).

## Deploy Teams apps using Teams Toolkit

1. Launch Visual Studio and open an existing or create a new project.
2. Right click on your **project** under **Solution Explorer panel**, select **Teams Toolkit** > **Deploy to the cloud …**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/deploy-vs/VS-deploy-to-cloud.PNG" alt-text="deploy to cloud":::

> [!NOTE]
> In this scenario the project name is MyTeamsApp1.

3. You'll be prompted with a confirmation dialog. Select **Deploy**.

   :::image type="content" source="../assets/images/deploy-teams-app-cloud-vs/vs-deploy-confirmation.png" alt-text="Deploy to cloud confirmation dialog":::

4. After the Deploy process is triggered and completed, you'll see a pop-up with the confirmation that it has been successfully deployed. You can also check the status in output window.

   :::image type="content" source="../assets/images/deploy-teams-app-cloud-vs/VS-deploy-popup.png" alt-text="deploy to cloud popup":::

You'll see that your project is successfully deployed to Azure, you can use Preview in Teams option in Teams Toolkit to launch the Teams app in web browser. Under the solution explorer panel, right click on your **project** and select **Teams Toolkit** > **Preview in Teams**. The same menu options are also available in Project menu.

:::image type="content" source="../assets/images/deploy-teams-app-cloud-vs/vs-deploy-preview-teams.png" alt-text="Preview app in teams":::

> [!NOTE]
> You can choose to use Zip App package option to generate Teams app package first, then upload to Teams client. Then you can preview your app in Teams client. This is the other way to preview app in web browser from the preview option in Teams.

## See also

* TBD
