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



## Register your app in Teams


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