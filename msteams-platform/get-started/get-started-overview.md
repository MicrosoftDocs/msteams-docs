---
title: Get started - Overview
description: Overview to Get started for Microsoft Teams Developer Documentation
ms.localizationpriority: medium
ms.topic: reference
keywords: Microsoft Teams developer samples
---
# Get started

Welcome to Get started for building and deploying customized apps for Microsoft Teams!

Walk through the steps to build a basic, real-world Teams app. The Get started also introduces you to common tools, fundamental concepts, and more advanced features.

Here's an idea of what you'll learn:

- Get up and running quickly with the Microsoft Teams Toolkit (a Visual Studio Code extension).
- Get experience with the Toolkit and SDKs.
- Configure and build different types of Teams apps.

Here's a quick glance at the build environment options you can choose from, and the road-map to building and deploying a Teams app.

:::image type="content" source="../assets/images/get-started/gs-overview-build-options.png" alt-text="Illustration showing basic steps to build and deploy a Teams app.":::

## App capabilities and development tools

Depending on the capabilities you want for your app, choose an appropriate development tool set.

| App capabilities | User interactions | Recommended tools | SDKs | Technology stacks |
|--------|-------------|--------|--------|--------|
| Tabs | A full-screen embedded web experience. | VS Code with Teams Toolkit extension, or YoTeams ([Yeoman Generator](https://github.com/pnp/generator-teams/blob/master/docs/docs/tutorials/build-your-first-microsoft-teams-app.md)) if you prefer using CLI| [Teams Fx](/en-us/javascript/api/@microsoft/teamsfx/?view=msteams-client-js-latest&preserve-view=true) for core libs & [Teams client SDK](/en-us/javascript/api/overview/msteams-client?view=msteams-client-js-latest&preserve-view=true) | Web technology in general, HTML, CSS, and JavaScript |
| Bots | A chat bot that converses with members. | VS Code with Teams Toolkit extension, or YoTeams ([Yeoman Generator](https://github.com/pnp/generator-teams/blob/master/docs/docs/tutorials/build-your-first-microsoft-teams-app.md)) | [Teams Fx](/en-us/javascript/api/@microsoft/teamsfx/?view=msteams-client-js-latest&preserve-view=true) & [Bot Framework SDK](https://dev.botframework.com/) | Node.js, C#, or Python |
| Messaging extensions | Shortcuts for inserting external content into a conversation or taking action on messages. | VS Code with Teams Toolkit extension, or YoTeams ([Yeoman Generator](https://github.com/pnp/generator-teams/blob/master/docs/docs/tutorials/build-your-first-microsoft-teams-app.md)) | [Teams Fx](/en-us/javascript/api/@microsoft/teamsfx/?view=msteams-client-js-latest&preserve-view=true) & [Bot Framework SDK](https://dev.botframework.com/) | Node.js, C#, or Python |

*You aren't limited to using these particular stacks*.

## Next step

Now, select the build environment you prefer and let's build your first Teams app. But first, prepare your development environment.

> [!div class="nextstepaction"]
> [Prepare to build a Teams app with JavaScript](prerequisites.md)

> [!div class="nextstepaction"]
> [Prepare to build a Teams app with Blazor](blazor-app-prerequisites.md)

> [!div class="nextstepaction"]
> [Prepare to build a Teams app with SPFx](spfx-app-prerequisites.md)

> [!div class="nextstepaction"]
> [Prepare to build a Teams app with C# or .NET](get-started-dotnet-app-studio.md)

> [!div class="nextstepaction"]
> [Prepare to build a Teams app with Node.js CLI](get-started-nodejs-app-studio.md)

