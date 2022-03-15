---
title: Authenticating with AAD SSO for Teams
description: Authentication in Teams apps using AAD SSO
ms.topic: conceptual
ms.localizationpriority: medium
keywords: teams authentication SSO Microsoft Azure Active Directory (Azure AD), OIDC, username, password
---
# Authenticate with AAD SSO

Azure Active Directory (Azure AD) is a cloud-based identity and access management service. It helps your app users access external resources, such as Microsoft 365, the Azure portal, and thousands of other SaaS applications. Your users can also access internal resources, such as apps on your corporate network and intranet, along with any cloud apps from your own organization.

Use Azure AD as a standards-based approach for adding single sign-on (SSO) to your app. SSO is an authentication method that lets users sign in using one set of credentials to multiple independent software systems. Using SSO means a user doesn't have to sign in to every application they use. With SSO, users can access all needed applications without being required to authenticate using different credentials.

## AAD SSO for Teams

You can use AAD SSO to implement authentication for your Teams app users. When you register your Teams app with AAD, it becomes the main identity provider (IdP) for validating access to Azure-based systems and applications.

Some prerequisites for implementing authentication with AAD SSO are:

- **Create a Teams app**: Your Teams app can have single or multiple capabilities, such as tabs, bots, messaging extensions, and more. Teams offers a different UI and UX experience for each feature. It makes your Teams app fully compatible with AAD SSO functionality irrespective of its features.
- **Register your app with AAD**: Establish a trust relationship between AAD and your Teams app. AAD serves as an IdP for your app users and will be able to authenticate them. To register your app, provide app ID, configure access permissions, and define scope for user access on the Azure portal.
- **Register users with AAD**: All valid app users are registered with AAD. Users registered with AAD will get authenticated. After first successful sign in, they don't need to log in again. They can access all Azure resources and subsystems.

## Role of ADD SSO as IdP

Implementing AAD SSO for authentication in your app means that AAD would serve as an IdP for your app users. All users registered with AAD can now be validated for app usage and access all resources they require.

:::image type="content" source="../../assets/images/authentication/aad-sso-process.png" alt-text="AAD SSO":::

| # | Steps | Key points |
|--- | --- | --- |
| 1 | A Teams app user attempts to log in for the first time. | - The user provides their credentials to the app. <br> - It may include the username and password of the user. |
| 2 | The Teams app leads the user to a sign-in page. It sends the user credentials to AAD for verification | - AAD receives the request to authenticate the user. <br> - This information may include user credentials along with details of the app that requested authentication. |
| 3 | AAD serves as an IdP and verifies the user information. | - AAD matches the user credentials with its database. <br> - It verifies user access for the particular app. |
| 4 | On a successful match, AAD sends an ID token granting app access to your Teams app. | - ID token may contain validated user credentials. <br> - The ID token of the authentication user is saved with the app. <br> - The ID token is used to let the user access at subsequent log ins. |
| 5 | Every time the user accesses any part of your app or any other resource, the IdP uses the ID token to authenticate the user. The user is given access once and for all. | - Your app uses the ID token generated the first time that the user was authenticated. <br> - Your app user can now access all services and application in the Azure system. |

## Features of using AAD SSO for Teams

Implementing authentication with AAD SSO in your Teams app lets you solve security, development, and cost concerns of your app.

- **Security**: The app users never have to sign in again after they log in for the first time. Your Teams app can have any capability, such as tabs, bots, or messaging extensions. AAD SSO authentication ensures a one-time sign-in for not just your Teams app, but all internal and external resources as needed.

- **App development**: Building an app with AAD SSO authentication follows a simple development process.

- **Managing passwords**: As an app owner, your overhead to maintain usernames and passwords, and protecting user privacy and data is considerably reduced.

- **Conditional access policies**: Use conditional access policies to let yor users enjoy device-specific access to join a domain.

- **Available for all app types**: Your Teams app may be available to your users on desktop, web, or mobile device. AAD SSO makes it easier for your users to avail the benefits of SSO. After their first sign-in, they never need to sign in again on any other browser or device.

- **Personalized user experience**: App users often use the same set of apps and resources. When AAD manages your user's identity, each user can have a personalized experience based for their commonly used apps.
