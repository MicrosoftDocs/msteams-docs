---
title: Deploy to the cloud
author: MuyangAmigo
description: Learn how to deploy app to the cloud, Azure, or SharePoint using Teams Toolkit in Visual Studio Code and Visual Studio.
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
zone_pivot_groups: teams-app-platform
---

# Deploy Teams app to the cloud

Teams Toolkit helps to deploy or upload the front-end and back-end code in your app to your provisioned cloud resources in Azure.

::: zone pivot="visual-studio-code"

## Deploy Teams app to the cloud using Microsoft Visual Studio Code

You can deploy the following to the cloud:

* The tab, such as front-end apps are deployed to Azure Storage and configured for static web hosting or a SharePoint site.
* The back-end APIs are deployed to Azure Functions.
* The bot or message extension is deployed to Azure App Service.

  > [!NOTE]
  > Before you deploy app code to Azure cloud, you need to successfully complete the [provisioning of cloud resources](provision.md).

## Deploy Teams apps using Teams Toolkit

The Get started guide helps to deploy using Teams Toolkit. You can use the following to deploy your Teams app:

* [Deploy your app to Azure](/microsoftteams/platform/sbs-gs-javascript?tabs=vscode%2Cvsc%2Cviscode%2Cvcode&tutorial-step=4)
* [Deploy your app to SharePoint](/microsoftteams/platform/sbs-gs-spfx?tabs=vscode%2Cviscode&tutorial-step=4)

## Details on Teams app workload

| Teams app workload | Source code | Build artifact| Target resource |
|-------------|----------|---------------|---------------|
|Tabs with React </br> The front-end workload| `yourProjectFolder/tabs`| `tabs/build` |Azure Storage |
|Tabs with SharePoint </br> The front-end workload | `yourProjectFolder/SPFx`| `SPFx/sharepoint/solution` |SharePoint app catalog |
|APIs on Azure Functions </br> The back-end workload | `yourProjectFolder/api`| Not applicable |Azure Functions |
|Bots and message extensions </br> The back-end workload | `yourProjectFolder/bot` | Not applicable | Azure App Service |

> [!NOTE]
> When you include Azure API Management resource in your project and trigger deploy, you can publish your APIs in Azure Functions to Azure API Management service.

::: zone-end

::: zone pivot="visual-studio"

## Deploy Teams app to the cloud using Visual Studio

You can deploy the following to the cloud:

* The tab app, such as front-end apps are deployed to Azure Storage, configured for static web hosting.
* The notification bot app with Azure Functions triggers can be deployed to Azure Functions.
* The bot app or message extension is deployed to Azure App Services.

After deploying, you can preview the app in Teams client or the web browser before you start using it.

## Deploy Teams app using Teams Toolkit

1. Open **Visual Studio**.
1. Select **Create a new project** or open an existing project from the list.
1. Right-click on your project **MyTeamsApp4** > **Teams Toolkit** > **Deploy to the cloud...**.

   :::image type="content" source="images/vs-deploy-cloud_1-v4.png" alt-text="deploy to cloud":::

   > [!NOTE]
   > In this scenario the project name is MyTeamsApp4.

1. In the pop-up window that appears, select **Deploy**.

   :::image type="content" source="images/vs-deploy-confirmation-v4.png" alt-text="Deploy to cloud confirmation dialog":::

   After the deploy process completes, you can see a pop-up with the confirmation that it has been successfully deployed. You can also check the status in the output window.

   :::image type="content" source="images/VS-deploy-popup-v4.png" alt-text="deploy to cloud popup":::

### Preview your app

To preview your app, you need to create a **Zip App Package** and sideload into the Teams client.

1. Select **Project** > **Teams Toolkit** > **Zip App Package**.
1. Select **For Local** or **For Azure** to generate Teams app package.

   :::image type="content" source="images/vs-deploy-ZipApp-package1-v4.png" alt-text="deploy to cloud popup":::

**To preview your app in Teams client**

1. Select **Project** > **Teams Toolkit** > **Preview in Teams**.

   :::image type="content" source="images/vs-deploy-preview-teams2-v4.png" alt-text="Preview Teams app in teams client":::

   Now your app is sideloaded into Teams.

   :::image type="content" source="images/sideload-teams_1-v4.PNG" alt-text="Sideload Teams app in teams client":::

The other way to preview your app:

1. Right-click on your project **MyTeamsApp4** under **Solution Explorer**.
1. Select **Teams Toolkit** > **Preview in Teams** to launch the Teams app in web browser.

   :::image type="content" source="../assets/images/deploy-teams-app-cloud-vs/vs-deploy-preview-teams_2.png" alt-text="Preview teams app in web browser":::

   > [!NOTE]
   > The same menu options are available in Project menu.

   Now your app is sideloaded into Teams.

   :::image type="content" source="images/sideload-teams_1-v4.PNG" alt-text="Sideload Teams app in teams client":::

::: zone-end

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals.md)
* [Create and deploy an Azure cloud service](/azure/cloud-services/cloud-services-how-to-create-deploy-portal)
* [Create multi-capability Teams apps](add-capability.md)
* [Add cloud resources to Microsoft Teams app](add-resource.md)
* [Create new Teams app in Visual Studio](create-new-project.md#create-new-teams-app-in-visual-studio)
* [Provision cloud resources using Visual Studio](provision-cloud-resources.md)
* [Edit Teams app manifest using Visual Studio](VS-TeamsFx-preview-and-customize-app-manifest.md)
* [Debug your Teams app locally using Visual Studio](debug-local.md#debug-your-teams-app-locally-using-visual-studio)
