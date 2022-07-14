---
title: Silent authentication
description: In this module, learn how to do silent authentication, Single-sign-on, and Azure AD for tabs and how it works
ms.topic: conceptual
ms.localizationpriority: medium
---
# Use silent authentication in Azure AD

> [!IMPORTANT]
> Microsoft support and development for Active Directory Authentication Library (ADAL) including the security fixes, ends on **June 30, 2022**. To continue receiving support, update your applications to use Microsoft Authentication Library (MSAL).See [Migrate applications to the Microsoft Authentication Library (MSAL)](/azure/active-directory/develop/msal-migration).

> [!NOTE]
> For authentication to work for your tab on mobile clients, ensure that you're using Teams JavaScript SDK version 1.4.1 or later.

Silent authentication in Azure AD minimizes the number of times a user enters their credentials by silently refreshing the authentication token. For true single sign-on support, see [SSO documentation](~/tabs/how-to/authentication/tab-sso-overview.md).

To keep your code client-side, use the [Azure AD authentication library](/azure/active-directory/develop/active-directory-authentication-libraries) for JavaScript to get an Microsoft Azure Active Directory (Azure AD) access token silently. If the user has signed in recently, they do not see a popup dialog box.

While Active Directory Authentication Library is optimized for AngularJS applications, it also works with JavaScript single-page applications (SPA).

> [!NOTE]
> Currently, silent authentication only works for tabs. It does not work when signing in from a bot.

## How silent authentication works

The Active Directory Authentication Library creates a hidden iframe for OAuth 2.0 implicit grant flow. But the library specifies `prompt=none`, so Azure AD does not display the sign-in page. User interaction may be needed if the user needs to sign in or grant access to the application. If user interaction is necessary, Azure AD returns an error that the library reports to your app. If necessary, your app can now display a sign-in option.

## How to do silent authentication

The code in this article comes from the Teams sample app that is [Teams authentication sample node](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/app-auth/nodejs/src/views/tab/silent/silent.hbs).

[Initiate silent and simple authentication configurable tab using Azure AD](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-channel-group-config-page-auth/csharp) and follow the instructions to run the sample on your local machine.

### Include and configure Active Directory Authentication Library

Include Active Directory Authentication Library in your tab pages and configure the library with your client ID and redirect URL:

```html
<script src="https://secure.aadcdn.microsoftonline-p.com/lib/1.0.15/js/adal.min.js" integrity="sha384-lIk8T3uMxKqXQVVfFbiw0K/Nq+kt1P3NtGt/pNexiDby2rKU6xnDY8p16gIwKqgI" crossorigin="anonymous"></script>
<script type="text/javascript">
    // Active Directory Authentication Library configuration
    let config = {
        clientId: "YOUR_APP_ID_HERE",
        // redirectUri must be in the list of redirect URLs for the Azure AD app
        redirectUri: window.location.origin + "/tab-auth/silent-end",
        cacheLocation: "localStorage",
        navigateToLoginRequestUrl: false,
    };
</script>
```

### Get the user context

In the tab's content page, call `app.getContext()` to get a sign-in hint for the current user. The hint is used as a `loginHint` in the call to Azure AD.

```javascript
// Set up extra query parameters for Active Directory Authentication Library
// - openid and profile scope adds profile information to the id_token
// - login_hint provides the expected user name
if (loginHint) {
    config.extraQueryParameter = "scope=openid+profile&login_hint=" + encodeURIComponent(loginHint);
} else {
    config.extraQueryParameter = "scope=openid+profile";
}
```

### Authenticate

If Active Directory Authentication Library has an unexpired token cached for the user, use the token. Alternately, call `acquireToken(resource, callback)` to silently receive a token. The library calls a callback function with the requested token or generates an error if the authentication fails.

If you get an error in the callback function, display and use an explicit sign-in option.

```javascript
let authContext = new AuthenticationContext(config); // from Active Directory Authentication Library
// See if there is a cached user and it matches the expected user
let user = authContext.getCachedUser();
if (user) {
    if (user.profile.oid !== userObjectId) {
        // User doesn't match, clear the cache
        authContext.clearCache();
    }
}

// In this example we are getting an id token (which Active Directory Authentication Library returns if we ask for resource = clientId)
authContext.acquireToken(config.clientId, function (errDesc, token, err, tokenType) {
    if (token) {
        // Make sure Active Directory Authentication Library gave us an ID token
        if (tokenType !== authContext.CONSTANTS.ID_TOKEN) {
            token = authContext.getCachedToken(config.clientId);
        }
        showProfileInformation(idToken);
    } else {
        console.log("Renewal failed: " + err);
        // Failed to get the token silently; show the login button
        showLoginButton();
        // You could attempt to launch the login popup here, but in browsers this could be blocked by
        // a popup blocker, in which case the login attempt will fail with the reason FailedToOpenWindow.
    }
});
```

### Process the return value

Active Directory Authentication Library parses the result from Azure AD by calling `AuthenticationContext.handleWindowCallback(hash)` in the sign-in callback page.

Check that you have a valid user and call `authentication.notifySuccess()` or `authentication.notifyFailure()` to report the status to your main tab content page.

```javascript
import { authentication } from "@microsoft/teams-js";
if (authContext.isCallback(window.location.hash)) {
    authContext.handleWindowCallback(window.location.hash);
    if (window.parent === window) {
        if (authContext.getCachedUser()) {
            authentication.notifySuccess();
        } else {
            authentication.notifyFailure(authContext.getLoginError());
        }
    }
}
```

### Handle the sign-out flow

Use the following code to handle sign out flow in Azure AD authentication:

> [!NOTE]
> When you logout from Teams tab or bot, the current session is cleared.

```javascript
function logout() {
localStorage.clear();
window.location.href = "@Url.Action("<<Action Name>>", "<<Controller Name>>")";
}
```

## See also

* [Configure identity providers to use Azure AD](../../../concepts/authentication/configure-identity-provider.md)
* [Know about Microsoft Authentication Library (MSAL)](/azure/active-directory/develop/msal-overview)
