---
title: Device permissions for the browser
keywords: teams apps capabilities permissions
description: Securely bring back device permissions support for apps in our web client
localization_priority: Normal
ms.topic: how-to
---

# Device permissions for the browser

> [!NOTE]
> The change to how device permissions are handled in the browser is currently available in [public developer preview](../../resources/dev-preview/developer-preview-intro.md) only. 
> This change will be generally available (GA) by February 01, 2022.


Teams apps that require device permissions, such as camera or microphone access, now require users to manually grant permission at a per app level in the web browser. 

Previously, browser handled how to grant access permissions. Now these permissions are handled in Microsoft Teams. This has implications on how you design your application and if they require these permissions in the browser.

## App permissions in the browser
If your app needs device permissions as mentioned in your [application manifest](native-device-permissions.md#specify-permissions), **App permissions** option is enabled for app’s device permissions. The **App permissions** option is available in the following capabilities: 

* [Personal apps and task module dialogs](#personal-apps-and-task-module-dialogs)
* [Chats, channel, or meeting tabs](#chat-channel-or-meeting-tabs)

### Personal apps and task module dialogs
The **App permissions** option is in the upper-right corner of the page.


<img src="../../assets/images/tabs/apppermissions.png" alt="App permissions button" width="800"/>

### Chat, channel, or meeting tabs
The **App permissions** option is in the dropdown of the tab.


![App permissions drop-down](../../assets/images/tabs/drop-downapppermissions.png)

After the **App permissions** option is selected a popup would be displayed, where the user will enable the permissions button.

Users need to enable these permissions in the browser to access device capabilities. After user changes the app’s device permissions in the browser, they're prompted to reload the application in Teams. It is important that you make users aware of where to go in order to enable these permissions in Microsoft Teams.

## Recommendation
Microsoft Teams applications that require device permissions in the browser are expected to show instructions to users on where to find and enable these permissions in the Teams UI. Depending on the context in which your application is running, you will need to ensure your instructions are pointing the user to correct location to access these permissions as they differ for personal apps, task module dialogs, and tabs in chats, channels or meetings.


<img src="../../assets/images/tabs/enable-access.png" alt="Enable camera access" width="800"/>

## See also

* [Device capabilities overview](device-capabilities-overview.md)
* [Request device permissions](native-device-permissions.md)
