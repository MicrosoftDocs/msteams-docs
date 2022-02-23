---
title: Authenticating with AAD SSO
description: Authentication in Teams apps using AAD SSO
ms.topic: conceptual
ms.localizationpriority: medium
keywords: teams authentication SSO Microsoft Azure Active Directory (Azure AD), OIDC, username, password
---
# Authentication with AAD SSO

Many applications exist in Azure AD that you can access using SSO. You have several options for SSO depending on the needs of the application and how it's implemented. Take time to plan your SSO deployment before you create applications in Azure AD. The management of applications can be made easier by using the My Apps portal.

In this page, you'll learn about:

- Role of AAD SSO in authentication
- AAD SSO user experience
- Advantages of using AAD SSO
- Teams silent authentication

\ Add description: Teams SSO/Silent authentication and True SSO \

## Role of AAD SSO in authentication

\Include an info-graphic to show the AAD SSO flow and description \

The AAD SSO workflow used in a Teams app for the first user login:

1. The app requests the user credentials via Teams from a trusted Identity Provider (IDP) (AAD, Partner organization, other IDPs, such as Google or Facebook).

1. The IDP requests the user for their credentials and shares it with the app in an ID token.

1. Teams Client stores this ID token.

The user never needs to sign in again.

## AAD SSO user experience

\ Include images for AAD SSO UX \
\ UX for all Teams capabilities: tabs, bots, messaging extensions, link unfurling \

## Advantages of using AAD SSO

\ Add Introduction, details, and examples \

1. True Single sign-on
1. Security via ID token
1. Access for all applications within the systems
1. Security of customer data
1. Personalized user experience

## Teams silent authentication

\ Add info-graphic showing authentication flow and description \
