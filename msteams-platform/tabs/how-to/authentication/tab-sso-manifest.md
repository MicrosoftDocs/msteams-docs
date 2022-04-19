---
title: Update manifest for enabling Teams SSO for tabs
description: Describes updating manifest for enabling Teams SSO for tabs
ms.topic: how-to
ms.localizationpriority: medium
keywords: teams authentication tabs Microsoft Azure Active Directory (Azure AD) Graph API
---
# Update Teams app manifest and preview the app

You've registered your app in Azure AD, and obtained an app ID. Now, you must update the Teams app manifest with the app ID and subdomain URL. The Teams manifest describes how the app integrates into the Microsoft Teams product.

Before you update the app manifest, you'll need to:

- Build and debug a tab app
- Create an ngrok tunnel

You'll need to add the `webApplicationInfo` property to the Teams app manifest file. It helps users seamlessly sign into your app.

> [!NOTE]
> - You must use manifest version 1.5 or higher to implement the `webApplicationInfo` field.

<br>
<br>
<details>
<summary><b>Learn to create a manifest file</b></summary>

If your app doesn't have a app manifest file, you'll need to create it. To create an app manifest file, use the content shown below to create a .json file named, `manifest.json`.

> [!NOTE]
> The manifest content shown here is only for a tab app. For more information, please see [Manifest schema](/resources/schema/manifest-schema).

  ```json
{ 
  "$schema": "https://developer.microsoft.com/json-schemas/teams/v1.11/MicrosoftTeams.schema.json", 
 "manifestVersion": "1.12", 
 "version": "1.0.0", 
 "id": "{new GUID for this Teams app - not the Azure AD App ID}", 
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
     "contentUrl": "https://{subDomain}.ngrok.io/Home/Index", 
     "scopes": [ "personal" ] 
    } 
  ], 

  "configurableTabs": [ 
    { 
     "configurationUrl": "https://{subDomain}.ngrok.io/Home/Configure", 
     "canUpdateConfiguration": true, 
     "scopes": [ 
     "team" 
      ] 
    } 
  ], 
  "permissions": [ "identity", "messageTeamMembers" ], 
  "validDomains": [ 
   "{subdomain or ngrok url}" 
  ], 
  "webApplicationInfo": { 
    "id": "{Azure AD AppId}", 
    "resource": "api://{subdomain or ngrok url} /{Azure AD AppId}" 
  }
} 
```
</details>

## To configure Teams app manifest for Azure AD registration

1. Open the app project.
2. Open manifest.json.
3. Append the following code snippet to the manifest to add the new property:

    ```json
    "webApplicationInfo": {
    "id": "{Azure AD AppId}",
    "resource": "api://{Subdomain}.example.com/{Azure AD AppId}"
    }
    ```

    where,
    - {Azure AD AppId} is app ID you created when you registered your app in Azure AD
    - {{Subdomain}.example.com} is the  domain and subdomain of your application. This is the same URI that you registered when creating scope in Azure AD.

4. Update the Azure app ID in the **id** property.
5. Update the ngrok URL in the following properties:
   1. `contentUrl`
   2. `configurationUrl`
   3. `validDomains`
6. Save the app manifest file.

### View manifest sample

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

## Sideload and Preview in Teams

After you update the manifest, you can preview your app in Teams environment.

To preview your app in Teams:

1. Create an app package.

   The app package contains the app manifest and app icons.

2. Open Teams.

3. Select **Teams Store** > **Manage your apps** > **Publish an app**.

    The **Publish an app** options appear.

4. Select **Upload a custom app** to sideload the tab app to Teams.

5. Select your app package to upload.

6. Select **Add**.

    The Tab app is loaded and the consent form appears.

7. Select **Accept**.

    The tab app is loaded and you can use it.

    Congratulations! You have enabled Teams SSO for your tab app.

## See also

- [Manifest schema for Microsoft Teams](../../../resources/schema/manifest-schema.md)
- [Manifest schema format](https://developer.microsoft.com/json-schemas/teams/v1.12/MicrosoftTeams.schema.json)
- [Create a Microsoft Teams app package](../../../concepts/build-and-test/apps-package.md)

<!--
### Configure code in app settings - Specific to Bot apps

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

</details>-->
