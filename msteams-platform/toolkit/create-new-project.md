---
title: Create new project
author: Rajeshwari-v
description:  Describes about creating project
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: Create new project
---

# Create a new app

To build app, you can use Teams toolkit either by creating a new project or by creating from samples.

(pictures used in this part is already in doc repo)

**To create new project**

1. Open Visual Studio code.
1. Open Teams Toolkit and select **Teams**:

:::image type="content" source="../assets/images/teams-toolkit-v2/sidebar-icon.png" alt-text="The Teams Icon in the Visual Studio Code sidebar.":::

1. Select **Create a new Teams app**.

:::image type="content" source="../assets/images/teams-toolkit-v2/create-project.png" alt-text="Location of the Create New Project link in the Teams Toolkit sidebar.":::

1. Select Create a new Teams app.

:::image type="content" source="../assets/images/teams-toolkit-v2/create-new-project-intro.png" alt-text="Wizard start for Create New Project":::

1. To add capabilities, select the required app capabilities. You can select multiple capabilities. Fore more information on different capabilities, see 

:::image type="content" source="../assets/images/teams-toolkit-v2/create-project-capabilities.png" alt-text="Screenshot showing how to add capabilities to your new app.":::

1. In the Frontend hosting type section, select Azure. If you want to host your app in SharePoint, you can select SharePoint Framework(SPFx).

:::image type="content" source="../assets/images/teams-toolkit-v2/create-project-hosting.png" alt-text="Screenshot showing how to select hosting for your new app.":::

1. If you select Azure, you will jump to Cloud resource section. Select OK if you do not want to add any cloud resources at this time. While if you need additional cloud resources for your application, you can choose to `Add cloud resources` later when you want.

:::image type="content" source="../assets/images/teams-toolkit-v2/create-project-cloud-resources.png" alt-text="Screenshot showing how to add cloud resources for your new app.":::

1. In the Programming Language section, select JavaScript or TypeScript.

:::image type="content" source="../assets/images/teams-toolkit-v2/create-project-programming-languages.png" alt-text="Screenshot showing how to select the programming language.":::

1. If you select SharePoint Framework, select a frontend framework in next section.

:::image type="content" source="../assets/images/teams-toolkit-v2/spfx-which-framework.png" alt-text="Select Framework":::

1. You will be asked to Webpart name and Webpart description, please enter a name and a description as you like.

1. Select a workspace folder. A folder is created within your workspace folder for the project you are creating.

1. Enter a suitable name for your app, like helloworld. The name of the app must consist only of alphanumeric characters. Press Enter to continue.
 
1. Your hello world Teams app is created within a few seconds.

## Create from samples

If you do not want to start with hello world application, you can try to explore sample gallery and find something you are interested to start your own work with. Open the the Teams Toolkit for Visual Studio Code. Go to the `DEVELOPMENT` section in Tree View, click on `View samples`.

:::image type="content" source="../assets/images/teams-toolkit-v2/view-sampels.png" alt-text="view samples text":::

You will be redirect to sample gallery where you can explore samples and download them to play with.

:::image type="content" source="../assets/images/teams-toolkit-v2/view-sampels_screen.png" alt-text="view samples image":::

There is another way to open sample app. Go to the `DEVELOPMENT` section in Tree View, click on `Create new project` and select `Start from samples`. Then select one from the sample list. You can explore sample code and start development from samples then.  

Each sample can run to preview in Teams web client. You can achieve this easily by following the instructions of each sample. Once you downloaded a sample app, an instruction file will be automatically showed up in VS Code. Read it to run the sample.

## See also

[Add links to required sections]