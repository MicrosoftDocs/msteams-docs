---
title: Microsoft Adaptive Card Previewer
author: v-vanv
description: In this article, learn more about the Microsoft Adaptive Card previewer, features, advantages, and k=limitations of the Adaptive Card Previewer.
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
ms.date: 10/20/2023
---

# Microsoft Adaptive Card Previewer

The Microsoft Adaptive Card Previewer (ACP) enables you to preview [Adaptive Cards](../../task-modules-and-cards/cards/design-effective-cards.md) as you refine your card designs. ACP with Teams Toolkit, facilitates the preview of Adaptive Cards created for Teams bot, message extension, and Copilot. You've the option to open a side-by-side preview to observe live changes and alternate between various themes.

:::image type="content" source="../../assets/images/previewer-adaptive-card/adaptive-card-previewer.png" alt-text="Shows the Adaptive Card Previewer extension Visual Studio Code." lightbox="../../assets/images/previewer-adaptive-card/adaptive-card-previewer.png":::

## Features

ACP provides faster and more reliable solutions to preview Adaptive Card designs. The Adaptive Card supports the following features:

* **Instant preview**: You can preview Adaptive Cards in Visual Studio Code editor through CodeLens or Command Palette.

# [CodeLens](#tab/codelens)

You can select **Preview Adaptive Card** suggestion in the Adaptive Card template file to preview the Adaptive Card in the right pane.

:::image type="content" source="../../assets/images/previewer-adaptive-card/acp-preview-template.gif" alt-text="Shows how the preview appears in Adaptive Card preview extension in Visual Studio Code." lightbox="../../assets/images/previewer-adaptive-card/acp-preview-template.gif":::

# [Command Palette](#tab/command-palette)

You can use **Adaptive Card: Open Preview to the Side** or **Adaptive Card: Open Preview** to preview the Adaptive Card.

:::image type="content" source="../../assets/images/previewer-adaptive-card/acp-open-preview.png" alt-text="Shows the options for instant preview of adaptive cards in Visual Studio Code editor through CodeLens or Command Palette.":::

---

* **Switch themes**: You can switch between light, dark, and high contrast themes to preview your Adaptive Cards.

  :::image type="content" source="../../assets/images/previewer-adaptive-card/acp-select-theme.gif" alt-text="Graphic shows the Adaptive Card preview in light, dark, and high contrast themes.":::

* **Data separation**: You can separate data from the layout in an Adaptive Card [template language](/adaptive-cards/templating/). Use the command `Adaptive Card: New Data File` to add a data file for a template. This generates an empty file where you can bind data to your Adaptive Card template.

* **Integration with Teams Toolkit**: Allows Just-in-Time (JIT) installation of ACP when you're updating Adaptive Cards generated from Teams Toolkit project creation.

  :::image type="content" source="../../assets/images/previewer-adaptive-card/acp-preview-example.png" alt-text="Screenshot shows a sample preview of an Adaptive Card when iterating an Adaptive Card." lightbox="../../assets/images/previewer-adaptive-card/acp-preview-example.png":::

* **Default theme**: Configure default theme through Visual Studio Code extension settings **Adaptive Card Previewer: Default Theme**.

  :::image type="content" source="../../assets/images/previewer-adaptive-card/acp-default-theme.png" alt-text="Shows how to configure default theme through Visual Studio Code extension settings.":::

## Advantages

ACP aims to improve the developer experience for creating Adaptive Cards in Microsoft Teams with the following benefits:

### Fast iteration

You can preview the Adaptive Card designs right within their integrated development environment without the need to constantly switch between tools.

The developer experiences are:

* Create a new bot, messaging extension, or Copilot plugin project with Teams Toolkit or open an existing project with an Adaptive Card metadata file.
* Open the Adaptive Card metadata file to customize the card.
* Utilize **CodeLens** or a specific command to preview the card you're currently working on.
* Changes to the card are reflected instantly through **Hot Reload** feature in the preview.

### Trustworthy previews

ACP uses the same rendering stack as Teams and Outlook, which ensures accurate preview results align with the actual card rendering in these platforms.

## Limitations

The following are the limitations of ACP:

* [People Picker](../../task-modules-and-cards/cards/people-picker.md)
* [Typeahead search](../../task-modules-and-cards/cards/dynamic-search.md)
* [User mention](../../task-modules-and-cards/cards/cards-format.md#microsoft-azure-active-directory-azure-ad-object-id-and-upn-in-user-mention)
* [Stage View](../../task-modules-and-cards/cards/cards-format.md#stage-view-for-images-in-adaptive-cards)
* [Full width control](../../task-modules-and-cards/cards/cards-format.md#full-width-adaptive-card)

## Adaptive Card Previewer FAQs

<details>
<summary>Why do we have to use a new extension in Visual Studio Code? Can’t this extension be integrated into Teams Toolkit for Visual Studio Code?</summary>

It’s a standalone extension because we're using a closed-source package to render the Adaptive Cards to ensure that we maintain consistent rendering logic with the Teams platform. Teams Toolkit is an open-source project, and we follow CELA guidance to not include dependencies on closed-source packages that third party developers don't have access to.
<br>
&nbsp;
</details>
<details>
<summary>Does this extension support all Adaptive Card features in Teams platform?</summary>

No. Unfortunately, there are several [limitations](adaptive-card-previewer.md#limitations) that ACP extension can't currently support.
<br>
&nbsp;
</details>
<details>
<summary>Will Visual Studio be integrated into ACP?</summary>

Yes, we plan to integrate ACP into Teams Toolkit for Visual Studio directly soon, instead of through a dedicated extension.
<br>
&nbsp;
</details>
