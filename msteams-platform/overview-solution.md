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

Now that you've had a view of Teams offerings, you can map them to user needs. Let’s revisit the user scenario.

## The user story

The developer from Tours and Travel agency wants to build an app for their users, the travelers. The app should:

- Check and send the forecast to travelers registered with the travel agency.
- Notify the users a day before the departure date so they can plan.

Collate and map requirements to Teams features:

| User app needs | Check forecast | Notification before travel | Registered user |
| --- |:---:|:---:|:---:|
| **Capability** | Bot | &nbsp; | &nbsp; |
| **Integration** | &nbsp; | &nbsp; | Microsoft Graph; Forecast website |
| **Scope** | &nbsp; | Personal app | &nbsp; |
| **Integration point** | &nbsp; | Chat | &nbsp; |
|

**Teams app solution**: A Teams *personal chat bot* app, which checks and *sends forecast notification* to *registered users* before their travel date, checks all requirements.

:::image type="content" source="../msteams-platform/assets/images/overview/user-story-2.png" alt-text="Image showing user story" border="true":::

Teams offers these and many more capabilities to bring your users a feature-rich app solution. To develop this app:

1. Create a personal chat bot app.
1. Integrate with weather forecast external API from a forecast website to connect and request forecast for specific date and location.
1. Integrate with Microsoft Graph for registered users.
1.Check and send forecast details on the basis of users travel date and travel location on a particular day. 

> [!div class="nextstepaction"]
> [Start here](get-started/get-started-overview.md)
