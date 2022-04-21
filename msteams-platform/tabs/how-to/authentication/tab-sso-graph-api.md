---
title: Extend your app with Microsoft Graph permissions
description: Describes configuring API permissions with Microsoft Graph
ms.topic: how-to
ms.localizationpriority: medium
keywords: teams authentication tabs Microsoft Azure Active Directory (Azure AD) Graph API
---
# Extend your app with Microsoft Graph permissions

You can extend your app with additional Graph scopes such as `User.Read` or `Mail.Read`. In this section, you'll learn to:

- [Configure API permissions in Azure AD](#configure-api-permissions-in-azure-ad)
- [Acquire access token for MS Graph](#acquire-access-token-for-ms-graph)

## Configure API permissions in Azure AD

You can configure additional Graph scopes in Azure AD for your app. These are delegated permissions, which are used by apps that require signed-in access. A signed-in user or admin must consent to them. The app can consent on behalf of the signed-in user when it calls Microsoft Graph.

### To configure API permissions

1. Open a web browser to the [Azure portal](https://ms.portal.azure.com/).
   The Microsoft Azure AD Portal page opens.

2. Select **Manage** > **API permission** from the left pane.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/api-permission-menu.png" alt-text="App permissions menu option." border="false":::

    The **API permissions** page appears.

3. Select **+ Add permissions** to add Microsoft Graph API permissions.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/app-permission.png" alt-text="App permissions page." border="false":::

    The **Request API permissions** page appears.

4. Select **Microsoft Graph**.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/request-api-permission.png" alt-text="Request API permissions page." border="true":::

    The options for Graph permissions display.

5. Select **Delegated permissions** to view the list of possible permission that you can select.

   :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/delegated-permission.png" alt-text="Delegated permissions." border="true":::

6. Select relevant permissions for your app.

   :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/select-permission.png" alt-text="Select permissions." border="true":::

    A message pops up on the browser stating that the permissions were updated.

   :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/updated-permission-msg.png" alt-text="Permissions updated message." border="false":::

    The added permissions are displayed in the **API permissions** page.

   :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/configured-permissions.png" alt-text="API permissions are configured." border="true":::

    You've configured API permissions with Microsoft Graph.

## Acquire access token for MS Graph

You'll need to acquire access token for Microsoft Graph. You can do so by using Azure AD OBO flow.

Our current implementation for SSO only grants consent for user-level permissions that are not usable for making Graph calls. To get the permissions (scopes) needed to make a Graph call, SSO solutions must implement a custom web service to exchange the token received from the Teams JavaScript SDK for a token that includes the needed scopes.

\ Add content to enable user to transition to MS Graph page. Verify cross-reference to MS Graph pages - existing pages that have information regarding acquiring token. \

After you've configured Graph permissions in Azure AD:

- Configure your client-side code to fetch access token using Microsoft Authentication Library (MSAL).
- Pass the access token to server-side code.

### Code snippets

The following code provides an example of OBO flow to fetch access token using MSAL.

### [C#](#tab/dotnet)

```csharp

IConfidentialClientApplication app = ConfidentialClientApplicationBuilder.Create(<"Client id">)
                                                .WithClientSecret(<"Client secret">)
                                                .WithAuthority($"https://login.microsoftonline.com/<"Tenant id">")
                                                .Build();
 
            try
            {
                var idToken = <"Client side token">;
                UserAssertion assert = new UserAssertion(idToken);
                List<string> scopes = new List<string>();
                scopes.Add("https://graph.microsoft.com/User.Read");
                var responseToken = await app.AcquireTokenOnBehalfOf(scopes, assert).ExecuteAsync();
                return responseToken.AccessToken.ToString();
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
```

### [Node.js](#tab/nodejs)

```Node.js

// Exchange cliend side token with server token
  app.post('/getProfileOnBehalfOf', function(req, res) {
        var tid = < "Tenand id" >
    var token = < "Client side token" >
    var scopes = ["https://graph.microsoft.com/User.Read"];

        // Creating MSAL client
        const msalClient = new msal.ConfidentialClientApplication({
            auth: {
                clientId: < "Client ID" >,
                clientSecret: < "Client Secret" >
      }
        });

        var oboPromise = new Promise((resolve, reject) => {
            msalClient.acquireTokenOnBehalfOf({
                authority: `https://login.microsoftonline.com/${tid}`,
                oboAssertion: token,
                scopes: scopes,
                skipCache: true
            }).then(result => {
                console.log("Token is: " + result.accessToken);
            }).catch(error => {
                reject({ "error": error.errorCode });
            });
        });
```

---

### Pass the access token to server-side code

If you need to access Microsoft Graph data, your server-side code should do the following:

- Validate the access token (see Validate the access token below).
- Initiate the OAuth 2.0 On-Behalf-Of flow with a call to the Microsoft identity platform that includes the access token, some metadata about the user, and the credentials of the add-in (its ID and secret). The Microsoft identity platform will return a new access token that can be used to access Microsoft Graph.
- Get data from Microsoft Graph by using the new token.
- If you need to cache the new access token for multiple calls, we recommend using token cache serialization in MSAL.NET.

> [!IMPORTANT]
> As a best security practice, always use the server-side code to make Microsoft Graph calls, or other calls that require passing an access token. Never return the OBO token to the client to enable the client to make direct calls to Microsoft Graph. This helps protect the token from being intercepted or leaked. For more information on the proper protocol flow, see the OAuth 2.0 protocol diagram.

## See also

- [On-behalf-of flow](/azure/active-directory/develop/v1-oauth2-on-behalf-of-flow)
- [OAuth 2.0 On-Behalf-Of flow](/azure/active-directory/develop/v2-oauth2-on-behalf-of-flow)
- [Get access for MS Graph](/graph/auth-v2-user)
- [Token cache serialization in MSAL.NET](/azure/active-directory/develop/msal-net-token-cache-serialization?tabs=aspnet)
