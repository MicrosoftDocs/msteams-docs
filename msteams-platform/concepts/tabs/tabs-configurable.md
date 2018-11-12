---
title: Configurable Tabs
description: Describes how to get started with configurable tabs in Microsoft Teams
keywords: get started configurable tabs teams
ms.date: 11/12/2018
---

# Configurable tabs

A *configurable tab* becomes part of a channel and provides a single kind of information to a team. 

For example:

* the Planner tab for a channel contains a single plan; the Power BI tab maps to a specific report. Users can drill down to the relevant context, but they should not be able to navigate outside the tab.
* The Power BI tab doesn't enable navigation to other Power BI reports&mdash;but it does enable the **Go to website** button that launches the report in the main Power BI website.

## Scopes

Configurable tabs are defined in the app manifest, and can have a scope of either `team` or `groupchat`.

* Teams (`team` scope) - Tabs in channels allow teams to interact with your shared experience. Currently, all tabs in channels are *configurable tabs*&mdash;a user configures the content of your tab experience when the tab is first added to a channel.
* Group chat (`groupchat` scope) - configurable tabs can also be used in group chats. These are conversations between several users in a team.

## Creating a configurable tab

 To create a configurable tab follow these steps:

* [Create the configuration page](~/concepts/tabs/tabs-configuration): For configurable tabs, you must provide a configuration page to present options and gather information so users can customize the content and experience with your tab. This iframed HTML page is displayed when a user first adds the tab to a channel.
  * You can also enable users to [update or remove a tab](~/concepts/tabs/tabs-update-remove) after they add it.
* [Create the content page](~/concepts/tabs/tabs-content): A content page is an HTML page that you host. Microsoft Teams displays the page in an iframe when the user visits your tab.
  * You can also provide a page for users to specify [what happens to content when they remove a tab](~/concepts/tabs/tabs-update-remove#removing-a-tab).
  * You can enable users to create and share [deep links to items within your tab](~/concepts/deep-links), such as a link to an individual task within a tab that contains a task list.