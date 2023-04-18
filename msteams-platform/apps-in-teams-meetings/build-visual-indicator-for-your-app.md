---
title: Build visual indicator for your Teams app
author: v-sdhakshina
description: In this article, learn how to build visual indicator for Microsoft Teams app using bot SDKs.
ms.topic: conceptual
ms.author: v-sdhakshina
ms.localizationpriority: medium
---

# Build visual indicator for your Teams app

To ensure you not miss any critical updates in the meeting from the other attendees, by showing the visual indicator on UI bar, user attention can be drawn on the new activity and app’s value-add is not diminished even in the absence of side panel.

The visual indicator on Teams meeting UI bar keeps user engaged with the app in the meeting side panel and shows you indication on each activity we do in the app.

> [!NOTE]
>
> * Visual indicator are available only in [Government Community Cloud (GCC)-High and Department of Defense (DOD)](~/concepts/app-fundamentals-overview.md#government-community-cloud) environments.
> * Visual indicator is supported only in Teams desktop clients.

## Scenarios

* App wants to throw suggestions to User A regarding the on-going meeting.

* A timer app wants to indicate to all meeting participants that for a time check.

* A polling app wants to indicate to User A and B about a poll they missed that were launched before they joined a meeting.

## Enable visual indicator for your Teams app

1. ​This feature requires the app to have integrated with our Bot SDK and have a tab app that supports meeting side panel context.
1. ​The tab should be installed in the meeting for which the app makes the notification call.
1. The [Meeting Notification API](in-meeting-notification-for-meeting.md#enable-targeted-in-meeting-notification) in our Bot SDK has been extended to support this capability of showing a visual indicator on the tab icon. The “surfaces” param now supports a “meetingTabIcon” value which is to be used by the app for this feature.
1. ​Whenever there’s a new activity for which the app wants to get the end user’s attention, the app will call our meeting notification API and pass the MRI ids of the intended recipients along with “meetingTabIcon” in the surfaces param.  
1. ​The app can optionally also pass the tab entity id if there are multiple instances of the tab added to the same meeting. If the tab entity id is not passed by the app, then Teams will show the indicator on the first tab icon visible on the user’s meeting window.
1. This API already supports Targeted In-Meeting Notifications for the meetingStage surface and thus apps can define multiple surfaces in the same API call if there are relevant scenarios. The app could define two objects under the “surfaces” array, one for “meetingTabIcon” and the other for “meetingStage” which would show an indicator on the tab icon as well as an in-meeting notification on the meeting stage for the same user(s).

## Limitations

* Visual indicator can show one notification per minute per user per meeting.
* The indicator will be shown to a maximum of 50 participants in a particular meeting. If the app requests showing the indicator for more than 50 participants, then the first 50 in the array will be shown the indicator and for the rest it will be a no-op. Teams will throw a warning/error back to the calling app so that they are aware of this.
* The app and its corresponding JS SDK bridge is killed within the Teams ecosystem as soon as the tab is closed. Hence this API can only be called by the app from a Side Panel (or stage/content bubble) which is opened by one of the participants.

## See also

[Build in-meeting notification for Teams meeting](in-meeting-notification-for-meeting.md)
