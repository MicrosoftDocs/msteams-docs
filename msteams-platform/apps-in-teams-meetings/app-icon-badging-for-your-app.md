---
title: Enable app icon badging for your Teams app
author: v-sdhakshina
description: In this article, learn how to enable app icon badging for your Microsoft Teams app in meeting.
ms.topic: conceptual
ms.author: v-sdhakshina
ms.localizationpriority: medium
---

# Enable app icon badging for your Teams app

App icon badging helps a meeting participant identify any app activity during a meeting. Participants get activity notification for the meeting apps.

When there's new activity during the meeting, the app calls the `targetedMeetingNotification` API and displays a red badge on the app icon in the meeting unified bar (U-bar). When the participant selects the app icon, the app opens in the meeting side panel, and the badge goes away.

For example, during a real time collaboration in a meeting, if a participant adds a comment in a file added to the meeting, the app calls the `targetedMeetingNotification` API from the participant's meeting side panel. The API triggers a badge on the app icon to make other participants aware of the comment activity.

The following image shows you the app icon badging in the meeting U-bar:

:::image type="content" source="../assets/images/app-icon-badging.png" alt-text="Screenshot shows you the app icon badging in U-bar in teams meeting."lightbox="../assets/images/app-icon-badging.png":::

> [!NOTE]
>
> * App icon badging isn't available for [Government Community Cloud (GCC)-High and Department of Defense (DOD)](~/concepts/app-fundamentals-overview.md#government-community-cloud) environments.
> * App icon badging isn't supported for mobile clients.
> * App icon badging isn't supported for channel meetings.

To enable app icon badging, follow these steps:

1. [Enable app manifest settings for app icon badging](#enable-app-manifest-settings-for-app-icon-badging)
1. [Enable app icon badging for your app](#enable-app-icon-badging-for-your-app)

## Enable app manifest settings for app icon badging

To enable app icon badging, you must:

* Ensure that you've configured `meetingSidePanel` as a `context` property for your app.
* Configure the `authorization` property and the `name` and `type` properties under the `resourceSpecific` field in the [app manifest](../resources/schema/manifest-schema.md#authorization) as follows:

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

## Enable app icon badging for your app

To enable app icon badging, ensure that you've [enabled targeted in-meeting notification](in-meeting-notification-for-meeting.md#enable-targeted-in-meeting-notification).

The [Targeted meeting notification and app icon badging API](meeting-apps-apis.md#targeted-meeting-notification-and-app-icon-badging-api) has been extended to support the app icon badging capability on the app icon and pass the user MRI IDs of the intended recipients. The `surfaces` parameter now supports `meetingTabIcon` value, which is used by the app.

App can also pass the `tabEntityId`, if there are multiple instances of the app added to the same meeting. If the `tabEntityId` isn't passed, then Teams displays the badge on the first app icon on the users meeting window.

### Example

The following is an example of a payload:

```json
{
    "type": "targetedMeetingNotification",
    "value": {
        "recipients": [
            "<participant1 MRI>",
            "<participant2 MRI>" 
        ],
        "surfaces": [
            {
                "surface": "meetingTabIcon",
                "tabEntityId": "<tab id from tab sdk>" // optional           
            }
        ]
    }
}

```

[!INCLUDE [Response code](../includes/meeting-response-code.md)]

## Limitations

* App icon badging displays only one notification for a user in a minute per meeting.

* App icon badging is displayed to a maximum of first 50 participants for a particular meeting.

## Code sample

|Sample name | Description | Node.js | .NET |
|----------------|-----------------|--------------|
| App icon badging for your Teams app | This sample demonstrates how to enable app icon badging for your Teams app. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-app-icon-badging/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-app-icon-badging/csharp) |

## See also

* [Build tabs for meeting](build-tabs-for-meeting.md)
* [Build in-meeting notification for Teams meeting](in-meeting-notification-for-meeting.md)
* [Targeted meeting notification and app icon badging API](meeting-apps-apis.md#targeted-meeting-notification-and-app-icon-badging-api)
