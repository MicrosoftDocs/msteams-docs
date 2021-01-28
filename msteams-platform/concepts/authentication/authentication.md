---
title: Authenticating app users
description: Describes authentication in Teams and how to use it in the apps
ms.topic: conceptual
keywords: teams authentication OAuth SSO AAD
---
# Authenticating users in Microsoft Teams

> [!Note]
> Web-based authentication on mobile clients requires version 1.4.1 or later of the Teams JavaScript SDK.

For the app to access user information protected by Azure Active Directory (AAD), and to access data from services like Facebook and Twitter, the app establishes a trusted connection with those providers. If the app uses Microsoft Graph APIs in the user scope, authenticate the user to retrieve the appropriate authentication tokens.

In Microsoft Teams there are two different authentication flows for the app. Perform a traditional web-based authentication flow in a [content page](~/tabs/how-to/create-tab-pages/content-page.md) embedded in a tab, a configuration page, or a task module. If the app contains a conversational bot, use the OAuthPrompt flow and optionally the Azure Bot Framework's token service to authenticate a user as part of a conversation.

## Web-based authentication flow

Use the web-based authentication flow for [tabs](~/tabs/what-are-tabs.md) and choose to use it with [conversational bots](~/bots/what-are-bots.md) or [messaging extensions](~/messaging-extensions/what-are-messaging-extensions.md). Use the [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client) in a web content page to enable authentication. Then embed that content page in a tab, a configuration page, or a task module. To use the web-based authentication flow with a conversational bot, see [add authentication to the Teams bot](~/bots/how-to/authentication/add-authentication.md).

* [Authentication flow in tabs](~/tabs/how-to/authentication/auth-flow-tab.md) describes how tab authentication works in Teams. This shows a typical web-based authentication flow used for tabs.
* [AAD authentication in tabs](~/tabs/how-to/authentication/auth-tab-AAD.md) describes how to connect to AAD from within a tab in the app in Teams.
* [Silent authentication (AAD)](~/tabs/how-to/authentication/auth-silent-AAD.md) describes how to reduce sign-in or consent prompts in the app using AAD.
* Web-based authentication in [.Net or C#](https://github.com/OfficeDev/microsoft-teams-sample-complete-csharp) or [JavaScript or Node.js](https://github.com/OfficeDev/microsoft-teams-sample-complete-node)

## The OAuthPrompt flow for conversational bots

The Azure Bot Framework’s OAuthPrompt makes authentication easier for apps using conversational bots. Use Azure Bot Framework's token service to assist with token caching.

For more information on using the OAuthPrompt, see:

* [Bot authentication flow overview](~/bots/how-to/authentication/auth-flow-bot.md) describes how authentication works within a bot in the app in Teams. This shows a non-web-based authentication flow used for bots on all versions of Teams (web, desktop app, and mobile apps)
* [Bot authentication](~/bots/how-to/authentication/add-authentication.md)
* Bot authentication (v3 SDK) sample in [.Net or C#](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/csharp_dotnetcore/46.teams-auth) or [JavaScript or Node.js](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/javascript_nodejs/46.teams-auth)

## Configure the identity provider

Regardless of which authentication flow the app is using even if the app is using both, configure the identity provider to communicate with the Teams app. The majority of the samples and walkthroughs primarily deal with using AAD as the identity provider. The concepts, however, apply regardless of the identity provider.

For more information, see [configuring an identity provider](~/concepts/authentication/configure-identity-provider.md).
