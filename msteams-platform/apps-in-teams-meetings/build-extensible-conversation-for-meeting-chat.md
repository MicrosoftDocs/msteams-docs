---
title: Build extensible conversation for meeting chat
author: v-sdhakshina
description: In this article, learn how to build extensible conversation for Microsoft Teams meeting chat with bots, cards and message extensions.
ms.topic: conceptual
ms.author: v-sdhakshina
ms.localizationpriority: medium
---

# Build extensible conversation for meeting chat

App developers can make conversational extensible in Teams meetings. Bots, message extensions, cards and task modules can be combined to deliver an intuitive experience.

## Bots

A bot is also referred to as a chatbot or conversational bot. It is an app that runs simple and repetitive tasks by users such as customer service or support staff. Everyday use of bots include, bots that provide information about the weather, make dinner reservations, or provide travel information. Interactions with bots can be quick questions and answers or complex conversations.  Bots that are enabled in group chat scope start functioning in meetings. To implement bots, start with [Build a bot](/microsoftteams/platform//sbs-gs-javascript?tabs=vscode%2Cvsc%2Cviscode).

### Bot APIs

The [Bot Framework](https://dev.botframework.com/) is a rich SDK used to create bots using C#, Java, Python, and JavaScript. If you already have a bot that is based on the Bot Framework, you can easily modify it to work in Teams. Use either C# or Node.js to take advantage of our [SDKs](/microsoftteams/platform/).

### Code sample

## Message extensions

Message extensions allow the users to interact with your web service through buttons and forms in the Microsoft Teams client. They can search or initiate actions in an external system from the compose message area, the command box, or directly from a message. You can send back the results of that interaction to the Teams client in the form of a richly formatted card.  Implementing message extensions for meeting chats is no different than regular chats. To implement message extension, start with [Message extensions](/microsoftteams/platform/messaging-extensions/what-are-messaging-extensions?tabs=dotnet).

## Cards and Task modules

Cards provide users with various visual, audio, and selectable messages and help in conversation flow. With task modules, you can create modal pop-up experiences in Microsoft Teams. They're useful for starting and completing the tasks, or displaying rich information like videos or Power business intelligence (BI) dashboards. For more information, see [building cards and task modules](/microsoftteams/platform/task-modules-and-cards/cards-and-task-modules).
