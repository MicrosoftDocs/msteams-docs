---
title: Deploy your first app using C# in App Studio
description: Learn how to deploy Microsoft Teams apps with C# or .NET. in App Studio
keywords: getting started .net c# csharp app studio
ms.custom: scenarios:getting-started; languages:ASP.NET,C#
ms.localizationpriority: medium
ms.topic: tutorial
ms.date: 11/09/2018
---

# Update C# app package in App Studio

> [!TIP]
> **Try the Developer Portal**: App Studio has evolved. Configure, distribute, and manage your Teams apps with the new [Developer Portal](https://dev.teams.microsoft.com/).

App Studio is a Teams app that you can install from the Teams store. It simplifies the creation and registration of an app.

Complete the following steps to update the app package:

1. To install App Studio in Teams, select the **Apps** icon at the bottom of the left-hand bar, and search for **App Studio**:

    :::image type="content" source="~/assets/images/get-started/searchforAppStudio.png" alt-text="Finding app studio in the store view.":::

1. Select the **App Studio** tile and choose **Install**. The App Studio is installed:

    :::image type="content" source="~/assets/images/get-started/InstallingAppStudio.png" alt-text="Installing app studio.":::

1. To create the app package for your Teams app, select the **Manifest editor** tab in **App Studio**:

    :::image type="content" source="~/assets/images/get-started/AppStudio.png" alt-text="Selecting manifest editor to create app package.":::

    The sample comes with its own manifest and is designed to build an app package when the project is built. The manifest.json file can be located in Visual Studio in Manifest under ```Microsoft.Teams.Samples.HelloWorld.Web```.

     In Visual Studio, the manifest.json file is located in under **Manifest** in `Microsoft.Teams.Samples.HelloWorld.Web`. This step is described by the following image:  

    :::image type="content" source="~/assets/images/get-started/app-package-on-.NET-with-Visual-Studio.png" alt-text="Build the app package on .NET with visual studio.":::

1. Now to modify this app package, select **Import an existing app** in the **Manifest editor**:

    :::image type="content" source="~/assets/images/get-started/Importinganapp.png" alt-text="Importing an existing app.":::

1. Select the **Hello World** tile for your newly imported app:

    :::image type="content" source="~/assets/images/get-started/HelloWorldappdetails.png" alt-text="Newly imported app view.":::

    The following image shows the imported app package in App Studio:

    :::image type="content" source="~/assets/images/get-started/Importinganapp2.png" alt-text="Importing the app package.":::

    On the left-hand side of the Manifest editor there is a list of steps. On the right-hand side there is a list of properties that need to be filled in for each step. As you started with a sample app, much of the information is already completed. The next steps enable you to update the properties of the Hello World app.

## App details

Select **App details** under **Details**. Select the **Generate** button to create a new App ID.

Your new App ID is similar to `2322041b-72bf-459d-b107-f4f335bc35bd`.

Go through the app details in the right-hand pane including **Developer information** and **Branding** details. These details are important if you are writing a new app for distribution.

## Tabs

It is simple to add tabs to a Teams app. The sample app already supports several tabs, and you can enable them.

### Team tab

Your app can only have one Team tab:

:::image type="content" source="~/assets/images/get-started/TeamTab.png" alt-text="Adding a Teams tab.":::

In this sample, the Team tab is where your configuration page is displayed. Select the **...** symbol of the **Tab configuration url** and choose **Edit** from the drop-down menu. Change the URL to `https://yourteamsapp.ngrok.io/configure` where `yourteamsapp.ngrok.io` must be replaced with the URL that you used when hosting your app.

### Personal tabs

Your app can have up to 16 tabs, including the Team tab.

Personal tabs are different from the Team tab. **Hello Tab** is already listed in the personal tabs list with a placeholder value `com.contoso.helloworld.hellotab`. Select the **...** symbol of the **Tab configuration url** and choose **Edit** from the drop-down menu. The following dialog box appears:

:::image type="content" source="~/assets/images/get-started/PersonalTab.png" alt-text="Adding a personal tab dialog box.":::

Update the following boxes with your app URL:

- Change the **Content URL** box to `https://yourteamsapp.ngrok.io/hello`
- Change the **Website URL** box to `https://yourteamsapp.ngrok.io/hello`

Replace `yourteamsapp.ngrok.io` by the URL that you used when hosting your app.

#### Bots

It is easy to add the bots functionality to your app. The **Hello World** sample app already has a bot as part of the sample, but you must register it with Microsoft:

:::image type="content" source="~/assets/images/get-started/Bots.png" alt-text="Adding a bot.":::

The bot that was imported from the sample does not have an associated App ID. You must create a new bot so that App Studio can create a new App ID and register it with Microsoft.

> [!NOTE]
> The App ID created by App Studio for the bot is different from the App ID created for the app. Each bot in an app requires its own App ID.

Complete the following steps to setup your bot:

1. Select **Delete** next to the imported bot in the bot list. Now there are no bots left to show.
1. Select **Setup** to display the **Set up a bot** dialog box.

    :::image type="content" source="~/assets/images/get-started/Setupbot.png" alt-text="Adding a bot dialog box.":::

1. Add a bot name **Contoso bot** and select all three check boxes under **Scope**.
1. Choose **Save** to exit the dialog box. App Studio registers your bot with Microsoft and displays your new bot in the bot list.
1. Now open a text file in notepad and copy and paste your new bot ID into it.
1. Click **Generate New Password**, and note the password in the same text file you noted your bot App ID.
1. Update the **Bot endpoint address** to `https://yourteamsapp.ngrok.io/api/messages`, and replace `yourteamsapp.ngrok.io` with the URL that you used when hosting your app.
1. Now save your text file as you must add the information from the file to your hosted app to allow secure communication with your bot.

#### Messaging extensions

Messaging extensions let users ask for information from your service and post that information. The information is posted in the form of cards into the channel conversation. Messaging extensions appear at the bottom of the compose box.

Complete the following steps to setup your messaging extension:

1. Select **Messaging extensions** under **Capabilities** in the left-hand pane of App Studio to configure the messaging extension:

    :::image type="content" source="~/assets/images/get-started/Messagingextensions.png" alt-text="Adding a messaging extension.":::

    The sample messaging extension is listed in the **Messaging Extensions** pane.

1. Select **Delete** to remove the messaging extension, select **Set up**, and follow the same steps used for [bots](#bots). The **Messaging Extension** dialog box is displayed.
1. Select the **Use existing bot** tab and **Select from one of my existing bots**.
1. Select the bot you created from the drop-down menu. Add a **Bot name** and select **Save** to close the dialog box.
1. Under the **Command** section, select **Add**. To add a search-based command, select the **Allow users to query your service for information and insert that into a message** option.
1. In the **New command** dialog box, enter the following values:

    Under **New command**:

    - **Command ID**: Enter random text
    - **Title**: Enter random title
    - **Description**: Enter random description

    Under **Parameter**:

    - **Name**: Enter the parameter name
    - **Title**: Enter the card title
    - **Description**: Enter card description

1. After you enter the information, select **Save** to close the dialog box.

#### Register your app in Teams

After entering the details of your app, complete the following steps to register your app in Teams:

1. Use **Test and distribute** of App Studio to install your app in Teams.
1. Update your hosted application with the App ID and password for your bot. For the sample app, use the same App ID and password for both bot and messaging extension.
1. Select **Test and distribute**  under **Finish** in the left-hand pane of App Studio:

    :::image type="content" source="~/assets/images/get-started/Testanddistribute.png" alt-text="Steps for testing your app.":::

1. To upload your app to Teams, select the **Install** button under **Test and Distribute**:

    :::image type="content" source="~/assets/images/get-started/InstallingHelloWorld.png" alt-text="Adding a messaging extension dialog box.":::

    > [!NOTE]
    > If you are unable to sideload the app, verify whether you have [enabled custom app uploading](../get-started/get-started-dotnet-app-studio.md#enable-sideloading-option).

1. Select the **Search** box in the **Add to a team** section and select a team to add the sample app. You can set up a special team for testing.
1. Select the **Install** button at the bottom of the dialog box.

    Your app is now available in Teams. However, the bot and the messaging extension will not work until you update the hosted applications environment with the App IDs and passwords.

    :::image type="content" source="~/assets/images/get-started/Finishedhelloworld.png" alt-text="Image showing app available in Teams.":::

## Register your app in Teams

After entering the details of your app, complete the following steps to register your app in Teams:

1. Use **Preview** of Developer Portal to install your app in Teams.

    :::image type="content" source="../assets/images/teams-toolkit-v2/preview-in-teams.png" alt-text="Image showing preview button.":::

1. Update your hosted application with the App ID and password for your bot. For the sample app, use the same App ID and password for both bot and messaging extension.

1. Select **Publish to store**  under **Publish** in the left-hand pane of Developer Portal:

    :::image type="content" source="../assets/images/teams-toolkit-v2/devp-publish-left-pane.png" alt-text="Image showing publish option in left pane.":::

    > [!NOTE]
    > If you are unable to sideload the app, verify whether you have [enabled custom app uploading](../get-started/get-started-dotnet-app-studio.md#enable-sideloading-option).

1. Select **Add** to install the app on Teams.

    Your app is now available in Teams. However, the bot and the messaging extension will not work until you update the hosted applications environment with the App IDs and passwords.

## Update the credentials for your hosted app

The sample app requires the environment variables to be set to the values that you saved in the text file.

1. Open the Solution Explorer.

    :::image type="content" source="../assets/images/get-started/csharp-repo-cloned.png" alt-text="Sample repo for c# Teams app.":::

1. Open the `appsettings.json` file.

    :::image type="content" source="../assets/images/teams-toolkit-v2/csharp-appsetting-json.png" alt-text="Image showing appsettings.json file.":::

1. Update the **MicrosoftAppId** value with your bot ID that you saved in the text file.
1. Update the **MicrosoftAppPassword** with the bot password that you saved.

    :::image type="content" source="../assets/images/get-started/get-started-net-azure-add-keys.png" alt-text="Image showing adding azure keys.":::

    After making these changes, rebuild the app. If you're using ngrok, you can run the app locally, and if you've hosted it in Azure, redeploy the app.

## Test the app capabilities in Teams

### Test your tab

After you've installed the app into Teams, configure it to display the tab that you want the app to load.

To configure the app tab:

1. Go to a channel in the team where you installed the sample app, and select the **'+'** button to add a new tab.
1. Select **Hello World** from the **Add a tab** list. A configuration dialog box is displayed that enables you to select the tab to display in this channel.
1. Select **Save**. The `Hello World` tab is loaded with the tab.

    :::image type="content" source="~/assets/images/samples-hello-world-tab-configure.png" alt-text="Image showing configured app.":::

### Test your bot in Teams

You can now test the bot in Teams.

To test your bot:

- Select a channel in the team where you registered your app and type `@your-bot-name`. This type of message is called an **\@mention**. The bot replies to any message that you send.

    :::image type="content" source="~/assets/images/samples-hello-world-bot.png" alt-text="Image showing bot responses.":::

### Test your messaging extension

To test your messaging extension:

1. Select **...** below the input box in your conversation view. A menu with the **'Hello World'** app is displayed.
1. Select the menu, a set of random texts is displayed. You can select one of the random texts and that is inserted into your conversation.

    :::image type="content" source="~/assets/images/samples-hello-world-messaging-extensions-menu1.png" alt-text="Image showing messaging extension menu.":::

    :::image type="content" source="~/assets/images/samples-hello-world-messaging-extensions-result1.png" alt-text="Image showing messaging extension result.":::

1. Select one of the random texts. A card formatted and ready to send with your own message is shown.

    :::image type="content" source="~/assets/images/samples-hello-world-messaging-extensions-send.png" alt-text="Image showing messaging extension ready to send.":::

| &nbsp; | &nbsp; |
|:--- | ---:|
|[Back](get-started-overview.md) | &nbsp; |