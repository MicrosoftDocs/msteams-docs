---
title: Get started - Build and run your first app
author: girliemac
description: Quickly create a Microsoft Teams app that displays a "Hello, World!" message using the Microsoft Teams Toolkit.
ms.author: timura
ms.date: 03/22/2021
ms.topic: quickstart
---
# Build and run your first Microsoft Teams app

Start Microsoft Teams development by building a personal tab that displays "Hello, World!".
Build and run your first Teams app using the following steps:

## Set up your development environment with Visual Studio Code

* Before you begin, ensure that you have an an account that allows app sideloading and you have the required tools installed, see [overview and prerequisite](../build-your-first-app/build-first-app-overview.md.
* Ensure that you have installed the latest version of [Visual Studio Code](https://code.visualstudio.com/download). (Earlier versions might not work with the toolkit.) You can build Teams apps with your preferred tools, but these lessons show how you can get started quickly with the Microsoft Teams Toolkit for Visual Studio Code (VS Code).  
* Launch VS Code and now install an extension that helps you develop Teams apps.  
Select **Extensions** on the left Activity Bar and install the **Microsoft Teams Toolkit**.

## Create your app project

1. Select **Microsoft Teams Toolkit** :::image type="icon" source="../assets/icons/vsc-toolkit.png"::: on the left Activity Bar and choose **Create a new Teams app**.
1. When prompted, sign in with your Microsoft 365 development account that [you previously have set up](../build-your-first-app/build-first-app-overview.md#set-up-your-development-account). 
1. On the **Select project** screen, at **Personal app**, click **JS** (JavaScript).
1. Enter a name for your Teams app and select **Finish** at the bottom of the screen to configure your project. Save your project on your local machine.

## Understand app project components

* Once the toolkit configures your project, you have the components to build a basic personal tab for Teams. The project directories and files display in the Explorer area of the Visual Studio Code. 
:::image type="content" source="../assets/images/build-your-first-app/vscode-teams-toolkit-05.png" alt-text="Screenshot showing the scaffolding in your app project with the Visual Studio Code Teams Toolkit.":::
* The toolkit automatically creates an app scaffold for you in the `src` directory based on the capabilities you added during setup. 
If you create a Tab during setup, for example, the `App.js` file in the `src/components` directory handles the initialization and routing of your app. It calls the [Microsoft Teams JavaScript client SDK](../tabs/how-to/using-teams-client-sdk.md) to establish communication between your app and Teams. 

## Build and run your app

Build and run your app locally to try out the sample app. The information is also available in the toolkit `README`. Build and run your app using the following steps: 

1. Open a terminal (In VS Code, **View** > **Terminal**)  
1. Run `npm install`
1. Run `npm start`

Once complete, a **Compiled successfully!** message is displayed in the terminal. Your app is now running on your localhost at `https://localhost:3000`. 

## Sideload your app in Teams

Your app is ready to test in Teams. To be able to sideload apps in Teams: 

* You have a Teams account and with admin access 
or
* You have a Microsoft 365 development account that allows app sideloading (for more information on account opening, see [Teams development account](../build-your-first-app/build-first-app-overview.md#set-up-your-development-account)) 

Also, you must have enabled sideloading. Follow the steps in [Turn on app sideloading](../concepts/build-and-test/prepare-your-o365-tenant.md#enable-custom-teams-apps-and-turn-on-custom-app-uploading). 

> [!TIP]
> Check for issues before sideloading your app, using the [validation feature in App Studio](../concepts/deploy-and-publish/appsource/prepare/submission-checklist.md#teams-app-validation-tool), which is included in the toolkit. Fix the errors to successfully sideload the app.

1. Once you are ready, click **App Studio** from Teams Toolkit in VS Code.  
1. Click **Test and Distribute** and select **Install**. It will give you warning messages because you are currently running the app in localhost. You can ignore the messages for now (but eventually, you will need to host your app in a web service).  

:::image type="content" source="../assets/images/build-your-first-app/vscode-teams-toolkit-appstudio.png" alt-text="Screenshot showing how to sideload your app to Teams client with the Visual Studio Code Teams Toolkit.":::

Alternatively, you can skip the installation process in **App Studio** by pressing **F5** key to open browser window (Google Chrome by default) to install! 

Once the installation modal is opened on Teams client in browser, click **Add** to install your app to Teams. 

:::image type="content" source="../assets/images/build-your-first-app/vscode-teams-toolkit-install.png" alt-text="Screenshot showing how to sideload your app to Teams client.":::

🎉 Congratulations! Your app is now running in Teams.

> [!TIP]
> App Studio is also available as a stand-alone app for Teams client. Read [Quickly develop apps with App Studio for Microsoft Teams](../concepts/build-and-test/app-studio-overview.md). 
> 

## Troubleshoot App Studio Installation

### Installation failed

If you get a *Something went wrong* or *Manifest parsing has failed* error message while installing your app, check if you have entered the app informatiom correctly. 
* Go to Teams Toolkit, click **App Studio** > **app Details**, and check if you have all the required information.
* If you have manually edited the manifest.json file, check **App Manifest** in App Studio to see if the JSON is well-formed.

### Tab content not displayed

Check if your web app is running. If not, go to terminal and run **npm start**.

## Next step

Expand on the personal tab you just created or build another type of Teams app.

> [!div class="nextstepaction"]
> [Add to your personal tab](../build-your-first-app/build-personal-tab.md)

> [!div class="nextstepaction"]
> [Build a channel tab](../build-your-first-app/build-channel-tab.md)

Or try building a bot. 

> [!div class="nextstepaction"]
> [Build a bot](../build-your-first-app/build-bot.md)
