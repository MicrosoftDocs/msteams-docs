---
title: App code samples
description: Links and descriptions of sample applications for the Microsoft Teams developer platform
ms.localizationpriority: medium
ms.topic: reference
keywords: Microsoft Teams developer samples
---
# Overview

This tutorial introduces you to building and deploying Microsoft Teams apps. Learn how to create a Microsoft Teams app using Teams Toolkit, React, Blazor, SPFx, C# or .NET, Node.js, and Yeoman Generator. You also learn to create your first bot and messaging extension. 

Look through multiple Code Samples for Tabs, Bots, Messaging Extensions, Webhooks and Connectors, and Graph APIs. These samples help you to customize and configure your apps.

## Build your first Microsoft Teams app overview

In the **get started** tutorial, you learn how to create basic Teams apps. Each tutorial walks through how to build a basic, real-world Teams app while introducing you to common tools, fundamental concepts, and more advanced features.  

Additionally, this section includes alternative guides for you who are already familiar with Blazor, SPFx, C# or .NET, and Yeoman Generator.

## What you'll learn

Here's an idea of what you'll know after going through the lessons. 

- Get up and running quickly with the Microsoft Teams Toolkit (a Visual Studio Code extension) 
- Get experience with the Toolkit and SDKs 
- Configure and build different types of Teams apps


### Teams app fundamentals

The [Teams developer platform](../overview.md) lets you build a custom app in three steps.

:::image type="content" source="../assets/images/build-your-first-app/get-started-build-deploy-app-overview.png" alt-text="Illustration showing three basic steps to build and deploy a Teams app.":::

Some common scenarios that a custom Microsoft Teams app can help with are:

* Embed your website or web app directly in the Teams client.
* Help users quickly look up information in another system and add the results to a conversation in Teams.
* Trigger workflows and processes based on a conversation in Teams, preserving the context of the conversation.

Before you begin the tutorials, you should know about app capabilities.

### App capabilities

A Teams app is made up of one or more [platform capabilities](../concepts/capabilities-overview.md) and [user interaction points](../concepts/extensibility-points.md).

Depending on the capabilities you want for your app, you need an appropriate development toolset.

| App capabilities | User interactions | Recommended tools | SDKs | Technology stacks |
|--------|-------------|--------|--------|--------|
| Tabs | A full-screen embedded web experience. | VS Code with Teams Toolkit extension, or YoTeams (Yeoman Generator) | [Teams client SDK](/javascript/api/overview/msteams-client) | Web technology in general, HTML, CSS, and JavaScript |
| Bots | A chat bot that converses with members. | VS Code with Teams Toolkit extension, or YoTeams (Yeoman Generator) | [Bot Framework SDK](https://dev.botframework.com/) | Node.js, C#, or Python |
| Messaging extensions | Shortcuts for inserting external content into a conversation or taking action on messages. | VS Code with Teams Toolkit extension, or YoTeams (Yeoman Generator) | [Bot Framework SDK](https://dev.botframework.com/) | Node.js, C#, or Python |

The Get started section takes you through recommended tool sets. It also covers commonly used technologies, such as: 
- Visual Studio Code with Teams extension.
- React.js for tabs.
- Node.js for bots and messaging extensions.

*You aren't limited to using these particular stacks*.

If you prefer using a command-line interface (CLI), see [create your first Microsoft Teams app using the Yeoman generator](../get-started/get-started-yeoman.md).

### Teams doesn't host your app

You can only install an app package. This package contains a configuration file, called manifest, and app icons for Teams client. 
The remaining app logic and data storage are hosted elsewhere, such as Azure Web Services. Your app, in the cloud or localhost during the development, accesses Teams via HTTPS.

:::image type="content" source="../assets/images/build-your-first-app/app-in-cloud.png" alt-text="Illustration showing your app on Teams is pointing to your app logic in the cloud server.":::

## See also

* [Create an app using React](first-app-react.md)
* [Create an app using Blazor](first-app-blazor.md)
* [Create an app using SPFx](first-app-spfx.md)
* [Create an app using C# or .NET](get-started-dotnet-app-studio.md)
* [Create an app using Node.js](get-started-nodejs-app-studio.md)
* [Create an app using Yeoman generator](get-started-yeoman.md)
* [Create a conversational bot app](first-app-bot.md)
* [Create a messaging extension](first-message-extension.md)
* [Code Samples](https://github.com/OfficeDev/Microsoft-Teams-Samples)
