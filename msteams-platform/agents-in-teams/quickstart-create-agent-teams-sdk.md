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

::: zone pivot="teams-sdk-typescript"

[!INCLUDE [typescript-quickstart](includes/typescript-quickstart.md)]

::: zone-end

::: zone pivot="teams-sdk-python"

[!INCLUDE [python-quickstart](includes/python-quickstart.md)]

::: zone-end

::: zone pivot="teams-sdk-csharp"

[!INCLUDE [dotnet-quickstart](includes/dotnet-quickstart.md)]

::: zone-end

## Create a dev tunnel

Teams can only communicate with agents that are reachable from the public Internet. In this step, you use the Microsoft dev tunnel utility to create a tunnel that will expose your agent to the Internet.

1. In a new console window, install dev tunnel.

   ## [Windows](#tab/windows)

    ```powershell
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

1. Leave the tunnel running. Make a note of the `Connect via browser` URL for the next step.

## Register, install, and chat in Teams

1. In the console window you used to create your agent, use `teams app create` to register it with the Teams platform. Replace `<tunnel-host>` with the full `Connect via browser` URL from the previous step.

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
      --endpoint <tunnel-host>/api/messages \
      --env appsettings.json
    ```

::: zone-end

1. When the `create` command completes, it will display a menu. Select `Install in Teams` to open Teams and display the app's installer page.

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
