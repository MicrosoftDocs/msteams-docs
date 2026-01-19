---
title: SSO authentication for nested apps
description: Learn how to implement, configure nested app authentication in Microsoft Teams app. Learn about the use case scenarios for nested app authentication.
ms.date: 06/10/2025
ms.topic: conceptual
author: surbhigupta
ms.author: surbhigupta
ms.localizationpriority: medium
---

# Nested app authentication

> [!NOTE]
>
> Nested app authentication (NAA) is supported only in single-page application (SPA), such as tabs.

NAA introduces an authentication protocol for SPAs embedded in host environments such as Teams, Outlook, and Microsoft 365. It simplifies authentication and facilitates single sign-on (SSO) across apps nested within supported host apps. The NAA model uses a primary identity for the host app that can include multiple app identities for nested apps. Microsoft utilizes this model in Teams tabs, personal apps, and Office Add-ins.

The NAA model offers several advantages over the On-Behalf-Of (OBO) flow:

* NAA requires use of only MSAL.js. You don't need to use `getAuthToken` from the Teams JavaScript client library (TeamsJS).
* You can call services such as Microsoft Graph with an access token directly from client code without requiring a middle-tier server.
* You can use incremental and dynamic consent for scopes (permissions).
* You don't need to preauthorize hosts such as Teams or Microsoft 365 to call your endpoints.

    The following table outlines differences between Teams Microsoft Entra SSO and NAA:

    | Steps required for development | Traditional Teams Entra SSO | NAA |
    | --- |:---:|:---:|
    | Expose redirect URI | Required | Required |
    | Register API in Microsoft Entra ID | Required |  |
    | Define a custom scope in Microsoft Entra ID | Required |  |
    | Authorize Teams client apps | Required |  |
    | Revise app manifest (previously called Teams app manifest) | Required | Recommended* |
    | Acquire access token through TeamsJS SDK | Required |  |
    | Solicit user consent for more permissions | Required |  |
    | Conduct an OBO exchange on the server | Required |  |

* The IT admin might block the app or consent to only certain permissions for the app in Microsoft Entra ID. To avoid this, include the app ID and default resource in the app manifest so that the admin can approve the permissions in Teams admin center.

## Use cases for NAA

| Scenario | Description |
| --- | --- |
| **Consenting to SSO (and other permissions)** | Tom, a new member of Contoso design team, needs to use Contoso app in Teams meetings to collaborate on whiteboards. Upon first use, a dialog prompts Tom to grant permissions, including reading their profile for their avatar (User.Read). After consent, Tom can use Contoso seamlessly in future meetings across devices. |
| **Reauthentication or Conditional Access step-up auth** | While working from Australia, Tom encounters a conditional access trigger that requires multifactor authentication (MFA) to access Contoso in Teams. A dialog informs Tom that more verification is needed, prompting them through the MFA process to continue using Contoso. |
| **Errors** | Tom experiences a sign-in error with Contoso due to an issue retrieving account information. A retry button prompts for reauthentication, but Tom discovers that the system administrator has restricted access to Contoso. |

## Configure NAA

To configure nested authentication, follow these steps:

