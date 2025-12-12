---
title: Targeted Messages
description: Learn about enabling targeted messages for agents and bots in Teams.
ms.localizationpriority: high
ms.date: 02/06/2025
ms.topic: reference
---

# Enable targeted messages for agents

Targeted messages, also known as ephemeral messages are a new message type in Teams. With targeted messages, the bot can send messages to specific users in a group chat, meeting chat, or channel conversation.

## What is a targeted message?

You can use targeted message to deliver bot messages or responses only to a specific user. Other memebers in the group, meeting, or channel don't receive it.

Teams supports fundamental targeted messaging capabilities for bots:

- **Private bot-to-user messages in group context**: A bot can send a message in a group chat or channel that's visible only to a specified user. The message appears in the conversation thread for that user with the label 'Only you can see this message' that indicates its private scope.
- **Ephemeral client behavior**: Targeted messages are ephemeral on the client, that is, the user interface doesn't show them indefinitely. They are cleared after 24 hours, so the conversation stays clean. However, your agent or app retains them in the backend storage for compliance as needed (for example, eDiscovery).
- **Limited actions**: The targeted message is like a normal message in that it can include Adaptive Cards, images, or buttons to trigger an action. However, certain user actions such as replying, reacting, or forwarding are disabled to preserve privacy.

## Targeted messages user experience

Bots can use targeted messages in a group context to send messages directed to a particular user only. The bot messages or responses appear to that user with the label 'Only you can see this message' tagged on them.

:::image type="content" source="../assets/images/agents-in-teams/targeted-messages/targeted-messages.png" alt-text="Image shows user scenario for targeted messages":::

The scenario in the image shows a poll in the group chat. When a group member submits their vote, the bot acknowledges the vote by sending a targeted message to the member by sending a message that is visible only to them.

## Why use targeted messages
