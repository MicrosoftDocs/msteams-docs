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

Teams Toolkit is an extension in Visual Studio Code and it primarily requires NPM and Node.js to start with your first Teams app development. In Teams Toolkit you can create a new Teams app, debug your Teams app, provision cloud resources, deploy Teams app to the cloud and publish your Teams app.

## Install Teams Toolkit

Ensure you have installed the latest version of Teams Toolkit. The following steps help you to install Teams Toolkit in Visual Studio Code:

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

1. You can see the following UI elements:
   * **Get Started** helps to explore the Teams Toolkit.
   * **Tutorials** helps to access different tutorials.
   * **Documentation** helps to access the Microsoft Teams Developer Documentation.
1. **Create a new Teams App** helps to create one Teams project.
1. **View Samples** helps to build different types of app based on existing samples.
1. **Open Folder** helps to open the existing Teams app.
1. You can see the following UI elements under **Start**:
   * **New File** helps to create new file.
   * **Open File** helps to open the existing file.
   * **Open Folder** helps to open the existing folder.
1. **Recent** helps you to view the recent files.

The following video guides you to create a new Teams app:

   ![Create a Teams app](~/assets/videos/javascript-tab-app1.gif)

After creating a new Teams app, you can see the directory structure of the app in the left panel and the readme file in the right window.

:::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/first-page.png" alt-text="First page of Teams Toolkit":::

Select the Teams Toolkit :::image type="icon" source="../assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon1.PNG"::: icon in the left panel to view Teams Toolkit UI with all functionalities as shown in the following image:

Let's take a tour of the topics covered in this document.

