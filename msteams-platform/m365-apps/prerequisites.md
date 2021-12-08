---
title: Set up your dev environment for extending Teams apps across Microsoft 365
description: Here are the prerequisites for extending your Teams apps across Microsoft 365
ms.date: 11/15/2021
ms.topic: how-to
---
# Set up your dev environment for extending Teams apps across M365

> [!NOTE]
> Extend teams app across Microsoft 365 is currently available only in [public developer preview](../../../resources/dev-preview/developer-preview-intro.md).

The development environment for extending Teams apps across Microsoft 365 is similar to Microsoft Teams development. This article discusses specific configurations required to run preview builds of Microsoft Teams and Microsoft Office applications in order to preview Teams apps running in Outlook and Office.

To set up your development environment:

> [!div class="checklist"]
> * [Get a M365 Developer (Sandbox) Tenant and enable sideloading](#Prepare-a-developer-tenant-and-enable-sideloading)
> * [Enroll M365 tenant in *Office 365 Targeted Releases*](#enroll-your-developer-tenant-for-office-365-targeted-releases)
> * [Configure your account to access preview versions of Outlook and Office](#install-beta-office-apps-in-your-test-environment)
> * [Switch to the Developer Preview version of Teams](#switch-to-the-developer-preview-version-of-teams)
> * [Install Teams Toolkit extension for Visual Studio Code](#install-visual-studio-code-and-teams-toolkit-preview-extension) [*Optional*]

## Get a Developer Tenant and enable sideloading

1. Create a [Microsoft 365 developer subscription sandbox tenant](/office/developer-program/microsoft-365-developer-program-get-started) or obtain a test tenant through your organization. If you already have a developer tenant account skip this step.
1. Enable sideloading for your tenant. To enable sideloading, see [enable sideloading](/microsoftteams/platform/concepts/build-and-test/prepare-your-o365-tenant#enable-custom-teams-apps-and-turn-on-custom-app-uploading). 
1. Verify if sideloading is enabled to your developer tenant. To verify:
   1. Sign in to Teams
   1. Select **Apps** and then check for **Upload a custom app** option.

:::image type="content" source="images/teams-sideloading-enabled.png" alt-text="Upload a custom app option":::

## Enroll your developer tenant for Office 365 targeted releases

> [!IMPORTANT]
> Refer to the latest updates on [Microsoft Teams - Microsoft 365 Developer Blog](https://devblogs.microsoft.com/microsoft365dev/) to check if Outlook and Office support for Teams apps is available to your test tenant.

To preview Teams apps running in outlook.com or office.com, opt in your test tenant to Office 365 Targeted releases. (This step is not in context with the heading)

To enroll your developer tenant for Office 365 targeted releases:

1. Sign in to [Microsoft 365 admin centre](https://admin.microsoft.com/Adminportal/Home?source=applauncher#/homepage#/) with your developer tenant credentials.
1. Go to **Settings** > **Org Setting**.
1. Under Organization profile tab, Go to **Organizational profile**.
1. Select **Release preferences**.
1. Select any one Targeted release preference:
   1. **Target release for everyone**
   1. **Target release for select users**

    :::image type="content" source="images/m365-admin-center-targeted-releases.png" alt-text="Targeted release option" lightbox="images/m365-admin-center-targeted-releases.png":::

For more information on Office 365 release options, see [Set up the Standard or Targeted release options](/microsoft-365/admin/manage/release-options-in-office-365) in *Microsoft 365 admin center help*. 

Verify tenant support:

* For Teams personal tabs running on office and outlook, sign in to Microsoft 365 admin center with your test tenant credentials and check for ellipses (**...**) option on the lower left pane.

    :::image type="content" source="images/outlook-desktop-ellipses.png" alt-text="More Apps" lightbox="images/outlook-desktop-ellipses.png":::

* For messaging extensions in outlook, check for **More apps** option in the Outlook compose message area.

> [!NOTE]
> If you have selected a Targeted release preference and still don't see these options, it's likely that the preview feature support is in the process of rolling out to your tenant. For the latest updates, see [Microsoft Teams Developer Blog](https://devblogs.microsoft.com/microsoft365dev/category/teams/). 

(The verification options and note are not required in this heading)

## Install Beta Office apps in your test environment

> [!IMPORTANT]
> Refer to the latest updates on [Microsoft Teams - Microsoft 365 Developer Blog](https://devblogs.microsoft.com/microsoft365dev/) to check if Outlook for Windows desktop support for Teams message extensions is available to your test tenant.

You can preview Teams apps running in Outlook and Office by using a recent *Beta Channel build*. Check if you have to [Change the Microsoft 365 Apps update channel](/deployoffice/change-update-channels?WT.mc_id=M365-MVP-5002016) for your test tenant to install an Office 365 Beta Channel build. 

To install Office 365 *Beta Channel* applications in your test environment:
1. In your test environment, sign in to [Microsoft 365 admin center](https://admin.microsoft.com) with your developer tenant account.
1.	From the admin center, select **Install Office**.
    1. You can add a test user [Optional].
1.	Download the [Office Deployment Tool](https://www.microsoft.com/download/details.aspx?id=49117) and extract to a local folder.
1.	Open *configuration-Office365-x86.xml* (or the **x64.xml*, depending on your environment) in a text editor and update the Channel value to `BetaChannel`.
1.	Open **Command Prompt** and run `setup.exe /configure configuration-Office365-x86.xml` (or use the *x64.xml file, depending on your setup).
1.	Open **Outlook** (desktop client) and login with your developer tenant credentials.
1.	Go to **File** > **Office Account** > **About Outlook**.
1.	If you see the build number is 14416 or higher and the channel is Beta Channel, you're running Outlook for Microsoft 365 beta Channel build.

Verify tenant support:

* For Teams personal tabs running on office and outlook, sign in to [Microsoft 365 admin center](https://admin.microsoft.com) with your developer tenant credentials and check for ellipses (**...**) option on the lower left pane.

    :::image type="content" source="images/outlook-desktop-ellipses.png" alt-text="More Apps" lightbox="images/outlook-desktop-ellipses.png":::

* For messaging extensions in outlook, check for **More apps** option in the Outlook compose message area.

> [!NOTE]
> If you have selected a Targeted releases preference and still don't see these options, it's likely that the preview feature support is in the process of rolling out to your tenant. For the latest updates, see [Microsoft Teams Developer Blog](https://devblogs.microsoft.com/microsoft365dev/). 

## Switch to the Developer Preview version of Teams

Ensure that you switch to the Public Developer Preview from your Microsoft Teams client.

To switch to Public Developer Preview:

1. Sign in to Teams with your sandbox tenant account.
1. From the ellipsis (**...**) menu next to your user profile, select **About** > **Developer preview**. A dialog appears, select **Switch to developer preview**.
1. After the Teams app restarts, go to the ellipsis (**...**) menu next to your user profile.
1. Check if the version is changed to **Public Developer Preview**.

    :::image type="content" source="images/teams-dev-preview.png" alt-text="Public developer preview" lightbox="images/teams-dev-preview.png":::

## Install Visual Studio Code and Teams Toolkit Preview extension [*Optional*] 

You can use [Visual Studio Code](https://code.visualstudio.com/) to extend Teams apps into Office and Outlook.

The extension [Teams Toolkit for Visual Studio Code](https://aka.ms/teams-toolkit) (`v2.10.0` or later) provides commands that can help modify your existing Teams code to be compatible with Outlook and Office. For more information, see [enable Teams personal tab for Office and Outlook](extend-m365-teams-personal-tab.md).

## Next steps

- [Enable a Teams personal tab for Office and Outlook](extend-m365-teams-personal-tab.md)
- [Enable a Teams messaging extension for Outlook](extend-m365-teams-message-extension.md)