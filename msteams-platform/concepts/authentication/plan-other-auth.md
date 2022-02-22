---
title: Authenticating using other authentication methods
description: Authentication in Teams apps using other authentication methods
ms.topic: conceptual
ms.localizationpriority: medium
keywords: teams authentication SSO Microsoft Azure Active Directory (Azure AD), OIDC, username, password
---
# Authentication using other methods

You can choose to implement authentication in your Teams app using methods, such as OIDC, and username and password.

In this page, you'll learn:

- Using OIDC
- Using username and password
- Using OIDC or username and password with AAD SSO

## Role of OIDC in authentication

\Include an info-graphic and description \

The workflow used in a Teams app:

1. The app request the user credentials via Teams from a trusted Identity Provider (IDP) (AAD, Partner organization, other IDPs, such as Google or Facebook).

1. The IDP requests the user for their credentials and shares it with the app in an ID token.

The user is authenticated with the ID token.

### OIDC user experience

\ Include images for OIDC UX \

### Benefits of OIDC

\ Add Introduction, details, and examples \

1. Security via ID token
1. Security of customer data
1. Personalized user experience

## Username and password for authentication

\ Add introduction and description \

### Username and password user experience

\ Include images for UX \

### Benefits of username and password authentication

1. Security for user access
1. Security for user data
