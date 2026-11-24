---
title: Agent Scopes in Microsoft Teams
description: Learn how Microsoft Teams agent scopes shape interactions in channels, group chats, and one-to-one chats. Choose the right experience for your agent.
ms.topic: article
ms.date: 11/24/2026
ai-usage: ai-assisted
---

# Understand agent scopes

An agent's scope determines the conversation context in which users interact with it. Design your agent's experience for the people, conversation structure, and interaction patterns in each scope.

## Agent scopes

Agents in Microsoft Teams can be part of a one-to-one conversation, a group chat, or a channel in a team. Each scope provides unique opportunities and challenges for your conversational agent.

| In a channel | In a group chat | In a one-to-one chat |
| :-- | :-- | :-- |
| Massive reach | Fewer members | Traditional way |
| Concise individual interactions | @mention to agent | Q&A agents |
| @mention to agent | Similar to channel | Agents that tell jokes and take notes |

### In a channel

Channels contain threaded conversations between multiple people, even up to 2000. This potentially gives your agent massive reach, but individual interactions must be concise. Traditional multi-turn interactions don't work. Instead, you must look to use interactive cards or dialogs (referred as task modules in TeamsJS v1.x), or move the conversation to a one-to-one conversation to collect lots of information. Your agent only has access to messages where it's `@mentioned`. You can retrieve additional messages from the conversation using Microsoft Graph and organization-level permissions.

Agents work better in a channel in the following cases:

- Notifications, where you provide an interactive card for users to take additional information.
- Feedback scenarios, such as polls and surveys.
- Single request or response cycle resolves interactions and the results are useful for multiple members of the conversation.
- Social or fun agents, where you get an awesome cat image, randomly pick a winner, and so on.

### In a group chat

Group chats are non-threaded conversations between three or more people. They tend to have fewer members than a channel and are more transient. Similar to a channel, your agent only has access to messages where it's `@mentioned` directly.

Agents that work better in a channel also work better in a group chat.

### In a one-to-one chat

One-to-one chat is a traditional way for a conversational agent to interact with a user. A few examples of one-to-one conversational agents are:

- Q&A agents
- agents that initiate workflows in other systems.
- agents that tell jokes.
- agents that take notes.
Before creating one-to-one agents, consider whether a conversation-based interface is the best way to present your functionality.

## Next step

> [!div class="nextstepaction"]
> [Understand activities and handlers](activities-and-handlers.md)
