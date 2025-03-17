---
title: Teams Solution for Building Apps
author: heath-hamilton
description: Learn about Teams platform user story that helps map requirements to app functionalities to create app, development environments, tools required, and customization.
ms.topic: overview
ms.localizationpriority: high
ms.date: 02/06/2025
---

# The Teams Solution

Microsoft Teams Platform is a powerful, flexible platform for creating apps. It provides a vast suite of development environments and tools to support app development.

## Overview

The Teams platform allows developers to map Teams offerings to user needs through a user-centered approach.

## The User Story

Consider a developer from a Tours and Travel agency aiming to build an app for travelers. The app must:

- Check and send the forecast to travelers registered with the travel agency.
- Notify users a day before the departure date for better planning.

### Requirements Mapping

| User App Needs             | Check Forecast  | Notification Before Travel | Registered User                          |
|----------------------------|:---------------:|:--------------------------:|------------------------------------------|
| **Capability**             | Notification bot|                            |                                          |
| **Integration**            |                 |                            | :::image type="icon" source="assets/icons/graph-small-icon.png"::: Microsoft Graph, Weather API |
| **Scope**                  |                 | Personal app               |                                          |
| **Integration Point**      |                 | Notification               |                                          |

### Teams App Solution

A Teams **notification bot** app can check and send forecast notifications to **registered users** prior to their travel date.

:::image type="content" border="false" source="../msteams-platform/assets/images/overview/developer-scenario-solution.png" alt-text="Screenshot of building a bot for Teams that sends weather forecasts to customers, enabling better travel planning." lightbox="../msteams-platform/assets/images/overview/developer-scenario-solution.png":::

## Development Steps

To develop this app:

1. Create a notification bot app.
2. Integrate with an external weather forecast API to request forecasts for specific dates and locations.
3. Integrate with :::image type="icon" source="assets/icons/graph-small-icon.png"::: Microsoft Graph for registered users.
4. Check and send forecast details based on the user's travel date and location.

## Dive Deeper

Customize your app with functionalities like user authentication and tools such as Microsoft Graph and the Developer Portal. Here are some resources to assist in building a Teams app:

| What Do You Want?   | Where to Go |
|---------------------|-------------|
| New to Teams app development and want to create a new Teams app | [Get started](get-started/get-started-overview.md) |
| Created an app with Teams before and want to learn more about app functionalities | Explore modules for [tabs](tabs/what-are-tabs.md), [bots](bots/what-are-bots.md), [message extensions](messaging-extensions/what-are-messaging-extensions.md), [meeting app](apps-in-teams-meetings/teams-apps-in-meetings.md), and more. |
| Want more information about tools and SDKs available with Teams | [Explore SDKs](get-started/tool-options-and-code-samples.md#explore-sdks) and [Explore Tools](get-started/tool-options-and-code-samples.md#explore-tools) |

## See Also

[Extend a Teams personal tab across Microsoft 365 app](m365-apps/extend-m365-teams-personal-tab.md)