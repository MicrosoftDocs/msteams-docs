---
title: Add coding agent support
description: Agent Skills give AI coding assistants context to build Teams bots. Install the teams-dev skill and let your assistant handle bot setup for you. Get started today.
ms.topic: article
ms.date: 11/03/2026
---

# Add coding agent support

Teams SDK offers a dedicated coding agent skill, `teams-dev`, to support support for building agents and apps, well as llms.txt files that agents can use to search and consume the documentation.

## The teams-dev coding agent skill skill

The `teams-dev` coding agent skill gives AI coding assistants (Claude Code, Cursor, GitHub Copilot, and others) relevant context to assist in developing Teams bots and use the Teams Developer CLI to manage your bot infrastructure. Instead of running CLI commands manually, you describe what you want and your AI assistant handles the rest.

### Install the skill

Before installing and using the `teams-dev` skill, work through the [quickstart](agents-in-teams/quickstart-create-agent-teams-sdk.md) to ensure you have the Teams developer CLI installed and meet the basic prerequisites for developing Teams agents and apps.

#### [GitHub Copilot CLI](#tab/copilot)

Add the marketplace (first time only):

```
/plugin marketplace add microsoft/teams-sdk
```

Install the skill:

```
/plugin install teams-sdk@teams-skills
```

After installing, restart GitHub Copilot for the skills to load.

#### [Claude Code](#tab/claude)

Add the marketplace (first time only):

```
/plugin marketplace add microsoft/teams-sdk
```

Install the skill:

```
/plugin install teams-sdk@teams-skills
```

After installing, restart Claude Code for the skills to load.

#### [VS Code](#tab/vscode)

See [VS Code Agent Skills documentation](https://code.visualstudio.com/docs/copilot/customization/agent-skills#_use-shared-skills) for installation instructions.

#### [Cursor](#tab/cursor)

See [Cursor Skills documentation](https://cursor.com/docs/skills#installing-skills-from-github) for installation instructions.

---

### What the skill covers

The `teams-dev` skill guides your AI assistant through:

| Task                          | What it does                                                                      |
| ----------------------------- | --------------------------------------------------------------------------------- |
| **Manage bot infrastructure** | Register your bot with Teams, manage credentials, and update configuration        |
| **Develop Teams bot**         | Build bot applications from scratch or add Teams capabilities to existing servers |
| **Set up SSO**                | Enable Single Sign-On so users can authenticate seamlessly without login prompts  |
| **Troubleshoot**              | Diagnose and resolve common bot setup and configuration issues                    |

The skill does **not** cover hosting or deployment — it focuses on bot registration, development, and configuration.

### Invoke the skill

**Using natural language:**

- "I need a chatbot for my team's standup meetings"
- "Help me build a Teams bot that can answer FAQs"
- "My bot won't load in Teams, can you help?"
- "Add the ability to get user profile information to my bot"

The skill loads automatically when your agent detects a relevant request.

**Direct invocation:**

```
/teams-dev
```

### Example session

```
You: Help me create a Teams bot that echoes what I'm saying back to me

Agent: I'll create an echo bot for you.

       [checks Teams Developer CLI installation and authentication]
       [creates development tunnel: https://abc123.ngrok.io]
       [runs teams app create with endpoint]
       ✓ Bot registered, credentials saved to .env

       [runs teams project new typescript echo-bot -t echo]
       ✓ Bot code created in ./echo-bot

       [installs dependencies and starts bot server]
       ✓ Bot running at http://localhost:3978

       Your bot is ready! Install it in Teams:
       https://teams.microsoft.com/l/app/[app-id]
```

## llms.txt files

Instead of installing a skill, you can point your coding agent at the Teams platform llms.txt files. These agent-optimized, plain-text copies of the documentation are designed to maximize your agent's ability to answer questions about Teams development and build Teams agents and apps without installing anything. See [llmstxt.org](https://llmstxt.org) for more information.

## Available files

### Root

High-level SDK overview with links to reference guides.

```
https://microsoft.github.io/teams-sdk/llms_docs/llms.txt
```

### Per-language

# [TypeScript](#tab/typescript)

**Small** — navigation index, the assistant fetches individual pages as needed.

```
https://microsoft.github.io/teams-sdk/llms_docs/llms_typescript.txt
```

**Full** — complete documentation in a single file, best for tools with large context windows.

```
https://microsoft.github.io/teams-sdk/llms_docs/llms_typescript_full.txt
```

# [Python](#tab/python)

**Small** — navigation index, the assistant fetches individual pages as needed.

```
https://microsoft.github.io/teams-sdk/llms_docs/llms_python.txt
```

**Full** — complete documentation in a single file, best for tools with large context windows.

```
https://microsoft.github.io/teams-sdk/llms_docs/llms_python_full.txt
```

# [C#](#tab/csharp)

**Small** — navigation index, the assistant fetches individual pages as needed.

```
https://microsoft.github.io/teams-sdk/llms_docs/llms_csharp.txt
```

**Full** — complete documentation in a single file, best for tools with large context windows.

```
https://microsoft.github.io/teams-sdk/llms_docs/llms_csharp_full.txt
```
