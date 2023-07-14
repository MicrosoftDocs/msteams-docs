---
title: Extend tab app with Microsoft Graph permissions
description: Configure additional permissions and scopes, get access token with Microsoft Graph to enable single sign-on (SSO).
ms.topic: how-to
ms.localizationpriority: high
keywords: teams authentication tabs Microsoft Azure Active Directory (Azure AD) Graph API Delegated permission access token scope
ms.date: 07/14/2023
---
# Extend tab app with Microsoft Graph permissions and scopes

You can extend your tab app by using Microsoft Graph to allow additional user permissions, such as to view app user profile, read mail, and more. Your app must ask for specific permission scopes to obtain the access tokens upon app user consent.

Graph scopes, such as `User.Read` or `Mail.Read`, indicate what your app can access from a Teams user account. You'll need to specify your scopes in the authorization request. This article will walk you through the steps to configure Microsoft Graph permissions and scopes for your Teams tab app.

## Configure API permissions in Azure AD

You can configure additional Graph scopes in Azure AD for your app. These are delegated permissions, which are used by apps that require signed-in access. A signed-in app user or administrator must initially consent to them. Thereafter, your tab app can consent on behalf of the signed-in user when it calls Microsoft Graph.

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

    You've now configured your app with Microsoft Graph permissions.

## Configure authentication for different platforms

Depending on the platform or device where you want to target your app, additional configuration may be required, such as redirect URIs, specific authentication settings, or details specific to the platform.

> [!NOTE]
>
> - If your tab app hasn't been granted IT admin consent, app users will need to provide consent the first time they use your app on a different platform.
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

You'll need to acquire an access token for Microsoft Graph. You can do so by using Azure AD on-behalf-of (OBO) flow.

The current implementation for single sign-on (SSO) is limited to user-level permissions, which aren't usable for making Graph calls. To get the permissions and scopes needed to make a Graph call, SSO apps must implement a custom web service to exchange the token received from the Teams JavaScript library for a token that includes the needed scopes. You can use Microsoft Authentication Library (MSAL) for fetching the token from the client side.

After you've configured Graph permissions in Azure AD, you'll need to get the token ID from the Teams client and then exchange it with the server-side token.

### Get the token ID from Teams client

The following is an example for getting the token ID from Teams client:

```csharp
microsoftTeams.authentication.getAuthToken().then((result) => {
    //result contains the id token
            console.log(result);
        })
```

### Exchange the token ID with the server-side token

The following is an example of OBO flow to fetch the access token from Teams client using MSAL:

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

[ConfidentiaClientApplication class](/javascript/api/@azure/msal-node/confidentialclientapplication?view=azure-node-latest#@azure-msal-node-confidentialclientapplication-acquiretokenonbehalfof&preserve-view=true) SDK reference | [sample code](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/tab-sso/nodejs/src/server/tabs.js#L51-L94)

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
> - As a best practice for security, always use [server-side code to make Microsoft Graph calls](/azure/active-directory/develop/v2-oauth2-on-behalf-of-flow#middle-tier-access-token-request) or other calls that require passing an access token. This helps protect the token from being intercepted or leaked. DO NOT return the OBO token to the client because it would then enable the client to make direct calls to Microsoft Graph.
>
> - Don’t use `notifySuccess` result to return the token information to the parent page. Use `localStorage` to save the token and pass the item key via `notifySuccess`.

## Obtain consent

Your app can obtain consent for Graph permissions globally from the tenant administrator, or individually per user.

### From the tenant administrator

 A simple way of [consenting on behalf of an organization](/azure/active-directory/manage-apps/consent-and-permissions-overview#admin-consent) is by obtaining [admin consent](/azure/active-directory/manage-apps/grant-admin-consent).

### From the user

When asking for additional user consent using the Microsoft Teams JavaScript client library (TeamsJS) [authentication](/javascript/api/@microsoft/teams-js/authentication) capability, keep in mind the following considerations:

> [!TIP]
> [Teams Personal Tab SSO Authentication](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/tab-personal-sso-quickstart/js/src/components/Tab.js#L64-L101) sample provides code demonstrating following steps.

1. The token retrieved using `getAuthToken()` must be exchanged on the server-side using Azure AD [OBO flow](/azure/active-directory/develop/v2-oauth2-on-behalf-of-flow) to get access to those other Graph APIs. Ensure that you use the Azure AD v2 endpoint for this exchange.
1. When you try to execute the token exchange for a user for the first time, if Azure AD refuses to exchange tokens it might be because the user has not consented to give your app permission to the user's data. In these cases, your exchange will fail with either the `invalid_grant` or `interaction_required` error.  Examples of *invalid_grant* errors include when consent is required or *auth_code*, assertion, or the refresh token is expired, revoked, malformed, or absent. Examples of *interaction_required* include when multi-factor authentication or corporate device enrollment is required.
1. If the exchange fails because of the `invalid_grant` or `interaction_required` errors, you must prompt the user for consent. Since user interaction can only happen from the client, your server needs to return an indication to your client app that consent is required. You can then use the user interface (UI) to ask the app user to grant other consent. The UI must include a button that triggers an [Azure AD consent dialog](../../../tabs/how-to/authentication/tab-sso-code.md#consent-dialog-for-getting-access-token).
1. To ask the user for consent for your app to access their data, you must include the `prompt=consent` property in your [query-string-parameter](/azure/active-directory/develop/v2-oauth2-implicit-grant-flow#send-the-sign-in-request) to Azure AD.
    - Instead of `?scope={scopes}`, use `?prompt=consent&scope={scopes}`
    - Ensure that the `{scopes}` property includes all the scopes you're prompting the user for. For example, `Mail.Read` or `User.Read`.

    To handle incremental consent for tab app, see [incremental and dynamic user consent](/azure/active-directory/develop/v2-permissions-and-consent).
1. After the app user has granted more permissions, retry the OBO flow to get access to additional Graph APIs.

## Race condition when making an OBO call after invalid grant exception

If a user hasn't granted Azure AD application consent for these scopes, your OBO call will fail with `invalid_grant` or `interaction_required` error. This error informs you that you need to prompt the user for their consent.

When the user has provided their consent and you try to make an OBO call immediately, sometimes there's a race condition between Azure AD propagating this consent and the OBO request taking place. This can lead to OBO call failing with the same `invalid_grant` or `interaction_required` errors.

If your application is unaware of this behavior, it might ask the user for consent multiple times. Best practice is to build a meaningful wait-and-retry mechanism to avoid this suboptimal user experience.

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
- [Microsoft Teams MSAL2 provider](/graph/toolkit/providers/msal2)
