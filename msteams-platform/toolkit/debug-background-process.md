---
title: Debug background processes
author: zyxiaoyuer
description: Function of Visual studio code and Teams Toolkit during local debug
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/03/2022
---

# Debug background process

The local debug workflow involves the `.vscode/launch.json` and `.vscode/tasks.json` files to configure the debugger in :::image type="icon" source="../assets/icons/vsc-icon.png" border="false"::: Visual Studio Code, then the :::image type="icon" source="../assets/icons/vsc-icon.png" border="false"::: Visual Studio Code launches the debuggers, and  :::image type="icon" source="../assets/icons/edge-icon.png" border="false"::: Microsoft Edge or :::image type="icon" source="../assets/icons/chrome-icon.png" border="false"::: Chrome debugger launches a new browser instance as follows:

1. The `launch.json` file configures the debugger in :::image type="icon" source="../assets/icons/vsc-icon.png" border="false"::: Visual Studio Code. 

2. :::image type="icon" source="../assets/icons/vsc-icon.png" border="false"::: Visual Studio Code runs the compound `preLaunchTask`, `Pre Debug Check & Start All` in `.vscode/tasks.json` file.

3. :::image type="icon" source="../assets/icons/vsc-icon.png" border="false"::: Visual Studio Code then launches the debuggers specified in the compound configurations, such as **Attach to Bot**, **Attach to Backend**, **Attach to Frontend**, and **Launch Bot**.

4.  :::image type="icon" source="../assets/icons/edge-icon.png" border="false"::: Microsoft Edge or :::image type="icon" source="../assets/icons/chrome-icon.png" border="false"::: Chrome debugger launches a new browser instance and opens a web page to load Teams client.

## Prerequisites

:::image type="icon" source="../assets/icons/sidebar-icon.png" border="false"::: Teams Toolkit checks the following prerequisites during the debug process:

* Node.js, applicable for project types, such as tab without Azure functions, tab with :::image type="icon" source="../assets/icons/azure-icon.png" border="false"::: Azure functions, bot and messaging extensions.

  |Project type|Node.js LTS version|
  |----------|--------------------------------|
  |Tab without Azure functions | 10, 12, **14 (recommended)**, 16 |
  |Tab with :::image type="icon" source="../assets/icons/azure-icon.png" border="false"::: Azure functions | 10, 12, **14 (recommended)**|
  |Bot |  10, 12, **14 (recommended)**, 16|
  |Messaging extension | 10, 12, **14 (recommended)**, 16 |

   
* :::image type="icon" source="../assets/icons/microsoft-icon.png" border="false"::: Microsoft 365 account with valid credentials, the :::image type="icon" source="../assets/icons/sidebar-icon.png" border="false"::: Teams toolkit prompts you to sign in to :::image type="icon" source="../assets/icons/microsoft-icon.png" border="false"::: Microsoft 365 account, if you haven't signed in.

* Custom app uploading or sideloading for your developer tenant is turned on. If not, the local debug terminates.

* Ngrok binary version 2.3, applicable for bot and messaging extension.  If Ngrok is not installed or the version doesn't match the requirement, the :::image type="icon" source="../assets/icons/sidebar-icon.png" border="false":::Teams toolkit installs Ngrok NPM package `ngrok@4.2.2` in `~/.fx/bin/ngrok`. The Ngrok binary is managed by Ngrok NPM package in `/.fx/bin/ngrok/node modules/ngrok/bin`.

* :::image type="icon" source="../assets/icons/azure-icon.png" border="false"::: Azure Functions Core Tools version 3. If :::image type="icon" source="../assets/icons/azure-icon.png" border="false"::: Azure Functions Core Tools is not installed or the version doesn't match the requirement, the :::image type="icon" source="../assets/icons/sidebar-icon.png" border="false"::: Teams toolkit installs :::image type="icon" source="../assets/icons/azure-icon.png" border="false"::: Azure Functions Core Tools NPM package, azure-functions-core-tools@3 for **Windows** and for **macOs** in  `~/.fx/bin/func`. The :::image type="icon" source="../assets/icons/azure-icon.png" border="false"::: Azure Functions Core Tools NPM package in  `~/.fx/bin/func/node_modules/azure-functions-core-tools/bin` manages :::image type="icon" source="../assets/icons/azure-icon.png" border="false"::: Azure Functions Core Tools binary. For :::image type="icon" source="../assets/icons/linux-icon.png" border="false"::: Linux, the local debug terminates.

