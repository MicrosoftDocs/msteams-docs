---
title: Work with apps for Teams meetings
author: laujan
description: Work with apps for Teams meetings 
ms.topic: conceptual
ms.author: lajanuar
keywords: teams apps meetings user participant role api
---

# Work with apps for Teams meetings

To expand the capabilities of your apps across the meeting lifecycle, Teams enables you to work with apps for Teams meetings. This document covers [prerequisites and considerations](#get-prerequisites-and-considerations) and [meeting apps API references](#use-the-meeting-apps-API-references).

For information on meeting lifecycle, participant roles and user types, see [Apps in Teams meetings](teams-apps-in-meetings.md). Also, see [enabling and configuring your apps for Teams meetings](enable-and-configure-your-app-for-teams-meetings.md). Teams also offers you the ability to interact collaboratively in meetings with the new auditorium view using [Together Mode](teams-together-mode.md).

## Prerequisites and considerations

Before you work with apps for Teams meetings, you must have a basic understanding of the following prerequisites:

* Apps in meetings require some basic knowledge of [Teams app development](../overview.md). An app in a meeting can comprise of [tabs](../tabs/what-are-tabs.md), [bots](../bots/what-are-bots.md), and [messaging extensions](../messaging-extensions/what-are-messaging-extensions.md) features. An app in a meeting requires updates to the Teams [app manifest](#update-your-app-manifest) to indicate that the app is available for meetings.

* For your app to function in the meeting lifecycle as a tab, it must support configurable tabs in the [groupchat scope](../resources/schema/manifest-schema.md#configurabletabs). For more information, see how to [build a group tab](../build-your-first-app/build-channel-tab.md)). To enable your app in [pre-meeting](teams-apps-in-meetings.md#pre-meeting-app-experience) and [post-meeting](teams-apps-in-meetings.md#post-meeting-app-experience) chats, you must support the `groupchat` scope.

* Meeting API URL parameters require `meetingId`, `userId`, and [tenantId](/onedrive/find-your-office-365-tenant-id). These are available as part of the Teams client SDK and bot activity. Additionally, reliable information for user ID and tenant ID can be retrieved using [Tab SSO authentication](../tabs/how-to/authentication/auth-aad-sso.md).

* The `GetParticipant` API requires a [bot registration and ID](../build-your-first-app/build-bot.md) to generate auth tokens.

* You must adhere to general [Teams tab design guidelines](../tabs/design/tabs.md) for pre- and post-meeting scenarios. For experiences during meetings, refer to the [in-meeting tab](../apps-in-teams-meetings/design/designing-apps-in-meetings.md#use-an-in-meeting-tab) and [in-meeting dialog](../apps-in-teams-meetings/design/designing-apps-in-meetings.md#use-an-in-meeting-dialog) design guidelines.

* For your app to update in real time, it must be up-to-date based on event activities in the meeting. These events can be within the in-meeting dialog and other stages across the meeting lifecycle. For in-meeting dialog, refer to completion `bot Id` parameter in `Notification Signal API`.

## Meeting apps API references

The new meeting extensibilities provide you with APIs that could transform the meeting experience. With this new capability, you can build apps or integrate existing apps within the meeting lifecycle. The following table provides a list of these APIs:

|API|Description|Request|Source|
|---|---|----|---|
|**GetUserContext**| This API enables you to get contextual information to display relevant content in a Teams tab. |_**microsoftTeams.getContext( ( ) => {  /*...*/ } )**_|Microsoft Teams client SDK|
|**GetParticipant**| This API allows a bot to fetch participant information by meeting ID and participant ID.|**GET** _**/v1/meetings/{meetingId}/participants/{participantId}?tenantId={tenantId}**_ |Microsoft Bot Framework SDK|
|**NotificationSignal** | This API enables you to provide meeting signals that are delivered using the existing conversation notification API for user-bot chat. This API allows you to signal based on user action that shows an in-meeting dialog box.|**POST** _**/v3/conversations/{conversationId}/activities**_|Microsoft Bot Framework SDK|

### GetUserContext API

To identify and  retrieve contextual information for your tab content, see [get context for your Teams tab](../tabs/how-to/access-teams-context.md#getting-context-by-using-the-microsoft-teams-javascript-library). As part of meetings extensibility, a new value **meetingId** has been added for the response payload. **meetingId** is used by a tab when running in the meeting context.

### GetParticipant API

> [!NOTE]
> * Do not cache participant roles since the meeting organizer can change a role at any point in time.
> * Teams does not currently support large distribution lists or roster sizes of more than 350 participants for the `GetParticipant` API.

The `GetParticipant` API allows a bot to fetch participant information by meeting ID and participant ID. The API includes query parameters, C# or .NET, JavaScript, and JSON examples, and response codes.

#### Query parameters

The `GetParticipant` API includes the following query parameters:

|Value|Type|Required|Description|
|---|---|----|---|
|**meetingId**| string | Yes | The meeting identifier is available through Bot Invoke and Teams Client SDK.|
|**participantId**| string | Yes | The participantId is the user ID. It is available in Tab SSO, Bot Invoke, and Teams Client SDK. It is highly recommended to get a participantId from the Tab SSO. |
|**tenantId**| string | Yes | The tenantId is required for the tenant users. It is available in Tab SSO, Bot Invoke, and Teams Client SDK. It is highly recommended to get a tenantId from the Tab SSO. |

#### Example

The `GetParticipant` API includes the following C# or .NET, JavaScript, and JSON examples:

# [C# or .NET](#tab/dotnet)

```csharp
protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
{
  TeamsMeetingParticipant participant = GetMeetingParticipantAsync(turnContext, "yourMeetingId", "yourParticipantId", "yourTenantId");
  TeamsChannelAccount member = participant.User;
  MeetingParticipantInfo meetingInfo = participant.Meeting;
  ConversationAccount conversation = participant.Conversation;

  await turnContext.SendActivityAsync(MessageFactory.Text($"The participant role is: {meetingInfo.Role}"), cancellationToken);
}

```

# [JavaScript](#tab/javascript)

```typescript

export class MyBot extends TeamsActivityHandler {
    constructor() {
        super();
        this.onMessage(async (context, next) => {
            TeamsMeetingParticipant participant = GetMeetingParticipantAsync(turnContext, "yourMeetingId", "yourParticipantId", "yourTenantId");
            let member = participant.user;
            let meetingInfo = participant.meeting;
            let conversation = participant.conversation;
            
            await context.sendActivity(`The participant role is: '${meetingInfo.role}'`);
            await next();
        });
    }
}

```

# [JSON](#tab/json)

```http
GET /v1/meetings/{meetingId}/participants/{participantId}?tenantId={tenantId}
```

The response body is:

```json
{
   "user":{
      "id":"29:1JKiJGPAX9TTxtGxhVo0wLx_zwzo-gG8Z-X03306vBwi9p-xMTEbDXsT6KH7-0kkTS8cD-2zkrsoV6f5WJ6_aYw",
      "aadObjectId":"e236c4bf-88b1-4f3a-b1d7-8891dfc332b5",
      "name":"Bob Young",
      "givenName":"Bob",
      "surname":"Young",
      "email":"Bob.young@microsoft.com",
      "userPrincipalName":"Bob.young@microsoft.com",
      "tenantId":"2fe477ab-0efc-4dfd-bde2-484374e2c373",
      "userRole":"user"
   },
   "meeting":{
      "role ":"Presenter",
      "inMeeting":true
   },
   "conversation":{
      "id":"<conversation id>",
      "isGroup":true
   }
}
```

* * *

#### Response codes

The `GetParticipant` API includes the following response codes:

|Response code|Description|
|---|---|
| **403** | The app is not allowed to get participant information. This is the most common error response and is triggered if the app is not installed in the meeting. For example, if the app is disabled by tenant admin or blocked during live site migration.|
| **200** | The participant information is successfully retrieved.|
| **401** | The app responds with an invalid token.|
| **404** | The meeting has either expired or participant cannot be found.|
| **500** | The meeting has either expired more than 60 days since the meeting ended or the participant does not have permissions based on their role.|

### NotificationSignal API

All users in a meeting receive the notifications sent through the NotificationSignal API.

> [!NOTE]
> * When an in-meeting dialog is invoked, the content is presented as a chat message.
> * Currently, sending targetted notifications is not supported.
> * When an in-meeting dialog is invoked, the same content will also be presented as a chat message.

`NotificationSignal` API enables you to provide meeting signals that are delivered using the existing conversation notification API for user-bot chat. This API allows you to signal based on user action that shows an in-meeting dialog box. The API includes query parameters, C# or .NET, JavaScript, and JSON examples, and response codes.

#### Query parameters

The `NotificationSignal` API includes the following query parameters:

|Value|Type|Required|Description|
|---|---|----|---|
|**conversationId**| string | Yes | The conversation identifier is available as part of bot invoke |

#### Example

The `Bot ID` is declared in the manifest and the bot receives a result object. In the following example, the `completionBotId` parameter of the `externalResourceUrl` is optional in the requested payload:

> [!NOTE]
> * The `completionBotId` parameter of the `externalResourceUrl` is optional in the requested payload example. `Bot ID` is declared in the manifest and the bot receives a result object.
> * The `externalResourceUrl` width and height parameters must be in pixels. To ensure the dimensions are within the allowed limits, see [design guidelines](design/designing-apps-in-meetings.md).
> * The URL is the page loaded as an `<iframe>` in the in-meeting dialog. The domain must be in the app's `validDomains` array in your app manifest.

The `NotificationSignal` API includes the following C# or .NET, JavaScript, and JSON examples:

# [C# or .NET](#tab/dotnet)

```csharp
Activity activity = MessageFactory.Text("This is a meeting signal test");

activity.ChannelData = new TeamsChannelData
  {
    Notification = new NotificationInfo()
                    {
                        AlertInMeeting = true,
                        ExternalResourceUrl = "https://teams.microsoft.com/l/bubble/APP_ID?url=<url>&height=<height>&width=<width>&title=<title>&completionBotId=BOT_APP_ID"
                    }
  };
await turnContext.SendActivityAsync(activity).ConfigureAwait(false);
```

# [JavaScript](#tab/javascript)

```javascript

const replyActivity = MessageFactory.text('Hi'); // this could be an adaptive card instead
replyActivity.channelData = {
    notification: {
        alertInMeeting: true,
        externalResourceUrl: 'https://teams.microsoft.com/l/bubble/APP_ID?url=<url>&height=<height>&width=<width>&title=<title>&completionBotId=BOT_APP_ID’
    }
};
await context.sendActivity(replyActivity);
```

# [JSON](#tab/json)

```http
POST /v3/conversations/{conversationId}/activities

{
    "type": "message",
    "text": "John Phillips assigned you a weekly todo",
    "summary": "Don't forget to meet with Marketing next week",
    "channelData": {
        "notification": {
            "alertInMeeting": true,
            "externalResourceUrl": "https://teams.microsoft.com/l/bubble/APP_ID?url=<url>&height=<height>&width=<width>&title=<title>&completionBotId=BOT_APP_ID"
        }
    },
    "replyToId": "1493070356924"
}
```

* * *

#### Response codes

The `NotificationSignal` API includes the following response codes:

|Response code|Description|
|---|---|
| **201** | The activity with signal is successfully sent |
| **401** | The app responds with an invalid token. |
| **201** | The activity with signal is successfully sent. |
| **401** | The app responds with an invalid token. |
| **403** | The app is unable to send the signal. This can happen due to various reasons such as the tenant admin disables the app, the app is blocked during live site migration, and so on. In this case, the payload contains a detailed error message. |
| **404** | The meeting chat does not exist. |

## Enable your app for Teams meetings

### Update your app manifest

The meetings app capabilities are declared in your app manifest through the **configurableTabs** -> **scopes** and **context** arrays. *Scope* defines to whom and *context* defines where your app will be available.

> [!NOTE]
> Use [developer preview manifest schema](../resources/schema/manifest-schema-dev-preview.md) to try this in your app manifest.

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

The tab `context` and `scopes` properties work in harmony to allow you to determine where you want your app to appear. Tabs in the `team` or `groupchat` scope can have more than one context. The possible values for the context property are as follows:

* **channelTab**: a tab in the header of a team channel.
* **privateChatTab**: a tab in the header of a group chat between a set of users not in the context of a team or meeting.
* **meetingChatTab**: a tab in the header of a group chat between a set of users in the context of a scheduled meeting.
* **meetingDetailsTab**: a tab in the header of the meeting details view of the calendar.
* **meetingSidePanel**: an in-meeting panel opened via the unified bar (u-bar).

> [!NOTE]
> "Context" property is currently not supported and thus will be ignored on mobile clients.

## Configure your app for meeting scenarios

> [!NOTE]
> * For your app to be visible in the tab gallery it needs to **support configurable tabs** and the **group chat scope**.
>
> * Mobile clients support Tabs only in Pre and Post Meeting Surfaces. The in-meeting experiences (in-meeting dialog and tab) on mobile will be available soon. Follow the [guidance for tabs on mobile](../tabs/design/tabs-mobile.md) when creating your tabs for mobile.

### Before a meeting

Users with organizer and/or presenter roles add tabs to a meeting using the plus ➕ button in the meeting **Chat** and meeting **details** pages. Messaging extensions are added to via the ellipses/overflow menu &#x25CF;&#x25CF;&#x25CF; located beneath the compose message area in the chat. Bots are added to a meeting chat using the "**@**" key and selecting **Get bots**.

✔ The user identity *must* be confirmed via [Tabs SSO](../tabs/how-to/authentication/auth-aad-sso.md). Following this authentication, the app can retrieve the user role via the GetParticipant API.

 ✔ Based on the user role, the app will now have the capability to present role specific experiences. For example, a polling app can allow only organizers and presenters to create a new poll.

> **NOTE**: Role assignments can be changed while a meeting is in progress.  *See* [Roles in a Teams meeting](https://support.microsoft.com/office/roles-in-a-teams-meeting-c16fa7d0-1666-4dde-8686-0a0bfe16e019). 

### During a meeting

#### **sidePanel**

✔ In your app manifest add **sidePanel** to the **context** array as described above.

✔ In the meeting as well as in all scenarios, the app will be rendered in an in-meeting tab that is 320px in width. Your tab must be optimized for this. *See*, [FrameContext interface](https://docs.microsoft.com/javascript/api/@microsoft/teams-js/framecontext?view=msteams-client-js-latest&preserve-view=true
)

✔Refer to the [Teams SDK](../tabs/how-to/access-teams-context.md#user-context) to use the **userContext** API to route requests accordingly.

✔ Refer to the [Teams authentication flow for tabs](../tabs/how-to/authentication/auth-flow-tab.md). Authentication flow for tabs is very similar to the auth flow for websites. Thus, tabs can use OAuth 2.0 directly. *See also*, [Microsoft identity platform and OAuth 2.0 authorization code flow](/azure/active-directory/develop/v2-oauth2-auth-code-flow).

✔ Message extension should work as expected when a user is in an in-meeting view and should be able to post compose message extension cards.

✔ AppName in-meeting - Tooltip should state the app name in-meeting U-bar.

#### **In-meeting dialog**

✔ You must adhere to the [in-meeting dialog design guidelines](design/designing-apps-in-meetings.md#use-an-in-meeting-dialog).

✔ Refer to the [Teams authentication flow for tabs](../tabs/how-to/authentication/auth-flow-tab.md).

✔ Use the [NotificationSignal API](create-apps-for-teams-meetings.md#notificationsignal-api) to signal that a bubble notification needs to be triggered.

✔ As part of the notification request payload, include the URL where the content to be showcased is hosted.

✔ In-meeting dialog must not use task module.

> [!NOTE]
>
> * These notifications are persistent in nature. You must invoke the [**submitTask()**](../task-modules-and-cards/task-modules/task-modules-bots.md#submitting-the-result-of-a-task-module) function to auto-dismiss after a user takes an action in the web-view. This is a requirement for app submission. *See also*, [Teams SDK: task module](/javascript/api/@microsoft/teams-js/microsoftteams.tasks?view=msteams-client-js-latest#submittask-string---object--string---string---&preserve-view=true).
>
> * If you want your app to support anonymous users, your initial invoke request payload must rely on the `from.id`  (ID of the user) request metadata in the `from` object, not the `from.aadObjectId` (Azure Active Directory ID of the user) request metadata. *See* [Using task modules in tabs](../task-modules-and-cards/task-modules/task-modules-tabs.md) and [Create and send the task module](../messaging-extensions/how-to/action-commands/create-task-module.md?tabs=dotnet#the-initial-invoke-request).

## Next steps

> [!div class="nextstepaction"]
> [Enable and configure your apps for Teams meetings](enable-and-configure-your-app-for-teams-meetings.md)
> [!div class="nextstepaction"]
> [Together Mode in Teams](teams-together-mode.md)