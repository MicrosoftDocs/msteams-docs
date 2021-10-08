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

Visual Studio 2019 has built-in support for app deployment to different providers, including Azure:

:::image type="content" source="../assets/images/teams-toolkit-v2/publish-to-azure.png" alt-text="Image showing the Publish to Azure menu item in Visual Studio 2019" border="false":::

## Update the app package

You can use [Developer Portal](https://dev.teams.microsoft.com/) to upload the app package to Teams. Developer Portal is a Teams app that simplifies the creation and registration of an app. Install from the Teams store!

Updating the app package includes:

- [Uploading the app package to Developer Portal](#upload-the-app-package-to-developer-portal)
- [Configuring app capabilities](#configure-your-app-capabilities)
- [Registering your app in Teams](#register-your-app-in-Teams)

> [!NOTE]
> You could use [*App Studio*](deploy-csharp-app-studio.md) to upload you app to Teams, though it has now evolved. Configure, distribute, and manage your Teams apps with the new Developer Portal.

### Upload the app package to Developer Portal

To upload the app package:

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

1. Open the app package **helloworldapp.zip** from the following path in your C# sample repo directory structure:

    `<path to cloned C# repo>\Source\Repos\Microsoft-Teams-Samples\samples\app-hello-world\csharp\Microsoft.Teams.Samples.HelloWorld.Web\bin\Debug\netcoreapp3.1`

    The **Hello World** app is imported in Developer Portal.

    :::image type="content" source="../assets/images/teams-toolkit-v2/app-imported-dev-portal.png" alt-text="Image showing app imported in Teams" border="false":::

    After you've imported your app to Developer Portal, you can view its manifest file.

### View app information

#### View the app manifest

1. Select **Publish** from the left panel to open the dropdown list.

    :::image type="content" source="../assets/images/teams-toolkit-v2/open-app-package-devp.png" alt-text="Image showing left pane of Developer Portal" border="false":::

1. Select **App package**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/app-manifest-dev-portal.png" alt-text="Image showing App manifest file in Developer Portal" border="false":::

    The manifest file appears on the right pane. You use the manifest file to configure capabilities, required resources, and other important attributes for your app.

#### View app information

1. Select **Basic Information** from the left pane of Developer Portal.

    :::image type="content" source="../assets/images/teams-toolkit-v2/dev-portal-left-pane-basic.png" alt-text="Image shows the left pane of Developer Portal" border="false":::

1. Note the following information from the basic information:
    - App ID
    - Developer Information
    - App URLs

1. Select **Branding** from the left pane to view the branding information.
 
    :::image type="content" source="../assets/images/teams-toolkit-v2/devp-app-branding.png" alt-text="Image showing branding information of the app" border="false":::

    These details are important if you are writing a new app for distribution.

#### View app features

- Select **App features** from the left pane of Developer Portal.

    The App features appear in the right pane. You can view cards for Personal app, Bot, and Message Extension.

    :::image type="content" source="../assets/images/teams-toolkit-v2/devp-csharp-app-features.png" alt-text="Image showing features of the app" border="false":::

### Configure your app capabilities

After you've imported your app into Developer Portal, the next step is to configure app capabilities. Developer Portal contains all the app information in different sections. It makes configuring the app capabilities easy.

#### Configure personal tab app

1. 

**Additional configuration options in Developer Portal**

For more information on configuring your app using Developer Portal, see [Teams Developer Portal](../concepts/build-and-test/teams-developer-portal.md).

### Register your app in Teams



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
|**Back** : [Build and test your app](build-and-test-csharp-app.md) | [Overview](code-samples.md) : **Next** |
|
