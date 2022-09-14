---
title: Create new Teams app in Visual Studio
author: surbhigupta
description: In this module, learn how to create a new Teams app using Teams Toolkit for Visual Studio
ms.author: v-amprasad
ms.localizationpriority: high
ms.topic: overview
ms.date: 07/29/2022
---
# Create new Teams app in Visual Studio

Teams Toolkit provides Microsoft Teams app templates in Visual Studio to create Teams app.  You can search and select Teams app template that you require when you create a new project. You can have Teams app templates for creating:

* Tab app
* Command bot
* Notification bot
* Message Extension app

## Prerequisites

| &nbsp; | Install | For using... |
| --- | --- | --- |
| &nbsp; | **Required** | &nbsp; |
| &nbsp; | Visual Studio version 17.3 | You can install the enterprise edition of Visual Studio, and install the "ASP.NET "workload and Microsoft Teams Development Tools. |
| &nbsp; | Teams Toolkit | A Visual Studio extension that creates a project scaffolding for your app. Use latest version. |
| &nbsp; | [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Microsoft Teams to collaborate with everyone you work with through apps for chat, meetings, call - all in one place. |
 | &nbsp; | [Prepare your Microsoft 365 tenant](../concepts/build-and-test/prepare-your-o365-tenant.md) | Access to Teams account with the appropriate permissions to install an app. |

## Create a new Teams app

The following steps help you to create a new app in Visual Studio:

1. Select **Create a new project** under **Get started** window when you launch Visual Studio.

   :::image type="content" source="../assets/images/Tools-and-SDK-revamp/Create-new-app-VS/vs-create-new-project1.png" alt-text="Create new project from get started":::

   You can also select **Continue without Code** to create a new project directly from the application.

   :::image type="content" source="../assets/images/Tools-and-SDK-revamp/Create-new-app-VS/vs-create-new-project1_1.png" alt-text="Create new project with code from get started":::

1. Select **File** > **New** > **Project**.

   :::image type="content" source="../assets/images/Tools-and-SDK-revamp/Create-new-app-VS/vs-create-new-project2_1.png" alt-text="Create new project from file menu":::

1. Search for Microsoft Teams app in the list.
1. Select **Microsoft Teams App** > **Next**.

   :::image type="content" source="../assets/images/Tools-and-SDK-revamp/Create-new-app-VS/vs-ms-teams-app_1.png" alt-text="Search and choose microsoft teams app":::

**Configure your new project** window is appeared.

1. Enter name for your project in **Project name**.
1. Select **Create**.

   :::image type="content" source="../assets/images/Tools-and-SDK-revamp/Create-new-app-VS/vs-ms-teams-app-project-name_1.png" alt-text="Name your application":::

**Create a new Teams Application** window is appeared.

1. Select the required type of Teams app for your project.
1. Select **Create**.

   :::image type="content" source="../assets/images/Tools-and-SDK-revamp/Create-new-app-VS/vs-ms-teams-app-type_2.png" alt-text="Select the teams app type":::

**Getting Started** with **Welcome to Teams Toolkit** window is appeared.

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/Create-new-app-VS/vs-getting-started-page.png" alt-text="Select the Getting Started teams toolkit":::

### Directory Structure

Teams Toolkit provides all components for building an app. After creating the project, you can view the project folders and files under Explorer.

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/Create-new-app-VS/vs-create-new-project-solution-explorer.png" alt-text="Select the Solution Explorer teams toolkit":::

## Teams app templates in Teams Toolkit for Visual Studio

You can see Teams app templates already populated in Teams Toolkit for various Teams app type. The following table lists all the templates available:

|Teams app template  |Description  |
|---------|---------|
|Notification Bot     |Notification Bot app can send notification to your Teams client, there are multiple ways to trigger the notification. For example, trigger the notification by HTTP request, or by time. You can also select triggered notification based on your business scenario.         |
|Command Bot     |Users can type a command to interact with the bot using the Command Bot app.         |
|Tab     |Tab app shows a webpage inside Teams, and it enables single sign-on using Teams account.         |
|Message Extension     |Message Extension app implements simple features like create adaptive card, search Nugget packages, unfurling links for "dev.botframework.com" domain.         |

> [!NOTE]
>After the project is created, Teams Toolkit automatically opens **Get started** window. You can now see the instructions in **Get started** window and check out the different features in Teams Toolkit.

## See also

* [Provision cloud resources using Visual Studio](provision-cloud-resources.md)
* [Deploy Teams app to the cloud using Visual Studio](deploy-teams-app.md)
