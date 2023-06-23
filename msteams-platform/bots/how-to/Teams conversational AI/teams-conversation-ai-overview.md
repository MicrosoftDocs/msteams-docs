---
title: Teams AI library
description: In this article, learn about Teams conversation AI.
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
---

# Teams AI library

> [!NOTE]
>
> Teams AI library is available only in [public developer preview](~/resources/dev-preview/developer-preview-intro.md).

Teams AI library is a Teams-centric interface to GPT-based common language models and user intent engines. This moderates the need for you to take on complex and expensive tasks of writing and maintaining conversational bot logic to integrate with large language models (LLMs).

:::image type="content" border="false" source="../../../assets/images/bots/teams-ai-library.png" alt-text="Visual representation of a user input and a bot response."lightbox="../../../assets/images/bots/teams-ai-library.png":::

The AI library provides a simple capabilities-driven approach and helps you create intelligent apps quickly and easily with prebuilt, reusable code snippets so that you can focus on building the business logic rather than learning the semantics of Teams conversational applications.

The following are some of the main features available through Teams AI library:

* [Simple Teams-centric component scaffolding](#simple-teams-centric-component-scaffolding)
* [Natural language modeling](#natural-language-modeling)
* [Prompt engineering](#prompt-engineering)
* [Conversational session history](#conversational-session-history)
* [Localization](#localization)
* [LLM modularity](#llm-modularity)
* [Responsible AI](#responsible-ai)
* [Predictive engine for mapping intents to actions](#predictive-engine-for-mapping-intents-to-actions)

## Simple Teams-centric component scaffolding

The Teams AI library simplifies the Teams app model to focus on the extension needed versus the protocol required. You can use prebuilt templates and add your business logic to this scaffold to add modules such as bots, message extensions, Adaptive Cards, or link unfurling.

## Natural language modeling

The Teams AI library is built with GPT-powered language models, so that you don't need to spend time to write your conversational logic and identify user intents. This makes building AI-powered Teams apps easier, more compliant, and consistently usable than ever before.

Bots can run in-context and assist when the bot recognizes a user intent that maps to one of the bot actions. This boosts the conversation without requiring users to explicitly talk to the bot using a small set of registered actions.

## Prompt engineering

Prompt engineering helps you design prompts considering user's intent, context of the conversation, and the bot personality. Bots can be personalized and customized to meet user needs.

## Conversational session history

Teams AI library remembers context across messages and helps improve the bot performance by analyzing patterns in user behavior.

## Localization

Since Teams AI library uses OpenAI's GPT model, localization is available. When a user inputs in any language, the input is consistently translated to intents, entities, and resultant actions that the app understands without the need to build and maintain localization records.

## LLM modularity

Large language model (LLM) is an advanced language model that utilizes latent variables to generate coherent and diverse natural language text and style.

Although, Teams AI library is built to use Open AI’s GPT model, you have the flexibility to swap with any LLM of your choice without changing the bot logic. This means you can choose to keep your app's content outside the public domain and confined to your preferred LLM model.

## Responsible AI

Teams AI library allows you to create ethical and responsible conversational apps by:

* Moderation hooks: To regulate bot responses against any moderation API.
* Conversation sweeping: To monitor conversations and intervene when the conversation goes astray through proactive detection and remediation.
* Feedback loops: To evaluate the performance of the bot for high quality conversations and enhance user experience.

Teams AI library offers support from low code to complex scenarios. The library extends capabilities with AI constructs to build natural language modeling, scenario-specific user intent, personalization, and automated context-aware conversations.

## Predictive engine for mapping intents to actions  

A simple interface for actions and predictions allows bots to react when the bot has confidence for taking action. Ambient presence lets bots learn intent, use prompts based on business logic, and generate responses. For example, if a user has been out of office and needs to quickly summarize a thread, the library:

1. Understands the intent as summarization.
1. Allows prompts to make summarizations over a period of time focused on the user’s manager.
1. Provides actions to summarize chat content for users to consume.

## Advantages of Team AI library

The AI Library is a Teams-centric interface to Large Language Models. Your apps can leverage LLMs to facilitate more natural conversational interactions with users, guiding that conversation into your apps skills.

You can focus on writing your business logic, and allow Teams to handle the complexities of conversational bots so that you can easily extract and utilize user intent within your apps.

:::image type="content" source="../../../assets/images/bots/teams-ai-library-benefits.png" alt-text="Screenshot shows the benefits of using Teams AI library.":::

* The AI Library is a Teams-centric interface to Large Language Models. Using techniques like prompt engineering you can add ChatGPT like conversational experiences to your bot and built-in safety features, like moderation, help ensure your bot always responds in an appropriate manner.

* The library includes a planning engine that lets the model identify the users intent and then maps that intent to actions that you implement.

* You can easily add support for any model you chose with built-in support for both OpenAI and Azure OpenAI models.

* with built-in guardrails for responsible AI, the library equips you to ensure moderated responses, and with language localization features built in, it serves a diverse user base for an experience that works in the language of your users.

<!-- ## Bots Architecture overview

The bot framework using Teams AI library requires the following:

* Support to OAuth S2S
* Adherence to Activity schema for reading and writing JSON documents
* Invoking Rest APIs to determine additional context required to handle a user's message, such as Azure Active Directory (Azure AD) ID and UPN of the user the bot is interacting with. -->

## Next step

> [!div class="nextstepaction"]
> [Teams AI library capabilities](how-conversation-ai-core-capabilities.md)
