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

## Host in Azure

Microsoft Azure hosts your .NET application on a free tier. It uses shared infrastructure that is sufficient to run the `Hello World` sample. For more information, see [creating a new free Azure account](https://azure.microsoft.com/free/).

Visual Studio has built-in support for app deployment to different providers, including Azure:

<img width="530px" alt="Visual Studio" src="~/assets/images/get-started/publishtoazure1.png"/>

## Update the app package

# [App Studio](#tab/AS)

[!include [Use App Studio to configure the app package](~/includes/get-started/get-started-use-app-studio.md)]

# [Developer Portal](#tab/DP)

**To install Developer Portal (preview) in Teams**


1. Select the **Apps** icon at the bottom of the left-hand bar, and search for **Developer Portal**.

    <img width="430px" alt="Screenshot of TDP" src="~/assets/images/Screen1.png"/>

1. Select **Developer Portal** and select **Open**.

    <img width="430px" alt="Screenshot of TDP Open" src="~/assets/images/screen2.png"/>

1. Select the Apps tab and select **Import an existing app**.

    <img width="430px" alt="Screenshot of import app in tdp" src="~/assets/images/screen3.png"/>

1. Select **Hello World** and select **Import**. The **Hello World** app is imported in Developer Portal.

    You can configure your app using the Teams Developer Portal. The Manifest is found under Distribute. You can use the Manifest to configure capabilities, required resources, and other important attributes for your app. For more information about how to configure your app using Developer Portal, see [Teams Developer Portal](../concepts/build-and-test/teams-developer-portal.md).

    <img width="430px" alt="Screenshot of configure tdp" src="~/assets/images/Screen4.png"/>
---

### Update the credentials for your hosted app

The sample app requires the environment variables to be set to the values that you saved in the text file.
 > [!NOTE]
 > This 

1. Open the `appsettings.json` file.
1. Update the **MicrosoftAppId** value with your bot ID that you saved in the text file.
1. Update the **MicrosoftAppPassword** with the bot password that you saved.

    <img width="560px" alt="Setting the keys" src="~/assets/images/get-started/get-started-net-azure-add-keys.png"/>

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

* Select a channel in the team where you registered your app and type `@your-bot-name`. This type of message is called an **\@mention**. The bot replies to any message that you send.

    <img width="450px" alt="Bot responses" src="~/assets/images/samples-hello-world-bot.png" />

### Test your messaging extension

**To test your messaging extension**
1. Select **...** below the input box in your conversation view. A menu with the **'Hello World'** app is displayed. 
1. Select the menu, a set of random texts is displayed. You can select one of the random texts and that is inserted into your conversation.

    <img width="530px" alt="Messaging extension menu" src="~/assets/images/samples-hello-world-messaging-extensions-menu1.png" />

    <img width="530px" alt="Messaging extension result" src="~/assets/images/samples-hello-world-messaging-extensions-result1.png" />

1. Select one of the random texts. A card formatted and ready to send with your own message is shown.

    <img width="530px" alt="Messaging extension send" src="~/assets/images/samples-hello-world-messaging-extensions-send.png" />

|  <<  |  >>  |
|:--- | ---:|
|**Back** : [2. Build and test your app](build-and-test-csharp-app.md) | [Overview](code-samples.md) : **Next** |
|

## See also

* [Tutorials Overview](code-samples.md)
* [Code Samples](https://github.com/OfficeDev/Microsoft-Teams-Samples)