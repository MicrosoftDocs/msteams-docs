---
title: Device permissions for the browser
keywords: teams apps capabilities permissions
description: Securely bring back device permissions support for apps in our web client
localization_priority: Normal
ms.topic: how-to
---

# Device permissions for the browser

Users can grant consent to each app and consent to device permissions. Currently, when permissions are granted for one app, it's also granted for all other apps. An update made in Chromium browser deprecated HTML5 permissions from cross-origin iframes. Chromium provides a way to allow iframes to request these permissions:

* Camera
* Microphone
* Location access

The origin of requesting iframe isn't considered when permissions are requested. The request or consent dialog is for the ancestor, in this case, [teams.microsoft.com](https://teams.microsoft.com/). For example, if an app requests microphone access and access is granted, all other apps in Teams automatically grants device permissions for microphone. The user will never see any prompt from these apps. The user isn't prompted as the permission is already granted. Unlike in the desktop client, device permission requests aren't intercepted from the embedded tab application. You can only allow or deny permissions at the time the iframe is loaded. There's a need to know, which device permissions to enable before the tab has loaded and can have implications on the user experience.

The following image demonstrates the device permissions flow:

![Device permissions flow](../../assets/images/tabs/devicepermissionsflowchart.png)

## Scenario

Sarah, a lawyer at Contoso Partners, uses OneNote to take meeting notes in Teams. Sarah opens Teams in the browser. OneNote requires microphone access to record dictations. Sarah is shown a dialog box prompting her to grant access. Sarah only uses OneNote to take notes and decides to deny access.

A few months later, Sarah needs to record an important meeting. Sarah decides to use the dictation feature of OneNote. But a dialog box appears, stating that Sarah doesn’t have microphone access as she had denied access earlier.

![Permissions not available](../../assets/images/tabs/permissionsnotavailable.png)

Sarah then checks her settings in Teams to grant OneNote access to her microphone.

## Solution

The solution for the security of applications covers the following points:

* Introduce device permissions consent experience in the browser: Each apps' permissions are managed individually instead of relying on the browser to provide the support.
* Allow users to manage their device permissions for each app in the browser: Previously device permissions for embedded iframes were handled by the browser. With the recent change to Chromium, users can manage their device permissions for each Teams tab through the **Settings** dialog box.

Users can have various apps in Teams and each require device permissions. For example, in OneNote the user must grant permissions for media, such as microphone. There's a property on iframe that allows the user to use different media for that app.

**To grant access to app for device permissions**

1. In your browser, open [teams.microsoft.com](https://teams.microsoft.com/).
1. Select the app that you want to use from the left bar. If you're using OneNote, you can select **Dictate** to record your notes. A dialog box appears stating the permissions are denied.
1. Select the icon for your user account from the upper right corner and select **Manage account**.
1. From the **Settings** dialog box, select **App permissions**.

    ![Settings for app permissions](../../assets/images/tabs/settingsapppermissions.png)

1. Select the app where you want to grant access.
1. Turn on **Media (Camera, microphone, speakers)**.

    ![OneNote microphone access granted](../../assets/images/tabs/onenotepermissiongranted.png)

1. Similarly, you can turn on other permissions, such as location or MIDI device as required to use the app.

## See also

* [Device capabilities overview](device-capabilities-overview.md)
* [Request device permissions](native-device-permissions.md)