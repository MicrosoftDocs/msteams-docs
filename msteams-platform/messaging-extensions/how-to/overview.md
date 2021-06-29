---
title: Authenticate messaging extensions
author: surbhigupta
description: Authentication to a messaging extension
localization_priority: Normal
ms.topic: overview
ms.author: anclear
---

# Authenticate messaging extensions

You can add authentication to your messaging extension by:
* Identifying the user, where `id` and `aadObjectId` are used as keys to look up the credentials or any cached state in your service.
* Authenticating the user by issuing a query, sending an `auth` response, signing in, and sending an **authentication code**.

Single sign-on support is available for messaging extensions and link unfurling. Enabling Single sign-on (SSO) for messaging extensions refreshes the authentication token, which minimizes the number of times you need to enter your sign in credentials for Microsoft Teams.

## See also

* [Add authentication to your messaging extensions](add-authentication.md)
* [Enable SSO for messaging extensions](enable-SSO-auth-me.md)