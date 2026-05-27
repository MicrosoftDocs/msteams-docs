---
title: Enable Slash Commands for Agents
description: Learn how to enable slash commands for your agents and apps
ms.localizationpriority: high
ms.date: 05/27/2026
ms.topic: article
---

<!-- markdownlint-disable MD036 -->
<!-- markdownlint-disable MD046 -->
<!-- markdownlint-disable MD001 -->
<!-- markdownlint-disable MD024 -->

# Expose slash commands from agents and apps

> [!NOTE]
>
> Support for slash commands is available in [public developer preview](../resources/dev-preview/developer-preview-intro.md).

*Slash commands* help users discover and use named command functionality in Teams agents and apps.

If your agent or app implements functionality that you want users to be able to invoke via named commands, you can add configuration that makes those commands quickly discoverable and accessible from the message compose box in Teams. Named slash commands can help users access guidance, create personal follow-up tasks, or manage personalization options.

## What is a slash command

Slash commands in Teams are text-based shortcuts that let users perform actions from the compose box in conversations. When a user enters a <kbd>/</kbd> in an empty compose box, Teams displays an autocomplete menu containing [built-in commands for common tasks](https://support.microsoft.com/office/use-commands-in-microsoft-teams-88f61508-284d-417f-a53d-9e082164050b) that can be invoked immediately by selecting them.

The slash commands feature enables apps and agents to add their own commands to this list to help users discover and use them.

:::image type="content" source="../assets/images/agents-in-teams/agent-slash-commands/slash-command-compose-box.png" alt-text="Image shows the response flows for agent slash commands." border="false" lightbox="../assets/images/agents-in-teams/agent-slash-commands/slash-command-compose-box.png":::

## Types of slash commands

Apps and agents can expose three types of commands via their configuration:

- **Targeted messaging**: Users send targeted messages to agents by entering an agent's name as a slash command, switching the compose box to targeted message mode
- **Agent slash commands**: Surface named commands to users in the slash command autocomplete menu
- **Message extension slash commands**: Enable users to activate your app or agent's message extensions with a slash command

All three types are supported across all client platforms, including mobile.

> [!IMPORTANT]
> When designing agent interactions for group conversations, avoid public messages or Adaptive Card actions that might conflict with user expectations of privacy. For more information, see [Best practices and design guidance](#best-practices-and-design-guidance).

### Targeted messaging

Users send [targeted messages](targeted-messages.md) to agents by entering an agent's name as a slash command. Activating an agent's command switches the compose box to targeted message mode and displays a notice that the message will be sent privately. After the user composes a message and selects **Send**, the resulting message will be targeted to the agent and can't be seen by other participants in the conversation.

For more information, see [Send and receive targeted messages in group conversations](targeted-messages.md).

### Agent slash commands

Agent slash commands are named commands that agents can surface to users via the slash command autocomplete menu.

When a user enters <kbd>/</kbd>, the autocomplete menu that opens includes all slash commands registered by all agents in the current conversation. Each command is displayed with its description and its agent's name and icon, enabling users to discover functionality and differentiate between commands with the same name.

When a user activates an agent slash command, Teams switches the compose box to targeted messaging mode for the agent and inserts the name of the command as the message text. Selecting **Send** sends the targeted message to the agent.

Agent slash commands are useful for exposing named commands that users might want to invoke privately in group conversations.

### Message extension slash commands

Apps that implement action-type [message extensions](../messaging-extensions/what-are-messaging-extensions.md) can surface them as slash commands. When a user activates one from the autocomplete menu, Teams immediately opens the associated task module or dialog. Activating a message extension slash command only opens the task module or dialog, and doesn't send a message. Search-type message extensions can't be exposed as commands.

Message extension slash commands can be configured to appear as autocomplete entries in both the compose box and the Teams command box.

## Add commands

Targeted messaging and slash commands are configured via the app or agent's [manifest](/microsoft-365/extensibility/schema/root-compose-extensions-commands?view=m365-app-prev&tabs=syntax&preserve-view=true).

### Targeted messaging

See [Receive targeted messages](targeted-messages.md#receive-targeted-messages) for details about enabling an agent to receive targeted messages.

### Agent slash commands

Agent slash commands require an agent to opt in to receive targeted messages; see [Receive targeted messages](targeted-messages.md#receive-targeted-messages).

Declare commands by configuring the `bots[].commandLists[]` section of the manifest as shown in the following example.

```json
{
    "bots": [
        {
            "botId": "{{BOT_ID}}",
            "scopes": ["personal", "team", "groupChat"],
            "supportsTargetedMessages": true,
            "commandLists": [
                {
                    "scopes": ["personal", "team", "groupChat"],
                    "triggers": ["mention"],
                    "commands": [
                        { "title": "Summarize", "description": "Summarize a document" },
                        { "title": "Draft", "description": "Draft a document" }
                    ]
                },
                {
                    "scopes": ["team", "groupChat"],
                    "triggers": ["slash"],
                    "commands": [
                        { "title": "Review", "description": "Review a document" }
                    ]
                }
            ]
        }
    ]
}
```

Use the following example to configure the app manifest for supporting an agent or a bot that makes the same commands available for both @mention and slash triggers.

```json
{
    "bots": [
        {
            "botId": "{{BOT_ID}}",
            "scopes": ["personal", "team", "groupChat"],
            "supportsTargetedMessages": true,
            "commandLists": [
                {
                    "scopes": ["team", "groupChat"],
                    "triggers": ["mention", "slash"],
                    "commands": [
                        { "title": "Ask privately", "description": "Send a private question to the bot" },
                        { "title": "Help", "description": "Get help using this bot" }
                    ]
                }
            ]
        }
    ]
}
```

### Message extension slash commands

Use the `triggers` property of `composeExtensions[].commands[]` to expose message extensions as slash commands.

```json
{
    "composeExtensions": [
        {
            "botId": "{{BOT_ID}}",
            "commands": [
                {
                    "id": "summarizeCommand",
                    "type": "action",
                    "title": "Summarize",
                    "description": "Summarize a document",
                    "context": ["compose", "commandBox"]
                },
                {
                    "id": "draftCommand",
                    "type": "action",
                    "title": "Draft",
                    "description": "Draft a document",
                    "context": ["compose", "commandBox"],
                    "triggers": ["slash"]
                },
                {
                    "id": "reviewCommand",
                    "type": "action",
                    "title": "Review",
                    "description": "Review a document",
                    "context": ["compose", "commandBox"],
                    "triggers": ["slash"]
                }
            ]
        }
    ]
}
```

## Implementing command handling

Configuring agent commands only surfaces them to users in the Teams client, it doesn't assist with their implementation.

When a user activates an agent slash command, Teams switches the compose box to targeted message mode and inserts the command name, then returns control to the user to allow them to enter more text and send the message. The agent's message handler is responsible for using the contents of the message to determine whether it should be interpreted as a command invocation and handling it appropriately.

See [Best practices and design guidance](#best-practices-and-design-guidance) for other message handling guidance.

## Best practices and design guidance

Offer named commands for common actions that users need to access quickly and repeatedly. They're especially useful in group conversations when an action should remain private or the result is user-specific, such as viewing settings, creating follow-up tasks, or checking personal status. Named commands work best for actions that users are likely to invoke frequently and benefit from being easy to discover and reuse.

As with all message-based activity, the design of slash command behaviors should carefully consider whether the user expects a public or private message as a response in group conversations. For general guidance about agent response visibility, see [Targeted messaging best practices and design guidance](targeted-messages.md#best-practices-and-design-guidance).

Keep slash commands short and action-oriented, and consider adding shortnames or aliases for popular commands. Consider using [prompt starters](../bots/how-to/conversations/prompt-suggestions.md#prompt-starters) for longer prompts.

Provide clear command descriptions to improve discoverability, including any expected input beyond the command name.

## Related content

- [Send and receive targeted messages in group conversations](targeted-messages.md)
- [Prompt starters](../bots/how-to/conversations/prompt-suggestions.md#prompt-starters)
- [Build message extensions](../messaging-extensions/what-are-messaging-extensions.md)
