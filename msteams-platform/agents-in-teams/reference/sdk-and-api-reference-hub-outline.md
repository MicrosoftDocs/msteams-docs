---
title: SDK & API reference hub  
description: Entry point to all Microsoft Teams, Copilot agent, Microsoft Graph, and tooling APIs used when building solutions on the Teams developer platform.  
ms.localizationpriority: medium  
ms.topic: reference  
ms.date: 07/02/2025  
---
# SDK & API reference hub  

[template instruction → Brief intro (≤ 60 words) that tells readers this is the centralized jump-off page for detailed class, method, CLI, and schema docs.]

## Platform SDKs  

### Microsoft Teams JavaScript SDK (TeamsJS)  

[template instruction → One-sentence scope statement + bullet links.]  

- v2.x reference (TypeScript)  
- v1.x (legacy)  
- Release notes

### Teams AI Library  

- JavaScript / TypeScript  
- .NET  
- Python (preview)  

### Microsoft 365 Agents Toolkit SDK  

- `@microsoft/atk` (Node CLI helpers)  
- TeamsFx runtime helpers  

## Command-line tools  

| Tool | Docs | Latest version |  
|------|------|----------------|  
| Agents Toolkit CLI (`atk`) | [CLI reference](../toolkit/microsoft-365-agents-toolkit-cli.md) | 1.1 |  
| Teams Toolkit CLI (`teamsapp`) *(classic)* | [Reference](../toolkit/teams-toolkit-cli.md) | 5.x |  

## REST & Graph APIs  

* Microsoft Graph – Teams, chat, channel, presence, meeting transcripts  
- Agent marketplace & commerce APIs  
- Resource-specific consent endpoints  

[template instruction → Provide bullets linking to official Graph interactive docs, plus Teams-specific REST samples.]

## Schemas  

- App manifest JSON schema (v1.22 for agents)  
- Localization schema  
- Adaptive Card schema and Universal Actions extensions  

## Samples gallery  

| Language | Repo link | Scenario |  
|----------|-----------|----------|  
| TypeScript | `contoso/hello-agent` | Minimal custom engine agent |  
| C# | `contoso/sales-coach-agent` | Multi-skill enterprise bot |  
| Python | `contoso/rag-agent` | RAG pattern with Azure AI Search |

## How to use this hub  

1. Pick a surface (TeamsJS, Teams AI, Graph).  
2. Select language tab.  
3. Drill into class, method, or endpoint pages.  

[template instruction → Each bullet ≤ 15 words.]

## Next step  

Jump to “[Tools & SDKs for building agents](../build/tools-and-sdks-for-agents.md)” to install the libraries referenced here.

## See also  

- [App manifest for agents](../build/app-manifest-for-agents.md)  
- [Authentication & single sign-on](../integrate/authentication-and-sso.md)
