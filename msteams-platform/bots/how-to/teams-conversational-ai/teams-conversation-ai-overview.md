---
title: Introduction to Teams AI library
description: Learn about Teams AI library, Teams-centric component scaffolding, natural language modeling, prompt engineering, LLM, action planner, assistants API, augmentation.
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
author: surbhigupta12
ms.date: 11/12/2024
---

# Teams AI library

Teams AI library is a Teams-centric interface for integrating GPT-based language models and user intent engines. It simplifies the development process by reducing the need to write and maintain complex conversational bot logic.

:::image type="content" border="false" source="../../../assets/images/bots/teams-ai-library.png" alt-text="Visual representation of a user input and a bot response."lightbox="../../../assets/images/bots/teams-ai-library.png":::

You can leverage prebuilt, reusable code snippets that allow you to quickly build intelligent apps. This capabilities-driven approach allows you to focus on business logic rather than learning the intricacies of Microsoft Teams conversational frameworks.

## Why use Teams AI library?

The Teams AI library enables your apps to engage users in natural and conversational interactions. These interactions can be guided toward specific app functionalities or tasks, allowing your app to better understand and process user intent.

You can rely on the built-in conversational bot capabilities in Teams (such as Power Virtual Agents or the Bot Framework) to handle the complexities of natural language processing.

:::image type="content" source="../../../assets/images/bots/teams-ai-library-benefits.png" alt-text="Screenshot shows the benefits of using Teams AI library.":::

You can leverage Teams AI library to:

* Use prebuilt templates to add Teams app capabilities.
* Use techniques like prompt engineering to add ChatGPT like conversational experiences to your bot and built-in safety features, like moderation, help ensure your bot always responds in an appropriate manner.
* Use the library's planning engine that allows the model to identify the user's intent and then maps that intent to actions that you implement.
* Add support for any LLM of your choice without changing the bot logic.

Teams AI library supports both JavaScript and C#. It allows you to harness AI capabilities to build intelligent, user-friendly applications for Microsoft Teams. The library provides the flexibility to create AI-powered experiences using the tools and languages that best suits your project needs and ensures the best possible outcomes for your Teams users.

## How do Teams AI library features benefit me?

Teams AI library offers a variety of features that can simplify the development of your custom engine agent.

As a developer, I want to build an intelligent lightbot that controls the light in response to the user's command. I'm considering using Teams AI library because of its features that can make building my custom engine agent a breeze. I want my AI-powered lightbot to make the user experience better and keep them more involved.

How can I use the Teams AI library to make sure my custom engine agent runs smoothly and gives users a fun and interactive experience?

:::row:::
    :::column span="":::
        **Localization**
    :::column-end:::
    :::column span="2":::
        The Teams AI library uses OpenAI's GPT model for localization. User inputs in any language are translated to intents, entities, and actions. This approach eliminates the need for maintaining localization records.
    :::column-end:::
:::row-end:::
:::row:::
    :::column span="":::
        **LLM modularity**
    :::column-end:::
    :::column span="2":::
        An LLM generates coherent and diverse natural language text using latent variables. Teams AI library uses OpenAI's GPT model but it allows you to swap it with any LLM without changing the bot logic. This means you can keep your app's content outside the public domain and confined to your preferred LLM model.
    :::column-end:::
:::row-end:::
:::row:::
    :::column span="":::
        **Responsible AI**
    :::column-end:::
    :::column span="2":::
        Teams AI library helps build conversational apps with moderation hooks, conversation sweeping, and feedback loops. It supports both low code and complex scenarios. The library extends capabilities with AI constructs for natural language modeling, user intent, personalization, and automated context-aware conversations.
    :::column-end:::
:::row-end:::
:::row:::
    :::column span="":::
        **Predictive engine for mapping intents to actions**
    :::column-end:::
    :::column span="2":::
        A simple interface for actions and predictions allows a bot to react when needed. Ambient presence lets a bot learn intent, use business logic prompts, and generate responses. For example, if a user is out of office and needs to summarize a thread, the Teams AI library:

            1. Understands the intent as summarization.
            1. Uses prompts to make summarizations over time, focused on the user’s interactions.
            1. Provides actions to summarize the chat content.
