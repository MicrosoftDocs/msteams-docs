---
title: Silent authentication and SSO
description: Describes silent authentication (SSO)
keywords: teams authentication SSO silent AAD
ms.date: 01/10/2018
---
# Silent authentication

Single sign-on (SSO) is achieved while using Azure Active Directory (AAD) using silent authentication.

If you want to keep your code completely client-side, you can use the [Azure Active Directory Authentication Library](https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-authentication-libraries) for JavaScript to attempt to acquire an Azure AD access token silently. This means that the user may never see a popup dialog.

Even though the ADAL.js library is optimized for working with AngularJS applications, it's certainly usable from pure JavaScript single-page applications.

## How silent authentication works

The ADAL.js library creates a hidden iframe for OAuth implicit grant flow, but it specifies *prompt=none* so that AAD never shows the login page. If user interaction is required because the user needs to log in or grant access to the application, Azure AD will immediately return an error that ADAL.js reports to your app. At this point your app can show a login button.

## How to do silent authentication

The code in this article comes from the Teams sample app [Teams sample complete node](https://github.com/OfficeDev/microsoft-teams-sample-complete-node).

To start, include the ADAL.js library in your tab pages and configure ADAL with your client ID and redirect URL:

```html
<script src="https://secure.aadcdn.microsoftonline-p.com/lib/1.0.15/js/adal.min.js" integrity="sha384-lIk8T3uMxKqXQVVfFbiw0K/Nq+kt1P3NtGt/pNexiDby2rKU6xnDY8p16gIwKqgI" crossorigin="anonymous"></script>
<script type="text/javascript">
    // ADAL.js configuration
    let config = {
        clientId: "YOUR_APP_ID_HERE",
        // redirectUri must be in the list of redirect URLs for the AAD app
        redirectUri: window.location.origin + "/tab-auth/silent-end",
        cacheLocation: "localStorage",
        navigateToLoginRequestUrl: false,
    };
</script>
```

In the tab's content page Call `microsoftTeams.getContext()` to get the current user's UPN. Note that we won't be relying on the value reported in the context but use it as a login_hint in the call to Azure AD.

```js
// Set up extra query parameters for ADAL
// - openid and profile scope adds profile information to the id_token
// - login_hint provides the expected user name
if (upn) {
    config.extraQueryParameters = "scope=openid+profile&login_hint=" + encodeURIComponent(upn);
} else {
    config.extraQueryParameters = "scope=openid+profile";
}
```

If ADAL has an unexpired token cached for the user, use that. Otherwise, attempt to get a token silently. Call `_renewIdToken(callback)` for an id token, or `_renewToken(resource, callback)` for an access token. ADAL.js will call your callback function with the requested token, or an error if authentication fails.

If you get an error in the callback function, show a login button and fall back to an explicit login.

```js
let authContext = new AuthenticationContext(config); // from the ADAL.js library
// See if there's a cached user and it matches the expected user
let user = authContext.getCachedUser();
if (user) {
    if (user.userName !== upn) {
        // User doesn't match, clear the cache
        authContext.clearCache();
    }
}

// Get the id token (which is the access token for resource = clientId)
let token = authContext.getCachedToken(config.clientId);
if (token) {
    showProfileInformation(token);
} else {
    // No token, or token is expired
    authContext._renewIdToken(function (err, idToken) {
        if (err) {
            console.log("Renewal failed: " + err);
            // Failed to get the token silently; show the login button
            showLoginButton();
            // You could attempt to launch the login popup here, but in browsers this could be blocked by
            // a popup blocker, in which case the login attempt will fail with the reason FailedToOpenWindow.
        } else {
            showProfileInformation(idToken);
        }
    });
}
```

Let ADAL.js take care of parsing the result from Azure AD by calling `AuthenticationContext.handleWindowCallback(hash)` in the login callback page.

Check that we have a valid user and call `microsoftTeams.authentication.notifySuccess()` or `microsoftTeams.authentication.notifyFailure()` to report status back to your main tab content page.

```js
 if (authContext.isCallback(window.location.hash)) {
  authContext.handleWindowCallback(window.location.hash);
  if (authContext.getCachedUser()) {
      microsoftTeams.authentication.notifySuccess();
  } else {
      microsoftTeams.authentication.notifyFailure(authContext.getLoginError());
  }
}
```
