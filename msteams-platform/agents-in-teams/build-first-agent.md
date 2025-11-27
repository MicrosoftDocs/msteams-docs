---
title: Create your first agent
description: Learn how to build your agent in Microsoft Teams with the help of GitHub codespaces that opens Toolkit extension and step-by-step guides.
ms.localizationpriority: high
ms.date: 12/11/2024
ms.topic: reference
---

# Build your first agent

Agents use AI to automate and execute business processes, working alongside or on behalf of a person, team, or organization. Agents range from simple prompt-and-response agents to more advanced, fully autonomous agents.

## Tools you'll need

To build an agent in Teams, you’ll need the following:

| Install | For using... |
| --- | --- |
| [Visual Studio Code](https://code.visualstudio.com/download) | JavaScript, TypeScript, or Python build environments. Use the latest version. |
| [Teams SDK](/microsoftteams/platform/teams-ai-library/teams/overview) | A simplified SDK for building intelligent agents. Now GA for JavaScript and C#, and in public preview for Python. |
| [Microsoft 365 Agents Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) | Microsoft Visual Studio Code extension that creates a project scaffolding for your agent. Use the latest version.|
| [Node.js](https://nodejs.org/en/download/) | Back-end JavaScript runtime environment. For more information, see [Node.js version compatibility table for project type](~/toolkit/build-environments.md#nodejs-version-compatibility-table-for-project-type).|
| [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Microsoft Teams to collaborate with everyone you work with through agents and apps for chat, meetings, and calls all in one place.|
| [Azure OpenAI](https://oai.azure.com/portal)| First create your OpenAI API key to use OpenAI's Generative Pretrained Transformer (GPT). If you want to host your agent or access resources in Azure, you must create an Azure OpenAI service.|

## Set up your environment

1. Install the latest versions of Visual Studio Code, Node.js, and the Microsoft 365 Agents Toolkit.
1. If you want to use Azure OpenAI service to access large language model (LLM) for your agent, create an Azure OpenAI service on the [Azure portal](https://ms.portal.azure.com/#home) and get your API key.

For more information about setting up Azure OpenAI services, see:

- [Create and deploy an Azure OpenAI in Azure AI Foundry Models resource](/azure/ai-foundry/openai/how-to/create-resource?pivots=web-portal).
- [Create an Azure OpenAI Resource and Deploy a Model](/microsoft-cloud/dev/tutorials/openai-acs-msgraph/02-openai-create-resource).

## Create an agent using Microsoft 365 Agents Toolkit

1. Open Visual Studio Code.
1. Select the Microsoft 365 Agents Toolkit :::image type="icon" source="~/assets/icons/m-365-agents-toolkit-icon.png" border="false"::: icon in the Visual Studio Code **Activity Bar**.
1. Select **Create a New Agent/App**.

    :::image type="content" source="../assets/images/agents-in-teams/first-agent-qsg/create-new-agent.png" alt-text="Screenshot shows the location of the option to create a new agent using Microsoft 365 Agents Toolkit sidebar." lightbox="../assets/images/agents-in-teams/first-agent-qsg/create-new-agent.png":::

1. From the **New Project** menu, select **Teams Agents and Apps**.

    :::image type="content" source="../assets/images/agents-in-teams/first-agent-qsg/teams-agents.png" alt-text="Screenshot shows the location of the option to create a new agent or app in Teams." lightbox="../assets/images/agents-in-teams/first-agent-qsg/teams-agents.png":::

1. Select **General Teams Agent** to create an agent.

    :::image type="content" source="../assets/images/agents-in-teams/first-agent-qsg/general-teams-agent.png" alt-text="Screenshot shows the location of the option to create a new agent in Teams." lightbox="../assets/images/agents-in-teams/first-agent-qsg/general-teams-agent.png":::

1. Select a service to access large language model (LLM) for your agent.

    :::image type="content" source="../assets/images/agents-in-teams/first-agent-qsg/access-llm.png" alt-text="Screenshot shows the location of the option to select an appropriate LLM for your agent." lightbox="../assets/images/agents-in-teams/first-agent-qsg/access-llm.png":::

    Select one of the following options:

    - Select **Azure OpenAI** if you've got the OpenAI key from Azure. Following this, you must:

        1. Enter Azure OpenAI key in **Azure OpenAI service key**.
        1. Enter the endpoint in **Azure OpenAI service endpoint**.
        1. Enter the deployment name in **Azure OpenAI deployment name**.

    - Select **OpenAI Key** and enter the OpenAI key.

1. Select the **Programming Language** for developing your agent.

    :::image type="content" source="../assets/images/agents-in-teams/first-agent-qsg/select-language.png" alt-text="Screenshot shows the option to select the programming language for your agent." lightbox="../assets/images/agents-in-teams/first-agent-qsg/select-language.png":::

1. Select the **Default folder** as the **Workspace Folder** for your agent project.

    :::image type="content" source="../assets/images/agents-in-teams/first-agent-qsg/select-workspace.png" alt-text="Screenshot shows the field to select the workspace forlder for your agent project." lightbox="../assets/images/agents-in-teams/first-agent-qsg/select-workspace.png":::

1. Enter the agent name and then select **Enter**.

    :::image type="content" source="../assets/images/agents-in-teams/first-agent-qsg/add-agent-name.png" alt-text="Screenshot shows the field to add the agent name." lightbox="../assets/images/agents-in-teams/first-agent-qsg/add-agent-name.png":::

    The toolkit displays a message that the agent has been successfully created. You can also provision the agent at this time or later. If the toolkit displays a message to confirm if you trust the author, select **Yes, I trust the authors**.

    :::image type="content" source="../assets/images/agents-in-teams/first-agent-qsg/trust-author.png" alt-text="Screenshows the message for confirming if you trust the authors of the agent.":::

### Take a tour of the agent source code

Microsoft 365 Agents Toolkit creates your agent project and scaffolds the project workspace. Here's a look at the folder structure:

| Folder | Contents |
| --- | --- |
| `.vscode` | Visual Studio Code files for debugging. |
| `appPackage` | Templates for the Teams manifest. |
| `env` | Environment files. |
| `infra` | Templates for provisioning Azure resources. |
| `src` | The source code for the project. |

## Run and use your agent in Teams

1. Open your agent project in Visual Studio Code.
1. Select **Run** > **Start Debugging**, or alternatively, select the **F5** key.

    If all prerequisites are installed, Visual Studio Code uploads and opens your agent in Microsoft Teams.

    :::image type="content" source="../assets/images/agents-in-teams/first-agent-qsg/run-agent-in-teams.png" alt-text="Screenshot shows the agent opened in Microsoft Teams." lightbox="../assets/images/agents-in-teams/first-agent-qsg/run-agent-in-teams.png":::

1. To use your agent, select one of the prompts shown by the agent.

    :::image type="content" source="../assets/images/agents-in-teams/first-agent-qsg/select-agent-prompt.png" alt-text="Screenshot shows how to select a prompt from the agent." lightbox="../assets/images/agents-in-teams/first-agent-qsg/select-agent-prompt.png":::

    When you select the prompt, it shows up in the comment box, and you can select the **Send** icon. The agent responds to the prompt.

    :::image type="content" source="../assets/images/agents-in-teams/first-agent-qsg/agent-response.png" alt-text="Screenshot shows the agent response to the user prompt." lightbox="../assets/images/agents-in-teams/first-agent-qsg/agent-response.png":::

Congratulations! You've created and ran your first agent in Teams.

## Choose your build environment

You can choose your programming language to build Agents in Teams SDK

| Description | .NET | Node.js | Python |
|--- |--- | --- | ---|
| Quick start for Teams SDK | [!div class="nextstepaction"] <br> [Build with C#](/microsoftteams/platform/teams-ai-library/getting-started/quickstart?pivots=csharp) | [!div class="nextstepaction"] <br> [Build with TypeScript](/microsoftteams/platform/teams-ai-library/getting-started/quickstart?pivots=typescript) | [!div class="nextstepaction"] <br> [Build with Python](/microsoftteams/platform/teams-ai-library/getting-started/quickstart?pivots=python) |

:::row:::
   :::column:::
      **Description**
   :::column-end:::
   :::column span="4":::
      **Choose your build environment**
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
| Contoso knowledge hub | An intelligent agent built on the Teams SDK that is designed to empower students in their academic and career journeys. The agent offers personalized support for course selection, study strategies, career development planning, and academic roadmap creation.  | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/agent-knowledge-hub/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/agent-knowledge-hub/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/agent-knowledge-hub/python) |

## See also

[Agents user experience](../bots/how-to/teams-conversational-ai/ai-ux.md)
