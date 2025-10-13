---
title: Create your first agent
description: Learn how to build your agent in Microsoft Teams with the help of GitHub codespaces that opens Toolkit extension and step-by-step guides.
ms.localizationpriority: high
ms.date: 12/11/2024
ms.topic: reference
---

# Build your first agent

Agents use AI to automate and execute business processes, working alongside or on behalf of a person, team, or organization. Agents range from simple prompt-and-response agents to more advanced, fully autonomous agents.

A Teams agent is an AI-powered chatbot integrated into Microsoft Teams that uses large language models (LLMs) to understand user intent, perform tasks, and enhance collaboration. These agents can be embedded in chats, meetings, or channels and can respond to queries, generate reports, manage tasks, and more.

## Tools you'll need

To build a Teams agent, you’ll need the following:

| Install | For using... |
| --- | --- |
| [Visual Studio Code](https://code.visualstudio.com/download) | JavaScript, TypeScript, or Python build environments. Use the latest version. |
| [Teams AI Library](/microsoftteams/platform/teams-ai-library/teams/overview) | A simplified SDK for building intelligent agents. Now GA for JavaScript and C#, and in public preview for Python. |
| [Microsoft 365 Agents Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) | Microsoft Visual Studio Code extension that creates a project scaffolding for your app. Use the latest version.|
| [Node.js](https://nodejs.org/en/download/) | Back-end JavaScript runtime environment. For more information, see [Node.js version compatibility table for project type](~/toolkit/build-environments.md#nodejs-version-compatibility-table-for-project-type).|
| [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Microsoft Teams to collaborate with everyone you work with through apps for chat, meetings, and calls all in one place.|
| [Azure OpenAI](https://oai.azure.com/portal)| First create your OpenAI API key to use OpenAI's Generative Pretrained Transformer (GPT). If you want to host your app or access resources in Azure, you must create an Azure OpenAI service.|

## Build an agent

To build your agent:

1. Set up your environment
1. Create the agent using Microsoft 365 Agents Toolkit
1. Run your agent in Teams

### Set up your environment

1. Install the latest versions of Visual Studio Code, Node.js, and the Microsoft 365 Agents Toolkit.
1. Create an Azure OpenAI service on the [Azure portal](https://ms.portal.azure.com/#home) and get your API key.

### Create an agent using Microsoft 365 Agents Toolkit

1. Open **Visual Studio Code**.
1. Select the Microsoft 365 Agents Toolkit :::image type="icon" source="~/assets/icons/m-365-agents-toolkit-icon.png" border="false"::: icon in the Visual Studio Code **Activity Bar**.
1. Select **Create a New Agent/App**.

    :::image type="content" source="../assets/images/agents-in-teams/first-agent-qsg/create-new-agent.png" alt-text="Screenshot shows the location of the option to create a new agent using Microsoft 365 Agents Toolkit sidebar." lightbox="../assets/images/agents-in-teams/first-agent-qsg/create-new-agent.png":::

1. From the **New Project** menu, select **Teams and Agents and Apps**.

    :::image type="content" source="../assets/images/agents-in-teams/first-agent-qsg/teams-agents.png" alt-text="Screenshot shows the location of the option to create a new agent or app in Teams." lightbox="../assets/images/agents-in-teams/first-agent-qsg/teams-agents.png":::

1. Select **General Teams Agent** to create an agent.

    :::image type="content" source="../assets/images/agents-in-teams/first-agent-qsg/general-teams-agent.png" alt-text="Screenshot shows the location of the option to create a new agent in Teams." lightbox="../assets/images/agents-in-teams/first-agent-qsg/general-teams-agent.png":::

1. Select **OpenAI** as the LLM for your agent.

    :::image type="content" source="../assets/images/agents-in-teams/first-agent-qsg/select-llm.png" alt-text="Screenshot shows the location of the option to select an appropriate LLM for your agent." lightbox="../assets/images/agents-in-teams/first-agent-qsg/select-llm.png":::

1. Enter the OpenAI key that you got from Azure portal.

    :::image type="content" source="../assets/images/agents-in-teams/first-agent-qsg/add-key.png" alt-text="Screenshot shows the location of the field to enter the OpenAI key." lightbox="../assets/images/agents-in-teams/first-agent-qsg/add-key.png:::

1.
