---
title: Develop apps
description: Describes how to get started developing apps in Microsoft Teams
keywords: teams development
---

# Develop apps in Microsoft Teams

In Microsoft Teams, a single app can provide one or more *capabilities*. Deciding which capabilities to offer depends on what you want to do.

For example, your users might want personal views of a planning app just a click away. Or they might need to look up a customer-support ticket and add it directly to a conversation. Or perhaps receive real-time notifications about events in a business system. Or get assistance in scheduling an event for a group, translate a message into another language, or track incoming social-media messages and respond directly from Teams.

Your app can provide services in channels, which enable teams to work collaboratively, or one-on-one with individual users&mdash;or both. (The term we use for services in channels is *team scope*; for one-on-one, *personal scope*.)

## Map your scenario to Teams capabilities

After you decide what your app should do, you can map those activities to capabilities in Teams:

*	For simple information display or interaction with web-based data, consider using *tabs*. Examples of tabs include dashboards with data visualization, documents, notes, task managers, and design canvases.
*	For natural-language questions and lightweight tasks, consider using *bots*. By using bots, users can monitor and control build systems, receive and sign documents, schedule meetings or travel, and quickly gather information from their teams. Notification-only bots can push relevant information directly to a specific user in a channel or a direct message.
*	To look up information and insert it directly into a conversation, consider using *compose extensions*. With compose extensions, users can insert text, links, pictures, videos, and other rich media without switching to another app.

## Leverage what you've already built

The following table provides a few ideas about bringing resources you've already created into Microsoft Teams.

| If I have an existing&hellip; | In Microsoft Teams it can be a&hellip; |
| --- | --- |
| Web app | Tab |
| Bot built with Bot Framework | [Bot](~/concepts/bots/bots-overview) (and a [compose extension](~/concepts/compose-extensions), if you'd like)
| Office 365 Connector | [Connector](~/concepts/connectors) |
| Web service (to look up information) | [Compose extension](~/concepts/compose-extensions) |
| Outgoing webhook | [Custom bot](~/concepts/custom-bot) |

>**Tip:** If you've created a bot that uses the Microsoft Bot Framework, you can make it work in Microsoft Teams, both as a bot that can chat with a user or a team channel and as a compose extension to quickly insert information in a conversation.

## Get started developing

The fastest way to create your first Microsoft Teams app is to follow one of our "Get started" guides:

*	[Get started with .NET and C#](~/get-started/get-started-dotnet)
*	[Get started with Node.js](~/get-started/get-started-nodejs)

Because Microsoft Teams apps are composed web services, you can use any web-programming technology. For tabs, we provide a JavaScript library. For bots and compose extensions, we recommend you use either C# or TypeScript to take advantage of our [SDK extensions](#microsoft-teams-extensions-for-the-bot-builder-sdk) for .NET and Node.js.

### Develop your tab

Tabs are simply iframe'd web content. You can leverage your existing web service, written in any language and hosted on any cloud platform, and simply include the [Microsoft Teams JavaScript client SDK](~/reference/library/client-sdk-javascript) in pages you display in Teams. This library provides methods for your tab and your authentication and configuration experiences.

A *configurable tab* becomes part of a channel and provides a single kind of information to a team. For example, the Planner tab for a channel contains a single plan; the Power BI tab maps to a specific report. Users can drill down to the relevant context, but they should not be able to navigate outside the tab. The Power BI tab, for instance, doesn't enable navigation to other Power BI reports&mdash;but it does enable the **Go to website** button that launches the report in the main Power BI website.

A *static tab* supports an individual user. For example, if your service is a notetaking app, add a tab that holds personal notes. That way, a user can refer to his or her own notes without having to share them with an entire team.

### Develop your bot and compose extension

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

---

Ready to get started adding your experience into Teams?

* [Design your app](~/reference/design/framework/basics)
* Code your app's capabilities
  * [Tabs](~/concepts/tabs/tabs-overview)
  * [Bots](~/concepts/bots/bots-overview)
  * [Connectors](~/concepts/connectors)
  * [Compose extensions](~/concepts/compose-extensions)
  * [Activity feed integrations](~/concepts/activity-feed)
