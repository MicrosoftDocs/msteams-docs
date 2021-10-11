---
title: Register and Test your first app using C#
description: Learn how to register and test Microsoft Teams apps with C# or .NET.
keywords: getting started .net c# csharp
ms.custom: scenarios:getting-started; languages:ASP.NET,C#
ms.localizationpriority: medium
ms.topic: tutorial
ms.date: 11/09/2018
---

# Configure and test your C# app

After you've imported your app and configured the capabilities in Developer Portal, you can preview and test the sample app.


## Register your app in Teams

After entering the details of your app, complete the following steps to register your app in Teams:

1. Use **Preview** of Developer Portal to install your app in Teams.

    :::image type="content" source="../assets/images/teams-toolkit-v2/preview-in-teams.png" alt-text="Image showing Preview button" border="false":::

1. Update your hosted application with the App ID and password for your bot. For the sample app, use the same App ID and password for both bot and messaging extension.

1. Select **Publish to store**  under **Publish** in the left-hand pane of Developer Portal:

    :::image type="content" source="../assets/images/teams-toolkit-v2/devp-publish-left-pane.png" alt-text="Image showing Preview button" border="false":::

    > [!NOTE]
    > If you are unable to sideload the app, verify whether you have [enabled custom app uploading](../get-started/get-started-dotnet-app-studio.md#enable-sideloading-option).

1. Select **Add** to install the app on Teams.

    Your app is now available in Teams. However, the bot and the messaging extension will not work until you update the hosted applications environment with the App IDs and passwords.

## Update the credentials for your hosted app

The sample app requires the environment variables to be set to the values that you saved in the text file.

1. Open the Solution Explorer.

    :::image type="content" source="../assets/images/get-started/csharp-repo-cloned.png" alt-text="Sample repo for c# Teams app" border="false":::

1. Open the `appsettings.json` file.

    :::image type="content" source="../assets/images/teams-toolkit-v2/csharp-appsetting-json.png" alt-text="Image showing appsettings.json file" border="false":::

1. Update the **MicrosoftAppId** value with your bot ID that you saved in the text file.
1. Update the **MicrosoftAppPassword** with the bot password that you saved.

    :::image type="content" source="../assets/images/get-started/get-started-net-azure-add-keys.png" alt-text="Image showing adding Azure keys" border="false":::

    After making these changes, rebuild the app. If you're using ngrok, you can run the app locally, and if you've hosted it in Azure, redeploy the app.

## Test the app capabilities in Teams

### Test your tab

After you've installed the app into Teams, configure it to display the tab that you want the app to load.

**To configure the app tab**

1. Go to a channel in the team where you installed the sample app, and select the **'+'** button to add a new tab.
1. Select **Hello World** from the **Add a tab** list. A configuration dialog box is displayed that enables you to select the tab to display in this channel.
1. Select **Save**. The `Hello World` tab is loaded with the tab.

    <img width="530px" alt="Screenshot of configure" src="~/assets/images/samples-hello-world-tab-configure.png" />

### Test your bot in Teams

You can now test the bot in Teams.

**To test your bot**

- Select a channel in the team where you registered your app and type `@your-bot-name`. This type of message is called an **\@mention**. The bot replies to any message that you send.

    <img width="450px" alt="Bot responses" src="~/assets/images/samples-hello-world-bot.png" />

### Test your messaging extension

**To test your messaging extension**

1. Select **...** below the input box in your conversation view. A menu with the **'Hello World'** app is displayed.
1. Select the menu, a set of random texts is displayed. You can select one of the random texts and that is inserted into your conversation.

    <img width="530px" alt="Messaging extension menu" src="~/assets/images/samples-hello-world-messaging-extensions-menu1.png" />

    <img width="530px" alt="Messaging extension result" src="~/assets/images/samples-hello-world-messaging-extensions-result1.png" />

1. Select one of the random texts. A card formatted and ready to send with your own message is shown.

    <img width="530px" alt="Messaging extension send" src="~/assets/images/samples-hello-world-messaging-extensions-send.png" />

| &nbsp; | &nbsp; |
|:--- | ---:|
|**Back** : [Deploy your app](deploy-.md) | [Overview](get-started-overview.md) : **Next** |
|