---
title: Overview resource-specific consent in Teams
description: In this article, learn about resource-specific consent (RSC) permissions, types of RSC and supported RSC permissions.
ms.localizationpriority: medium
ms.topic: Conceptual
---

# Resource-specific consent for your Teams app

Resource-specific consent (RSC) is an authorization framework built by Microsoft Teams and Microsoft identity platform that allows for granting scoped access to an app.

Through RSC, an authorized user can give an app access to the data of a specific instance of a resource type. They don't need to give app access to every instance of the resource type in the entire tenant.

For example, a person who owns both team A and team B can decide to give Contoso app access to the data of only team A and not team B. The same concept of scoped data access applies to chats and meetings as well.

RSC permissions are categorized based on:

1. The resource type on which data access is being granted:
    * Teams (and the channels within those teams)
    * Chats (and meetings associated with those chats)
    * Users

1. The mode of data access:
    * Application: The app accesses data without the presence of a signed-in user.
    * Delegated: The app accesses data in the context of a signed-in users session only. No access is allowed in the absence of a signed-in user.

| &nbsp; | Application context RSC permissions | Delegated context RSC permissions |
| ---- | :----: | :----: |
| **Resource type** |  &nbsp; | &nbsp; |
| Team | ✔️ | ✔️ |
| Chat or meeting | ✔️ | ✔️ |
| User | NA | ✔️ |

In this section, you'll learn more about:

