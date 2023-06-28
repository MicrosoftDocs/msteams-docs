---
title: Extend tab app with Microsoft Graph permissions
description: Configure additional permissions and scopes, get access token with Microsoft Graph to enable single sign-on (SSO).
ms.topic: how-to
ms.localizationpriority: high
keywords: teams authentication tabs Microsoft Azure Active Directory (Azure AD) Graph API Delegated permission access token scope
ms.date: 04/06/2023
---
# Extend tab app with Microsoft Graph permissions and scopes

You can extend your tab app by using Microsoft Graph to allow users additional permissions, such as to view app user profile, to read mail, and more. Your app must ask for specific permission scopes to obtain the access tokens on app user's consent.

Graph scopes, such as `User.Read` or `Mail.Read`, lets you specify how your app accesses a Teams user's account. You need to specify your scopes in the authorization request.

In this section, you'll learn to:

- [Configure API permissions in Azure AD](#configure-api-permissions-in-azure-ad)
- [Configure authentication for different platforms](#configure-authentication-for-different-platforms)
- [Acquire access token for MS Graph](#acquire-access-token-for-ms-graph)

## Configure API permissions in Azure AD

You can configure additional Graph scopes in Azure AD for your app. These are delegated permissions, which are used by apps that require signed-in access. A signed-in app user or administrator must consent to them. Your tab app can consent on behalf of the signed-in user when it calls Microsoft Graph.

### To configure API permissions

1. Open the app you registered in the [Azure portal](https://ms.portal.azure.com/).

2. Select **Manage** > **API permissions** from the left pane.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/api-permission-menu.png" alt-text="The screenshot shows the app permissions menu option.":::

    The **API permissions** page appears.

3. Select **+ Add a permission** to add Microsoft Graph API permissions.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/app-permission.png" alt-text="The screenshot shows the app permissions page.":::

    The **Request API permissions** page appears.

4. Select **Microsoft Graph**.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/request-api-permission.png" alt-text="The screenshot shows the request API permissions page.":::

    The options for Graph permissions display.

5. Select **Delegated permissions** to view the list of permissions.

   :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/delegated-permission.png" alt-text="The screenshot shows the delegated permissions.":::

6. Select relevant permissions for your app, and then select **Add permissions**.

   :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/select-permission.png" alt-text="The screenshot shows the add permissions option.":::

    You can also enter the permission name in the search box to find it.

    A message pops up on the browser stating that the permissions were updated.

   :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/updated-permission-msg.png" alt-text="The screenshot shows the message that appears for the updated permissions.":::

    The added permissions are displayed in the **API permissions** page.

   :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/configured-permissions.png" alt-text="The screenshot shows an example of the API permissions, which are configured.":::

    You've configured your app with Microsoft Graph permissions.

## Configure authentication for different platforms

Depending on the platform or device where you want to target your app, additional configuration may be required such as redirect URIs, specific authentication settings, or details specific to the platform.

> [!NOTE]
>
> - If your tab app hasn't been granted IT admin consent, app users have to provide consent the first time they use your app on a different platform.
> - Implicit grant isn't required if SSO is enabled on a tab app.

You can configure authentication for multiple platforms as long as the URL is unique.

### To configure authentication for a platform

1. Open the app you registered in the [Azure portal](https://ms.portal.azure.com/).

1. Select **Manage** > **Authentication** from the left pane.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/azure-portal-platform.png" alt-text="The screenshot for authenticating platforms.":::

    The **Platform configurations** page appears.

1. Select **+ Add a platform**.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/add-platform.png" alt-text="The screenshot shows the options to add a platform.":::

    The **Configure platforms** page appears.

1. Select the platform that you want to configure for your tab app. You can choose the platform type from **web** or **Single-page application**.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/configure-platform.png" alt-text="The screenshot for selecting web platform.":::

    You can configure multiple platforms for a particular platform type. Ensure that the redirect URI is unique for every platform you configure.

    The Configure Web page appears.

    > [!NOTE]
    > The configurations will be different based on the platform you select.

1. Enter the configuration details for the platform.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/config-web-platform.png" alt-text="The screenshot for configuring web platform.":::

    1. Enter the redirect URI. The URI should be unique.
    2. Enter the front-channel logout URL.
    3. Select the tokens you want Azure AD to send for your app.

1. Select **Configure**.

    The platform is configured and displayed in the **Platform configurations** page.

## Acquire access token for MS Graph

You'll need to acquire access token for Microsoft Graph. You can do so by using Azure AD on-behalf-of (OBO) flow.

The current implementation for SSO grants consent for only user-level permissions that aren't usable for making Graph calls. To get the permissions (scopes) needed to make a Graph call, SSO apps must implement a custom web service to exchange the token received from the Teams JavaScript library for a token that includes the needed scopes. You can use Microsoft Authentication Library (MSAL) for fetching the token from the client side.

After you've configured Graph permissions in Azure AD:

1. [Get the token ID from Teams client](#get-the-token-id-from-teams-client)

1. [Exchange the token ID with the server-side token](#exchange-the-token-id-with-the-server-side-token)

### Get the token ID from Teams client

The following is an example for calling token ID from Teams client:

```csharp
microsoftTeams.authentication.getAuthToken().then((result) => {
    //result contains the id token
            console.log(result);
        })
```

### Exchange the token ID with the server-side token

The following is an example of OBO flow to fetch access token from the Teams client using MSAL:

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
                // Acquires an access token for this application (usually a Web API) from the authority configured in the application.
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

- [SDK reference](/javascript/api/@azure/msal-node/confidentialclientapplication?view=azure-node-latest#@azure-msal-node-confidentialclientapplication-acquiretokenonbehalfof&preserve-view=true)

- [sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/tab-sso/nodejs/src/server/tabs.js#L51-L94)

```Node.js
// Exchange client Id side token with server token
  app.post('/getProfileOnBehalfOf', function(req, res) {
        var tid = < "Tenant id" >
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

If you need to access Microsoft Graph data, configure your server-side code to:

1. Validate the access token. For more information, see [Validate the access token](tab-sso-code.md#validate-the-access-token).
1. Initiate the OAuth 2.0 OBO flow with a call to the Microsoft identity platform that includes the access token, some metadata about the user, and the credentials of the tab app (its app ID and client secret). The Microsoft identity platform will return a new access token that can be used to access Microsoft Graph.
1. Get data from Microsoft Graph by using the new token.
1. Use token cache serialization in MSAL.NET to cache the new access token for multiple, if necessary.

> [!IMPORTANT]
>
> - As a best practice for security, always use the [server-side code to make Microsoft Graph calls](/azure/active-directory/develop/v2-oauth2-on-behalf-of-flow#middle-tier-access-token-request) or other calls that require passing an access token. You must not return the OBO token to the client because it enables the client to make direct calls to Microsoft Graph. This helps protect the token from being intercepted or leaked.
>
> - Don’t use `notifySuccess` result to return the token information to the parent page. Use `localStorage` to save the token and pass the item key via `notifySuccess`.

## Known limitations

1. Tenant admin consent: A simple way of [consenting on behalf of an organization as a tenant admin](/azure/active-directory/manage-apps/consent-and-permissions-overview#admin-consent) is by getting [consent from admin](/azure/active-directory/manage-apps/grant-admin-consent).

    You can ask for consent using the Auth API. Another approach for getting Graph scopes is to present a consent dialog using our existing [third party OAuth provider authentication approach](~/tabs/how-to/authentication/auth-tab-aad.md#navigate-to-the-authorization-page-from-your-pop-up-page). This approach involves popping up an Azure AD consent dialog box.

    <details>
    <summary>To ask for additional consent using the Auth API, follow these steps:</summary>

    1. The token retrieved using `getAuthToken()` must be exchanged on the server-side using Azure AD [on-behalf-of flow](/azure/active-directory/develop/v2-oauth2-on-behalf-of-flow) to get access to those other Graph APIs. Ensure you use the v2 Graph endpoint for this exchange.
    2. If the exchange fails, Azure AD returns an invalid grant exception. It usually responds with one of the two error messages, `invalid_grant` or `interaction_required`.
    3. When the exchange fails, you must ask for consent. Use the user interface (UI) to ask the app user to grant other consent. This UI must include a button that triggers an Azure AD consent dialog using [Silent authentication](~/concepts/authentication/auth-silent-aad.md).
    4. When asking for more consent from Azure AD, you must include `prompt=consent` in your [query-string-parameter](~/tabs/how-to/authentication/auth-silent-aad.md#get-the-user-context) to Azure AD, otherwise Azure AD wouldn't ask for other scopes.
        - Instead of `?scope={scopes}`, use `?prompt=consent&scope={scopes}`
        - Ensure that `{scopes}` includes all the scopes you're prompting the user for, for example, `Mail.Read` or `User.Read`.

        To handle incremental consent for tab app, see [incremental and dynamic user consent](/azure/active-directory/develop/v2-permissions-and-consent).
    5. After the app user has granted more permissions, retry the OBO flow to get access to these other APIs.
    </details>

1. Race condition in fetching Graph access token via on-behalf-of (OBO) flow after consent: If your app calls Microsoft Graph, you might use the on-behalf-of (OBO) flow in your API to get a valid Graph token for that user.

   If a user hasn't granted Azure AD application consent for these scopes, your OBO call will fail with `invalid_grant` or `interaction_required` error. This error informs you that you need to prompt the user for their consent.

   When the user has provided their consent and you try to make an OBO call immediately, sometimes there's a race condition between Azure AD propagating this consent and the OBO request taking place. This can lead to OBO call failing with the same `invalid_grant` or `interaction_required` errors.

   If your application is unaware of this behaviour, it might ask the user for consent multiple times.

   There's no workaround to this limitation. Azure AD recommends that you can build a meaningful wait-and-retry mechanism to overcome this issue.

   This wait-and-retry mechanism should keep track if a user has consented to the required scopes. If an API call that includes an OBO request fails with the above errors, but the user has already consented, avoid showing the consent prompt to the user. Instead, wait for some time before retrying the API call. Usually, Azure AD sends the consent within three to five seconds. In one of our [sample applications](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/8f266c33608d6d7b4cf89c81779ccf49e7664c1e/samples/bot-tab-conversations/csharp/Source/ConversationalTabs.Web/ClientApp/src/utils/UtilsFunctions.ts#LL8C1-L8C1), we retry up to three times with double the wait time between each retry, starting at a one second wait.

   If after three to five attempts the OBO flow still fails, the user might not have consented to all the required scopes, and you may have to prompt them to consent again.

   This approach helps reduce the possibility of user being prompted for consent more than once.

## Code sample

| **Sample name** | **Description** | **C#** | **Node.js** |
| --- | --- | --- | --- |
| Tabs Azure AD SSO | Microsoft Teams sample app for tabs Azure AD SSO, which uses OBO flow to call Graph APIs. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/69c76fded29d7ae0fde49841d4ec9af7597ceedd/samples/tab-sso/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/69c76fded29d7ae0fde49841d4ec9af7597ceedd/samples/tab-sso/nodejs)|

## See also

- [OAuth 2.0 On-Behalf-Of flow](/azure/active-directory/develop/v2-oauth2-on-behalf-of-flow)
- [Get access for MS Graph](/graph/auth-v2-user)
- [Token cache serialization in MSAL.NET](/azure/active-directory/develop/msal-net-token-cache-serialization?tabs=aspnet)
- [Microsoft Teams MSAL2 provider](/graph/toolkit/providers/teams-msal2)
