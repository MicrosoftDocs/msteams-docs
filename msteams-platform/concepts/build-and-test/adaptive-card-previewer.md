---
title: Microsoft Adaptive Card Previewer
author: v-vanv
description: In this article, learn more about the Microsoft Adaptive Card previewer.
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
---

# Microsoft Adaptive Card Previewer

The Microsoft Adaptive Card Previewer (ACP) allows you to preview the Adaptive Cards when you're iterating over your card designs. It uses the latest rendering stack for Microsoft Teams to provide a more accurate preview of Adaptive Cards. You can open a side-by-side preview to view changes live, toggle between light, dark, and high contrast themes.

## Features of Adaptive Card Previewer

The primary goal of Adaptive Card Previewer is to provide developers with a faster and more reliable solution for previewing adaptive card designs. It supports:

* Instant preview of adaptive cards in VS Code editor through CodeLens or Command Palette.

* Switch between different themes (Light/Dark/HighContrast) to preview your cards so you can design with confidence.

* Separation of data from the layout in an Adaptive Card template language. Use command Adaptive Card: New Data File to add a data file for a template. This generates an empty file where you can bind data to your adaptive card template.

* Seamless integration with Teams Toolkit that allows a Just-In-Time installation of Adaptive Card Previewer when you're iterating on adaptive cards generated from Teams Toolkit project creation.

* Configure default theme through Visual Studio Code extension settings adaptiveCardPreviewer.defaultTheme.

## Benefits of Adaptive Card previewer

Adaptive Card previewer aims to improve the developer experience for creating adaptive cards in Microsoft Teams with the following benefits:

* Fast Iteration: Developers can preview adaptive card designs right within their integrated development environment without the need to constantly switch between tools. Changes to the card are reflected instantly, similar to a "Hot Reload" feature.

* Trustworthy Previews: The Adaptive Card previewer uses the same rendering stack as Teams and Outlook, ensuring that developers can trust the preview results align with the actual card rendering in these platforms.

## Limitation

The following features of Adaptive Card aren't supported in Adaptive Card previewer:

* [People Picker](../../task-modules-and-cards/cards/people-picker.md)
* [Typeahead search](../../task-modules-and-cards/cards/dynamic-search.md)
* [User mention](../../task-modules-and-cards/cards/cards-format.md#microsoft-azure-active-directory-azure-ad-object-id-and-upn-in-user-mention)
* [Stage view](../../task-modules-and-cards/cards/cards-format.md#stage-view-for-images-in-adaptive-cards)
* [Full width control](../../task-modules-and-cards/cards/cards-format.md#full-width-adaptive-card)
