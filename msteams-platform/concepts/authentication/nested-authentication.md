---
title: Nested app authentication
description: Learn about nested authentication in the Microsoft Teams platform.
ms.date:
ms.topic: conceptual
author: v-ypalikila
ms.author: surbhigupta
ms.localizationpriority: medium
---

# Nested app authentication

Nested app authentication (NAA) is a new authentication protocol for single page applications that are embedded in host environments like Teams, Outlook, and Microsoft 365. It simplifies the authentication process and allows the app to request specific permissions for the resources it needs. It also aligns with the web authentication using Microsoft Authentication Library (MSAL) JS.

Nested app authentication facilitates single sign-on (SSO) across applications nested within supported first-party apps. It offers enhanced security and architectural agility over traditional authentication models and the on-behalf-of flow, enabling the development of dynamic, user-focused applications.

NAA endorses an "app-in-app" model, where a primary identity encompasses one or more app identities. Microsoft utilizes this framework in:

- Office Add-Ins
- Teams Tabs and Personal apps

The following table outlines the difference between Teams Microsoft Entra ID SSO and Nested App Authentication:

| Steps | Traditional Teams Microsoft Entra ID SSO | Nested App Authentication |
| --- | --- | --- |
| Expose redirect URI | ✔️ | ✔️ * SPA redirect URI necessary |
| Register API in Microsoft Entra ID | ✔️ |  |
| Define a custom scope in Microsoft Entra ID | ✔️ |  |
| Authorize Teams client apps | ✔️ |  |
| Revise Teams manifest | ✔️ | Recommended helping IT admins in providing consent via the Admin Portal |
| Acquire access token via Teams JS SDK | ✔️ |  |
| Acquire access token via MSAL.js |  | ✔️ * Requires new msalconfig property: supportsNestedAppAuth |
| Solicit user consent for more permissions | ✔️ |  |
| Conduct an OBO exchange on the server | ✔️ |  | 

The existing authentication flow for embedded apps depends on the host environment and requires a middle tier service to do the on-behalf-of token exchange. The app also has to use the Teams JS SDK to get the token and consent to the host app's permissions.
The nested authentication flow is consistent across all host environments and doesn't require a middle tier service or the Teams JS SDK. The app only has to register its app in Microsoft Entra, configure a broker schema redirect URI, enable the native bridging in the manifest, and use MSAL JS to acquire the token and call the APIs. The app can also check the support status of nested authentication using the Teams JS SDK and provide a fallback experience for unsupported environments.

## Scenarios

| Scenario | description |
| --- | --- |
| **Consenting to SSO (and other permissions)** | Tom, a new member of the Contoso design team, needs to use Mural in Teams to collaborate on whiteboards. Upon first use, a dialog prompts Tom to grant permissions, including reading their profile for their avatar (User.Read). After tom consents, Tom can use Mural seamlessly in future meetings across devices. |
| **Reauthentication or Conditional Access step-up auth** |  Tom, while working from Australia, encounters a conditional access trigger requiring multifactor authentication (MFA) to access Mural in Teams. A dialog informs Tom of the more verification needed, leading them through the MFA process to continue using Mural. |
| **Errors** | Tom faces an error with Mural displaying an 'Oh no!' page due to an issue retrieving account information. A retry button prompts Tom to reauthenticate, only to find that the system administrator has blocked access to Mural. |


## Configure nested authentication

> [!NOTE]
> Nested authentication is in developer preview and not supported by all host environments. Developers need to check the support status using the Teams JS SDK and provide a fallback experience for unsupported environments.

To use nested authentication, follow these steps:

