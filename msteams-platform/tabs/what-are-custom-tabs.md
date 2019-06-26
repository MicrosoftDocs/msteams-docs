---
title: What are custom tabs in Microsoft Teams?
author: laujan
description: An overview of custom tabs on the Microsoft Teams platform
ms.topic: overview
ms.author: v-laujan
ms.topic: overview
---
# What are Microsoft Teams custom tabs?

Tabs are Teams-aware webpages embedded in Microsoft Teams. They can be added as part of a channel or a group chat inside a team or as a personal app for an individual user. As part of your app you can add custom tabs to embed your own web content in Teams, and using the [Teams JavaScript client SDK](/javascript/api/overview/msteams-client) add Teams-specific functionality to your web content.

There are two types of tabs available in Teams - channel/group and personal. A channel/group tab delivers content to channels and group chats, and are a great way to create collaborative spaces around dedicated web-based content. Personal tabs, along with direct conversation bots, are part of personal apps and are scoped to a single user. They can be pinned to the left navigation bar and promote increased productivity by making your service available directly inside the Teams client.

## Tabs user scenarios

**Scenario:** Bring an existing web-based resource inside Teams. \
**Example:** You create a personal tab in your Teams app that presents an informational corporate website to users.

**Scenario:** Add support pages to a Teams bot or messaging extension. \
**Example:** You create personal tabs that provide about and help webpage content to users.

**Scenario:** Provide access to items that your users interact with regularly for cooperative dialogue and collaboration. \
**Example:** You create a channel/group tab with deep linking to individual items.

## How do tabs work?

A custom tab is declared directly in the app manifest of your app package. For each webpage you want included as a custom tab in your app you define a URL and a scope. Additionally, you need to add the [Teams JavaScript client SDK](/javascript/api/overview/msteams-client) to your page, and call `microsoftTeams.initialize()` after your page loads. Doing so will tell Teams to display your page, give you access to Teams-specific information (for example if the Teams client is running the Dark Theme), and allow you to take action based on the results.

For channel/group tabs, you also need to create an additional configuration page that allows your users to configure your page (typically by URL query string parameters). This is because your channel/group tab can be added multiple different teams or group chats. On each subsequent install, your users will be able to configure the tab allowing you to tailor the experience as needed. For example, when you add the Azure DevOps board tab the configuration page allows you to choose which board the tab will load.

Your app can have a maximum of one (1) channel/group tab and up to sixteen (16) personal tabs.

## Tab content requirements

&#x2705; You must allow your pages to be served in an iframe, via X-Frame-Options and/or Content-Security-Policy HTTP response headers.

* Many standard websites block their pages from loading in an iframe. However, Teams provides a unique webview option for users to view embedded content within the desktop client.

&#x2705; Your [authentication](foo.md) logic must use a method other than redirect (e.g., use token-based or cookie-based authentication).

* Typically, as a safeguard against click-jacking, login pages don't render in iframes.

&#x2705; Your [cross-domain](foo.md) navigation logic should allow the Teams client to validate the origin against a static validDomains list in the app manifest when loading or communicating with the tab.

* Browsers adhere to a same-origin policy restriction that prevents a webpage from making requests to a different domain than the one that served a web page. However, you may need to redirect the configuration or content page to a another domain or subdomain.

&#x2705; Style your tabs based on the Teams client's theme, design, and intent (see [Content and conversations, all at once using tabs](foo.md)).

* Tabs work best when they're built to address a specific needs and focus on a small set of tasks or a subset of data that is relevant to the tab's channel location.

&#x2705; Following your page load, make a call to `microsoftTeams.initialize()` in the [Teams client SDK](/javascript/api/overview/msteams-client).

* Your script must include the `microsoftTeams.initialize()` method call for your page to be displayed.

## Mobile considerations for tabs

foo.md => insert mobile words here.

## Get Started

Ready to get started building? Here are a few guidelines:

* [QuickStart/staticTabs/foo.md](https://quickstart/statictabs)
* [QuickStart/configurableTabs/foo.md](https://quickstart/configurabletabs)

## Learn more

Learn more about how tabs function with other Teams app capabilities:

* [Design effective tabs](~/foo.md)
* [Create a configuration page](~/foo.md)
* [Create a group or channel tab](~/foo.md)
* [Create personal tab](~/foo.md)
* [Authentication in tabs](~/foo.md)
* foo.md
