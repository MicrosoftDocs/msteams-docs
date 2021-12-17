---
title: Authentication for tabs using Azure Active Directory
description: Describes authentication in Teams and how to use it in tabs
ms.topic: how-to
ms.localizationpriority: medium
keywords: teams authentication tabs AAD
---

# Authenticate a user in a Microsoft Teams tab

> [!NOTE]
> To authenticate tab for mobile clients, ensure you're using version 1.4.1 or later of the Teams JavaScript SDK.

There are many services that you want to use in your Teams app. Most of the services such as Facebook, Twitter, and Teams require authentication and authorization to get access. Teams uses Microsoft Graph to store user profile information in Azure Active Directory (AAD). This document will help you to authentication your tab using AAD to access the user profile information.

OAuth 2.0 is an open standard for authentication used by Azure Active Directory (AAD) and many other service providers. Understanding OAuth 2.0 is a prerequisite for working with authentication in Teams and AAD. For more information on code, see: [Microsoft Teams tab authentication sample (Node)](https://github.com/OfficeDev/microsoft-teams-sample-complete-node). It contains a static tab that requests an access token for Microsoft Graph and shows the current user's basic profile information from AAD. Usage of the OAuth 2.0 Implicit Grant flow with the goal to read user's profile information from AAD and Microsoft Graph.

Authentication flow in tabs is different from authentication flow in bots. For a general overview of authentication flow for tabs, see [Authentication flow in tabs](~/tabs/how-to/authentication/auth-flow-tab.md).

## Configuring identity provider

Configure an application to use Azure Active Directory (AAD) as an identity provider, see [Configure identity providers](~/concepts/authentication/configure-identity-provider.md) for detailed steps on configuring OAuth 2.0 callback redirect URI(s) when using Azure Active Directory as an identity provider.

### Prerequisite

The applications must be registered. The identity providers supporting OAuth 2.0 won't authenticate requests from unknown applications.

**To configure application with AAD:**

1. Go to [Application Registration Portal](https://ms.portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade).
1. Select **New Registration**.
1. Enter **Name** for the application. The name can be changed later.
1. Navigate to **Redirect URIs**
1. Select **Add a Redirect URI**.
1. Now, select **Add a platform**.
1. Select **Web** in Configure Platforms.
1. Update the URI to authentication endpoint. For example, the redirect URI for TypeScript/Node.js and C# sample apps on GitHub is as follows:

    Redirect URI: `https://<hostname>/bot-auth/simple-start`

    > [!NOTE]
    > Replace `<hostname>` with your actual host. This `<hostname>` might be a dedicated hosting site such as Azure, Glitch, or an ngrok tunnel to localhost on your development machine such as `https://abcd1234.ngrok.io`.

1. Select **Register**.

## Other authentication providers

* **LinkedIn** For more information, see [Configuring your LinkedIn application](/linkedin/talent/apply-with-linkedin)

* **Google** Obtain OAuth 2.0 client credentials from the [Google API Console](https://console.developers.google.com/)

## Initiate authentication flow

User action triggers authentication flow. Don't open the authentication pop-up automatically as it can trigger the browser's pop-up blocker and confuse the user. You can add a button to your configuration or content page to enable the user to sign in. For more information, see [configuration](~/tabs/how-to/create-tab-pages/configuration-page.md) and [content](~/tabs/how-to/create-tab-pages/content-page.md).

AAD doesn't allow its content to be placed in an iframe. Add pop-up page to host the identity provider. In the following example, the page is `/tab-auth/simple-start`. Select the button and use the `microsoftTeams.authenticate()` function of the Microsoft Teams client SDK to launch:

```javascript
microsoftTeams.authentication.authenticate({
    url: window.location.origin + "/tab-auth/simple-start",
    width: 600,
    height: 535,
    successCallback: function (result) {
        getUserProfile(result.accessToken);
    },
    failureCallback: function (reason) {
        handleAuthError(reason);
    }
});
```

> [!NOTE]
> * The URL you pass to `microsoftTeams.authentication.authenticate()` is the start page of the authentication flow. In the example, `/tab-auth/simple-start` must match the information registered in the [AAD Application Registration Portal](https://apps.dev.microsoft.com).
> * Authentication flow must start on a page that's on your domain. The domain must be listed in the [`validDomains`](~/resources/schema/manifest-schema.md#validdomains) section of the manifest. Failure to do so will result in an empty pop-up.
> * Failing to use `microsoftTeams.authentication.authenticate()` can cause a problem with popup not closing at the end of the sign in process.

## Navigate to the authorization page from your pop-up page

When your pop-up page (`/tab-auth/simple-start`) is displayed, the following code is run. The main goal of this page is to redirect to your identity provider so the user can sign in. This redirection could be done on the server side using HTTP 302, but in this case it is done on the client side using with a call to `window.location.assign()`. Use `microsoftTeams.getContext()` to retrieve hinting information, and pass it to AAD.

```javascript
microsoftTeams.getContext(function (context) {
    // Generate random state string and store it, so we can verify it in the callback
    let state = _guid(); // _guid() is a helper function in the sample
    localStorage.setItem("simple.state", state);
    localStorage.removeItem("simple.error");
    // Go to the Azure AD authorization endpoint
    let queryParams = {
        client_id: "YOUR_APP_ID_HERE",
        response_type: "id_token token",
        response_mode: "fragment",
        scope: "https://graph.microsoft.com/User.Read openid",
        redirect_uri: window.location.origin + "/tab-auth/simple-end",
        nonce: _guid(),
        state: state,
        // The context object is populated by Teams; the loginHint attribute
         // is used as hinting information
        login_hint: context.loginHint,
    };

    let authorizeEndpoint = "https://login.microsoftonline.com/" + context.tid + "/oauth2/v2.0/authorize?" + toQueryString(queryParams);
    window.location.assign(authorizeEndpoint);
});
```

After the user completes authorization, the user is redirected to the callback page you specified for your app at `/tab-auth/simple-end`.

* Use the user's login name as the `login_hint` value for AAD sign-in, which helps the user to provide less information. Don't use the context directly as proof of identity as an attacker could load your page in a malicious browser and update the information. For more information on accessing Teams context to help build authentication requests and URLs, see [get user context information](~/tabs/how-to/access-teams-context.md).
* The tab context provides useful information about the user. Don't use the information to authenticate the user as URL parameters to your tab content URL or by calling the `microsoftTeams.getContext()` function in the Microsoft Teams client SDK. A malicious actor can invoke your tab content URL with its own parameters, and a web page impersonating Microsoft Teams can load your tab content URL in an iframe and return its own data to the `getContext()` function. Treat the identity-related information in the tab context simply as hints and validate them before use.
* The `state` parameter is used to confirm and match the service calling the callback URL. If the `state` parameter in the callback doesn't match the parameter you sent during the call, the return call can't be verified and should be terminated.

> [!Tip]
> * See [get user context information](~/tabs/how-to/access-teams-context.md) for help to build authentication requests and URLs.
> * It isn't necessary to include the identity provider's domain in the `validDomains` list in the app's manifest.json file.

## The callback page

You can call the AAD authorization service and pass in user and app information. The AAD can present the user with its own monolithic authorization experience. Your app has no control over the actions in this experience. AAD calls the callback page that you provided (`/tab-auth/simple-end`).
In this page, you need to determine success or failure based on the information returned by AAD and call `microsoftTeams.authentication.notifySuccess()` or `microsoftTeams.authentication.notifyFailure()`. If the login is successful, you can have access to service resources.

````javascript
// Split the key-value pairs passed from Azure AD
// getHashParameters is a helper function that parses the arguments sent
// to the callback URL by Azure AD after the authorization call
let hashParams = getHashParameters();
if (hashParams["error"]) {
    // Authentication/authorization failed
    microsoftTeams.authentication.notifyFailure(hashParams["error"]);
} else if (hashParams["access_token"]) {
    // Get the stored state parameter and compare with incoming state
    // This validates that the data is coming from Azure AD
    let expectedState = localStorage.getItem("simple.state");
    if (expectedState !== hashParams["state"]) {
        // State does not match, report error
        microsoftTeams.authentication.notifyFailure("StateDoesNotMatch");
    } else {
        // Success: return token information to the tab
        microsoftTeams.authentication.notifySuccess({
            idToken: hashParams["id_token"],
            accessToken: hashParams["access_token"],
            tokenType: hashParams["token_type"],
            expiresIn: hashParams["expires_in"]
        })
    }
} else {
    // Unexpected condition: hash does not contain error or access_token parameter
    microsoftTeams.authentication.notifyFailure("UnexpectedFailure");
}
````

The code parses the key-value pairs received from AAD in `window.location.hash` using the `getHashParameters()` helper function. If it finds an `access_token`, and the `state` value is the same as the one provided at the start of the authentication flow, it returns the access token to the tab by calling `notifySuccess()`; otherwise it reports an error with `notifyFailure()`. `NotifyFailure()`. The following list provides the predefined failure reasons:

* `CancelledByUser`: the user has closed the pop-up window before completing the authentication flow.
* `FailedToOpenWindow`: the pop-up window wasn't open while running Microsoft Teams in a browser, results being blocked by a popup blocker.

If successful, refresh or reload the page to show relevant content to the now-authenticated user. If authentication fails, it displays an error message.
`NotifyFailure()` has the following predefined failure reasons:

* `CancelledByUser` the user closed the pop-up window before completing the authentication flow.
* `FailedToOpenWindow` the pop-up window couldn't be opened. When running Microsoft Teams in a browser, this action typically means that the window was blocked by a pop-up blocker.

Your app can set its own session cookie. So, the user shouldn't sign in again when they return to your tab on the current device.

> [!NOTE]
> Chrome 80, scheduled for release in early 2020, introduces new cookie values and imposes cookie policies by default. It's recommended that you set the intended use for your cookies rather than rely on default browser behavior. See [SameSite cookie attribute (2020 update)](../../../resources/samesite-cookie-update.md).

To get the correct token for Microsoft Teams Free and guest users, it's important that the apps use tenant-specific endpoint `https://login.microsoftonline.com/**{tenantId}**`. You can get tenantId from the bot message or tab context. If the apps use `https://login.microsoftonline.com/common`, the users will get incorrect tokens and will log on to the 'home' tenant instead of the one they're currently signed into.

## Code sample

Sample code showing the tab authentication process using AAD:

| **Sample name** | **description** | **.NET** | **Node.js** |
|-----------------|-----------------|-------------|
| Microsoft Teams tab authentication | Tab authentication process using AAD. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-channel-group-config-page-auth/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-auth/nodejs) |

## See also

* [Silent authentication](~/tabs/how-to/authentication/auth-silent-AAD.md)
* [SSO authentication](~/tabs/how-to/authentication/auth-aad-sso.md)
