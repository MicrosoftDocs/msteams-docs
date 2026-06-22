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

Use agent response workflows when you want an agent to respond privately in a channel, group chat, or meeting chat first, then let the user decide whether that same response should be shared with everyone.
These workflows support three capabilities: targeted messaging for the private response, prompt preview to preserve the user’s original request in the reply, and suggested actions so the user can approve a public repost when needed.

- *Targeted messages* are private one-to-one exchanges between a user and an agent inside a group conversation, and they disappear from Teams clients after 24 hours to reduce clutter.
- *Prompt preview* lets the agent’s reply include the user’s original query in the same message.
- *Suggested actions* provide an easy approval step, such as Allow or Share to channel, so the user controls whether the response becomes public.

Each workflow option offers advantages based on your agent scenario. Choose response workflow based on:

| Workflow capability | How it works | How it helps |
| --- | --- | --- |
| Targeted messaging | It starts the exchange privately inside a shared conversation. | It helps keep sensitive or user-specific interactions private while cutting down on noise for everyone else. |
| Prompt preview | It shows the original user request together with the agent’s reply. | It keeps context, improves readability, and makes public reposts easier to understand. |
| Suggested actions | It lets the user approve, share, refine, or dismiss the response. | It helps to create an explicit consent step before private content becomes visible to the group. |

## Response workflow

Before you start, ensure your agent or app is enabled for targeted messaging in Teams and that your scenario runs in a channel, group chat, or meeting chat rather than a one-to-one chat. You should also determine whether agent replies remain private by default and only become public after explicit user approval. In such case, you must preserve the original targeted message ID so you can attach prompt preview data to the reply.

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

## Implement agent response workflows

Here's how to implement response workflows for Teams agents and apps.

### Prompt preview entity

To enable prompt preview, include the targeted message information in the reply activity. The reply uses the original targeted message ID so Teams can display the user’s original request above the response.

JSON example

```json


"entities": [{
  "type": "targetedMessageInfo",
  "messageId": "1772129782775"
}]
```

### Reactive and proactive agent responses

In reactive scenarios, when your bot replies directly to a targeted message by using reply-style SDK methods, the prompt preview metadata is typically attached automatically. In proactive scenarios, when you send outside the original turn, you must attach the targeted message information yourself before sending either a private or public response.

## Suggested actions

Suggested actions give users context-aware ideas for what to ask next based on the current response or conversation. Instead of fixed prompts, your agent or bot can use its LLM to generate up to three relevant suggestions with each response, surface them as selectable options, and use `Action.Submit` for slash-command suggestions that invoke server-side logic without posting a visible chat message.

Use Action.Submit for quick-action (suggested action) buttons that run server-side bot logic without posting a user-visible chat message. The button looks like any other suggested action, but when clicked it sends an invoke activity to your agent or bot, instead of a normal message activity. Include a structured name and value payload so you can route and dispatch based on the invoke name and pass contextual data through your existing invoke pipeline, that includes card invoke and handoff flows, without changing the conversation transcript.

For more information, see [Add link to Teams SDK suggested actions article].

Next, enable prompt preview in agent-to-user interactions.

### Prompt preview user experience

When an agent responds to a user, prompt preview shows the user’s initial slash command query within a single self-contained message. Use it to preserve context in ongoing conversations. Including the user’s prompt in the agent response is optional. When implemented, prompt preview always appears at the top of the agent response.

- **Private agent-to-user response**: The agent replies privately to the user's targeted message, so only the intended user can see the reply and the prompt preview.

  :::image type="content" source="../assets/images/agents-in-teams/agent-slash-commands/private-prompt-preview.png" alt-text="Image shows the prompt preview for private agent-to-user response.":::

- **Public agent-to-user response**: The agent sends a public resply to the user's request that includes the prompt preview. It's visible to everyone in the chat.

  :::image type="content" source="../assets/images/agents-in-teams/agent-slash-commands/public-prompt-preview.png" alt-text="Image shows the prompt preview for public agent-to-user response.":::

 A single agent response can include multiple prompt previews. However, it doesn't appear for normal messages.
