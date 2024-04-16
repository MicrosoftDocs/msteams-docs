---
title: Teams AI library
description: In this article, learn about Teams conversation AI.
ms.localizationpriority: medium
ms.topic: overview
ms.author: v-ypalikila
author: michaelmaillot
ms.date: 02/12/2024
---

# Teams AI library

Teams AI library is a Teams-centric interface to GPT-based common language models and user intent engines which, moderates the need for you to take on complex and expensive tasks of writing and maintaining conversational bot logic to integrate with large language models (LLMs).

:::image type="content" border="false" source="../../../assets/images/bots/teams-ai-library.png" alt-text="Visual representation of a user input and a bot response."lightbox="../../../assets/images/bots/teams-ai-library.png":::

The AI library provides a simple capabilities-driven approach and helps you to create intelligent apps quickly and easily with prebuilt, reusable code snippets so that you can focus on building the business logic rather than learning the semantics of Teams conversational applications.

## Why use Teams AI library?

The AI Library is a Teams-centric interface to Large Language Models. Your apps can use LLMs to facilitate more natural conversational interactions with users, guiding that conversation into your apps skills.

You can focus on writing your business logic, and allow Teams to handle the complexities of conversational bots so that you can easily extract and utilize user intent within your apps.

:::image type="content" source="../../../assets/images/bots/teams-ai-library-benefits.png" alt-text="Screenshot shows the benefits of using Teams AI library.":::

* The AI Library is a Teams-centric interface to Large Language Models. Use prebuilt templates to add Teams app capabilities.

* Use techniques like prompt engineering to add ChatGPT like conversational experiences to your bot and built-in safety features, like moderation, help ensure your bot always responds in an appropriate manner.

* The library includes a planning engine that lets the model identify the user's intent and then maps that intent to actions that you implement.

* You can easily add support for any LLM of your choice without changing the bot logic.

The Teams AI Library is available in JavaScript and C# languages allowing you to harness the power of AI and create intelligent, user-friendly applications for Microsoft Teams using the programming languages they're most comfortable with. We're committed to a  mindset where you build AI products with the tools and languages you want in order to make the best experiences possible for your customers on Teams.

The following are some of the main features available through Teams AI library:

## Simple Teams-centric component scaffolding

The Teams AI library simplifies the Teams app model to focus on the extension needed versus the protocol required. You can use prebuilt templates and add your business logic to this scaffold to add modules such as bots, message extensions, Adaptive Cards, or link unfurling.

## Natural language modeling

The Teams AI library is built with GPT-powered language models, so that you don't need to spend time to write your conversational logic and identify user intents. Building AI-powered Teams apps is easier, more compliant, and consistently usable than ever before.

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

- Moderation hooks: To regulate bot responses against any moderation API.
- Conversation sweeping: To monitor conversations and intervene when the conversation goes astray through proactive detection and remediation.
- Feedback loops: To evaluate the performance of the bot for high quality conversations and enhance user experience.

Teams AI library offers support from low code to complex scenarios. The library extends capabilities with AI constructs to build natural language modeling, scenario-specific user intent, personalization, and automated context-aware conversations.

## Predictive engine for mapping intents to actions

A simple interface for actions and predictions allows bots to react when the bot has confidence for taking action. Ambient presence lets bots learn intent, use prompts based on business logic, and generate responses. For example, if a user was out of office and needs to quickly summarize a thread, the library:

1. Understands the intent as summarization.
1. Allows prompts to make summarizations over a period of time focused on the user’s manager.
1. Provides actions to summarize chat content for users to consume.

<!-- ## Bots Architecture overview

The bot framework using Teams AI library requires the following:

* Support to OAuth S2S
* Adherence to Activity schema for reading and writing JSON documents
* Invoking Rest APIs to determine additional context required to handle a user's message, such as Azure Active Directory (Azure AD) ID and UPN of the user the bot is interacting with. -->

## Action Planner

Action Planner is the main component calling your Large Language Model (LLM) and includes several features to enhance and customize your model. Model plugins simplify configuring your selected LLM to the planner and ships with an OpenAIModel that supports both OpenAI and Azure OpenAI LLMs. Additional plugins for other models like Llama-2 can easily be added, giving you the flexibility to choose what model is best for your use case. An internal feedback loop increases reliability by fixing the subpar responses from the LLM.

