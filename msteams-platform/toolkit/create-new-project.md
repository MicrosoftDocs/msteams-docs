---
title: Create a new Teams app using Teams Toolkit
author: zyxiaoyuer
description:  Create new Teams app using Teams Toolkit
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/14/2022
---

# Create a new Teams app using Teams Toolkit

Teams Toolkit is an extension of Visual Studio Code, you can use Teams Toolkit to create an app.
Teams Toolkit provides enhanced experience for creating new apps. The advantages of using Teams toolkit are as follows:

*	Integrated identity
*	Access data from Microsoft Graph
*	Access data from Microsoft 365 services
*	Zero configuration



### Prerequisites

Install the [latest version of Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension).<br>


To create a new Teams app using Teams Toolkit, you can select from one of the following options:

* [Create a new Teams app](create-new-project.md#create-a-new-teams-app)
* [View samples](create-new-project.md#create-a-new-teams-app-using-view-samples)
 ### Create a new Teams app


1. Select **Teams Toolkit** :::image type="icon" source="../assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.PNG" border="true"::: icon in the Visual Studio Code sidebar.
1. Select **Creating a new Teams app...**.

   :::image type="icon" source="../assets/images/teams-toolkit-v2/create123.PNG" border="true":::
1. Select **Create a new Teams app** from the dropdown options.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create1234.png" alt-text="create" border="true":::
1. Select required Capability.

   :::image type="content" source="../assets/images/teams-toolkit-v2/capability.png" alt-text="create1" border="true":::

1. Select a programming language from the dropdown options.

   :::image type="content" source="../assets/images/teams-toolkit-v2/program.png" alt-text="create2" border="true":::

1. Enter an **Application name** and Press **Enter**.

> [!NOTE]
>
> Application name must start with a letter and can only contain letters and digits.

### View samples

You can create a new Teams app by selecting an existing sample. Selecting an existing sample provides you with an inbuilt functionality. For example, a **Todo List with backend on Azure**, or **Hello World Bot with SSO**.<br>

1. Open **Teams Toolkit** from Microsoft Visual Studio Code.
2. Select **DEVELOPMENT** section in Treeview.
1. Select **View samples**. The sample gallery appears as shown in the following image:
1. Select **Teams Toolkit** :::image type="icon" source="../assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.PNG" border="true"::: icon in the Visual Studio Code sidebar.
1. Select **DEVELOPMENT** section in Treeview and then Select **View samples**.
   :::image type="content" source="../assets/images/teams-toolkit-v2/sample1.png" alt-text="View samples":::

1. The **Samples** gallery displays.

   :::image type="content" source="../assets/images/teams-toolkit-v2/samples2.png" alt-text="View samples2":::
   

You can explore and download samples. You can also  run your app locally or remotely to preview in Teams web client. Follow the instructions for each sample, or select **View on GitHub** to open the sample within the `TeamsFx Samples` repository and browse the source code.


## Step-by-step guides to create an app

* [Build a Teams app with Blazor](../sbs-gs-blazorupdate.yml)
* [Build a Teams app with JavaScript](../sbs-gs-javascript.yml)
* [Build a Teams app with SPFx](../sbs-gs-spfx.yml)


## See also

* [Debug background process](debug-background-process.md)
* [Debug your Teams app locally](debug-local.md)
* [Provision cloud resources](provision.md)
* [Deploy Teams app to the cloud](deploy.md)
* [Publish your Teams app](../concepts/deploy-and-publish/appsource/publish.md)
* [Manage multiple environments](TeamsFx-multi-env.md)
* [Collaborate with other developers on Teams project](TeamsFx-collaboration.md)
