---
title: Teams AI library new features
author: surbhigupta
description:  In this module, learn to harness the power of AI and create intelligent, user-friendly applications for Microsoft Teams using JavaScript and Csharp.
ms.topic: conceptual
ms.localizationpriority: high
ms.author: v-ypalikila
ms.date: 04/07/2022
---

# Teams AI library new

The Teams AI Library is now available for developers in JavaScript and C# languages allowing developers to harness the power of AI and create intelligent, user-friendly applications for Microsoft Teams using the programming languages they are most comfortable with. We are committed to a  mindset where you build AI products with the tools and languages you want in order to make the best experiences possible for your customers on Teams.

## Action Planner

The new ActionPlanner is the main component calling your Large Language Model (LLM) and includes several features to enhance and customize your model. Model plugins simplify configuring your selected LLM to the planner and ships with an OpenAIModel that supports both OpenAI and Azure OpenAI LLMs. Additional plugins for other models like Llama-2 can easily be added, giving you the flexibility to choose what model is best for your use case.

Reliability is dramatically increasing with an internal feedback loop that automatically fixes subpar responses from the LLM. Additionally, the management of token budgets is improved, reducing the chance of exceeding a model’s context window lowering your costs. The ActionPlanner supports augmentation expanding the capabilities and control over your model.

