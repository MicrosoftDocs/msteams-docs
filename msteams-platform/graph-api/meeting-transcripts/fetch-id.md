---
title: Obtain meeting ID and organizer ID for fetching meeting transcripts and recordings
description: Describes the process of Obtain meeting ID and organizer ID for fetching meeting transcripts and recordings
ms.localizationpriority: high
ms.topic: conceptual
---
# Obtain meeting ID and organizer ID

Your app can fetch transcripts and recordings of a meeting using the meeting ID and the user ID of the meeting organizer, also known as organizer ID. The Graph REST APIs fetch transcripts and recordings based on the meeting ID and organizer ID that are passed as parameters in the API.

> [!NOTE]
> The meeting ID for scheduled meetings may expire in some days if it's unused. It can be revived by using the meeting URL to join the meeting. For more information about meeting expiration timeline for different meeting types, see [meeting expiration](/microsoftteams/limits-specifications-teams#meeting-expiration).

To obtain meeting ID and organizer ID for fetching the transcript, choose one of the two ways:

- [Subscribe to change notifications](#subscribe-to-change-notifications)
- [Use Bot Framework](#use-bot-framework-to-get-meeting-id-and-organizer-id)

## Subscribe to change notifications

You can subscribe your app to receive change notifications for scheduled meeting events. When your app is notified about the subscribed meeting events, it can obtain transcripts and recordings, if it's authorized via required Azure AD permissions.

Your app receives notification for the type of meeting events for which it's subscribed:

- [User-level notification](#obtain-meeting-details-using-user-level-notification)
- [Tenant-level notification](#obtain-meeting-details-using-tenant-level-notification)

When your app is notified of a subscribed meeting event, it can retrieve the meeting ID and organizer ID from the notification message. Based on the meeting details obtained, your app can fetch the meeting transcripts and recordings after the meeting has ended.

## Obtain meeting details using user-level notification

Choose to subscribe your app to user-level notifications for getting transcripts and recordings of a particular user's meeting event. When a meeting is scheduled for that user, your app is notified. Your app can receive meeting notifications using calendar events as well.

For subscribing your app to calendar events, see [change notifications for Outlook resources in Microsoft Graph](/graph/outlook-change-notifications-overview).

Use the following example to subscribe to user-level notifications:

```http
    
POST https://graph.microsoft.com/v1.0/subscriptions/
{
    "changeType": "created,updated,deleted",
    "notificationUrl": "https://webhook.azurewebsites.net/api/send/myNotifyClient",
    "resource": "users('1273a016-201d-4f95-8083-1b7f99b3edeb')/events",
    "expirationDateTime": "2022-05-05T14:58:56.7951795+00:00",
    "clientState": "ClientSecret",
    "includeResourceData": false
}
```

When your app is notified about a subscribed meeting event, it looks for calendar event ID in the notification. Use the event ID to get `JoinWebUrl` for retrieving a specific chat ID and subscribing to its messages. After your app has subscribed to the chat messages, follow the steps given for [tenant-level notifications](#obtain-meeting-details-using-tenant-level-notification) to obtain meeting ID and organizer ID.

To obtain meeting ID and organizer ID from user-level notification:

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

    In this example, the `eventID` contained within `resource` is *AAMkADY0NjM1MjRhLTNiNjAtNDBiOC1hYTQxLThkMjAxN2QzMjZhYQBGAAAAAAC03Gz8aL_JQp2Kxvw5a29SBwDFFWHjtoMRTqdrVyQ1h8yLAAAAAAENAADFFWHjtoMRTqdrVyQ1h8yLAAFwC7nAAAA=*.
    </details>

2. **Get meeting URL**: Use the event ID to retrieve `joinUrl` that contains the meeting URL.

    For more information, see [get event](/graph/api/event-get).

    Use the following example to request the meeting URL:

    ```http
    GET https://graph.microsoft.com/v1.0/users/1273a016-201d-4f95-8083-1b7f99b3edeb/events/AAMkADY0NjM1MjRhLTNiNjAtNDBiOC1hYTQxLThkMjAxN2QzMjZhYQBGAAAAAAC03Gz8aL_JQp2Kxvw5a29SBwDFFWHjtoMRTqdrVyQ1h8yLAAAAAAENAADFFWHjtoMRTqdrVyQ1h8yLAAFwC7nAAAA=
    ```

    The response payload contains `joinURL`.

    <details>
    <summary><b>Example</b>: Response payload for getting meeting URL</summary>

    ```json
    {
        "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#users('1273a016-201d-4f95-8083-1b7f99b3edeb')/events/$entity",
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

    The meeting URL is contained in `joinUrl`.

3. **Get chat thread ID**: Use the meeting URL obtained in `joinUrl` to get the chat thread ID. Specify this meeting URL as value for the `joinWebUrl` parameter while fetching the related meeting.

    Use the following example to request the thread ID:

    ``` http
    GET https://graph.microsoft.com/v1.0/users('14b779ae-cb64-47e7-a512-52fd50a4154d')/onlineMeetings?$filter=JoinWebUrl%20eq%20'https://teams.microsoft.com/l/meetup-join/19%3ameeting_MTM5OTY3MGUtNmY4Mi00Yjg4LTk2MDUtY2IyZGRlNmU1ZjA2%40thread.v2/0?context=%7b%22Tid%22%3a%222432b57b-0abd-43db-aa7b-16eadd115d34%22%2c%22Oid%22%3a%2214b779ae-cb64-47e7-a512-52fd50a4154d%22%7d'
    ```

    The response payload contains the `threadID` member in the `chatInfo` property.
    <br>
    <details>
    <summary><b>Example</b>: Response payload with thread ID</summary>

    ```json
    {
        "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#users('14b779ae-cb64-47e7-a512-52fd50a4154d')/onlineMeetings",
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

    The chat ID is contained in `threadId`.

4. **Subscribe to chat messages**: Use chat ID to subscribe your app to receive chat messages for that particular meeting. For more information, see [subscribe to messages in a chat](/graph/teams-changenotifications-chatmessage#subscribe-to-messages-in-a-chat).

    If you want your app to subscribe to messages with specific text, see [subscribe to messages in a chat that contain certain text](/graph/teams-changenotifications-chatmessage#example-2-subscribe-to-messages-in-a-chat-that-contain-certain-text).

5. Follow steps for [tenant-level notifications](#obtain-meeting-details-using-tenant-level-notification) to obtain meeting ID and organizer ID.

### Obtain meeting details using tenant-level notification

Tenant-level notifications are useful if your app is authorized to access all meeting transcripts and recordings across the tenant. Subscribe your app to be notified for events when transcription and recording starts or call ends for scheduled online Teams meetings. After the meeting ends, your app can access and retrieve the meeting transcript and recording.

For subscribing your app to tenant-level notifications, see [get change notifications](/graph/teams-changenotifications-chatmessage#subscribe-to-messages-across-all-chats).

When your app is notified about subscribed meeting events, it searches through the notifications for transcription and recording started and meeting ended events. These events contain the chat ID, which is used to obtain chat entity, and eventually meeting ID and organizer ID.

To obtain meeting ID and organizer ID from tenant-level notification:

1. **Get chat ID**: Your app gets the `chatId` property from the notification to make subsequent calls. Your app can get the chat ID from the payloads of:

    - Transcription started event: `callTranscriptEventMessageDetail` event type

        <details>
        <summary><b>Example</b>: Payload for transcription started event</summary>

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

    - Call ended event:  `callEndedEventMessageDetail` event type

        <details>
        <summary><b>Example</b>: Payload for call ended event</summary>

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

2. **Get chat entity**: Your app can retrieve the chat entity using the chat ID obtained in Step 1. Use the chat entity to get the URL for joining the call. The `joinWebUrl` member of the `onlineMeetingInfo` property contains this URL, and is used to obtain meeting ID eventually. The organizer ID is also a part of the response payload.

    For more information about chat entity, see [get chat](/graph/api/chat-get).

    Use the following example to request chat entity based on the chat ID:

    ``` http
    GET https://graph.microsoft.com/v1.0/chats/19:meeting_NmU0NTkxYzMtM2Y2My00NzRlLWFmN2YtNTFiMGM5OWM3ZjY2@thread.v2
    ```

    The response payload contains the following elements:

    - **Organizer ID**: It's contained in the `id` member of the `organizer` property in the response payload.
    - **URL for meeting call**: This URL is used to retrieve the meeting ID, and it's available in the response payload in one of the two scenarios:
        - If the meeting is an online Teams meeting, the `joinWebUrl` member of the `onlineMeetingInfo` property contains this URL.
        - If the meeting wasn't created as an online meeting from Teams client or Outlook client, it contains the `calendarEventId` member in the `onlineMeetingInfo` property. Your app can use the `calendarEventId` to obtain `joinUrl`, which is the same as `joinWebUrl`.

      For more information about events, see [get event](/graph/api/event-get?view=graph-rest-1.0&tabs=http&preserve-view=true).

      Examples for response payload scenarios depending on the type of join meeting URL:

        - Online Teams meeting where `joinWebUrl` is available

            <details>
            <summary><b>Example</b>: Response payload for online meeting</b></summary>

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

        - Meeting scheduled through Teams client or Outlook client, not marked as an online meeting where `calendarEventId` is available

            <details>
            <summary><b>Example</b>: Response payload for meeting not marked as online</summary>

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

              In this example:

                - The organizer ID is *14b779ae-cb64-47e7-a512-52fd50a4154d*.

              The response payload of this request contains `joinUrl` in the `onlineMeeting` property.

                > [!NOTE]
                > `joinUrl` is the same as `joinWebUrl`.

              <br>
              <details>
              <summary><b>Example</b>: Response payload that contains the URL to join meeting</summary>

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

3. **Get meeting ID**: Now, your app can use `joinWebUrl` to get the meeting ID.

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

4. **Fetch transcript**: The organizer ID and meeting ID obtained in the Steps 2 and 3 let your app fetch the transcripts and recordings for that particular meeting event.

    To fetch transcripts, you'll need to:

    1. **Retrieve transcript ID based on organizer ID and meeting ID**:

       Use the following example to request the transcript ID:

        ```http
        GET https://graph.microsoft.com/beta/users('14b779ae-cb64-47e7-a512-52fd50a4154d')/onlineMeetings('MSoxNGI3NzlhZS1jYjY0LTQ3ZTctYTUxMi01MmZkNTBhNDE1NGQqMCoqMTk6bWVldGluZ19ObVUwTlRreFl6TXRNMlkyTXkwME56UmxMV0ZtTjJZdE5URmlNR001T1dNM1pqWTJAdGhyZWFkLnYy')/transcripts
        ```

        In this example:

        - The meeting ID is included as the value for `onlineMeetings`: *MSoxNGI3NzlhZS1jYjY0LTQ3ZTctYTUxMi01MmZkNTBhNDE1NGQqMCoqMTk6bW
    VldGluZ19ObVUwTlRreFl6TXRNMlkyTXkwME56UmxMV0ZtTjJZdE5URmlNR001T1dNM
    1pqWTJAdGhyZWFkLnYy*.
        - The organizer ID is *14b779ae-cb64-47e7-a512-52fd50a4154d*.

        The response payload contains the transcript ID for the meeting ID and organizer ID in the `id` member of the `value` property.
        <br>
        <details>
        <summary><b>Example</b>: Response payload for getting transcript ID</summary>

        ```json
        {
            "@odata.context": "https://graph.microsoft.com/beta/$metadata#users('14b779ae-cb64-47e7-a512-52fd50a4154d')/onlineMeetings('MSoxNGI3NzlhZS1jYjY0LTQ3ZTctYTUxMi01MmZkNTBhNDE1NGQqMCoqMTk6bWVldGluZ19ObVUwTlRreFl6TXRNMlkyTXkwME56UmxMV0ZtTjJZdE5URmlNR001T1dNM1pqWTJAdGhyZWFkLnYy')/transcripts",
            "@odata.count": 1,
            "value": [
                {
                    "id": "MSMjMCMjMDEyNjJmNjgtOTc2Zi00MzIxLTlhNDQtYThmMmY4ZjQ1ZjVh",
                    "createdDateTime": "2022-04-14T11:34:39.5662792Z"
                }
            ]
        }
        ```

        In this example, the transcript ID is *MSMjMCMjMDEyNjJmNjgtOTc2Zi00MzIxLTlhNDQtYThmMmY4ZjQ1ZjVh*.

        </details>

    1. **Access and get meeting transcript based on the transcript ID**:

        Use the following example to request the transcripts for a specific meeting in the `.vtt` format:

        ```http
        GET https://graph.microsoft.com/beta/users('14b779ae-cb64-47e7-a512-52fd50a4154d')/onlineMeetings('MSoxNGI3NzlhZS1jYjY0LTQ3ZTctYTUxMi01MmZkNTBhNDE1NGQqMCoqMTk6bWVldGluZ19ObVUwTlRreFl6TXRNMlkyTXkwME56UmxMV0ZtTjJZdE5URmlNR001T1dNM1pqWTJAdGhyZWFkLnYy')/transcripts('MSMjMCMjMDEyNjJmNjgtOTc2Zi00MzIxLTlhNDQtYThmMmY4ZjQ1ZjVh')/content?$format=text/vtt
        ```

        The response payload will contain the transcripts in `.vtt` format.

### Use Bot Framework to get meeting ID and organizer ID

Your app can use the Bot Framework for obtaining meeting ID and organizer ID. The bot can receive meeting start or end events automatically from all the scheduled online meetings.

Use the following example to obtain meeting ID and organizer ID using a bot app:

```json
GET /v1/meetings/{meetingId}
```

The response payload contains:

- The meeting ID in the `msGraphResourceId` member of the `details` property.
- The organizer ID in the `id` member of the `organizer` property.
<br>

<details>
<summary><b>Example</b>: Response payload for getting meeting details</b></summary>

```json
{
  details: {
    id: "MCMxOTptZWV0aW5nX05XTTFNVEk1TnpNdE5qZ3pNeTAwWVdRNExUaG1PV1F0WlRnM01UQm1PVGczWW1VekB0aHJlYWQudjIjMA==",
    msGraphResourceId: "MSo2NzAyYWZiNi0xMDliLTRjMzItYTE0MS02ZTY1NDY5NTAyYjkqMCoqMTk6bWVldGluZ19OV00xTVRJNU56TXROamd6TXkwMFlXUTRMVGhtT1dRdFpUZzNNVEJtT1RnM1ltVXpAdGhyZWFkLnYy",
    scheduledStartTime: {
    },
    scheduledEndTime: {
    },
    joinUrl: "https://teams.microsoft.com/l/meetup-join/19%3ameeting_NWM1MTI5NzMtNjgzMy00YWQ4LThmOWQtZTg3MTBmOTg3YmUz%40thread.v2/0?context=%7b%22Tid%22%3a%22b3cdf1c8-024a-49e2-a994-f67f830b02f3%22%2c%22Oid%22%3a%226702afb6-109b-4c32-a141-6e65469502b9%22%7d",
    title: "Testing meeting bot 1 - Hun",
    type: "Scheduled",
  },
  conversation: {
    id: "19:meeting_NWM1MTI5NzMtNjgzMy00YWQ4LThmOWQtZTg3MTBmOTg3YmUz@thread.v2",
    isGroup: true,
    conversationType: "groupChat",
  },
  organizer: {
    id: "29:1VZkVr77S3GW_RdAXKrfgFeytpqMegL3tkKvEbwrPqoCVvmqrlKtVrfKWUY7xIM-bZIx4Sq-p1MjdjSZnb5W20w",
    tenantId: "b3cdf1c8-024a-49e2-a994-f67f830b02f3",
    aadObjectId: "6702afb6-109b-4c32-a141-6e65469502b9",
  },
}
```

In this example:

- The meeting ID is included as the value for `msGraphResourceId`: *MSo2NzAyYWZiNi0xMDliLTRjMzItYTE0MS02ZTY1NDY5NTAyYjkqMCoqMTk6bWVl
dGluZ19OV00xTVRJNU56TXROamd6TXkwMFlXUTRMVGhtT1dRdFpUZzNNVEJtT1RnM
1ltVXpAdGhyZWFkLnYy*.
- The organizer ID is contained as the value for `aadObjectId` for `organizer`:  *6702afb6-109b-4c32-a141-6e65469502b9*.

</details>

After your app obtains the meeting ID and the organizer ID, it triggers the Graph APIs to fetch transcript content using these meeting details.

### Code samples

You can try the following code sample for a bot app:

| **Sample name** | **Description** | **.NET** | **Node.js** |
|----------------|-----------------|--------------|--------------|--------------|
| Meeting transcription | This is a sample application which demonstrates how to get Transcript using Graph API and show it in the task module. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-transcription/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-transcription/nodejs) |

## Next step

> [!div class="nextstepaction"]
> [Graph APIs for fetching transcripts](/graph/api/resources/calltranscript)

> [!div class="nextstepaction"]
> [Graph APIs for fetching recordings](/graph/api/resources/callrecording)

## See also

- [Apps for Teams meetings and calls](../../apps-in-teams-meetings/teams-apps-in-meetings.md)
- [API reference for the Bot Framework Connector service](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference)
- [Receive notifications for Teams meetings start, end, and roster events](/graph/changenotifications-for-onlinemeeting)
