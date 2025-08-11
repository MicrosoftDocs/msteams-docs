FILE: teams-platform/get-started/key-agent-scenarios-and-examples.md  
SOURCES:  
- messaging-extensions/build-bot-based-agent.md (sample use-cases)  
- bots/how-to/teams-conversational-ai/how-conversation-ai-core-capabilities.md (scenario blurbs)  
- concepts\deploy-and-publish\appsource\post-publish\app-growth\overview-app-growth.md (industry examples)

OUTLINE:
---
title: Key agent scenarios and examples  
description: Explore high-impact business and productivity use-cases for AI-powered agents and see how each maps to Teams capabilities.  
ms.localizationpriority: medium  
ms.topic: concept  
ms.date: 07/02/2025  
---
# Key agent scenarios & examples  
[Intro—≤ 90 words: set context that agents can automate tasks, surface knowledge, and coordinate workflows directly inside Teams, Copilot, Outlook, and Microsoft 365.]

## Scenario catalog  
[Table introduces six common domains. Each row links to deeper how-tos.]

| # | Domain | Agent goal | Primary capabilities | Quick demo link |
|---|--------|-----------|----------------------|-----------------|
| 1 | Sales & CRM | Summarize opportunities, draft emails, log notes | Message extension + Graph + Copilot function calls | [Demo](#sales-demo) |
| 2 | IT Help-desk | Triage tickets, auto-answer FAQs, escalate | Chat bot + Adaptive Cards + sequential workflow | [Demo](#helpdesk-demo) |
| 3 | HR & Onboarding | Answer policy questions, schedule training | Declarative plug-in + Meetings tab | [Demo](#hr-demo) |
| 4 | Project Management | Generate status reports, assign tasks | Custom engine agent + Planner API | [Demo](#pm-demo) |
| 5 | Compliance & Legal | Summarize chat threads, flag sensitive content | Notification feed + Live Share canvas | [Demo](#compliance-demo) |
| 6 | Data Insights | Deliver real-time dashboards & “explain this chart” chat | Tab + Live Share media + Copilot citations | [Demo](#data-demo) |

## End-to-end example: Sales Deal Coach *(Spotlight)*  
### User flow  
1. Seller asks Copilot “Prep me for the Contoso meeting.”  
2. Copilot planner selects **Deal Coach** agent.  
3. Agent fetches opportunity data via CRM REST API.  
4. Copilot synthesizes a briefing with citations.  
5. Agent offers “Send recap email” action via Adaptive Card.  

### Implementation highlights  
- Custom engine agent using Teams AI Library.  
- Function calling with `getOpportunity(opportunityId)`.  
- SSO via Teams credential; OBO to CRM.  
- Adaptive Card with Universal Actions for follow-up tasks.

## Pattern library  
[Short subsection maps scenario patterns to capabilities.]

| Pattern | Recommended surface | Key SDK / API |  
|---------|--------------------|---------------|  
| FAQ retrieval | Chat bot + Copilot plug-in | Index data → search function |  
| Action execution | Message extension command | OpenAPI + function call |  
| Meeting co-pilot | In-meeting side panel | Live Share + dialog |  
| Workflow approval | Adaptive Card in chat | Sequential workflow & up-to-date view |

## Industry spotlights  
- **Healthcare:** Agent retrieves patient vitals during a tele-consult.  
- **Manufacturing:** Maintenance agent predicts downtime and schedules crews.  
- **Education:** Classroom helper agent answers “what’s my next assignment?”

## Choosing a scenario  
[2-bullet checklist: align with business metric & evaluate data accessibility.]

## Limitations  
[≤ 2 sentences: some Graph APIs still preview for agents; cross-tenant data access requires admin consent.]

## Next step  
Follow the “[Quick-start guide: build your first agent](quick-start-guide-build-your-first-agent.md)” to implement one of these scenarios today.

## See also  
- [Why build agents on Teams?](why-build-agents-on-teams.md)  
- [Tools & SDKs for building agents](../build/tools-and-sdks-for-agents.md)