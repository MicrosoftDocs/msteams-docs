---
title: Create a new Teams app using Teams Toolkit
author: zyxiaoyuer
description: In this module, learn how to create a new Teams app using Teams Toolkit.
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/14/2022
---
# Create a new Teams project using Teams Toolkit in Visual Studio

In this article, learn how to create a new Teams project using Microsoft Visual Studio.

Teams Toolkit provides Microsoft Teams app templates in Visual Studio to create Teams apps.  You can search and select the Teams app template that you require when you create a new project. Teams Toolkit for Visual Studio provides Teams app templates for creating:

* Tab app
* Command bot
* Notification bot
* Message Extension app

## Prerequisites

| &nbsp; | Install | For using... |
| --- | --- | --- |
| &nbsp; | **Required** | &nbsp; |
| &nbsp; | Visual Studio latest version | You can install the enterprise edition of Visual Studio, and then select the **ASP.NET and web development** workload and **Microsoft Teams Development Tools** for installing.|
| &nbsp; | Teams Toolkit | A Visual Studio workload that creates a project scaffolding for your app. Use latest version. |
| &nbsp; | [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Microsoft Teams to sideload your Teams app into local Teams environment for testing app behavior. |
 | &nbsp; | [Prepare your Microsoft 365 tenant](~/concepts/build-and-test/prepare-your-o365-tenant.md) | Access to Microsoft 365 account with the appropriate permissions to install an app. |

## Create a new Teams app

The steps to create a new Teams app are similar for all types of apps except notification bot. The following steps help you to create a new tab app:

1. Open Visual Studio.
1. Create a new project by using one of the following two options:

    * Select **Create a new project** under **Get started** to select a project template.
    * Select **Continue without Code** to open Visual Studio without selecting a Teams Toolkit template.

      :::image type="content" source="images/vs-create-new-project1_1_2-v4.png" alt-text="Create new project with code from get started":::

    * If your open Visual Studio code without selecting a Teams Toolkit template, select **File > New > Project** in Visual Studio to create a Teams app.

       :::image type="content" source="images/vs-create-new-project2_1_2-v4.png" alt-text="Create new project from file menu":::

    * The **Create a new project** window appears.  

1. Enter **teams** in the search box and then list, select **Microsoft Teams App** from the search results.

   :::image type="content" source="images/visual-studio-v4.png" alt-text="Search and choose microsoft teams app":::

1. Select **Next**.

   The **Configure your new project** window appears.

     :::image type="content" source="images/vs-ms-teams-app-project-name_1_2-v4.png" alt-text="Name your application":::

    1. Enter a suitable name for your project.

         > [!NOTE]
         > The project name you are entering is automatically filled in the **Solution name**. If you want, you can change the solution name with no effect on the project name.

    1. Select the folder location where you want to create the project workspace.
    1. Enter a different solution name, if you want.
    1. If required, select the checkbox to save the project and solution in the same folder. For this tutorial, you don't need this option.
    1. Select **Create**.

   The **Create a new Teams application** window appears.

1. Ensure **Tab** is selected, then select **Create**.

   > [!NOTE]
   > If you want to add single sign-on capability to your Teams app, select the Configure with single sign-on checkbox. For more information on single sign-in in Teams app created using Teams Toolkit, see [Add single sign-on to your Teams apps](/microsoftteams/platform/toolkit/add-single-sign-on?pivots=visual-studio).

   :::image type="content" source="images/vs-ms-teams-app-type_3_1-v4.png" alt-text="Select the teams app type":::

You can select any type of Teams app for your project.

   The **GettingStarted .txt** window appears.

   :::image type="content" source="images/vs-getting-started-page_1-v4.png" alt-text="Select the Getting Started teams toolkit":::

You have created the app project scaffolding for your Teams app using Teams Toolkit template.

### Directory Structure

Teams Toolkit provides all components for building an app. After creating the project, you can view the project folders and files under **Solution Explorer**.

* **Directory structure for basic Teams apps**

  :::image type="content" source="images/vs-create-new-project-solution-explorer_1_3-v4.png" alt-text="Select the tab Solution Explorer teams toolkit":::

* **Directory structure for scenario-based Teams apps**

  :::image type="content" source="images/vs-create-new-project-solution-explorer_2-v4.png" alt-text="Select the Solution Explorer teams toolkit":::

## Teams app templates in Teams Toolkit for Visual Studio

You can see Teams app templates already populated in Teams Toolkit for various Teams app types. The following table lists all the templates available:

|Teams app templates  |Description  |
|---------|---------|
|**Notification Bot**     |Notification bot app can send notifications to your Teams client. There are multiple ways to trigger the notification. For example, trigger the notification by HTTP request, or by time. You can select triggered notification based on your business scenario.         |
|**Command Bot**     |You can type a command to interact with the bot using the command bot app.         |
|**Tab**     |Tab app shows a webpage inside Teams, and it enables single sign-on (SSO) using Teams account.         |
|**Message Extension**     |Message extension app implements simple features like creating an Adaptive Card, searching Nugget packages, unfurling links for the `dev.botframework.com` domain.         |

After the project is created, Teams Toolkit automatically opens **GettingStarted** window. You can see the instructions in **GettingStarted** window and check out the different features in Teams Toolkit.

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals-vs.md)
* [Build a Teams app with Blazor](~/sbs-gs-blazorupdate.yml)
* [Build a Teams app with C# or .NET](~/sbs-gs-csharp.yml)
* [Prerequisites for all types of environment and create your Teams app](tools-prerequisites-v4.md)
* [Prepare to build apps using Microsoft Teams Toolkit](build-environments-v4.md)
* [Provision cloud resources using Visual Studio](provision-vs.md)
* [Deploy Teams app to the cloud using Visual Studio](deploy-vs.md#deploy-teams-app-to-the-cloud-using-visual-studio)
