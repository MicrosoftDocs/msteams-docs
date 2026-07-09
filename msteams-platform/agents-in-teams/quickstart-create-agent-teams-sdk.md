---
title: "Quickstart: Create an agent with Teams SDK"
description: Learn how to build your agent in Microsoft Teams with the help of GitHub codespaces that opens Toolkit extension and step-by-step guides.
ms.date: 07/06/2026
author: nickwalkmsft
ms.author: nickwalk
ms.reviewer: nickwalk
ms.topic: quickstart
zone_pivot_groups: teams-sdk-languages
---

<!--

::: zone pivot="teams-sdk-typescript"

::: zone-end

::: zone pivot="teams-sdk-python"

::: zone-end

::: zone pivot="teams-sdk-csharp"

::: zone-end

-->

TODO this assumes 2.1 for .NET, because auth skip doesn't work in older versions. If we want to support earlier versions, need to write out playground for it entirely.

# Quickstart: Create an agent with Teams SDK and Teams developer CLI

In this quickstart, you'll use command-line developer tools to create a new agent. When you're finished, you'll have code for an agent that you can chat with in Teams while it's running in your local development environment. You'll be able to continue exploring and experimenting with this code, and as you add new features to it, you'll be able to experience them in Teams immediately.

## Prerequisites

This quickstart is divided into two sections. In the first, you'll create the code for your agent and try it out with Microsoft 365 Agents Playground, a local testing tool. You'll need:

::: zone pivot="teams-sdk-typescript"

