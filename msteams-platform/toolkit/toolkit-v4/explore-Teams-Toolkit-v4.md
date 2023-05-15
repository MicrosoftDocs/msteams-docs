---
title: Explore Teams Toolkit v4
author: zyxiaoyuer
description: Learn about Teams Toolkit v4 UI elements and task pane for Visual Studio Code, and different functions for Visual Studio.
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 07/29/2022
zone_pivot_groups: teams-app-platform
---
# Explore Teams Toolkit v4

> [!IMPORTANT]
>
> We've introduced the Teams Toolkit v5 extension within Visual Studio Code. This version comes to you with many new app development features. We recommend that you use Teams Toolkit v5 for building your Teams app.
>
> [Teams Toolkit v4](~/toolkit-v4/teams-toolkit-fundamentals-v4.md) extension will soon be deprecated.

You can explore the Teams Toolkit v4 look and feel within the Visual Studio Code or Visual Studio.

This section gives you a tour of Teams Toolkit v4 and its features.

::: zone pivot="visual-studio-code"

## Take a tour of Teams Toolkit v4

Teams Toolkit appears within Visual Studio Code as an extension. After you install Teams Toolkit, it opens within the Visual Studio Code window.

:::image type="content" source="images/overview1_1-v4.png" alt-text="Overview of Teams Toolkit"  lightbox="images/overview1_1-v4.png":::

| Serial No. | UI Elements | Definition |
| --- | --- | --- |
| 1 | **Documentation** | Access the Microsoft Teams Developer documentation. |
| 2 | **How-to guides** | Access how-to guides for app scenario and app development. |
| 3 | **Create a new Teams app** | Create a new Teams app based on your requirement. |
| 4 | **View samples** | Select and build existing app samples based on common use cases for a Teams app. |
| 5 | • **New File** <br> • **Open File** <br> • **Open Folder** <br> • **Clone Git Repository** | • Create a new file. <br> • Open the existing file. <br> • Open the existing folder. <br> • Clone the Git repository of your app project. |
| 6 | **Recent** | View the recent files. |
| 7 | **Get Started** | Explore Teams Toolkit and get an overview of the fundamentals. |

### Explore the Teams Toolkit task pane

You can explore the available functionalities from the Teams Toolkit task pane. The task pane appears only after you've created an app project using Teams Toolkit. The following video helps you to learn about the process of creating a new Teams app:

   :::image type="content" source="images/javascript-bot-app1_1-v4.gif" alt-text="Create a Teams app":::

After you create a new Teams app project, the directory structure of the app appears in the left panel and the **`README`** file in the right panel.

:::image type="content" source="images/first-page_1-v4.png" alt-text="First page of Teams Toolkit"  lightbox="images/first-page_1-v4.png":::

Let's take a tour of Teams Toolkit.

 In Visual Studio Code activity bar, the following icons are relevant to Teams Toolkit:

| Select | To... |
| --- | --- |
| **Explorer** :::image type="icon" source="images/file-explorer-icon-v4.png" border="false":::  | View the directory structure of the app. |
| **Run and Debug** :::image type="icon" source="images/run-debug-icon-v4.png" border="false":::  | Start the local or remote debug process. |
| **Teams Toolkit** :::image type="icon" source="images/teams-toolkit-sidebar-icon-v4.PNG" border="false"::: | View the task pane  in the Teams Toolkit. |

From the task pane, you can see the following sections:

