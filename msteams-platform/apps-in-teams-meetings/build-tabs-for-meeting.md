---
title: Build tabs for meeting
author: surbhigupta
description: Learn how to build a tab for a meeting chat, meeting side panel, and meeting stage in Microsoft Teams meeting, and app caching in meeting.
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: high
ms.date: 04/07/2022
---

# Build tabs for meeting

Every team has a different way of communicating and collaborating tasks. To achieve these different tasks, customize Teams with apps for meetings. Enable your apps for Teams meetings and configure the apps to be available in the meeting scope within their app manifest.

## Tabs in Teams meetings

Tabs allow the meeting participants to access services and content in a specific space within a meeting. If you're new to Microsoft Teams tab development, see [build tabs for Teams](/microsoftteams/platform/tabs/what-are-tabs).

Before creating a meeting tab, it's important to learn about the surfaces that are available to target the meeting chat view, meeting details view, meeting side panel view, and meeting stage view.

### Meeting details view

1. In your calendar, select a meeting to which you want to add a tab.
1. Select the **Details** tab and select :::image type="icon" source="../assets/icons/add-icon.png" Border = "false":::. The app gallery appears.

   :::image type="content" source="~/assets/images/apps-in-meetings/pre-meeting-002.png" alt-text="This screenshot shows the pre-meeting app experience in Teams meeting.":::

1. In the app gallery, select the app that you want to add and follow the steps as required. The tab is added to the meeting details page.

   # [Desktop](#tab/desktop)
    
   The following image shows a tab added to the meeting details page in the Teams desktop client:
    
    :::image type="content" source="~/assets/images/apps-in-meetings/premeetingtab.png" alt-text="The screenshot shows desktop Teams tabs in the meeting details view in the Teams meeting.":::
    
   # [Mobile](#tab/mobile)
    
   The following image shows a tab added to the meeting details page in the Teams mobile client:
    
    :::image type="content" source="../assets/images/mobile-tab.png" alt-text="Screenshot shows mobile Teams tabs in the meeting details view in the Teams meeting.":::
    
   ---
    
### Meeting chat view

1. From the Teams chat panel, select the meeting chat view.

1. Select :::image type="icon" source="../assets/icons/add-icon.png" Border = "false"::: and the app gallery appears.

1. In the app gallery, select the app that you want to add and follow the steps as required. The tab is added to the meeting chat.

    # [Meeting chat view desktop](#tab/meeting-chat-view-desktop)
    
    The following image shows an app added to the meeting chat in the Teams desktop client:
   
    :::image type="content" source="../assets/images/apps-in-meetings/meeting-chat-view.png" alt-text="The screenshot shows the meeting chat view in a meeting chat in Teams desktop.":::
    
    # [Meeting chat view mobile](#tab/meeting-chat-view-mobile)
    
    The following image shows an app added to the meeting chat in the Teams mobile client:
    
    :::image type="content" source="../assets/images/apps-in-meetings/meeting-chat-view-mobile.png" alt-text="The screenshot shows the meeting chat view in a meeting chat in Teams mobile.":::

    ---

### Meeting side panel view

1. During a meeting, you can select :::image type="icon" source="../assets/icons/add-icon.png" Border = "false"::: **Apps** from Teams meeting window to add apps to the meeting.

   :::image type="content" source="../assets/images/apps-in-meetings/add-app.png" alt-text="Screenshot shows how to add an app in Teams meeting window.":::

1. In the app gallery, select the app that you want to add and follow the steps as required. The app is added to the meeting side panel.

   :::image type="content" source="../assets/images/side-panel-view.png" alt-text="Screenshot shows side panel view with the list of apps.":::

#### Deep link to meeting side panel

> [!NOTE]
> Deep link to meeting side panel in Teams desktop client is available only in [public developer preview](~/resources/dev-preview/developer-preview-intro.md). However, for Teams mobile client deep link to meeting side panel is generally available.

You can create a deep link to your tab app that can open in the meeting side panel. When users in a meeting select the deep link, it opens the meeting side panel in the meeting stage. If a user selects the deep link before or after the meeting, the deep link opens in a pre or a post-meeting tab respectively.

# [Meeting side panel](#tab/meeting-side-panel)

* The following shows a deep link in meeting side panel in the Teams desktop client:

  :::image type="content" source="../assets/images/sidepanel-deeplink.gif" alt-text="Screenshot shows side panel view when deep link is selected.":::
    
