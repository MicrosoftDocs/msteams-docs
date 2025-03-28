---
title: Enable App Suspension for Tab App
author: surbhigupta
description: Learn how to enable app suspension for tab app in Teams, improve app's subsequent launch time and about limitations, troubleshooting, and code sample.
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: high
ms.date: 03/13/2025
---

# App suspension for your tab app

When a user navigates away from an app, the app can either be suspended or terminated. Suspension means that the app is sitting in the background and is not visible to the user. Termination means that the app is completely closed and removed from memory. Suspending an app improves subsequent launch time of the apps within Teams, or other Microsoft 365 products, by allowing you to keep some resources and assets in memory that you can use when rehydrating your app.

Previously, app suspension was referred to as a cached app and was supported only in Teams, but it is now supported for Teams apps extended to run across other Microsoft 365 applications as well.

Within Teams, app suspension is supported for the following:

| Scope | &nbsp; Desktop | iOS | Android |
| --- | --- | --- | --- |
| Personal | ✔️ Cache lifetime: 30 minutes| ✔️ | ❌ |
| Chat | ✔️ Cache lifetime: 30 minutes| ✔️ | ❌ |
| Channel | ✔️ Cache lifetime: 30 minutes| ✔️ | ❌ |
| Meeting tab | ✔️ Cache lifetime: 30 minutes| ✔️ | ❌ |
| Meeting side panel or in-meeting apps | ✔️ Cache lifetime: 20 minutes| ❌ | ❌ |

## Enable app suspension

To enable app suspension, follow the steps:

