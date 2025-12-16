---
title: Targeted Messages
description: Learn about enabling targeted messages for agents and bots in Teams.
ms.localizationpriority: high
ms.date: 02/06/2025
ms.topic: reference
---

# Enable targeted messages for agents

Targeted messages, also known as ephemeral messages are a new message type in Teams. Targeted messages are temporary, user-specific messages that appear in a group  meeting, or channel that are visible to a single user only. With targeted messages, the agent or bot can interact with specific users in certain scenarios. Agents or bots can use them for contextual, real-time feedback to a user like reminders, welcome messages, or chat summary. All this is done without adding permanent noise to the conversation that might be irrelevant to the other group members.

## Targeted message on Teams platform

Targeted messages support all capabilities as other Teams messages. Your agent or bot can include most types of messages that include like interactive Adaptive Cards with buttons, images, file attachments, and so on. For example, a sign-in card or a task module can be delivered via targeted message to a user. Unlike standard messages, targeted messages are:

- Triggered in response to user action.
- Delivered to only one user in a group context.
- Temporary and visible up to 24 hours only in the client.
- Disables user actions such as reaction, replies, and forwarding.

Even though targeted messages might be contextually relevant, they're best suited for short-lived, action-driven communication rather than ongoing conversation. Use them when you want the agent or bot to respond in the moment as required by a specific user.

## Targeted messages user experience

Targeted messages are intended as immediate, relevant, and private agent or bot-to-user communication. From a single user's perspective, they appear as regular inline messages in a conversation. However, they're visible only to them and exist only for a short duration. Targeted messages are initiated by the agent in response to a user action. Key aspects of the user experience include:

- The messages appear in context where the trigerring action occured.
- Only the intended user can see the message. Other group or channel members are unaware of the messages sent. The bot messages or responses appear to that user with the label 'Only you can see this message tagged on them.
- The message disappears after 24 hours from the client UI.
- The message doesn't impede the ongoing conversation and reduce spamming while still supporting the user effectively.

## Why use targeted messages

Targeted messages come with the following benefits for enhancing user experience:

- **Reduce bot spam**: An agent or bot can send a message in a group chat or channel that's visible only to a specific user, avoiding spamming the entire group.
- **Maintain context**: The agent responds to the user request aligned with the context in the chat. While other members aren't able to see this interaction, a user can get chat summary and be updated about the discussion.
- **Human-in-the-loop scenarios**: It's useful for human-in-the-loop scenarios, such as authentication prompts, approvals, or informational messages that should only be visible to the relevant user.
- **Ephemeral messages**: The targeted message isn't retained in the chat indefinitely. They're cleared after 24 hours, so the conversation stays clean. However, your agent or app retains them in the backend storage for compliance as needed.

[WIP: Placeholder image]

:::image type="content" source="../assets/images/agents-in-teams/targeted-messages/targeted-messages.png" alt-text="Image shows user scenario for targeted messages" border="false":::

Some common use scenarios include:

- **Authentication flows**: A user can trigger a bot command in a channel (for example, “@Bot login”). The bot replies with a sign-in card as a targeted message visible only to that user. This prevents the group from seeing one user's login prompt.
- **Help or error responses**: If a user asks a bot for help or encounters an error in a group chat, the bot can respond just to that user (with tips, usage examples, or error details) via a targeted message. The message doesn't spam other members.
- **Personal reminders or nudges**: A bot in a channel can privately remind a specific user to complete an action (fill a poll, review a document, etc.) using a targeted message, instead of @mentioning them publicly. This avoids public call-outs or extraneous notifications to others.
- **Welcome and onboarding**: When a new user joins a team channel, a bot can send a welcome message or onboarding info visible only to that user (for example, with links to FAQs), rather than a message that everyone sees repeatedly for each new member.
- **AI or Copilot summaries**: In long-running chats (for example, incident management channels), if a new participant joins, the bot can offer a private summary of what happened so far. Slack supports this pattern with ephemeral messages; now Teams can too.

## Targeted message developer experience

You can send a targeted message in an agent or bot just as a normal message. The bot indicates that the message is intended for a specific user in the conversation, and the platform delivers it to that user. The bot doesn't initiate a separate conversation or create a new chat. The message lives in the same channel or thread ID, but with restricted visibility.

Key steps for enabling targeted messages:

1. **Detect the scenario to use a targeted reply**:

    The bot logic for  must determine to send a targeted message in response to one of the following triggers:

    - When a user @mentions or selects a button that might require a response that isn't meant for other group members.
    - The agent or bot must send a proactive message to a specific user, for example, a reminder or welcome message in-context.
    - The agent or bot must send a recommendation to a user that isn't relevant to other group members.

