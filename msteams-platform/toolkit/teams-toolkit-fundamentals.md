---
title: Teams Toolkit Overview
author: zyxiaoyuer
description: Learn about Teams Toolkit, it's installation, navigation, and user journey. Teams Toolkit is available for Visual Studio code.
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 02/05/2024
---
# Teams Toolkit Overview

Teams Toolkit makes it simple to get started with app development for Microsoft Teams, Outlook, and the M365 app using Visual Studio Code.

* Create new apps from project templates for common app scenarios.
* Save setup time with automated app registration and configuration.
* Run and debug to Teams, Outlook, and the M365 app directly from VS Code.
* Smart defaults for hosting in Azure using infrastructure-as-code and Bicep.
* Test with different configurations like dev, test, and prod using the environment features.

:::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/teams-toolkit-user-journey2.png" alt-text="Illustration shows the User Journey of the Teams Toolkit." lightbox="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/teams-toolkit-user-journey2.png":::

## Available for Visual Studio Code and Visual Studio

Teams Toolkit is available as a free extension for VS Code. To get started, see [Install Teams Toolkit](install-Teams-Toolkit.md).

| Teams Toolkit | Visual Studio Code | Visual Studio 2022 |
| - | ------------------ | ------------------ |
| Installation | Available in the VS Code Marketplace | Available in the VS Installer |
| Build with | JavaScript, TypeScript, React, SPFx | C#, ASP.NET, Blazor |

> [!IMPORTANT]
>
> Teams Toolkit doesn't support building apps for Government Community Cloud (GCC) and GCC-High environments.

## Features

### Project templates

Save time getting started with new Teams apps using the capability-focused templates for tabs, bots, message extensions, and common app scenarios.

:::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/create-new-app_2.png" alt-text="Screenshot shows the create new Teams app menu in Visual Studio Code.":::

### Composable automation tasks

Automate repetitive or tedious configuration using a composable task framework that creates app IDs, bot registrations, Entra ID apps, and more. 

### Multiple environments

Test your app with different groupings of hosted resources by creating unique configurations like `dev`, `test`, and `prod` using the Environments features.

### Debug tunneling for bots

Run and debug your bot projects using VS Code and the included Dev Tunnels features.

### App test tool

Run and debug your bot projects in the test tool debug configuration to launch in a simulator-like experience for Teams without the need for an account or custom app permissions.

### Infrastructure templates

Optionally use any of our smart defaults for hosting your app project in Azure using Bicep templates included with every project template. 

## Next steps

> [!div class="nextstepaction"]
> [Install Teams Toolkit for VS Code](install-Teams-Toolkit.md)

## See also

* [Explore Teams Toolkit for VS Code](~/toolkit/explore-teams-toolkit.md)
* [Teams Toolkit for Visual Studio 2022](~/toolkit/toolkit-v4/teams-toolkit-fundamentals-vs.md)
