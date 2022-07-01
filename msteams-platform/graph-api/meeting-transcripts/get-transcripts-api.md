---
title: Use Microsoft Graph to fetch transcripts for a Teams meeting
description: Describes the process, scenarios, and APIs to fetch transcripts in a post-meeting scenario.
ms.localizationpriority: medium
ms.topic: concept
---
# Get meeting transcripts using Graph APIs

You can now configure your app to fetch Microsoft Teams meeting transcripts in a post-meeting scenario. Your app can use Microsoft Graph REST APIs to access and fetch transcripts generated for a Teams meeting that has been scheduled beforehand.

Here are some use cases for fetching meeting transcripts using Graph API:

| Use case | How Transcript APIs help... |
| --- | --- |
| You need to obtain transcripts for capturing meaningful insights from multiple meetings across the Sales vertical. It's time-consuming and inefficient to keep track of all meetings, and to retrieve meeting notes manually. After the meeting is over, you'd need to examine conversations in all those meetings to obtain useful information. | Using your app to fetch meeting transcripts automatically retrieves the transcripts from all meetings relevant for your purpose. Your app can receive meeting notifications, and get the transcript when it's generated after the meeting ends. This data can then be used to gain: <br> • Aggregated insights and intelligence analysis <br> • New leads and highlights <br> • Meeting follow-ups and summaries |
| As an HR initiative, you're holding a brainstorming session to understand and improve employee health and productivity. Having to continually take notes to provide post-meeting summary can impede the flow of thoughts, and you might not capture all valuable suggestions. After the session, you'd need to analyze the discussion to gather data points for planning improvements. | Using Graph APIs to fetch transcripts post-meeting frees you and the participants to fully focus on the discussion. The content of the meeting transcript is available for: <br> • Engagement and sentiment analysis <br> • Listing tasks or issues <br> • Follow-up meetings and notifications |

To fetch the transcript for a particular meeting:

