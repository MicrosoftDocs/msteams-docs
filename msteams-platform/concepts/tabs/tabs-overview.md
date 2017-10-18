---
title: Get started with tabs
description: Describes how to get started with tabs in Microsoft Teams
keywords: get started tabs teams
---

# Get started with tabs for Microsoft Teams

Tabs in Microsoft Teams allow you to display rich interactive web content. You can build a Microsoft Teams tab from scratch or adapt your existing web-app experience.

Microsoft Teams supports tabs in two scopes:

* **Team scope**&emsp;Tabs in channels allow teams to interact with your shared experience. Currently, all tabs in channels are *configurable tabs*&mdash;a user configures the content of your tab experience when the tab is first added to a channel.
* **Personal scope**&emsp;Personal tabs allow users to interact with your experience privately. Currently, all personal tabs are *static tabs*&mdash;content that is relevant to individual users.

## Build a configurable tab

*  [Create the configuration page](~/concepts/tabs/tabs-configuration): For configurable tabs, you must provide a configuration page to present options and gather information so users can customize the content and experience with your tab. This iframe'd HTML page is displayed when a user first adds the tab to a channel.
	*  You can also [enable users to update a tab](~/concepts/tabs/tabs-update-remove#updating-an-existing-tab-instance) after they add it.
*  [Create the content page](~/concepts/tabs/tabs-dynamic): A content page is an HTML page that you host. Microsoft Teams displays the page in an iframe when the user visits your tab.
	* You can also provide a page for users to specify [what happens to content when they remove a tab](~/concepts/tabs/tabs-update-remove#removing-a-tab).
	* You can enable users to create and share [deep links to items within your tab](~/concepts/deep-links), such as a link to an individual task within a tab that contains a task list.

## Build a static tab

*  [Declare your static tab identity](~/concepts/tabs/tabs-static): Static tabs are declared directly in your app package's manifest.
*  [Create the content page](~/concepts/tabs/tabs-dynamic): Microsoft Teams displays the page in an iframe when the user visits your tab. Content in a static tab is subject to the same constraints as a configurable tab.
