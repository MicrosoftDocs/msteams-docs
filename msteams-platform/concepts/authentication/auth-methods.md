---
title: Authentication methods in Teams
description: Authentication methods used in Teams apps
ms.topic: conceptual
ms.localizationpriority: medium
keywords: teams authentication OAuth SSO Microsoft Azure Active Directory (Azure AD)
---
# Authentication in Teams

You can implement authentication in a Teams app using Microsoft Graph APIs or web-based authentication. It's recommended that you plan for using authentication early. Depending on the type of app you create, or integrate an existing app with Teams, you can choose a suitable authorization method.

In a Teams app, authentication can be implemented in the following ways:

- AAD SSO
- Other authentication methods
- Common extension scenarios

## Azure Active Directory Single Sign-on

Azure Active Directory Single Sign-On (AAD SSO) automatically signs users in. Users don't need to type in their credentials to sign in to Azure AD. This feature provides your users easy access to your cloud-based applications without needing any additional on-premises components.

AAD SSO can be explicit SSO or silent SSO.

## Other authentication methods

Teams supports other authentication methods that you can choose based on your app's security requirement.

Other methods include:

- **Username and password authentication**: The simplest authentication method to validate users is by verifying their login credentials. Your system matches the user's password with their username and authenticates the user for app access.  
- **Identity provider**: You can use a third-party Identity Provider (IDP) to authenticate your app users. The user is registered with an identity provider, which has a trust relationship with your app. When the user attempts to log in, the identity provider validates the user credentials and profile. 
- **IDP + SSO**: For an enhanced user experience, you can use an IDP to authenticate your users. In this case, the IDP works with SSO provider, such as AAD, and provides a single sign-on experience to the authenticated user.
