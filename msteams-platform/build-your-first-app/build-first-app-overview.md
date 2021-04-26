---
title: Get started - Build your first app overview and prerequisites
author: girliemac
description: Learn how to get started with Microsoft Teams app development and set up your environment.
ms.author: timura
ms.date: 03/18/2021
ms.topic: quickstart
---
# Overview

The Get Started tutorial teaches you to create basic Teams apps. It contains a series of lessons that begin with building and running a basic app. It further introduces you to common tools, fundemental concepts, and more advanced features of Teams.

Build a simple app to learn the basics of Teams app development. After you see "Hello, World!", try any of the other get started articles for more information on common tools, fundamental concepts, and advanced features.

> [!VIDEO https://www.youtube-nocookie.com/embed/jugBQqE_2sM]

## What you'll learn

* Get up and running quickly with the Teams Toolkit, a Visual Studio Code extension 
* Configure your app with App Studio 
* Get familiar with Teams tools and SDKs
* Consider important Teams app concepts, such as authentication and design best practices

Tutorials in this section will walk you through the following recommended tool sets and commonly used Technologies:

* Visual Studio Code with Teams extension
* React.js for tabs
* Node.js for bots and messaging extensions

You can also use any other technologies of your choice. You can also use a command-line interface (CLI), if you prefer to do so.

## Teams app fundamentals

You can build custom Teams apps for yourself, people in your org, or people all over the world. Before you begin, you should understand the following fundamental concepts about Teams app development:

### Common app usecases

Some typical scenarios that a custom Microsoft Teams app can help with are:

* Embed web-based content, such as a web app or part of a website, in the Teams client
* Look up information quickly in another system and adding it to a Teams conversation 
* Trigger workflows and processes directly from what's said in a conversation 

### App capabilities and tools

An app is made up of one or more Teams capabilities and user interaction points. Your development toolset will vary depending on the capabilities you want.

| **App Capabilities**| **Interaction points** | **Recommended tools** | **SDKs** | **Technology stacks** |
|--------|--------|--------|--------|--------|
| Tabs | Spaces where users can interact with embedded web content in personal and shared contexts | VS Code with Teams Toolkit extension or Yeoman Generator | Teams JavaScript client SDK | General web technologies (HTML, CSS, and JavaScript) or React.js |
| Bots | Chatbots that interact with users in personal and shared contexts | VS Code with Teams Toolkit extension or Yeoman Generator | Bot Franework SDK | Node.js, C#, or Python | 
| Messaging extensions | Shortcuts for inserting app content or acting on a message without navigating away from the conversation | VS Code with Teams Toolkit extension or Yeoman Generator | Bot Framework SDK | Node.js, C#, or Python |

### Teams doesn't host your app

When a user installs your app in Teams, they only install an app package that contains a configuration file, also known as app manifest, and your app’s icons. Your app’s logic and data storage are hosted elsewhere, such as Azure Web Services or localhost during development. Teams accesses these resources via HTTPS.

:::image type="content" source="../assets/images/build-your-first-app/app-in-cloud.png" alt-text="Illustration showing your app on Teams is pointing to your app logic in the cloud server.":::

## Next step

> [!div class="nextstepaction"]
> [Build and run your first Teams app](../build-your-first-app/build-and-run.md)