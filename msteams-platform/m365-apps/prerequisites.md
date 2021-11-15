---
title: Set up your dev environment for extending Teams apps across Microsoft 365
description: Here are the prerequisites for extending your Teams apps across Microsoft 365
ms.date: 11/15/2021
ms.topic: how-to
---
# Set up your dev environment for extending Teams apps across M365 (preview)

The development environment for extending Teams apps across Microsoft 365 is similar to what you use for Microsoft Teams development. This article discusses specific configurations required to run preview builds of Microsoft Teams and Microsoft Office applications in order to preview Teams apps running in Outlook and Office. To set up your development environment, you'll need to:

> [!div class="checklist"]
> * [Obtain an M365 Developer (Sandbox) Tenant and enable sideloading](#prepare-a-developer-tenant-for-testing)
> * [Enroll your M365 tenant in *Office 365 Targeted Releases*](#enroll-your-developer-tenant-for-office-365-targeted-releases)
> * [Configure your account to access preview versions of Outlook and Office](#install-beta-office-apps-in-your-test-environment)
> * [Switch to the Developer Preview version of Teams](#switch-to-the-developer-preview-version-of-teams)
> * [*Optional*] [Install Teams Toolkit extension for Visual Studio Code](#install-visual-studio-code-and-teams-toolkit-preview-extension)

## Prepare a Developer Tenant for testing

If you don't already have one, create a [Microsoft 365 developer subscription](/office/developer-program/microsoft-365-developer-program-get-started) sandbox tenant or obtain a test tenant through your organization.

After you have a tenant, you'll need to [enable sideloading](/microsoftteams/platform/concepts/build-and-test/prepare-your-o365-tenant#enable-custom-teams-apps-and-turn-on-custom-app-uploading) for your tenant by signing in to [Microsoft 365 admin center](https://admin.microsoft.com) and navigating to Show All > Teams > Teams apps > Setup policies > **Global**.  Toggle on **Upload custom apps** and **Save**.

If you have an existing tenant, verify that sideloading is enabled by signing in to Teams and selecting **Apps**. You will see the **Upload a custom app** option if sideloading is enabled for your tenant.

:::image type="content" source="images/teams-sideloading-enabled.png" alt-text="Sideloading is enabled for your tenant if you see the option to 'Upload a custom app' from the Teams 'Apps' panel":::

## Enroll your developer tenant for Office 365 targeted releases

> [!IMPORTANT]
> Refer to the latest in [Microsoft Teams - Microsoft 365 Developer Blog](https://devblogs.microsoft.com/microsoft365dev/category/teams/) to check if outlook.com and office.com support for Teams apps is available to your test tenant.

To preview Teams apps running in outlook.com or office.com, opt in your test tenant to Office 365 [Targeted releases](/microsoft-365/admin/manage/release-options-in-office-365#targeted-release).

1. Sign in to Microsoft 365 admin center using credentials for your test tenant and navigate to the [Organizational profile](https://admin.microsoft.com/AdminPortal/Home?#/Settings/OrganizationProfile) tab. Select **Release preferences** and select one of the *Targeted release* preferences:

:::image type="content" source="images/m365-admin-center-targeted-releases.png" alt-text="Microsoft 365 admin center 'Release preferences' menu with Targeted release option selected":::

For more information on Office 365 release options, see [Set up the Standard or Targeted release options](/microsoft-365/admin/manage/release-options-in-office-365) in *Microsoft 365 admin center help*.

1. Verify your tenant has support for Teams personal tabs running on office.com and outlook.com by signing in with your test tenant credentials. If you see an ellipses (**...**) option on the side bar (the entry point for sideloaded Teams personal tabs), your tenant has support.

:::image type="content" source="images/outlook-web-ellipses.png" alt-text="Ellipses '...' entry point to sideloaded Teams tab apps in outlook.com":::

1. Verify test tenant support for messaging extensions in outlook.com by checking for the **More apps** option in the Outlook compose message area.
``

> [!NOTE]
> If you're opted in to targeted releases but you don't see these options, it's likely that preview feature support is still in the process of rolling out to your tenant. For the latest updates, see [Microsoft Teams Developer Blog](https://devblogs.microsoft.com/microsoft365dev/category/teams/).

## Install Beta Office apps in your test environment

> [!IMPORTANT]
> Refer to the latest [Microsoft Teams - Microsoft 365 Developer Blog](https://devblogs.microsoft.com/microsoft365dev/category/teams/) to check if Outlook for Windows desktop support for Teams message extensions is available to your test tenant.

You can preview Teams apps running in Outlook on Windows desktop by using a recent *Beta Channel* build. To install an Outlook Beta Channel build in your test environment, you'll probably need to [Change the Microsoft 365 Apps update channel](/deployoffice/change-update-channels?WT.mc_id=M365-MVP-5002016) for your test tenant.

Here are the steps for installing Office 365 *Beta Channel* applications in your test environment:

1. In your test environment, sign in to Microsoft 365 admin center (https://admin.microsoft.com) using the credentials that you created for your test tenant (for example, *username*@*domain*.onmicrosoft.com).
1. From the admin center, select **Install Office** (or *Go to guided setup*) to install desktop apps in your test environment. Optionally, add a test user (useful for testing).
1. Download the [Office Deployment Tool](https://www.microsoft.com/download/details.aspx?id=49117) and extract to a local folder.
1. Open *configuration-Office365-x86.xml* (or the **x64.xml*, depending on your environment) in a text editor and update the *Channel* value to `BetaChannel`.
1. From an elevated Command Prompt, run `setup.exe /configure configuration-Office365-x86.xml` (or use the **x64.xml* file, depending on your setup).
1. Open Outlook (desktop client) and set up the mail account using your test tenant credentials.
1. In Outlook, open **File** > **Office Account** > **About Outlook**, and confirm that you are now on the *Beta Channel* and that your build number is **14416** or higher.
1. Toggle on the **Coming Soon** button in the corner of your Outlook client window:

   :::image type="content" source="images/outlook-coming-soon.png" alt-text="'Coming Soon' button in Outlook desktop toggled to 'On'}":::

You can verify your tenant supports Teams personal tabs running on Outlook for Windows desktop by signing in with your test tenant credentials and looking for an ellipses (**...**) option on the side bar (the entry point for sideloaded Teams personal tabs).

:::image type="content" source="images/outlook-desktop-ellipses.png" alt-text="Ellipses '...' entry point to sideloaded Teams tab apps in Outlook for desktop":::

Similarly, you can verify test tenant support for messaging extensions in Outlook for Windows desktop by checking for the **More apps** option in the Outlook compose message ribbon.

If you're opted in to targeted releases but you don't see these ellipses options, it's likely that preview feature support is still in the process of rolling out to your tenant. For the latest updates, see [Microsoft Teams Developer Blog](https://devblogs.microsoft.com/microsoft365dev/category/teams/).

## Switch to the Developer Preview version of Teams

Ensure that you opt in to the [*Public Developer Preview*](../resources/dev-preview/developer-preview-intro) from your Microsoft Teams client.

1. Sign in to Teams with your sandbox tenant account.
1. From the ellipsis (**...**) menu next to your user profile, select **About** and select the **Developer preview** option.
1. After the dialog appears, select **Switch to developer preview** to restart Teams and check that Developer Preview is now enabled.

:::image type="content" source="images/teams-dev-preview.png" alt-text="From Teams ellipses menu, open 'About' and verify 'Developer Preview' option is checked":::

## Install Visual Studio Code and Teams Toolkit Preview extension

Optionally, you can take advantage of [Visual Studio Code](https://code.visualstudio.com/) to help extend Teams apps into Office and Outlook.

The extension [Teams Toolkit for Visual Studio Code](https://aka.ms/teams-toolkit) (`v2.10.0` or later) provides commands that can help modify your existing Teams code to be compatible with Outlook and Office. Continue to [enable Teams personal tab for Office and Outlook](extend-m365-teams-personal-tab.md) to learn more.

## Next steps

- [Enable a Teams personal tab for Office and Outlook](extend-m365-teams-personal-tab.md)
- [Enable a Teams messaging extension for Outlook](extend-m365-teams-message-extension.md)