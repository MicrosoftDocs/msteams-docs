---

title: SSO authentication for nested apps description: Learn how to implement, configure nested app authentication in Microsoft Teams app. Learn about the use case scenarios for nested app authentication. ms.date: 06/10/2025 ms.topic: conceptual author: surbhigupta ms.author: surbhigupta ms.localizationpriority: medium

# Nested app authentication

> [!NOTE]
>
> Nested app authentication (NAA) is supported only in single-page application (SPA), such as tabs.

NAA is a new authentication protocol for SPAs embedded in host environments, such as Teams, Outlook, and Microsoft 365. It simplifies the authentication process to facilitate single sign-on (SSO) across apps nested within supported host apps. The NAA model supports a primary identity for the host app that includes multiple app identities for nested apps. Microsoft utilizes this model in Teams tabs, personal apps, and Office Add-ins.

The NAA model provides several advantages over the On-Behalf-Of (OBO) flow:

- NAA requires you to use only the MSAL.js library. You don't need to use the `getAuthToken` function in Teams JavaScript client library (TeamsJS).
- You can call services such as Microsoft Graph with an access token from your client code as an SPA. There’s no need for a middle-tier server.
- You can use incremental and dynamic consent for scopes (permissions).
- You don't need to preauthorize your hosts, such as Teams or Microsoft 365, to call your endpoints.

  The following table outlines the difference between Teams Microsoft Entra SSO and NAA:

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

* The IT admin might block the app or consent to only certain permissions for the app in Microsoft Entra ID. To avoid it, you must include the app ID and the default resource in the app manifest for the admin to approve the permissions in Teams admin center.

## Use cases for NAA

| Scenario | Description |
| --- | --- |
| **Consenting to SSO (and other permissions)** | Tom, a new member of the Contoso design team, needs to use the Contoso app in Teams meetings to collaborate on whiteboards. Upon first use, a dialog prompts Tom to grant permissions, including reading their profile for their avatar (User.Read). After giving consent, Tom can use Contoso seamlessly in future meetings across devices. |
| **Reauthentication or Conditional Access step-up auth** | Tom, when working from Australia, encounters a conditional access trigger requiring multifactor authentication (MFA) to access Contoso in Teams. A dialog informs Tom that more verification is needed, leading them through the MFA process to continue using Contoso. |
| **Errors** | Tom faces a sign-in error with Contoso due to an issue retrieving account information. Tom encounters a retry button that prompts for reauthentication. However, they discover that the system administrator has restricted access to Contoso. |

## Configure NAA

To configure nested authentication, follow these steps:

