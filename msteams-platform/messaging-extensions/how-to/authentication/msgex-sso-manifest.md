---
title: Update manifest for enabling SSO for message extension
description: Describes updating manifest for enabling SSO for message extension
ms.topic: how-to
ms.localizationpriority: high
---
# Update app manifest for SSO and preview your app

Before you update Teams app manifest, ensure that you've configure code to enable SSO in your app.

> [!div class="nextstepaction"]
> [Configure code](msgex-sso-code.md)

You've registered your bot app in Azure AD, and obtained an app ID. You've also configured your code to receive bot token. Now, you must update the Teams app manifest to enable SSO for your bot app. The Teams app manifest describes how an app integrates into Teams.

## webApplicationInfo property

Configure the `webApplicationInfo` property in the Teams app manifest file. This property enables SSO for your app to help app users access your bot app seamlessly.

`webApplicationInfo` has two elements, `id` and `resource`.

| Element | Description |
| --- | --- |
| `id` | Enter the app ID (GUID) that you created in Azure AD. |
| `resource` | Enter your app's subdomain URI and the application ID URI that you created in Azure AD when creating scope. You can copy it from the **Azure AD** > **Expose an API** section. |

> [!NOTE]
> Use manifest version 1.5 or higher to implement the `webApplicationInfo` property.

The application ID URI that you registered in Azure AD is configured with the scope of the API you exposed. Configure your app's subdomain URI in `resource` to ensure that the authentication request using `getAuthToken()` is from the domain given in Teams app manifest.

For more information, see [webApplicationInfo](../../../resources/schema/manifest-schema.md#webapplicationinfo).

## To configure Teams app manifest

1. Open the bot app project.
2. Open the manifest folder.

  > [!NOTE]
  >
  > - The manifest folder should be at the root of your project. For more information, see [Create a Microsoft Teams app package](../../../concepts/build-and-test/apps-package.md).
  > - For more information on learning how to create a manifest.json, see [Reference: Manifest schema for Microsoft Teams](../../../resources/schema/manifest-schema.md).

1. Open the manifest.json file
1. Add one of the following code snippets to the manifest file to add the new property.

    - If your app has a standalone bot, add the following code snippet:

        ```json
        "webApplicationInfo": 
        {
            "id": "00000000-0000-0000-0000-000000000000",
            "resource": "api://botid-00000000-0000-0000-0000-000000000000"
        }
        ```

    - If your app contains a bot and a tab, add the following code snippet:

        ```json
        "webApplicationInfo": 
        {
            "id": "00000000-0000-0000-0000-000000000000",
            "resource": "api://subdomain.example.com/botid-00000000-0000-0000-0000-000000000000"
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
6. Save the Teams app manifest file.

<br>
<details>
<summary>Here's an example of app manifest after it's updated</summary>

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/teams/v1.7/MicrosoftTeams.schema.json",
  "manifestVersion": "1.7",
  "version": "1.0",
  "id": "00000000-0000-0000-0000-000000000000",
  "packageName": "com.microsoft.teams.samples.auth",
  "developer": {
    "name": "Your Name Here",
    "websiteUrl": "https://www.example.com",
    "privacyUrl": "https://www.example.com/PrivacyStatement",
    "termsOfUseUrl": "https://www.example.com/TermsOfUse"
  },
  "name": {
    "short": "Teams AuthBot"
  },
  "description": {
    "short": "Authentication sample for Microsoft Teams",
    "full": "Authentication sample for Microsoft Teams"
  },
  "icons": {
    "outline": "outline.png",
    "color": "color.png"
  },
  "accentColor": "#F3F4F6",
  "configurableTabs": [

  ],
  "staticTabs": [
    {
      "contentUrl": "https://<<BASE_URI_DOMAIN>>/tab/simple",
      "entityId": "simpleAuth",
      "name": "Simple Auth",
      "scopes": [
        "personal"
      ]
    },
    {
      "contentUrl": "https://<<BASE_URI_DOMAIN>>/tab/silent?loginHint={loginHint}&userObjectId={userObjectId}&tenantId={tid}",
      "entityId": "silentAuth",
      "name": "Silent Auth",
      "scopes": [
        "personal"
      ]
    },
    {
      "contentUrl": "https://<<BASE_URI_DOMAIN>>/tab/sso",
      "entityId": "ssoAuth",
      "name": "SSO Auth",
      "scopes": [
        "personal"
      ]
    }
  ],
  "bots": [
    {
      "botId": "<<REGISTERED_BOT_ID>>",
      "scopes": [
        "personal"
      ]
    }
  ],
  "permissions": [
    "messageTeamMembers",
    "identity"
  ],
  "validDomains": [
    "<<BASE_URI_DOMAIN>>",
    "token.botframework.com"
  ],
  "webApplicationInfo": {
      "id": "<<REGISTERED_BOT_ID>>",
      "resource": "api://<<BASE_URI_DOMAIN>>/<<REGISTERED_BOT_ID>>"
  }
}
```

</details>

> [!NOTE]
> During debug, you can use ngrok to test your app in Azure AD. In that case, you need to replace the subdomain in `api://subdomain.example.com/00000000-0000-0000-0000-000000000000` with the ngrok url. You'll need to update the url whenever your ngrok subdomain changes For example, api://23c3-103-50-148-128.ngrok.io/bccfbe67-e08b-4ec1-a7fd-e0aaf41a097c.

## Sideload and Preview in Teams

You've configured the bot app to enable SSO. You can now sideload your bot app in Teams, and preview it in Teams environment.

<!--
:::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/sso-flow.png" alt-text="SSO app" border="false":::
-->

To preview your bot app in Teams:

1. Create an app package.

   The app package is a zip file that contains the app manifest file and app icons.

1. Open Teams.

1. Select **Apps** > **Manage your apps** > **Upload an app**.

    The options to upload an app appear.

1. Select **Upload a custom app** to sideload the bot app to Teams.

1. Select your app package zip file, and then select **Add**.

    The bot app is sideloaded. The dialog appears to inform you of the permissions that may be required.

1. Select **Continue**.

  Teams opens the bot app and you can use it.

  Congratulations! You've enabled SSO for your bot app.
