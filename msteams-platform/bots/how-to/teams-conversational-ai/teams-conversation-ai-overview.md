---
title: Introduction to Teams AI library
description: Learn about Teams AI library, Teams-centric component scaffolding, natural language modeling, prompt engineering, LLM, action planner, assistants API, augmentation.
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
author: surbhigupta12
ms.date: 11/12/2024
ms.owner: angovil
---

# Teams AI library

Teams AI library provides a Teams-centric interface that integrates GPT-based language models with user intent engines. It simplifies the development process by reducing the need to write and maintain complex conversational bot logic.

:::image type="content" border="false" source="../../../assets/images/bots/teams-ai-library.png" alt-text="Visual representation of a user input and a bot response." lightbox="../../../assets/images/bots/teams-ai-library.png":::

Developers leverage prebuilt, reusable code snippets to quickly build intelligent apps. This capabilities-driven approach lets you concentrate on business logic rather than learning the intricacies of Microsoft Teams conversational frameworks.

## Why use Teams AI library?

Teams AI library enables apps to engage users in natural, conversational interactions that focus on specific app functionalities or tasks. It helps your app understand and process user intent accurately.

Developers rely on the built-in conversational bot capabilities in Teams—such as Power Virtual Agents or the Bot Framework—to handle the complexities of natural language processing.

:::image type="content" source="../../../assets/images/bots/teams-ai-library-benefits.png" alt-text="Screenshot shows the benefits of using Teams AI library.":::

Developers leverage Teams AI library to:

* Use prebuilt templates that add Teams app capabilities.
* Apply prompt engineering techniques to deliver ChatGPT-style conversational experiences, along with built-in safety features like moderation to ensure appropriate responses.
* Utilize the library's planning engine, which identifies user intent and maps it to custom actions.
* Support any LLM of your choice without altering the underlying bot logic.

Teams AI library supports both JavaScript and C#. It enables you to harness AI capabilities to build intelligent, user-friendly applications for Microsoft Teams. The library provides flexibility to create AI-powered experiences using the tools and languages that best suit your project needs and deliver optimal outcomes for Teams users.

## How do Teams AI library features benefit me?

Teams AI library offers several features that simplify the development of your custom engine agent. Consider a scenario where you build an intelligent lightbot that controls lights based on user commands. Teams AI library provides features that ensure your AI-powered lightbot runs smoothly while offering a fun, interactive user experience.

Developers can explore the following features:

:::row:::
    :::column span="":::
        **Localization**
    :::column-end:::
    :::column span="2":::
        Teams AI library uses OpenAI's GPT model to handle localization by translating user inputs into intents, entities, and actions. This approach eliminates the need for maintaining separate localization records across different languages.
    :::column-end:::
:::row-end:::

:::row:::
    :::column span="":::
        **LLM modularity**
    :::column-end:::
    :::column span="2":::
        An LLM generates coherent and diverse natural language text via latent variables. Teams AI library uses OpenAI's GPT model by default but allows you to swap it with any LLM without changing bot logic. This design keeps your app's content secure and confined to your preferred LLM model.
    :::column-end:::
:::row-end:::

:::row:::
    :::column span="":::
        **Responsible AI**
    :::column-end:::
    :::column span="2":::
        Teams AI library supports building conversational apps with moderation hooks, conversation sweeping, and feedback loops. It caters to both low-code and complex scenarios by extending capabilities with constructs for natural language modeling, user intent, personalization, and automated context-aware conversations.
    :::column-end:::
:::row-end:::

:::row:::
    :::column span="":::
        **Predictive engine for mapping intents to actions**
    :::column-end:::
    :::column span="2":::
        A simple interface for actions and predictions lets a bot react immediately. Ambient presence enables a bot to learn intent, apply business logic prompts, and generate streamlined responses. For example, when a user requires a thread summary, Teams AI library:
            1. Understands the intent as summarization.
            1. Applies prompts to generate summarizations over time based on user interactions.
            1. Executes actions that summarize the chat content.
    :::column-end:::
:::row-end:::

:::row:::
    :::column span="":::
        **Action Planner**
    :::column-end:::
    :::column span="2":::
        Action Planner serves as the primary component that calls your LLM and includes features for enhancing and customizing your model. Model plugins simplify configuring your chosen LLM and ship with an OpenAIModel that supports both OpenAI and Azure OpenAI LLMs. You add more plugins for models such as Llama-2 to choose the best model for your use case. An internal feedback loop improves reliability by addressing subpar responses from the LLM.
    :::column-end:::
