---
title: Use threads in channels and one-on-one agent chats
description: Learn why agents should use threads, identify incoming message placement, and send responses to the main conversation or a thread.
ms.localizationpriority: medium
ms.topic: how-to
ms.date: 11/13/2026
zone_pivot_groups: teams-sdk-languages
---

# Use threads in channels and one-on-one agent chats

A Teams agent can start a thread or respond within an existing thread to keep a discussion together under its original message. Threads help users work through a task without mixing follow-up questions with other conversations.

Threading is available in one-on-one agent chats, including chats with agentic users, and in channels. Support will expand to group chats.

In a given context, messages appear at one of two levels:

- **L1 (top-level):** A message in the main chat or channel conversation. Where threading is supported, an L1 message can be the root of a thread.
- **L2 (in-thread):** A reply in the thread under a top-level (L1) message. All replies in that thread share the same root. An L2 reply can't start a nested thread.

## Recommended agent behavior

In channels and chats that support threading, agents should respond in threads (L2):

- If the user's message is top-level (L1), reply in a thread under that message.
- If the user's message is already in a thread (L2), reply in the same thread.

Apply the same rules when responding to an action on a message. Send a new top-level message (L1) only to start a separate discussion.

For example, a user sends "Help me plan a trip" as a top-level message. The agent replies in a thread under that request, where the user and agent discuss dates, hotels, and itinerary changes.

## Identify and track discussions

### Get the discussion IDs

Use the following IDs from the incoming activity to identify a discussion and choose where to send responses:

| ID | Incoming activity field |
| --- | --- |
| Containing chat or channel ID | `channelData.chat.id` or `channelData.channel.id` |
| L1 root message ID | `channelData.replyChain.id` |

Both top-level messages (L1) and thread replies (L2) include `channelData.replyChain.id` when threading is supported. This field always identifies the top-level message at the root of the discussion.

Before replying in a thread, check that the incoming activity includes `channelData.replyChain.id`. Its presence indicates threading support, not whether the incoming activity is L1 or L2. If the field is absent, don't attempt a thread reply for that activity.

