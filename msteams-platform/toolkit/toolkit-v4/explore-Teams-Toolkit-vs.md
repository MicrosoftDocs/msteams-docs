---
title: Explore Teams Toolkit in Visual Studio
author: zyxiaoyuer
description: Learn about Teams Toolkit UI elements and task pane in Visual Studio.
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 07/29/2022
zone_pivot_groups: teams-toolkit-platform-vs
---
# Explore Teams Toolkit in Visual Studio

::: zone pivot="visual-studio-v17-7"

> [!IMPORTANT]
>We've introduced the important changes in Teams Toolkit extension within Microsoft Visual Studio v17.7 with many new app development features. We recommend that you use Teams Toolkit v17.7 for building your Teams app.

In this article, learn how to explore Teams Toolkit and its features in Visual Studio.

Teams Toolkit appears as a workload in the app you've created in Visual Studio. For more information, see [How to create a Teams app](create-new-project-vs.md). 

You can view Teams Toolkit in Visual studio in the following ways:

* Project
* Solution Explorer

# [Project](#tab/prj)

To view the Teams Toolkit from the **Project** menu, follow these steps:

1. Select **Project**.
1. Select **Teams Toolkit**.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/teams-toolkit-installed.png" alt-text="Screenshot shows the Teams toolkit project menu.":::

# [Solution Explorer](#tab/solutionexplorer)

   To view Teams Toolkit under **Solution Explorer**, follow these steps:

1. Select **View** > **Solution Explorer** to view **Solution Explorer** panel.
1. Right-click on your app project name.
1. Select **Teams Toolkit**.

   > [!NOTE]
   > In this scenario the project name is **MyTeamsApp**.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/ttk-solution explorer.png" alt-text="Screenshots the Teams toolkit operations from Project":::
  

---

After you've created your Teams app project, you can use the following options to develop and build your app:

:::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/ttk-solution explorer-options.png" alt-text="Teams toolkit operations from Project menu":::

|Function  |Description  |
|---------|---------|
|Prepare Teams App Dependencies     |Before you debug locally, ensure that you prepare your app for dependencies. This option helps you to set up the local debug dependencies and register Teams app in the Teams platform. You must have a Microsoft 365 account. For more information, see [how to debug your Teams app locally using Visual Studio](debug-local-vs.md).         |
|Open app Manifest File     | Helps you to open app manifest (previously called Teams app manifest) file. Hover over the parameters to preview the values. For more information, see [how to edit app manifest using Visual Studio](TeamsFx-preview-and-customize-app-manifest-vs.md).         |
|Update Manifest in Teams Developer Portal     | Helps you to update the app manifest file. When you update the app manifest file, only then you can redeploy the app manifest file to Azure without deploying the whole project again. Use this command to update your changes to remote. For more information, see [how to edit app manifest using Visual Studio](TeamsFx-preview-and-customize-app-manifest-vs.md).       |
|Add Authentication Code     | Helps you obtain signed-in Teams user token to access Microsoft Graph and other APIs. Teams Toolkit facilitates the interaction by abstracting from the Microsoft Azure Active Directory (Azure AD), which flows and integrates with simple APIs. For more information, see [how to add single sign-on to Teams app](add-single-sign-on-vs.md).        |
|Provision in the Cloud     | Helps you to create Azure resources that host your Teams app. For more information, see [how to provision cloud resources using Visual Studio](provision-vs.md).        |
|Deploy to the Cloud     | Helps you to copy your code to the cloud resources that you provisioned in Azure AD. For more information, see [how to deploy Teams app to the cloud using Visual Studio](deploy-vs.md).        |
|Preview in Teams     | Launches the Teams web client and lets you preview the Teams app in your browser.         |
|Zip App Package     | Generates a Teams app package in the **Build** folder under the project. You can upload the app package to the Teams client and run the Teams app.         |

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals-vs.md)
* [Create a new Teams app using Teams Toolkit](create-new-project-vs.md)
* [App manifest schema](~/resources/schema/manifest-schema.md)
* [Prepare to build apps using Teams Toolkit](build-environments-v4.md)

::: zone-end

::: zone pivot="visual-studio-v17-6"

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
|Prepare Teams App Dependencies     |Before you debug locally, ensure that you prepare your app for dependencies. This option helps you to set up the local debug dependencies and register Teams app in the Teams platform. You must have a Microsoft 365 account. For more information, see [how to debug your Teams app locally using Visual Studio](debug-local-vs.md).         |
|Open app Manifest File     | This option helps you to open app manifest file. Hover over the parameters to preview the values. For more information, see [how to edit app manifest using Visual Studio](TeamsFx-preview-and-customize-app-manifest-vs.md).         |
|Update app Manifest in Teams Developer Portal     | This option helps you to update the app manifest file. When you update the app manifest file, only then you can redeploy the app manifest file to Azure without deploying the whole project again. Use this command to update your changes to remote. For more information, see [how to edit app manifest using Visual Studio](TeamsFx-preview-and-customize-app-manifest-vs.md).       |
|Add Authentication Code     | This option helps you obtain signed-in Teams user token to access Microsoft Graph and other APIs. Teams Toolkit facilitates the interaction by abstracting from the Microsoft Azure Active Directory (Azure AD) which flows and integrates with simple APIs. For more information, see [how to add single sign-on to Teams app](add-single-sign-on-vs.md).        |
|Provision to the Cloud     | This option helps you to create Azure resources that host your Teams app. For more information, see [how to provision cloud resources using Visual Studio](provision-vs.md).        |
|Deploy to the Cloud     | This option helps you to copy your code to the cloud resources that you provisioned in Azure AD. For more information, see [how to deploy Teams app to the cloud using Visual Studio](deploy-vs.md#deploy-teams-app-to-the-cloud-using-visual-studio).        |
|Preview in Teams     | This option launches the Teams web client and lets you preview the Teams app in your browser.         |
|Zip App Package     | This option generates a Teams app package in the `Build` folder under the project. You can upload the app package to the Teams client and run the Teams app.         |

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals-vs.md)
* [Create a new Teams app using Teams Toolkit](create-new-project-vs.md)
* [App manifest schema](~/resources/schema/manifest-schema.md)
* [Prepare to build apps using Teams Toolkit](build-environments-v4.md)

::: zone-end
