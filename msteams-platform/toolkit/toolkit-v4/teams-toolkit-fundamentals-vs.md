---
title: Teams Toolkit Visual Studio Overview
author: zyxiaoyuer
description: Learn about Teams Toolkit, it's installation, navigation, and user journey. Teams Toolkit is available for Visual Studio.
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 05/24/2022
zone_pivot_groups: teams-toolkit-platform-vs
---

# Teams Toolkit Visual Studio Overview

::: zone pivot="visual-studio-v17-7"

> [!IMPORTANT]
> We've introduced the important changes in Teams Toolkit extension within Microsoft Visual Studio v17.7 with many new app development features. We recommend that you use Teams Toolkit v17.7 for building your Teams app.

Teams Toolkit makes it simple to get started with app development for Microsoft Teams using Visual Studio.

* Start with a project template for common line-of-business app scenarios or from a sample.
* Save setup time with automated app registration and configuration.
* Run and debug to Teams directly from familiar tools.
* Smart defaults for hosting in Microsoft Azure using infrastructure-as-code and Bicep.
* Bring your app to your organization or the Teams App Store using built-in publishing tools.

:::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/teams-toolkit-user-journey.png" alt-text="Screenshot shows the User Journey of the Teams Toolkit." lightbox="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/teams-toolkit-user-journey.png":::

## Available for Visual Studio

Teams Toolkit v17.7 is available for free for Visual Studio 2022 Community, Professional, and Enterprise. For more information about installation and setup, see how to [install Teams Toolkit](./install-Teams-Toolkit-vs.md).

| Teams Toolkit | Visual Studio |
| - | ------------- |
| Installation | Available in the Visual Studio Installer |
| Build with | C#, .NET, ASP.NET, and Blazor |

## Features

The following are the key features of Teams Toolkit:

* [Project templates](#project-templates)
* [Automatic registration and configuration](#automatic-registration-and-configuration)

### Project templates

You can start with the capability-focused templates such as tabs, bots, and message extensions or by following the existing samples if you're already familiar with Teams app development. Teams Toolkit reduces the complexity of getting started with the help of templates for custom app built for org scenarios and smart defaults to accelerate your time to production. 

Perform the following the steps to select templates and app capbaility:

1. Select **File > New > Project**.

1. Enter **Teams** in the search box and from search results, select **Microsoft Teams App** template.
 
1. Select **Next**.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/new-project-template-vs.png" alt-text="Screenshot shows the search and select Microsoft Teams app." lightbox="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/new-project-template-vs.png":::

### Automatic registration and configuration

You can save time and let the toolkit automatically register the app in Teams Developer Portal. When you first run or debug the app, Teams Toolkit automatically registers the Teams app to your Microsoft 365 tenant and configures settings such as Azure Active Directory (Azure AD) for your Teams app. Sign in with your Microsoft 365 account to control where the app is configured and customize the Azure AD manifest. 

#### TeamsFx .NET SDK reference

* [Microsoft.Extensions.DependencyInjection Namespace](/../dotnet/api/Microsoft.Extensions.DependencyInjection)
* [Microsoft.TeamsFx Namespace](/../dotnet/api/Microsoft.TeamsFx)
* [Microsoft.TeamsFx.Configuration Namespace](/../dotnet/api/Microsoft.TeamsFx.Configuration)
* [Microsoft.TeamsFx.Conversation Namespace](/../dotnet/api/Microsoft.TeamsFx.Conversation)
* [Microsoft.TeamsFx.Helper Namespace](/../dotnet/api/Microsoft.TeamsFx.Helper)

## See also

[Install Teams Toolkit](install-Teams-Toolkit-vs.md)

::: zone-end

::: zone pivot="visual-studio-v17-6"

Teams Toolkit makes it simple to get started with app development for Microsoft Teams using Visual Studio.

* Start with a project templates for common line-of-business app scenarios or from a sample.
* Save setup time with automated app registration and configuration.
* Run and debug to Teams directly from familiar tools.
* Smart defaults for hosting in Azure using infrastructure-as-code and Bicep.
* Bring your app to your organization or the Teams App Store using built-in publishing tools.

:::image type="content" source="images/teams-toolkit-user-journey3VS-v4.png" alt-text="User Journey of the Teams Toolkit"  lightbox="images/teams-toolkit-user-journey3VS-v4.png":::

## Available for Visual Studio

Teams Toolkit is available for free for Visual Studio 2022 Community, Professional, and Enterprise. For more information about installation and setup, see [install Teams Toolkit](~/toolkit/toolkit-v4/install-Teams-Toolkit-vs.md).

| Teams Toolkit | Visual Studio |
| - | ------------- |
| Installation | Available in the Visual Studio Installer |
| Build with | C#, .NET, ASP.NET, Blazor |

## Features

The following list provides the key features of Teams Toolkit:

* [Project templates](#project-templates)
* [Automatic registration and configuration](#automatic-registration-and-configuration)

### Project templates

You can start directly with the capability-focused templates such as tabs, bots, and message extensions or by following existing samples if you're already familiar with Teams app development. Teams Toolkit reduces the complexity of getting started with templates for common line-of-business app scenarios and smart defaults to accelerate your time to production.

:::image type="content" source="images/create-new-app-vs_2-v4.png" alt-text="Create new Teams app menu in VS Code":::

### Automatic registration and configuration

You can save time and let the toolkit automatically register the app in Teams Developer Portal. When you first run or debug the app, configure settings, such as Azure Active Directory (Azure AD) automatically. Sign in with your Microsoft 365 account to control where the app is configured and customized the included Azure AD manifest when you need flexibility.

#### TeamsFx .NET SDK Reference docs

* [Microsoft.Extensions.DependencyInjection Namespace](/../dotnet/api/Microsoft.Extensions.DependencyInjection)
* [Microsoft.TeamsFx Namespace](/../dotnet/api/Microsoft.TeamsFx)
* [Microsoft.TeamsFx.Configuration Namespace](/../dotnet/api/Microsoft.TeamsFx.Configuration)
* [Microsoft.TeamsFx.Conversation Namespace](/../dotnet/api/Microsoft.TeamsFx.Conversation)
* [Microsoft.TeamsFx.Helper Namespace](/../dotnet/api/Microsoft.TeamsFx.Helper)

## See also

[Install Teams Toolkit](install-Teams-Toolkit-vs.md)

::: zone-end
