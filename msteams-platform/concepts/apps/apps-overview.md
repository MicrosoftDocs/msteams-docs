---
title: Develop apps
description: Describes how to get started developing apps in Microsoft Teams
keywords: teams development
---

# Develop apps for Microsoft Teams

You can extend Microsoft Teams by developing an app that provides content and services. A single app can provide one or more *capabilities*. Deciding which capabilities to offer depends on what you want to do.

For example, your users might want personal views of a planning app just a click away. Or they might need to look up a customer-support ticket and add it directly to a conversation. Or perhaps receive real-time notifications about events in a business system. Or get assistance in scheduling an event for a group, translate a message into another language, or track incoming social-media messages and respond directly from Teams.

Your app can provide content and services in channels, which enable groups of people to work collaboratively, or in one-on-one or group chats&mdash;or both. (The term we use for services in channels is *team scope*; for chats, *personal scope*.)

A Microsoft Teams app is defined by its manifest (a JSON file). Place the manifest and two icons in a .zip file, and you have an *app package* that you can install into Teams or publish through the Office Store. (For details, see [Create the package for your Microsoft Teams app](~/publishing/apps-package).)

## Map your scenario to Teams capabilities

After you decide what your app should do, you can map those activities to capabilities in Teams:

*	For simple information display or interaction with web-based data, consider using [**tabs**](~/concepts/tabs/tabs-overview). Your tabs can be as simple as documents or notes or as rich as dashboards with data visualization, or design canvases.
*	For natural-language questions and lightweight tasks, consider using [**bots**](~/concepts/bots/bots-overview). Your bots might monitor and control build systems, schedule meetings or travel, or quickly gather information from team members. Notification-only bots can push relevant information directly to a specific user in a channel or a direct message.
*	To look up information and insert it directly into a conversation, consider using [**compose extensions**](~/concepts/compose-extensions). With compose extensions, you enable users to insert text, links, pictures, videos, and other rich media without switching to another app.

## Leverage what you've already built

The following table provides a few ideas about bringing resources you've already created into Microsoft Teams.

| If I have an existing&hellip; | In Microsoft Teams it can be a&hellip; |
| --- | --- |
| Web app | [Tab](~/concepts/tabs/tabs-overview) |
| Bot built with Bot Framework | [Bot](~/concepts/bots/bots-overview) (and a [compose extension](~/concepts/compose-extensions), if you'd like)
| Office 365 Connector | [Connector](~/concepts/connectors) |
| Web service (to look up information) | [Compose extension](~/concepts/compose-extensions) |
| Outgoing webhook | [Custom bot](~/concepts/custom-bot) |

## Learn how to develop an app for Microsoft Teams

Because Microsoft Teams apps are composite web apps, you can use any web-programming technology.

The fastest way to create your first Microsoft Teams app is to follow one of our "Get started" guides:

* [Get started with .NET and C#](~/get-started/get-started-dotnet)
* [Get started with Node.js](~/get-started/get-started-nodejs)

Ready to start adding your experience into Teams?

* [Design your app](~/get-started/design)
* Code your app's capabilities
  * [Tabs](~/concepts/tabs/tabs-overview)
  * [Bots](~/concepts/bots/bots-overview)
  * [Connectors](~/concepts/connectors)
  * [Compose extensions](~/concepts/compose-extensions)
  * [Activity feed integrations](~/concepts/activity-feed)
* Package, test, and publish your app
  * [Package your app](~/publishing/apps-package)
  * [Sideload your app](~/concepts/apps/apps-sideload)
  * [Publish your app](~/publishing/apps-publish)
