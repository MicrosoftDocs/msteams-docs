---
title: Resource-Specific Consent for Teams Agents and Apps
description: Learn about resource-specific consent (RSC) permissions, types of RSC and supported RSC permissions, and how to grant RSC permissions to an app.
ms.topic: article
ms.date: 10/16/2026
---

# Resource-specific consent for Teams agents and apps

Resource-specific consent (RSC) is the component of Teams' authorization framework that recognizes *resources* - teams, chats, meetings, and user personal scopes - as user-owned boundaries for certain agent and app permissions. Developers declare up front which resource-scoped permissions their agents and apps need, such as the ability to [read all messages in a chat](../../agents-in-teams/enable-receive-all-chat-messages.md) or add members to a channel, and users grant them as part of installation.

RSC is an extension of the [Microsoft Graph authorization model](/graph/permissions-overview). It enables greater user privacy and control than permissions that apply across an entire tenant, empowering users to make their own decisions about access to resources that they own.

## Requesting and obtaining RSC permissions

Developers declare an agent or app's RSC permissions requirements in its app manifest. See [Grant RSC permissions to your app](grant-resource-specific-consent.md) for more information.

When a user attempts to install the agent or app, Teams presents them with a one-time request to grant the needed permissions. If the user consents and proceeds with the installation, the RSC permissions granted to the agent or app only extend to the team, chat/meeting, or user where it is installed.

A user's ability to consent to RSC permission requests can be subject to administrator and resource owner policies. Installing an agent or app requires granting all of the RSC permissions it requests: users can't grant or deny permissions individually.

RSC permissions are not declared or displayed in the Entra admin center. If you want to know the RSC permissions associated with an app, see the app installation or app information dialog within the Teams client.

## Access scenarios: delegated and app-only

