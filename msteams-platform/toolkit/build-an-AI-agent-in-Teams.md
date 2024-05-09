---
title: Build an AI Agent in Teams
author: surbhigupta
description:  In this module, learn how to build AI Agent using Teams AI library.
ms.topic: conceptual
ms.localizationpriority: high
ms.author: v-ganr
ms.date: 05/08/2024
---

# Build an AI Agent in Teams

An AI agent in Microsoft Teams is a conversational chatbot that can reason with large language models to interact with users to understand the intention and choose a sequence of actions to take so the chatbot can complete common tasks. Example tasks include querying and summarizing information (for example, "Do you have any flights to DC tomorrow?"), authoring content based on user intent (for example, "Rephrase this sentence to be more professional"), or acting on the user’s behalf (for example, "Please cancel my order").

## Prerequisites

| Install | For using... |
| --- | --- |
| &nbsp; | &nbsp; |
| [Visual Studio Code](https://code.visualstudio.com/download) | JavaScript, TypeScript, or Python build environments. Use the latest version. |
| [Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) | Microsoft Visual Studio Code extension that creates a project scaffolding for your app. Use the latest version.|
| [Node.js](https://nodejs.org/en/download/) | Back-end JavaScript runtime environment. For more information, see [Node.js version compatibility table for project type](~/toolkit/build-environments.md#nodejs-version-compatibility-table-for-project-type).|
| [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Microsoft Teams to collaborate with everyone you work with through apps for chat, meetings, and call-all in one place.|
| [Azure OpenAI](https://oai.azure.com/portal)| First create your OpenAI API key to use OpenAI's GPT. If you want to host your app or access resources in Azure, you must create an Azure OpenAI service.|

## How to choose between Build New and Build with Assistants API
Table

## Create a new AI Agent project

1. Open **Visual Studio Code**.
 
1. Select the Teams Toolkit :::image type="icon" source="~/assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.PNG" border="false"::: icon in the Visual Studio Code **Activity Bar**

1. Select **Create a New App**.image

1. Select **Custom Copilot**.image

1. Select **AI Agent**. image

1. To build an app, follow either of the building agent steps:
    
    # [Build New](#tab/buildnew)
        
        1. Select **Build New**. image
        
        1. Select **JavaScript**. image
        
        1. Select **Azure OpenAI**. image
        
        1. Based on your service selection, you can optionally enter the credentials to access OpenAI or Azure OpenAI. Select **Enter**. image
        
        1.  Select **Default folder**.image
        
            To change the default location, follow these steps:
        
            1. Select **Browse**.image
            1. Select the location for the project workspace.
            1. Select **Select Folder**.image
        
        1. Enter a application name for your app and then select the **Enter** key. image 
        
        Now, you've successfully created your AI chat bot project workspace. image
        
        1. Under **EXPLORER**, go to **env** > **.env.testtool.user** file.
        
        1. Update the following details:
            Azure OpenAI key `SECRET_AZURE_OPENAI_API_KEY=<your-key>`
            Endpoint `AZURE_OPENAI_ENDPOINT=<your-endpoint>`
            Deployment name `AZURE_OPENAI_DEPLOYMENT_NAME=<your-deployment>`
        image
        
        1. Select **F5** or from the left pane, select **RUN and DEBUG** (Ctrl+Shift+D) and select **Debug in Test Tool (Preview)** from the dropdown list.
        image
    
        ## Take a tour of the bot app source code
    
        | Folder       | Contents                                            |
        | - | - |
        | `.vscode`    | VSCode files for debugging                          |
        | `appPackage` | Templates for the Teams application manifest        |
        | `env`        | Environment files                                   |
        | `infra`      | Templates for provisioning Azure resources          |
        | `src`        | The source code for the application                 |
        
        The following files can be customized and demonstrate an example implementation to get you started.
        
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
        
        The following are Teams Toolkit specific project files. You can [visit a complete guide on Github](https://github.com/OfficeDev/TeamsFx/wiki/Teams-Toolkit-Visual-Studio-Code-v5-Guide#overview) to understand how Teams Toolkit works.
        
        | File                                 | Contents                                           |
        | - | - |
        |`teamsapp.yml`|This is the main Teams Toolkit project file. The project file defines two primary things:  Properties and configuration Stage definitions. |
        |`teamsapp.local.yml`|This overrides `teamsapp.yml` with actions that enable local execution and debugging.|
        |`teamsapp.testtool.yml`|This overrides `teamsapp.yml` with actions that enable local execution and debugging in Teams App Test Tool.|
    ---

    # [Assistants API](#tab/assistantsapi)
        
        Build with Assistants API Preview
        
        1. Select **Build with Assistants API Preview**. image
        
        1. Select **JavaScript**. image
        
        > [!NOTE]
        > * If the building agent is selected as Build with Assistants API, Azure OpenAI service has not provided support for Assistants API.
        * The `AssistantsPlanner` in Teams AI Library is currently in preview version.
        
        1. Select **OpenAI**. image
        
        1. Based on your service selection, you can optionally enter the credentials to access OpenAI. Select **Enter**. image
        
        1.  Select **Default folder**.image
        
            To change the default location, follow these steps:
        
            1. Select **Browse**.image
            1. Select the location for the project workspace.
            1. Select **Select Folder**.image
        
        1. Enter a application name for your app and then select the **Enter** key. image 
        
        Now, you've successfully created your AI chat bot project workspace. image
        
        ## Create your own OpenAI Assistant
        
        Before running or debugging your bot, please follow these steps to setup your own [OpenAI Assistant](https://platform.openai.com/docs/assistants/overview).
        
        **If you haven't setup any Assistant yet**
        
        > This app template provides script `src/creator.js` to help create assistant. You can change the instructions and settings in the script to customize the assistant.
        > 
        > After creation, you can change and manage your assistants on [OpenAI](https://platform.openai.com/assistants).
        
        1. Open terminal and run command `npm install` to install all dependency packages
           ```
           > npm install
           ```
        1. After `npm install` completed, run command `npm run assistant:create -- <your-openai-api-key>`
           ```
           > npm run assistant:create -- xxxxxx
           ```
        1. The above command will output something like "*Created a new assistant with an ID of: **asst_xxx...***"
        
        1. Go to **Visual Studio Code**, Under **EXPLORER**, select **env** > **.env.*.userr** file.
        
        1. Update the following details:
            SECRET_OPENAI_API_KEY=<your-openai-api-key>
            OPENAI_ASSISTANT_ID=<your-openai-assistant-id>
        image
    
        1. Select **F5** or from the left pane, select **RUN and DEBUG** (Ctrl+Shift+D) and select **Debug in Test Tool (Preview)** from the dropdown list.
        image
    
        ## Take a tour of the bot app source code
        
        
        | Folder       | Contents                                            |
        | - | - |
        | `.vscode`    | VSCode files for debugging                          |
        | `appPackage` | Templates for the Teams application manifest        |
        | `env`        | Environment files                                   |
        | `infra`      | Templates for provisioning Azure resources          |
        | `src`        | The source code for the application                 |
        |`src/index.js`| Sets up the bot app server.|
        |`src/adapter.js`| Sets up the bot adapter.|
        |`src/config.js`| Defines the environment variables.|
        |`src/creator.js`| One-time tool to create OpenAI Assistant.|
        |`src/app/app.js`| Handles business logics for the AI Agent.|
        |`src/app/messages.js`| Defines the message activity handlers.|
        |`src/app/actions.js`| Defines the AI actions.|
        |`teamsapp.yml`|This is the main Teams Toolkit project file. The project file defines two primary things:  Properties and configuration Stage definitions. |
        |`teamsapp.local.yml`|This overrides `teamsapp.yml` with actions that enable local execution and debugging.|
        |`teamsapp.testtool.yml`|This overrides `teamsapp.yml` with actions that enable local execution and debugging in Teams App Test Tool.|
    ---

How Teams AI Library is used to create an AI Agent.