---
title: Overview to authentication using SSO in Teams with Azure AD
description: Learn about Single sign-on (SSO) authentication in Teams and how to enable it in bots and message extension.
ms.topic: conceptual
ms.localizationpriority: high
keywords: teams authentication bots message extension Microsoft Azure Active Directory (Azure AD) SSO access token app manifest 
---
# Enable SSO for bot app

<!--Single sign-on (SSO) allows a user to access an application or a web service after signing-in only once. The app users never have to go through authentication again.-->

With SSO in Teams, app users have the advantage of using Teams to access apps. After logging into Teams using Microsoft or Microsoft 365 account, app users can use your app without needing to sign in again. Your app is available to app users on any device with access granted through Azure AD.

Here's what you'll learn in this section:

1. **SSO user experience**: Teams offers your app users a true SSO experience. App users can use your app without signing in again.
2. **SSO in Teams at runtime**: Your tab app interacts with Azure AD at runtime for one-time authentication and authorization for your app users.
3. **Enable SSO for your tab app**: Implement the tasks involved to implement SSO in your tab app.

## SSO user experience in Teams

App users sign in to Teams using either personal Microsoft account or Microsoft 365 account. You can take advantage of this, and use SSO to authenticate and authorize the app users.

