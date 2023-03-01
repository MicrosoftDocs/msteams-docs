---
title: Overview resource-specific consent in Teams
description: Learn about resource-specific consent (RSC) permissions
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

Users' ability to grant RSC permissions varies based on resource types and access modes. The following are the types of RSC permissions for an app:

* **Application context RSC permissions**: Users authorized to install an app in a specific scope have the right to grant any RSC permissions requested by the app in that specific scope. In addition to installing apps in a specific scope, the following constraints apply for the user to grant RSC permission to access data in app-only mode:
  * In the case of a team, the user must be an owner of that team.
  * In the case of a chat, the user must be a member of the chat.
  * In the case of meetings, the user must be an organizer or presenter in the meeting.
* **Delegated context RSC permissions**: Any user authorized to install an app in a specific scope has the right to grant any RSC permissions requested by the app in that specific scope at the time of installation. For example, if regular members are allowed to install an app inside a team, then they also have the authority to grant delegated RSC permission to the app in that specific team.

### API that supports RSC-based data access

Microsoft Graph SDK, Microsoft Bot Framework SDK, and Microsoft TeamsJS client library support fine-grained data access through RSC. The supported modes and resource types differ across the API surfaces.

| RSC mode or type | Supported SDKs | App manifest version | Resource types | RSC-related controls for the entire tenant | Who can consent to RSC permissions? |
|---------|---------|---------|---------|---------|---------|
|Application| Microsoft Graph, Microsoft Bot Framework | >=1.6 | Teams, chats, and meetings | Microsoft Graph-based controls for chats and meetings, Azure Active Directory (Azure AD) portal-based controls for teams. |• In a team, any team owner. <br> • In a chat, any chat member. <br> • In a meeting, any meeting organizer or presenter. |
| Delegated | Microsoft Teams Client | >=1.12 | Teams, chats, meetings, and users | Always on | Any user authorized to install an app in that specific scope. |

## Supported RSC permissions

The following list provides all the RSC permissions categorized based on resource type and access mode:

* [RSC permissions for a team](#rsc-permissions-for-a-team).
* [RSC permissions for a chat or meeting](#rsc-permissions-for-a-chat-or-meeting).
* [RSC permissions for a user access](#rsc-permissions-for-a-user-access).

RSC permissions are available on the following different resource types:

* [Team](#rsc-permissions-for-a-team) (includes the channels within a team)
* [Chat or meeting](#rsc-permissions-for-a-chat-or-meeting) (includes the meetings associated with the chats)
* [User](#rsc-permissions-for-a-user-access)

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

> [!TIP]
> RSC permissions are only available to Teams apps installed on the Teams client and not part of the Azure AD portal. If you want to know the RSC permissions associated with an app, see app installation or app information dialog within Teams client.

### RSC permissions for a user access

The following RSC permission can be given to an app, which allows users to get access for using different resources.

| Permission name | Action |
| ----- | ----- |
| `CameraStream.Read.User`| Get the user's camera stream. |
| `InAppPurchase.Allow.User` | Show and complete in-app purchases. |
| `MicrophoneStream.Read.User` | Get the user's microphone stream. |
| `MeetingParticipantReaction.Read.User` | Get the user's reactions while participating in a meeting. |
| `OutgoingVideoStream.Write.User` | Modify the user's outgoing video. |

## See also

[Grant RSC permissions to an app](resource-specific-consent.md)
