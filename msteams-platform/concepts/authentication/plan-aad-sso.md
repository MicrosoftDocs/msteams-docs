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

## Case for AAD SSO

Let's look at an app scenario to understand the benefits and implementation of AAD SSO authentication in an app.

**App scenario**:
ABC organization wants to build a Teams app for sharing its Sales Dashboard content with its global Sales and Marketing team and Finance team.

Here's a list of app requirements:

- Collect its sales data from company's database.
- Create Dashboard with charts and tables.
- Make the Dashboard app available within organization to valid users from a different department also.
- Distribute the app as desktop app for local users, web app for global users, and mobile app for access on-the-go.

In the next sections, let's see how AAD SSO can help with user authentication and access to all subsystems within the organization, in addition to Azure resources.

## Prerequisites

Before you can use AAD SSO to authenticate your app users, ensure that:

- Register your app with AAD.
- All valid app users are registered with AAD.
- Any other prerequisites.

## Role of AAD SSO in authentication

AAD is the main identity provider (IdP) for validating access to Azure-based systems and applications.

<br>

:::image type="content" source="../../assets/images/authentication/aad-sso-process.png" alt-text="AAD SSO process":::

\ Include an info-graphic to show the AAD SSO flow and description \

<br>
The AAD SSO process used in a Teams app for the first user login:

| # | Steps | Key points |
|--- | --- | --- |
| 1 | Teams app user attempts to log in | \ Add information relevant to this step that a partner should know while planning \ |
| 2 | Teams app sends the user credentials (username and password) to AAD for verification | -- |
| 3 | AAD matches the user information with its database | -- |
| 4 | On a successful match, AAD sends an ID token granting app access to the valid user | -- |
| 5 | The user can now access all services and application in the Azure system | -- |

## AAD SSO user experience

\ Include images for AAD SSO UX \
\ UX for all Teams capabilities: tabs, bots, messaging extensions, link unfurling \

## Advantages of using AAD SSO

\ Add Introduction, details, and examples \

1. True Single sign-on: AAD SSO offers true SSO experience for your Teams app users. Once the user has logged in successfully to your app, they don't have to log in again at all.
1. Security via ID token:
1. Access for all applications within the systems: If a Teams app user attempts to access a new service or a subsystem in the Azure system, they can access it without any further need for logging in. The users can access all Azure-based services and systems. You can also customize the process for granting access. You can grant access to all services at the same time on the user's first successful log in. If you want, you can grant access to services and subsystem as needed by the user. This method is called staggered permissions.
1. Security of customer data
1. Personalized user experience
