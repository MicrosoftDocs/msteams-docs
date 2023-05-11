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

The Microsoft Teams Platform is a powerful, flexible platform for creating apps for Teams. It provides a vast suite of development environments and tools to support app development.

## The user story

You've had a view of Teams offerings. You can now map them to user needs. Let’s revisit the scenario.

The developer from Tours and Travel agency wants to build an app for their users, the travelers. The app must:

- Check and send the forecast to travelers registered with the travel agency.
- Notify the users a day before the departure date so they can plan.

Collate and map requirements to Teams features:

| User app needs | Check forecast | Notification before travel | Registered user |
| --- |:---:|:---:|:---:|
| **Capability** | Bot | &nbsp; | &nbsp; |
| **Integration** | &nbsp; | &nbsp; | :::image type="icon" source="assets/icons/microsoft-icon.png"::: Microsoft Graph, Weather API |
| **Scope** | &nbsp; | Personal app | &nbsp; |
| **Integration point** | &nbsp; | Chat | &nbsp; |

**Teams app solution**: A Teams *personal chat bot* app that checks and *sends forecast notification* to *registered users* before their travel date.

:::image type="content" border="false" source="../msteams-platform/assets/images/overview/developer-scenario-solution.png" alt-text="A developer at a travel agency builds a bot for Teams that sends weather forecast to customers so that they can plan ahead their traveling dates":::

Teams offers these and many more capabilities to bring your users a feature-rich app solution. To develop this app:

1. Create a personal chat bot app.
1. Integrate with an external weather forecast API to connect and request forecast for specific date and location.
1. Integrate with :::image type="icon" source="assets/icons/graph-small-icon.png"::: Microsoft Graph for registered users.
1. Check and send forecast details based on user's travel date and travel location.

Now, let start with building basic Teams app [Get started](get-started/get-started-overview.md).

If you're an experienced developer and wants to learn more about, see [Teams Toolkit Overview](toolkit/teams-toolkit-fundamentals.md) to build your Teams apps using various tools and SDKs, based on your requirements.
