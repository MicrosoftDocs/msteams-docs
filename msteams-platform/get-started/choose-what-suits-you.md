---
title: Choose what suits you
description: In this module, learn more about the tools and SDKs available for you to build a Microsoft Teams app
ms.localizationpriority: high
ms.date: 06/07/2023
ms.topic: reference
---

# Choose what suits you

You've built your first tab app, notification bot, and message extension. You can build a Teams app based on your business needs, development environment, and domain knowledge. Teams offers you the flexibility to select the tools, framework, languages, and environment to build your app.

## Tools and SDKs

You can build your Microsoft Teams app with the help of the following tools and SDKs.

:::image type="content" source="../assets/images/overview/choose-what-you-need.png" alt-text="Flow chart shows you the SDKs and tools you need to build your Teams app."lightbox="../assets/images/overview/choose-what-you-need.png":::

1. **App capabilities**: You can choose a single or a combination of capabilities based on your app requirements and business needs.
2. **SDKs you need**: For example, if you're building an AI chat bot app, you select Teams AI library.
3. **UI Components**: Choose the UI components to design your app based on your app capability.
4. **Languages**: Choose the language in which you want to build your app.
5. **Recommended Tools**: Choose the tools based on the language that you've selected. Use the Teams Developer Portal to manage and publish your app. The Teams Toolkit allows you to build your app with JavaScript and TypeScript in Visual Studio Code or with C# in Visual Studio.

| App capabilities | User interactions | Recommended tools | SDKs | Languages |
|---|---|---|---|---|
| **Tabs** | A full-screen embedded web experience. | Visual Studio Code or Visual Studio with Teams Toolkit extension, or [TeamsFx CLI](https://github.com/OfficeDev/TeamsFx/blob/dev/docs/cli/user-manual.md) | [Teams JavaScript client library](/javascript/api/overview/msteams-client?view=msteams-client-js-latest&preserve-view=true) for UI functionalities, SharePoint Framework (SPFx), and Microsoft Graph SDK | C#, TypeScript, and JavaScript (including React) |
| **Bots** | A chat bot that converses with users. |Visual Studio Code or Visual Studio with Teams Toolkit extension, or [TeamsFx CLI](https://github.com/OfficeDev/TeamsFx/blob/dev/docs/cli/user-manual.md) | [TeamsFx SDK](/javascript/api/@microsoft/teamsfx/?view=msteams-client-js-latest&preserve-view=true), [Bot Framework SDK](https://dev.botframework.com/), Teams AI library, and Microsoft Graph SDK | C#, TypeScript, and JavaScript |
| **Message extensions** | Shortcuts for inserting external content into a conversation or taking action on messages. | Visual Studio Code or Visual Studio with Teams Toolkit extension, or [TeamsFx CLI](https://github.com/OfficeDev/TeamsFx/blob/dev/docs/cli/user-manual.md) | [TeamsFx SDK](/javascript/api/@microsoft/teamsfx/?view=msteams-client-js-latest&preserve-view=true), [Bot Framework SDK](https://dev.botframework.com/), Teams AI library, and Microsoft Graph SDK | C#, TypeScript, and JavaScript |

> [!NOTE]
>
> * Apps for meetings and calls deliver a collaborative user experience that enables partnership, informed communication, and shared feedback. For more information, see [apps for Teams meetings and calls](../apps-in-teams-meetings/teams-apps-in-meetings.md).
> * You can also use languages such as Node.js, Java, Python, HTML, and CSS to build your Teams app.

**Example scenario**: If you want to build a social media dashboard app that sends notifications using TypeScript, consider the following scenario:

:::image type="content" source="../assets/images/overview/sdks-scenario.png" alt-text="Diagram shows the scenario where you build Teams app with TypeScript."lightbox="../assets/images/overview/sdks-scenario.png":::

### Explore SDKs

You can also create and build your Teams app with various SDKs. Teams supports all the SDKs shown in the following image and you can choose SDKs based on your requirements:

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/tools-and-sdk.png" alt-text="Diagram shows the list of tools and SDKs for you to build your Teams app."lightbox="../assets/images/Tools-and-SDK-revamp/tools-and-sdk.png":::

### Explore Tools

The following tools in the Teams platform help you during app development:

| App development phase | Teams platform tools |
|-----|-----|
| Design | Teams UI kit and Teams UI library for tabs |
| Build | Teams Toolkit, Tools and SDKs, and Microsoft Graph |
| Test, deploy, and publish | Microsoft Entra ID or Developer Portal |
| Distribute | Partner Center and Teams Store |

## See also

:::row:::
    :::column span="1":::
        **Plan your app**
    :::column-end:::
    :::column span="2":::
        Understand and map your app use cases to Teams features.

        > [!div class="nextstepaction"]
        > [Plan your app](~/concepts/app-fundamentals-overview.md)
    :::column-end:::
:::row-end:::

:::row:::
    :::column span="1":::
        **Design your app**
    :::column-end:::
    :::column span="2":::
        Design your app UI with Teams UI Kit.

        > [!div class="nextstepaction"]
        > [Design your Teams app](~/concepts/design/design-teams-app-process.md)
    :::column-end:::
:::row-end:::

:::row:::
    :::column span="1":::
        **Build your app**
    :::column-end:::
    :::column span="2":::
        Looking for app development inspiration? Browse our list of real-world scenarios and industry solutions with high-fidelity concept mocks to understand the various ways a Teams app can help your users.

        > [!div class="nextstepaction"]
        > [See app scenarios](https://adoption.microsoft.com/en-us/extensibility-look-book-gallery/)
    :::column-end:::
:::row-end:::

:::row:::
    :::column span="1":::
        **Extend your app across Microsoft 365**
    :::column-end:::
    :::column span="2":::
You can preview your Teams apps running in other high usage Microsoft 365 experiences with the latest Teams JavaScript client library.

        > [!div class="nextstepaction"]
        > [Extend your app](~/m365-apps/overview.md)
    :::column-end:::
:::row-end:::

:::row:::
    :::column span="1":::
        **Test your app**
    :::column-end:::
    :::column span="2":::
        After integrating your app with Teams, you must test your app before publishing it.

        > [!div class="nextstepaction"]
        > [Test your app](~/concepts/build-and-test/test-app-overview.md)
    :::column-end:::
:::row-end:::

:::row:::
    :::column span="1":::
        **Distribute your app**
    :::column-end:::
    :::column span="2":::
        You can provide your Teams app to an individual, team, organization, or anyone who wants to use it.

        > [!div class="nextstepaction"]
        > [Distribute your app](~/concepts/deploy-and-publish/apps-publish-overview.md)
    :::column-end:::
:::row-end:::

:::row:::
    :::column span="1":::
        **Monetize your app**
    :::column-end:::
    :::column span="2":::
        Teams Store offers app monetizing options, such as SaaS offers and In-app purchases. Choose the best monetizing option suitable for your Teams app.

        > [!div class="nextstepaction"]
        > [Monetize your app](~/concepts/deploy-and-publish/appsource/prepare/monetize-overview.md)
    :::column-end:::
:::row-end:::

:::row:::
    :::column span="1":::
        **Integrate with Teams**
    :::column-end:::
    :::column span="2":::
        Blend the features that users love about an existing web app, service, or system with the collaborative features of Teams.

        > [!div class="nextstepaction"]
        > [Integrate an existing app](~/samples/integrating-web-apps.md)
    :::column-end:::
:::row-end:::