---
title: Enable SSO for Bot & Message Extension
description: Learn to update and configure the app manifest to enable SSO for bot and message extension, upload a custom app and preview, and SSO support in Developer Portal.
ms.topic: how-to
ms.localizationpriority: high
ms.date: 10/28/2026
---
# Update app manifest for SSO and preview your app

Before you update app manifest (previously called Teams app manifest), ensure that you configure the code to enable single sign-on (SSO) in your app.

> [!div class="nextstepaction"]
> [Add code](bot-sso-code.md)

You've registered your app and bot resource in Microsoft Entra ID. You've also configured code to handle tokens. Now, you must update the app manifest to enable SSO for your app. The app manifest describes how an app integrates into Teams.

## webApplicationInfo property

Configure the `webApplicationInfo` property in the app manifest file. This property enables SSO for your app to help app users access your bot app seamlessly.

`webApplicationInfo` has two elements, `id` and `resource`.

| Element | Description |
| --- | --- |
| `id` | Enter the Application (client) ID of the Microsoft Entra app registration configured for SSO. Use the registration created or selected when configuring the bot, or a separate registration if the bot uses a user-assigned managed identity. Don't use the managed identity's client ID for this property. |
| `resource` | Enter the **Application ID URI** configured under **Expose an API** in the SSO app registration. This value must match the **Token Exchange URL** in the bot's OAuth connection. |

> [!NOTE]
> Use the app manifest version 1.5 or later to implement the `webApplicationInfo` property.

> [!IMPORTANT]
> If your bot is created using **User-Assigned Managed Identity**, an App Registration (Entra App ID) isn't automatically created. RSC permissions are mapped against the `webApplicationInfo.id` property, which must correspond to an App Registration in Microsoft Entra ID. To use RSC permissions with a managed identity bot, you must:
>
> 1. Create a new App Registration in the [Azure portal](https://portal.azure.com).
> 1. Assign the required RSC permissions to the App Registration.
> 1. Use the Application (client) ID of the new App Registration as the `id` value in the `webApplicationInfo` section of your app manifest.
>
> If you use the managed identity ID directly in `webApplicationInfo` without an associated App Registration, app installation fails with the error: *Failed to execute TeamsGraphService backend request IsUserAuthorizedToGrantPersonalScopeResourceSpecificPermissionsRequestV2*.

The application ID URI that you registered in Microsoft Entra ID is configured with the scope of the API you exposed. For an app with both a bot and a tab, include the tab's domain in this URI, as shown in the following examples. Copy the complete URI into `resource`.

For more information, see [webApplicationInfo](/microsoft-365/extensibility/schema/root-web-application-info).

## To configure app manifest

1. Open the app project.
2. Open the app manifest folder.

    > [!NOTE]
    >
    > - The app manifest folder should be at the root of your project. For more information, see [Create a Microsoft Teams app package](../../../concepts/build-and-test/apps-package.md).
    > - For more information on learning how to create a manifest.json, see [the app manifest schema for Microsoft Teams](/microsoft-365/extensibility/schema/).

1. Open the `manifest.json` file.
1. Identify the bot and SSO app registration IDs for your configuration:

    - **Bot using an app registration**: If the bot and SSO use the same Microsoft Entra app registration, `bots[].botId` and `webApplicationInfo.id` have the same Application (client) ID. This applies whether the registration is newly created or pre-existing.
    - **Bot using a user-assigned managed identity**: Set `bots[].botId` to the managed identity's client ID. Set `webApplicationInfo.id` to the Application (client) ID of the separate Microsoft Entra app registration configured for SSO. These IDs are different.

1. Add the `webApplicationInfo` property using the appropriate app manifest excerpt:

    - If your app has a standalone bot, use the following excerpt:

        ```json
        {
          "webApplicationInfo": {
            "id": "<<SSO_APP_CLIENT_ID>>",
            "resource": "api://botid-<<BOT_ID>>"
          }
        }
        ```

    - If your app contains a bot and a tab, use the following excerpt:

        ```json
        {
          "webApplicationInfo": {
            "id": "<<SSO_APP_CLIENT_ID>>",
            "resource": "api://<<BASE_URI_DOMAIN>>/botid-<<BOT_ID>>"
          }
        }
        ```

    Replace the placeholders in these excerpts and the full example that follows:

    - `<<BOT_ID>>`: The bot's ID, used in `bots[].botId`. For a bot using an app registration, this is that registration's Application (client) ID. For a bot using a user-assigned managed identity, this is the managed identity's client ID.
    - `<<SSO_APP_CLIENT_ID>>`: The Application (client) ID of the Microsoft Entra app registration configured for SSO.
    - `<<BASE_URI_DOMAIN>>`: The fully qualified domain name that hosts your tab, such as `subdomain.example.com`.

    Ensure that `resource` exactly matches the Application ID URI exposed by the SSO app registration and the **Token Exchange URL** in the bot's OAuth connection. The `botid-` segment uses `<<BOT_ID>>`, not the separate SSO app registration's client ID.

    For example, a standalone bot using a user-assigned managed identity has the following app manifest excerpt. Replace `<<MANAGED_IDENTITY_CLIENT_ID>>` with the managed identity's client ID:

    ```json
    {
      "bots": [
        {
          "botId": "<<MANAGED_IDENTITY_CLIENT_ID>>",
          "scopes": [
            "personal"
          ]
        }
      ],
      "webApplicationInfo": {
        "id": "<<SSO_APP_CLIENT_ID>>",
        "resource": "api://botid-<<MANAGED_IDENTITY_CLIENT_ID>>"
      }
    }
    ```

6. Update `webApplicationInfo.id` with the SSO app registration's Application (client) ID.
7. Update the subdomain URL in the following properties:
   1. `contentUrl`
   2. `configurationUrl`
   3. `validDomains`

   > [!NOTE]
   > To handle authentication and token exchange, add `https://token.botframework.com` to the `validDomains` property for bots using Bot Framework. For OAuth URLs and data residency list, see [OAuth URL support in Azure AI Bot Service](/azure/bot-service/ref-oauth-redirect-urls?view=azure-bot-service-4.0&preserve-view=true).

8. Save the app manifest file. For more information, see [app manifest](/microsoft-365/extensibility/schema/).

<br>
<details>
<summary>Here's an example of the app manifest after it's updated</summary>

This example contains a bot and tabs. If the bot and SSO use the same app registration, replace `<<BOT_ID>>` and `<<SSO_APP_CLIENT_ID>>` with the same Application (client) ID. If the bot uses a user-assigned managed identity, replace `<<BOT_ID>>` with the managed identity's client ID and `<<SSO_APP_CLIENT_ID>>` with the separate SSO app registration's Application (client) ID.

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/teams/v1.24/MicrosoftTeams.schema.json",
  "manifestVersion": "1.24",
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
      "botId": "<<BOT_ID>>",
      "scopes": [
        "personal",
        "groupChat"
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
      "id": "<<SSO_APP_CLIENT_ID>>",
      "resource": "api://<<BASE_URI_DOMAIN>>/botid-<<BOT_ID>>"
  }
}
```

</details>

> [!NOTE]
> During debug, you can use ngrok to test your app in Microsoft Entra ID. In that case, replace the domain in `api://subdomain.example.com/botid-<<BOT_ID>>` with your ngrok domain. Whenever the ngrok domain changes, update the Application ID URI in the SSO app registration, `webApplicationInfo.resource`, and the OAuth connection's **Token Exchange URL** to match. Keep the `botid-<<BOT_ID>>` segment unchanged.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+To+configure+app+manifest&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fbot-sso-manifest%23to-configure-app-manifest&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fbot-sso-manifest.md&documentVersionIndependentId=5f4e812e-2836-0c23-5b4f-e416ae624372&platformId=d090c8ed-5fba-59a0-60b4-d8db1a29b26f&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

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

    The custom app is uploaded. A consent dialog appears to inform you of the permissions that might be required.

