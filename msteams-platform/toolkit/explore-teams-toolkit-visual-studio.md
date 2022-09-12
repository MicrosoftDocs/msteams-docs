---
title: Explore Teams Toolkit for Visual Studio
author: surbhigupta
description: In this module, learn to Explore Teams Toolkit for Visual Studio
ms.author: v-amprasad
ms.localizationpriority: medium
ms.topic: overview
ms.date: 05/24/2022
---

# Explore Teams Toolkit for Visual Studio

In this document, you can understand different UI elements along with description and basic usage from task pane in Teams Toolkit.

   > [!NOTE]
   > Task pane is visible only after creating an app using Teams Toolkit. Refer to ...

After you install Teams Toolkit, you can take a brief look at the different menu options of Teams Toolkit in two different options:

# [Project](#tab/prj)

You can access Teams Toolkit menu from **Project** option.

1. Select **Project** > **Teams Toolkit**.
1. You can now access different Teams Toolkit menu options.

   :::image type="content" source="../assets/images/teams-toolkit-overview/teams-toolkit-operations-menu_1.png" alt-text="Teams toolkit operations menu":::

# [Solution Explorer](#tab/solutionexplorer)

   You can access Teams Toolkit menu from **Solution Explorer** option.

1. Select **View** > **Solution Explorer** to view Solution Explorer.
1. Right-click on your **Project**.
1. Select **Teams Toolkit** to access different Teams Toolkit menu options.

   :::image type="content" source="../assets/images/teams-toolkit-overview/teams-toolkit-operations-menu1_1.png" alt-text="Teams toolkit operations from Project":::

   > [!NOTE]
   > In this scenario the project name is **MyTeamsApp1**.

---

You can perform the following functions on Teams Toolkit for Visual Studio:

:::image type="content" source="../assets/images/teams-toolkit-overview/teams-toolkit-menu-options.png"alt-text="Teams toolkit operations from Project menu":::

|Function  |Description  |
|---------|---------|
|Create Teams Project     |Create Teams project using Teams template in Visual Studio         |
|Prepare Teams App Dependencies     |Before you do a local debug perform this step, it helps you to set up the local debug dependencies and register Teams app in Teams platform. You need a Microsoft 365 account. For more information, see [Debug your Teams app locally using Visual Studio](debug-teams-app-visual-studio.md)         |
|Open Manifest File     |To open Teams manifest file, you can hover over the parameters to preview the values. For more information, see [Edit Teams app manifest using Visual Studio](VS-TeamsFx-preview-and-customize-app-manifest.md)         |
|Update Manifest in Teams Developer Portal     |When you update the manifest file, only then you can redeploy the manifest file to Azure without deploying the whole project again. Use this command to update your changes to remote. For more information, see [Edit Teams app manifest using Visual Studio](VS-TeamsFx-preview-and-customize-app-manifest.md)       |
|Provision to the Cloud     |This option helps you to create Azure resources that host your Teams app. For more information, see [Provision cloud resources using Visual Studio](provision-cloud-resources.md)        |
|Deploy to the Cloud     |This option helps you to copy your code to the Azure resources created when you did “Provision to the Cloud”. For more information, see [Deploy Teams app to the cloud using Visual Studio](deploy-teams-app.md)        |
|Preview in Teams     |This option launches the Teams web client and lets you preview Teams app in their browser.         |
|Zip App Package     |This option generates a Teams app package in the `Build` folder under the project. You can upload the package to Teams client and run the Teams app.         |

The following operations aren't supported in Teams Toolkit for Visual Studio yet compared to Teams Toolkit for Visual Studio Code, however they're planned in the future product road map.

* Add another Teams capabilities to your Teams app.
* Add more Azure resources to your Teams app
* Add single sign-on to your Teams app.
* Add API connection to your Teams app.
* Customize Azure AD manifest.
* Add CI/CD pipelines.
* Manage multiple cloud environments.
* Collaborate on Teams projects.
* Publish Teams app.

## TeamsFx .NET SDK Reference docs

* [Microsoft.Extensions.DependencyInjection Namespace](/../dotnet/api/Microsoft.Extensions.DependencyInjection)
* [Microsoft.TeamsFx Namespace](/../dotnet/api/Microsoft.TeamsFx)
* [Microsoft.TeamsFx.Configuration Namespace](/../dotnet/api/Microsoft.TeamsFx.Configuration)
* [Microsoft.TeamsFx.Conversation Namespace](/../dotnet/api/Microsoft.TeamsFx.Conversation)
* [Microsoft.TeamsFx.Helper Namespace](/../dotnet/api/Microsoft.TeamsFx.Helper)

## See also

* [Create new Teams app in Visual Studio](create-new-teams-app-for-Visual-Studio.md)
* [Provision cloud resources using Visual Studio](provision-cloud-resources.md)
* [Deploy Teams app to the cloud using Visual Studio](deploy-teams-app.md)
