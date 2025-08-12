---
title: Local testing your AI-powered agent  
description: Run, debug, and validate your Microsoft Teams agent on your development machine using the Agents Toolkit, dev tunnels, and Microsoft 365 Agents Playground.  
ms.localizationpriority: medium  
ms.topic: how-to  
ms.date: 07/02/2025  
---
# Test your agent locally  

Develop faster by running your agent—bot logic, Copilot plug-in functions, tabs, and cards—without publishing to Azure or the Teams Store.

## Prerequisites  

- Project scaffolded with the **Microsoft 365 Agents Toolkit** (`atk new …`)  
- Node 18 / .NET 8 / Python 3.10 runtime installed  
- Visual Studio Code (v1.90+) or ATK CLI (v1.1+)  
- **dev tunnel** service (auto-installed) or **ngrok** (fallback)  
- Microsoft 365 developer tenant with **Upload custom apps** enabled

## 1 – Start a local debug session  

### Using VS Code  

1. Press `F5` or choose **Run › Debug in Teams**.  
2. Toolkit performs:  
   - NPM / dotnet build  
   - Spins up local web server & bot process  
   - Creates HTTPS dev tunnel (e.g., `https://a1c2.p1.dev.tunnels.ms`)  
   - Patches URLs inside `manifest.json`  
   - Sideloads the app and launches Teams in a debug browser profile  

### Using ATK CLI  

```bash
atk preview --env local
```  

Same automation—works in any IDE or on CI agents.

## 2 – Test Copilot interactions in Microsoft 365 Agents Playground  

1. From VS Code Command Palette → **Agents: Launch Playground**  
   *(or run `atk playground`)*  
2. Choose activity trigger (Chat message, Copilot prompt, Message-extension)  
3. Inspect planner trace, function calls, and LLM tokens in real time  
4. Edit prompt or code → hot-reload → re-trigger instantly

> [!TIP]  
> Playground can mock Teams context (team ID, locale, theme) via `playground.config.yaml`.

## 3 – Debug bots & message extensions  

| Task | Where | Steps |  
|------|-------|-------|  
| Breakpoints | VS Code / VS | Set in `*.ts`, `*.cs`, `*.py`; press F5 |  
| View incoming activities | Debug console → **Teams AI Trace** | Shows `message`, `invoke`, `adaptiveCard/action` |  
| Inspect tokens | Playground “Auth” pane | JWT claims & scopes |

## 4 – Debug tabs & cards  

- Open **Teams** debug browser window that Toolkit launches.  
- Press `F12` to access Dev Tools; source maps enabled by default.  
- Use `teams-js` **pages.backStack** helper to navigate quickly between states.  

## 5 – Run integration tests (optional)  

```bash
npm run test:e2e          # Playwright sample  
atk preview --ci --test   # Headless sideload + mocha tests
```

## Troubleshooting  

| Symptom | Fix |  
|---------|-----|  
| **“Tunnel error: port in use”** | Change local port in `.env.local` or stop other process. |  
| **App not showing in Teams** | Clear Teams cache (`Ctrl+Shift+R`) or check manifest sideload log. |  
| **Copilot says “skill unavailable”** | Verify `actions` IDs in manifest match planner function names. |  

## Next step  

Validate your manifest with [Manifest validation workflow](manifest-validation-workflow-outline.md) and then deploy to a dev Azure environment.

## See also  

- [Microsoft 365 Agents Playground](../../toolkit/debug-your-agents-playground.md)  
- [Agents Toolkit CLI reference](toolkit link)