* The following shows a deep link in meeting side panel in the Teams mobile client:
    
  :::image type="content" source="../assets/images/mobile-in-meeting-deeplink.gif" alt-text="Screenshot shows side panel view when deep link is selected in mobile.":::

# [Pre or post-meeting tab](#tab/pre-or-post-meeting-tab)

* The following shows a deep link in a pre or a post-meeting tab in the Teams desktop client:

  :::image type="content" source="../assets/images/pre-post-meeting.gif" alt-text="Screenshot shows a pre or post-meeting tab when deep link is selected.":::
    
* The following shows a deep link in a pre or a post-meeting tab in the Teams mobile client:
    
  :::image type="content" source="../assets/images/mobile-post-meeting-deeplink.gif" alt-text="Screenshot shows a pre or post-meeting tab when deep link is selected in mobile.":::
    
Pre or post-meeting tab behavior isn't supported in channel meetings.

---

For deep link format, see [deep links](~/concepts/build-and-test/deep-link-workflow.md#deep-link-to-meeting-side-panel).


### Meeting stage view

1. After a tab is added to the meeting side panel, you can now choose to opt into global app sharing.

1. This results in rendering tab on the stage for every participant in the meeting.

# [Meeting stage view desktop](#tab/meeting-stage-view-desktop)

   The following image shows a tab added to the meeting stage in the Teams desktop client:

   :::image type="content" source="../assets/images/meeting-stage-view.png" alt-text="This screenshot shows meeting stage view of the app you shared to meeting in Teams desktop.":::

# [Meeting stage view mobile](#tab/meeting-stage-view-mobile)

   The following image shows a tab added to the meeting stage in the Teams mobile client:

   :::image type="content" source="../assets/images/meeting-stage/meeting-stage-view-mobile.png" alt-text="This screenshot shows meeting stage view of the app you shared to meeting in Teams mobile.":::

---

### Apps in channel meeting

A public scheduled channel meeting has the same list of apps as its parent team. Installing an app to a channel meeting also makes it available in the parent team, and vice versa.

However, the tab instances in a channel meeting are separate from the tabs in the channel itself. For example, suppose a *Development* channel has a *Polly* tab. If you create a *Standup* meeting in that channel, that meeting wouldn't have a *Polly* tab, until you explicitly [add the tab to the meeting](#meeting-details-view).

# [Channel meeting desktop](#tab/channel-meeting-desktop)

   The following image shows apps in a channel in the Teams desktop client:

   :::image type="content" source="../assets/images/apps-in-meetings/apps-in-channel-meeting-desktop.png" alt-text="This screenshot shows a tab added to a channel meeting in Teams desktop.":::

# [Channel meeting mobile](#tab/channel-meeting-mobile)

   The following image shows apps in a channel in the Teams mobile client:

   :::image type="content" source="../assets/images/apps-in-meetings/apps-in-channel-meeting-mobile.png" alt-text="This screenshot shows a tab added to a channel meeting in Teams mobile.":::

---

In public scheduled channel meetings, after a meeting tab is added, you can select the meeting object in the meeting details page to access the tab.

:::image type="content" source="~/assets/images/apps-in-meetings/after-a-meeting1.png" alt-text="Screenshot shows the selection of the meeting object.":::

> [!NOTE]
> On mobile, anonymous users can't access apps in scheduled public channel meetings.

### Advanced tab APIs

TeamsJS is a rich library used to create Tabs using JavaScript. Use the latest TeamsJS (V.2.0 or later) to work in Teams, Microsoft 365 app, and Outlook. For more information, see [Teams JavaScript client library](/microsoftteams/platform/tabs/how-to/using-teams-client-library).

### Frame context

Microsoft Teams JavaScript library exposes the frameContext in which your meeting tab URL is loaded in the getContext API. The possible values of frameContext are content, task, setting, remove, sidePanel, and meetingStage. This allows you to build customized experiences based on where the app renders. For example, showing a specific collaboration focused UI when in the `meetingStage` and a different meeting preparation UI in the chat tab (`content`). For more information, see [getContext API](/microsoftteams/platform/tabs/how-to/access-teams-context?tabs=teamsjs-v2).

## Enable your tabs for Teams meeting

Update your [app manifest](/microsoftteams/platform/resources/schema/manifest-schema) with relevant context property to configure the different tab views. The meetings app capabilities are declared in your app manifest using the scopes and context arrays under the `configurableTabs` section.

### Scope

The scope defines who can access the apps.

* `groupchat` scope makes your app available in a group scope and enables the app to be added in a call or meeting (scheduled private meeting or instant meetings).

* `team` scope makes your app available in a team scope and enables your app to be added in team or channel or scheduled channel meeting.

### Context

The `context` property determines if the app is available in specific view after installation and configuration. Following are the values for the `context` property from which you can use all or some of the values:

|Value|Description|
|---|---|
| **channelTab** | A tab in the header of a team channel. |
| **privateChatTab** | A tab in the header of a group chat between a set of users, not in the context of a team or meeting. |
| **meetingChatTab** | A tab in the header of a group chat between a set of users for a scheduled meeting. You can specify either `meetingChatTab` or `meetingDetailsTab` to ensure the apps work in mobile. |
| **meetingDetailsTab** | A tab in the header of the meeting details view of the calendar. You can specify either `meetingChatTab` or `meetingDetailsTab` to ensure the apps work in mobile. |
| **meetingSidePanel** | An in-meeting panel opened through the unified bar (U-bar). |
| **meetingStage** | An app from the `meetingSidePanel` can be shared to the meeting stage. You can't use this app either in Teams room clients. |

### Configure tab app for a meeting

Apps in meetings can use the following contexts: `meetingChatTab`, `meetingDetailsTab`, `meetingSidePanel`, and `meetingStage`. After a meeting participant installs an app and configures the tab in meeting, all the targeted other contexts of the app for the given meeting starts to render the tab.

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

### Other examples

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

## Feature compatibility by user types

The following table provides the user types and lists the features that each user can access the tabs in meetings:

| User type | Scheduled meeting or Instant calendar meeting | One-on-one call | Group call | Scheduled channel meeting |
| :-- | :-- | :-- | :-- | :-- |
| In-tenant | Interaction allowed for all roles.<br><br> Create, update, or delete is allowed for all except the Attendees. | Interaction and create, update, or delete allowed. <br><br> In-tenant users in call with federated users can't interact and create, update, or delete. | Interaction and create, update, or delete allowed.<br><br> In-tenant users in call with federated users can't interact and create, update, or delete. | Interaction and create, update, or delete allowed for all roles except for attendees. |
| Guest | Can interact only | Can interact only | Can interact only | Can interact only |
| Federated or External | Can interact only | Not available | Not available | Can interact only |
| Anonymous | Can interact only | Not available | Not available | Not available |

## App caching

App caching improves subsequent launch time of the apps that are loaded in the meeting side panel by allowing you to keep some resources and assets in memory that you can use when rehydrating app.

> [!NOTE]
>
> * App caching is available only in [public developer preview](~/resources/dev-preview/developer-preview-intro.md).
> * App caching is supported only for tabs loaded in the meeting side panel in Teams desktop client. While it can work in other contexts such as personal apps and chat or channel tabs, it isn't officially supported. We recommend to register the `onLoad` or `beforeUnload` handlers when in the sidePanel frameContext.

### Enable app caching

To enable app caching in your meeting side panel, follow the steps:

1. Call `teamsCore.registerBeforeUnloadHandler` and `teamsCore.registerOnLoadHandler` APIs.

1. Use `contentUrl` and `entityId` passed into the load handler to route to the correct page within your app and invoke `notifySuccess` or `notifyFailure` to notify Teams client that the app initialization flow is complete.

   * [contentUrl](../tabs/how-to/create-tab-pages/configuration-page.md#modify-or-remove-a-tab): Add content page URL.
   * [entityId](../tabs/how-to/create-tab-pages/configuration-page.md#modify-or-remove-a-tab): Add a unique identifier.

1. Dispose resources and perform any cleanup needed in the `beforeUnload` handler, then invoke the `readyToUnload` callback to notify Teams client that the app unload flow is complete.

The following is the flow diagram of the first launch of an app that wants to opt into app caching (register the `load` or `beforeUnload` on the first launch of the app):

:::image type="content" source="../assets/images/saas-offer/first-launch-app.png" alt-text="This screenshot shows the flow of the first launch of the app in meeting side panel.":::

The following is the flow diagram of the launch of cached app:

:::image type="content" source="../assets/images/saas-offer/cached-launch-app.png" alt-text="This screenshot shows the flow of the cached launch of the app in meeting side panel.":::

When you opt into app caching, the webview that is used to host the embedded app is reused as users navigate to different instances of the app within a window. The webview used to host the app is hidden when the users leave the app and shown when the users return to the app. When the app is cached, any audio that is playing is muted.

> [!NOTE]
> If the app caching isn't enabled, the webview is recreated every time the user launches the app.

There are multiple reasons for an app to not get cached or for an app to get removed from the cache, some of the reasons are (numbers here are subject to change):

* If the system memory load is high, the app is removed from the cache.
* If the number of cached apps exceed the maximum cache size, the oldest cached app is removed from the cache.
* If the user doesn't return to the app within 20 minutes, the app is removed from the cache.
* The app isn't cached if Teams doesn't receive the `readyToUnload` signal from the app within 30 seconds after sending the `beforeUnload` notification.
* App caching is disabled if the system memory is less than 4 GB or if the available memory is less than 1 GB on Windows or 512 MB on Mac.
* Side panel is the only supported frameContext for app caching in meetings.
* App caching isn't supported for meetings where the invited user count is more than 20.
* If an app fails to load, the app isn't cached.

### Code example

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

### Limitations

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

### Troubleshooting

**Apps are not being cached? Why is load handler not invoked on subsequent navigation?**

* Verify if the system and available memory constraints are met.

* Reduce your memory footprint when cached. Use the `beforeUnload` handler to dispose resources, for example, release references and remove event listeners, that might not be needed when cached.

## Code sample

|Sample name | Description | .NET | Node.js | Manifest|
|----------------|--------------------------------------------------------|--------------|----------------|----------------|
| Meeting app | Demonstrates how to use the Meeting Token Generator app to request a token. The token is generated sequentially so that each participant has a fair opportunity to contribute in a meeting. The token is useful in situations like scrum meetings and Q&A sessions. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-token-app/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-token-app/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-token-app/csharp/demo-manifest/meetings-token-app.zip)|
| Meeting stage sample | Sample app to show a tab in meeting stage for collaboration. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-stage-view/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-stage-view/nodejs) ||
| Meeting side panel | Sample app to show how to add agenda in a meeting side panel. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-sidepanel/csharp) |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-sidepanel/nodejs) ||
| In-meeting notification | Demonstrates how to implement in-meeting notification using bot. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-events/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-events/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-events/csharp/demo-manifest/Meetings-Events.zip)|
| In-meeting document signing | Demonstrates how to implement a document signing Teams app. Includes sharing specific app content to stage, Teams SSO and user specific stage view. | [View](https://github.com/officedev/microsoft-teams-samples/tree/main/samples/meetings-share-to-stage-signing/csharp) | NA ||
| App caching | Sample app to show how app caching works in the meeting side panel. | NA | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-cache-meetings/nodejs) ||
| Meeting tabs | This sample shows app stage view, Mute/Unmute Teams meeting audio call in meeting Side panel tab. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meeting-tabs/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meeting-tabs/nodejs) ||

