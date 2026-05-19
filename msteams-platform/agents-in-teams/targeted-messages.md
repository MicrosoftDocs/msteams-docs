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
  - [Handle agent responses for slash commands](#handle-agent-responses-for-slash-commands)
  - [Handle errors](#handle-errors)

## What is a targeted message

A targeted message lets an agent or a bot send a user-targeted message. It supports all [message capabilities](../bots/build-conversational-capability.md#message-content) like buttons, images, Adaptive Cards, and files, and keeps shared conversations uncluttered. Targeted messages are:

- Delivered to only one user in a group context.
- Auto-purged from clients in 24 hours but might be retained in secure storage based on organizational policy.
- Restricted for user actions such as reaction, replies, and forwarding.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :::image type="content" source="../assets/images/agents-in-teams/targeted-messages/targeted-messages.png" alt-text="Image shows user scenarios for targeted messages" border="false" lightbox="../assets/images/agents-in-teams/targeted-messages/targeted-messages-main.png":::

To recipients, they appear like normal inline chat messages, tagged **Only you can see this message**.

> [!NOTE]
>
> - When you include Adaptive Cards in a targeted message, ensure that user action on the card must not inadvertently create a public response.
> - A targeted message can't be converted into a normal message.

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

You can enable targeted messages using Teams SDK or REST APIs. Teams SDK supports C#, TypeScript, and Python (developer preview).

- [Handle targeted messages](#handle-targeted-messages): You can enable your agent or bot to send, edit, and remove targeted messages in a conversation.
- [Handle agent responses for slash commands](#handle-agent-responses-for-slash-commands): You can also build your agent to handle [slash commands](agent-slash-commands.md) and agent responses to them.

### Handle targeted messages

Sending a targeted message is similar to sending a regular message. Only an agent or a bot can send a targeted message. The agent indicates that the message is intended for a specific user in the conversation, and the platform delivers it to that user. The agent doesn't initiate a separate conversation or create a new chat.

#### Send a targeted message

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

#### Update a targeted message

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

#### Delete a targeted message

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

### Handle agent responses for slash commands

Your agents can send a private or public response to a user's query. You can also choose to include prompt preview in agent responses. You can manage the visibility of agent responses to slash commands and prompt preview using the defined [response flows](agent-slash-commands.md#agent-response-and-prompt-preview-visibility).

Use Teams SDK or REST APIs to handle the user's request and to send the agent response. You can enable the agent to send a private or a public message. You can also enable the agent to update or delete a message that it had previously sent.

#### Send an agent response

Use the following code snippets to enable your agent to respond to a slash command based on [supported scenarios](agent-slash-commands.md#supported-scenarios-for-slash-commands):

# [Private message to a user](#tab/private)

Configure your agent to send a reply only to the person who ran the slash command or to another user in the group or channel. Use one of the following [private message scenarios](agent-slash-commands.md#supported-scenarios-for-slash-commands) to send a message to a single user.

- **Response to the same user**: Use one of the following code snippets for sending an agent response only to the user who triggered the slash command.

  # [C#](#tab/dotnet1)

  ```csharp
  
    teams.OnMessage(async (context, cancellationToken) => {
      if (context.Activity.Recipient?.IsTargeted == true){
        await context.Send(new MessageActivity("Reactive TM").WithRecipient(context.Activity.From, true), cancellationToken);
      }
    });
  ```

  # [TypeScript](#tab/ts1)

  ```typescript
        
    app.on('message', async ({ send, activity }) => {
      if(activity.Recipient.isTargeted) {
        send(new MessageActivity('Reactive TM').withRecipient(activity.From, isTargeted: true))
        }
    });
  ```

  # [Python](#tab/Py1)

  ```python
        
    @app.on_message
    async def handle_message(ctx):
      if getattr(ctx.activity.recipient, "is_targeted", False):
        await ctx.send(MessageActivityInput("Reactive TM").with_recipient(ctx.activity.from, is_targeted=True))
  ```

  # [HTTP](#tab/api1)

  See [Send a targeted message](targeted-messages.md#send-a-targeted-message).
  
- **Response to a different user**: Use one of the following code snippets for sending an agent response to a different user in the group or channel.

  # [C#](#tab/dotnet1)

  ```csharp
    
  teams.OnMessage(async (context, cancellationToken) => {
    if (context.Activity.Recipient?.IsTargeted == true) {
      await context.Send(new MessageActivity("Reactive TM").WithRecipient(new Account {Id = "<userMRI>",Name = "<user Name>", Role = Role.User}, true), cancellationToken);
    }
    });
  ```

  # [TypeScript](#tab/ts1)

  ```typescript
    
  app.on('message', async ({ send, activity }) => {
    if(activity.Recipient.isTargeted) {
    send(new MessageActivity('Reactive TM').withRecipient(new Account {Id: <userMRI>, Name: <user Name>, Role: User}, isTargeted: true))
      }
  });
  ```

  # [Python](#tab/Py1)

  ```python
      
    @app.on_message
    async def handle_message(ctx):
      if getattr(ctx.activity.recipient, "is_targeted", False):
        await ctx.send(MessageActivityInput("Reactive TM").with_recipient(Account(id="<userMRI>", name="<user Name>", role=Role.USER), is_targeted=True))
  ```

  # [HTTP](#tab/api1)

  [WIP: Add code snippet]

# [Public response by the agent](#tab/public)

You can enable the agent to send for the [public response scenario](agent-slash-commands.md#supported-scenarios-for-slash-commands) in a group or a channel if:

- The message requires collaboration from all members.
- The broader visibility adds value.

  # [C#](#tab/dotnet)

    ```csharp
  
      teams.OnMessage(async (context, cancellationToken) => {
        await context.Send(new MessageActivity("Normal msg"), cancellationToken);
      });
    ```
  
  # [TypeScript](#tab/ts)

    ```typescript

    app.on('message', async ({ send, activity }) => {
      send(new MessageActivity('Normal msg'))  
    });
    ```

  # [Python](#tab/Py)

    ```python
  
      @app.on_message
      async def handle_message(ctx):
        await ctx.send(MessageActivityInput("Normal msg"))
    ```
  
  # [HTTP](#tab/api)

    [WIP: Add code snippet]

# [Prompt preview](#tab/preview)

You can enable [prompt preview](agent-slash-commands.md#supported-scenarios-for-slash-commands) using Teams SDK or REST APIs.

For using Teams SDK, follow the code snippet examples given in private message to user and public message by the agent.

- **Use Teams SDK**: Prompt preview is supported for agent's response to user in the following scenarios:

  - Reactive response: When an agent responds within the context of an incoming user interaction (for example, using `send()` or `reply()`):

    - The SDK automatically attaches the `targetedMessageInfo` entity.
    - No additional code is required from the developer.

      Prompt Preview is rendered automatically using the original message context

  - Proactive response: When an agent sends a proactive message, for example, follow-ups, delayed responses, or background workflows:
  
    - The developer must manually attach the entity.
    - The `messageId` of the original user message must be provided.

- **Use REST APIs**: Prompt preview is supported when sending agent responses through the following APIs:

  - **Private agent-to-user response**: The agent replies privately to the user’s message. The response is visible only to the targeted user.

  - **Public agent-to-user response**: The agent replies in the conversation normally. The response is visible to all participants in the chat.

  In both cases, you can implement the prompt preview experience through the same mechanism. It's independent of the visibility scope.

<!--
# [C#](#tab/dotnet)

  Attach the entity manually using the targeted message ID:

  ```csharp
    var message = new MessageActivity("Here is the result!")
      .AddTargetedMessageInfo(targetedMessageId);
        
    // Targeted reply (only the user sees it)
    message.WithRecipient(userAccount, true);
    await context.Send(message, cancellationToken);
        
    // OR public reply (everyone sees it)
    await context.Send(message, cancellationToken);
  ```

# [TypeScript](#tab/ts)

  ```typescript
  const message = new MessageActivity('Here is the result!')
  .addTargetedMessageInfo(targetedMessageId);
    
  // Targeted reply (only the user sees it)
  message.withRecipient(userAccount, true);
  await send(message);
        
  // OR public reply (everyone sees it)
  await send(message);
  ```

# [Python](#tab/Py)

  ```python
  message = MessageActivityInput(text="Here is the result!")
  message.add_targeted_message_info(targeted_message_id)
        
  # Targeted reply (only the user sees it)
  message.with_recipient(user_account, is_targeted=True)
  await ctx.send(message)
        
  # OR public reply (everyone sees it)
  await ctx.send(message)
  ```
---
-->

  ```http
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
      "text": "My bot's reply",
  "entities": [
      {
        "type": "targetedMessageInfo",
        "messageId": "1772129782775"
      }
    ]
  }
  ```

  ---

#### Update an agent response

The agent can edit its original message, if needed. The updated message appears only in the intended user’s view.

Use one of the following code snippets to edit the agent's response:

# [C#](#tab/dotnet1)

  ```csharp
  
    teams.OnMessage(async (context, cancellationToken) => {
      if (context.Activity.Recipient?.IsTargeted == true) {
        var sent = await context.Send(
          new MessageActivity("Processing your request...")
            .WithRecipient(context.Activity.From!, isTargeted: true),
          cancellationToken
        );
    
        await context.Api.Conversations.Activities.UpdateTargetedAsync(
          context.Activity.Conversation!.Id!,
          sent!.Id!,
          new MessageActivity("Updated private response"),
          cancellationToken
        );
      }
    });
  ```
  
# [TypeScript](#tab/ts1)

  ```typescript
  
    app.on('message', async ({ send, activity, api }) => {
      if (activity.Recipient.isTargeted) {
        const sent = await send(
          new MessageActivity('Processing your request...')
            .withRecipient(activity.From, isTargeted: true)
        );
    
        await api.conversations.activities.updateTargeted(
          activity.Conversation.Id,
          sent.Id,
          new MessageActivity('Updated private response')
        );
      }
    });
  ```
  
# [Python](#tab/Py1)

  ```python
  
    @app.on_message
    async def handle_message(ctx):
        if getattr(ctx.activity.recipient, "is_targeted", False):
            sent = await ctx.send(
                MessageActivityInput("Processing your request...").with_recipient(
                    ctx.activity.from,
                    is_targeted=True
                )
            )
    
            await ctx.api.conversations.activities.update_targeted(
                ctx.activity.conversation.id,
                sent.id,
                MessageActivityInput("Updated private response")
            )
  ```

# [HTTP](#tab/api1)

  [WIP: Add code snippet]

---

#### Delete an agent response

Use the following code snippet to enable the agent to delete its response:

# [C#](#tab/dotnet1)

  ```csharp
  
    // Hard delete TM flow
    teams.OnMessageDelete(async (context, cancellationToken) => {
      if (context.Activity.Recipient?.IsTargeted == true){
        // Business logic when message hard delete flow is for TM
      }
    });
  ```

# [TypeScript](#tab/ts1)

  ```typescript

    app.on('messageDelete', async ({ activity, next }) => {
      if(activity.Recipient.isTargeted) {
        // Business logic when message hard delete flow is for TM
      }
    });
  ```

# [Python](#tab/Py1)

  ```python
  
  @app.on_message_delete
  async def handle_message_delete(ctx):
    if getattr(ctx.activity.recipient, "is_targeted", False):
      # Business logic when message hard delete flow is for TM
  ```

# [HTTP](#tab/api1)

  [WIP: Add code snippet]

---

## Handle errors

After the agent sends a targeted message using Teams SDK or REST APIs, it receives one of the following responses:

- If successful, the targeted user gets the message sent by the agent.
- A send event can fail if the user isn’t a group member or the client doesn’t support targeted messages.

  > [!NOTE]
  > Teams' backward compatibility ensures older clients don't show targeted messages if unsupported.

Ensure to handle these errors appropriately in your agent or bot.

# [Teams SDK](#tab/sdk)

The following table lists error codes, error descriptions, and developer actions for Teams SDK:

| Status code | Error code | Description | Developer action |
| --- | --- | --- | --- | --- |
| 400 | `Bad argument` | Missing recipient when creating targeted message. | Ensure `WithRecipient`(account, `isTargeted`: `true`) is called with valid Account object. |
| 400 | `Bad argument` | Recipient passed on update or delete. | Don't pass recipient on update or delete. |
| 403 | `BotNotInConversationRoster` | Bot isn't a member of the conversation. | Ensure bot is installed in the conversation before sending targeted messages. |
| 404 | `ActivityNotFoundInConversation` | The message ID provided couldn't be found in the conversation. The message is unavailable as it was deleted or auto removed after 24 hours. | Ensure the agent either sends a new targeted message or waits for user input, as per business logic. |

# [HTTP](#tab/api1)

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

### Error codes for prompt preview in agent responses

Ensure to handle these errors appropriately in your agent. The following table lists error codes, error descriptions, and developer actions for Teams SDK:

| Status code | Error code | Description | Developer action |
| --- | --- | --- | --- | --- |
| 400 | `INVALID_TARGETED_MESSAGE_ID` | The message ID used for the prompt preview is invalid. | Ensure that the message ID for the targeted message is correct. |
| 404 | `TARGETED_MESSAGE_EXPIRED_OR_DELETED` | The message ID associated with the prompt preview in the agent response could not be found in the conversation. The message is unavailable as it was deleted or auto removed after 24 hours. | Ensure the agent either sends a new targeted message or waits for user input, as per business logic. |

You can also see more information on [error codes for targeted messages](targeted-messages.md#handle-errors).

You’ll find more details on the other error codes for sending messages [here](../bots/build-conversational-capability.md#status-codes-from-bot-conversational-apis).

## See also

- [Proactive messages](../bots/how-to/conversations/send-proactive-messages.md)
- [Send and receive messages](../bots/build-conversational-capability.md)
