---
title: Single sign-on support for tabs
description: Describes single sign-on (SSO)
ms.topic: how-to
ms.localizationpriority: high
keywords: teams authentication SSO Microsoft Azure Active Directory (Azure AD) single sign-on api
---

# Single sign-on (SSO) support for tabs

Users sign in to Microsoft Teams through their work, school, or Microsoft account that is Office 365, Outlook, you can take the advantage by allowing a single sign on to authorize your Teams tab or task module on desktop or mobile clients. If a user sign in once, they don't have to sign in again on another device as they're signed in automatically. Also, your access token is prefetched to improve performance and load times.

> [!NOTE]
> **Teams mobile client versions supporting SSO**  
>
> ✔Teams for Android (1416/1.0.0.2020073101 and later)
>
> ✔Teams for iOS (_Version_: 2.0.18 and later)  
>
> ✔Teams JavaScript SDK (_Version_: 1.11 and later) for SSO to work in meeting side panel.
>
> For the best experience with Teams, use the latest version of iOS and Android.
> [!NOTE]
> **Quickstart**  
>
> The simplest path to get started with tab SSO is with the Teams toolkit for Microsoft Visual Studio Code. For more information, see [SSO with Teams toolkit and Visual Studio Code for tabs](../../../toolkit/visual-studio-code-tab-sso.md)

<!--- TBD: Edit this article.
* Admonitions/alerts seem to be overused.
* Don't add note for a list of items.
* Don't add numbers to headings.
* Don't copy-paste superscript characters as is. Use HTML entities. See https://sitefarm.ucdavis.edu/training/all/using-wysiwyg/special-characters for the values.
* Same for the check marks added in the content in the note above. The content should not be in a note anyway.
--->

## How SSO works at runtime

The following image shows how the SSO process works:

<!-- markdownlint-disable MD033 -->
<img src="~/assets/images/tabs/tabs-sso-diagram.png" alt="Tab single sign-on SSO diagram" width="75%"/>

1. In the tab, a JavaScript call is made to `getAuthToken()`. `getAuthToken()` tells Teams to obtain an access token for the tab application.
2. If the current user is using your tab application for the first time, there's a request prompt to consent if consent is required. Alternately, there's a request prompt to handle step-up authentication such as two-factor authentication.
3. Teams requests the tab access token from the Azure AD endpoint for the current user.
4. Azure AD sends the tab access token to the Teams application.
5. Teams sends the tab access token to the tab as part of the result object returned by the `getAuthToken()` call.
6. The token is parsed in the tab application using JavaScript, to extract required information, such as the user's email address.

