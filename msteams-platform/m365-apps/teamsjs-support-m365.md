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

TeamsJS v2.0 introduces the ability for certain types of Teams apps to run across the Microsoft 365 ecosystem. Currently, other Microsoft 365 application hosts (including Microsoft 365 app and Outlook) for Teams apps support a subset of the application types and capabilities you can build for the Teams platform. This support will expand over time. For a summary of host support for Teams apps, see [Extend Teams apps across Microsoft 365](../../m365-apps/overview.md).

This article details the level of support of Teams JavaScript client (TeamsJS) library capabilities across various Microsoft 365 host applications.

## `app` namespace

<br />
<table border>
    <thead>
        <tr>
            <th colspan=3>Web</th>
            <th colspan=3>Desktop</th>
            <th colspan=6>Mobile</th>
        </tr>
        <tr>
            <td>Teams</td>
            <td>Microsoft 365</td>
            <td>Outlook</td>
            <td>Teams (Windows)</td>
            <td>Microsoft 365 (Windows)</td>
            <td>Outlook (Windows)</td>
            <td>Teams (Android)</td>
            <td>Teams (iOS)</td>
            <td>Microsoft 365 (Android)</td>
            <td>Microsoft 365 (iOS)</td>
            <td>Outlook (Android)</td>
            <td>Outlook (iOS)</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td></td>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    </tbody>
</table>

<br /><br />
<table border>
    <thead>
        <tr>
            <th></th>
            <th colspan=3>Web</th>
            <th colspan=3>Desktop</th>
            <th colspan=6>Mobile</th>
        </tr>
        <tr>
            <td></td>
            <td>Teams</td>
            <td>Microsoft 365 app</td>
            <td>Outlook</td>
            <td>Teams for Windows</td>
            <td>Microsoft 365 for Windows</td>
            <td>Outlook for Windows</td>
            <td>Teams for Android</td>
            <td>Teams for iOS</td>
            <td>Microsoft 365 for Android</td>
            <td>Microsoft 365 for iOS</td>
            <td>Outlook for Android</td>
            <td>Outlook for iOS</td>
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
            <td>&#x2713;</td>
            <td></td>
            <td></td>
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
            <td>&#x2713;</td>
            <td></td>
            <td></td>
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
            <td>&#x2713;</td>
            <td></td>
            <td></td>
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
            <td>&#x2713;</td>
            <td></td>
            <td></td>
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
            <td>&#x2713;</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <th><a href="#geoLocation">geoLocation</a></th>
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
            <td>&#x2713;</td>
            <td></td>
            <td></td>
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
            <td>&#x2713;</td>
            <td></td>
            <td></td>
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
            <td>?</td>
            <td></td>
            <td></td>
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
            <td>?</td>
            <td></td>
            <td></td>
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
            <td>?</td>
            <td></td>
            <td></td>
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
            <td>?</td>
            <td></td>
            <td></td>
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
            <td>?</td>
            <td></td>
            <td></td>
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
            <td>&#x2713;</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    </tbody>
</table>

## `app`

