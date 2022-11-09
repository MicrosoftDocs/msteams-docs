---
title: Build tabs for meeting
author: surbhigupta
description: Learn how to build a tabs for a meeting chat, meeting side panel, and meeting stage in Microsoft Teams meeting.
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: high
ms.date: 04/07/2022
---

# Build tabs for meeting

Every team has a different way of communicating and collaborating tasks. To achieve these different tasks, customize Teams with apps for meetings. Enable your apps for Teams meetings and configure the apps to be available in the meeting scope within their app manifest.

## Tabs in Teams meetings

Tabs allow the meeting participants to access services and content in a specific space within a meeting. If you're new to Microsoft Teams tab development, see [Build tabs for Teams](/microsoftteams/platform/tabs/what-are-tabs).

Before creating a meeting tab, it's important to learn about the surfaces that are available to target the meeting chat view, meeting details view, meeting side panel view and meeting stage view.

### Meeting details view

1. In your calendar, select a meeting to which you want to add a tab.
1. Select the **Details** tab and select :::image type="icon" source="../assets/icons/add-icon.png" Border = "false":::. The app gallery appears.

   :::image type="content" source="~/assets/images/apps-in-meetings/Pre-Meeting-002.png" alt-text="This screenshot shows the pre-meeting app experience in Teams meeting.":::

1. In the app gallery, select the app that you want to add and follow the steps as required. The tab is added to the meeting details page.

# [Desktop](#tab/desktop)

The following image shows a tab added to the meeting details page in the Teams desktop client:

   :::image type="content" source="~/assets/images/apps-in-meetings/PreMeetingTab.png" alt-text="The screenshot shows desktop Teams tabs in the meeting details view in the Teams meeting.":::

# [Mobile](#tab/mobile)

The following image shows a tab added to the meeting details page in the Teams mobile client:

   :::image type="content" source="../assets/images/mobile-tab.png" alt-text="The screenshot shows mobile Teams tabs in the meeting details view in the Teams meeting.":::

---

### Meeting chat view

1. From the Teams chat panel, select the meeting chat view.

1. Select :::image type="icon" source="../assets/icons/add-icon.png" Border = "false"::: and the app gallery appears.

1. In the app gallery, select the app that you want to add and follow the steps as required. The tab is added to the meeting chat.

   :::image type="content" source="../assets/images/apps-in-meetings/meeting-chat-view.png" alt-text="The screenshot shows the meeting chat view in the Teams meeting.":::

### Meeting side panel view

1. During a meeting, you can select :::image type="icon" source="../assets/icons/add-icon.png" Border = "false"::: **Apps** from Teams meeting window to add apps to the meeting.

   :::image type="content" source="../assets/images/apps-in-meetings/add-app.png" alt-text="This screenshot shows how to add an app in Teams meeting window.":::

1. In the app gallery, select the app that you want to add and follow the steps as required. The app is added to the meeting side panel.

   :::image type="content" source="../assets/images/side-panel-view.png" alt-text="This screenshot shows side panel view with the list of apps.":::

### Meeting stage view

1. After a tab is added to the meeting side panel, you can now choose to opt into global app sharing.

1. This results in rendering tab on the stage for every participant in the meeting.

   :::image type="content" source="../assets/images/meeting-stage-view.png" alt-text="This screenshot shows meeting stage view of the app you shared to meeting.":::

### Apps in channel meeting

A public scheduled channel meeting has the same list of apps as its parent team. Installing an app to a channel meeting also makes it available in the parent team, and vice versa.