As with standard Microsoft Graph permissions, each RSC permission supports either delegated access, app-only access, or both. For more information about delegated and app-only access scenarios in the Microsoft Graph authorization model, see [Access scenarios](/graph/auth/auth-concepts#access-scenarios).

Any member of a team or chat can consent to requests for delegated permissions when installing an agent or app there, but only administrators or resource owners can consent to requests for app-only permissions.

## RSC-based data access APIs

Microsoft Graph SDK, Teams SDK, and Microsoft TeamsJS client library support fine-grained data access through RSC. The supported modes and resource types vary across the API surfaces.

| RSC mode | Supported SDKs | App manifest version | Resource types | RSC-related controls for the entire tenant | Who can consent to RSC permissions? |
| --------- | --------- | --------- | --------- | --------- | --------- |
| App-only | • Microsoft Graph  <br> • Teams SDK | >=v1.6 | Teams, chats, and meetings | • Microsoft Graph-based controls for chats and meetings <br> • Microsoft Entra admin center-based controls for Teams | • Team: A team owner or member <br> • Chat: A chat member <br> • Meeting: A meeting organizer or presenter |
| Delegated | Microsoft Teams Client | >=v1.12 | Teams, chats, meetings, and users | Always on | Any user authorized to install an app in the specific scope. |

## Basic RSC permissions

The Microsoft privacy and security teams have reviewed a limited set of RSC permissions and deemed them low risk. Any user can consent to these permissions at any time when they install and use an app. The following low-risk basic permissions are always consented to upon installation.

| Permission name | Action | Supported access scenarios |
| ----- | ----- | :-----: |
| `TeamsActivity.Send.Group` | Send activity feed notifications to users in this team. | App-only |
| `TeamsActivity.Send.Chat` | Send activity feed notifications to users in this chat. | App-only |
| `TeamsActivity.Send.User` | Send activity feed notifications to the user. | App-only |

Additionally, the `TeamsActivity.Send` RSC application permission is always enabled at the tenant level. App users don't need administrator consent to use it.

## RSC permissions for teams and channels

These RSC permissions apply at the team scope. When an agent or app is installed in a team, its channel-related RSC permissions automatically extend to all of the team's channels except [private and shared channels](../../build-apps-for-shared-private-channels.md). Channel-related RSC permissions only extend to private and shared channels in which a user has explicitly enabled the agent or app.

| Permission name | Action | Supported access scenarios |
| ----- | ----- | :-----: |
| `Channel.Create.Group` | Create channels in this team. | App-only |
| `Channel.Delete.Group` | Delete this team's channels. | App-only |
| `ChannelMeeting.ReadBasic.Group` | Read the basic properties of the channel meetings in this team. | App-only |
| `ChannelMeetingParticipant.Read.Group` | Read the participant information including name, role, ID, join and left time of channel meetings associated with this team. | App-only |
| `ChannelMeetingRecording.Read.Group` | Read the recordings of all channel meetings associated with this team. | App-only |
| `ChannelMeetingNotification.Send.Group` | Send notifications in all the channel meetings associated with this team. | App-only |
| `ChannelMessage.Read.Group` | Read and receive all of this team's channel messages. See [Configure an agent to receive all messages in group chats and channels](../../agents-in-teams/enable-receive-all-chat-messages.md). | App-only |
| `ChannelMessage.Send.Group` | Send messages to this team's channels. | App-only |
| `ChannelSettings.Read.Group` | Read the names, descriptions, and settings of this team's channels​. | App-only |
| `ChannelSettings.ReadWrite.Group` | Update the names, descriptions, and settings of this team's channels.​ | App-only |
| `TeamsActivity.Send.Group` | Send activity feed notifications to users in this team. | App-only |
| `TeamsAppInstallation.Read.Group` | Read the apps that are installed in this team. | App-only |
| `TeamMember.Read.Group` | Read this team's members. | App-only |
| `TeamSettings.Read.Group` | Read this team's settings. | App-only |
| `TeamSettings.ReadWrite.Group` | Read and write this team's settings. | App-only |
| `TeamsTab.Create.Group` | Create tabs in this team. | App-only |
| `TeamsTab.Delete.Group` | Delete this team's tabs. | App-only |
| `TeamsTab.Read.Group` | Read this team's tabs. | App-only |
| `TeamsTab.ReadWrite.Group` | Manage this team's tabs. | App-only |
| `ChannelMeetingActiveSpeaker.Read.Group` | Reading the participants who are sending audio into the channel meetings associated with this team. | Delegated |
| `ChannelMeetingAudioVideo.Stream.Group` | Stream audio-video content of channel meetings associated with this team. | Delegated |
| `ChannelMeetingIncomingAudio.Detect.Group` | Detect incoming audio in channel meetings associated with this team. | Delegated |
| `ChannelMeetingStage.Write.Group` | Show content on the meeting stage of channel meetings associated with this team. | Delegated |
| `InAppPurchase.Allow.Group` | Show and complete in-app purchases for users in this team. | Delegated |
| `LiveShareSession.ReadWrite.Group` | Allows the app to create and synchronize Live Share sessions for this team and get access related information, such as name and role, about this team's roster and any associated meetings.  | Delegated |
| `MeetingParticipantReaction.Read.Group` | Read reactions of participants in channel meetings associated with this team. | Delegated |
| `ChannelMember.ReadWrite.Group` | Read and write the members of this team's channels. | App-only |
| `ChannelMember.Read.Group` | Read the members of this team's channels. | App-only |
| `File.Read.Group` | Read information about the files and folders associated with this team’s channels. | App-only |

## RSC permissions for chats and meetings

The only RSC permission relevant to chats in personal scope is `ChatMessageReadReceipt.Read.Chat`.

If a chat has a meeting or a call associated with it, the relevant RSC permissions apply to those resources.

| Permission name | Action | Supported access scenarios |
| ----- | ----- | :-----: |
| `Calls.AccessMedia.Chat` | Access media streams in calls associated with this chat or meeting. | App-only |
| `Calls.JoinGroupCalls.Chat` | Join calls associated with this chat or meeting. | App-only |
| `ChatSettings.Read.Chat` | Read this chat's settings. | App-only |
| `ChatSettings.ReadWrite.Chat` | Read and write this chat's settings. | App-only |
| `ChatMessage.Read.Chat` | Read and receive all of this chat's messages. See [Configure an agent to receive all messages in group chats and channels](../../agents-in-teams/enable-receive-all-chat-messages.md). | App-only |
| `ChatMessageReadReceipt.Read.Chat` | Read the ID of the last seen message in this chat. | App-only |
| `ChatMember.Read.Chat` | Read this chat's members. | App-only |
| `Chat.Manage.Chat` | Manage this chat. | App-only |
| `TeamsTab.Read.Chat` | Read this chat's tabs. | App-only |
| `TeamsTab.Create.Chat` | Create tabs in this chat. | App-only |
| `TeamsTab.Delete.Chat` | Delete this chat's tabs. | App-only |
| `TeamsTab.ReadWrite.Chat` | Manage this chat's tabs. | App-only |
| `TeamsAppInstallation.Read.Chat` | Read the apps that are installed in this chat. | App-only |
| `TeamsActivity.Send.Chat` | Send activity feed notifications to users in this chat. | App-only |
| `OnlineMeetingTranscript.Read.Chat` | Read the transcripts of the meeting associated with this chat. | App-only |
| `OnlineMeeting.ReadBasic.Chat` | Read basic properties of meetings associated with this chat, such as name, schedule, organizer, join link, and start or end notifications. | App-only |
| `OnlineMeetingRecording.Read.Chat` | Read the recordings of the meetings associated with this chat. | App-only |
| `OnlineMeetingNotification.Send.Chat` | Send notifications in the meetings associated with this chat. | App-only |
| `InAppPurchase.Allow.Chat` | Show and complete in-app purchases for users in this chat and any associated meetings. | Delegated |
| `LiveShareSession.ReadWrite.Chat` | Allows the app to create and synchronize Live Share sessions for this chat and get access related information, such as name and role, about this chat's roster and any associated meetings. | Delegated |
| `MeetingStage.Write.Chat` | Show content on the meeting stage of meetings associated with this chat. | Delegated |
| `MeetingParticipantReaction.Read.Chat` | Read the reactions of participants in meetings associated with this chat. | Delegated |
| `OnlineMeetingIncomingAudio.Detect.Chat` | Detect incoming audio in meetings associated with this chat. | Delegated |
| `OnlineMeetingActiveSpeaker.Read.Chat` | Read the participants who are sending audio into the meetings associated with this chat. | Delegated |
| `OnlineMeetingAudioVideo.Stream.Chat` | Stream audio-video content of meetings associated with this chat. | Delegated |
| `OnlineMeetingParticipant.Read.Chat` | Read participant information, including name, role, ID, joined and left times, of meetings associated with this chat. | Delegated or app-only |
| `OnlineMeetingParticipant.ToggleIncomingAudio.Chat` | Toggle incoming audio for participants in meetings associated with this chat. | Delegated |

## RSC permissions for users (personal scope)

| Permission name | Action | Supported access scenarios |
| ----- | ----- | :-----: |
| `CameraStream.Read.User` | Read the user's camera stream. | Delegated |
| `InAppPurchase.Allow.User` | Show and complete in-app purchases. | Delegated |
| `MicrophoneStream.Read.User` | Read the user's microphone stream. | Delegated |
| `MeetingParticipantReaction.Read.User` | Read the user's reactions while participating in a meeting. | Delegated |
| `OutgoingVideoStream.Write.User` | Modify the user's outgoing video. | Delegated |
| `TeamsActivity.Send.User` | Send activity notifications to the user. | App-only |
| `TeamsAppInstallation.Read.User` | Read the apps that are installed in the user's personal scope. | App-only |

## Next step

> [!div class="nextstepaction"]
> [Grant RSC permissions to an app](grant-resource-specific-consent.md)

## See also

* [Microsoft Graph permissions reference](/graph/permissions-reference)
* [App manifest schema for Teams](/microsoft-365/extensibility/schema/)
* [Permissions in Teams app](../App-permissions/Teams-app-permissions.md)
* [Manage custom apps in Teams admin center](/microsoftteams/teams-custom-app-policies-and-settings)
* [Allow members to upload custom apps](/microsoftteams/teams-custom-app-policies-and-settings?branch=main)
