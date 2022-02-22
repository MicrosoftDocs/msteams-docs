---
title: Authentication using external OAuth providers  
description: Describes authentication using external OAuth providers  
ms.topic: how-to
ms.localizationpriority: high
keywords: teams authentication SSO Microsoft Azure Active Directory (Azure AD) single sign-on api
---

# Authentication using external OAuth providers    

To support external or 3rd party OAuth providers such as Google, we have introduced two significant changes in the authenticate() API. These changes include: 

A new parameter titled is External 

Two placeholder values in existing url parameter 

TypeScript 

`function authenticate(authenticateParameters?: AuthenticateParameters)` 



| Property           | Description   |
| --- | --- |
| isExternal         | A Boolean that indicates that the auth window should be opened in an external browser . |
| failureCallback    | A function that is called if the authentication fails, with the reason for the failure     returned from the authentication pop-up.|
| height             |The preferred height for the pop-up. This value can be ignored if outside the acceptable bounds. |
| successCallback    | A function that is called if the authentication succeeds, with the result returned from the authentication pop-up. Result will be the authcode.    |
| url                | The URL of 3P app server for the authentication pop-up, with two parameter| placeholders:
                     | 1. oauthRedirectMethod: Pass placeholder in {}. It will be replaced by “deeplink” or “web” by Teams platform that informs app server if the call is coming from web or desktop/mobile platform.|
                     | 2. authId – this placeholder will be replaced by UUID. App server will use it to maintain session. 
                      eg - https://lnan-test2.loca.lt/auth?oauthRedirectMethod={oauthRedirectMethod}&authId={authId} |
  
| width              | The preferred width for the pop-up. This value can be ignored if outside the acceptable bounds. |

# Steps to perform external window Auth 

### 1. Pass isExternal and placeholders in url  

3P App calls the SDK function microsoftTeams.authentication.authenticate with “isExternal” set as true to initiate the external auth-login process. 

The passed url should contain placeholders for {authId}, and {oauthRedirectMethod}.  


```javascript
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

### 2. Microsoft Teams opens the URL in external browser 

Teams clients will open the URL in external browser after replacing the placeholders for oauthRedirectMethod and authId with suitable values. 

e.g. https://lnan-test2.loca.lt/auth?oauthRedirectMethod=deeplink&authId=1234567890 

### 3. 3P App Server saves the passed authId and oauthRedirectMethod 

The 3P app server will receive this url with two query parameters oauthRedirectMethod and authId. 

|
| --- | --- |
| oauthRedirectMethod |Indicates how the 3P App should send the response of Authentication request back to Teams, it can have one of the two values: “deeplink” or “webpage”. external browser.|
| authId              | The request-id Teams created for this specific authentication request. It needs to be sent back to Teams via the deeplink. |

> [!TIP]
> 3P App can marshal authId, oauthRedirectMethod in the OAuth ‘state’ query param when generating the login url for the OAuthProvider. When OAuthProvider redirects back to 3P Server the ‘state’ will contain the passed authId and oauthRedirectMethod, the 3P App can use these values for sending authentication response back to Teams as described in Step-6..


### 4. Response redirect 

3P server will redirect to OAuth providers (e.g. Google, Github and others) auth page in the external browser 

e.g. https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=https://lnan-test2.loca.lt/authredirect&client_id=…&response_type=code&access_type=offline&scope=… 
 
The redirect_uri is a dedicated route on the 3P app server 

### 5. User sign in

User signs in into the external browser. OAuth providers (e.g. google, github, AAD) redirects back to the redirect_uri with the auth code 

### 6. Response redirect to Teams 

3P app server handles the response and checks the session variable oauthRedirectMethod to determine whether the response needs to be returned via “auth-callback” deeplink or via a webpage that calls notifySuccess(). 

```javascript
if (req.session.oauthRedirectMethod === 'deeplink') {  {
    return res.redirect(“msteams://teams.microsoft.com/l/auth-callback?
   authId=${req.session.authId}&code=${req.query.code}”)
   } 
   else { 
   // continue redirecting to a web-page that will call notifySuccsss() – usually this method is used in Teams-Web 
```

 ### 7. Auth-callback deeplink format 

For Teams-Desktop & Teams-Mobile, 3P App should generate a deeplink in the following format and send the auth code and the session id back to Teams Desktop 
 

```javascript
   return res.redirect(`msteams://teams.microsoft.com/l/auth-callback?
   authId=${req.session.authId}&code=${req.query.code}`) 
```

 ### 8. Success callback

Teams will call the success callback and send the result (auth code) to the 3P app. The 3P app receives the code in the success callback and they can use the code to retrieve the token and then the user info and update the UI. 

```javascript
            successCallback: function (result) { 
… 
          } 
```

> [!NOTE]
> Kindly use the beta version of JS SDK to leverage this functionity for now. Beta versions are available via NPM - https://www.npmjs.com/package/@microsoft/teams-js/v/1.12.0-beta.2.


 <img src="~/assets/images/tabs/tabs-authenticate-OAuth.png" alt="Tab single sign-on SSO diagram" width="75%"/>

## Step-by-step guides

* Follow the [step-by-step guide](../../../sbs-tabs-and-messaging-extensions-with-sso.yml) to authenticate tabs and messaging extensions.
* Follow the [step-by-step guide](../../../sbs-tab-with-adaptive-cards.yml) to create tab with adaptive cards.

## See also

[Teams Bot with Single sign-on](../../../sbs-bots-with-sso.yml)
