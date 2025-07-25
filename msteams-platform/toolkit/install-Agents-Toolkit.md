---
title: Steps to Install Agents Toolkit
author: zyxiaoyuer
description: Learn how to install Microsoft 365 Agents Toolkit from Visual Studio Code and marketplace, and to install different Agents Toolkit versions and prerelease versions.
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 03/10/2025
---
# Install Agents Toolkit

This section helps you to know about the prerequisites, install Microsoft 365 Agents Toolkit (previously known as Teams Toolkit) for Microsoft Visual Studio Code, and install a different version of Agents Toolkit.

## Prerequisites

* [Visual Studio Code](https://code.visualstudio.com/Download).
* [NodeJS](https://nodejs.org) version 16 or later.
* NPM 8 or later.

## Install Agents Toolkit for Visual Studio Code

You can install Agents Toolkit using **Extensions** in Visual Studio Code, or install it from the Visual Studio Code Marketplace.

# [Visual Studio Code](#tab/vscode)

1. Launch Visual Studio Code.
1. Select **View** > **Extensions** or **Ctrl+Shift+X**. You can also open extensions by selecting the extensions :::image type="icon" source="../assets/images/toolkit-v2/toolkit-fundamentals/vsc-ext-icon.png" border="false"::: icon from the Visual Studio Code activity bar.

    :::image type="content" source="../assets/images/toolkit-v2/toolkit-fundamentals/install toolkit-1_2.png" alt-text="Screenshot shows the Extensions option under View.":::

    The **EXTENSIONS: MARKETPLACE** pane appears.

1. Enter **Microsoft 365 Agents Toolkit** in the search box.

    :::image type="content" source="../assets/images/toolkit-v2/toolkit-fundamentals/toolkit-search.PNG" alt-text="Screenshot show the Agents Toolkit listed in the search result.":::

   Agents Toolkit appears in the search result.

1. Select **Microsoft 365 Agents Toolkit**, and then from Agents Toolkit extension page that appears in the right pane, select  **Install**.
  
    :::image type="content" source="../assets/images/toolkit-v2/toolkit-fundamentals/toolkit-ga.PNG" alt-text="Screenshot show the Agents Toolkit.":::

   After successful installation, Agents Toolkit icon appears in the Visual Studio Code activity bar.

    :::image type="content" source="../assets/images/toolkit-v2/toolkit-fundamentals/toolkit-activity-bar.jpg" alt-text="Screenshot shows the Agents Toolkit icon in the activity bar.":::

 > [!div class="nextstepaction"]
 > [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Install+Agents+Toolkit+for+Visual+Studio+Code+using+Visual+Studio+Code&&author=%40zyxiaoyuer&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftoolkit%2Finstall-agents-toolkit%3Ftabs%3Dvscode%23install-agents-toolkit-for-visual-studio-code&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftoolkit%2Finstall-Agents-Toolkit.md&documentVersionIndependentId=8402fe47-1338-4cb0-9cc0-c35f06dc6ca5&platformId=857dcef4-57f6-1b0a-65f7-221c9f49c1c7&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

# [Marketplace](#tab/marketplace)

1. Go to [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) in a web browser.

   :::image type="content" source="../assets/images/toolkit-v2/toolkit-fundamentals/install-marketplace.png" alt-text="Screenshot shows the Agents Toolkit Marketplace screen.":::

1. Select **Install**.

   :::image type="content" source="../assets/images/toolkit-v2/toolkit-fundamentals/install-toolkit1.png" alt-text="Screenshot shows the Install option.":::

1. In the pop-up window, select **Open**.

   :::image type="content" source="../assets/images/toolkit-v2/toolkit-fundamentals/select-open_1.png" alt-text="Screenshot shows a pop-up window to open Visual Studio Code.":::

   Visual Studio Code opens with Agents Toolkit extension page.

   :::image type="content" source="../assets/images/toolkit-v2/toolkit-fundamentals/toolkit-in-vsc.png" alt-text="Screenshot shows how to select Agents Toolkit in Visual Studio Code."

1. Select **Install**.

   :::image type="content" source="../assets/images/toolkit-v2/toolkit-fundamentals/toolkit-ga.png" alt-text="Screenshot shows the selection of Install option in Agents Toolkit.":::

   After successful installation, Agents Toolkit icon appears in the Visual Studio Code activity bar.

   :::image type="content" source="../assets/images/toolkit-v2/toolkit-fundamentals/toolkit-activity-bar.jpg" alt-text="Screenshot shows the Agents Toolkit icon in the activity bar after installation.":::
> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Install+Agents+Toolkit+for+Visual+Studio+Code+using+Marketplace&&author=%40zyxiaoyuer&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftoolkit%2Finstall-agents-toolkit%3Ftabs%3Dmarketplace%23install-agents-toolkit-for-visual-studio-code&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftoolkit%2Finstall-Agents-Toolkit.md&documentVersionIndependentId=8402fe47-1338-4cb0-9cc0-c35f06dc6ca5&platformId=857dcef4-57f6-1b0a-65f7-221c9f49c1c7&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

---

## Install a different release version

By default, Visual Studio Code automatically keeps Agents Toolkit up-to-date. If you want to install a different release version, follow these steps:

1. Select **Extensions** :::image type="icon" source="../assets/images/toolkit-v2/extension icon.png" border="false"::: from the Visual Studio Code activity bar.

1. Enter **Microsoft 365 Agents Toolkit** in the search box.

   :::image type="content" source="../assets/images/toolkit-v2/toolkit-fundamentals/toolkit-search1.png" alt-text="Screenshot shows the Agents Toolkit search and the result.":::

1. Select **Microsoft 365 Agents Toolkit**.

1. On the Agents Toolkit page, select the dropdown next to **Uninstall**.

1. Select **Install Specific Version...** from the dropdown list.

   :::image type="content" source="../assets/images/toolkit-v2/toolkit-fundamentals/install-another-version.png" alt-text="Screenshot shows the option to select other version of Visual Studio Code.":::

1. Select the required version to install.

   :::image type="content" source="../assets/images/toolkit-v2/toolkit-fundamentals/Olderversions of VS Code.png" alt-text="Screenshot shows versions other than the latest version of Visual Studio Code.":::

   Agents Toolkit installs the selected version.

 > [!div class="nextstepaction"]
 > [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Install+a+different+release+version&&author=%40zyxiaoyuer&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftoolkit%2Finstall-agents-toolkit%3Ftabs%3Dmarketplace%23install-a-different-release-version&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftoolkit%2Finstall-Agents-Toolkit.md&documentVersionIndependentId=8402fe47-1338-4cb0-9cc0-c35f06dc6ca5&platformId=857dcef4-57f6-1b0a-65f7-221c9f49c1c7&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Install a prerelease version

Agents Toolkit for Visual Studio Code extension is available in a prerelease version. To install a Agents Toolkit prerelease version, follow these steps:

1. Open **Visual Studio Code**.
1. Select **Extensions** :::image type="icon" source="../assets/images/toolkit-v2/toolkit-fundamentals/extension icon.png" border="false" alt-text="Screenshot shows the extension icon."::: from the Visual Studio Code activity bar.
1. Enter **Microsoft 365 Agents Toolkit** in the search box.
1. Click the dropdown arrow next to **Uninstall**.
   * If you're already on the **pre-release track**, choose **Install Specific Version...**. You will see a list of available **pre-release versions**.
   * If you're on the **stable track**, the **Install Specific Version...** option will only show **stable versions**.

> [!NOTE]
> The **Install Pre-Release Version** option may not appear depending on the update track of your currently installed **Microsoft 365 Agents Toolkit** extension. Use **Install Specific Version...** to manually select a version.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Install+a+prerelease+version&&author=%40zyxiaoyuer&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftoolkit%2Finstall-agents-toolkit%3Ftabs%3Dvscode%23install-a-prerelease-version&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftoolkit%2Finstall-Agents-Toolkit.md&documentVersionIndependentId=8402fe47-1338-4cb0-9cc0-c35f06dc6ca5&platformId=857dcef4-57f6-1b0a-65f7-221c9f49c1c7&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)


## Next step

> [!div class="nextstepaction"]
> [Create a new Teams app](~/toolkit/create-new-project.md)

## See also

- [Explore Microsoft 365 Agents Toolkit features](~/toolkit/explore-Teams-Toolkit.md)
- [Prepare to build apps](~/toolkit/build-environments.md)
