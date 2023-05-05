---
title: Visual indicator for your Teams app
author: v-sdhakshina
description: In this article, learn how to build visual indicator for your Microsoft Teams app in meeting.
ms.topic: conceptual
ms.author: v-sdhakshina
ms.localizationpriority: medium
---

# Visual indicator for your Teams app

Visual indicator in Teams helps you to keep engaged with the apps added in the meeting even when the side panel isn't open.

The indicator is displayed on the app icon in the Teams UI, whenever there’s a new activity in the app during the meeting and it attracts the users attention more easily.

(image to be added)

For example, if the user A add a new comment to a file during real-time collaboration, the app initiates the SDK call from user A’s side panel as soon as user A added the new comment. All other meeting participants can see the visual indicator on the app icon.

> [!NOTE]
>
> * Visual indicator is available only in [Government Community Cloud (GCC)-High and Department of Defense (DOD)](~/concepts/app-fundamentals-overview.md#government-community-cloud) environments.
> * Visual indicator is supported only in Teams desktop clients.

## Enable visual indicator for your Teams app

For a visual indicator, your Teams app must be integrated with bot SDK and support `meetingSidePanel` context.

The [targeted meeting notification API](in-meeting-notification-for-meeting.md#enable-targeted-in-meeting-notification) in bot SDK has been extended to support the visual indicator capability on the app icon and pass the MRI IDs of the intended recipients.

To enable visual indicator for your Teams app:

1. Add `meetingTabIcon` value in the `surfaces` parameter. You can also add the `tabEntityId`, if there are multiple instances of the app added to the same meeting. The following is an example of a payload:

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
                    "surface": "MeetingTabIcon",
                    "tabEntityId": "<tab id from tab sdk>" // optional           
                }
            ]
        }
    }
    ```

If the `tabEntityId` isn't added, then Teams display the indicator on the first app icon on the users meeting window. The targeted meeting notification API already supports `meetingStage` surface and apps can define multiple surfaces in the same API call if there are relevant scenarios.

App can define the following objects under the `surface` parameter:

* `meetingTabIcon` which shows an indicator on the app icon.
* `meetingStage` which shows an in-meeting notification on the meeting stage for the same users.

## Limitations

* The visual indicator is displayed only one notification for a user in a minute per meeting.

* The visual indicator is displayed to a maximum of first 50 participants in the array for a particular meeting.

## Code sample

|Sample name | Description | .NET |
|----------------|-----------------|--------------|
| Visual indicator for your Teams app | This sample demonstrates how to enable visual indicator for your Teams app. | [Link to be added] |

## See also

* [Build tabs for meeting](build-tabs-for-meeting.md)
* [Build in-meeting notification for Teams meeting](in-meeting-notification-for-meeting.md)
* [Targeted meeting notification API](meeting-apps-apis.md#targeted-meeting-notification-and-visual-indicator-api)
