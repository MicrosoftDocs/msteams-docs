---
title: Enable Slash Commands for Agents
description: Learn how to enable slash commands for your agents and bots
ms.localizationpriority: high
ms.date: 03/11/2026
ms.topic: reference
---

# Enable slash commands for agents

Slash commands are a lightweight way to invoke an agent's or bot's capabilities using a predictable, text-first syntax that starts with '/' (slash).Slash commands act like power shortcuts that combine the speed of commands with the flexibility of natural language.

**Key points**

- [What are slash commands](#what-are-slash-commands)
- [Why use slash commands](#why-use-slash-commands)

## What are slash commands

A slash command is usually a command name plus optional parameters—such as `/summarize last 20 messages`or `/draft status update for Project Contoso` can get reliable outcomes with minimal typing.  Users can type a short command directly in the message compose box to trigger an action immediately. When a user types /, Teams shows a menu of available commands from built in features, workflows, and installed or available apps.

[WIP: Add infographic for showing UX]

For apps and agents, slash commands can be used to:

- Trigger a specific app action (for example, create a task, open a form, or start a workflow).
- Start a private, single turn interaction with a bot or agent.
- Provide a faster alternative to verbose @mentions or multi step menus.

## Why use slash commands

Well-designed slash commands make an agent or a bot easier to discover, faster to use, and safer to operate in shared spaces:

- **Speed and muscle memory**: Frequent tasks become one-line commands.
- **Discoverability**: Typing '/' can show an in-product menu of supported actions.
- **Consistency**: A stable command name reduces ambiguity versus purely open-ended prompts.
- **Permission-aware actions**: Commands can map to well-defined operations with clear scopes and guardrails.
- **Great UX in busy chats**: Commands can trigger private or compact responses when appropriate.
