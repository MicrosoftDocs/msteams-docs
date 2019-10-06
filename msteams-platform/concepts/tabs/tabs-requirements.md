---
title: Requirements for tab pages in Microsoft Teams
description: Requirements for tab pages in Microsoft Teams
keywords: teams formats links
---
# Requirements for tab pages in Microsoft Teams

All tab content, including configuration, content, and tab-removal pages must meet the following requirements:

* Pages must be hosted on a secure HTTPS endpoint. Microsoft Teams will not display insecure HTTP content.
* Your content must work in an &lt;iframe&gt;. By default, web pages can be iframed by anyone, but most existing websites prevent themselves from being embedded in an &lt;iframe&gt;. You may optionally set these headers if you wish to only allow your page to be iframed by Microsoft Teams for extra security:
  * Set header: <br/>
    `Content-Security-Policy: frame-ancestors teams.microsoft.com *.teams.microsoft.com *.skype.com` <br/>
    Most modern browsers support this.
    * For Internet Explorer 11 compatibility, set `X-Content-Security-Policy` as well.
  * Alternatively, set header `X-Frame-Options: ALLOW-FROM https://teams.microsoft.com/`. This header is deprecated but still respected by most browsers.
* Include the [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client) in your page as a script source. There are multiple ways to do this; please refer to [this](/javascript/api/overview/msteams-client) for detailed instructions.
* After your page has successfully loaded, call `microsoftTeams.initialize()` to display your page. Microsoft Teams will not display your page unless you do so.
* All domains for pages you display in your tabs must be listed in the manifest's `validDomains` list. See [validDomains](~/resources/schema/manifest-schema.md#validdomains) in the manifest schema reference for more information.

> Hitting problems? See the [troubleshooting guide](~/troubleshoot/troubleshoot.md).
>
> [!TIP]
> For developers using TypeScript, Microsoft Teams provides a [definition file](https://statics.teams.microsoft.com/sdk/v1.2/types/MicrosoftTeams.d.ts) to enable IntelliSense or similar support from your code editor as well as compile-time type checking as part of your build.

## Tabs on mobile clients

Follow the [guidance for tabs on mobile](~/resources/design/framework/tabs-mobile.md) when creating your tabs. If your tab uses authentication, you must upgrade your Teams JavaScript SDK to version 1.4.1 or later, or authentication will fail.

### Channel/group (configurable) tabs on mobile

Mobile clients only show tabs that have a value for `websiteUrl`. If you want your tab to appear on the Teams mobile clients, you must set the value of `websiteUrl`. When a use launches your tab from a mobile client, it will open in a browser outside of Teams using the `websiteUrl.

If user opens a configurable tab on browser using 'websiteUrl', you can use iOS *universal links* or Android *app links* to deeplink `websiteUrl` in your mobile app if you want to. The OS will also prompt the user to install your app if it is not already installed.

Information on universal links and app links:

* [iOS universal links](https://developer.apple.com/ios/universal-links/)
* [Android app links](https://developer.android.com/training/app-links/index.html)

>[!Note]
>For apps published to the public App Store, if you want your channel tab to open inside teams by default, follow the [guidance for tabs on mobile](~/resources/design/framework/tabs-mobile.md), and reach out to your support rep to request to be whitelisted.

### Personal (static) tabs on mobile

Personal (static) tabs are available in [developer preview](~/resources/dev-preview/developer-preview-intro.md) for mobile clients.
