---
title: Resource-specific Consent for Apps
description: Learn about resource-specific consent (RSC) permissions, types of RSC and supported RSC permissions, and how to grant RSC permissions to an app.
ms.topic: article
ms.date: 10/16/2026
---

# Resource-specific consent for your Teams app

Resource-specific consent (RSC) is an authorization framework that enables authorized users to grant permissions to Teams agents and apps that are scoped to the *resources* - teams, chats, and users - with which they interact.

With RSC, an agent or app declares in its app manifest which resource-specific permissions it needs.

With RSC, an agent or app declares a need for these permissions.

Teams agents and apps to demand access to resources at

used by Teams agents and apps
 that extends the [Microsoft Graph permissions model](/graph/permissions-overview) with permissions that

with permissions scoped to individual teams and their channels, group chats, meetings, and user operations.

RSC enables agents and applications to demand access to resources and operations of the specific teams or chats they're added to.  an authorized user can give an app access to the data of a specific instance of a resource type. They don't need to give app access to every instance of the resource type in the entire tenant.

RSC extends the [Microsoft Graph permissions model](/graph/permissions-overview) with permissions that apply only at these Teams-specific scopes.

For example, a person who owns both team A and team B can decide to give Contoso app access to the data of only team A and not team B. The same concept of scoped data access applies to chats and meetings as well.

Following are the types of RSC permissions:

1. The resource type on which data access is being granted:
    * Teams (and the channels within those teams)
    * Chats (and meetings associated with those chats)
    * Users

1. The mode of data access:
    * Application: The app accesses data without the presence of a signed-in user.
    * Delegated: The app only accesses data in the context of a signed-in user's sessions. It doesn't allow access in the absence of a signed-in user.

RSC permissions for Teams agents and apps are not displayed in the Entra admin center. If you want to know the RSC permissions associated with an app, see the app installation or app information dialog within Teams client.

## Types of RSC permissions

* **Application context RSC permissions (application permission)**: Allows an app to access data without the user being signed in. Only resource owners can grant application RSC permissions.

* **Delegated context RSC permissions (delegated permission)**: Allows an app to access data only on behalf of a signed-in user. No access is allowed in the absence of a signed-in user. Only authorized users can install an app in a specific scope. They can also grant any delegated RSC permissions that the app requests in that specific scope at app installation. For example, if regular members have the permission to install an app inside a team, then they can also grant delegated RSC permission to the app in that specific team.

## RSC-based data access APIs

Microsoft Graph SDK, Teams SDK, and Microsoft TeamsJS client library support fine-grained data access through RSC. The supported modes and resource types vary across the API surfaces.

| RSC mode | Supported SDKs | App manifest version | Resource types | RSC-related controls for the entire tenant | Who can consent to RSC permissions? |
| --------- | --------- | --------- | --------- | --------- | --------- |
| Application | • Microsoft Graph  <br> • Teams SDK | >=v1.6 | Teams, chats, and meetings | • Microsoft Graph-based controls for chats and meetings <br> • Microsoft Entra admin center-based controls for Teams | • Team: A team owner or member <br> • Chat: A chat member <br> • Meeting: A meeting organizer or presenter |
| Delegated | Microsoft Teams Client | >=v1.12 | Teams, chats, meetings, and users | Always on | Any user authorized to install an app in the specific scope. |

> [!NOTE]
> The `TeamsActivity.Send` RSC application permission is always enabled at the tenant level. App users don't need admin consent to use the permission.

## Basic RSC Permissions

A limited set of RSC permissions have been reviewed by Microsoft privacy and security teams and have been deemed low risk. These permissions can be consented to at all times by any user when they install and use an app. The following low-risk basic permissions are always consented to upon installation.

| Permission name | Action | Type |
| ----- | ----- | :-----: |
| `TeamsActivity.Send.Group` | Send activity feed notifications to users in this team. | Application |
| `TeamsActivity.Send.Chat` | Send activity feed notifications to users in this chat. | Application |
| `TeamsActivity.Send.User` | Send activity feed notifications to the user. | Application |

## RSC permissions for teams

