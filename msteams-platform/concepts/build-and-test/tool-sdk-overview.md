---
title: Tools and SDKs
author: v-sdhakshina
description: In this article, learn more about the tools and SDKs available for building your Microsoft Teams app.
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
---

# Tools and SDKs

## Tools

Introduction to be added

:::image type="content" source="../../assets/images/Tools-and-SDK-revamp/scaffolding-tools.png" alt-text="Screenshot shows you the Teams toolkit and Yo teams generator information.":::

Following are the different way to start building Teams app with Teams Toolkit and Yeoman Teams Project:

| &nbsp; | Teams Toolkit | Yeoman Teams project | Microsoft Teams samples |
| -------- | ------------- | ----------------- | ---------------------- |
| Description | Teams Toolkit makes it simple to get started with app development for Microsoft Teams. You can start a project template for common line-of-business app scenarios or from a sample and save setup time with automated app registration and configuration. | Yo Teams allows you to build Microsoft Teams applications based on TypeScript and node.js on your terms, in your editor of choice, without any external or online dependencies. | Microsoft Teams samples are designed to help you understand and build your own Teams app with different capabilities and scenarios. |
| Environment variables | Use `.env` file | Use `.env` file | Use `.env` or `config.json` files |
| Generate manifest | Teams Toolkit auto-generate when create project. | gulp manifest | Manual |
| Deploy Teams app | Auto-update use command `Teams: Update Teams App` |gulp tenant: deploy | Manual |
| Create AAD app | Auto-create when debug or provision the project. User can also use their existing AAD app by filling in Teams app ID in `.env` file. | Manual | Manual |
| Add SSO | Provide SSO-enabled samples and how-to guides to add SSO. | Manual | Manual |
| Bot/ME Registration | Auto-create when debug or provision the project. User can also specify their own Bot ID. | Manual (Azure Bot) | Manual |
| Expose Node.js app | Tab: localhost + HTTPS and Others: Dev Tunnel | gulp ngrok-serve | Manual (ngrok) |
| Run Node.js app | npm run teamsfx:dev | gulp serve | npm start or others |
| One-click debug | F5 or debug in Visual Studio Code and Visual Studio | N/A | N/A |

## SDKs and libraries

Teams Platform brings you different SDKs, libraries, and APIs to build and develop your Teams apps.

The following flow diagram explains you the different SDKs, libraries and its relations:

:::image type="content" source="../../assets/images/Tools-and-SDK-revamp/tools-and-sdk.png" alt-text="Screenshot shows you the list of all tools and SDKs that are available for you to build Teams apps."lightbox="../../assets/images/Tools-and-SDK-revamp/tools-and-sdk.png":::

:::image type="icon" source="../../assets/icons/blue-dot.png" border="false"::: Library that requires another library to build apps. Your project automatically pulls in another library.</br>
:::image type="icon" source="../../assets/icons/red-dot.png" border="false"::: Library that passes your app a reference to another library. </br>
:::image type="icon" source="../../assets/icons/yellow-dot.png" border="false"::: Library that's often used with another library, but there's no formal dependency. </br>
:::image type="icon" source="../../assets/icons/grey-dot.png" border="false"::: Library that's underlying service or API. </br>

### Teams Developer Platform SDKs & libraries

