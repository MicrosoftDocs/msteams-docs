---
title: Single Sign-On
description: Describes single sign-on (SSO)
keywords: teams authentication SSO AAD single sign-on api
---

# Single Sign-On (SSO)

Users sign in to Microsoft Teams via their work, school, or Microsoft accounts (Office 365, Outlook, etc). You can take advantage of this by allowing a single sign-on to authorize your Microsoft Teams tab (or task module) on desktop or mobile clients. Thus, if a user consents to use your app, they won’t have to consent again on another device — they will signed in be automatically. In addition, we prefetch your access token to improve performance and load times.

>[!NOTE]
> **Teams mobile client versions supporting SSO**  
>
> ✔Teams for Android (1416/1.0.0.2020073101 and later)
>
> ✔Teams for iOS (_Version_: 2.0.18 and later)  
>
> For the best experience with Teams, please use the latest version of iOS and Android.

## How SSO works at runtime

The following diagram shows how the SSO process works:

<!-- markdownlint-disable MD033 -->
<img src="~/assets/images/tabs/tabs-sso-diagram.png" alt="Tab single sign-on SSO diagram" width="75%"/>

1. In the tab, a JavaScript call is made to `getAuthToken()`. This tells Teams to obtain an authentication token for the tab application.
2. If this is the first time the current user has used your tab application, there will be a request prompt to consent (if consent is required) or to handle step-up authentication (such as two-factor authentication).
3. Teams requests the tab application token from the Azure AD endpoint for the current user.
4. Azure AD sends the tab application token to the Teams application.
5. Teams sends the tab application token to the tab as part of the result object returned by the `getAuthToken()` call.
6. The token will be parsed in the tab application, via JavaScript, to extract the needed information, such as the user's email address.

