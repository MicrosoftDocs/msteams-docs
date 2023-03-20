---
title: Install Teams Toolkit 
author: zyxiaoyuer
description: Learn about installation of Teams Toolkit of different versions in Visual Studio Code, Visual Studio, and marketplace.
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 07/29/2022
zone_pivot_groups: teams-app-platform
---

# Install Teams Toolkit

## Prerequisites

::: zone pivot="visual-studio-code"

Before installing Teams Toolkit for Visual Studio Code, you need to [download and install Visual Studio Code](https://code.visualstudio.com/Download).

::: zone-end

::: zone pivot="visual-studio"

Before installing Teams Toolkit for Visual Studio, you need to [download and install Visual Studio 2022](https://aka.ms/VSDownload) using the Visual Studio Installer.

::: zone-end

::: zone pivot="visual-studio-code"

## Install Teams Toolkit for Visual Studio Code

You can install Teams Toolkit using **Extensions** in Visual Studio Code, or install it from the Visual Studio Code Marketplace.

# [Visual Studio Code](#tab/vscode)

1. Launch Visual Studio Code.
1. Select **View > Extensions** or **Ctrl+Shift+X**. You can also open extensions by selecting the extensions :::image type="icon" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/vsc-ext-icon.png" border="false"::: icon from the Visual Studio Code activity bar.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/install toolkit-1_2.png" alt-text="Screenshot shows how to install.":::

   The extensions marketplace pane appears.

1. Enter **Teams Toolkit** in the search box.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/install-toolkit-2_2_1.png" alt-text="Screenshot show the Toolkit.":::

   Teams Toolkit appears in the search result list.

1. Select **Teams Toolkit**, and then from the Teams Toolkit extension page that appears in the right pane, select  **Install**.
  
   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/select-install-ttk_2.png" alt-text="Screenshot shows install toolkit 4.0.0.":::

   After successful installation of Teams Toolkit in Visual Studio Code, the Teams Toolkit icon appears in the Visual Studio Code activity bar.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/after-install_2.png" alt-text="Screenshot shows after install view.":::

# [Marketplace](#tab/marketplace)

1. Go to [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) in a web browser.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/install-ttk-marketplace_1.png" alt-text="Screenshot shows the installation of TTK Marketplace.":::

1. Select **Install**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/Install-ttk_1.png" alt-text="Screenshot shows how to install TTK.":::

1. In the pop-up window that appears, select **Open**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/select-open_1.png" alt-text="Screenshot shows a pop-up window to open Visual Studio Code.":::

   Visual Studio Code opens with the Teams Toolkit extension page.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/ttk-in-vsc_1.png" alt-text="Screenshot shows how to select TTK in VSC." lightbox="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/ttk-in-vsc_1.png":::

1. Select **Install**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/select-install-ttk_2.png" alt-text="Screenshot shows how to select Install TTK in VSC.":::

   After successful installation of Teams Toolkit in Visual Studio Code, the Teams Toolkit icon appears in the Visual Studio Code activity bar.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/after-install_2.png" alt-text="Screenshot shows the after installation view.":::

---

## Install a different release version

By default, Visual Studio Code automatically keeps Teams Toolkit up-to-date. If you want to install a different release version, follow these steps:

1. Select **Extensions** :::image type="icon" source="../assets/images/teams-toolkit-v2/extension icon.png" border="false"::: from the Visual Studio Code activity bar.

1. Enter **Teams Toolkit** in the search box.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/TeamsToolkit-search.png" alt-text="Search for Teams Toolkit.":::

1. Select **Teams Toolkit**.

1. On the Teams Toolkit page, select the dropdown next to **Uninstall**.

1. Select **Install Another Version...** from the dropdown.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/InstallAnotherVersion.png" alt-text="Select other version of Visual Studio Code.":::

1. Select the required version to install.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/Olderversions of VS Code.png" alt-text="Screenshot shows versions other than the latest version of Visual Studio Code.":::

   Teams Toolkit installs the version you’ve selected.

## Install a pre-release version

The Teams Toolkit for Visual Studio Code extension is available in a pre-release version. To install a Teams Toolkit pre-release version, follow these steps:

1. Open **Visual Studio Code**.
1. Select **Extensions** :::image type="icon" source="../assets/images/teams-toolkit-v2/extension icon.png" border="false"::: from the Visual Studio Code activity bar.
1. Enter **Teams Toolkit** in the search box.
1. On the Teams Toolkit page, select the dropdown arrow next to **Install**.
1. Select **Install Pre-Release Version**.

::: zone-end

::: zone pivot="visual-studio"

## Install Teams Toolkit for Visual Studio

   > [!IMPORTANT]
   > It's recommend you use Visual Studio 2022 version 17.4.1 or later for Teams Toolkit. It is the latest release to fix several known issues in previous versions of Visual Studio.

1. Download the [Visual Studio installer](https://aka.ms/VSDownload), or open it if already installed.
1. Select **Install** or select **Modify** if you've already installed Visual Studio.

   Visual Studio installer shows all workloads, whether installed or available for installation.

   :::image type="content" source="../assets/images/teams-toolkit-overview/visual-studio-install_1_2.png" alt-text="Screenshot shows how to install Visual studio.":::

   Select the following options to install Teams Toolkit:
   1. Select the **Workloads** tab, then select the **ASP.NET and web development** workload.
   1. On the right, select the **Microsoft Teams development tools** in the **Optional** section of the **Installation details** panel.
   1. Select **Install**.

1. After the installation completes, select **Launch** to open Visual Studio.

    :::image type="content" source="../assets/images/teams-toolkit-overview/visual-studio-launch_1_2.png" alt-text="Screenshot shows how to launch visual studio.":::

Teams Toolkit menu options are available in Visual Studio only when an app project created using Teams Toolkit is open.

:::image type="content" source="../assets/images/teams-toolkit-overview/teams-toolkit-installed.png" alt-text="A screenshot showing Teams Toolkit menu options.":::

::: zone-end

## Next steps

> [!div class="nextstepaction"]
> [Explore Teams Toolkit](explore-Teams-Toolkit.md)

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals.md)
* [Prepare to build apps](build-environments.md)
* [Provision cloud resources](provision.md)
* [Deploy Teams app to the cloud](deploy.md)
* [Create new Teams app](create-new-project.md#create-new-teams-app-in-visual-studio)
