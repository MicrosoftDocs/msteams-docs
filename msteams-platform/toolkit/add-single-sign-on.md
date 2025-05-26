---
title: Add single sign-on to your Teams apps
author: surbhigupta
description: In this module, learn how to add single sign-on (SSO) of Microsoft 365 Agents Toolkit, enable SSO support, and update your application to use SSO.
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: overview
ms.date: 05/20/2022
---
# Add single sign-on to Teams app

Microsoft Teams provides single sign-on (SSO) function for an app to obtain signed in Teams user token to access Microsoft Graph and other APIs. Microsoft 365 Agents Toolkit (previously known as Teams Toolkit) facilitates the interaction by abstracting few of the Microsoft Entra ID flows and integrations behind simple APIs and enables you to add SSO features easily to your Teams app.

## Add SSO to Teams app for Microsoft Visual Studio Code

For apps that interact with the user in a chat, Team, or channel, SSO manifests as an Adaptive Card, which the user can interact with to invoke the Microsoft Entra consent flow.

## Enable SSO support

Agents Toolkit helps you to add SSO to the following Teams capabilities in Visual Studio Code:

* Tab
* Bot
* Notification bot: express server
* Command bot
* Workflow bot
* Message extension

### Add SSO using Visual Studio Code

You can perform the following steps to add SSO using Agents Toolkit in Visual Studio Code:

1. Open **Visual Studio Code**.
2. Select **Microsoft 365 Agents Toolkit** from the Visual Studio Code activity bar.
3. Select **View How-to Guides** in the **DEVELOPMENT** section.

   :::image type="content" source="~/assets/images/toolkit-v2/manual/select-view-how-to-guides.png" alt-text="Screenshot shows the option to select View How-to Guides under Development.":::

4. From the dropdown list, select **Develop Single Sign-On Experience in Teams**. You're redirected to the respective How-to guide.

   :::image type="content" source="../assets/images/toolkit-v2/add-sso/sso-select features_1.png" alt-text="Screenshot shows the Single Sign-on feature highlighted in red in the Visual Studio Code.":::

   |**Development** | **How-to Guide** |
   | -------- | --------|
   |Develop Single Sign-on Experience in Teams | [Enable single sign-on for tab app](develop-single-sign-on-experience-in-Teams.md) |

> [!NOTE]
> When SSO is enabled, Agents Toolkit by default provisions a single-tenant Microsoft Entra app, which means only user and guest accounts in the same directory as your M365 account can sign in to your Teams app. For more information on supporting multitenant to update your TeamsFx project, see [Multi-tenancy support for Microsoft Entra app](https://github.com/OfficeDev/TeamsFx/wiki/Multi-tenancy-Support-for-Azure-AD-app).

## See also

* [Microsoft 365 Agents Toolkit Overview](agents-toolkit-fundamentals.md)
* [Prerequisites for creating your Teams app](tools-prerequisites.md)
* [Enable SSO for tab app](../tabs/how-to/authentication/tab-sso-overview.md)
* [Enable SSO for your bot and message extension](../bots/how-to/authentication/bot-sso-overview.md)
* [Prepare Accounts to build your Teams app](tools-prerequisites.md#accounts-to-build-your-teams-app)
