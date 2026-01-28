---
title: Agent Reactions in Teams - Overview
description: Learn about how you can use reactions for agents in Teams.
ms.localizationpriority: high
ms.date: 01/28/2026
ms.topic: reference
---

# Enable agent reactions in Teams

Use agents to communicate not only through text but also using reactions, emojis, and context-aware actions. It signals agent's intentional design to improve user trust and make agent behavior more transparent and shows how the agent understands user intent and need.

Map emojis and reactions to specific actions that the agent can take in response to ongoing conversation. Use the `emojiID` to enable your agents to send reactions.

[WIP: Add screenshot image]

You can develop agents for Teams using the `addReaction` and `removeReaction` methods to send reactions to messages in a chat.

[WIP: Links to be added when available]
For more information, [Teams SDK doc] and [Teams Reactions page].

**Key highlights**:

- [Add reactions](#enable-agents-to-add-reactions)
- [Remove reactions](#enable-agent-to-remove-reactions)
- [View response codes](#response-codes)
- [Choose skin tones](#response-codes)
- [Use custom emojis](#custom-emojis)

## Enable agents to add reactions

You can use the `addReaction` method from Teams SDK or call the `add reaction` API directly to send reactions to messages.

To enable agents to send reactions to a message:

1. Use the Teams reactions reference page for getting the `EmojiID` for the reactions that you want to add.
    - You can also select a particular [skin tone for the emoji](#modify-skin-tone-for-emojis) by selecting its `EmojiID`.
1. Use the `addReaction` method from Teams SDK or call the `add reaction` API to send reactions to messages.

The following code snippet shows an example of adding the *like* reaction to a message.

# [TypeScript](#tab/ts1)

```typescript

app.on('mention', async ({ activity, send }) => {
  await send(new MessageReactionActivity({
    replyToId = activity.id,
    reactions: [like]
  }));
});
```

# [CSharp](#tab/cs1)

```csharp
[Message]
        public async Task OnMessage([Context] MessageActivity activity, [Context] IContext.Client client)
        {
            if (activity.IsRecipientMentioned)
            {
                await client.Send(new MessageReactionActivity().AddReaction(new Reaction()
                {
                    Type = “like”
                }).WithReplyToId(activity.Id));
            }
        }
```

# [Python](#tab/py1)

```python
@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    if ctx.activity.is_recipient_mentioned:
        await ctx.send(MessageReactionActivityInput(reply_to_id=ctx.activity.id).add_reaction(MemssageReaction(type="like")))
```

# [API](#tab/h1)

```rest
PUT {cloud}/{tenantId}/v3/conversations/{conversationId}/activities/{activityId}/reaction/{reactionType}
```

Where,

- `conversationId` is the thread or chat identifier.
- `activityId` is the message or activity ID.
- `reactionId` is the `EmojiID` that you want to add.

---

## Enable agent to remove reactions

You can choose to enable agents to remove reactions from messages.

To enable agents to remove reactions from a message:

1. Use the Teams reactions reference page for getting the `EmojiID` for the reactions that you want to add.
    - You can also select a particular [skin tone for the emoji](#modify-skin-tone-for-emojis) by selecting its `EmojiID`.
1. Use the `removeReaction` method from Teams SDK or call the `remove reaction` API to send reactions to messages.

The following code snippet shows an example of removing a reaction from a message.

# [TypeScript](#tab/ts1)

```typescript
app.on('mention', async ({ activity, send }) => {
  await send(new MessageReactionActivity({
    replyToId = activity.id,
    reactions: [like]
  }));
});

```

# [CSharp](#tab/cs1)

```csharp
[Message]
        public async Task OnMessage([Context] MessageActivity activity, [Context] IContext.Client client)
        {
            if (activity.IsRecipientMentioned)
            {
                await client.Send(new MessageReactionActivity().RemoveReaction(new Reaction()
                {
                    Type = “like”,
                }).WithReplyToId(activity.Id));
            }
        }

```

# [Python](#tab/py1)

```python
@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    if ctx.activity.is_recipient_mentioned:
        await ctx.send(MessageReactionActivityInput(reply_to_id=ctx.activity.id).remove_reaction(MemssageReaction(type="like")))

```

# [API](#tab/h1)

```rest
DELETE {cloud}/{tenantId}/v3/conversations/{conversationId}/activities/{activityId}/reaction/{reactionType}
```

Where,

- `conversationId` is the thread or chat identifier.
- `activityId` is the message or activity ID.
- `reactionId` is the `EmojiID` for the emoji that you want to remove

No additional payload required since the reaction is defined in the URL

---

## Response codes

The following are the success and error codes:

### Success codes

| Response codes | Description | Action |
| --- | --- | --- |
| `200` | Reaction added successfully | NA |
| `200` | Duplicate reaction added | See [best practices](#best-practices) to for sending multiple reactions to messages |
| `200` | Deleted reaction successfully | NA |
| `200` | Deleted non-existent reaction | NA |

### Error codes

| Response codes | Error message | Description | Action |
| --- | --- | --- | --- |
| `403` | `ApiNotEnabledException` | Feature flag not enabled | The feature flag guarding this feature is not enabled |
| `404` | `ConversationNotFound` | Conversation not found | The target thread cannot be located, or the agent doesn’t have access to it. |
| `429` | Too many requests | Throttling limit reached | Reduce the frequency of message reaction calls. Agent reactions are limited to 2 reaction per second.|

## Customize Emojis

You can allow skin tones for emojis and also use custom emojis that might be specific to your agent needs.

### Modify skin tone for emojis

The Teams reactions reference page shows skin tone options for emojis. The emojis that offer skin tone are tagged as **Diverse**.

:::image type="content" source="../assets/images/agents-in-teams/teams-reactions/diverse-reaction.png" alt-text="Image shows a diverse tagged emoji for choosing skin tones. ":::

To select a particular skin tone:

1. Choose an emoji tagged as **Diverse**.
1. Select **Show Skin Tones**.

    The card expands to show the available skin tones.

    :::image type="content" source="../assets/images/agents-in-teams/teams-reactions/skin-tones.png" alt-text="Image shows available skin tones for a Diverse emoji.":::

1. Copy the `EmojiID` for the skin tone that you want to use for your agent.

[WIP: Example code snippets for selecting skin tone.]

### Custom Emojis

With Agents in Teams, you can  add custom emojis as per the need for your organization.

:::image type="content" source="../assets/images/agents-in-teams/teams-reactions/custom-emojis.png" alt-text="Image shows custom emojis in Teams.":::

To use custom emojis in your agent:

1. Choose the custom emojis from Teams emoji picker.
1. Hover your cursor over the emoji that you want to use. The emoji ID for the emoji appears.

    :::image type="content" source="../assets/images/agents-in-teams/teams-reactions/custom-emoji-id.png" alt-text="Image shows the emoji ID for a custom emoji.":::

1. Use the emojiID for the selected emoji string as your parameter. Ensure the string parameter for the custom emoji must exactly match the name of the custom emoji as it appears in your organization.

## Best practices

- Employ reactions to improve user experience, such as acknowledging a message or providing succinct feedback.
- Avoid excessive use of reactions to minimize notification fatigue for users.
- Ensure your agents’ reactions fit the message context and avoid having your agent send multiple reactions to the same message without first removing any existing reactions.
- Reactions sent by agents are limited to 2 reactions per second

## See also

- Teams SDK
- Teams reacton reference page
