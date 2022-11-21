---
title: Teams Toolkit Overview
author: zyxiaoyuer
description: Learn Teams Toolkit, Installation of Teams Toolkit, and User journey of Teams Toolkit
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 05/24/2022
zone_pivot_groups: teams-app-platform
---

# Teams Toolkit Overview

::: zone pivot="visual-studio-code"

Teams Toolkit makes it simple to get started with app development for Microsoft Teams using Visual Studio Code .

* Start with a project template or from a sample.
* Save setup time with automated app registration and configuration.
* Run and debug to Teams directly from familiar tools.
* Smart defaults for hosting in Azure using infrastructure-as-code and Bicep.
* Create unique configurations like dev, test, and prod using the environments feature.
* Bring your app to your organization or the Teams App Store using built-in publishing tools.

:::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/teams-toolkit-user-journey2.png" alt-text="User Journey of the Teams Toolkit" lightbox="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/teams-toolkit-user-journey2.png":::

::: zone-end

::: zone pivot="visual-studio"

Teams Toolkit makes it simple to get started with app development for Microsoft Teams using Visual Studio.

* Start with a project template or from a sample.
* Save setup time with automated app registration and configuration.
* Run and debug to Teams directly from familiar tools.
* Smart defaults for hosting in Azure using infrastructure-as-code and Bicep.
* Bring your app to your organization or the Teams App Store using built-in publishing tools.

:::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/teams-toolkit-user-journey3VS.png" alt-text="User Journey of the Teams Toolkit" lightbox="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/teams-toolkit-user-journey3VS.png":::

::: zone-end

## Available for Visual Studio and Visual Studio Code

Teams Toolkit is available for free for Visual Studio Code and supports Visual Studio 2022 Community, Professional, and Enterprise. For more information about installation and setup, see [install Teams Toolkit documentation](./install-Teams-Toolkit.md).

| Teams Toolkit | Visual Studio | Visual Studio Code |
| - | ------------- | ------------------ |
| Installation | Available in the Visual Studio Installer | Available in the VS Marketplace |
| Build with | C#, .NET, ASP.NET, Blazor | JavaScript, TypeScript, React, SPFx |

## Features

### Project templates

Teams Toolkit reduces the complexity of getting started with templates for common line-of-business app scenarios and smart defaults to accelerate your time to production. If you're already familiar with Teams app development, you can also start directly with capability-focused templates. i.e. Tab, Bot, Messaging Extension.

::: zone pivot="visual-studio-code"
:::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/create-new-app_2.png" alt-text="Create new Teams app menu in VS Code":::
::: zone-end

::: zone pivot="visual-studio"
:::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/create-new-app-vs_2.png" alt-text="Create new Teams app menu in VS Code":::
::: zone-end

### Automatic registration and configuration

Save time and let the toolkit automatically register the app in Teams Developer Portal and configure settings like Azure Active Directory (Azure AD) automatically when you first run or debug the app. Sign in with your Microsoft 365 account to control where the app is configured and customize the included Azure AD manifest when you need flexibility.

::: zone pivot="visual-studio-code"

### Multiple environments

With the environments features, you can create different groupings of cloud resources to make it simpler to run and test your app. Use the "dev" environment with your Azure subscription or create a new app with a different subscription for staging, test, and production.

### Quick access to Teams Developer Portal

Quickly access Teams Developer Portal, where you can configure, distribute, and manage your app. For more information, see [manage your Teams apps using Developer Portal](../concepts/build-and-test/manage-your-apps-in-developer-portal.md).

:::image type="content" source="../assets/images/teams-toolkit-v2/build-environment-developer-portal-2.png" alt-text="Developer Portal":::

::: zone-end

::: zone pivot="visual-studio"

#### TeamsFx .NET SDK Reference docs

* [Microsoft.Extensions.DependencyInjection Namespace](/../dotnet/api/Microsoft.Extensions.DependencyInjection)
* [Microsoft.TeamsFx Namespace](/../dotnet/api/Microsoft.TeamsFx)
* [Microsoft.TeamsFx.Configuration Namespace](/../dotnet/api/Microsoft.TeamsFx.Configuration)
* [Microsoft.TeamsFx.Conversation Namespace](/../dotnet/api/Microsoft.TeamsFx.Conversation)
* [Microsoft.TeamsFx.Helper Namespace](/../dotnet/api/Microsoft.TeamsFx.Helper)

::: zone-end

## See also

* [Create a new Teams app in Visual Studio](create-new-project.md)
* [Provision cloud resources using Visual Studio](provision-cloud-resources.md)
* [Deploy Teams app to the cloud using Visual Studio](deploy.md)
* [Developer Portal for Teams](../concepts/build-and-test/teams-developer-portal.md)
