---
title: Get started - Overview
description: Overview to Get started for Microsoft Teams Developer Documentation
ms.localizationpriority: medium
ms.topic: reference
keywords: Microsoft Teams developer samples
---
# Overview

Welcome to Get started for building and deploying customized apps for Microsoft Teams!

Walk through the steps to build a basic, real-world Teams app. The Get started also introduces you to common tools, fundamental concepts, and more advanced features.

You will:

- Create a Teams app with capabilities like Tabs, Bots, and Message Extension. 
- Deploy an app locally or on the cloud.
- Look through Code Samples to customize and configure app capabilities.

## What you'll learn

Here's an idea of what you'll know after going through the lessons:

- Get up and running quickly with the Microsoft Teams Toolkit (a Visual Studio Code extension).
- Get experience with the Toolkit and SDKs.
- Configure and build different types of Teams apps.

### Teams app fundamentals

Some common scenarios that a custom Microsoft Teams app can help with are:

* Embed your website or web app directly in the Teams client.
* Help users quickly look up information in another system and add the results to a conversation in Teams.
* Trigger workflows and processes based on a conversation in Teams, preserving the context of the conversation.

Before you begin, here's a quick glance at the road-map to building and deploying a Teams app.

The [Teams developer platform](../overview.md) lets you build a custom app in three steps.

:::image type="content" source="../assets/images/get-started/get-started-build-deploy-app-overview.png" alt-text="Illustration showing three basic steps to build and deploy a Teams app.":::


### App capabilities

A Teams app is made up of one or more [platform capabilities](../concepts/capabilities-overview.md) and [user interaction points](../concepts/extensibility-points.md).

Depending on the capabilities you want for your app, choose an appropriate development tool set.

| App capabilities | User interactions | Recommended tools | SDKs | Technology stacks |
|--------|-------------|--------|--------|--------|
| Tabs | A full-screen embedded web experience. | VS Code with Teams Toolkit extension, or YoTeams (Yeoman Generator) | [Teams Fx](/javascript/api/@microsoft/teamsfx/?view=msteams-client-js-latest&preserve-view=true) for core libs & [Teams client SDK](/javascript/api/@microsoft/teams-js/?view=msteams-client-js-latest&preserve-view=true) | Web technology in general, HTML, CSS, and JavaScript |
| Bots | A chat bot that converses with members. | VS Code with Teams Toolkit extension, or YoTeams (Yeoman Generator) | [Teams Fx](/javascript/api/@microsoft/teamsfx/?view=msteams-client-js-latest&preserve-view=true) & [Bot Framework SDK](https://dev.botframework.com/) | Node.js, C#, or Python |
| Messaging extensions | Shortcuts for inserting external content into a conversation or taking action on messages. | VS Code with Teams Toolkit extension, or YoTeams (Yeoman Generator) | [Teams Fx](/javascript/api/@microsoft/teamsfx/?view=msteams-client-js-latest&preserve-view=true) & [Bot Framework SDK](https://dev.botframework.com/) | Node.js, C#, or Python |

The Get started section takes you through recommended tool sets. It also covers commonly used technologies, such as:
- Visual Studio Code with Teams extension.
- React.js for tabs.
- Node.js for bots and messaging extensions.

*You aren't limited to using these particular stacks*.
If you prefer using a command-line interface (CLI), see [create your first Microsoft Teams app using the Yeoman generator](../get-started/get-started-yeoman.md).

### Teams doesn't host your app

You can install only an app package. This package contains:
- A configuration file, called manifest.
- App icons for Teams client. 

The remaining app logic and data storage are hosted elsewhere, such as Azure Web Services. While in the cloud or localhost during the development, your app accesses Teams via HTTPS.

:::image type="content" source="../assets/images/build-your-first-app/app-in-cloud.png" alt-text="Illustration showing your app on Teams is pointing to your app logic in the cloud server.":::

### Your first app development flow

This diagram shows what you are goint to do in the Get Started tutorial. At each tutorial, you will create a new app with one capability (for instance, a tab in the first tuorial), then build and run the app on your Teams tenant. 

Later, you will learn how to deploy using Toolkit in [Deploy your first Teams app in Azure](get-started-deploy-teams-app-azure.md) section:

:::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/development-flow.png" alt-text="Your Teams app development flow." border="false":::

## Next step 

Now, let's build your fisrt app! But first, make sure to check the prerequisites.

> [!div class="nextstepaction"]
> [Prerequisites](prerequisites.md)