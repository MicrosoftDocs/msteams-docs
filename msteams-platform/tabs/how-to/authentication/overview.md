---
title: Authenticate tabs
description: Describes how to authenticate tabs
ms.topic: conceptual
localization_priority: Normal
keywords: teams authentication OAuth SSO AAD
---
# Authenticate tabs

Teams establishes a trusted connection with providers, to access data from services, for example: Facebook and Twitter and also to access user information protected by Azure Active Directory (AAD). Use the web-based authentication flow for tabs.

 > [!NOTE]
 > Microsoft Graph APIs help authenticate the user to retrieve the appropriate authentication tokens.
 > Web-based authentication on mobile clients requires Teams JavaScript client SDK version 1.4.1 or later.

## Web-based authentication flow

Use the web-based authentication flow for [tabs](~/tabs/what-are-tabs.md). Use the [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client) in a web content page to enable authentication. After enabling authentication, embed the [content page](~/tabs/how-to/create-tab-pages/content-page.md) in a tab, a configuration page, or a task module. For more information on web-based authentication flow, see:

## Code sample

The following table lists bot authentication v3 SDK code samples:

| **Sample name** | **Description** | **.NET** | **Node.js** | **Python** |
|---------------|------------|------------|-------------|---------------|
| Tab SSO | This sample shows SSO for Tab- search, action, linkunfurl. | Not available | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-sso/nodejs) | Not available |


## See also

* [Authentication flow in tabs](~/tabs/how-to/authentication/auth-flow-tab.md)
* [AAD authentication in tabs](~/tabs/how-to/authentication/auth-tab-AAD.md)
* [Silent authentication AAD](~/tabs/how-to/authentication/auth-silent-AAD.md)

