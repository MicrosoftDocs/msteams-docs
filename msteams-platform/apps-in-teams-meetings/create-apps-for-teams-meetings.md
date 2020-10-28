---
title: Create apps for teams meetings
author: laujan
description: create apps for teams meetings 
ms.topic: conceptual
ms.author: lajanuar
keywords: teams apps meetings user participant role api 
---
# Create apps for Teams meetings (Developer Preview)

>[!IMPORTANT]
> Features included in Microsoft Teams Developer Preview are provided for early-access, testing, and feedback purposes only. They may undergo changes before becoming available in the public release and should not be used in production applications.

## Prerequisites and considerations

1. Apps in meetings require some basic knowledge of [Teams app development](../overview.md). An app in a meeting can comprise of [tabs](../tabs/what-are-tabs.md), [bots](../bots/what-are-bots.md), and [messaging extensions](../messaging-extensions/what-are-messaging-extensions.md) features and will require updates to the Teams [app manifest](#update-your-app-manifest) to indicate that the app is available for meetings

1. For your app to function in the meeting lifecycle as a tab, it must support configurable tabs in the [groupchat scope](../resources/schema/manifest-schema.md#configurabletabs). *See* [Extend your Teams app with a custom tab](../tabs/how-to/add-tab.md). Supporting the `groupchat` scope will enable your app in [pre-meeting](teams-apps-in-meetings.md#pre-meeting-app-experience) and [post-meeting](teams-apps-in-meetings.md#post-meeting-app-experience) chats.

1. Meeting API URL parameters may require `meetingId`, `userId`, and the [tenantId](/onedrive/find-your-office-365-tenant-id) These are available as part of the Teams Client SDK and bot activity. Additionally, reliable information for user ID and tenant ID can be retrieved using [Tab SSO authentication](../tabs/how-to/authentication/auth-aad-sso.md).

1. Some meeting APIs, such as `GetParticipant` will require a [bot registration and bot app ID](../bots/how-to/create-a-bot-for-teams.md#with-an-azure-subscription) to generate auth tokens.

1. Developers must adhere to general [Teams tab design guidelines](../tabs/design/tabs.md) for pre- and post-meeting scenarios as well as the [in-meeting dialog guidelines](design/designing-in-meeting-dialog.md) for in-meeting dialog triggered during a Teams meeting.

## Meeting apps API reference

|API|Description|Request|Source|
|---|---|----|---|
|**GetUserContext**| Get contextual information to display relevant content in a Teams tab. |_**microsoftTeams.getContext( ( ) => {  /*...*/ } )**_|Microsoft Teams client SDK|
|**GetParticipant**|This API allows a bot to fetch a participant information by meeting id and participant id.|**GET** _**/v1/meetings/{meetingId}/participants/{participantId}?tenantId={tenantId}**_ |Microsoft Bot Framework SDK|
|**NotificationSignal** |Meeting signals will be delivered using the following existing conversation notification API (for user-bot chat). This API allows developers to signal based on end-user action to show-case an in-meeting dialog bubble.|**POST** _**/v3/conversations/{conversationId}/activities**_|Microsoft Bot Framework SDK|

### GetUserContext

Please refer to our [Get context for your Teams tab](../tabs/how-to/access-teams-context.md#getting-context-by-using-the-microsoft-teams-javascript-library) documentation for guidance on identifying and  retrieving contextual information for your tab content. As part of meetings extensibility, a new value has been added for the response payload:

✔ **meetingId**: used by a tab when running in the meeting context.

### GetParticipant API

> [!NOTE]
>
> * Do not cache participant roles since the meeting organizer can change a role at any point in time.
>
> * Teams does not currently support large distribution lists or roster sizes of more than 350 participants for the `GetParticipant` API.
>
> * Support for the Bot Framework SDK is coming soon.

#### Request

```http
GET /v3/meetings/{meetingId}/participants/{participantId}?tenantId={tenantId}
```

*See* the [Bot Framework API reference](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference?view=azure-bot-service-4.0&preserve-view=true).

<!-- markdownlint-disable MD025 -->

**C# Example**

```csharp
string meetingId = "meetingid?";
string participantId = "participantidhere";
var connectorClient = turnContext.TurnState.Get<IConnectorClient>();
var creds = connectorClient.Credentials as AppCredentials;
var bearerToken = await creds.GetTokenAsync().ConfigureAwait(false);
var request = new HttpRequestMessage();
request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", bearerToken);
request.Method = new HttpMethod("GET");
request.RequestUri = new System.Uri(Path.Combine(connectorClient.BaseUri.OriginalString, $"/meetings/{meetingId}/participants/{participantId}"));
HttpResponseMessage response = await (connectorClient as ServiceClient<ConnectorClient>).HttpClient.SendAsync(request, cancellationToken).ConfigureAwait(false);
if (response.StatusCode == System.Net.HttpStatusCode.OK)
{
    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
    var theObject = Rest.Serialization.SafeJsonConvert.DeserializeObject<WhateverObjectIsReturned>(content, connectorClient.DeserializationSettings);
}
```

* * *
<!-- markdownlint-disable MD001 -->

#### Query parameters

|Value|Type|Required|Description|
|---|---|----|---|
|**meetingId**| string | Yes | The meeting identifier is available via Bot Invoke and Teams Client SDK.|
|**participantId**| string | Yes | This field is the User ID and it is available in Tab SSO, Bot Invoke, and Teams Client SDK. Tab SSO is highly recommended|
|**tenantId**| string | Yes | This required for tenant users. It is available in Tab SSO, Bot Invoke, and Teams Client SDK. Tab SSO is highly recommended|

#### Response Payload
<!-- markdownlint-disable MD036 -->

**meetingRole** can be *Organizer*, *Presenter*, or *Attendee*.

**Example 1**

```json
{
  "user":
  {
      "id": "29:1JKiJGPAX9TTxtGxhVo0wLx_zwzo-gG8Z-X03306vBwi9p-xMTEbDXsT6KH7-0kkTS8cD-2zkrsoV6f5WJ6_aYw",
      "aadObjectId": "6aebbad0-e5a5-424a-834a-20fb051f3c1a",
      "name": "Allan Deyoung",
      "givenName": "Allan",
      "surname": "Deyoung",
      "email": "Allan.Deyoung@microsoft.com",
      "userPrincipalName": "Allan.Deyoung@microsoft.com",
      "tenantId": "72f988bf-86f1-41af-91ab-2d7cd011db47",
  },
  "meeting":
  {
      "role ": "Presenter",
      "inMeeting":true
  },
  "conversation":
  {
      "id": "<conversation id>"
  }
}
```
#### Response Codes

**403**: the app is not allowed to get participant information. This will be the most common error response and is triggered when the app is not installed in the meeting such as when the app is disabled by tenant admin or blocked during live site mitigation.  
**200**: participant information successfully retrieved  
**401**: invalid token  
**404**: the meeting doesn't exist or participant can’t be found.

<!-- markdownlint-disable MD024 -->
### NotificationSignal API

> [!NOTE]
> When an in-meeting dialog is invoked, the same content will also be presented as a chat message.

#### Request

```http
POST /v3/conversations/{conversationId}/activities
```

#### Query parameters

|Value|Type|Required|Description|
|---|---|----|---|
|**conversationId**| string | Yes | The conversation identifier is available as part of bot invoke |

#### Request Payload

> [!NOTE]
>
> The completionBotId in the externalResourceUrl in the requeste payload below is an optional parameter. It is the Bot ID that is declared in the manifest. The bot will receive a result object

# [JSON](#tab/json)

```json
{
    "type": "message",
    "text": "John Phillips assigned you a weekly todo",
    "summary": "Don't forget to meet with Marketing next week",
    "channelData": {
        "notification": {
            "alertInMeeting": true,
            "externalResourceUrl": "https://teams.microsoft.com/l/bubble/APP_ID?url=<TaskInfo.url>&height=<TaskInfo.height>&width=<TaskInfo.width>&title=<TaskInfo.title>&completionBotId=BOT_APP_ID"
        }
    },
    "replyToId": "1493070356924"
}
```

# [C#/.NET](#tab/dotnet)

```csharp
Activity activity = MessageFactory.Text("This is a meeting signal test");
MeetingNotification notification = new MeetingNotification
  {
    AlertInMeeting = true,
    ExternalResourceUrl = "https://teams.microsoft.com/l/bubble/APP_ID?url=<TaskInfo.url>&height=<TaskInfo.height>&width=<TaskInfo.width>&title=<TaskInfo.title>&completionBotId=BOT_APP_ID"
  };
activity.ChannelData = new TeamsChannelData
  {
    Notification = notification
  };
await turnContext.SendActivityAsync(activity).ConfigureAwait(false);
```

# [JavaScript](#tab/javascript)

```javascript

const replyActivity = MessageFactory.text('Hi'); // this could be an adaptive card instead
replyActivity.channelData = {
    notification: {
        alertInMeeting: true,
        externalResourceUrl: 'https://teams.microsoft.com/l/bubble/APP_ID?url=<TaskInfo.url>&height=<TaskInfo.height>&width=<TaskInfo.width>&title=<TaskInfo.title>&completionBotId=BOT_APP_ID’
    }
};
await context.sendActivity(replyActivity);
```

* * *

> [!IMPORTANT]
> The URL in the content bubble (taskInfo URL) must be included in the [valid domains](../resources/schema/manifest-schema.md#validdomains) list included in the Teams app manifest.

#### Response Codes

**201**: activity with signal is successfully sent  
**401**: invalid token  
**403**: the app is not allowed to send the signal. In this case, the payload should contain more detail error message. There can be many reasons: app disabled by tenant admin, blocked during live site mitigation, etc.  
**404**: meeting chat doesn't exist  

## Enable your app for Teams meetings

### Update your app manifest

The meetings app capabilities are declared in your app manifest via the **configurableTabs** -> **scopes** and **context** arrays. *Scope* defines to whom and *context* defines where your app will be available.

> [!NOTE]
> * Please use [Developer Preview manifest schema](../resources/schema/manifest-schema-dev-preview.md) to try this in your app manifest.

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
> "Context" property is currently not supported and thus will be ignored on mobile clients

## Configure your app for meeting scenarios

> [!NOTE]
> * For your app to be visible in the tab gallery it needs to **support configurable tabs** and the **group chat scope**.
>
> * Mobile clients support Tabs only in Pre and Post Meeting Surfaces. The In-meeting experiences (in-meeting dialog and panel) on mobile will be available soon. Follow the [guidance for tabs on mobile](../tabs/design/tabs-mobile.md) when creating your tabs for mobile. 

### Pre-meeting

Users with organizer and/or presenter roles add tabs to a meeting using the plus ➕ button in the meeting **Chat** and meeting **details** pages. Messaging extensions are added to via the ellipses/overflow menu &#x25CF;&#x25CF;&#x25CF; located beneath the compose message area in the chat. Bots are added to a meeting chat using the "**@**" key and selecting **Get bots**.

✔ The user identity *must* be confirmed via [Tabs SSO](../tabs/how-to/authentication/auth-aad-sso.md). Following this authentication, the app can retrieve the user role via the GetParticipant API.

 ✔ Based on the user role, the app will now have the capability to present role specific experiences. For example, a polling app can allow only organizers and presenters to create a new poll.

> **NOTE**: Role assignments can be changed while a meeting is in progress.  *See* [Roles in a Teams meeting](https://support.microsoft.com/office/roles-in-a-teams-meeting-c16fa7d0-1666-4dde-8686-0a0bfe16e019). 

### In-meeting

#### **sidePanel**

✔ In your app manifest add **sidePanel** to the **context** array as described above.

✔ In the meeting as well as in all scenarios, the app will be rendered in an in-meeting tab that is 320px in width. Your tab must be optimized for this. *See*, [FrameContext interface](/javascript/api/@microsoft/teams-js/microsoftteams.framecontext?view=msteams-client-js-latest&preserve-view=true)

✔Refer to the [Teams SDK](../tabs/how-to/access-teams-context.md#user-context) to use the **userContext** API to route requests accordingly.

✔ Refer to the [Teams authentication flow for tabs](../tabs/how-to/authentication/auth-flow-tab.md). Authentication flow for tabs is very similar to the auth flow for websites. Thus, tabs can use OAuth 2.0 directly. *See also*, [Microsoft identity platform and OAuth 2.0 authorization code flow](/azure/active-directory/develop/v2-oauth2-auth-code-flow).

#### **in-meeting dialog**

✔ You must adhere to the [in-meeting dialog design guidelines](design/designing-in-meeting-dialog.md).

✔ Refer to the [Teams authentication flow for tabs](../tabs/how-to/authentication/auth-flow-tab.md).

✔ Use the [notification](/graph/api/resources/notifications-api-overview?view=graph-rest-beta&preserve-view=true) API to signal that a bubble notification needs to be triggered.

✔ As part of the notification request payload, include the URL where the content to be showcased is hosted.

> [!NOTE]
>
> * These notifications are persistent in nature. You must invoke the [**submitTask()**](../task-modules-and-cards/task-modules/task-modules-bots.md#submitting-the-result-of-a-task-module) function to auto-dismiss after a user takes an action in the web-view. This is a requirement for app submission. *See also*, [Teams SDK: task module](/javascript/api/@microsoft/teams-js/microsoftteams.tasks?view=msteams-client-js-latest#submittask-string---object--string---string---&preserve-view=true).
>
> * If you want your app to support anonymous users, your initial invoke request payload must rely on the `from.id`  (ID of the user) request metadata in the `from` object, not the `from.aadObjectId` (Azure Active Directory ID of the user) request metadata. *See* [Using task modules in tabs](../task-modules-and-cards/task-modules/task-modules-tabs.md) and [Create and send the task module](../messaging-extensions/how-to/action-commands/create-task-module.md?tabs=dotnet#the-initial-invoke-request).

### Post-meeting

The post-meeting and pre-meeting configurations are equivalent.

## Meeting app sample

 > [!div class="nextstepaction"]
> [Meeting token generator app](https://github.com/OfficeDev/microsoft-teams-sample-meetings-token)