* .NET Core SDK version, applicable for :::image type="icon" source="../assets/icons/azure-icon.png" border="false"::: Azure functions. If .NET Core SDK is not installed or the version  doesn't match the requirement, the :::image type="icon" source="../assets/icons/sidebar-icon.png" border="false"::: Teams Toolkit installs .NET Core SDK for :::image type="icon" source="../assets/icons/windows-icon.png" border="false"::: Windows and :::image type="icon" source="../assets/icons/macos-icon.png" border="false"::: macOS in `~/.fx/bin/dotnet`. For :::image type="icon" source="../assets/icons/linux-icon.png" border="false"::: Linux, the local debug terminates.

  Use the following .NET Core versions:

  | Platform  | Software|
  | --- | --- |
  |:::image type="icon" source="../assets/icons/windows-icon.png" border="false"::: Windows, :::image type="icon" source="../assets/icons/macos-icon.png" border="false":::macOs (x64), :::image type="icon" source="../assets/icons/linux-icon.png" border="false"::: Linux | **3.1 (recommended)**, 5.0, 6.0 |
  |:::image type="icon" source="../assets/icons/macos-icon.png" border="false":::macOs (arm64) |6.0 |


* Development certificate. If the development certificate for localhost is not installed for tab in :::image type="icon" source="../assets/icons/windows-icon.png" border="false"::: Windows or :::image type="icon" source="../assets/icons/macos-icon.png" border="false"::: macOS, the :::image type="icon" source="../assets/icons/sidebar-icon.png" border="false"::: Teams toolkit prompts you to install it.

* Azure functions binding extensions defined in `api/extensions.csproj`. If :::image type="icon" source="../assets/icons/azure-icon.png" border="false"::: Azure functions binding extensions is not installed, the :::image type="icon" source="../assets/icons/sidebar-icon.png" border="false"::: Teams Toolkit installs :::image type="icon" source="../assets/icons/azure-icon.png" border="false"::: Azure functions binding extensions.

* NPM packages, applicable for tab app, bot app, messaging extension app, and :::image type="icon" source="../assets/icons/azure-icon.png" border="false"::: Azure functions. If NPM is not installed, the :::image type="icon" source="../assets/icons/sidebar-icon.png" border="false":::Teams Toolkit installs all NPM packages.

* Bot and messaging extension. :::image type="icon" source="../assets/icons/sidebar-icon.png" border="false"::: Teams Toolkit starts Ngrok to create a HTTP tunnel for bot and messaging extension.

* Ports available. If tab, bot, messaging extension, and :::image type="icon" source="../assets/icons/azure-icon.png" border="false"::: Azure functions ports are unavailable, the local debug terminates.

  The following table lists the ports available for components:

  | Component  | Port |
  | --- | --- |
  | Tab | 53000 |
  | Bot or messaging extension | 3978 |
  | Node inspector for bot or messaging extension | 9239 |
  | :::image type="icon" source="../assets/icons/azure-icon.png" border="false"::: Azure functions | 7071 |
  | Node inspector for :::image type="icon" source="../assets/icons/azure-icon.png" border="false"::: Azure functions | 9229 |


<!-- The following table lists the limitations if the required software is unavailable for debugging:

