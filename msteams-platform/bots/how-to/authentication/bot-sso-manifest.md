---
title: Update manifest for enabling SSO for bot and messaging extension
description: Describes updating manifest to enable SSO for bot and message extension.
ms.topic: how-to
ms.localizationpriority: high
---
# Update app manifest for SSO and preview your app

Before you update app manifest (previously called Teams app manifest), ensure that you've configured code to enable SSO in your app.

> [!div class="nextstepaction"]
> [Add code](bot-sso-code.md)

You've registered your app and bot resource in Microsoft Entra ID. You've also configured code to handle tokens. Now, you must update the app manifest to enable SSO for your app. The app manifest describes how an app integrates into Teams.

## webApplicationInfo property

Configure the `webApplicationInfo` property in the app manifest file. This property enables SSO for your app to help app users access your bot app seamlessly.

`webApplicationInfo` has two elements, `id` and `resource`.

| Element | Description |
| --- | --- |
| `id` | Enter the app ID (GUID) that you created in Microsoft Entra ID. |
| `resource` | Enter your app's subdomain URI and the application ID URI that you created in Microsoft Entra ID when creating scope. You can copy it from the **Microsoft Entra ID** > **Expose an API** section. |

> [!NOTE]
> Use the app manifest version 1.5 or later to implement the `webApplicationInfo` property.

The application ID URI that you registered in Microsoft Entra ID is configured with the scope of the API you exposed. Configure your app's subdomain URI in `resource` to ensure that the authentication request using `getAuthToken()` is from the domain given in app manifest.

For more information, see [webApplicationInfo](../../../resources/schema/manifest-schema.md#webapplicationinfo).

## To configure app manifest

1. Open the app project.
2. Open the app manifest folder.

    > [!NOTE]
    >
    > - The app manifest folder should be at the root of your project. For more information, see [Create a Microsoft Teams app package](../../../concepts/build-and-test/apps-package.md).
    > - For more information on learning how to create a manifest.json, see [the app manifest schema for Microsoft Teams](../../../resources/schema/manifest-schema.md).

1. Open the `manifest.json` file.
1. Add one of the following code snippets to the app manifest file to add the new property:

    - If your app has a standalone bot, add the following code snippet:

        ```json
        "webApplicationInfo": 
        {
        "id": "{Azure AD AppId}",
        "resource": "api://botid-{Azure AD AppId}"
        }
        ```

    - If your app contains a bot and a tab, add the following code snippet:

        ```json
        "webApplicationInfo": 
        {
        "id": "{Azure AD AppId}",
        "resource": "api://subdomain.example.com/botid-{Azure AD AppId}"
        }
        ```

        where,
        - `{Azure AD AppId}` is the app ID you created when you registered your app in Microsoft Entra ID. It's the GUID.
        - `subdomain.example.com` is the application ID URI that you registered when creating scope in Microsoft Entra ID.

4. Update the app ID from Microsoft Entra ID in the **id** property.
5. Update the subdomain URL in the following properties:
   1. `contentUrl`
   2. `configurationUrl`
   3. `validDomains`
6. Save the app manifest file. For more information, see [app manifest](../../../resources/schema/manifest-schema.md).

<br>
<details>
<summary>Here's an example of the app manifest after it's updated</summary>

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
> During debug, you can use ngrok to test your app in Microsoft Entra ID. In that case, you need to replace the subdomain in `api://subdomain.example.com/00000000-0000-0000-0000-000000000000` with the ngrok URL. You'll need to update the URL whenever your ngrok subdomain changes. For example, api://23c3-103-50-148-128.ngrok.io/bccfbe67-e08b-4ec1-a7fd-e0aaf41a097c.

## Upload a custom app and Preview in Teams

You've configured the app to enable SSO. You can now upload your custom app in Teams and preview it in Teams environment.

To preview your app in Teams:

1. Create an app package.

   The app package is a zip file that contains the app manifest file and app icons.

1. Open Teams.

1. Select **Apps** > **Manage your apps** > **Upload an app**.

    The options to upload an app appear.

1. Select **Upload a custom app** to upload your custom app into Teams.

1. Select your app package zip file, and then select **Add**.

    The custom app is uploaded. The consent dialog appears to inform you of the permissions that may be required.

1. Select **Continue**.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-bots/bot-consent.png" alt-text="Bot consent message" border="false":::

  Teams opens the app and you can use it.

  Congratulations! You've enabled SSO for your bot or message extension app.

## SSO support in Developer Portal

You can also upload your SSO-enabled app in Developer Portal. To enable SSO support in Developer Portal after you've imported it:

1. Open [Developer Portal](https://dev.teams.microsoft.com/home).
1. Select **Tools**, and from the list of apps that appears select your app to open it in Developer Portal.
1. Select **Configure**.

    The **Configure** page appears.

1. Enter the messaging endpoint you configured in Microsoft Entra ID as **Endpoint address**.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-bots/dev-portal-sso.png" alt-text="Developer Portal support for SSO in a bot app":::

1. Select **Save**.

Developer Portal would now support SSO for your app.
