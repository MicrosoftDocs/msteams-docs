---
title: Teams JavaScript client library support across Microsoft 365
author: erikadoyle
ms.author: edoyle
description: Understand the level of support for different TeamsJS library capabilities running in different hosts for Teams apps, including Microsoft Teams, Outlook, and Microsoft 365 app 
ms.localizationpriority: high
ms.topic: conceptual
keywords: TeamsJS Teams JavaScript library capability Microsoft 365 M365
---
# TeamsJS capability support across Microsoft 365

Starting with version 2.0.0, Teams JavaScript client library (TeamsJS) enables [certain types of Teams apps](./overview.md) to run across the Microsoft 365 ecosystem. Currently, Microsoft 365 application hosts (Microsoft 365 app and Outlook) for Teams apps support a subset of the application types and capabilities you can build for the Teams platform. This support will expand over time.

This article details the level of support of Teams JavaScript client (TeamsJS) library capabilities for tab apps and dialogs (task modules) across various Microsoft 365 host applications.

> [!TIP]
> You can check for host support of a given capability at runtime by calling the `isSupported()` function on that capability (namespace or subnamespace).

The following table lists TeamsJS capabilities (public namespaces) and their support across Microsoft 365 hosts. For readability, Microsoft 365 hosts are signified by the following product icons:

| Microsoft Teams | Microsoft 365 app | Microsoft Outlook |
|- | - | - |
| :::image type="content" source="./images/teams-icon.png" alt-text="Microsoft Teams icon"::: | :::image type="content" source="./images/microsoft-365-icon.png" alt-text="Microsoft 365 app icon"::: | :::image type="content" source="./images/outlook-icon.png" alt-text="Microsoft Outlook icon"::: |

<br />
<table border>
    <thead>
        <tr>
            <th></th>
            <th colspan=3>Web</th>
            <th colspan=3>Desktop</th>
            <th colspan=6>Mobile</th>
        </tr>
        <tr>
            <th></th>
            <th colspan=3></th>
            <th colspan=3>Windows</th>
            <th colspan=3>Android</th>
            <th colspan=3>iOS</th>
        </tr>
        <tr>
            <td></td>
            <td><image alt="Teams" src="./images/teams-icon.png"/></td>
            <td><image alt="Microsoft 365 app" src="./images/microsoft-365-icon.png"/></td>
            <td><image alt="Outlook" src="./images/outlook-icon.png"/></td>
            <td><image alt="Teams" src="./images/teams-icon.png"/></td>
            <td><image alt="Microsoft 365 app" src="./images/microsoft-365-icon.png"/></td>
            <td><image alt="Outlook" src="./images/outlook-icon.png"/></td>
            <td><image alt="Teams" src="./images/teams-icon.png"/></td>
            <td><image alt="Microsoft 365 app" src="./images/microsoft-365-icon.png"/></td>
            <td><image alt="Outlook" src="./images/outlook-icon.png"/></td>
            <td><image alt="Teams" src="./images/teams-icon.png"/></td>
            <td><image alt="Microsoft 365 app" src="./images/microsoft-365-icon.png"/></td>
            <td><image alt="Outlook" src="./images/outlook-icon.png"/></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th><a href="#app">app</a></th>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td></td>
            <td>&#x2713;</td>
            <td></td>
            <td></td>
            <td>&#x2713;</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <th><a href="#appInstallDialog">appInstallDialog</a></th>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td></td>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td></td>
            <td>&#x2713;</td>
            <td></td>
            <td></td>
            <td>&#x2713;</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <th><a href="#call">call</a></th>
            <td>&#x2713;</td>
            <td></td>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td></td>
            <td></td>
            <td>&#x2713;</td>
            <td></td>
            <td></td>
            <td>&#x2713;</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <th><a href="#chat">chat</a></th>
            <td>&#x2713;</td>
            <td></td>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td></td>
            <td></td>
            <td>&#x2713;</td>
            <td></td>
            <td></td>
            <td>&#x2713;</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <th><a href="#dialog">dialog</a></th>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td></td>
            <td>&#x2713;</td>
            <td></td>
            <td></td>
            <td>&#x2713;</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <th><a href="#geoLocation">geoLocation</a><img src="./images/preview-badge.png" /></th>
            <td></td>
            <td>&#x2713;</td>
            <td></td>
            <td></td>
            <td>&#x2713;</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <th><a href="#menus">menus</a></th>
            <td>&#x2713;</td>
            <td></td>
            <td></td>
            <td>&#x2713;</td>
            <td></td>
            <td></td>
            <td>&#x2713;</td>
            <td></td>
            <td></td>
            <td>&#x2713;</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <th><a href="#monetization">monetization</a></th>
            <td>&#x2713;</td>
            <td></td>
            <td></td>
            <td>&#x2713;</td>
            <td></td>
            <td></td>
            <td>&#x2713;</td>
            <td></td>
            <td></td>
            <td>&#x2713;</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <th><a href="#pages">pages</a></th>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <th><a href="#people">people</a></th>
            <td>&#x2713;</td>
            <td></td>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td></td>
            <td></td>
            <td>?</td>
            <td></td>
            <td></td>
            <td>?</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <th><a href="#sharing">sharing</a></th>
            <td>&#x2713;</td>
            <td></td>
            <td></td>
            <td>&#x2713;</td>
            <td></td>
            <td></td>
            <td>?</td>
            <td></td>
            <td></td>
            <td>?</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <th><a href="#stageView">stageView</a></th>
            <td>&#x2713;</td>
            <td></td>
            <td></td>
            <td>&#x2713;</td>
            <td></td>
            <td></td>
            <td>?</td>
            <td></td>
            <td></td>
            <td>?</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <th><a href="#tasks">tasks</a><img src="./images/deprecated-badge.png" /></th>
            <td>&#x2713;</td>
            <td></td>
            <td></td>
            <td>&#x2713;</td>
            <td></td>
            <td></td>
            <td>&#x2713;</td>
            <td></td>
            <td></td>
            <td>&#x2713;</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <th><a href="#teamsCore">teamsCore</a></th>
            <td>&#x2713;</td>
            <td></td>
            <td></td>
            <td>&#x2713;</td>
            <td></td>
            <td></td>
            <td>?</td>
            <td></td>
            <td></td>
            <td>?</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <th><a href="#video">video</a></th>
            <td>&#x2713;</td>
            <td></td>
            <td></td>
            <td>&#x2713;</td>
            <td></td>
            <td></td>
            <td>?</td>
            <td></td>
            <td></td>
            <td>?</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <th><a href="#webStorage">webStorage</a></th>
            <td></td>
            <td></td>
            <td></td>
            <td>&#x2713;</td>
            <td></td>
            <td></td>
            <td>&#x2713;</td>
            <td></td>
            <td></td>
            <td>&#x2713;</td>
            <td></td>
            <td></td>
        </tr>
    </tbody>
