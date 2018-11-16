---
title: Apps for Microsoft Teams
description: Describes how to get started developing apps in Microsoft Teams
keywords: teams development
ms.date: 01/02/2018
---
# Apps for Microsoft Teams

You can extend Microsoft Teams by developing an app that provides content and services. A single app can provide one or more *capabilities*. Deciding which capabilities to offer depends on what you want to do. Apps are available in the Teams store, and can be custom built by you for distribution through the store or directly to your users.

Microsoft Teams apps are web apps, you can use any web-programming technology and can host them on any hosting platform.

An app in Teams consists of the following parts:

* [Tabs](~/concepts/tabs/tabs-overview)
* [Bots](~/concepts/bots/bots-overview)
* [Connectors](~/concepts/connectors/connectors)
* [Messaging extensions](~/concepts/compose-extensions)
* [Activity feed integrations](~/concepts/activity-feed)
* [Outgoing web hooks](~/concepts/outgoingwebhook.md)

A Microsoft Teams app is defined by its manifest (a JSON file). Place the manifest and two icons in a .zip file, and you have an *app package* that you can install into Teams or publish through AppSource. (For details, see [Create the package for your Microsoft Teams app](~/concepts/apps/apps-package).)

*Teams App Studio* is a new tool that will help you to configure your application. It also contains a React control library and configurable samples for cards. See [Getting started with Teams App Studio](~/get-started/get-started-app-studio).

A great app is designed before it is built. Guidance on app design can be found in [Design apps for Microsoft Teams](~/concepts/apps/apps-design), as well as in the [Teams design guide] (~/resources/design/overview).

Once an app has been created and has been a manifest it can be uploaded into a teams channel that you have rights to. See [Upload your custom app in Microsoft Teams](~/concepts/apps/apps-upload).

The final step of creating an app is publication. For more information see: [Publish your app](~/publishing/apps-publish).

## Learn how to develop an app for Microsoft Teams

The fastest way to create your first Microsoft Teams app is to follow one of our "Get started" guides:

* [Get started with .NET and C#](~/get-started/get-started-dotnet-app-studio)
* [Get started with Node.js](~/get-started/get-started-nodejs-app-studio)

After you understand the basics, other sections of this guide are designed to let you dive deeper into apps for Teams.
