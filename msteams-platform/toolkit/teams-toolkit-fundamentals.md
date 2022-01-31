---
title: Teams Toolkit fundamentals
author: zyxiaoyuer
description:  Describes fundamentals of Teams Toolkit
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# Teams Toolkit

> [!NOTE]
> Currently, this feature is available in **public developer preview** only.

The Teams Toolkit for Visual Studio Code helps you to create and deploy Teams apps with integrated identity, access to cloud storage, data from Microsoft Graph, and other services in Azure and Microsoft 365 with a zero-configuration approach. For Teams app development from the command line you can also use the Teams Toolkit through the `TeamsFx` [CLI tool](https://github.com/OfficeDev/TeamsFx/blob/dev/docs/cli/user-manual.md).

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

## User journey of Teams Toolkit

Teams Toolkit provides features of Teams app development to debug, deploy, and publish. It automates manual work and provides great integration with Teams and Azure resources. The following image shows the Teams Toolkit user journey:

![Teams Toolkit User Journey](./images/teams-toolkit-user-journey.png)

## Take a tour of Teams Toolkit for Visual Studio Code

After Toolkit installation, you will see the Teams Toolkit UI as shown in following image:

:::image type="content" source="../assets/images/teams-toolkit-v2/manual/teams toolkit.png" alt-text="mini functions":::

You can select **Quick Start** to explore the Teams Toolkit, or select **Create a new Teams App** to create one Teams project. If you have a Teams project created by Teams Toolkit v2.+ opened in VS Code, you will see Teams Toolkit UI with all functionalities as shown in the following image:

:::image type="content" source="../assets/images/teams-toolkit-v2/manual/toolkit functions.png" alt-text="functions":::

Let's take a tour of the topics covered in this document:

## Accounts

To develop a Teams app you need a Microsoft 365 account with a valid subscription. If you want to host your backend resources on Azure, an Azure account is also needed. Teams Toolkit supports an integrated sign-in experience to provision and deploy Azure resources. If needed, you can [create a free Azure account](https://azure.microsoft.com/free/) before you start.

## Environment

Teams Toolkit helps you to create and manage multiple environments, provision resources, and deploy artifacts to the target environment for the Teams app.

### TeamsFx Collaboration

It allows developers and project owners to invite other collaborators to the TeamsFx project to debug, provision, and deploy the project.

## Development

Teams Toolkit helps you to create and customize your Teams app project, and simplifies Teams app development.

### Create a new Teams app

It helps you to get started with Teams app development by creating a new Teams project using Teams Toolkit either by using **Create new project** or **Create from samples**.

### Add capabilities

It helps to add other required Teams capabilities to Teams apps during the development process.

### Add cloud resources

It helps you to optionally add cloud resources according to your development needs.

### Edit manifest file 

It helps you to configure the Teams apps that will be integrated with the Teams client.

## Deployment

During or after development ensure to provision, deploy, and publish your Teams app to make it accessible to users.

### Provision in the cloud

It integrates with Azure resource manager that enables you to provision Azure resources, which your application needs for code approach.

### Deploy to the cloud

It helps you to deploy source code to Azure.

### Publish to Teams

After creating the app, you can distribute your app to different scopes such as individual, team, organization, or anyone. Publish to Teams helps you to publish your developed app.

### CI/CD guide

It helps to automate your development workflow while building Teams applications. The CI/CD guide provides tools and templates for you to get started  setting up CI or CD pipelines.

#### TeamsFx CLI

TeamsFx CLI is a text-based command line interface that accelerates Teams application development and also enables CI/CD scenarios where you can include CLI commands in scripts for automation.

#### TeamsFx SDK

It helps you to reduce the complexity of implementing identity and access to cloud resources with single-line statements and zero configuration.

## Help and Feedback

In this section, you can find the documentation and resources you need. You can select **Report issues on GitHub** in the Teams Toolkit to get **Quick support** from product expert. Browse the issue before you create a new one, or visit [StackOverflow tag `teams-toolkit`](https://stackoverflow.com/questions/tagged/teams-toolkit) to submit feedback.

## See also

* [Create new project using Teams Toolkit](create-new-project.md)
* [Prepare accounts to build Teams apps](accounts.md)
* [Publish Teams apps using Teams Toolkit](publish.md)
* [Use Teams Toolkit to provision cloud resources](provision.md)
* [Deploy to the cloud](deploy.md)
