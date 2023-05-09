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

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals.md)
* [Create and deploy an Azure cloud service](/azure/cloud-services/cloud-services-how-to-create-deploy-portal)
* [Create multi-capability Teams apps](add-capability.md)
* [Add cloud resources to Microsoft Teams app](add-resource.md)
* [Provision cloud resources using Visual Studio](provision-cloud-resources.md)
* [Edit Teams app manifest using Visual Studio](VS-TeamsFx-preview-and-customize-app-manifest.md)
