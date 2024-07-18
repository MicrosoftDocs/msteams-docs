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

> [!NOTE]
>
> * Nested app authentication is available only in [public developer preview](../../resources/dev-preview/developer-preview-intro.md).
> * Nested app authentication is only supported in single page applications such as tabs.
> * Nested app authentication isn't supported on Teams web client and Microsoft 365 apps.

Nested app authentication (NAA) is a new authentication protocol for single page applications that are embedded in host environments like Teams, Outlook, and Microsoft 365. It simplifies the authentication process to facilitate single sign-on (SSO) across applications nested within supported host apps and provides several advantages over the On-Behalf-Of (OBO) flow.

* You only need to use the MSAL.js library and don’t need the getAuthToken function in TeamsJS.
* You can call services such as Microsoft Graph with an access token from your client code as an SPA. There’s no need for a middle-tier server.
* You can use incremental and dynamic consent for scopes.
* You don't need to preauthorize your hosts (for example, Teams, Office) to call your endpoints.

The NAA model supports a primary identity that includes multiple app identities. Microsoft utilizes this framework in Office Add-Ins and Teams Tabs and Personal apps.

The following table outlines the difference between Teams Microsoft Entra ID SSO and Nested App Authentication:

| Steps | Traditional Teams Microsoft Entra ID SSO | Nested App Authentication |
| --- | --- | --- |
| Expose redirect URI | ✔️ | ✔️ * SPA redirect URI necessary |
| Register API in Microsoft Entra ID | ✔️ |  |
| Define a custom scope in Microsoft Entra ID | ✔️ |  |
| Authorize Teams client apps | ✔️ |  |
| Revise Teams manifest | ✔️ | Recommended helping IT admins in providing consent through the Admin Portal |
| Acquire access token through Teams JS SDK | ✔️ |  |
| Solicit user consent for more permissions | ✔️ |  |
| Conduct an OBO exchange on the server | ✔️ |  |

## Scenarios

| Scenario | description |
| --- | --- |
| **Consenting to SSO (and other permissions)** | Tom, a new member of the Contoso design team, needs to use Mural in Teams to collaborate on whiteboards. Upon first use, a dialog prompts Tom to grant permissions, including reading their profile for their avatar (User.Read). After tom consents, Tom can use Mural seamlessly in future meetings across devices. |
| **Reauthentication or Conditional Access step-up auth** |  Tom, while working from Australia, encounters a conditional access trigger requiring multifactor authentication (MFA) to access Mural in Teams. A dialog informs Tom of the more verification needed, leading them through the MFA process to continue using Mural. |
| **Errors** | Tom faces an error with Mural displaying an 'Oh no!' page due to an issue retrieving account information. A retry button prompts Tom to reauthenticate, only to find that the system administrator blocked access to Mural. |

## Configure nested authentication

> [!NOTE]
>
> * Nested authentication is in developer preview and not supported by all host environments. You must check the support status using the [isNAAChannelRecommended()](/javascript/api/@microsoft/teams-js/nestedappauth?) function and provide a fallback experience for unsupported environments.
> * If the API return the value as `true`, then call MSAL for the NAA flow. If it returns `false`, continue to use your existing token retrieval method.

To use nested authentication, follow these steps:

