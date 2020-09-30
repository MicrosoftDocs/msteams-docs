---
title: Designing your Microsoft Teams app overview
author: heath-hamilton
description: Overview on how to design a Microsoft Teams app.
ms.topic: conceptual
ms.author: lajanuar
---
# Designing your Microsoft Teams app

Designing Teams apps is like designing conventional web apps—but also a little different.

Use these guidelines to help you quickly make the right design decisions for your app.

> [!NOTE]
> These guidelines are primarily for designing desktop apps.

## Before you begin

You can't design a high-quality Teams app without a fundamental understanding of what the app will do and how you think people will use it. Before opening you start your mockups, make sure you've properly [planned your app](../concepts/extensibility-points.md).

## Design principles

A well-designed Teams app has the following characteristics:

* Promotes collaboration
* Focuses only on core activities and scenarios
* Appears either native to Teams or completely distinct (not a blend of color schemes, styles, and controls)
* Easy to use
* Inclusive of all backgrounds and abilities
* Accessible
* Has a clear purpose (through expressive app icons and usable documentation)

## Creating a cohesive look and feel

Apps extend Teams features and functionality using one or more platform [capabilities](../concepts/capabilities-overview.md). Your app presents these capabilities (whether it's a tab, messaging extension, bot, or webhook) with UI components and patterns that make sense within Teams.

While you have flexibility, designing your app effectively requires knowing what UI works for certain capabilities (and what doesn't). For example, while multi-level navigation is fine for websites, it isn't ideal for a Teams tab because the app probably isn't focusing on just core activities and scenarios.

Your design also must thread components together in a way that feels natural not only to your use cases but with regular Teams workflows. (This is especially true if your app has more than one capability, like a bot replying with a link to a tab with a form to fill out.)

### Tabs

Tabs are canvases for web-based content. Unlike a standard web app or website, they work best when displaying a limited set of content and tasks. [See tab design guidelines](../designing-your-app/designing-tabs.md)

### Messaging extensions

Messaging extensions are shortcuts for sharing content or taking action within a conversation (for example, creating a help desk ticket using the text in a chat reply). Either way, messaging extensions typically use content-rich cards that can include a search form, complex task, GIF, or simple links. [See messaging extension design guidelines](../designing-your-app/designing-messaging-extensions.md)

## Meeting extensions

Meeting extensions ...

### Bots

Bots are conversational interfaces that perform a narrow set of tasks proactively or in response to a message. [See bot design guidelines](../designing-your-app/designing-bots.md)

### Webhooks and connectors

Webhooks and connectors send notifications and alerts to team channels and chats (typically with cards). [See webhooks and connectors design guidelines](../designing-your-app/designing-connectors.md)

### Components

In most cases, each capability in your Teams app needs a UI. Teams design components, based on the [Fluent UI Design System](https://fluentsite.z22.web.core.windows.net/), make your app feel familiar within the platform.

For example, [*cards*](../designing-your-app/designing-cards.md) can display rich content for messaging extensions, bots, and incoming webhooks. A [*task module*](../designing-your-app/designing-task-modules.md), another common Teams component, is essentially a card with user inputs (such as a form).

## Resources

* Microsoft Teams Design Style Guide (NEED LINK)
* [Adaptive Card designer](https://adaptivecards.io/designer)
* [Fluent UI Design System](https://fluentsite.z22.web.core.windows.net/)
