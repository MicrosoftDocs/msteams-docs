---
title: Teams solution for building apps
author: heath-hamilton
description: Understand how to plan, design, build, extend to Microsoft 365, test, distribute, monetize, and integrate your app with Teams.
ms.topic: overview
ms.localizationpriority: high
ms.author: lajanuar
ms.date: 04/16/2023
---
# The Teams solution

Microsoft Teams Platform is a powerful, flexible platform for creating apps for Teams. It provides a vast suite of development environments and tools to support app development.

## The user story

You've had a view of Teams offerings. You can now map them to user needs. Let’s revisit the scenario.

The developer from Tours and Travel agency wants to build an app for their users, the travelers. The app must:

- Check and send the forecast to travelers registered with the travel agency.
- Notify the users a day before the departure date so they can plan.

Collate and map requirements to Teams functionalities:

| User app needs | Check forecast | Notification before travel | Registered user |
| --- |:---:|:---:|:---:|
| **Capability** | Notification bot | &nbsp; | &nbsp; |
| **Integration** | &nbsp; | &nbsp; | :::image type="icon" source="assets/icons/graph-small-icon.png"::: Microsoft Graph, Weather API |
| **Scope** | &nbsp; | Personal app | &nbsp; |
| **Integration point** | &nbsp; | Notification | &nbsp; |

**Teams app solution**: A Teams *notification bot* app that checks and *sends forecast notification* to *registered users* before their travel date.

:::image type="content" border="false" source="../msteams-platform/assets/images/overview/developer-scenario-solution.png" alt-text="Screenshot shows you to builds a bot for Teams that sends weather forecast to customers so that they can plan ahead their traveling dates."lightbox="../msteams-platform/assets/images/overview/developer-scenario-solution.png":::

Teams offers these and many more capabilities to bring your users a feature-rich app solution. To develop this app:

1. Create a notification bot app.
1. Integrate with an external weather forecast API to connect and request forecast for specific date and location.
1. Integrate with :::image type="icon" source="assets/icons/graph-small-icon.png"::: Microsoft Graph for registered users.
1. Check and send forecast details based on user's travel date and travel location.

## Dive deeper

Choose to customize your app with functionalities, such as user authentication and tools, such as Microsoft Graph and Developer Portal.

Let's go through Teams Developer Documentation based on your requirement for building Teams app:

| What do you want? | Where to go |
| --------| --------|
| If you're new to Teams app development and want to create a new Teams app | [Get started](get-started/get-started-overview.md) |
|If you've created app with Teams before and want to learn more about app functionalities | Build modules for [tabs](tabs/what-are-tabs.md), [bots](bots/what-are-bots.md), [message extensions](messaging-extensions/what-are-messaging-extensions.md), [meeting app](apps-in-teams-meetings/teams-apps-in-meetings.md), and more. |
| If you want to find more information about the tools and SDKs options that are available with Teams | [Explore SDKs](get-started/choose-what-suits-you.md#explore-sdks) and [Explore Tools](get-started/choose-what-suits-you.md#explore-tools) |

## See also

[Extend a Teams personal tab across Microsoft 365 app](m365-apps/extend-m365-teams-personal-tab.md)
