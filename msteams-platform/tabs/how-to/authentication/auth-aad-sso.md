---
title: Single Sign-On
description: Describes single sign-on (SSO)
keywords: teams authentication SSO AAD
---

# Single Sign-On

> [!NOTE]
> The "single sign-on" API is currently supported in _Developer Preview_ only.

Users sign-in to Microsoft Teams using their work or school (Office 365) account and you can take advantage of this by using single sign-on (SSO) to authorize the user to your Microsoft Teams tab. That means if a user consents to use your app on desktop, they won’t have to consent again on mobile and will be automatically logged in. 

## How SSO works at runtime

The following diagram shows how the SSO process works:

<img src="~/assets/images/tabs/tabs-sso-diagram.png" alt="Tab single sign-on SSO diagram" width="75%"/>

1. In the tab, JavaScript calls getAuthToken(). This tells the Teams application to obtain an authentication token to the tab application.
2. If this is the first time the current user has used your tab application, they will be prompted to consent (if consent is required) or asked to handle step-up authentication (such as two-factor authentication).
3. The Microsoft Teams application requests the tab application token from the Azure AD v1.0 endpoint for the current user.
4. Azure AD sends the tab application token to the Teams application.
5. The Microsoft Teams application sends the tab application token to the tab as part of the result object returned by the getAuthToken() call.
6. JavaScript in the tab application can parse the token and extract the information it needs, such as the user's email address.
    * Note: this token is only valid for consenting to a limited set of user-level APIs (ex: email, profile, etc)  and not for further Graph scopes (such as Mail.Read). See our section at the end of this document for suggested workarounds if you require additional Graph scopes.

## Develop an SSO Microsoft Teams tab

This section describes the tasks involved in creating an Microsoft Teams tab that use SSO. These tasks are described here in a language- and framework-agnostic way.

### 1. Create your AAD application in Azure

Register you application at the registration portal for the Azure AD v1.0 endpoint. This is a 5–10 minute process that includes the following tasks:

* Getting your AAD application ID
* Specify the permissions that your application needs for the AAD endpoint (and optionally to Microsoft Graph). 
* Grant the Microsoft Teams desktop, web and mobile application to trust to your application
* Preauthorize the Microsoft Teams application to your app with the default scope name of `access_as_user`.

