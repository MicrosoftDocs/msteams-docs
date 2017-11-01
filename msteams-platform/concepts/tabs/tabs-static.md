---
title: Create a static tab
description: Describes how to get started with static tabs in Microsoft Teams
keywords: get started static tabs teams
---

# Create a static tab in Microsoft Teams

A static tab is a [content page](~/concepts/tabs/tabs-content) that is declared directly in your manifest and&mdash;unlike a configurable tab&mdash;does not require a configuration page.

Currently, you can add one or more static tabs to your app's "personal scope" experience, accessed via the app bar or alongside your app's bot conversation.

![Static tabs example](~/assets/images/tabs_in_bot.png)

## Creating tab content

Content pages in Teams, regardless of scope or type, should follow the guidelines in [Create a content page](~/concepts/tabs/tabs-content).

## Adding your tabbed content to your app package

Define your static tab experience in the [`staticTabs`](~/resources/schema/manifest-schema#statictabs) block of the manifest.  

For more information on creating your app package, see [Create the package for your Microsoft Teams app](~/publishing/apps-package).

#### Manifest example for a static tab

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

<!-- TODO get this from sample app -->

The `staticTabs` object allows you to specify one or more tabs, up to 16, with the following required elements:

* `entityId`&emsp;A user-defined ID that uniquely identifies the tab; analogous to the `entityId` used in [deep links](~/concepts/deep-links) to a configurable tab
* `name`&emsp;The name shown on the tab
* `contentUrl`&emsp;The content URL to show in the tab
* `websiteUrl`&emsp;The URL to the full chrome content to display in the default browser
* `scopes`&emsp;At this point, static tabs are used only in the `personal` context

## Add static tab URLs to validDomains

All URLs you add in static tabs must be referenced in the [`validDomains`](~/resources/schema/manifest-schema#validdomains) section of the manifest. Failure to do so could result in a blank tab. Please note that although you can use wildcards for subdomains, be sure to appropriately scope for only the content you control and expect in the tab experience. For example, `yourapp.onmicrosoft.com` is good, but `*.onmicrosoft.com` is not.
