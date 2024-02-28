---
title: Teams Toolkit Overview
author: zyxiaoyuer
description: Learn about Teams Toolkit, it's installation, navigation, and user journey. Teams Toolkit is available for Visual Studio code.
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 05/24/2022
---
# Teams Toolkit Overview

Microsoft Teams Toolkit makes it simple to get started with app development for Microsoft Teams using Microsoft Visual Studio Code.

* Start with a project template for common custom app built for your org (LOB app) scenarios or from a sample.
* Save setup time with automated app registration and configuration.
* Run and debug to Teams directly from familiar tools.
* Smart defaults for hosting in Azure using infrastructure-as-code and Bicep.
* Create unique configurations like dev, test, and prod using the environment features.

> [!NOTE]
> Before you get started, we strongly recommend that you visit [Teams Toolkit v5 Guide](https://aka.ms/teamsfx-v5.0-guide) to learn key features, such as life cycles and actions.

:::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/teams-toolkit-user-journey2.png" alt-text="Illustration shows the User Journey of the Teams Toolkit." lightbox="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/teams-toolkit-user-journey2.png":::

## Available for Visual Studio Code

Teams Toolkit is available for free for Visual Studio Code. For more information about installation and set up, see [Install Teams Toolkit](install-Teams-Toolkit.md).

| Teams Toolkit | Visual Studio Code |
| - | ------------------ |
| Installation | Available in the VS Code Marketplace |
| Build with | JavaScript, TypeScript, React, SPFx |

> [!IMPORTANT]
>
> Teams Toolkit isn't supported in Government Community Cloud (GCC) and GCC-High environments.

## Features

The following list provides the key features of Teams Toolkit:

* [Project templates](#project-templates)
* [Automatic registration and configuration](#automatic-registration-and-configuration)
* [Multiple environments](#multiple-environments)
* [Quick access to Teams Developer Portal](#quick-access-to-teams-developer-portal)

### Project templates

You can start directly with the capability-focused templates such as tabs, bots, and message extensions or by following the existing samples if you're already familiar with Teams app development. Teams Toolkit reduces the complexity of getting started with the help of templates for common custom app built for your org (LOB app) scenarios and smart defaults to accelerate your time to production.

:::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/create-new-app_2.png" alt-text="Screenshot shows the create new Teams app menu in Visual Studio Code.":::

### Automatic registration and configuration

You can save time and let the toolkit automatically register the app in Teams Developer Portal. When you first run or debug the app, Teams Toolkit automatically registers the Teams app to your Microsoft 365 tenant and configures settings such as Microsoft Entra ID for your Teams app. Sign in with your Microsoft 365 account to control where the app is configured and customize the included Microsoft Entra manifest when you need flexibility.

### Multiple environments

You can create different groupings of cloud resources to run and test your app. Use the **dev** environment with your Azure subscription or create a new app with a different subscription for staging, test, and production.s

### Quick access to Teams Developer Portal

You can access Teams Developer Portal where you can configure, distribute, and manage your app. For more information, see [manage your Teams apps using Developer Portal](../concepts/build-and-test/manage-your-apps-in-developer-portal.md).

:::image type="content" source="../assets/images/teams-toolkit-v2/build-environment-dev-portal.png" alt-text="Screenshot shows the Developer Portal option.":::

### Debug tunneling for bots

Run and debug your bot projects using VS Code and the included Dev Tunnels features.

### App test tool

Run and debug your bot projects in the test tool debug configuration to launch in a simulator-like experience for Teams without the need for an account or custom app permissions.

### Infrastructure templates

Optionally use any of our smart defaults for hosting your app project in Azure using Bicep templates included with every project template. 

## See also

[Install Teams Toolkit](install-Teams-Toolkit.md)
