---
title: Grant RSC permissions to an app
description: In this article, learn how to grant resource-specific consent (RSC) permissions, which allows team, chat owners, users, and meeting organizers to grant consent for an app.
ms.localizationpriority: medium
author: surbhigupta
ms.author: surbhigupta
ms.topic: reference
ms.date: 03/28/2023
---

# Grant RSC permissions to your app

Resource-specific consent (RSC) is a Microsoft Teams and Microsoft Graph API integration that enables your app to use API endpoints to manage specific resources, either teams, chats, or users within an organization.

In this section, you'll learn to:

1. [Add RSC permissions to your Teams app](#add-rsc-permissions-to-your-teams-app)
1. [Install your app in a team, chat, or user](#install-your-app-in-a-team-chat-or-user)
1. [Verify app RSC permission granted to your app](#verify-app-rsc-permission-granted-to-your-app)

## Add RSC permissions to your Teams app

To add RSC permissions to your app, follow these steps:

1. [Register your app with Microsoft identity platform using the Microsoft Entra admin center](#register-your-app-with-microsoft-identity-platform-using-the-azure-ad-portal).
1. [Update your app manifest (previously called Teams app manifest)](#update-your-app-manifest).

<a name='register-your-app-with-microsoft-identity-platform-using-the-azure-ad-portal'></a>

### Register your app with Microsoft identity platform using the Microsoft Entra admin center

The Microsoft Entra admin center provides a central platform for you to register and configure your apps. You must register your app in the Microsoft Entra admin center to integrate with the identity platform and call Graph APIs. For more information, see [register an app with the identity platform](/graph/auth-register-app-v2).

> [!WARNING]
> You mustn't share your Microsoft Entra app ID across multiple Teams apps. There must be a 1:1 mapping between a Teams app and a Microsoft Entra app. Installing multiple Teams apps associated with the same Microsoft Entra app ID will cause installation or runtime failures.

### Update your app manifest

You must declare RSC permissions in your app **manifest.json** file. You don't need to add the non-RSC permissions to the app manifest as Microsoft Entra admin center stores them.

#### Request RSC permissions for Teams app

To request RSC permissions for an app, list the permissions that the app requires in the authorization section of the app manifest. The instructions can vary based on the app manifest version of the app.

> [!NOTE]
> For delegated permissions, use app manifest v1.12 or later.

Whenever an authorized user installs your app within Teams, the RSC permissions requested in the app’s manifest are shown to the user. The permissions are granted as part of the app installation process.

<br>

<details>

<summary><b>RSC permissions for app manifest v1.12 or later</b></summary>

To add RSC permission in app manifest:

1. Add the [webApplicationInfo](../../resources/schema/manifest-schema.md#webapplicationinfo) key to your app manifest with the following values:

    |Name| Type | Description|
    |---|---|---|
    |`id` |String |Your Microsoft Entra app ID. For more information, see [register your app in the Microsoft Entra admin center](grant-resource-specific-consent.md#register-your-app-with-microsoft-identity-platform-using-the-azure-ad-portal).|
    |`resource`|String| This field has no operation in RSC but you must add a value to avoid an error response. You can add any string as value.|

1. Add permissions needed by your app.

    |Name| Type | Description|
    |---|---|---|
    |`authorization`|Object|List of permissions that the app needs to function. For more information, see [authorization in app manifest](../../resources/schema/manifest-schema.md#authorization). |

    If an app is meant to support installation in both team and chat scopes, then both team and chat permissions can be specified in the same app manifest under `authorization`.

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

Example for RSC permissions for user:

```json
"webApplicationInfo": {
    "id": "XXxxXXXXX-XxXX-xXXX-XXxx-XXXXXXXxxxXX",
    "resource": "https://RscBasedStoreApp"
    },
"authorization": {
    "permissions": {
        "orgWide": []
        "resourceSpecific": [
            {
                "name": "InAppPurchase.Allow.User",
                "type": "Delegated"
            },
            {
                "name": "TeamsActivity.Send.User",
                "type": "Application"
            },
        ]
    }
}
```

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
|`id` |String |Your Microsoft Entra app ID. For more information, see [register your app in the Microsoft Entra admin center](grant-resource-specific-consent.md#register-your-app-with-microsoft-identity-platform-using-the-azure-ad-portal).|
|`resource`|String| This field has no operation in RSC but you must add a value to avoid an error response. You can add any string as value.|
|`applicationPermissions`|Array of strings|RSC permissions for  your app. For more information, see [Supported RSC permissions](resource-specific-consent.md#supported-rsc-permissions).|

If an app is meant to support installation in both team and chat scopes, then both team and chat permissions can be specified in the same app manifest under `applicationPermissions`.

Example for RSC permissions in a team:

```json
"webApplicationInfo": {
    "id": "XXxxXXXXX-XxXX-xXXX-XXxx-XXXXXXXxxxXX",
    "resource": "https://RscBasedStoreApp",
    "applicationPermissions": [
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
    "applicationPermissions": [
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

Example for RSC permissions for a user:

```json
"webApplicationInfo": {
    "id": "XXxxXXXXX-XxXX-xXXX-XXxx-XXXXXXXxxxXX",
    "resource": "https://RscBasedStoreApp",
    "applicationPermissions": [
        "TeamsActivity.Send.User"
    ]
  }
```

<br>
</details>

## Install your app in a team, chat, or user

To install your app on which you've enabled RSC permission in a team, chat, or user, follow these steps:

1. Ensure that you've configured [consent settings](#configure-consent-settings) for team, chat, or user.
1. [Upload your custom app in Teams](#upload-your-custom-app-in-teams).

### Configure consent settings

The tenant-level controls of application RSC permissions vary based on the resource type.

For delegated permissions, any authorized user can consent to the permissions requested by the app.

>[!WARNING]
> From March 2024, the way you manage settings for team and chat RSC permissions will change. The new settings in PowerShell are available during the transition period. These settings will not change for government clouds and we will communicate when the settings change for government clouds.

>[!IMPORTANT]
>The Team RSC managed via PowerShell and Group Owner Consent transition period is anticipated to complete in April 2024.

<b> During the Group Owner Consent & Team RSC transition period </b>
<br>
<details>

<summary><b>Configure group owner consent settings for RSC in a team using the Microsoft Entra admin center [Will be deprecated in April 2024]</b></summary>

>[!IMPORTANT]
>After the transition period, this setting will be deprecated and no longer available for adjustments. After it is deprecated, use the PowerShell cmdlets listed in **Configure team RSC via PowerShell cmdlets** to adjust your team RSC settings.

You can enable or disable group owner consent directly within the Microsoft Entra admin center:

1. Sign in to the [Microsoft Entra admin center](https://portal.azure.com) as a global administrator.
1. Select **Microsoft Entra ID** > **Enterprise apps** > **Consent and permissions** > [**User consent settings**](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ConsentPoliciesMenuBlade/UserSettings).
1. Enable, disable, or limit user consent with the control labeled **Group owner consent for apps accessing data**. By default, **Allow group owner consent for all group owners** is selected. For a team owner to install an app using RSC, enable group owner consent for that user.

    :::image type="content" source="../../assets/images/azure-rsc-team-configuration.png" alt-text="Screenshot shows the Azure RSC team configuration.":::

In addition, you can enable or disable group owner consent using PowerShell. Follow the steps outlined in [Configure group owner consent using PowerShell](/azure/active-directory/manage-apps/configure-user-consent-groups?tabs=azure-powershell).

</details>

<br>
<details>

<summary><b>Configure chat owner consent settings for RSC in a chat using Graph APIs [Will be deprecated in May 2024]</b></summary>

>[!IMPORTANT]
>After the transition period, you must use the PowerShell cmdlets listed in **Configure chat RSC via PowerShell cmdlets** to manage your chat RSC settings.

You can enable or disable RSC for chats using Graph API. The property `isChatResourceSpecificConsentEnabled` in [teamsAppSettings](/graph/api/teamsappsettings-update#example-1-enable-installation-of-apps-that-require-resource-specific-consent-in-chats-meetings) governs whether chat RSC is enabled in the tenant.

:::image type="content" source="../../assets/images/rsc/graph-rsc-chat-configuration.PNG" alt-text="Screenshot shows the Graph RSC team configuration.":::

The default value of the property `isChatResourceSpecificConsentEnabled` is based on whether [user consent settings](/azure/active-directory/manage-apps/configure-user-consent?tabs=azure-portal) is turned on or off in the tenant when RSC for chats is first used. The default value is defined either when:

* [TeamsAppSettings](/graph/api/teamsappsettings-get) are retrieved for the first time.
* Teams app with RSC permissions is installed in a chat or meeting.

> [!NOTE]
> Admin control is added to allow or block RSC settings based on the sensitivity of the accessed data. The control is independent of the org-wide app settings for RSC that allows or blocks RSC permissions for all apps in the tenant.

<br>
</details>

<br>
<details>

<summary><b>Configure user owner consent settings for RSC for a user using the Graph APIs</b></summary>

You can enable or disable RSC for user using Graph API. The property `isUserPersonalScopeResourceSpecificConsentEnabled` in [teamsAppSettings](/graph/api/teamsappsettings-update#example-1-enable-installation-of-apps-that-require-resource-specific-consent-in-chats-meetings) governs whether user RSC is enabled in the tenant.

:::image type="content" source="../../assets/images/rsc/graph-rsc-user-configuration.PNG" alt-text="The screenshot shows the Graph RSC user configuration.":::

The default value of the property `isUserPersonalScopeResourceSpecificConsentEnabled` is based on whether [user consent settings](/azure/active-directory/manage-apps/configure-user-consent?tabs=azure-portal) is turned on or off in the tenant when RSC for user is first used. The default value is defined either when:

* [TeamsAppSettings](/graph/api/teamsappsettings-get) are retrieved for the first time.
* Teams app with RSC permissions is installed for a user.

> [!NOTE]
> Admin control is added to allow or block RSC consent settings based on the sensitivity of the data accessed. It isn't based on the single master switch that enables or disables consent settings for app RSC permissions for all apps in the tenant.

</details>

<br>

<b> After the transition period </b>

Before you manage your team and chat RSC settings with PowerShell, you need to connect PowerShell to your tenant using Microsoft Graph. For more information on managing Microsoft Graph settings with PowerShell, see [get started with the Microsoft Graph PowerShell SDK](/powershell/microsoftgraph/get-started).
You can use the `Connect-MgGraph` cmdlet and connect with the following permissions:

1. `TeamworkAppSettings.ReadWrite.All`
1. `Policy.ReadWrite.Authorization`
1. `Policy.ReadWrite.PermissionGrant`
1. `AppCatalog.Read.All`

The following are the available states for the PowerShell settings and each section shows examples of how to use these states to adjust your settings:

| PowerShell State | Description |
| ---- | ---- |
| ManagedByMicrosoft | This is the default state for all tenants. It allows chat and team RSC permissions to be consented for all users but can be changed at any time at Microsoft's discretion. |
| EnabledForAllApps | Any app requesting RSC permissions can be consented to by users (resource owners) in your tenant. |
| DisabledForAllApps | No RSC permissions can be consented to by users. |

<br>
<details>

<summary><b>Configure team RSC through PowerShell cmdlets</b></summary>
<br>

You can configure which users are allowed to consent to apps accessing their teams' data by using the available PowerShell states, such as ManagedByMicrosoft, EnabledForAllApps, and DisabledForAllApps.
<br>

The following example shows how to enable team RSC for all apps: 
<br>

```powershell
Set-MgBetaTeamRscConfiguration -State EnabledForAllApps
```

</details>
<br>
<details>

<summary><b>Configure chat RSC through PowerShell cmdlets</b></summary>
<br>

You can configure which users are allowed to consent to apps accessing their chats' data by using the available PowerShell states, such as ManagedByMicrosoft, EnabledForAllApps, and DisabledForAllApps.
<br>

The following example shows how to enable chat RSC for all apps: 
<br>

```powershell
Set-MgBetaChatRscConfiguration -State EnabledForAllApps
```

</details>
<br>
<details>

<summary><b>Configure user owner consent settings for RSC for a user using the Graph APIs</b></summary>

You can enable or disable RSC for user using Graph API. The `isUserPersonalScopeResourceSpecificConsentEnabled` property in [teamsAppSettings](/graph/api/teamsappsettings-update#example-1-enable-installation-of-apps-that-require-resource-specific-consent-in-chats-meetings) governs whether user RSC is enabled in the tenant.

:::image type="content" source="../../assets/images/rsc/graph-rsc-user-configuration.PNG" alt-text="The screenshot shows the Graph RSC user configuration.":::

The default value of the `isUserPersonalScopeResourceSpecificConsentEnabled` property is based on whether [user consent settings](/azure/active-directory/manage-apps/configure-user-consent?tabs=azure-portal) is turned on or off in the tenant when RSC for user is first used. The default value is defined either when:

* [TeamsAppSettings](/graph/api/teamsappsettings-get) are retrieved for the first time.
* Teams app with RSC permissions is installed for a user.

> [!NOTE]
> Admin control is added to allow or block RSC consent settings based on the sensitivity of the data accessed. It isn't based on the single master switch that enables or disables consent settings for app RSC permissions for all apps in the tenant.

</details>

<br>

### Upload your custom app in Teams

If your Teams admin allows custom app uploads, you can [upload your custom app](~/concepts/deploy-and-publish/apps-upload.md) directly to a specific team, chat, or user.

## Verify app RSC permission granted to your app

To verify the app RSC permissions, follow these steps:

1. [Obtain an access token from the Microsoft identity platform](#obtain-an-access-token-from-the-microsoft-identity-platform).
1. [Check the RSC permissions granted to a specific resource](#check-the-rsc-permissions-granted-to-a-specific-resource).

### Obtain an access token from the Microsoft identity platform

To make Graph API calls, you must obtain an access token for your app from the identity platform. Before your app can get a token from the identity platform, you must register your app in the Microsoft Entra admin center. The access token contains information about your app and its permissions for the resources and APIs available through Microsoft Graph.

You must have the following values from the Microsoft Entra registration process to retrieve an access token from the identity platform:

* **Application ID**: The app ID assigned by the Microsoft Entra admin center to your app. If your app supports single sign-on (SSO), you must use the same app ID for your app and SSO.
* **Client secret** or **Certificate**: The password for your app, or the public or private key pair that is the certificate. The client secret or certificate isn't required for native apps.
* **Redirect URI**: The URL for your app to receive responses from Microsoft Entra ID.

For more information, see [get access on behalf of a user](/graph/auth-v2-user?view=graph-rest-1.0#3-get-a-token&preserve-view=true) and [get access without a user](/graph/auth-v2-service).

### Check the RSC permissions granted to a specific resource

You can check the type of RSC permission granted to a resource in the app:

* For application RSC permissions, call the following APIs to retrieve the list of apps installed in a team, chat, or user:

  * [List apps in chat](/graph/api/chat-list-installedapps?view=graph-rest-1.0&tabs=http&preserve-view=true)
  * [List apps in team](/graph/api/team-list-installedapps?view=graph-rest-1.0&tabs=http&preserve-view=true)
  * [List apps for user](/graph/api/userteamwork-list-installedapps?view=graph-rest-1.0&tabs=http&preserve-view=true)

  These are all the application RSC permissions granted on this specific resource. Each entry in the list can be correlated to the Teams app by matching the `clientAppId` in the permission grants list with the `webApplicationInfo.Id` property in the app's manifest.

* Delegated RSC permissions are Teams client-only permissions. You can't retrieve the list of apps installed in a team or chat as these permissions are granted when a user interacts with the app.

> [!IMPORTANT]
> The RSC permissions aren't attributed to a user. Calls are made with application permissions, not user delegated permissions. The app can be allowed to perform actions that the user can't, such as deleting a tab. You must review the team owner's or chat owner's intent for your use before making RSC API calls. For more information, see [Microsoft Teams API overview](/graph/teams-concept-overview).

After the app has been installed to a resource, you can use [Microsoft Graph Explorer](https://developer.microsoft.com/graph/graph-explorer) to view the permissions that have been granted to the app in the resource.

#### Check your app for added RSC permissions in a team

1. Get the team's **groupId** from Teams.
1. In Teams, select **Teams** from the left pane.
1. Select the team where the app is to be installed.
1. Select the ellipses &#x25CF;&#x25CF;&#x25CF; for that team.
1. Select **Get link to team** from the dropdown list.
1. Copy and save the **groupId** value from the **Get a link to the team** pop-up dialog.
1. Sign in to **Graph Explorer**.
1. Make a **GET** call to this endpoint: `https://graph.microsoft.com/beta/teams/{teamGroupId}/permissionGrants`.

   The `clientAppId` field in the response must map to the `webApplicationInfo.id` specified in the app manifest.

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

   The `clientAppId` field in the response must map to the `webApplicationInfo.id` specified in the app manifest.

    :::image type="content" source="../../assets/images/chat-graph-permissions.png" alt-text="Screenshot shows the Graph explorer response to GET call for chat RSC permissions.":::

For more information on how to get details of apps installed in a specific chat, see [get the names and other details of apps installed in the specified chat](/graph/api/chat-list-installedapps#example-2-get-the-names-and-other-details-of-apps-installed-in-the-specified-chat).

#### Check your app for added RSC permissions for a user

1. Use the [Get user API](/graph/api/user-get?view=graph-rest-1.0&tabs=http&preserve-view=true). In the request url, pass the user's UPN and from the response body use the `id` field as the user's ID.
1. Sign in to **Graph Explorer**.
1. Make a **GET** call to this endpoint: `https://graph.microsoft.com/beta/users/{user-id}/permissionGrants`.

   Alternatively, you can pass the user's UPN instead of the `user-id`.

   The `clientAppId` field in the response must map to the `webApplicationInfo.id` specified in the Teams app manifest.

    :::image type="content" source="../../assets/images/user-graph-permissions.png" alt-text="Screenshot shows the Graph explorer response to GET call for user RSC permissions.":::

For more information on how to get details of the apps installed for the user, see [get the names and other details of apps installed for the user](/graph/api/userteamwork-list-installedapps?view=graph-rest-1.0&branch=main&tabs=http&preserve-view=true).

## Code sample

| **Sample name** | **Description** | **.NET** |**Node.js** | **App manifest**|
|-----------------|-----------------|----------------|----------------|----------------|
| Resource-Specific Consent (RSC) | This sample code describes the process to use RSC to call Graph APIs. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/graph-rsc/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/graph-rsc/nodeJs)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/graph-rsc/csharp/demo-manifest/graph-rsc.zip)|

## See also

* [Test resource-specific consent permissions in Teams](test-resource-specific-consent.md)
* [Resource-specific consent in Microsoft Teams for admins](/MicrosoftTeams/resource-specific-consent)
* [Group owner consent](/azure/active-directory/manage-apps/configure-user-consent-groups?tabs=azure-portal)
* [Global Administrator](/azure/active-directory/roles/permissions-reference#global-administrator&preserve-view=true)
* [List permissionGrants of a user](/graph/api/user-list-permissiongrants?view=graph-rest-beta&preserve-view=true)
* [Send notification to a user](/graph/api/userteamwork-sendactivitynotification?view=graph-rest-beta&tabs=http&preserve-view=true)
* [Messages in bot conversations](~/bots/how-to/conversations/conversation-messages.md)
