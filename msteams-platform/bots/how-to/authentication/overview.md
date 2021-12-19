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


The Azure Bot Framework’s OAuthPrompt makes authentication easier for apps using conversational bots. Use Azure Bot Framework's token service to assist with token caching. Use Microsoft Graph APIs for authenticating the user. Follow these steps to add authentication to your bot:

- [Add authentication to the Teams bot](add-authentication.md) describes how to use web-based authentication flow with a conversational bot. You can add authentication to your bot using Azure Bot Service v4 SDK authentication, based on OAuth 2.0. This action makes it easier to develop a bot that can use authentication tokens based on the user's credentials.

- [Authentication flow in bots](auth-flow-bot.md) describes how authentication works within a bot in the app in Teams. This page shows a non-web-based authentication flow used for bots on Teams web, desktop app, and mobile apps.

- [SSO authentication](auth-aad-sso-bots.md) in Azure Active Directory (AAD) minimizes the number of times users need to enter their sign-in credentials by silently refreshing the authentication token. If users agree to use your app, they need not provide consent again on another device and can sign in automatically.

## See also

[Add authentication to the Teams bot](add-authentication.md)
[Authentication flow for bots in Microsoft Teams](auth-flow-bot.md)
[SSO authentication](auth-aad-sso-bots.md)