1. Select **View permissions** and provide the necessary permissions to authenticate the app.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-bots/bot-consent.png" alt-text="Screenshot shows a bot authentication consent message in Teams." lightbox="../../../assets/images/authentication/teams-sso-bots/bot-consent.png":::

  Teams opens the app and you can use it.

  Congratulations! You've enabled SSO for your bot or message extension app.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Upload+a+custom+app+and+Preview+in+Teams&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fbot-sso-manifest%23upload-a-custom-app-and-preview-in-teams&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fbot-sso-manifest.md&documentVersionIndependentId=5f4e812e-2836-0c23-5b4f-e416ae624372&platformId=d090c8ed-5fba-59a0-60b4-d8db1a29b26f&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## SSO support in Developer Portal

You can import your SSO-enabled app in Developer Portal for Teams. For more information, see [import an existing app](../../../concepts/build-and-test/teams-developer-portal.md#import-an-existing-app). To enable SSO support for your app in Developer Portal after you import it, follow these steps:

1. Go to [Developer Portal](https://dev.teams.microsoft.com/home).

1. Select **Apps**, and from the list that appears, select your app.

1. Go to **Configure** > **Single sign-on**.

1. Under **Application ID URI**, enter the messaging endpoint you configured as the endpoint address in Microsoft Entra ID.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-bots/dev-portal-sso.png" alt-text="Screenshot shows how to configure SSO for an app in Developer Portal." lightbox="../../../assets/images/authentication/teams-sso-bots/dev-portal-sso.png":::

1. Select **Save**.

Developer Portal now supports SSO for your app.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+SSO+support+in+Developer+Portal&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fbot-sso-manifest%23sso-support-in-developer-portal&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fbot-sso-manifest.md&documentVersionIndependentId=5f4e812e-2836-0c23-5b4f-e416ae624372&platformId=d090c8ed-5fba-59a0-60b4-d8db1a29b26f&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)