:::column-end:::
:::row-end:::
:::row:::
    :::column span="":::
        **Action Planner**
    :::column-end:::
    :::column span="2":::
        Action Planner is the main component that calls your LLM and includes several features to enhance and customize your model. Model plugins simplify configuring your selected LLM to the planner and ships with an OpenAIModel that supports both OpenAI and Azure OpenAI LLMs. Add more plugins for other models like Llama-2 to give you the flexibility to choose the best model for your use case. An internal feedback loop increases reliability by fixing the subpar responses from the LLM.
    :::column-end:::
:::row-end:::
:::row:::
    :::column span="":::
        **Assistants API**
    :::column-end:::
    :::column span="2":::
        > [!NOTE]
        > Teams AI library supports both OpenAI and Azure OpenAI Assistants API in [public developer preview](~/resources/dev-preview/developer-preview-intro.md) for you to get started with building intelligent assistants.

        Assistants API allows you to create powerful AI assistants capable of performing tasks that are difficult to code using traditional methods. It provides programmatic access to OpenAI’s GPT system for tasks ranging from chat to image processing, audio processing, and building custom assistants. The API supports natural language interaction to enable the development of assistants that can understand and respond in a conversational manner.

        Follow the [quick start guide for Assistants API](assistants-api-quick-start.md) to create an assistant that specializes in mathematics.
    :::column-end:::
:::row-end:::
:::row:::
    :::column span="":::
        **Prompt management**
    :::column-end:::
    :::column span="2":::
        Dynamic prompt management allows the bot to adjust the size and content of the prompt sent to the LLM, based on the available token budget and the data sources or augmentations. It improves the efficiency and accuracy of the prompt by ensuring that it doesn't include irrelevant information or exceed the context window.
    :::column-end:::
:::row-end:::
:::row:::
    :::column span="":::
        **Augmentation**
    :::column-end:::
    :::column span="2":::
        Enhance your AI model’s responses with Augmentation. Tailor your model using different modes for accuracy and desired outcomes:

            * **Retrieval Augmented Generation (RAG)**: Incorporate real-time, dynamic external data sources for up-to-date, accurate results without re-training.
            * **Monologue**: Create AutoGPT-style agents for multi-step actions with full schema validation and automatic repair.
            * **Sequence**: Enable your AI assistant to return a sequence of actions with schema validation for reliability.
            * **Functions**: Produce structured responses using customizable user-defined functions. The Action Planner assesses and repairs model responses for reliability and consistency.
    :::column-end:::
:::row-end:::
:::row:::
    :::column span="":::
        **Vector data sources**
    :::column-end:::
    :::column span="2":::
        Vector databases are designed to store vectors to enable efficient search. They return the most relevant results for a user's query. They allow RAG to use LLMs and custom data or domain-specific information. This involves extracting relevant information from a custom data source and integrating it into the model request through prompt engineering. Before sending a request to the LLM, the user input is transformed into an embedding, and vector search techniques are used to find the most similar embedding in the database.
    :::column-end:::
:::row-end:::

:::row:::
    :::column span="":::
        **Enhanced reasoning**
    :::column-end:::
    :::column span="2":::
        Teams AI library offers an integrated fact-checking system to tackle bot hallucinations. When a user interacts with your AI assistant, it prompts the bot to critically evaluate its potential responses before sending. The bot identifies inaccuracies and corrects its answers, which improves accuracy, quality, and contextual relevance. Advanced reasoning ensures that your AI assistant becomes a dependable source of information and judgment that builds trust in the product and increases user engagement.
    :::column-end:::
:::row-end:::

