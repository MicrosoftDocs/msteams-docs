---
title: Agent Response Workflows
description: Learn how to use targeted messaging, prompt preview, and suggested actions into Teams agent experience
ms.localizationpriority: high
ms.date: 06/18/2026
ms.topic: article
---

<!-- markdownlint-disable MD023 -->
<!-- markdownlint-disable MD001 -->
<!-- markdownlint-disable MD024 -->

# Support for agent response workflows

Use agent response workflows when your agent should answer a user privately in a channel, group chat, or meeting chat first, then let that user decide whether to share the same response with everyone. This article explains the three core capabilities involved in that flow—targeted messaging, prompt preview, and suggested actions—and shows how they work together in private and public responses.

- *Targeted messaging* lets an agent send a one-to-one reply to the requesting user from within a shared conversation such as a channel, group chat, or meeting chat. Use it when the reply should stay private until the user decides whether to share it more broadly.
- *Prompt preview* lets the agent’s reply include the user’s original query in the same message.
- *Suggested actions* provide an easy approval step, such as Allow or Share to channel, so the user controls whether the response becomes public.

Choose this workflow when your scenario needs all three of the following behaviors: the first response must stay private to the requesting user, the original prompt must remain visible with the response, and the user must explicitly approve any repost to the broader conversation. The following capabilities combine to enable that experience:

| Workflow capability | How it works | How it helps |
| --- | --- | --- |
| Targeted messaging | It starts the exchange privately inside a shared conversation. | It helps keep sensitive or user-specific interactions private while cutting down on noise for everyone else. |
| Prompt preview | It shows the original user request together with the agent’s reply. | It keeps context, improves readability, and makes public reposts easier to understand. |
| Suggested actions | It lets the user approve, share, refine, or dismiss the response. | It helps to create an explicit consent step before private content becomes visible to the group. |

## End-to-end response workflow

Before you implement this workflow, confirm that your app supports targeted messaging in Teams and that the scenario runs in a channel, group chat, or meeting chat. If you want the response to remain private until the user approves sharing it, store the original targeted message ID because you need it later to attach prompt preview metadata to the private or public reply.

This workflow progresses as follows:

1. Receive the user’s request as a targeted message:

    When a user sends a slash command or otherwise invokes the agent uing @mention in a shared conversation, capture the interaction as a targeted message. This keeps the request visible only to the user and the agent while still preserving the group context. It is the right starting point when the question or output could be distracting, sensitive, or not yet ready for broad sharing.

1. Send the first agent reply privately:

    Reply to the targeted message with a private response so only the requesting user can see it. This is the default response workflow for the Teams agent.

1. Add prompt preview to preserve context:

    Include prompt preview in the private reply so the original user request appears at the top of the agent’s response. This creates a single message that shows both the prompt and the answer together, which makes review easier and helps when the same content is later promoted to a public reply. In reactive scenarios, SDK methods that reply directly to a targeted message can attach the prompt preview information automatically. In proactive scenarios, you must attach it manually by using the original targeted message ID.

1. Offer suggested actions for user approval:

    Add suggested actions at the bottom of the private reply to help the user decide what happens next. For this workflow, the most common buttons are Allow, Share to channel, Edit prompt, or Dismiss. Suggested actions are useful because they reduce typing, guide the next step, and disappear after selection so the interaction stays clean.

1. Repost agent response publicly only after approval:

    If the user selects the approval action, your app receives that choice and can repost the content publicly in the same conversation. The public message can include the same response body and the same prompt preview so everyone sees both the original request and the approved answer together. If the user does not approve, keep the exchange private and do not publish the content to the conversation.

## Agent response workflows

To learn more about targeted messaging behavor in Teams, see [send and receive targeted messages in group conversations](targeted-messages.md).

Here's how to implement prompt preview workflows for Teams agents and apps.

### Prompt preview entity JSON example

To enable prompt preview, include a `targetedMessageInfo` entity in the reply activity and set its `messageId` value to the original targeted message ID. Teams uses that entity to render the user's original request above the agent response.

The following example shows the entities array required to enable prompt preview on a reply activity.

```json


"entities": [{
  "type": "targetedMessageInfo",
  "messageId": "xxxxxxxxxxxxx"
}]
```

In *reactive* scenarios, reply-style SDK methods usually attach the `targetedMessageInfo` entity automatically because the response is still tied to the incoming user interaction. In *proactive* scenarios, the response is sent outside that original turn, so you must add the `targetedMessageInfo` entity yourself before sending the private or public message.

