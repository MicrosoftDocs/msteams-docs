---
title: Use Emoji Reactions in Teams Agents
description: Learn about how you can use reactions for agents in Teams.
ms.localizationpriority: high
ms.date: 05/18/2026
ms.topic: reference
zone_pivot_groups: dev-lang
---

# Use emoji reactions in Teams agents

> [!NOTE]
>
> Support for agent reactions in Teams is available in [public developer preview](../resources/dev-preview/developer-preview-intro.md).

Reactions in Teams are lightweight emoji markers that users can attach to chat messages to acknowledge receipt, express sentiment, and provide feedback without interrupting the flow of the conversation. Agents in Teams can add and remove reactions and listen for reaction events. TODO short sentence here about scenarios.

# [Desktop](#tab/desktop)

:::image type="content" source="../assets/images/agents-in-teams/teams-reactions/agent-reactions-desktop.png" alt-text="Image shows agent reactions in Teams desktop client."  border="false" lightbox="../assets/images/agents-in-teams/teams-reactions/agent-reactions-desktop.png":::

# [Mobile](#tab/mobile)

:::image type="content" source="../assets/images/agents-in-teams/teams-reactions/agent-reactions-mobile-mini.png" alt-text="Image shows agent reactions in the moble client." border="false" lightbox="../assets/images/agents-in-teams/teams-reactions/agent-reactions-mobile.png"

---

## Add and remove reactions on messages

Like users, agents can attach one or more different reactions to any message in a conversation, and can remove reactions after adding them. Both users and agents can only remove their own reactions, not those placed by others.

::: zone pivot="csharp"

Adding a reaction to a message requires a reaction ID string that uniquely identifies the emoji to use. The `ReactionTypes` static class exposes named constants for a few of the most commonly-used reaction IDs, but any reaction ID listed in the [Teams Reactions Reference](teams-reactions-reference.md) can be used.

Use the `AddAsync` and `DeleteAsync` methods on `ReactionClient` to add and remove reactions from messages.

```csharp
app.OnMessage(async context =>
{
    // First, add a reaction
    await context.Api.Conversations.Reactions.AddAsync(
        context.Activity.Conversation.Id,
        context.Activity.Id,
        new ReactionType("1f44b_wavinghand")
    );

    // Wait a bit, then remove it
    await Task.Delay(2000);
    await context.Api.Conversations.Reactions.DeleteAsync(
        context.Activity.Conversation.Id,
        context.Activity.Id,
        new ReactionType("1f44b_wavinghand")
    );
});
```

::: zone-end

::: zone pivot="typescript"

Adding a reaction to a message requires a reaction ID string that uniquely identifies the emoji to use. The SDK includes named constants for a few of the most commonly-used reaction IDs, but any reaction ID listed in the [Teams Reactions Reference](teams-reactions-reference.md) can be used.

Use the `add` and `delete` methods on `ReactionClient` to add and remove reactions from messages.

```typescript
app.on('message', async ({ activity, api }) => {
// First, add a reaction
  await api.conversations.reactions.add(activity.conversation.id, activity.id, '1f44b_wavinghand');

  // Wait a bit, then remove it
  await new Promise((resolve) => setTimeout(resolve, 2000));
  await api.conversations.reactions.delete(activity.conversation.id, activity.id, '1f44b_wavinghand');
});
```

::: zone-end

::: zone pivot="python"

Adding a reaction to a message requires a reaction ID string that uniquely identifies the emoji to use. The SDK includes named constants for a few of the most commonly-used reaction IDs, but any reaction ID listed in the [Teams Reactions Reference](teams-reactions-reference.md) can be used.

Use the `add` and `delete` methods on `ReactionClient` to add and remove reactions from messages.

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

::: zone-end

To replace a reaction on a message, remove the existing reaction and add the new one.

Multiple reactions can be added to a single message, but the add and remove operations for a given reaction ID are idempotent: multiple calls to add or remove a specific reaction from a message will not fail, but will not have any effect beyond the first call.

<!-- 

TODO 

# [REST API](#tab/h1)

```REST
PUT {cloud}/{tenantId}/v3/conversations/{conversationId}/activities/{activityId}/reaction/1f44b_wavinghand
```

Where,

- `cloud` is the `serviceURL` of the bot connector service that must be fetched dynamically.
- `tenantId` is the ID of the tenant agent or app is registered.
- `conversationId` is the thread or chat identifier.
- `activityId` represents the message or activity ID.
- `reactionId` is the ID of the emoji that you want to add.
 -->

<!-- 

TODO

# [API](#tab/h1)

```REST
DELETE {cloud}/{tenantId}/v3/conversations/{conversationId}/activities/{activityId}/reaction/1f44b_wavinghand
```

Where,

- `cloud` is the `serviceURL` of the bot connector service that must be fetched dynamically.
- `tenantId` is the ID of the tenant agent or app is registered.
- `conversationId` is the thread or chat identifier.
- `activityId` represents the message or activity ID.
- `reactionId` is the ID of the emoji that you want to remove.

No additional payload is required as the reaction is defined in the URL.
 -->

## Best practices

- Employ reactions to improve user experience such as acknowledging a message or providing succinct feedback.
- Avoid excessive use of reactions to minimize notification fatigue for users.
- Ensure your agent's reactions fit the message context and avoid having your agent send multiple reactions to the same message without first removing any existing reactions.

## See also

- [Teams SDK](/microsoftteams/platform/teams-sdk/in-depth-guides/message-reactions?pivots=typescript)
- [Teams reaction reference](teams-reactions-reference.md)
