---
title: Bots and SDKs
author: clearab
description: Bots and SDKs in Microsoft Teams.
ms.topic: overview
ms.author: anclear
---

# Bots and SDKs

To create a bot that works in Microsoft Teams, you can use one of the following:
* An existing bot built on the Microsoft Bot Framework SDK
* Power Virtual Agents chatbot service
* Webhooks and connectors

## Bots and the Microsoft Bot Framework

Your Teams bot consists of the following three elements:

* A publicly accessible web service that you host.
* Your bot registration with the Bot Framework.
* Your Teams app package with your app manifest. This is what your users install and connect the Teams client to your web service, routed through the bot service.

The [Bot Framework](https://dev.botframework.com/) is a rich SDK used to create bots using C#, Java, Python, and JavaScript. If you already have a bot that is based on the Bot Framework, you can easily modify it to work in Microsoft Teams. Use either C# or Node.js to take advantage of our [SDKs](/microsoftteams/platform/#pivot=sdk-tools). These packages extend the basic Bot Builder SDK classes and methods as follows:

* Use specialized card types like the Office 365 connector card.
* Set Teams-specific channel data on activities.
* Process messaging extension requests.

> [!IMPORTANT]
> You can develop Teams apps in any web programming technology and call the [Bot Framework REST APIs](/bot-framework/rest-api/bot-framework-rest-overview) directly. But you must perform token handling in all cases.

> [!TIP]
> Teams App Studio helps you create and configure your app manifest, and register your web service as a bot on the Bot Framework. It also contains a React control library and an interactive card builder. For more information, see [getting started with Teams App Studio](~/concepts/build-and-test/app-studio-overview.md).

## Bots and the Microsoft Power Virtual Agents

[Power Virtual Agents](/power-virtual-agents/fundamentals-what-is-power-virtual-agents) is a chatbot service built on the Microsoft Power platform and Bot Framework. The Power Virtual Agent development process uses a guided, no-code, and graphical interface approach that empowers your team members to easily create and maintain an intelligent virtual agent. After creating your chatbot in the [Power Virtual Agents portal](https://powervirtualagents.microsoft.com), you can easily [integrate it with Teams](how-to/add-power-virtual-agents-bot-to-teams.md). To get started, see [Power Virtual Agents documentation](https://docs.microsoft.com/power-virtual-agents/).

## Bots and webhooks and connectors

Webhooks and connectors connect your bot to your web services. Using webhooks and connectors, you can create a simple bot for basic interaction, such as creating a workflow or other simple commands. They are available only in the team where you create them and are intended for simple processes specific to your company's workflow. For more information, see [what are webhooks and connectors?](~/webhooks-and-connectors/what-are-webhooks-and-connectors.md).

## Advantages of bots

Bots in Microsoft Teams can be part of a one-to-one conversation, a group chat, or a channel in a team. Each scope provides unique opportunities and challenges for your conversational bot.

| In a channel | In a group chat | In a one-to-one chat |
| :-- | :-- | :-- |
| Massive reach | Fewer members | Traditional way |
| Concise individual interactions | @mention to bot  | Q&A bots |
| @mention to bot | Similar to channel | Bots that tell jokes and take notes |

### In a channel

Channels contain threaded conversations between multiple people even up to two thousand. This potentially gives your bot massive reach, but individual interactions must be concise. Traditional multi-turn interactions do not work. Instead, you must look to use interactive cards or task modules, or move the conversation to a one-to-one conversation to collect lots of information. Your bot only has access to messages where it is `@mentioned`. You can retrieve additional messages from the conversation using Microsoft Graph and organization-level permissions.

Bots work better in a channel in the following cases:

* Notifications, where you provide an interactive card for users to take additional information.
* Feedback scenarios, such as polls and surveys.
* Single request or response cycle resolves interactions and the results are useful for multiple members of the conversation.
* Social or fun bots, where you get an awesome cat image, randomly pick a winner, and so on.

### In a group chat

Group chats are non-threaded conversations between three or more people. They tend to have fewer members than a channel and are more transient. Similar to a channel, your bot only has access to messages where it is `@mentioned` directly.

In the cases where bots work better in a channel also work better in a group chat.

### In a one-to-one chat

One-to-one chat is a traditional way for a conversational bot to interact with a user. A few examples of one-to-one conversational bots are Q&A bots, bots that initiate workflows in other systems, bots that tell jokes, and bots that take notes. Before creating one-to-one chatbots, consider whether a conversation-based interface is the best way to present your functionality.

## Disadvantages of bots

An extensive dialog between your bot and the user is a slow and complex way to get a task completed. A bot that supports excessive commands, especially a broad range of commands, is not successful or viewed positively by users.

### Have multi-turn experiences in chat

An extensive dialog requires the developer to maintain state. To exit this state a user must either time-out or enter **Cancel**. Also, the process is tedious. For example, see the following conversation scenario:

USER: Schedule a meeting with Megan.

BOT: I’ve found 200 results, please include a first and last name.

USER: Schedule a meeting with Megan Bowen.

BOT: OK, what time would you like to meet with Megan Bowen?

USER: 1:00 pm.

BOT: On which day?

### Support too many commands

Since there are only six visible commands in the current bot menu, anything more is unlikely to be used with any frequency. Bots that go deep into a specific area rather than trying to be a broad assistant work and fare better.

### Maintain a large knowledge base

One of the disadvantages of bots is that it is difficult to maintain a large retrieval knowledge base with unranked responses. Bots are best suited for short, quick interactions, and not sifting through long lists looking for an answer.

## Get started with bot samples

The following are some bot samples created using the Bot Framework:

|Sample name | Description | .NETCore | Node.js |
|----------------|-----------------|--------------|----------------|
| Teams conversation bot | Messaging and conversation event handling. |[View](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/csharp_dotnetcore/57.teams-conversation-bot)|[View](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/javascript_nodejs/57.teams-conversation-bot)|

## Next step

> [!div class="nextstepaction"]
> [Bot activity handlers](~/bots/bot-basics.md)
