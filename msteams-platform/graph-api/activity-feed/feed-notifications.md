---
title: Activity Feed notifications in Teams
description: Describes activity feed notifications in Teams and how to use to the best advantage
localization_priority:  Normal
author: laujan
ms.author: lajanuar
ms.topic: Overview
keywords: teams notifications feed activity Graph
---
# Microsoft Teams activity feed notifications  — Developer Preview

>[!NOTE]
>Microsoft Teams Graph API activity feed notifications are currently available in desktop and Android clients after Developer Preview has been enabled. See [How do I enable Developer Preview](../../resources/dev-preview/developer-preview-intro.md) for more information.

Activity feeds is a Microsoft Teams and Microsoft Graph integration that enables your app to use API endpoints to send notifications to users within the Teams client. Your application can send notifications directly or on behalf of a Teams user to create a rich user experience and deliver meaningful and essential information.

## Activity feed senders and recipients

There are two core concepts for sending notifications:

- **User context**: These notifications are sent on behalf of the user by the application based on a user-initiated activity.

- **Application context**: These notifications are sent directly by the application to users.

There are three core notification recipient types:

- **User**: An individual Teams user.

- **Chat members**: All members in a chat conversation.

- **Channel members**: All members of a team/channel.

## Activity feed types

|Notification type| Description|
|------------------|-----------------|
|sendActivityNotification| Post a notification to the activity feed of one or more Teams user|
|