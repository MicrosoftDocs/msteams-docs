---
title: Microsoft 365 Agents Toolkit Overview
author: zyxiaoyuer
description: Learn about Microsoft 365 Agents Toolkit, its installation, navigation, and user journey. Agents Toolkit is available for Visual Studio Code.
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 08/26/2025
---

# Microsoft 365 Agents Toolkit Overview

[!INCLUDE [Deprecation note](../includes/deprecation-note-teamsfx-sdk.md)]

Agents Toolkit, previously known as Teams Toolkit, simplifies the process of starting app development for Microsoft Teams, Outlook, and Microsoft 365 Copilot using Visual Studio Code.

* Create new apps from project templates tailored for common app scenarios.
* Save setup time with automated app registration and configuration processes.
* Run and debug directly to Teams, Outlook, and Copilot from Visual Studio Code.
* Utilize smart defaults for hosting in Azure using infrastructure-as-code and Bicep.
* Test with various configurations such as dev, test, and prod using the environment features.

:::image type="content" source="../assets/images/toolkit-v2/toolkit-fundamentals/toolkit-user-journey2.png" alt-text="Illustration shows the User Journey of the Agents Toolkit." lightbox="../assets/images/toolkit-v2/toolkit-fundamentals/toolkit-user-journey2.png":::

## Available for Visual Studio Code

Agents Toolkit is available as a free extension for Visual Studio Code. To get started, see [install Agents Toolkit](install-Teams-Toolkit.md).

| Agents Toolkit | Visual Studio Code |
| - | ------------------ |
| Installation | Available in the Visual Studio Code Marketplace |
| Build with | JavaScript, TypeScript, React, SPFx |

> [!IMPORTANT]
>
> Agents Toolkit is actively expanding support for building apps in Government Community Cloud (GCC), GCC High, Department of Defense (DoD), and Teams operated by 21Vianet environments.
>
>Support for GCC‑Moderate (GCC‑M) is now available in [this alpha build](https://github.com/OfficeDev/microsoft-365-agents-toolkit/actions/runs/21704208660/artifacts/5387089431). Feel free to download it and try it with your government account. Ensure the `Sovereign Cloud Environment` setting is set to **GCC‑M**. We expect to make this capability publicly available in the stable release in early March, after incorporating early feedback.
>
>:::image type="content" source="../assets/images/toolkit-v2/toolkit-fundamentals/sovereign-cloud-environment-gcc-m.png" alt-text="Screenshot shows the Sovereign Cloud Environment setting configured to GCC Moderate (GCC-M) in Microsoft 365 Agents Toolkit settings." lightbox="../assets/images/toolkit-v2/toolkit-fundamentals/sovereign-cloud-environment-gcc-m.png":::
>
> Support for GCC High and DoD environments is not yet available, but both are on our roadmap. Updates will be shared as soon as they are ready.

The following list provides the key features of Agents Toolkit:

### Project templates

Save time getting started with new Teams apps using the capability-focused templates for tabs, bots, message extensions, and common app scenarios.

:::image type="content" source="../assets/images/toolkit-v2/toolkit-fundamentals/teams-agents.png" alt-text="Screenshot shows the list of new Teams app menu to create in Visual Studio Code.":::

### Composable automation tasks

Automate repetitive or tedious configuration using a composable task framework that creates app IDs, bot registrations, Microsoft Entra apps, and so on.

### Multiple environments

Test your app with different groupings of hosted resources by creating unique configurations such as `dev`, `test`, and `prod` using the Environments features.

### Quick access to Teams Developer Portal

You can access Teams Developer Portal where you can configure, publish, and manage your app. For more information, see [manage your Teams apps using Developer Portal](../concepts/build-and-test/manage-your-apps-in-developer-portal.md).

:::image type="content" source="../assets/images/toolkit-v2/build-environment-dev-portal.png" alt-text="Screenshot shows the Developer Portal option.":::

### Debug tunneling for bots

Run and debug your bot projects using Visual Studio Code and the included Dev Tunnels features.

### Microsoft 365 Agents Playground

Microsoft 365 Agents Playground, previously known as Teams App Test Tool, makes debugging bot-based apps effortless. You can chat with your bot and see its messages and Adaptive Cards as they appear in Teams. You don’t need a Microsoft 365 developer account, tunneling, or Teams app and bot registration to use Agents Playground. For more information, see [Agents Playground](debug-your-Teams-app-test-tool.md).

## See also

[Install Microsoft 365 Agents Toolkit](install-Teams-Toolkit.md)