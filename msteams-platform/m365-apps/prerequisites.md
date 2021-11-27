---
title: Set up your dev environment for extending Teams apps across Microsoft 365
description: Here are the prerequisites for extending your Teams apps across Microsoft 365
ms.date: 11/15/2021
ms.topic: how-to
---
# Set up your dev environment for extending Teams apps across M365 (preview)

The development environment for extending Teams apps across Microsoft 365 is similar to Microsoft Teams development.

You can preview Teams apps running in Outlook and Office using Microsoft Teams and Microsoft Office preview builds. This article describes the specific configurations required to run the preview builds. 

To set up your development environment:

> [!div class="checklist"]
> * [Set up M365 Developer (Sandbox) Tenant and enable sideloading](#set-up-a-developer-tenant-for-testing)
> * [Enroll M365 tenant in *Office 365 Targeted Releases*](#enroll-your-developer-tenant-for-office-365-targeted-releases)
> * [Configure your account to access preview versions of Outlook and Office](#install-beta-office-apps-in-your-test-environment)
> * [Switch to the Developer Preview version of Teams](#switch-to-the-developer-preview-version-of-teams)
> * [Install Teams Toolkit extension for Visual Studio Code](#install-visual-studio-code-and-teams-toolkit-preview-extension)[*Optional*]

## Set up a Developer Tenant for testing

To set up a developer tenant for testing:

1. Create a [Microsoft 365 developer subscription sandbox tenant](/office/developer-program/microsoft-365-developer-program-get-started) or get a test tenant through your organization.
1. After you create a tenant, you'll need to enable sideloading for your tenant. To enable sideloading, see [enable sideloading](/microsoftteams/platform/concepts/build-and-test/prepare-your-o365-tenant#enable-custom-teams-apps-and-turn-on-custom-app-uploading).

> [!Note]  
> To verify if sideloading is enabled. Sign in to Teams, select **Apps** and check for **Upload a custom app** option.

[[Sideloading is enabled for your tenant if you see the option to 'Upload a custom app' from the Teams 'Apps' pane](../images/teams-sideloading-enabled.png)](../images/teams-sideloading-enabled.png#lightbox)

## Enroll your developer tenant for Office 365 targeted releases

> [!IMPORTANT]
> Refer to the latest updates on [Microsoft Teams - Microsoft 365 Developer Blog](https://devblogs.microsoft.com/microsoft365dev/category/teams/) to check if outlook.com and office.com support for Teams apps is available to your test tenant.

To preview Teams apps running in outlook.com or office.com:

1. Sign in to Microsoft 365 admin centre with your sandbox tenant account.
1. Go to **Settings** > **Org Setting**.
1. Under Organization profile tab, Go to [Organizational profile](https://admin.microsoft.com/AdminPortal/Home?#/Settings/OrganizationProfile).
1. Select Release preferences.
1. Select any one Targeted release preferences:
   1. Target release for everyone
   1. Target release for select users

[[Microsoft 365 admin center 'Release preferences' menu with Targeted release option selected](../images/m365-admin-center-targeted-releases.png)](../images/m365-admin-center-targeted-releases.png#lightbox)

For more information on Office 365 release options, see [Set up the Standard or Targeted release options](/microsoft-365/admin/manage/release-options-in-office-365).

* To verify if your tenant has support for Teams personal tabs running on office.com and outlook.com, sign in to Microsoft 365 admin center with your test tenant credentials and check for ellipses (**...**) option on the lower left pane.
* To verify test tenant support for messaging extensions in outlook.com, check for **More apps** option in the Outlook compose message area.

[[Ellipses '...' entry point to sideloaded Teams tab apps in outlook.com](/msteams-platform/m365-apps/images/outlook-web-ellipses.png)](/msteams-platform/m365-apps/images/outlook-web-ellipses.png#lightbox)


> [!NOTE]
> If you have selected a Targeted releases preference and still don't see these options, it's likely that the preview feature support is in the process of rolling out to your tenant. For the latest updates, see [Microsoft Teams Developer Blog](https://devblogs.microsoft.com/microsoft365dev/category/teams/). 

## Install Beta Office apps in your test environment

> [!IMPORTANT]
> Refer to the latest updates on [Microsoft Teams - Microsoft 365 Developer Blog](https://devblogs.microsoft.com/microsoft365dev/category/teams/) to check if Outlook for Windows desktop support for Teams message extensions is available to your test tenant.

You can preview Teams apps running in Outlook on Windows desktop by using a recent *Beta Channel build*. Check if you have to [Change the Microsoft 365 Apps update channel](/deployoffice/change-update-channels?WT.mc_id=M365-MVP-5002016) for your test tenant to install an Outlook Beta Channel build. 

To install Office 365 *Beta Channel* applications in your test environment:
1.	Sign in to [Microsoft 365 admin center](https://admin.microsoft.com) with your sandbox tenant account.
1.	From the admin center, select **Install Office**.
    1. You can add a test user [Optional].
1.	Download the [Office Deployment Tool](https://www.microsoft.com/download/details.aspx?id=49117) and extract to a local folder.
1.	Open *configuration-Office365-x86.xml* (or the **x64.xml*, depending on your environment) in a text editor and update the Channel value to `BetaChannel`.
1.	Open **Command Prompt** and run `setup.exe /configure configuration-Office365-x86.xml` (or use the *x64.xml file, depending on your setup).
1.	Open **Outlook** (desktop client) and login with your test tenant credentials.
1.	Go to **File** > **Office Account** > **About Outlook**.
1.	If you see the build number is 14416 or higher and the channel is Beta Channel, you're running Outlook for Microsoft 365 beta Channel build.
1.	At the upper right, turn on the **Coming Soon** toggle.

  [[Coming Soon' button in Outlook desktop toggled to 'On'](../images/outlook-coming-soon.png)](../images/outlook-coming-soon.png#lightbox)

* To verify if your tenant has support for Teams personal tabs running on office.com and outlook.com, sign in to Microsoft 365 admin center with your test tenant credentials and check for ellipses (**...**) option on the lower left pane.
* To verify test tenant support for messaging extensions in outlook.com, check for **More apps** option in the Outlook compose message area.

[[Ellipses '...' entry point to sideloaded Teams tab apps in Outlook for desktop](../images/outlook-desktop-ellipses.png)](../images/outlook-desktop-ellipses.png#lightbox)

> [!NOTE]
> If you have selected a Targeted releases preference and still don't see these options, it's likely that the preview feature support is in the process of rolling out to your tenant. For the latest updates, see [Microsoft Teams Developer Blog](https://devblogs.microsoft.com/microsoft365dev/category/teams/). 

## Switch to the Developer Preview version of Teams

To switch to [*Public Developer Preview*](../resources/dev-preview/developer-preview-intro.md) from your Microsoft Teams client:

1. Sign in to Teams with your sandbox tenant account.
1. From the ellipsis (**...**) menu next to your user profile, select **About** > **Developer preview**. A dialog appears, select **Switch to developer preview**.
1. After the Teams app restarts, go to the ellipsis (**...**) menu next to your user profile.
1. Check if the version is changed to **Public Developer Preview**.

[[From Teams ellipses menu, open 'About' and verify 'Developer Preview](../images/teams-dev-preview.png)](../images/teams-dev-preview.png#lightbox)

## Install Visual Studio Code and Teams Toolkit Preview extension 
[*Optional*]

You can use [Visual Studio Code](https://code.visualstudio.com/) to extend Teams apps into Office and Outlook.

The extension [Teams Toolkit for Visual Studio Code](https://aka.ms/teams-toolkit) (`v2.10.0` or later) provides commands that can help modify your existing Teams code to be compatible with Outlook and Office. For more information, see [enable Teams personal tab for Office and Outlook](extend-m365-teams-personal-tab.md).

## Next steps

- [Enable a Teams personal tab for Office and Outlook](extend-m365-teams-personal-tab.md)
- [Enable a Teams messaging extension for Outlook](extend-m365-teams-message-extension.md)