> [!NOTE]
> There are some important restrictions you should be aware of:
>
> * We only support user-level Graph API permissions (ie: email, profile, offline_access, openid. If you need access to other Graph scopes, read our recommended workaround at the end of this documentation.
> * It's important that your application's domain name be registered with your Azure AD application. This must be the same domain name that your application runs on when requesting an authentication token in Teams and also when specifying the resource property in your Teams manifest (more details in the next section).
> * We do not currently support multiple domains per app
> * We also do not support applications that use the `azurewebsites.net` domain since this domain is too common and may be a security risk

#### Steps

1. Register a new application in the [Azure Active Directory – App Registration](https://go.microsoft.com/fwlink/?linkid=2083908) portal
2. Select “New Registration”. On the register an application page, set the values as follows:
    * Set **name** to your app name
    * Set **supported account types** to **Accounts in any organizational directory and personal Microsoft accounts**
    * Leave **Redirect URI** empty
    * Choose **Register**
3. On the overview page, copy and save the **Application (client) ID**. You’ll need it later when updating your Teams application manifest.
4. Select **Expose an API** under **Manage**. Select the **Set** link to generate the Application ID URI in the form of `api://{AppID}`. Insert your fully qualified domain name (with a forward slash "/" appended to the end) between the double forward slashes and the GUID. The entire ID should have the form of: `api://fully-qualified-domain-name.com/{AppID}`
    * ex: `api://subdomain.example.com:6789/c6c1f32b-5e55-4997-881a-753cc1d563b7`.

> [!NOTE]
> If you get an error saying that the domain is already owned but you own it, follow the procedure at [Quickstart: Add a custom domain name to Azure Active Directory](/azure/active-directory/fundamentals/add-custom-domain) to register it, and then repeat this step. (This error can also occur if you are not signed in with credentials of an admin in the Office 365 tenancy).

5. Select the **Add a scope** button. In the panel that opens, enter `access_as_user` as the **Scope name**.
6. Set Who can consent? to Admins and users
7. Fill in the fields for configuring the admin and user consent prompts with values that are appropriate for the `access_as_user` scope. Suggestions:
    * **Admin consent title:** Teams can access the user’s profile
    * **Admin consent description**: Allows Teams to call the app’s web APIs as the current user.
    * **User consent title**: Teams can access your user profile and make requests on your behalf
    * **User consent description:** Enable Teams to call this app’s APIs with the same rights that you have
8. Ensure that **State** is set to **Enabled**
9. Select **Add scope**
    * Note: The domain part of the **Scope name** displayed just below the text field should automatically match the **Application ID** URI set in the previous step, with `/access_as_user` appended to the end; for example: 
        * `api://subdomain.example.com:6789/c6c1f32b-5e55-4997-881a-753cc1d563b7/access_as_user`
10. In the **Authorized client applications** section, you identify the applications that you want to authorize to your app’s web application. Each of the following IDs needs to be entered:
    * `1fec8e78-bce4-4aaf-ab1b-5451cc387264` (Teams mobile/desktop application)
    * `5e3ce6c0-2b1f-4285-8d4b-75ee78787346` (Teams web application)
11. Navigate to **API Permissions**, and make sure to add the follow permissions:
    * User.Read (enabled by default)
    * email
    * offline_access
    * openid
    * profile

### 2. Update your Microsoft Teams application manifest

Add new properties to your Microsoft Teams manifest:

* **WebApplicationInfo** - The parent of the following elements.
* **Id** - The client ID of the application. This is an application ID that you obtain as part of registering the application with Azure AD 1.0 endpoint.
* **Resource** - The domain and subdomain of your application. This is the same URI (including the `api://` protocol) that you used when registering the app in AAD. The domain part of this URI should match the domain, including any subdomains, used in the URLs in the section of your Teams application manifest.

```json
"webApplicationInfo": {
  "id": "<application_GUID here>",
  "resource": "<web_API resource here>"
}
```

Notes:

* The resource for an AAD app will usually just be the root of its site URL and the appID (e.g. `api://subdomain.example.com/6789/c6c1f32b-5e55-4997-881a-753cc1d563b7`). We also use this value to ensure your request is coming from the same domain. Therefor make sure that your `contentURL` for your tab uses the same domains as your resource property.
* You need to be using manifest version 1.5 or higher for these fields to be used.
* Scopes aren’t supported in the manifest and instead should be specified in the API Permissions section in the Azure portal

### 3. Get an authentication token from your client-side code

Here's what the authentication API looks like:

```javascript
var authTokenRequest = {
  successCallback: function(result) { console.log("Success: " + result); },
  failureCallback: function(error) { console.log("Failure: " + error); },
};
microsoftTeams.authentication.getAuthToken(authTokenRequest);
```

When you call `getAuthToken` - and additional user consent is required (for user-level permissions) - we will show a dialog to the user encouraging them to grant additional consent. 

<img src="~/assets/images/tabs/tabs-sso-prompt.png" alt="Tab single sign-on SSO dialog prompt" width="75%"/>

## Demo code

For now you can visit our test application [Task Meow](https://github.com/ydogandjiev/taskmeow) and use the SSO manifest and checkout the `teams.auth.service.js` and `sso.auth.service.js` file to see how we handle the authentication workflow.

## Known Limitations

### Apps that require additional Graph Scopes

Our current implementation for SSO only grants consent for user-level permissions (email, profile, offline_access, openid) but not for other APIs (such as Mail.Read). If your app needs further Graph scopes, there are some workarounds to enable this.

#### Tenant Admin Consent

The simplest approach would be to get a tenant admin to pre-consent on behalf of the organization. This means users won’t have to consent to these scopes and you can then be free to exchange the token server side using AAD’s [on-behalf-of flow](/azure/active-directory/develop/v1-oauth2-on-behalf-of-flow). This workaround is acceptable for internal line-of-business applications but may not be enough for ISVs who may not be able to rely on tenant admin approval.

A simple way of consenting on behalf of an organization (as a tenant admin) is to visit:

* `https://login.microsoftonline.com/common/adminconsent?client_id=<AAD_App_ID>`

#### Asking for additional consent using the Auth API

Another approach for getting additional Graph scopes would be to present a consent dialog using our existing [web-based AAD authentication approach](~/tabs/how-to/authentication/auth-tab-aad.md#navigate-to-the-authorization-page-from-your-popup-page) which involves popping up an AAD consent dialog. There are some notable additions:

1. The token retrieved using getAuthToken would need to be exchanged server side using AADs [on-behalf-of flow](/azure/active-directory/develop/v1-oauth2-on-behalf-of-flow) to get access to those additional Graph APIs.
    * Be sure to use the v2 Graph endpoint for this exchange
2. If the exchange fails, AAD will return an invalid grant exception. There are usually one of two error messages: `ConsentRequired` or `InteractionRequired`
3. When the exchange fails, then you need to ask for additional consent. We recommend showing some UI asking the user to grant additional consent. This UI should include a button that triggers an AAD consent dialog using our [AAD authentication API](~/concepts/authentication/auth-silent-aad.md).
4. When asking for additional consent from AAD, you need to include `prompt=consent` in your [query-string-parameter](~/tabs/how-to/authentication/auth-silent-aad.md#get-the-user-context) to AAD otherwise AAD will not ask for the additional scopes.
    * Instead of: `?scope={scopes}`
    * Use this: `?prompt=consent&scope={scopes}`
    * Be sure that `{scopes}` includes all the scopes you are prompting the user for (ex: Mail.Read or User.Read).
5. Once the user has granted additional permission, retry the on-behalf-of-flow to get access to these additional APIs.

### Non-AAD Authentication

The above-described authentication solution only works for apps and services that support Azure AD as an identity provider. Apps that want to authenticate using non-AAD based services need to continue using the popup-based [web authentication flow](~/concepts/authentication.md).
