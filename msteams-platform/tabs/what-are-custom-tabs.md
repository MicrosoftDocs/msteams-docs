---
title: What are custom tabs in Microsoft Teams?
author: laujan
description: An overview of custom tabs on the Microsoft Teams platform
ms.topic: overview
ms.author: laujan
ms.topic: overview
---
# What are custom tabs in Microsoft Teams?

Custom tabs enable you to embed web-based content directly into Teams. You can build your own tab or expand your existing app's UI experience.

There are two types of tabs - static and configurable. A static tab delivers the same content to each user and does not require a configuration page. A configurable tab delivers dynamic content that can be altered by user input and requires a configuration page.

Teams tabs have the following scope:

|Tabs Names | Tabs Availability  | Tabs Types|
|---|---|---|
|Personal | Individual User | Only **static** tabs are allowed within the personal scope. |
|Group Chat | Group Members | Only **configurable** tabs are allowed within the group chat scope. |
|Teams| Team| Only **configurable** tabs are allowed withing the team scope.|

## Tabs user scenarios

I built a sales tracking app and I need to add tabs to support individuals, groups, and teams. \
**Scenario:** personal \
**Example:** I need a tab for individual users to list personal goals and strategies without having to share them with the entire team.

**Scenario:** group chat \
**Example:** I need a tab for members of traveling sales groups to select their current location and view regional sales trends and goals.

**Scenario:** team \
**Example:** I need a tab for team members to select the company's daily, weekly, monthly or quarterly sales metrics in a comparison view.

## How do tabs work?

All Teams development (custom tabs, connectors, extensions, or bots) needs to be bundled in a [Teams app package](https://docs.microsoft.com/microsoftteams/platform/concepts/apps/apps-package)  for distribution either in the Teams App Store or within a team. A custom tab is declared directly in the manifest of your app package.

## Get Started

Ready to get started building? Here are a few guidelines:

[Content and conversations, all at once using tabs](https://docs.microsoft.com/microsoftteams/platform/resources/design/framework/tabs)


## Learn more

Learn more about how tabs function with other Teams app capabilities:

[Combine bots with tabs](https://docs.microsoft.com/microsoftteams/platform/concepts/bots/bots-with-tabs)


foo.md