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
> * Nested app authentication (NAA) is available only in [public developer preview](../../resources/dev-preview/developer-preview-intro.md).
> * NAA is supported only in single page apps (SPA) like tabs.

NAA is a new authentication protocol for single page apps that are embedded in host environments like Teams, Outlook, and Microsoft 365. It simplifies the authentication process to facilitate Single Sign-on (SSO) across apps nested within supported host apps and provides several advantages over the On-Behalf-Of (OBO) flow:

* You need to use only the MSAL.js library and don’t need the `getAuthToken` function in TeamsJS.
* You can call services such as Microsoft Graph with an access token from your client code as an SPA. There’s no need for a middle-tier server.
* You can use incremental and dynamic consent for scopes.
* You don't need to preauthorize your hosts (for example, Teams, Office) to call your endpoints.

For more information about SSO for tab apps, see [Enable SSO for tab app](../../tabs/how-to/authentication/tab-sso-overview.md).

The NAA model supports a primary identity that includes multiple app identities. Microsoft utilizes this framework in Office Add-Ins and Teams Tabs and Personal apps.

The following table outlines the difference between Teams Microsoft Entra ID SSO and NAA:

| Steps | Traditional Teams Microsoft Entra ID SSO | NAA |
| --- | --- | --- |
| Expose redirect URI | ✔️ | ✔️ SPA redirect URI necessary |
| Register API in Microsoft Entra ID | ✔️ |  |
| Define a custom scope in Microsoft Entra ID | ✔️ |  |
| Authorize Teams client apps | ✔️ |  |
| Revise Teams manifest | ✔️ | It is recommended for helping IT admins in providing consent through the Admin Portal |
| Acquire access token through Teams JS SDK | ✔️ |  |
| Solicit user consent for more permissions | ✔️ |  |
| Conduct an OBO exchange on the server | ✔️ |  |

## Use cases for enabling NAA

| Scenario | Description |
| --- | --- |
| **Consenting to SSO (and other permissions)** | Tom, a new member of the Contoso design team, needs to use Mural in Teams to collaborate on whiteboards. Upon first use, a dialog prompts Tom to grant permissions, including reading their profile for their avatar (User.Read). After giving consenting, Tom can use Mural seamlessly in future meetings across devices. |
| **Reauthentication or Conditional Access step-up auth** |  Tom, while working from Australia, encounters a conditional access trigger requiring multifactor authentication (MFA) to access Mural in Teams. A dialog informs Tom that more verification is needed, leading them through the MFA process to continue using Mural. |
| **Errors** | Tom faces an error with Mural displaying an 'Oh no!' page due to an issue retrieving account information. Tom encounters a retry button that prompts for reauthentication. However, they discover that the system administrator has restricted access to Mural. |

## Configure nested authentication

> [!NOTE]
>
> * Nested authentication is in developer preview and not supported by all host environments. Ensure that you check the support status using the [isNAAChannelRecommended()](/javascript/api/@microsoft/teams-js/nestedappauth?) function and provide a fallback experience for unsupported environments.
> * If the API returns the value as `true`, then call MSAL for the NAA flow. If it returns `false`, continue to use your existing token retrieval method.

To use nested authentication, follow these steps:

