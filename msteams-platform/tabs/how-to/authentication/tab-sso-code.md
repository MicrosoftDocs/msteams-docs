---
title: Code configuration for enabling SSO for tabs
description: Describes code configuration for enabling SSO for tabs
ms.topic: how-to
ms.localizationpriority: medium
keywords: teams authentication tabs Microsoft Azure Active Directory (Azure AD) Graph API
---
# Add code to enable SSO

Before you add code to enable SSO, ensure that you've registered your app with Azure AD.

> [!div class="nextstepaction"]
> [Register with Azure AD](tab-sso-register-aad.md)

You need to configure your app's code to handle access tokens. Add the client-side code to obtain an access token from Azure AD using Teams identity of the app user. Teams caches this access token for future use. You can also use the access token as an identity token for authenticating and authorizing your app users. If your tab app requires additional Microsoft Graph permissions, you'll need to pass the access token to the server side, and validate the token for Graph permissions.

:::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/sso-config-code.png" alt-text="configure code for handling access token" border="false":::

This section covers:

- [Update client-side code to get an access token](#update-client-side-code-to-get-an-access-token)
- [Pass the access token to server-side code](#pass-the-access-token-to-server-side-code)
- [Decode and validate the access token](#decode-and-validate-the-access-token)

## Update client-side code to get an access token

<!--Your app user must give consent to Teams for using the Teams identity token (ID token) to get user-level permission. Azure AD receives the app user's Teams ID token, and sends an access token to Teams.

Here's a quick look at types of tokens:

- **ID token**: An ID token is granted for an app user after successful validation. It's used to cache user profile information. Teams uses this token to pre-fetch access token for an app user who is currently logged into Teams.
- **Access token**: An access token is an artifact that contains app user's identity and permission scopes. It's granted through Azure AD when you enable SSO in a tab app.-->

To obtain app access for the current app user, your client-side code must make a call to Teams for getting an access token.

<!--This section includes:

- [Client-side code to obtain access token](#client-side-code-to-obtain-access-token)
- [Consent dialog for getting access token](#consent-dialog-for-getting-access-token)
- [Use the access token as an identity token](#use-the-access-token-as-an-identity-token)-->

### Client-side code to obtain access token

You need to add the client-side code for using `getAuthToken()` to initiate the validation process.

#### When to call getAuthToken

Use `getAuthToken()` at the time when you need access token for the current app user:

| If access token is needed... | Call getAuthToken()... |
| --- | --- |
| When app user accesses the app | From inside `microsoftTeams.initialize()`. |
| To use a particular functionality of the app | When the app user takes an action that requires signing in. |

When Teams receives the access token, it's cached and reused as needed. This token can be used whenever `getAuthToken()` is called, until it expires, without making another call to Azure AD. You can add calls of `getAuthToken()` to all functions and handlers that initiate an action where the token is needed.

> [!IMPORTANT]
> As a best practice for security of access token:
>
> - Always call `getAuthToken()` only when you need an access token.
> - Teams will cache access token for you. Don't cache or store the access token in your app's code.

#### Add code for getAuthToken

Add the following code snippet to the client-side code to:

- Call `getAuthToken()`.
- Parse the access token or pass it to the server-side code.

The following code snippet shows an example of calling `getAuthToken()` and parsing the token for user name and other credentials.

```javascript
var authTokenRequest = {
  successCallback: function(result) { console.log("Success: " + result); },
  failureCallback: function(error) { console.log("Failure: " + error); }
};
microsoftTeams.authentication.getAuthToken(authTokenRequest);
```

<br>
As Teams uses the app user's ID token, the app user should have signed in to Teams. Pass `allowSignInPrompt: true` in the `options` parameter of `getAuthToken()` in your client-side code to ensure that Teams prompts the app user through the UI to sign in, if needed.

<br>
<details>
<summary>Here's an example of the client-side code:</summary>

:::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/config-client-code.png" alt-text="Configure client code" lightbox="../../../assets/images/authentication/teams-sso-tabs/config-client-code.png":::

</details>

#### ID token and access token

Here's a quick look at types of tokens used in the authentication and authorization process:

- **ID token**: An ID token is granted for an app user after successful validation. It's used to cache user profile information. Teams uses ID token to pre-fetch access token for an app user who is currently logged into Teams.
- **Access token**: An access token is an artifact that contains app user's identity and permission scopes. It's granted through Azure AD when you enable SSO in a tab app. This token is an access token for calling your own back-end API. (The audience claim is set to your app's client ID). This allows your tab app to authenticate the app user and authorize access to its own API.

> [!NOTE]
> If the application needs additional Microsoft Graph permissions, see [Extend your app with Microsoft Graph permissions](tab-sso-graph-api.md).

### Consent dialog for getting access token

When you call `getAuthToken()` and user consent is required for user-level permissions, a dialog is shown to the app user who is currently signed in.

:::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/tabs-sso-prompt.png" alt-text="Tab single sign-on dialog prompt":::

When an app user accesses your tab app for the first time and your tab app makes the `getAuthToken()` call, the app user must give consent. The following consent dialogs appear at runtime:

1. **Teams consent dialog**:
  It's the first consent dialog that appears. The app user must give consent to Teams for using Teams ID token.

1. **Azure AD consent dialog**:
  After Teams receives the app user's consent for using the ID token to obtain access token, it displays the Azure AD consent dialog. It seeks the app user's consent for user-level permissions that you've configured as scope in Azure AD.

The consent given in these two dialogs is to be given only once. The app user is able to access and use your tab app for the granted permissions and scopes.

> [!IMPORTANT]
> Scenarios where consent dialogs are not needed:
>
> - If the tenant administrator has granted consent on behalf of the tenant, the app users don't need to be prompted for consent at all. This means that the app users don't see the consent dialogs, and can access the app seamlessly.
> - If your Azure AD app is registered in the same tenant from which you're requesting an authentication in Teams, the app user can't be asked to consent, and is granted an access token right away. App users consent to these permissions only if the Azure AD app is registered in a different tenant.

If you encounter any errors, see [Troubleshooting SSO authentication in Teams](tab-sso-troubleshooting.md).

### Use the access token as an identity token

The token returned to the tab app is both an access token and an ID token. The tab app can use the token as an access token to make authenticated HTTPS requests to APIs on the server-side.

The access token returned from `getAuthToken()` can be used to establish an app user's identity using the following claims in the token:

- `name`: The app user's display name.
- `preferred_username`: The app user's email address.
- `oid`: A GUID representing the ID of the app user.
- `tid`: A GUID representing the tenant that the app user is signing in to.

Teams can cache this information associated with the app user's identity, such as the user's preferences.

> [!NOTE]
> If you need to construct a unique ID to represent the app user in your system, see [Using claims to reliably identify a user](/azure/active-directory/develop/id-tokens#using-claims-to-reliably-identify-a-user-subject-and-object-id).

## Pass the access token to server-side code

If you need to access web APIs on your server, you'll need to pass the access token to your server-side code. The web APIs must decode access token to view claims for that token.

The access token received in success callback of `getAuthToken()` provides access (for the authenticated app user) to your web APIs. The server-side code can also parse the token for [identity information](#use-the-access-token-as-an-identity-token), if needed.

If you need to pass the access token to get Microsoft Graph data, see [Extend tab app with Microsoft Graph permissions](tab-sso-graph-api.md).

This section includes:

- [Code for passing access token to server-side](#code-for-passing-access-token-to-server-side)
- [Decode and validate the access token](#decode-and-validate-the-access-token)

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

### Decode and validate the access token

Web APIs on your server must decode the access token, and validate if it is sent from the client. The token is a JSON Web Token (JWT), which means that validation works just like token validation in most standard OAuth flows. The web APIs must decode access token. Optionally, you can copy and paste access token manually into a tool, such as jwt.ms.

There are a number of libraries available that can handle JWT validation. Basic validation includes:

- Checking that the token is well-formed
- Checking that the token was issued by the intended authority
- Checking that the token is targeted to the web API

Keep in mind the following guidelines when validating the token:

- Valid SSO tokens are issued by the Azure AD. The `iss` claim in the token should start with this value.
- The token's `aud1` parameter will be set to the app ID generated during Azure AD app registration.
- The token's `scp` parameter will be set to `access_as_user`.

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

|**Sample name**|**Description**|**C#**|**Node.js**|
|---------------|---------------|------|--------------|
| Tab SSO |Microsoft Teams sample app for tabs Azure AD SSO| [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-sso/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/tab-sso/nodejs), </br>[Teams Toolkit](../../../toolkit/visual-studio-code-tab-sso.md)|

| **Sample name** | **Description** | **.NET** | **Node.js** | **Python** |
|---------------|------------|------------|-------------|---------------|
| Tab, Bot and Message Extension (ME) SSO | This sample shows SSO for Tab, Bot and ME - search, action, linkunfurl. |  [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-sso/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-sso/nodejs) | Not available |

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
