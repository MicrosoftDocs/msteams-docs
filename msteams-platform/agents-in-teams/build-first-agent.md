---
title: Create your first agent
description: Learn how to build your agent in Microsoft Teams with the Teams SDK and 
ms.localizationpriority: high
ms.date: 05/17/2026
ms.topic: reference
zone_pivot_groups: developer-tooling
---

# Build your first agent

Agents utilize AI to automate and execute business processes, functioning alongside or on behalf of a person, team, or organization. Agents range from simple prompt-and-response agents to more advanced, fully autonomous agents.

::: zone pivot="teams-developer-cli"

## Prerequisites

- Node.js 20 or later
- Microsoft Teams, logged in to a Microsoft 365 account with **custom app upload (sideloading) enabled** on the tenant. Step 2 will check this.
- `devtunnel`, a free, cross-platform tool that enables developers to seurely expose local web services from a developer environment to the Internet, giving them publicly-reachable URLs. You will use a dev tunnel while developing your agent so that the Teams platform can communicate with it while it is running in your developer environment. See [here](/azure/developer/dev-tunnels/get-started) for installation instructions.

## Install the Teams Developer CLI and log in

First, install the Teams Developer CLI, which will be used in the next steps to create scaffolding for a new Teams app and register it with the Teams platform. Run the following commands in a command prompt:

```bash
npm install -g @microsoft/teams.cli@preview
teams login
```

`teams status` should show `Sideloading: enabled`. If it shows `disabled`, your tenant admin needs to enable [custom app upload](/microsoftteams/teams-custom-app-policies-and-settings) before you can install your bot.

## Create project scaffolding 

The `project new` command of the Teams Developer CLI creates the source code scaffolding for a new Teams agent application. The CLI includes templates for different kinds of starter functionality that span the SDK's three supported languages: TypeScript, Python and C#.

Run the `teams new` command as shown below for the language of your choice to create the scaffolding for a new application. By not providing a template name, the CLI will scaffold a project using the default `echo` template, which responds to user messages by echoing them back:

# [TypeScript](#tab/typescript)

```bash
teams project new typescript echo-bot
cd echo-bot
```

# [C#](#tab/csharp)

```bash
teams project new csharp echo-bot
cd Echo.Bot/Echo.Bot
```

The C# scaffold creates a solution at `Echo.Bot/` with the project nested inside. Follow the **Next steps** line printed by the CLI for the exact path.

# [Python](#tab/python)

```bash
teams project new python echo-bot
cd echo-bot
```

---

## Start a DevTunnel and register the app with Teams

Installing and using your app in Teams requires that it be reachable from the Internet, registered with the Teams platform, and deployed via its manifest. Achieving these milestones now will help you develop your app by enabling you to experience it in Teams the same way that users will, from the beginning to the end of the development process.

Here, you use the `app create` command of the Teams Developer CLI to both register your application and deploy its manifest. Registration requires a publicly reachable URL for your app, which you will need during development anyway, so you will use `devtunnel` to create that first.

