FILE: teams-platform/test/troubleshooting-tips.md  
SOURCES:  
- resources/troubleshoot.md  
- bots/how-to/debug/locally-with-an-ide.md  
- toolkit/debug-overview.md  
- toolkit/debug-your-agents-playground.md  

OUTLINE:
---
title: Troubleshooting tips for AI-powered agents  
description: Quick fixes for the most common issues you’ll face when developing, debugging, and publishing Microsoft Teams agents.  
ms.localizationpriority: medium  
ms.topic: troubleshooting  
ms.date: 07/02/2025  
---
# Frequently asked questions – Troubleshooting  

## Q1. My agent doesn’t show up in Copilot suggestions  
A. Confirm that the manifest uses `manifestVersion` `"1.22"` and contains a `copilotAgents` block with at least one `actions` entry. Re-sideload the updated package (`atk preview`), then type **/reset skills** in Copilot to refresh the planner cache.

## Q2. `invalid_grant` or `AADSTS65001` when calling Microsoft Graph  
A. The token is missing the required scope. Make sure you've:  
1. Added the delegated or RSC permission in Microsoft Entra ID,  
2. Granted admin consent, and  
3. Requested the token with the same scope list.  
For bots, verify the On-Behalf-Of flow exchanges the Teams token for a Graph token.

## Q3. Dev tunnel fails with “port already in use”  
A. Another process is occupying the default port (3978). Stop the process or set `BOT_PORT=3980` (or any free port) in `.env.local` and restart `atk preview`.

## Q4. Adaptive Card buttons do nothing  
A. Most often the `verb` in `Action.Execute` doesn’t match the handler name. Check that your bot code registers `app.command('verbName', …)` exactly as it appears in the card JSON. Also ensure `type` is `Action.Execute`, not `Action.Submit`.

## Q5. Message extension dialog never returns a result  
A. Look for a `task/fetch` without a corresponding `task/submit` in the debugger. Return a `responseType: "result"` payload from the bot and include a `composeExtension` section with at least one attachment.

## Q6. “Skill unavailable” error from Copilot  
A. Copilot couldn’t execute the action because:  
- The OpenAPI description isn’t reachable (403 or 404).  
- Function parameters exceeded token limits.  
- Planner disabled the skill after repeated failures—clear by re-sideloading and retrying.

## Q7. Icon validation fails during package upload  
A. Both `color` and `outline` PNGs must be exactly 192×192 px and 32 KB or less. No alpha transparency on the outline icon. Use the Teams icon template provided in the UI Kit.

## Q8. Live Share canvas doesn’t sync for other users  
A. Ensure that:  
- All participants are running Teams desktop or web (mobile support is preview).  
- Your tenant has the **Fluid Relay Service** enabled.  
- `LiveShareClient.joinContainer()` resolves before you render the canvas.

## Q9. Bot receives duplicate `ConversationUpdate` events  
A. Teams sends one event per installed scope. Filter by `channelData.eventType` and `conversation.id`, or keep a deduplication set in memory.

## Q10. “App name already taken” when publishing  
A. App IDs must be globally unique in the Teams Store. Increment the `id` GUID and the `version` field, then resubmit.

*(Add more Q/A pairs as new issues arise; keep total ≤ 15.)*

## See also  
- [Local testing your agent](local-testing-your-agent.md)  
- [Manifest validation workflow](manifest-validation-workflow.md)  
- [Agents Toolkit CLI reference](toolkit link)