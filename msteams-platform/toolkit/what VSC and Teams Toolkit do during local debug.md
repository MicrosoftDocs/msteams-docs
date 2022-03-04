---
title: What Visual studio code and Teams Toolkit do during local debug
author: zyxiaoyuer
description: Function of Visual studio code and Teams Toolkit during local debug
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: overview
ms.date: 03/03/2022
---

# Overview

The whole local debug workflow is controlled by `.vscode/launch.json` and `.vscode/tasks.json.`
There is a compound named **Debug** in `launch.json` that is the entry point for local debugging. Visual studio Code will first run the compound preLaunchTask **Pre Debug Check & Start All** which is defined in `.vscode/tasks.json`. Following the completion of this operation, Visual Studio Code will launch the debuggers specified in the compound configurations, such as **Attach to Bot**, **Attach to Backend**, **Attach to Frontend**, and **Launch Bot**.  A `Node.js` debugger will be started to attach to the bot source code and also to the Azure functions source code. A Edge or Chrome debugger will be started to launch a new browser instance and open a web page to load Teams client. There are several placeholders **teamsAppId** and **account-hint** in `.vscode/launch.json` whose values will be resolved by Teams Toolkit during local debug. In `tasks.json`, there are several commands `fx-extension.validate-local-prerequisites`, `fx-extension.pre-debug-check` and `fx-extension.get-func-path` which are contributed by Teams Toolkit.

## Check all required prerequisites

