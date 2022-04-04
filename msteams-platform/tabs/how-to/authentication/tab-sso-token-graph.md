---
title: Acquire token for MS Graph
description: Describes acquiring token for MS Graph
ms.topic: how-to
ms.localizationpriority: medium
keywords: teams authentication tabs Microsoft Azure Active Directory (Azure AD) Graph API
---
# Acquire token for MS Graph

This step requires your app user to give their consent for using their credentials for user-level permission. Azure AD receives the user credentials and sends an access token to Teams.

> [!NOTE]
> To avoid errors such as `Teams SDK Error: resourceDisabled`, ensure that Application ID URI is configured properly in Azure AD app registration and in your Teams app.

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