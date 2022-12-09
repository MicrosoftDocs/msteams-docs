---
title: Deep link to an application 
author: v-npaladugu
description:  In this article, learn how to create deep links to an application and navigate them in your Microsoft Teams.
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: high
---

# Deep link to an application

## Open the application profile dialog

You can open an app install dialog from your Teams app. You can also install that app in other contexts.

Use this deep link format open an app install dialog from your Teams app:

`https://teams.microsoft.com/l/app/f46ad259-0fe5-4f12-872d-c737b174bcb4`

Query parameters:

* `application id`: For eaxmple, `f46ad259-0fe5-4f12-872d-c737b174bcb4`.

Applications can use the Teams Java Script SDK 2.0 to open the dialog without manually generating the deep link.

# [TeamsJS v2](#tab/teamsjs-v2)

```javascript
// Open an app install dialog from your tab
if(appInstallDialog.isSupported()) {
    const dialogPromise = appInstallDialog.openAppInstallDialog({ appId: <appId>});
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

## Navigate to a tab

Applications can navigate the user to a personal tab, or a shared tab.

Use this deep link format to navigate to a tab:

`https://teams.microsoft.com/l/entity/<appId>/<entityId>?webUrl=<entityWebUrl>&label=<entityLabel>&context=<context>`

The query parameters are:

| Parameter name | Description | Example |
|:------------|:--------------|:---------------------|
| `appId`&emsp; | The ID from Teams Admin Center. |fe4a8eba-2a31-4737-8e33-e5fae6fee194|
| `entityId`&emsp; | The ID for the item in the tab, which you provided when [configuring the tab](~/tabs/how-to/create-tab-pages/configuration-page.md). When generating a URL for deep linking continue to use entityID as a parameter name in the URL. When configuring the tab the context object refers to the entityID as {page.id}. |Tasklist123|
| `entityWebUrl` or `subEntityWebUrl`&emsp; | An optional field with a fallback URL to use if the client doesn't support rendering the tab. | `https://tasklist.example.com/123` or `https://tasklist.example.com/list123/task456` |
| `entityLabel` or `subEntityLabel`&emsp; | A label for the item in your tab, to use when displaying the deep link. | Task List 123 or "Task 456 |
| `context.subEntityId`&emsp; | An ID for the item within the tab. When generating a URL for deep linking continue to use subEntityId as the parameter name in the URL. When configuring the tab the context object refers to the subEntityID as subPageID. |Task456 |
| `context.channelId`&emsp; | Microsoft Teams channel ID that is available from the tab [context](~/tabs/how-to/access-teams-context.md). This property is only available in configurable tabs with a scope of **team**. It isn't available in static tabs, which have a scope of **personal**.| 19:cbe3683f25094106b826c9cada3afbe0@thread.skype |
| `chatId`&emsp; | ChatId that is available from the tab [context](~/tabs/how-to/access-teams-context.md) for group and meeting chat | 17:b42de192376346a7906a7dd5cb84b673@thread.v2 |
| `contextType`&emsp; |  Chat is the only supported contextType for meetings | chat |

Applications can use the Teams Java Script SDK 2.0 to navigate to a tab without having to manually prepare the link. The following code demonstrates how to navigate to a specific entity within your Teams app:

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

## Navigate to a chat with the application

Personal chat
Applications can navigate a user to a personal chat with the application. Refer to the following format to prepare the link manually:

<https://teams.microsoft.com/l/entity/appId>/  conversations
appId – is application id*

* we should specify what app is to user for side loaded apps (manifest id), apps submitted to org catalog (org catalog id) and apps submitted to teams app store (store id).

We’ve seen several incidents being reported from our customer due to lack of clarity here.

Shared chat
Not supported (ie at mention app isn’t possible)
Refer to later section on how to navigate to a specific chat / channel.

## Open a task module

## Task module deep link syntax

A task module deep link is a serialization of the TaskInfo object with the following two other details, `APP_ID` and optionally the `BOT_APP_ID`:

`https://teams.microsoft.com/l/task/APP_ID?url=<TaskInfo.url>&height=<TaskInfo.height>&width=<TaskInfo.width>&title=<TaskInfo.title>&completionBotId=BOT_APP_ID`

`https://teams.microsoft.com/l/task/APP_ID?card=<TaskInfo.card>&height=<TaskInfo.height>&width=<TaskInfo.width>&title=<TaskInfo.title>&completionBotId=BOT_APP_ID`

For the data types and allowable values for `<TaskInfo.url>`, `<TaskInfo.card>`, `<TaskInfo.height>`, `<TaskInfo.width>`, and `<TaskInfo.title>`, see [TaskInfo object](~/task-modules-and-cards/task-modules/invoking-task-modules.md#the-taskinfo-object).

> [!TIP]
> URL encode the deep link when using the `card` parameter, for example, JavaScript's [`encodeURI()` function](https://www.w3schools.com/jsref/jsref_encodeURI.asp).

The following table provides information on `APP_ID` and `BOT_APP_ID`:

| Value | Type | Required | Description |
| --- | --- | --- | --- |
| `APP_ID` | string | Yes | The [ID](~/resources/schema/manifest-schema.md#id) of the app invoking the task module. The [validDomains array](~/resources/schema/manifest-schema.md#validdomains) in the manifest for `APP_ID` must contain the domain for `url` if `url` is in the URL. The app ID is already known when a task module is invoked from a tab or a bot, which is why it isn't included in `TaskInfo`. |
| `BOT_APP_ID` | string | No | If a value for `completionBotId` is specified, the `result` object is sent using a `task/submit invoke` message to the specified bot. `BOT_APP_ID` must be specified as a bot in the app's manifest, that is you can't send it to any bot. |

> [!NOTE]
> `APP_ID` and `BOT_APP_ID` can be the same in many cases, if an app has a recommended bot to use as an app's ID if there is one.
