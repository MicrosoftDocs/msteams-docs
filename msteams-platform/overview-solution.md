---
title: Teams Solution for Building Apps
author: heath-hamilton
description: Learn about Teams platform user story that helps map requirements to app functionalities to create app, development environments, tools required, and customization.
ms.topic: overview
ms.localizationpriority: high
ms.date: 02/06/2025
---
# The Teams solution

Microsoft Teams Platform is a powerful, flexible platform for creating apps for Teams. It provides a vast suite of development environments and tools that support app development.

## The user story

You've had a view of Teams offerings. You can now map them to user needs. Consider the following scenario:

A developer at Tours and Travel agency builds an app for their users, the travelers. The app must:

- Check and send the forecast to travelers registered with the travel agency.
- Notify users a day before the departure date so they can plan their journey.

Developers collate and map requirements to Teams functionalities:

| User app needs         | Check forecast                                               | Notification before travel                   | Registered user                                                                      |
| ---------------------- | :-----------------------------------------------------------:| :--------------------------------------------: | ------------------------------------------------------------------------------------ |
| **Capability**         | Notification bot                                             |                                              |                                                                                      |
| **Integration**        |                                                              |                                              | :::image type="icon" source="assets/icons/graph-small-icon.png"::: Microsoft Graph, Weather API |
| **Scope**              |                                                              | Personal app                                 |                                                                                      |
| **Integration point**  |                                                              | Notification                                 |                                                                                      |

**Teams app solution**: A Teams *notification bot* app that checks the forecast and *sends forecast notifications* to *registered users* before their travel date.

:::image type="content" border="false" source="../msteams-platform/assets/images/overview/developer-scenario-solution.png" alt-text="Screenshot shows you to builds a bot for Teams that sends weather forecast to customers so that they can plan ahead their traveling dates." lightbox="../msteams-platform/assets/images/overview/developer-scenario-solution.png" :::

Teams provides these and many more capabilities to build a feature-rich app solution. To develop this app:

1. Create a notification bot app.
2. Integrate with an external weather forecast API to connect and request forecasts for specific dates and locations.
3. Integrate with :::image type="icon" source="assets/icons/graph-small-icon.png"::: Microsoft Graph to manage registered users.
4. Check and send forecast details based on the user's travel date and travel location.

## Dive deeper

Choose to customize your app with additional functionalities such as user authentication and leverage tools like Microsoft Graph and Developer Portal.

Explore Teams Developer Documentation for building a Teams app that meets your requirements. Use the following references:

| What do you want?                                                                                             | Where to go                                                                                                          |
| ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| If you're new to Teams app development and want to create a new Teams app                                     | [Get started](get-started/get-started-overview.md)                                                                     |
| If you've created apps with Teams before and want to learn more about advanced app functionalities             | Build modules for [tabs](tabs/what-are-tabs.md), [bots](bots/what-are-bots.md), [message extensions](messaging-extensions/what-are-messaging-extensions.md), [meeting app](apps-in-teams-meetings/teams-apps-in-meetings.md), and more. |
| If you want to find more information about the available tools and SDKs options with Teams                       | [Explore SDKs](get-started/tool-options-and-code-samples.md#explore-sdks) and [Explore Tools](get-started/tool-options-and-code-samples.md#explore-tools) |

## See also

[Extend a Teams personal tab across Microsoft 365 app](m365-apps/extend-m365-teams-personal-tab.md)