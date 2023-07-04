---
title: Update manifest for enabling SSO for tabs
description: Update Teams manifest for enabling Single sign-on (SSO) for tabs and sideload it into Teams client for testing SSO authentication.
ms.topic: how-to
ms.localizationpriority: high
keywords: teams authentication tabs Microsoft Azure Active Directory (Azure AD) Graph API
ms.date: 11/21/2022
---
# Update manifest for SSO and preview app

Before you update Teams app manifest, ensure that you've configured code to enable SSO in your tab app.

> [!div class="nextstepaction"]
> [Configure code](tab-sso-code.md)

You've registered your tab app in Azure AD, and obtained an app ID. You've also configured your code to call `getAuthToken()` and handle the access token. Now, you must update the Teams app manifest to enable SSO for your tab app. The Teams app manifest describes how an app integrates into Teams.

## webApplicationInfo property

Configure the `webApplicationInfo` property in the Teams app manifest file. This property enables SSO for your app to help app users access your tab app seamlessly.

&nbsp;&nbsp;:::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/sso-manifest.png" alt-text="Teams app manifest configuration":::

`webApplicationInfo` has two elements, `id` and `resource`.

| Element | Description |
| --- | --- |
| id | Enter the app ID (GUID) that you created in Azure AD. |
| resource | Enter your app's subdomain URI and the application ID URI that you created in Azure AD when creating scope. You can copy it from the **Azure AD** > **Expose an API** section. |

> [!NOTE]
> Use manifest version 1.5 or higher to implement the `webApplicationInfo` property.

The application ID URI that you registered in Azure AD is configured with the scope of the API you exposed. Configure your app's subdomain URI in `resource` to ensure that the authentication request using `getAuthToken()` is from the domain given in Teams app manifest.

For more information, see [webApplicationInfo](../../../resources/schema/manifest-schema.md#webapplicationinfo).

## To configure Teams app manifest

1. Open the tab app project.
2. Open the manifest folder.

    > [!NOTE]
    >
    > - The manifest folder should be at the root of your project. For more information, see [Create a Microsoft Teams app package](../../../concepts/build-and-test/apps-package.md).
    > - For more information on learning how to create a manifest.json, see [Reference: Manifest schema for Microsoft Teams](../../../resources/schema/manifest-schema.md).

1. Open the `manifest.json` file
1. Append the following code snippet to the manifest file to add the new property:

    ```json
    "webApplicationInfo": {
    "id": "{Azure AD AppId}",
    "resource": "api://{Subdomain}.example.com/{Azure AD AppId}"
    }
    ```

    where,
    - {Azure AD AppId} is the app ID you created when you registered your app in Azure AD. It's the GUID.
    - {{Subdomain}.app ID URI} is the application ID URI that you registered when creating scope in Azure AD.

4. Update the app ID from Azure AD in the **id** property.
5. Update the subdomain URL in the following properties:
   1. `contentUrl`
   2. `configurationUrl`
   3. `validDomains`
6. Save the Teams app manifest file. For more information, see [App manifest schema for Teams](../../../resources/schema/manifest-schema.md).

<br>
<details>
<summary>Here's an example of app manifest after it's updated</summary>

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/teams/v1.11/MicrosoftTeams.schema.json",
  "manifestVersion": "1.11",
  "version": "1.0.0",
  "id": "bccfbe67-e08b-4ec1-a7fd-e0aaf41a097c",
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
> During debug, you can use ngrok to test your app in Azure AD. In that case, you need to replace the subdomain in `api://subdomain.example.com/00000000-0000-0000-0000-000000000000` with the ngrok URL. You'll need to update the URL whenever your ngrok subdomain changes. For example, api://23c3-103-50-148-128.ngrok.io/bccfbe67-e08b-4ec1-a7fd-e0aaf41a097c.

## Sideload and Preview in Teams

You've configured the tab app to enable SSO in Azure AD, in app code, and in Teams manifest file. You can now sideload your tab app in Teams, and preview it in Teams environment.

:::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/sso-flow.png" alt-text="SSO app":::

To preview your tab app in Teams:

1. Create an app package.

   The app package is a zip file that contains the app manifest file and app icons.

1. Open Teams.

1. Select **Apps** > **Manage your apps** > **Upload an app**.

    The options to upload an app appear.

1. Select **Upload a custom app** to sideload the tab app to Teams.

1. Select your app package zip file, and then select **Add**.

    The tab app is sideloaded and the dialog appears to inform you of the additional permissions that may be required.

1. Select **Continue**.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/teams-sso-consent.png" alt-text="Teams dialog box informing about additional permissions required":::

    The Azure AD consent dialog appears.

1. Select **Accept** to give consent for open-id scopes.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/aad-sso-consent.png" alt-text="Azure AD consent dialog":::

    Teams opens the tab app and you can use it.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/teams-sso-app.png" alt-text="Example of Teams tab app with SSO enabled":::

    Congratulations! You've enabled SSO for your tab app.

## See also

- [Manifest schema for Microsoft Teams](../../../resources/schema/manifest-schema.md)
- [Manifest schema format](https://developer.microsoft.com/json-schemas/teams/v1.12/MicrosoftTeams.schema.json)
- [Create a Microsoft Teams app package](../../../concepts/build-and-test/apps-package.md)