:::row:::
    :::column span="":::
        **Feedback loop**
    :::column-end:::
    :::column span="2":::
        The feedback loop allows a bot to validate and correct the output of the language model. It checks the structure and parameters of the plan or monologue that the model returns and provides feedback on errors or missing information. The model attempts to fix its mistakes and return a valid output. The feedback loop can improve the reliability and accuracy of the AI system and reduce the chances of hallucinations or invalid actions.
    :::column-end:::
:::row-end:::

## Updates to Teams AI library

The following table lists the updates to the Teams AI library:

| Type | Description | .NET | JavaScript | Python |
| --- | --- |:---:|:---:|:---:|
| OpenAIModel | The OpenAIModel class allows you to call both OpenAI and Azure OpenAI with one single component. New models can be defined for other model types like Llama2. | ✔️ | ✔️ | ✔️ |
| Embeddings | The OpenAIEmbeddings class allows you to generate embeddings using either OpenAI or Azure OpenAI. New embeddings can be defined for things like OSS Embeddings. | ❌ | ✔️ | ✔️ |
| Prompts | A new object-based prompt system enables better token management and reduces the likelihood of overflowing the model's context window. | ✔️ | ✔️ | ✔️ |
| Augmentation | Augmentations simplify prompt engineering tasks by letting the developer add named augmentations to their prompt. Only `functions`, `sequence`, and `monologue` style augmentations are supported. | ✔️ |✔️ | ✔️ |
| Data Sources | A new DataSource plugin makes it easy to add RAG to any prompt. You can register a named data source with the planner and then specify the names of the data sources they wish to augment the prompt. | ❌ | ✔️ | ✔️ |

## Function calls using AI SDK

Function calls, implemented within the AI SDK, unlock numerous capabilities, enabling the AI model to generate accurate responses seamlessly. It enables direct connection with external tools, thereby making AI even more powerful. These capabilities include performing complex calculations, retrieving important data, creating smoother workflows, and enabling dynamic interactions with users.

> [!NOTE]
> Structured outputs aren't supported.

To use function calling with the Chat Completions API:

1. Set up the planner where the default prompt uses the Tools Augmentation. Update one of the following files of your bot app:

    * For a JavaScript app: Update `index.ts`.
    * For a C# bot app: Update `Program.cs`.
    * For a Python app: Update `bot.py`.

   The following code snippet shows how to set up the `ToolsAugmentation` class:

   # [JavaScript](#tab/javascript)

    ```JavaScript
    const planner = new ActionPlanner({
        model,
        prompts,
        defaultPrompt: 'tools'
    });
    ```

   # [C#](#tab/dotnet)

    ```C#
    ActionPlannerOptions<TurnState> options = new ActionPlannerOptions<TurnState>() 
    { 
        Model = model,
        Prompts = prompts,
        async (context, state, planner) =>
        {
            return await Task.FromResult(prompts.GetPrompt("Tools"));
        } 
    }
    ActionPlanner<TurnState> planner = new ActionPlanner(options)
    ```

   # [Python](#tab/python)

    ```Python
    planner = ActionPlanner(ActionPlannerOptions(model=model, prompts=prompts, default_prompt="tools"))
    ```

    ---

1. Specify tools augmentation in the `config.json` file.

    ```JSON
    {
        "schema": 1.1,
        "description": "",
        "type": "",
        "completion": {
    +       "tool_choice": "auto",
    +       "parallel_tool_calls": true,
        },
    +    "augmentation": {
    +        "augmentation_type": "tools"
    +    }
    }
    ```

1. Specify all your `function definitions` in the `actions.json` file, which is in the `prompts` folder. Ensure that you follow the schema to avoid errors when the action is called by the LLM.

    ```JSON
    [{
        "name": "CreateList",
        "description": "Creates a list"
    }]
    ```