:::row:::
   :::column span="":::
      :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/accounts.png" alt-text="accounts section":::
   :::column-end:::
   :::column span="":::

        To develop a Teams app, you need the following accounts:
        
        **Sign in to M365**:
        -  Use your Microsoft 365 account with a valid E5 subscription for building your app.

        **Sign in to Azure**:
        - Use your Azure account for deploying app on Azure. You can [create a free Azure account](https://azure.microsoft.com/free/) before you start.
   :::column-end:::
:::row-end:::

:::row:::
   :::column span="":::
      :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/environment.png" alt-text="Environment section":::
   :::column-end:::
   :::column span="":::

        To deploy your Teams app, you need the following environments:
        
       **local**:
        -  Deploy your app in the default local environment with local machine environment configurations.

        **dev**:
        - Deploy your app in the default dev environment with remote or cloud environment configurations. You can create more environments, as you need.
   :::column-end:::
:::row-end:::

:::row:::
   :::column span="":::
      :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/development.png" alt-text="Development section":::
   :::column-end:::
   :::column span="":::

        It helps you to create and customize your Teams app and it contains following features:
        
       **Create a new Teams app**:
        -  Use the toolkit wizard to prepare project scaffolding for app development.

        **View samples**:
        - Select any of Teams Toolkit's sample apps. The toolkit downloads the app code from GitHub, and you can build the sample app.
        
        **Add features**:
        - Add other required Teams capabilities to Teams app during development process and add optional cloud resources suitable for your app.
       
        **Edit manifest file**:
        - Edit the Teams app integration with Teams client.
        
        **Preview and Debug Adaptive Cards**:
        - It helps to preview and debug adaptive card.
   :::column-end:::
:::row-end:::

:::row:::
   :::column span="":::
      :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/deployment.png" alt-text="Deployment section":::
   :::column-end:::
   :::column span="":::

        It helps you to provision, deploy and publish your Teams app and it contains the following features:
        
        **Provision in the cloud**:
        -  Allocate Azure resources for your application. Teams Toolkit is integrated with Azure Resource Manager.

        **Zip Teams metadata package**:
        - Create the app package that can be uploaded to Teams or Developer Portal. It contains the app manifest and app icons.
        
        **Deploy to the cloud**:
        - Deploy the source code to Azure.
       
        **Publish to Teams**:
        - Publish your developed app and distribute it to scopes, such as personal, team, channel, or organization.
        
        **Developer Portal for Teams**:
        - Use Developer Portal to configure and manage your Teams app. 
   :::column-end:::
:::row-end:::

:::row:::
   :::column span="":::
      :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/help-and-feedback.png" alt-text="Help and feedback section":::
   :::column-end:::
   :::column span="":::

        It helps you to find the required documentation and resources.
        
        **Get started**:
        - View the Teams Toolkit Get started help within Visual Studio Code.

        **Tutorials**:
        -  Select to access different tutorials.
        
        **Documentation**:
        -  Select to access the Microsoft Teams Developer Documentation.
       
        **Report issues on GitHub**:
        - Select to access GitHub page and raise any issues
   :::column-end:::
:::row-end:::
<!--  
:::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/ui-elements.png" alt-text="UI Elements":::

|Section|Features|Details
|---------|---------|--------|
| **1. ACCOUNTS** | &nbsp; | &nbsp; |
| &nbsp; |Microsoft 365 account|  Use your Microsoft 365 account with a valid E5 subscription for building your app.|
| &nbsp; | Azure Account |  Use your Azure account for deploying app on Azure. You can [create a free Azure account](https://azure.microsoft.com/free/) before you start.|
|**2.ENVIRONMENT** |  &nbsp; | &nbsp;|
| &nbsp; |Local |Deploy your app in the default local environment with local machine environment configurations.|
| &nbsp; | Dev |Deploy your app in the default dev environment with remote or cloud environment configurations. You can create more environments, as you need.|
| **3.DEVELOPMENT** | &nbsp; | &nbsp; |
| &nbsp; | Create a new Teams app | Teams Toolkit helps you to create and customize your Teams app project that makes the Teams app development work simpler. Create a new Teams app helps you to start with Teams app development by creating new Teams project using Teams Toolkit either by using **Create new project**|
| &nbsp; | View Samples | Select any of Teams Toolkit's sample apps. The toolkit downloads the app code from GitHub, and you can build the sample app.|
| &nbsp; | Add Features | It helps you to add additional Teams capabilities such as **Tab** or **Bot** or **Message extension** or **Command bot** or **Notification bot**, or **SSO enabled tab** optionally add Azure resources such as **Azure SQL Database** or **Azure Key Vault**, or **Azure function** or **Azure API Management** which fits your development needs to your current Teams app. You can also add **API connection** or **Single Sign-on** or **CI/CD workflows** for your Teams app.
| &nbsp; | Edit Manifest file | It helps you customize manifest file based on the app requirements |
| **4.DEPLOYMENT** | &nbsp; | &nbsp; |
| &nbsp;| Provision in the cloud | Allocate Azure resources for your application. Teams Toolkit is integrated with Azure Resource Manager.|
| &nbsp; | Zip Teams metadata package| Create the app package that can be uploaded to Teams or Developer Portal. It contains the app manifest and app icons. |
| &nbsp; | Deploy to the cloud| Deploy the source code to Azure.|
| &nbsp; | Publish to Teams| Publish your developed app and distribute it to scopes, such as personal, team, channel, or organization.|
| &nbsp; | Developer Portal for Teams| It is the primary tool for configuring, distributing, and managing your Microsoft Teams apps. You can collaborate with colleagues on your app, set up runtime environments, and much more. |
| **5.HELP AND FEEDBACK** | &nbsp; | &nbsp; |
| &nbsp; | Get Started |  View the Teams Toolkit Get started help within Visual Studio Code.|
| &nbsp; | Tutorials| Select to access different tutorials.|
| &nbsp; | Documentation| Select to access the Microsoft Teams Developer Documentation.|
| &nbsp; | Report issues on GitHub| It helps to get **Quick support** from product expert. Browse the existing issues before you create a new one, or visit [StackOverflow tag `teams-toolkit`](https://stackoverflow.com/questions/tagged/teams-toolkit) to submit feedback.|
| **6.Explorer** | &nbsp; | &nbsp; |
 &nbsp; | &nbsp; | It helps to view the directory structure of your app.|
| **7.Run and Debug** | &nbsp; | &nbsp; |
 &nbsp; | &nbsp; | To start the local or remote debug process.|
-->