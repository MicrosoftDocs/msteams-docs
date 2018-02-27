---
title: Authenticate a user
description: Describes authentication in Teams and how to use it in your apps
keywords: teams authentication OAuth SSO AAD
ms.date: 02//226018
---
# Authentication in Teams

In order for your app to access user information stored in Azure Active Directory, as well as access data from other services like Facebook and Twitter, your app will have to establish a trusted connection with those providers. The [Microsoft Teams JavaScript client SDK](https://docs.microsoft.com/en-us/javascript/api/overview/msteams-client) supports this in a way that allows your apps to work both in the web and desktop versions of Teams. (Currently, app authentication from iOS and Android is somewhat different, but much of what's described here does, or soon will, work on mobile devices as well.)

For more information see the following topics:

* [Authentication in tabs (AAD)](~/concepts/authentication/auth-tab) describes how to connect to Azure Active Directory from within a *tab* in your app in Teams. This shows a typical web based authentication flow.
* [Authentication flow in bots (AAD)](~/concepts/authentication/auth-flow) describes how authentication works within a *bot* in your app in Teams. This shows a non-web based authentication flow useful for bots or for mobile.
* [Silent authentication (AAD)](~/concepts/authentication/auth-silent) describes how to implement single sign on in your app using Azure Active Directory.

For sample code showing the authentication process:

* [Microsoft Teams Authentication Sample](https://github.com/OfficeDev/microsoft-teams-sample-auth-node)
* [Teams Complete Sample for Node.js](https://github.com/OfficeDev/microsoft-teams-sample-complete-node)
* [Teams Complete Sample for C#](https://github.com/OfficeDev/microsoft-teams-sample-complete-csharp)
