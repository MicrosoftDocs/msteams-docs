---
title: Introducing the new Microsoft Teams client
description: Learn about the latest updates to Microsoft Teams.
author: v-ypalikila
ms.author: lajanuar
ms.localizationpriority: medium
ms.topic: reference
---
# Introducing the new Microsoft Teams client

> [!IMPORTANT]
> The Classic Teams client is expected to be deprecated by March 31, 2024.

[The new Microsoft Teams client](https://www.microsoft.com/en-us/microsoft-365/blog/2023/03/27/welcome-to-the-new-era-of-microsoft-teams/) is reimagined from the ground up with performance in mind. It's faster, simpler, smarter, and flexible to provide better experience for your apps and users. The new Teams client supports all the existing Teams app capabilities except Adaptive Card tabs. If you have an app that runs inside the Classic Teams, the app will most likely run in the new Teams client without any issues.

The following are the advantages of the new Teams client:

* The new Teams client uses the Evergreen version of Microsoft Edge WebView2 to ensure Teams client is always up to date with the latest fixes and improvements available in Microsoft Edge and Chromium.

* The new Teams client has been rebuilt from the ground up with performance in mind and includes all the platform infrastructure responsible for bootstrapping your app and powering the SDK APIs that it uses.

You can use the following property to identify your app usage in the new Teams or Classic Teams client:

* For TeamsJS v1.x: [`hostName`](/javascript/api/@microsoft/teams-js/context?view=msteams-client-js-latest&preserve-view=true#@microsoft-teams-js-context-hostname)
* For TeamsJS v2.x: [`AppHostInfo`](/javascript/api/@microsoft/teams-js/app.appinfo?view=msteams-client-js-latest&preserve-view=true#@microsoft-teams-js-app-appinfo-host)

> [!NOTE]
> If hostName isn't defined, then assume that your app is running in the Classic Teams client.

The Classic Teams client is represented using the `teams` field and the new Teams client is represented using the `teamsModern` field.

## Timelines and rollout

To ensure a smooth transition, a phased rollout of the new platform is planned as follows:

* **Availability of all platform features from Classic Teams**: All apps are available in the new Teams Client. All platform features except the features listed under [known issues](#known-issues) are now available. Platform features under known issues aren't currently supported in the new Teams client.

## Known issues

> [!NOTE]
>
> * The new Teams client is supported in Windows and Mac clients and Government Community Cloud (GCC) and GCC-High environments.
> * We recommend you to test the functionality of  apps, tabs, messaging extensions, bots, and link unfurling on Windows and Mac clients and GCC and GCC-High environments after switching from the Classic Teams client to the new Teams client.
> * [Adaptive Card tabs](../tabs/how-to/build-adaptive-card-tabs.md) aren't supported in the new Teams client. The Classic Teams client is expected to be deprecated by March 31, 2024. If your app is using Adaptive Card tabs, we recommend you rebuild the tab as a web-based tab. For more information, see [build tabs for Teams](../tabs/what-are-tabs.md).

The following Teams features aren't currently supported in the new Teams client:

* [Location](../concepts/device-capabilities/location-capability.md#location-apis) and [Media](../concepts/device-capabilities/media-capabilities.md#media-capability-apis) APIs aren't supported in the new Teams client. We recommend using HTML5 Geolocation, and Media.

* [DevTools](/microsoft-edge/devtools-guide-chromium/overview) isn't supported in the new Teams client.
  
* [App caching](~/tabs/how-to/app-caching.md) isn't supported in the new Teams client.

* The `window.alert`, `window.confirm`, and `window.prompt` APIs used to display a dialog aren't supported in the new Teams Client. We recommended you to render a dialog within your own frame, for example, using the [Fluent V9 dialog](https://react.fluentui.dev/?path=/docs/components-dialog--default) or use the Microsoft Teams JavaScript client library (TeamsJS) to display a [Teams dialog](../tabs/what-are-tabs.md) using Adaptive Card or a nested `<iframe>`.

For more information on known issues and gaps in the new Teams client, see [new Microsoft Teams](/microsoftteams/new-teams-desktop-admin?tabs=teams-admin-center#known-issues).

If your app is working fine in the Classic Teams client but has issues in the new Teams, then raise an issue on [this page](https://github.com/MicrosoftDocs/msteams-docs/issues/new?title=&body=%0A%0A%5BEnter%20feedback%20here%5D%0A%0A%0A---%0A%23%23%23%23%20Document%20Details%0A%0A%E2%9A%A0%20*Do%20not%20edit%20this%20section.%20It%20is%20required%20for%20learn.microsoft.com%20%E2%9E%9F%20GitHub%20issue%20linking.*%0A%0A*%20ID%3A%2019ddf42e-0a47-7717-52d4-e549155480a2%0A*%20Version%20Independent%20ID%3A%204bbe9beb-233f-cfd5-097b-f280aab5fde8%0A*%20Content%3A%20%5BMicrosoft%20Teams%20developer%20community%20support%20and%20feedback%20-%20Teams%5D(https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ffeedback)%0A*%20Content%20Source%3A%20%5Bmsteams-platform%2Ffeedback.md%5D(https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ffeedback.md)%0A*%20Service%3A%20**msteams**%0A*%20GitHub%20Login%3A%20%40surbhigupta%0A*%20Microsoft%20Alias%3A%20**lajanuar**). For any other issues, request you to raise an issue on [support and feedback](../feedback.md#developer-community-forums).

## See also

* [Teams app that fits](../overview.md)
* [Get context for your tab](../tabs/how-to/access-teams-context.md#handle-theme-change)
