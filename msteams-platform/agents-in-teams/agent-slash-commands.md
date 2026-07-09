---
title: Expose Slash Commands from Agents and Apps
description: Expose slash and @mention commands for your agents and apps to make frequently used functionality discoverable and quickly usable as named commands.
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

Slash commands in Teams are text-based shortcuts that let users perform actions from the compose box in conversations. When a user enters a <kbd>/</kbd> in an empty compose box, Teams displays an autocomplete menu containing [built-in commands for common tasks](https://support.microsoft.com/office/use-commands-in-microsoft-teams-88f61508-284d-417f-a53d-9e082164050b) exposed by agents or apps in the current context.

The slash commands feature enables apps and agents to add their own commands to this list to help users discover and use them.

:::image type="content" source="../assets/videos/slash-commands.gif" alt-text="This video shows how a slash command works within a Teams agent or app.":::

## Types of slash commands

Apps and agents can expose slash-command experiences through app or agent configuration in two primary ways:

- **Agent slash commands**: Surface named commands to users in the slash command autocomplete menu
- **Message extension slash commands**: Enable users to activate your app or agent's message extensions with a slash command

These types of slash commands are supported across all client platforms, including mobile.

> [!IMPORTANT]
> Targeted messaging and agent slash commands are fundamental to agent design for group conversations, and require careful handling of user privacy expectations. For more information, see [Best practices and design guidance](#best-practices-and-design-guidance).

### Agent slash commands

Agent slash commands enable agents to surface named commands that users can privately invoke in channels, group chats, and meeting chats. Slash commands are useful for functionality that users need to access quickly and privately in group conversations.

In channels, group chats, and meeting chats, the slash command autocomplete menu includes all commands registered by agents in the current conversation. Each command is displayed with its description and its agent's name and icon, making them discoverable and distinguishing between commands with the same name.

Invoking a command from the menu switches the compose box to targeted messaging mode for the agent and inserts the name of the command as the message text. Selecting **Send** sends the targeted message to the agent.

Agents or apps can explicitly declare the commands your agent supports, and Teams shows them in the slash command picker when a user types `/`.  For example, a project management agent or bot app might expose commands such as `/create-task` to turn the current conversation into a tracked task based on context, or `/status-check` command that can be given a work item number and returns information about it. To support natural-language prompts, an agent must explicitly opt in. This keeps the behavior intentional.

### Slash commands for action-type message extensions

Apps that implement action-type [message extensions](../messaging-extensions/what-are-messaging-extensions.md) can expose those actions as slash commands. When a user selects one from the autocomplete menu, Teams opens the associated task module or dialog. Activating a message extension slash command opens the module or dialog only; it does not send a message. Search-type message extensions cannot be exposed as slash commands.

Message extension slash commands can be configured to appear as autocomplete entries in both the compose box and the Teams command box.

## Mention commands in agents

Use @mention commands in your agents and apps to directly call or tag a specific agent or bot. The message is delivered to the agent tagged with @mention. The agent or app is notified of the and responds to the original message according to the context of the conversation.

For more information about @mention commands, see [@Mention](/microsoftteams/platform/teams-sdk/essentials/sending-messages/overview?pivots=csharp).

## Add commands

Targeted messaging and slash commands are configured via the app or agent's [manifest](/microsoft-365/extensibility/schema/root-compose-extensions-commands?view=m365-app-prev&tabs=syntax&preserve-view=true). To implement slash commands, configure the app or agent manifest, enable any required targeted messaging behavior, and update the agent or app logic to interpret and handle the command after the user sends it.

See [Receive targeted messages](targeted-messages.md#receive-targeted-messages) for details about enabling an agent to receive targeted messages.

### Slash and @mention commands for agents

Agent slash commands require an agent to opt in to receive targeted messages; see [Receive targeted messages](targeted-messages.md#receive-targeted-messages).

#### Triggers: slash and @mention

The `triggers` property defines where a command appears and how users can invoke it from the Teams compose experience. For agent command lists, use `mention` when the command should appear in the traditional @mention command menu, use `slash` when the command should appear in the slash command picker, or include both values when the same command should be available from both entry points.

Declare commands and their triggers by configuring the `bots[].commandLists[]` section of the manifest. The following manifest example shows an agent that supports targeted messages and exposes three commands through slash, mention, and combined triggers:

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
          "triggers": ["slash"],
          "commands": [
            {
              "title": "summarize",
              "description": "Summarize the conversation"
            }
          ]
        },
        {
          "scopes": ["personal", "team", "groupChat"],
          "triggers": ["mention"],
          "commands": [
            {
              "title": "assign",
              "description": "Assign a follow-up task"
            }
          ]
        },
        {
          "scopes": ["personal", "team", "groupChat"],
          "triggers": ["slash", "mention"],
          "commands": [
            {
              "title": "review",
              "description": "Review a document"
            }
          ]
        }
      ]
    }
  ]
}
```

In this example:

- The agent is registered to operate in `personal`, `team`, and `groupChat` scopes. The
`supportsTargetedMessages` is set to `true` to allow the agent to receive targeted messages in group conversations.

- The `triggers` property defines where a command appears and how users can invoke it from the Teams compose experience. Use `slash` when the command should appear in the slash command picker, use `mention` when the command should appear in the traditional @mention command menu, or include both values when the same command should be available from both entry points.

  - The `summarize` command is configured to be a slash command.
  - The `assign` command appears as an @mention command option.
  - The `review` command is available as a slash command and an @mntion command in the agent.

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

In this example, `summarizeCommand` is available in the configured compose and command box contexts but is not exposed as a slash command. The `draftCommand` and `reviewCommand` actions declare the slash trigger, so they appear as slash commands in supported entry points.

## Implementing agent named command handling

Configuring agent slash commands only surfaces them to users in the Teams client, it doesn't assist with their implementation.

When a user activates an agent slash command, Teams switches the compose box to targeted message mode and inserts the command name, then returns control to the user to allow them to enter more text and send the message. The agent's message handler is responsible for using the contents of the message to determine whether it should be interpreted as a command invocation and handling it appropriately.

See [Best practices and design guidance](#best-practices-and-design-guidance) for other message handling guidance.

## Targeted messaging

Agents and users can interact using [targeted messages](targeted-messages.md) by using slash commands. In channels, group chats, and meeting chats, the slash command autocomplete menu shows the agents in the conversation that can receive targeted messages. Selecting an agent command switches the compose box to targeted message mode. A user-initiated targeted message is delivered only to the selected agent, and the agent can respond privately to the user.

For more information, see [send and receive targeted messages in group conversations](targeted-messages.md).

## Best practices and design guidance

Offer slash commands for common actions that users need to access quickly, repeatedly, and privately. They work best for user-specific actions such as viewing settings, creating follow-up tasks, or checking personal status, especially when users benefit from discovering and reusing the action from the compose box.

As with all message-based activity, the design of slash command behaviors should carefully consider whether the user expects a public or private message as a response in group conversations. For general guidance about agent response visibility, see [targeted messaging best practices and design guidance](targeted-messages.md#best-practices-and-design-guidance).

Keep the command set small and focused. Support natural-language prompts when users need a more conversational experience, but reserve slash commands for the most repeatable actions.

Keep slash command names short and action-oriented. Use aliases for high-frequency commands when they improve discoverability, and use [prompt starters](../bots/how-to/conversations/prompt-starters.md) for longer or more open-ended prompts.

Provide clear command descriptions to improve discoverability, including any expected input beyond the command name.

## Related content

- [Send and receive targeted messages in group conversations](targeted-messages.md)
- [Prompt starters](../bots/how-to/conversations/prompt-starters.md)
- [Build message extensions](../messaging-extensions/what-are-messaging-extensions.md)
