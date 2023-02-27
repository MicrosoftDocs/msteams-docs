---
title: Enable resource-specific consent in Teams
description: Learn about supported granular resource-specific consent (RSC) permissions, which allows team and chat owners and meeting organizers to grant consent for an application.
ms.localizationpriority: medium
author: akjo
ms.author: lajanuar
ms.topic: reference
---

# Resource-specific consent

Resource-specific consent (RSC) is an authorization framework built by Microsoft Teams and Microsoft identity that allows for granting scoped access to an application.

Through RSC, an authorized user can give an application access to the data of a specific instance of a resource type instead of every instance in the entire tenant. For example, a person who owns both team A and team B can decide to give the data for the Contoso app to only team A and not team B. The same concept of scoped data access applies to chats and meetings.

> [!NOTE]
> If a chat has a meeting or a call associated with it, then the relevant RSC permissions apply to those resources as well.

## Types of RSC permissions

RSC permission determines which data access methods are allowed by an application. There are two types of RSC permissions:

* **Application**: Allows an app to access data without the user being signed in.
* **Delegated**: Allows an app to access data only on behalf of a signed-in user. No access is allowed in the absence of a signed-in user.

> [!NOTE]
> Application RSC permissions for chat scope are available in [public developer preview](../../resources/dev-preview/developer-preview-intro.md) only.

### RSC permissions for different resources

RSC permissions are available on the following different resource types:

