---
title: Debug background processes
author: zyxiaoyuer
description: In this module, learn function of Visual studio code and Teams Toolkit during local debug and register and configure your Teams app
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/03/2022
---

# Debug background process

The local debug workflow involves the `.vscode/launch.json` and `.vscode/tasks.json` files to configure the debugger in VS Code, then the VS Code launches the debuggers, and Microsoft Edge or Chrome debugger launches a new browser instance as follows:

1. The `launch.json` file configures the debugger in VS Code.

2. VS Code runs the compound **preLaunchTask**, **Pre Debug Check & Start All** in `.vscode/tasks.json` file.

3. VS Code then launches the debuggers specified in the compound configurations, such as **Attach to Bot**, **Attach to Backend**, **Attach to Frontend**, and **Launch Bot**.

4. Microsoft Edge or Chrome debugger launches a new browser instance and opens a web page to load Teams client.

## Prerequisites

Teams Toolkit checks the following prerequisites during the debug process:

* Node.js, applicable for the following project types:

  |Project type|Node.js LTS version|
  |----------|--------------------------------|
  |Tab | 14, 16 (recommended) |
  |SPFx Tab | 12, 14 (recommended)|
  |Bot |  14, 16 (recommended)|
  |Message extension | 14, 16 (recommended) |

* Microsoft 365 account with valid credentials, the Teams toolkit prompts you to sign in to Microsoft 365 account, if you haven't signed in.

* Custom app uploading or sideloading for your developer tenant is turned on, if not then the local debug terminates.

* Ngrok binary version 2.3 is applicable for bot and message extension, if Ngrok isn't installed or the version doesn't match the requirement, the Teams toolkit installs Ngrok NPM package `ngrok@4.2.2` in `~/.fx/bin/ngrok`. The Ngrok binary is managed by Ngrok NPM package in `/.fx/bin/ngrok/node modules/ngrok/bin`.

* Azure Functions Core Tools version 4, if Azure Functions Core Tools isn't installed or the version doesn't match the requirement, the Teams Toolkit installs Azure Functions Core Tools NPM package, azure-functions-core-tools@3 for **Windows** and for **MacOs** in  `~/.fx/bin/func`. The Azure Functions Core Tools NPM package in  `~/.fx/bin/func/node_modules/azure-functions-core-tools/bin` manages Azure Functions Core Tools binary. For Linux, the local debug terminates.

* .NET Core SDK version applicable for Azure Functions, if .NET Core SDK isn't installed or the version  doesn't match the requirement, the Teams Toolkit installs .NET Core SDK for Windows and MacOS in `~/.fx/bin/dotnet`. For Linux, the local debug terminates.

  The following table lists the .NET Core versions:

  | Platform  | Software|
  | --- | --- |
  |Windows, macOS (x64), and Linux | **3.1 (recommended)**, 5.0, 6.0 |
  |macOS (arm64) |6.0 |

* Development certificate, if the development certificate for localhost isn't installed for tab in Windows or macOS, the Teams toolkit prompts you to install it.

* Azure Functions binding extensions defined in `api/extensions.csproj`, if Azure Functions binding extensions isn't installed, the Teams Toolkit installs Azure Functions binding extensions.

* NPM packages, applicable for tab app, bot app, message extension app, and Azure Functions. If NPM isn't installed, the Teams Toolkit installs all NPM packages.

* Bot and message extension, the Teams Toolkit starts Ngrok to create an HTTP tunnel for bot and message extension.

* Ports available, if tab, bot, message extension, and Azure Functions ports are unavailable, the local debug terminates.

  The following table lists the ports available for components:

  | Component  | Port |
  | --- | --- |
  | Tab | 53000 |
  | Bot or message extension | 3978 |
  | Node inspector for bot or message extension | 9239 |
  | Azure Functions | 7071 |
  | Node inspector for Azure Functions | 9229 |

<!-- The following table lists the limitations if the required software is unavailable for debugging:

