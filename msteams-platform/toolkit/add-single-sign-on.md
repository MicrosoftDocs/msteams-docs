---
title: Add autentication to your Teams agent or apps
description: In this module, learn how to add single sign-on (SSO) of Microsoft 365 Agents Toolkit, enable SSO support, and update your agent or app to use SSO.
ms.localizationpriority: medium
ms.topic: overview
ms.date: 04/15/2026
---
# Add authentication to Teams agent or app

Microsoft Teams supports authentication for agents and apps through single sign-on (SSO) and OAuth. The authentication model that you implement depends on how your agent or app is built and its distribution scope. Use Teams SDK to add SSO to Teams-specific apps and agents. Use the Microsoft 365 Agents SDK to add authentication to agents that extend across Microsoft 365.

Here are a few helpful articles to get you started with authentication for your agent or app:

- [Add authentication to agents and apps using Teams SDK](/microsoftteams/platform/teams-sdk/essentials/app-authentication?branch=main&pivots=csharp)
- [Add SSO authentication to agents and apps using Teams SDK](/microsoftteams/platform/teams-sdk/essentials/app-authentication?pivots=csharp)
- [Add authentication to Teams agent using Microsoft 365 Agents SDK](/microsoft-365/agents-sdk/configure-authentication-msal?pivots=python)
- [Develop SSO experience in Teams app](develop-single-sign-on-experience-in-Teams.md#enable-sso-for-teams-agent-or-app)

## View how-to guide from Agents Toolkit

Follow these steps to access SSO authentication how-to guide:

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
