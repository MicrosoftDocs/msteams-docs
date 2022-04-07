---
title: Create a new Teams apps
author: zyxiaoyuer
description:  Create new Teams app using Teams Toolkit1
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/14/2022
---

# Create a new Teams app
Teams Toolkit's extension for Visual Studio Code makes it easy to create new projects for Teams, automatically set up apps in Teams Developer Portal, run and debug in Teams, configure cloud hosting, and use TeamsFx from your IDE.


## Prerequisite

[Install Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) version v3.0.0+.


### Create a new Teams app with the following steps

1. Open the latest version of Visual Studio Code.
1. Select the Teams Toolkit :::image type="icon" source="../assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.PNG" border="true"::: icon in the Visual Studio Code sidebar.
1. Select **Create a new Teams app**.
1. Select from the available capabilities tab, bot, messaging extension, or a tab using SharePoint Framework (SPFx). 
1. Select at least one option to start creating the Teams app.

### Create a new Teams app using View samples

You can create a new app by exploring **View samples** and select an existing sample. The selected sample may already have some functionality. For example a to-do list with an Azure backend, or an integration with the Microsoft Graph Toolkit.

 1. Open **Teams Toolkit** from Microsoft Visual Studio Code.
 1. Select **DEVELOPMENT** section in Treeview.
 1. Select **View samples**. The sample gallery appears as shown in the following image:

    :::image type="content" source="../assets/images/teams-toolkit-v2/view-samples.png" alt-text="View samples":::

You can explore and download samples and either run your app locally or remotely to preview in Teams web client. Follow the instructions for each sample, or select **View on GitHub** to open the sample within the `TeamsFx Samples repository` and browse the source code.

For more information, see [Create a new Teams Tab app (React)](/microsoftteams/platform/sbs-gs-javascript?tabs=vscode%2Cvsc%2Cviscode%2Cvcode&tutorial-step=2).

## Step-by-step guides using Teams Toolkit


* [Build a Teams app with Blazor](../sbs-gs-blazorapp.yml)
* [Build a Teams app with JavaScript using React](../sbs-gs-javascript.yml)
* [Build a Teams app with SPFx](../sbs-gs-spfx.yml)
* [Build a Teams app with C# or .NET](../sbs-gs-csharp.yml)<br>


## See also

* [Provision cloud resources](provision.md)
* [Deploy Teams app to the cloud](deploy.md)
* [Publish your Teams app](TeamsFx-collaboration.md)
* [Manage multiple environments](TeamsFx-multi-env.md)
* [Collaborate with other developers on Teams project](TeamsFx-collaboration.md)