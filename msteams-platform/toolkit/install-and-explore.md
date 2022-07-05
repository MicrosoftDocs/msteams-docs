---
title: Install and explore Teams Toolkit 
author: zyxiaoyuer
description: In this module, learn Installation of Teams Toolkit, and explore Teams Toolkit
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 05/24/2022
---

# Install and explore Teams Toolkit

Teams Toolkit is an extension in Visual Studio Code and it primarily requires NPM and Node.js to start with your first Teams app development. In Teams Toolkit you can create new Teams app, add capabilities, add cloud resources, deploy and provision cloud resources, and publish Teams app.

## Install Teams Toolkit

Ensure you have installed the latest version. The following steps help you to install Teams Toolkit in Visual Studio Code:

1. Open **Visual Studio Code.**
1. Select the Extensions view (**Ctrl+Shift+X** / **⌘⇧-X** or **View > Extensions**).

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/install toolkit-1.png" alt-text="install":::

1. Enter **Teams Toolkit** in the search box.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/install-toolkit2.png" alt-text="Toolkit":::

1. Select **Install**.
  
   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/install-toolkit.png" alt-text="install toolkit 4.0.0":::

> [!TIP]
> You can install Teams Toolkit from [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension).

## Explore Teams Toolkit

After Toolkit installation, you'll see the Teams Toolkit UI as shown in following image:

:::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/overview.png" alt-text="Overview of Teams Toolkit":::

1. **Documentation** helps to access the Microsoft Teams Developer Documentation.
1. **Get Started** helps to explore the Teams Toolkit.
1. **Tutorials** helps to access different tutorials.
1. **Create a new Teams App** helps to create one Teams project.
1. **View Samples** helps to build sample app.
1. **Open Folder** helps to open the existing Teams app.
1. **New File** under **Start** section helps to create new file.
1. **Open File** under **Start** section helps to open the existing file.
1. **Open Folder** under **Start** section to open the existing folder.
1. **Recent** section helps you to view the recent files.

Watch the following gif for creating a new Teams app

   ![Create a Teams app](~/assets/videos/javascript-tab-app1.gif)

After creating a new Teams app, you see the directory structure of created app in the left side panel and readme file in the right side panel.

:::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/first-page.png" alt-text="First page of Teams Toolkit":::

Select the Teams Toolkit :::image type="icon" source="../assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.PNG"::: icon in the Visual Studio Code sidebar to view Teams Toolkit UI with all functionalities as shown in the following image:

:::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/ui-elements.png" alt-text="UI Elements":::

Let's take a tour of the topics covered in this document.

|Section|Features|Details
|---------|---------|--------|
| **1. ACCOUNTS** | &nbsp; | &nbsp; |
| &nbsp; |Microsoft 365 account| To develop a Teams app, you need at least one Microsoft 365 account with a valid subscription.|
| &nbsp; | Azure Account |  If you want to host your backend resources on Azure, an Azure account is also needed. Teams Toolkit supports integrated experience to sign-in, provision, and deployment for Azure resources. You can [create a free Azure account](https://azure.microsoft.com/free/) before you start.|
| **2. ENVIRONMENT** | &nbsp; | &nbsp; |
| &nbsp; |Local |Deploy your app in the default local environment with local machine environment configurations.|
| &nbsp; | Dev |Deploy your app in the default dev environment with remote or cloud environment configurations. You can create more environments, as you need.|
| **3. DEVELOPMENT** | &nbsp; | &nbsp; |
| &nbsp; | Create a new Teams app | Teams Toolkit helps you to create and customize your Teams app project that makes the Teams app development work simpler. Create a new Teams app helps you to start with Teams app development by creating new Teams project using Teams Toolkit either by using **Create new project**|
| &nbsp; | View Samples | Select any of Teams Toolkit's 16 sample apps. The toolkit downloads the app code from GitHub, and you can build the sample app.|
| &nbsp; | Add Features | It helps you to add additional Teams capabilities such as **Tab** or **Bot** or **Message extension** or **Command bot** or **Notification bot**, or **SSO enabled tab** optionally add Azure resources such as **Azure SQL Database** or **Azure Key Vault**, or **Azure function** or **Azure API Management** which fits your development needs to your current Teams app. You can also add **API connection** or **Single Sign-on** or **CI/CD workflows** for your Teams app.
| &nbsp; | Edit Manifest file | It helps you customize manifest file based on the app requirements |
| **4. DEPLOYMENT** | &nbsp; | &nbsp; |
| &nbsp;| Provision to the cloud | It integrates with Azure resource manager that enables you to provision Azure resources, which your application needs for code approach.|
| &nbsp; | Zip Teams metadata package| Create the app package that can be uploaded to Teams or Developer Portal. It contains the app manifest and app icons. |
| &nbsp; | Deploy to the cloud| During or after the development, ensure to provision, deploy, and publish Teams app before it is accessible to users.|
| &nbsp; | Publish to Teams| After creating the app, you can distribute your app to different scope, such as individual, team, organization, or anyone. Publish to Teams helps you to publish your developed app.|
| &nbsp; | Developer Portal for Teams| It is the primary tool for configuring, distributing, and managing your Microsoft Teams apps. You can collaborate with colleagues on your app, set up runtime environments, and much more. |
| **5. HELP and FEEDBACK** | &nbsp; | &nbsp; |
| &nbsp; | Get Started |  View the Teams Toolkit Quick start help within Visual Studio Code.|
| &nbsp; | Tutorials| Select to access different tutorials.|
| &nbsp; | Documentation| Select to access the Microsoft Teams Developer Documentation.|
| &nbsp; | Report issues on GitHub| It helps to get **Quick support** from product expert. Browse the existing issues before you create a new one, or visit [StackOverflow tag `teams-toolkit`](https://stackoverflow.com/questions/tagged/teams-toolkit) to submit feedback.|
| **6. File Explorer** | &nbsp; | &nbsp; |
 &nbsp; | &nbsp; | It helps to view the directory structure of your app.|
| **7. Run and Debug** | &nbsp; | &nbsp; |
 &nbsp; | &nbsp; | To start the local or remote debug process.|
