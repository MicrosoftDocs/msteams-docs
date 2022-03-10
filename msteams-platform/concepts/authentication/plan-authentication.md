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

- Azure Active Directory Single Sign-on (AAD SSO)
- Other authentication methods:
  - Other IdPs, such as Google or Facebook
  - User's credentials (username and password)
- Common extension scenarios

:::image type="content" source="../../assets/images/authentication/idp-options.png" alt-text="IDP options":::
<br>

### Azure Active Directory Single Sign-on

Single sign-on is an authentication method that lets users sign in using one set of credentials to access multiple independent software systems. Using SSO means a user doesn't have to sign in to every application they use within the system. They can access all needed applications without being required to authenticate using different credentials.

Azure Active Directory Single Sign-On (AAD SSO) automatically signs users in. Users don't need to type in their credentials to sign in to Azure AD. This feature provides your users easy access to your cloud-based applications without needing any additional on-premises components.

### Other authentication methods

Teams supports other authentication methods that you can choose based on your app's security requirement.

- **Username and password authentication**: The simplest authentication method to validate users is by verifying their login credentials. Your system matches the user's password with their username and authenticates the user for app access.  
- **Other identity providers**: You can use a third-party Identity Provider (IdP) to authenticate your app users. The user is registered with an identity provider, which has a trust relationship with your app. When the user attempts to log in, the identity provider validates the user credentials and profile.
- **IdP + SSO**: For an enhanced user experience, you can use an IDP to authenticate your users. In this case, the IDP works with SSO provider, such as AAD, and provides a single sign-on experience to the authenticated user.

### Common extension scenarios

/ Add content /

### Comparison of authentication methods

| &nbsp; | AAD | Other IdPs | Username + Password |
| --- | --- | --- | --- |
| **Frequency of logging in** | User logs in once for all. | User may need to log in on a different device. | User needs to log in for every use. |
| **Number of passwords** | Only one password needed. | Multiple password may be used. | Multiple passwords are needed and the user needs to keep track of them. |
| **Cost of authentication** | Low cost as the user password is set only once | -- | High cost as user password is managed and maintained by the organization |
| **Security** | -- | -- | -- |

## Planning authentication for different app types

Your app can be distributed as a Teams client app, web app, mobile app, or across all platforms. Plan for authentication for all the ways that you plan to distribute your app.

- Desktop app accessible from within Teams Client.
- Teams web app
- Teams mobile app

\ Add content \

## Common authentication terms

Within Teams, there are multiple ways you can implement authentication. Here's an introduction to key terms that you'll come across:

- Identity Provider (IDP): \add details for IDP\
- SSO: Single sign-on lets your app users log into the app only once using their credentials. It offers access to all associated apps or websites without having to validate repeatedly.
- OIDC: Open ID Connect (OIDC) is an authentication protocol used to validate a user. Third-party applications can use it to verify the user's identity and access their profile information.
- ID tokens: An ID token is granted to a user who has been verified successfully. It's used to cache user profile information and provide it to a client application when a user requests access.
- Authorization: It's a process to provide resource-specific access to an authenticated user based on their user profile.
- Oauth2.0: OAuth is a protocol that lets third party applications access secure resources without compromising the user’s information, such as password.  
- Access tokens: An access token is an artifact that contains security information of an application to access specific user information.  
- Graph API: \add details for Graph API and MS Graph\

## Next step

> [!div class="nextstepaction"]
> [Azure Active Directory Single Sign-on](plan-aad-sso.md)
