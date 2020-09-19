---
title: Build and run a "Hello, World!" Teams app
author: heath-hamilton
description: Build and run your first Microsoft Teams app, a personal tab that displays "Hello, World!"
ms.author: lajanuar
ms.date: 09/22/2020
ms.topic: quickstart
---
# Build a "Hello, World!" Teams app

You can jump right into Microsoft Teams platform development by building a personal tab that displays "Hello, World!"

## Create your app project

Use the Microsoft Teams Toolkit in Visual Studio Code to set up your first app project.

1. In Visual Studio Code, select **Microsoft Teams** :::image type="icon" source="../assets/icons/vsc-toolkit.png"::: on the left Activity Bar and choose **Create a new Teams app**.
:::image type="content" source="../assets/images/build-your-first-app/create-teams-app.png" alt-text="create app image":::
1. Enter a name for your Teams app. (This is the default name for your app and also the name of the app project directory on your local machine.)
1. On the **Add capabilities** screen, select **Tab** then **Next**.
:::image type="content" source="../assets/images/build-your-first-app/choose-tab.png" alt-text="create teams app image":::
1. Check the **Personal tab** option and select **Finish** at the bottom of the screen to configure your project.

## Understand important app project components

Once the toolkit configures your project, you have the components to build a basic personal tab for Teams. The project directories and files display in the Explorer area of Visual Studio Code.

:::image type="content" source="../assets/images/build-your-first-app/app-project-files.png" alt-text="App project files in Visual Studio Code.":::

Let's take a moment to understand some of the key files Teams app developers work with.

### App manifest (`manifest.json`)

Located in the `.publish` directory, the app manifest is the starting point for any app project. The manifest defines your app's fundamental attributes and points to required resources. When you install an app, Teams parses the manifest to understand how to render your app in the client.

### App scaffolding

The toolkit automatically creates scaffolding for you in the `src` directory based on the capabilities you added during setup.

If you create a tab during setup, for example, the `App.js` file in the `src/components` directory is important because it handles the initialization and routing of your app. It calls the [Microsoft Teams SDK](../tabs/how-to/using-teams-client-sdk.md) to establish communication between your app and Teams.

### App package (`Development.zip`)

Located in the `.publish` directory, you need the app package to [sideload your app](../concepts/deploy-and-publish/overview.md#upload-your-app-directly) in Teams. The package is also used when [publishing to your organization's app catalog](../concepts/deploy-and-publish/overview.md#publish-to-your-organizations-app-catalog) or [AppSource](../concepts/deploy-and-publish/appsource/publish.md).

Here are some details about the app package files:

|Name|Type|Size|Manifest location|Toolkit filename|
|---|---|:---:|:---:|-----|
|**App manifest**|`.json`| — | — |`.publish/manifest.json`|
|**Color logo**|`.png`|192&times;192 pixels|`icon.color`|`.publish/color.png`|
|**Outline logo**|`.png`|32&times;32 pixels|`icon.outline`|`.publish/outline.png`|

## Run your app

In the interest of time, you'll build and run your app locally.

(This information is also available in the toolkit `README`.)

1. In a terminal, go to the root directory of your app project and run `npm install`.
1. Run `npm start`. Once complete, there's a **Compiled successfully!** message in the terminal.
1. Open a browser and go to `https://localhost:3000` to view a blank webpage called **Microsoft Teams Tab**. (Don't worry that you can't see any content on the page.)<br/>
   :::image type="content" source="../assets/images/build-your-first-app/local-host-tab.png" alt-text="Viewing the app in a browser.":::

## Set up a secure tunnel to your app

Your app is up and running on your local web server. To run your app in Teams, you must make your `localhost` accessible through HTTPS.

Install [ngrok](https://ngrok.com/download) if you haven't already. When you run this tool, you create two globally available URLs that point to your local web server (`http://localhost:3000`). You need the forwarding URL that begins with `HTTPS`.

1. Open a new terminal and run `ngrok http 3000`.
1. Copy the HTTPS URL you're provided (see the following example).
:::image type="content" source="../assets/images/build-your-first-app/ngrok-running.png" alt-text="ngrok running image":::
1. In your `.publish` directory, open `Development.env`.
1. Replace the `baseUrl0` value with the copied URL. (For example, change `baseUrl0=http://localhost:3000` to `baseUrl0=https://85528b2b3ba5.ngrok.io`.)

Your app manifest now points to where you're hosting the app.

## Sideload your app in Teams

With your app running and accessible via HTTPS, you're ready to upload it to Teams.

> [!TIP]
> Before sideloading your app, check for issues using the [toolkit's validation feature](../concepts/deploy-and-publish/appsource/prepare/submission-checklist.md#teams-app-validation-tool). Errors must be fixed to successfully sideload the app.

1. Log in to the Teams client with your account that allows app sideloading. (If you aren't sure you have that, learn about getting a [Teams development account](../build-your-first-app/building-real-world-app.md#set-up-your-development-account).)
1. Select **Apps**, then choose **Upload a custom app**.
1. Go to your app project `.publish` folder and select `Development.zip`. An install modal displays.
:::image type="content" source="../assets/images/build-your-first-app/add-teams-app.png" alt-text="add teams app":::
1. Select **Add** to install your app.
:::image type="content" source="../assets/images/build-your-first-app/tab-running.png" alt-text="Screenshot showing an example Hello, World! app in Teams.":::

🎉 Congratulations! Your app is running in Teams.

## Next step

Expand on the personal tab you just created or build another type of Teams app.

> [!div class="nextstepaction"]
> [Add to your personal tab](../build-your-first-app/build-personal-tab.md)
> [!div class="nextstepaction"]
> [Build a channel tab](../build-your-first-app/build-channel-tab.md)
> [!div class="nextstepaction"]
> [Build a bot](../build-your-first-app/build-bot.md)
