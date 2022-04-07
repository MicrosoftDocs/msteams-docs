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

Use the following authentication API:

```javascript
var authTokenRequest = {
  successCallback: function(result) { console.log("Success: " + result); },
  failureCallback: function(error) { console.log("Failure: " + error); }
};
microsoftTeams.authentication.getAuthToken(authTokenRequest);
```



When you call `getAuthToken` and user consent is required for user-level permissions, a dialog is shown to the user to grant consent.

After you receive access token in success callback, decode access token to view claims for that token. Optionally, manually copy and paste access token into a tool, such as [jwt.ms](https://jwt.ms/). If you aren't receiving the UPN in the returned access token, add it as an [optional claim](/azure/active-directory/develop/active-directory-optional-claims) in Azure AD. For more information, see [access tokens](/azure/active-directory/develop/access-tokens).

<p>
    <img src="~/assets/images/tabs/tabs-sso-prompt.png" alt="Tab single sign-on SSO dialog prompt" width="75%"/>
</p>

## Code sample

|**Sample name**|**Description**|**C#**|**Node.js**|
|---------------|---------------|------|--------------|
| Tab SSO |Microsoft Teams sample app for tabs Azure AD SSO| [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-sso/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/tab-sso/nodejs), </br>[Teams Toolkit](../../../toolkit/visual-studio-code-tab-sso.md)|