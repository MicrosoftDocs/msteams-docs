---
title: Deploy to the cloud
author: MuyangAmigo
description:  Deploy to the cloud
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# Deploy to the cloud

Teams Toolkit helps you to deploy or upload the frontend and backend code in your application to your provisioned cloud resources in Azure.

* The Tab (frontend applications) are deployed to an Azure storage and configured for static web hosting or a SharePoint site.
* The backend APIs are deployed to Azure Functions.
* The Bot/Messaging Extension is deployed to Azure App Service.

## Prerequisite

* [Install Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) version v3.0.0+.
* You should already have a Teams app project opened in VS code.

> [!NOTE]
> * Before deploy project code to cloud, you must perform the [Provision cloud resources](provision.md) steps first.


## Deploy Teams apps using Teams Toolkit

In Get Started tutorials, there are step-by-step guides of how to deploy using Teams Toolkit, following the guidance below to deploy your Teams app.

* [Deploy your app to Azure](/microsoftteams/platform/sbs-gs-javascript?tabs=vscode%2Cvsc%2Cviscode%2Cvcode&tutorial-step=8&branch)
* [Deploy your app to SharePoint](/microsoftteams/platform/sbs-gs-spfx?tabs=vscode%2Cviscode&tutorial-step=4&branch)

## Source Code Location, Build Artifacts and Target Resources for deployment

| Teams App Workloads| Source Code | Build Artifacts| Target Resources |
|-------------|----------|---------------|---------------|
|Tabs with React </br> The frontend workload| `yourProjectFolder/tabs`| `tabs/build` |Azure Storage |
|Tabs with SharePoint </br> The frontend workload | `yourProjectFolder/SPFx`| `SPFx/sharepoint/solution` |SharePoint app catalog |
|APIs on Azure Functions </br> The backend workload | `yourProjectFolder/api`| N/A |Azure Functions |
|Bots and messaging extensions </br> The backend workload | `yourProjectFolder/bot` | N/A | Azure App Service |

> [!NOTE]
> When you include Azure API management resource in your project and trigger deploy, your APIs in Azure Functions will be published to Azure API Management Service.

## See also

> [!div class="nextstepaction"]
> [Add more cloud resources](add-resource.md)

> [!div class="nextstepaction"]
> [Add more Teams app capabilities](add-capability.md)

> [!div class="nextstepaction"]
> [Deploy project code with CI/CD pipelines](use-CICD-template.md)

> [!div class="nextstepaction"]
> [Manage multiple environments](TeamsFx-multi-env.md)

> [!div class="nextstepaction"]
> [Collaborate with other developers on Teams project](TeamsFx-collaboration.md)
