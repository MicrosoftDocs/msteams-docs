---
title: Use external OAuth providers  
description: Describes authentication using external OAuth providers  
ms.topic: how-to
ms.localizationpriority: high
keywords: teams authentication using external OAuth provider
---

# Use external OAuth providers

You can support external or third-party (3P) OAuth providers, such as Google, GitHub, LinkedIn, and Facebook using the updated `authenticate()` API:

```JavaScript
function authenticate(authenticateParameters?: AuthenticateParameters)
``` 

The following are added to the `authenticate()` API to support external OAuth providers:

* `isExternal` parameter
* Two placeholder values in the existing `url` parameter


The following table provides the list of `authenticate()` API parameters and functions along with their descriptions:

| Parameter| Description|
| --- | --- |
|`isExternal` | The type of parameter is Boolean, which indicates that the auth window opens in an external browser.|
|`failureCallback`| The function is called if the authentication fails, when returned from the authentication pop-up.|
|`height` |The preferred height for the pop-up. The value can be ignored if outside the acceptable bounds.|
|`successCallback`| The function is called if the authentication succeeds, with the result returned from the authentication pop-up. Authcode is the result.|
|`url`  <br>|The URL of 3P app server for the authentication pop-up, with two parameter placeholders:</br> <br> - `oauthRedirectMethod`: Pass placeholder in `{}`. You can replace the placeholder by deeplink or web of Teams platform, which informs app server if the call is coming from web, desktop, or mobile platform.</br> <br> - `authId`: You can replace the placeholder by UUID. The app server uses it to maintain session, for example, [`authId`](https://lnan-test2.loca.lt/auth?oauthRedirectMethod={oauthRedirectMethod}&authId={authId}). </br>| 
|`width`|The preferred width for the pop-up. The value can be ignored if outside the acceptable bounds.|

For more information on parameters, see [authenticate parameters interface](/javascript/api/@microsoft/teams-js/microsoftteams.authentication.authenticateparameters?view=msteams-client-js-latest&preserve-view=true).

## Add authentication to external browsers

> [!NOTE]
> * Currently, you can add authentication to external browsers for tabs only.
> * Use the beta version of JS SDK to leverage the functionality. Beta versions are available through [NPM](https://www.npmjs.com/package/@microsoft/teams-js/v/1.12.0-beta.2).

The following image provides the flow to add authentication to external browsers:

 :::image type="content" source="../../../assets/images/tabs/tabs-authenticate-OAuth.PNG" alt-text="authenticate-OAuth" border="true":::

### Steps to perform authentication to external browsers

<!-- #### 1. Pass `isExternal` and placeholders in `url` -->
**1. Initiate the external auth-login process**

The 3P app calls the SDK function `microsoftTeams.authentication.authenticate` with `isExternal` set as true to initiate the external auth-login process. 

The passed `url` contains placeholders for `{authId}`, and `{oauthRedirectMethod}`.  


```JavaScript
microsoftTeams.authentication.authenticate({
   url: “https://lnan-test2.loca.lt/auth?oauthRedirectMethod={oauthRedirectMethod}&authId={authId}”,,
   isExternal: true,
   successCallback: function (result) {
   //sucess 
   } failureCallback: function (reason) {
   //failure 
    }
});
```

**2. Teams opens the URL in an external browser**

The Teams clients open the URL in an external browser after replacing the placeholders for `oauthRedirectMethod` and `authId` with suitable values. 

#### Example

```http
 https://lnan-test2.loca.lt/auth?oauthRedirectMethod=deeplink&authId=1234567890 
```


**3. The 3P app server response

The 3P app server receives and saves the `url` with two query parameters `oauthRedirectMethod` and `authId`. 

The following table includes the query parameters:

| Parameter | Description|
| --- | --- |
| `oauthRedirectMethod` |Indicates how the 3P app sends the response of authentication request back to Teams, with one of the two values: deeplink or web.|
|`authId` | The request-id Teams for the specific authentication request and needs to be sent back to Teams through deeplink.|

> [!TIP]
> The 3P app can marshal `authId`, `oauthRedirectMethod` in the OAuth `state` query parameter while generating the login URL for the OAuthProvider. The `state` contains the passed `authId` and `oauthRedirectMethod`, when OAuthProvider redirects back to the 3P server and the 3P app uses the values for sending authentication response back to Teams as described in the response redirect to Teams section.

**4. The 3P app server redirects to specified `url`**

The 3P app server redirects to OAuth providers auth page in the external browser. The `redirect_uri` is a dedicated route on the 3P app server. You can register `redirect_uri` in the OAuth provider’s dev console as static, the parameters need to be sent through the state object. 

#### Example

```http
https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=https://lnan-test2.loca.lt/authredirect&state={"authId":"…","oauthRedirectMethod":"…"}&client_id=…&response_type=code&access_type=offline&scope= … 
```

**5. Sign into external browser**

The OAuth providers redirects back to the `redirect_uri` with the authcode when user signs into the external browser.

**6. The 3P app server response to Teams** 

The 3P app server handles the response and checks `oauthRedirectMethod`, which is returned from external OAuth provider in the state object to determine whether the response needs to be returned through the auth-callback deeplink or web that calls `notifySuccess()`.

```JavaScript
const state = JSON.parse(req.query.state)
if (state.  oauthRedirectMethod === 'deeplink') {
   return res.redirect(“msteams://teams.microsoft.com/l/auth-callback?authId=${state.authId}&code=${req.query.code}”)
}
else {
// continue redirecting to a web-page that will call notifySuccsss() – usually this method is used in Teams-Web
…
```

**7. The 3P app generates a deeplink**

The 3P app generates a deeplink for Teams desktop and mobile in the following format, and sends the authcode with the session ID back to Teams:
 
```JavaScript
return res.redirect(`msteams://teams.microsoft.com/l/auth-callback?authId=${state  .authId}&code=${req.query.code}`)
```

 **8. Teams `successCallback` results**

Teams calls the `successCallback` and sends the result, authcode to the 3P app. The 3P app receives the code in the `successCallback` to retrieve the token, user info and update the user interface from the code. 

```JavaScript
successCallback: function (result) { 
… 
} 
```

## See also

* [Configure identity providers](../../../concepts/authentication/configure-identity-provider.md)
* [Microsoft Teams authentication flow for tabs](auth-flow-tab.md)