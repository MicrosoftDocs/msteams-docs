---
title: Install Adaptive Card Previewer
author: v-vanv
description: In this article, learn more about how to install the Adaptive Card Previewer extension for Visual Studio Code code and Visual Studio Code Marketplace.
ms.localizationpriority: medium
ms.topic: Install Adaptive Card Previewer
ms.author: surbhigupta
---

# Install Adaptive Card Previewer

This article helps you to know about the prerequisites, how to install Adaptive Card Previewer for Visual Studio Code, and Visual Studio Code Marketplace.

Adaptive Card Previewer is a Visual Studio Code Extension that allows you easily preview the Adaptive Cards when you're iterating over your card designs. It aims to provide a seamless and accurate previewing experience within Visual Studio Code.

## Prerequisites

* [Download and install Visual Studio Code](https://code.visualstudio.com/Download)
* Be familiar to build [Adaptive Cards](../../task-modules-and-cards/cards/design-effective-cards.md)

## Artifacts

* Download the private build of the [Adaptive Card Previewer Extension](https://dev.azure.com/devdiv/_apis/resources/Containers/15555474/Drop?itemPath=Drop%2Fsamples-0.1.0-alpha.dbba2cf.zip )

* Download the [collection of sample adaptive cards](https://dev.azure.com/devdiv/_apis/resources/Containers/15555474/Drop?itemPath=Drop%2Fvscode-adaptive-cards-0.1.0-alpha.dbba2cf.vsix)

## Install Adaptive Card Previewer for Visual Studio Code

1. Install the downloaded VSIX from Visual Studio Code.

  :::image type="content" source="../../assets/images/previewer-adaptive-card/acp-install.png" alt-text="Shows how to install the downloaded VSIX." lightbox="../../assets/images/previewer-adaptive-card/acp-install.png":::

1. Unzip and open the downloaded sample cards in Visual Studio Code.
1. Select any of the cards from the sample cards.
1. Select **Preview Adaptive Card** button in the Adaptive Card template file to preview it.

  :::image type="content" source="../../assets/images/previewer-adaptive-card/acp-sample-preview.png" alt-text="Shows the instant preview of Adaptive Card in the Visual Studio Code extension." lightbox="../../assets/images/previewer-adaptive-card/acp-sample-preview1.png":::

1. You can select the theme from the **Theme** dropdown list.

## Adaptive Card previewer FAQs

<details>
<summary>Why do we have to use a new extension in Visual Studio Code? Can’t this extension be integrated into Teams Toolkit for Visual Studio Code?</summary>

It’s a standalone extension because we're using a closed-source package to render the Adaptive Cards to ensure that we maintain consistent rendering logic with the Teams platform. The Teams Toolkit is an open-source project, and we follow CELA guidance to not include dependencies on closed-source packages that 3-P developers don't have access to.
<br>
&nbsp;
</details>
<details>
<summary>How do I acquire this extension when it goes public?</summary>

We plan to publish this extension in Visual Studio Code Extension Marketplace. The Teams Toolkit will include an entry point to trigger the installation of this extension whenever you open an Adaptive Card Template file.
<br>
&nbsp;
</details>
<details>
<summary>Does this extension support all Adaptive Card features in Teams platform?</summary>

No. Unfortunately, there are several [limitations](adaptive-card-previewer.md#limitations) that the Adaptive Card previewer extension can't currently support. We might solve them in the future iterations.
<br>
&nbsp;
</details>
<details>
<summary>Will Visual Studio have integration to Adaptive Card previewer?</summary>

Yes, we plan to integrate the Adaptive Card previewer into Teams Toolkit for Visual Studio directly in Q4 CY 2023, instead of through a dedicated extension. This change is due to the closed-source nature of the Teams Toolkit for Visual Studio extension.
<br>
&nbsp;
</details>
