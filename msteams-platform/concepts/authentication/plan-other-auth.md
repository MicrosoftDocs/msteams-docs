---
title: Authenticating using other authentication methods
description: Authentication in Teams apps using other authentication methods
ms.topic: conceptual
ms.localizationpriority: medium
keywords: teams authentication SSO Microsoft Azure Active Directory (Azure AD), OIDC, username, password
---
# Authenticate with third-party IdPs

You can choose to implement authentication in your Teams app using other IdPs for validating app users' identity.

## Teams silent authentication

Silent authentication is method provided in Teams environment. This is an old cookie-based authentication method. It isn't true SSO, but it seeks to provide the user experience that is close to SSO.

> [!NOTE]
> Teams does not recommend using this method any more in light of Teams SSO with Azure AD that is true SSO experience.

:::image type="content" source="../../assets/images/authentication/silent-auth.png" alt-text="Authenticating with silent authentication":::

1. The app requests the user credentials via Teams app from a trusted Identity Provider (IDP) (AAD, Partner organization, other IDPs, such as Google or Facebook).

1. The IDP requests the user for their credentials and shares it with the app in an ID token (cookie).

1. Teams Client refreshes this token (cookie) for the user. It uses a login hint (user's email address) for refreshing the token.

1. The user sees a popup that requires no intervention. It shows up while the cookie is refreshed.

The process informs the user that their token is refreshed, with no user input required to continue their ongoing session. It isn't true SSO as the user would still need to sign in on a different browser or device (new session).

## Authenticate using third-party IdPs

You can use third-party IdPs to implement authentication for your Teams app users. It can be Google or Facebook, or any other service that provides identity and access management. This method also uses tokens that are refreshed when expired, and the user may need to log in on different browsers or devices. This method is not a true SSO user experience.

Some prerequisites for implementing authentication with an IdP are:

- **Create a Teams app**: Your Teams app can have single or multiple capabilities, such as tabs, bots, messaging extensions, and more. Teams offers a different UI and UX experience for each feature.
- **Register your app with IdP**: Establish a trust relationship between your chosen IdP and your Teams app. The IdP will be able to authenticate all users registered with it.
- **Register users with IdP**: All valid app users are registered with the IdP. After first successful sign in, the user's ID token is refreshed for later user.

### Role of other IdPs in authentication

An IdP authenticates users identity for access your Teams app. This authentication is not true SSO. The IdP sends a token for a verified user in response to the request for authenticating user credentials sent by your Teams app. The Teams app uses the token to authenticate the user. However, the token is good only for a limited time. If the user attempts to access the Teams app after the token has expired, the Teams app uses the token and login hint shared in its initial request.

The user sees a pop up dialog when their token is refreshed and they are able to access the app again.

:::image type="content" source="../../assets/images/authentication/other-idp-auth.png" alt-text="Authenticating with other IdPs":::

| # | Steps | Key points |
|--- | --- | --- |
| 1 | A Teams app user attempts to log in for the first time. | - The user provides their credentials to the app. <br> - It may include the username and password of the user. |
| 2 | The Teams app leads the user to a sign-in page. It sends the user credentials to IdP for verification | - IdP receives the request to authenticate the user. <br> - This information may include user credentials along with details of the app that requested authentication. |
| 3 | The IdP verifies the user information. | - IdP matches the user credentials with its database. <br> - It verifies user access for the particular app. |
| 4 | On a successful match, the IdP sends an ID token granting app access to your Teams app. | - ID token may contain validated user credentials. <br> - The ID token of the authentication user is saved with the app. <br> - The ID token and the login hint is used to refresh the ID token. <br> - After the ID token is refreshed, the user is able to access the app. |
| 5 | If the user access the Teams app from a different browser or a different device, the authentication process is repeated. | - Your app redirects the user to continue with their selected IdP. <br> - The app requires the user to provide login credentials. <br> - Teams sends the credentials to the IdP and on successful verification, sends an ID token. |

### Other IdPs user experience

\ Include images for UX \

### Features of third-party IdPs

\ Add Introduction, details, and examples \

1. Security via ID token
1. Security of customer data
1. Personalized user experience
