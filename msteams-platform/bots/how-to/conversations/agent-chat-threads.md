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

When you respond, make three separate choices: which incoming message you're answering, where the response should appear (main chat or thread), and whether to quote a message. The SDK can choose the default placement from the incoming activity. Use explicit targeting when you want a different location.

## Understand messages in a chat and a thread

A **top-level message (L1)** appears in the main chat or channel conversation. A **thread reply (L2)** belongs to the discussion under a top-level message, also called the thread's root message. Threads keep related exchanges together so users can follow a discussion without mixing it with other messages in the chat or channel. Threads have one reply level. A reply can't start a nested thread.

Channel owners can choose a posts or threads layout for a channel. These layouts present channel conversations differently, but both use the same threaded conversation model.

Users can start a thread in a one-on-one agent chat by sending a threaded reply to a top-level message. The agent can then respond in that thread.

For message placement, keep the chat, incoming message, and thread root IDs distinct:

| Incoming message | `activity.id` | `conversation.id` | `channelData.chat.id` | `channelData.replyChain.id` |
| --- | --- | --- | --- | --- |
| Top-level message (L1) | Root message ID | Opaque main-chat ID | Containing chat ID | Root message ID when supplied |
| Thread reply (L2) | Follow-up message ID | Opaque thread ID | Same containing chat ID | Original root message ID |

For an L1 message, `replyChain.id` can equal `activity.id`. For an L2 message, it differs. Its presence alone doesn't indicate an L2 message. Some message actions and other events might omit thread metadata, so missing `replyChain.id` doesn't always establish placement. Don't parse or construct `conversation.id` to determine the chat or thread.

Three separate IDs can be involved when you respond: `chatId` identifies the containing chat, `incomingMessageId` identifies the request being answered, and `threadRootMessageId` identifies the thread destination. If you quote a message, `messageToQuoteId` identifies the message shown in the quote. These IDs can refer to different messages.

The Teams SDK uses the context of the received message to determine the default response location. In a one-on-one chat, the response matches the level of the incoming message.

## Respond to messages

In this article, a context-based response is a response sent from an activity handler using the received activity's context, without explicitly targeting a chat, channel, or reply chain. The Teams SDK uses that context to choose the default placement.

Choose the response location based on the incoming level and where you want the answer to appear. In this table, `ctx.send()` and `ctx.reply()` use the incoming activity context. The explicit `app` methods and signatures are from TypeScript SDK 2.2.0. TODO: Add version-specific C# and Python methods and examples.

| Incoming message | SDK default in a 1:1 chat | Respond at L1 in the main chat | Respond at L2 in a thread |
| --- | --- | --- | --- |
| Top-level message (L1) | L1 | `ctx.send(message)` or `ctx.reply(message)` | `app.reply(chatId, activity.id, message)` |
| Thread reply (L2) | L2 in the same thread | `app.send(chatId, message)` | `ctx.send(message)`, `ctx.reply(message)`, or `app.reply(chatId, replyChainId, message)` |

