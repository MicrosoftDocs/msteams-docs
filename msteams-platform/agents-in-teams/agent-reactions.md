---
title: Agent Reactions in Teams - Overview
description: Learn about how you can use reactions for agents in Teams.
ms.localizationpriority: high
ms.date: 01/28/2026
ms.topic: reference
---

# Agent Reactions in Teams

Use agents to communicate not only through text but also using reactions, emojis, and context-aware actions. It signals agent's intentional design to improve user trust and make agent behavior more transparent and shows how the agent understands user intent and need.

Map emojis and reactions to specific actions that the agent can take in response to ongoing conversation. Use the `emojiID` to enable your agents to send reactions.

[WIP: Add screenshot image]

You can develop agents for Teams using the `addReaction` and `removeReaction` methods to send reactions to messages in a chat.

[WIP: Links to be added when available]
For more information, [Teams SDK doc] and [Teams Reactions page].

Quick highlights:

## Enable agents to add reactions

You can use the `addReaction` method from Teams SDK or call the `add reaction` API directly to send reactions to messages.

To enable agents to send reactions:

1. Use the Teams reactions reference page for getting the `EmojiID` for the reactions that you want to add.
    - You can also select a particular skin-tone for the emoji by selecting its `EmojiID`.
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
C#
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
- `reactionId` is the `EmojiID` obtained using the Teams reactions reference page.

---

## See also

- Teams SDK
- Teams reacton reference page
