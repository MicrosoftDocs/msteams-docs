---
title: Build an AI Agent in Teams
author: surbhigupta
description: Learn how to build AI Agent in Teams AI library using Assistants API within Teams Toolkit, customize prompt augmentation, and assistant creation.
ms.topic: conceptual
ms.localizationpriority: high
ms.author: surbhigupta
ms.date: 09/16/2024
---

# Build an AI agent bot in Teams

An AI agent in Microsoft Teams is a conversational chatbot that uses Large Language Models (LLMs) to interact with the users. It understands user intentions and selects a sequence of actions, enabling the chatbot to complete common tasks.

:::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/build-ai-agent.png" alt-text="Screenshot shows the process of build AI agent bot requests and responses."Lightbox="../assets/images/teams-toolkit-v2/custom-copilot/build-ai-agent.png":::

## Prerequisites

| Install | For using... |
| --- | --- |
| [Visual Studio Code](https://code.visualstudio.com/download) | JavaScript, TypeScript, or Python build environments. Use the latest version. |
| [Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) | Microsoft Visual Studio Code extension that creates a project scaffolding for your app. Use the latest version.|
| [Node.js](https://nodejs.org/en/download/) | Back-end JavaScript runtime environment. For more information, see [Node.js version compatibility table for project type](~/toolkit/build-environments.md#nodejs-version-compatibility-table-for-project-type).|
| [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Microsoft Teams to collaborate with everyone you work with through apps for chat, meetings, and calls all in one place.|
| [Azure OpenAI](https://oai.azure.com/portal)| First create your OpenAI API key to use OpenAI's Generative Pretrained Transformer (GPT). If you want to host your app or access resources in Azure, you must create an Azure OpenAI service.|

## Create a new AI agent project

1. Open **Visual Studio Code**.

1. Select the Teams Toolkit :::image type="icon" source="~/assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.PNG" border="false"::: icon in the Visual Studio Code **Activity Bar**

1. Select **Create a New App**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/create-new-app.png" alt-text="Screenshot shows the location of the Create New Project link in the Teams Toolkit sidebar.":::

1. Select **Custom Engine Agent**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/custom-copilot.png" alt-text="Screenshot shows the option to select custom engine agent as the new project to create.":::

1. Select **AI Agent**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/ai-agent.png" alt-text="Screenshot shows the option to select app features using AI library list.":::

1. To build an app, select any of the following options:

   # [Build new](#tab/buildnew)

    1. Select **Build New**.

       :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/build-new.png" alt-text="Screenshot shows the option to select the available AI agents.":::

    1. Select **JavaScript**.

       :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/language-javascript.png" alt-text="Screenshot shows the option to select the programming language.":::

    1. By default **OpenAI** service gets selected, you can optionally enter the credentials to access OpenAI. Select **Enter**.

       :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/azure-open-api-key-optional.png" alt-text="Screenshot shows the location to enter Azure open API key.":::

    1. Select **Default folder**.

       :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/default-folder.png" alt-text="Screenshot shows the location app folder to save.":::

       To change the default location, follow these steps:

         1. Select **Browse**.
         1. Select the location for the project workspace.
         1. Select **Select Folder**.

    1. Enter an app name for your app and then select the **Enter** key.

       :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/application-name.png" alt-text="Screenshot shows the option to enter the suitable name.":::

       You've successfully created your AI agent bot.

       :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/ai-agent-project-output-biuld-new.png" alt-text="Screenshot shows the ai chatbot created and readme file is available.":::

    1. Under **EXPLORER**, go to the **env** > **.env.testtool.user** file.

    1. Update the following values:
       * `SECRET_AZURE_OPENAI_API_KEY=<your-key>`
       * `AZURE_OPENAI_ENDPOINT=<your-endpoint>`
       * `AZURE_OPENAI_DEPLOYMENT_NAME=<your-deployment>`

        :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/env-testtool-user.png" alt-text="Screenshot shows the details updated in the env file.":::

    1. To debug your app, select the **F5** key or from the left pane, select **Run and Debug (Ctrl+Shift+D)** and then select **Debug in Test Tool (Preview)** from the dropdown list.

         :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/debug-test-tool.png" alt-text="Screenshot shows the selection of debugging option from the list of options.":::

    Test Tool opens the bot in a webpage.

      :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/ai-agent-build-new-final-output.png" alt-text="Screenshot shows the final output of AI agent build new bot." lightbox="../assets/images/teams-toolkit-v2/custom-copilot/ai-agent-new-output.png":::

   ## Take a tour of the bot app source code

    | Folder       | Contents                                            |
    | - | - |
    | `.vscode`    | Visual Studio Code files for debugging.                          |
    | `appPackage` | Templates for the Teams app manifest.        |
    | `env`        | Environment files.                                   |
    | `infra`      | Templates for provisioning Azure resources.          |
    | `src`        | The source code for the app.                |

    The following files can be customized and they demonstrate an example of implementation to get you started:

    | File                                 | Contents                                           |
    | - | - |
    |`src/index.js`| Sets up the bot app server.|
    |`src/adapter.js`| Sets up the bot adapter.|
    |`src/config.js`| Defines the environment variables.|
    |`src/prompts/planner/skprompt.txt`| Defines the prompt.|
    |`src/prompts/planner/config.json`| Configures the prompt.|
    |`src/prompts/planner/actions.json`| Defines the actions.|
    |`src/app/app.js`| Handles business logics for the AI Agent.|
    |`src/app/messages.js`| Defines the message activity handlers.|
    |`src/app/actions.js`| Defines the AI actions.|

    The following are Teams Toolkit specific project files. For more information on how Teams Toolkit works, see [a complete guide on GitHub](https://github.com/OfficeDev/TeamsFx/wiki/Teams-Toolkit-Visual-Studio-Code-v5-Guide#overview):

    | File                                 | Contents                                           |
    | - | - |
    |`teamsapp.yml`|This is the main Teams Toolkit project file. The project file defines the properties and configuration stage definitions. |
    |`teamsapp.local.yml`|This overrides `teamsapp.yml` with actions that enable local execution and debugging.|
    |`teamsapp.testtool.yml`|This overrides `teamsapp.yml` with actions that enable local execution and debugging in Teams App Test Tool.|

   # [Assistants API](#tab/assistantsapi)

    1. Select **Build with Assistants API Preview**.

       :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/build-assistants-api.png" alt-text="Screenshot shows the option to select the available AI agents.":::

    1. Select **JavaScript**.

       :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/language-javascript.png" alt-text="Screenshot shows the option to select the programming language.":::

       > [!NOTE]
       >
       > * If the building agent is selected as Build with Assistants API, Azure OpenAI service has not provided support for Assistants API.
       > * The `AssistantsPlanner` in Teams AI Library is in preview.

    1. Select **Azure OpenAI** or **OpenAI**.

       :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/azure-openai.png" alt-text="Screenshot shows the option to select the LLM.":::

    1. Enter your **Azure OpenAI** or **OpenAI** credentials based on the service you select. Select **Enter**.

       :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/azure-open-api-key-optional.png" alt-text="Screenshot shows the location to enter Azure open API key.":::

    1. Select **Enter**.

    1. Select **Default folder**.

       :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/default-folder.png" alt-text="Screenshot shows the location app folder to save.":::

       To change the default location, follow these steps:

         1. Select **Browse**.
         1. Select the location for the project workspace.
         1. Select **Select Folder**.

    1. Enter an app name for your app and then select the **Enter** key.

       :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/application-name.png" alt-text="Screenshot shows the option to enter the suitable name.":::

       You've successfully created your AI agent bot.

       :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/ai-agent-project-output-biuld-assistant-api.png" alt-text="Screenshot shows the ai chatbot created and readme file is available.":::

       **Create your own OpenAI Assistant**

        Before running or debugging your bot, follow these steps to set up your own [OpenAI Assistant](https://platform.openai.com/docs/assistants/overview).

        **If you haven't setup any Assistant yet**

        * This app template provides script `src/creator.js` to help create assistant. You can change the instructions and settings in the script to customize the assistant.

        * After creation, you can change and manage your assistants on [OpenAI](https://platform.openai.com/assistants).

        1. Open terminal and run the following command to install all dependency packages:

            ```
            > npm install
            ```

        1. Run the following command to run assistant:

            ```
            > npm run assistant:create -- <your-openai-api-key>
            ```

        1. You'll get an output as **Created a new assistant with an ID of: asst_xxx...**.

    1. Go to **Visual Studio Code**, Under **EXPLORER**, select the **env** > **.env.*.users** file.

    1. Update the following values:
          * `SECRET_OPENAI_API_KEY=<your-openai-api-key>`
          * `OPENAI_ASSISTANT_ID=<your-openai-assistant-id>`

    1. To debug your app, select the **F5** key or from the left pane, select **Run and Debug (Ctrl+Shift+D)** and then select **Debug in Test Tool (Preview)** from the dropdown list.

         :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/debug-test-tool.png" alt-text="Screenshot shows the selection of debugging option from the list of options.":::

    Test Tool opens the bot in a webpage.

      :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/ai-agent-build-assistant-api-final-output.png" alt-text="Screenshot shows the final output of AI agent build with assistants API bot." lightbox="../assets/images/teams-toolkit-v2/custom-copilot/ai-agent-assistant-api-output.png":::

   ## Take a tour of the bot app source code

    | Folder       | Contents                                            |
    | - | - |
    | `.vscode`    | Visual Studio Code files for debugging.                        |
    | `appPackage` | Templates for the Teams application manifest.        |
    | `env`        | Environment files.                                   |
    | `infra`      | Templates for provisioning Azure resources.          |
    | `src`        | The source code for the application.                 |

    The following files can be customized and they demonstrate an example of implementation to get you started:

    | File                                 | Contents                                           |
    | - | - |
    |`src/index.js`| Sets up the bot app server.|
    |`src/adapter.js`| Sets up the bot adapter.|
    |`src/config.js`| Defines the environment variables.|
    |`src/creator.js`| One-time tool to create OpenAI Assistant.|
    |`src/app/app.js`| Handles business logics for the AI Agent.|
    |`src/app/messages.js`| Defines the message activity handlers.|
    |`src/app/actions.js`| Defines the AI actions.|

    The following are Teams Toolkit specific project files. For more information on how Teams Toolkit works, see [a complete guide on GitHub](https://github.com/OfficeDev/TeamsFx/wiki/Teams-Toolkit-Visual-Studio-Code-v5-Guide#overview):

    | File                                 | Contents                                           |
    | - | - |
    |`teamsapp.yml`|This is the main Teams Toolkit project file. The project file defines two primary things:  Properties and configuration Stage definitions. |
    |`teamsapp.local.yml`|This overrides `teamsapp.yml` with actions that enable local execution and debugging.|
    |`teamsapp.testtool.yml`|This overrides `teamsapp.yml` with actions that enable local execution and debugging in Teams App Test Tool.|

    ---

## Create an AI agent using Teams AI library

### Build new

Teams AI library provides a comprehensive flow that simplifies the process of building your own AI agent. The important concepts that you need to understand are as follows:

* [**Actions**](https://github.com/microsoft/teams-ai/blob/main/getting-started/CONCEPTS/ACTIONS.md): An action is an atomic function that is registered to the AI system.
* [**Planner**](https://github.com/microsoft/teams-ai/blob/main/getting-started/CONCEPTS/PLANNER.md): The planner receives the user's request, which is in the form of a prompt or prompt template, and returns a plan to fulfill it. This is achieved by using AI to mix and match atomic functions, known as actions, that are registered to the AI system. These actions are recombined into a series of steps that complete a goal.
* [**Action Planner**](https://github.com/microsoft/teams-ai/blob/main/getting-started/CONCEPTS/ACTION-PLANNER.md): Action Planner uses an LLM to generate plans. It can trigger parameterized actions and send text based responses to the user.

### Build with Assistants API

Assistants API from OpenAI simplifies the development effort of creating an AI agent. OpenAI as a platform offers prebuilt tools such as Code Interpreter, Knowledge Retrieval, and Function Calling that simplifies the code you need to write for common scenarios.

   | Comparison | Build new | Build with Assistants API |
   | - | - | - |
   | Cost | Only costs for LLM services | Costs for LLM services and if you use tools in Assistants API leads to extra costs. |
   | Dev effort | Medium | Relatively small |
   | LLM services | Azure OpenAI or OpenAI | OpenAI only |
   | Example implementations in template | This app template can chat and help users to manage the tasks. | This app templates use the Code Interpreter tool to solve math problems and also the Function Calling tool to get city weather. |
   | Limitations | NA | Teams AI library doesn't support the Knowledge Retrieval tool. |

## Customize the app template

### Customize prompt augmentation

The SDK provides a functionality to augment the prompt.

* The actions, which are defined in the `src/prompts/planner/actions.json` file, are inserted into the prompt. This allows the LLM to be aware of the available functions.
* An internal piece of prompt text is inserted into the prompt to instruct LLM to determine which functions to call based on the available functions. This prompt text orders LLM to generate the response in a structured json format.
* The SDK validates the LLM response and lets LLM correct or refine the response if the response is in wrong format.

In the `src/prompts/planner/config.json` file, configure `augmentation.augmentation_type`. The options are:

* `Sequence`: Suitable for tasks that require multiple steps or complex logic.
* `Monologue`: Suitable for tasks that require natural language understanding and generation, and more flexibility and creativity.

### Build new add functions

* In the `src/prompts/planner/actions.json` file, define your actions schema.

     ```json
     [
         ...
         {
             "name": "myFunction",
             "description": "The function description",
             "parameters": {
                 "type": "object",
                 "properties": {
                     "parameter1": {
                         "type": "string",
                         "description": "The parameter1 description"
                     },
                 },
                 "required": ["parameter1"]
             }
         }
     ]
     ```

* In the `src/app/actions.ts` file, define the action handlers.

     ```typescript
     // Define your own function
     export async function myFunction(context: TurnContext, state: TurnState, parameters): Promise<string> {
       // Implement your function logic
       ...
       // Return the result
       return "...";
     }
     ```

* In the `src/app/app.ts` file, register the actions.

     ```typescript
     app.ai.action("myFunction", myFunction);
     ```

### Customize assistant creation

The `src/creator.ts` file creates a new OpenAI Assistant. You can customize the assistant by updating the parameters including instruction, model, tools, and functions.

### Build with Assistants API add functions

When the assistant provides a function and its arguments for execution, the SDK aligns this function with a preregistered action. It later activates the action handler and submits the outcome back to the assistant. To integrate your functions, register the actions within the app.

* In the `src/app/actions.ts` file, define the action handlers.

     ```typescript
     // Define your own function
     export async function myFunction(context: TurnContext, state: TurnState, parameters): Promise<string> {
       // Implement your function logic
       ...
       // Return the result
       return "...";
     }
     ```

* In the `src/app/app.ts` file, register the actions.

     ```typescript
     app.ai.action("myFunction", myFunction);
     ```

## See also

[Teams AI library](../bots/how-to/teams-conversational-ai/teams-conversation-ai-overview.md)
