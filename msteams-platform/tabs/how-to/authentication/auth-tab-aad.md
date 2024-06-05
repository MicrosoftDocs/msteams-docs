---
title: Configure third party OAuth authentication
description: Learn Teams authentication tabs Microsoft Entra ID, authentication in Teams and how to use it in tabs.
ms.topic: how-to
ms.localizationpriority: medium
ms.date: 12/13/2022
---
# Configure third party OAuth IdP authentication

> [!NOTE]
> For authentication to work for your tab on mobile clients, ensure that you're using version 1.4.1 or later of the Microsoft Teams JavaScript client library (TeamsJS).

Your Microsoft Teams app might need to interact with various services, such as Facebook, Twitter, and Teams. Most of these services necessitate authentication and authorization for access. Teams stores user profile information in Microsoft Entra ID using Microsoft Graph. This article primarily focuses on using Microsoft Entra ID for authentication to access this information.

OAuth 2.0, an open standard for authentication, is utilized by Microsoft Entra ID and numerous other service providers. Understanding of OAuth 2.0 is essential when dealing with authentication in Teams and Microsoft Entra ID. The examples provided employ the OAuth 2.0 Implicit Grant flow, which retrieves the user's profile information from Microsoft Entra ID and Microsoft Graph.

The code in the article comes from the Teams sample app [Microsoft Teams Authentication Sample (Node)](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-auth/nodejs). It contains a static tab that requests an access token for Microsoft Graph, and shows the current user's basic profile information from Microsoft Entra ID.

For overview of authentication flow for tabs, see [Authentication flow in tabs](~/tabs/how-to/authentication/auth-flow-tab.md).

Authentication flow in tabs differs from authentication flow in bots.

[!INCLUDE [sdk-include](~/includes/sdk-include.md)]

<a name='configure-your-app-to-use-azure-ad-as-an-identity-provider'></a>

## Configure your app to use Microsoft Entra ID as an identity provider

OAuth 2.0 supporting identity providers do not authenticate requests from unregistered applications. Therefore, it's essential to register your applications in advance. For registering an application with Microsoft Entra ID, follow these steps:

