---
title: https://review.docs.microsoft.com/en-us/help/contribute/metadata-attributes?branch=master
author: laujan
description: An overview of custom tabs on the Microsoft Teams platform
ms.topic: overview
ms.author: laujan
ms.service: #Required; service per approved list. service slug assigned to your service by ACOM.
ms.topic: overview #Required
ms.date: \"$CURRENT_MONTH-$CURRENT_DATE-$CURRENT_YEAR\"
---
# What are custom tabs in Microsoft Teams?

Custom tabs enable you to embed web-based content directly into Teams channels. You can build your own tab or expand your existing app UI experience. 

There are two types of tabs - static and configurable. A static tab delivers the same content to each user and does not require a configuration page. A configurable tab delivers dynamic content that can be altered by user input and requires a configuration page.

Teams tabs have the following pre-defined scopes:

|Tab Scope Name | JSON Value | Tab Availability  | Tab Type|
| --- | --- | --- | --- |
|Personal | "personal" | individual user | only **static** tabs are allowed at the personal level. |
|Group Chat | "group chat" | group members | only **configurable** tabs are allowed at the group chat level. |
|Teams| "teams" | Channel| only **configurable** tabs are allowed at the team level.|


## Tabs user scenarios

I built a sales tracking app and I need to add tabs to support indiduals, groups, and teams.
**Scenario:** personal \
**Example:**I need a tab for individual users to have the ability to list personal goals and strategies without having to share with the entire team.

**Scenario:** group chat \
**Example:**I need a tab for members of traveling sales groups to select their current location and view sales trends and goals.

**Scenario:** team \
**Example:**I need a tab for the team members to select a daily, weekly, monthly or quarterly sales view and create columns for a comparison view.

## How do tabs work?

All Teams development (tabs, connectors, extensions, or bots) need to bundled in a [Teams app package](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/apps/apps-package)  for it to be distributed either in the Teams App Store or within your channel. A custom tab is declared directly in the manifest of an app package.

## Get Started

Ready to get started building? Try one of our quickstarts:

## Learn more
