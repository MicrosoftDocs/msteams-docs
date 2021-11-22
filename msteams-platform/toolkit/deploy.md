---
title: Deploy to the cloud
author: junjie
description:  Deploy to the cloud
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# Deploy Your Teams Aoo to the Cloud Using Teams Toolkit

Teams Toolkit helps you to deploy or upload the backend and frontend code in your application to your provisioned cloud resources in Azure.

* The backend Azure functions if configured, can use different kinds of Azure services, including Azure App service and Azure storage.
* The frontend applications are deployed to an Azure storage account and configured for static web hosting or a SharePoint site.

## Prerequisite

* [Install Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) version v3.0.0+.

* Before deploy project code to cloud, you must perform the [Provision cloud resources](provision.md) steps first.

## Deploy Teams apps using Teams Toolkit

In Get Start tutorials, there are step-by-step guides of how to do deploy using Teams Toolkit, following the guidance below to deploy your Teams app.

* [Deploy your app to Azure](https://docs.microsoft.com/microsoftteams/platform/sbs-gs-javascript?tabs=vscode%2Cvsc%2Cviscode%2Cvcode&tutorial-step=8).
* [Deploy your app to SharePoint](https://docs.microsoft.com/microsoftteams/platform/sbs-gs-spfx?tabs=vscode%2Cviscode&tutorial-step=4).

## Deployment by project type

| Project Type| Resources| Code Location|
|-------------|----------|---------------|
|Tabs with React </br> The frontend workload|Azure Storage account|`yourProjectFolder/tabs`|
|Tabs with SharePoint </br> The frontend workload |SharePoint app catalog|`yourProjectFolder/SPFx`|
|Bots and messaging extensions </br> The backend workload | Azure web app|`yourProjectFolder/bot` |

You can optionally include Azure resources that fit your application needs. The corresponding project code is deployed to the resources as follows:

* Azure functions
* Azure API management

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
