---
title: Requirements for tab pages in Microsoft Teams
description: Requirements for tab pages in Microsoft Teams
keywords: teams formats links
ms.date: 05/03/2018
---
# Requirements for tab pages in Microsoft Teams

All tab content, including configuration, content, and tab-removal pages must meet the following requirements:

* Pages must be hosted on a secure HTTPS endpoint. Microsoft Teams will not display insecure HTTP content.
* Your content must work in an iframe. By default, web pages can be iframed by anyone. You may optionally set these headers if you wish to only allow your page to be iframed by Microsoft Teams for extra security:
  * Set header `Content-Security-Policy: frame-ancestors teams.microsoft.com *.teams.microsoft.com *.skype.com`. Most modern browsers support this.
    * For Internet Explorer 11 compatibility, set `X-Content-Security-Policy` as well.
  * Alternatively, set header `X-Frame-Options: ALLOW-FROM https://teams.microsoft.com/`. This header is deprecated but still respected by most browsers.
* Include the [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client) in your page as a script source.

  `<script src="node_modules/@microsoft/teams-js@1.3.3/dist/MicrosoftTeams.min.js" />`

* After your page has successfully loaded, call `microsoftTeams.initialize()` to display your page. Microsoft Teams will not display your page unless you do so.
* All domains for pages you display in your tabs must be listed in the manifest's `validDomains` list. See [validDomains](~/resources/schema/manifest-schema#validdomains) in the manifest schema reference for more information.

> Hitting problems? See the [troubleshooting guide](~/troubleshoot/troubleshoot).
>
> [!TIP]
> For developers using TypeScript, Microsoft Teams provides a [definition file](https://statics.teams.microsoft.com/sdk/v1.0/types/MicrosoftTeams.d.ts) to enable IntelliSense or similar support from your code editor as well as compile-time type checking as part of your build.

## Tabs on mobile clients

Tabs behave differently on the iOS and Android Teams clients than on the Teams desktop or web clients.

### Desktop and web client behavior

What appears in a tab on desktop/web is defined by the value of `contentUrl`: Teams displays the contents of `contentUrl` in the tab. (See [Determine the content to display in the tab](~/concepts/tabs/tabs-configuration#determine-the-content-to-display-in-the-tab)). If the tab has a value for `websiteUrl`, another icon appears with the others at the upper right of the tab: ![Go to website](~/assets/images/go-to-website-icon.png). When the user clicks on this icon, `websiteUrl` is opened in a new browser tab.

### Mobile client behavior

On mobile clients, where there's far less screen real estate, it's not possible to show the contents of files and tabs embedded inside Teams; instead, the user navigates to them via the "Files & Tabs" tab. The mobile clients only show tabs that have a value for `websiteUrl`: if you want your tab to appear on the Teams mobile clients, you must set the value of `websiteUrl`.

Since the Teams mobile clients use the mobile OS to open `websiteUrl`, you can use iOS *universal links* or Android *app links* to open `websiteUrl` in your mobile app. The OS will also prompt the user to install your app if it is not already installed.

Information on universal links and app links:

* [iOS universal links](https://developer.apple.com/ios/universal-links/)
* [Android app links](https://developer.android.com/training/app-links/index.html)