1. [Register your SPA](#register-your-spa)
1. [Add trusted brokers](#add-trusted-brokers)
1. [Initialize public client app](#initialize-public-client-app)
1. [Acquire your first token](#acquire-your-first-token)
1. [Call an API](#call-an-api)

### Register your SPA

Create a Microsoft Entra ID app registration for your add-in on Azure portal. The app registration requires a name, supported account type, and SPA redirect. Upon registering your app, Azure portal generates a Microsoft Entra app registration ID.
If your add-in requires additional app registration beyond NAA and SSO, see [register your single-page application.](/entra/identity-platform/scenario-spa-app-registration).

### Add trusted brokers

For nested app authentication, actively configure a redirect URI to indicate that your app can be brokered by supported hosts. The redirect URI must be of type **Single-page application** and conform to the following scheme:

```
brk-multihub://<your_domain>
```

Where,

* `brk-multihub` enables authentication to be brokered by any Microsoft 365 supported host configured to run the app such as Teams, Outlook, or Microsoft365.com.
* <your_domain> represents the fully qualified domain name hosting your app. For example, **brk-multihub://contoso.com**.

<!--If your app has been upgraded to run in Outlook and Microsoft365.com (in addition to Teams), then you need to only add one redirect URI:

```http
brk-multihub://<your_domain>
```
-->
Your domain must include only the origin, not its subpaths. For example:

✔️ brk-multihub://myapp.teams.microsoft.com <br>
❌ brk-multihub://myapp.teams.microsoft.com/go

For additional information on upgrading your Teams app to run in Outlook and Microsoft365.com, see
[extend Teams apps across Microsoft 365](../../m365-apps/overview.md).

### Initialize public client app

> [!NOTE]
> To ensure successful authentication, initialize TeamsJS before initializing MSAL.

Initialize MSAL and obtain an instance of the public client app to retrieve access tokens when needed.

```JavaScript
import {
  AccountInfo,
  IPublicClientApplication,
  createNestablePublicClientApplication,
} from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: "your_client_id",
    authority: "https://login.microsoftonline.com/{your_tenant_id}",
    supportsNestedAppAuth: true
  },
};

let pca: IPublicClientApplication;

export function initializePublicClient() {
  console.log("Starting initializePublicClient");
  return createNestablePublicClientApplication(msalConfig).then(
    (result) => {
      console.log("Client app created");
      pca = result;
      return pca;
    }
  );
}
```

### Acquire your first token

MSAL.js acquires tokens for nested app authentication that are issued for your Microsoft Entra app registration ID. MSAL.js manages token acquisition for user authentication by first attempting to obtain an access token silently. If unsuccessful, it prompts the user for consent. The token then calls the Microsoft Graph API or other Microsoft Entra ID protected resources. Unlike the OBO flow, your hosts do not need preauthorization to call the endpoints.

To acquire a token, follow these steps:

1. Use MSAL.js to acquire tokens for your app ID. For more information, see [acquire and use an access token](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/acquire-token.md).

1. Use `getActiveAccount` API to verify an active account exists to call `publicClientApplication`. If no active account exists, try to retrieve one from the cache using `getAccount` with additional filter parameters such as `tenantID`, `homeAccountId`, and `loginHint` from [Context interface](../../tabs/how-to/using-teams-client-library.md#updates-to-the-context-interface).

   > [!NOTE]
   > The `homeAccountId` property is equivalent to `userObjectId` in TeamsJS.

1. Call `publicClientApplication.acquireTokenSilent(accessTokenRequest)` to silently acquire the token without user interaction. The `accessTokenRequest` specifies the scopes for which the access token is requested. NAA supports incremental and dynamic consent. Always request the minimum scopes needed for your code.

1. If no account is available, MSAL.js returns an `InteractionRequiredAuthError`. Call `publicClientApplication.acquireTokenPopup(accessTokenRequest)` to display an interactive dialog for the user. Note that `acquireTokenSilent` may fail if the token expired or if the user did not consent to all requested scopes.

    The following code snippet shows an example to access a token:

    ```JavaScript
    
      // MSAL.js exposes several account APIs; logic to determine which account to use is the responsibility of the developer
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
          // Acquire token silent failure; send an interactive request
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

### Call an API

After receiving the token, use it to call the API. This ensures that the API receives a valid token for authenticated requests.

The following example shows how to make an authenticated request to Microsoft Graph API to access Microsoft 365 data:

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

## Token prefetching for nested app authentication (NAA)

To improve performance and reduce authentication latency, NAA supports token prefetching. This feature enables the host to proactively acquire authentication tokens before the app launches, allowing faster access to protected resources.

#### How to Enable Token Prefetching

To enable token prefetching, update your [Teams app manifest](/microsoft-365/extensibility/schema/root-web-application-info-nested-app-auth-info) to version 1.22 or later and include the `nestedAppAuthInfo` section inside `webApplicationInfo`.

 ```json
{
  "webApplicationInfo": {
    "id": "33333ddd-0000-0000-0000-88888757bbbb",
    "resource": "api://app.com/botid-33333ddd-0000-0000-0000-88888757bbbb",
    "nestedAppAuthInfo": [
      {
        "redirectUri": "brk-multihub://app.com",
        "scopes": ["openid", "profile", "offline_access"],
        "claims": "{\"access_token\":{\"xms_cc\":{\"values\":[\"CP1\"]}}}"
      }
    ]
  }
}
 ```

> [!important]
>
> * The value of webApplicationInfo.id must match the client ID of the app's Microsoft Entra ID registration. This is the same client ID the app uses when making actual NAA token requests. The host uses this ID to initiate the token prefetch process.
> * The values in webApplicationInfo.id and all fields inside nestedAppAuthInfo must exactly match the parameters used in the app’s runtime NAA token request. Any mismatch, such as differences in scopes, redirect URIs, or claims, will prevent the host from serving the token from cache.
> * Prefetched tokens store in memory for a short duration and are intended for use only during the app’s initial load. If the app attempts to fetch a token later, such as in response to a user action, the prefetched token may no longer be available. In such cases, the app must initiate a new token request using standard authentication flows.

#### How it works

When token prefetching is enabled, the host environment attempts to acquire and cache the required tokens before the app is rendered. These tokens store in memory and become immediately available to the app upon launch.

This behavior resembles the prefetch capability in the legacy Teams SSO model, where the `getAuthToken` API automatically triggers during tab load. With NAA, this functionality enters through manifest configuration, improving performance without requiring a backend token exchange.

#### Benefits of Token Prefetching in NAA

* Improve performance by reducing authentication delays during app startup
* Enable single sign-on (SSO) across nested apps without repeated sign-ins

> [!NOTE]
> Token prefetching currently supports only Microsoft Teams web and desktop clients.

### Best practices

* **Use silent authentication whenever possible**:
  MSAL.js provides the `acquireTokenSilent` method, which handles token renewal by making silent token requests without prompting the user. The method first looks for a valid cached token in browser storage. If none exists, the library makes a silent request to Microsoft Entra ID and, if an active user session exists (as determined by a cookie on Microsoft Entra domain), Microsoft Entra ID returns a fresh token. The library doesn't automatically invoke the `acquireTokenSilent` method. Call `acquireTokenSilent` in your app before making an API call to retrieve a valid token.

  In certain situations, the attempt to get a token using `acquireTokenSilent` fails. For example, when an expired user session exists with Microsoft Entra ID or after a password change by the app user, `acquireTokenSilent` fails. In such cases, call the interactive acquire token method (`acquireTokenPopup`).

* **Have a fallback**:
  NAA flows offer compatibility across the Microsoft ecosystem. However, your app might appear in down-level or legacy clients that don't support NAA. In these instances, your app can't support seamless SSO, and you might need to invoke special APIs for interacting with the user to open authentication dialogs. For more information, see [enable SSO for tab app](../../tabs/how-to/authentication/tab-sso-overview.md).

  > [!NOTE]
  > Avoid using NAA if your identity provider isn't Microsoft Entra; instead, use pop-up authentication.

* **Support for NAA**: NAA might not support all host app environments. To verify if the current client supports this feature, invoke the specified API. A return value of `true` indicates NAA support, while `false` suggests otherwise.

* **Test your app in multiple environments**: If your app needs to work in both web view and browser deployments, test it in both environments to ensure it behaves as expected. Certain APIs that function in a browser might not operate within web views.

## Code sample

| Sample name                   | Description | .NET    | Node.js   |
|:------------------------------|:-----------|:--------|:---------|
| Nested app authentication     | This sample showcases Microsoft Entra single sign-on (SSO) within a Microsoft Teams tab, utilizing the On-Behalf-Of (OBO) flow to call Microsoft Graph API on behalf of the user. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-nested-auth/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-nested-auth/nodejs) |

## See also

* [Microsoft identity platform and OAuth 2.0 On-Behalf-Of flow](/entra/identity-platform/v2-oauth2-on-behalf-of-flow)
* [Caching in MSAL](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/caching.md)
* [Introducing Nested App Authentication: An improved authentication protocol for your Teams app](https://devblogs.microsoft.com/microsoft365dev/introducing-nested-app-authentication-an-improved-authentication-protocol-for-your-teams-app/)