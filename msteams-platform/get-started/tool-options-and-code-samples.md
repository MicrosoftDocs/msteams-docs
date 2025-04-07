---
title: Explore Tools and Code Samples
description: Learn about tools, SDKs, tutorials, and code samples to build apps with various capabilities such as AI, UI, and various languages, to prepare your environment.
ms.localizationpriority: high
ms.date: 02/06/2025
ms.topic: reference
---

# Tool Options and Code Samples

You've built your first tab app, interactive notification bot, and message extension. Now, you have the freedom to build a Teams app according to your unique requirements. Depending on your business needs, development environment, and domain expertise, you can select the environment and tools that best fit your app development process.

A Teams app provides the flexibility to choose your preferred build environment. This environment includes a wide selection of tools, frameworks, and languages. You are free to build your Teams app in any environment suited to your needs or even combine multiple approaches. For instance, you might use the Teams Toolkit to build an app with JavaScript and host it on a SharePoint site.

This section walks you through several options available to create your Teams app.

• [Teams collaborative platform](#teams-collaborative-platform)  
• [Tools and SDKs](#tools-and-sdks)  
• [Teams app tutorials and code samples](#teams-app-tutorials-and-code-samples)

## Teams Collaborative Platform

Microsoft Teams provides a comprehensive platform for app development by offering a full spectrum of features and tools. The Teams platform supports app development at every stage—from planning and design to building, testing, and distribution.

You can use many tools and services to bring your app to life. Below is an example of a development flow that you can follow:

1. **Plan Your Project**  
   Begin by clarifying your project goals and gathering the requirements needed to solve a business problem or enhance user experiences.

2. **Design Your App**  
   Create your app's layout and interface using the Teams UI Kit and Fluent UI React components to design engaging and intuitive tabs.

3. **Build Your App**  
   Develop your application using JavaScript with the Teams Toolkit, ensuring that the code meets the desired functionalities.

4. **Extend Functionality**  
   Enhance your app by integrating additional Teams capabilities, sending activity feed notifications, and accessing Microsoft 365 data via  
   :::image type="icon" source="../assets/icons/graph-small-icon.png"::: Microsoft Graph. This integration allows you to create richer, more dynamic experiences.

5. **Test on a Developer Tenant**  
   Verify all functionalities by testing your app on a developer tenant using sample user data, ensuring everything works as expected.

6. **Deploy the App to Azure**  
   Once testing is complete, deploy your app to Azure to leverage cloud capabilities and improve scalability.

7. **Manage and Publish Your App**  
   Finally, use the Developer Portal to manage and publish your app to the Microsoft Teams Store. You also have the opportunity to monetize your app through options like SaaS offers, in-app purchases, and more.

## Tools and SDKs

Microsoft Teams provides a wide range of tools and Software Development Kits (SDKs) to support app development. These tools are designed to meet diverse technical requirements and allow you to build your Teams app with ease.

:::image type="content" source="../assets/images/overview/choose-what-you-need.png" alt-text="Flow chart shows you the SDKs and tools you need to build your Teams app." lightbox="../assets/images/overview/choose-what-you-need.png" :::

To begin building your Teams app, select the appropriate tools and SDKs based on the following factors:

1. **App Capabilities**  
   Decide whether your app will utilize a single capability or combine multiple features based on your app’s requirements. For example, a chat bot might need additional capabilities alongside basic tab functionality.

2. **SDKs You Need**  
   Choose the Software Development Kits based on your app’s goals. For instance, if you plan to add AI capabilities to your bot, you might select the Teams AI library to integrate advanced functionalities.

3. **UI Components**  
   Select the appropriate UI components to design a user-friendly interface that aligns with your app’s capabilities and meets user expectations.

4. **Languages**  
   Decide on the programming language that best suits your project requirements. Whether it’s C#, JavaScript, or TypeScript, select the language that aligns with your skill set and project needs.

5. **Recommended Tools**  
   Identify and use tools that complement your chosen programming language. Options include the Teams Developer Portal for app management and publishing, and the Teams Toolkit for building apps using JavaScript, TypeScript, or C# in Visual Studio Code (VS Code) or Visual Studio.

Below is a detailed comparison table for various app capabilities, recommendations, and supported languages:

| App capabilities | User interactions | Recommended tools | SDKs | Languages |
|------------------|-------------------|-------------------|------|-----------|
| **Tabs**         | A full-screen embedded web experience. | VS Code or Visual Studio with the Teams Toolkit extension, or [TeamsFx CLI](~/toolkit/teams-toolkit-cli.md) for CLI enthusiasts | [Teams JavaScript client library](/javascript/api/overview/msteams-client#microsoft-teams-javascript-client-library) for UI functionalities, SharePoint Framework (SPFx), and Microsoft Graph SDK | C#, TypeScript, and JavaScript (including React) |
| **Bots**         | A chat bot that converses with members. | VS Code or Visual Studio with the Teams Toolkit extension, or [TeamsFx CLI](~/toolkit/teams-toolkit-cli.md) for CLI enthusiasts | [TeamsFx SDK](/javascript/api/@microsoft/teamsfx), [Bot Framework SDK](https://dev.botframework.com/), [Teams AI library](../bots/how-to/teams-conversational-ai/teams-conversation-ai-overview.md), and Microsoft Graph SDK | C#, TypeScript, and JavaScript |
| **Message extensions** | Shortcuts for inserting external content into a conversation or taking action on messages. | VS Code or Visual Studio with the Teams Toolkit extension, or [TeamsFx CLI](~/toolkit/teams-toolkit-cli.md) for CLI enthusiasts | [TeamsFx SDK](/javascript/api/@microsoft/teamsfx), [Bot Framework SDK](https://dev.botframework.com/), [Teams AI library](../bots/how-to/teams-conversational-ai/teams-conversation-ai-overview.md), and Microsoft Graph SDK | C#, TypeScript, and JavaScript |

> [!NOTE]
>
> • Meeting and calls can deliver an enhanced user experience by enabling collaboration, partnership, informed communication, and shared feedback. For more information, see [apps for Teams meetings and calls](../apps-in-teams-meetings/teams-apps-in-meetings.md).  
> • Additionally, you can use other languages and web technologies such as Node.js, Java, Python, HTML, and CSS to build your Teams app.

**Example scenario**: Imagine you want to build a social media dashboard app that sends notifications using TypeScript. In this scenario, you would combine the Teams Toolkit with AI and UI components to create a robust application.

:::image type="content" source="../assets/images/overview/sdks-scenario.png" alt-text="Diagram shows you the scenario where you build Teams app with TypeScript." lightbox="../assets/images/overview/sdks-scenario.png" :::

### Explore SDKs

Microsoft Teams supports a multitude of SDKs that you can use to build a feature-rich app. The following image outlines the list of available SDKs. You can choose the SDKs that best align with your project requirements.

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/tools-and-sdk.png" alt-text="Diagram shows you the list of tools and SDKs for you to build your Teams app." lightbox="../assets/images/Tools-and-SDK-revamp/tools-and-sdk.png" :::

### Explore Tools

The Teams platform offers a variety of tools designed to assist you during different phases of app development. The table below maps each development phase to the respective Teams platform tools:

| App Development Phase        | Teams Platform Tools                                                                                                                                           |
|------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Design**                   | [Teams UI Kit](../concepts/design/design-teams-app-ui-templates.md#microsoft-teams-ui-kit) and [Fluent UI React components](../concepts/design/design-teams-app-ui-templates.md#fluent-ui-react-components) |
| **Build**                    | [Teams Toolkit](../toolkit/teams-toolkit-fundamentals.md), [Tools and SDKs](../concepts/build-and-test/tool-sdk-overview.md), and [Microsoft Graph](/graph/teams-concept-overview) |
| **Test, Deploy, and Publish** | [Microsoft Entra ID](/entra/fundamentals/whatis) and [Developer Portal](../concepts/build-and-test/teams-developer-portal.md)                                      |
| **Distribute**               | [Partner Center](../concepts/deploy-and-publish/appsource/prepare/create-partner-center-dev-account.md) and [Teams Store](../concepts/deploy-and-publish/appsource/publish.md) |

## Teams App Tutorials and Code Samples

You can leverage various tutorials and code samples to build a Microsoft Teams app covering different capabilities. These resources provide step-by-step guidance and code examples to help you understand and implement your ideas.

### Teams App Tutorials

Kick-start your development process using tutorials focused on different programming languages and frameworks. The table below categorizes the tutorials based on app capabilities:

|                         | **Tab**                                                                                                                                                                                                                                                                                     | **Bot**                                                                               | **Message Extension**                                                                        |
|-------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| **Basic App**           | • [Build your first tab app using JavaScript](../sbs-gs-javascript.yml) <br> • [Build your first app using C#](../sbs-gs-csharp.yml) <br> • [Build your first app with SPFx](../sbs-gs-spfx.yml)                                                                               | [Build your first bot app using JavaScript](../sbs-gs-bot.yml)                         | [Build your first message extension app using JavaScript](../sbs-gs-msgext.yml)                |
| **Scenario-Based App**  | NA                                                                                                                                                                                                                                                                                           | • [Build notification bot with JavaScript](../sbs-gs-notificationbot.yml) <br> • [Build command bot with JavaScript](../sbs-gs-commandbot.yml) <br> • [Create Teams workflow bot](../sbs-gs-workflow-bot.yml) | NA                                                                                           |

### Code Samples

To further enhance your understanding and expedite your development, explore our comprehensive code samples. These samples demonstrate how to implement various Teams app functionalities and can be a valuable resource when building your own application. For more code samples and detailed examples, see [Microsoft Teams samples](https://github.com/OfficeDev/Microsoft-Teams-Samples).

## See Also

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
        Design your app UI using the Teams UI Kit and create intuitive layouts with best practices.

        > [!div class="nextstepaction"]
        > [Design your Teams app](~/concepts/design/design-teams-app-process.md)
    :::column-end:::
:::row-end:::

:::row:::
    :::column span="1":::
        **Build your app**
    :::column-end:::
    :::column span="2":::
        Find inspiration in real-world scenarios and industry solutions, complete with high-fidelity concept mocks that illustrate the diverse ways a Teams app can empower users.

        > [!div class="nextstepaction"]
        > [See app scenarios](https://adoption.microsoft.com/en-us/extensibility-look-book-gallery/)
    :::column-end:::
:::row-end:::

:::row:::
    :::column span="1":::
        **Extend your app across Microsoft 365**
    :::column-end:::
    :::column span="2":::
        Preview and integrate your Teams apps within other high-usage Microsoft 365 experiences using the latest Teams JavaScript client library.

        > [!div class="nextstepaction"]
        > [Extend your app](~/m365-apps/overview.md)
    :::column-end:::
:::row-end:::

:::row:::
    :::column span="1":::
        **Test your app**
    :::column-end:::
    :::column span="2":::
        It is critical to thoroughly test your app after integrating it with Teams. Ensure functionality, performance, and user experience are all up to standard before publishing.

        > [!div class="nextstepaction"]
        > [Test your app](~/concepts/build-and-test/test-app-overview.md)
    :::column-end:::
:::row-end:::

:::row:::
    :::column span="1":::
        **Distribute your app**
    :::column-end:::
    :::column span="2":::
        Provide your app to individuals, teams, or organizations. Distribution options allow your app to reach a wide audience in a secure and manageable way.

        > [!div class="nextstepaction"]
        > [Distribute your app](~/concepts/deploy-and-publish/apps-publish-overview.md)
    :::column-end:::
:::row-end:::

:::row:::
    :::column span="1":::
        **Monetize your app**
    :::column-end:::
    :::column span="2":::
        Leverage monetization options such as SaaS offers and in-app purchases available through the Teams Store to generate revenue from your app.

        > [!div class="nextstepaction"]
        > [Monetize your app](~/concepts/deploy-and-publish/appsource/prepare/monetize-overview.md)
    :::column-end:::
:::row-end:::

:::row:::
    :::column span="1":::
        **Integrate with Teams**
    :::column-end:::
    :::column span="2":::
        Enhance your existing web app, service, or system by integrating with Teams and blending it with collaborative features that users love.

        > [!div class="nextstepaction"]
        > [Integrate an existing app](~/samples/integrating-web-apps.md)
    :::column-end:::
:::row-end:::

:::row:::
    :::column span="1":::
        **A little code goes a long way**
    :::column-end:::
    :::column span="2":::
        You do not need to be an expert programmer to develop a high-quality Teams app. Try one of the available low-code solutions to quickly bring your ideas to life.

        > [!div class="nextstepaction"]
        > [Create a low-code app](~/samples/teams-low-code-solutions.md)
    :::column-end:::
:::row-end:::