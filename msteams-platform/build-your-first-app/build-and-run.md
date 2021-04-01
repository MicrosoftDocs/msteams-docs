---
title: Get started - Build and run your first app
author: girliemac
description: Quickly create a Microsoft Teams app that displays a "Hello, World!" message using the Microsoft Teams Toolkit.
ms.author: timura
ms.date: 03/22/2021
ms.topic: quickstart
---
# Build and run your first Microsoft Teams app

This tutorial teaches you to build and run your firt Microsoft Teams app. You will be creating a personal tab that displays "Hello, World!". 

## Prerequisites

You have to set up your development environment by setting up your development tenant and installing the required development tools. Follow the steps in this section to set it up.

### Set up your Teams development tenant

A **tenant** is like a space, or a container for your organization in Teams, where you chat, share files, and run meetings. This is also where you can sideload and test your apps. Let’s verify if you are ready to develop with the tenant or create a new tenant for developing and testing. 

_Do you already have a tenant, and do you have the admin access? If yes to both:_

Verify if you can sideload apps in Teams: 
1. In the Teams client, select **Apps**. 
1. Look for an option to **Upload a custom app**. 

    :::image type="content" source="../assets/images/build-your-first-app/upload-custom-app-closeup.png" alt-text="Illustration showing where in Teams you can upload a custom app.":::
    
_Did you answer no, or just want to create a test account anyway:_

Join the Microsoft 365 developer program and get a free Teams test account that allows app sideloading. (The registration process takes approximately two minutes.)

1. Access the [Microsoft 365 developer program](https://developer.microsoft.com/microsoft-365/dev-program).
1. Select **Join Now** and follow the onscreen instructions.
1. Select **Set up E5 subscription** in the Welcome screen.
1. Set up your administrator account. Once you finish, you should see a screen like this.
    :::image type="content" source="../assets/images/build-your-first-app/dev-program-subscription.png" alt-text="Example of what you see after signing up for the Microsoft 365 developer program.":::
1. Log in to Teams using the administrator account you just set up. Verify if you now have the **Upload a custom app** option.

> [!Note]
> If you still can't sideload apps, see [enable custom Teams apps and turn on custom app uploading](https://docs.microsoft.com/microsoftteams/platform/concepts/build-and-test/prepare-your-o365-tenant#enable-custom-teams-apps-and-turn-on-custom-app-uploading).

### Install your development tools

The Get Started lessons show how how to get started quickly with the Microsoft Teams Toolkit for Visual Studio Code. However, you can build Teams apps with your preffered tools as well.

1. Install [Node.js](https://nodejs.org/en/).
1. Install [ngrok](https://ngrok.com/download) if you plan to build a bot or messaging extension.
1. Install the latest version of [Visual Studio Code](https://code.visualstudio.com/download). (Earlier versions might not work with the toolkit.)
1. Select **Extensions** :::image type="icon" source="../assets/icons/vs-code-extensions.png"::: on the left Activity Bar and install the **Microsoft Teams Toolkit** in the Visual Studio Code.

    :::image type="content" source="../assets/images/build-your-first-app/vsc-install-toolkit.png" alt-text="Illustration showing where in Visual Studio Code you can install the Microsoft Teams Toolkit extension.":::

Teams displays app content only through HTTPS connections. To debug certain types of apps locally, such as a bot, you'll learn how to use [ngrok to set up a secure tunnel](../concepts/build-and-test/debug.md#locally-hosted) between Teams and your app. (Production Teams apps are hosted in the cloud.)


## Create your app project

1. Select **Microsoft Teams Toolkit** :::image type="icon" source="../assets/icons/vsc-toolkit.png"::: on the left Activity Bar and select **Create a new Teams app**.

    :::image type="content" source="../assets/images/build-your-first-app/vscode-teams-toolkit-02.png" alt-text="Screenshot showing how to create your app project with the Visual Studio Code Teams Toolkit.":::

1. Sign in with your Microsoft 365 development account that [you previously have set up](../build-your-first-app/build-first-app-overview.md). 
1. Select **JS** (JavaScript) On the **Select project** screen and click **Next**.

    :::image type="content" source="../assets/images/build-your-first-app/vscode-teams-toolkit-03.png" alt-text="Screenshot showing how to configure your app project with the Visual Studio Code Teams Toolkit.":::

1. Enter a name for your Teams app and select **Finish** at the bottom of the screen to configure your project. 
1. Save your project on your local machine.

    :::image type="content" source="../assets/images/build-your-first-app/vscode-teams-toolkit-04.png" alt-text="Screenshot showing how to add a name to your app project with the Visual Studio Code Teams Toolkit.":::

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
* You have a Microsoft 365 development account that allows app sideloading (for more information on account opening, see [Teams development account](../build-your-first-app/build-first-app-overview.md)) 

* You must enable sideloading. Follow the steps in [Turn on app sideloading](../concepts/build-and-test/prepare-your-o365-tenant.md#enable-custom-teams-apps-and-turn-on-custom-app-uploading). 

> [!TIP]
> Check for issues before sideloading your app, using the [validation feature in App Studio](../concepts/deploy-and-publish/appsource/prepare/submission-checklist.md#teams-app-validation-tool), which is included in the toolkit. Fix the errors to successfully sideload the app.
Once you are ready, follow these steps:

1. Select **App Studio** from Teams Toolkit in VS Code.  
1. Click **Test and Distribute** and select **Install**. A warning message message is displayed because you are currently running the app in localhost. You can ignore the warning for now (but eventually, you will need to host your app in a web service).  

    :::image type="content" source="../assets/images/build-your-first-app/vscode-teams-toolkit-appstudio.png" alt-text="Screenshot showing how to sideload your app to Teams client with the Visual Studio Code Teams Toolkit.":::

You can also skip the installation process in **App Studio** by pressing **F5** key to open browser window (Google Chrome by default) to install!. Once the installation modal is opened on Teams client in browser, click **Add** to install your app to Teams. 

    :::image type="content" source="../assets/images/build-your-first-app/vscode-teams-toolkit-install.png" alt-text="Screenshot showing how to sideload your app to Teams client.":::

> [Note]
> App Studio is also available as a stand-alone app for Teams client. Read [Quickly develop apps with App Studio for Microsoft Teams](../concepts/build-and-test/app-studio-overview.md). 
> 

## Troubleshoot App Studio

### Installation failed

If a *Something went wrong* or *Manifest parsing has failed* error message is displayed while installing your app, check if you have entered the app informatiom correctly. 
* Click **App Studio** > **app Details** in Microsoft Teams Toolkit, and check if you have all the required information.
* Check **App Manifest** in App Studio to see if the JSON is well-formed if you have manually edited the manifest.json file.

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
