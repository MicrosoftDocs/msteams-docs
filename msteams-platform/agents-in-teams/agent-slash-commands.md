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
- [Supported slash command scenarios](#supported-slash-command-scenarios)
- [Agent response to slash commands](#agent-response-to-slash-commands)
- [Enable slash commands](#enable-slash-commands)
- [Response codes for slash commands](#response-codes-for-slash-commands)

## What are slash commands

A slash command is usually a command name plus optional parameters—such as `/summarize last 20 messages`or `/draft status update for Project Contoso` can get reliable outcomes with minimal typing.  Users can type a short command directly in the message compose box to trigger an action immediately. When a user types /, Teams shows a menu of available commands from built in features, workflows, and installed or available apps.

[WIP: Add infographic for showing UX]

For apps and agents, slash commands can be used to:

- Trigger a specific app action (for example, create a task, open a form, or start a workflow).
- Start a private, single turn interaction with a bot or agent.
- Provide a faster alternative to verbose @mentions or multi step menus.

### Supported slash command scenarios

- App defined slash command
- Private user-to-agent interaction
- Message extension action

[WIP: Add details and scenarios/examples]

### Visibility of agent responses

Targeted messaging is designed to primarily support private, one to one interactions between a user and an agent or bot. By default, responses generated through targeted messaging are delivered privately to the initiating user, ensuring focus, reduced noise in shared spaces, and a more personal interaction model.

At the same time, targeted messaging does not mandate that every response must remain private. As an added capability, developers have full control over response visibility through their bot or agent logic. When building an app or agent, developers can choose to make specific responses public when it aligns with their business scenario or collaboration needs.
This flexibility allows developers to:

- Keep most interactions private by default.
- Selectively surface certain responses to a channel or group chat when the information is relevant to a broader audience
- Apply their own criteria—such as response type, context, or audience impact—to determine when a response should be made public.

In other words, response visibility is intentional and developer driven. Just because an interaction uses targeted messaging does not mean it must always remain private. If a response is beneficial for everyone in the conversation to see, developers can enable that behavior as part of their agent or app design.

- Private agent-to-user response:

  - When the user sends a slash command to the bot, they will immediately see their original message reflected as a targeted message.
  - If the bot responds privately, the user will see the bot's message as targeted reply containing the user's message as a block quote.
  - When the user selects “allow”, we will show a single message showing (1) the bot’s response (2) the user’s prompt as a block quote. The initial targeted message containing the user's message should expire in 24 hours.

- Public agent-to-user response:

  - When the user sends a slash command to the bot, they will immediately see their original message reflected as a targeted message.
  - If the bot responds in public, we will show a single message showing (1) the bot’s response (2) user’s prompt as a block quote. The initial targeted message containing the user's message should expire in 24 hours.

## Why use slash commands

Well-designed slash commands make an agent or a bot easier to discover, faster to use, and safer to operate in shared spaces:

- **Speed and muscle memory**: Frequent tasks become one-line commands.
- **Discoverability**: Typing '/' can show an in-product menu of supported actions.
- **Consistency**: A stable command name reduces ambiguity versus purely open-ended prompts.
- **Permission-aware actions**: Commands can map to well-defined operations with clear scopes and guardrails.
- **Great UX in busy chats**: Commands can trigger private or compact responses when appropriate.

## Slash commands developer experience

You can enable slash commands for your agent or bot by opting in through the Teams app manifest. You can choose to activate <`/app‑name`> only when necessary and to provide a tailored selection of commands ideal for slash usage. In the app manifest, you must:

- Declare whether the app supports slash commands.
- List the specific slash commands the app exposes.
- Indicate whether the app supports natural language prompts when invoked via slash commands.

### Enable slash commands

Configure app manifest property: supportsTargetedMessages + triggers for slash commands
Configure bot logic for agent or bot to choose private or public response based on response relevance for single user or for all group or channel members.

## Response codes for slash commands

[WIP: Awaiting details on error codes]

## Best practices

- Keep slash commands short and action oriented
- Use slash commands for private or quick actions, and @mentions for richer conversations.
- Avoid exposing overly verbose prompt suggestions as slash commands.
- Provide clear command descriptions to improve discoverability.
- Offer aliases for frequently used commands where appropriate.
