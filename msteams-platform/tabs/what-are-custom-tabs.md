---
title: What are custom tabs in Microsoft Teams?
author: laujan
description: An overview of custom tabs on the Microsoft Teams platform
ms.topic: overview
ms.author: v-laujan
ms.topic: overview
---
# What are Microsoft Teams custom tabs?

Tabs are hosted Teams-aware IFrame webpages embedded in Microsoft Teams. The dedicated tab experience can be added as part of a [channel or group chat](~/foo.md) inside a Team or as a [personal app](~/foo.md) for an individual user. As part of your app, you can add custom tabs, using our [Teams JavaScript client SDK](/javascript/api/overview/msteams-client), to embed your own web content in Teams and add Teams-specific functionality.

There are two types of tabs available in Teams - channel/group and personal. A channel/group tab delivers content to channels and group chats, and are a great way to create collaborative spaces around dedicated web-based content. Personal tabs, along with direct conversation bots, are part of personal apps and are scoped to a single user. They can be pinned to the left navigation bar and promote increased productivity by making your service available directly inside the Teams client.

## Tabs user scenarios

**Scenario:** Bring an existing web-based resource inside Teams. \
**Example:** You create a personal tab in your Teams app that presents an informational corporate website to users.

**Scenario:** Add support pages to a Teams bot or messaging extension. \
**Example:** You create personal tabs that provide about and help webpage content to users.

**Scenario:** Provide access to items your users access regularly for cooperative dialogue and collaboration. \
**Example:** You create a channel/group tab with deep linking to individual items.

## How do tabs work?

All Teams customization (custom tabs, messaging extensions, or bots) needs to be bundled in a [Teams app package](foo.md) for distribution either in the Teams App Store ([AppSource](https://appsource.microsoft.com)), to your organization, or within a team. A custom tab is declared directly in the manifest of your app package. Your app can have a maximum of one (1) channel/group tab and up to sixteen (16) personal tabs

## Tab content requirements

&#x2705; You must allow your pages to be served in a nested browsing context by Teams in an HTML inline frame (IFrame) via X-Frame-Options and/or Content-Security-Policy HTTP response headers.
<br><br>Many standard websites block their pages from loading in an IFrame. However, Teams provides a unique webview option for users to view embedded content within the desktop client.

&#x2705; Your [authentication](foo.md) logic must leverage a method other than redirect (e.g., use token-based or cookie-based authentication).
<br><br>Typically, as a safeguard against click-jacking, login pages don't render in IFrames.

&#x2705; Your [cross-domain](foo.md) navigation logic should utilize methods that allow the Teams client to validate the origin against a static validDomains list in the app manifest when loading or communicating with the tab.
<br><br>Browsers adhere to a same-origin policy restriction that prevents a webpage from making requests to a different domain than the one that served a web page. However, you may need to redirect the configuration or content page to a another domain or subdomain.

&#x2705; Style your tabs based on the Teams client's theme, design, and intent (see [Content and conversations, all at once using tabs](foo.md)).
<br><br>Tabs work best when they're built to address a specific need and focus on a small set of tasks or a subset of data that is relevant to the tab's channel location.

&#x2705; Following your page load, make a call to `microsoftTeams.initialize()` in the [Teams client SDK](/javascript/api/overview/msteams-client).
<br><br>Your script must include the microsoftTeams.initialize() method call for your page to be displayed.

## Tabs across platforms and environments

The Teams application is cross-platform and your tab should also operate across platforms and operating environments. Microsoft's [Fluent Design System](foo.md) provides principled design guidelines, patterns, and tools for devices and interactions across multiple technologies.

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