Installing an app to a team does not automatically make the app or agent available in every channel. For private and shared channels, and other channel types that require channel-level enablement, the app might also need to be enabled for the target channel. Channel enablement controls the app’s availability, channel status, and roster behavior; it doesn't expand or replace the team-scoped RSC grant.

| Permission name | Action | Type |
| ----- | ----- | :-----: |
| `Channel.Create.Group` | Create channels in this team. | Application |
| `Channel.Delete.Group` | Delete this team's channels. | Application |
| `ChannelMeeting.ReadBasic.Group` | Read the basic properties of the channel meetings in this team. | Application |
| `ChannelMeetingParticipant.Read.Group` | Read the participant information including name, role, ID, join and left time of channel meetings associated with this team. | Application |
| `ChannelMeetingRecording.Read.Group` | Read the recordings of all channel meetings associated with this team. | Application |
| `ChannelMeetingNotification.Send.Group` | Send notifications in all the channel meetings associated with this team. | Application |
| `ChannelMessage.Read.Group` | Read this team's channel messages. | Application |
| `ChannelMessage.Send.Group` | Send messages to this team's channels. | Application |
| `ChannelSettings.Read.Group` | Read the names, descriptions, and settings of this team's channels​. | Application |
| `ChannelSettings.ReadWrite.Group` | Update the names, descriptions, and settings of this team's channels.​ | Application |
| `TeamsActivity.Send.Group` | Send activity feed notifications to users in this team. | Application |
| `TeamsAppInstallation.Read.Group` | Read the apps that are installed in this team. | Application |
| `TeamMember.Read.Group` | Read this team's members. | Application |
| `TeamSettings.Read.Group` | Read this team's settings. | Application |
| `TeamSettings.ReadWrite.Group` | Read and write this team's settings. | Application |
| `TeamsTab.Create.Group` | Create tabs in this team. | Application |
| `TeamsTab.Delete.Group` | Delete this team's tabs. | Application |
| `TeamsTab.Read.Group` | Read this team's tabs. | Application |
| `TeamsTab.ReadWrite.Group` | Manage this team's tabs. | Application |
| `ChannelMeetingActiveSpeaker.Read.Group` | Reading the participants who are sending audio into the channel meetings associated with this team. | Delegated |
| `ChannelMeetingAudioVideo.Stream.Group` | Stream audio-video content of channel meetings associated with this team. | Delegated |
| `ChannelMeetingIncomingAudio.Detect.Group` | Detect incoming audio in channel meetings associated with this team. | Delegated |
| `ChannelMeetingStage.Write.Group` | Show content on the meeting stage of channel meetings associated with this team. | Delegated |
| `InAppPurchase.Allow.Group` | Show and complete in-app purchases for users in this team. | Delegated |
| `LiveShareSession.ReadWrite.Group` | Allows the app to create and synchronize Live Share sessions for this team and get access related information, such as name and role, about this team's roster and any associated meetings.  | Delegated |
| `MeetingParticipantReaction.Read.Group` | Read reactions of participants in channel meetings associated with this team. | Delegated |
| `ChannelMember.ReadWrite.Group` | Read and write the members of this team's channels. | Application |
| `ChannelMember.Read.Group` | Read the members of this team's channels. | Application |
| `File.Read.Group` | Read files and folders associated with this team's channels. | Application |

