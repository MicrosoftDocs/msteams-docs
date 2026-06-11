---
title: TODO Best practices for building agent in Teams user experience
description: TODO Learn about the user experience for agents in Teams
ms.localizationpriority: medium
ms.topic: overview
ms.date: 06/10/2026
---

# Agents interactions best practices checklist

This article provides a comprehensive checklist of conversational Teams features for agents. It highlights capabilities and integration points that can improve usability, productivity, and overall user experience. Review and consider each item in this list to ensure your agent makes effective use of features that contribute to a complete, high-quality experience that meets the expectations of your users.

TODO many of these are required for copilot, see [validation guidelines for agents](../../../concepts/deploy-and-publish/appsource/prepare/review-copilot-validation-guidelines.md).

TODO we should be clearer here that by "agent", we specifically mean an LLM-backed bot. Can link to some of the new content under development about the app model.

## Context management (required)

**MAJOR TODO**, extending to all the platform docs and not just this article: what actual developer guidance and facilities do we offer for this that we can link to? I haven't modified the contents here yet... "Use Teams SDK to ensure intelligent context-based conversation", but what does Teams SDK offer to do that? This is arguably the most critical part of making an agent work and we have virtually no concrete guidance on it anywhere I've seen; most of our feature docs are just *bot* features until someone does the work to connect an LLM. A sample agent implementation that we could dissect in documentation would be extremely helpful here.

---

An agent must track a conversation's context and history to provide an intelligent interaction. The agent must meet the user's expectation by being aware of the conversation's context and allowing them to refer to previous messages and responses.

Use Teams SDK to ensure intelligent context-based conversation and to manage and pass conversational history and context to the LLM. Teams SDK enables you to:

- **Manage context and conversation history**: Ensure that the agent can track the context and conversation history.
- **Identify conversation location**: Ensure the agent is aware of the platform on which the conversation is ongoing, such as on Teams, copilot.com, in a meeting side panel, or a group chat.
- **Store and pass conversation history**: Determine the means of storage and pass some of the conversation history to the agent.
- **Understand user references**: Ensure that when a user sends a message, the agent must understand what the user is referring to. You can build this understanding in the agent using LLM and the recent conversation history. The agent mustn't need the user to reestablish context with every message.

## AI-generated indicator (required)

Teams agents are required to include the standard **AI generated** label on messages generated via LLM.

:::image type="content" source="../../../assets/images/bots/ai-labels-1.png" alt-text="Image shows an example of AI label for AI-generated message." border="false":::

See [AI label](../bot-messages-ai-generated-content.md#ai-label).

## Message streaming

Like many LLM chat experiences, Teams agents can stream messages, delivering content to users as it is generated. While waiting for response generation to begin, Teams can display a customizable, updateable "thinking indicator" to indicate liveness and provide insight about how the message is being generated.

:::image type="content" source="../../../assets/images/bots/ai-streaming-ux.gif" alt-text="Animated screen capture depicting an agent's thinking indicator status updates, followed by message content being streamed as it is generated" border="false":::

Agents should always use streaming and thinking indicators where applicable to provide a responsive, low-latency user experience.

TODO only works 1:1

TODO do we have a standard name for "thinking indicator"? Maybe "status indicator" It was "informative message" here before, which was too generic to imply the usage.

[Stream bot messages](../../streaming-ux.md)

## Proactive messaging

Agent interactions are typically thought of as being initiated by users, but

## Welcome messages and prompt starters

Agents can detect when they are added to a meeting or group chat, or installed as a personal app with one-on-one chat capabilities, and proactively send a welcome message

TODO do we have anything to link to about how to actually do a welcome message? There's <https://learn.microsoft.com/en-us/microsoftteams/platform/graph-api/proactive-bots-and-messages/graph-proactive-bots-and-messages?tabs=dotnet> but that's really scattered; I have already given feedback on it in one of the samples-update PRs that's modifying it.

## Prompt starters

*Prompt starters* are prewritten prompts that help users interact with an agent and understand its capabilities.

:::image type="content" source="../../../assets/images/bots/ai-zero-prompts.png" alt-text="Image shows an example of prompt starters." border="false":::

- **Prompt starters**: Prompt starters are the initial prompts users see when an agent is added to a new conversation, whether it's a one-on-one chat, a new session, or a group chat. These prompts must be tailored to the user's context and the specific conversation thread.
- **Contextual prompts**: Contextual prompts are dynamic recommendations from an agent during user interactions. These prompts appear via contextual flyouts, such as **View Prompts** in one-on-one chats and @mention flyouts in group chats. These suggestions are updated to stay relevant to the ongoing conversation.
- **Suggested action**: Suggested actions are prompts that appear as pills above the compose box in one-on-one chats and as action buttons in group chats. They are suggestions for actions a user might take in response to the agent's message and must be customized to match the response.

## Suggested actions

## Named commands

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

TODO targeted messages, sessions, reply in threads, full channel awareness, commands

## See also

- [Teams SDK](teams-conversation-ai-overview.md)
- [Stream bot messages](../../streaming-ux.md)
- [Enhance AI-generated bot messages](../bot-messages-ai-generated-content.md)
