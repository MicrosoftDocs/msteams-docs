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
> DevTools is only available for desktop and Android clients after the **Public preview** has been enabled. For more information, see [Public preview](~/resources/dev-preview/developer-preview-intro.md#desktop-or-web-client).

## Access DevTools on the desktop

While the web version and the desktop version of Teams are almost the same, there are some differences concerning authentication. Sometimes the only way to figure out what is going on is to use the DevTools. To use DevTools in the desktop client, you must:

1. Enable [**Public preview**](../../resources/dev-preview/developer-preview-intro.md#desktop-or-web-client).
1. Open up a tab so you have something to inspect with the DevTools.
1. Open the DevTools one of the following ways:
    * On Windows, you open DevTools via the Microsoft Teams icon in the desktop tray.

      :::image type="content" source="../../assets/images/dev-preview/devtools-right-click.png" lightbox="../../assets/images/dev-preview/devtools-right-click.png" alt-text="Screenshot shows the option to open DevTools from Windows desktop.":::

    * On macOS, select the Microsoft Teams icon in the Dock.

      :::image type="content" source="../../assets/images/dev-preview/mac-os-developer-tools.png" alt-text="Screenshot shows the option to open DevTools from macOS dock.":::

The following example shows DevTools:

   :::image type="content" source="../../assets/images/dev-preview/tab-and-devtools.png" alt-text="Screenshot shows the Tab and DevTools." lightbox="../../assets/images/dev-preview/tab-and-devtools.png":::

## Access DevTools from an Android device

You can also enable the DevTools from the Teams Android client. To enable DevTools, you must:

1. DevTools for Android is available only on the beta version of Teams app. To join the beta version of Teams app, follow the instructions listed in [Get beta versions of apps.](https://support.google.com/googleplay/answer/7003180?hl=en#:~:text=Get%20beta%20versions%20of%20apps)

   :::image type="content" source="~/assets/images/tabs/android-beta-dev-tools.png" alt-text="Screenshot shows the option to join the beta.":::
   
1. Enable [**Public preview**](../../resources/dev-preview/developer-preview-intro.md#mobile-client).
1. Connect your device to your desktop computer, and set up your Android device for [remote debugging](https://developers.google.com/web/tools/chrome-devtools/remote-debugging/).
1. In your Chrome browser, open `chrome://inspect/#devices`.
1. Select **inspect** under the tab you wish to debug, as in the following image:

   :::image type="content" source="../../assets/images/android-devtools.png" alt-text="Screenshot shows the Android DevTools.":::

## See also

* [Test your app](../../concepts/build-and-test/test-app-overview.md)
* [Clear the Teams client cache](/microsoftteams/troubleshoot/teams-administration/clear-teams-cache)
* [Build tabs for Teams](../what-are-tabs.md)
