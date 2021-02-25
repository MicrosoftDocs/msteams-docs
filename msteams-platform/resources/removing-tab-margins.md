---
title: Removing tab margins in Microsoft Teams
author: laujan
description: 
keywords: tab removing margins padding
ms.topic: reference
ms.author: lomeybur
---

# Removing all tab margins (2021 update)

Microsoft Teams is removing the margins around all tabs. This will allow developers to build apps that look more native to Teams. This will also align with our [UI kit designs](~/tabs/design/tabs.md). Most apps already look better without the margins surrounding their experiences. However, some tabs are visually affected by this change and developers should make the necessary changes.

:::image type="content" source="../../assets/images/tabs/remove-margins-tabs.png" alt-text="Tab wit and without margins" border="false":::

## Timelines

* March 1st, 2021 - Margins removed in [Public Developer Preview](~/resources/dev-preview/developer-preview-intro.md)
* May 1st, 2021 - Margins will be removed in production

## Guidelines

Microsoft Teams apps that use tabs will be affected by this change. Developers should switch to [Public Developer Preview](~/resources/dev-preview/developer-preview-intro.md) in order to determine how their tabs are affected and make the necessary changes.

Tab developers should not rely on Teams to provide margins surrounding their tabs. Developers are encouraged to add margins around their tab designs where it makes sense. App designs in production may look like there's extra padding (i.e.: margins provided by Teams, and margins provided by the tab), but this is only temporary and will go away in a few weeks, leaving only the app's provided padding.

## FAQ

> Is it OK for app chrome (header bar, task bar, etc) to touch the edges of our designs?

Yes, this is fine and encouraged. This helps the app feel native.

> Is it OK for app content (text, logos, images) to touch the left and right edges of our designs?

No, you should provide your own padding/margins to the left and right of all app content to ensure it doesn't touch the edges of your UI. You may also need to add margins at the top of your tab.

> What's the size of the margins Teams previously applied?

* Left and right: 20px
* Top: 16px
* Bottom: 0px

## Important notes

* All tabs have their margins removed: personal tabs, (group)chat tabs, meeting tabs and channel tabs.
* There is no way to opt-in or opt-out of this change. It will apply to all tabs.
* This may affect some tabs that relied on Microsoft Teams to provide margins surrounding their UI.