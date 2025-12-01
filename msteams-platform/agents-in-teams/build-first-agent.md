---
title: Create your first agent
description: Learn how to build your agent in Microsoft Teams with help of GitHub codespaces that opens Toolkit extension and step-by-step guides.
ms.localizationpriority: high
ms.date: 12/11/2024
ms.topic: reference
---

# Build your first agent

Agents use AI to automate and execute business processes, working alongside or on behalf of a person, team, or organization. Agents range from simple prompt-and-response agents to more advanced, fully autonomous agents.

## Tools you'll need

To build an agent in Teams, developers need the following:

| Install | For using... |
| --- | --- |
| [Visual Studio Code](https://code.visualstudio.com/download) | JavaScript, TypeScript, or Python build environments. Use latest version. |
| [Teams SDK](/microsoftteams/platform/teams-ai-library/teams/overview) | Simplified SDK for building intelligent agents. Now GA for JavaScript and C#, and in public preview for Python. |
| [Microsoft 365 Agents Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) | Microsoft Visual Studio Code extension that creates project scaffolding for agent. Use latest version.|
| [Node.js](https://nodejs.org/en/download/) | Back-end JavaScript runtime environment. For more information, see [Node.js version compatibility table for project type](~/toolkit/build-environments.md#nodejs-version-compatibility-table-for-project-type).|
| [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Microsoft Teams to collaborate with everyone via agents and apps for chat, meetings, and calls all in one place.|
| [Azure OpenAI](https://oai.azure.com/portal)| First create OpenAI API key to use OpenAI's Generative Pretrained Transformer (GPT). If developers want to host agent or access resources in Azure, developers must create Azure OpenAI service.|

## Set up your environment

1. Install latest versions of Visual Studio Code, Node.js, and Microsoft 365 Agents Toolkit.
1. If developers want to use Azure OpenAI service to access large language model (LLM) for agent, create Azure OpenAI service on [Azure portal](https://ms.portal.azure.com/#home) and get API key.

For more information about setting up Azure OpenAI services, see:

- [Create and deploy an Azure OpenAI in Azure AI Foundry Models resource](/azure/ai-foundry/openai/how-to/create-resource?pivots=web-portal).
- [Create an Azure OpenAI Resource and Deploy a Model](/microsoft-cloud/dev/tutorials/openai-acs-msgraph/02-openai-create-resource).

## Create an agent using Microsoft 365 Agents Toolkit

1. Open Visual Studio Code.
1. Select Microsoft 365 Agents Toolkit :::image type="icon" source="~/assets/icons/m-365-agents-toolkit-icon.png" border="false"::: icon in Visual Studio Code **Activity Bar**.
1. Select **Create a New Agent/App**.

    :::image type="content" source="../assets/images/agents-in-teams/first-agent-qsg/create-new-agent.png" alt-text="Screenshot shows location of option to create new agent using Microsoft 365 Agents Toolkit sidebar." lightbox="../assets/images/agents-in-teams/first-agent-qsg/create-new-agent.png":::

1. From **New Project** menu, select **Teams Agents and Apps**.

    :::image type="content" source="../assets/images/agents-in-teams/first-agent-qsg/teams-agents.png" alt-text="Screenshot shows location of option to create new agent or app in Teams." lightbox="../assets/images/agents-in-teams/first-agent-qsg/teams-agents.png":::

1. Select **General Teams Agent** to create agent.

    :::image type="content" source="../assets/images/agents-in-teams/first-agent-qsg/general-teams-agent.png" alt-text="Screenshot shows location of option to create new agent in Teams." lightbox="../assets/images/agents-in-teams/first-agent-qsg/general-teams-agent.png":::

1. Select service to access large language model (LLM) for agent.

    :::image type="content" source="../assets/images/agents-in-teams/first-agent-qsg/access-llm.png" alt-text="Screenshot shows location of option to select appropriate LLM for agent." lightbox="../assets/images/agents-in-teams/first-agent-qsg/access-llm.png":::

    Select one of following options:

    - Select **Azure OpenAI** if developers have OpenAI key from Azure. Following this, developers must:

        1. Enter Azure OpenAI key in **Azure OpenAI service key**.
        1. Enter endpoint in **Azure OpenAI service endpoint**.
        1. Enter deployment name in **Azure OpenAI deployment name**.

    - Select **OpenAI Key** and enter OpenAI key.

1. Select **Programming Language** for developing agent.

    :::image type="content" source="../assets/images/agents-in-teams/first-agent-qsg/select-language.png" alt-text="Screenshot shows option to select programming language for agent." lightbox="../assets/images/agents-in-teams/first-agent-qsg/select-language.png":::

1. Select **Default folder** as **Workspace Folder** for agent project.

    :::image type="content" source="../assets/images/agents-in-teams/first-agent-qsg/select-workspace.png" alt-text="Screenshot shows field to select workspace folder for agent project." lightbox="../assets/images/agents-in-teams/first-agent-qsg/select-workspace.png":::

1. Enter agent name and then select **Enter**.

    :::image type="content" source="../assets/images/agents-in-teams/first-agent-qsg/add-agent-name.png" alt-text="Screenshot shows field to add agent name." lightbox="../assets/images/agents-in-teams/first-agent-qsg/add-agent-name.png":::

    Toolkit displays message that agent has been successfully created. Developers can provision agent at this time or later. If toolkit displays message to confirm trust in authors, select **Yes, I trust the authors**.

    :::image type="content" source="../assets/images/agents-in-teams/first-agent-qsg/trust-author.png" alt-text="Screenshot shows message for confirming trust in agent authors.":::

### Take a tour of the agent source code

Microsoft 365 Agents Toolkit creates agent project and scaffolds project workspace. Below is folder structure:

| Folder | Contents |
| --- | --- |
| `.vscode` | Visual Studio Code files for debugging. |
| `appPackage` | Templates for Teams manifest. |
| `env` | Environment files. |
| `infra` | Templates for provisioning Azure resources. |
| `src` | Source code for project. |

## Run and use your agent in Teams

1. Open agent project in Visual Studio Code.
1. Select **Run** > **Start Debugging**, or alternatively, select **F5** key.

    If all prerequisites are installed, Visual Studio Code uploads and opens agent in Microsoft Teams.

    :::image type="content" source="../assets/images/agents-in-teams/first-agent-qsg/run-agent-in-teams.png" alt-text="Screenshot shows agent opened in Microsoft Teams." lightbox="../assets/images/agents-in-teams/first-agent-qsg/run-agent-in-teams.png":::

1. To use agent, select one of prompts shown by agent.

    :::image type="content" source="../assets/images/agents-in-teams/first-agent-qsg/select-agent-prompt.png" alt-text="Screenshot shows how to select prompt from agent." lightbox="../assets/images/agents-in-teams/first-agent-qsg/select-agent-prompt.png":::

    When prompt is selected, it appears in comment box, and developers can select **Send** icon. Agent then responds to prompt.

    :::image type="content" source="../assets/images/agents-in-teams/first-agent-qsg/agent-response.png" alt-text="Screenshot shows agent response to developer prompt." lightbox="../assets/images/agents-in-teams/first-agent-qsg/agent-response.png":::

Congratulations! Developers have created and ran first agent in Teams.

## Choose your programming language

Teams SDK is available for JavaScript, C#, and Python (dev preview). It provides simplified SDK, support for Model Context Protocol (MCP), Agent-to-Agent communication (A2A), and streamlined tools to enable developers to build intelligent agents for Teams.

:::row:::
   :::column:::
      **Description**
   :::column-end:::
   :::column span="3":::
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Choose your build environment**
   :::column-end:::
:::row-end:::
:::row:::
   :::column:::
      Build with ...
   :::column-end:::
   :::column:::
      > [!div class="nextstepaction"]
      > [C#](/microsoftteams/platform/teams-ai-library/getting-started/quickstart?pivots=csharp)
   :::column-end:::
   :::column:::
      > [!div class="nextstepaction"]
      > [TypeScript](/microsoftteams/platform/teams-ai-library/getting-started/quickstart?pivots=typescript)
   :::column-end:::
   :::column:::
      > [!div class="nextstepaction"]
      > [Python](/microsoftteams/platform/teams-ai-library/getting-started/quickstart?pivots=python)
   :::column-end:::
:::row-end:::

## Code sample

| Sample name | Description | .NET | Node.js | Python |
|--- |--- | --- | --- | --- |
| Contoso knowledge hub | Intelligent agent built on Teams SDK designed to empower students in their academic and career journeys. Agent offers personalized support for course selection, study strategies, career development planning, and academic roadmap creation.  | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/agent-knowledge-hub/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/agent-knowledge-hub/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/agent-knowledge-hub/python) |

## See also

[Agents user experience](../bots/how-to/teams-conversational-ai/ai-ux.md)