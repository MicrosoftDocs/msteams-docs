---
title: Teams Developer CLI
description: Teams Developer CLI helps you create, register, and manage Teams apps and bots from the command line. Install it with npm and start building today.
ms.topic: overview
ms.date: 11/24/2026
author: nickwalkmsft
ms.author: nickwalk
ms.reviewer: nickwalk
---

# Teams developer CLI

The Teams Developer CLI, `teams`, provides tools for creating, configuring, and managing Teams apps.

## Features

- **App Lifecycle** — Create, get, update, and manage Teams apps including manifest and package operations.
- **Bot Registration** — Register bots with Teams or Azure, migrate between them, and configure messaging endpoints.
- **Authentication** — Generate client secrets for your AAD apps and manage bot credentials.
- **AI Agent Friendly** — Structured JSON help output for AI consumption.

The developer CLI supports interactive usage for humans and structured JSON output for AI-assisted workflows.

## Prerequisites

The Teams developer CLI supports the Teams agent and app development workflow, which requires a Microsoft 365 work or school account. Different operations require varying levels of tenant access; overall the development process assumes administrator-level access.

Azure-related operations require a logged-in install of the [Azure CLI](/cli/azure).

## Install and run

> [!TIP]
> Use the [quickstart](agents-in-teams/quickstart-create-agent-teams-sdk.md) to get started with the Teams agent and app development workflow using the Teams developer CLI.

Use `npm` to install the Teams developer CLI, then log in to your Microsoft 365 work or school account with `teams login`:

```console
npm install -g @microsoft/teams.cli
teams login
```

## See also

- [Teams developer CLI on NPM](https://www.npmjs.com/package/@microsoft/teams.cli)