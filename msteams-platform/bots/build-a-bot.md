---
title: Build a bot
description: Learn to build a basic chatbot using Teams Toolkit, Bot Framework SDK. Additionally, learn to build a custom engine agent.
ms.localizationpriority: high
ms.date: 09/25/2024
ms.topic: conceptual
ms.author: surbhigupta
---

# Types of bots

When deciding how to develop your bot, you consider your available options. You choose between an AI-enabled bot and a conventional one. This article presents an overview to help you start. It explains how you build a basic bot app and then enhance it into a custom engine agent.

## Choose the tools and platforms

If you want to create your own bot, you use the following list of tools and platforms to get started:

:::image type="content" source="../assets/images/bots/m365-bot-decisions.png" alt-text="Infographics depicts a decision tree for building a bot." Lightbox="../assets/images/bots/m365-bot-decisions.png":::

| # | Choose ... | From the following options ... |
| --- | --- | --- |
| 1. | Bot type | - Custom engine agent <br> - Conventional bot |
| 2. | Bot capabilities | Choose the capabilities you want to build in your bot: <br> &nbsp;&nbsp; • Conversational capability <br> &nbsp;&nbsp; • Notification capability <br> &nbsp;&nbsp; • Workflow capability <br> &nbsp;&nbsp; • Command capability |
| 3. | Tools and Platforms | - **Teams AI library**: <br> Teams custom engine agents use AI to communicate naturally with users. These agents handle tasks ranging from simple questions to complex operations. If you have an existing Bot Framework SDK bot, you migrate it to Teams AI library for advanced capabilities. For more information, see [why you must migrate to Teams AI library](how-to/teams-conversational-ai/how-conversation-ai-get-started.md#migrate-your-bot-to-use-teams-ai-library). <br> <br> - **Bot Framework SDK**: The [Bot Framework](https://dev.botframework.com/) SDK allows you to create bots using C#, Python, and JavaScript. You modify existing bots to work in Teams using C# or Node.js. The [SDK](/azure/bot-service/bot-service-overview?view=azure-bot-service-4.0&preserve-view=true) extends Bot Builder to: <br> &nbsp;&nbsp;• Use specialized card types like the connector card for Microsoft 365 Groups. <br> &nbsp;&nbsp;• Set Teams-specific channel data on activities. <br> &nbsp;&nbsp;• Process message extension requests. <br> You develop Teams apps with any web technology and call the [Bot Framework REST APIs](/bot-framework/rest-api/bot-framework-rest-overview) directly, ensuring token handling in all cases. <br> <br> - **Teams Toolkit**: <br> Teams Toolkit makes it simple to start developing bot apps for Teams. You use a project template for common custom bot app scenarios (LOB app) or start from a sample. For more information, see [tools and SDKs](../concepts/build-and-test/tool-sdk-overview.md). <br> <br> - **Azure AI services**: <br> Azure AI services offer tools and frameworks for building, deploying, and managing intelligent applications. The Azure AI Foundry tool is crucial for creating and testing custom engine agents to manage and test AI models. For more information, see [Azure AI Foundry](https://ai.azure.com/). |
| 4. | Bot registration service | - Azure AD <br> - Developer Portal |
| 5. | Advanced bot capabilities | - Call and media bot <br> - Access data using MS Graph <br> - SSO <br> - Bot on Mobile <br> - Support for Microsoft 365 Copilot Chat |

## Build a bot

You start by building a bot using Teams Toolkit, Bot Framework SDK, or Teams AI library. After you build a conventional Teams bot app, you add an AI layer to elevate its capabilities.

### Build a conventional Teams bot app

| # | I want to build ... | Here's a sample |
| --- | --- | --- |
| 1. | Conversational bot using Bot Framework SDK | - [Bot app with Node.js](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/nodejs) <br> - [Bot app with C#](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/csharp) <br> - [Bot app with Python](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/python) |
| 2. | Conversational bot using Teams Toolkit | [Create Teams conversation bot](../sbs-teams-conversation-bot.yml) |

### Build an AI-powered Teams bot app

You build a new custom engine agent or elevate your existing conventional bot to use AI.

| # | I want to build ... | Here's how... |
| --- | --- | --- |
| 1. | Custom engine agent with Teams AI library and Teams Toolkit | [Build a custom engine agent](../Teams-AI-library-tutorial.yml) |
| 2. | Upgrade your conventional bot to a custom engine agent | [Upgrade bot to Custom engine agent](how-to/teams-conversational-ai/how-conversation-ai-get-started.md#upgrade-your-conventional-bot-to-custom-engine-agent) |
| 3. | Elevate your conventional bot built with Bot Framework adapter to use AI | [Elevate your conventional bot to use AI](how-to/teams-conversational-ai/how-conversation-ai-get-started.md#elevate-your-conventional-bot-to-use-ai) |
| 4. | Migrate your bot built with Bot Framework to use Teams AI Library | [Migrate your bot to use Teams AI library](how-to/teams-conversational-ai/how-conversation-ai-get-started.md#migrate-your-bot-to-use-teams-ai-library) |

## Next step

Choose one of the following next steps:

> [!div class="nextstepaction"]
> If you want to learn more about Teams AI library, select the following: <br>
> [What is Teams AI library?](how-to/teams-conversational-ai/teams-conversation-ai-overview.md)
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