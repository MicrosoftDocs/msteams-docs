---
title: Install and explore Teams Toolkit 
author: zyxiaoyuer
description: In this module, learn Installation of Teams Toolkit, and explore Teams Toolkit
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 05/24/2022
---

# Install Teams Toolkit for Visual Studio Code

1. Open **Visual Studio Code.**
1. Select the Extensions view (**Ctrl+Shift+X** / **⌘⇧-X** or **View > Extensions**).

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/install toolkit-1.png" alt-text="install":::

1. Enter **Teams Toolkit** in the search box.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/install-toolkit2.png" alt-text="Toolkit":::

1. Select **Install**.
  
   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/install-toolkit.png" alt-text="install toolkit 4.0.0":::

> [!TIP]
> You can install Teams Toolkit from [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension).

## Take a tour of Teams Toolkit

After Toolkit installation, you'll see the Teams Toolkit UI as shown in following image:

:::image type="content" source="../assets/images/teams-toolkit-v2/manual/Teams-toolkit.png" alt-text="mini functions":::

You can select **Get Started** to explore the Teams Toolkit, or select **Create a new Teams App** to create one Teams project. If you have a Teams project created by Teams Toolkit opened in Visual Studio Code, you will see Teams Toolkit UI with all functionalities as shown in the following image:

:::image type="content" source="../assets/images/teams-toolkit-v2/manual/teamstookit1.png" alt-text="Screen shot ofteams toolkit":::

Let's take a tour of the topics covered in this document.

|Section|Contents|Details
|---------|---------|--------|
|Accounts|Microsoft 365 account| To develop a Teams app, you need at least one Microsoft 365 account with a valid subscription.|
| | Azure Account |  If you want to host your backend resources on Azure, an Azure account is also needed. Teams Toolkit supports integrated experience to sign-in, provision, and deployment for Azure resources. You can [create a free Azure account](https://azure.microsoft.com/free/) before you start.|
|Environment|Local and Dev |Teams Toolkit helps you to create and manage multiple environments, provision, and deploy artifacts to the target environment for Teams App.|
|Development| Create a new Teams app | Teams Toolkit helps you to create and customize your Teams app project that makes the Teams app development work simpler. Create a new Teams app helps you to start with Teams app development by creating new Teams project using Teams Toolkit either by using **Create new project**|
|  | View Samples | It helps you to create sample apps and explore code samples|
|  | Add Features | It helps you to add additional Teams capabilities such as **Tab** or **Bot** or **Message extension** or **Command bot** or **Notification bot**, or **SSO enabled tab** optionally add Azure resources such as **Azure SQL Database** or **Azure Key Vault**, or **Azure function** or **Azure API Management** which fits your development needs to your current Teams app. You can also add **API connection** or **Single Sign-on** or **CI/CD workflows** for your Teams app.
|  | Edit Manifest file | It helps you customize manifest file based on the app requirements |
|Deployment| Provision to the cloud | It integrates with Azure resource manager that enables you to provision Azure resources, which your application needs for code approach.|
|| Zip Teams metadata package| |
|| Deploy to the cloud| During or after the development, ensure to provision, deploy, and publish Teams app before it is accessible to users.|
|| Publish to Teams| After creating the app, you can distribute your app to different scope, such as individual, team, organization, or anyone. Publish to Teams helps you to publish your developed app.|
|| Developer Portal for Teams| It is the primary tool for configuring, distributing, and managing your Microsoft Teams apps. You can collaborate with colleagues on your app, set up runtime environments, and much more. |
|Help and Feedback| Quick Start| It helps you to explore more on the fundamentals concepts of Creating Teams app  |
|| Tutorials| It helps you to access tutorials on build notification bot, build command bot, add single sign-on, and connect to an API|
|| Documentation| It helps you to access on Microsoft Teams documentation.|
|| Report issues on GitHub| It helps to get **Quick support** from product expert. Browse the existing issues before you create a new one, or visit [StackOverflow tag `teams-toolkit`](https://stackoverflow.com/questions/tagged/teams-toolkit) to submit feedback.|
  
Let's explore Teams Toolkit features.

| Teams Toolkit Features | Includes | What you can do |
| --- | --- | --- |
| **Accounts** | &nbsp; | &nbsp; |
| &nbsp; | Microsoft 365 account | Use your Microsoft 365 account with a valid E5 subscription for building your app. |
| &nbsp; | Azure account | Use your Azure account for deploying app on Azure. |
| **Environment** | &nbsp; | &nbsp; |
| &nbsp; | local | Deploy your app in the default local environment with local machine environment configurations. |
| &nbsp; | dev | Deploy your app in the default dev environment with remote or cloud environment configurations. You can create more environments, as you need. |
| **Development** | &nbsp; | &nbsp; |
| &nbsp; | Create a new Teams app | Use the toolkit wizard to prepare project scaffolding for app development. |
| &nbsp; | View samples | Select any of Teams Toolkit's 12 sample apps. The toolkit downloads the app code from GitHub, and you can build the sample app. |
| &nbsp; | Add Features | - Add other required Teams capabilities to Teams app during development process. </br> - Add optional cloud resources suitable for your app. |
| &nbsp; | Edit manifest file | Edit the Teams app integration with Teams client. |
| **Deployment** | &nbsp; | &nbsp; |
| &nbsp; | Provision in the cloud | Allocate Azure resources for your application. Teams Toolkit is integrated with Azure Resource Manager. |
| &nbsp; | Zip Teams metadata package | Create the app package that can be uploaded to Teams or Developer Portal. It contains the app manifest and app icons.  |
| &nbsp; | Deploy to the cloud | Deploy the source code to Azure. |
| &nbsp; | Publish to Teams | Publish your developed app and distribute it to scopes, such as personal, team, channel, or organization. |
| &nbsp; | Developer Portal for Teams | Use Developer Portal to configure and manage your Teams app. |
| **Help and Feedback** | &nbsp; | &nbsp; |
| &nbsp; | Quick start | View the Teams Toolkit Quick start help within Visual Studio Code.  |
| &nbsp; | Tutorial | Select to access different tutorials. |
| &nbsp; | Documentation | Select to access the Microsoft Teams Developer Documentation. |
| &nbsp; | Report issues on GitHub | Select to access GitHub page and raise any issues. |
