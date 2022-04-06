---
title: Acquire token for MS Graph
description: Describes acquiring token for MS Graph
ms.topic: how-to
ms.localizationpriority: medium
keywords: teams authentication tabs Microsoft Azure Active Directory (Azure AD) Graph API
---
# Acquire token for MS Graph

If you want to acquire access token for Microsoft Graph, you can do so by using Azure AD [on-behalf-of flow](/azure/active-directory/develop/v1-oauth2-on-behalf-of-flow).

Our current implementation for SSO only grants consent for user-level permissions that are not usable for making Graph calls. To get the permissions (scopes) needed to make a Graph call, SSO solutions must implement a custom web service to exchange the token received from the Teams JavaScript SDK for a token that includes the needed scopes.

For more information, please see [Get access for MS Graph](/graph/auth-v2-user).

\ Verify cross-reference to MS Graph pages - existing pages that have information regarding acquiring token. \