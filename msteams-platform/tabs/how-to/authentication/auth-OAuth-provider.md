---
title: Authentication using external OAuth providers  
description: Describes authentication using external OAuth providers  
ms.topic: how-to
ms.localizationpriority: high
keywords: teams authentication SSO Microsoft Azure Active Directory (Azure AD) single sign-on api
---

# Authentication using external OAuth providers    

To support external or third party OAuth providers such as Google, the `authenticate()` API includes the following changes:

* The new parameter titled `isExternal`

* Placeholder values in existing URL parameter

TypeScript 

`function authenticate(authenticateParameters?: AuthenticateParameters)`



| Parameter           | Description   |
| --- | --- |
| isExternal         | A Boolean indicates the auth window opens in an external browser|
| failureCallback    | A function is called if the authentication fails, with the reason for the failure returned from the authentication pop-up|
| height             |The preferred height for the pop-up. The value can be ignored if outside the acceptable bounds|
| successCallback    | A function is called if the authentication succeeds, with the result returned from the authentication pop-up. Result will be the authcode |
| URL                | The URL of 3P app server for the authentication pop-up, with two parameter placeholders:<br> * oauthRedirectMethod: pass placeholder in `{}`, which replaces “deeplink” or “web” by Microsoft Teams platform informs app server if the call is from web or desktop/mobile platform. </br>
* authId:  UUID replaces the placeholder. App server uses it to maintain session &mdash;for example, https://lnan-test2.loca.lt/auth?oauthRedirectMethod={oauthRedirectMethod}&authId={authId} |
| width              | The preferred width for the pop-up. The value can be ignored if outside the acceptable bounds |

## Steps to perform external window auth 

### 1. Pass isExternal and placeholders in URL  

3P app calls the SDK function `microsoftTeams.authentication.authenticate` with `isExternal` set as true to initiate the external auth-login process. 

The passed URL contains placeholders for {authId}, and {oauthRedirectMethod}.  


```javascript
microsoftTeams.authentication.authenticate({
    URL: “https://lnan-test2.loca.lt/auth?oauthRedirectMethod={oauthRedirectMethod}&authId={authId}”,,
    isExternal: true,
   successCallback: function (result) {
   //sucess 
    } failureCallback: function (reason) {
    //failure 
    }
});
```

### 2. Microsoft Teams opens the URL in an external browser 

Teams clients opens the URL in an external browser after replacing the placeholders for oauthRedirectMethod and authId with suitable values. 

For example: https://lnan-test2.loca.lt/auth?oauthRedirectMethod=deeplink&authId=1234567890 

### 3. 3P app server saves the passed authId and oauthRedirectMethod 

The 3P app server receives the URL with two query parameters oauthRedirectMethod and authId. 

| Parameter           | Description   |
| --- | --- |
| oauthRedirectMethod |Indicates how the 3P app sends the response of authentication request back to Teams, it can have one of the two values: “deeplink” or “webpage” |
| authId              | The request-id Teams for the specific authentication request, which is sent back to Teams through the deeplink |

> [!TIP]
> 3P app marshals authId, oauthRedirectMethod in the OAuth ‘state’ query param when generating the login URL for the OAuthProvider. When OAuthProvider redirects back to 3P Server the ‘state’ contains the passed authId and oauthRedirectMethod, the 3P app uses the values for sending authentication response back to Teams as described in Step 6.


### 4. Response redirect 

3P server will redirect to OAuth providers (For example: Google, Github and others) auth page in the external browser. 

e.g. https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=https://lnan-test2.loca.lt/authredirect&client_id=…&response_type=code&access_type=offline&scope=… 
 
The redirect_uri is a dedicated route on the 3P app server. 

### 5. User sign in

User signs in into the external browser. OAuth providers (For example: Google, GitHub, Microsoft Azure Active Directory) redirects back to the redirect_uri with the auth code. 

### 6. Response redirect to Teams 

3P app server handles the response and checks the session variable oauthRedirectMethod to determine whether the response needs to be returned through “auth-callback” deeplink or webpage which calls `notifySuccess()`. 

```javascript
if (req.session.oauthRedirectMethod === 'deeplink') {  {
    return res.redirect(“msteams://teams.microsoft.com/l/auth-callback?
   authId=${req.session.authId}&code=${req.query.code}”)
   } 
   else { 
   // continue redirecting to a web-page which calls notifySuccess() – usually the method is used in Teams-Web 
```

 ### 7. Auth-callback deeplink format 

For Teams desktop and mobile, 3P app generates a deeplink in the following format and sends the auth code and the session ID back to Teams desktop.
 

```javascript
   return res.redirect(`msteams://teams.microsoft.com/l/auth-callback?
   authId=${req.session.authId}&code=${req.query.code}`) 
```

 ### 8. Success callback

Teams calls the success callback and sends the result (auth code) to the 3P app. The 3P app receives the code in the success callback and they can use the code to retrieve the token and then the user info and update the UI. 

```javascript
            successCallback: function (result) { 
… 
          } 
```

  > [!NOTE]
  > Kindly use the beta version of JS SDK to leverage the functionity for now. Beta versions are available via NPM - https://www.npmjs.com/package/@microsoft/teams-js/v/1.12.0-beta.2.

</br>
<img src="~/assets/images/tabs/tabs-authenticate-OAuth.png" alt="authenticate" width="75%"/>

