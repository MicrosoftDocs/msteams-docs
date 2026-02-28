---
title: Use sessions in bot conversations in Microsoft Teams
author: vikasalmal
description: Sessions enable bots in Microsoft Teams to organize one-on-one conversations into separate, focused chats, helping maintain context, improve response relevance, and support multi-task workflows.
ms.author: vikasalmal
ms.localizationpriority: high
ms.topic: conceptual
ms.date: 02/28/2026
---

# Use sessions in bot conversations in Microsoft Teams

Sessions allow users to organize conversations with your bot into independent discussion chats within a single one-on-one thread. Each session maintains its own conversation history, helping reduce context length, improve response relevance, and provide a structured way for users to manage multiple tasks or workflows with your bot.

Sessions help bots align with conversation patterns that users already experience in modern AI assistants, where conversations are separated by task or subject instead of grouped into a single continuous thread.

In this article:

- [Enable sessions for your bot](#enable-sessions-for-your-bot)
- [User experience after enabling sessions](#user-experience-after-enabling-sessions)
- [Receive messages in sessions](#receive-messages-in-sessions)
- [Respond within a session](#respond-within-a-session)
- [Create sessions proactively](#create-sessions-proactively)
- [Existing chat migration to default session](#existing-chat-migration-to-default-session)
- [Best practices](#best-practices)

<!--## How topics improve bot conversations

Traditional one-on-one bot chats maintain a single, continuous message thread. As conversations grow longer and span multiple subjects, it becomes harder for users and bots to maintain context. Topics address this challenge by introducing boundaries between conversations while keeping them accessible within the same chat experience.

When topics are enabled:

- Each topic maintains its own conversation history.

- Users can switch between topics without losing context.

- Bots can initiate new topics to organize workflows or updates.

- Notifications and navigation experiences help users track new activity.

For example, a developer productivity bot might create a separate topic for each pull request. Users can review updates, track failures, and resolve issues without mixing unrelated conversations.
-->
## Enable sessions for your bot

Sessions are an opt-in capability that you enable through your app manifest.  
After you enable sessions and publish an updated app, users see the sessions experience after they install or upgrade the app.

> [!IMPORTANT]
> After your bot opts in to sessions, we recommend that you don't disable the feature, because existing conversations are converted to sessions.

### Add the supportsSessions property

Update your app manifest and set the `supportsSessions` property to `true`.

```json
{
  "bots": [
    {
      "botId": "{{BOT_ID}}",
      "supportsSessions": true
    }
  ]
}
```

After you update the manifest:

1. Package your updated Teams app.

2. Upload or publish the app through the Developer Portal or Teams Admin Center.

3. Users see the sessions experience after installing or upgrading the app.

> [!IMPORTANT]
>
> Bots that don't enable topics continue to use the standard one-on-one chat experience.

## User experience after enabling sessions

After sessions are enabled, users see new controls in the chat header that allow them to create and switch between sessions.

<!--### Create and navigate topics

Users can create new topics from the chat header or interact with topics created by the bot. Each topic appears as a focused conversation that includes:

- A title generated from the first message in the topic.

- A preview of the most recent message.

- A separate conversation history.

New topics open as fresh conversations and can include prompt starters or guidance to help users begin interactions.

### Track activity across topics

Teams helps users stay informed about topic activity using multiple notification entry points:

- Topics panel displays all active topics and highlights unread topics.

- Activity feed shows notifications such as mentions or reactions within a topic.

- Search helps users locate messages across topics.

Selecting any notification automatically opens the correct topic and message.
-->
Sessions allow users to:

- Create a new session

- Switch between sessions

- View unread sessions

- Navigate to activity inside a session

The first message in a session becomes the session title, and the latest message appears as the preview.

## Receive messages in sessions

When sessions are enabled, incoming activities include a session-scoped conversation ID. The conversation ID represents the current session and must be treated as an opaque value. Your bot shouldn't parse or construct the conversation ID manually.

Use the conversation ID from the incoming activity when responding.

```csharp

<!--`threadId;messageid=parentMessageId` (WIP)-->
var conversationId = turnContext.Activity.Conversation.Id;

```

<!--### Extract topic identifiers

You can extract the topic identifier from the incoming activity to support custom logic or analytics.

```csharp

`turnContext.SendActivityAsync() (WIP)

```
-->
## Respond within a session

Responding inside a session works the same way as responding in a normal one-on-one chat. When your bot replies using the conversation ID from the incoming activity, Teams automatically delivers the message to the correct session.

Use the existing activity context when sending a reply.

```csharp

(WIP)

```

This ensures that each session maintains independent conversation context.

## Create sessions proactively

Bots can create new sessions to initiate conversations around specific tasks, updates, or workflows. Proactively creating sessions helps organize notifications and prevents unrelated messages from appearing in existing conversations.

After your bot opts in to sessions, creating a new conversation with one user automatically creates a new session. Use the `CreateConversation` API with a message activity. A message activity is required to create a session. For more information, see [proactive messaging](bots/how-to/conversations/send-proactive-messages.md#create-the-conversation).

<!--### Start a new topic

Use the `CreateConversation` method to create a topic and send an initial message.-->

```csharp
(WIP)
```

When a bot creates a session:

- The session appears as unread for the user

- The first message becomes the session title

- The latest message appears as the preview

<!--## Notifications and discovery

Topics integrate with Teams notification systems to help users stay informed about new or updated conversations.

### Topic panel notifications

The topics panel provides an overview of all active topics. When new messages or topics are created:

- The topics panel icon displays a notification badge.

- Unread topics appear in bold.

- Users can open topics directly from the panel.

### Activity feed integration

Topic activity, such as mentions or reactions, appears in the Teams activity feed. Selecting an activity notification opens the relevant topic and message, ensuring users can quickly resume conversations.

## Agents navigation integration

When topics are enabled, Teams introduces an **Agents** navigation experience that aggregates bot-related activity.

The Agents navigation:

- Displays all topic-related activity for the bot.

- Highlights new activity across conversations.

- Allows users to follow or unfollow topics.

Unfollowing a topic removes it from navigation but doesn't delete the conversation.

## Deep linking to topics

Deep links that previously opened one-on-one bot chats continue to work after topics are enabled. When users open an existing deep link:

- Teams routes the user to the correct topic.

- Existing links remain backward compatible.

- Users maintain access to historical conversations.
-->
## Existing chat migration to default session

When sessions are enabled for an existing bot, previous messages are automatically migrated to a default session. This migration ensures that users don't lose conversation history after upgrading the app.

During migration:

- Existing messages are grouped into a default session

- Users can continue chatting without interruption

- New sessions can be created after migration completes

## Best practices

### Organize sessions around user tasks

Create sessions that represent clear goals or workflows. For example, you might create separate sessions for individual tickets, pull requests, or customer requests.

Clear session separation helps users quickly locate and resume conversations.

### Limit creating too many sessions

Create a new session only when a conversation requires multiple messages or back-and-forth interaction. Avoid creating a session for every notification.

### Use a notifications session

If your bot sends many proactive messages, send them to the same session instead of creating a new session each time. This prevents clutter.

### Provide meaningful first messages

The first message becomes the session title. Use clear and descriptive messages so users understand the purpose of the session.

<!--## Considerations and limitations

Topics introduce a structured conversation model that may differ from traditional single-thread chat experiences. Consider how your bot manages context, notifications, and topic lifecycle when designing topic workflows.

Bots should also consider strategies for handling inactive topics and guiding users toward relevant conversations.
-->