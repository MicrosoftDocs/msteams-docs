---
title: Plan and build analytics for your Teams app
author: heath-hamilton
description: Plan and build analytics for your Teams app.
ms.topic: conceptual
ms.localizationpriority: high
ms.author: surbhigupta
---

# Plan and build analytics for your Teams app

As a developer who’s building an app for millions of Microsoft Teams users to achieve specific business or customer goals and distributing it using one or more of the many distribution options available to you, you will be interested to measure how your app is performing in the real-world once published. You will also be interested in monitoring who is interested in your app, which users and organizations are using your app, how are users engaging with your app, which users have churned away after using your app for some time and many such data points. Once you know this, you can analyse the data against your business goals, take corrective action by fixing issues and intervening in the user journey or plan further enhancements to your app.

## But Teams app usage report must suffice, isn’t it?

Remember, as the app’s developer you can track your app’s usage in the Teams app usage report in Partner Center, within a week after publishing your app on the marketplace. The usage report provides standard out-of-the-box metrics such as Monthly, Daily, and Weekly active users, retention and intensity charts, users who’ve used your app more than 5 days in the last month, platform, operating system and geographic split of users for your app etc. enabling you to track user demand, user churn and frequency of usage for your app at an aggregate level.

Teams usage report cannot provide you in-depth analytics of what goes on inside your app as well as specific user-level analytics such as a user’s journey within your app or a user’s engagement with specific features and scenario completions within your app. That is because your app on Teams is essentially a web-based service hosted elsewhere for eg: Azure cloud but embedded to be surfaced inside Microsoft Teams shell where end-users use your app. This applies to your app irrespective of the platform capabilities used such as tabs, bots, message extensions, meeting extensions, cards, task modules etc. since all of these are essentially means to surface web-based experiences inside Teams.

This is why you must plan analytics for the Teams app you’re building the same way as you do for your SaaS product that runs on the web browser.

