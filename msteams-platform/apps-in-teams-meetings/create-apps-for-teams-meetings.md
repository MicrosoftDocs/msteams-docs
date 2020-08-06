---
title: Create apps for teams meetings
author: laujan
description: create apps for teams meetings 
ms.topic: conceptual
ms.author: lajanuar
keywords: teams apps meetings user participant role api 
---
# Create apps for Teams meetings

## Meeting apps API reference

|API|Description|Request|
|---|---|----|
|**GetParticipant**|This API allows a bot to fetch a participant information by meeting id and participant id.|**GET** _**/v1/meetings/{meetingId}/participants/{participantId}?tenantId={tenantId}**_ |
|**GetMeeting**|Get the meeting’s metadata which includes but not limited to: </br>&#9679; Scheduled time </br>&#9679; Start time (if the meeting is started) </br>&#9679; End time (if the meeting is ended) </br>&#9679; Subject|**GET** _**/v1/meetings/{meetingId}**_|
|**GetMeetingParticipants**|Retrieve meeting participants by roster type: </br>&#9679; Invited </br>&#9679;Accepted </br>&#9679; Joined|**GET** __**/v1/meetings/{meetingId}/participants?rosterType={filter type} _**_|
|**GetMeetingNotes**|Get the meeting’s notes metadata information.|**GET** _**/v1/meetings/{meetingId}/notes**_|
|**GetMeetingTranscript**| Get the meeting’s transcript metadata information.|**GET** _**/v1/meetings/{meetingId}/transcript **_|
|**NotificationSignal** |Meeting signals will be delivered using the following existing conversation notification API (for user-bot chat). This API allows developers to signal based on end-user action to show-case an in-meeting notification bubble.|Bot SDK|
|**GetUserContext**| Get contextual information to display relevant content in a Teams tab.| Teams client SDK|

## Enable your app for Teams meetings

### Update your app manifest

The meetings app capabilities are declared in your app manifest via the **configurableTabs** -> **meetingSurfaces** array. The array accepts two optional configuration — **sidePanel** (he right pane in-meeting experience for the app) or **stage**. the **sidePanel** is t and “stage” (rendered in the main shared view of the meeting (as with Whiteboard and InVision today).  

```json
"configurableTabs": [
    {
      "configurationUrl": "https://contoso.com/teamstab/configure",
      "canUpdateConfiguration": true,
      "meetingSurfaces": [
        "sidePanel",
        "stage"
      ],
      "scopes": [
        "team",
        "groupchat"
      ]
    }
  ]
```

## Configure your app for meeting scenarios

> [!NOTE]
> For your app to be visible in the tab gallery it needs to **support configurable tabs** and the **group chat scope**.

### Pre-meeting

Users with organizer and/or presenter roles can add tabs using the plus ➕ button in the meeting **Chat** and meeting **details** pages.

✔ Once the user identity is confirmed, via Tabs SSO, the app can use **userObjectId** and **meetingId** provided from the TeamsSDK to retrieve the user role via GetParticipant API.

 ✔ Based on the user role, the app will now have the capability to present role specific experiences. For example, a polling app can allow only organizers and presenters to create a new poll.

### In-meeting

The **side-panel** and **stage** surfaces (specified in the app manifest) provide the surfaces for app access and interaction.

#### **side-panel**

✔ In your app manifest add **sidePanel** to the **meetingSurfaces** array as described above.

✔ In the meeting, the app will be rendered in a 320&times;320 px right pane. Your tab must be optimized for this.

✔Refer to the Tab SDK section to use the **userContext** API to route requests accordingly.

✔ Refer to the [Teams authentication flow for tabs](../tabs/how-to/authentication/auth-flow-tab.md).

#### **stage**

✔ In your app manifest add **sidePanel** to the **meetingSurfaces** array as described above.

✔ In the meeting, the app will be available in the Share Tray (similar to Whiteboard).

✔ Refer to the [Teams authentication flow for tabs](../tabs/how-to/authentication/auth-flow-tab.md).

### Post-meeting

The post-meeting and pre-meeting configurations are equivalent.

## Examples

1. A user initiates the action on the Tab to create a Poll.

1. The app calls the Teams SDK **getContext** API to retrieve the following:
    - meetingId
    - frameContext

  ![GetContext example](../assets/images/apps-in-meetings/code-sample-one.png)

1. The app calls the **getParticipantRole** API and validates if the user has permissions to create a poll.

1. The app sends an activity to the chat using the **conversationId** to post the Poll to the chat.

## Learn more

 > [!div class="nextstepaction"]
> [Get tips on designing tabs for Teams](../tabs/design/tabs.md)