---
title: Create apps for teams meetings
author: laujan
description: create apps for teams meetings 
ms.topic: conceptual
ms.author: lajanuar
keywords: teams apps meetings user participant role api 
---
# Create apps for Teams meetings (Preview)

>[!IMPORTANT]
> Features included in Microsoft Teams preview are provided for early-access, testing, and feedback purposes only. They may undergo changes before becoming available in the public release and should not be used in production applications.

## Prerequisites and considerations

1. Apps in meetings require some basic knowledge of [Teams app development](../overview.md). An app in a meeting can comprise of [tabs](../tabs/what-are-tabs.md), [bots](../bots/what-are-bots.md), and [messaging extensions](../messaging-extensions/what-are-messaging-extensions.md) features and will require updates to the Teams [app manifest](#update-your-app-manifest) to indicate that the app is available for meetings

1. For your app to function in the meeting lifecycle, it must support configurable tabs in the [groupchat scope](../resources/schema/manifest-schema.md#configurabletabs). *See* [Extend your Teams app with a custom tab](../tabs/how-to/add-tab.md). Supporting the `groupchat` scope will enable your app in [pre-meeting](teams-apps-in-meetings.md#pre-meeting-app-experience) and [post-meeting](teams-apps-in-meetings.md#post-meeting-app-experience) chats.

1. Meeting API URL parameters may require `meetingId`, `userId`, and the `[tenantId`](/onedrive/find-your-office-365-tenant-id) These are available as part of the Teams Client SDK. Additionally, reliable information for user ID and tenant ID can be retrieved when the Tab uses SSO authentication.

1. Some meeting APIs, such as `GetParticipant` will require a [bot registration and bot app ID](../bots/how-to/create-a-bot-for-teams.md#with-an-azure-subscription) to generate auth tokens.

1. Adherence to the [Teams tab design guidelines](../tabs/design/tabs.md) is a best practice for tabs.

## Meeting apps API reference

|API|Description|Request|Source|
|---|---|----|---|
|**GetParticipant**|This API allows a bot to fetch a participant information by meeting id and participant id.|**GET** _**/v1/meetings/{meetingId}/participants/{participantId}?tenantId={tenantId}**_ |Microsoft Bot Framework SDK|
|**NotificationSignal** |Meeting signals will be delivered using the following existing conversation notification API (for user-bot chat). This API allows developers to signal based on end-user action to show-case an in-meeting notification bubble.|**POST** _**/v3/conversations/{conversationId}/activities**_|Microsoft Bot Framework SDK|
|**GetUserContext**| Get contextual information to display relevant content in a Teams tab. |_**microsoftTeams.getContext( ( ) => {  /*...*/ } )**_|Microsoft Teams client SDK|

### GetParticipant API

#### Request

```http
GET /v1/meetings/{meetingId}/participants/{participantId}?tenantId={tenantId}
```

#### Query parameters

**meetingId**. The meeting identifier is required.  
**participantId**. The participant identifier is required.  
**tenantId**. Tenant id of the participant. Required for tenant user.

#### Response Payload
<!-- markdownlint-disable MD036 -->

**Example 1**

```json
{
    "meetingRole":"<meeting role>",
    "conversation":
        {
            "id": "<conversation id>"
        }
}
```

**meetingRole** can be *organizer*, *presenter*, or *attendee*.

**Example 2**

```json
{
    "meetingRole": "Attendee",
    "conversation": {
        "isGroup": true,
        "id": "sample" }
}
```

#### Response Codes

**200**: participant information successfully retrieved  
**401**: invalid token  
**403**: the app is not allowed to get participant information. There can be many reasons: app disabled by tenant admin, blocked during live site mitigation, etc.    
**404**: the meeting doesn't exist or participant can’t be found    

<!-- markdownlint-disable MD024 -->
### NotificationSignal API

#### Request

```http
POST /v3/conversations/{conversationId}/activities
```

#### Query parameters

**conversationId**: The conversation identifier. Required

#### Request Payload

**Example 1**

```json
{
"channelData": {
    "notification": {
        "alertInMeeting": true,

        "externalResourceUrl: "https://teams.microsoft.com/l/bubble/APP_ID?url=<TaskInfo.url>&height=<TaskInfo.height>      &width=<TaskInfo.width> &title=<TaskInfo.title> ”
                      }
                 }
            }
```

**Example 2**

```nodejs
const replyActivity = MessageFactory.text('Hi'); // this could be an adaptive card instead
        replyActivity.channelData = {
            notification: {
                alertInMeeting: true,
                externalResourceUrl: 'https://teams.microsoft.com/l/bubble/APP_ID?url=<TaskInfo.url> &height=<TaskInfo.height>      &width=<TaskInfo.width> &title=<TaskInfo.title>’
            }
        };
        await context.sendActivity(replyActivity);
```

**Example 3**

```csharp
var replyActivity = MessageFactory.text('Hi'); // this could be an adaptive card insteadreplyActivity.ChannelData = new TeamsChannelData{
    Notification: new NotificationInfo(alertInMeeting: true, externalResourceUrl: 'https://teams.microsoft.com/l/bubble/APP_ID?url=<TaskInfo.url> &height=<TaskInfo.height>      &width=<TaskInfo.width> &title=<TaskInfo.title>’
};
await context.sendActivity(replyActivity);
```

#### Response Codes

**201**: activity with signal is successfully sent  
**401**: invalid token  
**403**: the app is not allowed to send the signal. In this case, the payload should contain more detail error message. There can be many reasons: app disabled by tenant admin, blocked during live site mitigation, etc.  
**404**: meeting chat doesn't exist  

#### GetUserContext

Please refer to our [Get context for your Teams tab](../tabs/how-to/access-teams-context.md#getting-context-by-using-the-microsoft-teams-javascript-library) documentation for guidance on identifying and  retrieving contextual information for your tab content. As part of meetings extensibility, new values have been added for the request payload:

1. **meetingId**: used by a tab when running in the meeting context. 

1. **tenantId - tid**: Azure AD tenant ID of the current user.  

1. **ParticipantId** - userObjectId: The Azure AD object id of the current user, in the current tenant"

## Enable your app for Teams meetings

### Update your app manifest

The meetings app capabilities are declared in your app manifest via the **configurableTabs** -> **scopes** and **context** arrays. *Scope* defines to whom and *context* defines where your app will be available.

```json
"configurableTabs": [
    {
      "configurationUrl": "https://contoso.com/teamstab/configure",
      "canUpdateConfiguration": true,
      "scopes": [
        "team",
        "groupchat"
      ],
      "context":[
        "personalTab",
        "channelTab",
        "privateChatTab",
        "meetingChatTab",
        "meetingDetailsTab",
        "meetingSidePanel"
     ]
    }
  ]
```

### Context property

The tab `context` and `scopes` properties work in harmony to allow you to determine where you want your app to appear. While tabs in the `personal` scope can only have one context, i.e., `personalTab`,  `team` or `groupchat` scoped tabs can have more than one context. The possible values for the context property are as follows:

* **personalTab**: a tab in the header of an app launched from the user’s app bar.
* **channelTab**: a tab in the header of a team channel.
* **privateChatTab**: a tab in the header of a group chat between a set of users not in the context of a team or meeting.
* **meetingChatTab**: a tab in the header of a group chat between a set of users in the context of a scheduled meeting.
* **meetingDetailsTab**: a tab in the header of the meeting details view of the calendar.
* **meetingSidePanel**: an in-meeting panel opened via the unified bar (u-bar).

## Configure your app for meeting scenarios

> [!NOTE]
> For your app to be visible in the tab gallery it needs to **support configurable tabs** and the **group chat scope**.

### Pre-meeting

Users with organizer and/or presenter roles can add tabs using the plus ➕ button in the meeting **Chat** and meeting **details** pages.

✔ Once the user identity is confirmed, via Tabs SSO, the app can use **userObjectId** and **meetingId** provided from the TeamsSDK to retrieve the user role via GetParticipant API.

 ✔ Based on the user role, the app will now have the capability to present role specific experiences. For example, a polling app can allow only organizers and presenters to create a new poll.

### In-meeting

The **side-panel** (specified in the app manifest) provides the surface for app access and interaction.

#### **side-panel**

✔ In your app manifest add **sidePanel** to the **meetingSurfaces** array as described above.

✔ In the meeting, the app will be rendered in a right panel that is 320px in width. Your tab must be optimized for this.

✔Refer to the Tab SDK section to use the **userContext** API to route requests accordingly.

✔ Refer to the [Teams authentication flow for tabs](../tabs/how-to/authentication/auth-flow-tab.md).

#### **in-meeting dialog**

✔ Review the [in-meeting dialog design guidelines](https://review.docs.microsoft.com/en-us/microsoftteams/platform/designing-your-app/designing-in-meeting-dialog?branch=restructure-design-topics-ia)

✔ Refer to the [Teams authentication flow for tabs](../tabs/how-to/authentication/auth-flow-tab.md).

✔ Use the [notification](/graph/api/resources/projectrome-notification?view=graph-rest-beta&preserve-view=true) API to signal that a bubble notification needs to be triggered.

✔ As part of the notification request payload, include the URL where the content to be showcased is hosted.

> [!NOTE]
> These notifications are persistent in nature. You must invoke the [**submitTask()**](../task-modules-and-cards/task-modules/task-modules-bots.md#submitting-the-result-of-a-task-module) function to auto-dismiss after a user takes an action in the web-view. This is a requirement for app submission. *See also*, [Teams SDK: tasks module](/javascript/api/@microsoft/teams-js/microsoftteams.tasks?view=msteams-client-js-latest#submittask-string---object--string---string---).

### Post-meeting

The post-meeting and pre-meeting configurations are equivalent.

## Meeting app sample

 > [!div class="nextstepaction"]
> [Meeting token generator app](https://github.com/OfficeDev/microsoft-teams-sample-meetings-token)
