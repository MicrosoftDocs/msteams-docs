---
title: Overview
author: zyxiaoyuer
description:  Overview 
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# Overview

> [!NOTE]
> Currently, this feature is available in **public developer preview** only.

Teams Toolkit for Microsoft Visual Studio Code helps you to create, debug, and deploy your Teams app from the Visual Studio Code.
<br> Teams Toolkit brings all tools needed for building a Teams app in one place.
<br>


## User Experience for  Teams Toolkit

Teams Toolkit automates work and provides great integration of Teams and Azure resources.

Use [CLI tool](https://github.com/OfficeDev/TeamsFx/blob/dev/docs/cli/user-manual.md) with Toolkit `teamsfx` to develop Teams app.
<br>

:::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/teams-toolkit-user-journey.png" alt-text="User Journey" border="true":::


<br>**The Advantages of toolkit are:**

* Integrated identity
* Access to cloud storage
* Data from Microsoft Graph
* Azure and Microsoft 365 services with zero-configuration

 

Teams Toolkit is based on three major platforms.
:::image type="content" source="../assets/images/teams-toolkit-v2/teams-toolkit-ide.png" alt-text="ide":::







### Install Teams Toolkit for Visual Studio Code

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

After Toolkit installation, you'll see the Teams Toolkit User Interface (UI) as mentioned below.

:::image type="content" source="../assets/images/teams-toolkit-v2/manual/teams toolkit.png" alt-text="mini functions":::

You can select **Quick Start** to explore the Teams Toolkit, or select **Create a new Teams App** to create one Teams project. If you have a Teams project created by Teams Toolkit v2.+ opened in Visual Studio Code, you will see Teams Toolkit UI with all functionalities as shown in the following image:

:::image type="content" source="../assets/images/teams-toolkit-v2/manual/toolkit functions.png" alt-text="functions":::



### Let's take a tour of the topics covered in this document:


|Feature  |What you can do  |
|---------|---------|
|Accounts     |To develop a Teams app, you need at least one Microsoft 365 account with a valid subscription. If you want to host your backend resources on Azure, an Azure account is also needed. Teams Toolkit supports integrated experience to sign in, provision and deployment for Azure resources. You can [create a free Azure account](https://azure.microsoft.com/free/) before you start.
|Environment     | Teams Toolkit helps you to create and manage multiple environments like provision and deploy artifacts to the target environment for Teams App.        |
|TeamsFx Collaboration     |  TeamsFx Collaboration allows developers and project owners to invite other collaborators to the TeamsFx project to debug, provision, and deploy the same TeamsFx project.       |
|Development    | Teams Toolkit helps you to create and customize your Teams app project that makes the Teams app development work simpler.        |
|Create a new Teams appRow5     | It helps you to start with Teams app development by creating a new Teams project using Teams Toolkit either by **Create new project** or **Create from samples**.        |
|Add capabilities     |  Add capabilities helps to add other required Teams capabilities to Teams app during development process.       |
|Add cloud resources     | Add cloud resources        |
|Edit manifest file     | Edit manifest file helps you to edit the Teams app integration with Teams client.        |
|Deployment     |   During or after the development, ensure to provision, deploy, and publish Teams app before it is accessible to users.      |
|Provision in the cloud    |Provision in the cloud integrates with Azure resource manager that enables you to provision Azure resources, which your application needs for code approach.         |
|Deploy to the cloud     |   Deploy to the cloud helps you to deploy the source code to Azure.      |
|  Publish to Teams   |   After creating the app, you can distribute your app to different scope, such as individual, team, organization, or anyone. Publish to Teams helps you to publish your developed app.      |
|  CI/CD guide   | CI/CD guide helps to automate your development workflow while building Teams application. CI/CD guide provides tools and templates to get started while setting up CI or CD pipelines.        |
|TeamsFx CLI     |   TeamsFx CLI is a text-based command line interface that accelerates Teams application development and also enables CI/CD scenario where you can integrate CLI in scripts for automation.      |
|TeamsFx SDK     | TeamsFx SDK helps you to reduce tasks of implementing identity and access to cloud resources to single-line statements with zero configuration.        |


## Help and Feedback

You can select **Report issues on GitHub** in the Teams Toolkit to get **Quick support** from product expert. Browse the issue before you create a new one, or visit [StackOverflow tag `teams-toolkit`](https://stackoverflow.com/questions/tagged/teams-toolkit) to submit feedback.

**Let's explore the Teams Toolkit features.
|Features | Includes... | What you can do |
| --- | --- | --- |
| **Accounts** | &nbsp; | &nbsp; |
| &nbsp; | Microsoft 365 account | Use your Microsoft 365 account with a valid E5 subscription for building your app. |
| &nbsp; | Azure account | Use your Azure account for deploying app on Azure. |
| **Environment** | &nbsp; | &nbsp; |
| &nbsp; | Local | Deploy your app in the default local environment with local machine environment configurations. |
| &nbsp; | Dev | Deploy your app in the default dev environment with remote or cloud environment configurations. You can create more environments, as you need. |
| **Development** | &nbsp; | &nbsp; |
| &nbsp; | Create a new Teams app | Use the toolkit wizard to prepare project scaffolding for app development. |
| &nbsp; | View samples | Select any of Teams Toolkit's 12 sample apps. The toolkit downloads the app code from GitHub, and you can build the sample app. |
| &nbsp; | Add capabilities | Add other required Teams capabilities to Teams app during development process. |
| &nbsp; | Add cloud resources | Add optional cloud resources suitable for your app. |
| &nbsp; | Edit manifest file | Edit the Teams app integration with Teams client. |
| **Deployment** | &nbsp; | &nbsp; |
| &nbsp; | Provision in the cloud | Allocate Azure resources for your application. Teams Toolkit is integrated with Azure Resource Manager. |
| &nbsp; | Zip Teams metadata package | Create the app package that can be uploaded to Teams or Developer Portal. It contains the app manifest and app icons.  |
| &nbsp; | Deploy to the cloud | Deploy the source code to Azure. |
| &nbsp; | Publish to Teams | Publish your developed app and distribute it to scopes, such as personal, team, channel, or organization. |
| &nbsp; | Developer Portal for Teams | Use Developer Portal to configure and manage your Teams app. |
| &nbsp; | CI/CD guide | Automate your development workflow while building Teams application. |
| **Help and Feedback** | &nbsp; | &nbsp; |
| &nbsp; | Quick Start | View the Teams Toolkit Quick Start help within Visual Studio Code.  |
| &nbsp; | Documentation | Select to access the Microsoft Teams Developer Documentation. |
| &nbsp; | Report issues on GitHub | Select to access GitHub page and raise any issues. |
> [!TIP]
> Browse existing issues before you create a new one, or visit [StackOverflow tag `teams-toolkit`](https://stackoverflow.com/questions/tagged/teams-toolkit) to submit feedback.
|
## See also

* [Create new project using Teams Toolkit](create-new-project.md)
* [Prepare accounts to build Teams apps](accounts.md)
* [Publish Teams apps using Teams Toolkit](publish.md)
* [Use Teams Toolkit to provision cloud resources](provision.md)
* [Deploy to the cloud](deploy.md)
