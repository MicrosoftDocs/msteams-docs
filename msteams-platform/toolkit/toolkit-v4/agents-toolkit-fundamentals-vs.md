---
title: Agents Toolkit for Visual Studio
author: zyxiaoyuer
description: Learn about Microsoft 365 Agents Toolkit, it's installation, navigation, and user journey. Agents Toolkit is available for Visual Studio.
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 09/16/2024
---

# Agents Toolkit Visual Studio Overview

Microsoft 365 Agents Toolkit (previously known as Teams Toolkit) makes it simple to get started with app development for Microsoft Teams using Microsoft Visual Studio.

* Start with a project template for common custom app built for your org (LOB app) scenarios or from a sample.
* Save setup time with automated app registration and configuration.
* Run and debug to Teams directly from familiar tools.
* Smart defaults for hosting in Microsoft Azure using infrastructure-as-code and Bicep.
* Bring your app to your organization or the Microsoft Teams Store using built-in publishing tools.

:::image type="content" source="../../assets/images/toolkit-v2/toolkit-vs/toolkit-user-journey.png" alt-text="Screenshot shows the User Journey of Agents Toolkit." lightbox="../../assets/images/toolkit-v2/toolkit-vs/toolkit-user-journey.png":::

## Available for Visual Studio

Agents Toolkit is available for free for Visual Studio 2022 Community, Professional, and Enterprise. For more information about installation and setup, see how to [install Microsoft 365 Agents Toolkit](./install-Teams-Toolkit-vs.md).

| Agents Toolkit | Visual Studio |
| - | ------------- |
| Installation | Available in the Visual Studio Installer |
| Build with | C#, .NET, ASP.NET, and Blazor |

## Features

The following are the key features of Agents Toolkit:

* [Project templates](#project-templates)
* [Automatic registration and configuration](#automatic-registration-and-configuration)
* [CodeLens to trigger Agents Toolkit lifecycle](#codelens-to-trigger-agents-toolkit-lifecycle)
* [Agents Toolkit documentation](#agents-toolkit-documentation)
* [Agent for Microsoft 365 Copilot](#agent-for-microsoft-365-copilot)

> [!NOTE]
> CodeLens to trigger Agents Toolkit lifecycle, Agents Toolkit documentation, and agent for Microsoft 365 Copilot is available in public developer preview.

### Project templates

You can start with the capability-focused templates such as tabs, bots, and message extensions or by following the existing samples if you're already familiar with Teams app development. Agents Toolkit reduces the complexity of getting started with the help of templates for custom app built for org scenarios and smart defaults to accelerate your time to production.

Perform the following the steps to select templates and app capability:

1. Select **File > New > Project**.

1. Enter **Teams** in the search box and from search results, select **Microsoft Teams App** template.

1. Select **Next**.

   :::image type="content" source="../../assets/images/toolkit-v2/toolkit-vs/new-project-template-vs.png" alt-text="Screenshot shows the search and select Microsoft Teams app." lightbox="../../assets/images/toolkit-v2/toolkit-vs/new-project-template-vs.png":::

### Automatic registration and configuration

You can save time and let the toolkit automatically register the app in Teams Developer Portal. When you first run or debug the app, Agents Toolkit automatically registers the Teams app to your Microsoft 365 tenant and configures settings such as Microsoft Entra ID for your Teams app. Sign in with your Microsoft 365 account to control where the app is configured and customize the Microsoft Entra manifest.

### CodeLens to trigger Agents Toolkit lifecycle

Agents Toolkit provides developers with lifecycle actions and grants access to configuration definitions within the m365agents.yml file. You can now preview and trigger these predefined lifecycle actions using the CodeLens feature directly within the teamsapp.yml file. This streamlined process enhances the development workflow.

   :::image type="content" source="../../assets/images/toolkit-v2/toolkit-vs/codelens-trigger-toolkit.png" alt-text="Screenshot shows the lifecycle access and access through CodeLens in m365agents.yml file.":::

### Agents Toolkit documentation

To view the Agents Toolkit documentation, follow these steps from Agents Toolkit:

1. Select **Project** > **Microsoft 365 Agents Toolkit**.

1. Select **Microsoft 365 Agents Toolkit Documentation**.

   :::image type="content" source="../../assets/images/toolkit-v2/toolkit-vs/toolkit-documentation.png" alt-text="Screenshot shows the option to select and view the documentation.":::

A browser window opens to view the documentation.

### Agent for Microsoft 365 Copilot

The latest version of Agents Toolkit incorporates numerous preview features designed to support agent for Microsoft 365 Copilot development. To enable and activate the preview feature, follow these steps:

1. Select **Tools** > **Options...**.

   :::image type="content" source="../../assets/images/toolkit-v2/toolkit-vs/preview-tools-option.png" alt-text="Screenshot shows the selection of Options under Tools menu.":::

    A pop-up window appears.

1. Enter **Copilot**, select **Preview Features**.

1. Select the **Microsoft 365 Agents Toolkit: Develop Copilot Plugin (requires restart)** checkbox.

1. Select **OK**.

   :::image type="content" source="../../assets/images/toolkit-v2/toolkit-vs/preview-copilot-plugin.png" alt-text="Screenshot shows the selection of agent from preview feature.":::

Enhance the capabilities of Microsoft 365 Copilot by converting your app into an agent that helps user productivity in daily tasks and workflows. Activate these agents for Microsoft 365 Copilot using Agents Toolkit. Agents Toolkit agent supports specific capabilities, such as Custom Search Results and [AI Assistant Bot [Preview]](/microsoft-365-copilot/extensibility/).

#### TeamsFx .NET SDK reference

* [Microsoft.Extensions.DependencyInjection Namespace](/../dotnet/api/Microsoft.Extensions.DependencyInjection)
* [Microsoft.TeamsFx Namespace](/../dotnet/api/Microsoft.TeamsFx)
* [Microsoft.TeamsFx.Configuration Namespace](/../dotnet/api/Microsoft.TeamsFx.Configuration)
* [Microsoft.TeamsFx.Conversation Namespace](/../dotnet/api/Microsoft.TeamsFx.Conversation)
* [Microsoft.TeamsFx.Helper Namespace](/../dotnet/api/Microsoft.TeamsFx.Helper)

## See also

[Install Microsoft 365 Agents Toolkit](install-Teams-Toolkit-vs.md)
