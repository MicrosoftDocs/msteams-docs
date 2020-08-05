---
title: Build and run your first Teams app
author: heath-hamilton
description: Run your first Microsoft Teams app.
---
# Build and run your first Microsoft Teams app

You can jump right into developing on the Microsoft Teams platform by quickly building and running a "Hello, world!" app.

## Set up your development environment

To build apps for Teams, you need a Microsoft 365 developer subscription (which may be included in your current Office 365 plan). You also must be able to sideload apps in the Teams client.

1. Register for a [Microsoft 365 developer subscription](../concepts/build-and-test/prepare-your-o365-tenant).
1. [Enable Teams developer preview mode](../resources/dev-preview/developer-preview-intro#enable-developer-preview) for access to the latest Teams developer features.
1. Verify if you can sideload apps in Teams:
    1. In the Teams client, select **Apps**.
    1. Look for an option to **Upload a custom app**.

If you don't see this option, contact your Teams admin to enable [sideloading for you](../concepts/build-and-test/prepare-your-o365-tenant#Enable-custom-Teams-apps-and-turn-on-custom-app-uploading).

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

Follow the `README.md` instructions in your project to build, run, and view your app to Teams.

This is what your app looks like running in the Teams client.

:::image type="content" source="../assets/images/app-up-and-running/tab-running.png" alt-text="Example screenshot of Teams "Hello, World!" app running in the Teams client.":::

## Understand what's in the the code

Now that you have your first app up and running. Let's look at some the essential files that's in this template.

### App manifest
The app manifest is a JSON schema that defines ...

```json
{
  "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.7/MicrosoftTeams.schema.json",
  "manifestVersion": "1.7",
  "version": "1.0.0",
  "id": "f4f24bb7-46be-41aa-829c-9f8f819790c7",
  "packageName": "com.microsoft.teams.extension",
  "developer": {
    "name": "Developer Name",
    "websiteUrl": "https://localhost:3000",
    "privacyUrl": "https://localhost:3000/privacy",
    "termsOfUseUrl": "https://localhost:3000/termsofuse"
  },
  "icons": {
    "color": "color.png",
    "outline": "outline.png"
  },
  "name": {
    "short": "test",
    "full": "test app"
  },
  "description": {
    "short": "Short description for test.",
    "full": "Full description of test app for Microsoft Teams."
  },
  "accentColor": "#FFFFFF",
  "staticTabs": [
    {
      "entityId": "index",
      "name": "Personal Tab",
      "contentUrl": "https://localhost:3000/tab",
      "scopes": [
        "personal"
      ]
    }
  ],
  "permissions": [
    "identity",
    "messageTeamMembers"
  ],
  "validDomains": [
    "localhost:3000"
  ]
}
```

## Next step

Congratulations! You have a basic functional Teams app and you also understands what goes in it. Learn how to add features to it with our real-world app tutorials.

> [!div class="nextstepaction"]
> [Create a personal tab](../build-your-first-app/add-personal-tab.md)
