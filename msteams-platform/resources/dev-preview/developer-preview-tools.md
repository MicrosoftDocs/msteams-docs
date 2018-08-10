---
title: Developer tools for Developer Preview
description: Describes the tools available for developers using Teams
keywords: teams preview developer tools
ms.date: 01/20/2018
---
# DevTools for the Microsoft Teams Desktop Client

when Teams is running in a browser, it’s easy to access the browser's DevTools. F12 (on Windows) or Command-Option-I (on MacOS) works just fine.

The web version of Teams and the desktop version of teams are almost exactly the same, but there are some differences, particularly with respect to authentication. Sometimes the only way to figure out what’s going on is to use the DevTools. There’s been an undocumented way to get to them since the earliest versions of the desktop client, but it has never been publicly discussed until recently, when [DevTools Now Accessible From the Microsoft Teams Desktop Client](https://developer.microsoft.com/en-us/office/blogs/devtools-microsoft-teams-desktop-client/) appeared on the Office 365: Blog.

The feature is only available in the Developer Preview version of Microsoft Teams. See [How do I get access to the Developer Preview](~/resources/dev-preview/developer-preview-features) for more information.

## Accessing DevTools in the Teams Client

To use DevTools in the desktop client, first open up a tab so you have something to inspect with the DevTools, then open DevTools.

On Windows, you open DevTools via the Microsoft Teams icon in the desktop tray:

![Right-click to open DevTools](~/assets/images/dev-preview/devtools-right-click.png)

On MacOS, you open DevTools by clicking on the Microsoft Teams icon in the Dock.

Here’s what a sample tab looks like with the DevTools open and an element selected:

![Tab and DevTools](~/assets/images/dev-preview/tab-and-devtools.png)
