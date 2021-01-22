---
title: Authenticating app users
description: Describes authentication in Teams and how to use it in your apps
ms.topic: conceptual
keywords: teams authentication OAuth SSO AAD
---
# Authenticating users in Microsoft Teams

> [!Note]
> Web-based authentication on mobile clients requires version 1.4.1 or later of the Teams JavaScript SDK.

In order for your app to access user information protected by Azure Active Directory, as well as access data from other services like Facebook and Twitter, your app will have to establish a trusted connection with those providers. If your app needs to use Microsoft Graph APIs in the user scope, you'll also need to authenticate the user to retrieve the appropriate authentication tokens.

In Microsoft Teams there are two different authentication flows for your app to take advantage of. You can perform a traditional web-based authentication flow in a [content page](~/tabs/how-to/create-tab-pages/content-page.md) embedded in a tab, a configuration page, or a task module. If your app contains a conversational bot you can use the OAuthPrompt flow (and optionally the Azure Bot Framework's token service) to authenticate a user as part of a conversation.

## Web-based authentication flow

You'll need to use the web-based authentication flow for [tabs](~/tabs/what-are-tabs.md), and can choose to use it with [conversational bots](~/bots/what-are-bots.md) or [messaging extensions](~/messaging-extensions/what-are-messaging-extensions.md). You'll use the [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client) in a web content page to enable authentication, then embed that content page in a tab, a configuration page, or a task module. If you want to use the web-based authentication flow with a conversational bot, you'll need to [use a task module with a bot](~/task-modules-and-cards/task-modules/task-modules-bots.md).

* [Authentication flow in tabs](~/tabs/how-to/authentication/auth-flow-tab.md) describes how tab authentication works in Teams. This shows a typical web based authentication flow used for tabs.
* [Azure AD authentication in tabs](~/tabs/how-to/authentication/auth-tab-AAD.md) describes how to connect to Azure Active Directory from within a tab in your app in Teams.
* [Silent authentication (Azure AD)](~/tabs/how-to/authentication/auth-silent-AAD.md) describes how to reduce sign-in/consent prompts in your app using Azure Active Directory.
* Web-based authentication in [dotnet/C#](https://github.com/OfficeDev/microsoft-teams-sample-complete-csharp) or [JavaScript/Node.js](https://github.com/OfficeDev/microsoft-teams-sample-complete-node)

## The OAuthPrompt flow for conversational bots

The Azure Bot Framework’s OAuthPrompt makes authentication easier for apps using conversational bots. You can take advantage of Azure Bot Framework's token service to assist with token caching as well.

For more information on using the OAuthPrompt see:

* [Bot authentication flow overview](~/bots/how-to/authentication/auth-flow-bot.md) describes how authentication works within a bot in your app in Teams. This shows a non-web based authentication flow used for bots on all versions of Teams (web, desktop app, and mobile apps)
* [Bot authentication](~/bots/how-to/authentication/add-authentication.md)
* Bot authentication (v3 SDK) sample in [dotnet/C#](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/csharp_dotnetcore/46.teams-auth) or [JavaScript/Node.js](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/javascript_nodejs/46.teams-auth)

## Configure your identity provider

Regardless of which authentication flow your app is using (you might even be using both), you'll need to configure your identity provider to communicate with your Teams app. The majority of the samples and walkthroughs you'll find here will deal primarily with using Azure Active Directory as your identity provider. The concepts however apply regardless of which identity provider you'll use.

For more information see [configuring an identity provider](~/concepts/authentication/configure-identity-provider.md)
