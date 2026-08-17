---
title: Agent best practices and features checklist
description: Agent best practices for Microsoft Teams cover the features every agent should implement, from conversational context to citations. Review the checklist and build a great experience.
ms.localizationpriority: medium
ms.topic: overview
ms.date: 08/17/2026
author: nickwalkmsft
ms.author: nickwalk
ms.reviewer: nickwalk
---

# Agent best practices and features checklist

This article provides a list of best practices and features that developers should consider implementing in all Teams agents.

These practices and features represent standard user expectations for agents in Teams and are broadly applicable. Agents that omit any of them should have a strong reason for doing so. Review each item to ensure your agent provides a great experience in Teams.

## Message streaming and thinking indicator

Like many LLM chat experiences, Teams agents can [stream messages](../../streaming-ux.md) in 1:1 conversations to maximize responsiveness. Before streaming begins, Teams can also display a customizable, updateable *thinking indicator* to indicate liveness and provide insight about how the message is being generated. Streaming and thinking indicators are supported in one-on-one chats.

:::image type="content" source="../../../assets/images/bots/ai-streaming-ux.gif" alt-text="Animated screen capture depicting an agent's thinking indicator status updates, followed by message content being streamed as it is generated":::

## Prompt starters

[Prompt starters](../conversations/prompt-suggestions.md#prompt-starters-1) are prewritten prompts that help users understand an agent's capabilities and quickly begin interacting with it. Prompt starters are conveniently accessible and discoverable in all chat scenarios. In one-on-one chats, they are displayed prominently before the conversation starts for agents that do not send a welcome message.

:::image type="content" source="../../../assets/images/bots/ai-zero-prompts.png" alt-text="Image shows an example of prompt starters.":::

## Welcome messages

Agents can proactively send [welcome messages](../../../graph-api/proactive-bots-and-messages/send-personal-welcome-message.md) when users add them to a conversation or install them as a personal app with one-on-one chat capabilities. Agents should use welcome messages to explain the value they provide, present configuration instructions, offer example prompts, and describe any commands they expose.

Agents distributed through the Teams Store that users can install in personal scope (one-on-one conversations) must implement welcome messages, prompt starters, or both.

## Named commands

Agents that provide command-style functionality can make it discoverable with [named commands](../../../agents-in-teams/agent-slash-commands.md). An agent's named commands are discoverable and invokable through Teams' slash command and @mention autocomplete menus in chat.

## Suggested actions

[Suggested actions](../conversations/suggested-actions.md) are buttons on agent messages that enable users to quickly respond or take action. Unlike prompt starters and command names, agents can dynamically generate and attach suggested actions with each message they send, guiding users through workflows with context-aware options or intelligently suggesting next steps.

:::image type="content" source="~/assets/images/Cards/suggested-actions.png" alt-text="Bot suggested actions." border="false" lightbox="~/assets/images/Cards/suggested-actions.png":::

Suggested actions are key to enabling efficient and satisfying *human in the loop* workflows, where an agent requests user approval or confirmation before taking action, but are useful in any scenario that benefits from quick user interaction. They can be configured to send a command-style chat response to the agent, silently invoke an agent behavior without a chat message, or insert a pre-constructed message into the user's compose box.

## AI content labels

Teams' [indicator for AI-generated messages](../bot-messages-ai-generated-content.md#ai-label) should always be used when applicable. Correct usage of the AI indicator is a policy requirement for agents distributed through the Teams Store.

:::image type="content" source="../../../assets/images/bots/ai-labels-1.png" alt-text="Image shows an example of AI label for AI-generated message.":::

[Sensitivity labels](../bot-messages-ai-generated-content.md#sensitivity-label) indicate messages that might contain confidential information, or links to resources only accessible to certain individuals.

:::image type="content" source="../../../assets/images/bots/ai-labels-2.png" alt-text="Image shows an example of AI label for a confidential message." border="false":::

[Citations](../bot-messages-ai-generated-content.md#citations) provide a standard way to surface and link any data sources used to generate a message.

:::image type="content" source="../../../assets/images/bots/ai-bot-inline-citation.png" alt-text="Image shows an example of citations in agents." border="false":::

## User feedback

Agents can attach standardized [feedback controls](../bot-messages-ai-generated-content.md#feedback-buttons) to their messages. Users can like or dislike messages and optionally provide detailed feedback.

# [Desktop](#tab/desktop)

:::image type="content" source="../../../assets/images/bots/bot-feedback-buttons.png" border="false" alt-text="Screenshot shows the feedback buttons in a bot in the Teams desktop client.":::

:::image type="content" source="../../../assets/images/bots/bot-feedback-form.png" border="false" alt-text="Screenshot shows the default feedback form in a bot in the Teams desktop client.":::

# [Mobile](#tab/mobile)

:::image type="content" source="../../../assets/images/bots/feedback-buttons-mobile.png" border="false" alt-text="Screenshot shows the feedback buttons in a bot in the Teams mobile client." lightbox="../../assets/images/bots/feedback-buttons-mobile.png":::

:::image type="content" source="../../../assets/images/bots/feedback-form-mobile.png" border="false" alt-text="Screenshot shows the default feedback form in a bot in the Teams desktop client." lightbox="../../assets/images/bots/feedback-form-mobile.png":::
