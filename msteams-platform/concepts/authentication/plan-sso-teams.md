---
title: Authenticating with SSO for Teams
description: Authentication in Teams apps using SSO for Teams
ms.topic: conceptual
ms.localizationpriority: medium
keywords: teams authentication SSO Microsoft Azure Active Directory (Azure AD), username, password
---
# Authenticate with Teams SSO with Azure AD

You can let users access and use your Teams app without ever having to sign-in. Teams Single sign-on (SSO) with Azure AD makes it possible for you.

Teams SSO with Azure AD is an authentication method that uses a user's Teams sign-in credentials to provide them app access. A user who has logged into Teams doesn't need to log in again to your app within the Teams environment. With only a consent required from the user, the Teams app retrieves access details for them from Azure Active Directory (AD).

| Teams SSO with Azure AD is the recommended user authentication method for a Teams app. It's an enhanced process that doesn't lead the user to enter their credentials, even on a different device or browser. |
|--- |

Take the advantage of Teams SSO with Azure AD to let your app users access and use your app on desktop, web, or mobile device.

## Prerequisites for Teams SSO with Azure AD

Some prerequisites for implementing authentication with Teams SSO with Azure AD are:

- **Create a Teams app**: Your Teams app can have single or multiple capabilities, such as tabs, bots, messaging extensions, and more. Teams offers a different UI and UX experience for each feature.
- **Register your app with Azure AD**: To register your app, provide app ID, configure access permissions, and define scope for user access on the Azure portal.
- **Register users with Azure AD**: All valid app users are registered with Azure AD. Users registered with Azure AD will get authenticated. After first successful sign in, they don't need to log in again. They can access all Azure resources and subsystems.

## Teams SSO with Azure AD user experience

Let's explore the authentication experience of a user with Teams app that uses Teams SSO with Azure AD.

:::image type="content" source="../../assets/images/authentication/teams-sso-story/teams-sso-ux.png" alt-text="SSO for Teams UX":::

The user goes through only a simple consent request.

1. A Teams user attempts to access your Teams app for the first time.

1. A message displays letting the user know that Teams is seeking more permissions to access the app.

1. A popup dialog requires the user to give Teams the consent to use their Teams login credentials to gain access to your app.

The user can access and use your Teams app with no further need of consenting or signing in.

## Role of Azure AD

Implementing Teams SSO with Azure AD authentication in your app means that Azure AD would provide an access token for the user currently logged into Teams. The Teams login credentials of the user provide the identity details to Azure AD.

Primarily, Teams app and Azure AD perform a token exchange.

:::image type="content" source="../../assets/images/authentication/teams-sso-story/sso-for-teams.png" alt-text="Role of AAD in SSO for Teams":::

1. When a user accesses your Teams app, the app tells Teams to obtain an access token for the user.
1. If the user is accessing your app for the first time, there's a request prompt for the user to provide their consent for using their credentials to authenticate them.
1. Teams performs a token exchange with Azure AD. It sends the details of the current user to Azure AD to request access. This request contains the user's login credentials and the app ID of your app.
1. As the user consents, Azure AD sends an access token to the Teams application granting the app permission to use the current user's credentials.
1. Teams sends the access token to your app.
1. The Teams app extracts the required information, such as the user's email address, from the access token.

This token is used to let the user access and use the app. After this consent, the user can access the app without consenting or signing in ever again. For subsequent access, the user's access token is pre-fetched to improve your app's performance and load time.

## Features of Teams SSO with Azure AD

You can build your applications with almost seamless authentication. The Teams app requires access token for the current user to let them use the app. The user just consents for the Teams tab app to use their credentials to get this access token from Azure AD.

Here's a look at features of Teams SSO with Azure AD:

- **True SSO UX**: After a Teams app obtains access token for a user, the user never has to consent or sign in to the app. They may be using the desktop, Teams web, or mobile device. This access token remains valid for the user. This is true SSO user experience.

- **Security**: The app users never have to sign in. Your Teams app can have any capability, such as tabs, bots, or messaging extensions. Teams SSO with Azure AD ensures a one-time sign-in for not just your Teams app, but all internal and external resources as needed.

- **Efficient app loading**: The Teams has pre-fetched access tokens for your app users. This translates to faster loading time. Especially with Teams tab app, the access token is obtained from Azure AD when the user clicks on the tab before it's completely loaded. When the app requests access token, it's already available with Teams.

- **App development**: Building an app with Teams SSO with Azure AD follows a simple development process. You can expect a more streamlined developer experience when building authentication into the app.

- **Teams store**: If you want to host your app on Teams store, it is recommended that you choose to implement authentication using Teams SSO with Azure AD.

- **Managing passwords**: Your overhead to maintain usernames and passwords, and protecting user privacy and data is reduced.

- **Conditional access policies**: Use conditional access policies to let yor users enjoy device-specific access to join a domain.

- **Available for all app types**: Your Teams app may be available to your users on desktop, web, or mobile device. Teams SSO with Azure AD makes it easier for your users to avail the benefits of SSO. After their Teams sign-in, they never need to sign in again on any other browser or device.

- **Personalized user experience**: App users often use the same set of apps and resources. When Azure AD manages your user's identity, each user can have a personalized experience based for their commonly used apps.

## Authentication flow for app capabilities

Your Teams app may have single or multiple capabilities. The authentication flow differs for each capability, and also for a multi-capability app.

This sections discusses the Teams SSO with Azure AD authentication flow for different app capabilities.

### Teams tab app

Here's what really happens at run time.

:::image type="content" source="../../assets/images/authentication/teams-sso-story/teams-sso-tabs.png" alt-text="Authentication flow for Teams tab app":::

1. In the tab, call `getAuthToken()` using the Teams JavaScript SDK. This tells Teams to obtain an auth token.
1. If this is the first time the current user has used your tab application, they will be prompted to consent.
1. Microsoft Teams requests a token for the tab application from the Azure AD endpoint for the current user.
1. Azure AD sends the tab application token back to Teams.
1. Microsoft Teams then sends the token back to the tab application.
1. JavaScript in the tab application can parse the token and extract the information it needs, such as the user's email address. <sup>*</sup>

<sup>*</sup> The tab app can optionally exchange the token server-side for further Graph permissions.