1. **Include the targeted designation in the `send` API**:

    Ensure that you specify the following when the agent or bot sends the message:

    - The conversation (chat or channel) ID and targeted user’s ID (Principal ID or MRI). This identifies where the message goes and who should see it.
    - A flag or API call that marks the message as targeted or ephemeral.

        - **For REST APIs**: The exact URL varies by region. Use the service URL from the conversation. The `userId` is the user’s Teams ID (MRI) to target, and `conversationId` is the group chat or channel thread ID. The payload of the POST is the activity or message to send, just like a normal message activity.
        - **For Teams SDK**: [WIP - details to be added]
        - **For Bot Framework SDK**: In Bot Framework SDK, this is planned as a specialized method or property. For example, Teams is introducing a method like `SendTargetedActivityAsync` that you can call instead of the regular `SendActivityAsync`. This invokes a Teams-specific API endpoint to deliver a targeted message, where `isTargeted: true` indicates this message should be private to `targetUserId`.

    The following code snippet is an example of a scenario where the agent or bot uses targeted message to inform a group member when they submit their vote in a group poll:

    ```rest
    POST /v3/users/29:.../conversations/19:.../targetedactivities
    {
        "type": "message",
        "text": "Thank you, your vote has been recorded.",
        "replyToId": "<id of user's command>",
        ... (recipient = user, etc.)
    }
    ```

1. **Handle send results and fallbacks**:

    After the agent calls the targeted `send` API, the API returns a success or error:

    1. If successful, the targeted user gets the message sent by the agent or bot.
    1. If the `send` API fails, the agent or bot might choose a fallback, such as sending a 1:1 chat message as a backup. However, the intended user must be a member of the chat or channel to receive a targeted message, else the message isn't delivered. Some scenarios where a send event might fail are if a user isn’t a group member or if the client doesn’t support targeted messages.

    > [!NOTE]
    > Backward compatibility logic is a service on Teams ensures older clients don't show targeted messages to all members, when not supported. It's helpful if your agent or bot is notified when the client doesn't support targeted messages.

1. **Bot edits and deletes**:

    After sending a targeted message, your agent or bot updates or deletes it:

    - **Edit**: If a user takes an action, for example submitting the login card, the agent or bot might want to update the original targeted message. The agent calls the update message API for that message using the message’s `activityId`). The edit updates the content only in the target user’s view.
    - **Delete**: The agent can delete a targeted message using the delete message API. For example, if the user didn’t act on an ephemeral prompt after some time, the agent can delete it to avoid leaving stale content.

1. **Use Graph API**:

    Microsoft Graph exposes targeted messaging support. For instance, Graph API for Teams chat messages might include a property to send a message to specific users or a new endpoint for targeted messages. This allows workflows or external apps to create targeted messages.

<!--
| Targeted message in Teams client | End-user experience |
| --- | --- |
| **In Chat or Channel** | The targeted message appears in the chat or channel thread only for the target user. It shows up inline among other messages, with the label 'Only you can see this message' to indicate its privacy. The message can be at the root of the chat, channel, or inside a thread (if the bot message is a reply to a user's specific message in a channel). Bot developers can determine where to post the message, same as a normal bot message: <br> - If the bot replies in a channel thread (at level 2), it can target that reply to the specific user. Only that user sees the reply in the thread. Other users might temporarily see the thread as if it has no new replies (until there's a public reply). <br> - If the bot posts a top-level message (L1) in a chat or channel, it can mark it targeted to a user. The user sees the message in the main chat flow, but others don't see any message at that spot. |
| **Threading behavior** | If a targeted message is sent as a new thread reply (level 2) in a channel: <br> - Teams creates a thread visible only to the targeted user. <br> - If later someone (or the bot) posts a public message in that thread, the thread becomes visible to everyone, but with some differences. Users who were previously unaware can see the thread starter and any public replies. However, the targeted reply remains invisible to them. <br> - Teams manages the thread count per user: The reply count and summary adapt per viewer so that the private reply is only counted for the person who received it. In short, thread reply counts and follow-status are personalized when targeted messages are involved. <br> - If the targeted user wasn’t already following the thread (or in a group chat context, if it’s a side conversation), the act of receiving a targeted message automatically makes them follow the thread (to ensure they get updates). The user can manually unfollow if they want. <br> - Other people can't reply to a targeted message. If another user replies to the same parent message (in a channel thread scenario), that reply starts a separate public thread (or be a separate reply). That user can’t see or join the private thread until a public message is posted in that thread. |
| **Top-level targeted message in a chat or channel (level 1)** | - Other users simply don't see that message. It doesn't increment the chat “unread” for them. <br> - They might notice that the bot seemingly didn't respond to an earlier user’s command (if they saw the user’s message). This is the “dangling message” issue. |
| **Ephemeral lifespan** | Targeted messages show in the clients for 24 hours only. They're retained in backend storage for compliance. |
| **Notification** | Targeted messages aren't notified, however, the chat appears as bold when the user receives a new message in a group chat. |
| **User actions** | The user actions are limited to any actions within the targeted message. The users can't react or reply to the message. |
-->