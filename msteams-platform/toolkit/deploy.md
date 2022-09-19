---
title: Deploy to the cloud
author: MuyangAmigo
description:  In this module, learn how to deploy app to the cloud, Azure, or SharePoint and deploy Teams apps using Teams Toolkit
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
zone_pivot_groups: teams-app-platform
---

# Deploy Teams app to the cloud

Teams Toolkit helps you to deploy or upload the frontend and backend code in your application to your provisioned cloud resources in Azure.

::: zone pivot="visual-studio-code"

## Deploy Teams app to the cloud using Visual Studio Code

You can deploy the following to the cloud:

* The tab, such as frontend applications are deployed to Azure storage and configured for static web hosting or a sharepoint site.
* The backend APIs are deployed to Azure functions.
* The bot or message extension is deployed to Azure app service.

  > [!NOTE]
  > Before you deploy app code to Azure cloud, you need to successfully complete the [provisioning of cloud resources](provision.md).

## Deploy Teams apps using Teams Toolkit

The Get started guides help you to deploy using Teams Toolkit. You can use the following to deploy your Teams app:

* [Deploy your app to Azure](/microsoftteams/platform/sbs-gs-javascript?tabs=vscode%2Cvsc%2Cviscode%2Cvcode&tutorial-step=8&branch)
* [Deploy your app to SharePoint](/microsoftteams/platform/sbs-gs-spfx?tabs=vscode%2Cviscode&tutorial-step=4&branch)

## Details on Teams app workload

| Teams app workload | Source code | Build artifact| Target resource |
|-------------|----------|---------------|---------------|
|Tabs with React </br> The frontend workload| `yourProjectFolder/tabs`| `tabs/build` |Azure storage |
|Tabs with SharePoint </br> The frontend workload | `yourProjectFolder/SPFx`| `SPFx/sharepoint/solution` |SharePoint app catalog |
|APIs on Azure functions </br> The backend workload | `yourProjectFolder/api`| Not applicable |Azure functions |
|Bots and message extensions </br> The backend workload | `yourProjectFolder/bot` | Not applicable | Azure app service |

> [!NOTE]
> When you include Azure API management resource in your project and trigger deploy, you can publish your APIs in Azure functions to Azure API management service.

::: zone-end

::: zone pivot="visual-studio"

## Deploy Teams app to the cloud using Visual Studio

The following apps can be deployed in Visual Studio:

* The tab app, such as frontend applications are deployed to Azure storage, configured for static web hosting.
* The notification bot app with Azure function triggers can be deployed to Azure functions.
* The bot app or message extension can be deployed to Azure app services.

After deploying, you can preview the app in Teams client or the web browser before you can start using.

## Deploy Teams app using Teams Toolkit

1. Open Visual Studio.
1. Select **Create a new project** or open an existing project from the list.
1. Right-click on your project **MyTeamsApp1** > **Teams Toolkit** > **Deploy to the cloud**.

   :::image type="content" source="../assets/images/deploy-teams-app-cloud-vs/vs-deploy-cloud.png" alt-text="deploy to cloud":::

   > [!NOTE]
   > In this scenario the project name is MyTeamsApp1.

1. Select **Deploy** in the confirmation dialog.

   :::image type="content" source="../assets/images/deploy-teams-app-cloud-vs/vs-deploy-confirmation.png" alt-text="Deploy to cloud confirmation dialog":::

   After the deploy process is completed, you can see a pop-up with the confirmation that it has been successfully deployed. You can also check the status in the output window.

   :::image type="content" source="../assets/images/deploy-teams-app-cloud-vs/VS-deploy-popup.png" alt-text="deploy to cloud popup":::

### Preview your app

To preview your app, you first need to create a Zip app package and sideload into the Teams client.

1. Select **Project** > **Teams Toolkit** > **Zip App Package**.
1. Select option **For Local** or **For Azure** to generate Teams app package.

   :::image type="content" source="../assets/images/deploy-teams-app-cloud-vs/vs-deploy-ZipApp-package1.png" alt-text="Generate teams app package":::

**To preview your app in Teams client**

1. Select **Project** > **Teams Toolkit** > **Preview in Teams**.

   :::image type="content" source="../assets/images/deploy-teams-app-cloud-vs/vs-deploy-preview-teams2.png" alt-text="Preview Teams app in teams client":::

   Now your app is sideloaded into Teams.

   :::image type="content" source="../assets/images/deploy-teams-app-cloud-vs/sideload-teams.png" alt-text="Sideload Teams app in teams client":::

The other way to preview your app:

1. Right-click on your project **MyTeamsApp1** under **Solution Explorer**.
1. Select **Teams Toolkit** > **Preview in Teams** to launch the Teams app in web browser.

   :::image type="content" source="../assets/images/deploy-teams-app-cloud-vs/vs-deploy-preview-teams.png" alt-text="Preview teams app in web browser":::

   > [!NOTE]
   > The same menu options are available in Project menu.

   Now your app is sideloaded into Teams.

   :::image type="content" source="../assets/images/deploy-teams-app-cloud-vs/sideload-teams.png" alt-text="Sideload Teams app in teams client":::

::: zone-end

## See also

* [Create and deploy an Azure cloud service](/azure/cloud-services/cloud-services-how-to-create-deploy-portal)
* [Create multi-capability Teams apps](add-capability.md)
* [Add cloud resources to Microsoft Teams app](add-resource.md)
