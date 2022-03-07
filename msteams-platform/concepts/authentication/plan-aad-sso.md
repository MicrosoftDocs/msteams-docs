---
title: Authenticating with AAD SSO
description: Authentication in Teams apps using AAD SSO
ms.topic: conceptual
ms.localizationpriority: medium
keywords: teams authentication SSO Microsoft Azure Active Directory (Azure AD), OIDC, username, password
---
# AAD SSO in Teams

Many applications exist in Azure AD that you can access using SSO. You have several options for SSO depending on the needs of the application and how it's implemented. Take time to plan your SSO deployment before you create applications in Azure AD. The management of applications can be made easier by using the My Apps portal.

In this page, you'll learn about:

- Prerequisites for using AAD SSO
- Role of AAD SSO in authentication
- AAD SSO user experience
- Advantages of using AAD SSO

\ Add description: Teams SSO/Silent authentication and True SSO \

## Prerequisites

Before you can use AAD SSO to authenticate your app users, ensure that:

- Register your app with AAD.
- All valid app users are registered with AAD.
- Any other prerequisites.

## Role of AAD SSO in authentication

AAD is the main identity provider (IdP) for validating access to Azure-based systems and applications.

<br>
:::image type="content" source="../../assets/images/authentication/aad-sso-process.png" alt-text="AAD SSO process":::

\Include an info-graphic to show the AAD SSO flow and description \

<br>
The AAD SSO process used in a Teams app for the first user login:

| # | Steps | Key points |
|--- | --- | --- |
| 1 | Teams app user attempts to log in | \ Add information relevant to this step that a partner should know while planning \ |
| 2 | Teams app sends the user credentials (username and password) to AAD for verification | -- |
| 3 | AAD matches the user information with its database | -- |
| 4 | On a successful match, AAD sends an ID token granting app access to the valid user | -- |
| 5 | The user can now access all services and application in the Azure system | -- |
|

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
