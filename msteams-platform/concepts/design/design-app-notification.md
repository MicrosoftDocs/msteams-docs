---
title: Design app notification
author: v-sdhakshina
description: Learn how to design effective app notifications and choose the right framework for your app.
ms.author: v-sdhakshina
ms.topic: reference
ms.date: 02/23/2024
---
# Plan your app notifications

Notification is one of the most effective ways to engage and retain users. Within Microsoft Teams, platform apps can send notifications to the activity feed using the Graph API, send Adaptive Cards through bots, or post messages to Teams channels through incoming webhooks. Here you can learn the effective notification design principles and how to select the most suitable framework for your app.

Teams offers the following notification frameworks for your app:

:::row:::
   :::column span="":::

### Activity feed notification

Teams activity feed enables users to efficiently manage items that require attention by notifying them of any updates. Use the activity feed notification APIs in Microsoft Graph to extend this functionality to your apps. It also allows your apps to provide richer experiences and better user engagement by keeping them up to date with changes in the tools and workflows they use. For more information, see [Send activity feed notifications to users in Microsoft Teams](../../tabs/send-activity-feed-notification.md).

   :::column-end:::

   :::column span="":::

##### Key feature

* Proactively notify users with highly customized personal notifications.
* Grab immediate attention and prompt action, include rich experience within the main pane.  
* Users receive a double badge on both the activity icon and the Teams app icon.
* Allow you to broadcast messages and details to all members of a chat or channel.
* Quickly reach a large batch of users with relevant information.
* Users are prompted with operating system notifications that include a pop-out banner and sound, ensuring they don’t miss critical updates.
* Handle localization automatically through the app manifest.

   :::column-end:::

:::row-end:::

# [Mobile](#tab/mobile)

:::image type="content" source="../../assets/images/activity-feed/mobile-overview.png" alt-text="Example shows an app notification displaying in the Teams activity feed on mobile.":::

# [Desktop](#tab/desktop)

:::image type="content" source="../../assets/images/activity-feed/desktop-overview.png" alt-text="Example shows an app notification displaying in the Teams activity feed."  lightbox="../../assets/images/activity-feed/desktop-overview.png":::

---

:::row:::
   :::column span="":::

### Notification bot

Microsoft Teams Toolkit allows you to build apps that capture events and send them as bot notifications to a personal, group chat, or a channel in Teams. These notifications can be sent as plain text or Adaptive Cards. The notification bot template creates an app that sends a message to Teams with Adaptive Cards triggered by an HTTP post request. For more information, see [notification bot in Teams](../../bots/how-to/conversations/notification-bot-in-teams.md).

   :::column-end:::

   :::column span="":::

##### Key feature

* Notify everyone in a channel or chat about the same or related content.
* Create highly customizable UI using Adaptive Cards.
* Enable quick responses that include media content or action buttons.
* Schedule notifications to be sent at specific times.
* Light up double badges on both Activity and Chat, Channel, or app.
* Handle localization manually.

   :::column-end:::

:::row-end:::

:::image type="content" border="false" source="~/assets/images/get-started/get-started-bot.png" alt-text="Screenshot shows you the conceptual notification bot in Teams client":::

The key difference between these two notification frameworks is where users read notifications:

| Activity notifications | Notification bot |
|-----|-----|
|Users read activity notifications in a preview within Teams Activity. If the preview captures the user’s interest, they can select the notification to view the content in the Teams main pane.|  Bot notifications are presented as Adaptive Cards. When a notification bot sends a message, the bot conversation is highlighted in bold or dotted in Teams Chat.|

Teams main pane has larger surface than Adaptive Card to load more assets in a tab app or a Personal app. If your app already has tab or personal app, we don't recommend building a bot just for sending notifications.

## Notification Types

Evaluate whether your notifications are proactive or interactive.  

* **Proactive notifications** inform users about news, events, requests, and reminders that require users’ immediate attention and/or specific actions. **Activity notifications** are good for proactive notifications, attention-grabbing alert, announcements, reminders, and action-needed requests.
* **Interactive notifications** encourage users to respond to the sender with the information required for continuous communication. **Notification bot** is good for interactive notifications that require quick response in a light weighted and highly customizable cards.

Some notifications are both proactive and interactive, in that case either type of notifications work for the scenario.

You can also consider the following before you choose the notification for your app:

**Localization**: Activity notifications support with app manifest string localization. Templated text in your notification automatically translates into users’ preferred locale.  

**Batch send**: Activity notifications enable batch sending to up to 100 users in a single request, which is suitable for **announcement** type of notifications. You can also send a notification to all participants in a chat or channel. When you send a large number of notifications, activity notifications are faster than notification bot due to the higher throttling threshold in Graph APIs.

## Choose the right notification framework for your app

When you create your apps, you must consider to enable notifications for your app to effectively engage and retain users in Teams. Ask yourself the following questions:

* When or in what events do you want to notify users?
* What is the targeted user experience in Teams?
* Are the notifications proactive or interactive?
* Do you require localization support or batch send faster?

:::image type="content" source="../../assets/images/app-notification.png" alt-text="Screenshot shows you the flow diagram of notification framework for your app.":::

## See also

* [Send activity feed notifications to users in Microsoft Teams](../../tabs/send-activity-feed-notification.md)
* [Notification bot in Teams](../../bots/how-to/conversations/notification-bot-in-teams.md)