1. Ensure if Node.js is installed (<https://nodejs.org/>)

| Project type  | Node.js LTS versions |
| --- | --- |
| Tab without Azure functions | 10, 12, **14 (recommended)**, 16 |
| Tab with Azure functions | 10, 12, **14 (recommended)** |
| Bot | 10, 12, **14 (recommended)**, 16 |
| Messaging extension | 10, 12, **14 (recommended)**, 16 |

If Node.js is not installed or the version does not match the requirement, the local debug will be terminated.

1. Ensure if you have signed in to **Microsoft 365** account. If not then sign in to your account.

1. For **bot and messaging extension**, ensure if `Ngrok` is installed. The Ngrok binary version required is 2.3. If Ngrok is not installed or the version does not match the requirement, the toolkit will install Ngrok NPM package `ngrok@4.2.2` in `~/.fx/bin/ngrok`. The Ngrok binary is managed by Ngrok NPM package in `/.fx/bin/ngrok/node modules/ngrok/bin`.

1. For **Azure functions**, ensure if Azure Functions Core Tools is installed. The Azure Functions Core Tools binary version required is 3. If Azure Functions Core Tools is not installed or the version does not match the requirement, the toolkit will install Azure Functions Core Tools NPM package, azure-functions-core-tools@3 for **Windows** and for **macOs** in `~/.fx/bin/func`. The **Azure Functions Core Tools** binary is managed by Azure Functions Core Tools NPM package in `~/.fx/bin/func/node_modules/azure-functions-core-tools/bin`. For Linux, the local debug will be terminated.

1. For Azure functions, ensure if **.NET Core SDK** is installed. The .NET Core versions required are as follows:

| Platform  | .NET core SDK versions |
| --- | --- |
|  Windows, macOs (x64), Linux |  **3.1 (recommended)**, 5.0, 6.0 |
|  macOs (arm64) |  6.0 |

If .NET Core SDK is not installed or the version does not match the requirement, the toolkit will install .NET Core SDK for Windows and macOS in `~/.fx/bin/dotnet`. For Linux, the local debug will be terminated.

1. If you don't have a development certificate for localhost installed in **Windows or macOS**, the tab will urge you to do so.

1. For Azure functions, ensure if Azure functions binding extensions defined in `api/extensions.csproj` are installed. If not will install Azure functions binding extensions.

1. Ensure if NPM packages for tab app, bot app, messaging extension app and Azure functions are installed. If not install all NPM packages.

1. Start Ngrok to create a HTTP tunnel for bot and messaging extension.

1. If ports required by tab, bot, messaging extension and Azure functions are already in use, the local debug will be terminated.

The ports required are as follows:

| Component  | Port |
| --- | --- |
| Tab | 53000 |
| Bot or messaging extension | 3978 |
| Node inspector for bot or messaging extension | 9239 |
| Azure functions | 7071 |
| Node inspector for Azure functions | 9229 |

The progress and result of checking prerequisites will be displayed in the output channel named Teams Toolkit.

:::image type="content" source="../assets/images/teams-toolkit-v2/pre-toolkit.png" alt-text="prerequisites":::

### Register and configure Azure AD application

1. Register an Azure AD application.

1. Create a client secret.

1. Expose an API.

    a. Configure application ID URI. For tab, set `api://localhost/{appId}`. For bot or messaging extension, set `api://botid-{botid}`.

    b. Add a scope named `access_as_user`. Enable it for **Admin and users**.

| Microsoft 365 client application |  Client ID  |
| --- | --- |
| Teams desktop, mobile | 1fec8e78-bce4-4aaf-ab1b-5451cc387264 |
| Teams web | 5e3ce6c0-2b1f-4285-8d4b-75ee78787346 |
| Office.com | 4345a7b9-9a63-4910-a426-35363201d503 |
| Office.com | 4765445b-32c6-49b0-83e6-1d93765276ca |
| Office desktop | 0ec893e0-5785-4de6-99da-4ed124e5296c |
| Outlook desktop | d3590ed6-52b3-4102-aeff-aad2292ab01c |
| Outlook Web Access | 00000002-0000-0ff1-ce00-000000000000 |
| Outlook Web Access | bc59ab01-8403-45c6-8796-ac3ef710b3e3 |

4. Configure API permissions. Add Microsoft Graph permission to **User.Read**.

5. Configure the authentication as follows:

| Project type | Redirect URIs for web | Redirect URIs for single-page application |
| --- | --- | --- |
| Tab | <https://localhost:53000/auth-end.html> | <https://localhost:53000/auth-end.html?clientId={appId>} |
| Bot or messaging extension | <https://ngrok.io/auth-end.html> | NA |

## Register and configure bot

For tab app or messaging extension app:

1. Register an Azure AD application.

1. Create a client secret for the Azure AD application.

1. Register a bot in Microsoft Bot Framework <https://dev.botframework.com/k> using the Azure AD application.

1. Add Microsoft Teams channel.

1. Configure messaging endpoint as <https://ngrok.io/api/messages>

## Register and configure Teams app

Register a Teams app in Teams Developer Portal <https://dev.teams.microsoft.com/home> using the manifest template in `templates/appPackage/manifest.local.template.json`.

## Start app services, launch debuggers and sideload Teams app

Run tasks defined in `.vscode/tasks.json` to start app services as follows.

|  Component |  Task name  | Folder |
| --- | --- | --- |
|  Tab |  Start Frontend |  tabs |
|  Bot or messaging extensions |  Start Bot |  bot |
|  Azure functions |  Start backend |  api |

After all app services are started, launch the debug configurations defined in `.vscode/launch.json` as follows.

:::image type="content" source="../assets/images/teams-toolkit-v2/Terminal.png" alt-text="Start frontend task":::

For project with tab app and bot app.

|  Component |  Debug configuration name  | Debug configuration type  |
| --- | --- | --- |
|  Tab |  Attach to Frontend (Edge) or Attach to Frontend (Chrome)  |  pwa-msedge or pwa-mschrome  |
|  Bot or messaging extensions |  Attach to Bot |  pwa-node  |
|  Azure functions |  Attach to backend |  pwa-node  |

For project with bot app but without tab app.

|  Component |  Debug configuration name  | Debug configuration type  |
| --- | --- | --- |
|  Bot or messaging extension  |  Launch Bot (Edge) or Launch Bot (Chrome)  |   pwa-msedge or pwa-mschrome  |
|  Bot or messaging extension  |  Attach to Bot |  pwa-node  |
|  Azure functions |  Attach to backend |  pwa-node  |

Configuration Attach to Frontend or Launch Bot will launch a new Edge or Chrome browser instance and open a web page to load Teams client. After the Teams client is completely loaded, Teams will sideload the Teams app controlled by the sideloading url defined in the launch configurations, i.e. [Microsoft Teams](<https://teams.microsoft.com/l/app/>${localTeamsAppId}?installAppPackage=true&webjoin=true&${account-hint}).

## Local debug files

- `.fx/configs/localSettings.json:` local debug configuration file. The values of each configuration will be generated and saved during local debug.

- `templates/appPackage/manifest.local.template.json:` Teams app manifest template file for local debug. The placeholders in this file will be resolved during local debug.

- `tabs/.env.teams.local:` environment variables file for tab. The values of each environment variable will be generated and saved during local debug.

- `bot/.env.teamsfx.local:` environment variables file for bot and messaging extension. The values of each environment variable will be generated and saved during local debug.

- `api/.env.teamsfx.local:` environment variables file for Azure functions. The values of each environment variable will be generated and saved during local debug.

## How to customize Teams Toolkit local debug

## Skip checking some prerequisites

In Visual Studio Code settings, uncheck the items to skip checking some prerequisites.

:::image type="content" source="../assets/images/teams-toolkit-v2/prerequisite check.png" alt-text="vsc setting":::

## Use your own bot endpoint

1. In Visual Studio Code settings, uncheck **Ensure Ngrok is installed and started (ngrok)**.

1. Set **botDomain** and **botEndpoint** configuration in `.fx/configs/localSettings.json` to your own domain and endpoint.

## Use your own development certificate

1. In Visual Studio Code settings, uncheck **Ensure development certificate is trusted (devCert)**

1. Set **sslCertFile** and **sslKeyFile** configuration in `.fx/configs/localSettings.json` to your own certificate file path and key file path.

## Use your own start scripts to start app services

1. For **tab**, update `dev:teamsfx script in tabs/package.json`.

1. For **bot or messaging extension**, update`dev:teamsfx script in bot/package.json`.

1. For **Azure functions**, update `dev:teamsfx script in api/package.json` and for **TypeScript** update `watch:teamsfx script`. 

 > [!NOTE]
 > Ensure you should start a new local debug after adding new environment variables as the environment variables are not support to hot reload.

## Debug partial component

Teams Toolkit utilizes Visual Studio Code multi-target debugging to debug tab, bot, messaging extension and Azure functions at the same time. You can update `.vscode/launch.json`` and .vscode/tasks.json` to debug partial component. If you want to debug tab only in a tab plus bot with Azure functions project, you can take the following steps:

1. Comment **Attach to Bot** and **Attach to Backend** from Debug compound in `.vscode/launch.json`, like

 ```{
            "name": "Debug (Edge)",
            "configurations": [
                "Attach to Frontend (Edge)",
                // "Attach to Bot",
                // "Attach to Backend"
            ],
            "preLaunchTask": "Pre Debug Check & Start All",
            "presentation": {
                "group": "all",
                "order": 1
            },
            "stopAll": true
        }
         ```

1. Comment **Start Backend**  and "Start Bot" from "Start All" task in .vscode/tasks.json, such as




        ```{
            "label": "Start All",
            "dependsOn": [
                "Start Frontend",
                // "Start Backend",
                // "Start Bot"
            ]
        }```

