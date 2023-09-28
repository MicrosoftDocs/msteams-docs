---
title: Use external OAuth providers  
description: Authenticate your app users using external OAuth providers and learn how to add it to external browser.
ms.topic: how-to
ms.localizationpriority: high
ms.date: 09/01/2022
---

# Use external OAuth providers

[!INCLUDE [sdk-include](~/includes/sdk-include.md)]

You can support external or third-party (3P) OAuth providers, such as Google, GitHub, LinkedIn, and Facebook using the updated `authenticate()` API:

```JavaScript
function authenticate(authenticateParameters: AuthenticatePopUpParameters): Promise<string>
```

The following are added to the `authenticate()` API to support external OAuth providers:

* `isExternal` parameter
* Three placeholder values in the existing `url` parameter

The following table provides the list of `authenticate()` API parameters (`AuthenticatePopUpParameters`) and functions along with their descriptions:

| Parameter| Description|
| --- | --- |
|`isExternal` | The type of parameter is Boolean, which indicates that the auth window opens in an external browser.|
|`height` |The preferred height for the pop-up. The value can be ignored if outside the acceptable bounds.|
|`url`  <br>|The URL of third-party app server for the authentication pop-up, with the following three parameter placeholders:</br> <br> - `oauthRedirectMethod`: Pass placeholder in `{}`. The Teams platform replaces this placeholder with a deeplink or web page, which updates the app server if the call comes from a mobile platform.</br> <br> - `authId`: UUID (Universal unique identifer) replaces this placeholder. The app server uses it to maintain session. <br> - `hostRedirectUrl`: pass placeholder in {}. The current platform and client replace this placeholder with a redirect URL, which redirects the user to the correct client after completing authentication. </br>|
|`width`|The preferred width for the pop-up. The value can be ignored if outside the acceptable bounds.|

For more information on parameters, see the [authenticate(AuthenticatePopUpParameters)](/javascript/api/@microsoft/teams-js/authentication#@microsoft-teams-js-authentication-authenticate) function.

## Add authentication to external browsers

> [!NOTE]
>
> * Currently, you can add authentication to external browsers for tabs in mobile only.
> * Use the beta version of TeamsJS to leverage the functionality. Beta versions are available through [NPM](https://www.npmjs.com/package/@microsoft/teams-js/v/1.12.0-beta.2).

The following image provides the flow to add authentication to external browsers:

 :::image type="content" source="../../../assets/images/tabs/tabs-authenticate-OAuth.PNG" alt-text="authenticate-OAuth":::

**To add authentication to external browsers**

1. Initiate the external auth-login process.

   The third-party app calls the TeamsJS function `authentication.authenticate` with `isExternal` set as true to initiate the external auth-login process.

   The passed `url` contains placeholders for `{authId}`, and `{oauthRedirectMethod}`.  

    ```JavaScript
    import { authentication } from "@microsoft/teams-js";
    authentication.authenticate({
       url: 'https://3p.app.server/auth?oauthRedirectMethod={oauthRedirectMethod}&authId={authId}',
       isExternal: true,
       successCallback: function (result) {
       //sucess 
       } failureCallback: function (reason) {
       //failure 
        }
    });
    ```

1. Teams link opens in an external browser.

   The Teams clients open the URL in an external browser after replacing the placeholders for `oauthRedirectMethod` and `authId` with suitable values.

   **Example**

   ```http
    https://3p.app.server/auth?oauthRedirectMethod=deeplink&authId=1234567890 
   ```

1. The third-party app server responds.

   The third-party app server receives and saves the `url` with the following two query parameters:

   | Parameter | Description|
   | --- | --- |
   | `oauthRedirectMethod` |Indicates how the third-party app must send the response of authentication request back to Teams, with one of the two values: deeplink or page.|
   |`authId` | The request-id Teams created for this specific authentication request that needs to be sent back to Teams through deeplink.|

    > [!TIP]
    > The app can marshal `authId`, `oauthRedirectMethod` in the OAuth `state` query parameter while generating the login URL for the OAuthProvider. The `state` contains the passed `authId` and `oauthRedirectMethod`, when OAuthProvider redirects back to the server and the app uses the values for sending authentication response back to Teams as described in step 6.

1. The third-party app server redirects to specified `url`.

   The third-party app server redirects to OAuth providers auth page in the external browser. The `redirect_uri` is a dedicated route on the app server. You can register `redirect_uri` in the OAuth provider’s dev console as static, the parameters need to be sent through the state object.

   **Example**

    ```http
    https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=https://3p.app.server/authredirect&state={"authId":"…","oauthRedirectMethod":"…"}&client_id=…    &response_type=code&access_type=offline&scope= … 
    ```

1. Sign in to external browser.

   User signs in to the external browser. The OAuth providers redirect back to the `redirect_uri` with the auth code and the state object.

1. The third-party app server checks and responds to Teams.

   The third-party app server handles the response and checks `oauthRedirectMethod`, which is returned from external OAuth provider in the state object to determine whether the response needs to be returned through the auth-callback deeplink or through web page that calls `notifySuccess()`.

      ```JavaScript
      const state = JSON.parse(req.query.state)
      if (state.oauthRedirectMethod === 'deeplink') {
         return res.redirect('msteams://teams.microsoft.com/l/auth-callback?authId=${state.authId}&result=${req.query.code}')
      }
      else {
      // continue redirecting to a web-page that will call notifySuccess() – usually this method is used in Teams-Web
      …
      ```

1. The third-party app generates a deeplink.

   The third-party app generates a deeplink for Teams mobile in the following format, and sends the auth code with the session ID back to Teams.

   ```JavaScript
   return res.redirect(`msteams://teams.microsoft.com/l/auth-callback?authId=${state.authId}&result=${req.query.code}`)
   ```

1. Teams calls success callback and sends result.

    Teams calls the success callback and sends the result (auth code) to the third-party app. The app receives the code in the success callback and uses the code to retrieve the token, then the user information and update the user interface.

      ```JavaScript
      successCallback: function (result) { 
      … 
      } 
      ```

## See also

* [Configure identity providers](~/concepts/authentication/authentication.md)
* [Microsoft Teams authentication flow for tabs](auth-flow-tab.md)
