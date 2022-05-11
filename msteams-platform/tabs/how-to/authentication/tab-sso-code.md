---
title: Code configuration for enabling SSO for tabs
description: Describes code configuration for enabling SSO for tabs
ms.topic: how-to
ms.localizationpriority: medium
keywords: teams authentication tabs Microsoft Azure Active Directory (Azure AD) Graph API
---
# Configure code to enable SSO

Before you configure code to enable SSO, ensure that you've registered your app with Azure AD.

> [!div class="nextstepaction"]
> [Register with Azure AD](tab-sso-register-aad.md)

You need to configure your app's code to handle access tokens. Configure the client-side code to obtain an access token from Azure AD using Teams identity of the app user. Teams caches this access token. You can also use the access token as an identity token for authenticating and authorizing your users. If your app requires additional Microsoft Graph permissions, you'll need to pass the access token to the server side and validate the token for Graph permissions.

:::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/sso-config-code.png" alt-text="configure code for handling access token" border="false":::

This section covers:

- [Configure client-side code to get an access token](#configure-client-side-code-to-get-an-access-token)
- [Pass the access token to server-side code](#pass-the-access-token-to-server-side-code)
- [Decode and validate the access token](#decode-and-validate-the-access-token)

## Configure client-side code to get an access token

Your app user must give consent to Teams for using the Teams identity token to get user-level permission. Azure AD receives the app user's Teams identity token (ID token) and sends an access token to Teams.

- **ID token**: An ID token is granted for a user when they have been verified successfully. It's used to cache user profile information. Teams uses this token to pre-fetch the access token for the app user who is currently logged into Teams.
- **Access token**: An access token is an artifact that contains app user's identity and permission scopes. For enabling SSO in tab, it's granted through Azure AD.

To achieve app access for the current Teams user, your client-side code must make a call to Teams for getting an access token.

This section includes:

- [Client-side code to obtain access token](#client-side-code-to-obtain-access-token)
- [Teams mobile client support](#teams-mobile-client-support)
- [Consent dialog for getting access token](#consent-dialog-for-getting-access-token)
- [Use the access token as an identity token](#use-the-access-token-as-an-identity-token)

### Client-side code to obtain access token

The tab app needs to make a JavaScript call towards Teams to obtain access token in exchange for the identity token of the app user. You need to configure the client-side code for using `getAuthToken()` to initiate the validation process.

#### When to call getAuthToken

Use `getAuthToken()` at the time when you need to validate the user identity:

| If user validation is needed... | Call getAuthToken()... |
| --- | --- |
| At the time user accesses the app | From inside `microsoftTeams.initialize()`. |
| To use a particular functionality of the app | When the user takes an action that requires a signed-in user. |

When Teams obtains the access token, it's cached and reused as needed. This token can be used whenever `getAuthToken()` is called, until it expires, without making another call to Azure AD. You can add calls of `getAuthToken()` to all functions and handlers that initiate an action where the token is needed.

> [!IMPORTANT]
> As a best practice for security of access token, always call `getAuthToken()` when you need an access token. Teams will cache it for you. Don't cache or store the access token using your own code.

#### Code for getAuthToken

Add the following code to the Teams Client to:

- Call `getAuthToken()`.
- Parse the access token or pass it to the server-side code.

The following code shows a simple example of calling `getAuthToken()` and parsing the token for the user name and other credentials.

```javascript
var authTokenRequest = {
  successCallback: function(result) { console.log("Success: " + result); },
  failureCallback: function(error) { console.log("Failure: " + error); }
};
microsoftTeams.authentication.getAuthToken(authTokenRequest);
```

<br>
<details>
<summary>Here's an example of the client-side code:</summary>

:::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/config-client-code.png" alt-text="Configure client code":::

</details>

You should also pass `allowSignInPrompt: true` in the options parameter of `getAuthToken()`.

> [!NOTE]
> To avoid errors, such as `Teams SDK Error: resourceDisabled`, ensure that application ID URI is configured properly in Azure AD app registration and in your Teams Client.
> For more information on application ID URI, please see [To expose an API](/tabs/how-to/authentication/tab-sso-register-aad.md#to-expose-an-api).

### Teams mobile client support

For Teams mobile, client versions that support SSO are:

- Teams for Android (1416/1.0.0.2020073101 and later)
- Teams for iOS (_Version_: 2.0.18 and later)  
- Teams JavaScript SDK (_Version_: 1.11 and later) for SSO to work in meeting side panel.

For the best experience with Teams, use the latest version of iOS and Android.

### Consent dialog for getting access token

When you call `getAuthToken()` and user consent is required for user-level permissions, a dialog is shown to the user to seek consent.

:::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/tabs-sso-prompt.png" alt-text="Tab single sign-on dialog prompt":::

When the app user access your tab app and your tab app makes the `getAuthToken` call, the app user must give consent to Teams. The following consent dialogs appear to the user:

1. **Teams consent dialog**:
  It's the first dialog that appears. The app user must give consent to Teams for using Teams identity.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/teams-sso-consent.png" alt-text="Teams consent dialog":::

    To consent to Teams, the app user should select **Continue**.

1. **Azure AD consent dialog**:
  After the app user consents to Teams using the identity token for obtaining access token, Azure AD dialog appears. This dialog seeks the user consent for permissions that you've configured as scope in Azure AD.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/aad-sso-consent.png" alt-text="Azure AD consent dialog":::

    To consent, the app user should select **Accept**.

The app user will be able to access your app after they've consented to Teams and Azure AD dialogs.

After you receive access token in success callback, web APIs on your server must decode access token to view claims for that token. Optionally, copy and paste access token manually into a tool, such as jwt.ms. If you aren't receiving the UPN in the returned access token, add it as an optional claim in Azure AD.

### Use the access token as an identity token

The token returned to the tab app is both an access token and an identity token. The tab app can use the token as an access token to make authenticated HTTPS requests to APIs on the server-side.

The access token returned from `getAuthToken()` contains information that can be used to establish the identity. The following claims in the token relate to identity:

- name: The user's display name.
- preferred_username: The user's email address.
- oid: A GUID representing the ID of the user in the Microsoft identity system.
- tid: A GUID representing the tenant tha the user is signing in to.

Teams can cache this information associated with the user's identity; such as the user's preferences.

> [!NOTE]
> If you need to construct a unique ID to represent the user in your system, please see [Using claims to reliably identify a user](/azure/active-directory/develop/id-tokens#using-claims-to-reliably-identify-a-user-subject-and-object-id).

## Pass the access token to server-side code

If you need to access web APIs on your server, you'll need to pass the access token to your server-side code. The access token provides access (for the authenticated user) to your web APIs. The server-side code can also parse the token for [identity information](#use-the-access-token-as-an-identity-token), if needed.

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

Web APIs on your server must decode and validate the access token if it's sent from the client. The token is a JSON Web Token (JWT), which means that validation works just like token validation in most standard OAuth flows.

There are a number of libraries available that can handle JWT validation, but the basics include:

- Checking that the token is well-formed
- Checking that the token was issued by the intended authority
- Checking that the token is targeted to the web API

Keep in mind the following guidelines when validating the token:

- Valid SSO tokens are issued by the Azure AD. The `iss` claim in the token should start with this value.
- The token's `aud1` parameter will be set to the application ID of the add-in's Azure app registration.
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

<!--
### When to call getAuthToken

Call `getAuthToken` at the time when you need to validate the user identity.

- If your tab app requires the user identity to be validated at the time they access the app, call `getAuthToken` from inside `microsoftTeams.initialize()`.
- If the user can access your app but needs validation to use some functionality, then you can call `getAuthToken` when the user takes an action that requires a signed-in user.

You should also pass `allowSignInPrompt: true` in the options parameter of `getAuthToken`.

Teams caches the access token and will reuse it. This token can be used until it expires, without making another call to the Azure AD whenever `getAuthToken` is called. So you can add calls of `getAuthToken` to all functions and handlers that initiate an action where the token is needed.

> [!IMPORTANT]
> As a best security practice, always call `getAuthToken` when you need an access token. Teams will cache it for you. Don't cache or store the access token using your own code.-->
