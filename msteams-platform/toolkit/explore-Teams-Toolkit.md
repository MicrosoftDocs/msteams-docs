---
title: Explore Teams Toolkit 
author: zyxiaoyuer
description: In this module, learn on exploring Teams Toolkit
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 07/29/2022
zone_pivot_groups: teams-app-platform
---
# Explore Teams Toolkit UI

After you've installed Teams Toolkit, you can explore the Teams Toolkit features through its UI. Teams Toolkit comes with different UI and UX in Visual Studio Code and Visual Studio. In this section, you can view UI for both flavors.

::: zone pivot="visual-studio-code"

## Teams Toolkit for Visual Studio Code

After Teams Toolkit installation, you'll see the Teams Toolkit UI as shown in the following image:

:::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/overview1.png" alt-text="Overview of Teams Toolkit":::

| # | UI Elements | Definition |
| --- | --- |
| 1 | • **Get Started** <br> • **Tutorials** <br> • **Documentation** | • Explore Teams Toolkit. <br> • Access different tutorials. <br> • Access the Microsoft Teams Developer Documentation. |
| 2 | **Create a new Teams App** | Create a new Teams app based on your requirement. |
| 3 | **View Samples** | Build different types of app based on existing samples. |
| 4 | **Open Folder** | Open the existing Teams app. |
| 5 | • **New File** <br> • **Open File** <br> • **Open Folder** | • Create new file. <br> • Open an existing Teams app project file. <br> • Open an existing Teams app project folder. |
| 6 | **Recent** | View the recent Teams app project files. |

### Explore the Teams Toolkit task pane

The app building features and functions of Teams Toolkit are available from its task pane. After you've created an app project using the Teams Toolkit, the task pane is accessible for further app development, debug, and deployment.

Task pane is visible only after creating an app project using Teams Toolkit. The following video helps you to quickly go through the steps of creating a new Teams app project, after which you can view the task pane in Teams Toolkit.

   ![Create a Teams app](~/assets/videos/javascript-tab-app1.gif)

After the app project is created, you can see the directory structure of the app in the left panel and the readme file in the right panel.

:::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/first-page.png" alt-text="First page of Teams Toolkit":::

Let's take a tour of the Teams Toolkit UI.

 In Visual Studio Code toolbar, The following icons are relevant to the Teams app:

| Icon | Description |
| --- | --- |
| :::image type="icon" source="../assets/images/teams-toolkit-v2/file-explorer-icon.PNG"::: | **Explorer**: To view the directory structure of the app. |
| :::image type="icon" source="../assets/images/teams-toolkit-v2/run-debug-icon.PNG"::: | **Run and Debug**: To start the local or remote debug process. |
| :::image type="icon" source="../assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.PNG"::: |**Teams Toolkit**: To view the Teams Toolkit task pane. |

Select the Teams Toolkit icon from the Visual Studio Code toolbar to view the task pane. The task pane shows the following sections:

:::row:::
   :::column span="":::
      :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/accounts1.png" alt-text="accounts section":::
   :::column-end:::
   :::column span="":::

        To develop a Teams app, you need the following accounts:
        
        * **Sign in to M365**: Use your Microsoft 365 account with a valid E5 subscription for building your app.

        * **Sign in to Azure**: Use your Azure account for deploying app on Azure. You can create a free Azure account before you start.
   :::column-end:::
:::row-end:::

:::row:::
   :::column span="":::
      :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/environment1.png" alt-text="Environment section":::
   :::column-end:::
   :::column span="":::

        To deploy your Teams app, you need the following environments:
        
       * **local**: Deploy your app in the default local environment with local machine environment configurations.

        * **dev**: Deploy your app in the default dev environment with remote or cloud environment configurations. You can create more environments, as you need.
   :::column-end:::
:::row-end:::

:::row:::
   :::column span="":::
      :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/development.png" alt-text="Development section":::
   :::column-end:::
   :::column span="":::

        To create and customize your Teams app, you need the following features:
        
       * **Create a new Teams app**: Use the toolkit wizard to prepare project scaffolding for app development.

        * **View samples**: Select any of Teams Toolkit's sample apps. The toolkit downloads the app code from GitHub, and you can build the sample app.
        
        * **Add features**: Add other required Teams capabilities to Teams app during development process and add optional cloud resources suitable for your app.
       
        * **Edit manifest file**: Edit the Teams app integration with Teams client.
   :::column-end:::
:::row-end:::

