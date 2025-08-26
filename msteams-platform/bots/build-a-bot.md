---
title: Bots and Agents
description: Learn to build a basic chatbot using Microsoft 365 Agents Toolkit, Bot Framework SDK. Additionally, learn to build a custom engine agent.
ms.localizationpriority: high
ms.date: 09/25/2024
ms.topic: conceptual
ms.author: surbhigupta
---

# Bots and agents in Teams

When deciding how to develop your bot, it's important to know your options. You must choose between an AI-enabled bot or a conventional one. This article gives a quick overview to help you start. It shows you how to build a basic bot app and then enhance it into a custom engine agent.

## Choose the tools and platforms

If you want to create your own bot, here's a list of tools and platforms to help you get started:

:::image type="content" source="../assets/images/bots/m365-bot-decisions.png" alt-text="Infographics depicts a decision tree for building a bot." Lightbox="../assets/images/bots/m365-bot-decisions.png":::

| # | Choose ... | From the following options ... |
| --- | --- | --- |
| 1. | Bot type | - Custom engine agent <br> - Conventional bot |
| 2. | Bot capabilities | Choose the capabilities you want to build in your bot: <br> &nbsp;&nbsp; • Conversational capability <br> &nbsp;&nbsp; • Notification capability <br> &nbsp;&nbsp; • Workflow capability <br> &nbsp;&nbsp; • Command capability |
| 3. | Tools and Platforms | - **Teams AI library v2**: <br> Teams AI Library v2 is a set of tools for developing agents and applications for Microsoft Teams. It enhances developer experience, making it easier to create powerful agents and applications. <br> If you already have an agent or an application, you can migrate it to use Teams AI library v2 for adding more advanced capabilities. <br><br> For more information see [Teams AI library v2](/microsoftteams/platform/teams-ai-library) <br><br> - **Teams AI library**: <br> Teams custom engine agents use AI to communicate naturally with users. These agents can handle tasks from simple questions to complex operations. <br> If you have an existing Bot Framework SDK bot, you can migrate it to Teams AI library for advanced capabilities. For more information, see [why you must migrate to Teams AI library](how-to/teams-conversational-ai/how-conversation-ai-get-started.md#migrate-your-bot-to-use-teams-ai-library). <br> <br> - **Bot Framework SDK**: The [Bot Framework](https://dev.botframework.com/) SDK allows you to create bots using C#, Python, and JavaScript. You can modify existing bots to work in Teams using C# or Node.js. The [SDK](/azure/bot-service/bot-service-overview?view=azure-bot-service-4.0&preserve-view=true) extends Bot Builder to: <br> &nbsp;&nbsp;• Use specialized card types like the connector card for Microsoft 365 Groups. <br> &nbsp;&nbsp;• Set Teams-specific channel data on activities. <br> &nbsp;&nbsp;• Process message extension requests. <br> You can develop Teams apps with any web technology and call the [Bot Framework REST APIs](/bot-framework/rest-api/bot-framework-rest-overview) directly, ensuring token handling in all cases. <br> <br> - **Microsoft 365 Agents Toolkit** (previously known as Teams Toolkit): <br> Agents Toolkit makes it simple to start developing bot apps for Teams. You can use a project template for common custom bot app scenarios (LOB app) or start from a sample. <br> For more information, see [tools and SDKs](../concepts/build-and-test/tool-sdk-overview.md). <br> <br> - **Azure AI services**:  <br> Azure AI services offer tools and frameworks for building, deploying, and managing intelligent applications. The Azure AI Foundry tool is crucial for creating and testing custom engine agents to manage and test AI models. <br> For more information, see [Azure AI Foundry](https://ai.azure.com/). |
| 4. | Bot registration service | - Azure AD <br> - Developer Portal |
| 5. | Advanced bot capabilities | - Call and media bot <br> - Access data using MS Graph <br> - SSO <br> - Bot on Mobile <br> - Support for Microsoft 365 Copilot Chat |

## Build a bot

Let's start by building a bot. You can use Agents Toolkit, Bot Framework SDK, or Teams AI library. After you build a conventional Teams bot app, you can add the AI layer to your bot to elevate it.

### Build a conventional Teams bot app

| # | I want to build ... | Here's a sample |
| --- | --- | --- |
| 1. | Conversational bot using Bot Framework SDK | - [Bot app with Node.js](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/nodejs) <br> - [Bot app with C#](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/csharp) <br> - [Bot app with Python](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/python) |
| 2. | Conversational bot using Agents Toolkit | [Create Teams conversation bot](../sbs-teams-conversation-bot.yml) |

### Build an AI-powered Teams bot app

You can build a new custom engine agent or elevate your existing conventional bot to be powered by AI.

| # | I want to ... | Here's how... |
| --- | --- | --- |
| 1. | Build a custom engine agent with Teams AI library v2 (preview) | [Build using Teams AI library v2](/microsoftteams/platform/teams-ai-library) |
| 1. | Build a custom engine agent with Teams AI library v1 and Agents Toolkit | [Build a custom engine agent](../Teams-AI-library-tutorial.yml) |
| 2. | Upgrade a conventional bot to custom engine agent | [Upgrade bot to Custom engine agent](how-to/teams-conversational-ai/how-conversation-ai-get-started.md#upgrade-your-conventional-bot-to-custom-engine-agent) |
| 3. | Elevate a conventional bot built with Bot framework adapter to use AI | [Elevate your conventional bot to use AI](how-to/teams-conversational-ai/how-conversation-ai-get-started.md#elevate-your-conventional-bot-to-use-ai) |
| 4. | Migrate a bot built with Bot framework to use Teams AI Library | [Migrate your bot to use Teams AI library](how-to/teams-conversational-ai/how-conversation-ai-get-started.md#migrate-your-bot-to-use-teams-ai-library) |

## Next step

Choose one of the following next steps:

> [!div class="nextstepaction"]
> If you want to learn more about Teams AI library, select the following: <br>
> [What is Teams AI library?](how-to/teams-conversational-ai/teams-conversation-ai-overview.md)
>
>[!div class="nextstepaction"]
> If you want to learn more about Teams AI library v2, select the following: <br>
> [Teams AI library v2](/microsoftteams/platform/teams-ai-library/)
>
> [!div class="nextstepaction"]
> If you want to learn about the core capabilities of Teams AI library, select the following: <br>
> [Understand Teams AI library](how-to/teams-conversational-ai/how-conversation-ai-core-capabilities.md)
>
> [!div class="nextstepaction"]
> If you want to learn more about developing a bot app, select the following: <br>
> [Understand bot concepts](bot-concepts.md)

## See also

* [Send and receive messages](build-conversational-capability.md)
* [Send notifications](build-notification-capability.md)
* [Workflow bot in Teams](how-to/conversations/workflow-bot-in-teams.md)
* [Command bot in Teams](how-to/conversations/command-bot-in-teams.md)