For more information, see [team resource-specific consent permissions](/graph/permissions-reference#team-resource-specific-consent-permissions).

## RSC permissions for chats and meetings

The only RSC permission relevant to chats in personal scope is `ChatMessageReadReceipt.Read.Chat`.

If a chat has a meeting or a call associated with it, then the relevant RSC permissions apply to those resources as well.

| Permission name | Action | Type |
| ----- | ----- | :-----: |
| `Calls.AccessMedia.Chat` | Access media streams in calls associated with this chat or meeting. | Application |
| `Calls.JoinGroupCalls.Chat` | Join calls associated with this chat or meeting. | Application |
| `ChatSettings.Read.Chat` | Read this chat's settings. | Application |
| `ChatSettings.ReadWrite.Chat` | Read and write this chat's settings. | Application |
| `ChatMessage.Read.Chat` | Read this chat's messages. | Application |
| `ChatMessageReadReceipt.Read.Chat` | Read the ID of the last seen message in this chat. | Application |
| `ChatMember.Read.Chat` | Read this chat's members. | Application |
| `Chat.Manage.Chat` | Manage this chat. | Application |
| `TeamsTab.Read.Chat` | Read this chat's tabs. | Application |
| `TeamsTab.Create.Chat` | Create tabs in this chat. | Application |
| `TeamsTab.Delete.Chat` | Delete this chat's tabs. | Application |
| `TeamsTab.ReadWrite.Chat` | Manage this chat's tabs. | Application |
| `TeamsAppInstallation.Read.Chat` | Read the apps that are installed in this chat. | Application |
| `TeamsActivity.Send.Chat` | Send activity feed notifications to users in this chat. | Application |
| `OnlineMeetingTranscript.Read.Chat` | Read the transcripts of the meeting associated with this chat. | Application |
| `OnlineMeeting.ReadBasic.Chat` | Read basic properties of meetings associated with this chat, such as name, schedule, organizer, join link, and start or end notifications. | Application |
| `OnlineMeetingRecording.Read.Chat` | Read the recordings of the meetings associated with this chat. | Application |
| `OnlineMeetingNotification.Send.Chat` | Send notifications in the meetings associated with this chat. | Application |
| `InAppPurchase.Allow.Chat` | Show and complete in-app purchases for users in this chat and any associated meetings. | Delegated |
| `LiveShareSession.ReadWrite.Chat` | Allows the app to create and synchronize Live Share sessions for this chat and get access related information, such as name and role, about this chat's roster and any associated meetings. | Delegated |
| `MeetingStage.Write.Chat` | Show content on the meeting stage of meetings associated with this chat. | Delegated |
| `MeetingParticipantReaction.Read.Chat` | Read the reactions of participants in meetings associated with this chat. | Delegated |
| `OnlineMeetingIncomingAudio.Detect.Chat` | Detect incoming audio in meetings associated with this chat. | Delegated |
| `OnlineMeetingActiveSpeaker.Read.Chat` | Read the participants who are sending audio into the meetings associated with this chat. | Delegated |
| `OnlineMeetingAudioVideo.Stream.Chat` | Stream audio-video content of meetings associated with this chat. | Delegated |
| `OnlineMeetingParticipant.Read.Chat` | Read participant information, including name, role, ID, joined and left times, of meetings associated with this chat. | Delegated or application |
| `OnlineMeetingParticipant.ToggleIncomingAudio.Chat` | Toggle incoming audio for participants in meetings associated with this chat. | Delegated |

## RSC permissions for user access

| Permission name | Action | Type |
| ----- | ----- | :-----: |
| `CameraStream.Read.User` | Read the user's camera stream. | Delegated |
| `InAppPurchase.Allow.User` | Show and complete in-app purchases. | Delegated |
| `MicrophoneStream.Read.User` | Read the user's microphone stream. | Delegated |
| `MeetingParticipantReaction.Read.User` | Read the user's reactions while participating in a meeting. | Delegated |
| `OutgoingVideoStream.Write.User` | Modify the user's outgoing video. | Delegated |
| `TeamsActivity.Send.User` | Send activity notifications to the user. | Application |
| `TeamsAppInstallation.Read.User` | Read the apps that are installed in the user's personal scope. | Application |

## Next step

> [!div class="nextstepaction"]
> [Grant RSC permissions to an app](grant-resource-specific-consent.md)

## See also

* [Microsoft Graph permissions reference](/graph/permissions-reference)
* [App manifest schema for Teams](/microsoft-365/extensibility/schema/)
* [Permissions in Teams app](../App-permissions/Teams-app-permissions.md)
* [Manage custom apps in Teams admin center](/microsoftteams/teams-custom-app-policies-and-settings)
* [Allow members to upload custom apps](/microsoftteams/teams-custom-app-policies-and-settings?branch=main)
