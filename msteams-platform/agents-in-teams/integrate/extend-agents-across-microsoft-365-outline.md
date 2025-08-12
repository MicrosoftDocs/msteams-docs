---
title: Extend your Teams agents across Microsoft 365  
description: Learn how a single app manifest lets AI-powered agents light up in Outlook, Microsoft 365 app, and other hosts while reusing the same code base.  
ms.localizationpriority: medium  
ms.topic: conceptual
ms.date: 07/02/2025  
---
# Extend agents across Microsoft 365  

[Intro – ≤ 90 words explaining that the new cross-host runtime lets agents you build for Teams appear automatically in Outlook and the Microsoft 365 hub, giving users a consistent Copilot + chat experience wherever they work.]

## 1. Where agents can run  

| Host product | Supported surfaces | Minimum client version | Status |  
|--------------|-------------------|------------------------|--------|  
| Microsoft Teams | Chat, Copilot, tabs, meetings | GA | ✔ |  
| Outlook (Windows, Web, Mac, Mobile) | Copilot, message extension, personal dashboard tab | V2.5+ | GA |  
| Microsoft 365 app (Windows, Web, Mobile) | Copilot pane, personal/dash tabs | V2.5+ | Preview |  
| Word / Excel / PowerPoint | Copilot ribbon actions (plug-ins only) | TBD | Private preview |

## 2. Cross-host manifest requirements  

### `elementRelationshipSet`  

Describe how to declare dependencies so Outlook can load only the personal tab portion of a Teams agent if desired.

### `requirements` / `requirementSet`  

Explain how to specify host-specific runtime needs:  

```json
"extensions": {
  "requirements": [
    { "id": "outlook", "version": "2.5.0" },
    { "id": "teams", "version": "2.5.0" }
  ]
}
```

### Capabilities matrix  

| Manifest element | Teams | Outlook | M365 hub | Notes |  
|------------------|-------|---------|----------|-------|  
| `copilotAgents.declarativeAgents` | ✔ | ✔ | ✔ | Same OpenAPI spec reused. |  
| `composeExtensions` | ✔ | ✔ | — | Outlook supports search/action in mail compose. |  
| `staticTabs` (personal) | ✔ | ✔ | ✔ | Must set `context` to `personalTab`. |  
| `meetingExtensionDefinition` | ✔ | — | — | Meetings remain Teams-only. |

## 3. Coding considerations  

- Use **TeamsJS v2.5+** conditional `app.getHostContext()` to tailor UI per host.  
- Avoid Teams-specific deep links (`/l/team/`) unless you wrap with a host check.  
- Authentication: SSO token acquisition flow is identical; Outlook returns the same JWT audience.  

## 4. UI & UX guidance  

### Personal dashboard tabs  

- Respect narrow pane widths in Outlook preview.  
- Hide left-nav elements and rely on host navigation.  

### Copilot plug-ins  

- Keep answer cards ≤ 600 px wide for Outlook mobile.  

### Notifications  

- Activity feed is Teams-only; consider email notifications for Outlook-centric users.  

## 5. Deployment workflow  

1. Update manifest to include Outlook requirement set.  
2. Run `atk preview --host outlook`.  
3. Toolkit sideloads the app into Outlook on the web for validation.  
4. Submit single package to Teams Store—Microsoft automatically distributes to Outlook and Microsoft 365 when criteria met.

## 6. Limitations (current preview)  

- Meeting stage and Live Share canvas not yet supported in Outlook.  
- Outlook mobile does not support message extension **action** commands (search only).  
- GCC tenants receive cross-host apps later in 2025.

## Next step  

Return to [Local testing your agent](../test/local-testing-your-agent-outline.md) to validate cross-host behavior before publishing.

## See also  

- [App manifest for agents](../build/app-manifest-for-agents-outline.md)
