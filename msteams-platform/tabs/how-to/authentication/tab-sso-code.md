---
title: Code configuration for enabling Teams SSO for tabs
description: Describes code configuration for enabling Teams SSO for tabs
ms.topic: how-to
ms.localizationpriority: medium
keywords: teams authentication tabs Microsoft Azure Active Directory (Azure AD) Graph API
---
# Configure code to enable Teams SSO

After you register your app in Azure AD, update the app properties in your app's manifest file.
and the sample app with details configured on Azure AD.

Before you update the app manifest, you'll need to:

- Build and debug a tab app
- Create an ngrok tunnel

## SDK Prerequisites

Teams mobile client versions supporting SSO:

- Teams for Android (1416/1.0.0.2020073101 and later)

- Teams for iOS (_Version_: 2.0.18 and later)  

- Teams JavaScript SDK (_Version_: 1.11 and later) for SSO to work in meeting side panel.

- For the best experience with Teams, use the latest version of iOS and Android.

## Configure code for Azure AD registration details

After you register your tab app on Azure AD, the next step is to configure the app code with the registration details. You'll make these updates in:

- [manifest.json](#configure-code-in-app-manifest)
- [appsettings.json](#configure-code-in-app-settings)

### Configure code in app manifest

You'll need to add the `webApplicationInfo` property to the Teams app manifest file.

> [!NOTE]
> You must use manifest version 1.5 or higher to implement the `webApplicationInfo` field.

#### To configure Teams app manifest for Azure AD registration

1. Open the app project.
2. Open manifest.json.
3. Append the following code snippet to the manifest to add the new property:

    ```json
    "webApplicationInfo": {
    "id": "{Azure AD AppId}",
    "resource": "api://{ngrokSubdomain}.ngrok.io/{Azure AD AppId}"
    }
    ```

    where,
    - {Azure AD AppId} is app ID you created when you registered your app in Azure AD
    - {ngrokSubdomain} is the ngrok URL

4. Update the Azure app ID in the **id** property.
5. Update the ngrok URL in the following properties:
   1. `contentUrl`
   2. `configurationUrl`
   3. `validDomains`
6. Save the app manifest file.

#### View manifest sample

<details>
<summary>Here's an example of app manifest after it's updated:</summary>

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/teams/v1.11/MicrosoftTeams.schema.json",
  "manifestVersion": "1.11",
  "version": "1.0.0",
  "id": "bccfbe67-e08b-4ec1-a7fd-e0aaf41a097c",
  "packageName": "com.contoso.teamsauthsso",
  "developer": {
    "name": "Microsoft",
    "websiteUrl": "https://www.microsoft.com",
    "privacyUrl": "https://www.microsoft.com/privacy",
    "termsOfUseUrl": "https://www.microsoft.com/termsofuse"
  },
  "name": {
    "short": "Teams Auth SSO",
    "full": "Teams Auth SSO"
  },
  "description": {
    "short": "Teams Auth SSO app",
    "full": "The Teams Auth SSO app"
  },
  "icons": {
    "outline": "outline.png",
    "color": "color.png"
  },
  "accentColor": "#60A18E",
  "staticTabs": [
    {
      "entityId": "auth",
      "name": "Auth",
      "contentUrl": "https://23c3-103-50-148-128.ngrok.io/Home/Index",
      "scopes": [ "personal" ]
    }
  ],
  "configurableTabs": [
    {
      "configurationUrl": "https://23c3-103-50-148-128.ngrok.io/Home/Configure",
      "canUpdateConfiguration": true,
      "scopes": [
        "team"
      ]
    }
  ],
  "permissions": [ "identity", "messageTeamMembers" ],
  "validDomains": [
    "23c3-103-50-148-128.ngrok.io"
  ],
  "webApplicationInfo": {
    "id": "bccfbe67-e08b-4ec1-a7fd-e0aaf41a097c",
    "resource": "api://23c3-103-50-148-128.ngrok.io/bccfbe67-e08b-4ec1-a7fd-e0aaf41a097c"
  }
}
```
</details>

### Configure code in app settings

The `appsettings.json` file includes the configuration for Azure AD app.

#### To configure Teams app settings for Azure AD registration

1. Open the app project.
2. Open appsettings.json.
3. Update the `AzureAd` code snippet with configured app details on Azure AD portal:

   ```json
     "AzureAd": {
    "Instance": "https://login.microsoftonline.com/",
    "TenantId": "[AzureAD Tenant Id]",
    "ClientId": "[AzureAD Client Id]",
    "AppSecret": "[Azure App secret]",
    "ApplicationIdURI": "[Application ID URI]",
    "AuthUrl": "/oauth2/v2.0/token",
    "ValidIssuers": "https://login.microsoftonline.com/TENANT_ID/v2.0,https://sts.windows.net/TENANT_ID/"
    },
    ```
    where,
    - `[AzureAD Tenant Id]` is **Directory (tenant) ID**
    - `[AzureAD Client Id]` is **Application (client) ID**
    - `[Azure App secret]` is the **Value** of **Client credentials**, which is client secret
    - `[Application ID URI]` is **Application ID URI**
    - `TENANT_ID` is **Directory (tenant) ID**

4. Save the file.

#### View the updated app settings

<details>
<summary>Here's an example of app settings update:</summary>

This following sample details are configured in Azure AD:

:::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/azure-app-overview.png" alt-text="Overview of app details on Azure AD portal":::

The authentication details from Azure AD are updated in `appsettings.json`:

```json
    "AzureAd": {
    "Instance": "https://login.microsoftonline.com/",
    "TenantId": "72f988bf-86f1-41af-91ab-2d7cd011db47",
    "ClientId": "bccfbe67-e08b-4ec1-a7fd-e0aaf41a097c",
    "AppSecret": "p-t7Q~wiGyaPdXcmn6E_XnQBmfANChRx5QtZG",
    "ApplicationIdURI": "api://bccfbe67-e08b-4ec1-a7fd-e0aaf41a097c",
    "AuthUrl": "/oauth2/v2.0/token",
    "ValidIssuers": "https://login.microsoftonline.com/72f988bf-86f1-41af-91ab-2d7cd011db47/v2.0,https://sts.windows.net/72f988bf-86f1-41af-91ab-2d7cd011db47/"
  },
```

</details>

## Get an access token from your client-side code

This step requires your app user to give their consent for using their Teams identity for user-level permission. Azure AD receives the user identity token (ID token) and sends an access token to Teams.

- **ID token**: An ID token is granted for a user when they have been verified successfully. It's used to cache user profile information. Teams uses this token to pre-fetch the access token for the user who is currently logged into Teams.
- **Access token**: An access token is an artifact contains user identity and permission scopes.

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

The following code provides an example of on-behalf-of (OBO) flow to fetch access token using Microsoft Authentication Library (MSAL):

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

```Node.js

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

## Update the app manifest

The Teams app manifest describes how your app integrates into the Microsoft Teams. Your app manifest must conform to the schema hosted at https://developer.microsoft.com/json-schemas/teams/v1.12/MicrosoftTeams.schema.json.

\ Teams app manifest is updated as the last step. \

## Code sample

|**Sample name**|**Description**|**C#**|**Node.js**|
|---------------|---------------|------|--------------|
| Tab SSO |Microsoft Teams sample app for tabs Azure AD SSO| [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-sso/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/tab-sso/nodejs), </br>[Teams Toolkit](../../../toolkit/visual-studio-code-tab-sso.md)|