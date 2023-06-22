---
title: Loop components User Experience (UX) guidelines
description: In this article, learn User Experience (UX) guidelines to build an Adaptive Card based Loop component with the right styling.
ms.author: mobajemu
ms.date: 06/15/2023
ms.topic: tutorial
ms.custom: m365apps
ms.localizationpriority: medium
---

# Loop component developer user experience guidelines

## Overview

Microsoft Loop components are live, actionable units of productivity that stay in sync and move freely across Microsoft 365 apps. It includes the capability for developers to create Loop components by evolving an existing Adaptive Card into a Loop component or creating a new Adaptive Card-based Loop component.

## Loop components are live, embedded, actionable, and portable.
|Property|Function|
|---|---|
|Live| The latest information is populated in the card. If there are multiple instances, they remain in sync as updates are made. |
|Embedded |  I Cards can be placed into documents and conversations that are separate from the rest of the content. |
| Actionable | Tasks can be completed inline. |
| Portable | Components can work across to Microsoft 365 app that supports Loop components |
 
**Live**: Your Adaptive Card should be self-updating when the card is loaded (such as when opening an email or chat) to reflect the latest information.

**Embedded**: By their nature, Adaptive Cards are embedded, so there is nothing specific needed from the developer.

**Actionable**: Loop components allow the user to take action to complete a flow within the component itself; beyond simply viewing information or opening a browser. If your Adaptive Card is a view-only experience, look for opportunities to make it actionable, as this is a core element of delighting users. It is OK to have a view-only Adaptive Card, but in that case, it should remain an Adaptive Card rather than become a Loop component.

> [!NOTE]
> Certain user permissions or modes of your component may not be actionable, but the common cases should be actionable.

Examples of actionability may include approving an expense report, adding a comment, updating a date, dollar amount, or other data, changing an assignment or status value, and the like. 

**Portable**: Adding the URL attribute as required in the developer guidance ensures that your component can be live-copied anywhere the Adaptive Card-based Loop component is supported.

## Loop component elements overview

An Adaptive Card-based Loop component comprises the Body, Header, and Border.

:::image type="content" source="images/loop-element-overview.png" alt-text="The screenshot graphic of highlighting the spacing on a card and which belongs to the header, border, and body ":::


|Loop Component Element | Developer Provides | Platform Provides|
|---|---|---|
|Body| Contents fully controlled by developer |Rendering and styling of controls based on developer code|
|Header | Icon and name | Elements and layout are standard and provided by platform |
|Border | n/a | Standard border for all Loop components|

## Loop component body

The Loop component body is what makes your component unique. Building a component that embodies the Loop component attributes and provides customer value allows you to give your users a positive experience and grow usage and retention.

The details of the component body will be determined by the specifics of your users’ needs and scenarios.

Some general guidelines:
* https://adaptivecards.io is the home for Adaptive Cards – start here for all Adaptive Card information
* Review Adaptive Cards Overview to understand the basics and core design principles of Adaptive Cards
* Follow the Adaptive Card Design Guidelines - this topic includes design tools, examples, notes about 
responsive design, pixel density, and more
Loop component-specific considerations:
* Ensure your component is true to the Loop components attributes: live, actionable, embedded and 
portable
* Don’t add a separate button to open in browser
* Don’t add a duplicate header or border

### Don’t add a separate button to open in browser

The Loop component header provides a standard way to open a browser-based view of the component based on your URL. Thus, there is no need to add a separate button to your component for actions like 
“View Details,” “Open on Web,” or the like.

Adding buttons or links for more specific views as needed is acceptable, for example, “View Related Items.” When possible, provide the needed information and interaction within the card itself.

### Don’t add a duplicate header or border

As described above, all Loop components have a standard header and border; your Adaptive Card code should not duplicate these. Having an item-specific title for your component is a good idea, but avoid duplicating your app name and icon.

## Loop component header

The platform provides the component header and includes standard elements such as Logo, Name, and Copy.

The **app name** is drawn from the component contract. When possible, use a concise name.

The **app logo** is drawn from the component contract. Ensure the logo provided works on both light and dark backgrounds since the same asset is used for light and dark modes and high contrast.

## Loop component border

The component border separates your component from the content around it. It can help users understand that the Loop component is live and separate from the contents surrounding it (such as email or chat).

The border will appear without any work from the developer. 
