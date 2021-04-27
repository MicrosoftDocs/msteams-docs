---
title: Create a bot
description: Describes how to create bots in Microsoft Teams
ms.topic: how-to
keywords: teams bots creation
localization_priority: Normal
ms.date: 12/07/2018
---
# Create a bot

[!include[v3-to-v4-SDK-pointer](~/includes/v3-to-v4-pointer-bots.md)]

All bots created using the Microsoft Bot Framework are configured and ready to work in Microsoft Teams.

See the [Bot Framework Documentation](/azure/bot-service/?view=azure-bot-service-3.0&preserve-view=true) for general information on bots.

## Create a bot for Microsoft Teams

*Teams App Studio* is a tool that can help create your bot, and an app package that references your bot. It also contains a React control library and configurable samples for cards. See [Getting started with Teams App Studio](~/concepts/build-and-test/app-studio-overview.md). The steps that follow assume that you are hand configuring your bot and not using *Teams App Studio*.

1. Create the bot using this link: https://dev.botframework.com/bots/new. **Be sure to add Microsoft Teams as a channel from the featured channels list after creating your bot.** Feel free to re-use any Microsoft App ID you generated if you've already created your app package/manifest.

   ![Bot Framework registration page](~/assets/images/bots/bfregister.png)

> [!NOTE]
> If you do not wish to create your bot in Azure, you **must** use this link to create a new bot: https://dev.botframework.com/bots/new. If you click on the *Create a bot* button in the Bot Framework portal instead, you will [create your bot in Microsoft Azure](#bots-and-microsoft-azure) instead.

2. Build the bot using the [Microsoft.Bot.Connector.Teams](https://www.nuget.org/packages/Microsoft.Bot.Connector.Teams) NuGet package, the  [Bot Framework SDK](https://github.com/microsoft/botframework-sdk), or the [Bot Connector API](https://docs.microsoft.com/bot-framework/rest-api/bot-framework-rest-connector-api-reference). *See also* [Bot Framework samples](https://github.com/Microsoft/BotBuilder-Samples/blob/master/README.md).

3. Test the bot using the [Bot Framework Emulator](https://docs.microsoft.com/bot-framework/debug-bots-emulator).

4. Deploy the bot to a cloud service, such as [Microsoft Azure](https://azure.microsoft.com/). Alternatively, run your app locally and use a tunneling service such [ngrok](https://ngrok.com) to expose an https:// endpoint for your bot, such as `https://45az0eb1.ngrok.io/api/messages`.

> [!NOTE]
> ## Bots and Microsoft Azure
> As of December, 2017, the Bot Framework portal is optimized for registering bots in Microsoft Azure. Here are some things to know:
>
> * The Microsoft Teams channel for bots registered on Azure is free. Messages sent over the Teams channel will not count towards the consumed messages for the bot.
> * While it's possible to [create a new Bot Framework bot](https://dev.botframework.com/bots/new) without using Azure, you must use that URL (https://dev.botframework.com/bots/new), which is no longer exposed in the Bot Framework portal.
> * When you edit the properties of an existing bot in the [list of your bots in Bot Framework](https://dev.botframework.com/bots) such as its "messaging endpoint," which is common when first developing a bot, especially if you use [ngrok](https://ngrok.com), you will see "Migration status" column and a blue "Migrate" button that will take you into the Microsoft Azure portal. Don't click on the "Migrate" button unless that's what you want to do; instead, click on the name of the bot and you can edit its properties:</br>
   ![Edit Bot Properties](~/assets/images/bots/bf-migrate-bot-to-azure.png)
> * If you register your bot using Microsoft Azure, your bot code does not need to be *hosted* on Microsoft Azure.
> * If you do register a bot using Microsoft Azure portal, you must have a Microsoft Azure account. You can [create one for free](https://azure.microsoft.com/free/). To verify your identity when you create one, you must provide a credit card, but it won't be charged; it's always free to create and use bots with Microsoft Teams.
> * You can now use App Studio to register/update app and bot information directly within Microsoft Teams. You'll only have to use the Microsoft Azure portal for adding/configuring other Bot Framework channels such as Direct Line, Web Chat, Skype, and Facebook Messenger.
