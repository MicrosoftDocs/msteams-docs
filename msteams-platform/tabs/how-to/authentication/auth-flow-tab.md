---
title: Authentication flow for tabs
description: Describes authentication flow in tabs
ms.topic: conceptual
keywords: teams authentication flow tabs
---
# Microsoft Teams authentication flow for tabs

> [!NOTE]
> For authentication to work for your tab on mobile clients, you must ensure you are using at least 1.4.1 version of the Microsoft Teams JavaScript SDK.
> Teams SDK launches separate window for authentication flow. Set the `SameSite` attribute to **Lax**. Teams desktop client or older versions of Chrome or Safari do not support `SameSite`=None.

OAuth 2.0 is an open standard for authentication and authorization used by Azure Active Directory (AAD) and many other identity providers. A basic understanding of OAuth 2.0 is a prerequisite for working with authentication in Teams. For more information, see [OAuth 2 simplified](https://aaronparecki.com/oauth-2-simplified/) that is easier to follow than the [formal specification](https://oauth.net/2/). Authentication flow for tabs and bots are different because tabs are similar to websites so they can use OAuth 2.0 directly. Bots do a few things differently, but the core concepts are identical.

For an example of authentication flow for tabs and bots using Node and the [OAuth 2.0 implicit grant type](https://oauth.net/2/grant-types/implicit/), see [initiate authentication flow for tabs](~/tabs/how-to/authentication/auth-tab-aad.md#initiate-authentication-flow).

> [!NOTE]
> Before showing a **Login** button to the user and calling the `microsoftTeams.authentication.authenticate` API in response to selecting the button, you must wait for the SDK initialization to complete. You can pass a callback to the `microsoftTeams.initialize` API that is called when initialization completes.

![Tab authentication sequence diagram](~/assets/images/authentication/tab_auth_sequence_diagram.png)

1. The user interacts with the content on the tab configuration or content page, commonly a **Sign in** or **Log in** button.
2. The tab constructs the URL for its auth start page. Optionally, it uses information from URL placeholders or calls `microsoftTeams.getContext()` Teams client SDK method to streamline the authentication experience for the user. For example, when authenticating with AAD, if the `login_hint` parameter is set to the user's email address, the user does not have to sign in if they have done so recently. This is because AAD uses the user's cached credentials. The pop-up window is shown briefly and then disappears.
3. The tab then calls the `microsoftTeams.authentication.authenticate()` method and registers the `successCallback` and `failureCallback` functions.
4. Teams opens the start page in an iframe in a pop-up window. The start page generates random `state` data, saves it for future validation, and redirects to the identity provider's `/authorize` endpoint, such as `https://login.microsoftonline.com/<tenant ID>/oauth2/authorize` for Azure AD. Replace `<tenant id>` with your own tenant id that is context.tid.
Similar to other application auth flows in Teams, the start page must be on a domain that is in its `validDomains` list, and on the same domain as the post sign in redirect page.

    > [!NOTE]
    > The OAuth 2.0 implicit grant flow calls for a `state` parameter in the authentication request, which contains unique session data to prevent a [cross-site request forgery attack](https://en.wikipedia.org/wiki/Cross-site_request_forgery). The examples use a randomly-generated GUID for the `state` data.

5. On the provider's site, the user signs in and grants access to the tab.
6. The provider takes the user to the tab's OAuth 2.0 redirect page with an access token.
7. The tab checks that the returned `state` value matches what was saved earlier, and calls `microsoftTeams.authentication.notifySuccess()`, which in turn calls the `successCallback` function registered in step 3.
8. Teams closes the pop-up window.
9. The tab either displays configuration UI, refreshes, or reloads the tabs content, depending on where the user started from.

## Treat tab context as hints

Although the tab context provides helpful information regarding the user, do not use this information to authenticate the user. Do authenticate the user even if you get the information as URL parameters to your tab content URL or by calling the `microsoftTeams.getContext()` function in the Microsoft Teams client SDK. A malicious actor can invoke your tab content URL with its own parameters. The actor can also invoke a web page impersonating Microsoft Teams to load your tab content URL in an iframe and return its own data to the `getContext()` function. You must treat the identity-related information in the tab context simply as hints and validate them before use. Refer to the notes in [navigate to the authorization page from your pop-up page](~/tabs/how-to/authentication/auth-tab-aad.md#navigate-to-the-authorization-page-from-your-popup-page).

## Code sample

Sample code showing the tab authentication process.

| **Sample name** | **Description** | **Node.js** | **csharp** |
|-----------------|-----------------|-------------|------------|
| Teams tab authentication | Authentication process for tabs using AAD. | [View](https://github.com/OfficeDev/microsoft-teams-sample-complete-node) | [View](https://github.com/OfficeDev/microsoft-teams-sample-complete-csharp) |

## More details

For a detailed implementation for tab authentication using AAD, see:

* [Authenticate a user in a Teams tab](~/tabs/how-to/authentication/auth-tab-AAD.md)
* [Silent authentication](~/tabs/how-to/authentication/auth-silent-AAD.md)
