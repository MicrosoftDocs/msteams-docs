---
title: App caching in Teams meeting
author: surbhigupta
description: Learn how to enable app caching to your app in Teams meeting and it improves the launch time of the app in meeting side panel.
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: high
ms.date: 04/07/2022
---

# Enable app caching for your tab app in meeting

> [!NOTE]
> App caching is available only in [public developer preview](~/resources/dev-preview/developer-preview-intro.md).

You can now configure your app to enable app caching to reduce the reload time of your app during a meeting. For your tab app, you can store your app data in the meeting by enabling app caching. It allows you to improve the app relaunch time within the meeting.

Here's what you'll learn in this section:

1. **App caching user experience**
1. **App caching at runtime**
1. **Enable app caching**

## App caching user experience

App caching improves subsequent launch time of the apps that are loaded in the meeting side panel by allowing you to keep some resources and assets in memory that you can use when rehydrating app.

Consider this use case for app caching. Your app is enabled to be installed in a Teams meeting. The meeting organizer or participants can install and use your app.

:::row:::
    :::column span="":::
        :::image type="content" source="../assets/images/app-caching/without-app-caching.png" alt-text="The screenshot shows you the app in meeting without app caching enabled.":::
    :::column-end:::
    :::column span="":::
        During the meeting, the participants may change the view from your app to another view on the meeting stage. When they want to open your app again, the app must go through the launch process again before it can be opened in the meeting window. This takes up a lot of time in a meeting context as participants are kept waiting while the app reloads.
    :::column-end:::
:::row-end:::
:::row:::
    :::column span="":::
        :::image type="content" source="../assets/images/app-caching/with-app-caching.png" alt-text="The Screenshot shows you the app in meeting with app caching enabled.":::":::
    :::column-end:::
    :::column span="":::
        With **app caching**, you can now reduce this reload time significantly. An app cache is a data storage layer that stores your app data in the meeting side panel. When the participants move away from the app and come back to it, the app is loaded from the app cache rather than relaunching the app.   It enhances the meeting experience of the participants and saves time and resources.
    :::column-end:::
:::row-end:::

> [!NOTE]
>
> * App caching is supported only for tabs loaded in the meeting side panel in Teams desktop client.
> * Meeting side panel is the only supported FrameContext for app caching in meetings.

## App caching at runtime

Implement app caching by storing your app data in the meeting side panel. This process flows in two stages:

