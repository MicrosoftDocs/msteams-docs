---
title: Debug background processes
author: surbhigupta
description: In this module, learn how Visual Studio Code and Teams Toolkit work during local debug process. Also learn how to register and configure your Teams app.
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/03/2022
---

# Debug background process

The local debug process involves the `.vscode/launch.json` and `.vscode/tasks.json` files to configure the debugger in Microsoft Visual Studio Code. The Visual Studio Code launches the debuggers, and Microsoft Edge or Google Chrome launches a new browser instance.

The debug process workflow is as follows:

1. `launch.json` file configures the debugger in Visual Studio Code.

2. Visual Studio Code runs the compound **preLaunchTask**, **Start Teams App Locally** in `.vscode/tasks.json` file.

3. Visual Studio Code then launches the debuggers specified in the compound configurations, such as **Attach to Bot**, **Attach to Backend**, **Attach to Frontend**, and **Launch Bot**.

4. Microsoft Edge or Google Chrome launches a new browser instance and opens a web page to load Teams client.

## Verification of prerequisites

Teams Toolkit checks the following prerequisites during the debug process:

* Node.js, applicable for the following project types:

  |Project type|Node.js LTS version|
  |----------|--------------------------------|
  |Tab | 14, 16 (recommended) |
  |SPFx Tab | 14, 16 (recommended)|
  |Bot |  14, 16 (recommended)|
  |Message extension | 14, 16 (recommended) |

