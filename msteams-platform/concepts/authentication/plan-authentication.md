---
title: Authentication in Teams
description: Overview of authentication in Teams apps
ms.topic: conceptual
ms.localizationpriority: medium
keywords: teams authentication OAuth SSO Microsoft Azure Active Directory (Azure AD)
---
# Authentication in Teams

An app may exist in a public or organizational domain or as a personal app. In any scenario, authentication can be a vital part of its framework. You must identify early on if you need to protect the services you're offering and at what level. The web services exposed in your Teams app are publicly available over the internet. So, if you need to secure them start thinking about it before you start building your app.

For example, if your app requires you to provide guest access for external users, access restrictions and permissions need to be placed to protect confidential information.

Therefore, ask questions, such as:

- Will the users access different views of data based on their roles?
- Will the interactions also be based on the user roles?
- Will external users access the app?

This module covers:

- Authentication advantages and benefits.
- Types of authentication methods.
- Introduction to Azure Active Directory (AAD) Single sign-on (SSO), and other authentication methods.
- Features of authentication methods and their user experience.
- Introduction to common extension scenarios.

## What is authentication?

Authentication is all about validating the identity of your app users. It's one of the ways you secure your app and app users against unwarranted access.

You can validate app users in several ways, such as using login credentials, ID tokens, access tokens, and more. Identity Provider (IdP) is a key player in the process of authentication. An app and its users must be registered with the same IdP to facilitate verification of user identity. Azure Active Directory, Google, and Facebook are commonly used for their IdP services.

### Considerations for planning authentication

You can use an authentication method suitable for your app to validate the credentials of the user who is attempting to access your app and its resources. Plan for authentication to optimize your app.

1. User data security: Authentication is key to the security design of your app. This process lets you verify if the user is who they claim to be. Validating user access for your app is a first step for providing necessary authorization to the user as well.

1. App data security: The Authentication process focuses on building security for app data. It protects the system from unauthorized access and often stops any security issue at the onset. It lets your app users share  information safely. By using authentication, you can also secure your app users' data.

1. User experience: Building a personalized user experience is an additional benefit of authentication. For example, with Single sign-on, the user does not need to log in every time they access your application.

1. Compatible with standards: Ensure that the authentication method you choose offers you the best options for your particular app requirements.

1. Distribution of app: Desktop app, web app, mobile app

1. App users: Within organization or on Teams store

## Authentication methods

Planning for implementing authentication is as important as for app's features and functionalities.

You can implement authentication in a Teams app using Microsoft Graph APIs or web-based authentication. It's recommended that you plan for using authentication early. Depending on the type of app you create, or integrate an existing app with Teams, you can choose a suitable authorization method.

In a Teams app based on the IdP, you can choose to authenticate users with:

- Teams SSO with Azure AD
- Teams assisted SSO with Azure AD
- Other authentication methods:
  - Silent authentication
  - Third-party IdPs, such as Google or Facebook
- Common extension scenarios

:::image type="content" source="../../assets/images/authentication/auth-options.png" alt-text="IDP options":::
<br>

### Teams Single sign-on (SSO) with Azure AD

Teams SSO with Azure AD is an authentication method that uses a user's Teams sign-in credentials to provide them for accessing your app. A user who has logged into Teams doesn't need to log in again to your app within the Teams environment. With only a consent required from the user, the Teams app retrieves access details for them from Azure Active Directory (AD).

### Other authentication methods

Teams supports other authentication methods that you can choose based on your app's security requirement.

- **Teams assisted SSO with Azure AD**: Azure Active Directory Single Sign-On (AAD SSO) automatically signs users in. Users don't need to type in their credentials to sign in to Azure AD. This feature provides your users easy access to your cloud-based applications without needing any additional on-premises components.  
- **Other identity providers**: You can use a third-party Identity Provider (IdP) to authenticate your app users. The user is registered with an identity provider, which has a trust relationship with your app. When the user attempts to log in, the identity provider validates the user credentials and profile.
- **IdP + SSO**: For an enhanced user experience, you can use an IDP to authenticate your users. In this case, the IDP works with SSO provider, such as AAD, and provides a single sign-on experience to the authenticated user.

### Common extension scenarios

/ Add content /


## Common authentication terms

Within Teams, there are multiple ways you can implement authentication. Here's an introduction to key terms that you'll come across:

- Identity Provider (IDP): \add details for IDP\
- SSO: Single sign-on lets your app users log into the app only once using their credentials. It offers access to all associated apps or websites without having to validate repeatedly.
- Third-party authentication: A Teams app can use third-party IdPs, such as Google or Facebook. 
- Graph API: \add details for Graph API and MS Graph\

**Protocols**:

- OIDC: Open ID Connect (OIDC) is an authentication protocol used to validate a user. Third-party applications can use it to verify the user's identity and access their profile information.
- Oauth2.0: OAuth is a protocol that lets third party applications access secure resources without compromising the user’s information, such as password.

**Authentication tokens**:

- ID tokens: An ID token is granted to a user who has been verified successfully. It's used to cache user profile information and provide it to a client application when a user requests access.
- Access tokens: An access token is an artifact that contains security information of an application to access specific user information.  

## Next step

> [!div class="nextstepaction"]
> [Azure Active Directory Single Sign-on](plan-sso-teams.md)
