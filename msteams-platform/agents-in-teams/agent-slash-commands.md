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

# Enable slash commands for agents and apps

> [!NOTE]
>
> Support for slash commands is available in [public developer preview](../resources/dev-preview/developer-preview-intro.md).

Use slash commands in Teams as a clear, predictable way to interact with agents or apps with convenient text commands.

**Key points**

- [What is a slash command](#what-is-a-slash-command)
- **Slash commands developer experience**
  - [Supported scenarios for slash commands](#supported-scenarios-for-slash-commands)
  - [Manifest updates](#update-app-manifest-for-slash-commands)
  - [Handle slash commands](#handle-slash-commands)
  - [Response codes for slash commands](#response-codes-for-slash-commands)
<!--- [Why use slash commands](#why-use-slash-commands)
- [User experience for slash commands](#user-experience-for-slash-commands)
-->

## What is a slash command

Slash commands are text-based shortcuts in Teams that let users perform specific actions from the compose box in chats and meetings. When a user types a forward slash (`/`) in the compose box, Teams shows a menu of [available commands](https://support.microsoft.com/en-us/office/use-commands-in-microsoft-teams-88f61508-284d-417f-a53d-9e082164050b).

Teams agents designed to respond to specific named commands can be implemented as slash commands with optional parameters. Slash commands for agents are supported for mobile clients across platforms.

<!--
A slash command is a shortcut initiated by typing a forward slash (`/`) in the compose box on Teams, for example, `/contoso`. You can add it to your agent as a command, with optional parameters, to trigger specific actions. Teams shows a menu of available commands from built-in features and any installed agents or apps.

For more information, see [supported scenarios for slash commands](#supported-scenarios-for-slash-commands).

## User experience for slash commands
-->
When a user enters a slash command, it appears as a private message visible only to them. The agent can reply privately to a user or, when it's relevant, share the response with the whole group or channel. You can manage who sees responses using the agent logic.

:::image type="content" source="../assets/images/agents-in-teams/agent-slash-commands/agent-slash-commands.png" alt-text="Image shows the response flows for agent slash commands." border="false" lightbox="../assets/images/agents-in-teams/agent-slash-commands/agent-slash-commands.png":::

Your agent's implementation determines the action it takes in response to a slash command and how it replies, including whether that reply is sent privately as a targeted message or as a public message visible to the entire chat. Agent slash command activations are only ever visible to the user who sent them, so consider whether the agent's response should be a private message back to the user. See [best practices](#best-practices).

> [!NOTE]
>
> - Use public responses when visibility in the group or channel adds value.
> - The private message is removed after 24 hours. The user can't view or respond to the private message after that.

### Agent response and prompt preview visibility

Your agents can send a private or public response to a user's query. You can also choose to include prompt preview in agent responses. You can manage the visibility of agent responses to slash commands and prompt preview using the defined response flows:

# [Private agent-to-user response](#tab/private)

This flow keeps slash command results focused between the user and the agent. Use private response flow for drafts, summaries, personal tasks.

:::row:::
    :::column span="2":::
        1. The initial slash command shows up as a private message.
        1. If the agent responds privately, the reply appears only to the initiating user and quotes the user’s prompt. You can include an option for the user to share it publicly if they want.
    :::column-end:::
    :::column span="3":::
        :::image type="content" source="../assets/images/agents-in-teams/agent-slash-commands/agent-private-response.png" alt-text="Image shows an agent's private response to a user's slash command." border="false" lightbox="../assets/images/agents-in-teams/agent-slash-commands/agent-private-response.png":::
    :::column-end:::
:::row-end:::
:::row:::
    :::column span:::
        3. If the user chooses to allow, the agent posts a single message with its response along with the prompt preview.

      This flow minimizes noise in shared conversations to enable [private interactions with a single user](targeted-messages.md) that are fast and context aware. Additionally, use `Action.Submit` to add (suggested action) buttons that trigger server-side logic via an invoke activity without any user-visible chat message.

    :::column-end:::
:::row-end:::

Next, enable [private agent-to-user responses](#send-an-agent-response).

# [Public agent-to-user response](#tab/public)

When the response is useful to the wider audience, you can choose to enable your agent to show it publicly.

:::row:::
    :::column span="2":::
        1. When a user runs a slash command, it appears right away as a private message.
        1. If the agent is configured for relevant public replies, the response is posted to all members in the group or channel. See [best practices](#best-practices) for more guidelines.
        1. The agent responds with the prompt preview.
    :::column-end:::
    :::column span="3":::
        :::image type="content" source="../assets/images/agents-in-teams/agent-slash-commands/agent-public-response.png" alt-text="Image shows agent's public response." border="false" lightbox="../assets/images/agents-in-teams/agent-slash-commands/agent-public-response.png":::
    :::column-end:::
:::row-end:::
:::row:::
    :::column span:::
        This flow is useful for sharing status updates, confirmations, or other information meant for everyone in group or channel.
    :::column-end:::
:::row-end:::

Next, enable [public agent-to-user responses](#send-an-agent-response).

# [Prompt preview](#tab/preview)

When an agent responds to a user, prompt preview shows the user’s initial slash command query within a single self-contained message. Use it to preserve context in ongoing conversations. Including the user’s prompt in the agent response is optional. When implemented, prompt preview always appears at the top of the agent response.

- **Private agent-to-user response**: The agent replies privately to the user's targeted message, so only the intended user can see the reply.

  :::image type="content" source="../assets/images/agents-in-teams/agent-slash-commands/private-prompt-preview.png" alt-text="Image shows the prompt preview for private agent-to-user response.":::

- **Public agent-to-user response**: The agent sends a public reply to the user's message that is visible to everyone in the chat.

  :::image type="content" source="../assets/images/agents-in-teams/agent-slash-commands/public-prompt-preview.png" alt-text="Image shows the prompt preview for public agent-to-user response.":::

 A single agent response can include multiple prompt previews. However, it doesn't appear for normal messages.

---

<!--
## Why use slash commands

Slash commands make agents easier to use in shared chats. They let people run common actions with short commands and quickly see what’s available by typing `/`. Because the commands are clear and consistent, they reduce confusion and work within defined permissions. Your agent can also respond in a private one-turn conversation, which helps keep busy conversations less noisy.
-->

## Implement slash commands

Enabling slash commands typically involves the following:

- [Select one or more of the supported scenarios for enabling slash commands](#supported-scenarios-for-slash-commands): You can enable slash commands for your agents, bots, and message extension apps.
- [Update app manifest and declare supported commands](#update-app-manifest-for-slash-commands): You can opt for slash commands through the Teams app manifest. You can optionally declare commands in the app manifest to present users with a curated set of slash commands for triggering actions via <`/app-name`>.
- [Handle slash commands in your agent](#handle-slash-commands): Use Teams SDK or REST APIs to handle the user's request and to send the agent response.

### Supported scenarios for slash commands

You can enable slash commands for your agents in the following ways:

- **User-to-agent interaction**: Slash commands can initiate one-turn interaction with agent. In this model, the user enters a command (and optional text) in the compose box, and the response is delivered privately, making it ideal for drafting, lookups, and personal productivity tasks. For example:

  - `/contoso incident summarize the last 24 hours and suggest next steps`
  - `/contoso create-task fix login issue for mobile users`

  To [support natural-language prompts](#command-list), you must explicitly opt in so agents that want to support only fixed commands can do so without enabling free-form prompting.

- **App-defined slash commands**: Similar to using @mentions in the compose box, agents can publish a curated set of [slash commands](#command-list). Users can discover and run common actions without leaving the compose box. They can explicitly declare the commands your agent supports, and Teams shows them in the slash command picker when a user types `/`. For example:

  - `/help`
  - `/settings`

- **Message extension actions as slash commands**: You can [surface action-type message extensions as slash commands](#me). When a user selects the command from the `/` menu, Teams opens the associated modal (task module) or dialog so the user can complete the action with guided inputs, validation, and a consistent UI flow. For example, `/contoso create task` (opens a task creation dialog).

  > [!NOTE]
  > Search type message extensions aren’t exposed as slash commands. Users can access them through the message extension flyout instead.

### Update app manifest for slash commands

Update your [app manifest](/microsoft-365/extensibility/schema/root-compose-extensions-commands?view=m365-app-prev&tabs=syntax&preserve-view=true) to opt in to slash commands and (optionally) list the commands you want to show in the compose box. In the manifest, you must:

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

### Handle slash commands

You can enable the agent to send a private or a public message. You can also enable the agent to update or delete a message that it had previously sent.

#### Send an agent response

Use the following code snippets to enable your agent to respond to a slash command based on [supported scenarios](#supported-scenarios-for-slash-commands):

[WIP: Add link to Teams SDK docs]

# [Private message to a user](#tab/private)

Configure your agent to send a reply only to the person who ran the slash command or to another user in the group or channel. Use one of the following [private message scenarios](#agent-response-and-prompt-preview-visibility) to send a message to a single user.

- **Response to the same user**: Use one of the following code snippets for sending an agent response only to the user who triggered the slash command.

  # [C#](#tab/dotnet1)

  ```csharp
  
    teams.OnMessage(async (context, cancellationToken) => {
      if (context.Activity.Recipient?.IsTargeted == true){
        await context.Send(new MessageActivity("Reactive TM").WithRecipient(context.Activity.From, true), cancellationToken);
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
        await ctx.send(MessageActivityInput("Reactive TM").with_recipient(ctx.activity.from, is_targeted=True))
  ```

  # [HTTP](#tab/api1)

  [WIP: Add code snippet]
  
- **Response to a different user**: Use one of the following code snippets for sending an agent response to a different user in the group or channel.

  # [C#](#tab/dotnet1)

  ```csharp
    
  teams.OnMessage(async (context, cancellationToken) => {
    if (context.Activity.Recipient?.IsTargeted == true) {
      await context.Send(new MessageActivity("Reactive TM").WithRecipient(new Account {Id = "<userMRI>",Name = "<user Name>", Role = Role.User}, true), cancellationToken);
    }
    });
  ```

  # [TypeScript](#tab/ts1)

  ```typescript
    
  app.on('message', async ({ send, activity }) => {
    if(activity.Recipient.isTargeted) {
    send(new MessageActivity('Reactive TM').withRecipient(new Account {Id: <userMRI>, Name: <user Name>, Role: User}, isTargeted: true))
      }
  });
  ```

  # [Python](#tab/Py1)

  ```python
      
    @app.on_message
    async def handle_message(ctx):
      if getattr(ctx.activity.recipient, "is_targeted", False):
        await ctx.send(MessageActivityInput("Reactive TM").with_recipient(Account(id="<userMRI>", name="<user Name>", role=Role.USER), is_targeted=True))
  ```

  # [HTTP](#tab/api1)

  [WIP: Add code snippet]

# [Public response by the agent](#tab/public)

You can enable the agent to send for the [public response scenario](#agent-response-and-prompt-preview-visibility) in a group or a channel if:

- The message requires collaboration from all members.
- The broader visibility adds value.

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

You can enable [prompt preview](#agent-response-and-prompt-preview-visibility) using Teams SDK or REST APIs.

For using Teams SDK, follow the code snippet examples given in private message to user and public message by the agent.

<!--
- **Use Teams SDK**: Prompt preview is supported for agent's response to user in the following scenarios:

  - Reactive response: When an agent responds within the context of an incoming user interaction (for example, using `send()` or `reply()`):

    - The SDK automatically attaches the `targetedMessageInfo` entity.
    - No additional code is required from the developer.

      Prompt Preview is rendered automatically using the original message context

  - Proactive response: When an agent sends a proactive message, for example, follow-ups, delayed responses, or background workflows:
  
    - The developer must manually attach the entity.
    - The `messageId` of the original user message must be provided.

- **Use REST APIs**: Prompt preview is supported when sending agent responses through the following APIs:

  - **Private agent-to-user response**: The agent replies privately to the user’s message. The response is visible only to the targeted user.

  - **Public agent-to-user response**: The agent replies in the conversation normally. The response is visible to all participants in the chat.

  In both cases, you can implement the prompt preview experience through the same mechanism. It's independent of the visibility scope.
-->
<!--
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
---
-->

  ```http
  POST {cloud}/v3/conversations/{conversationId}/activities?isTargetedActivity=true
  Authorization: Bearer eyJhbGciOiJIUzI1Ni...
  Content-Type: application/json
  {
      "type": "message",
      "from": {
          "id": "28:c9e...",
          "name": "Contoso"
      },
      "conversation": {
          "id":"x:17I0...",
          "name": "Convo1"
      },
      "recipient": {
          "id": "29:1XJ...",
          "name": "Megan Bowen"
      },    
      "text": "My bot's reply",
  "entities": [
      {
        "type": "targetedMessageInfo",
        "messageId": "1772129782775"
      }
    ]
  }
  ```

  ---

#### Update an agent response

The agent can edit its original message, if needed. The updated message appears only in the intended user’s view.

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
                    ctx.activity.from,
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

Use the following code snippet to enable the agent to delete its response:

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

Ensure to handle these errors appropriately in your agent. The following table lists error codes, error descriptions, and developer actions for Teams SDK:

| Status code | Error code | Description | Developer action |
| --- | --- | --- | --- | --- |
| 400 | `INVALID_TARGETED_MESSAGE_ID` | The message ID used for the prompt preview is invalid. | Ensure that the message ID for the targeted message is correct. |
| 404 | `TARGETED_MESSAGE_EXPIRED_OR_DELETED` | The message ID associated with the prompt preview in the agent response could not be found in the conversation. The message is unavailable as it was deleted or auto removed after 24 hours. | Ensure the agent either sends a new targeted message or waits for user input, as per business logic. |

You can also see more information on [error codes for targeted messages](targeted-messages.md#handle-errors).

## Code sample

[WIP: Add details and link to the code sample.]

## Best practices

- Keep slash commands short and action-oriented.
- Use slash commands for private or quick actions, and @mentions for richer conversations.
- Avoid turning long prompt suggestions into slash commands. Keep them lightweight.
- Provide clear command descriptions to improve discoverability.
- Add aliases for high-traffic commands where appropriate.
- When a user chooses to share a private agent response with the group or channel, it's recommended that the agent must [delete the initial response](#delete-an-agent-response) and then re-share the response publicly.
- Use prompt preview to maintain context in ongoing conversations.

## See also

- [Enable targeted messages](targeted-messages.md)
- Teams SDK docs [WIP: Add link]
