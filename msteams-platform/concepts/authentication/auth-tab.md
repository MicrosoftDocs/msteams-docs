---
title: Authentication for tabs using Azure Active Directory
description: Describes authentication in Teams and how to use it in your tabs
keywords: teams authentication tabs AAD
ms.date: 01/10/2018
---
# Authenticate a user in a Microsoft Teams tab

There are many services that you may wish to consume inside your Teams app, and most of those services require authentication to get access to the service. Services include Facebook, Twitter, and of course Teams. Users of Teams have user profile information stored in Azure Active Directory (AAD), and this article will focus on authentication using AAD for authentication to get access to this information.

OAuth is an open standard for authorization used by AAD and many other service providers for authentication. Understanding OAuth is a prerequisite for working with authentication in Teams and AAD. The examples below use the OAuth2 Implicit Grant flow to read the user's profile information.

The code in this article comes from the Teams sample app [Teams sample complete node](https://github.com/OfficeDev/microsoft-teams-sample-complete-node). It contains a static tab that requests an access token for Microsoft Graph and shows the current user's basic profile information from Azure AD.

## Changes to authentication flow in Teams

To address a security concern, changes have been made to tab authentication flow.

Before the July 2017 update tabs were allowed to open an authentication window to any arbitrary domain and listen to messages from that window as if they came from the domain of the tab content frame. This is no longer permitted.

Developers used this behavior to do things like launch an authentication pop-up directly to Azure Active Directory (Azure AD), redirect back to their tab content's domain, and then call `notifySuccess`. Although this was a legitimate scenario, it also would allow a pop-up to a phishing site.

The recommended approach is to direct the authentication pop-up to a page on your domain, redirect to Azure AD (or other sign-in provider), and then redirect back to your domain as usual. Basically, the authentication pop-up must start and end on your domain.

Because `navigateCrossDomain` isn't supported in the authentication window, we recommend that your authentication start and end domains are the same as your content domain and listed in the manifest's `validDomains` list.

## Treat tab context as hints

Although the tab context provides useful information regarding the user, don't use this information to authenticate the user whether you get it as URL parameters to your tab content URL or by calling the microsoftTeams.getContext() function in the Microsoft Teams client SDK. A malicious actor could invoke your tab content URL with its own parameters, and a web page impersonating Microsoft Teams could load your tab content URL in an iframe and return its own data to the getContext() function. You should treat the identity-related information in the tab context simply as hints and validate them before use.

## Configure an Azure Active Directory application

Most service providers require you to register your application with their service before you can authenticate and consume service resources. To do this with AAD follow these steps:

1. Open the [Application Registration Portal](https://apps.dev.microsoft.com/), click on *Add an app* and follow the steps to register your app. If your app has already been registered (for example if you have previously registered a bot in your app) locate your app.

2. Select your app to view it's properties. Find the *Platforms* section for the app and select *Add Platform*.

![View team](~/assets/images/authentication/AppRegistration.png)

3. From the *Add Platform* dialog select *Web*.

![View team](~/assets/images/authentication/AddPlatform.png)

4. The *Add Platform* section of the app properties page will now look something like this:

![View team](~/assets/images/authentication/Platforms.png)

Add the redirect and logout URLs in the Web section of Platforms. For the TypeScript/Node.js and C# sample apps on GitHub, the redirect URLs will be similar to this:

* Redirect URLs: https://yourhost/tab-auth/simple-start
* Logout URL: https://yourhost/tab-auth/silent-end

Where "yourhost" is replaced by your actual host. This might be a dedicated hosting site, Glitch or an ngrok redirect to localhost on your development machine. You may not have this information yet if you have not completed or hosted your app (or the sample app mentioned above), but you can always return to this page when that information is known.

## Call the authentication provider

Usually authentication flow is triggered by a user action. You should not drive the authentication pop-up automatically because this is likely to trigger the browser's pop-up blocker as well as confuse the user.

### Add UI to start authentication

Add a button to your configuration or content page to enable the user to sign in when needed. This can be done from Tab [configuration](~/concepts/tabs/tabs-configuration) and [content](~/concepts/tabs/tabs-content) pages run in iframes. Since AAD requires your app to authenticate the user in a pop-up window use the microsoftTeams.authenticate() function of the Microsoft Teams client SDK to launch a popup that will host the authentication flow.

```js
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

Notes:

The URL you pass to microsoftTeams.authenticate() is the start page of the authentication flow. The URL in this example, "/tab-auth/simple-start" should match what you registered in the previous step with the authentication provider.

Authentication flow must start on a page that's on your domain; don't start it by going directly to your identity provider's login or consent page. In this example, even though we're using Azure AD, we begin at /tab-auth/simple-start rather than going directly to the Azure AD endpoint at https://login.microsoftonline.com. If you skip this step, the login popup may fail to close when you call notifySuccess() or notifyFailure().

Add the domain of your authentication redirect URL to the [`validDomains`](~/resources/schema/manifest-schema#validdomains) section of the manifest. Failure to do so might result in an empty pop-up.

### Create the page /tab-auth/simple-start

This page simply launches the pop-up window in which authorization happens. Within this authorization page redirect to your identity provider so the user can sign in. This redirection can be done on the server side using HTTP 302, or on the client side using JavaScript to call window.location.assign(). The following code uses the client side option, and also uses microsoftTeams.getContext to retrieve hinting information.

```js
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
        resource: "https://graph.microsoft.com/User.Read openid",
        redirect_uri: window.location.origin + "/tab-auth/simple-end",
        nonce: _guid(),
        state: state,
        // The context object is populated by Teams; the upn attribute
         // is used as hinting information
        login_hint: context.upn,
    };
    let authorizeEndpoint = "https://login.microsoftonline.com/common/oauth2/authorize?" + toQueryString(queryParams);
    window.location.assign(authorizeEndpoint);
});
```

After the user completes authentication, the pop-up window is redirected to the callback page you specified for your app at "/tab-auth/simple-end".

Notes:

See [get user context information](~/concepts/tabs/tabs-context) for help building authentication requests and URLs. For example, you can use the user's name (upn) as the *login_hint* value for Azure AD sign-in, which means the user might need to type less. Remember that you should *not* use this context directly as proof of identity since an attacker could load your page in a malicious browser and provide it with any information they want.

The *state* parameter is used to confirm that the service calling the callback URI is the service you called. If the *state* parameter in the callback does not match the parameter you sent during the call the return call is not verified and should be terminated.

The `microsoftTeams.navigateCrossDomain()` function is not available in the context of the authentication popup. As a result, it is not necessary to include the identity provider's domain in the *validDomains* list in the app's manifest.json file.

## Sign in and authenticate the user

In the last section you called the AAD authentication service and passed in user and app information so that AAD could present the user with it's own monolithic authentication experience. Your app has no control over what happens in this experience. All it knows is what is returned by AAD when the callback that you provided ("/tab-auth/simple-end") is called.

### Create the callback page

In this page you need to determine success or failure based on the information returned by AAD and call the `microsoftTeams.authentication.notifySuccess()` or `microsoftTeams.authentication.notifyFailure()` functions from the Microsoft Teams client SDK.

````js
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

This code parses the key-value pairs received from Azure AD in window.location.hash using the getHashParameters() helper function. If it finds an *access_token*, and the *state* value is the same as the one provided at the start of the authentication flow, it returns the access token to the tab by calling notifySuccess(); otherwise it reports an error with notifyFailure().

Notes:
NotifyFailure() has the following predefined failure reasons:

* *CancelledByUser* - the user closed the popup window before completing the authentication flow.
* *FailedToOpenWindow* - the popup window could not be opened. When running Microsoft Teams in a browser, this typically means that the window was blocked by a popup blocker.

If successful, you can refresh or reload the page and show content relevant to the now-authenticated user. If authentication fails, display an error message.

Your app can set its own session cookie so that the user need not sign in again when they return to your tab on the current device.

For more information on Single Sign-On (SSO) see the article [Silent authentication](~/concepts/authentication/auth-silent).

For more information on using AAD authentication outside of a web context (in bots or in mobile) see [Authentication for bots (AAD)](~/concepts/authentication/auth-bot)

For sample code showing the authentication process using AAD see:
* [Teams sample complete node](https://github.com/OfficeDev/microsoft-teams-sample-complete-node)
* [Teams sample complete csharp](https://github.com/OfficeDev/microsoft-teams-sample-complete-csharp)