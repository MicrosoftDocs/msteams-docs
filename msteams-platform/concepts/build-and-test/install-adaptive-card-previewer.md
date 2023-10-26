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

This article helps you to know about the prerequisites, how to install ACP for Visual Studio Code, and Visual Studio Code Marketplace.

The ACP is a Visual Studio Code Extension that allows you to easily preview the Adaptive Cards when you're iterating over your card designs. It aims to provide a seamless and accurate previewing experience within the Visual Studio Code.

Before you begin, you must be familiar with the concepts and [how to design Adaptive Cards](../../task-modules-and-cards/cards/design-effective-cards.md).

## Prerequisites

Before installing ACP for Visual Studio Code, you need to [download and install Visual Studio Code](https://code.visualstudio.com/Download).

## Install Adaptive Card Previewer for Visual Studio Code

You can install Adaptive Card Previewer using **Extensions** in Visual Studio Code, or install it from the Visual Studio Code Marketplace.

# [Visual Studio Code](#tab/vscode)

1. Launch Visual Studio Code.
1. Select **View** > **Extensions** or **Ctrl+Shift+X**. You can also open extensions by selecting the extensions :::image type="icon" source="../../assets/images/previewer-adaptive-card/vsc-ext-icon.png" border="false"::: icon from the Visual Studio Code activity bar.

    :::image type="content" source="../../assets/images/previewer-adaptive-card/view-extensions.png" alt-text="Screenshot shows how to open extensions in Visual Studio Code.":::

    The **EXTENSIONS: MARKETPLACE** pane appears.

1. Enter **Adaptive Card Previewer** in the search box.
   Adaptive Card Previewer appears in the search result.
1. Select **Adaptive Card Previewer**, and then from the ACP extension page that appears in the right pane, select  **Install**.

   After successful installation of ACP in Visual Studio Code, the Adaptive Card Previewer icon appears in the Visual Studio Code activity bar.

# [Marketplace](#tab/marketplace)

1. Go to *Visual Studio Code Marketplace* in a web browser.

1. Select **Install**.

1. In the pop-up window, select **Open**.

   Visual Studio Code opens with the ACP extension page.

1. Select **Install**.

   After successful installation of ACP in Visual Studio Code, the Adaptive Card Previewer icon appears in the Visual Studio Code activity bar.

## Preview your Adaptive Card

1. Download the [Adaptive Card sample](https://dev.azure.com/devdiv/_apis/resources/Containers/15555474/Drop?itemPath=Drop%2Fsamples-0.1.0-alpha.dbba2cf.zip).
1. Unzip and open the downloaded sample cards in the Visual Studio Code.
1. Select any of the cards from the sample cards.
1. Select **Preview Adaptive Card** button in the Adaptive Card template file to preview it.
    :::image type="content" source="../../assets/images/previewer-adaptive-card/acp-sample-preview.png" alt-text="Shows the instant preview of Adaptive Card in the Visual Studio Code extension." lightbox="../../assets/images/previewer-adaptive-card/acp-sample-preview1.png":::
1. You can select the theme from the **Theme** dropdown list.

## Code sample

| **Sample name** | **Description** |**Node.js** |
|-----------------|-----------------|----------------|
| Adaptive Cards | This sample code describes the Adaptive Card samples for preview in ACP. |[View](https://github.com/OfficeDev/acpreviewer/tree/main/card-samples)|
