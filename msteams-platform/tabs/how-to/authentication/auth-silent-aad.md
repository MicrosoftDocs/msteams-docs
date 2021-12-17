---
title: Silent authentication
description: Describes silent authentication
ms.topic: conceptual
ms.localizationpriority: medium
keywords: teams authentication SSO silent AAD
---
# Silent authentication

Silent authentication in Azure Active Directory (AAD) minimizes the number of times users enter their sign-in credentials by silently refreshing the authentication token. For true single sign-on support, see [SSO documentation](~/tabs/how-to/authentication/auth-aad-sso.md).

> [!NOTE]
> For authentication to work for your tab on mobile clients, ensure that you're using at least 1.4.1 version of the Teams JavaScript SDK.

To keep your code client-side, use the [AAD authentication library](/azure/active-directory/develop/active-directory-authentication-libraries) for JavaScript to get an AAD access token silently. If the user has signed in recently, they won't see a popup dialog box.

The ADAL.js library is optimized for AngularJS applications, but it also works with pure JavaScript single-page applications.

> [!NOTE]     
> For authentication to work for your tab on mobile clients, you must use v1.4.1 and later of the Teams JavaScript SDK.
> Currently, silent authentication only works for tabs. It does not work when signing in from a bot.

## How silent authentication works

The ADAL.js library creates a hidden iframe for OAuth 2.0 implicit grant flow. The library specifies `prompt=none`, and Azure AD never shows the sign-in page. When the user needs to sign in or grant access to the application, the user interaction is required, and AAD immediately returns an error. The ADAL.js reports the error to your app and your app shows a sign-in button.

## How to do silent authentication

For silent authentication in tabs, use [Teams authentication sample node](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/app-auth/nodejs/src/views/tab/silent/silent.hbs) from the Teams sample app.

### Create and register your AAD application

The following steps will help you to create and register your application in AAD.