:::row:::
   :::column span="":::
      :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/deployment1.png" alt-text="Deployment section":::
   :::column-end:::
   :::column span="":::

        To provision, deploy and publish your Teams app, you need the following features:
        
        * **Provision in the cloud**: Allocate Azure resources for your application. Teams Toolkit is integrated with Azure Resource Manager.

        * **Zip Teams metadata package**: Create the app package that can be uploaded to Teams or Developer Portal. It contains the app manifest and app icons.
        
        * **Deploy to the cloud**: Deploy the source code to Azure.
       
        * **Publish to Teams**: Publish your developed app and distribute it to scopes, such as personal, team, channel, or organization.
        
        * **Developer Portal for Teams**: Use Developer Portal to configure and manage your Teams app. 
   :::column-end:::
:::row-end:::

:::row:::
   :::column span="":::
      :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/help-and-feedback1.png" alt-text="Help and feedback section":::
   :::column-end:::
   :::column span="":::

        To access more information on Teams Toolkit. you need the following documentation and resources.
        
        * **Get started**: View the Teams Toolkit Get started help within Visual Studio Code.

        * **Tutorials**: Select to access different tutorials.
        
        * **Documentation**: Select to access the Microsoft Teams Developer Documentation.
       
        * **Report issues on GitHub**: Select to access GitHub page and raise any issues.
   :::column-end:::
:::row-end:::

::: zone-end

::: zone pivot="visual-studio"

## Explore Teams Toolkit for Visual Studio

After you install Teams Toolkit, the **Teams Toolkit** menu appears under the **Project** menu option. You can view its features and functions in the Teams Toolkit menu.

> [!NOTE]
> The Teams Toolkit menu appears in the Visual Studio Project menu only when a project or solution that is created using Teams Toolkit is currently open.

# [Project](#tab/prj)

You can access Teams Toolkit menu options under **Project** menu.

1. Select **Project** > **Teams Toolkit**.
1. You can now access different Teams Toolkit options.

   :::image type="content" source="../assets/images/teams-toolkit-overview/teams-toolkit-operations-menu_1.png" alt-text="Teams toolkit operations menu":::

# [Solution Explorer](#tab/solutionexplorer)

You can access Teams Toolkit menu options using **Solution Explorer**.

1. Select **View** > **Solution Explorer** to view Solution Explorer panel.
1. Right-click on your **Project**.
1. Select **Teams Toolkit** to access different Teams Toolkit options.

   :::image type="content" source="../assets/images/teams-toolkit-overview/teams-toolkit-operations-menu1_1.png" alt-text="Teams toolkit operations from Project":::

   > [!NOTE]
   > In this scenario the project name is **MyTeamsApp1**.

---

After you've created your Teams Project, you can use the Teams Toolkit for:

:::image type="content" source="../assets/images/teams-toolkit-overview/teams-toolkit-menu-options.png"alt-text="Teams toolkit operations from Project menu":::

|Function  |Description  |
|---------|---------|
|Prepare Teams App Dependencies | Before you do a local debug perform this step, it helps you to set up the local debug dependencies and register Teams app in Teams platform. You need a Microsoft 365 account. For more information, see [Debug your Teams app locally using Visual Studio](debug-teams-app-visual-studio.md) |
|Open Manifest File | To open Teams manifest file, you can hover over the parameters to preview the values. For more information, see [Edit Teams app manifest using Visual Studio](VS-TeamsFx-preview-and-customize-app-manifest.md) |
|Update Manifest in Teams Developer Portal | When you update the manifest file, only then you can redeploy the manifest file to Azure without deploying the whole project again. Use this command to update your changes to remote. For more information, see [Edit Teams app manifest using Visual Studio](VS-TeamsFx-preview-and-customize-app-manifest.md) |
|Provision to the Cloud | This option helps you to create Azure resources that host your Teams app. For more information, see [Provision cloud resources using Visual Studio](provision-cloud-resources.md) |
|Deploy to the Cloud | This option helps you to copy your code to the Azure resources created when you did “Provision to the Cloud”. For more information, see [Deploy Teams app to the cloud using Visual Studio](deploy-teams-app.md) |
|Preview in Teams | This option launches the Teams web client and lets you preview Teams app in their browser. |
|Zip App Package | This option generates a Teams app package in the `Build` folder under the project. You can upload the package to Teams client and run the Teams app. |

::: zone-end

## See also

* [Install Teams Toolkit](install-Teams-Toolkit.md)
* [Create a new Teams app using Teams Toolkit](create-new-project.md)
* [Prepare to build apps using Microsoft Teams Toolkit](build-environments.md)
* [Provision cloud resources using Teams Toolkit](provision.md)
* [Create new Teams app in Visual Studio](create-new-teams-app-for-Visual-Studio.md)
* [Provision cloud resources using Visual Studio](provision-cloud-resources.md)
* [Deploy Teams app to the cloud using Visual Studio](deploy-teams-app.md)
* [Create a free Azure account](https://azure.microsoft.com/free/)

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
