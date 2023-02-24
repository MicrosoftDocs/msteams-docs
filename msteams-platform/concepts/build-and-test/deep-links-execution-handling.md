---
title: Execution and handling of deep links
author: v-npaladugu
description: Learn how to execute and handle deep links in your Microsoft Teams.
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: high
---

# Execution of deep links

Applications can execute deep links from the following different contexts:

* Personal tab
* Shared tab
* Chat message
* Bot

## Personal or Shared tab

It's possible to navigate within an app using TeamsJS. The following code demonstrates how to navigate to a specific entity within your Teams app. Apps can execute a deep link using the TeamsJS library. To execute a deep link, call the following API:

# [TeamsJS v2](#tab/teamsjs-v2)

You can trigger the navigation from your tab using the [pages.navigateToApp()](/javascript/api/@microsoft/teams-js/pages?view=msteams-client-js-latest#@microsoft-teams-js-pages-navigatetoapp&preserve-view=true) function as shown in the following code:

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

Applications can also use the SDK to execute certain scenarios without building a deep link themselves. Refer to each scenario for sample code.

## Chat message

Applications can post messages to a chat and add deep links to them. The following are different ways an application can include a deep link in a message.

### Hyperlink text message

Applications can add a deep link as a hyperlink markdown. The deep link is executed within teams. Refer the following code sample::

`[App](URL)`

`[App](https://teams.microsoft.com/l/app/{appId})`

For more information, see [use Markdown formatting in Teams](https://support.microsoft.com/en-us/office/use-markdown-formatting-in-teams-4d10bd65-55e2-4b2d-a1f3-2bebdcd2c772)

### Raw link text message

Applications can include the raw link in a message. The deep link is executed within teams. Refer the code below:

`https://teams.microsoft.com/l/app/{appId}`

### Adaptive Card – Open URL action  

Applications can include an `open URL` action in an Adaptive Card and add a deep link to it. The deep link is executed within Teams. Refer to the following sample Adaptive Card payload:

```json

{
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "type": "AdaptiveCard",
    "version": "1.5",
    "body": [
        {
            "type": "TextBlock",
            "text": "This card's action will open a URL"
        }
    ],
    "actions": [
        {
    "type": "Action.OpenUrl",
    "title": "Action.OpenUrl",
    "url": "https://teams.microsoft.com/l/app/{appId}"
    }
    ]
}

```

> [!NOTE]
> Raw links or hyperlinks in an adaptive card body will navigate the user to the browser. We recommend using the `open URL` action.

For more information, see [Action.OpenUrl](https://adaptivecards.io/explorer/Action.OpenUrl.html).

## Handling deep links

When a deep link to an application tab is executed, applications should make sure they respect all the parameters set in that link on the tab context. Applications should read the tab context to identify the page, subpage, or label referred to in the deep link and should navigate to the specific section.

`example`

## Consume a deep link from a tab

When navigating to a deep link, Microsoft Teams navigates to the tab and provides a mechanism through the TeamsJS library to retrieve the subpage ID if it exists.

If the tab is navigated through a deep link, the [`app.getContext()`](/javascript/api/@microsoft/teams-js/app?view=msteams-client-js-latest#@microsoft-teams-js-app-getcontext&preserve-view=true) call (`microsoftTeams.getContext()`) in TeamsJS v1 returns a promise that will resolve with the context that includes the `subPageId` property (subEntityId for TeamsJS v1). For more information, see [PageInfo interface](/javascript/api/@microsoft/teams-js/app?view=msteams-client-js-latest#@microsoft-teams-js-app-pageinfo&preserve-view=true).
