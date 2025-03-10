---
title: App Notification Types
author: v-sdhakshina
description: Learn how to design effective app notifications and choose the right framework for your app such as activity feed notification and interactive notification.
ms.author: v-sdhakshina
ms.topic: reference
ms.date: 02/23/2024
---

# Plan to send app notifications

Notifications are one of the most effective ways to engage and retain users within Microsoft Teams. The platform apps can either send notifications to the activity feed using the Graph API or send Adaptive Cards through bots. Let's learn the effective notification types and select the most suitable notification framework for your app.

Teams offers the following notification frameworks for your app:

:::row:::
   :::column span="":::

### Activity feed notification

Teams activity feed enables users to efficiently manage items that require attention by notifying them of any updates. It allows your apps to provide rich and better user experiences with the latest updates on the tools and workflows.
<br><br>
Users can read the activity feed notifications in the preview within Teams activity pane. If the preview captures the user’s interest, they can select the notification to view the content in the Teams window.

   :::column-end:::

   :::column span="":::

### Interactive notification bot

Microsoft Teams Toolkit allows you to build apps that capture events and send them as bot notifications to a personal chat, a group chat, or a channel. An interactive notification bot template creates an app that sends a message to Teams with Adaptive Cards or with plain text triggered by an HTTP post request.
<br><br>
When an interactive notification bot sends a message, the bot conversation is highlighted in bold or dotted in the Teams chat that draws the user’s attention from where they can read and respond to the message.

   :::column-end:::

:::row-end:::

<br>
Teams window has larger surface than Adaptive Card to load more assets in a tab app or a Personal app. If your app already has tab or personal app, we don't recommend building a bot only for sending notifications.

## Notification types

Based on your requirements between activity feed notification and interactive notification bot, you must evaluate and understand whether your notifications must be proactive or interactive.

:::row:::
   :::column span="":::

### Proactive notifications

Informs users about news, events, requests, and reminders that require users’ immediate attention or specific actions. <br><br> If you need to send notifications that are proactive, attention-grabbing alert, announcements, reminders, and action-needed requests, **Activity notifications** is the recommended framework.

   :::column-end:::

   :::column span="":::

### Interactive notifications

Encourage users to respond to the sender with the information required for continuous communication. <br><br> If you need to send notifications that are interactive and require quick response in a light weighted and highly customizable cards, **Interactive notification bot** is the recommended framework.

   :::column-end:::

:::row-end:::

### Choose the right notification framework

When you create your apps, enable notifications for your app to engage and retain users within Teams. Consider the following questions to determine the right notification framework for your app:

What is the targeted user experience in Teams?

* Use activity feed notifications when you want users to consume notifications in activity and Teams window.<br>
* Use interactive notification bot when you want users to interact with Adaptive Card.

How do you expect users to interact with the notification?

* Use activity feed notifications when there's no further conversation is expected between the user and bot.
* Use interactive notification bot to encourage conversations with the bot.

:::image type="content" source="../../assets/images/app-notifications.png" alt-text="Screenshot shows you to choose your right notification framework for your app." lightbox="../../assets/images/app-notifications.png":::

Here's some example scenarios and recommended notification types:

|Notification scenario|Notification type |Recommended notification|
|----|----|----|
|If a vice president makes an announcement to be broadcasted to the entire organization.|Proactive|Activity notification |
|Colleague mentions a teammate and requests to collaborate in a shared document.|Proactive|Activity notification |
|Proactive reminder to finish required a training course immediately.|Proactive|Activity notification|
|Quick poll on a preferred place for team lunch.|Interactive|Notification bot|
|Interactive reminder to take a break and choose a music to play.|Interactive|Notification bot|

:::row:::
   :::column span="":::

If you want a proactive notification for your app, go to:

> [!div class="nextstepaction"]
> [Activity feed notifications to users in Teams](/graph/teams-send-activityfeednotifications)

   :::column-end:::

   :::column span="":::

If you want an interactive notification for your app, go to:

> [!div class="nextstepaction"]
> [Interactive notification bot in Teams](../../bots/how-to/conversations/interactive-notification-bot-in-teams.md)

   :::column-end:::

:::row-end:::
