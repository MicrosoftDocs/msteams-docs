---
title: Authenticating app users
description: Describes authentication in Teams and how to use it in the apps
ms.topic: conceptual
localization_priority: Normal
keywords: teams authentication OAuth SSO AAD
---
# Authenticate users in Microsoft Teams

Teams establishes a trusted connection with providers, to access data from services, for example: Facebook and Twitter and also to access user information protected by Azure Active Directory (AAD). The document covers the following topics in detail:

* Configuration of identity provider
* Authenticitaion in Tabs
* Authentication in Bots
* Authentication in Messaging extensions

In Teams, there are two authentication flows for the app:
* Web-based authentication flow: Use in a [content page](~/tabs/how-to/create-tab-pages/content-page.md) embedded in a tab, a configuration page, or a task module. 
* OAuthPrompt flow: Use if the app contains a conversational bot, and optionally use the Azure Bot Framework's token service to authenticate user as part of a conversation.

> [!NOTE]
> Microsoft Graph APIs help authenticate the user to retrieve the appropriate authentication tokens.

## Configure the identity provider

Configure the identity provider communicates with Teams app regardless of the app's authentication flow. Most samples and walkthroughs primarily deal with using AAD as the identity provider. The concepts, however, apply regardless of the identity provider.

For more information, see [configuring an identity provider](~/concepts/authentication/configure-identity-provider.md).

## Web-based authentication flow

Use the web-based authentication flow for [tabs](~/tabs/what-are-tabs.md) and choose to use it with [conversational bots](~/bots/what-are-bots.md) or [messaging extensions](~/messaging-extensions/what-are-messaging-extensions.md). Use the [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client) in a web content page to enable authentication. After enabling authentication, embed the content page in a tab, a configuration page, or a task module. For more information on web-based authentication flow, see:

* [Authentication flow in tabs](~/tabs/how-to/authentication/auth-flow-tab.md) describes how tab authentication works in Teams. This shows a typical web-based authentication flow used for tabs.
* [AAD authentication in tabs](~/tabs/how-to/authentication/auth-tab-AAD.md) describes how to connect to AAD from within a tab in the app in Teams.
* [Silent authentication AAD](~/tabs/how-to/authentication/auth-silent-AAD.md) describes how to reduce sign-in or consent prompts in the app using AAD.
* [Add authentication to the Teams bot](~/bots/how-to/authentication/add-authentication.md) describes how to use web-based authentication flow with a conversational bot.
* [.Net or C#](https://github.com/OfficeDev/microsoft-teams-sample-complete-csharp) or [JavaScript or Node.js](https://github.com/OfficeDev/microsoft-teams-sample-complete-node) provides samples for web-based authentication.

> [!NOTE]
> Web-based authentication on mobile clients requires Teams JavaScript client SDK version 1.4.1 or later.

## OAuthPrompt flow for conversational bots

The Azure Bot Framework’s OAuthPrompt makes authentication easier for apps using conversational bots. Use Azure Bot Framework's token service to assist with token caching.

For more information on using the OAuthPrompt, see:

* [Bot authentication flow overview](~/bots/how-to/authentication/auth-flow-bot.md) describes how authentication works within a bot in the app in Teams. This shows a non-web-based authentication flow used for bots on Teams web, desktop app, and mobile apps.
* [Bot authentication](~/bots/how-to/authentication/add-authentication.md) describes how to add OAuth authentication to the Teams bot.

## Code sample

The following table lists bot authentication v3 SDK code samples:

| **Sample name** | **Description** | **.NET** | **Node.js** | **Python** |
|---------------|------------|------------|-------------|---------------|
| Bot authentication | This sample shows how to get started with authentication in a bot for Microsoft Teams. | [View](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/csharp_dotnetcore/46.teams-auth) | [View](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/javascript_nodejs/46.teams-auth) | [View](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/python/46.teams-auth) |

## See also

* [Authentication flow in tabs](~/tabs/how-to/authentication/auth-flow-tab.md)
* [Authentication flow in bots](~/bots/how-to/authentication/auth-flow-bot.md)

## Next step

> [!div class="nextstepaction"]
> [Configure identity providers](~/concepts/authentication/configure-identity-provider.md).

