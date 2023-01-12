---
title: Build in-meeting notification for Teams meeting
author: v-sdhakshina
description: Learn how to build in-meeting notification for Microsoft Teams meeting and add the Teams display picture and people card.
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

:::image type="content" source="../assets/images/apps-in-meetings/in-meeting-people-card.png" alt-text="This screenshot shows how a display picture and people card in Teams is used with in-meeting dialog." border="true":::

## Feature compatibility by user types

The following table provides the user types and lists the features that each user can access in meetings:

| User type | Scheduled meeting or Instant calendar meeting | One-on-one call | Group call | Scheduled channel meeting |
| :-- | :-- | :-- | :-- | :-- |
| In-tenant user | Available | Available |  Available | Available |
| Guest | Available | Available |  Available | Available |
| Federated or External | Available | Not available | Not available | Available |
| Anonymous | Available | Available |  Available | Available |

## Code sample

Sample name | Description | .NET | Node.js |
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
