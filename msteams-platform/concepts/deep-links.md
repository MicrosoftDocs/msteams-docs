---
title: Create deep links
description: Describes deep links and how to use them in your apps
keywords: teams deep link deeplink
---

# Create deep links to a Microsoft Teams tab

To every tab, Microsoft Teams adds a **Copy link to tab** menu item. This generates a deep link that points to this tab, which users can share.

> [!NOTE]
> This deep link is in a different format than the one you can generate yourself.

You can also enable team members to create and share links to items _within_ your tab, such as an individual task within a tab that contains a task list. When clicked, the link navigates to your tab, which focuses on the specific item. To implement this, you add a "copy link" action to each item, in whatever way best suits your UI. When the user takes this action, you call `shareDeepLink()` to display a dialog box containing a link that the user can copy to the clipboard. When you make this call, you also pass an ID for your item, which you get back in the [context](~/concepts/tabs/tabs-context) when the link is followed and your tab is reloaded.

Further, you can generate deep links programmatically, using the format specified later in this topic. You might want to use these in [bot](~/concepts/bots/bots-overview) and [Connector](~/concepts/connectors) messages that inform users about changes to your tab, or to items within it. 

> [!NOTE]
> Deep links work properly only if the tab was configured using the v0.4 or later library and thus has an entity ID. Deep links to tabs without entity IDs still navigate to the tab but can't provide the sub-entity ID to the tab.

## Showing a deep link to an item within your tab

To show a dialog box that contains a deep link to an item within your tab, call `microsoftTeams.shareDeepLink({ subEntityId: <subEntityId>, subEntityLabel: <subEntityLabel>, subEntityWebUrl: <subEntityWebUrl> })`

The fields to provide are as follows:

* `subEntityId`&emsp;A unique identifier for the item within your tab to which you are deep linking
* `subEntityLabel`&emsp;A label for the item to use for displaying the deep link
* `subEntityWebUrl`&emsp;An optional field with a fallback URL to use if the client does not support rendering the tab

## Generating a deep link to your tab

The format for a deep link that you can use in a bot or Connector message is as follows:

`https://teams.microsoft.com/l/entity/<appId>/<entityId>?webUrl=<entityWebUrl>&label=<entityLabel>&context=<context>`

The query parameters are:

* `appId`&emsp;The ID from your manifest; for example, "fe4a8eba-2a31-4737-8e33-e5fae6fee194"
* `entityId`&emsp;The ID for the item in the tab, which you provided when [configuring the tab](~/concepts/tabs/tabs-configuration); for example, "tasklist123"
* `entityWebUrl` or `subEntityWebUrl`&emsp;An optional field with a fallback URL to use if the client does not support rendering the tab; for example, "https:&#8203;//tasklist.example.&#8203;com/123" or "https:&#8203;//tasklist.example.&#8203;com/list123/task456"
* `entityLabel` or `subEntityLabel`&emsp;A label for the item in your tab, to use when displaying the deep link; for example, "Task List 123" or "Task 456"
* `context`&emsp;A JSON object containing the following fields:
    * `subEntityId`&emsp;An ID for the item _within_ the tab; for example, "task456"
    * `canvasUrl`&emsp;The URL to load in the tab (same as the `contentUrl` you provided when [configuring the tab](~/concepts/tabs/tabs-configuration)); for example, "https:&#8203;//tab.tasklist.example.&#8203;com/123"
    * `channelId`&emsp;The Microsoft Teams channel ID (available from the tab [context](~/concepts/tabs/tabs-context)); for example, "19:cbe3683f25094106b826c9cada3afbe0@thread.skype"

> [!IMPORTANT]
> Ensure that `appId`, `entityId`, `entityWebUrl`, `subEntityWebUrl`, `entityLabel`, `subEntityLabel`, and `context` are all URI encoded.
>
> [!NOTE]
> `canvasUrl` is required but isn't currently used; it is reserved for future use.

Examples:

* Link to the tab itself: `https://teams.microsoft.com/l/entity/fe4a8eba-2a31-4737-8e33-e5fae6fee194/tasklist123?webUrl=https://tasklist.example.com/123&label=Task List 123&context={"canvasUrl": "https://tab.tasklist.example.com/123","channelId": "19:cbe3683f25094106b826c9cada3afbe0@thread.skype"}`
* Link to a task item within the tab: `https://teams.microsoft.com/l/entity/fe4a8eba-2a31-4737-8e33-e5fae6fee194/tasklist123?webUrl=https://tasklist.example.com/123/456&label=Task 456&context={"subEntityId": "task456","canvasUrl": "https://tab.tasklist.example.com/123","channelId": "19:cbe3683f25094106b826c9cada3afbe0@thread.skype"}`

## Consuming a deep link from a tab

When navigating to a deep link, Microsoft Teams simply navigates to the tab and provides a mechanism via the Microsoft Teams JavaScript library to retrieve the sub-entity ID (if it exists).

The [`microsoftTeams.getContext`](/javascript/api/msteams-client/microsoftteams.global) call returns a context that includes the `subEntityId` field if the tab was navigated to via a deep link.