[Reference](https://learn.microsoft.com/javascript/api/@microsoft/teams-js/app) | Sample

Namespace to interact with app initialization and lifecycle.

<table border>
    <thead>
        <tr>
            <th></th>
            <th colspan=3>Web</th>
            <th colspan=3>Desktop</th>
            <th colspan=6>Mobile</th>
        </tr>
        <tr>
            <td></td>
            <td style="writing-mode:vertical-lr">teams.microsoft.com</td>
            <td style="writing-mode:vertical-lr">microsoft365.com</td>
            <td style="writing-mode:vertical-lr">outlook.com</td>
            <td style="writing-mode:vertical-lr">Teams for Windows</td>
            <td style="writing-mode:vertical-lr">Microsoft 365 app for Windows</td>
            <td style="writing-mode:vertical-lr">Outlook for Windows</td>
            <td style="writing-mode:vertical-lr">Teams for Android</td>
            <td style="writing-mode:vertical-lr">Teams for iOS</td>
            <td style="writing-mode:vertical-lr">Microsoft 365 app for Android</td>
            <td style="writing-mode:vertical-lr">Microsoft 365 app for iOS</td>
            <td style="writing-mode:vertical-lr">Outlook for Android</td>
            <td style="writing-mode:vertical-lr">Outlook for iOS</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th>getContext</th>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td></td>
            <td>&#x2713;</td>
            <td></td>
        </tr>
    </tbody>
</table>

## `dialog`

[Reference](https://learn.microsoft.com/javascript/api/@microsoft/teams-js/dialog) | Sample



<table border>
    <thead>
        <tr>
            <th></th>
            <th colspan=3>Web</th>
            <th colspan=3>Desktop</th>
            <th colspan=6>Mobile</th>
        </tr>
        <tr>
            <td></td>
            <td style="writing-mode:vertical-lr">teams.microsoft.com</td>
            <td style="writing-mode:vertical-lr">microsoft365.com</td>
            <td style="writing-mode:vertical-lr">outlook.com</td>
            <td style="writing-mode:vertical-lr">Teams for Windows</td>
            <td style="writing-mode:vertical-lr">Microsoft 365 app for Windows</td>
            <td style="writing-mode:vertical-lr">Outlook for Windows</td>
            <td style="writing-mode:vertical-lr">Teams for Android</td>
            <td style="writing-mode:vertical-lr">Teams for iOS</td>
            <td style="writing-mode:vertical-lr">Microsoft 365 app for Android</td>
            <td style="writing-mode:vertical-lr">Microsoft 365 app for iOS</td>
            <td style="writing-mode:vertical-lr">Outlook for Android</td>
            <td style="writing-mode:vertical-lr">Outlook for iOS</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th>dialog.adaptiveCard</th>
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
            <th>dialog.url</th>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td></td>
            <td>?</td>
            <td>?</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    </tbody>
</table>

## `pages`

[Reference](https://learn.microsoft.com/javascript/api/@microsoft/teams-js/pages) | Sample



<table border>
    <thead>
        <tr>
            <th></th>
            <th colspan=3>Web</th>
            <th colspan=3>Desktop</th>
            <th colspan=6>Mobile</th>
        </tr>
        <tr>
            <td></td>
            <td style="writing-mode:vertical-lr">teams.microsoft.com</td>
            <td style="writing-mode:vertical-lr">microsoft365.com</td>
            <td style="writing-mode:vertical-lr">outlook.com</td>
            <td style="writing-mode:vertical-lr">Teams for Windows</td>
            <td style="writing-mode:vertical-lr">Microsoft 365 app for Windows</td>
            <td style="writing-mode:vertical-lr">Outlook for Windows</td>
            <td style="writing-mode:vertical-lr">Teams for Android</td>
            <td style="writing-mode:vertical-lr">Teams for iOS</td>
            <td style="writing-mode:vertical-lr">Microsoft 365 app for Android</td>
            <td style="writing-mode:vertical-lr">Microsoft 365 app for iOS</td>
            <td style="writing-mode:vertical-lr">Outlook for Android</td>
            <td style="writing-mode:vertical-lr">Outlook for iOS</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th>pages.currentApp</th>
            <td></td>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
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
            <th>pages.tab</th>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td>&#x2713;</td>
            <td></td>
            <td>?</td>
            <td>?</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    </tbody>
</table>

## Code sample

| Sample name           | Description | Source|
:---------------------|:--------------|:---------|
|| |

## Next step

> [!div class="nextstepaction"]
> []()

## See also

* [Extend Teams apps across Microsoft 365](../../m365-apps/overview.md)
* [Extend a Teams personal tab across Microsoft 365 app](../../m365-apps/extend-m365-teams-personal-tab.md)
* [Teams JavaScript client library overview](./using-teams-client-library.md)
* [TeamsJS API Reference](/javascript/api/@microsoft/teams-js)
