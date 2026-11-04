---
title: Use threads in channels and one-on-one agent chats in Microsoft Teams
description: Understand agent reply behavior and conversation context when using threads in Teams channels and one-on-one agent chats.
ms.localizationpriority: medium
ms.topic: how-to
ms.date: 10/26/2026
zone_pivot_groups: teams-sdk-languages
---

# Use threads in channels and one-on-one agent chats

In Microsoft Teams, users can start a thread in a one-on-one chat with an agent to keep a follow-up discussion with its original message. Agents can also participate in threads in channels. The way an agent's reply is placed depends on where the incoming message appears: in the main chat or in a thread.

This article covers threads in **one-on-one agent chats** and **channels**. Group chats don't support threads.

Threads in one-on-one agent chats don't require an app manifest opt-in property.

## Understand messages in a chat and a thread

A **top-level message (L1)** appears in the main chat or channel conversation. A **thread reply (L2)** belongs to the discussion under a top-level message, also called the thread's root message. Threads keep related exchanges together so users can follow a discussion without mixing it with other messages in the chat or channel. Threads have one reply level, a reply can't start a nested thread.

Channel owners can choose a posts or threads layout for a channel. These layouts present channel conversations differently, but both use the same threaded conversation model.

A user starts a thread in a one-on-one agent chat by replying to a message in the main chat. The agent can then respond within that thread.

The Teams SDK uses the context of the received message to determine the default response location. In a one-on-one chat, that default does not automatically continue a thread when the incoming message is an L2 reply.

## Respond to messages

The default placement depends on the conversation scope and the incoming message:

| Incoming message | Default context-based response in a one-on-one chat | Default context-based response in a channel |
| --- | --- | --- |
| Top-level message (L1) | A top-level message (L1) in the chat | A reply (L2) in the channel thread |
| Thread reply (L2) | A top-level message (L1) in the chat | A reply (L2) in the same channel thread |

