---
title: Tabs on mobile
description: Describes developer considerations for implementing tabs on Microsoft Teams mobile.
ms.topic: conceptual
localization_priority: Normal
---
# Tabs on mobile

When you're building a Microsoft Teams app that includes a tab, you must consider (and test) how your tab will function on both the Android and iOS Microsoft Teams clients. The sections below outline some of the key scenarios you need to consider.

## Authentication

For authentication to work on mobile clients, you must upgrade you Teams JavaScript SDK to at least version 1.4.1.

## Low bandwidth and intermittent connections

Mobile clients regularly need to function with low bandwidth and intermittent connections. Your app should handle any timeouts appropriately by providing a contextual message to the user. You should also user progress indicators to provide feedback to your users for any long-running processes.

> [!NOTE]
> Tabs are enabled on mobile only after the application is added to an allow list, based on the input of the approval team. 
> To check mobile responsiveness, reach out to teamsubm@microsoft.com.

## Testing on mobile clients

You need to validate that your tab functions properly on mobile devices of various sizes and qualities. For Android devices, you can use the [DevTools](~/tabs/how-to/developer-tools.md) to debug your tab while it is running. We recommend that you test on both high- and low-performance devices, including a tablet.

## Distribution

Apps listed on the Teams store must be approved for mobile use to function properly in the Teams mobile client. Tab availability and behavior depends on whether your app is approved.

### Apps on Teams store approved for mobile

The following table describes tab availability and behavior when the app is listed on the Teams store and approved for mobile use.

|Capability   |Mobile availability?   |Mobile behavior|
|----------|-----------|------------|
|Channel <br /> and group tab|Yes|Tab opens in the Teams mobile client using your app's `contentUrl` configuration.|
|Personal app|Yes|Each tab in the personal app tab opens in the Teams mobile client using its respective `contentUrl` configuration.|

### Apps on Teams store not approved for mobile

The following table describes tab availability and behavior when the app is listed on the Teams store but not approved for mobile use.

|Capability   |Mobile availability?|Mobile behavior|
|----------|-----------|------------|
|Channel and group tab|Yes|Tab opens in the device's default browser instead of the Teams mobile client using your app's `websiteUrl` configuration (which also must be included in your source code's `setSettings()` [function](https://docs.microsoft.com/javascript/api/@microsoft/teams-js/settings?view=msteams-client-js-latest#functions)). However, users can still view the tab in the Teams mobile client by selecting **More** next to the app and choosing **Open**, which triggers your app’s `contentUrl` configuration.|
|Personal app|No|Not applicable|

### Apps not on Teams store

If you're sideloading your app or publishing to an org's app catalog, tab behavior will be the same as Teams store apps approved by Microsoft for mobile.
