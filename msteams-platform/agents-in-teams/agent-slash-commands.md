---
title: Enable Slash Commands for Agents
description: Learn how to enable slash commands for your agents and bots
ms.localizationpriority: high
ms.date: 03/11/2026
ms.topic: reference
---

<!-- markdownlint-disable MD036 -->
<!-- markdownlint-disable MD046 -->
<!-- markdownlint-disable MD001 -->
<!-- markdownlint-disable MD024 -->

# Enable slash commands for agents and bots

Slash commands are shortcuts initiated by typing a forward slash (`/`) in the compose box on Teams. It gives users a clear, predictable way to trigger agent or bot actions using simple text commands.

**Key points**

- [What is a slash command](#what-is-a-slash-command)
- [User experience for slash commands](#user-experience-for-slash-commands)
- [Why use slash commands](#why-use-slash-commands)
- **Slash commands developer experience**
  - [Supported scenarios for slash commands](#supported-scenarios-for-slash-commands)
  - [Manifest updates](#manifest-updates-for-slash-commands)
  - [Handle slash commands](#handle-slash-commands)
  - [Response codes for slash commands](#response-codes-for-slash-commands)

## What is a slash command

A slash command is a quick command (with optional parameters) you can add to your agent or bot to trigger a specific action. It starts with a '/', for example, `/contoso`. Teams shows a menu of available commands from built-in features, workflows, and any installed agents or bots.

You can enable slash commands for your agents and bots. For more information, see [supported scenarios for slash commands](#supported-scenarios-for-slash-commands).

## User experience for slash commands

When someone uses a slash command, it shows up as a private message just for them. The agent or bot can reply privately or, when it is relevant, share the response with the whole group or channel. You control this through the agent or bot logic, so responses are shared publicly when they’re useful to others.

:::image type="content" source="../assets/images/agents-in-teams/agent-slash-commands/agent-slash-commands.png" alt-text="Image shows the response flows for agent slash commands." border="false" lightbox="../assets/images/agents-in-teams/agent-slash-commands/agent-slash-commands.png":::

> [!NOTE]
>
> - Public responses must be used when visibility in the group or channel adds value.
> - The original private message expires after 24 hours.

### Agent response visibility

You can control the visibility of agent responses to slash commands through defined agent‑to‑user response flows:

- [Private agent-to-user response](#private-agent-to-user-response)
- [Public agent-to-user response](#public-agent-to-user-response)

#### Private agent-to-user response

This flow keeps slash command results focused between the user and the agent or bot. Use private response flow for drafts, summaries, personal tasks.

:::row:::
    :::column span="2":::
        <br>

        1. When a user runs a slash command, it shows up as a private message.
        1. If the agent or bot responds privately, the reply appears only to the initiating user and quotes the user’s prompt. You can include an option for the user to share it publicly if they want.
        1. If the user chooses to allow, the agent or bot posts a single message with its response along with the quoted prompt.

    :::column-end:::
    :::column span="3":::
        :::image type="content" source="../assets/images/agents-in-teams/agent-slash-commands/agent-private-response.png" alt-text="Image shows an agent's private response to a user's slash command." border="false" lightbox="../assets/images/agents-in-teams/agent-slash-commands/agent-private-response.png":::
    :::column-end:::
:::row-end:::
:::row:::
    :::column span:::
      This flow minimizes noise in shared conversations for private, fast, and context-aware interactions.
    :::column-end:::
:::row-end:::

#### Public agent-to-user response

When the response is useful to the wider audience, you can choose to enable your agent or bot to show it publicly. Use public response flow for status updates, confirmations, or shared signals.

:::row:::
    :::column span="2":::
        <br>

        1. When a user runs a slash command, it appears right away as a private message.
        1. If the agent or bot is configured for public replies, the response is posted to all members in the group or channel. 
        1. The agent or bot response quotes the user’s prompt.
    :::column-end:::
    :::column span="3":::
        :::image type="content" source="../assets/images/agents-in-teams/agent-slash-commands/agent-public-response.png" alt-text="Image shows agent's public response." border="false" lightbox="../assets/images/agents-in-teams/agent-slash-commands/agent-public-response.png":::
    :::column-end:::
:::row-end:::
:::row:::
    :::column span:::
        This flow makes it easy to share agent or bot responses when they’re helpful to the group or channel like status updates, confirmations, or other information meant for everyone to see.
    :::column-end:::
:::row-end:::

## Why use slash commands

Slash commands make agents and bots easier to use in shared chats. They let people run common actions with short commands and quickly see what’s available by typing `/`. Because the commands are clear and consistent, they reduce confusion and work within defined permissions. Your agent or bot can also respond in a private one-turn conversation, which helps keep busy conversations less noisy.

[WIP: Add details and scenarios/examples]

## Slash commands developer experience

Enabling slash commands typically involves the following:

- [Select one or more of the scenarios for enabling slash commands](#supported-scenarios-for-slash-commands): You can enable slash commands for your agents, bots, and message extension apps.
- [Update your Teams app manifest and declare supported commands](#manifest-updates-for-slash-commands): You can opt for slash commands through the Teams app manifest. You can optionally declare commands in the app manifest to present users with a curated set of slash commands for triggering actions via <`/app-name`>.
- [Implement the command handling in your agent or bot](#handle-slash-commands): Use Teams SDK or REST APIs to configure sending the agent or bot response as a private message to a single user or as public message to the group or channel.

### Supported scenarios for slash commands

You can enable slash commands for your agents and bots in the following ways:

- **App-defined slash commands**: Agents and bots can publish a curated set of slash commands so users can discover and run common actions without leaving the compose box. You can explicitly declare the commands your agent or bot supports, and Teams shows them in the slash command picker when a user types `/`. For example:

  - `/help`
  - `/settings`

- **User-to-agent interaction**: Slash commands can initiate one-turn interaction with agent or bot. In this model, the user enters a command (and optional text) in the compose box, and the response is delivered privately, making it ideal for drafting, lookups, and personal productivity tasks. For example:

  - `/contoso incident summarize the last 24 hours and suggest next steps`
  - `/contoso create-task fix login issue for mobile users`

  To support natural-language prompts, you must explicitly opt in so agents or bots that want to support only fixed commands can do so without enabling free-form prompting.

- **Message extension actions as slash commands**: Action-type message extensions can also surface as slash commands. When a user selects the command from the `/` menu, Teams opens the associated modal (task module) or dialog so the user can complete the action with guided inputs, validation, and a consistent UI flow. For example, `/contoso create task` (opens a task creation dialog).

  > [!NOTE]
  > Search type message extensions aren’t exposed as slash commands. Users can access them through the message extension flyout instead.

### Manifest updates for slash commands

Update your app manifest to opt in to targeted messaging and (optionally) list the commands you want to show in the compose box. In the manifest, you must:

- Declare whether the agent or bot supports slash commands.
- List the specific slash commands the agent or bot exposes.
- Specify whether it supports natural-language prompts when invoked via slash commands.

[WIP: Add link to Manifest docs]

The following options are supported:

- **Opt for agent-specific commands without a command list**: With this opt-in, users can invoke your agent or bot from the compose box using <`/agent-name`>, and it enables the default private message response flow. If you don’t publish a list of commands, users can still invoke your agent or bot via <`/agent-name`> and provide free-form input (depending on your agent or bot capabilities).

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

- **Provide an explicit command list**: Define a curated set of commands (for example, `/help`, `/create`, `/design`) that appear in the slash menu with a short description. Existing agent or bot commands can be reused, or you can introduce new commands optimized for slash usage.

  After you enable slash commands, declare each command in the manifest, including the command name and a user-facing description. List the specific commands, and not broad categories. Once you declare a command, users can invoke it (for example, <`/create`> or <`/app-name create`>, depending on the client experience).

  You can declare a command list for your agent or bot in one of the following scenarios:

  - **Scenario 1**: Agent or bot with separate @mention and slash command lists
  - **Scenario 2**: Agent or bot with same commands available in both @mention and slash triggers
  - **Scenario 3**: Message extension actions with slash commands

    Use the following examples to declare slash commands in the app manifest:

    # [Scenario 1](#tab/sc1)

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

    # [Scenario 3](#tab/sc3)

      Use the following example to configure the app manifest for supporting message extension actions that are available via slash commands using the new `triggers` property.

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

### Handle slash commands

You can enable the agent or bot to send a private message to that user or a public message to the group or channel. You can also enable the agent or bot to update or delete a message that it had previously sent.

#### Send an agent response

Use the following code snippets to enable your agent or bot to respond to a slash command based on [supported scenarios](#supported-scenarios-for-slash-commands):

[WIP: Add link to Teams SDK docs]

**Private message to a user**: Configure your agent or bot to send a reply only to the person who ran the slash command or to another user in the group or channel. Use one of the following private message scenarios to send a message to a single user.

- **Response to the same user**: Use one of the following code snippets for sending an agent response only to the user who triggered the slash command.

  # [C#](#tab/dotnet1)

    [WIP: Add code snippet]

  # [TypeScript](#tab/ts1)

    ```typescript
    
      app.on('message', async ({ send, activity }) => {
        if(activity.Recipient.isTargeted) {
          send(new MessageActivity('Reactive TM').withRecipient(activity.From, isTargeted: true))
          }
      });
    ```

  # [Python](#tab/Py1)

    [WIP: Add code snippet]

  # [HTTP](#tab/api1)

    [WIP: Add code snippet]

    ---

- **Response to a different user**: Use one of the following code snippets for sending an agent response to a different user in the group or channel.

  # [C#](#tab/dotnet1)

    [WIP: Add code snippet]

  # [TypeScript](#tab/ts1)

    ```typescript

      app.on('message', async ({ send, activity }) => {
        if(activity.Recipient.isTargeted) {
          send(new MessageActivity('Reactive TM').withRecipient(new Account {Id: <userMRI>,Name: <user Name>, Role: User}, isTargeted: true))
        }
      });
    ```

  # [Python](#tab/Py1)

    [WIP: Add code snippet]

  # [HTTP](#tab/api1)

    [WIP: Add code snippet]

    ---

**Public response by the agent**: You can enable the agent or bot to send a public response in the group or channel if the response is relevant to all members.

# [C#](#tab/dotnet)

  [WIP: Add code snippet]

# [TypeScript](#tab/ts)

  ```typescript

  app.on('message', async ({ send, activity }) => {
    send(new MessageActivity('Normal msg'))  
  });
  ```

# [Python](#tab/Py)

  [WIP: Add code snippet]

# [HTTP](#tab/api)

  [WIP: Add code snippet]

---

#### Update an agent response

The agent or bot can edit its original message, if needed. The updated message appears only in the intended user’s view.

Use one of the following code snippets to edit the agent's response:

# [C#](#tab/dotnet1)

  [WIP: Add code snippet]

# [TypeScript](#tab/ts1)

  [WIP: Add code snippet]

# [Python](#tab/Py1)

  [WIP: Add code snippet]

# [HTTP](#tab/api1)

  [WIP: Add code snippet]

---

#### Delete an agent response

Use the following code snippet to enable the agent or bot to delete its response:

# [C#](#tab/dotnet1)

  [WIP: Add code snippet]

# [TypeScript](#tab/ts1)

  ```typescript

    app.on('messageDelete', async ({ activity, next }) => {
      if(activity.Recipient.isTargeted) {
        // Business logic when message hard delete flow is for TM
      }
    });
  ```

# [Python](#tab/Py1)

  [WIP: Add code snippet]

# [HTTP](#tab/api1)

  [WIP: Add code snippet]

---

## Response codes for slash commands

[WIP: Awaiting details on error codes]

For more information on error codes for targeted messages, see [WIP: Add link].

## Code sample

[WIP: Add details and link to the code sample.]

## Best practices

- Keep slash commands short and action-oriented.
- Use slash commands for private or quick actions, and @mentions for richer conversations.
- Avoid turning long prompt suggestions into slash commands. Keep them lightweight.
- Provide clear command descriptions to improve discoverability.
- Add aliases for high-traffic commands  where appropriate.

## See also

- Enable targeted messages [WIP: Add link]
- Teams SDK docs [WIP: Add link]
