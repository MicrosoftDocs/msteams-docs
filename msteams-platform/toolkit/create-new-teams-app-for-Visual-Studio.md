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

* Tab App
* Command Bot
* Notification Bot
* Message Extension App

## Prerequisites

| &nbsp; | Install | For using... |
| --- | --- | --- |
| &nbsp; | **Required** | &nbsp; |
| &nbsp; | Visual Studio version 17.3 | You can install the enterprise edition of Visual Studio, and install the "ASP.NET "workload and Microsoft Teams Development Tools. |
| &nbsp; | Teams Toolkit | A Visual Studio extension that creates a project scaffolding for your app. Use latest version. |
| &nbsp; | [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Microsoft Teams to collaborate with everyone you work with through apps for chat, meetings, call - all in one place. |
 | &nbsp; | [Prepare your Microsoft 365 tenant](../concepts/build-and-test/prepare-your-o365-tenant.md) | Access to Teams account with the appropriate permissions to install an app. |

1. Select **Create a new project** under **Get started** window when you launch Visual Studio.

   :::image type="content" source="../assets/images/Tools-and-SDK-revamp/Create-new-app-VS/vs-create-new-project1.png" alt-text="Create new project from get started":::

   You can also select **Continue without Code** to create a new project directly from the application.

   :::image type="content" source="../assets/images/Tools-and-SDK-revamp/Create-new-app-VS/vs-create-new-project1_1.png" alt-text="Create new project from get started":::

1. Select **File** menu > **New** > **Project**.

   :::image type="content" source="../assets/images/Tools-and-SDK-revamp/Create-new-app-VS/vs-create-new-project2_1.png" alt-text="Create new project from file menu":::

1. Search for teams to select Microsoft Teams app in the list.
1. Select **Microsoft Teams app**.
1. Select **Next**.

   :::image type="content" source="../assets/images/Tools-and-SDK-revamp/Create-new-app-VS/vs-ms-teams-app_1.png" alt-text="Search and choose microsoft teams app":::

1. In **Configure your new project** window, enter your project name in **Project name**.
1. Select **Create**.

   :::image type="content" source="../assets/images/Tools-and-SDK-revamp/Create-new-app-VS/vs-ms-teams-app-project-name_1.png" alt-text="Name your application":::

1. Select the type of Teams app you would like to create for your project.
1. Select the **Trigger Type**  default as **HTTP Trigger (Webapi Server) from the list.
1. Select **Create**.

   :::image type="content" source="../assets/images/Tools-and-SDK-revamp/Create-new-app-VS/vs-ms-teams-app-type_1.png" alt-text="Select the teams app type":::

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
