---
title: What are custom tabs in Microsoft Teams?
author: laujan
description: An overview of custom tabs on the Microsoft Teams platform
ms.topic: overview
ms.author: v-laujan
ms.topic: overview
---
# What are Microsoft Teams custom tabs?

Tabs are Teams-aware iFramed webpages that you host and are embedded in Microsoft Teams. The tab experience can be added as part of a [channel or group chat](~/foo.md) inside a Team or as a [personal app](~/foo.md) for an individual user. As part of your app, you can add custom tabs, using our [Teams JavaScript client SDK](/javascript/api/overview/msteams-client), that embed your own web content in Teams and add Teams-specific functionality.

There are two types of tabs available in Teams - channel/group and personal. A channel/group tab delivers content to channels and group chats, and are a great way to create collaborative spaces around web-based content. Personal tabs, along with direct conversation bots, are part of personal apps and are scoped to a single user. They can be pinned to the left navigation bar and promote increas productivity by making your service available directly inside the Teams client.

## Tabs user scenarios

**Scenario:** Make an existing web-based resource available inside Teams.
**Example:** You create a personal tab in your Teams app that presents an informational corporate website to users.


**Scenario:** Add static support pages to a Teams bot or messaging extension.
**Example:** You create personal tabs that provide about and help webpage content to users.

**Scenario:** Provide accessibility to system-level items upon which your users regularly collaborate and confer.
**Example:** You create a configurable channel/group tab with deep linking to individual items.

## How do tabs work?

Teams development and integration (custom tabs, messaging extensions, or bots) need to be bundled in a [Teams app package](foo.md) for distribution either in the Teams App Store ([AppSource](https://appsource.microsoft.com), to your organization, or within a team. A custom tab is declared directly in the manifest of your app package. Your app can have a maximum of one (1) channel/group tab and up to sixteen (16) personal tabs

Your tab content pages, must meet required specifications:

-  Many standard websites block their pages from loading in an iFrame, therefore, Teams provides a unique webview option for users to view embedded content within the desktop client. 

 >Allow for a nested browsing context by Teams in an HTML inline frame (iFrame) via X-Frame-Options and/or Content-Security-Policy HTTP response headers.
* Manage [authentication](foo.md) in a method other than redirect (e.g., token-based or cookie-based authentication). Typically, as a safeguard against click-jacking, login pages do not render in IFrames. 
* Control [cross-domain](foo.md) navigation differently since the Teams client needs to validate the origin against a static validDomains list in the app manifest when loading or communicating with the tab.
* Style themselves based on the Teams client's theme.
* On page load, call `microsoftTeams.initialize()` from the [Teams client SDK](/javascript/api/overview/msteams-client), which gives Teams a communication channel with the hosted page and more visibility into its operations.

## Tabs on mobile clients

Teams is xPlat, your app needs to as be as well.

contentUrl vs websiteUrl.

## Get Started

Ready to get started building? Here are a few guidelines:

* [Design effective tabs](~/foo.md)
* [QuickStart/staticTabs/foo.md](https://quickstart/statictabs)
* [QuickStart/configurableTabs/foo.md](https://quickstart/configurabletabs)

## Learn more

Learn more about how tabs function with other Teams app capabilities:

* [Create a configuration page](~/foo.md)
* [Create a group or channel tab](~/foo.md)
* [Create personal tab](~/foo.md)
* [Authentication in tabs](~/foo.md)
* foo.md
