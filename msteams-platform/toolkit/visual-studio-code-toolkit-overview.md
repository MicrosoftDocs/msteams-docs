---
title: Teams Toolkit for Visual Studio Code- Overview
author: Rajeshwari-v
description:  Overview of Teams Toolkit for Visual Studio Code.
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: overview
---
# Teams Toolkit for Visual Studio Code
The Teams Toolkit helps developers create and deploy Teams apps with integrated Identity, access to cloud storage, data from Microsoft Graph, and other services in Azure and M365 with a "zero-configuration" approach to the developer experience.

## Teams App Capabilities

| **Capability**| **Learn module**|
|--------|-------------|
| Tabs  — embedded web experiences  |  [Create embedded web experiences with tabs for Microsoft Teams](/learn/modules/embedded-web-experiences/) |
| Webhooks and connectors  |  [Connect web services to Microsoft Teams with webhooks and Office 365 Connectors](/learn/modules/msteams-webhooks-connectors/) |
|Messaging extensions  | [Task-oriented interactions in Microsoft Teams with messaging extensions](/learn/modules/msteams-messaging-extensions/)  |
| Task modules |  [Collect input in Microsoft Teams with Task Modules](/learn/modules/msteams-task-modules/) |
| Conversational bots  | [Create interactive conversational bots for Microsoft Teams](/learn/modules/msteams-conversation-bots/)  |

## Build a Teams app
Build a Teams app from the beginning or see samples to help you quickly get started with the basic Teams app concepts and code structures.

## Prerequisites
Before you begin with creating your first Teams app, you must install a few tools and set up your development environment.
### Required tools for installation

Some of the tools you need depend on how you prefer to build your Teams app:

- [Node.js](https://nodejs.org/en/download/) (use the latest v14 LTS release)
- A browser with developer tools, such as, [Microsoft Edge](https://www.microsoft.com/edge) (recommended) or [Google Chrome](https://www.google.com/chrome/)
- If you are developing with JavaScript, TypeScript, or the SharePoint Framework (SPFx), install [Visual Studio Code](https://code.visualstudio.com/download), version 1.55 or later.  
- If you are developing with .NET, install [Visual Studio 2019](https://visualstudio.com/download). Ensure you install the **ASP.NET and web development** or **.NET Core cross-platform development** workload.

> [!WARNING]
> There are known issues with `npm@7`, packaged with Node v15 and later. If you have problems running `npm install`, ensure you're using Node v14 (LTS)

### Install the Teams Toolkit

The Teams Toolkit helps simplify the development process with tools to provision and deploy cloud resources for your app, publish to the Teams store, and more. You can use the toolkit with Visual Studio Code, Visual Studio, or as a CLI (called `teamsfx`). For more information, see [Teams Toolkit for Visual Studio Code](../toolkit/visual-studio-code-overview.md), [Teams Toolkit for Visual Studio](../toolkit/visual-studio-overview.md) and [Teamsfx CLI Tool](https://github.com/OfficeDev/TeamsFx/tree/dev/packages/cli).

# [Visual Studio Code](#tab/vscode)

1. Open Visual Studio Code.
1. Select the **Extensions** view (**Ctrl+Shift+X** / **⌘⇧-X** or **View > Extensions**).
1. In the search box, enter **Teams Toolkit**.
1. Select **Install** next to the Teams Toolkit.

You also can find the Teams Toolkit on the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension).

The following tools can be installed by the Visual Studio Code extension when they are needed. If already installed, the installed version can be used instead. If using Linux including WSL, you must install these tools before use:

- [Azure Functions Core Tools](/azure/azure-functions/functions-run-local)

    Azure Functions Core Tools is used to run any backend components locally during a local debug run, including the authentication helpers required when running your services in Azure. It is installed within the project directory (using the npm `devDependencies`).

- [.NET SDK](/dotnet/core/install/)

    The .NET SDK is used to install customized bindings for local debugging and Azure Functions app deployments. If you have not installed the .NET 3.1 (or later) SDK globally, the portable version can be installed.

- [ngrok](https://ngrok.com/download)

    Some Teams app features (conversational bots, messaging extensions, and incoming webhooks) require inbound connections. You need to expose your development system to Teams through a tunnel. A tunnel is not required for apps that only include tabs. This package is installed within the project directory (using npm `devDependencies`).

