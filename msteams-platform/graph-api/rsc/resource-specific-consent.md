---
title: Grant RSC permissions to an app
description: In this article, learn how to grant resource-specific consent (RSC) permissions, which allows team and chat owners and meeting organizers to grant consent for an app.
ms.localizationpriority: medium
author: surbhigupta
ms.author: surbhigupta
ms.topic: reference
---

# Grant RSC permissions to an app

Resource-specific consent (RSC) is a Microsoft Teams and Microsoft Graph API integration that enables your app to use API endpoints to manage specific resources, either teams or chats, within an organization.

In this section, you'll learn more about:

1. [Add RSC permissions to your Teams app](#add-rsc-permissions-to-your-teams-app)
1. [Verify app RSC permission granted to your app](#verify-app-rsc-permission-granted-to-your-app)

## Add RSC permissions to your Teams app

To configure RSC permissions to your app, follow these steps:

1. [Register your app with Microsoft identity platform using the Azure AD portal](#register-your-app-with-microsoft-identity-platform-using-the-azure-ad-portal).
1. [Review your application permissions in the Azure AD portal](#review-your-application-permissions-in-the-azure-ad-portal).
1. [Update your Teams app manifest](#update-your-teams-app-manifest).

### Register your app with Microsoft identity platform using the Azure AD portal

The Azure Active Directory (Azure AD) portal provides a central platform for you to register and configure your apps. You must register your app in the Azure AD portal to integrate with the identity platform and call Graph APIs. For more information, see [register an app with the identity platform](/graph/auth-register-app-v2).

> [!WARNING]
> You mustn't share your Azure AD app ID across multiple Teams apps. There must be a 1:1 mapping between a Teams app and an Azure AD app. Attempts to install multiple Teams apps which are associated with the same Azure AD app ID will cause installation or runtime failures.

### Review your application permissions in the Azure AD portal

1. Open the [Azure AD portal](https://ms.portal.azure.com/) on your web browser.

   The Azure AD portal page opens.
1. Select **App registrations** and select your app.
1. Select **API permissions** from the left pane and go through the list of **Configured permissions** for your app.

   If your app makes only RSC Graph API calls, delete all the permissions on that page. If your app makes non-RSC calls also, keep those permissions as required.

> [!IMPORTANT]
> The Azure AD portal can't be used to request RSC permissions, as they're exclusive to Teams apps installed in Teams client and are declared in the Teams app manifest (JSON) file.

### Update your Teams app manifest

You must declare RSC permissions in your Teams app **manifest.json** file.

> [!IMPORTANT]
> You don't need to add the non-RSC permissions to the app manifest as Azure AD portal stores them.

#### Request RSC permissions for Teams app

To request RSC permissions for an app, list the permissions that the app requires in the authorization section of the Teams app manifest. The instructions can vary based on the manifest version of the app.

> [!NOTE]
> For delegated permissions, use app manifest v1.12 or later.

Whenever an authorized user installs your app within Teams, the RSC permissions requested in the app’s manifest are shown to the user and granted as part of the app installation process.

<br>

<details>

<summary><b>RSC permissions for app manifest v1.12 or later</b></summary>

To add RSC permission in app manifest:

1. Add the [webApplicationInfo](../../resources/schema/manifest-schema.md#webapplicationinfo) key to your app manifest with the following values:

    |Name| Type | Description|
    |---|---|---|
    |`id` |String |Your Azure AD app ID. For more information, see [register your app in the Azure AD portal](resource-specific-consent.md#register-your-app-with-microsoft-identity-platform-using-the-azure-ad-portal).|
    |`resource`|String| This field has no operation in RSC but you must add a value to avoid an error response. You can add any string as value.|

1. Specify permissions needed by your app.

    |Name| Type | Description|
    |---|---|---|
    |`authorization`|Object|List of permissions that the app needs to function. For more information, see [authorization in manifest](../../resources/schema/manifest-schema.md#authorization). |

Example for RSC permissions in a team:

```json
"webApplicationInfo": {
    "id": "XXxxXXXXX-XxXX-xXXX-XXxx-XXXXXXXxxxXX",
    "resource": "https://RscBasedStoreApp"
    },
"authorization": {
    "permissions": {
        "resourceSpecific": [
            {
                "name": "TeamSettings.Read.Group",
                "type": "Application"
            },
            {
                "name": "TeamSettings.ReadWrite.Group",
                "type": "Application"
            },
            {
                "name": "ChannelSettings.Read.Group",
                "type": "Application"
            },
            {
                "name": "ChannelSettings.ReadWrite.Group",
                "type": "Application"
            },
            {
                "name": "Channel.Create.Group",
                "type": "Application"
            },
            {
                "name": "Channel.Delete.Group",
                "type": "Application"
            },
            {
                "name": "ChannelMessage.Read.Group",
                "type": "Application"
            },
            {
                "name": "TeamsAppInstallation.Read.Group",
                "type": "Application"
            },
            {
                "name": "TeamsTab.Read.Group",
                "type": "Application"
            },
            {
                "name": "TeamsTab.Create.Group",
                "type": "Application"
            },
            {
                "name": "TeamsTab.ReadWrite.Group",
                "type": "Application"
            },
            {
                "name": "TeamsTab.Delete.Group",
                "type": "Application"
            },
            {
                "name": "TeamMember.Read.Group",
                "type": "Application"
            },
            {
                "name": "TeamsActivity.Send.Group",
                "type": "Application"
            },
            {
              "name": "ChannelMeeting.ReadBasic.Group",
              "type": "Delegated"
            },
            {
              "name": "ChannelMeetingParticipant.Read.Group",
              "type": "Delegated"
            },
            {
              "name": "ChannelMeetingStage.Write.Group",
              "type": "Delegated"
            }
        ]
    }
}
```

Example for RSC permissions in a chat:

```json
"webApplicationInfo": {
    "id": "XXxxXXXXX-XxXX-xXXX-XXxx-XXXXXXXxxxXX",
    "resource": "https://RscBasedStoreApp"
    },
"authorization": {
    "permissions": {
        "resourceSpecific": [
            {
                "name": "ChatSettings.Read.Chat",
                "type": "Application"
            },
            {
                "name": "ChatSettings.ReadWrite.Chat",
                "type": "Application"
            },
            {
                "name": "ChatMessage.Read.Chat",
                "type": "Application"
            },
            {
                "name": "ChatMember.Read.Chat",
                "type": "Application"
            },
            {
                "name": "Chat.Manage.Chat",
                "type": "Application"
            },
            {
                "name": "TeamsTab.Read.Chat",
                "type": "Application"
            },
            {
                "name": "TeamsTab.Create.Chat",
                "type": "Application"
            },
            {
                "name": "TeamsTab.Delete.Chat",
                "type": "Application"
            },
            {
                "name": "TeamsTab.ReadWrite.Chat",
                "type": "Application"
            },
            {
                "name": "TeamsAppInstallation.Read.Chat",
                "type": "Application"
            },
            {
                "name": "OnlineMeeting.ReadBasic.Chat",
                "type": "Application"
            },
            {
                "name": "Calls.AccessMedia.Chat",
                "type": "Application"
            },
            {
                "name": "Calls.JoinGroupCalls.Chat",
                "type": "Application"
            },
            {
                "name": "TeamsActivity.Send.Chat",
                "type": "Application"
            },
            {
                "name": "MeetingStage.Write.Chat",
                "type": "Delegated"
            }
        ]
    }
}
```

> [!NOTE]
> If an app is meant to support installation in both team and chat scopes, then both team and chat permissions can be specified in the same manifest under `authorization`.

<br>
</details>

<br>
<details>

<summary><b>RSC permissions for app manifest v1.11 or earlier</b></summary>

> [!NOTE]
> It's recommended to use app manifest v1.12 or later.

Add the [webApplicationInfo](../../resources/schema/manifest-schema.md#webapplicationinfo) key to your app manifest with the following values:

|Name| Type | Description|
|---|---|---|
|`id` |String |Your Azure AD app ID. For more information, see [register your app in the Azure AD portal](resource-specific-consent.md#register-your-app-with-microsoft-identity-platform-using-the-azure-ad-portal).|
|`resource`|String| This field has no operation in RSC but you must add a value to avoid an error response. You can add any string as value.|
|`applicationPermissions`|Array of strings|RSC permissions for  your app. For more information, see [Supported RSC permissions](rsc-overview.md#supported-rsc-permissions).|

Example for RSC permissions in a team:

```json
"webApplicationInfo": {
    "id": "XXxxXXXXX-XxXX-xXXX-XXxx-XXXXXXXxxxXX",
    "resource": "https://RscBasedStoreApp",
    "appPermissions": [
        "TeamSettings.Read.Group",
        "TeamSettings.ReadWrite.Group",
        "ChannelSettings.Read.Group",
        "ChannelSettings.ReadWrite.Group",
        "Channel.Create.Group",
        "Channel.Delete.Group",
        "ChannelMessage.Read.Group",
        "TeamsAppInstallation.Read.Group",
        "TeamsTab.Read.Group",
        "TeamsTab.Create.Group",
        "TeamsTab.ReadWrite.Group",
        "TeamsTab.Delete.Group",
        "TeamMember.Read.Group",
        "TeamsActivity.Send.Group"
    ]
  }
```

Example for RSC permissions in a chat:

```json
"webApplicationInfo": {
    "id": "XXxxXXXXX-XxXX-xXXX-XXxx-XXXXXXXxxxXX",
    "resource": "https://RscBasedStoreApp",
    "appPermissions": [
        "ChatSettings.Read.Chat",
        "ChatSettings.ReadWrite.Chat",
        "ChatMessage.Read.Chat",
        "ChatMember.Read.Chat",
        "Chat.Manage.Chat",
        "TeamsTab.Read.Chat",
        "TeamsTab.Create.Chat",
        "TeamsTab.Delete.Chat",
        "TeamsTab.ReadWrite.Chat",
        "TeamsAppInstallation.Read.Chat",
        "OnlineMeeting.ReadBasic.Chat",
        "Calls.AccessMedia.Chat",
        "Calls.JoinGroupCalls.Chat",
        "TeamsActivity.Send.Chat"
    ]
  }
```

> [!NOTE]
> If an app is meant to support installation in both team and chat scopes, then both team and chat permissions can be specified in the same manifest under `appPermissions`.

<br>
</details>

## Verify app RSC permission granted to your app

To verify the app RSC permissions, follow these steps:

1. Ensure that you've configured [consent settings](#configure-consent-settings) for team or chat.
1. [Sideload your app in Teams](#sideload-your-app-in-teams).
1. [Obtain an access token from the Microsoft identity platform](#obtain-an-access-token-from-the-microsoft-identity-platform).
1. [Check the RSC permissions granted to a specific resource](#check-the-rsc-permissions-granted-to-a-specific-resource).

### Configure consent settings

The tenant-level controls of app-only RSC permissions vary based on the resource type.

For delegated permissions, any authorized user can consent to the permissions requested by the app.

<br>
<details>

<summary><b>Configure group owner consent settings for RSC in a team using the Azure AD portal</b></summary>

You can enable or disable group owner consent directly within the Azure AD portal:

1. Sign in to the [Azure AD portal](https://portal.azure.com) as a global administrator.
1. Select **Azure Active Directory** > **Enterprise apps** > **Consent and permissions** > [**User consent settings**](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ConsentPoliciesMenuBlade/UserSettings).
1. Enable, disable, or limit user consent with the control labeled **Group owner consent for apps accessing data**. By default, **Allow group owner consent for all group owners** is selected. For a team owner to install an app using RSC, enable group owner consent for that user.

    :::image type="content" source="../../assets/images/azure-rsc-team-configuration.png" alt-text="Screenshot shows the Azure RSC team configuration.":::

In addition, you can enable or disable group owner consent using PowerShell. Follow the steps outlined in [Configure group owner consent using PowerShell](/azure/active-directory/manage-apps/configure-user-consent-groups?tabs=azure-powershell).

</details>

<br>
<details>

<summary><b>Configure chat owner consent settings for RSC in a chat using the Graph APIs</b></summary>

You can enable or disable RSC for chats using Graph API. The property `isChatResourceSpecificConsentEnabled` in [teamsAppSettings](/graph/api/teamsappsettings-update#example-1-enable-installation-of-apps-that-require-resource-specific-consent-in-chats-meetings) governs whether chat RSC is enabled in the tenant.

:::image type="content" source="../../assets/images/rsc/graph-rsc-chat-configuration.PNG" alt-text="Screenshot shows the Graph RSC team configuration.":::

The default value of the property `isChatResourceSpecificConsentEnabled` is based on whether [user consent settings](/azure/active-directory/manage-apps/configure-user-consent?tabs=azure-portal) is turned on or off in the tenant when RSC for chats is first used. The default value is defined either when:

* [TeamsAppSettings](/graph/api/teamsappsettings-get) are retrieved for the first time.
* Teams app with RSC permissions is installed in a chat or meeting.

> [!NOTE]
> Admin control is added to allow or block RSC consent settings based on the sensitivity of the data accessed. It isn't based on the single master switch that enables or disables consent settings for app RSC permissions for all apps in the tenant.

<br>
</details>

### Sideload your app in Teams

If your Teams admin allows custom app uploads, you can [sideload your app](~/concepts/deploy-and-publish/apps-upload.md) directly to a specific team or chat.

### Obtain an access token from the Microsoft identity platform

To make Graph API calls, you must obtain an access token for your app from the identity platform. Before your app can get a token from the identity platform, it must be registered in the Azure AD portal. The access token contains information about your app and the permissions it has for the resources and APIs available through Microsoft Graph.

You must have the following values from the Azure AD registration process to retrieve an access token from the identity platform:

* **Application ID**: The app ID assigned by the Azure AD portal to your app. If your app supports single sign-on (SSO), you must use the same app ID for your app and SSO.
* **Client secret** or **Certificate**: The password for your app, or the public or the private key pair that is the certificate. This isn't required for native apps.
* **Redirect URI**: The URL for your app to receive responses from Azure AD.

For more information, see [get access on behalf of a user](/graph/auth-v2-user?view=graph-rest-1.0#3-get-a-token&preserve-view=true) and [get access without a user](/graph/auth-v2-service).

### Check the RSC permissions granted to a specific resource

You can check the type of RSC permission granted to a resource in the app:

* For application RSC permissions, call the following APIs to retrieve the list of apps installed in a team or chat:

  * [List apps in chat](/graph/api/chat-list-installedapps?view=graph-rest-1.0&tabs=http&preserve-view=true)
  * [List apps in team](/graph/api/team-list-installedapps?view=graph-rest-1.0&tabs=http&preserve-view=true)

  These are all the app RSC permissions granted on this specific resource. Each entry in the list can be correlated to the Teams app by matching the `clientAppId` in the permission grants list with the `webApplicationInfo.Id` property in the app's manifest.

* Delegated RSC permissions are Teams client-only permissions. You can't retrieve the list of apps installed in a team or chat as these permissions are granted when a user interacts with the app.

> [!IMPORTANT]
> The RSC permissions aren't attributed to a user. Calls are made with application permissions, not user delegated permissions. The app can be allowed to perform actions that the user can't, such as deleting a tab. You must review the team owner's or chat owner's intent for your use before making RSC API calls. For more information, see [Microsoft Teams API overview](/graph/teams-concept-overview).

After the app has been installed to a resource, you can use [Microsoft Graph Explorer](https://developer.microsoft.com/graph/graph-explorer) to view the permissions that have been granted to the app in the resource.

#### Check your app for added RSC permissions in a team

1. Get the team's **groupId** from Teams.
1. In Teams, select **Teams** from the left pane.
1. Select the team where the app is to be installed.
1. Select the ellipses &#x25CF;&#x25CF;&#x25CF; for that team.
1. Select **Get link to team** from the team dropdown list.
1. Copy and save the **groupId** value from the **Get a link to the team** pop-up dialog.
1. Sign in to **Graph Explorer**.
1. Make a **GET** call to this endpoint: `https://graph.microsoft.com/beta/teams/{teamGroupId}/permissionGrants`.

   The `clientAppId` field in the response must map to the `webApplicationInfo.id` specified in the Teams app manifest.

    :::image type="content" source="../../assets/images/team-graph-permissions.png" alt-text="Screenshot shows the Graph explorer response to GET call for team RSC permissions.":::

For more information on how to get details of the apps installed in a specific team, see [get the names and other details of apps installed in the specified team](/graph/api/team-list-installedapps#example-2-get-the-names-and-other-details-of-installed-apps).

#### Check your app for added RSC permissions in a chat

1. Get the chat thread ID from the Teams web client.
1. In the Teams web client, select **Chat** from the left pane.
1. Select the chat where you've installed the app from the dropdown list.
1. Copy the web URL and save the chat thread ID from the string.

    :::image type="content" source="../../assets/images/chat-thread-id.png" alt-text="Screenshot shows the Chat thread ID from web URL.":::

1. Sign in to **Graph Explorer**.
1. Make a **GET** call to the following endpoint: `https://graph.microsoft.com/beta/chats/{chatId}/permissionGrants`.

   The `clientAppId` field in the response must map to the `webApplicationInfo.id` specified in the Teams app manifest.

    :::image type="content" source="../../assets/images/chat-graph-permissions.png" alt-text="Screenshot shows the Graph explorer response to GET call for chat RSC permissions.":::

For more information on how to get details of apps installed in a specific chat, see [get the names and other details of apps installed in the specified chat](/graph/api/chat-list-installedapps#example-2-get-the-names-and-other-details-of-apps-installed-in-the-specified-chat).

## Code sample

| **Sample name** | **Description** | **.NET** |**Node.js** | **Manifest**|
|-----------------|-----------------|----------------|----------------|----------------|
| Resource-Specific Consent (RSC) | This sample code describes the process to use RSC to call Graph APIs. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/graph-rsc/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/graph-rsc/nodeJs)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/graph-rsc/csharp/demo-manifest/graph-rsc.zip)|

## See also

* [Test resource-specific consent permissions in Teams](test-resource-specific-consent.md)
* [Resource-specific consent in Microsoft Teams for admins](/MicrosoftTeams/resource-specific-consent)
* [Group owner consent](/azure/active-directory/manage-apps/configure-user-consent-groups?tabs=azure-portal)
* [Global Administrator](/azure/active-directory/roles/permissions-reference#global-administrator&preserve-view=true)
