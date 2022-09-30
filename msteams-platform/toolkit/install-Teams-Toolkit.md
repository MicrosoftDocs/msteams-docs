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

Before installing Teams Toolkit for Visual Studio Code, you'll need to [download and install Visual Studio Code](https://code.visualstudio.com/Download).

::: zone-end

::: zone pivot="visual-studio"

Before installing Teams Toolkit for Visual Studio, you'll need to [download and install Visual Studio 2022](https://aka.ms/VSDownload) using the Visual Studio Installer.

::: zone-end

::: zone pivot="visual-studio-code"

## Install Teams Toolkit for Visual Studio Code

You can install Teams Toolkit using the Extensions window in Visual Studio Code, or install it from the Visual Studio Marketplace.

# [Visual Studio Code](#tab/vscode)

1. Launch **Visual Studio Code**.
1. Open the Extensions window (**Ctrl+Shift+X** / **⌘⇧-X** or **View > Extensions**).

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/install toolkit-1.png" alt-text="Screenshot shows how to install.":::

1. Enter **Teams Toolkit** in the search box.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/install-toolkit2.png" alt-text="Screenshot show the Toolkit.":::

1. Select **Install**.
  
   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/select-install-ttk.png" alt-text="Screenshot shows install toolkit 4.0.0.":::

   After successful installation of Teams Toolkit in Visual Studio Code, a Teams Toolkit icon appears in the Visual Studio Code toolbar.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/after-install.png" alt-text="Screenshot shows after install view.":::

# [Marketplace](#tab/marketplace)

1. Go to [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) in a web browser.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/install-ttk-marketplace.png" alt-text="Screenshot shows the installation of TTK Marketplace.":::

1. Select **Install**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/Install-ttk.png" alt-text="Screenshot shows how to install TTK.":::

1. From the pop-up window, select **Open** to launch Visual Studio Code.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/select-open.png" alt-text="Select the open":::

   The Teams Toolkit extension page is shown in Visual Studio Code:

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/ttk-in-vsc.png" alt-text="Screenshot shows how to select TTK in VSC":::

1. Select **Install**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/select-install-ttk.png" alt-text="Screenshot shows how to select Install TTK in VSC.":::

   After successful installation of Teams Toolkit in Visual Studio Code, a Teams Toolkit icon appears in the Visual Studio Code toolbar.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/after-install.png" alt-text="Screenshot shows the after installation view.":::

---

## Installing a different release version

By default, Visual Studio Code will automatically keep Teams Toolkit up-to-date. If you want to install a different version, follow these steps:

* Select the Extensions (:::image type="icon" source="../assets/images/teams-toolkit-v2/extension icon.PNG":::) icon from the Visual Studio Code toolbar.
* Enter **Teams Toolkit**  in the search box.
* On the Teams Toolkit page, select the drop-down arrow next to the **Uninstall** button.
* Select **Install Another Version...** from the menu and choose which version to install.

## Installing a pre-release version

The Teams Toolkit for Visual Studio Code extension is also available on GitHub. To download pre-releases, navigate to the [Releases page on GitHub](https://github.com/OfficeDev/TeamsFx/releases) and look for extension downloads marked as Pre-release.

::: zone-end

::: zone pivot="visual-studio"

## Install Teams Toolkit for Visual Studio

   > [!IMPORTANT]
   > We recommend using Visual Studio 2022 version 17.3.3 or newer for Teams Toolkit, which is the latest release to fix several known issues in previous versions of Visual Studio.

1. [Download the Visual Studio installer](https://aka.ms/VSDownload), or open it if already installed.
2. Select **Install**, or **Modify** if Visual Studio is already installed.
3. Select the **Workloads** tab, then select the **ASP.NET and web development** workload.
4. On the right, select the **Microsoft Teams development tools** in the **Optional** section of the **Installation details** panel.
5. Select **Modify** or **Install** to complete the installation.

   :::image type="content" source="../assets/images/teams-toolkit-overview/visual-studio-install_1.png" alt-text="Screenshot shows how to install Visual studio.":::

6. After the installation completes, select **Launch** to open Visual Studio..

    :::image type="content" source="../assets/images/teams-toolkit-overview/visual-studio-launch_1.png" alt-text="Screenshot shows how to launch visual studio.":::

::: zone-end

## Next steps

Now that Teams Toolkit is installed, visit [Create a new Teams project](create-new-project.md) to get started.

## See also

* [Explore Teams Toolkit](explore-Teams-Toolkit.md)
* [Create a new Teams app using Teams Toolkit](create-new-project.md)
* [Prepare to build apps using Microsoft Teams Toolkit](build-environments.md)
* [Provision cloud resources using Teams Toolkit](provision.md)
* [Deploy Teams app to the cloud](deploy.md)
* [Create new Teams app in Visual Studio](create-new-teams-app-for-Visual-Studio.md)
* [Provision cloud resources using Visual Studio](provision-cloud-resources.md)
* [Deploy Teams app to the cloud using Visual Studio](deploy-teams-app.md)
