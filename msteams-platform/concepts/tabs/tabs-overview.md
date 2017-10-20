---
title: Develop tabs
description: Describes how to get started developing tabs in Microsoft Teams
keywords: teams tabs development
---

# Develop tabs for Microsoft Teams

Tabs in Microsoft Teams allow you to display rich interactive web content. You can build a Microsoft Teams tab from scratch or adapt your existing web-app experience.

![Example of a tab showing data, alongside a conversation about the tab data](~/assets/images/tab_example.png)

Microsoft Teams supports tabs in two scopes:

* **Team scope**&emsp;Tabs in channels allow teams to interact with your shared experience. Currently, all tabs in channels are *configurable tabs*&mdash;a user configures the content of your tab experience when the tab is first added to a channel.
* **Personal scope**&emsp;Tabs in the personal scope allow users to interact with your experience privately. Currently, all such tabs are *static tabs*&mdash;content that is relevant to individual users.

## What you need to know: Configurable tabs

A *configurable tab* becomes part of a channel and provides a single kind of information to a team. For example, the Planner tab for a channel contains a single plan; the Power BI tab maps to a specific report. Users can drill down to the relevant context, but they should not be able to navigate outside the tab. The Power BI tab, for instance, doesn't enable navigation to other Power BI reports&mdash;but it does enable the **Go to website** button that launches the report in the main Power BI website.

*  [Create the configuration page](~/concepts/tabs/tabs-configuration): For configurable tabs, you must provide a configuration page to present options and gather information so users can customize the content and experience with your tab. This iframe'd HTML page is displayed when a user first adds the tab to a channel.
	*  You can also [enable users to update a tab](~/concepts/tabs/tabs-update-remove#updating-an-existing-tab-instance) after they add it.
*  [Create the content page](~/concepts/tabs/tabs-dynamic): A content page is an HTML page that you host. Microsoft Teams displays the page in an iframe when the user visits your tab.
	* You can also provide a page for users to specify [what happens to content when they remove a tab](~/concepts/tabs/tabs-update-remove#removing-a-tab).
	* You can enable users to create and share [deep links to items within your tab](~/concepts/deep-links), such as a link to an individual task within a tab that contains a task list.

## What you need to know: Static tabs

A *static tab* supports an individual user. For example, if your service is a notetaking app, add a tab that holds personal notes. That way, a user can refer to his or her own notes without having to share them with an entire team.

*  [Declare your static tab identity](~/concepts/tabs/tabs-static): Static tabs are declared directly in the manifest of your app package.
*  [Create the content page](~/concepts/tabs/tabs-dynamic): Microsoft Teams displays the page in an iframe when the user visits your tab. Content in a static tab is subject to the same constraints as a configurable tab.
