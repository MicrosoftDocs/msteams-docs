---
title: Authentication flow for tabs
description: Describes authentication flow in tabs, OAuth by AAD, and provides code sample 
ms.topic: conceptual
ms.localizationpriority: medium
keywords: teams authentication flow tabs
---
# Microsoft Teams authentication flow for tabs

OAuth 2.0 is an open standard for authentication and authorization used by Azure Active Directory (AAD) and other identity providers. For more information, see [OAuth 2 simplified](https://aaronparecki.com/oauth-2-simplified/). The authentication flow for tabs and bots is different, but the core concepts are identical. Tabs authentication flow is like websites, so, tabs can directly use OAuth 2.0.

To know about the implicit grant type in OAuth 2.0, see [OAuth 2.0 implicit grant type](https://oauth.net/2/grant-types/implicit/).

> [!NOTE]
> You must wait for the SDK initialization to complete and then show **Log in** to the user. When the user selects **Log in**, in response, call the `microsoftTeams.authentication.authenticate` API. You can pass a callback to the `microsoftTeams.initialize` API when initialization completes.

![Tab authentication sequence diagram](~/assets/images/authentication/tab_auth_sequence_diagram.png)

1. The user interacts with the content on the tab configuration or content page, commonly displayed as **Sign in** or **Log in**.
2. The tab constructs the URL for its auth start page. Optionally, it uses information from URL placeholders or calls `microsoftTeams.getContext()` Teams client SDK method to streamline the authentication experience for the user. For example, when authenticating with AAD, if the `login_hint` parameter is set to the user's email address, the user does not have to sign in if they have done so recently. This is because AAD uses the user's cached credentials. The pop-up window is shown briefly and then disappears.
3. The tab then calls the `microsoftTeams.authentication.authenticate()` method and registers the `successCallback` and `failureCallback` functions.
4. Teams opens the start page in an iframe in a pop-up window. The start page generates random `state` data, saves it for future validation, and redirects to the identity provider's `/authorize` endpoint, such as `https://login.microsoftonline.com/<tenant ID>/oauth2/authorize` for Azure AD. Replace `<tenant id>` with your own tenant id that is context.tid.
Similar to other application auth flows in Teams, the start page must be on a domain that is in its `validDomains` list, and on the same domain as the redirect page that appears after signing in.

    > [!NOTE]
    > The OAuth 2.0 implicit grant flow calls for a `state` parameter in the authentication request, which contains unique session data to prevent a [cross-site request forgery attack](https://en.wikipedia.org/wiki/Cross-site_request_forgery). The examples use a randomly-generated GUID for the `state` data.

5. On the provider's site, the user signs in and grants access to the tab.
6. The provider takes the user to the tab's OAuth 2.0 redirect page with an access token.
7. The tab checks that the returned `state` value matches what was saved earlier, and calls `microsoftTeams.authentication.notifySuccess()`, which in turn calls the `successCallback` function registered in step 3.
8. Teams closes the pop-up window.
9. The tab either displays configuration UI, refreshes, or reloads the tabs content, depending on where the user started from.

## Treat tab context as hints

Although the tab context provides helpful information regarding the user, do not use this information to authenticate the user. Do authenticate the user even if you get the information as URL parameters to your tab content URL or by calling the `microsoftTeams.getContext()` function in the Microsoft Teams client SDK. A malicious actor can invoke your tab content URL with its own parameters. The actor can also invoke a web page impersonating Microsoft Teams to load your tab content URL in an iframe and return its own data to the `getContext()` function. You must treat the identity-related information in the tab context as a  hint and validate it before using. Refer to the notes in [navigate to the authorization page from your pop-up page](~/tabs/how-to/authentication/auth-tab-aad.md#navigate-to-the-authorization-page-from-your-pop-up-page).

## Code sample

Sample code showing the tab authentication process:

| **Sample name** | **Description** | **C#** | **Node.js** |
|-----------------|-----------------|-------------|------------|
| Teams tab authentication | Authentication process for tabs using AAD. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-complete-sample/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-complete-sample/nodejs) |

## See also

For a detailed implementation for tab authentication using AAD, see:

* [Authenticate a user in a Teams tab](~/tabs/how-to/authentication/auth-tab-AAD.md)
* [Silent authentication](~/tabs/how-to/authentication/auth-silent-AAD.md)
