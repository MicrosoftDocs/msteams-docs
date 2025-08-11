---
title: Tabs, bots, and message extensions in classic Teams apps  
description: Step-by-step guidance to add tabs, conversational bots, and message extensions to traditional Microsoft Teams apps.  
ms.localizationpriority: medium  
ms.topic: how-to  
ms.date: 07/02/2025  
---
# Add tabs, bots, and message extensions  

[template instruction → Open with a 40–60-word paragraph explaining that these are the three most-used capabilities for classic Teams solutions and can be mixed in a single app package.]

## Prerequisites  

[template instruction → 3–5 bullets only (e.g., Node/.NET runtime, Teams Toolkit installed, dev tenant with custom app upload).]

## 1 – Create or open a classic Teams project  

### Using Teams Toolkit (VS Code)  

1. **Command Palette › Teams: Create New Project** → choose **Classic app**.  
2. Select language (JavaScript, TypeScript, .NET).  
3. **Capabilities** page – tick *Tab*, *Bot*, and *Message extension*.  
[template instruction → Keep instructions < 120 words.]

### Using Teams Toolkit CLI  

```bash
teamsapp new --name contoso-classic --capabilities tab bot me
```

## 2 – Build a personal or channel tab  

### Implement the web content  

```ts
// /src/tab/Tab.tsx
import { app } from "@microsoft/teams-js";
```

[template instruction → Show minimal React or vanilla snippet that reads Teams context and renders UI.]

### Update manifest  

```json
"staticTabs": [{
  "entityId": "dashboard",
  "name": "Dashboard",
  "contentUrl": "https://localhost:53000/tab.html",
  "scopes": [ "personal" ]
}]
```

## 3 – Add a conversational bot  

### Register bot endpoint  

```ts
const app = new TeamsActivityHandler();
// onMessage handler …
```

### Enable SSO *(optional)*  

[template instruction → Link to bot SSO guide.]

### Test locally  

[template instruction → Explain F5 debug + dev tunnel.]

## 4 – Expose commands with a message extension  

### Define commands in manifest  

```json
"composeExtensions": [{
  "botId": "${{BOT_ID}}",
  "commands": [
    { "id": "searchTickets", "type": "query", "title": "Search tickets" },
    { "id": "createTicket", "type": "action", "title": "Create ticket" }
  ]
}]
```

### Handle invoke logic  

```ts
bot.messageExtensions.registerCommand('searchTickets', async (context, search) => { … });
```

## 5 – Package and sideload the app  

```bash
teamsapp package
teamsapp preview --env local
```

[template instruction → Mention that Toolkit auto-creates `teamsApp.zip` and launches debug Teams client.]

## Best practices  

### Do  

- Keep tab UI responsive (≤ 400 KB bundle).  
- Provide welcome messages for bots.  
- Include at least one screenshot per capability for admin approval.  

### Don’t  

- Hard-code tenant IDs in code or manifest.  
- Store personal data in plain text logs.  

## Next step  

[template instruction → Point to classic meeting apps or agent modernization article.]  
Move on to “[Meeting apps & collaborative features](meeting-apps-and-collaborative-features.md)” or learn how to modernize this classic app into an AI-powered agent.

## See also  

- [Build a traditional Teams app](build-a-traditional-teams-app.md)  
- [App manifest schema (v1.21)](../reference/sdk-and-api-reference-hub.md#schemas)
