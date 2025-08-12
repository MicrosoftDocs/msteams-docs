---
title: Meeting apps and collaborative features in classic Teams apps  
description: Learn how to add meeting-side panels, share-to-stage experiences, Live Share real-time collaboration, and in-meeting notifications to traditional Microsoft Teams apps.  
ms.localizationpriority: medium  
ms.topic: how-to  
ms.date: 07/02/2025  
---
# Add meeting apps and collaborative features  

[Template instruction → Open with a 50-70-word paragraph that explains why meeting extensions matter (contextual collaboration, shared stage, real-time data) and clarifies that this guide targets *classic* Teams apps using manifest schema ≤ v1.21.]

## Prerequisites  

[Template instruction → List only must-have items.]  

- Classic Teams app project created with **Teams Toolkit** (schema 1.21).  
- Dev tunnel or ngrok for HTTPS callbacks.  
- Microsoft 365 developer tenant with meeting policy allowing custom apps.

## 1 – Enable in-meeting side panel  

### Update the manifest  

```json
"meetingExtensionDefinition": {
  "scopes": [ "meetingSidePanel" ],
  "context": [ "meetingChatTab", "meetingDetailsTab" ],
  "commands": [ { "id": "openPanel", "title": "Open app side panel" } ]
}
```  

[Template instruction → Explain each property in ≤ 2 sentences.]

### Implement the tab content  

```ts
// /src/meetingSidePanel/Panel.tsx
import { pages } from "@microsoft/teams-js";
```

## 2 – Share app content to the meeting stage  

### Add a share-to-stage command  

[Template instruction → Show manifest snippet with `shareToStage` capability.]  

### Invoke share action from side panel  

```ts
import { meeting } from "@microsoft/teams-js";
await meeting.shareAppContentToStage({ appId, threadId });
```  

### Best practices  

- Limit stage load time to < 2 s.  
- Provide fallback thumbnail for low bandwidth.

## 3 – Integrate Live Share for real-time collaboration  

[Template instruction → 80-word overview then hands-on steps.]

### Join a Live Share session  

```ts
const liveShare = await LiveShareClient.joinContainer(containerId);
```

### Sync cursors or media  

[Template instruction → Short code block or bullet list.]

## 4 – Send in-meeting notifications  

### Add `activities.activityTypes` to manifest  

```json
"activities": {
  "activityTypes": [ { "type": "surveyReminder", "description": "Survey reminder" } ]
}
```  

### Trigger notification from bot  

```ts
await adapter.sendInMeetingNotification(meetingId, users, cardJson);
```

## 5 – Use dialogs inside meetings  

[Template instruction → Mention `dialog.url` or Adaptive Card dialogs for quick forms.]

## 6 – Testing tips  

| Surface | How to test |  
|---------|-------------|  
| Side panel | Sideload app → **··· Apps** → Add |  
| Stage view | Presenter role → **Share** menu → Select app |  
| Live Share | Join meeting with two clients; verify cursor sync |  

## 7 – Design & UX best practices  

- **Do** show meeting context (title, participants) in UI.  
- **Don’t** assume full width; respect 16:9 safe-area.  
- Prefer Adaptive Card Universal Actions for user-specific refresh.

## Next step  

[Template instruction → Provide logical link.]  
Learn how to “**Send activity feed notifications**” to keep attendees engaged after the meeting.

## See also  

- [Build a traditional Teams app](build-a-traditional-teams-app-outline.md)
- [Share to stage API reference](link to API)
