---
title: Get started - Overview
description: Get started. Build your first Microsoft Teams app based on language (Node.js, C#, Java, and Python) and developement environment, understand app capabilities, SDKs.
ms.localizationpriority: high
ms.topic: reference
---
# Get started

Welcome to Get started for building and deploying customized apps for Microsoft Teams!

Walk through the steps to build a basic, real-world Teams app. The Get started also introduces you to common tools, fundamental concepts, and more advanced features.

Here's an idea of what you'll learn:

* Get up and running quickly with the Microsoft Teams Toolkit (a Visual Studio Code extension).
* Learn to build scenario-based apps, such as a notification bot.
* Get experience with the Toolkit and SDKs.
* Configure and build different types of Teams apps.
* Learn about extending your Teams app across Microsoft 365.

Let's take a quick glance at the build environment options you can choose from, and the road-map to build and deploy a Teams app.

:::image type="content" source="../assets/images/get-started/gs-build-options.png" alt-text="Illustration showing basic steps to build and deploy a Teams app":::

## App capabilities and development tools

Depending on the capabilities you want for your app, choose an appropriate development tool set.

| App capabilities | User interactions | Recommended tools | SDKs | Technology stacks / Languages |
|--------|-------------|--------|--------|--------|
| Tabs | A full-screen embedded web experience. | Microsoft Visual Studio Code with Teams Toolkit extension, or [TeamsFx CLI](https://github.com/OfficeDev/TeamsFx/blob/dev/docs/cli/user-manual.md) if you prefer using CLI | [TeamsFx SDK](/javascript/api/@microsoft/teamsfx/?view=msteams-client-js-latest&preserve-view=true) for core libs and [Teams JavaScript client library](/javascript/api/overview/msteams-client?view=msteams-client-js-latest&preserve-view=true) for UI functionalities | Web technology in general, HTML, CSS, and JavaScript (incl. React). |
| Bots | A chat bot that converses with members. | Visual Studio Code with Teams Toolkit extension, or [TeamsFx CLI](https://github.com/OfficeDev/TeamsFx/blob/dev/docs/cli/user-manual.md) | [TeamsFx SDK](/javascript/api/@microsoft/teamsfx/?view=msteams-client-js-latest&preserve-view=true) and [Bot Framework SDK](https://dev.botframework.com/) | Node.js, C#, Java, and Python. |
| Message extensions | Shortcuts for inserting external content into a conversation or taking action on messages. | Visual Studio Code with Teams Toolkit extension, or [TeamsFx CLI](https://github.com/OfficeDev/TeamsFx/blob/dev/docs/cli/user-manual.md) | [TeamsFx SDK](/javascript/api/@microsoft/teamsfx/?view=msteams-client-js-latest&preserve-view=true) and [Bot Framework SDK](https://dev.botframework.com/) | Node.js, C#, Java, and Python. |

*You aren't limited to using these particular stacks!*

If you are already familiar with Yeoman workflow, you may prefer using [YoTeams Yeoman Generator](https://github.com/pnp/generator-teams/blob/master/docs/docs/tutorials/build-your-first-microsoft-teams-app.md) to build your apps.

### Build your Teams app

Here’s how you proceed:

Select the section based on the type of Teams app you want to build:

If you’re new to building a Teams app, see [build a basic Teams app](#build-a-basic-teams-app)

If you’ve created Teams app, and want to build apps to suit a particular scenario, see [Scenario-based apps](#build-a-scenario-based-teams-app).

If you want to extend your Teams app across M365, see [Extend Teams app across M365](#extend-your-teams-app-across-microsoft-365).

### Build a basic Teams app

You can get started with building a Teams app with a basic tab app, bot app, or a message extension app. The process to create the Teams app is similar for any basic app.

You can start by building a basic tab app
For building other basic Teams app, see link to: Tools and SDKs > TTk v5 > TTk Tutorials> Basic apps. (Doc yet to be created)

You can start by building a scenario-based app

For building other basic Teams app, see link to: Tools and SDKs > TTk v5 > TTk Tutorials > Scenario-based apps>.

### Build a scenario-based Teams app

You can build a Teams app that is suitable for a particular scenario or use-case. For example, a notification bot is suitable to send notifications but not to chat.

### Extend your Teams app across Microsoft 365

* Content for extending the app
* Introduce unified app manifest
* To do list – code sample, no SBS yet

## See also

* [Microsoft Teams samples](https://github.com/OfficeDev/Microsoft-Teams-Samples#microsoft-teams-samples)
* [Git and GitHub resources](/contribute/additional-resources)
