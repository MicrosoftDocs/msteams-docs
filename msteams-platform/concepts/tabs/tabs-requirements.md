---
title: Requirements for tab pages in Microsoft Teams
description: Requirements for tab pages in Microsoft Teams
keywords: teams formats links
ms.date: 04/25/2018
---
# Requirements for tab pages in Microsoft Teams

All tab content, including configuration, content, and tab-removal pages must meet the following requirements:

* Pages must be hosted on a secure HTTPS endpoint. Microsoft Teams will not display insecure HTTP content.
* Your content must work in an iframe. By default, web pages can be iframed by anyone. You may optionally set these headers if you wish to only allow your page to be iframed by Microsoft Teams for extra security:
  * Set header `Content-Security-Policy: frame-ancestors teams.microsoft.com *.teams.microsoft.com *.skype.com`. Most modern browsers support this.
    * For Internet Explorer 11 compatibility, set `X-Content-Security-Policy` as well.
  * Alternatively, set header `X-Frame-Options: ALLOW-FROM https://teams.microsoft.com/`. This header is deprecated but still respected by most browsers.
* Include the [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client) in your page as a script source.

  `<script src="https://statics.teams.microsoft.com/sdk/v1.0/js/MicrosoftTeams.min.js" />`

* After your page has successfully loaded, call `microsoftTeams.initialize()` to display your page. Microsoft Teams will not display your page unless you do so.
* All domains for pages you display in your tabs must be listed in the manifest's `validDomains` list. See [validDomains](~/resources/schema/manifest-schema#validdomains) in the manifest schema reference for more information.

> Hitting problems? See the [troubleshooting guide](~/troubleshoot/troubleshoot).
>
> [!TIP]
> For developers using TypeScript, Microsoft Teams provides a [definition file](https://statics.teams.microsoft.com/sdk/v1.0/types/MicrosoftTeams.d.ts) to enable IntelliSense or similar support from your code editor as well as compile-time type checking as part of your build.

## Tabs on mobile clients

Tabs behave differently on the Teams desktop experience and the native Teams apps on Android and iOS. The default experience for a tab is set by the value of `contentUrl` (See [Determine the content to display in the tab](~/concepts/tabs/tabs-configuration#determine-the-content-to-display-in-the-tab)). Teams on the desktop will render the tab contents itself, but on mobile it must be rendered by the platforms default rendering engine. Because of this you will need to set the optional property `websiteUrl` to enable display in the default rendering engine. Otherwise Teams on mobile will not show your tab as available.

You might also want to have the content of the tab displayed in your own native app, in which case you would use the  `websiteUrl` parameter and set it to a url that follows the format specified by Apple *universal links* and Android *app links*.

Information on universal links:

* [iOS universal links](https://developer.apple.com/ios/universal-links/)
* [Android app links](https://developer.android.com/training/app-links/index.html)
