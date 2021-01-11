---
title: Get started - Build and run your first app
author: heath-hamilton
description: Quickly create a Microsoft Teams app that displays a "Hello, World!" message using the Microsoft Teams Toolkit.
ms.author: lajanuar
ms.date: 11/03/2020
ms.topic: quickstart
---
# Build and run your first Microsoft Teams app

You can jump right into Microsoft Teams development by building a personal tab that displays "Hello, World!"

## 1. Create your app project

Use the Microsoft Teams Toolkit in Visual Studio Code to set up your first app project.

1. In Visual Studio Code, select **Microsoft Teams** :::image type="icon" source="../assets/icons/vsc-toolkit.png"::: on the left Activity Bar and choose **Create a new Teams app**.
1. When prompted, sign in with your Microsoft 365 development account.
1. On the **Add capabilities** screen, select **Tab** then **Next**.
:::image type="content" source="../assets/images/build-your-first-app/choose-tab.png" alt-text="Screenshot showing how to configure your app project with the Visual Studio Code Teams Toolkit.":::
1. Enter a name for your Teams app. (This is the default name for your app and also the name of the app project directory on your local machine.)
1. Check only the **Personal tab** option and select **Finish** at the bottom of the screen to configure your project.

## 2. Understand important app project components

Once the toolkit configures your project, you have the components to build a basic personal tab for Teams. The project directories and files display in the Explorer area of Visual Studio Code.

:::image type="content" source="../assets/images/build-your-first-app/app-project-files.png" alt-text="Screenshot showing app project files for a personal tab in Visual Studio Code.":::

### App scaffolding

The toolkit automatically creates scaffolding for you in the `src` directory based on the capabilities you added during setup.

If you create a tab during setup, for example, the `App.js` file in the `src/components` directory is important because it handles the initialization and routing of your app. It calls the [Microsoft Teams JavaScript client SDK](../tabs/how-to/using-teams-client-sdk.md) to establish communication between your app and Teams.

### App ID

Your Teams app ID is needed to configure your app with App Studio. You can find the ID in the `teamsAppId` object, which is located in your project's `package.json` file.

## 3. Build and run your app

In the interest of time, you'll build and run your app locally.

(This information is also available in the toolkit `README`.)

1. In a terminal, go to the root directory of your app project and run `npm install`.
1. Run `npm start`.

Once complete, there's a **Compiled successfully!** message in the terminal. Your app is running on `https://localhost:3000`.

## 4. Sideload your app in Teams

Your app is ready to test in Teams. To do this, you must have an account that allows app sideloading. (If you aren't sure you have that, learn about getting a [Teams development account](../build-your-first-app/build-first-app-overview.md#set-up-your-development-account).)

> [!TIP]
> Before sideloading your app, check for issues using the [validation feature in App Studio](../concepts/deploy-and-publish/appsource/prepare/submission-checklist.md#teams-app-validation-tool), which is included in the toolkit. Errors must be fixed to successfully sideload the app.

1. In Visual Studio Code, press the **F5** key to launch a Teams web client.
1. To display your app content in Teams, specify that where your app is running (`localhost`) is trustworthy:
   1. Open a new tab in the same browser window (Google Chrome by default) which opened after pressing **F5**.
   1. Go to `https://localhost:3000/tab` and proceed to the page.
1. Go back to Teams. In the dialog, select **Add for me** to install your app.
:::image type="content" source="../assets/images/build-your-first-app/tab-running.png" alt-text="Screenshot showing an example 'Hello, World!' personal tab app running in Teams.":::

🎉 Congratulations! Your app is running in Teams.

## Next step

Expand on the personal tab you just created or build another type of Teams app.

> [!div class="nextstepaction"]
> [Add to your personal tab](../build-your-first-app/build-personal-tab.md)
> [!div class="nextstepaction"]
> [Build a channel tab](../build-your-first-app/build-channel-tab.md)
> [!div class="nextstepaction"]
> [Build a bot](../build-your-first-app/build-bot.md)
