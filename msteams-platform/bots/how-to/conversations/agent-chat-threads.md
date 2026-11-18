---
title: Use threads in channels and one-on-one agent chats
description: Learn why agents should use threads, identify incoming message placement, and send responses to the main conversation or a thread.
ms.topic: how-to
ms.date: 11/17/2026
zone_pivot_groups: teams-sdk-languages
---

# Use threads in channels and one-on-one agent chats

In channels and chats that support threading, messages appear at two levels:

- **L1 (top-level):** A message in the main chat or channel conversation. An L1 message can be the root of a thread.
- **L2 (in-thread):** A reply in the thread under a top-level (L1) message. All replies in that thread share the same root. An L2 reply can't start a nested thread.

An agent can start a new thread or respond within an existing thread to keep a discussion together under its original message. Threads help users work through a task without mixing follow-up questions with other conversations.

The threading capabilities described in this article are in preview. They are available in channels and one-on-one agent chats, including chats with agentic users. Group and one-on-one user chats will be available in preview soon.

## Recommended agent behavior

Where threading is supported, agents should always respond in a thread:

- If the user's message is top-level (L1), reply in a thread under that message.
- If the user's message is already in a thread (L2), reply in the same thread.

Send a new top-level message only to start a separate discussion.

For example, a user sends "Help me plan a trip" as a top-level message. The agent replies in a thread under that request, where the user and agent discuss dates, hotels, and itinerary changes.

## Identify and track discussions

### Get the discussion IDs

Use the following IDs from the incoming activity to identify a discussion and choose where to send responses:

| ID | Incoming activity field |
| --- | --- |
| Containing chat or channel ID | `channelData.chat.id` or `channelData.channel.id` |
| Thread root message ID | `channelData.replyChain.id` |

Both top-level messages (L1) and thread replies (L2) include `channelData.replyChain.id` when threading is supported. This field always identifies the top-level message at the root of the discussion.

Before attempting a thread reply for an incoming activity, check that it provides `channelData.replyChain.id`. If the field is absent, don't attempt a thread reply for that activity.