1. Call [app.lifeCycle.registerBeforeSuspendOrTerminate](/javascript/api/@microsoft/teams-js/app.lifecycle#@microsoft-teams-js-app-lifecycle-registerbeforesuspendorterminatehandler) and [app.lifeCycle.registerOnResumeHandler](/javascript/api/@microsoft/teams-js/app.lifecycle#@microsoft-teams-js-app-lifecycle-registeronresumehandler) APIs. These handlers are required to enable app suspension. Additional information about the [lifecycle module](/javascript/api/@microsoft/teams-js/app.lifecycle) is available in the TeamsJS reference.

   The `app.lifecycle.registerBeforeSuspendOrTerminate` handler gives you an opportunity to perform some tasks before your app is suspended or terminated, while the `app.lifecycle.registerOnResumeHandler` is called when a user navigates back to your app.

   Be aware that registering both handlers means that an app is enabled for app suspension, but does not guarantee that the app is not terminated in the background. Whether an app is terminated is dependent on additional factors such as available memory.

   > [!NOTE]
   > Previously `teamsCore.registerBeforeUnloadHandler` and `teamsCore.registerOnLoadHandler` were used to enable app caching, but they are now deprecated.

1. Use `contentUrl` and `entityId` passed into the resume handler to route to the correct page within your app and invoke `notifySuccess` or `notifyFailure` to notify the host that the app initialization flow is complete.

   * [contentUrl](create-tab-pages/configuration-page.md#modify-or-remove-a-tab): Add content page URL.
   * [entityId](create-tab-pages/configuration-page.md#modify-or-remove-a-tab): Add a unique identifier.

1. Dispose resources and perform any cleanup needed in the `beforeSuspendOrTerminate` handler.

The following is the flow diagram of the first launch of an app that wants to opt into app suspension (register the `resume` or `beforeSuspensionOrTerminate` handlers on the first launch of the app):

:::image type="content" source="../../assets/images/tabs/first-launch-app.png" alt-text="Screenshot shows the flow of the first launch of the app in meeting side panel.":::

The following is the flow diagram of the launch of suspended apps:

:::image type="content" source="../../assets/images/tabs/suspended-launch-app.png" alt-text="Screenshot shows the flow of the suspended launch of the app in meeting side panel.":::

When you opt into app suspension, the iframe or webview that is used to host the embedded app is reused as users navigate to different instances of the app within a window. The iframe or webview used to host the app is hidden when the users leave the app and shown when the users return to the app.

> [!NOTE]
> If app suspension isn't enabled, the iframe or webview is recreated every time the user launches the app.

There are multiple reasons for an app to not get suspended or for an app to get removed from the cache. Some general reasons across Microsoft 365 apps are:

* The total memory load is high.
* The total number of suspended apps exceed the maximum cache size. In this cirumcstance the oldest suspended app is removed.
* The app is terminated if the machine's available memory is low.
* The app is suspended for a long time without getting resumed.

Within the Teams app some of the reasons are (numbers here are subject to change):

* If the system memory load is high, the app is removed from the cache.
* If the number of suspended apps exceeds the maximum cache size, the oldest suspended app is removed from the cache.
* The app isn't suspended if Teams doesn't receive the `readyToUnload` signal from the app within 30 seconds after sending the `beforeUnload` notification.
* App suspension is disabled if the system memory is less than 4 GB or if the available memory is less than 1 GB on Windows or 512 MB on Mac.
* Side panel is the only supported frameContext for app suspension in meetings.
* App suspesnion isn't supported for meetings where the invited user count is more than 20.
* If an app fails to load, the app isn't suspended.
* On iOS, when the Teams app is terminated, the app is removed from the cache.

## Code example

The following code snippet is an example of `app.lifecycle.registerOnResumeHandler` and `app.lifecycle.registerBeforeSuspendOrTerminateHandler` APIs:

```javascript
MicrosoftTeams.app.lifecycle.registerOnResumeHandler((data) => {  

   console.log("got resume call" , data.contentUrl, data.entityId);  

   // use contentUrl to route to correct page  
   // invoke notifySuccess when ready  

   app.notifySuccess();  

}); 

MicrosoftTeams.app.lifecycle.registerBeforeSuspendOrTerminateHandler(() => {  

   // dispose resources and resolve promise 

}); 
```

> [!NOTE]
> Previously APIs in the `teamsCore` module were used to enable app caching. If an app registers for both `app.lifecycle` and `teamsCore` pairs of handlers, the `app.lifecycle` handlers will overwrite the `teamsCore` handlers.

## Debug tool for cached apps

> [!NOTE]
> The debug tool for cached apps is available in [public developer preview](../../resources/dev-preview/developer-preview-intro.md).

You can enable Proto Task Manager in Teams, a debug tool that shows the status of your cached apps. In your Teams client, select the **Control+Shift+Alt+8** keys on Windows or **Command+Shift+Option+8** on Mac to open Proto Task Manager.

:::image type="content" source="../../assets/images/tabs/app-cache-debug-tool.png" alt-text="Screenshot shows the caching tab in the Proto Task Manager in Teams." lightbox="../../assets/images/tabs/app-cache-debug-tool.png":::

The **AppCaching** tab contains the following details:

* **state**: Shows the app's cached or uncached state.
* **isActive**: Shows the active or inactive status of the cached app.
* **timeElapsed**: Shows the time elapsed since the app was cached.
* **supportsLoad**: Shows if the app has registered the `Load` handler if app caching is enabled.
* **supportsBeforeUnload**: Shows if the app has registered the `BeforeUnload` handler if app caching is enabled.
* **totalFrameMemory**: Shows the memory usage of the app.
* **totalFrameCommitMemory**: Shows the CPU usage of the app.

## Precaching tab apps

> [!NOTE]
>
> * Precaching tab apps is available in [public developer preview](../../resources/dev-preview/developer-preview-intro.md).
> * Precaching tab apps is supported only in Teams web and desktop clients.

While caching reduces the subsequent load times of an app, precaching optimizes an app's initial load time by allowing Teams to preload the app. Teams preloads apps in the background after launch or when idle, based on users' recent app usage patterns and the apps' cache history. The preloaded apps remain cached until the user opens the app, resulting in a faster loading time.

If you enable precaching, your app utilizes resources, and telemetry data is tracked while in the precached state. To learn how to optimize your app for precaching, see [best practices](#best-practices).

### Enable precaching for tab app

To enable precaching for your tab app, follow these steps:

1. [Enable app caching](#enable-app-caching).

1. Update your app manifest as follows:

    1. Set the value of `showLoadingIndicator` to `true`. This action ensures that Teams waits until your app sends `notifySuccess` to conclude the app load sequence during precaching. For more information, see [showLoadingIndicator](../../resources/schema/manifest-schema-dev-preview.md#showloadingindicator).

    1. Add the `backgroundLoadConfiguration` object and define the `contentUrl`.

        ```json
        {
        "backgroundLoadConfiguration": {
            "tabConfiguration": {
                "contentUrl": "https://www.contoso.com/content?host=msteams&isBackgroundLoad=true"
                }
            }
        }
        ```

        > [!NOTE]
        > * The `contentUrl` can't contain context-specific parameters, such as team site URL or thread ID, as Teams loads apps with no prior context during launch.
        > * The `contentUrl` must be generic enough to load in the background without any user interaction.

        For more information, see [backgroundLoadConfiguration](../../resources/schema/manifest-schema-dev-preview.md#backgroundloadconfiguration).

### Monitor background loading

You can identify if Teams loaded the app in the background without user interaction if you monitor the `isBackgroundLoad` property. If the property's state is `true`, it indicates that Teams has loaded the app in the background and isn't able to interact with the user. Hence, the app doesn't need to render UI elements such as sign-in prompts.

Monitor the `isBackgroundLoad` property in the app context to optimize the app for effective precache loading and rendering. For more information, see [isBackgroundLoad](/javascript/api/%40microsoft/teams-js/app.pageinfo?view=msteams-client-js-latest#@microsoft-teams-js-app-pageinfo-isbackgroundload&preserve-view=true).

## Best practices

The following are the best practices for app suspension and precaching:

* We recommend that you implement web storage or service worker capabilities to store the data or webview locally. This helps to load the app faster in subsequent launches.

* Register the app suspension handlers early in your launch sequence, such as right after calling `app.initialize` and before the app sends `notifySuccess`. If the Teams client doesn’t see these registrations before the user leaves the app, the app isn't cached.

* Try to reduce your memory footprint when the `app.lifecycle.onBeforeSuspendOrTerminateHandler` handler is called, and the app is about to be suspended. For example, release references, remove eventListeners, pause sync calls, or halt network requests.

* Precaching increases the traffic to your app in addition to user-initiated requests. Ensure that the endpoint you provide as the `contentUrl` can handle background requests multiple times for each user in a day. Ensure that you make telemetry adjustments needed to accommodate the background loading of the app.

* Ensure that your app uses less than or equal to 130 MB of memory in the precached state.

## General limitations

The following are general limitations for app suspension:

* There is no guarantee that an app will be suspended. There are reasons that can lead to app termination even though an has registered the required handlers.  

* An app is suspended only when the user navigates away from the app. If an app has multiple static tabs, when the user switches between tabs, the tab won’t be suspended. The hanlder, `app.lifecycle.onBeforeSuspendOrTerminate`, will still be called.

* The suspended app can be used within the same window. The app that is suspended in a pop out window cannot be reused in the Main window.

* When an app is suspended, all the registered handlers are deleted. When the app is resumed all the handlers, such as `themeChange` or `focusEnter`, need to be reregistered. No notifications are sent to the app when suspended. If your app requires notifications even when suspended, suspension might not be the right solution.

* Only Single-page apps that use client-side routing for page navigation can benefit from app suspension and resume. It's recommended that the same domain be used across all contexts of your app launch.

* An app is expected to sleep when suspended. No SDK requests are allowed when the app is suspended.

## Limitations within Teams

The following are the limitations for app suspension within the Teams app:

* The Teams client invokes the `resume` handler only after the `suspendOrTerminate` sequence of the app is completed. For example, if a user launches tab A of your app and then launches tab B of the same app, tab B won't get the `resume` signal until the `suspendOrTerminate` handler on tab A is done executing.

* Apps are cached on a per-window basis. App caching happens on a per app (not on a per tab) basis within the same window.

* App suspension isn't supported for the meeting stage or dialog (referred as task module in TeamsJS v1.x) contexts, because these can be opened on top of the tab and the same iframe or webview can't be used to render the content in the tab and the dialog.

* Register only the `beforeSuspendOrTerminate` handler if your app doesn't require app suspension but needs time to safely save state (as leaving the app can cause the app content to be abruptly removed from the Document Object Model (DOM)). If the app hasn't registered for the `resume` event, it's removed from the DOM after the `suspendOrTerminate` flow completes.

* Follow the guidelines in this section to onboard your app to app suspension in Teams meeting. For app suspension support only in meetings, register the `resume` or `beforeSuspendOrTerminate` handlers if the context is `sidePanel`.

## Troubleshooting

**Apps are not being suspended? Why is resume handler not invoked on subsequent navigation?**

* Verify if the system and available memory constraints are met.

* Reduce your memory footprint when cached. Use the `beforeSuspendOrTerminate` handler to dispose resources, for example, release references and remove event listeners that might not be needed when cached.

## Code sample

|Sample name | Description | Node.js |
|----------------|--------------------------------------------------------|
| App caching | Sample app to show how app caching works in the meeting side panel. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-cache-meetings/nodejs) |

## See also

* [Create a personal tab](create-personal-tab.md)
* [Create a channel tab or group tab](create-channel-group-tab.md)
* [Build tabs for meeting](../../apps-in-teams-meetings/build-tabs-for-meeting.md)
