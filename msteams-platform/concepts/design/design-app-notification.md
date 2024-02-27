---
title: Design app notification
author: v-sdhakshina
description: Learn how to design effective app notifications and choose the right framework for your app.
ms.author: v-sdhakshina
ms.topic: reference
ms.date: 02/23/2024
---
# Design app notifications

Notification is one of the most effective ways to engage and retain users. Within Microsoft Teams, platform apps can send notifications to the activity feed using the Graph API, send Adaptive Cards through bots, or post messages to Teams channels through incoming webhooks. In this guide, learn effective notification design principles and how to select the most suitable framework for your app.

## Activity notifications

The Microsoft Teams activity feed enables users to triage items that require attention by notifying them of changes. You can use the activity feed notification APIs in Microsoft Graph to extend this functionality to your apps. It also allows your apps to provide richer experiences and better user engagement by keeping them up to date with changes in the tools and workflows they use.

# [Desktop](#tab/desktop)

:::image type="content" source="../../assets/images/activity-feed/desktop-overview.png" alt-text="Example shows an app notification displaying in the Teams activity feed."  lightbox="../../assets/images/activity-feed/desktop-overview.png":::

# [Mobile](#tab/mobile)

:::image type="content" source="../../assets/images/activity-feed/mobile-overview.png" alt-text="Example shows an app notification displaying in the Teams activity feed on mobile.":::

---

### Key features of activity notifications

* Proactively notify users with highly customized personal notifications.
* Need immediate attention and action, include rich experience in main pane.  
* Double badge on activity icon and Teams app icon.
* Broadcast messages and details for all the members of the chat or channel.
* Broadcast messages and details quickly to a large batch of users.
* Prompt users with operating system notifications that include a pop-out banner and sound.
* Handle localization automatically through app manifest.

## Notification Bot

Microsoft Teams Toolkit allows you to build apps that capture events and send them as bot notifications to a personal, group chat, or a channel in Teams. These notifications can be sent as plain text or Adaptive Cards. The notification bot template creates an app that sends a message to Teams with Adaptive Cards triggered by an HTTP post request.

### Key features of notification Bots

* Notify everyone in a channel or chat about the same or related content.
* Highly customizable UI in a Card.
* Quick response includes media content or action buttons.
* Send scheduled notifications.
* Light up double badges on both Activity and Chat, Channel or app.
* Handle localization manually.

## Choose the right notification framework for your app

When designing your apps, consider using notifications to effectively engage and retain users in Teams. Ask yourself the following questions:

* When or in what events do you want to notify users?
* What is the targeted user experience in Teams?
* Are the notifications proactive or interactive?
* Do you require localization support or batch send faster?

:::image type="content" source="../../assets/images/app-notification.png" alt-text="Screenshot shows you the flow diagram of notification framework for your app.":::

## End-user experience

The key difference between the two notification frameworks is where users read notifications:

1. Users read activity notification in a preview. Teams Activity is a place to triage most important notifications. If the notification preview attracts the user, they can select the notification and open the content in the Teams main pane.
1. Users read a bot notification in an Adaptive Card. When a notification bot sends a message, the bot conversation is bold or dotted in Teams Chat.

Teams main pane has larger surface than Adaptive Card to load more assets in a tab app or a Personal app. If your app already has tab or personal app, we don't recommend building a bot just for sending notifications.

## Notification Types

Evaluate whether your notifications are proactive or interactive.  

* **Proactive notifications** inform users about news, events, requests, and reminders that require users’ immediate attention and/or specific actions.
* **Interactive notifications** encourage users to respond to the sender with the information required for continuous communication.

Activity notifications are good for proactive notifications, attention-grabbing alert, announcements, reminders, and action-needed requests.

Notification bot is good for interactive notifications that require quick response in a light weighted and highly customizable cards.

Some notifications are both proactive and interactive, in that case either type of notifications work for the scenario.

In scenarios where notifications required both proactive and interactive, either type can be effective.

### Other considerations

**Localization**: Activity notifications support with app manifest string localization. Templated text in your notification automatically translates into users’ preferred locale.  

**Batch send**: Activity notifications enable batch sending to up to 100 users in a single request, which is suitable for **announcement** type of notifications. You can also send a notification to all participants in a chat or channel. When you send a large number of notifications, activity notifications are faster than notification bot due to the higher throttling threshold in Graph APIs.

## See also

* [Send activity feed notifications to users in Microsoft Teams](../../tabs/send-activity-feed-notification.md)
* [Notification bot in Teams](../../bots/how-to/conversations/notification-bot-in-teams.md)