If your agent needs to handle these levels differently, see [Identify the incoming activity's level](#identify-the-incoming-activitys-level).

### Store data by scope

Your agent might store conversation history or task progress to continue a discussion across multiple messages. Choose a storage key based on the scope of that data:

- For data about the entire chat or channel, use `channelData.chat.id` or `channelData.channel.id`.
- For data about a specific thread, use the containing chat or channel ID together with the L1 root message ID (`channelData.replyChain.id`).

Don't assume a particular meaning for `conversation.id` or use it as the storage key for this data. Treat it as an opaque value: don't parse it or use it to distinguish L1 from L2.

## Implement threading with Teams SDK

The activity context (`ctx` below) represents the incoming activity; `app` represents the agent application. With context-level send and reply methods, the SDK chooses where the response appears based on the incoming activity level and conversation type. With app-level send and reply methods, you specify the destination yourself. You can call the app-level methods while handling an incoming activity or later for [proactive messaging](send-proactive-messages.md), such as notifications or scheduled reminders that aren't direct responses to user requests.

### Choose where a message goes

> [!IMPORTANT]
> In a one-on-one chat, the send and reply methods on the incoming context object respond to a top-level (L1) message at L1. **This default differs from the recommended agent behavior, which is to respond in the message's thread (L2).** To respond at L2 in a supported chat, use the app-level reply method with the containing chat ID and the root message ID. In channels, context-based responses already go to L2.

::: zone pivot="teams-sdk-csharp"

| To do this | Call | One-on-one chat | Channel |
| --- | --- | --- | --- |
| Respond where the user wrote | `ctx.SendAsync(message)` | In the same thread if the user's message is L2; otherwise L1. | In the thread of the user's message. |
| Respond and quote the user's message | `ctx.ReplyAsync(message)` | Same placement as `SendAsync`. | Same placement as `SendAsync`. |
| Post a new top-level message | `app.SendAsync(chatOrChannelId, message)` | At the top level (L1). | At the top level (L1). |
| Reply in a thread | `app.ReplyAsync(chatOrChannelId, rootMessageId, message)` | In the specified root message's thread (L2), starting it if needed. No automatic quote. | In the specified root message's thread (L2). No automatic quote. |

Take `chatOrChannelId` from `ChannelData.Chat.Id` or `ChannelData.Channel.Id`, and `rootMessageId` from `ChannelData.ReplyChain.Id`.

::: zone-end

::: zone pivot="teams-sdk-typescript"

| To do this | Call | One-on-one chat | Channel |
| --- | --- | --- | --- |
| Respond where the user wrote | `ctx.send(message)` | In the same thread if the user's message is L2; otherwise L1. | In the thread of the user's message. |
| Respond and quote the user's message | `ctx.reply(message)` | Same placement as `send`. | Same placement as `send`. |
| Post a new top-level message | `app.send(chatOrChannelId, message)` | At the top level (L1). | At the top level (L1). |
| Reply in a thread | `app.reply(chatOrChannelId, rootMessageId, message)` | In the specified root message's thread (L2), starting it if needed. No automatic quote. | In the specified root message's thread (L2). No automatic quote. |

Take `chatOrChannelId` from `channelData.chat.id` or `channelData.channel.id`, and `rootMessageId` from `channelData.replyChain.id`.

::: zone-end

::: zone pivot="teams-sdk-python"

| To do this | Call | One-on-one chat | Channel |
| --- | --- | --- | --- |
| Respond where the user wrote | `ctx.send(message)` | In the same thread if the user's message is L2; otherwise L1. | In the thread of the user's message. |
| Respond and quote the user's message | `ctx.reply(message)` | Same placement as `send`. | Same placement as `send`. |
| Post a new top-level message | `app.send(chat_or_channel_id, message)` | At the top level (L1). | At the top level (L1). |
| Reply in a thread | `app.reply(chat_or_channel_id, root_message_id, message)` | In the specified root message's thread (L2), starting it if needed. No automatic quote. | In the specified root message's thread (L2). No automatic quote. |

Take `chat_or_channel_id` from `channel_data.chat.id` or `channel_data.channel.id`, and `root_message_id` from `channel_data.reply_chain.id`.

::: zone-end

### Reply in a thread

The following examples show how to send a thread reply (L2) in a chat. They assume you've initialized a Teams SDK app and use the app-level methods to explicitly reply in the thread. For channels, use the channel ID as indicated in the table above.

When responding as an agentic user, app-level send and reply methods require you to pass the agentic identity explicitly, even when called inside an incoming activity handler. Context-level methods use the incoming activity's identity automatically. For more information, see [Receiving and sending messages as an Agentic User](../../../concepts/agentic-identity/receiving-sending-messages.md).

App-level methods aren't tied to an incoming activity, so they need to know which service URL to send to. Use the service URL from the activity you're responding to. With a wrong or incomplete URL, a thread reply can post at the top level or return a 404.

::: zone pivot="teams-sdk-typescript"

Use Teams SDK version 2.2 or later for these examples.

Configure the app's `serviceUrl` with the destination's full service URL before using app-level methods. The `serviceUrl` you set applies to every `app.send` and `app.reply` call on that app, whichever conversation they target. To send to a destination with a different service URL, you need a separate `App` instance.

```typescript
import { getAgenticIdentity } from '@microsoft/teams.api';

const app = new App({
  serviceUrl: '<incoming service URL>',
});

app.start();

app.on('message', async (ctx) => {
  const activity = ctx.activity;
  const chatId = activity.channelData?.chat?.id;
  const rootMessageId = activity.channelData?.replyChain?.id;
  if (!chatId || !rootMessageId) {
    throw new Error('A chat ID and thread root message ID are required.');
  }

  await app.reply(chatId, rootMessageId, 'Let us plan your trip in this thread.', {
    agenticIdentity: getAgenticIdentity(activity.recipient), // agentic user only
  });
});
```

To start a separate discussion at L1, use `app.send(chatId, message)` instead of `app.reply()`. A root message ID is not required.

```typescript
await app.send(chatId, 'A new travel policy is available.', {
  agenticIdentity: getAgenticIdentity(activity.recipient), // agentic user only
});
```

::: zone-end

::: zone pivot="teams-sdk-csharp"

Use Teams SDK version 2.2 or later for these examples.

```csharp
app.OnMessage(async (ctx, cancellationToken) =>
{
    var activity = ctx.Activity;
    string? chatId = activity.ChannelData?.Chat?.Id;
    string? rootMessageId = activity.ChannelData?.ReplyChain?.Id;
    if (string.IsNullOrEmpty(chatId) || string.IsNullOrEmpty(rootMessageId))
    {
        throw new InvalidOperationException(
            "A chat ID and thread root message ID are required.");
    }

    await app.ReplyAsync(
        chatId,
        rootMessageId,
        "Let us plan your trip in this thread.",
        serviceUrl: activity.ServiceUrl,
        agenticIdentity: activity.Recipient?.GetAgenticIdentity(), // agentic user only
        cancellationToken: cancellationToken);
});
```

To start a separate discussion at L1, use `app.SendAsync(chatId, message)` instead of `app.ReplyAsync()`. A root message ID is not required.

```csharp
await app.SendAsync(
    chatId,
    "A new travel policy is available.",
    serviceUrl: activity.ServiceUrl,
    agenticIdentity: activity.Recipient?.GetAgenticIdentity(), // agentic user only
    cancellationToken: cancellationToken);
```

Without an explicit `serviceUrl`, C# app-level sends use the last inbound activity's service URL; they throw until the app has received an activity.

::: zone-end

::: zone pivot="teams-sdk-python"

Use Teams SDK version 2.2 or later for these examples.

```python
from microsoft_teams.api import MessageActivity
from microsoft_teams.apps import ActivityContext

@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    activity = ctx.activity
    data = activity.channel_data
    chat_id = data.chat.id if data and data.chat else None
    root_message_id = data.reply_chain.id if data and data.reply_chain else None
    if not chat_id or not root_message_id:
        raise ValueError("A chat ID and thread root message ID are required.")

    await app.reply(
        chat_id,
        root_message_id,
        "Let us plan your trip in this thread.",
        service_url=activity.service_url,
        agentic_identity=activity.recipient.agentic_identity, # agentic user only
    )
```

To start a separate discussion at L1, use `app.send(chat_id, message)` instead of `app.reply()`. A root message ID is not required.

```python
await app.send(
    chat_id,
    "A new travel policy is available.",
    service_url=activity.service_url,
    agentic_identity=activity.recipient.agentic_identity, # agentic user only
)
```

Without an explicit `service_url`, Python app-level sends use the app's configured URL, then `SERVICE_URL`, then `https://smba.trafficmanager.net/teams`.

::: zone-end

## Implement threading with the REST API

These endpoints use the Agent Communication Service (ACS) REST API. Use the full `serviceUrl` from the incoming activity. Follow the token acquisition and request construction instructions in [Connect an agent to Teams without an SDK](../../../agents-in-teams/connect-agent-without-sdk.md#implement-acs-request-construction). In the following examples, `{accessToken}` is the resulting ACS access token.

### Send a top-level message

To send a top-level message (L1) with the REST API, use the containing chat or channel ID. Set `chatOrChannelId` to `channelData.chat.id` for a chat or `channelData.channel.id` for a channel:

```http
POST {serviceUrl}/v3/conversations/{chatOrChannelId}/activities
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "type": "message",
  "text": "A new travel policy is available."
}
```

This is the REST API equivalent of `app.send(chatOrChannelId, message)`.

A successful top-level send returns a [ResourceResponse](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference#send-to-conversation) containing the sent message's `id`. For example:

```json
{
  "id": "{messageId}"
}
```

Store this ID as the root message ID if your agent needs to send replies in this message's thread later.

### Send an in-thread reply

For new implementations, use the following `/replyChains` endpoint to send in-thread replies (L2). Use the same containing chat or channel ID for `chatOrChannelId`. Set `rootMessageId` to the incoming activity's `channelData.replyChain.id`, or to the stored `id` returned when your agent sent the top-level message:

```http
POST {serviceUrl}/v3/conversations/{chatOrChannelId}/replyChains/{rootMessageId}
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "type": "message",
  "text": "Let us plan your trip in this thread."
}
```

This is the REST API equivalent of `app.reply(chatOrChannelId, rootMessageId, message)`.

Existing integrations that already send L2 messages directly through `/activities` can continue using that route.

### Threading-specific error responses

Sending an in-thread reply can return the following errors:

| Condition | HTTP status code | Response error code | Error message |
| --- | --- | --- | --- |
| `chatOrChannelId` isn't a containing chat or channel ID. | `400` | `BadArgument` | `conversationId must be a thread id (19:...@...), not a reply-chain id (;messageid=) or a user id; the reply chain is identified by replyChainId` |
| The chat or channel doesn't exist or was deleted. | `404` | `ConversationNotFound` | `Conversation not found.` |
| `rootMessageId` doesn't exist in the specified chat or channel. | `404` | `ActivityNotFoundInConversation` | `Message does not exist in the thread.` |
| `rootMessageId` identifies a targeted message. | `400` | `BadArgument` | `Replies are not allowed for Targeted Messages.` |
| The chat doesn't support threads. | `400` | `BadArgument` | `Reply chains is not allowed in this thread type.` |

## Identify the incoming activity's level

Identifying the incoming activity's level is optional. If your agent handles top-level messages and thread replies differently, use the following criteria.

To classify an activity as L2, `channelData.replyChain.id` (the root message ID) must be present. Then apply the additional conditions in the table:

| Incoming activity | Additional condition for L2 |
| --- | --- |
| User-typed `message`, `messageUpdate`, or `messageDelete` | `activity.id` differs from the root message ID. |
| `messageReaction` activity | `replyToId` differs from the root message ID. |
| Card button response sent as a `message` with `channelData.source` | `replyToId` differs from the root message ID. |
| Message-action `invoke` with `value.messagePayload` | `value.messagePayload.id` differs from the root message ID. |
| Other `invoke` with `replyToId` | `replyToId` differs from the root message ID. |
| `invoke` with neither `value.messagePayload` nor `replyToId` | No additional condition. |
| Other activity types, such as `installationUpdate` or `conversationUpdate` | Never classified as L2. |

## See also

- [Channel and group chat conversations for agents](channel-and-group-conversations.md)
- [Send proactive messages](send-proactive-messages.md)
- [Stream bot messages](../../streaming-ux.md)
