---
title: Deploy to the cloud VS
author: MuyangAmigo
description:  In this module, learn how to deploy app to the cloud, Azure, or SharePoint and deploy Teams apps using Teams Toolkit in Visual Studio
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# Deploy Teams app to the cloud

Teams Toolkit helps users to deploy or upload your application frontend and backend code to the provisioned cloud resources in your Azure subscription.

* The tab, such as frontend applications are deployed to Azure storage and configured for static web hosting.
* The Notification Bot with Azure Function triggeres are deployed to Azure Functions.
* The bot or message extension is deployed to Azure app service.

## Prerequisite

* Install Teams Toolkit
* Create the Azure cloud resources to host your Teams app by right clicking on your project

> [!NOTE]
> Before you deploy project code to cloud, [provision the cloud resources](provision.md).

## Deploy Teams apps using Teams Toolkit

1. Right click on your project, select Teams Toolkit -> Deploy to the cloud … .

:::image type="content" source="../assets/images/teams-toolkit-v2/deploy-vs/VS-deploy-to-cloud.png" alt-text="vs deploy to cloud":::

2. You will be prompted with a confirmation dialog. Click Deploy.

:::image type="content" source="../assets/images/teams-toolkit-v2/deploy-vs/VS-deploy-confirmation-dialog.png" alt-text="vs deploy to cloud confirmation dialog":::

3. Then the Deploy process is kicked off, after deploy finished, you will see a pop up window and you can check the status in output window aslo.

:::image type="content" source="../assets/images/teams-toolkit-v2/deploy-vs/VS-deploy-popup.png" alt-text="vs deploy to cloud popup":::

Now your project is successfully deploy to Azure, you can use Preview in Teams option offered by Teams Toolkit to launch the Teams app in web browser. To do this, just right click on your project and select Teams Toolkit -> Preview in Teams. The menu option is also available in Project menu.

> [!NOTE]
> If you don’t like to use Preivew in Teams to preivew app in web browser. You can choose to use Zip App package option to generate Teams app package first, then upload to Teams client. Then you can preview your app in Teams client.

## See also

* TBD
