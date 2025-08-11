---
title: Cross-platform capabilities for Outlook and Microsoft 365  
description: Understand host support, manifest settings, and coding patterns that let your Teams apps and agents run seamlessly in Outlook and the Microsoft 365 app.  
ms.localizationpriority: medium  
ms.topic: conceptual
ms.date: 07/02/2025  
---
# Run your Teams solution across Microsoft 365  

[Template instruction → 60-word intro explaining that a single package can now light up in Teams, Outlook, and the Microsoft 365 hub when you target the cross-platform runtime.]

## 1. Host coverage matrix  

| Host | Supported surfaces | Minimum client version | Availability |  
|------|--------------------|------------------------|--------------|  
| Teams | Chat, tabs, Copilot, meetings | 2.5.0 | GA |  
| Outlook (desktop, web, Mac) | Copilot, message extension, personal tab | 2.5.0 | GA |  
| Microsoft 365 app (Windows, web, mobile) | Copilot pane, personal tab | 2.5.0 | Preview |

[Template instruction → Add/adjust rows as new hosts gain support.]

## 2. Manifest requirements  

### `extensions.requirements` block  

```json
"extensions": {
  "requirements": [
    { "id": "teams",   "version": "2.5.0" },
    { "id": "outlook", "version": "2.5.0" },
    { "id": "office",  "version": "2.5.0" }
  ]
}
```  

[Template instruction → Explain that this declares the minimum runtime version for each host.]

### `elementRelationshipSet`  

[Template instruction → Briefly describe one-way vs mutual dependencies to manage host-specific capabilities.]

### Host-specific capability rules  

| Capability | Teams | Outlook | Microsoft 365 app | Notes |  
|------------|-------|---------|----------|-------|  
| `copilotAgents` | ✔ | ✔ | ✔ | Same actions list works everywhere. |  
| Personal tab (`staticTabs`) | ✔ | ✔ | ✔ | Must include `context: ["personalTab"]`. |  
| Message extension | ✔ | ✔ | — | Outlook supports search/action in mail compose only. |  
| Meeting extensions | ✔ | — | — | Still Teams-only. |

## 3. Coding guidelines  

### Detect host context  

```ts
import { app } from "@microsoft/teams-js";
const context = await app.getHostContext(); // returns 'teams', 'outlook', or 'office'
```

[Template instruction → Show how to branch UI/logic based on host.]

### Handle theme variations  

[template instruction → Note that Outlook uses its own theme tokens; rely on Fluent UI tokens instead of hard-coded colors.]

### Authentication parity  

[Template instruction → Explain that `authentication.getAuthToken()` works unchanged in Outlook/M365 as long as redirect URIs are whitelisted.]

## 4. UX considerations  

- Personal tab width in Outlook web is narrower—design responsive layouts.  
- Outlook mobile launches tabs modally; avoid opening additional dialogs.  
- Copilot answers appear in different panes; keep Adaptive Card width ≤ 600 px.

## 5. Testing across hosts  

### Using Agents Toolkit  

```bash
atk preview --host outlook   # sideloads into Outlook on the web
atk preview --host office    # sideloads into M365 hub preview
```  

[Template instruction → Mention that Toolkit automatically swaps manifest requirement sets and opens the correct client.]

### Manual sideload  

[Template instruction → Provide link to Developer Portal sideload steps.]

## 6. Limitations (July 2025)  

- Message extension **link unfurling** not yet supported in Outlook mobile.  
- Live Share canvas only available in Teams meeting stage.  
- GCC rollout planned H2 2025.

## Next step  

[Template instruction → Point to Extend agents article created earlier.]  
Deep-dive into “[Extend agents across Microsoft 365](../integrate/extend-agents-across-microsoft-365.md)” for agent-specific guidance.

## See also  

- [Teams JavaScript SDK capability support](../reference/sdk-and-api-reference-hub.md#platform-sdks)  
- [Authentication & single sign-on](../integrate/authentication-and-sso.md)
