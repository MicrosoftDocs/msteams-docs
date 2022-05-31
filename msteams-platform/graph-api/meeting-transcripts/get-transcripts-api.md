---
title: Use Microsoft Graph to fetch transcripts for a Teams meeting
description: Describes the process, scenarios, and APIs to fetch transcripts in a post-meeting scenario 
ms.localizationpriority: medium
ms.topic: concept
keywords: teams Graph transcripts meeting organizer Azure rsc
---
# Get meeting transcripts using Graph APIs

You can now configure your app to fetch Teams meeting transcripts in post-meeting scenario. Your app can use Graph REST APIs to access and fetch transcripts generated for a Teams meeting that has been scheduled beforehand.

Here are some use cases for fetching meeting transcripts using Graph API:

| Use case | How Transcript APIs help... |
| --- | --- |
| You need to obtain transcripts for multiple meetings for capturing action items. Keeping track of all meetings, and retrieving them one at a time is time-consuming and inefficient. You might also miss getting content for any particular meeting. | If you configure your app to automatically fetch meeting transcript following a meeting, it can automatically capture the transcripts of all meetings that are relevant for your purpose. Your app can receive meeting notifications, and get the transcript when it's generated after the meeting. |
| Participants in a brainstorming meeting need to continually take notes and provide summary post discussion. It impedes the flow of thoughts and participants stand to lose useful ideas or suggestions. | Using these APIs to fetch transcripts post-meeting takes off this burden. Participants can fully focus on the discussion. The content of the meeting transcript is available for post-meeting analysis and insights, without any need for participants taking notes, etc. |

/ Add more relevant use cases /

To fetch the transcript for a particular meeting:

