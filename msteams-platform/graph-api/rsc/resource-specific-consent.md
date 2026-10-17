---
title: Resource-Specific Consent for Teams Agents and Apps
description: Learn about resource-specific consent (RSC) permissions, types of RSC and supported RSC permissions, and how to grant RSC permissions to an app.
ms.topic: article
ms.date: 10/16/2026
---

# Resource-specific consent for Teams agents and apps

Resource-specific consent (RSC) is the authorization framework in Teams that scopes certain agent and app permissions to teams, chats, meetings, and individual users. It extends the [Microsoft Graph authorization model](/graph/permissions-overview) with a set of permissions that apply only to the data and operations associated with the specific *resources* - teams, chats/meetings, or users - where the agent or app is installed. RSC enables greater privacy and control than permissions that apply across an entire tenant, and empowers users to make their own choices about access to resources that they own.

Developers declare an agent or app's RSC permissions requirements in its app manifest. When a user attempts to install it, Teams presents them with a request to grant the needed permissions, and the user must consent before proceeding with the installation. If the user proceeds, the RSC permissions granted to the agent or app only extend to the team, chat/meeting, or user where it is installed. A user's ability to consent to different permissions can be subject to administrator and resource owner policies.

As with standard Microsoft Graph permissions, each RSC permission supports either delegated access, app-only access, or both. Only administrators or resource owners, not other resource members, can consent to requests for app-only RSC permissions. For more information about delegated and app-only access in the Microsoft Graph authorization model, see [Access scenarios](/graph/auth/auth-concepts#access-scenarios).

Installing an agent or app requires consenting to all of its RSC permissions requests. Users can't grant or deny individual permissions separately during installation.

RSC permissions are not declared or displayed in the Entra admin center. If you want to know the RSC permissions associated with an app, see the app installation or app information dialog within the Teams client.

## RSC-based data access APIs

Microsoft Graph SDK, Teams SDK, and Microsoft TeamsJS client library support fine-grained data access through RSC. The supported modes and resource types vary across the API surfaces.

| RSC mode | Supported SDKs | App manifest version | Resource types | RSC-related controls for the entire tenant | Who can consent to RSC permissions? |
| --------- | --------- | --------- | --------- | --------- | --------- |
| Application | • Microsoft Graph  <br> • Teams SDK | >=v1.6 | Teams, chats, and meetings | • Microsoft Graph-based controls for chats and meetings <br> • Microsoft Entra admin center-based controls for Teams | • Team: A team owner or member <br> • Chat: A chat member <br> • Meeting: A meeting organizer or presenter |
| Delegated | Microsoft Teams Client | >=v1.12 | Teams, chats, meetings, and users | Always on | Any user authorized to install an app in the specific scope. |

## Basic RSC permissions

The Microsoft privacy and security teams have reviewed a limited set of RSC permissions and deemed them low risk. Any user can consent to these permissions at any time when they install and use an app. The following low-risk basic permissions are always consented to upon installation.

| Permission name | Action | Access scenario (application or delegated) |
| ----- | ----- | :-----: |
| `TeamsActivity.Send.Group` | Send activity feed notifications to users in this team. | Application |
| `TeamsActivity.Send.Chat` | Send activity feed notifications to users in this chat. | Application |
| `TeamsActivity.Send.User` | Send activity feed notifications to the user. | Application |

Additionally, the `TeamsActivity.Send` RSC application permission is always enabled at the tenant level. App users don't need administrator consent to use it.

## RSC permissions for teams and channels

These RSC permissions apply at the team scope. The permissions related to channel data and operations apply across all of a team's channels except [private and shared channels](../../build-apps-for-shared-private-channels.md). Channel-related RSC permissions only extend to private and shared channels in which the agent or app is explicitly enabled.

| Permission name | Action | Access scenario (application or delegated) |
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
| `File.Read.Group` | Read information about the files and folders associated with this team’s channels. | Application |

## RSC permissions for chats and meetings

The only RSC permission relevant to chats in personal scope is `ChatMessageReadReceipt.Read.Chat`.

If a chat has a meeting or a call associated with it, the relevant RSC permissions apply to those resources.

| Permission name | Action | Access scenario (application or delegated) |
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

## RSC permissions for users (personal scope)

| Permission name | Action | Access scenario (application or delegated) |
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
