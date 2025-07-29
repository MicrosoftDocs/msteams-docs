---
title: Tutorial - Build Custom Engine Agent
description: Learn how to create a custom engine agent using Microsoft 365 Agents Toolkit and configure custom engine agent.
ms.localizationpriority: high
ms.date: 07/29/2025
ms.topic: conceptual
ms.author: surbhigupta
---

# Build a custom engine agent

This tutorial shows how to create a custom engine agent using Microsoft 365 Agents Toolkit (previously known as Teams Toolkit) with OpenAI.

In this tutorial, you'll learn:

* How to create a new custom engine agent with Agents Toolkit.
* How to interact with your LLMs and data.
* The directory structure of your custom engine agent.

> [!NOTE]
>
> * Custom engine agent support for Microsoft 365 Copilot Chat is available only in [Public developer preview for Teams](../../../resources/dev-preview/developer-preview-intro.md)
> * Custom engine agent isn't supported in Python.

## Prerequisites

Ensure you install the following tools for building and deploying your apps:

| &nbsp; | Install | For using... |
| --- | --- | --- |
| &nbsp; | [Agents Toolkit](~/toolkit/install-Teams-Toolkit.md) | A Microsoft Visual Studio Code extension that creates a project scaffolding for your app. Use the latest version. |
| &nbsp; | [Node.js and NPM](https://nodejs.org/) | Back-end JavaScript runtime environment. For more information, see [Node.js version compatibility table for project type](~/toolkit/build-environments.md#nodejs-version-compatibility-table-for-project-type).|
| &nbsp; | [Microsoft Edge](https://www.microsoft.com/edge) (recommended) or [Google Chrome](https://www.google.com/chrome/) | A browser with developer tools. |
| &nbsp; | [Visual Studio Code](https://code.visualstudio.com/download) | JavaScript, TypeScript, or SharePoint Framework (SPFx) build environments. Use the latest version. |
| &nbsp; |[OpenAI](https://platform.openai.com/docs/quickstart/build-your-application) |First create your OpenAI API key to use OpenAI's GPT. If you want to host your app or access resources in Microsoft Azure, you must create an [Azure OpenAI service](/azure/ai-services/openai/how-to/create-resource?pivots=web-portal) before you begin.|

[!INCLUDE [Set up prerequisites](includes/custom-engine-agent.md)]