| SDKs and libraries | Why you need? | Related SDKs and libraries | How to use? |
| ----------------- | -------------- | ----------------------- | --------------- |
| **TeamsFx SDK** | TeamsFx helps to reduce your tasks by using Microsoft Teams single sign-on (SSO) and accessing cloud resources down to single line statements with zero configuration. | :::image type="icon" source="../../assets/icons/blue-dot.png" border="false"::: Depends on **Bot Framework SDK**, **Teams JavaScript client library**, and **Microsoft Graph SDK**. </br> :::image type="icon" source="../../assets/icons/yellow-dot.png" border="false"::: You can use it with **Teams AI Library** and **Adaptive Cards**. | To know how it works, see [TeamsFx SDK](~/toolkit/teamsfx-sdk.md). |
| **Teams JavaScript client library** | The Microsoft Teams JavaScript client library (TeamsJS) enables you to create hosted experiences within Teams, Microsoft 365 app, and Outlook. These experiences involve hosting your app content in an iFrame. | :::image type="icon" source="../../assets/icons/red-dot.png" border="false"::: You can pass the reference to **SharePoint Framework (SPFx)**. </br> :::image type="icon" source="../../assets/icons/yellow-dot.png" border="false"::: You can use it with **Microsoft Graph SDK**, **Adaptive Cards**, and **Fluent UI React components**. | To know how it works, see [Teams JavaScript client library](~/tabs/how-to/using-teams-client-library.md). |
| **SharePoint Framework (SPFx)** | The SharePoint Framework (SPFx) is a page and web part model that provides full support for client-side SharePoint development, easy integration with SharePoint data, and extending Microsoft Teams and Microsoft Viva. | :::image type="icon" source="../../assets/icons/yellow-dot.png" border="false"::: You can use it with **Microsoft Graph SDK**, **Adaptive Cards**, and **Fluent UI React components**. </br> :::image type="icon" source="../../assets/icons/grey-dot.png" border="false"::: Based on **SharePoint REST API**. | To know how it works, see [SharePoint Framework (SPFx)](/sharepoint/dev/spfx/sharepoint-framework-overview). |
| **Live Share SDK** | Live Share is an SDK designed to transform Teams apps into collaborative multi-user experiences without writing any dedicated back-end code. | :::image type="icon" source="../../assets/icons/yellow-dot.png" border="false"::: You can use it with **Microsoft Graph SDK**, **Adaptive Cards**, and **Fluent UI React components**. </br> :::image type="icon" source="../../assets/icons/red-dot.png" border="false"::: You can pass the reference to **Teams JavaScript client library**. | To know how it works, see [Live Share SDK](~/apps-in-teams-meetings/teams-live-share-overview.md). |

### Core SDKs and libraries to build Teams app

| SDKs and libraries | Why you need? | Related SDKs and libraries | How to use? |
| ----------------- | -------------- | ----------------------- | --------------- |
| **Bot Framework SDK** | Microsoft Bot Framework and Azure AI Bot Service are a collection of libraries, tools, and services that let you build, test, deploy, and manage intelligent bots. The Bot Framework includes a modular and extensible SDK for building bots and connecting to AI services. | :::image type="icon" source="../../assets/icons/grey-dot.png" border="false"::: Based on **Azure Bot Service**. | To know how it works, see [Bot Framework SDK](/azure/bot-service/bot-service-overview). |
| **Microsoft Graph SDKs** | The Microsoft Graph SDKs are designed to simplify building high-quality, efficient, and resilient applications that access Microsoft Graph. The SDKs include two components such as service library and core library. | :::image type="icon" source="../../assets/icons/grey-dot.png" border="false"::: Based on **Microsoft Graph**. | To know how it works, see [Microsoft Graph SDKs](/graph/sdks/sdks-overview). |
| **Teams AI library** | Teams AI library is a Teams-centric interface to GPT-based common language models and user intent engines. This moderates the need for you to take on complex and expensive tasks of writing and maintaining conversational bot logic to integrate with large language models (LLMs). | :::image type="icon" source="../../assets/icons/blue-dot.png" border="false"::: Depends on **Bot Framework SDK**. </br> :::image type="icon" source="../../assets/icons/grey-dot.png" border="false"::: Based on **Azure OpenAI**. | To know how it works, see [Teams AI library](../../bots/how-to/Teams%20conversational%20AI/teams-conversation-ai-overview.md). |

### Additional libraries and UI utilities to build Teams apps

