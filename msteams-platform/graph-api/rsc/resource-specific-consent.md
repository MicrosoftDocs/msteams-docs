---
title: Resource-specific Consent for Apps
description: Learn about resource-specific consent (RSC), supported permissions, access modes, and how to declare RSC permission requirements for an agent or app.
ms.localizationpriority: medium
ms.topic: article
ms.owner: vishachadha
ms.date: 10/19/2026
---

# Resource-specific consent for your Teams app

Resource-specific consent (RSC) is an authorization framework built by Microsoft Teams and Microsoft identity platform that allows for granting scoped access to an app.

Through RSC, an authorized user can give an app access to the data of a specific instance of a resource type. They don't need to give app access to every instance of the resource type in the entire tenant.

For example, a person who owns both team A and team B can decide to give Contoso app access to the data of only team A and not team B. The same concept of scoped data access applies to chats and meetings as well.

Following are the types of RSC permissions:

1. The resource type on which data access is being granted:
    * Teams (and the channels within those teams)
    * Chats (and meetings associated with those chats)
    * Users

1. The mode of data access:
    * Application: The app accesses data without the presence of a signed-in user.
    * Delegated: The app only accesses data in the context of a signed-in user's sessions. It doesn't allow access in the absence of a signed-in user.

| &nbsp; | Application context RSC permissions | Delegated context RSC permissions |
| ---- | :----: | :----: |
| **Resource type** |  &nbsp; | &nbsp; |
| Team | ✔️ | ✔️ |
| Chat or meeting | ✔️ | ✔️ |
| User | ✔️ | ✔️ |

In this section, you'll learn more about:

