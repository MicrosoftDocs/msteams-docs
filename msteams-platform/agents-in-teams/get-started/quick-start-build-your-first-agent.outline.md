FILE: teams-platform/get-started/quick-start-build-your-first-agent.md  
SOURCES:  
- get-started/build-message-extension.md (quick-start flow)  
- toolkit/build-a-basic-AI-chatbot-in-teams.md (tool steps)  
- toolkit/debug-local.md (local run instructions)

OUTLINE:
---
title: Quick-start guide – build your first AI-powered agent  
description: Scaffold, run, and test a working Microsoft Teams agent in less than 10 minutes using the Microsoft 365 Agents Toolkit.  
ms.localizationpriority: medium  
ms.topic: how-to  
ms.date: 07/02/2025  
---
# Build your first AI-powered agent  
In this quick-start you’ll create a runnable agent that answers “Hello” with an AI-generated response, surfaces as a Copilot plug-in, and appears in Teams chat.

## Prerequisites  
- Node.js 18 LTS or later  
- Visual Studio Code with **Microsoft 365 Agents Toolkit** extension ≥ v1.1  
- Microsoft 365 developer tenant with **Upload custom apps** enabled  
- Azure subscription (free tier is fine)  
- `devtunnel` or `ngrok` (Toolkit will install automatically)

## Step 1 – Scaffold a new agent project  
1. Open VS Code → **View › Command Palette** → **> Agents: Create New Project**.  
2. Choose **AI Agent** template → **JavaScript** or **TypeScript**.  
3. Enter project name `hello-agent` and location.  
4. When prompted, sign in with your Microsoft 365 dev account.

*(Toolkit creates folder structure, `appPackage/manifest.json`, and boiler-plate agent code.)*

## Step 2 – Review the generated code  
- **/src/agent/agent.ts** – Registers a `helloWorld` function.  
- **/ai/helloWorld.prompt.txt** – Prompt template for the LLM.  
- **/appPackage/manifest.json** – Declares agent type `customEngine`.  
*(Spend 1 minute scanning comments.)*

## Step 3 – Run locally  
```bash
npm install
npm start
```  
Toolkit automatically:  
- Spins up local web server & bot endpoint.  
- Creates a dev tunnel and updates the manifest.  
- Launches Teams in a debug browser with the app sideloaded.

## Step 4 – Chat with your agent  
1. In the opened Teams web client, open **Chat** › **Hello Agent**.  
2. Type “Hello 👋” → Agent responds with an AI-generated greeting.  
3. Click **Copilot** icon, type “Ask Hello Agent to introduce itself” – Copilot calls your agent.

## Step 5 – Inspect & iterate  
- Set a breakpoint in `agent.ts`, re-run **Debug › Start Debugging**.  
- Edit prompt text, hot-reload, and watch new output.  

## Optional – Deploy to Azure in one command  
```bash
atk provision && atk deploy
```  
Toolkit provisions an Azure Bot, Function App, and Storage, then uploads an updated manifest for cloud testing.

## Troubleshooting  
| Issue | Fix |  
|-------|-----|  
| Tunnel fails to start | Run `devtunnel service install –f` then retry. |  
| No response from Copilot | Verify OpenAPI function declaration is in manifest `actions` block. |

## Code sample  
Full project on GitHub: `microsoft/teams-samples/js/hello-agent`.

## Next step  
Deep-dive into “[Tools & SDKs for building agents](../build/tools-and-sdks-for-agents.md)” to extend this starter with real data and actions.

## See also  
- [What are AI-powered agents?](what-are-ai-powered-agents.md)  
- [Key agent scenarios & examples](key-agent-scenarios-and-examples.md)