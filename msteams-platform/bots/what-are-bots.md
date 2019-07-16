---
title: What are conversational bots?
author: clearab
description: An overview of conversational bots in Microsoft Teams.
ms.topic: overview
ms.author: anclear
---
# What are conversational bots?

Build and connect intelligent bots to interact with Microsoft Teams users naturally through chat. Or provide a simple commands-based bot, to be used as your "command-line" interface for your broader Teams app experience. You can make a notification-only bot, which can push information relevant to your users directly to them in a channel or direct message. You can even bring your existing Bot Framework-based bot and add Teams-specific support to make your experience shine.

![Example of a bot assisting a user](~/assets/images/bot_example.png)

> [!TIP]
> If you are just looking for a way to simply extend your team by integrating with custom tools and services in a secure manner, check out our [outgoing webhook](~/concepts/outgoingwebhook.md) feature. Be aware, though, that outgoing webhooks simply leverage your existing web services - they can't access non-messaging APIs, perform asynchronous posting, or add button actions to cards.

## What you need to know: Bots

A bot appears just like any other team member you interact with in a conversation except that it has a hexagonal avatar icon and is always online.

A bot behaves differently depending on what kind of conversation it is involved in. Bots in Teams support several kinds of conversations (called scopes in the [app manifest](~/resources/schema/manifest-schema.md)).

* `teams` Also called channel conversations
* `personal` Conversations between a bot and a single user
* `groupChat` A conversation between a bot and 2 or more users

See [Have a conversation with a Microsoft Teams bot](~/concepts/bots/bot-conversations/bots-conversations.md) for more information.

With Microsoft Teams apps, you can make the bot the star of your experience, or just a helper. Bots are distributed as part of your broader app package which can include other capabilities such as [tabs](~/concepts/tabs/tabs-overview.md) or [messaging extensions](~/concepts/messaging-extensions/messaging-extensions-overview.md).

## Bot APIs

Microsoft Teams supports most of the [Microsoft Bot Framework](https://dev.botframework.com/). (If you already have a bot that's based on the Bot Framework, you can easily adapt it to work in Microsoft Teams.) We recommend you use either C# or Node.js to take advantage of our [SDKs](/microsoftteams/platform/#pivot=sdk-tools). These packages extend the basic Bot Builder SDK classes and methods:

* Using specialized card types like the Office 365 Connector card
* Consuming and setting Teams-specific channel data on activities
* Processing messaging extension requests

The SDK extensions install dependencies, including the Bot Builder SDK.

* **.NET** To use the Microsoft Teams extensions for the Bot Builder SDK for .NET, install the [Microsoft.Bot.Connector.Teams](https://www.nuget.org/packages/Microsoft.Bot.Connector.Teams) NuGet package in your Visual Studio project.
* **Node.js** To use the Microsoft Teams extensions for the Bot Builder SDK for Node.js, add the [botbuilder-teams](https://www.npmjs.com/package/botbuilder-teams) npm package.
* **Source code** You can find the full source code for the extensions in the [BotBuilder-MicrosoftTeams](https://github.com/OfficeDev/BotBuilder-MicrosoftTeams) repo on Github.

> [!IMPORTANT]
> You can develop Teams apps in any other web-programming technology and call the [Bot Framework REST APIs](/bot-framework/rest-api/bot-framework-rest-overview) directly, but you must perform all token handling yourself.

*Teams App Studio* helps you create and configure your app manifest, and can create your Bot Framework bot for you. It also contains a React control library and an interactive card builder. See [Getting started with Teams App Studio](~/get-started/get-started-app-studio.md).

## Outgoing webhooks

Outgoing webhooks allow you to create a simple bot for basic interaction, like kicking off a workflow or other simple commands you may need. Outgoing webhooks live only in the team in which you create them and are intended for simple processes specific to your company's workflow. See [outgoing webhooks](~/concepts/outgoingwebhook.md) for more information.

## Troubleshooting bots

See the [Troubleshooting bots](~/troubleshoot/troubleshoot.md#troubleshooting-bots) topic for more information.