In channels, context-based responses are placed at L2. Use proactive `app.send(channelId, message)` to post at L1. For existing channel-thread guidance, see [Threaded conversations](channel-and-group-conversations.md#threaded-conversations).

### Identify message placement

Use `channelData.chat.id` to identify a one-on-one chat. For a channel, use `channelData.channel.id`. When supplied, `channelData.replyChain.id` identifies the root L1 message. Use the activity fields appropriate to the event to determine placement:

| Activity | Determine that it is threaded when |
| --- | --- |
| Typed message | `channelData.replyChain.id` equals `activity.id` for L1, and differs from `activity.id` for L2. If the property is absent, determine placement only when the activity type makes that inference reliable. |
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

### Choose an explicit destination

Use app-level methods when you need to choose a destination explicitly or send outside an activity handler. `app.send(chatOrChannelId, message)` posts at L1. `app.reply(chatOrChannelId, threadRootMessageId, message)` posts at L2. In a 1:1 chat, use `channelData.chat.id`; in a channel, use `channelData.channel.id`. Don't use a thread's `conversation.id` as the containing chat or channel ID.

For a 1:1 response to an L1 message, use its `activity.id` as the root ID to start an L2 thread. For a response to an L2 message, use its `channelData.replyChain.id` to continue the thread. To deliberately move an L2 response to the main chat, use `app.send(chatId, message)`. In channels, context-based responses are placed at L2; use a proactive `app.send(channelId, message)` to post at L1. See [Considerations for proactive messages](#considerations-for-proactive-messages) for examples that store these IDs.

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

Agents that don't use the Teams SDK can send an activity to the conversation activities endpoint to create a top-level message. In a one-on-one chat, use `channelData.chat.id` as `conversationId`, including when the incoming activity is in a thread. In a channel, use `channelData.channel.id`.

```http
POST {serviceUrl}/v3/conversations/{conversationId}/activities
```

To send a threaded reply, post the activity to the reply chain endpoint. Use `channelData.chat.id` for a one-on-one chat or `channelData.channel.id` for a channel as `chatOrChannelId`. Use the root message ID as `rootId`. For an incoming L1 message, the root ID is the incoming `activity.id`. For an incoming L2 message, it is `channelData.replyChain.id`.

```http
POST {serviceUrl}/v3/conversations/{chatOrChannelId}/replyChains/{rootId}
```

Setting `replyToId` on the activity doesn't determine its placement. Include the standard activity payload and authenticate the request as described in [Build a conversational capability](../../build-conversational-capability.md).

## Choose whether to quote a message

Placement, prompt association, and quoting are separate choices. `replyToId` associates an activity with the message being answered. A reply-chain ID selects the thread. A quote identifies a message to show in the response.

| Method | Placement | Quote behavior |
| --- | --- | --- |
| `ctx.send(message)` | Inherits placement from the incoming activity | Doesn't automatically quote |
| `ctx.reply(message)` | Inherits placement from the incoming activity | Automatically quotes an eligible incoming message |
| `ctx.quote(messageToQuoteId, message)` | Inherits placement from the incoming activity | Explicitly quotes the specified message and sends |
| `app.send(chatId, message)` | Sends at L1 in the specified chat | Doesn't automatically quote |
| `app.reply(chatOrChannelId, threadRootMessageId, message)` | Sends at L2 in the specified thread | Doesn't automatically quote |

In TypeScript SDK 2.2.0, `ctx.reply()` automatically quotes only when the incoming activity ID is a nonzero numeric message ID. For other ID formats, such as service-generated IDs, it behaves like `ctx.send()` and doesn't quote. This is an SDK implementation detail, so verify behavior for other SDK languages and versions. For more information about quoted replies, see [Quoted replies](/microsoftteams/platform/teams-sdk/essentials/sending-messages/overview#quoted-replies).

To quote a message other than the eligible incoming message, add the quote to the message content, then send it to the desired destination. `prependQuote()` adds the quote entity and its text placeholder.

::: zone pivot="teams-sdk-typescript"

```typescript
import { MessageActivityInput } from "@microsoft/teams.api";

const response = new MessageActivityInput('A threaded answer');
response.prependQuote(messageToQuoteId);
await app.reply(chatId, threadRootMessageId, response);
```

::: zone-end

::: zone pivot="teams-sdk-csharp"

TODO: Add a C# quoted-reply example and document automatic-quote eligibility for the supported SDK version. For existing examples, see [Quoted replies in C#](../../build-conversational-capability.md?pivots=teams-sdk-csharp#quoted-replies).

::: zone-end

::: zone pivot="teams-sdk-python"

TODO: Add a Python quoted-reply example and document automatic-quote eligibility for the supported SDK version. For existing examples, see [Quoted replies in Python](../../build-conversational-capability.md?pivots=teams-sdk-python#quoted-replies).

::: zone-end

`ctx.quote()` is a send operation. Don't call it to prepare a message and then send again with `app.reply()`, as that creates two messages. An explicit quote doesn't select or change the thread destination.

## Agent design guidance and best practices

In channels, users expect responses to their messages to appear in the associated thread. Keep top-level channel messages for proactive messages that are intended to start a new conversation.

In one-on-one chats, choose a response pattern that matches your agent's conversation model:

- For a focused discussion model, keep the exchange in a thread. When the incoming message is L1, explicitly start an L2 thread under it. When the incoming message is L2, continue in that thread.
- For a continuous main-chat model, leave an L1 response at L1. If a response to an L2 message should return to the main chat, explicitly send to the chat ID.

The SDK defaults to matching the incoming level. It doesn't start a new thread for every L1 message. The same placement patterns apply to chats with agentic users.

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
  rootId: activity.channelData?.replyChain?.id ?? (activity.type === 'message' ? activity.id : undefined),
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
root_id = data.reply_chain.id if data and data.reply_chain else ctx.activity.id if ctx.activity.type == 'message' else None

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
string? rootId = data?.ReplyChain?.Id ??
  (context.Activity.Type == "message" ? context.Activity.Id : null);

// Later, outside a handler.
if (!string.IsNullOrEmpty(chatOrChannelId) && !string.IsNullOrEmpty(rootId))
{
    await teamsApp.ReplyAsync(chatOrChannelId, rootId, "Following up in the thread");
}
```

::: zone-end

## Streaming in threads

With `ctx.stream`, the first streamed response creates the message and inherits placement from the incoming activity, as `ctx.send()` does. In a one-on-one chat, it stays at the incoming message level. In a channel, it starts in the incoming message's thread. Later chunks and the final response update that same message. They don't create separate messages or change its placement.

In TypeScript SDK 2.2.0, the source sends the first thread-bound stream message to the reply-chain endpoint. Later chunks and finalization update the created activity through the activities endpoint using the stream ID. This endpoint change is part of the stream lifecycle and doesn't, by itself, indicate a placement change or a Teams rendering defect. The behavior of an explicit placement override for `ctx.stream` isn't documented here as a supported public recipe.

Streaming doesn't automatically quote the incoming message. To include a quote, emit a message with an explicit quote, independently of the stream's placement:

::: zone pivot="teams-sdk-typescript"

```typescript
import { MessageActivityInput } from "@microsoft/teams.api";

const response = new MessageActivityInput('A streamed answer');
response.prependQuote(messageToQuoteId);
ctx.stream.emit(response);
await ctx.stream.close();
```

::: zone-end

::: zone pivot="teams-sdk-csharp"

TODO: Add a version-specific C# streaming example and validate quote behavior across the full stream lifecycle. See [C# streaming guidance](../../streaming-ux.md).

::: zone-end

::: zone pivot="teams-sdk-python"

TODO: Add a version-specific Python streaming example and validate quote behavior across the full stream lifecycle. See [Python streaming guidance](../../streaming-ux.md).

::: zone-end

In TypeScript SDK 2.2.0, streamed text is accumulated, but final message metadata comes from the last emitted message. For multi-chunk quoted responses, verify that quote entities and placeholders are preserved without duplication and that the quote preview renders as expected. The example above shows a single message emit, not a complete multi-chunk quoting recipe.

The documented `ctx.stream` path inherits placement from the incoming activity. This article doesn't provide a public API recipe for overriding stream placement.

## Plans in threads

`replyToId` anchors a plan to the prompt that started it. It doesn't by itself select a thread or add a visible quote. In the TypeScript SDK 2.2.0 source, a plan created with `ctx.plan()` configures reply-chain routing for completion when the prompt is in a one-on-one thread. Plan start, update, stop, and error activities use the conversation route with the prompt ID. This is source-derived routing behavior, not confirmation of how every Teams client renders plan progress. Verify the supported package, service, and client versions before relying on placement across the full plan lifecycle. Don't assume the same implementation across SDK languages.

To quote a message in the plan's final answer, add an explicit quote to a message input passed to `complete()`:

::: zone pivot="teams-sdk-typescript"

```typescript
import { MessageActivityInput } from "@microsoft/teams.api";

const finalAnswer = new MessageActivityInput('The answer');
finalAnswer.prependQuote(messageToQuoteId);
await plan.complete(finalAnswer);
```

::: zone-end

::: zone pivot="teams-sdk-csharp"

TODO: Add version-specific C# plan examples.

::: zone-end

::: zone pivot="teams-sdk-python"

TODO: Add version-specific Python plan examples.

::: zone-end

The `plan.complete()` quote example describes SDK input construction. It doesn't establish quote rendering on plan progress activities.

## See also

- [Channel and group chat conversations for agents](channel-and-group-conversations.md)
- [Send proactive messages](send-proactive-messages.md)
