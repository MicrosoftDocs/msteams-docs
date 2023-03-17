---
title: Deep link to an application 
author: v-npaladugu
description: Learn how to create deep links to an application and navigate using them in your Microsoft Teams apps and tabs.
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: high
---

# Deep link to an application

You can configure deep links to a tab, to open an app install dialog, to browse within the app, and more. Use deep links in [bot](~/bots/what-are-bots.md) and [connector](~/webhooks-and-connectors/what-are-webhooks-and-connectors.md) messages that inform users about changes to your tab, or to items within it. Create a deep link for your app after the app is listed in the Teams store. Deep link to an app isn't supported for custom apps.

If your app is approved for mobile platform, you can create a deep link to the app on mobile. If you want the deep link to work on Teams-iOS, you’ll need the Apple App Store Connect Team ID additionally for the deep link to work on Teams-iOS. For more information, see [how to update Apple App Store Connect Team ID](../deploy-and-publish/appsource/prepare/update-apple-store-team-connect-id.md).

Deep links can allow users to know more about an app and install it in different scopes. You can also create deep links for your users to go to specific pages of your app. In this article, you’ll learn to configure a deep link:

- [To open application install dialog](#deep-link-to-open-application-install-dialog)
- [To browse within your app](#deep-link-to-browse-within-your-app)
- [To go to a chat with the application](#deep-link-to-a-chat-with-the-application)
- [Share deep link for a tab](#share-deep-link-for-a-tab)
- [To open a task module](#deep-link-to-open-a-task-module)

[!INCLUDE [sdk-include](~/includes/sdk-include.md)]

## Deep link to open application install dialog

You can use deep links to allow app user to open an app install dialog to know more information about the app or install it in other contexts. You can create a deep link in one of the following two ways:

* [Configure deep link manually using your app ID](#configure-deep-link-manually-using-your-app-id).
* [Configure deep link using TeamsJS library](#configure-deep-link-using-teamsjs-library).

#### Configure deep link manually using your app ID

Following is the deep link format to open an app install dialog from your Teams client:

`https://teams.microsoft.com/l/app/<your-app-id>&tenantId=<tenantId>`

Where `<your-app-id>` is your application ID (f46ad259-0fe5-4f12-872d-c737b174bcb4). To know more about different app IDs used see, [app ID used for different apps](#app-id-used-for-different-apps).

##### App ID used for different apps

Following are the different app IDs that can be used for deep links:

* Side loaded apps: Manifest ID
* Apps submitted to org catalog: Org catalog ID
* Apps submitted to Teams app store: Store ID

#### Configure deep link using TeamsJS library 

Applications can use the TeamsJS library to open the app install dialog without manually generating the deep link. Following is an example to open the app install dialog using TeamsJS at the trigger of your choice in the app:

# [TeamsJS v2](#tab/teamsjs-v2)

```javascript
// Open an app install dialog from your tab
if(appInstallDialog.isSupported()) {
    const dialogPromise = appInstallDialog.openAppInstallDialog({ appId: "f46ad259-0fe5-4f12-872d-c737b174bcb4" });
    dialogPromise.
      then((result) => {/*Successful operation*/}).
      catch((error) => {/*Unsuccessful operation*/});
}
else { /* handle case where capability isn't supported */ }
```

For more information about the install dialog, see the [appInstallDialog.openAppInstallDialog()](/javascript/api/@microsoft/teams-js/appinstalldialog?view=msteams-client-js-latest#@microsoft-teams-js-appinstalldialog-openappinstalldialog&preserve-view=true) function in the API reference documentation.

# [TeamsJS v1](#tab/teamsjs-v1)

```javascript
// Open an app install dialog from your tab
microsoftTeams.executeDeepLink("https://teams.microsoft.com/l/app/f46ad259-0fe5-4f12-872d-c737b174bcb4");
```

---

## Deep link to browse within your app

App users can browse through content in Teams from your tab using TeamsJS library. This is useful if your tab needs to connect users with other content in Teams, such as to a channel, message, another tab, or to open a scheduling dialog. In few instances navigation can also be accomplished using the TeamsJS library and where possible use of the typed capabilities of the TeamsJS library is recommended.

One of the benefits of using TeamsJS, particularly for Teams app that might run in other hosts (Outlook and Office), is that it's possible to check if the host supports the capability you're attempting to use. To check a host's support of a capability, you can use the `isSupported()` function associated with the namespace of the API. The TeamsJS library organizes APIs into capabilities by way of namespaces. For example, prior to usage of an API in the `pages` namespace, you can check the returned Boolean value from `pages.isSupported()` and take the appropriate action within the context of your app and apps UI.  

For more information about capabilities and the APIs in the TeamsJS library, see [Building tabs and other hosted experiences with the TeamsJS library](~/tabs/how-to/using-teams-client-sdk.md#apis-organized-into-capabilities).

You can configure deep links to browse within your app in one of the following two ways:

* [Configure deep link to browse within your app manually](#configure-deep-link-to-browse-within-your-app-manually)
* [Configure deep link to a tab using TeamsJS library](#configure-deep-link-to-a-tab-using-teamsjs-library)

#### Configure deep link to browse within your app manually 

Use the following format for a deep link in a bot, connector, or message extension card:

`https://teams.microsoft.com/l/entity/<appId>/<entityId>?tenantId=<tenantId>&webUrl=<entityWebUrl>&label=<entityLabel>&context=<context>`

* If the bot sends a message containing a `TextBlock` with a deep link, then a new browser tab is opened when the user selects the link. This happens in Chrome and in the Teams desktop app, when they are running on Linux.

* If the bot sends the same deep link URL into an `Action.OpenUrl`, then the Teams tab opens in the current browser tab when the user selects the link.

The query parameters are:

| Parameter name | Description | Example |
|:------------|:--------------|:---------------------|
| `appId`&emsp; | The ID from Teams Admin Center. |fe4a8eba-2a31-4737-8e33-e5fae6fee194|
| `entityId`&emsp; | The ID for the item in the tab, which you provided when [configuring the tab](~/tabs/how-to/create-tab-pages/configuration-page.md). <br> * When generating a URL for deep linking, continue to use entity ID as a parameter name in the URL. <br> * When configuring the tab, the context object refers to the entityID as {page.id}. |Tasklist123|
| `entityWebUrl` or `subEntityWebUrl`&emsp; | An optional parameter with a fallback URL to use if the client doesn't support rendering the tab. | `https://tasklist.example.com/123` or `https://tasklist.example.com/list123/task456` |
| `entityLabel` or `subEntityLabel`&emsp; | A label for the item in your tab to use when displaying the deep link. | Task List 123 or Task 456 |
| `context.subEntityId`&emsp; | An ID for the item within the tab. When generating a URL for deep linking, continue to use subEntityId as the parameter name in the URL. When configuring the tab, the context object refers to the subEntityID as subPageID. |Task456 |
| `context.channelId`&emsp; | Microsoft Teams channel ID that is available from the tab [context](~/tabs/how-to/access-teams-context.md). This property is available only in configurable tabs with a scope of **team**. It isn't available in static tabs, which has a **personal** scope.| 19:cbe3683f25094106b826c9cada3afbe0@thread.skype |
| `context.chatId`&emsp; | Chat ID that is available from the tab [context](~/tabs/how-to/access-teams-context.md) for group and meeting chat. | 17:b42de192376346a7906a7dd5cb84b673@thread.v2 |
| `context.contextType`&emsp; |  Chat is the only supported contextType for meetings. | chat |

> [!NOTE]
>
> * Personal tabs have a `personal` scope, while channel and group tabs use `team` or `group` scopes. The two tab types have a slightly different syntax since only the configurable tab has a `channel` property associated with its context object. For more information on tab scopes, see the [manifest](~/resources/schema/manifest-schema.md) reference.
> * Deep links work properly only if the tab was configured using the v0.4 or later library as it has an entity ID. Deep links to tabs without entity IDs still go to the tab but can't provide the subentity ID to the tab.

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
> var encodedWebUrl = encodeURIComponent(JSON.stringify('https://tasklist.example.com/123/456&label=Task 456'));
> var encodedContext = encodeURIComponent(JSON.stringify({"subEntityId": "task456"}));
> var taskItemUrl = 'https://teams.microsoft.com/l/entity/fe4a8eba-2a31-4737-8e33-e5fae6fee194/tasklist123?webUrl=' + encodedWebUrl + '&context=' + encodedContext;
> ```

#### Configure deep link to a tab using TeamsJS library

You can configure deep links in your app through the TeamsJS library to allow the app users browse different pages within your app. The following code demonstrates how to navigate to a specific entity within your Teams app:

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

For more information about using the pages capability, see [pages.navigateToApp()](/javascript/api/@microsoft/teams-js/pages?view=msteams-client-js-latest#@microsoft-teams-js-pages-navigatetoapp&preserve-view=true) and the [pages](/javascript/api/@microsoft/teams-js/pages?view=msteams-client-js-latest&preserve-view=true) namespace for other navigation options. If needed, it's also possible to directly open a deep link using the [app.openLink()](/javascript/api/@microsoft/teams-js/app?view=msteams-client-js-latest#@microsoft-teams-js-app-openlink&preserve-view=true) function.

# [TeamsJS v1](#tab/teamsjs-v1)

To trigger a deep link from your tab, call:

```javascript
microsoftTeams.executeDeepLink(/*deepLink*/);
```

---

The navigation behavior of a Teams app extended across Microsoft 365 Office is dependent on two factors:

1. The target that the deep link points to.
1. The host where the Teams app is running.

If the Teams app is running within the host where the deep link is targeted, your app will open directly within the host. However, if the Teams app is running in a different host from where the deep link is targeted, the app will first open in the browser.

## Deep link to a chat with the application

You can allow app users browse to a personal chat with the application by configuring the deep link manually using the following format:

`https://teams.microsoft.com/l/entity/<appId>?tenantId=<tenantId>/conversations`, where `appId` is your application ID. To know about different app IDs used see, [app ID used for different apps](#app-id-used-for-different-apps).

## Share deep link for a tab

You can share deep links to entities in Teams apps. This method is used to create and share links that navigate to the content and information within your tab app. For example, if your tab app contains a task list, team members can create and share links to individual tasks. When the app user selects the link, it navigates to your tab that focuses on the specific item.

# [TeamsJS v2](#tab/teamsjs-v2)

To implement, add a **copy link** action to each item, in whatever way best suits your UI. When the user takes this action, call [`pages.shareDeepLink()`](/javascript/api/@microsoft/teams-js/pages?view=msteams-client-js-latest#@microsoft-teams-js-pages-sharedeeplink&preserve-view=true) to display a dialog containing a link that the user can copy to the clipboard. When you make this call, pass an ID for your item. You get it back in [context](~/tabs/how-to/access-teams-context.md) when the link is followed and your tab is reloaded.

```javascript
pages.shareDeepLink({ subPageId: <subPageId>, subPageLabel: <subPageLabel>, subPageWebUrl: <subPageWebUrl> })
```

You'll need to replace the parameters with the appropriate information:

* `subPageId`: A unique identifier for the item within your page to which you're deep linking.
* `subPageLabel`: A label for the item to use for displaying the deep link.
* `subPageWebUrl`: A fallback URL to use if the client can't render the page.

For more information, see [pages.shareDeepLink()](/javascript/api/@microsoft/teams-js/pages?view=msteams-client-js-latest#@microsoft-teams-js-pages-sharedeeplink&preserve-view=true).

# [TeamsJS v1](#tab/teamsjs-v1)

To implement this, add a **copy link** action to each item, in whatever way best suits your UI. When the user takes this action, call `shareDeepLink()` to display a dialog containing a link that the user can copy to the clipboard. When you make this call, pass an ID for your item. You get it back in [context](~/tabs/how-to/access-teams-context.md) when the link is followed and your tab is reloaded.

```javascript
microsoftTeams.shareDeepLink({ subEntityId: <subEntityId>, subEntityLabel: <subEntityLabel>, subEntityWebUrl: <subEntityWebUrl> })
```

You'll need to replace the parameters with the appropriate information:

* `subEntityId`: A unique identifier for the item within your tab to which you're deep linking.
* `subEntityLabel`: A label for the item to use for displaying the deep link.
* `subEntityWebUrl`: An optional parameters with a fallback URL to use if the client doesn't support rendering the tab.

---

> [!NOTE]
>
> * This deep link is different from the links provided by the **Copy link to tab** menu item, which just generates a deep link that points to this tab.
> * `shareDeepLink` doesn't work on mobile platforms.

## Deep link for SharePoint Framework tabs

You can use the following deep link format in a bot, connector, or message extension card:
`https://teams.microsoft.com/l/entity/<AppId>/<EntityId>?webUrl=<entityWebUrl>/<EntityName>`.

> [!NOTE]
>
> * When a bot sends a TextBlock message with a deep link, a new browser tab opens when users select the link. This happens in Chrome and Microsoft Teams desktop app running on Linux.
> * If the bot sends the same deep link URL in an `Action.OpenUrl`, the Teams tab opens in the current browser when the user selects the link. No new browser tab is opened.

The query parameters are:

* `appID`: Your manifest ID, for example `fe4a8eba-2a31-4737-8e33-e5fae6fee194`.

* `entityID`: The item ID that you provided when [configuring the tab](~/tabs/how-to/create-tab-pages/configuration-page.md). For example, `tasklist123`.
* `entityWebUrl`: An optional parameter with a fallback URL to use if the client doesn't support rendering of the tab - `https://tasklist.example.com/123` or `https://tasklist.example.com/list123/task456`.
* `entityName`: A label for the item in your tab to use when displaying the deep link, `Task List 123` or `Task 456`.

Example: `https://teams.microsoft.com/l/entity/fe4a8eba-2a31-4737-8e33-e5fae6fee194/tasklist123?webUrl=https://tasklist.example.com/123&TaskList`

## Deep link to open a task module

A task module deep link is a serialization of the `TaskInfo` object with two other details, the `APP_ID` and optionally the `BOT_APP_ID`:

* `https://teams.microsoft.com/l/task/APP_ID?url=<TaskInfo.url>&height=<TaskInfo.height>&width=<TaskInfo.width>&title=<TaskInfo.title>&completionBotId=BOT_APP_ID`

* `https://teams.microsoft.com/l/task/APP_ID?card=<TaskInfo.card>&height=<TaskInfo.height>&width=<TaskInfo.width>&title=<TaskInfo.title>&completionBotId=BOT_APP_ID`

For the data types and allowable values for `<TaskInfo.url>`, `<TaskInfo.card>`, `<TaskInfo.height>`, `<TaskInfo.width>`, and `<TaskInfo.title>`, see [TaskInfo object](~/task-modules-and-cards/task-modules/invoking-task-modules.md#the-taskinfo-object).

> [!TIP]
> Encode the deep link URL when using the `card` parameter, for example, JavaScript [`encodeURI()` function](https://www.w3schools.com/jsref/jsref_encodeURI.asp).

The following table provides information on `APP_ID` and `BOT_APP_ID`:

| Value | Type | Required | Description |
| --- | --- | --- | --- |
| `APP_ID` | string | Yes | The [ID](~/resources/schema/manifest-schema.md#id) of the app invoking the task module. The [validDomains array](~/resources/schema/manifest-schema.md#validdomains) in the manifest for `APP_ID` must contain the domain for `url` if `url` is in the URL. The app ID is already known when a task module is invoked from a tab or a bot, which is why it isn't included in `TaskInfo`. |
| `BOT_APP_ID` | string | No | If a value for `completionBotId` is specified, the `result` object is sent using a `task/submit invoke` message to the specified bot. `BOT_APP_ID` must be specified as a bot in the app's manifest, that is you can't send it to any bot. |

> [!NOTE]
> `APP_ID` and `BOT_APP_ID` can be the same in many cases, if an app has a recommended bot to use as an app's ID and if there is one.

## Code Sample

| Sample name | Description | .NET |Node.js|
|-------------|-------------|------|----|
|Deep link consuming Subpage ID | Teams sample app for demonstrating deep link from bot chat to tab consuming Subpage ID.|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-deeplink/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-deeplink/nodejs)|
