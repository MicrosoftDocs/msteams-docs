---
title: Teams AI library
description: In this article, learn about Teams conversation AI.
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
ms.date: 11/27/2023
---

# Teams AI library

> [!NOTE]
>
> Teams AI library is available only in [public developer preview](~/resources/dev-preview/developer-preview-intro.md).

Teams AI library is a Teams-centric interface to GPT-based common language models and user intent engines. This moderates the need for you to take on complex and expensive tasks of writing and maintaining conversational bot logic to integrate with large language models (LLMs).

:::image type="content" border="false" source="../../../assets/images/bots/teams-ai-library.png" alt-text="Visual representation of a user input and a bot response."lightbox="../../../assets/images/bots/teams-ai-library.png":::

The AI library provides a simple capabilities-driven approach and helps you to create intelligent apps quickly and easily with prebuilt, reusable code snippets so that you can focus on building the business logic rather than learning the semantics of Teams conversational applications.

## Why use Teams AI library?

The AI Library is a Teams-centric interface to Large Language Models. Your apps can leverage LLMs to facilitate more natural conversational interactions with users, guiding that conversation into your apps skills.

You can focus on writing your business logic, and allow Teams to handle the complexities of conversational bots so that you can easily extract and utilize user intent within your apps.

:::image type="content" source="../../../assets/images/bots/teams-ai-library-benefits.png" alt-text="Screenshot shows the benefits of using Teams AI library.":::

* The AI Library is a Teams-centric interface to Large Language Models. Use prebuilt templates to add Teams app capabilities.

* Use techniques like prompt engineering to add ChatGPT like conversational experiences to your bot and built-in safety features, like moderation, help ensure your bot always responds in an appropriate manner.

* The library includes a planning engine that lets the model identify the user's intent and then maps that intent to actions that you implement.

* You can easily add support for any LLM of your choice without changing the bot logic.

The Teams AI Library is available in JavaScript and C# languages allowing you to harness the power of AI and create intelligent, user-friendly applications for Microsoft Teams using the programming languages they're most comfortable with. We're committed to a  mindset where you build AI products with the tools and languages you want in order to make the best experiences possible for your customers on Teams.

The following are some of the main features available through Teams AI library:

