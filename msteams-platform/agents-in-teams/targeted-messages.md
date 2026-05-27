---
title: Targeted Messages
description: Learn about enabling targeted messages for agents in Teams.
ms.localizationpriority: high
ms.date: 05/27/2026
ms.topic: article
---

<!-- markdownlint-disable MD023 -->
<!-- markdownlint-disable MD001 -->
<!-- markdownlint-disable MD024 -->

# Send and receive targeted messages in group conversations

> [!NOTE]
>
> Support for targeted messages is available in [public developer preview](../resources/dev-preview/developer-preview-intro.md).

_Targeted messaging_ enables users and agents to privately communicate with each other in channels, group chats, and meeting chats.

:::image type="content" source="../assets/images/agents-in-teams/targeted-messages/targeted-messages.png" alt-text="Image shows user scenarios for targeted messages" border="false" lightbox="../assets/images/agents-in-teams/targeted-messages/targeted-messages-main.png":::

With targeted messages, a user can privately send a message or command to an agent that remains in the context of a group conversation. When the agent responds in the chat or channel, it can use a targeted message to make the response visible only to that user. Agents can also proactively send targeted messages to users to privately communicate contextual information, offer assistance, or provide reminders relevant to the group conversation.

Targeted messages can be sent by a user to a single agent, or by an agent to a single user. Targeted messaging between two users or two agents isn't supported.

## What are targeted messages

Targeted messages are private one-to-one messages between a user and an agent in a group conversation. They're presented in the flow of the conversation, but only the sender and their single recipient can see them. Targeted messages disappear from Teams clients after 24 hours to avoid cluttering conversations, but might be retained in secure storage to comply with organizational retention requirements.

