---
title: Build visual indicator for your Teams app
author: v-sdhakshina
description: In this article, learn how to build visual indicator for Microsoft Teams app using bot SDKs.
ms.topic: conceptual
ms.author: v-sdhakshina
ms.localizationpriority: medium
---

# Build visual indicator for your Teams app

Visual indicator on Teams UI bar helps you to keep engaged with the apps loaded in the meeting even when the side panel isn't opened. The indicator shows on the app UI, whenever there’s a new activity on the app during the meeting and it catches the users attention more easily.

Use the [targeted meeting notification API](meeting-apps-apis.md#targeted-meeting-notification-and-visual-indicator-api) to trigger the visual indicator on the app UI and pass the MRI IDs of the intended recipients along with `meetingTabIcon` in the surfaces param to get the end users attention.

> [!NOTE]
>
> * Visual indicator are available only in [Government Community Cloud (GCC)-High and Department of Defense (DOD)](~/concepts/app-fundamentals-overview.md#government-community-cloud) environments.
> * Visual indicator is supported only in Teams desktop clients.

(image to be added)

## Enable visual indicator for your Teams app

Visual indicator requires the app to have integrated with Bot SDK and have a tab app that supports meeting side panel context. ​The tab should be installed in the meeting for which the app makes the notification call.

The [targeted meeting notification API](in-meeting-notification-for-meeting.md#enable-targeted-in-meeting-notification) in our Bot SDK has been extended to support this capability of showing a visual indicator on the app icon.

To enable visual indicator for your Teams app:

1. Add `meetingTabIcon` value in the `surfaces` parameter. The following is an example of a payload:

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

    ​Whenever there’s a new activity for which the app wants to get the end user’s attention, the app calls [targeted meeting notification API](meeting-apps-apis.md#targeted-meeting-notification-and-visual-indicator-api) and pass the MRI IDs of the intended recipients along with `meetingTabIcon` in the surfaces parameter.

This API already supports Targeted In-Meeting Notifications for the `meetingStage` surface and apps can define multiple surfaces in the same API call if there are relevant scenarios.

App can define the following objects under the `surface` parameter:

* `meetingTabIcon` which shows an indicator on the app icon.
* `meetingStage` which shows an in-meeting notification on the meeting stage for the same users.

> [!NOTE]
> ​The app can optionally pass the tab entity ID if there are multiple instances of the tab added to the same meeting. If the tab entity ID isn't passed by the app, then Teams shows the indicator on the first tab icon visible on the user’s meeting window.

## Scenarios

The following are the different example scenarios in which visual indicator can be used:

* A form is updated by User A from their meeting side panel and the app wants User B to be informed of the same.

* User A creates a new question and Users B and C needs to be informed of the new question.

* User A and User B add a new comment to a file during real-time collaboration and all other participants need to be aware of the same.

In the above scenario's, the app initiates the SDK call from User A’s side panel as soon as User A completes the said action.

## Limitations

The following are the limitations:

* The visual indicator shows only one notification per minute per user per meeting.

* The visual indicator shows to a maximum of first 50 in the array of participants in a particular meeting. For the above 50 participants it shows an error.

* The app and its corresponding JS SDK bridge are terminated within the Teams ecosystem as soon as it's closed.

## See also

* [Build in-meeting notification for Teams meeting](in-meeting-notification-for-meeting.md)
* [Targeted meeting notification API](meeting-apps-apis.md#targeted-meeting-notification-and-visual-indicator-api)
