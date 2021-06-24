---
title: Design your app - Understand the app structure
description: Understand what you can and can't customize in Microsoft Teams when designing your app.
author: heath-hamilton
ms.topic: conceptual
localization_priority: Normal
ms.author: surbhigupta
--- 
# Understand the Microsoft Teams app structure

When building your app, it's important to know what you can and can't customize in Microsoft Teams. This information can help you better understand which parts of the app experience you control.

The following wireframes show you:

* The surfaces you can customize in each Teams app capability (outlined in pink).
* The scopes each capability supports.

> [!TIP]
> **What does scope mean?** A scope is an area in Teams where people can use your app. Apps can have one or many scopes, including personal, channels, chats, and meetings.

## Personal apps

Personal apps provide a large canvas to host your app content for individual users.

***Supported scopes**: Personal*

# [Desktop](#tab/desktop)

The canvas is an iframe so you can completely customize the experience.

:::image type="content" source="../../assets/images/design-guidelines/app-structure-personal-apps-desktop.png" alt-text="Conceptual image showing the front-end areas in Teams that developers can customize for personal apps on desktop." border="false":::

# [Mobile](#tab/mobile)

The canvas is a webview so you can completely customize the experience.

:::image type="content" source="../../assets/images/design-guidelines/app-structure-personal-apps-mobile.png" alt-text="Conceptual image showing the front-end areas in Teams that developers can customize for personal apps on mobile." border="false":::

---

## Tabs

Tabs provide a large canvas to host your app content for a group of users. You can include tabs in shared spaces such as channels, chats, and meeting invites.

***Supported scopes**: Channels, Chats, Meetings*

# [Desktop](#tab/desktop)

The canvas is an iframe so you can completely customize the experience.

:::image type="content" source="../../assets/images/design-guidelines/app-structure-tabs.png" alt-text="Conceptual image showing the front-end areas in Teams that developers can customize for tabs." border="false":::

# [Mobile](#tab/mobile)

The canvas is a webview so you can completely customize the experience.

:::image type="content" source="../../assets/images/design-guidelines/app-structure-tabs-mobile.png" alt-text="Conceptual image showing the front-end areas in Teams that developers can customize for tabs." border="false":::

---

## Bots

Bots are conversational apps that integrate with Teams native messaging features, so the UI work is handled for you. From a design standpoint, there are still opportunities to add personality, custom functionality, and rich, actionable information with our natural language processing (NLP) support and Adaptive Cards platform.

***Supported scopes**: Personal, Channels, Chats, Meetings*

:::image type="content" source="../../assets/images/design-guidelines/app-structure-bots.png" alt-text="Conceptual image showing the front-end areas in Teams that developers can customize for bots." border="false":::

## Messaging extensions

Messaging extensions are shortcuts for inserting app content or acting on a message without navigating away from the conversation. Action-based messaging extensions give you more control of the experience, while Teams handles much of what renders for search-based messaging extensions.

***Supported scopes**: Personal, Channels, Chats, Meetings*

:::image type="content" source="../../assets/images/design-guidelines/app-structure-messaging-exetensions.png" alt-text="Conceptual image showing the front-end areas in Teams that developers can customize for messaging extensions." border="false":::

## Meeting extensions

Meeting extensions are apps to enhance live meetings. You can host your app content in several scenarios, including before, during, and after meetings. The surface is an iframe, allowing you to customize the experience, but keep in mind that these apps are dark themed and narrow during meetings.

***Supported scopes**: Meetings, Chats*

:::image type="content" source="../../assets/images/design-guidelines/app-structure-meeting-exetensions.png" alt-text="Conceptual image showing the front-end areas in Teams that developers can customize for meeting extensions." border="false":::