1. [Register their single page application](#register-your-single-page-application)
1. [Add trusted brokers](#add-trusted-brokers)
1. [Initialize public client application](#initialize-public-client-application)
1. [Call an API](#call-an-api)

### Register your single-page application

You need to create a Microsoft Azure App registration for your add-in on the Azure portal. The app registration must have a name, supported account type, and SPA redirect. If your add-in requires additional app registration beyond NAA and SSO, see [Register your single-page application.](/entra/identity-platform/scenario-spa-app-registration)

### Add trusted brokers

To enable nested authentication, your app must actively configure a redirect URI to indicate the Microsoft identity platform that your app can be brokered by supported hosts. The redirect URI of the app must be of type **Single Page Application** and conform to the following scheme:

```
brk-<broker_application_id>://<your_domain>
```

Where,

* <broker_application_id> is the alias of the broker or brokers you wish to trust
* <your_domain> is the fully qualified domain name where your app is hosted. For example, **brk-multihub://contoso.com**.

If your app has been upgraded to run in Outlook and Microsoft365.com (in addition to Teams), then you need to only add one redirect URI:

```http
brk-multihub://<your_domain>
```

Your domain must include only the origin, and not sub-paths. For example:

* Correct: brk-multihub://myapp.teams.microsoft.com
* Incorrect: brk-multihub://myapp.teams.microsoft.com/go

### Initialize public client application

> [!NOTE]
> To ensure successful authentication, initialize TeamsJS before you initialize MSAL (Microsoft Authentication Library).

Initialize MSAL and get an instance of the public client application to get access tokens, when needed.

# [JavaScript](#tab/javascript)

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

# [C#](#tab/cs)

```
using Microsoft.Identity.Client;
using System;
using System.Threading.Tasks;

public class MsalClient
{
    private static IPublicClientApplication pca;

    public static async Task<IPublicClientApplication> InitializePublicClientAsync()
    {
        Console.WriteLine("Starting initializePublicClient");

        var msalConfig = PublicClientApplicationBuilder.Create("your_client_id")
            .WithAuthority("https://login.microsoftonline.com/{your_tenant_id}")
            .Build();

        pca = msalConfig;
        Console.WriteLine("Client app created");

        return pca;
    }
}
```

---

### Acquire your first token

The tokens acquired by MSAL.js through nested app authentication are issued for your Azure app registration ID. MSAL.js handles token acquisition for user authentication. It tries to get an access token silently. If that is unsuccessful, it prompts the user for consent. The token is then used to call the Microsoft Graph API or other Entra ID protected resources. Unlike On-Behalf-Of (OBO) flow, you don't need to preauthorize your hosts to call the endpoints.

To acquire a token, follow these steps:

1. Use MSAL.js to acquire tokens for your app ID. For more information on how to get access tokens, see [Acquire and use an access token](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/acquire-token.md).

1. Use `getActiveAccount` API to verify if there's an active account to call the `publicClientApplication`. If there's no active account, try to retrieve one from the cache with `getAccount`, using additional filter parameters like `tenantID`, `homeAccountId`, and `loginHint` from [Context interface](../../tabs/how-to/using-teams-client-library.md#updates-to-the-context-interface).

   > [!NOTE]
   > The `homeAccountId` property is equivalent to `userObjectId` in Teams JavaScript client library (TeamsJS).

1. Call `publicClientApplication.acquireTokenSilent(accessTokenRequest)` to acquire the token silently without user interaction. `accessTokenRequest` specifies the scopes for which the access token is requested. Nested app authentication supports incremental and dynamic consent so always request the minimum scopes needed for your code to complete its task.

1. If no account is available, MSAL.js returns an `InteractionRequiredAuthError`. Call `publicClientApplication.acquireTokenPopup(accessTokenRequest)` to display an interactive dialog for the user. `acquireTokenSilent` can fail if the token expired, or the user didn't consent to all the requested scopes.

The following code shows you an example to access a token:

# [JavaScript](#tab/c#)

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

# [C#](#tab/netcode)

```
// MSAL.NET exposes several account APIs, logic to determine which account to use is the responsibility of the developer
var account = publicClientApplication.GetAccountsAsync().Result.FirstOrDefault();
var accessTokenRequest = publicClientApplication.AcquireTokenSilent(new[] { "user.read" }, account);

try
{
    var accessTokenResponse = accessTokenRequest.ExecuteAsync().Result;
    // Acquire token silent success
    var accessToken = accessTokenResponse.AccessToken;
    // Call your API with token
    CallApi(accessToken);
}
catch (MsalUiRequiredException ex)
{
    // Acquire token silent failure, and send an interactive request
    try
    {
        var accessTokenResponse = publicClientApplication.AcquireTokenInteractive(new[] { "user.read" }).ExecuteAsync().Result;
        // Acquire token interactive success
        var accessToken = accessTokenResponse.AccessToken;
        // Call your API with token
        CallApi(accessToken);
    }
    catch (Exception innerEx)
    {
        // Acquire token interactive failure
        Console.WriteLine(innerEx);
    }
}
catch (Exception ex)
{
    Console.WriteLine(ex);
}
```

---

### Call an API

After you receive the token, use it to call the API. This ensures that the API is called with a valid token for ensuring that authenticated requests can be made to the server.

The following example shows how to make an authenticated request to the Microsoft Graph API to access Microsoft 365 data:

# [JavaScript](#tab/jscript)

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

# [.NET](#tab/dotnet)

```
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

public class GraphApiClient
{
    private static readonly HttpClient client = new HttpClient();

    public static async Task CallGraphApiAsync(string accessToken)
    {
        var graphEndpoint = "https://graph.microsoft.com/v1.0/me";
        var request = new HttpRequestMessage(HttpMethod.Get, graphEndpoint);
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

        var response = await client.SendAsync(request);
        if (response.IsSuccessStatusCode)
        {
            // Do something with response
            var responseBody = await response.Content.ReadAsStringAsync();
            Console.WriteLine(responseBody);
        }
        else
        {
            Console.WriteLine($"Error: {response.StatusCode}");
        }
    }
}
```

---

### Best practices

* **Use silent authentication whenever possible**: MSAL.js provides the `acquireTokenSilent` method, which handles token renewal by making silent token requests without prompting the user. The method first looks for a valid cached token in the browser storage. If it doesn't find one, the library makes a silent request to Microsoft Entra and if there's an active user session (determined by a cookie set in browser on the Microsoft Entra domain), Microsoft Entra returns a fresh token. The library doesn't automatically invoke the `acquireTokenSilent` method. We recommended that you call `acquireTokenSilent` in your app before making an API call to get the valid token.

  In certain cases, the attempt to get the token using the `acquireTokenSilent` method fails. For example, when there's an expired user session with Microsoft Entra or a password change by the app user, which requires user interaction. If the `acquireTokenSilent` fails, call the interactive acquire token method (`acquireTokenPopup`).

* **Have a fallback**: These flows offer a high degree of compatibility across the Microsoft ecosystem. However, your app might appear in down-level or legacy clients that aren't updated to support NAA. In these cases, your app can't support seamless SSO, and you might need to invoke special APIs for interacting with the user to open authentication dialogs. For more information, see [Enable SSO for tab app](../../tabs/how-to/authentication/tab-sso-overview.md).

* NAA might not be supported across all host app environments. To verify if the current client supports this feature, you can invoke the specified API to determine its status. A return value of "true" indicates support for NAA, while "false" suggests it isn't supported.

* **Test your app in multiple environments**: If your app is expected to work in both WebView and browser deployments, we recommend testing your app in both deployment environments to ensure it behaves as you expect. Certain APIs that function in the browser might not operate within WebViews.

## Code sample

| Sample name           | Description | .NET    | Node.js   | Manifest|
|:---------------------|:--------------|:---------|:--------|:--------|
|Nested app authentication   |  This sample shows how to build a NAA authentication protocol for single page applications embedded in host environments like Teams, Outlook, and Microsoft 365.||[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-nested-auth/nodejs)| |