> [!NOTE]
>
> * Meeting apps (side panel and meeting stage) are supported in Teams desktop and mobile clients.
> * Meeting apps (side panel and meeting stage) in Teams web client is supported only when the [developer preview is enabled](/microsoftteams/platform/resources/dev-preview/developer-preview-intro#enable-developer-preview).

## Step-by-step guides

* Follow the [step-by-step guide](../sbs-meeting-token-generator.yml) to generate meeting token in your Teams meeting.
* Follow the [step-by-step guide](../sbs-meetings-sidepanel.yml) to generate meeting side panel in your Teams meeting.
* Follow the [step-by-step guide](../sbs-meetings-stage-view.yml) to share meeting stage view in your Teams meeting.
* Follow the [step-by-step guide](../sbs-meeting-content-bubble.yml) to generate in-meeting notification in your Teams meeting.

## See also

* [Apps for Teams meetings and calls](teams-apps-in-meetings.md)
* [Design your Microsoft Teams meeting extension](design/designing-apps-in-meetings.md)
* [Enable SSO for tab app](../tabs/how-to/authentication/tab-sso-overview.md)
* [Add apps to meetings using Microsoft Graph](/graph/api/chat-post-installedapps?view=graph-rest-1.0&tabs=http&preserve-view=true)
* [Get change notifications for Microsoft Teams meeting call updates](/graph/changenotifications-for-onlinemeeting)
