---
title: Choose what suits you
description: In this module, learn more about the tools and SDKs available for you to build a Microsoft Teams app
ms.localizationpriority: high
ms.date: 06/07/2023
ms.topic: reference
---

# Choose what suits you

You've built your first tab app, notification bot, and message extension. You can build a Teams app as per your app's requirements. Based on factors such as business needs, development environment, and domain knowledge, select the environment and tools to build your app.

A Teams app offers you the flexibility of choosing your build environment. It includes tools, framework, and languages to approach your app development. Build your Teams app in the environment that's best suited for your app. You can even select a combination. For example, you can use Teams Toolkit to build an app with JavaScript and host it on a SharePoint site.

This section takes you through the various options for building your Teams app.

* [Teams collaborative platform](#teams-collaborative-platform)
* [Tools and SDKs](#tools-and-sdks)

## Teams collaborative platform

As a collaborative platform for building apps, Teams offers the full range of apps and tools. Teams platform supports your app development at every stage from planning to distributing it.

You can use various tools and services to build your app. Following is an example development flow.

1. Plan your project and figure out the requirement.
1. Design your app. Use Teams UI Kit and UI Library for designing tabs UI.
1. Build your app with JavaScript using Teams Toolkit.
1. Extend functionality by adding more Teams capabilities and Microsoft 365 data with :::image type="icon" source="../assets/icons/graph-small-icon.png"::: Microsoft Graph.
1. Test the app on a developer tenant with sample user data.
1. Deploy the app to Azure.
1. Manage and publish the app to Teams store with Developer Portal. Monetize your app with options, such as SaaS offers, in-app purchases, and more.

## Tools and SDKs

You can build your Microsoft Teams app with the help of the following tools and SDKs.

:::image type="content" source="../assets/images/overview/choose-what-you-need.png" alt-text="Flow chart shows you the SDKs and tools you need to build your Teams app."lightbox="../assets/images/overview/choose-what-you-need.png":::

To start building your Teams app, you can select the tools and SDKs based on your app requirements.

1. **App capabilities**: You can choose a single or a combination of capabilities based on your app requirements.
1. **SDKs you need**: For example, if you're building AI capability for your bot app, you choose Teams AI library.
1. **UI  Components**: Choose the UI components to design your app based on your app capability.
1. **Languages**: Choose the language in which you want to build your app.
1. **Recommended Tools**: Choose the tools based on the language that you've selected. You can also use the Teams Developer Portal to manage and publish your app. The Teams Toolkit allows you to build your app with JavaScript, TypeScript, or C# in Visual Studio Code (VS Code) or Visual Studio.

| App capabilities | User interactions | Recommended tools | SDKs | Languages |
|--------|-------------|--------|--------|--------|
| **Tabs** | A full-screen embedded web experience. | VS Code or Visual Studio with Teams Toolkit extension, or [TeamsFx CLI](https://github.com/OfficeDev/TeamsFx/blob/dev/docs/cli/user-manual.md) if you prefer using CLI | [Teams JavaScript client library](/javascript/api/overview/msteams-client?view=msteams-client-js-latest&preserve-view=true) for UI functionalities, SharePoint Framework (SPFx), and Microsoft Graph SDK | C#, TypeScript, and JavaScript (including React) |
| **Bots** | A chat bot that converses with members. |VS Code or Visual Studio with Teams Toolkit extension, or [TeamsFx CLI](https://github.com/OfficeDev/TeamsFx/blob/dev/docs/cli/user-manual.md) if you prefer using CLI | [TeamsFx SDK](/javascript/api/@microsoft/teamsfx/?view=msteams-client-js-latest&preserve-view=true), [Bot Framework SDK](https://dev.botframework.com/), Teams AI library, and Microsoft Graph SDK | C#, TypeScript, and JavaScript |
| **Message extensions** | Shortcuts for inserting external content into a conversation or taking action on messages. | VS Code or Visual Studio with Teams Toolkit extension, or [TeamsFx CLI](https://github.com/OfficeDev/TeamsFx/blob/dev/docs/cli/user-manual.md) if you prefer using CLI |  [TeamsFx SDK](/javascript/api/@microsoft/teamsfx/?view=msteams-client-js-latest&preserve-view=true), [Bot Framework SDK](https://dev.botframework.com/), Teams AI library, and Microsoft Graph SDK | C#, TypeScript, and JavaScript |

> [!NOTE]
>
> * Meeting and calls can deliver a user experience for enabling collaboration, partnership, informed communication, and shared feedback. For more information, see [apps for Teams meetings and calls](../apps-in-teams-meetings/teams-apps-in-meetings.md).
> * You can also use languages, such as Node.js, Java, Python, and Web technology like HTML and CSS to build your Teams app.

**Example scenario**: If you want to build a social media dashboard app that sends notifications using TypeScript, consider the following scenario.

:::image type="content" source="../assets/images/overview/sdks-scenario.png" alt-text="Diagram shows you the scenario where you build Teams app with TypeScript."lightbox="../assets/images/overview/sdks-scenario.png":::

### Explore SDKs

You can also create and build your Teams app with various SDKs. Teams supports all the SDKs shown in the following image and you can choose SDKs based on your requirements:

:::image type="content" source="../assets/images/get-started/sdk-and-api.png" alt-text="Diagram shows you the list of tools and SDKs for you to build your Teams app."lightbox="../assets/images/get-started/sdk-and-api.png":::

### Explore Tools

The following tools in the Teams platform help you during app development.

| App development phase | Teams platform tools |
|-----|-----|
| Design | Teams UI kit and Teams UI library |
| Build | Teams Toolkit, Tools and SDKs, and Microsoft Graph |
| Test, deploy, and publish |Azure Active Directory (Azure AD) and Developer Portal |
| Distribute | Partner Center and Teams store |


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