Sending targeted messages to any user in a group conversation is a capability of all Teams agents. To be eligible to _receive_ targeted messages, an agent must opt in via its configuration; see [Receive targeted messages](#receive-targeted-messages).

Targeted messaging enables users to privately interact with agents without distracting other users or exposing interactions and information that aren't meant for the group. Consider the following scenarios:

- A user can ask an agent to generate a summary of the discussion without the other participants seeing the request or the response.
- A user can privately ask for information from an agent with the intent of sharing it with the group, but wants to confirm the contents of the message first. The agent can respond privately, with a [suggested action](../bots/how-to/conversations/prompt-suggestions.md#suggested-actions-1) requesting the user's approval to share its response. When the user approves, the agent resends the message publicly.
- A user can direct and monitor background work with agents, referencing the context of the conversation, without distracting the other participants.
- An agent can detect a new user entering a large, long-running conversation and proactively send them a private welcome message and a summary.

> [!IMPORTANT]
> When designing agent interactions for group conversations, avoid public messages or Adaptive Card actions that might conflict with user expectations of privacy. For more information, see [Best practices and design guidance](#best-practices-and-design-guidance).

### Key aspects of targeted messages

Targeted messages:

- Are enabled only for one-to-one interactions between an agent and a user. They can be sent only to a single recipient and aren't available for user-to-user or agent-to-agent communications.
- Support all the [capabilities of standard messages](../bots/build-conversational-capability.md#message-content) like buttons, images, Adaptive Cards, and files, but don't support reactions, replies, or forwarding.
- Generally operate the same way as standard messages, with the same API operations. Users and agents can modify or delete targeted messages after sending them, but targeted messages can't be made publicly visible once sent. If a scenario calls for a private message to be made public, the sender should resend it as a standard message; see [Best practices and design guidance](#best-practices-and-design-guidance).
- Expire 24 hours after being sent. When a targeted message expires, it's deleted from all Teams clients and no longer visible, although it might be retained in secure storage based on organizational policy.
- Aren't to untargeted users even if they're using an older version of the Teams client that doesn't support targeted messages.

## User experience

Targeted messages sent or received by a user are presented in the flow of the conversation with an indicator stating **Only you can see this message**.

:::image type="content" source="../assets/images/agents-in-teams/targeted-messages/targeted-message-example.png" alt-text="Image shows an example of targeted message." border="false":::

Users send targeted messages to an agent by invoking its name as a _slash command_.

When a user enters a <kbd>/</kbd> in an empty compose box, Teams displays an autocomplete menu containing [built-in commands for common tasks](https://support.microsoft.com/office/use-commands-in-microsoft-teams-88f61508-284d-417f-a53d-9e082164050b) that can be invoked immediately by selecting them. In addition to the built-in commands, the menu also includes a command for each agent in the current conversation that's eligible to receive targeted messages. Commands for sending targeted messages to an agent are always named for the agent and display its icon.

Activating one of these agent-named commands switches the compose box to targeted message mode for the agent, displaying a notice that the message will be sent privately. After the user composes a message and selects **Send**, the resulting message will be targeted to the agent and can't be seen by other participants in the conversation.

For more about slash commands, including how to register extra named slash commands that can be dispatched to your agent, see [Expose slash commands from agents and apps](agent-slash-commands.md).

## Implement targeted messages

Targeted messages are sent and received using the same operations as [standard single-recipient messages](/microsoftteams/platform/teams-sdk/essentials/sending-messages/overview?pivots=typescript) in the Teams SDK, but have a boolean property indicating whether they're targeted.

### Receive targeted messages

An agent must opt in via its manifest to be able to receive targeted messages. If not opted in, users aren't given the option to send a targeted message to the agent.

Agents that opt in to receive targeted messages should always check the visibility of messages they receive and take it into consideration when generating responses and tracking the context of a conversation. For more information, see [Best practices and design guidance](#best-practices-and-design-guidance).

To opt in to receive targeted messages, an agent's `bots` entry in its app manifest must include a `true` value for the `supportsTargetedMessages` property.

```json
{
    "bots": [
        {
            "botId": "{{BOT_ID}}",
            "scopes": ["personal", "team", "groupChat"],
            "supportsTargetedMessages": true
        }
    ]
}
```

Agents receive messages via standard message events. Targeted messages can be distinguished from public messages as shown in the following snippets.

# [C#](#tab/dotnet1)

```csharp

  teams.OnMessage(async (context, cancellationToken) => {
    if (context.Activity.Recipient?.IsTargeted == true){
      // Handle message event
    }
  });
```

# [TypeScript](#tab/ts1)

```typescript
      
  app.on('message', async ({ send, activity }) => {
    if(activity.Recipient.isTargeted) {
       // Handle message event
      }
  });
```

# [Python](#tab/Py1)

```python
      
  @app.on_message
  async def handle_message(ctx):
    if getattr(ctx.activity.recipient, "is_targeted", False):
      # Handle message event
```

---

### Send a targeted message

All agents in Teams are automatically eligible to send targeted messages.

# [C#](#tab/dotnet1)

To send a targeted message, use `WithRecipient` to specify a single recipient by their ID, and provide a value of `true` for the `isTargeted` argument. The recipient must be a member of the chat or channel.

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

# [TypeScript](#tab/ts1)

To send a targeted message, use `withRecipient` to specify a single recipient by their ID, and provide a value of `true` for the `isTargeted` argument. The recipient must be a member of the chat or channel.

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

# [Python](#tab/Py1)

To send a targeted message, use `with_recipient` to specify a single recipient by their ID, and provide a value of `True` for the `is_targeted` argument. The recipient must be a member of the chat or channel.

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

---

If attempting to send a targeted message results in an error, consider sending a 1:1 chat message as a fallback.

### Update or delete a targeted message

Targeted messages can be updated and deleted in the same way as standard messages, with the following limitations:

- The visibility of a targeted message can't be changed
- Targeted messages expire after 24 hours and are automatically deleted from clients. Attempting to modify or delete an expired message results in an error.

To update a targeted message, use one of the following code snippets:

# [C#](#tab/dotnet2)

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

# [TypeScript](#tab/ts2)

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

# [Python](#tab/Py2)

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

# [HTTP](#tab/api2)

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

Delete a targeted message using one of the following code snippets:

# [C#](#tab/dotnet2)

```csharp
// Delete
await context.Api.Conversations.Activities.DeleteTargetedAsync(conversationId, messageId);
```

# [TypeScript](#tab/ts2)

```typescript
// Delete
await api.conversations.activities.deleteTargeted(conversationId, messageId);
```

# [Python](#tab/Py2)

```python
#Delete
await ctx.api.conversations.activities.delete_targeted(conversation_id, message_id)
```

# [HTTP](#tab/api2)

Use the delete message API for enabling the agent to remove targeted messages. It avoids leaving stale content.

```REST
DELETE {cloud}/v3/conversations/{conversationId}/activities?isTargetedActivity=true
DELETE {cloud}/v3/conversations/{conversationId}/activities/{activityId}?isTargetedActivity=true
Authorization: Bearer eyJh...
Content-Type: application/json

No body required.
```

---

## Best practices and design guidance

Agents that opt in to receive targeted messages should always check the visibility of messages they receive and take it into consideration when generating responses and tracking the context of a conversation. Users expect the contents of targeted messages to remain private across all contexts.

Targeted requests to an agent should only result in targeted responses unless the user or the situation explicitly calls for a public response. Choosing between a public or targeted response to a public request can require careful judgement. Public messages should always benefit the entire group and shouldn't contain any private information.

Take care when using Adaptive Cards in targeted messages. Using a targeted message to send an interactive Adaptive Card doesn't prevent it from generating public activity, which users might not expect.

Consider using a targeted message to ask a user if information should be made public. The visibility of a targeted message can't be changed, but the agent can attach [suggested actions](../bots/how-to/conversations/prompt-suggestions.md#suggested-actions-1) to request approval to share the contents publicly, then delete the original message and resend it as public if the user approves.

Targeted messages aren't recommended for one-to-one bot chats or for group scenarios that are purely informational and don't require user-specific context.

## Errors

Targeted message operations can return `400 Bad argument` when the payload is invalid. On create, this error usually means the recipient is missing. Call `WithRecipient(account, isTargeted: true)` with a valid Account object. The same requirement applies to the `Send TM` API.

`400 Bad argument` can also occur when recipient data is included where it shouldn't be. Don't pass a recipient on update or delete, and don't include it in the `Edit TM` API payload.
`403 BotNotInConversationRoster` means the bot isn't a member of the conversation. Install the bot in the conversation before sending targeted messages. `404 ActivityNotFoundInConversation` means the message ID wasn't found. The message might have been deleted or expired after 24 hours. In that case, send a new targeted message or wait for user input, based on business logic.

In prompt preview scenarios, `400 INVALID_TARGETED_MESSAGE_ID` means the targeted message ID is invalid. Verify that the ID is correct. `404 TARGETED_MESSAGE_EXPIRED_OR_DELETED` means the referenced message was deleted or expired after 24 hours. In that case, send a new targeted message or wait for user input, based on business logic.

More details on other messaging error codes can be found [here](../bots/build-conversational-capability.md#status-codes-from-bot-conversational-apis).

## See also

- [Proactive messages](../bots/how-to/conversations/send-proactive-messages.md)
- [Send and receive messages](../bots/build-conversational-capability.md)
- [Expose slash commands from agents and apps](agent-slash-commands.md)
- [Suggested actions](../bots/how-to/conversations/prompt-suggestions.md#suggested-actions-1)