* [Types of RSC permissions](#types-of-rsc-permissions)
* [Supported RSC permissions](#supported-rsc-permissions)
* [Grant RSC permissions to an app](grant-resource-specific-consent.md)

## Types of RSC permissions

Use RSC permissions to determine the data access methods for your app. A user's ability to grant RSC permissions varies based on resource types and access modes. The following are the types of RSC permissions for an app based on access mode:

* **Application context RSC permissions (application permission)**: This type of RSC permission allows an app to access data without the user being signed in. Only resource owners can grant application RSC permissions.

  > [!NOTE]
  > Application RSC permissions for chat scope are available in [public developer preview](../../resources/dev-preview/developer-preview-intro.md) only.

* **Delegated context RSC permissions (delegated permission)**: This type of RSC permission allows an app to access data only on behalf of a signed-in user. No access is allowed in the absence of a signed-in user. Only authorized users can install an app in a specific scope. They can also grant any delegated RSC permissions that the app requests in that specific scope at app installation. For example, if regular members have the permission to install an app inside a team, then they can also grant delegated RSC permission to the app in that specific team.

### RSC-based data access APIs

Microsoft Graph SDK, Microsoft Bot Framework SDK, and Microsoft TeamsJS client library support fine-grained data access through RSC. The supported modes and resource types vary across the API surfaces.

| RSC mode or type | Supported SDKs | App manifest version | Resource types | RSC-related controls for the entire tenant | Who can consent to RSC permissions? |
|---------|---------|---------|---------|---------|---------|
|Application| • Microsoft Graph  <br> • Microsoft Bot Framework | >=v1.6 | Teams, chats, and meetings | • Microsoft Graph-based controls for chats and meetings <br> • Azure Active Directory (Azure AD) portal-based controls for Teams |• Team: A team owner <br> • Chat: A chat member <br> • Meeting: A meeting organizer or presenter |
| Delegated | Microsoft Teams Client | >=v1.12 | Teams, chats, meetings, and users | Always on | Any user authorized to install an app in the specific scope. |

## Supported RSC permissions

The following list provides all the RSC permissions categorized based on resource type and access mode:

* [RSC permissions for a team](#rsc-permissions-for-a-team): Includes the channels within a team.
* [RSC permissions for a chat or meeting](#rsc-permissions-for-a-chat-or-meeting): Includes the meetings associated with the chats.
* [RSC permissions for user access](#rsc-permissions-for-user-access): Includes permission for users to access different resources.

> [!NOTE]
> The features associated with some permissions listed here might not be generally available (GA).

### RSC permissions for a team

The following table provides RSC application permissions for a team:

| Permission name | Action |
| ----- | ----- |
|`Channel.Create.Group`|Create channels in the team. |
|`Channel.Delete.Group`|Delete this team's channels. |
|`ChannelMeeting.ReadBasic.Group`|Read the basic properties of the channel meetings in this team.|
|`ChannelMeetingParticipant.Read.Group`|Read the participant information including name, role, ID, join and left time of channel meetings associated with this team.|
|`ChannelMeetingRecording.Read.Group`|Read the recordings of all channel meetings associated with this team.|
|`ChannelMeetingTranscript.Read.Group`|Read the transcripts of all channel meetings associated with this team.|
|`ChannelMeetingNotification.Send.Group`|Send notifications in all the channel meetings associated with this team.|
|`ChannelMessage.Read.Group`|Read this team's channel messages. |
|`ChannelMessage.Send.Group`|Send messages to this team's channels.|
|`ChannelSettings.Read.Group`| Read the names, descriptions, and settings of this team's channels​.|
|`ChannelSettings.ReadWrite.Group`|Update the names, descriptions, and settings of this team's channels.​|
|`Member.Read.Group`|Read this group's members.|
|`Owner.Read.Group`|Read this group's owners.|
|`TeamsActivity.Send.Group`|Send activity feed notifications to users in this team. |
|`TeamsAppInstallation.Read.Group`|Read the apps that are installed in this team.|
|`TeamMember.Read.Group`|Read this team's members. |
|`TeamSettings.Read.Group` | Read this team's settings.|
|`TeamSettings.ReadWrite.Group`|Read and write this team's settings.|
|`TeamsTab.Create.Group`|Create tabs in this team. |
|`TeamsTab.Delete.Group`|Delete this team's tabs. |
|`TeamsTab.Read.Group`|Read this team's tabs.|
|`TeamsTab.ReadWrite.Group`|Manage this team's tabs. |

The following table provides RSC delegated permissions for a team:

| Permission name | Action |
| ----- | ----- |
|`ChannelMeetingActiveSpeaker.Read.Group`|Reading the participants who are currently sending audio into the channel meetings associated with this team.|
|`ChannelMeetingAudioVideo.Stream.Group`|Stream audio-video content of channel meetings associated with this team.|
`ChannelMeetingIncomingAudio.Detect.Group`|Detect incoming audio in channel meetings associated with this team.|
|`ChannelMeetingStage.Write.Group`|Show content on the meeting stage of channel meetings associated with this team.|
|`InAppPurchase.Allow.Group`|Show and complete in-app purchases for users in this team.|
|`LiveShareSession.ReadWrite.Group`| Create and synchronize Live Share sessions for meetings associated with this team. |
|`MeetingParticipantReaction.Read.Group`| Read reactions of participants in channel meetings associated with this team.|

For more information, see [team resource-specific consent permissions](/graph/permissions-reference#team-resource-specific-consent-permissions).

### RSC permissions for a chat or meeting

If a chat has a meeting or a call associated with it, then the relevant RSC permissions apply to those resources as well.

The following table provides RSC application permissions for a chat or meeting:

| Permission name | Action |
| ----- | ----- |
| `Calls.AccessMedia.Chat` | Access media streams in calls associated with this chat or meeting. |
| `Calls.JoinGroupCalls.Chat` | Join calls associated with this chat or meeting. |
| `ChatSettings.Read.Chat`| Read this chat's settings.|
| `ChatSettings.ReadWrite.Chat`| Read and write this chat's settings. |
| `ChatMessage.Read.Chat` | Read this chat's messages.|
| `ChatMessage.Send.Chat` | Send messages to this chat. |
| `ChatMessageReadReceipt.Read.Chat` | Read the ID of the last seen message in this chat. |
| `ChatMember.Read.Chat` | Read this chat's members. |
| `Chat.Manage.Chat` | Manage this chat. |
| `TeamsTab.Read.Chat`| Read this chat's tabs. |
| `TeamsTab.Create.Chat` | Create tabs in this chat. |
| `TeamsTab.Delete.Chat` | Delete this chat's tabs. |
| `TeamsTab.ReadWrite.Chat` | Manage this chat's tabs. |
| `TeamsAppInstallation.Read.Chat` | Read the apps that are installed in the chat. |
| `TeamsActivity.Send.Chat` | Send activity feed notifications to users in this chat. |
| `OnlineMeetingTranscript.Read.Chat` | Read the transcripts of the meeting associated with this chat. |
| `OnlineMeetingParticipant.Read.Chat` | Read the participants of the meetings associated with this chat.|
| `OnlineMeeting.ReadBasic.Chat` | Read basic properties of meetings associated with this chat, such as name, schedule, organizer, join link, and start or end notifications. |
| `OnlineMeetingRecording.Read.Chat` | Read the recordings of the meetings associated with this chat. |
| `OnlineMeetingNotification.Send.Chat` | Send notifications in the meetings associated with this chat. |

The following table provides RSC delegated permissions for a chat or meeting:

| Permission name | Action |
| ----- | ----- |
| `InAppPurchase.Allow.Chat` | Show and complete in-app purchases for users in this chat and any associated meetings. |
| `LiveShareSession.ReadWrite.Chat` | Create and synchronize Live Share sessions for meetings associated with this chat. |
| `MeetingStage.Write.Chat` | Show content on the meeting stage of meetings associated with this chat. |
| `MeetingParticipantReaction.Read.Chat` | Read the reactions of participants in meetings associated with this chat. |
| `OnlineMeetingIncomingAudio.Detect.Chat` | Detect incoming audio in meetings associated with this chat. |
| `OnlineMeetingActiveSpeaker.Read.Chat` | Read the participants who are currently sending audio into the meetings associated with this chat. |
| `OnlineMeetingAudioVideo.Stream.Chat` | Stream audio-video content of meetings associated with this chat. |
| `OnlineMeetingParticipant.Read.Chat` | Read participant information, including name, role, ID, joined and left times, of meetings associated with this chat.|
| `OnlineMeetingParticipant.ToggleIncomingAudio.Chat` | Toggle incoming audio for participants in meetings associated with this chat. |

For more information, see [chat resource-specific consent permissions](/graph/permissions-reference#chat-resource-specific-consent-permissions).

> [!TIP]
> RSC permissions are available only to Teams apps installed on the Teams client and not part of the Azure AD portal. If you want to know the RSC permissions associated with an app, see app installation or app information dialog within Teams client.

### RSC permissions for user access

You can give the following delegated RSC permissions to your app, which allows users to access different resources:

| Permission name | Action |
| ----- | ----- |
| `CameraStream.Read.User`| Read the user's camera stream. |
| `InAppPurchase.Allow.User` | Show and complete in-app purchases. |
| `MicrophoneStream.Read.User` | Read the user's microphone stream. |
| `MeetingParticipantReaction.Read.User` | Read the user's reactions while participating in a meeting. |
| `OutgoingVideoStream.Write.User` | Modify the user's outgoing video. |

## Next step

> [!div class="nextstepaction"]
> [Grant RSC permissions to an app](grant-resource-specific-consent.md)

## See also

* [App manifest schema for Teams](../../resources/schema/manifest-schema.md)
* [Permissions in Teams app](../App-permissions/Teams-app-permissions.md)
