---
title: Build apps for Teams meeting stage
author: v-sdhakshina
description: Learn how to build apps for Teams meeting stage, share to stage APIs, and generate a deep link to share content to stage in meetings.
ms.topic: conceptual
ms.author: v-sdhakshina
ms.localizationpriority: medium
ms.date: 04/07/2022
---

# Build apps for Teams meeting stage

Share to stage allows users to share an app to the meeting stage from the meeting side panel in an ongoing meeting. This sharing is interactive and collaborative in comparison to passive screen sharing.

To invoke share to stage, users can select the **Share to Stage** icon on the top right side of the meeting side panel. **Share to Stage** icon is native to Teams client and selecting it shares the entire app to the meeting stage.

## App manifest settings for apps in meeting stage

To share an app to the meeting stage, update the `context` property in the app manifest as follows:

```json
"context":[ 
    "meetingSidePanel", 
    "meetingStage" 
     ] 
```

## Advanced share to stage APIs

There are many scenarios where sharing the entire app to the meeting stage isn't as useful as sharing specific parts of the app:  

1. For a brainstorming or whiteboard app, a user may want to share a specific board in a meeting versus the entire app with all the boards.  

1. For a medical app, a doctor may want to share just the X-Ray on the screen with the patient versus sharing the entire app with all the patients records or results and so on.

1. A user may want to share content from a single content provider at a time (for example, YouTube) versus sharing an entire video catalog onto stage.

To help users in such scenarios, we released APIs within the Teams Client SDK that allows you to programmatically invoke share to stage for specific parts of the app from a button in the meeting side panel.

:::image type="content" source="../assets/images/apps-in-meetings/shared-meeting-stage-edit-review-component.png" alt-text="The screenshot shows the share to meeting stage view.":::

Use the following APIs to share specific part of the app:

