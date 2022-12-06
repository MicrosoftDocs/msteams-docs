---
title: Build in-meeting notification for Teams meeting
author: v-sdhakshina
description: In this article, learn how to build in-meeting notification for Microsoft Teams meeting and its code sample.
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

You can send targeted meeting notifications to specific participants. The notifications are private to the designated participants and not visible to others in the meeting. Targeted meeting notification helps to enhance meeting experience and develop user engagement activities.

The following image is an example of targeted meeting notification sent to a specific participant in the meeting:

Meeting in progress

  :::image type="content" source="../assets/images/apps-in-meetings/design-principles-2019.png" alt-text="Screenshot displaying the banner of VA Design Principles 2019.":::

Targeted meeting notification sent to a specific participant.

  :::image type="content" source="../assets/images/apps-in-meetings/reminder-sent.png" alt-text="Screenshot displaying the reminder sent to a participant in the meeting.":::

Obtain the RSC permissions by configuring the `OnlineMeetingNotification.Send.Chat` and `type` in the resourceSpecific field as follows:

 Following is an example of request payload:

```http
GET POST /v1/meetings/{meetingId}/notiifcation
```

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

You can find examples of how to configure RSC permission on the app manifest from [Get meeting details API](meeting-apps-apis.md#get-meeting-details-api)

## Code sample

Sample name | Description | C# | Node.js |
|----------------|-----------------|--------------|----------------|
| In-meeting notification | Demonstrates how to implement in-meeting notification using bot. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-content-bubble/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-content-bubble/nodejs) |

## Step-by-step guide

Follow the [step-by-step guide](../sbs-meeting-content-bubble.yml) to generate in-meeting notification in your Teams meeting.

## See also

* [Build tabs for meeting](~/apps-in-teams-meetings/build-tabs-for-meeting.md)
* [Build apps for Teams meeting stage](build-apps-for-teams-meeting-stage.md)
* [Build extensible conversation for meeting chat](build-extensible-conversation-for-meeting-chat.md)
* [Build apps for anonymous users](build-apps-for-anonymous-user.md)
* [Advanced meeting APIs](meeting-apps-apis.md)
