---
title: Templates and sample apps for Microsoft Teams developers  
description: Explore official templates, fully-featured sample repos, and low-code solutions that accelerate building classic Teams apps and AI-powered agents.  
ms.localizationpriority: medium  
ms.topic: reference  
ms.date: 07/02/2025  
---
# Templates & sample apps  

[template instruction → Open with ≤ 60 words explaining that Microsoft publishes open-source projects covering common scenarios—use them as learning tools or building blocks.]

## 1. Quick-start templates  

| Template | Capability focus | Language | Where to get it |  
|----------|-----------------|----------|-----------------|  
| **Hello Agent** | Custom engine agent, Copilot plug-in | TypeScript | VS Code “New Project” wizard / GitHub |  
| **Declarative Plug-in** | OpenAPI + knowledge sources | JSON + Postman | Developer Portal sample gallery |  
| **Classic Tab + Bot** | Personal tab + SSO bot | JavaScript / C# | `teams-samples` repo |  

[template instruction → Keep table ≤ 6 rows; link each template to its repo.]

## 2. Full-featured sample solutions  

### Contoso Sales Coach *(TypeScript)*  

- Custom engine agent with CRM integration  
- Message extension + tab dashboard + activity notifications  
- Shows Azure Functions, Graph, and OpenAI usage  
[template instruction → Provide GitHub link.]

### Fabrikam Help-desk Bot *(C#)*  

- Classic bot modernized into hybrid agent  
- Sequential workflow approvals with Adaptive Cards  
- In-app purchase to unlock premium SLA analytics  

### Northwind RAG Assistant *(Python – preview)*  

- Retrieval-augmented generation against Azure AI Search index  
- Multi-turn Copilot skills and citations  
- Live Share canvas for collaborative editing of responses  

## 3. Low-code solutions with Power Platform  

| Solution | Components | Scenario | Link |  
|----------|------------|----------|------|  
| Champion Management Platform | Power Apps + Power Automate + Dataverse | Employee community building | Docs / GitHub |  
| Company Communicator | Power Automate + Azure Functions | Org-wide announcements | Docs / GitHub |  
| Teams Emergency Operations Center | Power Apps + Maps | Crisis coordination | Docs / GitHub |

[template instruction → Note licensing considerations in footnote if needed.]

## 4. How to use a template effectively  

1. **Fork or clone** the repo instead of editing in place.  
2. **Rename** the app ID and manifest fields (`id`, `name`, `publisher`).  
3. **Update icons** and privacy-policy URL.  
4. **Run `atk validate`** before sideloading.  
5. **Iterate**—replace stub APIs with your own services.  
[template instruction → Keep each step ≤ 20 words.]

## 5. Contribute back  

[template instruction → Encourage community contributions; provide link to contribution guidelines and issue tracker.]

## Next step  

Try the **Hello Agent** template via the Agents Toolkit and complete the [Quick-start guide](../get-started/quick-start-build-your-first-agent-outline.md).

## See also  

- [SDK & API reference hub](../reference/sdk-and-api-reference-hub-outline.md)  
- [Grow adoption & track usage](../publish/grow-adoption-track-usage-outline.md)
