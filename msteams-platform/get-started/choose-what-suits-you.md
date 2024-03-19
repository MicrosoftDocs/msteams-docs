---
title: Choose what suits you
description: Learn more about the tools and software development kits (SDKs) available for you to build a Microsoft Teams app.
ms.localizationpriority: high
ms.date: 06/07/2023
ms.topic: reference
---

# Choose what suits you

You built your first message extension, tab, and bot. You can build a Teams app based on your business needs, development environment, and domain knowledge. Teams offers you the flexibility to select the tools, framework, languages, and environment to build your app.

## Tools and SDKs

You can build your Microsoft Teams app with the help of the following tools and SDKs.

:::image type="content" source="../assets/images/overview/choose-what-you-need.png" alt-text="Diagram shows the tools and SDKs you need to build your Teams app." lightbox="../assets/images/overview/choose-what-you-need.png":::

* **App capabilities**: You can choose a single or a combination of capabilities based on your app requirements and business needs.
* **SDKs you need**: For example, if you're building an AI chat bot app, you select Teams AI library.
* **UI Components**: Choose the UI components to design your app based on your app capability.
* **Languages**: Choose the language in which you want to build your app.
* **Recommended Tools**: Choose the tools based on the language that you've selected. The Teams Toolkit allows you to build your app with JavaScript and TypeScript in Visual Studio Code or with C# in Visual Studio.

| App capabilities | User interactions | Recommended tools | SDKs | Languages |
|---|---|---|---|---|
| **Message extensions** | Shortcuts for inserting external content into a conversation or taking action on messages. | Visual Studio Code or Visual Studio with Teams Toolkit extension, or TeamsFx CLI | TeamsFx SDK, Bot Framework SDK, Teams AI library, and Microsoft Graph SDK | C#, TypeScript, and JavaScript |
| **Tabs** | A full-screen embedded web experience. | Visual Studio Code or Visual Studio with Teams Toolkit extension, or [TeamsFx CLI](https://github.com/OfficeDev/TeamsFx/blob/dev/docs/cli/user-manual.md) | [Teams JavaScript client library](/javascript/api/overview/msteams-client?view=msteams-client-js-latest&preserve-view=true) for UI functionalities, SharePoint Framework (SPFx), and Microsoft Graph SDK | C#, TypeScript, and JavaScript (including React) |
| **Bots** | A chat bot that converses with users. |Visual Studio Code or Visual Studio with Teams Toolkit extension, or TeamsFx CLI | [TeamsFx SDK](/javascript/api/@microsoft/teamsfx/?view=msteams-client-js-latest&preserve-view=true), [Bot Framework SDK](https://dev.botframework.com/), Teams AI library, and Microsoft Graph SDK | C#, TypeScript, and JavaScript |

> [!NOTE]
>
> * Apps for meetings and calls deliver a collaborative user experience that enables partnership, informed communication, and shared feedback. For more information, see [apps for Teams meetings and calls](../apps-in-teams-meetings/teams-apps-in-meetings.md).
> * You can also use languages such as Node.js, Java, Python, HTML, and CSS to build your Teams app.

**Example scenario**: If you want to build a social media dashboard app that sends notifications using TypeScript, consider the following scenario:

:::image type="content" source="../assets/images/overview/sdks-scenario.png" alt-text="Diagram shows the scenario where you build a Teams app with TypeScript." lightbox="../assets/images/overview/sdks-scenario.png":::

### Explore Tools

The following tools in the Teams platform help you during app development:

| App development phase | Teams platform tools |
|----|----|
| Design | Teams UI kit and Teams UI library for tabs |
| Build | Teams Toolkit, TeamsFx CLI, and Microsoft Graph |
| Test, deploy, and publish | Microsoft Entra ID or Developer Portal |
| Distribute and monetize | Partner Center and Teams Store |

### Explore SDKs

You can also create and build your Teams app with various SDKs. Teams supports all the SDKs shown in the following image and you can choose SDKs based on your requirements:

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/tools-and-sdk.png" alt-text="Diagram shows the SDKs you need to build your Teams app." lightbox="../assets/images/Tools-and-SDK-revamp/tools-and-sdk.png":::

## Next step

> [!div class="nextstepaction"]
> [Plan your app](~/concepts/app-fundamentals-overview.md)

## See also

* [Design your Teams app](~/concepts/design/design-teams-app-process.md)
* [See app scenarios](https://adoption.microsoft.com/en-us/extensibility-look-book-gallery/)
* [Extend your app](~/m365-apps/overview.md)
* [Test your app](~/concepts/build-and-test/test-app-overview.md)
* [Integrate an existing app](~/samples/integrating-web-apps.md)