---
title: Execution and handling of deep links
author: v-npaladugu
description: Learn how to execute and handle deep links in your Microsoft Teams.
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: high
---

# Configuration and handling of deep links

You can configure your Teams app to execute deep links from the following different contexts:

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

## Chat message

You can configure your app to post messages to a chat and add deep links to them. The following are different ways you can include a deep link in a message:

### Hyperlink text message

When you add a deep link to a hyperlinked markdown text message, it's triggered and opened within Teams. Following is an example:

Example: `[App](https://teams.microsoft.com/l/app/{appId})`, where `appId` is your application ID. To know more about different app IDs used see, [app ID used for different apps](~/concepts/build-and-test/deep-link-application.md#app-id-used-for-different-apps).

For more information, see [use Markdown formatting in Teams](https://support.microsoft.com/en-us/office/use-markdown-formatting-in-teams-4d10bd65-55e2-4b2d-a1f3-2bebdcd2c772).

### Raw link text message

When you add a deep link to a raw text message, it's triggered and opened within Teams. Following is an example:

Example: `https://teams.microsoft.com/l/app/{appId}`, where `appId` is your application ID. To know more about different app IDs used see, [app ID used for different apps](~/concepts/build-and-test/deep-link-application.md#app-id-used-for-different-apps).


### Adaptive Card

You can include an `open URL` action in an Adaptive Card and add a deep link to it. The deep link is executed within Teams. As raw links or hyperlinks in an Adaptive Card open in the browser, it's recommended that you use `open URL` action. For more information, see [Action.OpenUrl](https://adaptivecards.io/explorer/Action.OpenUrl.html).

Following is an example Adaptive Card payload:

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

## Handle deep links

When a deep link to a tab app is triggered, ensure that all parameters are set in that link for the tab context. It allows the tab context to identify the page, subpage, or label configured in the deep link and open the specific section. For more information, see [Get context for your tab.](/tabs/how-to/access-teams-context.md)

## Consume a deep link from a tab

When Teams navigates to the tab through a deep link, Teams verifies if the subpage ID exists and retrieves it through the TeamsJS library.

If the tab is navigated through a deep link, the [`app.getContext()`](/javascript/api/@microsoft/teams-js/app?view=msteams-client-js-latest#@microsoft-teams-js-app-getcontext&preserve-view=true) calls (`microsoftTeams.getContext()`) to verify if the subpage ID exists. In TeamsJS v1 library subpage ID is named as `subPageId` and in v2 it's `SubEntityId`. For more information, see [PageInfo interface](/javascript/api/@microsoft/teams-js/app?view=msteams-client-js-latest#@microsoft-teams-js-app-pageinfo&preserve-view=true).