* [Simple Teams-centric component scaffolding](#simple-teams-centric-component-scaffolding)
* [Natural language modeling](#natural-language-modeling)
* [Prompt engineering](#prompt-engineering)
* [Conversational session history](#conversational-session-history)
* [Localization](#localization)
* [LLM modularity](#llm-modularity)
* [Responsible AI](#responsible-ai)
* [Predictive engine for mapping intents to actions](#predictive-engine-for-mapping-intents-to-actions)
* [Action Planner](#action-planner)
* [Prompt management](#prompt-management)
* [Augmentation](#augmentation)
* [Vector data sources](#vector-data-sources)
* [Enhanced reasoning](#enhanced-reasoning)
* [Feedback loop](#feedback-loop)

## Simple Teams-centric component scaffolding

The Teams AI library simplifies the Teams app model to focus on the extension needed versus the protocol required. You can use prebuilt templates and add your business logic to this scaffold to add modules such as bots, message extensions, Adaptive Cards, or link unfurling.

## Natural language modeling

The Teams AI library is built with GPT-powered language models, so that you don't need to spend time to write your conversational logic and identify user intents. This makes building AI-powered Teams apps easier, more compliant, and consistently usable than ever before.

Bots can run in-context and assist when the bot recognizes a user intent that maps to one of the bot actions. This boosts the conversation without requiring users to explicitly talk to the bot using a small set of registered actions.

## Prompt engineering

Prompt engineering helps you to design prompts considering user's intent, context of the conversation, and the bot personality. Bots can be personalized and customized to meet user needs.

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

<!-- ## Bots Architecture overview

The bot framework using Teams AI library requires the following:

* Support to OAuth S2S
* Adherence to Activity schema for reading and writing JSON documents
* Invoking Rest APIs to determine additional context required to handle a user's message, such as Azure Active Directory (Azure AD) ID and UPN of the user the bot is interacting with. -->

## Action Planner

The new ActionPlanner is the main component calling your Large Language Model (LLM) and includes several features to enhance and customize your model. Model plugins simplify configuring your selected LLM to the planner and ships with an OpenAIModel that supports both OpenAI and Azure OpenAI LLMs. Additional plugins for other models like Llama-2 can easily be added, giving you the flexibility to choose what model is best for your use case. Reliability is dramatically increasing with an internal feedback loop that automatically fixes subpar responses from the LLM.

## Prompt management

Dynamic prompt management is a feature of the AI system that allows it to adjust the size and content of the prompt that is sent to the language model, based on the available token budget and the data sources or augmentations. It can improve the efficiency and accuracy of the model by ensuring that the prompt doesn't exceed the context window or include irrelevant information. Steve explained how dynamic prompt management works in the meeting and gave some examples of how to use it with different augmentations.

## Augmentation

Say goodbye to prompt engineering headaches and say hello to efficiently enhancing and directing your AI model’s responses with Augmentation. When creating a prompt select one of the following Augmentation Modes to tailor your model to your needs, increasing its accuracy and desired outcomes:

* **Retrieval Augmented Generation (RAG)**: Automatically incorporate real-time, dynamic, and specified external datasources into your model’s responses enabling up to date and contextually accurate results without fine-tuning or re-training your model. Answer questions about today’s sales numbers or customize to a specific user’s data; with RAG your model is no longer stuck in the past. Discover how easy it's to build by trying the RAG bot sample today!

* **Monologue**: Create AutoGPT-style agents capable of performing multi-step actions independently and reliability with full schema validation and automatic repair included.

* **Sequences**: Enable your AI assistant to return a sequence of actions for execution with schema validation increasing reliability.

* **Functions**: Produce structured responses from your model by employing user-defined Functions. These functions are customizable using JSON schemas to define the parameters and their format. The ActionPlanner assesses model responses against the schema, making repairs as needed increasing response reliability and consistency.

### Vector data sources

Vector Databases are a novel type of database designed specifically for storing Vectors and facilitating efficient search over them. They return the most relevant results for a user’s query. The vector search feature in a vector database enables retrieval-augmented generation to harness LLMs and custom data or domain-specific information. This process involves extracting pertinent information from a custom data source and integrating it into the model request through prompt engineering. Prior to sending a request to the LLM, the user input/query/request is also transformed into an embedding, and vector search techniques are employed to locate the most similar embeddings within the database. You can register named data sources with the planner and then specify the name[s] of the data sources they wish to augment the prompt with in the prompts config.json.

## Enhanced reasoning

With enhanced reasoning, the Teams AI Library tackles the ongoing issue of bot hallucinations head-on by offering an integrated fact-checking system.

When a user interacts with your AI assistant, this system prompts the bot to engage in a process of self-reflection critically evaluating its potential responses prior to sending them. The introspection allows the bot to identify inaccuracies and correct its answers improving accuracy, quality, and contextual relevance. Advanced reasoning ensures that your AI assistant becomes a dependable source of information and judgment, building trust in your product and drawing users back every day.

## Feedback loop

The feedback loop is a feature of the AI system that allows it to validate and correct the output of the language model. It works by checking the structure and parameters of the plan or monologue that the model returns, and giving it feedback if there are any errors or missing information. The model then tries to fix its mistakes and return a valid output. The feedback loop can improve the reliability and accuracy of the AI system, and reduce the chances of hallucination or invalid actions.

The following table lists the changes and updates to the Teams AI library:

|Type |Description  |JavaScript|C#|
|---------|---------|||
|**State Management**     | Simpler TurnState object and no more need for a TurnStateManager class.        |||
|Prompt Config     | Updated the config.json version number for prompts to 1.1.        |||
|Prompt Management     | All prompt management is now done by the Planner.        |||
|Chaining    | Chaining isn't supported.        |||
|completePrompt method    |  Planners are free to implement a completePrompt() method (the ActionPlanner will) but you can no longer access that through the AI class.       |||
|**Additions**    |    |||
|OpenAIModel    |The OpenAIModel class lets you call both OAI and Azure OAI with one single component. New models can be defined for other model types like LLaMA2.              | ✔️ ||
|Embeddings    | The OpenAIEmbeddings class lets you generate embeddings using either OAI or Azure OAI. New embeddings can be defined for things like OSS Embeddings.        | ✔️ |❌|
|Prompts     | A new object based prompt system enables better token management and reduces the likelihood overflowing the models context window.        | ✔️ ||
| Augmentation     | Augmentations simplify prompt engineering tasks by letting the developer add named augmentations to their prompt. Only  `functions`, `sequences`, and `monologue` style augmentations are supported.        | ✔️ |❌|
|Data Sources     |  A new DataSource plugin type makes it easy to add RAG to any prompt. You can register a named data source with the planner and then specify the name[s] of the data sources they wish to augment the prompt.      | ✔️ |❌|

## Next step

> [!div class="nextstepaction"]
> [Teams AI library capabilities](how-conversation-ai-core-capabilities.md)
