---
title: Use Microsoft Graph to fetch transcripts for a Teams meeting
description: Describes the process, scenarios, and APIs to fetch transcripts in a post-meeting scenario 
ms.localizationpriority: medium
ms.topic: concept
keywords: teams Graph transcripts meeting organizer Azure rsc
---
# Get meeting transcripts using Graph API

You can now configure your app to fetch Teams meeting transcripts in post-meeting scenario. Use Graph REST APIs to access and obtain transcripts generated during a Teams meeting.

Here are some examples of how your app users can benefit from fetching transcripts post-meeting:

| Use case | How Transcript APIs help... |
| --- | --- |
| App users may be invited to attend multiple meetings at the same time. To attend one meeting, the app user would need to forfeit the other. | The meetings transcripts provide content discussed in the meeting by all collaborators. If the app user is unable to attend one of the meetings, the transcripts are a ready reference to the discussion. |
| Participants in a brainstorming meeting need to continually take notes and provide summary post discussion. It impedes the flow of thoughts and participants stand to lose useful ideas or suggestions. | Using these APIs to fetch transcripts post-meeting takes this burden off. All participants can fully focus on the discussion and not be encumbered with taking notes, or writing meeting summary. |

To implement this feature, you must:

- Configure permissions for your app to fetching transcripts
- Subscribe to change notifications
- Use Graph APIs in your app

## Configure permissions to access transcript

Your app should have the required permissions for fetching transcripts. Choose from  resource specific consent (RSC) permissions or classic permissions. These options help you choose the meetings for which your app is authorized to get transcripts.

Your app can access and fetch transcripts for a Teams meetings in two ways:

- **Use RSC permission**: Your app could be installed in a Teams meeting and fetch transcript for that meeting.
- **Use classic permission**: You app could be authorized to access any meeting across the tenant, and get transcripts for them.

In both scenarios, when a transcript is generated after a Teams meeting is closed, your app can fetch the transcript. The content of the transcript is available for downloading by app users as a .vtt or as a .doc file.

You can [subscribe](#subscribe-to-change-notifications) your app to receive notifications of all relevant meeting events.

/ suggestion - graphic to show comparative flows for both scenarios /

> [!NOTE]
> The process for calling Graph APIs to access and retrieve transcripts remains the same for both scenarios.

### Use RSC permissions

If you want your app to fetch transcripts from a specific Team meeting, configure RSC permission for your app. The meeting organizer can install your app in the Teams meetings chat. After the meeting is closed, your app can make the API call to obtain the transcript for that meeting.

The following RSC permissions should be granted to your app:

| Permission | Display name | Description |
| --- | --- | --- |
| ONLINEMEETINGTRANSCRIPT.READ.CHAT | Read the transcript of the meeting | It allows the app to read transcripts of a meeting. It doesn't require the app user to be signed in for reading transcripts, and requires no administrator consent. |
| CHANNELMEETINGTRANSCRIPT.READ.GROUP | Read the transcript this team’s channel meeting | It allows the app to read the transcripts of a channel meeting associated with a team. It doesn't require an app user to be signed in, and requires no administrator consent. |

/ reference to article for configuring RSC permissions. /

### Use classic permissions

You can configure your app to access meeting transcripts across the tenant where it is installed. In this case, the meeting organized doesn't need to install your app in the meeting chat. Because of tenant-wide classic permissions authorized by tenant administrator, the app can read and access all meetings in the tenant.

The following permissions should be granted:

| Permission | Display name | Description |
| --- | --- | --- |
| ONLINEMEETINGTRANSCRIPT.READ.ALL | Read the transcript of the meeting | It allows the app to read meeting transcripts in your organization. It doesn't require an app user to be signed in. It does need the consent of the administrator. |

/ reference to article for configuring classic permissions. /

## Subscribe to change notifications

You can subscribe your app to receive change notifications for events. You can choose from user-level or tenant-level change notifications. These options help you choose the meeting events for which your app can obtain transcripts, if it is authorized via required permissions.

Your app receives notifications of meeting events for which it has subscribed:

- User level notification: Choose to subscribe your app to user-level notifications. When a meeting is scheduled for a particular user, the notification is sent to your app. This can be done by calendar events as well.
- Tenant level notification: You can subscribe your app to change notifications for meetings across the tenant. Any time, a meeting is scheduled in the tenant, the app is notified. Post meeting, the app can access and retrieve the meeting transcript.

/ reference to article for subscribing for notifications. /

## Use Graph APIs to fetch transcript

Teams Graph Service will apply Meeting Artifacts Service (https://aka.ms/meetingArtifactsApi) using the following APIs to get meeting’s transcripts.

The following APIs are used for fetching transcripts:

- [List callTranscripts](#list-calltranscripts)
- [Get callTranscript](#get-calltranscript)
- [Get callTranscript content](#get-calltranscript-content)

### List callTranscripts

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

If successful, this method returns a `200 OK` response code and a collection of callTranscript objects in the response body.

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

If successful, this method returns a `200 OK` response code and a callTranscript object in the response body.

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

Do not supply a request body for this method.

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

<!--Your app can access and fetch transcripts for a Teams meetings in two ways:

- **Use RSC permission**: Your app could be installed in a Teams meeting and fetch transcript for that meeting.
- **Use classic permission**: You app could be authorized to access any meeting across the tenant, and get transcripts for them.

In both scenarios, when a transcript is generated after a Teams meeting is closed, your app can fetch the transcript. The content of the transcript is available for downloading by app users as a .vtt or as a .doc file. The process for calling Graph APIs to access and retrieve transcripts remains the same for both scenarios.

Before your app can fetch meeting transcripts, you must:

- **Configure permissions**: Your app should have the required permissions for fetching transcripts. Choose from  resource specific consent (RSC) permissions or classic permissions. These options help you choose the meetings for which your app is authorized to get transcripts.
- **Subscribe to change notifications**: You must subscribe your app to receive change notifications for events. You can choose form user-level or tenant-level change notifications. These options help you choose the meeting events for which your app can obtain transcripts, if it is authorized via required permissions.-->