1. [Register their single page application](#register-your-single-page-application)
1. [Add trusted brokers](#add-trusted-brokers)
1. [Initialize public client application](#initialize-public-client-application)
1. [Call an API](#call-an-api)

### Register your single-page application

You need to create a Microsoft Azure App registration for your add-in on the Azure portal. The app registration must have a name, supported account type, and SPA redirect. If your add-in requires additional app registration beyond NAA and SSO, see [Register your single-page application.](/entra/identity-platform/scenario-spa-app-registration)

### Add trusted brokers

To enable nested authentication, your application must actively configure a redirect URI to indicate the Microsoft identity platform that your application allows itself to be brokered by supported hosts. The redirect URI of the application must be of type **Single Page Application** and conform to the following scheme:

```
brk-<broker_application_id>://<your_domain>
```

Where <broker_application_id> is the alias of the broker or brokers you wish to trust and <your_domain> is the fully qualified domain name where your application is hosted. For example, **brk-multihub://contoso.com**. If your app has been upgraded to also run in Outlook and Microsoft365.com (in addition to Teams), then you just need to add one Redirect URI:

```http
brk-multihub://<your_domain>
```

Your domain should only include the origin and not sub-paths. For example:

* Correct: brk-multihub://myapp.teams.microsoft.com
* Incorrect: brk-multihub://myapp.teams.microsoft.com/go

### Initialize public client application

> [!NOTE]
> Ensure that you initialize TeamsJS before you initialize MSAL (Microsoft Authentication Library), else Nested app authentication might fail.

You need to initialize MSAL and get an instance of the public client application. This is used to get access tokens when needed.

```javascript
import {
  AccountInfo,
  IPublicClientApplication,
  createNestablePublicClientApplication,
} from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: "your_client_id",
    authority: "https://login.microsoftonline.com/{your_tenant_id}",
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

The tokens acquired by MSAL.js through nested app authentication are issued for your Azure app registration ID. The MSAL.js handles token acquisition for user authentication. It tries to get an access token silently, and if that fails, it prompts the user interactively.  The token is then used to call the Microsoft Graph API or other Entra ID protected resources.

To acquire a token, follow these steps:

1. Use MSAL.js to acquire tokens that for your app ID. Unlike On-Behalf-Of (OBO) flow, you don't need to preauthorize your hosts to call your endpoints. For more information on how to to get access tokens, see [Acquire and use an access token](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/acquire-token.md).

1. Use `getActiveAccount` API to verify if there's an active account to call the `publicClientApplication`. If there's no active account, try to retrieve one from the cache with `getAccount`, using additional filter parameters like tenantID, homeAccountId, and loginHint from [Context interface](../../tabs/how-to/using-teams-client-library.md#updates-to-the-context-interface). 

   > [!NOTE]
   > The `homeAccountId` property is equivalent to `userObjectId` in Teams JavaScript client library(TeamsJS).

1. Call `publicClientApplication.acquireTokenSilent(accessTokenRequest)` to acquire the token silently without user interaction. `accessTokenRequest` specifies the scopes for which the access token is requested. Nested app authentication supports incremental and dynamic consent so always request the minimum scopes needed for your code to complete its task.

1. If no account is available, MSAL.js returns an `InteractionRequiredAuthError`. Call `publicClientApplication.acquireTokenPopup(accessTokenRequest)` to display an interactive dialog for the user. `acquireTokenSilent` can fail if the token expired, or the user didn't consent to all the requested scopes.

The following code shows you an example to access a token:

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

### Call an API

After receiving the token, you use the token to call the API. This ensures that the API is called with a valid token, allowing for authenticated requests to be made to the server.

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

* **Have a fallback**: While we strive to provide a high degree of compatibility with these flows across the Microsoft ecosystem, your application might appear in down-level or legacy clients aren't updated to support NAA. In these cases, your application doesn't support seamless SSO and you might need to invoke special APIs for interacting with the user to open authentication dialogs. For more information, see [Enable SSO for tab app](../../tabs/how-to/authentication/tab-sso-overview.md).

* Nested app authentication might not be supported across all host app environments. To verify if the current client supports this feature, you can invoke the specified API to determine its status. A return value of "true" indicates support for nested app authentication, while "false" suggests it isn't supported.

* **Test your application in multiple environments**: If your application is expected to work in both WebView and browser deployments, we recommend testing your application in both deployment environments to ensure it behaves as you expect. Not all APIs supported in the browser work inside of WebViews.

## Code sample

| Sample name           | Description | .NET    | Node.js   | Manifest|
|:---------------------|:--------------|:---------|:--------|:--------|
|Nested app authentication   |  This sample shows how to build a NAA authentication protocol for single page applications embedded in host environments like Teams, Outlook, and Microsoft 365.||[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-nested-auth/nodejs)| |

