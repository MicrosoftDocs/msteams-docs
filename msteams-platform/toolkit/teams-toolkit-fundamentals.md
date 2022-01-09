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

Teams Toolkit for Visual Studio Code helps you to create and deploy Teams apps with integrated identity, access to cloud storage, data from Microsoft Graph, and other services in Azure and Microsoft 365 with zero-configuration approach. For Teams app development, similar to Teams Toolkit for Visual Studio, you can use [CLI tool](https://github.com/OfficeDev/TeamsFx/blob/dev/docs/cli/user-manual.md), which consists of Toolkit `teamsfx`.

## Install Teams Toolkit for Visual Studio Code

1. Open **Visual Studio Code.**
1. Select the Extensions view (**Ctrl+Shift+X** / **⌘⇧-X** or **View > Extensions**):

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/install toolkit-1.png" alt-text="install":::

1. Enter **Teams Toolkit** in the search box:

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/install toolkit-2.png" alt-text="Toolkit":::

1. Select **install**:
  
   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/install.png" alt-text="install toolkit":::

> [!TIP]
> You can install Teams Toolkit from [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension).

## Teams apps capabilities

[Microsoft Teams app capabilities](../concepts/capabilities-overview.md) are Teams extensibility points. Teams Toolkit for Visual Studio Code supports you to work on project with the following Teams app capabilities:

* [Tabs](../tabs/what-are-tabs.md#build-tabs-for-microsoft-teams)
* [Bots](../bots/what-are-bots.md#bots-in-microsoft-teams)
* [Messaging extensions](../messaging-extensions/what-are-messaging-extensions.md#messaging-extensions) 

You can select required capabilities to create Teams app. Your Teams project can contain either one of the capabilities or all three capabilities from above. You can select any of the required capability when you create the Teams Project:

:::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/select capabilities.png" alt-text="select":::

You can add more capabilities if required for Teams app development by selecting **Add capabilities**:

:::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/add capabilities.png" alt-text="add":::

## User journey of Teams Toolkit

Teams Toolkit provides features of Teams app development to make it easy to debug, deploy, and publish. It automates manual work and provides great integration of Teams and Azure resources. The following image shows Teams Toolkit user journey:

![Teams Toolkit User Journey](./images/teams-toolkit-user-journey.png)

## Take a tour of Teams Toolkit for Visual Studio Code

After Toolkit installation, you will see the Teams Toolkit UI with limited functionalities as shown in following image:

:::image type="content" source="../assets/images/teams-toolkit-v2/manual/teams toolkit.png" alt-text="mini functions":::

You can select **Quick Start** to explore the Teams Toolkit, or select **Create a new Teams App** to create one Teams project. If you have a Teams Project created by Teams Toolkit v2.+ opened in VS Code, you will see Teams Toolkit UI with all functionalities as shown in the following image:

:::image type="content" source="../assets/images/teams-toolkit-v2/manual/toolkit functions.png" alt-text="functions":::

Let's take a tour of the topics covered in this document:

## Accounts

To develop a Teams app, you need at least one Microsoft 365 account with a valid subscription. If you want to host your backend resources on Azure, an Azure account is also needed. Teams Toolkit support integrated experience to sign in, provision and deployment for Azure resources. You can [create a free Azure account](https://azure.microsoft.com/free/) before you start.

## Environment

Teams Toolkit provides a simple way for you to create and manage multiple environments, provision, and deploy artifacts to the target environment for Teams App.

### TeamsFx Collaboration

## Development

Teams Toolkit helps you to create and customize your Teams app project that makes the Teams app development work simpler.

### Create a new Teams app

It helps you to start with Teams app development by creating new Teams project using Teams Toolkit either by using **Create new project** or **Create from samples**.

### Add capabilities

It helps to add other required Teams capabilities to Teams app during development process.

### Add cloud resources

It helps you to optionally add cloud resources that fits your development needs.

### Edit manifest file 

It let's you to edit how the Teams app integrates with Teams client.

## Deployment

During or after the development, ensure to do provision, deployment, and publish Teams app before it is accessible to users.

### Provision in the cloud

It integrates with Azure Resource Manager that enables you to provision Azure resources, which your application needs for code approach.

### Deploy to the cloud

 It helps you to deploy their source code to Azure.

### Publish to Teams

After creating the app, you can distribute your app to different scope, such as individual, team, organization, or anyone. Publish to Teams helps you to publish your developed app.

### CI/CD guide

It helps to automate your development workflow while building Teams application. CI/CD guide provides tools and pre-cooked templates for you to get started while setting up CI or CD pipelines.

#### TeamsFx CLI

TeamsFx CLI is a text-based command line interface that accelerates Teams application development and also enables CI/CD scenario where you can integrate CLI in scripts for automation.

#### TeamsFx SDK

It lets you reduce tasks of implementing identity and access to cloud resources to single-line statements with zero configuration.

### Help and Feedback

In this section, you can find the documentation and resources you need. You can select **Report issues on GitHub** in the Teams Toolkit to get **Quick support** from product expert. Browse the issue before you create a new one, or visit [StackOverflow tag `teams-toolkit`](https://stackoverflow.com/questions/tagged/teams-toolkit) to submit feedback.

## See also

* [Create new project use Teams Toolkit](create-new-project.md)
* [Prepare accounts to build Teams apps](accounts.md)
* [Publish Teams apps using Teams Toolkit](publish.md)
* [Use Teams Toolkit to provision cloud resources](provision.md)
* [Deploy to the cloud](deploy.md)