| SDKs and libraries | Why you need? | Related SDKs and libraries | How to use? |
| ----------------- | -------------- | ----------------------- | --------------- |
| **Adaptive cards** | An Adaptive Card is a customizable card that can contain any combination of text, speech, images, buttons, and input fields. | :::image type="icon" source="../../assets/icons/yellow-dot.png" border="false"::: You can use it with **TeamsFx SDK**, **Teams JavaScript client library**, and **SharePoint Framework (SPFx)**. | To know how it works, see [Adaptive cards](../../task-modules-and-cards/cards/cards-reference.md#adaptive-card). |
| **Fluent UI React components** | Fluent UI React components are a set of UI components and utilities resulting from an effort to converge the set of React based component libraries in production such as `@fluentui/react` and `@fluentui/react-northstar`. | :::image type="icon" source="../../assets/icons/yellow-dot.png" border="false"::: You can use it with **Teams JavaScript client library** and **SharePoint Framework (SPFx)**. | To know how it works, see [Fluent UI React components](https://react.fluentui.dev/?path=/docs/concepts-introduction--page). |
| **Fluid Framework** | Fluid Framework is a collection of client libraries for distributing and synchronizing shared state. These libraries allow multiple clients to simultaneously create and operate on shared data structures using coding patterns like those used to work with local data. | :::image type="icon" source="../../assets/icons/red-dot.png" border="false"::: You can pass the reference to **Live Share SDK**. </br> :::image type="icon" source="../../assets/icons/grey-dot.png" border="false"::: Based on **Azure Fluid Relay**. | To know how it works, see [Fluid Framework](https://fluidframework.com/docs/). |

### Azure AD-secured services and APIs

| SDKs and libraries | Why you need? | Related SDKs and libraries | How to use? |
| ----------------- | -------------- | ----------------------- | --------------- |
| **Azure Bot Service** | Azure Bot Service is a collection of libraries, tools, and services that let you build, test, deploy, and manage intelligent bots. | :::image type="icon" source="../../assets/icons/grey-dot.png" border="false"::: Used for **Bot Framework SDK**. | To know how it works, see [Azure Bot Services](/azure/bot-service/bot-service-overview). |
| **Azure OpenAI** | Azure OpenAI Service provides REST API access to OpenAI's powerful language models including the GPT-3, Codex and Embeddings model series. Besides, the new GPT-4 and ChatGPT (gpt-35-turbo) model series are now available in preview. These models can be adapted to your specific task including but not limited to content generation, summarization, semantic search, and natural language to code translation. | :::image type="icon" source="../../assets/icons/grey-dot.png" border="false"::: Used for **Teams AI Library**. | To know how it works, see [Azure OpenAI](/azure/cognitive-services/openai/overview). |
| **Microsoft Graph** | Microsoft Graph is the gateway to data and intelligence in Microsoft 365. It provides a unified programmability model that you can use to access the tremendous amount of data in Microsoft 365, Windows, and Enterprise Mobility + Security. Use the wealth of data in Microsoft Graph to build apps for organizations and consumers that interact with millions of users. | :::image type="icon" source="../../assets/icons/grey-dot.png" border="false"::: Used for **Microsoft Graph SDK**. | To know how it works, see [Microsoft Graph](/graph/sdks/sdks-overview). |
| **SharePoint REST API** | You can interact remotely with SharePoint data by using any technology that supports Representational State Transfer (REST) web requests. You can perform basic create, read, update, and delete (CRUD) operations by using the REST interface provided by SharePoint. |  :::image type="icon" source="../../assets/icons/grey-dot.png" border="false"::: Used for **SharePoint Framework (SPFx)**. | To know how it works, see [SharePoint REST API](/sharepoint/dev/sp-add-ins/get-to-know-the-sharepoint-rest-service?tabs=csom). |
| **Azure Fluid Relay** | The Fluid Framework is an open source, platform independent framework. Azure Fluid Relay is a managed offering for the Fluid Framework that helps developers build real-time collaborative experiences and replicate states across connected JavaScript clients in real-time. | :::image type="icon" source="../../assets/icons/grey-dot.png" border="false"::: Used for **Fluid Framework**. | To know how it works, see [Azure Fluid Relay](/azure/azure-fluid-relay/overview/overview). |

[Table to be added for all Tools]
