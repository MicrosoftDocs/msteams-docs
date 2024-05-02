---
title: Deep link to an application 
author: v-npaladugu
description: Learn how to create deep links to an application and navigate using them in your Microsoft Teams apps and tabs.
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: high
ms.date: 05/04/2023
---

# Deep link to an application

Deep links are configured to perform various actions such as opening a tab, initiating an app install dialog, or browsing within the app. Use deep links in [bot](~/bots/what-are-bots.md) and [connector](~/webhooks-and-connectors/what-are-webhooks-and-connectors.md) messages to inform users about changes to your tab or its items.

You can create a deep links for a custom app. However, if an app in the Microsoft Teams Store shares the same app ID as the custom app ID, the deep link opens the app from Teams Store instead of the custom app. You can also create a deep link to the app for mobile, after your app is approved for the Teams mobile platform. For the deep link to work on Teams iOS, you need the Apple App Store Connect Team ID. For more information, see [how to update Apple App Store Connect Team ID](../deploy-and-publish/appsource/prepare/update-apple-store-team-connect-id.md).

Deep links allow users to know more about an app and install it in different scopes. You can also create deep links for your app users to go to specific pages within your app. In this article, learn how to create a deep link:

* [To open application install dialog](#deep-link-to-open-application-install-dialog)
* [To browse within your app](#deep-link-to-browse-within-your-app)
* [To go to a chat with the application](#deep-link-to-a-chat-with-the-application)
* [To share deep link for a tab](#share-deep-link-for-a-tab)
* [To open a dialog (referred as task module in TeamsJS v1.x)](#deep-link-to-open-a-dialog)
* [To invoke Stageview](#deep-link-to-invoke-stageview)

[!INCLUDE [sdk-include](~/includes/sdk-include.md)]

## Deep link to open application install dialog

Deep links allow app users to open an application install dialog to know more information about the app or install it in different contexts. You can create a deep link to application in the following ways:

* [Configure deep link manually using your app ID](#configure-deep-link-manually-using-your-app-id)
* [Configure deep link to a tab using TeamsJS](#configure-deep-link-to-a-tab-using-teamsjs)

### Configure deep link manually using your app ID

Here's the deep link format you need to open an app install dialog from your Teams client using app ID:

`https://teams.microsoft.com/l/app/<your-app-id>?tenantId=<tenantId>`

Where `<your-app-id>` is your application ID (f46ad259-0fe5-4f12-872d-c737b174bcb4).

#### App ID for different types of apps

The following table lists the different types of app IDs used for different types of apps for deep links:

| Type of app | Type of app ID |
| --- | --- |
| Custom app uploaded in Teams | Manifest ID |
| Apps submitted to org catalog | Org catalog ID |
| Apps submitted to Teams Store | Store ID |

For more information, see [how to find ID based on the app manifest ID](/graph/api/appcatalogs-list-teamsapps#example-3-find-application-based-on-the-teams-app-manifest-id).

Applications can use TeamsJS library to initiate the app installation dialog, eliminating the need for manual deep link generation. Here's an example of how to trigger the app installation dialog using TeamsJS within your application:

# [TeamsJS v2](#tab/teamsjs-v2)

```javascript
// Open an app install dialog from your tab
if(appInstallDialog.isSupported()) {
    const dialogPromise = appInstallDialog.openAppInstallDialog({ appId: "<appId>" });
    dialogPromise.
      then((result) => {/*Successful operation*/}).
      catch((error) => {/*Unsuccessful operation*/});
}
else { /* handle case where capability isn't supported */ }
```

For more information about the `appInstallDialog` module, see [appInstallDialog module](/javascript/api/@microsoft/teams-js/appinstalldialog?view=msteams-client-js-latest#@microsoft-teams-js-appinstalldialog-openappinstalldialog&preserve-view=true).

# [TeamsJS v1](#tab/teamsjs-v1)

```javascript
// Open an app install dialog from your tab
microsoftTeams.executeDeepLink("https://teams.microsoft.com/l/app/<appId>");
```

---

## Deep link to browse within your app

App users can browse through content in Teams from your tab using TeamsJS. You can use a deep link to browse within your app if your tab needs to connect users with other content in Teams, such as to a channel, message, another tab, or to open a scheduling dialog. In few instances, navigation can also be accomplished using TeamsJS and we recommend to use typed capabilities of TeamsJS wherever possible.

TeamsJS enables Teams apps extended across Outlook and Microsoft 365 to check if the host supports the capability you're attempting to use. To check a host's support of a capability, you can use the `isSupported()` function associated with the namespace of the API. TeamsJS organizes APIs into capabilities by way of namespaces. For example, before using an API in the `pages` namespace, you can check the returned Boolean value from `pages.isSupported()` and take the appropriate action within the context of your app and app's UI.  

For more information about capabilities and the APIs in TeamsJS, see [Building tabs and other hosted experiences with the TeamsJS library](~/tabs/how-to/using-teams-client-sdk.md#apis-organized-into-capabilities).

You can configure deep links to browse within your app in the following ways:

* [Configure deep link to browse within your app manually](#configure-deep-link-to-browse-within-your-app-manually)
* [Configure deep link to a tab using TeamsJS](#configure-deep-link-to-a-tab-using-teamsjs)

### Configure deep link to browse within your app manually

Use the following format for a deep link in a bot, connector, or message extension card:

`https://teams.microsoft.com/l/entity/<appId>/<entityId>?tenantId=<tenantId>&webUrl=<entityWebUrl>&label=<entityLabel>&context=<context>&openInMeeting=false`

* If the bot sends a message containing a `TextBlock` with a deep link, then a new browser tab is opened when the user selects the link. This happens in Chrome and in the Teams desktop app, when they're running on Linux.

* If the bot sends the same deep link URL into an `Action.OpenUrl`, then the Teams tab opens in the current browser tab when the user selects the link.

The query parameters are:

| Parameter name | Description | Example |
|:------------|:--------------|:---------------------|
| `appId`&emsp; | The ID from Microsoft Teams admin center. |fe4a8eba-2a31-4737-8e33-e5fae6fee194|
| `entityId`&emsp; | The ID of the tab, which you provided when [configuring the tab](~/tabs/how-to/create-tab-pages/configuration-page.md). When generating a URL for deep linking, continue to use entity ID as a parameter name in the URL. When configuring the tab, the context object refers to the `entityId` as `page.id`. |Tasklist 123|
| `entityWebUrl` or `subEntityWebUrl`&emsp; | An optional field with a fallback URL to use if the client doesn't support rendering the tab. | `https://tasklist.example.com/123` or `https://tasklist.example.com/list123/task456` |
| `entityLabel` or `subEntityLabel`&emsp; | A label for the item in your tab to use when displaying the deep link. | Task List 123 or Task 456 |
| `context.subEntityId`&emsp; | An ID for the item within the tab. When generating a URL for deep linking, continue to use `subEntityId` as the parameter name in the URL. When configuring the tab, the context object refers to the `subEntityId` as `page.subPageId`. |Task 456 |
| `context.channelId`&emsp; | Microsoft Teams channel ID that is available from the tab [context](~/tabs/how-to/access-teams-context.md). This property is available only in configurable tabs with a scope of **team**. It isn't available in static tabs, which has a **personal** scope.| 19:<cbe3683f25094106b826c9cada3afbe0@thread.skype> |
| `context.chatId`&emsp; | Chat ID that is available from the tab [context](~/tabs/how-to/access-teams-context.md) for group and meeting chat. | 17:b42de192376346a7906a7dd5cb84b673@thread.v2 |
| `context.contextType`&emsp; |  Chat is the only supported `contextType` for meetings. | chat |
|`&openInMeeting=false`| Use `openInMeeting` to control the user experience when the target tab is associated with a meeting. If user interacts with the deep link in an ongoing meeting experience, Teams opens the app in the in-meeting side panel. Set this value to `false` to always open the app in the meeting chat tab rather than the side panel, regardless of the meeting status. Teams ignores any value other than `false`. | `false` |

> [!NOTE]
>
> * Personal tabs have a `personal` scope, while channel and group tabs use `team` or `group` scopes. The two tab types have a slightly different syntax since only the configurable tab has a `channel` property associated with its context object. For more information on tab scopes, see the [app manifest](~/resources/schema/manifest-schema.md).
> * Deep links work properly only if the tab was configured using the library v0.4 or later as it has an entity ID. Deep links to tabs without entity IDs still go to the tab but can't provide the subentity ID to the tab.

**Examples**:

* Link to a static (personal) tab itself:

    >`https://teams.microsoft.com/l/entity/fe4a8eba-2a31-4737-8e33-e5fae6fee194/tasklist123?webUrl=https://tasklist.example.com/123&label=Task List 123`

* Link to a task item within the static (personal) tab:

    >`https://teams.microsoft.com/l/entity/fe4a8eba-2a31-4737-8e33-e5fae6fee194/tasklist123?webUrl=https://tasklist.example.com/123/456&label=Task 456&context={"subEntityId": "task456"}`

* Link to a configurable tab itself:

    >`https://teams.microsoft.com/l/entity/fe4a8eba-2a31-4737-8e33-e5fae6fee194/tasklist123?webUrl=https://tasklist.example.com/123&label=Task List 123&context={"channelId": "19:cbe3683f25094106b826c9cada3afbe0@thread.skype"}`

* Link to a task item within the configurable tab:

    >`https://teams.microsoft.com/l/entity/fe4a8eba-2a31-4737-8e33-e5fae6fee194/tasklist123?webUrl=https://tasklist.example.com/123/456&label=Task 456&context={"subEntityId": "task456","channelId": "19:cbe3683f25094106b826c9cada3afbe0@thread.skype"}`

* Link to a tab app added to a meeting or group chat:

    >`https://teams.microsoft.com/l/entity/fe4a8eba-2a31-4737-8e33-e5fae6fee194/tasklist123?webUrl=https://tasklist.example.com/123/456&label=Task 456?context={"chatId": "17:b42de192376346a7906a7dd5cb84b673@thread.v2","contextType":"chat"}`

> [!IMPORTANT]
> Ensure that all the query parameters and the white spaces are properly URI encoded. You must follow the preceding examples using the last example:
>
> ```javascript
> var encodedWebUrl = encodeURIComponent('https://tasklist.example.com/123/456&label=Task 456');
> var encodedContext = encodeURIComponent(JSON.stringify({"subEntityId": "task456"}));
> var taskItemUrl = 'https://teams.microsoft.com/l/entity/fe4a8eba-2a31-4737-8e33-e5fae6fee194/tasklist123?webUrl=' + encodedWebUrl + '&context=' + encodedContext;
> ```

#### Configure deep link to a tab using TeamsJS

You can configure deep links in your app through TeamsJS to allow the app users browse different pages within your app. The following code demonstrates how to navigate to a specific entity within your Teams app:

# [TeamsJS v2](#tab/teamsjs-v2)

You can trigger navigation from your tab using the [pages.navigateToApp()](/javascript/api/@microsoft/teams-js/pages?view=msteams-client-js-latest#@microsoft-teams-js-pages-navigatetoapp&preserve-view=true) function as shown in the following code:

```javascript
if (pages.isSupported()) {
  const navPromise = pages.navigateToApp({ appId: <appId>, pageId: <pageId>, webUrl: <webUrl>, subPageId: <subPageId>, channelId:<channelId>});
  navPromise.
     then((result) => {/*Successful navigation*/}).
     catch((error) => {/*Failed navigation*/});
}
else { /* handle case where capability isn't supported */ }
```

For more information about navigation within a tab app, see [navigate within a tab app](../../tabs/how-to/tab-navigation.md). For more information about using the pages capability, see [pages.navigateToApp()](/javascript/api/@microsoft/teams-js/pages?view=msteams-client-js-latest#@microsoft-teams-js-pages-navigatetoapp&preserve-view=true) and the [pages](/javascript/api/@microsoft/teams-js/pages?view=msteams-client-js-latest&preserve-view=true) namespace for other navigation options. If needed directly open a deep link using the [app.openLink()](/javascript/api/@microsoft/teams-js/app?view=msteams-client-js-latest#@microsoft-teams-js-app-openlink&preserve-view=true) function.

# [TeamsJS v1](#tab/teamsjs-v1)

To trigger a deep link from your tab, call:

```javascript
microsoftTeams.executeDeepLink(/*deepLink*/);
```

---

The navigation behavior of a Teams app extended across Microsoft 365 Office is dependent on two factors:

1. The target that the deep link points to.
1. The host where the Teams app is running.

If the Teams app is running within the host where the deep link is targeted, your app opens directly within the host. However, if the Teams app is running in a different host from where the deep link is targeted, the app first opens in the browser.

## Deep link to a chat with the application

You can allow app users browse to a personal chat with the application by configuring the deep link manually using the following format:

`https://teams.microsoft.com/l/entity/<appId>/conversations?tenantId=<tenantId>`, where `appId` is your application ID. To know about different app IDs used see, see [App ID for different types of apps](#app-id-for-different-types-of-apps).

## Share deep link for a tab

You can share deep links to entities in Teams apps to navigate to the content and information within your tab app. For example, if your tab app contains a task list, team members can create and share links to individual tasks. When the app user selects the link, it navigates to your tab that focuses on the specific item.

# [TeamsJS v2](#tab/teamsjs-v2)

Add a **copy link** action to each item in whatever way best suits your UI. When the user takes this action, call [`pages.shareDeepLink()`](/javascript/api/@microsoft/teams-js/pages?view=msteams-client-js-latest#@microsoft-teams-js-pages-sharedeeplink&preserve-view=true) to display a dialog containing a link that the user can copy to the clipboard. When you make this call, pass an ID for your item. You get it back in [context](~/tabs/how-to/access-teams-context.md) when the link is followed and your tab is reloaded.

```javascript
pages.shareDeepLink({ subPageId: <subPageId>, subPageLabel: <subPageLabel>, subPageWebUrl: <subPageWebUrl> })
```

You need to replace the following parameters with the appropriate information:

* `subPageId`: A unique identifier for the item within your page to which you're deep linking.
* `subPageLabel`: A label for the item to use for displaying the deep link.
* `subPageWebUrl`: A fallback URL to use if the client can't render the page.

For more information, see [pages.shareDeepLink()](/javascript/api/@microsoft/teams-js/pages?view=msteams-client-js-latest#@microsoft-teams-js-pages-sharedeeplink&preserve-view=true).

# [TeamsJS v1](#tab/teamsjs-v1)

Add a **copy link** action to each item in whatever way best suits your UI. When the user takes this action, call `shareDeepLink()` to display a dialog containing a link that the user can copy to the clipboard. When you make this call, pass an ID for your item. You get it back in [context](~/tabs/how-to/access-teams-context.md) when the link is followed and your tab is reloaded.

```javascript
microsoftTeams.shareDeepLink({ subEntityId: <subEntityId>, subEntityLabel: <subEntityLabel>, subEntityWebUrl: <subEntityWebUrl> })
```

You need to replace the following parameters with the appropriate information:

* `subEntityId`: A unique identifier for the item within your tab to which you're deep linking.
* `subEntityLabel`: A label for the item to use for displaying the deep link.
* `subEntityWebUrl`: An optional parameter with a fallback URL to use if the client doesn't support rendering the tab.

---

> [!NOTE]
>
> * This deep link is different from the links provided by the **Copy link to tab** menu item, which only generates a deep link that points to this tab.
> * `shareDeepLink` doesn't work on Teams mobile platforms.

## Deep link for SharePoint Framework tabs

You can use the following deep link format in a bot, connector, or message extension card:
`https://teams.microsoft.com/l/entity/<appId>/<EntityId>?webUrl=<entityWebUrl>/<EntityName>`.

> [!NOTE]
>
> * When a bot sends a `TextBlock` message with a deep link, a new browser tab opens when users select the link. This happens in Chrome and Microsoft Teams desktop app running on Linux.
> * If the bot sends the same deep link URL in an `Action.OpenUrl`, the Teams tab opens in the current browser when the user selects the link. No new browser tab is opened.

The query parameters are:

* `appID`: Your manifest ID, for example `fe4a8eba-2a31-4737-8e33-e5fae6fee194`.

* `entityID`: The item ID that you provided when [configuring the tab](~/tabs/how-to/create-tab-pages/configuration-page.md). For example, `tasklist123`.
* `entityWebUrl`: An optional parameter with a fallback URL to use if the client doesn't support rendering of the tab - `https://tasklist.example.com/123` or `https://tasklist.example.com/list123/task456`.
* `entityName`: A label for the item in your tab to use when displaying the deep link, such as `Task List 123` or `Task 456`.

Example: `https://teams.microsoft.com/l/entity/fe4a8eba-2a31-4737-8e33-e5fae6fee194/tasklist123?webUrl=https://tasklist.example.com/123&TaskList`

## Deep link to open a dialog

A dialog deep link is a serialization of the `TaskInfo` object with two other details, the `APP_ID` and optionally the `BOT_APP_ID`:

* `https://teams.microsoft.com/l/task/APP_ID?url=<TaskInfo.url>&height=<TaskInfo.height>&width=<TaskInfo.width>&title=<TaskInfo.title>&completionBotId=BOT_APP_ID`

* `https://teams.microsoft.com/l/task/APP_ID?card=<TaskInfo.card>&height=<TaskInfo.height>&width=<TaskInfo.width>&title=<TaskInfo.title>&completionBotId=BOT_APP_ID`

For the data types and allowable values for `<TaskInfo.url>`, `<TaskInfo.card>`, `<TaskInfo.height>`, `<TaskInfo.width>`, and `<TaskInfo.title>`, see [TaskInfo object](~/task-modules-and-cards/task-modules/invoking-task-modules.md#dialoginfo-object).

> [!TIP]
> Encode the deep link URL when using the `card` parameter, for example, JavaScript [`encodeURI()` function](https://www.w3schools.com/jsref/jsref_encodeURI.asp).

The following table provides information on `APP_ID` and `BOT_APP_ID`:

| Value | Type | Required | Description |
| --- | --- | --- | --- |
| `APP_ID` | string | Yes | For third-party apps, use the app `id` from manifest or the `APP_ID` from Teams admin center as they're identical. For custom apps or custom apps built for your org (LOB apps), use the `APP_ID` from Teams admin center or use the [Graph API](/graph/api/application-list). The [validDomains array](~/resources/schema/manifest-schema.md#validdomains) in the manifest for `APP_ID` must contain the domain for `url` if `url` is present in the deep-link URL. The app ID is already known when a dialog is invoked from a tab or a bot, which is why it isn't included in `TaskInfo`. |
| `BOT_APP_ID` | string | No | If a value for `completionBotId` is specified, the `result` object is sent using a `task/submit invoke` message to the specified bot. Specify `BOT_APP_ID` must be specified as a bot in the app's manifest, which you can't send it to any bot. |

> [!NOTE]
> `APP_ID` and `BOT_APP_ID` can be the same in many cases, if an app has a recommended bot to use as an app's ID and if there is one.

## Generate a deep link to share content to stage in meetings

You can also generate a deep link to [share the app to stage](~/apps-in-teams-meetings/enable-and-configure-your-app-for-teams-meetings.md#share-entire-app-to-stage) and start or join a meeting.

For deep links to share content to stage, see [deep link to share content to stage in meetings](~/concepts/build-and-test/share-in-meeting.md#generate-a-deep-link-to-share-content-to-stage-in-meetings).

> [!NOTE]
>
> * Generating a deep link to share content to stage in meetings is available only in [public developer preview](~/resources/dev-preview/developer-preview-intro.md).
> * Deep link to share content to stage in meeting is supported in Teams desktop client only.

## Deep link to meeting side panel

You can generate a deep link to the [meeting side panel](~/apps-in-teams-meetings/build-tabs-for-meeting.md#deep-link-to-meeting-side-panel) in a meeting. Use the following format for a deep link to the meeting side panel:

`https://teams.microsoft.com/l/entity/<appId>/<entityId>?webUrl=<entityWebUrl>&label=<entityLabel>&context=<context>`.

Example:

`https://teams.microsoft.com/l/entity/fe4a8eba-2a31-4737-8e33-e5fae6fee194/tasklist123?webUrl=https://tasklist.example.com/123/456&label=Task 456&context={"chatId": "17:b42de192376346a7906a7dd5cb84b673@thread.v2","contextType":"chat"}`

By default, a deep link opens in a meeting side panel. To open a deep link directly in an app rather than the meeting side panel, add `openInMeeting=false` in the deep link format:

`https://teams.microsoft.com/l/entity/<appId>/<entityId>?webUrl=<entityWebUrl>&label=<entityLabel>&context=<context>&openInMeeting=false`

For more information, see [deep link to a tab](#configure-deep-link-to-browse-within-your-app-manually).

A deep link doesn't open in the meeting side panel in the following scenarios:

* There's no active meeting.
* The app doesn't have `sidePanel` context declared in the app manifest.
* `openInMeeting` is set to `false` in the deep link.
* The deep link is selected outside of the meeting window or component.
* The deep link doesn't match the current meeting, for example, if the deep link is created from another meeting.

## Deep link to invoke Stageview

You can invoke Stageview through deep link from your tab by wrapping the deep link URL in the `app.openLink(url)` API. The deep link can also be passed through an `OpenURL` action in the card. The `openMode` property defined in the API determines the Stageview response. For more information, see [invoke Stageview through deep link](../../tabs/tabs-link-unfurling.md#invoke-from-deep-link).

## Code sample

| Sample name | Description | .NET |Node.js|
|-------------|-------------|------|----|
| Deep link consuming Subentity ID | This sample shows how to use a deep link from a bot chat to a tab consuming the Subentity ID. It also shows deep links for:<br>- Navigating to an app<br>- Navigating to a chat<br>- Open a profile dialog<br>- Open a scheduling dialog |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-deeplink/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-deeplink/nodejs)|
