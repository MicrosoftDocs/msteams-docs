---
title: Add single sign-on to your Teams apps
author: surbhigupta
description: In this module, learn how to add single sign-on (SSO) of Teams Toolkit, enable SSO support, and update your application to use SSO.
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: overview
ms.date: 05/20/2022
---

# Add single sign-on to Teams app

Microsoft Teams provides single sign-on (SSO) function for an app to obtain signed in Teams user token to access Microsoft Graph and other APIs. Teams Toolkit facilitates the interaction by abstracting few of the Microsoft Azure Active Directory (Azure AD) flows and integrations behind simple APIs. This enables you to add SSO features easily to your Teams app.

## Add SSO to Teams app for Microsoft Visual Studio Code

For apps that interact with the user in a chat, Team, or channel, SSO manifests as an Adaptive Card, which the user can interact with to invoke the Azure AD consent flow.

## Enable SSO support

Teams Toolkit helps you to add SSO to the following Teams capabilities in Visual Studio Code:

* Tab
* Bot
* Notification bot: restify server
* Command bot
* Workflow bot
* Message extension

### Add SSO using Visual Studio Code

You can perform the following steps to add SSO using Teams Toolkit in Visual Studio Code:

1. Open **Visual Studio Code**.
2. Select **Teams Toolkit** from the Visual Studio Code activity bar.
3. Select **View How-to Guides** in the **DEVELOPMENT** section.

   :::image type="content" source="../assets/images/teams-toolkit-v2/manual/select-feature123_1.png" alt-text="Screenshot shows the selection of View How-to guides option. ":::

4. From the dropdown list, select **Develop Single Sign-On Experience in Teams**. You'll be redirected to the respective How-to guide.

   :::image type="content" source="../assets/images/teams-toolkit-v2/add-sso/sso-select features_1.png" alt-text="Screenshot shows the Single Sign-on feature highlighted in red in the Visual Studio Code.":::

   |**Development** | **How-to Guide** |
   | -------- | --------|
   |Develop Single Sign-on Experience in Teams | [How to Develop Single Sign-on Experience](https://github.com/OfficeDev/TeamsFx/wiki/Develop-single-sign-on-experience-in-Teams) |

> [!NOTE]
> When SSO is enabled, Teams Toolkit by default provisions a single-tenant Azure AD app, which means only user and guest accounts in the same directory as your M365 account can sign in to your Teams app. For more information on supporting multi-tenant to update your TeamsFx project, see [Multi-tenancy support for Azure AD app](https://github.com/OfficeDev/TeamsFx/wiki/Multi-tenancy-Support-for-Azure-AD-app).

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals.md)
* [Prerequisites for creating your Teams app](tools-prerequisites.md)
* [Enable SSO for tab app](../tabs/how-to/authentication/tab-sso-overview.md)
* [Enable SSO for your bot and message extension](../bots/how-to/authentication/bot-sso-overview.md)
* [Prepare Accounts to build your Teams app](tools-prerequisites.md#accounts-to-build-your-teams-app)
