---
title: Update manifest for enabling SSO for tabs
description: Describes updating manifest for enabling SSO for tabs
ms.topic: how-to
ms.localizationpriority: medium
keywords: teams authentication tabs Microsoft Azure Active Directory (Azure AD) Graph API
---
# Enable SSO in Teams app manifest and preview app

Before you update Teams app manifest, ensure that you've configure code to enable SSO in your tab app.

> [!div class="nextstepaction"]
> [Configure code](tab-sso-code.md)

You've registered your tab app in Azure AD, and obtained an app ID. You've also configured your code to call `getAuthToken` and handle the access token. Now, you must update the Teams app manifest to enable SSO for your tab app. The Teams app manifest describes how an app integrates into Teams.

## webApplicationInfo property

Configure the `webApplicationInfo` property in the Teams app manifest file. This property enables SSO for your app, and invokes the OBO flow to help app users access your tab app seamlessly.

&nbsp;&nbsp;:::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/sso-manifest.png" alt-text="Teams app manifest configuration" border="false":::

:::row:::
  :::column span="2":::
    `webApplicationInfo` has two elements, `id` and `resource`.

    | Element | Description |
    | --- | --- |
    | id | Enter the app ID (GUID) that you created in Azure AD. |
    | resource | Enter your app's subdomain URI and the application ID URI that you created in Azure AD when creating scope. You can copy the value from the **Azure AD** > **Expose an API** section. |

  :::column-end:::
  :::column span="1":::
    <br>

    > [!NOTE]
    > Use manifest version 1.5 or higher to implement the `webApplicationInfo` property.
  :::column-end:::
:::row-end:::

The application ID URI that you registered in Azure AD is configured with the scope of the API you exposed. Configure your app's subdomain URI in `resource` to ensure that the authentication request using `getAuthToken()` is from the domain given in Teams app manifest.

For more information, please see [webApplicationInfo](/resources/schema/manifest-schema.md#webapplicationinfo).
<br>
<br>
<details>
<summary><b>Learn to create a manifest file</b></summary>

If your tab app doesn't have a Teams app manifest file, you'll need to create it. To create a Teams app manifest file, use the content given below to create a .json file named, `manifest.json`.

> [!NOTE]
> The manifest example content shown here is only for a tab app. It uses example values for subdomain URI and package name. For more information, please see [Manifest schema](/resources/schema/manifest-schema).

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
     "contentUrl": "https://https://subdomain.example.com/Home/Index", 
     "scopes": [ "personal" ] 
    } 
  ], 

  "configurableTabs": [ 
    { 
     "configurationUrl": "https://subdomain.example.com/Home/Configure", 
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
    "resource": "api://subdomain.example.com/{Azure AD AppId}" 
  }
} 
```

</details>

## To configure Teams app manifest for Azure AD registration

1. Open the app project.
2. Open manifest.json.
3. Append the following code snippet to the manifest file to add the new property:

    ```json
    "webApplicationInfo": {
    "id": "{Azure AD AppId}",
    "resource": "api://{Subdomain}.example.com/{Azure AD AppId}"
    }
    ```

    where,
    - {Azure AD AppId} is the app ID you created when you registered your app in Azure AD. It is the GUID.
    - {{Subdomain}.app ID URI} is the application ID URI that you registered when creating scope in Azure AD.

4. Update the app ID from Azure AD in the **id** property.
5. Update the subdomain URL in the following properties:
   1. `contentUrl`
   2. `configurationUrl`
   3. `validDomains`
6. Save the Teams app manifest file.

<br>
<details>
<summary>Here's an example of app manifest after it's updated</summary>

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
      "contentUrl": "https://contoso.com/Home/Index",
      "scopes": [ "personal" ]
    }
  ],
  "configurableTabs": [
    {
      "configurationUrl": "https://contoso.com/Home/Configure",
      "canUpdateConfiguration": true,
      "scopes": [
        "team"
      ]
    }
  ],
  "permissions": [ "identity", "messageTeamMembers" ],
  "validDomains": [
    "contoso.com"
  ],
  "webApplicationInfo": {
    "id": "bccfbe67-e08b-4ec1-a7fd-e0aaf41a097c",
    "resource": "api://contoso.com/bccfbe67-e08b-4ec1-a7fd-e0aaf41a097c"
  }
}
```

</details>

> [!NOTE]
> During debug, you can use ngrok to test your app in Azure AD. In that case, you need to replace the subdomain in `api://subdomain.example.com/00000000-0000-0000-0000-000000000000` with the ngrok url. You'll need to update the url whenever your ngrok subdomain changes For example, api://23c3-103-50-148-128.ngrok.io/bccfbe67-e08b-4ec1-a7fd-e0aaf41a097c.

## Sideload and Preview in Teams

You've configured the tab app to enable SSO in Azure AD, in app code, and in Teams manifest file. You can now sideload your tab app in Teams, and preview it in Teams environment.

:::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/sso-flow.png" alt-text="SSO app" border="false":::

To preview your tab app in Teams:

1. Create an app package.

   The app package is a zip file that contains the app manifest file and app icons.

1. Open Teams.

1. Select **Apps** > **Manage your apps** > **Upload an app**.

    The options to upload an app appear.

1. Select **Upload a custom app** to sideload the tab app to Teams.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/sideload-tab-app.png" alt-text="Sideload tab app into Teams":::

1. Select your app package zip file, and then select **Add**.

    The tab app is sideloaded and the Teams consent dialog appears.

1. Select **Continue**.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/teams-sso-consent.png" alt-text="Teams consent dialog box" border="true":::

    The Azure AD consent dialog appears.

1. Select **Accept**.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/aad-sso-consent.png" alt-text="Azure AD consent dialog" border="true":::

    Teams opens the tab app and you can use it.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/teams-sso-app.png" alt-text="Example of Teams tab app with SSO enabled" border="false":::

    Congratulations! You've enabled SSO for your tab app.

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