1. [Register your SPA](#register-your-spa)
1. [Add trusted brokers](#add-trusted-brokers)
1. [Initialize public client app](#initialize-public-client-app)
1. [Acquire your first token](#acquire-your-first-token)
1. [Call an API](#call-an-api)

### Register your SPA

You must create a Microsoft Entra ID app registration for your add-in on Azure portal. The app registration must have a name, supported account type, and SPA redirect. Following the registration of your app, Azure portal generates a Microsoft Entra app registration ID. If your add-in requires additional app registration beyond NAA and SSO, see [register your single-page application.](/entra/identity-platform/scenario-spa-app-registration).

### Add trusted brokers

To configure nested app authentication, your app must actively configure a redirect URI for your app. The redirect URI indicates to the Microsoft identity platform that your app can be brokered by supported hosts. The redirect URI of the app must be of type **Single-page application** and conform to the following scheme:

```
brk-multihub://<your_domain>
```

Where,

- `brk-multihub` enables your authentication to be brokered by any Microsoft 365 supported hosts it's configured to run in such as, Teams, Outlook, or Microsoft365.com.
- <your_domain> is the fully qualified domain name where your app is hosted. For example, **brk-multihub://contoso.com**.

<!--If your app has been upgraded to run in Outlook and Microsoft365.com (in addition to Teams), then you need to only add one redirect URI:

```http
brk-multihub://<your_domain>
```
-->
Your domain must include only the origin and not its subpaths. For example:

✔️ brk-multihub://myapp.teams.microsoft.com <br> ❌ brk-multihub://myapp.teams.microsoft.com/go

For more information on upgrading your Teams app to run in Outlook and Microsoft365.com, see [extend Teams apps across Microsoft 365](../../m365-apps/overview.md).

### Initialize public client app

> [!NOTE] > To ensure successful authentication, initialize TeamsJS before you initialize MSAL.

Initialize MSAL and get an instance of the public client app to get access tokens, when needed.

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

The tokens acquired by MSAL.js through nested app authentication are issued for your Microsoft Entra app registration ID. MSAL.js handles token acquisition for user authentication. It tries to get an access token silently. If that's unsuccessful, it prompts the user for consent. The token is then used to call the Microsoft Graph API or other Microsoft Entra ID protected resources. Unlike the OBO flow, you don't need to preauthorize your hosts to call the endpoints.

To acquire a token, follow these steps:

1. Use MSAL.js to acquire tokens for your app ID. For more information, see [acquire and use an access token](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/acquire-token.md).

1. Use `getActiveAccount` API to verify if there's an active account to call the `publicClientApplication`. If there's no active account, try to retrieve one from the cache with `getAccount`, using additional filter parameters, such as `tenantID`, `homeAccountId`, and `loginHint` from [Context interface](../../tabs/how-to/using-teams-client-library.md#updates-to-the-context-interface).

   > [!NOTE] > The `homeAccountId` property is equivalent to `userObjectId` in TeamsJS.

1. Call `publicClientApplication.acquireTokenSilent(accessTokenRequest)` to acquire the token silently without user interaction. `accessTokenRequest` specifies the scopes for which the access token is requested. NAA supports incremental and dynamic consent. Ensure that you always request the minimum scopes needed for your code to complete its task.

1. If no account is available, MSAL.js returns an `InteractionRequiredAuthError`. Call `publicClientApplication.acquireTokenPopup(accessTokenRequest)` to display an interactive dialog for the user. `acquireTokenSilent` can fail if the token expired or if the user didn't consent to all the requested scopes.

   The following code snippet shows an example to access a token:

   ```JavaScript

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

### Call an API

After you receive the token, use it to call the API. This ensures that the API is called with a valid token to make authenticated requests to the server.

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

To improve performance and reduce authentication latency, nested app authentication (NAA) supports token prefetching. This feature enables the host to proactively acquire authentication tokens before the app launches, allowing faster access to protected resources.

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
> - The value of webApplicationInfo.id must match the client ID of the app's Microsoft Entra ID registration. This is the same client ID the app uses when making actual NAA token requests. The host uses this ID to initiate the token prefetch process.
> - The values in webApplicationInfo.id and all fields inside nestedAppAuthInfo must exactly match the parameters used in the app’s runtime NAA token request. Any mismatch, such as differences in scopes, redirect URIs, or claims, will prevent the host from serving the token from cache.

> * Prefetched tokens store in memory for a short duration and intend for use only during the app’s initial load. If the app attempts to fetch a token later, such as in response to a user action, the prefetched token may no longer be available. In such cases, the app must initiate a new token request using standard authentication flows.

#### How it works

When token prefetching is enabled, the host environment attempts to acquire and cache the required tokens before the app renders. These tokens store in memory and become available to the app immediately upon launch.

This behavior is similar to the prefetch capability in the legacy Teams SSO model, where the `getAuthToken` API automatically triggers during tab load. With Nested App Authentication (NAA), this functionality introduces through manifest configuration, improving performance without requiring a backend token exchange.

#### Benefits of Token Prefetching in NAA

* Improve performance by reducing authentication delays during app startup
* Enable single sign-on (SSO) across nested apps without repeated sign-ins

> [!NOTE]
> Token prefetching currently supports only in Microsoft Teams web and desktop clients.

### Best practices

* **Use silent authentication whenever possible**:
  MSAL.js provides the `acquireTokenSilent` method, which handles token renewal by making silent token requests without prompting the user. The method first looks for a valid cached token in the browser storage. If it doesn't find one, the library makes a silent request to Microsoft Entra ID and if there's an active user session (determined by a cookie set in the browser on the Microsoft Entra domain), Microsoft Entra ID returns a fresh token. The library doesn't automatically invoke the `acquireTokenSilent` method. We recommend that you call `acquireTokenSilent` in your app before making an API call to get a valid token.

  In certain cases, the attempt to get the token using the `acquireTokenSilent` method fails. For example, when there's an expired user session with Microsoft Entra ID or a password change by the app user, `acquireTokenSilent` fails. Call the interactive acquire token method (`acquireTokenPopup`).

* **Have a fallback**:
  The NAA flows offer compatibility across the Microsoft ecosystem. However, your app might appear in down-level or legacy clients that aren't updated to support NAA. In such cases, your app can't support seamless SSO, and you might need to invoke special APIs for interacting with the user to open authentication dialogs. For more information, see [enable SSO for tab app](../../tabs/how-to/authentication/tab-sso-overview.md).

  > [!NOTE]
  > You mustn't use NAA if you're using a non-Microsoft Entra identity provider, you can use pop-up authentication instead.

* **Support for NAA**: NAA might not support across all host app environments. To verify if the current client supports this feature, you can invoke the specified API to determine its status. A return value of `true` indicates support for NAA, while `false` suggests it isn't supported.

* **Test your app in multiple environments**: If your app expects to work in both web view and browser deployments, we recommend testing your app in both deployment environments to ensure it behaves as you expect. Certain APIs that function in the browser might not operate within web views.

## Code sample

| Sample name           | Description | .NET    | Node.js   |
|:---------------------|:--------------|:---------|:--------|:--------|
| Nested app authentication   | This sample showcases Microsoft Entra single sign-on (SSO) within a Microsoft Teams tab, utilizing the On-Behalf-Of (OBO) flow to call Microsoft Graph API on behalf of the user. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-nested-auth/csharp) |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-nested-auth/nodejs)|

## See also

* [Microsoft identity platform and OAuth 2.0 On-Behalf-Of flow](/entra/identity-platform/v2-oauth2-on-behalf-of-flow)
* [Caching in MSAL](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/caching.md)
* [Introducing Nested App Authentication: An improved authentication protocol for your Teams app](https://devblogs.microsoft.com/microsoft365dev/introducing-nested-app-authentication-an-improved-authentication-protocol-for-your-teams-app/)