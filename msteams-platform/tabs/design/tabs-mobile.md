---
title: Tabs on mobile
description: Learn how tab functions on Android and iOS Microsoft Teams clients (mobile), their authentication, low bandwidth connection, testing, or distribution.
ms.topic: conceptual
ms.localizationpriority: high
ms.date: 11/02/2022
---

# Tabs on mobile

When you're building a Microsoft Teams app that includes a tab, you must test how your tab functions on both the Android and iOS Microsoft Teams clients. This article outlines some of the key scenarios you must consider to ensure optimal user experience.

Apps [distributed through the Microsoft Teams Store](~/concepts/deploy-and-publish/appsource/publish.md) have a separate approval process for mobile clients. The default behavior of such apps is as follows:

| **App capability** | **Behavior if app is approved** | **Behavior if app is not approved** |
| --- | --- | --- |
| **Personal tabs** | App appears in the bottom bar of the mobile clients. Tabs open in the Teams client. | App doesn't appear in the bottom bar of the mobile clients. |
| **Channel and group tabs** | The tab opens in the Teams client using `contentUrl`. | If `websiteUrl` is available in the app manifest file, the tab opens in a browser outside Teams. </br> If `websiteUrl` isn’t available in the app manifest file, the tab isn’t accessible on Teams mobile. However, the tab is still accessible on Desktop and web. |

> [!NOTE]
>
> * Apps submitted to the [AppSource](https://appsource.microsoft.com) for publishing on Teams are evaluated automatically for mobile responsiveness. For any queries, reach out to <teamsubm@microsoft.com>.
> * For all apps that are not distributed through the AppSource, the tabs open in an in-app webview within the Teams clients by default and there is no separate approval process required.
> * The default behavior of apps is only applicable if distributed through the Teams Store. By default, all tabs open in the Teams client.
> * To initiate an evaluation of your app for mobile-friendliness, reach out to <teamsubm@microsoft.com> with your app details.
> * If a mobile app has multiple tabs, whenever the user switches a tab, the tab doesn't reload.

## Authentication

For authentication to work on mobile clients, you must upgrade you Teams JavaScript library to at least version 1.4.1.

## Low bandwidth and intermittent connections

Mobile clients function with low bandwidth and intermittent connections. Your app must handle any timeouts appropriately by providing a contextual message to the user. You must also use progress indicators to provide feedback to your users for any long-running processes.

## Testing on mobile clients

You must validate that your tab functions properly on mobile devices of various sizes and qualities. For Android devices, you can use [DevTools](~/tabs/how-to/developer-tools.md) to debug your tab while it's running. It's recommended that you test on both high and low-performance devices, including a tablet.

## Distribution

Apps listed on the Teams Store must be approved for mobile use to function properly in the Teams mobile client. Tab availability and behavior depends on whether your app is approved.

### Apps on Teams Store approved for mobile

The following table describes tab availability and behavior when the app is listed on the Teams Store and approved for mobile use:

|Capability   |Mobile availability?   |Mobile behavior|
|----------|-----------|------------|
|Channel <br /> and group tab|Yes|Tab opens in the Teams mobile client using your app's `contentUrl` configuration.|
|Personal app|Yes|Each tab in the personal app tab opens in the Teams mobile client using its respective `contentUrl` configuration.|

### Apps on Teams Store not approved for mobile

The following table describes tab availability and behavior when the app is listed on the Teams Store but not approved for mobile use:

| Capability | Mobile availability? | Mobile behavior |
|----------|-----------|------------|
|Channel and group tab|Yes|Tab opens in the device's default browser instead of the Teams mobile client using your app's `websiteUrl` configuration, which must also be included in your source code's `setSettings()` [function](/microsoftteams/platform/tabs/how-to/using-teams-client-sdk#settings-namespace). |
|Personal app|No|Not applicable|

> [!NOTE]
>
> * The bot messages are shown in the chat section if a mobile app has both the bot and tab capabilities.
> * When you select **Chat** of the bot app and select **More (...)**, you can't see the tab capability of that app in the list. However, if you select **More (...)** from the lower right of the **Chat** section, you can view the tab app with a link to the bot app capability of that app.

### Apps not on Teams Store

If you're uploading your custom app or publishing to an organization's app catalog, tab behavior is the same as Teams Store apps approved by Microsoft for mobile.

## Next step

> [!div class="nextstepaction"]
> [Get context for your tab](~/tabs/how-to/access-teams-context.md)

## See also

* [Build tabs for Teams](../what-are-tabs.md)
* [Build tabs with Adaptive Cards](../how-to/build-adaptive-card-tabs.md)
* [Create a personal tab](../how-to/create-personal-tab.md)
* [Plan responsive tabs for Teams mobile](../../concepts/design/plan-responsive-tabs-for-teams-mobile.md)
* [Design your tab for Microsoft Teams](tabs.md)
* [DevTools for Microsoft Teams tabs](../how-to/developer-tools.md)
* [Test your app](../../concepts/build-and-test/test-app-overview.md)
* [Distribute your Microsoft Teams app](../../concepts/deploy-and-publish/apps-publish-overview.md)
* [Create Teams app package](../../concepts/build-and-test/apps-package.md)
* [App manifest schema for Teams](../../resources/schema/manifest-schema.md#statictabs)
