---
title: Enable Slash Commands for Agents
description: Learn how to enable slash commands for your agents and bots
ms.localizationpriority: high
ms.date: 03/11/2026
ms.topic: reference
---

# Enable slash commands for agents and bots

Slash commands are a lightweight way to invoke an agent's or bot's capabilities using a predictable, text-first syntax that starts with '/' (slash). Slash commands act like power shortcuts that combine the speed of commands with the flexibility of natural language.

**Key points**

- [What are slash commands](#what-are-slash-commands)
- [Why use slash commands](#why-use-slash-commands)
- [Supported slash command scenarios](#supported-slash-command-scenarios)
- [Visibility of agent responses](#visibility-of-agent-responses)
- [Enable slash commands](#enable-slash-commands)
- [Response codes for slash commands](#response-codes-for-slash-commands)

## What are slash commands

A slash command is usually a command name plus optional parameters—such as `/summarize last 20 messages`or `/draft status update for Project Contoso` can get reliable outcomes with minimal typing.  Users can type a short command directly in the message compose box to trigger an action immediately. When a user types /, Teams shows a menu of available commands from built-in features, workflows, and installed or available apps.

[WIP: Add infographic for showing UX]

For apps and agents, slash commands can be used to:

- Trigger a specific app action (for example, create a task, open a form, or start a workflow).
- Start a private, single turn interaction with a bot or agent.
- Provide a faster alternative to verbose @mentions or multi-step menus.

### Visibility of agent responses

Slash command responses are private, one to one interactions between a user and an agent or bot. The responses are visible only to the initiating user by default to maintain focus, reduce noise, and enable personalized interactions.

You can control response visibility through bot or agent logic and can selectively make responses public to support collaboration or business needs. Enable the agent to selectively surface certain responses to a channel or group chat when the information is relevant to a broader audience. Visibility decisions are intentional developer driven when public responses add value.

#### Agent response flows with slash commands - user scenario

Slash commands supports two distinct agent-to-user response flows:

:::row:::
    :::column span="2":::

    - **Private Agent-to-User Response (Default)**
    
        This flow supports focused, one-to-one interactions between the user and the agent or bot.
    
      - When a user sends a slash command to the bot, their original message is immediately reflected as a targeted message.
      - If the bot responds privately, the user receives the bot’s response as a targeted reply, with the user’s original prompt shown as a block quote.
      - When the user selects Allow, a single message is displayed that includes:
        - The bot’s response
        - The user’s prompt rendered as a block quote
      - The initial targeted message containing the user’s prompt expires after 24 hours.
    
    This flow minimizes noise in shared conversations and is optimized for private, fast, and context-aware interactions.
    :::column-end:::
    :::column span="3":::
        :::image type="content" source="../assets/images/agents-in-teams/agent-slash-commands/agent-private-response.png" alt-text="Image shows an agent's private response to a user's slash command." border="false":::
    :::column-end:::
:::row-end:::

- **Public Agent-to-User Response (Developer-Enabled)**

    In scenarios where the response is relevant to a broader audience, developers can choose to surface agent responses publicly.

  - When a user sends a slash command to the bot, their original message is immediately reflected as a targeted message.
  - If the bot is configured to respond publicly, a single message is shown in the conversation that includes:

    - The bot’s response
    - The user’s prompt rendered as a block quote

  - The initial targeted message containing the user’s prompt expires after 24 hours.

    :::image type="content" source="../assets/images/agents-in-teams/agent-slash-commands/agent-public-response.png" alt-text="Image shows agent's public response." border="false":::

This flow enables selective sharing of agent responses when it benefits the group or channel, such as status updates, confirmations, or information intended for shared visibility.

- **Support for showing a private response publicly**

To support a private-by-default experience, agents or bots can include suggested actions (for example, Allow or Share to channel) at the bottom of a private response. These actions let users explicitly promote an otherwise-private response to a public message. When a user selects Allow, the app is informed of that choice, enabling the bot developer’s logic to post the approved response in the channel or chat.

### User scenario

### Supported slash command scenarios

- App defined slash command
- Private user-to-agent interaction
- Message extension action

[WIP: Add details and scenarios/examples]

## Why use slash commands

Well-designed slash commands make an agent or a bot easier to discover, faster to use, and safer to operate in shared spaces:

- **Speed and muscle memory**: Frequent tasks become one-line commands.
- **Discoverability**: Typing '/' can show an in-product menu of supported actions.
- **Consistency**: A stable command name reduces ambiguity versus purely open-ended prompts.
- **Permission-aware actions**: Commands can map to well-defined operations with clear scopes and guardrails.
- **Great UX in busy chats**: Commands can trigger private or compact responses when appropriate.

## Slash commands developer experience

You can enable slash commands for your agent or bot by opting in through the Teams app manifest. You can choose to activate <`/app‑name`> only when necessary and to provide a tailored selection of commands ideal for slash usage.

### Manifest updates required for slash commands

To enable slash commands, update your app manifest to opt in to targeted messaging and (optionally) declare the specific commands you want to expose in the compose box. In the app manifest, you must:

- Declare whether the app supports slash commands.
- List the specific slash commands the app exposes.
- Indicate whether the app supports natural language prompts when invoked via slash commands.

[WIP: Add Manifest code snippet]

- Enable the supported targeted messages flag: This opt-in allows your agent to be invoked from the compose box using <`/agent-name`>, and supports the private targeted-message response flow.
- Option A: Support </`agent-name`> without a command list: If you don’t publish a list of commands, users can still invoke your app via <`/agent-name`> and provide free-form input (depending on your agent's capabilities).
- Option B: Provide an explicit command list: Define a curated set of commands (for example, help, create, design) that appear in the slash menu with a short description. Existing agent commands can be reused, or you can introduce new commands optimized for slash usage.

Notes -

**Requirements**: After you enable slash commands, each command you want to expose as a slash command must be explicitly declared in the manifest (command name plus user-facing description). List the actual commands (for example, create), not just broad categories of commands. Once declared, a command like create becomes invokable as <`/create`> (or <`/app-name create`>, depending on the client experience).

### Enable slash commands

[WIP: Add code snippets]

When a user sends a message to the agent, the Apx adds the `isTargeted` property to the `Recipient` object within `Activity` object of message event payload. You can enable the agent to send a targeted message to the same user or a public message to the group chat or channel. You can also enable the agent to delete a message that it had previously sent.

#### Send an agent response

Use the following code snippets to enable your agent to respond to a slash command based on supported scenarios:

- **Private message to the user who initiated the slash command**:

```typescript

app.on('message', async ({ send, activity }) => {
  if(activity.Recipient.isTargeted) {
    send(new MessageActivity('Reactive TM').withRecipient(activity.From, isTargeted: true))
  }
});
```

- **Public message to the channel or group where the user initiated the slash command**:

```typescript

app.on('message', async ({ send, activity }) => {
  if(activity.Recipient.isTargeted) {
    send(new MessageActivity('Reactive TM').withRecipient(new Account {Id: <userMRI>,Name: <user Name>, Role: User}, isTargeted: true))
  }
});
```

- **Reactive message (normal message)**:

```typescript

app.on('message', async ({ send, activity }) => {
  send(new MessageActivity('Normal msg'))  
});
```

#### Delete an agent response

Use the following code snippet to enable the agent to delete its response:

```typescript

app.on('messageDelete', async ({ activity, next }) => {
  if(activity.Recipient.isTargeted) {
    // Business logic when message hard delete flow is for TM
  }
});
```

## Response codes for slash commands

[WIP: Awaiting details on error codes]

## Best practices

- Keep slash commands short and action oriented
- Use slash commands for private or quick actions, and @mentions for richer conversations.
- Avoid exposing overly verbose prompt suggestions as slash commands.
- Provide clear command descriptions to improve discoverability.
- Offer aliases for frequently used commands where appropriate.