## Prompt management

Dynamic prompt management is a feature of the AI system that allows it to adjust the size and content of the prompt that is sent to the language model, based on the available token budget and the data sources or augmentations. It can improve the efficiency and accuracy of the model by ensuring that the prompt doesn't exceed the context window or include irrelevant information.

## Augmentation

Efficiently enhance and direct your AI model’s responses with Augmentation. Using different augmentation modes, you can tailor your model to your needs, increasing its accuracy and desired outcomes.

* **Retrieval Augmented Generation (RAG)**: Automatically incorporates real-time, dynamic, and specified external data sources into your model’s responses enabling up to date and contextually accurate results without fine-tuning or re-training your model. Answer questions about today’s sales numbers or customize to a specific user’s data; with RAG your model is no longer stuck in the past.

* **Monologue**: Create AutoGPT-style agents capable of performing multi-step actions independently and reliability with full schema validation and automatic repair included.

* **Sequence**: Enable your AI assistant to return a sequence of actions for execution with schema validation increasing reliability.

* **Functions**: Produce structured responses from your model by employing user-defined Functions. These functions are customizable using JSON schemas to define the parameters and their format. The ActionPlanner assesses model responses against the schema, making repairs as needed increasing response reliability and consistency.

### Vector data sources

Vector databases are a new type of database designed to store vectors and enable efficient search over them. They return the most relevant results for a user's query. The vector search feature in a vector database allows retrieval-augmented generation to use LLMs and custom data or domain-specific information. This involves extracting relevant information from a custom data source and integrating it into the model request through prompt engineering. Before sending a request to the LLM, the user input, query, or request is transformed into an embedding, and vector search techniques are used to find the most similar embeddings in the database.

## Enhanced reasoning

Teams AI Library offers an integrated fact-checking system to tackle bot hallucinations. When a user interacts with your AI assistant, the system prompts the bot to engage in a process of self-reflection critically evaluating its potential responses before sending. The introspection allows the bot to identify inaccuracies and correct its answers, which improves accuracy, quality, and contextual relevance. Advanced reasoning ensures that your AI assistant becomes a dependable source of information and judgment, building trust in your product and drawing users back every day.

## Feedback loop

Feedback loop allows the bot to validate and correct the output of the language model. It checks the structure and parameters of the plan or monologue that the model returns and provides feedback on errors or missing information. The model then tries to fix its mistakes and returns a valid output. The feedback loop can improve the reliability and accuracy of the AI system and reduce the chances of hallucination or invalid actions.

The following table lists the updates to the Teams AI library:

|Type |Description |.NET|JavaScript|Python|
|---------|---------||||
|OpenAIModel |The OpenAIModel class lets you call both OAI and Azure OAI with one single component. New models can be defined for other model types like LLaMA2. | ✔️ |✔️|✔️|
|Embeddings | The OpenAIEmbeddings class lets you generate embeddings using either OAI or Azure OAI. New embeddings can be defined for things like OSS Embeddings. | ❌ |✔️|✔️|
|Prompts | A new object-based prompt system enables better token management and reduces the likelihood of overflowing the model's context window. | ✔️ |✔️|✔️|
| Augmentation | Augmentations simplify prompt engineering tasks by letting the developer add named augmentations to their prompt. Only `functions`, `sequence`, and `monologue` style augmentations are supported. | ✔️ |✔️|✔️|
|Data Sources | A new DataSource plugin makes it easy to add RAG to any prompt. You can register a named data source with the planner and then specify the name[s] of the data sources they wish to augment the prompt. | ❌ |✔️|✔️|

## Code samples

