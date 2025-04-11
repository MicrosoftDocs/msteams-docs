---
title: App Notification Types
author: v-sdhakshina
description: Learn how to design effective app notifications and choose the right framework for your app such as activity feed notification and interactive notification.
ms.author: v-sdhakshina
ms.topic: reference
ms.date: 02/23/2024
---

# Plan to Send App Notifications

Notifications are one of the most effective ways to engage and retain users within Microsoft Teams. Platform apps can either send notifications to the Activity Feed using the Graph API or deliver Adaptive Cards through bots. This guide explains the various notification types available and helps you select the most suitable notification framework for your app.

Teams offers the following notification frameworks:

:::row:::
   :::column span="":::

### Activity Feed Notification

The Activity Feed in Teams notifies users about updates, allowing them to efficiently manage items that require attention. This framework enriches the user experience by providing the latest updates on tools and workflows.

- Users view activity feed notifications as a preview in the Teams activity pane.
- If the preview captures user interest, selecting the notification opens the content in the main Teams window.

   :::column-end:::

   :::column span="":::

### Interactive Notification Bot

The Microsoft Teams Toolkit enables developers to build apps that capture events and send them as bot notifications in personal chats, group chats, or channels. An interactive notification bot template helps create apps that send messages using Adaptive Cards or plain text, triggered by an HTTP POST request.

- When the bot sends a message, the conversation appears highlighted (in bold or dotted) in the Teams chat.
- This highlight draws user attention, allowing them to read and respond to the message.

   :::column-end:::
   
:::row-end:::

<br>

Note: The Teams window offers a larger surface area than Adaptive Cards, making it ideal for loading more assets in a tab or personal app. If your app already includes a tab or personal app, it is not recommended to build a bot solely for sending notifications.

## Notification Types

Determine whether your notification needs to be proactive or interactive by evaluating your requirements:

:::row:::
   :::column span="":::

### Proactive Notifications

Proactive notifications inform users about news, events, requests, and reminders that require immediate attention or specific actions.

- Use these notifications for attention-grabbing alerts, announcements, reminders, and requests that require a user response.
- The recommended framework for such scenarios is **Activity notifications**.

   :::column-end:::

   :::column span="":::

### Interactive Notifications

Interactive notifications are designed to prompt users to respond, enabling continuous communication between the sender and the recipient.

- Opt for these notifications when you need quick responses through lightweight and customizable cards.
- The recommended framework for these interactions is the **Interactive Notification Bot**.

   :::column-end:::
   
:::row-end:::

### Choose the Right Notification Framework

When creating your app, enabling notifications is essential to engage and retain users within Teams. To decide on the appropriate framework, consider the following questions:

1. What is the targeted user experience in Teams?
   - Use **Activity Feed Notifications** when you want users to consume notifications both in the Activity Feed and the Teams window.
   - Use **Interactive Notification Bot** when you want users to interact directly with an Adaptive Card.

2. How do you expect users to interact with the notification?
   - Choose **Activity Feed Notifications** if no further conversation is expected between the user and the bot.
   - Choose **Interactive Notification Bot** to encourage ongoing conversations with the bot.

:::image type="content" source="../../assets/images/app-notifications.png" alt-text="Screenshot shows you to choose your right notification framework for your app." lightbox="../../assets/images/app-notifications.png":::

Below are some example scenarios along with the recommended notification types:

| Notification Scenario                                                                               | Notification Type | Recommended Notification         |
| --------------------------------------------------------------------------------------------------- | ----------------- | -------------------------------- |
| If a vice president makes an announcement to be broadcast to the entire organization.              | Proactive         | Activity notification            |
| Colleague mentions a teammate and requests collaboration on a shared document.                      | Proactive         | Activity notification            |
| Proactive reminder to complete a required training course immediately.                            | Proactive         | Activity notification            |
| Quick poll on a preferred venue for a team lunch.                                                 | Interactive       | Notification bot                 |
| Interactive reminder to take a break and select music to play.                                    | Interactive       | Notification bot                 |

:::row:::
   :::column span="":::

To implement proactive notifications in your app, refer to the following guide:

> [!div class="nextstepaction"]
> [Activity feed notifications to users in Teams](/graph/teams-send-activityfeednotifications)

   :::column-end:::

   :::column span="":::

For interactive notifications in your app, consult this guide:

> [!div class="nextstepaction"]
> [Interactive notification bot in Teams](../../bots/how-to/conversations/interactive-notification-bot-in-teams.md)

   :::column-end:::
   
:::row-end:::

---

Practical Scenario Examples:

1. Proactive Notifications:
   - Use case: A company executive needs to broadcast a critical update to all employees.
   - Recommendation: Use Activity Feed Notifications to ensure immediate attention without requiring further user-bot conversation.

2. Interactive Notifications:
   - Use case: Launch a poll to gather team preferences on meeting times.
   - Recommendation: Use Interactive Notification Bot to allow users to respond directly within the Adaptive Card, facilitating real-time feedback and conversation.

These examples provide a real-world context for implementing the correct notification framework in your app.