- [Configure permissions on Azure AD to access transcript](#configure-permissions-on-azure-ad-to-access-transcript)
- [Obtain meeting ID and organizer ID](#obtain-meeting-id-and-organizer-id)
- [Use Graph APIs to fetch transcript](#use-graph-apis-to-fetch-transcript)

## Configure permissions on Azure AD to access transcript

Your app must have the required permissions for fetching transcripts. It can access and fetch transcripts for a Teams meeting using organization-wide application permissions or Resource-specific consent (RSC) application permissions for a particular meeting.

### Use organization-wide application permissions

You can configure your app to access meeting transcripts across the tenant. In this case, the meeting organizer doesn't need to install your app in the Teams meeting chat. When organization-wide application permissions are authorized by the tenant administrator, your app can read and access transcripts for all meetings in the tenant.

For more information about the organization-wide application permissions that can be granted to your app, see [Online meeting permissions](/graph/permissions-reference.md#online-meetings-permissions).

### Use meeting-specific RSC application permissions

If you want your app to fetch transcripts only for the Teams meeting where it's installed, configure  meeting-specific RSC permission for your app. Authorized users can install your app in the meeting chat. After the meeting ends, your app can make the API call to obtain the transcript for that meeting.

For more information about the meeting-specific RSC permissions that can be granted to your app, see [Resource-specific permissions for a chat](/graph-api/rsc/resource-specific-consent.md#resource-specific-permissions-for-a-chat).

<br>
After you've configured either organization-wide application permissions or meeting-specific RSC application permissions, you can configure your app to receive change notifications for all relevant meeting events. Notifications contain meeting ID and organizer ID that help in accessing transcript content. Your app can fetch the transcript for a meeting when it's generated after it ends. The content of the transcript is available as `.vtt` or `.docx` file.

For more information about how your app can know when the meetings ends, see [Subscribe to change notifications](#subscribe-to-change-notifications) and [Use Bot Framework to get meeting ID and organizer ID](#use-bot-framework-to-get-meeting-id-and-organizer-id).

> [!NOTE]
> The process for calling Graph APIs to access and retrieve transcripts remains the same for both meeting-specific RSC application permissions or organization-wide application permissions. These APIs currently support only scheduled meetings.

## Obtain meeting ID and organizer ID

Your app can fetch transcripts of a meeting using the meeting ID and the user ID of the meeting organizer, also known as organizer ID. The Graph REST APIs fetch transcripts based on the meeting ID and organizer ID that are passed as parameters in the API.

To obtain meeting ID and organizer ID for fetching the transcript, choose one of the two ways:

- [Subscribe to change notifications](#subscribe-to-change-notifications)
- [Use Bot Framework](#use-bot-framework-to-get-meeting-id-and-organizer-id)

### Subscribe to change notifications

You can subscribe your app to receive change notifications for scheduled meeting events. When your app is notified about the subscribed meeting events, it can obtain transcripts, if it's authorized via required Azure AD permissions.

Your app receives notification for the type of meeting events for which it's subscribed:

- [User-level notification](#obtain-meeting-details-using-user-level-notification)
- [Tenant-level notification](#obtain-meeting-details-using-tenant-level-notification)

When your app is notified of a subscribed meeting event, it can retrieve the meeting ID and organizer ID from the notification message. Based on the meeting details obtained, your app can fetch the meeting transcripts after the meeting has ended.

#### Obtain meeting details using user-level notification

Choose to subscribe your app to user-level notifications for getting transcripts of a particular user's meeting event. When a meeting is scheduled for that user, your app is notified. Your app can receive meeting notifications using calendar events as well.

For subscribing your app to calendar events, see [Change notifications for Outlook resources in Microsoft Graph](/graph/outlook-change-notifications-overview.md).

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

    In this example, the `eventID` contained within `resource` is *AAMkADY0NjM1MjRhLTNiNjAtNDBiOC1hYTQxLThkMjAxN2QzMjZhYQBGAAAAAAC03Gz8aL_JQp2Kxvw5a29SBwDFFWHjtoMRTqdrVyQ1h8yLAAAAAAENAADFFWHjtoMRTqdrVyQ1h8yLAAFwC7nAAAA=*
    </details>

2. **Get meeting URL**: Use the event ID to retrieve `joinUrl` that contains the meeting URL. For more information, see [Get event](/graph/api/event-get.md).

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

4. **Subscribe to chat messages**: Use chat ID to subscribe your app to receive chat messages for that particular meeting. For more information, see [Subscribe to messages in a chat](/graph/teams-changenotifications-chatmessage.md#subscribe-to-messages-in-a-chat).

    If you want your app to subscribe to messages with specific text, see [Subscribe to messages in a chat that contain certain text](/graph/teams-changenotifications-chatmessage.md#example-2-subscribe-to-messages-in-a-chat-that-contain-certain-text).

5. Follow steps for [tenant-level notifications](#obtain-meeting-details-using-tenant-level-notification) to obtain meeting and ID and organizer ID.

#### Obtain meeting details using tenant-level notification

Tenant-level notifications are useful if your app is authorized to access all meeting transcripts across the tenant. Subscribe your app to be notified for events when transcription starts or call ends for scheduled online Teams meetings. After the meeting ends, your app can access and retrieve the meeting transcript.

For subscribing your app to tenant-level notifications, see [Get change notifications](/graph/teams-changenotifications-chatmessage.md#subscribe-to-messages-across-all-chats).

When your app is notified about subscribed meeting events, it searches through the notifications for transcription started and meeting ended events. These events contain the chat ID, which is used to obtain chat entity, and eventually meeting ID and organizer ID.

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

2. **Get chat entity**: Using chat ID, your app can retrieve the chat entity to obtain the URL for joining the call. The `joinWebUrl` member of the `onlineMeetingInfo` property contains this URL, and is used to obtain meeting ID eventually. The organizer ID is also a part of the response payload.

    For more information about chat entity, see [Get chat](/graph/api/chat-get).

    Use the following example to request chat entity based on the chat ID:

    ``` http
    GET https://graph.microsoft.com/v1.0/chats/19:meeting_NmU0NTkxYzMtM2Y2My00NzRlLWFmN2YtNTFiMGM5OWM3ZjY2@thread.v2
    ```

    The response payload contains the following elements:

    - **Organizer ID**: It's contained in the `id` member of the `organizer` property in the response payload.
    - **URL for meeting call**: This URL is used to retrieve the meeting ID, and it's available in the response payload in one of the two scenarios:
        - If the meeting is an online Teams meeting, the `joinWebUrl` member of the `onlineMeetingInfo` property contains this URL.
        - If the meeting wasn't created as an online meeting from Teams client or Outlook client, it contains the `calendarEventId` member in the `onlineMeetingInfo` property. Your app can use the `calendarEventId` to obtain `joinUrl`, which is the same as `joinWebUrl`.

      For more information about events, see [Get event](/graph/api/event-get?view=graph-rest-1.0&tabs=http&preserve-view=true).

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

                - The organizer ID is 14b779ae-cb64-47e7-a512-52fd50a4154d.

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

    > [!NOTE]
    > The response payload also contains the `threadID` member in the `chatInfo` property. Your app can use it for obtaining meeting ID if it's subscribed to receive user-level notifications.

4. **Fetch transcript**: The organizer ID and meeting ID obtained in the Steps 2 and 3 let your app fetch the transcripts for that particular meeting event.

    To fetch transcripts, you'll need to:

    1. **Retrieve transcript ID based on organizer ID and meeting ID**:

       Use the following example to request the transcript ID:

        ```http
        GET https://graph.microsoft.com/beta/users('14b779ae-cb64-47e7-a512-52fd50a4154d')/onlineMeetings/('MSoxNGI3NzlhZS1jYjY0LTQ3ZTctYTUxMi01MmZkNTBhNDE1NGQqMCoqMTk6bWVldGluZ19ObVUwTlRreFl6TXRNMlkyTXkwME56UmxMV0ZtTjJZdE5URmlNR001T1dNM1pqWTJAdGhyZWFkLnYy')/transcripts
        ```

        In this example:

        - The meeting ID is included as the value for `onlineMeetings`: *MSoxNGI3NzlhZS1jYjY0LTQ3ZTctYTUxMi01MmZkNTBhNDE1NGQqMCoqMTk6bW
    VldGluZ19ObVUwTlRreFl6TXRNMlkyTXkwME56UmxMV0ZtTjJZdE5URmlNR001T1dNM
    1pqWTJAdGhyZWFkLnYy*
        - The organizer ID is *14b779ae-cb64-47e7-a512-52fd50a4154d*

        The response payload contains the transaction ID for the meeting ID and organizer ID.

        <details>
        <summary><b>Example</b>: Response payload for getting transaction ID</summary>

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

        </details>

    1. **Access and get meeting transcript based on the transcript ID**:

        Use the following example to request the transcripts for a specific meeting in the `.vtt` format:
    
        ```http
        GET https://graph.microsoft.com/beta/users('14b779ae-cb64-47e7-a512-52fd50a4154d')/onlineMeetings('MSoxNGI3NzlhZS1jYjY0LTQ3ZTctYTUxMi01MmZkNTBhNDE1NGQqMCoqMTk6bWVldGluZ19ObVUwTlRreFl6TXRNMlkyTXkwME56UmxMV0ZtTjJZdE5URmlNR001T1dNM1pqWTJAdGhyZWFkLnYy')/transcripts('MSMjMCMjMDEyNjJmNjgtOTc2Zi00MzIxLTlhNDQtYThmMmY4ZjQ1ZjVh')/content?$format=text/vtt
        ```

        The response payload will contain the transcripts in `.vtt` format.

### Use Bot Framework to get meeting ID and organizer ID

Your app can use the Bot Framework for obtaining meeting ID and organizer ID.

> [!NOTE]
> The bot can receive meeting start or end events automatically from all the scheduled online meetings.

For more information about APIs for Teams meeting, see [Meeting apps API references](../../apps-in-teams-meetings/API-references.md#meeting-apps-api-references).

To obtain meeting ID and organizer ID from a bot app:

1. **Meeting URL**: The bot app can get the URL for joining the meeting, which is used to get the meeting ID eventually.

    Use the following example to request meeting URL:

    ```json
    GET /v1/meetings/{meetingId}
    ```

    The response payload contains the URL for meeting call in the `joinUrl` member of the `details` property.

    <details>
    <summary><b>Example</b>: Response payload for getting meeting details</b></summary>

    ```json
    {
       "details":  { 
             "id": "<meeting ID>", 
             "msGraphResourceId": "MSowYmQ0M2I4OS1lN2QxLTQxNzAtOGZhYi00OWJjYjkwOTk1YWYqMCoqMTk6bWVldGluZ19OVEkyT0RjM01qUXROV1UyW", 
             "scheduledStartTime": "2022-04-24T22:00:00Z", 
             "scheduledEndTime": "2022-04-24T23:00:00Z", 
             "joinUrl": "https://teams.microsoft.com/l/xx", 
             "title": "All Hands", 
             "type": "Scheduled" 
         },
        "conversation": { 
             "isGroup": true, 
             "conversationType": "groupChat", 
             "id": "meeting chat ID" 
             }, 
        "organizer": { 
             "id": "<organizer user ID>", 
             "aadObjectId": "<AAD object ID>",
             "objectId": "<organizer object ID>",
             "tenantId": "<Tenant ID>" 
         }
    }
    ```

    > [!NOTE]
    > The meeting ID contained in the `id` member of the `details` property is different from the meeting ID that your app needs to fetch transcripts. Use `joinUrl` to get the correct meeting ID for fetching transcripts.

    </details>

2. **Get meeting ID and organizer ID**: Use `joinUrl` to get the meeting details to fetch transcript.

    Use the following example to request the online meeting ID using the URL:

    ```http
    GET https://graph.microsoft.com/v1.0/users('14b779ae-cb64-47e7-a512-52fd50a4154d'/onlineMeetings?$filter=joinUrl%20eq%20'https%3A%2F%2Fteams.microsoft.com%2Fl%2Fmeetup-join%2F19%253ameeting_MGQ4MDQyNTEtNTQ2NS00YjQxLTlkM2EtZWVkODYxODYzMmY2%2540thread.v2%2F0%3Fcontext%3D%257b%2522Tid%2522%253a%2522909c6581-5130-43e9-88f3-fcb3582cde37%2522%252c%2522Oid%2522%253a%2522dc17674c-81d9-4adb-bfb2-8f6a442e4622%2522%257d'
    ```

    The response payload contains:
    - Meeting ID in  `value` > `id`.
    - Organizer ID in `participants` > `organizer` > `identity` > `user` > `id`.
    <br>
    <details>
    <summary><b>Example</b>: Response payload with meeting ID</summary>

    ```json
    {
    "value": [
        {
            "id": "dc17674c-81d9-4adb-bfb2-8f6a442e4622_19:meeting_MGQ4MDQyNTEtNTQ2NS00YjQxLTlkM2EtZWVkODYxODYzMmY2@thread.v2",
            "creationDateTime": "2020-09-29T22:35:33.1594516Z",
            "startDateTime": "2020-09-29T22:35:31.389759Z",
            "endDateTime": "2020-09-29T23:35:31.389759Z",
            "joinWebUrl": "https://teams.microsoft.com/l/meetup-join/19%3ameeting_MGQ4MDQyNTEtNTQ2NS00YjQxLTlkM2EtZWVkODYxODYzMmY2%40thread.v2/0?context=%7b%22Tid%22%3a%22909c6581-5130-43e9-88f3-fcb3582cde37%22%2c%22Oid%22%3a%22dc17674c-81d9-4adb-bfb2-8f6a442e4622%22%7d",
            "subject": null,
            "autoAdmittedUsers": "EveryoneInCompany",
            "isEntryExitAnnounced": true,
            "allowedPresenters": "everyone",
            "allowMeetingChat": "enabled",
            "allowTeamworkReactions": true,
            "videoTeleconferenceId": "(redacted)",
            "participants": {
                "organizer": {
                    "upn": "(redacted)",
                    "role": "presenter",
                    "identity": {
                        "user": {
                            "id": "dc17674c-81d9-4adb-bfb2-8f6a442e4622",
                            "displayName": null,
                            "tenantId": "909c6581-5130-43e9-88f3-fcb3582cde38",
                            "identityProvider": "AAD"
                        }
                    }
                },
                "attendees": [],
                "producers": [],
                "contributors": []
            },
            "lobbyBypassSettings": {
                "scope": "organization",
                "isDialInBypassEnabled": false
            }
        }
    ]
    }
    ```

    </details>

After your app obtains the meeting ID and the organizer ID, it triggers the Graph APIs to fetch transcript content using these meeting details.

## Use Graph APIs to fetch transcript

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
GET https://graph.microsoft.com/v1.0/users/ba321e0d-79ee-478d-8e28-85a19507f456/onlineMeetings/MSo1N2Y5ZGFjYy03MWJmLTQ3NDMtYjQxMy01M2EdFGkdRWHJlQ/transcripts
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

## See also

- [Resource-specific consent](/graph-api/rsc/resource-specific-consent)
- [Online meeting permissions](/graph/permissions-reference.md#online-meetings-permissions)

