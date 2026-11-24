---
title: Agent Scopes
description: Learn how Microsoft Teams agent scopes shape interactions in channels, group chats, and one-to-one chats. Choose the right experience for your agent.
ms.topic: article
ms.date: 11/24/2026
ai-usage: ai-assisted
---

# Agent scopes

Scope is a setting configured in an agent's app manifest that determines in which contexts users can install and use it in Teams.

Teams supports three primary scopes:

| Scope           | Description                                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------------------ |
| **`personal`**  | Users can install the agent as a personal app and interact with it through a private, one-on-one chat.        |
| **`groupChat`** | Users can install the agent in group chats, where multiple participants can interact with it in a shared conversation. |
| **`team`**      | Users can install the agent ina team, allowing it to participate in conversations in the team's channels.              |

A fourth scope, `copilot`, enables the agent's use in Microsoft 365 Copilot. For more information, see [Enable an agent or app in Microsoft 365 Copilot](../m365-apps/enable-agent-app-copilot.md).

## Configure an agent's scope

Declare one or more scopes for an agent in the `bots.scopes` property of its manifest, via Teams Developer portal, using the Teams developer CLI, or manually.

```json
{
  "bots": [
    {
      "botId": "{{BOT_ID}}",
      "scopes": ["personal", "team", "groupChat"]
    }
}
```

For more information, see [the app manifest reference documentation](/microsoft-365/extensibility/schema/root-bots#scopes).

## Agent design guidance

### Channels

Channels contain threaded conversations between multiple people, even up to 2000. This potentially gives your agent massive reach, but individual interactions must be concise. Traditional multi-turn interactions don't work. Instead, you must look to use interactive cards or dialogs (referred as task modules in TeamsJS v1.x), or move the conversation to a one-to-one conversation to collect lots of information. Your agent only has access to messages where it's `@mentioned`. You can retrieve additional messages from the conversation using Microsoft Graph and organization-level permissions.

Agents work better in a channel in the following cases:

- Notifications, where you provide an interactive card for users to take additional information.
- Feedback scenarios, such as polls and surveys.
- Single request or response cycle resolves interactions and the results are useful for multiple members of the conversation.
- Social or fun agents, where you get an awesome cat image, randomly pick a winner, and so on.

### Group chats

Group chats are non-threaded conversations between three or more people. They tend to have fewer members than a channel and are more transient. Similar to a channel, your agent only has access to messages where it's `@mentioned` directly.

Agents that work better in a channel also work better in a group chat.

### One-on-one chats

One-to-one chat is a traditional way for a conversational agent to interact with a user. A few examples of one-to-one conversational agents are:

- Q&A agents
- agents that initiate workflows in other systems.
- agents that tell jokes.
- agents that take notes.

Before creating one-to-one agents, consider whether a conversation-based interface is the best way to present your functionality.

## Next step

> [!div class="nextstepaction"]
> [Understand activities and handlers](activities-handlers.md)
