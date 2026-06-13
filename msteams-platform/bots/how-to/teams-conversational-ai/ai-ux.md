---
title: Agent best practices and features checklist
description: TODO Learn about the user experience for agents in Teams
ms.localizationpriority: medium
ms.topic: overview
ms.date: 06/10/2026
---

# Agent best practices and features checklist

This article provides a list of best practices and conversational features that developers should consider implementing in all Teams agents.

These practices and features represent standard user expectations for agents in Teams and are broadly applicable; agents that omit any of them should have a strong reason for doing so. Review each item to ensure your agent provides a great experience in Teams.

TODO "Some of these may be required" need to square what's here with actual requirements as they are written in the Teams Store validation guidelines article and the Copilot [validation guidelines for agents](../../../concepts/deploy-and-publish/appsource/prepare/review-copilot-validation-guidelines.md). Those may need updates too.

TODO targeted messages, sessions, reply in threads, full channel awareness. These all seem like they could go under one "conversational intelligence" header.

TODO reactions

## Context management and conversational intelligence

> [!IMPORTANT]
> **MAJOR TODO and input needed**, extending to all the platform docs and not just this article: what actual developer guidance and facilities do we offer for this that we can link to? I haven't modified the contents here yet... "Use Teams SDK to ensure intelligent context-based conversation", but what does Teams SDK and our docs offer in that direction? "Ensure the agent is aware of the platform on which the conversation is ongoing, such as on Teams" - but we don't give any guidance on how to derive any meaningful benefit from doing that.
>
> TODO: To what extent is this actually a requirement? Do we expect/require all agents to receive and track all messages?

TODO should also have stuff here about collaboration in group contexts

TODO this is a good place to differentiate *agent* from *bot* (LLM) and link to the app model, overview or wherever we end up defining that. "Conversational intelligence is what differentiates agents from bots".

An agent must track a conversation's context and history to provide an intelligent interaction. The agent must meet the user's expectation by being aware of the conversation's context and allowing them to refer to previous messages and responses.

Use Teams SDK to ensure intelligent context-based conversation and to manage and pass conversational history and context to the LLM. Teams SDK enables you to:

- **Manage context and conversation history**: Ensure that the agent can track the context and conversation history.
- **Identify conversation location**: Ensure the agent is aware of the platform on which the conversation is ongoing, such as on Teams, copilot.com, in a meeting side panel, or a group chat.
- **Store and pass conversation history**: Determine the means of storage and pass some of the conversation history to the agent.
- **Understand user references**: Ensure that when a user sends a message, the agent must understand what the user is referring to. You can build this understanding in the agent using LLM and the recent conversation history. The agent mustn't need the user to reestablish context with every message.

TODO we could have a section or subsection here for proactive messaging: "Agents aren't limited to request-response workflows, and can proactively message users for notifications, scheduled tasks, or just to offer help when intelligently monitoring the conversation".  Could put welcome messages alongside that too.

## AI-generated indicator

TODO AI label, citations, feedback buttons, and sensitivity label all link to the same article, which looks a little similar to this, but is scoped to just those features and includes implementation inforamation. Might want to group them together in one place, and maybe a little lower down.

