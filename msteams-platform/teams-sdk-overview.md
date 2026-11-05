---
title: Microsoft Teams SDK overview
description: "Teams SDK helps you build conversational agents, tabs, and message extensions for Microsoft Teams in TypeScript, C#, or Python. Explore its key features today."
ms.topic: overview
ms.date: 11/03/2026
---

# Teams SDK

Teams SDK is the developer toolkit for building conversational agents and other app experiences in Teams. Available for TypeScript, C#, and Python, it's developed alongside the Teams platform and exposes the full range of platform features. Developers can use Teams SDK to build apps that integrate deeply with Teams and take advantage of its unique features that make it so effective for collaborative work.

Teams SDK is one of the three key components of the Teams developer workflow, alongside the [Teams developer CLI](teams-developer-cli-overview.md) and [Teams Developer Portal](concepts/build-and-test/teams-developer-portal.md).

## SDK features

* **Idiomatic application model** - The runtime of a Teams app is a web app or web service driven by events. Teams SDK integrates naturally with the standard web frameworks and conventions for each supported language and implements a comprehensive set of event handlers using familiar patterns
* **Unified Teams app programming model** - Support for multiple kinds of Teams apps, including conversational agents (bots), presentation of Teams-aware web apps in 1:1 and group environments (tabs), and custom dialog actions (message extensions)
* **Authentication and security** - Automatic handling of request validation, user authentication, and token management, including enterprise single sign-on
* **Microsoft Graph integration** - Built-in support for calling Microsoft Graph APIs to access and interact with users' work data on their behalf
* **Teams-native features for conversational agents** - @mentions, emoji reactions on messages, quoted and threaded replies, command autocomplete, detection of channel and meeting events, citations and disclosure labels on AI-generated content, user feedback intake, custom dialogs and more
* **Adaptive Card support** - Define rich, interactive UX components for messages and dialogs inline, in the language you're working in, or design them interactively with the Adaptive Card designer and paste the resulting JSON straight into your project
* **Microsoft 365 Copilot compatibility** - Agents built with Teams SDK can run in both Teams and Microsoft 365 Copilot

## See also

* Teams SDK reference documentation:
  * [TypeScript](/javascript/api/teams-sdk-typescript)
  * [Python](/python/api/msteams-sdk-python)
  * [.NET](/dotnet/teams-sdk-dotnet)
