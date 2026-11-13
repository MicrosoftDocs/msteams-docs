---
title: Use threads in channels and one-on-one agent chats in Microsoft Teams
description: Learn how response placement works in Teams channel threads and one-on-one agent chats.
ms.localizationpriority: medium
ms.topic: how-to
ms.date: 11/13/2026
zone_pivot_groups: teams-sdk-languages
---

# Use threads in channels and one-on-one agent chats

This article explains how to choose where an agent response appears in one-on-one chats and channels. Group chats don't support threads.

The TypeScript Teams SDK examples are based on version 2.2.0. See the [ActivityContext methods](https://github.com/microsoft/teams.ts/blob/v2.2.0/packages/apps/src/contexts/activity.ts) and [App send and reply methods](https://github.com/microsoft/teams.ts/blob/v2.2.0/packages/apps/src/app.ts) for their definitions. TODO: Add version-verified C# and Python examples.

## Understand message placement

A **top-level message (L1)** appears in the main chat or channel conversation. A **thread reply (L2)** appears under an L1 message. Threads have one reply level. A reply can't start a nested thread.

Channel owners can use the posts or threads layout. Both layouts use the same thread model. A user starts a 1:1 thread by sending a threaded reply to a top-level message.

:::image type="content" source="../../../assets/images/bots/thread-placement-matrix.svg" alt-text="Four conceptual diagrams show L1 to L1, L1 to L2, L2 to L1, and L2 to L2 response placement in a one-on-one chat." border="false" lightbox="../../../assets/images/bots/thread-placement-matrix.svg":::

Use the incoming activity to identify the message, containing chat, and thread root:

| Incoming message | Incoming message ID | Containing chat ID | Thread root ID |
| --- | --- | --- | --- |
| Top-level message (L1) | `activity.id` | `channelData.chat.id` | `activity.id` |
| Thread reply (L2) | `activity.id` | `channelData.chat.id` | `channelData.replyChain.id` |

For an L1 message, `replyChain.id` can be absent or equal `activity.id`. For an L2 message, it identifies the L1 root and differs from the incoming message ID. Don't parse or construct `conversation.id` to find the containing chat. Its value can differ between a main chat and a thread.

Names such as `chatId` and `threadRootMessageId` in examples are local variable names, not incoming or outgoing payload fields.

### Identify placement for other activities

The `chat` object in `channelData` identifies a one-on-one chat. The `channel` object identifies a channel. For an action, compare `replyChain.id` with the ID of the message the user acted on:

| Activity | ID to compare with `channelData.replyChain.id` | How to interpret the result |
| --- | --- | --- |
| Message, edit, or delete | `activity.id` | Equal IDs mean L1. Different IDs mean L2. |
| Reaction or card button click | `replyToId` | Different IDs mean the action is on an L2 message. |
| Message action | `value.messagePayload.id` | Different IDs mean the action is on an L2 message. |
| Invoke associated with a message | The acted-on message ID, such as `replyToId` | Different IDs mean the invoke is associated with an L2 message. |
| Invoke not associated with a message | No message ID | A present `replyChain.id` identifies the containing thread. |
| Conversation or installation update | No message ID | No message placement applies. |
| Required message or thread ID is missing | Not available | Placement is unknown. Don't assume L1. |

`channelData.replyChain.id` isn't present on every message or activity. Some message actions in channel threads currently omit thread data. Handle the thread and acted-on message IDs as optional.

::: zone pivot="teams-sdk-typescript"

```typescript
app.on('message', async ({ activity }) => {
  const rootId = activity.channelData?.replyChain?.id;
  const isTopLevel = !rootId || rootId === activity.id;
});
```

::: zone-end

::: zone pivot="teams-sdk-python"

```python
@app.on_message
async def on_message(ctx: ActivityContext[MessageActivity]):
    data = ctx.activity.channel_data
    root_id = data.reply_chain.id if data and data.reply_chain else None
    is_top_level = not root_id or root_id == ctx.activity.id
```

::: zone-end

::: zone pivot="teams-sdk-csharp"

```csharp
teamsApp.OnMessage("(?s)^.*$", async (context, cancellationToken) =>
{
    string? rootId = context.Activity.ChannelData?.ReplyChain?.Id;
    bool isTopLevel = string.IsNullOrEmpty(rootId) || rootId == context.Activity.Id;
});
```

::: zone-end

## Choose the response location

In a 1:1 chat, the SDK default keeps the response at the incoming level. For a focused task, such as handling a support request, we recommend answering in a thread: start an L2 thread for an incoming L1 message, then keep later responses in that thread. This is a recommendation, not a change to the SDK default. A general-purpose assistant designed for a continuous main-chat conversation might keep L1 responses at L1.

| Incoming message | SDK default in a 1:1 chat | Recommendation for a focused task | To respond in the main chat (L1) |
| --- | --- | --- | --- |
| Top-level message (L1) | Main chat (L1) | Start a thread under this message | Use the SDK default |
| Thread reply (L2) | Same thread (L2) | Continue in the same thread | Send to the containing chat |

In channels, a response sent from the incoming activity handler is placed at L2. To post a new L1 message in a channel, use a proactive send. For channel-thread behavior, see [Threaded conversations](channel-and-group-conversations.md#threaded-conversations).

## Implement a placement choice

Use the targeted `app.reply(chatOrChannelId, threadRootMessageId, message)` method to send at L2. Use the containing chat or channel ID—not `conversation.id`—as `chatOrChannelId`. For an incoming L1 message, use `activity.id` as the root. For an incoming L2 message, use `channelData.replyChain.id`.

In an activity handler, `ctx.send()` keeps an incoming L2 response in that thread. Use `app.reply()` when you need to choose the thread explicitly. Unlike `ctx.reply()`, targeted `app.reply()` doesn't automatically quote the current message. For quoting guidance, see [Quoted replies](../../build-conversational-capability.md#quoted-replies).

::: zone pivot="teams-sdk-typescript"

```typescript
app.on('message', async ({ activity }) => {
  const chatId = activity.channelData?.chat?.id;
  const threadRootMessageId = activity.channelData?.replyChain?.id ?? activity.id;
  if (chatId && threadRootMessageId) {
    await app.reply(chatId, threadRootMessageId, 'Answer in the thread');
  }
});
```

::: zone-end

::: zone pivot="teams-sdk-csharp"

TODO: Add a version-verified C# example for targeting L1 and L2 messages.

::: zone-end

::: zone pivot="teams-sdk-python"

TODO: Add a version-verified Python example for targeting L1 and L2 messages.

::: zone-end

Use `app.send(chatOrChannelId, message)` to send at L1. In a 1:1 chat, `chatOrChannelId` is `channelData.chat.id`. In a channel, it is `channelData.channel.id`. This is also how to move an L2 response back to the main chat. Channel context-based responses are always placed at L2, so use a proactive send to post at L1.

For a proactive L2 reply, store the containing chat or channel ID and the root message ID when the incoming message arrives, then use targeted `app.reply()` with those IDs. See [Send proactive messages](send-proactive-messages.md) for setup details.

## Send messages without the SDK (preview)

For raw HTTP, send an L1 activity to the containing chat or channel:

```http
POST {serviceUrl}/v3/conversations/{conversationId}/activities
```

This is the raw API equivalent of `app.send(chatOrChannelId, message)` for an L1 message.

To send an L2 reply, post to the reply-chain endpoint, using the containing chat or channel ID and the root ID described above:

```http
POST {serviceUrl}/v3/conversations/{chatOrChannelId}/replyChains/{rootId}
```

This is the raw API equivalent of targeted `app.reply(chatOrChannelId, threadRootMessageId, message)` for an L2 message.

Setting `replyToId` on the activity doesn't determine its placement. Include the standard activity payload and authenticate the request as described in [Build a conversational capability](../../build-conversational-capability.md).

## Related guidance

- [Quoted replies](../../build-conversational-capability.md#quoted-replies): choosing and formatting a message to quote. Quoting doesn't choose the thread destination.
- [Stream agent messages](../../streaming-ux.md): streaming lifecycle and placement.
- [Channel and group chat conversations for agents](channel-and-group-conversations.md): channel-thread behavior.
- [Send proactive messages](send-proactive-messages.md): sending outside an activity handler.
