---
title: Create new Teams app using Visual Studio
description: Create new Teams app using Visual Studio
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/14/2022
---

# Create new Teams app using Visual Studio

## Microsoft Teams apps for Visual Studio

Teams Toolkit's extension for Visual Studio makes it easy to create new projects for Teams, automatically set up apps in Teams Developer Portal, run and debug in Teams, configure cloud hosting, and use [TeamsFx](https://github.com/OfficeDev/teamsfx) from your Integrated Development Environment (IDE).

## Create a new project

The Microsoft Teams app project template provide you all code, files, and configuration you need to get started with a Teams app project. The Microsoft Teams App project template allows you to specify a Microsoft 365 account that is required to automatically register and configure your new Teams app. For more information refer to Prepare your accounts.

1. Open the latest version of Visual Studio.
1. In the start window, choose **Create a new project**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/manual/visual-studio-create-project/create-new-project-types-option_v1.png" alt-text="create":::

1. In the **Search for templates** box, enter Microsoft Teams App.
1. Select the **Microsoft Teams App** template and select **Next**.
1. In the **Configure your new project** window, type or enter name of the **Project name** box and select select **Create**.
1. In the **Create a new Teams application** window, choose or sign in to a Microsoft 365 account using the **Choose an account** selector. Then, select **Create**.

Use Teams Toolkit to create your first project. The toolkit takes you through a series of pages to create and configure your Teams app project:

* Creating a new project page: You select the project type.
* Configure your new project page: You enter the project details.
* Create a new Teams application page: You select the Teams app capabilities and the Microsoft 365 credentials.
     
    :::image type="content" source="../assets/images/teams-toolkit-v2/manual/visual-studio-create-project/create-new-project-types-option_v1.png" alt-text="create project":::

    :::image type="content" source="../assets/images/teams-toolkit-v2/manual/visual-studio-create-project/configure-project.png" alt-text="configure project":::

    :::image type="content" source="../assets/images/teams-toolkit-v2/manual/visual-studio-create-project/create-new-teams-app.png" alt-text="create":::

1. Visual Studio opens up the new project and Teams Toolkit setup you new project in Teams Developer Portal. The project is added for the Teams organization linked to the Microsoft 365 account you chose in the steps above and create a new Azure Active Directory registration. This is required for the app to run in Teams.

## See Also