> [!NOTE]
> The `getAuthToken()` is only valid for consenting to a limited set of user-level APIs — email, profile, offline_access and OpenId — and not for further Microsoft Graph scopes such as `User.Read` or `Mail.Read`. See our section at the end of this document for suggested workarounds if you require [additional Graph scopes](#apps-that-require-additional-microsoft-graph-scopes).

The SSO API will also work in [Task Modules](../../../task-modules-and-cards/what-are-task-modules.md) that embed web content.

## Develop an SSO Microsoft Teams tab

This section describes the tasks involved in creating a Teams tab that uses SSO. These tasks are described here are language- and framework-agnostic.

### 1. Create your Azure Active Directory (Azure AD) application

#### Registering your application in the[Azure AD portal](https://azure.microsoft.com/features/azure-portal/) overview:

1. Get your [Azure AD Application ID](/azure/active-directory/develop/howto-create-service-principal-portal#get-values-for-signing-in).
2. Specify the permissions that your application needs for the Azure AD endpoint and, optionally, Microsoft Graph.
3. [Grant permissions](/azure/active-directory/develop/howto-create-service-principal-portal#configure-access-policies-on-resources) for Teams desktop, web, and mobile applications.
4. Pre-authorize Teams by selecting the **Add a scope** button and in the panel that opens, enter `access_as_user` as the **Scope name**.

> [!NOTE]
> There are some important restrictions you should be aware of:
>
> * We only support user-level Microsoft Graph API permissions, i.e., email, profile, offline_access, OpenId. If you need access to other Microsoft Graph scopes (such as `User.Read` or `Mail.Read`), see our [recommended workaround](#apps-that-require-additional-microsoft-graph-scopes) at the end of this documentation.
> * It's important that your application's domain name is the same as the domain name you've registering for your Azure AD application.
> * We don't currently support multiple domains per app.
> * We don't support applications that use the `azurewebsites.net` domain because it is too common and may be a security risk. However, we're actively seeking to remove this restriction.

#### Registering your app through the Azure Active Directory portal in-depth:

1. Register a new application in the [Azure Active Directory – App Registrations](https://go.microsoft.com/fwlink/?linkid=2083908) portal.
2. Select **New Registration** and on the *register an application page*, set following values:
    * Set **name** to your app name.
    * Choose the **supported account types** (any account type will work) ¹
    * Leave **Redirect URI** empty.
    * Choose **Register**.
3. On the overview page, copy and save the **Application (client) ID**. You’ll need it later when updating your Teams application manifest.
4. Under **Manage**, select **Expose an API**. 
5. Select the **Set** link to generate the Application ID URI in the form of `api://{AppID}`. Insert your fully qualified domain name (with a forward slash "/" appended to the end) between the double forward slashes and the GUID. The entire ID should have the form of: `api://fully-qualified-domain-name.com/{AppID}` ²
    * ex: `api://subdomain.example.com/00000000-0000-0000-0000-000000000000`.
    
    The fully qualified domain name is the human readable domain name from which your app is served. If you are using a tunneling service such as ngrok, you will need to update     this value whenever your ngrok subdomain changes. 
6. Select the **Add a scope** button. In the panel that opens, enter `access_as_user` as the **Scope name**.
7. Set **Who can consent?** to `Admins and users`
8. Fill in the fields for configuring the admin and user consent prompts with values that are appropriate for the `access_as_user` scope:
    * **Admin consent title:** Teams can access the user’s profile.
    * **Admin consent description**: Allows Teams to call the app’s web APIs as the current user.
    * **User consent title**: Teams can access the user profile and make requests on the user's behalf.
    * **User consent description:** Enable Teams to call this app’s APIs with the same rights as the user.
9. Ensure that **State** is set to **Enabled**
10. Select the **Add scope** button to save 
    * The domain part of the **Scope name** displayed just below the text field should automatically match the **Application ID** URI set in the previous step, with `/access_as_user` appended to the end:
        * `api://subdomain.example.com/00000000-0000-0000-0000-000000000000/access_as_user`
11. In the **Authorized client applications** section, identify the applications that you want to authorize for your app’s web application. Select *Add a client application*. Enter each of the following client IDs and select the authorized scope you created in the previous step:
    * `1fec8e78-bce4-4aaf-ab1b-5451cc387264` (Teams mobile/desktop application)
    * `5e3ce6c0-2b1f-4285-8d4b-75ee78787346` (Teams web application)
12. Navigate to **API Permissions**. Select *Add a permission* > *Microsoft Graph* > *Delegated permissions*, then add the following permissions:
    * User.Read (enabled by default)
    * email
    * offline_access
    * OpenId
    * profile

13. Navigate to **Authentication**

    If an app hasn't been granted IT admin consent, users will have to provide consent the first time they use an app.

    Set a redirect URI:
    * Select **Add a platform**.
    * Select **web**.
    * Enter the **redirect URI** for your app. This will be the page where a successful implicit grant flow will redirect the user. This will be same fully qualified domain name that you entered in step 5 followed by the API route where a authentication response should be sent. If you are following any of the Teams samples, this will be: `https://subdomain.example.com/auth-end`

    Next, enable implicit grant by checking the following boxes:  
    ✔ ID Token  
    ✔ Access Token  
    
Congratulations! You have completed the app registration prerequsities to proceed with your tab SSO app.     

> [!NOTE]
>
> * ¹ If your Azure AD app is registered in the _same_ tenant where you're making an authentication request in Teams, the user won't be asked to consent and will be granted an access token right away. Users only need to consent to these permissions if the Azure AD app is registered in a different tenant.
> * ² If you get an error stating that the domain is already owned and you are the owner, follow the procedure at [Quickstart: Add a custom domain name to Azure Active Directory](/azure/active-directory/fundamentals/add-custom-domain) to register the domain, and then repeat step 5, above. (This error can also occur if you aren't signed in with Admin credentials in the Office 365 tenancy).
> * If you are not receiving the UPN (User Principal Name) in the returned access token, you can add it as an [optional claim](https://docs.microsoft.com/azure/active-directory/develop/active-directory-optional-claims) in Azure AD.

### 2. Update your Microsoft Teams application manifest

Add new properties to your Microsoft Teams manifest:

* **WebApplicationInfo** - The parent of the following elements:

> [!div class="checklist"]
> * **id** - The client ID of the application. This is the application ID that you obtained as part of registering the application with Azure AD.
>* **resource** - The domain and subdomain of your application. This is the same URI (including the `api://` protocol) that you registered when creating your `scope` in step 6 above. You shouldn't include the `access_as_user` path in your resource. The domain part of this URI should match the domain, including any subdomains, used in the URLs of your Teams application manifest.

```json
"webApplicationInfo": {
  "id": "00000000-0000-0000-0000-000000000000",
  "resource": "api://subdomain.example.com/00000000-0000-0000-0000-000000000000"
}
```

> [!NOTE]
>
>* The resource for an AAD app will usually be the root of its site URL and the appID (e.g. `api://subdomain.example.com/00000000-0000-0000-0000-000000000000`). We also use this value to ensure your request is coming from the same domain. Therefore, make sure that the `contentURL` for your tab uses the same domains as your resource property.
>* You need to use manifest version 1.5 or higher to implement the `webApplicationInfo` field.

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

Once you've received the access token in the success callback you can decode the access token to view the claims associated with that token. (Optionally, you can manually copy/paste the access token into a tool such as [JWT.io](https://jwt.io/) to inspect its contents). If you are not receiving the UPN (User Principal Name) in the returned access token, you can add it as an [optional claim](https://docs.microsoft.com/azure/active-directory/develop/active-directory-optional-claims) in Azure AD.

<p>
    <img src="~/assets/images/tabs/tabs-sso-prompt.png" alt="Tab single sign-on SSO dialog prompt" width="75%"/>
</p>

## Sample code

Visit our sample application: [MSTeams Tabs SSO Sample - Nodejs](https://github.com/OfficeDev/msteams-tabs-sso-sample-nodejs)

The README explains how to set up your development environment and how to configure your application in Azure AD. You can also find further information on how the sample is structured in the [app structure section](https://github.com/OfficeDev/msteams-tabs-sso-sample-nodejs#app-structure) to help familiarize yourself with the codebase.

## Known Limitations

### Apps that require additional Microsoft Graph Scopes

Our current implementation for SSO only grants consent for user-level permissions — email, profile, offline_access, OpenId — not for other APIs (such as User.Read or Mail.Read). If your app needs further Microsoft Graph scopes, here are some enabling workarounds:

#### Tenant Admin Consent

The simplest approach is to get a tenant admin to pre-consent on behalf of the organization. This means users won’t have to consent to these scopes and you can then be free to exchange the token server side using Azure AD’s [on-behalf-of flow](/azure/active-directory/develop/v1-oauth2-on-behalf-of-flow). This workaround is acceptable for internal line-of-business applications but may not be enough for third-party developers who may not be able to rely on tenant admin approval.

A simple way of consenting on behalf of an organization (as a tenant admin) is to visit:

* `https://login.microsoftonline.com/common/adminconsent?client_id=<AAD_App_ID>`

#### Asking for additional consent using the Auth API

Another approach for getting additional Microsoft Graph scopes is to present a consent dialog using our existing [web-based Azure AD authentication approach](~/tabs/how-to/authentication/auth-tab-aad.md#navigate-to-the-authorization-page-from-your-popup-page) which involves popping up an Azure AD consent dialog. There are some notable additions:

1. The token retrieved using `getAuthToken()` needs to be exchanged server-side using Azure AD [on-behalf-of flow](/azure/active-directory/develop/v2-oauth2-on-behalf-of-flow) to get access to those additional Microsoft Graph APIs.
    * Be sure to use the v2 Microsoft Graph endpoint for this exchange
2. If the exchange fails, Azure AD will return an invalid grant exception. There are usually one of two error messages: `invalid_grant` or `interaction_required`
3. When the exchange fails, then you need to ask for additional consent. We recommend showing some UI asking the user to grant additional consent. This UI should include a button that triggers an Azure AD consent dialog using our [Azure AD authentication API](~/concepts/authentication/auth-silent-aad.md).
4. When asking for additional consent from Azure AD, you need to include `prompt=consent` in your [query-string-parameter](~/tabs/how-to/authentication/auth-silent-aad.md#get-the-user-context) to Azure AD otherwise Azure AD will not ask for the additional scopes.
    * Instead of: `?scope={scopes}`
    * Use this: `?prompt=consent&scope={scopes}`
    * Be sure that `{scopes}` includes all the scopes you are prompting the user for (ex: Mail.Read or User.Read).
5. Once the user has granted additional permission, retry the on-behalf-of-flow to get access to these additional APIs.

### Non-Azure AD Authentication

The above-described authentication solution only works for apps and services that support Azure AD as an identity provider. Apps that want to authenticate using non-Azure AD based services need to continue using the pop-up-based [web authentication flow](~/concepts/authentication.md).
