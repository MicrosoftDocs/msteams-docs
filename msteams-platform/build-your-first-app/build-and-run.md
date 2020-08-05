---
title: Build and run your first Teams app
author: heath-hamilton
description: Run your first Microsoft Teams app.
---
# Build and run your first Microsoft Teams app

You can jump right into Microsoft Teams platform development by quickly building and running a "Hello, world!" app. Learn how to 

## Get prerequisites

1. Set up a [Microsoft 365 developer account](../concepts/build-and-test/prepare-your-o365-tenant) or Teams account that allows you to upload a custom app.
1. [Enable Teams developer preview mode](../resources/dev-preview/developer-preview-intro#enable-developer-preview).
<details>
  <summary>Not sure if your account allow you to sideload an app? Click here.</summary>
Click on AppStore on the bottom left corner and you should see "Upload a custom app" if sideloading is turned on.
<image src="../assets/images/app-up-and-running/upload-custom-app.png">

If sideloading is not turned on for your tenant, please get a Microsoft 365 developer account and turn on sideloading by following [these steps](/concepts/build-and-test/prepare-your-o365-tenant#Enable-custom-Teams-apps-and-turn-on-custom-app-uploading) 
</details>

## Set up a project with Visual Studio Code

Follow these steps to set up your first Teams app project using Visual Studio Code.

1. Install the latest version of [Visual Studio Code](https://code.visualstudio.com/download).
1. Create a workspace/folder for your project in your local environment.
1. In Visual Studio Code, select the Teams icon ![Teams icon](../assets/icons/favicon-16x16.png) from the activity bar on the left.
1. Select **Create a new Teams app** from the command menu.
1. When prompted, enter a name for your app. This is the default name for your app and also the name of the project directory on your machine.
1. On the **Add capabilities** screen, select **Tab** then **Next**.
<image src="../assets/images/app-up-and-running/choose-tab.png" alt-text="<alt text>">
1. Check the **Personal tab** and **Group or Teams channel** options and select **Finish** to configure your project. Once complete, you have the app scaffolding components for building personal and channel tabs.

## Build and run your app

While you eventually will host your Teams app in the cloud, but for now you'll 

1. Follow the `README.md` instructions in your project to build and run your app locally and deploy to Teams.
1. You should see your app up and running in the Teams client.
<image src="../assets/images/app-up-and-running/tab-running.png" alt-text="<alt text>">

Now you have a personal tab running in Teams.

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
