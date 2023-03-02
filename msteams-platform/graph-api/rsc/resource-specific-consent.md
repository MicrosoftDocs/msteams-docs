---
title: Grant RSC permissions to an app
description: Learn about supported granular resource-specific consent (RSC) permissions, which allows team and chat owners and meeting organizers to grant consent for an application.
ms.localizationpriority: medium
author: akjo
ms.author: lajanuar
ms.topic: reference
---

# Grant RSC permissions to an app

Introduction to be added.

## Add RSC permissions to your Teams application

1. [Register your app with Microsoft identity platform](#register-your-app-with-microsoft-identity-platform-using-the-azure-ad-portal).
1. [Add application RSC permissions to your app registered with Microsoft identity platform](#review-your-application-permissions-in-the-azure-ad-portal).
1. [Add application and delegated RSC permission to your app manifest](#update-your-teams-app-manifest).

### Register your app with Microsoft identity platform using the Azure AD portal

The Azure AD portal provides a central platform for you to register and configure your apps. Your app must be registered in the Azure AD portal to integrate with the identity platform and call Microsoft Graph APIs. For more information, see [register an application with the identity platform](/graph/auth-register-app-v2).

> [!WARNING]
> An Azure AD app ID must not be shared across multiple Teams apps. There must be a 1:1 mapping between a Teams app and an Azure AD app. Attempts to install multiple Teams apps which are associated with the same Azure AD app ID will cause installation or runtime failures.

### Review your application permissions in the Azure AD portal

1. Go to the **Home** > **App registrations** page and select your RSC app.
1. Choose **API permissions** from the left pane and go through the list of **Configured permissions** for your app. If your app only makes RSC Graph API calls, delete all the permissions on that page. If your app also makes non-RSC calls, keep those permissions as required.

> [!IMPORTANT]
> The Azure AD portal can't be used to request RSC permissions. RSC permissions are currently exclusive to Teams applications installed in the Teams client and are declared in the Teams app manifest (JSON) file.

### Update your Teams app manifest

You must declare RSC permissions in your app **manifest.json** file.

> [!IMPORTANT]
> Non-RSC permissions are stored in the Azure portal. Don't add them to the app manifest.

#### Request RSC permissions for Teams app

To request RSC permissions for an app, list the permissions that the app requires in the authorization section of the Teams app's manifest. The instructions can differ based on the manifest version of the app.

> [!NOTE]
> For delegated permissions, use app manifest version 1.12 or later.

<br>

<details>

<summary><b>RSC permissions for app manifest version 1.12 or later</b></summary>

Add a [webApplicationInfo](../../resources/schema/manifest-schema.md#webapplicationinfo) key to your app manifest with the following values:

|Name| Type | Description|
|---|---|---|
|`id` |String |Your Azure AD app ID. For more information, see [register your app in the Azure AD portal](resource-specific-consent.md#register-your-app-with-microsoft-identity-platform-using-the-azure-ad-portal).|
|`resource`|String| This field has no operation in RSC but must be added and must have a value to avoid an error response; any string will do.|

Specify permissions needed by the app.

|Name| Type | Description|
|---|---|---|
|`authorization`|Object|List of permissions that the app needs to function. For more information, see [authorization in manifest](../../resources/schema/manifest-schema.md#authorization).

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

<summary><b>RSC permissions for app manifest version 1.11 or earlier</b></summary>

> [!NOTE]
> It is recommended to use app manifest version 1.12 or later.

Add a [webApplicationInfo](../../resources/schema/manifest-schema.md#webapplicationinfo) key to your app manifest with the following values:

|Name| Type | Description|
|---|---|---|
|`id` |String |Your Azure AD app ID. For more information, see [register your app in the Azure AD portal](resource-specific-consent.md#register-your-app-with-microsoft-identity-platform-using-the-azure-ad-portal).|
|`resource`|String| This field has no operation in RSC but must be added and have a value to avoid an error response; any string will do.|
|`applicationPermissions`|Array of strings|RSC permissions for  your app. For more information, see [Supported RSC permissions](rsc-overview.md#supported-rsc-permissions).|

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

> [!NOTE]
> If an app is meant to support installation in both team and chat scopes, then both team and chat permissions can be specified in the same manifest under `applicationPermissions`.

<br>
</details>

Whenever an app is installed by an authorized user within Teams, the RSC permissions requested in the app’s manifest are shown to the user and consequently granted as part of the app installation process.

## Verify application RSC permission granted to your app

To verify the application RSC permissions, follow these steps:

1. Ensure that you've configured [consent settings](#configure-consent-settings) for team or chat.
1. [Install your app in Teams](#sideload-your-app-in-teams).
1. [Obtain an access token from the identity platform](#obtain-an-access-token-from-the-microsoft-identity-platform).
1. [Check the RSC permissions granted to a specific resource](#check-the-rsc-permissions-granted-to-a-specific-resource).

### Configure consent settings

The tenant-level controls of app-only RSC permissions differ based on resource type.

For delegated permissions, any authorized user can consent to the permissions requested by the app.

<br>
<details>

<summary><b>Configure group owner consent settings for RSC in a team using the Azure AD portal</b></summary>

You can enable or disable [group owner consent](/azure/active-directory/manage-apps/configure-user-consent-groups?tabs=azure-portal) directly within the Microsoft Azure portal:

1. Sign in to the [Azure portal](https://portal.azure.com) as a [Global Administrator](/azure/active-directory/roles/permissions-reference#global-administrator&preserve-view=true).
1. Select **Azure Active Directory** > **Enterprise applications** > **Consent and permissions** > [**User consent settings**](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ConsentPoliciesMenuBlade/UserSettings).
1. Enable, disable, or limit user consent with the control labeled **Group owner consent for apps accessing data**. The default is **Allow group owner consent for all group owners**. For a team owner to install an app using RSC, group owner consent must be enabled for that user.

    :::image type="content" source="../../assets/images/azure-rsc-team-configuration.png" alt-text="Screenshot shows the Azure RSC team configuration.":::

In addition, you can enable or disable group owner consent using PowerShell, follow the steps outlined in [Configure group owner consent using PowerShell](/azure/active-directory/manage-apps/configure-user-consent-groups?tabs=azure-powershell).

<br>
</details>

<br>
<details>

<summary><b>Configure chat owner consent settings for RSC in a chat using the Microsoft Graph APIs</b></summary>

You can enable or disable RSC for chats using Graph API. The property `isChatResourceSpecificConsentEnabled` in [teamsAppSettings](/graph/api/teamsappsettings-update#example-1-enable-installation-of-apps-that-require-resource-specific-consent-in-chats-meetings) governs whether chat RSC is enabled in the tenant.
    :::image type="content" source="../../assets/images/rsc/graph-rsc-chat-configuration.PNG" alt-text="Screenshot shows the Graph RSC team configuration.":::

The default value of the property `isChatResourceSpecificConsentEnabled` is based on whether [user consent settings](/azure/active-directory/manage-apps/configure-user-consent?tabs=azure-portal) is turned on or off in the tenant when RSC for chats is first used. This can be the first time retrieving [teamsAppSettings](/graph/api/teamsappsettings-get) or installing a Teams app with RSC permissions in a chat or meeting.

> [!NOTE]
> Admin control will be added to allow or block RSC consent settings per app based on the sensitivity of the data being accessed instead of the current single master switch that enables or disables consent settings for app-only RSC permissions for all apps in the tenant.

<br>
</details>

### Obtain an access token from the Microsoft identity platform

To make Graph API calls, you must obtain an access token for your app from the identity platform. Before your app can get a token from the identity platform, it must be registered in the Azure AD portal. The access token contains information about your app and the permissions it has for the resources and APIs available through Microsoft Graph.

You must have the following values from the Azure AD registration process to retrieve an access token from the identity platform:

* The **Application ID** assigned by the app registration portal. If your app supports single sign-on (SSO), you must use the same Application ID for your app and SSO.
* The **Client secret/password** or a public or private key pair that is **Certificate**. This isn't required for native apps.
* A **Redirect URI** or reply URL for your app to receive responses from Azure AD.

For more information, see [get access on behalf of a user](/graph/auth-v2-user?view=graph-rest-1.0#3-get-a-token&preserve-view=true) and [get access without a user](/graph/auth-v2-service).

### Sideload your app in Teams

If your Teams admin allows custom app uploads, you can [sideload your app](~/concepts/deploy-and-publish/apps-upload.md) directly to a specific team or chat.

### Check the RSC permissions granted to a specific resource

> [!IMPORTANT]
> The RSC permissions are not attributed to a user. Calls are made with app permissions, not user delegated permissions. The app can be allowed to perform actions that the user can't, such as deleting a tab. You must review the team owner's or chat owner's intent for your use before making RSC API calls. For more information, see [Microsoft Teams API overview](/graph/teams-concept-overview).

For application RSC permissions, call the following APIs to retrieve the list of apps installed in a team or chat:

* [List apps in chat](/graph/api/chat-list-installedapps?view=graph-rest-1.0&tabs=http&preserve-view=true)
* [List apps in team](/graph/api/team-list-installedapps?view=graph-rest-1.0&tabs=http&preserve-view=true)

These are all the application RSC permissions granted on this specific resource. Each entry in the list can be correlated to the Teams app by matching the `clientAppId` in the permission grants list with the `webApplicationInfo.Id` property in the app's manifest.

Delegated RSC permissions are Teams client-only permissions, and you can't retrieve the list of apps installed in a team or chat as these permissions are granted when a user interacts with the app.

After the app has been installed to a resource, you can use [Microsoft Graph Explorer](https://developer.microsoft.com/graph/graph-explorer) to view the permissions that have been granted to the app in the resource.

<br>
<details>

<summary><b>Check your app for added RSC permissions in a team</b></summary>

1. Get the team's **groupId** from Teams.
1. In Teams, select **Teams** from the left pane.
1. Select the team where the app is to be installed.
1. Select the ellipses &#x25CF;&#x25CF;&#x25CF; for that team.
1. Select **Get link to team** from the team dropdown menu.
1. Copy and save the **groupId** value from the **Get a link to the team** pop-up dialog.
1. Sign in to **Graph Explorer**.
1. Make a **GET** call to this endpoint: `https://graph.microsoft.com/beta/teams/{teamGroupId}/permissionGrants`. The `clientAppId` field in the response will map to the `webApplicationInfo.id` specified in the Teams app manifest.

    :::image type="content" source="../../assets/images/team-graph-permissions.png" alt-text="Screenshot shows the Graph explorer response to GET call for team RSC permissions.":::

For more information on how to get details of the apps installed in a specific team, see [get the names and other details of apps installed in the specified team](/graph/api/team-list-installedapps#example-2-get-the-names-and-other-details-of-installed-apps).

<br>
</details>

<br>
<details>

<summary><b>Check your app for added RSC permissions in a chat</b></summary>

1. Get the chat thread ID from the Teams web client.
1. In the Teams web client, select **Chat** from the left pane.
1. Select the chat where the app is installed from the dropdown menu.
1. Copy the web URL and save the chat thread ID from the string.

    :::image type="content" source="../../assets/images/chat-thread-id.png" alt-text="Screenshot shows the Chat thread ID from web URL.":::

1. Sign in to **Graph Explorer**.
1. Make a **GET** call to the following endpoint: `https://graph.microsoft.com/beta/chats/{chatId}/permissionGrants`. The `clientAppId` field in the response will map to the `webApplicationInfo.id` specified in the Teams app manifest.

    :::image type="content" source="../../assets/images/chat-graph-permissions.png" alt-text="Screenshot shows the Graph explorer response to GET call for chat RSC permissions.":::

For more information on how to get details of apps installed in a specific chat, see [get the names and other details of apps installed in the specified chat](/graph/api/chat-list-installedapps#example-2-get-the-names-and-other-details-of-apps-installed-in-the-specified-chat).

<br>
</details>

## Code sample

| **Sample name** | **Description** | **.NET** |**Node.js** | **Manifest**|
|-----------------|-----------------|----------------|----------------|----------------|
| Resource-Specific Consent (RSC) | Use RSC to call Graph APIs. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/graph-rsc/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/graph-rsc/nodeJs)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/graph-rsc/csharp/demo-manifest/graph-rsc.zip)|

## See also

* [Test resource-specific consent permissions in Teams](test-resource-specific-consent.md)
* [Resource-specific consent in Microsoft Teams for admins](/MicrosoftTeams/resource-specific-consent)
