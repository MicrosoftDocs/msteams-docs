---
title: Agent Reactions in Teams - Overview
description: Learn about how you can use reactions for agents in Teams.
ms.localizationpriority: high
ms.date: 01/28/2026
ms.topic: reference
---

<!-- markdownlint-disable MD051 -->

# Enable agent reactions in Teams

You can build agents to communicate beyond text using reactions, emojis, and context-aware actions. It signals agent's intentional design to improve user trust and make agent behavior more transparent and shows how the agent understands user intent and need.

:::image type="content" source="../assets/images/agents-in-teams/teams-reactions/agent-reactions.png" alt-text="Image shows agent reactions in Teams."  border="false" lightbox="../assets/images/agents-in-teams/teams-reactions/agent-reactions.png":::

Map emojis and reactions to specific agent actions and use the ID to send the right reaction in the conversation.

**Key highlights**:

- [Add reactions](#enable-an-agent-to-add-reactions)
- [Remove reactions](#enable-an-agent-to-remove-reactions)
- [View response codes](#response-codes)
- [Select skin tone for emojis](#modify-skin-tone-for-emojis)
- [Best practices](#best-practices)

## Enable an agent to add reactions

You can use the `addReaction` method from Teams SDK or call the `add reaction` API directly to send reactions to messages. Reactions sent by agents are limited to two reactions per second. To enable agents to send reactions to a message:

1. Use the [Teams reactions reference](teams-reactions-reference.md) for getting the `reactionId` for the reactions that you want to add. You can also select a particular [skin tone for the emoji](#modify-skin-tone-for-emojis) by selecting its `reactionId`.
1. Use the `addReaction` method from Teams SDK or call the `add reaction` API to send reactions to messages.

The following code snippet shows an example of adding the *Waving hand* reaction to a message:

# [TypeScript](#tab/ts1)

[WIP: Add link to Teams SDK docs.]

```typescript
app.on('message', async ({ activity, api, send }) => {
  await send("Hello! I'll react to this message.");

  // Add a reaction to the incoming message
  await api.conversations.reactions.add(activity.conversation.id, activity.id, '1f44b_wavinghand');
});

```

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

> [!NOTE]
> If the agent tries to react to a message it has already reacted to, the action succeeds but no duplicate reaction is added.

## Enable an agent to remove reactions

You can choose to enable agents to remove reactions from messages. To enable agents to remove reactions from a message:

1. Use the [Teams reactions reference](teams-reactions-reference.md) for getting the `reactionId` for the reactions that you want to remove.
1. Use the `removeReaction` method from Teams SDK or call the `remove reaction` API to remove reactions from messages.

The following code snippet shows an example of removing a reaction from a message:

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

### Error codes

| Response codes | Error message | Description | Action |
| --- | --- | --- | --- |
| `404` | `ConversationNotFound` | Conversation not found | The target thread cannot be located, or the agent doesn’t have access to it. |
| `429` | Too many requests | Throttling limit reached | Reduce the frequency of message reaction calls. Agent reactions are limited to two reactions per second. |

You can find more information on error codes for sending messages [here](../bots/build-conversational-capability.md).

## Modify skin tone for emojis

The [Teams reactions reference](teams-reactions-reference.md) shows skin tone options for emojis. The emojis that offer skin tone are tagged as **Diverse**.

:::image type="content" source="../assets/images/agents-in-teams/teams-reactions/diverse-skin-tones.png" alt-text="Image shows the diverse skin tones for emojis." border="false":::

To select a particular skin tone:

1. Choose an emoji tagged as **Diverse**.

    :::image type="content" source="../assets/images/agents-in-teams/teams-reactions/select-diverse-skin-tone.png" alt-text="Image shows a list of diverse skins tones.":::

1. Copy the `reactionId` for the **Diverse - skin tone** that you want to use for your agent.

The following code snippet shows an example of selecting a specific skin tone of a Diverse emoji to a message:

# [TypeScript](#tab/ts1)

[WIP: Add link to Teams SDK docs.]

```typescript

app.on('mention', async ({ activity, send }) => {
  await send(new MessageReactionActivity({
    replyToId = activity.id,
    reactions: ["1f44b_wavinghand-tone4"]
  }));
});
```

# [CSharp](#tab/cs1)

[WIP: Add link to Teams SDK docs.]

```csharp
[Message]
        public async Task OnMessage([Context] MessageActivity activity, [Context] IContext.Client client)
        {
            if (activity.IsRecipientMentioned)
            {
                await client.Send(new MessageReactionActivity().AddReaction(new Reaction()
                {
                    Type = “1f44b_wavinghand-tone4”
                }).WithReplyToId(activity.Id));
            }
        }
```

# [Python](#tab/py1)

[WIP: Add link to Teams SDK docs.]

```python
@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    if ctx.activity.is_recipient_mentioned:
        await ctx.send(MessageReactionActivityInput(reply_to_id=ctx.activity.id).add_reaction(MemssageReaction(type="1f44b_wavinghand-tone4")))
```

# [API](#tab/h1)

```REST
PUT {cloud}/{tenantId}/v3/conversations/{conversationId}/activities/{activityId}/reaction/1f44b_wavinghand-tone4
```

Where,

- `conversationId` is the thread or chat identifier.
- `activityId` represents the message or activity ID.
- `reactionId` is the ID of the emoji that you want to add.

---

## Best practices

- Employ reactions to improve user experience such as acknowledging a message or providing succinct feedback.
- Avoid excessive use of reactions to minimize notification fatigue for users.
- Ensure your agents’ reactions fit the message context and avoid having your agent send multiple reactions to the same message without first removing any existing reactions.

## See also

- Teams SDK [WIP: Links to be added when available]
- [Teams reaction reference](teams-reactions-reference.md)

<!--| `403` | `ApiNotEnabledException` | Feature flag not enabled | The feature flag guarding this feature is not enabled |-->

<!--
## Customize Emojis

You can allow skin tones for emojis and use custom emojis that might be specific to your agent needs.
-->
<!--
### Custom Emojis

With Agents in Teams, you can  add custom emojis as per the need for your organization.

:::image type="content" source="../assets/images/agents-in-teams/teams-reactions/custom-emoji-list.png" alt-text="Image shows custom emojis in Teams."  border="false":::

To use custom emojis in your agent:

1. Choose the custom emojis from Teams emoji picker.
1. Hover your cursor over the emoji that you want to use. The emoji ID for the emoji appears.

    :::image type="content" source="../assets/images/agents-in-teams/teams-reactions/custom-emoji-id.png" alt-text="Image shows the emoji ID for a custom emoji."  border="false":::

1. Use the reaction ID for the selected emoji string as your parameter. Ensure the string parameter for the custom emoji must match the name of the custom emoji exactly as it appears in your organization.
-->

<!--
### Custom Emojis

With Agents in Teams, you can  add custom emojis as per the need for your organization.

:::image type="content" source="../assets/images/agents-in-teams/teams-reactions/custom-emoji-list.png" alt-text="Image shows custom emojis in Teams."  border="false":::

To use custom emojis in your agent:

1. Choose the custom emojis from Teams emoji picker.
1. Hover your cursor over the emoji that you want to use. The emoji ID for the emoji appears.

    :::image type="content" source="../assets/images/agents-in-teams/teams-reactions/custom-emoji-id.png" alt-text="Image shows the emoji ID for a custom emoji."  border="false":::

1. Use the reaction ID for the selected emoji string as your parameter. Ensure the string parameter for the custom emoji must match the name of the custom emoji exactly as it appears in your organization.
-->

<!--| `200` | Duplicate reaction added | See [best practices](#best-practices) to for sending multiple reactions to messages |-->

<!--
The [Teams reactions reference](teams-reactions-reference.md) shows skin tone options for emojis. The emojis that offer skin tone are tagged as **Diverse**.

:::image type="content" source="../assets/images/agents-in-teams/teams-reactions/diverse-reaction.png" alt-text="Image shows a diverse tagged emoji for choosing skin tones." border="false":::

To select a particular skin tone:

1. Choose an emoji tagged as **Diverse**.
1. Select **Show Skin Tones**.

    The card expands to show the available skin tones.

    :::image type="content" source="../assets/images/agents-in-teams/teams-reactions/skin-tones.png" alt-text="Image shows available skin tones for a Diverse emoji."  border="false":::

1. Copy the `reactionId` for the skin tone that you want to use for your agent.
-->
