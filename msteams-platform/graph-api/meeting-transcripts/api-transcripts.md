---
title: Use Graph APIs to fetch transcript
description: Describes the APIs to fetch meeting transcripts
ms.localizationpriority: high
ms.topic: conceptual
ms.date: 08/03/2022
---
# Use Graph APIs to fetch transcript

Use Graph REST APIs to get transcripts for a particular meeting. Your app fetches the transcripts based on the user ID of the meeting organizer and the meeting ID.

The following APIs are used for fetching transcripts:

- [List callTranscripts](#list-calltranscripts)
- [Get callTranscript](#get-calltranscript)
- [Get callTranscript content](#get-calltranscript-content)

### List callTranscripts

This API is used to get a list of all `callTranscript` objects based on the user ID and meeting ID. It returns the metadata of the transcripts of the meeting, which contains the transcript ID and the created date and time of that transcript.

**HTTP request**

```http
GET /me/onlineMeetings('{meetingId}')/transcripts
GET /users('{userId}')/onlineMeetings('{meetingId}')/transcripts
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

> [!NOTE]
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

### Get callTranscript

Your app parses through the list of transcript IDs, received as the response of the `List callTranscripts` API, to get the required transcript ID. This API is used to get a single transcript metadata based on the user ID, meeting ID, and transcript ID.

**HTTP request**

```http
GET me/onlineMeetings('{meetingId}')/transcripts('{transcriptId}')
GET users('{userId}')/onlineMeetings('{meetingId}')/transcripts('{transcriptId}')
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

### Get callTranscript content

This API is used to get the transcript of the selected transcript ID that was obtained in the response of the `Get callTranscript` API. It returns the content of the transcript.

**HTTP request**

```http
GET me/onlineMeetings('{meetingId}')/transcripts('{transcriptId}')/content
GET users('{userId}')/onlineMeetings('{meetingId}')/transcripts('{transcriptId}')/content
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

If successful, this method returns a `200 OK` response code and contains bytes for callTranscript object in the response body. The `content-type` header specifies type of the transcript content.

**Examples**
<br>
<details>
<summary><b>Example: Get a callTranscript content</b></summary>
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
<summary><b>Example: Get a callTranscript content specifying $format query param</b></summary>
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
<summary><b>Example: Get a callTranscript content specifying Accept header</b></summary>
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

Response contains bytes for the transcript in the body. The `content-Type` header specifies type of the transcript content.

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
<summary><b>Example: Get a callTranscript content with $format getting precedence over the accept header</b></summary>
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

Response contains bytes for the transcript in the body. The `content-Type` header specifies type of the transcript content.

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

