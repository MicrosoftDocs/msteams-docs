---
title: Use threads in channels and one-on-one agent chats
description: Learn why agents should use threads, identify incoming message placement, and send responses to the main conversation or a thread.
ms.topic: how-to
ms.date: 11/23/2026
zone_pivot_groups: teams-sdk-languages
---

# Use threads in channels and one-on-one agent chats

In channels and chats that support threading, messages appear at two levels:

- **Top-level:** A message in the main chat or channel conversation. A top-level message can be the root of a thread.
- **In-thread:** A reply in the thread under a top-level message. All replies in that thread share the same root. An in-thread reply can't start a nested thread.

An agent can start a new thread or respond within an existing thread to keep a discussion together under its original message. Threads help users work through a task without mixing follow-up questions with other conversations.

The threading capabilities described in this article are in preview. They are available in channels and one-on-one agent chats, including chats with agentic users. Group and one-on-one user chats will be available in preview soon.

## Recommended agent behavior

Where threading is supported, agents should always respond in a thread:

- If the user's message is top-level, reply in a thread under that message.
- If the user's message is already in a thread, reply in the same thread.

Send a new top-level message only to start a separate discussion.

For example, a user sends "Help me plan a trip" as a top-level message. The agent replies in a thread under that request, where the user and agent discuss dates, hotels, and itinerary changes.

## Identify and track discussions

### Get the discussion IDs

Use the following IDs from the incoming activity to identify a discussion and choose where to send responses:

| ID | Incoming activity field |
| --- | --- |
| Containing chat or channel ID | `channelData.chat.id` or `channelData.channel.id` |
| Thread root message ID | `channelData.replyChain.id` |

Both top-level messages and in-thread replies include `channelData.replyChain.id` when threading is supported. This field always identifies the top-level message at the root of the discussion.

Before attempting a thread reply for an incoming activity, check that it provides `channelData.replyChain.id`. If the field is absent, don't attempt a thread reply for that activity.

