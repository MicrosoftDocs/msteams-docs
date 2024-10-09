---
title: Let's build a bot
description: Learn to build a basic chatbot using Teams Toolkit, Bot Framework SDK. Additionally, learn to build an AI bot.
ms.localizationpriority: high
ms.date: 09/25/2024
ms.topic: conceptual
ms.author: surbhigupta
---

# Let's build a bot

Building a bot app involves various phases, from initial concept to final deployment. This article offers a detailed guide to help you get started.

<!--1. Plan your bot app: Start by defining your app's goal and purpose to align with your target audience. Also, decide on the platforms you will use, such as messaging or voice.
1. Choose the tools and SDKs: Select the tools and software development kits that you will use to build your app.
1. Design the intents and entities: Create dialog flows and plan for various use cases and potential errors.
1. Develop the bot app: Set up the bot builder, integrate APIs, build a user-friendly interface, and develop the necessary capabilities and automation. Ensure your bot integrates with any external services required to fulfil its purpose.
1. Test, optimize, and deploy: Thoroughly test your bot app, make necessary optimizations, and then deploy it.-->

## How can I build a bot for Teams?

[**WIP**: Graphic representation of tools and SDKs available for building bots and helping the developer make informed decisions]

If you want to create your own bot, here's a list of tools and platforms to help you get started:

:::image type="content" source="../assets/images/bots/m365-bot-decisions.png" alt-text="Infographics depicts a decision tree for building a bot.":::

| # | Choose ... | From the following options ... |
| --- | --- | --- |
| 1. | Bot capabilities | - AI bot <br> - Non-AI bot: <br> &nbsp;&nbsp; • Conversational capability <br> &nbsp;&nbsp; • Notification capability <br> &nbsp;&nbsp; • Workflow capability <br> &nbsp;&nbsp; • Command capability |
| 2. | Tools and Platforms | - **Teams AI library**: <br> A Teams AI bot uses artificial intelligence (AI) technology to communicate with users in natural language, similar to a human-to-human conversation. These bots can handle a variety of tasks, from answering simple questions to performing complex operations. If you've built your bot app using Bot Framework SDK, you can migrate your bot to use Teams AI library to utilize its advanced AI capabilities. <br> For more information, see [why you should migrate to the Teams AI library](https://github.com/microsoft/teams-ai/tree/main/getting-started/migration). <br> <br> - **Bot Framework SDK**: <br> The [Bot Framework](https://dev.botframework.com/) is a rich SDK used to create bots using C#, Python, and JavaScript. If you already have a bot that is based on the Bot Framework, you can easily modify it to work in Teams. Use either C# or Node.js to take advantage of our [SDKs](/azure/bot-service/bot-service-overview?view=azure-bot-service-4.0&preserve-view=true). These packages extend the basic Bot Builder SDK classes and methods as follows: <br> &nbsp;&nbsp; • Use specialized card types like the connector card for Microsoft 365 Groups. <br> &nbsp;&nbsp; • Set Teams-specific channel data on activities. <br> &nbsp;&nbsp; • Process message extension requests. <br> You can develop Teams apps in any web programming technology and call the [Bot Framework REST APIs](/bot-framework/rest-api/bot-framework-rest-overview) directly. You must perform token handling in all cases. <br> <br> - **Teams Toolkit**: <br> Teams Toolkit makes it simple to get started with bot app development for Teams. You can begin with a project template for common custom bot app built for your org (LOB app) scenarios or start from a sample. <br> For more information, see [tools and SDKs](../concepts/build-and-test/tool-sdk-overview.md). <br> <br> - **Azure AI bot service**:  <br> Azure AI Bot Service is a cloud platform. It hosts bots and makes them available to channels, such as Microsoft Teams, Facebook, or Slack. <br> The Bot Framework Service, which is a component of the Azure AI Bot Service, sends information between the< user's bot-connected app and the bot. Each channel can include additional information in the activities they send. <br> For more information, see [Azure AI bot service](/azure/bot-service/bot-builder-basics). |
| 3. | Bot registrative service | - Azure AD <br> - Developer Portal |
| 4. | Advanced bot capabilities | - Call and media bot <br> - Access data using MS Graph <br> - SSO <br> - Bot on Mobile |

