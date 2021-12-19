---
title: Authenticate messaging extensions
author: surbhigupta
description: Authentication to a messaging extension
localization_priority: Normal
ms.topic: overview
ms.author: anclear
---

# Authenticate messaging extensions

This document provides an overview of authentication of messaging extension, Single Sign-On support, and link unfurling for messaging extension.

1. Use the following steps to Add authentication to your messaging extension, see [authenticate your messaging extension](add-authentication.md)
- Identifying the user, where `id` and `aadObjectId` are used as keys to look up the credentials or any cached state in your service.
- Authenticating the user by issuing a query, sending an `auth` response, signing in, and sending an **Authentication code**.

1. Use [Single sign-on support](enable-SSO-auth-me.md) for messaging extensions and link unfurling. Enabling Single sign-on (SSO) for messaging extensions refreshes the authentication token, which minimizes the number of times you need to enter your sign-in credentials for Microsoft Teams.

## See also
* [Add authentication to your messaging extension](add-authentication.md)
* [Single sign-on support for messaging extensions](enable-SSO-auth-me.md)
