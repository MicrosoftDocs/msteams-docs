---
title: Static tabs
description: Describes how to get started with static tabs in Microsoft Teams
keywords: get started static tabs teams
---
# Static tabs

> [!Note]
> Static tabs on mobile are currently in [developer preview](~/resources/dev-preview/developer-preview-intro.md).

A *static tab* supports an individual user. For example, if your service is a notetaking app, add a tab that holds a user's personal notes. That way, a user can refer to his or her own notes without having to share them with the entire team.

* [Declare your static tab identity](~/concepts/tabs/tabs-static.md): Static tabs are declared directly in the manifest of your app package.
* [Create the content page](~/concepts/tabs/tabs-content.md): Microsoft Teams displays the page in an iframe when the user visits your tab. Content in a static tab is subject to the same constraints as a configurable tab.

## Create a static tab in Microsoft Teams

A static tab is a [content page](~/concepts/tabs/tabs-content.md) that is declared directly in your manifest and&mdash;unlike a configurable tab&mdash;does not require a configuration page.

Currently, you can add one or more static tabs to your app's "personal scope" experience, accessed via the app bar or alongside your app's bot conversation.

![Static tabs example](~/assets/images/tabs_in_bot.png)

## Creating tab content

Content pages in Teams, regardless of scope or type, should follow the guidelines in [Create a content page](~/concepts/tabs/tabs-content.md).

## Static tabs on mobile clients

> [!Note]
> Static tabs on mobile are currently in [developer preview](~/resources/dev-preview/developer-preview-intro.md). Static tabs on a mobile client with developer preview enabled will open their content URL within the Teams mobile client.

Static tabs should also follow the guidance for [personal apps on mobile](~/resources/design/framework/personal-apps-mobile.md).

## Adding your tabbed content to your app package

Define your static tab experience in the [`staticTabs`](~/resources/schema/manifest-schema.md#statictabs) block of the manifest.

For more information on creating your app package, see [Create the package for your Microsoft Teams app](~/concepts/apps/apps-package.md).

### Manifest example for a static tab

```json
⋮
"staticTabs": [
  {
    "entityId": "TestAppAbout",
    "name": "About",
    "contentUrl": "https://teams-specific-webview.website.com/about",
    "websiteUrl": "http://fullwebsite.website.com/about",
    "scopes": [ "personal" ]
  },
  {
    "entityId": "TestAppMyTasks",
    "name": "My Tasks",
    "contentUrl": "https://teams-specific-webview.website.com/mytasks",
    "websiteUrl": "http://fullwebsite.website.com/mytasks",
    "scopes": [ "personal" ]
  }
]
⋮
```

The `staticTabs` object allows you to specify one or more tabs, up to 16, with the following required elements:

* `entityId`&emsp;A user-defined ID that uniquely identifies the tab; analogous to the `entityId` used in [deep links](~/concepts/deep-links.md) to a configurable tab
* `name`&emsp;The name shown on the tab
* `contentUrl`&emsp;The content URL to show in the tab
* `websiteUrl`&emsp;The URL to the full chrome content to display in the default browser
* `scopes`&emsp; static tabs are used only in the `personal` context

### Add static tab URLs to validDomains

All URLs you add in static tabs must be referenced in the [`validDomains`](~/resources/schema/manifest-schema.md#validdomains) section of the manifest. Failure to do so could result in a blank tab. Please note that although you can use wildcards for subdomains, be sure to appropriately scope for only the content you control and expect in the tab experience. For example, `yourapp.onmicrosoft.com` is good, but `*.onmicrosoft.com` is not.
