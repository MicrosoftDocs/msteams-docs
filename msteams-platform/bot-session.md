---
title: Use topics in bot conversations in Microsoft Teams
author: vikasalmal
description: Topics enable bots in Microsoft Teams to organize one-on-one conversations into separate, focused threads, helping maintain context, improve response relevance, and support multi-task workflows.
ms.author: vikasalmal
ms.localizationpriority: high
ms.topic: conceptual
ms.date: 02/10/2026
---

# Use topics in bot conversations in Microsoft Teams

Topics allow users to organize conversations with your bot into focused, independent discussion threads within a single one-on-one chat. Each topic maintains its own conversation history, helping reduce context length, improve response relevance, and provide a structured way for users to manage multiple tasks or workflows with your bot.

Topics help bots align with conversation patterns that users already experience in modern AI assistants, where conversations are separated by task or subject instead of grouped into a single continuous chat.

## How topics improve bot conversations

Traditional one-on-one bot chats maintain a single, continuous message thread. As conversations grow longer and span multiple subjects, it becomes harder for users and bots to maintain context. Topics address this challenge by introducing boundaries between conversations while keeping them accessible within the same chat experience.

When topics are enabled:

- Each topic maintains its own conversation history.

- Users can switch between topics without losing context.

- Bots can initiate new topics to organize workflows or updates.

- Notifications and navigation experiences help users track new activity.

For example, a developer productivity bot might create a separate topic for each pull request. Users can review updates, track failures, and resolve issues without mixing unrelated conversations.

## Enable topics for your bot

Topics are an opt-in capability that you enable through your app manifest. Once enabled, Teams automatically provides the topics user experience for your bot.

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

3. Users receive the topics experience automatically after updating or installing the app.

>[!IMPROTANT]
> Bots that don't enable topics continue to use the standard one-on-one chat experience.

## User experience with topics

After topics are enabled, Teams introduces new controls and navigation elements that help users manage conversations with your bot.

### Create and navigate topics

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

## Receive messages from topics

When topics are enabled, messages sent to your bot include a topic identifier within the conversation ID. This identifier allows your bot to maintain conversation context for each topic.

The conversation ID follows this format:

```csharp

`threadId;messageid=parentMessageId` (WIP)

```

### Extract topic identifiers

You can extract the topic identifier from the incoming activity to support custom logic or analytics.

```csharp

`turnContext.SendActivityAsync() (WIP)

```

## Respond within a topic

Responding to messages in a topic uses the same messaging pattern as standard bot conversations. When your bot replies using the conversation ID from the incoming activity, Teams automatically delivers the message to the correct topic.

```csharp

(WIP)

```

This ensures that each topic maintains independent conversation context.

## Create topics proactively

Bots can create new topics to initiate conversations around specific tasks, updates, or workflows. Proactively creating topics helps organize notifications and prevents unrelated messages from appearing in existing conversations.

### Start a new topic

Use the `CreateConversation` method to create a topic and send an initial message.

```csharp
(WIP)
```

When a bot creates a topic:

- The topic appears as unread for users.

- The first message becomes the topic title.

- The most recent message appears as the topic preview.

## Notifications and discovery

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

Unfollowing a topic removes it from navigation but does not delete the conversation.

## Deep linking to topics

Deep links that previously opened one-on-one bot chats continue to work after topics are enabled. When users open an existing deep link:

- Teams routes the user to the correct topic.

- Existing links remain backward compatible.

- Users maintain access to historical conversations.

## Migration and default topic behavior

When topics are enabled for an existing bot, Teams automatically migrates previous messages to maintain continuity.

### Default topic

During migration:

- Existing messages are grouped into a default topic.

- Messages sent without a topic identifier are routed to the default topic.

- Users can continue conversations without interruption.

This migration ensures that upgrading your bot doesn't disrupt user workflows.

## Best practices for designing topic experiences

### Organize topics around user tasks

Create topics that represent clear goals or workflows. For example, you might create separate topics for individual tickets, pull requests, or customer requests.

Clear topic separation helps users quickly locate and resume conversations.

### Limit topic proliferation

Creating too many topics can overwhelm users. Create new topics only when a conversation requires separate context or long-running discussion.

### Provide meaningful initial messages

When creating topics proactively, include clear titles and helpful starting messages that explain the purpose of the topic.

### Manage notifications carefully

Avoid generating excessive notifications across topics. Ensure notifications guide users toward actionable updates or important changes.

## Considerations and limitations

Topics introduce a structured conversation model that may differ from traditional single-thread chat experiences. Consider how your bot manages context, notifications, and topic lifecycle when designing topic workflows.

Bots should also consider strategies for handling inactive topics and guiding users toward relevant conversations.
