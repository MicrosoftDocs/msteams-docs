---
title: Structure conversations with sessions in Microsoft Teams
description: Sessions enable agents in Microsoft Teams to organize one-on-one conversations into separate, focused chats, helping maintain context, improve response relevance, and support multi-task workflows.
ms.author: vikasalmal
ms.localizationpriority: high
ms.topic: article
ms.date: 07/10/2026
zone_pivot_groups: teams-sdk-languages
---

<!-- markdownlint-disable MD024 -->

# Manage multiple user conversations with sessions

By default, one-on-one chat between a user and an agent takes place in a single long-running conversation. With sessions, an agent can hold multiple independent one-on-one conversations with a user.

Sessions offer users and agents a structured way to manage multiple tasks or workflows, similar to other modern AI assistant experiences. Encouraging users to organize their interactions into shorter, more focused contexts can also improve the quality of LLM-generated responses.

Sessions is an optional feature that must be enabled for an agent in its manifest configuration.

## User experience

When chatting one-on-one with an agent that supports sessions, controls in the header enable users to create and switch between sessions.

Clicking on the new session icon starts a new session.​

# [Desktop](#tab/desktop)

:::image type="content" source="../../../assets/images/bots/create-new-session-desktop.png" alt-text="Screenshot shows creating a new session button on desktop" lightbox="../../../assets/images/bots/create-new-session-desktop.png" border="false":::

# [Mobile](#tab/mobile)

:::image type="content" source="../../../assets/images/bots/create-new-session-mobile.png" alt-text="Screenshot shows creating a new session button on mobile" lightbox="../../../assets/images/bots/create-new-session-mobile.png" border="false":::

---

After a message is sent, the session is created and saved in the sessions panel.

# [Desktop](#tab/desktop)

:::image type="content" source="../../../assets/images/bots/sessions-history-desktop.png" alt-text="Screenshot shows the sessions history on desktop" lightbox="../../../assets/images/bots/sessions-history-desktop.png" border="false":::

# [Mobile](#tab/mobile)

:::image type="content" source="../../../assets/images/bots/sessions-history-mobile.png" alt-text="Screenshot shows the sessions history on mobile" lightbox="../../../assets/images/bots/sessions-history-mobile.png" border="false":::

---

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
With sessions enabled, users get the following capabilities within the one-on-one agent chat:

- **Create sessions**: Start a new session from the chat header to begin a focused conversation.
- **Switch between sessions**: Move between active sessions through the sessions panel without losing context.
- **Track unread activity**: Sessions with new messages are highlighted and badged so users can identify pending updates.
- **Navigate to specific activity**: Select a notification or session entry to jump directly to the relevant message.
- **Access from personal app**: Open the agent through the personal app entry point. Sessions are fully supported in the personal app experience, including deep links.
- **Search across sessions**: Find messages across all sessions using Teams search.

All existing one-on-one agent chat capabilities continue to work within sessions.

The first message in a session becomes the session title, and the latest message appears as the preview in the sessions panel. Sessions created proactively by the agent appear as unread for the user. Agents can also proactively create new sessions with users to organize notifications, updates, or task-specific conversations.

> [!NOTE]
> Sessions are distinct from threaded replies in channels. A session is a full, independent conversation context within a 1:1 chat and not a reply chain under a single message.

<!--## How topics improve bot conversations

Traditional one-on-one bot chats maintain a single, continuous message thread. As conversations grow longer and span multiple subjects, it becomes harder for users and bots to maintain context. Topics address this challenge by introducing boundaries between conversations while keeping them accessible within the same chat experience.

When topics are enabled:

- Each topic maintains its own conversation history.

- Users can switch between topics without losing context.

- Bots can initiate new topics to organize workflows or updates.

- Notifications and navigation experiences help users track new activity.

For example, a developer productivity bot might create a separate topic for each pull request. Users can review updates, track failures, and resolve issues without mixing unrelated conversations.
-->
## Enable sessions for your agent

Sessions are an opt-in capability that you enable through your app manifest. After you enable sessions and publish the updated app, users see the sessions experience after they install or upgrade the app.

> [!IMPORTANT]
> After your agent opts in to sessions, we recommend keeping the feature enabled. Once sessions are enabled on a chat, there is no way to revert it to the exact state of a regular 1:1 chat. Opting out of sessions is **not supported at GA**. Opt-out support is planned as a fast follow-up after GA.

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

