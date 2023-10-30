---
title: Microsoft Adaptive Card Previewer
author: v-vanv
description: In this article, learn more about the Microsoft Adaptive Card previewer, features, advantages, and k=limitations of the Adaptive Card Previewer.
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
ms.date: 20/10/2023
---

# Microsoft Adaptive Card Previewer

Microsoft Adaptive Card Previewer (ACP) helps you to preview the [Adaptive Cards](../../task-modules-and-cards/cards/design-effective-cards.md) when you're iterating over your card designs. It's a standalone extension bundled with Teams Toolkit that helps to preview Adaptive Card built for Teams bot, message extension, and Copilot plugin. You can open a side-by-side preview to view changes live and switch between different themes.

:::image type="content" source="../../assets/images/previewer-adaptive-card/adaptive-card-previewer.png" alt-text="Shows the Adaptive Card Previewer extension Visual Studio Code." lightbox="../../assets/images/previewer-adaptive-card/adaptive-card-previewer.png":::

## Features

ACP uses the latest rendering stack for Teams to provide a more accurate preview of Adaptive Cards.

ACP provides faster and more reliable solution for previewing Adaptive Card designs. The Adaptive Card supports the following features:

* Instant preview: You can preview Adaptive Cards in Visual Studio Code editor through CodeLens or Command Palette.

  :::image type="content" source="../../assets/images/previewer-adaptive-card/acp-open-preview.png" alt-text="Shows the options for instant preview of adaptive cards in Visual Studio Code editor through CodeLens or Command Palette.":::

  :::image type="content" source="../../assets/images/previewer-adaptive-card/acp-preview-template.gif" alt-text="Shows how the preview appears in Adaptive Card preview extension in Visual Studio Code." lightbox="../../assets/images/previewer-adaptive-card/acp-preview-template.gif":::

* Switch themes: You can switch between light, dark, and high contrast themes to preview your cards so you can design with confidence.

  :::image type="content" source="../../assets/images/previewer-adaptive-card/acp-select-theme.gif" alt-text="Shows how to switch different themes in Adaptive Card Previewer.":::

* Separation of data: You can separate data from the layout in an Adaptive Card [template language](/adaptive-cards/templating/). Use the command `Adaptive Card: New Data File` to add a data file for a template. This generates an empty file where you can bind data to your Adaptive Card template.

* Seamless ACP integration with Teams Toolkit: Allows a Just-In-Time installation of ACP when you're iterating on Adaptive Cards generated from Teams Toolkit project creation.

  :::image type="content" source="../../assets/images/previewer-adaptive-card/acp-preview-example.png" alt-text="Shows a sample preview of an Adaptive Card when iterating an Adaptive Card." lightbox="../../assets/images/previewer-adaptive-card/acp-preview-example.png":::

* Default theme: Configure default theme through Visual Studio Code extension settings **Adaptive Card Previewer: Default Theme**.

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
