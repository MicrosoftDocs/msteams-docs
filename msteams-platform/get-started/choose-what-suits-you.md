---
title: Choose what suits you
description: In this module, learn more about the tools and SDKs available for you to build a Microsoft Teams app
ms.localizationpriority: high
ms.topic: reference
---

# Choose what suits you

You've built your first tab app, notification bot, and message extension. You can build a Teams app as per your app's requirements. Based on the factors, such as business needs, development environment, and domain knowledge, select the environment and tools to build your app.

A Teams app offers you the flexibility of choosing your build environment. It includes tools, framework, and languages to approach your app development. Build your Teams app in the environment that's best suited for your app. You can even select a combination. For example, you can use Teams Toolkit to build an app with JavaScript and host it on a SharePoint site.

This section takes you through the various options that you've for building your Teams app as per your requirements.

* [Teams collaborative platform](#teams-collaborative-platform)
* [Tools and SDKs](#tools-and-sdks)

## Teams collaborative platform

As a collaborative platform for building apps, Teams offers the full range of apps and tools. Teams platform supports your app development at every stage from planning to distributing it.

You can use various tools and services to build your app. An example development flow can be:

1. Plan your project and figure out the requirement.
1. Design your app. Use Teams UI Kit and UI Library for designing tabs UI.
1. Build your app with JavaScript using Teams Toolkit.
1. Extend functionality by adding more Teams capabilities and Microsoft 365 data with :::image type="icon" source="../assets/icons/graph-small-icon.png"::: Microsoft Graph.
1. Test the app on a developer tenant with sample user data.
1. Deploy the app to Azure.
1. Manage and publish the app to Teams store with Developer Portal. Monetize your app with options, such as SaaS offers, in-app purchases, and more.

## Tools and SDKs

You can build your Microsoft Teams app with the help of the following tools and SDKs.

:::image type="content" source="../assets/images/overview/choose-what-you-need.png" alt-text="Screenshot shows you the SDKs and tools you need to build your Teams app."lightbox="../assets/images/overview/choose-what-you-need.png":::

To start building your Teams app, you can select the tools and SDKs based on your app requirements:

1. **App capabilities**: Choose the capabilities for your app. You can choose a single or a combination of capabilities based on your app requirements.
1. **SDKs you need**: Choose the SDKs based on the capability that you're building for your app. For example, if you're building AI capability for your bot app, you must select Teams AI library.
1. **UI  Components**: Choose the UI components to design your app based on your app capability.
1. **Languages**: Choose the language in which you want to build your app.
1. **Recommended Tools**: Choose the tools based on the language that you've selected. You can also use Developer Portal to manage and publish your app. Teams Toolkit allows you to build your app with JavaScript, TypeScript, or C# in Visual Studio Code (VS Code) or Visual Studio.

| App capabilities | User interactions | Recommended tools | SDKs | Languages |
|--------|-------------|--------|--------|--------|
| **Tabs** | A full-screen embedded web experience. | VS Code or Visual Studio with Teams Toolkit extension, or [TeamsFx CLI](https://github.com/OfficeDev/TeamsFx/blob/dev/docs/cli/user-manual.md) if you prefer using CLI | [Teams JavaScript client library](/javascript/api/overview/msteams-client?view=msteams-client-js-latest&preserve-view=true) for UI functionalities, SharePoint Framework (SPFx), and Microsoft Graph SDK | C#, TypeScript, and JavaScript (including React) |
| **Bots** | A chat bot that converses with members. |VS Code or Visual Studio with Teams Toolkit extension, or [TeamsFx CLI](https://github.com/OfficeDev/TeamsFx/blob/dev/docs/cli/user-manual.md) if you prefer using CLI | [TeamsFx SDK](/javascript/api/@microsoft/teamsfx/?view=msteams-client-js-latest&preserve-view=true), [Bot Framework SDK](https://dev.botframework.com/), Teams AI library, and Microsoft Graph SDK | C#, TypeScript, and JavaScript |
| **Message extensions** | Shortcuts for inserting external content into a conversation or taking action on messages. | VS Code or Visual Studio with Teams Toolkit extension, or [TeamsFx CLI](https://github.com/OfficeDev/TeamsFx/blob/dev/docs/cli/user-manual.md) if you prefer using CLI |  [TeamsFx SDK](/javascript/api/@microsoft/teamsfx/?view=msteams-client-js-latest&preserve-view=true), [Bot Framework SDK](https://dev.botframework.com/), Teams AI library, and Microsoft Graph SDK | C#, TypeScript, and JavaScript |

> [!NOTE]
>
> * Meeting and calls can deliver a user experience for enabling collaboration, partnership, informed communication, and shared feedback. For more information, see [apps for Teams meetings and calls](../apps-in-teams-meetings/teams-apps-in-meetings.md).
> * You can also use languages, such as Node.js, Java, Python, and Web technology like HTML and CSS to build your Teams app.

**Example scenario**: If you want to build a social media dashboard app that sends notifications using TypeScript, consider the following scenario:

:::image type="content" source="../assets/images/overview/sdks-scenario.png" alt-text="Screenshot shows you the scenario where you build Teams app with TypeScript."lightbox="../assets/images/overview/sdks-scenario.png":::

### Explore SDKs

You can also create and build your Teams app with various SDKs. Teams supports all the SDKs shown in the following image and you can choose SDKs based on your requirements:

:::image type="content" source="../assets/images/get-started/tools-and-sdk.png" alt-text="Screenshot shows you the list of tools and SDKs for you to build your Teams app."lightbox="../assets/images/get-started/tools-and-sdk.png":::

### Explore Tools

The following tools in the Teams platform help you during app development:

| App development phase | Teams platform tools |
|-----|----|
| Design | Teams UI kit and Teams UI library |
| Build | Teams Toolkit, Tools and SDKs, and Microsoft Graph |
| Test, deploy, and publish |Azure Active Directory (Azure AD) and Developer Portal |
| Distribute | Partner Center and Teams store |

<!--

Choose the best tools and SDKs for building a new Teams app.

* [SDKs and libraries to build Teams app](#sdks-and-libraries-to-build-teams-app)
* [Azure AD-secured REST APIs](#azure-ad-secured-rest-apis)
* [Tools](#tools)

:::image type="content" source="../assets/images/tools-and-sdks.png" alt-text="Screenshot shows you the tools and SDKs available for you to build Teams apps."lightbox="../assets/images/tools-and-sdks.png":::

## SDKs and libraries to build Teams app

### TeamsFx SDK

TeamsFx helps to reduce your tasks by using Microsoft Teams single sign-on (SSO) and accessing cloud resources down to single line statements with zero configuration.

> [!div class="nextstepaction"]
> [TeamsFx SDK](~/toolkit/teamsfx-sdk.md)

### Teams JavaScript client library

The Microsoft Teams JavaScript client library (TeamsJS) can help you create hosted experiences in Teams, Microsoft 365 app, and Outlook, where your app content is hosted in an iFrame.

> [!div class="nextstepaction"]
> [Teams JavaScript client library](~/tabs/how-to/using-teams-client-library.md)

### Microsoft Graph SDKs

The Microsoft Graph SDKs are designed to simplify building high-quality, efficient, and resilient applications that access Microsoft Graph.

> [!div class="nextstepaction"]
> [Microsoft Graph SDKs](/graph/sdks/sdks-overview)

### Bots SDK (v3)

Build and connect intelligent bots to interact with Microsoft Teams users naturally through chat.

> [!div class="nextstepaction"]
> [Bots SDK (v3)](~/resources/bot-v3/bots-overview.md)

### Message extension SDK (v3)

Message extensions are a powerful way for users to engage with your app from Microsoft Teams.

> [!div class="nextstepaction"]
> [Plan your app](~/resources/messaging-extension-v3/messaging-extensions-overview.md)

### Microsoft Authentication Library (MSAL)

The Microsoft Authentication Library (MSAL) enables developers to acquire security tokens from the Microsoft identity platform to authenticate users and access secured web APIs.

> [!div class="nextstepaction"]
> [Microsoft Authentication Library (MSAL)](/azure/active-directory/develop/msal-overview)

### SharePoint Framework (SPFx)

The SharePoint Framework (SPFx) is a page and web part model that provides full support for client-side SharePoint development, easy integration with SharePoint data, and extending Microsoft Teams and Microsoft Viva.

> [!div class="nextstepaction"]
> [SharePoint Framework (SPFx)](/sharepoint/dev/spfx/sharepoint-framework-overview)

### Live Share SDK

Live Share is an SDK designed to transform Teams apps into collaborative multi-user experiences without writing any dedicated back-end code.

> [!div class="nextstepaction"]
> [Live Share SDK](~/apps-in-teams-meetings/teams-live-share-overview.md)

## Azure AD-secured REST APIs

### Microsoft Graph

Microsoft Graph is the gateway to data and intelligence in Microsoft 365. It provides a unified programmability model that you can use to access the tremendous amount of data in Microsoft 365, Windows, and Enterprise Mobility + Security. Use the wealth of data in Microsoft Graph to build apps for organizations and consumers that interact with millions of users.

> [!div class="nextstepaction"]
> [Microsoft Graph](/graph/sdks/sdks-overview)

### Azure Active Directory

Azure Active Directory (Azure AD) is a cloud-based identity and access management service. Azure AD enables your employees access external resources, such as Microsoft 365, the Azure portal, and thousands of other SaaS applications. Azure AD also helps them access internal resources like apps on your corporate intranet, and any cloud apps developed for your own organization.

> [!div class="nextstepaction"]
> [Azure Active Directory](/azure/active-directory/fundamentals/active-directory-whatis)

### Azure Bot Service

Azure Bot Service is a collection of libraries, tools, and services that let you build, test, deploy, and manage intelligent bots.

> [!div class="nextstepaction"]
> [Azure Bot Services](/azure/bot-service/bot-service-overview?view=azure-bot-service-4.0)

### Azure OpenAI

Azure OpenAI Service provides REST API access to OpenAI's powerful language models including the GPT-3, Codex and Embeddings model series. In addition, the new GPT-4 and ChatGPT (gpt-35-turbo) model series are now available in preview. These models can be easily adapted to your specific task including but not limited to content generation, summarization, semantic search, and natural language to code translation. Users can access the service through REST APIs, Python SDK, or our web-based interface in the Azure OpenAI Studio.

> [!div class="nextstepaction"]
> [Azure OpenAI](/azure/cognitive-services/openai/overview)

## Tools

### Teams Toolkit

Teams Toolkit makes it simple to get started with app development for Microsoft Teams using VS Code and Visual Studio.

> [!div class="nextstepaction"]
> [Teams Toolkit](~/toolkit/teams-toolkit-fundamentals.md)

### Teams Toolkit CLI

TeamsFx CLI is a text-based command line interface that accelerates Teams application development.

> [!div class="nextstepaction"]
> [Teams Toolkit CLI](~/toolkit/teamsfx-cli.md)

### Developer Portal for Teams

Developer Portal for Teams is the primary tool for configuring, distributing, and managing your Microsoft Teams apps.

> [!div class="nextstepaction"]
> [Developer Portal for Teams](~/concepts/build-and-test/teams-developer-portal.md)

### Yeoman Generator

Yo Teams allows you to build Microsoft Teams applications based on TypeScript and node.js on your teams, in your editor of choice, without any external or online dependencies. Including support for extending Teams app to other parts of the Microsoft 365 eco-system.

If you are already familiar with Yeoman workflow, you can use to build your apps.

> [!div class="nextstepaction"]
> [YoTeams Yeoman Generator](https://github.com/pnp/generator-teams/blob/master/docs/docs/tutorials/build-your-first-microsoft-teams-app.md)

-->

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
        Teams store offers app monetizing options, such as SaaS offers and In-app purchases. Choose the best monetizing option suitable for your Teams app.

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
