---
title: Targeted Messages
description: Learn about enabling targeted messages for agents in Teams.
ms.localizationpriority: high
ms.date: 02/06/2025
ms.topic: reference
---

# Enable targeted messages for agents

Targeted messages are temporary, private messages sent by agents or bots to a single user in a channel or group. They support all message capabilities like buttons, images, and files and are ideal for contextual information or help without cluttering the conversation.

<!--
Targeted messages are temporary, user-specific messages that appear in a group chat, meeting, or channel. Agents can support users without adding permanent noise for the rest of the group. They can include most message capabilities like interactive Adaptive Cards with buttons, images, or file attachments. For example, use a targeted message to share a sign‑in card or an error message with a help link. Unlike standard messages, targeted messages are:

- Triggered in response to user action.
- Delivered to only one user in a group context.
- Visible up for a limited time in the client.
- Restricted for user actions such as reaction, replies, and forwarding.

Targeted messages are best suited for short-term, action-driven communication. Use them when you want the agent to respond in-the-moment as required by a specific user.
-->

**Key points**:

- **Enable targeted messages**
  - [Use Teams SDK](#use-teams-sdk)
  - [Use REST API](#use-rest-api)
  - [Use Graph API](#use-graph-api)
  - [Handle errors](#handle-errors)
- **About targeted messages**
  - [What is a targeted message](#what-is-a-targeted-message)
  - [Why use targeted messages](#why-use-targeted-messages)

## Targeted message developer experience

You can send a targeted message just as a regular message. The agent indicates that the message is intended for a specific user in the conversation, and the platform delivers it to that user. The agent doesn't initiate a separate conversation or create a new chat.

### Use Teams SDK

You can enable targeted messages using Teams SDK. It supports C#, TypeScript, and Python (for developer preview).

[WIP: Code snippets and link to be added once Teams SDK PR is published.]

- Send targeted messages

  # [TypeScript](#tab/ts1)

    ```typescript
    app.on('message', async ({ send, activity }) => {
      // Send a targeted message that only the sender can see
    await send('This message is only visible to you!', { isTargeted: true });
    });
    ```

  # [C#](#tab/dotnet1)

    ```csharp
    [Message]
    public async Task OnMessage([Context] IContext.Client client)
    {
        // Send a private reply visible only to the sender
        await client.Send("Hey! This is a private message just for you!", isTargeted: true);
    }
    ```

  # [Python](#tab/Py1)

    ```python
    public static class Notifications
    {
        public static async Task SendProactiveTargeted(string userId)
        {
            var conversationId = (string?)storage.Get(userId);
    
            if (conversationId is null) return;
    
            // Set Recipient to specify who should receive the private message
            var targetedMessage = new MessageActivity("Hey! This is a private message just for you!")
            {
                Recipient = new ChannelAccount { Id = userId }
            };
    
            await app.Send(conversationId, targetedMessage, isTargeted: true);
        }
    }
    ```

- Send proactive targeted messages

  # [TypeScript](#tab/ts2)

    ```typescript
    import { MessageActivity } from '@microsoft/teams.api';

    import { App } from '@microsoft/teams.apps';
    // ...
    
    // This would be some persistent storage
    const myConversationIdStorage = new Map<string, string>();
    
    // Installation is just one place to get the conversation id. All activities
    // have the conversation id, so you can use any activity to get it.
    app.on('install.add', async ({ activity, send }) => {
      // Save the conversation id in
      myConversationIdStorage.set(activity.from.aadObjectId!, activity.conversation.id);
    
      await send('Hi! I am going to remind you to say something to me soon!');
      notificationQueue.addReminder(activity.from.aadObjectId!, sendProactiveNotification, 10_000);
    });
    ```

  # [C#](#tab/dotnet2)

    ```csharp
    public static class Notifications
    {
        public static async Task SendProactiveTargeted(string userId)
        {
            var conversationId = (string?)storage.Get(userId);
    
            if (conversationId is null) return;
    
            // Set Recipient to specify who should receive the private message
            var targetedMessage = new MessageActivity("Hey! This is a private message just for you!")
            {
                Recipient = new ChannelAccount { Id = userId }
            };
    
            await app.Send(conversationId, targetedMessage, isTargeted: true);
        }
    }
    ```

  # [Python](#tab/Py2)

    ```python
    from microsoft_teams.api import MessageActivityInput, Account
    # ...

    async def send_targeted_proactive_notification(user_id: str, recipient_id: str):
    conversation_id = storage.get(user_id, "")
    if not conversation_id:
        return
    
    activity = MessageActivityInput(text="This is a private reminder just for you!")
    activity.recipient = Account(id=recipient_id, role="user")
    
    await app.send(conversation_id, activity, is_targeted=True)
    ```

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

        <!--Use the service URL from the conversation. The `userId` is the user’s Teams ID (MRI) to target, and `conversationId` is the group chat or channel thread ID. The payload of the POST is the activity or message to send, just like a normal message activity.-->

    To send a targeted activity, ensure that you indicate the `isTargetedActivity` as `true`.

    ```rest
       POST {cloud}/v3/conversations/{conversationld}/activities?isTargetedActivity=true
       POST {cloud}/v3/conversations/{conversationld}/activities/{activityld}?isTargetedActivity=true
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
           PUT {cloud}/v3/conversations/{conversationld}/activities
           PUT {cloud}/v3/conversations/{conversationld}/activities/{activityld}
        ```

    - **Delete**: If a user doesn't act on a targeted message, the agent can delete it using delete message API. It avoids leaving stale content.

        Use the following code snippet to delete targeted message:

        ```rest
           DELETE {cloud}/v3/conversations/{conversationld}/activities?isTargetedActivity=true
           DELETE {cloud}/v3/conversations/{conversationld}/activities/{activityld}?isTargetedActivity=true
        ```

<!--
### Use Graph API

Microsoft Graph exposes targeted messaging support. Graph API for Teams chat messages includes a property to send a message to specific users or a new endpoint for targeted messages. It allows workflows or external apps to create targeted messages.

[WIP: Link to Graph API to be added]
-->

### Handle errors

Ensure to handle these errors appropriately in your agent. The following table lists the error codes and the descriptions under which the errors are generated:

| Status code | Error code | Description | Developer action |
| --- | --- | --- | --- | --- |
| 400 | `Bad request` | Recipient is missing in the `Send TM` API. | Ensure that recipient is included when the agent sends the message as it's mandatory. |
| 400 | `Bad request` | Recipient is included in the payload of the `Edit TM` API | Ensure the recipient isn't included in the payload of the `Edit TM` API. |

For more information on status and error codes for sending messages, see [status codes from bot conversational APIs](../bots/build-conversational-capability.md#status-codes-from-bot-conversational-apis).

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

## See also

[Proactive messages](../bots/how-to/conversations/send-proactive-messages.md)
