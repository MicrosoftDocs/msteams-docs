---
title: DevTools for Microsoft Teams tabs
description: In this module, learn how to get to the DevTools when using the Microsoft Teams Desktop Client and debugging
ms.localizationpriority: medium
ms.topic: how-to
ms.date: 08/29/2022
---

# DevTools for Microsoft Teams tabs

When Teams is running in a browser, it's easy to access the browser's DevTools: F12 on Windows or Command-Option-I on MacOS. The DevTools gives you access to:

1. View console logs.
1. View or modify HTML, CSS, and network requests during runtime.
1. Add breakpoints to your JavaScript code and perform interactive debugging.

> [!NOTE]
> The feature is only available for desktop and Android clients after the **Developer Preview** has been enabled. For more information, see [How do I enable developer preview](~/resources/dev-preview/developer-preview-intro.md).

## Access DevTools on the desktop

While the web version and the desktop version of Teams are almost the same, there are some differences concerning authentication. Sometimes the only way to figure out what is going on is to use the DevTools. To use DevTools in the desktop client, you must:

1. Ensure you have enabled [developer preview](~/resources/dev-preview/developer-preview-intro.md).
1. Open up a tab so you have something to inspect with the DevTools.
1. Open the DevTools one of the following ways:
    * On Windows, you open DevTools via the Microsoft Teams icon in the desktop tray.

      :::image type="content" source="../../assets/images/dev-preview/devtools-right-click.png" alt-text="Screenshot shows the option to open DevTools from Windows desktop.":::

    * On MacOS, select the Microsoft Teams icon in the Dock.

      :::image type="content" source="../../assets/images/dev-preview/mac-os-developer-tools.PNG" alt-text="Screenshot shows the option to open DevTools from MacOS dock.":::

The following example shows DevTools open and inspecting a tab configuration dialog:

   :::image type="content" source="../../assets/images/dev-preview/tab-and-devtools.png" alt-text="Screenshot shows the Tab and DevTools."  lightbox="../../assets/images/dev-preview/tab-and-devtools.png":::

## Access DevTools from an Android device

You can also enable the DevTools from the Teams Android client. To enable DevTools, you must:

1. Enable the [developer preview](~/resources/dev-preview/developer-preview-intro.md).
1. Connect your device to your desktop computer, and set up your Android device for [remote debugging](https://developers.google.com/web/tools/chrome-devtools/remote-debugging/).
1. In your Chrome browser, open `chrome://inspect/#devices`.
1. Select **inspect** under the tab you wish to debug, as in the following image:

   :::image type="content" source="../../assets/images/android-devtools.png" alt-text="Screenshot shows the Android DevTools.":::

## See also

* [Test your app](../../concepts/build-and-test/test-app-overview.md)
* [Clear the Teams client cache](/microsoftteams/troubleshoot/teams-administration/clear-teams-cache)
* [Build tabs for Teams](../what-are-tabs.md)