|Project type|Installation| Limitation|
|----------|--------------------------------|-----|
|Tab without Azure functions | Node.js LTS versions 10, 12, **14 (recommended)**, 16 | The local debug terminates, if Node.js isn't installed or the version doesn't match the requirement.|
|Tab with Azure functions | Node.js LTS versions 10, 12, **14 (recommended)** |The local debug terminates, if Node.js isn't installed or the version doesn't match the requirement.|
|Bot | Node.js LTS versions 10, 12, **14 (recommended)**, 16|The local debug terminates, if Node.js isn't installed or the version doesn't match the requirement.|
|Message extension | Node.js LTS versions 10, 12, **14 (recommended)**, 16 |The local debug terminates, if Node.js isn't installed or the version doesn't match the requirement.|
|Sign in to Microsoft 365 account | Microsoft 365 credentials |Teams toolkit prompts you to sign in to Microsoft 365 account, if you haven't signed in. |
|Bot, message extension | Ngrok version 2.3| • If Ngrok isn't installed or the version doesn't match the requirement, the Teams toolkit installs Ngrok NPM package `ngrok@4.2.2` in `~/.fx/bin/ngrok`. </br> • The Ngrok binary is managed by Ngrok NPM package in `/.fx/bin/ngrok/node modules/ngrok/bin`.|
|Azure functions | Azure Functions Core Tools version 3| • If Azure Functions Core Tools isn't installed or the version doesn't match the requirement, the Teams toolkit installs Azure Functions Core Tools NPM package, azure-functions-core-tools@3 for **Windows** and for **macOs** in  `~/.fx/bin/func`. </br> • The Azure Functions Core Tools NPM package in  `~/.fx/bin/func/node_modules/azure-functions-core-tools/bin` manages Azure Functions Core Tools binary. For Linux, the local debug terminates.|
|Azure functions |.NET Core SDK version|• If .NET Core SDK isn't installed or the version  doesn't match the requirement, the toolkit installs .NET Core SDK for Windows and macOS in `~/.fx/bin/dotnet`.</br> • For Linux, the local debug terminates.|
|Azure functions | Azure functions binding extensions defined in `api/extensions.csproj`| If Azure functions binding extensions isn't installed, the toolkit installs Azure functions binding extensions.|
|NPM packages| NPM packages for tab app, bot app, message extension app, and Azure functions|If NPM isn't installed, the toolkit installs all NPM packages.|
|Bot and message extension | Ngrok |Toolkit starts Ngrok to create a HTTP tunnel for bot and message extension. |

> [!NOTE]
> If tab, bot, message extension, and Azure functions ports are unavailable, the local debug terminates.

Use the following .NET Core versions:

| Platform  | Software|
| --- | --- |
|Windows, macOs (x64), Linux | **3.1 (recommended)**, 5.0, 6.0 |
|macOs (arm64) |6.0 |

> [!NOTE]
> If the development certificate for localhost isn't installed for tab in Windows or MacOS, the Teams toolkit prompts you to install it.</br> -->

When you select **Start Debugging (F5)**, the Teams Toolkit output channel displays the progress and result after checking the prerequisites.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/prerequisites-debugcheck.png" alt-text="prerequisites":::

## Register and configure your Teams app

In the set-up process, Teams Toolkit prepares the following registrations and configurations for your Teams app:

1. [Registers and configures Azure AD application](#registers-and-configures-azure-ad-application): Teams Toolkit registers and configures your Azure AD application.

1. [Registers and configures bot](#registers-and-configures-bot): Teams Toolkit registers and configures your bot for tab or message extension app.

1. [Registers and configures Teams app](#registers-and-configures-teams-app): Teams Toolkit registers and configures your Teams app.

### Registers and configures Azure AD application

1. Registers an Azure AD application.

1. Creates a Client Secret.

1. Exposes an API.

    a. Configures Application ID URI. For tab, `api://localhost/{appId}`. For bot or message extension,  `api://botid-{botid}`.

    b. Adds a scope named `access_as_user`. Enables it for **Admin and users**.

4. Configures API permissions. Adds Microsoft Graph permission to **User.Read**.

    The following table lists the configuration of the authentication:
    
      | Project type | Redirect URIs for web | Redirect URIs for single-page application |
      | --- | --- | --- |
      | Tab | `https://localhost:53000/auth-end.html` | `https://localhost:53000/auth-end.html?clientId={appId>}` |
      | Bot or message extension | `https://ngrok.io/auth-end.html` | NA |

    The following table lists the configurations of Microsoft 365 client application with the client Ids:
    
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
    
### Registers and configures bot

For tab app or message extension app:

1. Registers an Azure AD application.

1. Creates a Client Secret for the Azure AD application.

1. Registers a bot in [Microsoft Bot Framework](https://dev.botframework.com/) using the Azure AD application.

1. Adds Microsoft Teams channel.

1. Configures messaging endpoint as `https://{ngrokTunnelId}.ngrok.io/api/messages`.

### Registers and configures Teams app

Registers a Teams app in [Developer](https://dev.teams.microsoft.com/home) using the manifest template in `templates/appPackage/manifest.template.json`.

After registering and configuring the app, local debug files generates.

## Take a tour of your app source code

After Teams Toolkit registers and configures your app, you can view the project folders and files in the Explorer area of VS Code.

You can view the project folders and files in the Explorer area of VS Code after the Teams Toolkit registers and configures your app. The following table lists the local debug files and the configuration types:

| Folder name| Contents| Debug configuration type |
| --- | --- | --- |
|  `.fx/configs/config.local.json` | Local debug configuration file | The values of each configuration generate and saves during local debug. |
|  `templates/appPackage/manifest.template.json` | Teams app manifest template file for local debug | The placeholders in the file resolve during local debug. |
|  `tabs/.env.teams.local`  | Environment variables file for tab  | The values of each environment variable generate and saves during local debug. |
|  `bot/.env.teamsfx.local` | Environment variables file for bot and message extension| The values of each environment variable generate and saves during local debug. |
| `api/.env.teamsfx.local`  | Environment variables file for Azure Functions | The values of each environment variable generate and saves during local debug. |

## See also

[Debug your Teams app using Teams Toolkit](debug-local.md)
