---
title: Build apps with the Microsoft Teams Toolkit and Visual Studio Code
description: Get started building great custom apps directly within Visual Studio Code with the Microsoft Teams Toolkit
keywords: teams visual studio code toolkit
localization_priority: Normal
ms.topic: overview
ms.author: lajanuar
---
# Build apps with the Teams Toolkit and Visual Studio Code

The Microsoft Teams Toolkit enables you to create custom Teams apps directly within the Visual Studio Code environment. The toolkit guides you through the process and provides everything you need to build, debug, and launch your Teams app.

## Installing the Teams Toolkit

The Microsoft Teams Toolkit for Visual Studio Code is available for download from the [Visual Studio Marketplace](https://aka.ms/teams-toolkit) or directly as an extension within Visual Studio Code.

> [!TIP]
> After installation, you should see the Teams Toolkit in the Visual Studio Code activity bar. If not, right-click within the activity bar and select **Microsoft Teams** to pin the toolkit for easy access.

## Using the toolkit

- [Set up a new project](#set-up-a-new-teams-project)
- [Import an existing project](#import-an-existing-teams-app-project)
- [Configure your app](#configure-your-app)
- [Package your app](#package-your-app)
- [Run your app locally or in Teams](#run-your-app)

## Set up a new Teams project

1. Create a workspace/folder for your project in your local environment.
1. In Visual Studio Code, select the Teams icon ![Teams icon](../assets/icons/favicon-16x16.png) from the activity bar on the left side of the window.
1. Select **Open the Microsoft Teams Toolkit** from the command menu.
1. Select **Create a new Teams app** from the command menu.
1. When prompted, enter the name of the workspace . This will be used as both the name of the folder where your project will reside, and the default name of your app.
1. Press **Enter** and you will arrive at the **Add capabilities** screen configure the properties for your new app.
1. Select the **Finish** button to complete the configuration process.

## Import an existing Teams app project

1. In Visual Studio Code, select the Teams icon ![Teams icon](../assets/icons/favicon-16x16.png) from the activity bar on the left side of the window.
1. Select **Import app package** from the command menu.
1. Choose your existing [Teams app package](../concepts/build-and-test/apps-package.md) zip file.
1. Choose the **Select publishing package** button. The configuration tab of the toolkit should now be populated with your app's details.
1. In Visual Studio Code, select **File** -> **Add Folder to Workspace** to add your source code directory to the Visual Studio Code workspace.

## Configure your app

At its core, the Teams app embraces three components:

  1. The Microsoft Teams client (web, desktop or mobile) where users interact with your app.
  1. A server that responds to requests for content that will be displayed in Teams, e.g., HTML tab content or a bot adaptive card .
  1. A Teams [app package](/concepts/build-and-test/apps-package.md) consisting of three files:

  > [!div class="checklist"]
  >
  > - The manifest.json 
  > - A [color icon](../resources/schema/manifest-schema.md#icons) for your app to display in the public or organization app catalog
 > - An [outline icon](../resources/schema/manifest-schema.md#icons) for display on the Teams activity bar.

When an app is installed, the Teams client parses the manifest file to determine needed information like the name of your app and the URL where the services are located.

1. To configure your app, navigate to the **Microsoft Teams Toolkit** tab in Visual Studio Code.
1. Select **Edit app package** to view the **App details** page.
1. Editing the fields in the App details page updates the contents of the manifest.json file that will ultimately ship as part of the app package. *See* [App Studio manifest editor](https://aka.ms/teams-toolkit-manifest)

## Package your app

Modifying the **app details** page, **manifest**, or **.env** files in your app's  **.publish** folder will automatically generate your **Development.zip** file. You'll need to include [two icons](../concepts/build-and-test/apps-package.md#app-icons) in that same folder.

## Install and run your app locally

## Run your app

### Install and run your app locally

Refer to the **Build and Run* content in your project homepage for detailed instructions on how to package and test your app. In general, you need to install your app's server, get it running, then setup a tunneling solution so that Teams can access content running from localhost.

### Enable development from localhost

If you wish to debug your tab based app on localhost using HTTPS, you will need to tell your browser to trust the app being served from <https://localhost>. Navigate to <https://localhost:3000/tab>. If you see a warning indicating that the site isn't trusted, choose the option to proceed anyway. Your app should now be accessible from the Teams client.

### Run your app in Teams

Prerequisites: [Enable Teams developer preview mode](https://aka.ms/teams-toolkit-enable-devpreview)

1. Navigate to the activity bar on the left side of the Visual Studio Code window.
1. Select the **Run** icon to display the **Run and Debug** view.
1. You can also use the keyboard shortcut `Ctrl+Shift+D`.

> [!div class="nextstepaction"]
> [Next step: Maintaining and supporting your published app](../concepts/deploy-and-publish/appsource/post-publish/overview.md)