1. Register a new application in the [AAD – App Registrations](https://go.microsoft.com/fwlink/?linkid=2083908) portal.

1. Select **New Registration**. The **Register an application** page appears.

    ![New registration](~/assets/images/authentication/SSO-bots-auth/app-registration.png)

1. In the **Register an application**, do the following steps:

   > [!NOTE]
   >
   > The users are not asked for consent and are granted access tokens right away, if the AAD app is registered in the same tenant where they are making an authentication request in Teams. However, the users must provide consent to the permissions, if the AAD app is registered in a different tenant.

    * Enter **Name** for your app.
    * Select **Supported account types**, such as single tenant or multitenant.
    * Select **Register**.

1. Select the **Supported account types**
    * Select **Single tenant** or **Multitenant**. 
    * Leave**Redirect URI** empty.

1. Select **Register**.
1. Go to overview page.
1. Copy the value of **Application (client) ID**.
1. Under **Manage**, go to **Expose an API**


   > [!TIP]
   > To update your app manifest later, save the **Application (client) ID** value.

   > [!NOTE]
   > If you are building an app with a bot and a tab, enter the Application ID URI as `api://fully-qualified-domain-name.com/botid-{YourBotId}`.

1. Select **Set** to generate the Application ID URI.

   > [!Note]
   > Insert your fully qualified domain name with a forward slash "/" appended to the end, between the double forward slashes and the GUID. The entire ID must have the form of `api://fully-qualified-domain-name.com/{AppID}`². For example, `api://subdomain.example.com/00000000-0000-0000-0000-000000000000`. The fully qualified domain name is the human readable domain name from which your app is served. If you use tunneling service, such as ngrok, you must update this value whenever your ngrok subdomain changes.

1. Select **Add a scope**.
1. In the panel that prompts, enter `access_as_user` as the **Scope name**.

   >[!NOTE]
   > The "access_as_user" scope used to add a client app is for "Administrators and users".
   >
   > You must be aware of the following important restrictions:
   >
   > * Only user-level Microsoft Graph API permissions, such as email, profile, offline_access, and OpenId are supported. If you need access to other Microsoft Graph scopes, such as `User.Read` or `Mail.Read`, see [Get an access token with Graph permissions](../../../tabs/how-to/authentication/auth-aad-sso.md#get-an-access-token-with-graph-permissions).
   > * Your application's domain name must be same as the domain name that you have registered for your AAD application.
   > * Multiple domains per app are currently not supported.
   > * Applications that use the `azurewebsites.net` domain are not supported because it is common and may be a security risk.

1. In the **Who can consent?**, enter **Admins and users**.
1. Enter the following details to configure the admin and user consent prompts with values that are appropriate for the `access_as_user`scope.

     | Field | Value |
     | -------- | -------- |
     | **Admin consent display name** | Teams can access the user’s profile |
     | **Admin consent description** | Allows Teams to call the app’s web APIs as the current user. |
     | **User consent display name** | Teams can access your user profile and make requests on your behalf |
     | **User consent description** | Enable Teams to call this app’s APIs with the same rights that you have. |

1. Ensure that the state is set to **Enabled**.
1. Select **Add scope** to save the details.

     ![Admin and user](~/assets/images/authentication/add-a-scope.png)


     > [!Note]
     > The **Scope name** must automatically match the **Application ID** URI set in the previous step, with `/access_as_user` appended to the end `api://subdomain.example.com/00000000-0000-0000-0000-000000000000/access_as_user`.

1. In **Authorized client applications**, identify the applications that you want to authorize for your app’s web application.
1. Select **Add a client application**.
1. Enter each of the following client IDs and select the authorized scopes:
  * `1fec8e78-bce4-4aaf-ab1b-5451cc387264` for Teams mobile or desktop application.

     ![ID one](~/assets/images/authentication/add-client-application.png)

 * `5e3ce6c0-2b1f-4285-8d4b-75ee78787346` for Teams web application.

     ![ID two](~/assets/images/authentication/add-client-application21.png)

1. Go to **API Permissions**.

1. Select **Add a permission**.

1. Select **Microsoft Graph**.

1. Select **Delegated permissions**

1. Add the following permissions from Graph API:
    * **User.Read** (enabled by default)
    * **email**
    * **offline_access**
    * **OpenId**
    * **profile**

1. Go to **Authentication**.
    
   > [!IMPORTANT]
   > If an app hasn't been granted IT admin consent, users have to provide consent the first time they use an app.

1. In **Platform configurations**, select **Add a platform**.
1. Select **Web**.

    ![Configure platform1](~/assets/images/authentication/configure-platform1.png)

1. Enter the **Redirect URIs** for your app.

   Redirect URI: `https://ab****.ngrok.io/auth-end`

    > [!NOTE]
    > This URI is the same fully qualified domain name. It's also followed by the API route where an authentication response is sent. If you're following any of the Teams samples, the URI is `https://subdomain.example.com/auth-end`. For more information, see [OAuth 2.0 authorization code flow](/azure/active-directory/develop/v2-oauth2-auth-code-flow).

1. Select **Configure**.

### Include and configure ADAL

Include the ADAL.js library in your tab pages and configure ADAL with your client ID and redirect URL.
Use the following code to include and configure ADAL:

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

In the tab's content page, call `microsoftTeams.getContext()` to get a sign-in hint for the current user. This action is used as a `loginHint` in the call to AAD.     
Use the following code to get the user context.

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

If ADAL has a token cached for the user that hasn't expired, use that token. Alternately, you can get a token silently by calling `acquireToken(resource, callback)`. The ADAL.js calls the callback function with the requested token, or gives an error if authentication fails.

If you get an error in the callback function, show a sign-in button and fall back to an explicit sign in.    
Use the following code to authenticate:

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

ADAL.js parses the result from AAD by calling `AuthenticationContext.handleWindowCallback(hash)` in the sign-in callback page.

Check that you have a valid user and call `microsoftTeams.authentication.notifySuccess()` or `microsoftTeams.authentication.notifyFailure()` to report the status to your main tab content page.     
Use the following code to process the return value:

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
> When you logout from Teams tab or bot, the current session is cleared.

```javascript
function logout() {
localStorage.clear();
window.location.href = "@Url.Action("<<Action Name>>", "<<Controller Name>>")";
}
```

> [!NOTE]
> While sign out for Teams tab or bot is done, the current session is also cleared.

## Code sample

Sample code showing the tab authentication process using AAD:

| **Sample name** | **description** | **.NET** | **Node.js** |
|-----------------|-----------------|-------------|
| Microsoft Teams tab silent authentication | Initiate silent authentication for tab using AAD | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-channel-group-config-page-auth/csharp) |