---
title: Code configuration for enabling Teams SSO for tabs
description: Describes code configuration for enabling Teams SSO for tabs
ms.topic: how-to
ms.localizationpriority: medium
keywords: teams authentication tabs Microsoft Azure Active Directory (Azure AD) Graph API
---
# Configure code to enable Teams SSO

You need to configure your app code to obtain an access token from Azure AD using Teams identity of the app user.

## SDK Prerequisites

Teams mobile client versions supporting SSO:

- Teams for Android (1416/1.0.0.2020073101 and later)

- Teams for iOS (_Version_: 2.0.18 and later)  

- Teams JavaScript SDK (_Version_: 1.11 and later) for SSO to work in meeting side panel.

- For the best experience with Teams, use the latest version of iOS and Android.

## 

This step requires your app user to give their consent for using their Teams identity for user-level permission. Azure AD receives the user identity token (ID token) and sends an access token to Teams.

- **ID token**: An ID token is granted for a user when they have been verified successfully. It's used to cache user profile information. Teams uses this token to pre-fetch the access token for the user who is currently logged into Teams.
- **Access token**: An access token is an artifact contains user identity and permission scopes.

> [!NOTE]
> To avoid errors such as `Teams SDK Error: resourceDisabled`, ensure that application ID URI is configured properly in Azure AD app registration and in your Teams app.

### Add client-side code

Add JavaScript to the add-in to:

- Call getAccessToken.
- Parse the access token or pass it to the add-in’s server-side code.

The following code shows a simple example of calling getAccessToken and parsing the token for the user name and other credentials.

```javascript
var authTokenRequest = {
  successCallback: function(result) { console.log("Success: " + result); },
  failureCallback: function(error) { console.log("Failure: " + error); }
};
microsoftTeams.authentication.getAuthToken(authTokenRequest);
```

### When to call getAuthToken

Call the `getAuthToken` at the time when you need to validate the user identity.

- If your tab app requires the user identity to be validated at the time they access the app, call `getAuthToken` from inside `microsoftTeams.initialize()`.
- If the user can access your app but needs validation to use some functionality, then you can call `getAuthToken` when the user takes an action that requires a signed-in user.

You should also pass `allowSignInPrompt: true` in the options parameter of `getAuthToken`.

Teams caches the access token and will reuse it. As the access token is pre-fetched to improve app performance and load times. This token can be used until it expires, without making another call to the Azure AD whenever `getAuthToken` is called. So you can add calls of `getAuthToken` to all functions and handlers that initiate an action where the token is needed.

> [!IMPORTANT]
> As a best security practice, always call `getAuthToken` when you need an access token. Teams will cache it for you. Don't cache or store the access token using your own code.

### User consent for getting access token

When you call `getAuthToken` and user consent is required for user-level permissions, a dialog is shown to the user to grant consent.

:::image type="content" source="../../../assets/images/tabs/tabs-sso-prompt.png" alt-text="Tab single sign-on dialog prompt":::

After you receive access token in success callback, decode access token to view claims for that token. Optionally, manually copy and paste access token into a tool, such as [jwt.ms](https://jwt.ms/). If you aren't receiving the UPN in the returned access token, add it as an [optional claim](/azure/active-directory/develop/active-directory-optional-claims) in Azure AD.

For more information, see [access tokens](/azure/active-directory/develop/access-tokens).

### Pass the access token to server-side code

If you need to access web APIs on your server, or additional services such as Microsoft Graph, you'll need to pass the access token to your server-side code. The access token provides access (for the authenticated user) to your web APIs. Also the server-side code can parse the token for identity information if it needs it. (See Use the access token as an identity token below.) There are many libraries available for different languages and platforms that can help simplify the code you write.

For more information, see [Overview of the Microsoft Authentication Library (MSAL)](/azure/active-directory/develop/msal-overview).

If you need to access Microsoft Graph data, see [Acquire token for MS Graph](tab-sso-token-graph.md).

The following code shows an example of passing the access token to the server-side. The token is passed in an `Authorization` header when sending a request to a server-side web API. This example sends JSON data, so it uses the `POST` method, but `GET` is sufficient to send the access token when you are not writing to the server.

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

#### Validate the access token

Web APIs on your server must validate the access token if it is sent from the client. The token is a JSON Web Token (JWT), which means that validation works just like token validation in most standard OAuth flows.

There are a number of libraries available that can handle JWT validation, but the basics include:

- Checking that the token is well-formed
- Checking that the token was issued by the intended authority
- Checking that the token is targeted to the Web API

Keep in mind the following guidelines when validating the token:

- Valid SSO tokens will be issued by the Azure authority, https://login.microsoftonline.com. The `iss` claim in the token should start with this value.
- The token's `aud1 parameter will be set to the application ID of the add-in's Azure app registration.
- The token's `scp` parameter will be set to `access_as_user`.

For more information on token validation, see [Microsoft identity platform access tokens](/azure/active-directory/develop/access-tokens#validating-tokens).

**Example access token**: The following is a typical decoded payload of an access token.

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

### Use the access token as an identity token

The access token returned from getAccessToken() contains information that can be used to establish the identity. The following claims in the token relate to identity.

- name: The user's display name.
- preferred_username: The user's email address.
- oid: A GUID representing the ID of the user in the Microsoft identity system.
- tid: A GUID representing the tenant tha the user is signing in to.

For more details on these and other claims, see [Microsoft identity platform ID tokens](/azure/active-directory/develop/id-tokens). If you need to construct a unique ID to represent the user in your system, refer to [Using claims to reliably identify a user](/azure/active-directory/develop/id-tokens#using-claims-to-reliably-identify-a-user-subject-and-object-id) for more information.

## Code sample

|**Sample name**|**Description**|**C#**|**Node.js**|
|---------------|---------------|------|--------------|
| Tab SSO |Microsoft Teams sample app for tabs Azure AD SSO| [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-sso/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/tab-sso/nodejs), </br>[Teams Toolkit](../../../toolkit/visual-studio-code-tab-sso.md)|