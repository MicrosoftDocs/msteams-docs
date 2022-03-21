---
title: Comparison of authentication scenarios
description: Comparison of authentication in Teams apps
ms.topic: conceptual
ms.localizationpriority: medium
keywords: teams authentication OAuth SSO Microsoft Azure Active Directory (Azure AD) app scenarios
---

# Compare authentication scenarios

The choice of authentication method that best suits your Teams app may depend on factors, such as type of app, security, frequency of logging in, and distribution model.

This page seeks to let you compare authentication methods based on:

- Authentication methods
- Distribution model
- App capability

## Compare authentication methods

| &nbsp; | Teams SSO with Azure AD | Teams assisted SSO with Azure AD | Authentication with third-party IdPs |
| --- | --- | --- | --- |
| **Frequency of logging in** | User never needs to log into the app | User logs in once for all. | User may need to log in on a different browser. |
| **Number of passwords** | User credentials already available in Teams are used. | Only one password is needed. | Multiple passwords may be used for different IdPs. |
| **Cost of authentication** | Low overheads as no extra password or login details needs to be maintained. The user never needs to be authenticated, and Teams takes care of handling user identity. Your app doesn't need to worry about token lifecycle. | Low cost as the user password authentication is done only once. The user is logged in silently and Azure AD managed token lifecycle. | Comparatively higher overheads as user may need to log in every time the token expires. The IdP manages the token lifecycle. The app needs to handle refreshing tokens. |
| **Security** | -- | -- | -- |
| **Conditional access policies** | Use of conditional access policies builds adds to the security capabilities  | You may not be able to completely leverage the use of conditional policies | Third-party IdPs can't leverage conditional access policies. |
| **Ease of app development** | The simplest app building process with Teams Toolkit and Visual Studio Code. | -- | -- |

## Compare authentication for app distribution model

Your app can be distributed as a Teams client app, web app, mobile app, or across all platforms. Plan for authentication for all the ways that you plan to distribute your app.

- Desktop app accessible from within Teams Client.
- Teams web app
- Teams mobile app

\ Add content \

## Compare authentication for app capabilities

In Teams, your app can have capabilities, such as a tab or bot, or messaging extension. Your app can a single- or multi-capability app.

This section explores the authentication required for different app capability in Teams for single- and multi-capability apps.