1. Follow the instructions [here](https://learn.microsoft.com/en-us/azure/developer/dev-tunnels/get-started#login) to log in to `devtunnel` and create a new tunnel. Make note of resulting tunnel URL and port.
1. Run the `app create` command as shown below for your language to register your app and deploy its manifest:

    # [TypeScript](#tab/typescript)

    ```bash
    teams app create \
    --name echo-bot \
    --endpoint https://<tunnel-host>/api/messages \
    --env .env
    ```

    # [C#](#tab/csharp)

    ```bash
    teams app create \
    --name echo-bot \
    --endpoint https://<tunnel-host>/api/messages \
    --env appsettings.json
    ```

    Credentials are written under a `Teams` section with PascalCase keys (`ClientId`, `ClientSecret`, `TenantId`).

    # [Python](#tab/python)

    ```bash
    teams app create \
    --name echo-bot \
    --endpoint https://<tunnel-host>/api/messages \
    --env .env
    ```

    ---

    The command prints a summary including the **Teams App ID** and an **Install in Teams** link, and writes credentials into your env file.

## Run your agent locally

Run the following commands to start your agent locally:

# [TypeScript](#tab/typescript)

```bash
npm install
npm run dev
```

# [C#](#tab/csharp)

```bash
dotnet run
```

# [Python](#tab/python)

```bash
pip install -e .
python src/main.py
```

---

You should see `listening on port 3978 🚀` in the terminal. Your tunnel will now forward Teams traffic to your local server.

## Install your app in Teams

The **Install in Teams** link from step 4 is your sideload URL. Click it from a browser signed in to Teams, then **Add**.

If you closed the terminal and need the link again:

```bash
teams app get <teamsAppId> --install-link
```

Use the `Teams App ID` printed in step 4. (Run `teams app list` to see all your apps with IDs.)

Send your bot a message to confirm it's working.

::: zone-end

::: zone pivot="agents-toolkit"

## Tools you'll need

To build an agent in Microsoft Teams, ensure you have the following:

| Install | For using... |
| --- | --- |
| [Visual Studio Code](https://code.visualstudio.com/download) | JavaScript, TypeScript, or Python (in public preview) build environments. Use the latest version. |
| [Teams SDK](/microsoftteams/platform/teams-sdk-overview) | A simplified SDK for building intelligent agents. Now GA for JavaScript and C#, and in public preview for Python. |
| [Microsoft 365 Agents Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) | Microsoft Visual Studio Code extension that creates a project scaffolding for your agent. Use the latest version. |
| [Node.js](https://nodejs.org/en/download/) | Back-end JavaScript runtime environment. For more information, see [Node.js version compatibility table for project type](~/toolkit/build-environments.md#nodejs-version-compatibility-table-for-project-type).|
| [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Microsoft Teams to collaborate with everyone you work with through agents and apps for chat, meetings, and calls all in one place. |
| [Azure OpenAI](https://oai.azure.com/portal) | OpenAI API key to use OpenAI's Generative Pretrained Transformer (GPT). If you want to host your agent or access resources in Azure, you must create an Azure OpenAI service. |

## Set up your environment

1. Install the latest versions of Visual Studio Code, Node.js, and Microsoft 365 Agents Toolkit.
1. If you want to use Azure OpenAI service to access Large Language Model (LLM) for your agent, create an Azure OpenAI service on the [Azure portal](https://ms.portal.azure.com/#home) and obtain your API key.

> [!NOTE]
> For more information about setting up Azure OpenAI services, see:
>
> - [Create and deploy an Azure OpenAI in Azure AI Foundry Models resource](/azure/ai-foundry/openai/how-to/create-resource?pivots=web-portal).
> - [Create an Azure OpenAI Resource and Deploy a Model](/microsoft-cloud/dev/tutorials/openai-acs-msgraph/02-openai-create-resource).

## Create an agent using Microsoft 365 Agents Toolkit

1. Open Visual Studio Code.
1. Select the Microsoft 365 Agents Toolkit :::image type="icon" source="~/assets/icons/m-365-agents-toolkit-icon.png" border="false"::: icon in the Visual Studio Code **Activity Bar**.
1. Select **Create a New Agent/App**.

    :::image type="content" source="../assets/images/agents-in-teams/first-agent-qsg/create-new-agent.png" alt-text="Screenshot shows the option to create a new agent." lightbox="../assets/images/agents-in-teams/first-agent-qsg/create-new-agent.png":::

1. From the **New Project** menu, select **Teams Agents and Apps**.

    :::image type="content" source="../assets/images/agents-in-teams/first-agent-qsg/teams-agents.png" alt-text="Screenshot shows the option to create a new agent or app project in Teams." lightbox="../assets/images/agents-in-teams/first-agent-qsg/teams-agents.png":::

1. Select **General Teams Agent** to create an agent.

    :::image type="content" source="../assets/images/agents-in-teams/first-agent-qsg/general-teams-agent.png" alt-text="Screenshot shows the option to create a new agent in Teams." lightbox="../assets/images/agents-in-teams/first-agent-qsg/general-teams-agent.png":::

1. Select a service to access Large Language Model (LLM) for your agent.

    :::image type="content" source="../assets/images/agents-in-teams/first-agent-qsg/access-llm.png" alt-text="Screenshot shows the option to select an appropriate LLM for your agent." lightbox="../assets/images/agents-in-teams/first-agent-qsg/access-llm.png":::

    Choose one of the following options:

    - Select **Azure OpenAI** if you've obtained the OpenAI key from Azure. Following this, you must:

        1. Enter Azure OpenAI key in **Azure OpenAI service key**.
        1. Enter the endpoint in **Azure OpenAI service endpoint**.
        1. Enter the deployment name in **Azure OpenAI deployment name**.

    - Select **OpenAI Key** and enter the OpenAI key.

1. Select the **Programming Language** for developing your agent.

    :::image type="content" source="../assets/images/agents-in-teams/first-agent-qsg/select-language.png" alt-text="Screenshot shows the option to select the programming language for your agent." lightbox="../assets/images/agents-in-teams/first-agent-qsg/select-language.png":::

1. Select the **Default folder** as the **Workspace Folder** for your agent project.

    :::image type="content" source="../assets/images/agents-in-teams/first-agent-qsg/select-workspace.png" alt-text="Screenshot shows the field to select the project workspace folder for your agent." lightbox="../assets/images/agents-in-teams/first-agent-qsg/select-workspace.png":::

1. Enter the agent name and then select **Enter**.

    :::image type="content" source="../assets/images/agents-in-teams/first-agent-qsg/add-agent-name.png" alt-text="Screenshot shows the field to add the agent name." lightbox="../assets/images/agents-in-teams/first-agent-qsg/add-agent-name.png":::

    The toolkit displays a message that the agent workspace has been successfully created. You can provision the agent at this time or later. If the toolkit displays a message to confirm that you trust the author, select **Yes, I trust the authors**.

    :::image type="content" source="../assets/images/agents-in-teams/first-agent-qsg/trust-author.png" alt-text="Screenshot shows the message for confirming if you trust the authors of the agent.":::

### Take a tour of the agent source code

Microsoft 365 Agents Toolkit creates and scaffolds the agent project workspace. Here's a look at the folder structure:

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

    When you select the prompt, it appears in the comment box, and you can select the **Send** icon. The agent responds to the prompt.

    :::image type="content" source="../assets/images/agents-in-teams/first-agent-qsg/agent-response.png" alt-text="Screenshot shows the agent response to the user prompt." lightbox="../assets/images/agents-in-teams/first-agent-qsg/agent-response.png":::

Congratulations! You've created and ran your first agent in Microsoft Teams.

::: zone-end

## Code sample

| Sample name | Description | .NET | Node.js | Python |
|--- |--- | --- | --- | --- |
| Contoso knowledge hub | An intelligent agent built on the Teams SDK that is designed to empower students in their academic and career journeys. The agent offers personalized support for course selection, study strategies, career development planning, and academic roadmap creation.  | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/agent-knowledge-hub/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/agent-knowledge-hub/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/agent-knowledge-hub/python) |

## See also

[Agents user experience](../bots/how-to/teams-conversational-ai/ai-ux.md)
