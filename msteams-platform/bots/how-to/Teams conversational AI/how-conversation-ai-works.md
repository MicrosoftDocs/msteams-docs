---
title: Getting started
description: In this article, learn how to create an app using Teams conversational IA and it's capabilities.
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
---

# Getting started

This SDK is designed to help you build bots that can interact with Teams and Microsoft 365 apps. It is built on top of the Bot Framework SDK to make it easier to build Teams and M365-interacting bots.

The SDK also facilitates the creation of bots that uses an OpenAI API key to provide an AI-driven conversational experience, or the same using Azure Foundry.

To get started, Set up migration guide and start GPT setup guide

1. [Set up migration guide](https://github.com/microsoft/botbuilder-m365/blob/main/getting-started/00.MIGRATION.md)
1. [Start GPT setup guide](https://github.com/microsoft/botbuilder-m365/blob/main/getting-started/01.GPT-SETUP.md)

## Capabilities

With the Teams Conversational AI SDK, building apps for Teams is drastically simpler, with rich natural language capabilities out of the box that brings any app experience into the conversation.

1. [Simple Teams-Centric Component Scaffolding](#simple-teams-centric-component-scaffolding)
1. [Natural Language Modeling](#natural-language-modeling)
1. [Prompt Engineering](#prompt-engineering)
1. [Topic Filtering](#topic-filtering)
1. [Predictive Engine for Mapping Intents to Actions](#predictive-engine-for-mapping-intents-to-actions)
1. [Conversational Session History](#conversational-session-history)
1. [Localization](#localization)
1. [LLM Modularity](#llm-modularity)
1. [Responsible AI](#responsible-ai)

### Simple Teams-Centric Component Scaffolding

The Conversational AI SDK simplifies the Teams app model to focus on the extension needed vs the protocol required. Previously, if a developer intended to build a message extension, they would need to learn primitive conversational protocols, that is , *member addition*, *channel creation*, and so on. With the new SDK, developers can leverage pre-built templates, and simply add their business logic to this scaffold. From there, you can easily add modules like bots, message extensions, Adaptive Cards, link unfurling, etc.  

### Natural Language Modeling

The Conversational AI SDK is built with GPT-powered language models from day zero, alleviating the need for developers to take on the complex and expensive task of writing this themselves. This makes building AI-powered Teams apps easier, more compliant, and consistently usable than ever before. Developers can focus on their own business logic and leave the AI-powered, Teams-centric language modeling to us.

This means bots can run in-context and immediately assist when they recognize a user intent map to one of their app actions, boosting the conversation without requiring users to explicitly talk to the bot using a small set of registered actions.

### Prompt Engineering

 With prompt engineering bots can be personalized, customized and tailor-made to meet user needs. For instance, if the user’s intent is identified as content generation, developers can add prompts like “style content as a meme generator with a persuasive & sarcastic tone”.

### Topic Filtering

Bots can channel focus to their own business logic with custom topic filters:

### Predictive Engine for Mapping Intents to Actions  

A simple interface for actions and predictions allows bots to react when they have high confidence for taking action. Ambient presence lets bots learn intent, use prompts based on business logic, and generate responses. For example, if a user has been out of office and needs to quickly summarize a thread, the SDK understands the intent as summarization, allows prompts to make summarizations over a period of time, potentially focused on the user’s manager, and provides actions to summarize chat content for users to consume.

### Conversational Session History

The Conversational AI SDK remembers context across messages, so an utterance for: “Retrieving the latest support tickets for Jane Doe” can be followed up with: “Now give me the latest activity on the first one” and the SDK returns the correct intents and entities for Jane Doe’s first ticket.

### Localization

Since the SDK is backed by GPT, localization is free out of the box. User utterances in any language are consistently translated to intents, entities, and resultant actions that apps understand, without the need to build and maintain localization records.

### LLM Modularity

Though the SDK is built to use Open AI’s GPT model, developers have the flexibility to swap in any large language model (LLM) of their choosing, without changing a line of bot logic.

### Responsible AI

Since the launch of ChatGPT, the internet is filled with examples of the dark side of AI. The SDK allows developers to create ethical and responsible conversational apps by:

* Moderation hooks, which can be used to regulate bot responses against any moderation API.
* Conversation sweeping, which helps developers monitor conversations and intervene when the conversation goes astray through proactive detection and remediation.
* Feedback loops, which allow developers to evaluate the performance of the bot for high quality conversations and fine-tune their experience for improvement.

In summary, the Conversational AI SDK offers wide support from low code to complex scenarios. The SDK extends capabilities with AI constructs to build natural language modeling, scenario-specific user intent, personalization, and automated, context-aware conversations.
