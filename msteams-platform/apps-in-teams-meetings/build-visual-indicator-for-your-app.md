---
title: Build visual indicator for your Teams app
author: v-sdhakshina
description: In this article, learn how to build visual indicator for Microsoft Teams app using bot SDKs.
ms.topic: conceptual
ms.author: v-sdhakshina
ms.localizationpriority: medium
---

# Build visual indicator for your Teams app

With the visuaI indicator on Teams UI bar, whenever there’s a new activity during the meeting will catch the user’s attention more easily so that the user may open the side panel whenever required and consume the new alerts. The app’s value-add is not diminished even in the absence of side panel. The app will trigger our meeting notification API and pass the MRI ids of the intended recipients along with “meetingTabIcon” in the surfaces param to get the end user’s attention.



> [!NOTE]
>
> * Visual indicator are available only in [Government Community Cloud (GCC)-High and Department of Defense (DOD)](~/concepts/app-fundamentals-overview.md#government-community-cloud) environments.
> * Visual indicator is supported only in Teams desktop clients.

## Feature compatibility by user types

The following table provides the user types and lists the features that each user can access in meetings:

| User type | Scheduled meeting or Instant calendar meeting | One-on-one call | Group call |
| :-- | :-- | :-- | :-- | :-- |
| In-tenant | Available | Available |  Available | 
| Guest | Available | Available |  Available | 
| Federated or External | Available | Not available | Not available | 
| Anonymous | Available | Not available | Not available | 

## Enable visual indicator for your Teams app

1. ​This feature requires the app to have integrated with our Bot SDK and have a tab app that supports meeting side panel context.
1. ​The tab should be installed in the meeting for which the app makes the notification call.
1. The [Meeting Notification API](in-meeting-notification-for-meeting.md#enable-targeted-in-meeting-notification) in our Bot SDK has been extended to support this capability of showing a visual indicator on the tab icon. The “surfaces” param now supports a “meetingTabIcon” value which is to be used by the app for this feature.
1. ​Whenever there’s a new activity for which the app wants to get the end user’s attention, the app will call our meeting notification API and pass the MRI ids of the intended recipients along with “meetingTabIcon” in the surfaces param.  
1. ​The app can optionally also pass the tab entity id if there are multiple instances of the tab added to the same meeting. If the tab entity id is not passed by the app, then Teams will show the indicator on the first tab icon visible on the user’s meeting window.
1. This API already supports Targeted In-Meeting Notifications for the meetingStage surface and thus apps can define multiple surfaces in the same API call if there are relevant scenarios. The app could define two objects under the “surfaces” array, one for “meetingTabIcon” and the other for “meetingStage” which would show an indicator on the tab icon as well as an in-meeting notification on the meeting stage for the same user(s).

## Scenarios

* App wants to throw suggestions to User A regarding the on-going meeting.

* A timer app wants to indicate to all meeting participants that for a time check.

* A polling app wants to indicate to User A and B about a poll they missed that were launched before they joined a meeting.


## Limitations
The following are the limitations:

* The indicator will show only one notification per minute per user per meeting.

* The indicator will show to a maximum of first 50 in the array of participants in a particular meeting. For the above 50 participants it will be a no-op.

* The app and its corresponding JS SDK bridge is terminated within the Teams ecosystem as soon as the tab is closed. 


## See also

[Build in-meeting notification for Teams meeting](in-meeting-notification-for-meeting.md)