If your agent needs to handle these levels differently, see [Identify the incoming activity's level](#identify-the-incoming-activitys-level).

### Store data by scope

Choose the storage key based on the scope of your data:

- For data about the entire chat or channel, use `channelData.chat.id` or `channelData.channel.id`.
- For data about a specific thread, use the containing chat or channel ID together with the L1 root message ID (`channelData.replyChain.id`).

Don't assume a particular meaning for `conversation.id` or use it as the storage key for this data. Treat it as an opaque value: don't parse it or use it to distinguish L1 from L2.


## Implement threading with Teams SDK

The activity context (`ctx` or `context`) represents the incoming activity; `app` represents the agent application. With context send and reply methods, the SDK chooses where the response appears based on the incoming activity level and conversation type. With app-level send and reply methods, you specify the destination yourself. You can call the app-level methods while handling an incoming activity or later, proactively.

### Choose where a message goes

::: zone pivot="teams-sdk-csharp"

| To do this | Call | One-on-one chat | Channel |
| --- | --- | --- | --- |
| Respond where the user wrote | `context.SendAsync(message)` | In the same thread if the user's message is L2; otherwise L1. | In the thread of the user's message. |
| Respond and quote the user's message | `context.ReplyAsync(message)` | Same placement as `SendAsync`, with a quote when eligible. | Same placement as `SendAsync`, with a quote when eligible. |
| Post a new top-level message | `teamsApp.SendAsync(chatOrChannelId, message)` | At the top level (L1). | At the top level (L1). |
| Reply in a thread | `teamsApp.ReplyAsync(chatOrChannelId, rootId, message)` | In the specified root message's thread (L2), starting it if needed. No automatic quote. | In the specified root message's thread (L2). No automatic quote. |

Take `chatOrChannelId` from `ChannelData.Chat.Id` or `ChannelData.Channel.Id`, and `rootId` from `ChannelData.ReplyChain.Id`.

::: zone-end

::: zone pivot="teams-sdk-typescript"

| To do this | Call | One-on-one chat | Channel |
| --- | --- | --- | --- |
| Respond where the user wrote | `ctx.send(message)` | In the same thread if the user's message is L2; otherwise L1. | In the thread of the user's message. |
| Respond and quote the user's message | `ctx.reply(message)` | Same placement as `send`, with a quote when eligible. | Same placement as `send`, with a quote when eligible. |
| Post a new top-level message | `app.send(chatOrChannelId, message)` | At the top level (L1). | At the top level (L1). |
| Reply in a thread | `app.reply(chatOrChannelId, rootId, message)` | In the specified root message's thread (L2), starting it if needed. No automatic quote. | In the specified root message's thread (L2). No automatic quote. |

Take `chatOrChannelId` from `channelData.chat.id` or `channelData.channel.id`, and `rootId` from `channelData.replyChain.id`.

::: zone-end

::: zone pivot="teams-sdk-python"

| To do this | Call | One-on-one chat | Channel |
| --- | --- | --- | --- |
| Respond where the user wrote | `ctx.send(message)` | In the same thread if the user's message is L2; otherwise L1. | In the thread of the user's message. |
| Respond and quote the user's message | `ctx.reply(message)` | Same placement as `send`, with a quote when eligible. | Same placement as `send`, with a quote when eligible. |
| Post a new top-level message | `app.send(chat_or_channel_id, message)` | At the top level (L1). | At the top level (L1). |
| Reply in a thread | `app.reply(chat_or_channel_id, root_id, message)` | In the specified root message's thread (L2), starting it if needed. No automatic quote. | In the specified root message's thread (L2). No automatic quote. |

Take `chat_or_channel_id` from `channel_data.chat.id` or `channel_data.channel.id`, and `root_id` from `channel_data.reply_chain.id`.

::: zone-end

> [!IMPORTANT]
> In a one-on-one chat, the send and reply methods on the incoming context object respond to a top-level (L1) message at L1. **This default differs from the recommended agent behavior, which is to respond in the message's thread (L2).** To respond at L2 in a supported chat, use the app-level reply method with the containing chat ID and the root message ID. In channels, context-based responses already go to L2.

### Sending a reply

The following examples show how to send a thread reply (L2) in a one-on-one chat. They assume you've initialized a Teams SDK app and use the app-level methods to explicitly reply in the thread. For channels, use the channel ID as indicated in the table above.

> [!NOTE]
> Reply-chain types and low-level SDK operations are marked experimental. The SDK send and reply helpers used in this article aren't marked experimental. See the SDK reference for language-specific annotations and warnings.

::: zone pivot="teams-sdk-typescript"

These examples use `@microsoft/teams.apps` version 2.2.0.

Configure the app's `serviceUrl` with the destination's full incoming service URL before using app-level methods. These methods use the app configuration, then `SERVICE_URL`, then `https://smba.trafficmanager.net/teams`; they don't take a per-call URL or automatically use the incoming activity's URL.

```typescript
import { getAgenticIdentity } from '@microsoft/teams.api';

app.on('message', async ({ activity }) => {
  const chatId = activity.channelData?.chat?.id;
  const rootId = activity.channelData?.replyChain?.id;
  if (!chatId || !rootId) {
    throw new Error('A chat ID and thread root ID are required.');
  }

  await app.reply(chatId, rootId, 'Let us plan your trip in this thread.', {
    agenticIdentity: getAgenticIdentity(activity.recipient),
  });
});
```

To start a separate discussion at L1, use `app.send(chatId, message)` instead of `app.reply()`. This call requires only the chat ID, so omit the root ID requirement:

```typescript
await app.send(chatId, 'Your trip itinerary is ready.', {
  agenticIdentity: getAgenticIdentity(activity.recipient),
});
```

::: zone-end

::: zone pivot="teams-sdk-csharp"

The reply-chain routing shown here requires `Microsoft.Teams.Apps` version 2.2 or later.

```csharp
teamsApp.OnMessage(async (context, cancellationToken) =>
{
    var activity = context.Activity;
    string? chatId = activity.ChannelData?.Chat?.Id;
    string? rootId = activity.ChannelData?.ReplyChain?.Id;
    if (string.IsNullOrEmpty(chatId) || string.IsNullOrEmpty(rootId))
    {
        throw new InvalidOperationException(
            "A chat ID and thread root ID are required.");
    }

    await teamsApp.ReplyAsync(
        chatId,
        rootId,
        "Let us plan your trip in this thread.",
        serviceUrl: activity.ServiceUrl,
        agenticIdentity: activity.Recipient?.GetAgenticIdentity(),
        cancellationToken: cancellationToken);
});
```

To start a separate discussion at L1, use `teamsApp.SendAsync(chatId, message)` instead of `teamsApp.ReplyAsync()`. This call requires only the chat ID, so omit the root ID requirement:

```csharp
await teamsApp.SendAsync(
    chatId,
    "Your trip itinerary is ready.",
    serviceUrl: activity.ServiceUrl,
    agenticIdentity: activity.Recipient?.GetAgenticIdentity(),
    cancellationToken: cancellationToken);
```

Without an explicit `serviceUrl`, C# app-level sends use the last inbound activity's service URL; they throw until the app has received an activity.

::: zone-end

::: zone pivot="teams-sdk-python"

Use a release with the reply-chain APIs described in the [Python SDK threading guide](https://microsoft.github.io/teams-sdk/python/essentials/sending-messages/#threading).

```python
from microsoft_teams.api import MessageActivity
from microsoft_teams.apps import ActivityContext

@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    activity = ctx.activity
    data = activity.channel_data
    chat_id = data.chat.id if data and data.chat else None
    root_id = data.reply_chain.id if data and data.reply_chain else None
    if not chat_id or not root_id:
        raise ValueError("A chat ID and thread root ID are required.")

    await app.reply(
        chat_id,
        root_id,
        "Let us plan your trip in this thread.",
        service_url=activity.service_url,
        agentic_identity=activity.recipient.agentic_identity,
    )
```

To start a separate discussion at L1, use `app.send(chat_id, message)` instead of `app.reply()`. This call requires only the chat ID, so omit the root ID requirement:

```python
await app.send(
    chat_id,
    "Your trip itinerary is ready.",
    service_url=activity.service_url,
    agentic_identity=activity.recipient.agentic_identity,
)
```

Without an explicit `service_url`, Python app-level sends use the app's configured URL, then `SERVICE_URL`, then `https://smba.trafficmanager.net/teams`.

::: zone-end

## Implement threading with REST API (preview)

To send a top-level message (L1) with the REST API, use the containing chat or channel ID. Set `chatOrChannelId` to `channelData.chat.id` for a chat or `channelData.channel.id` for a channel:

```http
POST {serviceUrl}/v3/conversations/{chatOrChannelId}/activities
```

This is the REST API equivalent of `app.send(chatOrChannelId, message)` for a top-level message (L1).

To send an L2 reply, post to the reply-chain endpoint with the same containing chat or channel ID. Set `rootId` to the incoming activity's `channelData.replyChain.id`:

```http
POST {serviceUrl}/v3/conversations/{chatOrChannelId}/replyChains/{rootId}
```

This is the REST API equivalent of `app.reply(chatOrChannelId, rootId, message)` for a thread reply (L2).

Use the full incoming `serviceUrl`, include the standard activity payload, and authenticate as described in [Build a conversational capability](../../build-conversational-capability.md).

Existing integrations remain compatible: posting to `/activities` with a conversation ID in the form `19:...;messageid={rootId}` continues to send at L2 in channels and also works in chats that support threading. Use the reply-chain endpoint for new implementations.

### Threading-specific error responses

The reply-chain endpoint can return the following errors:

| Condition | HTTP status and error code | Error message |
| --- | --- | --- |
| `chatOrChannelId` isn't a containing chat or channel ID. | `400 BadArgument` | `conversationId must be a thread id (19:...@...), not a reply-chain id (;messageid=) or a user id; the reply chain is identified by replyChainId` |
| The chat or channel doesn't exist or was deleted. | `404 ConversationNotFound` | `Conversation not found.` |
| `rootId` doesn't exist in the specified chat or channel. | `404 ActivityNotFoundInConversation` | `Message does not exist in the thread.` |
| `rootId` identifies a targeted message. | `400 BadArgument` | `Replies are not allowed for Targeted Messages.` |
| The chat doesn't support threads. | `400 BadArgument` | `Reply chains is not allowed in this thread type.` |

## Identify the incoming activity's level

Identifying the incoming activity's level is optional. If your agent handles top-level messages and thread replies differently, an L2 activity can be identified using the following:

| Incoming activity | L2 when |
| --- | --- |
| Typed `message`, `messageUpdate`, or `messageDelete` | `channelData.replyChain.id` is present and differs from `activity.id`. |
| `messageReaction` | `channelData.replyChain.id` is present and a valid `replyToId` differs from it. |
| Card button sent as a `message` with `channelData.source` | `channelData.replyChain.id` is present and a valid `replyToId` differs from it. |
| Message-action `invoke` with `value.messagePayload` | `channelData.replyChain.id` is present and a valid `value.messagePayload.id` differs from it. |
| Other `invoke` with `replyToId` | `channelData.replyChain.id` is present and a valid `replyToId` differs from it. |
| Other activity types, such as `installationUpdate` or `conversationUpdate` | Never classified as L2. |

For reactions and actions, a valid message ID is a plain numeric ID other than `0`, and the comparison requires a root ID.

## See also

- [Channel and group chat conversations for agents](channel-and-group-conversations.md)
- [Send proactive messages](send-proactive-messages.md)
- [Stream bot messages](../../streaming-ux.md)

::: zone pivot="teams-sdk-typescript"

- [Teams SDK threading guide](https://microsoft.github.io/teams-sdk/typescript/essentials/sending-messages/#threading)
- [Teams SDK proactive threading guide](https://microsoft.github.io/teams-sdk/typescript/essentials/sending-messages/proactive-messaging/#proactive-threading)

::: zone-end

::: zone pivot="teams-sdk-csharp"

- [Teams SDK threading guide](https://microsoft.github.io/teams-sdk/csharp/essentials/sending-messages/#threading)
- [Teams SDK proactive threading guide](https://microsoft.github.io/teams-sdk/csharp/essentials/sending-messages/proactive-messaging/#proactive-threading)

::: zone-end

::: zone pivot="teams-sdk-python"

- [Teams SDK threading guide](https://microsoft.github.io/teams-sdk/python/essentials/sending-messages/#threading)
- [Teams SDK proactive threading guide](https://microsoft.github.io/teams-sdk/python/essentials/sending-messages/proactive-messaging/#proactive-threading)

::: zone-end