> [!NOTE]
> The `getAuthToken()` is only valid for consenting to a limited set of user-level APIs that is email, profile, offline_access, and OpenId. It is not used for further Graph scopes such as `User.Read` or `Mail.Read`. For suggested workarounds, see [Get an access token with Graph permissions](#get-an-access-token-with-graph-permissions).

The SSO API also works in [task modules](../../../task-modules-and-cards/what-are-task-modules.md) that embed web content.

## Develop an SSO Microsoft Teams tab

This section describes the tasks involved in creating a Teams tab that uses SSO. These tasks are language- and framework-agnostic.

### 1. Create your Azure AD application

> [!NOTE]
> There are some important restrictions that you must know:
>
> * Only user-level Graph API permissions are supported that is, email, profile, offline_access, OpenId. If you must have access to other Graph scopes such as `User.Read` or `Mail.Read`, see [Get an access token with Graph permissions](#get-an-access-token-with-graph-permissions).
> * It is important that your application's domain name is the same as the domain name you have registered for your Azure AD application.
> * Currently multiple domains per app are not supported.
> * The user must set `accessTokenAcceptedVersion` to `2` for a new application.

To register your app through the Azure AD portal, follow these steps:

1. Register a new application in the [Azure AD App Registrations](https://go.microsoft.com/fwlink/?linkid=2083908) portal.
1. Select **New Registration**. The **Register an application** page appears.
1. In the **Register an application** page, enter the following values:
    1. Enter a **Name** for your app.
    2. Choose the **Supported account types**, select single tenant or multitenant account type. ¹
    * Leave **Redirect URI** empty.
    3. Choose **Register**.
1. On the overview page, copy and save the **Application (client) ID**. You must have it later when updating your Teams application manifest.
1. Under **Manage**, select **Expose an API**.

    > [!NOTE]
    >
    > * If you are building an app with a bot and a tab, enter the Application ID URI as `api://fully-qualified-domain-name.com/botid-{YourBotId}`.
    >
    > * Use lower case letters for domain name, don't use upper case. For example, to create an app service or web app, enter base resource name as `demoapplication`, then the URL will be `https://demoapplication.azurewebsites.net`. But if you use base resource name as `DemoApplication`, then the URL will be `https://DemoApplication.azurewebsites.net` and this supports in desktop, web, and iOS, but not in android.

1. Select the **Set** link to generate the Application ID URI in the form of `api://{AppID}`. Insert your fully qualified domain name with a forward slash "/" appended to the end, between the double forward slashes and the GUID. The entire ID must have the form of `api://fully-qualified-domain-name.com/{AppID}`. ² For example, `api://subdomain.example.com/00000000-0000-0000-0000-000000000000`. The fully qualified domain name is the human readable domain name from which your app is served. If you're using a tunneling service such as ngrok, you must update this value whenever your ngrok subdomain changes.
1. Select **Add a scope**. In the panel that opens, enter **access_as_user** as the **Scope name**.
1. In the **Who can consent?** box, enter **Admins and users**.
1. Enter the details in the boxes for configuring the admin and user consent prompts with values that are appropriate for the `access_as_user` scope:
    * **Admin consent title:** Teams can access the user’s profile.
    * **Admin consent description**: Teams can call the app’s web APIs as the current user.
    * **User consent title**: Teams can access your profile and make requests on your behalf.
    * **User consent description:** Teams can call this app’s APIs with the same rights as you have.
1. Ensure that **State** is set to **Enabled**.
1. Select **Add scope** to save the details. The domain part of the **Scope name** displayed below the text field must automatically match the **Application ID** URI set in the previous step, with `/access_as_user` appended to the end `api://subdomain.example.com/00000000-0000-0000-0000-000000000000/access_as_user`.
1. In the **Authorized client applications** section, identify the applications that you want to authorize for your app’s web application. Select **Add a client application**. Enter each of the following client IDs and select the authorized scope you created in the previous step:
    * `1fec8e78-bce4-4aaf-ab1b-5451cc387264` for Teams mobile or desktop application.
    * `5e3ce6c0-2b1f-4285-8d4b-75ee78787346` for Teams web application.
1. Navigate to **API Permissions**. Select **Add a permission** > **Microsoft Graph** > **Delegated permissions**, then add the following permissions from Graph API:
    * User.Read enabled by default
    * email
    * offline_access
    * OpenId
    * profile

1. Navigate to **Authentication**.

    > [!IMPORTANT]
    > If an app hasn't been granted IT admin consent, users have to provide consent the first time they use an app.

    To enter a redirect URI:
    * Select **Add a platform**.
    * Select **web**.
    * Enter the **redirect URI** for your app. This URI is the same fully qualified domain name that you entered in step 5. It's also followed by the API route where an authentication response is sent. If you're following any of the Teams samples, the URI is `https://subdomain.example.com/auth-end`. For more information, see [OAuth 2.0 authorization code flow](/azure/active-directory/develop/v2-oauth2-auth-code-flow).

    > [!NOTE]
    > Implicit grant is not required for tab SSO.

Congratulations! You've completed the app registration prerequisites to continue with your tab SSO app.

> [!NOTE]
>
> * ¹ If your Azure AD app is registered in the same tenant where you are making an authentication request in Teams, the user cannot be asked to consent and is granted an access token right away. Users only consent to these permissions if the Azure AD app is registered in a different tenant.
> * ² If the custom domain is not added to Azure AD, you get an error stating that the host name must not be based on an already owned domain. To add custom domain to Azure AD and register it, follow the [add a custom domain name to Azure AD](/azure/active-directory/fundamentals/add-custom-domain) procedure, and then repeat step 5. You can also get this error if you are not signed in with Admin credentials in the Office 365 tenancy.
> * If you are not receiving the user principal name (UPN) in the returned access token, you can add it as an [optional claim](/azure/active-directory/develop/active-directory-optional-claims) in Azure AD.

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
>
> * **id** - The client ID of the application. This is the application ID that you obtained as part of registering the application with Azure AD.
>* **resource** - The domain and subdomain of your application. This is the same URI (including the `api://` protocol) that you registered when creating your `scope` in step 6. You must not include the `access_as_user` path in your resource. The domain part of this URI must match the domain, including any subdomains, used in the URLs of your Teams application manifest.
> [!NOTE]
>
>* The resource for an Azure AD app is usually the root of its site URL and the appID (e.g. `api://subdomain.example.com/00000000-0000-0000-0000-000000000000`). This value is also used to ensure your request is coming from the same domain. Ensure that the `contentURL` for your tab uses the same domains as your resource property.
>* You must use manifest version 1.5 or higher to implement the `webApplicationInfo` field.

### 3. Get an access token from your client-side code

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

## Code snippets

The following code provides an example of on-behalf-of flow to fetch access token using MSAL library :

### [C#](#tab/dotnet)

```csharp

IConfidentialClientApplication app = ConfidentialClientApplicationBuilder.Create(<"Client id">)
                                                .WithClientSecret(<"Client secret">)
                                                .WithAuthority($"https://login.microsoftonline.com/<"Tenant id">")
                                                .Build();
 
            try
            {
                var idToken = <"Client side token">;
                UserAssertion assert = new UserAssertion(idToken);
                List<string> scopes = new List<string>();
                scopes.Add("https://graph.microsoft.com/User.Read");
                var responseToken = await app.AcquireTokenOnBehalfOf(scopes, assert).ExecuteAsync();
                return responseToken.AccessToken.ToString();
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
```

### [Node.js](#tab/nodejs)

```javascript

// Exchange cliend side token with server token
  app.post('/getProfileOnBehalfOf', function(req, res) {
        var tid = < "Tenand id" >
    var token = < "Client side token" >
    var scopes = ["https://graph.microsoft.com/User.Read"];

        // Creating MSAL client
        const msalClient = new msal.ConfidentialClientApplication({
            auth: {
                clientId: < "Client ID" >,
                clientSecret: < "Client Secret" >
      }
        });

        var oboPromise = new Promise((resolve, reject) => {
            msalClient.acquireTokenOnBehalfOf({
                authority: `https://login.microsoftonline.com/${tid}`,
                oboAssertion: token,
                scopes: scopes,
                skipCache: true
            }).then(result => {
                console.log("Token is: " + result.accessToken);
            }).catch(error => {
                reject({ "error": error.errorCode });
            });
        });