After you update the manifest, package and republish your app through the [Developer Portal for Teams](https://dev.teams.microsoft.com/) or [Teams admin center](https://admin.teams.microsoft.com/). Users see the sessions experience after they install or upgrade the app.

Agents that don't enable sessions continue to use the single chat experience. When sessions are enabled for an existing agent, Teams automatically converts the existing chat history into a default session. No action is required and users don't lose any conversation history.

## Send and receive messages in sessions

For agents that support sessions, participation is automatic and requires no special implementation in code. Your existing message-handling code works without changes.

When sessions are enabled, incoming activities include a session-scoped conversation ID. The conversation ID represents the current session and must be treated as an opaque value. Your agent shouldn't parse or construct the conversation ID manually.

Use the conversation ID from the incoming activity when responding.

::: zone pivot="teams-sdk-csharp"

```csharp
var conversationId = context.Activity.Conversation.Id;
await app.Send(conversationId, "Hello from Bot");
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript
const conversationId = activity.conversation.id;
await app.send(conversationId, "Hello from Bot");
```

::: zone-end

::: zone pivot="teams-sdk-python"

```python
conversation_id = ctx.activity.conversation.id
await app.send(conversation_id, "Hello from Bot")
```

::: zone-end

Responding inside a session works the same way as responding in a normal one-on-one chat. When your agent replies using the conversation ID from the incoming activity, Teams automatically delivers the message to the correct session. Each session maintains independent conversation context. To proactively send a message into an existing session, store the session's conversation ID and use the standard proactive messaging pattern.

If your agent previously cached a `conversationId` from before the user opted into sessions, that cached ID still works and routes messages to the default session.

### HTTP API reference

The following HTTP snippets show the direct API calls for session operations.

#### Create a new session

```http
POST {serviceUrl}/v3/conversations
Authorization: Bearer {bot-token}
Content-Type: application/json

{
  "isGroup": false,
  "members": [
    { "id": "29:user-aad-object-id" }
  ],
  "channelData": {
    "tenant": { "id": "tenant-guid" }
  },
  "activity": {
    "type": "message",
    "text": "Starting a new session"
  }
}
```

**Response (201 Created)**:

```json
{
  "id": "<session-conversationId>",
  "activityId": "1749012345678"
}
```

The `id` is the session's conversationId, an opaque, encrypted string. Store it and use it for all subsequent operations within this session.

#### Send a message within an existing session

```http
POST {serviceUrl}/v3/conversations/{sessionConversationId}/activities
Authorization: Bearer {bot-token}
Content-Type: application/json

{
  "type": "message",
  "text": "Follow-up message in this session"
}
```

#### Reply to a specific activity

```http
POST {serviceUrl}/v3/conversations/{sessionConversationId}/activities
Authorization: Bearer {bot-token}
Content-Type: application/json

{
  "type": "message",
  "text": "Reply to your question",
  "replyToId": "1749012345678"
}
```

#### Get members

```http
GET {serviceUrl}/v3/conversations/{sessionConversationId}/members
Authorization: Bearer {bot-token}
```

> [!NOTE]
> Member operations (`GetMembers`, `GetMember`, `GetProfile`) work the same regardless of which session conversationId you use. They always resolve to the underlying 1:1 chat.

## Create sessions proactively

When sessions are enabled, the existing create conversation operation applied to a 1:1 conversation creates a new session. Two conditions must be met:

1. **The agent must be installed for the user.** If the agent is not installed, session creation is skipped and a regular 1:1 conversation is created instead (no error returned).
2. **The agent's manifest must declare `supportsSessions: true`.**

Both conditions are checked server-side. An agent that declares `supportsSessions: true` but is not installed for the target user will silently fall back to a regular 1:1 conversation. If both conditions are met, calling the create conversation API with exactly one member and one message activity creates a new session.

For more information, see [proactive messaging](send-proactive-messages.md#create-the-conversation).

::: zone pivot="teams-sdk-csharp"

```csharp
using System.Collections.Generic;
using Microsoft.Teams.Api.Activities;
using Microsoft.Teams.Api.Clients;

// Build an authenticated API client targeting the bot's service URL.
var api = new ApiClient(serviceUrl, app.Client);

// Including exactly one initial message activity is required for creating a session
// It becomes the first message of the new session.
var resource = await api.Conversations.CreateAsync(new ConversationClient.CreateRequest
{
    Members = new List<Microsoft.Teams.Api.Account>
    {
        new Microsoft.Teams.Api.Account { Id = userId }
    },
    TenantId = tenantId,
    Activity = new MessageActivity("Hello! Starting a new session."),
}, cancellationToken);

// resource.Id is the session conversationId
string sessionConversationId = resource.Id;

// Send a follow-up into the same session.
await app.Send(
    sessionConversationId,
    "This message is part of the session.",
    serviceUrl: serviceUrl,
    cancellationToken: cancellationToken);
```

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript
// Including exactly one initial `activity` is required for creating a session
// It becomes the first message of the new session.
const resource = await app.api.conversations.create({
  members: [{ id: userId, role: 'user', name: '' }],
  tenantId,
  activity: { type: 'message', text: 'Hello! Starting a new session.' },
});

// resource.id is the session conversationId
const sessionConversationId = resource.id;

await app.send(sessionConversationId, 'This message is part of the session.');
```

::: zone-end

::: zone pivot="teams-sdk-python"

[TODO]

::: zone-end

> [!NOTE]
>
> The Teams SDK calls the same `POST /v3/conversations` endpoint as regular 1:1 creation. No special flag is needed. The server creates a session automatically when the bot is session-enabled and installed.
> The `activity` field is **required** to have exactly one message activity, which becomes the first message of the new session.
> The returned id (`resource.Id` in C#, `resource.id` in TypeScript) is the session-specific conversationId. Use it for all follow-up messages in that session (via `app.Send` / `app.send`).

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
## Detect session support through install events

Teams includes the installed app version in all activity payloads delivered to your agent through the `channelData.app.version` field. This field appears in all event types, including messages, invokes, and `installationUpdate` activities, regardless of whether the agent opts into sessions. Use the version to determine whether the user has a sessions-capable version of your app installed.

```json
{
  "type": "message",
  "conversation": { "id": "conv-s1" },
  "channelData": {
    "app": {
      "id": "your-app-id",
      "version": "1.2.3"
    }
  }
}
```

When your agent receives an `installationUpdate` activity in a sessions-enabled chat, the `conversationId` is the **default session ID**. This maps to the first session in the chat containing all pre-existing messages. Messages sent using this conversationId land in the default session.

## Error codes

Error codes that bots may encounter during session operations:

| HTTP Status | Error Code | Description |
| --- | --- | --- |
| 400 | `BadArgument` | The 1:1 thread already uses a threading mode that cannot be converted to sessions. |
| 400 | `BadSyntax` | Missing or empty request body, or null activity. Session creation requires exactly one activity. |
| 400 | `MissingProperty` | Required fields missing from the request. |
| 401 | `AuthorizationError` | Bot token invalid or expired. |
| 403 | `NotEnoughPermissions` | Bot doesn't have permission to message this user. |
| 403 | `BotDisabledByAdmin` | Tenant admin has disabled the bot. |
| 403 | `BotNotInConversationRoster` | Bot is not installed in the conversation. |
| 404 | `ConversationNotFound` | The conversation thread doesn't exist. |
| 429 | `Throttled` | Rate limit exceeded. Retry after the indicated delay. |
| 500 | `ServiceError` | Unexpected server error. |
| 502 | — | Upstream service timed out while verifying bot session support. |

## Best practices

### When to enable sessions

Enable sessions when your agent handles multiple distinct tasks or topics with the same user, such as managing separate support tickets, pull requests, or project workflows. Sessions are also a good fit for AI-powered agents, where shorter, focused conversation contexts improve the quality of generated responses. If your agent sends proactive notifications alongside interactive conversations, sessions help keep updates separate from ongoing tasks.

Agents that serve a single, continuous purpose with no need for task separation can continue without sessions.

### Organize sessions around user tasks

Create sessions that represent clear goals or workflows. For example, you might create separate sessions for individual tickets, pull requests, or customer requests.

Clear session separation helps users quickly locate and resume conversations.

### Limit creating too many sessions

Create a new session only when it represents a distinct task or workflow that benefits from its own conversation context. Avoid creating sessions for transient updates or single-message interactions. Too many sessions make it harder for users to find relevant conversations in the sessions panel.

If your agent sends updates based on activity outside of Teams, such as CI/CD results, service alerts, or external system notifications, route them to a single dedicated notifications session instead of creating a new session for each update. Store the conversation ID of the notifications session after you create it, and reuse that ID for subsequent messages.

### Provide meaningful first messages

The first message becomes the session title. Use clear, concise messages so users can quickly identify the session in the panel. Long messages are truncated in the title display.

<!--## Considerations and limitations

Topics introduce a structured conversation model that may differ from traditional single-thread chat experiences. Consider how your bot manages context, notifications, and topic lifecycle when designing topic workflows.

Bots should also consider strategies for handling inactive topics and guiding users toward relevant conversations.
-->

## See also

- [Send proactive messages](send-proactive-messages.md)
- [Bot conversations overview](conversation-basics.md)
