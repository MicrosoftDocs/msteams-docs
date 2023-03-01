---
title: Enable app caching for your tab app
author: surbhigupta
description: Learn how to enable app caching to your tab app in Teams meeting and how it improves the launch time of the app.
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: high
ms.date: 04/07/2022
---

# Enable app caching for your tab app

> [!NOTE]
> App caching is available only in [public developer preview](~/resources/dev-preview/developer-preview-intro.md).

You can configure your tab app (app) to enable app caching to reduce the reload time of your app during a meeting. You can store your app data in the meeting by enabling app caching. The app reloads from the cache, which improves the app relaunch time within the meeting. App caching is supported only for tabs loaded in the meeting side panel in Teams desktop client.

Here's what you'll learn in this section:

1. App caching user experience
1. App caching at runtime
1. Enable app caching

## App caching user experience

App caching improves subsequent launch time of the apps that are loaded in the meeting side panel. Consider the following use case for app caching:

Your app is enabled to be installed in a Teams meeting. The meeting organizer or participants can install and use your app.

:::row:::
    :::column span="":::
        :::image type="content" source="../assets/images/app-caching/without-app-caching.png" alt-text="The screenshot shows you the app in meeting without app caching enabled." lightbox="../assets/images/app-caching/without-app-caching.png":::
    :::column-end:::
    :::column span="":::
        During the meeting, the participants may change the view from your app to another view on the meeting stage. When they want to open your app again, the app must go through the launch process again before it can be opened in the meeting window. This takes up time in the meeting as participants are kept waiting while the app reloads.
    :::column-end:::
:::row-end:::
:::row:::
    :::column span="":::
        :::image type="content" source="../assets/images/app-caching/with-app-caching.png" alt-text="The Screenshot shows you the app in meeting with app caching enabled." lightbox="../assets/images/app-caching/with-app-caching.png":::
    :::column-end:::
    :::column span="":::
        With **app caching**, you can now reduce the reload time significantly. An app cache is a data storage layer that stores your app data in the meeting side panel. When the participants move away from the app and come back to it, the app is loaded from the app cache rather than being relaunched. It enhances the meeting experience of the participants, saves time and resources.
    :::column-end:::
:::row-end:::

## App caching at runtime

When you enable app caching in your app, you can add it to a meeting and the app opens in a webview. The app data is stored in the meeting side panel. If the participants move away from the app within the meeting window, the webview that is used to host the embedded app is reused. The webview that hosts the app is hidden when the participants move away from the app and shown when they come back to the app. At this time, the app is reloaded from the cache.

This process consists of two stages for an app that is enabled for app caching:

