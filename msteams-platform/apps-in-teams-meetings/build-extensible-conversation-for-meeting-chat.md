---
title: Build extensible conversation for meeting chat
author: v-sdhakshina
description: In this article, learn how to build extensible conversation for Microsoft Teams meeting chat with bots, cards and message extensions.
ms.topic: conceptual
ms.author: v-sdhakshina
ms.localizationpriority: medium
---

# Build extensible conversation for meeting chat

You can make conversations extensible in Microsoft Teams meetings. Bots, message extensions, cards, and task modules can be combined to deliver an intuitive experience.

## Bots

A bot is also referred to as a chatbot or conversational bot. It's an app that runs simple and repetitive tasks by users such as customer service or support staff. Everyday use of bots include, bots that provide information about the weather, make dinner reservations, or provide travel information. Interactions with bots can be quick questions and answers or complex conversations. A bot needs to be enabled in the `team` scope for a channel meeting and the `groupchat` scope for all other meeting types. To implement bots, start with [build a bot](/microsoftteams/platform//sbs-gs-javascript?tabs=vscode%2Cvsc%2Cviscode).

### Bot APIs

The [Bot Framework](https://dev.botframework.com/) is a rich SDK used to create bots using C#, Java, Python, and JavaScript. If you already have a bot that is based on the Bot Framework, you can easily modify it to work in Teams. Use either C# or Node.js to take advantage of our [SDKs](/microsoftteams/platform/).

### Code samples - Bots

|Sample name | Description | .NETCore | Node.js | Python | Java| Manifest|
|----------------|-----------------|--------------|----------------|----------------|----------------|----------------|
| Teams conversation bot | Sample app which demonstrates use of different bot conversation events available in bot framework v4 | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/python) |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/java) |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/csharp/demo-manifest/bot-conversation.zip)
|Bot samples | Set of bot samples  | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples#bots-samples-using-the-v4-sdk) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples#bots-samples-using-the-v4-sdk) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples#bots-samples-using-the-v4-sdk) |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples#bots-samples-using-the-v4-sdk) |

## Message extensions

Message extensions allow the users to interact with your web service through buttons and forms in the Teams client. Users can search or initiate actions in an external system from the compose message area, the command box, or directly from a message. You can send back the results of that interaction to the Teams client in the form of a richly formatted card. Implementing message extensions for meeting chats is no different than regular chats. To implement message extension, start with [message extensions](/microsoftteams/platform/messaging-extensions/what-are-messaging-extensions?tabs=dotnet).

## Cards and Task modules

Cards provide users with various visual, audio, and selectable messages and help in conversation flow. With task modules, you can create modal pop-up experiences in Teams. They're useful for starting and completing the tasks, or displaying rich information like videos or Power business intelligence (BI) dashboards. For more information, see [building cards and task modules](/microsoftteams/platform/task-modules-and-cards/cards-and-task-modules).

## Feature compatibility by user types

The following table provides the user types and lists the features that each user can access in meetings:

| User type | Bots | Message extensions | Adaptive Cards | Task modules |
| :-- | :-- | :-- | :-- | :-- |
| In-tenant | Can view messages, interact with the content, and invoke the bot. | Available | Available | Available |
| Guest, part of the tenant Azure AD | Can view messages, interact with the content, and invoke the bot. | Not available | Interactions in the meeting chat are allowed. | Interactions in the meeting chat from Adaptive Card are allowed. |
| Federated, for more information, see [non-standard users](/microsoftteams/non-standard-users). |Can view messages, interact with the content, and invoke the bot. | Not available | Interactions in the meeting chat are allowed. | Interactions in the meeting chat from Adaptive Card are allowed. |
| Anonymous |  Can view and interact with the messages sent by the bot. Can't invoke the bot. | Not available | Interactions in the meeting chat are allowed. | Interactions in the meeting chat from Adaptive Card are allowed. |

## See also

* [Apps for Teams meetings and calls](teams-apps-in-meetings.md)
* [Design your Microsoft Teams message extension](../messaging-extensions/design/messaging-extension-design.md)
* [Design task modules for your Microsoft Teams app](../task-modules-and-cards/task-modules/design-teams-task-modules.md)
* [Receive all conversation messages with RSC](../bots/how-to/conversations/channel-messages-with-rsc.md)
* [Conversation basics](../bots/how-to/conversations/conversation-basics.md)
* [Adaptive Card](../task-modules-and-cards/cards/cards-reference.md#adaptive-card)
