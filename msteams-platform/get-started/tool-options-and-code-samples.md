---
title: Tool Options and Code Samples
description: Learn about tools, SDKs, tutorials, and code samples to build apps with various capabilities such as AI, UI, and various languages, to prepare your environment.
ms.localizationpriority: high
ms.date: 06/07/2023
ms.topic: reference
---

# Explore tools and code samples

You've built your first tab app, interactive notification bot, and message extension. You can build a Teams app as per your app's requirements. Based on factors such as business needs, development environment, and domain knowledge, select the environment and tools to build your app.

A Teams app offers you the flexibility of choosing your build environment. It includes tools, framework, and languages to approach your app development. Build your Teams app in the environment that's best suited for your app. You can even select a combination. For example, you can use Teams Toolkit to build an app with JavaScript and host it on a SharePoint site.

This section takes you through the various options for building your Teams app.

* [Teams collaborative platform](#teams-collaborative-platform)
* [Tools and SDKs](#tools-and-sdks)
* [Teams app tutorials and code samples](#teams-app-tutorials-and-code-samples)

## Teams collaborative platform

As a collaborative platform for building apps, Teams offers the full range of apps and tools. Teams platform supports your app development at every stage from planning to distributing it.

You can use various tools and services to build your app. Following is an example development flow.

1. Plan your project and figure out the requirement.
1. Design your app. Use Teams UI Kit and Fluent UI React components for designing tabs UI.
1. Build your app with JavaScript using Teams Toolkit.
1. Extend functionality by adding more Teams capabilities, send activity feed notifications, and use Microsoft 365 data with :::image type="icon" source="../assets/icons/graph-small-icon.png"::: Microsoft Graph.
1. Test the app on a developer tenant with sample user data.
1. Deploy the app to Azure.
1. Manage and publish the app to Microsoft Teams Store with Developer Portal. Monetize your app with options, such as SaaS offers, in-app purchases, and more.

## Tools and SDKs

You can build your Microsoft Teams app with the help of the following tools and SDKs.

:::image type="content" source="../assets/images/overview/choose-what-you-need.png" alt-text="Flow chart shows you the SDKs and tools you need to build your Teams app."lightbox="../assets/images/overview/choose-what-you-need.png":::

To start building your Teams app, you can select the tools and SDKs based on your app requirements.

1. **App capabilities**: You can choose a single or a combination of capabilities based on your app requirements.
1. **SDKs you need**: For example, if you're building AI capability for your bot app, you select Teams AI library.
1. **UI  Components**: Choose the UI components to design your app based on your app capability.
1. **Languages**: Choose the language in which you want to build your app.
1. **Recommended Tools**: Choose the tools based on the language that you've selected. You can also use the Teams Developer Portal to manage and publish your app. The Teams Toolkit allows you to build your app with JavaScript and TypeScript or with C# in Visual Studio Code (VS Code) or Visual Studio.

| App capabilities | User interactions | Recommended tools | SDKs | Languages |
|--------|-------------|--------|--------|--------|
| **Tabs** | A full-screen embedded web experience. | VS Code or Visual Studio with Teams Toolkit extension, or [TeamsFx CLI](~/toolkit/teams-toolkit-cli.md) if you prefer using CLI | [Teams JavaScript client library](/javascript/api/overview/msteams-client#microsoft-teams-javascript-client-library) for UI functionalities, SharePoint Framework (SPFx), and Microsoft Graph SDK | C#, TypeScript, and JavaScript (including React) |
| **Bots** | A chat bot that converses with members. |VS Code or Visual Studio with Teams Toolkit extension, or [TeamsFx CLI](~/toolkit/teams-toolkit-cli.md) if you prefer using CLI | [TeamsFx SDK](/javascript/api/@microsoft/teamsfx), [Bot Framework SDK](https://dev.botframework.com/), [Teams AI library](../bots/how-to/teams-conversational-ai/teams-conversation-ai-overview.md), and Microsoft Graph SDK | C#, TypeScript, and JavaScript |
| **Message extensions** | Shortcuts for inserting external content into a conversation or taking action on messages. | VS Code or Visual Studio with Teams Toolkit extension, or [TeamsFx CLI](~/toolkit/teams-toolkit-cli.md) if you prefer using CLI |  [TeamsFx SDK](/javascript/api/@microsoft/teamsfx), [Bot Framework SDK](https://dev.botframework.com/), [Teams AI library](../bots/how-to/teams-conversational-ai/teams-conversation-ai-overview.md), and Microsoft Graph SDK | C#, TypeScript, and JavaScript |

> [!NOTE]
>
> * Meeting and calls can deliver a user experience for enabling collaboration, partnership, informed communication, and shared feedback. For more information, see [apps for Teams meetings and calls](../apps-in-teams-meetings/teams-apps-in-meetings.md).
> * You can also use languages, such as Node.js, Java, Python, and Web technology like HTML and CSS to build your Teams app.

**Example scenario**: If you want to build a social media dashboard app that sends notifications using TypeScript, consider the following scenario:

:::image type="content" source="../assets/images/overview/sdks-scenario.png" alt-text="Diagram shows you the scenario where you build Teams app with TypeScript."lightbox="../assets/images/overview/sdks-scenario.png":::

### Explore SDKs

You can also create and build your Teams app with various SDKs. Teams supports all the SDKs shown in the following image and you can choose SDKs based on your requirements:

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/tools-and-sdk.png" alt-text="Diagram shows you the list of tools and SDKs for you to build your Teams app."lightbox="../assets/images/Tools-and-SDK-revamp/tools-and-sdk.png":::

### Explore Tools

The following tools in the Teams platform help you during app development:

| App development phase | Teams platform tools |
|-----|-----|
| Design | [Teams UI kit](../concepts/design/design-teams-app-ui-templates.md#microsoft-teams-ui-kit) and [Fluent UI React components](../concepts/design/design-teams-app-ui-templates.md#fluent-ui-react-components) |
| Build | [Teams Toolkit](../toolkit/teams-toolkit-fundamentals.md), [Tools and SDKs](../concepts/build-and-test/tool-sdk-overview.md), and [Microsoft Graph](/graph/teams-concept-overview) |
| Test, deploy, and publish |[Microsoft Entra ID](/entra/fundamentals/whatis) and [Developer Portal](../concepts/build-and-test/teams-developer-portal.md) |
| Distribute | [Partner Center](../concepts/deploy-and-publish/appsource/prepare/create-partner-center-dev-account.md) and [Teams Store](../concepts/deploy-and-publish/appsource/publish.md) |

## Teams app tutorials and code samples

You can build your own Microsoft Teams app with different capabilities using the following tutorials and code samples.

### Teams app tutorials

To start building your Teams app, use the following languages or frameworks and prepare your development environment.

| &nbsp; | **Tab** | **Bot** | **Message extension** |
| --- | --- | --- | --- |
| **Basic app** | • [Build your first tab app using JavaScript](../sbs-gs-javascript.yml) <br> •  [Build your first app using C#](../sbs-gs-csharp.yml) <br> • [Build your first app with SPFx](../sbs-gs-spfx.yml) | [Build your first bot app using JavaScript](../sbs-gs-bot.yml) | [Build your first message extension app using JavaScript](../sbs-gs-msgext.yml)|
| **Scenario-based app** | NA | • [Build notification bot with JavaScript](../sbs-gs-notificationbot.yml) <br> • [Build command bot with JavaScript](../sbs-gs-commandbot.yml) <br> • [Create Teams workflow bot](../sbs-gs-workflow-bot.yml) | NA |

### Code samples

Code samples are designed to help you understand and build your own Teams app with different capabilities and scenarios. To learn more about the code samples, see [Microsoft Teams samples](https://github.com/OfficeDev/Microsoft-Teams-Samples).

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

:::row:::
    :::column span="1":::
        **A little code goes a long way**
    :::column-end:::
    :::column span="2":::
        You don't need to be an expert programmer to build a great Teams app. Try one of several the low-code solutions.

        > [!div class="nextstepaction"]
        > [Create a low-code app](~/samples/teams-low-code-solutions.md)
    :::column-end:::
:::row-end:::
