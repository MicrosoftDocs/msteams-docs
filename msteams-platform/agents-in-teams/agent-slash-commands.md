---
title: Enable Slash Commands for Agents
description: Learn how to enable slash commands for your agents and apps
ms.localizationpriority: high
ms.date: 03/11/2026
ms.topic: reference
---

<!-- markdownlint-disable MD036 -->
<!-- markdownlint-disable MD046 -->
<!-- markdownlint-disable MD001 -->
<!-- markdownlint-disable MD024 -->

# Expose slash commands and @mention commands from agents and apps

> [!NOTE]
>
> Support for slash commands is available in [public developer preview](../resources/dev-preview/developer-preview-intro.md).

*Slash commands* and *@mention commands* for Teams agents and apps help users discover clear, predictable ways to interact with agents and apps using convenient text commands.

## What is a slash command

Slash commands are text-based shortcuts in Teams that let users perform specific actions from the compose box in chats and meetings. When a user types a <kbd>/</kbd> in the compose box, Teams shows an autocomplete menu of available commands. The menu includes a set of built-in [commands for common tasks](https://support.microsoft.com/office/use-commands-in-microsoft-teams-88f61508-284d-417f-a53d-9e082164050b), as well as the names of agents that are eligible to receive targeted messages. Users use these agent-named commands to send targeted messages to agents; see [Send and receive targeted (private) messages](targeted-messages.md).

If your agent or app implements behaviors that are intended to be accessed via named commands, you can add them to the autocomplete menu to help users discover them.

:::image type="content" source="../assets/images/agents-in-teams/agent-slash-commands/slash-command-compose-box.png" alt-text="Image shows the response flows for agent slash commands." border="false" lightbox="../assets/images/agents-in-teams/agent-slash-commands/slash-command-compose-box.png":::

## Types of slash commands

Apps and agents can expose three types of commands in Teams: conversational slash commands, conversational @mention commands, and message extension slash commands. All three types are supported across all client platforms, including mobile.

### Conversational slash commands

When activated, conversational slash commands prepare the compose box with a targeted (private) message to the agent that includes the name of the command as the message text; see [Send and receive targeted (private) messages in group conversations](targeted-messages.md) for more information about targeted messages. For commands that take additional text input, users can modify or append to the text before sending the message. When the user sends the message, it is sent as a targeted message to the agent that can't be seen by other participants in the conversation.

TODO screenshot

Conversational slash commands are useful for surfacing named command functionality that users may want to use privately in group conversations. TODO examples

Slash command names do not need to be globally unique. Each command in the autocomplete box is displayed with the name and icon of the agent that provides them, enabling users to differentiate between them.

### Conversational @mention commands

Conversational @mention commands function just like conversational slash commands, but are exposed via a separate autocomplete box that appears after the user inserts an @mention of the agent in the compose box. Activating an @mention command autocompletes the command name into the compose box as message text. The resulting message is a public message containing an @mention shown to all participants in the conversation.

TODO screenshot

### Message extension slash commands

Apps that implement action-type message extensions can surface them as discoverable slash commands. When activated, message extension slash commands immediately open the associated task module or dialog and do not populate the compose box or send a message. (TODO I think these can be activated from the command box too?). Search-type message extensions cannot be exposed as commands.

TODO screenshot

## Conversational slash command behavior implementation

When a user activates a conversational slash or @mention command to populate the compose box and then sends the message, the result is a standard or targeted message sent to the agent. The agent's message handler implementation is responsible for interpreting the text as a named command and handling it appropriately.

## Implement slash commands

Enabling slash commands typically involves the following:

- [Select one or more of the supported scenarios for enabling slash commands](#supported-scenarios-for-slash-commands): You can enable slash commands for your agents, bots, and message extension apps.
- [Update app manifest and declare supported commands](#update-app-manifest-for-slash-commands): You can opt for slash commands through the Teams app manifest. You can optionally declare commands in the app manifest to present users with a curated set of slash commands for triggering actions via <`/app-name`>.

### Supported scenarios for slash commands

You can enable slash commands for your agents in the following ways:

- **App-defined slash commands**: Similar to using @mentions in the compose box, agents can publish a curated set of [slash commands](#command-list). Users can discover and run common actions without leaving the compose box. They can explicitly declare the commands your agent supports, and Teams shows them in the slash command picker when a user types `/`. For example:

  - `/help`
  - `/settings`

- **User-to-agent interaction**: Slash commands can initiate one-turn interaction with agent. In this model, the user enters a command (and optional text) in the compose box, and the response is delivered privately, making it ideal for drafting, lookups, and personal productivity tasks. For example:

  - `/contoso incident summarize the last 24 hours and suggest next steps`
  - `/contoso create-task fix login issue for mobile users`

  To [support natural-language prompts](#command-list), you must explicitly opt in so agents that want to support only fixed commands can do so without enabling free-form prompting.

- **Message extension actions as slash commands**: You can [surface action-type message extensions as slash commands](#me). When a user selects the command from the `/` menu, Teams opens the associated modal (task module) or dialog so the user can complete the action with guided inputs, validation, and a consistent UI flow. For example, `/contoso create task` (opens a task creation dialog).

  > [!NOTE]
  > Search type message extensions aren’t exposed as slash commands. Users can access them through the message extension flyout instead.

### Update app manifest for slash commands

Update your [app manifest](/microsoft-365/extensibility/schema/root-compose-extensions-commands?view=m365-app-prev&tabs=syntax&preserve-view=true) to opt for slash commands in your agent and (optionally) list the commands you want to show in the compose box. In the manifest, you must:

<a id="command-list"></a>

- **Provide an explicit command list**: Define a curated set of commands (for example, `/help`, `/create`, `/design`) that appear in the slash menu with a short description. Existing agent commands can be reused, or you can introduce new commands optimized for slash usage.

  After you enable slash commands, declare each command in the manifest, including the command name and a user-facing description. List the specific commands, and not broad categories. Once you declare a command, users can invoke it (for example, <`/create`> or <`/app-name create`>, depending on the client experience).

  You can declare a command list using the new `triggers` property for your agent in one of the following scenarios:

  # [Scenario 1](#tab/sc1)

  **Scenario 1**: Agent with separate @mention and slash command lists

  Use the following example to configure the app manifest for supporting an agent or a bot that offers separate commands for @mention and slash triggers.

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

  # [Scenario 2](#tab/sc2)

  **Scenario 2**: Agent with same commands available in both @mention and slash triggers

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

<a id="me"></a>

- **Opt for agent-specific commands without a command list**: With this opt-in, users can invoke your agent from the compose box using <`/agent-name`>, and it enables the default private message response flow. If you don’t publish a list of commands, users can still invoke your agent via <`/agent-name`> and provide free-form input (depending on your agent capabilities).

    Use the following example to configure the app manifest for supporting slash commands without declaring any commands:

    ```json
    {
        "bots": [
            {
                "botId": "{{BOT_ID}}",
                "scopes": ["personal", "team", "groupChat"],
                "supportsTargetedMessages": true
            }
        ]
    }
    ```

- **Enable message extension actions as slash commands**: Use the following example to configure the app manifest for supporting message extension actions as slash commands using the new `triggers` property.

  > [!NOTE]
  > You can configure the app manifest to enable slash commands for both the bot and message extension by combining the manifest examples from scenarios 1 or 2 with scenario 3.

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

When you implement slash commands, you should also determine how the agent or app responds to the user's query. The agent can respond privately to the user or to the group or channel, as needed. For more information, see [agent response scenarios for slash commands](targeted-messages.md#agent-response-for-slash-commands).

## Best practices

- Keep slash commands short and action-oriented.
- Use slash commands for private or quick actions, and @mentions for richer conversations.
- Avoid turning long prompt suggestions into slash commands. Keep them lightweight. TODO use xxx instead.
- Provide clear command descriptions to improve discoverability, including params and expected text.
- Add aliases for high-traffic commands where appropriate.

TODO blanket guidance - is there any reason *not* to do this if you have named commands?

TODO see best practices for targeted msgs too

For more information on best practices for determining agent responses for slash commands, see [design guidelines for agent responses](targeted-messages.md#best-practices-for-agent-responses).

## Code sample

[WIP: Add details and link to the code sample.]

## Next step

> [!div class="nextstepaction"]
> [Agent responses for slash commands](targeted-messages.md#agent-response-for-slash-commands)
