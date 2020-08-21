---
title: What are bots?
author: clearab
description: An overview of bots in Microsoft Teams.
ms.topic: overview
ms.author: anclear
---
# What are bots?

Bots allow users to interact with your web service through text, interactive cards, and task modules. They're incredibly flexible — you can scope bots to handle a few simple commands or virtual assistants powered by artificial intelligence and natural language processing. They can be one aspect of a larger application or completely standalone.

Finding the right mix of cards, text, and task modules is key to creating a useful bot. Don't forget, bots are much more than just text!

![FAQ Plus gif](~/assets/images/FAQPlusEndUser.gif)

## User scenarios

Bots in Microsoft Teams can be part of a channel, group chat, or one-on-one chat. Each scope will provide unique opportunities, and challenges, for your conversational bot.

### In a channel

Channels contain threaded conversations between multiple people — potentially lots of people (currently, up to two thousand). This potentially gives your bot massive reach, but individual interactions need to be concise. Traditional multi-turn interactions probably won't work well. Instead, look to use interactive cards or task modules, or potentially move the conversation to a one-to-one conversation if you need to collect lots of information. Your bot will also only have access to messages where it's `@mentioned` directly, although you can retrieve additional messages from the conversation using Microsoft Graph and elevated organization-level permissions.

Some scenarios where bots excel in a channel include:

* **Notifications**, particularly if you provide an interactive card for users to take additional information.
* **Feedback scenarios** like polls and surveys.
* Interactions that can be resolved in a **single request/response cycle**, where the results are useful for multiple members of the conversation.
* **Social/fun bots** — get an awesome cat image, randomly pick a winner, etc.

### In a group chat

Group chats are non-threaded conversations between three or more people. They tend to have fewer members than a channel, and are more transient. Similar to a channel, your bot will only have access to messages where it's `@mentioned` directly.

Scenarios that work well in a channel will usually work just as well in a group chat.

### In a one-on-one chat

This is the traditional way for a conversational bot to interact with a user. They can enable incredibly diverse workloads. Q&A bots, bots that initiate workflows in other systems, bots that tell jokes, and bots that take notes are just a few examples. Just remember to consider whether a conversation-based interface is the best way to present your functionality.

## Building a Teams bot with the Microsoft Bot Framework

The [Microsoft Bot Framework](https://dev.botframework.com/) is a rich SDK for building bots using C#, Java, Python, or JavaScript. If you already have a bot that's based on the Bot Framework, you can easily adapt it to work in Microsoft Teams. We recommend you use either C# or Node.js to take advantage of our [SDKs](/microsoftteams/platform/#pivot=sdk-tools). These packages extend the basic Bot Builder SDK classes and methods as follows:

* Use specialized card types like the Office 365 Connector card.
* Consume and set Teams-specific channel data on activities.
* Process messaging extension requests.

> [!IMPORTANT]
> You can develop Teams apps in any web programming technology and call the [Bot Framework REST APIs](/bot-framework/rest-api/bot-framework-rest-overview) directly, but you must perform all token handling yourself.

Your Teams bot consists of three elements:

* A publicly accessible web service that you host.
* Your bot registration with the Bot Framework.
* Your Teams app package with your app manifest. This is what your users will install and connects the Teams client to your web service, routed through the Bot Service.

> [!TIP]
> Teams App Studio* helps you create and configure your app manifest and can register your web service as a bot on the Bot Framework. It also contains a React control library and an interactive card builder. *See* [Getting started with Teams App Studio](~/concepts/build-and-test/app-studio-overview.md).

## Building a Teams bot with Microsoft Power Virtual Agents

[Power Virtual Agents](/power-virtual-agents/fundamentals-what-is-power-virtual-agents) is a service built on the Microsoft Power platform and Bot Framework. The Power Virtual Agent development process uses a guided, no-code, graphical interface approach to empower every member of your team to easily create and maintain an intelligent virtual agent. Once you have completed creating your chatbot in the [Power Virtual Agents portal](https://powervirtualagents.microsoft.com), you can easily [integrate your Power Virtual Agents chatbot with Teams](../../bots/how-to/add-power-virtual-agents-bot-to-teams.md). To get started creating your Power Virtual Agents chatbot, *see* the [Power Virtual Agents documentation](https://docs.microsoft.com/power-virtual-agents/).

## Connectors and bots

Connectors allow you to create a simple bot for basic interaction, like kicking off a workflow or other simple commands. They live only in the team in which you create them and are intended for simple processes specific to your company's workflow. *See* [What are webhooks and connectors?](~/webhooks-and-connectors/what-are-webhooks-and-connectors.md) for more information.

## Bot fails

### Having multi-turn experiences in chat

An extensive dialog between your bot and the user is a slow and overly complex way to get a task completed and it also requires the developer to maintain state. To exit this state a user must either time-out or type “*Cancel*”. Above all, the process is unnecessarily tedious:

USER: Schedule a meeting with Megan.

BOT: I’ve found 200 results, please include a first and last name.

USER: Schedule a meeting with Megan Bowen.

BOT: OK, what time would you like to meet with Megan Bowen?

USER: 1:00 pm.

BOT: On which day?

### Supporting too many commands

A bot that supports excessive commands, especially a broad range of commands, will not be successful or viewed positively by users. Since there are only 6 visible commands in the current bot menu, anything more is unlikely to be used with any frequency. Bots that go deep into a specific area rather than trying to be a broad assistant will work and fare better.

### Maintaining a large retrieval knowledge base with unranked responses

Bots are best suited for short, quick interactions, not sifting through long lists looking for an answer.

## Get started

* [Teams conversation bot in C#/dotnet](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/csharp_dotnetcore/57.teams-conversation-bot)
* [Teams conversation bot in JavaScript](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/javascript_nodejs/57.teams-conversation-bot)

## Learn more

* [The basics of bots in Teams](~/bots/bot-basics.md)
* [Create a bot for Teams](~/bots/how-to/create-a-bot-for-teams.md)
* [Planning your app](../../concepts/extensibility-points.md)
* [Designing your app]../(../designing-your-app/designing-overview.md)
* [Building your app](../../concepts/building-an-app.md)
* [Publishing your app](../../concepts/deploy-and-publish/overview.md)
