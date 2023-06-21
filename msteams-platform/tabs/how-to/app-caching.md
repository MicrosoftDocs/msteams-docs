---
title: App caching for your tab app
author: surbhigupta
description: Learn how to enable app caching to your tab app in Teams meeting and how it improves the launch time of the app.
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: high
ms.date: 04/07/2022
---

# App caching for your tab app

App caching improves subsequent launch time of the apps within Teams by allowing you to keep some resources and assets in memory that you can use when rehydrating your app.

App caching is supported for the following:

| Scope | &nbsp; Desktop | &nbsp; | iOS | Android |
| --- | --- | --- | --- | --- |
| &nbsp; | *Supported* | *Cache lifetime* | *Supported* | *Supported* |
| Personal | ✔️ Available only in [public developer preview](~/resources/dev-preview/developer-preview-intro.md) | 30 minutes| ✔️ | ❌ |
| Chat | ✔️ Available only in [public developer preview](~/resources/dev-preview/developer-preview-intro.md) | 30 minutes| ❌ | ❌ |
| Channel | ✔️ Available only in [public developer preview](~/resources/dev-preview/developer-preview-intro.md)| 30 minutes| ❌ | ❌ |
| Meeting tab | ✔️ Available only in [public developer preview](~/resources/dev-preview/developer-preview-intro.md) | 30 minutes| ❌ | ❌ |
| Meeting side panel or In-meeting apps | ✔️ Available only in [public developer preview](~/resources/dev-preview/developer-preview-intro.md) | 20 minutes| ❌ | ❌ |

## Enable app caching

To enable app caching, follow the steps:

1. Call `teamsCore.registerBeforeUnloadHandler` and `teamsCore.registerOnLoadHandler` APIs.

1. Use `contentUrl` and `entityId` passed into the load handler to route to the correct page within your app and invoke `notifySuccess` or `notifyFailure` to notify Teams client that the app initialization flow is complete.

   * [contentUrl](create-tab-pages/configuration-page.md#modify-or-remove-a-tab): Add content page URL.
   * [entityId](create-tab-pages/configuration-page.md#modify-or-remove-a-tab): Add a unique identifier.

1. Dispose resources and perform any cleanup needed in the `beforeUnload` handler, then invoke the `readyToUnload` callback to notify Teams client that the app unload flow is complete.

The following is the flow diagram of the first launch of an app that wants to opt into app caching (register the `load` or `beforeUnload` on the first launch of the app):

:::image type="content" source="../../assets/images/saas-offer/first-launch-app.png" alt-text="Screenshot shows the flow of the first launch of the app in meeting side panel.":::

The following is the flow diagram of the launch of cached app:

:::image type="content" source="../../assets/images/saas-offer/cached-launch-app.png" alt-text="Screenshot shows the flow of the cached launch of the app in meeting side panel.":::

When you opt into app caching, the webview that is used to host the embedded app is reused as users navigate to different instances of the app within a window. The webview used to host the app is hidden when the users leave the app and shown when the users return to the app.

> [!NOTE]
> If the app caching isn't enabled, the webview is recreated every time the user launches the app.

There are multiple reasons for an app to not get cached or for an app to get removed from the cache, some of the reasons are (numbers here are subject to change):

* If the system memory load is high, the app is removed from the cache.
* If the number of cached apps exceed the maximum cache size, the oldest cached app is removed from the cache.
* The app isn't cached if Teams doesn't receive the `readyToUnload` signal from the app within 30 seconds after sending the `beforeUnload` notification.
* App caching is disabled if the system memory is less than 4 GB or if the available memory is less than 1 GB on Windows or 512 MB on Mac.
* Side panel is the only supported frameContext for app caching in meetings.
* App caching isn't supported for meetings where the invited user count is more than 20.
* If an app fails to load, the app isn't cached.

## Code example

The following code snippet is an example of `teamsCore.registerOnLoadHandler` and `teamsCore.registerBeforeUnloadHandler` APIs:

```javascript
microsoftTeams.teamsCore.registerOnLoadHandler((data) => {
    console.log("got load from TEAMS", data.contentUrl, data.entityId);
    // use contentUrl to route to correct page 
    // invoke notifySuccess when ready  
    app.notifySuccess();
});
microsoftTeams.teamsCore.registerBeforeUnloadHandler((readyToUnload) => {
    // dispose resources and then invoke readyToUnload
    readyToUnload();
    return true;
});
```

## Best practices

It's recommended that you implement web storage capabilities to store the data locally in iOS and Android. This helps to load the app faster in subsequent launches.

## Limitations

The following are the limitations for app caching:

* Single-page apps that use client-side routing for page navigation can benefit from app caching. It's recommended that the same domain be used across all contexts of your app launch.

* Apps need to re-register for events such as `themeChange`, `focusEnter`, and so on, in the load handler. Teams client won't send any notifications to the app when cached. If your app requires notifications even when cached, caching might not be the right solution.

* App caching is supported only in Teams desktop client. In Teams web client, even if the app registers load handlers, the app is removed from the cache after the unload sequence is completed.

* Register the `load` and `beforeUnload` handlers early in your launch sequence. If the Teams client doesn’t see these registrations before the user leaves the app, the app isn't cached.

* The Teams client invokes the `loadHandler` only after the `unload` sequence of the app is completed. For example, if a user launches tab A of your app and then launches tab B of the same app, tab B won't get the load signal until the tab A invokes the `readyToUnload` callback.

* Apps are cached on a per-window basis. App caching happens on a per app (not on a per tab) basis within the same window.

* App caching isn't supported for the meeting stage or Task module contexts, because these can be opened on top of the tab and the same webview can't be used to render the content in the tab and the Task module.

* Register only the `beforeUnload` handler if your app doesn't require app caching but needs time to safely save state (as leaving the app can cause the app content to be abruptly removed from the Document Object Model (DOM)). If the app hasn't registered for the `load` event, it's removed from the DOM after the unload flow completes.

* Follow the guidelines in this section to onboard your app to app caching in Teams meeting. For app caching support only in meetings, register the `load` or `beforeUnload` handlers if the context is `sidePanel`.

* Apps are expected to sleep when cached (use minimal compute or network resources and minimizes SDK requests). All the register handlers and the following SDK requests are allowed when the app is cached:

  * `initialize`
  * `notifyappLoaded`
  * `notifySuccess`
  * `notifyFailure`
  * `notifyExpectedFailure`
  * `getContext`
  * `getAuthToken`
  * `readyToUnload`
  * `getConfig/getSettings`

## Troubleshooting

**Apps are not being cached? Why is load handler not invoked on subsequent navigation?**

* Verify if the system and available memory constraints are met.

* Reduce your memory footprint when cached. Use the `beforeUnload` handler to dispose resources, for example, release references and remove event listeners, that might not be needed when cached.

## Code sample

|Sample name | Description | Node.js |
|----------------|--------------------------------------------------------|
| App caching | Sample app to show how app caching works in the meeting side panel. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-cache-meetings/nodejs) |

## See also

* [Create a personal tab](create-personal-tab.md)
* [Create a channel tab or group tab](create-channel-group-tab.md)
* [Build tabs for meeting](../../apps-in-teams-meetings/build-tabs-for-meeting.md)
