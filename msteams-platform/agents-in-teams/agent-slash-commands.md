---
title: Enable Slash Commands for Agents
description: Learn how to enable slash commands for your agents and bots
ms.localizationpriority: high
ms.date: 03/11/2026
ms.topic: reference
---

# Enable slash commands for agents and bots

Slash commands are a lightweight way to invoke an agent's or bot's capabilities using a predictable, text-first syntax that starts with '/' (slash). They act like power shortcuts that combine the speed of commands with the flexibility of natural language.

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

A slash command is usually a command name plus optional parameters such as `/summarize last 20 messages` or `/draft status update for Project Contoso` can get reliable outcomes with minimal typing. Users can type a short command directly in the message compose box to trigger an action immediately. When a user types `/`, Teams shows a menu of available commands from built-in features, workflows, and installed or available agents or apps.

[WIP: Add infographic for showing UX]

Use slash commands to:

- Trigger a specific agent or app action (for example, create a task, open a form, or start a workflow).
- Start a private, single turn interaction with an agent or app.
- Provide a faster alternative to verbose @mentions or multi-step menus.

Teams supports agent-specific slash commands, private agent-to-user interaction, and slash commands for message extension actions. For more information, see [supported scenarios for slash commands](#supported-scenarios-for-slash-commands).

## User experience

Usually slash command responses are one-to-one interactions between the initiating user and the agent or bot. Only the initiating user can see the response, helping maintain focus, reduce noise, and enable personalised interactions.

You can, however, control the response visibility through agent or bot logic and can selectively share responses to a channel or group chat when it benefits collaboration. Public responses must be an intentional, developer-driven choice when broader visibility adds value.

### Agent response flows with slash commands - user scenarios

Slash commands support the following agent-to-user response flows:

:::row:::
    :::column span:::
    **Private Agent-to-User Response (Default)**: This flow supports focused, one-to-one interactions between the user and the agent or bot:
    :::column-end:::
:::row-end:::
:::row:::
    :::column span="2":::
        1. When a user sends a slash command, their message appears as a targeted message.
        1. If the agent or bot replies privately, it appears as a targeted reply with the user’s prompt quoted with the option of making it available publicly.
        1. When the user selects **Allow**, a single message is posted containing the bot’s response and the quoted prompt.

    :::column-end:::
    :::column span="3":::
        :::image type="content" source="../assets/images/agents-in-teams/agent-slash-commands/agent-private-response.png" alt-text="Image shows an agent's private response to a user's slash command." border="false" lightbox="../assets/images/agents-in-teams/agent-slash-commands/agent-private-response.png":::
    :::column-end:::
:::row-end:::
:::row:::
    :::column span:::
      The original targeted message expires after 24 hours. This flow minimizes noise in shared conversations and is optimized for private, fast, and context-aware interactions.
    :::column-end:::
:::row-end:::

:::row:::
    :::column span:::
    **Public Agent-to-User Response (Developer-Enabled)**: In scenarios where the response is relevant to a broader audience, developers can choose to surface agent responses publicly.
    :::column-end:::
:::row-end:::
:::row:::
    :::column span="2":::

        1. When a user sends a slash command to the agent or bot, their original message is immediately reflected as a targeted message.
        1. If the agent or bot is configured to respond publicly, it appears as a targeted reply with the user’s prompt quoted.
        1. The agent's or bot's response is visible to all members in the channel or group chat.
    :::column-end:::
    :::column span="3":::
        :::image type="content" source="../assets/images/agents-in-teams/agent-slash-commands/agent-public-response.png" alt-text="Image shows agent's public response." border="false" lightbox="../assets/images/agents-in-teams/agent-slash-commands/agent-public-response.png":::
    :::column-end:::
:::row-end:::
:::row:::
    :::column span:::
        The initial targeted message containing the user’s prompt expires after 24 hours. This flow enables selective sharing of agent or bot responses when it benefits the group or channel, such as status updates, confirmations, or information intended for shared visibility.
    :::column-end:::
:::row-end:::

## Why use slash commands

Well-designed slash commands make an agent or a bot easier to discover, faster to use, and safer to operate in shared spaces:

- **Speed and muscle memory**: Frequent tasks become one-line commands.
- **Discoverability**: Typing '/' can show an in-product menu of supported actions.
- **Consistency**: A stable command name reduces ambiguity versus purely open-ended prompts.
- **Permission-aware actions**: Commands can map to well-defined operations with clear scopes and guardrails.
- **Great UX in busy chats**: Commands can trigger private or compact responses when appropriate.

[WIP: Add details and scenarios/examples]

## Slash commands developer experience

You can enable slash commands for your agent or bot by opting in through the Teams app manifest. You can choose to activate <`/app‑name`> only when necessary and to provide a tailored selection of commands ideal for slash usage.

### Supported scenarios for slash commands

Agents and bots can participate in slash commanding in the following ways:

- **App-defined slash commands**: Agents and bots can publish a curated set of slash commands so users can discover and run common actions without leaving the compose box. You can explicitly declare the commands your agent or bot supports, and Teams shows them in the slash command picker when a user types `/`. This approach keeps the menu focused and avoids automatically exposing every possible capability. For example:

  - `/contoso create-task`
  - `/contoso incident`
  - `/contoso dashboard`

- **Private user-to-agent interaction**: Slash commands can also initiate a private, one-turn interaction with agent or bot. In this model, the user enters a command (and optional text) in the compose box, and the response is delivered privately rather than posted to the current chat or channel—making it ideal for drafting, lookups, and personal productivity tasks. For example:

  - `/contoso incident summarize the last 24 hours and suggest next steps`
  - `/contoso create-task fix login issue for mobile users`

  To support natural-language prompts (for example, `/contoso create-task fix login issue`), developers must explicitly opt in—so apps that only want to support fixed commands can do so without enabling free-form prompting.

- **Message extension actions as slash commands**: Action-type message extensions can also surface as slash commands. When a user selects the command from the `/` menu, Teams opens the associated modal (task module) or dialog so the user can complete the action with guided inputs, validation, and a consistent UI flow. For example, `./create task` (opens a task creation dialog)

> [!NOTE]
> Search type message extensions aren’t exposed as slash commands. Users can access them through the message extension flyout instead.

### Manifest updates for slash commands

To enable slash commands, update your app manifest to opt in to targeted messaging and (optionally) declare the specific commands you want to expose in the compose box. In the app manifest, you must:

- Declare whether the agent or bot supports slash commands.
- List the specific slash commands the agent or bot exposes.
- Indicate whether the agent or bot supports natural language prompts when invoked via slash commands.

This opt-in allows your agent or bot to be invoked from the compose box using <`/agent-name`>, and supports the private targeted-message response flow.

[WIP: Add link to Manifest docs]

- **Support agent-specific commands without a command list**: If you don’t publish a list of commands, users can still invoke your agent or bot via <`/agent-name`> and provide free-form input (depending on your agent's or bot's capabilities).

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

  After you enable slash commands, each command you want to expose as a slash command must be explicitly declared in the manifest (command name plus user-facing description). List the actual commands and not just broad categories of commands. Once declared, a command becomes invokable, for example create can be invoked as <`/create`> (or <`/app-name create`>, depending on the client experience).

  You can declare command list for your agent or bot in one of the following scenarios:

  - Scenario 1: Agent or bot with separate @mention and slash command lists
  - Scenario 2: Agent or bot with commands available in both mention and slash triggers
  - Scenario 3: Message extension with slash commands

    Use the following examples to declare slash commands in the app manifest.

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
      > - `summarizeCommand` omits `triggers`, so it is **not** surfaced in the slash list (unlike `commandLists`, where absent `triggers` defaults to `["mention"]`).
      > - You can also configure the app manifest to support slash commands for both bot and message extension in your agent by using the code snippet examples from scenarios 1 and 2 and scenario 3.

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

    ---

### Enable slash commands

When a user sends a message to the agent or bot, the APX adds the `isTargeted` property to the `Recipient` object within `Activity` object of message event payload. You can enable the agent or bot to send a targeted message to the same user or a public message to the group chat or channel. You can also enable the agent or bot to delete a message that it had previously sent.

#### Send an agent response

Use the following code snippets to enable your agent or bot to respond to a slash command based on supported scenarios:

[WIP: Add link to Teams SDK docs]

- **Private message to a user**: You can enable the agent or bot to send a targeted response to the user who initiated the slash command or to a different user in the channel or group. Use one of the following scenarios to enable the agent or bot to send a targeted message to a single user.

  # [Response to same user](#tab/tm1)

    ```typescript
    
    app.on('message', async ({ send, activity }) => {
      if(activity.Recipient.isTargeted) {
        send(new MessageActivity('Reactive TM').withRecipient(activity.From, isTargeted: true))
      }
    });
    ```

  # [Response to different user](#tab/tm2)

    ```typescript
    
    app.on('message', async ({ send, activity }) => {
      if(activity.Recipient.isTargeted) {
        send(new MessageActivity('Reactive TM').withRecipient(new Account {Id: <userMRI>,Name: <user Name>, Role: User}, isTargeted: true))
      }
    });
    ```

    ---

- **Public response by the agent**: You can enable the agent or bot to send a public response in the group or channel if the response is relevant to all members.

  ```typescript
  
  app.on('message', async ({ send, activity }) => {
    send(new MessageActivity('Normal msg'))  
  });
  ```

#### Update an agent response

The agent can edit the original targeted message if needed. The updated message appears only in the intended user’s view.

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

## Code sample

[WIP: Add details and link to the code sample.]

## Best practices

- Keep slash commands short and action oriented
- Use slash commands for private or quick actions, and @mentions for richer conversations.
- Avoid exposing overly verbose prompt suggestions as slash commands.
- Provide clear command descriptions to improve discoverability.
- Offer aliases for frequently used commands where appropriate.

## See also

- Enable targeted messages [Add link]
- Teams SDK docs [Add link]