:::row:::
   :::column span="":::
      :::image type="content" source="images/accounts1_1-v4.png" alt-text="accounts section":::
   :::column-end:::
   :::column span="":::

        To develop a Teams app, you need the following accounts:
        
        * **Sign in to Microsoft 365**: Use your Microsoft 365 account with a valid E5 subscription for building your app.

        * **Sign in to Azure**: Use your Azure account for deploying your app on Azure. You can [create a free Azure account](https://azure.microsoft.com/free/) before you start.
   :::column-end:::
:::row-end:::

:::row:::
   :::column span="":::
      :::image type="content" source="images/environment1-v4.png" alt-text="Environment section"::::::
   :::column-end:::
   :::column span="":::

        To deploy your Teams app, you need the following environments:
        
       * **local**: Deploy your app in the default local environment with local environment configurations.

        * **dev**: Deploy your app in the default dev environment with remote or cloud environment configurations.

        You can create more environments, such as production or test, as you need.
   :::column-end:::
:::row-end:::

:::row:::
   :::column span="":::
      :::image type="content" source="images/development-vsc-v4.png" alt-text="Development section":::
   :::column-end:::
   :::column span="":::

        To create, customize, and debug your Teams app, you need the following features:
        
       * **Create a new Teams app**: Use the Teams Toolkit wizard to prepare project scaffolding for app development.

        * **View samples**: Select any of the Teams Toolkit's sample apps. The toolkit downloads the app code from GitHub and you can build the sample app.

        * **View how-to-guides**: Select to view Teams app scenario guides and development guides.

        * **Add features**: Add other Teams capabilities to the Teams app during the development process and add optional cloud resources suitable for your app.
       
        * **Preview your Teams app (F5)**: Press **F5** to debug and preview your Teams app.

        * **Edit manifest file**: Edit the Teams app manifest file with the Teams client.
   :::column-end:::
:::row-end:::

:::row:::
   :::column span="":::
      :::image type="content" source="images/deployment1-v4.png" alt-text="Deployment section":::
   :::column-end:::
   :::column span="":::

        To provision, deploy, and publish your Teams app, you need the following features:
        
        * **Provision in the cloud**: Allocate Azure resources for your application. Teams Toolkit is integrated with Azure Resource Manager, and it registers your app with Azure AD automatically.

        * **Zip Teams metadata package**: Create the app package that can be uploaded to Teams or Developer Portal. It contains the app manifest and app icons.
        
        * **Deploy to the cloud**: Deploy the source code to Azure.
       
        * **Publish to Teams**: Publish your developed app and distribute it to scopes, such as personal, team, channel, or organization.
        
        * **Developer Portal for Teams**: Use Developer Portal to configure and manage your Teams app. 
   :::column-end:::
:::row-end:::

:::row:::
   :::column span="":::
      :::image type="content" source="images/help-and-feedback1-v4.png" alt-text="Help and feedback section":::
   :::column-end:::
   :::column span="":::

        To access more information on Teams Toolkit, you need the following documentation and resources:
        
        * **Documentation**: Select to access the Microsoft Teams Developer documentation.

        * **Get started**: View Teams Toolkit Get started help within Visual Studio Code.

        * **Report issues on GitHub**: Select to access GitHub page and raise any issues.
   :::column-end:::
:::row-end:::

### To view how-to guides

1. Select **View how-to guides** from the Teams Toolkit task pane under Development section.

   The **View how-to guides** menu appears.

2. Select the type of how-to guide that you want to view.

   :::image type="content" source="images/view-how-to-guides-v4.png" alt-text="Screenshot showing the how-to guides menu options." lightbox="images/view-how-to-guides-v4.png":::

    * Select any one of the Teams app scenario guides to view the guide to develop an app for a common app scenario, such as sending notifications using a bot.

    * Select any one of the Teams app development guides to view a guide that helps in app development, such as embedding a dashboard tab in a Teams app.

::: zone-end

::: zone pivot="visual-studio"

## Explore Teams Toolkit for Visual Studio

Teams Toolkit appears within Visual Studio as a workload. When you've created a Teams Toolkit app, you can see Teams Toolkit options in the following ways:

# [Project](#tab/prj)

You can access Teams Toolkit under **Project**.

1. Select **Project** > **Teams Toolkit**.
1. You can access different Teams Toolkit options:

   :::image type="content" source="images/teams-toolkit-project-menu-v4.png" alt-text="Teams toolkit project menu"  lightbox="images/teams-toolkit-project-menu-v4.png":::

# [Solution Explorer](#tab/solutionexplorer)

   You can access Teams Toolkit under **Solution Explorer**.

1. Select **View** > **Solution Explorer** to view **Solution Explorer** panel.
1. Right-click on your app project name.
1. Select **Teams Toolkit** to see the menu items.

   :::image type="content" source="images/teams-toolkit-operations-menu1_1_2-v4.png" alt-text="Teams toolkit operations from Project":::

   > [!NOTE]
   > In this scenario the project name is **MyTeamsApp**.

---

After you've created your Teams app project, you can use the following options to develop and build your app:

:::image type="content" source="images/teams-toolkit-menu-options_2-v4.png" alt-text="Teams toolkit operations from Project menu":::

|Function  |Description  |
|---------|---------|
|Prepare Teams App Dependencies     |Before you debug locally, ensure that you prepare your app for dependencies. This option helps you to set up the local debug dependencies and register Teams app in the Teams platform. You must have a Microsoft 365 account. For more information, see [how to debug your Teams app locally using Visual Studio](debug-local-v4.md).         |
|Open Manifest File     | This option helps you to open Teams app manifest file. Hover over the parameters to preview the values. For more information, see [how to edit Teams app manifest using Visual Studio](TeamsFx-preview-and-customize-app-manifest-v4.md).         |
|Update Manifest in Teams Developer Portal     | This option helps you to update the manifest file. When you update the manifest file, only then you can redeploy the manifest file to Azure without deploying the whole project again. Use this command to update your changes to remote. For more information, see [how to edit Teams app manifest using Visual Studio](TeamsFx-preview-and-customize-app-manifest-v4.md).       |
|Add Authentication Code     | This option helps you obtain signed-in Teams user token to access Microsoft Graph and other APIs. Teams Toolkit facilitates the interaction by abstracting from the Microsoft Azure Active Directory (Azure AD) which flows and integrates with simple APIs. For more information, see [how to add single sign-on to Teams app](add-single-sign-on-v4.md).        |
|Provision to the Cloud     | This option helps you to create Azure resources that host your Teams app. For more information, see [how to provision cloud resources using Visual Studio](provision-v4.md).        |
|Deploy to the Cloud     | This option helps you to copy your code to the cloud resources that you provisioned in Azure AD. For more information, see [how to deploy Teams app to the cloud using Visual Studio](deploy-v4.md#deploy-teams-app-to-the-cloud-using-visual-studio).        |
|Preview in Teams     | This option launches the Teams web client and lets you preview the Teams app in your browser.         |
|Zip App Package     | This option generates a Teams app package in the `Build` folder under the project. You can upload the app package to the Teams client and run the Teams app.         |

::: zone-end

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals-v4.md)
* [Create a new Teams app using Teams Toolkit](create-new-project-v4.md)
* [App manifest schema](~/resources/schema/manifest-schema.md)
* [Prepare to build apps using Teams Toolkit](build-environments-v4.md)

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
