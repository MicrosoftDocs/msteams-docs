---
title: DevTools for Teams Desktop & Mobile
description: Learn about DevTools for Microsoft Teams tabs and how to access and debug DevTools using Teams desktop or mobile client (Android).
ms.localizationpriority: medium
ms.topic: how-to
ms.date: 08/29/2022
---

# DevTools for Microsoft Teams tabs

When Teams is running in a browser, it's easy to access the browser's DevTools: F12 on Windows or Command-Option-I on macOS. The DevTools gives you access to:

1. View console logs.
1. View or modify HTML, CSS, and network requests during runtime.
1. Add breakpoints to your JavaScript code and perform interactive debugging.

> [!NOTE]
> The feature is only available for desktop and Android clients after the **Developer Preview** has been enabled. For more information, see [How do I enable developer preview](~/resources/dev-preview/developer-preview-intro.md).

## Access DevTools on the desktop

While the web version and the desktop version of Teams are almost the same, there are some differences concerning authentication. Sometimes the only way to figure out what is going on is to use the DevTools. To use DevTools in the desktop client, you must:

1. Ensure you have enabled [Enable developer preview](../../resources/dev-preview/developer-preview-intro.md#enable-developer-preview).
1. Open up a tab so you have something to inspect with the DevTools.
1. Open the DevTools one of the following ways:
    * On Windows, you open DevTools via the Microsoft Teams icon in the desktop tray.

      :::image type="content" source="../../assets/images/dev-preview/devtools-right-click.png" alt-text="Screenshot shows the option to open DevTools from Windows desktop.":::

    * On macOS, select the Microsoft Teams icon in the Dock.

      :::image type="content" source="../../assets/images/dev-preview/mac-os-developer-tools.PNG" alt-text="Screenshot shows the option to open DevTools from macOS dock.":::

The following example shows DevTools open and inspecting a tab configuration dialog:

   :::image type="content" source="../../assets/images/dev-preview/tab-and-devtools.png" alt-text="Screenshot shows the Tab and DevTools." lightbox="../../assets/images/dev-preview/tab-and-devtools.png":::

## Access DevTools from an Android device

You can also enable the DevTools from the Teams Android client. To enable DevTools, you must:

1. DevTools for Android is available only on the beta version of Teams app. To join the beta version of Teams app, follow the instructions listed in [Get beta versions of apps.](https://support.google.com/googleplay/answer/7003180?hl=en#:~:text=Get%20beta%20versions%20of%20apps)

   :::image type="content" source="~/assets/images/tabs/android-beta-dev-tools.png" alt-text="Screenshot shows the option to join the beta.":::

1. Enable the [developer preview](~/resources/dev-preview/developer-preview-intro.md).
1. Connect your device to your desktop computer, and set up your Android device for [remote debugging](https://developers.google.com/web/tools/chrome-devtools/remote-debugging/).
1. In your Chrome browser, open `chrome://inspect/#devices`.
1. Select **inspect** under the tab you wish to debug, as in the following image:

   :::image type="content" source="../../assets/images/android-devtools.png" alt-text="Screenshot shows the Android DevTools.":::

## Access DevTools for an iOS client

For accessing DevTools for the Teams iOS client, You must enable it for the Teams iOS client.

### Prerequisites

Ensure the following requirements are met for accessing DevTools for an iOS device:

* Mac system with Safari.
* Teams iOS version 6.10.0 or later. You can download Teams iOS from [Appstore](https://aka.ms/teamsmobiledownload).

### Activate DevTools for your iOS client

To activate DevTools:

1. Validate if the user or the tenant is enabled for targeted release. If it isn't enabled, you must enable it.

   For more information, see [targeted release for entire organization](/microsoft-365/admin/manage/release-options-in-office-365?view=o365-worldwide.md#targeted-release-for-entire-organization&preserve-view=true).

   > [!IMPORTANT]
   > After you've enabled the user or the tenant for targeted release, it takes 24 hours for the targeted release settings to take effect. After 24 hours, you can try logging out and logging in from Teams iOS client to ensure that it is active.

1. Log into Teams iOS app, and enable developer preview. For more information about developer preview, see [public developer preview for Teams](../../resources/dev-preview/developer-preview-intro.md).

1. Enable Web Inspector in Safari and the iOS device. For more information on Web Inspector, see [enabling Web Inspector](https://webkit.org/web-inspector/enabling-web-inspector/).

1. Connect your iOS device to your Mac system.

   You're prompted to confirm if you trust the device. You must consent for allowing to connect your iOS device to the Mac system.

1. Open Teams on your connected iOS device, and open your app inside Teams.

1. Go to Safari on your Mac system.

   Your device appears under the **Develop** option.

1. Select your connected device to see your app’s inspection link.

   :::image type="content" source="../../assets/images/devtools/app-inspection-link.png" alt-text="This screenshot shows the app inspection link for your app." lightbox="../../assets/images/devtools/app-inspection-link.png":::

1. Select the link to open Safari Web Inspector for your app.

    :::image type="content" source="../../assets/images/devtools/safari-web-inspector.png" alt-text="This screenshot shows the Safari web inspector." lightbox="../../assets/images/devtools/safari-web-inspector.png":::

   You can now use DevTools for your iOS device.

## See also

* [Test your app](../../concepts/build-and-test/test-app-overview.md)
* [Clear the Teams client cache](/microsoftteams/troubleshoot/teams-administration/clear-teams-cache)
* [Build tabs for Teams](../what-are-tabs.md)
