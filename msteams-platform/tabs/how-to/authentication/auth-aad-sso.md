---
title: Single sign-on support for tabs
description: Describes single sign-on (SSO)
ms.topic: how-to
keywords: teams authentication SSO AAD single sign-on api
---

# Single sign-on (SSO) support for tabs

Users sign in to Microsoft Teams through their work, school, or Microsoft accounts that is Office 365, Outlook, and so on. You can take advantage of this by allowing a single sign-on to authorize your Teams tab or task module on desktop or mobile clients. If a user consents to use your app, they do not have to consent again on another device as they are signed in automatically. In addition, your access token is prefetched to improve performance and load times.

> [!NOTE]
> **Teams mobile client versions supporting SSO**  
>
> ✔Teams for Android (1416/1.0.0.2020073101 and later)
>
> ✔Teams for iOS (_Version_: 2.0.18 and later)  
>
> For the best experience with Teams, use the latest version of iOS and Android.

> [!NOTE]
> **Quickstart**  
>
> The simplest path to getting started with tab SSO is with the Teams toolkit for Visual Studio Code. For more information, see [SSO with Teams toolkit and Visual Studio Code for tabs](../../../toolkit/visual-studio-code-tab-sso.md)

## How SSO works at runtime

The following image shows how the SSO process works:

<!-- markdownlint-disable MD033 -->
<img src="~/assets/images/tabs/tabs-sso-diagram.png" alt="Tab single sign-on SSO diagram" width="75%"/>

1. In the tab, a JavaScript call is made to `getAuthToken()`. This tells Teams to obtain an authentication token for the tab application.
2. If this is the first time the current user has used your tab application, there is a request prompt to consent if consent is required or to handle step-up authentication such as two-factor authentication.
3. Teams requests the tab application token from the Azure Active Directory (AAD) endpoint for the current user.
4. AAD sends the tab application token to the Teams application.
5. Teams sends the tab application token to the tab as part of the result object returned by the `getAuthToken()` call.
6. The token is parsed in the tab application using JavaScript, to extract required information, such as the user's email address.

