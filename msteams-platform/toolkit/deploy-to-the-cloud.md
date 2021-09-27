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
Before you can deploy your project code to cloud, you will need to complete the resource provision step.

## What will be deployed

Teams Toolkit will deploy or upload the backend and frontend code in your application to the corresponding cloud resources in Azure that provisioned in the previous step.
•	The backend (Azure Functions if configured) may use a variety of Azure services, including Azure App Service and Azure Storage.
•	The frontend application will be deployed to an Azure Storage account configured for static web hosting or a SharePoint site.

## Deployment by project type

| Project Type|	Resources|	Code Location|
|-------------|----------|---------------|
|Tab With React </br> The frontend workload	|Azure Storage Account|	`yourProjectFolder/tabs`|
|Tab With SharePoint </br> The frontend workload |SharePoint App Catalog|`yourProjectFolder/SPFx`|
|Bot and Messaging Extension </br> The backend workload | Azure Web App	`yourProjectFolder/bot` |

You are optionally to include other Azure resources that fits your application needs and the corresponding project code will be deployed to that resources, this may include:
* Azure Functions
* Azure API Management

Read more on Add cloud resources (link to add Cloud resources) to learn about deployment of these resources.

## How to perform deployment

There are several approaches where you can deploy your project to cloud and they are similar for each project type.   

* Read provision section for Tab project: [Get started - Build your first Teams app with React](https://docs.microsoft.com/en-us/microsoftteams/platform/get-started/first-app-react?tabs=vscode#deploy-your-app-to-azure) 
* Read provision section for Tab project with SPFx: [Get started - Build your first Teams app with SPFx](https://docs.microsoft.com/en-us/microsoftteams/platform/get-started/first-app-spfx?tabs=cli#deploy-your-app-to-sharepoint)
* Read provision section for Bot and Messaging Extension project: [Get started - Build your first conversational bot](https://docs.microsoft.com/en-us/microsoftteams/platform/get-started/first-app-bot?tabs=vscode#deploy-your-app-to-azure)  
* Read provision section for Messaging Extension project: Get started: [Build your first messaging extension](https://docs.microsoft.com/en-us/microsoftteams/platform/get-started/first-message-extension?tabs=vscode#deploy-your-app-to-azure) 

> [!NOTE]
> If your project contains multiple workloads such as tab, bot, functions, APIM, you have the option to deploy at once or deploy each of the workload. 

## Advanced use case

Any advanced use case or workarounds here customer should be aware of?

## What’s next
•	Add additional cloud resources.
•	Add additional Teams app capabilities.
•	Deploy project code with CI/CD pipelines.