:::row-end:::

:::row:::
    :::column span="":::
        **Assistants API**
    :::column-end:::
    :::column span="2":::
        > [!NOTE]
        > Teams AI library supports both OpenAI and Azure OpenAI Assistants API in [public developer preview](~/resources/dev-preview/developer-preview-intro.md) so that you get started with building intelligent assistants.

        Assistants API empowers you to create AI assistants capable of executing tasks difficult to code using traditional methods. It provides programmatic access to OpenAI’s GPT system for a range of tasks including chat, image processing, audio processing, and building custom assistants. The API supports natural language interactions that let you develop assistants which understand and respond conversationally.

        Follow the [quick start guide for Assistants API](assistants-api-quick-start.md) to build an assistant that specializes in mathematics.
    :::column-end:::
:::row-end:::

:::row:::
    :::column span="":::
        **Prompt management**
    :::column-end:::
    :::column span="2":::
        Dynamic prompt management adjusts the size and content of the prompt sent to the LLM. It uses the available token budget along with data sources or augmentations for efficiency and accuracy. This approach ensures that prompts remain relevant and do not exceed the context window.
    :::column-end:::
:::row-end:::

:::row:::
    :::column span="":::
        **Augmentation**
    :::column-end:::
    :::column span="2":::
        Augmentation enhances your AI model’s responses by tailoring different modes for accuracy and desired outcomes:
            * **Retrieval-Augmented Generation (RAG)**: Incorporate real-time, dynamic external data sources for up-to-date, accurate results without re-training.
            * **Monologue**: Create AutoGPT-style agents for multi-step actions with full schema validation and automatic repair.
            * **Sequence**: Enable your AI assistant to return a sequence of actions with schema validation for improved reliability.
            * **Functions**: Produce structured responses using customizable user-defined functions. The Action Planner assesses and repairs model responses for enhanced consistency.
    :::column-end:::
:::row-end:::

:::row:::
    :::column span="":::
        **Vector data sources**
    :::column-end:::
    :::column span="2":::
        Vector databases store vectors for efficient search operations. They return the most relevant results for a user's query and support RAG by integrating LLMs with custom or domain-specific data. User input transforms into an embedding, and vector search techniques find the most similar vectors available in the database.
    :::column-end:::
:::row-end:::

:::row:::
    :::column span="":::
        **Enhanced reasoning**
    :::column-end:::
    :::column span="2":::
        Teams AI library includes an integrated fact-checking system to mitigate bot hallucinations. When a user interacts with your AI assistant, the bot critically evaluates potential responses before sending them. This process identifies inaccuracies and corrects errors, thereby improving accuracy and contextual relevance. Advanced reasoning establishes your assistant as a dependable source, enhancing user trust and engagement.
    :::column-end:::
:::row-end:::

:::row:::
    :::column span="":::
        **Feedback loop**
    :::column-end:::
    :::column span="2":::
        The feedback loop validates and corrects the output of the language model. It checks the structure and parameters of the plan or monologue returned by the model and provides feedback on errors or missing information. The model then adjusts its output accordingly. This loop improves reliability and accuracy, significantly reducing the chances of hallucinations or invalid actions.
    :::column-end:::
:::row-end:::

## Updates to Teams AI library

The following table lists the updates to Teams AI library:

| Type                      | Description                                                                                                                                                                                                       | .NET | JavaScript | Python |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |:---:|:---:|:---:|
| OpenAIModel               | The OpenAIModel class allows you to call both OpenAI and Azure OpenAI with a single component. New models can be defined for other types, such as Llama2.                                                     | ✔️  | ✔️  | ✔️  |
| Embeddings                | The OpenAIEmbeddings class generates embeddings using either OpenAI or Azure OpenAI. New embeddings can be defined for other providers like OSS Embeddings.                                                   | ❌  | ✔️  | ✔️  |
| Prompts                   | An object-based prompt system improves token management and minimizes the risk of overflowing the model's context window.                                                                                           | ✔️  | ✔️  | ✔️  |
| Augmentation              | Augmentations simplify prompt engineering by letting developers add named augmentations to their prompt. Only `functions`, `sequence`, and `monologue` style augmentations are supported.                     | ✔️  | ✔️  | ✔️  |
| Data Sources              | A new DataSource plugin simplifies the integration of RAG into any prompt. You can register a named data source with the planner and specify the names of the desired data sources for augmentation.            | ❌  | ✔️  | ✔️  |

