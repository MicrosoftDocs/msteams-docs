---
title: Code configuration for enabling SSO for tabs
description: Update code in your tab app for requesting and receiving access token using app user's Teams identity for enabling Single sign-on (SSO).
ms.topic: how-to
ms.localizationpriority: high
keywords: teams authentication tabs Microsoft Azure Active Directory (Azure AD) Graph API
---
# Add code to enable SSO

Before you add code to enable SSO, ensure that you've registered your app with Azure AD.

> [!div class="nextstepaction"]
> [Register with Azure AD](tab-sso-register-aad.md)

You need to configure your tab app's client-side code to obtain an access token from Azure AD. The access token is issued on behalf of the tab app. If your tab app requires additional Microsoft Graph permissions, you'll need to pass the access token to the server-side, and exchange it for Microsoft Graph token.

:::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/sso-config-code.png" alt-text="configure code for handling access token":::

This section covers:

- [Add client-side code](#add-client-side-code)
- [Pass the access token to server-side code](#pass-the-access-token-to-server-side-code)
- [Validate the access token](#validate-the-access-token)

## Add client-side code

To obtain app access for the current app user, your client-side code must make a call to Teams for getting an access token. You need to update client-side code for using `getAuthToken()` to initiate the validation process.

<br>
<details>
<summary>Learn more about getAuthToken()</summary>
<br>

`getAuthToken()` is a method in Microsoft Teams JavaScript library. It requests an Azure AD access token to be issued on behalf of app. The token is acquired from the cache, if it is not expired. If it's expired, a request is sent to Azure AD to obtain a new access token.

 For more information, see [getAuthToken](/javascript/api/@microsoft/teams-js/microsoftteams.authentication?view=msteams-client-js-latest#@microsoft-teams-js-microsoftteams-authentication-getauthtoken&preserve-view=true).
</details>

### When to call getAuthToken

Use `getAuthToken()` at the time when you need access token for the current app user:

| If access token is needed... | Call getAuthToken()... |
| --- | --- |
| When app user accesses the app | After `microsoftTeams.initialize()`. |
| To use a particular functionality of the app | When the app user takes an action that requires signing in. |

### Add code for getAuthToken

Add JavaScript code snippet to the tab app to:

- Call `getAuthToken()`.
- Parse the access token or pass it to the server-side code.

The following code snippet shows an example of calling `getAuthToken()`.

```javascript
microsoftTeams.initialize();
var authTokenRequest = {
  successCallback: function(result) { console.log("Success: " + result); },
  failureCallback: function(error) { console.log("Error getting token: " + error); }
};
microsoftTeams.authentication.getAuthToken(authTokenRequest);
```

You can add calls of `getAuthToken()` to all functions and handlers that initiate an action where the token is needed.

<br>
<details>
<summary>Here's an example of the client-side code:</summary>

:::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/config-client-code.png" alt-text="Configure client code" lightbox="../../../assets/images/authentication/teams-sso-tabs/config-client-code.png":::

</details>

When Teams receives the access token, it's cached and reused as needed. This token can be used whenever `getAuthToken()` is called, until it expires, without making another call to Azure AD.

> [!IMPORTANT]
> As a best practice for security of access token:
>
> - Always call `getAuthToken()` only when you need an access token.
> - Teams will cache the access token for you. Don't cache or store it in your app's code.

### Consent dialog for getting access token

When you call `getAuthToken()` and app user's consent is required for user-level permissions, an Azure AD dialog is shown to the app user who is currently signed in.

:::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/tabs-sso-prompt.png" alt-text="Tab single sign-on dialog prompt":::

The consent dialog that appears is for open-id scopes defined in Azure AD. The app user must give consent only once. After consenting, the app user can access and use your tab app for the granted permissions and scopes.

> [!IMPORTANT]
> Scenarios where consent dialogs are not needed:
>
> - If the tenant administrator has granted consent on behalf of the tenant, app users don't need to be prompted for consent at all. This means that the app users don't see the consent dialogs, and can access the app seamlessly.
> - If your Azure AD app is registered in the same tenant from which you're requesting an authentication in Teams, the app user can't be asked to consent, and is granted an access token right away. App users consent to these permissions only if the Azure AD app is registered in a different tenant.

If you encounter any errors, see [Troubleshooting SSO authentication in Teams](tab-sso-troubleshooting.md).

### Use the access token as an identity token

The token returned to the tab app is both an access token and an ID token. The tab app can use the token as an access token to make authenticated HTTPS requests to APIs on the server-side.

The access token returned from `getAuthToken()` can be used to establish the app user's identity using the following claims in the token:

- `name`: The app user's display name.
- `preferred_username`: The app user's email address.
- `oid`: A GUID representing the ID of the app user.
- `tid`: A GUID representing the tenant that the app user is signing in to.

Teams can cache this information associated with the app user's identity, such as the user's preferences.

> [!NOTE]
> If you need to construct a unique ID to represent the app user in your system, see [Using claims to reliably identify a user](/azure/active-directory/develop/id-tokens#using-claims-to-reliably-identify-a-user-subject-and-object-id).

## Pass the access token to server-side code

If you need to access web APIs on your server, you'll need to pass the access token to your server-side code. The web APIs must decode access token to view claims for that token.

> [!NOTE]
> If you don't receive User Principal Name (UPN) in the returned access token, add it as an [optional claim](/azure/active-directory/develop/active-directory-optional-claims) in Azure AD.
> For more information, see [Access tokens](/azure/active-directory/develop/access-tokens).

The access token received in success callback of `getAuthToken()` provides access (for the authenticated app user) to your web APIs. The server-side code can also parse the token for [identity information](#use-the-access-token-as-an-identity-token), if needed.

If you need to pass the access token to get Microsoft Graph data, see [Extend tab app with Microsoft Graph permissions](tab-sso-graph-api.md).

### Code for passing access token to server-side

The following code shows an example of passing the access token to the server-side. The token is passed in an `Authorization` header when sending a request to a server-side web API. This example sends JSON data, so it uses the `POST` method. The `GET` is sufficient to send the access token when you're not writing to the server.

```javascript
$.ajax({
    type: "POST",
    url: "/api/DoSomething",
    headers: {
        "Authorization": "Bearer " + accessToken
    },
    data: { /* some JSON payload */ },
    contentType: "application/json; charset=utf-8"
}).done(function (data) {
    // Handle success
}).fail(function (error) {
    // Handle error
}).always(function () {
    // Cleanup
});
```

### Validate the access token

For more information about validate the access token, see [Validate tokens](azure/active-directory/develop/access-tokens#validate-tokens).

#### Example access token

The following is a typical decoded payload of an access token.

```javascript
{
    aud: "2c3caa80-93f9-425e-8b85-0745f50c0d24",
    iss: "https://login.microsoftonline.com/fec4f964-8bc9-4fac-b972-1c1da35adbcd/v2.0",
    iat: 1521143967,
    nbf: 1521143967,
    exp: 1521147867,
    aio: "ATQAy/8GAAAA0agfnU4DTJUlEqGLisMtBk5q6z+6DB+sgiRjB/Ni73q83y0B86yBHU/WFJnlMQJ8",
    azp: "e4590ed6-62b3-5102-beff-bad2292ab01c",
    azpacr: "0",
    e_exp: 262800,
    name: "Mila Nikolova",
    oid: "6467882c-fdfd-4354-a1ed-4e13f064be25",
    preferred_username: "milan@contoso.com",
    scp: "access_as_user",
    sub: "XkjgWjdmaZ-_xDmhgN1BMP2vL2YOfeVxfPT_o8GRWaw",
    tid: "fec4f964-8bc9-4fac-b972-1c1da35adbcd",
    uti: "MICAQyhrH02ov54bCtIDAA",
    ver: "2.0"
}
```

## Code samples

| Sample name | Description | .NET| Node.js |
|---------------|---------------|------|--------------|
| Tab SSO |Microsoft Teams sample app for tabs Azure AD SSO| [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-sso/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/tab-sso/nodejs), </br>[Teams Toolkit](../../../toolkit/visual-studio-code-tab-sso.md)|
| Tab, Bot and Message Extension (ME) SSO | This sample shows SSO for Tab, Bot and ME - search, action, linkunfurl. |  [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-sso/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-sso/nodejs) |

## Next step

> [!div class="nextstepaction"]
> [Update Teams app manifest and preview the app](tab-sso-manifest.md)

## See also

- [jwt.ms](https://jwt.ms/)
- [Active directory optional claim](/azure/active-directory/develop/active-directory-optional-claims)
- [Access tokens](/azure/active-directory/develop/access-tokens)
- [Overview of the Microsoft Authentication Library (MSAL)](/azure/active-directory/develop/msal-overview)
- [Microsoft identity platform ID tokens](/azure/active-directory/develop/id-tokens)
- [Microsoft identity platform access tokens](/azure/active-directory/develop/access-tokens#validating-tokens)
