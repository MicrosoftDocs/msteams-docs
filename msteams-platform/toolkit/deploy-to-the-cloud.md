---
title: Deploy to the cloud
author: Rajeshwari-v
description:  Describes how to deploy to the cloud.
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: overview
---

# Deploy to the cloud 

TeamsFx helps you to deploy your project code to the provisioned cloud resources with a single command.

## Prerequisite

Before you can deploy your project code to cloud, complete the [resource provision](provision-in-the-cloud.md) steps.

## Deployment

Teams Toolkit deploys or uploads the backend and frontend code in your application to the corresponding cloud resources in Azure that is provisioned.

* The backend (Azure Functions if configured) may use different kinds of Azure services, including Azure App Service and Azure Storage.
* The frontend applications are deployed to an Azure Storage account configured for static web hosting or a SharePoint site.

## Deployment by project type

| Project Type|	Resources|	Code Location|
|-------------|----------|---------------|
|Tab With React </br> The frontend workload	|Azure Storage Account|	`yourProjectFolder/tabs`|
|Tab With SharePoint </br> The frontend workload |SharePoint App Catalog|`yourProjectFolder/SPFx`|
|Bot and Messaging Extension </br> The backend workload | Azure Web App	`yourProjectFolder/bot` |

You have to optionally include Azure resources that fit your application needs and the corresponding project code is deployed to the resources, this includes the following:
* Azure Functions
* Azure API Management

Read more on Add cloud resources [Add cloud resources](add-cloud-resources.md) to learn about deployment of these resources.

## Deploy your project

There are several approaches where you can deploy your project to cloud, which is similar for each project type.

* Read provision section for Tab project: [Get started - Build your first Teams app with React](~/get-started/first-app-react.md?tabs=vscode#deploy-your-app-to-azure) 
* Read provision section for Tab project with SPFx: [Get started - Build your first Teams app with SPFx](~/get-started/first-app-spfx.md?tabs=cli#deploy-your-app-to-sharepoint)
* Read provision section for Bot and Messaging Extension project: [Get started - Build your first conversational bot](~/get-started/first-app-bot.md?tabs=vscode#deploy-your-app-to-azure)  
* Read provision section for Messaging Extension project: Get started: [Build your first messaging extension](~/get-started/first-message-extension.md?tabs=vscode#deploy-your-app-to-azure) 

> [!NOTE]
> If your project contains multiple workloads such as tab, bot, functions, APIM, you have the option to deploy at once or deploy each of the workload. 

## Advanced use case

(Placeholder) Any advanced use case or workarounds here customer should be aware of?

## See also

* [Add additional cloud resources](~\toolkit\add-cloud-resources.md)
* [Add additional Teams app capabilities](~\toolkit\add-capabilities.md)
* [Deploy project code with CI/CD pipelines](~\toolkit\build-pipelines.md)
