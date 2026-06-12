---
title: TODO Best practices for building agent in Teams user experience
description: TODO Learn about the user experience for agents in Teams
ms.localizationpriority: medium
ms.topic: overview
ms.date: 06/10/2026
---

# Agent features checklist

This article provides a comprehensive list of conversational features and expectations for Teams agents. Most of these items represent general best practices that apply to almost any agent. Review each one to ensure your agent provides a great experience in Teams and meets user expectations.

TODO need to square what's here with actual requirements as they are written in the Teams Store validation guidelines article and the Copilot [validation guidelines for agents](../../../concepts/deploy-and-publish/appsource/prepare/review-copilot-validation-guidelines.md). Those may need updates too.

TODO we should be clearer here that by "agent", we specifically mean an LLM-backed bot. Can link to some of the new content under development about the app model.

## Context management and conversational intelligence (required)

> [!IMPORTANT]
> **MAJOR TODO and input needed**, extending to all the platform docs and not just this article: what actual developer guidance and facilities do we offer for this that we can link to? I haven't modified the contents here yet... "Use Teams SDK to ensure intelligent context-based conversation", but what does Teams SDK and our docs offer in that direction? "Ensure the agent is aware of the platform on which the conversation is ongoing, such as on Teams" - but we don't give any guidance on how to derive any meaningful benefit from doing that.
>
> TODO: To what extent is this actually a requirement? Do we expect/require all agents to receive and track all messages?

An agent must track a conversation's context and history to provide an intelligent interaction. The agent must meet the user's expectation by being aware of the conversation's context and allowing them to refer to previous messages and responses.

Use Teams SDK to ensure intelligent context-based conversation and to manage and pass conversational history and context to the LLM. Teams SDK enables you to:

- **Manage context and conversation history**: Ensure that the agent can track the context and conversation history.
- **Identify conversation location**: Ensure the agent is aware of the platform on which the conversation is ongoing, such as on Teams, copilot.com, in a meeting side panel, or a group chat.
- **Store and pass conversation history**: Determine the means of storage and pass some of the conversation history to the agent.
- **Understand user references**: Ensure that when a user sends a message, the agent must understand what the user is referring to. You can build this understanding in the agent using LLM and the recent conversation history. The agent mustn't need the user to reestablish context with every message.

TODO we could have a section or subsection here for proactive messaging: "Agents aren't limited to request-response workflows, and can proactively message users for notifications, scheduled tasks, or just to offer help when intelligently monitoring the conversation".  This is also a good place to mention it, prior to welcome messages below

## AI-generated indicator (required)

Teams provides a standard **AI generated** indicator that agents can apply to messages generated using AI. Displaying this indicator when appropriate is always a best practice, and is required for agents distributed through the Teams Store.

:::image type="content" source="../../../assets/images/bots/ai-labels-1.png" alt-text="Image shows an example of AI label for AI-generated message." border="false":::

