---
title: Deploy to the cloud
description:  Deploy app to the cloud, Azure, or SharePoint
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/31/2022

# Use Teams Toolkit to deploy to cloud

Teams Toolkit helps you to deploy or upload the frontend and backend code in your application to your provisioned cloud resources in Azure.

* The tab, such as frontend applications are deployed to Azure storage and configured for static web hosting or a sharepoint site.
* The backend APIs are deployed to Azure functions.
* The bot or messaging extension is deployed to Azure app service.

# [Visual Studio Code](#tab/VisualStudioCode)

#### Prerequisite

* [Install Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) version v3.0.0+.

 * Ensure you have Teams app project opened in VS code.
 * Before you deploy project code to cloud, [provision the cloud resources](provision.md).

## Deploy Teams apps using Teams Toolkit

The get started guides help you to deploy using Teams Toolkit. You can use the following to deploy your Teams app:

* [Deploy your app to Azure](/microsoftteams/platform/sbs-gs-javascript?tabs=vscode%2Cvsc%2Cviscode%2Cvcode&tutorial-step=8&branch)
* [Deploy your app to SharePoint](/microsoftteams/platform/sbs-gs-spfx?tabs=vscode%2Cviscode&tutorial-step=4&branch)

### Details on Teams app workload

|Teams app workload | Source code | Build artifact| Target resource |
|------------|----------|---------------|---------------|
|Tabs with React </br> The frontend workload| `yourProjectFolder/tabs`| `tabs/build` |Azure storage |
|Tabs with SharePoint </br> The frontend workload | `yourProjectFolder/SPFx`| `SPFx/sharepoint/solution` |SharePoint app catalog |
|APIs on Azure functions </br> The backend workload | `yourProjectFolder/api`| Not applicable |Azure functions |
|Bots and messaging extensions </br> The backend workload | `yourProjectFolder/bot` | Not applicable | Azure app service |

# [Visual Studio](#tab/VisualStudio)

#### Provision you Teams app in the cloud

To deploy your project to these new resources use the following steps:

1. Select the **Project > Teams Toolkit > Deploy in the Cloud** menu.

## Preview your app running from cloud resources

You can run your app in a browser using the remote resources to verify that everything works. It's not possible to debug during in this scenario yet.

1. Select the **Project > Teams Toolkit > Preview Teams app** menu.

Your app will open in a browser and use the resources created by the Provision and Deploy steps.

# [TeamsFx Command Line Interface](#tab/TeamsFxCommandlineinterface)

Provision is performed with single command in for TeamsFx CLI as follows:

[Provision Azure-based app](/microsoftteams/platform/sbs-gs-javascript?tabs=vscode%2Cvsc%2Cviscode%2Cvcode&tutorial-step=8)

## See also

* [Deploy Teams app to the cloud](deploy.md)
* [Publish your Teams app](TeamsFx-collaboration.md)
* [Manage multiple environments](TeamsFx-multi-env.md)
* [Collaborate with other developers on Teams project](TeamsFx-collaboration.md)