However, the tab instances in a channel meeting are separate from the tabs in the channel itself. For example, suppose a *Development* channel has a *Polly* tab. If you create a *Standup* meeting in that channel, that meeting would not have a *Polly* tab, until you explicitly [add the tab to the meeting](#meeting-details-view).

In public scheduled channel meetings, after a meeting tab is added, you can select the meeting object in the meeting details page to access the tab.

:::image type="content" source="~/assets/images/apps-in-meetings/after-a-meeting1.png" alt-text="After a meeting":::

> [!NOTE]
> On mobile, anonymous users can't access apps in scheduled public channel meetings.

### App manifest settings for Tabs in meeting

Update your [app manifest](/microsoftteams/platform/resources/schema/manifest-schema) with relevant context property to configure the different tab views. The meetings app capabilities are declared in your app manifest using the scopes and context arrays under the configurableTabs section.

#### Scope

The scope defines who can access the apps.

* `groupchat` scope makes your app available in a group scope and enables the app to be added in a call or meeting (scheduled private meeting or instant meetings).

* `team` scope makes your app available in a team scope and enables your app to be added in team or channel or scheduled channel meeting.

#### Context

The `context` property determines if the app is available in specific view after installation and configuration. Following are the values for the `context` property from which you can use all or some of the values:

|Value|Description|
|---|---|
| **channelTab** | A tab in the header of a team channel. |
| **privateChatTab** | A tab in the header of a group chat between a set of users, not in the context of a team or meeting. |
| **meetingChatTab** | A tab in the header of a group chat between a set of users for a scheduled meeting. You can specify either **meetingChatTab** or **meetingDetailsTab** to ensure the apps work in mobile. |
| **meetingDetailsTab** | A tab in the header of the meeting details view of the calendar. You can specify either **meetingChatTab** or **meetingDetailsTab** to ensure the apps work in mobile. |
| **meetingSidePanel** | An in-meeting panel opened through the unified bar (U-bar). |
| **meetingStage** | An app from the `meetingSidePanel` can be shared to the meeting stage. You can't use this app either on mobile or Teams room clients. |

#### Configure tab app for a meeting

Apps in meetings can use the following contexts: `meetingChatTab`, `meetingDetailsTab`, `meetingSidePanel` and `meetingStage`. After a meeting participant installs an app and configures the tab in meeting, all the targeted other contexts of the app for the given meeting starts to render the tab.

The following code snippet is an example of a configurable tab used in an app for Teams meetings:

```json

"configurableTabs": [
    {
      "configurationUrl": "https://contoso.com/teamstab/configure",
      "canUpdateConfiguration": true,
      "scopes": [
        "team",
        "groupchat"
      ],
      "context":[
        "channelTab",
        "privateChatTab",
        "meetingChatTab",
        "meetingDetailsTab",
        "meetingSidePanel",
        "meetingStage"
     ]
    }
  ]
```

---

#### Other examples

Default context for tabs (if not specified) is:  

```json
"context":[ 
  "channelTab", 
  "privateChatTab", 
  "meetingChatTab", 
  "meetingDetailsTab" 
     ] 
```

To prevent an app from showing in non-meeting group chats, you must set the following context:

```json
"context":[ 
  "meetingSidePanel", 
  "meetingChatTab", 
  "meetingDetailsTab" 
     ] 
```

For in-meeting side panel experience only:  

```json
"context":[ 
  "meetingSidePanel" 
     ] 
```

### Advanced Tab SDK APIs

The Microsoft Teams JavaScript client SDK is a rich SDK used to create Tabs using JavaScript. Use the latest TeamsJS (V.2.0 or later) to work in Teams, Office, and Outlook. For more information, see [Teams JavaScript client SDK](/microsoftteams/platform/tabs/how-to/using-teams-client-sdk?tabs=javascript%2Cmanifest-teams-toolkit).

### Frame context

Microsoft Teams JavaScript library exposes the frameContext in which your meeting tab URL is loaded in the getContext API. The possible values of frameContext are content, task, setting, remove, sidePanel, and meetingStage. This allows you to build customized experiences based on where the app renders. For example, showing a specific collaboration focused UI when in the `meetingStage` and a different meeting preparation UI in the chat tab (`content`). For more information, see [getContext API](/microsoftteams/platform/tabs/how-to/access-teams-context?tabs=teamsjs-v2).

## App caching

App caching helps you to improve subsequent launch time of the apps that are loaded in the meeting side panel.

> [!NOTE]
>
> * Currently, app caching is available only in [public developer preview](~/resources/dev-preview/developer-preview-intro.md).
> * App caching is supported only for tabs loaded in the meeting side panel in Teams desktop client.
> * Currently, app caching is not supported on chats, channels, and personal apps.

### Enable app caching

To enable app caching in your meeting side panel, follow the steps:

1. Call `microsoftTeams.registerBeforeUnloadHandler` and `microsoftTeams.registerOnLoadHandler`.

1. Use `contentUrl` and `entityId` into the load handler to route to the correct page within your app and invoke `notifySuccess/notifyFailure` to notify Teams client that the app initialization flow is complete.

1. Dispose resources and perform any cleanup needed in the `beforeUnload handler`, then invoke the `readyToUnload` callback to notify Teams client that the app unload flow is complete.

The following is the flow diagram of the app added to the meeting stage without app caching:

:::image type="content" source="../assets/images/saas-offer/first-launch-app.png" alt-text="This screenshot shows the flow of the first launch of the app in meeting stage.":::

The following is the flow diagram of a cached app when it's added to the meeting stage:

:::image type="content" source="../assets/images/saas-offer/cached-launch-app.png" alt-text="This screenshot shows the flow of the cached launch of the app in meeting stage.":::

After you enable app caching, the webview that is used to host the embedded app is reused as users navigate to different instances of the app within a window.

The webview of the app remains in the Document Object Model (DOM). The webview is hidden when the users go out of the app and shown when the users return to the app. When the app is cached, any audio that is playing is muted.

> [!NOTE]
> If the app caching is not enabled, the webview is recreated every time the users go out and return to the app.

Following are the parameters to control the conditions for the apps to be added or removed from the cache:

* Only one app is supported in the cache for app caching. When there is more than one app with app caching in a meeting, then the least recently used app is removed from the cache.
* When the app is cached, the memory (working set) usage must not exceed 225 MB.
* If the user doesn't return to the app within 20 minutes, the app is removed from the cache.
* The maximum time for Teams to receive the `readyToUnload` signal from the app is 30 seconds.
* The grace period to get memory usage down after the app is cached is one minute.
* App caching is disabled if the system memory is less than 4 GB or the available free memory is less than 1 GB (512 MB on Mac).
* Side panel is the only supported FrameContext for app caching in meetings.
* When the app is cached, CPU usage must not exceed 5%.
* When the app is cached, the number of SDK requests shouldn't exceed five for every 12 seconds.
* The cache state is monitored every 12 seconds and the apps that don’t meet the requirements are removed from the cache.

### Code example

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

### Limitations

* Single-page apps that use client-side routing for page navigation can benefit from app caching. It's recommended that the same domain is used across all contexts of your app launch. For example, using *bar.foo.com* for chats and *baz.foo.com* for personal app isn't recommended as you need to go to the new domain in the load handler.

* Apps need to re-register for events such as `themeChange`, `focusEnter`, and so on in the load handler. Teams client won't send any notifications to the app when cached. If your app requires notifications even when cached, caching might not be the right solution.

* App caching is supported only in Teams desktop client. In Teams web client, even if the app registers load handlers, the app is removed from the cache after the unload sequence is completed.

* Register the `load` and `beforeUnload` handlers early in your launch sequence. If the Teams client doesn’t identify these registrations before the user goes out of the app, the app isn't cached.

* The Teams client invokes the `loadHandler` only after the `unload` sequence of the app is completed. For example, if a user launches tab A of your app and then launches tab B of the same app, tab B won't get the load signal until the tab A invokes the `readyToUnload` callback.

* After an app moves to the cached state, it has a one minute grace period to get the memory usage under the allowed threshold of 225 MB. If the app exceeds the threshold for more than a minute, the app is removed from the cache. The memory usage value of the app is the *workingSetSize* of the webview in the Electron [getappMetrics API](https://www.electronjs.org/docs/latest/api/app#appgetappmetrics).

* Apps are cached on a per-window basis.

* App caching isn't supported for the meeting stage or Task module contexts, because these can be opened on top of the tab and the same webview can't be used to render the content in the tab and the Task module.

* App caching happens on a per app (not on a per tab) basis within the same window.

* Apps are expected to sleep when cached as it uses minimal compute or network resources and minimize SDK requests. All the register handlers and the following SDK requests are allowed when the app is cached:

  * `initialize`
  * `notifyappLoaded`
  * `notifySuccess`
  * `notifyFailure`
  * `notifyExpectedFailure`
  * `getContext`
  * `getAuthToken`
  * `readyToUnload`
  * `getConfig/getSettings`

* Register only the `beforeUnload` handler if your app doesn't require app caching but needs time to safely save state (if you want to ensure that going away from your app doesn't cause app content to be abruptly removed from the DOM). If the app isn't registered for the `load` event, it's removed from the DOM after the unload flow completes.

* App caching isn't supported for meetings where the meeting participants are more than 20.

* App caching isn't supported for apps that require device permissions as per the manifest.

## Code sample

|Sample name | Description | C# | Node.js | TypeScript |
|----------------|-----------------|--------------|----------------|
| Meeting app | Demonstrates how to use the Meeting Token Generator app to request a token. The token is generated sequentially so that each participant has a fair opportunity to contribute in a meeting. The token is useful in situations like scrum meetings and Q&A sessions. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-token-app/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-token-app/nodejs) | NA |
| Meeting stage sample | Sample app to show a tab in meeting stage for collaboration. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-stage-view/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-stage-view/nodejs) | NA |
| Meeting side panel | Sample app to show how to add agenda in a meeting side panel. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-sidepanel/csharp) |-| NA |
| In-meeting notification | Demonstrates how to implement in-meeting notification using bot. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-content-bubble/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-content-bubble/nodejs) | NA |
| In-meeting document signing | Demonstrates how to implement a document signing Teams app. Includes sharing specific app content to stage, Teams SSO and user specific stage view. | [View](https://github.com/officedev/microsoft-teams-samples/tree/main/samples/meetings-share-to-stage-signing/csharp) | NA | NA |
| In-meeting document signing | Demonstrates how to implement a document signing Teams app. Includes sharing specific app content to stage, Teams SSO and user specific stage view. | [View](https://github.com/officedev/microsoft-teams-samples/tree/main/samples/meetings-share-to-stage-signing/csharp) | NA | NA |
| App caching | Sample app to show how app caching works in the meeting side panel. | NA | NA | [View](https://github.com/kpolnitz/app-caching-test-app) |

> [!NOTE]
>
> * Meeting apps (side panel and meeting stage) are supported in Teams desktop client.
> * Meeting apps (side panel and meeting stage) in Teams web client is supported only when the [developer preview is enabled](/microsoftteams/platform/resources/dev-preview/developer-preview-intro#enable-developer-preview).

## Step-by-step guides

* Follow the [step-by-step guide](../sbs-meeting-token-generator.yml) to generate meeting token in your Teams meeting.
* Follow the [step-by-step guide](../sbs-meetings-sidepanel.yml) to generate meeting side panel in your Teams meeting.
* Follow the [step-by-step guide](../sbs-meetings-stage-view.yml) to share meeting stage view in your Teams meeting.
* Follow the [step-by-step guide](../sbs-meeting-content-bubble.yml) to generate in-meeting notification in your Teams meeting.

## See also

* [In-meeting notification design guidelines](design/designing-apps-in-meetings.md#use-an-in-meeting-dialog)
* [Teams authentication flow for tabs](../tabs/how-to/authentication/auth-flow-tab.md)
* [Shared meeting stage experience design guidelines](~/apps-in-teams-meetings/design/designing-apps-in-meetings.md)
* [Add apps to meetings via Microsoft Graph](/graph/api/chat-post-installedapps?view=graph-rest-1.0&tabs=http&preserve-view=true)
