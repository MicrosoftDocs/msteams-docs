---
title: "Quickstart: Create an agent with Teams SDK"
description: Create a Microsoft Teams agent using command-line tools and Teams SDK. Follow this quickstart to build, run, and chat with your agent locally.
ms.date: 07/09/2026
author: nickwalkmsft
ms.author: nickwalk
ms.reviewer: nickwalk
ms.topic: quickstart
zone_pivot_groups: teams-sdk-languages
---

# Quickstart: Create an agent and chat with it in Teams

In this quickstart, you'll use command-line developer tools to create a new Teams agent. At the end, you'll be chatting with your agent in Teams as its code runs in your local development environment. You'll be able to use the code and agent registration you create in this quickstart as the foundation for a fully-featured agent.

::: zone pivot="teams-sdk-typescript"

[!INCLUDE [typescript-quickstart](includes/typescript-quickstart.md)]

::: zone-end

::: zone pivot="teams-sdk-python"

[!INCLUDE [python-quickstart](includes/python-quickstart.md)]

::: zone-end

::: zone pivot="teams-sdk-csharp"

[!INCLUDE [dotnet-quickstart](includes/dotnet-quickstart.md)]

::: zone-end

## Host a dev tunnel

Teams can only communicate with agents that are reachable from the public Internet. In this step, you use the Microsoft dev tunnel utility to create a tunnel that will expose your agent to the Internet.

1. In a new console window, install dev tunnel.

   ## [Windows](#tab/windows)

    ```console
    winget install Microsoft.devtunnel
    ```

   ## [macOS](#tab/macos)

    ```bash
    curl -sL https://aka.ms/DevTunnelCliInstall | bash
    ```

   ## [Linux](#tab/linux)

    ```bash
    curl -sL https://aka.ms/DevTunnelCliInstall | bash
    ```

    ---

1. Log in to `devtunnel` with your Microsoft 365 account and host a new tunnel.

    ```console
    devtunnel user login
    devtunnel create --allow-anonymous
    devtunnel port create -p 3978
    devtunnel host
    ```

    You'll see output like the following:

    ```output
    Connection to host tunnel relay restored.
    Hosting port: 3978
    Connect via browser: https://4r9dd5xj-3978.usw2.devtunnels.ms
    Inspect network activity: https://4r9dd5xj-3978-inspect.usw2.devtunnels.ms
    
    Ready to accept connections for tunnel: joyful-dog-xgz66vp.usw2
    ```

1. Leave the tunnel running. Make a note of the `Connect via browser` URL for the next step.

## Register, install, and chat in Teams

::: zone pivot="teams-sdk-typescript,teams-sdk-python"

1. In the console window you used to create your agent project, use `teams app create` to register it with the Teams platform. Replace `<tunnel-host>` with the full `Connect via browser` URL from the previous step.

    ```console
    teams app create --endpoint <tunnel-host>/api/messages --name echo-bot --env .env
    ```

::: zone-end

::: zone pivot="teams-sdk-csharp"

1. In the console window you used to create your agent project, use `teams app create` to register it with the Teams platform. Replace `<tunnel-host>` with the full `Connect via browser` URL from the previous step.

    ```console
    teams app create --endpoint <tunnel-host>/api/messages --name echo-bot --env appsettings.json
    ```

::: zone-end

2. When the `create` command completes, it will display a menu. Select **Install in Teams** to open Teams and display the agent installer dialog.

    :::image type="content" source="../assets/images/agents-in-teams/app-installer-dialog.png" alt-text="Screenshot of the app installation dialog in Teams." lightbox="../assets/images/agents-in-teams/app-installer-dialog.png":::

::: zone pivot="teams-sdk-typescript"

3. Before proceeding in Teams, select **Done** in the Teams developer CLI menu to close it, and use the command line to start your agent again. Ensure that it is listening on port 3978 before continuing.

    ```console
    npm run dev
    ```

::: zone-end

::: zone pivot="teams-sdk-python"

3. Before proceeding in Teams, select **Done** in the Teams developer CLI menu to close it, and use the command line to start your agent again. Ensure that it is listening on port 3978 before continuing.

    ```console
    python src/main.py
    ```

::: zone-end

::: zone pivot="teams-sdk-csharp"

3. Before proceeding in Teams, select **Done** in the Teams developer CLI menu to close it, and use the command line to start your agent again. Ensure that it is listening on port 3978 before continuing.

    ```console
    dotnet run
    ```

::: zone-end

4. In Teams, select **Add** in the installer dialog to install the agent. In the **How would you like to use this app today?** dialog, select **Open** to open a one-on-one chat with the agent.

    :::image type="content" source="../assets/images/agents-in-teams/app-use-dialog.png" alt-text="Screenshot of Teams dialog asking how the user would like to use a newly-installed app." lightbox="../assets/images/agents-in-teams/app-use-dialog-lightbox.png":::

5. Chat with your agent in Teams!

    :::image type="content" source="../assets/images/agents-in-teams/teams-chat.png" alt-text="Screenshot of a brief chat interaction with an agent in Teams." lightbox="../assets/images/agents-in-teams/teams-chat.png":::

## Next steps

Everything you've created in this quickstart will persist and can be used as the foundation for building an agent. As long as your agent code and devtunnel are running in your development environment, your agent will be able to send and receive messages in Teams.

All of your agent's behavior is in its code: you can modify and restart it at any time to update its behavior without re-registering or reinstalling it in Teams.

Explore the documentation to learn more about features and best practices for agents in Teams.
