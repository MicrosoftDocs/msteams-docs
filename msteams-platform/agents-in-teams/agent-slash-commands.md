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

# Enable slash commands for agents and bots

Slash commands are a lightweight way to invoke an agent's or a bot's capabilities using a predictable, text-first syntax that starts with `/` (slash). They act like power shortcuts that combine the speed of commands with the flexibility of natural language.

**Key points**

- [What are slash commands](#what-are-slash-commands)
- [User experience](#user-experience)
- [Why use slash commands](#why-use-slash-commands)
- **Slash commands developer experience**
  - [Supported scenarios for slash commands](#supported-scenarios-for-slash-commands)
  - [Manifest updates](#manifest-updates-for-slash-commands)
  - [Enable slash commands](#enable-slash-commands)
  - [Response codes for slash commands](#response-codes-for-slash-commands)

## What are slash commands

A slash command is a quick command (with optional parameters) you can add to your agent or bot to trigger a specific action. It starts with a `/`, for example, `/summarize last 20 messages` or `/draft status update for project`. As soon as users type `/` in the message compose box, Teams shows a menu of available commands from built-in features, workflows, and any installed or available agents or apps. The agent or bot can post a private or a public response depending on its relevance.

[WIP: Add infographic for showing UX]

:::image type="content" source="../assets/images/agents-in-teams/agent-slash-commands/agent-slash-commands.png" alt-text="Image shows the response flows for agent slash commands." border="false" lightbox="../assets/images/agents-in-teams/agent-slash-commands/agent-slash-commands.png":::

Use slash commands to:

- Trigger a spcific agent or app task (for example, create a task, open a form, or start a workflow).
- Start a private, single-turn interaction with an agent or app.
- Provide a faster alternative to long prompts or multi-step menus.

You can enable agent-specific slash commands, private agent-to-user interaction, and slash commands for message extension actions. For more information, see [supported scenarios for slash commands](#supported-scenarios-for-slash-commands).

## User experience

Most slash command responses are private, one-to-one interactions between the user who initiated the command and the agent or bot. Only that user sees the result, which keeps the conversation focused and reduces noise.

Optionally, you can control the response visibility through agent or bot logic and share responses to the channel or group chat when it benefits collaboration.

> [!NOTE]
>
> - Public responses must be an intentional, developer-driven choice when broader visibility adds value.
> - The original targeted message expires after 24 hours.

### Agent response flows with slash commands - user scenarios

Slash commands support the following agent-to-user response flows:

:::row:::
    :::column span:::
    **Private agent-to-user response (default)**: This flow keeps slash command results focused between the user and the agent or bot:
    :::column-end:::
:::row-end:::
:::row:::
    :::column span="2":::
        <br>

        1. When a user runs a slash command, it shows up as a targeted message.
        1. If the agent or bot responds privately, it shows up as a targeted reply that quotes the user’s prompt and includes an option to share it publicly.
        1. If the user selects **Allow**, the agent or bot posts a single message with its response along with the quoted prompt.

    :::column-end:::
    :::column span="3":::
        :::image type="content" source="../assets/images/agents-in-teams/agent-slash-commands/agent-private-response.png" alt-text="Image shows an agent's private response to a user's slash command." border="false" lightbox="../assets/images/agents-in-teams/agent-slash-commands/agent-private-response.png":::
    :::column-end:::
:::row-end:::
:::row:::
    :::column span:::
      This flow minimizes noise in shared conversations and is optimized for private, fast, and context-aware interactions.
    :::column-end:::
:::row-end:::

:::row:::
    :::column span:::
    **Public agent-to-user response (developer-enabled)**: When the response is useful to the wider group, you can choose to enable your agent or bot to show it publicly.
    :::column-end:::
:::row-end:::
:::row:::
    :::column span="2":::
        <br>

        1. When a user runs a slash command, it appears right away as a targeted message.
        1. If the agent or bot is configured for public replies, it's response quotes the user’s prompt.
        1. The agent's or bot's response is posted to all members in the channel or group chat.
    :::column-end:::
    :::column span="3":::
        :::image type="content" source="../assets/images/agents-in-teams/agent-slash-commands/agent-public-response.png" alt-text="Image shows agent's public response." border="false" lightbox="../assets/images/agents-in-teams/agent-slash-commands/agent-public-response.png":::
    :::column-end:::
:::row-end:::
:::row:::
    :::column span:::
        This flow makes it easy to share agent or bot responses when they’re helpful to the group like status updates, confirmations, or other information meant for everyone to see.
    :::column-end:::
:::row-end:::

## Why use slash commands

Well-designed slash commands make an agent or a bot easier to discover, faster to use, and safer to operate in shared spaces:

- **Speed and muscle memory**: Frequent tasks become one-line commands.
- **Discoverability**: Typing `/` can show an in-product menu of supported actions.
- **Consistency**: Stable commands reduce ambiguity versus purely open-ended prompts.
- **Permission-aware actions**: Commands can map to well-defined operations with clear scopes and guardrails.
- **Enhanced user experience in busy chats**: Commands can trigger private or compact responses when appropriate.

[WIP: Add details and scenarios/examples]

## Slash commands developer experience

You can enable slash commands for your agents, bots, or message extension apps. Enabling slash commands typically involves the following:

- [Update your Teams app manifest and declare supported commands](#manifest-updates-for-slash-commands): You can opt for slash commands through the Teams app manifest. You can also choose to activate the commands that your agent or app provides via <`/app‑name`>. This helps to provide a tailored selection of commands that is ideal for slash usage.
- [Implement the command handling in your agent or bot](#enable-slash-commands): Use Teams SDK or REST APIs to configure sending the agent or bot response as a targeted messages to a single user or as public message to the group or channel.

### Supported scenarios for slash commands

Agents and bots can participate in slash commanding in the following ways:

- **App-defined slash commands**: Agents and bots can publish a curated set of slash commands so users can discover and run common actions without leaving the compose box. You can explicitly declare the commands your agent or bot supports, and Teams shows them in the slash command picker when a user types `/`. This approach keeps the menu focused and avoids automatically exposing every possible capability. For example:

  - `/contoso incident`
  - `/contoso dashboard`

- **Private user-to-agent interaction**: Slash commands can also initiate a private, one-turn interaction with agent or bot. In this model, the user enters a command (and optional text) in the compose box, and the response is delivered privately, making it ideal for drafting, lookups, and personal productivity tasks. For example:

  - `/contoso incident summarize the last 24 hours and suggest next steps`
  - `/contoso create-task fix login issue for mobile users`

  To support natural-language prompts, you must explicitly opt in so agents or bots that want to support only fixed commands can do so without enabling free-form prompting.

- **Message extension actions as slash commands**: Action-type message extensions can also surface as slash commands. When a user selects the command from the `/` menu, Teams opens the associated modal (task module) or dialog so the user can complete the action with guided inputs, validation, and a consistent UI flow. For example, `/contoso create task` (opens a task creation dialog).

  > [!NOTE]
  > Search type message extensions aren’t exposed as slash commands. Users can access them through the message extension flyout instead.

### Manifest updates for slash commands

To enable slash commands, update your app manifest to opt in to targeted messaging and (optionally) list the commands you want to show in the compose box. In the manifest, you must:

- Declare whether the agent or bot supports slash commands.
- List the specific slash commands the agent or bot exposes.
- Specify whether it supports natural-language prompts when invoked via slash commands.

[WIP: Add link to Manifest docs]

- **Support agent-specific commands without a command list**: With this opt-in, users can invoke your agent or bot from the compose box using <`/agent-name`>, and it enables the default private targeted message response flow. If you don’t publish a list of commands, users can still invoke your agent or bot via <`/agent-name`> and provide free-form input (depending on your agent's or bot's capabilities).

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

  After you enable slash commands, declare each command you want to show in the manifest, including the command name and a user-facing description. List the specific commands, and not broad categories. Once you declare a command, users can invoke it (for example, <`/create`> or <`/app-name create`>, depending on the client experience).

  You can declare command list for your agent or bot in one of the following scenarios:

  - **Scenario 1**: Agent or bot with separate @mention and slash command lists
  - **Scenario 2**: Agent or bot with commands available in both @mention and slash triggers
  - **Scenario 3**: Message extension with slash commands

    Use the following examples to declare slash commands in the app manifest:

    # [Scenario 1](#tab/sc1)

      Use the following example to configure the app manifest for supporting an agent or a bot that offers separate for @mention and slash triggers.

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

      Use the following example to configure the app manifest for supporting an agent or a bot that makes the same commands available in both @mention and slash triggers.

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

      Use the following example to configure the app manifest for supporting an agent or a message extension with commands that are also available via slash commands using the new `triggers` property.

      > [!NOTE]
      > - `summarizeCommand` omits `triggers`, so it isn't surfaced in the slash list (unlike `commandLists`, where absent `triggers` defaults to `["mention"]`).
      > - You can configure the app manifest to enable slash commands for both the bot and message extension by combining the code examples from scenarios 1 or 2 with scenario 3.

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

### Enable slash commands

When a user sends a message to your agent or bot using slash command, the message event payload adds the `isTargeted` property to the `Recipient` object in the `Activity` object. You can enable the agent or bot to send a targeted message to the same user or a public message to the group chat or channel. You can also enable the agent or bot to update or delete a message that it had previously sent.

#### Send an agent response

Use the following code snippets to enable your agent or bot to respond to a slash command based on supported scenarios:

[WIP: Add link to Teams SDK docs]

**Private message to a user**: Configure your agent or bot to send a targeted reply to the person who ran the slash command or to another user in the channel or group chat. Use one of the following scenarios to send a targeted message to a single user.

# [Response to same user](#tab/su)

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

- Response to different user

    ```typescript
    
    app.on('message', async ({ send, activity }) => {
      if(activity.Recipient.isTargeted) {
        send(new MessageActivity('Reactive TM').withRecipient(new Account {Id: <userMRI>,Name: <user Name>, Role: User}, isTargeted: true))
      }
    });
    ```

- **Public response by the agent**: You can enable the agent or bot to send a public response in the group or channel if the response is relevant to all members.

  ```typescript
  
  app.on('message', async ({ send, activity }) => {
    send(new MessageActivity('Normal msg'))  
  });
  ```

#### Update an agent response

The agent or bot can edit the original targeted message if needed. The updated message appears only in the intended user’s view.

Use one of the following code snippets to edit targeted message:

```typescript
// Update
const updatedMessage = new MessageActivity('This message has been updated!');
await api.conversations.activities.updateTargeted(conversationId, messageId, updatedMessage);
```

#### Delete an agent response

Use the following code snippet to enable the agent or bot to delete its response:

```typescript

app.on('messageDelete', async ({ activity, next }) => {
  if(activity.Recipient.isTargeted) {
    // Business logic when message hard delete flow is for TM
  }
});
```

## Response codes for slash commands

[WIP: Awaiting details on error codes]

For more information on error codes for targeted messages, see [Add link].

## Code sample

[WIP: Add details and link to the code sample.]

## Best practices

- Keep slash commands short and action-oriented.
- Use slash commands for private or quick actions, and @mentions for richer conversations.
- Avoid turning long prompt suggestions into slash commands. Keep them lightweight.
- Provide clear command descriptions to improve discoverability.
- Add aliases for high-traffic commands  where appropriate.

## See also

- Enable targeted messages [Add link]
- Teams SDK docs [Add link]
