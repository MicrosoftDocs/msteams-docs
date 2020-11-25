---
title: Authentication flow for tabs
description: Describes authentication flow in tabs
keywords: teams authentication flow tabs
---
# Microsoft Teams authentication flow for tabs

> [!Note]
> For authentication to work for your tab on mobile clients, you need to ensure you're using at least the 1.4.1 version of the Teams JavaScript SDK.
> Teams SDK launches separate window for authentication flow and hence samesite attribute can be set to 'Lax'. Currently, SameSite=None is not supported by the Teams desktop client or older versions of Chrome or Safari.

OAuth 2.0 is an open standard for authentication and authorization used by Azure AD and many other identity providers. A basic understanding of OAuth 2.0 is a prerequisite for working with authentication in Teams; [here's a good overview](https://aaronparecki.com/oauth-2-simplified/) that's easier to follow than the [formal specification](https://oauth.net/2/). Authentication flow for tabs and bots are a little different because tabs are very similar to websites so they can use OAuth 2.0 directly; bots are not and must do a few things differently, but the core concepts are identical.

For an example that demonstrates authentication flow for tabs and bots using Node using the [OAuth 2.0 implicit grant type](https://oauth.net/2/grant-types/implicit/). Refer [Initiate authentication flow for tabs](../auth-tab-aad.md#Initiateauthenticationflow).

![Tab authentication sequence diagram](~/assets/images/authentication/tab_auth_sequence_diagram.png)

1. The user interacts with the content on the tab configuration or content page, commonly a button labeled "Sign in" or "Log in".
2. The tab constructs the URL for its auth start page, optionally using information from URL placeholders or by calling `microsoftTeams.getContext()` Teams client SDK method to streamline the authentication experience for the user. For example, when authenticating with Azure AD, if the `login_hint` parameter is set to the user's email address, the user may not even have to sign in if they have done so recently, because Azure AD will use the user's cached credentials if possible: the popup will flash briefly and then disappear.
3. The tab then calls the `microsoftTeams.authentication.authenticate()` method and registers the `successCallback` and `failureCallback` functions.
4. Teams opens the start page in an iframe in a pop-up window. The start page generates random `state` data, saves it for future validation, and redirects to the identity provider's `/authorize` endpoint such as `https://login.microsoftonline.com/<tenant ID>/oauth2/authorize` for Azure AD. Replace `<tenant id>` with your own tenant id (context.tid).
    * Like other application auth flows in Teams, the start page must be on a domain that's in its `validDomains` list, and on the same domain as the post-login redirect page.
    * **IMPORTANT**: The OAuth 2.0 implicit grant flow calls for a `state` parameter in the authentication request which contains unique session data to prevent a [cross-site request forgery attack](https://en.wikipedia.org/wiki/Cross-site_request_forgery). The examples below use a randomly-generated GUID for the `state` data.
5. On the provider's site, the user signs in and grants access to the tab.
6. The provider takes the user to the tab's OAuth 2.0 redirect page with an access token.
7. The tab checks that the returned `state` value matches what was saved earlier, and calls `microsoftTeams.authentication.notifySuccess()`, which in turn calls the `successCallback` function registered in step 3.
8. Teams closes the pop-up window.
9. The tab either displays configuration UI or refreshes or reloads the tabs content, depending on where the user started from.

## Treat tab context as hints

Although the tab context provides useful information regarding the user, don't use this information to authenticate the user whether you get it as URL parameters to your tab content URL or by calling the `microsoftTeams.getContext()` function in the Microsoft Teams client SDK. A malicious actor could invoke your tab content URL with its own parameters, and a web page impersonating Microsoft Teams could load your tab content URL in an iframe and return its own data to the `getContext()` function. You should treat the identity-related information in the tab context simply as hints and validate them before use. Refer to the notes in [Navigate to the authorization page from your popup page](../auth-tab-aad.md#Navigatetotheauthorizationpagefromyourpopuppage).

## Samples

For sample code showing the tab authentication process see:

* [Microsoft Teams tab authentication sample (Node)](https://github.com/OfficeDev/microsoft-teams-sample-complete-node)
* [Microsoft Teams tab authentication sample (C#)](https://github.com/OfficeDev/microsoft-teams-sample-complete-csharp)

## More details

For a detailed implementation walkthrough for tab authentication targeting Azure Active Directory see:

* [Authenticate a user in a Microsoft Teams tab](~/tabs/how-to/authentication/auth-tab-aad.md)
* [Silent authentication](~/tabs/how-to/authentication/auth-silent-AAD.md)
