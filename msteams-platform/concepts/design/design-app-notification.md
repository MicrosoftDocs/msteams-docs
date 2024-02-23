---
title: Design app notification
author: v-sdhakshina
description: Learn how to design effective app notifications and choose the right framework for your app.
ms.author: v-sdhakshina
ms.topic: reference
ms.date: 02/23/2024
---
# Design app notifications

Notification is one of the most effective ways to engage and retain users. In Teams, Platform App can send notifications into Activity using Graph API, send Adaptive Cards through bots or post messages to Teams channels using incoming webhooks. This article helps you design effective notifications and choose the right framework for your app.

## Understanding Activity notifications

The Microsoft Teams activity feed enables users to triage items that require attention by notifying them of changes. You can use the activity feed notification APIs in Microsoft Graph to extend this functionality to your apps. It also allows your apps to provide richer experiences and better user engagement by keeping them up to date with changes in the tools and workflows they use.

## Key features of activity notifications

* Notify users proactively with highly customized personal notifications.

* Need immediate attention and action, include rich experience in main pane.  

* Double badge on Activity icon and Teams app icon.

* Broadcast messages and details for all the members of the chat or channel.

* Broadcast messages and details quickly to  a large batch of users.

* Toast users with OS notifications (pop-out banner & sound).

* Handle localization automatically via manifest.

## Understanding notification Bot

Microsoft Teams Toolkit enables you to build applications that capture events and send them as Bot notifications to a personal, group chat, or a channel in Teams. You can send Bot notifications as plain text or Adaptive Cards. The notification bot template creates an app that sends a message to Teams with Adaptive Cards triggered by HTTP post request.

## Key features of notification Bots

* Notify everyone in a channel or chat about the same or related content.

* Highly customizable UI in a Card.

* Need quick response, include media content, or action buttons.

* Send scheduled notifications

* Light up double badges on both Activity and Chat, Channel or App

* Handling localization manually.

## Choose the right notification framework for your app

Sending notifications to users are great ways to improve user engagement and retention. When designing your apps, consider using notifications to effectively engage users:

* When or in what events do you want to notify users

* What is the targeted user experience in Teams

* Are the notifications proactive or interactive?

* Do you require localization support or batch send faster?

## End-user experience

The key difference between the two notification frameworks is where users read notifications:

1. Users read Activity notification in a preview. Teams Activity is a place to triage most important notifications. If the notification preview interests the user, user clicks to launch full content in Teams main pane.

1. Users read a Bot notification in an Adaptive Card. When a notification Bot send a message, the Bot conversation is bold or dotted in Teams Chat.

Comparing with Adaptive Card, Teams main pane has larger surface to load more assets in a Tab app or a Personal app. If your app already has Tab or Personal app, we do not recommend building a Bot just for sending notifications.

## Notification Types

Evaluate whether your notifications are proactive or interactive.  

* Proactive notifications inform users about news, events, requests, and reminders that require users’ immediate attention and/or specific actions.

* Interactive notifications encourage users to respond to the sender with the information needed for continuous communication.

Activity notifications are good for proactive notifications: attention-grabbing alert, announcements, reminders, and “action-needed” requests. Notification Bot is good for interactive notifications: need quick response in a light weighted & highly customizable Card.

## Other considerations

**Localization**: Activity notifications are supported with manifest string localization. Templated text in your notification will be automatically translated into users’ preferred locale.  

**Batch send**: Activity notifications support batch send to 100 users in one request, which is suitable for “Announcement” type of notifications. You can also send a notification to everyone in a Chat or Channel. When fanning out large number of notifications, Activity notifications are usually faster than Notification Bot, because of higher throttling threshold in Graph APIs.

## See also

* [Send activity feed notifications to users in Microsoft Teams](../../tabs/send-activity-feed-notification.md)
* [Notification bot in Teams](../../bots/how-to/conversations/notification-bot-in-teams.md)
