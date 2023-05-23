---
title: Visual indicator for your Teams app
author: v-sdhakshina
description: In this article, learn how to build visual indicator for your Microsoft Teams app in meeting.
ms.topic: conceptual
ms.author: v-sdhakshina
ms.localizationpriority: medium
---

# Visual indicator for your Teams app

Visual indicator for an app helps meeting participants identify any app activity during a meeting. Participants get activity notification for the meeting apps.

When there's new activity during the meeting, the app calls the targeted meeting notification API and displays a red indicator on the app icon in the meeting unified bar (U-bar). When the participants select the app icon, the app opens in a meeting side panel, and the indicator goes away.

For example, during a real time collaboration in a meeting, if a participant adds a comment in a file, the app calls the targeted meeting notification API from the participant's meeting side panel. This triggers a visual indicator on the app icon for other participants of the comment activity.

The following image shows you the visual indicator on the app icon in the meeting U-bar:

:::image type="content" source="../assets/images/visual-indicator.png" alt-text="Screenshot shows you the visual indicator on the app in U-bar in teams meeting."lightbox="../assets/images/visual-indicator.png":::

> [!NOTE]
>
> * Visual indicator for your Teams app is available only in [public developer preview](~/resources/dev-preview/developer-preview-intro.md).
> * Visual indicator is available only in [Government Community Cloud (GCC)-High and Department of Defense (DOD)](~/concepts/app-fundamentals-overview.md#government-community-cloud) environments.
> * Visual indicator isn't supported for mobile clients.
> * Visual indicator isn't supported for channel meetings.

To enable visual indicator, follow these steps:

1. [Enable app manifest settings](#enable-app-manifest-settings-for-visual-indicator)
1. [Enable visual indicator for your Teams app](#enable-visual-indicator-for-your-teams-app)

## Enable app manifest settings for visual indicator

To enable visual indicator, you must:

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

## Enable visual indicator for your Teams app

To enable visual indicator, ensure that you've [enabled targeted in-meeting notification](in-meeting-notification-for-meeting.md#enable-targeted-in-meeting-notification).

The [targeted meeting notification API](meeting-apps-apis.md#targeted-meeting-notification-and-visual-indicator-api) has been extended to support the visual indicator capability on the app icon and pass the user MRI IDs of the intended recipients. The `surfaces` parameter now supports `meetingTabIcon` value, which is used by the app.

App can also pass the `tabEntityId`, if there are multiple instances of the app added to the same meeting. If the `tabEntityId` isn't passed, then Teams displays the indicator on the first app icon on the users meeting window.

The targeted meeting notification API already supports `meetingStage` surface and apps can define multiple surfaces in the same API call if there are relevant scenarios.

App can define the following objects under the `surface` parameter:

* `meetingTabIcon`, which shows an indicator on the app icon.
* `meetingStage`, which sends an in-meeting notification.

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

## Limitations

* Visual indicator displays only one notification for a user in a minute per meeting.

* Visual indicator is displayed to a maximum of first 50 participants for a particular meeting.

## Code sample

|Sample name | Description | .NET |
|----------------|-----------------|--------------|
| Visual indicator for your Teams app | This sample demonstrates how to enable visual indicator for your Teams app. | [Link to be added] |

## See also

* [Build tabs for meeting](build-tabs-for-meeting.md)
* [Build in-meeting notification for Teams meeting](in-meeting-notification-for-meeting.md)
* [Targeted meeting notification API](meeting-apps-apis.md#targeted-meeting-notification-and-visual-indicator-api)
