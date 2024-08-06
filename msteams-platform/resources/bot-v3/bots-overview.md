---
title: Introduction to Bots in Teams Apps
description: In this module, learn how to get started developing bots in Microsoft Teams and what are all the requirements to add a bot in Teams
ms.topic: conceptual
ms.localizationpriority: medium
ms.date: 04/02/2023
---
# Add bots to Microsoft Teams apps

[!include[v3-to-v4-SDK-pointer](~/includes/v3-to-v4-pointer-bots.md)]

Build and connect intelligent bots to interact with Microsoft Teams users naturally through chat. Or provide a simple commands-based bot, to be used as your "command-line" interface for your broader Teams app experience. You can make a notification-only bot, which can push information relevant to your users directly to them in a channel or direct message. You can even bring your existing Bot Framework-based bot and add Teams-specific support to make your experience shine.

> [!IMPORTANT]
> Bots are available in [Government Community Cloud (GCC), GCC-High, and Department of Defense (DOD)](~/concepts/app-fundamentals-overview.md#government-community-cloud) environments.

:::image type="content" source="../../assets/images/bot_example.png" alt-text="Example of a bot assisting a user":::

## What you need to know: Bots

A bot appears just like any other team member you interact with in a conversation except that it has a hexagonal avatar icon and is always online.

A bot behaves differently depending on what kind of conversation it's involved in. Bots in Teams support several kinds of conversations called scopes in the [app manifest](~/resources/schema/manifest-schema.md).

* `teams` Also called channel conversations.
* `personal` Conversations between a bot and a single user.
* `groupChat` A conversation between a bot and two or more users.

For more information, see [Have a conversation with a Microsoft Teams bot](~/resources/bot-v3/bot-conversations/bots-conversations.md).

With Teams apps, you can make the bot the star of your experience, or just a helper. Bots are distributed as part of your broader app package which can include other capabilities such as [tabs](~/tabs/what-are-tabs.md) or [message extensions](~/messaging-extensions/what-are-messaging-extensions.md).

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

Outgoing webhooks allow you to create a simple bot for basic interaction, like kicking off a workflow or other simple commands you may need. Outgoing webhooks live only in the team in which you create them and are intended for simple processes specific to your company's workflow. For more information, see [outgoing webhooks](~/webhooks-and-connectors/how-to/add-outgoing-webhook.md).

## Build a great Teams bot

The following articles will guide you through the process of creating a great bot for Teams:

* [Create a bot](~/resources/bot-v3/bots-create.md): Take advantage of the great tools, documentation, and community provided by the Bot Framework team.
* [Talk to your bot](~/resources/bot-v3/bot-conversations/bots-conversations.md): Add basic conversation flow and leverage channel-specific functionality. If you develop in .NET or Node.js, use our extensions for the Bot Builder SDK to simplify your work.
* [Using cards in your bot](~/resources/bot-v3/bots-cards.md): Design cards to communicate and accept user response.
* [Respond to bot events](~/resources/bot-v3/bots-notifications.md)
* [Notification-only bots](~/resources/bot-v3/bots-notification-only.md): Using bots to send notifications for your app.
* [Get context](~/resources/bot-v3/bots-context.md): Get information about the user.
* [Bot menus](~/resources/bot-v3/bots-menus.md): Using menus in bots.
* [Bots and files](~/resources/bot-v3/bots-files.md): Sending and receiving files from bots.
* [Using tabs with bots](~/resources/bot-v3/bots-with-tabs.md): Making tabs and bots work together.
* [Test your bot](~/resources/bot-v3/bots-test.md): Add your bot for personal or team conversations to see it in action.

## See also

[Bot Framework samples](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/README.md).