|Project type|Installation| Limitation|
|----------|--------------------------------|-----|
|Tab without Azure functions | Node.js LTS versions 10, 12, **14 (recommended)**, 16 | The local debug terminates, if Node.js is not installed or the version doesn't match the requirement.|
|Tab with Azure functions | Node.js LTS versions 10, 12, **14 (recommended)** |The local debug terminates, if Node.js is not installed or the version doesn't match the requirement.|
|Bot | Node.js LTS versions 10, 12, **14 (recommended)**, 16|The local debug terminates, if Node.js is not installed or the version doesn't match the requirement.|
|Messaging extension | Node.js LTS versions 10, 12, **14 (recommended)**, 16 |The local debug terminates, if Node.js is not installed or the version doesn't match the requirement.|
|Sign in to Microsoft 365 account | Microsoft 365 credentials |Teams toolkit prompts you to sign in to Microsoft 365 account, if you haven't signed in. |
|Bot, messaging extension | Ngrok version 2.3| • If Ngrok is not installed or the version doesn't match the requirement, the Teams toolkit installs Ngrok NPM package `ngrok@4.2.2` in `~/.fx/bin/ngrok`. </br> • The Ngrok binary is managed by Ngrok NPM package in `/.fx/bin/ngrok/node modules/ngrok/bin`.|
|Azure functions | Azure Functions Core Tools version 3| • If Azure Functions Core Tools is not installed or the version doesn't match the requirement, the Teams toolkit installs Azure Functions Core Tools NPM package, azure-functions-core-tools@3 for **Windows** and for **macOs** in  `~/.fx/bin/func`. </br> • The Azure Functions Core Tools NPM package in  `~/.fx/bin/func/node_modules/azure-functions-core-tools/bin` manages Azure Functions Core Tools binary. For Linux, the local debug terminates.|
|Azure functions |.NET Core SDK version|• If .NET Core SDK is not installed or the version  doesn't match the requirement, the toolkit installs .NET Core SDK for Windows and macOS in `~/.fx/bin/dotnet`.</br> • For Linux, the local debug terminates.|
|Azure functions | Azure functions binding extensions defined in `api/extensions.csproj`| If Azure functions binding extensions is not installed, the toolkit installs Azure functions binding extensions.|
|NPM packages| NPM packages for tab app, bot app, messaging extension app, and Azure functions|If NPM is not installed, the toolkit installs all NPM packages.|
|Bot and messaging extension | Ngrok |Toolkit starts Ngrok to create a HTTP tunnel for bot and messaging extension. |

> [!NOTE]
> If tab, bot, messaging extension, and Azure functions ports are unavailable, the local debug terminates.

Use the following .NET Core versions:

| Platform  | Software|
| --- | --- |
|Windows, macOs (x64), Linux | **3.1 (recommended)**, 5.0, 6.0 |
|macOs (arm64) |6.0 |


> [!NOTE]
> If the development certificate for localhost is not installed for tab in Windows or macOS, the Teams toolkit prompts you to install it.</br> -->


When you select **Start Debugging (F5)**, the :::image type="icon" source="../assets/icons/sidebar-icon.png" border="false"::: Teams Toolkit output channel displays the progress and result after checking the prerequisites.

:::image type="content" source="../assets/images/teams-toolkit-v2/debug/prerequisites-debugcheck.png" alt-text="prerequisites":::

## Registrations and configurations for your Teams app

In the set up process, :::image type="icon" source="../assets/icons/sidebar-icon.png" border="false"::: Teams Toolkit prepares the following registrations and configurations for your Teams app:

