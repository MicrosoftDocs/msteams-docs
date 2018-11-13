---
title: Add tabs to Microsoft Teams apps
description: Describes how to get started developing tabs in Microsoft Teams
keywords: teams tabs development
ms.date: 11/12/2018
---
# Add tabs to Microsoft Teams apps

Tabs in Microsoft Teams allow you to display rich interactive web content. You can build a Microsoft Teams tab from scratch or adapt your existing web-app experience.

![Example of a tab showing data, alongside a conversation about the tab data](~/assets/images/tab_example.png)

There are two types of tabs in Teams.

* [*Static tabs*](~/concepts/tabs/tabs-static) support an individual user. For example, if your service is a notetaking app, add a tab that holds a user's personal notes. That way, a user can refer to his or her own notes without having to share them with the entire team.
* [*Configurable tabs*](~/concepts/tabs/tabs-configurable) A configurable tab becomes part of a channel and provides a single kind of information to a team. Configurable tabs have a configuration page in addition to a content page.

## Tab scope

Teams determines where a tab can be used based on it's *scope*. Scope is set in the app manifest, and can be one of these values:

* Teams (`team` scope) - Tabs in channels allow teams to interact with your shared experience. Currently, all tabs in channels are *configurable tabs*&mdash;a user configures the content of your tab experience when the tab is first added to a channel.
* Group chat (`groupchat` scope) - configurable tabs can also be used in group chats. These are conversations between several users in a team.
* Personal (`personal` scope) - Tabs in the personal scope allow users to interact with your experience privately. Currently, all such tabs are *static tabs*&mdash;content that is relevant to individual users.

## How do tabs in Teams differ from a browser viewing the same content URL?

Tabs display web pages, but not all web pages can display properly in a tab.

Pages loaded inside of a custom tab need to:

* Allow themselves to be [iframed](~/concepts/tabs/tabs-content) by Teams (via the X-Frame-Options and/or Content-Security-Policy headers). A lot of standard webpages don't allow themselves to be iframed which is why there is the option for users to view Website tab instances inside of a webview within the desktop client. Other tabs don't get this special treatment.
* Handle [authentication](~/concepts/authentication/auth-flow-tab) differently (either via a popup or calling us to fetch tokens). Most websites simply redirect to a login provider which typically dead ends tabs which are hosted inside of an iframe. That's because login pages typically don't render in iframes to prevent click-jacking.
* Handle [cross-domain](~/concepts/tabs/cross-domain) navigation differently since the Teams client needs to validate the origin against a static validDomains list in the app manifest when loading or communicating with the tab.
* Style themselves based on the Teams client's [theme](~/resources/design/components/themes).
* Make calls to the [Teams client SDK](https://docs.microsoft.com/en-us/javascript/api/overview/msteams-client) (microsoftTeams.initialize()) which gives Teams a communication channel with the hosted page and more visibility into its operations.

For more details see [Requirements for tab pages in Microsoft Teams](~/resources/general/requirements).

## Troubleshooting tabs

See the [Troubleshooting Tabs](~/troubleshoot/troubleshoot#troubleshooting-tabs) topic for more information.