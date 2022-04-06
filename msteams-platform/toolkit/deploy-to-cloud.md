---
title: Deploy app to cloud
description:  Deploy app to the cloud
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/31/2022
---

# Use Teams Toolkit to deploy app to the cloud

Teams Toolkit helps you to deploy or upload the frontend and backend code in your application to your provisioned cloud resources in Azure.

* The tab, such as frontend applications are deployed to Azure storage and configured for static web hosting or a sharepoint site.
* The backend APIs are deployed to Azure functions.
* The bot or messaging extension is deployed to Azure app service.

# [Visual Studio Code](#tab/VisualStudioCode)

### Deploy Teams apps using Teams Toolkit

The get started guides help you to deploy using Teams Toolkit. You can use the following to deploy your Teams app:


* [Deploy your app to Azure](/microsoftteams/platform/sbs-gs-javascript?tabs=vscode%2Cvsc%2Cviscode%2Cvcode&tutorial-step=8&branch)
* [Deploy your app to SharePoint](/microsoftteams/platform/sbs-gs-spfx?tabs=vscode%2Cviscode&tutorial-step=4&branch)

## Deploy to Azure

Deploy your project to Azure by following these steps:

| From Visual Studio Code | From TeamsFx CLI                                                 |
| :---------------------------------------------------| :--------------------------------------------------- 
| <ul><li>Open Teams Toolkit, and sign into Azure by clicking the **Sign in to Azure** under the **ACCOUNTS** section from sidebar.</li> <li>After you signed in, select a subscription under your account.</li><li>Open the Teams Toolkit and click **Provision in the cloud** from **DEPLOYMENT** section or open the command palette and select: `Teams: Provision in the cloud`.</li><li>Open the Teams Toolkit and click **Deploy to the cloud** or open the command palette and select: `Teams: Deploy to the cloud`.</li></ul> | <ul> <li>Run command `teamsfx account login azure`.</li> <li>Run command `teamsfx account set --subscription <your-subscription-id>`.</li> <li> Run command `teamsfx provision`.</li> <li>Run command: `teamsfx deploy`. </li></ul> |

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

* [Publish your Teams app](TeamsFx-collaboration.md)
* [Manage multiple environments](TeamsFx-multi-env.md)
* [Collaborate on Teams project](TeamsFx-collaboration.md)