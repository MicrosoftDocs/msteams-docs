---
title: Authenticating using other authentication methods
description: Authentication in Teams apps using other authentication methods
ms.topic: conceptual
ms.localizationpriority: medium
keywords: teams authentication SSO Microsoft Azure Active Directory (Azure AD), OIDC, username, password
---
# Authentication using other methods

You can choose to implement authentication in your Teams app using methods, such as OIDC, and username and password.

In this page, you'll learn:

- Using other Third-party authentication
- Using username and password

## Authenticate using third-party IdPs

You can use third-party IdPs to implement authentication for your Teams app users. It can be Google or Facebook, or any other service that provides identity and access management.

Some prerequisites for implementing authentication with an IdP are:

- **Create a Teams app**: Your Teams app can have single or multiple capabilities, such as tabs, bots, messaging extensions, and more. Teams offers a different UI and UX experience for each feature.
- **Register your app with IdP**: Establish a trust relationship between your chosen IdP and your Teams app. The IdP will be able to authenticate all users registered with it.
- **Register users with IdP**: All valid app users are registered with the IdP. After first successful sign in, the user's ID token is refreshed for later user.

### Role of other IdPs in authentication

An IdP authenticates users identity for access your Teams app. This authentication is not true SSO. The IdP sends a token for a verified user in response to the request for authenticating user credentials sent by your Teams app. The Teams app uses the token to authenticate the user. However, the token is good only for a limited time. If the user attempts to access the Teams app after the token has expired, the Teams app uses the token and login hint shared in its initial request.

The user sees a pop up dialog when their token is refreshed and they are able to access the app again.

:::image type="content" source="../../assets/images/authentication/other-idp-process.png" alt-text="Authenticating with other IdPs":::

| # | Steps | Key points |
|--- | --- | --- |
| 1 | A Teams app user attempts to log in for the first time. | - The user provides their credentials to the app. <br> - It may include the username and password of the user. |
| 2 | The Teams app leads the user to a sign-in page. It sends the user credentials to IdP for verification | - IdP receives the request to authenticate the user. <br> - This information may include user credentials along with details of the app that requested authentication. |
| 3 | The IdP verifies the user information. | - IdP matches the user credentials with its database. <br> - It verifies user access for the particular app. |
| 4 | On a successful match, the IdP sends an ID token granting app access to your Teams app. | - ID token may contain validated user credentials. <br> - The ID token of the authentication user is saved with the app. <br> - The ID token and the login hint is used to refresh the ID token. <br> - After the ID token is refreshed, the user is able to access the app. |
| 5 | If the user access the Teams app from a different browser or a different device, the authentication process is repeated. | - Your app redirects the user to continue with their selected IdP. <br> - The app requires the user to provide login credentials. <br> - Teams sends the credentials to the IdP and on successful verification, sends an ID token. |

### Other IdPs user experience

\ Include images for OIDC UX \

### Features of third-party IdPs

\ Add Introduction, details, and examples \

1. Security via ID token
1. Security of customer data
1. Personalized user experience

## Username and password for authentication

Username and password are the simplest form of user authentication. The user is required to enter login credentials every time they attempt to access the Teams app. If a user needs to access multiple apps or services, they need to keep track of and maintain multiple usernames and passwords.

Some prerequisites for implementing authentication with user credentials are:

- **Create a Teams app**: Your Teams app can have single or multiple capabilities, such as tabs, bots, messaging extensions, and more. Teams offers a different UI and UX experience for each feature.
- **Create user accounts**: Your organization creates user accounts for each app user and maintains their username and password. This information is used to validate user access to your app.

:::image type="content" source="../../assets/images/authentication/user-credentials.png" alt-text="Authentication with user credentials":::

| # | Steps | Key points |
|--- | --- | --- |
| 1 | A Teams app user attempts to access the Teams app. | - The user provides their credentials to the app. <br> - It may include the username and password of the user. |
| 2 | The Teams app verifies the user credentials against the user details.  | - The Teams app receives user credentials and verifies it against user information in the organization's database. <br> - This information may include user credentials along with details of the app that requested authentication. |
| 3 | On a successful match, the user is granted app access to your Teams app. | - The access is valid only for the current session. <br> - If the user access the Teams app again, the authentication process is repeated. |

### Username and password user experience

\ Include images for UX \

### Features of username and password authentication

1. Security for user access
1. Security for user data