| Sample name                            | Description                                                                                                                                                                                                                                                           | .NET                                                                                                        | Node.js                                                                                                                | Python                                                                                                   |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Echo bot                               | This sample shows how to incorporate a basic conversational flow into a Microsoft Teams application using Bot Framework and the Teams AI library.                                                                                                                     | [View](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/01.messaging.echoBot)                 | [View](https://github.com/microsoft/teams-ai/tree/main/js/samples/01.getting-started/a.echoBot)                        | [View](https://github.com/microsoft/teams-ai/tree/main/python/samples/01.messaging.a.echoBot)            |
| Search command message extension       | This sample shows how to incorporate a basic Message Extension app into a Microsoft Teams application using Bot Framework and the Teams AI library.                                                                                                                   | [View](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/02.messageExtensions.a.searchCommand) | [View](https://github.com/microsoft/teams-ai/tree/main/js/samples/02.teams-features/a.messageExtensions.searchCommand) |
| Typeahead bot                          | This sample shows how to incorporate the typeahead search functionality in Adaptive Cards into a Microsoft Teams application using Bot Framework and the Teams AI library.                                                                                            | [View](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/03.adaptiveCards.a.typeAheadBot)      | [View](https://github.com/microsoft/teams-ai/tree/main/js/samples/02.teams-features/b.adaptiveCards.typeAheadBot)      |
| Conversational bot with AI: Teams chef | This sample shows how to incorporate a basic conversational bot behavior in Microsoft Teams. The bot is built to allow GPT to facilitate the conversation on its behalf, using only a natural language prompt file to guide it.                                       | [View](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/04.ai.a.teamsChefBot)                 | [View](https://github.com/microsoft/teams-ai/tree/main/js/samples/04.ai-apps/a.teamsChefBot)                           |
| Message extensions: GPT-ME             | This sample is a message extension (ME) for Microsoft Teams that uses the text-davinci-003 model to help users generate and update posts.                                                                                                                             | [View](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/04.ai.b.messageExtensions.gptME)      | [View](https://github.com/microsoft/teams-ai/tree/main/js/samples/03.ai-concepts/b.AI-messageExtensions)                     | [View](https://github.com/microsoft/teams-ai/tree/main/python/samples/04.ai.b.messageExtensions.AI-ME) |
| Light bot                              | This sample illustrates more complex conversational bot behavior in Microsoft Teams. The bot is built to allow GPT to facilitate the conversation on its behalf and manually defined responses, and maps user intents to user defined actions.                        | [View](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/04.ai.c.actionMapping.lightBot)       | [View](https://github.com/microsoft/teams-ai/tree/main/js/samples/03.ai-concepts/c.actionMapping-lightBot)             | [View](https://github.com/microsoft/teams-ai/tree/main/python/samples/04.ai.c.actionMapping.lightBot)    |
| List bot                               | This sample shows how to incorporate a basic conversational bot behavior in Microsoft Teams. The bot harnesses the power of AI to simplify your workflow and bring order to your daily tasks and showcases the action chaining capabilities.                          | [View](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/04.ai.d.chainedActions.listBot)       | [View](https://github.com/microsoft/teams-ai/tree/main/js/samples/03.ai-concepts/d.chainedActions-listBot)             |
| DevOps bot                             | This sample shows how to incorporate a basic conversational bot behavior in Microsoft Teams. The bot uses the gpt-3.5-turbo model to chat with Teams users and perform DevOps action such as create, update, triage and summarize work items.                         | [View](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/04.ai.e.chainedActions.devOpsBot)     | [View](https://github.com/microsoft/teams-ai/tree/main/js/samples/04.ai-apps/b.devOpsBot)                              |
| Twenty questions                       | This sample shows showcases the incredible capabilities of language models and the concept of user intent. Challenge your skills as the human player and try to guess a secret within 20 questions, while the AI-powered bot answers your queries about the secret.   | [View](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/04.e.twentyQuestions)                 | [View](https://github.com/microsoft/teams-ai/tree/main/js/samples/03.ai-concepts/a.twentyQuestions)                    |
| Math tutor assistant                   | This example shows how to create a basic conversational experience using OpenAI's Assistants APIs. It uses OpenAI's Code Interpreter tool to create an assistant that's an expert on math.                                                                            | [View](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/06.assistants.a.mathBot)              | [View](https://github.com/microsoft/teams-ai/tree/main/js/samples/04.ai-apps/d.assistants-mathBot)                     |
| Food ordering assistant                | This example shows how to create a conversational assistant that uses tools to call actions in your bots code. It's a food ordering assistant for a fictional restaurant called The Pub and is capable of complex interactions with the user as it takes their order. | [View](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/06.assistants.b.orderBot)             | [View](https://github.com/microsoft/teams-ai/tree/main/js/samples/04.ai-apps/e.assistants-orderBot)                    |

## Next step

> [!div class="nextstepaction"] > [Teams AI library capabilities](how-conversation-ai-core-capabilities.md)
