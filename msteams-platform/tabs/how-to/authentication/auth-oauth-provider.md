---
title: Support Third Party OAuth Providers
description: Learn how to use external OAuth providers, add authentication to external browsers, and about the authenticate API parameters.
ms.topic: how-to
ms.localizationpriority: high
ms.date: 09/01/2022
---

# Use external OAuth providers

[!INCLUDE [sdk-include](~/includes/sdk-include.md)]

You can support external or third-party OAuth providers, such as Google, GitHub, LinkedIn, and Facebook using the updated `authenticate()` API:

```JavaScript
function authenticate(authenticateParameters: AuthenticatePopUpParameters): Promise<string>
```

Add the following values to the `authenticate()` API to support external OAuth providers:

* `isExternal` parameter
* Three placeholder values in the existing `url` parameter

The following table provides the list of `authenticate()` API parameters (`AuthenticatePopUpParameters`) and functions along with their descriptions:

| Parameter| Description|
| --- | --- |
|`isExternal` | The type of parameter is Boolean, which indicates that the auth window opens in an external browser.|
|`height` |The preferred height for the pop-up. The value can be ignored if outside the acceptable bounds.|
|`url`  <br>|The URL of third-party app server for the authentication pop-up, with the following three parameter placeholders:</br> <br> - `oauthRedirectMethod`: Pass placeholder in `{}`. The Teams platform replaces this placeholder with a deep link or webpage, which updates the app server if the call comes from a mobile platform.</br> <br> - `authId`: UUID (Universal unique identifier) replaces this placeholder. The app server uses it to maintain the session.</br> <br> - `hostRedirectUrl`: pass placeholder in `{}`. The current platform and client replace this placeholder with a redirect URL, which redirects the user to the correct client after completing authentication. </br>|
|`width`|The preferred width for the pop-up. The value can be ignored if outside the acceptable bounds.|

>[!NOTE]
> The `authID` parameter is valid for the duration of the auth session, which has a default timeout of 120 seconds.

For more information on parameters, see [authenticate (AuthenticatePopUpParameters)](/javascript/api/@microsoft/teams-js/authentication#@microsoft-teams-js-authentication-authenticate) function.

## Add authentication to external browsers

The following image provides the flow to add authentication to external browsers:

 :::image type="content" source="../../../assets/images/tabs/tabs-authenticate-OAuth.PNG" alt-text="authenticate-OAuth":::

**To add authentication to external browsers**

1. Initiate the external auth-login process. The third-party app calls the TeamsJS function `authentication.authenticate` with `isExternal` set as true to initiate the external auth-login process.

   The passed `url` contains placeholders for `{authId}`, `{oauthRedirectMethod}`, and `{hostRedirectUrl}`.  

    ```JavaScript
       authentication.authenticate({
          url: `${window.location.origin}/auth-start?oauthRedirectMethod={oauthRedirectMethod}&authId={authId}&hostRedirectUrl={hostRedirectUrl}&googleId=${googleId}`,
          isExternal: true
        }).then((result) => {
          this.getGoogleServerSideToken(result);
        }).catch((reason) => {
          console.log("failed" + reason);
          reject(reason);
        })
    ```

1. The Teams clients open the URL in an external browser after automatically replacing the placeholders for `oauthRedirectMethod`, `authId`, and `hostRedirectUrl` with suitable values.

   **Example**

   ```http
    https://3p.app.server/auth?oauthRedirectMethod=deeplink&authId=1234567890&hostRedirectUrl=msteams://teams.microsoft.com/l/auth-callback?authId=1234567890&result={result} 
   ```

1. The third-party app server responds. The third-party app server receives and saves the `url` with the following three query parameters:

   | Parameter | Description|
   | --- | --- |
   | `oauthRedirectMethod` |Indicates how the third-party app must send the response of authentication request back to the client, with one of the two values: deep link or page.|
   |`authId` |The request-id Teams creates for this specific authentication request that needs to be sent back to the client through a deep link.|
   |`hostRedirectUrl` | The deep link includes the URL schema of the initiating client to redirect after the authentication. |

    > [!TIP]
    > The app can marshal `authId`, `oauthRedirectMethod`, and `hostRedirectUrl` in the OAuth `state` query parameter while generating the login URL for the OAuthProvider. The `state` contains the passed `authId`, `oauthRedirectMethod`, and `hostRedirectUrl`, when OAuthProvider redirects to the server and the app uses the values for sending authentication response back to the initiating client as described in step 6.

1. The third-party app server redirects to specified `url`. The third-party app server redirects to OAuth providers auth page in the external browser. The `redirect_uri` is a dedicated route on the app server. You can register `redirect_uri` in the OAuth provider’s dev console as static, the parameters need to be sent through the state object.

   **Example**

    ```http
    https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=https://3p.app.server/authredirect&state={"authId":"…","oauthRedirectMethod":"…","hostRedirectUrl":"_"}&client_id=…    &response_type=code&access_type=offline&scope= … 
    ```

1. Sign in to external browser. The OAuth providers redirect back to the `redirect_uri` with the auth code and the state object.

1. The third-party app server handles the response and checks `oauthRedirectMethod`, which is returned from external OAuth provider in the state object to determine whether the response needs to be returned through the auth-callback deep link or through web page that calls `notifySuccess()`.

      ```JavaScript
      if (state.oauthRedirectMethod === 'deeplink') {
         const clientRedirectUrl: string = state.hostRedirectUrl.replace('{result}', req.query.code)
         return res.redirect(clientRedirectUrl)
      }
      else {
      // continue redirecting to a web-page that will call notifySuccess() – usually this method is used in Teams-Web
      …
      ```

   For example, in Teams mobile client, the modified `hostRedirectUrl` results the following:

   ```JavaScript
   return res.redirect(`msteams://teams.microsoft.com/l/auth-callback?authId=${state.authId}&result=${req.query.code}`)
   ```

   The provided value of `hostRedirectUrl` depends on the client that initiates the external authentication flow.

1. Teams calls the success callback and sends the result (auth code) to the third-party app. The app receives the code in the success callback and uses the code to retrieve the token, then the user information and update the user interface.

      ```JavaScript
      successCallback: function (result) { 
      … 
      } 
      ```

## See also

* [Configure identity providers](~/concepts/authentication/authentication.md)
* [Microsoft Teams authentication flow for tabs](auth-flow-tab.md)
