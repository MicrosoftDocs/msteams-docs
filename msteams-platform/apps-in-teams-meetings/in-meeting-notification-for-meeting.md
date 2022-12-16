---
title: Build in-meeting notification for Teams meeting
author: v-sdhakshina
description: In this article, learn how to build in-meeting notification for Microsoft Teams meeting with code sample and how to send targeted meeting notification to specified participant in the meeting.
ms.topic: conceptual
ms.author: v-sdhakshina
ms.localizationpriority: medium
---

# Build in-meeting notification for Teams meeting

The in-meeting notification is used to engage participants and collect information or feedback during the meeting. Use an [in-meeting notification payload](meeting-apps-apis.md#send-an-in-meeting-notification) to trigger an in-meeting notification. As part of the notification payload request, include the URL where the content to be shown is hosted.

An external resource URL is used to display in-meeting notification. You can use the `submitTask` method to submit data in a meeting chat.

:::image type="content" source="../assets/images/apps-in-meetings/in-meeting-dialogbox.png" alt-text="The screenshot is an example that shows how you can use an in-meeting dialog.":::

You can also add the Teams display picture and people card of the user to in-meeting notification based on `onBehalfOf` token with user MRI and display name passed in payload. Following is an example payload:

```json
    {
       "type": "message",
       "text": "John Phillips assigned you a weekly todo",
       "summary": "Don't forget to meet with Marketing next week",
       "channelData": {
           onBehalfOf: [
             { 
               itemId: 0, 
               mentionType: 'person', 
               mri: context.activity.from.id, 
               displayname: context.activity.from.name 
             }
            ],
           "notification": {
           "alertInMeeting": true,
           "externalResourceUrl": "https://teams.microsoft.com/l/bubble/APP_ID?url=<url>&height=<height>&width=<width>&title=<title>&completionBotId=BOT_APP_ID"
            }
        },
       "replyToId": "1493070356924"
    }
```

:::image type="content" source="../assets/images/apps-in-meetings/in-meeting-people-card.png" alt-text="This screenshot shows how Teams display picture and people card is used with in-meeting dialog." border="true":::

## Targeted meeting notification

Targeted meeting notification allows apps to send notifications to specific participants in the meeting. The notifications are private and are sent only to the specific or targeted participants in a meeting. Targeted meeting notifications help to enhance meeting experience and develop user engagement activities in Teams meetings.

The following image is an example of a targeted meeting notification sent to a specific participant during the meeting:

  :::image type="content" source="../assets/images/apps-in-meetings/reminder-sent.png" alt-text="Screenshot displaying the reminder sent to a participant in the meeting.":::

> [!NOTE]
>
> * Adaptive Cards v1.5 aren't supported within targeted meeting notification.
> * Targeted meeting notification is supported for scheduled meetings, instant meeting (Meet now), one-on-one calls, and group calls.
> * You can send targeted meeting notifications to 50 participants in a meeting. If you want to send targeted meeting notifications to more than 50 participants, you must call the `targetedMeetingNotification` API again.

### Enable app manifest settings for targeted meeting notification

To send a targeted meeting notification, you must configure `authorization` property, `name`, and `type` in the `resourceSpecific` field in the [app manifest](../resources/schema/manifest-schema.md#authorization) as follows:

```json
"authorization": {
    "permissions": {
      "orgWide": [],
      "resourceSpecific": [
        {
          "name": "OnlineMeetingNotification.Send.Chat",
          "type": "Application"
        }
      ]
    }
  }
```

### Enable targeted meeting notification

1. Targeted meeting notification is triggered by a bot, user action or via code. It's up to the bot API when to trigger the notification.

1. Retrieve the user IDs of participants through [get participant API](meeting-apps-apis.md#get-participant-api) and [get Members API](/rest/api/azure/devops/memberentitlementmanagement/members/get?view=azure-devops-rest-7.0&preserve-view=true).

1. After retrieving the user IDs, include the user IDs in the request parameter.

   Following is an example of a request:

    ```http
    GET POST /v1/meetings/{meetingId}/notification
    ```

   Following is an example of a payload:

    ```json
    {
      "type": "targetedMeetingNotification",
      "value": {
        "recipients": [ 
    "29:1I12M_iy2wTa97T6LbjTh4rJCWrtw2PZ3lxpD3yFv8j2YPnweY2lpCPPAn3RI0PP7rghfHauUz48I1t7ANhj4CA"
         ], 
        "surfaces": [ 
          { 
            "surface": "meetingStage", 
            "contentType": "task", 
            "content": { 
              "value": { 
                "height": "300", 
                "width": "400", 
                "title": "Targeted meeting Notification", 
                "url": "https://somevalidurl.com"           
    }
            } 
          } 
        ] 
      },
      "channelData": { // optional if a developer wants to support user attributes
        "onBehalfOf": [ 
          { 
            "itemid": 0, 
            "mentionType": "person", 
            "mri": "29:1mDOCfGM9825lMHlwP8NjIVMJeQAbN-ojYBT5VzQfPpnst1IFQeYB1QXC8Zupn2RhgfLIW27HmynQk-4bdx_YhA", 
            "displayName": "yunny chung"      } 
        ] 
      }
    }
    ```

The targeted meeting notification is successfully sent to the specified participant.

For more information on `targetedMeetingNotification`, see [Meeting apps APIs](meeting-apps-apis.md#targeted-meeting-notification-api).

## Code sample

Sample name | Description | C# | Node.js |
|----------------|-----------------|--------------|----------------|
| In-meeting notification | Demonstrates how to implement in-meeting notification using bot. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-content-bubble/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-content-bubble/nodejs) |

## Step-by-step guide

Follow the [step-by-step guide](../sbs-meeting-content-bubble.yml) to generate in-meeting notification in your Teams meeting.

## See also

* [Apps for Teams meetings and calls](teams-apps-in-meetings.md)
* [Build tabs for meeting](~/apps-in-teams-meetings/build-tabs-for-meeting.md)
* [Build apps for Teams meeting stage](build-apps-for-teams-meeting-stage.md)
* [Build extensible conversation for meeting chat](build-extensible-conversation-for-meeting-chat.md)
* [Build apps for anonymous users](build-apps-for-anonymous-user.md)
* [Meeting app APIs](meeting-apps-apis.md)
