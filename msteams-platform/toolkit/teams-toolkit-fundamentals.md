---
title: Teams Toolkit Overview
author: zyxiaoyuer
description:  Overview of Teams Toolkit, Installation of Teams Toolkit, and Tour of Toolkit features
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# Teams Toolkit Overview

> [!NOTE]
> Currently, this feature is available in **public developer preview** only.

Teams Toolkit for Visual Studio Code helps you to create and deploy Teams apps with integrated identity, access to cloud storage, data from Microsoft Graph, and other services in Azure and Microsoft 365 with zero-configuration approach. For Teams app development, similar to Teams Toolkit for Visual Studio, you can use [CLI tool](https://github.com/OfficeDev/TeamsFx/blob/dev/docs/cli/user-manual.md), which consists of Toolkit `teamsfx`.

## User journey of Teams Toolkit

Teams Toolkit provides features of Teams app development to debug, deploy, and publish. It automates manual work and provides great integration of Teams and Azure resources. The following image shows Teams Toolkit user journey:

![Teams Toolkit User Journey](./images/teams-toolkit-user-journey.png)

## Install Teams Toolkit for Visual Studio Code

1. Open **Visual Studio Code.**
1. Select the Extensions view (**Ctrl+Shift+X** / **⌘⇧-X** or **View > Extensions**):

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/install toolkit-1.png" alt-text="install":::

1. Enter **Teams Toolkit** in the search box:

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/install toolkit-2.png" alt-text="Toolkit":::

1. Select **Install**:
  
   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/install.png" alt-text="install toolkit":::

> [!TIP]
> You can install Teams Toolkit from [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension).

## Take a tour of Teams Toolkit

After Toolkit installation, you will see the Teams Toolkit UI as shown in following image:

:::image type="content" source="../assets/images/teams-toolkit-v2/manual/teams toolkit.png" alt-text="mini functions":::

You can select **Quick Start** to explore the Teams Toolkit, or select **Create a new Teams App** to create one Teams project. If you have a Teams project created by Teams Toolkit v2.+ opened in VS Code, you will see Teams Toolkit UI with all functionalities as shown in the following image:

:::image type="content" source="../assets/images/teams-toolkit-v2/manual/toolkit functions.png" alt-text="functions":::

Let's explore Teams Toolkit Features:

### Accounts

To build a Teams app, you need:

- Microsoft 365 account: At least, one Microsoft 365 account with a valid subscription.
- Azure account: If you want to host your backend resources on Azure, an Azure account is also needed.

Teams Toolkit support integrated experience to sign in, provision and deployment for Azure resources. You can [create a free Azure account](https://azure.microsoft.com/free/) before you start.

### Environment

Teams Toolkit helps you to create and manage multiple environments, provision, and deploy artifacts to the target environment for Teams App.

Teams Toolkit provides two default environments:

- **local**: <!--Add content-->
- **dev**: <!--Add content-->

## Development

Teams Toolkit helps you to create and customize your Teams app project that makes the Teams app development work simpler.

### Create a new Teams app

It helps you to start with Teams app development by creating new Teams project using Teams Toolkit either by using **Create new project** or **Create from samples**.

### View samples

<!-- Add content-->

### Add capabilities

It helps to add other required Teams capabilities to Teams app during development process.

### Add cloud resources

It helps you to optionally add cloud resources that fits your development needs.

### Edit manifest file

It helps you to edit the Teams app integration with Teams client.

## Deployment

During or after the development, ensure to provision, deploy, and publish Teams app before it is accessible to users.

### Provision in the cloud

It integrates with Azure resource manager that enables you to provision Azure resources, which your application needs for code approach.

### Zip Teams metadata package

<!-- Add content-->

### Deploy to the cloud

 It helps you to deploy the source code to Azure.

### Publish to Teams

After creating the app, you can distribute your app to different scope, such as individual, team, organization, or anyone. Publish to Teams helps you to publish your developed app.

### Developer Portal for Teams

<!-- Add content-->

### CI/CD guide

It helps to automate your development workflow while building Teams application. CI/CD guide provides tools and templates for you to get started while setting up CI or CD pipelines.

## Help and Feedback

In this section, you can find the documentation and resources you need. You can select **Report issues on GitHub** in the Teams Toolkit to get **Quick support** from product expert. Browse the issue before you create a new one, or visit [StackOverflow tag `teams-toolkit`](https://stackoverflow.com/questions/tagged/teams-toolkit) to submit feedback.

## Teams Fx

### TeamsFx Collaboration

It allows developers and project owner to invite other collaborators to the TeamsFx project to debug, provision, and deploy the same TeamsFx project.

### TeamsFx CLI

TeamsFx CLI is a text-based command line interface that accelerates Teams application development and also enables CI/CD scenario where you can integrate CLI in scripts for automation.

### TeamsFx SDK

It helps you to reduce tasks of implementing identity and access to cloud resources to single-line statements with zero configuration.


## See also

* [Create new project use Teams Toolkit](create-new-project.md)
* [Prepare accounts to build Teams apps](accounts.md)
* [Publish Teams apps using Teams Toolkit](publish.md)
* [Use Teams Toolkit to provision cloud resources](provision.md)
* [Deploy to the cloud](deploy.md)