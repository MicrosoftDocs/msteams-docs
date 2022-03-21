---
title: Authenticating with Azure AD SSO
description: Authentication in Teams apps using SSO
ms.topic: conceptual
ms.localizationpriority: medium
keywords: teams authentication SSO Microsoft Azure Active Directory (Azure AD), OIDC, username, password
---
# Authenticate with Teams assisted SSO with Azure AD

Azure Active Directory (Azure AD) is a cloud-based identity and access management service. It helps your app users access external resources, such as Microsoft 365, the Azure portal, and thousands of other SaaS applications. Your users can also access internal resources, such as apps on your corporate network and intranet, along with any cloud apps from your own organization.

Use Azure AD as a standards-based approach for adding single sign-on (SSO) to your Teams app. SSO is an authentication method that lets users sign in using one set of credentials to access and use multiple apps. Using SSO for Teams means a user doesn't have to sign in to the app at all. Users can access all needed applications without being required to authenticate using different credentials.

## Prerequisites for Teams assisted SSO with Azure AD

Some prerequisites for implementing authentication with Teams assisted SSO with Azure AD are:

- **Create a Teams app**: Your Teams app can have single or multiple capabilities, such as tabs, bots, messaging extensions, and more. Teams offers a different UI and UX experience for each feature.
- **Register your app with Azure AD**: Establish a trust relationship between Azure AD and your Teams app. Azure AD serves as an IdP for your app users and will be able to authenticate them. To register your app, provide app ID, configure access permissions, and define scope for user access on the Azure portal.
- **Register users with Azure AD**: All valid app users are registered with Azure AD. Users registered with Azure AD will get authenticated. After first successful sign in, they don't need to log in again. They can access all Azure resources and subsystems.

## Teams assisted SSO with Azure AD user experience

\ Add UI/UX for Teams assisted SSO with Azure AD \

## Role of Azure AD in authentication

Azure AD is the main identity provider (IdP) for validating access to Azure-based systems and applications.

<br>

:::image type="content" source="../../assets/images/authentication/aad-sso-process.png" alt-text="AAD SSO process":::

| # | Steps | Key points |
|--- | --- | --- |
| 1 | A Teams app user attempts to log in | - The user provides their credentials to the app. <br> - It may include the username and password of the user. |
| 2 | Teams app sends the user credentials to AAD for verification | - AAD receives the request to authenticate the user. <br> - This information may include user credentials along with details of the app that requested authentication. |
| 3 | AAD verifies the user information. | - AAD matches the user credentials with its database. <br> - It verifies user access for the particular app. |
| 4 | On a successful match, AAD sends an ID token granting app access to your Teams app. | - ID token may contain validated user credentials. <br> - The ID token of the authentication user is saved with the app. <br> - The ID token is used to let the user access at subsequent log ins. |
| 5 | The user is given access once and for all. | - Your app uses the ID token generated the first time that the user was authenticated. <br> - Your app user can now access all services and application in the Azure system. |

## Features of Teams assisted SSO with Azure AD

Here's a look at features Teams assisted SSO with Azure AD authentication method:

:::image type="content" source="../../assets/images/authentication/teams-sso-story/teams-sso-features.png" alt-text="SSO for Teams features ":::

| # | Feature | What it means for you |
| --- | --- | --- |
| 1. | Single sign-on | The user needs to log into the app only once.  |
| 2. | Single identity | &nbsp; |
| 3. | Secure user access | &nbsp; |
| 4. | Secure user data | &nbsp; |
| 5. | Customized user experience | &nbsp; |
| 6. | Administrative and overhead costs | &nbsp; |
