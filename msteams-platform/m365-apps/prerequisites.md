---
title: Set up your dev environment for extending Teams apps across Microsoft 365
description: Requirements to set up your dev environment for extending Teams apps across Microsoft 365. Know configurations required to run builds of Microsoft Teams and Microsoft 365 applications.
ms.date: 02/28/2023
ms.author: mosdevdocs
author: erikadoyle
ms.topic: conceptual
ms.localizationpriority: high
ms.subservice: m365apps
---
# Set up your dev environment for extending Teams apps across Microsoft 365

The development environment for extending Microsoft Teams apps across Microsoft 365 is similar to Teams development. This article discusses specific configurations required to run preview builds of Teams and Microsoft 365 applications in order to preview Teams apps running in Outlook and Microsoft 365 app.

To set up your development environment:

> [!div class="checklist"]
>
> * [Get Microsoft 365 Developer (Sandbox) Tenant and enable custom app upload](#prepare-a-developer-tenant-for-testing)
> * [Install Microsoft 365 Apps in your test environment](#install-microsoft-365-apps-in-your-test-environment)
> * [*Optional*] [Enroll your Microsoft 365 tenant in Microsoft 365 Targeted Releases](#enroll-your-developer-tenant-for-microsoft-365-targeted-releases-optional)
> * [*Optional*] [Install Beta Channel builds of Microsoft 365 Apps in your test environment](#install-microsoft-365-apps-in-your-test-environment)
> * [*Optional*] [Install Teams Toolkit extension for Microsoft Visual Studio Code](#install-visual-studio-code-and-teams-toolkit-extension)

## Prepare a Developer Tenant for testing

You need a Microsoft 365 developer subscription sandbox tenant to set up your dev environment. If you don't already have one, create a [sandbox tenant](/office/developer-program/microsoft-365-developer-program-get-started) or get a test tenant through your organization.

> [!NOTE]
> As you set up for testing, ensure that you sign out of all other accounts and sign in with the account you intend to use for testing.

You also need to enable custom app upload for your tenant:

 1. Sign in to [Teams admin center](https://admin.teams.microsoft.com/dashboard) with your test tenant credentials.

 1. Go to **Teams apps** > **Manage apps**.

 1. At the top right, select **Org-wide app settings**.

 1. Under Custom apps, turn on the **Interaction with custom apps** toggle and **Save**.

    :::image type="content" source="images/teams-admin-enable-sideloading.png" alt-text="The screenshot is an example that enables custom app upload from the Teams Admin Center":::

 1. Apart from Org-wide app settings, custom app policy settings also allow users to upload custom apps to Teams. For more information, see [manage custom app policies and settings](/microsoftteams/teams-custom-app-policies-and-settings#custom-app-policy-and-settings).

 1. In the Teams admin center, go to **Teams apps** > **Setup policies**, and then select **Global (Org-wide default) policy**.

 1. Turn on **Upload custom apps**, and select **Save**.

## Enroll your developer tenant for Microsoft 365 Targeted Releases (Optional)

> [!NOTE]
> It can take up to five days after creating a [Microsoft 365 developer sandbox tenant](/office/developer-program/microsoft-365-developer-program-get-started) and enrolling in [Microsoft 365 Targeted Releases](#enroll-your-developer-tenant-for-microsoft-365-targeted-releases-optional) for uploaded Teams apps to appear in Outlook and Microsoft 365 app.

This section is optional and only required for any features in **preview**, as listed in [Teams apps across Microsoft 365](overview.md) app element support table. To enroll your test tenant for Microsoft 365 Targeted Releases:

1. Sign in to [Microsoft 365 admin center](https://admin.microsoft.com) with your test tenant credentials.
1. Go to **Settings** > **Org Settings** > **Organization profile**.
1. Select **Release preferences**.
1. Select any *Targeted Release* preference:
    1. **Targeted Release for everyone**
    1. **Targeted Release for select users**

    :::image type="content" source="images/m365-admin-center-targeted-releases.png" alt-text="The screenshot is an example that shows the Microsoft 365 admin center 'Release preferences' menu with Targeted Release option selected.":::

1. Select **Save**.

For more information on Microsoft 365 release options, see [set up the Standard or Targeted Release options](/microsoft-365/admin/manage/release-options-in-office-365?view=o365-worldwide&preserve-view=true#targeted-release) in *Microsoft 365 admin center help*.

## Install Microsoft 365 apps in your test environment

### Desktop

Based on the test scenario, you can preview Teams apps running in Outlook on Windows desktop by using a [Microsoft 365 Apps update channel](/deployoffice/change-update-channels?WT.mc_id=M365-MVP-5002016) for your tenant.

To install Microsoft 365 applications in your test environment:

1. Sign in to your test environment with your test tenant credentials.
1. Download and run the [Office Deployment Tool](https://www.microsoft.com/download/details.aspx?id=49117).
1. Select a local folder to store the extracted files.
1. Go to the local folder and open *configuration-Office365-x86.xml* (or **x64.xml*, depending on your environment) in a text editor. Ensure the [*Channel*](/DeployOffice/office-deployment-tool-configuration-options#channel-attribute-part-of-updates-element) value is set according to the scenario you're testing:

    | **Outlook scenario** | **Update channel** |
    |---------------|--------------|
    |Teams personal tabs in Outlook | `Current`|
    |Teams search-based message extensions in Outlook | `Current`|
    |Outlook Add-ins | `BetaChannel` |
    |Meeting apps in Outlook | `Current` |

1. Open Command Prompt and go to the local folder path.
1. Run `setup.exe /configure configuration-Office365-x86.xml` (or use the **x64.xml* file, depending on your setup).
1. Open Outlook (desktop client) and set up the mail account using your test tenant credentials.
1. Open **File** > **Office Account** > **About Outlook** to confirm you're running a Microsoft 365 *Current Channel* build of Outlook.

1. Verify that *Microsoft Edge WebView2 Runtime* is installed. Open Windows **Start** > **Apps & features**, and search for **webview**:

    :::image type="content" source="images/windows-addremove-webview2.png" alt-text="The screenshot shows the search field in your Windows settings.":::

    If it's not listed, install [Microsoft Edge WebView2](https://developer.microsoft.com/microsoft-edge/webview2/) to your test environment.

### Mobile

#### Android

Install the Microsoft 365 app to preview your Teams personal tab app running on your physical Android device or Android emulator:

1. Ensure you're using a Google Play [supported Android device](https://support.google.com/googleplay/answer/1727131).
1. Launch the **Play Store** on your Android device.
1. Search for a supported host for running Teams apps:
    1. For Microsoft 365 app (formerly Office), search office and select *Microsoft 365 app*.
    1. For Outlook, search outlook and select *Microsoft Outlook*.
1. Select the **Install** button.

    :::image type="content" source="images/office-android-install.png" alt-text="The screenshot is an example that shows the install button for the Office (Microsoft 365) app in Google Play Store.":::

1. Launch the Microsoft 365 app and sign in with your test tenant credentials.
1. Open your profile **(Me) > Settings** and scroll to the bottom of the menu.
1. Ensure that you use Microsoft 365 app version 16.0.15726.20000 or later and Outlook app version 4.2247.1 (52247812) or later for Android.

#### iOS

You can preview Teams personal tabs running in Outlook and Microsoft 365 app for iOS by installing the prerelease version on the [TestFlight app](https://testflight.apple.com/) on your iOS device.

1. To access the preview version on TestFlight, reach out to the product group through your CSAM/Account Manager for an Invitation.
1. Install the TestFlight app from the **App Store** on your testing device of choice.
1. Open your email invitation, accept the email invitation, or follow the public link invitation to install the Beta app.
1. Launch the Outlook app and sign in with your test tenant credentials.
1. Open your profile **(Me) > Settings** and scroll to the bottom of the menu.
1. Ensure that you use Microsoft 365 app version 2.72.23030700 or later and Outlook app version 4.2310.0 (18999702) or later for iOS.

## Install Visual Studio Code and Teams Toolkit extension

Optionally, you can use [Visual Studio Code](https://code.visualstudio.com/) to extend Teams apps into Microsoft 365 and Outlook.

The extension [Teams Toolkit for Visual Studio Code](https://aka.ms/teams-toolkit) (`v2.10.0` or later) provides commands that can help modify your existing Teams code to be compatible with Outlook and Microsoft 365. For more information, see [enable Teams personal tab for Microsoft 365 and Outlook](extend-m365-teams-personal-tab.md).

## Next step

Create or update a Teams app to run across Microsoft 365:

> [!div class="nextstepaction"]
> [Enable a Teams personal tab for Microsoft 365 and Outlook](extend-m365-teams-personal-tab.md)
> [!div class="nextstepaction"]
> [Enable a Teams message extension for Outlook](extend-m365-teams-message-extension.md)

## See also

[Extend Teams apps across Microsoft 365](overview.md)
