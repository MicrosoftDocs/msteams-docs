---
title: Use threads in channels and one-on-one agent chats in Microsoft Teams
description: Understand agent reply behavior and conversation context when using threads in Teams channels and one-on-one agent chats.
ms.localizationpriority: medium
ms.topic: how-to
ms.date: 11/10/2026
zone_pivot_groups: teams-sdk-languages
---

# Use threads in channels and one-on-one agent chats

In Microsoft Teams, users can start a thread in a one-on-one chat with an agent to keep a follow-up discussion with its original message. Agents can also participate in threads in channels. The way an agent's reply is placed depends on whether the incoming message appears in the main chat or in a thread.

This article covers threads in **one-on-one agent chats**, including chats with agentic users, and **channels**. Group chats don't support threads.

## Understand messages in a chat and a thread

A **top-level message (L1)** appears in the main chat or channel conversation. A **thread reply (L2)** belongs to the discussion under a top-level message, also called the thread's root message. Threads keep related exchanges together so users can follow a discussion without mixing it with other messages in the chat or channel. Threads have one reply level. A reply can't start a nested thread.

Channel owners can choose a posts or threads layout for a channel. These layouts present channel conversations differently, but both use the same threaded conversation model.

Users can start a thread in a one-on-one agent chat by sending a threaded reply to a top-level message. The agent can then respond in that thread.

The Teams SDK uses the context of the received message to determine the default response location. In a one-on-one chat, the response matches the level of the incoming message.

## Respond to messages

In this article, a context-based response is a response sent from an activity handler using the received activity's context, without explicitly targeting a chat, channel, or reply chain. The Teams SDK uses that context to choose the default placement.

The default placement depends on the conversation scope and the incoming message:

| Incoming message | Default context-based response in a one-on-one chat | Default context-based response in a channel |
| --- | --- | --- |
| Top-level message (L1) | A top-level message (L1) in the chat | A reply (L2) in the channel thread |
| Thread reply (L2) | A reply (L2) in the same chat thread | A reply (L2) in the same channel thread |

