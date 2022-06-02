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
| You need to obtain transcripts for capturing meaningful insights from multiple meetings across the Sales vertical. Keeping track of all meetings, and retrieving them manually is time-consuming and inefficient. After the meeting is over, you'd need to examine conversations in all those meetings to obtain meaningful information. | If you configure your app to fetch meeting transcripts automatically, it gets the transcripts from all meetings relevant for your purpose. Your app can receive meeting notifications, and get the transcript when it's generated after the meeting. This data can then be used to gain: <br> • Aggregated insights and intelligence analysis <br> • New leads and highlights <br> • Meeting follow-ups and summaries |
| As an HR initiative, you're holding a brainstorming session to understand and improve employee health and productivity. Having to continually take notes to provide post-meeting summary can impede the flow of thoughts. You stand to lose useful valuable or suggestions. After the session, you'd need to analyze the discussion to gather data points for planning improvements. | Using Graph APIs to fetch transcripts post-meeting frees you and the participants to fully focus on the discussion. The content of the meeting transcript is available for: <br> • Engagement and sentiment analysis <br> • Listing tasks or issues <br> • Follow-up meetings and notifications |

To fetch the transcript for a particular meeting:

- [Configure required permissions for your app on Azure AD portal](#configure-permissions-to-access-transcript)
- [Obtain meeting ID and the user ID of the meeting organizer](#obtain-meeting-id-and-organizer-id)
- [Get transcripts using Graph REST APIs](#use-graph-apis-to-fetch-transcript)

## Configure permissions to access transcript

Your app must have the required permissions for fetching transcripts. Your app can access and fetch transcripts for a Teams meeting using classic permissions or RSC permissions.

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

Your app receives notification for the type of meeting events for which it's subscribed:

- [Tenant-level notification](#obtain-meeting-details-using-tenant-level-notification)
- [User-level notification](#obtain-meeting-details-using-user-level-notification)

When your app is notified of a scheduled meeting, it can retrieve the meeting ID and organizer ID from the notification message. Based on the meeting details, your app can fetch the meeting transcripts after the meeting has ended.

#### Obtain meeting details using tenant-level notification

Tenant-level notifications are useful if your app is authorized to access all meeting transcripts across the tenant. Subscribe your app to be notified for events when transcription starts or call ends for scheduled online Teams meetings. Post meeting, your app can access and retrieve the meeting transcript.

For subscribing your app to tenant-level notifications, see [Get change notifications](/graph/teams-changenotifications-chatmessage.md#subscribe-to-messages-across-all-chats).

When your app is notified about meeting events, it searches through the notifications for transcription started and meeting ended events. These events contain the chat ID, which is used to obtain chat entity, and eventually meeting ID and organizer ID.

To obtain meeting ID and organizer ID with tenant-level notification:

1. **Get chat ID**: Your app gets the `chatId` property from the notification to make subsequent calls. Your app can get the chat ID from the payloads of:

    - Transcription started event

        <details>
        <summary><b>Example</b>: Payload for `callTranscriptEventMessageDetail` event type</summary>
    
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

    - Call ended event

        <details>
        <summary><b>Example</b>: Payload for `callEndedEventMessageDetail` event type</summary>
    
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

2. **Get chat entity**: Using chat ID, your app can retrieve the chat entity to obtain the URL for joining the call. The `joinWebUrl` member of the `onlineMeetingInfo` property contains this URL, and is used to obtain meeting ID eventually. The organizer ID is also a part of the response payload. For more information, see [Get chat](/graph/api/chat-get.md).

    Use the following example to request chat entity based on the chat ID:

    ``` http
    GET https://graph.microsoft.com/beta/chats/19:meeting_NmU0NTkxYzMtM2Y2My00NzRlLWFmN2YtNTFiMGM5OWM3ZjY2@thread.v2
    ```

    The response payload contains the following:
    
    - **Organizer ID**: It's contained in the `id` member of the `organizer` property of response payload.
    - **URL for meeting call**: This URL is used to retrieve the meeting ID, and it's available in the response payload in one of the two scenarios:
        - If the meeting is an online Teams meeting, the `joinWebUrl` member of the `onlineMeetingInfo` property contains this URL.
        - If the meeting was not created as an online meeting from Teams client or Outlook client, it contains the `calendarEventId` member in the `onlineMeetingInfo` property. Your app can use the `calendarEventId` to obtain `joinUrl`, which is the same as `joinWebUrl`.
      
      For more information, see [Get event](/graph/api/event-get?view=graph-rest-1.0&tabs=http&preserve-view=true).

      Examples for response payload scenarios depending on the type of URL for joining the meeting call:

        - Online Teams meeting
        
            <details>
            <summary><b>Example</b>: Response payload, if `joinWebUrl` is available</b></summary>
            
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
    
        - Meeting scheduled through Teams client or Outlook client, not marked as an online meeting
            
            <details>
            <summary><b>Example</b>: Response payload, if `calendarEventId` is available</summary>
            
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
    
            - Use the following example to get `joinWebUrl` from the `calendarEventId`:
              
              ``` http
                GET https://graph.microsoft.com/beta/users/14b779ae-cb64-47e7-a512-52fd50a4154d/events/AAMkAGE3NjJhOTVhLTNkZDQtNDE2OS05ZjU0LTJmOGQ0YTY2YTdiZQBGAAAAAAD3AG5jNnlgQJvdCL_KgXJIBwBsww5BlIxtT7iFyYWrXV3AAAAAAAENAABsww5BlIxtT7iFyYWrXV3AAACSDwYdAAA=
              ```
    
              The response payload of this request contains `joinUrl`.
    
                > [!NOTE]
                > `joinUrl` is the same as `joinWebUrl`.
    
              <br>
              <details>
              <summary><b>Example</b>: Response payload that contains the `joinUrl` in the `onlineMeeting` property</summary>
                
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

3. **Get meeting ID**: Use `joinWebUrl` to get the meeting ID.

    Use the following example to request the online meeting ID:

    ``` http
    GET https://graph.microsoft.com/beta/users('14b779ae-cb64-47e7-a512-52fd50a4154d')/onlineMeetings?$filter=JoinWebUrl%20eq%20'https://teams.microsoft.com/l/meetup-join/19%3ameeting_MTM5OTY3MGUtNmY4Mi00Yjg4LTk2MDUtY2IyZGRlNmU1ZjA2%40thread.v2/0?context=%7b%22Tid%22%3a%222432b57b-0abd-43db-aa7b-16eadd115d34%22%2c%22Oid%22%3a%2214b779ae-cb64-47e7-a512-52fd50a4154d%22%7d'
    ```

    The response payload contains the meeting ID in the `id` member of the `value` property.
    <br>
    <details>
    <summary><b>Example</b>: Response payload with meeting ID</summary>
    
    ```json
    {
        "@odata.context": "https://graph.microsoft.com/beta/$metadata#users('14b779ae-cb64-47e7-a512-52fd50a4154d')/onlineMeetings",
        "value": [
            {
                "id": "MSoxNGI3NzlhZS1jYjY0LTQ3ZTctYTUxMi01MmZkNTBhNDE1NGQqMCoqMTk6bWVldGluZ19NVE01T1RZM01HVXRObVk0TWkwMFlqZzRMVGsyTURVdFkySXlaR1JsTm1VMVpqQTJAdGhyZWFkLnYy",
                "creationDateTime": "2022-04-26T07:41:17.3736455Z",
                "startDateTime": "2022-04-26T10:30:00Z",
                "endDateTime": "2022-04-26T11:00:00Z",
                "joinUrl": "https://teams.microsoft.com/l/meetup-join/19%3ameeting_MTM5OTY3MGUtNmY4Mi00Yjg4LTk2MDUtY2IyZGRlNmU1ZjA2%40thread.v2/0?context=%7b%22Tid%22%3a%222432b57b-0abd-43db-aa7b-16eadd115d34%22%2c%22Oid%22%3a%2214b779ae-cb64-47e7-a512-52fd50a4154d%22%7d",
                "joinWebUrl": "https://teams.microsoft.com/l/meetup-join/19%3ameeting_MTM5OTY3MGUtNmY4Mi00Yjg4LTk2MDUtY2IyZGRlNmU1ZjA2%40thread.v2/0?context=%7b%22Tid%22%3a%222432b57b-0abd-43db-aa7b-16eadd115d34%22%2c%22Oid%22%3a%2214b779ae-cb64-47e7-a512-52fd50a4154d%22%7d",
                "chatInfo": {
                    "threadId": "19:meeting_MTM5OTY3MGUtNmY4Mi00Yjg4LTk2MDUtY2IyZGRlNmU1ZjA2@thread.v2",
                    "messageId": "0",
                    "replyChainMessageId": null
                }
            }
        ]
    }
    ```
    </details>

    > [!NOTE]
    > The response payload also contains the `threadID` member in the `chatInfo` property. This value is used for obtaining meeting ID if your app is subscribed receiving user-level notifications.

4. **Fetch transcript**: The organizer ID and meeting ID obtained in the Steps 2 and 3 let your app fetch the transcripts for that particular meeting event.

    Use the following example to request the transcripts for a specific meeting in the .vtt format:

    ```http
    GET https://graph.microsoft.com/beta/users('14b779ae-cb64-47e7-a512-52fd50a4154d')/onlineMeetings('MSoxNGI3NzlhZS1jYjY0LTQ3ZTctYTUxMi01MmZkNTBhNDE1NGQqMCoqMTk6bWVldGluZ19ObVUwTlRreFl6TXRNMlkyTXkwME56UmxMV0ZtTjJZdE5URmlNR001T1dNM1pqWTJAdGhyZWFkLnYy')/transcripts('MSMjMCMjMDEyNjJmNjgtOTc2Zi00MzIxLTlhNDQtYThmMmY4ZjQ1ZjVh')/content?$format=text/vtt
    ```

    In this example:
    - The meeting ID is included as the value for `onlineMeetings`: *MSoxNGI3NzlhZS1jYjY0LTQ3ZTctYTUxMi01MmZkNTBhNDE1NGQqMCoqMTk6bW
VldGluZ19ObVUwTlRreFl6TXRNMlkyTXkwME56UmxMV0ZtTjJZdE5URmlNR001T1dNM
1pqWTJAdGhyZWFkLnYy*
    - The organizer ID is *14b779ae-cb64-47e7-a512-52fd50a4154d*

    The response payload will contain the transcripts in .vtt format.

#### Obtain meeting details using user-level notification

Choose to subscribe your app to user-level notifications. When a meeting is scheduled for a particular user, the notification is sent to your app. It can be done using calendar events as well.

For subscribing your app to tenant-level notifications, see [Change notifications for Outlook resources in Microsoft Graph](/graph/outlook-change-notifications-overview.md).

Use the following example to subscribe to user-level notifications.

```http
    
POST https://graph.microsoft.com/beta/subscriptions/
{
    "changeType": "created,updated,deleted",
    "notificationUrl": "https://tgsrelaynandanmankad.servicebus.windows.net/notifynandanmankadpc/notifications",
    "resource": "users('1273a016-201d-4f95-8083-1b7f99b3edeb')/events",
    "expirationDateTime": "2022-05-05T14:58:56.7951795+00:00",
    "clientState": "ClientSecret",
    "includeResourceData": false
}
```

When your app is notified about a meeting event, it looks for calendar event ID in the notification. Use the event ID to get `JoinWebUrl` for to retrieving a specific chat ID and subscribing to its messages. After your app has subscribed to the chat messages, following the steps for obtaining meeting ID and organizer ID as given for [tenant-level notifications](#obtain-meeting-details-using-tenant-level-notification).

To obtain meeting ID and organizer ID with user-level notification:

1. **Get event ID**: Your app gets the `eventId` property from the notification payload.

    <details>
    <summary><b>Example</b>: Notification payload</summary>
    
    ```json
    {
        "subscriptionId": "ef30cdc6-b5ae-4702-b924-f458fd9e5fc3",
        "changeType": "created",
        "tenantId": "2432b57b-0abd-43db-aa7b-16eadd115d34",
        "clientState": "ClientSecret",
        "subscriptionExpirationDateTime": "2022-05-05T07:54:53.1886542-07:00",
        "resource": "Users/1273a016-201d-4f95-8083-1b7f99b3edeb/Events/AAMkADY0NjM1MjRhLTNiNjAtNDBiOC1hYTQxLThkMjAxN2QzMjZhYQBGAAAAAAC03Gz8aL_JQp2Kxvw5a29SBwDFFWHjtoMRTqdrVyQ1h8yLAAAAAAENAADFFWHjtoMRTqdrVyQ1h8yLAAFwC7nAAAA=",
        "resourceData": {}
    }
    ```

    In this example, the `eventID` is *AAMkADY0NjM1MjRhLTNiNjAtNDBiOC1hYTQxLThkMjAxN2QzMjZhYQBGAAAAAAC03Gz8aL_JQp2Kxvw5a29SBwDFFWHjtoMRTqdrVyQ1h8yLAAAAAAENAADFFWHjtoMRTqdrVyQ1h8yLAAFwC7nAAAA=*
    </details>

2. **Get meeting URL**: Use the event ID to retrieve the `joinUrl`. For more information, see [Get event](/graph/api/event-get.md).

    Use the following example to request the meeting URL:

    ```http
    GET https://graph.microsoft.com/beta/users/1273a016-201d-4f95-8083-1b7f99b3edeb/events/AAMkADY0NjM1MjRhLTNiNjAtNDBiOC1hYTQxLThkMjAxN2QzMjZhYQBGAAAAAAC03Gz8aL_JQp2Kxvw5a29SBwDFFWHjtoMRTqdrVyQ1h8yLAAAAAAENAADFFWHjtoMRTqdrVyQ1h8yLAAFwC7nAAAA=
    ```

    The response payload contains the  `joinUrl`.

    <details>
    <summary><b>Example</b>: Response payload for getting meeting URL</summary>
    
    ```json
        {
            "@odata.context": "https://graph.microsoft.com/beta/$metadata#users('1273a016-201d-4f95-8083-1b7f99b3edeb')/events/$entity",
            "@odata.etag": "W/\"xRVh47aDEU6na1ckNYfMiwABb2Twsg==\"",
            "id": "AAMkADY0NjM1MjRhLTNiNjAtNDBiOC1hYTQxLThkMjAxN2QzMjZhYQBGAAAAAAC03Gz8aL_JQp2Kxvw5a29SBwDFFWHjtoMRTqdrVyQ1h8yLAAAAAAENAADFFWHjtoMRTqdrVyQ1h8yLAAFwC7nAAAA=",    
            "start": {
                "dateTime": "2022-05-06T15:00:00.0000000",
                "timeZone": "UTC"
            },
            "end": {
                "dateTime": "2022-05-06T15:30:00.0000000",
                "timeZone": "UTC"
            },
            
            "onlineMeeting": {
                "joinUrl": "https://teams.microsoft.com/l/meetup-join/19%3ameeting_MjExYzJiMTItZDY1MS00ZGZkLWE5YzQtZTBmNWI1MDg2M2Uw%40thread.v2/0?context=%7b%22Tid%22%3a%222432b57b-0abd-43db-aa7b-16eadd115d34%22%2c%22Oid%22%3a%221273a016-201d-4f95-8083-1b7f99b3edeb%22%7d",
                "conferenceId": "438824583",
                "tollNumber": "+1 213-279-1007"
            }    
        }
        ```

    </details>

3. **Get chat thread ID**: Use `joinWebUrl` to get the chat's thread ID.

    Use the following example to request the thread ID:

    ``` http
    GET https://graph.microsoft.com/beta/users('14b779ae-cb64-47e7-a512-52fd50a4154d')/onlineMeetings?$filter=JoinWebUrl%20eq%20'https://teams.microsoft.com/l/meetup-join/19%3ameeting_MTM5OTY3MGUtNmY4Mi00Yjg4LTk2MDUtY2IyZGRlNmU1ZjA2%40thread.v2/0?context=%7b%22Tid%22%3a%222432b57b-0abd-43db-aa7b-16eadd115d34%22%2c%22Oid%22%3a%2214b779ae-cb64-47e7-a512-52fd50a4154d%22%7d'
    ```

    The response payload contains the `threadID` member in the `chatInfo` property.
    <br>
    <details>
    <summary><b>Example</b>: Response payload with thread ID</summary>
    
    ```json
    {
        "@odata.context": "https://graph.microsoft.com/beta/$metadata#users('14b779ae-cb64-47e7-a512-52fd50a4154d')/onlineMeetings",
        "value": [
            {
                "id": "MSoxNGI3NzlhZS1jYjY0LTQ3ZTctYTUxMi01MmZkNTBhNDE1NGQqMCoqMTk6bWVldGluZ19NVE01T1RZM01HVXRObVk0TWkwMFlqZzRMVGsyTURVdFkySXlaR1JsTm1VMVpqQTJAdGhyZWFkLnYy",
                "creationDateTime": "2022-04-26T07:41:17.3736455Z",
                "startDateTime": "2022-04-26T10:30:00Z",
                "endDateTime": "2022-04-26T11:00:00Z",
                "joinUrl": "https://teams.microsoft.com/l/meetup-join/19%3ameeting_MTM5OTY3MGUtNmY4Mi00Yjg4LTk2MDUtY2IyZGRlNmU1ZjA2%40thread.v2/0?context=%7b%22Tid%22%3a%222432b57b-0abd-43db-aa7b-16eadd115d34%22%2c%22Oid%22%3a%2214b779ae-cb64-47e7-a512-52fd50a4154d%22%7d",
                "joinWebUrl": "https://teams.microsoft.com/l/meetup-join/19%3ameeting_MTM5OTY3MGUtNmY4Mi00Yjg4LTk2MDUtY2IyZGRlNmU1ZjA2%40thread.v2/0?context=%7b%22Tid%22%3a%222432b57b-0abd-43db-aa7b-16eadd115d34%22%2c%22Oid%22%3a%2214b779ae-cb64-47e7-a512-52fd50a4154d%22%7d",
                "chatInfo": {
                    "threadId": "19:meeting_MTM5OTY3MGUtNmY4Mi00Yjg4LTk2MDUtY2IyZGRlNmU1ZjA2@thread.v2",
                    "messageId": "0",
                    "replyChainMessageId": null
                }
            }
        ]
    }
    ```
    </details>

4. **Subscribe to chat messages**: Use chat ID to subscribe your app to chat messages for that particular meeting. For more information, see [Subscribe to messages in a chat](/graph/teams-changenotifications-chatmessage.md#subscribe-to-messages-in-a-chat).
    
    If you want your app to subscribe to messages with specific text, see [Subscribe to messages in a chat that contain certain text](/graph/teams-changenotifications-chatmessage.md#example-2-subscribe-to-messages-in-a-chat-that-contain-certain-text).

5. Follow steps for [tenant-level notifications](#obtain-meeting-details-using-tenant-level-notification) for obtaining meeting and ID and organizer ID.

### Use Bot Framework to get meeting ID and organizer ID

Your app can use the Bot Framework for obtaining meeting ID and organizer ID.

> [!NOTE]
> The bot can receive meeting start or end events automatically from all the meetings created in all the channels by adding `ChannelMeeting.ReadBasic.Group` to manifest for RSC permission.

To obtain meeting ID and organizer ID from a bot app:

1. **Meeting URL**: The bot app can get the URL for joining the meeting call that is used to get the meeting ID eventually. The organizer ID is also a part of the response payload.

    Use the following example to request meeting details:

    ```json
    GET /v1/meetings/{meetingId}
    ```

    The response payload contains the following:
    
    - **Organizer ID**: It's contained in the `id` member of the `organizer` property of response payload.
    - **URL for meeting call**: This URL is used to retrieve the meeting ID. It's contained in the 'joinUrl' member of the `details` property.

    For more information, see [Meeting apps API references](/apps-in-teams-meetings/api-references.md).

    <details>
    <summary><b>Example</b>: Response payload for getting meeting details</b></summary>
    
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

    > [!NOTE]
    > The meeting ID contained in the `id` member of the `details` property is different from the id that your app needs to fetch transcripts. Use `joinUrl` to get the correct meeting ID for fetching transcripts.

    </details>


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

## See also

- [Resource-specific consent](/graph-api/rsc/resource-specific-consent)