The following examples show how to add prompt preview in SDK-based and REST-based responses.

### Prompt preview user experience

Prompt preview can appear in both private and public agent responses, but the implementation mechanism is the same in both cases: the agent includes targetedMessageInfo that references the original targeted message. The difference is only who can see the reply after it is sent:

- **Private agent-to-user response**: The agent replies privately to the user's targeted message, so only the intended user can see the reply and the prompt preview.

  :::image type="content" source="../assets/images/agents-in-teams/agent-slash-commands/private-prompt-preview.png" alt-text="Image shows the prompt preview for private agent-to-user response.":::

- **Public agent-to-user response**: The agent sends a public resply to the user's request that includes the prompt preview. It's visible to everyone in the chat.

  :::image type="content" source="../assets/images/agents-in-teams/agent-slash-commands/public-prompt-preview.png" alt-text="Image shows the prompt preview for public agent-to-user response.":::

 A single agent response can include multiple prompt previews. However, it doesn't appear for normal messages.

The following examples show private and public responses with prompt preview in C#, TypeScript, Python, and HTTP.

## Implement prompt preview

Use the Teams SDK when the agent responds within an incoming interaction or sends a follow-up outside that turn. For reactive replies, the SDK usually attaches targetedMessageInfo automatically. For proactive replies, add the entity yourself and set the original targeted message ID before you send the activity. When you use REST APIs, prompt preview works the same way for both private and public replies: include the targetedMessageInfo entity in the activity and use the original targeted message ID.

Visibility is controlled by how you send the response, not by a different prompt preview mechanism.

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

## Suggested actions

Suggested actions give users context-aware ideas for what to ask next based on the current response or conversation. In this workflow, use suggested actions to let the user decide what happens after the private reply. Common actions include sharing the response to the conversation, refining the prompt, or dismissing the result. If your implementation uses `Action.Submit`, send a structured payload so your app can handle the user's choice without posting a visible user message.

Use `Action.Submit` for quick-action (suggested action) buttons that run server-side bot logic without posting a user-visible chat message. The button looks like any other suggested action, but when clicked it sends an invoke activity to your agent or bot, instead of a normal message activity. Include a structured name and value payload so you can route and dispatch based on the invoke name and pass contextual data through your existing invoke pipeline, that includes card invoke and handoff flows, without changing the conversation transcript.

For implementation details and payload requirements, see the suggested actions documentation for Teams messaging extensions and bots. [WIP: Add link to Teams SDK suggested actions article].

## Implement prompt preview in a targeted message

Use this workflow when your agent should reply privately first, keep the original user prompt visible with the response, and allow the user to decide whether to share the response publicly.

1. Capture the user request as a targeted message

    Start when a user invokes the agent in a channel, group chat, or meeting chat. The user can initiate the interaction using a slash command or an @mention message. Capture that request as a targeted message so the interaction begins privately between the user and the agent by using `IsTargeted == true` in the message event.

    This is the right pattern when the request may be sensitive, distracting, or not yet ready to share broadly.

1. Store the original targeted message ID

    Save the original targeted message ID as soon as the request is received. You need this ID later to enable prompt preview, because the reply must include a `targetedMessageInfo` entity whose `messageId` points to the original targeted message.

1. Send the first reply privately

    Reply to the requesting user with a targeted private message so only that user can see it.

    **C# example**

    ```C#
    app.OnMessage(async (context, cancellationToken) =>
    {
    await context.Send(
    new MessageActivity("This message is only visible to you!")
    .WithRecipient(context.Activity.From, isTargeted: true),
    cancellationToken
    );
    });
    ```

    This keeps the conversation private while preserving the context of the shared space.

1. Attach prompt preview metadata

    To enable prompt preview, include a targetedMessageInfo entity in the outgoing reply and set its messageId to the original targeted message ID.

    **JSON example**

    ```JSON
    "entities": [{
    "type": "targetedMessageInfo",
    "messageId": "xxxxxxxxxxxxx"
    }]
    ```

    Teams uses this entity to display the user’s original request above the agent’s response.

1. Handle reactive and proactive replies correctly
1. Implement prompt preview in proactive targeted replies
1. Support the same pattern with REST APIs
1. Add suggested actions for approval
1. Repost publicly only after explicit user approval