See [AI label](../bot-messages-ai-generated-content.md#ai-label).

## Message streaming and thinking indicator

Like many LLM chat experiences, Teams agents can stream messages to maximize responsiveness. Before streaming begins, Teams can display a customizable, updateable "thinking indicator" to indicate liveness and provide insight about how the message is being generated.

:::image type="content" source="../../../assets/images/bots/ai-streaming-ux.gif" alt-text="Animated screen capture depicting an agent's thinking indicator status updates, followed by message content being streamed as it is generated" border="false":::

TODO only works 1:1

TODO do we have a standard name for "thinking indicator"? Maybe "status indicator" It was "informative message" here before, which was too generic to imply the usage.

[Stream bot messages](../../streaming-ux.md)

## Adaptive cards

TODO

## Prompt starters

*Prompt starters* are prewritten prompts that help users understand an agent's capabilities and quickly begin interacting with it. In one-on-one chats, they are displayed prominently if neither the user nor the bot has started the conversation, and are conveniently accessible at any time in all chat scenarios.

:::image type="content" source="../../../assets/images/bots/ai-zero-prompts.png" alt-text="Image shows an example of prompt starters." border="false":::

See [Prompt starters](../conversations/prompt-suggestions.md#prompt-starters-1).

TODO more and better screenshots.

TODO there was language in here about how prompts in the **View Prompts** box can be dynamically updated, but I don't think that's true is it? I thought only suggested actions were dynamic/runtime, and that all prompts and commands were statically configured.

## Named commands

Agents can use *named commands* to expose discoverable, consistent command-style functionality in chat.

TODO screenshot

See [Expose slash commands from agents and apps](../../../agents-in-teams/agent-slash-commands.md).

## Suggested actions

Whenever an agent sends a message, it can include a set of *suggested actions*: buttons that users can select to quickly respond or take action. Unlike prompt starters and named commands, suggested actions are defined at runtime, enabling agents to dynamically generate context-aware options to guide users through workflows or intelligently suggest next steps.

TODO screenshots

Suggested actions are valuable in "human in the loop" workflows, where an agent requests user approval or confirmation before taking action, but are helpful in any scenario that calls for quick, contextual response options or actions. They can be configured to send a pre-set chat response to the agent, silently invoke an agent sbehavior without a chat message, or insert a pre-constructed message into the user's compose box.

See [Suggested actions](../conversations/prompt-suggestions.md#suggested-actions)

## Welcome messages

Agents can proactively send welcome messages when added to a conversation or installed as a personal app with one-on-one chat capabilities.

An agent's welcome message should explain the value it offers, provide configuration instructions, and describe any commands it exposes. Welcome messages are optional, but agents that don't send a welcome message when installed in personal scope (one-on-one conversatoins) must provide prompt starters.

TODO do we have anything to link to about how to actually *do* a welcome message? There's <https://learn.microsoft.com/en-us/microsoftteams/platform/graph-api/proactive-bots-and-messages/graph-proactive-bots-and-messages?tabs=dotnet> but that's really scattered; I have already given feedback on it in one of the samples-update PRs that's modifying it. <https://learn.microsoft.com/en-us/microsoftteams/platform/bots/how-to/conversations/send-proactive-messages> has some language in that direction but I don't think it has clear guidance.

## Sensitivity labels

Agent messages that contain information that might be confidential, or that might be accessible only to certain individuals, should include a standard sensitivity label.

- Example of sensitivity label:

    :::image type="content" source="../../../assets/images/bots/ai-labels-2.png" alt-text="Image shows an example of AI label for a confidential message." border="false":::

See [Sensitivity label](../bot-messages-ai-generated-content.md#sensitivity-label).

## Citations

Agents should cite the data sources they use to generate messages.

:::image type="content" source="../../../assets/images/bots/ai-bot-inline-citation.png" alt-text="Image shows an example of citations in agents." border="false":::

See [Citations](../bot-messages-ai-generated-content.md#citations)

TODO in public preview

> [!NOTE]
>
> Citations with Adaptive Cards are available in [public developer preview](../../../resources/dev-preview/developer-preview-intro.md).

## Feedback

Teams provides standardized controls and invocation events for gathering user feedback about agent messages. The feedback workflow is opt-in: agent developers must enable it in their agent and then implement

# [Desktop](#tab/desktop)

:::image type="content" source="../../assets/images/bots/bot-feedback-buttons.png" border="false" alt-text="Screenshot shows the feedback buttons in a bot in the Teams desktop client.":::

:::image type="content" source="../../assets/images/bots/bot-feedback-form.png" border="false" alt-text="Screenshot shows the default feedback form in a bot in the Teams desktop client.":::

# [Mobile](#tab/mobile)

:::image type="content" source="../../assets/images/bots/feedback-buttons-mobile.png" border="false" alt-text="Screenshot shows the feedback buttons in a bot in the Teams mobile client." lightbox="../../assets/images/bots/feedback-buttons-mobile.png":::

:::image type="content" source="../../assets/images/bots/feedback-form-mobile.png" border="false" alt-text="Screenshot shows the default feedback form in a bot in the Teams desktop client." lightbox="../../assets/images/bots/feedback-form-mobile.png":::

---

See [Feedback buttons](../bot-messages-ai-generated-content.md#feedback-buttons).

> [!NOTE]
> Customizable feedback forms are available in [public developer preview](../../../resources/dev-preview/developer-preview-intro.md).

### Enable Teams Azure AD single sign-on (TODO best practice)

TODO currently 1:1 only

Add single sign-on (SSO) authentication to your agent. For more information, see [enable SSO for your app](../authentication/bot-sso-overview.md).

### Enable the agent to understand conversational history and context (TODO reconcile with above, required)

Design your agent to understand and refer to conversational history and context. This ensures that every interaction is relevant and tailored to the user's specific needs. The agent can refer to the context and offer responses that are accurate and contextually appropriate.

<!--For more information, see [messages in bot conversations](../conversations/conversation-messages.md).-->

### Offer dynamic and contextual suggestion prompts (TODO best practice)

Enhance your agent's user experience with intelligent and context-aware prompts. The agent can offer context-relevant prompts dynamically.

:::image type="content" source="../../../assets/images/bots/ai-suggested-prompts.png" alt-text="Image shows an example of suggested prompts." border="false":::

To achieve this, the agent must leverage the conversation context and history, ensuring prompt suggestions are timely and fit for the query.

### Enable app profile card (TODO best practice, name)

Add hovercard experience for all agents and bots. Hovercards provide valuable and relevant information to educate users about the app and its features.

:::image type="content" source="../../../assets/images/bots/contoso-app-profile-card.png" alt-text="Image shows app profile card." border="false" lightbox="../../../assets/images/bots/contoso-app-profile-card.png":::

To enable the app profile card for your agents or bots, add the `features` field under the `description` field in the app manifest. For more information, see [app manifest schema description object](/microsoft-365/extensibility/schema/root-description).

TODO targeted messages, sessions, reply in threads, full channel awareness. These all seem like they could go under one "conversational intelligence" header.

## See also

- [Teams SDK](teams-conversation-ai-overview.md)
- [Stream bot messages](../../streaming-ux.md)
- [Enhance AI-generated bot messages](../bot-messages-ai-generated-content.md)