1. Register your `handlers` in your `application` class.

    * Each handler is a callback function that runs when a specific event happens. The function call handler executes code in response to the event.
    * The function call must return a string as the output of the function call.
    * When the model requests to invoke any functions, these are mapped to `DO` commands within a `Plan` and are invoked in the AI class `run` function. The outputs are then returned to the model with tool call IDs to show that the tools were used.

   The following code snippet shows how to register `handlers`:

   # [JavaScript](#tab/javascript1)

    ```JavaScript
    app.ai.action("createList", async (context: TurnContext, state: ApplicationTurnState, parameters: ListAndItems) => {
    // Ex. create a list with name "Grocery Shopping".
    ensureListExists(state, parameters.list);
    return `list created and items added. think about your next action`;
    });
    ```

   # [C#](#tab/dotnet1)

    ```C#
    [Action("CreateList")]
    public string CreateList([ActionTurnState] ListState turnState, [ActionParameters] Dictionary<string, object> parameters)
    {
        ArgumentNullException.ThrowIfNull(turnState);
        ArgumentNullException.ThrowIfNull(parameters);

        string listName = GetParameterString(parameters, "list");

        EnsureListExists(turnState, listName);

        return "list created. think about your next action";
    }
    ```

   # [Python](#tab/python1)

    ```Python
    @app.ai.action("createList")
    async def create_list(context: ActionTurnContext, state: AppTurnState):
    ensure_list_exists(state, context.data["list"])
    # Continues exectuion of next command in the plan.
    return ""
    ```

    ---

### Enable tool options

You can enable the following tool options:

* **Enable Tool Choice**: Allow the model to select the function it must call by enabling tool selection. In the `config.json` file:

  * Set `tool_choice` as `required` to mandate the model to always call at least one function.
  * Set `tool_choice` to a specific function using its definition for using that function.
  * Set `tool_choice` as `none` to disable the tool.

  The default value of `tool_choice`is `auto`. It enables the model to select the functions that it must call.

* **Toggle Parallel Tool Calls**: Executing tools in parallel is faster and reduces the number of back-and-forth calls to the API. In the `config.json` file, you can set `parallel_tool_calls` to `true` or `false`. By default, the `parallel_tool_calls` parameter is set to `true`.

The following code snippet shows how to enable tool choice and to toggle parallel tool calls:

```JSON
{

    "schema": 1.1,
    "description": "",
    "type": "",
    "completion": {
+       "tool_choice": "auto",
+       "parallel_tool_calls": true,
    },
+    "augmentation": {
+        "augmentation_type": "tools"
+    }
}
```

## Code samples

