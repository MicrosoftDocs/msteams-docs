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

> [!NOTE]
> Adaptive Card Previewer is available in [public developer preview](../../resources/dev-preview/developer-preview-intro.md).

Microsoft Adaptive Card Previewer enables you to preview Adaptive Cards when you refine the designs. It works with Teams Toolkit, allows you to preview Adaptive Cards created for Teams bot and message extension. You can open a side-by-side preview to observe live changes and switch between different themes.

:::image type="content" source="../../assets/images/previewer-adaptive-card/adaptive-card-previewer.png" alt-text="Screenshot shows the Adaptive Card Previewer extension Visual Studio Code." lightbox="../../assets/images/previewer-adaptive-card/adaptive-card-previewer.png":::

## Explore Adaptive Card Previewer

Adaptive Card Previewer provides faster and more reliable solutions to preview Adaptive Card designs. Adaptive Card Previewer supports the following features:

* **Teams Toolkit Integration**: Enables Just-in-Time (JIT) installation of Adaptive Card Previewer when you update Adaptive Cards generated from a Teams Toolkit project.

  :::image type="content" source="../../assets/images/previewer-adaptive-card/acp-preview-example.png" alt-text="Screenshot shows a sample preview of an Adaptive Card when updating an Adaptive Card." lightbox="../../assets/images/previewer-adaptive-card/acp-preview-example.png":::

* **Instant preview**: Allows you to preview Adaptive Cards in the Visual Studio Code editor through CodeLens or the Command Palette.

   # [CodeLens](#tab/codelens)

   You can select **Preview Adaptive Card** suggestion in the Adaptive Card template file to preview the Adaptive Card in the right pane.

   :::image type="content" source="../../assets/images/previewer-adaptive-card/acp-preview-template.gif" alt-text="Graphic shows how the preview appears in Adaptive Card preview extension in Visual Studio Code." lightbox="../../assets/images/previewer-adaptive-card/acp-preview-template.gif":::

   # [Command Palette](#tab/command-palette)

   You can use **Adaptive Card: Open Preview to the Side** or **Adaptive Card: Open Preview** to preview the Adaptive Card.

   :::image type="content" source="../../assets/images/previewer-adaptive-card/acp-open-preview.png" alt-text="Screenshot shows the options for instant preview of adaptive cards in Visual Studio Code editor through CodeLens or Command Palette.":::

   * To preview Adaptive Card in the right pane, select **Adaptive Card: Open Preview to the Side**.
   * To preview Adaptive Card in a new window, select **Adaptive Card: Open Preview**.

   :::image type="content" source="../../assets/images/previewer-adaptive-card/command-palette-preview.png" alt-text="Screenshot shows the preview of Adaptive Card when selecting the option Adaptive Card: Open Preview in Command Palette." lightbox= "../../assets/images/previewer-adaptive-card/command-palette-preview.png":::

   ---

* **Data separation**: Enables you to separate data from the layout in an Adaptive Card [template language](/adaptive-cards/templating/). Use the command `Adaptive Card: New Data File` to add a data file for a template, which generates an empty file where you can bind data to the Adaptive Card template.

* **Default theme configuration**: Allows you to set a default theme through the Visual Studio Code extension settings **Adaptive Card Previewer: Default Theme**.

  :::image type="content" source="../../assets/images/previewer-adaptive-card/acp-default-theme.png" alt-text="Screenshot shows how to configure default theme through Visual Studio Code extension settings.":::

* **Switch themes**: Allows you to switch between light, dark, and high contrast themes to preview your Adaptive Cards.

  :::image type="content" source="../../assets/images/previewer-adaptive-card/acp-select-theme.gif" alt-text="Graphic shows the Adaptive Card preview in light, dark, and high contrast themes.":::

## Advantages

The Adaptive Card Previewer offers the following benefits:

* **Quick updates**: Allows you to preview Adaptive Card designs within their integrated development environment, eliminates the need to switch between tools constantly. You can create a bot or messaging extension with Teams Toolkit, open the Adaptive Card metadata file, and use **CodeLens** or a specific command to preview the card. Any update or changes to the card are reflected instantly through the **Hot Reload** feature in the preview.

* **Reliable previews**: Uses the same rendering stack as Teams and Outlook to ensure accurate and consistent preview results are aligned with the actual card rendering.

## Limitations

The Adaptive Card Previewer doesn't support the following Adaptive Card features:

* [People Picker](../../task-modules-and-cards/cards/people-picker.md)
* [Typeahead search](../../task-modules-and-cards/cards/dynamic-search.md)
* [User mention](../../task-modules-and-cards/cards/cards-format.md#microsoft-azure-active-directory-azure-ad-object-id-and-upn-in-user-mention)
* [Stage View](../../task-modules-and-cards/cards/cards-format.md#stage-view-for-images-in-adaptive-cards)
* [Full width control](../../task-modules-and-cards/cards/cards-format.md#full-width-adaptive-card)

## FAQs

<details>
<summary>Why do we have to use a new extension in Visual Studio Code? Can’t this extension be integrated into Teams Toolkit for Visual Studio Code?</summary>

Adaptive Card Previewer is a standalone extension because it uses a closed-source package to render the Adaptive Cards to ensure consistent rendering logic with the Teams platform. Teams Toolkit is an open-source project and doesn't include dependencies on packages that third-party developers can't access.
<br>
&nbsp;
</details>
<details>
<summary>Does this extension support all Adaptive Card features in the Teams platform?</summary>

No. There are several [limitations](adaptive-card-previewer.md#limitations) that Adaptive Card Previewer extension doesn't support.
<br>
&nbsp;
</details>
<details>
<summary>Will Visual Studio be integrated into Adaptive Card Previewer?</summary>

No, Adaptive Card Previewer is available in Visual Studio Code only.
<br>
&nbsp;
</details>

## See also

[Design Adaptive Cards](../../task-modules-and-cards/cards/design-effective-cards.md)
