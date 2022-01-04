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

* The Tab, such as frontend applications are deployed to Azure storage and configured for static web hosting or a SharePoint site.
* The backend APIs are deployed to Azure Functions.
* The Bot or Messaging Extension is deployed to Azure App Service.

## Prerequisite

* [Install Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) version v3.0.0+.

> [!TIP]
> You should already have a Teams app project opened in VS code.

> [!NOTE]
> Before you deploy project code to cloud, perform the [provision cloud resources](provision.md) steps first.

## Deploy Teams apps using Teams Toolkit

In Get started tutorials, the step-by-step guides helps you to deploy using Teams Toolkit. You can use the following to deploy your Teams app:

* [Deploy your app to Azure](/microsoftteams/platform/sbs-gs-javascript?tabs=vscode%2Cvsc%2Cviscode%2Cvcode&tutorial-step=8&branch)
* [Deploy your app to SharePoint](/microsoftteams/platform/sbs-gs-spfx?tabs=vscode%2Cviscode&tutorial-step=4&branch)

## Details on Teams app workloads

| Teams App Workloads| Source Code | Build Artifacts| Target Resources |
|-------------|----------|---------------|---------------|
|Tabs with React </br> The frontend workload| `yourProjectFolder/tabs`| `tabs/build` |Azure Storage |
|Tabs with SharePoint </br> The frontend workload | `yourProjectFolder/SPFx`| `SPFx/sharepoint/solution` |SharePoint app catalog |
|APIs on Azure Functions </br> The backend workload | `yourProjectFolder/api`| N/A |Azure Functions |
|Bots and messaging extensions </br> The backend workload | `yourProjectFolder/bot` | N/A | Azure App Service |

> [!NOTE]
> When you include Azure API management resource in your project and trigger deploy. You can publish your APIs in Azure Functions to Azure API Management Service.

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
