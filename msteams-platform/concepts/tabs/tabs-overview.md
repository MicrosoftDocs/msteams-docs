---
title: Add tabs to Microsoft Teams apps
description: Describes how to get started developing tabs in Microsoft Teams
keywords: teams tabs development
ms.date: 04/04/2018
---
# Add tabs to Microsoft Teams apps

Tabs in Microsoft Teams allow you to display rich interactive web content. You can build a Microsoft Teams tab from scratch or adapt your existing web-app experience.

![Example of a tab showing data, alongside a conversation about the tab data](~/assets/images/tab_example.png)

## Teams scopes for tabs

Teams support several scopes for tabs:

* Teams (`team` scope) - (channel) Tabs in channels allow teams to interact with your shared experience. Currently, all tabs in channels are *configurable tabs*&mdash;a user configures the content of your tab experience when the tab is first added to a channel.
* Personal (`personal` scope) - Tabs in the personal scope allow users to interact with your experience privately. Currently, all such tabs are *static tabs*&mdash;content that is relevant to individual users.

## What you need to know: Configurable tabs

A *configurable tab* becomes part of a channel and provides a single kind of information to a team. For example, the Planner tab for a channel contains a single plan; the Power BI tab maps to a specific report. Users can drill down to the relevant context, but they should not be able to navigate outside the tab. The Power BI tab, for instance, doesn't enable navigation to other Power BI reports&mdash;but it does enable the **Go to website** button that launches the report in the main Power BI website.

* [Create the configuration page](~/concepts/tabs/tabs-configuration): For configurable tabs, you must provide a configuration page to present options and gather information so users can customize the content and experience with your tab. This iframed HTML page is displayed when a user first adds the tab to a channel.
  * You can also enable users to [update or remove a tab](~/concepts/tabs/tabs-update-remove) after they add it.
* [Create the content page](~/concepts/tabs/tabs-content): A content page is an HTML page that you host. Microsoft Teams displays the page in an iframe when the user visits your tab.
  * You can also provide a page for users to specify [what happens to content when they remove a tab](~/concepts/tabs/tabs-update-remove#removing-a-tab).
  * You can enable users to create and share [deep links to items within your tab](~/concepts/deep-links), such as a link to an individual task within a tab that contains a task list.

## What you need to know: Static tabs

A *static tab* supports an individual user. For example, if your service is a notetaking app, add a tab that holds a user's personal notes. That way, a user can refer to his or her own notes without having to share them with the entire team.

* [Declare your static tab identity](~/concepts/tabs/tabs-static): Static tabs are declared directly in the manifest of your app package.
* [Create the content page](~/concepts/tabs/tabs-content): Microsoft Teams displays the page in an iframe when the user visits your tab. Content in a static tab is subject to the same constraints as a configurable tab.

## How do tabs in Teams differ from a browser viewing the same content URL?

Tabs display web pages, but not all web pages can display properly in a tab.

Pages loaded inside of a custom tab need to:

* Allow themselves to be [iframed](~/concepts/tabs/tabs-content) by Teams (via the X-Frame-Options and/or Content-Security-Policy headers). A lot of standard webpages don't allow themselves to be iframed which is why there is the option for users to view Website tab instances inside of a webview within the desktop client. Other tabs don't get this special treatment.
* Handle [authentication](~/concepts/authentication/auth-flow-tab) differently (either via a popup or calling us to fetch tokens). Most websites simply redirect to a login provider which typically dead ends tabs which are hosted inside of an iframe. That's because login pages typically don't render in iframes to prevent click-jacking.
* Handle [cross-domain](~/concepts/tabs/cross-domain) navigation differently since the Teams client needs to validate the origin against a static validDomains list in the app manifest when loading or communicating with the tab.
* Style themselves based on the Teams client's [theme](~/resources/design/components/themes).
* Make calls to the [Teams client SDK](https://docs.microsoft.com/en-us/javascript/api/overview/msteams-client) (microsoftTeams.initialize()) which gives Teams a communication channel with the hosted page and more visibility into its operations.

For more details see [Requirements for tab pages in Microsoft Teams](~/resources/general/requirements).