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

To use DevTools with the Teams iOS client, you need to enable it first.

### Prerequisites

To access DevTools for an iOS client, ensure you meet the following requirements:

* Mac system with Safari.
* Teams iOS version 6.10.0 or later. You can download Microsoft Teams for iOS from the [AppStore](https://aka.ms/teamsmobiledownload).

### Activate DevTools for your iOS client

To activate DevTools:

1. Confirm whether the user or tenant is activated for targeted release. If not, you need to enable it.

   For more information, see [targeted release for entire organization](/microsoft-365/admin/manage/release-options-in-office-365?view=o365-worldwide.md#targeted-release-for-entire-organization&preserve-view=true).

   > [!IMPORTANT]
   > After enabling the user or the tenant for targeted release, allow 24 hours for the settings to take effect. After this period, try signing out and then signing back in on the Teams iOS client to confirm its activation.

1. Sign in to the Teams iOS app and activate the developer preview. For more information about developer preview, see [public developer preview for Teams](../../resources/dev-preview/developer-preview-intro.md).

1. Activate the Web Inspector in Safari and the iOS client. For more information on Web Inspector, see [enabling Web Inspector](https://webkit.org/web-inspector/enabling-web-inspector/).

1. Connect your iOS client to your Mac system. When prompted, confirm that you trust the client and give your consent to allow the connection.

1. Open Teams on your connected iOS client, and open your app inside Teams.

1. On your Mac system, open Safari. You'll find your client listed under the **Develop** option.

1. Select the connected client to view the inspection link for your app.

   :::image type="content" source="../../assets/images/devtools/app-inspection-link.png" alt-text="The screenshot displays the app inspection link for your application." lightbox="../../assets/images/devtools/app-inspection-link.png":::

1. Select the link to open Safari Web Inspector for your app.

   :::image type="content" source="../../assets/images/devtools/safari-web-inspector.png" alt-text="The screenshot displays the Web Inspector in Safari." lightbox="../../assets/images/devtools/safari-web-inspector.png":::

   You can now utilize DevTools for your iOS client.

## See also

* [Test your app](../../concepts/build-and-test/test-app-overview.md)
* [Clear the Teams client cache](/microsoftteams/troubleshoot/teams-administration/clear-teams-cache)
* [Build tabs for Teams](../what-are-tabs.md)