1. [Register their single page application](#register-your-single-page-application)
1. [Add trusted brokers](#add-trusted-brokers)
1. [Enable the native bridging](#enable-native-bridging)
1. [Initialize public client application](#initialize-public-client-application)
1. [Call an API](#call-an-api)

### Register your single-page application
You need to create a Microsoft Azure App registration for your add-in on the Azure portal. The app registration must have a name, supported account type, and SPA redirect. If your add-in requires additional app registration beyond NAA and SSO, see [Register your single-page application.](/entra/identity-platform/scenario-spa-app-registration)

### Add trusted brokers

To enable nested authentication, your application must actively configure one or more specialized redirect URIs to signal to the Microsoft identity platform that it's designed to be brokered by supported hosts. The redirect URI of the application must be of type **Single Page Application** and conform to the following scheme:

```
brk-<broker_application_id>://<your_domain>
```

Where <broker_application_id> is the app ID or alias of the broker or brokers you wish to trust and <your_domain> is the fully qualified domain name where your application is hosted. For example, **brk-multihub://contoso.com**.

For your convenience, many broker groups are preconfigured in ESTS for common scenarios.

|Group Alias  |Constituent App IDs  |
|---------|---------|
|multihub Teams T1     | 5e3ce6c0-2b1f-4285-8d4b-75ee78787346   |
|Teams T2     | 8ec6bc83-69c8-4392-8f08-b3c986009232        |
|Teams TFW     | 1fec8e78-bce4-4aaf-ab1b-5451cc387264        |
|Office on the Web     | 93d53678-613d-4013-afc1-62e9e444a0a5   |
|Office Rich Client & Outlook Mobile     | 27922004-5251-4030-b22d-91ecd9a37ea4  |
|Outlook for macOS     |  d3590ed6-52b3-4102-aeff-aad2292ab01c   |

### Enable native bridging

Configure your add-in to use nested app authentication by setting the `supportsNestedAppAuth` property to `true` in your MSAL configuration. This enables MSAL to use APIs on its native application host such as Outlook to acquire tokens for your application. If you don't set this property, MSAL uses the default JavaScript-based implementation to acquire tokens for your application, which might lead to unexpected auth prompts and unsatisfiable conditional access policies when running inside of a webview.

```javascript

// Config object to be passed to Msal on creation
const msalConfig = {
  auth: {
      clientId: "<your_app_id>",
      authority: "<https://login.microsoftonline.com/common>",
      supportsNestedAppAuth: true // Enable native bridging.
  }
};
```

### Initialize public client application

You need to initialize MSAL and get an instance of the public client application. This is used to get access tokens when needed. We recommended creating the public client application in the `Office.onReady` method.

```javascript
let pca = undefined;

// Initialize the publice client application
Office.onReady(async (info) => {
    pca = await msalBrowser.PublicClientNext.createPublicClientApplication(msalConfig);
  });
```

### Acquire your first token

The tokens acquired by MSAL.js through nested app authentication are issued for your Azure app registration ID. The MSAL.js handles token acquisition for user authentication. It tries to get an access token silently, and if that fails, it prompts the user interactively.  The token is then used to call the Microsoft Graph API.

The following steps show the pattern to use for acquiring a token:

1. Call `publicClientApplication.getActiveAccount();` to fetch the active user account from MSAL’s cache.

1. `accessTokenRequest` specifies the scopes for which the access token is requested. Nested app authentication supports incremental and dynamic consent so always request the minimum scopes needed for your code to complete its task.
1. Call `publicClientApplication.acquireTokenSilent(accessTokenRequest)` to acquire the token silently without user interaction. If `acquireTokenSilent` fails, call `publicClientApplication.acquireTokenPopup(accessTokenRequest)` to display an interactive dialog for the user. acquireTokenSilent can fail if the token expired, or the user hasn't yet consented to all of the requested scopes.

```javascript

// MSAL.js exposes several account APIs, logic to determine which account to use is the responsibility of the developer
const account = publicClientApplication.getActiveAccount();

const accessTokenRequest = {
  scopes: ["user.read"],
  account: account,
};

publicClientApplication
  .acquireTokenSilent(accessTokenRequest)
  .then(function (accessTokenResponse) {
    // Acquire token silent success
    let accessToken = accessTokenResponse.accessToken;
    // Call your API with token
    callApi(accessToken);
  })
  .catch(function (error) {
    //Acquire token silent failure, and send an interactive request
    if (error instanceof InteractionRequiredAuthError) {
      publicClientApplication
        .acquireTokenPopup(accessTokenRequest)
        .then(function (accessTokenResponse) {
          // Acquire token interactive success
          let accessToken = accessTokenResponse.accessToken;
          // Call your API with token
          callApi(accessToken);
        })
        .catch(function (error) {
          // Acquire token interactive failure
          console.log(error);
        });
    }
    console.log(error);
  });

```

If silent acquisition fails, the code checks if user interaction is required. If `acquireTokenSilent` encounters an `InteractionRequiredAuthError`, it indicates that the user must interact with a consent dialog. To ensure the user intends to open this dialog and to prevent it from appearing unexpectedly, a speed bump dialog is shown. 

After the user shows intent through the speed bump dialog, the `acquireTokenPopup` method is invoked, prompting the user to interact with the Microsoft Entra ID consent dialog.

### Call an API

 After receiving the token, you use the token to can call the API. This ensures that the API is called with a valid token, allowing for authenticated requests to be made to the server.

 The following example shows how to make authenticated requests to the Microsoft Graph API to access Microsoft 365 data:

```javascript

var headers = new Headers();
var bearer = "Bearer " + access_token;
headers.append("Authorization", bearer);
var options = {
    method: "GET",
    headers: headers
};

var graphEndpoint = "<https://graph.microsoft.com/v1.0/me>";

fetch(graphEndpoint, options)
    .then(function (response) {
        //do something with response
    });

```

### Best practices

* **Use silent authentication whenever possible**: MSAL.js provides the acquireTokenSilent method, which handles token renewal by making silent token requests without prompting the user. The method first looks for a valid cached token in the browser storage. If it doesn't find one, the library makes a silent request to Microsoft Entra and if there's an active user session (determined by a cookie set in browser on the Microsoft Entra domain), a fresh token is returned. The library doesn't automatically invoke the acquireTokenSilent method. We recommended that you call acquireTokenSilent in your app before making an API call to get the valid token.

  In certain cases, the acquireTokenSilent method's attempt to get the token fails. For example, when there's an expired user session with Microsoft Entra or a password change by the user, which requires user interaction. When the acquireTokenSilent fails, you need to call the interactive acquire token method (acquireTokenPopup).


* **Have a fallback**: While we strive to provide a high-degree of compatibility with these flows across the Microsoft ecosystem, your application might appear in down-level/legacy clients aren't updated to support NAA. In these cases, your application doesn't support seamless SSO and you might need to invoke special APIs for interacting with the user to open authentication dialogs. For more info, see [Authenticate and authorize with the Office dialog API](/office/dev/add-ins/develop/auth-with-office-dialog-api).

* If you want to use nested app authentication need to register their single page application in Microsoft Entra and configure a broker schema redirect URI. you must also enable the native bridging in the app manifest and initialize MSAL JS in the app and then acquire the token using the new nested app authentication flow and use it to call the Microsoft Graph or other APIs.

* You must check the support status of nested app authentication using the Teams JS SDK and provide a fallback experience for unsupported environments. For example, they can use the classic SSO or OBO flow for Teams mobile or Surface Hub.

* Test your application in multiple environments.
* If your application is expected to work in both WebView and browser deployments, we recommend testing your application in both of these deployment environments to ensure it behaves as you expect. Not all APIs supported in the browser work inside of WebViews.
