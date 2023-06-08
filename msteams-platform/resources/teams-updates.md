---
title: Microsoft Teams updates
description: Learn about the latest updates to Microsoft Teams.
author: v-ypalikila
ms.author: lajanuar
ms.localizationpriority: medium
ms.topic: reference
---
# Microsoft Teams update

[The new Microsoft Teams client](https://www.microsoft.com/en-us/microsoft-365/blog/2023/03/27/welcome-to-the-new-era-of-microsoft-teams/) is reimagined from the ground up with performance in mind. It's faster, simpler, smarter, and flexible to provide better experience for your apps and users. The new Teams client is closely aligned with all the existing Teams clients (desktop, web and mobile) where your apps run. You can use the new Teams client with all the existing capabilities in Teams at full feature parity.

If you have an app that runs inside the Classic Teams client for Windows or Mac, Teams Web Clients for Edge, Chrome, or Firefox, and Teams Mobile Clients for Android and iOS, the app will most likely run in the new Teams client without any issues.

Apps in the new Teams client run better and faster as:  

* The new Teams client uses the Evergreen version of Edge WebView2 to ensure Teams client is always up to date with the latest fixes and improvements available in Edge and Chromium.

* The new Teams client has been rebuilt from the ground up with performance in mind and includes all the platform infrastructure responsible for bootstrapping your app and powering the SDK APIs that it uses.  

## Timelines and rollout

To ensure a smooth transition, a phased rollout of the new platform is planned as follows:

* **Developer Preview**: The new Teams client is available in Public Developer Preview starting June  2023. You can access the new platform and test your apps. We encourage you to adopt the feature early and provide feedback to help refine the platform.

* **Availability of all platform features from Classic Teams**: All the platform features from Teams classic will be available in the new Teams client by August 2023. We plan to officially launch the new platform after addressing the known issues and incorporating feedback.

You can distinguish between the Teams host clients using the `hostName` property. Classic Teams client and the new Teams client are represented using the `teams` and `teamsModern` fields, respectively.

* SDK v1.x: [`hostName`](/javascript/api/@microsoft/teams-js/hostname?view=msteams-client-js-latest&preserve-view=true)
* SDK v2.x: [`app.Context.app.host.name`](/javascript/api/@microsoft/teams-js/app.appinfo?view=msteams-client-js-latest&preserve-view=true)

## Known issues

> [!NOTE]
> It's recommended to test apps, tabs, messaging extensions, bots, and link unfurling after switching from the Classic Teams client to the new Teams client.

* You can't install, uninstall, pin, and unpin apps in the new Teams client. It's recommended to perform these actions in the Classic Teams client and the changes are reflected in the new Teams client. For more information, see [Pin apps in Microsoft Teams](https://support.microsoft.com/office/pin-an-app-for-easy-access-3045fd44-6604-4ba7-8ecc-1c0d525e89ec).

* You can't add, update, rename, and remove tabs from chats and channels in the new Teams client. It's recommended to perform these actions in the Classic Teams client and the changes are reflected in the new Teams client. For more information, see [Use an app in a tab in a channel or chat](https://support.microsoft.com/office/use-an-app-in-a-tab-in-a-channel-or-chat-83d0514f-2134-4db5-80f2-e9b43e111d57).

* [Share in Teams](../concepts/build-and-test/share-to-teams-from-personal-app-or-tab.md) isn't supported in the new Teams client.

* APIs used in Teams that require [device permissions](../concepts/device-capabilities/native-device-permissions.md) aren't supported.

* [Adaptive card tabs](../tabs/how-to/build-adaptive-card-tabs.md) aren't supported in the new Teams client.

* You cannot install an app with only [Meeting extension](../apps-in-teams-meetings/teams-apps-in-meetings.md) capabiliy.

* Your app might not be available in the [meeting stage](../apps-in-teams-meetings/build-apps-for-teams-meeting-stage.md).

For more information on known issues and gaps in the new Teams client, see [New Microsoft Teams](/microsoftteams/new-teams-desktop-admin?tabs=teams-admin-center#known-issues).

If your app is working fine in the Classic Teams client but has issues in the new Teams then raise an issue on [this page](https://github.com/MicrosoftDocs/msteams-docs/issues/new?title=&body=%F0%9F%9A%A8%20Looks%20like%20you%20arrived%20from%20the%20internal%20review%20site%20%0A%F0%9F%9A%A8%20Do%20not%20enter%20Microsoft%20confidential%20information%20here%0A%0A%5BEnter%20feedback%20here%5D%0A%0A%0A---%0A%23%23%23%23%20Document%20Details%0A%0A%E2%9A%A0%20*Do%20not%20edit%20this%20section.%20It%20is%20required%20for%20learn.microsoft.com%20%E2%9E%9F%20GitHub%20issue%20linking.*%0A%0A*%20ID%3A%204c405ed3-f304-ff58-d32d-108fc725bb6a%0A*%20Version%20Independent%20ID%3A%204c405ed3-f304-ff58-d32d-108fc725bb6a%0A*%20Content%3A%20%5BMicrosoft%20Teams%20updates%20-%20Teams%5D(https%3A%2F%2Freview.learn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fresources%2Fteams-updates%3Fbranch%3Dpr-en-us-8713)%0A*%20Content%20Source%3A%20%5Bmsteams-platform%2Fresources%2Fteams-updates.md%5D(https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fresources%2Fteams-updates.md)%0A*%20Service%3A%20**msteams**%0A*%20GitHub%20Login%3A%20%40v-ypalikila%0A*%20Microsoft%20Alias%3A%20**lajanuar**). For any other issues, request you to raise an issue on [Support and feedback](../feedback.md#developer-community-forums).

## See also

[Teams app that fits](../overview.md)