1. [First launch of the app](#first-launch-of-the-app)
1. [Reload app from cache](#reload-app-from-cache)

### First launch of the app

The following flow diagram shows how the app loads for the first time it's launched in the meeting. The app registers the `load` or `beforeUnload`:

:::image type="content" source="../assets/images/saas-offer/first-launch-app.png" alt-text="This screenshot shows the flow of the first launch of the app in meeting side panel.":::

| # | Interaction | What's going on |
| --- | --- | --- |
| 1. | Teams client → App | Teams client launches the app to the meeting side panel. |
| 2. | App → Teams client | The app initializes the flow. |
| 3. | App → Teams client | The app registers `Load` or `beforeUnload` handler with Teams clients and caches the app data in the meeting side panel. |
| 4. | App → Teams client | The app invokes SDK `notifySuccess` to notify Teams client that the initialization flow is complete. |
| 5. | Teams client → App | When the participants move away from the app, Teams client disposes resources and performs any cleanup needed in the `beforeUnload` handler. |
| 6. | App → Teams client | The app invokes the `readyToUnload` callback to notify Teams client that the app unload flow is complete. |

### Reload app from cache

The following flow diagram shows how a cached app is reloaded:

:::image type="content" source="../assets/images/saas-offer/cached-launch-app.png" alt-text="This screenshot shows the flow of the cached launch of the app in meeting side panel.":::

| # | Interaction | What's going on |
| --- | --- | --- |
| 1. | Teams client → App | Teams client loads the app and invokes `Load` callback. |
| 2. | App → Teams client | The app  uses `contentUrl` and `entityId` to route to the desired page, and then invokes SDK `notifySuccess` to notify Teams client that the initialization flow is complete. |
| 3. | Teams client → App | When the participants move away from the app, Teams client disposes resources and performs any cleanup needed in the `beforeUnload` handler. |
| 4. | App → Teams client | The app invokes the `readyToUnload` callback to notify Teams client that the app unload flow is complete. |

## Enable app caching

Before you enable app caching for your app, you must [enable your app for Teams meeting](build-tabs-for-meeting.md).

To enable app caching for your app, follow the steps:

1. In the `configure.jsx` file (or the equivalent file in your app), pass `contentUrl` and `entityId` into the load handler to route to the correct page within your app. It also invokes `notifySuccess` or `notifyFailure` to notify Teams client when the app initialization flow is complete.

   * [contentUrl](../tabs/how-to/create-tab-pages/configuration-page.md#modify-or-remove-a-tab): Add content page URL.
   * [entityId](../tabs/how-to/create-tab-pages/configuration-page.md#modify-or-remove-a-tab): Add a unique identifier.

1. In the `app-cache-tab.tsx` file (or the equivalent file in your app), configure the following:

   * Call `teamsCore.registerBeforeUnloadHandler` and `teamsCore.registerOnLoadHandler` APIs.
   * Dispose resources and perform any cleanup needed in the `beforeUnload` handler.
   * Invoke the `readyToUnload` callback to notify Teams client that the app unload flow is complete.

After you configure your app code for app caching, your code must be as shown in the following example:

```javascript
/// </summary>
/// In beforeUnloadHandler using setItems and readyToUnload callback function
/// </summary>
const beforeUnloadHandler = (
    setItems: React.Dispatch<React.SetStateAction<string[]>>,
    readyToUnload: () => void) => {
    setItems((Items) => [...Items, logItem("OnBeforeUnload", "purple", "Started")]);

    // Dispose resources and cleanup
    // Write your custom code to perform resource cleanup.
    setItems((Items) => [...Items, logItem("OnBeforeUnload", "purple", "Dispose resources and cleanup")]);
    setItems((Items) => [...Items, logItem("OnBeforeUnload", "purple", "Completed")]);
    console.log("sending readyToUnload to TEAMS");
    readyToUnload();

    return true;
};

/// </summary>
/// loadHandler using setItems to set values
/// </summary>
const loadHandler = (
    setItems: React.Dispatch<React.SetStateAction<string[]>>,
    data: microsoftTeams.LoadContext) => { 
    setItems((Items) => [...Items, logItem("OnLoad", "blue", "Started for " + data.entityId)]);

    // Use the entityId, contentUrl to route to the correct page within your App and then invoke notifySuccess
    setItems((Items) => [...Items, logItem("OnLoad", "blue", "Route to specific page")]);
    setItems((Items) => [...Items, logItem("OnLoad", "blue", "Completed for " + data.entityId)]);
    microsoftTeams.app.notifySuccess();
};

const AppCacheTab = () => {
    const [items, setItems] = useState<string[]>([]);
    const [title, setTitle] = useState("App Caching Sample");
  
    React.useEffect(() => {
        let app = microsoftTeams.app;
        app.initialize().then(app.getContext).then((context: any) => {
            app.notifySuccess();

            // Check if the framecontext is set to sidepanel
            if (context.page.frameContext === "sidePanel") {
                const loadContext = logItem("Success", "green", "Loaded Teams context");
                setItems((Items) => [...Items, loadContext]);

                const newLogItem = logItem("FrameContext", "orange", "Frame context is " + context.page.frameContext);
                setItems((Items) => [...Items, newLogItem]);

                microsoftTeams.teamsCore.registerBeforeUnloadHandler((readyToUnload: any) => {
                    const result = beforeUnloadHandler(setItems, readyToUnload);
                   
                    return result;
                });

                microsoftTeams.teamsCore.registerOnLoadHandler((data: any) => {
                    loadHandler(setItems, data);
                    setTitle("Entity Id : " + data.entityId);
                    console.log(data.contentUrl, data.entityId);
                });

                const newItem = logItem("Handlers", "orange", "Registered load and before unload handlers. Ready for app caching.");
                setItems((Items) => [...Items, newItem]);
            }

        }).catch(function (error: any) {
            console.log(error, "Could not register handlers.");
        });

        return () => {
            console.log("useEffect cleanup - Tab");
        };

    }, []);

    return (
        <div>
            <h3>{title}</h3>
            {items.map((item) => {
                return <div dangerouslySetInnerHTML={{ __html: item }} />;
            })}
        </div>
    );
};

export default AppCacheTab;
```

## Best practices

* Single-page apps that use client-side routing for page navigation can benefit from app caching. It's recommended that you use the same domain across all contexts of your app launch.

* Register the `load` and `beforeUnload` handlers early in your launch sequence. If the handlers aren't registered with the Teams client before the participants move away from the app, the app isn't cached.

* To enable app caching support in Teams meetings, register the `load` or `beforeUnload` handlers only if the context is `sidePanel`.

* Register only the `beforeUnload` handler if your app doesn't require app caching but needs time to safely save state (as leaving the app can cause the app content to be abruptly removed from the Document Object Model (DOM)). If the app hasn't registered for the `load` event, it's removed from the DOM after the unload flow completes.

## Limitations

* App caching is disabled if the system memory is less than 4 GB or if the available memory is less than 1 GB on Windows or 512 MB on Mac.

* App caching isn't supported for meetings where the invited participant count is more than 20.

* When the app is cached, any audio that is playing within the cached app is muted.

* Apps need to re-register for events in the load handler, such as `themeChange`, `focusEnter`, and so on. Teams client won't send any notifications to the app when it's cached. If your app requires notifications even when cached, caching might not be the right solution.

* App caching is supported only in Teams desktop client. In Teams web client, even if the app registers load handlers, the app is removed from the cache after the unload sequence is completed.

* The Teams client invokes the `loadHandler` only after the `unload` sequence of the app is completed. For example, if a participant launches tab A of your app and then launches tab B of the same app, tab B won't get the `Load` callback for caching until tab A invokes the `readyToUnload` callback.

* Apps are cached on a per-window basis. An app cached in a meeting window can't be reused in a channel in the Teams client.

* App caching happens on a per app (not on a per tab) basis within the same meeting window. The same meeting webview gets reused as participants launch your app from various contexts (such as channels, chat, personal app).

* App caching isn't supported for the meeting stage or task module contexts because these can be opened on top of the app. The same webview can't be used to render the content in the tab and the task module.

* The `sidePanel` is the only supported `FrameContext` for app caching.

* Apps are expected to sleep when cached (use minimal compute or network resources and minimizes SDK requests). All the register handlers and the following SDK requests are allowed when the app is cached:

  * `initialize`
  * `notifyAppLoaded`
  * `notifySuccess`
  * `notifyFailure`
  * `notifyExpectedFailure`
  * `getContext`
  * `getAuthToken`
  * `readyToUnload`
  * `getConfig` or `getSettings`

* The app isn't cached if Teams client doesn't receive the `readyToUnload` callback from the app within 30 seconds after sending the `beforeUnload` notification.

## Troubleshooting

**Why isn't my app getting cached?**

Apps aren't cached if the load handler isn't invoked on subsequent navigation. To resolve this issue, ensure the following:

* App caching requires minimum of 4 GB system memory. Ensure there's sufficient system memory for app caching.

* Reduce your memory footprint by using the `beforeUnload` handlers to dispose resources that aren't needed when your app is cached.

**Why are apps removed from cache?**

* If the system memory load is high, the app is removed from the cache. Ensure that your system memory load isn't high.

* If the participant doesn't come back to the app within 20 minutes, the app is removed from the cache.

* If the number of cached apps exceed the maximum cache size, the oldest cached app is removed from the cache. Ensure you don't exceed the maximum cache size.

## Code sample

|Sample name | Description | Node.js |
|----------------|-----------------|----------------|
| App caching in meeting | Sample app to show how app caching works for tab app in Teams meeting. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-cache-meetings/nodejs) |

## Step-by-step guides

Follow the [step-by-step](../sbs-app-caching-for-your-tab-app.yml) guide to enable app caching for your tab app in Teams meeting.

## See also

* [Build tabs for meeting](build-tabs-for-meeting.md)
* [Build tabs for Teams](../tabs/what-are-tabs.md)
