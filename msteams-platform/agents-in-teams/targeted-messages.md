---
title: Targeted Messages
description: Learn about enabling targeted messages for agents in Teams.
ms.localizationpriority: high
ms.date: 02/06/2025
ms.topic: reference
---

<!-- markdownlint-disable MD023 -->
<!-- markdownlint-disable MD001 -->
<!-- markdownlint-disable MD024 -->

# Enable targeted messages for agents

Use targeted messages in your agents or bots to send temporary, private messages to a specific user in a channel, group, or meeting chat. You can also enable the agent or the bot to edit or delete a targeted message that it sent in a conversation.

**Key points**:

- **About targeted messages**
  - [What is a targeted message](#what-is-a-targeted-message)
  - [Why use targeted messages](#why-use-targeted-messages)
- **Enable targeted messages**
  - [Send a targeted message](#send-a-targeted-message)
  - [Update or delete a targeted message](#update-or-delete-a-targeted-message)
  - [Handle errors](#handle-errors)

## What is a targeted message

A targeted message, also known as an ephemeral message, lets an agent or a bot send a user-targeted message. It supports all message capabilities like buttons, images, and files, and helps reduce bot spam by keeping shared conversations uncluttered. Targeted messages are:

- Triggered in response to user action.
- Delivered to only one user in a group context.
- Visible up for 24 hours in the client and can be stored based on organizational policy.
- Restricted for user actions such as reaction, replies, and forwarding.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :::image type="content" source="../assets/images/agents-in-teams/targeted-messages/targeted-messages.png" alt-text="Image shows user scenarios for targeted messages" border="false" lightbox="../assets/images/agents-in-teams/targeted-messages/targeted-messages-main.png":::

From a single user's perspective, it appears as regular inline messages in a conversation that appears with the label **Only you can see this message** tagged on them.

<br><br>
Some common user scenarios include:

| Scenario | Use for ... | To ... |
| --- | --- | --- |
| Authentication flow | Sending a sign-in card as a targeted message | Enable uninterrupted discussion by a user's log in workflow. |
| AI or Copilot summary | Sharing discussion details for long-running chats for a new participant | Avoid derailing ongoing discussion. |
| Help users | Sending user-specific messages for supporting users | Support with personal reminders, onboard new recipients, get information without public callouts or repetitive group notifications. |

## Why use targeted messages

Targeted messages are ideal for contextual information or assistance. Among other benefits, targeted messages enhance user experience as follows:

- **Agent sensitivity and alertness**: <br>
    Real-time responses from the agent to the user's requirement in the group setting reinforces that the agent is alert to user actions.

- **Enhanced user experience**: <br>
    Agents can help users engage more openly. A clear message hierarchy that shows only the content that's meant for everyone is permanent in the chat.

- **Human-in-the-loop scenarios**: <br>
    It's useful for scenarios such as authentication prompts, approvals, or informational messages. It lets a user progress through a conversation or a workflow without switching context or seeking help elsewhere.

<!--
Targeted messages are temporary, user-specific messages that appear in a group chat, meeting, or channel. Agents can support users without adding permanent noise for the rest of the group. They can include most message capabilities like interactive Adaptive Cards with buttons, images, or file attachments. For example, use a targeted message to share a sign‑in card or an error message with a help link. Unlike standard messages, targeted messages are:

- Triggered in response to user action.
- Delivered to only one user in a group context.
- Visible up for a limited time in the client.
- Restricted for user actions such as reaction, replies, and forwarding.

Targeted messages are best suited for short-term, action-driven communication. Use them when you want the agent to respond in-the-moment as required by a specific user.
-->

## Targeted message developer experience

You can enable targeted messages using Teams SDK or REST APIs. Teams SDK supports C#, TypeScript, and Python (for developer preview). You can enable your agent or bot to send, edit, and remove targeted messages in the conversation.

### Send a targeted message

<!--
### Use Teams SDK
-->

Sending a targeted message is similar to sending a regular message. The agent indicates that the message is intended for a specific user in the conversation, and the platform delivers it to that user. The agent doesn't initiate a separate conversation or create a new chat. Key steps for enabling the agent to send a targeted messages are as follows:

1. Detect the scenario to use a targeted message:

    The agent must determine to send a targeted message in response to one of the following triggers:

    - A user @mentions or selects a button that requires a response only for that user.
    - The agent must send a proactive message to a specific user message in-context.
    - The agent must send a recommendation to a user that isn't relevant to other group members.

2. Use any of the following code snippets to send a targeted message:

    [WIP: Teams SDK links to be added once Teams SDK PR is published.]

    - Send targeted messages

      # [TypeScript](#tab/ts1)

        ```typescript
        // Reactive Send
        await send(
          new MessageActivity('This message is only visible to you!')
            .withRecipient(activity.from, true)
        );
        ```

      # [C#](#tab/dotnet1)

        ```csharp
        // Send Reactive
        await context.Send(
            new MessageActivity("This message is only visible to you!")
                .WithRecipient(context.Activity.From, isTargeted: true)
        );
        ```

      # [Python](#tab/Py1)

      ```python
      # Reactive Send
      await ctx.send(
          MessageActivityInput(text="This message is only visible to you!")
          .with_recipient(ctx.activity.from_, is_targeted=True)
      )
      ```

      # [HTTP](#tab/api1)

      Include the 'targeted' designation in the `Send TM` API.

        ```rest
        POST {cloud}/v3/conversations/{conversationId}/activities?isTargetedActivity=true
        POST {cloud}/v3/conversations/{conversationId}/activities/{activityId}?isTargetedActivity=true
        ```

      Ensure that you specify the following when the agent sends the message:

      - To send a targeted activity, ensure that you indicate the `isTargetedActivity` as `true`.
      - The conversation (chat or channel) ID and targeted user’s ID (Principal ID or MRI). The intended user must be a member of the chat or channel to receive a targeted message.
      - A flag or API call that marks the message as targeted or ephemeral.

        Use the service URL from the conversation. The `userId` is the user’s Teams ID (MRI) to target, and `conversationId` is the group chat or channel thread ID. The POST payload is the activity (message) to send, same as for a standard message activity.

    - Send proactive targeted messages

      # [TypeScript](#tab/ts1)

        ```typescript
        // Proactive Send
        await app.send(
          conversationId,
          new MessageActivity('Private notification just for you!')
            .withRecipient({ id: userId, name: userName, role: 'user' }, true)
        );
        ```

      # [C#](#tab/dotnet1)

        ```csharp
        // Send Proactive
        await teams.Send(
        conversationId,
        new MessageActivity("Private notification just for you!")
        .WithRecipient(new Account { Id = userId, Name = userName, Role = Role.User }, isTargeted: true)
        );
        ```

      # [Python](#tab/Py1)

      ```python
      #Proactive Send
      recipient = Account(id=user_id, name=user_name, role="user")
      await app.send(
          conversation_id,
          MessageActivityInput(text="Private notification just for you!")
              .with_recipient(recipient, is_targeted=True)
      )
      ```

      # [HTTP](#tab/api1)

        To send a message to a conversation that isn't a direct reply to any message from the user, use this request:

        ```rest
        POST /v3/conversations/{conversationId}/activities
        ```

### Update or delete a targeted message

Your agent can update or delete the targeted message after sending it.

[WIP: Teams SDK links to be added.]

- **Update**: The agent can edit the original targeted message if needed. The updated message appears only in intended user’s view.

    Use one of the following code snippets to edit targeted message:

    # [TypeScript](#tab/ts1)

    ```typescript
    // Update
    const updatedMessage = new MessageActivity('This message has been updated!');
    await api.conversations.activities.updateTargeted(conversationId, messageId, updatedMessage);
    ```

    # [C#](#tab/dotnet1)

    ```csharp
    // Update 
    var updatedMessage = new MessageActivity("This message has been updated!");
    await context.Api.Conversations.Activities.UpdateTargetedAsync(conversationId, messageId, updatedMessage);
    ```

    # [Python](#tab/Py1)

    ```python
    # Update 
    updated_message = MessageActivityInput(text="This message has been updated!")
    await ctx.api.conversations.activities.update_targeted(conversation_id, message_id, updated_message)
    ```

    # [HTTP](#tab/api1)

    The agent calls the `Edit TM` API using the message’s `activityId`.

    ```rest
    PUT {cloud}/v3/conversations/{conversationId}/activities
    PUT {cloud}/v3/conversations/{conversationId}/activities/{activityld}
    ```

- **Delete**: If a user doesn't act on a targeted message, the agent can delete it.

    Use one of the following code snippets to delete targeted message:

    # [TypeScript](#tab/ts1)

    ```typescript
    // Delete
    await api.conversations.activities.deleteTargeted(conversationId, messageId);
    ```

    # [C#](#tab/dotnet1)

    ```csharp
    // Delete
    await context.Api.Conversations.Activities.DeleteTargetedAsync(conversationId, messageId);
    ```

    # [Python](#tab/Py1)

    ```python
    #Delete
    await ctx.api.conversations.activities.delete_targeted(conversation_id, message_id)
    ```

    # [HTTP](#tab/api1)

    Use the delete message API for enabling the agent to remove targeted messages. It avoids leaving stale content.

    ```rest
    DELETE {cloud}/v3/conversations/{conversationId}/activities?isTargetedActivity=true
    DELETE {cloud}/v3/conversations/{conversationId}/activities/{activityld}?isTargetedActivity=true
    ```

<!--
### Use REST API

Key steps for enabling targeted messages:

1. **Detect the scenario to use a targeted message**:

    The agent must determine to send a targeted message in response to one of the following triggers:

    - A user @mentions or selects a button that requires a response only for that user.
    - The agent must send a proactive message to a specific user message in-context.
    - The agent must send a recommendation to a user that isn't relevant to other group members.

1. **Include the 'targeted' designation in the `Send TM` API**:

    Ensure that you specify the following when the agent sends the message:

    - The conversation (chat or channel) ID and targeted user’s ID (Principal ID or MRI). The intended user must be a member of the chat or channel to receive a targeted message.
    - A flag or API call that marks the message as targeted or ephemeral.

        Use the service URL from the conversation. The `userId` is the user’s Teams ID (MRI) to target, and `conversationId` is the group chat or channel thread ID. The payload of the POST is the activity or message to send, just like a normal message activity.

    To send a targeted activity, ensure that you indicate the `isTargetedActivity` as `true`.

    ```rest
       POST {cloud}/v3/conversations/{conversationId}/activities?isTargetedActivity=true
       POST {cloud}/v3/conversations/{conversationId}/activities/{activityld}?isTargetedActivity=true
    ```

1. **Handle send results and fallbacks**:

    After the agent calls the `Send TM` API, the API returns a success or error.

    - If successful,  the targeted user gets the message sent by the agent.
    - If the `Send TM` API fails, the agent may choose a fallback such as sending a 1:1 chat message as a backup.
    - Some scenarios where a send event might fail are if the user isn’t a group member or if the client doesn’t support targeted messages.

    > [!NOTE]
    > Teams' backward compatibility ensures older clients don't show targeted messages if unsupported and notifies your agent when a client can't process them.

1. **Agent edits and deletes the message**:

    Your agent can update or delete the targeted message after sending it:

    - **Edit**: The agent can update the original targeted message if needed. The agent calls the `Edit TM` API using the message’s `activityId`. The updated message appears only in intended user’s view.

        Use the following code snippet to edit targeted message:

        ```rest
           PUT {cloud}/v3/conversations/{conversationId}/activities
           PUT {cloud}/v3/conversations/{conversationId}/activities/{activityld}
        ```

    - **Delete**: If a user doesn't act on a targeted message, the agent can delete it using delete message API. It avoids leaving stale content.

        Use the following code snippet to delete targeted message:

        ```rest
           DELETE {cloud}/v3/conversations/{conversationId}/activities?isTargetedActivity=true
           DELETE {cloud}/v3/conversations/{conversationId}/activities/{activityld}?isTargetedActivity=true
        ```
-->

<!--
### Use Graph API

Microsoft Graph exposes targeted messaging support. Graph API for Teams chat messages includes a property to send a message to specific users or a new endpoint for targeted messages. It allows workflows or external apps to create targeted messages.

[WIP: Link to Graph API to be added]
-->

## Handle errors

After the agent sends a targeted message using Teams SDK or REST APIs, one of the following responses are returned:

- If successful,  the targeted user gets the message sent by the agent.
- If the message isn't sent, the agent may choose a fallback such as sending a 1:1 chat message as a backup.
  - Some scenarios where a send event might fail are if the user isn’t a group member or if the client doesn’t support targeted messages.

  > [!NOTE]
  > Teams' backward compatibility ensures older clients don't show targeted messages if unsupported and notifies your agent when a client can't process them.

Ensure to handle these errors appropriately in your agent.

# [Teams SDK](#tab/tsdk)

The following table lists the error codes, the error descriptions, and developer actions for Teams SDK:

| Status code | Error code | Description | Developer action |
| --- | --- | --- | --- | --- |
| 400 | `Bad argument` | Missing recipient when creating targeted message. | Ensure `WithRecipient`(account, `isTargeted`: `true`) is called with valid Account object. |
| 400 | `Bad argument` | Recipient passed on update or delete. | Don't pass recipient on update or delete. |
| 404 | `BotNotInConversationRoster` | Bot is not a member of the conversation. | Ensure bot is installed in the conversation before sending targeted messages. |

# [HTTP](#tab/api)

The following table lists the error codes, the error descriptions, and developer actions for REST APIs:

| Status code | Error code | Description | Developer action |
| --- | --- | --- | --- | --- |
| 400 | `Bad argument` | Recipient is missing in the `Send TM` API. | Ensure that recipient is included when the agent sends the message as it's mandatory. |
| 400 | `Bad argument` | Recipient is included in the payload of the `Edit TM` API | Ensure the recipient isn't included in the payload of the `Edit TM` API. |
| 404 | `ActivityNotFoundInConversation` | The message ID provided couldn't be found in the conversation. The message is unavailable as it was deleted or auto removed after 24 hours. | NA |

---

For more information on status and error codes for sending messages, see [status codes from bot conversational APIs](../bots/build-conversational-capability.md#status-codes-from-bot-conversational-apis).

<!--
## Learn about targeted messages

<br>
<details>
<summary><b>What is a targeted message</b></summary>

### What is a targeted message

Targeted messages, also known as ephemeral messages, are delivered to a specific user in a shared conversation. From a single user's perspective, it appears as regular inline messages in a conversation. that appears with the label **Only you can see this message** tagged on them.

:::image type="content" source="../assets/images/agents-in-teams/targeted-messages/targeted-messages.png" alt-text="Image shows user scenarios for targeted messages" border="false" lightbox="../assets/images/agents-in-teams/targeted-messages/targeted-messages.png":::

Some common user scenarios include:

| Scenario | Use for ... | To ... |
| --- | --- | --- |
| Authentication flow | Sending a sign-in card as a targeted message | Enable uninterrupted discussion by a user's log in workflow |
| Help or error responses | Sharing tips, usage examples, or error details | Enable discreet support for the intended user |
| Personal reminders or nudges | Privately sending reminders to a single user | Avoid public callouts or notifications for other group members |
| Helping new users | Sending welcome messages or onboarding help to new members | Avoid unnecessary repetition of such information every time a new user joins |
| AI or Copilot summary | Sharing discussion details for long-running chats for a new participant | Avoid derailing ongoing discussion |

</details>
<br>
<details>
<summary><b>Why use targeted messages</b></summary>

### Why use targeted messages

Among other benefits, targeted messages enhance user experience as follows:

- **Agent sensitivity and alertness**: <br>
    Real-time responses from the agent to the user's requirement in the group setting reinforces that the agent is alert to user actions.

- **Enhanced user experience**: <br>
    Agents can help users engage more openly. A clear message hierarchy that shows only the content that's meant for everyone is permanent in the chat.

- **Human-in-the-loop scenarios**: <br>
    It's useful for scenarios such as authentication prompts, approvals, or informational messages. It helps the user progress through a conversation or a workflow without switching context or seeking assistance elsewhere.

</details>
-->

## See also

[Proactive messages](../bots/how-to/conversations/send-proactive-messages.md)
