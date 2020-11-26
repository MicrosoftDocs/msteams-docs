---
title: Create deep links
description: Describes deep links and how to use them in your apps
keywords: teams deep link deeplink
---

# Create deep links to content and features in Microsoft Teams

You can create links to information and features within the Teams client. Examples of where this may be useful:

* Navigating the user to content within one of your app's tabs. For instance, your app may have a bot that sends messages notifying the user of an important activity. When the user taps on the notification, the deep link navigates to the tab so the user can view more details about the activity.
* Your app automates or simplifies certain user tasks, such as creating a chat or scheduling a meeting, by pre-populating the deep links with required parameters. This avoids the need for users to manually enter information.

> [!NOTE] The deeplink launches the browser first before navigating to content and information for the following:

> **Tab**: Directly navigates to deeplink url

> **Bot**:</br>
   Deeplink in card body - Opens in browser first</br>
   Deeplink added to OpenURL action in Adaptive Card - Directly navigates to deeplink url</br>   
   Hyperlink markdwn text in the card - Opens in browser first
   
 > Text message hyperlink markdown : Directly navigates to deeplink url
   
> **Chat**:
   Link pasted in general chat conversation - Directly navigates to deeplink url

## Deep linking to your tab

You can create deep links to entities in Teams. Typically, this is used to create links that navigate to content and information within your tab. For example, if your tab contains a task list team members may create and share links to individual tasks. When clicked, the link navigates to your tab which focuses on the specific item. To implement this, you add a "copy link" action to each item, in whatever way best suits your UI. When the user takes this action, you call `shareDeepLink()` to display a dialog box containing a link that the user can copy to the clipboard. When you make this call, you also pass an ID for your item, which you get back in the [context](~/tabs/how-to/access-teams-context.md) when the link is followed and your tab is reloaded.

Alternatively, you can also generate deep links programmatically, using the format specified later in this topic. You might want to use these in [bot](~/bots/what-are-bots.md) and [Connector](~/webhooks-and-connectors/what-are-webhooks-and-connectors.md) messages that inform users about changes to your tab, or to items within it.

> [!NOTE]
> This is different from the links provided by the **Copy link to tab** menu item, which just generates a deep link that points to this tab.

### Showing a deep link to an item within your tab

To show a dialog box that contains a deep link to an item within your tab, call `microsoftTeams.shareDeepLink({ subEntityId: <subEntityId>, subEntityLabel: <subEntityLabel>, subEntityWebUrl: <subEntityWebUrl> })`

Provide these fields:

* `subEntityId`&emsp;A unique identifier for the item within your tab to which you are deep linking
* `subEntityLabel`&emsp;A label for the item to use for displaying the deep link
* `subEntityWebUrl`&emsp;An optional field with a fallback URL to use if the client does not support rendering the tab

### Generating a deep link to your tab

> [!NOTE]
> Static tabs have a scope of "personal" and configurable tabs have a scope of "team". The two tab types have a slightly different syntax since only the configurable tab has a `channel` property associated with its context object. See the [Manifest](~/resources/schema/manifest-schema.md) reference for more information on personal and team scopes.
> [!NOTE]
> Deep links work properly only if the tab was configured using the v0.4 or later library and because of that has an entity ID. Deep links to tabs without entity IDs still navigate to the tab but can't provide the sub-entity ID to the tab.

Use this format for a deep link that you can use in a bot, Connector, or messaging extension card:

`https://teams.microsoft.com/l/entity/<appId>/<entityId>?webUrl=<entityWebUrl>&label=<entityLabel>&context=<context>`

The query parameters are:

