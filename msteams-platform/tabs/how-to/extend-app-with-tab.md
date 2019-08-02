---
title: Create a Teams app tab
author: laujan
description: A guide to building a tab
keywords: teams tabs group channel configurable 
ms.topic: conceptual
ms.author: 
---
# Create a Teams app tab

You can enhance your app experience by serving web content that you host to your channel, group chat, and personal users via a custom tab. Tabs provide efficient access to designated team information and resources. You'll need to complete the following steps to create a tab:

1. Prepare your development environment.
1. Create your tab page(s).
1. Create and deploy your app service

## Tab page requirements

&#x2705; You must allow your pages to be served in an IFrame, via X-Frame-Options and/or Content-Security-Policy HTTP response headers.

* Many standard websites block their pages from loading in an IFrame. However, Teams provides a unique webview option for users to view embedded content within the desktop client.

&#x2705; Your [authentication](foo.md) logic must use a method other than redirect (e.g., use token-based or cookie-based authentication).

* Typically, as a safeguard against click-jacking, login pages don't render in IFrames.

&#x2705; Your [cross-domain](foo.md) navigation logic should allow the Teams client to validate the origin against a static validDomains list in the app manifest when loading or communicating with the tab.

* Browsers adhere to a same-origin policy restriction that prevents a webpage from making requests to a different domain than the one that served a web page. However, you may need to redirect the configuration or content page to a another domain or subdomain.

&#x2705; Style your tabs based on the Teams client's theme, design, and intent (see [Content and conversations, all at once using tabs](foo.md)).

* Tabs work best when they're built to address a specific needs and focus on a small set of tasks or a subset of data that is relevant to the tab's channel location.

&#x2705; Following your page load, make a call to `microsoftTeams.initialize()` in the [Teams client SDK](/javascript/api/overview/msteams-client).

* Your script must include the `microsoftTeams.initialize()` method call for your page to be displayed.

## Create an app package

The app package is a zip folder containing the following:

* A **full color icon** measuring 192 x 192 pixels.
* A **transparent outline icon** measuring 32 x 32 pixels.
* A **manifest.json** file that specifies the attributes of your app and describes how an app integrates with the Teams client.

Your `manifest.json` file will contain values vital to your custom tab features and must conform to the [Teams Manifest Schema](/resources/schema/manifest-schema.md).

## Modify or remove a custom tab
git 
You can enable users to modify, reconfigure, or rename a group/channel tab by setting your manifest's `canUpdateConfiguration` property to `true`. Supported removal options can further refine the user experience. You can designate what happens to the content when a tab is removed by including a removal options page in your app and setting a value for the `removeUrl` property in the  `setSettings()` configuration (see below). Personal tabs can't be modified but can be uninstalled by the user.

Microsoft Teams setSettings() configuration:

```javascript
microsoftTeams.settings.setSettings({
    contentUrl: "add content page URL here",
    entityId: "add unique name here",
    suggestedDisplayName: "add name to display on tab here",
    websiteUrl: "required for mobile clients",
    removeUrl: "add removal page URL here"
});
```

## Learn more

* [Create a content page for your tab](foo.md)
* [Create a configuration page for your tab](foo.md)
* [Update or remove a tab](foo.md)
