---
title: Build Extensible Conversations
description: In this article, learn how to build extensible conversation for Microsoft Teams meeting chat with agents, cards, and message extensions.
ms.topic: concept-article
ms.author: nickwalk
ms.localizationpriority: medium
ms.date: 05/01/2026
---

# Build extensible conversation for meeting chat

You can make conversations extensible in Microsoft Teams meetings. Agents, message extensions, cards, and dialogs (referred to as task modules in TeamsJS v1.x) can be combined to deliver an intuitive experience.

## Agents

Agents in Teams are conversational apps that understand user intent, connect to business data, and perform tasks on behalf of users. They can answer questions, automate workflows, and help users collaborate in meeting chats. An agent needs to be enabled in the `team` scope for a channel meeting and the `groupchat` scope for all other meeting types. For more information, see [Agents in Teams](../agents-in-teams/overview.md).

### Build an agent

Use Teams SDK to build agents with support for authentication, messaging, and UI components in Teams. You can develop agents using TypeScript, C#, or Python. To get started, follow [Quickstart: Create an agent and chat with it in Teams](../agents-in-teams/quickstart-create-agent-teams-sdk.md).

### Code samples - Bots

| Sample name | Description | C# | Typescript | Python |
| ---------------- | ----------------- | -------------- | ---------------- | ---------------- |
| Bot Quickstart | This sample demonstrates how to handle various bot conversation events in Microsoft Teams. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-quickstart/dotnet/bot-quickstart) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-quickstart/nodejs/bot-quickstart) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-quickstart/python/bot-quickstart) |

## Message extensions

Message extensions allow users to interact with your web service through buttons and forms in the Teams client. Users can search or initiate actions in an external system from the compose message area, the command box, or directly from a message. You can send back the results of that interaction to the Teams client in the form of a richly formatted card. Implementing message extensions for meeting chats is no different than regular chats. To implement message extensions, start with [message extensions](/microsoftteams/platform/messaging-extensions/what-are-messaging-extensions?tabs=dotnet).

## Cards and dialogs

Cards provide users with various visual, audio, and selectable messages and help in conversation flow. With dialogs, you can create modal pop-up experiences in Teams. They're useful for starting and completing tasks or displaying rich information like videos or Power BI dashboards. For more information, see [building cards and dialogs](/microsoftteams/platform/task-modules-and-cards/cards-and-task-modules).

## Feature compatibility by user types

The following table provides the user types and lists the features that each user can access in meetings:

| User type | Agents | Message extensions | Adaptive Cards | Dialogs |
| :-- | :-- | :-- | :-- | :-- |
| In-tenant | Can view messages, interact with the content, and invoke the agent. | Available | Available | Available |
| Guest, part of the tenant Microsoft Entra ID | Can view messages, interact with the content, and invoke the agent. | Not available | Interactions in the meeting chat are allowed. | Interactions in the meeting chat from Adaptive Card are allowed. |
| Federated, for more information, see [non-standard users](/microsoftteams/non-standard-users). | Can view messages, interact with the content, and invoke the agent. | Not available | Interactions in the meeting chat are allowed. | Interactions in the meeting chat from Adaptive Card are allowed. |
| Anonymous | Can view and interact with the messages sent by the agent. Can't invoke the agent. | Not available | Interactions in the meeting chat are allowed. | Interactions in the meeting chat from Adaptive Card are allowed. |

> [!Note]
>
> * If a federated user is a participant in the meeting, the tenant user can't view the message extensions.
> * If an anonymous user and a tenant user are participants in the meeting, the tenant user can view the message extensions.

## See also

* [Apps for Teams meetings and calls](teams-apps-in-meetings.md)
* [Design your Microsoft Teams message extension](../messaging-extensions/design/messaging-extension-design.md)
* [Design dialogs for your Microsoft Teams app](../task-modules-and-cards/task-modules/design-teams-task-modules.md)
* [Enable an agent to receive all chat messages](../agents-in-teams/enable-receive-all-chat-messages.md)
* [Adaptive Card](../task-modules-and-cards/cards/cards-reference.md#adaptive-card)
