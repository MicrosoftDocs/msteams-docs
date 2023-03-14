---
title: Enable authentication using third-party OAuth provider
description: Learn about Teams authentication flow in tabs using third-party OAuth provider with Azure AD configuration and code samples.
ms.topic: conceptual
ms.localizationpriority: high
---
# Enable authentication using third-party OAuth provider

You can enable authentication in your tab app using third-party OAuth Identity Providers (IdP). In this method, the app user identity is validated and granted access by an OAuth IdP, such as Azure AD, Google, Facebook, GitHub, or any other provider. You'll need to configure a trust relationship with the IdP, and your app users should also be registered with it.

> [!NOTE]
> For authentication to work for your tab on mobile clients, you need to ensure that you're using at least 1.4.1 version of the Microsoft Teams JavaScript library.  
> TeamsJS launches a separate window for authentication flow. Set the `SameSite` attribute to **Lax**. Teams desktop client or older versions of Chrome or Safari do not support `SameSite`=None.

[!INCLUDE [sdk-include](~/includes/sdk-include.md)]

## Use OAuth IdP to enable authentication

OAuth 2.0 is an open standard for authentication and authorization used by Microsoft Azure Active Directory (Azure AD) and many other identity providers. A basic understanding of OAuth 2.0 is a prerequisite for working with authentication in Teams. For more information, see [OAuth 2 simplified](https://aaronparecki.com/oauth-2-simplified/) that is easier to follow than the [formal specification](https://oauth.net/2/). Authentication flow for tabs and bots are different because tabs are similar to websites so they can use OAuth 2.0 directly. Bots do a few things differently, but the core concepts are identical.

For example, the authentication flow for tabs and bots using Node and the [OAuth 2.0 implicit grant type](https://oauth.net/2/grant-types/implicit/), see [initiate authentication flow for tabs](~/tabs/how-to/authentication/auth-tab-aad.md#initiate-authentication-flow).

This section uses Azure AD as an example of a third-party OAuth provider for enabling authentication in a tab app.

> [!NOTE]
> Before showing a **Login** button to the user and calling the `authentication.authenticate` API in response to selecting the button, you must wait for the TeamsJS initialization to complete. You can chain a `.then()` handler or `await` for the `app.initialize()` function to complete.

![Tab authentication sequence diagram](~/assets/images/authentication/tab_auth_sequence_diagram.png)

1. The user interacts with the content on the tab configuration or content page, commonly a **Sign in** or **Log in** button.
2. The tab constructs the URL for its auth start page. Optionally, it uses information from URL placeholders or calls `app.getContext()` TeamsJS method to streamline the authentication experience for the user. For example, when authenticating with Azure AD, if the `login_hint` parameter is set to the user's email address, the user doesn't have to sign in if they've done so recently. This is because Azure AD uses the user's cached credentials. The pop-up window is shown briefly and then disappears.
3. The tab then calls the `authentication.authenticate()` method.
4. Teams opens the start page in an iframe in a pop-up window. The start page generates random `state` data, saves it for future validation, and redirects to the identity provider's `/authorize` endpoint, such as `https://login.microsoftonline.com/<tenant ID>/oauth2/authorize` for Azure AD. Replace `<tenant id>` with your own tenant id that is context.tid.
Similar to other application auth flows in Teams, the start page must be on a domain that is in its `validDomains` list, and on the same domain as the post sign in redirect page.

    > [!NOTE]
    >
    > The OAuth 2.0 implicit grant flow calls for a `state` parameter in the authentication request, which contains unique session data to prevent a [cross-site request forgery attack](https://en.wikipedia.org/wiki/Cross-site_request_forgery). The examples use a randomly-generated GUID for the `state` data.

5. On the provider's site, the user sign in and grants access to the tab.
6. The provider takes the user to the tab's OAuth 2.0 redirect page with an access token.
7. The tab checks that the returned `state` value matches what was saved earlier, and calls `authentication.notifySuccess()`, which in turn calls the success handler (`.then()`) for the promise-based `authenticate()` method from step 3.
8. Teams closes the pop-up window.
9. The tab either displays configuration UI, refreshes, or reloads the tabs content, depending on where the user started from.

> [!NOTE]
>
> If the application supports SAML SSO, then tab SSO generated JWT token cannot be used as it isn't supported.

## Treat tab context as hints

Although the tab context provides helpful information regarding the user, don't use this information to authenticate the user. Do authenticate the user even if you get the information as URL parameters to your tab content URL or by calling the `app.getContext()` function in the Microsoft Teams JavaScript client library (TeamsJS). A malicious actor can invoke your tab content URL with its own parameters. The actor can also invoke a web page impersonating Microsoft Teams to load your tab content URL in an iframe and return its own data to the `getContext()` function. You must treat the identity-related information in the tab context as a  hint and validate it before using. Refer to the notes in [navigate to the authorization page from your pop-up page](~/tabs/how-to/authentication/auth-tab-aad.md#navigate-to-the-authorization-page-from-your-pop-up-page).

## Code sample

Sample code showing the tab authentication process:

|| **Sample name** | **Description** | **.NET** | **Node.js** | **Manifest**
|-----------------|-----------------|-------------|------------|------------|
| App complete authentication | The sample shows authentication in a bot, tab, and messaging extension with Single sign-on (SSO) and in Facebook using a username and password | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-complete-auth/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-complete-auth/nodejs) |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-complete-auth/csharp/demo-manifest/App-Complete-Auth.zip) |

## See also

For a detailed implementation for tab authentication using Azure AD, see:

* [Authenticate a user in a Teams tab](~/tabs/how-to/authentication/auth-tab-AAD.md)
* [Silent authentication](~/tabs/how-to/authentication/auth-silent-AAD.md)
