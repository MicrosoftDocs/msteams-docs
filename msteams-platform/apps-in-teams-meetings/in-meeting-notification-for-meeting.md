---
title: Build in-meeting notification for Teams meeting
author: v-sdhakshina
description: Learn how to build in-meeting and targeted in-meeting notifications for Microsoft Teams meeting with code samples.
ms.topic: conceptual
ms.author: v-sdhakshina
ms.localizationpriority: medium
---

# Build in-meeting notification for Teams meeting

The in-meeting notification is used to engage participants and collect information or feedback during the meeting. Use an [in-meeting notification payload](meeting-apps-apis.md#send-an-in-meeting-notification) to trigger an in-meeting notification. As part of the notification payload request, include the URL where the content to be shown is hosted.

An external resource URL is used to display in-meeting notification. You can use the `submitTask` method to submit data in a meeting chat.

# [Desktop](#tab/desktop)

  The following image shows an in-meeting notification in the Teams desktop client:

   :::image type="content" source="../assets/images/apps-in-meetings/in-meeting-dialogbox.png" alt-text="Screenshot shows an in-meeting notification on Teams desktop.":::

# [Mobile](#tab/mobile)

  The following image shows an in-meeting notification in the Teams mobile client:

   :::image type="content" source="../assets/images/apps-in-meetings/in-meeting-notification-mobile.png" alt-text="Screenshot shows an in-meeting notification in on Teams mobile.":::

---

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

:::image type="content" source="../assets/images/apps-in-meetings/in-meeting-people-card.png" alt-text="Screenshot shows how a display picture and people card in Teams is used with in-meeting dialog.":::

## Feature compatibility by user types

The following table provides the user types and lists the features that each user can access in meetings:

| User type | Scheduled meeting or Instant calendar meeting | One-on-one call | Group call | Scheduled channel meeting |
| :-- | :-- | :-- | :-- | :-- |
| In-tenant | Available | Available |  Available | Available |
| Guest | Available | Available |  Available | Available |
| Federated or External | Available | Not available | Not available | Available |
| Anonymous | Available | Not available | Not available | Not available |

## Targeted in-meeting notification

Targeted in-meeting notification allows apps to send notifications to specific participants on a meeting stage. The notifications are private and are sent only to specific or targeted participants. Targeted in-meeting notification helps to enhance meeting experience and develop user engagement activities in Teams meetings.

> [!NOTE]
> Targeted in-meeting notification is supported for scheduled meetings, instant meeting (Meet now), one-on-one calls, and group calls.

In the following image, a meeting notification requesting payment is sent to one of the participants in the meeting. The meeting notification is only visible to the targeted participant:

 :::image type="content" source="../assets/images/apps-in-meetings/reminder-sent.png" alt-text="Screenshot shows an example of a meeting notification sent to a targeted participant requesting for a payment. ":::

### Enable app manifest settings for targeted in-meeting notification

To send targeted in-meeting notifications, you must configure the `authorization` property and the `name` and `type` properties under the `resourceSpecific` field in the [app manifest](../resources/schema/manifest-schema.md#authorization) as follows:

```json

"webApplicationInfo": {
    "id": "<<MICROSOFT-APP-ID>>",
    "resource": "https://RscBasedStoreApp"  },
  "authorization": {
    "permissions": {
      "resourceSpecific": [
        {
          "name": "OnlineMeetingNotification.Send.Chat",
          "type": "Application"        }
      ]
    }
  }
```

### Enable targeted in-meeting notification

> [!NOTE]
> You can only send a targeted in-meeting notification to 50 meeting participants in a single API call. If you want to send a targeted in-meeting notification to more than 50 participants, you must call the `targetedMeetingNotification` API again.

Targeted in-meeting notification can be triggered by user action.

To enable the targeted in-meeting notification:

1. Retrieve the user IDs of the participants through [Get participant API](meeting-apps-apis.md#get-participant-api) and [Get members API](../bots/how-to/get-teams-context.md#fetch-the-roster-or-user-profile).

   > [!NOTE]
   > Targeted in-meeting notification doesn't support user IDs in the Azure Active Directory (Azure AD) user ID format.

   **The following is an example of a user ID**:
    `id=29:1I12M_iy2wTa97T6LbjTh4rJCWrtw2PZ3lxpD3yFv8j2YPnweY2lpCPPAn3RIOPP7rghfHauUz48I1t7ANhj4CA`

1. Include the user IDs in the request parameter.

   The following is an example of a request:

    ```http
     POST /v1/meetings/{meetingId}/notification
    ```

   The following is an example of a payload:

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
      "channelData": { // optional if a developer doesn't want to support user attributes.
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

     Targeted in-meeting notification is enabled.

For more information on `targetedMeetingNotification`, see [targeted meeting notification API](meeting-apps-apis.md#targeted-meeting-notification-and-visual-indicator-api).

After you've built in-meeting notification for your app, you can use the `targetedMeetingNotification` API to enable visual indicator for your meeting app. This helps meeting participants to get a notification whenever there's new activity in the app. For more information, see [visual indicator for your Teams app](visual-indicator-for-your-app.md).

## Code sample

Sample name | Description | .NET | Node.js | Manifest|
|----------------|-----------------|--------------|----------------|----------------|
| In-meeting notification | Demonstrates how to implement in-meeting notification using bot. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-notification/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-notification/nodejs) |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-notification/csharp/demo-manifest/meetings-notification.zip) |

## Step-by-step guide

Follow the [step-by-step guide](../sbs-meeting-content-bubble.yml) to generate in-meeting notification in your Teams meeting.

## See also

* [Apps for Teams meetings and calls](teams-apps-in-meetings.md)
* [Build tabs for meeting](~/apps-in-teams-meetings/build-tabs-for-meeting.md)
* [Build apps for Teams meeting stage](build-apps-for-teams-meeting-stage.md)
* [Build extensible conversation for meeting chat](build-extensible-conversation-for-meeting-chat.md)
* [Build apps for anonymous users](build-apps-for-anonymous-user.md)