If your agent needs to handle these levels differently, see [Identify the incoming activity's level](#identify-the-incoming-activitys-level).

### Store data by scope

Your agent might store conversation history or task progress to continue a discussion across multiple messages. Choose a storage key based on the scope of that data:

- For data about the entire chat or channel, use `channelData.chat.id` or `channelData.channel.id`.
- For data about a specific thread, use the containing chat or channel ID together with the top-level root message ID (`channelData.replyChain.id`).

Don't assume a particular meaning for `conversation.id` or use it as the storage key for this data. Treat it as an opaque value: don't parse it or use it to distinguish top-level messages from in-thread replies.

## Implement threading with Teams SDK

The activity context (`ctx` below) represents the incoming activity; `app` represents the agent application (`teams` in the C# examples). With context-level send and reply methods, the SDK chooses where the response appears based on the incoming activity level and conversation type. With app-level send and reply methods, you specify the destination yourself. To respond to the incoming activity, use the context-level methods. Use the app-level methods for [proactive messaging](send-proactive-messages.md), such as notifications, scheduled reminders, or a reply sent when a long task finishes, and to post a new top-level message while handling an in-thread message.

### Choose where a message goes

The context-level reply method follows the recommended agent behavior: in a chat, a reply to a top-level message starts a thread under that message, and a reply to an in-thread message stays in its thread. In a chat, the context-level send method keeps the level of the user's message. The following tables describe the default [reply mode](#choose-a-reply-mode) (Teams SDK 2.3.0 and later).

::: zone pivot="teams-sdk-csharp"

| To do this | Call | Chat | Channel |
| --- | --- | --- | --- |
| Respond where the user wrote | `ctx.SendAsync(message)` | In the same thread if the user's message is in a thread; otherwise at the top level. | In the thread of the user's message. |
| Reply to the user's message | `ctx.ReplyAsync(message)` | In the thread of the user's message, starting it if the message is top-level. Quotes the user's message. | In the thread of the user's message. Quotes the user's message. |
| Post a new top-level message | `teams.SendAsync(chatOrChannelId, message)` | At the top level. | At the top level. |
| Reply in a thread | `teams.ReplyAsync(chatOrChannelId, rootMessageId, message)` | In the specified root message's thread, starting it if needed. No automatic quote. | In the specified root message's thread. No automatic quote. |

Take `chatOrChannelId` from `ChannelData.Chat.Id` or `ChannelData.Channel.Id`, and `rootMessageId` from `ChannelData.ReplyChain.Id`.

::: zone-end

::: zone pivot="teams-sdk-typescript"

| To do this | Call | Chat | Channel |
| --- | --- | --- | --- |
| Respond where the user wrote | `ctx.send(message)` | In the same thread if the user's message is in a thread; otherwise at the top level. | In the thread of the user's message. |
| Reply to the user's message | `ctx.reply(message)` | In the thread of the user's message, starting it if the message is top-level. Quotes the user's message. | In the thread of the user's message. Quotes the user's message. |
| Post a new top-level message | `app.send(chatOrChannelId, message)` | At the top level. | At the top level. |
| Reply in a thread | `app.reply(chatOrChannelId, rootMessageId, message)` | In the specified root message's thread, starting it if needed. No automatic quote. | In the specified root message's thread. No automatic quote. |

Take `chatOrChannelId` from `channelData.chat.id` or `channelData.channel.id`, and `rootMessageId` from `channelData.replyChain.id`.

::: zone-end

::: zone pivot="teams-sdk-python"

| To do this | Call | Chat | Channel |
| --- | --- | --- | --- |
| Respond where the user wrote | `ctx.send(message)` | In the same thread if the user's message is in a thread; otherwise at the top level. | In the thread of the user's message. |
| Reply to the user's message | `ctx.reply(message)` | In the thread of the user's message, starting it if the message is top-level. Quotes the user's message. | In the thread of the user's message. Quotes the user's message. |
| Post a new top-level message | `app.send(chat_or_channel_id, message)` | At the top level. | At the top level. |
| Reply in a thread | `app.reply(chat_or_channel_id, root_message_id, message)` | In the specified root message's thread, starting it if needed. No automatic quote. | In the specified root message's thread. No automatic quote. |

Take `chat_or_channel_id` from `channel_data.chat.id` or `channel_data.channel.id`, and `root_message_id` from `channel_data.reply_chain.id`.

::: zone-end

### Choose a reply mode

> [!NOTE]
> Reply modes are available starting in Teams SDK version 2.3.0. The reply mode APIs are in preview and may change. In earlier versions, a context-level reply always matches the level of the incoming message, which is equivalent to the quote reply mode.

The reply mode decides where the context-level reply method places its response in a chat, and whether it quotes the user's message. Set it for the whole app, or pass it on a single call, which overrides the app setting.

::: zone pivot="teams-sdk-csharp"

```csharp
// App-wide reply mode, used by every reply that doesn't pass its own.
builder.Services.AddTeamsBotApplication(options => options.ReplyMode = ReplyMode.Thread);

teams.OnMessage(async (ctx, cancellationToken) =>
{
    // Overrides the app setting for this reply only.
    await ctx.ReplyAsync("Got it!", new ReplyOptions { Mode = ReplyMode.Quote }, cancellationToken);
});
```

| Mode | In a chat | Quote |
| --- | --- | --- |
| `ReplyMode.Combined` (default) | A reply to a top-level message starts a thread under it; a reply inside a thread stays in that thread. | Yes |
| `ReplyMode.Thread` | Same as `ReplyMode.Combined`. | No |
| `ReplyMode.Quote` | The reply stays at the level of the incoming message. | Yes |

To match replies to the level of the incoming message, set the mode to `ReplyMode.Quote`.

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript
// App-wide reply mode, used by every reply that doesn't pass its own.
const app = new App({ activity: { replyMode: 'thread' } });

app.on('message', async ({ reply }) => {
  // Overrides the app setting for this reply only.
  await reply('Got it!', { replyMode: 'quote' });
});
```

| Mode | In a chat | Quote |
| --- | --- | --- |
| `combined` (default) | A reply to a top-level message starts a thread under it; a reply inside a thread stays in that thread. | Yes |
| `thread` | Same as `combined`. | No |
| `quote` | The reply stays at the level of the incoming message. | Yes |

To match replies to the level of the incoming message, set the mode to `quote`.

::: zone-end

::: zone pivot="teams-sdk-python"

```python
# App-wide reply mode, used by every reply that doesn't pass its own.
app = App(reply_mode="thread")

@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    # Overrides the app setting for this reply only.
    await ctx.reply("Got it!", reply_mode="quote")
```

| Mode | In a chat | Quote |
| --- | --- | --- |
| `combined` (default) | A reply to a top-level message starts a thread under it; a reply inside a thread stays in that thread. | Yes |
| `thread` | Same as `combined`. | No |
| `quote` | The reply stays at the level of the incoming message. | Yes |

To match replies to the level of the incoming message, set the mode to `quote`.

::: zone-end

In a channel, every reply goes in the thread of the user's message, so the mode only decides the quote. The mode affects only the context-level reply method. It doesn't change the context-level send method, quoting a specific message, streams, plans, or the app-level methods.

> [!NOTE]
> **Replies that can't be threaded:** When the incoming activity lacks the [IDs that threading needs](#how-context-level-replies-are-placed), for example in a meeting, a reply is never threaded, so it keeps the quote in every mode, including the thread mode. Without a thread, the quote is what shows which message the reply answers.

### How context-level replies are placed

Threading needs `channelData.replyChain.id` on the incoming activity, plus the containing chat or channel ID (`channelData.chat.id` or `channelData.channel.id`). Without them, for example in a meeting, the context-level methods send to the same conversation the incoming activity came from. In a channel, that conversation can already identify the existing thread, so the response still appears in it.

A reply that starts a thread starts it under the message the incoming activity is about: the user's message, or the message the user reacted to, edited, deleted, or selected a card button on. If that message can't be a thread root, for example a card message whose ID can't be used as a thread root, the reply stays at the top level. For how the SDK decides whether an activity is in a thread, see [Identify the incoming activity's level](#identify-the-incoming-activitys-level).

When the service rejects a thread reply in a chat, the context-level reply method throws the error to your handler and doesn't send the reply at the top level instead. In a channel, if the service returns `404` for the thread reply, the SDK posts to the same thread through the legacy channel threading endpoint.

For which replies add a quote and which message they quote, see [Send quoted replies](../../build-conversational-capability.md#send-quoted-replies).

Starting in Teams SDK 2.3.0, a typing indicator is placed like a context-level send: when the incoming activity is in a thread, the indicator shows in that thread. A typing indicator never starts a thread, so in a chat, for a top-level message the indicator shows in the main conversation while a reply that starts a thread appears in the thread.

> [!TIP]
> In a chat, because the context-level reply method starts a thread and the send method doesn't, a handler that calls the reply method and then the send method splits its answer between the thread and the main conversation. To keep follow-ups in the thread, send them with the reply method too, using the thread mode if they shouldn't quote again.

### Reply in a thread

Starting in Teams SDK 2.3.0, the context-level reply method inside a handler already starts a thread under a top-level message. Use the app-level reply method when you reply without the incoming activity's context, for example when a long task finishes. It never quotes, and if the service rejects the thread reply, it throws the error without falling back to another route.

The following examples save the destination while handling a message, then send an in-thread reply in a chat later, when a long task finishes. For channels, read `channelData.channel.id` instead of `channelData.chat.id`; see [Get the discussion IDs](#get-the-discussion-ids).

App-level methods aren't tied to an incoming activity, so they need to know which service URL to send to. Store the service URL from the incoming activity with the chat and root message IDs, and pass it when you send. With a wrong or incomplete URL, a thread reply might post at the top level instead, or return a 404.

When the recipient is an agentic user, app-level send and reply methods require you to pass the agentic identity explicitly, so store it with the destination. Context-level methods use the incoming activity's identity automatically. For more information, see [Receiving and sending messages as an Agentic User](../../../concepts/agentic-identity/receiving-sending-messages.md).

::: zone pivot="teams-sdk-typescript"

These examples require Teams SDK version 2.3.0 or later and [per-call service URL support](send-proactive-messages.md#per-call-service-urls-in-typescript).

Pass the stored service URL in each call's options. Without an explicit `serviceUrl`, TypeScript app-level sends use the app's configured service URL.

```typescript
import { AgenticIdentity, getAgenticIdentity } from '@microsoft/teams.api';
import { App } from '@microsoft/teams.apps';

type ThreadDestination = {
  chatId: string;
  rootMessageId: string;
  serviceUrl?: string;
  agenticIdentity?: AgenticIdentity; // agentic user only
};

const app = new App();

// Your long-running task. It calls replyWhenDone(destination) when it finishes.
declare function startTripPlanning(destination: ThreadDestination): void;

app.on('message', async (ctx) => {
  const activity = ctx.activity;
  const chatId = activity.channelData?.chat?.id;
  const rootMessageId = activity.channelData?.replyChain?.id;
  if (!chatId || !rootMessageId) {
    throw new Error('A chat ID and thread root message ID are required.');
  }

  // Save the destination in your own storage, then start the long-running task.
  const destination: ThreadDestination = {
    chatId,
    rootMessageId,
    serviceUrl: activity.serviceUrl,
    agenticIdentity: getAgenticIdentity(activity.recipient),
  };
  await ctx.reply('Working on your trip plan.');
  startTripPlanning(destination);
});

// Called by the long-running task when it finishes.
async function replyWhenDone(destination: ThreadDestination) {
  await app.reply(destination.chatId, destination.rootMessageId, 'Your trip plan is ready.', {
    serviceUrl: destination.serviceUrl,
    agenticIdentity: destination.agenticIdentity,
  });
}

app.start();
```

To start a separate discussion at the top level, use `app.send(chatId, message)` instead of `app.reply()`. A root message ID is not required.

```typescript
async function postNewTopic(destination: ThreadDestination) {
  await app.send(destination.chatId, 'A new travel policy is available.', {
    serviceUrl: destination.serviceUrl,
    agenticIdentity: destination.agenticIdentity,
  });
}
```

::: zone-end

::: zone pivot="teams-sdk-csharp"

Use Teams SDK version 2.3.0 or later for these examples.

```csharp
teams.OnMessage(async (ctx, cancellationToken) =>
{
    var activity = ctx.Activity;
    string? chatId = activity.ChannelData?.Chat?.Id;
    string? rootMessageId = activity.ChannelData?.ReplyChain?.Id;
    if (string.IsNullOrEmpty(chatId) || string.IsNullOrEmpty(rootMessageId))
    {
        throw new InvalidOperationException(
            "A chat ID and thread root message ID are required.");
    }

    // Save the destination in your own storage, then start the long-running task.
    var destination = new ThreadDestination(
        chatId,
        rootMessageId,
        activity.ServiceUrl,
        activity.Recipient?.GetAgenticIdentity());
    await ctx.ReplyAsync("Working on your trip plan.", cancellationToken);
    StartTripPlanning(destination);
});

// Called by the long-running task when it finishes.
async Task ReplyWhenDoneAsync(ThreadDestination destination, CancellationToken cancellationToken)
{
    await teams.ReplyAsync(
        destination.ChatId,
        destination.RootMessageId,
        "Your trip plan is ready.",
        serviceUrl: destination.ServiceUrl,
        agenticIdentity: destination.AgenticIdentity,
        cancellationToken: cancellationToken);
}

// Your long-running task. It calls ReplyWhenDoneAsync(destination, cancellationToken) when it finishes.
void StartTripPlanning(ThreadDestination destination) { /* ... */ }

record ThreadDestination(
    string ChatId,
    string RootMessageId,
    Uri? ServiceUrl,
    AgenticIdentity? AgenticIdentity); // agentic user only
```

To start a separate discussion at the top level, use `teams.SendAsync(chatId, message)` instead of `teams.ReplyAsync()`. A root message ID is not required.

```csharp
async Task PostNewTopicAsync(ThreadDestination destination, CancellationToken cancellationToken)
{
    await teams.SendAsync(
        destination.ChatId,
        "A new travel policy is available.",
        serviceUrl: destination.ServiceUrl,
        agenticIdentity: destination.AgenticIdentity,
        cancellationToken: cancellationToken);
}
```

Without an explicit `serviceUrl`, C# app-level sends use the last inbound activity's service URL; they throw until the app has received an activity.

::: zone-end

::: zone pivot="teams-sdk-python"

Use Teams SDK version 2.3.0 or later for these examples.

```python
from dataclasses import dataclass

from microsoft_teams.api import AgenticIdentity, MessageActivity
from microsoft_teams.apps import ActivityContext, App

app = App()

@dataclass
class ThreadDestination:
    chat_id: str
    root_message_id: str
    service_url: str | None
    agentic_identity: AgenticIdentity | None  # agentic user only

def start_trip_planning(destination: ThreadDestination) -> None:
    """Your long-running task. It calls reply_when_done(destination) when it finishes."""

@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    activity = ctx.activity
    data = activity.channel_data
    chat_id = data.chat.id if data and data.chat else None
    root_message_id = data.reply_chain.id if data and data.reply_chain else None
    if not chat_id or not root_message_id:
        raise ValueError("A chat ID and thread root message ID are required.")

    # Save the destination in your own storage, then start the long-running task.
    destination = ThreadDestination(
        chat_id,
        root_message_id,
        activity.service_url,
        activity.recipient.agentic_identity,
    )
    await ctx.reply("Working on your trip plan.")
    start_trip_planning(destination)

# Called by the long-running task when it finishes.
async def reply_when_done(destination: ThreadDestination):
    await app.reply(
        destination.chat_id,
        destination.root_message_id,
        "Your trip plan is ready.",
        service_url=destination.service_url,
        agentic_identity=destination.agentic_identity,
    )
```

To start a separate discussion at the top level, use `app.send(chat_id, message)` instead of `app.reply()`. A root message ID is not required.

```python
async def post_new_topic(destination: ThreadDestination):
    await app.send(
        destination.chat_id,
        "A new travel policy is available.",
        service_url=destination.service_url,
        agentic_identity=destination.agentic_identity,
    )
```

Without an explicit `service_url`, Python app-level sends use the app's configured URL, then `SERVICE_URL`, then `https://smba.trafficmanager.net/teams`.

::: zone-end

## Implement threading with the REST API

These endpoints use the Agent Communication Service (ACS) REST API. Use the full `serviceUrl` from the incoming activity. Follow the token acquisition and request construction instructions in [Connect an agent to Teams without an SDK](../../../agents-in-teams/connect-agent-without-sdk.md#implement-acs-request-construction). In the following examples, `{accessToken}` is the resulting ACS access token.

### Send a top-level message

To send a top-level message with the REST API, use the containing chat or channel ID. Set `chatOrChannelId` to `channelData.chat.id` for a chat or `channelData.channel.id` for a channel:

```http
POST {serviceUrl}/v3/conversations/{chatOrChannelId}/activities
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "type": "message",
  "text": "A new travel policy is available."
}
```

This is the REST API equivalent of the app-level send method.

A successful top-level send returns a [ResourceResponse](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference#send-to-conversation) containing the sent message's `id`. For example:

```json
{
  "id": "{messageId}"
}
```

Store this ID as the root message ID if your agent needs to send replies in this message's thread later.

### Send an in-thread reply

For new implementations, use the following `/replyChains` endpoint to send in-thread replies. Use the same containing chat or channel ID for `chatOrChannelId`. Set `rootMessageId` to the incoming activity's `channelData.replyChain.id`, or to the stored `id` returned when your agent sent the top-level message:

```http
POST {serviceUrl}/v3/conversations/{chatOrChannelId}/replyChains/{rootMessageId}
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "type": "message",
  "text": "Let us plan your trip in this thread."
}
```

This is the REST API equivalent of the app-level reply method.

Existing integrations that already send in-thread messages directly through `/activities` can continue using that route.

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

To classify an activity as in-thread, `channelData.replyChain.id` (the root message ID) must be present. Then apply the additional conditions in the table:

| Incoming activity | Additional condition for in-thread |
| --- | --- |
| User-typed `message`, `messageUpdate`, or `messageDelete` | `activity.id` differs from the root message ID. |
| `messageReaction` activity | `replyToId` differs from the root message ID. |
| Card button response sent as a `message` with `channelData.source` | `replyToId` differs from the root message ID. |
| Message-action `invoke` with `value.messagePayload` | `value.messagePayload.id` differs from the root message ID. |
| Other `invoke` with `replyToId` | `replyToId` differs from the root message ID. |
| `invoke` with neither `value.messagePayload` nor `replyToId` | No additional condition. |
| Other activity types, such as `installationUpdate` or `conversationUpdate` | Never classified as in-thread. |

## See also

- [Channel and group chat conversations for agents](channel-and-group-conversations.md)
- [Send proactive messages](send-proactive-messages.md)
- [Stream bot messages](../../streaming-ux.md)
- [Quoted replies](../../build-conversational-capability.md#quoted-replies)
