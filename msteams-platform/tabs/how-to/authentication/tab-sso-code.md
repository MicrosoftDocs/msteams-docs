---
title: App code configuration for enabling Teams SSO for tabs
description: Describes app code configuration for enabling Teams SSO for tabs
ms.topic: how-to
ms.localizationpriority: medium
keywords: teams authentication tabs Microsoft Azure Active Directory (Azure AD) Graph API
---
# Update app code for enabling Teams SSO

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

## Update the app manifest

The Teams app manifest describes how your app integrates into the Microsoft Teams. Your app manifest must conform to the schema hosted at https://developer.microsoft.com/json-schemas/teams/v1.12/MicrosoftTeams.schema.json.

You'll need to add the `webApplicationInfo` property to the app manifest file.

> [!NOTE]
> You must use manifest version 1.5 or higher to implement the `webApplicationInfo` field.

### To update the app manifest

1. Open the sample app project **TeamsTabSSO.csproj** from the **/Microsoft-Teams-Samples/samples/tab-sso/csharp/** directory of the cloned repo.
2. Open **TeamsTabSSO** > **Manifest** > **manifest.json** from the **Solution Explorer**.
3. Append the following code snippet to the manifest to add the new property:

    ```json
    "webApplicationInfo": {
    "id": "{Azure AD AppId}",
    "resource": "api://{ngrokSubdomain}.ngrok.io/{Azure AD AppId}"
    }
    ```

    where,
    - {Azure AD AppId}* is app ID you created when you registered your app in Azure AD
    - {ngrokSubdomain}* is the ngrok URL

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

## Update Azure AD details

The `appsettings.json` file includes the configuration for Azure AD app.

### To update the app settings

1. Open **TeamsTabSSO** > **appsettings.json** from the **Solution Explorer**.
2. Update the `AzureAd` code snippet with configured app details on Azure AD portal:

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

3. Save the file.

### View the updated app settings

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
