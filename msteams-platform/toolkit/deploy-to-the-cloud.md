---
title: Deploy to the cloud
author: v-vasudhab
description:  Describes how to deploy to the cloud.
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: About Deploying
---

# Deploy to the cloud 

TeamsFx helps you to deploy your project code to the provisioned cloud resources with a single command.

## Prerequisite

Before you can deploy your project code to cloud, complete the [resource provision](provision-in-the-cloud.md) steps.

## Deployment

Teams Toolkit deploys or uploads the backend and frontend code in your application to provisioned cloud resources in Azure.

* The backend Azure functions if configured, can use different kinds of Azure services, including Azure App service and Azure storage.
* The frontend applications are deployed to an Azure storage account and configured for static web hosting or a SharePoint site.

## Deployment by project type

|Project type|Resources|Code location|
|-------------|----------|---------------|
|Tabs with React </br> The frontend workload|Azure Storage account|`yourProjectFolder/tabs`|
|Tabs with SharePoint </br> The frontend workload |SharePoint app catalog|`yourProjectFolder/SPFx`|
|Bots and messaging extensions </br> The backend workload | Azure web app|`yourProjectFolder/bot` |

You can optionally include Azure resources that fit your application needs. The corresponding project code is deployed to the resources as follows:

* Azure functions
* Azure API management

For more information on add cloud resources, see [Add cloud resources](add-cloud-resources.md)

## Deploy your project

You can consider the following different approaches to deploy your project to cloud:

* For tab project, see [Get started - Build your first Teams app with React](~/get-started/first-app-react.md?tabs=vscode#deploy-your-app-to-azure).
* For tab project with SPFx, see [Get started - Build your first Teams app with SPFx](~/get-started/first-app-spfx.md?tabs=cli#deploy-your-app-to-sharepoint).
* For bot and messaging extension project, see [Get started - Build your first conversational bot](~/get-started/first-app-bot.md?tabs=vscode#deploy-your-app-to-azure).  
* For messaging extension project, see [Build your first messaging extension](~/get-started/first-message-extension.md?tabs=vscode#deploy-your-app-to-azure).

> [!NOTE]
> If your project contains multiple workloads such as tabs, bots, functions, APIM, you have the option to deploy at once or deploy each of the workload.

## Advanced use case

(Placeholder)

## See also

* [Add more cloud resources](~\toolkit\add-cloud-resources.md)
* [Add more Teams app capabilities](~\toolkit\add-capabilities.md)
* [Deploy project code with CI/CD pipelines](~\toolkit\build-pipelines.md)
