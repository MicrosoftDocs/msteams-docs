---
title: Create deep links
description: Describes deep links and how to use them in your apps
keywords: teams deep link deeplink
ms.date: 04/19/2018
---
# Create deep links to entities in Microsoft Teams

## Deep linking to your tab

To every tab, Microsoft Teams adds a **Copy link to tab** menu item. This generates a deep link that points to this tab, which users can share. This deep link is in a different format than one you can generate yourself. This topic will describe this second type of deep link.

You can enable team members to create and share links to items _within_ your tab, such as an individual task within a tab that contains a task list. When clicked, the link navigates to your tab, which focuses on the specific item. To implement this, you add a "copy link" action to each item, in whatever way best suits your UI. When the user takes this action, you call `shareDeepLink()` to display a dialog box containing a link that the user can copy to the clipboard. When you make this call, you also pass an ID for your item, which you get back in the [context](~/concepts/tabs/tabs-context) when the link is followed and your tab is reloaded.

Further, you can generate deep links programmatically, using the format specified later in this topic. You might want to use these in [bot](~/concepts/bots/bots-overview) and [Connector](~/concepts/connectors/connectors) messages that inform users about changes to your tab, or to items within it.

> [!NOTE]
> Static tabs have a scope of "personal" and configurable tabs have a scope of "team". The two tab types have a slightly different syntax since only the configurable tab has a `channel` property associated with its context object. See the [Manifest](~/resources/schema/manifest-schema) reference for more information on personal and team scopes.
> [!NOTE]
> Deep links work properly only if the tab was configured using the v0.4 or later library and because of that has an entity ID. Deep links to tabs without entity IDs still navigate to the tab but can't provide the sub-entity ID to the tab.

### Showing a deep link to an item within your tab

To show a dialog box that contains a deep link to an item within your tab, call `microsoftTeams.shareDeepLink({ subEntityId: <subEntityId>, subEntityLabel: <subEntityLabel>, subEntityWebUrl: <subEntityWebUrl> })`

The fields to provide are as follows:

* `subEntityId`&emsp;A unique identifier for the item within your tab to which you are deep linking
* `subEntityLabel`&emsp;A label for the item to use for displaying the deep link
* `subEntityWebUrl`&emsp;An optional field with a fallback URL to use if the client does not support rendering the tab

### Generating a deep link to your tab

The format for a deep link that you can use in a bot, Connector, or messaging extension card is as follows:

`https://teams.microsoft.com/l/entity/<appId>/<entityId>?webUrl=<entityWebUrl>&label=<entityLabel>&context=<context>`

The query parameters are:

* `appId`&emsp;The ID from your manifest; for example, "fe4a8eba-2a31-4737-8e33-e5fae6fee194"
* `entityId`&emsp;The ID for the item in the tab, which you provided when [configuring the tab](~/concepts/tabs/tabs-configuration); for example, "tasklist123"
* `entityWebUrl` or `subEntityWebUrl`&emsp;An optional field with a fallback URL to use if the client does not support rendering the tab; for example, "https://tasklist.example.com/123" or "https//tasklist.example.com/list123/task456"
* `entityLabel` or `subEntityLabel`&emsp;A label for the item in your tab, to use when displaying the deep link; for example, "Task List 123" or "Task 456"
* `context`&emsp;A JSON object containing the following fields:
    * `subEntityId`&emsp;An ID for the item _within_ the tab; for example, "task456"
    * `canvasUrl`&emsp;The URL to load in the tab (same as the `contentUrl` you provided when [configuring the tab](~/concepts/tabs/tabs-configuration)); for example, "https://tab.tasklist.example.com/123"
    * `channelId`&emsp;The Microsoft Teams channel ID (available from the tab [context](~/concepts/tabs/tabs-context)); for example, "19:cbe3683f25094106b826c9cada3afbe0@thread.skype". This property is only available in configurable tabs with a scope of "team". It is not available in static tabs, which have a scope of "personal".

