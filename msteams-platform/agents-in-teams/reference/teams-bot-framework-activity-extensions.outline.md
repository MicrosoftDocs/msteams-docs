---
title: Microsoft Teams extensions to the Bot Framework Activity schema  
description: Complete reference for Teams-specific activity types, `channelData` payloads, and event properties that extend the core Bot Framework Activity protocol.  
ms.localizationpriority: medium  
ms.topic: reference  
ms.date: 07/02/2025  
---
# Teams extensions to the Bot Framework Activity protocol  

[template instruction → ≤ 60-word intro explaining that while Bots in Teams adhere to the Bot Framework Activity schema, Teams adds extra activity types, invoke names, and `channelData` shapes. This page consolidates them in one place.]

## 1. Activity type additions  

| `type` value | Purpose | When sent | Key properties |  
|--------------|---------|-----------|----------------|  
| `invoke` | From client to bot for rich interactions (task modules, Adaptive Card `Action.Execute`, message extensions) | User presses button / executes command | `name`, `value` (object) |  
| `messageReaction` *(Teams)* | Reaction added/removed on message | User 👍 / ❤️ etc. | `reactionsAdded[]`, `reactionsRemoved[]` |  
| `event` – **`meetingStart` / `meetingEnd`** | Lifecycle notifications for meetings | Meeting begins / ends | `value.meeting` object |  
| `event` – **`meetingParticipantJoin/Leave`** | Participant roster change | User joins/leaves | `value.participant` |  
| `event` – **`installationUpdate`** | Bot installed, upgraded, or removed | App lifecycle | `value.action`, `teamsInfo` |  
| `event` – **`typingIndicator`** *(Teams)* | Extended typing status | User types in Teams (not forwarded by default) | n/a |

[template instruction → Include cross-links for deeper docs.]

## 2. `invoke` – `name` registry  

| `name` | Triggering feature | Expected request `value` | Response contract |  
|--------|-------------------|--------------------------|-------------------|  
| `task/fetch` | Dialog open (URL or Adaptive Card) | `{ data?: any }` | `task` envelope |  
| `task/submit` | Dialog submit/close | `{ data?: any }` | `task` or `message` |  
| `composeExtension/query` | Search ME | `parameters[], queryText` | `composeExtension` result set |  
| `composeExtension/queryLink` | Link unfurl | `url` | Same as above |  
| `composeExtension/submitAction` | Action ME submit | `data` | `composeExtension` result |  
| `adaptiveCard/action` | Adaptive Card `Action.Execute` | `verb`, `data` | Adaptive Card or message |  
| `signin/verifyState` | OAuth callback | `state` | 200/401 |  
| `actionableMessage/executeAction` | Outlook actionable message |…|…|  

[template instruction → Provide only top entries; add note linking to full table at bottom.]

## 3. Teams-specific `channelData` schemas  

### 3.1 Common envelope  

```json
{
  "tenant": { "id": "<tenant-guid>" },
  "team":   { "id": "<team-id>", "name": "Contoso" },
  "channel":{ "id": "<channel-id>", "name": "General" },
  "eventType": "channelCreated" | "teamRenamed" | ...
}
```

*All properties are optional depending on context.*

### 3.2 Conversation-update events  

| Event (`eventType`) | Extra fields | Sample |  
|---------------------|-------------|--------|  
| `teamMemberAdded` | `membersAdded[]` | [JSON sample] |  
| `channelRenamed` | `channel` old/new | … |  
| `teamArchived` | `team` object | … |

### 3.3 Meeting events  

```json
"value": {
  "meeting": {
    "id": "19:meeting_Y2FjZW…",
    "topic": "Project Sync",
    "joinUrl": "https://teams.microsoft.com/l/meetup-join/…"
  }
}
```

## 4. Extended properties on standard activities  

| Property | Applies to | Description |  
|----------|-----------|-------------|  
| `localTimestamp` | All | Client-local ISO time |  
| `channelData.notification` | `message` | `{ alert: true }` triggers @mention banner |  
| `onBehalfOf` | Message preview flows | Array attributing bot messages to user |  

## 5. Response envelopes  

### 5.1 `task` response (dialog)  

```json
{
  "task": {
    "type": "continue",
    "value": {
      "title": "My dialog",
      "height": 500,
      "width": "medium",
      "url": "https://.../dialog.html"
    }
  }
}
```

### 5.2 `composeExtension` response  

```json
{
  "composeExtension": {
    "type": "result",
    "attachmentLayout": "list",
    "attachments": [ { ...card... } ]
  }
}
```

## 6. Error handling for invoke activities  

- Return HTTP 200 with `statusCode` property in JSON body.  
- Common status codes: `400` (bad request), `403` (auth failure), `429` (rate limit).  
- Teams client displays generic error UI; include `error.message` for diagnostics.

## 7. Versioning & compatibility  

[template instruction → Explain Bot Framework protocol version (v3 / v4) usage and Teams client backward compatibility guarantees (12-month deprecation notice).]

## 8. Resources & samples  

| Sample repo | Demonstrated extension | Language |  
|-------------|-----------------------|----------|  
| `teams-samples/js/invoke-task-module` | `task/fetch`, `task/submit` | TypeScript |  
| `teams-samples/csharp/adaptive-card-ua` | `adaptiveCard/action` | C# |  

## Next step  

Consult “[Build bots, message extensions, tabs & cards](../build/build-bots-message-extensions-tabs-cards.md)” to see these activity extensions in action.

## See also  

- [Bot Framework Activity schema](https://aka.ms/bf-activity-schema)  
- [Authentication & single sign-on](../integrate/authentication-and-sso.md)
