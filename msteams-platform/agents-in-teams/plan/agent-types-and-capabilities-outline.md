---
title: Agent types and capabilities  
description: Compare declarative plug-ins, custom engine agents, and hybrid approaches, and learn which capabilities each model supports across Microsoft Teams and Microsoft 365 Copilot.  
ms.localizationpriority: medium  
ms.topic: conceptual
ms.date: 07/02/2025  
---
# Agent types and capabilities  

[Opening paragraph – ≤ 90 words explaining that the Teams platform offers multiple agent archetypes so developers can balance speed-to-market, control, and complexity.]

## 1. Agent archetypes  

| Type | Authoring model | Where logic runs | Ideal for | Core tools |  
|------|-----------------|------------------|-----------|------------|  
| **Declarative Copilot plug-in** | JSON manifest + OpenAPI + optional knowledge URLs | Copilot planner executes functions | Simple data fetch & command skills | Developer Portal, ATK CLI |  
| **Custom engine agent** | Code (Teams AI Library / Bot Framework) + prompt files | Your service (Azure, on-prem) | Complex reasoning, multi-step workflows | Agents Toolkit, Teams AI Library |  
| **Hybrid classic + agent** | Existing bot / tab augmented with `copilotAgents` block | Mix of legacy app and agent logic | Modernizing current Teams apps | Teams AI Library + manifest update |

### Decision matrix  

[Bullet checklist—choose declarative if you have REST endpoints and no custom logic; choose custom engine if you need orchestration, memory, or external calls.]

## 2. Capability catalogue  

| Capability | Declarative plug-in | Custom engine | Hybrid | Notes / SDK |  
|------------|--------------------|---------------|--------|-------------|  
| Function calling (OpenAPI) | ✔ | ✔ | ✔ | Manifest `actions` + Teams AI Planner |  
| Knowledge retrieval w/ citations | ✔ (URL or Graph index) | ✔ | ✔ | Add `knowledgeSources` or implement RAG |  
| Multi-turn memory | — | ✔ | ✔ | `TurnState`, vector store adapters |  
| Sequential workflows / up-to-date cards | — | ✔ | ✔ | Universal Actions, state store |  
| Adaptive Card responses | ✔ | ✔ | ✔ | `AdaptiveCards`, UA |  
| Live Share real-time sync | — | ✔ | ✔ | Live Share SDK |  
| Meetings / calling surfaces | Limited* | ✔ | ✔ | Custom engine required for media APIs |  
| Notifications & activity feed | — | ✔ | ✔ | Bot `sendNotification` API |  

\*Declarative plug-ins can surface in Copilot during meetings but not manage real-time media.

## 3. Surface map  

| Surface | Declarative | Custom engine | Tools / APIs |  
|---------|-------------|---------------|--------------|  
| Copilot chat | ✔ | ✔ | Planner, function calls |  
| Teams chat / channel | Optional via bot | ✔ | Bot messaging |  
| Message extension | — | ✔ | `composeExtensions` |  
| Personal / dashboard tab | — | ✔ | TeamsJS `pages.tabs` |  
| Outlook + M365 hub | ✔ | ✔ | Cross-host manifest |  
| Meeting side panel / stage | — | ✔ | Live Share, `meeting` APIs |

## 4. Security & permission considerations  

- Declarative agents inherit user context; rely on Graph delegated scopes.  
- Custom engine agents can also use application permissions but must apply RSC.  
- Admin consent flow differs—highlight policy settings.

## 5. Migration paths  

1. **Classic bot ➜ Hybrid agent:** add `copilotAgents.customEngineAgents` and expose existing commands as functions.  
2. **Declarative ➜ Custom engine:** start simple, then add orchestration code when requirements grow.

## Limitations (preview)  

[≤ 2 sentences on current schema version (1.22 preview) and GCC availability.]

## Next step  

Proceed to [Design best practices for agents](design-best-practices-for-agents-outline.md) to plan UX, prompts, and governance for your chosen agent type.

## See also  

- [Choose your agent use-case](choose-your-agent-use-case.md)  
- [App manifest for agents](../build/app-manifest-for-agents.md)  
- [Tools & SDKs for building agents](tools-and-sdks-for-agents.md)
