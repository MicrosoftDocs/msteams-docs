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

# Support for prompt preview for targeted messages

Use the Teams SDK when the agent responds within an incoming interaction or sends a follow-up outside that turn. For reactive replies, the SDK usually attaches `targetedMessageInfo` automatically. For proactive replies, add the entity yourself and set the original targeted message ID before you send the activity. When you use REST APIs, prompt preview works the same way for both private and public replies. Include the `targetedMessageInfo` entity in the activity and use the original targeted message ID.

Visibility is controlled by how you send the response, not by a different prompt preview mechanism.

### Prompt preview user experience

Prompt preview can appear in both private and public agent responses, but the implementation mechanism is the same in both cases: the agent includes `targetedMessageInfo` that references the original targeted message. The difference is only who can see the reply after it is sent:

- **Private agent-to-user response**: The agent replies privately to the user's targeted message, so only the intended user can see the reply and the prompt preview.

  :::image type="content" source="../assets/images/agents-in-teams/agent-slash-commands/private-prompt-preview.png" alt-text="Image shows the prompt preview for private agent-to-user response.":::

- **Public agent-to-user response**: The agent sends a public resply to the user's request that includes the prompt preview. It's visible to everyone in the chat.

  :::image type="content" source="../assets/images/agents-in-teams/agent-slash-commands/public-prompt-preview.png" alt-text="Image shows the prompt preview for public agent-to-user response.":::

 A single agent response can include multiple prompt previews. However, it doesn't appear for normal messages.

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