> [!NOTE]
> `canvasUrl` is required but isn't currently used; it is reserved for future use.

Examples:

* Link to a configurable tab itself: `https://teams.microsoft.com/l/entity/fe4a8eba-2a31-4737-8e33-e5fae6fee194/tasklist123?webUrl=https://tasklist.example.com/123&label=Task List 123&context={"canvasUrl": "https://tab.tasklist.example.com/123","channelId": "19:cbe3683f25094106b826c9cada3afbe0@thread.skype"}`
* Link to a task item within the configurable tab: `https://teams.microsoft.com/l/entity/fe4a8eba-2a31-4737-8e33-e5fae6fee194/tasklist123?webUrl=https://tasklist.example.com/123/456&label=Task 456&context={"subEntityId": "task456","canvasUrl": "https://tab.tasklist.example.com/123","channelId": "19:cbe3683f25094106b826c9cada3afbe0@thread.skype"}`
* Link to a static tab itself: `https://teams.microsoft.com/l/entity/fe4a8eba-2a31-4737-8e33-e5fae6fee194/tasklist123?webUrl=https://tasklist.example.com/123&label=Task List 123`
* Link to a task item within the static tab: `https://teams.microsoft.com/l/entity/fe4a8eba-2a31-4737-8e33-e5fae6fee194/tasklist123?webUrl=https://tasklist.example.com/123/456&label=Task 456&context={"subEntityId": "task456"}`

> [!IMPORTANT]
> Ensure that all query parameters are properly URI encoded. For the sake of readability, the above examples are not, but you should. Using the last example:
> ```javascript
> var encodedWebUrl = encodeURI('https://tasklist.example.com/123/456&label=Task 456');
> var encodedContext = encodeURI('{"subEntityId": "task456"}');
> var taskItemUrl = 'https://teams.microsoft.com/l/entity/fe4a8eba-2a31-4737-8e33-e5fae6fee194/tasklist123?webUrl=' + encodedWebUrl + '&context=' + encodedContext;
> ```

### Consuming a deep link from a tab

When navigating to a deep link, Microsoft Teams simply navigates to the tab and provides a mechanism via the Microsoft Teams JavaScript library to retrieve the sub-entity ID (if it exists).

The [`microsoftTeams.getContext`](/javascript/api/msteams-client/microsoftteams.global) call returns a context that includes the `subEntityId` field if the tab was navigated to via a deep link.

## Deep linking to a chat
> [!NOTE]
> This functionality is currently available in Developer Preview

You can now create deep links to private chats between users. You can link to an existing chat, or you can specify a set of chat participants to start a new chat. Optionally, you can specify the name of the chat, along with text that should be inserted into the user's compose box. New chats will be created in draft state until the user sends the first message. You can think of this feature as a shortcut for a basic user action.

As an example use case, if you are returning an Office 365 user profile from your bot as a card, this deep link can allow the user to easily chat with that person.

### Generating a deep link to a chat

The format for a deep link that you can use in a bot, Connector, or messaging extension card is as follows:

`https://teams.microsoft.com/l/chat/0/0/?users=<user1>,<user2>,...&topicName=<chat name>&message=<precanned text>`

Example: `https://teams.microsoft.com/l/chat/0/0/?users=joe@contoso.com,bob@contoso.com&topicName=Prep%20For%20Meeting%20Tomorrow&message=Hi%20folks%2C%20kicking%20off%20a%20chat%20about%20our%20meeting%20tomorrow`

The query parameters are:

* `users`&emsp;The comma-separated list of user IDs, which can be either AAD UserPrincipalName (typically an email address) or User ID value
* `topicName`&emsp;An optional field for chat's display name, in the case of a chat with 3 or more users. If this field is not specified, the chat's display name will be based on the names of the participants
* `message`&emsp;An optional field for the message text that you want to insert into the current user's compose box while the chat is in a draft state

To use this deep link with your bot, you can specify this as the URL target in your card's button or tap action through the `openUrl` action type.