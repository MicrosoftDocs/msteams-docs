---
title: Microsoft Adaptive Card Previewer
author: v-vanv
description: In this article, learn more about the Microsoft Adaptive Card previewer.
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
---

# Microsoft Adaptive Card Previewer

The Microsoft Adaptive Card Previewer (ACP) helps you to preview the Adaptive Cards when you're iterating over your card designs. It's a standalone extension bundled with Teams Toolkit that helps to preview adaptive card built for Teams bot, message extension, and Copilot plugin. You can open a side-by-side preview to view changes live and toggle between different themes.

:::image type="content" source="../../assets/images/previewer-adaptive-card/adaptive-card-previewer.png" alt-text="Shows the Adaptive Card previewer extension Visual Studio Code." lightbox="../../assets/images/previewer-adaptive-card/adaptive-card-previewer.png":::

## Features of Adaptive Card Previewer

The Adaptive Card Previewer uses the latest rendering stack for Teams to provide a more accurate preview of Adaptive Cards.

The primary goal of Adaptive Card Previewer is to provide developers with a faster and more reliable solution for previewing adaptive card designs. The adaptive card supports the following features:

* Instant preview of adaptive cards in Visual Studio Code editor through CodeLens or Command Palette.

  :::image type="content" source="../../assets/images/previewer-adaptive-card/acp-open-preview.png" alt-text="Shows the options for instant preview of adaptive cards in Visual Studio Code editor through CodeLens or Command Palette.":::

  :::image type="content" source="../../assets/images/previewer-adaptive-card/acp-preview-template.gif" alt-text="Shows how the preview appears in Adaptive Card preview extension in Visual Studio Code." lightbox="../../assets/images/previewer-adaptive-card/acp-preview-template.gif":::

* Switch between light, dark, and high contrast themes to preview your cards so you can design with confidence.

:::image type="content" source="../../assets/images/previewer-adaptive-card/acp-select-theme.gif" alt-text="Shows how to switch different themes in Adaptive Card Previewer.":::

* Separation of data from the layout in an Adaptive Card [template language](/adaptive-cards/templating/). Use the command `Adaptive Card: New Data File` to add a data file for a template. This generates an empty file where you can bind data to your adaptive card template.

* Seamless integration with Teams Toolkit that allows a Just-In-Time installation of Adaptive Card previewer when you're iterating on adaptive cards generated from Teams Toolkit project creation.

:::image type="content" source="../../assets/images/previewer-adaptive-card/acp-preview-example.png" alt-text="Shows a sample preview of an Adaptive Card when iterating an Adaptive Card." lightbox="../../assets/images/previewer-adaptive-card/acp-preview-example.png":::

* Configure default theme through Visual Studio Code extension settings `adaptiveCardPreviewer.defaultTheme`.

:::image type="content" source="../../assets/images/previewer-adaptive-card/acp-default-theme.png" alt-text="Shows how to configure default theme through Visual Studio Code extension settings.":::

## Benefits of Adaptive Card previewer

Adaptive Card previewer aims to improve the developer experience for creating adaptive cards in Microsoft Teams with the following benefits:

### Fast iteration

You can preview the Adaptive Card designs right within their integrated development environment without the need to constantly switch between tools.

* Create a new bot, messaging extension, or Copilot plugin project with Teams Toolkit or open an existing project with an Adaptive Card metadata file.
* Open the Adaptive Card metadata file to customize the card.
* Utilize "CodeLens" or a specific command to preview the card you are currently working on.
* Changes to the card are reflected instantly through **Hot Reload** feature in the preview.

### Trustworthy previews

  The Adaptive Card previewer uses the same rendering stack as Teams and Outlook, which ensures an accurate preview results align with the actual card rendering in these platforms.

## Limitations

The following features of Adaptive Card aren't supported in Adaptive Card previewer:

* [People Picker](../../task-modules-and-cards/cards/people-picker.md)
* [Typeahead search](../../task-modules-and-cards/cards/dynamic-search.md)
* [User mention](../../task-modules-and-cards/cards/cards-format.md#microsoft-azure-active-directory-azure-ad-object-id-and-upn-in-user-mention)
* [Stage View](../../task-modules-and-cards/cards/cards-format.md#stage-view-for-images-in-adaptive-cards)
* [Full width control](../../task-modules-and-cards/cards/cards-format.md#full-width-adaptive-card)
