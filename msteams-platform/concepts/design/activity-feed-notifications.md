---
title: Designing activity feed notifications
author: heath-hamilton
description: Learn how to design activity feed notifications for your Teams app and get the Teams UI Kit. Develop notifications from Teams channel in Visual Studio C#
ms.localizationpriority: medium
ms.author: surbhigupta
ms.topic: reference
ms.date: 06/28/2022
---
# Designing activity feed notifications for your Microsoft Teams app

The activity feed is a surface for users to access their notifications in Microsoft Teams. The feed retains notifications from the past four weeks.

# [Mobile](#tab/mobile)

:::image type="content" source="../../assets/images/activity-feed/mobile-overview.png" alt-text="Example shows an app notification displaying in the Teams activity feed on mobile.":::

# [Desktop](#tab/desktop)

:::image type="content" source="../../assets/images/activity-feed/desktop-overview.png" alt-text="Example shows an app notification displaying in the Teams activity feed."  lightbox="../../assets/images/activity-feed/desktop-overview.png":::

---

## Anatomy

:::image type="content" source="../../assets/images/activity-feed/activity-feed-card-anatomy.png" alt-text="Design anatomy of the Teams activity feed notification.":::

|Counter|Description|
|----------|-----------|
|1|**Avatar**: Shows who initiated the activity.|
|2|**Activity type/app icon**: Depicts the type of activity. For app notifications, the line icon is replaced with an app icon.|
|3|**Title (first line): Actor + reason**: *Actor*: Name of the user or app that initiated the activity. *Reason*: Describes the activity.|
|4|**Timestamp**: Shows when the activity happened.|
|5|**Location (second line)**: Shows where the activity happened in Teams.|
|6|**Text preview (third line)**: Shows a truncated line from the start of the notification.|

## Types of activity feed notification cards

The following variants show the kinds of activity feed notification cards you can display. The app logo replaces the user avatar for app-generated notifications.

:::image type="content" source="../../assets/images/activity-feed/activity-feed-card-types.png" alt-text="Variants of Teams activity feed cards." lightbox="../../assets/images/activity-feed/activity-feed-card-types.png":::

## Manage activity feed notifications

Users can manage notifications sent from your app in the Teams settings page.

## Related system notifications

Each activity generates a system notification. What displays depends on what the user configures in their notification settings. Users can also choose a notification style based on their operating system.

# [Mobile](#tab/mobile)

:::image type="content" source="../../assets/images/activity-feed/mobile-related-system-notifications.png" alt-text="Variants of Teams activity feed cards on Android and iOS.":::

|Counter|Description|
|----------|-----------|
|1|Android|
|2|iOS|

# [Desktop](#tab/desktop)

:::image type="content" source="../../assets/images/activity-feed/related-system-notifications.png" alt-text="Variants of Teams activity cards on different operating systems." lightbox="../../assets/images/activity-feed/related-system-notifications.png":::

|Counter|Description|
|----------|-----------|
|1|Teams custom|
|2|Windows|
|3|Mac|

---

## Step-by-step guide

Follow the [step-by-step guide](../../sbs-graphactivity-feedbroadcast.yml) to send activity feed notifications in Teams.

## Next step

> [!div class="nextstepaction"]
> [Implement activity feed notifications](/graph/teams-send-activityfeednotifications)
