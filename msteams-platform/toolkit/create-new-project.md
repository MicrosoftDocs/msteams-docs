---
title: Create a new Teams project using Teams Toolkit
author: zyxiaoyuer
description:  Create new Teams app using Teams Toolkit
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/11/2022
---

# Create a new Teams app using Teams Toolkit

To create a new Teams app using Teams Toolkit, you can select from the following options:
* Create a new Teams app
* View samples

## Create a new Teams app using Teams app

1. Open Visual Studio Code.
1. Select the Teams Toolkit :::image type="icon" source="../assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.PNG" border="true"::: icon in the Visual Studio Code sidebar.
1. Select **Create a new Teams app**.
1. Select from the capabilities available - tab, bot, messaging extension, or a tab using SharePoint Framework (SPFx). 
1. Select at least one option to start creating and then add more capabilities as needed, as per the requirements of the Teams app.

## Create a new Teams app using view samples

You can create a new app by exploring **View samples** and selecting an existing sample. The selected sample may already have some functionality, for example a to-do list with an Azure backend, or an integration with the Microsoft Graph Toolkit.

 1. Open **Teams Toolkit** from Microsoft Visual Studio Code.
 1. Select **DEVELOPMENT** section in Tree View.
 1. Select **View samples**. The sample gallery appears as shown in the following image:
 
:::image type="content" source="../assets/images/teams-toolkit-v2/manual/view-samples.png" alt-text="samples" border="true":::

You can explore and download samples and either run apps locally or remotely to preview in Teams web client. Follow the instructions for each sample, or select **View on GitHub** to open the sample within the `TeamsFx`- Samples repository and browse the source code.

The following guides help you to a create Teams app using each of the capabilities:

- [Create a new Teams Tab app (React)](/microsoftteams/platform/sbs-gs-javascript?tabs=vscode%2Cvsc%2Cviscode%2Cvcode&tutorial-step=2)
- [Create a new Teams Bot app](/microsoftteams/platform/sbs-gs-spfx?tabs=vscode%2Cviscode&branch)
- [Create a new Message Extension app](/microsoftteams/platform/sbs-gs-javascript?tabs=vscode%2Cvsc%2Cviscode%2Cvcode&tutorial-step=6&branch)
- [Create a new Teams Tab app (SharePoint Framework)](/microsoftteams/platform/sbs-gs-spfx?tabs=vscode%2Cviscode&branch) 

## See also

* [Provision cloud resources](provision.md)
* [Deploy Teams app to the cloud](deploy.md)
* [Publish your Teams app](TeamsFx-collaboration.md)
* [Manage multiple environments](TeamsFx-multi-env.md)
* [Collaborate with other developers on Teams project](TeamsFx-collaboration.md)