For more information, see [Node.js version compatibility table for project type](tools-prerequisites.md#nodejs-version-compatibility-table-for-project-type).

* Teams Toolkit prompts you to sign in to Microsoft 365 account, if you haven't signed in with your valid credentials.
* Custom app uploading or sideloading for your developer tenant is turned on, to prevent local debug termination.
* Teams Toolkit installs Ngrok npm package `ngrok@4.2.2` in `~/.fx/bin/ngrok`, if Ngrok isn't installed or the version doesn't match the requirement. Ngrok binary version 2.3 is applicable for bot and message extension. The Ngrok binary is managed by Ngrok npm package in `/.fx/bin/ngrok/node modules/ngrok/bin`.

  > [!NOTE]
  > Teams Toolkit project templates uses the ngrok@4.3.3 npm package, which contains v2.3.40. To get a valid license, see [ngrok](https://ngrok.com/).

* Teams Toolkit installs Azure Functions Core Tools npm package. `azure-functions-core-tools@3` for **Windows** and **MacOs** in  `~/.fx/bin/func`, if Azure Functions Core Tools version 4 isn't installed or the version doesn't match the requirement. The Azure Functions Core Tools npm package in `~/.fx/bin/func/node_modules/azure-functions-core-tools/bin` manages Azure Functions Core Tools binary. For Linux, the local debug terminates.
* Teams Toolkit installs .NET Core SDK for **Windows** and **MacOS** in `~/.fx/bin/dotnet`.NET Core SDK version applicable for Azure Functions, if .NET Core SDK isn't installed or the version doesn't match the requirement. For Linux, the local debug terminates.

  The following table lists the .NET Core versions:

  | Platform  | Software|
  | --- | --- |
  |Windows, macOS (x64), and Linux | **3.1 (recommended)**, 5.0, 6.0 |
  |macOS (arm64) |6.0 |

* Development certificate, if the development certificate for localhost isn't installed for tab in **Windows** or **MacOS**, then Teams Toolkit prompts you to install it.
* Azure Functions binding extensions defined in `api/extensions.csproj`, if Azure Functions binding extensions isn't installed, then Teams Toolkit installs Azure Functions binding extensions.
* npm packages, applicable for tab app, bot app, message extension, and Azure Functions. If npm packages aren't installed, then Teams Toolkit installs all npm packages.
* Bot and message extension, Teams Toolkit starts Ngrok to create an HTTP tunnel for bot and message extension.
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
|Sign-in to Microsoft 365 account | Microsoft 365 credentials |Teams Toolkit prompts you to sign-in to Microsoft 365 account, if you haven't signed in. |
|Bot, message extension | Ngrok version 2.3| • If Ngrok isn't installed or the version doesn't match the requirement, the Teams Toolkit installs Ngrok NPM package `ngrok@4.2.2` in `~/.fx/bin/ngrok`. </br> • The Ngrok binary is managed by Ngrok NPM package in `/.fx/bin/ngrok/node modules/ngrok/bin`.|
|Azure functions | Azure Functions Core Tools version 3| • If Azure Functions Core Tools isn't installed or the version doesn't match the requirement, the Teams Toolkit installs Azure Functions Core Tools NPM package, azure-functions-core-tools@3 for **Windows** and for **macOs** in  `~/.fx/bin/func`. </br> • The Azure Functions Core Tools NPM package in `~/.fx/bin/func/node_modules/azure-functions-core-tools/bin` manages Azure Functions Core Tools binary. For Linux, the local debug terminates.|
|Azure functions |.NET Core SDK version|• If .NET Core SDK isn't installed or the version  doesn't match the requirement, the Toolkit installs .NET Core SDK for Windows and macOS in `~/.fx/bin/dotnet`.</br> • For Linux, the local debug terminates.|
|Azure functions | Azure functions binding extensions defined in `api/extensions.csproj`| If Azure functions binding extensions isn't installed, the Toolkit installs Azure functions binding extensions.|
|NPM packages| NPM packages for tab app, bot app, message extension app, and Azure functions|If NPM isn't installed, the Toolkit installs all NPM packages.|
|Bot and message extension | Ngrok |Toolkit starts Ngrok to create a HTTP tunnel for bot and message extension. |

> [!NOTE]
> If tab, bot, message extension, and Azure functions ports are unavailable, the local debug terminates.

Use the following .NET Core versions:

| Platform  | Software|
| --- | --- |
|Windows, macOs (x64), Linux | **3.1 (recommended)**, 5.0, 6.0 |
|macOs (arm64) |6.0 |

> [!NOTE]
> If the development certificate for localhost isn't installed for tab in Windows or MacOS, the Teams Toolkit prompts you to install it.</br> -->

When you select **Start Debugging (F5)**, Teams Toolkit output channel displays the progress and result after checking the prerequisites.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/prerequisites-debugcheck1.png" alt-text="Prerequisites check summary" lightbox="../assets/images/teams-toolkit-v2/debug/prerequisites-debugcheck1.png":::

## Register and configure Teams app

In the set-up process, Teams Toolkit prepares the following registrations and configurations for your Teams app:

1. [Registers and configures Microsoft Azure Active Directory(Azure AD) app](#registers-and-configures-microsoft-azure-active-directoryazure-ad-app)

1. [Registers and configures bot](#registers-and-configures-bot)

1. [Registers and configures Teams app](#registers-and-configures-teams-app)

### Registers and configures Microsoft Azure Active Directory(Azure AD) app

1. Registers an Azure AD app.

2. Creates a Client Secret.

3. Exposes an API.

    a. Configures Application ID URI. For tab, `api://localhost/{appId}`. For bot or message extension,  `api://botid-{botid}`.

    b. Adds a scope named `access_as_user`. Enables it for **Admin and users**.

4. Configures API permissions. Adds Microsoft Graph permission to **User.Read**.

    The following table lists the configuration of the authentication:

      | Project type | Redirect URIs for web | Redirect URIs for single-page application |
      | --- | --- | --- |
      | Tab | `https://localhost:53000/auth-end.html` | `https://localhost:53000/auth-end.html?clientId={appId>}` |
      | Bot or message extension | `https://ngrok.io/auth-end.html` | NA |

    The following table lists the configurations of Microsoft 365 client application with the client IDs:

      | Microsoft 365 client application | Client ID |
      | --- | --- |
      | Teams desktop, mobile | 1fec8e78-bce4-4aaf-ab1b-5451cc387264 |
      | Teams web | 5e3ce6c0-2b1f-4285-8d4b-75ee78787346 |
      | microsoft365.com (formerly office.com) | 4345a7b9-9a63-4910-a426-35363201d503 |
      | microsoft365.com (formerly office.com) | 4765445b-32c6-49b0-83e6-1d93765276ca |
      | Microsoft 365 desktop app | 0ec893e0-5785-4de6-99da-4ed124e5296c |
      | Outlook desktop | d3590ed6-52b3-4102-aeff-aad2292ab01c |
      | Outlook Web Access | 00000002-0000-0ff1-ce00-000000000000 |
      | Outlook Web Access | bc59ab01-8403-45c6-8796-ac3ef710b3e3 |

### Registers and configures bot

For tab app or message extension:

1. Registers an Azure AD application.

1. Creates a Client Secret for the Azure AD application.

1. Registers a bot in [Microsoft Bot Framework](https://dev.botframework.com/) using the Azure AD application.

1. Adds Teams channel.

1. Configures messaging endpoint as `https://{ngrokTunnelId}.ngrok.io/api/messages`.

### Registers and configures Teams app

Registers a Teams app in [Developer Portal](https://dev.teams.microsoft.com/home) using the manifest template in `templates/appPackage/manifest.template.json`.

After registration and configuration of the app, local debug files generates.

## Take a tour of your app source code

You can view the project folders and files under **Explorer** in Visual Studio Code after the Teams Toolkit registers and configures your app. The following table lists the local debug files and the configuration types:

| Folder name| Contents| Debug configuration type |
| --- | --- | --- |
|  `.fx/configs/config.local.json` | Local debug configuration file | The values of each configuration generate and saves during local debug. |
|  `templates/appPackage/manifest.template.json` | Teams app manifest template file for local debug | The placeholders in the file during local debug. |
|  `tabs/.env.teams.local`  | Environment variables file for tab | The values of each environment variable generate and saves during local debug. |
|  `bot/.env.teamsfx.local` | Environment variables file for bot and message extension| The values of each environment variable generate and saves during local debug. |
| `api/.env.teamsfx.local`  | Environment variables file for Azure Functions | The values of each environment variable generate and saves during local debug. |

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals.md)
* [Debug your Teams app using Teams Toolkit](debug-local.md)
* [Use Teams Toolkit to provision cloud resources](provision.md)
* [Deploy to the cloud](deploy.md)
* [Preview and customize Teams app manifest](TeamsFx-preview-and-customize-app-manifest.md)
