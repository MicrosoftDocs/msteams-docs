---
title: Introduction to Bots in Teams Apps
description: In this module, learn how to get started developing bots in Microsoft Teams and what are all the requirements to add a bot in Teams
ms.topic: conceptual
ms.localizationpriority: medium
ms.date: 01/07/2025
---
# Add bots to Microsoft Teams apps

> [!IMPORTANT]
>
> This article is based on the v3 Bot Framework SDK.
>
> * If you want to create an AI bot, see  [create an AI bot](~/bots/how-to/teams-conversational-ai/teams-conversation-ai-overview.md).
> * If you want to create a basic bot, see [get started](~/get-started/get-started-overview.md), and if you want to look for current documentation version 4.6 or later of the SDK, see [conversational bots](~/bots/what-are-bots.md).

Build and connect intelligent bots to interact with Microsoft Teams users naturally through chat. Or provide a simple commands-based bot, to be used as your "command-line" interface for your broader Teams app experience. You can make a notification-only bot, which can push information relevant to your users directly to them in a channel or direct message. You can even bring your existing Bot Framework-based bot and add Teams-specific support to make your experience shine.

> [!IMPORTANT]
> Bots are available in [Government Community Cloud (GCC), GCC High, Department of Defense (DOD), and Teams operated by 21Vianet](../../concepts/cloud-overview.md#teams-app-capabilities) environments.

:::image type="content" source="../../assets/images/bot_example.png" alt-text="Example of a bot assisting a user":::

## What you need to know: Bots

A bot appears just like any other team member you interact with in a conversation except that it has a hexagonal avatar icon and is always online.

A bot behaves differently depending on what kind of conversation it's involved in. Bots in Teams support several kinds of conversations called scopes in the [app manifest](~/resources/schema/manifest-schema.md).

* `teams` Also called channel conversations.
* `personal` Conversations between a bot and a single user.
* `groupChat` A conversation between a bot and two or more users.

For more information, see [Have a conversation with a Microsoft Teams bot](~/resources/bot-v3/bot-conversations/bots-conversations.md).

With Teams apps, you can make the bot the star of your experience, or just a helper. Bots are published as part of your broader app package which can include other capabilities such as [tabs](~/tabs/what-are-tabs.md) or [message extensions](~/messaging-extensions/what-are-messaging-extensions.md).

## Bot APIs

Teams supports most of the [Microsoft Bot Framework](https://dev.botframework.com/). (If you already have a bot that's based on the Bot Framework, you can easily adapt it to work in Teams.) We recommend you use either C# or Node.js to take advantage of our [SDKs](/microsoftteams/platform/#pivot=sdk-tools). These packages extend the basic Bot Builder SDK classes and methods:

* Using specialized card types like the connector card for Microsoft 365 Groups.
* Consuming and setting Teams-specific channel data on activities.
* Processing message extension requests.

The SDK extensions install dependencies, including the Bot Builder SDK.

* **.NET** To use the Microsoft Teams extensions for the Bot Builder SDK for .NET, install the [Microsoft.Bot.Connector.Teams](https://www.nuget.org/packages/Microsoft.Bot.Connector.Teams) NuGet package in your Visual Studio project. For Node.js development, the BotBuilder for Microsoft Teams functionality has been incorporated into the [Bot Framework SDK](https://github.com/microsoft/botframework-sdk) as of v4.6.

> [!IMPORTANT]
> You can develop Teams apps in any other web-programming technology and call the [Bot Framework REST APIs](/bot-framework/rest-api/bot-framework-rest-overview) directly, but you must perform all token handling yourself.

*Developer Portal for Teams* helps you create and configure your app manifest, and can create your Bot Framework bot for you. It also contains a React control library and an interactive card builder.

## Outgoing webhooks

Outgoing webhooks allow you to create a simple bot for basic interaction, like kicking off a workflow or other simple commands you might need. Outgoing webhooks live only in the team in which you create them and are intended for simple processes specific to your company's workflow. For more information, see [outgoing webhooks](~/webhooks-and-connectors/how-to/add-outgoing-webhook.md).

## Build a great Teams bot

The following articles guide you through the process of creating a great bot for Teams:

* [Create a bot](~/resources/bot-v3/bots-create.md): Take advantage of the great tools, documentation, and community provided by the Bot Framework team.
* [Talk to your bot](~/resources/bot-v3/bot-conversations/bots-conversations.md): Add basic conversation flow and use channel-specific functionality. If you develop in .NET or Node.js, use our extensions for the Bot Builder SDK to simplify your work.
* [Using cards in your bot](~/resources/bot-v3/bots-cards.md): Design cards to communicate and accept user response.
* [Respond to bot events](~/resources/bot-v3/bots-notifications.md)
* [Notification-only bots](~/resources/bot-v3/bots-notification-only.md): Using bots to send notifications for your app.
* [Get context](~/resources/bot-v3/bots-context.md): Get information about the user.
* [Bot menus](~/resources/bot-v3/bots-menus.md): Using menus in bots.
* [Bots and files](~/resources/bot-v3/bots-files.md): Sending and receiving files from bots.
* [Using tabs with bots](~/resources/bot-v3/bots-with-tabs.md): Making tabs and bots work together.
* [Test your bot](~/resources/bot-v3/bots-test.md): Add your bot for personal or team conversations to see it in action.

<details>

<summary><b>Bots SDK V3</b></summary>

> [!IMPORTANT]
>
> This article is based on the v3 Bot Framework SDK.
>
> * If you want to create an AI bot, see  [create an AI bot](~/bots/how-to/teams-conversational-ai/teams-conversation-ai-overview.md).
> * If you want to create a basic bot, see [get started](~/get-started/get-started-overview.md), and if you want to look for current documentation version 4.6 or later of the SDK, see [conversational bots](~/bots/what-are-bots.md).

**Teams Developer Portal for Teams** is a tool that can help build your bot, and an app package that references your bot. It also contains a React control library and configurable samples for cards. For more information, see [Getting started with Teams Developer Portal for Teams](~/concepts/build-and-test/teams-developer-portal.md). The steps that follow assume that you are hand configuring your bot and not using **Teams Developer Portal for Teams**:

1. Create the bot using [Bot Framework](https://dev.botframework.com/bots/new). **Be sure to add Microsoft Teams as a channel from the featured channels list after creating your bot.** Feel free to reuse any Microsoft App ID you generated if you've already created your app package/manifest.

   ![Bot Framework registration page](~/assets/images/bots/bfregister.png)

> [!NOTE]
> If you don't wish to create your bot in Azure, you **must** use this link to create a new bot: [Bot Framework](https://dev.botframework.com/bots/new). If you select **Create a bot** in the Bot Framework portal instead, you'll [create your bot in Microsoft Azure](#bots-and-microsoft-azure) instead.

2. Build the bot using the [Microsoft.Bot.Connector.Teams](https://www.nuget.org/packages/Microsoft.Bot.Connector.Teams) NuGet package, the [Bot Framework SDK](https://github.com/microsoft/botframework-sdk), or the [Bot Connector API](/bot-framework/rest-api/bot-framework-rest-connector-api-reference).

3. Test the bot using the [Bot Framework Emulator](/bot-framework/debug-bots-emulator).

4. Deploy the bot to a cloud service, such as [Microsoft Azure](https://azure.microsoft.com/). Alternatively, run your app locally and use a tunneling service such [ngrok](https://ngrok.com) to expose an https:// endpoint for your bot, such as `https://45az0eb1.ngrok-free.app/api/messages`.

> [!NOTE]
>
> ### Bots and Microsoft Azure
>
> As of December 2017, the Bot Framework portal is optimized for registering bots in Microsoft Azure. Here are some things to know:
>
> * The Microsoft Teams channel for bots registered on Azure is free. Messages sent over the Teams channel won't count towards the consumed messages for the bot.
> * While it's possible to [create a new Bot Framework bot](https://dev.botframework.com/bots/new) without using Azure, you must use [create a new Bot Framework bot](https://dev.botframework.com/bots/new), which is no longer exposed in the Bot Framework portal.
> * When you edit the properties of an existing bot in the [list of your bots in Bot Framework](https://dev.botframework.com/bots) such as its "messaging endpoint," which is common when first developing a bot, especially if you use [ngrok](https://ngrok.com), you'll see "Migration status" column and a blue "Migrate" button that takes you into the Microsoft Azure portal. Don't select the "Migrate" button unless that's what you want to do; instead, select the name of the bot and you can edit its properties:</br>
   ![Edit Bot Properties](~/assets/images/bots/bf-migrate-bot-to-azure.png)
> * If you register your bot using Microsoft Azure, your bot code doesn't need to be *hosted* on Microsoft Azure.
> * If you do register a bot using Azure portal, you must have a Microsoft Azure account. You can [create one for free](https://azure.microsoft.com/free/). To verify your identity when you create one, you must provide a credit card, but it won't be charged; it's always free to create and use bots with Teams.
> * You can now use Developer Portal for Teams to register/update app and bot information directly within Teams. You'll only have to use the Azure portal for adding or configuring other Bot Framework channels such as Direct Line, Web Chat, Skype, and Facebook Messenger.

</details>

## See also

[Bot Framework samples](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/README.md).