</table>

## `app` 

[Reference](/javascript/api/@microsoft/teams-js/app) | [Sample](https://github.com/vikramtha/microsoft-teams-library-js/blob/vikramtha/teamsjs-cc-app/apps/teamsjs-cc-app/tabs/src/components/capabilities/App.tsx)

Namespace to interact with app initialization and lifecycle.


## `appInstallDialog`

[Reference](/javascript/api/@microsoft/teams-js/appinstalldialog) | [Sample](https://github.com/vikramtha/microsoft-teams-library-js/blob/vikramtha/teamsjs-cc-app/apps/teamsjs-cc-app/tabs/src/components/capabilities/AppInstallDialog.tsx)

TODO: Description

## `call`

[Reference](/javascript/api/@microsoft/teams-js/call) | [Sample](https://github.com/vikramtha/microsoft-teams-library-js/blob/vikramtha/teamsjs-cc-app/apps/teamsjs-cc-app/tabs/src/components/capabilities/Call.tsx)

TODO: Description

## `chat`

[Reference](/javascript/api/@microsoft/teams-js/chat) | [Sample](https://github.com/vikramtha/microsoft-teams-library-js/blob/vikramtha/teamsjs-cc-app/apps/teamsjs-cc-app/tabs/src/components/capabilities/Chat.tsx)

Contains functionality to start chat with others.

## `dialog`

[Reference](/javascript/api/@microsoft/teams-js/dialog) | Sample

This group of capabilities enables apps to show modal dialogs. There are two primary types of dialogs: URL-based dialogs and Adaptive Card dialogs. Both types of dialogs are shown on top of your app, preventing interaction with your app while they are displayed.

- URL-based dialogs allow you to specify a URL from which the contents will be shown inside the dialog. For URL dialogs, use the functions and interfaces in the url namespace.
- Adaptive Card-based dialogs allow you to provide JSON describing an Adaptive Card that will be shown inside the dialog. For Adaptive Card dialogs, use the functions and interfaces in the adaptiveCard namespace.

<br />
<table border>
    <thead>
        <tr>
            <th></th>
            <th colspan=3>Web</th>
            <th colspan=3>Desktop</th>
            <th colspan=6>Mobile</th>
        </tr>
        <tr>
            <th></th>
            <th colspan=3></th>
            <th colspan=3>Windows</th>
            <th colspan=3>Android</th>
            <th colspan=3>iOS</th>
        </tr>
        <tr>
            <td></td>
            <td><image alt="Teams" src="./images/teams-thumb.png"/></td>
            <td><image alt="Microsoft 365 app" src="./images/microsoft365-thumb.png"/></td>
            <td><image alt="Outlook" src="./images/outlook-thumb.png"/></td>
            <td><image alt="Teams" src="./images/teams-thumb.png"/></td>
            <td><image alt="Microsoft 365 app" src="./images/microsoft365-thumb.png"/></td>
            <td><image alt="Outlook" src="./images/outlook-thumb.png"/></td>
            <td><image alt="Teams" src="./images/teams-thumb.png"/></td>
            <td><image alt="Microsoft 365 app" src="./images/microsoft365-thumb.png"/></td>
            <td><image alt="Outlook" src="./images/outlook-thumb.png"/></td>
            <td><image alt="Teams" src="./images/teams-thumb.png"/></td>
            <td><image alt="Microsoft 365 app" src="./images/microsoft365-thumb.png"/></td>
            <td><image alt="Outlook" src="./images/outlook-thumb.png"/></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th><a href="#dialogadaptivecard">dialog.adaptiveCard</a> <img src="./images/preview-badge.png" /></th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <th><a href="#dialogurl">dialog.url</a></th>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td></td>
            <td>?</td>
            <td></td>
            <td></td>
            <td>?</td>
            <td></td>
            <td></td>
        </tr>
    </tbody>
</table>

### `dialog.adaptiveCard`

[Reference](/javascript/api/@microsoft/teams-js/dialog.adaptivecard) | [Sample](https://github.com/vikramtha/microsoft-teams-library-js/blob/vikramtha/teamsjs-cc-app/apps/teamsjs-cc-app/tabs/src/components/capabilities/Dialog.AdaptiveCard.tsx)

> [!IMPORTANT]
> This namespace is in preview and subject to change based on feedback. Please do not use in production.

Subcapability for interacting with adaptive card dialogs.

### `dialog.url`

Subcapability for interacting with URL-based dialogs.

[Reference](/javascript/api/@microsoft/teams-js/dialog.url) | [Sample](https://github.com/vikramtha/microsoft-teams-library-js/blob/vikramtha/teamsjs-cc-app/apps/teamsjs-cc-app/tabs/src/components/capabilities/Dialog.tsx)

## `geoLocation`

[Reference](/javascript/api/@microsoft/teams-js/geolocation) | [Sample](https://github.com/vikramtha/microsoft-teams-library-js/blob/vikramtha/teamsjs-cc-app/apps/teamsjs-cc-app/tabs/src/components/capabilities/GeoLocation.tsx)

Namespace to interact with the geoLocation module-specific part of the SDK. This is the newer version of location module.

## `menus`

[Reference](/javascript/api/@microsoft/teams-js/menus) | [Sample](https://github.com/vikramtha/microsoft-teams-library-js/blob/vikramtha/teamsjs-cc-app/apps/teamsjs-cc-app/tabs/src/components/capabilities/Menus.tsx)

Namespace to interact with the menu-specific part of the SDK. This object is used to show View Configuration, Action Menu and Navigation Bar Menu.

## `monetization`

[Reference](/javascript/api/@microsoft/teams-js/monetization) | [Sample](https://github.com/vikramtha/microsoft-teams-library-js/blob/vikramtha/teamsjs-cc-app/apps/teamsjs-cc-app/tabs/src/components/capabilities/Monetization.tsx)

TODO: No public APIs. Remove?

## `pages`

[Reference](/javascript/api/@microsoft/teams-js/pages) | [Sample](https://github.com/vikramtha/microsoft-teams-library-js/blob/vikramtha/teamsjs-cc-app/apps/teamsjs-cc-app/tabs/src/components/capabilities/Pages.tsx)

Navigation-specific part of the TeamsJS library.

<br />
<table border>
    <thead>
        <tr>
            <th></th>
            <th colspan=3>Web</th>
            <th colspan=3>Desktop</th>
            <th colspan=6>Mobile</th>
        </tr>
        <tr>
            <th></th>
            <th colspan=3></th>
            <th colspan=3>Windows</th>
            <th colspan=3>Android</th>
            <th colspan=3>iOS</th>
        </tr>
        <tr>
            <td></td>
            <td><image alt="Teams" src="./images/teams-thumb.png"/></td>
            <td><image alt="Microsoft 365 app" src="./images/microsoft365-thumb.png"/></td>
            <td><image alt="Outlook" src="./images/outlook-thumb.png"/></td>
            <td><image alt="Teams" src="./images/teams-thumb.png"/></td>
            <td><image alt="Microsoft 365 app" src="./images/microsoft365-thumb.png"/></td>
            <td><image alt="Outlook" src="./images/outlook-thumb.png"/></td>
            <td><image alt="Teams" src="./images/teams-thumb.png"/></td>
            <td><image alt="Microsoft 365 app" src="./images/microsoft365-thumb.png"/></td>
            <td><image alt="Outlook" src="./images/outlook-thumb.png"/></td>
            <td><image alt="Teams" src="./images/teams-thumb.png"/></td>
            <td><image alt="Microsoft 365 app" src="./images/microsoft365-thumb.png"/></td>
            <td><image alt="Outlook" src="./images/outlook-thumb.png"/></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th><a href="pagescurrentapp">pages.currentApp</a></th>
            <td></td>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td></td>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <th><a href="pagestab">pages.tab</a></th>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td></td>
            <td>&#x2713;</td>
            <td></td>
            <td></td>
            <td>&#x2713;</td>
            <td></td>
            <td></td>
        </tr>
    </tbody>
</table>

### `pages.currentApp`

[Reference](/javascript/api/@microsoft/teams-js/pages.currentapp) | [Sample](https://github.com/vikramtha/microsoft-teams-library-js/blob/vikramtha/teamsjs-cc-app/apps/teamsjs-cc-app/tabs/src/components/capabilities/Pages.Current.tsx)

Provides functions for navigating without needing to specify your application ID.

### `pages.tab`

[Reference](/javascript/api/@microsoft/teams-js/pages.currentapp) | [Sample](https://github.com/vikramtha/microsoft-teams-library-js/blob/vikramtha/teamsjs-cc-app/apps/teamsjs-cc-app/tabs/src/components/capabilities/Pages.Current.tsx)

Provides APIs for querying and navigating between contextual tabs of an application. Unlike personal tabs, contextual tabs are pages associated with a specific context, such as channel or chat.

## `people`

[Reference](/javascript/api/@microsoft/teams-js/people) | [Sample](https://github.com/vikramtha/microsoft-teams-library-js/blob/vikramtha/teamsjs-cc-app/apps/teamsjs-cc-app/tabs/src/components/capabilities/People.tsx)

TODO: description

## `sharing`

[Reference](/javascript/api/@microsoft/teams-js/sharing) | [Sample](https://github.com/vikramtha/microsoft-teams-library-js/blob/vikramtha/teamsjs-cc-app/apps/teamsjs-cc-app/tabs/src/components/capabilities/Sharing.tsx)

Namespace to open a share dialog for web content. For more info, see [Share to Teams from personal app or tab](../concepts/build-and-test/share-to-teams-from-personal-app-or-tab.md).

## `stageView`

[Reference](/javascript/api/@microsoft/teams-js/stageview) | [Sample](https://github.com/vikramtha/microsoft-teams-library-js/blob/vikramtha/teamsjs-cc-app/apps/teamsjs-cc-app/tabs/src/components/capabilities/StageView.tsx)

Namespace to interact with the stage view specific part of the SDK.

## `tasks`

[Reference](/javascript/api/@microsoft/teams-js/tasks) | Sample

> [!CAUTION]
> This namespace is slated for deprecation. It is currently supported for backwards compability purposes. For new apps, please use the [dialog](#dialog) capability.

Earlier version of the capability for providing modal dialog (task module) support, prior to TeamsJS v2.8.0.

## `teamsCore`

[Reference](/javascript/api/@microsoft/teams-js/teamscore) | [Sample](https://github.com/vikramtha/microsoft-teams-library-js/blob/vikramtha/teamsjs-cc-app/apps/teamsjs-cc-app/tabs/src/components/capabilities/TeamsCore.tsx)

Namespace containing the set of APIs that support Teams-specific functionalities.

## `video`

[Reference](/javascript/api/@microsoft/teams-js/video) | [Sample](https://github.com/vikramtha/microsoft-teams-library-js/blob/vikramtha/teamsjs-cc-app/apps/teamsjs-cc-app/tabs/src/components/capabilities/Video.tsx)

Namespace to video extensibility of the SDK.

## `webStorage`

[Reference](/javascript/api/@microsoft/teams-js/webstorage) | [Sample](https://github.com/vikramtha/microsoft-teams-library-js/blob/vikramtha/teamsjs-cc-app/apps/teamsjs-cc-app/tabs/src/components/capabilities/WebStorage.tsx)

Contains functionality to allow web apps to store data in webview cache.

## Code sample

| Sample name           | Description | Source|
:---------------------|:--------------|:---------|
| TeamsJS Capability Checker| Sample application to demonstrate the capabilities of Teams JS SDK v2 in Microsoft Teams apps extended across Outlook and Microsoft 365. | [TypeScript](https://github.com/vikramtha/microsoft-teams-library-js/tree/vikramtha/teamsjs-cc-app/apps/teamsjs-cc-app)

## Next step

> [!div class="nextstepaction"]
> []()

## See also

* [Extend Teams apps across Microsoft 365](../../m365-apps/overview.md)
* [Extend a Teams personal tab across Microsoft 365 app](../../m365-apps/extend-m365-teams-personal-tab.md)
* [Teams JavaScript client library overview](./using-teams-client-library.md)
* [TeamsJS API Reference](/javascript/api/@microsoft/teams-js)
