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

| Targeted message in Teams client | End-user experience |
| --- | --- |
| **In Chat or Channel** | The targeted message appears in the chat or channel thread only for the target user. It shows up inline among other messages, with the label 'Only you can see this message' to indicate its privacy. The message can be at the root of the chat, channel, or inside a thread (if the bot message is a reply to a user's specific message in a channel). Bot developers can determine where to post the message, same as a normal bot message: <br> - If the bot replies in a channel thread (at level 2), it can target that reply to the specific user. Only that user sees the reply in the thread. Other users might temporarily see the thread as if it has no new replies (until there's a public reply). <br> - If the bot posts a top-level message (L1) in a chat or channel, it can mark it targeted to a user. The user sees the message in the main chat flow, but others do not see any message at that spot. |
| **Threading behavior** | If a targeted message is sent as a new thread reply (level 2) in a channel: <br> - Teams creates a thread visible only to the targeted user. <br> - If later someone (or the bot) posts a public message in that thread, the thread becomes visible to everyone, but with some differences. Users who were previously unaware will now see the thread starter and any public replies. However, the targeted reply remains invisible to them. <br> - Teams manages the thread count per user: The reply count and summary adapt per viewer so that the private reply is only counted for the person who received it. In short, thread reply counts and follow-status are personalized when targeted messages are involved. <br> - If the targeted user wasn’t already following the thread (or in a group chat context, if it’s a side conversation), the act of receiving a targeted message automatically makes them follow the thread (to ensure they get updates). The user can manually unfollow if they want, but it won’t auto-unfollow on its own. <br> - A targeted message cannot itself be replied to by other people. If another user replies to the same parent message (in a channel thread scenario), that reply starts a separate public thread (or be a separate reply). That user can’t see or join the private thread until a public message is posted in that thread. |
| **Top-level targeted message in a chat or channel (level 1)** | - Other users simply do not see that message. It does not increment the chat “unread” for them. <br> - They might notice that the bot seemingly did not respond to an earlier user’s command (if they saw the user’s message). This is the “dangling message” issue. |
| **Ephemeral lifespan** | Targeted messages are designed to be cleared from clients in 24 hours. Although, they are retained in backend storage for complaince. |
| **Notification** | Targeted messages are not notified, however, the chat appears as bold when the user receives a new message in a group chat. |
| **User actions** | When viewing a targeted message, the user actions are limited to any actions within the targeted message. The users can't react or reply to the message. |

Some common use scenarios include:

- **Authentication flows**: A user can trigger a bot command in a channel (for example, “@Bot login”). The bot replies with a sign-in card as a targeted message visible only to that user. This prevents the group from seeing one user's login prompt.
- **Help or error responses**: If a user asks a bot for help or encounters an error in a group chat, the bot can respond just to that user (with tips, usage examples, or error details) via a targeted message . Others aren’t spammed by a message that only the one user needed.
- **Personal reminders or nudges**: A bot in a channel can privately remind a specific user to complete an action (fill a poll, review a document, etc.) using a targeted message, instead of @mentioning them publicly. This avoids public call-outs or extraneous notifications to others.
- **Welcome and onboarding**: When a new user joins a team channel, a bot can send a welcome message or onboarding info visible only to that user (for example, with links to FAQs), rather than a message that everyone sees repeatedly for each new member.
- **AI or Copilot summaries**: In long-running chats (for example, incident management channels), if a new participant joins, the bot can offer a private summary of what happened so far. Slack supports this pattern with ephemeral messages; now Teams can too.

## Targeted message developer experience

You can send a targeted message in an agent or bot just as a normal message. The bot indicates that the message is intended for a specific user in the conversation, and the platform delivers it to that user. The bot doesn't initiate a separate conversation or create a new chat. The message lives in the same channel or thread ID, but with restricted visibility.

Key steps for enabling targeted messages:

1. **Detect the scenario to use a targeted reply**:

    The bot logic for  must determine sending a targeted message in response to one of the following triggers:

    - When a user @mentions or selects a button that might require a response that isn't meant for other group members.
    - The agent or bot must send a proactive message to a specific user, for example, a reminder or welcome message in-context.
    - The agent or bot must send a recommend to a user that isn't relevant to other group members.

1. **Include the targeted designation in the send API**:

    Ensure that you specify the following when the agent or bot sends the message:

    - The conversation (chat or channel) ID and targeted user’s ID (Principal ID or MRI). This identifies where the message goes and who should see it.
    - A flag or API call that marks the message as targeted or ephemeral.

        - For REST APIs:
        - For Teams SDK:
        - For Bot Framework SDK:
