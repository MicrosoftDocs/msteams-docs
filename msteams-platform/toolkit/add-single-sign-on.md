---
title: Add autentication to your Teams agent or apps
description: In this module, learn how to add single sign-on (SSO) of Microsoft 365 Agents Toolkit, enable SSO support, and update your agent or app to use SSO.
ms.localizationpriority: medium
ms.topic: overview
ms.date: 04/15/2026
---
# Add authentication to Teams agent or app

Microsoft Teams supports adding authentication to your agents or apps. You can add single sign-on (SSO) or OAuth authentication.

When you [enable SSO for your Teams agent or app](develop-single-sign-on-experience-in-Teams.md#enable-sso-for-teams-agents) project, the Agents Toolkit creates a dedicated Microsoft Entra app registration for the agent or app. The Entra app registration is tenant-scoped to the Microsoft 365 tenant associated with the app, so only member users and guest accounts in the same Microsoft Entra tenant can sign-in and access the Teams agent or app.

> [!NOTE]
> For more information on supporting multitenant to update your TeamsFx project, see [multi-tenancy support for Microsoft Entra app](https://github.com/OfficeDev/TeamsFx/wiki/Multi-tenancy-Support-for-Azure-AD-app).

Based on how you distribute your agent or app, use one of the following SDKs to add authentication:

- Use Teams SDK to add SSO authentication to your Teams agents.
- Use Microsoft 365 Agents SDK to add authentication to agents that extend across Microsoft 365.

Here are helpful how-to guides for adding authentication to your agent or app:

|**Development** | **How-to Guide** |
| -------- | -------- |
| Add authentication to agents and apps using Teams SDK | [Add authentication using Teams SDK](/microsoftteams/platform/teams-sdk/essentials/app-authentication?branch=main&pivots=csharp) |
| Add SSO authentication to agents and apps using Teams SDK | [SSO setup for agents and apps](/microsoftteams/platform/teams-sdk/essentials/app-authentication?pivots=csharp) |
| Add authentication to Teams agent using Microsoft 365 Agents SDK | [Add authentication using Microsoft 365 Agents SDK](/microsoft-365/agents-sdk/configure-authentication-msal?pivots=python) |
| Develop SSO experience in Teams tab app | [Enable single sign-on for tab app](develop-single-sign-on-experience-in-Teams.md) |
| Develop SSO experience in Teams bot and message extension app | [Enable SSO for your bot and message extension](../bots/how-to/authentication/bot-sso-overview.md) |

## Access how-to guide for adding SSO from Agents Toolkit

Follow these steps to open SSO authentication how-to guide:

1. Open **Visual Studio Code** and select **Microsoft 365 Agents Toolkit** from the activity bar.
3. Select **View How-to Guides** in the **DEVELOPMENT** section.

   :::image type="content" source="~/assets/images/toolkit-v2/manual/select-view-how-to-guides.png" alt-text="Screenshot shows the option to select View How-to Guides under Development.":::

4. From the dropdown list, select **Develop Single Sign-On Experience in Teams**. You're redirected to its how-to guide.

   :::image type="content" source="../assets/images/toolkit-v2/add-sso/sso-select features_1.png" alt-text="Screenshot shows the Single Sign-on feature highlighted in red in the Visual Studio Code.":::

## See also

- [Microsoft 365 Agents Toolkit Overview](agents-toolkit-fundamentals.md)
- [Prepare Accounts to build your Teams app](tools-prerequisites.md#accounts-to-build-your-teams-agent-or-app)
- [authenticate users in Microsoft Teams](../concepts/authentication/authentication.md)
- [Configure your .NET agent to use OAuth using Microsoft 365 Agents SDK](/microsoft-365/agents-sdk/agent-oauth-configuration-dotnet)
