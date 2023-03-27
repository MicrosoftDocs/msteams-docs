---
title: Teams conversational AI
description: In this article, learn about Teams conversation AI.
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
---

# Teams conversational AI Overview

Within the Teams store, there are store bots, line-of-business bots developed by tenants, and custom bots developed by users, with most being written using Teams Bot Framework SDK. These bots range from MoveWorks’ heavily invested NLP bots to small ISVs whose bots respond only to commands issued in strict syntax. As a result, there's a lack of consistency in the quality of bots from a user experience perspective. As an example, certain bots lack clear instructions on how to engage with them, while others offer input commands to ensure users send messages that the bot understands, and some have the ability to facilitate multi-turn natural language conversations, albeit with varying degrees of success.

There's a growing interest in leveraging GPT family of LLMs in conversational bots in Teams. However, building reliable and safe bots for enterprise applications presents complex considerations for developers to address.
To simplify the integration of Azure OpenAI GPT language models in conversational AI apps, Teams Conversational AI SDK supplies abstractions that offer features such as topic filtering, intent mapping, conversation history, localization, and moderation support to facilitate natural and safe human-AI interactions. The SDK will enable bots to more easily participate in the Skills ecosystem by exposing their actions, while the lack of an SDK could make it challenging to pivot bot developers towards the future Skills ecosystem and recoup our investments in the OpenAI ecosystem due to the challenges posed by LangChain, which is likely to be the default choice for LLM apps without our SDK.

Introducing the Teams Conversational AI SDK, powered by the Azure Semantic Kernel and Open AI. The SDK is a Teams-centric interface to GPT-based common language models and user intent engines, alleviating the need for developers to take on the complex and expensive task of writing and maintaining conversational bot logic to integrate with LLMs themselves. The SDK provides a simple capabilities-driven approach to building apps, which allows developers to focus on building their business logic rather than learning the semantics of Teams conversational applications.

The Conversational AI SDK makes Teams apps truly conversational, not driven by rigid command structures.

To create conversational bots that are both safe and reliable, it's imperative to consider numerous factors such as topical filtering, conversational history, moderation hooks, throttling, and other related considerations. Our SDK is designed to seamlessly integrate with the Teams Bot Framework SDK and offers developers essential abstractions that greatly enhance productivity and enable them to handle these considerations effectively, particularly within the context of enterprise scenarios.

## Bots Architecture overview

The process of building a Teams Bot Framework bot essentially involves supporting OAuth S2S in the bot as prescribed by Bot Framework guidelines and adhering to the Activity schema prescribed by Bot Framework for reading and writing JSON documents. Bots may also invoke additional APIs to determine additional context required to handle a user's message, such as Azure Active Directory (Azure AD) ID and UPN of the user the bot is interacting with.

## Safety layers

Communication between bots and users in Teams is subject to various layers of protections – including sanitization, eDiscovery, and DLP (Data Loss Prevention) checks.

* SMBA (Skype Messaging Bot API): Endpoint for all bot related activities. Performs throttling and sanitization on bot payload.
* Other IC3 services: Bot roster membership check
* APS (Agent Provisioning Service): Bot metadata retrieval and bot validation
* Teams MT (Middle Tier): App policy or tenant settings checks
* PLS (Partner Lookup Service): User or tenant region lookups
* ECS (Experimental Config Service): Feature flags and scenario config data
* MSGraph: App install state and resource specific consent validation
* Bot Framework Services: Bot auth, SDK, and token store
