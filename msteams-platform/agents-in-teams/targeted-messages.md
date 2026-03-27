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

> [!NOTE]
>
> Support for targeted messages is available in [public developer preview](../resources/dev-preview/developer-preview-intro.md).

Use targeted messages in your agents or bots to send temporary, private messages to a specific user in a channel, group, or meeting chat. You can also enable an agent or bot to edit or delete targeted messages it sends in a conversation.

**Key points**:

- **About targeted messages**
  - [What is a targeted message](#what-is-a-targeted-message)
  - [Why use targeted messages](#why-use-targeted-messages)
- **Enable targeted messages**
  - [Send a targeted message](#send-a-targeted-message)
  - [Update a targeted message](#update-a-targeted-message)
  - [Delete a targeted message](#delete-a-targeted-message)
  - [Handle errors](#handle-errors)

## What is a targeted message

A targeted message lets an agent or a bot send a user-targeted message. It supports all [message capabilities](../bots/build-conversational-capability.md#message-content) like buttons, images, Adaptive Cards, and files, and keeps shared conversations uncluttered. Targeted messages are:

- Delivered to only one user in a group context.
- Auto-purged from clients in 24 hours but might be retained in secure storage based on organizational policy.
- Restricted for user actions such as reaction, replies, and forwarding.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :::image type="content" source="../assets/images/agents-in-teams/targeted-messages/targeted-messages.png" alt-text="Image shows user scenarios for targeted messages" border="false" lightbox="../assets/images/agents-in-teams/targeted-messages/targeted-messages-main.png":::

To recipients, they appear like normal inline chat messages, tagged **Only you can see this message**.

> [!NOTE]
> When you include Adaptive Cards in a targeted message, ensure that user action on the card must not inadvertently create a public response.

<br>
Some common user scenarios include:

| Scenario | Use for ... | To ... |
| --- | --- | --- |
| AI or Copilot summary | Sharing discussion details for long-running chats for a new participant | Avoid derailing ongoing discussion. |
| Support messages | Sending user-specific support messages | Send personal reminders, onboarding messages, and quick check-ins without public callouts or spamming the group. |

## Why use targeted messages

Targeted messages are ideal for contextual information or assistance. Among other benefits, targeted messages enhance user experience as follows:

- **Human-in-the-loop scenarios**: <br>
    It's useful for scenarios such as approvals, or informational messages. It lets a user progress through a conversation or a workflow without switching context or seeking help elsewhere.

- **Enhanced user experience**: <br>
    A clear message hierarchy that shows only the content that's meant for everyone is permanent in the chat.
- **Real-time interaction**: <br>
    Prompt responses from the agent to the user's requirement in the group setting reinforce that the agent is alert to user actions.

## Targeted message developer experience

You can enable targeted messages using Teams SDK or REST APIs. Teams SDK supports C#, TypeScript, and Python (developer preview). You can enable your agent or bot to send, edit, and remove targeted messages in a conversation.

### Send a targeted message

Sending a targeted message is similar to sending a regular message. Only an agent or a bot can send a targeted message. The agent indicates that the message is intended for a specific user in the conversation, and the platform delivers it to that user. The agent doesn't initiate a separate conversation or create a new chat.

Key steps for enabling the agent to send a targeted message are as follows:

1. Determine when a targeted message is appropriate:

    Use a targeted message when the response is for one person, or when sharing it with others would add noise, distraction, or confusion. Common characteristics of these scenarios include (but aren't limited to):

    - The agent's response is relevant only to the user who initiated the interaction.
    - The agent must respond proactively and in context to a specific user’s message or state.
    - The agent is sharing a personalized recommendation, insight, or follow-up that isn’t relevant to others in the thread or channel.

2. Use any of the following code snippets to send a targeted message:

   # [C#](#tab/dotnet1)

    ```csharp
    app.OnMessage(async context =>
    {
    // Using WithRecipient with isTargeted=true explicitly targets the specified recipient
    await context.Send(
            new MessageActivity("This message is only visible to you!")
                .WithRecipient(context.Activity.From, isTargeted: true)
        );
    });
    ```

    For more information, see [Teams SDK](/microsoftteams/platform/teams-ai-library/essentials/sending-messages/overview?pivots=csharp#targeted-messages).

   # [TypeScript](#tab/ts1)

    ```typescript
    import { MessageActivity } from '@microsoft/teams.api';
    
    app.on('message', async ({ send, activity }) => {
      // Using withRecipient with isTargeted=true explicitly targets the specified recipient
      await send(
        new MessageActivity('This message is only visible to you!')
          .withRecipient(activity.from, true)
      );
    });
    ```

    For more information, see [Teams SDK](/microsoftteams/platform/teams-ai-library/essentials/sending-messages/overview?pivots=typescript#targeted-messages).

   # [Python](#tab/Py1)

   ```python
   from microsoft_teams.api import MessageActivity, MessageActivityInput
   from microsoft_teams.apps import ActivityContext
 
    @app.on_message
    async def handle_message(ctx: ActivityContext[MessageActivity]):
      # Using with_recipient with is_targeted=True explicitly targets the specified recipient
      await ctx.send(
          MessageActivityInput(text="This message is only visible to you!")
              .with_recipient(ctx.activity.from_, is_targeted=True)
      )
   ```

    For more information, see [Teams SDK](/microsoftteams/platform/teams-ai-library/essentials/sending-messages/overview?pivots=python#targeted-messages).

   # [HTTP](#tab/api1)

   Include the 'targeted' designation in the `Send TM` API.

   ```REST
   POST {cloud}/v3/conversations/{conversationId}/activities?isTargetedActivity=true
   Authorization: Bearer eyJhbGciOiJIUzI1Ni...
   Content-Type: application/json
   {
       "type": "message",
       "from": {
           "id": "28:c9e...",
           "name": "Contoso"
       },
       "conversation": {
           "id":"x:17I0...",
           "name": "Convo1"
       },
       "recipient": {
           "id": "29:1XJ...",
           "name": "Megan Bowen"
       },    
       "text": "My bot's reply"
   }
   ```

    Ensure that you specify the following when the agent sends the message:

- To send a targeted activity, ensure that you indicate the `isTargetedActivity` as `true`.
- The conversation (chat or channel) ID and targeted user’s ID (Principal ID or MRI). The intended user must be a member of the chat or channel to receive a targeted message.
- A flag or API call that marks the message as targeted or ephemeral.

    Use the service URL from the conversation. The `userId` is the user’s Teams ID (MRI) to target, and `conversationId` is the group chat or channel thread ID. The POST payload is the activity (message) to send, same as for a standard message activity.

### Update a targeted message

The agent can edit the original targeted message if needed. The updated message appears only in the intended user’s view.

Use one of the following code snippets to edit targeted message:

# [C#](#tab/dotnet1)

```csharp
// Update
var response = await context.Send(
    new MessageActivity("Original targeted message")
        .WithRecipient(context.Activity.From, true), cancellationToken);
var conversationId = context.Activity.Conversation.Id;
var messageId = response.Id;

var updatedMessage = new MessageActivity("This message has been updated!");
await context.Api.Conversations.Activities.UpdateTargetedAsync(conversationId, messageId, updatedMessage);
```

# [TypeScript](#tab/ts1)

```typescript
// Update
const response = await context.send(
    new MessageActivity('Original targeted message')
        .withRecipient(context.activity.from, true), cancellationToken);
const conversationId = context.activity.conversation.id;
const messageId = response.id;

const updatedMessage = new MessageActivity('This message has been updated!');
await api.conversations.activities.updateTargeted(conversationId, messageId, updatedMessage);
```

# [Python](#tab/Py1)

```python
# Update
response = await ctx.send(
    MessageActivityInput(text="Original targeted message")
        .with_recipient(ctx.activity.from_property, True), cancellation_token)
conversation_id = ctx.activity.conversation.id
message_id = response.id

updated_message = MessageActivityInput(text="This message has been updated!")
await ctx.api.conversations.activities.update_targeted(conversation_id, message_id, updated_message)
```

# [HTTP](#tab/api1)

The agent calls the `Edit TM` API using the message’s `activityId`.

```REST
PUT {cloud}/v3/conversations/{conversationId}/activities?isTargetedActivity=true
PUT {cloud}/v3/conversations/{conversationId}/activities/{activityId}?isTargetedActivity=true
Authorization: Bearer eyJh...
Content-Type: application/json
{
    "type": "message",
    "text": "This message has been updated"
}
```

---

### Delete a targeted message

Agents can delete messages within 24 hours if they've been acted on or they are no longer relevant. Messages are automatically purged from clients after 24 hours.

Use one of the following code snippets to delete targeted message:

# [C#](#tab/dotnet1)

```csharp
// Delete
await context.Api.Conversations.Activities.DeleteTargetedAsync(conversationId, messageId);
```

# [TypeScript](#tab/ts1)

```typescript
// Delete
await api.conversations.activities.deleteTargeted(conversationId, messageId);
```

# [Python](#tab/Py1)

```python
#Delete
await ctx.api.conversations.activities.delete_targeted(conversation_id, message_id)
```

# [HTTP](#tab/api1)

Use the delete message API for enabling the agent to remove targeted messages. It avoids leaving stale content.

```REST
DELETE {cloud}/v3/conversations/{conversationId}/activities?isTargetedActivity=true
DELETE {cloud}/v3/conversations/{conversationId}/activities/{activityId}?isTargetedActivity=true
Authorization: Bearer eyJh...
Content-Type: application/json

No body required.
```

---

## Handle errors

After the agent sends a targeted message using Teams SDK or REST APIs, it receives one of the following responses:

- If successful, the targeted user gets the message sent by the agent.
- A send event can fail if the user isn’t a group member or the client doesn’t support targeted messages.

  > [!NOTE]
  > Teams' backward compatibility ensures older clients don't show targeted messages if unsupported.

Ensure to handle these errors appropriately in your agent or bot.

# [Teams SDK](#tab/tsdk)

The following table lists error codes, error descriptions, and developer actions for Teams SDK:

| Status code | Error code | Description | Developer action |
| --- | --- | --- | --- | --- |
| 400 | `Bad argument` | Missing recipient when creating targeted message. | Ensure `WithRecipient`(account, `isTargeted`: `true`) is called with valid Account object. |
| 400 | `Bad argument` | Recipient passed on update or delete. | Don't pass recipient on update or delete. |
| 403 | `BotNotInConversationRoster` | Bot isn't a member of the conversation. | Ensure bot is installed in the conversation before sending targeted messages. |
| 404 | `ActivityNotFoundInConversation` | The message ID provided couldn't be found in the conversation. The message is unavailable as it was deleted or auto removed after 24 hours. | Ensure the agent either sends a new targeted message or waits for user input, as per business logic. |

# [HTTP](#tab/api)

The following table lists error codes, error descriptions, and developer actions for REST APIs:

| Status code | Error code | Description | Developer action |
| --- | --- | --- | --- | --- |
| 400 | `Bad argument` | Recipient is missing in the `Send TM` API. | Ensure that recipient is included when the agent sends the message as it's mandatory. |
| 400 | `Bad argument` | Recipient is included in the payload of the `Edit TM` API | Ensure the recipient isn't included in the payload of the `Edit TM` API. |
| 403 | `BotNotInConversationRoster` | Bot isn't a member of the conversation. | Ensure bot is installed in the conversation before sending targeted messages. |
| 404 | `ActivityNotFoundInConversation` | The message ID provided couldn't be found in the conversation. The message is unavailable as it was deleted or auto removed after 24 hours. | Ensure the agent either sends a new targeted message or waits for user input, as per business logic. |

---
> [!TIP]
> It's recommended that if sending a targeted message fails, consider a fallback mechanism such as sending a 1:1 chat message.

You’ll find more details on the other error codes for sending messages [here](../bots/build-conversational-capability.md#status-codes-from-bot-conversational-apis).

## See also

- [Proactive messages](../bots/how-to/conversations/send-proactive-messages.md)
- [Send and receive messages](../bots/build-conversational-capability.md)
