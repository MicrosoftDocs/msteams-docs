---
title: Authentication Overview
description: Authentication in Teams apps using AAD SSO, OIDC, ID tokens
ms.topic: conceptual
ms.localizationpriority: medium
keywords: teams authentication OAuth SSO Microsoft Azure Active Directory (Azure AD)
---
# Plan for authentication

Planning for implementing authentication is as important as for app's features and functionalities.

In a Teams app, you can plan to build authentication using one of the following methods:

- Single sign-on (SSO)
- OpenID Connect (OIDC)
- Username and password

## Single sign-on authentication

Single sign-on is an authentication method that lets users sign in using one set of credentials to access multiple independent software systems. Using SSO means a user doesn't have to sign in to every application they use within the system. They can access all needed applications without being required to authenticate using different credentials.

\ Add description and infographic \
\ Add information about AAD SSO/Teams SSO/True SSO \

## OpenID Connect authentication

OIDC is used to authentication user access by using ID tokens from authorized Identity Providers (IDP).

\ Add description and infographic \
\ Add information about using ID tokens for silent authentication, Authenticate a user in a Microsoft Teams tab \

## Username and password authentication

You can choose to use username and password combination to authenticate your app users.

\ Add description and infographic \
\ Add information about Partner/ISV sign in credentials-based authentication \
