---
title: Authentication flow for tabs
description: Describes authentication flow in tabs
keywords: teams authentication flow tabs
ms.date: 02/27/2018
---
# Microsoft Teams authentication flow for tabs

OAuth 2.0 is an open standard for authentication and authorization used by AAD and many other identity providers. A basic understanding of OAuth 2.0 is a prerequisite for working with authentication in Teams; [here's a good overview](https://aaronparecki.com/oauth-2-simplified/) that's easier to follow than the [formal specification](https://oauth.net/2/). Authentication flow for tabs and bots are a little different because tabs are very similar to websites so they can use OAuth 2.0 directly, and bots are not and must do a few things differently, but the core concepts are identical.

See the GitHub repo [Microsoft Teams Authentication Sample (Node)](https://github.com/OfficeDev/microsoft-teams-sample-auth-node)
for an example that demonstrates authentication flow for tabs and bots using Node using the [OAuth 2.0 authorization code grant type](https://oauth.net/2/grant-types/authorization-code/).

![Tab authentication sequence diagram](~/assets/images/authentication/tab_auth_sequence_diagram.png)

1. The user interacts with the content on the tab such as a log in button.
2. The tab sets up auth state and constructs the URL for its auth start page, and constructs the URL for its auth start page. It uses information from URL placeholders or calls microsoftTeams.getContext() from the Teams client SDK.
3. The tab then calls the microsoftTeams.authentication.authenticate() method and registers the successCallback and failureCallback functions.
4. Teams opens the start page in a pop-up window. This page generates a random `state` token and saves it for future validation.
    * Like other application auth flows in Teams, the start page must be on a domain that's in your `validDomains` list, and on the same domain as the post-login redirect page.
    * **IMPORTANT**: The OAuth 2.0 authorization code grant flow calls for a `state` parameter in the authentication request which contains a unique session token to prevent a [cross-site request forgery attack](https://en.wikipedia.org/wiki/Cross-site_request_forgery). The example uses a randomly-generated GUID.
5. On the provider's site, the user signs in and grants access to the tab.
6. The provider takes the user to the tab's OAuth redirect page, with an authorization code.
7. The tab checks that the returned `state` token matches the saved token, and calls microsoftTeams.authentication.notifySuccess(), which call the successCallback function registered in step 3.
8. The tab either displays configuration UI or refreshes or reloads the tabs content.

## Changes to authentication flow in Teams

To address a security concern, changes have been made to tab authentication flow.

Before the July 2017 update tabs were allowed to open an authentication window to any arbitrary domain and listen to messages from that window as if they came from the domain of the tab content frame. This is no longer permitted.

Developers used this behavior to do things like launch an authentication pop-up directly to Azure Active Directory (Azure AD), redirect back to their tab content's domain, and then call `notifySuccess`. Although this was a legitimate scenario, it also would allow a pop-up to a phishing site.

The recommended approach is to direct the authentication pop-up to a page on your domain, redirect to Azure AD (or other sign-in provider), and then redirect back to your domain as usual. Basically, the authentication pop-up must start and end on your domain.

Because `navigateCrossDomain` isn't supported in the authentication window, we recommend that your authentication start and end domains are the same as your content domain and listed in the manifest's `validDomains` list.

## Treat tab context as hints

Although the tab context provides useful information regarding the user, don't use this information to authenticate the user whether you get it as URL parameters to your tab content URL or by calling the microsoftTeams.getContext() function in the Microsoft Teams client SDK. A malicious actor could invoke your tab content URL with its own parameters, and a web page impersonating Microsoft Teams could load your tab content URL in an iframe and return its own data to the getContext() function. You should treat the identity-related information in the tab context simply as hints and validate them before use.

## Samples

For sample code showing the authentication process see:

* [Microsoft Teams Authentication Sample (Node)](https://github.com/OfficeDev/microsoft-teams-sample-complete-node)
* [Microsoft Teams Authentication Sample (c#)](https://github.com/OfficeDev/microsoft-teams-sample-complete-csharp)