---
title: Get started - Build and run your first app
author: girliemac
description: Quickly create a Microsoft Teams app that displays a "Hello, World!" message using the Microsoft Teams Toolkit.
ms.author: lajanuar
ms.date: 03/12/2021
ms.topic: quickstart
---
# Build and run your first Microsoft Teams app

Start Microsoft Teams development by building a personal tab that displays "Hello, World!".
Build and run your first Teams app using the following steps:

## 1. Set up your development environment with Visual Studio Code

If you don’t have an account that allows app sideloading or haven’t installed your required tools, see [overview and prerequisite](../build-first-app-overview) before you begin.  

You can build Teams apps with your preferred tools, but these lessons show how you can get started quickly with the Microsoft Teams Toolkit for Visual Studio Code (VS Code).  

If you haven’t already using, install the latest version of [Visual Studio Code](https://code.visualstudio.com/download). (Earlier versions might not work with the toolkit.) 

Launch VS Code and now install an extension that helps you develop Teams apps.  

Select **Extensions** :::image type="icon" source="../assets/icons/vs-code-extensions.png"::: on the left Activity Bar and install the **Microsoft Teams Toolkit**: 

:::image type="content" source="../assets/images/build-your-first-app/vscode-teams-toolkit-01.png" alt-text="Screenshot showing how to install Teams Toolkit on Visual Studio Code":::


## 2. Create your app project

Select **Microsoft Teams Toolkit** :::image type="icon" source="../assets/icons/vsc-toolkit.png"::: on the left Activity Bar and choose Create a new Teams app: 

:::image type="content" source="../assets/images/build-your-first-app/vscode-teams-toolkit-02.png" alt-text="Screenshot showing how to configure your app project with the Visual Studio Code Teams Toolkit.":::

When prompted, sign in with your Microsoft 365 development account that [you previously have set up](../build-your-first-app/build-first-app-overview#set-up-your-development-account). 

On the **Select project** screen, select **Personal app** > **JavaScript** then Next: 

:::image type="content" source="../assets/images/build-your-first-app/vscode-teams-toolkit-03.png" alt-text="Screenshot showing how to configure your app project with the Visual Studio Code Teams Toolkit.":::

Enter a name for your Teams app and select **Finish** at the bottom of the screen to configure, then save your project on your local machine: 

:::image type="content" source="../assets/images/build-your-first-app/vscode-teams-toolkit-04.png" alt-text="Screenshot showing how to configure your app project with the Visual Studio Code Teams Toolkit.":::

## 3. Understand app project components

Once the toolkit configures your project, you have the components to build a basic personal tab for Teams. The project directories and files display in the Explorer area of Visual Studio Code. 

:::image type="content" source="../assets/images/build-your-first-app/vscode-teams-toolkit-05.png" alt-text="Screenshot showing how to configure your app project with the Visual Studio Code Teams Toolkit.":::

The toolkit automatically creates an app scaffold for you in the `src` directory based on the capabilities you added during setup. 

If you create a tab during setup, for example, the `App.js` file in the `src/components` directory is important because it handles the initialization and routing of your app. It calls the [Microsoft Teams JavaScript client SDK](https://docs.microsoft.com/en-us/microsoftteams/platform/tabs/how-to/using-teams-client-sdk) to establish communication between your app and Teams. 

## 4. Build and run your app

Build and run your app locally to try out the sample app. The process is also available in the toolkit `README`. Build and run your app using the following steps: 

1. Open a terminal (In VS Code, **View** > **Terminal**)  
1. Run `npm install`
1. Run `npm start`

Once complete, there's a **Compiled successfully!** message in the terminal. Your app is now running on your localhost at `https://localhost:3000`. 


## 5. Sideload your app in Teams

Your app is ready to test in Teams. To be able to sideload apps in Teams: 

* You have a Teams account and with admin access 

or

* You have a Microsoft 365 development account that allows app sideloading (for more information on account opening, see [Teams development account](../build-first-app-overview#set-up-your-development-account)) 

Also, you must have enabled sideloading. Follow the steps in [Turn on app sideloading](../concepts/build-and-test/prepare-your-o365-tenant#enable-custom-teams-apps-and-turn-on-custom-app-uploading). 

> [!TIP]
> Check for issues before sideloading your app, using the [validation feature in App Studio](../concepts/deploy-and-publish/appsource/prepare/submission-checklist.md#teams-app-validation-tool), which is included in the toolkit. Fix the errors to successfully sideload the app.

Once you are ready, click **App Studio** from Teams Toolkit in VS Code.  

Click **Test and Distribute** then click **Install** button. It will give you warning messages because you are currently running the app in localhost. Ignore the messages for now (but eventually, you will need to host your app in a web service).  

:::image type="content" source="../assets/images/build-your-first-app/vscode-teams-toolkit-appstudio.png" alt-text="Screenshot showing how to sideload your app to Teams client with the Visual Studio Code Teams Toolkit.":::

Alternatively, you can skip the installation process in **App Studio** by pressing **F5** key to open browser window (Google Chrome by default) to install! 

Once the installation modal is opened on Teams client in browser, click **Add** to install your app to Teams. 

:::image type="content" source="../assets/images/build-your-first-app/vscode-teams-toolkit-install.png" alt-text="Screenshot showing how to sideload your app to Teams client with the Visual Studio Code Teams Toolkit.":::

🎉 Congratulations! Your app is running in Teams.

:::image type="content" source="../assets/images/build-your-first-app/teams-client-helloworld.png" alt-text="Screenshot showing a sideloaded app on Teams client in a browser window.":::

> [!TIP]
> App Studio is also available as a stand-alone app for Teams client. Read [Quickly develop apps with App Studio for Microsoft Teams](../concepts/build-and-test/app-studio-overview). 

## Next step

Expand on the personal tab you just created or build another type of Teams app.

> [!div class="nextstepaction"]
> [Add to your personal tab](../build-your-first-app/build-personal-tab.md)

> [!div class="nextstepaction"]
> [Build a channel tab](../build-your-first-app/build-channel-tab.md)

Or try building a bot. 

> [!div class="nextstepaction"]
> [Build a bot](../build-your-first-app/build-bot.md)
