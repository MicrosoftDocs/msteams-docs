---
title: Build and run your first Teams app
author: heath-hamilton
description: Run your first Microsoft Teams app.
---
# Build and run your first Microsoft Teams app

You can jump right into Microsoft Teams platform development by quickly building and running a "Hello, world!" app. This section shows you how to create and run a personal tab with Visual Studio Code. It will also describes some important file within the project.

## Pre requisites 
1. [Microsoft 365 developer account](/concepts/build-and-test/prepare-your-o365-tenant) or Teams account that allows you to sideload an app 
1. [Enable Teams developer preview mode](/resources/dev-preview/developer-preview-intro#enable-developer-preview)
<details>
  <summary>Not sure if your account allow you to sideload an app? Click here.</summary>
Click on AppStore on the bottom left corner and you should see "Upload a custom app" if sideloading is turned on. 
<image src="../assets/images/app-up-and-running/upload-custom-app.png">

If sideloading is not turned on for your tenant, please get a Microsoft 365 developer account and turn on sideloading by following [these steps](/concepts/build-and-test/prepare-your-o365-tenant#Enable-custom-Teams-apps-and-turn-on-custom-app-uploading) 
</details>

## Build with Visual Studio Code

Follow these steps to create your new Teams project:

1. Install the latest version of [Visual Studio Code](https://code.visualstudio.com/download)
1. Create a workspace/folder for your project in your local environment.
1. In Visual Studio Code, select the Teams icon ![Teams icon](../assets/icons/favicon-16x16.png) from the activity bar on the left side of the window.
1. Select **Open the Microsoft Teams Toolkit** from the command menu.
1. Select **Create a new Teams app** from the command menu.
1. When prompted, enter the name of the workspace . This will be used as both the name of the folder where your project will reside, and the default name of your app.
1. Press **Enter** and you will arrive at the **Add capabilities** screen configure the properties for your new app.
1. Select **Tab** and then **Personal tab**
<image src="../assets/images/app-up-and-running/choose-tab.png" alt-text="<alt text>">
1. Select the **Finish** button to complete the configuration process.
1. You should see a README popping up and we are ready to run your app
1. Following the readme instruction to build and run your apps locally and then deploy to Teams
1.  You should see your app up and running in the Teams Client 
<image src="../assets/images/app-up-and-running/tab-running.png" alt-text="<alt text>">

Now you have an personal tab running in Teams.

This page is live which means you can navigate to **src/components/tabs.js** and modify the sting inside \<h1> and \<h3> . You should see the text change in your app accordingly.

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
