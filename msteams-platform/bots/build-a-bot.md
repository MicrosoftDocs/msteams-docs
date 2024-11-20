---
title: Let's build a bot
description: Learn to build a basic chatbot using Teams Toolkit, Bot Framework SDK. Additionally, learn to build an custom engine agent.
ms.localizationpriority: high
ms.date: 09/25/2024
ms.topic: conceptual
ms.author: surbhigupta
---

# Let's build a bot

When deciding how to develop your bot, it's important to know your options. You must choose between an AI-enabled bot or a conventional one. This article gives a quick overview to help you start. It shows you how to build a basic bot app and then enhance it into a custom engine agent.

## Choose the tools and platforms

If you want to create your own bot, here's a list of tools and platforms to help you get started:

:::image type="content" source="../assets/images/bots/m365-bot-decisions.png" alt-text="Infographics depicts a decision tree for building a bot." Lightbox="../assets/images/bots/m365-bot-decisions.png":::

| # | Choose ... | From the following options ... |
| --- | --- | --- |
| 1. | Bot type | - Custom engine agent <br> - Conventional bot |
| 2. | Bot capabilities | Choose the capabilities you want to build in your bot: <br> &nbsp;&nbsp; • Conversational capability <br> &nbsp;&nbsp; • Notification capability <br> &nbsp;&nbsp; • Workflow capability <br> &nbsp;&nbsp; • Command capability |
| 3. | Tools and Platforms | - **Teams AI library**: <br> Teams custom engine agents use AI to communicate naturally with users. These agents can handle tasks from simple questions to complex operations. <br> If you have an existing Bot Framework SDK bot, you can migrate it to the Teams AI library for advanced capabilities.  For more information, see [why you must migrate to the Teams AI library](how-to/teams-conversational-ai/how-conversation-ai-get-started.md#migrate-your-bot-to-use-teams-ai-library). <br> <br> - **Bot Framework SDK**: The [Bot Framework](https://dev.botframework.com/) SDK allows you to create bots using C#, Python, and JavaScript. You can modify existing bots to work in Teams using C# or Node.js. The [SDK](/azure/bot-service/bot-service-overview?view=azure-bot-service-4.0&preserve-view=true) extends Bot Builder to: <br> • Use specialized card types like the connector card for Microsoft 365 Groups. <br> • Set Teams-specific channel data on activities. <br> • Process message extension requests. <br> You can develop Teams apps with any web technology and call the [Bot Framework REST APIs](/bot-framework/rest-api/bot-framework-rest-overview) directly, ensuring token handling in all cases. <br> <br> - **Teams Toolkit**: <br> Teams Toolkit makes it simple to start developing bot apps for Teams. You can use a project template for common custom bot app scenarios (LOB app) or start from a sample. <br> For more information, see [tools and SDKs](../concepts/build-and-test/tool-sdk-overview.md). <br> <br> - **Azure AI services**:  <br> Azure AI services offer tools and frameworks for building, deploying, and managing intelligent applications. The Azure AI Foundry tool is crucial for creating and testing custom engine agents to manage and test AI models. <br> For more information, see [Azure AI Foundry](https://ai.azure.com/). |
| 4. | Bot registration service | - Azure AD <br> - Developer Portal |
| 5. | Advanced bot capabilities | - Call and media bot <br> - Access data using MS Graph <br> - SSO <br> - Bot on Mobile |

## Build a bot

Let's start by building a bot. You can use Teams Toolkit, Bot Framework SDK, or Teams AI library. After you build a conventional Teams bot app, you can add the AI layer to your bot.

### Build a conventional Teams bot app

| # | I want to build ... | Here's a sample |
| --- | --- | --- |
| 1. | Conversational bot using Bot Framework SDK | - [Bot app with Node.js](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/nodejs) <br> - [Bot app with C#](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/csharp) <br> - [Bot app with Python](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/python) |
| 2. | Conversational bot using Teams Toolkit | [Create Teams conversation bot](../sbs-teams-conversation-bot.yml) |

### Build an AI-powered Teams bot app

You can build a new custom engine agent or elevate your existing conventional bot to be powered by AI.

| # | I want to build ... | Here's how... |
| --- | --- | --- |
| 1. | Custom engine agent with Teams AI library and Teams Toolkit | [Build a custom engine agent](../Teams-AI-library-tutorial.yml) |
| 2. | Elevate your conventional bot built with Bot framework adapter to use AI | [Elevate your conventional bot to use AI](how-to/teams-conversational-ai/how-conversation-ai-get-started.md#elevate-your-conventional-bot-to-use-ai) |
| 3. | Migrate your bot built with Bot framework to use Teams AI Library | [Migrate your bot to use Teams AI library](how-to/teams-conversational-ai/how-conversation-ai-get-started.md#migrate-your-bot-to-use-teams-ai-library) |

## Next step

> [!div class="nextstepaction"]
> [What is Teams AI library](how-to/teams-conversational-ai/teams-conversation-ai-overview.md)
> [!div class="nextstepaction"]
> [Understand Teams AI library](how-to/teams-conversational-ai/how-conversation-ai-core-capabilities.md)
> [!div class="nextstepaction"]
> [Understand bot concepts](bot-concepts.md)

## See also

* [Understand bot concepts](bot-concepts.md)
* [Send and receive messages](build-conversational-capability.md)
* [Send notifications](build-notification-capability.md)
