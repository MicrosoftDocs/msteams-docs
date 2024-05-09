---
title: Build a Basic AI Chatbot in Teams
author: surbhigupta
description:  In this module, learn how to build a Basic AI Chatbot using Teams AI library.
ms.topic: conceptual
ms.localizationpriority: high
ms.author: v-ganr
ms.date: 05/08/2024
---

# Build a Basic AI Chatbot

The AI Chatbot template showcases a bot app, similar to ChatGPT, that responds to user questions and enables users to interact with the AI bot in  Microsoft Teams.

[Teams AI library](../bots/how-to/Teams%20conversational%20AI/teams-conversation-ai-overview.md) is used to build the app template, providing the capabilities to create AI-based Teams applications.

## Prerequisites

| Install | For using... |
| --- | --- |
| &nbsp; | &nbsp; |
| [Visual Studio Code](https://code.visualstudio.com/download) | JavaScript, TypeScript, or Python build environments. Use the latest version. |
| [Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) | Microsoft Visual Studio Code extension that creates a project scaffolding for your app. Use the latest version.|
| [Node.js](https://nodejs.org/en/download/) | Back-end JavaScript runtime environment. For more information, see [Node.js version compatibility table for project type](~/toolkit/build-environments.md#nodejs-version-compatibility-table-for-project-type).|
| [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Microsoft Teams to collaborate with everyone you work with through apps for chat, meetings, and call-all in one place.|
| [Azure OpenAI](https://oai.azure.com/portal)| First create your OpenAI API key to use OpenAI's GPT. If you want to host your app or access resources in Azure, you must create an Azure OpenAI service.|

## Create a new Basic AI Chatbot project

1. Open **Visual Studio Code**.
 
1. Select the Teams Toolkit :::image type="icon" source="~/assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.PNG" border="false"::: icon in the Visual Studio Code **Activity Bar**

1. Select **Create a New App**.image

1. Select **Custom Copilot**.image

1. Select **Basic AI Chatbot**. image

1. Select **JavaScript**. image

1. Select **Azure OpenAI**. image

1. Based on your service selection, you can optionally enter the credentials to access OpenAI or Azure OpenAI. Select **Enter**. image

1.  Select **Default folder**.image

    To change the default location, follow these steps:

    1. Select **Browse**.image
    1. Select the location for the project workspace.
    1. Select **Select Folder**.image

1. Enter an application name for your app and then select the **Enter** key. image 

Now, you've successfully created your AI chat bot project workspace. Image

1. Under **EXPLORER**, go to **env** > **.env.testtool.user** file.

1. Update the following details:
    Azure OpenAI key `SECRET_AZURE_OPENAI_API_KEY=<your-key>`
    Endpoint `AZURE_OPENAI_ENDPOINT=<your-endpoint>`
    Deployment name `AZURE_OPENAI_DEPLOYMENT_NAME=<your-deployment>`
image

1. Select **F5** or from the left pane, select **RUN and DEBUG** (Ctrl+Shift+D) and select **Debug in Test Tool (Preview)** from the dropdown list.
image

Test Tool opens the bot in a webpage.

Image

## Take a tour of the bot app source code

# [JavaScript](#tab/javascript)

    | Folder       | Contents                                            |
    | - | - |
    | `.vscode`    | Visual Studio Code files for debugging                          |
    | `appPackage` | Templates for the Teams application manifest        |
    | `env`        | Environment files                                   |
    | `infra`      | Templates for provisioning Azure resources          |
    | `src`        | The source code for the application                 |
    |`teamsapp.yml`|This is the main Teams Toolkit project file. The project file defines two primary things:  Properties and configuration Stage definitions. |
    |`teamsapp.local.yml`|This overrides `teamsapp.yml` with actions that enable local execution and debugging.|
    |`teamsapp.testtool.yml`|This overrides `teamsapp.yml` with actions that enable local execution and debugging in Teams App Test Tool.|
    |`src/index.js`| Sets up the bot app server.|
    |`src/adapter.js`| Sets up the bot adapter.|
    |`src/config.js`| Defines the environment variables.|
    |`src/prompts/chat/skprompt.txt`| Defines the prompt.|
    |`src/prompts/chat/config.json`| Configures the prompt.|
    |`src/app/app.js`| Handles business logics for the Basic AI Chatbot.|

# [Python](#tab/python)

    | File                                 | Contents                                           |
    | - | - |
    | `.vscode`    | Visual Studio Code files for debugging                          |
    | `appPackage` | Templates for the Teams application manifest        |
    | `env`        | Environment files                                   |
    | `infra`      | Templates for provisioning Azure resources          |
    | `src`        | The source code for the application                 |
    |`teamsapp.yml`|This is the main Teams Toolkit project file. The project file defines two primary things:  Properties and configuration Stage definitions. |
    |`teamsapp.local.yml`|This overrides `teamsapp.yml` with actions that enable local execution and debugging.|
    |`teamsapp.testtool.yml`|This overrides `teamsapp.yml` with actions that enable local execution and debugging in Teams App Test Tool.|
    |`src/app.py`| Hosts an aiohttp API server and exports an app module.|
    |`src/bot.py`| Handles business logics for the Basic AI Chatbot.|
    |`src/config.py`| Defines the environment variables.|
    |`src/prompts/chat/skprompt.txt`| Defines the prompt.|
    |`src/prompts/chat/config.json`| Configures the prompt.|
---

## How Teams AI Chatbot works

The Teams-AI library provides a typical flow for building an intelligent chatbot with AI capabilities as follows:

image

1. TurnContext: The turn context object provides information about the activity, such as the sender and receiver, the channel, and other data needed to process the activity.

1. TurnState: The turn state object stores cookie-like data for the current turn. Like the turn context, it's carried through the entire application logic, including the activity handlers and the AI System.

1. Authentication: If user authentication is configured, Teams AI attempts to sign the user in. If the user is already signed in, the SDK retrieves the access token and continues. Otherwise, the SDK initiates the sign-in flow and ends the current turn.

1. Activity Handlers: The Teams AI library executes a set of registered activity handlers, enabling developers to handle several types of activities. The activity handler system is the primary method for implementing bot or message extension application logic. It's a set of methods and configurations that allow you to register callbacks (known as route handlers), which trigger based on the incoming activity. These can be in the form of a message, message reaction, or virtually any interaction within the Teams app.

1. AI System: The AI system in the Teams AI library is responsible for moderating input and output, generating plans, and executing them. It can be used standalone or routed to by the Application object. The most important concepts are as follows:

    1. Prompt Manager: Prompts play a crucial role in communicating and directing the behavior of Large Language Models (LLMs) AI.
    1. Planner: The planner receives the user's request and returns a plan on how to accomplish it. The user's request is in the form of a prompt or prompt template. It accomplishes this by using AI to mix and match atomic functions (called actions) registered to the AI system, recombining them into a series of steps that complete a goal.
    1. Actions: An action is an atomic function that is registered to the AI System. It's a fundamental building block of a plan.

1. AfterTurn Handler: After the activity handler or AI system is executed, the Teams AI library executes an afterTurn handler. This allows you to perform an action after the turn. If it returns true, the SDK saves the turn state to storage.

1. Respond to User: The Teams AI library saves the state, and the bot can send the response to the user.

## Customize Basic AI Chatbot