---
title: Build and run your first Teams app
author: heath-hamilton
description: Run your first Microsoft Teams app.
---
# Build and run your first Microsoft Teams app

You can jump right into Microsoft Teams platform development by quickly building and running a "Hello, world!" app. This section shows you how to create and run a personal tab with Visual Studio Code. It will also describes some important file within the project.

Before we start, let's make sure you have an account to run your Teams app on. If you already have a Teams account, you are good to go. If not you can [obtain one through M365 Developer Program]()
We will show you two ways to use visual studio code to create Teams app. Feel free to use either one. The result is exactly the same.
1. Using Visual Studio Codespace. -- The easiest way to get started if you have an Azure subscription account. You can start coding in your browser right away with all environment set up for you. 
1. Using Visual Studio Code Desktop -- The classic way of creating project. No subscription needed.

## Start building in your browser with Visual Studio Codepace

### What you will need
* Azure Account 

After you have the account set up, simply click on the below button to get started.

:::image type="content" source="../assets/images/vs-codespace-intro.png" alt-text="<alt text>":::

:::row:::
   :::column span="":::
   :::column-end:::

   :::column span="":::

     > [!div class="nextstepaction"]
     > [Open Visual Studio Codespaces](https://aka.ms/vso-login)

   :::column-end:::

   :::column span="":::
   :::column-end:::
:::row-end:::

We will choose tab --> personal tab.
:::image type="content" source="../assets/images/vs-codespace-add-capabilities.png" alt-text="<alt text>":::

## The classic way of building with Visual Studio 
Follow these steps to create your new Teams project
1. Install the latest version of [Visual Studio Code]()
1. Go to extension and search for Microsoft Teams Toolkit 
:::image type="content" source="../assets/images/app-up-and-running/VSC-home.png" alt-text="<alt text>":::
1. Install the toolkit and create a new Teams project 
1. We will be building a personal tab so select tab and then personal tab
:::image type="content" source="../assets/images/app-up-and-running/choose-tab.png" alt-text="<alt text>":::
1. You should see this read me popping up and we are ready to [run your app]() 

## Run your app
Following the readme. Simply use "npm install" and "npm start" to build your app. 

Now that you have the tab created, simply press F5 and your app should launch in Teams. 

Now your app is up and running. Let's look at some essential files and [understand what's in the code]()

<details>
  <summary>That didn't work? Click here</summary>
Not to worry, we can also run your app by sideloading your app
</details>
:::image type="content" source="../assets/images/vs-codespace-run-app.png" alt-text="<alt text>":::

Now you have an personal tab running in Teams 
This page is live which means you can navigate to tabs.js and modify any string. You should see the text change accordingly. 

## Understanding what's in the the code

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
> [Building a real-world Teams app](../build-your-first-app/building-real-world-app.md)