## Function calls using AI SDK

Function calls within the AI SDK unlock several capabilities that enable the AI model to generate accurate responses seamlessly. This feature creates a direct connection with external tools, making AI more powerful. It supports performing complex calculations, retrieving important data, creating smooth workflows, and enabling dynamic user interactions.

> [!NOTE]
> Structured outputs aren't supported.

To use function calling with the Chat Completions API, follow these steps:

1. Set up the planner where the default prompt uses the Tools Augmentation. Update one of the following files in your bot app:
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
   };
   ActionPlanner<TurnState> planner = new ActionPlanner(options);
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
   +       "parallel_tool_calls": true
       },
   +    "augmentation": {
   +        "augmentation_type": "tools"
   +    }
   }
   ```

1. Specify all your `function definitions` in the `actions.json` file, which resides in the `prompts` folder. Ensure that you follow the schema to avoid errors when the action is called by the LLM.

   ```JSON
   [{
       "name": "CreateList",
       "description": "Creates a list"
   }]
   ```

1. Register your `handlers` in your `application` class.
    * Each handler is a callback function that executes when a specific event occurs. The function call handler runs code in response to the event.
    * The function call returns a string as the output.
    * When the model requests to invoke functions, the calls map to `DO` commands within a `Plan` and execute inside the AI class `run` function. The outputs then return to the model with tool call IDs that indicate tool usage.

   The following code snippet shows how to register `handlers`:

   # [JavaScript](#tab/javascript1)

   ```JavaScript
   app.ai.action("createList", async (context: TurnContext, state: ApplicationTurnState, parameters: ListAndItems) => {
       // Example: create a list with the name "Grocery Shopping".
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
       # Continue execution of the next command in the plan.
       return ""
   ```

   ---

### Enable tool options

You can enable the following tool options:

* **Enable Tool Choice**: Allow the model to select the function it must call by enabling tool selection. In the `config.json` file:
  * Set `tool_choice` to `required` to mandate that the model always calls at least one function.
  * Set `tool_choice` to a specific function using its definition if you wish to restrict the selection.
  * Set `tool_choice` to `none` to disable the tool.
  
  The default value of `tool_choice` is `auto`, which permits the model to select the appropriate function call.

* **Toggle Parallel Tool Calls**: Execute tools in parallel to reduce API call latency. In the `config.json` file, set `parallel_tool_calls` to either `true` or `false`. The default for `parallel_tool_calls` is `true`.

The following code snippet shows how to enable tool choice and toggle parallel tool calls:

```JSON
{
    "schema": 1.1,
    "description": "",
    "type": "",
    "completion": {
+       "tool_choice": "auto",
+       "parallel_tool_calls": true
    },
+    "augmentation": {
+        "augmentation_type": "tools"
+    }
}
```

> [!NOTE]
> As a developer utilizing the AI SDK, you can [share valuable feedback](../../../feedback.md) or [seek support](https://github.com/microsoft/teams-ai/issues/new?template=bug.yml) to enhance your experience.

## Code samples

| Sample name                           | Description                                                                                                                                                                                                         | .NET                                                                                                              | Node.js                                                                                                               | Python                                                                                                                |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Echo bot                              | This sample shows how to incorporate a conversational flow into a Microsoft Teams application using Bot Framework and Teams AI library.                                                                              | [View](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/01.messaging.echoBot)                         | [View](https://github.com/microsoft/teams-ai/tree/main/js/samples/01.getting-started/a.echoBot)                           | [View](https://github.com/microsoft/teams-ai/tree/main/python/samples/01.messaging.a.echoBot)                          |
| Search command message extension      | This sample demonstrates how to integrate a basic Message Extension app into a Microsoft Teams application using Bot Framework and Teams AI library.                                                                | [View](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/02.messageExtensions.a.searchCommand)           | [View](https://github.com/microsoft/teams-ai/tree/main/js/samples/02.teams-features/a.messageExtensions.searchCommand)     | [View](https://github.com/microsoft/teams-ai/tree/main/python/samples/02.messageExtensions.a.searchCommand)            |
| Typeahead bot                         | This sample illustrates how to incorporate typeahead search functionality in Adaptive Cards within a Microsoft Teams application using Bot Framework and Teams AI library.                                         | [View](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/03.adaptiveCards.a.typeAheadBot)                 | [View](https://github.com/microsoft/teams-ai/tree/main/js/samples/02.teams-features/b.adaptiveCards.typeAheadBot)           | [View](https://github.com/microsoft/teams-ai/tree/main/python/samples/03.adaptiveCards.a.typeAheadBot)                   |
| Conversational bot with AI: Teams chef| This sample shows how to integrate conversational bot behavior into Microsoft Teams. The bot uses a natural language prompt file to guide GPT in facilitating the conversation on its behalf.                   | [View](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/04.ai.a.teamsChefBot)                          | [View](https://github.com/microsoft/teams-ai/tree/main/js/samples/04.ai-apps/a.teamsChefBot)                               |                                                                                                                       |
| Message extensions: GPT-ME            | This sample provides a message extension for Microsoft Teams that uses the text-davinci-003 model to help users generate and update posts.                                                                         | [View](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/04.ai.b.messageExtensions.gptME)                 | [View](https://github.com/microsoft/teams-ai/tree/main/js/samples/03.ai-concepts/b.AI-messageExtensions)                   | [View](https://github.com/microsoft/teams-ai/tree/main/python/samples/04.ai.b.messageExtensions.AI-ME)                   |
| Light bot                             | This sample demonstrates complex conversational bot behavior in Microsoft Teams. The bot uses GPT for facilitating the conversation along with manually defined responses, mapping user intents to defined actions. | [View](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/04.ai.c.actionMapping.lightBot)                  | [View](https://github.com/microsoft/teams-ai/tree/main/js/samples/03.ai-concepts/c.actionMapping-lightBot)                 | [View](https://github.com/microsoft/teams-ai/tree/main/python/samples/04.ai.c.actionMapping.lightBot)                    |
| List bot                              | This sample shows how to integrate conversational bot behavior into Microsoft Teams. The bot harnesses AI to simplify workflows and organize daily tasks, showcasing action chaining capabilities.             | [View](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/04.ai.d.chainedActions.listBot)                  | [View](https://github.com/microsoft/teams-ai/tree/main/js/samples/03.ai-concepts/d.chainedActions-listBot)                 | [View](https://github.com/microsoft/teams-ai/tree/main/python/samples/04.ai.d.chainedActions.listBot)                    |
| DevOps bot                            | This sample illustrates how to integrate conversational bot behavior into Microsoft Teams. The bot uses the gpt-3.5-turbo model to chat with Teams users and perform DevOps actions such as creating, updating, triaging, and summarizing work items. | [View](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/04.ai.e.chainedActions.devOpsBot)                 | [View](https://github.com/microsoft/teams-ai/tree/main/js/samples/04.ai-apps/b.devOpsBot)                                 | [View](https://github.com/microsoft/teams-ai/tree/main/python/samples/04.ai.e.chainedActions.devOpsBot)                   |
| Twenty questions                      | This sample showcases the capabilities of language models in determining user intent. Users challenge the AI-powered bot by guessing a secret within 20 questions, while the assistant answers queries about the secret. | [View](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/04.e.twentyQuestions)                           | [View](https://github.com/microsoft/teams-ai/tree/main/js/samples/03.ai-concepts/a.twentyQuestions)                       | [View](https://github.com/microsoft/teams-ai/tree/main/python/samples/04.ai.a.twentyQuestions)                           |
| Math tutor assistant                  | This example shows how to create an interactive conversational experience using OpenAI's Assistants APIs. It employs OpenAI's Code Interpreter tool to build an assistant highly skilled in math.         | [View](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/06.assistants.a.mathBot)                         | [View](https://github.com/microsoft/teams-ai/tree/main/js/samples/04.ai-apps/d.assistants-mathBot)                        | [View](https://github.com/microsoft/teams-ai/tree/main/python/samples/06.assistants.a.mathBot)                           |
| Food ordering assistant               | This example demonstrates how to create a conversational assistant that uses tools to call action functions in your bot's code. It represents a food ordering system for a fictional restaurant called The Pub and supports complex user interactions during the order process. | [View](https://github.com/microsoft/teams-ai/tree/main/dotnet/samples/06.assistants.b.orderBot)                         | [View](https://github.com/microsoft/teams-ai/tree/main/js/samples/04.ai-apps/e.assistants-orderBot)                        | [View](https://github.com/microsoft/teams-ai/tree/main/python/samples/06.assistants.b.orderBot)                           |

## Next step

> [!div class="nextstepaction"]
> [Teams AI library quick start guide](conversation-ai-quick-start.md)

## See also

* [Copilot handoff](../conversations/bot-copilot-handoff.md)
* [Teams AI library FAQs](../../../teams-faq.md#teams-ai-library)