---
title: Authenticate tabs
description: Describes how to authenticate tabs
ms.topic: conceptual
localization_priority: Normal
keywords: teams authentication OAuth SSO AAD
---
# Authenticate tabs

Teams establishes a trusted connection with providers to access data from services like Facebook, Twitter, and to access user information protected by Azure Active Directory (AAD).

The two different authentication flows for tabs in Teams are as follows:
* Web-based authentication flow for [tabs](~/tabs/what-are-tabs.md).
* Web-based authentication flow in a content page embedded in a tab.
  1. Use the [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client) in a web content page to enable authentication.
  1. After enabling authentication, embed the [content page](~/tabs/how-to/create-tab-pages/content-page.md) in a tab, a configuration page, or a task module.

## Prerequisites

  Here is a list of points to ensure before proceeding with authentication:
 * Web-based authentication on mobile clients requires Teams JavaScript client SDK version 1.4.1 or later.
   > [!NOTE]
   > Teams SDK launches separate window for authentication flow. Set the SameSite attribute to Lax. Teams desktop client or older versions of Chrome or Safari do not support SameSite=None.
 * A basic understanding of OAuth 2.0 is required to work with authentication in Teams.

## Authentication for tabs

To know more about tab authentication, see:

* [Authentication flow in tabs](~/tabs/how-to/authentication/auth-flow-tab.md) describes how tab authentication works in Teams. This section shows a typical web-based authentication flow used for tabs.
* [AAD authentication in tabs](~/tabs/how-to/authentication/auth-tab-AAD.md) describes how to connect to AAD from within a tab in the app in Teams.
* [Silent authentication AAD](~/tabs/how-to/authentication/auth-silent-AAD.md) describes how to reduce sign in or consent prompts in the app using AAD.
* [Single Sign-on authentication in tabs](auth-aad-sso.md) describes how to authorize Teams tab or task module on desktop or mobile client.

## See also

* [Authenticate bots](../../../bots/how-to/authentication/overview.md)
* [Authenticate messaging extensions](../../../messaging-extensions/how-to/overview.md)
