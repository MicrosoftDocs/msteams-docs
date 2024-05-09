---
title: Build a RAG Bot in Teams
author: surbhigupta
description:  In this module, learn how to build RAG bot using Teams AI library.
ms.topic: conceptual
ms.localizationpriority: high
ms.author: v-ganr
ms.date: 05/08/2024
---

# Build a RAG Bot in Teams

One of the most powerful applications enabled by LLMs is sophisticated question-answering(Q&A) chatbots. These are applications that can answer questions about specific source information. These applications use a technique known as Retrieval Augmented Generation (RAG). 
For example:
Knowledge Base: "Company's shuttle bus might be 15 minutes late on rainy days."
User Query: "When will the shuttle bus arrive?"
AI Response (With RAG): "Today is rainy, the shuttle bus might be 15 minutes late than usual, so around 9:15 AM."

image

A typical RAG architecture that has two main flows:

1. Data Ingestion - A pipeline for ingesting data from a source and indexing it. This usually happens offline.
1. Retrieval and Generation - The actual RAG chain, which takes the user query at run time and retrieves the relevant data from the index, then passes that to the model.

Microsoft Teams enables developers to build a conversational bot with RAG capability to create a powerful experience to maximize the productivity.

Teams Toolkit provides a series ready to use application templates under the category Chat with your data that combines the capabilities of Azure AI Search, Microsoft 365 & SharePoint and Custom API as different data source and Large Language Models (LLMs) to create a conversational search experience in Microsoft Teams.

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

1. Select **Chat With Your Data**. image

1. Select **Customize**. image

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

| Folder       | Contents                                            |
| - | - |
| `.vscode`    | Visual Studio Code files for debugging                          |
| `appPackage` | Templates for the Teams application manifest        |
| `env`        | Environment files                                   |
| `infra`      | Templates for provisioning Azure resources          |
| `src`        | The source code for the application                 |
|`src/index.js`| Sets up the bot app server.|
|`src/adapter.js`| Sets up the bot adapter.|
|`src/config.js`| Defines the environment variables.|
|`src/prompts/chat/skprompt.txt`| Defines the prompt.|
|`src/prompts/chat/config.json`| Configures the prompt.|
|`src/app/app.js`| Handles business logics for the RAG bot.|
|`src/app/myDataSource.js`| Defines the data source.|
|`src/data/*.md`| Raw text data sources.|
|`teamsapp.yml`|This is the main Teams Toolkit project file. The project file defines two primary things:  Properties and configuration Stage definitions. |
|`teamsapp.local.yml`|This overrides `teamsapp.yml` with actions that enable local execution and debugging.|
|`teamsapp.testtool.yml`| This overrides `teamsapp.yml` with actions that enable local execution and debugging in Teams App Test Tool.|