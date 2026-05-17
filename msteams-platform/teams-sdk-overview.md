---
title: Microsoft Teams SDK overview
description: Overview and positioning of the Microsoft Teams SDK, the primary way to build applications and agents for Microsoft Teams.
ms.topic: overview
ms.date: 05/19/2026
author: nickwalkmsft
ms.author: nickwalk
---

# Microsoft Teams SDK

The Microsoft Teams SDK is the primary developer toolkit for building conversational agents and other application experiences in Teams. It's developed alongside the Teams platform itself, with an application model and tooling that evolve in line with the platform's capabilities, enabling developers to take full advantage of the unique features that make Teams so effective for collaborative work.

The Teams SDK is generally available for TypeScript, C#, and Python, and represents the evolution of the earlier Teams AI library into a more comprehensive and cohesive development model. It addresses the full range of Teams app capabilities, with an emphasis on building rich conversational agents. The Teams Developer CLI included with the SDK streamlines app development with quickstart project templates, app lifecycle management tools, and credential management.

The Teams Platform documentation aims to support application development by presenting platform features and implementation guidance mainly in terms of the Teams SDK's API and tools.

## SDK features

* **Idiomatic application model** - Teams apps are web services driven by events; the Teams SDK integrates naturally with the standard web frameworks and conventions for each supported language and implements a comprehensive set of event handlers using familiar patterns
* **Unified Teams app programming model** - Support for multiple Teams application capabilities, including conversational agents (bots), presentation of Teams-aware web apps in 1:1 and group environments, custom task dialogs, and message extension (message actions and link unfurling)
* **Authentication and security** - Automatic handling of request validation, user authentication, and token management, including enterprise single sign-on
* **Microsoft Graph integration** - Built-in support for calling Microsoft Graph APIs to access and interact with users' work data on their behalf
* **Teams-native features for conversational agents** - @mentions, emoji reactions on messages, quoted and threaded replies, command autocomplete, detection of channel and meeting events, citations and disclosure labels on AI-generated content, user feedback intake, custom dialogs and more
* **AI helpers** - Simplify building conversational agents powered by OpenAI and Azure OpenAI APIs.
* **Adaptive Card support** - Define rich, interactive UX components for messages and dialogs inline, in the language you're working in, or design them interactively with the Adaptive Card designer and paste the resulting JSON straight into your project
* **Model Context Protocol (MCP) and Agent-to-Agent (A2A) protocol adapters** - Enable your app to communicate with other tools and agents with server and client support for Model Context Protocol and Agent-to-Agent protocol
* **Microsoft 365 Copilot compatibility** - Agents built with the Teams SDK can be used from both Microsoft 365 Copilot and Teams.

## Developer tools

The **Teams Developer CLI** included with the SDK accelerates Teams development and simplifies app lifecycle management:

* **Project scaffolding** - Get an agent or app up and running on Teams in minutes with project templates in TypeScript, C# and Python
* **App registration and lifecycle management** - Register agents and apps with the Teams platform and manage their configuration
* **Authentication** - Generate client secrets for your Entra ID apps and manage bot credentials.

The developer CLI supports interactive usage for humans and structured JSON output to help achieve the best possible outcomes with coding AI agents.

<!-- Mention devools? Sounds like they might be going away? -->

Finally, the Teams SDK is also integrated with the **Microsoft 365 Agents Toolkit**, which provides additional experiences for scaffolding, provisioning, testing, and deployment. Teams apps scaffolded by the Agents Toolkit use the Teams SDK to achieve full-fidelity integration with the Teams platform.

<!-- TODO explicit recommendation/choice guidance section? This could be the place for https://microsoft.github.io/teams-sdk/teams/choosing-an-sdk/, or that could go in a separate page linked from here. -->

## Related content

* [Microsoft 365 Agents Toolkit](toolkit/overview-agents-toolkit.md)
* [Teams JavaScript client library](tabs/how-to/using-teams-client-library.md)
