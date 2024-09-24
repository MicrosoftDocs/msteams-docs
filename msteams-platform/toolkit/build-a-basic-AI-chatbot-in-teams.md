---
title: Build a basic AI Chatbot in Teams
author: surbhigupta
description: Learn how to build and customize a basic AI chatbot using Teams AI library in Teams Toolkit, about bot app source code and workflow.
ms.topic: conceptual
ms.localizationpriority: high
ms.author: surbhigupta
ms.date: 09/16/2024
---

# Build a basic AI chatbot

The AI chatbot template showcases a bot app, similar to ChatGPT, that responds to user questions and allows users to interact with the AI bot in  Microsoft Teams. [Teams AI library](../bots/how-to/teams-conversational-ai/teams-conversation-ai-overview.md) is used to build the app template, providing the capabilities to create AI-based Teams applications.

## Prerequisites

| Install | For using... |
| --- | --- |
| [Visual Studio Code](https://code.visualstudio.com/download) | JavaScript, TypeScript, or Python build environments. Use the latest version. |
| [Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) | Microsoft Visual Studio Code extension that creates a project scaffolding for your app. Use the latest version.|
| [Node.js](https://nodejs.org/en/download/) | Back-end JavaScript runtime environment. For more information, see [Node.js version compatibility table for project type](~/toolkit/build-environments.md#nodejs-version-compatibility-table-for-project-type).|
| [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Microsoft Teams to collaborate with everyone you work with through apps for chat, meetings, and calls all in one place.|
| [Azure OpenAI](https://oai.azure.com/portal)| First create your OpenAI API key to use OpenAI's Generative Pretrained Transformer (GPT). If you want to host your app or access resources in Azure, you must create an Azure OpenAI service.|

## Create a new basic AI chatbot project

1. Open **Visual Studio Code**.
 
1. Select the Teams Toolkit :::image type="icon" source="~/assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.PNG" border="false"::: icon in the Visual Studio Code **Activity Bar**

1. Select **Create a New App**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/create-new-app.png" alt-text="Screenshot shows the location of the Create New Project link in the Teams Toolkit sidebar.":::

1. Select **Custom Engine Agent**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/custom-copilot.png" alt-text="Screenshot shows the option to select custom engine agent as the new project to create.":::

1. Select **Basic AI Chatbot**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/basic-ai-chatbot.png" alt-text="Screenshot shows the option to select app features using AI library list.":::

1. Select **JavaScript**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/language-javascript.png" alt-text="Screenshot shows the option to select the programming language.":::

1. Select **Azure OpenAI**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/azure-openai.png" alt-text="Screenshot shows the option to select the LLM.":::

1. Enter your **OpenAI** or **Azure OpenAI** credentials based on the service you select. Select **Enter**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/azure-open-api-key-optional.png" alt-text="Screenshot shows the location to enter Azure open API key.":::

1. Select **Default folder**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/default-folder.png" alt-text="Screenshot shows the location app folder to save.":::

    To change the default location, follow these steps:

      1. Select **Browse**.
      1. Select the location for the project workspace.
      1. Select **Select Folder**.

1. Enter an application name for your app and then select the **Enter** key.

     :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/application-name.png" alt-text="Screenshot shows the option to enter the suitable name.":::

    You've successfully created your AI chat bot project workspace. 

    :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/ai-chatbot-project-output.png" alt-text="Screenshot shows the ai chatbot created and readme file is available.":::

1. Under **EXPLORER**, go to the **env** > **.env.testtool.user** file.

1. Update the following details:

    * `SECRET_AZURE_OPENAI_API_KEY=<your-key>`
    * `AZURE_OPENAI_ENDPOINT=<your-endpoint>`
    * `AZURE_OPENAI_DEPLOYMENT_NAME=<your-deployment>`

   :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/env-testtool-user.png" alt-text="Screenshot shows the details updated in the env file.":::

1. To debug your app, select the **F5** key or from the left pane, select **Run and Debug (Ctrl+Shift+D)** and then select **Debug in Test Tool (Preview)** from the dropdown list.

   :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/debug-test-tool.png" alt-text="Screenshot shows the selection of debugging option from the list of options.":::

Test Tool opens the bot in a webpage.

   :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/basic-ai-chatbot-final-output.png" alt-text="Screenshot shows the bot response with basic AI chatbot." lightbox="../assets/images/teams-toolkit-v2/custom-copilot/chat-bot-output.png":::

## Take a tour of the bot app source code

# [JavaScript](#tab/javascript)

| Folder       | Contents                                            |
| - | - |
| `.vscode`    | Visual Studio Code files for debugging.                         |
| `appPackage` | Templates for the Teams application manifest.      |
| `env`        | Environment files.                                   |
| `infra`      | Templates for provisioning Azure resources.          |
| `src`        | The source code for the application.                |
|`teamsapp.yml`|This is the main Teams Toolkit project file. The project file defines two primary things:  Properties and configuration Stage definitions. |
|`teamsapp.local.yml`|This overrides `teamsapp.yml` with actions that enable local execution and debugging.|
|`teamsapp.testtool.yml`|This overrides `teamsapp.yml` with actions that enable local execution and debugging in Teams App Test Tool.|
|`src/index.js`| Sets up the bot app server.|
|`src/adapter.js`| Sets up the bot adapter.|
|`src/config.js`| Defines the environment variables.|
|`src/prompts/chat/skprompt.txt`| Defines the prompt.|
|`src/prompts/chat/config.json`| Configures the prompt.|
|`src/app/app.js`| Handles business logics for the basic AI chatbot.|

# [Python](#tab/python)

| File                                 | Contents                                           |
| - | - |
| `.vscode`    | Visual Studio Code files for debugging.                          |
| `appPackage` | Templates for the Teams application manifest.        |
| `env`        | Environment files.                                   |
| `infra`      | Templates for provisioning Azure resources.          |
| `src`        | The source code for the application.                 |
|`teamsapp.yml`|This is the main Teams Toolkit project file. The project file defines two primary things:  Properties and configuration Stage definitions. |
|`teamsapp.local.yml`|This overrides `teamsapp.yml` with actions that enable local execution and debugging.|
|`teamsapp.testtool.yml`|This overrides `teamsapp.yml` with actions that enable local execution and debugging in Teams App Test Tool.|
|`src/app.py`| Hosts an aiohttp API server and exports an app module.|
|`src/bot.py`| Handles business logics for the basic AI chatbot.|
|`src/config.py`| Defines the environment variables.|
|`src/prompts/chat/skprompt.txt`| Defines the prompt.|
|`src/prompts/chat/config.json`| Configures the prompt.|

---

## How Teams AI chatbot works

Teams AI library provides a flow to build an intelligent chatbot with AI capabilities as follows:

:::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/teams-ai-chatbot-process.png" alt-text="Screenshot shows the typical flow of AI chatbot."Lightbox="../assets/images/teams-toolkit-v2/custom-copilot/teams-ai-chatbot-process.png":::

* **TurnContext**: The turn context object provides information about the activity, such as the sender and receiver, the channel, and other data needed to process the activity.

* **TurnState**: The turn state object, similar to a cookie, stores data for the current turn. This object, as the turn context, is carried through the entire application logic, including the activity handlers and the AI system.

* **Authentication**: If user authentication is configured, Teams AI attempts to sign the user in. If the user is already signed in, the SDK retrieves the access token and continues. Otherwise, the SDK initiates the sign-in flow and ends the current turn.

* **Activity Handlers**: Teams AI library executes a set of registered activity handlers, enabling you to handle several types of activities. The activity handler system is the primary method for implementing bot or message extension app logic. It's a set of methods and configurations that allow you to register callbacks, known as route handlers, which trigger based on the incoming activity. The incoming activity can be in the form of a message, message reaction, or virtually any interaction within the Teams app.

* **AI system**: The AI system in Teams AI library is responsible for moderating input and output, generating plans, and executing them. It can be used as a standalone or routed to by the app object. The important concepts are as follows:

    1. [**Prompt manager**](https://github.com/microsoft/teams-ai/blob/main/getting-started/CONCEPTS/PROMPTS.md): Prompts play a crucial role in communicating and directing the behavior of Large Language Models (LLMs) AI.
    1. [**Planner**](https://github.com/microsoft/teams-ai/blob/main/getting-started/CONCEPTS/PLANNER.md): The planner receives the user's request, which is in the form of a prompt or prompt template, and returns a plan to fulfill it. This is achieved by using AI to mix and match atomic functions, known as actions, that are registered to the AI system. These actions are recombined into a series of steps that complete a goal.
    1. [**Actions**](https://github.com/microsoft/teams-ai/blob/main/getting-started/CONCEPTS/ACTIONS.md): An action is an atomic function that is registered to the AI system. 

* **AfterTurn handler**: After the activity handler or AI system is executed, Teams AI library executes an `afterTurn` handler. The handler allows you to perform an action after the turn. If it returns as `true`, the SDK saves the turn state to storage.

* **Respond to user**: Teams AI library saves the state and the bot can send the responses to the user.

## Customize basic AI chatbot

You can add customizations on top of the basic app to build complex scenarios as follows:

1. **Customize prompt**: Prompts play a crucial role in communicating and directing the behavior of LLMs AI. They serve as inputs or queries that users can provide to elicit specific responses from a model. Here's a prompt that asks the LLM for name suggestions:

     **Request**
     ```
     Give me 3 name suggestions for my pet golden retriever.
     ```
     **Response**
     ```
     Some possible name suggestions for a pet golden retriever are:
     - Bailey
     - Sunny
     - Cooper
     ```
    
     To use project generated with Teams Toolkit, you can author the prompts in the `src/prompts/chat/skprompt.txt` file. The prompts written in this file are inserted into the prompt used to instruct the LLM. Teams AI library defines the following syntax that you can use in the prompt text:
    
     # [Syntax 1](#tab/syntax1)
    
     1. `{{ $[scope].property }}`: Teams AI library renders the value of a property that is scoped and defined within the turn state. It defines three such scopes: temp, user, and conversation. If no scope is specified,  by default, the library uses the temp scope.
    
     1. The `{{$[scope].property}}` is used in the following way:
    
        # [JavaScript](#tab/javascript1)
    
        1. In the `src/app/turnState.ts` file, define your temp state, user state, conversation state, and app turn state. If the `turnState.ts` file doesn't exist in your project, create it under `src/app`.
    
            ```javascript
            import { DefaultConversationState, DefaultTempState, DefaultUserState, TurnState } from "@microsoft/teams-ai";

            export interface TempState extends DefaultTempState {  }
            export interface UserState extends DefaultUserState {  }
            export interface ConversationState extends DefaultConversationState {
                tasks: Record<string, Task>;
            }

            export interface Task {
                title: string;
                description: string;
            }

            export type ApplicationTurnState = TurnState<ConversationState, UserState, TempState>;
            ```

        1. In the `src/app/app.ts` file, use app turn state to initialize the app.
    
            ```javascript
            const storage = new MemoryStorage();
            const app = new Application<ApplicationTurnState>({
              storage,
              ai: {
                planner,
              },
            });
            ```

        1. In the `src/prompts/chat/skprompt.txt` file, use the scoped state property such as `{{$conversation.tasks}}`.
    
        # [Python](#tab/python1)
    
        1. In the `src/state.py` file, define your temp state, user state, conversation state, and app turn state.
    
            ```python
            from teams.state import TempState, ConversationState, UserState, TurnState
        
            class AppConversationState(ConversationState):
            tasks: Dict[str, Task] # Your data definition here
        
                @classmethod
                async def load(cls, context: TurnContext, storage: Optional[Storage] = None) -> "AppConversationState":
                    state = await super().load(context, storage)
                    return cls(**state)
        
            class AppTurnState(TurnState[AppConversationState, UserState, TempState]):
                conversation: AppConversationState
        
                @classmethod
                async def load(cls, context: TurnContext, storage: Optional[Storage] = None) -> "AppTurnState":
                    return cls(
                        conversation=await AppConversationState.load(context, storage),
                        user=await UserState.load(context, storage),
                        temp=await TempState.load(context, storage),
                    )
            ```
    
        1. In the `src/bot.py` file, user app turn state to initialize app.
    
            ```python
            from state import AppTurnState
        
            app = Application[AppTurnState](...)
            ```
    
        1. In the `src/prompts/chat/skprompt.txt` file, use the scoped state property such as `{{$conversation.tasks}}`.
`
         ---
    
     # [Syntax 2](#tab/syntax2)
    
     1. `{{ functionName }}`: To call an external function and embed the result in your text, use the `{{ functionName }}` syntax. For example, if you have a function called `getTasks` that can return a list of task items, you can embed the results into the prompt:
    
        # [JavaScript](#tab/javascript2)
    
        1. Register the function in the prompt manager in the `src/app/app.ts` file:
    
            ```typescript
            prompts.addFunction("getTasks", async (context: TurnContext, memory: Memory, functions: PromptFunctions, tokenizer: Tokenizer, args: string[]) => {
            return ...
            });
            ```
    
        1. Use the function in  `src/prompts/chat/skprompt.txt: Your tasks are: {{ getTasks }}`.
    
        # [Python](#tab/python2)
    
        1. Register the function into prompt manager in the `src/bot.py` file:
    
            ```python
            @prompts.function("getTasks")
            async def get_tasks(
                _context: TurnContext,
                state: MemoryBase,
                _functions: PromptFunctions,
                _tokenizer: Tokenizer,
                _args: List[str],
            ):
                return state.get("conversation.tasks")
            ```
    
        1. Use the function in the `src/prompts/chat/skprompt.txt: Your tasks are: {{ getTasks }}`.
         ---
    
     # [Syntax 3](#tab/syntax3)
    
     `{{ functionName arg1 arg2 }}`: This syntax enables you to call the specified function with the provided arguments and renders the result. Similar to the usage of calling a function, you can:
    
     1. Register the function in prompt manager:
          * For JavaScript language, register it in `src/app/app.ts`.
          * For Python language, register it in `src/bot.py`.
    
     1. Use the function in `src/prompts/chat/skprompt.txt: Your `task is: {{ getTasks taskTitle }}`.
    
     ---

1. **Customize user input**: Teams AI library allows you to augment the prompt sent to LLM by including the user inputs. When including user inputs, you need to specify it in a prompt configuration file by setting `completion.include_input` to `true` in `src/prompts/chat/config.json`. You can also optionally configure the maximum number of user input tokens in `src/prompts/chat/config.json` by changing `completion.max_input_tokens`. This is useful when you want to limit the length of user inputs to avoid exceeding the token limit.

1. **Customize conversation history**: The SDK automatically manages the conversation history, and you can customize as follows:

    * In `src/prompts/chat/config.json`, configure `completion.include_history`. If `true`, the history is inserted into the prompt to let LLM aware of the conversation context.
    
    * Maximum number of history messages. Configure `max_history_messages` when initializing `PromptManager`.
    
        # [JavaScript](#tab/javaScript3)
        
        ```javascript

        const prompts = new PromptManager({
        promptsFolder: path.join(__dirname, "../prompts"),
        max_history_messages: 3,
        });
        ```
        
        # [Python](#tab/python3)
        
        ```python
        
        prompts = PromptManager(PromptManagerOptions(
            prompts_folder=f"{os.getcwd()}/prompts",
            max_history_messages=3,
        ))
        
        ```
        ---
    
    * Maximum number of history tokens. Configure `max_conversation_history_tok`ens when initializing `PromptManager`.
    
        # [JavaScript](#tab/javaScript4)
        
        ```javascript
        
        const prompts = new PromptManager({
            promptsFolder: path.join(__dirname, "../prompts"),
            max_conversation_history_tokens: 1000,
        });
        
        ```
        
        # [Python](#tab/python4)
        
        ```python
        
        prompts = PromptManager(PromptManagerOptions(
            prompts_folder=f"{os.getcwd()}/prompts",
            max_conversation_history_tokens=1000,
        ))
        
        ```
        ---
    
1. **Customize model type**: You can use a specific model for a prompt. In the `src/prompts/chat/config.json` file, configure `completion.model`. If no model is configured for the prompt, the default model configured in `OpenAIModel` is used.

    The models that support the SDK as follows:

    | Model | Supported |
    | --- | --- |
    | gpt-3.5-turbo | Supported |
    | gpt-3.5-turbo-16k | Supported |
    | gpt-3.5-turbo-instruct | Not supported from 1.1.0 |
    | gpt-4 | Supported |
    | gpt-4-32k | Supported |
    | gpt-4-vision | Supported |
    | gpt-4-turbo | Supported |
    | DALL·E | Not supported |
    | Whisper | Not supported |
    | TTS | Not supported |

1. **Customize model parameters**:

    In the `src/prompts/chat/config.json` file, configure the model parameters under completion as follows:

    * **Max_tokens**: The maximum number of tokens to generate.
    * **Temperature**: The models temperature as a number between 0 and 2.
    * **Top_p**: The models `top_p` as a number between 0 and 2.
    * **Presence_penalty**: The models `presence_penalty` as a number between 0 and 1.
    * **Frequency_penalty**: The models `frequency_penalty` as a number between 0 and 1.
    * **Stop_sequences**: Array of stop sequences that when hit stops generation.

## See also

[Teams AI library](../bots/how-to/teams-conversational-ai/teams-conversation-ai-overview.md)

