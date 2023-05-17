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

4. The browser debugger, Microsoft Edge or Google Chrome, launches a new browser instance and opens a web page to load Teams client.

## Validate prerequisites

Teams Toolkit checks the following prerequisites during the debugging process:

* Teams Toolkit checks if Node.js is installed. If Node.js isn't installed, the debugging terminates.
* Teams Toolkit checks if Node.js version matches the versions defined in `package.json` file. If the version doesn't match, Teams Toolkit displays a warning message in output channel.
* Teams Toolkit prompts you to sign in to Microsoft 365 account, if you haven't signed in with your valid credentials.
* Teams Toolkit checks if custom app uploading or sideloading for your developer tenant is turned on. If it isn't turned on, the debugging terminates.
* Teams Toolkit checks if ports are available. If tab, bot, message extension, and Azure Functions ports are unavailable, the debugging terminates.

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
|  `teamsapp.local.yml` | The main Teams Toolkit project file for debugging | This file defines the life cycles and actions required for debugging. |
|  `env/.env.local` | Environment variables file for Teams Toolkit project | The values of each environment variable are consumed or generated during debugging. |
| `.localConfigs` | Environment variables file for the app code | The values of each environment variable are generated during debugging. |

For more information on the project folder structure, see [Teams Toolkit project](https://aka.ms/teamsfx-v5.0-guide#teams-toolkit-project).

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals.md)
* [Debug your Teams app using Teams Toolkit](debug-local.md)
* [Use Teams Toolkit to provision cloud resources](provision.md)
* [Deploy to the cloud](deploy.md)
* [Preview and customize Teams app manifest](TeamsFx-preview-and-customize-app-manifest.md)
