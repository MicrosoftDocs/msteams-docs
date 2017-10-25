---
title: Develop bots
description: Describes how to get started developing bots in Microsoft Teams
keywords: teams bots development
---

# Develop bots for Microsoft Teams

Build and connect intelligent bots to interact with Microsoft Teams users naturally through chat. Or provide a simple commands-based bot, to be used as your "command-line" interface for your broader Teams app experience. You can make a notification-only bot, which can push information relevant to your users directly to them in a channel or direct message. You can even bring your existing Bot Framework&ndash;based bot and add Teams-specific support to make your experience shine.

![Example of a bot assisting a user](~/assets/images/bot_example.png)

> [!TIP]
> If you are just looking for a way to simply extend your team by integrating with custom tools and services in a secure manner, check out our [custom bots](~/concepts/custom-bot) feature. Be aware, though, that custom bots simply leverage your existing web services&mdash;they can't access non-messaging APIs, perform asynchronous posting, or add button actions to cards.

## What you need to know: Bots

Other than its hexagonal avatar icon, a bot appears just like any other team member you interact with, in a channel or in one-on-one conversations. It is always online and does not have a mood message.

Bots in Teams can surface in a one-on-one context ("personal scope"), as a member of a team ("team scope"), or both. For the latter, they take part in a conversation only when you @mention them. For the former, you can address them via the conversation interface or access them in the apps personal experience from the app bar flyout.

With Microsoft Teams apps, you can make the bot the star of your experience, or just a helper. Bots are distributed as part of your broader app package, which can include other capabilities such as tabs or compose extensions.

If your bot is the star, be sure to take advantage of the [tabs](~/concepts/tabs/tabs-overview) capability as well. Use this rich web view to surface accompanying experiences and information that helps your users best interact with your service.

Microsoft Teams supports much of the [Microsoft Bot Framework](https://dev.botframework.com/) functionality. (If you already have a bot that's based on the Bot Framework, you can easily adapt it to work in Microsoft Teams.) We recommend you use either C# or TypeScript to take advantage of our SDKs.

We want to make development of Microsoft Teams apps as easy as possible, so we build and maintain extensions to the Bot Builder SDK. These packages extend the basic Bot Builder classes and methods with the following:

* Using specialized card types like the Office 365 Connector card
* Consuming and setting Teams-specific channel data on activities
* Processing compose extension requests
* Handling rate limiting

The SDK extensions install dependencies, including the Bot Builder SDK.

* **.NET**&emsp;To use the Microsoft Teams extensions for the Bot Builder SDK for .NET, install the [Microsoft.Bot.Connector.Teams](https://www.nuget.org/packages/Microsoft.Bot.Connector.Teams) NuGet package in your Visual Studio project.
* **Node.js**&emsp;To use the Microsoft Teams extensions for the Bot Builder SDK for Node.js, add the [botbuilder-teams](https://www.npmjs.com/package/botbuilder-teams) npm package.
* **Source code**&emsp;You can find the full source code for the extensions in the [BotBuilder-MicrosoftTeams](https://github.com/OfficeDev/BotBuilder-MicrosoftTeams) repo on Github.

> [!IMPORTANT]
> You can develop Teams apps in any other web-programming technology and call the [Bot Framework REST APIs](https://docs.microsoft.com/en-us/bot-framework/rest-api/bot-framework-rest-overview) directly, but you must perform all token handling yourself.

Follow these steps to build a great Teams bot:

- [Design a great bot](~/get-started/design#designing-a-great-bot): Microsoft Teams is the place for group and team collaboration. Consider what functionality your bot can bring to this collaboration environment, via 1:1 conversations or as part of a channel conversation. A great bot on Teams will also find ways to leverage the unique tabs feature, via a [configurable tab](~/concepts/tabs/tabs-overview) or a [static tab](~/concepts/tabs/tabs-static).
- [Create and register your bot in the Bot Framework](~/concepts/bots/bots-create): Take advantage of the great tools, documentation, and community provided by the Bot Framework team.
- [Develop your bot](~/concepts/bots/bots-conversations): Add basic conversation flow and leverage channel-specific functionality. If you develop in .NET or Node.js, use our [extensions for the Bot Builder SDK](~/get-started/code#microsoft-teams-extensions-for-the-bot-builder-sdk) to simplify your work.
- [Test your bot](~/concepts/bots/bots-test): Add your bot for 1:1 or team conversations to see it in action.
- [Publish your bot](~/publishing/apps-publish): Create your Teams package, add other capabilities, and submit it to the Office Store.

## What you need to know: Custom bots

Custom bots allow you to create a simple bot for basic interaction, like kicking off a workflow or other simple commands you may need. These custom bots live only in the team in which you create them and are intended for simple processes specific to your company's workflow. See [Custom bots](~/concepts/custom-bot) for more information.
