---
title: Set up your dev environment for extending Teams apps across Microsoft 365
description: Here are the prerequisites for extending your Teams apps across Microsoft 365
ms.date: 02/11/2022 
ms.localizationpriority: high
---
# Set up your dev environment for extending Teams apps across Microsoft 365

> [!NOTE]
> Extend teams app across Microsoft 365 is currently available only in [public developer preview](~/resources/dev-preview/developer-preview-intro.md).

The development environment for extending Teams apps across Microsoft 365 is similar to Microsoft Teams development. This article discusses specific configurations required to run preview builds of Microsoft Teams and Microsoft Office applications in order to preview Teams apps running in Outlook and Office.

To set up your development environment:

> [!div class="checklist"]
>
> * [Get Microsoft 365 Developer (Sandbox) Tenant and enable sideloading](#prepare-a-developer-tenant-for-testing)
> * [Enroll your Microsoft 365 tenant in *Office 365 Targeted Releases*](#enroll-your-developer-tenant-for-office-365-targeted-releases)
> * [Configure your account to access preview versions of Outlook and Office](#install-office-apps-in-your-test-environment)
> * [Switch to the Developer Preview version of Teams](#switch-to-the-developer-preview-version-of-teams)
> * [*Optional*] [Install Teams Toolkit extension for Microsoft Visual Studio Code](#install-visual-studio-code-and-teams-toolkit-preview-extension)

## Prepare a Developer Tenant for testing

You need a Microsoft 365 developer subscription sandbox tenant to set up your dev environment. If you don't already have one, create a [sandbox tenant](/office/developer-program/microsoft-365-developer-program-get-started) or get a test tenant through your organization.

After you have a tenant, you need to enable sideloading for your tenant, see [enable sideloading](/microsoftteams/platform/concepts/build-and-test/prepare-your-o365-tenant#enable-custom-teams-apps-and-turn-on-custom-app-uploading). To verify if sideloading is enabled, sign in to Teams, select **Apps** and then check for **Upload a custom app** option.

:::image type="content" source="images/teams-sideloading-enabled.png" alt-text="Upload a custom app option":::

## Enroll your developer tenant for Office 365 Targeted releases

> [!IMPORTANT]
> Refer to the latest updates on [Microsoft Teams - Microsoft 365 Developer Blog](https://devblogs.microsoft.com/microsoft365dev/) to check if Outlook.com and Office.com support for Teams apps is available to your test tenant.

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

> [!IMPORTANT]
> Refer to the latest updates on [Microsoft Teams - Microsoft 365 Developer Blog](https://devblogs.microsoft.com/microsoft365dev/) to check if Outlook for Windows desktop support for Teams message extensions is available to your test tenant.

You can preview Teams apps running in Outlook on Windows desktop by using a recent *Beta Channel build*. Check if you have to [Change the Microsoft 365 Apps update channel](/deployoffice/change-update-channels?WT.mc_id=M365-MVP-5002016) for your test tenant to install an Office 365 Beta Channel build.

To install Office 365 Beta Channel applications in your test environment:

1. Sign in to your test environment with your test tenant credentials.
1. Download the [Office Deployment Tool](https://www.microsoft.com/download/details.aspx?id=49117) and extract to a local folder.
1. Go to the local folder and open *configuration-Office365-x86.xml* (or **x64.xml*, depending on your environment) in a text editor and update the *Channel* value to `BetaChannel`.
1. Open Command Prompt and navigate to the local folder path.
1. Run `setup.exe /configure configuration-Office365-x86.xml` (or use the **x64.xml* file, depending on your setup).
1. Open Outlook (desktop client) and set up the mail account using your test tenant credentials.
1. Open **File** > **Office Account** > **About Outlook**.  
   If the build number is **14416** or higher and the channel is *Beta Channel*, you're running Microsoft 365 beta Channel build.
1. In the top-right corner, turn on the **Coming Soon** toggle.

    :::image type="content" source="images/outlook-coming-soon.png" alt-text="'Coming Soon' toggle option in Outlook":::

> [!NOTE]
> You may need to close Outlook and restart your computer for the *Coming Soon* button to appear.

You can verify test tenant support for your tenant account:

* For Teams personal tabs running on office.com, outlook.com, and Outlook for Windows desktop, sign in with your test tenant credentials and check for ellipses (**...**) option on the left sidebar of Office or Outlook.

    :::image type="content" source="images/outlook-desktop-ellipses.png" alt-text="Ellipses ('...') option on the left sidebar of Outlook":::

* For message extensions in outlook.com and Outlook for Windows, check for **More Apps** option at the bottom of the Outlook compose message pane.

    :::image type="content" source="images/outlook-web-compose-more-apps.png" alt-text="'More apps' option in the Outlook compose message pane":::

> [!NOTE]
> If you're opted in to Beta Channel releases but you don't see these ellipses options, it's likely that preview feature support is in the process of rolling out to your tenant. For the latest updates, see [Microsoft Teams Developer Blog](https://devblogs.microsoft.com/microsoft365dev/).

## Switch to the Developer Preview version of Teams

Ensure that you switch to the [Public Developer Preview](../resources/dev-preview/developer-preview-intro.md) from your Microsoft Teams client.

1. Sign in to Teams with your sandbox tenant credentials.
1. From the ellipsis (**...**) menu next to your user profile, select **About** > **Developer preview**. A dialog appears, select **Switch to developer preview**.
1. After the Teams app restarts, go to the ellipsis (**...**) menu next to your user profile and check if **Developer Preview** is selected.

    :::image type="content" source="images/teams-dev-preview.png" alt-text="Public developer preview option in Teams":::

## Install Visual Studio Code and Teams Toolkit Preview extension

Optionally, you can use [Visual Studio Code](https://code.visualstudio.com/) to extend Teams apps into Office and Outlook.

The extension [Teams Toolkit for Visual Studio Code](https://aka.ms/teams-toolkit) (`v2.10.0` or later) provides commands that can help modify your existing Teams code to be compatible with Outlook and Office. For more information, see [enable Teams personal tab for Office and Outlook](extend-m365-teams-personal-tab.md).

## Next steps

* [Enable a Teams personal tab for Office and Outlook](extend-m365-teams-personal-tab.md)
* [Enable a Teams message extension for Outlook](extend-m365-teams-message-extension.md)
