---
title: Bots in Teams
description: Learn to build a basic chatbot. Additionally, learn to migrate  build an agent.
ms.localizationpriority: high
ms.date: 09/25/2024
ms.topic: conceptual
ms.author: surbhigupta
---

# Bots in Teams

[!INCLUDE [teams-ai-lib-v2-rec](../includes/teams-ai-lib-v2-rec.md)]

When deciding how to develop your bot, it's important to know your options. You must choose between an AI-enabled bot or a conventional one. This article gives a quick overview to help you start. It shows you how to build a basic bot app and then enhance it into a Teams agent.

## Choose the tools and platforms

If you want to create your own bot, here's a list of tools and platforms to help you get started:

<!--
:::image type="content" source="../assets/images/bots/m365-bot-decisions.png" alt-text="Infographics depicts a decision tree for building a bot." Lightbox="../assets/images/bots/m365-bot-decisions.png":::
-->

| # | Choose ... | From the following options ... |
| --- | --- | --- |
| 1. | Bot type | - Custom engine agent <br> - Conventional bot |
| 2. | Bot capabilities | Choose the capabilities you want to build in your bot: <br> &nbsp;&nbsp; • Conversational capability <br> &nbsp;&nbsp; • Notification capability <br> &nbsp;&nbsp; • Workflow capability <br> &nbsp;&nbsp; • Command capability |
| 3. | Tools and Platforms | - **Teams SDK**: <br> Teams SDK is a set of tools for developing agents and applications for Microsoft Teams. It enhances developer experience, making it easier to create powerful agents and applications. <br> If you already have an agent or an application, you can migrate it to use Teams SDK for adding more advanced capabilities. <br><br> For more information see [Teams SDK](/microsoftteams/platform/teams-ai-library)  <br> <br> - **Microsoft 365 Agents Toolkit** (previously known as Teams Toolkit): <br> Agents Toolkit makes it simple to start developing bot apps for Teams. You can use a project template for common custom bot app scenarios (LOB app) or start from a sample. <br> For more information, see [tools and SDKs](../concepts/build-and-test/tool-sdk-overview.md). <br> <br> - **Azure AI services**:  <br> Azure AI services offer tools and frameworks for building, deploying, and managing intelligent applications. The Azure AI Foundry tool is crucial for creating and testing custom engine agents to manage and test AI models. <br> For more information, see [Azure AI Foundry](https://ai.azure.com/). |
| 4. | Bot registration service | - Azure AD <br> - Developer Portal |
| 5. | Advanced bot capabilities | - Call and media bot <br> - Access data using MS Graph <br> - SSO <br> - Bot on Mobile <br> - Support for Microsoft 365 Copilot Chat |

## Build a bot

Let's start by building a bot. You can use Agents Toolkit, Bot Framework SDK, or Teams SDK. After you build a conventional Teams bot app, you can add the AI layer to your bot to elevate it.

### Build a conventional Teams bot app

| # | I want to build ... | Here's a sample |
| --- | --- | --- |
| 1. | Conversational bot | - [Bot app with Node.js](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/nodejs) <br> - [Bot app with C#](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/csharp) <br> - [Bot app with Python](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/python) |
| 2. | Conversational bot using Agents Toolkit | [Create Teams conversation bot](how-to/conversations/channel-and-group-conversations.md) |

### Build an AI-powered Teams bot app

You can build a new custom engine agent or elevate your existing conventional bot to be powered by AI.

| # | I want to ... | Here's how... |
| --- | --- | --- |
| 1. | Build a custom engine agent with Teams SDK | [Teams SDK](/microsoftteams/platform/teams-ai-library/welcome) |
| 2. | Upgrade a conventional bot to custom engine agent | [Upgrade bot to Custom engine agent](how-to/teams-conversational-ai/how-conversation-ai-get-started.md#upgrade-your-conventional-bot-to-custom-engine-agent) |
| 3. | Elevate a conventional bot built with Bot framework adapter to use AI | [Elevate your conventional bot to use AI](how-to/teams-conversational-ai/how-conversation-ai-get-started.md#elevate-your-conventional-bot-to-use-ai) |
| 4. | Migrate a bot built with Bot framework to use Teams SDK | [Migrate your bot to use Teams SDK](how-to/teams-conversational-ai/how-conversation-ai-get-started.md#migrate-your-bot-to-use-teams-ai-library) |

## Next step

Choose one of the following next steps:

>[!div class="nextstepaction"]
> If you want to learn more about Teams SDK, select the following: <br>
> [Teams SDK](/microsoftteams/platform/teams-ai-library/welcome)
> [!div class="nextstepaction"]
> If you want to learn more about developing a bot app, select the following: <br>
> [Understand bot concepts](bot-concepts.md)

## See also

* [Build reusable configurations for bot-based agents](../concepts/build-and-test/manage-your-apps-in-developer-portal.md#agent-identity-blueprint)
* [Send and receive messages](build-conversational-capability.md)
* [Send notifications](build-notification-capability.md)
* [Workflow bot in Teams](how-to/conversations/workflow-bot-in-teams.md)
* [Command bot in Teams](how-to/conversations/command-bot-in-teams.md)
