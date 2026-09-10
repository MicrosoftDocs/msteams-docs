---
title: Best Practices and Features Checklist for Teams Agents
description: Agent best practices for Microsoft Teams cover the features every agent should implement, from conversational context to citations. Review the checklist and build a great experience.
ms.localizationpriority: medium
ms.topic: overview
ms.date: 08/17/2026
author: nickwalkmsft
ms.author: nickwalk
ms.reviewer: nickwalk
---

# Best practices and features checklist for Teams agents

This article provides a list of best practices and features that developers should consider when implementing Teams agents.

These practices and features represent standard user expectations for agents in Teams and are broadly applicable. Agents that omit any of them should have a strong reason for doing so. Review each item to ensure your agent provides a great experience in Teams.

## Message streaming and thinking indicators

Like many LLM chat experiences, Teams agents can [stream messages](../../streaming-ux.md) in one-on-one conversations to maximize responsiveness. Before streaming begins, Teams can also display a customizable, updatable *thinking indicator* to indicate liveness and provide insight into how the message is being generated.

:::image type="content" source="../../../assets/images/bots/ai-streaming-ux.gif" alt-text="Animated screen capture depicting an agent's thinking indicator status updates, followed by message content being streamed as it is generated":::

## Targeted messaging

[Targeted messaging](../../../agents-in-teams/targeted-messages.md) enables agents to privately interact with users in group conversations.

An agent's ability to receive targeted messages must be enabled in its app manifest configuration, but should be considered a standard feature of Teams agents. Users will expect agents in group conversations to use targeted messaging to enable context-sensitive actions while maintaining privacy and keeping conversations focused. Agents should always consider the visibility of messages they receive and use it to inform response generation, response visibility, and context tracking behavior.

## Emoji reactions

[Reactions](../../../agents-in-teams/agent-reactions.md) are lightweight emoji markers that all participants in a conversation, including agents, can attach to chat messages. Agents can use reactions to communicate acknowledgement or status without creating additional noise in a conversation.

# [Desktop](#tab/desktop)

:::image type="content" source="../../../assets/images/agents-in-teams/teams-reactions/agent-reactions-desktop.png" alt-text="Image shows agent reactions in Teams desktop client." border="false" lightbox="../../../assets/images/agents-in-teams/teams-reactions/agent-reactions-desktop.png":::

# [Mobile](#tab/mobile)

:::image type="content" source="../../../assets/images/agents-in-teams/teams-reactions/agent-reactions-mobile.png" alt-text="Image shows agent reactions in the mobile client." border="false" lightbox="../../../assets/images/agents-in-teams/teams-reactions/agent-reactions-mobile.png":::

---

## Prompt starters

[Prompt starters](../conversations/prompt-starters.md) are prewritten prompts that help users understand an agent's capabilities and quickly begin interacting with it. Prompt starters are conveniently accessible and discoverable in all chat scenarios. In one-on-one chats, they are displayed prominently before the conversation starts for agents that do not send a welcome message.

:::image type="content" source="../../../assets/images/bots/ai-zero-prompts.png" alt-text="Image shows an example of prompt starters.":::

## Welcome messages

Agents can proactively send [welcome messages](../../../graph-api/proactive-bots-and-messages/send-personal-welcome-message.md) when users add them to a conversation or install them as a personal app with one-on-one chat capabilities. Agents should use welcome messages to explain the value they provide, present configuration instructions, offer example prompts, and describe any commands they expose.

Agents distributed through the Teams Store and enabled for personal scope (one-on-one conversations) must implement welcome messages, prompt starters, or both.

## Agent slash commands

Agents that provide command-style functionality can make it discoverable and easily usable with [agent slash commands](../../../agents-in-teams/agent-slash-commands.md). An agent's commands are discoverable and invokable through Teams' slash command and @mention autocomplete menus in chat.

## Suggested actions

[Suggested actions](../conversations/suggested-actions.md) are buttons on agent messages that enable users to quickly respond or take action. Unlike prompt starters and command names, agents can dynamically generate and attach suggested actions with each message they send, guiding users through workflows with context-aware options or intelligently suggesting next steps.

:::image type="content" source="~/assets/images/Cards/suggested-actions.png" alt-text="Bot suggested actions." border="false" lightbox="~/assets/images/Cards/suggested-actions.png":::

Suggested actions are key to enabling efficient and satisfying *human-in-the-loop* workflows, where an agent requests user approval or confirmation before taking action, but are useful in any scenario that benefits from quick user interaction. They can be configured to send a command-style chat response to the agent, silently invoke an agent behavior without a chat message, or insert a pre-constructed message into the user's compose box.

## AI content labels

Teams' [indicator for AI-generated messages](../bot-messages-ai-generated-content.md#ai-label) should always be used when applicable. Correct usage of the AI indicator is a policy requirement for agents distributed through the Teams Store.

:::image type="content" source="../../../assets/images/bots/ai-labels-1.png" alt-text="Image shows an example of AI label for AI-generated message.":::

[Sensitivity labels](../bot-messages-ai-generated-content.md#sensitivity-label) indicate messages that might contain confidential information, or links to resources only accessible to certain individuals.

:::image type="content" source="../../../assets/images/bots/ai-labels-2.png" alt-text="Image shows an example of AI label for a confidential message." border="false":::

[Citations](../bot-messages-ai-generated-content.md#citations) provide a standard way to surface and link any data sources used to generate a message.

:::image type="content" source="../../../assets/images/bots/ai-bot-inline-citation.png" alt-text="Image shows an example of citations in agents." border="false":::

## User feedback controls

Agents can attach standardized [feedback controls](../bot-messages-ai-generated-content.md#feedback-buttons) to their messages. Users can like or dislike messages and optionally provide detailed feedback.

# [Desktop](#tab/desktop)

:::image type="content" source="../../../assets/images/bots/bot-feedback-buttons.png" border="false" alt-text="Screenshot shows the feedback buttons in a bot in the Teams desktop client.":::

:::image type="content" source="../../../assets/images/bots/bot-feedback-form.png" border="false" alt-text="Screenshot shows the default feedback form in a bot in the Teams desktop client.":::

# [Mobile](#tab/mobile)

:::image type="content" source="../../../assets/images/bots/feedback-buttons-mobile.png" border="false" alt-text="Screenshot shows the feedback buttons in a bot in the Teams mobile client." lightbox="../../../assets/images/bots/feedback-buttons-mobile.png":::

:::image type="content" source="../../../assets/images/bots/feedback-form-mobile.png" border="false" alt-text="Screenshot shows the default feedback form in a bot in the Teams mobile client." lightbox="../../../assets/images/bots/feedback-form-mobile.png":::