1. Open the [Application Registration Portal](https://ms.portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade).

2. Select your app to view its properties, or select the "New Registration" button. Find the **Redirect URI** section for the app.

3. Select **Web** from the dropdown menu and update the URL to your authentication endpoint. In the TypeScript/Node.js and C# sample apps available on GitHub, the redirect URLs follow a similar pattern:

    Redirect URLs: `https://<hostname>/bot-auth/simple-start`

Replace `<hostname>` with your actual host. This host can be a dedicated hosting site such as Azure, Glitch, or a ngrok tunnel to localhost on your development machine, such as `abcd1234.ngrok.io`. If you don't have this information, ensure that you've completed or hosted your app (or the sample app). Resume this process when you have this information.

> [!NOTE]
> You can choose any third party OAuth provider, such as LinkedIn, Google, and others. The process to enable authentication for these providers is similar to using Microsoft Entra ID as a third party OAuth provider. For more information on using any third party OAuth provider, visit the website of the particular provider.

## Initiate authentication flow

> [!NOTE]
> If **Experimental third-party storage partitioning** is enabled, the third-party authentication fails. The app prompts for authentication repeatedly as the values aren’t stored locally.

Trigger the authentication flow by a user action. Avoid opening the authentication pop-up automatically, as this is likely to trigger the browser's pop-up blocker and confuse the user.

Add a button to your configuration or content page to enable the user to sign in when needed. This can be done in the tab [configuration](~/tabs/how-to/create-tab-pages/configuration-page.md) page or any [content](~/tabs/how-to/create-tab-pages/content-page.md) page.

Microsoft Entra ID, like most identity providers, doesn't allow its content to be placed in an `iframe`. This means you need to add a page to host the identity provider that is displayed inside a pop-up window by Teams client. In the following example, the page is `/tab-auth/simple-start`. Use the `authentication.authenticate()` function of the TeamsJS library to launch this page when the button is selected.

# [TeamsJS v2](#tab/teamsjs-v2)

```javascript
import { authentication } from "@microsoft/teams-js";
authentication.authenticate({
    url: window.location.origin + "/tab-auth/simple-start-v2",
    width: 600,
    height: 535})
.then((result) => {
    console.log("Login succeeded: " + result);
    let data = localStorage.getItem(result);
    localStorage.removeItem(result);
    let tokenResult = JSON.parse(data);
    showIdTokenAndClaims(tokenResult.idToken);
    getUserProfile(tokenResult.accessToken);
})
.catch((reason) => {
    console.log("Login failed: " + reason);
    handleAuthError(reason);
});
```

# [TeamsJS v1](#tab/teamsjs-v1)

```javascript
microsoftTeams.authentication.authenticate({
    url: window.location.origin + "/tab-auth/simple-start-v1",
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

---

### Notes

* The URL you pass to `authenticate()` is the start page of the authentication flow. In this example that is `/tab-auth/simple-start`. This should match what you registered in the [Microsoft Entra Application Registration Portal](https://apps.dev.microsoft.com).

* Authentication flow must start on a page that's on your domain. This domain should also be listed in the [`validDomains`](~/resources/schema/manifest-schema.md#validdomains) section of the manifest. Failure to do results in an empty pop-up.

* If you fail to use `authenticate()`, the pop-up may not close at the end of the sign-in process, causing a problem.

## Navigate to the authorization page from your pop-up page

When your pop-up page (`/tab-auth/simple-start`) is displayed the following code is run. The main goal of the page is to redirect to your identity provider so the user can sign-in. This redirection can be done on the server side using HTTP 302, but in this case it's done on the client side using a call to `window.location.assign()`. This also allows `app.getContext()` to be used to retrieve hinting information, which can be passed to Microsoft Entra ID.

# [TeamsJS v2](#tab/teamsjs-v2)

```javascript
app.getContext().then((context) => {
    // Generate random state string and store it, so we can verify it in the callback
    let state = _guid(); // _guid() is a helper function in the sample
    localStorage.setItem("simple.state", state);
    localStorage.removeItem("simple.error");

    // Go to the Azure AD authorization endpoint
    let queryParams = {
        client_id: "{{appId}}",
        response_type: "id_token token",
        response_mode: "fragment",
        scope: "https://graph.microsoft.com/User.Read openid",
        redirect_uri: window.location.origin + "/tab/simple-end",
        nonce: _guid(),
        state: state,
        // The context object is populated by Teams; the loginHint attribute
        // is used as hinting information
        login_hint: context.user.loginHint,
    };

    let authorizeEndpoint = `https://login.microsoftonline.com/${context.user.tenant.id}/oauth2/v2.0/authorize?${toQueryString(queryParams)}`;
    window.location.assign(authorizeEndpoint);
});
```

# [TeamsJS v1](#tab/teamsjs-v1)

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

---

After the user completes authorization, the user is redirected to the callback page you specified for your app at `/tab-auth/simple-end`.

### Notes

* See [get user context information](~/tabs/how-to/access-teams-context.md) for help building authentication requests and URLs. For example, you can use the user's login name as the `login_hint` value for Microsoft Entra sign-in, which means the user might need to type less. Remember that you shouldn't use this context directly as proof of identity since an attacker could load your page in a malicious browser and provide it with any information they want.
* Although the tab context provides useful information regarding the user, don't use this information to authenticate the user whether you get it as URL parameters to your tab content URL or by calling the `app.getContext()` function in the Microsoft Teams JavaScript client library (TeamsJS). A malicious actor could invoke your tab content URL with its own parameters, and a web page impersonating Microsoft Teams could load your tab content URL in an iframe and return its own data to the `getContext()` function. You should treat the identity-related information in the tab context simply as hints and validate them before use.
* The `state` parameter is used to confirm that the service calling the callback URI is the service you called. If the `state` parameter in the callback doesn't match the parameter you sent during the call, then the return call isn't verified and should be terminated.
* It isn't necessary to include the identity provider's domain in the `validDomains` list in the app's manifest.json file.

## The callback page

In the last section, you called the Microsoft Entra authorization service and passed in user and app information so that Microsoft Entra ID could present the user with its own monolithic authorization experience. Your app has no control over what happens in this experience. All it knows is what is returned when Microsoft Entra ID calls the  callback page that you provided (`/tab-auth/simple-end`).

In this page, you need to determine success or failure based on the information returned by Microsoft Entra ID and call `authentication.notifySuccess()` or `authentication.notifyFailure()`. If the login was successful, you have access to service resources.

```javascript
// Split the key-value pairs passed from Azure AD
// getHashParameters is a helper function that parses the arguments sent
// to the callback URL by Azure AD after the authorization call
let hashParams = getHashParameters();
if (hashParams["error"]) {
    // Authentication/authorization failed
    localStorage.setItem("simple.error", JSON.stringify(hashParams));
} else if (hashParams["access_token"]) {
    // Get the stored state parameter and compare with incoming state
    let expectedState = localStorage.getItem("simple.state");
    if (expectedState !== hashParams["state"]) {
        // State does not match, report error
        localStorage.setItem("simple.error", JSON.stringify(hashParams));
        authentication.notifyFailure("StateDoesNotMatch");
    } else {
        // Success -- return token information to the parent page.
        // Use localStorage to avoid passing the token via notifySuccess; instead we send the item key.
        let key = "simple.result";
        localStorage.setItem(key, JSON.stringify({
            idToken: hashParams["id_token"],
            accessToken: hashParams["access_token"],
            tokenType: hashParams["token_type"],
            expiresIn: hashParams["expires_in"]
        }));
        authentication.notifySuccess(key);
    }
} else {
    // Unexpected condition: hash does not contain error or access_token parameter
    localStorage.setItem("simple.error", JSON.stringify(hashParams));
    authentication.notifyFailure("UnexpectedFailure");
}
```

This code parses the key-value pairs received from Microsoft Entra ID in `window.location.hash` using the `getHashParameters()` helper function. If it finds an `access_token`, and the `state` value is the same as the one provided at the start of the authentication flow, it returns the access token to the tab by calling `notifySuccess()`; otherwise it reports an error with `notifyFailure()`.

### Notes

`NotifyFailure()` has the following predefined failure reasons:

* `CancelledByUser` the user closed the pop-up window before completing the authentication flow.

  > [!NOTE]
  > We recommend not to use `same-origin` or `same-origin-allow-popups` values for `Cross-Origin-Opener-Policy` response header on the login pages, as it disrupts the connection to the parent window and causes the authenticate API call to return prematurely with a `CancelledByUser` error.

* `FailedToOpenWindow` the pop-up window couldn't be opened. When running Microsoft Teams in a browser, this typically means that the window was blocked by a pop-up blocker.

If successful, you can refresh or reload the page and show content relevant to the now-authenticated user. If authentication fails, it displays an error message.

Your app can set its own session cookie so that the user need not sign in again when they return to your tab on the current device.

> [!NOTE]
>
> * Chrome 80, scheduled for release in early 2020, introduces new cookie values and imposes cookie policies by default. It's recommended that you set the intended use for your cookies rather than rely on default browser behavior. *See* [SameSite cookie attribute (2020 update)](../../../resources/samesite-cookie-update.md).
> * To obtain the appropriate token for Microsoft Teams Free and guest users, ensure your apps utilize the tenant-specific endpoint `https://login.microsoftonline.com/**{tenantId}**`. You can acquire the tenantId from the bot message or tab context. If your apps use `https://login.microsoftonline.com/common`, users might receive incorrect tokens, causing them to log into the "home" tenant rather than the tenant they are currently signed into.

For more information on single sign-on (SSO), see the article [Silent authentication](~/tabs/how-to/authentication/auth-silent-AAD.md).

## Code sample

Sample code showing the tab authentication process using Microsoft Entra ID:

| Sample name | Description | .NET| Node.js | Manifest |
|---------------|---------------|------|--------------|--------------|
| Tab SSO |This sample app shows Microsoft Entra SSO for tabs in Teams.| [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-sso/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/tab-sso/nodejs), </br>[Teams Toolkit](../../../toolkit/visual-studio-code-tab-sso.md)| NA |
| Tab, Bot, and Message Extension (ME) SSO | This sample shows SSO for Tab, Bot, and ME- search, action, link unfurl. |  [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-sso/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-sso/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-sso/csharp/demo-manifest)|

## See also

* [Plan user authentication](../../../concepts/design/understand-use-cases.md)
* [Design your tab for Microsoft Teams](~/tabs/design/tabs.md)
* [Silent authentication](~/tabs/how-to/authentication/auth-silent-aad.md)
* [Add authentication to your message extension](~/messaging-extensions/how-to/add-authentication.md)
* [Single sign-on (SSO) support for bots](~/bots/how-to/authentication/auth-aad-sso-bots.md)
