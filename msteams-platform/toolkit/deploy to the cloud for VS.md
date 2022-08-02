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

Teams Toolkit helps you to deploy or upload your application's front-end and back-end code to the provisioned cloud resources in your Azure subscription. The following apps can be deployed in Visual Studio:

* The tab app, such as frontend applications are deployed to Azure storage, configured for static web hosting.
* The notification bot app with Azure function triggers can be deployed to Azure functions.
* The bot app or message extension can be deployed to Azure app services.

## Prerequisite

* Install Visual Studio.
* Install Teams Toolkit.
* Create the Azure cloud resources to host your Microsoft Teams app from your project in Visual Studio.

  > [!NOTE]
  > Before you deploy project code to cloud, [Link to be added from PR#6427].

## Deploy Teams app using Teams Toolkit

1. Launch Visual Studio
1. Create a new or open an existing project.
1. Right click on your project **MyTeamsApp1**
1. Select **Teams Toolkit**
1. Select **Deploy to the cloud…**

   :::image type="content" source="../assets/images/deploy-teams-app-cloud-vs/vs-deploy-cloud.png" alt-text="deploy to cloud":::

> [!NOTE]
> In this scenario the project name is MyTeamsApp1.

1. Select **Deploy** when prompted with a confirmation dialog.

   :::image type="content" source="../assets/images/deploy-teams-app-cloud-vs/vs-deploy-confirmation.png" alt-text="Deploy to cloud confirmation dialog":::

1. After the Deploy process is triggered and completed, you'll see a pop-up with the confirmation that it has been successfully deployed. You can also check the status in the output window.

   :::image type="content" source="../assets/images/deploy-teams-app-cloud-vs/VS-deploy-popup.png" alt-text="deploy to cloud popup":::

You'll see that your project is successfully deployed to Azure, you can now use Preview in Teams option in Teams Toolkit to launch the Teams app in web browser. Under the solution explorer panel, right click on your **project** and select **Teams Toolkit** > **Preview in Teams**.
After your app is successfully deployed to Azure:
1.
2.
3.
:::image type="content" source="../assets/images/deploy-teams-app-cloud-vs/vs-deploy-preview-teams.png" alt-text="Preview app in teams":::

> [!NOTE]
> First you can choose Zip App package option to generate Teams app package, then upload to Teams client. You can now preview your app in Teams client. This is the other way to preview your app in the web browser from preview option in Teams.

The same menu options are also available in Project menu.

## See also

* TBD
