---
title: Build and run your first Teams app
author: heath-hamilton
description: Run your first Microsoft Teams app.
---
# Build and run your first Microsoft Teams app

You can jump right into Microsoft Teams platform development by quickly building and running a "Hello, world!" app.

## Start building in your browser

You can start building right away with Visual Studio Codespaces, which takes care of setting up an environment for you.

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

## Choose the capabilities you want in your app

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.

:::image type="content" source="../assets/images/vs-codespace-add-capabilities.png" alt-text="<alt text>":::

## Finish initial app setup

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.

## Run your app

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.

:::image type="content" source="../assets/images/vs-codespace-run-app.png" alt-text="<alt text>":::

## Understanding what's in the app package

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.

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

## Continue building on your desktop

Teams supports up to 10 minutes of the Visual Studio Codespace time. Once that time runs out, you must set up a desktop experience to continue building.

:::image type="content" source="../assets/images/vs-codespace-desktop.png" alt-text="<alt text>":::

## Next step

Congratulations! You have a basic functional Teams app. Learn how to add features to it with our real-world app tutorials.

> [!div class="nextstepaction"]
> [Building a real-world Teams app](../build-your-first-app/building-real-world-app.md)
