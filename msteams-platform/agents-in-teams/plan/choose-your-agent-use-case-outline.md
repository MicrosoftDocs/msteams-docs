---
title: Choose your agent use-case  
description: A framework to identify high-value scenarios, required data, and success metrics before you start building an AI-powered agent for Microsoft Teams.  
ms.localizationpriority: medium  
ms.topic: conceptual
ms.date: 07/02/2025  
---
# Choose your agent use-case  

[Intro – ≤ 90 words explaining that picking the right scenario up-front saves re-work and increases adoption.]

## 1. Identify the business goal  

- Reduce task completion time  
- Improve decision quality  
- Increase employee engagement  
*(Provide 1-sentence examples for each.)*

## 2. Map user personas & workflows  

| Persona | Daily pain-point | Opportunity for an agent |  
|---------|-----------------|---------------------------|  
| Seller | Hunting for account data | One-shot “deal briefing” via Copilot |  
| Support engineer | Repetitive triage questions | FAQ retrieval + ticket creation |  
| Project lead | Status reporting | Auto-generated summary & action items |

## 3. Classify the agent type  

| Need | Recommended type | Key capabilities |  
|------|------------------|------------------|  
| Expose simple APIs | Declarative plug-in | Function calling, knowledge docs |  
| Complex reasoning / orchestration | Custom engine agent | Planner, memory, data fusion |  
| Modernize existing bot | Hybrid classic + agent | Re-use bot endpoint + add actions |

## 4. Assess data & API readiness  

Checklist:  

- [ ] Accessible via REST or Graph  
- [ ] SSO or OAuth flow possible  
- [ ] Data licensing permits LLM usage  
- [ ] PII / compliance concerns addressed

## 5. Define success metrics  

| Metric | How to measure | Tool |  
|--------|----------------|------|  
| Adoption | Daily active users | Teams admin analytics |  
| Task efficiency | Avg. time to complete | In-app telemetry |  
| Accuracy / quality | User thumbs-up rate | Card feedback buttons |

## 6. Decide the surfaces to light up  

- Chat or channel conversation  
- Copilot canvas (inline)  
- Message extension command  
- Meeting side panel or stage  
- Personal dashboard tab

*(Highlight that each extra surface adds development/test scope.)*

## 7. Create a minimal-viable agent (MVA) plan  

1. Pick one critical skill.  
2. Target chat + Copilot first.  
3. Collect feedback, iterate, then expand.

## Limitations & constraints  

[≤ 2 sentences summarizing preview or tenant limitations that may affect scenario choice.]

## Next step  

Proceed to [Agent types & capabilities](agent-types-capabilities-outline.md) to match your chosen scenario with the right technical pattern.

## See also  

- [Key agent scenarios & examples](../get-started/key-agent-scenarios-examples-outline.md)  
- [Design best practices for agents](design-best-practices-for-agents-outline.md)