```

---

## Code sample

|**Sample name**|**Description**|**C#**|**Node.js**|
|---------------|---------------|------|--------------|
| Tab SSO |Microsoft Teams sample app for tabs Azure AD SSO| [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-sso/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/tab-sso/nodejs), </br>[Teams Toolkit](../../../toolkit/visual-studio-code-tab-sso.md)|

## Known limitations

### Get an access token with Graph permissions

The current SSO implementation grants consent for user-level permissions only. Users can't make Graph API calls using these permissions. To get the permissions (scopes) needed to make a Graph call, SSO solutions must implement a custom web service to exchange the token received from the Teams JavaScript SDK for a token that includes the needed scopes. This is accomplished using Azure AD [on-behalf-of flow](/azure/active-directory/develop/v1-oauth2-on-behalf-of-flow).

### Tenant Admin Consent

A simple way of consenting on behalf of an organization as a tenant admin is to refer to `https://login.microsoftonline.com/common/adminconsent?client_id=<AAD_App_ID>`.

#### Ask for consent using the Auth API

Another approach for getting Graph scopes is to present a consent dialog using our existing [web-based Azure AD authentication approach](~/tabs/how-to/authentication/auth-tab-aad.md#navigate-to-the-authorization-page-from-your-pop-up-page). This approach involves popping up an Azure AD consent dialog box.

To ask for additional consent using the Auth API, follow these steps:

1. The token retrieved using `getAuthToken()` must be exchanged server-side using Azure AD [on-behalf-of flow](/azure/active-directory/develop/v2-oauth2-on-behalf-of-flow) to get access to those other Graph APIs. Ensure you use the v2 Graph endpoint for this exchange.
2. If the exchange fails, Azure AD returns an invalid grant exception. There are usually one of two error messages, `invalid_grant` or `interaction_required`.
3. When the exchange fails, you must ask for consent. Show some user interface (UI) asking the user to grant other consent. This UI must include a button that triggers an Azure AD consent dialog box using our [Azure AD authentication API](~/concepts/authentication/auth-silent-aad.md).
4. When asking for more consent from Azure AD, you must include `prompt=consent` in your [query-string-parameter](~/tabs/how-to/authentication/auth-silent-aad.md#get-the-user-context) to Azure AD, otherwise Azure AD doesn't ask for the other scopes.
    * Instead of `?scope={scopes}`
    * Use this `?prompt=consent&scope={scopes}`
    * Ensure that `{scopes}` includes all the scopes you're prompting the user for, for example, Mail.Read or User.Read.
5. Once the user has granted more permission, retry the on-behalf-of-flow to get access to these other APIs.

### Non-Azure AD authentication

The above-described authentication solution only works for apps and services that support Azure AD as an identity provider. Apps that want to authenticate using non-Azure AD based services must continue using the pop-up-based [web authentication flow](~/concepts/authentication.md).

> [!NOTE]
> SSO is supported for customer owned apps within the Azure AD B2C tenants.

## Step-by-step guides

* Follow the [step-by-step guide](../../../sbs-tabs-and-messaging-extensions-with-sso.yml) to authenticate tabs and message extensions.
* Follow the [step-by-step guide](../../../sbs-tab-with-adaptive-cards.yml) to create tab with adaptive cards.

## See also

[Teams Bot with Single sign-on](../../../sbs-bots-with-sso.yml)
