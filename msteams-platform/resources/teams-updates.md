---
title: Microsoft Teams updates
description: Learn about the latest updates to Microsoft Teams.
author: v-ypalikila
ms.author: lajanuar
ms.localizationpriority: medium
ms.topic: reference
---
# Microsoft Teams update

[New Microsoft Teams client](https://www.microsoft.com/microsoft-365/blog/2023/03/27/welcome-to-the-new-era-of-microsoft-teams/) is reimagined from the ground up with performance in mind. It's faster, simpler, smarter, and flexible to provide better experience for your apps and users. The new Teams Client is closely aligned with all the existing Teams Clients (desktop, web and mobile) where your apps run. You can use the new Teams Client with all the existing capabilities in Teams at full feature parity.

If you have an app that runs inside the Classic Teams Client for Windows or Mac, Teams Web Clients for Edge, Chrome, or Firefox, and Teams Mobile Clients for Android and iOS, the app will most likely run in the new Teams Client without any issues.

Apps in the new Teams client run better and faster as:  

* The new Teams Client uses the Evergreen version of Edge WebView2 to ensure Teams client is always up to date with the latest fixes and improvements available in Edge and Chromium.

* The new Teams Client has been rebuilt from the ground up with performance in mind and includes all the platform infrastructure responsible for bootstrapping your app and powering the SDK APIs that it uses.  

## Timelines and rollout

To ensure a smooth transition, a phased rollout of the new platform is planned as follows:

* **Developer Preview**: The new Teams client is available in Public Developer Preview starting 01 June 2023. You can access the new platform and test your apps. We encourage you to adopt the feature early and provide feedback to help refine the platform.

* **Availability of all platform features from Teams classic**: All the platform features from Teams classic will be available in the new Teams client by August 2023. We plan to officially launch the new platform after addressing the known issues and incorporating feedback.

You can distinguish between the Teams host clients using the `hostName` property. Classic Teams client and the new Teams client are represented using the `teams` and `teamsModern` fields, respectively.

* SDK v1.x: [`hostName`](/javascript/api/@microsoft/teams-js/hostname?view=msteams-client-js-latest&preserve-view=true)
* SDK v2.x: [`app.Context.app.host.name`](/javascript/api/@microsoft/teams-js/app.appinfo?view=msteams-client-js-latest&preserve-view=true)

## Known issues

> [!NOTE]
> It's recommended to test apps, tabs, messaging extensions, bots, and link unfurling after switching from the Classic Teams Client to the new Teams client.

* You can't install, uninstall, pin, and unpin apps in the new Teams client. It's recommended to perform these actions in the Classic Teams Client and the changes are reflected in the New Teams Client. For more information, see [Pin apps in Microsoft Teams](https://support.microsoft.com/office/pin-an-app-for-easy-access-3045fd44-6604-4ba7-8ecc-1c0d525e89ec).

* You can't add, update, rename, and remove tabs from chats and channels in the new Teams client. It's recommended to perform these actions in the Classic Teams Client and the changes are reflected in the New Teams Client. For more information, see [Use an app in a tab in a channel or chat](https://support.microsoft.com/office/use-an-app-in-a-tab-in-a-channel-or-chat-83d0514f-2134-4db5-80f2-e9b43e111d57).

* [Share in Teams](../concepts/build-and-test/share-to-teams-from-personal-app-or-tab.md) isn't supported in the new Teams client.

* APIs used in Teams that require [device permissions](../concepts/device-capabilities/native-device-permissions.md) aren't supported.

* [Adaptive card tabs](../tabs/how-to/build-adaptive-card-tabs.md) aren't supported in the new Teams client.

For more information on known issues and gaps in the New Teams Client, see [New Microsoft Teams](/microsoftteams/new-teams-desktop-admin?tabs=teams-admin-center#known-issues).

If you have any issues with your app, request you to raise a bug and provide feedback at [Support and feedback](../feedback.md#report-issues).

## See also

[Teams app that fits](../overview.md)
