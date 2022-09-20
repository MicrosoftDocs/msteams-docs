---
title: Install Teams Toolkit 
author: zyxiaoyuer
description: In this module, learn Installation of Teams Toolkit
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 07/29/2022
zone_pivot_groups: teams-app-platform
---

# Install Teams Toolkit

Teams Toolkit is an extension in both Visual Studio and Visual Studio Code. In this document you can learn, how to install Teams Toolkit.

::: zone pivot="visual-studio-code"

## Install Teams Toolkit in Visual Studio Code

Before you start with installation, you need to have Visual Studio Code and Teams client installed. You can install Teams Toolkit from an extension in Visual Studio Code and from Visual Studio Code Marketplace.

To install Teams Toolkit:

# [Visual Studio Code](#tab/vscode)

1. Open **Visual Studio Code**.
1. Select the Extensions view (**Ctrl+Shift+X** / **⌘⇧-X** or **View > Extensions**).

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/install toolkit-1.png" alt-text="install":::

1. Enter **Teams Toolkit** in the search box.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/install-toolkit2.png" alt-text="Toolkit":::

1. Select **Install**.
  
   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/select-install-ttk.png" alt-text="install toolkit 4.0.0":::

   After successful installation of Teams Toolkit in Visual Studio Code, Teams Toolkit icon appears in the Visual Studio Code toolbar.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/after-install.png" alt-text="After install":::

# [Marketplace](#tab/marketplace)

1. Open [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension).

   The following page appears.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/install-ttk-marketplace.png" alt-text="install TTK Marketplace":::

1. Select **Install**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/Install-ttk.png" alt-text="install TTK":::

1. From the pop-up window, select **Open**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/select-open.png" alt-text="Select the open":::

   The following Visual Studio Code page appears.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/ttk-in-vsc.png" alt-text="Select TTK in VSC":::

1. Select **Install**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/select-install-ttk.png" alt-text="Select Install TTK in VSC":::

   After successful installation of Teams Toolkit in Visual Studio Code, Teams Toolkit icon appears in the Visual Studio Code toolbar.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/after-install.png" alt-text="After install":::

---

#### Upgrade Teams Toolkit

Teams Toolkit is upgraded to the latest version by default. The following steps help you to install different version:

* Select the Extensions :::image type="icon" source="../assets/images/teams-toolkit-v2/extension icon.PNG"::: icon.
* Enter **Teams Toolkit**  in the search box.
* In Teams Toolkit extension, select :::image type="icon" source="../assets/images/teams-toolkit-v2/setting icon.PNG"::: icon.
* Select **Install Another Version** for upgrade to the latest version of Teams Toolkit.

::: zone-end

::: zone pivot="visual-studio"

## Install Teams Toolkit in Visual Studio

Before you start with installation, you need to install Visual Studio Installer. You can download the latest Visual Studio Installer from the [Visual Studio download page](https://visualstudio.microsoft.com/vs/preview/).

To install Teams Toolkit:

1. Open the Visual Studio Installer.

    The Visual Studio installer opens with the **Workloads** tab.

1. Select the Teams Toolkit workload for installation.

   :::image type="content" source="../assets/images/teams-toolkit-overview/select-workloads.png" alt-text="Select workloads during Visual Studio installation":::

    1. Select the **ASP.NET and web development** workload.

        The ASP.NET and web development workloads available for installation appear in the **Installation details** panel.

    1. Select **Optional** > **Microsoft Teams development tools** from the  **Installation details** panel.

1. Select **Install**.

   The Visual Studio installer adds the Teams Toolkit to Visual Studio.

   :::image type="content" source="../assets/images/teams-toolkit-overview/install-teams-toolkit.png" alt-text="Install Teams Toolkit in Visual Studio":::

1. Select **Launch** to open Visual Studio.

    :::image type="content" source="../assets/images/teams-toolkit-overview/visual-studio-launch_1.png" alt-text="Launch visual studio":::

   > [!IMPORTANT]
   > It's recommended that you download Visual Studio 2022 version 17.3.3 as Teams Toolkit for Visual Studio is GA in this version. This article is written for Visual Studio 2022 version 17.3.3. Teams Toolkit version 17.3.* or higher.

::: zone-end

## See also

* [Explore Teams Toolkit](explore-Teams-Toolkit.md)
* [Create a new Teams app using Teams Toolkit](create-new-project.md)
* [Prepare to build apps using Microsoft Teams Toolkit](build-environments.md)
* [Provision cloud resources using Teams Toolkit](provision.md)
* [Deploy Teams app to the cloud](deploy.md)
* [Create new Teams app in Visual Studio](create-new-teams-app-for-Visual-Studio.md)
* [Provision cloud resources using Visual Studio](provision-cloud-resources.md)
* [Deploy Teams app to the cloud using Visual Studio](deploy-teams-app.md)