[Sample code reference](https://github.com/microsoft/teams-ai/blob/main/js/samples/04.ai.a.teamsChefBot/src/index.ts#L90)

```javascript
// Create AI components
const model = new OpenAIModel({
    // OpenAI Support
    apiKey: process.env.OPENAI_KEY!,
    defaultModel: 'gpt-3.5-turbo',

    // Azure OpenAI Support
    azureApiKey: process.env.AZURE_OPENAI_KEY!,
    azureDefaultDeployment: 'gpt-3.5-turbo',
    azureEndpoint: process.env.AZURE_OPENAI_ENDPOINT!,
    azureApiVersion: '2023-03-15-preview',

    // Request logging
    logRequests: true
});

const prompts = new PromptManager({
    promptsFolder: path.join(__dirname, '../src/prompts')
});

const planner = new ActionPlanner({
    model,
    prompts,
    defaultPrompt: 'chat',
});
```

## Augmentation

Say goodbye to prompt engineering headaches and say hello to efficiently enhancing and directing your AI model’s responses with Augmentation. When creating a prompt select one of the following Augmentation Modes to tailor your model to your needs, increasing its accuracy and desired outcomes:

* **Retrieval Augmented Generation (RAG)**: Automatically incorporate real-time, dynamic, and specified external datasources into your model’s responses enabling up to date and contextually accurate results without fine-tuning or re-training your model. Answer questions about today’s sales numbers or customize to a specific user’s data; with RAG your model is no longer stuck in the past. Discover how easy it is to build by trying the RAG bot sample today!
**Monologue**: Create AutoGPT-style agents capable of performing multi-step actions independently and reliability with full schema validation and automatic repair included.
**Sequences**: Enable your AI assistant to return a sequence of actions for execution with schema validation increasing reliability.
**Functions**: Produce structured responses from your model by employing user-defined Functions. These functions are customizable using JSON schemas to define the parameters and their format. The ActionPlanner assesses model responses against the schema, making repairs as needed increasing response reliability and consistency.

### Vector data sources

Vector Databases are a novel type of database designed specifically for storing Vectors and facilitating efficient search over them. They return the most relevant results for a user’s query. The vector search feature in a vector database enables retrieval-augmented generation to harness LLMs and custom data or domain-specific information. This process involves extracting pertinent information from a custom data source and integrating it into the model request through prompt engineering. Prior to sending a request to the LLM, the user input/query/request is also transformed into an embedding, and vector search techniques are employed to locate the most similar embeddings within the database. You can register named data sources with the planner and then specify the name[s] of the data sources they wish to augment the prompt with in the prompts config.json.

## Enhanced reasoningEnhanced reasoning

With enhanced reasoning, the Teams AI Library tackles the ongoing issue of bot hallucinations head-on by offering an integrated fact-checking system.

When a user interacts with your AI assistant, this system prompts the bot to engage in a process of self-reflection critically evaluating its potential responses prior to sending them. The introspection allows the bot to identify inaccuracies and correct its answers improving accuracy, quality, and contextual relevance. Advanced reasoning ensures that your AI assistant becomes a dependable source of information and judgement, building trust in your product and drawing users back every day.

## Feedback loop

A feedback loop is a feature of the Teams AI library that helps to improve the quality and user experience of conversational apps. It is an algorithm that detects when the large language model (LLM) produces a subpar or incorrect response, and feeds this information back to the LLM as input. The integration of AlphaWave gives the AI library the ability to repair malformed responses from the model. JSON Schema based Validator plugins are used to validate all structured responses from the model. If the model returns missing or invalid JSON it is asked to repair its mistake

## Schema update

The prompt schema is updated to version 1.1.

[Sample code reference](https://github.com/microsoft/teams-ai/blob/main/js/samples/04.ai.a.teamsChefBot/src/prompts/chat/config.json)

   ```json
  {
    "schema": 1.1,
    "description": "Chat with Teams Chef",
    "type": "completion",
    "completion": {
        "model": "gpt-3.5-turbo",
        "completion_type": "chat",
        "include_history": true,
        "include_input": true,
        "max_input_tokens": 2800,
        "max_tokens": 1000,
        "temperature": 0.9,
        "top_p": 0.0,
        "presence_penalty": 0.6,
        "frequency_penalty": 0.0,
        "stop_sequences": []
    },
    "augmentation": {
        "augmentation_type": "none",
        "data_sources": {
            "teams-ai": 1200
        }
    }
  }
   ```

### Query parameters

The following table includes the query parameters:

|**Value**  |**Description**  |
|---------|---------|
|`model`|ID of the model to use.|
|`completion_type`|The type of completion you would like to use for your model. Given a prompt, the model will return one or more predicted completions along with the probabilities of alternative tokens at each position. Supported options are `chat` and `text`. Default is `chat`.|
|`include_history`|Boolean value. If you want to include history. Each prompt gets its own separate conversation history to make sure that the model doesn't get confused.|
|`include_input`|Boolean value. If you want to include user's input in the prompt. How many tokens for the prompt.|
|`max_input_tokens`|The maximum number of tokens for input. Max tokens supported is 4000.|
|`max_tokens`     | The maximum number of tokens to generate in the completion. The token count of your prompt plus max_tokens can't exceed the model's context length.        |
|`temperature`    | What sampling temperature to use, between 0 and 2. Higher values like 0.8 makes the output more random, while lower values like 0.2 makes it more focused and deterministic.        |
|`top_p`    |An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. Therefore, 0.1 means only the tokens comprising the top 10% probability mass are considered.         |
|`presence_penalty`     |  Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.       |
|`frequency_penalty`     |Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.         |
|`stop_sequences`     |  Up to four sequences where the API stops generating further tokens. The returned text won't contain the stop sequence. |

# Breaking Changes

* State Management: Simpler TurnState object and no more need for a TurnStateManager class.
* Prompt Config Updates: Updated the config.json version number for prompts to 1.1.
* Prompt Management - All prompt management is now done by the Planner. This impacted the interfaces for both the Planner and Moderator.
* No more chaining - It wasn’t a super useful feature anyway and it simplifies the AI class so I removed chaining support.
* No more completePrompt() method: Planners are free to implement a completePrompt() method (the ActionPlanner will) but you can no longer access that through the AI class.

Additions:

* Models: The OpenAIModel class lets you call both OAI and Azure OAI with one single component. New models can be defined for other model types like LLaMA2

* Embeddings: The OpenAIEmbeddings class lets you generate embeddings using either OAI or Azure OAI. New embeddings can be defined for things like OSS Embeddings.</li><li>

* Prompts - A new object based prompt system (ported from promptrix) enables better token management and reduces the likelihood overflowing the models context window.

* Augmentation - Augmentations simplify prompt engineering tasks by letting the developer add named augmentations to their prompt. We currently support “functions”, “sequences”, and “monologue” style augmentations.

* Data Sources - A new DataSource plugin type makes it easy to add RAG to any prompt. Developers register named data sources with the planner and then specify the name[s] of the data sources they wish to augment the prompt with in the prompts config.json.
