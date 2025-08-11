---
title: Tools and SDKs for building AI-powered agents  
description: Set up your environment with the Microsoft 365 Agents Toolkit, Teams AI Library, TeamsJS, and other SDKs used to create, debug, and deploy agents.  
ms.localizationpriority: medium  
ms.topic: concept  
ms.date: 07/02/2025  
---
# Tools & SDKs for building agents  

[Intro – ≤ 100 words explaining that you can start coding an agent in minutes using first-party tooling and familiar languages like JavaScript, TypeScript, .NET, or Python.]

## Microsoft 365 Agents Toolkit  

### Visual Studio Code extension  

- New-project scaffolding (agent, bot, tab, message extension).  
- One-click **Debug in Teams** with auto tunnel & manifest update.  
- Built-in **Agents Playground** for local Copilot testing.  

### Command-line interface (ATK CLI)  

```bash
npm install -g @microsoft/atk
atk new
atk provision && atk deploy
```  

- Works in CI/CD and non-VS Code environments.  

### Visual Studio integration  

- .NET templates (C#)  
- CodeLens for provision / deploy / debug  

## Teams AI Library  

| Feature | Why it matters | Package |  
|---------|----------------|---------|  
| Planner & function calling | Map user intent to skills | `@microsoft/teams-ai` |  
| Memory & state management | Multi-turn context | Same |  
| Adaptive Card helpers | Build Universal Actions | Same |

## Microsoft Teams JavaScript SDK (TeamsJS)  

- Surface web content in Teams, Outlook, Microsoft 365.  
- Namespaces: `app`, `pages.tabs`, `dialog`, `teamsCore`, etc.  
- Tree-shakable imports for smaller bundles.  

## Microsoft Graph SDK  

- Access calendar, chat, files, people via agent skills.  
- Works with Teams SSO and OBO flows.  
- Language options: JS/TS, .NET, Python, Java.

## Programming languages & runtimes  

| Language | Toolkit template | Supported SDKs |  
|----------|------------------|----------------|  
| TypeScript / Node 18+ | ✔ | Agents Toolkit, Teams AI, TeamsJS, Graph |  
| .NET 8 | ✔ | Teams AI (.NET), Graph SDK |  
| Python 3.10+ | Preview | Teams AI (Python), Graph SDK |

## Supporting services  

- **Azure OpenAI / OpenAI** – LLM back-end for reasoning.  
- **Azure Functions** – Lightweight APIs or background tasks.  
- **Azure Fluid Relay / Live Share** – Real-time collaboration data.  

## Sample repos  

- `teams-samples/js/hello-agent` – Minimal custom engine agent.  
- `teams-samples/csharp/sales-coach-agent` – Multi-skill enterprise sample.  
- `teams-samples/python/rag-agent` – Retrieval-augmented generation demo.  

## Next step  

Go to “[App manifest for agents](app-manifest-for-agents.md)” to learn how to declare your agent’s skills and permissions.

## See also  

- [Quick-start: build your first agent](../agents/get-started/quick-start-build-your-first-agent.md)  
- [Teams AI Library reference](https://aka.ms/teams-ai-lib)  
- [Agents Toolkit CLI reference](../toolkit/microsoft-365-agents-toolkit-cli.md)
