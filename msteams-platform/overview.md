---
title: Microsoft Teams developer platform
author: clearab
description: Overview page describing the Microsoft Teams developer platform, and how to get started building apps for Microsoft Teams.
ms.topic: overview
ms.author: anclear
#Customer intent: As a developer, I want to understand why I would want to build a Teams app so that I can solve business problems.
---
# What are Microsoft Teams apps?

Microsoft Teams is a collaboration workspace in Office 365 that integrates with apps and services people use to get work done together. The Microsoft Teams developer platform makes it easy for developers to integrate their own apps and services to improve productivity, make decisions faster, provide focus (by reducing context switching), and create collaboration around existing content and workflows. Apps built on the Microsoft Teams platform are bridges between the Teams client and your services and workflows; bringing them directly into the context of your collaboration platform.

## What can Teams apps do?

Apps built on the Microsoft Teams platform primarily focus on increasing collaboration and improving productivity. Your app can be something simple, like posting notifications from other systems, or complex multi-faceted applications. Just keep in mind that Teams is a social collaboration platform; the best apps focus on helping people express themselves and work better together.

* **Collaborate on items in external systems.** One of the core scenarios for a custom Teams app is to bring information or items into Teams from some other place, and have a conversation around it. You can push information into Teams, enable your users to search for and pull it on demand, or make it available in an embedded web view.

* **Trigger workflows from conversations.** Often conversations result in the need to kick off some workflow or complete some action; take a note about that, review my pull request, convert that to a sales lead, etc. Your Teams app can put access to that workflow right inside of Teams.

* **Notify your team of important events.** Sick of email notifications? Send notifications to Teams instead! Send notifications directly to users, to a channel, to the Activity Feed, or to anyone who subscribes to them.

* **Embed functionality from other sites/services.** Sometimes you just need to make your app easier to discover. Embed your existing single-page app, or build something from scratch for Teams.

## How do Teams apps work?

The first thing to know about custom apps for Microsoft Teams (other than how amazing they can be), is that Teams is not a hosting service. Your app package contains metadata about your app (name, icons, etc.), and pointers to the web services you host that power your app. Microsoft Teams provides the distribution mechanism, UI/UX constructs for you to take advantage of, and APIs you can use to augment the information and actions available to your app.

A Teams app consists of three major pieces:

* **The Microsoft Teams client (web, desktop or mobile)** where users will interact with your app.
* **Your Teams app package** that creates the app installed by your users, and contains your app's metadata and pointers to your services.
* **Your service, workflow or website** which perform the necessary logic, data storage and API calls to power your app.

It is important to keep in mind that any functionality you expose in a Microsoft Teams app is publicly available over the internet unless you take additional steps to secure it. If you are providing access to confidential or protected information you'll want make sure your services are at a minimum authenticating the endpoint connecting to your app, or [authenticating your users](concepts/authentication/authentication.md).

## How can you share your Teams app?

When you're ready to share your Microsoft Teams apps, you have three options depending on who your target audience is.

* **[Upload your app directly](concepts/deploy-and-publish/apps-upload.md)** If your app only needs to be shared to your team, or a few individuals in your organization, you can share your app package and upload it directly.
* **[Publish to your organizational app catalog](concepts/deploy-and-publish/apps-upload.md)** You can share your app with your entire organization through your app catalog.
* **[Publish to the public app store](concepts/deploy-and-publish/apps-upload.md)** If your app is for everyone, you can publish it to our public app store. Depending on your goals, you might be eligible for marketing and sales assistance.

## Get started

* [Build a bot and tab app in C#](tutorials/get-started-dotnet-app-studio.md)
* [Build a bot and tab app in JavaScript/Node.js](tutorials/get-started-nodejs-app-studio.md)

## Learn more

* [Extensibility points in the Teams client](concepts/extensibility-points.md)
* [Building apps for Teams](concepts/building-an-app.md)
