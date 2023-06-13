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

Since Teams AI library is backed by GPT, localization is available. When a user inputs in any language, the input is consistently translated to intents, entities, and resultant actions that the app understands without the need to build and maintain localization records.

## LLM modularity

Large language model (LLM) is an advanced language model that utilizes latent variables to generate coherent and diverse natural language text and style.

Although, Teams AI library is built to use Open AI’s GPT model, you have the flexibility to swap with any LLM of your choice without changing the bot logic. This means you can choose to keep your app's content outside the public domain, and confined to your own preferred LLM model.

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

## Why build apps with Teams AI library?

Teams AI library makes Teams apps conversational, not driven by rigid command structures. The library is designed to seamlessly integrate with the Teams Bot Framework SDK. Building apps for Teams is simpler, with rich natural language features that bring any app experience into the conversation.

Here are some key benefits of the Teams AI library:

* ​Strong proof of value with Teams app components​. You can instantiate your bot activity handler and invoke any Teams capabilities by just invoking the function.

* ​Easy to use powerful conversational language models versus building your model​.

* ​Guardrails to steer responsible conversation with moderation​.

* ​Out of the box localization with LLMs.

* You can select any LLM.

* You can talk to Teams apps like you’d talk to a human as opposed to a set of commands​.

* ​Any app that uses the library offers consistency for interactions, and the app handles steering natural conversation into actionable outcomes.

* Multiple safety layers to ensure that the bot works in a safe and responsible manner. The safety layers are as follows:

  * Skype Messaging Bot API (SMBA): Endpoint for all bot related activities. Performs throttling and sanitization on bot payload.
  * Other IC3 services: Bot roster membership check.
  * Agent Provisioning Service (APS): Bot metadata retrieval and bot validation.
  * Teams Middle Tier (MT): App policy or tenant settings checks.
  * Partner Lookup Service (PLS): User or tenant region lookups.
  * Experimental Config Service (ECS): Feature flags and scenario configuration data.
  * Microsoft Graph: App install state and resource specific consent validation.
  * Bot Framework Services: Bot authentication, SDK, and token store.

<!-- ## Bots Architecture overview

The bot framework using Teams AI library requires the following:

* Support to OAuth S2S
* Adherence to Activity schema for reading and writing JSON documents
* Invoking Rest APIs to determine additional context required to handle a user's message, such as Azure Active Directory (Azure AD) ID and UPN of the user the bot is interacting with. -->

## Next step

> [!div class="nextstepaction"]
> [Teams AI library capabilities](how-conversation-ai-core-capabilities.md)