- [Configure required permissions for your app on Azure AD portal](#configure-permissions-to-access-transcript)
- [Obtain meeting ID and the user ID of the meeting organizer](#obtain-meeting-id-and-organizer-id)
- [Get transcripts using Graph REST APIs](#use-graph-apis-to-fetch-transcript)

## Configure permissions to access transcript

Your app must have the required permissions for fetching transcripts. Your app can access and fetch transcripts for a Teams meeting in one of the two ways:

- [Use classic permission](#use-classic-permissions)
- [Use RSC permission](#use-rsc-permissions)

### Use classic permissions

You can configure your app to access meeting transcripts across the tenant where it's installed. In this case, the meeting organizer doesn't need to install your app in the Teams meeting chat. Because of tenant-wide classic permissions authorized by tenant administrator, your app can read and access transcripts for all meetings in the tenant.

The following permissions can be granted to your app:

| Permission | Display name | Description |
| --- | --- | --- |
| OnlineMeetingTranscript.Read.All in Application context | Read the transcript of the meeting. | It allows the app to read meeting transcripts in your organization. It needs the administrator to consent, and doesn't require an app user to be signed in. |
| OnlineMeetingTranscript.Read.All in Delegated (work or school account) context | Read the transcript of the meeting. | It allows your app to read meeting transcripts in your organization for a signed-in app user. It needs the administrator to consent. |

/ reference to article for configuring classic permissions. /
/ reference to article for admin page. /

### Use RSC permissions

If you want your app to fetch transcripts from a specific Team meeting, configure RSC permission for your app. The meeting organizer can install your app in the Teams meetings chat. After the meeting is closed, your app can make the API call to obtain the transcript for that meeting.

The following RSC permissions can be granted to your app:

| Permission | Display name | Description |
| --- | --- | --- |
| OnlineMeetingTranscript.Read.Chat | Read the transcript of the meeting. | It allows your app to read transcripts of a meeting. It doesn't require the app user to be signed in for reading transcripts, and requires no administrator consent. |
| OnlineMeetingTranscript.Read.Group | Read the transcript this team’s channel meeting. | It allows your app to read the transcripts of a channel meeting associated with a team. It doesn't require an app user to be signed in, and requires no administrator consent. |

/ reference to article for configuring RSC permissions. /

In both cases, your app can fetch the transcript when a transcript is generated after a Teams meeting is over. The content of the transcript is available as .vtt or .doc file.

Next, you can [subscribe](#subscribe-to-change-notifications) your app to receive notifications of all relevant meeting events.

> [!NOTE]
> The process for calling Graph APIs to access and retrieve transcripts remains the same for both RSC or classic permissions.

## Obtain meeting ID and organizer ID

You can fetch transcripts of a meeting using the meeting ID and the user ID of the meeting organizer, also known as organizer ID. The Graph REST APIs fetch transcripts based on the meeting ID and organizer ID passed as parameters in the API.

To obtain meeting ID and organizer ID for fetching the transcript, choose one of the two ways:

- [Subscribe to change notifications](#subscribe-to-change-notifications)
- [Use Bot Framework](#use-bot-framework-to-get-meeting-id-and-organizer-id)

### Subscribe to change notifications

You can subscribe your app to receive change notifications for scheduled meeting events. When your app is notified about meetings, it can obtain transcripts, if it's authorized via required permissions.

Your app receives notifications of meeting events for which it has subscribed:

- [Tenant-level notification](#obtain-meeting-details-using-tenant-level-notification)
- [User-level notification](#obtain-meeting-details-using-user-level-notification)

When your app is notified of a scheduled meeting, it can retrieve the meeting ID and organizer ID from the notification message. Based on the meeting details, your app can fetch the meeting transcripts after the meeting has ended.

#### Obtain meeting details using tenant-level notification

Tenant-level notifications are useful if your app is authorized to access all meeting transcripts across the tenant. You can subscribe your app to receive notifications for meetings scheduled across the tenant. Post meeting, your app can access and retrieve the meeting transcript.

For subscribing your app to tenant-level notifications, see [Get change notifications](/graph/teams-changenotifications-chatmessage.md#subscribe-to-messages-across-all-chats).

After subscribing, your app receives notifications for meeting events across the tenant. Your app can search through the notifications for transcription started and meeting ended events.

To obtain meeting ID and organizer ID with tenant-level notification:

1. **Get chat ID**: The app needs the `chatId` property from the payload to make subsequent calls. You can get the chat ID from the payloads of Transcription Started event and CallEnded event.
    <br>
    <details>
    <summary><b>Example of payload for Transcription Started event: event type: `callTranscriptEventMessageDetail`</b></summary>
    <br>
    ```json
    {
    "subscriptionId": "1217470f-564c-4fe3-b51f-ebd962cb8797",
    "changeType": "created",
    "tenantId": "2432b57b-0abd-43db-aa7b-16eadd115d34",
    "resource": "chats('19:meeting_ZjVkMjc0ZWYtNThkMy00ZGI1LWFiYjAtYjg3ZGU0ZWI3MzZk@thread.v2')/messages('1649787549174')",
    "contentDecryptedBySimulator": {
        "@odata.context": "https://graph.microsoft.com/$metadata#chats('19%3Ameeting_ZjVkMjc0ZWYtNThkMy00ZGI1LWFiYjAtYjg3ZGU0ZWI3MzZk%40thread.v2')/messages/$entity",
        "messageType": "systemEventMessage",
        "createdDateTime": "2022-04-12T18:19:09.174Z",
        "lastModifiedDateTime": "2022-04-12T18:19:09.174Z",
        "chatId": "19:meeting_ZjVkMjc0ZWYtNThkMy00ZGI1LWFiYjAtYjg3ZGU0ZWI3MzZk@thread.v2",
        "body": {
            "contentType": "html",
            "content": "<systemEventMessage/>"
        },
        "channelIdentity": null,
        "eventDetail": {
            "@odata.type": "#Microsoft.Teams.GraphSvc.callTranscriptEventMessageDetail",
            "callId": "16481de8-3262-419b-abc7-0139e6239515",
            "callTranscriptICalUid": "",
            "meetingOrganizer": {
                "application": null,
                "device": null,
                "user": {
                "userIdentityType": "aadUser",
                    "id": "14b779ae-cb64-47e7-a512-52fd50a4154d",
                    "displayName": null
                    }
                }
            }
        },
        "encryptedContent": {}
    }
    ```
    </details>

    <br>

    <details>
    <summary><b>Example of payload for CallEnded event: event type: `callEndedEventMessageDetail`</b></summary>
    <br>
    ```json
    {
        "subscriptionId": "1217470f-564c-4fe3-b51f-ebd962cb8797",
        "changeType": "created",
        "tenantId": "2432b57b-0abd-43db-aa7b-16eadd115d34",
        "resource": "chats('19:meeting_ZjVkMjc0ZWYtNThkMy00ZGI1LWFiYjAtYjg3ZGU0ZWI3MzZk@thread.v2')/messages('1649787585457')",
        "resourceData": {},
        "contentDecryptedBySimulator": {
            "@odata.context": "https://graph.microsoft.com/$metadata#chats('19%3Ameeting_ZjVkMjc0ZWYtNThkMy00ZGI1LWFiYjAtYjg3ZGU0ZWI3MzZk%40thread.v2')/messages/$entity",
            "createdDateTime": "2022-04-12T18:19:45.457Z",
            "lastModifiedDateTime": "2022-04-12T18:19:45.457Z",     
            "chatId": "19:meeting_ZjVkMjc0ZWYtNThkMy00ZGI1LWFiYjAtYjg3ZGU0ZWI3MzZk@thread.v2",
            "eventDetail": {
                "@odata.type": "#Microsoft.Teams.GraphSvc.callEndedEventMessageDetail",
                "callId": null,
                "callDuration": "PT1M44S",
                "callEventType": "meeting",
                "callParticipants": [
                ],
                "initiator": {
    
                }
            }
        },
        "encryptedContent": {
                
        }
    }
    ```
    </details>
    <br>

2. **Get chat entity**: Based on the chat ID, retrieve the chat entity to obtain the meeting ID and organizer ID using 'joinWebUrl`. For more information, see [Get chat](graph/api/chat-get.md).

    Use the following example to request chat entity:

    ``` http
    GET https://graph.microsoft.com/beta/chats/19:meeting_NmU0NTkxYzMtM2Y2My00NzRlLWFmN2YtNTFiMGM5OWM3ZjY2@thread.v2
    ```

    There are two response scenarios to this request depending on whether `joinWebUrl` is a part of response:
    - The response payload contains the `joinWebUrl` in the `onlineMeetingInfo` property and `id` of the organizer in the `organizer` property.</b></summary>
    <br>
    <details>
    <summary><b>Example of response payload, if `joinWebUrl` is available:</b></summary>
    <br>
    ```json
    {
        "@odata.context": "https://graph.microsoft.com/beta/$metadata#chats/$entity",
        "id": "19:meeting_NmU0NTkxYzMtM2Y2My00NzRlLWFmN2YtNTFiMGM5OWM3ZjY2@thread.v2",
        "topic": "Test Meet Create Online Meeting",
        "createdDateTime": "2022-04-14T11:30:45.903Z",
        "lastUpdatedDateTime": "2022-04-26T06:27:45.265Z",
        "chatType": "meeting",
        "webUrl": "https://teams.microsoft.com/l/chat/19%3Ameeting_NmU0NTkxYzMtM2Y2My00NzRlLWFmN2YtNTFiMGM5OWM3ZjY2%40thread.v2/0?tenantId=2432b57b-0abd-43db-aa7b-16eadd115d34",
        "tenantId": "2432b57b-0abd-43db-aa7b-16eadd115d34",
        "viewpoint": null,
        "onlineMeetingInfo": {
        "calendarEventId": null,
            "joinWebUrl": "https://teams.microsoft.com/l/meetup-join/19%3ameeting_NmU0NTkxYzMtM2Y2My00NzRlLWFmN2YtNTFiMGM5OWM3ZjY2%40thread.v2/0?context=%7b%22Tid%22%3a%222432b57b-0abd-43db-aa7b-16eadd115d34%22%2c%22Oid%22%3a%2214b779ae-cb64-47e7-a512-52fd50a4154d%22%7d",
            "organizer": {
                "id": "14b779ae-cb64-47e7-a512-52fd50a4154d",
                "displayName": null,
                "userIdentityType": "aadUser"
            }
        }
    }
    ```
    </details>
    <br>

    - If the meeting was not created as an online meeting from Teams client or Outlook client, then `joinWebUrl` is not available in the response payload. The `calendarEventId` is present in the  `onlineMeetingInfo` property. You can use the `calendarEventId` member of the `onlineMeetingInfo` property to get the `joinWebUrl`. For more information, see [Get event](/graph/api/event-get?view=graph-rest-1.0&tabs=http).
    <br>

    <details>
    <summary><b>Example of response payload, if `joinWebUrl` is available:</b></summary>
    <br>
    ```json
    {
        "@odata.context": "https://graph.microsoft.com/beta/$metadata#chats/$entity",
        "id": "19:meeting_YzM1NGFiZWYtOGFiOS00NjM5LTg4OTktYmU0MjI4NTQyNGZm@thread.v2",
        "topic": "Non Online Meeting Teams Client",
        "createdDateTime": "2022-04-26T09:43:23.711Z",
        "lastUpdatedDateTime": "2022-04-26T09:43:46.157Z",
        "chatType": "meeting",
        "webUrl": "https://teams.microsoft.com/l/chat/19%3Ameeting_YzM1NGFiZWYtOGFiOS00NjM5LTg4OTktYmU0MjI4NTQyNGZm%40thread.v2/0?tenantId=2432b57b-0abd-43db-aa7b-16eadd115d34",
        "tenantId": "2432b57b-0abd-43db-aa7b-16eadd115d34",
        "viewpoint": null,
        "onlineMeetingInfo": {
            "calendarEventId": "AAMkAGE3NjJhOTVhLTNkZDQtNDE2OS05ZjU0LTJmOGQ0YTY2YTdiZQBGAAAAAAD3AG5jNnlgQJvdCL_KgXJIBwBsww5BlIxtT7iFyYWrXV3AAAAAAAENAABsww5BlIxtT7iFyYWrXV3AAACSDwYeAAA=",
            "joinWebUrl": null,
            "organizer": {
                "id": "14b779ae-cb64-47e7-a512-52fd50a4154d",
                "displayName": null,
                "userIdentityType": "aadUser"
            }
        }
    }
    ```
    </details>
    <br>

    - Use the following example to obtain `joinWebUrl`.
      
      ``` http
        GET https://graph.microsoft.com/beta/users/14b779ae-cb64-47e7-a512-52fd50a4154d/events/AAMkAGE3NjJhOTVhLTNkZDQtNDE2OS05ZjU0LTJmOGQ0YTY2YTdiZQBGAAAAAAD3AG5jNnlgQJvdCL_KgXJIBwBsww5BlIxtT7iFyYWrXV3AAAAAAAENAABsww5BlIxtT7iFyYWrXV3AAACSDwYdAAA=
      ```
      <br>
      The response payload of this request contains the `joinUrl`, which is the same as `joinWebUrl`.
      <br>
      <details>
      <summary><b>Example of response payload that contains the `joinUrl` in the `onlineMeeting` property:<b></summary>
      <br>

      ```json
        {
            "@odata.context": "https://graph.microsoft.com/beta/$metadata#users('14b779ae-cb64-47e7-a512-52fd50a4154d')/events/$entity",
            "@odata.etag": "W/\"bMMOQZSMbU+4hcmFq11dwAAAkc3Tmw==\"",
            "id": "AAMkAGE3NjJhOTVhLTNkZDQtNDE2OS05ZjU0LTJmOGQ0YTY2YTdiZQBGAAAAAAD3AG5jNnlgQJvdCL_KgXJIBwBsww5BlIxtT7iFyYWrXV3AAAAAAAENAABsww5BlIxtT7iFyYWrXV3AAACSDwYdAAA=",    
            "start": {
                "dateTime": "2022-04-26T10:30:00.0000000",
                "timeZone": "UTC"
            },
            "end": {
                "dateTime": "2022-04-26T11:00:00.0000000",
                "timeZone": "UTC"
            },    
            "onlineMeeting": {
                "joinUrl": "https://teams.microsoft.com/l/meetup-join/19%3ameeting_MTM5OTY3MGUtNmY4Mi00Yjg4LTk2MDUtY2IyZGRlNmU1ZjA2%40thread.v2/0?context=%7b%22Tid%22%3a%222432b57b-0abd-43db-aa7b-16eadd115d34%22%2c%22Oid%22%3a%2214b779ae-cb64-47e7-a512-52fd50a4154d%22%7d"
            },
            "calendar@odata.associationLink": "https://graph.microsoft.com/beta/users('14b779ae-cb64-47e7-a512-52fd50a4154d')/calendars('AAMkAGE3NjJhOTVhLTNkZDQtNDE2OS05ZjU0LTJmOGQ0YTY2YTdiZQAuAAAAAAD3AG5jNnlgQJvdCL_KgXJIAQBsww5BlIxtT7iFyYWrXV3AAAAAAAENAAA=')/$ref",
            "calendar@odata.navigationLink": "https://graph.microsoft.com/beta/users('14b779ae-cb64-47e7-a512-52fd50a4154d')/calendars('AAMkAGE3NjJhOTVhLTNkZDQtNDE2OS05ZjU0LTJmOGQ0YTY2YTdiZQAuAAAAAAD3AG5jNnlgQJvdCL_KgXJIAQBsww5BlIxtT7iFyYWrXV3AAAAAAAENAAA=')"
        }
        ```
      </details>
        <br>

3. Get `OnlineMeetingId` through joinWebUrl and `OrganizerId`.

/ `id` /

#### Obtain meeting details using user-level notification

Choose to subscribe your app to user-level notifications. When a meeting is scheduled for a particular user, the notification is sent to your app. It can be done using calendar events as well.

### Use Bot Framework to get meeting ID and organizer ID

/ Add details /

## Use Graph APIs to fetch transcript

Leverage Graph REST APIs to get transcripts for a particular meeting. Your app fetches the transcripts based on the user ID of the meeting organizer and the meeting ID.

The following APIs are used for fetching transcripts:

- [List callTranscripts](#list-calltranscripts)
- [Get callTranscript](#get-calltranscript)
- [Get callTranscript content](#get-calltranscript-content)

### List callTranscripts

This API is used to get a list of all `callTranscript` objects based on the user ID and meeting ID. It returns the metadata of the transcripts of the meeting, which contains the transcript ID and the created date and time of that transcript.

**HTTP request**

```http
GET /me/onlineMeetings({meetingId})/transcripts
GET /users({userId})/onlineMeetings({meetingId})/transcripts
```

**Optional query parameters**

The method supports the `$skipToken` and `$top` [OData query parameters](/graph/query-parameters) to help customize the response.

**Supported query patterns**

| Pattern                | Supported | Syntax                                 | Notes |
| ---------------------- | ------- | -------------------------------------- | ----- |
| Server-side pagination |     ✓     | `@odata.nextLink`                      | Get a continuation token in the response, when a result set spans multiple pages. |
| Page limit             |     ✓     | `/transcripts?$top=20` | Get transcripts with page size 20. Default page limit is 10. Max page limit is 100. |

**Request headers**

| Header       | Value |
|:---------------|:--------|
| Authorization  | Bearer {token}. Required.  |

**Request body**

Don't supply a request body for this method.

**Response**

If successful, this method returns a `200 OK` response code and a collection of `callTranscript` objects in the response body.

<br>
<details>
<summary><b>Example: List of callTranscript</b></summary>
<br>
<b>Request</b>
<br>

```http
GET https://graph.microsoft.com/beta/users/ba321e0d-79ee-478d-8e28-85a19507f456/onlineMeetings/MSo1N2Y5ZGFjYy03MWJmLTQ3NDMtYjQxMy01M2EdFGkdRWHJlQ/transcripts
```

<br>
<b>Response</b>
<br>

> [!Note]
> The response object shown here might be shortened for readability.


```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "@odata.context": "https://graph.microsoft.com/beta/$metadata#users('ba321e0d-79ee-478d-8e28-85a19507f456')/onlineMeetings('MSo1N2Y5ZGFjYy03MWJmLTQ3NDMtYjQxMy01M2EdFGkdRWHJlQ')/transcripts",
    "@odata.count": 3,
    "@odata.nextLink": "https://graph.microsoft.com/beta/users('ba321e0d-79ee-478d-8e28-85a19507f456')/onlineMeetings('MSo1N2Y5ZGFjYy03MWJmLTQ3NDMtYjQxMy01M2EdFGkdRWHJlQ')/transcripts?$skiptoken=MSMjMCMjMjAyMS0wOS0xNlQxMzo1OToyNy4xMjEwMzgzWg%3d%3d",
    "value": [
        {
            "id": "MSMjMCMjZDAwYWU3NjUtNmM2Yi00NjQxLTgwMWQtMTkzMmFmMjEzNzdh",
            "createdDateTime": "2021-09-17T06:09:24.8968037Z"
        },
        {
            "id": "MSMjMCMjMzAxNjNhYTctNWRmZi00MjM3LTg5MGQtNWJhYWZjZTZhNWYw",
            "createdDateTime": "2021-09-16T18:58:58.6760692Z"
        },
        {
            "id": "MSMjMCMjNzU3ODc2ZDYtOTcwMi00MDhkLWFkNDItOTE2ZDNmZjkwZGY4",
            "createdDateTime": "2021-09-16T18:56:00.9038309Z"
        }        
    ]
}
```

</details>
<br>

### Get callTranscript

Your app parses through the list of transaction IDs, received as the response of the `List callTranscripts` API, to get the required transcript ID. This API is used to get a single transcript metadata based on the user ID, meeting ID, and transcript ID.

**HTTP request**

```http
GET me/onlineMeetings({meetingId})/transcripts({transcriptId})
GET users({userId})/onlineMeetings({meetingId})/transcripts({transcriptId})
```

**Request headers**

| Header       | Value |
|:---------------|:--------|
| Authorization  | Bearer {token}. Required.  |

**Request body**

Don't supply a request body for this method.

**Response**

If successful, this method returns a `200 OK` response code and a `callTranscript` object in the response body.

<br>
<details>
<summary><b>Example: Get a callTranscript</b></summary>
<br>
<b>Request</b>
<br>

```http
GET https://graph.microsoft.com/beta/users/ba321e0d-79ee-478d-8e28-85a19507f456/onlineMeetings/MSo1N2Y5ZGFjYy03MWJmLTQ3NDMtYjQxMy01M2EdFGkdRWHJlQ/transcripts/MSMjMCMjNzU3ODc2ZDYtOTcwMi00MDhkLWFkNDItOTE2ZDNmZjkwZGY4
```

<br>
<b>Response</b>
<br>

> [!NOTE]
> The response object shown here might be shortened for readability.


```http
HTTP/1.1 200 OK
Content-type: application/json

{
    "@odata.context": "https://graph.microsoft.com/beta/$metadata#users('ba321e0d-79ee-478d-8e28-85a19507f456')/onlineMeetings('MSo1N2Y5ZGFjYy03MWJmLTQ3NDMtYjQxMy01M2EdFGkdRWHJlQ')/transcripts/$entity",
    "id": "MSMjMCMjNzU3ODc2ZDYtOTcwMi00MDhkLWFkNDItOTE2ZDNmZjkwZGY4",
    "createdDateTime": "2021-09-17T06:09:24.8968037Z"
}
```
</details>
<br>

### Get callTranscript content

This API is used to get the transcript of the selected transcript ID that was obtained in the response of the `Get callTranscript` API. It returns the content of the transcript.

**HTTP request**

```http
GET me/onlineMeetings({meetingId})/transcripts({transcriptId})/content
GET users({userId})/onlineMeetings({meetingId})/transcripts({transcriptId})/content
```

**Optional query parameters**

This method supports the `$format` [OData query parameter](/graph/query-parameters) that allows response customization.

The supported format types are `text/vtt` for vtt OR `application/vnd.openxmlformats-officedocument.wordprocessingml.document` for docx format.

**Request headers**

| Header       | Value |
|:---------------|:--------|
| Authorization  | Bearer {token}. Required.  |
| Accept  | text/vtt OR  application/vnd.openxmlformats-officedocument.wordprocessingml.document. Optional.  |

**Request body**

Don't supply a request body for this method.

**Response**

If successful, this method returns a `200 OK` response code and contains bytes for callTranscript object in the response body. `content-type` header specifies type of the transcript content.

**Examples**
<br>
<details>
<summary><b>Example 1: Get a callTranscript content</b></summary>
<br>
<b>Request</b>
<br>

```http
GET https://graph.microsoft.com/beta/users/ba321e0d-79ee-478d-8e28-85a19507f456/onlineMeetings/MSo1N2Y5ZGFjYy03MWJmLTQ3NDMtYjQxMy01M2EdFGkdRWHJlQ/transcripts/MSMjMCMjNzU3ODc2ZDYtOTcwMi00MDhkLWFkNDItOTE2ZDNmZjkwZGY4/content
```

<br>
<b>Response</b>
<br>
Response contains bytes for the transcript in the body. The `content-type` header specifies type of the transcript content.

> [!NOTE]
> The response object shown here might be shortened for readability.

```http
HTTP/1.1 200 OK
Content-type: text/vtt

WEBVTT
    
0:0:0.0 --> 0:0:5.320
<v User Name>This is a transcript test.</v>
```
</details>
<br>
<details>
<summary><b>Example 2: Get a callTranscript content specifying $format query param</b></summary>
<br>
<b>Request</b>
<br>

```http
GET https://graph.microsoft.com/beta/users/ba321e0d-79ee-478d-8e28-85a19507f456/onlineMeetings/MSo1N2Y5ZGFjYy03MWJmLTQ3NDMtYjQxMy01M2EdFGkdRWHJlQ/transcripts/MSMjMCMjNzU3ODc2ZDYtOTcwMi00MDhkLWFkNDItOTE2ZDNmZjkwZGY4/content?$format=text/vtt
 ```

<br>
<b>Response</b>
<br>
Response contains bytes for the transcript in the body. The `content-type` header specifies type of the transcript content.

> [!NOTE]
> The response object shown here might be shortened for readability.

```http
HTTP/1.1 200 OK
Content-type: text/vtt
    
WEBVTT
    
0:0:0.0 --> 0:0:5.320
<v User Name>This is a transcript test.</v>
```
</details>
<br>
<details>
<summary><b>Example 3: Get a callTranscript content specifying Accept header</b></summary>
<br>
<b>Request</b>
<br>

```http
GET https://graph.microsoft.com/beta/users/ba321e0d-79ee-478d-8e28-85a19507f456/onlineMeetings/MSo1N2Y5ZGFjYy03MWJmLTQ3NDMtYjQxMy01M2EdFGkdRWHJlQ/transcripts/MSMjMCMjNzU3ODc2ZDYtOTcwMi00MDhkLWFkNDItOTE2ZDNmZjkwZGY4/content
Accept: application/vnd.openxmlformats-officedocument.wordprocessingml.document
```

<br>
<b>Response</b>
<br>
Response contains bytes for the transcript in the body. `Content-Type` header specifies type of the transcript content.

> [!NOTE]
> The response object shown here might be shortened for readability.

```http
HTTP/1.1 200 OK
Content-type: application/vnd.openxmlformats-officedocument.wordprocessingml.document
    
0:0:0.0 --> 0:0:5.320
User Name
This is a transcript test.
```
</details>
<br>
<details>
<summary><b>Example 4: Get a callTranscript content with $format getting precedence over the accept header</b></summary>
<br>
<b>Request</b>
<br>

```http
GET https://graph.microsoft.com/beta/users/ba321e0d-79ee-478d-8e28-85a19507f456/onlineMeetings/MSo1N2Y5ZGFjYy03MWJmLTQ3NDMtYjQxMy01M2EdFGkdRWHJlQ/transcripts/MSMjMCMjNzU3ODc2ZDYtOTcwMi00MDhkLWFkNDItOTE2ZDNmZjkwZGY4/content?$format=text/vtt
Accept: application/vnd.openxmlformats-officedocument.wordprocessingml.document
```

<br>
<b>Response</b>
<br>
Response contains bytes for the transcript in the body. `Content-Type` header specifies type of the transcript content.

> [!NOTE]
> The response object shown here might be shortened for readability.

```http
HTTP/1.1 200 OK
Content-type: text/vtt
    
WEBVTT
   
0:0:0.0 --> 0:0:5.320
<v User Name>This is a transcript test.</v>
```
</details>

<!--| App users may be invited to attend multiple meetings at the same time. To attend one meeting, the app user would need to forfeit the other. | The meetings transcripts provide content discussed in the meeting by all collaborators. If the app user is unable to attend one of the meetings, the transcripts are a ready reference to the discussion. |-->

<!--
## Fetch transcripts at runtime

When your app fetches the transcripts, it interacts with Microsoft Graph, Teams Graph Service (TGS), and Microsoft Artifacts Service (MAS). Ensure that you've configured your app with required permissions on Azure portal and subscribed to the necessary change notifications.

:::image type="content" source="../../assets/images/graph-api/flow-2.png" alt-text="Graph REST APIs to fetch transcripts in post-meeting scenario" border="false":::

| # | Interaction | What's going on ... |
| --- | --- | --- |
| 1 | Meeting notification to your app | Your app receives the notification for a meeting event. |
| 2 | Your app → Microsoft Graph | Your app sends the API request to Microsoft. It calls for: <br> 1. list of transcripts <br> 2. Specific transcript metadata selected from the list of transcripts <br> 3. Transcript content for the selected transcript. |
| 3 |  Microsoft Graph → TGS | Microsoft Graph forwards the API request to TGS. |
| 4 | TGS → Permission check | TGS checks if your app is authorized with the required permissions for accessing the meeting transcripts. |
| 5 | TGS → MAS | After successful validation, TGS forwards the APi request to MAS to fetch the transcript metadata or transcript content, depending on the API request. |
| 6 | TGS → your app | TGS receives the API request and responds to TGS with transcript metadata or transcript content, which forwards it to Microsoft Graph, and eventually to your app. |-->

<!--
/ suggestion - graphic to show comparative flows for both permission methods /
When your app fetches the transcripts, it interacts with Microsoft Graph, Teams Graph Service (TGS), Microsoft Artifacts Service (MAS). Ensure that you've configured your app with required permissions on Azure portal and subscribed to the necessary change notifications.

:::image type="content" source="../../assets/images/graph-api/flow-2.png" alt-text="Graph REST APIs to fetch transcripts in post-meeting scenario":::

| # | Interaction | What's going on ... |
| --- | --- | --- |
| 1 | Meeting notification to your app | Your app receives the notification for a meeting event. |
| 2 | Your app → Microsoft Graph | Your app sends the API request to Microsoft. It calls for: <br> 1. list of transcripts <br> 2. Specific transcript metadata selected from the list of transcripts <br> 3. Transcript content for the selected transcript. |
| 3 |  Microsoft Graph → TGS | Microsoft Graph forwards the API request to TGS. |
| 4 | TGS → Permission check | TGS checks if your app is authorized with the required permissions for accessing the meeting transcripts. |
| 5 | TGS → MAS | After successful validation, TGS forwards the APi request to MAS to fetch the transcript metadata or transcript content, depending on the API request. |
| 6 | TGS → your app | TGS receives the API request and responds to TGS with transcript metadata or transcript content, which forwards it to Microsoft Graph, and eventually to your app. |

-->

