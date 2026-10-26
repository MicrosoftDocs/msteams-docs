---
title: Use threads in channels and one-on-one agent chats in Microsoft Teams
description: Understand agent reply behavior and conversation context when using threads in Teams channels and one-on-one agent chats.
ms.localizationpriority: medium
ms.topic: how-to
ms.date: 10/26/2026
---

# Use threads in channels and one-on-one agent chats

In Microsoft Teams, users can start a thread in a one-on-one chat with an agent to keep a follow-up discussion with its original message. Agents can also participate in threads in channels. The way an agent's reply is placed depends on where the incoming message appears: in the main chat or in a thread.

This article covers threads in **one-on-one agent chats** and **channels**. Group chats don't support threads.

Threads in one-on-one agent chats don't require an app manifest opt-in property.

## Understand messages in a chat and a thread

A **top-level message (L1)** appears in the main chat or channel conversation. A **thread reply (L2)** belongs to the discussion under a top-level message, also called the thread's root message. Threads keep related exchanges together so users can follow a discussion without mixing it with other messages in the chat or channel.

A user starts a thread in a one-on-one agent chat by replying to a message in the main chat. The agent can then respond within that thread.

An agent doesn't need to create a thread to reply to a user's top-level message in a one-on-one chat. The Teams SDK uses the context of the received message to send the response to the appropriate location.

## Respond to messages

When your agent sends or replies using the context of an incoming message, Teams places the response as follows:

| Incoming message | Agent response in a one-on-one chat | Agent response in a channel |
| --- | --- | --- |
| Top-level message (L1) | Another top-level message (L1) in the chat | A reply (L2) in the channel thread |
| Thread reply (L2) | A reply (L2) in the same thread | A reply (L2) in the same channel thread |

For example, if a user sends a message directly in the one-on-one chat, the agent's response appears in the main chat. If the user replies within a thread and the agent responds to that reply, the response appears in the same thread. Users can therefore start a threaded exchange without requiring the agent to create a thread for each response.

In one-on-one chats, let users decide when to start a thread. Use the default context-based response behavior rather than forcing top-level exchanges into new threads.

Use the Teams SDK's send or reply methods on the context of the received activity for this default behavior. The SDK carries the routing context for the response, so your handler doesn't need to construct a thread identifier. For existing channel-thread messaging guidance and examples, see [Threaded conversations](channel-and-group-conversations.md#threaded-conversations).

TODO: SDK support for the behavior described above. Add implementation examples after the SDK design is finalized.

### Threaded replies and quoted replies

Threading and quoting serve different purposes. A threaded reply belongs to a discussion under a root message. A quoted reply displays a reference to an earlier message so users can see what the response addresses.

The presence of a quote doesn't determine whether a message appears in the main chat or in a thread. Similarly, calling a context's reply method doesn't by itself mean that the agent starts a new thread. The response location follows the behavior described in the table above.

The existing Teams SDK channel examples use send methods for responses without a quote and reply methods for responses that quote the incoming message. Both responses remain in the channel thread. For more information about quoting, see [Quoted replies](/microsoftteams/platform/teams-sdk/essentials/sending-messages/overview#quoted-replies).

## Manage conversation context across threads

In a one-on-one agent chat, each thread has a conversation ID that differs from the conversation ID of the main chat. When a user starts a thread, the first reply in that thread can therefore look like activity in a new conversation to an agent that uses the conversation ID to identify its state.

Review how your agent keys conversation history, authentication state, and first-message behavior. For example, an agent that treats every unfamiliar conversation ID as a new chat might send another welcome message, restart a sign-in flow, or fail to use relevant context from the main chat. Decide which state should be shared with the main chat and which should remain specific to the thread. Don't assume that a thread's conversation ID is interchangeable with the main chat's ID.

For an AI-powered agent, distinguish the conversation used to route a response from the history used to generate it. A discussion in a thread might need relevant context from the main chat, but unrelated exchanges shouldn't automatically become part of that thread's model context. Plan how your agent selects relevant history while keeping each discussion focused.

Treat conversation IDs as opaque values. Don't parse or construct them to infer a relationship between a chat and a thread.

TODO: The SDK design includes related-chat information in channelData, but the exact properties and usage are pending.

## Considerations for proactive messages

The default behavior described above applies when responding to a received message through its context. This is reactive messaging. A proactive message, such as a scheduled notification, is sent outside that context, so an agent must retain the conversation information it needs to target the intended conversation.

For channels, the existing Teams SDK guidance describes targeting a thread with its conversation ID and root-message ID. Don't assume that the same targeting pattern applies to one-on-one chat threads. For the existing channel pattern, see [Proactive threading](/microsoftteams/platform/teams-sdk/essentials/sending-messages/proactive-messaging#proactive-threading). For general proactive messaging guidance, see [Send proactive messages](send-proactive-messages.md).

TODO: Confirm whether and how agents can intentionally start a new one-on-one thread or proactively target an existing one.

## See also

- [Channel and group chat conversations for agents](channel-and-group-conversations.md)
- [Send proactive messages](send-proactive-messages.md)