* [Team](#rsc-permissions-for-a-team) (includes the channels within a team)
* [Chat or meeting](#rsc-permissions-for-a-chat-or-meeting) (includes the meetings associated with the chats)
* [User](#rsc-permissions-for-a-user)

### API that supports RSC-based data access

Microsoft Graph SDK, Microsoft Bot Framework SDK, and Microsoft TeamsJS client library support fine-grained data access through RSC. The supported modes and resource types differ across the API surfaces.

| RSC mode or type | Supported SDKs | App manifest version | Resource types | RSC-related controls for the entire tenant | Who can consent to RSC permissions? |
|---------|---------|---------|---------|---------|---------|
|Application| Microsoft Graph, Microsoft Bot Framework | >=1.6 | Teams, chats, and meetings | Microsoft Graph-based controls for chats and meetings, Azure Active Directory (Azure AD) portal-based controls for teams. |• In a team, any team owner. <br> • In a chat, any chat member. <br> • In a meeting, any meeting organizer or presenter. |
| Delegated | Microsoft Teams Client | >=1.12 | Teams, chats, meetings, and users | Always on | Any user authorized to install an app in that specific scope. |

## Update your Teams app manifest

The RSC permissions are declared in your app's manifest.json file.

> [!IMPORTANT]
> Non-RSC permissions are stored in the Azure portal. Don't add them to the app manifest.

### Request RSC permissions for Teams app

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
|`applicationPermissions`|Array of strings|RSC permissions for  your app. For more information, see [Supported RSC permissions](#supported-rsc-permissions).|

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

## Grant RSC permissions to an app

Users' ability to grant RSC permissions varies based on resource types and access modes. The following are the types of RSC permissions for an app:

* **Application context RSC permissions**: Users authorized to install an app in a specific scope have the right to grant any RSC permissions requested by the app in that specific scope. In addition to installing apps in a specific scope, the following constraints apply for the user to grant RSC permission to access data in app-only mode:
  * In the case of a team, the user must be an owner of that team.
  * In the case of a chat, the user must be a member of the chat.
  * In the case of meetings, the user must be an organizer or presenter in the meeting.
* **Delegated context RSC permissions**: Any user authorized to install an app in a specific scope has the right to grant any RSC permissions requested by the app in that specific scope at the time of installation. For example, if regular members are allowed to install an app inside a team, then they also have the authority to grant delegated RSC permission to the app in that specific team.

If you're a global admin, you can review and grant consent to the apps that request permissions on behalf of all users in your organization. You do this so that users don't have to review and accept the permissions requested by the app when they open it. For more information, see [view app permissions and grant admin consent in Teams admin center](/microsoftteams/app-permissions-admin-center).

## Add RSC permissions to your Teams application

1. [Register your app with Microsoft identity platform using the Azure AD portal](#register-your-app-with-microsoft-identity-platform-using-the-azure-ad-portal).
1. [Add application and delegated RSC permission to your app manifest](#update-your-teams-app-manifest).
1. [Review your application permissions in the Azure AD portal](#review-your-application-permissions-in-the-azure-ad-portal).

## Verify application RSC permission granted to your app

### Prerequisite

1. [Configure consent settings](#configure-consent-settings).
    * Configure group owner consent settings for RSC in a team using the Azure AD portal.
    * Configure chat owner consent settings for RSC in a chat using the Microsoft Graph APIs.

To verify the application RSC permissions, follow these steps:

1. [Install your app in Teams](#sideload-your-app-in-teams).
1. [Obtain an access token from the identity platform](#obtain-an-access-token-from-the-microsoft-identity-platform).
1. [Check the RSC permissions granted to a specific resource](#check-the-rsc-permissions-granted-to-a-specific-resource).
    * Check your app for added RSC permissions in a team.
    * Check your app for added RSC permissions in a chat.

## Configure consent settings

For application permissions, admins can enable or disable RSC permissions for all apps for the entire tenant using a toggle in Teams admin center. The tenant-level controls of app-only RSC permissions differ based on resource type.

For delegated permissions, any authorized user can consent to the permissions requested by the app.

<br>
<details>

<summary><b>Configure group owner consent settings for RSC in a team using the Azure AD portal</b></summary>

You can enable or disable [group owner consent](/azure/active-directory/manage-apps/configure-user-consent-groups?tabs=azure-portal) directly within the Microsoft Azure portal:

1. Sign in to the [Azure portal](https://portal.azure.com) as a [Global Administrator or Company Administrator](/azure/active-directory/roles/permissions-reference#global-administrator&preserve-view=true).
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

## Check the RSC permissions granted to a specific resource

> [!IMPORTANT]
> The RSC permissions are not attributed to a user. Calls are made with app permissions, not user delegated permissions. The app can be allowed to perform actions that the user cannot, such as deleting a tab. You must review the team owner's or chat owner's intent for your use before making RSC API calls. For more information, see [Microsoft Teams API overview](/graph/teams-concept-overview).

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

## Supported RSC permissions

The following list provides all the RSC permissions categorized based on resource type and access mode:

* [RSC permissions for a team](#rsc-permissions-for-a-team).
* [RSC permissions for a chat or meeting](#rsc-permissions-for-a-chat-or-meeting).
* [RSC permissions for a user](#rsc-permissions-for-a-user).

> [!NOTE]
> The features associated with some of the permissions listed here might not be generally available.

### RSC permissions for a team

The following table provides RSC delegated permissions for a team:

| Permission name | Action |
| ----- | ----- |
|`ChannelMeetingActiveSpeaker.Read.Group`|Get the list of participants who are currently sending audio into the channel meetings associated with the team.|
|`ChannelMeetingAudioVideo.Stream.Group`|Stream audio-video content from channel meetings associated with the team.|
`ChannelMeetingIncomingAudio.Detect.Group`|Detect incoming audio in channel meetings associated with the team.|
|`ChannelMeetingStage.Write.Group`|Get content on the meeting stage of channel meetings associated with the team.|
|`InAppPurchase.Allow.Group`|Show and complete in-app purchases for team members.|
|`LiveShareSession.ReadWrite.Group`| Create and synchronize Live Share sessions for meetings associated with the team. |
|`MeetingParticipantReaction.Read.Group`| Get reactions from participants in channel meetings associated with the team.|

The following table provides RSC application permissions for a team:

| Permission name | Action |
| ----- | ----- |
|`Channel.Create.Group`|Create channels in the team. |
|`Channel.Delete.Group`|Delete channels in the team. |
|`ChannelMeeting.ReadBasic.Group`|Get the basic properties of the team's channel meetings.|
|`ChannelMeetingParticipant.Read.Group`|Get participant information for channel meetings associated with the team, such as name, role, ID, joined time, and left time.|
|`ChannelMeetingRecording.Read.Group`|Get the recordings of all channel meetings associated with the team.|
|`ChannelMeetingTranscript.Read.Group`|Get the transcripts of all channel meetings associated with the team.|
|`ChannelMeetingNotification.Send.Group`|Send notifications for all the channel meetings associated with the team.|
|`ChannelMessage.Read.Group`|Get the team's channel messages. |
|`ChannelMessage.Send.Group`|Send messages to the team's channels.|
|`ChannelSettings.Read.Group`| Get the team's channel names, descriptions, and settings​.|
|`ChannelSettings.ReadWrite.Group`|Update the team's channel names, descriptions, and settings.​|
|`Member.Read.Group`|Get the group's members.|
|`Owner.Read.Group`|Get the group's owners.|
|`TeamsActivity.Send.Group`|Create new notifications in the activity feeds of the users in the team. |
|`TeamsAppInstallation.Read.Group`|Get a list of the team's installed apps.|
|`TeamMember.Read.Group`|Get the team's members. |
|`TeamSettings.Read.Group` | Get the team's settings.|
|`TeamSettings.ReadWrite.Group`|Update the team's settings.|
|`TeamsTab.Create.Group`|Create tabs in the team. |
|`TeamsTab.Delete.Group`|Delete the team's tabs. |
|`TeamsTab.Read.Group`|Get a list of the team's tabs.|
|`TeamsTab.ReadWrite.Group`|Manage the team's tabs. |

For more information, see [team resource-specific consent permissions](/graph/permissions-reference#team-resource-specific-consent-permissions).

### RSC permissions for a chat or meeting

The following table provides RSC delegated permissions for a chat or meeting:

| Permission name | Action |
| ----- | ----- |
| `InAppPurchase.Allow.Chat` | Show and complete in-app purchases for users in the chat and any associated meetings. |
| `LiveShareSession.ReadWrite.Chat` | Create and synchronize Live Share sessions for meetings associated with the chat. |
| `MeetingStage.Write.Chat` | Show content on the meeting stage of meetings associated with the chat. |
| `MeetingParticipantReaction.Read.Chat` | Get the reactions of participants in meetings associated with the chat. |
| `OnlineMeetingIncomingAudio.Detect.Chat` | Detect incoming audio in meetings associated with the chat. |
| `OnlineMeetingActiveSpeaker.Read.Chat` | Get the participants who are currently sending audio into the meetings associated with the chat. |
| `OnlineMeetingAudioVideo.Stream.Chat` | Stream audio-video content from meetings associated with the chat. |
| `OnlineMeetingParticipant.ToggleIncomingAudio.Chat` | Toggle incoming audio for participants in meetings associated with the chat. |

The following table provides RSC application permissions for a chat or meeting:

| Permission name | Action |
| ----- | ----- |
| `Calls.AccessMedia.Chat` | Access media streams in calls associated with the chat or meeting. |
| `Calls.JoinGroupCalls.Chat` | Join calls associated with the chat or meeting. |
| `ChatSettings.Read.Chat`| Get the chat's settings.|
| `ChatSettings.ReadWrite.Chat`| Update the chat's settings. |
| `ChatMessage.Read.Chat` | Get the chat's messages.|
| `ChatMessage.Send.Chat` | Send messages to the chat. |
| `ChatMessageReadReceipt.Read.Chat` | Get the ID of the last seen message in the chat. |
| `ChatMember.Read.Chat` | Get the chat's members. |
| `Chat.Manage.Chat` | Manage the chat. |
| `TeamsTab.Read.Chat`| Get the chat's tabs. |
| `TeamsTab.Create.Chat` | Create tabs in the chat. |
| `TeamsTab.Delete.Chat` | Delete the chat's tabs. |
| `TeamsTab.ReadWrite.Chat` | Manage the chat's tabs. |
| `TeamsAppInstallation.Read.Chat` | Get which apps are installed in the chat. |
| `TeamsActivity.Send.Chat` | Create new notifications in the activity feeds of the users in the chat. |
| `OnlineMeetingTranscript.Read.Chat` | Get the transcripts of the meeting associated with the chat. |
| `OnlineMeetingParticipant.Read.Chat` | Get the participants of the meetings associated with the chat.|
| `OnlineMeeting.ReadBasic.Chat` | Get basic properties, such as name, schedule, organizer, join link, and start or end notifications of a meeting associated with the chat. |
| `OnlineMeetingRecording.Read.Chat` | Get the recordings of the meetings associated with the chat. |
| `OnlineMeetingNotification.Send.Chat` | Send notifications for the meetings associated with the chat. |

For more information, see [chat resource-specific consent permissions](/graph/permissions-reference#chat-resource-specific-consent-permissions).

> [!NOTE]
> RSC permissions are only available to Teams apps installed on the Teams client and are currently not part of the Azure AD portal.

### RSC permissions for a user

The following table provides RSC delegated permissions for a user:

| Permission name | Action |
| ----- | ----- |
| `CameraStream.Read.User`| Get the user's camera stream. |
| `InAppPurchase.Allow.User` | Show and complete in-app purchases. |
| `MicrophoneStream.Read.User` | Get the user's microphone stream. |
| `MeetingParticipantReaction.Read.User` | Get the user's reactions while participating in a meeting. |
| `OutgoingVideoStream.Write.User` | Modify the user's outgoing video. |

## Register your app with Microsoft identity platform using the Azure AD portal

The Azure AD portal provides a central platform for you to register and configure your apps. Your app must be registered in the Azure AD portal to integrate with the identity platform and call Microsoft Graph APIs. For more information, see [register an application with the identity platform](/graph/auth-register-app-v2).

> [!WARNING]
> An Azure AD app ID must not be shared across multiple Teams apps. There must be a 1:1 mapping between a Teams app and an Azure AD app. Attempts to install multiple Teams apps which are associated with the same Azure AD app ID will cause installation or runtime failures.

## Review your application permissions in the Azure AD portal

1. Go to the **Home** > **App registrations** page and select your RSC app.
1. Choose **API permissions** from the left pane and go through the list of **Configured permissions** for your app. If your app only makes RSC Graph API calls, delete all the permissions on that page. If your app also makes non-RSC calls, keep those permissions as required.

> [!IMPORTANT]
> The Azure AD portal cannot be used to request RSC permissions. RSC permissions are currently exclusive to Teams applications installed in the Teams client and are declared in the Teams app manifest (JSON) file.

## Obtain an access token from the Microsoft identity platform

To make Graph API calls, you must obtain an access token for your app from the identity platform. Before your app can get a token from the identity platform, it must be registered in the Azure AD portal. The access token contains information about your app and the permissions it has for the resources and APIs available through Microsoft Graph.

You must have the following values from the Azure AD registration process to retrieve an access token from the identity platform:

* The **Application ID** assigned by the app registration portal. If your app supports single sign-on (SSO) you must use the same Application ID for your app and SSO.
* The **Client secret/password** or a public or private key pair that is **Certificate**. This isn't required for native apps.
* A **Redirect URI** or reply URL for your app to receive responses from Azure AD.

For more information, see [get access on behalf of a user](/graph/auth-v2-user?view=graph-rest-1.0#3-get-a-token&preserve-view=true) and [get access without a user](/graph/auth-v2-service).

## Sideload your app in Teams

If your Teams admin allows custom app uploads, you can [sideload your app](~/concepts/deploy-and-publish/apps-upload.md) directly to a specific team or chat.

## Code sample

| **Sample name** | **Description** | **.NET** |**Node.js** | **Manifest**|
|-----------------|-----------------|----------------|----------------|----------------|
| Resource-Specific Consent (RSC) | Use RSC to call Graph APIs. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/graph-rsc/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/graph-rsc/nodeJs)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/graph-rsc/csharp/demo-manifest/graph-rsc.zip)|

## See also

* [Test resource-specific consent permissions in Teams](test-resource-specific-consent.md)
* [Resource-specific consent in Microsoft Teams for admins](/MicrosoftTeams/resource-specific-consent)
