---
title: Create Teams App with Teams Toolkit
author: zyxiaoyuer
description: Learn how to create Teams app in Visual Studio using templates, its prerequisites, directory structure, and teams app template available in Teams Toolkit.
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/14/2022
---
# Create a new Microsoft Teams project using Microsoft Teams Toolkit

You can create Teams apps in Visual Studio using the app templates. You can search and select any of the following Teams template to create a new app.

* Bot
* Tab
* Message Extension

## Prerequisites

| &nbsp; | Install | For using... |
| --- | --- | --- |
| &nbsp; | Visual Studio latest version | Install the latest enterprise edition of Visual Studio, and select the **ASP.NET and web development** workload and **Microsoft Teams Development Tools** for installation. |
| &nbsp; | Teams Toolkit | A Visual Studio workload that creates a project scaffolding for your app. Use the latest version. |
| &nbsp; | [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Microsoft Teams to upload your Teams app into local Teams environment for testing app behavior. |
 | &nbsp; | [Prepare your Microsoft 365 tenant](~/concepts/build-and-test/prepare-your-o365-tenant.md) | Access to Microsoft 365 account with the appropriate permissions to install an app. |

## Create a new Teams app

To create a new Teams app, follow the steps:  

1. Open **Visual Studio**.
1. Create a new app by using one of the following two options:

    * Select **New project** under **Quick actions** to select a project template.

      :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/new-project-vs.png" alt-text="Screenshot shows the selection of new project from quick actions.":::

    * Select **File > New > Project**.

       :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/file-new-project.png" alt-text="Screenshot shows the selection of new project from file menu.":::

      The **Create a new project** window appears.  

1. Enter **Teams** in the search box and from search results, select **Microsoft Teams App**.

1. Select **Next**.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/new-project-template-vs.png" alt-text="Screenshot shows the search and select Microsoft Teams app." lightbox="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/new-project-template-vs.png":::

   The **Configure your new project** window appears.

    1. Enter a suitable name for your project.

         > [!NOTE]
         >
         > * The project name you enter is updated in the **Solution name** field. You can change the solution name with no effect on the project name.
         > * You can select the **Place solution and project in the same directory** checkbox to save the project and solution in the same folder.

    1. Select the folder location where you want to create the project workspace.
    1. Select **Create**.

        :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/teams-app-project-name.png" alt-text="Screenshot shows the configure the project name of your application.":::

   The **Create a new Teams application** window appears.

1. Ensure **Tab** is selected, then select **Create**.

   You can select any type of Teams app for your project.

   > [!NOTE]
   > If you want to add single sign-on (SSO) capability to your Teams app, select the **Configure with single sign-on** checkbox. For more information, see [how to add single sign-on to your Teams apps](/microsoftteams/platform/toolkit/add-single-sign-on?pivots=visual-studio).

   :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/create-new-app-vs.png" alt-text="Screenshot shows the selection of teams app type." lightbox="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/create-new-app-vs.png":::

   The **GettingStarted .txt** tab appears. You can see the instructions in **GettingStarted** window and check out the different features in Teams Toolkit.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/get-started-vs.png" alt-text="Screenshot shows the Getting Started teams toolkit page." lightbox="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/get-started-tab-vs.png":::

You have created the app project scaffolding for your Teams app using Teams Toolkit template.

The steps to create the other apps are similar except notification bot.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Create+a+new+Teams+app&author=%40zyxiaoyuer&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftoolkit%2Ftoolkit-v4%2Fcreate-new-project-vs%23create-a-new-teams-app&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftoolkit%2Ftoolkit-v4%2Fcreate-new-project-vs.md&documentVersionIndependentId=636eddbd-a2e1-03a3-6bd3-eb6b2b39ef68&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

### Directory Structure

Teams Toolkit provides all components for building an app. After you're created the project, you can view the project folders and files under **Solution Explorer**.

* Directory structure for a basic Teams app

  :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/basic-app-directory.png" alt-text="Screenshot shows the tab Solution Explorer teams toolkit for basic tab.":::

* Directory structure for a scenario-based Teams app

  :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/scenario-based-directory.png" alt-text="Screenshot shows the scenario based Solution Explorer teams toolkit.":::

## Teams app templates in Teams Toolkit

You can see Teams app templates already populated in Teams Toolkit for various Teams app types. The following table lists all the templates available:

|Teams app templates |Description  |
|---------|---------|
|**Notification Bot**     |You can use the notification bot app to send notifications to your Teams client. There are multiple ways to trigger the notification. For example, trigger the notification by HTTP request, or by time. You can select triggered notification based on your business scenario.         |
|**Command Bot**     |You can type a command to interact with the bot using the command bot app.         |
|**Workflow Bot**     |You can interact with the bot using automate repetitive workflow action.         |
|**Tab**     |Tab app shows a webpage inside Teams, and it enables SSO using Teams account.         |
|**Message Extension**     |The message extension app implements simple features such as creating an Adaptive Card, searching NuGet packages, or unfurling links for the `dev.botframework.com` domain.         |

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals-vs.md)
* [Build a Teams app with Blazor](~/sbs-gs-blazorupdate.yml)
* [Build a Teams app with C# or .NET](~/sbs-gs-csharp.yml)
* [Prerequisites for all types of environment and create your Teams app](tools-prerequisites-vs.md)
* [Prepare to build apps using Microsoft Teams Toolkit](build-environments-vs.md)
* [Provision cloud resources using Visual Studio](provision-vs.md)
* [Deploy Teams app to the cloud using Visual Studio](deploy-vs.md)
