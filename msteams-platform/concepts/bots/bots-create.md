---
title: Create a bot
description: Describes how to create bots in Microsoft Teams
keywords: teams bots creation
ms.date: 12/07/2018
---
# Create a bot

All bots created using the Microsoft Bot Framework are configured and ready to work in Microsoft Teams.

>[!Note]
>These steps require Bot Framework version 3. The Bot Framework documentation has been updated to version 4, which does not work with Teams.

A sample bot is included in the [Get Started](~/get-started/get-started) sample for Node.js and .NET, along with detailed steps for creating your first bot.

See the [Bot Framework Documentation](https://docs.microsoft.com/en-us/azure/bot-service/?view=azure-bot-service-3.0) for general information on bots.

## Create a bot for Microsoft Teams

*Teams App Studio* is a new tool that can help create your bot. It also contains a React control library and configurable samples for cards. See [Getting started with Teams App Studio](~/get-started/get-started-app-studio). The steps that follow assume that you are hand configuring your bot and not using *Teams App Studio*.

1. Create the bot using this link: https://dev.botframework.com/bots/new. **Be sure to add Microsoft Teams as a channel from the featured channels list after creating your bot.** Feel free to re-use any Microsoft App ID you generated if you've already created your app package/manifest.

   ![Bot Framework registration page](~/assets/images/bots/bfregister.png)

> [!NOTE]
> You **must** use this link to create a new bot: https://dev.botframework.com/bots/new. If you click on the *Create a bot* button in the Bot Framework portal instead, you will [create your bot in Microsoft Azure](#bots-and-microsoft-azure) instead.

2. Build the bot using the [Microsoft.Bot.Connector.Teams](https://www.nuget.org/packages/Microsoft.Bot.Connector.Teams) NuGet package, the [botbuilder-teams](https://www.npmjs.com/package/botbuilder-teams) npm package, or the [Bot Connector API](https://docs.microsoft.com/en-us/bot-framework/rest-api/bot-framework-rest-connector-api-reference).

3. Test the bot using the [Bot Framework Emulator](https://docs.microsoft.com/en-us/bot-framework/debug-bots-emulator).

4. Deploy the bot to a cloud service, such as [Microsoft Azure](https://azure.microsoft.com/). Alternatively, run your app locally and use a tunneling service such [ngrok](https://ngrok.com) to expose an https:// endpoint for your bot, such as `https://45az0eb1.ngrok.io/api/messages`.

> [!TIP]
> [Here's more information on the various approaches for running and debugging your bots](~/resources/general/debug).

To make your bot experience Teams-ready:

1. [Create an uploadable app package](~/concepts/apps/apps-package) and [upload it to a team](~/concepts/apps/apps-upload) to test it in action.
2. Add [tabs](~/concepts/tabs/tabs-overview) or [other capabilities](~/concepts/apps/apps-overview#map-your-scenario-to-teams-capabilities) to make your experience shine in Teams.
3. [Submit your final app package](~/publishing/apps-publish#appsource) for publication in AppSource (formerly known as Office Store) or publish it for your organization by uploading it to your [Tenant App Catalog](~/publishing/apps-publish#microsoft-teams-tenant-app-catalog).

> [!NOTE]
> ## Bots and Microsoft Azure
> As of December, 2017, the Bot Framework portal is optimized for registering bots in Microsoft Azure. Here are some things to know:
> * While it's possible to [create a new Bot Framework bot](https://dev.botframework.com/bots/new) without using Azure, you must use that URL (https://dev.botframework.com/bots/new), which is no longer exposed in the Bot Framework portal.
> * When you edit the properties of an existing bot in the [list of your bots in Bot Framework](https://dev.botframework.com/bots) such as its "messaging endpoint," which is common when first developing a bot, especially if you use [ngrok](https://ngrok.com), you will see "Migration status" column and a blue "Migrate" button that will take you into the Microsoft Azure portal. Don't click on the "Migrate" button unless that's what you want to do; instead, click on the name of the bot and you can edit its properties:</br>
   ![Edit Bot Properties](~/assets/images/bots/bf-migrate-bot-to-azure.png)
> * If you register your bot using Microsoft Azure, it does not need to be *hosted* on Microsoft Azure.
> * If you do register a bot using Microsoft Azure portal, you must have a Microsoft Azure account. You can [create one for free](https://azure.microsoft.com/en-us/free/). To verify your identity when you create one, you must provide a credit card, but it won't be charged; it's always free to create and use bots with Microsoft Teams.
> * You can now use App Studio to register/update app and bot information directly within Microsoft Teams. You'll only have to use the Microsoft Azure portal for adding/configuring other Bot Framework channels such as Direct Line, Web Chat, Skype, and Facebook Messenger.
