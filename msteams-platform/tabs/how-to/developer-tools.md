---
title: Dev Tools for Teams Desktop & Mobile
description: Learn about Dev Tools for Microsoft Teams tabs and how to access and debug Dev Tools using Teams desktop or mobile client (Android).
ms.localizationpriority: medium
ms.topic: how-to
ms.date: 08/22/2024
---

# Dev Tools for Microsoft Teams tabs

When Teams is running in a browser, it's easy to access the browser's Dev Tools. To access Dev Tools in Windows press F12 and in macOS press Command-Option-I. Dev Tools gives you access to:

- View console logs.
- View or modify HTML, CSS, and network requests during runtime.
- Add breakpoints to your JavaScript code and perform interactive debugging.

> [!NOTE]
> Dev Tools is only available for desktop and Android clients. To access Dev Tools, you must enable [**Public preview**](~/resources/dev-preview/developer-preview-intro.md#desktop-or-web-client).

## Access Dev Tools on desktop

While the web version and the desktop version of Teams are almost same, there are some differences with authentication. Sometimes the only way to figure out what's going on is to use Dev Tools. To use Dev Tools in the desktop client, follow these steps:

1. Enable [**Public preview**](../../resources/dev-preview/developer-preview-intro.md#desktop-or-web-client). You must restart Teams to view the Dev Tools option.

1. Open a tab to inspect with Dev Tools.
1. Open Dev Tools in one of the following ways:
    - On Windows: Open the desktop tray and right-click to select the Microsoft Teams icon. Select **Open Dev Tools**:

      :::image type="content" source="../../assets/images/dev-preview/devtools-right-click.png" lightbox="../../assets/images/dev-preview/devtools-right-click.png" alt-text="Screenshot shows the option to open Dev Tools from Windows desktop.":::

    - On macOS: Select **Open Dev Tools**:

      :::image type="content" source="../../assets/images/dev-preview/mac-os-developer-tools.png" alt-text="Screenshot shows the option to open Dev Tools from macOS dock.":::

    The following example shows DevTools:
    :::image type="content" source="../../assets/images/dev-preview/tab-and-devtools.png" alt-text="Screenshot shows the Tab and DevTools." lightbox="../../assets/images/dev-preview/dev-tools-exp.png":::

## Access DevTools from Teams Android client

You can enable DevTools in the Teams Android client. To enable DevTools, follow these steps:

1. DevTools for Android is available only on the beta version of Teams app. To join the beta version of Teams app, follow the instructions listed in [Get beta versions of apps.](https://support.google.com/googleplay/answer/7003180?hl=en#:~:text=Get%20beta%20versions%20of%20apps)

   :::image type="content" source="~/assets/images/tabs/android-beta-dev-tools.png" alt-text="Screenshot shows the option to join the beta.":::

1. Enable [**Public preview**](../../resources/dev-preview/developer-preview-intro.md#mobile-client). You must restart Teams to view the Dev Tools option.
1. Connect your device to your desktop computer, and set up your Teams Android client for [remote debugging](https://developers.google.com/web/tools/chrome-devtools/remote-debugging/).
1. In your Chrome browser, open `chrome://inspect/#devices`.
1. Select **inspect** under the tab you wish to debug, as in the following image:

   :::image type="content" source="../../assets/images/android-devtools.png" alt-text="Screenshot shows the Android DevTools." lightbox="../../assets/images/android-devtools.png":::

## Access DevTools for Teams iOS client

You can access DevTools on your Teams iOS client. This involves meeting the necessary prerequisites and following the steps to activate it.

### Prerequisites

To access DevTools for a Teams iOS client, ensure you meet the following requirements:

- Mac system with Safari.
- Teams iOS version 6.10.0 or later. You can download Microsoft Teams for iOS from the [AppStore](https://aka.ms/teamsmobiledownload).

### Activate DevTools for your Teams iOS client

To activate DevTools:

1. Confirm whether the user or the tenant is activated for targeted release. If not, you need to enable it.

   For more information, see [targeted release for entire organization](/microsoft-365/admin/manage/release-options-in-office-365?view=o365-worldwide.md#targeted-release-for-entire-organization&preserve-view=true).

   > [!IMPORTANT]
   > After enabling the user or the tenant for targeted release, allow 24 hours for the settings to take effect. After this period, try signing out and then signing back in on the Teams iOS client to confirm its activation.

1. Sign in to the Teams iOS app and activate the developer preview. For more information about developer preview, see [public developer preview for Teams](../../resources/dev-preview/developer-preview-intro.md).

1. Enable Web Inspector for the Mac system and the iOS client. For more information, see [enable Web Inspector](https://webkit.org/web-inspector/enabling-web-inspector/).

1. Connect your Teams iOS client to your Mac system. When prompted, confirm that you trust the client and give your consent to allow the connection.

    You'll find your iOS client listed under the **Develop** option in Safari on your Mac system.

1. From the Safari's **Develop** menu on the Mac system, select **Use for Development...** for your iOS client. This is a one-time setting that you'll configure the first time you use Safari to access DevTools for the iOS client.

   :::image type="content" source="../../assets/images/devtools/devtools-use-for-development.png" alt-text="The screenshot displays the link for using Safari for development or inspection of any app used on the connected Teams iOS client." lightbox="../../assets/images/devtools/devtools-use-for-development.png":::

1. Open Teams on your connected Teams iOS client and open your app inside Teams.

1. From the **Develop** menu, select the connected iOS client to view the inspection link for your app.

   :::image type="content" source="../../assets/images/devtools/app-inspection-link.png" alt-text="The screenshot displays the app inspection link for your application." lightbox="../../assets/images/devtools/app-inspection-link.png":::

1. Select the link to open Safari Web Inspector for your app.

   :::image type="content" source="../../assets/images/devtools/safari-web-inspector.png" alt-text="The screenshot displays the Web Inspector in Safari." lightbox="../../assets/images/devtools/safari-web-inspector.png":::

   You can now utilize DevTools for your Teams iOS client.

## See also

- [Test your app](../../concepts/build-and-test/test-app-overview.md)
- [Clear the Teams client cache](/microsoftteams/troubleshoot/teams-administration/clear-teams-cache)
- [Build tabs for Teams](../what-are-tabs.md)
