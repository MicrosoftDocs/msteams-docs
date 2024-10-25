---
title: Overview to bots
description: Learn about bots, the application of bots across industry, build familiarity with bots in Teams environment and bot development SDKs and libraries. It offers a map through the module to help you navigate through various tasks for building a bot.
ms.localizationpriority: high
ms.date: 09/20/2024
ms.topic: conceptual
ms.author: surbhigupta
---

# Bot overview

A bot is a software application that performs automated tasks by interacting with systems or users. From simple automation tool to sophisticated artificial intelligency (AI) powered apps, bots have transformed the way users interact with technology, streamlining tasks, and enhancing efficiency.

You can leverage bot capabilities such as chatbots, virtual assistants, workflow, and have diverse applications across industries such as, healthcare, customer service, education, finance, and more. Bots bring efficiency in automation, scalability, continual availability, and with AI bots you can offer tailored experiences for the users.

Microsoft 365 Copilot and Teams offer a platform for developers to take their AI bots to the next level - transforming them into custom engine agents. You can make your bot accessible across various systems. This means your bot can help users make informed decisions, automate tasks, and generate valuable information seamlessly.

## What are the benefits of a bot?

Bots can save you time and effort by handling tasks that would otherwise take up your time. They can work 24/7 without getting tired, and they can handle multiple tasks at once. Bots transform how developers engage with users, streamline tasks, and boost efficiency. As a developer, you'll craft interactive and intelligent solutions to enhance user experiences.

The bot app users access and use your bot app within Teams.

:::image type="content" source="../assets/images/bots/chat-bot-ux.gif" alt-text="Graphical representation shows the user experience in a chat bot.":::

Bot apps offer a range of business advantages:

1. Automation: Bots can handle repetitive tasks, saving you time and effort.
1. Availability: Bots can work round-the-clock without needing breaks.
1. Efficiency: They can manage multiple tasks simultaneously, improving overall efficiency.
1. Customer Engagement: Bots can interact with customers and provide instant responses and support.
1. Scalability: As user needs grow, bots can be easily scaled to handle more tasks or interactions.

In short, bots can make your life easier by automating tasks, providing constant support, and enhancing customer engagement. Bots are here to make your life easier by automating tasks and providing assistance whenever you need it.

## How do bots work?

Bots work by following a set of rules or using AI to understand and respond to your requests. When you send a message to a bot, it processes your input, figures out what you need, and then gives you a response or performs an action. Bots transform how developers engage with users, streamline tasks, and boost efficiency. As a developer, you'll craft interactive and intelligent solutions to enhance user experiences.

This article guides you through the developer journey, showcasing how a bot interacts with users or systems, and explaining bot concepts. In addition, you'll explore the capabilities you'll integrate into your bot application.

### Bots - the developer experience

Let's consider an example: As a developer, you must build a bot to automate repetitive tasks to enhance efficiency and user engagement. The following image shows how a developer can build a bot app to meet the user requirements:

:::image type="content" source="../assets/images/bots/chatbot-dev-ux.png" alt-text="Image shows developer experience for a chatbot.":::

### Explore bot capabilities

You can choose one or more of the following capabilities for your bot app. Use either Bot Framework SDK or Teams Toolkit to build these capabilities in your bot.

* **AI bot**:
  An AI bot uses artificial intelligence to perform the tasks it is automated to do. It understands natural language and can engage in conversation and answer questions. You can use it for virtual assistance, language translation, predictive analysis, and more. You can build the following types of bots:

  * Teams AI bot: Teams AI bot is integrated within Microsoft Teams and utlilizes Microsoft Teams AI library and Natural Language Processing (NLP).
  * Custom engine agent for Microsoft 365 Copilot: This is a custom engine copilot is an AI-powered bot. It is build using custom AI models. You can integrate a custom engine copilot for Microsoft 365 Copilot with various systems.

  For more information, see [build a custom engine agent to chat with your data using Teams AI library and Teams Toolkit](../Teams-AI-library-tutorial.yml).

* **Conversational bot**:
  A conversational bot is a chat bot that can simulate conversation with users, who can use it to interact with a web service. The conversation is made possible through text, interactive cards, and dialogs. This bot can understand user inputs and respond accordingly. You can use it to help users with virtual assistance, customer service, and more.

  For more information, see [create Teams conversation bot](../sbs-teams-conversation-bot.yml).

* **Notification bot**:
  A notification bot is an automated bot that sends notifications to users in a Teams channel, group chat, or personal chat. You can use notification bots for user scenarios such as, sending reminders or alerts, or sharing news or updates. Users can also interact with interactive notification bots by responding to options or links within the notification or even sharing input or feedback.

  For more information, see [build notification bot with JavaScript](../sbs-gs-notificationbot.yml).

* **Workflow bot**:
  You use a workflow bot to automate or streamline business processes. This bot can interact with users, applications, and data to progress tasks and workflows. You can use workflow bots to automate repetitive tasks, assign tasks to team members, track progress, and more. They're used to bring efficiency through automation and reduction of manual effort.

  For more information, see [build command bot with JavaScript](../sbs-gs-commandbot.yml).

## How can I learn more?

You may be just delving into bot apps or bringing your existing bots up to supporting AI, this article provides an overview of bots and covers building, configuring, and customizing bots.

Let's begin to learn, automate, and innovate with bots.

| If you want to... | Here's your path |
| --- | --- |
| Begin building a bot |   [Basic bot concepts, scopes] <br> [Build a basic bot: TTK and Bot SDK] <br> Bring your existing bot to Teams <br> [Build basic AI bot - QS SBS guide] |
| Build an AI bot | [What is Teams AI library](how-to/teams-conversational-ai/teams-conversation-ai-overview.md) > [Teams AI library quick start guide](how-to/teams-conversational-ai/conversation-ai-quick-start.md) > <br> [Build basic AI bot (custom engine agent)] <br> [Get started] <br> [Bot logic for an AI bot] <br> [Copilot handoff] |
| Build a non-AI bot | [Introduction to activity handler, events] <br> [Bot logic] <br> [Manifest configuration] <br> [SBS guides for TTK apps or TTK sample apps + Code samples for Bot SDK for interactive messages, send and receive files, fetching team or chat members, rate limiting, etc.] |
| Explore advanced bot capabilities | [SSO] <br> [Access data with MS Graph] <br> [Bot on Mobile] <br> [Build call and media bots] |

## Next step

[Let's build a bot](build-a-bot.md)

## See also
