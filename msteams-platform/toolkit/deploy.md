---
title: Deploy to the cloud
author: MuyangAmigo
description:  In this module, learn how to deploy app to the cloud, Azure, or SharePoint and deploy Teams apps using Teams Toolkit
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# Deploy Teams app to the cloud

Teams Toolkit helps you to deploy or upload the frontend and backend code in your application to your provisioned cloud resources in Azure.

* The tab, such as frontend applications are deployed to Azure storage and configured for static web hosting or a sharepoint site.
* The backend APIs are deployed to Azure functions.
* The bot or message extension is deployed to Azure app service.

## Prerequisite

* [Install latest version of Teams Toolkit](install-Teams-Toolkit.md)

  > [!NOTE]
  >
  > * Ensure you have Teams app project opened in VS code.
  > * Before you deploy project code to cloud, [provision the cloud resources](provision.md).

## Deploy Teams apps using Teams Toolkit

The get started guides help you to deploy using Teams Toolkit. You can use the following to deploy your Teams app:

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
> When you include Azure API management resource in your project and trigger deploy. You can publish your APIs in Azure functions to Azure API management service.

## See also
