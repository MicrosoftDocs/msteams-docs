---
title: Tools and SDKs
author: v-sdhakshina
description: In this article, learn more about the tools and SDKs available for building your Microsoft Teams app.
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
---

# Tools and SDKs

Build and develop your Microsoft Teams app using tools, SDKs, and libraries. Now, Microsoft provides a comprehensive platform to create, develop, test, debug, and publish your Teams app seamlessly, making the entire process efficient and streamlined. Teams offers the following platform:

* [Tools](#tools)
* [SDKs and libraries](#sdks-and-libraries)

## Tools

Teams platform brings you different tools to build and develop your Teams apps. The following tools are available to build your app:

| Tools | Why do you need? | Environment | Test and debug |
| -------- | ------------- | ----------------- | ---------------------- |
| [Teams Toolkit](../../toolkit/teams-toolkit-fundamentals.md) | Teams Toolkit makes it simple to get started with app development for Teams. You can begin with a project template for common line-of-business app scenarios or start from a sample. Save time on setup through automated app registration and configuration using Visual Studio Code and Visual Studio. | **Visual Studio Code**: JavaScript and TypeScript </br> **Visual Studio**: .NET and Blazor | In Visual Studio Code and Visual Studio |
| [Yeoman generator for Teams](https://github.com/pnp/generator-teams) | Yeoman generator allows you to create Teams apps using TypeScript and JavaScript on your terms, in your preferred editor, and without any external or online dependencies. | TypeScript and JavaScript | NA |
| [TeamsFx CLI](../../toolkit/TeamsFx-CLI.md) | TeamsFx CLI is a text-based command line interface (CLI) that accelerates Teams application development. It aims to provide keyboard centric experience when building Teams applications. | JavaScript and .NET | Use command prompt |
| [Developer Portal for Teams](teams-developer-portal.md) | Developer Portal for Teams is the primary tool for configuring, distributing, and managing your Teams apps. With Developer Portal, you can create a basic app manifest (previously known as Teams app manifest) and distribute the app to Teams.  | Supports all languages | Developer Portal for Teams |

</br>

<details>
<summary><b>More information on building Teams app with Teams Toolkit and Yeoman Teams Project.</b></summary>

| &nbsp; | Teams Toolkit | Yeoman Teams project |
| -------- | ------------- | ----------------- |
| Environment variables | Use `.env` file | Use `.env` file |
| Generate manifest | Teams Toolkit auto-generates when creating projects. | gulp manifest |
| Deploy Teams app | Automatically update use command `Teams: Update Teams App` |gulp tenant: deploy |
| Create AAD app | Automatically create when debugging or provisioning the project. Users can also use their existing AAD app by filling in Teams app ID in `.env` file. | Manual |
| Add SSO | Provide SSO-enabled samples and how-to guides to add SSO. | Manual |
| Bot or Message extension Registration | Automatically create when debugging or provisioning the project. User can also specify their own Bot ID. | Manual (Azure Bot) |
| Expose Node.js app | Tab: localhost + HTTPS and Others: Dev Tunnel | gulp ngrok-serve |
| Run Node.js app | npm run teamsfx:dev | gulp serve |
| One-click debug | F5 or debug in Visual Studio Code and Visual Studio | N/A |

</details>

## SDKs and libraries

Teams Platform brings you different SDKs, libraries, and APIs to build and develop your Teams apps.

The following flow diagram explains the different SDKs, libraries, and its relations:

:::image type="content" source="../../assets/images/Tools-and-SDK-revamp/tools-and-sdk.png" alt-text="Screenshot shows you the list of all tools and SDKs that are available for you to build Teams apps."lightbox="../../assets/images/Tools-and-SDK-revamp/tools-and-sdk.png":::

:::image type="icon" source="../../assets/icons/blue-dot.png" border="false"::: Library that requires another library to build apps. Your project automatically pulls into another library.</br>
:::image type="icon" source="../../assets/icons/red-dot.png" border="false"::: Library that passes your app a reference to another library. </br>
:::image type="icon" source="../../assets/icons/yellow-dot.png" border="false"::: Library that's often used with another library, but there's no formal dependency. </br>
:::image type="icon" source="../../assets/icons/grey-dot.png" border="false"::: Library that's underlying service or API. </br>

### Teams Developer Platform SDKs & libraries

| SDKs and libraries | Why do you need? | Related SDKs and libraries |
| ----------------- | -------------- | ----------------------- |
| [TeamsFx SDK](~/toolkit/teamsfx-sdk.md) | TeamsFx simplifies your tasks by using Teams single sign-on (SSO) and accessing cloud resources into single-line statements with zero configuration. | :::image type="icon" source="../../assets/icons/blue-dot.png" border="false"::: Depends on **Bot Framework SDK**, **Teams JavaScript client library**, and **Microsoft Graph SDK**. </br> :::image type="icon" source="../../assets/icons/yellow-dot.png" border="false"::: You can use it with **Teams AI Library** and **Adaptive Cards**. |
| [Teams JavaScript client library](~/tabs/how-to/using-teams-client-library.md) | The Teams JavaScript client library (TeamsJS) enables you to create hosted experiences within Teams, Microsoft 365 app, and Outlook. These experiences involve hosting your app content in an iFrame. | :::image type="icon" source="../../assets/icons/red-dot.png" border="false"::: You can pass the reference to **SharePoint Framework (SPFx)**. </br> :::image type="icon" source="../../assets/icons/yellow-dot.png" border="false"::: You can use it with **Microsoft Graph SDK**, **Adaptive Cards**, and **Fluent UI React components**. |
| [SharePoint Framework (SPFx)](/sharepoint/dev/spfx/sharepoint-framework-overview) | The SharePoint Framework (SPFx) offers a page and web part model that fully supports client-side SharePoint development, seamlessly integrates with SharePoint data, and extends Microsoft Teams and Microsoft Viva. | :::image type="icon" source="../../assets/icons/yellow-dot.png" border="false"::: You can use it with **Microsoft Graph SDK**, **Adaptive Cards**, and **Fluent UI React components**. </br> :::image type="icon" source="../../assets/icons/grey-dot.png" border="false"::: Based on **SharePoint REST API**. |
| [Live Share SDK](~/apps-in-teams-meetings/teams-live-share-overview.md) | Live Share is an SDK created to turn Teams apps into collaborative multi-user experiences without requiring dedicated back-end code to be written. | :::image type="icon" source="../../assets/icons/yellow-dot.png" border="false"::: You can use it with **Microsoft Graph SDK**, **Adaptive Cards**, and **Fluent UI React components**. </br> :::image type="icon" source="../../assets/icons/red-dot.png" border="false"::: You can pass the reference to **Teams JavaScript client library**. |

### Core SDKs and libraries to build Teams app

| SDKs and libraries | Why do you need? | Related SDKs and libraries |
| ----------------- | -------------- | ----------------------- |
| [Bot Framework SDK](/azure/bot-service/bot-service-overview) | Microsoft Bot Framework and Azure AI Bot Service are a collection of libraries, tools, and services that enable you to build, test, deploy, and manage intelligent bots. The Bot Framework includes a modular and extensible SDK for building bots and connecting to AI services. | :::image type="icon" source="../../assets/icons/grey-dot.png" border="false"::: Based on **Azure Bot Service**. |
| [Microsoft Graph SDKs](/graph/sdks/sdks-overview) | The Microsoft Graph SDKs are designed to simplify the creation of high-quality, efficient, and resilient applications that access Microsoft Graph. The SDKs include two components such as service library and core library. | :::image type="icon" source="../../assets/icons/grey-dot.png" border="false"::: Based on **Microsoft Graph**. |
| [Teams AI library](../../bots/how-to/Teams%20conversational%20AI/teams-conversation-ai-overview.md) | Teams AI library is a Teams-centric interface to GPT-based common language models and user intent engines. This reduces the requirement for you to handle on complex and expensive tasks of writing and maintaining conversational bot logic to integrate with large language models (LLMs). | :::image type="icon" source="../../assets/icons/blue-dot.png" border="false"::: Depends on **Bot Framework SDK**. </br> :::image type="icon" source="../../assets/icons/grey-dot.png" border="false"::: Based on **Azure OpenAI**. |

### Additional libraries and UI utilities to build Teams apps

| SDKs and libraries | Why do you need? | Related SDKs and libraries |
| ----------------- | -------------- | ----------------------- |
| [Adaptive cards](../../task-modules-and-cards/cards/cards-reference.md#adaptive-card) | An Adaptive Card is a customizable card that can contain any combination of text, speech, images, buttons, and input fields. | :::image type="icon" source="../../assets/icons/yellow-dot.png" border="false"::: You can use it with **TeamsFx SDK**, **Teams JavaScript client library**, and **SharePoint Framework (SPFx)**. |
| [Fluent UI React components](https://react.fluentui.dev/?path=/docs/concepts-introduction--page) | Fluent UI React components are a collection of UI elements and tools that come from combining various React-based component libraries used in production, like `@fluentui/react` and `@fluentui/react-northstar`. | :::image type="icon" source="../../assets/icons/yellow-dot.png" border="false"::: You can use it with **Teams JavaScript client library** and **SharePoint Framework (SPFx)**. |
| [Fluid Framework](https://fluidframework.com/docs/) | Fluid Framework consists of client libraries that help distribute and synchronize shared state. These libraries enable multiple clients to simultaneously create and operate on shared data structures using coding patterns similar to those used to work with local data. | :::image type="icon" source="../../assets/icons/red-dot.png" border="false"::: You can pass the reference to **Live Share SDK**. </br> :::image type="icon" source="../../assets/icons/grey-dot.png" border="false"::: Based on **Azure Fluid Relay**. |

### Azure AD-secured services and APIs

| SDKs and libraries | Why do you need? | Related SDKs and libraries |
| ----------------- | -------------- | ----------------------- |
| [Azure Bot Services](/azure/bot-service/bot-service-overview) | Azure Bot Service is a collection of libraries, tools, and services that let you build, test, deploy, and manage intelligent bots. | :::image type="icon" source="../../assets/icons/grey-dot.png" border="false"::: Used for **Bot Framework SDK**. |
| [Azure OpenAI](/azure/cognitive-services/openai/overview) | Azure OpenAI Service provides REST API access to OpenAI's powerful language models including the GPT-3, Codex and Embeddings model series. Besides, the new GPT-4 and ChatGPT (gpt-35-turbo) model series are now available in preview. These models can be adapted to your specific task including but not limited to content generation, summarization, semantic search, and natural language to code translation. | :::image type="icon" source="../../assets/icons/grey-dot.png" border="false"::: Used for **Teams AI Library**. |
| [Microsoft Graph](/graph/sdks/sdks-overview) | Microsoft Graph is the gateway to data and intelligence in Microsoft 365. It provides a unified programmability model that you can use to access the tremendous amount of data in Microsoft 365, Windows, and Enterprise Mobility + Security. Use the wealth of data in Microsoft Graph to build apps for organizations and consumers that interact with millions of users. | :::image type="icon" source="../../assets/icons/grey-dot.png" border="false"::: Used for **Microsoft Graph SDK**. |
| [SharePoint REST API](/sharepoint/dev/sp-add-ins/get-to-know-the-sharepoint-rest-service?tabs=csom) | You can remotely engage with SharePoint data using any technology that supports Representational State Transfer (REST) web requests. You can perform basic create, read, update, and delete (CRUD) operations by using the REST interface provided by SharePoint. |  :::image type="icon" source="../../assets/icons/grey-dot.png" border="false"::: Used for **SharePoint Framework (SPFx)**. |
| [Azure Fluid Relay](/azure/azure-fluid-relay/overview/overview) | The Fluid Framework is an open source, platform independent framework. Azure Fluid Relay is a managed service for the Fluid Framework that helps developers build real-time collaborative experiences and replicate states across connected JavaScript clients in real-time. | :::image type="icon" source="../../assets/icons/grey-dot.png" border="false"::: Used for **Fluid Framework**. |
