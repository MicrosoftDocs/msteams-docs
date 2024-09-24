---
title: Adaptive Card Previewer - Visual Studio
author: v-ganr
description: In this article, learn more about the Microsoft Adaptive Card previewer using Teams Toolkit for Visual Studio, features, advantages, limitations.
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
ms.date: 02/13/2024
---

# Microsoft Adaptive Card Previewer Microsoft Visual Studio

The Adaptive Card Previewer, integrated with the Microsoft Teams Toolkit for Visual Studio, enables real-time previews of Adaptive Cards created for Microsoft Teams bots. You can open a side-by-side preview of your Adaptive Card to observe live changes, switch between different themes, and refine your designs to ensure they're accurate and effective.

## Explore Adaptive Card Previewer

Adaptive Card Previewer provides faster and more reliable solutions to preview Adaptive Card designs. Adaptive Card Previewer supports the following features:

* **Teams Toolkit Integration**: Enables Just-in-Time (JIT) installation of Adaptive Card Previewer when you update Adaptive Cards generated from a Teams Toolkit project.

  :::image type="content" source="../../assets/images/previewer-adaptive-card/acp-example-vs.png" alt-text="Screenshot shows an example of Adaptive Card in the right pane.":::

* **Instant preview**: Allows you to preview Adaptive Cards in Visual Studio editor through CodeLens.

* **Data separation**: Enables you to separate data from the layout in an Adaptive Card [template language](/adaptive-cards/templating/). Use the command `Adaptive Card: New Data File` to add a data file to a template, which generates an empty file where you can bind data to the Adaptive Card template.

* **Switch themes**: Allows you to switch between light, dark, and high contrast themes to preview your Adaptive Cards.

  :::image type="content" source="../../assets/images/previewer-adaptive-card/acp-select-theme-vs.gif" alt-text="Graphic shows the Adaptive Card preview in light, dark, and high contrast themes.":::

## Advantages

The Adaptive Card Previewer offers the following benefits:

* **Quick updates**: Allows you to preview Adaptive Card designs within their integrated development environment and eliminates the need to switch between tools constantly. You can create a bot or message extension with Teams Toolkit, open the Adaptive Card metadata file, and use **CodeLens** or a specific command to preview the card. Any update or changes to the card are reflected instantly through the **Hot Reload** feature in the Adaptive Card Previewer.

* **Reliable previews**: Uses the same rendering stack as Teams and Outlook to ensure accurate and consistent preview results are aligned with the actual card rendering.

## Limitations

The Adaptive Card Previewer doesn't support the following Adaptive Card features:

* [People Picker](../../task-modules-and-cards/cards/people-picker.md)
* [Typeahead search](../../task-modules-and-cards/cards/dynamic-search.md)
* [User mention](../../task-modules-and-cards/cards/cards-format.md#microsoft-azure-active-directory-azure-ad-object-id-and-upn-in-user-mention)
* [Stageview](../../task-modules-and-cards/cards/cards-format.md#stageview-for-images-in-adaptive-cards)
* [Full width control](../../task-modules-and-cards/cards/cards-format.md#full-width-adaptive-card)

## Preview Adaptive Card

You can use an existing Adaptive Card template file or download the [Adaptive Card sample](https://github.com/OfficeDev/acpreviewer/tree/main/card-samples).

1. Open an existing Adaptive Card template file or an Adaptive Card template file from the downloaded sample in Visual Studio.
1. In the Adaptive Card template file, at the upper-left corner, select **Preview**.

    :::image type="content" source="../../assets/images/previewer-adaptive-card/acp-example-vs.png" alt-text="Screenshot shows the option to select preview option to open a preview of Adaptive Card in the right pane.":::

    A preview of the Adaptive Card opens in the right pane. You can select the theme of the preview from the **Theme** dropdown list.

## See also

[Design Adaptive Cards](../../task-modules-and-cards/cards/design-effective-cards.md)