<!--
1. Choose your bot core capabilties (conversational, workflow, command, AI)
1. Use any one of the following ways to build a bot for Teams:

    * **Teams AI library**:
      A Teams AI bot uses artificial intelligence (AI) technology to communicate with users in natural language, similar to a human-to-human conversation. These bots can handle a variety of tasks, from answering simple questions to performing complex operations.

      Teams AI bots are built using the Bot Framework SDK and can leverage the Teams AI library to streamline the process of building intelligent apps. The Teams AI library provides APIs to access and manipulate data, and controls and components to create custom user interfaces.

      If you've built your bot app using Bot Framework SDK, you can migrate your bot to use Teams AI library to utilize its advanced AI capabilities. For more information, see [Why you should migrate to the Teams AI library](https://github.com/microsoft/teams-ai/tree/main/getting-started/migration).

    * **Bot Framework SDK**:
      The [Bot Framework](https://dev.botframework.com/) is a rich SDK used to create bots using C#, Python, and JavaScript. If you already have a bot that is based on the Bot Framework, you can easily modify it to work in Teams. Use either C# or Node.js to take advantage of our [SDKs](/azure/bot-service/bot-service-overview?view=azure-bot-service-4.0&preserve-view=true). These packages extend the basic Bot Builder SDK classes and methods as follows:

        * Use specialized card types like the connector card for Microsoft 365 Groups.
        * Set Teams-specific channel data on activities.
        * Process message extension requests.

      You can develop Teams apps in any web programming technology and call the [Bot Framework REST APIs](/bot-framework/rest-api/bot-framework-rest-overview) directly. You must perform token handling in all cases.

    * **Teams Toolkit**:
      Teams Toolkit makes it simple to get started with bot app development for Teams. You can begin with a project template for common custom bot app built for your org (LOB app) scenarios or start from a sample.

      For more information, see [tools and SDKs](../concepts/build-and-test/tool-sdk-overview.md).

      <!--TeamsFx helps to reduce your tasks by using Microsoft Teams single sign-on (SSO) and accessing cloud resources down to single line statements with zero configuration. You can use TeamsFx SDK in the browser and Node.js environments. TeamsFx core functionalities can be accessed in client and server environments.

      For more information, see [TeamsFx SDK](../toolkit/TeamsFx-SDK.md)--

    * **Azure AI bot service**:
      Azure AI Bot Service is a cloud platform. It hosts bots and makes them available to channels, such as Microsoft Teams, Facebook, or Slack.

      The Bot Framework Service, which is a component of the Azure AI Bot Service, sends information between the user's bot-connected app and the bot. Each channel can include additional information in the activities they send.

      For more information, see [Azure AI bot service](/azure/bot-service/bot-builder-basics).

1. Register your bot with Teams in any one of the following ways:

    * Azure AD
    * Developer Portal

1. Explore advanced bot capabilities (Call and media bot, access data using MS Graph, and more)
-->

## Build a bot

[**TBD** - example app: to be seen if this example can be used through the module as an example of bot app to which capabilities may be added.]

<!--Here's an example of a bot app:

Contoso TravelBuddy: This bot can be deployed on Teams and offers features such as booking flights, hotels, and car rentals. It can assist in searching for travel destinations, provide weather updates, offer travel recommendations, and track the status of flights or trains.

The primary goals and purposes of this bot include offering convenience and saving time in making travel plans, personalizing recommendations, providing real-time updates, and ensuring a secure payment process.

To achieve these functionalities, you would need to integrate the bot app with APIs for flight booking, hotel booking, rental booking, weather forecasts, and payment gateways.-->

Let's start by building a conversational bot. You can use Teams Toolkit, Bot Framework SDK, or Teams AI library.

| # | I want to build ... | Here's a sample |
| --- | --- | --- |
| 1. | AI bot with Teams AI library and Teams Toolkit | [Build a custom engine agent](../Teams-AI-library-tutorial.yml) |
| 2. | Non-AI bot with Bot Framework SDK | - [Bot app with Node.js](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/nodejs) <br> - [Bot app with C#](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/csharp) <br> - [Bot app with Python](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/python) |
| 3. | Non-AI bot with Teams Toolkit | [Create Teams conversation bot](../sbs-teams-conversation-bot.yml) |

<!--
* To use Teams Toolkit to build conversational bot, see [create Teams conversation bot](../sbs-teams-conversation-bot.yml).
* To use Bot Framework SDK V4, see one of the following code samples:

  * [Bot app with Node.js](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/nodejs)
  * [Bot app with C#](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/csharp)
  * [Bot app with Python](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/python)

* To build an AI bot, see [build a custom engine agent](../Teams-AI-library-tutorial.yml).-->

## Next step

- [What is Teams AI library](how-to/teams-conversational-ai/teams-conversation-ai-overview.md)
- [Understand AI bot concepts](how-to/teams-conversational-ai/how-conversation-ai-core-capabilities.md)
- [Understand bot concepts](bot-concepts.md)

## See also
