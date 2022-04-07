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

## Get an access token from your client-side code

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

There is no significant performance degradation with redundant calls of `getAuthToken` because Teams caches the access token and will reuse it. This token can be used until it expires, without making another call to the Azure AD whenever `getAuthToken` is called. So you can add calls of `getAuthToken` to all functions and handlers that initiate an action where the token is needed.

> [!IMPORTANT]
> As a best security practice, always call `getAuthToken` when you need an access token. Teams will cache it for you. Don't cache or store the access token using your own code.

### Pass the access token to server-side code



### Validate the access token

#### Example access token

The following is a typical decoded payload of an access token.

### Use the access token as an identity token

With Teams SSO, the access token is pre-fetched to improve app performance and load times.

When you call `getAuthToken` and user consent is required for user-level permissions, a dialog is shown to the user to grant consent.

After you receive access token in success callback, decode access token to view claims for that token. Optionally, manually copy and paste access token into a tool, such as [jwt.ms](https://jwt.ms/). If you aren't receiving the UPN in the returned access token, add it as an [optional claim](/azure/active-directory/develop/active-directory-optional-claims) in Azure AD.

For more information, see [access tokens](/azure/active-directory/develop/access-tokens).

:::image type="content" source="../../../assets/images/tabs/tabs-sso-prompt.png" alt-text="Tab single sign-on dialog prompt":::

## Code sample

|**Sample name**|**Description**|**C#**|**Node.js**|
|---------------|---------------|------|--------------|
| Tab SSO |Microsoft Teams sample app for tabs Azure AD SSO| [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-sso/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/tab-sso/nodejs), </br>[Teams Toolkit](../../../toolkit/visual-studio-code-tab-sso.md)|