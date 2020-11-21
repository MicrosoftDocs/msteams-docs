---
title: Introducing app design guidelines
author: heath-hamilton
description: Learn about the Microsoft Teams app design guidelines, which include best practices, UI kits, and other design resources.
ms.author: lajanuar
ms.topic: conceptual
---
# Design guidelines for Microsoft Teams apps

Designing a Teams app is like designing a conventional web app—but also a little different.

Use these guidelines to help you quickly make the right design decisions for your app.

<!-- [INSERT CONCEPTUAL DESIGN HERO IMAGE]  -->

> [!NOTE]
> Unless specified, these guidelines are primarily for the desktop or web version of Teams.

## Before you begin

You can't design a high-quality Teams app without a fundamental understanding of what the app will do and how you think people will use it. Before opening you start your mockups, make sure you've properly [planned your app](../concepts/extensibility-points.md).

## Design principles

A well-designed Teams app has the following characteristics.
<!-- Update design principles once approved. -->
### Promotes collaboration

* Focuses only on core activities and scenarios
* Appears either native to Teams or completely distinct (not a blend of color schemes, styles, and controls)
* Easy to use
* Inclusive of all backgrounds and abilities
* Accessible
* Has a clear purpose (through expressive app icons and usable documentation)

## Get started with the Microsoft Teams UI Design Kit

The Microsoft Teams UI Design Kit helps you create high-fidelity mockups of your app without writing any code.
<!-- Need link in Step 1. -->
1. Duplicate the design kit from the Figma Community.
1. Drag and drop components from the design kit to your file.
1. Modify the components as needed for your app.

## Creating a cohesive look and feel

Apps extend Teams features and functionality using one or more platform [capabilities](../concepts/capabilities-overview.md). Your app presents these capabilities (whether it's a tab, messaging extension, bot, or webhook) with UI components and patterns that make sense within Teams.

While you have flexibility, designing your app effectively requires knowing what UI works for certain capabilities (and what doesn't). For example, while multi-level navigation is fine for websites, it isn't ideal for a Teams tab because the app probably isn't focusing on just core activities and scenarios.

Your design also must thread components together in a way that feels natural not only to your use cases but with regular Teams workflows. (This is especially true if your app has more than one capability, like a bot replying with a link to a tab with a form to fill out.)

## Design fundamentals

xxx

## Basic UI components

xxx

## App capabilities

xxx

## UI templates

In most cases, each capability in your Teams app needs a UI. Teams design components, based on the [Fluent UI Design System](https://fluentsite.z22.web.core.windows.net/), make your app feel familiar within the platform.

## Designing Power Platform apps for Teams

See the [Power Platform documentation](https://docs.microsoft.com/power-platform/) for low-code app design guidelines.

## Resources
<!-- Need link to Figma style guide. -->
* [Microsoft Teams UI Design Kit](www.example.com)
* [Fluent Design System](https://fluentsite.z22.web.core.windows.net/)
* [Adaptive Card designer](https://adaptivecards.io/designer)
