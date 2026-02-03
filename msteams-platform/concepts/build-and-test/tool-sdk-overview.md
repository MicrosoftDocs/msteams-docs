---
title: Tools and SDKs to Build Teams App
author: v-sdhakshina
description: Learn more about the tools such as Microsoft 365 Agents Toolkit, Agents Toolkit CLI, Developer Portal, and Teams SDK available for building your Teams app.
ms.localizationpriority: medium
ms.topic: overview
ms.date: 02/03/2026
---

# Tools and SDKs

[!INCLUDE [Deprecation note](../../includes/deprecation-note-teamsfx-sdk.md)]

Build and develop your Microsoft Teams agents and apps using SDKs, libraries, and tools. Now, Microsoft provides a comprehensive platform to create, develop, test, debug, and publish your Teams agents and apps seamlessly, making the entire process efficient and streamlined. Teams offers the following platform:

* [SDKs and libraries](#sdks-and-libraries)
* [Tools](#tools)

## SDKs and libraries

Microsoft Teams platform provides SDKs, libraries, and APIs to build and develop Teams agents and apps. **Teams SDK** is the primary SDK for building Microsoft Teams agents and is recommended for all new development scenarios, including tabs, bots, message extensions, and meeting extensions.

<!--
The following flow diagram explains the different SDKs, libraries, and its relations:

:::image type="content" source="../../assets/images/Tools-and-SDK-revamp/tools-and-sdk.png" alt-text="Screenshot shows you the list of all tools and SDKs that are available for you to build Teams apps." lightbox="../../assets/images/Tools-and-SDK-revamp/tools-and-sdk.png":::

:::image type="icon" source="../../assets/icons/blue-dot.png" border="false"::: Library that requires another library to build apps. Your project automatically pulls into another library.</br>
:::image type="icon" source="../../assets/icons/red-dot.png" border="false"::: Library that passes your app a reference to another library. </br>
:::image type="icon" source="../../assets/icons/yellow-dot.png" border="false"::: Library often used with another library, but there's no formal dependency. </br>
:::image type="icon" source="../../assets/icons/grey-dot.png" border="false"::: Library that's underlying service or API. </br>
-->
### Core SDKs and libraries to build Teams agents and apps

[!INCLUDE [teams-ai-lib-v2-rec](../../includes/teams-ai-lib-v2-rec.md)]

| SDKs and libraries | Why you need it | Related SDKs and libraries |
| ----------------- | -------------- | ----------------------- |
| [Teams SDK](../../bots/how-to/teams-conversational-ai/teams-conversation-ai-overview.md) | Teams SDK is a Teams-centric interface to GPT-based common language models and user intent engines. This reduces the requirement for you to handle complex and expensive tasks of writing and maintaining conversational bot logic to integrate with Large Language Models (LLMs). | Based on **Azure OpenAI**. |
| [Agents SDK](/microsoft-365/agents-sdk/agents-sdk-overview?tabs=csharp) | Agents SDK enables you to build extensible, multi-channel agents that run across Microsoft 365 experiences, including Microsoft 365 Copilot and Microsoft Teams. It provides a unified development model for agent orchestration, lifecycle management, and integration with AI services of your choice. | Based on **Azure OpenAI** |
| [Microsoft Graph SDKs](/graph/sdks/sdks-overview) | The Microsoft Graph SDKs are designed to simplify the creation of high-quality, efficient, and resilient applications that access Microsoft Graph. The SDKs include two components such as service library and core library. | Based on **Microsoft Graph**. |

### Teams Developer Platform SDKs & libraries

| SDKs and libraries | Why you need it | Related SDKs and libraries |
| ----------------- | -------------- | ----------------------- |
| [Teams JavaScript client library](~/tabs/how-to/using-teams-client-library.md) | The Teams JavaScript client library (TeamsJS) enables you to create hosted experiences within Teams, Microsoft 365 app, and Outlook. These experiences involve hosting your app content in an iFrame. | You can use it with **Microsoft Graph SDK**, **Adaptive Cards**, and **Fluent UI React components**. </br> You can pass the reference to **SharePoint Framework (SPFx)** |
| [SharePoint Framework (SPFx)](/sharepoint/dev/spfx/sharepoint-framework-overview) | The SharePoint Framework (SPFx) offers a page and web part model that fully supports client-side SharePoint development, seamlessly integrates with SharePoint data, and extends Microsoft Teams and Microsoft Viva. | You can use it with **Microsoft Graph SDK**, **Adaptive Cards**, and **Fluent UI React components**. </br> Based on **SharePoint REST API**. |
| [Live Share SDK](~/apps-in-teams-meetings/teams-live-share-overview.md) | Live Share is an SDK created to turn Teams apps into collaborative multi-user experiences without requiring dedicated back-end code to be written. | You can use it with **Microsoft Graph SDK**, **Adaptive Cards**, and **Fluent UI React components**. </br> You can pass the reference to **Teams JavaScript client library**. |

### Additional libraries and UI utilities to build Teams agents and apps

| Libraries | Why you need it | Related SDKs and libraries |
| ----------------- | -------------- | ----------------------- |
| [Adaptive Cards](../../task-modules-and-cards/cards/cards-reference.md#adaptive-card) | An Adaptive Card is a customizable card that can contain any combination of text, speech, images, buttons, and input fields. | You can use it with **Teams JavaScript client library**, and **SharePoint Framework (SPFx)**. |
| [Fluent UI React components](https://react.fluentui.dev/?path=/docs/concepts-introduction--page) | Fluent UI React components are a collection of UI elements and tools that come from combining various React-based component libraries used in production, like `@fluentui/react` and `@fluentui/react-northstar`. | You can use it with **Teams JavaScript client library** and **SharePoint Framework (SPFx)**. |
| [Fluid Framework](https://fluidframework.com/docs) | Fluid Framework consists of client libraries that help distribute and synchronize shared state. These libraries enable multiple clients to simultaneously create and operate on shared data structures using coding patterns similar to those used to work with local data. | You can pass the reference to **Live Share SDK**. </br> Based on **Azure Fluid Relay**. |

<a name='azure-ad-secured-services-and-apis'></a>

### Microsoft Entra ID-secured services and APIs

| Services and APIs | Why you need it | Related SDKs and libraries |
| ----------------- | -------------- | ----------------------- |
| [Azure Bot Services](/azure/bot-service/bot-service-overview) | Azure Bot Service is a collection of libraries, tools, and services that let you build, test, deploy, and manage intelligent bots. | Used for **Teams SDK**. |
| [Azure OpenAI](/azure/cognitive-services/openai/overview) | Azure OpenAI Service provides REST API access to OpenAI's powerful language models including the GPT-3, Codex, and Embeddings model series. Besides, the new GPT-4 and ChatGPT (gpt-35-turbo) model series are now available in preview. These models can be adapted to your specific task including but not limited to content generation, summarization, semantic search, and natural language to code translation. | Used for **Teams SDK**. |
| [Microsoft Graph](/graph/sdks/sdks-overview) | Microsoft Graph is the gateway to data and intelligence in Microsoft 365. It provides a unified programmability model that you can use to access the tremendous amount of data in Microsoft 365, Windows, and Enterprise Mobility + Security. Use the wealth of data in Microsoft Graph to build apps for organizations and consumers that interact with millions of users. | Used for **Microsoft Graph SDK**. |
| [SharePoint REST API](/sharepoint/dev/sp-add-ins/get-to-know-the-sharepoint-rest-service?tabs=csom) | You can remotely engage with SharePoint data using any technology that supports Representational State Transfer (REST) web requests. You can perform basic create, read, update, and delete (CRUD) operations by using the REST interface provided by SharePoint. | Used for **SharePoint Framework (SPFx)**. |
| [Azure Fluid Relay](/azure/azure-fluid-relay/overview/overview) | The Fluid Framework is an open source, platform independent framework. Azure Fluid Relay is a managed service for the Fluid Framework that helps developers build real-time collaborative experiences and replicate states across connected JavaScript clients in real-time. | Used for **Fluid Framework**. |

> [!NOTE]
> The **Bot Framework SDK** and **Bot Framework Emulator** have been archived on GitHub and are no longer updated or maintained. Support tickets for the Bot Framework SDK are no longer serviced after December 31, 2025.
>
> We recommend planning your transition to the [Teams SDK](/microsoftteams/platform/teams-ai-library/welcome) for building agents in Microsoft Teams. To extend your agent's capabilities across other Microsoft 365 platforms, use the [Microsoft 365 Agents SDK](/microsoft-365/agents-sdk/).

## Tools

The Teams platform brings you the following tools to build Teams agents and apps:

| Tools | Why you need it | Environment | Test and debug |
| -------- | ------------- | ----------------- | ---------------------- |
| [Microsoft 365 Agents Toolkit (previously known as Teams Toolkit)](../../toolkit/agents-toolkit-fundamentals.md) | Agents Toolkit makes it simple to get started with app and agent development for Teams. You can begin with a project template for common custom solutions built for your org (LOB app) scenarios or start from a sample. Save time on setup through automated app and agent registration and configuration using Visual Studio Code and Visual Studio. | **Visual Studio Code**: JavaScript and TypeScript <br /><br /> **Visual Studio**: .NET and Blazor | In Visual Studio Code and Visual Studio |
| [Developer Portal for Teams](teams-developer-portal.md) | Developer Portal for Teams is the primary tool for configuring, distributing, and managing your Teams apps and agents. With Developer Portal, you can create a basic app manifest (previously known as Teams app manifest) and publish the app and agent to Teams.  | Supports all languages | Developer Portal for Teams |
| [Microsoft 365 Agents Toolkit CLI](../../toolkit/Teams-Toolkit-CLI.md) (previously known as Teams Toolkit CLI) | Agents Toolkit CLI is a text-based command line interface (CLI) that accelerates Teams app and agent development. It aims to provide keyboard centric experience when building Teams solution. | JavaScript and .NET | Use command prompt |

</br>

<details>
<summary><b>More information on building Teams apps and agents with Agents Toolkit.</b></summary>

| &nbsp; | Agents Toolkit |
| -------- | ------------- |
| Environment variables | Use `.env` file |
| Generate manifest | Agents Toolkit autogenerates when creating projects. |
| Deploy Teams app | Automatically update use command `Microsoft 365 Agents: Update Teams App` |
| Create Microsoft Entra app | Automatically create when debugging or provisioning the project. Users can also use their existing Microsoft Entra app by filling in Teams app ID in `.env` file. |
| Add SSO | Provide SSO-enabled samples and how-to guides to add SSO. |
| Bot or Message extension Registration | Automatically create when debugging or provisioning the project. User can also specify their own Bot ID. |
| Expose Node.js app | Tab: localhost + HTTPS and Others: Dev Tunnel |
| Run Node.js app | npm run atk:dev |
| One-click debug | F5 or debug in Visual Studio Code and Visual Studio |

</details>

### Workflow for Teams

You can create workflows in Teams by integrating AI. You can manage and use workflows in Teams chats, and include practical workflow ideas like sending weekly reminders or triggering actions via emojis. For more information, see [Add or run a workflow in Microsoft Teams](https://support.microsoft.com/en-us/office/add-or-run-a-workflow-in-chats-chat-messages-channels-and-channel-posts-in-microsoft-teams-242eb8f2-f328-45be-b81f-9817b51a5f0e).

### Recommendations

| Tool | Details |
| ----------------- | -------------- |
| Microsoft 365 Agents Toolkit | We recommend using [Agents Toolkit v5](../../toolkit/agents-toolkit-fundamentals.md) to build your apps and agents, as Agents Toolkit v4 is available only with limited functionality. |
| Microsoft 365 Agents Toolkit CLI | We recommend that you use [Agents Toolkit CLI](../../toolkit/Teams-Toolkit-CLI.md) to build your Teams app and agents, as TeamsFx CLI v1 and v2 are available only with limited functionality. |