| Sample name | Description | .NET | Node.js | Python |
| --- | --- | --- | --- | --- |
| Echo bot | This sample shows how to incorporate a conversational flow into a Microsoft Teams application using Bot Framework and the Teams AI library. | [View](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/01.messaging.echoBot) | [View](https://github.com/microsoft/teams-ai/tree/main/js/samples/01.getting-started/a.echoBot) | [View](https://github.com/microsoft/teams-ai/tree/main/python/samples/01.messaging.a.echoBot) |
| Search command message extension | This sample shows how to incorporate a basic Message Extension app into a Microsoft Teams application using Bot Framework and the Teams AI library. | [View](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/02.messageExtensions.a.searchCommand) | [View](https://github.com/microsoft/teams-ai/tree/main/js/samples/02.teams-features/a.messageExtensions.searchCommand) | [View](https://github.com/microsoft/teams-ai/tree/main/python/samples/02.messageExtensions.a.searchCommand) |
| Typeahead bot | This sample shows how to incorporate the typeahead search functionality in Adaptive Cards into a Microsoft Teams application using Bot Framework and the Teams AI library. | [View](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/03.adaptiveCards.a.typeAheadBot) | [View](https://github.com/microsoft/teams-ai/tree/main/js/samples/02.teams-features/b.adaptiveCards.typeAheadBot) | [View](https://github.com/microsoft/teams-ai/tree/main/python/samples/03.adaptiveCards.a.typeAheadBot)|
| Conversational bot with AI: Teams chef | This sample shows how to incorporate conversational bot behavior into Microsoft Teams. The bot is built to allow GPT to facilitate the conversation on its behalf, using only a natural language prompt file to guide it. | [View](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/04.ai.a.teamsChefBot) | [View](https://github.com/microsoft/teams-ai/tree/main/js/samples/04.ai-apps/a.teamsChefBot) |
| Message extensions: GPT-ME | This sample is a message extension for Microsoft Teams that uses the text-davinci-003 model to help users generate and update posts. | [View](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/04.ai.b.messageExtensions.gptME) | [View](https://github.com/microsoft/teams-ai/tree/main/js/samples/03.ai-concepts/b.AI-messageExtensions) | [View](https://github.com/microsoft/teams-ai/tree/main/python/samples/04.ai.b.messageExtensions.AI-ME) |
| Light bot | This sample illustrates more complex conversational bot behavior into Microsoft Teams. The bot is built to allow GPT to facilitate the conversation on its behalf and manually defined responses, and maps user intents to user defined actions. | [View](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/04.ai.c.actionMapping.lightBot) | [View](https://github.com/microsoft/teams-ai/tree/main/js/samples/03.ai-concepts/c.actionMapping-lightBot) | [View](https://github.com/microsoft/teams-ai/tree/main/python/samples/04.ai.c.actionMapping.lightBot) |
| List bot | This sample shows how to incorporate conversational bot behavior into Microsoft Teams. The bot harnesses the power of AI to simplify your workflow and bring order to your daily tasks and showcases the action chaining capabilities. | [View](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/04.ai.d.chainedActions.listBot) | [View](https://github.com/microsoft/teams-ai/tree/main/js/samples/03.ai-concepts/d.chainedActions-listBot) | [View](https://github.com/microsoft/teams-ai/tree/main/python/samples/04.ai.d.chainedActions.listBot)|
| DevOps bot | This sample shows how to incorporate conversational bot behavior in Microsoft Teams. The bot uses the gpt-3.5-turbo model to chat with Teams users and perform DevOps actions such as create, update, triage and summarize work items. | [View](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/04.ai.e.chainedActions.devOpsBot) | [View](https://github.com/microsoft/teams-ai/tree/main/js/samples/04.ai-apps/b.devOpsBot) |[View](https://github.com/microsoft/teams-ai/tree/main/python/samples/04.ai.e.chainedActions.devOpsBot) |
| Twenty questions | This sample shows showcases the incredible capabilities of language models and the concept of user intent. Challenge your skills as a human player and try to guess a secret within 20 questions, while the AI-powered bot answers your queries about the secret. | [View](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/04.e.twentyQuestions) | [View](https://github.com/microsoft/teams-ai/tree/main/js/samples/03.ai-concepts/a.twentyQuestions) | [View](https://github.com/microsoft/teams-ai/tree/main/python/samples/04.ai.a.twentyQuestions) |
| Math tutor assistant | This example shows how to create a conversational experience using OpenAI's Assistants APIs. It uses OpenAI's Code Interpreter tool to create an assistant that's an expert on math. | [View](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/06.assistants.a.mathBot) | [View](https://github.com/microsoft/teams-ai/tree/main/js/samples/04.ai-apps/d.assistants-mathBot) | [View](https://github.com/microsoft/teams-ai/tree/main/python/samples/06.assistants.a.mathBot) |
| Food ordering assistant | This example shows how to create a conversational assistant that uses tools to call actions in your bot's code. It's a food ordering assistant for a fictional restaurant called The Pub and is capable of complex interactions with the user as it takes their order. | [View](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/06.assistants.b.orderBot) | [View](https://github.com/microsoft/teams-ai/tree/main/js/samples/04.ai-apps/e.assistants-orderBot) | [View](https://github.com/microsoft/teams-ai/tree/main/python/samples/06.assistants.b.orderBot) |

## Next step

> [!div class="nextstepaction"]
> [Teams AI library quick start guide](conversation-ai-quick-start.md)

## See also

* [Copilot handoff](../conversations/bot-copilot-handoff.md)
* [Teams AI library FAQs](../../../teams-faq.md#teams-ai-library)