* `appId`&emsp;The ID from your manifest; for example, "fe4a8eba-2a31-4737-8e33-e5fae6fee194"
* `entityId`&emsp;The ID for the item in the tab, which you provided when [configuring the tab](~/tabs/how-to/create-tab-pages/configuration-page.md); for example, "tasklist123"
* `entityWebUrl` or `subEntityWebUrl`&emsp;An optional field with a fallback URL to use if the client does not support rendering the tab; for example, "https://tasklist.example.com/123" or "https://tasklist.example.com/list123/task456"
* `entityLabel` or `subEntityLabel`&emsp;A label for the item in your tab, to use when displaying the deep link; for example, "Task List 123" or "Task 456"
* `context`&emsp;A JSON object containing the following fields:
  * `subEntityId`&emsp;An ID for the item _within_ the tab; for example, "task456"
  * `channelId`&emsp;The Microsoft Teams channel ID (available from the tab [context](~/tabs/how-to/access-teams-context.md); for example, "19:cbe3683f25094106b826c9cada3afbe0@thread.skype". This property is only available in configurable tabs with a scope of "team". It is not available in static tabs, which have a scope of "personal".

Examples:

* Link to a configurable tab itself: `https://teams.microsoft.com/l/entity/fe4a8eba-2a31-4737-8e33-e5fae6fee194/tasklist123?webUrl=https://tasklist.example.com/123&label=Task List 123&context={"channelId": "19:cbe3683f25094106b826c9cada3afbe0@thread.skype"}`
* Link to a task item within the configurable tab: `https://teams.microsoft.com/l/entity/fe4a8eba-2a31-4737-8e33-e5fae6fee194/tasklist123?webUrl=https://tasklist.example.com/123/456&label=Task 456&context={"subEntityId": "task456","channelId": "19:cbe3683f25094106b826c9cada3afbe0@thread.skype"}`
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

The [`microsoftTeams.getContext`](/javascript/api/@microsoft/teams-js#getcontext--context--context-----void-) call returns a context that includes the `subEntityId` field if the tab was navigated to via a deep link.

## Deep linking from your tab

You can deeplink to content in Teams from your tab. This is useful if your tab needs to link to other content in Teams such as to a channel, message, another tab or even to open a scheduling dialog. To trigger a deeplink from your tab you should call:

```Javascript
microsoftTeams.executeDeepLink(/*deepLink*/);
```

This will navigate you to the correct URL, or trigger a client action such as opening a scheduling or app install dialog. Example:

```Javascript
// Open a scheduling dialog from your tab
microsoftTeams.executeDeepLink("https://teams.microsoft.com/l/meeting/new?subject=test%20subject&attendees=joe@contoso.com,bob@contoso.com&startTime=10%2F24%2F2018%2010%3A30%3A00&endTime=10%2F24%2F2018%2010%3A30%3A00&content=​​​​​​​test%3Acontent​​​​​​​​​​​​​​");

// Open an app install dialog from your tab
microsoftTeams.executeDeepLink("https://teams.microsoft.com/l/app/f46ad259-0fe5-4f12-872d-c737b174bcb4");
```

## Deep linking to a chat

You can create deep links to private chats between users by specifying the set of participants. If a chat doesn't exist with the specified participants, the link will navigate the user to an empty new chat. New chats will be created in draft state until the user sends the first message. Optionally, you can specify the name of the chat (if it doesn't already exist), along with text that should be inserted into the user's compose box. You can think of this feature as a shortcut for the user taking the manual action of navigating to or creating the chat, and then typing out the message.

As an example use case, if you are returning an Office 365 user profile from your bot as a card, this deep link can allow the user to easily chat with that person.

### Generating a deep link to a chat

Use this format for a deep link that you can use in a bot, Connector, or messaging extension card:

`https://teams.microsoft.com/l/chat/0/0?users=<user1>,<user2>,...&topicName=<chat name>&message=<precanned text>`

Example: `https://teams.microsoft.com/l/chat/0/0?users=joe@contoso.com,bob@contoso.com&topicName=Prep%20For%20Meeting%20Tomorrow&message=Hi%20folks%2C%20kicking%20off%20a%20chat%20about%20our%20meeting%20tomorrow`

The query parameters are:

* `users`&emsp;The comma-separated list of user IDs representing the participants of the chat. The user performing the action is always included as a participant. The User ID field currently only supports the Azure AD UserPrincipalName (typically an email address).
* `topicName`&emsp;An optional field for chat's display name, in the case of a chat with 3 or more users. If this field is not specified, the chat's display name will be based on the names of the participants.
* `message`&emsp;An optional field for the message text that you want to insert into the current user's compose box while the chat is in a draft state.

To use this deep link with your bot, you can specify this as the URL target in your card's button or tap action through the `openUrl` action type.

## Linking to the scheduling dialog

> [!Note]
> This feature is currently in developer preview.

You can create deep links to the Teams client's built-in scheduling dialog. This is especially useful if your app helps the user complete calendar or scheduling-related tasks.

### Generating a deep link to the scheduling dialog

Use this format for a deep link that you can use in a bot, Connector, or messaging extension card:
`https://teams.microsoft.com/l/meeting/new?subject=<meeting subject>&startTime=<date>&endTime=<date>&content=<content>&attendees=<user1>,<user2>,<user3>,...`

Example: `https://teams.microsoft.com/l/meeting/new?subject=test%20subject&attendees=joe@contoso.com,bob@contoso.com&startTime=10%2F24%2F2018%2010%3A30%3A00&endTime=10%2F24%2F2018%2010%3A30%3A00&content=​​​​​​​test%3Acontent​​​​​​​​​​​​​​`

The query parameters are:

* `attendees`&emsp;The optional comma-separated list of user IDs representing the attendees of the meeting. The user performing the action is the meeting organizer. The User ID field currently only supports the Azure AD UserPrincipalName (typically an email address).
* `startTime`&emsp;The optional start time of the event. This should be in [long ISO 8601 format](https://en.wikipedia.org/wiki/ISO_8601), for example “2018-03-12T23:55:25+02:00”.
* `endTime`&emsp;The optional end time of the event, also in ISO 8601 format.
* `subject`&emsp;An optional field for the meeting subject.
* `content`&emsp;An optional field for the meeting details field.

Currently, specifying the location is not supported. When generating your start and end times be sure to specify the UTC offset (time zones).

To use this deep link with your bot, you can specify this as the URL target in your card's button or tap action through the `openUrl` action type.
