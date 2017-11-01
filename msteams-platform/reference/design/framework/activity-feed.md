---
title: Design Guidelines Reference
description: Describes the guidelines for showcasing the app
keywords: teams design guidelines reference framework apps
---
# Initiate quick, easy communication

The activity feed is a great way to communicate with your audience. You can use it to tell people about recent updates or send important notifications. For example, if your app focuses on task management, you can send a notification to someone’s activity feed whenever they receive a new task. Notifications in the activity feed will show up on someone’s desktop app and their mobile app, which helps draw attention to important information.

---

## Notifications

Your notifications appear in someone’s activity feed right next to all the other notifications about their new @mentions, likes, and replies. There are many ways to use the activity feed to communicate information about your service or about a user’s content.

Here are some ideas about the kind of notifications you can send to someone’s activity feed, depending on what your service does.

### Task List

A single notification that is part of a larger, ongoing list. For example, if your app deals with task management, you can publish a notification to someone’s activity feed whenever they receive a new task or when someone else updates an existing task.

### Updates

A single notification that lets a user know that something has been updated or edited. For example, if your services helps people manage their files, you can allow a user to “follow” a file to receive notifications whenever the file is modified.

### Reminder service

A notification that alerts someone about an important date (a due date or a meeting, for example). If your app is a time-sensitive reminder service, consider using the activity feed as your primary way of sharing those reminders.

Your notifications can contain any of the following components:

![Framework Feed](~/assets/images/framework/framework_feed.png)

1. **Sender**:
   Usually the name of your app (for example, when a bot wants to send someone an update or notification).

2. **Avatar**:
   Your app’s avatar or icon.

3. **Timestamp**:
   An indication of when your notification was sent.

4. **Subject**:
   This is included for notifications about chats.

5. **Message preview**:
   When someone receives a notification about a message that contains only plain text, they get a short preview of the content.

> [!TIP]
> Be careful about how often you send notifications. People can mute notifications in Teams, and they’ll be more likely to do so if your service seems “noisy”.

---

## Best practices

### Keep it short

Make sure to keep things concise because longer messages get truncated.

### Bundle your notifications

If your service regularly sends a lot of simultaneous notifications, try grouping them into a single notification. For example: “30 tasks were assigned to you”.
