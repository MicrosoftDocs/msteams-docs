---
title: Authenticate tabs
description: Describes how to authenticate tabs
ms.topic: conceptual
localization_priority: Normal
keywords: teams authentication OAuth SSO AAD
---
# Authenticate tabs

Teams establishes a trusted connection with providers to access data from services like Facebook, Twitter, and to access user information protected by Azure Active Directory (AAD). Teams has different authentication flows for the app. Use the web-based authentication flow for tabs and web-based authentication flow in a content page embedded in tab

 > [!NOTE]
 > Web-based authentication on mobile clients requires Teams JavaScript client SDK version 1.4.1 or later.

Ways to authenticate tabs:

![Expose an API](~/assets/images/authentication/SSOtabsauth/SSO-auth-step4.png)

## Web-based authentication flow

Teams has different authentication flows for the app. Use the web-based authentication flow for [tabs](~/tabs/what-are-tabs.md). Use the [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client) in a web content page to enable authentication. After enabling authentication, embed the [content page](~/tabs/how-to/create-tab-pages/content-page.md) in a tab, a configuration page, or a task module. For more information on web-based authentication flow, see:

* [Authentication flow in tabs](~/tabs/how-to/authentication/auth-flow-tab.md) describes how tab authentication works in Teams. This section shows a typical web-based authentication flow used for tabs.
* [AAD authentication in tabs](~/tabs/how-to/authentication/auth-tab-AAD.md) describes how to connect to AAD from within a tab in the app in Teams.
* [Silent authentication AAD](~/tabs/how-to/authentication/auth-silent-AAD.md) describes how to reduce sign in or consent prompts in the app using AAD.
* [Single Sign-on authentication in tabs](auth-aad-sso.md) describes how to authorize Teams tab or task module on desktop or mobile client.

Check out this video to understand authentication:


> [!VIDEO https://www.youtube-nocookie.com/embed/uIUhLuzEqcI&t=2s]


## Code sample

The following table lists tab SSO authentication v3 SDK code samples:

| **Sample name** | **Description** | **.NET** | **Node.js** | **Python** |
|---------------|------------|------------|-------------|---------------|
| Tab SSO | This sample shows SSO for Tab- search, action, linkunfurl. | Not available | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-sso/nodejs) | Not available |


## See also

* [Authentication flow in tabs](~/tabs/how-to/authentication/auth-flow-tab.md)
* [AAD authentication in tabs](~/tabs/how-to/authentication/auth-tab-AAD.md)
* [Silent authentication AAD](~/tabs/how-to/authentication/auth-silent-AAD.md)
* [Single Sign-on authentication in tabs](auth-aad-sso.md)