---
title: Microsoft Teams SDK overview
description: Overview and positioning of the Microsoft Teams SDK, the primary way to build applications and agents for Microsoft Teams.
ms.topic: overview
ms.date: 06/23/2026
author: nickwalkmsft
ms.author: nickwalk
---

# Teams SDK

Teams SDK is the developer toolkit for building conversational agents and other app experiences in Teams. It's developed alongside the Teams platform and and exposes the full range of platform features, enabling developers to build apps that integrate deeply with Teams and take advantage of its unique features that make it so effective for collaborative work.

Teams SDK is generally available for TypeScript, C#, and Python, and represents the evolution of the earlier Teams AI library into a more comprehensive and cohesive development model. Teams SDK can be used to build apps for all of Teams' app capabilities, but has a strong emphasis on building agents: conversational AI assistants powered by large language models (LLM). The Teams Developer CLI included with the SDK streamlines app development with quickstart project templates and app lifecycle management tools, and credential management.

## SDK features

* **Idiomatic application model** - The runtime of a Teams app is a web app or web service driven by events. Teams SDK integrates naturally with the standard web frameworks and conventions for each supported language and implements a comprehensive set of event handlers using familiar patterns
* **Unified Teams app programming model** - Support for multiple kinds of Teams apps, including conversational agents (bots), presentation of Teams-aware web apps in 1:1 and group environments (tabs), and custom dialog actions (message extensions)
* **Authentication and security** - Automatic handling of request validation, user authentication, and token management, including enterprise single sign-on
* **Microsoft Graph integration** - Built-in support for calling Microsoft Graph APIs to access and interact with users' work data on their behalf
* **Teams-native features for conversational agents** - @mentions, emoji reactions on messages, quoted and threaded replies, command autocomplete, detection of channel and meeting events, citations and disclosure labels on AI-generated content, user feedback intake, custom dialogs and more
* **Adaptive Card support** - Define rich, interactive UX components for messages and dialogs inline, in the language you're working in, or design them interactively with the Adaptive Card designer and paste the resulting JSON straight into your project
* **Model Context Protocol (MCP) and Agent-to-Agent (A2A) protocol adapters** - Enable your app to communicate with other tools and agents with server and client support for Model Context Protocol and Agent-to-Agent protocol
* **Microsoft 365 Copilot compatibility** - Agents built with Teams SDK can run in both Teams and Microsoft 365 Copilot.
