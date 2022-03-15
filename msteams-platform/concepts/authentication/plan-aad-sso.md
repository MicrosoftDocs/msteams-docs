---
title: Authenticating with AAD SSO for Teams
description: Authentication in Teams apps using AAD SSO
ms.topic: conceptual
ms.localizationpriority: medium
keywords: teams authentication SSO Microsoft Azure Active Directory (Azure AD), OIDC, username, password
---
# Authenticate with SSO for Teams app

<!--Azure Active Directory (Azure AD) is a cloud-based identity and access management service. It helps your app users access external resources, such as Microsoft 365, the Azure portal, and thousands of other SaaS applications. Your users can also access internal resources, such as apps on your corporate network and intranet, along with any cloud apps from your own organization.-->

Use Azure AD as a standards-based approach for adding single sign-on (SSO) to your Teams app. SSO is an authentication method that lets users sign in using one set of credentials to access and use multiple apps. Using SSO for Teams means a user doesn't have to sign in to the app at all. Users can access all needed applications without being required to authenticate using different credentials.

## SSO for Teams

You can use AAD SSO to implement authentication for your Teams app users. When you register your Teams app with AAD, it becomes the main identity provider (IdP) for validating access to Azure-based systems and applications.

Some prerequisites for implementing authentication with AAD SSO are:

- **Create a Teams app**: Your Teams app can have single or multiple capabilities, such as tabs, bots, messaging extensions, and more. Teams offers a different UI and UX experience for each feature. It makes your Teams app fully compatible with AAD SSO functionality irrespective of its features.
- **Register your app with AAD**: Establish a trust relationship between AAD and your Teams app. AAD serves as an IdP for your app users and will be able to authenticate them. To register your app, provide app ID, configure access permissions, and define scope for user access on the Azure portal.
- **Register users with AAD**: All valid app users are registered with AAD. Users registered with AAD will get authenticated. After first successful sign in, they don't need to log in again. They can access all Azure resources and subsystems.

## Role of AAD as IdP

Implementing AAD SSO for authentication in your app means that AAD would serve as an IdP for your app users. All users registered with AAD can now be validated for app usage and access all resources they require.

:::image type="content" source="../../assets/images/authentication/aad-sso-process.png" alt-text="SSO for Teams":::

| # | Steps | Key points |
|--- | --- | --- |
| 1 | A Teams app user attempts to use the app for the first time. | <!-- The user provides their credentials to the app. <br> - It may include the username and password of the user.--> |
| 2 | Teams seeks the consent of the user to use their Teams login credentials  | - AAD receives the request to authenticate the user. <br> - This information may include user credentials along with details of the app that requested authentication. |
| 3 | AAD serves as an IdP and verifies the user information. | - AAD matches the user credentials with its database. <br> - It verifies user access for the particular app. |
| 4 | On a successful match, AAD sends an access token granting app access to your Teams app. | - Access token may contain validated user credentials. <br> - The access token of the authentication user is saved with the app. <br> - The access token is used to let the user access at subsequent log ins. |
| 5 | Every time the user accesses any part of your app or any other resource, the IdP uses the access token to authenticate the user. The user is given access once and for all. | - Your app uses the access token generated the first time that the user was authenticated. <br> - Your app user can now access all services and application in the Azure system. |

## Features of using SSO for Teams

Implementing authentication with SSO for Teams lets you solve security, development, and cost concerns of your app.

- **Security**: The app users never have to sign in. Your Teams app can have any capability, such as tabs, bots, or messaging extensions. SSO for Teams authentication ensures a one-time sign-in for not just your Teams app, but all internal and external resources as needed.

- **App development**: Building an app with SSO for Team follows a simple development process.

- **Managing passwords**: As an app owner, your overhead to maintain usernames and passwords, and protecting user privacy and data is considerably reduced.

- **Conditional access policies**: Use conditional access policies to let yor users enjoy device-specific access to join a domain.

- **Available for all app types**: Your Teams app may be available to your users on desktop, web, or mobile device. SSO for Teams makes it easier for your users to avail the benefits of SSO. After their Teams sign-in, they never need to sign in again on any other browser or device.

- **Personalized user experience**: App users often use the same set of apps and resources. When AAD manages your user's identity, each user can have a personalized experience based for their commonly used apps.
