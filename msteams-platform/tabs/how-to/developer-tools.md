---
title: DevTools for Teams Desktop & Mobile
description: Learn about DevTools for Microsoft Teams tabs and how to access and debug DevTools using Teams desktop or mobile client (Android).
ms.localizationpriority: medium
ms.topic: how-to
ms.date: 08/29/2022
---

# DevTools for Microsoft Teams tabs

When Teams is running in a browser, it's easy to access the browser's DevTools. To access DevTools in Windows press F12 and in macOS press Command-Option-I. DevTools gives you access to:

- View console logs.
- View or modify HTML, CSS, and network requests during runtime.
- Add breakpoints to your JavaScript code and perform interactive debugging.

> [!NOTE]
> DevTools is only available for desktop and Android clients and you must enable **Public preview**. For more information, see [Public preview](~/resources/dev-preview/developer-preview-intro.md#desktop-or-web-client).

## Access DevTools on desktop

While the web version and the desktop version of Teams are almost the same, there are some differences with authentication. Sometimes the only way to figure out what's going on is to use DevTools. To use DevTools in the desktop client, follow these steps:

1. Enable [**Public preview**](../../resources/dev-preview/developer-preview-intro.md#desktop-or-web-client).
1. Open a tab to inspect with DevTools.
1. Open DevTools in one of the following ways:
    * On Windows, open DevTools via the Microsoft Teams icon in the desktop tray:

      :::image type="content" source="../../assets/images/dev-preview/devtools-right-click.png" lightbox="../../assets/images/dev-preview/devtools-right-click.png" alt-text="Screenshot shows the option to open DevTools from Windows desktop.":::

    * On macOS, select **Open DevTools**:

      :::image type="content" source="../../assets/images/dev-preview/mac-os-developer-tools.png" alt-text="Screenshot shows the option to open DevTools from macOS dock.":::

    The following example shows DevTools:

    :::image type="content" source="../../assets/images/dev-preview/tab-and-devtools.png" alt-text="Screenshot shows the Tab and DevTools." lightbox="../../assets/images/dev-preview/tab-and-devtools.png":::

## Access DevTools from Android device

You can enable DevTools in the Teams Android client. To enable DevTools, follow these steps:

1. DevTools for Android is available only on the beta version of Teams app. To join the beta version of Teams app, follow the instructions listed in [Get beta versions of apps.](https://support.google.com/googleplay/answer/7003180?hl=en#:~:text=Get%20beta%20versions%20of%20apps)

   :::image type="content" source="~/assets/images/tabs/android-beta-dev-tools.png" alt-text="Screenshot shows the option to join the beta.":::
   
1. Enable [**Public preview**](../../resources/dev-preview/developer-preview-intro.md#mobile-client).
1. Connect your device to your desktop computer, and set up your Android device for [remote debugging](https://developers.google.com/web/tools/chrome-devtools/remote-debugging/).
1. In your Chrome browser, open `chrome://inspect/#devices`.
1. Select **inspect** under the tab you wish to debug, as in the following image:

   :::image type="content" source="../../assets/images/android-devtools.png" alt-text="Screenshot shows the Android DevTools." lightbix="../../assets/images/android-devtools.png":::

## See also

* [Test your app](../../concepts/build-and-test/test-app-overview.md)
* [Clear the Teams client cache](/microsoftteams/troubleshoot/teams-administration/clear-teams-cache)
* [Build tabs for Teams](../what-are-tabs.md)
