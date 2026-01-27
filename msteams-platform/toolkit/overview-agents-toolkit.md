---
title: Microsoft 365 Agents Toolkit
description: Microsoft 365 Agents Toolkit is a suite of tools for building enterprise-ready agents that work across Microsoft 365 Copilot, Teams, web, and other third-party messaging channels.
ms.topic: overview
ms.date: 01/26/2026
---
# Microsoft 365 Agents Toolkit

Microsoft 365 Agents Toolkit is a suite of tools for building enterprise-ready agents and apps that work across Microsoft 365 Copilot, Teams, Office, web, and other third-party messaging channels. It streamlines the development of production AI agents and apps with built-in project scaffolding, testing, deployment, and integration with AI tools including Microsoft 365 Agents SDK, Azure AI Foundry, and TypeSpec for Copilot.

:::image type="content" source="../assets/images/agents-toolkit-landing/agents-toolkit-scenarios.png" alt-text="With Agents Tookit you can build Microsoft 365 Copilot extensibility, Apps for Teams, Outlook, and M365 Copilot, and Office Add-ins.":::

Microsoft 365 Agents Toolkit is an evolution of Teams Toolkit. In addition to building advanced custom AI agents, Microsoft 365 Agents Toolkit also supports a *write once, run everywhere* approach to building integrated apps that run across Teams, Outlook and Microsoft 365 Copilot app, and Office Add-ins that are packaged, distributed, and managed centrally through Microsoft 365 store and admin experiences.

Additionally, Agents Toolkit provides simplified SSO authentication and integrated support for data storage, serverless functions, and CI/CD actions for GitHub and Azure DevOps.

## Formats

Microsoft 365 Agents Toolkit is available in the following formats:

| | Format | Description | Get started |
| - | -|-|-|
| :::image type="content" source="../assets/images/agents-toolkit-landing/vscode.png" alt-text="Visual Studio Code logo":::| Visual Studio Code | Agents Toolkit extension optimized for TypeScript and JavaScript development. | [Install Agents Toolkit for VS Code](install-teams-toolkit.md) |
| :::image type="content" source="../assets/images/agents-toolkit-landing/visual-studio.png" alt-text="Visual Studio logo"::: | Visual Studio | Agents Toolkit workload optimized for .NET development. | [Install Agents Toolkit for Visual Studio](toolkit-v4/install-teams-toolkit-vs.md) |
| :::image type="content" source="../assets/images/agents-toolkit-landing/terminal.png" alt-text="Icon of text-bsaed terminal"::: | CLI | Text-based interface to Agents Toolkit for the terminal or CI/CD processes.| [Agents Toolkit command line interface](teams-toolkit-cli.md) |

## Deploy to multiple channels with Microsoft 365 Agents SDK

Microsoft 365 Agents Toolkit has built-in support for [Microsoft 365 Agents SDK](/microsoft-365/agents-sdk/agents-sdk-overview), enabling you to build a custom engine agent and publish to multiple channels, including M365 Copilot, Microsoft Teams, Web, Email, SMS, and more. Alternately, you can build declarative agents that leverage the full power of the Microsoft 365 Copilot AI stack.

:::image type="content" source="../assets/images/agents-toolkit-landing/agents-channels.png" alt-text="Image depicting deployment channels for Declarative agents (Microsoft 365 Copilot, SharePoint) and Custom engine agents (Microsoft 365 Copilot, Teams, Web, SMS, Email, +10 other messaging channels)":::

The following video shows how easily you can get started building an agent with Microsoft 365 Agents Toolkit + Microsoft 365 Agents SDK:

> [!VIDEO 4b7e966b-6874-4b68-a746-809dc091adae]

Once ready, you can use Agents Toolkit to easily [publish your agents](/microsoft-365-copilot/extensibility/publish) and apps to the Microsoft Store, your organizational catalog, or for your own personal use.

> [!div class="nextstepaction"]
> [Get started with Microsoft 365 Agents SDK and Agents Toolkit](/microsoft-365-copilot/extensibility/create-deploy-agents-sdk)

## Build and iterate quickly with Microsoft 365 Agents Playground

Agents Toolkit provides an integrated sandbox to locally test and debug AI agents and traditional bots in your local dev environment. The [Microsoft 365 Agents Playground](https://www.npmjs.com/package/@microsoft/teams-app-test-tool) enables rapid, iterative development of agents by eliminating the need for a Microsoft 365 developer tenant, tunneling services like Ngrok, and app/bot registration.

:::image type="content" source="../assets/images/agents-toolkit-landing/agents-playground.png" alt-text="Screenshot showing UI of Microsoft 365 Agents Playground" lightbox="../assets/images/agents-toolkit-landing/agents-playground-expanded.png":::

Agents Playground simulates the look, feel, and behavior of Microsoft Teams, providing a realistic testing environment for agent and bot interactions. You can even simulate complex scenarios using mock data and built-in custom activity triggers.

> [!div class="nextstepaction"]
> [Get started with Microsoft 365 Agents Playground](debug-your-teams-app-test-tool.md)