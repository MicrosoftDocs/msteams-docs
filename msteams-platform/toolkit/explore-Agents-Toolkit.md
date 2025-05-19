---
title: Explore Agents Toolkit in VS Code
author: zyxiaoyuer
description: Learn about Microsoft 365 Agents Toolkit UI in Visual Studio Code, explore and know about the functionality and details of each element in the task pane, and how-to guides.
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 07/29/2022
---
# Explore Agents Toolkit

You can explore the look and feel of Microsoft 365 Agents Toolkit (previously known as Teams Toolkit) within the Microsoft Visual Studio Code.

This section gives you a tour of Agents Toolkit and its features.

## Take a tour of Agents Toolkit

Agents Toolkit appears within Visual Studio Code as an extension. After you install Agents Toolkit, it opens within the Visual Studio Code window.

:::image type="content" source="../assets/images/toolkit-v2/toolkit-fundamentals/overview-page.png" alt-text="Screenshot shows the Overview of Agents Toolkit." lightbox="../assets/images/toolkit-v2/toolkit-fundamentals/overview-page.png":::

| Serial No. | UI Elements | Definition |
| --- | --- | --- |
| 1 | **Build a Declatative Agent** | Build a declarative agent. |
| 2 | **Create a New Agent/App** | Create a new agent/app. |
| 3 | **View Samples** | Select and build existing app samples based on common use cases for a Teams app. |
| 4 | **Create App with GitHub Copilot** | Create an app with GitHub Copilot. |
| 5 | • **New File** <br> • **Open File** <br> • **Open Folder** <br> • **Connect to** | • Create a new file. <br> • Open an existing file. <br> • Open an existing folder. <br> • Connect to remote development workspaces. |
| 6 | **Recent** | View the recent files. |

### Explore the Agents Toolkit task pane

You can explore the available functionalities from the Agents Toolkit task pane. The task pane appears only after you create an app project using Agents Toolkit. The following video helps you to learn about the process of creating a new Teams app:

   :::image type="content" source="../assets/videos/javascript-botapp.gif" alt-text="Graphical representation shows the steps to create a Teams app.":::

After you create a new Teams app project, the directory structure of the app appears in the left pane and the **`README`** file in the right pane.

:::image type="content" source="../assets/images/toolkit-v2/toolkit-fundamentals/first-page_1.png" alt-text="Screenshot shows the  first page of Agents Toolkit." lightbox="../assets/images/toolkit-v2/toolkit-fundamentals/first-page_1.png":::

Let's take a tour of Agents Toolkit.

 In Visual Studio Code activity bar, the following icons are relevant to Agents Toolkit:

| Select | To... |
| --- | --- |
| **Explorer** :::image type="icon" source="../assets/images/toolkit-v2/file-explorer-icon.PNG":::  | View the directory structure of the app. |
| **Run and Debug** :::image type="icon" source="../assets/images/toolkit-v2/run-debug-icon.PNG":::  | Start the local or remote debug process. |
| **Microsoft 365 Agents Toolkit** :::image type="icon" source="../assets/images/toolkit-v2/toolkit-sidebar-icon.PNG"::: | View the task pane  in the Agents Toolkit. |

From the task pane, you can see the following sections:

