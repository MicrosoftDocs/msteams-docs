---
title: App code samples
description: Links and descriptions of sample applications for the Microsoft Teams developer platform
localization_priority: Normal
ms.topic: reference
keywords: Microsoft Teams developer samples
---
# Overview

In this sample tutorial, you will learn how to create an app using React, Blazor, SPFx, C# or .NET, Node.js, and Yeoman Generator. You will also learn to create your first bot and messaging extension. This tutorial will take you through multiple Code Samples for Tabs, Bots, Messaging Extensions, Webhooks and Connectors, and Graph APIs that will help you to customize and configure your apps. In addition, you can also refer to the Microsoft Learn sections where you can extend the Teams developer platform capabilities by creating custom apps.  

## Getting started with Microsoft Learn

| **Capability**| **Learn module**|
|--------|-------------|
| Tabs  — embedded web experiences  |  [Create embedded web experiences with tabs for Microsoft Teams](/learn/modules/embedded-web-experiences/) |
| Webhooks and connectors  |  [Connect web services to Microsoft Teams with webhooks and Office 365 Connectors](/learn/modules/msteams-webhooks-connectors/) |
|Messaging extensions  | [Task-oriented interactions in Microsoft Teams with messaging extensions](/learn/modules/msteams-messaging-extensions/)  |
| Task modules |  [Collect input in Microsoft Teams with Task Modules](/learn/modules/msteams-task-modules/) |
| Conversational bots  | [Create interactive conversational bots for Microsoft Teams](/learn/modules/msteams-conversation-bots/)  |

## Build your first Microsoft Teams app overview

In the **get started** lessons, you learn how to create basic Teams apps. Each tutorial walks through how to build a simple, real-world Teams app while introducing you to common tools, fundamental concepts, and more advanced features.

### Teams app fundamentals

The [Teams developer platform](../overview.md) lets you build custom apps. Some common scenarios that a custom Microsoft Teams app can help with are:

* Embed your website or web app directly in the Teams client.
* Help users quickly look up information in another system and add the results to a conversation in Teams.
* Trigger workflows and processes based on a conversation in Teams, preserving the context of the conversation.

Before you begin the tutorials, you should know the following about building apps for Teams.

### App capabilities

A Teams app is made up of one or more [platform capabilities](../concepts/capabilities-overview.md) and [user interaction points](../concepts/extensibility-points.md).

Depending on what capabilities you want for your app, you will need an appropriate development toolset.

| App capabilities | User interactions | Recommended tools | SDKs | Technology stacks |
|--------|-------------||--------||--------||--------|
| Tabs | A full-screen embedded web experience. | VS Code with Teams Toolkit extension, or YoTeams (Yeoman Generator) | [Teams client SDK](/javascript/api/overview/msteams-client) | Web technology in general, HTML, CSS, and JavaScript |
| Bots | A chat bot that converses with members. | VS Code with Teams Toolkit extension, or YoTeams (Yeoman Generator) | [Bot Framework SDK](https://dev.botframework.com/) | Node.js, C#, or Python |
| Messaging extensions | Shortcuts for inserting external content into a conversation or taking action on messages. | VS Code with Teams Toolkit extension, or YoTeams (Yeoman Generator) | [Bot Framework SDK](https://dev.botframework.com/) | Node.js, C#, or Python |

The Get started section will take you through recommended tool sets and commonly used technologies, such as Visual Studio Code with Teams extension, React.js for tabs, and Node.js for bots and messaging extensions, although *you are not limited to using these particular stacks*.

If you prefer using a command-line interface (CLI), see [create your first Microsoft Teams app using the Yeoman generator](../get-started/get-started-yeoman.md).

### Teams does not host your app

You will only install an app package that contains a configuration file, called manifest and app icons to Teams client. The rest of the app logics and data storage are hosted elsewhere, such as Azure Web Services. Your app in the cloud or localhost during your development accesses Teams via HTTPS.

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