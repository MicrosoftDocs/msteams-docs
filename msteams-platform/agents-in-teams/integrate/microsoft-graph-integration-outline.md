---
title: Microsoft Graph integration for AI-powered agents  
description: Use Microsoft Graph APIs to access users, chats, calendar events, files, and insights directly from your Teams agent skills.  
ms.localizationpriority: medium  
ms.topic: how-to  
ms.date: 07/02/2025  
---
# Integrate Microsoft Graph with your agent  

This guide walks through acquiring tokens, calling Graph from both client-side and bot code, and surfacing data through Copilot function calls.

## Prerequisites  

- Single-sign-on configured as described in [Authentication and SSO](authentication-sso-outline.md).  
- Microsoft Graph permissions added to your Entra app (for example, `Chat.Read`, `Calendars.Read`).
- Agents Toolkit project (JavaScript/TypeScript, .NET, or Python).

## 1 – Decide on permission model  

| Scenario | Permission | Consent level | Typical surfaces |  
|----------|------------|---------------|------------------|  
| User-centric data (profile, calendar) | Delegated | User/admin | Chat, Copilot |  
| Team or chat insights | RSC | Team owner | Message extension |  
| Org-wide analytics | Application | Tenant admin | Dashboard tab |

> [!TIP]  
> Combine RSC with delegated scopes to minimize admin friction.

## 2 – Acquire a Graph access token  

### Client-side (tabs, message extensions)  

```ts
const token = await authentication.getAuthToken({
  resources: ['https://graph.microsoft.com'],
  silent: true
});
```

### Bot / custom engine (On-Behalf-Of flow)  

```ts
import { createMicrosoftGraphClient } from "@microsoft/teams-ai";
const oboToken = await adapter.getUserToken(context, { scopes: ['https://graph.microsoft.com/.default'] });
const graph = createMicrosoftGraphClient(oboToken);
```

## 3 – Call common Graph endpoints  

### Get signed-in user profile  

```ts
const me = await graph.api('/me').get();
```

### List upcoming meeting instances  

```ts
const events = await graph
  .api('/me/calendarview')
  .query({ startDateTime, endDateTime })
  .header('Prefer', 'outlook.timezone="UTC"')
  .get();
```

### Post an Adaptive Card to a chat  

```ts
await graph.api(`/chats/${chatId}/messages`)
  .post({ subject:null, body:{ contentType:'html', content:cardHtml }});
```

## 4 – Surface Graph data via agent skills  

1. Define an **action** in `manifest.json`:  

   ```json
   { "id":"getUpcomingMeetings","description":"Returns next 5 meetings","parameters":[] }
   ```  

2. Implement the function:  

   ```ts
   planner.defineFunction('getUpcomingMeetings', async(_, ctx)=>{
     const events = await graph.api('/me/events').top(5).get();
     return events.value.map(e=>({subject:e.subject,start:e.start.dateTime}));
   });
   ```  

3. Copilot formats the response with citations automatically.

## 5 – Handle throttling & paging  

- Use `Prefer: outlook.body-content-type="text"` to shrink payloads.  
- Check `@odata.nextLink` for paging loops.  
- Honor `Retry-After` headers on `429`.

## 6 – Advanced: Change notifications & webhooks  

Brief overview (link to Graph docs) on subscribing to chatMessage, event, or driveItem changes so your agent can push proactive notifications.

## Troubleshooting  

| Error | Cause | Fix |  
|-------|-------|-----|  
| `AADSTS65001` | Missing consent | Grant admin consent or use incremental consent flow |  
| `403 Forbidden` | Permission not present in token | Confirm scope in JWT `scp` claim |  
| `404 Not found` | Using RSC token on wrong resource type | Check chat/team ID and RSC type |

## Code sample  

- `teams-samples/js/graph-agent` – Demonstrates SSO, OBO, and Graph calls in a custom engine agent.

## Next step  

Enhance user experiences with [Device capabilities](../extend/device-capabilities-outline.md) or continue to [Extend agents across Microsoft 365](extend-agents-across-microsoft-365-outline.md).

## See also  

- [Authentication & single sign-on](authentication-sso-outline.md)  
- [Microsoft Graph API reference](/graph/api/overview?view=graph-rest-1.0&preserve-view=true)
