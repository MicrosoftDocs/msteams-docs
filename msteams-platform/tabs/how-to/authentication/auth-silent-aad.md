---
title: Silent authentication
description: Describes silent authentication
ms.topic: conceptual
localization_priority: Normal
keywords: teams authentication SSO silent AAD
---
# Silent authentication

> [!NOTE]
> For authentication to work for your tab on mobile clients, ensure you are using at least 1.4.1 version of the Teams JavaScript SDK.

Silent authentication in Azure Active Directory (AAD) minimizes the number of times a user enters their sign in credentials by silently refreshing the authentication token. For true single sign-on support, see [SSO documentation](~/tabs/how-to/authentication/auth-aad-sso.md).

If you want to keep your code completely client-side, you can use the [AAD authentication library](/azure/active-directory/develop/active-directory-authentication-libraries) for JavaScript to get an AAD access token silently. If the user has signed in recently, they never see a popup dialog box.

Even though the ADAL.js library is optimized for AngularJS applications, it also works with pure JavaScript single-page applications.

> [!NOTE]
> Currently, silent authentication only works for tabs. It does not work when signing in from a bot.

## How silent authentication works

The ADAL.js library creates a hidden iframe for OAuth 2.0 implicit grant flow. But the library specifies `prompt=none`, so Azure AD never shows the sign in page. If user interaction is required because the user needs to sign in or grant access to the application, AAD immediately returns an error that ADAL.js reports to your app. At this point your app can show a sign in button if required.

## How to do silent authentication

The code in this article comes from the Teams sample app that is [Teams authentication sample node](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/app-auth/nodejs/src/views/tab/silent/silent.hbs).

[Initiate silent and simple authentication configurable tab using AAD](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-channel-group-config-page-auth/csharp) and follow the instructions to run the sample on your local machine.

### Include and configure ADAL

Include the ADAL.js library in your tab pages and configure ADAL with your client ID and redirect URL:

```html
<script src="https://secure.aadcdn.microsoftonline-p.com/lib/1.0.15/js/adal.min.js" integrity="sha384-lIk8T3uMxKqXQVVfFbiw0K/Nq+kt1P3NtGt/pNexiDby2rKU6xnDY8p16gIwKqgI" crossorigin="anonymous"></script>
<script type="text/javascript">
    // ADAL.js configuration
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

In the tab's content page, call `microsoftTeams.getContext()` to get a sign in hint for the current user. This is used as a loginHint in the call to AAD.

```javascript
// Set up extra query parameters for ADAL
// - openid and profile scope adds profile information to the id_token
// - login_hint provides the expected user name
if (loginHint) {
    config.extraQueryParameter = "scope=openid+profile&login_hint=" + encodeURIComponent(loginHint);
} else {
    config.extraQueryParameter = "scope=openid+profile";
}
```

### Authenticate

If ADAL has a token cached for the user that has not expired, use that token. Alternately, attempt to get a token silently by calling `acquireToken(resource, callback)`. ADAL.js calls the callback function with the requested token, or gives an error if authentication fails.

If you get an error in the callback function, show a sign in button and fall back to an explicit sign in.

```javascript
let authContext = new AuthenticationContext(config); // from the ADAL.js library
// See if there's a cached user and it matches the expected user
let user = authContext.getCachedUser();
if (user) {
    if (user.profile.oid !== userObjectId) {
        // User doesn't match, clear the cache
        authContext.clearCache();
    }
}

// In this example we are getting an id token (which ADAL.js returns if we ask for resource = clientId)
authContext.acquireToken(config.clientId, function (errDesc, token, err, tokenType) {
    if (token) {
        // Make sure ADAL gave us an id token
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

ADAL.js parses the result from AAD by calling `AuthenticationContext.handleWindowCallback(hash)` in the sign in callback page.

Check that you have a valid user and call `microsoftTeams.authentication.notifySuccess()` or `microsoftTeams.authentication.notifyFailure()` to report the status to your main tab content page.

```javascript
if (authContext.isCallback(window.location.hash)) {
    authContext.handleWindowCallback(window.location.hash);
    if (window.parent === window) {
        if (authContext.getCachedUser()) {
            microsoftTeams.authentication.notifySuccess();
        } else {
            microsoftTeams.authentication.notifyFailure(authContext.getLoginError());
        }
    }
}
```

### Handle sign out flow

Use the following code to handle sign out flow in AAD Auth:

> [!NOTE]
> While logout for Teams tab or bot is done, the current session is also cleared.

```javascript
function logout() {
localStorage.clear();
window.location.href = "@Url.Action("<<Action Name>>", "<<Controller Name>>")";
}
```