1. [Registers and configures :::image type="icon" source="../assets/icons/aad-icon.png" border="false"::: Azure AD application](#registers-and-configures-azure-ad-application): :::image type="icon" source="../assets/icons/sidebar-icon.png" border="false"::: Teams Toolkit registers and configures your :::image type="icon" source="../assets/icons/aad-icon.png" border="false"::: Azure AD application.

1. [Registers and configures bot](#registers-and-configures-bot): :::image type="icon" source="../assets/icons/sidebar-icon.png" border="false"::: Teams Toolkit registers and configures your bot for tab or messaging extension app.

1. [Registers and configures Teams app](#registers-and-configures-teams-app): :::image type="icon" source="../assets/icons/sidebar-icon.png" border="false"::: Teams Toolkit registers and configures your Teams app.

### Registers and configures Azure AD application

1. Registers an :::image type="icon" source="../assets/icons/aad-icon.png" border="false"::: Azure AD application.

1. Creates a Client Secret.

1. Exposes an API.

    a. Configures Application ID URI. For tab, `api://localhost/{appId}`. For bot or messaging extension,  `api://botid-{botid}`.

    b. Adds a scope named `access_as_user`. Enables it for **Admin and users**.

  The following table lists the configurations of :::image type="icon" source="../assets/icons/microsoft-icon.png" border="false":::Microsoft 365 client application with the client Ids:

  | :::image type="icon" source="../assets/icons/microsoft-icon.png" border="false":::Microsoft 365 client application |  Client ID  |
  | --- | --- |
  | Teams desktop, mobile | 1fec8e78-bce4-4aaf-ab1b-5451cc387264 |
  | Teams web | 5e3ce6c0-2b1f-4285-8d4b-75ee78787346 |
  | Office.com | 4345a7b9-9a63-4910-a426-35363201d503 |
  | Office.com | 4765445b-32c6-49b0-83e6-1d93765276ca |
  | Office desktop | 0ec893e0-5785-4de6-99da-4ed124e5296c |
  | Outlook desktop | d3590ed6-52b3-4102-aeff-aad2292ab01c |
  | Outlook Web Access | 00000002-0000-0ff1-ce00-000000000000 |
  | Outlook Web Access | bc59ab01-8403-45c6-8796-ac3ef710b3e3 |

4. Configures API permissions. Adds Microsoft Graph permission to **User.Read**.

The following table lists the configuration of the authentication as follows:

  | Project type | Redirect URIs for web | Redirect URIs for single-page application |
  | --- | --- | --- |
  | Tab | `https://localhost:53000/auth-end.html` | `https://localhost:53000/auth-end.html?clientId={appId>}` |
  | Bot or messaging extension | `https://ngrok.io/auth-end.html` | NA |
  
### Registers and configures bot 

For tab app or messaging extension app:

1. Registers an :::image type="icon" source="../assets/icons/aad-icon.png" border="false"::: Azure AD application.

1. Creates a Client Secret for the :::image type="icon" source="../assets/icons/aad-icon.png" border="false"::: Azure AD application.

1. Registers a bot in [Microsoft Bot Framework](https://dev.botframework.com/) using the :::image type="icon" source="../assets/icons/aad-icon.png" border="false"::: Azure AD application.

1. Adds Microsoft Teams channel.

1. Configures messaging endpoint as `https://{ngrokTunnelId}.ngrok.io/api/messages`.

### Registers and configures Teams app

Registers a Teams app in [Developer](https://dev.teams.microsoft.com/home) using the manifest template in `templates/appPackage/manifest.local.template.json`.

After registering and configuring the app, local debug files get generated.

## Take a tour of your app source code

You can view the project folders and files in the Explorer area of :::image type="icon" source="../assets/icons/vsc-icon.png" border="false"::: Visual Studio Code after the :::image type="icon" source="../assets/icons/sidebar-icon.png" border="false"::: Teams Toolkit registers and configures your app. The following table lists the local debug files and the configuration types:

| Folder name| Contents| Debug configuration type |
| --- | --- | --- |
|  `.fx/configs/localSettings.json` | Local debug configuration file | The values of each configuration generates and saves during local debug. |
|  `templates/appPackage/manifest.local.template.json` | Teams app manifest template file for local debug | The placeholders in the file resolves during local debug. |
|  `tabs/.env.teams.local`  | Environment variables file for tab  | The values of each environment variable generates and saves during local debug. |
|  `bot/.env.teamsfx.local` | Environment variables file for bot and messaging extension| The values of each environment variable generates and saves during local debug. |
| `api/.env.teamsfx.local`  | Environment variables file for :::image type="icon" source="../assets/icons/azure-icon.png" border="false"::: Azure functions | The values of each environment variable generates and saves during local debug. |


## See also

[Debug your Teams app using Teams Toolkit](debug-local.md)