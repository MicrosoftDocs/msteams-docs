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

The `.vscode/launch.json` and `.vscode/tasks.json` controls the entire local debug workflow. In `launch.json`, "Debug" is the entry point for local debugging. Visual studio Code runs the compound preLaunchTask "Pre Debug Check & Start All", which is defined in `.vscode/tasks.json`, then Visual Studio Code launches the debuggers specified in the compound configurations, such as "Attach to Bot", "Attach to Backend", "Attach to Frontend", and "Launch Bot".  A `Node.js` debugger starts to attach to both the bot and Azure function source code. A Edge or Chrome debugger starts to launch a new browser instance and opens a web page to load Teams client. During local debug, Teams Toolkit resolves values of the placeholders "teamsAppId" and "account-hint" in `.vscode/launch.json`. Teams Toolkit contributes to several commands such as `fx-extension.validate-local-prerequisites`, `fx-extension.pre-debug-check`, and `fx-extension.get-func-path` in `tasks.json`.

## Prerequisites

Ensure to install the following softwares:

|Installation  | Description | Limitation |
| --- | --- | --- |
|Node.js | Install Node.js [Node.js](https://nodejs.org/) | The local debug terminates, if you have not installed Node.js or the version  doesn't match the requirement.|


| Project type  | Node.js LTS versions | Limitation |
| --- | --- | --- |
| Tab without Azure functions | 10, 12, **14 (recommended)**, 16 |The local debug terminates, if you have not installed Node.js or the version  doesn't match the requirement.|
| Tab with Azure functions | 10, 12, **14 (recommended)** |The local debug terminates, if you have not installed Node.js or the version  doesn't match the requirement.|
| Bot | 10, 12, **14 (recommended)**, 16 |The local debug terminates, if you have not installed Node.js or the version  doesn't match the requirement.|
| Messaging extension | 10, 12, **14 (recommended)**, 16 |The local debug terminates, if you have not installed Node.js or the version  doesn't match the requirement.|
|Sign in to M365 account | Teams toolkit prompts to sign in to M365, if you have not signed in |-|
|Bot, messaging extension | Install Ngrok. The Ngrok binary requires version 2.3 | <br> - If you have not installed Ngrok or the version doesn't match the requirement, the toolkit installs Ngrok NPM package `ngrok@4.2.2` in `~/.fx/bin/ngrok`. </br><br>- The Ngrok binary is managed by Ngrok NPM package in `/.fx/bin/ngrok/node modules/ngrok/bin`.|</br?>
|Azure functions | Install Azure Functions Core Tools. The Azure Functions Core Tools requires binary version 3.|<br> - If you have not installed Azure Functions Core Tools or the version doesn't  match the requirement, the toolkit installs Azure Functions Core Tools NPM package, azure-functions-core-tools@3 for **Windows** and for **macOs** in  `~/.fx/bin/func`. </br> <br>- The  Azure Functions Core Tools NPM package in  `~/.fx/bin/func/node_modules/azure-functions-core-tools/bin` manages Azure Functions Core Tools binary. For Linux, the local debug terminates.|</br>
|Azure functions | Install .NET Core SDK| * If .NET Core SDK is not installed or the version  doesn't match the requirement, the toolkit installs .NET Core SDK for Windows and macOS in `~/.fx/bin/dotnet`. * For Linux, the local debug terminates.|
|Azure functions | Install Azure functions binding extensions defined in `api/extensions.csproj`|-|
|NPM packages| Install NPM packages for tab app, bot app, messaging extension app, and Azure functions|-|


| Platform  | .NET core SDK versions |
| --- | --- |
|  Windows, macOs (x64), Linux |  **3.1 (recommended)**, 5.0, 6.0 |
|  macOs (arm64) |  6.0 |

  > [!NOTE]
  > If you don't have a development certificate for localhost installed in **Windows or macOS**, the tab prompts you to install it.

* Start Ngrok to create a HTTP tunnel for bot and messaging extension.

* If tab, bot, messaging extension, and Azure functions ports are unavailable, the local debug terminates.

The following ports are:

| Component  | Port |
| --- | --- |
| Tab | 53000 |
| Bot or messaging extension | 3978 |
| Node inspector for bot or messaging extension | 9239 |
| Azure functions | 7071 |
| Node inspector for Azure functions | 9229 |

The Teams Toolkit output channel displays the progress and result of checking prerequisites.

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
| Tab | [Local](https://localhost:53000/auth-end.html) | [Localhost](https://localhost:53000/auth-end.html?clientId={appId>}) |
| Bot or messaging extension | [Ngrok](https://ngrok.io/auth-end.html) | NA |

## Register and configure bot

For tab app or messaging extension app:

1. Register an Azure AD application.

1. Create a client secret for the Azure AD application.

1. Register a bot in Microsoft Bot Framework [Framework](https://dev.botframework.com/) using the Azure AD application.

1. Add Microsoft Teams channel.

1. Configure messaging endpoint as [Messages](https://ngrok.io/api/messages).

## Register and configure Teams app

Register a Teams app in Teams Developer Portal [Developer](https://dev.teams.microsoft.com/home) using the manifest template in `templates/appPackage/manifest.local.template.json`.

## Start app services, launch debuggers and sideload Teams app

Run tasks defined in `.vscode/tasks.json` to start app services as follows:

|  Component |  Task name  | Folder |
| --- | --- | --- |
|  Tab |  Start Frontend |  tabs |
|  Bot or messaging extensions |  Start Bot |  bot |
|  Azure functions |  Start backend |  api |

After all app services are started, launch the debug configurations defined in `.vscode/launch.json` as follows:

:::image type="content" source="../assets/images/teams-toolkit-v2/Terminal.png" alt-text="Start frontend task":::

For project with tab app and bot app:

|  Component |  Debug configuration name  | Debug configuration type  |
| --- | --- | --- |
|  Tab |  Attach to Frontend (Edge) or Attach to Frontend (Chrome)  |  pwa-msedge or pwa-mschrome  |
|  Bot or messaging extensions |  Attach to Bot |  pwa-node  |
|  Azure functions |  Attach to backend |  pwa-node  |

For project with bot app and without tab app:

|  Component |  Debug configuration name  | Debug configuration type  |
| --- | --- | --- |
|  Bot or messaging extension  |  Launch Bot (Edge) or Launch Bot (Chrome)  |   pwa-msedge or pwa-mschrome  |
|  Bot or messaging extension  |  Attach to Bot |  pwa-node  |
|  Azure functions |  Attach to backend |  pwa-node  |

Configuration attach to Frontend or Launch Bot launches a new Edge or Chrome browser instance and opens a web page to load Teams client. After the Teams client is completely loaded, Teams sideloads the Teams app controlled by the sideloading url defined in the launch configurations,
i.e. [Microsoft Teams](https://teams.microsoft.com/l/app/>${localTeamsAppId}?installAppPackage=true&webjoin=true&${account-hint}).


## Local debug files

-`.fx/configs/localSettings.json:` local debug configuration file. The values of each configuration generates and saves during local debug.

-`templates/appPackage/manifest.local.template.json:` Teams app manifest template file for local debug. The placeholders in the file resolves during local debug.

-`tabs/.env.teams.local:` environment variables file for tab. The values of each environment variable generates and saves during local debug.

-`bot/.env.teamsfx.local:` environment variables file for bot and messaging extension. The values of each environment variable  generates and saves during local debug.

-`api/.env.teamsfx.local:` environment variables file for Azure functions. The values of each environment variable  generates and saves during local debug.

## How to customize Teams Toolkit local debug

## Skip checking some prerequisites

In Visual Studio Code settings, uncheck the items to skip checking some prerequisites.

:::image type="content" source="../assets/images/teams-toolkit-v2/prerequisite check.png" alt-text="vsc setting":::

## Use your own bot endpoint

1. In Visual Studio Code settings, uncheck "Ensure Ngrok is installed and started (ngrok)".

1. Set botDomain and botEndpoint configuration in `.fx/configs/localSettings.json` to your own domain and endpoint.

## Use your own development certificate

1. In Visual Studio Code settings, uncheck Ensure development certificate is trusted (devCert).

1. Set sslCertFile and sslKeyFile configuration in `.fx/configs/localSettings.json` to your own certificate file path and key file path.

## Use your own start scripts to start app services

1. For tab, update `dev:teamsfx script in tabs/package.json`.

1. For bot or messaging extension, update`dev:teamsfx script in bot/package.json`.

1. For Azure functions, update `dev:teamsfx script in api/package.json` and for TypeScript update `watch:teamsfx script`.


 > [!NOTE]
 > Currently, the tab, bot, messaging extension apps, and Azure functions doesn't support customization.


## Add environment variables

1. You can add environment variables to `.env.teamsfx.local` file for tab, bot, messaging extension and Azure functions. Teams Toolkit loads the environment variables you added to start services during local debug.

 > [!NOTE]
 > Ensure to start a new local debug after adding new environment variables as the environment variables doesn't support to hot reload.

## Debug partial component

Teams Toolkit utilizes Visual Studio Code multi-target debugging to debug tab, bot, messaging extension and Azure functions at the same time. You can update `.vscode/launch.json`` and .vscode/tasks.json` to debug partial component. If you want to debug tab only in a tab plus bot with Azure functions project, you can take the following steps:

1. Comment **Attach to Bot** and **Attach to Backend** from Debug compound in `.vscode/launch.json`, like

 ```json
{
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

1. Comment **Start Backend**  and "Start Bot" from "Start All" task in .vscode/tasks.json, such 

```json
{
                    
            "label": "Start All",
            "dependsOn": [
                "Start Frontend",
                // "Start Backend",
                // "Start Bot"
            ]
        

}
```

## See also

* [Debug overview](debug.md).