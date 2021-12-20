---
title: Authentication flow for tabs
description: Describes authentication flow in tabs
ms.topic: conceptual
ms.localizationpriority: medium
keywords: teams authentication flow tabs
---
# Microsoft Teams authentication flow for tabs

> [!NOTE]
> * To authenticate your tab on mobile clients requires Teams JavaScript client SDK version 1.4.1 or later.
> * Teams SDK launches a separate window for authentication flow. Set the `SameSite` attribute to **Lax**. Teams desktop client or older versions of Chrome or Safari do not support `SameSite`=None.
> * A basic understanding of OAuth 2.0 is a prerequisite for working with authentication in Teams.

OAuth 2.0 is an open standard for authentication and authorization used by Azure Active Directory (AAD) and other identity providers. For more information, see [OAuth 2 simplified](https://aaronparecki.com/oauth-2-simplified/). The authentication flow for tabs and bots is different. Tabs authentication flow is like websites, so, tabs can directly use OAuth 2.0. Bot authentication flow is different, but the core concepts are identical.

For example, the authentication flow for tabs and bots using Node and the [OAuth 2.0 implicit grant type](https://oauth.net/2/grant-types/implicit/), see [initiate authentication flow for tabs](~/tabs/how-to/authentication/auth-tab-aad.md#initiate-authentication-flow).

> [!NOTE]
> Before showing a **Login** button to the user and calling the `microsoftTeams.authentication.authenticate` API in response to selecting the button, you must wait for the SDK initialization to complete. You can pass a callback to the `microsoftTeams.initialize` API that is called when initialization completes.

![Tab authentication sequence diagram](~/assets/images/authentication/tab_auth_sequence_diagram.png)

1. The user interacts with the content on the tab configuration or content page through a **Sign-in** or **Log-in** button.
2. The tab constructs the URL for its auth start page. Optionally, it uses information from URL placeholders or calls `microsoftTeams.getContext()` Teams client SDK method to streamline the authentication experience for the user. For example, after a recent sign in, don’t sign in again while authenticating with AAD if the `login_hint` parameter is set to the user's email address, the user need not sign in, if they've done so recently. The AAD uses user's cached credentials. The pop-up window appears briefly and then disappears.
3. The tab calls the `microsoftTeams.authentication.authenticate()` method and registers the `successCallback` and `failureCallback` functions.
4. Teams opens the start page in an iframe in a pop-up window. The start page generates random `state` data, saves it for future validation, and redirects to the identity provider's `/authorize` endpoint, such as `https://login.microsoftonline.com/<tenant ID>/oauth2/authorize` for Azure AD. Replace `<tenant id>` with your own tenant id that is `context.tid`.
Similar to other application auth flows in Teams, the start page must be on a domain that is in its `validDomains` list, and on the same domain as the post sign-in redirect page.

    > [!NOTE]
    > The OAuth 2.0 implicit grant flow calls for a `state` parameter in the authentication request, which contains unique session data to prevent a [cross-site request forgery attack](https://en.wikipedia.org/wiki/Cross-site_request_forgery). The examples use a randomly-generated GUID for the `state` data.

5. On the provider's site, the user sign in and grants access to the tab.
6. The provider takes the user to the tab's OAuth 2.0 redirect page with an access token.
7. The tab checks that the returned `state` value matches, and calls `microsoftTeams.authentication.notifySuccess()`, which in turn calls the `successCallback` function registered in step 3. Teams closes the pop-up window.
9. The tab either displays configuration UI, refreshes, or reloads the tabs content, depending on the scenario.

## Treat tab context as hints

 Authenticate the user even if you get the information as URL parameters to your tab content URL or by calling the `microsoftTeams.getContext()` function in the Microsoft Teams client SDK. A malicious actor can invoke your tab content URL with its own parameters. The actor can also invoke a web page impersonating Microsoft Teams to load your tab content URL in an iframe and return its own data to the `getContext()` function. The tab context provides helpful information about the user but don't use this information to authenticate the user. Treat the identity-related information in the tab context simply as hints and validate. See notes in [navigate to the authorization page from pop-up page](~/tabs/how-to/authentication/auth-tab-aad.md).

## Code sample

Sample code showing the tab authentication process:

| **Sample name** | **Description** | **C#** | **Node.js** |
|-----------------|-----------------|-------------|------------|
| Teams tab authentication | Authentication process for tabs using AAD. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-complete-sample/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-complete-sample/nodejs) |

## See also

* [Silent authentication](~/tabs/how-to/authentication/auth-silent-AAD.md)
* [SSO authentication](~/tabs/how-to/authentication/auth-aad-sso.md)

