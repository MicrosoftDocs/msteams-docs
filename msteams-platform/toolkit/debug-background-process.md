---
title: Debug background processes
author: surbhigupta
description: In this module, learn how Visual Studio Code and Teams Toolkit work during debugging process. Also learn how to register and configure your Teams app.
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/03/2022
---

# Debug background process

The debugging process involves the `.vscode/launch.json` and `.vscode/tasks.json` files to configure the debuggers in Visual Studio Code. Visual Studio Code launches Node debugger and browser debugger, and Microsoft Edge or Google Chrome launches a new browser instance.

The debugging process workflow is as follows:

1. `launch.json` file configures the debugger in Visual Studio Code.

2. Visual Studio Code runs the compound **preLaunchTask**, **Start Teams App Locally** in `.vscode/tasks.json` file.

3. Visual Studio Code then launches the debuggers specified in the compound configurations, such as **Attach to Bot**, **Attach to Backend**, **Attach to Frontend**, and **Launch Bot**.

4. The browser debugger, Microsoft Edge or Google Chrome, launches a new browser instance and opens a webpage to load Teams client.

## Validate prerequisites

Teams Toolkit checks the following prerequisites during the debugging process:

* Teams Toolkit checks if Node.js is installed. If Node.js isn't installed, the debugging terminates.
* Teams Toolkit checks if Node.js version matches the versions defined in `package.json` file. If the version doesn't match, Teams Toolkit displays a warning message in output channel.
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

:::image type="content" source="../assets/images/teams-toolkit-v2/debug/prerequisites-debugcheck.png" alt-text="Screenshot shows the prerequisites check summary.":::

For more information on validating prerequisites, see [Validate prerequisites task](https://aka.ms/teamsfx-tasks/check-prerequisites).

## Start local tunnel

For bot and message extension, Teams Toolkit starts a local tunnel service to make the bot messaging endpoint public. For more information, see [Start local tunnel task](https://aka.ms/teamsfx-tasks/local-tunnel).

## Create the debug resources

Teams Toolkit executes lifecycle `provision` defined in `teamsapp.local.yml` to create Teams app related resources required for debugging. For more information, see [Provision task](https://aka.ms/teamsfx-tasks/provision) and [available actions](https://aka.ms/teamsfx-actions).

## Build project

Teams Toolkit executes lifecycle `deploy` defined in `teamsapp.local.yml` to build the project. For more information, see [Deploy task](https://aka.ms/teamsfx-tasks/deploy) and [available actions](https://aka.ms/teamsfx-actions).

## Take a tour of your app source code

You can view the project folders and files under **Explorer** in Visual Studio Code after debugging. The following table lists the files related to debugging:

| Folder name| Contents| Debug configuration type |
| --- | --- | --- |
|  `teamsapp.local.yml` | The main Teams Toolkit project file for debugging. | This file defines the life cycles and actions required for debugging. |
|  `env/.env.local` | Environment variables file for Teams Toolkit project. | The values of each environment variable are consumed or generated during debugging. |
| `.localConfigs` | Environment variables file for the app code. | The values of each environment variable are generated during debugging. |

For more information on the project folder structure, see [Teams Toolkit project](https://aka.ms/teamsfx-v5.0-guide#teams-toolkit-project).

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals.md)
* [Debug your Teams app using Teams Toolkit](debug-local.md)
* [Use Teams Toolkit to provision cloud resources](provision.md)
* [Deploy to the cloud](deploy.md)
* [Preview and customize Teams app manifest](TeamsFx-preview-and-customize-app-manifest.md)
