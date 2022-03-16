---
title: Authenticating with Azure AD SSO for Teams
description: Authentication in Teams apps using SSO for Teams
ms.topic: conceptual
ms.localizationpriority: medium
keywords: teams authentication SSO Microsoft Azure Active Directory (Azure AD), OIDC, username, password
---
# Authenticate with SSO for Teams

<!--Azure Active Directory (Azure AD) is a cloud-based identity and access management service. It helps your app users access external resources, such as Microsoft 365, the Azure portal, and thousands of other SaaS applications. Your users can also access internal resources, such as apps on your corporate network and intranet, along with any cloud apps from your own organization.-->

You can let users access and use your Teams app without ever having to sign-in. Single sign-on (SSO) for Teams makes it possible for you.

SSO for Teams is an authentication method that uses a user's Teams sign-in credentials to validate them for accessing your app. A user who has logged into Teams doesn't need to log in again to your app within the Teams environment. With only a consent required from the user, the Teams app retrieves their identity and access details from Azure Active Directory (AD).

SSO for Teams is the recommended user authentication method for a Teams app. It's an enhanced process that doesn't lead the user to enter their credentials again, even on a different device or browser.

Take the advantage of SSO for Teams to validate your app users for desktop, web, or mobile device apps.

## Prerequisites for SSO for Teams

Some prerequisites for implementing authentication with SSO for Teams are:

- **Create a Teams app**: Your Teams app can have single or multiple capabilities, such as tabs, bots, messaging extensions, and more. Teams offers a different UI and UX experience for each feature.
- **Register your app with Azure AD**: Establish a trust relationship between Azure AD and your Teams app. Azure AD serves as an IdP for your app users and will be able to authenticate them. To register your app, provide app ID, configure access permissions, and define scope for user access on the Azure portal.
- **Register users with Azure AD**: All valid app users are registered with Azure AD. Users registered with Azure AD will get authenticated. After first successful sign in, they don't need to log in again. They can access all Azure resources and subsystems.

## SSO for Teams user experience

Let's explore the authentication experience of a user with Teams app that uses SSO for Teams.

:::image type="content" source="../../assets/images/authentication/teams-sso-story/teams-sso-ux.png" alt-text="SSO for Teams UX":::

The user goes through only a simple consent request.

1. A Teams user attempts to access your Teams app for the first time.

1. A message displays letting the user know that Teams is seeking more permissions to access the app.

1. A popup dialog requires the user to give Teams the consent to use their Teams login credentials to gain access to your app.

The user can access and use your Teams app with no further need of consenting or signing in.

## Role of Azure AD as IdP

Implementing SSO for Teams authentication in your app means that Azure AD would serve as an IdP for validating your app users. All users registered with Azure AD can now be validated for app usage and access all resources within Azure system.

Primarily, Teams app and Azure AD perform a token exchange.

:::image type="content" source="../../assets/images/authentication/teams-sso-story/sso-for-teams.png" alt-text="Role of AAD in SSO for Teams":::

1. When a user accesses your Teams app, the app tells Teams to obtain an access token for the user.
1. If the user is accessing your app for the first time, there's a request prompt for the user to provide their consent for using their credentials to authenticate them.
1. Teams performs a token exchange with Azure AD. It sends the ID token of the current user to Azure AD to request access. This request contains the user's login credentials (ID token) and the app ID of your app.
1. Azure AD verifies the ID token and sends an access token to the Teams application granting the identified user permissions to use the app.
1. Teams sends the access token to your app.
1. The Teams app extracts the required information, such as the user's email address, from the access token.

This token is used to let the user access and use the app. After this consent, the user can access the app without consenting or signing in ever again. For subsequent access, the user's access token is pre-fetched to improve your app's performance and load time.

## Features of SSO for Teams

Here's a look at features of SSO for Teams:

- **Security**: The app users never have to sign in. Your Teams app can have any capability, such as tabs, bots, or messaging extensions. SSO for Teams authentication ensures a one-time sign-in for not just your Teams app, but all internal and external resources as needed.

- **App development**: Building an app with SSO for Team follows a simple development process.

- **Managing passwords**: Your overhead to maintain usernames and passwords, and protecting user privacy and data is reduced.

- **Conditional access policies**: Use conditional access policies to let yor users enjoy device-specific access to join a domain.

- **Available for all app types**: Your Teams app may be available to your users on desktop, web, or mobile device. SSO for Teams makes it easier for your users to avail the benefits of SSO. After their Teams sign-in, they never need to sign in again on any other browser or device.

- **Personalized user experience**: App users often use the same set of apps and resources. When Azure AD manages your user's identity, each user can have a personalized experience based for their commonly used apps.
