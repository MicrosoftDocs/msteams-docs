---
title: DevTools for Microsoft Teams tabs
description: Describes how to get to the DevTools when using the Microsoft Teams Desktop Client
ms.topic: how-to
keywords: devtools debug mobile chrome desktop client developer tools
---
# DevTools for Microsoft Teams tabs

When Teams is running in a browser, it’s easy to access the browser's DevTools: F12 (on Windows) or Command-Option-I (on MacOS). The DevTools gives you access to:

1. View console logs.
1. View/modify html, css, and network requests during runtime.
1. Add breakpoints to your JavaScript code, and perform interactive debugging.

The feature is only available in desktop and Android clients after Developer Preview has been enabled. See [How do I enable Developer Preview](~/resources/dev-preview/developer-preview-intro.md) for more information.

## Access DevTools on the desktop

While the web version of Teams and the desktop version of teams are almost exactly the same, there are some differences, particularly with respect to authentication. Sometimes the only way to figure out what’s going on is to use the DevTools. Here's how to get to them from the Teams desktop client. To use DevTools in the desktop client:

1. Make sure you have enabled [developer preview](~/resources/dev-preview/developer-preview-intro.md)
1. Open up a tab so you have something to inspect with the DevTools.
1. Open the DevTools one of the following ways:
    * On Windows, you open DevTools via the Microsoft Teams icon in the desktop tray:<br>
  ![Right-click to open DevTools](~/assets/images/dev-preview/devtools-right-click.png)
    * On MacOS, click on the Microsoft Teams icon in the Dock.

The following example shows DevTools open and inspecting a tab configuration dialog:

![Tab and DevTools](~/assets/images/dev-preview/tab-and-devtools.png)

## Access DevTools from an Android device

You can also enable the DevTools from the Teams Android client. To do so:

1. Make sure you have enabled [developer preview](~/resources/dev-preview/developer-preview-intro.md)
1. Connect your device to your desktop computer, and setup your Android device for [remote debugging](https://developers.google.com/web/tools/chrome-devtools/remote-debugging/)
1. In your Chrome browser, open `chrome://inspect/#devices`.
1. Click **inspect** below the tab you wish to debug, as in the screenshot below.

![Android DevTools](~/assets/images/android-devtools.png)
