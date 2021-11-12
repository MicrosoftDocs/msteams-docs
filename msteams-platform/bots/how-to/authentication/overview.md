---
title: Authenticate bots in Microsoft Teams
description: An overview of Microsoft Teams authentication of bots
keywords: teams authentication flow bots
localization_priority: Normal
ms.topic: overview
---

# Authenticate bots in Microsoft Teams

This article describes how authentication works within a bot in the app in Teams. The authentication flow for tabs and bots is different. Tabs authentication flow is like websites, so, tabs can directly use OAuth 2.0. Bot authentication flow is different, but the core concepts are identical. For more information, see [authentication flow for bots in Microsoft Teams](auth-flow-bot.md).

> [!NOTE]
> Microsoft Graph APIs help authenticate the user to retrieve the appropriate authentication token.

[Add authentication to the Teams bot](add-authentication.md) describes how to use web-based authentication flow with a conversational bot. You can add authentication to your bot using Azure Bot Service v4 SDK authentication, based on OAuth 2.0. This makes it easier to develop a bot that can use authentication tokens based on the user's credentials.

You can use single sign-on authentication in Azure Active Directory (AAD) as it minimizes the number of times users need to enter their sign in credentials by silently refreshing the authentication token. If users agree to use your app, they need not provide consent again on another device and can sign in automatically. For more information, see [use SSO authentication](auth-aad-sso-bots.md).

## Code sample

The following table provides bot authentication v3 SDK sample:

| **Sample name** | **Description** | **.NET** | **Node.js** | **Python** |
|---------------|------------|------------|-------------|---------------|
| Bot authentication | This sample shows how to get started with authentication in a bot for Microsoft Teams. | [View](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/csharp_dotnetcore/46.teams-auth) | [View](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/javascript_nodejs/46.teams-auth) | [View](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/python/46.teams-auth) |

## See also

[Authentication flow for bots in Microsoft Teams](auth-flow-bot.md)