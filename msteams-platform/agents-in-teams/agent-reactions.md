---
title: Agent Reactions in Teams - Overview
description: Learn about how you can use reactions for agents in Teams.
ms.localizationpriority: high
ms.date: 01/28/2026
ms.topic: reference
---

<!-- markdownlint-disable MD051 -->
<!-- markdownlint-disable MD001 -->
<!-- markdownlint-disable MD024 -->

# Enable agent reactions in Teams

You can build agents that react to messages as well as send text, minimizing notification fatigue while communicating actions efficiently.

:::image type="content" source="../assets/images/agents-in-teams/teams-reactions/agent-reactions.png" alt-text="Image shows agent reactions in Teams."  border="false" lightbox="../assets/images/agents-in-teams/teams-reactions/agent-reactions.png":::

Map emojis and reactions to specific agent actions and use the ID to send the right reaction in the conversation.

**Key highlights**:

- [Add reactions](#enable-an-agent-to-add-reactions)
- [Remove reactions](#enable-an-agent-to-remove-reactions)
- [View response codes](#response-codes)
- [Select skin tone for emojis](#modify-skin-tone-for-emojis)
- [Best practices](#best-practices)

## Enable an agent to add reactions

You can enable an agent to send reactions using Teams SDK or REST APIs. An agent can send up to two reactions per second. To enable an agent to send a reaction to a message:

1. Use the [Teams reactions reference](teams-reactions-reference.md) for getting the `reactionId` for the reactions that you want to add. You can also select a particular [skin tone for the emoji](#modify-skin-tone-for-emojis) by selecting its `reactionId`.
1. Use the `addReaction` method from Teams SDK or call the `add reaction` API to send reactions to messages.

The following code snippet shows an example of adding the *Waving hand* reaction to a message:

# [CSharp](#tab/cs1)

[WIP: Add link to Teams SDK docs.]

```csharp
app.OnMessage(async context =>
{
    await context.Send("Hello! I'll react to this message.");

    // Add a reaction to the incoming message
    await context.Api.Conversations.Reactions.AddAsync(
        context.Activity.Conversation.Id,
        context.Activity.Id,
        ReactionType.1f44b_wavinghand
    );
});
```

# [TypeScript](#tab/ts1)

[WIP: Add link to Teams SDK docs.]

```typescript
app.on('message', async ({ activity, api, send }) => {
  await send("Hello! I'll react to this message.");

  // Add a reaction to the incoming message
  await api.conversations.reactions.add(activity.conversation.id, activity.id, '1f44b_wavinghand');
});

```

# [Python](#tab/py1)

[WIP: Add link to Teams SDK docs.]

```python
@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    await ctx.send("Hello! I'll react to this message.")

    # Add a reaction to the incoming message
    await ctx.api.conversations.reactions.add(
        ctx.activity.conversation.id,
        ctx.activity.id,
        '1f44b_wavinghand'
    )
```

# [API](#tab/h1)

```REST
PUT {cloud}/{tenantId}/v3/conversations/{conversationId}/activities/{activityId}/reaction/{1f44b_wavinghand}
```

Where,

- `conversationId` is the thread or chat identifier.
- `activityId` represents the message or activity ID.
- `reactionId` is the ID of the emoji that you want to add.

---

### Handle existing agent reactions

You can handle reaction requests when an agent has already reacted to a message.

- **Reaction already added**: If an agent tries to react to a message it has already reacted to, the action succeeds but no duplicate reaction is added.
- **Replace a reaction**: To enable the agent to replace a reaction it already added, [remove the reaction](#enable-an-agent-to-remove-reactions) that was added, and then [add the new reaction](#enable-an-agent-to-add-reactions).

## Enable an agent to remove reactions

You can choose to enable an agent to remove its reaction from messages. To remove the agent's reaction from a message:

1. Use the [Teams reactions reference](teams-reactions-reference.md) for getting the `reactionId` for the reactions that you want to remove.
1. Use Teams SDK or REST APIs to remove reactions from messages.

The following code snippet shows an example of removing a reaction from a message:

# [CSharp](#tab/cs1)

[WIP: Add link to Teams SDK docs.]

```csharp
app.OnMessage(async context =>
{
    // First, add a reaction
    await context.Api.Conversations.Reactions.AddAsync(
        context.Activity.Conversation.Id,
        context.Activity.Id,
        ReactionType.1f44b_wavinghand
    );

    // Wait a bit, then remove it
    await Task.Delay(2000);
    await context.Api.Conversations.Reactions.DeleteAsync(
        context.Activity.Conversation.Id,
        context.Activity.Id,
        ReactionType.1f44b_wavinghand
    );
});
```

# [TypeScript](#tab/ts1)

[WIP: Add link to Teams SDK docs.]

```typescript
app.on('message', async ({ activity, api }) => {
  // First, add a reaction
  await api.conversations.reactions.add(activity.conversation.id, activity.id, '1f44b_wavinghand');

  // Wait a bit, then remove it
  await new Promise((resolve) => setTimeout(resolve, 2000));
  await api.conversations.reactions.delete(activity.conversation.id, activity.id, '1f44b_wavinghand');
});
```

# [Python](#tab/py1)

[WIP: Add link to Teams SDK docs.]

```python
import asyncio

@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    # First, add a reaction
    await ctx.api.conversations.reactions.add(
        ctx.activity.conversation.id,
        ctx.activity.id,
        '1f44b_wavinghand'
    )

    # Wait a bit, then remove it
    await asyncio.sleep(2)
    await ctx.api.conversations.reactions.delete(
        ctx.activity.conversation.id,
        ctx.activity.id,
        '1f44b_wavinghand'
    )
```

# [API](#tab/h1)

```REST
DELETE {cloud}/{tenantId}/v3/conversations/{conversationId}/activities/{activityId}/reaction/{1f44b_wavinghand}
```

Where,

- `conversationId` is the thread or chat identifier.
- `activityId` represents the message or activity ID.
- `reactionId` is the ID of the emoji that you want to remove.

No additional payload is required as the reaction is defined in the URL.

---

## Response codes

The following are the success and error codes:

### Success codes

| Response codes | Description | Action |
| --- | --- | --- |
| `200` | Reaction added successfully | NA |
| `200` | Deleted reaction successfully | NA |
| `200` | Deleted non-existent reaction | NA |

> [!NOTE]
> `200 OK` is also returned if the agent or bot adds a reaction that already exists or removes one that isn’t applied. These operations don’t return errors.

### Client error codes

| Response codes | Error message | Description | Action |
| --- | --- | --- | --- |
| `400` | Bad Request | The `reactionId` is invalid or exceeds the maximum allowed length. | Use a valid `reactionId` from the [supported reactions](teams-reactions-reference.md) list . |
| `401` | `BotNotRegistered` | The agent or bot doesn't have a valid registration. | Verify your agent or bot is registered in Azure Bot Service and the app ID is correct. |
| `403` | `IntegrationAuthFailure` | The authentication token failed validation. | Ensure the agent or bot token is valid, not expired, and issued for the correct audience. |
| `403` | `BotNotInConversation` | The agent or bot attempted to react in a conversation it doesn't have access to. | The agent or bot must be installed in the chat or channel before sending reactions. |
| `404` | `ConversationNotFound` | The target conversation thread couldn't be located. | Verify the `conversationId` is correct and the conversation still exists. |
| `404` | `ConversationNotFound` | The `messageId` couldn't be found, or the request URL is malformed. | Verify the `messageId` exists and the URL contains no whitespace or invalid characters. |
| `405` | `ApiNotEnabled` | Reaction extensibility isn't enabled for this environment. | Confirm the feature is available in your tenant. |
| `429` | Too many requests | Throttling limit reached | - Reduce the frequency of message reaction calls. Agent reactions are limited to two reactions per second. <br> - Implement exponential backoff and retry after the `Retry-After` header duration. |

### Server error codes

| Response codes | Error message | Description | Action |
| --- | --- | --- | --- |
| `500` | Internal Server Error | An unexpected error occurred on the server. | Retry the request. If persistent, file a support ticket with the `x-ms-request-id` from response headers. |
| `502` | Bad Gateway | A downstream service dependency failed. | Retry after a brief delay. |
| `504` | Gateway Timeout | An upstream service dependency timed out. | Retry after a brief delay. If persistent, check [Teams Service Health](https://admin.microsoft.com/servicestatus) . |

You can find more information on [error codes for sending messages](../bots/build-conversational-capability.md).

## Modify skin tone for emojis

The [Teams reactions reference](teams-reactions-reference.md) shows skin tone options for emojis. The emojis that offer skin tone are tagged as **Diverse**. To select a particular skin tone:

1. Choose a reaction tagged as **Diverse**.
1. Copy the `reactionId` for the **Diverse - skin tone** that you want to use in your agent.

    :::image type="content" source="../assets/images/agents-in-teams/teams-reactions/select-diverse-skin-tone.png" alt-text="Image shows a list of diverse skin tones." border="false":::

1. Use the copied `reactionId` in your agent's payload to send the selected reaction in the conversation.

The following code snippet shows an example of selecting a specific skin tone of a diverse reaction to a message:

# [CSharp](#tab/cs1)

[WIP: Add link to Teams SDK docs.]

```csharp
app.OnMessage(async context =>
{
    await context.Send("Hello! I'll react to this message.");

    // Add a reaction to the incoming message
    await context.Api.Conversations.Reactions.AddAsync(
        context.Activity.Conversation.Id,
        context.Activity.Id,
        ReactionType.1f44b_wavinghand-tone4
    );
});
```

# [TypeScript](#tab/ts1)

[WIP: Add link to Teams SDK docs.]

```typescript
app.on('message', async ({ activity, api, send }) => {
  await send("Hello! I'll react to this message.");

  // Add a reaction to the incoming message
  await api.conversations.reactions.add(activity.conversation.id, activity.id, '1f44b_wavinghand-tone4');
});
```

# [Python](#tab/py1)

[WIP: Add link to Teams SDK docs.]

```python
@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    await ctx.send("Hello! I'll react to this message.")

    # Add a reaction to the incoming message
    await ctx.api.conversations.reactions.add(
        ctx.activity.conversation.id,
        ctx.activity.id,
        '1f44b_wavinghand-tone4'
    )
```

# [API](#tab/h1)

```REST
PUT {cloud}/{tenantId}/v3/conversations/{conversationId}/activities/{activityId}/reaction/{1f44b_wavinghand-tone4}
```

Where,

- `conversationId` is the thread or chat identifier.
- `activityId` represents the message or activity ID.
- `reactionId` is the ID of the emoji that you want to add.

---

## Best practices

- Employ reactions to improve user experience such as acknowledging a message or providing succinct feedback.
- Avoid excessive use of reactions to minimize notification fatigue for users.
- Ensure your agent's reactions fit the message context and avoid having your agent send multiple reactions to the same message without first removing any existing reactions.

## See also

- Teams SDK [WIP: Links to be added when available]
- [Teams reaction reference](teams-reactions-reference.md)