|Method| Description| Source|
|---|---|----|
|[**Share app content to stage**](#share-app-content-to-stage-api)| Share specific parts of the app to meeting stage from the meeting side panel in a meeting. | [Microsoft Teams JavaScript library SDK](/javascript/api/@microsoft/teams-js/meeting) |
|[**Get app content stage sharing state**](#get-app-content-stage-sharing-state-api)| Fetch information about app's sharing state on the meeting stage. | [Microsoft Teams JavaScript library SDK](/javascript/api/@microsoft/teams-js/meeting.iappcontentstagesharingstate) |
|[**Get app content stage sharing capabilities**](#get-app-content-stage-sharing-capabilities-api)| Fetch the app's capabilities for sharing to the meeting stage. | [Microsoft Teams JavaScript library SDK](/javascript/api/@microsoft/teams-js/meeting.iappcontentstagesharingcapabilities) |

## Share app content to stage API

The `shareAppContentToStage` API enables you to share specific parts of your app to the meeting stage. The API is available through the Teams client SDK.

### Prerequisite

* To use the `shareAppContentToStage` API, you must obtain the RSC permissions. In the app manifest, configure the `authorization` property, and the `name` and `type` in the `resourceSpecific` field. For example:

    ```json
    "authorization": {
        "permissions": { 
        "resourceSpecific": [
        { 
         "name": "MeetingStage.Write.Chat",
         "type": "Delegated"
        }
        ]
    }
    }
    ```

* `appContentUrl` must be allowed by `validDomains` array inside manifest.json, else the API returns a 501 error.

### Query parameter

The following table includes the query parameters:

|Value|Type|Required|Description|
|---|---|----|---|
|**callback**| String | Yes | Callback contains two parameters, error and result. The *error* can either contain an error of type *SdkError*, or null when share is successful. The *result* can either contain a true value, if there's a successful share, or null when the share fails. |
|**appContentURL**| String | Yes | The URL that will be shared on to the stage. |

### Example

```javascript
const appContentUrl = "https://www.bing.com/";

microsoftTeams.meeting.shareAppContentToStage((err, result) => {
    if (result) {
        // handle success
    }
    if (err) {
        // handle error
    }
}, appContentUrl);
```

### Response codes

The following table provides the response codes:

|Response code|Description|
|---|---|
| **500** | Internal error. |
| **501** | API isn't supported in the current context.|
| **1000** | App doesn't have proper permissions to allow share to stage.|

## Get app content stage sharing state API

The `getAppContentStageSharingState` API enables you to fetch information about apps sharing on the meeting stage.

### Query parameter

The following table includes the query parameter:

|Value|Type|Required|Description|
|---|---|----|---|
|**callback**| String | Yes | Callback contains two parameters, error, and result. The *error* can either contain an error of type *SdkError*, in case of an error, or null when share is successful. The *result* can either contain an `IAppContentStageSharingState` object, when share is successful, or null, in case of an error.|

### Example

```javascript
microsoftTeams.meeting.getAppContentStageSharingState((err, result) => {
    if (result.isAppSharing) {
        // Indicates if app is sharing content on the meeting stage.
    }
});
```

The JSON response body for the `getAppContentStageSharingState` API is:

```json
{
   "isAppSharing":true
} 
```

### Response codes

The following table provides the response codes:

|Response code|Description|
|---|---|
| **500** | Internal error. |
| **501** | API isn't supported in the current context.|
| **1000** | App doesn't have proper permissions to allow share to stage.|

## Get app content stage sharing capabilities API

The `getAppContentStageSharingCapabilities` API enables you to fetch the app's capabilities for sharing to meeting stage.

### Query parameter

The following table includes the query parameter:

|Value|Type|Required|Description|
|---|---|----|---|
|**callback**| String | Yes | Callback contains two parameters, error, and result. The *error* can either contain an error of type *SdkError*, or null when share is successful. The result can either contain an `IAppContentStageSharingCapabilities` object, when share is successful, or null, in case of an error.|

### Example

```javascript
microsoftTeams.meeting.getAppContentStageSharingCapabilities((err, result) => {
    if (result.doesAppHaveSharePermission) {
        // Indicates app has permission to share contents to meeting stage.
    }
});
```

The JSON response body for `getAppContentStageSharingCapabilities` API is:

```json
{
   "doesAppHaveSharePermission":true
} 
```

### Response codes

The following table provides the response codes:

|Response code|Description|
|---|---|
| **500** | Internal error. |
| **501** | API isn't supported in the current context.|
| **1000** | App doesn't have permissions to allow share to stage.|

## Generate a deep link to share content to stage in meetings

You can also generate a deep link to share the app to stage and start or join a meeting.

> [!NOTE]
>
> * Currently, the deep link to share content to stage in meetings is undergoing UX improvements and is available only in [public developer preview](~/resources/dev-preview/developer-preview-intro.md).
> * Deep link to share content to stage in meeting is supported in Teams desktop client only.

When a deep link is selected in an app by a user who is part of an ongoing meeting, then the app is shared to the stage and a permission pop-up window appears. Users can grant access to the participants to collaborate with an app.

:::image type="content" source="../assets/images/intergrate-with-teams/screenshot-of-pop-up-permission.png" alt-text="The screenshot is an example that shows a permission pop-up window.":::

When a user isn't in a meeting then the user is redirected to the Teams calendar where they can join a meeting or initiate instant meeting (Meet now).

:::image type="content" source="../assets/images/intergrate-with-teams/Instant-meetnow-pop-up.png" alt-text="The screenshot is an example that shows a pop-up window when there's no ongoing meeting.":::

Once the user initiates an instant meeting (Meet now), they can add participants and interact with the app.

:::image type="content" source="../assets/images/intergrate-with-teams/Screenshot-ofmeet-now-option-pop-up.png" alt-text="The screenshot is an example that shows an option to add participants and how to interact with the app.":::

To add a deep link to share content on stage, you need to have an app context. The app context allows the Teams client to fetch the app manifest and check if the sharing on stage is possible. The following is an example of an app context.

`{ "appSharingUrl" : "https://teams.microsoft.com/extensibility-apps/meetingapis/view", "appId": "9ec80a73-1d41-4bcb-8190-4b9eA9e29fbb" , "useMeetNow": false }`

The query parameters for the app context are:

* `appID`: This is the ID that can be obtained from the app manifest.
* `appSharingUrl`: The URL which needs to be shared on stage should be a valid domain defined in the app manifest. If the URL isn't a valid domain, an error dialog will pop up to provide the user with a description of the error.
* `useMeetNow`: This includes a boolean parameter that can be either true or false.
  * **True**: When the `UseMeetNow` value is true and if there's no ongoing meeting, a new Meet now meeting will be initiated. When there's an ongoing meeting, this value will be ignored.

  * **False**: The default value of `UseMeetNow` is false, which means that when a deep link is shared to stage and there's no ongoing meeting, a calendar pop-up will appear. However, you can share directly during a meeting.

Ensure that all the query parameters are properly URI encoded and the app context has to be encoded twice in the final URL. Following is an example.

```json
var appContext= JSON.stringify({ "appSharingUrl" : "https://teams.microsoft.com/extensibility-apps/meetingapis/view", "appId": "9cc80a93-1d41-4bcb-8170-4b9ec9e29fbb", "useMeetNow":false })
var encodedContext = encodeURIComponent(appcontext).replace(/'/g,"%27").replace(/"/g,"%22")
var encodedAppContext = encodeURIComponent(encodedContext).replace(/'/g,"%27").replace(/"/g,"%22")
```

A deep link can be launched either from the Teams web or from the Teams desktop client.

* **Teams web**: Use the following format to launch a deep link from the Teams web to share content on stage.

    `https://teams.microsoft.com/l/meeting-share?deeplinkId={deeplinkid}&fqdn={fqdn}}&lm=deeplink%22&appContext={encoded app context}`

    Example: `https://teams.microsoft.com/l/meeting-share?deeplinkId={sampleid}&fqdn=teams.microsoft.com&lm=deeplink%22&appContext=%257B%2522appSharingUrl%2522%253A%2522https%253A%252F%252Fteams.microsoft.com%252Fextensibility-apps%252Fmeetingapis%252Fview%2522%252C%2522appId%2522%253A%25229cc80a93-1d41-4bcb-8170-4b9ec9e29fbb%2522%252C%2522useMeetNow%2522%253Atrue%257D`

    |Deep link|Format|Example|
    |---------|---------|---------|
    |To share the app and open Teams calendar, when UseMeeetNow is **false**, default.|`https://teams.microsoft.com/l/meeting-share?deeplinkId={deeplinkid}&fqdn={fqdn}}&lm=deeplink%22&appContext={encoded app context}`|`https://teams.microsoft.com/l/meeting-share?deeplinkId={sampleid}&fqdn=teams.microsoft.com&lm=deeplink%22&appContext=%257B%2522appSharingUrl%2522%253A%2522https%253A%252F%252Fteams.microsoft.com%252Fextensibility-apps%252Fmeetingapis%252Fview%2522%252C%2522appId%2522%253A%25229cc80a93-1d41-4bcb-8170-4b9ec9e29fbb%2522%252C%2522useMeetNow%2522%253Afalse%257D`|
    |To share the app and initiate instant meeting, when UseMeeetNow is **true**.|`https://teams.microsoft.com/l/meeting-share?deeplinkId={deeplinkid}&fqdn={fqdn}}&lm=deeplink%22&appContext={encoded app context}`|`https://teams.microsoft.com/l/meeting-share?deeplinkId={sampleid}&fqdn=teams.microsoft.com&lm=deeplink%22&appContext=%257B%2522appSharingUrl%2522%253A%2522https%253A%252F%252Fteams.microsoft.com%252Fextensibility-apps%252Fmeetingapis%252Fview%2522%252C%2522appId%2522%253A%25229cc80a93-1d41-4bcb-8170-4b9ec9e29fbb%2522%252C%2522useMeetNow%2522%253Atrue%257D`|

* **Team desktop client**: Use the following format to launch a deep link from the Teams desktop client to share content on stage.

    `msteams:/l/meeting-share?   deeplinkId={deeplinkid}&fqdn={fqdn}&lm=deeplink%22&appContext={encoded app context}`

    Example: `msteams:/l/meeting-share?deeplinkId={sampleid}&fqdn=teams.microsoft.com&lm=deeplink%22&appContext=%257B%2522appSharingUrl%2522%253A%2522https%253A%252F%252Fteams.microsoft.com%252Fextensibility-apps%252Fmeetingapis%252Fview%2522%252C%2522appId%2522%253A%25229cc80a93-1d41-4bcb-8170-4b9ec9e29fbb%2522%252C%2522useMeetNow%2522%253Atrue%257D`

    |Deep link|Format|Example|
    |---------|---------|---------|
    |To share the app and open Teams calendar, when UseMeeetNow is **false**, default.|`msteams:/l/meeting-share?   deeplinkId={deeplinkid}&fqdn={fqdn}&lm=deeplink%22&appContext={encoded app context}`|`msteams:/l/meeting-share?deeplinkId={sampleid}&fqdn=teams.microsoft.com&lm=deeplink%22&appContext=%257B%2522appSharingUrl%2522%253A%2522https%253A%252F%252Fteams.microsoft.com%252Fextensibility-apps%252Fmeetingapis%252Fview%2522%252C%2522appId%2522%253A%25229cc80a93-1d41-4bcb-8170-4b9ec9e29fbb%2522%252C%2522useMeetNow%2522%253Afalse%257D`|
    |To share the app and initiate instant meeting, when UseMeeetNow is **true**.|`msteams:/l/meeting-share?   deeplinkId={deeplinkid}&fqdn={fqdn}&lm=deeplink%22&appContext={encoded app context}`|`msteams:/l/meeting-share?deeplinkId={sampleid}&fqdn=teams.microsoft.com&lm=deeplink%22&appContext=%257B%2522appSharingUrl%2522%253A%2522https%253A%252F%252Fteams.microsoft.com%252Fextensibility-apps%252Fmeetingapis%252Fview%2522%252C%2522appId%2522%253A%25229cc80a93-1d41-4bcb-8170-4b9ec9e29fbb%2522%252C%2522useMeetNow%2522%253Atrue%257D`|

The query parameters are:

* `deepLinkId`: Any identifier used for telemetry correlation.
* `fqdn`: `fqdn` is an optional parameter, which can be used to switch to an appropriate environment of a meeting to share an app on stage. It supports scenarios where a specific app share happens in a particular environment. The default value of `fqdn` is enterprise URL and possible values are `Teams.live.com` for Teams for Life, `teams.microsoft.com`, or `teams.microsoft.us`.

To share the entire app to stage, in the app manifest, you must configure `meetingStage` and `meetingSidePanel` as frame contexts, see [app manifest](../resources/schema/manifest-schema.md). Otherwise, meeting attendees may not be able to see the content on stage.

> [!NOTE]
> For your app to pass validation, when you create a deep link from your website, web app, or Adaptive Card, use **Share in meeting** as the string or copy.

### App caching

App caching helps you to improve subsequent launch time of the apps that are loaded in the meeting side panel.

> [!NOTE]
>
> * App caching is supported only for tabs loaded in the meeting side panel in Teams desktop client.
> * App caching is not supported on chats, channels, and personal apps.

#### Enable app caching

To enable app caching in your meetings side panel, follow the steps:

1. Call `microsoftTeams.registerBeforeUnloadHandler` and `microsoftTeams.registerOnLoadHandler`.

1. Use `contentUrl` and `entityId` into the load handler to route to the correct page within your app and invoke `notifySuccess/notifyFailure` to notify Teams client that the app initialization flow is complete.

1. Dispose resources and perform any cleanup needed in the `beforeUnload handler`, then invoke the `readyToUnload` callback to notify Teams client that the app unload flow is complete.

The following is the flow diagram of first launch of the app in meeting stage:

:::image type="content" source="../assets/images/saas-offer/first-launch-app.png" alt-text="This screenshot shows the flow of the first launch of the app in meeting stage.":::

The following is the flow diagram of cached launch of the app in meeting stage:

:::image type="content" source="../assets/images/saas-offer/cached-launch-app.png" alt-text="This screenshot shows the flow of the cached launch of the app in meeting stage.":::

Enable app caching to host the embedded app in webview and it is reused when users go to different instances of the app within a window.

The webview of the app remains in the DOM and it's hidden when users go out of the app and it's shown when users return to the app. Any audio that is playing is muted when the app is cached.

> [!NOTE]
> If the app caching is not enabled, the webview is recreated every time the users go out and return to the app.

Following are the parameters to control the conditions that cause apps to be added or removed from the cache:

1. The maximum cache size is one for apps in meetings. When the cache size is exceeded, the LRU app will be evicted.
1. When the app is cached, memory (working set) usage must not exceed 225 MB.
1. If the user doesn't return to the app within 20 minutes, app is removed from the cache.
1. The maximum time for Teams to receive the `readyToUnload` signal from the app is 30 seconds.
1. The grace period to get memory usage down after the app cached is one min.
1. App caching can't be enabled if the system memory is less than 4 GB or the available free memory is less than 1 GB (512 MB on Mac).
1. Side panel is the only FrameContext supported for app caching in meetings.
1. When the app is cached, CPU usage must not exceed 5%.
1. When the app is cached, the number of SDK requests shouldn't exceed five for every 12 seconds.
1. The cache state is monitored every 12 seconds and the apps that don’t meet the requirements are removed.

#### Code example

The following code snippet is an example to enable app caching on your app in Teams meeting:

```javascript
microsoftTeams.registerBeforeUnloadHandler((readyToUnload) => { 
console.log("got beforeunload from TEAMS"); 
// dispose resources and then invoke readyToUnload 
readyToUnload(); 
return true; 
}); 

microsoftTeams.registerOnLoadHandler((data) => { 
console.log("got load from TEAMS", data.contentUrl, data.entityId); 
// use contentUrl to route to correct page 
// invoke notifySuccess when ready  
microsoftTeams.appInitialization.notifySuccess(); 
}); 
```

#### Limitations

1. Single-page apps that use client-side routing for page navigation is the type of app that can benefit from app caching. It's also recommended that the same domain be used across all contexts of your app launch. Using bar.foo.com for chats and baz.foo.com for personal app isn't recommended as you need to go to the new domain in the load handler.

1. Apps need to re-register for events in the load handler, for example themeChange, focusEnter. Teams client won't send any notifications to the app when cached. If your app is a stateful app that requires notifications even when cached, caching might not be the right solution. Reach out to explore options.

1. App caching is supported only in the T1 Teams desktop client. In the web client, even if the app registers load handlers, the app will be evicted from the cache after the unload sequence completes.

1. Register the `load` and `beforeUnload` handlers in your launch sequence. The app isn't cached, if the Teams client doesn’t have these registrations.

1. The Teams client invokes the `loadHandler` only after the `unload` sequence of your app completes. For example, if a user launches tab A of your app, then launches tab B of your app, tab B won't get the load signal until tab B invokes the `readyToUnload` callback or times out.

1. After an app moves to the cached state, it will have a grace period of one minute to get the memory usage under the allowed threshold, which is currently 225 MB. Memory value used for this check is the workingSetSize of the webview as reported by the Electron [getappMetrics](https://www.electronjs.org/docs/latest/api/app#appgetappmetrics) API.

1. It's recommended that the same domain is used across all contexts of your app launch. Using bar.foo.com for chats and baz.foo.com for personal app is not recommended as you need to go to the new domain in the load handler.

1. Apps are cached on a per-window basis. An app cached in a meeting window can't be reused in a channel in the main window.

1. App caching is not supported for the stage or task module, because these can be opened on top of the tab, in which case you wouldn't be able to reuse the same webview to render.

1. App caching happens on a per app (not on a per tab) basis within the same window. The same webview is reused as users launch your tab from various contexts like channels, chat, and personal app once app caching is supported in these contexts.

1. Apps are expected to sleep when cached as it uses minimal compute or network resources and minimize SDK requests. The following SDK requests are allowed when the app is cached: `initialize`, `notifyappLoaded`, `notifySuccess`, `notifyFailure`, `notifyExpectedFailure`, `getContext`,  `getAuthToken`, `readyToUnload`, `getConfig/getSettings`, and all the register handlers. Most other SDK requests are blocked when the app is cached.

1. Register only the `beforeUnload` handler if your app doesn't require app caching but needs time to safely save state (if you want to ensure that going away from your app doesn't cause app content to be abruptly removed from the DOM). If the app hasn’t registered for the `load` event, it will be removed from the DOM after the unload flow completes.

1. Use the guidance in this document to onboard your app to app caching in Teams meetings first. Meetings are the first surface to support app caching in our new React stack, but if your app is also available in other contexts (channels and chat), app caching support in legacy Angular stack will kick in if your app registers `load/beforeUnload` handlers.

1. To avail the app caching support only in meetings, register the `load/beforeUnload` handlers only if the context is side panel. App caching for various contexts will be supported through the React stack.

1. App caching is not available in meetings where the invited member count is more than 20 participants.

1. App caching is not supported for apps that require device permissions as per the manifest.

## Code sample

|Sample name | Description | C# | Node.js |
|----------------|-----------------|--------------|----------------|
|Meeting stage sample | Sample app to show a tab in meeting stage for collaboration | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-stage-view/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-stage-view/nodejs) |
| In-meeting notification | Demonstrates how to implement in-meeting notification using bot. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-content-bubble/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-content-bubble/nodejs) |
| In-meeting document signing | Demonstrates how to implement a document signing Teams app. Includes sharing specific app content to stage, Teams SSO and user specific stage view. | [View](https://github.com/officedev/microsoft-teams-samples/tree/main/samples/meetings-share-to-stage-signing/csharp) | NA |

## See also

* [Teams authentication flow for tabs](../tabs/how-to/authentication/auth-flow-tab.md)
* [Apps for Teams meetings](teams-apps-in-meetings.md)
* [Build tabs for meeting](build-tabs-for-meeting.md)
* [Build extensible conversation for meeting chat](build-extensible-conversation-for-meeting-chat.md)
* [Build apps for anonymous users](build-apps-for-anonymous-user.md)
* [Advanced meeting APIs](meeting-apps-apis.md)
* [Custom Together Mode scenes](~/apps-in-teams-meetings/teams-together-mode.md)
* [Live Share SDK](teams-live-share-overview.md)
