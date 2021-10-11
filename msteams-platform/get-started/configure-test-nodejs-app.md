---
title: Register and Test your first app using Node.js
description: Learn how to register and test Microsoft Teams apps with Node.js
keywords: getting started Node.js
ms.custom: scenarios:getting-started; languages:Node.js
ms.localizationpriority: medium
ms.topic: tutorial
ms.date: 11/09/2018
---

# Configure and test your Node.js app

After you've imported your app and configured the capabilities in Developer Portal, you can preview and test the sample app.


## Register your app in Teams

After entering the details of your app, complete the following steps to register your app in Teams:

1. Use **Preview** of Developer Portal to install your app in Teams.

    :::image type="content" source="../assets/images/teams-toolkit-v2/preview-in-teams.png" alt-text="Image showing Preview button" border="false":::

1. Update your hosted application with the App ID and password for your bot. For the sample app, use the same App ID and password for both bot and messaging extension.

1. Select **Publish to store**  under **Publish** in the left-hand pane of Developer Portal:

    :::image type="content" source="../assets/images/teams-toolkit-v2/devp-publish-left-pane.png" alt-text="Image showing Publish option in left pane" border="false":::

    > [!NOTE]
    > If you are unable to sideload the app, verify whether you have [enabled custom app uploading](../get-started/get-started-dotnet-app-studio.md#enable-sideloading-option).

1. Select **Add** to install the app on Teams.

    Your app is now available in Teams. However, the bot and the messaging extension will not work until you update the hosted applications environment with the App IDs and passwords.


## Update the credentials for your hosted app

The sample app requires the following environment variables to be set to the values you made a note of earlier:

```
MICROSOFT_APP_ID=<YOUR BOT'S APP ID>
MICROSOFT_APP_PASSWORD=<YOUR BOT'S PASSWORD>
WEBSITE_NODE_DEFAULT_VERSION=8.9.4
```

The environment variables are a part of your environment. Only your app's code can access them. They aren't exposed to any third parties.

If you're running the app using ngrok, you'll need to set up local environment variables. You can use Visual Studio Code to add a [launch configuration](https://code.visualstudio.com/Docs/editor/debugging#_launch-configurations):

``` 
{
    "type": "node",
    "request": "launch",
    "name": "Launch - Teams Debug",
    "program": "${workspaceRoot}/src/app.js",
    "cwd": "${workspaceFolder}/src",
    "env": {
        "BASE_URI": "https://yourNgrokURL.ngrok.io",
        "MICROSOFT_APP_ID": "00000000-0000-0000-0000-000000000000",
        "MICROSOFT_APP_PASSWORD": "yourBotAppPassword",
        "NODE_DEBUG": "botbuilder",
        "SUPPRESS_NO_CONFIG_WARNING": "y",
        "NODE_CONFIG_DIR": "../config"
    }
}
```

Where:

- The authorization credentials for your bot are as follows:
  - MICROSOFT_APP_ID is ID
  - MICROSOFT_APP_PASSWORD is password
- NODE_DEBUG show you what's happening in your bot in the Visual Studio Code debug console
- NODE_CONFIG_DIR points to the directory at the root of the repository (by default, when the app is run locally, it looks for the root directory in the `src` folder).

> [!Note]
> If you have not stopped npm from earlier in the tutorial, you'll need to run `npm stop` in order for Visual Studio Code to pickup your launch configuration variables correctly.

<a name="ConfigureTheAppTab"></a>

## Configure your sample app

After you install the app into Teams, you need to configure it to show content.

### Test your tab in Teams

1. Go to a channel in Teams, and select the **'+'** button to add a new tab.
1. You can then choose `Hello World` from the **Add a tab** list.
1. In the configuration dialog, select the tab you want to display in the channel. Then, select **Save**. 

You can see the `Hello World` tab loaded with the tab you chose:

<img width="430px" alt="Screenshot of configure" src="~/assets/images/samples-hello-world-tab-configure.png"/>

### Test your bot in Teams

You can now interact with the bot in Teams. Choose a channel in the team where you registered your app, and type `@your-bot-name`, followed by your message. This type of message is called an **\@mention**. Whatever message you send to the bot will be sent back to you as a reply:

<img width="450px" alt="Bot responses" src="~/assets/images/samples-hello-world-bot.png"/>

<a name="ComposeRichMessages"></a>

### Test your messaging extension

**To test your messaging extension**
1. Select the three dots below the input box in your conversation view. A menu with the **'Hello World'** app is displayed.
1. Select the menu. A set of random texts is displayed. You can select one of the random texts and that is inserted into your conversation.

    <img width="430px" alt="Messaging extension menu" src="~/assets/images/samples-hello-world-messaging-extensions-menu1.png" />

    <img width="430px" alt="Messaging extension result" src="~/assets/images/samples-hello-world-messaging-extensions-result1.png" />

1. Select one of the random texts. The formatted card appears ready to send with your own message included at the bottom:

    <img width="430px" alt="Messaging extension send" src="~/assets/images/samples-hello-world-messaging-extensions-send.png" />

| &nbsp; | &nbsp; |
|:--- | ---:|
|**Back** : [Deploy your app](deploy-nodejs-app.md) | [Overview](code-samples.md) : **Next** |
|