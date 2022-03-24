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

- Authentication features
- App types

## Compare authentication methods
 
| &nbsp; | Teams SSO with Azure AD | Azure AD as IdP | Authentication with third-party IdPs |
| --- | --- | --- | --- |
| **Frequency of logging in** | User never needs to log into the app | User logs in once for all. | User may need to log in on a different browser. |
| **Number of passwords** | User credentials already available in Teams are used. | Only one password is needed. | Multiple passwords may be used for different IdPs. |
| **Cost of authentication** | Low overheads as no extra password or login details needs to be maintained. The user never needs to be authenticated, and Teams takes care of handling user identity. Your app doesn't need to worry about token lifecycle. | Low cost as the user password authentication is done only once. The user is logged in silently and Azure AD manages token lifecycle. | Comparatively higher overheads as user may need to log in every time the token expires. The IdP manages the token lifecycle. The app needs to handle refreshing tokens. |
| **Security** | Security is high as user credentials don't need to be entered or validated. Teams handles app access based on user's identity in Teams. You can also leverage the conditional access policies.  | Security options are good as the user enters their credentials only once and Azure AD manages their ID tokens after that. | Security may be at risk as the user may need to log in repeatedly with change in browser or expiry of tokens. |
| **Conditional access policies** | Use of conditional access policies builds adds to the security capabilities  | You may not be able to completely leverage the use of conditional policies | Third-party IdPs can't leverage conditional access policies. |
| **Ease of app development** | The simplest app building process with Teams Toolkit and Visual Studio Code. | -- | -- |
| **Compatibility with iOS and Android** | Your Teams app is compatible with: <br> - Teams for Android (1416/1.0.0.2020073101 and later) <br> - Teams for iOS (Version: 2.0.18 and later) <br> - Teams JavaScript SDK (Version: 1.10 and later) for SSO to work in meeting side panel. | -- | -- |

## Compare authentication for app types

Your Teams app can be distributed as a Teams client app, web app, mobile app, or across all platforms. Plan authentication for all the ways that you plan to distribute your app.

- Desktop app accessible from within Teams Client.
- Teams web app
- Teams mobile app

<!-- Compare authentication for app capabilities
In Teams, your app can have capabilities, such as a tab or bot, or messaging extension. Your app can a single- or multi-capability app.

This section explores the authentication required for different app capability in Teams for single- and multi-capability apps.

 	Teams SSO with Azure AD	Azure AD as IdP	Authentication with third-party IdPs
Tabs	You can build your applications with almost seamless authentication. The user only needs to consent the usage of their Teams app once.	The user needs to enter their user credentials once for using your app.	The user may need to sign-in multiple times, and your app needs to handle ID and access tokens.
Bots	The user is redirected to provide consent only once.	--	--
Messaging extensions	--	--	--
Link unfurling	--	--	--
Task modules	--	--	--
Apps for Teams meetings	--	--	--
Multi-capability app	--	--	-->

## Next step

> [!div class="nextstepaction"]
> [Authenticate with Teams SSO with Azure AD](plan-sso-teams.md)
