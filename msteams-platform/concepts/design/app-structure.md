---
title: Design your app - Understand the app structure
description: In this module, learn what you can and can't customize in Microsoft Teams when designing your app structure.
author: heath-hamilton
ms.topic: conceptual
ms.localizationpriority: medium
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

### Mobile

The canvas is a webview so you can completely customize the experience.

:::image type="content" source="../../assets/images/design-guidelines/app-structure-personal-apps-mobile.png" alt-text="Conceptual image showing the front-end areas in Teams that developers can customize for personal apps on mobile.":::

### Desktop

The canvas is an iframe so you can completely customize the experience.

:::image type="content" source="../../assets/images/design-guidelines/app-structure-personal-apps-desktop.png" alt-text="Conceptual image showing the front-end areas in Teams that developers can customize for personal apps on desktop.":::

## Tabs

Tabs provide a large canvas to host your app content for a group of users. You can include tabs in shared spaces such as channels, chats, and meeting invites.

***Supported scopes**: Channels, Chats, Meetings*

### Mobile

The canvas is a webview so you can completely customize the experience.

:::image type="content" source="../../assets/images/design-guidelines/app-structure-tabs-mobile.png" alt-text="Conceptual image showing the front-end areas in Teams that developers can customize for tabs on mobile.":::

### Desktop

The canvas is an iframe so you can completely customize the experience.

:::image type="content" source="../../assets/images/design-guidelines/app-structure-tabs-desktop.png" alt-text="Conceptual image showing the front-end areas in Teams that developers can customize for tabs on desktop.":::

## Bots

Bots are conversational apps that integrate with Teams native messaging features, so the UI work is handled for you. From a design standpoint, there are still opportunities to add personality, custom functionality, and rich, actionable information with our natural language processing (NLP) support and Adaptive Cards platform.

***Supported scopes**: Personal, Channels, Chats, Meetings*

### Mobile

:::image type="content" source="../../assets/images/design-guidelines/app-structure-bots-mobile.png" alt-text="Conceptual image showing the front-end areas in Teams that developers can customize for bots on mobile.":::

### Desktop

:::image type="content" source="../../assets/images/design-guidelines/app-structure-bots-desktop.png" alt-text="Conceptual image showing the front-end areas in Teams that developers can customize for bots on desktop.":::

## Message extensions

Message extensions are shortcuts for inserting app content or acting on a message without navigating away from the conversation. Action-based message extensions give you more control of the experience, while Teams handles much of what renders for search-based message extensions.

***Supported scopes**: Personal, Channels, Chats, Meetings*

### Mobile

:::image type="content" source="../../assets/images/design-guidelines/app-structure-messaging-exetensions-mobile.png" alt-text="Conceptual image showing the front-end areas in Teams that developers can customize for message extensions on mobile.":::

### Desktop

:::image type="content" source="../../assets/images/design-guidelines/app-structure-messaging-exetensions-desktop.png" alt-text="Conceptual image showing the front-end areas in Teams that developers can customize for message extensions on desktop.":::

## Meeting extensions

Meeting extensions are apps to enhance live meetings. You can host your app content in several scenarios, including before, during, and after meetings.

***Supported scopes**: Meetings, Chats*

### Mobile

The surface is a webview, allowing you to customize the experience, but keep in mind that during meetings these apps use dark theme.

:::image type="content" source="../../assets/images/design-guidelines/app-structure-meeting-exetensions-mobile.png" alt-text="Conceptual image showing the front-end areas in Teams that developers can customize for meeting extensions on mobile.":::

### Desktop

The surface is an iframe, allowing you to customize the experience, but keep in mind that during meetings these apps use dark theme and are narrow.

:::image type="content" source="../../assets/images/design-guidelines/app-structure-meeting-exetensions-desktop.png" alt-text="Conceptual image showing the front-end areas in Teams that developers can customize for meeting extensions on desktop.":::
