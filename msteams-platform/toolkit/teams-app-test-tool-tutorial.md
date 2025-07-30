---
title: Microsoft 365 Agents Playground to Debug AI Chatbot
author: surbhigupta 
description: Learn how to create project workspace, build, run, and debug AI chat bot using Microsoft 365 Agents Playground and about activity triggers.
ms.author: surbhigupta 
ms.localizationpriority: high
ms.topic: overview
ms.date: 07/30/2025
---

# Debug your AI chat bot using Microsoft 365 Agents Playground

Start Microsoft Teams app development with your Teams AI chat bot app and debug with Microsoft 365 Agents Playground (previously known as Teams App Test Tool). Agents Playground makes debugging bot-based apps effortless. You don't need a Microsoft 365 developer account, tunneling, or Teams app and bot registration to use Agents Playground.

You can chat with your bot and view the messages and Adaptive Cards as they appear in Teams. You can also mock an activity in Agents Playground using activity triggers.

> [!NOTE]
>
> * Agents Playground is available only in v5.4.0 of Microsoft 365 Agents Toolkit (previously known as Teams Toolkit).
> * Agents Playground is supported only for desktop and web clients.

This step-by-step guide helps you to build an AI chat bot using Agents Toolkit and debug with the Test Tool. You'll see the following output after you've completed this guide, where the user can access and use the AI chat bot:

:::image type="content" source="../assets/images/toolkit-v2/debug/test-tool.png" alt-text="Screenshot shows the bot open in Test Tool." lightbox="../assets/images/toolkit-v2/debug/test-tool.png":::

## Prerequisites

Ensure you install the following tools for building and deploying your apps.

| Install | For using... |
| --- | --- |
| [Visual Studio Code](https://code.visualstudio.com/download) or  [Visual Studio](https://visualstudio.microsoft.com/downloads/) | JavaScript, TypeScript, or C# build environments. Use the latest version. |
| [Microsoft 365 Agents Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) | Microsoft Visual Studio Code extension that creates a project scaffolding for your app. Use Agents Toolkit v5.4.0. For more information, see [install Agents Toolkit](/microsoftteams/platform/toolkit/install-agents-toolkit?tabs=vscode&pivots=visual-studio-code-v5#install-agents-toolkit-for-visual-studio-code).|
| [Node.js](https://nodejs.org/en/download/) | Back-end JavaScript runtime environment. For more information, see [Node.js version compatibility table for project type](~/toolkit/build-environments.md#nodejs-version-compatibility-table-for-project-type).|
| [OpenAI](https://openai.com/api/) or  [Azure OpenAI](https://oai.azure.com/portal)| First create your OpenAI API key to use OpenAI's GPT. If you want to host your app or access resources in Azure, you must create an Azure OpenAI service.|
| [Microsoft Edge](https://www.microsoft.com/edge) (recommended) or [Google Chrome](https://www.google.com/chrome/) | A browser with developer tools. |

## Create project workspace for your AI chat bot app

Let's create your AI chat bot app.

The bot capability of a Teams app creates a chatbot or a conversational bot. It communicates with a web service, facilitating the use of its services. The bot can execute simple, automated tasks such as delivering customer service. You can get weather forecast, make reservations, or any other service offered using a conversational bot.

:::image type="content" source="~/assets/images/toolkit-v2/first-bot/your-helloworld-app-bot.png" alt-text="Screenshot shows you the app with three features. Bot is highlighted.":::

As you've already prepared for creating these apps, you can set up a new Teams project for creating the AI chat bot app.

In this tutorial, learn:

1. [Create your bot project workspace.](#create-your-bot-project-workspace)
1. [Take a tour of the bot app source code.](#take-a-tour-of-the-bot-app-source-code)

### Create your bot project workspace

If the prerequisites are in place, let's begin!

1. Open **Visual Studio Code**.

1. Select the Microsoft 365 Agents Toolkit :::image type="icon" source="~/assets/images/toolkit-v2/toolkit-sidebar-icon.PNG" border="false"::: icon in the Visual Studio Code **Activity Bar**.

1. Select **Create a New Agent/App**.

    :::image type="content" source="~/assets/images/toolkit-v2/create-project.png" alt-text="Screenshot shows the location of the Create New Project link in the Agents Toolkit sidebar.":::

1. Select **Agents for Teams** > **Azure OpenAI** > enter an input in **Input Azure API service key now**

    :::image type="content" source="~/assets/images/toolkit-v2/first-bot/create-newapp.png" alt-text="Screenshot shows the Agents Toolkit app templates.":::

1. Select **Basic Agents for Teams**. If you need a different functionality for your bot, select the required option.

    :::image type="content" source="~/assets/images/toolkit-v2/debug/ai-chat-bot.png" alt-text="Screenshot shows the app feature to add to your new app.":::

1. Select the programming language as **JavaScript**.

    :::image type="content" source="~/assets/images/agents-playground/select-language-bot.png" alt-text="Screenshot shows the option to select the programming language.":::

1. Select **Default folder**.

    :::image type="content" source="~/assets/images/toolkit-v2/first-bot/select-default-location.png" alt-text="Screenshot shows the selection of default location.":::

To change the default location, follow these steps:

1. Select **Browse**.

    :::image type="content" source="~/assets/images/toolkit-v2/first-bot/select-browse.png" alt-text="Screenshot shows the selection of browse location option.":::

1. Select the location for the project workspace.
1. Select **Select Folder**.

    :::image type="content" source="~/assets/images/toolkit-v2/select-folder.png" alt-text="Screenshot shows the folder to select.":::

1. Enter a suitable name for your app and then select the **Enter** key.

    :::image type="content" source="~/assets/images/toolkit-v2/first-bot/hello-bot.png" alt-text="Screenshot shows where to enter the app name.":::

    A dialog appears, where you need to choose yes or no to trust the authors of the files in this folder.

    :::image type="content" source="~/assets/images/toolkit-v2/first-bot/vsc-trust-authors.png" alt-text="Screenshot shows the dialog to trust or not the authors of the files in this folder.":::

Now, you've successfully created your AI chat bot project workspace.

#### Take a tour of the bot app source code

After you finish scaffolding, explore the project directories and files in the **EXPLORER** section of the Visual Studio Code.

:::image type="content" source="../assets/images/agents-playground/source-code.png" alt-text="Screenshot shows the Teams Toolkit sample bot folder Structure.":::

| Folder or file name | Contents |
| --- | --- |
| `env/.env.playground` | The configuration file with environment variables that can be committed to Git.  |
| `env/.env.playground.user` |The configuration file with environment variables, including credentials, which aren't committed to Git by default.  |
| `appPackage` | App manifest template files and app icons (color.png and outline.png). |
| `appPackage/manifest.json` | App manifest for running the app in local and remote environment.  |
|`src/app.js`| Handles business logics for the AI chat bot.|
|`m365agents.yml`| This is the main Agents Toolkit project file. The project file defines two primary things:  Properties and configuration and stage definitions. |
|`m365agents.local.yml`|This overrides `m365agents.yml` with actions that enable local execution and debugging.|
|`m365agents.playground.yml`|This overrides `m365agents.yml` with actions that enable local execution and debugging in Test Tool.|

> [!div class="nextstepaction"]
> [Back to Microsoft 365 Agents Playground](debug-your-agents-playground.md)