1. [First launch of the app](#first-launch-of-the-app)
1. [Reload app from cache](#reload-app-from-cache)

### First launch of the app

The following is the flow diagram of the first launch of an app that wants to opt into app caching (register the `load` or `beforeUnload` on the first launch of the app):

:::image type="content" source="../assets/images/saas-offer/first-launch-app.png" alt-text="This screenshot shows the flow of the first launch of the app in meeting side panel.":::

| # | Interaction | What's going on |
| --- | --- | --- |
| 1. | Teams client → App | Teams client launches the app to the meeting side panel. |
| 2. | App → Teams client | App initialize the flow. |
| 3. | App → Teams client | App register `Load` or `beforeunload` handler with Teams clients and cache the app data in the meeting side panel. |
| 4. | App → Teams client | App invokes SDK `notifysucess` to notify Teams that initialization flow is complete. |
| 5. | Teams client → App | When user navigate to other tab app. Teams client disposes resources and performs any cleanup needed in the `beforeUnload` handler. |
| 6. | App → Teams client | App invoke the `readyToUnload` callback to notify Teams client that the app unload flow is complete. |

### Reload app from cache

The following is the flow diagram of the launch of cached app:

:::image type="content" source="../assets/images/saas-offer/cached-launch-app.png" alt-text="This screenshot shows the flow of the cached launch of the app in meeting side panel.":::

| # | Interaction | What's going on |
| --- | --- | --- |
| 1. | Teams client → App | Teams client launches the app and invoke Load callback function. |
| 2. | App → Teams client | App  uses `contentURL` and `entityID` to route to the desired page and then invokes SDK `notifysucess` to notify Teams that initialization flow is complete. |
| 3. | Teams client → App | When user navigate to other tab app. Teams client disposes resources and performs any cleanup needed in the `beforeUnload` handler. |
| 4. | App → Teams client | App invoke the `readyToUnload` callback to notify Teams client that the app unload flow is complete. |

## Enable app caching

Before you enable app caching for your tab app, you must [enable your Tab app for Teams meeting](build-tabs-for-meeting.md).

To enable app caching for your app to be cached in the meeting side panel, follow the steps:

1. Pass `contentUrl` and `entityId` in the `configure.jsx` (or equivalent file in your app) into the load handler. It routes to the correct page within your app and invoke `notifySuccess` or `notifyFailure` to notify Teams client when the app initialization flow is complete.

   * [contentUrl](../tabs/how-to/create-tab-pages/configuration-page.md#modify-or-remove-a-tab): Add content page URL.
   * [entityId](../tabs/how-to/create-tab-pages/configuration-page.md#modify-or-remove-a-tab): Add a unique identifier.

1. In the `app-cache-tab.tsx` file (or equivalent file in your app), configure the following:

   * Call `teamsCore.registerBeforeUnloadHandler` and `teamsCore.registerOnLoadHandler` APIs.
   * Dispose resources and perform any cleanup needed in the `beforeUnload` handler.
   * Invoke the `readyToUnload` callback to notify Teams client that the app unload flow is complete.

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

* Single-page apps that use client-side routing for page navigation can benefit from app caching. It's recommended that the same domain is used across all contexts of your app launch.

* Register the `load` and `beforeUnload` handlers early in your launch sequence. If the Teams client doesn’t see these registrations before the user leaves the app, the app isn't cached.

* Follow the guidelines in this section to onboard your app to app caching in Teams meeting. For app caching support only in meetings, register the `load` or `beforeUnload` handlers if the context is `sidePanel`.

* Register only the `beforeUnload` handler if your app doesn't require app caching but needs time to safely save state (as leaving the app can cause the app content to be abruptly removed from the Document Object Model (DOM)). If the app hasn't registered for the `load` event, it's removed from the DOM after the unload flow completes.

## Limitations

* App caching is disabled if the system memory is less than 4 GB or if the available memory is less than 1 GB on Windows or 512 MB on Mac.

* App caching isn't supported for meetings where the invited user count is more than 20.

* When the app is cached, any audio that is playing is muted.

* Apps need to re-register for events such as `themeChange`, `focusEnter`, and so on, in the load handler. Teams client won't send any notifications to the app when cached. If your app requires notifications even when cached, caching might not be the right solution.

* App caching is supported only in Teams desktop client. In Teams web client, even if the app registers load handlers, the app is removed from the cache after the unload sequence is completed.

* The Teams client invokes the `loadHandler` only after the `unload` sequence of the app is completed. For example, if a user launches tab A of your app and then launches tab B of the same app, tab B won't get the load signal until the tab A invokes the `readyToUnload` callback.

* Apps are cached on a per-window basis not on a per tab basis within the same window.

* App caching isn't supported for the meeting stage or Task module contexts, because these can be opened on top of the tab and the same webview can't be used to render the content in the tab and the Task module.

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

**Why aren't apps cached?**

* App caching requires minimum of 4 GB system memory. Ensure there's required system memory for app caching.

* The app isn't cached if Teams doesn't receive the `readyToUnload` signal from the app within 30 seconds after sending the `beforeUnload` notification. Ensure that the Teams has received the signal from the app.

**Why is load handler not invoked on subsequent navigation?**

* Reduce your memory footprint when cached. Use the `beforeUnload` handlers to dispose resources that aren't needed when cached.

**Why are apps removed from cache?**

* If the system memory load is high, the app is removed from the cache. Ensure that your system memory load isn't high.

* If the user doesn't return to the app within 20 minutes, the app is removed from the cache. Ensure that you return to the app within 20 minutes.

* If the number of cached apps exceed the maximum cache size, the oldest cached app is removed from the cache. Ensure you don't exceed the maximum cache size.

## Code sample

|Sample name | Description | Node.js |
|----------------|-----------------|----------------|
| App caching | Sample app to show how app caching works in the meeting side panel. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-cache-meetings/nodejs) |

## See also

* [Build tabs for meeting](build-tabs-for-meeting.md)
* [Build tabs for Teams](../tabs/what-are-tabs.md)
