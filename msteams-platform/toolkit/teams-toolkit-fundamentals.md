---
title: Teams Toolkit Overview
author: zyxiaoyuer
description: In this module, learn Teams Toolkit, Installation of Teams Toolkit, and User journey of Teams Toolkit
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 05/24/2022
zone_pivot_groups: teams-app-platform
---

# Teams Toolkit Overview

:::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/teams-toolkit-user-journey2.png" alt-text="User Journey of the Teams Toolkit" lightbox="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/teams-toolkit-user-journey2.png":::

Teams Toolkit makes it simple to get started with app development for Microsoft Teams using Visual Studio and Visual Studio Code. 

* Start with a project template or from a sample
* Save setup time with automated app registration and configuration
* Run and debug to Teams directly from familiar tools
* Smart defaults for hosting in Azure using infrastructure-as-code and Bicep
* Create unique configurations like dev, test, and prod using the Environments feature
* Bring your app to your organization or the Teams App Store using built-in publishing tools

# Available for Visual Studio and Visual Studio Code

Teams Toolkit is available for free for Visual Studio Code and supports Visual Studio 2022 Community, Professional, and Enterprise.

Visit the [Install Teams Toolkit documentation](./install-Teams-Toolkit.md) for more information about installation and setup.

| | Visual Studio | Visual Studio Code |
| - | ------------- | ------------------ |
| Installation | Available in the Visual Studio Installer | Available in the VS Marketplace |
| Build with | C#, .NET, ASP.NET, Blazor | JavaScript, TypeScript, React, SPFx |

# Features

## Project templates

Teams Toolkit reduces the complexity of getting started with templates for common line-of-business app scenarios and smart defaults to accelerate your time to production. If you're already familiar with Teams app development, you can also start directly with capability-focused templates. i.e. Tab, Bot, Messaging Extension.

## Automatic registration and configuration

Save time and let the toolkit automatically register the app in Teams Developer Portal and configure settings like Azure Active Directory automatically when you first run or debug the app. Sign in with your Microsoft 365 account to control where the app is configured and customize the included Azure AD manifest when you need more flexibility.

::: zone pivot="visual-studio-code"

## Multiple environments

With the Environments features, you can create different groupings of cloud resources to make it simpler to run and test your app. Use the "dev" environment with your Azure subscription or create a new one with a different subscription for staging, test, and production. 

## Manage your apps using Developer Portal

As Teams Toolkit is integrated with Developer Portal, you can configure, distribute, and manage your app using [Developer Portal for Teams](../concepts/build-and-test/teams-developer-portal.md) under DEPLOYMENT after creating an app. For more information, see [manage your Teams apps using Developer Portal](../concepts/build-and-test/manage-your-apps-in-developer-portal.md).

:::image type="content" source="../assets/images/teams-toolkit-v2/build-environment-developer-portal-1.png" alt-text="Developer Portal":::

::: zone-end

::: zone pivot="visual-studio"


## User Journey of Teams Toolkit

Teams Toolkit automates manual work and provides you with great integration of Teams and Azure resources. The following image shows the user journey:

:::image type="content" source="../assets/images/teams-toolkit-overview/teams-toolkit-user-journey.png" alt-text="Teams toolkit user journey" lightbox="../assets/images/teams-toolkit-overview/teams-toolkit-user-journey.png":::

The main milestones of this journey are:

1. You can start by creating a new project or try building a sample Teams app.
1. You can then edit code or the manifest file as required.
1. For building and debugging the Teams app you can use your Microsoft 365 account.
1. For provisioning and deploying your app to cloud you can use your Azure account.
1. You can finally publish your app to Teams.

The following operations aren't supported in Teams Toolkit for Visual Studio yet compared to Teams Toolkit for Microsoft Visual Studio Code, however they're planned in the future product road map.

* Add another Teams capabilities to your Teams app.
* Add more Azure resources to your Teams app
* Add Single Sign-on (SSO) to your Teams app.
* Add API connection to your Teams app.
* Customize Microsoft Azure Active Directory (Azure AD) manifest.
* Add CI/CD pipelines.
* Manage multiple cloud environments.
* Collaborate on Teams projects.
* Publish Teams app.

### TeamsFx .NET SDK Reference docs

* [Microsoft.Extensions.DependencyInjection Namespace](/../dotnet/api/Microsoft.Extensions.DependencyInjection)
* [Microsoft.TeamsFx Namespace](/../dotnet/api/Microsoft.TeamsFx)
* [Microsoft.TeamsFx.Configuration Namespace](/../dotnet/api/Microsoft.TeamsFx.Configuration)
* [Microsoft.TeamsFx.Conversation Namespace](/../dotnet/api/Microsoft.TeamsFx.Conversation)
* [Microsoft.TeamsFx.Helper Namespace](/../dotnet/api/Microsoft.TeamsFx.Helper)

::: zone-end

## See also

* [Create new Teams app in Visual Studio](create-new-teams-app-for-Visual-Studio.md)
* [Provision cloud resources using Visual Studio](provision-cloud-resources.md)
* [Deploy Teams app to the cloud using Visual Studio](deploy-teams-app.md)