:::row:::
   :::column span="":::
      :::image type="content" source="../assets/images/toolkit-v2/toolkit-fundamentals/accounts1_1.png" alt-text="Screenshot shows the Accounts section.":::
   :::column-end:::
   :::column span="":::

        To develop a Teams app, you need the following accounts:
        
         * **Sign in to Microsoft 365**: Use your Microsoft 365 work or school account with a valid E5 subscription for building your app. If you don't have a valid account, you can join [Microsoft 365 developer program](https://developer.microsoft.com/microsoft-365/dev-program) to get a free account before you start.

        * **Sign in to Azure**: Use your Azure account for deploying your app on Azure. You can [create a free Azure account](https://azure.microsoft.com/free/) before you start.
   :::column-end:::
:::row-end:::

:::row:::
   :::column span="":::
      :::image type="content" source="../assets/images/toolkit-v2/toolkit-fundamentals/environment.png" alt-text="Screenshot shows the Environment section.":::
   :::column-end:::
   :::column span="":::

        To deploy your Teams app, you need the following environments:

       * **playground**: Deploy your app in the testool environment with playground environment configurations.
        
       * **local**: Deploy your app in the default local environment with local environment configurations.

        * **dev**: Deploy your app in the default dev environment with remote or cloud environment configurations.

        You can create more environments, such as production or test, as you need.
   :::column-end:::
:::row-end:::

:::row:::
   :::column span="":::
      :::image type="content" source="../assets/images/toolkit-v2/toolkit-fundamentals/development-vsc.png" alt-text="Screenshot shows the Development section.":::
   :::column-end:::
   :::column span="":::

        To create and debug your Teams app, you need the following features:
        
       * **Create a New Agent/App**: Use Agents Toolkit wizard to prepare project scaffolding for app development.

        * **View Samples**: Select any of Agents Toolkit's sample apps. The toolkit downloads the app code from GitHub and you can build the sample app.

        * **View How-to Guides**: Select to view Teams app scenario guides and development guides.

        * **Preview Your Teams App (F5)**: Select to view the Teams app debug options.

        * **Get Help from GitHub Copilot**: Select to get AI-powered code suggestions.
   :::column-end:::
:::row-end:::

:::row:::
   :::column span="":::
      :::image type="content" source="../assets/images/toolkit-v2/toolkit-fundamentals/deployment1.png" alt-text="Screenshot shows the Lifecycle section.":::
   :::column-end:::
   :::column span="":::

        To provision, deploy, and publish your Teams app, you need the following features:
        
        * **Provision**: Allocate Azure resources for your application. Agents Toolkit is integrated with Azure Resource Manager, and it registers your app with Microsoft Entra ID automatically.
        
        * **Deploy**: Deploy the source code to Azure.
       
        * **Publish to Organization**: Publish your developed app and publish it to scopes, such as personal, team, channel, or organization.
   :::column-end:::
:::row-end:::

:::row:::
   :::column span="":::
      :::image type="content" source="../assets/images/toolkit-v2/toolkit-fundamentals/utility.png" alt-text="Screenshot shows the Utility section.":::
   :::column-end:::
   :::column span="":::

        To create an app package, validate an app, and publish in Developer Portal, you need the following features:

        * **Zip Teams App Package**: Create the app package that can be uploaded to Teams or Developer Portal. It contains the app manifest (previously called Teams app manifest) and app icons.
        
        * **Validate Application**: Validate if the app manifest file is in right schema or validate the app package.
        
        * **Publish to Store in Developer Portal**: Use Developer Portal to publish and manage your Teams app. 
   :::column-end:::
:::row-end:::

:::row:::
   :::column span="":::
      :::image type="content" source="../assets/images/toolkit-v2/toolkit-fundamentals/help-and-feedback.png" alt-text="Screenshot shows the Help and feedback section.":::
   :::column-end:::
   :::column span="":::

        To access more information and provide us, your feedback on Agents Toolkit, select any one of the following:
        
        * **Documentation**: Select to access the Microsoft Teams Developer documentation.

        * **Get Started**: View Agents Toolkit Get started help within Visual Studio Code.

        * **Report Issues on GitHub**: Select to access GitHub page and raise any issues.
   :::column-end:::
:::row-end:::

### To view how-to guides

1. Select **View How-to Guides** from Agents Toolkit task pane under **DEVELOPMENT** section.

   :::image type="content" source="../assets/images/toolkit-v2/toolkit-fundamentals/view-how-to-guides.png" alt-text="Screenshot shows the how-to guides menu options." lightbox="../assets/images/toolkit-v2/toolkit-fundamentals/view-how-to-guides.png":::

   The **View How-to Guides** menu appears.

2. Select the type of how-to guide that you want to view.

    * Select any one of the Teams app scenario guides to view the guide to develop an app for a common app scenario, such as sending notifications using a bot.
    * Select any one of the Teams app development guides to view a guide that helps in app development, such as embedding a dashboard tab in a Teams app.

## See also

[Prepare to build apps using Microsoft 365 Agents Toolkit](build-environments.md)
