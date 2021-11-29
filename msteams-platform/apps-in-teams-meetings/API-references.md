---
title: Meeting apps API references
author: surbhigupta
description: Identify the meeting apps API references with examples and Code samples
ms.topic: conceptual
ms.author: lajanuar
ms.localizationpriority: medium
keywords: teams apps meetings user participant role api usercontext notification signal query 
---

# Meeting apps API references

The meeting extensibilities provide APIs to transform the meeting experience:

* Build apps or integrate existing apps within meeting lifecycle.
* Use the APIs to make your app aware of the meeting.
* Select the APIs you want to use to enhance the meeting experience.

The following table provides a list of APIs:

|API|Description|Request|Source|
|---|---|----|---|
|**GetUserContext**| This API enables you to get contextual information to display relevant content in a Teams tab. |_**microsoftTeams.getContext( ( ) => {  /*...*/ } )**_|Microsoft Teams Client SDK|
|**GetParticipant**| This API enables a bot to fetch participant information by meeting ID and participant ID. |**GET** _**/v1/meetings/{meetingId}/participants/{participantId}?tenantId={tenantId}**_ |Microsoft Bot Framework SDK|
|**NotificationSignal** | This API enables you to provide meeting signals that are delivered using the existing conversation notification API for user-bot chat. It allows you to signal based on user action that shows an in-meeting dialog box. |**POST** _**/v3/conversations/{conversationId}/activities**_|Microsoft Bot Framework SDK|
|**Meeting Details** | This API enables you to get static meeting metadata. |**GET** _**/v1/meetings/{meetingId}**_| Bot SDK |

The following table provides the Bot Framework SDK methods for the APIs:

|API|Bot Framework SDK method|
|---|---|
|**GetParticipant**| `GetMeetingParticipantAsync (Microsoft.Bot.Builder.ITurnContext turnContext, string meetingId = default, string participantId = default, string tenantId = default, System.Threading.CancellationToken cancellationToken = default);` |
|**NotificationSignal** | `activity.TeamsNotifyUser(true, "https://teams.microsoft.com/l/bubble/APP_ID?url=&height=&width=&title=<title>&completionBotId=BOT_APP_ID");` |
|**Meeting Details** | `TeamsMeetingInfo (string id = default);` |

## GetUserContext API

