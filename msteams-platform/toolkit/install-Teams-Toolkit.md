---
title: Install Teams Toolkit 
author: zyxiaoyuer
description: In this module, learn installation of Teams Toolkit
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 07/29/2022
zone_pivot_groups: teams-app-platform
---

# Install Teams Toolkit

This article describes how to install the Teams Toolkit extension.

## Prerequisites

::: zone pivot="visual-studio-code"

Before installing Teams Toolkit for Visual Studio Code, you need to [download and install Visual Studio Code](https://code.visualstudio.com/Download).

::: zone-end

::: zone pivot="visual-studio"

Before installing Teams Toolkit for Visual Studio, you need to [download and install Visual Studio 2022](https://aka.ms/VSDownload) using the Visual Studio Installer.

::: zone-end

::: zone pivot="visual-studio-code"

## Install Teams Toolkit for Visual Studio Code

You can install Teams Toolkit using the Extensions window in Visual Studio Code, or install it from the Visual Studio Code Marketplace.

# [Visual Studio Code](#tab/vscode)

1. Launch **Visual Studio Code**.
1. Open the Extensions window (**Ctrl+Shift+X** or **View > Extensions**).

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/install toolkit-1_2.png" alt-text="Screenshot shows how to install.":::

1. Enter **Teams Toolkit** in the search box.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/install-toolkit-2_2.png" alt-text="Screenshot show the Toolkit.":::

1. Select **Install**.
  
   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/select-install-ttk_2.png" alt-text="Screenshot shows install toolkit 4.0.0.":::

   After successful installation of Teams Toolkit in Visual Studio Code, a Teams Toolkit icon appears in the Visual Studio Code activity bar.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/after-install_2.png" alt-text="Screenshot shows after install view.":::

# [Marketplace](#tab/marketplace)

1. Go to [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) in a web browser.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/install-ttk-marketplace_1.png" alt-text="Screenshot shows the installation of TTK Marketplace.":::

1. Select **Install**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/Install-ttk_1.png" alt-text="Screenshot shows how to install TTK.":::

1. From the pop-up window, select **Open** to launch Visual Studio Code.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/select-open_1.png" alt-text="Screenshot shows to select the open.":::

   The Teams Toolkit extension page is shown in Visual Studio Code:

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/ttk-in-vsc_1.png" alt-text="Screenshot shows how to select TTK in VSC." lightbox="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/ttk-in-vsc_1.png":::

1. Select **Install**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/select-install-ttk_2.png" alt-text="Screenshot shows how to select Install TTK in VSC.":::

   After successful installation of Teams Toolkit in Visual Studio Code, a Teams Toolkit icon appears in the Visual Studio Code activity bar.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/after-install_2.png" alt-text="Screenshot shows the after installation view.":::

---

## Install a different release version

By default, Visual Studio Code automatically keeps Teams Toolkit up-to-date. If you want to install a different release version, follow the steps:

* Select the Extensions icon from the Visual Studio Code activity bar.
* Enter **Teams Toolkit**  in the search box.

  :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/TeamsToolkit-search.png" alt-text="Search for Teams Toolkit.":::

* On the Teams Toolkit page, select the dropdown next to the **Uninstall** button.
* Select **Install Another Version...** from the dropdown.

  :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/InstallAnotherVersion.png" alt-text="Select other version of VS Code.":::

* Select the required version to install.

  :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/Olderversions of VS Code.png" alt-text="Other then the latest version of VS code.":::

## Install a pre-release version

The Teams Toolkit for Visual Studio Code extension is available on GitHub. To download pre-releases, go to the [releases page on GitHub](https://github.com/OfficeDev/TeamsFx/releases) and look for extension downloads marked as Pre-release.

::: zone-end

::: zone pivot="visual-studio"

## Install Teams Toolkit for Visual Studio

   > [!IMPORTANT]
   > We recommend you to use Visual Studio 2022 version 17.4.1 or later for Teams Toolkit, which is the latest release to fix several known issues in previous versions of Visual Studio.

1. Download the [Visual Studio installer](https://aka.ms/VSDownload), or open it if already installed.
2. Select **Install** or **Modify** if Visual Studio is already installed.
3. Select the **Workloads** tab, then select the **ASP.NET and web development** workload.
4. On the right, select the **Microsoft Teams development tools** in the Optional section of the Installation details panel.
5. Select **Install**.

   :::image type="content" source="../assets/images/teams-toolkit-overview/visual-studio-install_1_2.png" alt-text="Screenshot shows how to install Visual studio.":::

6. After the installation completes, select **Launch** to open Visual Studio.

    :::image type="content" source="../assets/images/teams-toolkit-overview/visual-studio-launch_1_2.png" alt-text="Screenshot shows how to launch visual studio.":::

::: zone-end

## Next steps

> [!div class="nextstepaction"]
> [create a new Teams project](create-new-project.md)

## See also

* [Explore Teams Toolkit](explore-Teams-Toolkit.md)
* [Prepare to build apps using Microsoft Teams Toolkit](build-environments.md)
* [Provision cloud resources using Teams Toolkit](provision.md)
* [Deploy Teams app to the cloud](deploy.md)
* [Create new Teams app in Visual Studio](create-new-project.md#create-new-teams-app-in-visual-studio)
* [Provision cloud resources using Visual Studio](provision-cloud-resources.md)
* [Deploy Teams app to the cloud using Visual Studio](deploy.md#deploy-teams-app-to-the-cloud-using-visual-studio)
