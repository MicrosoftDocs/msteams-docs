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
- **Ephemeral client behavior**: Targeted messages are ephemeral on the client, that is, the user interface doesn't show them indefinitely.
- **Limited actions**: The targeted message is like a normal message in that it can include Adaptive Cards, images, or buttons to trigger an action. However, certain user actions such as replying, reacting, or forwarding are disabled to preserve privacy.

## Targeted messages user experience

Bots can use targeted messages in a group context to send messages directed to a particular user only. The bot messages or responses appear to that user with the label 'Only you can see this message' tagged on them.

[WIP: Placeholder image]

:::image type="content" source="../assets/images/agents-in-teams/targeted-messages/targeted-messages.png" alt-text="Image shows user scenario for targeted messages" border="false":::

The scenario in the image shows a poll in the group chat. When a group member submits their vote, the bot acknowledges the vote by sending a targeted message to the member by sending a message that is visible only to them.

## Why use targeted messages

Targeted messages come with the following benefits for enhacing user experience:

- **Reduce bot spam**: An agent or bot can send a message in a group chat or channel that's visible only to a specific user, avoiding spamming the entire group.
- **Maintain context**: The agent responds to the user request aligned with the context in the chat. While other members aren't able to see this interaction, a user can get chat summary and be updated about the discussion.
- **Human-in-the-loop scenarios**: It's useful for human-in-the-loop scenarios, such as authentication prompts, approvals, or informational messages that should only be visible to the relevant user.
- **Ephemeral messages**: The targeted message isn't retained in the chat indefinitely. They are cleared after 24 hours, so the conversation stays clean. However, your agent or app retains them in the backend storage for compliance as needed (for example, eDiscovery).

Some common use scenarios include:

- **Authentication flows**: A user can trigger a bot command in a channel (for example, “@Bot login”). The bot replies with a sign-in card as a targeted message visible only to that user. This prevents the group from seeing one user's login prompt.
- **Help or error responses**: If a user asks a bot for help or encounters an error in a group chat, the bot can respond just to that user (with tips, usage examples, or error details) via a targeted message . Others aren’t spammed by a message that only the one user needed.
- **Personal reminders or nudges**: A bot in a channel can privately remind a specific user to complete an action (fill a poll, review a document, etc.) using a targeted message, instead of @mentioning them publicly. This avoids public call-outs or extraneous notifications to others.
- **Welcome and onboarding**: When a new user joins a team channel, a bot can send a welcome message or onboarding info visible only to that user (for example, with links to FAQs), rather than a message that everyone sees repeatedly for each new member.
- **AI or Copilot summaries**: In long-running chats (for example, incident management channels), if a new participant joins, the bot might offer them a private summary of what happened so far. Slack supports this pattern with ephemeral messages; now Teams can too.
