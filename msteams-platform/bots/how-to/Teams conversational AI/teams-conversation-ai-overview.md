---
title: Teams conversational AI
description: In this article, learn about Teams conversation AI.
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
---

# Teams conversational AI Overview

Introducing the Teams Conversational AI SDK, powered by the Azure Semantic Kernel and Open AI. The SDK is a Teams-centric interface to GPT-based common language models and user intent engines, alleviating the need for developers to take on the complex and expensive task of writing and maintaining conversational bot logic to integrate with LLMs themselves. The SDK provides a simple capabilities-driven approach to building apps, which allows developers to focus on building their business logic rather than learning the semantics of Teams conversational applications.

SDK helps developers create applications that include AI and ML capabilities. The SDKs offer pre-built, reusable code snippets to build intelligent apps quickly and easily. AI SDKs can be used to develop chatbots for a wide range of industries and use cases.

The Conversational AI SDK makes Teams apps truly conversational, not driven by rigid command structures. SDK is designed to seamlessly integrate with the Teams Bot Framework SDK and offers developers essential abstractions that greatly enhance productivity and enable them to handle these considerations effectively, particularly within the context of enterprise scenarios.

With the Teams Conversational AI SDK, building apps for Teams is drastically simpler, with rich natural language features out of the box that brings any app experience into the conversation. The following are some of the main features available through Teams Conversational AI SDK:

1. [Simple Teams-Centric Component Scaffolding](#simple-teams-centric-component-scaffolding)
1. [Natural Language Modeling](#natural-language-modeling)
1. [Prompt Engineering](#prompt-engineering)
1. [Topic Filtering](#topic-filtering)
1. [Conversational Session History](#conversational-session-history)
1. [Localization](#localization)
1. [LLM Modularity](#llm-modularity)
1. [Responsible AI](#responsible-ai)
1. [Predictive Engine for Mapping Intents to Actions](#predictive-engine-for-mapping-intents-to-actions)

### Simple Teams-Centric Component Scaffolding

The Conversational AI SDK simplifies the Teams app model to focus on the extension needed vs the protocol required. Developers can leverage pre-built templates, and simply add their business logic to this scaffold to add modules like bots, message extensions, Adaptive Cards, link unfurling, and so on.  

### Natural Language Modeling

The Conversational AI SDK is built with GPT-powered language models,so that developers don't need to spend time to  write their own conversation logic and identify user intents. This makes building AI-powered Teams apps easier, more compliant, and consistently usable than ever before.

Bots can run in-context and assist when they recognize a user intent map to one of their app actions, boosting the conversation without requiring users to explicitly talk to the bot using a small set of registered actions.

### Prompt Engineering

Prompt engineering helps developers design prompts considering user's intent, context of the conversation, and the bot personality. Bots can be personalized, customized and tailor-made to meet user needs.

### Topic Filtering

Bots can channel focus to their own business logic with custom topic filters.

### Conversational Session History

The Conversational AI SDK remembers context across messages and helps improve the bot performance by analyzing patterns in user behavior.

### Localization

Since the SDK is backed by GPT, localization is free out of the box. User inputs in any language are consistently translated to intents, entities, and resultant actions that apps understand, without the need to build and maintain localization records.

### LLM Modularity

LLM is an advanced language model that utilizes latent variables to generate coherent and diverse natural language text and style.

Though the SDK is built to use Open AI’s GPT model, developers have the flexibility to swap in any large language model (LLM) of their choosing, without changing a line of bot logic.

### Responsible AI

The SDK allows developers to create ethical and responsible conversational apps by:

* Moderation hooks, which can be used to regulate bot responses against any moderation API.
* Conversation sweeping, which helps developers monitor conversations and intervene when the conversation goes astray through proactive detection and remediation.
* Feedback loops, which allow developers to evaluate the performance of the bot for high quality conversations and fine-tune their experience for improvement.

In summary, the Conversational AI SDK offers wide support from low code to complex scenarios. The SDK extends capabilities with AI constructs to build natural language modeling, scenario-specific user intent, personalization, and automated, context-aware conversations.

### Predictive Engine for Mapping Intents to Actions  

A simple interface for actions and predictions allows bots to react when they have high confidence for taking action. Ambient presence lets bots learn intent, use prompts based on business logic, and generate responses. For example, if a user has been out of office and needs to quickly summarize a thread, the SDK understands the intent as summarization, allows prompts to make summarizations over a period of time, potentially focused on the user’s manager, and provides actions to summarize chat content for users to consume.

## Bots Architecture overview

The bot framework using Conversational AI SDK requires the following:

* Support to OAuth S2S
* Adherence to Activity schema for reading and writing JSON documents
* Invoking Rest APIs to determine additional context required to handle a user's message, such as Azure Active Directory (Azure AD) ID and UPN of the user the bot is interacting with.

## Safety layers

Safety layers help ensure that the bots work in a safe and responsible manner. Communication between bots and users in Teams is subject to various layers of protections – including sanitization, eDiscovery, and DLP (Data Loss Prevention) checks.

* SMBA (Skype Messaging Bot API): Endpoint for all bot related activities. Performs throttling and sanitization on bot payload.
* Other IC3 services: Bot roster membership check
* APS (Agent Provisioning Service): Bot metadata retrieval and bot validation
* Teams MT (Middle Tier): App policy or tenant settings checks
* PLS (Partner Lookup Service): User or tenant region lookups
* ECS (Experimental Config Service): Feature flags and scenario config data
* MSGraph: App install state and resource specific consent validation
* Bot Framework Services: Bot auth, SDK, and token store