- Node.js 20 or later ([installer download](https://nodejs.org))
- An editor, we suggest VS Code

::: zone-end

::: zone pivot="teams-sdk-python"

- Node.js 20 or later ([installer download](https://nodejs.org))
- Python 3.11 or later ([installer download](https://python.org/downloads))
- An editor, we suggest VS Code

::: zone-end

::: zone pivot="teams-sdk-csharp"

- Node.js 20 or later ([installer download](https://nodejs.org))
- NET 10 or later ([installer download](https://dotnet.microsoft.com/download))
- An editor, we suggest VS Code

::: zone-end

In the second part, you'll register your agent with the Teams platform, install it, and try it out. For that, you'll also need Teams, logged in to a Microsoft 365 work or school account with permissions to install custom Teams apps ("sideloading").

Getting a new agent running in Teams immediately sets it up for a successful development process and release, but if you don't have a Microsoft 365 work or school account, you can still complete the first part of the quickstart to get started exploring agent development. See [Microsoft 365 Developer Program](/office/developer-program/microsoft-365-developer-program) for information about getting a developer sandbox subscription.

To use your app in Teams, your account needs permissions to install custom Teams apps ("sideloading"). The quickstart includes a step to confirm this permission before it's needed, and instructions for requesting it from your organization's Microsoft 365 administrator if you don't have it.

## Create an agent and try it in Microsoft 365 Agents Playground

1. Install the Teams developer CLI and Microsoft 365 Agents Playground locally.

    ```bash
    npm install -g @microsoft/teams.cli @microsoft/m365agentsplayground
    ```

::: zone pivot="teams-sdk-typescript"

2. Use `teams project new` to create the code for a new agent from a template and open it in Visual Studio Code.

    ```bash
    teams project new typescript echo-bot
    cd echo-bot
    code .
    ```

3. Open `src/index.ts` and find the line that reads `const app = new App();` and modify it to read:

    ```typescript
    const app = new App({ skipAuth: true });
    ```

    This is a temporary modification to enable using the app from Microsoft 365 Agents Playground.

3. Start the agent. Once it's running, you'll see a confirmation that it's running on port 3978.

    ```bash
    npm install
    npm run dev
    ```

TODO skipauth

::: zone-end

::: zone pivot="teams-sdk-python"

TODO venv this?

2. Use `teams project new` to create the code for a new agent from a template.

    ```bash
    teams project new python echo-bot
    cd echo-bot
    ```

3. Open `src/main.py`. Find the line that reads `app = App()` and modify it to read:

    ```python
    app = App(skip_auth=True)
    ```

    This is a temporary modification to enable using the app from Microsoft 365 Agents Playground.

4. Start the agent. Once it's running, you'll see a confirmation that it's running on port 3978.

    ```bash
    pip install -e .
    python src/main.py
    ```

TODO skipauth

::: zone-end

::: zone pivot="teams-sdk-csharp"

2. Use `teams project new` to create the code for a new agent from a template.

    ```bash
    teams project new csharp echo-bot
    cd Echo.Bot/Echo.Bot
    ```

3. Start the agent. Once it's running, you'll see a confirmation that it's running on port 3978.

    ```bash
    dotnet run
    ```

::: zone-end

3. Using a new console, start Microsoft 365 Agents Playground.

    ```bash
    agentsplayground
    ```

    This will connect Agents Playground to your agent and open the interface in a new browser tab.

4. Use the compose box to send your agent a message and see it respond in the chat.

Your agent's up and running locally! Use <kbd>Ctrl+C</kbd> in both open console windows to stop Agents Playground and your agent.

## Log in with Teams developer CLI and confirm sideloading permissions

> [!NOTE]
> The next part of the quickstart requires a Microsoft 365 work or school account, licensed for Teams, with permissions to install custom Teams apps.
>
>If you don't have a Microsoft 365 account, you can proceed to [Next steps](#next-steps) to continue working on your agent's code and complete the rest of this quickstart later. See [Microsoft 365 Developer Program](/office/developer-program/microsoft-365-developer-program) for information about getting a developer sandbox subscription that you can use to try your app in Teams.

Use the Teams developer CLI to log in to your account.

```bash
teams login
```

Teams will confirm your login, your account's sideloading permissions, and the presence of an Azure CLI installation (not required for this quickstart).

```console
✔ Logged in as nw_m365_admin@8k4lpb.onmicrosoft.com
✔ Sideloading: enabled

Azure CLI: installed, not logged in
```

To continue with installing and running your app in Teams, sideloading must show as enabled. If it is disabled, you will need to work with your Microsoft 365 administrator to enable it for your account. See [Allow users to upload custom apps](/microsoftteams/teams-custom-app-policies-and-settings) for administrator instructions for enabling this permission.

## Create a dev tunnel

Teams agents must be reachable from the public Internet for Teams to communicate with them. In this step, you use the `devtunnel` tool to expose your running agent to the Internet.

1. Install `devtunnel`.

   ## [Windows](#tab/windows)

   ## Windows Package Manager (winget)

    ```powershell
    winget install Microsoft.devtunnel
    ```

   ## [macOS](#tab/macos)

   ## Homebrew

    ```bash
    brew install --cask devtunnel
    ```

    ```bash
    curl -sL https://aka.ms/DevTunnelCliInstall | bash
    ```

   ## [Linux](#tab/linux)

    ```bash
    curl -sL https://aka.ms/DevTunnelCliInstall | bash
    ```

    ---

TODO copy instructions from <https://learn.microsoft.com/en-us/azure/developer/dev-tunnels/get-started?tabs=windows>

tunnel setup:
devtunnel user login (and login)
devtunnel host --allow-anonymous --port-number 3978

```output
c:\temp\quote-agent>devtunnel host --allow-anonymous --port-number 3978
Connection to host tunnel relay restored.
Hosting port: 3978
Connect via browser: https://4r9dr5xj-3978.usw2.devtunnels.ms
Inspect network activity: https://4r9dr5xj-3978-inspect.usw2.devtunnels.ms

Ready to accept connections for tunnel: joyful-dog-xgz66vp.usw2
```

Get the "connect via browser" URL and append /api/messages

Because the hostname is stable across restarts, you can stop and restart your tunnel without re-registering the bot.

Then

```
teams app create --name xxx --endpoint xxx --env .env
```

---

---

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

## Choose your programming language

Teams SDK is available for JavaScript, C#, and Python (dev preview). It provides a simplified SDK, support for Model Context Protocol (MCP), Agent-to-Agent communication (A2A), and streamlined tools to enable developers to build intelligent agents for Microsoft Teams.

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
| Contoso knowledge hub | An intelligent agent built on the Teams SDK that is designed to empower students in their academic and career journeys. The agent offers personalized support for course selection, study strategies, career development planning, and academic roadmap creation.  | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/agent-knowledge-hub/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/agent-knowledge-hub/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/agent-knowledge-hub/python) |

## See also

[Agents user experience](../bots/how-to/teams-conversational-ai/ai-ux.md)

## Next steps
