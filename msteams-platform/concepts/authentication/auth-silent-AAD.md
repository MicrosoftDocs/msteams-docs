---
title: Silent authentication and SSO
description: Describes silent authentication (SSO)
keywords: teams authentication SSO silent AAD
ms.date: 02/28/2018
---
# Silent authentication

Silent authentication in Azure Active Directory (Azure AD) is a simplified form of single sign-on (SSO). Its purpose is to minimize the number of times a user needs to enter login credentials while using your app.

If you want to keep your code completely client-side, you can use the [Azure Active Directory Authentication Library](https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-authentication-libraries) for JavaScript to attempt to acquire an Azure AD access token silently. This means that the user may never see a popup dialog if they have signed in recently.

Even though the ADAL.js library is optimized for AngularJS applications, it also works with pure JavaScript single-page applications.

> [!NOTE]
> Currently, silent authentication only works for tabs. It does not yet work when signing in from a bot.

## How silent authentication works

The ADAL.js library creates a hidden iframe for OAuth 2.0 implicit grant flow, but it specifies `prompt=none` so that Azure AD never shows the login page. If user interaction is required because the user needs to log in or grant access to the application, Azure AD will immediately return an error that ADAL.js then reports to your app. At this point your app can show a login button if needed.

## How to do silent authentication

The code in this article comes from the Teams sample app [Microsoft Teams Authentication Sample (Node)](https://github.com/OfficeDev/microsoft-teams-sample-complete-node).

### include and configure ADAL

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

In the tab's content page, call `microsoftTeams.getContext()` to get a login hint for the current user. This will be used as a login_hint in the call to Azure AD.

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

If ADAL has an unexpired token cached for the user, use that. Otherwise, attempt to get a token silently. Call `_renewIdToken(callback)` for an id token, or `_renewToken(resource, callback)` for an access token. ADAL.js will call your callback function with the requested token, or an error if authentication fails.

If you get an error in the callback function, show a login button and fall back to an explicit login.

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

### Process the return value

Let ADAL.js take care of parsing the result from Azure AD by calling `AuthenticationContext.handleWindowCallback(hash)` in the login callback page.

Check that we have a valid user and call `microsoftTeams.authentication.notifySuccess()` or `microsoftTeams.authentication.notifyFailure()` to report status back to your main tab content page.

```javascript
if (authContext.isCallback(window.location.hash)) {
  authContext.handleWindowCallback(window.location.hash);
  if (authContext.getCachedUser()) {
      microsoftTeams.authentication.notifySuccess();
  } else {
      microsoftTeams.authentication.notifyFailure(authContext.getLoginError());
  }
}
```