Agents in Teams can display a built-in [indicator on AI-generated messages](../bot-messages-ai-generated-content.md#ai-label) that should always be used when applicable. Correct usage of the AI indicator is a policy requirement for agents distributed through the Teams Store.

:::image type="content" source="../../../assets/images/bots/ai-labels-1.png" alt-text="Image shows an example of AI label for AI-generated message.":::

## Message streaming and thinking indicator

Like many LLM chat experiences, Teams agents can [stream messages](../../streaming-ux.md) to maximize responsiveness. Before streaming begins, Teams can also display a customizable, updateable *thinking indicator* to indicate liveness and provide insight about how the message is being generated. Streaming and thinking indicators are supported in one-on-one chats.

:::image type="content" source="../../../assets/images/bots/ai-streaming-ux.gif" alt-text="Animated screen capture depicting an agent's thinking indicator status updates, followed by message content being streamed as it is generated":::

## Adaptive cards

TODO

## Prompt starters

[Prompt starters](../conversations/prompt-suggestions.md#prompt-starters-1) are prewritten prompts that help users understand an agent's capabilities and quickly begin interacting with it. Prompt starters are conveniently accessible and discoverable in all chat scenarios. In one-on-one chats, they are displayed prominently before the conversation starts for agents that do not send a welcome message.

:::image type="content" source="../../../assets/images/bots/ai-zero-prompts.png" alt-text="Image shows an example of prompt starters.":::

## Welcome messages

Agents can proactively send welcome messages when users add them to a conversation or install them as a personal app with one-on-one chat capabilities. Agents should use welcome messages to explain the value they provide, present configuration instructions, offer example prompts, and describe any commands they expose.

TODO screenshot

Agents distributed through the Teams Store that users can install in personal scope (one-on-one conversations) must implement welcome messages, prompt starters, or both. TODO move this to prompt starters if that goes later.

## Named commands

Agents that provide command-style functionality can make it discoverable with [named commands](../../../agents-in-teams/agent-slash-commands.md). An agent's named commands are discoverable and invokable through Teams' slash command and @mention autocomplete menus in chat.

TODO maybe a short statement about slash vs atmention, private vs. public

TODO screenshot

## Suggested actions

[Suggested actions](../conversations/prompt-suggestions.md#suggested-actions-1) are buttons on agent messages that enable users to quickly respond or take action. Unlike prompt starters and command names, agents can dynamically generate and attach suggested actions with each message they send, guiding users through workflows with context-aware options or intelligently suggesting next steps.

TODO screenshots

Suggested actions are key to enabling efficient and satisfying *human in the loop* workflows, where an agent requests user approval or confirmation before taking action, but are useful in any scenario that benefits from quick user interaction. They can be configured to send a command-style chat response to the agent, silently invoke an agent behavior without a chat message, or insert a pre-constructed message into the user's compose box.

## Sensitivity labels

[Sensitivity labels](../bot-messages-ai-generated-content.md#sensitivity-label) indicate messages that might contain confidential information, or links to resources only accessible to certain individuals.

:::image type="content" source="../../../assets/images/bots/ai-labels-2.png" alt-text="Image shows an example of AI label for a confidential message." border="false":::

## Citations

[Citations](../bot-messages-ai-generated-content.md#citations) provide a standard way to surface and link any data sources used to generate a message.

:::image type="content" source="../../../assets/images/bots/ai-bot-inline-citation.png" alt-text="Image shows an example of citations in agents." border="false":::

## User feedback

Agents can attache standardized [feedback controls](../bot-messages-ai-generated-content.md#feedback-buttons) to their messages. Users can like or dislike messages and optionally provide detailed feedback.

# [Desktop](#tab/desktop)

:::image type="content" source="../../../assets/images/bots/bot-feedback-buttons.png" border="false" alt-text="Screenshot shows the feedback buttons in a bot in the Teams desktop client.":::

:::image type="content" source="../../../assets/images/bots/bot-feedback-form.png" border="false" alt-text="Screenshot shows the default feedback form in a bot in the Teams desktop client.":::

# [Mobile](#tab/mobile)

:::image type="content" source="../../../assets/images/bots/feedback-buttons-mobile.png" border="false" alt-text="Screenshot shows the feedback buttons in a bot in the Teams mobile client." lightbox="../../assets/images/bots/feedback-buttons-mobile.png":::

:::image type="content" source="../../../assets/images/bots/feedback-form-mobile.png" border="false" alt-text="Screenshot shows the default feedback form in a bot in the Teams desktop client." lightbox="../../assets/images/bots/feedback-form-mobile.png":::

---

### App profile card

TODO

Add hovercard experience for all agents and bots. Hovercards provide valuable and relevant information to educate users about the app and its features.

:::image type="content" source="../../../assets/images/bots/contoso-app-profile-card.png" alt-text="Image shows app profile card." border="false" lightbox="../../../assets/images/bots/contoso-app-profile-card.png":::

To enable the app profile card for your agents or bots, add the `features` field under the `description` field in the app manifest. For more information, see [app manifest schema description object](/microsoft-365/extensibility/schema/root-description).

## Next steps
