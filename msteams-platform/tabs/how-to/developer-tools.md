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

> [!NOTE]
> The feature is only available for desktop and Android clients after the **Developer Preview** has been enabled. For more information, see [How do I enable developer preview](~/resources/dev-preview/developer-preview-intro.md).

## Access DevTools in the Desktop

While the web version and the desktop version of Teams are almost the same, there are some differences concerning authentication. Sometimes the only way to figure out what is going on is to use the DevTools. To use DevTools in the desktop client, you must:

1. Ensure you have enabled [developer preview](~/resources/dev-preview/developer-preview-intro.md).
1. Open up a tab so you have something to inspect with the DevTools.
1. Open the DevTools in one of the following ways:
    * **Windows**: Select the Teams icon in the desktop tray.
    * **macOS**: Select the Teams icon in the Dock.
 
   The following image shows DevTools inspecting an element in a tab configuration dialog:

   ![Tab and DevTools](~/assets/images/dev-preview/tab-and-devtools.png)

## Access DevTools from an Android client

You can also enable the DevTools from the Teams Android client. To enable DevTools, you must:

1. Enable the [developer preview](~/resources/dev-preview/developer-preview-intro.md).
1. Connect your device to your desktop computer, and set up your Android device for [remote debugging](https://developers.google.com/web/tools/chrome-devtools/remote-debugging/).
1. In your Chrome browser, open `chrome://inspect/#devices`.
1. Select **inspect** under the tab you wish to debug, as in the following image:

   ![Android DevTools](~/assets/images/android-devtools.png)
