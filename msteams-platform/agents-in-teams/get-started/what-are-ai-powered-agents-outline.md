---
title: What are AI-powered agents in Microsoft Teams?  
description: Learn how agents combine conversational interfaces, orchestration logic, and Microsoft 365 data to extend Copilot and Teams experiences.  
ms.localizationpriority: medium  
ms.topic: conceptual
ms.date: 07/02/2025  
---
# What are AI-powered agents?  

[Introduce the definition in ≤ 100 words: “Agents are app manifests that expose skills—actions, knowledge, or workflows—to Microsoft 365 Copilot and other LLM-powered entry points while still lighting up classic Teams surfaces (chat, meetings, tabs).”]

## Agent anatomy  

[Describe the three building blocks—1-2 sentences each.]  

1. Front-end surfaces (chat, message extension, cards, tabs).  
2. Orchestration layer (planner, memory, prompt templates).  
3. Back-end skills (APIs, data sources, event handlers).

## Agent types  

| Type | Where it runs | Authoring model | When to use |  
|------|---------------|-----------------|-------------|  
| Declarative Copilot plug-in | Copilot canvas | Manifest + OpenAPI | Expose simple actions/knowledge. |  
| Custom engine agent | Your service (Teams AI Library) | Code + prompt | Complex reasoning & autonomy. |  
| Hybrid classic-plus-agent | Teams surfaces + Copilot | Manifest + code | Modernize existing bots/apps. |

## How agents interact with Copilot  

[Numbered flow: user prompt → Copilot planner → agent selection → execute skill → Copilot synthesizes reply.]

## Key capabilities  

- Natural-language invocation (“Call **Sales Forecast** agent”).  
- Grounded knowledge retrieval with citations.  
- Function calling & parameter extraction.  
- User-specific permissions via RSC.  
- Multi-turn context memory.  
- Adaptive Card responses & sequential workflows.

## When to build an agent vs. a classic app  

[Provide 3 “choose-this” vs 3 “choose-that” bullets.]

## Limitations (preview)  

[≤ 2 sentences: e.g., no outbound calls from Copilot in GCC, token limits, planner customization beta only.]

## Next step  

Read “[Why build agents on Teams?](why-build-agents-on-teams.md)” to understand the business impact and hosting advantages.

## See also  

- [Key agent scenarios & examples](key-agent-scenarios-and-examples.md)  
- [Quick-start guide: build your first agent](quick-start-guide-build-your-first-agent.md)
