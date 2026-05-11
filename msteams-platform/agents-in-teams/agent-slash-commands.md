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

> [!NOTE]
>
> Support for slash commands is available in [public developer preview](../resources/dev-preview/developer-preview-intro.md).

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

### Agent response and prompt preview visibility

Your agents and bots can send a private or public response to a user's query. You can also choose to include prompt preview in agent or bot responses.

You can control the visibility of agent responses to slash commands through defined agent‑to‑user response flows:

# [Private agent-to-user response](#tab/private)

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
      This flow minimizes noise in shared conversations for private, fast, and context-aware interactions. For more information on agent private message to a single user, see [enable targeted messages for agents](targeted-messages.md).

      Use [`Action.Submit`](../bots/how-to/conversations/prompt-suggestions.md#suggested-actions) to add (suggested action) buttons that trigger server-side logic via an invoke activity without any user-visible chat message.

    :::column-end:::
:::row-end:::

Next, enable [private agent-to-user responses](#private-agent-to-user-response).

# [Public agent-to-user response](#tab/public)

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

# [Prompt preview](#tab/preview)

When an agent or bot replies to a user, prompt preview displays the user’s query in a single self-contained message.

- Private agent-to-user response: The agent or bot replies privately to the user's targeted message, so only the intended user can see the reply.

  :::image type="content" source="../assets/images/agents-in-teams/agent-slash-commands/private-prompt-preview.png" alt-text="Image shows the prompt preview for private agent-to-user response.":::

- Public agent-to-user response: The agent or bot replies normally to the user's message, making the reply visible to everyone in the chat.

  :::image type="content" source="../assets/images/agents-in-teams/agent-slash-commands/public-prompt-preview.png" alt-text="Image shows the prompt preview for public agent-to-user response.":::

> [!NOTE]
> Including the user’s prompt in the agent response is optional. Use prompt preview to maintain context in ongoing conversations.

---

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

Update your [app manifest](/microsoft-365/extensibility/schema/root-compose-extensions-commands?view=m365-app-prev&tabs=syntax&preserve-view=true) to opt in to slash commands and (optionally) list the commands you want to show in the compose box. In the manifest, you must:

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

  # [Scenario 1](#tab/sc1)

  **Scenario 1**: Agent or bot with separate @mention and slash command lists

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
                        "scopes": ["team", "gro54upChat"],
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

  **Scenario 2**: Agent or bot with same commands available in both @mention and slash triggers

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

  **Scenario 3**: Message extension actions with slash commands

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

# [Private message to a user](#tab/private)

Configure your agent or bot to send a reply only to the person who ran the slash command or to another user in the group or channel. Use one of the following private message scenarios to send a message to a single user.

- **Response to the same user**: Use one of the following code snippets for sending an agent response only to the user who triggered the slash command.

  # [C#](#tab/dotnet1)

  ```csharp
  
    teams.OnMessage(async (context, cancellationToken) => {
      if (context.Activity.Recipient?.IsTargeted == true){
        await context.Send(new MessageActivity("Reactive TM").WithRecipient(context.Activity.From, true),cancellationToken);
      }
    });
  ```

  # [TypeScript](#tab/ts1)

  ```typescript
        
    app.on('message', async ({ send, activity }) => {
      if(activity.Recipient.isTargeted) {
        send(new MessageActivity('Reactive TM').withRecipient(activity.From, isTargeted: true))
        }
    });
  ```

  # [Python](#tab/Py1)

  ```python
        
    @app.on_message
    async def handle_message(ctx):
      if getattr(ctx.activity.recipient, "is_targeted", False):
        await ctx.send(MessageActivityInput("Reactive TM").with_recipient(ctx.activity.from_, is_targeted=True))
  ```

  # [HTTP](#tab/api1)

  [WIP: Add code snippet]
  
- **Response to a different user**: Use one of the following code snippets for sending an agent response to a different user in the group or channel.

  # [C#](#tab/dotnet1)

  ```csharp
    
  teams.OnMessage(async (context, cancellationToken) => {
    if (context.Activity.Recipient?.IsTargeted == true) {
      await context.Send(new MessageActivity("Reactive TM").WithRecipient(new Account {Id = "<userMRI>",Name = "<user Name>",Role = Role.User},true),    cancellationToken);
    }
    });
  ```

  # [TypeScript](#tab/ts1)

  ```typescript
    
  app.on('message', async ({ send, activity }) => {
    if(activity.Recipient.isTargeted) {
    send(new MessageActivity('Reactive TM').withRecipient(new Account {Id: <userMRI>,Name: <user Name>, Role: User}, isTargeted: true))
      }
  });
  ```

  # [Python](#tab/Py1)

  ```python
      
    @app.on_message
    async def handle_message(ctx):
      if getattr(ctx.activity.recipient, "is_targeted", False):
        await ctx.send(MessageActivityInput("Reactive TM").with_recipient(Account(id="<userMRI>", name="<user Name>", role=Role.USER),is_targeted=True))
  ```

  # [HTTP](#tab/api1)

  [WIP: Add code snippet]

# [Public response by the agent](#tab/public)

You can enable the agent or bot to send a public response in a group or a channel if:

- The message requires collaboration from all members
- The broader visibility adds value

  # [C#](#tab/dotnet)

    ```csharp
  
      teams.OnMessage(async (context, cancellationToken) => {
        await context.Send(new MessageActivity("Normal msg"), cancellationToken);
      });
    ```
  
  # [TypeScript](#tab/ts)

    ```typescript

    app.on('message', async ({ send, activity }) => {
      send(new MessageActivity('Normal msg'))  
    });
    ```

  # [Python](#tab/Py)

    ```python
  
      @app.on_message
      async def handle_message(ctx):
        await ctx.send(MessageActivityInput("Normal msg"))
    ```
  
  # [HTTP](#tab/api)

    [WIP: Add code snippet]

# [Prompt preview](#tab/preview)

You can enable prompt preview using Teams SDK or REST APIs.

- Use Teams SDK: Prompt preview is supported for agent's response to user in the following scenarios:

  - Reactive response: When an agent or bot responds within the context of an incoming user interaction (for example, using `send()` or `reply()`):

    - The SDK automatically attaches the `targetedMessageInfo` entity.
    - No additional code is required from the developer.

      Prompt Preview is rendered automatically using the original message context

  - Proactive response: When an agent or bot sends a proactive message, for example, follow-ups, delayed responses, or background workflows:
  
    - The developer must manually attach the entity.
    - The `messageId` of the original user message must be provided.

- Use REST APIs: Prompt preview is supported when sending agent or bot responses through the following APIs:

  - Targeted Message Send API: The agent or bot replies privately to the user’s message. The response is visible only to the targeted user.

  - Normal Message Send API: The agent or bot replies in the conversation normally. The response is visible to all participants in the chat.

  In both cases, the prompt preview experience is achieved through the same mechanism and is independent of the visibility scope.

  # [C#](#tab/dotnet)

  Attach the entity manually using the targeted message ID:

  ```csharp
    var message = new MessageActivity("Here is the result!")
      .AddTargetedMessageInfo(targetedMessageId);
        
    // Targeted reply (only the user sees it)
    message.WithRecipient(userAccount, true);
    await context.Send(message, cancellationToken);
        
    // OR public reply (everyone sees it)
    await context.Send(message, cancellationToken);
  ```

  # [TypeScript](#tab/ts)

  ```typescript
  const message = new MessageActivity('Here is the result!')
  .addTargetedMessageInfo(targetedMessageId);
    
  // Targeted reply (only the user sees it)
  message.withRecipient(userAccount, true);
  await send(message);
        
  // OR public reply (everyone sees it)
  await send(message);
  ```

  # [Python](#tab/Py)

  ```python
  message = MessageActivityInput(text="Here is the result!")
  message.add_targeted_message_info(targeted_message_id)
        
  # Targeted reply (only the user sees it)
  message.with_recipient(user_account, is_targeted=True)
  await ctx.send(message)
        
  # OR public reply (everyone sees it)
  await ctx.send(message)
  ```

  # [HTTP](#tab/api)

  ```http
  {
  "entities": [{
    "type": "targetedMessageInfo",
    "messageId": "1772129782775"
    }]
  }
  ```

---

#### Update an agent response

The agent or bot can edit its original message, if needed. The updated message appears only in the intended user’s view.

Use one of the following code snippets to edit the agent's response:

# [C#](#tab/dotnet1)

  ```csharp
  
    teams.OnMessage(async (context, cancellationToken) => {
      if (context.Activity.Recipient?.IsTargeted == true) {
        var sent = await context.Send(
          new MessageActivity("Processing your request...")
            .WithRecipient(context.Activity.From!, isTargeted: true),
          cancellationToken
        );
    
        await context.Api.Conversations.Activities.UpdateTargetedAsync(
          context.Activity.Conversation!.Id!,
          sent!.Id!,
          new MessageActivity("Updated private response"),
          cancellationToken
        );
      }
    });
  ```
  
# [TypeScript](#tab/ts1)

  ```typescript
  
    app.on('message', async ({ send, activity, api }) => {
      if (activity.Recipient.isTargeted) {
        const sent = await send(
          new MessageActivity('Processing your request...')
            .withRecipient(activity.From, isTargeted: true)
        );
    
        await api.conversations.activities.updateTargeted(
          activity.Conversation.Id,
          sent.Id,
          new MessageActivity('Updated private response')
        );
      }
    });
  ```
  
# [Python](#tab/Py1)

  ```python
  
    @app.on_message
    async def handle_message(ctx):
        if getattr(ctx.activity.recipient, "is_targeted", False):
            sent = await ctx.send(
                MessageActivityInput("Processing your request...").with_recipient(
                    ctx.activity.from_,
                    is_targeted=True
                )
            )
    
            await ctx.api.conversations.activities.update_targeted(
                ctx.activity.conversation.id,
                sent.id,
                MessageActivityInput("Updated private response")
            )
  ```

# [HTTP](#tab/api1)

  [WIP: Add code snippet]

---

#### Delete an agent response

Use the following code snippet to enable the agent or bot to delete its response:

# [C#](#tab/dotnet1)

  ```csharp
  
    // Hard delete TM flow
    teams.OnMessageDelete(async (context, cancellationToken) => {
      if (context.Activity.Recipient?.IsTargeted == true){
        // Business logic when message hard delete flow is for TM
      }
    });
  ```

# [TypeScript](#tab/ts1)

  ```typescript

    app.on('messageDelete', async ({ activity, next }) => {
      if(activity.Recipient.isTargeted) {
        // Business logic when message hard delete flow is for TM
      }
    });
  ```

# [Python](#tab/Py1)

  ```python
  
  @app.on_message_delete
  async def handle_message_delete(ctx):
    if getattr(ctx.activity.recipient, "is_targeted", False):
      # Business logic when message hard delete flow is for TM
  ```

# [HTTP](#tab/api1)

  [WIP: Add code snippet]

---

## Response codes for slash commands

Ensure to handle these errors appropriately in your agent or bot. The following table lists error codes, error descriptions, and developer actions for Teams SDK:

| Status code | Error code | Description | Developer action |
| --- | --- | --- | --- | --- |
| 400 | `INVALID_TARGETED_MESSAGE_ID` | The message ID doesn't refer to a targeted message. | Ensure that the message ID for the targeted message is correct. |
| 404 | `TARGETED_MESSAGE_EXPIRED_OR_DELETED` | The message ID provided couldn't be found in the conversation. The message is unavailable as it was deleted or auto removed after 24 hours. | Ensure the agent either sends a new targeted message or waits for user input, as per business logic. |

You can also see more information on [error codes for targeted messages](targeted-messages.md#handle-errors).

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
