---
title: What are custom tabs in Microsoft Teams?
author: laujan
description: An overview of custom tabs on the Microsoft Teams platform
ms.topic: overview
ms.author: v-laujan
ms.topic: overview
---
# What are custom tabs in Microsoft Teams?

Tabs are Teams-aware web experiences embedded in Microsoft Teams. They can be added as part of a channel inside a Team, a group chat, or part of a [personal app](~/foo.md) for an individual user. As part of your app, you can build custom tabs that embed your own web content in Teams, and add Teams-specific functionality using our Teams client SDK.

There are two types of tabs available in Teams - group/channel and personal. A group/channel tab delivers content to group chats and channels, and are a great way to create collaboration spaces around web-based content. Personal tabs, along with one-to-one bots, are part of personal apps and are scoped to a single user. They can be pinned to the left navigation bar and are very good at increasing productivity by making your service available directly inside the Teams client.

## Tabs user scenarios

**Scenario:** Make an existing web-based resource available inside Microsoft Teams.
**Example:** You have an informational corporate website you make available as a personal tab in Teams.

**Scenario:** You want to add an about or help page for your bot or messaging extension.
**Example:** You have a static webpage that you make available as a personal tab in Teams.

**Scenario:** You have items in a system that your users need to discuss or collaborate around regularly.
**Example:** You create a group/channel tab that is configurable with deep linking to individual items.

## How do tabs work?

All Teams development (custom tabs, messaging extensions, or bots) needs to be bundled in a [Teams app package](foo.md) for distribution either in the Teams App Store (AppSource), to your organization or within a team. A custom tab is declared directly in the manifest of your app package. Your app can have a maximum of one (1) group/channel tab and up to sixteen (16) personal tabs

At their core, tabs are iFramed websites you host that can contain Teams-aware functionality through the use of our [Teams client SDK](/javascript/api/overview/msteams-client). Pages loaded inside of a custom tab need to:

* Allow themselves to be iFramed by Teams (via the X-Frame-Options and/or Content-Security-Policy headers). A lot of standard webpages don't allow themselves to be iFramed which is why there is the option for users to view Website tab instances inside of a webview within the desktop client. Other tabs don't get this special treatment.
* Handle [authentication](foo.md) differently (either via a popup or calling us to fetch tokens). Most websites simply redirect to a login provider which typically dead ends tabs which are hosted inside of an iframe. That's because login pages typically don't render in iFrames to prevent click-jacking.
* Handle [cross-domain](foo.md) navigation differently since the Teams client needs to validate the origin against a static validDomains list in the app manifest when loading or communicating with the tab.
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
