---
title: Device permissions for the browser
keywords: teams apps capabilities permissions
description: Securely bring back device permissions support for apps in our web client
localization_priority: Normal
ms.topic: how-to
---

# Device permissions for the browser

> [!NOTE]
> The device permissions for the browser feature is currently available in [public developer preview](../../resources/dev-preview/developer-preview-intro.md) only. 
> This feature will be generally available (GA) by January 21, 2022.

Users can grant permission for each app and consent to device permissions. Previously, browser level permissions were handled as top-level permission for Teams only. Consent for each app wasn't provided separately. At the browser level there are two levels of permissions:

* Teams overall permission for the browser.
* Teams controlled individual permissions for each app.

Device permission requests can't be intercepted from iframe. You can only allow or deny permissions before the iframe is loaded. The user must know which device permissions to enable before the tab loads to enhance their experience. If the user needs to change the permissions, they must reload the iframe. The following image demonstrates the device permissions flow for granting or denying access:

<img src="~/assets/images/tabs/devicepermissionsflowchart.png" alt="Device permissions flow access" width="600"/>

## Scenario

Sarah, a lawyer at Contoso Partners, uses OneNote from browser to take meeting notes in Teams. OneNote requires microphone access to record dictations. A dialog box appears prompting to grant access. Sarah only uses OneNote to take notes and decides to deny access.

A few months later, Sarah needs to record an important meeting and decides to use the dictation feature. But a dialog box appears, stating **We don't have access to your microphone. Please check that your browser has permission to use your microphone**:

![Permissions not available](../../assets/images/tabs/permissionsnotavailable.png)

Sarah then checks her app permissions or settings in Teams to grant OneNote access to her microphone.

## Solutions

The solutions for the security applications are as follows:

* Introduce device permissions consent experience in the browser: All apps' permissions are managed individually instead of relying on the browser to provide support.
* Allow users to manage their device permissions for each app in the browser: Previously, device permissions for embedded iframes were handled by the browser. With the recent change to Chromium, users can manage their device permissions for each Teams tab through **App permissions**, app dropdown list, or **Settings**.

Users can have various apps in Teams and each require device permissions. For example, in OneNote the user must grant permissions for media, such as microphone. There's a property on iframe that allows the user to use different media for that app.

**To grant access to app for device permissions using App permissions**

> [!NOTE]  
> To access camera or microphone, you must enable it. 

1. In your browser, open [teams.microsoft.com](https://teams.microsoft.com/).
1. Select the app, for example, OneNote that you want to use from the left bar.
1. Select **App permissions** from the upper right corner.

    <img src="../../assets/images/tabs/apppermissions.png" alt="App permissions button" width="800"/>

1. Turn on **Media (Camera, microphone, speakers)** and close the dialog box.

    <img src="../../assets/images/tabs/enable-access.png" alt="Enable camera access" width="800"/>

           
1. Select **Refresh now** to reload the page for new iframe permissions to take effect.       
1. Check if the device permission is granted. For example, if you're using OneNote, you can select **Dictate** to record your notes.

**To grant access to app for device permissions using the dropdown list for a team**

1. In your browser, open [teams.microsoft.com](https://teams.microsoft.com/).
1. Select **Teams** from the left pane.
1. Select a team where you want to use an app.
1. Add the app, for example, OneNote if it isn't already added.
1. Select the dropdown list for **My Notebook** in this case and select **App permissions**.

    ![App permissions drop-down](../../assets/images/tabs/drop-downapppermissions.png)

1. Turn on **Media (Camera, microphone, speakers)** and close the dialog box.
1. Select **Refresh now** to reload the page.
1. Check if the device permission is granted. For example, if you're using OneNote, you can select **Dictate** to record your notes.

**Optionally to grant access to app for device permissions using Settings**

1. In your browser, open [teams.microsoft.com](https://teams.microsoft.com/).
1. Select the app, for example, OneNote that you want to use from the left pane.
1. If you're using OneNote, you can select **Dictate** to record your notes. A dialog box appears to state the permissions are denied.
1. Select the icon for your user account from the upper right corner and select **Manage account**.
1. From the **Settings** popup, select **App permissions**.

    ![Settings for app permissions](../../assets/images/tabs/settingsapppermissions.png)

1. Select the app where you want to grant access.
1. Turn on **Media (Camera, microphone, speakers)**.
1. In your browser, select **Refresh**. A dialog box appears asking you to reload the page.
1. Select **Refresh now** to reload the page for new iframe permissions to take effect.
1. Similarly, you can turn on other permissions, such as location or MIDI device as required to use the app.

## See also

* [Device capabilities overview](device-capabilities-overview.md)
* [Request device permissions](native-device-permissions.md)
