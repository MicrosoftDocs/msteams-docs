---
title: What are custom tabs in Microsoft Teams?
author: laujan
description: An overview of custom tabs on the Microsoft Teams platform
ms.topic: overview
ms.author: v-laujan
ms.topic: overview
---
# What are custom tabs in Microsoft Teams?

Custom tabs enable you to embed web-based content directly into Teams. You can build your own tab or expand your existing app's UI experience.

There are two types of tabs - group/channel and personal. A group/channel tab delivers dynamic content to group chats and channels and requires both a [content page](https://docs.microsoft.com/microsoftteams/platform/concepts/tabs/tabs-content) and a [configuration page](https://docs.microsoft.com/microsoftteams/platform/concepts/tabs/tabs-configuration). A personal tab delivers static content to individuals and requires only a [content page](https://docs.microsoft.com/microsoftteams/platform/concepts/tabs/tabs-content).

## Tabs Scope

Conversations, content, and collaboration objectives are essential considerations in your tabs design. Your tab's capabilities are based on scope. Scope maps to your intended users:

|Tab Scope|Tab User|Tab Type| Tab Functionality |
| --- | ---| --- | --- |
|"personal"|individual|personal|static only|
|"groupchat"|group| group/channel|configurable only|
|"teams"|channel| group/channel|configurable only|

## Tabs user scenarios

I am building a sales tracking app and I want to add tabs to support individuals, groups, and channels. \
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

- [Content and conversations, all at once using tabs](https://docs.microsoft.com/microsoftteams/platform/resources/design/framework/tabs)

- [QuickStart/staticTabs/foo.md](https://quickstart/statictabs)
- [QuickStart/configurableTabs/foo.md](https://quickstart/configurabletabs)


## Learn more

Learn more about how tabs function with other Teams app capabilities:

- [Combine bots with tabs](https://docs.microsoft.com/microsoftteams/platform/concepts/bots/bots-with-tabs)

- [Design a great Microsoft Teams app - Designing a great tab](https://docs.microsoft.com/en-us/microsoftteams/platform/get-started/design#designing-a-great-tab)

- foo.md