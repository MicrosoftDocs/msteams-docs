---
title: Install Adaptive Card Previewer
author: v-vanv
description: In this article, learn more about how to install the Adaptive Card Previewer extension for Visual Studio Code code and Visual Studio Code Marketplace.
ms.localizationpriority: medium
ms.topic: Install Adaptive Card Previewer
ms.author: surbhigupta
---

# Install Adaptive Card Previewer

> [!NOTE]
> The Adaptive Card Previewer (ACP) is available in [Public developer preview](../../resources/dev-preview/developer-preview-intro.md).

ACP is a Visual Studio Code Extension that allows you to easily preview the Adaptive Cards when you're iterating over your card designs. It aims to provide a seamless and accurate previewing experience within the Visual Studio Code.

## Prerequisites

Before you begin, you must be familiar with the following prerequisites:

* [Design Adaptive Cards](../../task-modules-and-cards/cards/design-effective-cards.md).
* [Download and install Visual Studio Code](https://code.visualstudio.com/Download).

## Install Adaptive Card Previewer for Visual Studio Code

You can install Adaptive Card Previewer using **Extensions** in Visual Studio Code, or install it from the Visual Studio Code Marketplace.

# [Visual Studio Code](#tab/vscode)

1. Launch Visual Studio Code.
1. Select **View** > **Extensions** or **Ctrl+Shift+X**. You can also open extensions by selecting the extensions :::image type="icon" source="../../assets/images/previewer-adaptive-card/vsc-ext-icon.png" border="false"::: icon from the Visual Studio Code activity bar.

    :::image type="content" source="../../assets/images/previewer-adaptive-card/view-extensions.png" alt-text="Screenshot shows how to open extensions in Visual Studio Code.":::

    The **EXTENSIONS: MARKETPLACE** pane appears.

1. Enter **Adaptive Card Previewer** in the search box.

   Adaptive Card Previewer appears in the search result.
1. Select **Adaptive Card Previewer**.
1. In ACP extension page, in the right pane, select  **Install**.

   ACP is installed in Visual Studio Code and ACP extension icon appears in the Visual Studio Code activity bar.

# [Marketplace](#tab/marketplace)

1. Go to *Visual Studio Code Marketplace* in a web browser.

1. Select **Install**.

1. In the pop-up window, select **Open**.

   Visual Studio Code opens with ACP extension page.

1. In the Visual Studio Code extension page, Select **Install**.

   After successful installation of ACP in Visual Studio Code, the Adaptive Card Previewer icon appears in the Visual Studio Code activity bar.

---

## Preview an Adaptive Card

1. Download the [Adaptive Card sample](https://github.com/OfficeDev/acpreviewer/tree/main/card-samples).
1. Unzip and open the downloaded sample cards in the Visual Studio Code.
1. Select a card from the sample cards.
1. In the top section of Adaptive Card template file, select **Preview Adaptive Card**.
    :::image type="content" source="../../assets/images/previewer-adaptive-card/acp-sample-preview.png" alt-text="Shows the instant preview of Adaptive Card in the Visual Studio Code extension." lightbox="../../assets/images/previewer-adaptive-card/acp-sample-preview1.png":::
    Preview of the adaptive card is visible on the right pane.
1. You can select the theme from the **Theme** dropdown list.

## Code sample

| **Sample name** | **Description** |**Node.js** |
|-----------------|-----------------|----------------|
| Adaptive Cards | This sample code describes the Adaptive Card samples for preview in ACP. |[View](https://github.com/OfficeDev/acpreviewer/tree/main/card-samples)|