To identify and retrieve contextual information for your tab content, see [get context for your Teams tab](../tabs/how-to/access-teams-context.md#get-context-by-using-the-microsoft-teams-javascript-library). `meetingId` is used by a tab when running in the meeting context and is added for the response payload.

## GetParticipant API

> [!NOTE]
> * Do not cache participant roles since the meeting organizer can change the roles any time.
> * Teams does not currently support large distribution lists or roster sizes of more than 350 participants for the `GetParticipant` API.

The `GetParticipant` API allows a bot to fetch participant information by meeting ID and participant ID. The API includes query parameters, examples, and response codes.

### Query parameters

The `GetParticipant` API includes the following query parameters:

|Value|Type|Required|Description|
|---|---|----|---|
|**meetingId**| String | Yes | The meeting identifier is available through Bot Invoke and Teams Client SDK.|
|**participantId**| String | Yes | The participant ID is the user ID. It's available in Tab SSO, Bot Invoke, and Teams Client SDK. It's recommended to get a participant ID from the Tab SSO. |
|**tenantId**| String | Yes | The tenant ID is required for the tenant users. It's available in Tab SSO, Bot Invoke, and Teams Client SDK. It's recommended to get a tenant ID from the Tab SSO. | 

### Example

The `GetParticipant` API includes the following examples:

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

---

The JSON response body for `GetParticipant` API is:

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

### Response codes

The `GetParticipant` API returns the following response codes:

|Response code|Description|
|---|---|
| **403** | Get participant information isn't shared with the app. If the app isn't installed in the meeting, it triggers the most common error response 403. If the tenant admin disables or blocks the app during live site migration, 403 error response is triggered. |
| **200** | The participant information is successfully retrieved.|
| **401** | The app responds with an invalid token.|
| **404** | The meeting has either expired or participant cannot be found.|

## NotificationSignal API

All users in a meeting receive the notifications sent through the `NotificationSignal` API.

> [!NOTE]
> * When an in-meeting dialog box is invoked, the content is presented as a chat message.
> * Currently, sending targeted notifications is not supported.

`NotificationSignal` API enables you to provide meeting signals that are delivered using the existing conversation notification API for user-bot chat. This API allows you to signal based on user action that shows an in-meeting dialog box. The API includes query parameter, examples, and response codes.

### Query parameter

The `NotificationSignal` API includes the following query parameter:

|Value|Type|Required|Description|
|---|---|----|---|
|**conversationId**| String | Yes | The conversation identifier is available as part of Bot Invoke. |

### Examples

The `Bot ID` is declared in the manifest and the bot receives a result object.

> [!NOTE]
> * The `completionBotId` parameter of the `externalResourceUrl` is optional in the requested payload example. `Bot ID` is declared in the manifest and the bot receives a result object.
> * The `externalResourceUrl` width and height parameters must be in pixels. To ensure the dimensions are within the allowed limits, see [design guidelines](design/designing-apps-in-meetings.md).
> * The URL is the page loaded as an `<iframe>` in the in-meeting dialog box. The domain must be in the app's `validDomains` array in your app manifest.

The `NotificationSignal` API includes the following examples:

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

### Response codes

The `NotificationSignal` API includes the following response codes:

|Response code|Description|
|---|---|
| **201** | The activity with signal is successfully sent. |
| **401** | The app responds with an invalid token. |
| **403** | The app is unable to send the signal. 403 response code can occur because of various reasons, such as the tenant admin disables and blocks the app during live site migration. In this case, the payload contains a detailed error message. |
| **404** | The meeting chat doesn't exist. |

## Meeting Details API

> [!NOTE]
> This feature is currently available in [public developer preview](../resources/dev-preview/developer-preview-intro.md) only.

The Meeting Details API enables your app to get static meeting metadata. The metadata provides data points that don't change dynamically.
The API is available through Bot Services.

### Prerequisite

To use the Meeting Details API, you must obtain RSC permissions. Use the following example to configure your app manifest's `webApplicationInfo` property:

```json
"webApplicationInfo": {
    "id": "<bot id>",
    "resource": "https://RscPermission",
    "applicationPermissions": [
      "OnlineMeeting.ReadBasic.Chat",
      "ChannelMeeting.ReadBasic.Group"
    ]
}
 ```

> [!NOTE]
> Previously, `ChannelMeeting.ReadBasic.Group` API was in a private scheduled/recurring meeting. Now it is supported in a standard channel meeting in both scheduled and recurring.
 
### Query parameter

The Meeting Details API includes the following query parameter:

|Value|Type|Required|Description|
|---|---|----|---|
|**meetingId**| String | Yes | The meeting identifier is available through Bot Invoke and Teams Client SDK. |

### Example

The Meeting Details API includes the following examples:

> [!NOTE]
> You need to use different RSC permission string in the bot manifest, depending on the type of the meeting.

# [C#](#tab/dotnet)

```csharp
MeetingInfo result = await TeamsInfo.GetMeetingInfoAsync(turnContext);
await turnContext.SendActivityAsync(JsonConvert.SerializeObject(result));
```

# [JavaScript](#tab/javascript)

```javascript

this.onMessage(async(context, next) =>{

  TurnContext.removeRecipientMention(context.activity);

 

  const details=await TeamsInfo.getMeetingInfo(context);

  await context.sendActivity(JSON.stringify(details, null, 2));

});

```

# [JSON](#tab/json)

```http
GET /v1/meetings/{meetingId}
```

---

The JSON response body for Meeting Details API is as follows:

```json
{ 
   "details": { 
        "id": "meeting ID", 
        "msGraphResourceId": "", 
        "scheduledStartTime": "2020-08-21T02:30:00+00:00", 
        "scheduledEndTime": "2020-08-21T03:00:00+00:00", 
        "joinUrl": "https://teams.microsoft.com/l/xx", 
        "title": "All Hands", 
        "type": "Scheduled" 
    }, 
    "conversation": { 
            "isGroup": true, 
            “conversationType”: “groupchat”, 
            "id": "meeting chat ID" 
    }, 
    "organizer": { 
        "id": "<organizer user ID>", 
        "aadObjectId": "<AAD ID>", 
        "tenantId": "<Tenant ID>" 
    }
} 
```

## Real-time Teams meeting events

The user can receive real-time meeting events. As soon as any app is associated with a meeting, the actual meeting start and end time are shared with the bot.

Actual start and end time of a meeting are different from scheduled start and end time. The Meeting Details API provides the scheduled start and end time. The event provides the actual start and end time.

### Prerequisite

Your app manifest must have the `webApplicationInfo` property to receive the meeting start and end events. Use the following example to configure your manifest:

```json
"webApplicationInfo": {
    "id": "<bot id>",
    "resource": "https://RscPermission",
    "applicationPermissions": [
      "OnlineMeeting.ReadBasic.Chat"
    ]
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

### Example of getting metadata of a meeting

Your bot receives the event through the `OnEventActivityAsync` handler.

To deserialize the json payload, a model object is introduced to get the metadata of a meeting. The metadata of a meeting is in the `value` property in the event payload. The `MeetingStartEndEventvalue` model object is created, whose member variables correspond to the keys under the `value` property in the event payload.
     
> [!NOTE]      
> * Get meeting ID from `turnContext.ChannelData`.    
> * Do not use conversation ID as meeting ID.     
> * Do not use meeting ID from meeting events payload `turncontext.activity.value`. 
      
The following code shows how to capture the metadata of a meeting that is `MeetingType`, `Title`, `Id`, `JoinUrl`, `StartTime`, and `EndTime` from a meeting start/end event:

Meeting Start Event
```csharp
protected override async Task OnTeamsMeetingStartAsync(MeetingEndEventDetails meeting, ITurnContext<IEventActivity> turnContext, CancellationToken cancellationToken)
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
