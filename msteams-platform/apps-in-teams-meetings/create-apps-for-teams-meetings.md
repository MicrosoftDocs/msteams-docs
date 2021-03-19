---
title: Prerequisites and API references for apps in Teams meetings
author: laujan
description: Work with apps for Teams meetings 
ms.topic: conceptual
ms.author: lajanuar
keywords: teams apps meetings user participant role api
---

# Prerequisites and API references for apps in Teams meetings

To expand the capabilities of your apps across the meeting lifecycle, Teams enables you to work with apps for Teams meetings. You must  go through the prerequisites and considerations and you can use the meeting apps API references to enhance the meeting experience.

## Prerequisites and considerations

Before you work with apps for Teams meetings, you must have an understanding of the following:

* You must have knowledge of how to develop Teams apps. For more information, see [Teams app development](../overview.md).

* You must update the Teams app manifest to indicate that the app is available for meetings. For more information, see [app manifest](enable-and-configure-your-app-for-teams-meetings.md#update-your-app-manifest).

* For your app to function in the meeting lifecycle as a tab, it must support configurable tabs in the groupchat scope. For more information, see [groupchat scope](../resources/schema/manifest-schema.md#configurabletabs) and [build a group tab](../build-your-first-app/build-channel-tab.md).

* You must adhere to general Teams tab design guidelines for pre- and post-meeting scenarios. For experiences during meetings, refer to the in-meeting tab and in-meeting dialog design guidelines. For more information, see [Teams tab design guidelines](../tabs/design/tabs.md), [in-meeting tab design guidelines](../apps-in-teams-meetings/design/designing-apps-in-meetings.md#use-an-in-meeting-tab) and [in-meeting dialog design guidelines](../apps-in-teams-meetings/design/designing-apps-in-meetings.md#use-an-in-meeting-dialog).

* You must support the `groupchat` scope to enable your app in pre-meeting and post-meeting chats. With the pre-meeting app experience, you can find and add meeting apps and perform pre-meeting tasks. With post-meeting app experience, you can view the results of the meeting, such as poll survey results or feedback.

* Meeting API URL parameters must have `meetingId`, `userId`, and `tenantId`. These are available as part of the Teams client SDK and bot activity. In addition, reliable information for user ID and tenant ID can be retrieved using [Tab SSO authentication](../tabs/how-to/authentication/auth-aad-sso.md).

* The `GetParticipant` API must have a bot registration and ID to generate auth tokens. For more information, see [bot registration and ID](../build-your-first-app/build-bot.md).

* For your app to update in real time, it must be up-to-date based on event activities in the meeting. These events can be within the in-meeting dialog box and other stages across the meeting lifecycle. For the in-meeting dialog box, see completion `bot Id` parameter in `Notification Signal API`.

After you have gone through the prerequisites and considerations, you can use the meeting apps API references `GetUserContext`, `GetParticipant` and `NotificationSignal` that enable you to access information using attributes and display relevant content.

## Meeting apps API references

The new meeting extensibilities provide you with APIs that transform the meeting experience. With this new capability, you can build apps or integrate existing apps within the meeting lifecycle. You can use the APIs to make your app aware of the meeting. You can choose which APIs you want to use to enhance the meeting experience.

The following table provides a list of these APIs:

|API|Description|Request|Source|
|---|---|----|---|
|**GetUserContext**| This API enables you to get contextual information to display relevant content in a Teams tab. |_**microsoftTeams.getContext( ( ) => {  /*...*/ } )**_|Microsoft Teams client SDK|
|**GetParticipant**| This API allows a bot to fetch participant information by meeting ID and participant ID.|**GET** _**/v1/meetings/{meetingId}/participants/{participantId}?tenantId={tenantId}**_ |Microsoft Bot Framework SDK|
|**NotificationSignal** | This API enables you to provide meeting signals that are delivered using the existing conversation notification API for user-bot chat. It allows you to signal based on user action that shows an in-meeting dialog box.|**POST** _**/v3/conversations/{conversationId}/activities**_|Microsoft Bot Framework SDK|

### GetUserContext API

To identify and retrieve contextual information for your tab content, see [get context for your Teams tab](../tabs/how-to/access-teams-context.md#getting-context-by-using-the-microsoft-teams-javascript-library). `meetingId` is used by a tab when running in the meeting context and is added for the response payload.

### GetParticipant API

> [!NOTE]
> * Do not cache participant roles since the meeting organizer can change a role any time.
> * Teams does not currently support large distribution lists or roster sizes of more than 350 participants for the `GetParticipant` API.

The `GetParticipant` API allows a bot to fetch participant information by meeting ID and participant ID. The API includes query parameters, examples, and response codes.

#### Query parameters

The `GetParticipant` API includes the following query parameters:

|Value|Type|Required|Description|
|---|---|----|---|
|**meetingId**| string | Yes | The meeting identifier is available through Bot Invoke and Teams Client SDK.|
|**participantId**| string | Yes | The participant ID is the user ID. It is available in Tab SSO, Bot Invoke, and Teams Client SDK. It is recommended to get a participant ID from the Tab SSO. |
|**tenantId**| string | Yes | The tenant ID is required for the tenant users. It is available in Tab SSO, Bot Invoke, and Teams Client SDK. It is recommended to get a tenant ID from the Tab SSO. |

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

* * *

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

All users in a meeting receive the notifications sent through the `NotificationSignal` API.

> [!NOTE]
> * When an in-meeting dialog box is invoked, the content is presented as a chat message.
> * Currently, sending targeted notifications is not supported.

`NotificationSignal` API enables you to provide meeting signals that are delivered using the existing conversation notification API for user-bot chat. This API allows you to signal based on user action that shows an in-meeting dialog box. The API includes query parameters, examples, and response codes.

#### Query parameters

The `NotificationSignal` API includes the following query parameter:

|Value|Type|Required|Description|
|---|---|----|---|
|**conversationId**| string | Yes | The conversation identifier is available as part of Bot Invoke. |

#### Example

The `Bot ID` is declared in the manifest and the bot receives a result object.

> [!NOTE]
> * The `completionBotId` parameter of the `externalResourceUrl` is optional in the requested payload example. `Bot ID` is declared in the manifest and the bot receives a result object.
> * The `externalResourceUrl` width and height parameters must be in pixels. To ensure the dimensions are within the allowed limits, see [design guidelines](design/designing-apps-in-meetings.md).
> * The URL is the page loaded as an `<iframe>` in the in-meeting dialog box. The domain must be in the app's `validDomains` array in your app manifest.

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
| **403** | The app is unable to send the signal. This can happen due to various reasons such as the tenant admin disables the app, the app is blocked during live site migration, and so on. In this case, the payload contains a detailed error message. |
| **404** | The meeting chat does not exist. |

## Code sample

|Sample name | Description | C# |
|----------------|-----------------|--------------|----------------|-----------|
| Content bubble | Demonstrates how to implement content bubble in-meeting experience. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-content-bubble/csharp) |

## See also

> [!div class="nextstepaction"]
>  [Apps in Teams meetings](teams-apps-in-meetings.md)

> [!div class="nextstepaction"]
>  [Together Mode](teams-together-mode.md)

## Next step

> [!div class="nextstepaction"]
> [Enable and configure your apps for Teams meetings](enable-and-configure-your-app-for-teams-meetings.md)
