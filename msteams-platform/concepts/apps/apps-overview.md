---
title: Develop apps
description: Describes how to get started developing apps in Microsoft Teams
keywords: teams development
---

# Develop apps for Microsoft Teams

You can extend Microsoft Teams by developing an app that provides content and services. A single app can provide one or more *capabilities*. Deciding which capabilities to offer depends on what you want to do.

For example, your users might want personal views of a planning app just a click away. Or they might need to look up a customer-support ticket and add it directly to a conversation. Or perhaps receive real-time notifications about events in a business system. Or get assistance in scheduling an event for a group, translate a message into another language, or track incoming social-media messages and respond directly from Teams.

Your app can provide content and services in channels, which enable teams to work collaboratively, or in  one-on-one or group chats&mdash;or both. (The term we use for services in channels is *team scope*; for chats, *personal scope*.)

A Microsoft Teams app is defined by its manifest (a JSON file). Place the manifest and two icons in a .zip file, and you have an *app package*, which enables installation into Teams or publication through the Office Store. (For details, see [Create the package for your Microsoft Teams app](~/publishing/apps-package).)

## Map your scenario to Teams capabilities

After you decide what your app should do, you can map those activities to capabilities in Teams:

*	For simple information display or interaction with web-based data, consider using [**tabs**](~/concepts/tabs/tabs-overview). Your tabs can be as simple as documents or notes or as rich as dashboards with data visualization, or design canvases.
*	For natural-language questions and lightweight tasks, consider using [**bots**](~/concepts/bots/bots-overview). Your bots might monitor and control build systems, receive and sign documents, schedule meetings or travel, or quickly gather information from team members. Notification-only bots can push relevant information directly to a specific user in a channel or a direct message.
*	To look up information and insert it directly into a conversation, consider using [**compose extensions**](~/concepts/compose-extensions). With compose extensions, you enable users to insert text, links, pictures, videos, and other rich media without switching to another app.

## Leverage what you've already built

The following table provides a few ideas about bringing resources you've already created into Microsoft Teams.

| If I have an existing&hellip; | In Microsoft Teams it can be a&hellip; |
| --- | --- |
| Web app | [Tab](~concepts/tabs/tabs-overview) |
| Bot built with Bot Framework | [Bot](~/concepts/bots/bots-overview) (and a [compose extension](~/concepts/compose-extensions), if you'd like)
| Office 365 Connector | [Connector](~/concepts/connectors) |
| Web service (to look up information) | [Compose extension](~/concepts/compose-extensions) |
| Outgoing webhook | [Custom bot](~/concepts/custom-bot) |

## Learn how to develop an app for Microsoft Teams

Because Microsoft Teams apps are composite web apps, you can use any web-programming technology.

The fastest way to create your first Microsoft Teams app is to follow one of our "Get started" guides:

*	[Get started with .NET and C#](~/get-started/get-started-dotnet)
*	[Get started with Node.js](~/get-started/get-started-nodejs)

-----------------------------------------------


For bots and compose extensions, we recommend you use either C# or TypeScript to take advantage of our [SDK extensions](#microsoft-teams-extensions-for-the-bot-builder-sdk) for .NET and Node.js.

### What you need to know: Bots and compose extensions

Because your Teams bots and compose extensions are built on the [Microsoft Bot Framework](https://dev.botframework.com/), we recommend that you leverage the [Bot Builder SDK](https://docs.microsoft.com/en-us/bot-framework/resources-tools-downloads), available for .NET and for Node.js.

>**Note:** You can develop in any other web-programming technology and call the [Bot Framework REST APIs](https://docs.microsoft.com/en-us/bot-framework/rest-api/bot-framework-rest-overview) directly, but you must perform all token handling yourself.

We want to make development of Microsoft Teams apps as easy as possible, so we build and maintain extensions to the Bot Builder SDK. These packages extend the basic Bot Builder classes and methods with the following:

* Specialized Teams card types like the Office 365 Connector card
* Consuming and setting Teams-specific channel data on activities
* Processing compose extension requests
* Handling rate limiting

Both packages install dependencies, including the Bot Builder SDK.

#### .NET extensions

To use the Microsoft Teams extensions for the Bot Builder SDK for .NET, install the [Microsoft.Bot.Connector.Teams](https://www.nuget.org/packages/Microsoft.Bot.Connector.Teams) NuGet package in your Visual Studio project.

#### Node.js extensions

To use the Microsoft Teams extensions for the Bot Builder SDK for Node.js, add the [botbuilder-teams](https://www.npmjs.com/package/botbuilder-teams) npm package.

#### Source code

You can find the full source code for the extensions in the [BotBuilder-MicrosoftTeams](https://github.com/OfficeDev/BotBuilder-MicrosoftTeams) repo on Github.


-----------------------------------------------

Ready to start adding your experience into Teams?

* [Design your app](~/reference/design/framework/basics)
* Code your app's capabilities
  * [Tabs](~/concepts/tabs/tabs-overview)
  * [Bots](~/concepts/bots/bots-overview)
  * [Connectors](~/concepts/connectors)
  * [Compose extensions](~/concepts/compose-extensions)
  * [Activity feed integrations](~/concepts/activity-feed)
* Package, test, and publish your app
  * [Package your app](~/publishing/apps-package)
  * [Sideload your app](~/concepts/apps-sideload)
  * [Publish your app](~/publishing/apps-publish)