In a one-on-one chat, a context-based response matches the incoming message level: L1 responses stay in the main chat, and L2 responses stay in the same thread. In channels, replies are always placed at L2. To post at L1 in a channel, use proactive messaging. For existing channel-thread messaging guidance, see [Threaded conversations](channel-and-group-conversations.md#threaded-conversations).

### Identify message placement

In one-on-one chats, `conversation.id` can differ between the main chat and a thread, so don't use it as the containing chat ID. Use `channelData.chat.id` to identify a one-on-one chat. For a channel, use `channelData.channel.id`. When threading is supported, `channelData.replyChain.id` identifies the root L1 message. Use the activity fields appropriate to the event to determine placement:

| Activity | Determine that it is threaded when |
| --- | --- |
| Typed message | When present, `channelData.replyChain.id` differs from `activity.id` |
| Reaction, card button click, or invoke associated with a message | When both values are present, `channelData.replyChain.id` differs from the ID of the message the user acted on, such as `replyToId` |
| Message action on a message | When both values are present, `channelData.replyChain.id` differs from `value.messagePayload.id` |

`channelData.replyChain.id` is present on threaded messages, but isn't present on every message or activity. Some message actions in channel threads currently omit thread data. Other event types, including conversation and installation updates, aren't associated with a message placement. Handle chat/channel IDs and `replyChain.id` as optional, and don't infer placement when an activity doesn't provide enough information.

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

### Reply in a one-on-one thread

Use the incoming chat ID and root message ID to explicitly target an L2 reply. For an incoming L1 message, use its `activity.id` as the root ID. For an incoming L2 message, use `channelData.replyChain.id`. The examples use the SDK `reply` method with response text.

The following examples show how to reply in a thread for either an L1 or L2 incoming message.

::: zone pivot="teams-sdk-typescript"

```typescript
app.on('message', async ({ activity }) => {
  const chatId = activity.channelData?.chat?.id;
  const rootId = activity.channelData?.replyChain?.id ?? activity.id;
  if (chatId && rootId) {
    await app.reply(chatId, rootId, 'Replying in the thread');
  }
});
```

::: zone-end

::: zone pivot="teams-sdk-python"

```python
@app.on_message
async def on_message(ctx: ActivityContext[MessageActivity]):
    data = ctx.activity.channel_data
    chat_id = data.chat.id if data and data.chat else None
    root_id = data.reply_chain.id if data and data.reply_chain else ctx.activity.id
    if chat_id and root_id:
        await app.reply(chat_id, root_id, 'Replying in the thread')
```

::: zone-end

::: zone pivot="teams-sdk-csharp"

```csharp
teamsApp.OnMessage("(?s)^.*$", async (context, cancellationToken) =>
{
    var data = context.Activity.ChannelData;
    string? chatId = data?.Chat?.Id;
    string? rootId = data?.ReplyChain?.Id ?? context.Activity.Id;
    if (!string.IsNullOrEmpty(chatId) && !string.IsNullOrEmpty(rootId))
    {
        await teamsApp.ReplyAsync(
            chatId,
            rootId,
            "Replying in the thread",
            cancellationToken: cancellationToken);
    }
});
```

::: zone-end

### Set placement for proactive messages

To send a new top-level message outside the incoming activity context, use proactive messaging and target the chat or channel ID. In a one-on-one chat, use `channelData.chat.id`. In a channel, use `channelData.channel.id`. Don't use a thread's `conversation.id` as the containing chat or channel ID. Use `app.send(chatOrChannelId, text)` for an L1 message. To proactively send an L2 reply, use `app.reply(chatOrChannelId, rootMessageId, text)`. See [Considerations for proactive messages](#considerations-for-proactive-messages) for examples that store these IDs.

::: zone pivot="teams-sdk-typescript"

```typescript
const destinationId = activity.channelData?.chat?.id ?? activity.channelData?.channel?.id;
if (destinationId) {
  await app.send(destinationId, 'A new top-level message');
}
```

::: zone-end

::: zone pivot="teams-sdk-python"

```python
data = ctx.activity.channel_data
destination_id = data.chat.id if data and data.chat else data.channel.id if data and data.channel else None
if destination_id:
    await app.send(destination_id, 'A new top-level message')
```

::: zone-end

::: zone pivot="teams-sdk-csharp"

```csharp
var data = context.Activity.ChannelData;
string? destinationId = data?.Chat?.Id ?? data?.Channel?.Id;
if (!string.IsNullOrEmpty(destinationId))
{
    await teamsApp.SendAsync(
        destinationId,
        "A new top-level message",
        cancellationToken: cancellationToken);
}
```

::: zone-end

## Send messages without the SDK (preview)

Agents that don't use the Teams SDK can send an activity to the conversation activities endpoint to create a top-level message:

```http
POST {serviceUrl}/v3/conversations/{conversationId}/activities
```

To send a threaded reply, post the activity to the reply chain endpoint. Use `channelData.chat.id` for a one-on-one chat or `channelData.channel.id` for a channel as `chatOrChannelId`. Use the root message ID as `rootId`.

```http
POST {serviceUrl}/v3/conversations/{chatOrChannelId}/replyChains/{rootId}
```

Setting `replyToId` on the activity doesn't determine its placement. Include the standard activity payload and authenticate the request as described in [Build a conversational capability](../../build-conversational-capability.md).

### Threaded replies and quoted replies

Threading and quoting serve different purposes. A threaded reply belongs to a discussion under a root message. A quoted reply displays a reference to an earlier message so users can see what the response addresses.

The presence of a quote doesn't determine whether a message appears in the main chat or in a thread. In a one-on-one chat, both context-based send and reply methods preserve the incoming message level. Quoting changes how the response references the incoming message, not where it appears.

The existing Teams SDK channel examples use send methods for responses without a quote and reply methods for responses that quote the incoming message. Both responses remain in the channel thread. For more information about quoting, see [Quoted replies](/microsoftteams/platform/teams-sdk/essentials/sending-messages/overview#quoted-replies).

## Agent design guidance and best practices

In channels, users expect responses to their messages to appear in the associated thread. Keep top-level channel messages for proactive messages that are intended to start a new conversation.

In one-on-one chats, recommend that agents respond in a thread for both top-level and threaded user messages. A response to a top-level message starts a thread under that message. A response to a threaded message stays in the same thread. This recommendation differs from the SDK's default context-based placement for a top-level message, which remains at L1. To follow the recommendation, explicitly target the root message when responding to a top-level message. The same guidance applies to chats with agentic users.

### Use threads as context boundaries

In a one-on-one agent chat, each thread has a conversation ID that differs from the conversation ID of the main chat. When a user starts a thread, the first reply in that thread can therefore look like activity in a new conversation to an agent that uses the conversation ID to identify its state.

Plan how your agent handles state when it receives activity with a new conversation ID. For example, avoid unintentionally sending another welcome message or restarting sign-in when a user starts a thread. Decide which state should be shared with the main chat and which should remain specific to the thread. Don't assume that a thread's conversation ID is interchangeable with the main chat's ID.

For an AI-powered agent, distinguish message placement from model context. A thread may need relevant information from the main chat, but unrelated exchanges shouldn't automatically become part of the thread's context. Select relevant history for each response while keeping the thread focused.

Treat conversation IDs as opaque values. Don't parse or construct them to infer a relationship between a chat and a thread.

For proactive replies in a thread, store the chat or channel ID and the root message ID. For an L2 message, the root ID is `channelData.replyChain.id`. For an L1 message that you want to follow up on in a new thread, the root ID is the message's `activity.id`. If the recipient is an agentic user, also store the agentic identity required to send to that user.

## Considerations for proactive messages

The default behavior described above applies when responding to a received message through its context. This is reactive messaging. A proactive message, such as a scheduled notification, is sent outside that context, so an agent must retain the conversation information it needs to target the intended conversation.

Use the proactive reply method to target a thread in either a one-on-one chat or a channel. For channels, see [Proactive threading](/microsoftteams/platform/teams-sdk/essentials/sending-messages/proactive-messaging#proactive-threading). For general proactive messaging guidance, see [Send proactive messages](send-proactive-messages.md).

To proactively reply in a thread, call the targeted `app.reply(chatId, replyChainId, text)` overload with the stored chat or channel ID, root message ID, and response text. This targets the reply-chain endpoint. It doesn't quote a current message because there's no current activity in a proactive context. To send a new top-level message, call `app.send(chatId, text)` with the chat or channel ID. Also retain the service URL and agentic identity, if applicable, required by your proactive messaging setup.

::: zone pivot="teams-sdk-typescript"

```typescript
// Store when the message arrives.
const saved = {
  chatOrChannelId: activity.channelData?.chat?.id ?? activity.channelData?.channel?.id,
  rootId: activity.channelData?.replyChain?.id ?? activity.id,
};

// Later, outside a handler.
if (saved.chatOrChannelId && saved.rootId) {
  await app.reply(saved.chatOrChannelId, saved.rootId, 'Following up in the thread');
}
```

::: zone-end

::: zone pivot="teams-sdk-python"

```python
# Store when the message arrives.
data = ctx.activity.channel_data
chat_or_channel_id = data.chat.id if data and data.chat else data.channel.id if data and data.channel else None
root_id = data.reply_chain.id if data and data.reply_chain else ctx.activity.id

# Later, outside a handler.
if chat_or_channel_id and root_id:
  await app.reply(chat_or_channel_id, root_id, 'Following up in the thread')
```

::: zone-end

::: zone pivot="teams-sdk-csharp"

```csharp
// Store when the message arrives.
var data = context.Activity.ChannelData;
string? chatOrChannelId = data?.Chat?.Id ?? data?.Channel?.Id;
string? rootId = data?.ReplyChain?.Id ?? context.Activity.Id;

// Later, outside a handler.
if (!string.IsNullOrEmpty(chatOrChannelId) && !string.IsNullOrEmpty(rootId))
{
    await teamsApp.ReplyAsync(chatOrChannelId, rootId, "Following up in the thread");
}
```

::: zone-end

## Streaming in threads

The first streamed response creates the message and determines its placement. It follows the same rules as a context-based send. In a one-on-one chat, it matches the incoming message level. In a channel, it appears in the thread. Later chunks and the final response update that same message. They don't create separate messages or change its placement.

## Plan completion in threads

`plan.complete()` currently places the completed plan at L1, even when the message that prompted it is in an L2 thread. Plan completion is separate from the streamed-message behavior described above. This article doesn't cover the placement of other plan operations.

## See also

- [Channel and group chat conversations for agents](channel-and-group-conversations.md)
- [Send proactive messages](send-proactive-messages.md)