> [!NOTE]
> The `getAuthToken()` is only valid for consenting to a limited set of user-level APIs that is email, profile, offline_access and OpenId. It is not used for further Graph scopes such as `User.Read` or `Mail.Read`. For suggested workarounds, see [additional Graph scopes](#apps-that-require-additional-graph-scopes).

The SSO API also works in [task modules](../../../task-modules-and-cards/what-are-task-modules.md) that embed web content.

## Develop an SSO Microsoft Teams tab

This section describes the tasks involved in creating a Teams tab that uses SSO. These tasks are language- and framework-agnostic.

### 1. Create your AAD application

**To register your application in the [AAD portal](https://azure.microsoft.com/features/azure-portal/) overview**

1. Get your [AAD Application ID](/azure/active-directory/develop/howto-create-service-principal-portal#get-values-for-signing-in).
2. Specify the permissions that your application needs for the AAD endpoint and, optionally, Graph.
3. [Grant permissions](/azure/active-directory/develop/howto-create-service-principal-portal#configure-access-policies-on-resources) for Teams desktop, web, and mobile applications.
4. Pre-authorize Teams by selecting the **Add a scope** button and in the panel that opens, enter **access_as_user** as the **Scope name**.

> [!NOTE]
> There are some important restrictions that you must know:
>
> * Only user-level Graph API permissions are supported that is, email, profile, offline_access, OpenId. If you must have access to other Graph scopes such as `User.Read` or `Mail.Read`, see [recommended workaround](#apps-that-require-additional-graph-scopes).
> * It is important that your application's domain name is the same as the domain name you have registered for your AAD application.
> * Currently multiple domains per app are not supported.
> * Applications that use the `azurewebsites.net` domain are not supported as it is too common and can be a security risk.

**To register your app through the AAD portal**

1. Register a new application in the [AAD App Registrations](https://go.microsoft.com/fwlink/?linkid=2083908) portal.
2. Select **New Registration**. The **Register an application** page appears.
3. In the **Register an application** page, enter the following values:
    1. Enter a **Name** for your app.
    2. Choose the **Supported account types**, select single tenant or multitenant account type. ¹
    * Leave **Redirect URI** empty.
    3. Choose **Register**.
4. On the overview page, copy and save the **Application (client) ID**. You must have it later when updating your Teams application manifest.
5. Under **Manage**, select **Expose an API**.
6. Select the **Set** link to generate the Application ID URI in the form of `api://{AppID}`. Insert your fully qualified domain name with a forward slash "/" appended to the end, between the double forward slashes and the GUID. The entire ID must have the form of `api://fully-qualified-domain-name.com/{AppID}`. ² For example, `api://subdomain.example.com/00000000-0000-0000-0000-000000000000`. The fully qualified domain name is the human readable domain name from which your app is served. If you are using a tunneling service such as ngrok, you must update this value whenever your ngrok subdomain changes.
7. Select **Add a scope**. In the panel that opens, enter **access_as_user** as the **Scope name**.
8. In the **Who can consent?** box, enter **Admins and users**.
9. Enter the details in the boxes for configuring the admin and user consent prompts with values that are appropriate for the `access_as_user` scope:
    * **Admin consent title:** Teams can access the user’s profile.
    * **Admin consent description**: Teams can call the app’s web APIs as the current user.
    * **User consent title**: Teams can access your profile and make requests on your behalf.
    * **User consent description:** Teams can call this app’s APIs with the same rights as you have.
10. Ensure that **State** is set to **Enabled**.
11. Select **Add scope** to save the details. The domain part of the **Scope name** displayed below the text field must automatically match the **Application ID** URI set in the previous step, with `/access_as_user` appended to the end `api://subdomain.example.com/00000000-0000-0000-0000-000000000000/access_as_user`.
12. In the **Authorized client applications** section, identify the applications that you want to authorize for your app’s web application. Select **Add a client application**. Enter each of the following client IDs and select the authorized scope you created in the previous step:
    * `1fec8e78-bce4-4aaf-ab1b-5451cc387264` for Teams mobile or desktop application.
    * `5e3ce6c0-2b1f-4285-8d4b-75ee78787346` for Teams web application.
13. Navigate to **API Permissions**. Select **Add a permission** > **Microsoft Graph** > **Delegated permissions**, then add the following permissions from Graph API:
    * User.Read enabled by default
    * email
    * offline_access
    * OpenId
    * profile

14. Navigate to **Authentication**.

    If an app has not been granted IT admin consent, users have to provide consent the first time they use an app.

    To enter a redirect URI:
    * Select **Add a platform**.
    * Select **web**.
    * Enter the **redirect URI** for your app. This is the page where a successful implicit grant flow redirects the user. This is the same fully qualified domain name that you entered in step 5 followed by the API route where an authentication response is sent. If you are following any of the Teams samples, this is `https://subdomain.example.com/auth-end`.

    Enable implicit grant by checking the following boxes:
    ✔ ID Token
    ✔ Access Token

Congratulations! You have completed the app registration prerequisites to proceed with your tab SSO app.

> [!NOTE]
>
> * ¹ If your AAD app is registered in the same tenant where you are making an authentication request in Teams, the user cannot be asked to consent and is granted an access token right away. Users only consent to these permissions if the AAD app is registered in a different tenant.
> * ² If the custom domain is not added to AAD, you get an error stating that the host name must not be based on an already owned domain. To add custom domain to AAD and register it, follow the [add a custom domain name to AAD](/azure/active-directory/fundamentals/add-custom-domain) procedure, and then repeat step 5. You can also get this error if you are not signed in with Admin credentials in the Office 365 tenancy.
> * If you are not receiving the user principal name (UPN)) in the returned access token, you can add it as an [optional claim](https://docs.microsoft.com/azure/active-directory/develop/active-directory-optional-claims) in AAD.

### 2. Update your Teams application manifest

Use the following code to add new properties to your Teams manifest:

```json
"webApplicationInfo": {
  "id": "00000000-0000-0000-0000-000000000000",
  "resource": "api://subdomain.example.com/00000000-0000-0000-0000-000000000000"
}
```

* **WebApplicationInfo** is the parent of the following elements:

> [!div class="checklist"]
> * **id** - The client ID of the application. This is the application ID that you obtained as part of registering the application with Azure AD.
>* **resource** - The domain and subdomain of your application. This is the same URI (including the `api://` protocol) that you registered when creating your `scope` in step 6. You must not include the `access_as_user` path in your resource. The domain part of this URI must match the domain, including any subdomains, used in the URLs of your Teams application manifest.

> [!NOTE]
>
>* The resource for an AAD app is usually the root of its site URL and the appID (e.g. `api://subdomain.example.com/00000000-0000-0000-0000-000000000000`). This value is also used to ensure your request is coming from the same domain. Ensure that the `contentURL` for your tab uses the same domains as your resource property.
>* You must use manifest version 1.5 or higher to implement the `webApplicationInfo` field.

### 3. Get an authentication token from your client-side code

Use the following authentication API:

```javascript
var authTokenRequest = {
  successCallback: function(result) { console.log("Success: " + result); },
  failureCallback: function(error) { console.log("Failure: " + error); }
};
microsoftTeams.authentication.getAuthToken(authTokenRequest);
```

When you call `getAuthToken` - and additional user consent is required for user-level permissions, a dialog is shown to the user to grant additional consent.

After you receive the access token in the success callback, you can decode the access token to view the claims associated with that token. Optionally, you can manually copy and paste the access token into a tool, such as [jwt.ms](https://jwt.ms/) to inspect its contents. If you are not receiving the UPN in the returned access token, you can add it as an [optional claim](https://docs.microsoft.com/azure/active-directory/develop/active-directory-optional-claims) in AAD.

<p>
    <img src="~/assets/images/tabs/tabs-sso-prompt.png" alt="Tab single sign-on SSO dialog prompt" width="75%"/>
</p>

## Code sample

|**Sample name**|**Description**|**C#**|**Node.js**|
|---------------|---------------|------|--------------|
| Tab SSO |Microsoft Teams sample app for tabs Azure AD SSO| [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-sso/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/tab-sso/nodejs), </br>[Teams Toolkit](../../../toolkit/visual-studio-code-tab-sso.md)|

## Known limitations

### Apps that require additional Graph scopes

Our current implementation for SSO only grants consent for user-level permissions that is email, profile, offline_access, OpenId and not for other APIs such as User.Read or Mail.Read. If your app needs further Graph scopes, the next section provides some enabling workarounds.

#### Tenant Admin Consent

The simplest approach is to get a tenant admin to pre-consent on behalf of the organization. This means users do not have to consent to these scopes and you can then be free to exchange the token server side using AAD’s [on-behalf-of flow](/azure/active-directory/develop/v1-oauth2-on-behalf-of-flow). This workaround is acceptable for internal line-of-business applications but is not enough for third-party developers who are not able to rely on tenant admin approval.

A simple way of consenting on behalf of an organization as a tenant admin is to refer to `https://login.microsoftonline.com/common/adminconsent?client_id=<AAD_App_ID>`.

#### Ask for additional consent using the Auth API

Another approach for getting additional Graph scopes is to present a consent dialog using our existing [web-based Azure AD authentication approach](~/tabs/how-to/authentication/auth-tab-aad.md#navigate-to-the-authorization-page-from-your-popup-page) which involves popping up an Azure AD consent dialog box. 

**To ask for additional consent using the Auth API**

1. The token retrieved using `getAuthToken()` needs to be exchanged server-side using AAD [on-behalf-of flow](/azure/active-directory/develop/v2-oauth2-on-behalf-of-flow) to get access to those additional Graph APIs. Ensure you use the v2 Graph endpoint for this exchange.
2. If the exchange fails, AAD returns an invalid grant exception. There are usually one of two error messages, `invalid_grant` or `interaction_required`.
3. When the exchange fails, you must ask for additional consent. Show some user interface (UI) asking the user to grant additional consent. This UI must include a button that triggers an AAD consent dialog box using our [AAD authentication API](~/concepts/authentication/auth-silent-aad.md).
4. When asking for additional consent from AAD, you must include `prompt=consent` in your [query-string-parameter](~/tabs/how-to/authentication/auth-silent-aad.md#get-the-user-context) to AAD, otherwise AAD does not ask for the additional scopes.
    * Instead of `?scope={scopes}`
    * Use this `?prompt=consent&scope={scopes}`
    * Ensure that `{scopes}` includes all the scopes you are prompting the user for, for example, Mail.Read or User.Read.
5. Once the user has granted additional permission, retry the on-behalf-of-flow to get access to these additional APIs.

### Non-AAD authentication

The above-described authentication solution only works for apps and services that support AAD as an identity provider. Apps that want to authenticate using non-AAD based services must continue using the pop-up-based [web authentication flow](~/concepts/authentication.md).

> [!NOTE]
> SSO is supported for customer owned apps within the AAD B2C tenants.
