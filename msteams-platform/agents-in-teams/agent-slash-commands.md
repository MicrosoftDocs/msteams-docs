---
title: Expose Slash Commands from Agents and Apps
description: Expose slash commands for your agents and apps to make frequently used functionality discoverable and quickly usable as named commands.
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

If your agent or app has functionality that users should be able to invoke with named commands, you can add configuration that makes those commands quickly discoverable and accessible from the message compose box in Teams. Named slash commands can help users access guidance, create personal follow-up tasks, or manage personalization options.

## What is a slash command

Slash commands in Teams are text-based shortcuts that let users perform actions from the compose box in conversations. When a user enters a <kbd>/</kbd> in an empty compose box, Teams displays an autocomplete menu containing [built-in commands for common tasks](https://support.microsoft.com/office/use-commands-in-microsoft-teams-88f61508-284d-417f-a53d-9e082164050b) that can be invoked immediately by selecting them.

The slash commands feature enables apps and agents to add their own commands to this list to help users discover and use them.

:::image type="content" source="../assets/videos/slash-commands.gif" alt-text="This video shows how a slash command works within a Teams agent or app.":::

## Types of slash commands

Apps and agents can expose three types of commands via their configuration:

- **Agent slash commands**: Surface named commands to users in the slash command autocomplete menu
- **Message extension slash commands**: Enable users to activate your app or agent's message extensions with a slash command

All three types are supported across all client platforms, including mobile.

> [!IMPORTANT]
> Targeted messaging and agent slash commands are fundamental to agent design for group conversations, and require careful handling of user privacy expectations. For more information, see [Best practices and design guidance](#best-practices-and-design-guidance).

### Targeted messaging

Users can send [targeted messages](targeted-messages.md) to agents by entering the agent’s name as a slash command.

In channels, group chats, and meeting chats, the slash command autocomplete menu shows the agents in the conversation that can receive targeted messages. Selecting an agent command switches the compose box to targeted message mode. When the user sends the message, it is delivered only to that agent and is not visible to other conversation participants.

For more information, see [Send and receive targeted messages in group conversations](targeted-messages.md).

### Agent slash commands

Agent slash commands enable agents to surface named commands that users can privately invoke in channels, group chats, and meeting chats. Slash commands are useful for functionality that users need to access quickly and privately in group conversations.

In channels, group chats, and meeting chats, the slash command autocomplete menu includes all commands registered by agents in the current conversation. Each command is displayed with its description and its agent's name and icon, making them discoverable and distinguishing between commands with the same name.

Invoking a command from the menu switches the compose box to targeted messaging mode for the agent and inserts the name of the command as the message text. Selecting **Send** sends the targeted message to the agent.

Agents or apps can explicitly declare the commands your agent supports, and Teams shows them in the slash command picker when a user types `/`.  For example, a project management agent or bot app might expose commands such as `/create-task` to turn the current conversation into a tracked task based on context, or `/status-check` command that can be given a work item number and returns information about it. To support natural-language prompts, an agent must explicitly opt in. This keeps the behavior intentional.

### Slash commands for action-type message extensions

Apps that implement action-type [message extensions](../messaging-extensions/what-are-messaging-extensions.md) can surface them as slash commands. When a user activates one from the autocomplete menu, Teams immediately opens the associated task module or dialog. Activating a message extension slash command only opens the task module or dialog, and doesn't send a message. Search-type message extensions can't be exposed as commands.

Message extension slash commands can be configured to appear as autocomplete entries in both the compose box and the Teams command box.

## Add commands

Targeted messaging and slash commands are configured via the app or agent's [manifest](/microsoft-365/extensibility/schema/root-compose-extensions-commands?view=m365-app-prev&tabs=syntax&preserve-view=true).

### Targeted messaging

See [Receive targeted messages](targeted-messages.md#receive-targeted-messages) for details about enabling an agent to receive targeted messages.

### Slash and @mention commands for agents

Agent slash commands require an agent to opt in to receive targeted messages; see [Receive targeted messages](targeted-messages.md#receive-targeted-messages).

#### Triggers: slash and @mention

The `triggers` property defines where a command appears and how users can invoke it from the Teams compose experience. For agent command lists, use `mention` when the command should appear in the traditional @mention command menu, use `slash` when the command should appear in the slash command picker, or include both values when the same command should be available from both entry points.

Use the `slash` trigger for quick discovery, private command invocation, and fast access from an empty compose box, especially for frequent actions and lightweight workflows. Use the `mention` trigger when users are intentionally addressing the agent as part of a visible interaction. Support both triggers when the same command should be accessible through either entry point without changing its behaviour.

Declare commands and their triggers by configuring the `bots[].commandLists[]` section of the manifest as shown in the following example.

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

### Slash commands for action-type message extensions

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

This example shows that the `summarizeCommand` command is available only within command box, while `draftCommand` and `reviewCommand` are available both as slash command in the compose box and in the command box.

## Implementing agent named command handling

Configuring agent slash commands only surfaces them to users in the Teams client, it doesn't assist with their implementation.

When a user activates an agent slash command, Teams switches the compose box to targeted message mode and inserts the command name, then returns control to the user to allow them to enter more text and send the message. The agent's message handler is responsible for using the contents of the message to determine whether it should be interpreted as a command invocation and handling it appropriately.

See [Best practices and design guidance](#best-practices-and-design-guidance) for other message handling guidance.

## Best practices and design guidance

Offer slash commands for common actions that users need to access quickly and repeatedly. They're especially useful for actions that should remain private or that provide user-specific results, such as viewing settings, creating follow-up tasks, or checking personal status. Commands work best for actions that users are likely to invoke frequently and benefit from being easy to discover and reuse.

As with all message-based activity, the design of slash command behaviors should carefully consider whether the user expects a public or private message as a response in group conversations. For general guidance about agent response visibility, see [targeted messaging best practices and design guidance](targeted-messages.md#best-practices-and-design-guidance).

It's recommended to keep the command set small and focused, support natural language prompts to provide a more conversational experience.

Keep slash commands short and action-oriented, and consider adding shortnames or aliases for popular commands. Consider using [prompt starters](../bots/how-to/conversations/prompt-starters.md) for longer prompts.

Provide clear command descriptions to improve discoverability, including any expected input beyond the command name.

## Related content

- [Send and receive targeted messages in group conversations](targeted-messages.md)
- [Prompt starters](../bots/how-to/conversations/prompt-starters.md)
- [Build message extensions](../messaging-extensions/what-are-messaging-extensions.md)
