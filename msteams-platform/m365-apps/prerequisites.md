---
title: Set up your dev environment for extending Teams apps across Microsoft 365
description: Here are the prerequisites for extending your Teams apps across Microsoft 365
ms.date: 05/24/2022
ms.custom: m365apps
ms.localizationpriority: high
---
# Set up your dev environment for extending Teams apps across Microsoft 365

The development environment for extending Teams apps across Microsoft 365 is similar to Microsoft Teams development. This article discusses specific configurations required to run preview builds of Microsoft Teams and Microsoft Office applications in order to preview Teams apps running in Outlook and Office.

To set up your development environment:

> [!div class="checklist"]
>
> * [Get Microsoft 365 Developer (Sandbox) Tenant and enable sideloading](#prepare-a-developer-tenant-for-testing)
> * [Enroll your Microsoft 365 tenant in *Office 365 Targeted Releases*](#enroll-your-developer-tenant-for-office-365-targeted-releases)
> * [Install Beta Channel builds of Microsoft 365 Apps in your test environment](#install-office-apps-in-your-test-environment)
> * [Switch to the Developer Preview version of Teams](#switch-to-the-developer-preview-version-of-teams)
> * [*Optional*] [Install Teams Toolkit extension for Microsoft Visual Studio Code](#install-visual-studio-code-and-teams-toolkit-extension)

## Prepare a Developer Tenant for testing

You need a Microsoft 365 developer subscription sandbox tenant to set up your dev environment. If you don't already have one, create a [sandbox tenant](/office/developer-program/microsoft-365-developer-program-get-started) or get a test tenant through your organization.

You'll also need to enable sideloading for your tenant:

1. Sign in to Microsoft 365 admin center (https://admin.microsoft.com) with your test tenant credentials and select **Teams** from the side panel to open the *Microsoft Teams admin center*
1. Select: Teams apps > Manage apps > **Org-wide app settings**
1. Under **Custom apps**, toggle on the option *Interaction with custom apps*

    :::image type="content" source="images/teams-admin-enable-sideloading.png" alt-text="Enable sideloading for custom apps from the Teams admin center":::

## Enroll your developer tenant for Office 365 Targeted releases

> [!Important]
> It can take up to five days after creating a [Microsoft 365 developer sandbox tenant](/office/developer-program/microsoft-365-developer-program-get-started) and enrolling in [Office 365 Targeted releases](#enroll-your-developer-tenant-for-office-365-targeted-releases) for sideloaded Teams apps to appear in Outlook and Office.

To enroll your test tenant for Office 365 targeted releases:

1. Sign in to [Microsoft 365 admin center](https://admin.microsoft.com) with your test tenant credentials.
1. Go to **Settings** > **Org Settings** > **Organization profile**.
1. Select **Release preferences**.
1. Select any *Targeted release* preference:
    1. **Target release for everyone**
    1. **Target release for select users**

    :::image type="content" source="images/m365-admin-center-targeted-releases.png" alt-text="Microsoft 365 admin center 'Release preferences' menu with Targeted release option selected":::

1. Select **Save**.

For more information on Office 365 release options, see [Set up the Standard or Targeted release options](/microsoft-365/admin/manage/release-options-in-office-365?view=o365-worldwide&preserve-view=true#targeted-release) in *Microsoft 365 admin center help*.

## Install Office apps in your test environment

You can preview Teams apps running in Outlook on Windows desktop by using a recent *Beta Channel build*. Check if you have to [Change the Microsoft 365 Apps update channel](/deployoffice/change-update-channels?WT.mc_id=M365-MVP-5002016) for your test tenant to install an Office 365 Beta Channel build.

To install Office 365 Beta Channel applications in your test environment:

1. Sign in to your test environment with your test tenant credentials.
1. Download the [Office Deployment Tool](https://www.microsoft.com/download/details.aspx?id=49117) and extract to a local folder.
1. Go to the local folder and open *configuration-Office365-x86.xml* (or **x64.xml*, depending on your environment) in a text editor and update the *Channel* value to `BetaChannel`.
1. Open Command Prompt and navigate to the local folder path.
1. Run `setup.exe /configure configuration-Office365-x86.xml` (or use the **x64.xml* file, depending on your setup).
1. Open Outlook (desktop client) and set up the mail account using your test tenant credentials.
1. Open **File** > **Office Account** > **About Outlook** to confirm you're running a Microsoft 365 *Beta Channel* build of Outlook.

    :::image type="content" source="images/outlook-about-beta-channel.png" alt-text="Go to 'About Outlook' from your Office Account to verify you are running a Beta Channel build.":::

1. Verify that *Microsoft Edge WebView2 Runtime* is installed. Open Windows **Start** > **Apps & features**, and search for **webview**:

    :::image type="content" source="images/windows-addremove-webview2.png" alt-text="Search for 'webview' under 'Apps and features' in your Windows Settings":::

    If it's not listed, install [Microsoft Edge WebView2](https://developer.microsoft.com/microsoft-edge/webview2/) to your test environment.

## Switch to the Developer Preview version of Teams

Ensure that you switch to the [Public Developer Preview](../resources/dev-preview/developer-preview-intro.md) from your Microsoft Teams client.

1. Sign in to Teams with your sandbox tenant credentials.
1. From the ellipsis (**...**) menu next to your user profile, select **About** > **Developer preview**. A dialog appears, select **Switch to developer preview**.
1. After the Teams app restarts, go to the ellipsis (**...**) menu next to your user profile and check if **Developer Preview** is selected.

    :::image type="content" source="images/teams-dev-preview.png" alt-text="Public developer preview option in Teams":::

## Install Visual Studio Code and Teams Toolkit extension

Optionally, you can use [Visual Studio Code](https://code.visualstudio.com/) to extend Teams apps into Office and Outlook.

The extension [Teams Toolkit for Visual Studio Code](https://aka.ms/teams-toolkit) (`v2.10.0` or later) provides commands that can help modify your existing Teams code to be compatible with Outlook and Office. For more information, see [enable Teams personal tab for Office and Outlook](extend-m365-teams-personal-tab.md).

## Next step

Create or update a Teams app to run across Microsoft 365:

* [Enable a Teams personal tab for Office and Outlook](extend-m365-teams-personal-tab.md)
* [Enable a Teams message extension for Outlook](extend-m365-teams-message-extension.md)
