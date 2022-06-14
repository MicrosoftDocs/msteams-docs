---
title: Meeting apps API references
author: surbhigupta
description: Identify the meeting apps API references with examples and Code samples, Teams apps meetings user participant role api user context notification signal query.
ms.topic: conceptual
ms.author: lajanuar
ms.localizationpriority: medium
---

# Meeting apps API references

The meeting extensibility provide APIs to enhance meeting experience. You can perform the following with help of the listed APIs:

* Build apps or integrate existing apps within meeting lifecycle.
* Use APIs to make your app aware of meeting.
* Select required APIs to improve the meeting experience.

> [!NOTE]
> Use Teams [JavaScript SDK](/javascript/api/overview/msteams-client?view=msteams-client-js-latest&preserve-view=true) (*Version*: 1.10 and later) for SSO to work in meeting side panel.

The following table provides a list of APIs available across the Microsoft Teams Client (MSTC) and Microsoft Bot Framework (MSBF) SDKs:

|Method| Description| Source|
|---|---|----|
|[**Get user context**](#get-user-context-api)| Get contextual information to display relevant content in a Teams tab.| [MSTC SDK](/microsoftteams/platform/tabs/how-to/access-teams-context#get-context-by-using-the-microsoft-teams-javascript-library) |
|[**Get participant**](#get-participant-api)| Fetch participant information by meeting ID and participant ID. | [MSBF SDK](/dotnet/api/microsoft.bot.builder.teams.teamsinfo.getmeetingparticipantasync?view=botbuilder-dotnet-stable&preserve-view=true)
|[**Send in-meeting notification**](#send-an-in-meeting-notification)| Provide meeting signals using the existing conversation notification API for user-bot chat and allows to notify user action that shows an in-meeting notification. | [MSBF SDK](/dotnet/api/microsoft.bot.builder.teams.teamsactivityextensions.teamsnotifyuser?view=botbuilder-dotnet-stable&preserve-view=true) |
|[**Get meeting details**](#get-meeting-details-api)| Get a meeting's static metadata. | [MSBF SDK](/dotnet/api/microsoft.bot.builder.teams.teamsinfo.getmeetinginfoasync?view=botbuilder-dotnet-stable&preserve-view=true) |
|[**Send real-time captions**](#send-real-time-captions-api)| Send real-time captions to an ongoing meeting. | [MSTC SDK](/azure/cognitive-services/speech-service/speech-sdk?tabs=nodejs%2Cubuntu%2Cios-xcode%2Cmac-xcode%2Candroid-studio#get-the-speech-sdk&preserve-view=true) |
|[**Share app content to stage**](#share-app-content-to-stage-api)| Share specific parts of the app to meeting stage from the app side panel in a meeting. | [MSTC SDK](/javascript/api/@microsoft/teams-js/microsoftteams.meeting?view=msteams-client-js-latest&preserve-view=true) |
|[**Get app content stage sharing state**](#get-app-content-stage-sharing-state-api)| Fetch information about app's sharing state on the meeting stage. | [MSTC SDK](/javascript/api/@microsoft/teams-js/microsoftteams.meeting.iappcontentstagesharingstate?view=msteams-client-js-latest&preserve-view=true) |
|[**Get app content stage sharing capabilities**](#get-app-content-stage-sharing-capabilities-api)| Fetch the app's capabilities for sharing to the meeting stage. | [MSTC SDK](/javascript/api/@microsoft/teams-js/microsoftteams.meeting.iappcontentstagesharingcapabilities?view=msteams-client-js-latest&preserve-view=true) |
|[**Get real-time Teams meeting events**](#get-real-time-teams-meeting-events-api)|Fetch real-time meeting events, such as actual start and end time.| [MSBF SDK](/dotnet/api/microsoft.bot.builder.teams.teamsactivityhandler.onteamsmeetingstartasync?view=botbuilder-dotnet-stable&preserve-view=true) |

## Get user context API

To identify and retrieve contextual information for your tab content, see [get context for your Teams tab](../tabs/how-to/access-teams-context.md#get-context-by-using-the-microsoft-teams-javascript-library). `meetingId` is used by a tab running in the meeting context and is added for the response payload.

## Get participant API

The `GetParticipant` API must have a bot registration and ID to generate auth tokens. For more information, see [bot registration and ID](../build-your-first-app/build-bot.md).

> [!NOTE]
>
> * Do not cache participant roles since the meeting organizer can change the roles any time.
> * Currently, the `GetParticipant` API is only supported for distributions lists or rosters with less than 350 participants.

### Query parameters

> [!TIP]
> Get participant IDs and tenant IDs from the [tab SSO authentication](../tabs/how-to/authentication/tab-sso-overview.md).

The `Meeting` API must have `meetingId`, `participantId`, and `tenantId` as URL parameters. The parameters are available as part of the Teams Client SDK and bot activity.

The following table includes the query parameters:

|Value|Type|Required|Description|
|---|---|----|---|
|**meetingId**| String | Yes | The meeting identifier is available through Bot Invoke and Teams Client SDK.|
|**participantId**| String | Yes | The participant ID is the user ID. It's available in Tab SSO, Bot Invoke, and Teams Client SDK. It's recommended to get a participant ID from the Tab SSO. |
|**tenantId**| String | Yes | The tenant ID is required for the tenant users. It's available in Tab SSO, Bot Invoke, and Teams Client SDK. It's recommended to get a tenant ID from the Tab SSO. |

### Example

# [C#](#tab/dotnet)

```csharp
protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
{
  TeamsMeetingParticipant participant = await TeamsInfo.GetMeetingParticipantAsync(turnContext, "yourMeetingId", "yourParticipantId", "yourParticipantTenantId").ConfigureAwait(false);
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
            TeamsMeetingParticipant participant = getMeetingParticipant(turnContext, "yourMeetingId", "yourParticipantId", "yourTenantId");
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
      "conversationType": "groupChat", 
      "isGroup":true
   }
}
```

---

| Property name | Purpose |
|---|---|
| **user.id** | ID of the user. |
| **user.aadObjectId** | Azure Active Directory object ID of the user. |
| **user.name** | Name of the user. |
| **user.givenName** | First Name of the user.|
| **user.surname** | Last Name of the user. |
| **user.email** | Mail Id of the user. |
| **user.userPrincipalName** | UPN of the user. |
| **user.tenantId** | Azure Active Directory tenant ID. |
| **user.userRole** | Role of the user e.g. 'admin' or 'user'. |
| **meeting.role** | The participant's role in the meeting. e.g. 'Organizer' or 'Presenter' or 'Attendee'. |
| **meeting.inMeeting** | The value indicating if the participant is in the meeting. |
| **conversation.id** | The meeting chat ID. |
| **conversation.isGroup** | Boolean indicating whether conversation has more than two participants. |

### Response codes

The following table provides the response codes:

|Response code|Description|
|---|---|
| **403** | Get participant information isn't shared with the app. If the app isn't installed in the meeting, it triggers the error response 403. If the tenant admin disables or blocks the app during live site migration, it triggers the error response 403. |
| **200** | The participant information is successfully retrieved.|
| **401** | The app responds with an invalid token.|
| **404** | The meeting has either expired or participants aren't available.|

## Send an in-meeting notification

All users in a meeting receive the notifications sent through in-meeting notification payload. In-meeting notification payload triggers an in-meeting notification and enables you to provide meeting signals that are delivered using the existing conversation notification API for user-bot chat. You can send an in-meeting notification based on user action. The payload is available through Bot Services.

> [!NOTE]
>
> * When an in-meeting notification is invoked, the content is presented as a chat message.
> * Currently, sending targeted notifications and support for webapp are not supported.
> * You must invoke the [submitTask()](../task-modules-and-cards/task-modules/task-modules-bots.md#submit-the-result-of-a-task-module) function to dismiss automatically after a user takes an action in the web view. This is a requirement for app submission. For more information, see [Teams SDK task module](/javascript/api/@microsoft/teams-js/microsoftteams.tasks?view=msteams-client-js-latest#submittask-string---object--string---string---&preserve-view=true).
> * If you want your app to support anonymous users, initial invoke request payload must rely on `from.id` request metadata in `from` object, not `from.aadObjectId` request metadata. `from.id` is the user ID and `from.aadObjectId` is the Microsoft Azure Active Directory (Azure AD) ID of the user. For more information, see [using task modules in tabs](../task-modules-and-cards/task-modules/task-modules-tabs.md) and [create and send the task module](../messaging-extensions/how-to/action-commands/create-task-module.md?tabs=dotnet#the-initial-invoke-request).

### Query parameter

The following table includes the query parameters:

|Value|Type|Required|Description|
|---|---|----|---|
|**conversationId**| String | Yes | The conversation identifier is available as part of Bot Invoke. |

### Examples

The `Bot ID` is declared in the manifest and the bot receives a result object.

> [!NOTE]
>
> * The `completionBotId` parameter of the `externalResourceUrl` is optional in the requested payload example.
> * The `externalResourceUrl` width and height parameters must be in pixels. For more information, see [design guidelines](design/designing-apps-in-meetings.md).
> * The URL is the page, which loads as `<iframe>` in the in-meeting notification. The domain must be in the apps' `validDomains` array in your app manifest.

# [C#](#tab/dotnet)

```csharp
Activity activity = MessageFactory.Text("This is a meeting signal test");
activity.TeamsNotifyUser(true, "https://teams.microsoft.com/l/bubble/APP_ID?url=<url>&height=<height>&width=<width>&title=<title>&completionBotId=BOT_APP_ID");
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
```

```json

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

---

| Property name | Purpose |
|---|---|
| **type** | Type of activity. |
| **text** | The text content of the message. |
| **summary** | The summary text of the message. |
| **channelData.notification.alertInMeeting** | Boolean indicating if a notification is to be shown to the user while in a meeting. |
| **channelData.notification.externalResourceUrl** | The value of the notification's external resource URL.|
| **replyToId** | The ID of the parent or root message of the thread. |

### Response codes

The following table includes the response codes:

|Response code|Description|
|---|---|
| **201** | The activity with signal is successfully sent. |
| **401** | The app responds with an invalid token. |
| **403** | The app is unable to send the signal. 403 response code can occur because of various reasons, such as the tenant admin disables and blocks the app during live site migration. In this case, the payload contains a detailed error message. |
| **404** | The meeting chat doesn't exist. |

## Get meeting details API

The Meeting Details API enables your app to get a meeting's static metadata. The metadata provides data points that don't change dynamically. The API is available through Bot Services. Currently, both private scheduled or recurring meetings and channel scheduled or recurring meetings support API with different RSC permissions respectively.

The `Meeting Details` API must have a bot registration and bot ID. It requires Bot SDK to get `TurnContext`. To use the Meeting Details API, you must obtain different RSC permission based on the scope of any meeting, such as private meeting or channel meeting.

### Prerequisite

To use the Meeting Details API, you must obtain different RSC permission based on the scope of any meeting, such as private meeting or channel meeting.

<br>

<details>

<summary><b>For app manifest version 1.12</b></summary>

Use the following example to configure your app manifest's `webApplicationInfo`  and `authorization` properties for any private meeting:

```json
"webApplicationInfo": {
    "id": "<bot id>",
    "resource": "https://RscPermission",
},
"authorization": {
    "permissions": {
        "resourceSpecific": [
            {
                "name": "OnlineMeeting.ReadBasic.Chat",
                "type": "Application"
            }
        ]
    }
}
 ```

Use the following example to configure your app manifest's `webApplicationInfo` and `authorization` properties for any channel meeting:

```json
"webApplicationInfo": {
    "id": "<bot id>",
    "resource": "https://RscPermission",
},
"authorization": {
    "permissions": {
        "resourceSpecific": [
            {
                "name": "ChannelMeeting.ReadBasic.Group",
                "type": "Application"
            }
        ]
    }
}
 ```

<br>

</details>

<br>

<details>

<summary><b>For app manifest version 1.11 or earlier</b></summary>

Use the following example to configure your app manifest's `webApplicationInfo` property for any private meeting:

```json
"webApplicationInfo": {
    "id": "<bot id>",
    "resource": "https://RscPermission",
    "applicationPermissions": [
      "OnlineMeeting.ReadBasic.Chat"
    ]
}
 ```

Use the following example to configure your app manifest's `webApplicationInfo` property for any channel meeting:

```json
"webApplicationInfo": {
    "id": "<bot id>",
    "resource": "https://RscPermission",
    "applicationPermissions": [
      "ChannelMeeting.ReadBasic.Group"
    ]
}
 ```

<br>

</details>

> [!NOTE]
>
> * The bot can receive meeting start or end events automatically from all the meetings created in all the channels by adding `ChannelMeeting.ReadBasic.Group` to manifest for RSC permission.
>
> * For one-on-one and group calls `organizer` is the initiator of the call.

### Query parameter

The following table lists the query parameter:

|Value|Type|Required|Description|
|---|---|----|---|
|**meetingId**| String | Yes | The meeting identifier is available through Bot Invoke and Teams Client SDK. |

### Example

# [C#](#tab/dotnet)

```csharp
MeetingInfo result = await TeamsInfo.GetMeetingInfoAsync(turnContext);
await turnContext.SendActivityAsync(JsonConvert.SerializeObject(result));
```

# [JavaScript](#tab/javascript)

```javascript

Not available

```

# [JSON](#tab/json)

```http
GET /v1/meetings/{meetingId}
```

The JSON response body for Meeting Details API is as follows:

* **Scheduled meetings:**

    ```json

       "details": { 
            "id": "meeting ID", 
            "msGraphResourceId": "MSowYmQ0M2I4OS1lN2QxLTQxNzAtOGZhYi00OWJjYjkwOTk1YWYqMCoqMTk6bWVldGluZ19OVEkyT0RjM01qUXROV1UyW", 
            "scheduledStartTime": "2020-08-21T02:30:00+00:00", 
            "scheduledEndTime": "2020-08-21T03:00:00+00:00", 
            "joinUrl": "https://teams.microsoft.com/l/xx", 
            "title": "All Hands", 
            "type": "Scheduled" 
        }, 
        "conversation": { 
                "isGroup": true, 
                "conversationType": "groupchat", 
                "id": "meeting chat ID" 
        }, 
        "organizer": { 
            "id": "<organizer user ID>", 
            "aadObjectId": "<AAD ID>", 
            "tenantId": "<Tenant ID>" 
        }
        } 
    ```

* **One-on-one calls:**

    ```json
    {
        "details": {
            "id": "meeting ID",
            "type": "OneToOneCall"
        },
        "conversation": {
            "isGroup": true,
            "conversationType": "groupChat",
            "id": "meeting chat ID"
        },
        "organizer  ": {
            "id": "<organizer user ID>",
            "aadObjectId": "<AAD ID>",
            "tenantId": "<Tenant ID>" 
        }
    }
    
    ```

* **Group calls:**

    ```json
    {
        "details": {
            "id": "meeting ID",
            "type": "GroupCall",
            "joinUrl": "https://teams.microsoft.com/l/xx"
        },
        "conversation": {
            "isGroup": true,
            "conversationType": "groupChat",
            "id": "meeting chat ID"
        },
        "organizer": {
            "id": "<organizer user ID>",
            "objectId": "<object ID>",
            "aadObjectId": "<AAD ID>",
            "tenantId": "<Tenant ID>" 
        }
    }
    
    ```

* **Instant meetings:**

    ```json
    { 
       "details": { 
            "id": "meeting ID", 
            "msGraphResourceId": "MSowYmQ0M2I4OS1lN2QxLTQxNzAtOGZhYi00OWJjYjkwOTk1YWYqMCoqMTk6bWVldGluZ19OVEkyT0RjM01qUXROV1UyW", 
            "scheduledStartTime": "2020-08-21T02:30:00+00:00", 
            "scheduledEndTime": "2020-08-21T03:00:00+00:00", 
            "joinUrl": "https://teams.microsoft.com/l/xx", 
            "title": "All Hands", 
            "type": "MeetNow" 
        }, 
        "conversation": { 
                "isGroup": true, 
                "conversationType": "groupchat", 
                "id": "meeting chat ID" 
        }, 
        "organizer": { 
            "id": "<organizer user ID>", 
            "aadObjectId": "<AAD ID>", 
            "tenantId": "<Tenant ID>" ,
            "objectId": "<object ID>",
        }
    }
    
    ```

---

| Property name | Purpose |
|---|---|
| **details.id** | The meeting's Id, encoded as a BASE64 string. |
| **details.msGraphResourceId** | The MsGraphResourceId, used specifically for MS Graph API calls. |
| **details.scheduledStartTime** | The meeting's scheduled start time, in UTC. |
| **details.scheduledEndTime** | The meeting's scheduled end time, in UTC. |
| **details.joinUrl** | The URL used to join the meeting. |
| **details.title** | The title of the meeting. |
| **details.type** | The meeting's type - e.g. Adhoc, Broadcast, MeetNow, Recurring, Scheduled, Unknown. |
| **conversation.isGroup** | Boolean indicating whether conversation has more than two participants. |
| **conversation.conversationType** | The conversation type. |
| **conversation.id** | The meeting chat ID. |
| **organizer.id** | The Organizer's user ID. |
| **organizer.aadObjectId** | The Organizer's Azure Active Directory object ID. |
| **organizer.tenantId** | The Organizer's Azure Active Directory tenant ID. |

In case of Recurring meeting type,

**startDate**: Specifies the date to start applying the pattern. The value of startDate must correspond to the date value of the start property on the event resource. Note that the first occurrence of the meeting may not occur on this date if it does not fit the pattern.

**endDate**: Specifies the date to stop applying the pattern. Note that the last occurrence of the meeting may not occur on this date if it does not fit the pattern.

## Send real-time captions API

The send real-time captions API exposes a POST endpoint for Microsoft Teams communication access real-time translation (CART) captions, human-typed closed captions. Text content sent to this endpoint appears to end users in a Microsoft Teams meeting when they have captions enabled.

### CART URL

You can get the CART URL for the POST endpoint from the **Meeting options** page in a Microsoft Teams meeting. For more information, see [CART captions in a Microsoft Teams meeting](https://support.microsoft.com/office/use-cart-captions-in-a-microsoft-teams-meeting-human-generated-captions-2dd889e8-32a8-4582-98b8-6c96cf14eb47). You don't need to modify the CART URL to use CART captions.

#### Query Parameter

The CART URL includes the following query parameters:

|Value|Type|Required|Description|
|---|---|----|----|
|**meetingId**| String | Yes |The meeting identifier is available through Bot Invoke and Teams Client SDK. <br/>For example, meetingid=%7b%22tId%22%3a%2272f234bf-86f1-41af-91ab-2d7cd0321b47%22%2c%22oId%22%3a%22e071f268-4241-47f8-8cf3-fc6b84437f23%22%2c%22thId%22%3a%2219%3ameeting_NzJiMjNkMGQtYzk3NS00ZDI1LWJjN2QtMDgyODVhZmI3NzJj%40thread.v2%22%2c%22mId%22%3a%220%22%7d|
|**token**| String | Yes |Authorization token.<br/> For example, token=04751eac |

#### Example

```http
https://api.captions.office.microsoft.com/cartcaption?meetingid=%7b%22tId%22%3a%2272f234bf-86f1-41af-91ab-2d7cd0321b47%22%2c%22oId%22%3a%22e071f268-4241-47f8-8cf3-fc6b84437f23%22%2c%22thId%22%3a%2219%3ameeting_NzJiMjNkMGQtYzk3NS00ZDI1LWJjN2QtMDgyODVhZmI3NzJj%40thread.v2%22%2c%22mId%22%3a%220%22%7d&token=gjs44ra
```

### Method

|Resource|Method|Description|
|----|----|----|
|/cartcaption|POST|Handle captions for meeting, which was started|

> [!NOTE]
> Ensure that the content type for all requests is plain text with UTF-8 encoding. The body of request contains only captions.

#### Example

```http
POST /cartcaption?meetingid=04751eac-30e6-47d9-9c3f-0b4ebe8e30d9&token=04751eac&lang=en-us HTTP/1.1
Host: api.captions.office.microsoft.com
Content-Type: text/plain
Content-Length: 22
Hello I’m Cortana, welcome to my meeting. 
```

> [!Note]  
> Each POST request generates a new line of captions. To ensure that the end user has enough time to read the content, limit each POST request body to 80-120 characters.

### Error codes

The following table provides the error codes:

|Error code|Description|
|---|---|
| **400** | Bad request. The response body has more information. For example, not of all required parameters presented.|
| **401** | Unauthorized. Bad or expired token. If you receive this error, generate a new CART URL in Teams. |
| **404** | Meeting not found or not started. If you receive this error, ensure that you start the meeting and select start captions. After captions are enabled in the meeting, you can begin POSTing captions into the meeting.|
| **500** |Internal server error. For more information, [contact support or provide feedback](../feedback.md).|

## Share app content to stage API

The `shareAppContentToStage` API enables you to share specific parts of your app to the meeting stage. The API is available through the Teams client SDK.

### Prerequisite

* To use the `shareAppContentToStage` API, you must obtain the RSC permissions. In the app manifest, configure the `authorization` property, and the `name` and `type` in the `resourceSpecific` field. For example:

    ```json
    "authorization": {
        "permissions": { 
        "resourceSpecific": [
        { 
        "name": "MeetingStage.Write.Chat",
        "type": "Delegated"
        }
        ]
    }
    }
    ```

* `appContentUrl` must be allowed by `validDomains` array inside manifest.json, else API would return 501.

### Query parameter

The following table includes the query parameters:

|Value|Type|Required|Description|
|---|---|----|---|
|**callback**| String | Yes | Callback contains two parameters, error and result. The *error* can either contain an error of type *SdkError*, or null when share is successful. The *result* can either contain a true value, in case of a successful share, or null when the share fails.|
|**appContentURL**| String | Yes | The URL that will be shared on to the stage.|

### Example

```javascript
const appContentUrl = "https://www.bing.com/";

microsoftTeams.meeting.shareAppContentToStage((err, result) => {
    if (result) {
        // handle success
    }
    if (err) {
        // handle error
    }
}, appContentUrl);
```

### Response codes

The following table provides the response codes:

|Response code|Description|
|---|---|
| **500** | Internal error. |
| **501** | API isn't supported in the current context.|
| **1000** | App doesn't have proper permissions to allow share to stage.|

## Get app content stage sharing state API

The `getAppContentStageSharingState` API enables you to fetch information about apps' sharing on the meeting stage.

### Query parameter

The following table includes the query parameters:

|Value|Type|Required|Description|
|---|---|----|---|
|**callback**| String | Yes | Callback contains two parameters, error and result. The *error* can either contain an error of type *SdkError*, in case of an error, or null when share is successful. The *result* can either contain an `AppContentStageSharingState` object, indicating successful retrieval, or null, indicating failed retrieval.|

### Example

```javascript
microsoftTeams.meeting.getAppContentStageSharingState((err, result) => {
    if (result.isAppSharing) {
        // Indicates app has permission to share contents to meeting stage.
    }
});
```

The JSON response body for the `getAppContentStageSharingState` API is:

```json
{
   "isAppSharing":true
} 
```

### Response codes

The following table provides the response codes:

|Response code|Description|
|---|---|
| **500** | Internal error. |
| **501** | API isn't supported in the current context.|
| **1000** | App doesn't have proper permissions to allow share to stage.|

## Get app content stage sharing capabilities API

The `getAppContentStageSharingCapabilities` API enables you to fetch the app's capabilities for sharing to meeting stage.

### Query parameter

The following table includes the query parameters:

|Value|Type|Required|Description|
|---|---|----|---|
|**callback**| String | Yes | Callback contains two parameters, error and result. The *error* can either contain an error of type *SdkError*, or null when share is successful. The result can either contain an `AppContentStageSharingState` object, indicating successful retrieval, or null, indicating failed retrieval.|

### Example

```javascript
microsoftTeams.meeting.getAppContentStageSharingCapabilities((err, result) => {
    if (result.doesAppHaveSharePermission) {
        // Indicates app has permission to share contents to meeting stage.
    }
});
```

The JSON response body for `getAppContentStageSharingCapabilities` API is:

```json
{
   "doesAppHaveSharePermission":true
} 
```

### Response codes

The following table provides the response codes:

|Response code|Description|
|---|---|
| **500** | Internal error. |
| **1000** | App doesn't have permissions to allow share to stage.|

## Get real-time Teams meeting events API

> [!NOTE]
> Real-time Teams meeting events are only supported for scheduled meetings.

The user can receive real-time meeting events. As soon as any app is associated with a meeting, the actual meeting start and end time are shared with the bot. The actual start and end time of a meeting are different from scheduled start and end time. The Meeting Details API provides the scheduled start and end time. The event provides the actual start and end time.

You must be familiar with the `TurnContext` object available through the Bot SDK. The `Activity` object in `TurnContext` contains the payload with the actual start and end time. Real-time meeting events require a registered bot ID from the Teams platform. The bot can automatically receive meeting start or end event by adding `ChannelMeeting.ReadBasic.Group` in the manifest.

### Prerequisite

Your app manifest must have the `webApplicationInfo` property to receive the meeting start and end events. Use the following examples to configure your manifest:

<br>

<details>

<summary><b>For app manifest version 1.12</b></summary>

```json
"webApplicationInfo": {
    "id": "<bot id>",
    "resource": "https://RscPermission",
    },
"authorization": {
    "permissions": {
        "resourceSpecific": [
            {
                "name": "OnlineMeeting.ReadBasic.Chat",
                "type": "Application"
            }
        ]    
    }
}
 ```

<br>

</details>

<br>

<details>

<summary><b>For app manifest version 1.11 or earlier</b></summary>

```json
"webApplicationInfo": {
    "id": "<bot id>",
    "resource": "https://RscPermission",
    "applicationPermissions": [
      "OnlineMeeting.ReadBasic.Chat"
    ]
}
 ```

<br>

</details>

### Example of getting `MeetingStartEndEventvalue`

The bot receives event through the `OnEventActivityAsync` handler. To deserialize the JSON payload, a model object is introduced to get the metadata of a meeting. The metadata of a meeting is in the `value` property in the event payload. The `MeetingStartEndEventvalue` model object is created, whose member variables correspond to the keys under the `value` property in the event payload.

> [!NOTE]
>
> * Get meeting ID from `turnContext.ChannelData`.
> * Do not use conversation ID as meeting ID.
> * Do not use meeting ID from meeting events payload `turncontext.activity.value`.

The following code shows how to capture the metadata of a meeting that is `MeetingType`, `Title`, `Id`, `JoinUrl`, `StartTime`, and `EndTime` from a meeting start/end event:

Meeting Start Event

```csharp
protected override async Task OnTeamsMeetingStartAsync(MeetingStartEventDetails meeting, ITurnContext<IEventActivity> turnContext, CancellationToken cancellationToken)
{
    await turnContext.SendActivityAsync(JsonConvert.SerializeObject(meeting));
}
```

Meeting End Event

```csharp
protected override async Task OnTeamsMeetingEndAsync(MeetingEndEventDetails meeting, ITurnContext<IEventActivity> turnContext, CancellationToken cancellationToken)
{
    await turnContext.SendActivityAsync(JsonConvert.SerializeObject(meeting));
}
```

### Example of meeting start event payload

The following code provides an example of meeting start event payload:

```json
{ 
    "name": "application/vnd.microsoft.meetingStart", 
    "type": "event", 
    "timestamp": "2021-04-29T16:10:41.1252256Z", 
    "id": "123", 
    "channelId": "msteams", 
    "serviceUrl": "https://microsoft.com", 
    "from": { 
        "id": "userID", 
        "aadObjectId": "aadOnjectId" 
    }, 
    "conversation": { 
        "isGroup": true, 
        "tenantId": "tenantId", 
        "id": "thread id" 
    }, 
    "recipient": { 
        "id": "user Id", 
        "name": "user name" 
    }, 
    "entities": [ 
        { 
            "locale": "en-US", 
            "country": "US", 
            "type": "clientInfo" 
        } 
    ], 
    "channelData": { 
        "tenant": { 
            "id": "channel id" 
        }, 
        "source": null, 
        "meeting": { 
            "id": "meeting id" 
        } 
    }, 
    "value": { 
        "MeetingType": "Scheduled", 
        "Title": "Meeting Start/End Event", 
        "Id": "meeting id", 
        "JoinUrl": "url" 
        "StartTime": "2021-04-29T16:17:17.4388966Z" 
    }, 
    "locale": "en-US" 
}
```

### Example of meeting end event payload

The following code provides an example of meeting end event payload:

```json
{ 
    "name": "application/vnd.microsoft.meetingEnd", 
    "type": "event", 
    "timestamp": "2021-04-29T16:17:17.4388966Z", 
    "id": "123", 
    "channelId": "msteams", 
    "serviceUrl": "https://microsoft.com", 
    "from": { 
        "id": "user id", 
        "aadObjectId": "aadObjectId" 
    }, 
    "conversation": { 
        "isGroup": true, 
        "tenantId": "tenantId", 
        "id": "thread id" 
    }, 
    "recipient": { 
        "id": "user id", 
        "name": "user name" 
    }, 
    "entities": [ 
        { 
            "locale": "en-US", 
            "country": "US", 
            "type": "clientInfo" 
        } 
    ], 
    "channelData": { 
        "tenant": { 
            "id": "channel id" 
        }, 
        "source": null, 
        "meeting": { 
            "id": "meeting Id" 
        } 
    }, 
    "value": { 
        "MeetingType": "Scheduled", 
        "Title": "Meeting Start/End Event in Canary", 
        "Id": "19:meeting_NTM3ZDJjOTUtZGRhOS00MzYxLTk5NDAtMzY4M2IzZWFjZGE1@thread.v2", 
        "JoinUrl": "url", 
        "EndTime": "2021-04-29T16:17:17.4388966Z" 
    }, 
    "locale": "en-US" 
}
```

| Property name | Purpose |
|---|---|
| **name** | Name of the user.|
| **type** | Activity type. |
| **timestamp** | Local date and time of the message, expressed in ISO-8601 format. |
| **id** | ID for the activity. |
| **channelId** | Channel this activity is associated with. |
| **serviceUrl** | Service URL where responses to this activity should be sent. |
| **from.id** | ID of the user that sent the request. |
| **from.aadObjectId** | Azure Active Directory object ID of the user that sent the request. |
| **conversation.isGroup** | Boolean indicating whether conversation has more than two participants. |
| **conversation.tenantId** | Azure Active Directory tenant ID of the conversation or meeting. |
| **conversation.id** | The meeting chat ID. |
| **recipient.id** | ID of the user that receive the request. |
| **recipient.name** | Name of the user that receive the request. |
| **entities.locale** | entity which contains metadata about locale. |
| **entities.country** | entity which contains metadata about country. |
| **entities.type** | entity which contains metadata about client. |
| **channelData.tenant.id** | Azure Active Directory tenant ID. |
| **channelData.source** | The source name from where event is fired or invoked. |
| **channelData.meeting.id** | The default ID associated with the meeting. |
| **value.MeetingType** | The type of meeting. |
| **value.Title** | The subject of the meeting. |
| **value.Id** | The default ID associated with the meeting. |
| **value.JoinUrl** | The join URL of the meeting. |
| **value.StartTime** | The meeting start time in UTC. |
| **value.EndTime** | The meeting end time in UTC. |
| **locale**| The locale of the message set by the client. |

## Code sample

|Sample name | Description | C# | Node.js |
|----------------|-----------------|--------------|--------------|
| Meetings extensibility | Microsoft Teams meeting extensibility sample for passing tokens. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-token-app/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-token-app/nodejs) |
| Meeting content bubble bot | Microsoft Teams meeting extensibility sample for interacting with content bubble bot in a meeting. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-content-bubble/csharp) |  [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-content-bubble/nodejs)|
| Meeting meetingSidePanel | Microsoft Teams meeting extensibility sample for interacting with the side panel in-meeting. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-sidepanel/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-sidepanel/nodejs)|
| Details Tab in Meeting | Microsoft Teams meeting extensibility sample for interacting with Details Tab in-meeting. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-details-tab/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-details-tab/nodejs)|
|Meeting Events Sample|Sample app to show real-time Teams meeting events|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-events/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-events/nodejs)|
|Meeting Recruitment Sample|Sample app to show meeting experience for recruitment scenario.|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meeting-recruitment-app/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meeting-recruitment-app/nodejs)|
|App installation using QR code|Sample app that generates the QR code and installs the app using the QR code|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-installation-using-qr-code/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-installation-using-qr-code/nodejs)|

## See also

* [Teams authentication flow for tabs](../tabs/how-to/authentication/auth-flow-tab.md)
* [Apps for Teams meetings](teams-apps-in-meetings.md)
* [Live Share SDK](teams-live-share-overview.md)

## Next steps

> [!div class="nextstepaction"]
> [Enable and configure your apps for Teams meetings](enable-and-configure-your-app-for-teams-meetings.md)
