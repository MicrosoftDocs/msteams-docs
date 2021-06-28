---
title: Authenticate bots in Microsoft Teams
description: An overview of Microsoft Teams authentication of bots
keywords: teams authentication flow bots
localization_priority: Normal
ms.topic: overview
---

# Authenticate bots in Microsoft Teams

Authentication flow for tabs and bots is a little different. Tabs authentication flow is very similar to websites so tabs can use OAuth 2.0 directly, while bot authentication flow is not and must do a few things differently, but the core concepts are identical. 

You can add authentication to your bot using Azure Bot Service v4 SDK authentication, based on OAuth 2.0. This makes it easier to develop a bot that can use authentication tokens based on the user's credentials. You can use single sign-on authentication in Azure Active Directory (AAD) as it minimizes the number of times users need to enter their sign in credentials by silently refreshing the authentication token. If users agree to use your app, they need not provide consent again on another device and can sign in automatically.