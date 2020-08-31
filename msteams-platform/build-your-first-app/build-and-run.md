---
title: Build and run your first Teams app
author: heath-hamilton
ms.author: heath-hamilton
description: Run your first Microsoft Teams app.
ms.date: 08/31/2020
ms.topic: quickstart
---
# Build and run your first Microsoft Teams app

You can jump right into developing on the Microsoft Teams platform by quickly building and running a basic app.

> [!NOTE]
> It's helpful to have working knowledge of JavaScript (specifically React) when following these tutorials.

## Set up your development account

To build apps for Teams, you need a Teams account that allows sideloading (your account may already provide this). If it doesn't, register for a Microsoft 365 developer subscription so you can get a test tenant.

1. Verify if you can sideload apps in Teams:
    1. In the Teams client, select **Apps**.
    1. Look for an option to **Upload a custom app**.

    :::image type="content" source="../assets/images/app-up-and-running/upload-custom-app-closeup.png" alt-text="Image of the custom app upload link in the Teams client.":::

1. If you have this option, you can start building. If not, do the following:
    1. Register for a [Microsoft 365 developer subscription](../concepts/build-and-test/prepare-your-o365-tenant.md).
    1. [Enable custom app sideloading](../concepts/build-and-test/prepare-your-o365-tenant.md#enable-custom-teams-apps-and-turn-on-custom-app-uploading) for your test account.

## Get your development tools

You can build Teams apps with your preferred tools, but here's what you need to get started quickly with Visual Studio Code and the Microsoft Teams Toolkit.

1. Install the latest version of [Visual Studio Code](https://code.visualstudio.com/download).
1. In Visual Studio Code, select **Extensions** :::image type="icon" source="../assets/icons/vs-code-extensions.png"::: on the left Activity Bar and install the **Microsoft Teams Toolkit**.
1. Install [Node.js](https://nodejs.org/en/).

## Create an app project

The Microsoft Teams Toolkit can help you set up your first app project.

1. In Visual Studio Code, open the toolkit by selecting the Teams icon :::image type="icon" source="../assets/icons/favicon-16x16.png"::: on the left Activity Bar.
1. Select **Create a new Teams app**.
1. When prompted, enter a name for your app. This is the default name for your app and also the name of the project directory on your local machine.
1. On the **Add capabilities** screen, select **Tab** then **Next**.
1. Check the **Personal tab** option and select **Finish** to configure your project.
:::image type="content" source="../assets/images/get-started/toolkit-add-tabs.png" alt-text="Example screenshot of using the Teams Toolkit to set up a project with personal tab scaffolding.":::

Once complete, you have the app scaffolding components for building a personal tab.

## Run your app

Follow the `README.md` in your project to build, run, and deploy your app to Teams. In general, these instructions help you do the following:

* Host your app on `localhost`.
* [Set up a secure tunnel with ngrok](../concepts/build-and-test/debug.md##locally-hosted) so that Teams can access your app.
* [Sideload your app](../concepts/deploy-and-publish/apps-upload) in the Teams client using the `Development.zip` in the `.publish` folder.

Once you sideload your app, it should look like this in the Teams client.

:::image type="content" source="../assets/images/app-up-and-running/tab-running.png" alt-text="Screenshot showing an example Hello, World! app in Teams.":::

## Important app project files

With your app project and scaffolding set up, take some time to understand some of the key files Teams app developers work with.

### App manifest (`manifest.json`)

Located in the `.publish` directory, the app manifest is the starting point for any app project. The manifest defines your app's fundamental attributes and points to required resources. When you install an app, Teams parses the manifest to understand how to render your app in the client.

In the following tutorials, you'll focus on the sections of the app manifest for building personal and channel tabs.

### Package (`Development.zip`)

Also located in the `.publish` directory, you need the app package to [sideload your app](../concepts/deploy-and-publish/overview.md#upload-your-app-directly) in Teams. It's also used when [publishing to your organization's app catalog](../concepts/deploy-and-publish/overview.md#publish-to-your-organizations-app-catalog) or [AppSource](../concepts/deploy-and-publish/appsource/publish.md).

Here are some details about the app package files:

|Name|Type|Size|Manifest location|Toolkit filename|
|---|---|:---:|:---:|-----|
|**App manifest**|`.json`| — | — |`.publish/manifest.json`|
|**Color logo**|`.png`|192&times;192 pixels|`icon.color`|`.publish/color.png`|
|**Outline logo**|`.png`|32&times;32 pixels|`icon.outline`|`.publish/outline.png`|

### Scaffolding (`src`)

The toolkit automatically creates scaffolding for you in the `src` directory based on the capabilities you added during setup.

Some files are created no matter what kind of app you have, though. For example, the `App.js` file in the `src/components` directory is important because it handles the initialization and routing of your app. Most importantly, it calls the [Microsoft Teams SDK](../tabs/how-to/using-teams-client-sdk.md) to establish communication between your app and Teams.

You can learn more about scaffolding in the tutorials for creating personal and channel tabs.

## Next step

🎉 Congratulations! You have a running Teams app. Select the following button to learn how to add a real-world feature to it.

> [!div class="nextstepaction"]
> [Build a personal tab](../build-your-first-app/add-personal-tab.md)