In a one-on-one chat, a user starts a thread by replying to a top-level message. An ordinary context-based response to that L2 activity goes to L1. In a channel, the context-based response stays in the thread. For existing channel-thread messaging guidance and examples, see [Threaded conversations](channel-and-group-conversations.md#threaded-conversations).

### Identify message placement

In one-on-one chats, `conversation.id` can differ between the main chat and a thread, so don't use it as the containing chat ID. Use `channelData.chat.id` to identify the chat and `channelData.replyChain.id` to identify the root L1 message. Use the activity fields appropriate to the event to determine placement:

| Activity | Determine that it is threaded when |
| --- | --- |
| Message, edit, delete, or reaction | `channelData.replyChain.id` differs from `activity.id` |
| Card action or task-module action associated with a message | `channelData.replyChain.id` differs from `replyToId` |
| Message action on a message | `channelData.replyChain.id` differs from `value.messagePayload.id` |
| Compose-box or settings invoke with no associated message | `channelData.replyChain.id` is present; it identifies the thread containing the compose box |

Some activities, such as targeted messages or message extensions opened from search, might not include `channelData.replyChain.id`. Other event types, including conversation and installation updates, aren't associated with a message placement. Handle this property as optional and don't infer placement when the activity doesn't provide enough information.

::: zone pivot="teams-sdk-typescript"

```typescript
app.on('message', async ({ activity }) => {
  const rootId = activity.channelData?.replyChain?.id;
  const isTopLevel = rootId === activity.id;
});
```

::: zone-end

::: zone pivot="teams-sdk-python"

```python
@app.on_message
async def on_message(ctx: ActivityContext[MessageActivity]):
    root_id = ctx.activity.channel_data.reply_chain.id
    is_top_level = root_id == ctx.activity.id
```

::: zone-end

::: zone pivot="teams-sdk-csharp"

```csharp
teamsApp.OnMessage("(?s)^.*$", async (context, cancellationToken) =>
{
    string? rootId = context.Activity.ChannelData?.ReplyChain?.Id;
    bool isTopLevel = rootId == context.Activity.Id;
});
```

::: zone-end

### Reply in a one-on-one thread

In a one-on-one chat, explicitly target the chat and the root message ID to send an L2 reply. The examples below use `channelData.chat.id` and `channelData.replyChain.id` from the incoming activity. Verify the SDK method signatures against the released SDK before publishing.

The following examples show explicit thread targeting in a one-on-one chat.

::: zone pivot="teams-sdk-typescript"

```typescript
app.on('message', async ({ activity }) => {
  const { chat, replyChain } = activity.channelData!;
  await app.reply(chat!.id, replyChain!.id, 'Replying in the thread');
});
```

::: zone-end

::: zone pivot="teams-sdk-python"

```python
@app.on_message
async def on_message(ctx: ActivityContext[MessageActivity]):
    data = ctx.activity.channel_data
  await app.reply(data.chat.id, data.reply_chain.id, 'Replying in the thread')
```

::: zone-end

::: zone pivot="teams-sdk-csharp"

```csharp
teamsApp.OnMessage("(?s)^.*$", async (context, cancellationToken) =>
{
    var data = context.Activity.ChannelData!;
    await teamsApp.ReplyAsync(
        data.Chat!.Id!,
        data.ReplyChain!.Id!,
        "Replying in the thread",
        cancellationToken: cancellationToken);
});
```

::: zone-end

### Send a new top-level message in response to a thread

To send a new top-level message in response to a threaded message, target the containing conversation: use `channelData.chat.id` in a one-on-one chat or `channelData.channel.id` in a channel. Don't use the thread's conversation ID, which targets the thread. In channels, context-based methods route the response into the thread.

::: zone pivot="teams-sdk-typescript"

```typescript
await app.send(activity.channelData!.chat!.id, 'A new top-level message');
```

::: zone-end

::: zone pivot="teams-sdk-python"

```python
await app.send(ctx.activity.channel_data.chat.id, 'A new top-level message')
```

::: zone-end

::: zone pivot="teams-sdk-csharp"

```csharp
await teamsApp.SendAsync(
  context.Activity.ChannelData!.Chat!.Id!,
  "A new top-level message",
  cancellationToken: cancellationToken);
```

::: zone-end

### Threaded replies and quoted replies

Threading and quoting serve different purposes. A threaded reply belongs to a discussion under a root message. A quoted reply displays a reference to an earlier message so users can see what the response addresses.

The presence of a quote doesn't determine whether a message appears in the main chat or in a thread. Similarly, calling a context's reply method doesn't by itself mean that the agent starts a new thread. The response location follows the behavior described in the table above.

The existing Teams SDK channel examples use send methods for responses without a quote and reply methods for responses that quote the incoming message. Both responses remain in the channel thread. For more information about quoting, see [Quoted replies](/microsoftteams/platform/teams-sdk/essentials/sending-messages/overview#quoted-replies).

## Agent design guidance and best practices

In channels, users expect responses to their messages to appear in the associated thread. Keep top-level channel messages for proactive messages that are intended to start a new conversation.

In one-on-one chats, use the default context-based response behavior shown above. A response to a top-level message stays in the main chat, and a response to a threaded message stays in that thread. Let users start a thread when they want to continue a discussion there, don't force top-level exchanges into threads.

### Use threads as context boundaries

In a one-on-one agent chat, each thread has a conversation ID that differs from the conversation ID of the main chat. When a user starts a thread, the first reply in that thread can therefore look like activity in a new conversation to an agent that uses the conversation ID to identify its state.

Plan how your agent handles state when it receives activity with a new conversation ID. For example, avoid unintentionally sending another welcome message or restarting sign-in when a user starts a thread. Decide which state should be shared with the main chat and which should remain specific to the thread. Don't assume that a thread's conversation ID is interchangeable with the main chat's ID.

For an AI-powered agent, distinguish message placement from model context. A thread may need relevant information from the main chat, but unrelated exchanges shouldn't automatically become part of the thread's context. Select relevant history for each response while keeping the thread focused.

Treat conversation IDs as opaque values. Don't parse or construct them to infer a relationship between a chat and a thread.

TODO: The SDK design includes related-chat information in channelData, but the exact properties and usage are pending.

## Considerations for proactive messages

The default behavior described above applies when responding to a received message through its context. This is reactive messaging. A proactive message, such as a scheduled notification, is sent outside that context, so an agent must retain the conversation information it needs to target the intended conversation.

For channels, the existing Teams SDK guidance describes targeting a thread with its conversation ID and root-message ID. Don't assume that the same targeting pattern applies to one-on-one chat threads. For the existing channel pattern, see [Proactive threading](/microsoftteams/platform/teams-sdk/essentials/sending-messages/proactive-messaging#proactive-threading). For general proactive messaging guidance, see [Send proactive messages](send-proactive-messages.md).

To proactively reply in a thread, store the containing chat or channel ID and the thread's root message ID when the message arrives. Also retain any service URL and agent identity required by your proactive messaging setup. Use the SDK's proactive reply method with the stored conversation and root-message IDs.

::: zone pivot="teams-sdk-typescript"

```typescript
// Store when the message arrives.
const saved = {
  chatOrChannelId: activity.channelData!.chat?.id ?? activity.channelData!.channel!.id,
  rootId: activity.channelData!.replyChain!.id,
};

// Later, outside a handler.
await app.reply(saved.chatOrChannelId, saved.rootId, 'Following up in the thread');
```

::: zone-end

::: zone pivot="teams-sdk-python"

```python
# Store when the message arrives.
data = ctx.activity.channel_data
chat_or_channel_id = data.chat.id if data.chat else data.channel.id
root_id = data.reply_chain.id

# Later, outside a handler.
await app.reply(chat_or_channel_id, root_id, 'Following up in the thread')
```

::: zone-end

::: zone pivot="teams-sdk-csharp"

```csharp
// Store when the message arrives.
var data = context.Activity.ChannelData!;
string chatOrChannelId = data.Chat?.Id ?? data.Channel!.Id!;
string rootId = data.ReplyChain!.Id!;

// Later, outside a handler.
await teamsApp.ReplyAsync(chatOrChannelId, rootId, "Following up in the thread");
```

::: zone-end

<!-- TODO: Validate proactive thread-targeting APIs and required stored values against the released SDK before publication. -->

## Streaming in threads

For SDK streaming, the first message in a stream follows the same placement rules as a context-based send. In a channel, it appears in the thread. In a one-on-one chat, it appears in the thread when the incoming message is threaded; otherwise, it appears at the top level. Later chunks update that message.

<!-- TODO: Confirm this behavior and any streaming limitations with the feature team before publication. -->

## See also

- [Channel and group chat conversations for agents](channel-and-group-conversations.md)
- [Send proactive messages](send-proactive-messages.md)
