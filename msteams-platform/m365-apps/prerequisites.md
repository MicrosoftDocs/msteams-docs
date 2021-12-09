---
title: Set up your dev environment for extending Teams apps across Microsoft 365
description: Here are the prerequisites for extending your Teams apps across Microsoft 365
ms.date: 11/15/2021
ms.topic: how-to
ms.custom: m365apps
---
# Set up your dev environment for extending Teams apps across M365

> [!NOTE]
> Extend teams app across Microsoft 365 is currently available only in [public developer preview](~/resources/dev-preview/developer-preview-intro.md).

The development environment for extending Teams apps across Microsoft 365 is similar to Microsoft Teams development. This article discusses specific configurations required to run preview builds of Microsoft Teams and Microsoft Office applications in order to preview Teams apps running in Outlook and Office.

To set up your development environment:

> [!div class="checklist"]
> * [Obtain an M365 Developer (Sandbox) Tenant and enable sideloading](#prepare-a-developer-tenant-for-testing)
> * [Enroll your M365 tenant in *Office 365 Targeted Releases*](#enroll-your-developer-tenant-for-office-365-targeted-releases)
> * [Configure your account to access preview versions of Outlook and Office](#install-office-apps-in-your-test-environment)
> * [Switch to the Developer Preview version of Teams](#switch-to-the-developer-preview-version-of-teams)
> * [*Optional*][Install Teams Toolkit extension for Visual Studio Code](#install-visual-studio-code-and-teams-toolkit-preview-extension)

## Prepare a Developer Tenant for testing

If you don't already have one, create a [Microsoft 365 developer subscription sandbox tenant](/office/developer-program/microsoft-365-developer-program-get-started) or obtain a test tenant through your organization. 

After you have a tenant account, you need to enable sideloading for your tenant. See [enable sideloading](/microsoftteams/platform/concepts/build-and-test/prepare-your-o365-tenant#enable-custom-teams-apps-and-turn-on-custom-app-uploading). To verify if sideloading is enabled to your tenant, sign in to Teams, select **Apps** and then check for **Upload a custom app** option.

:::image type="content" source="images/teams-sideloading-enabled.png" alt-text="Upload a custom app option":::

## Enroll your developer tenant for Office 365 Targeted releases

> [!IMPORTANT]
> Refer to the latest updates on [Microsoft Teams - Microsoft 365 Developer Blog](https://devblogs.microsoft.com/microsoft365dev/) to check if Outlook.com and Office.com support for Teams apps is available to your test tenant.

To enroll your tenant for Office 365 targeted releases:

1. Sign in to Microsoft 365 admin center using credentials for your test tenant and navigate to the [Organizational profile](https://admin.microsoft.com/AdminPortal/Home?#/Settings/OrganizationProfile) tab (*Settings* > *Org settings* >> **Organization profile**)). Select **Release preferences** and select one of the *Targeted release* preferences:

  :::image type="content" source="images/m365-admin-center-targeted-releases.png" alt-text="Microsoft 365 admin center 'Release preferences' menu with Targeted release option selected":::

  For more information on Office 365 release options, see [Set up the Standard or Targeted release options](/microsoft-365/admin/manage/release-options-in-office-365) in *Microsoft 365 admin center help*.

1. Verify your tenant has support for Teams personal tabs running on office.com and outlook.com by signing in with your test tenant credentials. If you see an ellipses (**...**) option on the side bar (the entry point for sideloaded Teams personal tabs), your tenant has support.

  :::image type="content" source="images/outlook-web-ellipses.png" alt-text="Ellipses '...' entry point to sideloaded Teams tab apps in outlook.com":::

1. Verify test tenant support for messaging extensions in outlook.com by checking for the **More apps** option in the Outlook compose message area.

> [!NOTE]
> If you're opted in to Targeted releases but you don't see these options, it's likely that preview feature support is still in the process of rolling out to your tenant. For the latest updates, see [Microsoft Teams Developer Blog](https://devblogs.microsoft.com/microsoft365dev/category/teams/).

## Install Office apps in your test environment

> [!IMPORTANT]
> Refer to the latest updates on [Microsoft Teams - Microsoft 365 Developer Blog](https://devblogs.microsoft.com/microsoft365dev/) to check if Outlook for Windows desktop support for Teams message extensions is available to your tenant.

You can preview Teams apps running in Outlook on Windows desktop by using a recent *Beta Channel build*. Check if you have to [Change the Microsoft 365 Apps update channel](/deployoffice/change-update-channels?WT.mc_id=M365-MVP-5002016) for your tenant to install an Office 365 Beta Channel build.

1. Log into your test environment using your test tenant account.
1. Download the [Office Deployment Tool](https://www.microsoft.com/download/details.aspx?id=49117) and extract to a local folder.
1. Open *configuration-Office365-x86.xml* (or the **x64.xml*, depending on your environment) in a text editor and update the *Channel* value to `BetaChannel`.
1. From an elevated Command Prompt, run `setup.exe /configure configuration-Office365-x86.xml` (or use the **x64.xml* file, depending on your setup).
1. Open Outlook (desktop client) and set up the mail account using your test tenant credentials.
1. In Outlook, open **File** > **Office Account** > **About Outlook**, and confirm that you are now on the *Beta Channel* and that your build number is **14416** or higher.
1. Toggle on the **Coming Soon** button in the corner of your Outlook client window:

  > [!NOTE]
  > You may need to close Outlook and restart your computer for the *Coming Soon* button to appear.

You can verify your tenant supports Teams personal tabs running on Outlook for Windows desktop by signing in with your test tenant credentials and looking for an ellipses (**...**) option on the side bar (the entry point for sideloaded Teams personal tabs).

    :::image type="content" source="images/outlook-desktop-ellipses.png" alt-text="More Apps" lightbox="images/outlook-desktop-ellipses.png":::

* For messaging extensions in outlook.com and Outlook for Windows, check for **More apps** option in the Outlook compose message area.

> [!NOTE]
> If you're opted in to Beta Channel releases but you don't see these ellipses options, it's likely that preview feature support is still in the process of rolling out to your tenant. For the latest updates, see [Microsoft Teams Developer Blog](https://devblogs.microsoft.com/microsoft365dev/category/teams/).

## Switch to the Developer Preview version of Teams

Ensure that you switch to the Public Developer Preview from your Microsoft Teams client.

To switch to Public Developer Preview:

1. Sign in to Teams with your tenant credentials.
1. From the ellipsis (**...**) menu next to your user profile, select **About** > **Developer preview**. A dialog appears, select **Switch to developer preview**.
1. After the Teams app restarts, go to the ellipsis (**...**) menu next to your user profile.
1. Check if the version is changed to **Public Developer Preview**.

    :::image type="content" source="images/teams-dev-preview.png" alt-text="Public developer preview" lightbox="images/teams-dev-preview.png":::

## Install Visual Studio Code and Teams Toolkit Preview extension

Optionally, you can use [Visual Studio Code](https://code.visualstudio.com/) to extend Teams apps into Office and Outlook.

The extension [Teams Toolkit for Visual Studio Code](https://aka.ms/teams-toolkit) (`v2.10.0` or later) provides commands that can help modify your existing Teams code to be compatible with Outlook and Office. For more information, see [enable Teams personal tab for Office and Outlook](extend-m365-teams-personal-tab.md).

## Next steps

- [Enable a Teams personal tab for Office and Outlook](extend-m365-teams-personal-tab.md)
- [Enable a Teams messaging extension for Outlook](extend-m365-teams-message-extension.md)