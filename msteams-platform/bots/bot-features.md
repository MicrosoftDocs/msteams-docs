---
title: Bots and SDKs
author: surbhigupta
description: Overview of the tools and SDKs for building Microsoft Teams bots.
ms.topic: overview
ms.localizationpriority: medium
ms.author: anclear
---

# Bots and SDKs

A functional bot can be created in Microsoft Teams with one of the following tools or capabilities:

* [Microsoft Bot Framework SDK](#bots-with-the-microsoft-bot-framework)
* [Power Virtual Agents](#bots-with-power-virtual-agents)
* [Virtual Assistant](~/samples/virtual-assistant.md)
* [Webhooks and connectors](#bots-with-webhooks-and-connectors)

## Bots with the Microsoft Bot Framework

Your Teams bot consists of the following:

* A publicly accessible web service hosted by you.
* A Bot Framework registration for your web service.
* Your Teams app package, which connects the Teams client to your web service.

> [!TIP]
> Register your web service with the bot frame work through Developer portal to specify your app configurations. For more information, see [manage your apps with the Developer Portal for Teams](~/concepts/build-and-test/teams-developer-portal.md).

The [Bot Framework](https://dev.botframework.com/) is a rich SDK used to create bots using C#, Java, Python, and JavaScript. If you already have a bot that is based on the Bot Framework, you can easily modify it to work in Teams. Use either C# or Node.js to take advantage of our [SDKs](/microsoftteams/platform/#pivot=sdk-tools). These packages extend the basic Bot Builder SDK classes and methods as follows:

* Use specialized card types like the Office 365 connector card.
* Set Teams-specific channel data on activities.
* Process messaging extension requests.

> [!IMPORTANT]
>Teams apps can be developed by using any web programming technology and call the [Bot Framework REST APIs](/bot-framework/rest-api/bot-framework-rest-overview) directly. Token handling is a must in all cases.

## Bots with Power Virtual Agents

[Power Virtual Agents](/power-virtual-agents/fundamentals-what-is-power-virtual-agents) is a chatbot service built on the Microsoft Power platform and Bot Framework. The Power Virtual Agent development process uses a guided, no-code, and graphical interface approach that empowers your team members to easily create and maintain an intelligent virtual agent. After creating your chatbot in the [Power Virtual Agents portal](https://powervirtualagents.microsoft.com), you can easily [integrate it with Teams](how-to/add-power-virtual-agents-bot-to-teams.md). For more information on getting started, see [Power Virtual Agents documentation](/power-virtual-agents).

## Bots with webhooks and connectors

Webhooks and connectors connect bot to your web services and a simple bot for basic interaction can be created such as creating a workflow or other simple commands. They’re available in teams that you form and are designed for simple processes that are unique to your company’s workflow. For more information, see what are webhooks and connectors. For more information, see [what are webhooks and connectors](~/webhooks-and-connectors/what-are-webhooks-and-connectors.md).

## Advantages of bots

Bots in Microsoft teams can be used in one-to-one conversation, group chats and team channels. Each scope provides your conversational bot unique opportunities and challenges.

| In a channel | In a group chat | In a one-to-one chat |
| :-- | :-- | :-- |
| Massive reach | Fewer members | Traditional way |
| Concise individual interactions | @mention to bot  | Q&A bots |
| @mention to bot | Similar to channel | Bots that tell jokes and take notes |

### In a channel

Threaded conversation between numerous people, upto two thousand, can be found in channels. This has the ability to broaden your bot’s reach, but individual interactions must be brief. Multi-turn interactions in the traditional sense do not work. Instead, you should consider using interactive cards or task modules, or moving the conversation to a one-to-one setting to collect a large amount of data. Your bot can only see messages in which is `@mentioned`. Using Microsoft graph and organization-level permissions, you can obtain additional messages from the conversation.

Bots work better in a channel in the following cases:

* Notifications, where you provide an interactive card for users to take additional information.
* Feedback scenarios, such as polls and surveys.
* Single request or response cycle resolves interactions and the results are useful for multiple members of the conversation.
* Social or fun bots, where you get an awesome cat image, randomly pick a winner, and so on.

### In a group chat

Group chats are non-threaded conversations between three or more people. They have smaller number of members than a channel and are transparent. Similar to a channel, your bot only can see messages where it is `@mentioned`.

Bots work better in a channel and group chat.

### In a one-to-one chat

One-to-one chat is a traditional way for a conversational bot to interact with a user. A few examples of one-to-one conversational bots are:
* Q&A bots
* bots that initiate workflows in other systems 
* bots that tell jokes
* bots that take notes
Before creating one-to-one chatbots, consider whether a conversation-based interface is the best way to present your functionality.

## Disadvantages of bots

An extensive conversation between your bot and the user is time consuming and difficult way to execute a task. A bot that supports a large number of commands, especially a broad range of commands, will not be successful or viewed positively by users.

### Have multi-turn experiences in chat

An extensive dialog requires the developer to maintain state. To exit this state a user must either time-out or select **Cancel**. Also, the process is tedious. For example, see the following conversation scenario:

USER: Schedule a meeting with Megan.

BOT: I’ve found 200 results, please include a first and last name.

USER: Schedule a meeting with Megan Bowen.

BOT: OK, what time would you like to meet with Megan Bowen?

USER: 1:00 pm.

BOT: On which day?

### Support too many commands

As there are only six visible commands in the current bot menu, anything more is unlikely to be used with any frequency. Bots that go deep into a specific area rather than trying to be a broad assistant work and fare better.

### Maintain a large knowledge base

One of the disadvantages of bots is, maintaining a big retrieval knowledge base with unranked responses is challenging. Bots work best in short and quick interactions rather than searching through extensive lists in search of a solution.

## Code sample

|Sample name | Description | .NETCore | Node.js |
|----------------|-----------------|--------------|----------------|
| Teams conversation bot | Messaging and conversation event handling. |[View](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/csharp_dotnetcore/57.teams-conversation-bot)|[View](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/javascript_nodejs/57.teams-conversation-bot)|

## Next step

> [!div class="nextstepaction"]
> [Bot activity handlers](~/bots/bot-basics.md)

## See also

* [Calls and meetings bots](~/bots/calls-and-meetings/calls-meetings-bots-overview.md)
* [Bot conversations](~/bots/how-to/conversations/conversation-basics.md)
* [Bot command menus](~/bots/how-to/create-a-bot-commands-menu.md)
* [Authentication flow for bots in Microsoft Teams](~/bots/how-to/authentication/auth-flow-bot.md)
* [Use task modules from bots](~/task-modules-and-cards/task-modules/task-modules-bots.md)
