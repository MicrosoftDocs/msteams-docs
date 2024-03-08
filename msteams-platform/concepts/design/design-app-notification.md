---
title: Design app notification
author: v-sdhakshina
description: Learn how to design effective app notifications and choose the right framework for your app.
ms.author: v-sdhakshina
ms.topic: reference
ms.date: 02/23/2024
---

# Choose your app notifications

Notification is one of the most effective ways to engage and retain users. Within Microsoft Teams, platform apps can send notifications to the activity feed using the Graph API or send Adaptive Cards through bots. Here you can learn the effective notification design principles and how to select the most suitable framework for your app.

Teams offers the following notification frameworks for your app:

:::row:::
   :::column span="":::

### Activity notification

Teams activity feed enables users to efficiently manage items that require attention by notifying them of any updates. It also allows your apps to provide richer experiences and better user engagement by keeping them up to date with changes in the tools and workflows they use.
<br>
<br>
Users can read the activity notifications in a preview within Teams Activity. If the preview captures the user’s interest, they can select the notification to view the content in the Teams main pane.

   :::column-end:::

   :::column span="":::

### Notification bot

Microsoft Teams Toolkit allows you to build apps that capture events and send them as bot notifications to a personal, group chat, or a channel in Teams. The notification bot template creates an app that sends a message to Teams with Adaptive Cards triggered by an HTTP post request.
<br>
<br>
Users read a bot notification in an Adaptive Card. When a notification bot sends a message, the bot conversation is highlighted in bold or dotted in Teams Chat.

   :::column-end:::

:::row-end:::

<br>
Teams main pane has larger surface than Adaptive Card to load more assets in a tab app or a Personal app. If your app already has tab or personal app, we don't recommend building a bot just for sending notifications.

## Notification Types

Evaluate whether your notifications are proactive or interactive.

:::row:::
   :::column span="":::

### Proactive notifications

Inform users about news, events, requests, and reminders that require users’ immediate attention and/or specific actions. **Activity notifications** are good for proactive notifications, attention-grabbing alert, announcements, reminders, and action-needed requests.

   :::column-end:::

   :::column span="":::

### Interactive notifications

Encourage users to respond to the sender with the information required for continuous communication. **Notification bot** is good for interactive notifications that require quick response in a light weighted and highly customizable cards.

   :::column-end:::

:::row-end:::

### Choose the right notification framework for your app

When you create your apps, you must consider to enable notifications for your app to effectively engage and retain users in Teams.

* What is the targeted user experience in Teams?
  * Use Activity notifications when you want users to consume notifications in Activity and main pane. <br>
  * Use notification bot when you want users to interact with Adaptive Card.

* How do you expect users to interact with the notification?
  * Notification bot must encourage conversations with the bot. <br>
  * If no further conversation is expected between the user and bot, use activity notifications instead.  

:::image type="content" source="../../assets/images/app-notifications.png" alt-text="Screenshot shows you to choose your right notification framework for your app." lightbox="../../assets/images/app-notifications.png":::

Here's some example scenario's and recommended notification types:

|Notification scenario|Notification type |Recommended notification|
|----|----|----|
|If a vice president makes an announcement to be broadcasted to the entire organization.|Proactive|Activity notification |
|Colleague mentions a team mate and requests to collaborate in a shared document.|Proactive|Activity notification |
|Proactive reminder to finish required a training course immediately.|Proactive|Activity notification|
|Quick poll on a preferred place for team lunch.|Interactive|Notification bot|
|Interactive reminder to take a break and choose a music to play.|Interactive|Notification bot|

## Next step

If you want a proactive notification for your app, go to:

> [!div class="nextstepaction"]
> [Send activity feed notifications to users in Teams](../../tabs/send-activity-feed-notification.md)

If you want an interactive notification for your app, go to:

> [!div class="nextstepaction"]
> [Notification bot in Teams](../../bots/how-to/conversations/notification-bot-in-teams.md)
