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

A new app created using Toolkit helps you to simplify the development process with the tools to provision, deploy cloud resources and publish the app to the Teams store. It lets you have the integrated identity, data from the Microsoft Graph, Azure and Microsoft 365 services with zero-configuration.
You can create a new Teams app by selecting any one of the following option.

* [**Create a new Teams app**](create-new-project.md#create-a-new-teams-app)
* [**View samples**](create-new-project.md#view-samples)

### Create a new Teams app
You can use the toolkit with Visual Studio Code, or CLI (command-line interface), called TeamsFx.

### Install the Teams Toolkit

1. Open Visual Studio Code and select the Extensions view (Ctrl+Shift+X / ⌘⇧-X or View > Extensions)
1. In the search box, enter Teams Toolkit
1. Select Install next to the Teams Toolkit.



    The Teams Toolkit icon appears in the Visual Studio Code sidebar after it's installed.
 

     Now the prerequisites are in place, let's begin!

1. Open Visual Studio Code
1. Select **Teams Toolkit** :::image type="icon" source="../assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.PNG" border="true"::: icon in the Visual Studio Code sidebar
1. Select **Creating a new Teams app...** tab
 :::image type="icon" source="../assets/images/teams-toolkit-v2/create123.png" border="false":::
1. Select **Create a new Teams app** from the dropdown options
:::image type="content" source="../assets/images/teams-toolkit-v2/create1234.png" alt-text="create-option":::
1. Select required capability

1. Select a programming language from the dropdown options **JavaScript** or **TypeScript**
2. enter an **Application name** and Press **Enter** (Application name must start with a letter and can only contain letters and digits.)

### View samples

You can create a new Teams app by selecting **View samples**. Select one of the multiple samples displayed with inbuilt functionality. For example, a to-do list with an Azure backend, or an integration with the Microsoft Graph Toolkit.<br>

1. Select **Teams Toolkit** from Microsoft Visual Studio Code, Teams Toolkit menu displays
2. Select **DEVELOPMENT** section in Treeview and then Select **View samples**
   :::image type="content" source="../assets/images/teams-toolkit-v2/sample1.png" alt-text="View samples":::
1. The sample gallery displays:

   :::image type="content" source="../assets/images/teams-toolkit-v2/sample2.png" alt-text="View samples":::

Explore and download samples and run your app locally or remotely to preview in Teams web client. Follow the instructions for each sample, or select **View on GitHub** to open the sample in the `TeamsFx Samples` repository and browse the source code.


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
