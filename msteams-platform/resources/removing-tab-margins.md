---
title: Removing tab margins in Microsoft Teams
author: laujan
description: Describes how the removal of tab margins will enhance developer's experience.
keywords: tab removing margins padding
ms.topic: reference
localization_priority: Normal
ms.author: lomeybur
---

# Tab margin changes

This document describes how the removal of margins around all tabs in Microsoft Teams will enhance the developer's experience when building apps. This is an enhancement introduced in Microsoft Teams in 2021.
Removing the margins around all tabs will allow developers to build apps that look more native to Teams. This will also align with our [UI kit designs](~/tabs/design/tabs.md). Most apps already look better without the margins surrounding their experiences. However, some tabs are visually affected by this change, and developers must make the necessary changes.

:::image type="content" source="../assets/images/tabs/remove-margins-tabs.png" alt-text="Tab wit and without margins" border="false":::

> [!NOTE]
> This feature is not applicable to mobile clients, as the tabs viewed in the mobile clients do not have margins. 

## Timelines

* March 5, 2021 - Margins removed in [Public Developer Preview](~/resources/dev-preview/developer-preview-intro.md).
* June 15, 2021 - Margins will be removed in production.

## Guidelines

Microsoft Teams apps that use tabs will be affected by this change. Developers must switch to [Public Developer Preview](~/resources/dev-preview/developer-preview-intro.md) in order to determine how their tabs are affected and make the necessary changes.

Tab developers must not rely on Teams to provide margins surrounding their tabs. Developers are encouraged to add margins around their tab designs where it is required. App designs in production can look like there is extra padding, that is, margins provided by Teams and margins provided by the tab. However, the extra padding is only temporary and will go away in a few weeks, leaving only the app's provided padding.

## FAQ

**Is it OK for app chrome, such as header bar or taskbar, to touch the edges of our designs?**

Yes, this is fine and encouraged. This helps the app feel native.

**Is it OK for app content, such as text, logos, and images, to touch the left and right edges of our designs?**

No, you must provide your own padding or margins to the left and right of all app content to ensure it does not touch the edges of your UI. You can also add margins at the top of your tab, if required.

**What's the size of the margins Teams previously applied?**

* Left and right: 20px
* Top: 16px
* Bottom: 0px

> [!IMPORTANT]
> * All tabs have their margins removed: personal tabs, (group) chat tabs, meeting tabs, and channel tabs.
> * There is no way to opt-in or opt-out of this change. It will apply to all tabs.
> * This change can affect tabs that rely on Microsoft Teams to provide margins surrounding their UI.
