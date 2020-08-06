---
title: Build and run your first Teams app
author: heath-hamilton
description: Run your first Microsoft Teams app.
---
# Build and run your first Microsoft Teams app

You can jump right into developing on the Microsoft Teams platform by quickly building and running a basic app.

> [!NOTE]
> It's helpful to have working knowledge of JavaScript (specifically React) when following these tutorials.

## Set up your development environment

To build apps for Teams, you need a Microsoft 365 developer subscription (which may be included in your current Office 365 plan). You also must be able to sideload apps in the Teams client.

1. Register for a [Microsoft 365 developer subscription](../concepts/build-and-test/prepare-your-o365-tenant.md).
1. [Enable Teams developer preview mode](../resources/dev-preview/developer-preview-intro.md#enable-developer-preview) for access to the latest Teams developer features.
1. Verify if you can sideload apps in Teams:
    1. In the Teams client, select **Apps**.
    1. Look for an option to **Upload a custom app**.

If you don't see this option, contact your Teams admin to [enable sideloading for you](../concepts/build-and-test/prepare-your-o365-tenant.md#enable-custom-teams-apps-and-turn-on-custom-app-uploading).

## Install your development tools

You can build Teams apps with your preferred tools, but here we'll show you how to get started quickly with Visual Studio Code and the Microsoft Teams Toolkit.

1. Install the latest version of [Visual Studio Code](https://code.visualstudio.com/download).
1. In Visual Studio Code, select **Extensions** :::image type="icon" source="../assets/icons/vs-code-extensions.png"::: on the left Activity Bar and install the **Microsoft Teams Toolkit**.

## Create an app project

The Microsoft Teams Toolkit can help you set up your first app project.

1. In Visual Studio Code, open the toolkit by selecting the Teams icon :::image type="icon" source="../assets/icons/favicon-16x16.png"::: on the left Activity Bar.
1. Select **Create a new Teams app**.
1. When prompted, enter a name for your app. This is the default name for your app and also the name of the project directory on your local machine.
1. On the **Add capabilities** screen, select **Tab** then **Next**.
1. Check the **Personal tab** and **Group or Teams channel** options and select **Finish** to configure your project.

:::image type="content" source="../assets/images/get-started/toolkit-add-tabs.png" alt-text="Example screenshot of using the Teams Toolkit to set up a project with personal and channel tab scaffolding.":::

Once complete, you have the app scaffolding components for building personal and channel tabs.

## Run your app

Follow the `README.md` instructions in your project to build, run, and deploy your app to Teams.

Your app running in the Teams client should look like the following screenshot.

:::image type="content" source="../assets/images/app-up-and-running/tab-running.png" alt-text="Screenshot showing an example Hello, World! app in Teams.":::

## Important app project files

With your app project and scaffolding set up, take some time to understand some of the key files Teams app developers work with.

### App manifest (`manifest.json`)

Located in the `.publish` directory, the app manifest is the starting point for any app project. The manifest defines your app's fundamental attributes and points to required resources.

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

🎉 Congratulations! You have a running Teams app. Learn how to add real-world features to it.

> [!div class="nextstepaction"]
> [Create a personal tab](../build-your-first-app/add-personal-tab.md)
