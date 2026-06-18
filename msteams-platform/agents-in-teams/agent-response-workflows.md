---
title: Agent Response Workflows
description: Learn how to use targeted messaging, prompt preview, and suggested actions into Teams agent experience
ms.localizationpriority: high
ms.date: 06/18/2026
ms.topic: article
zone_pivot_groups: select-language
---

<!-- markdownlint-disable MD023 -->
<!-- markdownlint-disable MD001 -->
<!-- markdownlint-disable MD024 -->

# Support for agent response workflows

Use agent response workflows when you want an agent to respond privately in a channel, group chat, or meeting chat first, then let the user decide whether that same response should be shared with everyone.
These workflows support three capabilities: targeted messaging for the private response, prompt preview to preserve the user’s original request in the reply, and suggested actions so the user can approve a public repost when needed.

- Targeted messages are private one-to-one exchanges between a user and an agent inside a group conversation, and they disappear from Teams clients after 24 hours to reduce clutter.
- Prompt preview lets the agent’s reply include the user’s original query in the same message.
- Suggested actions provide an easy approval step, such as Allow or Share to channel, so the user controls whether the response becomes public.

## Response workflow

Before you start, ensure your agent or app is enabled for targeted messaging in Teams and that your scenario runs in a channel, group chat, or meeting chat rather than a one-to-one chat. You should also determine whether agent replies remain private by default and only become public after explicit user approval. In such case, you must preserve the original targeted message ID so you can attach prompt preview data to the reply.

This workflow progresses as follows:

1. Receive the user’s request as a targeted message
1. Send the first agent reply privately
1. Add prompt preview to preserve context
1. Offer suggested actions for user approval
1. Repost agent response publicly only after approval
