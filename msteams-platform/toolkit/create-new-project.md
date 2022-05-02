---
title: Create a new Teams app using Teams Toolkit
author: zyxiaoyuer
description:  Create new Teams app using Teams Toolkit
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/14/2022
---

# Create a new app

You can create a new Teams app using any one of the following option.

* [**Create a new Teams app**](create-new-project.md#create-a-new-teams-app)
* [**View samples**](create-new-project.md#view-samples)

Creating a new Teams app from the Toolkit has the following advantages:

* Integrated identity
* Access to cloud storage
* Access to data from the Microsoft Graph
* Access to Azure and Microsoft 365 services with zero-configuration approach

## Prerequisite

Install the [latest version of Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension).

### Create a new Teams app

1. Open Visual Studio Code
1. Select **Teams Toolkit** :::image type="icon" source="../assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.PNG" border="true"::: icon in the Visual Studio Code sidebar
1. Select **Create a new Teams app** tab
1. 
1. Select **Create a new Teams app** from the dropdown options
1. Select required capability

1. Select **OK**
1. Select an option from the dropdown options **JavaScript** or **TypeScript**
2. Type an **Application name** and Press **Enter** (Application name must start with a letter and can only contain letters and digits.)

### View samples

You can create a new Teams app by selecting **View samples**. You can multiple samples displayed The selected sample may already have some functionality, for example a to-do list with an Azure backend, or an integration with the Microsoft Graph Toolkit.<br>

1. Select **Teams Toolkit** from Microsoft Visual Studio Code
2. Select **DEVELOPMENT** section in Treeview
3. Select **View samples**. The sample gallery appears as shown in the following image:

   :::image type="content" source="../assets/images/teams-toolkit-v2/view-samples.png" alt-text="View samples":::

You can explore and download samples and run your app locally or remotely to preview in Teams web client. Follow the instructions for each sample, or select **View on GitHub** to open the sample in the `TeamsFx Samples repository` and browse the source code.

For more information, see [Create a new Teams Tab app (React)](/microsoftteams/platform/sbs-gs-javascript?tabs=vscode%2Cvsc%2Cviscode%2Cvcode&tutorial-step=2).

## Step-by-step guides to create an app

* [Build a Teams app with Blazor](../sbs-gs-blazorupdate.yml)
* [Build a Teams app with JavaScript using React](../sbs-gs-javascript.yml)
* [Build a Teams app with SPFx](../sbs-gs-spfx.yml)
* [Build a Teams app with C# or .NET](../sbs-gs-csharp.yml)

## See also

* [Debug background process](debug-background-process.md)
* [Debug your Teams app locally](debug-local.md)
* [Provision cloud resources](provision.md)
* [Deploy Teams app to the cloud](deploy.md)
* [Publish your Teams app](TeamsFx-collaboration.md)
* [Manage multiple environments](TeamsFx-multi-env.md)
* [Collaborate with other developers on Teams project](TeamsFx-collaboration.md)
