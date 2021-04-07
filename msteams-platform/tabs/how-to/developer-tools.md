---
title: DevTools for Microsoft Teams tabs
description: Describes how to get to the DevTools when using the Microsoft Teams Desktop Client
ms.topic: how-to
keywords: devtools debug mobile chrome desktop client developer tools
---
# DevTools for Microsoft Teams tabs

When Teams is running in a browser, it is easy to access the browser's DevTools: F12 on Windows or Command-Option-I on MacOS. The DevTools gives you access to:

1. View console logs.
1. View or modify HTML, CSS, and network requests during runtime.
1. Add breakpoints to your JavaScript code and perform interactive debugging.

The feature is only available in desktop and Android clients after **Developer Preview** has been enabled. See [How do I enable developer preview](~/resources/dev-preview/developer-preview-intro.md) for more information.

## Access DevTools in the Desktop

While the web version and the desktop version of teams are almost exactly the same, there are some differences with respect to authentication. Sometimes the only way to figure out what is going on is to use the DevTools. To use DevTools in the desktop client, you must:

1. Ensure you have enabled [developer preview](~/resources/dev-preview/developer-preview-intro.md).
1. Open up a tab so you have something to inspect with the DevTools.

1. Open the DevTools.
    * On Windows, open DevTools through the Microsoft Teams icon in the desktop tray:

  ![Right-click to open DevTools](~/assets/images/dev-preview/devtools-right-click.png)

    * On MacOS, choose the Microsoft Teams icon in the Dock.

Example of sample tab with open DevTools and an element selected:

1. Open the DevTools one of the following ways:
    * **Windows**: Select the Teams icon in the desktop tray.
    * **macOS**: Select the Teams icon in the Dock.

The following screenshot shows DevTools inspecting an element in a tab configuration dialog:

![Tab and DevTools](~/assets/images/dev-preview/tab-and-devtools.png)

## Access DevTools from an Android client

You can also enable the DevTools from the Teams Android client.

1. Enable the [developer preview](~/resources/dev-preview/developer-preview-intro.md).
1. Connect your device to your desktop computer and setup your Android device for [remote debugging](https://developers.google.com/web/tools/chrome-devtools/remote-debugging/).
1. Open `chrome://inspect/#devices` in your Chrome browser.
1. Select **inspect** under the tab you wish to debug, as in the following screenshot.

![Android DevTools](~/assets/images/android-devtools.png)