* [Declare, consent to, and verify RSC permissions](#declare-consent-to-and-verify-rsc-permissions)
* [Types of RSC permissions](#types-of-rsc-permissions)
* [Organizational controls for RSC](#organizational-controls-for-rsc)
* [Supported RSC permissions](#supported-rsc-permissions)
* [Declare RSC permission requirements for an agent or app](grant-resource-specific-consent.md)

## Declare, consent to, and verify RSC permissions

RSC separates the permissions your agent or app requests from the access granted to it on a specific resource. Use the following workflow:

1. **Declare permission requirements.** Choose only the permissions your features need and add them to the app manifest, using Developer Portal or by editing the manifest directly. Declaring a permission doesn't grant access. See [Declare RSC permission requirements for an agent or app](grant-resource-specific-consent.md).
1. **Install the app and obtain consent.** An authorized user installs the app in the target team, chat, meeting, or personal scope. Teams shows the requested permissions during installation, and the user grants consent subject to organizational policies. For custom app testing, see [Upload your app in Teams](../../concepts/deploy-and-publish/apps-upload.md).
1. **Verify grants and test behavior.** After installation, confirm that the expected application RSC permissions were granted to the correct app on the intended resource. Repeat this check after permission changes and the applicable update and consent flow, or when troubleshooting access failures. Then test the API calls or Teams client behavior your app uses. See [Verify the RSC permissions granted to your app](grant-resource-specific-consent.md#verify-the-rsc-permissions-granted-to-your-app) and [Test resource-specific consent permissions in Teams](test-resource-specific-consent.md).

For example, declaring `TeamSettings.Read.Group` requests permission to read team settings. Consent during installation in team A grants that access for team A, not for every team in the organization.

> [!IMPORTANT]
> When you upload a custom app for testing, the app must come from the same organization where it's installed. The app registration referenced by `webApplicationInfo.id` must also belong to that organization. This requirement applies to custom app upload, not to every app distribution method. For the error message and resolution steps, see [Resolve a same-organization installation error](../../concepts/deploy-and-publish/apps-upload.md#resolve-a-same-organization-installation-error).

## Types of RSC permissions

Use RSC permissions to determine the data access methods for your app. A user's ability to grant RSC permissions varies based on resource types and access modes. The following are the types of RSC permissions for an app based on access mode:

* **Application context RSC permissions (application permission)**: Allows an app to access data without the user being signed in. Consent depends on the resource: for example, team owners grant application RSC permissions for their teams, while chat members can grant them for their chats. The [basic RSC permissions](#basic-rsc-permissions) are an exception to the resource-owner requirement.

* **Delegated context RSC permissions (delegated permission)**: Allows an app to access data only on behalf of a signed-in user. No access is allowed in the absence of a signed-in user. Only authorized users can install an app in a specific scope. They can also grant any delegated RSC permissions that the app requests in that specific scope at app installation. For example, if regular members have the permission to install an app inside a team, then they can also grant delegated RSC permission to the app in that specific team.

### Basic RSC permissions

A limited set of RSC permissions have been reviewed by Microsoft privacy and security teams and have been deemed low risk. These permissions can be consented to at all times by any user when they install and use an app. The following low-risk basic permissions are always consented to upon installation.

| Permission name | Action | Type: Delegated | Type: Application |
| ----- | ----- | :-----: | :-----: |
|`TeamsActivity.Send.Group`|Send activity feed notifications to users in this team. | NA | Supported |
| `TeamsActivity.Send.Chat` | Send activity feed notifications to users in this chat. |NA |Supported |
|`TeamsActivity.Send.User`|Send activity feed notifications to the user. | NA | Supported |

### RSC-based data access APIs

Microsoft Graph SDK, Microsoft Bot Framework SDK, and Microsoft TeamsJS client library support fine-grained data access through RSC. The supported modes and resource types vary across the API surfaces.

| RSC mode | Supported SDKs | App manifest version | Resource types | RSC-related controls for the entire tenant | Who can consent to RSC permissions? |
|---------|---------|---------|---------|---------|---------|
| Application | • Microsoft Graph <br> • Microsoft Bot Framework | >=v1.6 | Teams, chats, meetings, and users | Resource-specific tenant controls. See [Organizational controls for RSC](#organizational-controls-for-rsc). | • Team: A team owner <br> • Chat: A chat member <br> • Meeting: A meeting organizer or presenter <br> • User: The user installing the app in personal scope <br> • Basic permissions: See [Basic RSC permissions](#basic-rsc-permissions). |
| Delegated | Microsoft Teams Client | >=v1.12 | Teams, chats, meetings, and users | Delegated RSC consent is always enabled; the user must still be authorized to install the app in the specific scope. | Any user authorized to install an app in the specific scope. |

The manifest versions in this table are the minimum versions for each access mode. Check the requirements for the individual permission and API your app uses.

> [!NOTE]
> The `TeamsActivity.Send` RSC application permission is always enabled at the tenant level. App users don't need admin consent to use the permission.

## Organizational controls for RSC

Your organization's policies determine whether users can install an app and consent to its requested application RSC permissions. Allowing an app in the organization doesn't itself grant access to a particular team, chat, or user resource. Permission declaration, app availability, and resource-specific consent are separate parts of the process.

Application RSC controls vary by resource. Team and chat RSC settings are managed through Microsoft Graph PowerShell. Personal-scope RSC is controlled through the Microsoft Graph `teamsAppSettings` resource. Delegated RSC permissions and the basic permissions described above have different consent rules; don't apply application RSC restrictions to them indiscriminately.

If your app can't obtain the required consent, work with your administrator instead of changing tenant policies as part of app development. For related admin guidance on reviewing RSC permissions, see [Grant and manage consent to Teams app permissions](/microsoftteams/manage-consent-app-permissions#view-resource-specific-consent-permissions-of-an-app). For the underlying controls, see the [team RSC configuration reference](/powershell/module/microsoft.graph.beta.teams/set-mgbetateamrscconfiguration?view=graph-powershell-beta&preserve-view=true), [chat RSC configuration reference](/powershell/module/microsoft.graph.beta.teams/set-mgbetachatrscconfiguration?view=graph-powershell-beta&preserve-view=true), and [teamsAppSettings reference](/graph/api/resources/teamsappsettings?view=graph-rest-1.0&preserve-view=true).

> [!NOTE]
> The linked team and chat configuration cmdlets are part of Microsoft Graph PowerShell beta. Refer to their documentation for supported parameters and requirements.

## Supported RSC permissions

The following list provides all the RSC permissions categorized based on resource type. Each table also states which data access modes are available for each permission.

* [RSC permissions for a team](#rsc-permissions-for-a-team): Includes the channels within a team.
* [RSC permissions for a chat or meeting](#rsc-permissions-for-a-chat-or-meeting): Includes the meetings associated with the chats.
* [RSC permissions for user access](#rsc-permissions-for-user-access): Includes permission for users to access different resources.

> [!NOTE]
> The features associated with some permissions listed here might not be generally available (GA).

### RSC permissions for a team

The following table provides RSC application permissions for a team and their applicable data access mode:

| Permission name | Action | Type: Delegated | Type: Application |
| ----- | ----- | :-----: | :-----: |
|`Channel.Create.Group`|Create channels in this team. | NA | Supported |
|`Channel.Delete.Group`|Delete this team's channels. | NA | Supported |
|`ChannelMeeting.ReadBasic.Group`|Read the basic properties of the channel meetings in this team.| NA | Supported |
|`ChannelMeetingParticipant.Read.Group`|Read the participant information including name, role, ID, join and left time of channel meetings associated with this team.| NA | Supported |
|`ChannelMeetingRecording.Read.Group`|Read the recordings of all channel meetings associated with this team.| NA | Supported |
|`ChannelMeetingTranscript.Read.Group`|Read the transcripts of all channel meetings associated with this team.| NA | Supported |
|`ChannelMeetingNotification.Send.Group`|Send notifications in all the channel meetings associated with this team.| NA | Supported |
|`ChannelMessage.Read.Group`|Read this team's channel messages. | NA | Supported |
|`ChannelMessage.Send.Group`|Send messages to this team's channels. | NA | Supported |
|`ChannelSettings.Read.Group`| Read the names, descriptions, and settings of this team's channels​.| NA | Supported |
|`ChannelSettings.ReadWrite.Group`|Update the names, descriptions, and settings of this team's channels.​| NA | Supported |
|`TeamsActivity.Send.Group`|Send activity feed notifications to users in this team. | NA | Supported |
|`TeamsAppInstallation.Read.Group`|Read the apps that are installed in this team.| NA | Supported |
|`TeamMember.Read.Group`|Read this team's members. | NA | Supported |
|`TeamSettings.Read.Group` | Read this team's settings.| NA | Supported |
|`TeamSettings.ReadWrite.Group`|Read and write this team's settings.| NA | Supported |
|`TeamsTab.Create.Group`|Create tabs in this team. | NA | Supported |
|`TeamsTab.Delete.Group`|Delete this team's tabs. | NA | Supported |
|`TeamsTab.Read.Group`|Read this team's tabs.| NA | Supported |
|`TeamsTab.ReadWrite.Group`|Manage this team's tabs. | NA | Supported |
|`ChannelMeetingActiveSpeaker.Read.Group`|Reading the participants who are sending audio into the channel meetings associated with this team.| Supported | NA |
|`ChannelMeetingAudioVideo.Stream.Group`|Stream audio-video content of channel meetings associated with this team.| Supported | NA |
|`ChannelMeetingIncomingAudio.Detect.Group`|Detect incoming audio in channel meetings associated with this team.| Supported | NA |
|`ChannelMeetingStage.Write.Group`|Show content on the meeting stage of channel meetings associated with this team.| Supported | NA |
|`InAppPurchase.Allow.Group`|Show and complete in-app purchases for users in this team.| Supported | NA |
|`LiveShareSession.ReadWrite.Group`| Allows the app to create and synchronize Live Share sessions for this team and get access related information, such as name and role, about this team's roster and any associated meetings. | Supported | NA |
|`MeetingParticipantReaction.Read.Group`| Read reactions of participants in channel meetings associated with this team.| Supported | NA |
| `ChannelMember.ReadWrite.Group` | Read and write the members of this team's channels.|NA |NA |
| `ChannelMember.Read.Group` | Read the members of this team's channels. |NA |NA |

For more information, see [Microsoft Graph resource-specific consent permissions](/graph/permissions-reference#resource-specific-consent-rsc-permissions).

### RSC permissions for a chat or meeting

> [!NOTE]
> The RSC permissions for chat in personal scope is limited to `ChatMessageReadReceipt.Read.Chat`.

If a chat has a meeting or a call associated with it, then the relevant RSC permissions apply to those resources as well.

The following table provides RSC permissions for a chat or meeting and their applicable data access mode:

| Permission name | Action | Type: Delegated | Type: Application |
| ----- | ----- | :-----: | :-----: |
| `Calls.AccessMedia.Chat` | Access media streams in calls associated with this chat or meeting. |NA |Supported |
| `Calls.JoinGroupCalls.Chat` | Join calls associated with this chat or meeting. |NA |Supported |
| `ChatSettings.Read.Chat`| Read this chat's settings.|NA |Supported |
| `ChatSettings.ReadWrite.Chat`| Read and write this chat's settings. |NA |Supported |
| `ChatMessage.Read.Chat` | Read this chat's messages.|NA |Supported |
| `ChatMessageReadReceipt.Read.Chat` | Read the ID of the last seen message in this chat. |NA |Supported |
| `ChatMember.Read.Chat` | Read this chat's members. |NA |Supported |
| `Chat.Manage.Chat` | Manage this chat. |NA |Supported |
| `TeamsTab.Read.Chat`| Read this chat's tabs. |NA |Supported |
| `TeamsTab.Create.Chat` | Create tabs in this chat. |NA |Supported |
| `TeamsTab.Delete.Chat` | Delete this chat's tabs. |NA |Supported |
| `TeamsTab.ReadWrite.Chat` | Manage this chat's tabs. |NA |Supported |
| `TeamsAppInstallation.Read.Chat` | Read the apps that are installed in this chat. |NA |Supported |
| `TeamsActivity.Send.Chat` | Send activity feed notifications to users in this chat. |NA |Supported |
| `OnlineMeetingTranscript.Read.Chat` | Read the transcripts of the meeting associated with this chat. |NA |Supported |
| `OnlineMeeting.ReadBasic.Chat` | Read basic properties of meetings associated with this chat, such as name, schedule, organizer, join link, and start or end notifications. |NA |Supported |
| `OnlineMeetingRecording.Read.Chat` | Read the recordings of the meetings associated with this chat. |NA |Supported |
| `OnlineMeetingNotification.Send.Chat` | Send notifications in the meetings associated with this chat. |NA |Supported |
| `InAppPurchase.Allow.Chat` | Show and complete in-app purchases for users in this chat and any associated meetings. |Supported |NA |
| `LiveShareSession.ReadWrite.Chat` | Allows the app to create and synchronize Live Share sessions for this chat and get access related information, such as name and role, about this chat's roster and any associated meetings. |Supported |NA |
| `MeetingStage.Write.Chat` | Show content on the meeting stage of meetings associated with this chat. |Supported |NA |
| `MeetingParticipantReaction.Read.Chat` | Read the reactions of participants in meetings associated with this chat. |Supported |NA |
| `OnlineMeetingIncomingAudio.Detect.Chat` | Detect incoming audio in meetings associated with this chat. |Supported |NA |
| `OnlineMeetingActiveSpeaker.Read.Chat` | Read the participants who are sending audio into the meetings associated with this chat. |Supported |NA |
| `OnlineMeetingAudioVideo.Stream.Chat` | Stream audio-video content of meetings associated with this chat. |Supported |NA |
| `OnlineMeetingParticipant.Read.Chat` | Read participant information, including name, role, ID, joined and left times, of meetings associated with this chat.|Supported |Supported |
| `OnlineMeetingParticipant.ToggleIncomingAudio.Chat` | Toggle incoming audio for participants in meetings associated with this chat. |Supported |NA |

For more information, see [Microsoft Graph resource-specific consent permissions](/graph/permissions-reference#resource-specific-consent-rsc-permissions).

> [!TIP]
> RSC permissions are available only to Teams apps installed on the Teams client and not part of the Microsoft Entra admin center. If you want to know the RSC permissions associated with an app, see app installation or app information dialog within Teams client.

### RSC permissions for user access

The following table provides RSC permissions for a user and their applicable data access mode:

| Permission name | Action | Type: Delegated | Type: Application |
| ----- | ----- | :-----: | :-----: |
| `CameraStream.Read.User`| Read the user's camera stream. |Supported |NA |
| `InAppPurchase.Allow.User` | Show and complete in-app purchases. |Supported |NA |
| `MicrophoneStream.Read.User` | Read the user's microphone stream. |Supported |NA |
| `MeetingParticipantReaction.Read.User` | Read the user's reactions while participating in a meeting. |Supported |NA |
| `OutgoingVideoStream.Write.User` | Modify the user's outgoing video. |Supported |NA |
| `TeamsActivity.Send.User` | Send activity notifications to the user. |NA |Supported |
| `TeamsAppInstallation.Read.User` | Read the apps that are installed in the user's personal scope. | NA | Supported |

## Next step

> [!div class="nextstepaction"]
> [Declare RSC permission requirements for an agent or app](grant-resource-specific-consent.md)

## See also

* [App manifest schema for Teams](/microsoft-365/extensibility/schema/)
* [Permissions in Teams app](../App-permissions/Teams-app-permissions.md)
* [Grant and manage consent to Teams app permissions](/microsoftteams/manage-consent-app-permissions)
* [Manage custom apps in Teams admin center](/microsoftteams/teams-custom-app-policies-and-settings)
* [Allow members to upload custom apps](/microsoftteams/teams-custom-app-policies-and-settings?branch=main)
