---
title: Apps overview
description: Describes how to get started with apps in Microsoft Teams
keywords: teams activity feed
---

# Overview of apps in Microsoft Teams: Tabs, bots, and more

Each app in Microsoft Teams can offer multiple capabilities, including tabs, bots, compose extensions, and Office 365 Connectors. 

## Scopes in Microsoft Teams

By creating apps in Microsoft Teams, you can make your service available to users in the contexts&mdash;or "scopes"&mdash;that make the most sense.

* You can use most app capabilities (such as bots and tabs) in most scopes. 

* You offer these capabilities via a single Teams app package that users can acquire through our in-product app gallery, via the Office Store, or sideloaded directly by your team.

* You declare precisely which capabilities you support, in which scopes, via your app package's [manifest file](~/reference/schema/manifest-schema).

### App bar (personal scope)

>New feature

The app bar is the area on the left side of Microsoft Teams where the user's activity feed, chat, teams, meetings, and files buttons live. We designed the app bar to serve as a central container giving users quick access to the features that they use the most.

![Microsoft Teams apps bar](~/assets/images/appbar_apps_flyout.png)

Users can access personal experiences from your app via the app bar, such as holding personal conversations with your app's bot or interacting with personal data in a tab.

<!-- TODO screenshot of personal UIs bot and tab  -->

### Interacting in channels (team scope)

Users can access team experiences from your app in a channel, such as @mentioning your app's bot, configuring notifications via a Connector, or interacting with team data in a tab.  

<!-- TODO screenshot of team UIs, bot and tab -->

## Building your app

Ready to get started adding your experience into Teams? Follow these steps:

### Build your app's rich capabilities

* [Set up for development](~/get-started/get-started)
* [Design your app](~/get-started/design)
* [Code](~/get-started/code) your app's capabilities
  * [Tabs](~/concepts/tabs/tabs-overview)
  * [Bots](~/concepts/bots/bots-overview)
  * [Connectors](~/concepts/connectors)
  * [Compose extensions](~/concepts/compose-extensions)
  * [Activity feed integrations](~/concepts/activity-feed)

### Package and test your app within Teams

* [Create package](~/publishing/apps-package)
* [Sideload](~/concepts/apps-sideload) in Teams
* [Test functionality](~reference/general/debug)

### Publish your app and drive engagement

* [Register and publish](~/publishing/apps-publish) to Office Store
* [Embed deep links](~/concepts/deep-links)~ on your website
