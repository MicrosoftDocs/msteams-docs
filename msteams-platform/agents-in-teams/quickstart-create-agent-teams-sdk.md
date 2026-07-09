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

    This is a temporary modification to enable Microsoft 365 Agents Playground to communicate with the agent.

3. Start the agent. Once it's running, you'll see a confirmation that it's running on port 3978.

    ```bash
    npm install
    npm run dev
    ```

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

    This is a temporary modification to enable Microsoft 365 Agents Playground to communicate with the agent.

4. Start the agent. Once it's running, you'll see a confirmation that it's running on port 3978.

    ```bash
    pip install -e .
    python src/main.py
    ```

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

3. In a new console window, start Microsoft 365 Agents Playground.

    ```bash
    agentsplayground
    ```

    This will connect Agents Playground to your agent and open the interface in a new browser tab.

4. Use the compose box to send your agent a message and see it respond in the chat. Your agent's up and running locally!

5. Use <kbd>Ctrl+C</kbd> in both console windows to stop Agents Playground and your agent. Leave open the console window you used to create your agent, you'll need it again soon.

6. In your editor, undo the modification you made in step 3 to ensure a secure connection with Teams in the next steps.

## Log in with Teams developer CLI and confirm sideloading permissions

> [!NOTE]
> The next part of the quickstart requires a Microsoft 365 work or school account, licensed for Teams, with permissions to install custom Teams apps.
>
>If you don't have a Microsoft 365 account, you can proceed to [Next steps](#next-steps) to continue working on your agent's code and complete the rest of this quickstart later. See [Microsoft 365 Developer Program](/office/developer-program/microsoft-365-developer-program) for information about getting a developer sandbox subscription that you can use to try your app in Teams.

Use the Teams developer CLI to log in to your Microsoft 365 account.

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

1. In a new console window, install `devtunnel`.

   ## [Windows](#tab/windows)

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

1. Log in to `devtunnel` with your Microsoft 365 account and host a new tunnel.

    ```bash
    devtunnel user login
    devtunnel host --allow-anonymous --port-number 3978
    ```

    You'll see output like the following:

    ```output
    Connection to host tunnel relay restored.
    Hosting port: 3978
    Connect via browser: https://4r9dd5xj-3978.usw2.devtunnels.ms
    Inspect network activity: https://4r9dd5xj-3978-inspect.usw2.devtunnels.ms
    
    Ready to accept connections for tunnel: joyful-dog-xgz66vp.usw2
    ```

1. Leave the tunnel running. Record the `Connect via browser` URL for the next step.

## Register, install, and chat in Teams

1. In the console window you used to create your agent, use `teams app create` to register your agent with the Teams platform. Replace `<tunnel-host>` with the full `Connect via browser` URL from the previous step.

::: zone pivot="teams-sdk-typescript,teams-sdk-python"

    ```bash
    teams app create \
      --name echo-bot \
      --endpoint <tunnel-host>/api/messages \
      --env .env
    ```

::: zone-end

::: zone pivot="teams-sdk-csharp"

    ```bash
    teams app create \
      --name echo-bot \
      --endpoint //<tunnel-host>/api/messages \
      --env appsettings.json
    ```

::: zone-end

1. When the `create` command completes, it will display a menu. Select `Install in Teams` to open Teams and display the app's installer page. TODO "this app cannot be found"

1. Start your agent. TODO make sure this can be done afterwards, to reuse the window above?

::: zone pivot="teams-sdk-typescript"

    ```bash
    npm run dev
    ```
::: zone-end

::: zone pivot="teams-sdk-python"

    ```bash
    python src/main.py
    ```

::: zone-end

::: zone pivot="teams-sdk-csharp"

    ```bash
    dotnet run
    ```

::: zone-end

## Next steps

The starter code from this quickstart is the foundation for your first real agent - use it to experiment with agent features and development techniques. With your app installed in Teams Teams installation is a launchpad for your first real agent.

Because the hostname is stable across restarts, you can stop and restart your tunnel without re-registering the bot.
