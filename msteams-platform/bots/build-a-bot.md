---
title: Let's build a bot
description: Learn to build a basic chatbot using Teams Toolkit, Bot Framework SDK. Additionally, learn to build an AI bot.
ms.localizationpriority: high
ms.date: 09/25/2024
ms.topic: conceptual
ms.author: surbhigupta
---

# Let's build a bot

Building a bot app involves various phases, from initial concept to final deployment. This article gives you a quick overview of your options to get started. It walks you through building a basic bot app and then shows you how to level it up to an AI bot.

## Choose the tools and platforms

If you want to create your own bot, here's a list of tools and platforms to help you get started:

:::image type="content" source="../assets/images/bots/m365-bot-decisions.png" alt-text="Infographics depicts a decision tree for building a bot.":::

| # | Choose ... | From the following options ... |
| --- | --- | --- |
| 1. | Bot capabilities | - AI bot <br> - Non-AI bot: <br> &nbsp;&nbsp; • Conversational capability <br> &nbsp;&nbsp; • Notification capability <br> &nbsp;&nbsp; • Workflow capability <br> &nbsp;&nbsp; • Command capability |
| 2. | Tools and Platforms | - **Teams AI library**: <br> A Teams AI bot uses artificial intelligence (AI) technology to communicate with users in natural language, similar to a human-to-human conversation. These bots can handle a variety of tasks, from answering simple questions to performing complex operations. If you've built your bot app using Bot Framework SDK, you can migrate your bot to use Teams AI library to utilize its advanced AI capabilities. <br> For more information, see [why you should migrate to the Teams AI library](https://github.com/microsoft/teams-ai/tree/main/getting-started/migration). <br> <br> - **Bot Framework SDK**: <br> The [Bot Framework](https://dev.botframework.com/) is a rich SDK used to create bots using C#, Python, and JavaScript. If you already have a bot that is based on the Bot Framework, you can easily modify it to work in Teams. Use either C# or Node.js to take advantage of our [SDKs](/azure/bot-service/bot-service-overview?view=azure-bot-service-4.0&preserve-view=true). These packages extend the basic Bot Builder SDK classes and methods as follows: <br> &nbsp;&nbsp; • Use specialized card types like the connector card for Microsoft 365 Groups. <br> &nbsp;&nbsp; • Set Teams-specific channel data on activities. <br> &nbsp;&nbsp; • Process message extension requests. <br> You can develop Teams apps in any web programming technology and call the [Bot Framework REST APIs](/bot-framework/rest-api/bot-framework-rest-overview) directly. You must perform token handling in all cases. <br> <br> - **Teams Toolkit**: <br> Teams Toolkit makes it simple to get started with bot app development for Teams. You can begin with a project template for common custom bot app built for your org (LOB app) scenarios or start from a sample. <br> For more information, see [tools and SDKs](../concepts/build-and-test/tool-sdk-overview.md). <br> <br> - **Azure AI bot service**:  <br> Azure AI Bot Service is a cloud platform. It hosts bots and makes them available to channels, such as Microsoft Teams, Facebook, or Slack. <br> The Bot Framework Service, which is a component of the Azure AI Bot Service, sends information between the< user's bot-connected app and the bot. Each channel can include additional information in the activities they send. <br> For more information, see [Azure AI bot service](/azure/bot-service/bot-builder-basics). |
| 3. | Bot registration service | - Azure AD <br> - Developer Portal |
| 4. | Advanced bot capabilities | - Call and media bot <br> - Access data using MS Graph <br> - SSO <br> - Bot on Mobile |

## Build a bot

Let's start by building a conversational bot. You can use Teams Toolkit, Bot Framework SDK, or Teams AI library. After you build a conventional Teams bot app, you can add the AI layer to your bot.

### Build a conventional Teams bot app

| # | I want to build ... | Here's a sample |
| --- | --- | --- |
| 1. | Conversational bot with Bot Framework SDK | - [Bot app with Node.js](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/nodejs) <br> - [Bot app with C#](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/csharp) <br> - [Bot app with Python](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/python) |
| 2. | Conversational bot with Teams Toolkit | [Create Teams conversation bot](../sbs-teams-conversation-bot.yml) |

### Build an AI-powered Teams bot app

You can build an AI bot or elevate your existing conventional bot to be powered by AI.

| # | I want to build ... | Here's a sample |
| --- | --- | --- |
| 1. | AI bot with Teams AI library and Teams Toolkit | [Build a custom engine agent](../Teams-AI-library-tutorial.yml) |
| 2. | Migrate bot to use Teams AI library | [Migrate to the Teams AI library](https://github.com/microsoft/teams-ai/tree/main/getting-started/migration) |

## Next step

* [What is Teams AI library](how-to/teams-conversational-ai/teams-conversation-ai-overview.md)
* [Understand AI bot concepts](how-to/teams-conversational-ai/how-conversation-ai-core-capabilities.md)
* [Understand bot concepts](bot-concepts.md)

## See also

* [Understand bot concepts](bot-concepts.md)
* [Send and receive messages](build-conversational-capability.md)
* [Send notifications](build-notification-capability.md)
