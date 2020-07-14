---
title: Building an app for Microsoft Teams
author: clearab
description: Understand the typical process for building an app for Microsoft Teams.
ms.topic: conceptual
ms.author: anclear
---
# Building an app for Microsoft Teams

> [!NOTE] 🚀
> Looking to get started quickly? You can build Teams apps with the [Microsoft Teams Toolkit and Visual Studio Code](../toolkit/visual-studio-code-overview.md).

Creating and distributing an app built on the Microsoft Teams Platform involves deciding what to build, building your web services, creating an app package, and distributing that package to your target end users. It will be up to an organization's administrators to decide who can access and install your app, and it will be up to your users to install your app in any particular context.

## Design a great app

The most important step in creating a successful app for Microsoft Teams is choosing the right combination extensibility points and UI elements to take advantage of. Sometimes, this is a fairly easy decision, but for more complex apps you should spend a good deal of time understanding the problem you're trying to solve with your app and mapping your solution across the various ways users can interact with your app in the Microsoft Teams client. Don't underestimate the importance of context and scope! A conversational bot that works very well in a one-to-one chat may not work at all as part of a group chat or channel conversation.

1. First, [understand the Teams client extensibility points and UI elements](~/concepts/extensibility-points.md) available for your app.

2. Next, make sure you [understand your use cases](~/concepts/design/understand-use-cases.md).

3. Finally, [map your use cases to Teams platform features](~/concepts/design/map-use-cases.md).

Once you've decided what extensibility points and features your app will take advantage of, you'll want to think through each of those interactions. Depending on the design of your app, you might want to look at:

* [Designing great tabs](~/tabs/design/tabs.md)
* [Designing useful conversational bots](~/bots/design/bots.md)

## Prepare your environment

You need to make sure you have an environment where you can upload and test your Teams app. If you don't already have an O365 subscription with Teams enabled and the ability to upload apps to it you can [sign up for the O365 developer program](https://developer.microsoft.com/microsoft-365/dev-program) which will give you access to a free Office 365 subscription for development purposes.

See [prepare your O365 environment](~/concepts/build-and-test/prepare-your-o365-tenant.md) for additional information.

## Build and test your app

Building and testing your app for Microsoft Teams isn't much different than building any other web app. The primary difference is the need to use your app manifest in your app package to connect the Teams client to your web services. Any time you make a change to your app manifest, you'll need to re-upload your app package, and update your app in Teams by re-installing it. Changes to your web service however, do not require you to re-install your app in the Teams client.

When you're initially creating your app you'll regularly be updating both your web services and your app package, typically re-uploading and install the app in the Teams client multiple times (particularly during the initial setup of your app). However, as what you're building stabilizes the need to alter your app manifest will decrease and you'll primarily be making changes to your web service.

### Build your web services

Once you've decided how users are going to interact with your app, its time to build the web services to power it. Depending on what you're creating, Teams provides various SDKs, templates, code samples, and generators to help you get started, including:

* Bot Framework SDK for [messaging extensions](~/messaging-extensions/what-are-messaging-extensions.md) and [conversational bots](~/bots/what-are-bots.md)
* Teams JavaScript client SDK for [tabs](~/tabs/what-are-tabs.md) and other content pages
* A [Yeoman generator](~/tutorials/get-started-yeoman.md) for building apps in Node.js
* **Preview** A set of open-source controls for your web content pages - [Fluent UI](https://microsoft.github.io/fluent-ui-react/)
* Ready-for-production [App Templates](~/samples/app-templates.md)
* Various [samples](~/samples/code-samples.md) to help you get started

Remember, you'll need to host your web services in a way that makes them publicly accessible over the internet (typically in a cloud service provider like Azure), and serve up your content over HTTPS.

### Create your app package

You'll also need to create an app package that can be distributed and installed in Microsoft Teams. The app package contains two icons and a JSON manifest file describing the metadata for your app, the extension points your app is using, and pointers to the services powering those extension points.

When creating your app package you can choose to create it manually, or use App Studio which is an app inside Teams that helps you make Teams apps (we know, very meta). App Studio will guide you through creating your app manifest, and can help you register your bot with the Bot Framework. It also contains a card designer to help you visually create cards and card actions, and send examples to yourself in Teams.

## Distributing your app

You have three options for [distributing your Microsoft Teams app](~/concepts/deploy-and-publish/apps-publish.md), depending on your target audience.

* **Share your app package directly.** You can choose to share your app package directly with users. This is particularly useful if your app is directed towards a limited audience (just a couple of teams or individuals), and during development and testing of your app.
  
* **Publish your app to your organizational app catalog.** If your app is applicable to a specific organization (or if you've customized your app to meet an organization's specific needs), a tenant administrator can upload your app to the organization's app catalog. This makes your app available for anyone in the organization to install (but does not automatically install it).
  
* **Publish your app to the public App Store.** If your app is intended for all Teams users everywhere, you can submit your app for publication in the public app store. You'll need to go through a rigorous review process, so make sure you've dotted your i's and crossed your t's.

When distributing your app you need to take into consideration not just your desired audience, but the IT policies in place in the organization you want to share your app with. Each organization has complete control over determining which apps will be uploaded to their organizational app catalog, and which apps are available to install from the app store.

### The app you create versus the app your users install

Your app may take advantage of multiple extensibility points in the Teams client, and work in a variety of scopes. Your app package you distribute to users will define all of these as a single entity. However, because all app installations in Microsoft Teams are *context-specific*, the entirety of your app may not always be installed for all users.

For example, imagine your app contains a conversational bot that works in both a personal and team conversations, as well as both a personal tab and a channel tab. When your app is installed, it will be installed in a specific context - if a user installs the app in a team, they have not necessarily installed the personal portion of your app. This can be a bit confusing at first, just remember to never expect that all portions of your app will be installed and configure in any given context.

## Getting started tutorials

* [Build a bot and tab app in C#](~/tutorials/get-started-dotnet-app-studio.md)
* [Build a bot and tab app in JavaScript/Node.js](~/tutorials/get-started-nodejs-app-studio.md)
* [Create an app with the Yeoman generator](~/tutorials/get-started-yeoman.md)
