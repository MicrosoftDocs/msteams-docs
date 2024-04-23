---
title: Nested authentication
description: Learn about nested authentication in the Microsoft Teams platform.
ms.date: 04-23-2024
ms.topic: conceptual
author: v-ypalikila
ms.author: surbhigupta
ms.localizationpriority: medium
---

# Nested authentication

Nested authentication is a new authentication protocol for single page applications that are embedded in host environments like Teams, Outlook, and Harmony. It simplifies the authentication process and allows the app to request specific permissions for the resources it needs. It also aligns with the web authentication using MSAL JS, which many apps already use.

The existing authentication flow for embedded apps depends on the host environment and requires a middle tier service to do the on-behalf-of token exchange. The app also has to use the Teams JS SDK to get the token and consent to the host app's permissions.
The nested authentication flow is consistent across all host environments and does not require a middle tier service or the Teams JS SDK. The app only has to register its app in Azure AD, configure a broker schema redirect URI, enable the native bridging in the manifest, and use MSAL JS to acquire the token and call the APIs. The app can also check the support status of nested authentication using the Teams JS SDK and provide a fallback experience for unsupported environments.

## Configure nested authentication

> [!NOTE]
> Nested authentication is in developer preview and not supported by all host environments. Developers need to check the support status using the Teams JS SDK and provide a fallback experience for unsupported environments.

To use nested auth, developers need to follow these steps:

* Register their single page application in Azure AD and configure the app registration with a broker schema redirect URI. This enables the app to be brokered by the host environments. 12
* Enable the native bridging in the app manifest by setting the supportsNestedAppAuth property to true. This allows the app to communicate with the host environment. 3
* Initialize MSAL JS in the app and acquire the token using the new nested authentication flow. This will prompt the user to consent to the app's permissions and return a token with the requested scopes. 4
* Use the token to call the Microsoft Graph or other APIs that the app needs.

• Migration: Developers who want to use nested app authentication need to register their single page application in Azure AD and configure a broker schema redirect URI. They also need to enable the native bridging in the app manifest and initialize MSAL JS in the app. They can then acquire the token using the new nested app authentication flow and use it to call the Microsoft Graph or other APIs.
• Fallback: Developers need to check the support status of nested app authentication using the Teams JS SDK and provide a fallback experience for unsupported environments. For example, they can use the classic SSO or OBO flow for Teams mobile or Surface Hub.

### Register your single-page application

[Register your single-page application](/entra/identity-platform/scenario-spa-app-registration)

### Add trusted brokers

To enable NAA, your application must configure one or more specialized redirect URIs that indicate to the Microsoft identity platform that your application allows itself to be brokered by supported hosts.
The redirect_uri of the application must be of type Single Page Application and conform to the following scheme.
• brk-<broker_application_id>://<your_domain>
Where <broker_application_id> is the app id or alias of the broker or brokers you wish to trust and <your_domain> is the fully-qualified domain name where your application is hosted.
Example: brk-multihub://contoso.com
For your convenience, a number of broker groups are preconfigured in ESTS for common scenarios.
Group Alias Constituent App IDs

multihub Teams T1 - 5e3ce6c0-2b1f-4285-8d4b-75ee78787346
Teams T2 - 8ec6bc83-69c8-4392-8f08-b3c986009232
Teams TFW - 1fec8e78-bce4-4aaf-ab1b-5451cc387264
Office on the Web - 93d53678-613d-4013-afc1-62e9e444a0a5
Office Rich Client & Outlook Mobile - 27922004-5251-4030-b22d-91ecd9a37ea4
Outlook for macOS - d3590ed6-52b3-4102-aeff-aad2292ab01c

### Enable Native Bridging in your config

```javascript

// Config object to be passed to Msal on creation
const msalConfig = {
  auth: {
      clientId: "<your_app_id>",
      authority: "<https://login.microsoftonline.com/common>",
      supportsNestedAppAuth: true // Enable native bridging.
  }
};

// Create your library instance
PublicClientApplication.createPublicClientApplication(msalConfig)
    .then((result) => {
        // Start acquiring tokens
    });
```

### Acquire your first token

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

If a user is required to interact with an AAD consent dialog (acquireTokenPopup), then they will/may first be shown a speed bump dialog. This is to ensure that user has shown intent to open the AAD window and to prevent the window from randomly appearing on the users screen.

### Call an API

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

* Use silent authentication whenever possible
* MSAL.js provides the acquireTokenSilent method which handles token renewal by making silent token requests without prompting the user. The method first looks for a valid cached token in the browser storage. If it does not find one, the library makes the silent request to Azure AD and if there is an active user session (determined by a cookie set in browser on the Azure AD domain), a fresh token is returned. The library does not automatically invoke the acquireTokenSilent method. It is recommended that you call acquireTokenSilent in your app before making an API call to get the valid token.
* In certain cases, the acquireTokenSilent method's attempt to get the token fails. Some examples of this are when there is an expired user session with Azure AD or a password change by the user, etc. which requires user interaction. When the acquireTokenSilent fails, you need to call the interactive acquire token method (acquireTokenPopup).
* Have a fallback when NAA is not supported
* While we strive to provide a high-degree of compatibility with these flows across the Microsoft 1P ecosystem, your application may appear in down-level/legacy clients that have not been updated to support NAA. In these cases, your application will not support seamless SSO and you may need to invoke special APIs for interacting with the user to open authentication dialogs. For more info, see Authenticate and authorize with the Office dialog API.
* Test your application in multiple environments
* If your application is expected to work in both WebView and browser deployments, we recommend testing your application in both of these deployment environments to ensure it behaves as you expect. Not all APIs supported in the browser work inside of WebViews.
