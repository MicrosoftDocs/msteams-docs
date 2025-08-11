---
title: Notifications and webhooks in Microsoft Teams  
description: Learn how to send activity-feed notifications, push proactive bot messages, and integrate incoming or outgoing webhooks to keep users informed in Microsoft Teams and across Microsoft 365.  
ms.localizationpriority: medium  
ms.topic: concept  
ms.date: 07/02/2025  
---
# Keep users informed with notifications & webhooks  

[template instruction → 70-word intro that positions notifications as the primary re-engagement mechanism and explains that webhooks provide simple, no-code endpoints for external systems.]

## 1. Notification options at a glance  

| Mechanism | Best for | Auth model | UI surface |  
|-----------|----------|------------|------------|  
| Activity-feed notification | Targeted alerts to a user or group | Azure AD / RSC | Teams “Activity” pane, mobile push |  
| Proactive bot message | Rich interactive updates | Bot Framework token | Chat, channel, meeting |  
| Incoming Webhook | Simple JSON payload | URL + HMAC (optional) | Channel conversation |  
| Outgoing Webhook | Command & response integration | HMAC validated | Channel message ↔ external service |  

## 2. Activity-feed notifications (Graph API)  

### Manifest requirements  

```json
"activities": {
  "activityTypes": [
    { "type": "taskDue", "description": "Task due reminder" }
  ]
}
```  

[template instruction → Explain `activities.activityTypes` in ≤ 2 sentences.]

### Send a notification  

```http
POST /teams/{team-id}/sendActivityNotification
Content-Type: application/json
{
  "topic": { "source": "entityUrl", "value": "/teams/{team-id}" },
  "activityType": "taskDue",
  "previewText": { "content": "Task *TPS Report* is due today!" },
  "recipients": { "userIds": [ "{aad-user-id}" ] }
}
```  

[template instruction → Note 429 throttling and retry headers.]

## 3. Proactive bot messages  

[template instruction → 80-word overview.]

### Acquire a conversation reference  

```ts
const ref = TurnContext.getConversationReference(context.activity);
```

### Create or continue conversation  

```ts
await adapter.continueConversation(ref, async ctx => {
  await ctx.sendActivity(cardJson);
});
```

### Best practices  

- Use SSO tokens to personalize content.  
- Include “View details” deep link to tab or Stageview.  

## 4. Incoming webhooks  

### Set up  

1. Channel → **⋯ More › Connectors** → **Incoming Webhook** → copy URL.  
2. POST card payload:  

```bash
curl -H "Content-Type: application/json" -d @card.json <webhook-url>
```  

### Secure with IP allow-list *(optional)*  

[template instruction → 1 sentence.]

## 5. Outgoing webhooks  

### Register  

[template instruction → Numbered steps ≤ 90 words.]

### Verify HMAC  

```csharp
var signature = request.Headers["Authorization"];
var body = await new StreamReader(req.Body).ReadToEndAsync();
if(!VerifyHmac(body, signature)) return Unauthorized();
```

### Respond with Adaptive Card  

```json
{
  "type": "message",
  "text": "Thanks! Your ticket **#1234** is created."
}
```

## 6. Design & UX guidelines  

- Keep notification count low; batch updates when possible.  
- Use Adaptive Card **Action.Execute** for quick actions (approve / reject).  
- Provide “Turn off” or frequency settings in personal tab.

## 7. Throttling & rate limits  

| Service | Limit | Guidance |  
|---------|-------|----------|  
| Activity feed | 4 calls/sec per app per user | Exponential back-off |  
| Bot API | 27 messages/sec per bot | Use `Retry-After` header |  
| Webhooks | 30 requests/min per URL | Queue & batch |

## 8. Cross-platform considerations  

[template instruction → 2-3 bullets about Outlook: activity feed stays in Teams; proactive bot messages appear in Outlook chat; webhooks are Teams-only.]

## Next step  

Implement “[Authentication & single sign-on](../integrate/authentication-and-sso.md)” so your notifications include personalized data securely.

## See also  

- [App manifest for agents](../build/app-manifest-for-agents.md)  
- [Microsoft Graph sendActivityNotification API](https://learn.microsoft.com/graph/api/resources/sendactivitynotification)  
- [Adaptive Card actions guide](link to guide)
