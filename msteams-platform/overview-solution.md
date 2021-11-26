---
title: Teams solution for building apps
author: heath-hamilton
description: Overview of Teams solution for building apps
ms.topic: overview
ms.localizationpriority: medium
ms.author: lajanuar
ms.date: 11/02/2021
---
# The Teams solution

Now that we’ve had a view of Teams offerings, let’s see how it maps to user needs. Let’s go back to our scenario.

## The user story

The user wants to build an app that checks and sends the weather updates to the users, the tourists, so that they can plan their travel. The main requirement is that the app should send the weather update to the user a day prior to the travel.

Let's collate and map requirements to Teams features:

| User app needs | Check weather | Notification before travel | Registered user |
| --- |:---:|:---:|:---:|
| **Capabilities** | &nbsp; | &nbsp; | &nbsp; |
| - Tab | &nbsp; | &nbsp; | &nbsp; |
| - Bot | ✔️ | &nbsp; | &nbsp; |
| - Message extension | &nbsp; | &nbsp; | &nbsp; |
| - Webhooks and Connectors | &nbsp; | &nbsp; | &nbsp; |
| - Microsoft Graph |&nbsp; | &nbsp; | ✔️ |
| **Scope** | &nbsp; | &nbsp; | &nbsp; |
| - Personal app | &nbsp; | ✔️ | &nbsp; |
| - Shared app | &nbsp; | &nbsp; | &nbsp; |
| **Entry point** | &nbsp; | &nbsp; | &nbsp; |
| - Team | &nbsp; | &nbsp; | &nbsp; |
| - Channel | &nbsp; | &nbsp; | &nbsp; |
| - Chat | &nbsp; | ✔️ | &nbsp; |
|

**App solution**: A Teams personal bot application that uses authentication features checks all these requirements.

:::image type="content" source="../msteams-platform/assets/images/overview/user-story-2.png" alt-text="Image showing user story" border="true":::

Teams offers these and many more capabilities to bring your users a feature-rich app solution.

> [!div class="nextstepaction"]
> [Start here](get-started/get-started-overview.md)
