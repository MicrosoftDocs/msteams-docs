---
title: Deploy your first app using C#
description: Learn how to deploy Microsoft Teams apps with C# or .NET.
keywords: getting started .net c# csharp
ms.custom: scenarios:getting-started; languages:ASP.NET,C#
ms.localizationpriority: medium
ms.topic: tutorial
ms.date: 11/09/2018
---
# Deploy your Teams C# app

After you build and test your Teams app, you can host it using Azure.

Let's deploy the first Hello World app on Azure using Teams Toolkit.

:::image type="content" source="../assets/images/get-started/app-roadmap/roadmap-p-3.png" alt-text="Image showing phase 3 of building an app." border="false":::

In this page, you'll learn to:

- [Host your app in Azure](#host-in-azure)
- [Update the app package](#update-the-app-package)

## Host in Azure

Microsoft Azure hosts your .NET application on a free tier. It uses shared infrastructure that is sufficient to run the `Hello World` sample. For more information, see [creating a new free Azure account](https://azure.microsoft.com/free/).

Visual Studio has built-in support for app deployment to different providers, including Azure:

<img width="530px" alt="Visual Studio" src="~/assets/images/get-started/publishtoazure1.png"/>

## Update the app package

You can use Developer Portal to upload the app package.

[Developer Portal](https://dev.teams.microsoft.com/) is a Teams app that simplifies the creation and registration of an app. Install from the Teams store.

You could use [App Studio](deploy-csharp-app-studio.md) to upload you app to Teams, though it has now evolved. Configure, distribute, and manage your Teams apps with the new Developer Portal.

**To upload Hello World app to Developer Portal in Teams**

1. Open Microsoft Teams.

1. Select the **Store** :::image type="icon" source="../assets/images/teams-toolkit-v2/teams-store-icon.png"::: icon from the left-hand bar.

1. Search for **Dev Portal** in the search bar, and select **Dev Portal (Int)***.

   :::image type="content" source="../assets/images/teams-toolkit-v2/select-dev-portal-app.png" alt-text="Select Developer Portal app" border="false":::

1. Select **Open**.
    
    :::image type="content" source="../assets/images/teams-toolkit-v2/open-dev-portal.png" alt-text="Image showing open Developer Portal app" border="false":::

    The Developer Portal opens.

1. Select the **Apps** tab.

    :::image type="content" source="../assets/images/teams-toolkit-v2/dev-portal-app.png" alt-text="Developer Portal app" border="false":::

1. Select **Import an existing app**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/import-app-in-dev-portal.png" alt-text="Image showing Import app button" border="false":::

1. Select **Hello World** and select **Import**.

    The **Hello World** app is imported in Developer Portal.

    :::image type="content" source="../assets/images/teams-toolkit-v2/app-imported-dev-portal.png" alt-text="Image showing app imported in Teams" border="false":::

### View the app manifest file
    
You can configure your app using the Teams Developer Portal. You can use the Manifest to configure capabilities, required resources, and other important attributes for your app.

To view the app manifest:

1. Select **Publish** from the left panel to open the dropdown list.

    :::image type="content" source="../assets/images/teams-toolkit-v2/open-app-package-devp.png" alt-text="Image showing left pane of Developer Portal" border="false":::

1. Select **App package**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/app-manifest-dev-portal.png" alt-text="Image showing App manifest file in Developer Portal" border="false":::

    The manifest file appears on the right pane.

    **Additional configuration options in Developer Portal**

    For more details on how to configure your app using Developer Portal, see [Teams Developer Portal](../concepts/build-and-test/teams-developer-portal.md).

<a name="updatecredentials"></a>

### Update the credentials for your hosted app

The sample app requires the environment variables to be set to the values that you saved in the text file.

1. Open the Solution Explorer.

    :::image type="content" source="../assets/images/get-started/csharp-repo-cloned.png" alt-text="Sample repo for c# Teams app" border="false":::

1. Open the `appsettings.json` file.

    :::image type="content" source="../assets/images/teams-toolkit-v2/csharp-appsetting-json.png" alt-text="Image showing appsettings.json file" border="false":::
    
1. Update the **MicrosoftAppId** value with your bot ID that you saved in the text file.
1. Update the **MicrosoftAppPassword** with the bot password that you saved.

    :::image type="content" source="../assets/images/get-started/get-started-net-azure-add-keys.png" alt-text="Image showing adding Azure keys" border="false":::

    After making these changes, rebuild the app. If you're using ngrok, you can run the app locally, and if you've hosted it in Azure, redeploy the app.

### Configure the app tab

After you've installed the app into Teams, you must configure it to display the content.

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
|**Back** : [Build and test your app](build-and-test-csharp-app.md) | [Overview](code-samples.md) : **Next** |
|
